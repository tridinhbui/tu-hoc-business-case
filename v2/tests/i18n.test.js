/* node tests/i18n.test.js — cổng QA cho hai chế độ ngôn ngữ VI / EN */
const fs=require("fs"),vm=require("vm"),assert=require("assert");
const ctx=vm.createContext({window:{},console,localStorage:{getItem:()=>null,setItem:()=>{}}});
const dir=__dirname+"/../assets/js/";
["data/curriculum","data/careers","data/library"].forEach(f=>vm.runInContext(fs.readFileSync(dir+f+".js","utf8"),ctx,{filename:f}));
vm.runInContext(fs.readFileSync(dir+"i18n.js","utf8"),ctx,{filename:"i18n"});
vm.runInContext("var I18N=window.I18N;",ctx);
["data/i18n-data","data/i18n-lessons"].forEach(f=>vm.runInContext(fs.readFileSync(dir+f+".js","utf8"),ctx,{filename:f}));
const W=ctx.window, I=W.I18N;
const VI=/[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i;
let n=0; const t=(name,fn)=>{ fn(); n++; console.log("  ✓",name); };

t("mặc định là tiếng Việt và không đổi chuỗi nào",()=>{
  assert.equal(I.lang,"vi");
  assert.equal(I.t("Nhiệm vụ hôm nay"),"Nhiệm vụ hôm nay");
});
t("bật EN thì dịch chuỗi cố định",()=>{
  I.set("en"); assert.equal(I.lang,"en");
  assert.equal(I.t("Nhiệm vụ hôm nay"),"Today's missions");
  assert.equal(I.t("Đề bài"),"The brief");
});
t("quy tắc dịch chuỗi có số",()=>{
  assert.equal(I.t("14/22 bài · Beginner"),"14/22 lessons · Beginner");
  assert.equal(I.t("14/22 bài · Beginner · thuộc lộ trình"),"14/22 lessons · Beginner · in your path");
  assert.equal(I.t("8 phút"),"8 min");
  assert.equal(I.t("Vòng 3"),"Round 3");
  assert.equal(I.t("hạn phút 45"),"due at min 45");
  assert.equal(I.t("Đã ôn (1/3)"),"Reviewed (1/3)");
  assert.equal(I.t("Sau 2 ngày"),"In 2 days");
  assert.equal(I.t("Nộp deliverable 2"),"Submit deliverable 2");
});
t(`${Object.keys(I.DICT).length} cặp dịch, không bản dịch nào còn dấu tiếng Việt`,()=>{
  /* tên riêng giữ nguyên khi dịch: thương hiệu nước ngoài và thương hiệu Việt */
const KEEP=/Nestlé|Bách Hoá Xanh|WinMart|Highlands|Thế Giới Di Động/g;
const bad=Object.entries(I.DICT).filter(([k,v])=>VI.test(v.replace(KEEP,"")));
  assert.deepEqual(bad.map(b=>b[0]),[]);
  Object.entries(I.DICT).forEach(([k,v])=>{ assert.ok(v && v.trim().length, "bản dịch rỗng: "+k); });
});
t("lớp dữ liệu (track · module · case · nghề) đã có bản tiếng Anh",()=>{
  const need=[];
  W.TRACKS.forEach(x=>need.push(x.vi,x.promise,x.for));
  W.MODULES.forEach(m=>need.push(m.n,m.vi));
  W.CASES.forEach(c=>need.push(c.t,c.hook));
  W.CAREERS.forEach(c=>need.push(c.vi,c.intro,c.gate,c.firms,...c.entry,...c.skills.map(s=>s.n),
                                 ...c.steps.map(s=>s.t),...c.steps.map(s=>s.d)));
  const missing=[...new Set(need)].filter(s=>s && VI.test(s) && !I.DICT[s]);
  assert.deepEqual(missing,[],"còn thiếu bản dịch");
});
t(`${W.LESSONS.length} tiêu đề bài học đã có bản tiếng Anh`,()=>{
  const missing=W.LESSONS.map(l=>l.t).filter(s=>VI.test(s) && !I.DICT[s]);
  assert.deepEqual(missing,[]);
});
/* nội dung bài học bản tiếng Anh */
const dirL=dir+"data/lessons/", dirE=dir+"data/lessons-en/";
vm.runInContext(fs.readFileSync(dirL+"_registry.js","utf8"),ctx); vm.runInContext("var LC=window.LC;",ctx);
fs.readdirSync(dirL).filter(f=>!f.startsWith("_")).forEach(f=>vm.runInContext(fs.readFileSync(dirL+f,"utf8"),ctx,{filename:f}));
vm.runInContext(fs.readFileSync(dirE+"_registry.js","utf8"),ctx); vm.runInContext("var LCEN=window.LCEN;",ctx);
fs.readdirSync(dirE).filter(f=>!f.startsWith("_")).forEach(f=>vm.runInContext(fs.readFileSync(dirE+f,"utf8"),ctx,{filename:"en/"+f}));
const VIC=W.LESSON_CONTENT, ENC=W.LESSON_CONTENT_EN;
t(`nội dung tiếng Anh: ${Object.keys(ENC).length}/${W.LESSONS.length} bài`,()=>{
  assert.ok(Object.keys(ENC).length>0);
  Object.keys(ENC).forEach(id=>assert.ok(VIC[id],"bài không tồn tại ở bản tiếng Việt: "+id));
});
t("bản tiếng Anh giữ nguyên đáp án của bản tiếng Việt",()=>{
  Object.entries(ENC).forEach(([id,en])=>{
    const vi=VIC[id];
    assert.equal(en.mini.correct, vi.mini.correct, id+" · đáp án mini case lệch");
    assert.equal(en.calc.answer, vi.calc.answer, id+" · đáp án bài tính lệch");
    assert.equal(en.calc.tol, vi.calc.tol, id+" · dung sai lệch");
    assert.equal(en.mini.kind, vi.mini.kind); assert.equal(en.arena, vi.arena);
    assert.equal(en.mini.opts.length,4); assert.equal(en.checklist.length,5);
    assert.ok(en.mistakes.length>=3); assert.ok(en.fw.rows.length>=3); assert.ok(en.ex.rows.length>=3);
    assert.ok(en.mini.opts.some(o=>o[0]===en.mini.correct));
  });
});
t("bản tiếng Anh đủ 10 phần như bản gốc",()=>{
  const parts=["why","outcome","scenario","fw","ex","mini","calc","slide","mistakes","checklist"];
  Object.entries(ENC).forEach(([id,en])=>{
    parts.forEach(k=>assert.ok(en[k], id+" thiếu phần "+k));
    assert.ok(en.scenario.text && en.scenario.ask, id+" · scenario thiếu nội dung");
    assert.ok(en.calc.solution && en.calc.hint && en.calc.unit, id+" · bài tính thiếu lời giải hoặc gợi ý");
    assert.ok(en.slide.headline && en.slide.left && en.slide.right && en.slide.rule, id+" · slide thiếu phần");
    assert.ok(en.fw.title && en.ex.label && en.ex.read, id+" · khung hoặc exhibit thiếu tiêu đề");
  });
});
t("bản tiếng Anh không còn dấu tiếng Việt",()=>{
  Object.entries(ENC).forEach(([id,en])=>{
    const txt=JSON.stringify(en).replace(/đ(?=\b|\/)/g,"d");   // "45,000đ" giữ ký hiệu tiền
    const hit=(txt.match(new RegExp(VI.source,"gi"))||[]).filter(ch=>ch!=="đ");
    assert.deepEqual([...new Set(hit)],[], id+" còn ký tự tiếng Việt");
  });
});

t("chuỗi lạ thì giữ nguyên, không dịch bừa",()=>{
  assert.equal(I.t("Một câu không có trong từ điển"),"Một câu không có trong từ điển");
  I.set("vi"); assert.equal(I.t("Đề bài"),"Đề bài");
});
console.log(`\n${n} test đạt`);
