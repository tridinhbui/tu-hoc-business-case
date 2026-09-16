-- Teaching content for a lesson. Until now a lesson carried only its output spec:
-- the thing the learner must produce. This is the material they read before producing it.
CREATE TABLE lesson_blocks (
  id        TEXT PRIMARY KEY,                       -- '019.03'
  lesson_id TEXT NOT NULL REFERENCES lessons(id),
  sort      INTEGER NOT NULL,
  kind      TEXT NOT NULL CHECK (kind IN
              ('goal','concept','worked_example','pitfall','checklist','exercise','source')),
  title     TEXT NOT NULL,
  body_md   TEXT NOT NULL,
  CHECK (length(trim(title)) > 0 AND length(trim(body_md)) > 0)
);
CREATE UNIQUE INDEX idx_lesson_blocks_order ON lesson_blocks(lesson_id, sort);
