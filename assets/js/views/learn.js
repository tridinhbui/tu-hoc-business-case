window.VIEWS = window.VIEWS || {};
/* ===== TẦNG HỌC: track → module → lesson ===== */

window.VIEWS.learn = function(){
  const next = State.nextLesson();
  return `<div class="wrap">
  <section class="sec">
    <h1 style="font-size:34px">Learn</h1>
    <div class="mono" style="font-size:12px;color:var(--brass-2);letter-spacing:.08em;margin-top:6px">Lộ trình học · từ nền tảng tới giải case</div>
    <p class="muted" style="max-width:62ch;margin-top:12px">Bài giảng ở đây tồn tại vì có một case cần nó. Học xong một module là bạn có đủ công cụ để giải case đứng cuối module đó — không học kiến thức chung chung.</p>
    ${next?`<div class="panel" style="margin-top:22px;border-left:2px solid var(--brass)">
      <div class="panel-h"><b>Continue learning · Học tiếp</b></div>
      <div class="panel-b" style="display:flex;justify-content:space-between;gap:16px;align-items:center;flex-wrap:wrap">
        <div>
          <div style="font-family:var(--head);font-size:20px;text-transform:uppercase;letter-spacing:.03em">${UI.esc(next.title)}</div>
          <div class="mono" style="font-size:12px;color:var(--dim);margin-top:4px">${UI.esc(next.vi)} · ${next.minutes} phút · ${next.xp} XP</div>
        </div>
        <a class="btn btn-primary" href="#/lesson/${next.id}">Vào học</a>
      </div></div>`:''}
  </section>

  <section class="sec" style="padding-bottom:40px">
    ${UI.secHead("Tracks","Lộ trình","3 lộ trình")}
    <div class="grid g3">
      ${window.TRACKS.map(t=>{
        const p = State.trackProgress(t.id);
        const ready = t.modules.filter(m=>(window.MODULE_BY_ID[m]||{}).status==="ready").length;
        return `<a class="model-card" href="#/track/${t.id}">
          <div class="mc-n">${UI.esc(t.name)}</div>
          <div class="mono" style="font-size:10.5px;color:var(--dim-2);margin-top:2px">${UI.esc(t.vi)}</div>
          <div class="mc-d" style="margin-top:10px">${UI.esc(t.promise)}</div>
          <div class="dimbar" style="margin-top:14px">
            <div class="db-h"><span>${t.modules.length} module · ${p.total} bài học</span><span>${p.pct}%</span></div>
            <div class="db-t"><i style="width:${p.pct}%"></i></div>
          </div>
          <div class="mc-e" style="display:flex;justify-content:space-between;gap:10px;align-items:center">
            <span>Dành cho: ${UI.esc(t.for)}</span>
            ${(function(){ const st=State.get().exams[t.id];
              if(st&&st.passed) return '<span class="tag pos">chứng chỉ '+st.best+'</span>';
              if(State.examUnlocked(t.id)) return '<span class="tag brass">sẵn sàng thi</span>';
              return '' })()}
          </div>
        </a>`;
      }).join("")}
    </div>
  </section></div>`;
};

