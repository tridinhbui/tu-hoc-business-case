import { recomputeProgress } from "./gates";
import { AppEnv, now, uuid } from "./util";

const DAY_MS = 86_400_000;

// R1 · weighted average of the last 3 evidence rows per skill, decayed after 42 days (floor 60%).
const READINESS_RECOMPUTE = `
WITH ranked AS (
  SELECT user_id, skill_id, score, observed_at,
         CASE layer WHEN 'framework' THEN 5 WHEN 'case' THEN 40
                    WHEN 'deliverable' THEN 25 WHEN 'live' THEN 25 END AS w,
         ROW_NUMBER() OVER (PARTITION BY skill_id ORDER BY observed_at DESC) AS rn
  FROM skill_evidence WHERE user_id = ?1
),
agg AS (
  SELECT user_id, skill_id,
         CAST(ROUND(SUM(score * w) * 1.0 / SUM(w)) AS INTEGER) AS raw_score,
         MAX(observed_at) AS last_evidence_at
  FROM ranked WHERE rn <= 3
  GROUP BY user_id, skill_id
)
INSERT INTO readiness (user_id, skill_id, raw_score, score, last_evidence_at, updated_at)
SELECT user_id, skill_id, raw_score,
       CAST(ROUND(raw_score * MAX(0.6, 1.0 - 0.01 * MAX(0, (?2 - last_evidence_at) / 86400000.0 - 42))) AS INTEGER),
       last_evidence_at, ?2
FROM agg WHERE true
ON CONFLICT (user_id, skill_id) DO UPDATE SET
  raw_score = excluded.raw_score, score = excluded.score,
  last_evidence_at = excluded.last_evidence_at, updated_at = excluded.updated_at`;

// G2 · codes in ≥2 of the last 3 graded attempts, counting only tags newer than the
// last completed remediation for that code, and with no active assignment.
const REMEDIATION_TRIGGERS = `
WITH last3 AS (
  SELECT id FROM attempts WHERE user_id = ?1 AND status = 'graded' ORDER BY graded_at DESC LIMIT 3
)
SELECT t.code, COUNT(DISTINCT t.attempt_id) AS hits,
       (SELECT a.lesson_kind FROM mistake_tags t2 JOIN attempts a ON a.id = t2.attempt_id
        WHERE t2.user_id = ?1 AND t2.code = t.code ORDER BY t2.created_at DESC LIMIT 1) AS last_kind
FROM mistake_tags t
JOIN last3 ON last3.id = t.attempt_id
WHERE t.user_id = ?1
  AND t.created_at > COALESCE((SELECT MAX(completed_at) FROM remediation_assignments
                               WHERE user_id = ?1 AND code = t.code AND status = 'done'), 0)
  AND NOT EXISTS (SELECT 1 FROM remediation_assignments ra
                  WHERE ra.user_id = ?1 AND ra.code = t.code AND ra.status = 'active')
GROUP BY t.code
HAVING COUNT(DISTINCT t.attempt_id) >= 2`;

