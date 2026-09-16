window.VIEWS.models = function(){
  const S = State.get();
  return `<div class="wrap"><section class="sec">
    <h1 style="font-size:34px">Business Model Explorer</h1>
    <p class="muted" style="max-width:66ch;margin-top:10px">Mười hai cách kiếm tiền. Mỗi mô hình có một công thức, một bộ chỉ số đơn vị, và một kiểu thất bại riêng. Hiểu mô hình trước, rồi mới hiểu doanh nghiệp.</p>
    <div class="grid g3" style="margin-top:26px">
      ${window.MODELS.map(m=>`<a class="model-card" href="#/model/${m.id}">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px">
          <div class="mc-n">${UI.esc(m.name)}</div><div class="mono" style="font-size:10.5px;color:var(--dim-2);margin-top:2px">${UI.esc(m.vi||"")}</div>
          ${S.models[m.id]?'<span class="tag pos">đã khám phá</span>':'<span class="tag">+40 XP</span>'}
        </div>
        <div class="mc-f">${UI.esc(m.formula)}</div>
        <div class="mc-d">${UI.esc(m.short)}</div>
        <div class="mc-e">${m.examples.map(e=>(window.COMPANY_BY_ID[e]||{}).name).filter(Boolean).join(" · ")}</div>
      </a>`).join("")}
    </div>
  </section></div>`;
};

(function(){
const Q = { m:null, sel:[], revealed:false };
Q.toggle = function(i){ if(Q.revealed) return; const k=Q.sel.indexOf(i); if(k>=0)Q.sel.splice(k,1); else Q.sel.push(i); Q.rerender() };
Q.check = function(){
  if(!Q.sel.length){ UI.toast("CHƯA CHỌN","Chọn ít nhất một nguồn doanh thu"); return }
  Q.revealed = true;
  const q = Q.m.quiz;
  const ok = Q.sel.filter(i=>q.options[i].ok).length;
  const bad = Q.sel.length - ok;
  const total = q.options.filter(o=>o.ok).length;
  const sc = Math.max(0, Math.min(1,(ok-bad*0.5)/total));
  State.modelExplored(Q.m.id);
  if(sc>=0.8) State.addXp(30,"Đọc đúng mô hình doanh thu");
  Q.rerender();
};
Q.rerender = function(){ document.getElementById("app").innerHTML = VIEWS.model(Q.m.id, true) };
window.MODELQ = Q;

window.VIEWS.model = function(id, keep){
  const m = window.MODEL_BY_ID[id];
  if(!m) return VIEWS.notfound();
  if(!keep || !Q.m || Q.m.id!==id){ Q.m = m; Q.sel=[]; Q.revealed=false }

  const q = m.quiz;
  const quizHtml = `<div class="opts">${q.options.map((o,i)=>{
    let cls="opt";
    const chosen = Q.sel.includes(i);
    if(!Q.revealed && chosen) cls+=" sel";
    if(Q.revealed){ cls+=" disabled"; if(o.ok) cls+=" right"; else if(chosen) cls+=" wrong" }
    return `<div class="${cls}" onclick="${Q.revealed?'':'MODELQ.toggle('+i+')'}">
      <span class="o-k">${String.fromCharCode(65+i)}</span>
      <span class="o-t">${UI.esc(o.t)}${Q.revealed?'<span class="o-note">'+UI.esc(o.why)+'</span>':''}</span></div>`;
  }).join("")}</div>
  <div class="pl-actions">${Q.revealed
    ? '<a class="btn btn-primary" href="#/models">Mô hình khác</a>'
    : '<button class="btn btn-primary" onclick="MODELQ.check()">Xem đáp án</button>'}</div>`;

  return UI.crumb([{t:"Business Models",href:"#/models"},{t:m.name}])+`
<div class="wrap">
  <section class="sec" style="padding-top:14px">
    <h1 style="font-size:44px">${UI.esc(m.name)}</h1>
    <div class="mono" style="font-size:13px;color:var(--dim);margin-top:6px">${UI.esc(m.vi||"")}</div>
    <div class="mono" style="color:var(--brass-2);font-size:14px;letter-spacing:.06em;margin-top:8px">${UI.esc(m.formula)}</div>
    <p class="muted" style="max-width:66ch;margin-top:14px;font-size:16px">${UI.esc(m.short)}</p>
  </section>

  <section class="sec">
    <div class="grid g2">
      ${UI.panel("How it makes money · Cách kiếm tiền", UI.bullets(m.how))}
      ${UI.panel("Unit economics · Chỉ số phải nhìn", m.unit.map(u=>UI.kv(u.k,u.v)).join(""))}
    </div>
  </section>

  <section class="sec">
    <div class="grid g2">
      ${UI.panel("Strengths · Điểm mạnh", UI.bullets(m.strengths))}
      ${UI.panel("Risks · Rủi ro", UI.bullets(m.risks))}
    </div>
  </section>

  <section class="sec">
    ${UI.panel("When it fails · Khi nào mô hình này thất bại", UI.bullets(m.fail))}
  </section>

  <section class="sec">
    ${UI.secHead("Examples","Doanh nghiệp tiêu biểu","")}
    <div class="blocks">
      ${m.examples.map(e=>{const c=window.COMPANY_BY_ID[e]; if(!c) return "";
        return `<a class="block" href="#/company/${c.id}">
          <div class="b-h"><div class="b-logo">${UI.esc(UI.initials(c.name))}</div>
          <div><div class="b-n">${UI.esc(c.name)}</div><div class="b-m">${UI.esc(UI.industryName(c.industry))}</div></div></div>
          <div class="b-b">${UI.esc(c.oneLiner.slice(0,110))}…</div></a>`}).join("")}
    </div>
  </section>

  <section class="sec">
    ${UI.secHead("Mini Case","Thử trước khi xem đáp án",q.company)}
    <div class="panel"><div class="panel-b">
      <div class="pl-q" style="font-size:20px">${UI.esc(q.q)}</div>
      ${quizHtml}
    </div></div>
  </section>
</div>`;
};
})();
