/* ===== STRATLAB — UI helpers ===== */
(function(){
const UI = {};

UI.esc = s => String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

UI.toast = function(kicker, text){
  const d = document.createElement("div");
  d.className = "toast";
  d.innerHTML = '<span class="t-k">'+UI.esc(kicker)+'</span>'+UI.esc(text||"");
  document.body.appendChild(d);
  setTimeout(()=>{ d.style.transition="opacity .3s"; d.style.opacity="0"; setTimeout(()=>d.remove(),320) }, 2400);
};

/* song ngữ: EN là thuật ngữ cần học, VI là nghĩa */
UI.bi    = (en,vi) => '<span class="bi"><b>'+UI.esc(en)+'</b><i>'+UI.esc(vi)+'</i></span>';
UI.gloss = (en,vi) => UI.esc(en)+' <span class="gloss">· '+UI.esc(vi)+'</span>';

UI.diffTag = d => '<span class="tag d-'+d+'">'+UI.gloss(d, (VI.diff[d]||d))+'</span>';
UI.typeTag = t => '<span class="tag">'+UI.gloss(t, (VI.type[t]||t))+'</span>';
UI.dimLabel = k => (VI.dimEn[k]||k)+' · '+(VI.dim[k]||'');

UI.flagOf = c => c && c.country==="VN" ? '<span class="tag brass">VN</span>' : (c?'<span class="tag">'+UI.esc(c.country)+'</span>':'');

UI.initials = name => name.split(/\s+/).slice(0,2).map(w=>w[0]).join("").toUpperCase();

UI.industryName = id => (window.INDUSTRY_BY_ID[id]||{}).name || id;
UI.industryVi   = id => (window.INDUSTRY_BY_ID[id]||{}).vi || "";
UI.industryTag  = id => '<span class="tag">'+UI.gloss(UI.industryName(id), UI.industryVi(id))+'</span>';

UI.crumb = function(parts){
  return '<div class="crumb wrap">'+parts.map((p,i)=>
    (p.href? '<a href="'+p.href+'">'+UI.esc(p.t)+'</a>' : UI.esc(p.t)) + (i<parts.length-1?' &nbsp;/&nbsp; ':'')
  ).join("")+'</div>';
};

// secHead(tiêu đề tiếng Anh, nghĩa tiếng Việt, ghi chú phụ)
UI.secHead = (en, vi, note) =>
  '<div class="sec-head"><h2>'+UI.esc(en)+'</h2>'+
  (vi?'<span class="vi">'+UI.esc(vi)+'</span>':'')+
  '<div class="spacer"></div>'+(note?'<span class="sec-note">'+UI.esc(note)+'</span>':'')+'</div>';

UI.hud = function(){
  const S = State.get(), lv = State.level(), nx = State.nextLevel();
  const pct = Math.round(State.levelProgress()*100);
  document.getElementById("hud").innerHTML =
    '<div class="hud-i"><span class="hud-k">Rank · Cấp bậc</span><span class="hud-v brass" title="'+UI.esc(lv.vi||"")+'">Lv.'+UI.esc(lv.lvl)+' '+UI.esc(lv.n)+'</span></div>'+
    '<div class="hud-i"><span class="hud-k">XP · Điểm</span><span class="hud-v">'+S.xp+(nx?' / '+nx.xp:'')+'</span></div>'+
    '<div class="hud-i"><span class="hud-k">Streak · Chuỗi</span><span class="hud-v" style="color:var(--color-accent)">🔥 '+(S.streak.cur||0)+' ngày</span></div>'+
    '<div class="hud-i"><span class="hud-k">Cases · Đã giải</span><span class="hud-v">'+Object.values(S.cases).filter(c=>c.done).length+'/'+window.CASES.length+'</span></div>';
  if(nx) document.getElementById("hud").firstChild.title = pct+"% tới "+nx.n;
  const av = document.getElementById("avatar");
  if(av){ av.textContent = lv.n.slice(0,2).toUpperCase(); av.title = lv.n+" · "+(lv.vi||""); }
};

UI.missionCard = function(cs){
  const st = State.get().cases[cs.id];
  const co = window.COMPANY_BY_ID[cs.company];
  const locked = !State.isUnlocked(cs);
  return '<div class="mission'+(locked?' locked':'')+'">'+
    (st&&st.done?'<div class="m-done">CLEARED '+st.score+'</div>':'')+
    '<div class="m-h"><span class="m-co">'+UI.esc(co?co.name:UI.industryName(cs.industry))+'</span>'+UI.diffTag(cs.difficulty)+'</div>'+
    '<div class="m-b"><div class="m-t">'+UI.esc(cs.title)+'</div><div class="m-d">'+UI.esc(cs.hook)+'</div>'+
      '<div style="margin-top:12px;display:flex;gap:6px;flex-wrap:wrap">'+UI.typeTag(cs.type)+UI.industryTag(cs.industry)+
      (cs.endings?'<span class="tag gold">'+Object.keys(cs.endings).length+' endings · nhiều kết cục</span>':'')+
      (cs.steps.some(s=>s.kind==="tree")?'<span class="tag brass">issue tree · cây vấn đề</span>':'')+
      '</div></div>'+
    '<div class="m-f"><span class="m-meta">'+cs.minutes+' phút · '+cs.xp+' XP</span>'+
      (locked
        ? '<span class="m-meta">Cần cấp '+UI.esc(State.levels[cs.level].n)+'</span>'
        : '<a class="btn btn-sm '+(st&&st.done?'':'btn-primary')+'" href="#/case/'+cs.id+'">'+(st&&st.done?'Chơi lại':(st&&Object.keys(st.steps||{}).length?'Tiếp tục':'Nhận mission'))+'</a>')+
    '</div></div>';
};

UI.statBox = (k,v,n,cls) => '<div class="stat"><div class="s-k">'+UI.esc(k)+'</div><div class="s-v '+(cls||'')+'">'+UI.esc(v)+'</div>'+(n?'<div class="s-n">'+UI.esc(n)+'</div>':'')+'</div>';

UI.kv = (k,v) => '<div class="kv"><span class="k">'+UI.esc(k)+'</span><span class="v">'+UI.esc(v)+'</span></div>';

UI.panel = (title, body, right) =>
  '<div class="panel"><div class="panel-h"><b>'+UI.esc(title)+'</b><div style="flex:1"></div>'+(right||'')+'</div><div class="panel-b">'+body+'</div></div>';

UI.bullets = arr => '<ul class="bullets">'+arr.map(b=>'<li>'+UI.esc(b)+'</li>').join("")+'</ul>';

window.UI = UI;
})();
