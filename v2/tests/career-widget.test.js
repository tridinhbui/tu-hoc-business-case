/* node tests/career-widget.test.js — thẻ "Nghề của bạn" ở Dashboard */
const fs=require("fs"),vm=require("vm"),assert=require("assert");
const store={};
const ctx=vm.createContext({window:{},console,Date,JSON,Math,
  localStorage:{getItem:k=>k in store?store[k]:null,setItem:(k,v)=>{store[k]=String(v)}}});
ctx.window.localStorage=ctx.localStorage;
const run=f=>vm.runInContext(fs.readFileSync(__dirname+"/../assets/js/"+f+".js","utf8"),ctx);
["data/curriculum","data/careers","data/library","state"].forEach(run);
ctx.window.I18N={t:s=>s,add(){}}; ctx.I18N=ctx.window.I18N;
["data/careers-detail","data/careers-detail-1","data/careers-detail-2","data/careers-detail-3","career-fit","career-widget"].forEach(run);
ctx.esc=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>"&#"+c.charCodeAt(0)+";");
ctx.bar=p=>`<i style="width:${p}%"></i>`;
const W=ctx.window, S=W.State;
let n=0; const t=(name,fn)=>{ fn(); n++; console.log("  ✓",name); };
S._setToday("2026-09-17"); S.reset();

t("chưa chọn nghề, chưa làm trắc nghiệm: mời làm trắc nghiệm",()=>{
  const d=W.careerWidgetData(); assert.equal(d.chosen,false); assert.equal(d.top,null);
  assert.ok(W.careerWidget().includes('href="#/fit"'));
});
t("chưa chọn nghề nhưng đã làm trắc nghiệm: gợi ý nghề hợp nhất",()=>{
  W.CAREER_FIT.QUESTIONS.forEach((q,i)=>S.answerCareerQuiz(q.id,[0,0,0,0,0,1,0,0,0][i]));
  const d=W.careerWidgetData(); assert.equal(d.top.id,"consulting");
  assert.ok(W.careerWidget().includes("CWIDGET.choose('consulting')"));
});
t("đã chọn nghề: tiến độ, bài tiếp theo thuộc track của nghề, câu mở đầu đầu tiên",()=>{
  S.setCareer("ib");
  const d=W.careerWidgetData(), c=W.CAREER_BY_ID.ib;
  assert.equal(d.chosen,true); assert.equal(d.done,0); assert.ok(d.total>0);
  assert.ok(c.tracks.includes(d.next.track)); assert.ok(!d.next.soon);
  assert.equal(d.nextQuestion,c.cases[0].q); assert.deepEqual([d.drill.done,d.drill.total],[0,3]);
  const html=W.careerWidget();
  assert.ok(html.includes('href="#/lesson/'+d.next.id+'"')); assert.ok(html.includes('href="#/drill/ib"'));
});
t("làm bài và drill: số liệu cập nhật, lỗi drill của đúng nghề được đếm",()=>{
  const d0=W.careerWidgetData(); S.completeLesson(d0.next.id);
  S.answerDrill("ib-0","Tính lại ba báo cáo theo thứ tự"); S.rateDrill("ib-0","hit");
  S.answerDrill("ib-1","Dùng P/E cho mọi trường hợp"); S.rateDrill("ib-1","miss",{src:"x",bad:"x",good:"y",why:"z",lesson:["k-live-1",""]});
  S.answerDrill("pe-0","Sai nghề khác"); S.rateDrill("pe-0","miss",{src:"x",bad:"x",good:"y",why:"z",lesson:["k-live-1",""]});
  const d=W.careerWidgetData();
  assert.equal(d.done,1); assert.notEqual(d.next.id,d0.next.id);
  assert.equal(d.drill.done,2); assert.equal(d.nextQuestion,W.CAREER_BY_ID.ib.cases[2].q);
  assert.equal(d.openDrillMistakes,1);
  assert.ok(W.careerWidget().includes("câu mở đầu lệch hướng cần ôn"));
});
t("tự chấm hết 3 câu: báo đã xong",()=>{
  S.answerDrill("ib-2","Phân tách P/E"); S.rateDrill("ib-2","near");
  assert.equal(W.careerWidgetData().nextQuestion,null);
  assert.ok(W.careerWidget().includes("Đã tự chấm cả 3 câu"));
});
console.log(`\n${n} test đạt`);
