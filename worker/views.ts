import type { User } from "./auth";
import { recomputeProgress } from "./gates";
import { AppEnv, HttpError, chunk, json, readJson } from "./util";

const STAFF_ROLES = new Set(["instructor", "admin"]);

type AttemptRecord = {
  id: string;
  user_id: string;
  lesson_id: string;
  lesson_kind: string;
  status: string;
  final_score: number | null;
  passed: number | null;
  started_at: number;
  submitted_at: number | null;
  graded_at: number | null;
};

async function lookup<T extends Record<string, unknown>>(
  db: D1Database, table: string, key: string, columns: string, ids: string[],
): Promise<Map<string, T>> {
  const out = new Map<string, T>();
  for (const group of chunk([...new Set(ids)], 90)) {
    const { results } = await db.prepare(
      `SELECT ${key}, ${columns} FROM ${table} WHERE ${key} IN (${group.map(() => "?").join(",")})`,
    ).bind(...group).all<T>();
    results.forEach((r) => out.set(String(r[key]), r));
  }
  return out;
}

// Reveal items with this trigger are handed out with the brief; every other item is released on request.
const UPFRONT_TRIGGER = "Phát sẵn";

type RevealItem = { id: string; trigger: string; content: string; sort: number };
type CaseRow = { id: string; title: string; industry: string; context: string; question: string; duration_min: number; status: string };

async function caseForLesson(env: AppEnv, lessonId: string): Promise<(CaseRow & { items: RevealItem[] }) | null> {
  const row = await env.DB_CONTENT.prepare(
    `SELECT id, title, industry, context, question, duration_min, status FROM cases
     WHERE lesson_id = ?1 AND status <> 'retired' ORDER BY id LIMIT 1`,
  ).bind(lessonId).first<CaseRow>();
  if (!row) return null;
  const { results } = await env.DB_CONTENT.prepare(
    "SELECT id, trigger, content, sort FROM case_reveal_items WHERE case_id = ?1 ORDER BY sort",
  ).bind(row.id).all<RevealItem>();
  return { ...row, items: results };
}

/** Brief for a learner who has not started: askable items are listed by trigger only, never by content. */
function briefWithoutAnswers(c: CaseRow & { items: RevealItem[] }) {
  const { items, ...rest } = c;
  return {
    ...rest,
    upfront: items.filter((i) => i.trigger === UPFRONT_TRIGGER).map(({ id, content }) => ({ id, content })),
    askable: items.filter((i) => i.trigger !== UPFRONT_TRIGGER).map(({ id, trigger }) => ({ id, trigger })),
  };
}

export async function revealCaseItem(request: Request, env: AppEnv, user: User, attemptId: string): Promise<Response> {
  const { itemId } = await readJson<{ itemId?: string }>(request);
  if (!itemId) throw new HttpError(400, "Thiếu mục dữ liệu cần xin.");
  const attempt = await env.DB_LEARNING.prepare("SELECT id, user_id, lesson_id, status FROM attempts WHERE id = ?1")
    .bind(attemptId).first<{ id: string; user_id: string; lesson_id: string; status: string }>();
  if (!attempt || attempt.user_id !== user.id) throw new HttpError(404, "Không tìm thấy bài làm.");
  if (attempt.status !== "draft") throw new HttpError(409, "Chỉ xin được dữ liệu khi bài còn đang làm.");

  const item = await env.DB_CONTENT.prepare(
    `SELECT r.id, r.trigger, r.content FROM case_reveal_items r JOIN cases c ON c.id = r.case_id
     WHERE r.id = ?1 AND c.lesson_id = ?2 AND c.status <> 'retired'`,
  ).bind(itemId, attempt.lesson_id).first<{ id: string; trigger: string; content: string }>();
  if (!item) throw new HttpError(404, "Đề này không có mục dữ liệu đó.");

  if (item.trigger !== UPFRONT_TRIGGER) {
    await env.DB_LEARNING.prepare(
      "INSERT INTO attempt_reveals (attempt_id, item_id, revealed_at) VALUES (?1, ?2, ?3) ON CONFLICT DO NOTHING",
    ).bind(attemptId, itemId, Date.now()).run();
  }
  return json({ itemId: item.id, trigger: item.trigger, content: item.content });
}

const NEEDS_REVIEW_SQL = `a.status = 'graded'
  AND NOT EXISTS (SELECT 1 FROM mistake_reviews r WHERE r.attempt_id = a.id)
  AND (a.passed = 0 OR EXISTS (SELECT 1 FROM mistake_tags t WHERE t.attempt_id = a.id))`;

