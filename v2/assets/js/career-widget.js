/* ════════ THẺ "NGHỀ CỦA BẠN" Ở DASHBOARD ════════
   Chưa chọn nghề → mời làm trắc nghiệm (hoặc gợi ý nghề hợp nhất nếu đã làm).
   Đã chọn → tiến độ lộ trình, bài học tiếp theo, câu mở đầu chưa làm, lỗi drill đang mở.
   Chỉ đọc State; gọi lúc vẽ nên dùng được esc, bar của app.js. */
(function(){
const card = inner => `<div class="card career-widget" style="border-radius:16px;margin-bottom:14px">${inner}</div>`;
const head = (label, extra) => `<div class="row" style="justify-content:space-between;gap:8px;margin-bottom:10px">
  <span class="lbl">${label}</span>${extra||""}</div>`;

function quizTop(){
  const S = window.State, F = window.CAREER_FIT, q = S && S.data.careerQuiz;
  if(!q || !F || !F.QUESTIONS.every(x=>q.answers[x.id]!=null)) return null;
  return F.score(q.answers)[0] || null;
}

/* dữ liệu thẻ tách riêng để test được không cần DOM */
function careerWidgetData(){
  const S = window.State, id = S.data.career, c = id && window.CAREER_BY_ID[id];
  if(!c) return {chosen:false, top:quizTop()};
  const tracks = c.tracks.map(t=>S.trackStats(t));
  const done = tracks.reduce((a,t)=>a+t.done,0), total = tracks.reduce((a,t)=>a+t.total,0);
  const next = window.LESSONS.find(l=>c.tracks.includes(l.track) && !l.soon && S.lessonStatus(l.id)!=="done") || null;
  const keys = (c.cases||[]).map((_,i)=>`${c.id}-${i}`);
  const drill = keys.length ? S.drillStats(keys) : null;
  const nextKey = keys.find(k=>{ const r=S.drillRec(k); return !r || !r.verdict; });
  const openDrillMistakes = S.openMistakes().filter(m=>String(m.ref).startsWith(`drill-${c.id}-`)).length;
  return {chosen:true, c, steps:S.careerProgress(c.id), done, total, next, drill,
          nextQuestion: nextKey ? c.cases[+nextKey.split("-").pop()].q : null, openDrillMistakes};
}

function careerWidget(){
  if(!window.State || !window.CAREERS) return "";
  const d = careerWidgetData();

  if(!d.chosen){
    const t = d.top && window.CAREER_BY_ID[d.top.id];
    return card(`<div class="card-b">
      ${head("Nghề của bạn")}
      ${t ? `<div class="row" style="gap:10px;margin-bottom:8px"><span class="tile t-${t.color}">${t.icon}</span>
          <div style="flex:1;min-width:0"><div style="font-weight:700">${esc(t.n)}</div>
          <div class="small muted"><span>Hợp nhất theo trắc nghiệm</span> · <span class="num">${d.top.pct}%</span></div></div></div>
        <div class="row" style="gap:8px;flex-wrap:wrap">
          <button class="btn btn-sm btn-p" onclick="CWIDGET.choose('${t.id}')">Chọn lộ trình</button>
          <a class="btn btn-sm btn-gh" href="#/fit">Xem cả 3 gợi ý</a></div>`
      : `<div style="font-weight:700;margin-bottom:4px">Chưa chọn nghề</div>
        <p class="small muted" style="margin:0 0 10px">Chọn nghề để thứ tự bài học, câu luyện và gợi ý bám đúng mục tiêu của bạn.</p>
        <div class="row" style="gap:8px;flex-wrap:wrap">
          <a class="btn btn-sm btn-p" href="#/fit">Làm trắc nghiệm 2 phút</a>
          <a class="btn btn-sm btn-gh" href="#/career">Xem 30 nghề</a></div>`}
    </div>`);
  }

  const c = d.c, pct = d.total ? Math.round(100*d.done/d.total) : 0;
  return card(`<div class="card-b">
    ${head("Nghề của bạn", `<a class="small muted" href="#/compare/${c.id}">So sánh</a>`)}
    <a class="row" href="#/career/${c.id}" style="gap:10px;margin-bottom:12px;text-decoration:none;color:inherit">
      <span class="tile t-${c.color}">${c.icon}</span>
      <div style="flex:1;min-width:0"><div style="font-weight:700">${esc(c.n)}</div><div class="small muted">${esc(c.vi)}</div></div>
      <span class="tag num">${d.steps}/${c.steps.length}</span>
    </a>
    <div class="row" style="gap:10px;margin-bottom:4px"><div style="flex:1">${bar(pct)}</div><span class="small num">${pct}%</span></div>
    <div class="small muted" style="margin-bottom:12px"><span class="num">${d.done}/${d.total}</span> <span>bài trong lộ trình</span></div>

    ${d.next ? `<a href="#/lesson/${d.next.id}" style="display:block;text-decoration:none;color:inherit;padding:10px 0;border-top:1px solid var(--border)">
      <div class="lbl" style="margin-bottom:3px">Học tiếp</div>
      <div class="row" style="justify-content:space-between;gap:8px"><span class="small" style="font-weight:600">${esc(d.next.t)}</span><span class="small muted">→</span></div></a>` : ""}

    ${d.drill ? `<a href="#/drill/${c.id}" style="display:block;text-decoration:none;color:inherit;padding:10px 0;border-top:1px solid var(--border)">
      <div class="row" style="justify-content:space-between;margin-bottom:3px"><span class="lbl">Câu mở đầu</span><span class="small muted num">${d.drill.done}/${d.drill.total}</span></div>
      ${d.nextQuestion ? `<div class="row" style="justify-content:space-between;gap:8px"><span class="small" style="font-weight:600;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${esc(d.nextQuestion)}</span><span class="small muted">→</span></div>`
        : `<div class="small muted">Đã tự chấm cả 3 câu</div>`}</a>` : ""}

    ${d.openDrillMistakes ? `<a href="#/review" class="callout warn" style="display:flex;justify-content:space-between;gap:8px;margin:10px 0 0;text-decoration:none;color:inherit">
      <span class="small"><span class="num">${d.openDrillMistakes}</span> <span>câu mở đầu lệch hướng cần ôn</span></span><span class="small">→</span></a>` : ""}
  </div>`);
}

window.careerWidget = careerWidget;
window.careerWidgetData = careerWidgetData;
window.CWIDGET = {
  choose(id){ State.setCareer(id); toast("Đã chọn lộ trình — thứ tự bài học được sắp lại"); render(true); }
};

if(window.I18N) I18N.add({
  "Nghề của bạn":"Your career", "Hợp nhất theo trắc nghiệm":"Best fit from your quiz",
  "Xem cả 3 gợi ý":"See all 3 suggestions", "Chưa chọn nghề":"No career chosen yet",
  "Chọn nghề để thứ tự bài học, câu luyện và gợi ý bám đúng mục tiêu của bạn.":
    "Pick a career so lesson order, practice and suggestions follow your goal.",
  "Làm trắc nghiệm 2 phút":"Take the 2-minute quiz", "Xem 30 nghề":"Browse 30 careers",
  "bài trong lộ trình":"lessons in your path", "Học tiếp":"Up next",
  "Câu mở đầu":"Opening moves", "Đã tự chấm cả 3 câu":"All 3 questions graded",
  "câu mở đầu lệch hướng cần ôn":"off-track opening moves to review"
});
})();
