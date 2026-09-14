-- D1 database: bc_content
-- Catalog of the curriculum. Small, read-heavy, versioned, cached in KV.
-- Timestamps are unix epoch milliseconds (INTEGER).

CREATE TABLE skills (
  id          TEXT PRIMARY KEY CHECK (id GLOB 'S[0-9][0-9]'),
  name        TEXT NOT NULL,
  description TEXT NOT NULL,
  sort        INTEGER NOT NULL
);

CREATE TABLE skill_levels (
  skill_id   TEXT NOT NULL REFERENCES skills(id),
  level      TEXT NOT NULL CHECK (level IN ('beginner','intermediate','advanced')),
  descriptor TEXT NOT NULL,
  evidence   TEXT NOT NULL,
  PRIMARY KEY (skill_id, level)
);

CREATE TABLE tracks (
  id    TEXT PRIMARY KEY CHECK (id GLOB '[A-J]'),
  name  TEXT NOT NULL,
  role  TEXT NOT NULL,
  sort  INTEGER NOT NULL
);

CREATE TABLE modules (
  id           TEXT PRIMARY KEY,                    -- 'B2'
  track_id     TEXT NOT NULL REFERENCES tracks(id),
  title        TEXT NOT NULL,
  level_min    INTEGER NOT NULL CHECK (level_min BETWEEN 1 AND 4),
  level_max    INTEGER NOT NULL CHECK (level_max BETWEEN 1 AND 4),
  outcome      TEXT NOT NULL,                       -- can-do statement
  out_of_scope TEXT NOT NULL DEFAULT '[]' CHECK (json_valid(out_of_scope)),
  est_minutes  INTEGER NOT NULL,
  status       TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','review','published','retired')),
  version      INTEGER NOT NULL DEFAULT 1,
  published_at INTEGER,
  CHECK (level_min <= level_max)
);

CREATE TABLE module_prereqs (
  module_id          TEXT NOT NULL REFERENCES modules(id),
  requires_module_id TEXT NOT NULL REFERENCES modules(id),
  kind               TEXT NOT NULL CHECK (kind IN ('hard','soft')),
  min_checkpoint_score INTEGER CHECK (min_checkpoint_score BETWEEN 0 AND 100),
  PRIMARY KEY (module_id, requires_module_id),
  CHECK (module_id <> requires_module_id)
);

CREATE TABLE module_skills (
  module_id TEXT NOT NULL REFERENCES modules(id),
  skill_id  TEXT NOT NULL REFERENCES skills(id),
  role      TEXT NOT NULL CHECK (role IN ('primary','secondary')),
  PRIMARY KEY (module_id, skill_id)
);

-- One row per item in the learning spine (the "100 bài").
CREATE TABLE lessons (
  id           TEXT PRIMARY KEY CHECK (id GLOB '[0-9][0-9][0-9]'),   -- '026'
  module_id    TEXT NOT NULL REFERENCES modules(id),
  title        TEXT NOT NULL,
  kind         TEXT NOT NULL CHECK (kind IN
                 ('lesson','drill','mini_case','full_case','timed_case',
                  'team_sim','qa_sim','live_case','checkpoint')),
  level        INTEGER NOT NULL CHECK (level BETWEEN 1 AND 4),
  est_minutes  INTEGER NOT NULL,
  output_spec  TEXT NOT NULL,                       -- "Output người học phải tạo" — required (standard Q2)
  timed_variant_of TEXT REFERENCES lessons(id),     -- rule R-09: timed case unlocks after its untimed twin
  status       TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','review','published','retired')),
  version      INTEGER NOT NULL DEFAULT 1,
  published_at INTEGER,
  CHECK (length(trim(output_spec)) > 0)
);
CREATE INDEX idx_lessons_module ON lessons(module_id);

