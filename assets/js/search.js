/* ===== TÌM KIẾM TOÀN CỤC =====
   Gõ không dấu vẫn ra kết quả có dấu: "ngan hang" → "Ngân hàng". */
(function(){
const S = { open:false, q:"", sel:0, results:[], index:null };

function deaccent(str){
  return String(str||"").toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g,"")
    .replace(/đ/g,"d");
}

function build(){
  const ix = [];
  const push = (o)=>{ o.hay = deaccent([o.title,o.vi,o.sub,(o.tags||[]).join(" ")].join(" ")); ix.push(o) };

  window.CASES.forEach(c=>{
    const co = window.COMPANY_BY_ID[c.company];
    push({type:"case", kind:"Case", title:c.title, vi:c.hook,
      sub:(co?co.name+" · ":"")+c.type+" · "+c.difficulty, href:"#/case/"+c.id,
      tags:[c.type, VI.type[c.type], c.industry, UI.industryName(c.industry), UI.industryVi(c.industry), co?co.name:""]});
  });
  window.COMPANIES.forEach(c=>{
    push({type:"company", kind:"Doanh nghiệp", title:c.name, vi:c.oneLiner,
      sub:UI.industryName(c.industry)+" · "+UI.industryVi(c.industry)+" · "+c.country, href:"#/company/"+c.id,
      tags:[c.ticker||"", c.country, UI.industryName(c.industry), UI.industryVi(c.industry)].concat((c.models||[]).map(m=>(window.MODEL_BY_ID[m]||{}).name||""))});
  });
  window.LESSONS.forEach(l=>{
    const m = window.MODULE_BY_ID[l.module];
    push({type:"lesson", kind:"Bài học", title:l.title, vi:l.vi,
      sub:(m?m.name+" · "+m.vi:"")+" · "+l.minutes+" phút", href:"#/lesson/"+l.id,
      tags:(l.terms||[]).flatMap(t=>[t.en,t.vi]).concat([m?m.name:"", m?m.vi:""])});
  });
  window.MODELS.forEach(m=>{
    push({type:"model", kind:"Mô hình", title:m.name, vi:m.vi,
      sub:m.formula, href:"#/model/"+m.id, tags:[m.short]});
  });
  window.BATTLES.forEach(b=>{
    const A=window.COMPANY_BY_ID[b.a], B=window.COMPANY_BY_ID[b.b];
    push({type:"battle", kind:"Battle", title:A.name+" vs "+B.name, vi:b.headline,
      sub:"So sánh doanh nghiệp", href:"#/battle/"+b.id, tags:[A.name,B.name]});
  });
  window.INDUSTRIES.forEach(i=>{
    push({type:"district", kind:"Ngành", title:i.name, vi:i.vi,
      sub:i.tagline, href:"#/district/"+i.id, tags:[i.driver]});
  });
  window.MODULES.filter(m=>m.status==="ready").forEach(m=>{
    push({type:"module", kind:"Module", title:m.name, vi:m.vi,
      sub:m.goal||"", href:"#/track/"+m.track, tags:[(window.TRACK_BY_ID[m.track]||{}).name||""]});
  });
  return ix;
}

function search(q){
  if(!S.index) S.index = build();
  const needle = deaccent(q).trim();
  if(!needle) return [];
  const words = needle.split(/\s+/).filter(Boolean);
  const out = [];
  // khớp trọn từ mạnh hơn nhiều so với khớp chuỗi con — nếu không, "ban le" sẽ ăn cả "Banking" và "bán thẻ"
  const whole = w => new RegExp("(^|[^a-z0-9])"+w.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"([^a-z0-9]|$)");
  S.index.forEach(it=>{
    let score = 0, all = true;
    const T = deaccent(it.title), V = deaccent(it.vi||"");
    words.forEach(w=>{
      const at = it.hay.indexOf(w);
      if(at < 0){ all = false; return }
      const re = whole(w);
      const wholeHit = re.test(it.hay);
      score += wholeHit ? 30 : (w.length>=5 ? 10 : 2);   // từ ngắn khớp chuỗi con gần như không tính điểm
      if(re.test(T)) score += T.indexOf(w)===0 ? 60 : 35;
      else if(re.test(V)) score += 18;
      else if(T.indexOf(w) >= 0) score += 6;
    });
    // khớp nguyên cụm là tín hiệu mạnh nhất: "ban le" → "bán lẻ"
    if(words.length>1 && it.hay.indexOf(needle) >= 0){
      score += 80;
      if(deaccent(it.title).indexOf(needle) >= 0) score += 60;
    }
    if(all) out.push({it, score});
  });
  const order = {case:0, lesson:1, company:2, model:3, module:4, battle:5, district:6};
  return out.sort((a,b)=> b.score-a.score || order[a.it.type]-order[b.it.type]).slice(0,12).map(x=>x.it);
}

S.render = function(){
  const el = document.getElementById("searchOverlay");
  if(!el) return;
  el.innerHTML = `
    <div class="sr-box" onclick="event.stopPropagation()">
      <div class="sr-input">
        <span class="sr-icon">⌕</span>
        <input id="searchInput" type="text" autocomplete="off" spellcheck="false"
               placeholder="Tìm case, doanh nghiệp, bài học, mô hình… (gõ không dấu cũng được)"
               value="${UI.esc(S.q)}">
        <span class="sr-esc">ESC</span>
      </div>
      <div class="sr-results">
        ${!S.q.trim()
          ? `<div class="sr-hint">
              <div class="sr-hint-t">Thử tìm</div>
              ${["lợi nhuận","ngan hang","vinamilk","marketplace","hoa von","cash flow"].map(x=>
                `<button class="chip" onclick="SEARCH.setQuery('${x}')">${UI.esc(x)}</button>`).join("")}
             </div>`
          : (S.results.length
            ? S.results.map((r,i)=>`
              <a class="sr-item ${i===S.sel?'on':''}" href="${r.href}" onclick="SEARCH.close()">
                <span class="sr-kind sr-${r.type}">${UI.esc(r.kind)}</span>
                <span class="sr-body">
                  <span class="sr-t">${UI.esc(r.title)}</span>
                  ${r.vi?`<span class="sr-vi">${UI.esc(String(r.vi).slice(0,110))}${String(r.vi).length>110?'…':''}</span>`:''}
                </span>
                <span class="sr-sub">${UI.esc(r.sub||"")}</span>
              </a>`).join("")
            : `<div class="sr-empty">Không tìm thấy gì cho “${UI.esc(S.q)}”</div>`)}
      </div>
      <div class="sr-foot"><span>↑↓ di chuyển</span><span>↵ mở</span><span>ESC đóng</span>
        <span style="flex:1"></span><span>${S.index?S.index.length:0} mục</span></div>
    </div>`;
  const inp = document.getElementById("searchInput");
  if(inp){ inp.focus(); inp.setSelectionRange(inp.value.length, inp.value.length);
    inp.oninput = e => { S.q = e.target.value; S.results = search(S.q); S.sel = 0; S.render() }; }
};

S.setQuery = function(q){ S.q=q; S.results=search(q); S.sel=0; S.render() };
S.open_ = function(){
  if(S.open) return;
  S.open = true; S.sel = 0; S.results = search(S.q);
  const d = document.createElement("div");
  d.id = "searchOverlay"; d.className = "sr-overlay";
  d.onclick = S.close;
  document.body.appendChild(d);
  document.body.style.overflow = "hidden";
  S.render();
};
S.close = function(){
  S.open = false;
  const el = document.getElementById("searchOverlay"); if(el) el.remove();
  document.body.style.overflow = "";
};
S.toggle = function(){ S.open ? S.close() : S.open_() };

document.addEventListener("keydown", function(e){
  const typing = /^(INPUT|TEXTAREA|SELECT)$/.test((e.target.tagName||"")) ;
  if((e.key==="k"||e.key==="K") && (e.metaKey||e.ctrlKey)){ e.preventDefault(); S.toggle(); return }
  if(e.key==="/" && !typing && !S.open){ e.preventDefault(); S.open_(); return }
  if(!S.open) return;
  if(e.key==="Escape"){ e.preventDefault(); S.close(); return }
  if(e.key==="ArrowDown"){ e.preventDefault(); S.sel=Math.min(S.sel+1, Math.max(0,S.results.length-1)); S.render(); return }
  if(e.key==="ArrowUp"){ e.preventDefault(); S.sel=Math.max(0, S.sel-1); S.render(); return }
  if(e.key==="Enter" && S.results[S.sel]){ e.preventDefault(); const h=S.results[S.sel].href; S.close(); location.hash=h; return }
});

window.SEARCH = S;
})();
