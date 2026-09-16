import { autoAnswer } from "./assistant";
import { requireRole, type User } from "./auth";
import { AppEnv, HttpError, json, now, readJson, uuid } from "./util";

const MAX_BODY = 4000;
const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = 12;
const PREVIEW_CHARS = 120;

type Thread = {
  id: string;
  user_id: string;
  status: "open" | "closed";
  auto_answered: number;
  needs_human: number;
  created_at: number;
  last_message_at: number;
  learner_read_at: number;
  staff_read_at: number;
};

type Message = {
  id: string;
  author_side: "learner" | "staff" | "assistant";
  body: string;
  context_path: string | null;
  created_at: number;
};

const isStaff = (user: User) => user.role === "instructor" || user.role === "admin";

async function messagesOf(env: AppEnv, threadId: string): Promise<Message[]> {
  const { results } = await env.DB_LEARNING.prepare(
    `SELECT id, author_side, body, context_path, created_at FROM support_messages
     WHERE thread_id = ?1 ORDER BY created_at`,
  ).bind(threadId).all<Message>();
  return results;
}

function cleanBody(raw: unknown): string {
  const body = typeof raw === "string" ? raw.trim() : "";
  if (!body) throw new HttpError(400, "Tin nhắn trống.");
  if (body.length > MAX_BODY) throw new HttpError(400, `Tin nhắn dài quá ${MAX_BODY} ký tự.`);
  return body;
}

/** Stops a runaway client or a bored learner from filling the inbox. */
async function checkRate(env: AppEnv, userId: string) {
  const recent = await env.DB_LEARNING.prepare(
    "SELECT COUNT(*) AS n FROM support_messages WHERE author_id = ?1 AND created_at > ?2",
  ).bind(userId, now() - RATE_WINDOW_MS).first<{ n: number }>();
  if ((recent?.n ?? 0) >= RATE_LIMIT) {
    throw new HttpError(429, "Bạn gửi hơi nhanh. Chờ một phút rồi nhắn tiếp.");
  }
}

/** The learner's own thread. Reading it marks staff replies as seen. */
export async function myThread(env: AppEnv, user: User): Promise<Response> {
  const thread = await env.DB_LEARNING.prepare(
    `SELECT id, user_id, status, auto_answered, needs_human, created_at, last_message_at, learner_read_at, staff_read_at
     FROM support_threads WHERE user_id = ?1`,
  ).bind(user.id).first<Thread>();
  if (!thread) return json({ thread: null, messages: [], unread: 0 });

  const messages = await messagesOf(env, thread.id);
  const unread = messages.filter((m) => m.author_side !== "learner" && m.created_at > thread.learner_read_at).length;
  await env.DB_LEARNING.prepare("UPDATE support_threads SET learner_read_at = ?2 WHERE id = ?1")
    .bind(thread.id, now()).run();
  return json({
    thread: { id: thread.id, status: thread.status, auto_answered: thread.auto_answered === 1, needs_human: thread.needs_human === 1 },
    messages,
    unread,
  });
}

/** Sends as the learner, opening the thread on the first message. */
export async function sendFromLearner(request: Request, env: AppEnv, user: User): Promise<Response> {
  const payload = await readJson<{ body?: unknown; contextPath?: unknown }>(request);
  const body = cleanBody(payload.body);
  await checkRate(env, user.id);

  const at = now();
  const existing = await env.DB_LEARNING.prepare("SELECT id FROM support_threads WHERE user_id = ?1")
    .bind(user.id).first<{ id: string }>();
  const threadId = existing?.id ?? uuid();
  const contextPath = typeof payload.contextPath === "string" ? payload.contextPath.slice(0, 200) : null;

  await env.DB_LEARNING.batch([
    existing
      ? env.DB_LEARNING.prepare(
          "UPDATE support_threads SET last_message_at = ?2, status = 'open', learner_read_at = ?2 WHERE id = ?1",
        ).bind(threadId, at)
      : env.DB_LEARNING.prepare(
          `INSERT INTO support_threads (id, user_id, status, created_at, last_message_at, learner_read_at, staff_read_at)
           VALUES (?1, ?2, 'open', ?3, ?3, ?3, 0)`,
        ).bind(threadId, user.id, at),
    env.DB_LEARNING.prepare(
      `INSERT INTO support_messages (id, thread_id, author_id, author_side, body, context_path, created_at)
       VALUES (?1, ?2, ?3, 'learner', ?4, ?5, ?6)`,
    ).bind(uuid(), threadId, user.id, body, contextPath, at),
  ]);

  // The assistant answers only what it can read off this learner's record; anything else waits for staff.
  const auto = await autoAnswer(env, user, body, contextPath);
  if (auto) {
    await env.DB_LEARNING.batch([
      env.DB_LEARNING.prepare(
        `INSERT INTO support_messages (id, thread_id, author_id, author_side, body, context_path, created_at)
         VALUES (?1, ?2, NULL, 'assistant', ?3, NULL, ?4)`,
      ).bind(uuid(), threadId, auto.body, at + 1),
      env.DB_LEARNING.prepare("UPDATE support_threads SET auto_answered = 1 WHERE id = ?1").bind(threadId),
    ]);
  }

  return json({
    thread: { id: threadId, status: "open", auto_answered: !!auto, needs_human: false },
    answeredBy: auto ? auto.intent : null,
    messages: await messagesOf(env, threadId),
  }, 201);
}

