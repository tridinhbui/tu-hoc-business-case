/* node tools/perf-budget.js [--strict]
   Đo "cân nặng" của trang: số request và dung lượng JS/CSS mà index.html nạp ngay từ đầu,
   tách theo nhóm, và so với ngân sách trong KE-HOACH-HIEU-NANG.md.
   Dung lượng tính cả gốc lẫn gzip (thứ người dùng thật tải nếu server nén).
   --strict: thoát mã 1 khi vượt ngân sách — dùng làm cổng kiểm sau khi đã tối ưu. */
const fs=require("fs"), zlib=require("zlib"), path=require("path");
const ROOT=path.join(__dirname,"..");
const html=fs.readFileSync(path.join(ROOT,"index.html"),"utf8");
const scripts=[...html.matchAll(/<script src="([^"?]+)/g)].map(m=>m[1]).filter(f=>fs.existsSync(path.join(ROOT,f)));
const css=[...html.matchAll(/<link rel="stylesheet" href="([^"?]+)/g)].map(m=>m[1]).filter(f=>fs.existsSync(path.join(ROOT,f)));
const size=f=>{ const b=fs.readFileSync(path.join(ROOT,f)); return {raw:b.length, gz:zlib.gzipSync(b,{level:9}).length}; };
const group=f=> f.includes("/lessons-en/")?"Nội dung bài · tiếng Anh"
  : f.includes("/lessons/")?"Nội dung bài · 10 phần"
  : f.includes("/readings/")?"Bài đọc chuyên sâu"
  : /\/arena\d*\.js$/.test(f)?"Đề case (arena)"
  : f.includes("/data/")?"Dữ liệu khác"
  : "Logic ứng dụng";
const G={}; let T={n:0,raw:0,gz:0};
for(const f of scripts){ const s=size(f), g=group(f); G[g]=G[g]||{n:0,raw:0,gz:0}; G[g].n++; G[g].raw+=s.raw; G[g].gz+=s.gz; T.n++; T.raw+=s.raw; T.gz+=s.gz; }
const kb=x=>(x/1024).toFixed(0).padStart(5)+" KB";
console.log("\nJS NẠP NGAY KHI MỞ BẤT KỲ TRANG NÀO (index.html)");
console.log("  nhóm                          file      gốc      gzip");
for(const [g,v] of Object.entries(G).sort((a,b)=>b[1].gz-a[1].gz)) console.log("  "+g.padEnd(28), String(v.n).padStart(5), kb(v.raw), kb(v.gz));
console.log("  "+"TỔNG".padEnd(28), String(T.n).padStart(5), kb(T.raw), kb(T.gz));
for(const c of css){ const s=size(c); console.log("  CSS "+c.padEnd(24), "    1", kb(s.raw), kb(s.gz)); }

/* Dashboard thật sự cần gì: mọi thứ trừ nội dung bài, bài đọc và bản EN */
const lazyGroups=["Nội dung bài · 10 phần","Bài đọc chuyên sâu","Nội dung bài · tiếng Anh","Đề case (arena)"];
const shell=Object.entries(G).filter(([g])=>!lazyGroups.includes(g)).reduce((a,[,v])=>({n:a.n+v.n,gz:a.gz+v.gz}),{n:0,gz:0});
console.log("\nNẾU NẠP THEO NHU CẦU");
console.log("  Dashboard chỉ cần phần khung:", shell.n, "file ·", kb(shell.gz).trim(), "gzip  (hiện nạp", kb(T.gz).trim()+")");
/* Một bài học cần: khung + nội dung đúng 1 module + bài đọc của module đó */
const mods={};
for(const f of scripts){ const m=f.match(/\/(lessons|readings)\/([a-z]+-[a-z]+)/); if(!m) continue; mods[m[2]]=(mods[m[2]]||0)+size(f).gz; }
const per=Object.values(mods).sort((a,b)=>a-b);
console.log("  Mở 1 bài học: khung + 1 module ·", kb(shell.gz+per[Math.floor(per.length/2)]).trim(), "gzip (module trung vị),", kb(shell.gz+per[per.length-1]).trim(), "(module nặng nhất)");

/* Ước tính thời gian tải theo mạng — mô hình đơn giản, không thay được đo thật */
const nets=[["4G tốt",70,1.1],["4G yếu / 3G",300,0.2]];
console.log("\nƯỚC TÍNH THỜI GIAN TẢI JS (chưa tính font, CSS, CPU điện thoại)");
for(const [n,rtt,mbs] of nets){
  const h2=(rtt*3 + T.gz/1048576/mbs*1000), h1=(Math.ceil(T.n/6)*rtt + T.raw/1048576/mbs*1000);
  const lazy=(rtt*3 + shell.gz/1048576/mbs*1000);
  console.log("  "+n.padEnd(13)," hiện tại (HTTP/1.1, không nén) ≈",(h1/1000).toFixed(1)+"s","· HTTP/2 + gzip ≈",(h2/1000).toFixed(1)+"s","· nạp theo nhu cầu ≈",(lazy/1000).toFixed(1)+"s");
}

const BUDGET={dashboardJsGz:250*1024, requests:40};
const over=[]; if(T.gz>BUDGET.dashboardJsGz) over.push(`JS nạp ban đầu ${kb(T.gz).trim()} > ngân sách ${kb(BUDGET.dashboardJsGz).trim()}`);
if(T.n>BUDGET.requests) over.push(`${T.n} file JS > ngân sách ${BUDGET.requests}`);
console.log("\nNGÂN SÁCH:", over.length? "VƯỢT\n  - "+over.join("\n  - ") : "đạt");
if(process.argv.includes("--strict") && over.length) process.exit(1);
