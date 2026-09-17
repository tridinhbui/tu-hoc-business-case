/* node tests/interview.test.js — cổng QA cho Consulting Interview Mode */
const fs=require("fs"),vm=require("vm"),assert=require("assert");
const store={};
const ctx=vm.createContext({window:{},console,Date,JSON,Math,
  localStorage:{getItem:k=>k in store?store[k]:null,setItem:(k,v)=>{store[k]=String(v)}}});
ctx.window.localStorage=ctx.localStorage;
const dir=__dirname+"/../assets/js/";
[ "data/curriculum","data/careers","data/library","state","scoring",
  ...fs.readdirSync(dir+"data").filter(x=>/^arena\d*\.js$/.test(x)).map(x=>"data/"+x.replace(/\.js$/,"")),
  "data/interview-detail","interview" ].forEach(f=>vm.runInContext(fs.readFileSync(dir+f+".js","utf8"),ctx,{filename:f}));
vm.runInContext("var SCORING=window.SCORING, State=window.State;",ctx);
const W=ctx.window, I=W.IVIEW, S=W.State;
let n=0; const t=(name,fn)=>{ fn(); n++; console.log("  ✓",name); };
const ivs=W.CASES.filter(c=>c.mode==="interview");
const model=id=>({start:0, answers:I.CFG[id].rounds.map(r=>r.model)});

console.log("Cấu hình");
t(`đủ 5 vòng cho ${ivs.length} case phỏng vấn`,()=>{
  ivs.forEach(c=>{ const g=I.CFG[c.id]; assert.ok(g,c.id); assert.ok(W.SCORING.cases[c.id],"thiếu spec Arena "+c.id);
    assert.equal(g.rounds.length,5);
    g.rounds.forEach((r,i)=>{ assert.ok(r.q && r.model && r.note, c.id+" vòng "+(i+1));
      assert.ok(r.kw.length>=2); if(r.num!=null) assert.ok(r.tol>0); }); });
  assert.deepEqual(I.ROUNDS.map(r=>r.n),["Clarify","Structure","Case math","Chart reading","Recommendation"]);
});

console.log("\nCon số trong câu hỏi tính lại từ đề");
t("iv-01 · giảm 70 tỷ và cần tăng giá 12%",()=>{
  const prev=1000-600-300, now=1050-720-300;
  assert.equal(prev-now, I.CFG["iv-01"].rounds[2].num);
  assert.ok(Math.abs((720+300+100)/1000*100-100 - I.CFG["iv-01"].rounds[3].num) < 1e-9);
  assert.equal(600*0.2,120);
});
t("iv-02 · thị trường 14.560 tỷ và hoàn vốn 6,2 năm",()=>{
  assert.equal(14e6*0.2*2*52*50000/1e9, I.CFG["iv-02"].rounds[2].num);
  const rev=400*50000*360/1e9; assert.ok(Math.abs(8/(rev*0.18) - I.CFG["iv-02"].rounds[3].num) <= I.CFG["iv-02"].rounds[3].tol);
});

console.log("\nChấm điểm");
for(const c of ivs){
  t(`${c.id} · bài mẫu đạt 100 ở cả 5 vòng, không sinh lỗi`,()=>{
    const r=I.score(c.id, model(c.id));
    assert.equal(r.dims.length,5); r.dims.forEach(([k,v])=>assert.equal(v,100,`${k} = ${v}`));
    assert.equal(r.total,100); assert.equal(r.mistakes.length,0);
  });
  t(`${c.id} · bỏ trống và trả lời sai sinh đúng loại lỗi từng vòng`,()=>{
    const empty=I.score(c.id,{answers:[]});
    assert.equal(empty.total,0); assert.equal(empty.mistakes.length,5);
    assert.deepEqual(empty.mistakes.map(m=>m.kind),["logic","framework","calculation","exhibit","logic"]);
    empty.mistakes.forEach(m=>assert.ok(W.LESSON_BY_ID[m.lesson[0]],"bài gợi ý không tồn tại: "+m.lesson[0]));
    const m=model(c.id);   // vòng 3 giữ từ khoá nhưng bỏ hết con số
    const half={answers:m.answers.map((a,i)=>i===2?a.replace(/\d/g,""):a)};
    const r=I.score(c.id,half);
    assert.ok(r.dims[2][1]>0 && r.dims[2][1]<60,"đúng từ khoá nhưng thiếu con số → dưới 60: "+r.dims[2][1]);
    assert.ok(r.mistakes.some(x=>x.kind==="calculation"));
  });
}

