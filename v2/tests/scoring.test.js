/* node tests/scoring.test.js — cổng QA cho mọi case trong Practice Arena
   1. Đáp án: mọi con số then chốt phải tính lại được từ số liệu exhibit.
   2. Bộ chấm: bài mẫu đạt cao và sạch lỗi; từng kiểu bài sai sinh đúng loại lỗi. */
const fs=require("fs"),vm=require("vm"),assert=require("assert");
const ctx=vm.createContext({window:{}});
for(const f of ["data/curriculum","data/library","scoring",
  ...fs.readdirSync(__dirname+"/../assets/js/data").filter(x=>/^arena\d*\.js$/.test(x)).map(x=>"data/"+x.replace(/\.js$/,""))])
  vm.runInContext(fs.readFileSync(__dirname+"/../assets/js/"+f+".js","utf8"),ctx,{filename:f});
const W=ctx.window, SC=W.SCORING;
let n=0; const t=(name,fn)=>{ fn(); n++; console.log("  ✓",name); };
const near=(a,b,tol,msg)=>assert.ok(Math.abs(a-b)<=tol,`${msg}: ${a} ≠ ${b}`);
const num=(id,i)=>SC.cases[id].numbers[i].v;
const cellsOf = id => JSON.stringify(SC.cases[id].exhibits);   // để kiểm tra số liệu gốc có thật trong exhibit

console.log("Engine");
t("parseNum đọc số kiểu Việt",()=>{
  assert.equal(SC.parseNum("12,5"),12.5); assert.equal(SC.parseNum("12.5"),12.5);
  assert.equal(SC.parseNum("1.234.567"),1234567); assert.equal(SC.parseNum("93 tỷ"),93);
  assert.equal(SC.parseNum("1.234,5"),1234.5); assert.ok(isNaN(SC.parseNum("")));
});

console.log("\nĐáp án tính lại từ exhibit");
t("cl-01 · thiếu hụt cửa hàng mới",()=>{
  const gap=7.2-4.1; near(gap,num("cl-01",2),1e-9,"3,1"); near(gap*30,num("cl-01",0),1e-9,"93 tỷ");
  near(gap*30/1180*100,num("cl-01",1),0.1,"điểm biên");
  assert.ok(cellsOf("cl-01").includes("7.2") && cellsOf("cl-01").includes("4.1"));
});
t("cl-02 · lãi chuyến, hoà vốn, rủi ro tỷ giá",()=>{
  const pax=230*0.8, rev=pax*(4.2+0.6), cost=6*140;
  near(rev-cost,num("cl-02",0),1e-6,"lãi/chuyến");
  near(cost/4.8/230*100,num("cl-02",1),0.05,"load factor hoà vốn");
  near(0.6*rev*0.1,num("cl-02",2),0.05,"mất do yên −10%");
  near(207*(4.2*0.85+0.6)-840,23.19,0.01,"phương án D giảm giá");
  ["230","80%","4,2","0,6","6 giờ","140","60%"].forEach(x=>assert.ok(cellsOf("cl-02").includes(x),x));
});
t("cl-03 · doanh thu phí sau khi người bán rời sàn",()=>{
  const seg=[[6,0.08,0.02],[4,0.07,0.10],[2,0.06,0.30]];
  const now=seg.reduce((s,[g,r])=>s+g*r,0)*1000;
  const flat=seg.reduce((s,[g,r,c])=>s+g*(1-c)*(r+0.01),0)*1000;
  const tier=seg.slice(0,2).reduce((s,[g,r,c])=>s+g*(1-c)*(r+0.01),0)*1000 + 2*0.06*1000;
  near(now,num("cl-03",2),1e-6,"hiện tại"); near(flat-now,num("cl-03",1),1e-6,"đồng loạt");
  near(tier-now,num("cl-03",0),1e-6,"phân tầng");
  near(seg.reduce((s,[g,,c])=>s+g*c,0),num("cl-03",3),1e-9,"GMV mất");
  const gmvShare=seg.map(([g])=>g/12*100); near(gmvShare[0],50,0.5,"Mall %GMV"); near(gmvShare[2],17,0.5,"Nhỏ %GMV");
});
t("cl-06 · quy mô sữa hạt, kiểm tra chéo",()=>{
  const users=22e6*0.4, reg=users*0.25, occ=users-reg;
  const boxes=(reg*2*52+occ*2*12)/1e6;
  near(boxes,num("cl-06",1),1e-6,"triệu hộp"); near(boxes*1e6*15000/1e9,num("cl-06",0),1e-6,"tỷ đồng");
  near(reg*104/1e6/boxes*100,num("cl-06",2),0.5,"% khối lượng nhóm thường xuyên");
  const bottom=(9000*55*365+60000*8*365)/1e6+30;
  near(bottom,num("cl-06",3),0.05,"bottom-up"); assert.ok(Math.abs(bottom-boxes)/boxes<0.01,"hai cách lệch < 1%");
  near(boxes*1e6*12000/1e9,4646.4,0.01,"độ nhạy giá 12.000đ");
});
t("cl-07 · chi phí phân loại và máy tự động",()=>{
  const before=[3000,5000,6000,1000], after=[4200,4300,5500,1000];
  assert.equal(before.reduce((a,b)=>a+b),15000); assert.equal(after.reduce((a,b)=>a+b),15000);
  near(after[0]-before[0],num("cl-07",0),0,"+1.200đ");
  near((after[0]-before[0])*260e6/1e9,num("cl-07",1),1e-9,"312 tỷ");
  near((4200-2500)*260e6/1e9,num("cl-07",2),1e-9,"442 tỷ");
  near(250/442*12,num("cl-07",3),0.3,"tháng hoàn vốn");
  near(200e6/365/1000,548,0.5,"TB/ngày năm trước"); near(260e6/365/1000,712,0.5,"TB/ngày năm nay");
  near(260e6/365*1.4/1000,997,0.5,"cao điểm");
});
t("cl-11 · mua lại vs tự mở, giá trần",()=>{
  const ebitda=0.6, stores=800;
  const buy=stores*ebitda*0.5 + stores*ebitda*4, buyCost=3000+400;
  const build=[1,2,3,4].reduce((s,y)=>s+200*ebitda*(5-y),0), buildCost=200*1.5*4;
  near(buy,num("cl-11",1),1e-9,"EBITDA mua"); near(build,1200,1e-9,"EBITDA tự mở"); assert.equal(buildCost,1200);
  near((build-buildCost)-(buy-buyCost),num("cl-11",0),1e-9,"chênh lệch");
  const defense=3000*0.1*5; near(defense,num("cl-11",2),1e-9,"phòng thủ");
  near(buy-400+defense-(build-buildCost),num("cl-11",3),1e-9,"giá trần");
});

