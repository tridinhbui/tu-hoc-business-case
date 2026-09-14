import { useMemo, useState, type FormEvent } from "react";
import { api, ApiError, type AttemptView, type LessonView, type MistakeCode } from "../api";
import { ErrorNote, formatDate, Link, Loading, useLoad } from "../lib";
import { ARTIFACT_KINDS } from "./Attempt";

const FRACTION: Record<number, number> = { 1: 0.25, 2: 0.5, 3: 0.75, 4: 1 };

type Loaded = { attempt: AttemptView; lesson: LessonView; codes: MistakeCode[] };

export function GradePage({ attemptId }: { attemptId: string }) {
  const { data, error, loading } = useLoad<Loaded>(async () => {
    const attempt = await api<AttemptView>(`/api/attempts/${attemptId}`);
    const [lesson, codes] = await Promise.all([
      api<LessonView>(`/api/lessons/${attempt.attempt.lesson_id}`),
      api<{ items: MistakeCode[] }>("/api/mistake-codes"),
    ]);
    return { attempt, lesson, codes: codes.items };
  }, [attemptId]);

  if (loading && !data) return <section className="wrap"><Loading /></section>;
  if (!data) return <section className="wrap"><ErrorNote error={error} /><p><Link to="/grader">Về hàng đợi</Link></p></section>;
  return <GradeForm {...data} />;
}

