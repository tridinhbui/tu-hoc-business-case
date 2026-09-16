import { AppEnv, chunk, now } from "./util";

export type LockReason = "level" | "prereq" | "untimed_first" | "remediation" | "mistake_review";

/** Why a lesson is locked, in words a learner can act on. The UI has its own copy for the badge. */
export const LOCK_HELP: Record<LockReason, { short: string; help: string }> = {
  level: { short: "chưa đủ cấp", help: "Bài này thuộc cấp cao hơn cấp hiện tại của bạn. Qua checkpoint của cấp đang học là mở." },
  prereq: { short: "chưa qua module tiên quyết", help: "Có một module nền phải hoàn thành trước. Qua checkpoint của module đó là bài này mở." },
  untimed_first: { short: "phải làm bản không bấm giờ trước", help: "Đạt bản thường của bài này rồi mới luyện bản bấm giờ, để tốc độ không đến trước độ chính xác." },
  remediation: { short: "đang có drill sửa lỗi", help: "Một mã lỗi của bạn lặp lại nên loại bài này tạm bị chặn. Làm đủ số lượt của drill đang được giao là mở lại." },
  mistake_review: { short: "cần review bài đã chấm", help: "Bài chấm gần nhất có lỗi chưa được xem lại. Mở bài đó, đọc nhận xét và viết lại phần sai là xong." },
};
export type ProgressRow = {
  lesson_id: string;
  status: "locked" | "available" | "in_progress" | "passed" | "failed";
  lock_reason: LockReason | null;
  best_score: number | null;
  attempts_count: number;
};

type LessonRow = { id: string; module_id: string; kind: string; level: number; timed_variant_of: string | null; gates_module: number };
type PrereqRow = { module_id: string; requires_module_id: string; min_checkpoint_score: number | null };

/**
 * Recomputes lesson_progress for one learner. Gates run in a fixed order and the first
 * failing gate becomes the lock reason, so the learner always sees exactly one reason.
 */
