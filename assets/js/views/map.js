window.VIEWS.map = function(){
  const S = State.get();
  const totalCases = window.CASES.length;
  const doneCases = Object.values(S.cases).filter(c=>c.done).length;
  return `
<div class="wrap">
  <section class="sec">
    <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:20px;flex-wrap:wrap;margin-bottom:8px">
      <div>
        <h1 style="font-size:34px">Business World Map</h1>
        <p class="muted" style="max-width:62ch;margin-top:10px">Mỗi khu vực là một ngành. Trong mỗi khu vực là các doanh nghiệp thật và những mission gắn với vấn đề mà họ đang thực sự đối mặt. Cấp bậc càng cao, càng nhiều khu vực mở ra.</p>
      </div>
      <div style="text-align:right">
        <div class="mono" style="font-size:10px;letter-spacing:.14em;color:var(--dim-2);text-transform:uppercase">Tiến độ toàn bản đồ</div>
        <div style="font-family:var(--head);font-size:30px;color:var(--brass-2)">${doneCases}<span style="color:var(--dim);font-size:18px">/${totalCases}</span></div>
      </div>
    </div>
    <div class="map-legend">
      <span><i style="background:var(--brass)"></i>Đã mở</span>
      <span><i style="background:var(--panel-3);border:1px solid var(--line)"></i>Cần cấp cao hơn</span>
      <span><i style="background:var(--line-2)"></i>Thanh dưới mỗi khu = tiến độ mission</span>
    </div>
    <div class="districts">${window.INDUSTRIES.map(i=>VIEWS._district(i)).join("")}</div>
  </section>
</div>`;
};

window.VIEWS.district = function(id){
  const ind = window.INDUSTRY_BY_ID[id];
  if(!ind) return VIEWS.notfound();
  const cos = window.COMPANIES_BY_INDUSTRY[id]||[];
  const cases = window.CASES.filter(c=>c.industry===id);
  const p = State.industryProgress(id);
  const locked = State.levelIndex()+1 < ind.unlock;

  return UI.crumb([{t:"World Map",href:"#/map"},{t:ind.name}])+`
<div class="wrap">
  <section class="sec" style="padding-top:14px">
    <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:20px;flex-wrap:wrap">
      <div>
        <div class="mono" style="font-size:10.5px;letter-spacing:.16em;color:var(--dim-2)">${ind.code}</div>
        <h1 style="font-size:40px;margin-top:4px">${UI.esc(ind.name)}</h1>
        <div class="mono" style="font-size:13px;color:var(--brass-2);letter-spacing:.06em;margin-top:4px">${UI.esc(ind.vi)}</div>
        <p class="muted" style="max-width:62ch;margin-top:8px">${UI.esc(ind.tagline)}</p>
      </div>
      <div class="grid" style="grid-template-columns:repeat(2,minmax(150px,1fr));gap:10px">
        ${UI.statBox("Chỉ số ngành", ind.driver.split(" · ")[0], ind.driver)}
        ${UI.statBox("Mission", p.done+"/"+p.total, cos.length+" doanh nghiệp")}
      </div>
    </div>
    ${locked?'<div class="empty" style="margin-top:22px">Khu vực này cần cấp '+UI.esc(State.levels[ind.unlock-1].n)+' trở lên. Hoàn thành thêm mission để mở.</div>':''}
  </section>

  <section class="sec">
    ${UI.secHead("Company Buildings","Doanh nghiệp trong khu vực","bấm để mở hồ sơ")}
    <div class="blocks">
      ${cos.map(c=>`<a class="block" href="#/company/${c.id}">
        <div class="b-h">
          <div class="b-logo">${UI.esc(UI.initials(c.name))}</div>
          <div><div class="b-n">${UI.esc(c.name)}</div><div class="b-m">${UI.esc(c.country)}${c.ticker?' · '+UI.esc(c.ticker):''}</div></div>
        </div>
        <div class="b-b">${UI.esc(c.oneLiner.slice(0,110))}${c.oneLiner.length>110?'…':''}</div>
        <div class="b-f">${(c.models||[]).slice(0,2).map(m=>{const M=window.MODEL_BY_ID[m]||{};return '<span class="tag brass">'+UI.esc(M.name||m)+'</span>'}).join("")}
          ${c.cases&&c.cases.length?'<span class="tag brass">'+c.cases.length+' case</span>':''}</div>
      </a>`).join("")}
    </div>
  </section>

  ${cases.length?`<section class="sec">
    ${UI.secHead("Missions","Case của ngành này","")}
    <div class="missions">${cases.map(UI.missionCard).join("")}</div>
  </section>`:''}
</div>`;
};

window.VIEWS.notfound = function(){
  return '<div class="wrap"><div class="sec"><div class="empty">Không tìm thấy khu vực này. <a href="#/map" style="color:var(--brass-2)">Quay lại bản đồ</a></div></div></div>';
};
