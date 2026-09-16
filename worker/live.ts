import type { User } from "./auth";
import { requireRole } from "./auth";
import type { LiveRole } from "./liveroom";
import { AppEnv, HttpError, chunk, json, now, readJson, uuid } from "./util";

type CreateBody = {
  kind?: "live_case" | "team_sim" | "qa_panel" | "full_loop";
  lessonId?: string;
  caseId?: string;
  durationMinutes?: number;
  questionBudget?: number | null;
  answerDelayMinutes?: number;
  milestones?: { atMinutes: number; label: string }[];
  participants?: { userId?: string; email?: string; role: LiveRole }[];
};

const KINDS = new Set(["live_case", "team_sim", "qa_panel", "full_loop"]);

async function lessonTitles(env: AppEnv, ids: string[]): Promise<Map<string, string>> {
  const out = new Map<string, string>();
  for (const group of chunk([...new Set(ids)], 90)) {
    const { results } = await env.DB_CONTENT.prepare(
      `SELECT id, title FROM lessons WHERE id IN (${group.map(() => "?").join(",")})`,
    ).bind(...group).all<{ id: string; title: string }>();
    results.forEach((r) => out.set(r.id, r.title));
  }
  return out;
}

export async function createLiveSession(request: Request, env: AppEnv, user: User): Promise<Response> {
  requireRole(user, ["instructor", "admin"]);
  const body = await readJson<CreateBody>(request);
  if (!body.kind || !KINDS.has(body.kind)) throw new HttpError(400, "Loại phiên không hợp lệ.");
  if (!body.lessonId || !body.durationMinutes || body.durationMinutes <= 0) {
    throw new HttpError(400, "Cần bài học và thời lượng lớn hơn 0.");
  }
  const lesson = await env.DB_CONTENT.prepare("SELECT id FROM lessons WHERE id = ?1 AND status = 'published'")
    .bind(body.lessonId).first();
  if (!lesson) throw new HttpError(404, "Bài học không tồn tại hoặc chưa xuất bản.");

  // Participants may be given by id or by email; unknown emails are reported rather than skipped.
  const wanted = body.participants ?? [];
  const emails = wanted.map((p) => p.email?.trim().toLowerCase()).filter((e): e is string => !!e);
  const byEmail = new Map<string, string>();
  if (emails.length) {
    const { results } = await env.DB_LEARNING.prepare(
      `SELECT id, email FROM users WHERE email IN (${emails.map(() => "?").join(",")})`,
    ).bind(...emails).all<{ id: string; email: string }>();
    results.forEach((r) => byEmail.set(r.email.toLowerCase(), r.id));
  }
  const unknown = emails.filter((e) => !byEmail.has(e));
  if (unknown.length) throw new HttpError(400, "Không tìm thấy người học với email này.", { unknown });

  const participants = [
    ...wanted.map((p) => ({ userId: p.email ? byEmail.get(p.email.trim().toLowerCase())! : p.userId!, role: p.role })).filter((p) => p.userId),
    { userId: user.id, role: "interviewer" as LiveRole },
  ];

  const id = uuid();
  const ts = now();
  const deadline = ts + Math.round(body.durationMinutes * 60_000);
  await env.DB_LEARNING.batch([
    env.DB_LEARNING.prepare(
      `INSERT INTO live_sessions (id, kind, lesson_id, case_id, started_at, deadline_at, status)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, 'running')`,
    ).bind(id, body.kind, body.lessonId, body.caseId ?? null, ts, deadline),
    ...participants.map((p) =>
      env.DB_LEARNING.prepare(
        "INSERT INTO live_session_participants (session_id, user_id, role) VALUES (?1, ?2, ?3) ON CONFLICT DO NOTHING",
      ).bind(id, p.userId, p.role),
    ),
  ]);

  const state = await env.LIVE_ROOM.getByName(id).init({
    sessionId: id,
    kind: body.kind,
    durationMinutes: body.durationMinutes,
    questionBudget: body.questionBudget ?? null,
    answerDelayMinutes: body.answerDelayMinutes ?? 0,
    milestones: body.milestones ?? [],
  });
  return json({ sessionId: id, state }, 201);
}

export async function listLiveSessions(env: AppEnv, user: User): Promise<Response> {
  const { results } = await env.DB_LEARNING.prepare(
    `SELECT s.id, s.kind, s.lesson_id, s.case_id, s.status, s.started_at, s.deadline_at, s.ended_at, p.role
     FROM live_sessions s JOIN live_session_participants p ON p.session_id = s.id
     WHERE p.user_id = ?1 ORDER BY COALESCE(s.started_at, s.scheduled_at) DESC LIMIT 50`,
  ).bind(user.id).all<{ id: string; lesson_id: string }>();
  const titles = await lessonTitles(env, results.map((r) => r.lesson_id));
  return json({ items: results.map((r) => ({ ...r, lesson_title: titles.get(r.lesson_id) ?? r.lesson_id })) });
}

async function participantRole(env: AppEnv, sessionId: string, userId: string): Promise<LiveRole> {
  const row = await env.DB_LEARNING.prepare(
    "SELECT role FROM live_session_participants WHERE session_id = ?1 AND user_id = ?2",
  ).bind(sessionId, userId).first<{ role: LiveRole }>();
  if (!row) throw new HttpError(403, "Bạn không tham gia phiên này.");
  return row.role;
}

export async function liveState(env: AppEnv, user: User, sessionId: string): Promise<Response> {
  const role = await participantRole(env, sessionId, user.id);
  const [sessionRes, participantsRes] = await env.DB_LEARNING.batch([
    env.DB_LEARNING.prepare(
      "SELECT id, kind, lesson_id, case_id, status, started_at, deadline_at, ended_at, summary FROM live_sessions WHERE id = ?1",
    ).bind(sessionId),
    env.DB_LEARNING.prepare(
      `SELECT p.user_id, p.role, u.display_name FROM live_session_participants p
       JOIN users u ON u.id = p.user_id WHERE p.session_id = ?1 ORDER BY p.role`,
    ).bind(sessionId),
  ]);
  const session = sessionRes.results[0] as { lesson_id: string } | undefined;
  if (!session) throw new HttpError(404, "Không tìm thấy phiên.");
  const titles = await lessonTitles(env, [session.lesson_id]);
  const state = await env.LIVE_ROOM.getByName(sessionId).getState();
  return json({
    session: { ...session, lesson_title: titles.get(session.lesson_id) ?? session.lesson_id },
    role,
    state,
    participants: participantsRes.results,
  });
}

export async function liveSocket(request: Request, env: AppEnv, user: User, sessionId: string): Promise<Response> {
  if (request.headers.get("upgrade")?.toLowerCase() !== "websocket") throw new HttpError(426, "Cần kết nối WebSocket.");
  const role = await participantRole(env, sessionId, user.id);
  const headers = new Headers(request.headers);
  headers.set("x-user-id", user.id);
  headers.set("x-live-role", role);
  return env.LIVE_ROOM.getByName(sessionId).fetch(new Request(request, { headers }));
}
