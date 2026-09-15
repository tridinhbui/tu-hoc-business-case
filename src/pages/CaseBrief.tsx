import { useState } from "react";
import { api, type AttemptView, type CaseBrief } from "../api";
import { ErrorNote } from "../lib";

const askLabel = (trigger: string) => trigger.replace(/^Nếu hỏi\s*/i, "").trim();

type Mode = "lesson" | "attempt" | "review" | "grader";

export function CaseBriefPanel({ brief, mode, attemptId, onChange }: { brief: CaseBrief; mode: Mode; attemptId?: string; onChange?: () => void }) {
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const asked = brief.askable.filter((i) => i.content);

  async function ask(itemId: string) {
    if (!attemptId) return;
    setBusy(itemId);
    setError(null);
    try {
      await api(`/api/attempts/${attemptId}/reveal`, { method: "POST", body: { itemId } });
      onChange?.();
    } catch (err) {
      setError(err as Error);
    } finally {
      setBusy(null);
    }
  }

  return (
    <section className="panel case-brief" aria-labelledby={`case-${brief.id}`}>
      <p className="eyebrow">
        Đề case · {brief.id} · {brief.industry} · khoảng {brief.duration_min} phút{brief.status !== "published" ? " · bản chạy thử" : ""}
      </p>
      <h2 id={`case-${brief.id}`}>{brief.title}</h2>
      {brief.context && <p>{brief.context}</p>}
      {brief.question && <p className="case-question">{brief.question}</p>}

      {brief.upfront.length > 0 && (
        <div className="stack-sm">
          <h3>Dữ liệu có sẵn</h3>
          <ul className="data-list">
            {brief.upfront.map((i) => <li key={i.id}>{i.content}</li>)}
          </ul>
        </div>
      )}

      {mode === "lesson" && brief.askable.length > 0 && (
        <p className="muted small">
          Khi làm bài, bạn có thể xin thêm {brief.askable.length} mục dữ liệu. Chỉ xin thứ bạn sẽ dùng — người chấm thấy bạn đã xin những gì.
        </p>
      )}

      {mode === "attempt" && brief.askable.length > 0 && (
        <div className="stack-sm">
          <h3>Xin thêm dữ liệu</h3>
          <p className="muted small">Mỗi mục chỉ mở khi bạn xin. Hỏi đúng dữ liệu mình cần cũng là một phần được chấm.</p>
          <ul className="data-list">
            {brief.askable.map((i) => (
              <li key={i.id}>
                {i.content ? (
                  <><span className="muted">{askLabel(i.trigger)}:</span> {i.content}</>
                ) : (
                  <button className="btn-small" disabled={busy !== null} onClick={() => ask(i.id)}>
                    {busy === i.id ? "Đang mở…" : `Xin: ${askLabel(i.trigger)}`}
                  </button>
                )}
              </li>
            ))}
          </ul>
          <ErrorNote error={error} />
        </div>
      )}

      {(mode === "review" || mode === "grader") && brief.askable.length > 0 && (
        <div className="stack-sm">
          <h3>Dữ liệu {mode === "grader" ? "người học" : "bạn"} đã xin · {asked.length}/{brief.askable.length}</h3>
          {asked.length === 0 ? (
            <p className="muted small">Không xin thêm mục nào.</p>
          ) : (
            <ul className="data-list">
              {asked.map((i) => <li key={i.id}><span className="muted">{askLabel(i.trigger)}:</span> {i.content}</li>)}
            </ul>
          )}
          {mode === "grader" && asked.length < brief.askable.length && (
            <p className="muted small">Chưa xin: {brief.askable.filter((i) => !i.content).map((i) => askLabel(i.trigger)).join(", ")}.</p>
          )}
        </div>
      )}
    </section>
  );
}

export function AnswerFramePanel({ attempt }: { attempt: AttemptView }) {
  if (!attempt.answerFrame && attempt.traps.length === 0) return null;
  return (
    <section className="panel answer-frame">
      <h2>Đáp án khung <span className="muted small">chỉ người chấm thấy</span></h2>
      {attempt.answerFrame && (
        <>
          <p>{attempt.answerFrame.structure_md}</p>
          <h3>Chấm nhanh</h3>
          <p>{attempt.answerFrame.quick_scoring_md}</p>
        </>
      )}
      {attempt.traps.length > 0 && (
        <>
          <h3>Bẫy đã cài</h3>
          <ul className="data-list">
            {attempt.traps.map((t, i) => <li key={i}><code className="code">{t.mistake_code}</code> {t.description}</li>)}
          </ul>
        </>
      )}
    </section>
  );
}
