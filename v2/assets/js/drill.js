/* ════════ CÂU MỞ ĐẦU THEO NGHỀ ════════
   Mỗi nghề có 3 câu case hay gặp (careers-detail-*.js). Người học viết nước đi đầu tiên,
   mở gợi ý, rồi tự chấm: trùng ý / gần đúng / lệch hướng. Lệch hướng vào Mistake Review.
   Dùng esc, bar, toast, render của app.js — chỉ gọi lúc vẽ nên thứ tự nạp không quan trọng. */
(function(){
const MIN_CHARS = 25;
const UI = { draft:{} };                         // bản nháp chưa nộp, giữ qua các lần vẽ lại
const keysOf = c => (c.cases||[]).map((_,i)=>`${c.id}-${i}`);
const allKeys = () => window.CAREERS.flatMap(keysOf);
const VERDICT = {
  hit:  {n:"Trùng ý",    cls:"tag-e", d:"Cùng hướng phân tách chính với gợi ý"},
  near: {n:"Gần đúng",   cls:"tag-a", d:"Đúng hướng nhưng thiếu bước then chốt"},
  miss: {n:"Lệch hướng", cls:"tag-r", d:"Bắt đầu từ chỗ khác hoặc nhảy vào giải pháp"}
};

function pickCareer(id){
  const C = window.CAREER_BY_ID;
  if(id && C[id] && C[id].cases) return C[id];
  const mine = State.data.career;
  return (mine && C[mine] && C[mine].cases) ? C[mine] : window.CAREERS.find(c=>c.cases);
}

function vDrill(id){
  const c = pickCareer(id), mine = State.data.career;
  const g = State.drillStats(allKeys()), cs = State.drillStats(keysOf(c));
  const cats = window.CAREER_CATS || [];
  const metric = (k,v,n) => `<div class="card metric"><div class="k">${k}</div><div class="v num">${v}</div>${n?`<div class="n">${n}</div>`:""}</div>`;
  const pct = g.done ? Math.round(100*g.hit/g.done) : null;

  return `<div class="main">
  <div class="row" style="justify-content:space-between;flex-wrap:wrap;gap:12px;align-items:flex-end">
    <div><h1>Câu mở đầu theo nghề</h1>
      <p class="muted" style="margin-top:4px;max-width:72ch">Interviewer đọc đề và chờ bạn nói nước đi đầu tiên. Viết nó ra trước, rồi mới mở gợi ý và tự chấm thật lòng. Câu lệch hướng sẽ vào Mistake Review để ôn lại.</p></div>
    <button class="btn" onclick="DRILL.random()">Câu ngẫu nhiên chưa làm</button>
  </div>

  <div class="grid g4 mt">
    ${metric("Đã tự chấm", `${g.done}<span class="muted" style="font-size:15px;font-weight:600">/${g.total}</span>`, "")}
    ${metric("Trùng ý", pct==null?"—":pct+"%", "")}
    ${metric("Gần đúng", g.near, "")}
    ${metric("Lệch hướng", g.miss, "")}
  </div>

  <div class="toolbar mt">
    <div class="field"><label class="lbl">Nghề</label>
      <select onchange="location.hash='#/drill/'+this.value">
        ${cats.map(k=>`<optgroup label="${esc(I18N.t(k.n))}">${window.CAREERS.filter(x=>x.cat===k.id && x.cases).map(x=>
          `<option value="${x.id}" ${x.id===c.id?"selected":""}>${esc(x.n)}</option>`).join("")}</optgroup>`).join("")}
      </select></div>
    ${mine && mine!==c.id && window.CAREER_BY_ID[mine] ? `<a class="btn btn-sm" href="#/drill/${mine}">Về nghề của bạn</a>` : ""}
    <div style="margin-left:auto" class="row"><a class="btn btn-sm" href="#/career/${c.id}">Xem lộ trình nghề →</a></div>
  </div>

  <div class="row mt" style="gap:12px">
    <span class="tile tile-lg t-${c.color}">${c.icon}</span>
    <div style="flex:1"><h2 style="font-size:19px;margin:0">${esc(c.n)}</h2><div class="small muted">${esc(c.vi)}</div></div>
    <span class="tag num">${cs.done}/${cs.total}</span>
  </div>

  ${c.cases.map((k,i)=>drillCard(c,k,i)).join("")}
  </div>`;
}

function drillCard(c, k, i){
  const key = `${c.id}-${i}`, r = State.drillRec(key);
  const head = `<div class="card-h"><div class="row" style="gap:8px"><span class="lbl">Câu</span><span class="lbl num">${i+1}</span></div>
    ${r&&r.verdict?`<span class="tag ${VERDICT[r.verdict].cls}">${VERDICT[r.verdict].n}</span>`:""}</div>`;
  const q = `<h3 style="margin:0 0 12px;line-height:1.45">${esc(k.q)}</h3>`;

  if(!r || !r.answer){
    return `<div class="card mt" id="drill-${key}">${head}<div class="card-b" style="padding-top:4px">${q}
      <textarea rows="4" style="width:100%;box-sizing:border-box" placeholder="Nước đi đầu tiên của bạn: bạn sẽ hỏi gì, chia vấn đề thế nào, kiểm tra điều gì trước?"
        oninput="DRILL.draft('${key}',this.value)">${esc(UI.draft[key]||"")}</textarea>
      <div class="row mt-s" style="justify-content:space-between;gap:10px;flex-wrap:wrap">
        <span class="small muted">Viết ít nhất một câu hoàn chỉnh trước khi xem gợi ý.</span>
        <button class="btn btn-sm btn-p" onclick="DRILL.submit('${key}')">So với gợi ý →</button>
      </div></div></div>`;
  }

  const mine = `<div class="lbl mb">Bạn trả lời</div><div class="callout" style="margin:0 0 10px;white-space:pre-wrap">${esc(r.answer)}</div>`;
  const model = `<div class="callout tip" style="margin:0"><b>Nước đi đầu tiên</b><div>${esc(k.move)}</div></div>`;

  if(!r.verdict){
    return `<div class="card mt" id="drill-${key}">${head}<div class="card-b" style="padding-top:4px">${q}${mine}${model}
      <div class="divider"></div>
      <div class="lbl mb">Tự chấm</div>
      <p class="small muted" style="margin:0 0 10px">So hướng đi, không so câu chữ. Bạn có chọn cùng cách chia vấn đề và cùng thứ cần kiểm tra trước không?</p>
      <div class="grid g3">
        ${Object.entries(VERDICT).map(([v,x])=>`<button class="btn" style="flex-direction:column;align-items:flex-start;text-align:left;height:auto;padding:10px 12px"
          onclick="DRILL.rate('${key}','${v}')"><b>${x.n}</b><span class="small muted">${x.d}</span></button>`).join("")}
      </div></div></div>`;
  }

  return `<div class="card mt" id="drill-${key}">${head}<div class="card-b" style="padding-top:4px">${q}${mine}${model}
    <div class="row mt-s" style="justify-content:space-between;gap:10px;flex-wrap:wrap">
      <span class="small muted">${r.verdict==="miss"?"Đã ghi vào Mistake Review.":VERDICT[r.verdict].d}</span>
      <button class="btn btn-sm" onclick="DRILL.retry('${key}')">Làm lại câu này</button>
    </div></div></div>`;
}

function find(key){
  const cut = key.lastIndexOf("-"), c = window.CAREER_BY_ID[key.slice(0,cut)];
  return c && c.cases ? {c, k:c.cases[+key.slice(cut+1)]} : null;
}
function focus(key){
  setTimeout(()=>{ const el=document.getElementById("drill-"+key); if(el) el.scrollIntoView({block:"center"}); }, 150);
}

window.vDrill = vDrill;
window.DRILL = {
  draft(key, v){ UI.draft[key] = v; },
  submit(key){
    const t = String(UI.draft[key]||"").trim();
    if(t.length < MIN_CHARS){ toast("Viết rõ hơn một chút trước khi xem gợi ý"); return; }
    State.answerDrill(key, t); delete UI.draft[key]; render(true); focus(key);
  },
  rate(key, v){
    const f = find(key); if(!f) return;
    const res = State.rateDrill(key, v, v==="miss" ? {
      src:"Câu mở đầu · "+f.c.n, bad:State.drillRec(key).answer, good:f.k.move,
      why:"Nước đi đầu tiên lệch hướng cho đề: "+f.k.q,
      lesson:["k-live-1",""] } : null);   // bài "Sáu mươi giây đầu"
    if(!res) return;
    toast(v==="miss" ? "Đã ghi vào Mistake Review" : res.gain ? `${VERDICT[v].n} · <b>+${res.gain} XP</b>` : VERDICT[v].n);
    render(true); focus(key);
  },
  retry(key){ State.resetDrill(key); render(true); focus(key); },
  random(){
    const todo = allKeys().filter(k=>{ const r=State.drillRec(k); return !r || !r.verdict; });
    if(!todo.length){ toast("Bạn đã tự chấm hết các câu"); return; }
    const key = todo[Math.floor(Math.random()*todo.length)];
    location.hash = "#/drill/" + key.slice(0, key.lastIndexOf("-")); focus(key);
  }
};

if(window.I18N) I18N.add({
  "Câu mở đầu theo nghề":"Opening moves by career",
  "Interviewer đọc đề và chờ bạn nói nước đi đầu tiên. Viết nó ra trước, rồi mới mở gợi ý và tự chấm thật lòng. Câu lệch hướng sẽ vào Mistake Review để ôn lại.":
    "The interviewer reads the brief and waits for your first move. Write it down first, then open the hint and grade yourself honestly. Off-track answers go to Mistake Review.",
  "Câu ngẫu nhiên chưa làm":"Random unanswered question",
  "Đã tự chấm":"Self-graded", "Trùng ý":"On track", "Gần đúng":"Close", "Lệch hướng":"Off track",
  "Nghề":"Career", "Về nghề của bạn":"Back to your career", "Xem lộ trình nghề →":"View career path →",
  "Câu":"Question",
  "Viết ít nhất một câu hoàn chỉnh trước khi xem gợi ý.":"Write at least one full sentence before opening the hint.",
  "So với gợi ý →":"Compare with hint →",
  "Nước đi đầu tiên của bạn: bạn sẽ hỏi gì, chia vấn đề thế nào, kiểm tra điều gì trước?":"Your first move: what do you ask, how do you split the problem, what do you check first?",
  "Bạn trả lời":"Your answer", "Tự chấm":"Grade yourself",
  "So hướng đi, không so câu chữ. Bạn có chọn cùng cách chia vấn đề và cùng thứ cần kiểm tra trước không?":
    "Compare direction, not wording. Did you split the problem the same way and check the same thing first?",
  "Cùng hướng phân tách chính với gợi ý":"Same main split as the hint",
  "Đúng hướng nhưng thiếu bước then chốt":"Right direction, missing the key step",
  "Bắt đầu từ chỗ khác hoặc nhảy vào giải pháp":"Started elsewhere or jumped to solutions",
  "Đã ghi vào Mistake Review.":"Logged to Mistake Review.",
  "Làm lại câu này":"Retry this question",
  "Viết rõ hơn một chút trước khi xem gợi ý":"Write a bit more before opening the hint",
  "Đã ghi vào Mistake Review":"Logged to Mistake Review",
  "Bạn đã tự chấm hết các câu":"You have graded every question",
  "Tự trả lời trước →":"Answer first yourself →",
  "Luyện câu mở đầu theo nghề":"Practise opening moves by career",
  "Câu hỏi case thật theo từng nghề: viết nước đi đầu tiên, so gợi ý, tự chấm.":"Real case questions for each career: write your first move, compare, grade yourself."
});
})();
