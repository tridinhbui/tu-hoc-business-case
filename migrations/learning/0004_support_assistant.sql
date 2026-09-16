-- The assistant answers straight from the learner's own record, so its messages need an author side
-- of their own: they are not staff, and pretending they are would let a machine answer sign off as
-- a person. author_id goes nullable for the same reason — no human sent them.
CREATE TABLE support_messages_new (
  id           TEXT PRIMARY KEY,
  thread_id    TEXT NOT NULL REFERENCES support_threads(id),
  author_id    TEXT REFERENCES users(id),
  author_side  TEXT NOT NULL CHECK (author_side IN ('learner', 'staff', 'assistant')),
  body         TEXT NOT NULL,
  context_path TEXT,
  created_at   INTEGER NOT NULL,
  CHECK (length(trim(body)) > 0 AND length(body) <= 4000),
  CHECK (author_side = 'assistant' OR author_id IS NOT NULL)
);
INSERT INTO support_messages_new (id, thread_id, author_id, author_side, body, context_path, created_at)
  SELECT id, thread_id, author_id, author_side, body, context_path, created_at FROM support_messages;
DROP TABLE support_messages;
ALTER TABLE support_messages_new RENAME TO support_messages;
CREATE INDEX idx_support_messages_thread ON support_messages(thread_id, created_at);

-- Set when the assistant has answered and the learner has not asked for a person anyway: staff can
-- then work the queue people are actually waiting in, without the answered ones disappearing.
ALTER TABLE support_threads ADD COLUMN auto_answered INTEGER NOT NULL DEFAULT 0 CHECK (auto_answered IN (0, 1));
ALTER TABLE support_threads ADD COLUMN needs_human INTEGER NOT NULL DEFAULT 0 CHECK (needs_human IN (0, 1));
