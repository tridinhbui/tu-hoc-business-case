/* node tools/apply-enrich.js <file lessons/*.js> <file enrich.json>
   Thay đúng từng trường (calc.q, calc.solution, lời giải thích từng phương án mini)
   bằng cách tìm literal cũ qua JSON.stringify — mỗi literal phải xuất hiện đúng một lần,
   nếu không thì dừng và không ghi gì. */
const fs=require("fs"), vm=require("vm");
const [,,lessonFile,enrichFile]=process.argv;
let src=fs.readFileSync(lessonFile,"utf8");
const ctx=vm.createContext({window:{}}); ctx.window.LESSON_CONTENT={};
ctx.LC=(id,c)=>{ ctx.window.LESSON_CONTENT[id]=c; };
vm.runInContext(src,ctx);
const C=ctx.window.LESSON_CONTENT, E=JSON.parse(fs.readFileSync(enrichFile,"utf8"));
let n=0;
const swap=(oldV,newV,label)=>{
  const a=JSON.stringify(oldV), b=JSON.stringify(newV);
  const hits=src.split(a).length-1;
  if(hits!==1) throw new Error(`${label}: tìm thấy ${hits} lần, cần đúng 1`);
  src=src.replace(a,()=>b); n++;
};
for(const [id,e] of Object.entries(E)){
  const c=C[id]; if(!c) throw new Error("không có bài "+id);
  if(e.calcQ) swap(c.calc.q, e.calcQ, id+" calc.q");
  if(e.solution) swap(c.calc.solution, e.solution, id+" calc.solution");
  for(const [k,why] of Object.entries(e.why||{})){
    const o=c.mini.opts.find(x=>x[0]===k); if(!o) throw new Error(id+" không có phương án "+k);
    swap(o[2], why, `${id} why ${k}`);
  }
}
fs.writeFileSync(lessonFile,src);
console.log(`đã thay ${n} trường trong ${Object.keys(E).length} bài`);
