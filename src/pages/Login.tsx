import { useState, type FormEvent } from "react";
import { api } from "../api";
import { ErrorNote } from "../lib";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<Error | null>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setState("sending");
    try {
      const res = await api<{ sent: boolean; devLink?: string }>("/api/auth/request", { method: "POST", body: { email } });
      if (res.devLink) {
        window.location.href = res.devLink; // local development: no email is sent
        return;
      }
      setState("sent");
    } catch (err) {
      setError(err as Error);
      setState("idle");
    }
  }

  return (
    <main className="login">
      <div className="login-card">
        <p className="eyebrow">Business Case</p>
        <h1>Học case bằng cách làm case</h1>
        <p className="muted">Nhập email để nhận link đăng nhập. Không cần mật khẩu.</p>
        {state === "sent" ? (
          <p className="notice" role="status">Đã gửi link tới <b>{email}</b>. Link có hiệu lực trong 15 phút và chỉ dùng được một lần.</p>
        ) : (
          <form onSubmit={submit} className="stack-sm">
            <label className="field">
              <span>Email</span>
              <input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ban@example.com" />
            </label>
            <button className="btn" disabled={state === "sending"}>{state === "sending" ? "Đang gửi…" : "Gửi link đăng nhập"}</button>
            <ErrorNote error={error} />
          </form>
        )}
      </div>
    </main>
  );
}
