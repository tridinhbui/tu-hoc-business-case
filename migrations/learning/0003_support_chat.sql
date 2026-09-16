-- Direct line between a learner and staff. One thread per learner: support is a continuing
-- conversation with the programme, not a series of unrelated tickets.
CREATE TABLE support_threads (
  id              TEXT PRIMARY KEY,
  user_id         TEXT NOT NULL UNIQUE REFERENCES users(id),
  status          TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'closed')),
  created_at      INTEGER NOT NULL,
  last_message_at INTEGER NOT NULL,
  -- Read marks, so both sides can see what the other has not read yet.
  learner_read_at INTEGER NOT NULL DEFAULT 0,
  staff_read_at   INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX idx_support_threads_recent ON support_threads(last_message_at DESC);

CREATE TABLE support_messages (
  id           TEXT PRIMARY KEY,
  thread_id    TEXT NOT NULL REFERENCES support_threads(id),
  author_id    TEXT NOT NULL REFERENCES users(id),
  author_side  TEXT NOT NULL CHECK (author_side IN ('learner', 'staff')),
  body         TEXT NOT NULL,
  -- Where the learner was when they asked; staff answering "cái này" needs to know which page.
  context_path TEXT,
  created_at   INTEGER NOT NULL,
  CHECK (length(trim(body)) > 0 AND length(body) <= 4000)
);
CREATE INDEX idx_support_messages_thread ON support_messages(thread_id, created_at);
