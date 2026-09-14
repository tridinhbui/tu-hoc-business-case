-- D1 database: bc_learning
-- Learner activity. Grows with usage. References to bc_content ids
-- (lesson_id, skill_id, rubric criterion ids, mistake codes) are logical,
-- validated in the Worker — D1 cannot enforce foreign keys across databases.
-- Large payloads (submission files, recordings) live in R2 / Stream; rows keep keys only.

CREATE TABLE users (
  id           TEXT PRIMARY KEY,                    -- uuid
  email        TEXT NOT NULL UNIQUE COLLATE NOCASE,
  display_name TEXT NOT NULL,
  role         TEXT NOT NULL DEFAULT 'learner' CHECK (role IN ('learner','grader','instructor','admin')),
  persona      TEXT CHECK (persona IN ('P1','P2','P3','P4','P5','P6')),
  level        INTEGER NOT NULL DEFAULT 1 CHECK (level BETWEEN 1 AND 4),
  created_at   INTEGER NOT NULL
);

CREATE TABLE enrollments (
  user_id    TEXT NOT NULL REFERENCES users(id),
  path_id    TEXT NOT NULL,
  started_at INTEGER NOT NULL,
  status     TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','paused','completed','dropped')),
  PRIMARY KEY (user_id, path_id)
);

CREATE TABLE level_history (
  user_id             TEXT NOT NULL REFERENCES users(id),
  level               INTEGER NOT NULL CHECK (level BETWEEN 1 AND 4),
  achieved_at         INTEGER NOT NULL,
  evidence_attempt_id TEXT NOT NULL,
  PRIMARY KEY (user_id, level)
);

-- Materialised gate state per learner × lesson. Recomputed by the readiness consumer.
CREATE TABLE lesson_progress (
  user_id        TEXT NOT NULL REFERENCES users(id),
  lesson_id      TEXT NOT NULL,
  status         TEXT NOT NULL DEFAULT 'locked'
                   CHECK (status IN ('locked','available','in_progress','passed','failed')),
  lock_reason    TEXT CHECK (lock_reason IN
                   ('prereq','level','mistake_review','remediation','untimed_first')),
  best_score     INTEGER CHECK (best_score BETWEEN 0 AND 100),
  attempts_count INTEGER NOT NULL DEFAULT 0,
  updated_at     INTEGER NOT NULL,
  passed_at      INTEGER,
  PRIMARY KEY (user_id, lesson_id),
  CHECK ((status = 'locked') = (lock_reason IS NOT NULL))
);

CREATE TABLE teams (
  id         TEXT PRIMARY KEY,
  name       TEXT NOT NULL,
  created_by TEXT NOT NULL REFERENCES users(id),
  created_at INTEGER NOT NULL
);

CREATE TABLE team_members (
  team_id TEXT NOT NULL REFERENCES teams(id),
  user_id TEXT NOT NULL REFERENCES users(id),
  role    TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('lead','member')),
  PRIMARY KEY (team_id, user_id)
);

-- Live case, team simulation, Q&A panel. Realtime state lives in the LiveRoom Durable Object;
-- this row is the durable record and the DO's name.
CREATE TABLE live_sessions (
  id           TEXT PRIMARY KEY,
  kind         TEXT NOT NULL CHECK (kind IN ('live_case','team_sim','qa_panel','full_loop')),
  lesson_id    TEXT NOT NULL,
  case_id      TEXT,
  team_id      TEXT REFERENCES teams(id),
  scheduled_at INTEGER,
  started_at   INTEGER,
  deadline_at  INTEGER,
  ended_at     INTEGER,
  status       TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled','running','ended','cancelled')),
  summary      TEXT CHECK (summary IS NULL OR json_valid(summary))   -- flushed from the DO at the end
);

CREATE TABLE live_session_participants (
  session_id TEXT NOT NULL REFERENCES live_sessions(id),
  user_id    TEXT NOT NULL REFERENCES users(id),
  role       TEXT NOT NULL CHECK (role IN ('candidate','interviewer','panelist','team_member','observer')),
  PRIMARY KEY (session_id, user_id)
);

