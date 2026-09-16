import { useEffect, useRef, useState, type FormEvent } from "react";
import { api, type LiveRoomView, type LiveSessionSummary } from "../api";
import { ErrorNote, formatDate, KIND_LABELS, Link, Loading, navigate, useLoad } from "../lib";

const ROLE_LABELS: Record<string, string> = {
  candidate: "Ứng viên",
  interviewer: "Người điều phối",
  panelist: "Giám khảo",
  team_member: "Thành viên đội",
  observer: "Người quan sát",
};
const ASKERS = ["candidate", "team_member"];

function useCountdown(deadline: number | null | undefined, ended: boolean) {
  const [left, setLeft] = useState(() => (deadline ? deadline - Date.now() : 0));
  useEffect(() => {
    if (!deadline || ended) return;
    const id = window.setInterval(() => setLeft(deadline - Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [deadline, ended]);
  if (!deadline) return null;
  if (ended || left <= 0) return "hết giờ";
  const total = Math.floor(left / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return h > 0 ? `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}` : `${m}:${String(s).padStart(2, "0")}`;
}

export function LiveListPage({ isStaff }: { isStaff: boolean }) {
  const list = useLoad(() => api<{ items: LiveSessionSummary[] }>("/api/live"), []);
  return (
    <section className="wrap stack">
      <header className="page-head">
        <p className="eyebrow">Phòng live</p>
        <h1>Phiên trực tiếp của bạn</h1>
        <p className="muted lede">Live case, vòng thi theo đội và panel Q&amp;A. Dữ liệu được phát khi bạn hỏi, mốc thời gian và hạn chót do phòng tự chạy.</p>
      </header>

      {isStaff && <CreateSession onCreated={list.reload} />}

      {list.loading && !list.data ? (
        <Loading />
      ) : !list.data ? (
        <ErrorNote error={list.error} />
      ) : list.data.items.length === 0 ? (
        <section className="panel"><p className="muted">Bạn chưa có phiên nào. Giảng viên sẽ tạo phòng và thêm bạn vào.</p></section>
      ) : (
        <section className="panel">
          <div className="table-wrap">
            <table>
              <thead><tr><th>Bài</th><th>Loại</th><th>Vai trò</th><th>Trạng thái</th><th>Hạn</th><th></th></tr></thead>
              <tbody>
                {list.data.items.map((s) => (
                  <tr key={s.id}>
                    <td><span className="mono muted">{s.lesson_id}</span> {s.lesson_title}</td>
                    <td>{KIND_LABELS[s.kind] ?? s.kind}</td>
                    <td>{ROLE_LABELS[s.role] ?? s.role}</td>
                    <td>{s.status === "running" ? "Đang chạy" : s.status === "ended" ? "Đã kết thúc" : s.status}</td>
                    <td>{formatDate(s.deadline_at)}</td>
                    <td className="r"><Link to={`/live/${s.id}`} className="btn-small">Vào phòng</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </section>
  );
}

function CreateSession({ onCreated }: { onCreated: () => void }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ kind: "live_case", lessonId: "", durationMinutes: "30", questionBudget: "", answerDelayMinutes: "0", milestones: "", participants: "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const participants = form.participants
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
          const [email, role] = line.split(/\s+/);
          return { email, role: (role || "team_member") as LiveSessionSummary["role"] };
        });
      const milestones = form.milestones
        .split(",")
        .map((part) => part.trim())
        .filter(Boolean)
        .map((part) => {
          const [minutes, ...label] = part.split(":");
          return { atMinutes: Number(minutes), label: label.join(":").trim() || `Mốc ${minutes} phút` };
        });
      const res = await api<{ sessionId: string }>("/api/live", {
        method: "POST",
        body: {
          kind: form.kind,
          lessonId: form.lessonId.trim(),
          durationMinutes: Number(form.durationMinutes),
          questionBudget: form.questionBudget ? Number(form.questionBudget) : null,
          answerDelayMinutes: Number(form.answerDelayMinutes),
          milestones,
          participants,
        },
      });
      onCreated();
      navigate(`/live/${res.sessionId}`);
    } catch (err) {
      setError(err as Error);
    } finally {
      setBusy(false);
    }
  }

  if (!open) {
    return <p><button className="btn" onClick={() => setOpen(true)}>Tạo phòng mới</button></p>;
  }
  return (
    <form className="panel stack-sm" onSubmit={submit}>
      <h2>Tạo phòng</h2>
      <div className="row">
        <label className="field inline"><span>Loại</span>
          <select value={form.kind} onChange={set("kind")}>
            <option value="live_case">Live case</option>
            <option value="team_sim">Vòng thi theo đội</option>
            <option value="qa_panel">Panel Q&amp;A</option>
            <option value="full_loop">Full loop</option>
          </select>
        </label>
        <label className="field inline"><span>Mã bài</span><input value={form.lessonId} onChange={set("lessonId")} placeholder="019" required /></label>
        <label className="field inline"><span>Thời lượng (phút)</span><input type="number" min="1" value={form.durationMinutes} onChange={set("durationMinutes")} required /></label>
        <label className="field inline"><span>Ngân sách câu hỏi</span><input type="number" min="0" value={form.questionBudget} onChange={set("questionBudget")} placeholder="không giới hạn" /></label>
        <label className="field inline"><span>Trả lời sau (phút)</span><input type="number" min="0" value={form.answerDelayMinutes} onChange={set("answerDelayMinutes")} /></label>
      </div>
      <label className="field"><span>Mốc thời gian — "phút:nhãn", cách nhau bằng dấu phẩy</span>
        <input value={form.milestones} onChange={set("milestones")} placeholder="180:Ghost deck, 720:Hợp nhất lần 2" />
      </label>
      <label className="field"><span>Người tham gia — mỗi dòng "email vai_trò" (candidate, team_member, panelist, observer)</span>
        <textarea rows={3} value={form.participants} onChange={set("participants")} placeholder={"lan@example.com team_member\nminh@example.com team_member"} />
      </label>
      <div className="row">
        <button className="btn" disabled={busy}>{busy ? "Đang tạo…" : "Tạo phòng"}</button>
        <button type="button" className="btn-quiet" onClick={() => setOpen(false)}>Huỷ</button>
      </div>
      <ErrorNote error={error} />
    </form>
  );
}

type Event = { at: number; text: string; kind: "in" | "out" | "system" };

export function LiveRoomPage({ sessionId }: { sessionId: string }) {
  const { data, error, loading, reload } = useLoad(() => api<LiveRoomView>(`/api/live/${sessionId}`), [sessionId]);
  const [events, setEvents] = useState<Event[]>([]);
  const [questions, setQuestions] = useState<{ id: number; text: string; answer?: string }[]>([]);
  const [connection, setConnection] = useState<"connecting" | "open" | "closed">("connecting");
  const [draft, setDraft] = useState("");
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const socket = useRef<WebSocket | null>(null);
  const ended = data?.session.status === "ended" || data?.state.status === "ended";
  const countdown = useCountdown(data?.session.deadline_at, !!ended);

  useEffect(() => {
    if (!data || ended) return;
    const url = `${window.location.origin.replace(/^http/, "ws")}/api/live/${sessionId}/ws`;
    const ws = new WebSocket(url);
    socket.current = ws;
    const log = (text: string, kind: Event["kind"] = "system") => setEvents((e) => [...e, { at: Date.now(), text, kind }]);
    ws.onopen = () => setConnection("open");
    ws.onclose = () => setConnection("closed");
    ws.onerror = () => setConnection("closed");
    ws.onmessage = (raw) => {
      const msg = JSON.parse(raw.data as string);
      switch (msg.type) {
        case "state": break;
        case "asked":
          log(`Đã gửi câu hỏi. Còn lại ${msg.remaining ?? "không giới hạn"}.`, "out");
          reload();
          break;
        case "question":
          setQuestions((q) => [...q, { id: msg.id, text: msg.text }]);
          log(`Câu hỏi mới: ${msg.text}`, "in");
          break;
        case "answer":
          setQuestions((q) => q.map((item) => (item.id === msg.id ? { ...item, answer: msg.answer } : item)));
          log(`Trả lời cho "${msg.question}": ${msg.answer}`, "in");
          break;
        case "reveal":
          log(`Dữ liệu được phát: ${msg.content ?? msg.itemId}`, "in");
          break;
        case "milestone":
          log(`Mốc: ${msg.label}`, "system");
          break;
        case "ended":
          log(`Phiên kết thúc. ${msg.summary?.questionsAsked ?? 0} câu hỏi, ${msg.summary?.questionsAnswered ?? 0} câu đã trả lời.`, "system");
          reload();
          break;
        case "error":
          log(`Lỗi: ${msg.message}`, "system");
          break;
      }
    };
    return () => ws.close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId, !!data, ended]);

  if (loading && !data) return <section className="wrap"><Loading /></section>;
  if (!data) return <section className="wrap"><ErrorNote error={error} /><p><Link to="/live">Về danh sách phòng</Link></p></section>;

  const isAsker = ASKERS.includes(data.role);
  const isStaff = data.role === "interviewer" || data.role === "panelist";
  const budget = data.state.questions.budget;
  const used = data.state.questions.used;

  function send(payload: Record<string, unknown>) {
    if (socket.current?.readyState === WebSocket.OPEN) socket.current.send(JSON.stringify(payload));
  }

  return (
    <section className="wrap stack">
      <header className="page-head">
        <p className="eyebrow"><Link to="/live">Phòng live</Link> / {data.session.lesson_id}</p>
        <h1>{data.session.lesson_title}</h1>
        <div className="row">
          <span className="tag">{KIND_LABELS[data.session.kind] ?? data.session.kind}</span>
          <span className="tag">{ROLE_LABELS[data.role] ?? data.role}</span>
          <span className={`pill ${ended ? "pill-failed" : "pill-available"}`}>{ended ? "Đã kết thúc" : `Còn ${countdown}`}</span>
          <span className="muted small">{connection === "open" ? "Đang kết nối trực tiếp" : connection === "connecting" ? "Đang kết nối…" : "Mất kết nối"}</span>
        </div>
      </header>

      <div className="grid-2">
        <section className="panel">
          <h2>Diễn biến</h2>
          {events.length === 0 ? (
            <p className="muted small">Chưa có sự kiện nào.</p>
          ) : (
            <ol className="feed">
              {events.map((e, i) => (
                <li key={i} className={`feed-${e.kind}`}>
                  <span className="mono muted">{new Date(e.at).toLocaleTimeString("vi-VN")}</span> {e.text}
                </li>
              ))}
            </ol>
          )}
          {ended && data.session.summary && (
            <p className="notice">Tổng kết: {data.session.summary}</p>
          )}
        </section>

        <section className="panel">
          {isAsker && (
            <>
              <h2>Xin dữ liệu · {budget === null ? "không giới hạn" : `${used}/${budget} câu`}</h2>
              <form
                className="stack-sm"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!draft.trim()) return;
                  send({ type: "ask", text: draft.trim() });
                  setDraft("");
                }}
              >
                <textarea rows={2} value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Ví dụ: số tiệm giặt hiện có ở TP.HCM?" disabled={!!ended || (budget !== null && used >= budget)} />
                <button className="btn" disabled={!!ended || !draft.trim() || (budget !== null && used >= budget)}>Gửi câu hỏi</button>
              </form>
            </>
          )}
          {isStaff && (
            <>
              <h2>Câu hỏi của đội</h2>
              {questions.length === 0 ? (
                <p className="muted small">Chưa có câu hỏi nào trong phiên này.</p>
              ) : (
                <ul className="data-list">
                  {questions.map((q) => (
                    <li key={q.id}>
                      <b>{q.text}</b>
                      {q.answer ? (
                        <p className="muted small">Đã trả lời: {q.answer}</p>
                      ) : (
                        <form
                          className="row"
                          onSubmit={(e) => {
                            e.preventDefault();
                            const answer = (answers[q.id] ?? "").trim();
                            if (!answer) return;
                            send({ type: "answer", questionId: q.id, answer });
                            setAnswers((a) => ({ ...a, [q.id]: "" }));
                          }}
                        >
                          <input value={answers[q.id] ?? ""} onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))} placeholder="Trả lời hoặc 'không có số liệu'" />
                          <button className="btn-secondary">Gửi</button>
                        </form>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
          <h2>Người tham gia</h2>
          <ul className="data-list">
            {data.participants.map((p) => (
              <li key={p.user_id}>{p.display_name} <span className="muted small">· {ROLE_LABELS[p.role] ?? p.role}</span></li>
            ))}
          </ul>
          {data.state.upcoming.length > 0 && !ended && (
            <>
              <h2>Mốc sắp tới</h2>
              <ul className="data-list">
                {data.state.upcoming.slice(0, 4).map((m, i) => (
                  <li key={i}>{m.label ?? (m.kind === "deadline" ? "Hết giờ" : m.kind)} <span className="muted small">· {formatDate(m.due_at)}</span></li>
                ))}
              </ul>
            </>
          )}
        </section>
      </div>
    </section>
  );
}
