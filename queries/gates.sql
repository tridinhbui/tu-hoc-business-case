-- Gate & routing queries used by the Worker against bc_learning.
-- Parameters: ?1 = user_id, ?2 = lesson_kind, ?3 = now_ms

-- G1 · Mistake-review gate (rule R-10):
-- graded attempts of the same kind that the learner has not reviewed yet.
-- name: pending_reviews
SELECT a.id, a.lesson_id, a.graded_at
FROM attempts a
LEFT JOIN mistake_reviews r ON r.attempt_id = a.id
WHERE a.user_id = ?1 AND a.lesson_kind = ?2 AND a.status = 'graded' AND r.attempt_id IS NULL
  -- a clean pass (no failure, no tagged mistakes) has nothing to review
  AND (a.passed = 0 OR EXISTS (SELECT 1 FROM mistake_tags t WHERE t.attempt_id = a.id));

-- G2 · Remediation trigger:
-- codes seen in ≥2 of the learner's last 3 graded attempts, newer than the last completed
-- remediation for that code, with no active assignment yet.
-- name: remediation_triggers
WITH last3 AS (
  SELECT id FROM attempts
  WHERE user_id = ?1 AND status = 'graded'
  ORDER BY graded_at DESC LIMIT 3
)
SELECT t.code, COUNT(DISTINCT t.attempt_id) AS hits
FROM mistake_tags t
JOIN last3 ON last3.id = t.attempt_id
WHERE t.user_id = ?1
  -- ignore tags already dealt with by a completed remediation for the same code
  AND t.created_at > COALESCE((SELECT MAX(completed_at) FROM remediation_assignments
                               WHERE user_id = ?1 AND code = t.code AND status = 'done'), 0)
  AND NOT EXISTS (SELECT 1 FROM remediation_assignments ra
                  WHERE ra.user_id = ?1 AND ra.code = t.code AND ra.status = 'active')
GROUP BY t.code
HAVING COUNT(DISTINCT t.attempt_id) >= 2;

-- G3 · Active remediation locks: lesson kinds blocked for this learner.
-- name: blocked_kinds
SELECT DISTINCT blocks_kind, code, reps_done, reps_required
FROM remediation_assignments
WHERE user_id = ?1 AND status = 'active';

-- R1 · Readiness recompute for one learner:
-- last 3 evidence rows per skill, weighted by assessment layer
-- (framework 5 · case 40 · deliverable 25 · live 25), then decay after 42 days
-- at 1% of raw per day, floored at 60% of raw.
-- name: readiness_recompute
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
       CAST(ROUND(raw_score * MAX(0.6, 1.0 - 0.01 * MAX(0, (?3 - last_evidence_at) / 86400000.0 - 42))) AS INTEGER),
       last_evidence_at, ?3
FROM agg WHERE true
ON CONFLICT (user_id, skill_id) DO UPDATE SET
  raw_score = excluded.raw_score, score = excluded.score,
  last_evidence_at = excluded.last_evidence_at, updated_at = excluded.updated_at;

-- R2 · Daily decay (Cron Trigger) across all learners, in pages by user_id.
-- name: readiness_decay_page   (?1 = now_ms, ?2 = after_user_id, ?3 = page_size)
UPDATE readiness
SET score = CAST(ROUND(raw_score * MAX(0.6, 1.0 - 0.01 * MAX(0, (?1 - last_evidence_at) / 86400000.0 - 42))) AS INTEGER),
    updated_at = ?1
WHERE user_id IN (SELECT DISTINCT user_id FROM readiness WHERE user_id > ?2 ORDER BY user_id LIMIT ?3);