t("cl-04 · chuỗi bách hoá lỗ sau chi phí chung",()=>{
  const store=60+120+45, c=r=>r*0.22-store;
  near((500*2000+700*1500+500*1000)/1700,1500,1e-9,"doanh thu TB");
  const total=(500*c(2000)+700*c(1500)+500*c(1000))/1000;
  near(total,178.5,1e-9,"đóng góp"); near(255-total,num("cl-04",0),1e-9,"lỗ/tháng");
  near(-500*c(1000)/1000,num("cl-04",2),1e-9,"nhóm C");
  const be=(255000/1700+store)/0.22; near(be,num("cl-04",1),6,"hoà vốn/cửa hàng");
  near((be/1500-1)*100,num("cl-04",3),0.2,"% tăng"); near(store/0.22,1023,0.5,"hoà vốn cấp cửa hàng");
  near(0.2*120*1700/1000,41,0.5,"phương án D"); near(255-total-2.5,74,1e-9,"phương án A");
});
t("cl-05 · ngân hàng: NIM và dự phòng",()=>{
  const prev=400*0.045+8-10-400*0.01, now=460*0.038+9-11-460*0.016;
  near(prev,12,1e-9,"LNTT trước"); near(now,8.12,1e-9,"LNTT nay"); near(prev-now,num("cl-05",0),1e-9,"giảm");
  near((0.016-0.01)*460,num("cl-05",1),1e-9,"dự phòng do tỷ lệ"); near((0.045-0.038)*460,num("cl-05",2),1e-9,"hiệu ứng NIM");
  near((460-400)*0.045,num("cl-05",3),1e-9,"hiệu ứng dư nợ"); near(460*0.016-400*0.01,3.36,1e-9,"dự phòng tăng");
  near(11*0.1,1.1,1e-9,"phương án C");
});
t("cl-08 · bệnh viện: công suất hoà vốn",()=>{
  const cm=5-1.5, occ=(80*85+80*80+100*60+120*45+120*45)/500;
  near(occ,60,1e-9,"công suất theo khoa khớp 60%");
  const contrib=500*0.6*365*cm/1000; near(420-contrib,num("cl-08",1),1e-9,"lỗ");
  near(420/(500*365*cm/1000)*100,num("cl-08",0),0.01,"hoà vốn"); near(cm,num("cl-08",3),1e-9,"lãi góp");
  near((40*0.85-40*0.45)*365*cm/1000,num("cl-08",2),1e-9,"chuyển 40 giường");
});
t("cl-09 · SaaS: hoàn vốn CAC và runway",()=>{
  near(200+120-40,280,0,"ARR"); near(80*0.35+80*0.125+40*0.05,40,1e-9,"churn khớp");
  near(180/(120*0.75)*12,num("cl-09",0),1e-9,"hoàn vốn tháng"); near(150/120*12,num("cl-09",1),1e-9,"runway");
  near(80*0.35,num("cl-09",2),1e-9,"churn khách nhỏ"); near(80/180,num("cl-09",3),0.005,"magic number");
});
t("cl-10 · trung tâm tiếng Anh: giá trị giữ chân",()=>{
  near(0.25*52+0.75*24,31,1e-9,"tỷ lệ chung khớp 25% có kiểm tra");
  const extra=(0.52-0.31)*10000; near(extra,num("cl-10",2),1e-6,"học viên thêm");
  near(extra*20*0.6/1000,num("cl-10",1),1e-9,"lãi góp thêm"); near(extra*12/1000-10000*1/1000,num("cl-10",0),1e-9,"ròng");
  near(48+22+18+12,100,0,"khảo sát cộng 100");
});
t("cl-12 · sữa hạt cao cấp: thị phần hoà vốn ngân sách",()=>{
  const cm=35000*0.7-12000-2000, y2=12000*0.15*1.25;
  near(cm,num("cl-12",1),0,"lãi góp/hộp"); near(y2,num("cl-12",3),1e-9,"thị trường năm hai");
  near(y2*0.08*1e9/35000*cm/1e9,num("cl-12",0),0.01,"lãi góp 8%");
  near(90e9/cm*35000/1e9/y2*100,num("cl-12",2),0.05,"thị phần hoà vốn");
  near(35000*0.8*0.7-14000,5600,1e-9,"phương án C"); near(40+30+20,90,0,"ba đối thủ");
});