function GradeForm({ attempt, lesson, codes }: Loaded) {
  const rubric = lesson.rubric;
  const [levels, setLevels] = useState<Record<string, number>>({});
  const [evidence, setEvidence] = useState<Record<string, string>>({});
  const [mistakes, setMistakes] = useState<{ code: string; location: string }[]>([]);
  const [pickCode, setPickCode] = useState(codes[0]?.code ?? "");
  const [pickLocation, setPickLocation] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [result, setResult] = useState<{ total: number; passed: boolean; threshold: number } | null>(null);

  const preview = useMemo(() => {
    if (!rubric) return null;
    const total = rubric.criteria.reduce((s, c) => s + c.weight, 0);
    const earned = rubric.criteria.reduce((s, c) => s + (levels[c.id] ? c.weight * FRACTION[levels[c.id]] : 0), 0);
    const complete = rubric.criteria.every((c) => levels[c.id]);
    const score = Math.round((earned / total) * 100);
    const anyOne = rubric.criteria.some((c) => levels[c.id] === 1);
    return { score, complete, pass: complete && score >= rubric.threshold && !anyOne };
  }, [levels, rubric]);

  if (attempt.attempt.status === "graded") {
    return (
      <section className="wrap stack">
        <h1>Bài này đã có điểm</h1>
        <p><Link to={`/attempts/${attempt.attempt.id}`}>Xem kết quả</Link> · <Link to="/grader">Về hàng đợi</Link></p>
      </section>
    );
  }
  if (!rubric) return <section className="wrap"><p className="error">Bài học chưa gắn rubric — không thể chấm.</p></section>;

  const missingEvidence = rubric.criteria.filter((c) => (levels[c.id] === 1 || levels[c.id] === 4) && !evidence[c.id]?.trim());

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!rubric) return;
    setBusy(true);
    setError(null);
    try {
      const res = await api<{ total: number; passed: boolean; threshold: number }>(`/api/grader/attempts/${attempt.attempt.id}/grade`, {
        method: "POST",
        body: {
          criteria: rubric.criteria.map((c) => ({ criterionId: c.id, level: levels[c.id], evidence: evidence[c.id]?.trim() || undefined })),
          mistakes: mistakes.map((m) => ({ code: m.code, location: m.location.trim() || undefined })),
        },
      });
      setResult(res);
    } catch (err) {
      setError(err instanceof ApiError && err.status === 409 ? new Error("Bạn không còn giữ bài này. Nhận lại từ hàng đợi.") : (err as Error));
    } finally {
      setBusy(false);
    }
  }

  if (result) {
    return (
      <section className="wrap stack">
        <section className={`panel result ${result.passed ? "is-pass" : "is-fail"}`}>
          <div className="result-score"><span className="big mono">{result.total}</span><span className="muted">/100</span></div>
          <div>
            <h2>Đã lưu điểm · {result.passed ? "Đạt" : "Chưa đạt"}</h2>
            <p className="muted small">Ngưỡng {result.threshold}. Người học sẽ thấy điểm, mã lỗi và được yêu cầu review nếu cần.</p>
          </div>
        </section>
        <p><Link to="/grader" className="btn">Chấm bài tiếp theo</Link></p>
      </section>
    );
  }

  return (
    <form className="wrap stack" onSubmit={submit}>
      <header className="page-head">
        <p className="eyebrow"><Link to="/grader">Hàng đợi chấm</Link> / {lesson.lesson.id}</p>
        <h1>{lesson.lesson.title}</h1>
        <p className="muted">Bài nộp ẩn danh · nộp lúc {formatDate(attempt.attempt.submitted_at)} · rubric {rubric.name}</p>
      </header>

      <div className="grid-2">
        <section className="panel">
          <h2>Đề yêu cầu nộp</h2>
          <p className="output-spec">{lesson.lesson.output_spec}</p>
          <h2>File người học nộp</h2>
          {attempt.artifacts.length === 0 ? <p className="muted">Không có file.</p> : (
            <ul className="files">
              {attempt.artifacts.map((f) => (
                <li key={f.id}><a href={`/api/attempts/${attempt.attempt.id}/artifacts/${f.id}`}>{ARTIFACT_KINDS[f.kind] ?? f.kind}</a></li>
              ))}
            </ul>
          )}
        </section>

        <section className="panel sticky">
          <h2>Điểm dự kiến</h2>
          <div className="result-score"><span className="big mono">{preview?.complete ? preview.score : "—"}</span><span className="muted">/100</span></div>
          <p className="muted small">
            {preview?.complete ? (preview.pass ? "Đạt ngưỡng." : "Chưa đạt — dưới ngưỡng hoặc có tiêu chí ở mức 1.") : `Chấm đủ ${rubric.criteria.length} tiêu chí để xem điểm.`}
          </p>
        </section>
      </div>

      {rubric.criteria.map((c) => (
        <fieldset key={c.id} className="panel criterion">
          <legend>{c.name} <span className="mono muted small">trọng số {c.weight}</span></legend>
          <div className="level-picker" role="radiogroup" aria-label={`Mức cho ${c.name}`}>
            {[1, 2, 3, 4].map((lv) => (
              <label key={lv} className={levels[c.id] === lv ? "picked" : ""}>
                <input type="radio" name={c.id} value={lv} checked={levels[c.id] === lv} onChange={() => setLevels((s) => ({ ...s, [c.id]: lv }))} required />
                <span className="mono">Mức {lv}</span>
                <span className="small">{c.levels[lv] ?? ""}</span>
              </label>
            ))}
          </div>
          {(levels[c.id] === 1 || levels[c.id] === 4) && (
            <label className="field">
              <span>Bằng chứng (bắt buộc ở mức {levels[c.id]}) — trích đúng chỗ trong bài nộp</span>
              <textarea rows={2} value={evidence[c.id] ?? ""} onChange={(e) => setEvidence((s) => ({ ...s, [c.id]: e.target.value }))} required />
            </label>
          )}
        </fieldset>
      ))}

      <section className="panel stack-sm">
        <h2>Gắn mã lỗi</h2>
        <div className="row">
          <label className="field inline">
            <span>Mã</span>
            <select value={pickCode} onChange={(e) => setPickCode(e.target.value)}>
              {codes.map((m) => <option key={m.code} value={m.code}>{m.code} · {m.title}</option>)}
            </select>
          </label>
          <label className="field inline grow">
            <span>Vị trí</span>
            <input value={pickLocation} onChange={(e) => setPickLocation(e.target.value)} placeholder="dòng 4, slide 6, 04:32…" />
          </label>
          <button type="button" className="btn-secondary" onClick={() => { if (pickCode) { setMistakes((s) => [...s, { code: pickCode, location: pickLocation }]); setPickLocation(""); } }}>
            Thêm
          </button>
        </div>
        {mistakes.length > 0 && (
          <ul className="mistakes">
            {mistakes.map((m, i) => (
              <li key={i}>
                <code className="code">{m.code}</code>
                <span>{codes.find((c) => c.code === m.code)?.title}{m.location ? <small> · tại {m.location}</small> : null}</span>
                <button type="button" className="btn-quiet" onClick={() => setMistakes((s) => s.filter((_, j) => j !== i))}>Bỏ</button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="row">
        <button className="btn" disabled={busy || !preview?.complete || missingEvidence.length > 0}>{busy ? "Đang lưu…" : "Lưu điểm"}</button>
        {missingEvidence.length > 0 && <span className="muted small">Cần bằng chứng cho: {missingEvidence.map((c) => c.name).join(", ")}.</span>}
      </div>
      <ErrorNote error={error} />
    </form>
  );
}