CREATE TABLE attempts (
  id              TEXT PRIMARY KEY,
  user_id         TEXT NOT NULL REFERENCES users(id),
  lesson_id       TEXT NOT NULL,
  lesson_kind     TEXT NOT NULL,                    -- denormalised from content for gate queries
  case_id         TEXT,
  content_version INTEGER NOT NULL,                 -- which version of the lesson/case was attempted
  team_id         TEXT REFERENCES teams(id),
  live_session_id TEXT REFERENCES live_sessions(id),
  status          TEXT NOT NULL DEFAULT 'draft'
                    CHECK (status IN ('draft','submitted','grading','graded','void')),
  started_at      INTEGER NOT NULL,
  submitted_at    INTEGER,
  graded_at       INTEGER,
  duration_sec    INTEGER,
  final_score     INTEGER CHECK (final_score BETWEEN 0 AND 100),
  passed          INTEGER CHECK (passed IN (0,1)),
  CHECK (status <> 'graded' OR (final_score IS NOT NULL AND passed IS NOT NULL AND graded_at IS NOT NULL))
);
CREATE INDEX idx_attempts_user_graded ON attempts(user_id, status, graded_at);
CREATE INDEX idx_attempts_user_lesson ON attempts(user_id, lesson_id);

CREATE TABLE attempt_artifacts (
  id         TEXT PRIMARY KEY,
  attempt_id TEXT NOT NULL REFERENCES attempts(id),
  kind       TEXT NOT NULL CHECK (kind IN ('deck','sheet','doc','image','recording','transcript')),
  r2_key     TEXT,
  stream_uid TEXT,
  mime       TEXT,
  bytes      INTEGER,
  created_at INTEGER NOT NULL,
  CHECK ((r2_key IS NOT NULL) + (stream_uid IS NOT NULL) = 1)
);
CREATE INDEX idx_artifacts_attempt ON attempt_artifacts(attempt_id);

-- Work waiting for a human grader (peer or instructor).
CREATE TABLE grading_queue (
  attempt_id   TEXT PRIMARY KEY REFERENCES attempts(id),
  needs        TEXT NOT NULL CHECK (needs IN ('peer','instructor')),
  min_grader_level INTEGER NOT NULL DEFAULT 1,     -- peer graders must have passed this level
  claimed_by   TEXT REFERENCES users(id),
  claimed_at   INTEGER,
  enqueued_at  INTEGER NOT NULL
);
CREATE INDEX idx_grading_queue_open ON grading_queue(needs, claimed_by, enqueued_at);

CREATE TABLE grades (
  id          TEXT PRIMARY KEY,
  attempt_id  TEXT NOT NULL REFERENCES attempts(id),
  grader_id   TEXT REFERENCES users(id),
  grader_type TEXT NOT NULL CHECK (grader_type IN ('auto','peer','instructor','interviewer','panel')),
  rubric_id   TEXT NOT NULL,
  total_score INTEGER NOT NULL CHECK (total_score BETWEEN 0 AND 100),
  is_final    INTEGER NOT NULL DEFAULT 0 CHECK (is_final IN (0,1)),
  created_at  INTEGER NOT NULL,
  CHECK (grader_type = 'auto' OR grader_id IS NOT NULL)
);
CREATE INDEX idx_grades_attempt ON grades(attempt_id);
CREATE UNIQUE INDEX uq_grades_one_final ON grades(attempt_id) WHERE is_final = 1;

-- Rubric rule: level 1 or 4 needs a written evidence note pointing at the submission.
CREATE TABLE grade_criteria (
  grade_id     TEXT NOT NULL REFERENCES grades(id),
  criterion_id TEXT NOT NULL,
  skill_id     TEXT,
  level        INTEGER NOT NULL CHECK (level BETWEEN 1 AND 4),
  points       REAL NOT NULL CHECK (points >= 0),
  evidence     TEXT,
  PRIMARY KEY (grade_id, criterion_id),
  CHECK (level IN (2,3) OR length(trim(coalesce(evidence,''))) > 0)
);