export async function meView(env: AppEnv, user: User | null): Promise<Response> {
  if (!user) return json({ user: null, readiness: [] });
  const { results } = await env.DB_LEARNING.prepare(
    "SELECT skill_id, raw_score, score, last_evidence_at FROM readiness WHERE user_id = ?1 ORDER BY skill_id",
  ).bind(user.id).all<{ skill_id: string }>();
  const skills = await lookup<{ id: string; name: string }>(env.DB_CONTENT, "skills", "id", "name", results.map((r) => r.skill_id));
  return json({ user, readiness: results.map((r) => ({ ...r, name: skills.get(r.skill_id)?.name ?? r.skill_id })) });
}

export async function progressView(env: AppEnv, user: User): Promise<Response> {
  const lessons = await recomputeProgress(env, user.id);
  const [catalogRes, modulesRes] = await env.DB_CONTENT.batch([
    env.DB_CONTENT.prepare("SELECT id, module_id, title, kind, level, est_minutes, gates_module FROM lessons WHERE status = 'published' ORDER BY id"),
    env.DB_CONTENT.prepare(
      `SELECT m.id, m.title, m.track_id, t.name AS track_name FROM modules m JOIN tracks t ON t.id = m.track_id
       WHERE m.status = 'published' ORDER BY t.sort, m.id`,
    ),
  ]);
  const [pendingRes, remediationRes, userRes] = await env.DB_LEARNING.batch([
    env.DB_LEARNING.prepare(
      `SELECT a.id AS attempt_id, a.lesson_id, a.final_score, a.passed, a.graded_at FROM attempts a
       WHERE a.user_id = ?1 AND ${NEEDS_REVIEW_SQL} ORDER BY a.graded_at DESC`,
    ).bind(user.id),
    env.DB_LEARNING.prepare(
      `SELECT code, lesson_id, reps_done, reps_required, blocks_kind, triggered_at FROM remediation_assignments
       WHERE user_id = ?1 AND status = 'active' ORDER BY triggered_at DESC`,
    ).bind(user.id),
    env.DB_LEARNING.prepare("SELECT level FROM users WHERE id = ?1").bind(user.id),
  ]);

  const catalog = Object.fromEntries((catalogRes.results as { id: string }[]).map((l) => [l.id, l]));
  const remediation = remediationRes.results as { code: string; lesson_id: string }[];
  const codes = await lookup<{ code: string; title: string }>(env.DB_CONTENT, "mistake_codes", "code", "title", remediation.map((r) => r.code));

  return json({
    level: (userRes.results[0] as { level: number } | undefined)?.level ?? user.level,
    modules: modulesRes.results,
    catalog,
    lessons,
    pendingReviews: pendingRes.results,
    remediation: remediation.map((r) => ({ ...r, title: codes.get(r.code)?.title ?? r.code })),
  });
}

export async function lessonView(env: AppEnv, user: User, lessonId: string): Promise<Response> {
  const lesson = await env.DB_CONTENT.prepare(
    `SELECT l.id, l.title, l.kind, l.level, l.est_minutes, l.output_spec, l.module_id, l.timed_variant_of, l.gates_module, m.title AS module_title
     FROM lessons l JOIN modules m ON m.id = l.module_id WHERE l.id = ?1 AND l.status = 'published'`,
  ).bind(lessonId).first();
  if (!lesson) throw new HttpError(404, "Không tìm thấy bài học.");

  const rubricRow = await env.DB_CONTENT.prepare(
    `SELECT lr.rubric_id, r.name, lr.weight_overrides, COALESCE(lr.pass_threshold_override, r.pass_threshold) AS threshold
     FROM lesson_rubrics lr JOIN rubrics r ON r.id = lr.rubric_id WHERE lr.lesson_id = ?1`,
  ).bind(lessonId).first<{ rubric_id: string; name: string; weight_overrides: string; threshold: number }>();

  let rubric = null;
  if (rubricRow) {
    const [criteriaRes, levelsRes] = await env.DB_CONTENT.batch([
      env.DB_CONTENT.prepare("SELECT id, name, weight, skill_id FROM rubric_criteria WHERE rubric_id = ?1 ORDER BY sort").bind(rubricRow.rubric_id),
      env.DB_CONTENT.prepare(
        `SELECT criterion_id, level, descriptor FROM rubric_criterion_levels
         WHERE criterion_id IN (SELECT id FROM rubric_criteria WHERE rubric_id = ?1) ORDER BY level`,
      ).bind(rubricRow.rubric_id),
    ]);
    const overrides = JSON.parse(rubricRow.weight_overrides) as Record<string, number>;
    const levels = levelsRes.results as { criterion_id: string; level: number; descriptor: string }[];
    rubric = {
      id: rubricRow.rubric_id,
      name: rubricRow.name,
      threshold: rubricRow.threshold,
      criteria: (criteriaRes.results as { id: string; name: string; weight: number; skill_id: string | null }[]).map((c) => ({
        ...c,
        weight: overrides[c.id] ?? c.weight,
        levels: Object.fromEntries(levels.filter((l) => l.criterion_id === c.id).map((l) => [l.level, l.descriptor])),
      })),
    };
  }

  const progress = (await recomputeProgress(env, user.id)).find((p) => p.lesson_id === lessonId) ?? null;
  const { results: attempts } = await env.DB_LEARNING.prepare(
    `SELECT a.id, a.status, a.final_score, a.passed, a.started_at, a.submitted_at, a.graded_at,
            CASE WHEN ${NEEDS_REVIEW_SQL} THEN 1 ELSE 0 END AS needs_review
     FROM attempts a WHERE a.user_id = ?1 AND a.lesson_id = ?2 ORDER BY a.started_at DESC`,
  ).bind(user.id, lessonId).all();

  const caseRow = await caseForLesson(env, lessonId);
  return json({ lesson, rubric, progress, attempts, case: caseRow ? briefWithoutAnswers(caseRow) : null });
}