/** Staff inbox: every thread, the ones waiting on a reply first. */
export async function staffInbox(env: AppEnv, user: User): Promise<Response> {
  requireRole(user, ["instructor", "admin"]);
  const { results } = await env.DB_LEARNING.prepare(
    `SELECT t.id, t.status, t.last_message_at, t.staff_read_at, t.auto_answered, t.needs_human,
            u.display_name, u.email, u.level,
            (SELECT body FROM support_messages m WHERE m.thread_id = t.id ORDER BY m.created_at DESC LIMIT 1) AS last_body,
            (SELECT author_side FROM support_messages m WHERE m.thread_id = t.id ORDER BY m.created_at DESC LIMIT 1) AS last_side,
            (SELECT COUNT(*) FROM support_messages m WHERE m.thread_id = t.id AND m.author_side = 'learner'
               AND m.created_at > t.staff_read_at) AS unread
     FROM support_threads t JOIN users u ON u.id = t.user_id
     ORDER BY t.needs_human DESC, unread > 0 DESC, t.last_message_at DESC LIMIT 100`,
  ).all<{ last_body: string | null; unread: number; needs_human: number }>();

  return json({
    items: results.map((row) => ({
      ...row,
      last_body: row.last_body ? row.last_body.slice(0, PREVIEW_CHARS) : null,
    })),
    waiting: results.filter((r) => r.unread > 0).length,
    needHuman: results.filter((r) => r.needs_human === 1).length,
  });
}

async function staffThread(env: AppEnv, threadId: string) {
  const thread = await env.DB_LEARNING.prepare(
    `SELECT t.id, t.status, t.user_id, u.display_name, u.email, u.level, u.persona
     FROM support_threads t JOIN users u ON u.id = t.user_id WHERE t.id = ?1`,
  ).bind(threadId).first<{ id: string }>();
  if (!thread) throw new HttpError(404, "Không có cuộc trò chuyện này.");
  return thread;
}

/** One conversation, for staff. Reading it marks the learner's messages as seen. */
export async function staffThreadView(env: AppEnv, user: User, threadId: string): Promise<Response> {
  requireRole(user, ["instructor", "admin"]);
  const thread = await staffThread(env, threadId);
  const messages = await messagesOf(env, threadId);
  await env.DB_LEARNING.prepare("UPDATE support_threads SET staff_read_at = ?2 WHERE id = ?1")
    .bind(threadId, now()).run();
  return json({ thread, messages });
}

export async function replyFromStaff(request: Request, env: AppEnv, user: User, threadId: string): Promise<Response> {
  requireRole(user, ["instructor", "admin"]);
  await staffThread(env, threadId);
  const payload = await readJson<{ body?: unknown; close?: unknown }>(request);
  const body = cleanBody(payload.body);
  const at = now();

  await env.DB_LEARNING.batch([
    env.DB_LEARNING.prepare(
      `INSERT INTO support_messages (id, thread_id, author_id, author_side, body, context_path, created_at)
       VALUES (?1, ?2, ?3, 'staff', ?4, NULL, ?5)`,
    ).bind(uuid(), threadId, user.id, body, at),
    env.DB_LEARNING.prepare(
      // A human has now answered, so the thread leaves the "needs a person" queue.
      "UPDATE support_threads SET last_message_at = ?2, staff_read_at = ?2, needs_human = 0, status = ?3 WHERE id = ?1",
    ).bind(threadId, at, payload.close === true ? "closed" : "open"),
  ]);
  return json({ messages: await messagesOf(env, threadId) }, 201);
}

/** The learner says the automatic answer did not do it; the thread jumps the queue. */
export async function escalate(env: AppEnv, user: User): Promise<Response> {
  const thread = await env.DB_LEARNING.prepare("SELECT id FROM support_threads WHERE user_id = ?1")
    .bind(user.id).first<{ id: string }>();
  if (!thread) throw new HttpError(404, "Bạn chưa có cuộc trò chuyện nào.");
  await env.DB_LEARNING.prepare(
    "UPDATE support_threads SET needs_human = 1, staff_read_at = 0, status = 'open', last_message_at = ?2 WHERE id = ?1",
  ).bind(thread.id, now()).run();
  return json({ needs_human: true });
}

/** Small enough for the app shell to poll: just the number on the badge. */
export async function unreadBadge(env: AppEnv, user: User): Promise<Response> {
  if (isStaff(user)) {
    const row = await env.DB_LEARNING.prepare(
      `SELECT COUNT(*) AS n FROM support_threads t
       WHERE EXISTS (SELECT 1 FROM support_messages m WHERE m.thread_id = t.id
                       AND m.author_side = 'learner' AND m.created_at > t.staff_read_at)`,
    ).first<{ n: number }>();
    return json({ unread: row?.n ?? 0, side: "staff" });
  }
  const row = await env.DB_LEARNING.prepare(
    `SELECT COUNT(*) AS n FROM support_messages m JOIN support_threads t ON t.id = m.thread_id
     WHERE t.user_id = ?1 AND m.author_side <> 'learner' AND m.created_at > t.learner_read_at`,
  ).bind(user.id).first<{ n: number }>();
  return json({ unread: row?.n ?? 0, side: "learner" });
}
