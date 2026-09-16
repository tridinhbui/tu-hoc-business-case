/* node tools/content-status.js [--todo]
   Bảng trạng thái nội dung: mỗi bài học / mỗi case phải có mặt ở ĐỦ các file.
   Thiếu một ô là sản phẩm gãy ở đâu đó — test sẽ chặn, nhưng test dừng ở lỗi đầu tiên,
   còn bảng này cho thấy toàn cảnh để lên kế hoạch viết. */
const fs=require("fs"), vm=require("vm"), path=require("path");
const R=p=>path.join(__dirname,"..",p), read=p=>fs.readFileSync(R(p),"utf8");
const ctx=vm.createContext({window:{},console,localStorage:{getItem:()=>null,setItem:()=>{}}});
const run=(p,as)=>{ vm.runInContext(read(p),ctx,{filename:p}); if(as) vm.runInContext(as,ctx); };

run("assets/js/data/curriculum.js"); run("assets/js/data/library.js"); run("assets/js/data/careers.js");
run("assets/js/i18n.js","var I18N=window.I18N;");
run("assets/js/data/i18n-data.js"); run("assets/js/data/i18n-lessons.js");
run("assets/js/data/lessons/_registry.js","var LC=window.LC;");
fs.readdirSync(R("assets/js/data/lessons")).filter(f=>!f.startsWith("_"))
  .forEach(f=>run("assets/js/data/lessons/"+f));
run("assets/js/data/lessons-en/_registry.js","var LCEN=window.LCEN;");
fs.readdirSync(R("assets/js/data/lessons-en")).filter(f=>!f.startsWith("_"))
  .forEach(f=>run("assets/js/data/lessons-en/"+f));
run("assets/js/state.js"); run("assets/js/scoring.js");
fs.readdirSync(R("assets/js/data")).filter(f=>/^arena\d*\.js$/.test(f))
  .forEach(f=>run("assets/js/data/"+f));

const W=ctx.window, DICT=W.I18N.DICT;
const lessonsTest = read("tests/lessons.test.js");
const scoringTest = read("tests/scoring.test.js");
const indexHtml   = read("index.html");
const todoOnly = process.argv.includes("--todo");
const mark = b => b ? "·" : "THIẾU";

let rows=0, gaps=0;
console.log("\nBÀI HỌC   giáo trình · nội dung VI · nội dung EN · tiêu đề EN · phép tính lại");
for(const l of W.LESSONS){
  const vi=!!W.LESSON_CONTENT[l.id], en=!!W.LESSON_CONTENT_EN[l.id];
  const title=!/[àáảãạăâđèéẻẽẹêìíỉĩịòóỏõọôơùúủũụưỳýỷỹỵ]/i.test(l.t) || !!DICT[l.t];
  const recompute=new RegExp(`"${l.id}"\\s*:`).test(lessonsTest);
  const cells=[true,vi,en,title,recompute];
  const bad=cells.some(c=>!c); if(bad) gaps++;
  if(!todoOnly || bad){ rows++;
    console.log("  "+l.id.padEnd(14)+cells.map(mark).map(s=>s.padEnd(10)).join("")); }
}
console.log(`  → ${W.LESSONS.length} bài, ${gaps} bài còn ô trống`);

let cgaps=0;
console.log("\nCASE      thư viện · đề đầy đủ · test tính lại · tiêu đề EN · nạp trong index.html");
for(const c of W.CASES){
  const spec=!!W.SCORING.cases[c.id];
  const test=new RegExp(`"${c.id} `).test(scoringTest);
  const title=!!DICT[c.t] && !!DICT[c.hook];
  const loaded=spec; // spec nạp được nghĩa là file arenaN đã có; kiểm tra thẻ script:
  const tag=/arena\d*\.js/.test(indexHtml);
  const cells=[true,spec,test,title,tag&&loaded];
  const bad=cells.some(x=>!x); if(bad) cgaps++;
  if(!todoOnly || bad)
    console.log("  "+c.id.padEnd(14)+cells.map(mark).map(s=>s.padEnd(10)).join(""));
}
console.log(`  → ${W.CASES.length} case, ${cgaps} case còn ô trống\n`);
process.exit(gaps+cgaps ? 1 : 0);
