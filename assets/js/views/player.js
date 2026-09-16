/* ===== CASE PLAYER ENGINE ===== */
(function(){
const P = { cs:null, idx:0, res:[], sel:null, multi:[], open:[], order:null, revealed:false, hint:false, usedHint:false, calcTry:0 };
const DIM_LABEL = new Proxy({}, {get:(_,k)=> (window.VI && VI.dimEn[k]) || String(k)});
const DIM_VI    = new Proxy({}, {get:(_,k)=> (window.VI && VI.dim[k]) || ""});

function parseNum(raw){
  let t = raw.trim().replace(/\s/g,"");
  if(!t) return NaN;
  const hasDot = t.indexOf(".")>=0, hasComma = t.indexOf(",")>=0;
  if(hasDot && hasComma){                       // 1.234,5  hoặc 1,234.5
    t = (t.lastIndexOf(",") > t.lastIndexOf("."))
      ? t.replace(/\./g,"").replace(",",".")
      : t.replace(/,/g,"");
  } else if(hasComma){                          // 12,5 -> thập phân
    t = t.replace(/,/g,".");
  } else if(hasDot){
    const parts = t.split(".");
    // 1.234.567 -> phân cách nghìn; 12.5 -> thập phân
    if(parts.length>2 || (parts[1] && parts[1].length===3)) t = parts.join("");
  }
  return parseFloat(t);
}
function step(){ return P.cs.steps[P.idx] }
function resetStep(){ P.sel=null; P.multi=[]; P.open=[]; P.order=null; P.revealed=false; P.hint=false; P.calcTry=0;
  const s = step();
  if(s && s.kind==="rank") P.order = s.items.map(x=>x.id);
}

P.start = function(cs, timed){
  P.cs = cs; P.idx = 0; P.res = []; P.usedHint = false; P.ending = null;
  P.timed = !!timed; P.t0 = Date.now();
  const saved = State.get().cases[cs.id];
  if(saved && !saved.done && saved.steps && saved.steps.progress && saved.steps.progress.idx>0 && saved.steps.progress.idx<cs.steps.length){
    P.idx = saved.steps.progress.idx; P.res = saved.steps.progress.res||[]; P.usedHint = !!saved.steps.progress.usedHint;
    P.ending = saved.steps.progress.ending||null;
    if(timed && saved.steps.progress.t0) P.t0 = saved.steps.progress.t0;
  }
  resetStep();
};

P.elapsed = function(){ return Math.max(0, Math.round((Date.now()-P.t0)/1000)) };
P.limit   = function(){ return (P.cs.minutes||10)*60 };
function mmss(n){ const m=Math.floor(Math.abs(n)/60), s=Math.abs(n)%60; return (n<0?"-":"")+m+":"+String(s).padStart(2,"0") }
P.tick = function(){
  const el = document.getElementById("clock");
  if(!el){ clearInterval(window.__plTimer); window.__plTimer=null; return }
  const left = P.limit() - P.elapsed();
  el.textContent = mmss(left);
  el.style.color = left<0 ? "var(--neg)" : (left<60 ? "var(--warn)" : "var(--brass-2)");
  const note = document.getElementById("clockNote");
  if(note) note.textContent = left<0 ? "quá giờ — điểm Speed đang giảm" : "còn lại";
};
P.startClock = function(){
  if(window.__plTimer) clearInterval(window.__plTimer);
  if(!P.timed) return;
  window.__plTimer = setInterval(P.tick, 1000);
  P.tick();
};

P.rerender = function(){
  document.getElementById("app").innerHTML = P.render();
  const inp = document.getElementById("calcInput"); if(inp) inp.focus();
  P.startClock();
};

/* ---------- interactions ---------- */
P.pick = function(i){ if(P.revealed) return; P.sel = i; P.rerender() };
P.toggle = function(i){ if(P.revealed) return;
  const k = P.multi.indexOf(i); if(k>=0) P.multi.splice(k,1); else P.multi.push(i); P.rerender() };
P.openTile = function(i){
  const s = step(); if(P.revealed) return;
  if(P.open.includes(i)) return;
  if(P.open.length >= s.budget) { UI.toast("HẾT LƯỢT","Bạn đã dùng hết "+s.budget+" lượt mở dữ liệu"); return }
  P.open.push(i);
  if(P.open.length >= s.budget) P.revealed = true;
  P.rerender();
};
P.move = function(id,dir){
  const a = P.order, i = a.indexOf(id), j = i+dir;
  if(j<0||j>=a.length) return;
  a[i]=a[j]; a[j]=id; P.rerender();
};
P.hintOn = function(){ P.hint=true; P.usedHint=true; State.usedHint(); P.rerender() };

P.submit = function(){
  const s = step();
  let score = 0;
  if(s.kind==="multi" || s.kind==="tree"){
    if(!P.multi.length) return;
    const ok = P.multi.filter(i=>s.options[i].ok).length;
    const bad = P.multi.length - ok;
    score = Math.max(0, (ok - bad*0.5) / s.need);
    score = Math.min(1, score);
  } else if(s.kind==="mcq" || s.kind==="recommend"){
    if(P.sel===null) return;
    score = s.options[P.sel].ok ? 1 : 0;
  } else if(s.kind==="decision"){
    if(P.sel===null) return;
    score = s.options[P.sel].score!=null ? s.options[P.sel].score : (s.options[P.sel].ok?1:0);
  } else if(s.kind==="calc"){
    const v = parseNum(String((document.getElementById("calcInput")||{}).value||""));
    if(isNaN(v)) { UI.toast("THIẾU SỐ","Nhập một con số trước khi xác nhận"); return }
    const ok = Math.abs(v - s.answer) <= s.tol;
    P.calcTry++;
    if(!ok && P.calcTry<2){ UI.toast("CHƯA ĐÚNG","Còn 1 lần thử. Kiểm tra lại đơn vị."); P.rerender(); return }
    score = ok ? (P.calcTry===1?1:0.6) : 0;
    State.calcResult(ok);
    P.userCalc = v;
  } else if(s.kind==="datalab"){
    const useful = P.open.filter(i=>s.tiles[i].useful).length;
    const maxUse = Math.min(s.budget, s.tiles.filter(t=>t.useful).length);
    score = maxUse? useful/maxUse : 0;
  } else if(s.kind==="rank"){
    const correct = s.order;
    let hit=0; P.order.forEach((id,i)=>{ if(correct[i]===id) hit++ });
    score = hit/correct.length;
  }
  if(P.hint) score = score*0.75;
  P.revealed = true;
  P.pendingScore = score;
  P.rerender();
};

P.next = function(){
  const s = step();
  if(s.options && P.sel!==null && s.options[P.sel] && s.options[P.sel].ending) P.ending = s.options[P.sel].ending;
  P.res[P.idx] = {kind:s.kind, dim:s.dim, score:P.pendingScore||0, xp:Math.round((s.xp||0)*(P.pendingScore||0)),
                  sel:P.sel, multi:P.multi.slice(), open:P.open.slice(), order:P.order?P.order.slice():null, calc:P.userCalc};
  const earned = P.res[P.idx].xp;
  if(earned) State.addXp(earned, "Bước "+(P.idx+1));
  P.pendingScore = 0; P.userCalc = undefined;
  P.idx++;
  const cst = State.caseState(P.cs.id);
  cst.steps.progress = {idx:P.idx, res:P.res, usedHint:P.usedHint, ending:P.ending, t0:P.timed?P.t0:null};
  State.save();
  if(P.idx >= P.cs.steps.length){ P.complete(); return }
  resetStep();
  window.scrollTo(0,0);
  P.rerender();
};

P.complete = function(){
  const dims = {};
  P.cs.steps.forEach((s,i)=>{
    const d = s.dim||"insight";
    dims[d] = dims[d] || {got:0,max:0};
    dims[d].got += (P.res[i]?P.res[i].score:0) * (s.xp||1);
    dims[d].max += (s.xp||1);
  });
  let got=0,max=0;
  Object.values(dims).forEach(v=>{got+=v.got;max+=v.max});
  const score = Math.round(max? got/max*100 : 0);
  const first = State.finishCase(P.cs.id, score, Object.fromEntries(Object.entries(dims).map(([k,v])=>[k,Math.round(v.max?v.got/v.max*100:0)])), P.usedHint);
  if(P.cs.endings){
    const cs0 = State.caseState(P.cs.id);
    cs0.ending = P.ending || P.cs.defaultEnding || null;
    cs0.endingsSeen = cs0.endingsSeen || [];
    if(cs0.ending && cs0.endingsSeen.indexOf(cs0.ending)<0) cs0.endingsSeen.push(cs0.ending);
  }
  const cst = State.caseState(P.cs.id); cst.steps.progress = null; State.save();
  State.checkBadges();
  let bonus = 0;
  if(first){ bonus = Math.round(P.cs.xp*0.3*(score/100)); if(!P.usedHint) bonus += Math.round(P.cs.xp*0.15) }
  if(bonus) State.addXp(bonus, "Hoàn thành mission");
  if(P.timed){
    const flat = Object.fromEntries(Object.entries(dims).map(([k,v])=>[k,Math.round(v.max?v.got/v.max*100:0)]));
    P.dailyRow = State.finishDaily(P.cs.id, P.elapsed(), flat);
  }
  if(window.__plTimer){ clearInterval(window.__plTimer); window.__plTimer=null }
  P.finalScore = score; P.finalDims = dims; P.bonus = bonus;
  window.scrollTo(0,0);
  location.hash = "#/review/"+P.cs.id;
};

/* ---------- rendering ---------- */
function rail(){
  return `<aside class="pl-rail">
    <div class="r-h">Mission steps · Các bước</div>
    <ul class="step-list">
      ${P.cs.steps.map((s,i)=>`<li class="${i===P.idx?'on':''}${i<P.idx?' done':''}">
        <span class="n">${i<P.idx?'✓':(i+1)}</span>
        <span>${UI.esc((s.prompt||"Bước "+(i+1)).replace(/^Bước \d+ — /,""))}<br>
        <span class="mono" style="font-size:10px;color:var(--dim-2)">${UI.esc(DIM_LABEL[s.dim])} · ${UI.esc(DIM_VI[s.dim])}</span></span>
      </li>`).join("")}
    </ul>
    <div class="r-h" style="padding-top:22px">Case facts · Dữ kiện đầu bài</div>
    <div style="padding:0 20px">
      ${P.cs.brief.facts.map(f=>UI.kv(f.k,f.v)).join("")}
    </div>
  </aside>`;
}

function optionsBlock(s, mode){
  return '<div class="opts">'+s.options.map((o,i)=>{
    let cls="opt";
    const chosen = mode==="multi" ? P.multi.includes(i) : P.sel===i;
    if(!P.revealed && chosen) cls+=" sel";
    if(P.revealed){
      cls+=" disabled";
      const good = mode==="decision" ? (o.score!=null? o.score>=0.9 : o.ok) : o.ok;
      if(good) cls+=" right";
      else if(chosen) cls+=" wrong";
    }
    const key = String.fromCharCode(65+i);
    const handler = mode==="multi" ? 'PLAYER.toggle('+i+')' : 'PLAYER.pick('+i+')';
    return `<div class="${cls}" onclick="${P.revealed?'':handler}">
      <span class="o-k">${key}</span>
      <span class="o-t">${UI.esc(o.t)}
        ${P.revealed&&o.why?'<span class="o-note">'+UI.esc(o.why)+'</span>':''}
      </span></div>`;
  }).join("")+'</div>';
}

function body(){
  const s = step();
  let h = "";
  h += `<div class="pl-prompt">${UI.esc(s.prompt||("Bước "+(P.idx+1)))}</div>`;
  h += `<div class="pl-q">${UI.esc(s.question)}</div>`;
  if(s.note) h += `<div class="pl-sub">${UI.esc(s.note)}</div>`;

  if(s.kind==="multi"){
    h += optionsBlock(s,"multi");
    h += `<div class="mono" style="font-size:11px;color:var(--dim);margin-top:12px">Đã chọn ${P.multi.length}/${s.need}</div>`;
  }
  else if(s.kind==="tree"){
    h += `<div class="tree" style="margin-bottom:18px">
      <div class="tree-root">${UI.esc(s.root)}</div>
      <div class="tree-lvl">${
        P.revealed
        ? s.options.filter(o=>o.ok).map(o=>`<div class="tree-node" style="border-color:#2A5540">${UI.esc(o.t)}${
            o.sub? '<span class="tn-sub">'+o.sub.map(x=>'└ '+UI.esc(x)).join("<br>")+'</span>':''}</div>`).join("")
        : (P.multi.length
            ? P.multi.map(i=>`<div class="tree-node">${UI.esc(s.options[i].t)}</div>`).join("")
            : '<div class="tree-node" style="border-style:dashed;color:var(--dim-2)">chưa có nhánh nào — chọn bên dưới</div>')
      }</div>
    </div>`;
    h += optionsBlock(s,"multi");
    h += `<div class="mono" style="font-size:11px;color:var(--dim);margin-top:12px">Đã gắn ${P.multi.length}/${s.need} nhánh vào cây</div>`;
  }
  else if(s.kind==="mcq" || s.kind==="recommend"){ h += optionsBlock(s,"mcq") }
  else if(s.kind==="decision"){
    h += optionsBlock(s,"decision");
    if(P.revealed && P.sel!==null && s.options[P.sel].consequence){
      h += `<div class="fb ${s.options[P.sel].score>=0.9?'good':'bad'}">
        <div class="fb-h">Hệ quả của quyết định</div><p>${UI.esc(s.options[P.sel].consequence)}</p></div>`;
    }
  }
  else if(s.kind==="calc"){
    h += `<div class="calcbox">
      <input id="calcInput" type="text" inputmode="decimal" placeholder="0" ${P.revealed?'disabled':''} value="${P.userCalc!=null?P.userCalc:''}">
      <span class="unit">${UI.esc(s.unit)}</span>
      ${P.calcTry===1&&!P.revealed?'<span class="unit" style="color:var(--neg)">Sai — còn 1 lần thử</span>':''}
    </div>`;
    if(P.hint && s.hint) h += `<div class="hintbox"><b class="mono" style="font-size:10px;letter-spacing:.13em">GỢI Ý</b><br>${UI.esc(s.hint)}</div>`;
    if(P.revealed){
      h += `<div class="scratch"><div class="sc-h">Cách tính</div>${s.working.map(w=>'<div class="row"><span>'+UI.esc(w.k)+'</span><span>'+UI.esc(w.v)+'</span></div>').join("")}</div>`;
    }
  }
  else if(s.kind==="datalab"){
    h += `<div class="mono" style="font-size:11px;color:var(--brass);margin-bottom:14px">Lượt mở dữ liệu: ${P.open.length}/${s.budget}</div>`;
    h += '<div class="datalab">'+s.tiles.map((t,i)=>{
      const open = P.open.includes(i) || P.revealed;
      if(!open) return `<div class="dt" onclick="PLAYER.openTile(${i})"><div class="dt-k">${UI.esc(t.k)}</div><div class="dt-lock">■ Chưa mở — bấm để giải mã</div></div>`;
      const bodyHtml = Array.isArray(t.body)? t.body.map(r=>UI.kv(r.k,r.v)).join("") : '<div class="dt-body">'+UI.esc(t.body)+'</div>';
      return `<div class="dt open ${t.useful?'':'noise'}"><div class="dt-k">${UI.esc(t.k)} ${t.useful?'':'<span class="tag" style="margin-left:4px">ít liên quan</span>'}</div>
        <div class="dt-body">${bodyHtml}</div>
        ${P.revealed?'<div class="mono" style="font-size:11px;color:var(--dim);margin-top:9px;border-top:1px dashed var(--line);padding-top:8px">'+UI.esc(t.why)+'</div>':''}</div>`;
    }).join("")+'</div>';
  }
  else if(s.kind==="rank"){
    h += '<div class="ranklist">'+P.order.map((id,i)=>{
      const it = s.items.find(x=>x.id===id);
      let cls="rank-item";
      if(P.revealed) cls += (s.order[i]===id? "" : "");
      return `<div class="${cls}" style="${P.revealed?(s.order[i]===id?'border-color:#2A5540;background:#0C1712':'border-color:#4C2822;background:#170C0A'):''}">
        <span class="r-n">${i+1}</span><span class="r-t">${UI.esc(it.t)}</span>
        ${P.revealed?'':`<span class="r-ctl"><button onclick="PLAYER.move('${id}',-1)">↑</button><button onclick="PLAYER.move('${id}',1)">↓</button></span>`}
      </div>`;
    }).join("")+'</div>';
    if(P.revealed){
      h += '<div class="fb"><div class="fb-h">Thứ tự đúng</div><p>'+s.order.map((id,i)=>(i+1)+". "+UI.esc(s.items.find(x=>x.id===id).t)).join("<br>")+'</p></div>';
    }
  }

  // feedback
  if(P.revealed){
    const sc = P.pendingScore||0;
    const why = s.why || (s.kind==="calc"? s.why : null);
    if(why) h += `<div class="fb ${sc>=0.75?'good':(sc>=0.4?'':'bad')}"><div class="fb-h">Vì sao</div><p>${UI.esc(why)}</p></div>`;
    h += `<div class="fb ${sc>=0.75?'good':(sc>=0.4?'':'bad')}"><div class="fb-h">Điểm bước này</div>
      <p><b style="color:var(--brass-2)">${Math.round(sc*100)}/100</b> · ${DIM_LABEL[s.dim]} · ${DIM_VI[s.dim]} · +${Math.round((s.xp||0)*sc)} XP${P.hint?' (đã trừ 25% vì dùng gợi ý)':''}</p></div>`;
  }

  h += '<div class="pl-actions">';
  if(!P.revealed){
    h += `<button class="btn btn-primary" onclick="PLAYER.submit()">Xác nhận</button>`;
    if(s.hint && s.kind==="calc" && !P.hint) h += `<button class="btn btn-ghost" onclick="PLAYER.hintOn()">Dùng gợi ý (−25% điểm)</button>`;
    if(s.kind==="datalab") h += `<span class="mono" style="font-size:11px;color:var(--dim)">Mở đủ ${s.budget} gói rồi xác nhận</span>`;
  } else {
    h += `<button class="btn btn-primary" onclick="PLAYER.next()">${P.idx+1>=P.cs.steps.length?'Hoàn thành mission':'Bước tiếp theo'}</button>`;
  }
  h += `<a class="btn btn-ghost btn-sm" href="#/cases">Thoát</a>`;
  h += `<span class="kbd-hint">${P.revealed?'<kbd>↵</kbd> tiếp'
        :'<kbd>1</kbd>–<kbd>9</kbd> chọn · <kbd>↵</kbd> xác nhận'+(s.kind==="calc"&&s.hint&&!P.hint?' · <kbd>H</kbd> gợi ý':'')}</span>`;
  h += '</div>';
  return h;
}

P.render = function(){
  const cs = P.cs, co = window.COMPANY_BY_ID[cs.company];
  return UI.crumb([{t:"Missions",href:"#/cases"},{t:cs.type},{t:cs.title}])+`
<div class="wrap" style="padding-bottom:18px">
  <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:16px;flex-wrap:wrap">
    <div>
      <h1 style="font-size:32px">${UI.esc(cs.title)}</h1>
      <div style="display:flex;gap:7px;margin-top:10px;flex-wrap:wrap">
        ${UI.diffTag(cs.difficulty)}${UI.typeTag(cs.type)}
        ${co?'<a class="tag brass" href="#/company/'+co.id+'">'+UI.esc(co.name)+'</a>':''}
        <span class="tag">${cs.minutes} phút</span><span class="tag">${cs.xp} XP</span>
      </div>
    </div>
    <div style="text-align:right">
      ${P.timed?`<div style="font-family:var(--head);font-size:30px;line-height:1" id="clock">${mmss(P.limit()-P.elapsed())}</div>
      <div class="mono" style="font-size:10px;letter-spacing:.12em;color:var(--dim-2);text-transform:uppercase" id="clockNote">còn lại</div>`:''}
      <div class="mono" style="font-size:11px;color:var(--dim);margin-top:${P.timed?'6px':'0'}">Bước ${Math.min(P.idx+1,cs.steps.length)} / ${cs.steps.length}</div>
    </div>
  </div>
  <div class="pl-brief" style="margin-top:18px">
    <div class="mono" style="font-size:10px;letter-spacing:.14em;color:var(--dim-2);text-transform:uppercase;margin-bottom:7px">Situation</div>
    <div class="muted" style="font-size:14.4px">${UI.esc(cs.brief.situation)}</div>
    <div class="mono" style="font-size:10px;letter-spacing:.14em;color:var(--dim-2);text-transform:uppercase;margin:14px 0 7px">Your objective</div>
    <div style="font-size:14.4px">${UI.esc(cs.brief.objective)}</div>
  </div>
</div>
<div class="player">
  ${rail()}
  <div class="pl-main">${body()}</div>
</div>`;
};

window.PLAYER = P;

window.VIEWS.case = function(id){
  const cs = window.CASE_BY_ID[id];
  if(!cs) return VIEWS.notfound();
  if(!State.isUnlocked(cs)){
    return '<div class="wrap"><div class="sec"><div class="empty">Mission này cần cấp <b style="color:var(--brass-2)">'+UI.esc(State.levels[cs.level].n)+'</b>. Hoàn thành thêm case dễ hơn để lên cấp.<br><br><a class="btn btn-sm" href="#/cases">Về mission board</a></div></div></div>';
  }
  P.start(cs);
  const mod = State.moduleForCase(id);
  let banner = "";
  if(mod){
    const mp = State.moduleProgress(mod.id);
    if(!mp.complete){
      const nextL = mod.lessons.find(x=>!State.lessonDone(x));
      banner = `<div class="wrap" style="padding-top:16px"><div class="panel" style="border-left:2px solid var(--color-primary)">
        <div class="panel-h"><b>Recommended first · Nên học trước</b><div style="flex:1"></div>
          <span class="tag brass">${mp.done}/${mp.total} bài</span></div>
        <div class="panel-b" style="display:flex;justify-content:space-between;gap:16px;align-items:center;flex-wrap:wrap">
          <div style="max-width:60ch">
            <div style="font-family:var(--head);font-size:17px;text-transform:uppercase;letter-spacing:.03em">${UI.esc(mod.name)} · ${UI.esc(mod.vi)}</div>
            <div class="muted" style="font-size:13.6px;margin-top:5px">${UI.esc(mod.goal||"")} Case này dùng đúng những công cụ đó — bạn vẫn có thể giải ngay, nhưng học trước sẽ dễ hơn nhiều.</div>
          </div>
          <div style="display:flex;gap:9px;flex-wrap:wrap">
            ${nextL?'<a class="btn btn-sm" href="#/lesson/'+nextL+'">Học bài tiếp theo</a>':''}
            <a class="btn btn-sm btn-ghost" href="#/track/${mod.track}">Xem module</a>
          </div>
        </div></div></div>`;
    }
  }
  return banner + P.render();
};

window.VIEWS.dailyRun = function(id){
  const cs = window.CASE_BY_ID[id];
  if(!cs) return VIEWS.notfound();
  if(!State.isUnlocked(cs)) return VIEWS.case(id);
  P.start(cs, true);
  setTimeout(P.startClock, 0);
  return P.render();
};

/* ---------- REVIEW ---------- */
window.VIEWS.review = function(id){
  const cs = window.CASE_BY_ID[id];
  if(!cs) return VIEWS.notfound();
  const st = State.get().cases[id];
  if(!st || !st.done) { location.hash = "#/case/"+id; return "" }
  const score = st.score;
  const dims = st.dims || {};
  const strong = [], weak = [];
  Object.entries(dims).forEach(([k,v])=>{ (v>=75?strong:weak).push(DIM_LABEL[k]+" · "+DIM_VI[k]) });

  const endingObj = cs.endings && st.ending ? cs.endings[st.ending] : null;
  let verdict = score>=85 ? "Xuất sắc — cấu trúc chặt và kết luận sắc"
    : score>=70 ? "Tốt — logic đúng hướng, còn vài chỗ chưa chặt"
    : score>=50 ? "Đạt — nhưng bạn bỏ sót nhánh quan trọng"
    : "Chưa đạt — hãy đọc lại cách tiếp cận mẫu rồi giải lại";
  if(endingObj && !endingObj.good && score>=70)
    verdict = "Phân tích tốt — nhưng quyết định cuối dẫn tới một kết cục tốn kém";

  const ending = cs.endings && st.ending ? cs.endings[st.ending] : null;
  const endingHtml = ending ? `
  <div class="sec">
    <div class="panel" style="border-left:2px solid ${ending.good?'var(--pos)':'var(--warn)'}">
      <div class="panel-h"><b>Ending đã đạt được</b><div style="flex:1"></div>
        <span class="tag ${ending.good?'pos':'neg'}">${UI.esc(ending.tag)}</span>
        <span class="tag">${(st.endingsSeen||[st.ending]).length}/${Object.keys(cs.endings).length} ending đã thấy</span></div>
      <div class="panel-b">
        <div class="pl-q" style="font-size:20px;margin-top:0">${UI.esc(ending.title)}</div>
        <p class="muted" style="font-size:14.4px">${UI.esc(ending.text)}</p>
        <div class="hr"></div>
        <div class="mono" style="font-size:10px;letter-spacing:.13em;color:var(--dim-2);text-transform:uppercase">Các ngã rẽ khác</div>
        <ul class="bullets" style="margin-top:8px">${Object.entries(cs.endings).filter(([k])=>k!==st.ending)
          .map(([k,e])=>{
            const seen = (st.endingsSeen||[]).indexOf(k)>=0;
            return seen
              ? '<li><b>'+UI.esc(e.title)+'</b> — '+UI.esc(e.tag)+' <span class="tag pos">đã khám phá</span></li>'
              : '<li><span class="dim">Ngã rẽ chưa khám phá — '+UI.esc(e.tag)+'</span></li>';
          }).join("")}</ul>
        <p class="muted" style="font-size:13px;margin-bottom:0">Case này rẽ nhánh theo quyết định của bạn. Giải lại và chọn khác để thấy kết cục khác.</p>
      </div>
    </div>
  </div>` : "";

  return UI.crumb([{t:"Missions",href:"#/cases"},{t:cs.title},{t:"Case review"}])+`
<div class="wrap">
  <div class="review-head">
    <div style="display:flex;gap:30px;align-items:flex-start;flex-wrap:wrap">
      <div>
        <div class="mono" style="font-size:10px;letter-spacing:.15em;color:var(--dim-2);text-transform:uppercase">Overall score</div>
        <div class="score-ring">${score}</div>
        <div class="mono" style="font-size:11px;color:var(--dim)">${UI.esc(cs.title)}</div>
      </div>
      <div style="flex:1;min-width:280px">
        <h2 style="margin-bottom:14px">${UI.esc(verdict)}</h2>
        ${["structure","quant","insight","priority","recommendation"].filter(k=>dims[k]!=null).map(k=>{
          const v = dims[k];
          return `<div class="dimbar ${v>=75?'hi':(v<50?'lo':'')}">
            <div class="db-h"><span>${DIM_LABEL[k]} <span style="color:var(--dim-2)">· ${DIM_VI[k]}</span></span><span>${v}</span></div>
            <div class="db-t"><i style="width:${v}%"></i></div></div>`;
        }).join("")}
      </div>
    </div>
  </div>

  <div class="cmp">
    ${UI.panel("Your approach · Cách bạn làm", `
      <p class="muted" style="margin-top:0">Bạn đã đi qua ${cs.steps.length} bước. Kết quả theo từng nhóm năng lực ở trên phản ánh cách bạn cấu trúc vấn đề, xử lý số liệu và bảo vệ khuyến nghị.</p>
      <div class="hr"></div>
      <div class="mono" style="font-size:10px;letter-spacing:.13em;color:var(--pos);text-transform:uppercase">Bạn làm tốt ở đâu</div>
      ${strong.length? UI.bullets(strong.map(s=>s+" — đạt trên 75 điểm.")) : '<p class="muted">Chưa nhóm nào vượt 75 điểm. Đây là chỗ để cải thiện ở lần giải lại.</p>'}
      <div class="mono" style="font-size:10px;letter-spacing:.13em;color:var(--neg);text-transform:uppercase;margin-top:16px">Bạn bỏ sót gì</div>
      ${weak.length? UI.bullets(weak.map(s=>s+" — dưới 75 điểm, xem lại phần tương ứng bên phải.")) : '<p class="muted">Không có nhóm nào yếu rõ rệt. Rất tốt.</p>'}
    `)}
    ${UI.panel("Recommended approach · Cách tiếp cận mẫu", `
      ${UI.bullets(cs.solution.approach)}
      <div class="hr"></div>
      <div class="mono" style="font-size:10px;letter-spacing:.13em;color:var(--brass-2);text-transform:uppercase">Lời giải</div>
      <p class="muted">${UI.esc(cs.solution.answer)}</p>
    `)}
  </div>

  ${(function(){
    const dr = State.dailyResult();
    if(!dr || dr.id!==cs.id) return "";
    const mmss = n => Math.floor(n/60)+":"+String(n%60).padStart(2,"0");
    const AX = [["acc","Accuracy","35%"],["logic","Logic","25%"],["rec","Recommendation quality","25%"],["speed","Speed","15%"]];
    return `<div class="sec">
      <div class="panel" style="border-left:2px solid var(--brass)">
        <div class="panel-h"><b>Daily challenge — bảng điểm đã nộp</b><div style="flex:1"></div>
          <span class="tag brass">tổng ${dr.total}</span><span class="tag">${mmss(dr.seconds)} / ${cs.minutes}:00</span></div>
        <div class="panel-b">
          ${AX.map(([k,n,w])=>`<div class="dimbar ${dr[k]>=75?'hi':(dr[k]<50?'lo':'')}">
            <div class="db-h"><span>${n} <span style="color:var(--dim-2)">${w}</span></span><span>${dr[k]}</span></div>
            <div class="db-t"><i style="width:${dr[k]}%"></i></div></div>`).join("")}
          <p class="muted" style="font-size:13px;margin-bottom:0">Điểm daily chỉ được ghi nhận ở lần nộp đầu tiên trong ngày. <a href="#/daily" style="color:var(--brass-2)">Xem leaderboard hôm nay</a>.</p>
        </div>
      </div>
    </div>`;
  })()}

  ${endingHtml}

  <div class="sec">
    ${UI.panel("The insight · Điều đáng nhớ nhất", '<p style="font-size:15px;margin:0">'+UI.esc(cs.solution.insight)+'</p>')}
  </div>

  <div class="sec">
    ${UI.panel("What a good consultant asks next · Consultant giỏi sẽ hỏi tiếp", UI.bullets(cs.solution.next))}
  </div>

  <div class="sec" style="display:flex;gap:11px;flex-wrap:wrap;padding-bottom:40px">
    <a class="btn btn-primary" href="#/cases">Mission tiếp theo</a>
    <a class="btn" href="#/case/${cs.id}">Giải lại case này</a>
    ${cs.company?'<a class="btn btn-ghost" href="#/company/'+cs.company+'">Hồ sơ '+UI.esc((window.COMPANY_BY_ID[cs.company]||{}).name||'')+'</a>':''}
  </div>
</div>`;
};
})();
