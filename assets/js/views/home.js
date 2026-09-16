window.VIEWS = window.VIEWS || {};

window.VIEWS.home = function(){
  const S = State.get();
  const daily = State.dailyCase();
  const cont  = State.continueCase();
  const lv = State.level(), nx = State.nextLevel();
  const pct = Math.round(State.levelProgress()*100);

  const featured = window.CASES.filter(c=>State.isUnlocked(c)).slice(0,6);
  const districts = window.INDUSTRIES.slice(0,7);

  return `
<!-- ══════════════════════════════════════════════════════════════════
     DẢI 1: HERO & SLEEK STRATEGIC SIMULATOR (.band-paper)
     ══════════════════════════════════════════════════════════════════ -->
<section class="hero band band-paper" style="padding: 56px 0 44px;">
  <div class="hero-grid"></div>

  <div class="hero-in" style="display:grid; grid-template-columns: 1.1fr 1fr; gap:40px; align-items:center;">
    <!-- CỘT TRÁI: EDITORIAL COPYWRITING & MINIMALIST STATS RIBBON -->
    <div>
      <div class="hero-badge">
        <span class="hero-badge-dot"></span>
        <span>Mô Phỏng Chiến Lược &amp; Tư Duy Kinh Doanh</span>
      </div>

      <h1 class="hero-title">
        Think like a strategist.<br>
        Learn business by <span class="highlight">solving it.</span>
      </h1>

      <p class="hero-lede">
        Khám phá cách các doanh nghiệp hàng đầu vận hành và kiếm tiền. Rèn luyện phản xạ kinh doanh qua những tình huống thực chiến chuẩn thị trường Việt Nam.
      </p>

      <div class="hero-cta-group">
        <a class="btn-hero-primary" href="#/daily">
          Bắt đầu giải Case ngay &nbsp;→
        </a>
        <a class="btn-hero-secondary" href="#/map">
          Khám phá 14 ngành
        </a>
      </div>

      <!-- MINIMALIST STATS RIBBON (Tối giản, thoáng đãng, sang trọng) -->
      <div class="stats-ribbon">
        <div class="stat-item">
          <span class="stat-num">885+</span>
          <span class="stat-label">Bài học tư duy</span>
        </div>
        <div class="stat-sep"></div>
        <div class="stat-item">
          <span class="stat-num stat-emerald">0đ</span>
          <span class="stat-label">Hoàn toàn miễn phí</span>
        </div>
        <div class="stat-sep"></div>
        <div class="stat-item">
          <span class="stat-num">3.800+</span>
          <span class="stat-label">Học viên thực chiến</span>
        </div>
        <div class="stat-sep"></div>
        <div class="stat-item">
          <span class="stat-num stat-amber">30.000+</span>
          <span class="stat-label">Lượt pass case</span>
        </div>
      </div>
    </div>

    <!-- CỘT PHẢI: SÂN KHẤU 3D TƯƠNG TÁC (HERO INTERACTIVE STAGE) -->
    <div>
      ${window.LANDING ? LANDING.renderHeroStage() : ''}
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════════════════════════════
     DẢI 2: WORLD MAP & LỘ TRÌNH HỌC TẬP (.band-academic)
     ══════════════════════════════════════════════════════════════════ -->
<div class="band band-academic band-divider">
  <div class="wrap" style="padding-top: 24px; padding-bottom: 24px;">
    <section class="sec">
      ${UI.secHead("World Map","Bản đồ ngành","14 industry districts")}
      <div class="districts">
        ${districts.map(i=>VIEWS._district(i)).join("")}
        <a class="district" href="#/map" style="display:flex;align-items:center;justify-content:center;min-height:170px;background:var(--stone-50)">
          <span class="mono" style="font-size:11.5px;font-weight:700;letter-spacing:.14em;color:var(--color-primary);text-transform:uppercase">Xem toàn bản đồ →</span>
        </a>
      </div>
    </section>

    <section class="sec">
      ${UI.secHead("Start here","Bắt đầu từ đây","học trước, giải case sau")}
      <div class="grid g3">
        ${window.TRACKS.map(t=>{
          const p = State.trackProgress(t.id);
          return `<a class="model-card" href="#/track/${t.id}">
            <div class="mc-n">${UI.esc(t.name)}</div>
            <div class="mono" style="font-size:11px;color:var(--stone-500);margin-top:3px;font-weight:600">${UI.esc(t.vi)}</div>
            <div class="mc-d" style="margin-top:10px">${UI.esc(t.promise)}</div>
            <div class="dimbar" style="margin-top:14px"><div class="db-h"><span>${t.modules.length} module · ${p.total} bài</span><span>${p.pct}%</span></div>
              <div class="db-t"><i style="width:${p.pct}%"></i></div></div>
            <div class="mc-e">${(function(){ const st=State.get().exams[t.id];
              if(st&&st.passed) return 'Đã có chứng chỉ · '+st.best+' điểm';
              if(State.examUnlocked(t.id)) return 'Đã học xong — sẵn sàng thi cuối lộ trình';
              return p.done? 'Đang học · còn '+(p.total-p.done)+' bài' : 'Chưa bắt đầu' })()}</div>
          </a>`;
        }).join("")}
      </div>
      <div style="margin-top:18px">${(function(){const n=State.nextLesson();
        return n? '<a class="btn btn-sm btn-primary" href="#/lesson/'+n.id+'">Học tiếp: '+UI.esc(n.title)+' &nbsp;→</a>'
                : '<a class="btn btn-sm" href="#/learn">Xem toàn bộ lộ trình</a>'})()}</div>
    </section>
  </div>
</div>

<!-- ══════════════════════════════════════════════════════════════════
     DẢI 3: GAMIFIED BOSS BATTLE ARENA (MarketBossBattleDemo)
     ══════════════════════════════════════════════════════════════════ -->
${window.LANDING ? LANDING.renderBossBattle() : ''}

<!-- ══════════════════════════════════════════════════════════════════
     DẢI 4: MISSION BOARD & 12 BUSINESS MODELS
     ══════════════════════════════════════════════════════════════════ -->
<div class="band band-divider">
  <div class="wrap" style="padding-top: 24px; padding-bottom: 24px;">
    <section class="sec">
      ${UI.secHead("Mission Board","Case luyện tập","đang mở cho cấp của bạn")}
      <div class="missions">${featured.map(UI.missionCard).join("")}</div>
      <div style="margin-top:18px"><a class="btn btn-sm" href="#/cases">Toàn bộ ${window.CASES.length} mission</a></div>
    </section>

    <section class="sec">
      ${UI.secHead("Business Models","Mô hình kinh doanh","cách doanh nghiệp kiếm tiền")}
      <div class="grid g4">
        ${window.MODELS.slice(0,4).map(m=>`<a class="model-card" href="#/model/${m.id}">
          <div class="mc-n">${UI.esc(m.name)}</div>
          <div class="mono" style="font-size:11px;color:var(--stone-500);margin-top:3px;font-weight:600">${UI.esc(m.vi||"")}</div>
          <div class="mc-f">${UI.esc(m.formula)}</div>
          <div class="mc-d">${UI.esc(m.short)}</div>
          <div class="mc-e">${m.examples.map(e=>(window.COMPANY_BY_ID[e]||{}).name).filter(Boolean).join(" · ")}</div>
        </a>`).join("")}
      </div>
      <div style="margin-top:18px"><a class="btn btn-sm" href="#/models">12 mô hình kinh doanh</a></div>
    </section>
  </div>
</div>

<!-- ══════════════════════════════════════════════════════════════════
     DẢI 5: STUDENT TESTIMONIALS (2-ROW INFINITE MARQUEE)
     ══════════════════════════════════════════════════════════════════ -->
${window.LANDING ? LANDING.renderTestimonials() : ''}

<!-- ══════════════════════════════════════════════════════════════════
     DẢI 6: COMPANY BATTLES & SO SÁNH DOANH NGHIỆP
     ══════════════════════════════════════════════════════════════════ -->
<div class="band band-academic band-divider">
  <div class="wrap" style="padding-top: 24px; padding-bottom: 48px;">
    <section class="sec">
      ${UI.secHead("Company Battles","So sánh doanh nghiệp","bốn mặt trận")}
      <div class="grid g2">
        ${window.BATTLES.slice(0,2).map(b=>VIEWS._battleCard(b)).join("")}
      </div>
      <div style="margin-top:18px"><a class="btn btn-sm" href="#/battles">Tất cả battle</a></div>
    </section>
  </div>
</div>
`;
};

