import type { User } from "./auth";
import { requireRole } from "./auth";
import type { LiveRole } from "./liveroom";
import { AppEnv, HttpError, json, now, readJson, uuid } from "./util";

type CreateBody = {
  kind?: "live_case" | "team_sim" | "qa_panel" | "full_loop";
  lessonId?: string;
  caseId?: string;
  durationMinutes?: number;
  questionBudget?: number | null;
  answerDelayMinutes?: number;
  milestones?: { atMinutes: number; label: string }[];
  participants?: { userId: string; role: LiveRole }[];
};

export async function createLiveSession(request: Request, env: AppEnv, user: User): Promise<Response> {
  requireRole(user, ["instructor", "admin"]);
  const body = await readJson<CreateBody>(request);
  if (!body.kind || !body.lessonId || !body.durationMinutes || body.durationMinutes <= 0) {
    throw new HttpError(400, "Cần kind, lessonId và durationMinutes > 0.");
  }
  const id = uuid();
  const ts = now();
  const participants = [...(body.participants ?? []), { userId: user.id, role: "interviewer" as LiveRole }];
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

async function participantRole(env: AppEnv, sessionId: string, userId: string): Promise<LiveRole> {
  const row = await env.DB_LEARNING.prepare(
    "SELECT role FROM live_session_participants WHERE session_id = ?1 AND user_id = ?2",
  ).bind(sessionId, userId).first<{ role: LiveRole }>();
  if (!row) throw new HttpError(403, "Bạn không tham gia phiên này.");
  return row.role;
}

export async function liveState(env: AppEnv, user: User, sessionId: string): Promise<Response> {
  await participantRole(env, sessionId, user.id);
  return json(await env.LIVE_ROOM.getByName(sessionId).getState());
}

export async function liveSocket(request: Request, env: AppEnv, user: User, sessionId: string): Promise<Response> {
  if (request.headers.get("upgrade")?.toLowerCase() !== "websocket") throw new HttpError(426, "Cần kết nối WebSocket.");
  const role = await participantRole(env, sessionId, user.id);
  const headers = new Headers(request.headers);
  headers.set("x-user-id", user.id);
  headers.set("x-live-role", role);
  return env.LIVE_ROOM.getByName(sessionId).fetch(new Request(request, { headers }));
}
