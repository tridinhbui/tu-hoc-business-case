import { useEffect, useRef, useState, type FormEvent } from "react";
import { api } from "../api";
import { ErrorNote, Loading, useLoad } from "../lib";

declare global {
  interface Window {
    turnstile?: {
      render(el: HTMLElement, options: Record<string, unknown>): string;
      reset(widgetId?: string): void;
      remove(widgetId?: string): void;
    };
  }
}

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
  const config = useLoad(() => api<{ turnstileSiteKey: string | null; devMode: boolean }>("/api/config"), []);
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<Error | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);

  const siteKey = config.data?.turnstileSiteKey ?? null;
  const closed = !!config.data && !siteKey && !config.data.devMode;

  useEffect(() => {
    if (!siteKey || !widgetRef.current) return;
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
  }, [siteKey]);

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
        <p className="eyebrow">Business Case</p>
        <h1>Học case bằng cách làm case</h1>
        {config.loading && !config.data ? (
          <Loading />
        ) : closed ? (
          <p className="notice warn" role="status">Đăng nhập đang tạm đóng trong lúc hoàn tất cấu hình. Vui lòng quay lại sau.</p>
        ) : state === "sent" ? (
          <p className="notice" role="status">Đã gửi link tới <b>{email}</b>. Link có hiệu lực trong 15 phút và chỉ dùng được một lần.</p>
        ) : (
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
              <ErrorNote error={error ?? config.error} />
            </form>
          </>
        )}
      </div>
    </main>
  );
}
