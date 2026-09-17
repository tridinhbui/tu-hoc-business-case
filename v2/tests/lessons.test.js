/* node tests/lessons.test.js — cổng QA nội dung bài học
   1. Mọi đáp án phần 6 (calc.answer) được tính lại độc lập từ số liệu trong đề.
   2. Lời giải hiển thị đúng con số đáp án (định dạng tiếng Việt).
   3. Khuôn 10 phần đầy đủ, đáp án mini case tồn tại, case gợi ý tồn tại. */
const fs=require("fs"),vm=require("vm"),path=require("path"),assert=require("assert");
const ctx=vm.createContext({window:{}}); ctx.LC=null;
const js = f => vm.runInContext(fs.readFileSync(path.join(__dirname,"../assets/js",f),"utf8"),ctx,{filename:f});
js("data/curriculum.js"); js("data/library.js"); js("data/lessons/_registry.js");
ctx.LC = ctx.window.LC;
const lessonFiles = fs.readdirSync(path.join(__dirname,"../assets/js/data/lessons")).filter(f=>!f.startsWith("_"));
lessonFiles.forEach(f=>js("data/lessons/"+f));
const W=ctx.window, C=W.LESSON_CONTENT;
let n=0; const t=(name,fn)=>{ fn(); n++; console.log("  ✓",name); };

