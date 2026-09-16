/* Bài đọc: kiểm tra khuôn tối thiểu — đủ dài, đủ mục, có đoạn thoại, có số liệu */
const fs=require("fs"), vm=require("vm"), assert=require("assert");
let n=0; const t=(name,fn)=>{fn(); n++; console.log("  ✓ "+name);};
const path=require("path");
const W={}; const ctx=vm.createContext({window:W});
const js=(f,alias)=>{ vm.runInContext(fs.readFileSync(path.join(__dirname,"../assets/js",f),"utf8"),ctx,{filename:f}); if(alias) vm.runInContext(alias,ctx); };
js("data/curriculum.js");
js("data/readings/_registry.js","var LRD=window.LRD;");
const dir=path.join(__dirname,"../assets/js/data/readings");
fs.readdirSync(dir).filter(f=>!f.startsWith("_")).forEach(f=>js("data/readings/"+f));
const R=W.READING, ids=Object.keys(R);

t(`bài đọc: ${ids.length}/${W.LESSONS.length} bài`,()=>{
  assert.ok(ids.length>0);
  ids.forEach(id=>assert.ok(W.LESSON_BY_ID[id], "bài đọc cho id không tồn tại: "+id));
});
t("mỗi bài đọc đủ dài và đủ mục",()=>{
  ids.forEach(id=>{ const x=R[id], w=x.split(/\s+/).length;
    assert.ok(w>=800, `${id} chỉ ${w} chữ — bài đọc phải từ 800 chữ trở lên`);
    assert.ok(w<=3200, `${id} dài ${w} chữ — cắt bớt cho vừa một lần đọc`);
    assert.ok((x.match(/^## /gm)||[]).length>=5, id+" cần ít nhất 5 mục ##");
  });
});
t("mỗi bài đọc có đoạn thoại mẫu và có số liệu",()=>{
  ids.forEach(id=>{ const x=R[id];
    assert.ok((x.match(/^> /gm)||[]).length>=3, id+" thiếu đoạn thoại mẫu (>= 3 dòng '> ')");
    assert.ok((x.match(/\d/g)||[]).length>=20, id+" thiếu số liệu trong phần làm mẫu");
  });
});
t("mở đầu bằng cảnh, không mở bằng tiêu đề",()=>{
  ids.forEach(id=>assert.ok(!R[id].startsWith("## "), id+" mở đầu bằng tiêu đề — phải mở bằng một cảnh cụ thể"));
});
t("không lẫn cú pháp lạ",()=>{
  ids.forEach(id=>{ assert.ok(!/`{3}/.test(R[id]), id+" có khối mã");
    assert.ok(!/^#{1}\s|^#{3,}\s/m.test(R[id]), id+" dùng cấp tiêu đề khác ## "); });
});
console.log(`\n${n} test đạt · ${ids.length} bài đọc`);
