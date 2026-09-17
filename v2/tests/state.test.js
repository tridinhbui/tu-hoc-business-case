/* node tests/state.test.js — kiểm tra logic State không cần trình duyệt */
const fs=require("fs"),vm=require("vm"),assert=require("assert");
const store={};
const ctx=vm.createContext({window:{},console,Date,JSON,Math,
  localStorage:{getItem:k=>k in store?store[k]:null,setItem:(k,v)=>{store[k]=String(v)}}});
ctx.window.localStorage=ctx.localStorage;
for(const f of ["data/curriculum","data/careers","data/library","state"])
  vm.runInContext(fs.readFileSync(__dirname+"/../assets/js/"+f+".js","utf8"),ctx);
const W=ctx.window, S=W.State;
let n=0; const t=(name,fn)=>{ fn(); n++; console.log("  ✓",name); };

S._setToday("2026-09-13"); S.reset();

t("state rỗng ban đầu",()=>{
  assert.equal(S.xpTotal(),0); assert.equal(S.streak(),0);
  assert.equal(S.overall().done,0); assert.equal(S.overall().total,W.LESSONS.length);  // không chốt cứng số bài: giáo trình còn dài ra
  assert.equal(S.nextLesson().id,"f-sizing-1");
  assert.equal(S.level().title,"Intern");
});
t("hoàn thành bài: +50 XP, không cộng lần hai",()=>{
  assert.equal(S.completeLesson("f-sizing-1"),true);
  assert.equal(S.completeLesson("f-sizing-1"),false);
  assert.equal(S.xpTotal(),50); assert.equal(S.lessonStatus("f-sizing-1"),"done");
  assert.equal(S.trackStats("fundamentals").done,1);
  assert.equal(S.nextLesson().id,"f-sizing-2");
  assert.equal(S.missions()[0].done,true);
});
t("quiz chỉ tính lần trả lời đầu",()=>{
  S.answerQuiz("f-sizing-2","q1",false);
  S.answerQuiz("f-sizing-2","q1",true);
  assert.equal(S.lessonRec("f-sizing-2").quiz.q1.correct,false);
  assert.equal(S.xpTotal(),50);
  S.answerQuiz("f-sizing-2","q2",true); assert.equal(S.xpTotal(),60);
});
t("bài đang dở được ưu tiên học tiếp",()=>{
  S.touchLesson("i-profit-2"); assert.equal(S.nextLesson().id,"i-profit-2");
});
t("nộp case: XP lần đầu = điểm, lần sau chỉ phần vượt kỷ lục",()=>{
  const a=S.recordAttempt("cl-01",{scores:{},total:70,answers:{}});
  assert.equal(a.gain,70);
  const b=S.recordAttempt("cl-01",{scores:{},total:65,answers:{}});
  assert.equal(b.gain,0); assert.equal(b.best,70);
  const c=S.recordAttempt("cl-01",{scores:{},total:88,answers:{}});
  assert.equal(c.gain,18); assert.equal(c.attempts,3);
  assert.equal(S.avgScore(),88); assert.equal(S.missions()[2].done,true);
});
t("lỗi trùng chỗ được gộp và đếm lặp",()=>{
  S.addMistake({kind:"calculation",ref:"cl-01",src:"x",bad:"1",good:"2",why:"",lesson:["f-unit-1",""]});
  S.addMistake({kind:"calculation",ref:"cl-01",src:"x",bad:"3",good:"2",why:"",lesson:["f-unit-1",""]});
  assert.equal(S.openMistakes().length,1);
  assert.equal(S.openMistakes()[0].count,2); assert.equal(S.openMistakes()[0].bad,"3");
  assert.equal(S.mistakesByKind().calculation,1);
});
t("ôn giãn cách 1→3→7 rồi coi như đã sửa",()=>{
  const id=S.openMistakes()[0].id;
  let m=S.reviewMistake(id); assert.equal(m.due,"2026-09-16"); assert.equal(m.resolved,false);
  m=S.reviewMistake(id);     assert.equal(m.due,"2026-09-20");
  m=S.reviewMistake(id);     assert.equal(m.resolved,true);
  assert.equal(S.openMistakes().length,0); assert.equal(S.missions()[3].done,true);
});
t("streak: hôm nay chưa học vẫn giữ chuỗi của hôm qua",()=>{
  S._setToday("2026-09-14"); assert.equal(S.streak(),1);
  S._setToday("2026-09-15"); assert.equal(S.streak(),0);
  S._setToday("2026-09-13");
});
t("lưu và nạp lại từ localStorage",()=>{
  const xp=S.xpTotal(); S._reload(); assert.equal(S.xpTotal(),xp);
  assert.equal(S.lessonStatus("f-sizing-1"),"done");
});
t("export → import khôi phục nguyên trạng; file rác bị từ chối",()=>{
  const dump=S.exportJSON(); S.reset(); assert.equal(S.xpTotal(),0);
  S.importJSON(dump); assert.equal(S.lessonStatus("f-sizing-1"),"done");
  assert.throws(()=>S.importJSON('{"v":1}'));
  assert.throws(()=>S.importJSON("không phải json"));
});
t("dữ liệu mẫu khớp prototype",()=>{
  S.seedDemo();
  /* curriculum có thể mở rộng, nên kiểm tra tính nhất quán thay vì một con số cố định */
  const f=S.trackStats("fundamentals");
  assert.ok(f.done>0 && f.done<=f.total, "seedDemo phải có bài đã học ở track nền tảng");
  assert.equal(f.pct, Math.round(f.done/f.total*100));
  assert.equal(S.overall().done, W.TRACKS.reduce((a,t)=>a+S.trackStats(t.id).done,0));
  assert.equal(S.lessonStatus("f-profit-2"),"in_progress");
  assert.equal(S.streak(),6);
  assert.equal(S.casesSolved().length,3);
  assert.equal(S.nextLesson().id,"f-profit-2");
  assert.equal(S.openMistakes().length,5); assert.equal(S.dueToday(),2);
  assert.equal(S.data.career,"consulting");
  S.data.mistakes.forEach(m=>assert.ok(W.LESSON_BY_ID[m.lesson[0]],"bài gợi ý tồn tại: "+m.lesson[0]));
  S.data.mistakes.forEach(m=>assert.ok(W.CASE_BY_ID[m.ref],"case tồn tại: "+m.ref));
});
t("career: lộ trình tính theo track đã xong 100%",()=>{
  S.reset(); assert.equal(S.careerProgress("consulting"),0);
  W.LESSONS.filter(l=>l.track==="fundamentals").forEach(l=>S.completeLesson(l.id));
  assert.equal(S.careerProgress("consulting"),1);
  S.setCareer("marketing"); assert.equal(S.careerTrackOrder()[1],"marketing");
  S.setCareer("khong-co"); assert.equal(S.data.career,null);
});
t("cấp độ theo ngưỡng XP",()=>{
  S.reset(); W.LESSONS.slice(0,20).forEach(l=>S.completeLesson(l.id));   // 1000 XP
  assert.equal(S.level().title,"Case Challenger"); assert.equal(S.level().lv,4);
});
t("câu mở đầu: XP chỉ ở lần chấm đầu, lệch hướng vào Mistake Review",()=>{
  S.reset();
  assert.equal(S.answerDrill("consulting-0","   "),null);
  assert.equal(S.rateDrill("consulting-0","hit"),null);                 // chưa trả lời thì không chấm
  S.answerDrill("consulting-0","Tách lợi nhuận thành doanh thu và chi phí");
  assert.equal(S.rateDrill("consulting-0","hit").gain,10); assert.equal(S.xpTotal(),10);
  assert.equal(S.rateDrill("consulting-0","hit").gain,0);                // chấm lại không cộng
  S.resetDrill("consulting-0"); assert.equal(S.drillRec("consulting-0").answer,null);
  assert.equal(S.rateDrill("consulting-0","hit"),null);
  S.answerDrill("consulting-1","Nhảy thẳng vào giải pháp giảm giá vé");
  const m={src:"Câu mở đầu · test", bad:"x", good:"y", why:"z"};
  assert.equal(S.rateDrill("consulting-1","miss",m).gain,0);
  assert.equal(S.openMistakes().length,1); assert.equal(S.openMistakes()[0].ref,"drill-consulting-1");
  S.answerDrill("consulting-1","Lại sai"); S.rateDrill("consulting-1","miss",m);
  assert.equal(S.openMistakes().length,1); assert.equal(S.openMistakes()[0].count,2);   // gộp lỗi lặp
  assert.equal(S.rateDrill("consulting-1","bogus"),null);
  const st=S.drillStats(["consulting-0","consulting-1","consulting-2"]);
  assert.deepEqual([st.done,st.total,st.hit,st.miss],[1,3,0,1]);
});
console.log(`\n${n} test đạt`);
