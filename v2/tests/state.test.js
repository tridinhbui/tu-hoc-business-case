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
t("trackStats tách bài đã có nội dung khỏi bài đang soạn",()=>{
  S.reset();
  const st=S.trackStats("fundamentals");
  assert.equal(st.ready+st.soon, st.total);
  assert.ok(st.ready>0);
  const ls=W.LESSONS.filter(l=>l.track==="fundamentals" && !l.soon);
  ls.forEach(l=>S.completeLesson(l.id));
  const after=S.trackStats("fundamentals");
  assert.equal(after.readyPct,100);                       // học hết bài có nội dung là 100%
  assert.equal(after.pct, Math.round(100*after.done/after.total));
});
t("chặng lộ trình nghề tính theo bài đã có nội dung",()=>{
  S.reset(); assert.equal(S.careerProgress("consulting"),0);
  W.LESSONS.filter(l=>l.track==="fundamentals" && !l.soon).forEach(l=>S.completeLesson(l.id));
  assert.equal(S.careerProgress("consulting"),1);         // trước đây kẹt ở 0 vì track còn bài đang soạn
});
t("vàng = XP đã kiếm trừ phần đã tiêu; tiêu vàng không làm giảm XP hay cấp",()=>{
  S.reset(); S._setToday("2026-09-13");
  assert.equal(S.gold(),0);
  assert.match(S.buy("freeze"), /Cần 150 vàng/);                        // không đủ vàng thì không mua được
  W.LESSONS.slice(0,4).forEach(l=>S.completeLesson(l.id));              // 200 XP
  const xp=S.xpTotal(), lv=S.level().lv;
  assert.equal(S.buy("freeze"),null);
  assert.equal(S.gold(), xp-150); assert.equal(S.xpTotal(), xp); assert.equal(S.level().lv, lv);
  assert.equal(S.inv().freeze,1);
  assert.equal(S.buy("khong-co"),"Không có món này.");
});
t("thẻ giữ chuỗi: giới hạn số thẻ, và chỉ dùng khi có chuỗi thật để giữ",()=>{
  S.reset(); S._setToday("2026-09-10");
  W.LESSONS.slice(0,8).forEach(l=>S.completeLesson(l.id));              // 400 XP, học ngày 10
  assert.equal(S.buy("freeze"),null); assert.equal(S.buy("freeze"),null);
  assert.match(S.buy("freeze"), /tối đa 2/);
  S._setToday("2026-09-11"); assert.equal(S.applyStreakFreeze(),null);   // hôm qua (10) có học: không tiêu thẻ
  S._setToday("2026-09-12");                                            // bỏ ngày 11
  assert.equal(S.applyStreakFreeze(),"2026-09-11");
  assert.equal(S.inv().freeze,1); assert.equal(S.streak(),2);           // ngày 10 + ngày 11 đã được giữ
  S._setToday("2026-09-20"); assert.equal(S.applyStreakFreeze(),null);   // chuỗi đã đứt từ lâu: không phí thẻ
  assert.equal(S.inv().freeze,1);
  S._setToday("2026-09-13");
});
t("giao diện mua một lần, bật tắt được, không mua lại được",()=>{
  S.reset(); W.LESSONS.slice(0,8).forEach(l=>S.completeLesson(l.id));
  assert.equal(S.buy("theme-ocean"),null); assert.equal(S.inv().theme,"theme-ocean");
  assert.equal(S.buy("theme-ocean"),"Bạn đã có món này.");
  S.equip("theme-ocean"); assert.equal(S.inv().theme,null);
  S.equip("theme-ocean"); assert.equal(S.inv().theme,"theme-ocean");
  S.equip("theme-plum"); assert.equal(S.inv().theme,"theme-ocean");      // chưa mua thì không dùng được
});
t("bộ thẻ suy ra từ tiến độ: có thẻ khi có bằng chứng, mất khi bằng chứng mất",()=>{
  S.reset();
  const has = id => S.cards().find(c=>c.id===id).owned;
  assert.equal(has("case-1"),false);
  S.recordAttempt("cl-01",{scores:{},total:92,answers:{}});
  assert.equal(has("case-1"),true); assert.equal(has("case-90"),true);
  S.addMistake({kind:"calculation",ref:"cl-01",src:"x",bad:"1",good:"2",why:"",lesson:["f-unit-1",""]});
  assert.equal(has("fix-calculation"),false);                           // đang mở thì chưa có thẻ
  const id=S.openMistakes()[0].id; S.reviewMistake(id); S.reviewMistake(id); S.reviewMistake(id);
  assert.equal(has("fix-calculation"),true);
  S.reset(); assert.equal(has("case-1"),false);                         // xoá tiến độ thì thẻ cũng không còn
});
t("thông báo chỉ gồm việc thật, và 'đã xem' reset theo ngày",()=>{
  S.reset(); S._setToday("2026-09-13");
  assert.ok(S.notifications().every(n=>!/lỗi sai tới hạn|Chuỗi/.test(n.text)));   // chưa có gì thì không báo lỗi hay chuỗi
  W.LESSONS.slice(0,1).forEach(l=>S.completeLesson(l.id));
  S._setToday("2026-09-14");
  assert.ok(S.notifications().some(n=>/Chuỗi 1 ngày sẽ đứt/.test(n.text)));
  const before=S.unreadCount(); assert.ok(before>0);
  S.markNotifsSeen(); assert.equal(S.unreadCount(),0);
  S._setToday("2026-09-15");                                            // hôm sau, việc còn chờ thì báo lại
  assert.ok(S.unreadCount()>0 || S.notifications().length===0);
  S._setToday("2026-09-13");
});
console.log(`\n${n} test đạt`);