t("cc-01 · F&B: EBITDA theo thương hiệu và phương án đầu tư",()=>{
  const ebitda=20*0.65-5*0.25-9; near(ebitda,num("cc-01",4),1e-9,"EBITDA/nhà hàng");
  near(400*ebitda,num("cc-01",1),1e-9,"cả chuỗi");
  near((150*4+120*3+80*1.5+50*0.4)/400,ebitda,1e-9,"thương hiệu khớp trung bình");
  near(400*(-1*0.65+1.25-4*0.12),num("cc-01",2),1e-9,"app riêng");
  near(60*4,num("cc-01",0),0,"mở lẩu"); near(60*15,900,0,"vốn"); near(900/240,num("cc-01",3),1e-9,"hoàn vốn");
});
t("cc-02 · ngân hàng số: kinh tế một khách hoạt động",()=>{
  near(0.64*250000-120000,num("cc-02",1),1e-9,"đại lý"); near(0.25*250000-35000,num("cc-02",4),1e-9,"app");
  near(-(0.7*250000-600000),num("cc-02",3),1e-9,"chi nhánh lỗ"); near(20000*100,2e6,0,"năng lực đại lý");
  near(2e6*40000/1e9,num("cc-02",0),1e-9,"lợi nhuận năm ba"); near(120000/250000*100,num("cc-02",2),1e-9,"hoà vốn hoạt động");
});
t("cc-03 · bán lẻ đa kênh: tồn kho và giao trễ",()=>{
  near(7000/1400,5,1e-9,"vòng quay"); near(7000/7,num("cc-03",3),1e-9,"tồn kho mục tiêu"); near(1400/1.4,1000,1e-9,"+40% khớp");
  near(1400-1000,num("cc-03",0),0,"giải phóng"); near(400*0.12,num("cc-03",1),1e-9,"chi phí vốn");
  near(0.8*25+0.2*10,22,1e-9,"trễ hiện tại khớp 22%"); near(0.3*25+0.7*10,num("cc-03",2),1e-9,"trễ sau");
});
t("iv-01 · nhà máy nhựa: chuyển chi phí nguyên liệu",()=>{
  near(600*0.2,num("iv-01",1),1e-9,"hạt nhựa tăng"); near(1000*0.05,50,1e-9,"giá bán tăng");
  const prev=1000-600-300, now=1050-720-300; near(now,num("iv-01",3),1e-9,"lợi nhuận nay");
  near(prev-now,num("iv-01",0),1e-9,"giảm"); near((720+300+100)/1000*100-100,num("iv-01",2),1e-9,"tăng giá cần");
});
t("iv-02 · cà phê vào Philippines: quy mô và kinh tế cửa hàng",()=>{
  const mkt=14e6*0.2*2*52*50000/1e9; near(mkt,num("iv-02",1),1e-6,"quy mô");
  const rev=400*50000*360/1e9, e=rev*0.18; near(e,num("iv-02",3),1e-9,"EBITDA cửa hàng");
  near(8/e,num("iv-02",0),0.05,"hoàn vốn"); near(50*rev/mkt*100,num("iv-02",2),0.05,"thị phần 50 cửa hàng");
});

