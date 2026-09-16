import { api, type KingdomModule, type KingdomView } from "../api";
import { ErrorNote, LEVEL_NAMES, Link, Loading, LOCK_TEXT, useLoad } from "../lib";

const TERRITORY_STATUS: Record<string, string> = { locked: "Chưa mở", open: "Đang mở", cleared: "Đã chiếm" };

export function KingdomPage() {
  const { data, error, loading } = useLoad(() => api<KingdomView>("/api/kingdom"), []);
  if (loading && !data) return <section className="wrap"><Loading /></section>;
  if (!data) return <section className="wrap"><ErrorNote error={error} /></section>;

  const { hero, territories, quests } = data;
  const open = territories.filter((t) => t.status !== "locked");
  const locked = territories.filter((t) => t.status === "locked");

  return (
    <section className="wrap stack">
      <header className="hud">
        <div className="hud-hero">
          <span className={`hud-lv lv lv${hero.level}`}>Lv.{hero.level}</span>
          <span className="hud-name">{hero.name}<small>{LEVEL_NAMES[hero.level]}</small></span>
        </div>
        <dl className="hud-stats">
          <div><dt>Điểm kinh nghiệm</dt><dd>{hero.xp.toLocaleString("vi-VN")}</dd></div>
          <div><dt>Bài đã đạt</dt><dd>{hero.passed}<small>/{hero.total}</small></dd></div>
          <div><dt>Chuỗi ngày</dt><dd>{hero.streak}<small> ngày</small></dd></div>
          <div>
            <dt>Sẵn sàng</dt>
            <dd>{hero.readiness === null ? "—" : `${hero.readiness}%`}<small> · {hero.skills_ready}/{hero.skills_measured} năng lực</small></dd>
          </div>
        </dl>
      </header>

      <p className="muted small">
        Bản đồ không phải một trò chơi riêng: mỗi vùng đất là một nhánh của chương trình, mỗi boss là checkpoint của module,
        và máu boss rút xuống theo số bài bạn đã đạt. Điểm kinh nghiệm là tổng điểm cao nhất của các bài đã đạt — làm ẩu nhiều bài
        không bằng làm tử tế một bài.
      </p>

      {quests.length > 0 && (
        <section className="panel quests">
          <h2>Nhiệm vụ đang mở</h2>
          <ul>
            {quests.map((q) => (
              <li key={`${q.kind}-${q.lesson_id}`} className={`quest quest-${q.kind}`}>
                <span className="quest-kind">{q.kind === "remediation" ? "Sửa lỗi" : q.kind === "review" ? "Review" : "Tiếp theo"}</span>
                <span className="quest-body">
                  <Link to={`/lessons/${q.lesson_id}`}>{q.label}</Link>
                  <small>{q.detail}</small>
                </span>
                <span className="mono muted small">{q.lesson_id}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {open.map((t) => (
        <section key={t.id} className={`territory is-${t.status}`}>
          <header className="territory-head">
            <span className="territory-id">{t.id}</span>
            <div>
              <h2>{t.name}</h2>
              <p className="muted small">{t.role}</p>
            </div>
            <span className={`pill pill-${t.status === "cleared" ? "passed" : "available"}`}>{TERRITORY_STATUS[t.status]}</span>
          </header>
          <ol className="map-path">
            {t.modules.map((m) => <ModuleNode key={m.id} module={m} />)}
          </ol>
        </section>
      ))}

      {locked.length > 0 && (
        <section className="panel">
          <h2>Vùng đất chưa mở</h2>
          <p className="muted small">Mở bằng cách qua checkpoint của các module nền phía trước, hoặc lên cấp.</p>
          <div className="row">
            {locked.map((t) => (
              <span key={t.id} className="tag">{t.id} · {t.name}</span>
            ))}
          </div>
        </section>
      )}
    </section>
  );
}

function ModuleNode({ module }: { module: KingdomModule }) {
  const boss = module.boss;
  const done = module.lessons === 0 ? 0 : Math.round((module.cleared / module.lessons) * 100);
  return (
    <li className={`node is-${module.status}`}>
      <div className="node-head">
        <span className="node-id mono">{module.id}</span>
        <b>{module.title}</b>
      </div>
      <p className="muted small node-outcome">{module.outcome}</p>
      <div className="node-progress" aria-label={`${module.cleared}/${module.lessons} bài đã đạt`}>
        <span style={{ width: `${done}%` }} />
      </div>
      <p className="small muted">{module.cleared}/{module.lessons} bài đã đạt</p>

      {boss && (
        <div className={`boss is-${boss.status}`}>
          <div className="boss-head">
            <span className="boss-tag">{boss.status === "passed" ? "Đã hạ" : `Boss · ${boss.hp}% HP`}</span>
            <span className={`lv lv${boss.level}`}>L{boss.level}</span>
          </div>
          <b>{boss.title}</b>
          {boss.status !== "passed" && (
            <div className="boss-hp"><span style={{ width: `${boss.hp}%` }} /></div>
          )}
          {boss.status === "passed" ? (
            <p className="small muted">Điểm cao nhất {boss.best_score}</p>
          ) : boss.status === "locked" && boss.lock_reason ? (
            <p className="small muted">{LOCK_TEXT[boss.lock_reason].short} — {LOCK_TEXT[boss.lock_reason].help}</p>
          ) : (
            <Link to={`/lessons/${boss.lesson_id}`} className="btn-small">Đánh boss</Link>
          )}
        </div>
      )}
    </li>
  );
}
