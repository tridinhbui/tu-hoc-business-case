import { api, type AdminOverview } from "../api";
import { ErrorNote, formatDate, KIND_LABELS, LEVEL_NAMES, Link, Loading, since, useLoad } from "../lib";

export function AdminPage() {
  const { data, error, loading } = useLoad(() => api<AdminOverview>("/api/admin/overview"), []);
  if (loading && !data) return <section className="wrap"><Loading /></section>;
  if (!data) return <section className="wrap"><ErrorNote error={error} /></section>;

  const c = data.content;
  const gaps = [
    { label: "Rubric chưa có mô tả 4 mức", value: c.rubrics_missing_levels, total: c.rubrics_total },
    { label: "Mã lỗi chưa có nguyên nhân gốc", value: c.codes_without_root_cause, total: c.codes_total },
    { label: "Số liệu nền chưa có nguồn", value: c.assumptions_without_source, total: c.assumptions_total },
  ];

  return (
    <section className="wrap stack">
      <header className="page-head">
        <p className="eyebrow">Giảng viên</p>
        <h1>Tình hình lớp</h1>
        <dl className="stats">
          <div><dt>Chờ chấm</dt><dd>{data.queue.total}</dd></div>
          <div><dt>Đang được chấm</dt><dd>{data.queue.claimed ?? 0}</dd></div>
          <div><dt>Đã chấm 7 ngày</dt><dd>{data.attempts.graded_last7 ?? 0}</dd></div>
          <div><dt>Bài đang mở</dt><dd>{data.attempts.open ?? 0}</dd></div>
          <div><dt>Học viên hoạt động</dt><dd>{data.learners.activeLast7}</dd></div>
        </dl>
        {data.queue.oldest && (
          <p className="muted small">Bài chờ lâu nhất: {since(data.queue.oldest)} · <Link to="/grader">mở hàng đợi chấm</Link></p>
        )}
      </header>

      <div className="grid-2">
        <section className="panel">
          <h2>Điểm theo rubric</h2>
          <p className="muted small">Tỷ lệ đạt quá cao hoặc quá thấp là dấu hiệu rubric đặt sai ngưỡng, không phải lớp giỏi hay yếu.</p>
          {data.rubrics.length === 0 ? <p className="muted">Chưa có bài nào được chấm.</p> : (
            <div className="table-wrap">
              <table>
                <thead><tr><th>Rubric</th><th className="r">Bài</th><th className="r">Điểm TB</th><th className="r">Tỷ lệ đạt</th></tr></thead>
                <tbody>
                  {data.rubrics.map((r) => (
                    <tr key={r.rubric_id}>
                      <td><span className="mono muted">{r.rubric_id}</span> {r.name}</td>
                      <td className="r mono">{r.n}</td>
                      <td className="r mono">{r.avg_score}</td>
                      <td className="r mono">{r.pass_rate}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="panel">
          <h2>Người chấm</h2>
          <p className="muted small">
            Cột lệch là điểm trung bình của người chấm so với mức chung{data.overallAvg !== null ? ` (${data.overallAvg})` : ""}.
            Đây chỉ là chỉ báo gần đúng: chưa có quy trình chấm đôi nên chưa đo được độ lệch trên cùng một bài.
          </p>
          {data.graders.length === 0 ? <p className="muted">Chưa có ai chấm bài.</p> : (
            <div className="table-wrap">
              <table>
                <thead><tr><th>Người chấm</th><th>Loại</th><th className="r">Đã chấm</th><th className="r">Điểm TB</th><th className="r">Lệch</th></tr></thead>
                <tbody>
                  {data.graders.map((g) => (
                    <tr key={g.grader_id + g.grader_type}>
                      <td>{g.display_name}</td>
                      <td>{g.grader_type === "peer" ? "Bạn học" : "Giảng viên"}</td>
                      <td className="r mono">{g.n}</td>
                      <td className="r mono">{g.avg_score}</td>
                      <td className={`r mono${g.delta !== null && Math.abs(g.delta) >= 10 ? " warn-text" : ""}`}>
                        {g.delta === null ? "—" : g.delta > 0 ? `+${g.delta}` : g.delta}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      <div className="grid-2">
        <section className="panel">
          <h2>Mã lỗi hay gặp</h2>
          {data.mistakes.length === 0 ? <p className="muted">Chưa có mã lỗi nào được gắn.</p> : (
            <ul className="data-list">
              {data.mistakes.map((m) => (
                <li key={m.code}>
                  <code className="code">{m.code}</code> {m.title}
                  <span className="muted small"> · {m.n} lần · {m.learners} học viên</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="panel">
          <h2>Cấp độ học viên</h2>
          <ul className="data-list">
            {data.learners.byLevel.length === 0 ? <li className="muted">Chưa có học viên.</li> : data.learners.byLevel.map((l) => (
              <li key={l.level}><span className={`lv lv${l.level}`}>L{l.level}</span> {LEVEL_NAMES[l.level]} <span className="muted small">· {l.n} người</span></li>
            ))}
          </ul>
        </section>
      </div>

      <section className="panel">
        <h2>Phiên live gần đây</h2>
        {data.live.recent.length === 0 ? <p className="muted">Chưa có phiên nào. <Link to="/live">Tạo phòng</Link></p> : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>Bài</th><th>Loại</th><th>Trạng thái</th><th className="r">Người</th><th>Hạn</th><th></th></tr></thead>
              <tbody>
                {data.live.recent.map((s) => (
                  <tr key={s.id}>
                    <td><span className="mono muted">{s.lesson_id}</span> {s.lesson_title}</td>
                    <td>{KIND_LABELS[s.kind] ?? s.kind}</td>
                    <td>{s.status === "running" ? "Đang chạy" : s.status === "ended" ? "Đã kết thúc" : s.status}</td>
                    <td className="r mono">{s.participants}</td>
                    <td>{formatDate(s.deadline_at)}</td>
                    <td className="r"><Link to={`/live/${s.id}`}>Mở</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="panel">
        <h2>Nội dung còn thiếu</h2>
        <p className="muted small">
          Sinh từ tài liệu nguồn trong <code>content-source/</code>. Những mục này cần người biên soạn viết, hệ thống không tự điền.
          Hiện có {c.lessons_published} bài đã xuất bản.
        </p>
        <ul className="data-list">
          {gaps.map((g) => (
            <li key={g.label}>
              <b className={g.value > 0 ? "warn-text" : ""}>{g.value}</b>/{g.total} — {g.label}
            </li>
          ))}
          {c.cases_by_status.map((s) => (
            <li key={s.status}>
              <b>{s.n}</b> đề case ở trạng thái {s.status === "draft" ? "nháp (chưa chạy thử đủ 3 lần)" : s.status}
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
