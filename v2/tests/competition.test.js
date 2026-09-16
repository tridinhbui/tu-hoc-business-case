/* node tests/competition.test.js — cổng QA cho Competition Simulator */
const fs=require("fs"),vm=require("vm"),assert=require("assert");
const store={};
const ctx=vm.createContext({window:{},console,Date,JSON,Math,
  localStorage:{getItem:k=>k in store?store[k]:null,setItem:(k,v)=>{store[k]=String(v)}}});
ctx.window.localStorage=ctx.localStorage;
const dir=__dirname+"/../assets/js/";
const files=["data/curriculum","data/careers","data/library","state","scoring",
  ...fs.readdirSync(dir+"data").filter(x=>/^arena\d*\.js$/.test(x)).map(x=>"data/"+x.replace(/\.js$/,"")),"competition"];
files.forEach(f=>vm.runInContext(fs.readFileSync(dir+f+".js","utf8"),ctx,{filename:f}));
const W=ctx.window, C=W.COMP, S=W.State;
vm.runInContext("var SCORING=window.SCORING, State=window.State;",ctx);
let n=0; const t=(name,fn)=>{ fn(); n++; console.log("  ✓",name); };
const comps=W.CASES.filter(c=>c.mode==="competition");
const model=id=>({start:0, s1:W.SCORING.cases[id].model, s2:C.CFG[id].slides, s3:C.CFG[id].qa.map(q=>q.model), at:[1,2,3]});

console.log("Cấu hình");
t(`đủ cấu hình cho ${comps.length} đề competition`,()=>{
  comps.forEach(c=>{ const g=C.CFG[c.id]; assert.ok(g,c.id); assert.ok(W.SCORING.cases[c.id],"thiếu spec Arena "+c.id);
    assert.ok(g.slides.length>=6 && g.slides.length<=8); assert.equal(g.qa.length,3);
    g.slides.forEach(h=>assert.ok(/\d/.test(h) && h.split(/\s+/).length>=7,"headline mẫu yếu: "+h)); });
});

console.log("\nĐáp án Q&A và headline tính lại từ đề");
t("cc-01 · hoàn vốn ở 3 tỷ EBITDA; hoa hồng 25% → 20%",()=>{
  assert.equal(900/(60*3),C.CFG["cc-01"].qa[0].num); assert.equal(400*5*0.05,100); assert.ok(Math.abs(400*(-0.65+1.25-0.48)-C.CFG["cc-01"].qa[1].num)<1e-9);
});
t("cc-02 · lãi mỗi khách ở 50% hoạt động",()=> assert.equal(0.5*250000-120000,C.CFG["cc-02"].qa[0].num));
t("cc-03 · trễ khi 50% đơn từ cửa hàng",()=> assert.equal(0.5*25+0.5*10,C.CFG["cc-03"].qa[0].num));

console.log("\nChấm điểm");
for(const c of comps){
  t(`${c.id} · bài mẫu ≥ 90 ở cả 7 tiêu chí, không sinh lỗi`,()=>{
    const r=C.score(c.id,model(c.id));
    assert.equal(r.dims.length,7); r.dims.forEach(([k,v])=>assert.ok(v>=90,`${k} = ${v}`));
    assert.equal(r.mistakes.length,0,JSON.stringify(r.mistakes.map(m=>m.kind))); assert.equal(r.late,0);
  });
  t(`${c.id} · bài trống 0 điểm; trễ hạn trừ trình bày; headline yếu và Q&A sai sinh lỗi`,()=>{
    const e=C.score(c.id,{start:0,at:[null,null,null]}); assert.equal(e.total,0); assert.equal(e.mistakes.length,0);
    const m=model(c.id), late={...m, at:[c.min*60000, 2, 3]};   // deliverable 1 nộp sau hạn 25%
    const base=C.score(c.id,m).dims[5][1], lr=C.score(c.id,late); assert.equal(lr.late,1); assert.equal(lr.dims[5][1],base-10);
    const weak=C.score(c.id,{...m, s2:["Tổng quan","Thị trường","Đối thủ","Tài chính","Rủi ro","Kết luận"]});
    assert.ok(weak.mistakes.some(x=>x.kind==="presentation")); assert.ok(weak.dims[4][1]<50);
    const qa=C.score(c.id,{...m, s3:["không biết","",""]}); assert.ok(qa.mistakes.some(x=>x.kind==="logic" && x.ref===c.id+"-qa"));
    assert.equal(qa.dims[6][1],0);
  });
}

console.log("\nPhiên thi và tiến độ");
t("nộp đủ 3 deliverable ghi điểm, XP và lỗi vào State",()=>{
  S._setToday("2026-09-15"); S.reset();
  const id="cc-03"; C.start(id,1000); assert.equal(C.stageOf(C.get(id)),0);
  C.submit(id,{...W.SCORING.cases[id].model, rec:"A"},2000); assert.equal(C.stageOf(C.get(id)),1);
  C.submit(id,["Tổng quan","Kết luận"],3000); assert.equal(C.stageOf(C.get(id)),2);
  const sess=C.submit(id,["không rõ","",""],4000); assert.equal(C.stageOf(sess),3);
  assert.ok(sess.result.recorded); assert.equal(S.casesSolved().length,1); assert.ok(S.xpTotal()>0);
  const kinds=S.openMistakes().map(m=>m.kind); ["logic","presentation"].forEach(k=>assert.ok(kinds.includes(k),k));
  assert.equal(S.data.cases[id].lastDims.length,7);
  assert.equal(C.submit(id,[],5000),null,"không nộp thêm sau khi xong");
});
t("dùng bài mẫu thì chấm nhưng không ghi tiến độ",()=>{
  S.reset(); const id="cc-01"; C.start(id,0); C.markModel(id);
  const m=model(id); C.submit(id,m.s1,1); C.submit(id,m.s2,2); const s=C.submit(id,m.s3,3);
  assert.equal(s.result.recorded,false); assert.ok(s.result.total>=90); assert.equal(S.casesSolved().length,0); assert.equal(S.xpTotal(),0);
});
t("phiên thi lưu qua localStorage và thi lại được",()=>{
  S.reset(); C.start("cc-02",0); C.submit("cc-02",W.SCORING.cases["cc-02"].model,10);
  S._reload(); assert.equal(C.stageOf(C.get("cc-02")),1);
  C.reset("cc-02"); assert.equal(C.get("cc-02"),null);
});
console.log(`\n${n} test đạt`);