/** Who may see an attempt: its owner, staff, or the grader who holds or made its grade. */
async function resolveViewer(env: AppEnv, user: User, attemptId: string): Promise<{ attempt: AttemptRecord; viewer: "owner" | "grader" | "staff" }> {
  const attempt = await env.DB_LEARNING.prepare(
    "SELECT id, user_id, lesson_id, lesson_kind, status, final_score, passed, started_at, submitted_at, graded_at FROM attempts WHERE id = ?1",
  ).bind(attemptId).first<AttemptRecord>();
  if (!attempt) throw new HttpError(404, "Không tìm thấy bài làm.");
  if (attempt.user_id === user.id) return { attempt, viewer: "owner" };
  if (STAFF_ROLES.has(user.role)) return { attempt, viewer: "staff" };
  if (user.role === "grader") {
    const holds = await env.DB_LEARNING.prepare(
      `SELECT 1 AS ok FROM grading_queue WHERE attempt_id = ?1 AND claimed_by = ?2
       UNION SELECT 1 FROM grades WHERE attempt_id = ?1 AND grader_id = ?2`,
    ).bind(attemptId, user.id).first();
    if (holds) return { attempt, viewer: "grader" };
  }
  // 404 rather than 403: do not reveal that the attempt exists
  throw new HttpError(404, "Không tìm thấy bài làm.");
}

