import { useRef, useState, type FormEvent } from "react";
import { api, type AttemptView } from "../api";
import { ErrorNote, formatDate, Link, Loading, useLoad, usePoll } from "../lib";

const STEPS = [
  { key: "draft", label: "Nháp" },
  { key: "submitted", label: "Đã nộp" },
  { key: "grading", label: "Đang chấm" },
  { key: "graded", label: "Có điểm" },
];

export const ARTIFACT_KINDS: Record<string, string> = {
  sheet: "Bảng tính",
  deck: "Slide",
  doc: "Tài liệu",
  image: "Ảnh",
  transcript: "Bản ghi chữ",
};

export function AttemptPage({ attemptId }: { attemptId: string }) {
  const { data, error, loading, reload } = useLoad(() => api<AttemptView>(`/api/attempts/${attemptId}`), [attemptId]);
  const waiting = data?.attempt.status === "submitted" || data?.attempt.status === "grading";
  // After grading, readiness and review state arrive through a queue: keep polling briefly.
  usePoll(!!waiting, reload);

  if (loading && !data) return <section className="wrap"><Loading /></section>;
  if (!data) return <section className="wrap"><ErrorNote error={error} /></section>;
  const { attempt } = data;
  const stepIndex = STEPS.findIndex((s) => s.key === attempt.status);

  return (
    <section className="wrap stack">
      <header className="page-head">
        <p className="eyebrow"><Link to={`/lessons/${attempt.lesson_id}`}>{attempt.lesson_id} · {attempt.lesson_title}</Link></p>
        <h1>Bài làm</h1>
        <ol className="steps" aria-label="Tiến trình bài làm">
          {STEPS.map((s, i) => (
            <li key={s.key} className={i < stepIndex ? "done" : i === stepIndex ? "current" : ""} aria-current={i === stepIndex ? "step" : undefined}>
              {s.label}
            </li>
          ))}
        </ol>
      </header>

      {attempt.status === "draft" && data.viewer === "owner" && <DraftPanel data={data} onChange={reload} />}

      {waiting && (
        <section className="panel">
          <h2>{attempt.status === "submitted" ? "Đã nộp" : "Đang chờ người chấm"}</h2>
          <p className="muted">Nộp lúc {formatDate(attempt.submitted_at)}. Trang tự cập nhật khi có điểm.</p>
          <Artifacts data={data} />
        </section>
      )}

      {attempt.status === "graded" && data.grade && (
        <>
          <section className={`panel result ${attempt.passed ? "is-pass" : "is-fail"}`}>
            <div className="result-score">
              <span className="big mono">{data.grade.total_score}</span>
              <span className="muted">/100</span>
            </div>
            <div>
              <h2>{attempt.passed ? "Đạt" : "Chưa đạt"}</h2>
              <p className="muted small">
                Ngưỡng đạt {data.grade.threshold ?? "—"} · chấm bởi {data.grade.grader_type === "peer" ? "bạn học" : "giảng viên"} lúc {formatDate(data.grade.created_at)}
              </p>
            </div>
          </section>

          <section className="panel">
            <h2>Điểm từng tiêu chí</h2>
            <div className="table-wrap">
              <table>
                <thead><tr><th>Tiêu chí</th><th className="r">Trọng số</th><th>Mức</th><th className="r">Điểm</th><th>Bằng chứng</th></tr></thead>
                <tbody>
                  {data.grade.criteria.map((c) => (
                    <tr key={c.criterion_id}>
                      <td>{c.name}</td>
                      <td className="r mono">{c.weight ?? "—"}</td>
                      <td><LevelDots level={c.level} /></td>
                      <td className="r mono">{Number(c.points.toFixed(1))}</td>
                      <td className="small">{c.evidence ?? <span className="muted">—</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="panel">
            <h2>Mã lỗi</h2>
            {data.mistakes.length === 0 ? (
              <p className="muted">Không có mã lỗi nào được gắn.</p>
            ) : (
              <ul className="mistakes">
                {data.mistakes.map((m, i) => (
                  <li key={`${m.code}-${i}`}>
                    <code className="code">{m.code}</code>
                    <span><b>{m.title}</b>{m.symptom ? ` — ${m.symptom}` : ""}{m.location_ref ? <small> · tại {m.location_ref}</small> : null}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {data.viewer === "owner" && <ReviewPanel data={data} onDone={reload} />}
          <section className="panel"><h2>File đã nộp</h2><Artifacts data={data} /></section>
        </>
      )}
    </section>
  );
}

function LevelDots({ level }: { level: number }) {
  return (
    <span className={`dots dots-${level}`} aria-label={`Mức ${level} trên 4`}>
      {[1, 2, 3, 4].map((i) => <i key={i} className={i <= level ? "on" : ""} />)}
      <span className="mono small">{level}</span>
    </span>
  );
}

function Artifacts({ data }: { data: AttemptView }) {
  if (!data.artifacts.length) return <p className="muted">Chưa có file.</p>;
  return (
    <ul className="files">
      {data.artifacts.map((f) => (
        <li key={f.id}>
          <a href={`/api/attempts/${data.attempt.id}/artifacts/${f.id}`}>{ARTIFACT_KINDS[f.kind] ?? f.kind}</a>
          <span className="muted small">{f.bytes ? `${Math.max(1, Math.round(f.bytes / 1024))} KB` : ""} · {formatDate(f.created_at)}</span>
        </li>
      ))}
    </ul>
  );
}

function DraftPanel({ data, onChange }: { data: AttemptView; onChange: () => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [kind, setKind] = useState("sheet");
  const [busy, setBusy] = useState<"upload" | "submit" | null>(null);
  const [error, setError] = useState<Error | null>(null);

  async function upload(e: FormEvent) {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (!file) return;
    setBusy("upload");
    setError(null);
    try {
      await api(`/api/attempts/${data.attempt.id}/artifacts`, {
        method: "PUT",
        raw: file,
        headers: { "x-artifact-kind": kind, "content-type": file.type || "application/octet-stream" },
      });
      if (fileRef.current) fileRef.current.value = "";
      onChange();
    } catch (err) {
      setError(err as Error);
    } finally {
      setBusy(null);
    }
  }

  async function submit() {
    setBusy("submit");
    setError(null);
    try {
      await api(`/api/attempts/${data.attempt.id}/submit`, { method: "POST" });
      onChange();
    } catch (err) {
      setError(err as Error);
    } finally {
      setBusy(null);
    }
  }

  return (
    <section className="panel stack-sm">
      <h2>Tải bài làm lên</h2>
      <form onSubmit={upload} className="row">
        <label className="field inline">
          <span>Loại</span>
          <select value={kind} onChange={(e) => setKind(e.target.value)}>
            {Object.entries(ARTIFACT_KINDS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </label>
        <input ref={fileRef} type="file" required aria-label="Chọn file" />
        <button className="btn-secondary" disabled={busy !== null}>{busy === "upload" ? "Đang tải…" : "Tải lên"}</button>
      </form>
      <p className="muted small">Tối đa 50 MB mỗi file.</p>
      <Artifacts data={data} />
      <div className="row">
        <button className="btn" onClick={submit} disabled={busy !== null || data.artifacts.length === 0}>
          {busy === "submit" ? "Đang nộp…" : "Nộp bài"}
        </button>
        {data.artifacts.length === 0 && <span className="muted small">Tải ít nhất một file trước khi nộp.</span>}
      </div>
      <ErrorNote error={error} />
    </section>
  );
}

function ReviewPanel({ data, onDone }: { data: AttemptView; onDone: () => void }) {
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  if (data.review) {
    return (
      <section className="panel">
        <h2>Mistake review</h2>
        <p className="notice ok">Đã review lúc {formatDate(data.review.completed_at)}.</p>
        <blockquote className="quote">{data.review.rewrite_note}</blockquote>
      </section>
    );
  }
  if (!data.needsReview) return null;

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await api(`/api/attempts/${data.attempt.id}/review`, { method: "POST", body: { rewriteNote: note } });
      onDone();
    } catch (err) {
      setError(err as Error);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="panel stack-sm">
      <h2>Mistake review</h2>
      <p className="muted">Bài cùng loại đang bị khoá cho tới khi bạn viết lại phần đã sai. Chọn một lỗi ở trên và viết lại đúng chỗ đó.</p>
      <form onSubmit={submit} className="stack-sm">
        <label className="field">
          <span>Phần viết lại</span>
          <textarea rows={5} value={note} onChange={(e) => setNote(e.target.value)} required placeholder="Ví dụ: dòng 4 — đổi đơn vị từ triệu hộ sang hộ, kết quả còn 1,2 nghìn tỷ, khớp với chi tiêu đầu người." />
        </label>
        <button className="btn" disabled={busy || !note.trim()}>{busy ? "Đang lưu…" : "Hoàn tất review"}</button>
        <ErrorNote error={error} />
      </form>
    </section>
  );
}
