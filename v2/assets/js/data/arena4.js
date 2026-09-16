/* ===== ĐỀ ARENA · đợt 4: cc-01 · cc-02 · cc-03 (đề thi competition) =====
   Số liệu minh hoạ để luyện tập. Đáp án tính lại trong tests/scoring.test.js. */
(function(R){

/* ─────────── cc-01 · Growth · chuỗi F&B ─────────── */
R({
  id:"cc-01", title:"Chiến lược 3 năm cho chuỗi F&B sau đại dịch",
  brief:{context:"Tập đoàn F&B có 400 nhà hàng thuộc bốn thương hiệu. Sau đại dịch, khách ăn tại chỗ giảm, giao hàng chiếm 25% doanh thu và app giao hàng thu hoa hồng 25%. Hội đồng quản trị có 900 tỷ vốn cho 3 năm tới.",
         task:"đề xuất chiến lược 3 năm: dồn vốn vào đâu, xử lý kênh giao hàng thế nào, và mỗi lựa chọn mang về bao nhiêu EBITDA."},
  labels:{problem:"1 · Governing thought — câu trả lời chủ đạo", hyps:"2 · Ba trụ lập luận", evidence:"3 · Bằng chứng và con số cho từng trụ"},
  exhibits:[
    {kind:"table", title:"Kinh tế một nhà hàng trung bình", unit:"tỷ VND/năm",
     head:["Chỉ tiêu","Giá trị","Ghi chú"],
     rows:[["Doanh thu tại chỗ","15",""],["Doanh thu giao hàng","5","25% tổng doanh thu"],["Biên lợi nhuận gộp món","65%",""],
           ["Hoa hồng app giao hàng","25% doanh thu giao hàng",""],["Chi phí cố định nhà hàng","9","thuê, nhân sự, khấu hao"]]},
    {kind:"bars", title:"EBITDA mỗi nhà hàng theo thương hiệu", unit:"tỷ VND/năm",
     headline:"Lẩu tạo gấp mười lần đồ uống trên mỗi điểm", sub:"Số nhà hàng: lẩu 150 · nướng 120 · Nhật 80 · đồ uống 50",
     rows:[["Lẩu (150)",4,"var(--series-good)"],["Nướng (120)",3,"var(--series-focus)"],["Nhật (80)",1.5,"var(--series-warn)"],["Đồ uống (50)",0.4,"var(--series-bad)"]],
     max:5, ticks:[0,1,2,3,4,5]},
    {kind:"metrics", title:"Hai hướng đầu tư đang cân nhắc",
     items:[["Mở nhà hàng lẩu mới","15 tỷ mỗi nhà hàng","tối đa 60 nhà hàng trong 3 năm"],["App giao hàng riêng","60 tỷ đầu tư",""],
            ["App riêng giữ lại","80% đơn giao hàng",""],["Chi phí vận hành giao hàng tự làm","12% doanh thu giao hàng",""]]}
  ],
  options:[
    ["A","Dồn vốn xây app giao hàng riêng để thoát hoa hồng 25%","Chỉ thêm 0,12 tỷ mỗi nhà hàng vì mất 20% đơn — 48 tỷ/năm, nhỏ so với mở rộng thương hiệu mạnh.",45],
    ["B","Dùng 900 tỷ mở 60 nhà hàng lẩu trong 3 năm, tái cơ cấu 50 điểm đồ uống, và đàm phán lại hoa hồng giao hàng thay vì tự xây app","Đặt vốn vào nơi EBITDA mỗi điểm cao nhất: thêm 240 tỷ/năm, hoàn vốn 3,75 năm.",95],
    ["C","Mở đều thêm 20% nhà hàng cho mọi thương hiệu","Vốn chảy vào cả đồ uống chỉ tạo 0,4 tỷ mỗi điểm.",40],
    ["D","Giảm giá 15% để kéo khách ăn tại chỗ quay lại","Mất lãi gộp trên toàn bộ doanh thu tại chỗ; không có dữ liệu cho thấy giá là nguyên nhân.",30]
  ],
  correct:"B",
  framing:[["3 năm","chiến lược","tăng trưởng"],["sau đại dịch","tại chỗ","giao hàng","ebitda"]],
  branches:[["thương hiệu","danh mục","lẩu"],["giao hàng","kênh"],["mở rộng","vốn","nhà hàng mới"]],
  numbers:[{v:240,tol:1,pts:25,core:true},{v:1100,tol:2,pts:20},{v:48,tol:0.5,pts:20},{v:3.75,tol:0.05,pts:15},{v:2.75,tol:0.01,pts:10}],
  insight:[{kw:["danh mục","thương hiệu mạnh"],pts:40},{kw:["hoa hồng","đàm phán"],pts:35},{kw:["đồ uống"],pts:25}],
  unit:"tỷ|%|năm",
  model:{
    problem:"Chuỗi F&B nên dồn 900 tỷ vào mở rộng thương hiệu lẩu thay vì xây app giao hàng: đó là chiến lược 3 năm tạo nhiều EBITDA nhất sau đại dịch.",
    hyps:["Danh mục thương hiệu có hiệu quả rất khác nhau","Hoa hồng app giao hàng ăn mòn biên nhưng tự làm app tạo ít giá trị","Vốn mở rộng nên dồn vào nhà hàng mới của thương hiệu mạnh","Khách tại chỗ giảm không phải vì giá"],
    evidence:"Ex.1: mỗi nhà hàng lãi gộp 20 × 65% = 13 tỷ, trừ hoa hồng giao hàng 1,25 và chi phí cố định 9 → EBITDA 2,75 tỷ; cả chuỗi 400 × 2,75 = 1.100 tỷ. Ex.2: lẩu 4 tỷ mỗi nhà hàng, đồ uống chỉ 0,4 tỷ. Mở 60 nhà hàng lẩu với 900 tỷ vốn thêm 240 tỷ EBITDA/năm, hoàn vốn 3,75 năm. Ex.3: tự làm app giữ 80% đơn, chi phí 12% thay hoa hồng 25% → chỉ thêm 0,12 tỷ mỗi nhà hàng, 48 tỷ/năm cho 60 tỷ đầu tư — nên đàm phán lại hoa hồng. H1 đúng: danh mục thương hiệu mạnh quyết định; H2 đúng nhưng tác động nhỏ; H3 đúng; H4 không phải trọng tâm vì không có dữ liệu về giá. Tái cơ cấu 50 điểm đồ uống để giải phóng mặt bằng.",
    rec:"B"},
  mistakes:{
    logicLesson:"c-frame-2",
    calc:{label:"EBITDA tăng thêm mỗi năm từ phương án đầu tư được chọn", lesson:"n-roi-1",
      good:"60 nhà hàng lẩu × 4 tỷ = 240 tỷ EBITDA/năm, vốn 900 tỷ, hoàn vốn 3,75 năm; app riêng chỉ 400 × 0,12 = 48 tỷ/năm",
      why:"Đề competition luôn có hai ba hướng đầu tư — phải quy từng hướng ra EBITDA và thời gian hoàn vốn mới so được."},
    framework:{lesson:"i-growth-1",
      good:"Ba trụ: danh mục thương hiệu (dồn vào đâu) · kênh giao hàng (giữ hay tự làm) · kế hoạch vốn 3 năm",
      why:"Governing thought cần ba trụ không chồng lấn, mỗi trụ trả lời một quyết định của hội đồng."},
    exhibit:{lesson:"c-insight-1", bad:"Không dùng chênh lệch EBITDA giữa các thương hiệu và không đánh giá lại phương án app",
      good:"Ex.2: lẩu 4 tỷ vs đồ uống 0,4 tỷ mỗi điểm; Ex.3: app riêng chỉ thêm 48 tỷ/năm",
      why:"Insight của đề nằm ở sự chênh lệch — trung bình 2,75 tỷ che mất nó."}
  },
  goodFeedback:"Governing thought rõ, ba trụ không chồng lấn, mỗi lựa chọn đầu tư đều quy ra EBITDA và thời gian hoàn vốn."
});

/* ─────────── cc-02 · Market Entry · ngân hàng số nông thôn ─────────── */
R({
  id:"cc-02", title:"Đưa một ngân hàng số ra thị trường nông thôn",
  brief:{context:"Ngân hàng số muốn phục vụ người dân nông thôn chưa có tài khoản. Phục vụ qua chi nhánh truyền thống quá đắt; app thuần thì rẻ nhưng nhiều người không dùng được. Mục tiêu 2 triệu khách vào năm thứ ba.",
         task:"chọn mô hình phục vụ có lãi, lượng hoá lợi nhuận ở mục tiêu năm ba và điều kiện để mô hình không lỗ."},
  labels:{problem:"1 · Governing thought — câu trả lời chủ đạo", hyps:"2 · Ba trụ lập luận", evidence:"3 · Bằng chứng và con số cho từng trụ"},
  exhibits:[
    {kind:"table", title:"Chi phí phục vụ mỗi khách theo kênh", unit:"đồng/khách/năm",
     head:["Kênh","Chi phí phục vụ","Ghi chú"],
     rows:[["Chi nhánh truyền thống","600.000","thuê, nhân sự"],["Đại lý tạp hoá làm điểm giao dịch","120.000","hoa hồng đại lý"],
           ["App thuần","35.000","hạ tầng số"],["Doanh thu mỗi khách hoạt động","250.000","phí, tiền gửi, vay nhỏ"]]},
    {kind:"bars", title:"Tỷ lệ khách còn hoạt động sau 12 tháng", unit:"%",
     headline:"Khách có người hướng dẫn thì ở lại", sub:"Thí điểm ở ba tỉnh",
     rows:[["App thuần",25,"var(--series-bad)"],["Đại lý tạp hoá",64,"var(--series-good)"],["Chi nhánh",70,"var(--series-base)"]],
     max:100, ticks:[0,25,50,75,100]},
    {kind:"metrics", title:"Năng lực triển khai",
     items:[["Đại lý tạp hoá có thể ký","20.000",""],["Khách mỗi đại lý phục vụ tốt","100",""],
            ["Mục tiêu năm ba","2 triệu khách",""],["Khách nông thôn tự dùng được app","30%",""]]}
  ],
  options:[
    ["A","Mở 200 chi nhánh ở huyện để tạo niềm tin","Mỗi khách qua chi nhánh lỗ 425.000đ/năm — càng nhiều khách càng lỗ.",20],
    ["B","Dùng mạng lưới đại lý tạp hoá làm điểm giao dịch, app hỗ trợ cho người dùng được, đặt mục tiêu tỷ lệ khách hoạt động trên 48%","Kênh duy nhất có lãi ở quy mô: 40.000đ mỗi khách, 80 tỷ/năm ở 2 triệu khách.",95],
    ["C","Chỉ dùng app, chi mạnh quảng cáo để mở tài khoản","Chi phí thấp nhưng chỉ 25% khách còn hoạt động, và 70% khách nông thôn không tự dùng được app.",45],
    ["D","Mở tài khoản miễn phí thật nhiều rồi tính sau","Số tài khoản không tạo doanh thu; khách không hoạt động vẫn tốn chi phí phục vụ.",30]
  ],
  correct:"B",
  framing:[["nông thôn","chưa có tài khoản"],["chi phí phục vụ","có lãi","mô hình"]],
  branches:[["kênh","chi nhánh","đại lý","app"],["doanh thu","hoạt động"],["chi phí phục vụ","chi phí"]],
  numbers:[{v:80,tol:0.3,pts:30,core:true},{v:40000,tol:1,pts:20},{v:48,tol:0.5,pts:20},{v:425000,tol:1,pts:10},{v:27500,tol:1,pts:10}],
  insight:[{kw:["tỷ lệ hoạt động","khách hoạt động"],pts:40},{kw:["tạp hoá","người hướng dẫn"],pts:35},{kw:["app thuần","chỉ app"],pts:25}],
  unit:"tỷ|đ|%",
  model:{
    problem:"Ngân hàng số phục vụ nông thôn có lãi bằng mạng lưới đại lý tạp hoá: đây là mô hình duy nhất có chi phí phục vụ thấp hơn doanh thu của khách hoạt động.",
    hyps:["Kênh chi nhánh làm chi phí phục vụ quá cao","Tỷ lệ khách hoạt động quyết định doanh thu","App thuần đủ để phục vụ khách nông thôn",""],
    evidence:"Ex.1–2: mỗi khách chỉ tạo doanh thu nếu hoạt động, 250.000đ/năm. Đại lý: 64% × 250.000 − 120.000 = 40.000đ mỗi khách; app thuần: 25% × 250.000 − 35.000 = 27.500đ; chi nhánh: 70% × 250.000 − 600.000 = −425.000đ. Ex.3: 20.000 đại lý tạp hoá × 100 khách đủ phục vụ 2 triệu khách → 80 tỷ/năm. Mô hình đại lý hoà vốn khi tỷ lệ hoạt động trên 48%. H1 đúng: kênh quyết định chi phí phục vụ; H2 đúng: tỷ lệ hoạt động quan trọng hơn số tài khoản mở; H3 bị bác bỏ vì app thuần chỉ giữ 25% khách hoạt động.",
    rec:"B"},
  mistakes:{
    logicLesson:"i-entry-3",
    calc:{label:"lợi nhuận mỗi năm ở mục tiêu 2 triệu khách", lesson:"f-unit-1",
      good:"Đại lý: 64% × 250.000 − 120.000 = 40.000đ/khách × 2 triệu = 80 tỷ/năm; hoà vốn ở tỷ lệ hoạt động 48%",
      why:"Doanh thu gắn với khách hoạt động, chi phí gắn với mọi khách đã mở — phải tính trên cùng một khách."},
    framework:{lesson:"i-entry-1",
      good:"Ba trụ: kênh phục vụ (chi phí) · tỷ lệ hoạt động (doanh thu) · năng lực mở rộng tới mục tiêu",
      why:"Case thâm nhập thị trường chi phí cao phải tìm mô hình có đơn vị kinh tế dương trước khi bàn quy mô."},
    exhibit:{lesson:"m-journey-1", bad:"Không dùng tỷ lệ khách hoạt động theo kênh",
      good:"Ex.2: app thuần 25%, đại lý 64% — tỷ lệ hoạt động đảo ngược thứ hạng chi phí rẻ nhất",
      why:"Kênh rẻ nhất chưa chắc có lãi nhất khi khách không ở lại."}
  },
  goodFeedback:"Chọn mô hình bằng kinh tế một khách hoạt động, có con số ở quy mô mục tiêu và ngưỡng để mô hình không lỗ."
});

/* ─────────── cc-03 · Operations · bán lẻ đa kênh ─────────── */
R({
  id:"cc-03", title:"Tái thiết chuỗi cung ứng cho nhà bán lẻ đa kênh",
  brief:{context:"Nhà bán lẻ thời trang đa kênh có doanh thu 10.000 tỷ, 30% từ online. Đơn online và cửa hàng dùng hai hệ thống tồn kho tách rời. Trong năm, tỷ lệ giao hàng trễ lên 22% và tồn kho tăng 40%.",
         task:"tìm nguyên nhân chung của cả hai vấn đề, thiết kế lại chuỗi cung ứng và lượng hoá lợi ích."},
  labels:{problem:"1 · Governing thought — câu trả lời chủ đạo", hyps:"2 · Ba trụ lập luận", evidence:"3 · Bằng chứng và con số cho từng trụ"},
  exhibits:[
    {kind:"table", title:"Tồn kho và vòng quay", unit:"tỷ VND",
     head:["Chỉ tiêu","Năm nay","Ghi chú"],
     rows:[["Doanh thu","10.000","30% online"],["Giá vốn hàng bán","7.000",""],["Tồn kho cuối năm","1.400",{t:"+40%",d:"down"}],
           ["Vòng quay tồn kho năm trước","7 lần",""],["Chi phí vốn","12%/năm",""]]},
    {kind:"bars", title:"Tỷ lệ giao trễ theo nơi xuất hàng đơn online", unit:"%",
     headline:"Đơn xuất từ cửa hàng gần khách ít trễ hơn nhiều", sub:"Hiện 80% đơn online xuất từ kho trung tâm, 20% từ cửa hàng",
     rows:[["Kho online trung tâm",25,"var(--series-bad)"],["Cửa hàng gần nhất",10,"var(--series-good)"]],
     max:30, ticks:[0,10,20,30]},
    {kind:"metrics", title:"Phương án hợp nhất tồn kho",
     items:[["Hệ thống tồn kho","gộp online và cửa hàng",""],["Vòng quay kỳ vọng","trở về 7 lần",""],
            ["Đơn online xuất từ cửa hàng gần nhất","70%","sau hợp nhất"]]}
  ],
  options:[
    ["A","Xây thêm một kho online thứ hai","Thêm một nơi giữ hàng — tồn kho còn phình to hơn, trong khi đơn xuất từ kho vẫn trễ 25%.",30],
    ["B","Hợp nhất tồn kho online và cửa hàng thành một hệ thống, giao 70% đơn online từ cửa hàng gần nhất","Sửa gốc chung của cả hai vấn đề: giải phóng 400 tỷ tồn kho và đưa tỷ lệ trễ về 14,5%.",95],
    ["C","Tăng tồn kho an toàn để không thiếu hàng","Trễ đến từ nơi xuất hàng, không phải thiếu hàng — thêm tồn kho làm vấn đề tiền mặt nặng hơn.",35],
    ["D","Thuê đơn vị giao hàng nhanh hơn cho kho trung tâm","Có thể giảm trễ một phần nhưng không chạm tồn kho 1.400 tỷ.",50]
  ],
  correct:"B",
  framing:[["giao hàng trễ","giao trễ","22%"],["tồn kho","40%","chuỗi cung ứng"]],
  branches:[["tồn kho","vòng quay"],["giao hàng","trễ","nơi xuất"],["kho","cửa hàng","hợp nhất"]],
  numbers:[{v:400,tol:1,pts:30,core:true},{v:48,tol:0.3,pts:20},{v:14.5,tol:0.1,pts:20},{v:1000,tol:1,pts:10}],
  insight:[{kw:["hợp nhất","gộp tồn kho"],pts:40},{kw:["cửa hàng gần nhất","giao từ cửa hàng"],pts:35},{kw:["chi phí vốn","tiền mặt"],pts:25}],
  unit:"tỷ|%",
  model:{
    problem:"Giao trễ 22% và tồn kho tăng 40% có chung một gốc là hai hệ thống tồn kho tách rời — hợp nhất tồn kho và giao từ cửa hàng sửa được cả hai.",
    hyps:["Tồn kho online và cửa hàng tách rời làm vòng quay giảm","Giao hàng trễ do xuất từ kho trung tâm xa khách","Thiếu tồn kho an toàn gây trễ",""],
    evidence:"Ex.1: giá vốn 7.000 tỷ, tồn kho 1.400 tỷ → vòng quay 5 lần so với 7 lần năm trước. Đưa về 7 lần cần tồn kho 1.000 tỷ, giải phóng 400 tỷ, tiết kiệm 48 tỷ chi phí vốn mỗi năm. Ex.2: đơn online xuất từ kho trung tâm trễ 25%, từ cửa hàng gần nhất chỉ 10%; hiện 80% đơn đi từ kho nên trễ chung 22%. Ex.3: hợp nhất tồn kho và giao từ cửa hàng gần nhất cho 70% đơn → trễ còn 0,3 × 25% + 0,7 × 10% = 14,5%. H1 đúng: hai kho tách rời làm tồn kho phình to; H2 đúng; H3 bị bác bỏ vì thêm tồn kho không sửa được trễ.",
    rec:"B"},
  mistakes:{
    logicLesson:"s-bottle-2",
    calc:{label:"tiền mặt giải phóng khi vòng quay trở về 7 lần", lesson:"s-inventory-1",
      good:"Tồn kho mục tiêu 7.000 ÷ 7 = 1.000 tỷ → giải phóng 400 tỷ, tiết kiệm 48 tỷ/năm; trễ còn 0,3 × 25% + 0,7 × 10% = 14,5%",
      why:"Đề vận hành đa kênh phải quy cả hai vấn đề ra con số — tiền mặt bị giữ và tỷ lệ trễ sau khi sửa."},
    framework:{lesson:"s-logistics-1",
      good:"Ba trụ: tồn kho (vòng quay, tiền mặt) · giao hàng (nơi xuất hàng, tỷ lệ trễ) · cấu trúc mạng lưới (kho và cửa hàng)",
      why:"Hai triệu chứng khác nhau thường có một nguyên nhân cấu trúc chung — cây phải tìm được điểm giao nhau."},
    exhibit:{lesson:"s-logistics-2", bad:"Không dùng tỷ lệ trễ theo nơi xuất hàng",
      good:"Ex.2: kho trung tâm trễ 25%, cửa hàng gần nhất 10% — nơi xuất hàng là đòn bẩy giảm trễ",
      why:"Tỷ lệ trễ trung bình 22% chỉ trở thành hành động khi tách theo nơi xuất hàng."}
  },
  goodFeedback:"Tìm được gốc chung của hai triệu chứng và lượng hoá cả tiền mặt giải phóng lẫn tỷ lệ trễ sau khi thiết kế lại."
});

})(window.SCORING.register);
