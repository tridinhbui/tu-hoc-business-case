import type { User } from "./auth";
import { requireRole } from "./auth";
import { AppEnv, chunk, json, now } from "./util";

const DAY_MS = 86_400_000;

async function titles(db: D1Database, table: string, key: string, column: string, ids: string[]): Promise<Map<string, string>> {
  const out = new Map<string, string>();
  for (const group of chunk([...new Set(ids)], 90)) {
    const { results } = await db.prepare(
      `SELECT ${key} AS k, ${column} AS v FROM ${table} WHERE ${key} IN (${group.map(() => "?").join(",")})`,
    ).bind(...group).all<{ k: string; v: string }>();
    results.forEach((r) => out.set(r.k, r.v));
  }
  return out;
}

/**
 * Everything an instructor needs to run the cohort: grading backlog, how graders score,
 * which mistakes recur, live sessions, and what the curriculum still lacks.
 */
export async function adminOverview(env: AppEnv, user: User): Promise<Response> {
  requireRole(user, ["instructor", "admin"]);
  const since = now() - 7 * DAY_MS;

  const [queueRes, attemptsRes, learnersRes, activeRes, rubricRes, graderRes, mistakeRes, liveStatusRes, liveRecentRes] =
    await env.DB_LEARNING.batch([
      env.DB_LEARNING.prepare(
        `SELECT count(*) AS total, sum(CASE WHEN claimed_by IS NOT NULL THEN 1 ELSE 0 END) AS claimed,
                min(enqueued_at) AS oldest FROM grading_queue`,
      ),
      env.DB_LEARNING.prepare(
        `SELECT sum(CASE WHEN status = 'graded' THEN 1 ELSE 0 END) AS graded,
                sum(CASE WHEN status = 'graded' AND graded_at >= ?1 THEN 1 ELSE 0 END) AS graded_last7,
                sum(CASE WHEN status IN ('draft','submitted','grading') THEN 1 ELSE 0 END) AS open
         FROM attempts`,
      ).bind(since),
      env.DB_LEARNING.prepare("SELECT level, count(*) AS n FROM users WHERE role = 'learner' GROUP BY level ORDER BY level"),
      env.DB_LEARNING.prepare("SELECT count(DISTINCT user_id) AS n FROM attempts WHERE started_at >= ?1").bind(since),
      env.DB_LEARNING.prepare(
        `SELECT g.rubric_id, count(*) AS n, round(avg(g.total_score), 1) AS avg_score,
                round(100.0 * sum(CASE WHEN a.passed = 1 THEN 1 ELSE 0 END) / count(*), 0) AS pass_rate
         FROM grades g JOIN attempts a ON a.id = g.attempt_id
         WHERE g.is_final = 1 GROUP BY g.rubric_id ORDER BY n DESC LIMIT 20`,
      ),
      env.DB_LEARNING.prepare(
        `SELECT g.grader_id, g.grader_type, u.display_name, count(*) AS n, round(avg(g.total_score), 1) AS avg_score
         FROM grades g JOIN users u ON u.id = g.grader_id
         WHERE g.is_final = 1 AND g.grader_id IS NOT NULL
         GROUP BY g.grader_id, g.grader_type ORDER BY n DESC LIMIT 20`,
      ),
      env.DB_LEARNING.prepare(
        `SELECT code, count(*) AS n, count(DISTINCT user_id) AS learners
         FROM mistake_tags GROUP BY code ORDER BY n DESC, code LIMIT 10`,
      ),
      env.DB_LEARNING.prepare("SELECT status, count(*) AS n FROM live_sessions GROUP BY status"),
      env.DB_LEARNING.prepare(
        `SELECT s.id, s.kind, s.lesson_id, s.status, s.started_at, s.deadline_at,
                (SELECT count(*) FROM live_session_participants p WHERE p.session_id = s.id) AS participants
         FROM live_sessions s ORDER BY COALESCE(s.started_at, s.scheduled_at) DESC LIMIT 10`,
      ),
    ]);

  const [rubricNamesRes, contentRes, casesRes] = await env.DB_CONTENT.batch([
    env.DB_CONTENT.prepare("SELECT id AS k, name AS v FROM rubrics"),
    env.DB_CONTENT.prepare(
      `SELECT
        (SELECT count(*) FROM lessons WHERE status = 'published') AS lessons_published,
        (SELECT count(DISTINCT c.rubric_id) FROM rubric_criteria c
          WHERE NOT EXISTS (SELECT 1 FROM rubric_criterion_levels l WHERE l.criterion_id = c.id)) AS rubrics_missing_levels,
        (SELECT count(*) FROM rubrics) AS rubrics_total,
        (SELECT count(*) FROM mistake_codes WHERE trim(root_cause) = '') AS codes_without_root_cause,
        (SELECT count(*) FROM mistake_codes) AS codes_total,
        (SELECT count(*) FROM assumption_bank WHERE source_url IS NULL) AS assumptions_without_source,
        (SELECT count(*) FROM assumption_bank) AS assumptions_total`,
    ),
    env.DB_CONTENT.prepare("SELECT status, count(*) AS n FROM cases GROUP BY status"),
  ]);

  const rubricNames = new Map((rubricNamesRes.results as { k: string; v: string }[]).map((r) => [r.k, r.v]));
  const graders = graderRes.results as { grader_id: string; avg_score: number }[];
  const overallAvg = graders.length
    ? Math.round((graders.reduce((s, g) => s + g.avg_score, 0) / graders.length) * 10) / 10
    : null;
  const mistakes = mistakeRes.results as { code: string }[];
  const mistakeTitles = await titles(env.DB_CONTENT, "mistake_codes", "code", "title", mistakes.map((m) => m.code));
  const liveRecent = liveRecentRes.results as { lesson_id: string }[];
  const lessonTitles = await titles(env.DB_CONTENT, "lessons", "id", "title", liveRecent.map((s) => s.lesson_id));

  return json({
    queue: queueRes.results[0],
    attempts: attemptsRes.results[0],
    learners: { byLevel: learnersRes.results, activeLast7: (activeRes.results[0] as { n: number }).n },
    rubrics: (rubricRes.results as { rubric_id: string }[]).map((r) => ({ ...r, name: rubricNames.get(r.rubric_id) ?? r.rubric_id })),
    graders: graders.map((g) => ({ ...g, delta: overallAvg === null ? null : Math.round((g.avg_score - overallAvg) * 10) / 10 })),
    overallAvg,
    mistakes: mistakes.map((m) => ({ ...m, title: mistakeTitles.get(m.code) ?? m.code })),
    live: {
      byStatus: liveStatusRes.results,
      recent: liveRecent.map((s) => ({ ...s, lesson_title: lessonTitles.get(s.lesson_id) ?? s.lesson_id })),
    },
    content: { ...(contentRes.results[0] as Record<string, number>), cases_by_status: casesRes.results },
  });
}