/* đáp án tính lại từ đề — mỗi dòng là một phép tính độc lập với dữ liệu bài */
const RECOMPUTE = {
  /* i-price-8 · gọi xe Đi Ngay: 12 ngày mưa, ×2,5 (28 nghìn chuyến, khả năng phản ứng 50%) vs trần ×1,5 (36 nghìn, 10%), thiệt hại 9 tỷ */
  "i-price-8": ()=> (((36*22.5 - 40*15)*12/1000) - (0.1*500*0.03*600/1000)) - (((28*37.5 - 40*15)*12/1000) - (0.5*500*0.03*600/1000)),
  "i-price-8#1": ()=> (60 - (80*(1 - 0.4)))/60*100,
  "i-price-8#2": ()=> ((28*37.5 - 40*15)*12/1000)/(500*0.03*600/1000)*100,
  /* i-price-5 · phòng tập Năng Động: 3 nhóm × phòng tập/lớp nhóm, so bán lẻ · chỉ gói · kết hợp */
  "i-price-5": ()=> (((480 - 80)*400/1000) + ((430 - 120)*300/1000) + ((750 - 80 - 120)*300/1000)) - ((400 - 80)*400 + (350 - 120)*300 + (750 - 200)*300)/1000,
  "i-price-5#1": ()=> (200*(300 - 80)/1000) - ((400*0.3)*(480 - 300)/1000),
  "i-price-5#2": ()=> (((480 - 80)*400 + (430 - 120)*300 + (750 - 200)*300)/1000) - ((600 - 200)*(400 + 300 + 300)/1000),
  /* i-price-4 · bộ lọc Nguồn Sạch: chi phí 700.000đ, khảo sát 100.000 hộ ở 4 mức giá, chuyển đổi 40% */
  "i-price-4": ()=> Math.max(((0.9 - 0.7)*12000*0.4/1000), ((1.2 - 0.7)*9000*0.4/1000), ((1.5 - 0.7)*6000*0.4/1000), ((1.8 - 0.7)*3500*0.4/1000)),
  "i-price-4#1": ()=> Math.round(1500/(8*20)*10)/10,
  "i-price-4#2": ()=> ((1.2 - 0.7)*9000*0.4/1000) - ((1.5 - 0.7)*6000*0.3/1000),
  /* i-price-7 · bao bì Phương Nam: niêm yết 10.000đ, biến đổi 6.500đ, 400.000 → 600.000 thùng, chi phí vốn 12%/năm (năm 360 ngày) */
  "i-price-7": ()=> ((400*3.5) - (400*10*30/360*0.12)) - ((600*(8.8 - 6.5)) - (600*0.15 + 600*8.8*90/360*0.12)),
  "i-price-7#1": ()=> (1 - (Math.round(((400*3.5 - 400*10*30/360*0.12) + (600*6.5)) / (1 - 30/360*0.12)))/(600*10))*100,
  "i-price-7#2": ()=> (400*3.5) + (200*(8.8 - 6.5)) - ((400*10 + 200*8.8)*45/360*0.12) - (400*3.5 - 400*10*30/360*0.12),
  /* i-price-6 · chuỗi mỹ phẩm giảm 20%: 250.000đ, chi phí biến đổi 150.000đ, 4.000 → 7.000 → 3.200 đơn, quảng bá 60 triệu */
  "i-price-6": ()=> (8000*0.1) - ((7000*0.05) + (3200*0.1) - 60),
  "i-price-6#1": ()=> Math.ceil((4000*0.1) / (0.25*0.9 - 0.15)),
  "i-price-6#2": ()=> ((8000*0.1) - (3200*0.1) + 60) / 0.05,
  "k-profit-9": ()=> 0.30*0.60*0.25*100,                 // đường 30% giá vốn × giá vốn 60% giá bán × tăng 25%
  "k-profit-10": ()=> Math.max(8*9/12, 5*12/12, 15*3/12 - 6),
  "k-profit-11": ()=> (1180*0.09 + 6 + 5 + 3)/1180*100,
  "k-profit-12": ()=> 20*1.1/((0.10-0.07)*880)*100,
  "k-profit-5": ()=> (0.12-0.08)*560,
  "k-profit-6": ()=> { const aSieuThi=18, aOnline=-6, bSieuThi=10, bOnline=4;
                       return (aSieuThi+bSieuThi+bOnline) - (aSieuThi+bSieuThi); },   // ngừng ô A-online so với đóng cả kênh online
  "k-profit-7": ()=> 0.25*20 + 0.75*8,
  "k-profit-8": ()=> 30/0.4,
  "f-profit-5": ()=> 200 - 90 - 20 - 60 - 14,
  "f-profit-6": ()=> (200 - 90 - 20)/200*100,
  "f-profit-7": ()=> (200 - 90 - 20 - 60 - 14) - (50 - 37.5),   // mất lãi góp kênh app, cố định 74 tỷ không đổi
  "f-profit-8": ()=> { const tbCu=(6e6*8000 + 2e6*21000)/8e6;           // lãi góp bình quân năm cũ
                       return (8.5e6*tbCu - (7e6*8000 + 1.5e6*21000))/1e9; },
  "f-sizing-5": ()=> 1.2e6/75*4,
  "f-sizing-6": ()=> { const chiTiet = 1237000*0.28*2.8*49*46000/1e9; return (2430 - chiTiet)/chiTiet*100; },
  "f-sizing-7": ()=> 8000*80,
  "f-sizing-8": ()=> 2430*0.4*0.08,
  "k-live-1": ()=> 30-3-3-2,
  "k-live-2": ()=> 8*40/60/30*100,
  "k-live-3": ()=> (22-7)/3,
  "k-live-4": ()=> 6*(0.3-0.15),
  "k-live-5": ()=> (30-19-4)/2,
  "k-price-1": ()=> 10/(40-10)*100,
  "k-price-2": ()=> 120*5*0.7,
  "k-price-3": ()=> (0.92*(105-60)/40 - 1)*100,
  "k-price-4": ()=> (1 - 1.08*(40-10)/40)*100,
  "k-size-1": ()=> (100e6*0.3*3*52*25000)/1e6/100e6,
  "k-size-2": ()=> 40000*0.25*60e6/1e9,
  "k-size-3": ()=> (1 - 0.15/0.25)*100,
  "k-size-4": ()=> 600*0.4*0.2,
  "k-profit-1": ()=> (1 - 1.18*0.09/0.16)*100,
  "k-profit-2": ()=> 12000*0.75*0.75*1.2e6/1e9,
  "k-profit-3": ()=> 1200*0.22 - 1000*0.16,
  "k-profit-4": ()=> (1.2-0.9)*10,
  "k-growth-1": ()=> (Math.sqrt(1.4)-1)*100,
  "k-growth-2": ()=> 50000*200e6*0.03/1e9,
  "k-growth-3": ()=> (1180-1000-123)/1000*100,
  "k-growth-4": ()=> (100000*60000 - 0.3*100000*35000)/1e9,
  "k-entry-1": ()=> 120/(800*0.08*0.25),
  "k-entry-2": ()=> 25*8 + 6*8,
  "k-entry-3": ()=> 24/(4.8*0.25 - 0.9),
  "k-entry-4": ()=> (220-100)/30,
  "f-profit-1": ()=> 300 - 300*0.38 - 60 - 45 - 30,
  "f-profit-2": ()=> (7.2-4.1)*30,
  "f-profit-3": ()=> ((1100*0.8-600)/(1000*0.8-600) - 1)*100,
  "f-profit-4": ()=> 30e6/(25000-10000),
  /* f-profit-5…12 · chuỗi bánh mì Lúa Vàng: doanh thu 200, giá vốn 90, biến đổi khác 20, cố định cửa hàng 60, chi phí chung 14 */
  "f-profit-5": ()=> 200 - 90 - 20 - 60 - 14,
  "f-profit-6": ()=> (200 - 90 - 20)/200*100,
  "f-profit-7": ()=> 16 - (50 - 22.5 - 15),
  "f-profit-8": ()=> { const avg=(6e6*8000+2e6*21000)/8e6; return -((7e6*8000+1.5e6*21000) - 8.5e6*avg)/1e6; },
  "f-profit-9": ()=> 6 + 30*0.3*0.45,
  "f-profit-10": ()=> 3 - 200*0.08*0.45,
  "f-profit-11": ()=> (8 + 4 - 3 - 5 + 2) - 5*2,
  "f-profit-12": ()=> 10*9/12 + 50*0.02*6/12 + (6e6*0.95*9000 - 6e6*8000)/1e9,
  "f-sizing-1": ()=> 1.2e6*0.3*3*50*45000/1e9,
  "f-sizing-2": ()=> 27*0.4/5,
  "f-sizing-3": ()=> 1.5*2*5*365,
  "f-sizing-4": ()=> 1e6*10*50000/1e9,
  "f-sizing-5": ()=> 1.2e6/75*4,
  "f-sizing-6": ()=> { const r=1200000*0.30*3*50*45000, e=1237000*0.28*2.8*49*46000; return (r-e)/e*100; },
  "f-sizing-7": ()=> 8000*80,
  "f-sizing-8": ()=> 2430*0.4*0.08,
  "f-sizing-9": ()=> (2430-1800)/1800*100,
  "f-sizing-10": ()=> 2e6*0.2*2*50*15000/1e9,
  "f-sizing-11": ()=> 2430/0.3*0.4 - 2430/0.3*0.2,
  "f-sizing-12": ()=> 2430*0.4*0.08*0.25*1e9/45000,
  "f-pricing-1": ()=> ((55000-18000)-(27000-18000))*10000/1e6,
  "f-pricing-2": ()=> ((2000*10e6)/(4500-3000)/10e6 - 1)*100,
  "f-pricing-3": ()=> (700*90000 + 300*150000)/1e6,
  /* f-pricing-4…9 · nước ép Xanh: chi phí 18.000đ, giá 49.000đ, 20.000 chai/tháng */
  "f-pricing-4": ()=> 400*(49000-18000)/(55000-18000),
  "f-pricing-5": ()=> (1000*(0.4*25000+0.05*40000+0.55*41000) - 1000*(0.7*25000+0.3*41000))/1e6,
  "f-pricing-6": ()=> (1 - (49000-18000)/(54000-18000))*100,
  "f-pricing-7": ()=> (3000*0.4*(98000-3*18000) + 3000*0.6*((98000-3*18000)-(98000-2*18000)))/1e6 - 15,
  "f-pricing-8": ()=> ((800000-16*18000) - 16*(49000-18000))/1000,
  "f-pricing-9": ()=> (1 - (43000-18000)/(49000-18000))*100,
  "f-unit-1": ()=> 0.2*150000 + 15000 - 25000 - 8000 - 0.02*150000,
  /* f-unit-4…9 · Giao Nhanh: doanh thu 45.000đ/đơn, chi phí biến đổi 36.000đ, 5 triệu đơn, cố định 85 tỷ; gói Plus lãi góp 20.000đ/tháng */
  "f-unit-4": ()=> 85e9/(45000-36000)/1e6,
  "f-unit-4#1": ()=> 85e9/(45000-(25000+4000+3000))/1e6,
  "f-unit-4#2": ()=> 85e9/5e6,
  "f-unit-5": ()=> 45000 - (60000/2 + 8000 + 3000),
  "f-unit-5#1": ()=> 45000 - (60000/2.5 + 8000 + 3000),
  "f-unit-5#2": ()=> (5e6*0.9*(9000+0.02*150000) - 5e6*9000)/1e9,
  "f-unit-6": ()=> (55000+3*15000)/(0.5*2*17000),
  "f-unit-6#1": ()=> (55000+3*15000)/(0.3*2*17000),
  "f-unit-6#2": ()=> 8000/(9000+8000)*100,
  "f-unit-7": ()=> (10000*[1,.7,.6,.55,.52,.5].reduce((a,b)=>a+b)*20000 - 10000*60000)/1e6,
  "f-unit-7#1": ()=> (10000*[1,.5,.35,.3,.28,.27].reduce((a,b)=>a+b)*20000 - 10000*40000)/1e6,
  "f-unit-7#2": ()=> { let cum=0; const r=[1,.7,.6,.55,.52,.5]; for(let m=0;m<r.length;m++){ cum+=10000*r[m]*20000; if(cum>=600e6) return m; } },
  "f-unit-8": ()=> (20000/0.05 - 20000/0.08)/(20000/0.05)*100,
  "f-unit-8#1": ()=> (20000/0.08)/60000,
  "f-unit-8#2": ()=> 400000*0.08,
  "f-unit-9": ()=> 85e9/1e9 - (5e6*0.9*13000 + 20000*20000*12)/1e9,
  "f-unit-9#1": ()=> (85e9 - (4.5e6*13000 + 20000*20000*12))/13000/1e6,
  "f-unit-9#2": ()=> (75e9 - (4.5e6*13000 + 20000*20000*12))/13000/1e6,
  "f-unit-2": ()=> (150000*0.7/0.05)/(600e6/1000),
  "f-unit-3": ()=> (600e6/1000)/(150000*0.7),
  "f-segment-1": ()=> 2500*700/(4000*500 + 2500*700 + 3500*400)*100,
  "f-segment-2": ()=> 1.5e6*2e6/1e9,
  "f-moat-1": ()=> (0.18-0.08)*2000,
  "f-moat-2": ()=> 600e9/60e6 - 600e9/300e6,
  "f-moat-3": ()=> 0.03*500,
  "f-model-1": ()=> (0.25*0.8)/(0.6*0.2 + 0.25*0.8 + 0.15*0.9)*100,
  "f-model-2": ()=> 200*3*0.05,
  "f-model-3": ()=> (18000+35000+20000+12000)/2000,
  "i-profit-1": ()=> 50*0.95 - 35,
  "i-profit-2": ()=> (130000-100000)*4e6/1e9,
  "i-profit-3": ()=> (0.4*0.20 + 0.6*0.05)*100,
  "i-entry-1": ()=> 60/(500*0.10*0.20),
  "i-entry-2": ()=> (0.04 + (0.03-0.015))*300,
  "i-entry-3": ()=> 0.4*350 + 0.6*(-30),
  "i-growth-1": ()=> 1000*0.15*0.5,
  "i-growth-2": ()=> (55e6*10000 + 55e6*20000)/1e9 - 110e6*((60e6*10000+40e6*20000)/100e6)/1e9,
  "i-growth-3": ()=> -((0.4/5 - 0.12)*100*5),
  "i-ma-1": ()=> 100*8 + 200 - 150,
  "i-ma-2": ()=> (60+20)*0.9 + 300*0.10*0.3,
  "i-ma-3": ()=> 150*[6,7,8].sort((a,b)=>a-b)[1] - (350-50),
  "i-ops-1": ()=> Math.min(500,420,450,400),
  "i-ops-2": ()=> 50000 + 12e9/400000,
  "i-ops-3": ()=> -(20 - 4000*0.03*0.25),
  "i-price-1": ()=> 1000*0.12 + 40,
  "i-price-2": ()=> (1 - (150000*1e6)/(250000-50000)/1e6)*100,
  "i-price-3": ()=> 1000*0.4 - 1000*(0.9-0.6),
  "i-brain-1": ()=> 40000*0.9 + 25000*0.8 + 60000*0.5,
  "i-chart-1": ()=> 200*0.15 - 300*0.09,
  "i-chart-2": ()=> (1000-950)/950*100,
  "i-chart-3": ()=> (0.6*0.45 + 0.4*0.15)*100,
  "c-read-1": ()=> 3000*0.06 - 2400*0.035,
  "c-read-2": ()=> 30*0.7 + 25*0.6 + 20*0.9 + 15*0.9 + 10*0.7,
  "c-read-3": ()=> 4*(48-16)*0.35,
  "c-frame-1": ()=> (12000 - 3000*3)/3,
  "c-frame-2": ()=> 20000*(0.06-0.04),
  "c-frame-3": ()=> 1500*0.2 - (1400*0.08 + (220-100)),
  "c-tree-1": ()=> [40*0.3, 60*0.5, 25*0.8].sort((a,b)=>b-a)[1],
  "c-tree-2": ()=> 200000*6*600000/1e9,
  "c-tree-3": ()=> { const h=[3,6,2,8,4]; return h.reduce((a,b)=>a+b) - Math.max(...h); },
  "c-insight-1": ()=> 42/50*100,
  "c-insight-2": ()=> 20000*(0.08-0.03),
  "c-insight-3": ()=> (1.55-1.48)/1.48*100,
  "c-deck-1": ()=> 15*0.45,
  "c-deck-2": ()=> (Math.sqrt(300/120)-1)*100,
  "c-deck-3": ()=> 180 - 84 - 40 + 10,
  "c-story-1": ()=> 66/96*100,
  "c-pitch-1": ()=> (15-1)/4,
  "c-qa-1": ()=> 84 + 40 + 66*0.7 - 10,
  "c-qa-2": ()=> 192 - 50*(1-0.6),
  "c-qa-3": ()=> 120/40,
  "m-brand-1": ()=> (12000*1.15 - 12000)*20e6/1e9,
  "m-brand-2": ()=> 5000*0.30 - 400,
  "m-gtm-1": ()=> 12e9/20000,
  "m-gtm-2": ()=> 200000 - 0.12*200000 - 15000 - 90000,
  "m-gtm-3": ()=> 12000/50000*100,
  "m-stp-1": ()=> 8*0.4 + 6*0.3 + 9*0.3,
  "m-stp-2": ()=> 1.2e6*0.10*1.5e6/1e9,
  "m-4p-1": ()=> (50000-(25000+3000))*(1e6*0.85)/1e9,
  "m-journey-1": ()=> 5000/1e6*100,
  "m-journey-2": ()=> 100000*0.12*0.5*0.85 - 100000*0.12*0.5*0.6,
  "m-campaign-1": ()=> (30e9/300000)/0.02/1e6,
  "m-campaign-2": ()=> { let budget=12e9, n=0; for(const [cac,cap] of [[200000,20000],[300000,30000],[500000,Infinity]]){ const k=Math.min(cap, budget/cac); n+=k; budget-=k*cac; if(budget<=0) break; } return n; },
  "m-metrics-1": ()=> 300 - 900*0.30,
  "m-metrics-2": ()=> (0.12-0.04)*500,
  "s-forecast-1": ()=> [[100,110],[120,100],[90,100],[110,100]].reduce((s,[a,f])=>s+Math.abs(a-f)/a,0)/4*100,
  "s-forecast-2": ()=> { const under=250000-100000, over=100000-20000; return under/(under+over)*100; },
  "s-inventory-1": ()=> 300 - 1200/6,
  "s-inventory-2": ()=> 1.65*40*Math.sqrt(9),
  "s-capacity-1": ()=> 1000*20*0.90*0.85*0.95,
  "s-capacity-2": ()=> 20000*0.85 - 20000*0.90*0.85*0.95,
  "s-bottle-1": ()=> 540 - 500,
  "s-bottle-2": ()=> 60*4000*30000/1e9,
  "s-logistics-1": ()=> 1.2e6/40 - 1.2e6/100,
  "s-logistics-2": ()=> 15000/(1-0.15),
  "s-cost-1": ()=> 2000*0.05/(700+520+340)*100,
  "s-service-1": ()=> (2.33-1.65)*600*50000/1e6,
  "n-revenue-1": ()=> 50*360*400*55000/1e9,
  "n-revenue-2": ()=> 100*0.8*0.9,
  "n-cost-1": ()=> { const v=(80-60)/(120000-80000); return 60 - v*80000; },
  "n-margin-1": ()=> (1000-600-100-180)/1000*100,
  "n-breakeven-1": ()=> 300/0.30,
  "n-roi-1": ()=> 50/(8+5),
  "n-roi-2": ()=> (10+4)/10,
  "n-npv-1": ()=> 100/Math.pow(1.1,2),
  "n-npv-2": ()=> 60/1.1 + 60/Math.pow(1.1,2) - 100,
  "n-sens-1": ()=> 20/((20-(-10))/5)
};
/* các phép kiểm tra phụ: con số xuất hiện trong lời giải/ví dụ cũng phải đúng */
const SIDE = [
  ["f-profit-1 · tháng trước 52,5 triệu, biên 21% → 17%", ()=>{ const prev=250-250*0.35-55-45-10; assert.equal(prev,52.5);
      assert.equal(Math.round(prev/250*100),21); assert.equal(Math.round(51/300*100),17); }],
  ["f-sizing-2 · bottom-up khớp top-down", ()=> assert.equal(1500*4*360/1e6, 2.16)],
  ["f-profit-4 · biên an toàn 20%, giảm biến phí tốt hơn giảm thuê", ()=>{ assert.equal((2500-2000)/2500,0.2);
      assert.ok(30e6/17000 < 27e6/15000); assert.equal(Math.round(30e6/17000),1765); }],
  ["f-pricing-2 · lãi góp 20 → 17,25 tỷ", ()=> assert.equal(1500*11.5e6/1e9, 17.25)],
  ["f-unit-2 · churn 10% làm LTV/CAC còn 1,75", ()=> assert.equal((150000*0.7/0.1)/600000, 1.75)],
  ["f-unit-1 · cần 4,4 triệu đơn để bù 40 tỷ", ()=> assert.equal(Math.round(40e9/9000/1e5)/10, 4.4)],
  ["f-segment-2 · sinh viên 800 tỷ, thu nhập cao 3.000 tỷ", ()=>{ assert.equal(4e6*2e5/1e9,800); assert.equal(0.5e6*6e6/1e9,3000); }],
  ["f-model-1 · vé chỉ tạo 26% lợi nhuận gộp", ()=> assert.equal(Math.round(12/45.5*100),26)],
  ["f-model-3 · lỗ 5.000đ/xe, tăng giá 10% vừa hoà", ()=>{ assert.equal(40*2000-85000,-5000); assert.ok(40*2200>=85000); }],
  ["f-pricing-3 · VIP hơn một giá 20%", ()=> assert.equal((108-90)/90, 0.2)],
  /* số liệu phụ trong ví dụ và bài đọc của f-sizing-5…12 */
  ["f-sizing-5 · ba quận 32.000 → 8.000 học sinh → 96 tỷ", ()=>{ assert.equal(64000/2,32000); assert.equal(32000*0.25,8000); assert.equal(8000*12e6/1e9,96); }],
  ["f-sizing-6 · bản chi tiết ≈ 2.186 tỷ, chênh ≈ 244 tỷ", ()=>{ const e=1237000*0.28*2.8*49*46000/1e9; assert.equal(Math.round(e),2186); assert.equal(Math.round(2430-e),244); }],
  ["f-sizing-7 · phân tầng 620.000 ly; phía cầu 1,2 triệu; 19,2 tỷ/ngày; phần hạt 1.050–1.400 tỷ", ()=>{
      assert.equal(1000*200+7000*60,620000); assert.equal(8e6*0.15,1.2e6); assert.equal(640000*30000/1e9,19.2);
      assert.equal(Math.round(19.2*365/1000)*1000,7000); assert.equal(7000*0.15,1050); assert.equal(7000*0.2,1400);
      assert.equal(Math.round(11.2e6/8000),1400); }],
  ["f-sizing-8 · SAM 972; trần năng lực 19,44 tỷ; marketing ≈ 40 tỷ", ()=>{ assert.equal(2430*0.4,972);
      assert.equal(60*20*360*45000/1e9,19.44); assert.equal(6e9/200000*30*45000/1e9,40.5); }],
  ["f-sizing-9 · phía cung ≈ 1.814 tỷ; ở 22% phía cầu ≈ 1.782 tỷ; tỷ số 1,35", ()=>{
      assert.equal(4000*30*360*42000/1e9,1814.4); assert.equal(Math.round(1.2e6*0.22*150*45000/1e9),1782); assert.equal(2430/1800,1.35); }],
  ["f-sizing-10 · 300 · 600 · 1.050 tỷ; khoảng 3.700 trụ, ≈ 150 tỷ vốn", ()=>{ const k=r=>2e6*r*100*15000/1e9;
      assert.deepEqual([0.1,0.2,0.35].map(k).map(Math.round),[300,600,1050]);
      const tru=Math.round(40e6/360/30); assert.equal(Math.round(tru/100)*100,3700); assert.equal(Math.round(tru*40e6/1e9/10)*10,150); }],
  ["f-sizing-11 · 1.620 · 2.430 · 3.240; cận dưới vượt ngưỡng khoảng 60%", ()=>{ assert.deepEqual([0.2,0.3,0.4].map(r=>Math.round(2430/0.3*r)),[1620,2430,3240]);
      assert.equal(Math.round((1620/1000-1)*10)*10,60); }],
  ["f-sizing-12 · 1.200 đơn/ngày = 60 tài xế × 20; kênh marketing 54 tỷ", ()=>{ assert.equal(432000/360,1200); assert.equal(60*20,1200); assert.equal(30000*40*45000/1e9,54); }],
  /* chuỗi bánh mì Lúa Vàng · f-profit-5…12 */
  ["f-profit-5 · biên gộp 55 · đóng góp 45 · EBITDA 8 · ròng 4", ()=>{ const eb=16, net=(eb-4-2)*0.8;
      assert.equal(net,8); assert.deepEqual([110,90,eb,net].map(x=>Math.round(x/200*1000)/10),[55,45,8,4]); }],
  ["f-profit-6 · chiến dịch lãi 0,4 tỷ; hoà vốn ≈ 11,1 tỷ doanh thu", ()=>{ assert.ok(Math.abs(12*0.45-5-0.4)<1e-9); assert.equal(Math.round(5/0.45*10)/10,11.1); assert.ok(11*0.45<5); }],
  ["f-profit-7 · hai kênh cộng đúng 90 lãi góp; app −6 sau phân bổ; cửa hàng +22", ()=>{
      assert.equal((150-67.5-5)+(50-22.5-15),90); assert.equal(74*0.25,18.5); assert.equal(12.5-18.5,-6); assert.equal(77.5-55.5,22); }],
  ["f-profit-8 · lãi góp 90 → 80,5; sản lượng +5,625; giá −7; cơ cấu còn 18%", ()=>{ const avg=90e9/8e6;
      assert.equal((7e6*7000+1.5e6*21000)/1e9,80.5); assert.equal(0.5e6*avg/1e9,5.625); assert.equal(7e6*-1000/1e9,-7);
      assert.ok(Math.abs(5.625-8.125-7-(80.5-90))<1e-9); assert.equal(Math.round(1.5/8.5*100),18); }],
  ["f-profit-9 · ba nhóm cộng đúng 200 · 90 · 60 · 30; nhóm yếu cố định 65% doanh thu", ()=>{
      assert.equal(80+90+30,200); assert.equal(36+40.5+13.5,90); assert.equal(12+28.5+19.5,60); assert.equal(24+12-6,30);
      assert.equal(80*0.45,36); assert.equal(19.5/30,0.65); assert.equal(24/30,0.8); }],
  ["f-profit-10 · ngưỡng ≈ 6,7 tỷ; EBITDA còn 11,8", ()=>{ assert.equal(Math.round(3/0.45*10)/10,6.7); assert.ok(Math.abs(16-4.2-11.8)<1e-9); }],
  ["f-profit-11 · dòng tiền hoạt động 6; rút về 30 ngày giải phóng 2,5 tỷ", ()=>{ assert.equal(8+4-3-5+2,6); assert.equal(5*30/60,2.5); assert.equal(10+5,15); }],
  ["f-profit-12 · cả năm 14,3 tỷ; lãi góp mỗi ổ +12,5%; đệm 1,3 tỷ", ()=>{
      assert.ok(Math.abs(10+1+3.3-14.3)<1e-9); assert.equal((9000-8000)/8000,0.125); assert.equal(5.7e6*9000/1e9,51.3);
      assert.ok(Math.abs(11.3-10-1.3)<1e-9); }],
  ["f-profit bài đọc 5–8 · văn phòng 3,5%; chiến dịch 32%, đệm 8%; app 25% vs 52%; giá thật ≈ 15 tỷ", ()=>{
      assert.equal(Math.round(14/2/200*1000)/10,3.5); assert.equal(0.05*200,10); assert.equal(Math.round(1.6/5*100),32);
      assert.equal(Math.round((12/(5/0.45)-1)*100),8); assert.equal(Math.round(5/0.55*10)/10,9.1);
      assert.equal(12.5/50,0.25); assert.equal(Math.round(77.5/150*100),52); assert.equal(Math.round(22/150*100),15); assert.equal(Math.round(3.5/150*100),2);
      assert.equal(40000-19000,21000); assert.equal(Math.round(7+8.125),15); assert.equal(Math.round(5.625/15.125*100),37); }],
  ["f-profit bài đọc 9–12 · 750 triệu/cửa hàng; cắt 1/3 cố định ≈ 6,5 tỷ; ngưỡng 3,3%; trễ một quý hụt 1,2 tỷ", ()=>{
      assert.equal(30e3/40,750); assert.equal(12/80,0.15); assert.equal(19.5/3,6.5); assert.equal(Math.round(5/10.05*12),6);
      assert.equal(Math.round(3/0.45/200*1000)/10,3.3); assert.ok(Math.abs(10-(3.3+10*6/12+0.5)-1.2)<1e-9); }],
  /* nước ép Xanh · f-pricing-4…9 */
  ["f-pricing-4 · lãi góp 12,4 → 12,58 triệu; doanh thu 19,6 → 18,7; giữ 85% sản lượng", ()=>{
      assert.equal(400*31000/1e6,12.4); assert.equal(340*37000/1e6,12.58); assert.equal(400*49000/1e6,19.6); assert.equal(340*55000/1e6,18.7); assert.equal(340/400,0.85); }],
  ["f-pricing-5 · 29,8 → 34,55 triệu (+16%), khoảng 140 triệu/tháng", ()=>{ assert.equal(Math.round(4.75/29.8*100),16); assert.equal(Math.round(4.75*30/10)*10,140); }],
  ["f-pricing-6 · giá +10,2%, lãi góp mỗi chai +16,1%, khoảng 2.780 chai", ()=>{
      assert.equal(Math.round((54/49-1)*1000)/10,10.2); assert.equal(Math.round((36/31-1)*1000)/10,16.1); assert.equal(Math.round(20000*(1-31/36)/10)*10,2780); }],
  ["f-pricing-7 · 1.200 bộ tăng thêm, 1.800 bộ ăn mòn, −18.000đ mỗi bộ", ()=>{ assert.equal(3000*0.4,1200); assert.equal((98000-54000)-(98000-36000),-18000); }],
  ["f-pricing-8 · lẻ 496 · gói 512 · dùng hết 440; giảm 18% mỗi chai", ()=>{
      assert.equal(16*31000,496000); assert.equal(800000-20*18000,440000); assert.equal(496-440,56); assert.equal(Math.round((1-40/49)*100),18); }],
  ["f-pricing-9 · 620 · 500 · 527 triệu; ngưỡng ≈ 3.870 chai", ()=>{
      assert.equal(20000*31000/1e6,620); assert.equal(20000*25000/1e6,500); assert.equal(17000*31000/1e6,527);
      assert.equal(Math.round(20000*(1-25/31)/10)*10,3870); assert.equal(620-527,93); }],
  ["f-pricing bài đọc 6–9 · 17.220 chai; tăng dần mất 180 triệu; doanh thu khuyến mãi 294 triệu, 32.700đ/chai; giữ chân gấp gần 200 lần; 16.130 chai", ()=>{
      assert.equal(Math.round(620e6/36000/10)*10,17220); assert.equal(3*20000*3000/1e6,180); assert.equal(Math.round((500/450-1)*100),11);
      assert.equal(3000*98000/1e6,294); assert.equal(Math.round(98000/3/100)*100,32700); assert.equal(Math.round(6*500000/16000),188);
      assert.equal(Math.round(500e6/31000/10)*10,16130); }],
  /* Giao Nhanh · f-unit-4…9 */
  ["f-unit-4 · 5 triệu × 9.000 = 45 tỷ, lỗ 40; gấp đôi đơn lãi 5 tỷ; bỏ khuyến mãi hoà vốn ở 5 triệu đơn", ()=>{
      assert.equal(5e6*9000/1e9,45); assert.equal(45-85,-40); assert.equal(10e6*9000/1e9-85,5); assert.equal(5e6*17000/1e9,85);
      assert.equal(25000+8000+3000,36000); assert.equal(0.2*150000+15000,45000); }],
  ["f-unit-5 · 50.000 → 60.000đ/giờ; 2,5 × 24.000 = 60.000", ()=>{ assert.equal(2*25000,50000); assert.equal(2*30000,60000); assert.equal(2.5*24000,60000); assert.equal(4.5e6*12000/1e9,54); }],
  ["f-unit-6 · chi phí có khách 100.000đ; khách ở lại 34.000đ/tháng", ()=>{ assert.equal(55000+3*15000,100000); assert.equal(2*17000,34000); assert.equal(0.3*2*17000,10200); }],
  ["f-unit-7 · tổng tỷ lệ 3,87 và 2,7; cộng dồn 200 · 340 · 460 · 570 · 674 triệu", ()=>{
      const r=[1,.7,.6,.55,.52,.5]; assert.equal(Math.round(r.reduce((a,b)=>a+b)*100)/100,3.87);
      let c=0; assert.deepEqual(r.map(x=>Math.round(c+=10000*x*20000/1e6)).slice(0,5),[200,340,460,570,674]);
      assert.equal(Math.round([1,.5,.35,.3,.28,.27].reduce((a,b)=>a+b)*100)/100,2.7); assert.equal(Math.round((1-40/60)*100),33); }],
  ["f-unit-8 · vòng đời 20 và 12,5 tháng; LTV/CAC 6,7 → 4,2; mất 1,5 tỷ mỗi lứa 10.000", ()=>{
      assert.equal(1/0.05,20); assert.equal(1/0.08,12.5); assert.equal(Math.round(400000/60000*10)/10,6.7); assert.equal(Math.round(250000/60000*10)/10,4.2);
      assert.equal((400000-250000)*10000/1e9,1.5); assert.equal(Math.round((0.08/0.05-1)*100),60); }],
  ["f-unit-9 · lãi góp 58,5 + 4,8 = 63,3; thác nước −40 +13,5 +4,8 +10 +11,7 = 0; tổng 6,17 và 5,4 triệu đơn", ()=>{
      assert.equal(4.5e6*13000/1e9,58.5); assert.equal(20000*20000*12/1e9,4.8); assert.ok(Math.abs(-40+13.5+4.8+10+11.7)<1e-9);
      assert.equal(Math.round((4.5+21.7e9/13000/1e6)*100)/100,6.17); assert.equal(Math.round((4.5+0.9)/5*100),108); }],
  ["f-unit bài đọc 4–9 · 4.500đ cần ≈ 19 triệu đơn; cố định 100 tỷ lỗ 10; kênh A hơn B 34 triệu; rời bỏ 12% → 167 nghìn, 2,8 lần; tăng 23% đơn; mất 20% đơn thiếu thêm 6,5 tỷ", ()=>{
      assert.equal(Math.round(85e9/4500/1e6),19); assert.equal(10e6*9000/1e9-100,-10); assert.equal(174-140,34);
      assert.equal(Math.round(20000/0.12/1000),167); assert.equal(Math.round(20000/0.12/60000*10)/10,2.8); assert.equal(49000+12000,61000);
      assert.equal(Math.round((6.17/5-1)*100),23); assert.equal(4e6*13000/1e9,52); assert.equal(58.5-52,6.5); }],
  ["i-profit-1 · phần riêng của hãng ≈ 83% mức giảm", ()=> assert.equal(Math.round(12.5/15*100),83)],
  ["i-profit-2 · số liệu hãng xe khớp bài trước", ()=>{ assert.equal(5e6*100000/1e9,500); assert.equal(4e6*130000/1e9,520);
      assert.equal(520-485,35); assert.equal((4e6-5e6)*100000/1e9,-100); }],
  ["i-profit-3 · biên cũ 15,5%", ()=> assert.ok(Math.abs((0.7*0.2+0.3*0.05)*100-15.5)<1e-9)],
  ["i-entry-2 · lợi thế ròng 10,5 tỷ", ()=> assert.ok(Math.abs(16.5-0.02*300-10.5)<1e-9)],
  ["i-entry-3 · vào lớn 80 tỷ, kém vào nhỏ 42 tỷ", ()=>{ assert.ok(Math.abs(0.4*500+0.6*-200-80)<1e-9); assert.ok(Math.abs(122-80-42)<1e-9); }],
  ["i-growth-1 · xếp hạng 80 · 75 · 62,5 · 60", ()=>{ const v=[1000*.10*.8,1000*.15*.5,1000*.25*.25,1000*.10*.6];
      assert.deepEqual(v.map(x=>Math.round(x*10)/10),[80,75,62.5,60]); }],
  ["i-growth-2 · sản lượng 140, giá 27,5, tổng 277,5 (+19,8%)", ()=>{ const oldAvg=14000, rev1=55e6*10500+55e6*20000;
      assert.equal(10e6*oldAvg/1e9,140); assert.equal((rev1-(55e6*10000+55e6*20000))/1e9,27.5);
      assert.equal(rev1/1e9-1400,277.5); assert.equal(Math.round((277.5/1400)*1000)/10,19.8); }],
  ["i-growth-3 · ROIC 8%, thêm 40 tỷ lợi nhuận", ()=>{ assert.ok(Math.abs(0.4/5-0.08)<1e-9); assert.equal(100*0.4,40); }],
  ["i-ops-2 · 500.000 áo → 74.000đ, đơn mới lãi góp 1,5 tỷ", ()=>{ assert.equal(50000+12e9/500000,74000); assert.equal(100000*(65000-50000)/1e9,1.5); }],
  ["i-ops-3 · gói A ròng +45, gói B +25, cắt cả bốn +35", ()=>{ const tr=20-30, kho=20, thue=15, km=15-4000*0.005*0.25;
      assert.equal(kho+thue+km,45); assert.equal(tr+kho+thue,25); assert.equal(tr+kho+thue+km,35); }],
  ["i-price-2 · dự báo −20% cho 160 tỷ", ()=> assert.equal(200000*800000/1e9,160)],
  ["i-price-3 · B đứng yên 280, B theo 300, A không theo 390", ()=>{ assert.equal(Math.round(700*0.4),280); assert.equal(Math.round(1000*0.3),300); assert.equal(Math.round(1300*0.3),390); }],
  ["i-chart-2 · trục cắt phóng đại khoảng 19 lần", ()=> assert.equal(Math.round(100/((1000-950)/950*100)),19)],
  ["i-chart-3 · tỷ trọng khuyến mãi 30% → 24%", ()=> assert.ok(Math.abs((0.3*0.45+0.7*0.15)*100-24)<1e-9)],
  ["c-read-2 · khả thi 6→8 thêm 5 điểm, sáng tạo 9→10 thêm 2", ()=>{ assert.ok(Math.abs(25*0.2-5)<1e-9); assert.ok(Math.abs(20*0.1-2)<1e-9); }],
  ["c-read-3 · slide 32, pitch 19,2 giờ-người; tổng 128", ()=>{ assert.equal(4*32,128); assert.ok(Math.abs(128*0.25-32)<1e-9); assert.ok(Math.abs(128*0.15-19.2)<1e-9); }],
  ["c-frame-1 · năng lực 9.000 đơn, cần +33% tài xế", ()=>{ assert.equal(3000*3,9000); assert.equal(Math.round(1000/3000*100),33); }],
  ["c-frame-2 · 400 hội viên = 200 triệu/tháng", ()=> assert.equal(400*500000/1e6,200)],
  ["c-frame-3 · kế hoạch hiện có +232 tỷ", ()=> assert.equal(1400*0.08+120,232)],
  ["c-tree-1 · thứ tự 30 · 20 · 12", ()=> assert.deepEqual([60*0.5,25*0.8,40*0.3].map(Math.round),[30,20,12])],
  ["c-tree-2 · khách mới 280 tỷ (72% từ khách cũ)", ()=>{ assert.equal(1000-720,280); assert.equal(720/1000*100,72); }],
  ["c-tree-3 · tổng 23 giờ vượt quỹ 16", ()=> assert.ok([3,6,2,8,4].reduce((a,b)=>a+b)===23 && 15<=16)],
  ["c-insight-2 · tỷ lệ chung đúng 5%", ()=> assert.ok(Math.abs((30000*0.03+20000*0.08)/50000*100-5)<1e-9)],
  ["c-insight-3 · so toàn bộ ra 25%", ()=> assert.ok(Math.abs((1.5-1.2)/1.2*100-25)<1e-9)],
  ["c-deck-1 · mở đầu 1,5 · khuyến nghị 3,75 · lộ trình 3 phút", ()=>{ assert.equal(15*0.1,1.5); assert.equal(15*0.25,3.75); assert.equal(15*0.2,3); assert.equal(10+45+25+20,100); }],
  ["c-deck-2 · gấp khoảng 7 lần kênh cửa hàng; tổng tăng 150%", ()=>{ assert.equal(Math.round((Math.sqrt(2.5)-1)*100/8),7); assert.equal((300/120-1)*100,150); }],
  ["c-deck-3 / c-story-1 · ba đòn bẩy cộng đúng 96 tỷ", ()=>{ assert.equal(84+40+66-10,180); assert.equal(40+66-10,96); }],
  ["c-pitch-1 · 3,5 phút ≈ 455 từ", ()=> assert.equal(3.5*130,455)],
  ["c-qa-1 · biên 5,3%, thiếu khoảng 20 tỷ", ()=>{ assert.equal(Math.round(160.2/3000*1000)/10,5.3); assert.equal(Math.round(180-160.2),20); }],
  ["c-qa-2 · hụt 8 tỷ; đệm ban đầu 12 tỷ", ()=>{ assert.equal(180-172,8); assert.equal(192-180,12); }],
  ["c-qa-3 · đệm còn 1 năm", ()=> assert.equal(4-120/40,1)],
  ["m-brand-2 · nhu cầu ô mục tiêu 1.500 tỷ", ()=> assert.equal(5000*0.3,1500)],
  ["m-gtm-1 · khoảng 50.000 gói/tháng", ()=> assert.equal(600000/12,50000)],
  ["m-gtm-2 · siêu thị 60.000đ; tổng 4,2 tỷ vs 2,13 tỷ", ()=>{ assert.equal(200000-0.25*200000-90000,60000);
      assert.ok(Math.abs(70000*60000/1e9-4.2)<1e-9); assert.ok(Math.abs(30000*71000/1e9-2.13)<1e-9); }],
  ["m-gtm-3 · tỷ lệ 20% cần 60.000 người thử", ()=> assert.equal(12000/0.2,60000)],
  ["m-stp-1 · B 7,0 · C 5,7", ()=>{ assert.ok(Math.abs(7*.4+8*.3+6*.3-7)<1e-9); assert.ok(Math.abs(9*.4+4*.3+3*.3-5.7)<1e-9); }],
  ["m-stp-2 · chia ba mỗi phân khúc 3,3 tỷ < 5 tỷ; gấp 18 lần ngân sách", ()=>{ assert.ok(10/3<5); assert.equal(180/10,18); }],
  ["m-4p-1 · lãi góp hiện tại 15 tỷ, tăng 3,7 tỷ", ()=>{ assert.equal((40000-25000)*1e6/1e9,15); assert.ok(Math.abs(18.7-15-3.7)<1e-9); }],
  ["m-journey-1 · các bước 20% · 25% · 10%", ()=> assert.deepEqual([200000/1e6,50000/200000,5000/50000],[0.2,0.25,0.1])],
  ["m-journey-2 · hiện tại 3.600 đơn; sửa bước sang thanh toán +1.440", ()=>{ assert.equal(Math.round(100000*.12*.5*.6),3600);
      assert.equal(Math.round(100000*.12*.7*.6-3600),1440); }],
  ["m-campaign-1 · khoảng 333 triệu lượt hiển thị", ()=> assert.equal(Math.round(5e6/0.015/1e6),333)],
  ["m-campaign-2 · chia đều ≈ 41.333; KOL dồn hết 24.000", ()=>{ assert.equal(Math.round(20000+4e9/300000+4e9/500000),41333); assert.equal(12e9/500000,24000); }],
  ["m-metrics-1 · ROAS hoà vốn 3,33", ()=> assert.equal(Math.round(1/0.3*100)/100,3.33)],
  ["m-metrics-2 · tính cả 12% ra 60 tỷ", ()=> assert.equal(Math.round(0.12*500),60)],
  ["s-forecast-1 · sai số có dấu cộng lại −10", ()=> assert.equal((110-100)+(100-120)+(100-90)+(100-110),-10)],
  ["s-inventory-1 · 91 → 61 ngày; tiết kiệm 12 tỷ", ()=>{ assert.equal(Math.round(365/4),91); assert.equal(Math.round(365/6),61); assert.equal(100*0.12,12); }],
  ["s-inventory-2 · điểm đặt hàng lại 1.998", ()=> assert.equal(Math.round(200*9+1.65*40*3),1998)],
  ["s-capacity-1 · OEE 72,675%, thiếu gần 5.500 chai", ()=>{ assert.ok(Math.abs(0.9*0.85*0.95*100-72.675)<1e-9); assert.equal(Math.round(20000-14535),5465); }],
  ["s-capacity-2 · khoảng 3,7 tỷ/năm, hoàn vốn 5,4 năm, còn thiếu 1.000 chai", ()=>{ const g=2465*300*5000/1e9;
      assert.equal(Math.round(g*10)/10,3.7); assert.equal(Math.round(20/g*10)/10,5.4); assert.equal(18000-17000,1000); }],
  ["s-bottle-1 · 8 giờ dồn thêm 320", ()=> assert.equal(40*8,320)],
  ["s-bottle-2 · hoàn vốn khoảng 3 tháng", ()=> assert.equal(Math.round(2/7.2*12),3)],
  ["s-logistics-1 · vùng ven lỗ 10.000đ/đơn", ()=> assert.equal(20000-1.2e6/40,-10000)],
  ["s-logistics-2 · tủ tiết kiệm ≈ 11.647đ", ()=> assert.equal(Math.round(15000/0.85-6000),11647)],
  ["s-cost-1 · ba khoản đầu 78%", ()=> assert.equal((700+520+340)/2000*100,78)],
  ["s-service-1 · đệm 990 → 1.398, tăng khoảng 41%", ()=>{ assert.equal(Math.round(1.65*600),990); assert.equal(Math.round(2.33*600),1398); assert.equal(Math.round((2.33/1.65-1)*100),41); }],
  ["n-revenue-1 · 7,2 triệu lượt khách", ()=> assert.equal(50*360*400,7.2e6)],
  ["n-revenue-2 · B có sẵn 18 tỷ, phải bán lại 82 tỷ", ()=>{ assert.equal(Math.round(20*0.9),18); assert.equal(100-18,82); }],
  ["n-cost-1 · biến phí 500đ/thùng", ()=> assert.equal((80e6-60e6)/(120000-80000),500)],
  ["n-margin-1 · gộp 40 · đóng góp 30 · ròng 4,8", ()=>{ assert.equal((1000-600)/10,40); assert.equal((1000-600-100)/10,30);
      assert.ok(Math.abs((1000-600-100-180-40-20)*0.8/1000*100-4.8)<1e-9); }],
  ["n-breakeven-1 · biên an toàn 16,7%; biên 25% → hoà vốn 1.200", ()=>{ assert.equal(Math.round(200/1200*1000)/10,16.7); assert.equal(Math.round(300/0.25),1200); }],
  ["n-roi-1 · ROI 16%, cách tính sai ra 6,25 năm", ()=>{ assert.equal(8/50*100,16); assert.equal(50/8,6.25); }],
  ["n-roi-2 · PI của B là 1,2", ()=> assert.equal(120/100,1.2)],
  ["n-npv-1 · chênh lệch khoảng 2,4 tỷ", ()=> assert.equal(Math.round((85-100/1.21)*10)/10,2.4)],
  ["n-npv-2 · 54,5 + 49,6; IRR ≈ 13,1%", ()=>{ assert.equal(Math.round(60/1.1*10)/10,54.5); assert.equal(Math.round(60/1.21*10)/10,49.6);
      let lo=0,hi=1; for(let i=0;i<100;i++){ const m=(lo+hi)/2, npv=60/(1+m)+60/(1+m)**2-100; npv>0?lo=m:hi=m; } assert.equal(Math.round(lo*1000)/10,13.1); }],
  ["n-sens-1 · sản lượng 8,3%, chi phí 12,5%", ()=>{ assert.equal(Math.round(20/(12/5)*10)/10,8.3); assert.equal(20/(8/5),12.5); }]
];
const vi = x => Number.isInteger(x) ? x.toLocaleString("de-DE") : String(x).replace(".",",");

