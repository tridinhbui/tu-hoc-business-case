/* ===== ĐỀ ARENA · đợt 2: cl-04 · cl-05 · cl-08 =====
   Số liệu minh hoạ để luyện tập. Đáp án tính lại trong tests/scoring.test.js. */
(function(R){

/* ─────────── cl-04 · Profitability · bán lẻ ─────────── */
R({
  id:"cl-04", title:"Chuỗi bách hoá chưa bao giờ có lãi",
  brief:{context:"Chuỗi bách hoá có 1.700 cửa hàng, doanh thu trung bình 1,5 tỷ mỗi cửa hàng mỗi tháng, nhưng chưa năm nào có lãi. Ban điều hành đang tranh luận giữa đóng bớt cửa hàng yếu và mở thêm để chia nhỏ chi phí chung.",
         task:"tìm vì sao chuỗi lỗ, lượng hoá mức lỗ và chọn đòn bẩy đưa chuỗi về hoà vốn."},
  exhibits:[
    {kind:"table", title:"Kinh tế một cửa hàng trung bình", unit:"triệu VND/tháng",
     head:["Chỉ tiêu","Giá trị","Ghi chú"],
     rows:[["Doanh thu","1.500",""],["Lãi gộp","330","biên gộp 22%"],["Thuê mặt bằng","60","cố định"],
           ["Nhân sự cửa hàng","120","cố định"],["Điện, vận hành","45","cố định"],[{t:"Lãi sau chi phí cửa hàng",b:1},{t:"105",b:1},""]]},
    {kind:"bars", title:"Doanh thu mỗi cửa hàng theo nhóm", unit:"triệu VND/tháng",
     headline:"Nhóm C nằm dưới điểm hoà vốn cấp cửa hàng", sub:"Đường đứt nét: doanh thu để lãi gộp bù chi phí cửa hàng (225 ÷ 22%)",
     rows:[["Nhóm A (500 cửa hàng)",2000,"var(--series-good)"],["Nhóm B (700 cửa hàng)",1500,"var(--series-focus)"],["Nhóm C (500 cửa hàng)",1000,"var(--series-bad)"]],
     max:2500, ticks:[0,500,1000,1500,2000,2500], threshold:{v:1023,label:"hoà vốn cửa hàng ≈1.023"}},
    {kind:"metrics", title:"Chi phí chung toàn chuỗi",
     items:[["Kho, vận chuyển, văn phòng","255 tỷ/tháng","≈150 triệu mỗi cửa hàng"],["Khi đóng bớt cửa hàng","gần như không đổi","kho và xe thuê dài hạn"],
            ["Mục tiêu năm tới","hoà vốn EBIT",""]]}
  ],
  options:[
    ["A","Đóng 500 cửa hàng nhóm C","Nhóm C chỉ lỗ 2,5 tỷ/tháng ở cấp cửa hàng; chi phí chung 255 tỷ vẫn còn nguyên nên chuỗi vẫn lỗ khoảng 74 tỷ/tháng.",40],
    ["B","Dừng mở mới, tăng doanh thu mỗi cửa hàng khoảng 14% bằng hàng tươi và đơn online giao từ cửa hàng hiện có","Đánh vào gốc: mật độ doanh thu. Mỗi cửa hàng cần khoảng 1.705 triệu/tháng để lãi gộp gánh được cả chi phí chung.",95],
    ["C","Mở thêm 300 cửa hàng để chia nhỏ chi phí chung","Cửa hàng mới thường rơi vào nhóm doanh thu thấp — thêm cửa hàng lỗ để chia chi phí là nhân khoản lỗ.",35],
    ["D","Cắt 20% nhân sự cửa hàng","Tiết kiệm khoảng 41 tỷ/tháng, không đủ bù 76,5 tỷ và làm dịch vụ kém đi, kéo doanh thu xuống.",45]
  ],
  correct:"B",
  framing:[["lãi","lỗ","lợi nhuận"],["chưa bao giờ","cửa hàng","1.700","quy mô"]],
  branches:[["doanh thu"],["thuê","nhân sự","chi phí cửa hàng"],["chi phí chung","overhead","kho","phân bổ"]],
  numbers:[{v:76.5,tol:0.3,pts:35,core:true},{v:1705,tol:6,pts:25},{v:2.5,tol:0.05,pts:15},{v:13.6,tol:0.2,pts:15}],
  insight:[{kw:["chi phí chung","overhead"],pts:40},{kw:["mật độ doanh thu","doanh thu mỗi cửa hàng"],pts:35},{kw:["đóng 500","nhóm c"],pts:25}],
  unit:"tỷ|triệu|%",
  model:{
    problem:"Vì sao chuỗi 1.700 cửa hàng chưa bao giờ có lãi, và đòn bẩy nào đưa chuỗi về hoà vốn?",
    hyps:["Doanh thu mỗi cửa hàng quá thấp so với chi phí","Chi phí cửa hàng (thuê, nhân sự) quá cao","Chi phí chung kho và vận chuyển phân bổ quá nặng",""],
    evidence:"Ex.1: mỗi cửa hàng lãi gộp 22% trừ thuê, nhân sự, vận hành 225 triệu. Ex.2: nhóm A đóng góp 500 × 215 = 107,5 tỷ, nhóm B 700 × 105 = 73,5 tỷ, nhóm C 500 × (−5) = −2,5 tỷ mỗi tháng. Tổng 178,5 tỷ không đủ trả 255 tỷ chi phí chung (Ex.3) → lỗ 76,5 tỷ/tháng. Đóng 500 cửa hàng nhóm C chỉ cải thiện 2,5 tỷ vì kho và văn phòng vẫn còn. Hoà vốn cần doanh thu mỗi cửa hàng khoảng 1.705 triệu/tháng, tức tăng 13,6%. H1 đúng: mật độ doanh thu thấp là gốc; H2 bị bác bỏ; H3 đúng nhưng không cắt được ngắn hạn.",
    rec:"B"},
  mistakes:{
    logicLesson:"f-profit-3",
    calc:{label:"mức lỗ mỗi tháng của toàn chuỗi sau chi phí chung", lesson:"f-profit-4",
      good:"Đóng góp A 107,5 + B 73,5 − C 2,5 = 178,5 tỷ − chi phí chung 255 tỷ = lỗ 76,5 tỷ/tháng; hoà vốn cần ≈1.705 triệu/cửa hàng",
      why:"Chuỗi lỗ không có nghĩa từng cửa hàng lỗ. Phải tính đóng góp từng nhóm rồi mới trừ chi phí chung."},
    framework:{lesson:"i-profit-2",
      good:"Ba tầng: doanh thu mỗi cửa hàng · chi phí cấp cửa hàng · chi phí chung phân bổ",
      why:"Case chuỗi phải tách lãi cấp cửa hàng khỏi chi phí chung — đóng hay mở cửa hàng chỉ tác động tầng thứ hai."},
    exhibit:{lesson:"i-profit-3", bad:"Không nhận ra chi phí chung không giảm khi đóng cửa hàng",
      good:"Ex.3: chi phí chung 255 tỷ/tháng gần như không đổi khi đóng bớt — đóng nhóm C chỉ cứu 2,5 tỷ",
      why:"Đóng đơn vị lỗ chỉ có lợi khi chi phí phân bổ cho nó biến mất theo."}
  }
});

/* ─────────── cl-05 · Profitability · ngân hàng ─────────── */
R({
  id:"cl-05", title:"NIM giảm, chi phí rủi ro tăng",
  brief:{context:"Ngân hàng tăng dư nợ 15% trong năm và vẫn báo lãi, nhưng lợi nhuận trước thuế giảm mạnh. Ban điều hành cho rằng do cạnh tranh lãi suất và muốn tăng tốc cho vay để bù.",
         task:"tách mức giảm lợi nhuận theo nguyên nhân, đánh giá chất lượng tăng trưởng và đưa một khuyến nghị."},
  exhibits:[
    {kind:"table", title:"Kết quả kinh doanh", unit:"nghìn tỷ VND/năm",
     head:["Chỉ tiêu","Năm trước","Năm nay"],
     rows:[["Dư nợ bình quân","400","460"],["NIM","4,5%","3,8%"],["Thu ngoài lãi","8","9"],
           ["Chi phí vận hành","10","11"],["Chi phí dự phòng (% dư nợ)","1,0%","1,6%"]]},
    {kind:"bars", title:"Tỷ lệ nợ xấu theo phân khúc cho vay", unit:"%",
     headline:"Cho vay tín chấp có nợ xấu cao nhất", sub:"Cuối năm nay",
     rows:[["Doanh nghiệp lớn",0.8,"var(--series-base)"],["SME",2.1,"var(--series-base)"],["Bất động sản",3.5,"var(--series-warn)"],["Tiêu dùng tín chấp",5.2,"var(--series-bad)"]],
     max:6, ticks:[0,2,4,6]},
    {kind:"metrics", title:"Cơ cấu tăng trưởng",
     items:[["Tỷ trọng dư nợ tín chấp","12% → 20%",""],["Tỷ lệ CASA","40% → 32%","tiền gửi không kỳ hạn"],
            ["Lãi suất cho vay tín chấp","18%/năm",""]]}
  ],
  options:[
    ["A","Đẩy mạnh cho vay tín chấp vì lãi suất 18%","Lãi suất cao đi kèm nợ xấu 5,2% — dự phòng đã lấy đi 2,76 nghìn tỷ vì tỷ lệ rủi ro tăng.",30],
    ["B","Siết cho vay tín chấp, định giá rủi ro theo phân khúc và khôi phục CASA bằng gói tài khoản thanh toán","Đánh vào hai nguồn gốc: chi phí rủi ro của tín chấp và chi phí vốn tăng do CASA giảm.",95],
    ["C","Cắt 10% chi phí vận hành","Tiết kiệm 1,1 nghìn tỷ, chưa bằng một phần ba mức giảm 3,88 nghìn tỷ — và không chạm nguyên nhân.",45],
    ["D","Tăng lãi suất tiền gửi để hút vốn cho tăng trưởng","Chi phí vốn tăng thêm, NIM còn thu hẹp hơn.",25]
  ],
  correct:"B",
  framing:[["lợi nhuận","lãi"],["chất lượng","nim","dự phòng","rủi ro"]],
  branches:[["thu nhập lãi","nim","dư nợ"],["dự phòng","nợ xấu","rủi ro"],["chi phí vận hành","thu ngoài lãi"]],
  numbers:[{v:3.88,tol:0.03,pts:35,core:true},{v:2.76,tol:0.03,pts:25},{v:3.22,tol:0.03,pts:20},{v:2.7,tol:0.02,pts:10}],
  insight:[{kw:["tín chấp","tiêu dùng"],pts:40},{kw:["casa","chi phí vốn","huy động"],pts:35},{kw:["chất lượng lợi nhuận","đánh đổi"],pts:25}],
  unit:"nghìn tỷ|%",
  model:{
    problem:"Lợi nhuận trước thuế giảm dù dư nợ tăng 15% — cần tách phần do NIM, do dự phòng rủi ro và đánh giá chất lượng tăng trưởng.",
    hyps:["Thu nhập lãi giảm vì NIM thu hẹp","Chi phí dự phòng tăng do nợ xấu ở cho vay tín chấp","Chi phí vận hành tăng nhanh hơn thu ngoài lãi",""],
    evidence:"Ex.1: lợi nhuận trước thuế năm trước 18 + 8 − 10 − 4 = 12 nghìn tỷ; năm nay 17,48 + 9 − 11 − 7,36 = 8,12 → giảm 3,88 nghìn tỷ. Tách thu nhập lãi: dư nợ tăng mang về +2,7 nhưng NIM giảm 0,7 điểm lấy đi 3,22. Dự phòng tăng 3,36, trong đó 2,76 do tỷ lệ dự phòng lên 1,6%. Ex.2 và Ex.3: tín chấp nợ xấu 5,2% và tỷ trọng tăng từ 12% lên 20%; CASA giảm từ 40% xuống 32% làm chi phí vốn tăng. H1 và H2 đúng; H3 bị bác bỏ vì chi phí vận hành chỉ tăng 1. Tăng trưởng đang đánh đổi chất lượng lợi nhuận.",
    rec:"B"},
  mistakes:{
    logicLesson:"i-profit-3",
    calc:{label:"mức giảm lợi nhuận trước thuế và phần do dự phòng", lesson:"i-profit-2",
      good:"LNTT 12 → 8,12 nghìn tỷ (−3,88). Thu nhập lãi: dư nợ +2,7, NIM −3,22. Dự phòng +3,36, trong đó 2,76 do tỷ lệ rủi ro",
      why:"Case ngân hàng phải tách hiệu ứng quy mô dư nợ khỏi hiệu ứng tỷ lệ (NIM, tỷ lệ dự phòng)."},
    framework:{lesson:"f-profit-2",
      good:"Cây lợi nhuận ngân hàng: thu nhập lãi (dư nợ × NIM) · thu ngoài lãi · chi phí vận hành · chi phí dự phòng",
      why:"Ngân hàng không có \"giá vốn\" — chi phí vốn nằm trong NIM và chi phí rủi ro nằm ở dự phòng."},
    exhibit:{lesson:"i-chart-1", bad:"Không gắn mức tăng dự phòng với cho vay tín chấp và CASA",
      good:"Ex.2–3: tín chấp nợ xấu 5,2%, tỷ trọng 12% → 20%; CASA 40% → 32%",
      why:"Hai exhibit phụ giải thích vì sao hai tỷ lệ ở Ex.1 xấu đi — thiếu chúng thì khuyến nghị không có địa chỉ."}
  }
});

/* ─────────── cl-08 · Operations · bệnh viện ─────────── */
R({
  id:"cl-08", title:"Bệnh viện tư và bài toán giường trống",
  brief:{context:"Bệnh viện tư 500 giường có chi phí gần như cố định nhưng chỉ lấp đầy 60% số giường. Khoa sản và nhi có bệnh nhân phải chờ, trong khi khoa nội và ngoại vắng.",
         task:"lượng hoá vì sao bệnh viện lỗ và đề xuất cách đưa về hoà vốn mà không cần xây thêm."},
  exhibits:[
    {kind:"table", title:"Kinh tế giường bệnh", unit:"mỗi năm",
     head:["Chỉ tiêu","Giá trị","Ghi chú"],
     rows:[["Số giường","500",""],["Công suất lấp đầy","60%",""],["Doanh thu mỗi ngày-giường","5 triệu",""],
           ["Chi phí biến đổi mỗi ngày-giường","1,5 triệu","thuốc, vật tư"],["Chi phí cố định","420 tỷ","nhân sự, khấu hao, thuê"]]},
    {kind:"bars", title:"Công suất lấp đầy theo khoa", unit:"%",
     headline:"Sản và nhi quá tải, nội và ngoại dư giường", sub:"Đường đứt nét: công suất hoà vốn toàn viện",
     rows:[["Sản (80 giường)",85,"var(--series-bad)"],["Nhi (80 giường)",80,"var(--series-bad)"],["Tim mạch (100 giường)",60,"var(--series-base)"],
           ["Ngoại (120 giường)",45,"var(--series-focus)"],["Nội (120 giường)",45,"var(--series-focus)"]],
     max:100, ticks:[0,25,50,75,100], threshold:{v:65.75,label:"hoà vốn 65,75%"}},
    {kind:"metrics", title:"Phương án phân bổ lại giường",
     items:[["Danh sách chờ sản – nhi","35 bệnh nhân/ngày",""],["Giường chuyển được từ nội – ngoại","40 giường","chi phí chuyển đổi nhỏ"],
            ["Công suất kỳ vọng của giường chuyển","85%","như khoa sản hiện nay"]]}
  ],
  options:[
    ["A","Cắt 15% điều dưỡng để giảm chi phí cố định","Giảm chất lượng chăm sóc ở khoa đang quá tải — chi phí giảm nhưng công suất và doanh thu có thể giảm theo.",35],
    ["B","Chuyển 40 giường nội – ngoại sang sản – nhi đang có danh sách chờ, ký hợp đồng khám doanh nghiệp để lấp khoa nội – ngoại","Tận dụng nhu cầu có sẵn: thêm khoảng 20 tỷ lãi góp mỗi năm mà không cần vốn lớn, và đánh vào công suất — đòn bẩy của chi phí cố định.",95],
    ["C","Xây thêm tầng 100 giường","Thêm chi phí cố định khi giường hiện có còn trống 40%.",20],
    ["D","Giảm giá 20% toàn viện để hút bệnh nhân","Khoa sản – nhi vốn đã đầy; giảm giá làm mất lãi góp ở nơi không cần thêm khách.",40]
  ],
  correct:"B",
  framing:[["giường","công suất","lấp đầy"],["lỗ","chi phí cố định","hoà vốn"]],
  branches:[["công suất","lấp đầy"],["giá"],["chi phí cố định"],["khoa","phân bổ"]],
  numbers:[{v:65.75,tol:0.15,pts:35,core:true},{v:36.75,tol:0.1,pts:25},{v:20.44,tol:0.05,pts:20},{v:3.5,tol:0.02,pts:10}],
  insight:[{kw:["danh sách chờ","chuyển giường","phân bổ lại"],pts:40},{kw:["đòn bẩy","cố định"],pts:35},{kw:["khoa nội","khoa ngoại"],pts:25}],
  unit:"tỷ|triệu|%",
  model:{
    problem:"Bệnh viện 500 giường đang lỗ với công suất lấp đầy 60% — làm sao đưa về hoà vốn khi chi phí cố định chiếm phần lớn?",
    hyps:["Công suất lấp đầy thấp so với chi phí cố định","Giá dịch vụ mỗi ngày-giường quá thấp","Giường phân bổ sai giữa các khoa",""],
    evidence:"Ex.1: mỗi ngày-giường lãi góp 5 − 1,5 = 3,5 triệu. 500 giường × 60% × 365 ngày × 3,5 triệu = 383,25 tỷ, trừ 420 tỷ cố định → lỗ 36,75 tỷ. Hoà vốn cần 420 ÷ 638,75 = 65,75% công suất. Ex.2: sản 85% và nhi 80% quá tải trong khi khoa nội và khoa ngoại chỉ 45%. Ex.3: có danh sách chờ 35 bệnh nhân/ngày; chuyển giường 40 giường sang sản – nhi thêm 16 giường có bệnh nhân mỗi ngày = 20,44 tỷ lãi góp/năm. Chi phí cố định cao nên đòn bẩy nằm ở công suất. H1 và H3 đúng; H2 bị bác bỏ vì khoa đông nhất vẫn quá tải ở giá hiện tại.",
    rec:"B"},
  mistakes:{
    logicLesson:"i-ops-2",
    calc:{label:"công suất hoà vốn của bệnh viện", lesson:"n-breakeven-1",
      good:"Lãi góp 3,5 triệu/ngày-giường; hoà vốn = 420 tỷ ÷ (500 × 365 × 3,5 triệu) = 65,75%; hiện lỗ 36,75 tỷ",
      why:"Doanh nghiệp chi phí cố định cao: tính hoà vốn theo công suất trước khi bàn giá hay cắt giảm."},
    framework:{lesson:"i-ops-1",
      good:"Tách: công suất lấp đầy · giá mỗi ngày-giường · chi phí cố định · phân bổ giường giữa các khoa",
      why:"Công suất trung bình 60% che giấu khoa quá tải và khoa dư thừa."},
    exhibit:{lesson:"s-capacity-1", bad:"Không dùng dữ liệu công suất theo khoa và danh sách chờ",
      good:"Ex.2–3: sản – nhi 80–85% có 35 bệnh nhân chờ/ngày, nội – ngoại 45% — chuyển 40 giường thêm 20,44 tỷ",
      why:"Nhu cầu chưa phục vụ đã có sẵn trong dữ liệu — rẻ hơn mọi cách tạo nhu cầu mới."}
  }
});

})(window.SCORING.register);
