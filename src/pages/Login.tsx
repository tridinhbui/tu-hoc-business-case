import { useEffect, useRef, useState, type FormEvent } from "react";
import { api } from "../api";
import { ErrorNote, Link, Loading, useLoad } from "../lib";

declare global {
  interface Window {
    turnstile?: {
      render(el: HTMLElement, options: Record<string, unknown>): string;
      reset(widgetId?: string): void;
      remove(widgetId?: string): void;
    };
  }
}

type Config = { turnstileSiteKey: string | null; devMode: boolean; googleLogin: boolean; magicLink: boolean };

const TURNSTILE_SCRIPT = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

function loadTurnstile(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  return new Promise((resolve, reject) => {
    let script = document.querySelector<HTMLScriptElement>(`script[src="${TURNSTILE_SCRIPT}"]`);
    if (!script) {
      script = document.createElement("script");
      script.src = TURNSTILE_SCRIPT;
      script.async = true;
      document.head.appendChild(script);
    }
    script.addEventListener("load", () => resolve());
    script.addEventListener("error", () => reject(new Error("turnstile script failed")));
  });
}

export function LoginPage() {
  const config = useLoad(() => api<Config>("/api/config"), []);
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<Error | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);

  // Google redirects back here with ?login_error=… when the sign-in could not be completed.
  const loginError = new URLSearchParams(window.location.search).get("login_error");

  const siteKey = config.data?.turnstileSiteKey ?? null;
  const magicLink = config.data?.magicLink ?? false;
  const google = config.data?.googleLogin ?? false;
  const closed = !!config.data && !google && !magicLink;

  useEffect(() => {
    if (!siteKey || !magicLink || !widgetRef.current) return;
    let cancelled = false;
    loadTurnstile()
      .then(() => {
        if (cancelled || !widgetRef.current || !window.turnstile || widgetId.current) return;
        widgetId.current = window.turnstile.render(widgetRef.current, {
          sitekey: siteKey,
          action: "login",
          callback: (t: string) => setToken(t),
          "expired-callback": () => setToken(null),
          "error-callback": () => setToken(null),
        });
      })
      .catch(() => !cancelled && setError(new Error("Không tải được bước xác minh. Kiểm tra kết nối rồi tải lại trang.")));
    return () => {
      cancelled = true;
      if (widgetId.current && window.turnstile) window.turnstile.remove(widgetId.current);
      widgetId.current = null;
    };
  }, [siteKey, magicLink]);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (siteKey && !token) {
      setError(new Error("Hoàn tất bước xác minh trước khi gửi."));
      return;
    }
    setError(null);
    setState("sending");
    try {
      const res = await api<{ sent: boolean; devLink?: string }>("/api/auth/request", {
        method: "POST",
        body: { email, turnstileToken: token ?? undefined },
      });
      if (res.devLink) {
        window.location.href = res.devLink; // local development: no email is sent
        return;
      }
      setState("sent");
    } catch (err) {
      setError(err as Error);
      setState("idle");
    } finally {
      // Turnstile tokens are single-use: get a fresh one before any retry.
      if (widgetId.current && window.turnstile) window.turnstile.reset(widgetId.current);
      setToken(null);
    }
  }

  return (
    <main className="login">
      <div className="login-card">
        <p className="eyebrow"><Link to="/">Tự học Business Case</Link></p>
        <h1>Học case bằng cách làm case</h1>
        {loginError && <p className="notice warn" role="alert">{loginError}</p>}
        {config.loading && !config.data ? (
          <Loading />
        ) : closed ? (
          <p className="notice warn" role="status">Đăng nhập đang tạm đóng trong lúc hoàn tất cấu hình. Vui lòng quay lại sau.</p>
        ) : state === "sent" ? (
          <p className="notice" role="status">Đã gửi link tới <b>{email}</b>. Link có hiệu lực trong 15 phút và chỉ dùng được một lần.</p>
        ) : (
          <>
            {google && (
              <>
                <a className="btn btn-google" href="/api/auth/google/start">
                  <GoogleMark /> Đăng nhập với Google
                </a>
                <p className="muted small">Chúng tôi chỉ nhận tên và email từ Google, dùng để nhận diện tài khoản của bạn.</p>
              </>
            )}
            {google && magicLink && <p className="or-divider"><span>hoặc</span></p>}
            {magicLink && (
              <>
                <p className="muted">Nhập email để nhận link đăng nhập. Không cần mật khẩu.</p>
                <form onSubmit={submit} className="stack-sm">
                  <label className="field">
                    <span>Email</span>
                    <input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ban@example.com" />
                  </label>
                  {siteKey && <div ref={widgetRef} className="turnstile-slot" />}
                  <button className="btn" disabled={state === "sending" || (!!siteKey && !token)}>
                    {state === "sending" ? "Đang gửi…" : "Gửi link đăng nhập"}
                  </button>
                </form>
              </>
            )}
            <ErrorNote error={error ?? config.error} />
          </>
        )}
      </div>
    </main>
  );
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 18 18" width="16" height="16" aria-hidden="true" focusable="false">
      <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62Z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.81.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18Z" />
      <path fill="#FBBC05" d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3.01-2.33Z" />
      <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58Z" />
    </svg>
  );
}