window.VIEWS._district = function(ind){
  const p = State.industryProgress(ind.id);
  const cos = (window.COMPANIES_BY_INDUSTRY[ind.id]||[]).length;
  const locked = State.levelIndex()+1 < ind.unlock;
  const pct = p.total? Math.round(p.done/p.total*100):0;

  // mỗi ngành một sắc địa hình riêng theo bảng màu Warm Stone / Emerald / Amber
  const skins = [
    {sky:"#FAF8F5", far:"#E7E0D8", mid:"#A8A29E", near:"#57534E"},
    {sky:"#ECFDF5", far:"#A7F3D0", mid:"#34D399", near:"#059669"},
    {sky:"#FFFBEB", far:"#FDE68A", mid:"#F59E0B", near:"#D97706"},
    {sky:"#F5F5F4", far:"#D6D3D1", mid:"#78716C", near:"#44403C"}
  ];
  const sk = skins[(window.INDUSTRIES.findIndex(x=>x.id===ind.id)) % skins.length];

  // dải núi dựng từ chính mảng sky của ngành → mỗi ngành một hình khác nhau
  const ridge = (vals, base, color, op) => {
    const W=100, step=W/(vals.length-1);
    let d="M0 "+ (base - vals[0]*0.62);
    vals.forEach((v,i)=>{ if(i===0) return;
      const x=i*step, y=base - v*0.62, px=(i-1)*step, py=base - vals[i-1]*0.62;
      d += " C "+(px+step*0.42)+" "+py+" "+(x-step*0.42)+" "+y+" "+x+" "+y;
    });
    d += " L100 100 L0 100 Z";
    return `<path d="${d}" fill="${color}" opacity="${op}"/>`;
  };
  const a = ind.sky, b = a.slice().reverse().map(v=>v*0.78), c = a.map((v,i)=>(v*0.55 + (i%3)*6));

  return `<a class="district${locked?' locked':''}" href="#/district/${ind.id}">
    <div class="d-terrain">
      <svg class="d-ridge" viewBox="0 0 100 100" preserveAspectRatio="none">
        <rect width="100" height="100" fill="${sk.sky}"/>
        ${ridge(b, 86, sk.far, .95)}
        ${ridge(c, 98, sk.mid, .95)}
        ${ridge(a, 118, sk.near, .97)}
      </svg>
      <div class="d-top">
        <div><div class="d-name">${UI.esc(ind.name)}</div><div class="d-code">${UI.esc(ind.vi)}</div></div>
        ${locked?'<span class="tag">LOCKED</span>':'<span class="tag brass">'+cos+' CO</span>'}
      </div>
    </div>
    <div class="d-foot"><span>${UI.esc(ind.driver.split(" · ")[0])}</span><span>${p.done}/${p.total} case</span></div>
    <div class="d-bar"><i style="width:${pct}%"></i></div>
  </a>`;
};

window.VIEWS._battleCard = function(b){
  const A = window.COMPANY_BY_ID[b.a], B = window.COMPANY_BY_ID[b.b];
  const st = State.get().battles[b.id];
  return `<a class="battle-card" href="#/battle/${b.id}">
    <div class="panel-h"><b>${UI.esc(b.headline)}</b><div style="flex:1"></div>${st?'<span class="tag pos">'+st.correct+'/'+st.total+'</span>':'<span class="tag">'+b.xp+' XP</span>'}</div>
    <div class="vs">
      <div class="side"><div class="s-n">${UI.esc(A.name)}</div><div class="s-m">${UI.esc(A.country)}</div></div>
      <div class="mid">VS</div>
      <div class="side"><div class="s-n">${UI.esc(B.name)}</div><div class="s-m">${UI.esc(B.country)}</div></div>
    </div>
  </a>`;
};
