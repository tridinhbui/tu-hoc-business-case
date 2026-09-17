/* node tests/compare.test.js — so sánh nghề: chuẩn hoá danh sách nghề trong URL và vẽ bảng không lỗi */
const fs=require("fs"),vm=require("vm"),assert=require("assert");
const ctx=vm.createContext({window:{},console});
for(const f of ["data/curriculum","data/careers"])
  vm.runInContext(fs.readFileSync(__dirname+"/../assets/js/"+f+".js","utf8"),ctx);
ctx.window.I18N={t:s=>s,add(){}}; ctx.I18N=ctx.window.I18N;
for(const f of ["data/careers-detail","data/careers-detail-1","data/careers-detail-2","data/careers-detail-3","career-fit","compare"])
  vm.runInContext(fs.readFileSync(__dirname+"/../assets/js/"+f+".js","utf8"),ctx);
const W=ctx.window, C=W.COMPARE;
ctx.esc=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>"&#"+c.charCodeAt(0)+";");
ctx.bar=p=>`<div class="bar"><i style="width:${p}%"></i></div>`;
let n=0; const t=(name,fn)=>{ fn(); n++; console.log("  ✓",name); };

t("giữ thứ tự, bỏ id lạ và id trùng, tối đa 3",()=>{
  assert.deepEqual([...C.parseIds("ib,khong-co,ib,pe,esg,founder")],["ib","pe","esg"]);
});
t("thiếu thì bù cho đủ 2 nghề, không trùng",()=>{
  assert.deepEqual([...C.parseIds("")],["consulting","strategy"]);
  assert.deepEqual([...C.parseIds("consulting")],["consulting","strategy"]);
  assert.equal(C.parseIds("pe").length,2);
});
t("ưu tiên bù bằng nghề đang theo",()=>{
  W.State={data:{career:"esg",careerQuiz:null}};
  assert.deepEqual([...C.parseIds("ib")],["ib","esg"]);
  assert.deepEqual([...C.parseIds("esg")],["esg","consulting"]);
});
t("vẽ bảng cho 2 và 3 nghề, đủ cột và các dòng chính",()=>{
  W.State={data:{career:null,careerQuiz:null}};
  for(const ids of ["ib,pe","consulting,founder,esg"]){
    const html=W.vCompare(ids), k=ids.split(",").length;
    const head=html.match(/<thead>[\s\S]*?<\/thead>/)[0];
    assert.equal((head.match(/<th[\s>]/g)||[]).length,k+1);
    ["Một tuần điển hình","Tính chất công việc","Quy trình tuyển dụng"].forEach(s=>assert.ok(html.includes(s),s));
  }
});
t("chỉ ra track học chung khi có",()=>{
  W.State={data:{career:null,careerQuiz:null}};
  assert.ok(W.vCompare("ib,pe").includes("Học chung được"));
});
t("hiện % mức hợp khi đã làm xong trắc nghiệm",()=>{
  const answers=Object.fromEntries(W.CAREER_FIT.QUESTIONS.map(q=>[q.id,0]));
  W.State={data:{career:null,careerQuiz:{answers}}};
  assert.ok(/\d+%<\/span><span class="tag">mức hợp/.test(W.vCompare("ib,pe")));
});
console.log(`\n${n} test đạt`);
