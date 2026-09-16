/* ===== ĐỀ ĐẦY ĐỦ CHO PRACTICE ARENA =====
   Mỗi case: đề, exhibit, 4 khuyến nghị, bài mẫu và bộ chấm (xem mô tả spec ở đầu scoring.js).
   Số liệu là MINH HOẠ để luyện tập, không phải số liệu công bố của doanh nghiệp.
   Mọi con số trong `numbers` phải tính lại được từ exhibit — tests/scoring.test.js kiểm tra điều đó. */
(function(R){

/* ─────────── cl-01 · Profitability ─────────── */
R({
  id:"cl-01", title:"Chuỗi cà phê mất biên lợi nhuận",
  brief:{context:"Một chuỗi cà phê 180 cửa hàng vừa đóng sổ năm tài chính. Doanh thu tăng 18% so với cùng kỳ, nhưng EBITDA margin rơi từ 16% xuống 9%.",
         task:"tìm nguyên nhân thật sự và đưa một khuyến nghị duy nhất mà CEO có thể hành động trong 90 ngày."},
  exhibits:[
    {kind:"bars", title:"Doanh thu mỗi cửa hàng theo nhóm tuổi", unit:"tỷ VND/năm",
     headline:"Doanh thu trung bình mỗi cửa hàng", sub:"Đường đứt nét: điểm hoà vốn 7,2 tỷ/năm",
     rows:[["Cửa hàng cũ (150)",6.7,"var(--series-good)"],["Cửa hàng mới (30)",4.1,"var(--series-bad)"],["Trung bình chuỗi",6.56,"var(--series-base)"]],
     max:8, ticks:[0,2,4,6,8], threshold:{v:7.2,label:"hoà vốn 7,2"}},
    {kind:"table", title:"Cơ cấu chi phí trên doanh thu", unit:"% doanh thu",
     head:["Khoản mục","Năm trước","Năm nay","Thay đổi"],
     rows:[["Giá vốn (COGS)","33%","34%",{t:"+1,0",d:"down"}],["Nhân sự","20%","22%",{t:"+2,0",d:"down"}],
           ["Thuê mặt bằng","16%","22%",{t:"+6,0",d:"down"}],["Marketing & G&A","15%","13%",{t:"−2,0",d:"up"}]]},
    {kind:"metrics", title:"Hợp đồng thuê của 30 cửa hàng mới",
     items:[["Giá thuê so với TB cũ","+45%","chủ yếu trong TTTM"],["Điều khoản","5 năm · +8%/năm","cố định"]]}
  ],
  options:[
    ["A","Tăng giá đồ uống 10% toàn hệ thống","Chữa triệu chứng. Cửa hàng cũ đang khoẻ — tăng giá toàn chuỗi đánh vào nhóm không có vấn đề và rủi ro mất khách.",45],
    ["B","Đóng ngay toàn bộ 30 cửa hàng mới","Quá tay. Hợp đồng thuê 5 năm cố định khiến đóng cửa vẫn phải trả tiền thuê; cần tách nhóm lỗ nặng trước.",35],
    ["C","Dừng mở mới, tái đàm phán mặt bằng nhóm lỗ nặng, gắn tiêu chí hoà vốn vào mọi quyết định mở","Đúng nguyên nhân gốc: cửa hàng mới dưới ngưỡng hoà vốn và chi phí thuê cố định. Làm được trong 90 ngày.",95],
    ["D","Cắt 50% ngân sách marketing","Marketing & G&A đã giảm 2 điểm — đây không phải nguồn gốc vấn đề, cắt thêm còn làm cửa hàng mới chậm chín hơn.",30]
  ],
  correct:"C",
  framing:[["biên","margin","ebitda","lợi nhuận"],["doanh thu tăng","tăng trưởng","18%","dù doanh thu","mặc dù"]],
  branches:[["cửa hàng mới","mở mới","mới mở","chưa chín"],["thuê","mặt bằng","cố định"],["biến đổi","cogs","giá vốn","nguyên liệu","nhân sự"]],
  numbers:[{v:93,tol:0.5,pts:60,core:true},{v:7.9,tol:0.15,pts:20},{v:3.1,tol:0.05,pts:10}],
  insight:[{kw:["thuê","mặt bằng"],pts:40},{kw:["5 năm","hợp đồng","cố định","khó thoát"],pts:35},{kw:["cửa hàng cũ","khoẻ","khỏe","không phải vận hành"],pts:25}],
  unit:"tỷ",
  model:{
    problem:"Biên EBITDA sụt 7 điểm dù doanh thu tăng 18% — cần xác định nguyên nhân nằm ở vận hành hay ở chất lượng mở rộng.",
    hyps:["Doanh thu mỗi cửa hàng giảm do 30 cửa hàng mới chưa chín","Chi phí cố định (thuê mặt bằng) tăng nhanh hơn doanh thu","Chi phí biến đổi (COGS) trên mỗi đơn hàng tăng",""],
    evidence:"Ex.2: thuê tăng 6 điểm — lớn nhất. Ex.1: cửa hàng mới 4,1 tỷ so với ngưỡng 7,2 tỷ → thiếu 3,1 tỷ × 30 = 93 tỷ ≈ 7,9 điểm biên. Cửa hàng cũ vẫn khoẻ (6,7 tỷ, trên TB chuỗi) nên không phải lỗi vận hành. H1 và H2 đúng; H3 bị bác bỏ (COGS chỉ +1). Ex.3: hợp đồng thuê 5 năm cố định nên vấn đề không tự hết.",
    rec:"C"},
  mistakes:{
    logicLesson:"f-profit-2",
    calc:{label:"phần thiếu hụt của 30 cửa hàng mới so với ngưỡng hoà vốn", lesson:"f-profit-2",
      good:"(7,2 − 4,1) × 30 = 93 tỷ ≈ 7,9 điểm biên trên doanh thu 1.180 tỷ",
      why:"Mức sụt biên phải được giải thích bằng con số. Không có con số thì giả thuyết chưa được chứng minh."},
    framework:{lesson:"i-profit-1",
      good:"Tách ba nhánh: doanh thu/cửa hàng (cũ vs mới) · chi phí cố định (thuê) · chi phí biến đổi (COGS)",
      why:"Case chuỗi luôn phải tách đơn vị cũ và mới ngay tầng đầu, rồi mới tách doanh thu và chi phí."},
    exhibit:{lesson:"i-chart-1", bad:"Bằng chứng không nhắc tới chi phí thuê hay hợp đồng thuê",
      good:"Exhibit 2 (thuê +6 điểm) và Exhibit 3 (hợp đồng 5 năm, +8%/năm) là mấu chốt",
      why:"Exhibit lớn nhất về biến động chi phí bị bỏ qua — đọc hết mọi exhibit trước khi kết luận."}
  },
  feedback:{
    "Problem framing":"Problem statement cần nêu được nghịch lý: doanh thu tăng nhưng biên giảm.",
    "Structure / MECE":"Cây giả thuyết thiếu nhánh. Tách cửa hàng cũ/mới, chi phí cố định và chi phí biến đổi.",
    "Analysis & math":"Chưa lượng hoá. Tính phần thiếu hụt của 30 cửa hàng mới so với ngưỡng hoà vốn.",
    "Insight":"Chưa nói vì sao vấn đề cấp bách: hợp đồng thuê 5 năm cố định ở Exhibit 3."
  }
});

/* ─────────── cl-02 · Market Entry ─────────── */
R({
  id:"cl-02", title:"Mở đường bay Việt Nam – Nhật Bản",
  brief:{context:"Hãng đang cân nhắc mở đường bay Hà Nội – Tokyo bằng tàu A321 230 ghế, thuê theo hợp đồng 5 năm. Đội mạng bay dự kiến load factor 80% ngay năm đầu và coi đây là đường bay tăng trưởng.",
         task:"quyết định có nên cam kết mở đường bay này không, và nếu mở thì mở theo cách nào."},
  labels:{hyps:"2 · Hypothesis tree — đường bay có sinh lời không"},
  exhibits:[
    {kind:"table", title:"Kinh tế một chuyến bay một chiều", unit:"triệu VND",
     head:["Chỉ tiêu","Giá trị","Ghi chú"],
     rows:[["Số ghế","230","A321"],["Load factor dự kiến năm 1","80%","đội mạng bay đề xuất"],
           ["Giá vé trung bình","4,2","mỗi khách"],["Doanh thu phụ trợ","0,6","hành lý, suất ăn, mỗi khách"],
           ["Thời gian bay","6 giờ","block hour"],["Chi phí mỗi giờ bay","140","nhiên liệu, tổ bay, thuê tàu, phí sân bay"]]},
    {kind:"bars", title:"Load factor các hãng đang khai thác đường bay", unit:"%",
     headline:"Đối thủ đang lấp đầy 82–86%", sub:"Số liệu minh hoạ, trung bình 12 tháng",
     rows:[["Vietnam Airlines",86,"var(--series-base)"],["JAL",82,"var(--series-base)"],["Dự kiến của hãng",80,"var(--series-focus)"]],
     max:100, ticks:[0,25,50,75,100]},
    {kind:"metrics", title:"Ràng buộc và rủi ro",
     items:[["Doanh thu bằng yên","60%","vé bán tại Nhật"],["Biến động yên 12 tháng","±10%","so với VND"],
            ["Slot Narita khả dụng","23:40","giờ đêm"],["Cam kết thuê tàu","5 năm","không huỷ ngang"]]}
  ],
  options:[
    ["A","Mở ngay 14 chuyến/tuần để chiếm thị phần trước đối thủ","Lãi mỗi chuyến chỉ 43,2 triệu và load factor chỉ cách hoà vốn 4 điểm — nhân đôi tần suất là nhân đôi rủi ro.",40],
    ["B","Không mở — biên lợi nhuận 4,9% quá mỏng","Có cơ sở nhưng bỏ lỡ một đường bay vẫn có lãi; rủi ro chính (tỷ giá) có thể phòng ngừa được.",55],
    ["C","Mở 7 chuyến/tuần, phòng ngừa tỷ giá cho phần doanh thu bằng yên, đặt ngưỡng dừng nếu load factor dưới 76% sau hai quý","Có lãi ở kịch bản cơ sở, chặn được rủi ro lớn nhất là tỷ giá, và có điểm dừng rõ ràng trước cam kết 5 năm.",95],
    ["D","Mở và giảm giá vé 15% để đạt load factor 90%","Tính lại: 207 khách × 4,17 triệu = 863 triệu → lãi chỉ còn 23 triệu, thấp hơn giữ giá.",30]
  ],
  correct:"C",
  framing:[["lợi nhuận","lãi","margin","biên","hiệu quả"],["5 năm","cam kết","có nên","mở đường bay"]],
  branches:[["doanh thu","giá vé","load factor","hành khách"],["chi phí","giờ bay","nhiên liệu"],["tỷ giá","yên","cạnh tranh","đối thủ","slot"]],
  numbers:[{v:43.2,tol:0.3,pts:45,core:true},{v:76.1,tol:0.3,pts:25},{v:53,tol:0.6,pts:20}],
  insight:[{kw:["tỷ giá","yên"],pts:40},{kw:["đệm","mỏng","sát ngưỡng","biên an toàn"],pts:35},{kw:["giảm giá","vietnam airlines","jal","đối thủ"],pts:25}],
  unit:"triệu|tỷ|%",
  model:{
    problem:"Có nên cam kết 5 năm cho đường bay Hà Nội – Tokyo khi lợi nhuận mỗi chuyến chỉ khoảng 4,9% doanh thu?",
    hyps:["Doanh thu mỗi chuyến đủ bù chi phí ở load factor dự kiến 80%","Chi phí giờ bay trên chặng 6 giờ quá cao so với giá vé","Rủi ro tỷ giá yên và cạnh tranh từ đối thủ làm mất biên an toàn",""],
    evidence:"Ex.1: 184 khách × (4,2 + 0,6) triệu = 883,2 triệu; chi phí 6 × 140 = 840 triệu → lãi 43,2 triệu/chuyến. Hoà vốn cần 175 khách = load factor 76,1% — chỉ cách mức dự kiến 80% khoảng 4 điểm, đệm rất mỏng. Ex.2: Vietnam Airlines 86%, JAL 82% nên 80% là khả thi nhưng không dư. Ex.3: 60% doanh thu bằng yên; yên mất giá 10% làm mất 53 triệu → lỗ 9,8 triệu/chuyến. H1 đúng nhưng sát ngưỡng; H2 bị bác bỏ ở mức 80%; H3 là rủi ro chính. Giảm giá 15% để lên 90% cũng không cứu được: lãi còn 23 triệu.",
    rec:"C"},
  mistakes:{
    logicLesson:"i-entry-2",
    calc:{label:"lãi mỗi chuyến ở load factor 80%", lesson:"n-breakeven-1",
      good:"184 khách × 4,8 triệu − 840 triệu = 43,2 triệu/chuyến; hoà vốn ở load factor 76,1%",
      why:"Market entry luôn phải kiểm tra unit economics của một chuyến trước khi bàn chiến lược."},
    framework:{lesson:"i-entry-1",
      good:"Ba nhánh: doanh thu/chuyến (giá vé × load factor + phụ trợ) · chi phí/chuyến (giờ bay) · rủi ro (tỷ giá, cạnh tranh)",
      why:"Câu hỏi mở thị trường cần cả nhánh sinh lời lẫn nhánh rủi ro — thiếu một nhánh là kết luận lệch."},
    exhibit:{lesson:"i-chart-1", bad:"Không nhắc tới rủi ro tỷ giá hay độ mỏng của biên an toàn",
      good:"Ex.3: 60% doanh thu bằng yên — yên giảm 10% xoá sạch lợi nhuận chuyến (−53 triệu)",
      why:"Exhibit rủi ro thường là exhibit quyết định. Đọc nó sau cùng nhưng đừng bỏ qua."}
  }
});

/* ─────────── cl-03 · Pricing ─────────── */
R({
  id:"cl-03", title:"Nâng take rate mà không mất người bán",
  brief:{context:"Sàn thương mại điện tử muốn tăng take rate (phí thu trên giá trị đơn hàng) thêm 1 điểm phần trăm để cải thiện doanh thu. Khảo sát cho thấy mỗi nhóm người bán phản ứng khác nhau.",
         task:"đề xuất có nên tăng phí không, tăng cho ai, và doanh thu phí mỗi tháng thay đổi bao nhiêu."},
  exhibits:[
    {kind:"table", title:"Người bán theo nhóm và độ nhạy với phí", unit:"GMV: nghìn tỷ VND/tháng",
     head:["Nhóm người bán","GMV/tháng","Take rate hiện tại","Tỷ lệ rời sàn nếu +1 điểm"],
     rows:[["Mall / thương hiệu","6,0","8%","2%"],["Người bán vừa","4,0","7%","10%"],["Người bán nhỏ","2,0","6%","30%"]]},
    {kind:"bars", title:"Tỷ trọng GMV so với tỷ trọng số đơn", unit:"%",
     headline:"Người bán nhỏ: ít GMV nhưng nhiều đơn", sub:"Giả định: người bán rời sàn mang theo GMV tương ứng",
     rows:[["Mall — % GMV",50,"var(--series-focus)"],["Mall — % số đơn",25,"var(--series-base)"],["Vừa — % GMV",33,"var(--series-focus)"],
           ["Vừa — % số đơn",30,"var(--series-base)"],["Nhỏ — % GMV",17,"var(--series-focus)"],["Nhỏ — % số đơn",45,"var(--series-warn)"]],
     max:60, ticks:[0,15,30,45,60]},
    {kind:"metrics", title:"Bối cảnh cạnh tranh",
     items:[["Take rate TB của đối thủ","7,5%","sàn lớn thứ hai"],["Người bán nhỏ bán đa sàn","≈ 70%","chi phí chuyển sàn thấp"]]}
  ],
  options:[
    ["A","Tăng đồng loạt 1 điểm cho mọi người bán","+35,2 tỷ/tháng nhưng mất 9,3% GMV — và mất chính nhóm tạo 45% số đơn.",50],
    ["B","Giữ nguyên take rate, bù doanh thu bằng quảng cáo","Né câu hỏi. Phương án phân tầng cho thêm 57,2 tỷ/tháng với rủi ro thấp hơn.",45],
    ["C","Tăng 1 điểm cho Mall và người bán vừa, giữ nguyên người bán nhỏ; theo dõi tỷ lệ rời sàn của nhóm vừa mỗi tháng","+57,2 tỷ/tháng — cao hơn tăng đồng loạt — và giữ nhóm tạo traffic.",95],
    ["D","Tăng 2 điểm cho người bán nhỏ vì họ ít quyền đàm phán","Ngược dữ liệu: nhóm nhỏ nhạy nhất (30% rời) và dễ chuyển sàn nhất.",20]
  ],
  correct:"C",
  framing:[["take rate","phí","doanh thu"],["rời","churn","mất người bán","giữ chân"]],
  branches:[["mall","thương hiệu"],["người bán vừa","vừa"],["người bán nhỏ","nhỏ","long-tail"],["gmv","rời sàn","churn","lượt mua"]],
  numbers:[{v:57.2,tol:0.3,pts:45,core:true},{v:35.2,tol:0.3,pts:25},{v:880,tol:1,pts:10},{v:1.12,tol:0.01,pts:10}],
  insight:[{kw:["45%","số đơn","traffic","đa dạng"],pts:45},{kw:["phân tầng","theo nhóm","không tăng đồng loạt"],pts:35},{kw:["9,3%","mất gmv","1,12"],pts:20}],
  unit:"tỷ|nghìn tỷ|%",
  model:{
    problem:"Tăng take rate 1 điểm phần trăm có làm doanh thu phí của sàn tăng không, khi một phần người bán sẽ rời sàn?",
    hyps:["Người bán Mall/thương hiệu chịu được mức phí mới","Người bán vừa rời sàn ở mức vừa phải","Người bán nhỏ rời nhiều, kéo theo mất GMV và lượt mua",""],
    evidence:"Ex.1: hiện thu 6×8% + 4×7% + 2×6% = 0,88 nghìn tỷ = 880 tỷ/tháng. Tăng đồng loạt: 5,88×9% + 3,6×8% + 1,4×7% = 915,2 tỷ, chỉ +35,2 tỷ nhưng mất 1,12 nghìn tỷ GMV (9,3%). Chỉ tăng Mall và người bán vừa: 937,2 tỷ, tức +57,2 tỷ và giữ nguyên nhóm nhỏ. Ex.2: người bán nhỏ chỉ 17% GMV nhưng 45% số đơn — họ giữ traffic và độ đa dạng hàng. H1 đúng; H3 đúng nên phải phân tầng theo nhóm, không tăng đồng loạt.",
    rec:"C"},
  mistakes:{
    logicLesson:"i-price-2",
    calc:{label:"doanh thu phí tăng thêm sau khi trừ người bán rời sàn", lesson:"i-price-1",
      good:"Phân tầng: 5,88×9% + 3,6×8% + 2×6% = 937,2 tỷ → +57,2 tỷ/tháng (đồng loạt chỉ +35,2 tỷ)",
      why:"Pricing case phải tính doanh thu SAU khi trừ phần GMV mất đi, không chỉ nhân phí mới với GMV cũ."},
    framework:{lesson:"f-pricing-2",
      good:"Tách theo nhóm người bán (Mall · vừa · nhỏ) vì mỗi nhóm có độ nhạy với phí khác nhau",
      why:"Một mức giá chung che mất khác biệt độ nhạy — đó chính là chỗ tạo ra lợi nhuận."},
    exhibit:{lesson:"c-insight-1", bad:"Không dùng tới tỷ trọng số đơn của người bán nhỏ",
      good:"Ex.2: người bán nhỏ 17% GMV nhưng 45% số đơn — mất họ là mất traffic",
      why:"Giá trị của một nhóm khách không chỉ nằm ở doanh thu trực tiếp họ mang lại."}
  }
});

/* ─────────── cl-06 · Market Sizing ─────────── */
R({
  id:"cl-06", title:"Thị trường sữa hạt Việt Nam lớn cỡ nào?",
  brief:{context:"Ban điều hành muốn biết thị trường sữa hạt đóng hộp tại Việt Nam lớn cỡ nào trước khi quyết định đầu tư dây chuyền mới. Không có báo cáo ngành, chỉ có vài giả định từ khảo sát nội bộ.",
         task:"ước lượng quy mô thị trường mỗi năm bằng tỷ đồng, kiểm tra chéo, và nói con số đó có ý nghĩa gì cho quyết định."},
  labels:{problem:"1 · Câu hỏi cần ước lượng", hyps:"2 · Cây phân rã (driver tree)", evidence:"3 · Phép tính và kiểm tra chéo"},
  exhibits:[
    {kind:"table", title:"Giả định top-down từ khảo sát nội bộ",
     head:["Giả định","Giá trị","Ghi chú"],
     rows:[["Dân số đô thị 18–55 tuổi","22 triệu","nhóm mục tiêu"],["Tỷ lệ đã từng uống sữa hạt","40%","trong nhóm mục tiêu"],
           ["Trong đó uống thường xuyên","25%","≥ 1 lần/tuần"],["Tần suất nhóm thường xuyên","2 hộp/tuần",""],
           ["Tần suất nhóm thỉnh thoảng","2 hộp/tháng",""],["Giá bán trung bình","15.000đ/hộp",""]]},
    {kind:"table", title:"Dữ liệu kênh bán để kiểm tra chéo bottom-up",
     head:["Kênh","Số điểm bán","Hộp/điểm/ngày","Ghi chú"],
     rows:[["Siêu thị & cửa hàng tiện lợi","9.000","55","365 ngày"],["Tạp hoá truyền thống","60.000","8","365 ngày"],
           ["Thương mại điện tử","—","—","30 triệu hộp/năm"]]},
    {kind:"metrics", title:"Bối cảnh ngành",
     items:[["Tăng trưởng sữa hạt","22%/năm","3 năm gần nhất"],["Tăng trưởng sữa nước","3%/năm","đang chững"]]}
  ],
  options:[
    ["A","Khoảng 5.800 tỷ/năm — đủ lớn; vào thị trường với sản phẩm và kênh cho nhóm uống thường xuyên","Quy mô được hai cách tính xác nhận, và nhắm đúng nhóm tạo 59% khối lượng.",95],
    ["B","Khoảng 58.000 tỷ/năm — lớn hơn cả sữa nước, dồn toàn lực","Sai một bậc 10 — thường do nhầm đơn vị hộp/năm hoặc quên chia nghìn.",25],
    ["C","Chưa đủ dữ liệu, cần khảo sát 6 tháng rồi mới ước lượng","Market sizing tồn tại để ra quyết định khi thiếu dữ liệu. Hai cách tính khớp nhau dưới 1% là đủ tin cậy.",40],
    ["D","Khoảng 5.800 tỷ/năm; nhắm nhóm uống thỉnh thoảng vì đông gấp 3 lần","Đông người nhưng chỉ tạo 41% khối lượng. Nhóm thường xuyên tạo 59%.",55]
  ],
  correct:"A",
  framing:[["quy mô","lớn cỡ","bao nhiêu","market size"],["tỷ đồng","doanh thu","mỗi năm","/năm","đáng"]],
  branches:[["dân số"],["tỷ lệ","thâm nhập","thường xuyên"],["tần suất","số hộp"],["giá"]],
  numbers:[{v:5808,tol:10,pts:50,core:true},{v:387.2,tol:0.5,pts:20},{v:59,tol:1,pts:10},{v:385.9,tol:0.5,pts:10}],
  insight:[{kw:["59%","khối lượng"],pts:45},{kw:["kiểm tra chéo","bottom-up","đối chiếu","khớp"],pts:35},{kw:["nông thôn","mức sàn","chưa tính"],pts:20}],
  unit:"tỷ|triệu|nghìn",
  model:{
    problem:"Ước lượng quy mô thị trường sữa hạt Việt Nam mỗi năm tính bằng tỷ đồng, để quyết định có đáng đầu tư dây chuyền mới hay không.",
    hyps:["Dân số đô thị 18–55 tuổi","Tỷ lệ đã từng uống và tỷ lệ uống thường xuyên","Tần suất: số hộp mỗi tuần hoặc mỗi tháng theo nhóm","Giá bán trung bình mỗi hộp"],
    evidence:"Top-down (Ex.1): 22 triệu × 40% = 8,8 triệu người đã uống. Thường xuyên 25% = 2,2 triệu × 2 hộp × 52 tuần = 228,8 triệu hộp; thỉnh thoảng 6,6 triệu × 2 × 12 = 158,4 triệu hộp. Tổng 387,2 triệu hộp × 15.000đ = 5.808 tỷ đồng/năm. Kiểm tra chéo bottom-up theo kênh (Ex.2): 180,7 + 175,2 + 30 = 385,9 triệu hộp — lệch dưới 1%, khớp. Nhóm thường xuyên chỉ 25% người uống nhưng tạo 59% khối lượng, nên H2 đúng là driver quan trọng nhất. Giá ở H4 là giả định nhạy nhất: nếu giá TB chỉ 12.000đ thì còn 4.646 tỷ, kết luận vẫn không đổi. Chưa tính nông thôn nên đây là mức sàn.",
    rec:"A"},
  mistakes:{
    logicLesson:"f-sizing-4",
    calc:{label:"quy mô thị trường tính bằng tỷ đồng/năm", lesson:"f-sizing-3",
      good:"2,2 triệu × 104 hộp + 6,6 triệu × 24 hộp = 387,2 triệu hộp × 15.000đ = 5.808 tỷ/năm",
      why:"Giữ đơn vị ở mỗi bước (người → hộp/năm → đồng). Sai bậc 10 là lỗi phổ biến nhất của market sizing."},
    framework:{lesson:"f-sizing-2",
      good:"Dân số mục tiêu × tỷ lệ sử dụng × tần suất × giá — tách nhóm thường xuyên và thỉnh thoảng",
      why:"Hai nhóm có tần suất chênh nhau 4 lần; gộp chung là ra một con số không dùng được."},
    exhibit:{lesson:"f-sizing-4", bad:"Không kiểm tra chéo và không chỉ ra nhóm nào tạo khối lượng",
      good:"Ex.2 cho phép kiểm tra chéo bottom-up: 385,9 triệu hộp — khớp top-down dưới 1%",
      why:"Một con số market sizing chỉ đáng tin khi hai cách tính độc lập cho kết quả gần nhau."}
  },
  goodFeedback:"Ước lượng chặt: giữ đơn vị qua từng bước, kiểm tra chéo bằng dữ liệu kênh và rút ra được nhóm khách cần nhắm."
});

/* ─────────── cl-07 · Operations ─────────── */
R({
  id:"cl-07", title:"Chi phí mỗi bưu kiện không giảm nữa",
  brief:{context:"Công ty chuyển phát tăng sản lượng 30% trong năm, nhưng chi phí trung bình mỗi đơn vẫn đứng yên ở 15.000đ. Ban điều hành kỳ vọng lợi thế quy mô phải kéo chi phí xuống.",
         task:"tìm vì sao lợi thế quy mô không xuất hiện và đề xuất một hành động có hiệu quả tính bằng tiền."},
  exhibits:[
    {kind:"table", title:"Chi phí mỗi đơn theo công đoạn", unit:"đồng/đơn",
     head:["Công đoạn","Năm trước","Năm nay","Thay đổi"],
     rows:[["Sản lượng (triệu đơn)","200","260",{t:"+30%",d:"up"}],["Phân loại tại kho","3.000","4.200",{t:"+1.200",d:"down"}],
           ["Vận chuyển trung chuyển","5.000","4.300",{t:"−700",d:"up"}],["Giao chặng cuối","6.000","5.500",{t:"−500",d:"up"}],
           ["Khác","1.000","1.000","0"],[{t:"Tổng chi phí mỗi đơn",b:1},{t:"15.000",b:1},{t:"15.000",b:1},"0"]]},
    {kind:"bars", title:"Sản lượng kho phân loại trung tâm", unit:"nghìn đơn/ngày",
     headline:"Ngày cao điểm vượt công suất kho", sub:"Đường đứt nét: công suất phân loại 800 nghìn đơn/ngày",
     rows:[["TB/ngày năm trước",548,"var(--series-base)"],["TB/ngày năm nay",712,"var(--series-focus)"],["Ngày cao điểm (×1,4)",997,"var(--series-bad)"]],
     max:1200, ticks:[0,300,600,900,1200], threshold:{v:800,label:"công suất 800"}},
    {kind:"metrics", title:"Phương án máy phân loại tự động",
     items:[["Vốn đầu tư","250 tỷ","kho trung tâm"],["Chi phí phân loại sau đầu tư","2.500đ/đơn","hiện 4.200đ"],
            ["Công suất mới","1,4 triệu đơn/ngày",""],["Tỷ lệ phân loại thủ công hiện nay","70%",""]]}
  ],
  options:[
    ["A","Tăng giá cước 10% để bù chi phí","Chi phí không tăng — nó đứng yên. Tăng giá mất khách trong khi nguyên nhân là nút thắt ở kho.",35],
    ["B","Đầu tư máy phân loại tự động 250 tỷ tại kho trung tâm; hoàn vốn khoảng 7 tháng","Đánh đúng nút thắt: tiết kiệm 442 tỷ/năm và mở công suất cho ngày cao điểm.",95],
    ["C","Thuê thêm 30% nhân sự phân loại ca đêm","Giải được công suất ngắn hạn nhưng giữ chi phí 4.200đ/đơn — không lấy lại được 442 tỷ.",50],
    ["D","Cắt giảm chi phí giao chặng cuối","Chặng cuối đang giảm 500đ/đơn — đó là phần đang làm tốt, không phải vấn đề.",30]
  ],
  correct:"B",
  framing:[["chi phí mỗi đơn","chi phí/đơn","đứng yên","không giảm"],["sản lượng tăng","30%","quy mô"]],
  branches:[["phân loại","kho"],["trung chuyển","vận chuyển"],["chặng cuối","giao hàng"],["công suất","nút thắt","cao điểm"]],
  numbers:[{v:1200,tol:1,pts:35,core:true},{v:312,tol:1,pts:20},{v:442,tol:1,pts:20},{v:7,tol:0.3,pts:15}],
  insight:[{kw:["nút thắt","vượt công suất","quá tải","bottleneck"],pts:40},{kw:["triệt tiêu","bù trừ","ăn hết","xoá sạch"],pts:35},{kw:["cao điểm","997"],pts:25}],
  unit:"tỷ|đ|nghìn",
  model:{
    problem:"Vì sao chi phí mỗi đơn đứng yên ở 15.000đ dù sản lượng tăng 30%, và làm gì để lấy lại lợi thế quy mô?",
    hyps:["Chi phí phân loại tại kho tăng vì kho vượt công suất","Vận chuyển trung chuyển rẻ hơn nhờ xe chạy đầy hơn","Giao chặng cuối rẻ hơn nhờ mật độ đơn cao hơn",""],
    evidence:"Ex.1: trung chuyển −700đ và chặng cuối −500đ — lợi thế quy mô vẫn chạy, tổng −1.200đ/đơn. Nhưng phân loại tăng +1.200đ/đơn nên triệt tiêu hoàn toàn; cả năm là 1.200 × 260 triệu đơn = 312 tỷ. Ex.2: trung bình 712 nghìn đơn/ngày = 89% công suất, ngày cao điểm 997 nghìn đơn vượt công suất 800 nghìn — kho là nút thắt, phải làm thêm giờ và thuê ngoài. Ex.3: máy phân loại 250 tỷ đưa chi phí về 2.500đ, tiết kiệm 1.700 × 260 triệu = 442 tỷ/năm, hoàn vốn khoảng 0,57 năm ≈ 7 tháng. H1 đúng; H2 và H3 đúng nhưng không phải vấn đề.",
    rec:"B"},
  mistakes:{
    logicLesson:"s-bottle-2",
    calc:{label:"mức tăng chi phí phân loại mỗi đơn", lesson:"s-cost-1",
      good:"Phân loại +1.200đ/đơn × 260 triệu đơn = 312 tỷ/năm; máy mới tiết kiệm 442 tỷ/năm, hoàn vốn ~7 tháng",
      why:"Operations case: tách chi phí đơn vị theo công đoạn rồi nhân lại với sản lượng để thấy quy mô tiền thật."},
    framework:{lesson:"s-bottle-1",
      good:"Tách chi phí mỗi đơn theo công đoạn: phân loại · trung chuyển · chặng cuối — rồi xem công suất từng công đoạn",
      why:"Chi phí trung bình đứng yên thường là hai xu hướng ngược chiều triệt tiêu nhau; phải tách mới thấy."},
    exhibit:{lesson:"s-capacity-1", bad:"Không chỉ ra kho phân loại vượt công suất vào ngày cao điểm",
      good:"Ex.2: cao điểm 997 nghìn đơn/ngày vượt công suất 800 nghìn — nguồn gốc của chi phí phân loại tăng",
      why:"Công suất được thiết kế cho ngày trung bình sẽ vỡ vào ngày cao điểm — nhìn đỉnh, không nhìn trung bình."}
  }
});

/* ─────────── cl-11 · M&A ─────────── */
R({
  id:"cl-11", title:"Mua lại đối thủ hay tự mở rộng?",
  brief:{context:"Tập đoàn bán lẻ đang có 3.000 cửa hàng tiện lợi và muốn thêm 800 cửa hàng. Có hai đường: mua lại một chuỗi 800 cửa hàng với giá 3.000 tỷ, hoặc tự mở trong 4 năm. Một đối thủ cũng đã đặt giá cho chuỗi này.",
         task:"chọn mua hay tự mở, và nếu mua thì mức giá tối đa là bao nhiêu. So sánh trong 5 năm, chưa chiết khấu."},
  exhibits:[
    {kind:"table", title:"Hai phương án đạt 800 cửa hàng", unit:"tỷ VND",
     head:["Chỉ tiêu","Mua lại","Tự mở"],
     rows:[["Vốn bỏ ra","3.000 giá mua + 400 cải tạo","1,5 mỗi cửa hàng"],["Tiến độ","800 cửa hàng ngay năm 1","200 cửa hàng/năm trong 4 năm"],
           ["EBITDA cửa hàng chín","0,6/năm","0,6/năm"]]},
    {kind:"metrics", title:"Quy tắc dòng tiền",
     items:[["Mua lại · năm 1","50% EBITDA","do tích hợp hệ thống"],["Mua lại · năm 2–5","100% EBITDA",""],
            ["Tự mở","EBITDA từ năm sau khi mở","năm mở cửa chưa có lãi"],["Khung so sánh","5 năm","chưa chiết khấu"]]},
    {kind:"metrics", title:"Nếu đối thủ mua được chuỗi này",
     items:[["EBITDA mất mỗi cửa hàng hiện hữu","0,1 tỷ/năm","do cạnh tranh trực tiếp"],["Số cửa hàng hiện hữu","3.000",""],
            ["Khả năng đối thủ mua nếu mình không mua","Rất cao","đã đặt giá"]]}
  ],
  options:[
    ["A","Tự mở — rẻ hơn 1.240 tỷ trong 5 năm","Đúng về chi phí trực tiếp nhưng bỏ qua 1.500 tỷ EBITDA mất đi nếu đối thủ mua được chuỗi.",45],
    ["B","Mua lại bằng mọi giá để chặn đối thủ","Phòng thủ có giá trị nhưng có giới hạn: trả trên 3.260 tỷ thì mua lại tệ hơn tự mở.",40],
    ["C","Mua ở giá 3.000 tỷ với giá trần 3.260 tỷ; vượt trần thì rút và tự mở","Tính cả giá trị phòng thủ và đặt giới hạn cho nó — quyết định có điều kiện rõ ràng.",95],
    ["D","Chờ một năm xem đối thủ có mua không rồi quyết","Chờ là để đối thủ quyết thay mình — mất đúng khoản 1.500 tỷ muốn tránh.",25]
  ],
  correct:"C",
  framing:[["mua lại","thâu tóm","m&a"],["tự mở","tự xây","tự mở rộng"]],
  branches:[["giá mua","chi phí đầu tư","vốn"],["ebitda","dòng tiền"],["thời gian","4 năm","mở dần","tốc độ"],["đối thủ","cạnh tranh"]],
  numbers:[{v:1240,tol:5,pts:30,core:true},{v:2160,tol:5,pts:15},{v:1500,tol:5,pts:20},{v:3260,tol:5,pts:25}],
  insight:[{kw:["đối thủ","phòng thủ","chặn"],pts:40},{kw:["giá trần","walk-away","giá tối đa"],pts:40},{kw:["cùng về đích","cùng quy mô","năm 5"],pts:20}],
  unit:"tỷ",
  model:{
    problem:"Nên mua lại chuỗi 800 cửa hàng với giá 3.000 tỷ hay tự mở trong 4 năm, và mua ở mức giá nào thì còn đáng?",
    hyps:["Giá mua và chi phí cải tạo cao hơn nhiều so với chi phí đầu tư tự mở","EBITDA 5 năm của phương án tự mở thấp hơn vì cửa hàng mở dần","Nếu đối thủ mua được chuỗi này, mình mất EBITDA ở cửa hàng hiện hữu",""],
    evidence:"Ex.1 và Ex.2 (5 năm, chưa chiết khấu): mua lại có EBITDA 240 + 480 × 4 = 2.160 tỷ, trừ 3.400 tỷ (giá mua + cải tạo) → ròng −1.240 tỷ. Tự mở: 480 + 360 + 240 + 120 = 1.200 tỷ EBITDA, trừ 1.200 tỷ đầu tư → ròng 0. Cả hai cùng về đích 800 cửa hàng ở năm 5, nên tự mở rẻ hơn 1.240 tỷ. Nhưng Ex.3: nếu đối thủ mua được, 3.000 cửa hàng hiện hữu mất 0,1 tỷ mỗi năm = 300 tỷ × 5 năm = 1.500 tỷ. Giá trị phòng thủ 1.500 lớn hơn chênh lệch 1.240 → nên mua. Giá trần: 2.160 − 400 + 1.500 = 3.260 tỷ; trả trên mức đó thì tự mở tốt hơn. H1 đúng nhưng H3 lật ngược kết luận; H2 đúng.",
    rec:"C"},
  mistakes:{
    logicLesson:"i-ma-3",
    calc:{label:"chênh lệch giá trị ròng 5 năm giữa mua lại và tự mở", lesson:"n-npv-1",
      good:"Mua: 2.160 − 3.400 = −1.240 tỷ; tự mở: 1.200 − 1.200 = 0; phòng thủ 1.500 tỷ → giá trần 3.260 tỷ",
      why:"M&A case phải so hai phương án trên cùng khung thời gian và cùng điểm đến, rồi mới cộng giá trị chiến lược."},
    framework:{lesson:"i-ma-1",
      good:"So sánh build vs buy theo 4 nhánh: vốn đầu tư · dòng tiền theo thời gian · tốc độ · phản ứng của đối thủ",
      why:"Thiếu nhánh đối thủ, build gần như luôn thắng buy trên giấy — và sai trong thực tế."},
    exhibit:{lesson:"i-ma-2", bad:"Bỏ qua thiệt hại nếu đối thủ mua được chuỗi và không đặt giá trần",
      good:"Ex.3: 3.000 cửa hàng × 0,1 tỷ × 5 năm = 1.500 tỷ EBITDA mất đi — đủ để lật kết luận",
      why:"Trong M&A, câu hỏi đúng không phải “có mua không” mà là “mua đến giá nào”."}
  },
  goodFeedback:"Lập luận ở tầm hội đồng quản trị: so sánh trên cùng điểm đến, định lượng giá trị phòng thủ và biến nó thành một giá trần."
});

})(window.SCORING.register);
