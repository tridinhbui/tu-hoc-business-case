import type { User } from "./auth";
import { recomputeProgress } from "./gates";
import { AppEnv, HttpError, json, now } from "./util";

const WEEK_MS = 7 * 86_400_000;

type PathRow = { id: string; name: string; weeks: number; hours_per_week: string; persona: string; capstone_id: string | null };
type Enrollment = { path_id: string; status: string; started_at: number };

export async function listPaths(env: AppEnv, user: User): Promise<Response> {
  const [pathsRes, countsRes] = await env.DB_CONTENT.batch([
    env.DB_CONTENT.prepare("SELECT id, name, weeks, hours_per_week, persona, capstone_id FROM learning_paths ORDER BY id"),
    env.DB_CONTENT.prepare("SELECT path_id, COUNT(*) AS lessons FROM path_items GROUP BY path_id"),
  ]);
  const { results: enrollments } = await env.DB_LEARNING.prepare(
    "SELECT path_id, status, started_at FROM enrollments WHERE user_id = ?1",
  ).bind(user.id).all<Enrollment>();

  const counts = new Map((countsRes.results as { path_id: string; lessons: number }[]).map((r) => [r.path_id, r.lessons]));
  const mine = new Map(enrollments.map((e) => [e.path_id, e]));
  return json({
    items: (pathsRes.results as PathRow[]).map((p) => ({ ...p, lessons: counts.get(p.id) ?? 0, enrollment: mine.get(p.id) ?? null })),
  });
}

/** One active path at a time: joining a path pauses the current one. Re-joining resumes with the original start date. */
export async function enrollInPath(env: AppEnv, user: User, pathId: string): Promise<Response> {
  const path = await env.DB_CONTENT.prepare("SELECT id FROM learning_paths WHERE id = ?1").bind(pathId).first();
  if (!path) throw new HttpError(404, "Không có lộ trình này.");
  await env.DB_LEARNING.batch([
    env.DB_LEARNING.prepare(
      "UPDATE enrollments SET status = 'paused' WHERE user_id = ?1 AND status = 'active' AND path_id <> ?2",
    ).bind(user.id, pathId),
    env.DB_LEARNING.prepare(
      `INSERT INTO enrollments (user_id, path_id, started_at, status) VALUES (?1, ?2, ?3, 'active')
       ON CONFLICT (user_id, path_id) DO UPDATE SET status = 'active'`,
    ).bind(user.id, pathId, now()),
  ]);
  return json({ pathId, status: "active" });
}

export async function pathPlan(env: AppEnv, user: User, pathId: string): Promise<Response> {
  const path = await env.DB_CONTENT.prepare(
    "SELECT id, name, weeks, hours_per_week, persona, capstone_id FROM learning_paths WHERE id = ?1",
  ).bind(pathId).first<PathRow>();
  if (!path) throw new HttpError(404, "Không có lộ trình này.");

  const { results: items } = await env.DB_CONTENT.prepare(
    `SELECT pi.week, pi.sort, l.id, l.title, l.kind, l.level, l.est_minutes, l.gates_module, l.module_id
     FROM path_items pi JOIN lessons l ON l.id = pi.lesson_id
     WHERE pi.path_id = ?1 AND l.status = 'published' ORDER BY pi.week, pi.sort`,
  ).bind(pathId).all<{ week: number; sort: number; id: string; title: string; kind: string; level: number; est_minutes: number; gates_module: number; module_id: string }>();

  const capstone = path.capstone_id
    ? await env.DB_CONTENT.prepare("SELECT id, title, objective, deliverable FROM capstones WHERE id = ?1").bind(path.capstone_id).first()
    : null;

  const enrollment = await env.DB_LEARNING.prepare(
    "SELECT path_id, status, started_at FROM enrollments WHERE user_id = ?1 AND path_id = ?2",
  ).bind(user.id, pathId).first<Enrollment>();

  const progress = new Map((await recomputeProgress(env, user.id)).map((p) => [p.lesson_id, p]));
  const currentWeek = enrollment ? Math.min(path.weeks, Math.floor((now() - enrollment.started_at) / WEEK_MS) + 1) : null;

  const weeks = Array.from({ length: path.weeks }, (_, i) => {
    const week = i + 1;
    const lessons = items
      .filter((item) => item.week === week)
      .map((item) => {
        const p = progress.get(item.id);
        return { ...item, status: p?.status ?? "locked", lock_reason: p?.lock_reason ?? null, best_score: p?.best_score ?? null };
      });
    return { week, lessons, done: lessons.filter((l) => l.status === "passed").length, minutes: lessons.reduce((s, l) => s + l.est_minutes, 0) };
  });

  return json({ path, enrollment, currentWeek, weeks, capstone });
}
