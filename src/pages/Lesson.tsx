import { useState } from "react";
import { api, ApiError, type LessonView } from "../api";
import { ErrorNote, formatDate, KindTag, LevelChip, Link, Loading, LOCK_TEXT, navigate, StatusPill, useLoad } from "../lib";
import { CaseBriefPanel } from "./CaseBrief";

export function LessonPage({ lessonId }: { lessonId: string }) {
  const { data, error, loading, reload } = useLoad(() => api<LessonView>(`/api/lessons/${lessonId}`), [lessonId]);
  const [starting, setStarting] = useState(false);
  const [startError, setStartError] = useState<Error | null>(null);

  if (loading && !data) return <section className="wrap"><Loading /></section>;
  if (!data) return <section className="wrap"><ErrorNote error={error} /></section>;

  const { lesson, rubric, progress, attempts } = data;
  const draft = attempts.find((a) => a.status === "draft");
  const reviewTarget = attempts.find((a) => a.needs_review);

  async function start() {
    setStarting(true);
    setStartError(null);
    try {
      const res = await api<{ attemptId: string }>("/api/attempts", { method: "POST", body: { lessonId } });
      navigate(`/attempts/${res.attemptId}`);
    } catch (err) {
      setStartError(err as Error);
      if (err instanceof ApiError && err.status === 423) reload();
    } finally {
      setStarting(false);
    }
  }

  return (
    <section className="wrap stack">
      <header className="page-head">
        <p className="eyebrow"><Link to="/">Lộ trình</Link> / {lesson.module_id} · {lesson.module_title}</p>
        <h1><span className="mono muted">{lesson.id}</span> {lesson.title}</h1>
        <div className="row">
          <KindTag kind={lesson.kind} />
          <LevelChip level={lesson.level} />
          <span className="muted small">khoảng {lesson.est_minutes} phút</span>
          {progress && <StatusPill status={progress.status} reason={progress.lock_reason} />}
        </div>
        {lesson.gates_module === 1 && (
          <p className="gate">Đây là checkpoint của module {lesson.module_id}. Đạt bài này để hoàn thành module và mở các module phía sau. Bài do giảng viên chấm.</p>
        )}
      </header>

      <div className="grid-2">
        <section className="panel">
          <h2>Bạn phải nộp</h2>
          <p className="output-spec">{lesson.output_spec}</p>

          {progress?.status === "locked" && progress.lock_reason ? (
            <div className="notice warn">
              <b>{LOCK_TEXT[progress.lock_reason].short}.</b> {LOCK_TEXT[progress.lock_reason].help}
              {progress.lock_reason === "mistake_review" && reviewTarget && (
                <p><Link to={`/attempts/${reviewTarget.id}`}>Mở bài cần review</Link></p>
              )}
              {progress.lock_reason === "untimed_first" && lesson.timed_variant_of && (
                <p><Link to={`/lessons/${lesson.timed_variant_of}`}>Mở bản không bấm giờ</Link></p>
              )}
            </div>
          ) : progress?.status === "passed" ? (
            <p className="notice ok">Bạn đã đạt bài này với điểm cao nhất <b>{progress.best_score}</b>.</p>
          ) : (
            <div className="stack-sm">
              <button className="btn" onClick={start} disabled={starting}>
                {draft ? "Tiếp tục bài nháp" : progress?.status === "failed" ? "Làm lại" : "Bắt đầu làm bài"}
              </button>
              <ErrorNote error={startError} />
            </div>
          )}
        </section>

        {rubric && (
          <section className="panel">
            <h2>Cách chấm · {rubric.name}</h2>
            <p className="muted small">Đạt khi tổng điểm từ <b>{rubric.threshold}</b> trở lên và không tiêu chí nào ở mức 1.</p>
            <ul className="criteria">
              {rubric.criteria.map((c) => (
                <li key={c.id}>
                  <details>
                    <summary>
                      <span>{c.name}</span>
                      <span className="weight"><i style={{ width: `${c.weight}%` }} /></span>
                      <span className="mono small">{c.weight}</span>
                    </summary>
                    <ol className="levels">
                      {[1, 2, 3, 4].map((lv) => (
                        <li key={lv}><span className="mono">Mức {lv}</span> {c.levels[lv] ?? "—"}</li>
                      ))}
                    </ol>
                  </details>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {data.case && <CaseBriefPanel brief={data.case} mode="lesson" />}

      <section className="panel">
        <h2>Các lần làm</h2>
        {attempts.length === 0 ? (
          <p className="muted">Chưa có lần làm nào.</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>Bắt đầu</th><th>Trạng thái</th><th>Điểm</th><th>Có điểm lúc</th><th></th></tr></thead>
              <tbody>
                {attempts.map((a) => (
                  <tr key={a.id}>
                    <td>{formatDate(a.started_at)}</td>
                    <td>{ATTEMPT_STATUS[a.status] ?? a.status}{a.needs_review ? <span className="pill pill-locked inline">cần review</span> : null}</td>
                    <td className="mono">{a.final_score ?? "—"}{a.passed === 1 ? " · đạt" : a.passed === 0 ? " · chưa đạt" : ""}</td>
                    <td>{formatDate(a.graded_at)}</td>
                    <td><Link to={`/attempts/${a.id}`}>Mở</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </section>
  );
}

export const ATTEMPT_STATUS: Record<string, string> = {
  draft: "Nháp",
  submitted: "Đã nộp",
  grading: "Đang chấm",
  graded: "Có điểm",
  void: "Huỷ",
};
