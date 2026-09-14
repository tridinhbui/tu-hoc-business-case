import { api, type ProgressView } from "../api";
import { ErrorNote, KIND_LABELS, KindTag, LEVEL_NAMES, LevelChip, Link, Loading, LOCK_TEXT, StatusPill, useLoad } from "../lib";

export function PathPage() {
  const { data, error, loading } = useLoad(() => api<ProgressView>("/api/progress"), []);
  if (loading && !data) return <section className="wrap"><Loading /></section>;
  if (!data) return <section className="wrap"><ErrorNote error={error} /></section>;

  const counts = {
    passed: data.lessons.filter((l) => l.status === "passed").length,
    open: data.lessons.filter((l) => ["available", "in_progress", "failed"].includes(l.status)).length,
    locked: data.lessons.filter((l) => l.status === "locked").length,
  };
  const byModule = new Map<string, typeof data.lessons>();
  for (const row of data.lessons) {
    const moduleId = data.catalog[row.lesson_id]?.module_id;
    if (!moduleId) continue;
    byModule.set(moduleId, [...(byModule.get(moduleId) ?? []), row]);
  }
  const hasTodo = data.pendingReviews.length > 0 || data.remediation.length > 0;

  return (
    <section className="wrap stack">
      <header className="page-head">
        <p className="eyebrow">Lộ trình của bạn</p>
        <h1>Cấp {data.level} · {LEVEL_NAMES[data.level]}</h1>
        <dl className="stats">
          <div><dt>Đã đạt</dt><dd>{counts.passed}</dd></div>
          <div><dt>Đang mở</dt><dd>{counts.open}</dd></div>
          <div><dt>Còn khoá</dt><dd>{counts.locked}</dd></div>
        </dl>
      </header>

      {hasTodo && (
        <section className="todo" aria-labelledby="todo-title">
          <h2 id="todo-title">Cần làm trước</h2>
          <ul>
            {data.pendingReviews.map((r) => (
              <li key={r.attempt_id}>
                <span className="todo-kind">Review</span>
                <span>
                  {data.catalog[r.lesson_id]?.title ?? r.lesson_id} — {r.passed ? "đạt nhưng có mã lỗi" : "chưa đạt"} ({r.final_score}/100)
                </span>
                <Link to={`/attempts/${r.attempt_id}`} className="btn-small">Xem và review</Link>
              </li>
            ))}
            {data.remediation.map((r) => (
              <li key={r.code}>
                <span className="todo-kind warn">Sửa lỗi</span>
                <span>
                  <code className="code">{r.code}</code> {r.title} — làm đạt {data.catalog[r.lesson_id]?.title ?? r.lesson_id}{" "}
                  <b>{r.reps_done}/{r.reps_required}</b> lần. Đang khoá: {KIND_LABELS[r.blocks_kind] ?? r.blocks_kind}.
                </span>
                <Link to={`/lessons/${r.lesson_id}`} className="btn-small">Làm drill</Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {data.modules.map((mod) => {
        const rows = byModule.get(mod.id) ?? [];
        if (!rows.length) return null;
        return (
          <section key={mod.id} className="module" aria-labelledby={`m-${mod.id}`}>
            <div className="module-head">
              <span className="mono accent">{mod.id}</span>
              <h2 id={`m-${mod.id}`}>{mod.title}</h2>
              <span className="muted small">{mod.track_name}</span>
            </div>
            <ol className="lessons">
              {rows.map((row) => {
                const lesson = data.catalog[row.lesson_id];
                return (
                  <li key={row.lesson_id} className={row.status === "locked" ? "is-locked" : ""}>
                    <span className="mono muted">{row.lesson_id}</span>
                    <span className="lesson-title">
                      <Link to={`/lessons/${row.lesson_id}`}>{lesson.title}</Link>
                      {row.status === "locked" && row.lock_reason ? (
                        <small>{LOCK_TEXT[row.lock_reason].help}</small>
                      ) : lesson.gates_module === 1 && row.status !== "passed" ? (
                        <small className="gate">Checkpoint của module — đạt bài này để hoàn thành {mod.id}</small>
                      ) : null}
                    </span>
                    <KindTag kind={lesson.kind} />
                    <LevelChip level={lesson.level} />
                    <span className="mono score">{row.best_score ?? "—"}</span>
                    <StatusPill status={row.status} reason={row.lock_reason} />
                  </li>
                );
              })}
            </ol>
          </section>
        );
      })}
    </section>
  );
}
