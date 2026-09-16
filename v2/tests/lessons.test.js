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
  "k-profit-1": ()=> (1 - 1.18*0.09/0.16)*100,
  "k-profit-2": ()=> 12000*0.75*0.75*1.2e6/1e9,
  "k-profit-3": ()=> 1200*0.22 - 1000*0.16,
  "k-profit-4": ()=> (1.2-0.9)*10,
  "f-profit-1": ()=> 300 - 300*0.38 - 60 - 45 - 30,
  "f-profit-2": ()=> (7.2-4.1)*30,
  "f-profit-3": ()=> ((1100*0.8-600)/(1000*0.8-600) - 1)*100,
  "f-profit-4": ()=> 30e6/(25000-10000),
  "f-sizing-1": ()=> 1.2e6*0.3*3*50*45000/1e9,
  "f-sizing-2": ()=> 27*0.4/5,
  "f-sizing-3": ()=> 1.5*2*5*365,
  "f-sizing-4": ()=> 1e6*10*50000/1e9,
  "f-pricing-1": ()=> ((55000-18000)-(27000-18000))*10000/1e6,
  "f-pricing-2": ()=> ((2000*10e6)/(4500-3000)/10e6 - 1)*100,
  "f-pricing-3": ()=> (700*90000 + 300*150000)/1e6,
  "f-unit-1": ()=> 0.2*150000 + 15000 - 25000 - 8000 - 0.02*150000,
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

const fund = W.LESSONS;
console.log("Phủ nội dung");
t(`đủ nội dung cho ${fund.length} bài của cả 6 track`,()=>{
  const miss = fund.filter(l=>!C[l.id]).map(l=>l.id); assert.deepEqual(miss,[]);
  Object.keys(C).forEach(id=>assert.ok(W.LESSON_BY_ID[id],"nội dung cho bài không tồn tại: "+id));
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
