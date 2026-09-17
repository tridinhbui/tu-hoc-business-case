/* node tools/apply-enrich.js <file lessons/*.js> <file enrich.json>
   Thay đúng từng trường (mini.q, nội dung/lời giải thích từng phương án, calc.q, calc.solution)
   bằng cách tìm literal cũ qua JSON.stringify. Phạm vi tìm được khoanh lại:
     mini.*  → chỉ trong đoạn `mini:{` … `calc:{` của đúng bài đó
     calc.*  → chỉ trong đoạn `calc:{` … `slide:{` của đúng bài đó
   Mỗi literal phải xuất hiện đúng một lần trong phạm vi; sai là dừng, không ghi gì. */
const fs=require("fs"), vm=require("vm");
const [,,lessonFile,enrichFile]=process.argv;
let src=fs.readFileSync(lessonFile,"utf8");
const ctx=vm.createContext({window:{}}); ctx.window.LESSON_CONTENT={};
ctx.LC=(id,c)=>{ ctx.window.LESSON_CONTENT[id]=c; };
vm.runInContext(src,ctx);
const C=ctx.window.LESSON_CONTENT, E=JSON.parse(fs.readFileSync(enrichFile,"utf8"));
let n=0;
const range=(id,from,to)=>{
  const b0=src.indexOf(`LC("${id}"`); if(b0<0) throw new Error("không thấy khối "+id);
  const nx=src.indexOf('\nLC("',b0+1), b1=nx<0?src.length:nx;
  const r0=src.indexOf(from,b0), r1=src.indexOf(to,r0);
  if(r0<0||r0>b1||r1<0||r1>b1) throw new Error(`${id}: không khoanh được đoạn ${from}…${to}`);
  return [r0,r1];
};
const swap=(id,sect,oldV,newV,label)=>{
  const [r0,r1]= sect==="mini" ? range(id,"mini:{","calc:{") : range(id,"calc:{","slide:{");
  const seg=src.slice(r0,r1), a=JSON.stringify(oldV), b=JSON.stringify(newV);
  const hits=seg.split(a).length-1;
  if(hits!==1) throw new Error(`${label}: tìm thấy ${hits} lần trong đoạn ${sect}, cần đúng 1`);
  src=src.slice(0,r0)+seg.replace(a,()=>b)+src.slice(r1); n++;
};
for(const [id,e] of Object.entries(E)){
  const c=C[id]; if(!c) throw new Error("không có bài "+id);
  const opt=k=>{ const o=c.mini.opts.find(x=>x[0]===k); if(!o) throw new Error(id+" không có phương án "+k); return o; };
  if(e.miniQ) swap(id,"mini",c.mini.q,e.miniQ,id+" mini.q");
  for(const [k,txt] of Object.entries(e.optText||{})) swap(id,"mini",opt(k)[1],txt,`${id} opt ${k}`);
  for(const [k,why] of Object.entries(e.why||{}))     swap(id,"mini",opt(k)[2],why,`${id} why ${k}`);
  if(e.calcQ)    swap(id,"calc",c.calc.q,e.calcQ,id+" calc.q");
  if(e.solution) swap(id,"calc",c.calc.solution,e.solution,id+" calc.solution");
}
fs.writeFileSync(lessonFile,src);
console.log(`đã thay ${n} trường trong ${Object.keys(E).length} bài`);
