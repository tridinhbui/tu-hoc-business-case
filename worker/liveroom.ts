import { DurableObject } from "cloudflare:workers";
import type { AppEnv } from "./util";

export type LiveRole = "candidate" | "interviewer" | "panelist" | "team_member" | "observer";
type Attachment = { userId: string; role: LiveRole };

export type LiveConfig = {
  sessionId: string;
  kind: string;
  durationMinutes: number;
  questionBudget: number | null; // C-081: 5 questions per 24h round
  answerDelayMinutes: number; // C-081: answers are released after 2 hours
  milestones: { atMinutes: number; label: string }[]; // e.g. ghost deck at hour 3
};

const ASKERS: LiveRole[] = ["candidate", "team_member"];
const STAFF: LiveRole[] = ["interviewer", "panelist"];

/**
 * One room per live session. All state lives in the object's SQLite storage because
 * in-memory state is lost when the object hibernates between WebSocket messages.
 */
export class LiveRoom extends DurableObject<AppEnv> {
  private sql: SqlStorage;

  constructor(ctx: DurableObjectState, env: AppEnv) {
    super(ctx, env);
    this.sql = ctx.storage.sql;
    ctx.blockConcurrencyWhile(async () => {
      this.sql.exec(`
        CREATE TABLE IF NOT EXISTS meta (key TEXT PRIMARY KEY, value TEXT NOT NULL);
        CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY AUTOINCREMENT, at INTEGER NOT NULL, type TEXT NOT NULL, actor TEXT, payload TEXT);
        CREATE TABLE IF NOT EXISTS milestones (id INTEGER PRIMARY KEY AUTOINCREMENT, due_at INTEGER NOT NULL, kind TEXT NOT NULL, label TEXT, ref INTEGER, done INTEGER NOT NULL DEFAULT 0);
        CREATE TABLE IF NOT EXISTS questions (id INTEGER PRIMARY KEY AUTOINCREMENT, asked_by TEXT NOT NULL, text TEXT NOT NULL, asked_at INTEGER NOT NULL, answer TEXT, answered_at INTEGER, released INTEGER NOT NULL DEFAULT 0);
      `);
    });
  }

  private meta(key: string): string | null {
    const row = this.sql.exec("SELECT value FROM meta WHERE key = ?", key).toArray()[0];
    return row ? String(row.value) : null;
  }

  private setMeta(key: string, value: string | number) {
    this.sql.exec("INSERT INTO meta (key, value) VALUES (?, ?) ON CONFLICT (key) DO UPDATE SET value = excluded.value", key, String(value));
  }

  private log(type: string, actor: string | null, payload: unknown) {
    this.sql.exec("INSERT INTO events (at, type, actor, payload) VALUES (?, ?, ?, ?)", Date.now(), type, actor, JSON.stringify(payload));
  }

  /** Only one alarm exists per object, so the nearest pending milestone owns it. */
  private async scheduleNext() {
    const row = this.sql.exec("SELECT MIN(due_at) AS due FROM milestones WHERE done = 0").toArray()[0];
    const due = row?.due as number | null;
    if (due == null) await this.ctx.storage.deleteAlarm();
    else await this.ctx.storage.setAlarm(due);
  }

  private broadcast(message: unknown, roles?: LiveRole[]) {
    const data = JSON.stringify(message);
    const sockets = roles ? roles.flatMap((r) => this.ctx.getWebSockets(r)) : this.ctx.getWebSockets();
    for (const ws of sockets) {
      try {
        ws.send(data);
      } catch {
        // socket already closed
      }
    }
  }

