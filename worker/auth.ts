import { AppEnv, HttpError, isDev, json, now, randomToken, readJson, sha256, uuid } from "./util";

const SESSION_COOKIE = "bc_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30;
const LINK_TTL_SECONDS = 15 * 60;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type User = {
  id: string;
  email: string;
  display_name: string;
  role: "learner" | "grader" | "instructor" | "admin";
  level: number;
  persona: string | null;
};

const TURNSTILE_ACTION = "login";

type SiteverifyResult = {
  success?: boolean;
  action?: string;
  hostname?: string;
  metadata?: { result_with_testing_key?: boolean };
};

/**
 * Server-side Turnstile check. Fails closed: the token must verify, carry the "login" action,
 * and come from a hostname in TURNSTILE_HOSTNAMES. Tokens are single-use.
 */
async function verifyTurnstile(env: AppEnv, token: unknown, ip: string | null) {
  if (!env.TURNSTILE_SECRET) throw new HttpError(503, "Chưa cấu hình Turnstile.");
  const allowedHostnames = new Set(
    (env.TURNSTILE_HOSTNAMES ?? "").split(",").map((h) => h.trim()).filter(Boolean),
  );
  if (allowedHostnames.size === 0) throw new HttpError(503, "Chưa cấu hình tên miền cho Turnstile.");
  if (typeof token !== "string" || token.length === 0 || token.length > 2048) {
    throw new HttpError(400, "Thiếu mã xác minh. Tải lại trang và thử lại.");
  }

  let result: SiteverifyResult;
  try {
    const params = new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: token });
    if (ip) params.set("remoteip", ip);
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      signal: AbortSignal.timeout(10_000),
      body: params,
    });
    if (!res.ok) throw new Error(`siteverify ${res.status}`);
    result = (await res.json()) as SiteverifyResult;
  } catch (err) {
    console.error("turnstile siteverify failed", err);
    throw new HttpError(403, "Không xác minh được. Tải lại trang và thử lại.");
  }

  // Cloudflare's testing keys return no action; accept that only in local development.
  const actionOk = result.action === TURNSTILE_ACTION || (isDev(env) && result.metadata?.result_with_testing_key === true);
  if (result.success !== true || !actionOk || !allowedHostnames.has(result.hostname ?? "")) {
    throw new HttpError(403, "Xác minh không thành công. Tải lại trang và thử lại.");
  }
}

export async function requestMagicLink(request: Request, env: AppEnv): Promise<Response> {
  const body = await readJson<{ email?: string; displayName?: string; turnstileToken?: unknown }>(request);
  const email = (body.email ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(email)) throw new HttpError(400, "Email không hợp lệ.");

  // Local development may skip Turnstile when no token is sent; production never does.
  if (!(isDev(env) && !body.turnstileToken)) {
    await verifyTurnstile(env, body.turnstileToken, request.headers.get("cf-connecting-ip"));
  }

  const token = randomToken();
  await env.SESSIONS.put(
    `ml:${await sha256(token)}`,
    JSON.stringify({ email, displayName: body.displayName?.trim() || null }),
    { expirationTtl: LINK_TTL_SECONDS },
  );
  const origin = isDev(env) ? new URL(request.url).origin : env.APP_ORIGIN;
  const link = `${origin}/api/auth/verify?token=${token}`;

  if (isDev(env)) return json({ sent: false, devLink: link });

  if (!env.EMAIL) throw new HttpError(503, "Chưa cấu hình gửi email.");
  await env.EMAIL.send({
    to: email,
    from: env.MAIL_FROM,
    subject: "Link đăng nhập Business Case",
    text: `Mở link sau trong 15 phút để đăng nhập: ${link}`,
    html: `<p>Mở link sau trong 15 phút để đăng nhập:</p><p><a href="${link}">Đăng nhập</a></p>`,
  });
  return json({ sent: true });
}

export async function verifyMagicLink(request: Request, env: AppEnv): Promise<Response> {
  const url = new URL(request.url);
  const token = url.searchParams.get("token") ?? "";
  const key = `ml:${await sha256(token)}`;
  const stored = await env.SESSIONS.get<{ email: string; displayName: string | null }>(key, "json");
  if (!stored) {
    return new Response("Link đăng nhập đã hết hạn hoặc đã được dùng. Yêu cầu link mới.", {
      status: 400,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }
  await env.SESSIONS.delete(key); // single use

  let user = await env.DB_LEARNING.prepare("SELECT id FROM users WHERE email = ?1").bind(stored.email).first<{ id: string }>();
  if (!user) {
    const id = uuid();
    await env.DB_LEARNING.prepare(
      "INSERT INTO users (id, email, display_name, role, level, created_at) VALUES (?1, ?2, ?3, 'learner', 1, ?4)",
    ).bind(id, stored.email, stored.displayName ?? stored.email.split("@")[0], now()).run();
    user = { id };
  }

  const sessionId = randomToken();
  await env.SESSIONS.put(`s:${await sha256(sessionId)}`, JSON.stringify({ userId: user.id }), {
    expirationTtl: SESSION_TTL_SECONDS,
  });

  const secure = url.protocol === "https:" ? "; Secure" : "";
  return new Response(null, {
    status: 302,
    headers: {
      location: "/",
      "set-cookie": `${SESSION_COOKIE}=${sessionId}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_TTL_SECONDS}${secure}`,
    },
  });
}

function readSessionCookie(request: Request): string | null {
  const header = request.headers.get("cookie") ?? "";
  for (const part of header.split(";")) {
    const [name, ...rest] = part.trim().split("=");
    if (name === SESSION_COOKIE) return rest.join("=");
  }
  return null;
}

export async function currentUser(request: Request, env: AppEnv): Promise<User | null> {
  const sessionId = readSessionCookie(request);
  if (!sessionId) return null;
  const session = await env.SESSIONS.get<{ userId: string }>(`s:${await sha256(sessionId)}`, "json");
  if (!session) return null;
  return env.DB_LEARNING.prepare("SELECT id, email, display_name, role, level, persona FROM users WHERE id = ?1")
    .bind(session.userId)
    .first<User>();
}

export async function requireUser(request: Request, env: AppEnv): Promise<User> {
  const user = await currentUser(request, env);
  if (!user) throw new HttpError(401, "Bạn cần đăng nhập.");
  return user;
}

export function requireRole(user: User, roles: User["role"][]) {
  if (!roles.includes(user.role)) throw new HttpError(403, "Bạn không có quyền thực hiện thao tác này.");
}

export async function logout(request: Request, env: AppEnv): Promise<Response> {
  const sessionId = readSessionCookie(request);
  if (sessionId) await env.SESSIONS.delete(`s:${await sha256(sessionId)}`);
  return json({ ok: true }, 200, { "set-cookie": `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0` });
}
