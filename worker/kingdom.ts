import type { User } from "./auth";
import { recomputeProgress } from "./gates";
import { AppEnv, json } from "./util";

const DAY_MS = 86_400_000;
// Streaks are counted in the learner's day, not UTC: a session at 23:30 in Hanoi is that day's work.
const TZ_OFFSET_MS = 7 * 60 * 60 * 1000;

type LessonRow = { id: string; module_id: string; title: string; kind: string; level: number; gates_module: number };
type ModuleRow = { id: string; title: string; track_id: string; outcome: string };
type TrackRow = { id: string; name: string; role: string };

const dayNumber = (ms: number) => Math.floor((ms + TZ_OFFSET_MS) / DAY_MS);

/** Consecutive days, ending today or yesterday, on which something was passed. */
function streakDays(passedAt: number[]): number {
  if (passedAt.length === 0) return 0;
  const days = [...new Set(passedAt.map(dayNumber))].sort((a, b) => b - a);
  const today = dayNumber(Date.now());
  if (days[0] < today - 1) return 0;
  let streak = 1;
  for (let i = 1; i < days.length && days[i - 1] - days[i] === 1; i++) streak++;
  return streak;
}

/**
 * The map view: the same progress the learner already has, arranged as territories, bosses and
 * quests. Nothing here is a second source of truth — every number is derived from lessons passed,
 * mistakes tagged and readiness measured, so the map cannot disagree with the lesson list.
 */
export async function kingdomView(env: AppEnv, user: User): Promise<Response> {
  const progress = await recomputeProgress(env, user.id);
  const byLesson = new Map(progress.map((p) => [p.lesson_id, p]));

  const [lessonsRes, modulesRes, tracksRes] = await env.DB_CONTENT.batch([
    env.DB_CONTENT.prepare(
      "SELECT id, module_id, title, kind, level, gates_module FROM lessons WHERE status = 'published' ORDER BY id",
    ),
    env.DB_CONTENT.prepare(
      "SELECT id, title, track_id, outcome FROM modules WHERE status = 'published' ORDER BY track_id, id",
    ),
    env.DB_CONTENT.prepare("SELECT id, name, role FROM tracks ORDER BY sort"),
  ]);
  const [passedRes, remediationRes, readinessRes] = await env.DB_LEARNING.batch([
    env.DB_LEARNING.prepare(
      "SELECT lesson_id, MIN(graded_at) AS passed_at FROM attempts WHERE user_id = ?1 AND passed = 1 GROUP BY lesson_id",
    ).bind(user.id),
    env.DB_LEARNING.prepare(
      `SELECT code, lesson_id, reps_done, reps_required FROM remediation_assignments
       WHERE user_id = ?1 AND status = 'active' ORDER BY triggered_at`,
    ).bind(user.id),
    env.DB_LEARNING.prepare("SELECT skill_id, score FROM readiness WHERE user_id = ?1").bind(user.id),
  ]);

  const lessons = lessonsRes.results as LessonRow[];
  const passedAt = (passedRes.results as { lesson_id: string; passed_at: number }[]);
  const readiness = readinessRes.results as { skill_id: string; score: number }[];

  const territories = (tracksRes.results as TrackRow[]).map((track) => {
    const modules = (modulesRes.results as ModuleRow[])
      .filter((m) => m.track_id === track.id)
      .map((module) => {
        const own = lessons.filter((l) => l.module_id === module.id);
        const boss = own.find((l) => l.gates_module === 1) ?? null;
        const rest = own.filter((l) => l.gates_module !== 1);
        const cleared = rest.filter((l) => byLesson.get(l.id)?.status === "passed").length;
        const bossProgress = boss ? byLesson.get(boss.id) : undefined;
        const open = own.some((l) => {
          const status = byLesson.get(l.id)?.status;
          return status && status !== "locked";
        });
        return {
          id: module.id,
          title: module.title,
          outcome: module.outcome,
          lessons: rest.length,
          cleared,
          status: bossProgress?.status === "passed" ? "cleared" : open ? "open" : "locked",
          boss: boss
            ? {
                lesson_id: boss.id,
                title: boss.title,
                level: boss.level,
                status: bossProgress?.status ?? "locked",
                lock_reason: bossProgress?.lock_reason ?? null,
                best_score: bossProgress?.best_score ?? null,
                // The boss loses health as the module's lessons fall; the last blow is the checkpoint itself.
                hp: bossProgress?.status === "passed" ? 0 : rest.length === 0 ? 100 : Math.round(100 - (cleared / rest.length) * 100),
              }
            : null,
        };
      });
    return {
      id: track.id,
      name: track.name,
      role: track.role,
      modules,
      status: modules.every((m) => m.status === "cleared")
        ? "cleared"
        : modules.some((m) => m.status !== "locked")
          ? "open"
          : "locked",
    };
  });

  const passedLessons = progress.filter((p) => p.status === "passed");
  const quests = [
    ...(remediationRes.results as { code: string; lesson_id: string; reps_done: number; reps_required: number }[]).map((r) => ({
      kind: "remediation" as const,
      lesson_id: r.lesson_id,
      label: `Drill sửa lỗi ${r.code}`,
      detail: `${r.reps_done}/${r.reps_required} lượt đạt — làm xong mới mở lại loại bài đang bị chặn`,
    })),
    ...progress
      .filter((p) => p.status === "locked" && p.lock_reason === "mistake_review")
      .slice(0, 1)
      .map((p) => ({
        kind: "review" as const,
        lesson_id: p.lesson_id,
        label: "Xem lại bài đã chấm",
        detail: "Viết lại phần sai trước khi làm bài cùng loại",
      })),
    ...progress
      .filter((p) => p.status === "available" || p.status === "in_progress")
      .slice(0, 3)
      .map((p) => ({
        kind: "next" as const,
        lesson_id: p.lesson_id,
        label: lessons.find((l) => l.id === p.lesson_id)?.title ?? p.lesson_id,
        detail: p.status === "in_progress" ? "Đang làm dở" : "Đang mở",
      })),
  ];

  return json({
    hero: {
      level: user.level,
      name: user.display_name,
      // XP rewards doing things well, not doing many things: it is the sum of best scores.
      xp: passedLessons.reduce((sum, p) => sum + (p.best_score ?? 0), 0),
      passed: passedLessons.length,
      total: progress.length,
      streak: streakDays(passedAt.map((p) => p.passed_at)),
      readiness: readiness.length
        ? Math.round(readiness.reduce((sum, r) => sum + r.score, 0) / readiness.length)
        : null,
      skills_ready: readiness.filter((r) => r.score >= 70).length,
      skills_measured: readiness.length,
    },
    territories,
    quests,
  });
}
