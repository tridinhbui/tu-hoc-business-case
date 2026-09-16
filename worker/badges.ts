import { AppEnv } from "./util";

export type Badge = {
  id: string;
  name: string;
  detail: string;
  earned: boolean;
  progress: string;
};

type GradedAttempt = { id: string; lesson_kind: string; passed: number | null; final_score: number | null; graded_at: number };
type Tag = { attempt_id: string; code: string; created_at: number };

const CLEAN_RUN = 5;
const FIXED_RUN = 3;

/**
 * Badges for things that mean something about the work: a mistake that stopped coming back, a run
 * of clean passes, a timed case survived. Deliberately no badge for logging in, opening a page or
 * any other behaviour the programme does not actually want to encourage.
 *
 * Everything is derived from graded attempts and the mistakes tagged on them, so a badge cannot be
 * held after the evidence for it is gone.
 */
export async function badgesFor(env: AppEnv, userId: string): Promise<Badge[]> {
  const [attemptsRes, tagsRes] = await env.DB_LEARNING.batch([
    env.DB_LEARNING.prepare(
      `SELECT id, lesson_kind, passed, final_score, graded_at FROM attempts
       WHERE user_id = ?1 AND status = 'graded' ORDER BY graded_at`,
    ).bind(userId),
    env.DB_LEARNING.prepare(
      "SELECT attempt_id, code, created_at FROM mistake_tags WHERE user_id = ?1 ORDER BY created_at",
    ).bind(userId),
  ]);
  const attempts = attemptsRes.results as GradedAttempt[];
  const tags = tagsRes.results as Tag[];
  const taggedAttempts = new Set(tags.map((t) => t.attempt_id));
  const badges: Badge[] = [];

  // One badge per mistake code the learner used to make and has since stopped making.
  const codes = [...new Set(tags.map((t) => t.code))];
  for (const code of codes) {
    const lastSeen = Math.max(...tags.filter((t) => t.code === code).map((t) => t.created_at));
    const since = attempts.filter((a) => a.graded_at > lastSeen);
    badges.push({
      id: `fixed-${code}`,
      name: `Đã trị ${code}`,
      detail: `${FIXED_RUN} bài chấm liên tiếp không còn dính lỗi này`,
      earned: since.length >= FIXED_RUN,
      progress: `${Math.min(since.length, FIXED_RUN)}/${FIXED_RUN} bài kể từ lần dính cuối`,
    });
  }

  // A run of passes with nothing tagged: the sign of work that no longer needs fixing.
  let cleanRun = 0;
  let bestCleanRun = 0;
  for (const attempt of attempts) {
    const clean = attempt.passed === 1 && !taggedAttempts.has(attempt.id);
    cleanRun = clean ? cleanRun + 1 : 0;
    bestCleanRun = Math.max(bestCleanRun, cleanRun);
  }
  badges.push({
    id: "clean-run",
    name: "Sạch lỗi liên tiếp",
    detail: `${CLEAN_RUN} bài đạt liên tiếp không bị gắn mã lỗi nào`,
    earned: bestCleanRun >= CLEAN_RUN,
    progress: `dài nhất ${bestCleanRun}/${CLEAN_RUN} bài`,
  });

  const timed = attempts.filter((a) => a.lesson_kind === "timed_case" && a.passed === 1).length;
  badges.push({
    id: "under-clock",
    name: "Chịu được đồng hồ",
    detail: "Đạt một bài case bấm giờ",
    earned: timed > 0,
    progress: timed > 0 ? `${timed} bài bấm giờ đã đạt` : "chưa đạt bài bấm giờ nào",
  });

  const checkpoints = attempts.filter((a) => a.lesson_kind === "checkpoint" && a.passed === 1).length;
  badges.push({
    id: "boss-slayer",
    name: "Hạ boss",
    detail: "Qua checkpoint của một module",
    earned: checkpoints > 0,
    progress: `${checkpoints} checkpoint đã qua`,
  });

  const distinction = attempts.filter((a) => (a.final_score ?? 0) >= 90).length;
  badges.push({
    id: "distinction",
    name: "Bài xuất sắc",
    detail: "Một bài được chấm từ 90 điểm trở lên",
    earned: distinction > 0,
    progress: `${distinction} bài từ 90 điểm`,
  });

  // Earned first, then the ones closest to being earned.
  return badges.sort((a, b) => Number(b.earned) - Number(a.earned) || a.name.localeCompare(b.name, "vi"));
}