window.VIEWS.track = function(id){
  const t = window.TRACK_BY_ID[id];
  if(!t) return VIEWS.notfound();
  const p = State.trackProgress(id);
  const mods = t.modules.map(m=>window.MODULE_BY_ID[m]).filter(Boolean);

  return UI.crumb([{t:"Learn",href:"#/learn"},{t:t.name}])+`
<div class="wrap">
  <section class="sec" style="padding-top:14px">
    <h1 style="font-size:40px">${UI.esc(t.name)}</h1>
    <div class="mono" style="font-size:13px;color:var(--brass-2);letter-spacing:.06em;margin-top:6px">${UI.esc(t.vi)}</div>
    <p class="muted" style="max-width:64ch;margin-top:14px;font-size:16px">${UI.esc(t.promise)}</p>
    <div class="dimbar" style="margin-top:18px;max-width:420px">
      <div class="db-h"><span>Tiến độ lộ trình</span><span>${p.done}/${p.total} bài học</span></div>
      <div class="db-t"><i style="width:${p.pct}%"></i></div>
    </div>
  </section>

  <section class="sec">
    ${(function(){
      const ex = window.EXAM_BY_TRACK[t.id];
      if(!ex) return "";
      const unlocked = State.examUnlocked(t.id);
      const st = State.get().exams[t.id];
      return `<div class="panel" style="border-left:2px solid ${st&&st.passed?'var(--pos)':'var(--brass)'}">
        <div class="panel-h"><b>Final exam · Bài kiểm tra cuối lộ trình</b><div style="flex:1"></div>
          ${st&&st.passed?'<span class="tag pos">đã đạt · '+st.best+'</span>'
            :(st&&st.attempts?'<span class="tag">cao nhất '+st.best+'</span>':'<span class="tag">cần '+ex.pass+' điểm</span>')}</div>
        <div class="panel-b" style="display:flex;justify-content:space-between;gap:16px;align-items:center;flex-wrap:wrap">
          <div style="max-width:58ch">
            <div style="font-family:var(--head);font-size:18px;text-transform:uppercase;letter-spacing:.03em">${UI.esc(ex.title)}</div>
            <div class="muted" style="font-size:13.6px;margin-top:6px">${UI.esc(ex.intro)}</div>
            <div class="mono" style="font-size:11px;color:var(--dim);margin-top:8px">${ex.questions.length} câu · khoảng ${ex.minutes} phút · đạt từ ${ex.pass} điểm</div>
          </div>
          <div style="display:flex;gap:9px;flex-wrap:wrap">
            ${unlocked
              ? '<a class="btn btn-sm btn-primary" href="#/exam/'+t.id+'">'+(st&&st.attempts?'Làm lại':'Vào thi')+'</a>'
              : '<span class="mono" style="font-size:11.5px;color:var(--dim-2)">Mở khi hoàn thành '+p.total+' bài học ('+p.done+'/'+p.total+')</span>'}
            ${st&&st.passed?'<a class="btn btn-sm" href="#/certificate/'+t.id+'">Chứng chỉ</a>':''}
          </div>
        </div></div>`;
    })()}
  </section>

  <section class="sec" style="padding-bottom:40px">
    ${UI.secHead("Modules","Các chương","")}
    <div style="display:flex;flex-direction:column;gap:12px">
      ${mods.map((m,i)=>{
        const mp = State.moduleProgress(m.id);
        const cs = window.CASE_BY_ID[m.case];
        const soon = m.status!=="ready";
        return `<div class="panel" style="${soon?'opacity:.55':''}">
          <div class="panel-h">
            <b>Module ${i+1} — ${UI.esc(m.name)}</b>
            <span class="gloss" style="text-transform:none;letter-spacing:0">· ${UI.esc(m.vi)}</span>
            <div style="flex:1"></div>
            ${soon?'<span class="tag">đang biên soạn</span>'
                  :(mp.complete?'<span class="tag pos">hoàn thành</span>':'<span class="tag brass">'+mp.done+'/'+mp.total+' bài</span>')}
          </div>
          <div class="panel-b">
            <div class="muted" style="font-size:14px">${UI.esc(m.goal||"")}</div>
            ${soon?'<div class="mono" style="font-size:11.5px;color:var(--dim-2);margin-top:12px">Chưa có bài giảng. Bạn vẫn có thể vào thẳng case '+(cs?'<a href="#/case/'+cs.id+'" style="color:var(--brass-2)">'+UI.esc(cs.title)+'</a>':'')+'.</div>'
            :`<div style="margin-top:14px;display:flex;flex-direction:column;gap:7px">
              ${m.lessons.map((lid,k)=>{
                const l = window.LESSON_BY_ID[lid], d = State.lessonDone(lid);
                return `<a href="#/lesson/${lid}" style="display:flex;gap:12px;align-items:center;border:1px solid var(--line);background:var(--bg-2);padding:11px 13px">
                  <span class="mono" style="width:20px;height:20px;flex:none;display:grid;place-items:center;border:1px solid ${d?'#2A5540':'var(--line-2)'};color:${d?'var(--pos)':'var(--dim-2)'};font-size:10px">${d?'✓':(k+1)}</span>
                  <span style="flex:1"><b style="font-weight:600;font-size:14px">${UI.esc(l.title)}</b>
                    <span class="gloss" style="font-size:13px"> · ${UI.esc(l.vi)}</span></span>
                  <span class="mono" style="font-size:11px;color:var(--dim)">${l.minutes} phút</span>
                </a>`;
              }).join("")}
              ${cs?`<div style="display:flex;gap:12px;align-items:center;border:1px solid ${mp.complete?'var(--brass)':'var(--line-2)'};background:${mp.complete?'#171308':'var(--bg-2)'};padding:12px 13px;border-style:${mp.complete?'solid':'dashed'}">
                <span class="mono" style="width:20px;height:20px;flex:none;display:grid;place-items:center;border:1px solid var(--brass);color:var(--brass-2);font-size:10px">▶</span>
                <span style="flex:1"><b style="font-weight:600;font-size:14px">Case: ${UI.esc(cs.title)}</b>
                  <span class="gloss" style="font-size:13px"> · bài kiểm tra của module</span></span>
                <a class="btn btn-sm ${mp.complete?'btn-primary':''}" href="#/case/${cs.id}">${mp.complete?'Làm bài':'Vào thẳng'}</a>
              </div>`:''}
            </div>`}
          </div>
        </div>`;
      }).join("")}
    </div>
  </section></div>`;
};

