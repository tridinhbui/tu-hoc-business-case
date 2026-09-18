window.VIEWS = window.VIEWS || {};

/* ===== BÀI KIỂM TRA CUỐI LỘ TRÌNH ===== */
(function(){
const E = { t:null, ex:null, idx:0, ans:[], sel:null, multi:[], val:undefined, done:false, result:null, t0:0 };

function parseNum(raw){
  let t = String(raw||"").trim().replace(/\s/g,"");
  if(!t) return NaN;
  const hasDot=t.indexOf(".")>=0, hasComma=t.indexOf(",")>=0;
  if(hasDot&&hasComma) t = (t.lastIndexOf(",")>t.lastIndexOf(".")) ? t.replace(/\./g,"").replace(",",".") : t.replace(/,/g,"");
  else if(hasComma) t = t.replace(/,/g,".");
  else if(hasDot){ const p=t.split("."); if(p.length>2||(p[1]&&p[1].length===3)) t=p.join("") }
  return parseFloat(t);
}
function gradeOne(q, a){
  if(a==null) return 0;
  if(q.kind==="calc") return (typeof a==="number" && Math.abs(a-q.answer)<=q.tol) ? 1 : 0;
  if(q.kind==="mcq")  return q.options[a] && q.options[a].ok ? 1 : 0;
  const ok = a.filter(i=>q.options[i].ok).length, bad = a.length-ok;
  return Math.max(0, Math.min(1, (ok-bad*0.5)/q.need));
}

E.start = function(track){
  E.t = track; E.ex = window.EXAM_BY_TRACK[track];
  E.idx = 0; E.ans = []; E.sel=null; E.multi=[]; E.val=undefined; E.done=false; E.result=null; E.t0=Date.now();
};
E.rerender = function(){ document.getElementById("app").innerHTML = VIEWS.exam(E.t, true);
  const i=document.getElementById("ecalc"); if(i) i.focus(); };
E.pick = function(i){ E.sel=i; E.rerender() };
E.toggle = function(i){ const k=E.multi.indexOf(i); if(k>=0)E.multi.splice(k,1); else E.multi.push(i); E.rerender() };
E.save = function(){
  const q = E.ex.questions[E.idx];
  if(q.kind==="calc"){ const v=parseNum((document.getElementById("ecalc")||{}).value); E.ans[E.idx] = isNaN(v)?null:v }
  else if(q.kind==="mcq") E.ans[E.idx] = E.sel;
  else E.ans[E.idx] = E.multi.slice();
};
E.load = function(){
  const q = E.ex.questions[E.idx], a = E.ans[E.idx];
  E.sel = q.kind==="mcq" ? (a==null?null:a) : null;
  E.multi = q.kind==="multi" ? (a||[]).slice() : [];
  E.val = q.kind==="calc" ? a : undefined;
};
E.go = function(d){ E.save(); const n=E.idx+d; if(n<0||n>=E.ex.questions.length) return; E.idx=n; E.load(); E.rerender(); window.scrollTo(0,0) };
E.jump = function(i){ E.save(); E.idx=i; E.load(); E.rerender(); window.scrollTo(0,0) };

E.finish = function(){
  E.save();
  const unanswered = E.ex.questions.filter((q,i)=>E.ans[i]==null || (Array.isArray(E.ans[i])&&!E.ans[i].length)).length;
  if(unanswered && !confirm("Còn "+unanswered+" câu chưa trả lời. Nộp bài luôn?")) return;
  const per = E.ex.questions.map((q,i)=>gradeOne(q, E.ans[i]));
  const score = Math.round(per.reduce((a,b)=>a+b,0)/per.length*100);
  const byModule = {};
  E.ex.questions.forEach((q,i)=>{
    byModule[q.module] = byModule[q.module] || {got:0,n:0};
    byModule[q.module].got += per[i]; byModule[q.module].n++;
  });
  const flat = {}; Object.entries(byModule).forEach(([k,v])=>flat[k]=Math.round(v.got/v.n*100));
  const rec = State.recordExam(E.t, score, flat);
  const mins = Math.max(1, Math.round((Date.now()-E.t0)/60000));
  State.addXp(Math.round(300*score/100), "Bài kiểm tra cuối lộ trình");
  E.done = true; E.result = {score, per, flat, mins, passed: score>=E.ex.pass, best:rec.best};
  E.rerender(); window.scrollTo(0,0);
};
window.EXAM = E;

window.VIEWS.exam = function(track, keep){
  const ex = window.EXAM_BY_TRACK[track], t = window.TRACK_BY_ID[track];
  if(!ex || !t) return VIEWS.notfound();
  if(!keep || !E.ex || E.t!==track) E.start(track);
  const p = State.trackProgress(track);
  const st = State.get().exams[track];

  if(!State.examUnlocked(track)){
    return UI.crumb([{t:"Learn",href:"#/learn"},{t:t.name,href:"#/track/"+track},{t:"Final exam"}])+
    `<div class="wrap"><div class="sec"><div class="empty">
      Bài kiểm tra mở khi bạn hoàn thành hết bài học của lộ trình.<br>
      <b style="color:var(--brass-2)">${p.done}/${p.total} bài học</b><br><br>
      <a class="btn btn-sm" href="#/track/${track}">Về lộ trình</a></div></div></div>`;
  }

  /* ---------- màn hình kết quả ---------- */
  if(E.done){
    const r = E.result;
    return UI.crumb([{t:"Learn",href:"#/learn"},{t:t.name,href:"#/track/"+track},{t:"Kết quả"}])+`
    <div class="wrap">
      <div class="review-head">
        <div style="display:flex;gap:30px;align-items:flex-start;flex-wrap:wrap">
          <div>
            <div class="mono" style="font-size:10px;letter-spacing:.15em;color:var(--dim-2);text-transform:uppercase">Điểm bài kiểm tra</div>
            <div class="score-ring" style="color:${r.passed?'var(--pos)':'var(--neg)'}">${r.score}</div>
            <div class="mono" style="font-size:11px;color:var(--dim)">cần ${ex.pass} để đạt · ${r.mins} phút</div>
          </div>
          <div style="flex:1;min-width:280px">
            <h2 style="margin-bottom:6px">${r.passed?"Đạt — "+UI.esc(t.name):"Chưa đạt"}</h2>
            <p class="muted" style="margin-top:0">${r.passed
              ? "Bạn đã chứng minh nắm được toàn bộ lộ trình này. Chứng chỉ đã được cấp."
              : "Xem lại các module có điểm thấp bên dưới rồi làm lại. Không giới hạn số lần."}</p>
            <div style="display:flex;gap:10px;margin-top:14px;flex-wrap:wrap">
              ${r.passed?`<a class="btn btn-primary btn-sm" href="#/certificate/${track}">Xem chứng chỉ</a>`:''}
              <a class="btn btn-sm" href="#/exam/${track}" onclick="EXAM.start('${track}')">Làm lại</a>
              <a class="btn btn-ghost btn-sm" href="#/track/${track}">Về lộ trình</a>
            </div>
          </div>
        </div>
      </div>

      <div class="sec">
        ${UI.secHead("By module","Điểm theo từng chương","")}
        <div class="panel"><div class="panel-b">
          ${Object.entries(r.flat).map(([mid,v])=>{
            const m = window.MODULE_BY_ID[mid];
            return `<div class="dimbar ${v>=80?'hi':(v<60?'lo':'')}">
              <div class="db-h"><span>${UI.esc(m.name)} <span style="color:var(--dim-2)">· ${UI.esc(m.vi)}</span></span><span>${v}</span></div>
              <div class="db-t"><i style="width:${v}%"></i></div>
              ${v<80?'<div class="mono" style="font-size:11px;color:var(--dim);margin-top:5px">Nên học lại: <a href="#/lesson/'+m.lessons[0]+'" style="color:var(--brass-2)">'+UI.esc(m.name)+'</a></div>':''}
            </div>`;
          }).join("")}
        </div></div>
      </div>

      <div class="sec" style="padding-bottom:40px">
        ${UI.secHead("Review","Xem lại từng câu","")}
        <div style="display:flex;flex-direction:column;gap:12px">
          ${ex.questions.map((q,i)=>{
            const sc = r.per[i], a = E.ans[i];
            return `<div class="panel" style="border-left:2px solid ${sc>=0.99?'var(--pos)':(sc>0?'var(--warn)':'var(--neg)')}">
              <div class="panel-h"><b>Câu ${i+1}</b><span class="gloss" style="text-transform:none;letter-spacing:0">· ${UI.esc(window.MODULE_BY_ID[q.module].name)}</span>
                <div style="flex:1"></div><span class="tag ${sc>=0.99?'pos':(sc>0?'':'neg')}">${Math.round(sc*100)}/100</span></div>
              <div class="panel-b">
                <div style="font-size:14.5px;margin-bottom:10px">${UI.esc(q.question)}</div>
                ${q.kind==="calc"
                  ? `<div class="scratch" style="max-width:none"><div class="sc-h">Đáp án đúng: ${q.answer} ${UI.esc(q.unit)} · bạn trả lời: ${a==null?"(bỏ trống)":a}</div>
                     ${q.working.map(w=>'<div class="row"><span>'+UI.esc(w.k)+'</span><span>'+UI.esc(w.v)+'</span></div>').join("")}</div>`
                  : `<div class="opts">${q.options.map((o,k)=>{
                      const chosen = q.kind==="mcq" ? a===k : (a||[]).indexOf(k)>=0;
                      let cls="opt disabled"; if(o.ok) cls+=" right"; else if(chosen) cls+=" wrong";
                      return `<div class="${cls}"><span class="o-k">${String.fromCharCode(65+k)}</span>
                        <span class="o-t">${UI.esc(o.t)}<span class="o-note">${UI.esc(o.why)}</span></span></div>`;
                    }).join("")}</div>`}
                ${q.why?`<div class="fb" style="margin-top:14px"><div class="fb-h">Vì sao</div><p>${UI.esc(q.why)}</p></div>`:''}
              </div></div>`;
          }).join("")}
        </div>
      </div>
    </div>`;
  }

  /* ---------- màn hình làm bài ---------- */
  const q = ex.questions[E.idx];
  const answered = ex.questions.filter((x,i)=>E.ans[i]!=null && !(Array.isArray(E.ans[i])&&!E.ans[i].length)).length;
  let inner = "";
  if(q.kind==="calc"){
    inner = `<div class="calcbox"><input id="ecalc" type="text" inputmode="decimal" placeholder="0" value="${E.val!=null?E.val:''}">
      <span class="unit">${UI.esc(q.unit||"")}</span></div>`;
  } else {
    const mode = q.kind==="multi" ? "multi" : "mcq";
    inner = '<div class="opts">'+q.options.map((o,i)=>{
      const chosen = mode==="multi" ? E.multi.includes(i) : E.sel===i;
      return `<div class="opt${chosen?' sel':''}" onclick="EXAM.${mode==="multi"?'toggle':'pick'}(${i})">
        <span class="o-k">${String.fromCharCode(65+i)}</span><span class="o-t">${UI.esc(o.t)}</span></div>`;
    }).join("")+'</div>';
    if(mode==="multi") inner += `<div class="mono" style="font-size:11px;color:var(--dim);margin-top:10px">Chọn ${q.need} · đã chọn ${E.multi.length}</div>`;
  }

  return UI.crumb([{t:"Learn",href:"#/learn"},{t:t.name,href:"#/track/"+track},{t:"Final exam"}])+`
  <div class="wrap" style="max-width:900px">
    <section class="sec" style="padding-top:14px">
      <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:16px;flex-wrap:wrap">
        <div>
          <h1 style="font-size:32px">${UI.esc(ex.title)}</h1>
          <div class="mono" style="font-size:12px;color:var(--brass-2);letter-spacing:.06em;margin-top:5px">${UI.esc(ex.vi)}</div>
        </div>
        <div class="mono" style="font-size:11px;color:var(--dim);text-align:right">
          Câu ${E.idx+1}/${ex.questions.length}<br>Đã trả lời ${answered}/${ex.questions.length}
          ${st&&st.best?'<br>Điểm cao nhất: '+st.best:''}
        </div>
      </div>
      <div class="dimbar" style="margin-top:14px"><div class="db-t"><i style="width:${Math.round(answered/ex.questions.length*100)}%"></i></div></div>
      ${E.idx===0?`<div class="pl-brief" style="margin-top:16px"><div class="muted" style="font-size:14px">${UI.esc(ex.intro)} Cần ${ex.pass} điểm để đạt.</div></div>`:''}
    </section>

    <section class="sec" style="padding-top:8px">
      <div class="panel"><div class="panel-b">
        <div class="pl-prompt">${UI.esc(window.MODULE_BY_ID[q.module].name)}</div>
        <div class="pl-q" style="font-size:20px">${UI.esc(q.question)}</div>
        ${inner}
        <div class="pl-actions">
          <button class="btn btn-sm" onclick="EXAM.go(-1)" ${E.idx===0?'disabled':''}>← Câu trước</button>
          ${E.idx<ex.questions.length-1
            ? '<button class="btn btn-primary btn-sm" onclick="EXAM.go(1)">Câu tiếp →</button>'
            : '<button class="btn btn-primary btn-sm" onclick="EXAM.finish()">Nộp bài</button>'}
          ${E.idx<ex.questions.length-1?'<button class="btn btn-ghost btn-sm" onclick="EXAM.finish()">Nộp bài sớm</button>':''}
          <span class="kbd-hint"><kbd>1</kbd>–<kbd>9</kbd> chọn · <kbd>←</kbd><kbd>→</kbd> chuyển câu · <kbd>↵</kbd> tiếp</span>
        </div>
      </div></div>

      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:16px">
        ${ex.questions.map((x,i)=>{
          const done = E.ans[i]!=null && !(Array.isArray(E.ans[i])&&!E.ans[i].length);
          return `<button class="chip ${i===E.idx?'on':''}" onclick="EXAM.jump(${i})" style="${done&&i!==E.idx?'border-color:#2A5540;color:var(--pos)':''}">${i+1}</button>`;
        }).join("")}
      </div>
      <div class="mono" style="font-size:11px;color:var(--dim-2);margin-top:10px">Không có phản hồi giữa chừng. Bạn có thể quay lại sửa bất kỳ câu nào trước khi nộp.</div>
    </section>
  </div>`;
};

/* ===== CHỨNG CHỈ ===== */
window.VIEWS.certificate = function(track){
  const t = window.TRACK_BY_ID[track], ex = window.EXAM_BY_TRACK[track];
  if(!t) return VIEWS.notfound();
  const st = State.get().exams[track];
  if(!st || !st.passed){
    return '<div class="wrap"><div class="sec"><div class="empty">Chưa có chứng chỉ cho lộ trình này. <a href="#/exam/'+track+'" style="color:var(--brass-2)">Làm bài kiểm tra</a></div></div></div>';
  }
  const name = State.playerName();
  const mods = t.modules.map(m=>window.MODULE_BY_ID[m]).filter(m=>m.status==="ready");

  return UI.crumb([{t:"Dossier",href:"#/profile"},{t:t.name,href:"#/track/"+track},{t:"Certificate"}])+`
  <div class="wrap" style="max-width:840px">
    <section class="sec">
      <div class="panel" style="border:1px solid var(--brass);background:linear-gradient(180deg,var(--panel-2),var(--panel))">
        <div class="panel-b" style="padding:38px 34px;text-align:center">
          <div class="mono" style="font-size:10px;letter-spacing:.28em;color:var(--dim-2);text-transform:uppercase">Tự học Business Case · Certificate of Completion</div>
          <div style="width:40px;height:1px;background:var(--brass);margin:18px auto"></div>
          <div class="mono" style="font-size:11px;letter-spacing:.14em;color:var(--dim);text-transform:uppercase;margin-bottom:10px">Chứng nhận</div>
          <div style="font-family:var(--head);font-size:34px;letter-spacing:.03em;color:var(--ink);text-transform:uppercase">
            ${name? UI.esc(name) : '<span style="color:var(--dim-2)">— chưa đặt tên —</span>'}
          </div>
          <div class="mono" style="font-size:11px;color:var(--dim);margin:16px 0 6px">đã hoàn thành lộ trình</div>
          <div style="font-family:var(--head);font-size:26px;color:var(--brass-2);text-transform:uppercase;letter-spacing:.04em">${UI.esc(t.name)}</div>
          <div class="mono" style="font-size:12px;color:var(--dim);margin-top:4px">${UI.esc(t.vi)}</div>

          <div class="grid g3" style="margin:26px 0 8px;text-align:left">
            ${UI.statBox("Điểm bài kiểm tra", String(st.best), "cần "+ex.pass+" để đạt")}
            ${UI.statBox("Bài học hoàn thành", String(State.trackProgress(track).total), mods.length+" module")}
            ${UI.statBox("Ngày cấp", st.date||"", st.attempts>1? st.attempts+" lần làm bài" : "lần đầu")}
          </div>

          <div style="text-align:left;margin-top:18px">
            <div class="mono" style="font-size:10px;letter-spacing:.13em;color:var(--dim-2);text-transform:uppercase;margin-bottom:8px">Nội dung đã hoàn thành</div>
            <div style="display:flex;gap:7px;flex-wrap:wrap">
              ${mods.map(m=>'<span class="tag brass">'+UI.esc(m.name)+'</span>').join("")}
            </div>
          </div>

          <div style="width:100%;height:1px;background:var(--line);margin:24px 0 14px"></div>
          <div class="mono" style="font-size:10.5px;color:var(--dim-2);line-height:1.7">
            Chứng chỉ này ghi nhận kết quả học tập trên Tự học Business Case.<br>
            Đây là sản phẩm luyện tập, không phải chứng chỉ nghề nghiệp được công nhận chính thức.
          </div>
        </div>
      </div>

      <div class="panel" style="margin-top:14px"><div class="panel-b" style="display:flex;gap:12px;align-items:flex-end;flex-wrap:wrap">
        <div class="field" style="flex:1;min-width:240px">
          <label>Tên trên chứng chỉ · Name</label>
          <input id="certName" type="text" value="${UI.esc(name)}" placeholder="Nhập tên của bạn"
            style="font-family:var(--mono);font-size:14px;background:var(--bg-2);border:1px solid var(--line-2);color:var(--ink);padding:10px 12px;border-radius:2px;outline:none">
        </div>
        <button class="btn btn-sm btn-primary" onclick="State.setName(document.getElementById('certName').value); location.reload()">Lưu tên</button>
        <a class="btn btn-sm btn-ghost" href="#/profile">Về Dossier</a>
      </div></div>
    </section>
  </div>`;
};
})();
