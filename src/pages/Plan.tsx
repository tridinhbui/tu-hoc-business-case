import { useState } from "react";
import { api, type PathPlan, type PathSummary } from "../api";
import { ErrorNote, formatDate, KindTag, LevelChip, Link, Loading, LOCK_TEXT, PERSONA_LABELS, StatusPill, useLoad } from "../lib";

export function PlanPage() {
  const list = useLoad(() => api<{ items: PathSummary[] }>("/api/paths"), []);
  const [choosing, setChoosing] = useState(false);

  if (list.loading && !list.data) return <section className="wrap"><Loading /></section>;
  if (!list.data) return <section className="wrap"><ErrorNote error={list.error} /></section>;

  const active = list.data.items.find((p) => p.enrollment?.status === "active");
  if (active && !choosing) {
    return <PlanView pathId={active.id} onChoose={() => setChoosing(true)} />;
  }
  return (
    <PathChooser
      items={list.data.items}
      activeId={active?.id ?? null}
      onJoined={() => {
        setChoosing(false);
        list.reload();
      }}
      onCancel={active ? () => setChoosing(false) : undefined}
    />
  );
}

function PathChooser({ items, activeId, onJoined, onCancel }: { items: PathSummary[]; activeId: string | null; onJoined: () => void; onCancel?: () => void }) {
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  async function join(id: string) {
    setBusy(id);
    setError(null);
    try {
      await api(`/api/paths/${id}/enroll`, { method: "POST" });
      onJoined();
    } catch (err) {
      setError(err as Error);
    } finally {
      setBusy(null);
    }
  }

  return (
    <section className="wrap stack">
      <header className="page-head">
        <p className="eyebrow">Kế hoạch học</p>
        <h1>Chọn một lộ trình</h1>
        <p className="muted lede">Mỗi lộ trình sắp bài theo tuần. Bạn học một lộ trình tại một thời điểm; đổi sang lộ trình khác thì lộ trình cũ được tạm dừng và giữ nguyên tiến độ.</p>
        {onCancel && <p><button className="btn-quiet" onClick={onCancel}>← Quay lại kế hoạch hiện tại</button></p>}
      </header>
      <ErrorNote error={error} />
      {items.length === 0 ? (
        <section className="panel"><p className="muted">Chưa có lộ trình nào được xuất bản.</p></section>
      ) : (
        <div className="path-grid">
          {items.map((p) => (
            <article key={p.id} className={`panel path-card${p.id === activeId ? " is-active" : ""}`}>
              <p className="eyebrow">{p.id} · {PERSONA_LABELS[p.persona] ?? p.persona}</p>
              <h2>{p.name}</h2>
              <dl className="path-facts">
                <div><dt>Thời lượng</dt><dd>{p.weeks} tuần</dd></div>
                <div><dt>Mỗi tuần</dt><dd>{p.hours_per_week}</dd></div>
                <div><dt>Số bài</dt><dd>{p.lessons}</dd></div>
              </dl>
              {p.capstone_id && <p className="muted small">Kết thúc bằng capstone {p.capstone_id}</p>}
              <button className="btn" disabled={busy !== null || p.id === activeId} onClick={() => join(p.id)}>
                {p.id === activeId ? "Đang học" : busy === p.id ? "Đang ghi danh…" : p.enrollment ? "Tiếp tục lộ trình này" : "Chọn lộ trình này"}
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function PlanView({ pathId, onChoose }: { pathId: string; onChoose: () => void }) {
  const { data, error, loading } = useLoad(() => api<PathPlan>(`/api/paths/${pathId}`), [pathId]);
  if (loading && !data) return <section className="wrap"><Loading /></section>;
  if (!data) return <section className="wrap"><ErrorNote error={error} /></section>;

  const total = data.weeks.reduce((s, w) => s + w.lessons.length, 0);
  const done = data.weeks.reduce((s, w) => s + w.done, 0);

  return (
    <section className="wrap stack">
      <header className="page-head">
        <p className="eyebrow">Kế hoạch học · {data.path.id}</p>
        <h1>{data.path.name}</h1>
        <dl className="stats">
          <div><dt>Tuần hiện tại</dt><dd>{data.currentWeek ?? "—"}/{data.path.weeks}</dd></div>
          <div><dt>Đã đạt</dt><dd>{done}/{total}</dd></div>
          <div><dt>Mỗi tuần</dt><dd className="small-dd">{data.path.hours_per_week}</dd></div>
        </dl>
        <p className="muted small">Bắt đầu {formatDate(data.enrollment?.started_at)} · <button className="btn-quiet inline" onClick={onChoose}>Đổi lộ trình</button></p>
      </header>

      {data.weeks.map((w) => {
        const current = w.week === data.currentWeek;
        const body = (
          <ol className="lessons">
            {w.lessons.map((l) => (
              <li key={l.id} className={l.status === "locked" ? "is-locked" : ""}>
                <span className="mono muted">{l.id}</span>
                <span className="lesson-title">
                  <Link to={`/lessons/${l.id}`}>{l.title}</Link>
                  {l.status === "locked" && l.lock_reason ? <small>{LOCK_TEXT[l.lock_reason].help}</small> : null}
                </span>
                <KindTag kind={l.kind} />
                <LevelChip level={l.level} />
                <span className="mono score">{l.best_score ?? "—"}</span>
                <StatusPill status={l.status} reason={l.lock_reason} />
              </li>
            ))}
          </ol>
        );
        return (
          <section key={w.week} className={`week${current ? " is-current" : ""}`} aria-labelledby={`week-${w.week}`}>
            {current ? (
              <>
                <div className="module-head">
                  <span className="mono accent">Tuần {w.week}</span>
                  <h2 id={`week-${w.week}`}>Tuần này</h2>
                  <span className="muted small">{w.done}/{w.lessons.length} bài đã đạt · khoảng {Math.round(w.minutes / 60)} giờ</span>
                </div>
                {body}
              </>
            ) : (
              <details>
                <summary className="module-head">
                  <span className="mono accent">Tuần {w.week}</span>
                  <h2 id={`week-${w.week}`}>{w.week < (data.currentWeek ?? 0) ? "Đã qua" : "Sắp tới"}</h2>
                  <span className="muted small">{w.done}/{w.lessons.length} bài đã đạt · khoảng {Math.round(w.minutes / 60)} giờ</span>
                </summary>
                {body}
              </details>
            )}
          </section>
        );
      })}

      {data.capstone && (
        <section className="panel">
          <p className="eyebrow">Capstone · {data.capstone.id}</p>
          <h2>{data.capstone.title}</h2>
          <p>{data.capstone.objective}</p>
          <p className="muted small">Sản phẩm nộp: {data.capstone.deliverable}</p>
        </section>
      )}
    </section>
  );
}