const fund = W.LESSONS.filter(l=>!l.soon), soon = W.LESSONS.filter(l=>l.soon);
console.log("Phủ nội dung");
t(`đủ nội dung cho ${fund.length}/${W.LESSONS.length} bài đã phát hành (${soon.length} bài đang biên soạn)`,()=>{
  const miss = fund.filter(l=>!C[l.id]).map(l=>l.id); assert.deepEqual(miss,[]);
  Object.keys(C).forEach(id=>assert.ok(W.LESSON_BY_ID[id],"nội dung cho bài không tồn tại: "+id));
  const wrong = soon.filter(l=>C[l.id]).map(l=>l.id);
  assert.deepEqual(wrong,[],"bài đã có nội dung thì phải bỏ cờ soon trong curriculum.js");
});

console.log("\nĐáp án tính lại từ đề");
for(const id of Object.keys(C)){
  t(`${id} · ${C[id].calc.answer} ${C[id].calc.unit}`,()=>{
    const f = RECOMPUTE[id]; assert.ok(f, "thiếu phép tính lại cho "+id);
    const got = f(), c = C[id].calc;
    assert.ok(Math.abs(got-c.answer) <= c.tol, `tính lại ra ${got}, đáp án ghi ${c.answer} ±${c.tol}`);
    assert.ok(c.solution.includes(vi(c.answer)), `lời giải không chứa đáp án "${vi(c.answer)}"`);
  });
}
/* câu luyện thêm: mỗi câu có phép tính lại riêng, khoá "<id>#<số thứ tự>"; lời giải từng bước phải kết thúc bằng đáp án */
for(const [id,c] of Object.entries(C)){
  (c.drills||[]).forEach((d,i)=>{
    const key=`${id}#${i+1}`;
    t(`${key} · ${d.answer} ${d.unit}`,()=>{
      const f=RECOMPUTE[key]; assert.ok(f,"thiếu phép tính lại cho "+key);
      const got=f(); assert.ok(Math.abs(got-d.answer)<=d.tol, `tính lại ra ${got}, đáp án ghi ${d.answer} ±${d.tol}`);
      assert.ok(d.q && d.unit && d.tol>=0 && Array.isArray(d.steps) && d.steps.length>=3, key+" cần câu hỏi, đơn vị, dung sai và ít nhất 3 bước");
      assert.ok(d.steps[d.steps.length-1].includes(vi(d.answer)), `bước cuối không chứa đáp án "${vi(d.answer)}"`);
    });
  });
  if(c.calc.steps) t(`${id} · lời giải bài tính có ${c.calc.steps.length} bước`,()=>{
    assert.ok(c.calc.steps.length>=3); assert.ok(c.calc.steps[c.calc.steps.length-1].includes(vi(c.calc.answer)),"bước cuối không chứa đáp án");
  });
}
SIDE.forEach(([name,fn])=>t(name,fn));