  async init(config: LiveConfig) {
    if (this.meta("session_id")) return this.getState();
    const started = Date.now();
    const deadline = started + Math.round(config.durationMinutes * 60_000);
    this.setMeta("session_id", config.sessionId);
    this.setMeta("kind", config.kind);
    this.setMeta("status", "running");
    this.setMeta("started_at", started);
    this.setMeta("deadline_at", deadline);
    this.setMeta("question_budget", config.questionBudget ?? -1);
    this.setMeta("answer_delay_ms", Math.round(config.answerDelayMinutes * 60_000));
    for (const m of config.milestones) {
      this.sql.exec("INSERT INTO milestones (due_at, kind, label) VALUES (?, 'milestone', ?)", started + Math.round(m.atMinutes * 60_000), m.label);
    }
    this.sql.exec("INSERT INTO milestones (due_at, kind, label) VALUES (?, 'deadline', 'Hết giờ')", deadline);
    this.log("started", null, config);
    await this.scheduleNext();
    return this.getState();
  }

  getState() {
    const budget = Number(this.meta("question_budget") ?? -1);
    const used = Number(this.sql.exec("SELECT COUNT(*) AS n FROM questions").toArray()[0]?.n ?? 0);
    return {
      sessionId: this.meta("session_id"),
      kind: this.meta("kind"),
      status: this.meta("status"),
      startedAt: Number(this.meta("started_at")),
      deadlineAt: Number(this.meta("deadline_at")),
      questions: { budget: budget < 0 ? null : budget, used },
      upcoming: this.sql.exec("SELECT kind, label, due_at FROM milestones WHERE done = 0 ORDER BY due_at").toArray(),
      events: Number(this.sql.exec("SELECT COUNT(*) AS n FROM events").toArray()[0]?.n ?? 0),
      connected: this.ctx.getWebSockets().length,
    };
  }

  async fetch(request: Request): Promise<Response> {
    if (request.headers.get("upgrade")?.toLowerCase() !== "websocket") {
      return new Response("Expected a WebSocket upgrade.", { status: 426 });
    }
    const userId = request.headers.get("x-user-id");
    const role = request.headers.get("x-live-role") as LiveRole | null;
    if (!userId || !role) return new Response("Missing participant.", { status: 400 });

    const pair = new WebSocketPair();
    const [client, server] = Object.values(pair);
    this.ctx.acceptWebSocket(server, [role]);
    server.serializeAttachment({ userId, role } satisfies Attachment);
    server.send(JSON.stringify({ type: "state", state: this.getState() }));
    this.log("joined", userId, { role });
    return new Response(null, { status: 101, webSocket: client });
  }

  async webSocketMessage(ws: WebSocket, raw: string | ArrayBuffer) {
    const who = ws.deserializeAttachment() as Attachment;
    let msg: { type?: string; text?: string; questionId?: number; answer?: string; itemId?: string; content?: string };
    try {
      msg = JSON.parse(typeof raw === "string" ? raw : new TextDecoder().decode(raw));
    } catch {
      ws.send(JSON.stringify({ type: "error", message: "Tin nhắn phải là JSON." }));
      return;
    }
    if (this.meta("status") !== "running") {
      ws.send(JSON.stringify({ type: "error", message: "Phiên đã kết thúc." }));
      return;
    }

    switch (msg.type) {
      case "ask": {
        if (!ASKERS.includes(who.role) || !msg.text?.trim()) break;
        const budget = Number(this.meta("question_budget") ?? -1);
        const used = Number(this.sql.exec("SELECT COUNT(*) AS n FROM questions").toArray()[0]?.n ?? 0);
        if (budget >= 0 && used >= budget) {
          ws.send(JSON.stringify({ type: "error", message: `Đã dùng hết ${budget} câu hỏi.` }));
          return;
        }
        const id = Number(
          this.sql.exec("INSERT INTO questions (asked_by, text, asked_at) VALUES (?, ?, ?) RETURNING id", who.userId, msg.text.trim(), Date.now()).one().id,
        );
        const delay = Number(this.meta("answer_delay_ms") ?? 0);
        this.sql.exec("INSERT INTO milestones (due_at, kind, label, ref) VALUES (?, 'answer_window', 'Mở câu trả lời', ?)", Date.now() + delay, id);
        this.log("ask", who.userId, { id, text: msg.text });
        this.broadcast({ type: "question", id, text: msg.text.trim(), remaining: budget < 0 ? null : budget - used - 1 }, STAFF);
        ws.send(JSON.stringify({ type: "asked", id, remaining: budget < 0 ? null : budget - used - 1 }));
        await this.scheduleNext();
        return;
      }
      case "answer": {
        if (!STAFF.includes(who.role) || msg.questionId == null || !msg.answer?.trim()) break;
        this.sql.exec("UPDATE questions SET answer = ?, answered_at = ? WHERE id = ?", msg.answer.trim(), Date.now(), msg.questionId);
        this.log("answer", who.userId, { id: msg.questionId });
        const windowOpen = this.sql.exec(
          "SELECT COUNT(*) AS n FROM milestones WHERE kind = 'answer_window' AND ref = ? AND done = 1", msg.questionId,
        ).toArray()[0]?.n;
        if (Number(windowOpen) > 0) this.releaseAnswer(msg.questionId);
        return;
      }
      case "reveal": {
        if (!STAFF.includes(who.role) || !msg.itemId) break;
        this.log("reveal", who.userId, { itemId: msg.itemId });
        this.broadcast({ type: "reveal", itemId: msg.itemId, content: msg.content ?? null }, ASKERS);
        return;
      }
      case "state":
        ws.send(JSON.stringify({ type: "state", state: this.getState() }));
        return;
    }
    ws.send(JSON.stringify({ type: "error", message: "Thao tác không hợp lệ với vai trò của bạn." }));
  }

