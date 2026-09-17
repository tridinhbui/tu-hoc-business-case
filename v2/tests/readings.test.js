/* Bài đọc: kiểm tra khuôn tối thiểu — đủ dài, đủ mục, có đoạn thoại, có số liệu */
const fs=require("fs"), vm=require("vm"), assert=require("assert");
let n=0; const t=(name,fn)=>{fn(); n++; console.log("  ✓ "+name);};
const path=require("path");
const W={}; const ctx=vm.createContext({window:W});
const js=(f,alias)=>{ vm.runInContext(fs.readFileSync(path.join(__dirname,"../assets/js",f),"utf8"),ctx,{filename:f}); if(alias) vm.runInContext(alias,ctx); };
js("data/curriculum.js");
js("data/readings/_registry.js","var LRD=window.LRD, LRDX=window.LRDX;");
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

/* phần đào sâu: đủ ba mục, và mọi con số trong ví dụ mới được tính lại */
const r1=x=>Math.round(x*10)/10;
const eq=(a,b)=>assert.ok(Math.abs(a-b)<1e-6, `${a} ≠ ${b}`);
const DEEP = {
  "f-sizing-1": ()=>{ eq(1.2e6*0.15*150*45000/1e9,1215); eq(2430*0.2,486); eq(2e6*0.25*12*80000/1e9,480); eq(50000*2*50*60000/1e9,300); },
  "f-sizing-2": ()=>{ eq(27e6*0.02,540000); eq(Math.round((2.16e6+540000)/1e5)/10,2.7); eq(2.16e6/0.75,2.88e6); eq(50e6*2/2,50e6); eq(25000*6*330,49.5e6); eq(27e6*0.9/6,4.05e6); },
  "f-sizing-3": ()=>{ eq(5475*0.8,4380); eq(5475e6*4000/1e9,21900); eq(33e6*0.7*52/1e6,1201.2); eq(100e6*0.9*4,360e6); eq(100e6*0.9*2,180e6); },
  "f-sizing-4": ()=>{ eq(1e6*8*45000/1e9,360); eq(600e9/(10*50000),1.2e6); eq(1e6*24*60000/1e9,1440); eq(0.8e6*24*60000/1e9,1152); eq(1.2e6*24*60000/1e9,1728); eq(1e6*18*60000/1e9,1080); eq(1e6*30*60000/1e9,1800);
      eq(1e6*24*50000/1e9,1200); eq(1e6*24*70000/1e9,1680); eq(300000*12*1.5e6/1e9,5400); eq(200000*12*1.5e6/1e9,3600); eq(400000*12*1.5e6/1e9,7200); eq(300000*12*1.2e6/1e9,4320); eq(300000*12*1.8e6/1e9,6480); },
  "f-sizing-5": ()=>{ eq(64000*0.95,60800); eq(64000*0.3,19200); eq(19200*1.5e6*9/1e9,259.2); eq(Math.round(100e6/75/1e4)/100,1.33); eq(Math.round(100e6/75*2/1e4)/100,2.67);
      eq(Math.round((1-100e6/75/1.5e6)*100),11); eq(9e6/75,120000); eq(120000*4*0.4,192000); },
  "f-sizing-6": ()=>{ eq(Math.round(1.2e6*0.3*3*50*45000/1e9),2430); eq(Math.round(1.237e6*0.28*2.8*49*46000/1e9),2186); eq(Math.round(97.3e6*0.12*4.3*83000/1e9),4167);
      eq(100e6*0.1*4*80000/1e9,3200); eq(Math.round((4167-3200)/4167*100),23); eq(3e6*0.2*10*50000/1e9,300); eq(Math.round(2.9e6*0.18*11*52000/1e8)/10,298.6); assert.ok((300-298.584)/298.584<0.005); },
  "f-sizing-7": ()=>{ eq(640000+5000*60,940000); assert.ok((1.2e6-940000)/940000<0.3); eq(640000*25000*365/1e9,5840); eq(20*4,80); eq(10000*150,1.5e6); eq(9e6*0.15,1.35e6); eq(Math.round((1.5e6-1.35e6)/1.35e6*100),11); eq(2000*8*300*300000/1e9,1440); },
  "f-sizing-8": ()=>{ eq(2430*0.6,1458); eq(1458*0.08,116.64); eq(77.76/12,6.48); eq(60000*3e6/1e9,180); eq(180*0.35,63); eq(63*0.1,6.3); eq(Math.round(100e6/75*0.4*9*1e6/1e9),4800); eq(4800*0.25,1200); eq(1200*0.02,24); },
  "f-sizing-9": ()=>{ eq(Math.round(1.2e6*0.3*2.2*50*45000/1e9),1782); eq(Math.round(2430e9/(30*360*42000)/100)*100,5400); eq(5e6*2*250000/1e9,2500); eq(3000*8*330*250000/1e9,1980); eq(Math.round(520/1980*100),26); eq((600-200)/200*100,200); },
  "f-sizing-10": ()=>{ eq(2e6*0.1*100*15000/1e9,300); eq(2e6*0.3*100*15000/1e9,900); eq(4*30*360,43200); eq(Math.round(40e6/43200),926); eq(1e6*0.25*40*40000/1e9,400); eq(5e6*0.05*360*3000/1e9,270); },
  "f-sizing-11": ()=>{ eq(1.2e6*0.2*2*50*45000/1e9,1080); eq(1.2e6*0.4*4*50*45000/1e9,4320); eq(4320/1080,4); assert.ok(1620>1500 && 1080<1500); eq(5e6*0.02*1.5e6/1e9,150); eq(5e6*0.01*1.5e6/1e9,75); eq(5e6*0.04*1.5e6/1e9,300); eq(650-400,250); eq(520-450,70); },
  "f-sizing-12": ()=>{ eq(1200/200,6); eq(1200/12,100); eq(Math.round(19.44e9/40000),486000); eq(486000/360,1350); eq(Math.round((1-40/45)*100),11); eq(486000/432000,1.125); eq(432000/30,14400); eq(14400*150000/1e9,2.16);
      eq(6.3*0.25,1.575); eq(1.575e9/3e6,525); eq(Math.ceil(525/12),44); eq(Math.ceil(525/12/15),3); eq(40*0.3,12); eq(12e9/60000,200000); eq(Math.round(200000/360),556); eq(Math.round(1350-1200),150); eq(Math.round(150/12),13); },
  "f-profit-1": ()=>{ eq(87.5+55+45+10,197.5); eq(114+60+45+30,249); eq(300*0.35-250*0.35,17.5); assert.ok(Math.abs(300*0.03-9)<1e-9);
      eq(300-114-60-45-10,71); eq(250-250*0.38-60-45-10,40); eq(500-200-180,120); eq(550-550*0.42-190,129); eq(r1(129/550*100),23.5); },
  "f-profit-3": ()=>{ eq(900*0.8-600,120); eq(r1(880/280),3.1); eq(5000-3000-1800,200); eq(2000/200,10); eq(5000*0.95*0.4-1800,100);
      eq(400*0.7-220,60); eq(r1(280/60),4.7); assert.ok(Math.abs(460*0.7-220-102)<1e-9); eq(Math.round((102/60-1)*100),70); },
  "f-profit-4": ()=>{ eq(2250*18000/1e6-30,10.5); eq(2500*15000/1e6-30,7.5); eq(Math.round(30e6/18000),1667); eq(Math.round((2250-30e6/18000)/2250*100),26);
      eq(27e6/15000,1800); eq(45e6/15000,3000); eq(60/3,20); eq(Math.round(2/22*100),9); eq(56e6/28000,2000); eq(r1(800/2800*100),28.6); },
  "f-profit-5": ()=>{ eq(0.07*200,14); eq(16+0.03*200,22); eq(50-10,40); eq(40-2.5-22,15.5); eq(15.5-6,9.5); eq(9.5-5.5,4); eq(9.5/50,0.19);
      eq(20*0.4,8); eq(8-3,5); eq(5-2-1.5,1.5); eq(1.5/20,0.075); },
  "f-profit-6": ()=>{ eq(12.5/50,0.25); eq(12*0.25-5,-2); eq(r1(12*0.3*0.45*100)/100,1.62); eq(12*0.04,0.48);
      assert.ok(Math.abs(1000*0.28-300+20)<1e-9); eq(Math.round(300/0.28)/1000,1.071); eq(1.2e6-150000-180000,870000); eq(100*0.87-60,27); eq(Math.round(60/0.87),69); },
  "f-profit-7": ()=>{ eq(15-12.5,2.5); eq(50*0.02,1); assert.ok(Math.abs(3-2.2-1.5+0.7)<1e-9); assert.ok(Math.abs(-3+2.2+0.8)<1e-9); assert.ok(Math.abs(-3+2.2+3*0.4-0.4)<1e-9); eq(40-30-6,4); },
  "f-profit-8": ()=>{ eq(r1(1.5/8.5*100),17.6); eq(6.5e6*8000/1e9+1.8e6*21000/1e9,89.8); assert.ok(Math.abs(89.8-80.5-9.3)<1e-9);
      eq(800+1000,1800); eq(900+750,1650); eq(50000*1.8e6/1e9,90); eq(1650-1.05e6*1.8e6/1e9,-240);
      eq(60000*15000+40000*30000,2.1e9); eq(80000*15000+30000*27000,2.01e9); eq(1.2e9+0.9e9-110000*21000,-0.21e9); eq(30000*-3000,-0.09e9); },
  "f-profit-9": ()=>{ assert.ok(Math.abs(6+30*0.2*0.45-8.7)<1e-9); assert.ok(Math.abs(12*0.3-3.6)<1e-9); assert.ok(Math.abs(6-3.6-2.4)<1e-9);
      eq(300+50-150,200); eq((300+50)/200,1.75); eq(300/200,1.5); assert.ok(Math.abs(1+5*0.4*0.2-1.4)<1e-9); },
  "f-profit-10": ()=>{ assert.ok(Math.abs(3-200*0.03*0.45-0.3)<1e-9); assert.ok(Math.abs(3-(50*0.01+150*0.08)*0.45+2.625)<1e-9); assert.ok(Math.abs(0.75-50*0.01*0.45-0.525)<1e-9);
      assert.ok(Math.abs(1.2-3*0.8+1.2)<1e-9); assert.ok(Math.abs(8-600*0.03*0.6+2.8)<1e-9); eq(r1(8/0.6/600*100),2.2); },
  "f-profit-11": ()=>{ eq(Math.round(5*365/60),30); eq(8+4-3-5+2-2*2,2); eq(2+2.5,4.5); eq(Math.round(300*45/365),37); eq(Math.round(300*0.85*30/365),21);
      eq(Math.round(300*0.85*20/365),14); eq(20+3-(37+21-14),-21); eq(-2+1+3-1-2,-1); eq(-1-4,-5); },
  "f-profit-12": ()=>{ assert.ok(Math.abs(6e6*0.92*9000/1e9-48-1.68)<1e-9); assert.ok(Math.abs(7.5+0.5+1.68-9.68)<1e-9); eq(2*6/12,1); assert.ok(9.68+1>10 && 8.8+1<10);
      eq(12+8*6/12+10*3/12,18.5); eq(12+8+10,30); eq(4+6*8/12+3*3/12,8.75); eq(4+6+3,13); }
};
t(`phần đào sâu: ${Object.keys(W.READING_DEEP||{}).length} bài có đủ ba mục và số liệu tính lại được`,()=>{
  Object.keys(W.READING_DEEP||{}).forEach(id=>{ const x=R[id];
    ["## Giám khảo hỏi tiếp","## Cùng khung, ngành khác","## Tự luyện ba phút"].forEach(h=>assert.ok(x.includes(h), id+" thiếu mục "+h));
    const b=x.indexOf("## Trước khi sang phần bài tập"); if(b>=0) assert.ok(x.indexOf("## Tự luyện ba phút")<b, id+" · phần đào sâu phải đứng trước đoạn chuyển sang bài tập");
    assert.ok(DEEP[id], "thiếu phép tính lại cho phần đào sâu của "+id); DEEP[id]();
  });
});
console.log(`\n${n} test đạt · ${ids.length} bài đọc`);
