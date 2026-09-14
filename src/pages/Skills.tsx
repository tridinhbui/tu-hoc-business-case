import type { Readiness } from "../api";
import { formatDate } from "../lib";

const THRESHOLD = 70;

export function SkillsPage({ readiness }: { readiness: Readiness[] }) {
  return (
    <section className="wrap stack">
      <header className="page-head">
        <p className="eyebrow">Năng lực</p>
        <h1>Mức sẵn sàng theo từng kỹ năng</h1>
        <p className="muted lede">
          Mỗi kỹ năng tính từ ba lần đánh giá gần nhất. Không luyện lại quá 6 tuần thì điểm giảm dần, thấp nhất còn 60% điểm gốc.
          Ngưỡng sẵn sàng thi đấu là <b>{THRESHOLD}</b>.
        </p>
      </header>

      {readiness.length === 0 ? (
        <section className="panel">
          <p className="muted">Chưa có dữ liệu năng lực. Hoàn thành một bài có chấm điểm để bắt đầu.</p>
        </section>
      ) : (
        <section className="panel">
          <ul className="bars">
            {readiness.map((r) => {
              const decayed = r.score < r.raw_score;
              return (
                <li key={r.skill_id} className={r.score < THRESHOLD ? "below" : ""}>
                  <span className="bar-label"><span className="mono muted">{r.skill_id}</span> {r.name}</span>
                  <span className="bar-track" role="img" aria-label={`${r.name}: ${r.score} trên 100`}>
                    {decayed && <i className="bar-raw" style={{ width: `${r.raw_score}%` }} />}
                    <i className="bar-fill" style={{ width: `${r.score}%` }} />
                    <b className="bar-threshold" style={{ left: `${THRESHOLD}%` }} />
                  </span>
                  <span className="mono bar-value">{r.score}</span>
                  <span className="muted small bar-meta">{decayed ? `giảm từ ${r.raw_score} · ` : ""}lần gần nhất {formatDate(r.last_evidence_at)}</span>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </section>
  );
}
