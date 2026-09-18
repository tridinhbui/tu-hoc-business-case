import { api, type LandingView } from "../api";
import { ErrorNote, KIND_LABELS, LEVEL_NAMES, Link, PERSONA_LABELS, useLoad } from "../lib";

const GATES = [
  ["Cấp độ", "Bài của cấp trên chỉ mở sau khi bạn qua checkpoint của cấp hiện tại."],
  ["Module tiên quyết", "Chưa qua module nền thì module sau còn khoá."],
  ["Làm bản thường trước", "Phải đạt bản không bấm giờ rồi mới được luyện bản bấm giờ."],
  ["Drill sửa lỗi", "Lỗi lặp lại 2 trong 3 bài gần nhất sẽ chặn loại bài đó tới khi bạn làm xong drill."],
  ["Review bài trước", "Bài chấm xong mà có lỗi thì phải xem lại và viết lại phần sai mới làm tiếp."],
];

const LOOP = [
  ["Làm", "Mỗi bài có một output bắt buộc: issue tree, bảng tính, trang khuyến nghị, hay bài pitch."],
  ["Nộp", "Output được lưu lại nguyên bản, kèm giả định bạn đã dùng."],
  ["Chấm", "Rubric 4 mức, mỗi mức mô tả rõ thế nào là đạt; người chấm phải trích dẫn bằng chứng trong bài."],
  ["Gắn mã lỗi", "Sai ở đâu được gắn mã lỗi cụ thể, không phải nhận xét chung chung."],
  ["Sửa và lên cấp", "Mã lỗi biến thành drill; điểm readiness theo từng năng lực quyết định bạn đã sẵn sàng chưa."],
];

export function LandingPage() {
  const view = useLoad(() => api<LandingView>("/api/landing"), []);
  const d = view.data;
  const hours = d ? Math.round(d.counts.minutes / 60) : 0;

  return (
    <div className="landing">
      <header className="lp-top">
        <span className="brand">Tự học Business Case</span>
        <Link to="/login" className="btn-small">Đăng nhập</Link>
      </header>

      <section className="wrap lp-hero">
        <p className="eyebrow">Tự học business case</p>
        <h1>Học case bằng cách làm case, không phải bằng cách đọc framework</h1>
        <p className="lede">
          Một chương trình tự học cho case competition, phỏng vấn tư vấn, marketing, supply chain và chiến lược.
          Mỗi bài bắt bạn tạo ra một sản phẩm cụ thể, được chấm theo rubric, và mỗi lỗi sai sẽ quay lại thành bài luyện
          cho tới khi bạn hết sai.
        </p>
        <div className="row lp-cta">
          <Link to="/login" className="btn">Bắt đầu học</Link>
          <a className="btn-secondary" href="#cach-hoc">Xem cách học</a>
        </div>
        <p className="muted small">Đăng nhập bằng Google. Miễn phí, không cần thẻ.</p>
      </section>

      {d && (
        <section className="wrap lp-stats" aria-label="Quy mô chương trình">
          <Stat n={d.counts.modules} label="module đã xuất bản" />
          <Stat n={d.counts.lessons} label="bài học và case" />
          <Stat n={d.counts.cases} label="đề case có dữ liệu" />
          <Stat n={d.counts.skills} label="năng lực được đo" />
          <Stat n={d.counts.capstones} label="capstone" />
          <Stat n={hours} label="giờ nội dung ước tính" />
        </section>
      )}

      <section className="wrap stack" id="cach-hoc">
        <div>
          <p className="eyebrow">Cách học</p>
          <h2 className="lp-h2">Một vòng lặp, lặp đến khi thành phản xạ</h2>
        </div>
        <ol className="lp-loop">
          {LOOP.map(([title, body], i) => (
            <li key={title}>
              <span className="lp-step">{i + 1}</span>
              <div><b>{title}</b><p className="muted small">{body}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap stack">
        <div>
          <p className="eyebrow">Nguyên tắc</p>
          <h2 className="lp-h2">Bài bị khoá là có lý do</h2>
          <p className="lede muted">
            Chương trình không cho bạn nhảy cóc. Năm cổng dưới đây quyết định bài nào mở, dựa trên việc bạn đã làm được gì —
            không dựa trên việc bạn đã xem bao nhiêu video.
          </p>
        </div>
        <div className="grid-2">
          {GATES.map(([title, body]) => (
            <div className="panel lp-gate" key={title}>
              <b>{title}</b>
              <p className="muted small">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {d && (
        <section className="wrap stack">
          <div>
            <p className="eyebrow">Nội dung</p>
            <h2 className="lp-h2">Mười nhánh, đi từ nền tảng tới thi đấu</h2>
          </div>
          <div className="lp-tracks">
            {d.tracks.map((t) => (
              <div className="lp-track" key={t.id}>
                <span className="lp-track-id">{t.id}</span>
                <div>
                  <b>{t.name}</b>
                  <p className="muted small">{t.role}</p>
                </div>
                <span className="muted small lp-track-n">{t.modules} module</span>
              </div>
            ))}
          </div>
          <p className="muted small">
            Bốn cấp độ: {Object.values(LEVEL_NAMES).join(" → ")}. Mỗi cấp kết thúc bằng một checkpoint phải đạt mới lên cấp.
          </p>
        </section>
      )}

      {d && d.paths.length > 0 && (
        <section className="wrap stack">
          <div>
            <p className="eyebrow">Lộ trình</p>
            <h2 className="lp-h2">Chọn theo thời gian bạn thật sự có</h2>
          </div>
          <div className="grid-2">
            {d.paths.map((p) => (
              <div className="panel" key={p.id}>
                <b>{p.name}</b>
                <p className="muted small">Cho: {PERSONA_LABELS[p.persona] ?? p.persona}</p>
                <p className="small">{p.weeks} tuần · {p.hours_per_week} giờ/tuần · {p.lessons} bài</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {d && d.kinds.length > 0 && (
        <section className="wrap stack">
          <div>
            <p className="eyebrow">Luyện tập</p>
            <h2 className="lp-h2">Không chỉ có một kiểu bài</h2>
          </div>
          <div className="row lp-kinds">
            {d.kinds.map((k) => (
              <span className="pill" key={k.kind}>{KIND_LABELS[k.kind] ?? k.kind} · {k.n}</span>
            ))}
          </div>
          <p className="muted small">
            Phòng live cho phỏng vấn thử và làm case theo nhóm chạy thời gian thực: người phỏng vấn thả dữ liệu theo yêu cầu,
            có giới hạn câu hỏi và mốc thời gian như thi thật.
          </p>
        </section>
      )}

      <section className="wrap lp-end">
        <h2 className="lp-h2">Bắt đầu từ bài đầu tiên, hôm nay</h2>
        <p className="muted">Đăng nhập một lần, tiến độ và điểm năng lực được lưu lại theo email của bạn.</p>
        <Link to="/login" className="btn">Đăng nhập với Google</Link>
        <ErrorNote error={view.error} />
      </section>

      <footer className="wrap lp-foot muted small">
        Tự học Business Case · chạy hoàn toàn trên Cloudflare Workers
      </footer>
    </div>
  );
}

function Stat({ n, label }: { n: number; label: string }) {
  return (
    <div className="lp-stat">
      <b>{n}</b>
      <span className="muted small">{label}</span>
    </div>
  );
}
