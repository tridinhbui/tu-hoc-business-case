/* ===== PHÍM TẮT KHI LUYỆN TẬP =====
   1-9 chọn đáp án · Enter xác nhận/tiếp · H gợi ý.
   Nhận diện runtime đang chạy theo hash, để một chỗ duy nhất phục vụ cả case, lesson và exam. */
(function(){
function mode(){
  const h = location.hash;
  if(/^#\/(case|daily)\/[^/]+/.test(h) && window.PLAYER && PLAYER.cs) return "player";
  if(/^#\/lesson\//.test(h) && window.LESSON && LESSON.l) return "lesson";
  if(/^#\/exam\//.test(h) && window.EXAM && EXAM.ex) return "exam";
  return null;
}
function typingIn(e){ return /^(INPUT|TEXTAREA|SELECT)$/.test((e.target.tagName||"")) }

document.addEventListener("keydown", function(e){
  if(window.SEARCH && SEARCH.open) return;
  if(e.metaKey || e.ctrlKey || e.altKey) return;
  const m = mode(); if(!m) return;

  /* ---------- CASE PLAYER ---------- */
  if(m === "player"){
    const s = PLAYER.cs.steps[PLAYER.idx];
    if(e.key === "Enter"){
      e.preventDefault();
      PLAYER.revealed ? PLAYER.next() : PLAYER.submit();
      return;
    }
    if(typingIn(e)) return;
    if(PLAYER.revealed) return;
    if(/^[1-9]$/.test(e.key)){
      const i = parseInt(e.key,10)-1;
      if(s.options && s.options[i]){ e.preventDefault(); (s.kind==="multi"||s.kind==="tree") ? PLAYER.toggle(i) : PLAYER.pick(i) }
      else if(s.kind==="datalab" && s.tiles && s.tiles[i]){ e.preventDefault(); PLAYER.openTile(i) }
      return;
    }
    if((e.key==="h"||e.key==="H") && s.kind==="calc" && s.hint && !PLAYER.hint){ e.preventDefault(); PLAYER.hintOn() }
    return;
  }

  /* ---------- LESSON ---------- */
  if(m === "lesson"){
    if(LESSON.done && LESSON.ci >= LESSON.l.check.length) return;
    const q = LESSON.l.check[LESSON.ci];
    if(e.key === "Enter"){ e.preventDefault(); LESSON.revealed ? LESSON.next() : LESSON.submit(); return }
    if(typingIn(e)) return;
    if(LESSON.revealed) return;
    if(/^[1-9]$/.test(e.key) && q.options){
      const i = parseInt(e.key,10)-1;
      if(q.options[i]){ e.preventDefault(); q.kind==="multi" ? LESSON.toggle(i) : LESSON.pick(i) }
      return;
    }
    if((e.key==="h"||e.key==="H") && q.kind==="calc" && q.hint && !LESSON.hint){ e.preventDefault(); LESSON.hintOn() }
    return;
  }

  /* ---------- EXAM ---------- */
  if(m === "exam"){
    if(EXAM.done) return;
    const q = EXAM.ex.questions[EXAM.idx];
    if(e.key === "Enter"){
      e.preventDefault();
      EXAM.idx < EXAM.ex.questions.length-1 ? EXAM.go(1) : EXAM.finish();
      return;
    }
    if(typingIn(e)) return;
    if(e.key === "ArrowRight"){ e.preventDefault(); EXAM.go(1); return }
    if(e.key === "ArrowLeft"){ e.preventDefault(); EXAM.go(-1); return }
    if(/^[1-9]$/.test(e.key) && q.options){
      const i = parseInt(e.key,10)-1;
      if(q.options[i]){ e.preventDefault(); q.kind==="multi" ? EXAM.toggle(i) : EXAM.pick(i) }
    }
    return;
  }
});
})();
