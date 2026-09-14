import type { User } from "./auth";
import { requireRole } from "./auth";
import { AppEnv, HttpError, json, now, readJson, uuid } from "./util";

const CLAIM_TTL_MS = 2 * 60 * 60 * 1000;
const LEVEL_FRACTION: Record<number, number> = { 1: 0.25, 2: 0.5, 3: 0.75, 4: 1 };

const layerFor = (kind: string) =>
  kind === "team_sim" ? "deliverable" : kind === "live_case" || kind === "qa_sim" ? "live" : "case";

/** Queue consumer: moves submitted attempts into the human grading queue. Idempotent. */
export async function consumeGrading(batch: MessageBatch<{ attemptId: string }>, env: AppEnv) {
  for (const message of batch.messages) {
    try {
      const attempt = await env.DB_LEARNING.prepare(
        "SELECT id, lesson_id, lesson_kind, status FROM attempts WHERE id = ?1",
      ).bind(message.body.attemptId).first<{ id: string; lesson_id: string; lesson_kind: string; status: string }>();
      if (!attempt || attempt.status !== "submitted") {
        message.ack();
        continue;
      }
      const lesson = await env.DB_CONTENT.prepare("SELECT level, gates_module FROM lessons WHERE id = ?1")
        .bind(attempt.lesson_id).first<{ level: number; gates_module: number }>();
      // Anything that decides whether a module is passed is graded by an instructor, not a peer.
      const needs = attempt.lesson_kind === "checkpoint" || lesson?.gates_module === 1 ? "instructor" : "peer";
      await env.DB_LEARNING.batch([
        env.DB_LEARNING.prepare("UPDATE attempts SET status = 'grading' WHERE id = ?1 AND status = 'submitted'").bind(attempt.id),
        env.DB_LEARNING.prepare(
          `INSERT INTO grading_queue (attempt_id, needs, min_grader_level, enqueued_at) VALUES (?1, ?2, ?3, ?4)
           ON CONFLICT (attempt_id) DO NOTHING`,
        ).bind(attempt.id, needs, lesson?.level ?? 1, now()),
      ]);
      message.ack();
    } catch (err) {
      console.error("grading consumer failed", message.body, err);
      message.retry();
    }
  }
}

export async function graderQueue(env: AppEnv, user: User): Promise<Response> {
  requireRole(user, ["grader", "instructor", "admin"]);
  const staff = user.role !== "grader";
  const { results } = await env.DB_LEARNING.prepare(
    `SELECT q.attempt_id, q.needs, q.claimed_by, q.enqueued_at, a.lesson_id, a.lesson_kind, a.submitted_at
     FROM grading_queue q JOIN attempts a ON a.id = q.attempt_id
     WHERE a.user_id <> ?1
       AND (q.needs = 'peer' OR ?2 = 1)
       AND (?2 = 1 OR q.min_grader_level <= ?3)
       AND (q.claimed_by IS NULL OR q.claimed_by = ?1 OR q.claimed_at < ?4)
     ORDER BY q.enqueued_at LIMIT 20`,
  ).bind(user.id, staff ? 1 : 0, user.level, now() - CLAIM_TTL_MS).all<{ attempt_id: string; lesson_id: string; claimed_by: string | null }>();
  const ids = [...new Set(results.map((r) => r.lesson_id))];
  const titles = new Map<string, string>();
  if (ids.length) {
    const { results: rows } = await env.DB_CONTENT.prepare(
      `SELECT id, title FROM lessons WHERE id IN (${ids.map(() => "?").join(",")})`,
    ).bind(...ids).all<{ id: string; title: string }>();
    rows.forEach((r) => titles.set(r.id, r.title));
  }
  return json({
    items: results.map((r) => ({ ...r, lesson_title: titles.get(r.lesson_id) ?? r.lesson_id, mine: r.claimed_by === user.id })),
  });
}

