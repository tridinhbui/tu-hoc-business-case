import { AppEnv, json } from "./util";

const CACHE_KEY = "landing";
const CACHE_TTL_SECONDS = 300;

/**
 * Everything the public landing page shows, straight from the published content.
 * No learner data, no draft content: this is the one view served to people who are not signed in.
 */
export async function landingView(env: AppEnv): Promise<Response> {
  const cached = await env.CONTENT_CACHE.get(CACHE_KEY, "json");
  if (cached) return json(cached);

  const [tracks, paths, counts, kinds] = await env.DB_CONTENT.batch([
    env.DB_CONTENT.prepare(
      `SELECT t.id, t.name, t.role, COUNT(m.id) AS modules
         FROM tracks t LEFT JOIN modules m ON m.track_id = t.id AND m.status = 'published'
        GROUP BY t.id ORDER BY t.sort`,
    ),
    env.DB_CONTENT.prepare(
      `SELECT p.id, p.name, p.weeks, p.hours_per_week, p.persona, COUNT(i.lesson_id) AS lessons
         FROM learning_paths p LEFT JOIN path_items i ON i.path_id = p.id
        GROUP BY p.id ORDER BY p.id`,
    ),
    env.DB_CONTENT.prepare(
      `SELECT
         (SELECT COUNT(*) FROM lessons WHERE status = 'published') AS lessons,
         (SELECT COUNT(*) FROM modules WHERE status = 'published') AS modules,
         (SELECT COUNT(*) FROM cases)          AS cases,
         (SELECT COUNT(*) FROM capstones)      AS capstones,
         (SELECT COUNT(*) FROM skills)         AS skills,
         (SELECT COUNT(*) FROM mistake_codes)  AS mistake_codes,
         (SELECT IFNULL(SUM(est_minutes), 0) FROM lessons WHERE status = 'published') AS minutes`,
    ),
    env.DB_CONTENT.prepare(
      "SELECT kind, COUNT(*) AS n FROM lessons WHERE status = 'published' GROUP BY kind ORDER BY n DESC",
    ),
  ]);

  const data = {
    tracks: tracks.results,
    paths: paths.results,
    counts: counts.results[0],
    kinds: kinds.results,
  };
  await env.CONTENT_CACHE.put(CACHE_KEY, JSON.stringify(data), { expirationTtl: CACHE_TTL_SECONDS });
  return json(data);
}