/* ---------- LESSON RUNTIME ---------- */
(function(){
const L = { l:null, ci:0, sel:null, multi:[], revealed:false, scores:[], worked:0, hint:false, tries:0, val:undefined };

function parseNum(raw){
  let t = String(raw||"").trim().replace(/\s/g,"");
  if(!t) return NaN;
  const hasDot=t.indexOf(".")>=0, hasComma=t.indexOf(",")>=0;
  if(hasDot&&hasComma) t = (t.lastIndexOf(",")>t.lastIndexOf(".")) ? t.replace(/\./g,"").replace(",",".") : t.replace(/,/g,"");
  else if(hasComma) t = t.replace(/,/g,".");
  else if(hasDot){ const p=t.split("."); if(p.length>2||(p[1]&&p[1].length===3)) t=p.join("") }
  return parseFloat(t);
}

L.start = function(lesson){ L.l=lesson; L.ci=0; L.sel=null; L.multi=[]; L.revealed=false; L.scores=[]; L.worked=0; L.hint=false; L.tries=0; L.val=undefined };
L.rerender = function(){ document.getElementById("app").innerHTML = VIEWS.lesson(L.l.id, true);
  const i=document.getElementById("lcalc"); if(i) i.focus(); };
L.reveal = function(){ L.worked++; L.rerender() };
L.revealAll = function(){ L.worked = L.l.worked.steps.length; L.rerender() };
L.pick = function(i){ if(L.revealed) return; L.sel=i; L.rerender() };
L.toggle = function(i){ if(L.revealed) return; const k=L.multi.indexOf(i); if(k>=0)L.multi.splice(k,1); else L.multi.push(i); L.rerender() };
L.hintOn = function(){ L.hint=true; State.usedHint(); L.rerender() };

L.submit = function(){
  const q = L.l.check[L.ci];
  let sc = 0;
  if(q.kind==="mcq"){ if(L.sel===null) return; sc = q.options[L.sel].ok?1:0 }
  else if(q.kind==="multi"){
    if(!L.multi.length) return;
    const ok = L.multi.filter(i=>q.options[i].ok).length, bad = L.multi.length-ok;
    sc = Math.max(0, Math.min(1, (ok-bad*0.5)/q.need));
  } else if(q.kind==="calc"){
    const v = parseNum((document.getElementById("lcalc")||{}).value);
    if(isNaN(v)){ UI.toast("THIẾU SỐ","Nhập một con số trước khi kiểm tra"); return }
    L.val = v; L.tries++;
    const good = Math.abs(v-q.answer)<=q.tol;
    if(!good && L.tries<2){ UI.toast("CHƯA ĐÚNG","Còn 1 lần thử"); L.rerender(); return }
    sc = good ? (L.tries===1?1:0.6) : 0;
    State.calcResult(good);
  }
  if(L.hint) sc *= 0.75;
  L.revealed = true; L.pending = sc; L.rerender();
};

L.next = function(){
  L.scores[L.ci] = L.pending||0;
  const q = L.l.check[L.ci];
  const xp = Math.round((q.xp||0)*(L.pending||0));
  if(xp) State.addXp(xp, "Bài tập");
  L.ci++; L.sel=null; L.multi=[]; L.revealed=false; L.hint=false; L.tries=0; L.val=undefined; L.pending=0;
  if(L.ci >= L.l.check.length) L.finish();
  else L.rerender();
};

L.finish = function(){
  const score = Math.round(L.scores.reduce((a,b)=>a+b,0)/L.scores.length*100);
  const first = State.finishLesson(L.l.id, score);
  if(first) State.addXp(L.l.xp, "Hoàn thành bài học");
  L.done = true; L.score = score;
  L.rerender();
};
window.LESSON = L;

window.VIEWS.lesson = function(id, keep){
  const l = window.LESSON_BY_ID[id];
  if(!l) return VIEWS.notfound();
  if(!keep || !L.l || L.l.id!==id){ L.start(l); L.done = State.lessonDone(id); L.score = (State.get().lessons[id]||{}).score||0; }
  const m = window.MODULE_BY_ID[l.module];
  const t = window.TRACK_BY_ID[m.track];
  const idx = m.lessons.indexOf(id);
  const nextLesson = m.lessons[idx+1] ? window.LESSON_BY_ID[m.lessons[idx+1]] : null;
  const cs = window.CASE_BY_ID[m.case];
  const mp = State.moduleProgress(m.id);

  /* --- CHECK block --- */
  let checkHtml = "";
  if(L.done && L.ci>=l.check.length){
    checkHtml = `<div class="fb good"><div class="fb-h">Đã hoàn thành bài học</div>
      <p>Điểm bài tập: <b style="color:var(--brass-2)">${L.score}/100</b> · +${l.xp} XP</p></div>`;
  } else {
    const q = l.check[L.ci];
    const opts = (mode)=> '<div class="opts">'+q.options.map((o,i)=>{
      let cls="opt"; const chosen = mode==="multi"? L.multi.includes(i) : L.sel===i;
      if(!L.revealed && chosen) cls+=" sel";
      if(L.revealed){ cls+=" disabled"; if(o.ok) cls+=" right"; else if(chosen) cls+=" wrong" }
      const h = mode==="multi"?'LESSON.toggle('+i+')':'LESSON.pick('+i+')';
      return `<div class="${cls}" onclick="${L.revealed?'':h}"><span class="o-k">${String.fromCharCode(65+i)}</span>
        <span class="o-t">${UI.esc(o.t)}${L.revealed?'<span class="o-note">'+UI.esc(o.why)+'</span>':''}</span></div>`;
    }).join("")+'</div>';

    let inner = "";
    if(q.kind==="mcq") inner = opts("mcq");
    else if(q.kind==="multi") inner = opts("multi")+`<div class="mono" style="font-size:11px;color:var(--dim);margin-top:10px">Đã chọn ${L.multi.length}/${q.need}</div>`;
    else if(q.kind==="calc"){
      inner = `<div class="calcbox"><input id="lcalc" type="text" inputmode="decimal" placeholder="0" ${L.revealed?'disabled':''} value="${L.val!=null?L.val:''}">
        <span class="unit">${UI.esc(q.unit)}</span>${L.tries===1&&!L.revealed?'<span class="unit" style="color:var(--neg)">Sai — còn 1 lần thử</span>':''}</div>`;
      if(L.hint && q.hint) inner += `<div class="hintbox"><b class="mono" style="font-size:10px;letter-spacing:.13em">GỢI Ý</b><br>${UI.esc(q.hint)}</div>`;
      if(L.revealed) inner += `<div class="scratch"><div class="sc-h">Cách tính</div>${q.working.map(w=>'<div class="row"><span>'+UI.esc(w.k)+'</span><span>'+UI.esc(w.v)+'</span></div>').join("")}</div>`;
    }

    checkHtml = `<div class="pl-prompt">Check · Kiểm tra ${L.ci+1}/${l.check.length}</div>
      <div class="pl-q" style="font-size:20px">${UI.esc(q.question)}</div>
      ${q.note?`<div class="pl-sub">${UI.esc(q.note)}</div>`:''}
      ${inner}
      ${L.revealed&&q.why?`<div class="fb ${(L.pending||0)>=0.75?'good':'bad'}"><div class="fb-h">Vì sao</div><p>${UI.esc(q.why)}</p></div>`:''}
      ${L.revealed?`<div class="fb ${(L.pending||0)>=0.75?'good':'bad'}"><div class="fb-h">Điểm</div>
        <p><b style="color:var(--brass-2)">${Math.round((L.pending||0)*100)}/100</b> · +${Math.round((q.xp||0)*(L.pending||0))} XP${L.hint?' (đã trừ 25% vì dùng gợi ý)':''}</p></div>`:''}
      <div class="pl-actions">
        ${L.revealed
          ? `<button class="btn btn-primary" onclick="LESSON.next()">${L.ci+1>=l.check.length?'Hoàn thành bài học':'Câu tiếp theo'}</button>`
          : `<button class="btn btn-primary" onclick="LESSON.submit()">Kiểm tra</button>
             ${q.kind==="calc"&&q.hint&&!L.hint?'<button class="btn btn-ghost" onclick="LESSON.hintOn()">Gợi ý (−25% điểm)</button>':''}`}
        <span class="kbd-hint">${L.revealed?'<kbd>↵</kbd> tiếp'
          :'<kbd>1</kbd>–<kbd>9</kbd> chọn · <kbd>↵</kbd> kiểm tra'+(q.kind==="calc"&&q.hint&&!L.hint?' · <kbd>H</kbd> gợi ý':'')}</span>
      </div>`;
  }

  return UI.crumb([{t:"Learn",href:"#/learn"},{t:t.name,href:"#/track/"+t.id},{t:m.name},{t:l.title}])+`
<div class="wrap" style="max-width:900px">
  <section class="sec" style="padding-top:14px">
    <div class="mono" style="font-size:10.5px;letter-spacing:.14em;color:var(--dim-2);text-transform:uppercase">
      ${UI.esc(m.name)} · bài ${idx+1}/${m.lessons.length}</div>
    <h1 style="font-size:38px;margin-top:6px">${UI.esc(l.title)}</h1>
    <div class="mono" style="font-size:13px;color:var(--brass-2);letter-spacing:.06em;margin-top:5px">${UI.esc(l.vi)}</div>
    <div style="display:flex;gap:7px;margin-top:12px;flex-wrap:wrap">
      <span class="tag">${l.minutes} phút đọc</span><span class="tag">${l.xp} XP</span>
      ${State.lessonDone(l.id)?'<span class="tag pos">đã học</span>':''}
    </div>
  </section>

  <section class="sec" style="padding-top:8px">
    <div class="pl-brief">
      <div class="mono" style="font-size:10px;letter-spacing:.14em;color:var(--dim-2);text-transform:uppercase;margin-bottom:8px">Hook · Câu hỏi mở đầu</div>
      <div style="font-family:var(--head);font-size:22px;text-transform:uppercase;letter-spacing:.02em;line-height:1.2">${UI.esc(l.hook.q)}</div>
      <div class="muted" style="font-size:14.4px;margin-top:10px">${UI.esc(l.hook.text)}</div>
    </div>
  </section>

  <section class="sec" style="padding-top:8px">
    ${UI.secHead("Core","Nội dung chính","")}
    <div style="display:flex;flex-direction:column;gap:12px">
      ${l.core.map((c,i)=>`<div class="panel"><div class="panel-b">
        <div style="display:flex;gap:10px;align-items:baseline;flex-wrap:wrap">
          <span class="mono" style="font-size:11px;color:var(--brass);width:18px">${String(i+1).padStart(2,"0")}</span>
          <span style="font-family:var(--head);font-size:17px;text-transform:uppercase;letter-spacing:.04em">${UI.esc(c.h)}</span>
          ${c.hVi?'<span class="gloss" style="font-size:13px">· '+UI.esc(c.hVi)+'</span>':''}
        </div>
        <div class="muted" style="font-size:14.6px;margin-top:9px;padding-left:28px">${UI.esc(c.body)}</div>
        ${c.note?`<div class="mono" style="font-size:12.5px;color:var(--ink-2);margin-top:10px;margin-left:28px;padding:10px 12px;border-left:2px solid var(--line-2);background:var(--bg-2);white-space:pre-line">${UI.esc(c.note)}</div>`:''}
        ${c.example?`<div style="margin-top:10px;margin-left:28px;padding:11px 13px;border:1px dashed var(--line-2);background:var(--bg-2)">
          <a class="mono" style="font-size:10px;letter-spacing:.12em;color:var(--brass-2);text-transform:uppercase" href="#/company/${c.example.company}">Ví dụ: ${UI.esc((window.COMPANY_BY_ID[c.example.company]||{}).name||"")}</a>
          <div class="muted" style="font-size:13.6px;margin-top:5px">${UI.esc(c.example.text)}</div></div>`:''}
      </div></div>`).join("")}
    </div>
  </section>

  <section class="sec">
    ${UI.secHead("Worked example","Ví dụ giải từng bước","hiện dần")}
    <div class="panel"><div class="panel-b">
      <div style="font-family:var(--head);font-size:18px;text-transform:uppercase;letter-spacing:.03em;margin-bottom:12px">${UI.esc(l.worked.title)}</div>
      <div class="scratch" style="max-width:none">
        ${l.worked.steps.map((w,i)=> i<L.worked
          ? `<div class="row"><span>${UI.esc(w.k)}</span><span>${UI.esc(w.v)}${w.note?' <span style="color:var(--dim)">· '+UI.esc(w.note)+'</span>':''}</span></div>`
          : `<div class="row" style="opacity:.28"><span>${UI.esc(w.k)}</span><span>■■■■</span></div>`).join("")}
      </div>
      <div class="pl-actions" style="margin-top:16px">
        ${L.worked < l.worked.steps.length
          ? `<button class="btn btn-sm" onclick="LESSON.reveal()">Hiện bước tiếp theo</button>
             <button class="btn btn-sm btn-ghost" onclick="LESSON.revealAll()">Hiện hết</button>`
          : `<div class="fb good" style="margin-top:0"><div class="fb-h">Kết luận</div><p>${UI.esc(l.worked.conclusion)}</p></div>`}
      </div>
    </div></div>
  </section>

  <section class="sec">
    ${UI.secHead("Check","Kiểm tra hiểu bài","")}
    <div class="panel"><div class="panel-b">${checkHtml}</div></div>
  </section>

  <section class="sec">
    <div class="grid g2">
      ${UI.panel("Recap · Ba điều phải nhớ", UI.bullets(l.recap))}
      ${UI.panel("Terms · Thuật ngữ",
        l.terms.map(t=>`<div style="padding:8px 0;border-bottom:1px dashed var(--line)">
          <div><b style="font-weight:600">${UI.esc(t.en)}</b> <span class="gloss">· ${UI.esc(t.vi)}</span></div>
          <div class="muted" style="font-size:13px;margin-top:2px">${UI.esc(t.d)}</div></div>`).join(""))}
    </div>
  </section>

  <section class="sec" style="padding-bottom:40px">
    <div class="panel" style="border-left:2px solid var(--brass)"><div class="panel-b"
      style="display:flex;justify-content:space-between;gap:16px;align-items:center;flex-wrap:wrap">
      <div>
        <div class="mono" style="font-size:10px;letter-spacing:.14em;color:var(--dim-2);text-transform:uppercase">Next · Tiếp theo</div>
        <div style="font-family:var(--head);font-size:19px;text-transform:uppercase;margin-top:4px">
          ${nextLesson? UI.esc(nextLesson.title) : (mp.complete? "Case: "+UI.esc(cs?cs.title:"") : "Hoàn thành các bài còn lại")}</div>
        <div class="mono" style="font-size:11.5px;color:var(--dim);margin-top:4px">
          ${nextLesson? UI.esc(nextLesson.vi)+" · "+nextLesson.minutes+" phút"
            : (mp.complete? "Bạn đã đủ công cụ để giải case của module này" : mp.done+"/"+mp.total+" bài học trong module")}</div>
      </div>
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        ${nextLesson?`<a class="btn btn-primary" href="#/lesson/${nextLesson.id}">Bài tiếp theo</a>`:''}
        ${cs?`<a class="btn ${!nextLesson&&mp.complete?'btn-primary':''}" href="#/case/${cs.id}">Vào case</a>`:''}
        <a class="btn btn-ghost btn-sm" href="#/track/${t.id}">Về module</a>
      </div>
    </div></div>
  </section>
</div>`;
};
})();
