import { useEffect, useRef, useState, type FormEvent } from "react";
import { api, type SupportMessage, type SupportThreadView } from "../api";
import { ErrorNote, formatDate, usePoll } from "../lib";

const POLL_OPEN_MS = 4000;
const POLL_CLOSED_MS = 60_000;

/**
 * The learner's line to staff, reachable from every page. It follows the learner around because the
 * question usually arrives while they are stuck on a lesson, not after they navigate to a form.
 */
export function SupportChat() {
  const [open, setOpen] = useState(false);
  const [thread, setThread] = useState<SupportThreadView | null>(null);
  const [unread, setUnread] = useState(0);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const loadThread = async () => {
    try {
      const data = await api<SupportThreadView>("/api/support");
      setThread(data);
      setUnread(0);
    } catch (err) {
      setError(err as Error);
    }
  };

  const loadUnread = async () => {
    try {
      const data = await api<{ unread: number }>("/api/support/unread");
      setUnread(data.unread);
    } catch {
      // A badge is not worth an error message; the next poll tries again.
    }
  };

  useEffect(() => {
    if (open) void loadThread();
    else void loadUnread();
  }, [open]);

  usePoll(open, () => void loadThread(), POLL_OPEN_MS);
  usePoll(!open, () => void loadUnread(), POLL_CLOSED_MS);

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ block: "end" });
  }, [open, thread?.messages.length]);

  async function askHuman() {
    try {
      await api("/api/support/escalate", { method: "POST" });
      await loadThread();
    } catch (err) {
      setError(err as Error);
    }
  }

  async function send(event: FormEvent) {
    event.preventDefault();
    const body = draft.trim();
    if (!body || sending) return;
    setSending(true);
    setError(null);
    try {
      const data = await api<SupportThreadView & { messages: SupportMessage[] }>("/api/support/messages", {
        method: "POST",
        body: { body, contextPath: window.location.pathname },
      });
      setThread({ thread: data.thread, messages: data.messages, unread: 0 });
      setDraft("");
    } catch (err) {
      setError(err as Error);
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <button className="chat-launcher" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        {open ? "Đóng" : "Hỏi admin"}
        {!open && unread > 0 && <span className="chat-dot" aria-label={`${unread} tin chưa đọc`}>{unread}</span>}
      </button>

      {open && (
        <section className="chat-panel" aria-label="Trò chuyện với ban quản trị">
          <header>
            <b>Hỏi ban quản trị</b>
            <small className="muted">Câu hỏi về tiến độ của bạn được trả lời ngay; còn lại ban quản trị trả lời.</small>
          </header>

          <div className="chat-log">
            {!thread?.messages.length ? (
              <p className="muted small">
                Hỏi bất cứ điều gì: bài bị khoá mà không rõ vì sao, điểm chấm thấy chưa đúng, hay muốn đổi lộ trình.
                Trang bạn đang mở sẽ được gửi kèm để bên kia biết bạn đang nói về cái gì.
              </p>
            ) : (
              thread.messages.map((m) => (
                <div key={m.id} className={`chat-msg is-${m.author_side}`}>
                  <p>{m.body}</p>
                  <small className="muted">
                    {m.author_side === "assistant" ? "Trả lời tự động" : m.author_side === "staff" ? "Ban quản trị" : "Bạn"}
                    {" · "}{formatDate(m.created_at)}
                  </small>
                </div>
              ))
            )}
            <div ref={endRef} />
          </div>

          {thread?.thread?.auto_answered && !thread.thread.needs_human && (
            <button type="button" className="btn-small" onClick={askHuman} disabled={sending}>
              Vẫn cần người thật
            </button>
          )}
          {thread?.thread?.needs_human && (
            <p className="notice small" role="status">Đã chuyển cho ban quản trị. Bạn sẽ nhận trả lời ngay tại đây.</p>
          )}

          <form onSubmit={send} className="chat-form">
            <textarea
              rows={2}
              value={draft}
              placeholder="Viết câu hỏi…"
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) void send(e);
              }}
            />
            <button className="btn" disabled={sending || !draft.trim()}>{sending ? "Đang gửi…" : "Gửi"}</button>
          </form>
          <ErrorNote error={error} />
        </section>
      )}
    </>
  );
}