export async function processLearner(env: AppEnv, userId: string) {
  const ts = now();

  // 1 · readiness
  await env.DB_LEARNING.prepare(READINESS_RECOMPUTE).bind(userId, ts).run();

  // 2 · progress on active remediation: count passed attempts of the drill since it was assigned
  const { results: active } = await env.DB_LEARNING.prepare(
    `SELECT ra.id, ra.reps_required,
            (SELECT COUNT(*) FROM attempts a WHERE a.user_id = ra.user_id AND a.lesson_id = ra.lesson_id
               AND a.status = 'graded' AND a.passed = 1 AND a.graded_at >= ra.triggered_at) AS done
     FROM remediation_assignments ra WHERE ra.user_id = ?1 AND ra.status = 'active'`,
  ).bind(userId).all<{ id: string; reps_required: number; done: number }>();
  const remediationUpdates = active.map((r) => {
    const reps = Math.min(r.done, r.reps_required);
    return reps >= r.reps_required
      ? env.DB_LEARNING.prepare("UPDATE remediation_assignments SET reps_done = ?1, status = 'done', completed_at = ?2 WHERE id = ?3").bind(reps, ts, r.id)
      : env.DB_LEARNING.prepare("UPDATE remediation_assignments SET reps_done = ?1 WHERE id = ?2").bind(reps, r.id);
  });
  if (remediationUpdates.length) await env.DB_LEARNING.batch(remediationUpdates);

  // 3 · new remediation triggers
  const { results: triggers } = await env.DB_LEARNING.prepare(REMEDIATION_TRIGGERS)
    .bind(userId).all<{ code: string; hits: number; last_kind: string }>();
  for (const t of triggers) {
    const code = await env.DB_CONTENT.prepare(
      "SELECT remediation_lesson_id, remediation_reps FROM mistake_codes WHERE code = ?1",
    ).bind(t.code).first<{ remediation_lesson_id: string | null; remediation_reps: number }>();
    if (!code?.remediation_lesson_id) continue;
    await env.DB_LEARNING.prepare(
      `INSERT INTO remediation_assignments (id, user_id, code, lesson_id, blocks_kind, reps_required, triggered_at)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)
       ON CONFLICT (user_id, code) WHERE status = 'active' DO NOTHING`,
    ).bind(uuid(), userId, t.code, code.remediation_lesson_id, t.last_kind, code.remediation_reps, ts).run();
  }

  // 4 · level promotion: every gate lesson of the next level passed
  const user = await env.DB_LEARNING.prepare("SELECT level FROM users WHERE id = ?1").bind(userId).first<{ level: number }>();
  if (user) {
    const { results: gates } = await env.DB_CONTENT.prepare(
      "SELECT level, lesson_id FROM level_gates WHERE level > ?1 ORDER BY level",
    ).bind(user.level).all<{ level: number; lesson_id: string }>();
    let level = user.level;
    for (const target of [...new Set(gates.map((g) => g.level))]) {
      if (target !== level + 1) break;
      const required = gates.filter((g) => g.level === target).map((g) => g.lesson_id);
      const { results: passed } = await env.DB_LEARNING.prepare(
        `SELECT lesson_id, MIN(id) AS attempt_id FROM attempts
         WHERE user_id = ?1 AND status = 'graded' AND passed = 1 AND lesson_id IN (${required.map(() => "?").join(",")})
         GROUP BY lesson_id`,
      ).bind(userId, ...required).all<{ lesson_id: string; attempt_id: string }>();
      if (passed.length !== required.length) break;
      await env.DB_LEARNING.batch([
        env.DB_LEARNING.prepare("UPDATE users SET level = ?1 WHERE id = ?2").bind(target, userId),
        env.DB_LEARNING.prepare(
          "INSERT INTO level_history (user_id, level, achieved_at, evidence_attempt_id) VALUES (?1, ?2, ?3, ?4) ON CONFLICT DO NOTHING",
        ).bind(userId, target, ts, passed[passed.length - 1].attempt_id),
      ]);
      level = target;
    }
  }

  // 5 · gates
  await recomputeProgress(env, userId);
}

/** Queue consumer: de-duplicates learners within a batch and processes each once. */
export async function consumeReadiness(batch: MessageBatch<{ userId: string }>, env: AppEnv) {
  const byUser = new Map<string, Message<{ userId: string }>[]>();
  for (const m of batch.messages) {
    const list = byUser.get(m.body.userId) ?? [];
    list.push(m);
    byUser.set(m.body.userId, list);
  }
  for (const [userId, messages] of byUser) {
    try {
      await processLearner(env, userId);
      messages.forEach((m) => m.ack());
    } catch (err) {
      console.error("readiness consumer failed", userId, err);
      messages.forEach((m) => m.retry());
    }
  }
}

/** Cron 0 19 * * * — daily decay, paged by user id. */
export async function decayAll(env: AppEnv) {
  const ts = now();
  let after = "";
  for (;;) {
    const { results } = await env.DB_LEARNING.prepare(
      "SELECT DISTINCT user_id FROM readiness WHERE user_id > ?1 ORDER BY user_id LIMIT 500",
    ).bind(after).all<{ user_id: string }>();
    if (!results.length) break;
    const last = results[results.length - 1].user_id;
    await env.DB_LEARNING.prepare(
      `UPDATE readiness
       SET score = CAST(ROUND(raw_score * MAX(0.6, 1.0 - 0.01 * MAX(0, (?1 - last_evidence_at) / 86400000.0 - 42))) AS INTEGER),
           updated_at = ?1
       WHERE user_id > ?2 AND user_id <= ?3`,
    ).bind(ts, after, last).run();
    after = last;
  }
}

/** Cron *\/15 * * * * — release grading claims held longer than 2 hours. */
export async function releaseStaleClaims(env: AppEnv) {
  await env.DB_LEARNING.prepare(
    "UPDATE grading_queue SET claimed_by = NULL, claimed_at = NULL WHERE claimed_at < ?1",
  ).bind(now() - 2 * 60 * 60 * 1000).run();
}

export { DAY_MS };
