-- Lessons whose pass promotes a learner to the next level (blueprint § 06).
-- L2: checkpoint A4 (014) · L3: checkpoints B4 (026) and C1 (039) · L4: checkpoints C4 (050) and I1 (072)
CREATE TABLE level_gates (
  level     INTEGER NOT NULL CHECK (level BETWEEN 2 AND 4),
  lesson_id TEXT NOT NULL REFERENCES lessons(id),
  PRIMARY KEY (level, lesson_id)
);
