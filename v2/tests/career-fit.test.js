/* node tests/career-fit.test.js — trắc nghiệm chọn nghề: hồ sơ hợp lệ và các chân dung điển hình ra đúng nghề */
const fs=require("fs"),vm=require("vm"),assert=require("assert");
const ctx=vm.createContext({window:{},console});
for(const f of ["data/careers","career-fit"])
  vm.runInContext(fs.readFileSync(__dirname+"/../assets/js/"+f+".js","utf8"),ctx);
const W=ctx.window, F=W.CAREER_FIT;
let n=0; const t=(name,fn)=>{ fn(); n++; console.log("  ✓",name); };
const ans = arr => Object.fromEntries(F.QUESTIONS.map((q,i)=>[q.id,arr[i]]));
const top = (arr,k=3) => F.score(ans(arr)).slice(0,k).map(r=>r.id);

t("mọi nghề có hồ sơ 8 trục giá trị 0–2",()=>{
  W.CAREERS.forEach(c=>{ const p=F.PROFILE[c.id]; assert.ok(p,c.id);
    assert.equal(Object.keys(p).length,8); Object.values(p).forEach(v=>assert.ok([0,1,2].includes(v),c.id)); });
});
t("mọi lựa chọn chỉ trỏ tới trục và nhóm nghề có thật",()=>{
  const cats=new Set(W.CAREER_CATS.map(c=>c.id));
  F.QUESTIONS.forEach(q=>q.opts.forEach(o=>{
    Object.keys(o.v||{}).forEach(k=>assert.ok(F.AXES[k],q.id+":"+k));
    if(o.cat) assert.ok(cats.has(o.cat),o.cat); }));
});
t("chưa trả lời gì: không lỗi, điểm 0",()=>{
  const r=F.score({}); assert.equal(r.length,W.CAREERS.length); assert.ok(r.every(x=>x.pct===0));
});
t("điểm nằm trong 0–100 và giảm dần",()=>{
  const r=F.score(ans([6,0,1,1,1,1,0,1,1]));
  r.forEach((x,i)=>{ assert.ok(x.pct>=0&&x.pct<=100); if(i) assert.ok(r[i-1].pct>=x.pct); });
});
t("chân dung consulting → Management Consulting trong top 3",()=>{
  assert.ok(top([0,0,0,0,0,1,0,0,0]).includes("consulting"));
});
t("chân dung vận hành hiện trường → toàn nghề nhóm vận hành",()=>{
  const r=F.score(ans([4,2,2,1,1,1,0,2,0])).slice(0,3);
  r.forEach(x=>assert.equal(W.CAREER_BY_ID[x.id].cat,"ops",x.id));
});
t("chân dung khởi nghiệp → Startup Founder đứng đầu",()=>{
  assert.equal(top([5,1,0,0,1,0,3,1,2],1)[0],"founder");
});
t("chân dung tác động xã hội, giờ ổn định → ESG hoặc khu vực công đứng đầu",()=>{
  assert.ok(["esg","publicsector"].includes(top([5,3,1,2,1,1,2,1,1],1)[0]));
});
t("chọn 'Chưa biết' không cộng điểm nhóm nào",()=>{
  F.score(ans([6,0,0,0,0,0,0,0,0])).forEach(x=>assert.ok(!x.why.includes("Đúng nhóm việc bạn tò mò nhất")));
});
t("mỗi gợi ý có lý do; 'cân nhắc' là câu mô tả trục hoặc null",()=>{
  F.score(ans([2,3,0,0,1,2,1,0,1])).slice(0,3).forEach(x=>{
    assert.ok(x.why.length>=1,x.id); assert.ok(x.watch===null||typeof x.watch==="string"); });
});
console.log(`\n${n} test đạt`);
