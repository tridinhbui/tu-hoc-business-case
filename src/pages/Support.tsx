import { useState, type FormEvent } from "react";
import { api, type SupportInbox, type SupportStaffThread } from "../api";
import { ErrorNote, formatDate, Loading, since, useLoad, usePoll } from "../lib";

const POLL_MS = 8000;

/** Staff side of the support chat: every learner thread, the ones waiting on an answer first. */
export function SupportInboxPage() {
  const inbox = useLoad(() => api<SupportInbox>("/api/support/threads"), []);
  const [openId, setOpenId] = useState<string | null>(null);
  usePoll(true, inbox.reload, POLL_MS);

  if (inbox.loading && !inbox.data) return <section className="wrap"><Loading /></section>;
  if (!inbox.data) return <section className="wrap"><ErrorNote error={inbox.error} /></section>;

  return (
    <section className="wrap stack">
      <header className="page-head">
        <p className="eyebrow">Hỗ trợ</p>
        <h1>Hộp thư người học</h1>
        <p className="muted lede">
          {inbox.data.waiting === 0
            ? "Không có câu hỏi nào đang chờ."
            : `${inbox.data.waiting} cuộc trò chuyện đang chờ trả lời.`}
        </p>
      </header>

      {inbox.data.items.length === 0 ? (
        <section className="panel"><p className="muted">Chưa ai nhắn gì.</p></section>
      ) : (
        <ul className="inbox">
          {inbox.data.items.map((t) => (
            <li key={t.id} className={t.unread > 0 ? "is-waiting" : ""}>
              <button className="inbox-row" onClick={() => setOpenId(openId === t.id ? null : t.id)} aria-expanded={openId === t.id}>
                <span className="inbox-who">
                  <b>{t.display_name}</b>
                  <small className="muted">{t.email} · cấp {t.level}</small>
                </span>
                <span className="inbox-preview muted small">
                  {t.last_side === "staff" ? "Đã trả lời: " : ""}{t.last_body ?? "—"}
                </span>
                <span className="inbox-meta">
                  {t.unread > 0 && <span className="pill pill-locked">{t.unread} mới</span>}
                  {t.status === "closed" && <span className="tag">đã đóng</span>}
                  <small className="muted">{since(t.last_message_at)}</small>
                </span>
              </button>
              {openId === t.id && <Conversation threadId={t.id} onSent={inbox.reload} />}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function Conversation({ threadId, onSent }: { threadId: string; onSent: () => void }) {
  const view = useLoad(() => api<SupportStaffThread>(`/api/support/threads/${threadId}`), [threadId]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  usePoll(true, view.reload, POLL_MS);

  async function reply(event: FormEvent, close = false) {
    event.preventDefault();
    const body = draft.trim();
    if (!body || sending) return;
    setSending(true);
    setError(null);
    try {
      await api(`/api/support/threads/${threadId}/messages`, { method: "POST", body: { body, close } });
      setDraft("");
      view.reload();
      onSent();
    } catch (err) {
      setError(err as Error);
    } finally {
      setSending(false);
    }
  }

  if (!view.data) return <div className="thread"><Loading /></div>;

  return (
    <div className="thread">
      <div className="chat-log">
        {view.data.messages.map((m) => (
          <div key={m.id} className={`chat-msg is-${m.author_side === "staff" ? "learner" : "staff"}`}>
            <p>{m.body}</p>
            <small className="muted">
              {m.author_side === "staff" ? "Bạn" : view.data!.thread.display_name} · {formatDate(m.created_at)}
              {m.context_path ? ` · đang ở ${m.context_path}` : ""}
            </small>
          </div>
        ))}
      </div>
      <form onSubmit={reply} className="chat-form">
        <textarea rows={3} value={draft} placeholder="Trả lời…" onChange={(e) => setDraft(e.target.value)} />
        <div className="row">
          <button className="btn" disabled={sending || !draft.trim()}>{sending ? "Đang gửi…" : "Gửi trả lời"}</button>
          <button type="button" className="btn-small" disabled={sending || !draft.trim()} onClick={(e) => reply(e, true)}>
            Gửi và đóng
          </button>
        </div>
      </form>
      <ErrorNote error={error} />
    </div>
  );
}