CREATE TABLE mistake_tags (
  id           TEXT PRIMARY KEY,
  attempt_id   TEXT NOT NULL REFERENCES attempts(id),
  user_id      TEXT NOT NULL REFERENCES users(id),
  code         TEXT NOT NULL,
  grade_id     TEXT REFERENCES grades(id),
  location_ref TEXT,                                 -- slide 6 / row 12 / 04:32 in recording
  learner_ack  INTEGER NOT NULL DEFAULT 0 CHECK (learner_ack IN (0,1)),
  created_at   INTEGER NOT NULL
);
CREATE INDEX idx_mistakes_user_code ON mistake_tags(user_id, code, created_at);
CREATE INDEX idx_mistakes_attempt ON mistake_tags(attempt_id);

-- Rule R-10: a graded attempt must be reviewed before the next attempt of the same kind.
CREATE TABLE mistake_reviews (
  attempt_id   TEXT PRIMARY KEY REFERENCES attempts(id),
  user_id      TEXT NOT NULL REFERENCES users(id),
  rewrite_note TEXT NOT NULL CHECK (length(trim(rewrite_note)) > 0),
  completed_at INTEGER NOT NULL
);

CREATE TABLE remediation_assignments (
  id             TEXT PRIMARY KEY,
  user_id        TEXT NOT NULL REFERENCES users(id),
  code           TEXT NOT NULL,
  lesson_id      TEXT NOT NULL,                     -- drill lesson to repeat
  blocks_kind    TEXT NOT NULL,                     -- lesson kind locked until done
  reps_required  INTEGER NOT NULL CHECK (reps_required >= 1),
  reps_done      INTEGER NOT NULL DEFAULT 0,
  status         TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','done','waived')),
  triggered_at   INTEGER NOT NULL,
  completed_at   INTEGER,
  CHECK (reps_done <= reps_required),
  CHECK ((status = 'done') = (completed_at IS NOT NULL AND reps_done = reps_required) OR status = 'waived')
);
CREATE UNIQUE INDEX uq_remediation_active ON remediation_assignments(user_id, code) WHERE status = 'active';

-- One row per criterion-level observation of a skill. Readiness is derived from this.
CREATE TABLE skill_evidence (
  id          TEXT PRIMARY KEY,
  user_id     TEXT NOT NULL REFERENCES users(id),
  skill_id    TEXT NOT NULL,
  attempt_id  TEXT NOT NULL REFERENCES attempts(id),
  layer       TEXT NOT NULL CHECK (layer IN ('framework','case','deliverable','live')),
  score       INTEGER NOT NULL CHECK (score BETWEEN 0 AND 100),
  observed_at INTEGER NOT NULL
);
CREATE INDEX idx_evidence_user_skill ON skill_evidence(user_id, skill_id, observed_at DESC);

CREATE TABLE readiness (
  user_id          TEXT NOT NULL REFERENCES users(id),
  skill_id         TEXT NOT NULL,
  raw_score        INTEGER NOT NULL CHECK (raw_score BETWEEN 0 AND 100),
  score            INTEGER NOT NULL CHECK (score BETWEEN 0 AND 100),   -- after decay
  last_evidence_at INTEGER NOT NULL,
  updated_at       INTEGER NOT NULL,
  PRIMARY KEY (user_id, skill_id),
  CHECK (score <= raw_score)
);

-- Rubric calibration (production plan: 2 graders within 10 points in 80% of cases).
CREATE TABLE grader_calibrations (
  id              TEXT PRIMARY KEY,
  grader_id       TEXT NOT NULL REFERENCES users(id),
  rubric_id       TEXT NOT NULL,
  attempt_id      TEXT NOT NULL REFERENCES attempts(id),
  score_given     INTEGER NOT NULL,
  reference_score INTEGER NOT NULL,
  created_at      INTEGER NOT NULL
);
CREATE INDEX idx_calibration_rubric ON grader_calibrations(rubric_id, created_at);

CREATE TABLE audit_log (
  id        TEXT PRIMARY KEY,
  actor_id  TEXT,
  action    TEXT NOT NULL,
  entity    TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  meta      TEXT CHECK (meta IS NULL OR json_valid(meta)),
  at        INTEGER NOT NULL
);
CREATE INDEX idx_audit_entity ON audit_log(entity, entity_id, at);