export async function attemptView(env: AppEnv, user: User, attemptId: string): Promise<Response> {
  const { attempt, viewer } = await resolveViewer(env, user, attemptId);
  const [artifactsRes, gradeRes, criteriaRes, tagsRes, reviewRes] = await env.DB_LEARNING.batch([
    env.DB_LEARNING.prepare("SELECT id, kind, mime, bytes, created_at FROM attempt_artifacts WHERE attempt_id = ?1 ORDER BY created_at").bind(attemptId),
    env.DB_LEARNING.prepare("SELECT id, rubric_id, total_score, grader_type, created_at FROM grades WHERE attempt_id = ?1 AND is_final = 1").bind(attemptId),
    env.DB_LEARNING.prepare(
      `SELECT gc.criterion_id, gc.level, gc.points, gc.evidence FROM grade_criteria gc
       JOIN grades g ON g.id = gc.grade_id WHERE g.attempt_id = ?1 AND g.is_final = 1`,
    ).bind(attemptId),
    env.DB_LEARNING.prepare("SELECT code, location_ref FROM mistake_tags WHERE attempt_id = ?1 ORDER BY created_at").bind(attemptId),
    env.DB_LEARNING.prepare("SELECT rewrite_note, completed_at FROM mistake_reviews WHERE attempt_id = ?1").bind(attemptId),
  ]);

  const grade = gradeRes.results[0] as { rubric_id: string; total_score: number; grader_type: string; created_at: number } | undefined;
  const criteria = criteriaRes.results as { criterion_id: string; level: number; points: number; evidence: string | null }[];
  const tags = tagsRes.results as { code: string; location_ref: string | null }[];

  const [lesson, criterionInfo, codes, threshold] = await Promise.all([
    env.DB_CONTENT.prepare("SELECT id, title, kind FROM lessons WHERE id = ?1").bind(attempt.lesson_id).first<{ title: string }>(),
    lookup<{ id: string; name: string; weight: number; sort: number }>(env.DB_CONTENT, "rubric_criteria", "id", "name, weight, sort", criteria.map((c) => c.criterion_id)),
    lookup<{ code: string; title: string; symptom: string }>(env.DB_CONTENT, "mistake_codes", "code", "title, symptom", tags.map((t) => t.code)),
    env.DB_CONTENT.prepare(
      `SELECT COALESCE(lr.pass_threshold_override, r.pass_threshold) AS threshold
       FROM lesson_rubrics lr JOIN rubrics r ON r.id = lr.rubric_id WHERE lr.lesson_id = ?1`,
    ).bind(attempt.lesson_id).first<{ threshold: number }>(),
  ]);

  const review = (reviewRes.results[0] as { rewrite_note: string; completed_at: number } | undefined) ?? null;
  const needsReview = attempt.status === "graded" && !review && (attempt.passed === 0 || tags.length > 0);

  // Case brief with the data this attempt asked for. Answer frame and traps are for graders only.
  const caseRow = await caseForLesson(env, attempt.lesson_id);
  let caseView = null;
  let answerFrame = null;
  let traps: { description: string; mistake_code: string }[] = [];
  if (caseRow) {
    const { results: asked } = await env.DB_LEARNING.prepare(
      "SELECT item_id, revealed_at FROM attempt_reveals WHERE attempt_id = ?1",
    ).bind(attemptId).all<{ item_id: string; revealed_at: number }>();
    const askedAt = new Map(asked.map((r) => [r.item_id, r.revealed_at]));
    const base = briefWithoutAnswers(caseRow);
    caseView = {
      ...base,
      askable: caseRow.items
        .filter((i) => i.trigger !== UPFRONT_TRIGGER)
        .map((i) => ({ id: i.id, trigger: i.trigger, content: askedAt.has(i.id) ? i.content : null, revealed_at: askedAt.get(i.id) ?? null })),
    };
    if (viewer !== "owner") {
      const [frameRes, trapsRes] = await env.DB_CONTENT.batch([
        env.DB_CONTENT.prepare("SELECT structure_md, quick_scoring_md FROM case_answer_frames WHERE case_id = ?1").bind(caseRow.id),
        env.DB_CONTENT.prepare("SELECT description, mistake_code FROM case_traps WHERE case_id = ?1 ORDER BY id").bind(caseRow.id),
      ]);
      answerFrame = (frameRes.results[0] as { structure_md: string; quick_scoring_md: string } | undefined) ?? null;
      traps = trapsRes.results as { description: string; mistake_code: string }[];
    }
  }

  return json({
    viewer,
    attempt: {
      ...attempt,
      user_id: viewer === "owner" ? attempt.user_id : undefined, // graders see attempts anonymously
      lesson_title: lesson?.title ?? attempt.lesson_id,
    },
    artifacts: artifactsRes.results,
    grade: grade
      ? {
          ...grade,
          threshold: threshold?.threshold ?? null,
          criteria: criteria
            .map((c) => ({ ...c, name: criterionInfo.get(c.criterion_id)?.name ?? c.criterion_id, weight: criterionInfo.get(c.criterion_id)?.weight ?? null, sort: criterionInfo.get(c.criterion_id)?.sort ?? 0 }))
            .sort((a, b) => a.sort - b.sort),
        }
      : null,
    mistakes: tags.map((t) => ({ ...t, title: codes.get(t.code)?.title ?? t.code, symptom: codes.get(t.code)?.symptom ?? null })),
    review,
    needsReview,
    case: caseView,
    answerFrame,
    traps,
  });
}

export async function downloadArtifact(env: AppEnv, user: User, attemptId: string, artifactId: string): Promise<Response> {
  await resolveViewer(env, user, attemptId);
  const artifact = await env.DB_LEARNING.prepare(
    "SELECT kind, r2_key, mime FROM attempt_artifacts WHERE id = ?1 AND attempt_id = ?2",
  ).bind(artifactId, attemptId).first<{ kind: string; r2_key: string | null; mime: string | null }>();
  if (!artifact?.r2_key) throw new HttpError(404, "Không tìm thấy file.");
  const object = await env.R2_SUBMISSIONS.get(artifact.r2_key);
  if (!object) throw new HttpError(404, "File không còn trong kho lưu trữ.");
  return new Response(object.body, {
    headers: {
      "content-type": artifact.mime ?? "application/octet-stream",
      "content-disposition": `attachment; filename="${artifact.kind}-${artifactId}"`,
      "cache-control": "private, no-store",
      "x-content-type-options": "nosniff",
    },
  });
}

export async function mistakeCodesView(env: AppEnv): Promise<Response> {
  const { results } = await env.DB_CONTENT.prepare(
    "SELECT code, group_code, title, symptom FROM mistake_codes ORDER BY code",
  ).all();
  return json({ items: results });
}