console.log("\nPhiên phỏng vấn và tiến độ");
t("trả lời đủ 5 vòng ghi điểm, XP và lỗi vào State",()=>{
  S._setToday("2026-09-15"); S.reset();
  const id="iv-02", cfg=I.CFG[id]; I.start(id,1000); assert.equal(I.roundOf(I.get(id)),0);
  I.answer(id,cfg.rounds[0].model,2000); I.answer(id,cfg.rounds[1].model,3000);
  I.answer(id,"em nghĩ thị trường rất lớn",4000);           // vòng math: không có con số
  I.answer(id,cfg.rounds[3].model,5000);
  const sess=I.answer(id,cfg.rounds[4].model,6000);
  assert.equal(I.roundOf(sess),5); assert.ok(sess.result.recorded);
  assert.equal(sess.result.dims[2][1],0); assert.ok(sess.result.total>=70 && sess.result.total<100);
  assert.equal(S.casesSolved().length,1); assert.ok(S.xpTotal()>0);
  assert.ok(S.openMistakes().some(m=>m.kind==="calculation" && m.ref===id+"-r3"));
  assert.equal(S.data.cases[id].lastDims.length,5);
  assert.equal(I.answer(id,"thêm",7000),null,"không trả lời thêm sau khi xong");
});
t("dùng bài mẫu thì chấm nhưng không ghi tiến độ",()=>{
  S.reset(); const id="iv-01"; I.start(id,0); I.markModel(id);
  I.CFG[id].rounds.forEach((r,i)=>I.answer(id,r.model,i+1));
  const s=I.get(id); assert.equal(s.result.recorded,false); assert.equal(s.result.total,100);
  assert.equal(S.casesSolved().length,0); assert.equal(S.xpTotal(),0);
});
t("phiên lưu qua localStorage và làm lại được",()=>{
  S.reset(); I.start("iv-01",0); I.answer("iv-01",I.CFG["iv-01"].rounds[0].model,10);
  S._reload(); assert.equal(I.roundOf(I.get("iv-01")),1);
  I.reset("iv-01"); assert.equal(I.get("iv-01"),null);
});
console.log("\nExhibit theo vòng và chẩn đoán câu trả lời");
t(`${ivs.length} case · exhibit đưa đúng vòng câu hỏi nhắc tới, không exhibit nào đưa sau vòng Chart reading`,()=>{
  ivs.forEach(c=>{ const at=I.exhibitRounds(c.id), n=W.SCORING.cases[c.id].exhibits.length;
    assert.equal(at.length,n,c.id); at.forEach((r,k)=>assert.ok(r>=0 && r<=3,`${c.id} exhibit ${k+1} ở vòng ${r+1}`));
    assert.ok(at.some(r=>r<=2),c.id+": vòng Case math phải có số liệu");
    I.CFG[c.id].rounds.forEach((r,i)=>{ for(const m of r.q.matchAll(/Exhibit (\d)(?:\s*[–-]\s*(\d))?/g))
      for(let k=+m[1];k<=+(m[2]||m[1]);k++) assert.ok(at[k-1]<=i,`${c.id} vòng ${i+1} nhắc Exhibit ${k} chưa được đưa`); });
  });
  assert.deepEqual(I.exhibitRounds("iv-01"),[2,3,2]);   // Ex.3 hợp đồng không được nhắc → đưa ở vòng Case math
});
t("chẩn đoán khớp với điểm vòng: thiếu ý, thiếu số, bỏ trống",()=>{
  ivs.forEach(c=>I.CFG[c.id].rounds.forEach((r,i)=>{
    const d=I.diagnose(r,r.model); assert.ok(d.kw,`${c.id} r${i+1} câu mẫu có ý then chốt`);
    assert.equal(d.num, r.num==null?null:true);
    const empty=I.diagnose(r,""); assert.equal(empty.kw,false);
    const sc=I.scoreRound(r,r.model.replace(/\d/g,""));   // không truyền case → chỉ chấm theo cổng
    if(r.num!=null){ assert.equal(I.diagnose(r,r.model.replace(/\d/g,"")).num,false); assert.equal(sc,50); }
  }));
});
console.log("\nChi tiết từng vòng: gợi ý · 3 ý câu trả lời tốt · bẫy");
t(`${ivs.length} case × 5 vòng đều có gợi ý, 3 ý và bẫy; gợi ý không lộ con số`,()=>{
  ivs.forEach(c=>{ const D=W.IV_DETAIL[c.id]; assert.ok(D && D.length===5, "thiếu chi tiết "+c.id);
    D.forEach((d,i)=>{ const at=`${c.id} vòng ${i+1}`;
      assert.ok(d.hint && d.trap, at); assert.equal(d.points.length,3,at);
      assert.ok(!/\d/.test(d.hint.replace(/Exhibit \d(?:\s*[–-]\s*\d)?/g,"")), at+": gợi ý chứa con số");
      d.points.forEach(p=>assert.ok(typeof p[0]==="string" && (Array.isArray(p[1]) ? p[1].length>0 : typeof p[1]==="number"), at)); }); });
});
t("câu mẫu đạt đủ 3 ý ở mọi vòng; bỏ trống không đạt ý nào; bỏ số thì mất ý dạng con số",()=>{
  ivs.forEach(c=>I.CFG[c.id].rounds.forEach((r,i)=>{ const at=`${c.id} vòng ${i+1}`;
    assert.deepEqual(I.checkPoints(c.id,i,r.model),[true,true,true],at);
    assert.deepEqual(I.checkPoints(c.id,i,""),[false,false,false],at);
    const noNum=I.checkPoints(c.id,i,r.model.replace(/\d/g,""));
    W.IV_DETAIL[c.id][i].points.forEach((p,k)=>{ if(!Array.isArray(p[1])) assert.equal(noNum[k],false,at+" ý "+(k+1)); });
  }));
});
t("dùng gợi ý được ghi theo vòng và giữ qua localStorage",()=>{
  S.reset(); I.start("iv-03",0); I.useHint("iv-03"); I.answer("iv-03",I.CFG["iv-03"].rounds[0].model,1); I.useHint("iv-03");
  S._reload(); assert.deepEqual(I.get("iv-03").hints,[true,true]); I.reset("iv-03");
});
t("điểm vòng gộp cổng từ khoá/con số với số ý đạt được",()=>{
  const id="iv-12", r=I.CFG[id].rounds[0];
  const two="Em xin hỏi mục tiêu là lợi nhuận hay phủ thị trường, và ngân sách tối đa là bao nhiêu?";
  assert.deepEqual(I.checkPoints(id,0,two),[true,false,true]);
  assert.equal(I.scoreRound(r,two),100,"chỉ cổng: đủ từ khoá");
  assert.equal(I.scoreRound(r,two,id,0),83,"cổng 100 + đủ 2/3 ý → 83");
  ivs.forEach(c=>I.CFG[c.id].rounds.forEach((x,i)=>{
    assert.equal(I.scoreRound(x,x.model,c.id,i),100); assert.equal(I.scoreRound(x,"",c.id,i),0); }));
  const math=I.CFG["iv-01"].rounds[2];                     // chỉ nêu nguyên nhân, không có số nào
  assert.equal(I.scoreRound(math,"Chi phí hạt nhựa tăng mạnh hơn giá bán.","iv-01",2),25);
});
console.log(`\n${n} test đạt`);
