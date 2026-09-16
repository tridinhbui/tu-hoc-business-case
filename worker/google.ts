import { issueSession, upsertUser } from "./auth";
import { AppEnv, HttpError, isDev, now, randomToken, sha256 } from "./util";

const AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const STATE_TTL_SECONDS = 600;
const VALID_ISSUERS = new Set(["https://accounts.google.com", "accounts.google.com"]);

type IdTokenClaims = {
  iss?: string;
  aud?: string;
  exp?: number;
  nonce?: string;
  email?: string;
  email_verified?: boolean | string;
  name?: string;
};

export const googleEnabled = (env: AppEnv) => !!(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET);

/** Google must redirect back to the exact URI registered for the OAuth client. */
const redirectUri = (request: Request, env: AppEnv) =>
  `${isDev(env) ? new URL(request.url).origin : env.APP_ORIGIN}/api/auth/google/callback`;

function decodeJwtPayload(jwt: string): IdTokenClaims {
  const part = jwt.split(".")[1];
  if (!part) throw new Error("id_token has no payload");
  const base64 = part.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(part.length / 4) * 4, "=");
  const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes)) as IdTokenClaims;
}

export async function startGoogleLogin(request: Request, env: AppEnv): Promise<Response> {
  if (!googleEnabled(env)) throw new HttpError(503, "Chưa cấu hình đăng nhập Google.");
  // state protects against CSRF, nonce ties the id_token to this request; both are single-use.
  const state = randomToken();
  const nonce = randomToken();
  await env.SESSIONS.put(`g:${await sha256(state)}`, JSON.stringify({ nonce, at: now() }), {
    expirationTtl: STATE_TTL_SECONDS,
  });
  const params = new URLSearchParams({
    client_id: env.GOOGLE_CLIENT_ID!,
    redirect_uri: redirectUri(request, env),
    response_type: "code",
    scope: "openid email profile",
    state,
    nonce,
    prompt: "select_account",
    access_type: "online",
  });
  return new Response(null, { status: 302, headers: { location: `${AUTH_URL}?${params}` } });
}

export async function googleCallback(request: Request, env: AppEnv): Promise<Response> {
  const url = new URL(request.url);
  const fail = (reason: string) =>
    new Response(null, { status: 302, headers: { location: `/?login_error=${encodeURIComponent(reason)}` } });

  if (!googleEnabled(env)) return fail("Chưa cấu hình đăng nhập Google.");
  if (url.searchParams.get("error")) return fail("Bạn đã huỷ đăng nhập Google.");

  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  if (!code || !state) return fail("Thiếu tham số từ Google.");

  const stateKey = `g:${await sha256(state)}`;
  const saved = await env.SESSIONS.get<{ nonce: string }>(stateKey, "json");
  if (!saved) return fail("Yêu cầu đăng nhập đã hết hạn. Thử lại.");
  await env.SESSIONS.delete(stateKey); // single use

  let claims: IdTokenClaims;
  try {
    const res = await fetch(TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      signal: AbortSignal.timeout(10_000),
      body: new URLSearchParams({
        code,
        client_id: env.GOOGLE_CLIENT_ID!,
        client_secret: env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: redirectUri(request, env),
        grant_type: "authorization_code",
      }),
    });
    if (!res.ok) throw new Error(`token endpoint ${res.status}`);
    const token = (await res.json()) as { id_token?: string };
    if (!token.id_token) throw new Error("no id_token in response");
    // The token comes straight from Google's token endpoint over TLS, authenticated with our client
    // secret, so its signature is not re-verified here (Google's OpenID Connect guidance). The claims
    // below still have to match, and the token is never handed to anything else.
    claims = decodeJwtPayload(token.id_token);
  } catch (err) {
    console.error("google token exchange failed", err);
    return fail("Không đổi được mã đăng nhập với Google.");
  }

  const emailVerified = claims.email_verified === true || claims.email_verified === "true";
  if (
    !VALID_ISSUERS.has(claims.iss ?? "") ||
    claims.aud !== env.GOOGLE_CLIENT_ID ||
    !claims.exp ||
    claims.exp * 1000 <= Date.now() ||
    claims.nonce !== saved.nonce ||
    !claims.email ||
    !emailVerified
  ) {
    console.error("google id_token rejected", { iss: claims.iss, aud: claims.aud, exp: claims.exp });
    return fail("Thông tin đăng nhập từ Google không hợp lệ.");
  }

  const userId = await upsertUser(env, claims.email.toLowerCase(), claims.name ?? null);
  return new Response(null, {
    status: 302,
    headers: { location: "/", "set-cookie": await issueSession(env, userId, url) },
  });
}