console.log("\nBộ chấm — áp dụng cho mọi case");
const ids=Object.keys(SC.cases);
t(`có ${ids.length} case, mỗi case khớp một đề trong Case Library`,()=>{
  assert.equal(ids.length,W.CASES.length,"mọi case trong Case Library đều có đề đầy đủ"); ids.forEach(id=>assert.ok(W.CASE_BY_ID[id],id));
});
for(const id of ids){
  const H=SC.cases[id], M=H.model;
  t(`${id} · spec hợp lệ`,()=>{
    assert.equal(H.options.length,4); assert.equal(H.options.filter(o=>o[3]>=90).length,1);
    assert.ok(H.options.find(o=>o[0]===H.correct)[3]>=90,"đáp án đúng phải là phương án ≥ 90");
    assert.equal(H.numbers.filter(x=>x.core).length,1,"đúng một con số core");
    assert.ok(H.numbers.reduce((s,x)=>s+x.pts,0)<=90); assert.equal(H.insight.reduce((s,x)=>s+x.pts,0),100);
    assert.equal(M.hyps.length,4);
    const L=H.mistakes; [L.logicLesson,L.calc.lesson,L.framework.lesson,L.exhibit.lesson]
      .forEach(l=>assert.ok(W.LESSON_BY_ID[l],"bài gợi ý không tồn tại: "+l));
  });
  t(`${id} · bài mẫu ≥ 90 mọi tiêu chí, không sinh lỗi`,()=>{
    const r=H.score(M);
    r.dims.forEach(([k,v])=>assert.ok(v>=90,`${k} = ${v}`));
    assert.equal(r.mistakes.length,0,JSON.stringify(r.mistakes.map(m=>m.kind)));
  });
  t(`${id} · bài trống 0 điểm; từng kiểu sai sinh đúng loại lỗi`,()=>{
    const e=H.score({}); assert.equal(e.total,0); assert.equal(e.mistakes.length,0);
    H.options.filter(o=>o[0]!==H.correct).forEach(o=>{
      const r=H.score({...M,rec:o[0]});
      assert.ok(r.mistakes.some(m=>m.kind==="logic"),"sai khuyến nghị "+o[0]);
      assert.ok(r.dims[4][1]<60);
    });
    const noNum=H.score({...M,evidence:M.evidence.replace(/\d/g,"")});
    assert.ok(noNum.mistakes.some(m=>m.kind==="calculation"),"bỏ số → lỗi tính toán"); assert.ok(noNum.dims[2][1]<=10);
    assert.ok(H.score({...M,hyps:["Khách hàng không thích sản phẩm","","",""]}).mistakes.some(m=>m.kind==="framework"),"cây nghèo → lỗi framework");
    const bare=H.numbers.map(x=>String(x.v)).join(" ; ");
    assert.ok(H.score({...M,evidence:bare}).mistakes.some(m=>m.kind==="exhibit"),"chỉ có số → lỗi exhibit");
  });
}

console.log("\nHồi quy cl-01");
t("tính sai 63 tỷ → lỗi tính toán trích đúng con số sai",()=>{
  const H=SC.cases["cl-01"];
  const m=H.score({...H.model,evidence:"Ex.1: thiếu (7,2 − 4,1) × 30 = 63 tỷ. Thuê tăng, hợp đồng 5 năm."}).mistakes.find(m=>m.kind==="calculation");
  assert.ok(m && m.bad.includes("63"));
});
t("không dấu vẫn nhận ra từ khoá",()=>{
  const H=SC.cases["cl-01"];
  const r=H.score({...H.model,evidence:"Ex.2 thue tang 6 diem, hop dong 5 nam co dinh. H1, H2 dung; H3 bac bo. Thieu 93 ty, 7,9 diem. Cua hang cu khoe."});
  assert.ok(r.dims[3][1]>=90);
});
console.log(`\n${n} test đạt`);