CREATE TABLE lesson_skills (
  lesson_id TEXT NOT NULL REFERENCES lessons(id),
  skill_id  TEXT NOT NULL REFERENCES skills(id),
  PRIMARY KEY (lesson_id, skill_id)
);

-- Rubrics R1..R6 plus module-specific ones.
CREATE TABLE rubrics (
  id             TEXT PRIMARY KEY,                  -- 'R1', 'RB2'
  name           TEXT NOT NULL,
  pass_threshold INTEGER NOT NULL CHECK (pass_threshold BETWEEN 0 AND 100),
  version        INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE rubric_criteria (
  id        TEXT PRIMARY KEY,                       -- 'R1.quant'
  rubric_id TEXT NOT NULL REFERENCES rubrics(id),
  name      TEXT NOT NULL,
  weight    INTEGER NOT NULL CHECK (weight BETWEEN 1 AND 100),
  skill_id  TEXT REFERENCES skills(id),             -- which skill this criterion is evidence for
  sort      INTEGER NOT NULL
);
CREATE INDEX idx_criteria_rubric ON rubric_criteria(rubric_id);

CREATE TABLE rubric_criterion_levels (
  criterion_id TEXT NOT NULL REFERENCES rubric_criteria(id),
  level        INTEGER NOT NULL CHECK (level BETWEEN 1 AND 4),
  descriptor   TEXT NOT NULL,
  PRIMARY KEY (criterion_id, level)
);

-- A lesson that is graded points to one rubric (standard Q4).
CREATE TABLE lesson_rubrics (
  lesson_id               TEXT PRIMARY KEY REFERENCES lessons(id),
  rubric_id               TEXT NOT NULL REFERENCES rubrics(id),
  weight_overrides        TEXT NOT NULL DEFAULT '{}' CHECK (json_valid(weight_overrides)),  -- {"R1.quant":30}
  pass_threshold_override INTEGER CHECK (pass_threshold_override BETWEEN 0 AND 100)
);

CREATE TABLE mistake_codes (
  code                  TEXT PRIMARY KEY CHECK (code GLOB '[A-Z][A-Z][A-Z]-[0-9][0-9]'),
  group_code            TEXT NOT NULL,                           -- 'SIZ'
  skill_id              TEXT REFERENCES skills(id),
  title                 TEXT NOT NULL,
  symptom               TEXT NOT NULL,
  root_cause            TEXT NOT NULL,
  remediation_lesson_id TEXT REFERENCES lessons(id),
  remediation_reps      INTEGER NOT NULL DEFAULT 1 CHECK (remediation_reps >= 1),
  CHECK (substr(code,1,3) = group_code)
);

CREATE TABLE lesson_target_mistakes (
  lesson_id TEXT NOT NULL REFERENCES lessons(id),
  code      TEXT NOT NULL REFERENCES mistake_codes(code),
  PRIMARY KEY (lesson_id, code)
);

-- Case library (29 spec'd cases). Answer frames are grader-only.
CREATE TABLE cases (
  id           TEXT PRIMARY KEY CHECK (id GLOB 'C-[0-9][0-9][0-9]*'),  -- 'C-026', 'C-039a'
  lesson_id    TEXT NOT NULL REFERENCES lessons(id),
  title        TEXT NOT NULL,
  industry     TEXT NOT NULL,
  context      TEXT NOT NULL,
  question     TEXT NOT NULL,
  duration_min INTEGER NOT NULL,
  is_fictional INTEGER NOT NULL DEFAULT 1 CHECK (is_fictional IN (0,1)),
  status       TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','pilot','published','retired')),
  pilot_runs   INTEGER NOT NULL DEFAULT 0,           -- production rule: 3 pilot runs before publish
  version      INTEGER NOT NULL DEFAULT 1,
  CHECK (status <> 'published' OR pilot_runs >= 3)
);
CREATE INDEX idx_cases_lesson ON cases(lesson_id);

-- "Dữ liệu phát khi được hỏi": released only when the learner asks the matching thing.
CREATE TABLE case_reveal_items (
  id        TEXT PRIMARY KEY,
  case_id   TEXT NOT NULL REFERENCES cases(id),
  trigger   TEXT NOT NULL,                          -- "Nếu hỏi số tài xế hoạt động"
  content   TEXT NOT NULL,
  sort      INTEGER NOT NULL
);

CREATE TABLE case_traps (
  id           TEXT PRIMARY KEY,
  case_id      TEXT NOT NULL REFERENCES cases(id),
  description  TEXT NOT NULL,
  mistake_code TEXT NOT NULL REFERENCES mistake_codes(code)   -- every trap names what it tests
);

CREATE TABLE case_answer_frames (
  case_id          TEXT PRIMARY KEY REFERENCES cases(id),
  structure_md     TEXT NOT NULL,
  key_numbers      TEXT NOT NULL DEFAULT '{}' CHECK (json_valid(key_numbers)),
  quick_scoring_md TEXT NOT NULL
);

CREATE TABLE exhibits (
  id                    TEXT PRIMARY KEY,
  family                TEXT NOT NULL CHECK (family GLOB 'E[0-9]*'),  -- E1 bridge … E11 distractor
  title                 TEXT NOT NULL,
  r2_data_key           TEXT NOT NULL,              -- raw dataset always ships with the exhibit
  r2_render_key         TEXT,
  unit                  TEXT NOT NULL,
  source_note           TEXT NOT NULL,
  solution_action_title TEXT                        -- shown in solutions only, never to learners
);

CREATE TABLE case_exhibits (
  case_id       TEXT NOT NULL REFERENCES cases(id),
  exhibit_id    TEXT NOT NULL REFERENCES exhibits(id),
  sort          INTEGER NOT NULL,
  is_distractor INTEGER NOT NULL DEFAULT 0 CHECK (is_distractor IN (0,1)),
  PRIMARY KEY (case_id, exhibit_id)
);

CREATE TABLE panel_questions (
  id            TEXT PRIMARY KEY,
  case_id       TEXT NOT NULL REFERENCES cases(id),
  category      TEXT NOT NULL CHECK (category IN ('numbers','feasibility','challenge')),
  text          TEXT NOT NULL,
  from_appendix INTEGER NOT NULL DEFAULT 0 CHECK (from_appendix IN (0,1))
);

CREATE TABLE assumption_bank (
  id          TEXT PRIMARY KEY,
  label       TEXT NOT NULL,
  low         REAL,
  high        REAL,
  unit        TEXT NOT NULL,
  confidence  TEXT NOT NULL CHECK (confidence IN ('lookup','derived','guess','convention')),
  source_url  TEXT,
  verified_at INTEGER,
  -- nothing goes live without a source (case-library caution)
  CHECK (confidence = 'convention' OR verified_at IS NULL OR source_url IS NOT NULL)
);

CREATE TABLE learning_paths (
  id             TEXT PRIMARY KEY,                  -- 'P1'
  name           TEXT NOT NULL,
  weeks          INTEGER NOT NULL,
  hours_per_week TEXT NOT NULL,
  persona        TEXT NOT NULL,
  capstone_id    TEXT
);

CREATE TABLE path_items (
  path_id   TEXT NOT NULL REFERENCES learning_paths(id),
  week      INTEGER NOT NULL,
  lesson_id TEXT NOT NULL REFERENCES lessons(id),
  sort      INTEGER NOT NULL,
  PRIMARY KEY (path_id, lesson_id)
);

CREATE TABLE capstones (
  id          TEXT PRIMARY KEY,                     -- 'CP-01'
  title       TEXT NOT NULL,
  objective   TEXT NOT NULL,
  industry    TEXT NOT NULL,
  deliverable TEXT NOT NULL,
  rubric_mix  TEXT NOT NULL CHECK (json_valid(rubric_mix))   -- {"R3":40,"R4":30,...}
);
