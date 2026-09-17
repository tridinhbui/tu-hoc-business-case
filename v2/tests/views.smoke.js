/* node tests/views.smoke.js — vẽ mọi màn hình với state rỗng và state mẫu, bắt lỗi runtime */
const fs=require("fs"),vm=require("vm"),assert=require("assert");
const store={};
const ctx=vm.createContext({console,Date,JSON,Math,Number,String,Object,Array,Blob:function(){},URL:{},
  localStorage:{getItem:k=>k in store?store[k]:null,setItem:(k,v)=>{store[k]=String(v)}},
  document:{documentElement:{setAttribute(){},getAttribute(){}},getElementById:()=>null,querySelector:()=>null,querySelectorAll:()=>[]},
  addEventListener(){}, location:{hash:""}});
ctx.window=ctx;
for(const f of ["data/curriculum","data/careers","data/library","data/lessons/_registry",
  ...fs.readdirSync(__dirname+"/../assets/js/data/lessons").filter(x=>!x.startsWith("_")).map(x=>"data/lessons/"+x.replace(/\.js$/,"")),
  "state","scoring",
  ...fs.readdirSync(__dirname+"/../assets/js/data").filter(x=>/^arena\d*\.js$/.test(x)).map(x=>"data/"+x.replace(/\.js$/,"")),"competition","data/interview-detail","interview","app"])
  vm.runInContext(fs.readFileSync(__dirname+"/../assets/js/"+f+".js","utf8"),ctx,{filename:f+".js"});
const run = src => vm.runInContext(src, ctx);
let n=0;
function screens(label){
  const calls = ["vDashboard()","vTracks()","vLibrary()","vCareer()","vCompetition()","vInterview()","vReview()","vSettings()",
    "vArena()","vArena('cl-05')","vArena('khong-co')",
    "vCompetition()","vCompetition('cc-01')","vCompetition('khong-co')",
    "vInterview()","vInterview('iv-01')","vInterview('khong-co')",
    ...run("Object.keys(SCORING.cases)").map(id=>`vArena('${id}')`),
    ...run("CAREERS.map(c=>c.id)").map(id=>`vCareerDetail('${id}')`),
    ...run("LESSONS.map(l=>l.id)").map(id=>`vLesson('${id}')`)];
  calls.forEach(c=>{ const html=run(c); assert.ok(typeof html==="string" && html.length>200, c);
    assert.ok(!/undefined|NaN|\[object Object\]/.test(html.replace(/<[^>]*>/g," ")), `${label} ${c}: rò rỉ undefined/NaN`); n++; });
}
assert.ok(run("Object.keys(SCORING.cases).length")>=6, "arena.js chưa nạp");
run("State.reset()"); screens("rỗng");
run("State.seedDemo()"); screens("mẫu");
// thử bộ lọc thư viện và chip lỗi
run("LIB.mode='interview'"); assert.ok(run("vLibrary()").includes("Profitability: nhà máy nhựa")); run("LIB.mode='all'");
run("LIB.status='done'"); assert.equal((run("vLibrary()").match(/<tr style/g)||[]).length,3); run("LIB.status=''");
run("REV.kind='calculation'"); assert.equal((run("vReview()").match(/class=\"mist\"/g)||[]).length,1); run("REV.kind=''");
// phòng thi ở từng giai đoạn
run("COMP.start('cc-02',Date.now())"); assert.ok(run("vCompetition('cc-02')").includes("Deliverable 1"));
run("COMP.submit('cc-02',SCORING.cases['cc-02'].model,Date.now())"); assert.ok(run("vCompetition('cc-02')").includes("cs-0"));
run("COMP.submit('cc-02',COMP.CFG['cc-02'].slides,Date.now())"); assert.ok(run("vCompetition('cc-02')").includes("cq-0"));
run("COMP.submit('cc-02',COMP.CFG['cc-02'].qa.map(q=>q.model),Date.now())");
const res=run("vCompetition('cc-02')"); assert.ok(res.includes("Kết quả ban giám khảo") && !/undefined|NaN/.test(res.replace(/<[^>]*>/g," ")));
assert.ok(run("vCompetition()").includes("Đã nộp"));
// phòng phỏng vấn theo vòng
run("IVIEW.start('iv-01',Date.now())"); assert.ok(run("vInterview('iv-01')").includes("iv-ans"));
/* nút giọng nói: ẩn khi trình duyệt không có Web Speech API, hiện khi có */
assert.ok(!run("vInterview('iv-01')").includes("iv-mic"), "không có API thì không hiện nút micro");
run("window.webkitSpeechRecognition=function(){}"); assert.ok(run("vInterview('iv-01')").includes('id="mic-iv-ans"'));
run("delete window.webkitSpeechRecognition");
/* luyện riêng một vòng: chưa có bài · đang trả lời · đã trả lời · đã xong */
assert.ok(run("vInterview('drill')").includes("Chưa có bài luyện"));
for(let r=0;r<5;r++){
  run(`IVIEW.drillStart(${r},Date.now())`); assert.ok(run("vInterview('drill')").includes("ivd-ans"), "luyện vòng "+(r+1));
  run("IVIEW.drillHint()"); assert.ok(run("vInterview('drill')").includes("iv-hint"));
  run(`IVIEW.drillAnswer(IVIEW.CFG[IVIEW.drillItem().id].rounds[${r}].model)`); assert.ok(run("vInterview('drill')").includes("iv-points"));
  for(let k=0;k<5;k++){ run("IVIEW.drillItem() && IVIEW.drillItem().answer==null && IVIEW.drillAnswer('x')"); run("IVIEW.drillNext()"); }
  assert.ok(run("vInterview('drill')").includes("Luyện lại vòng này"));
  assert.ok(run("vInterview()").includes("Luyện riêng một vòng"));
}
run("IVIEW.drillStart(2,Date.now())"); assert.ok(run("vInterview()").includes("Đang luyện vòng")); run("IVIEW.drillReset()");
run("IVIEW.CFG['iv-01'].rounds.forEach(r=>IVIEW.answer('iv-01',r.model,Date.now()))");
const ivres=run("vInterview('iv-01')");
assert.ok(ivres.includes("Kết quả phỏng vấn") && !/undefined|NaN/.test(ivres.replace(/<[^>]*>/g," ")));
assert.ok(run("vInterview()").includes("Đã xong"));
/* lịch sử các lần: chỉ hiện từ lần thứ hai, kèm mức chênh so với lần trước */
assert.ok(!run("vInterview('iv-01')").includes("Các lần phỏng vấn"), "một lần thì chưa có lịch sử");
run("IVIEW.reset('iv-01'); IVIEW.start('iv-01',Date.now()); IVIEW.CFG['iv-01'].rounds.forEach((r,i)=>IVIEW.answer('iv-01', i?r.model:'qua loa', Date.now()))");
const ivhist=run("vInterview('iv-01')");
assert.ok(ivhist.includes("Các lần phỏng vấn") && /Lần 2 · \d+/.test(ivhist), "lịch sử hai lần");
assert.ok(run("vInterview()").includes("2 lần"), "thẻ case hiện số lần");
assert.ok(run("vInterview('iv-01')").includes("iv-probe"), "câu hỏi vặn hiện sau khi xong phiên");
run("IVIEW.probeAnswer('iv-01', IVIEW.probe('iv-01').model)");
const ivpr=run("vInterview('iv-01')"); assert.ok(ivpr.includes("Câu hỏi vặn") && !ivpr.includes("iv-probe") && ivpr.includes("3/3"));
console.log(`${n} lần vẽ màn hình không lỗi (100 bài × 2 trạng thái + các màn chính)`);
