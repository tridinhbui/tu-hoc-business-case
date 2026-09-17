/* node tools/rebalance-answers.js <lessons/k-*.js ...> [--dry]
   Rải đều vị trí đáp án đúng của mini case để người học không đoán được bằng cách luôn chọn một chữ.
   Cách làm: giữ nhãn A–D theo thứ tự, đổi chỗ NỘI DUNG (câu + lời giải thích) giữa phương án đúng
   và phương án ở vị trí đích, rồi sửa mini.correct. Sau khi ghi, nạp lại và kiểm tra nội dung
   phương án đúng không đổi. Chạy lại lần hai không đổi gì (vị trí đích xác định theo id). */
const fs=require("fs"), vm=require("vm");
const files=process.argv.slice(2).filter(a=>!a.startsWith("--")), dry=process.argv.includes("--dry");
const TMP="@@DOI_CHO_TAM@@";
const load=src=>{ const ctx=vm.createContext({window:{}}); ctx.window.LESSON_CONTENT={};
  ctx.LC=(id,c)=>{ctx.window.LESSON_CONTENT[id]=c;}; vm.runInContext(src,ctx); return ctx.window.LESSON_CONTENT; };

const all=[]; const srcs={};
for(const f of files){ srcs[f]=fs.readFileSync(f,"utf8"); for(const id of Object.keys(load(srcs[f]))) all.push([f,id]); }
all.sort((a,b)=>a[1].localeCompare(b[1],"en",{numeric:true}));
/* FNV-1a + trộn bit: id liền nhau (k-price-1, k-price-2…) phải ra vị trí không theo vòng */
const hash=s=>{ let h=0x811c9dc5; for(const ch of s){ h^=ch.charCodeAt(0); h=Math.imul(h,0x01000193); }
  h^=h>>>16; h=Math.imul(h,0x85ebca6b); h^=h>>>13; h=Math.imul(h,0xc2b2ae35); h^=h>>>16; return h>>>0; };
const L="ABCD", quota=Object.fromEntries([...L].map((x,i)=>[x,Math.floor(all.length/4)+(i<all.length%4?1:0)]));
const target={};
for(const [,id] of all){
  let k=hash(id)%4;
  for(let t=0;t<4 && quota[L[k]]===0;t++) k=(k+1)%4;
  target[id]=L[k]; quota[L[k]]--;
}

let moved=0; const before={};
for(const f of files){
  let src=srcs[f]; const C=load(src);
  for(const [id,c] of Object.entries(C)){
    const cur=c.mini.correct, tgt=target[id]; before[id]=c.mini.opts.find(o=>o[0]===cur)[1];
    if(cur===tgt) continue;
    const s0=src.indexOf(`LC("${id}"`); const nx=src.indexOf('\nLC("',s0+1); const s1=nx<0?src.length:nx;
    let blk=src.slice(s0,s1);
    const oc=c.mini.opts.find(o=>o[0]===cur), ot=c.mini.opts.find(o=>o[0]===tgt);
    const swapLit=(x,y)=>{ const a=JSON.stringify(x), b=JSON.stringify(y);
      if(blk.split(a).length!==2||blk.split(b).length!==2) throw new Error(`${id}: literal không duy nhất`);
      blk=blk.replace(a,()=>TMP).replace(b,()=>a).replace(TMP,()=>b); };
    swapLit(oc[1],ot[1]); swapLit(oc[2],ot[2]);
    const cc=`correct:"${cur}"`; if(blk.split(cc).length!==2) throw new Error(`${id}: correct không duy nhất`);
    blk=blk.replace(cc,`correct:"${tgt}"`);
    src=src.slice(0,s0)+blk+src.slice(s1); moved++;
  }
  const C2=load(src);
  for(const [id,c] of Object.entries(C2)){
    const now=c.mini.opts.find(o=>o[0]===c.mini.correct)[1];
    if(now!==before[id]) throw new Error(`${id}: nội dung đáp án đúng bị lệch sau khi đổi`);
    if(c.mini.correct!==target[id]) throw new Error(`${id}: chưa về vị trí đích`);
  }
  if(!dry) fs.writeFileSync(f,src);
}
const dist={}; Object.values(target).forEach(x=>dist[x]=(dist[x]||0)+1);
console.log(`${dry?"[thử] ":""}${all.length} bài · đổi chỗ ${moved} · phân bổ đáp án ${JSON.stringify(dist)}`);