export async function recomputeProgress(env: AppEnv, userId: string): Promise<ProgressRow[]> {
  const [lessonsRes, prereqsRes] = await env.DB_CONTENT.batch([
    env.DB_CONTENT.prepare(
      "SELECT id, module_id, kind, level, timed_variant_of, gates_module FROM lessons WHERE status = 'published' ORDER BY id",
    ),
    env.DB_CONTENT.prepare(
      "SELECT module_id, requires_module_id, min_checkpoint_score FROM module_prereqs WHERE kind = 'hard'",
    ),
  ]);
  const lessons = lessonsRes.results as LessonRow[];
  const prereqs = prereqsRes.results as PrereqRow[];

  const [userRes, gradedRes, openRes, remediationRes, pendingRes] = await env.DB_LEARNING.batch([
    env.DB_LEARNING.prepare("SELECT level FROM users WHERE id = ?1").bind(userId),
    env.DB_LEARNING.prepare(
      `SELECT lesson_id, MAX(final_score) AS best, MAX(passed) AS passed, COUNT(*) AS n,
              MIN(CASE WHEN passed = 1 THEN graded_at END) AS passed_at
       FROM attempts WHERE user_id = ?1 AND status = 'graded' GROUP BY lesson_id`,
    ).bind(userId),
    env.DB_LEARNING.prepare(
      "SELECT lesson_id, COUNT(*) AS n FROM attempts WHERE user_id = ?1 AND status IN ('draft','submitted','grading') GROUP BY lesson_id",
    ).bind(userId),
    env.DB_LEARNING.prepare(
      "SELECT blocks_kind, lesson_id FROM remediation_assignments WHERE user_id = ?1 AND status = 'active'",
    ).bind(userId),
    // G1 · pending mistake reviews, grouped by lesson kind. Only failed attempts or attempts
    // with tagged mistakes need a review — a clean pass has nothing to review.
    env.DB_LEARNING.prepare(
      `SELECT DISTINCT a.lesson_kind FROM attempts a
       LEFT JOIN mistake_reviews r ON r.attempt_id = a.id
       WHERE a.user_id = ?1 AND a.status = 'graded' AND r.attempt_id IS NULL
         AND (a.passed = 0 OR EXISTS (SELECT 1 FROM mistake_tags t WHERE t.attempt_id = a.id))`,
    ).bind(userId),
  ]);

  const userLevel = (userRes.results[0] as { level: number } | undefined)?.level ?? 1;
  const graded = new Map(
    (gradedRes.results as { lesson_id: string; best: number; passed: number; n: number; passed_at: number | null }[]).map((r) => [r.lesson_id, r]),
  );
  const open = new Map((openRes.results as { lesson_id: string; n: number }[]).map((r) => [r.lesson_id, r.n]));
  const remediation = remediationRes.results as { blocks_kind: string; lesson_id: string }[];
  const pendingKinds = new Set((pendingRes.results as { lesson_kind: string }[]).map((r) => r.lesson_kind));

  const lessonsByModule = new Map<string, LessonRow[]>();
  for (const l of lessons) {
    const list = lessonsByModule.get(l.module_id) ?? [];
    list.push(l);
    lessonsByModule.set(l.module_id, list);
  }

  // A module counts as passed when the lessons that gate it (its checkpoints) are passed — or all of its
  // lessons when content has not designated a checkpoint yet.
  const modulePassed = (moduleId: string, minScore: number | null) => {
    const list = lessonsByModule.get(moduleId) ?? [];
    const checkpoints = list.filter((l) => l.gates_module === 1);
    const required = checkpoints.length ? checkpoints : list;
    return required.length > 0 && required.every((l) => {
      const g = graded.get(l.id);
      return !!g && g.passed === 1 && (minScore == null || g.best >= minScore);
    });
  };

  const rows: (ProgressRow & { passed_at: number | null })[] = lessons.map((lesson) => {
    const g = graded.get(lesson.id);
    const attempts_count = (g?.n ?? 0) + (open.get(lesson.id) ?? 0);
    const base = { lesson_id: lesson.id, best_score: g?.best ?? null, attempts_count, passed_at: g?.passed_at ?? null };

    if (g?.passed === 1) return { ...base, status: "passed", lock_reason: null };

    let reason: LockReason | null = null;
    if (lesson.level > userLevel + 1) reason = "level";
    else if (prereqs.some((p) => p.module_id === lesson.module_id && !modulePassed(p.requires_module_id, p.min_checkpoint_score))) reason = "prereq";
    else if (lesson.timed_variant_of && graded.get(lesson.timed_variant_of)?.passed !== 1) reason = "untimed_first";
    else if (remediation.some((r) => r.blocks_kind === lesson.kind && r.lesson_id !== lesson.id)) reason = "remediation";
    else if (pendingKinds.has(lesson.kind) && !open.has(lesson.id)) reason = "mistake_review";

    if (reason) return { ...base, status: "locked", lock_reason: reason };
    if (open.has(lesson.id)) return { ...base, status: "in_progress", lock_reason: null };
    if (g) return { ...base, status: "failed", lock_reason: null };
    return { ...base, status: "available", lock_reason: null };
  });

  // 8 params per row → 12 rows per statement stays under D1's 100 bound parameters.
  const ts = now();
  const statements = chunk(rows, 12).map((group) => {
    const placeholders = group.map(() => "(?,?,?,?,?,?,?,?)").join(",");
    const params = group.flatMap((r) => [userId, r.lesson_id, r.status, r.lock_reason, r.best_score, r.attempts_count, ts, r.passed_at]);
    return env.DB_LEARNING.prepare(
      `INSERT INTO lesson_progress (user_id, lesson_id, status, lock_reason, best_score, attempts_count, updated_at, passed_at)
       VALUES ${placeholders}
       ON CONFLICT (user_id, lesson_id) DO UPDATE SET
         status = excluded.status, lock_reason = excluded.lock_reason, best_score = excluded.best_score,
         attempts_count = excluded.attempts_count, updated_at = excluded.updated_at,
         passed_at = COALESCE(lesson_progress.passed_at, excluded.passed_at)`,
    ).bind(...params);
  });
  if (statements.length) await env.DB_LEARNING.batch(statements);

  return rows.map(({ passed_at: _ignored, ...r }) => r);
}
