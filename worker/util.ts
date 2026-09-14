export type AppEnv = Env & {
  DEV_MODE: string;
  APP_ORIGIN: string;
  MAIL_FROM: string;
  TURNSTILE_SECRET?: string;
  // Bound only after a Cloudflare DNS domain is onboarded to Email Sending.
  EMAIL?: { send(message: { to: string; from: string; subject: string; text: string; html: string }): Promise<{ messageId: string }> };
};

export class HttpError extends Error {
  constructor(public status: number, message: string, public details?: unknown) {
    super(message);
  }
}

export const now = () => Date.now();
export const uuid = () => crypto.randomUUID();
export const isDev = (env: AppEnv) => env.DEV_MODE === "true";

export function json(data: unknown, status = 200, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", ...headers },
  });
}

export async function readJson<T>(request: Request): Promise<T> {
  try {
    return (await request.json()) as T;
  } catch {
    throw new HttpError(400, "Nội dung gửi lên phải là JSON hợp lệ.");
  }
}

function base64url(bytes: Uint8Array): string {
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function randomToken(byteLength = 32): string {
  const bytes = new Uint8Array(byteLength);
  crypto.getRandomValues(bytes);
  return base64url(bytes);
}

export async function sha256(value: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return base64url(new Uint8Array(digest));
}

/** D1 allows at most 100 bound parameters per statement. */
export function chunk<T>(items: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
}