export async function claimAttempt(env: AppEnv, user: User, attemptId: string): Promise<Response> {
  requireRole(user, ["grader", "instructor", "admin"]);
  const res = await env.DB_LEARNING.prepare(
    `UPDATE grading_queue SET claimed_by = ?1, claimed_at = ?2
     WHERE attempt_id = ?3
       AND (claimed_by IS NULL OR claimed_by = ?1 OR claimed_at < ?4)
       AND attempt_id IN (SELECT id FROM attempts WHERE user_id <> ?1)`,
  ).bind(user.id, now(), attemptId, now() - CLAIM_TTL_MS).run();
  if (!res.meta.changes) throw new HttpError(409, "Bài này đang được người khác chấm hoặc không còn trong hàng đợi.");
  return json({ attemptId, claimed: true });
}

type GradeBody = {
  criteria?: { criterionId: string; level: number; evidence?: string }[];
  mistakes?: { code: string; location?: string }[];
};

export async function gradeAttempt(request: Request, env: AppEnv, user: User, attemptId: string): Promise<Response> {
  requireRole(user, ["grader", "instructor", "admin"]);
  const body = await readJson<GradeBody>(request);

  const queued = await env.DB_LEARNING.prepare(
    `SELECT a.id, a.user_id, a.lesson_id, a.lesson_kind, q.claimed_by, q.needs
     FROM attempts a JOIN grading_queue q ON q.attempt_id = a.id
     WHERE a.id = ?1 AND a.status = 'grading'`,
  ).bind(attemptId).first<{ id: string; user_id: string; lesson_id: string; lesson_kind: string; claimed_by: string | null; needs: string }>();
  if (!queued) throw new HttpError(404, "Bài này không ở trạng thái chờ chấm.");
  if (queued.user_id === user.id) throw new HttpError(403, "Không thể tự chấm bài của mình.");
  if (queued.claimed_by !== user.id) throw new HttpError(409, "Nhận bài trước khi chấm.");
  if (queued.needs === "instructor" && user.role === "grader") throw new HttpError(403, "Checkpoint phải do giảng viên chấm.");

  const lessonRubric = await env.DB_CONTENT.prepare(
    `SELECT lr.rubric_id, lr.weight_overrides, COALESCE(lr.pass_threshold_override, r.pass_threshold) AS threshold
     FROM lesson_rubrics lr JOIN rubrics r ON r.id = lr.rubric_id WHERE lr.lesson_id = ?1`,
  ).bind(queued.lesson_id).first<{ rubric_id: string; weight_overrides: string; threshold: number }>();
  if (!lessonRubric) throw new HttpError(500, `Bài ${queued.lesson_id} chưa gắn rubric.`);

  const { results: criteria } = await env.DB_CONTENT.prepare(
    "SELECT id, weight, skill_id FROM rubric_criteria WHERE rubric_id = ?1 ORDER BY sort",
  ).bind(lessonRubric.rubric_id).all<{ id: string; weight: number; skill_id: string | null }>();
  const overrides = JSON.parse(lessonRubric.weight_overrides) as Record<string, number>;

  const submitted = new Map((body.criteria ?? []).map((c) => [c.criterionId, c]));
  const missing = criteria.filter((c) => !submitted.has(c.id)).map((c) => c.id);
  const unknown = [...submitted.keys()].filter((id) => !criteria.some((c) => c.id === id));
  if (missing.length || unknown.length) {
    throw new HttpError(400, "Phải chấm đủ và đúng các tiêu chí của rubric.", { missing, unknown });
  }
  for (const c of submitted.values()) {
    if (![1, 2, 3, 4].includes(c.level)) throw new HttpError(400, `Mức của ${c.criterionId} phải từ 1 đến 4.`);
    if ((c.level === 1 || c.level === 4) && !c.evidence?.trim()) {
      throw new HttpError(400, `Tiêu chí ${c.criterionId} ở mức ${c.level} cần một câu bằng chứng trích từ bài nộp.`);
    }
  }

  const mistakes = body.mistakes ?? [];
  if (mistakes.length) {
    const codes = [...new Set(mistakes.map((m) => m.code))];
    const { results: known } = await env.DB_CONTENT.prepare(
      `SELECT code FROM mistake_codes WHERE code IN (${codes.map(() => "?").join(",")})`,
    ).bind(...codes).all<{ code: string }>();
    const unknownCodes = codes.filter((c) => !known.some((k) => k.code === c));
    if (unknownCodes.length) throw new HttpError(400, "Mã lỗi không tồn tại.", { unknownCodes });
  }

  let totalWeight = 0;
  let earned = 0;
  let anyLevelOne = false;
  const ts = now();
  const gradeId = uuid();
  const layer = layerFor(queued.lesson_kind);
  const criterionStatements: D1PreparedStatement[] = [];
  const evidenceStatements: D1PreparedStatement[] = [];

  for (const c of criteria) {
    const g = submitted.get(c.id)!;
    const weight = overrides[c.id] ?? c.weight;
    const points = weight * LEVEL_FRACTION[g.level];
    totalWeight += weight;
    earned += points;
    if (g.level === 1) anyLevelOne = true;
    criterionStatements.push(
      env.DB_LEARNING.prepare(
        "INSERT INTO grade_criteria (grade_id, criterion_id, skill_id, level, points, evidence) VALUES (?1, ?2, ?3, ?4, ?5, ?6)",
      ).bind(gradeId, c.id, c.skill_id, g.level, points, g.evidence?.trim() || null),
    );
    if (c.skill_id) {
      evidenceStatements.push(
        env.DB_LEARNING.prepare(
          "INSERT INTO skill_evidence (id, user_id, skill_id, attempt_id, layer, score, observed_at) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)",
        ).bind(uuid(), queued.user_id, c.skill_id, attemptId, layer, Math.round(LEVEL_FRACTION[g.level] * 100), ts),
      );
    }
  }

  const total = Math.round((earned / totalWeight) * 100);
  // Rubric rule: pass needs the threshold and no criterion at level 1.
  const passed = total >= lessonRubric.threshold && !anyLevelOne ? 1 : 0;
  const graderType = user.role === "grader" ? "peer" : "instructor";

  // D1 runs a batch as one transaction: all rows land or none do.
  await env.DB_LEARNING.batch([
    env.DB_LEARNING.prepare(
      "INSERT INTO grades (id, attempt_id, grader_id, grader_type, rubric_id, total_score, is_final, created_at) VALUES (?1, ?2, ?3, ?4, ?5, ?6, 1, ?7)",
    ).bind(gradeId, attemptId, user.id, graderType, lessonRubric.rubric_id, total, ts),
    ...criterionStatements,
    ...evidenceStatements,
    ...mistakes.map((m) =>
      env.DB_LEARNING.prepare(
        "INSERT INTO mistake_tags (id, attempt_id, user_id, code, grade_id, location_ref, created_at) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)",
      ).bind(uuid(), attemptId, queued.user_id, m.code, gradeId, m.location ?? null, ts),
    ),
    env.DB_LEARNING.prepare(
      "UPDATE attempts SET status = 'graded', final_score = ?1, passed = ?2, graded_at = ?3 WHERE id = ?4",
    ).bind(total, passed, ts, attemptId),
    env.DB_LEARNING.prepare("DELETE FROM grading_queue WHERE attempt_id = ?1").bind(attemptId),
    env.DB_LEARNING.prepare(
      "INSERT INTO audit_log (id, actor_id, action, entity, entity_id, meta, at) VALUES (?1, ?2, 'grade', 'attempt', ?3, ?4, ?5)",
    ).bind(uuid(), user.id, attemptId, JSON.stringify({ total, passed, rubric: lessonRubric.rubric_id }), ts),
  ]);

  await env.Q_READINESS.send({ userId: queued.user_id });
  return json({ attemptId, total, passed: passed === 1, threshold: lessonRubric.threshold });
}