  private releaseAnswer(questionId: number) {
    const q = this.sql.exec("SELECT id, text, answer, released FROM questions WHERE id = ?", questionId).toArray()[0];
    if (!q || !q.answer || q.released) return;
    this.sql.exec("UPDATE questions SET released = 1 WHERE id = ?", questionId);
    this.broadcast({ type: "answer", id: q.id, question: q.text, answer: q.answer }, ASKERS);
  }

  async webSocketClose(ws: WebSocket, code: number) {
    const who = ws.deserializeAttachment() as Attachment | null;
    this.log("left", who?.userId ?? null, { code });
  }

  async alarm() {
    const due = this.sql.exec("SELECT id, kind, label, ref FROM milestones WHERE done = 0 AND due_at <= ? ORDER BY due_at", Date.now()).toArray();
    for (const m of due) {
      this.sql.exec("UPDATE milestones SET done = 1 WHERE id = ?", m.id);
      if (m.kind === "answer_window") this.releaseAnswer(Number(m.ref));
      else if (m.kind === "milestone") this.broadcast({ type: "milestone", label: m.label });
      else if (m.kind === "deadline") await this.end();
    }
    await this.scheduleNext();
  }

  private async end() {
    if (this.meta("status") === "ended") return;
    const endedAt = Date.now();
    this.setMeta("status", "ended");
    this.sql.exec("UPDATE milestones SET done = 1 WHERE done = 0");
    const summary = {
      questionsAsked: Number(this.sql.exec("SELECT COUNT(*) AS n FROM questions").toArray()[0]?.n ?? 0),
      questionsAnswered: Number(this.sql.exec("SELECT COUNT(*) AS n FROM questions WHERE answer IS NOT NULL").toArray()[0]?.n ?? 0),
      events: Number(this.sql.exec("SELECT COUNT(*) AS n FROM events").toArray()[0]?.n ?? 0),
      milestonesHit: this.sql.exec("SELECT label FROM milestones WHERE kind = 'milestone'").toArray().map((r) => r.label),
    };
    this.log("ended", null, summary);
    await this.env.DB_LEARNING.prepare(
      "UPDATE live_sessions SET status = 'ended', ended_at = ?1, summary = ?2 WHERE id = ?3",
    ).bind(endedAt, JSON.stringify(summary), this.meta("session_id")).run();
    this.broadcast({ type: "ended", summary });
    for (const ws of this.ctx.getWebSockets()) ws.close(1000, "session ended");
  }
}
