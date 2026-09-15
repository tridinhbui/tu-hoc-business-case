-- Case data a learner explicitly asked for during an attempt (the "Nếu hỏi …" items).
-- Graders see what was asked: asking for the right data is part of the skill being assessed.
CREATE TABLE attempt_reveals (
  attempt_id  TEXT NOT NULL REFERENCES attempts(id),
  item_id     TEXT NOT NULL,          -- bc_content.case_reveal_items.id (logical reference)
  revealed_at INTEGER NOT NULL,
  PRIMARY KEY (attempt_id, item_id)
);