console.log("\nKhuôn bài học");
for(const [id,c] of Object.entries(C)){
  t(`${id} · đủ 10 phần`,()=>{
    ["why","outcome"].forEach(k=>assert.ok(c[k]&&c[k].length>30,k));
    assert.ok(c.scenario.text && c.scenario.ask);
    assert.ok(c.fw.title && c.fw.rows.length>=3);
    assert.ok(c.ex.rows.length>=3 && c.ex.read);
    assert.equal(c.mini.opts.length,4); assert.ok(c.mini.opts.some(o=>o[0]===c.mini.correct),"đáp án mini không có trong lựa chọn");
    assert.ok(["framework","calculation","logic","exhibit","presentation"].includes(c.mini.kind));
    assert.ok(c.calc.q && c.calc.unit && c.calc.tol>=0);
    assert.ok(c.slide.headline && c.slide.left && c.slide.right && c.slide.rule);
    assert.ok(c.mistakes.length>=3); assert.equal(c.checklist.length,5);
    if(c.arena) assert.ok(W.CASE_BY_ID[c.arena],"case gợi ý không tồn tại: "+c.arena);
    const stars = JSON.stringify(c).split("**").length-1; assert.equal(stars%2,0,"dấu ** in đậm bị lẻ");
  });
}
console.log(`\n${n} test đạt`);
