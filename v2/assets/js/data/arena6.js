/* ===== ĐỀ ARENA · đợt 6: iv-03 → iv-10 (case phỏng vấn) =====
   Số liệu minh hoạ để luyện tập. Mọi con số then chốt tính lại được từ exhibit. */
(function(R){

/* ─────────── iv-03 · Pricing · chuỗi rạp chiếu phim ─────────── */
R({
  id:"iv-03", title:"Pricing: chuỗi rạp muốn tăng giá vé 10%",
  brief:{context:"Người phỏng vấn: \"Một chuỗi rạp chiếu phim định tăng giá vé 10% từ quý sau để cải thiện lợi nhuận. CEO hỏi có nên làm không.\" Ba exhibit được đưa khi bạn hỏi.",
         task:"lượng hoá tác động thật của việc tăng giá lên lợi nhuận và đưa khuyến nghị về cách định giá."},
  labels:{problem:"1 · Nhắc lại đề bằng một câu", hyps:"2 · Cấu trúc bạn nói với người phỏng vấn", evidence:"3 · Phân tích và con số"},
  exhibits:[
    {kind:"table", title:"Hoạt động hiện tại", unit:"năm gần nhất",
     head:["Chỉ tiêu","Giá trị","Ghi chú"],
     rows:[["Lượt xem","8 triệu",""],["Giá vé trung bình","90.000đ",""],["Doanh thu vé","720 tỷ",""],
           ["Chia doanh thu vé với nhà phát hành","50%","phần rạp giữ lại 50%"],
           ["Doanh thu bắp nước mỗi lượt","30.000đ","biên lãi góp 70%"]]},
    {kind:"bars", title:"Co giãn cầu theo giá (thử nghiệm 12 rạp)", unit:"% thay đổi lượt xem",
     headline:"Tăng giá 10% làm lượt xem giảm 6%", sub:"Thử nghiệm 8 tuần",
     rows:[["Tăng giá 5%",-3,"var(--series-base)"],["Tăng giá 10%",-6,"var(--series-bad)"],["Tăng giá 15%",-11,"var(--series-bad)"]],
     max:12, ticks:[0,3,6,9,12]},
    {kind:"metrics", title:"Cơ cấu lượt xem",
     items:[["Suất chiếu thứ Hai–Thứ Năm","38%","công suất ghế 21%"],["Suất cuối tuần","62%","công suất ghế 64%"],
            ["Tỷ lệ lượt xem có mua bắp nước","55%",""]]}
  ],
  options:[
    ["A","Tăng giá vé 10% đồng loạt mọi suất chiếu","Lãi góp vé chỉ thêm 12,24 tỷ nhưng mất 10,08 tỷ lãi bắp nước — gần như không được gì mà mất lượt khách.",40],
    ["B","Giữ giá cuối tuần, chỉ tăng giá suất cuối tuần cao điểm và giảm giá suất trong tuần để lấp ghế trống, đồng thời giữ giá bắp nước","Định giá theo khung giờ và ngày trong tuần: lấy thêm giá ở nơi cầu không co giãn và lấy thêm lượt ở suất công suất 21%.",95],
    ["C","Giảm giá vé 10% toàn hệ thống","Lượt tăng không đủ bù phần giá mất trên toàn bộ 8 triệu lượt.",35],
    ["D","Cắt các suất chiếu vắng khách trong tuần","Giảm chi phí nhỏ nhưng bỏ luôn phần lãi góp bắp nước của các suất đó.",45]
  ],
  correct:"B",
  framing:[["rạp","vé"],["tăng giá","lợi nhuận"]],
  branches:[["giá vé","giá bán"],["lượt xem","co giãn"],["bắp nước","đồ ăn"],["chia doanh thu","nhà phát hành","chi phí"]],
  numbers:[{v:12.24,tol:0.05,pts:30,core:true},{v:24.48,tol:0.05,pts:25},{v:10.08,tol:0.05,pts:20},{v:2.16,tol:0.05,pts:15}],
  insight:[{kw:["bắp nước","đồ ăn"],pts:40},{kw:["co giãn","lượt giảm"],pts:35},{kw:["khung giờ","ngày trong tuần"],pts:25}],
  unit:"tỷ|%|đ",
  model:{
    problem:"Chuỗi rạp có nên tăng giá vé 10% để cải thiện lợi nhuận, khi lượt xem và doanh thu bắp nước đều phụ thuộc vào giá vé?",
    hyps:["Tăng giá làm doanh thu vé tăng vì cầu ít co giãn","Lượt xem giảm theo co giãn đo được ở thử nghiệm",
          "Mất lượt kéo theo mất lãi góp bắp nước","Phần chia doanh thu với nhà phát hành ăn mất nửa phần giá tăng thêm"],
    evidence:"Ex.1 và Ex.2: giá 99.000đ × 7,52 triệu lượt = 744,48 tỷ, doanh thu vé tăng 24,48 tỷ; rạp chỉ giữ 50% nên lãi góp vé tăng 12,24 tỷ. Mất 0,48 triệu lượt × 30.000đ × 70% = 10,08 tỷ lãi bắp nước, nên phần ròng chỉ còn 2,16 tỷ. H1 bị bác bỏ ở mức tăng đồng loạt; H2, H3, H4 đúng. Ex.3: suất trong tuần công suất ghế chỉ 21% nên nên định giá theo khung giờ và ngày trong tuần thay vì tăng giá cả hệ thống.",
    rec:"B"},
  mistakes:{
    logicLesson:"i-profit-3",
    calc:{label:"phần lợi nhuận ròng sau khi tăng giá", lesson:"i-profit-2",
      good:"Doanh thu vé +24,48 tỷ → rạp giữ 50% = +12,24 tỷ; mất bắp nước 0,48 triệu lượt × 21.000đ = 10,08 tỷ; ròng 2,16 tỷ",
      why:"Case định giá phải tính tới lãi góp của sản phẩm đi kèm, không chỉ doanh thu của món vừa tăng giá."},
    framework:{lesson:"i-profit-1",
      good:"Bốn nhánh: giá vé · lượt xem (co giãn) · lãi góp bắp nước · phần chia với nhà phát hành",
      why:"Tăng giá tác động lên cả sản lượng và doanh thu đi kèm — thiếu nhánh nào là mất một nửa câu trả lời."},
    exhibit:{lesson:"i-chart-1", bad:"Không dùng công suất ghế theo ngày để tách quyết định giá",
      good:"Ex.3: suất trong tuần công suất 21% so với cuối tuần 64% — hai nhóm cầu khác nhau",
      why:"Exhibit công suất cho biết nên tăng giá ở đâu và giảm giá ở đâu."}
  },
  goodFeedback:"Tính đủ hai chiều của việc tăng giá và biến co giãn thành một chính sách giá theo khung giờ."
});

/* ─────────── iv-04 · Growth · ứng dụng gọi xe mất tài xế ─────────── */
R({
  id:"iv-04", title:"Growth: ứng dụng gọi xe mất tài xế mỗi tháng",
  brief:{context:"Người phỏng vấn: \"Một ứng dụng gọi xe hai bánh thấy số tài xế hoạt động giảm dần dù vẫn tuyển liên tục. Bạn dẫn case.\"",
         task:"tìm chỗ rò rỉ tài xế, lượng hoá chi phí của nó và đề xuất cách giữ tài xế rẻ hơn cách tuyển mới."},
  labels:{problem:"1 · Nhắc lại đề bằng một câu", hyps:"2 · Cấu trúc bạn tự dẫn", evidence:"3 · Phân tích và con số"},
  exhibits:[
    {kind:"table", title:"Đội tài xế theo tháng", unit:"",
     head:["Chỉ tiêu","Giá trị","Ghi chú"],
     rows:[["Tài xế hoạt động","60.000",""],["Tỷ lệ rời bỏ mỗi tháng","8%",""],["Tuyển mới mỗi tháng","4.000",""],
           ["Chi phí tuyển một tài xế","1,2 triệu","thưởng gia nhập + đào tạo"],["GMV mỗi tài xế mỗi tháng","12 triệu",""]]},
    {kind:"bars", title:"Thu nhập tài xế mỗi tháng", unit:"triệu đồng",
     headline:"Thu nhập thấp hơn đối thủ 1,5 triệu", sub:"Sau chiết khấu nền tảng",
     rows:[["Ứng dụng của mình (chiết khấu 25%)",9,"var(--series-bad)"],["Đối thủ lớn nhất",10.5,"var(--series-base)"],["Mức tài xế cho là đủ",10,"var(--series-focus)"]],
     max:12, ticks:[0,3,6,9,12]},
    {kind:"metrics", title:"Lý do rời bỏ (khảo sát 1.500 tài xế)",
     items:[["Thu nhập thấp hơn nơi khác","61%",""],["Đơn xa, chờ lâu","22%",""],["Khác","17%",""]]}
  ],
  options:[
    ["A","Tăng ngân sách tuyển mới lên gấp đôi","Tuyển thêm để bù chỗ rò rỉ: 4,8 tỷ mỗi tháng đang mất mà không chạm vào nguyên nhân thu nhập.",35],
    ["B","Giảm chiết khấu từ 25% xuống 20% cho tài xế đạt ngưỡng chuyến, đưa thu nhập lên 9,6 triệu và cắt dần ngân sách tuyển","Mất 3,6 tỷ take rate mỗi tháng nhưng rẻ hơn 4,8 tỷ chi phí tuyển, lại đánh đúng lý do rời bỏ của 61% tài xế.",95],
    ["C","Thưởng một lần cho tài xế mới","Kéo người vào rồi vẫn rơi ra sau vài tháng vì thu nhập chạy xe không đổi.",40],
    ["D","Tăng giá cước cho khách","Đẩy chi phí sang khách có thể làm giảm số chuyến, khiến thu nhập tài xế còn thấp hơn.",45]
  ],
  correct:"B",
  framing:[["tài xế","đội xe"],["rời bỏ","giữ chân","tuyển"]],
  branches:[["tuyển mới","bổ sung"],["rời bỏ","churn"],["thu nhập","chiết khấu","take rate"],["đơn xa","chờ lâu","vận hành"]],
  numbers:[{v:3.6,tol:0.05,pts:30,core:true},{v:4800,tol:5,pts:25},{v:4.8,tol:0.05,pts:20},{v:9.6,tol:0.05,pts:15}],
  insight:[{kw:["rẻ hơn","chi phí tuyển"],pts:40},{kw:["thu nhập","chiết khấu"],pts:35},{kw:["ngưỡng","gắn với chuyến"],pts:25}],
  unit:"tỷ|%|triệu",
  model:{
    problem:"Vì sao số tài xế hoạt động giảm dần dù vẫn tuyển mới, và nên giữ tài xế bằng cách nào rẻ hơn cách tuyển bù?",
    hyps:["Tuyển mới không đủ bù số rời bỏ","Tỷ lệ rời bỏ cao vì thu nhập sau chiết khấu thấp hơn đối thủ",
          "Chất lượng đơn (đơn xa, chờ lâu) làm tài xế bỏ đi","Chi phí tuyển đang đắt hơn chi phí giữ chân"],
    evidence:"Ex.1: 60.000 × 8% = 4.800 tài xế rời mỗi tháng trong khi chỉ tuyển 4.000, nên đội xe giảm 800 người mỗi tháng; chi phí tuyển 4.000 × 1,2 triệu = 4,8 tỷ mỗi tháng. Ex.2 và Ex.3: thu nhập 9 triệu so với đối thủ 10,5 triệu và 61% tài xế nói vì thu nhập — H2 đúng, H3 chỉ giải thích 22% nên bị bác bỏ là nguyên nhân chính. Giảm chiết khấu xuống 20% đưa thu nhập lên 9,6 triệu, mất 5% × 12 triệu × 60.000 = 3,6 tỷ take rate mỗi tháng — rẻ hơn 4,8 tỷ chi phí tuyển, nên gắn mức chiết khấu mới với ngưỡng số chuyến.",
    rec:"B"},
  mistakes:{
    logicLesson:"i-profit-3",
    calc:{label:"chi phí giữ chân so với chi phí tuyển", lesson:"i-profit-2",
      good:"Rời bỏ 4.800/tháng; tuyển 4.000 × 1,2 triệu = 4,8 tỷ; giảm chiết khấu 5 điểm = 3,6 tỷ take rate mất",
      why:"So sánh hai con số cùng đơn vị mỗi tháng mới kết luận được giữ chân rẻ hơn tuyển mới."},
    framework:{lesson:"i-profit-1",
      good:"Bốn nhánh: dòng vào (tuyển mới) · dòng ra (rời bỏ) · thu nhập sau chiết khấu · chất lượng đơn",
      why:"Case giữ chân luôn là bài toán bể nước: phải tách dòng vào và dòng ra trước khi đi vào nguyên nhân."},
    exhibit:{lesson:"i-chart-1", bad:"Không nối khảo sát lý do rời bỏ với khoảng cách thu nhập",
      good:"Ex.2: 9 triệu so với 10,5 triệu; Ex.3: 61% rời vì thu nhập",
      why:"Một exhibit cho khoảng cách, một exhibit cho nguyên nhân — ghép lại mới ra khuyến nghị."}
  },
  goodFeedback:"Tách đúng dòng vào – dòng ra, so sánh chi phí giữ chân với chi phí tuyển bằng cùng một đơn vị."
});

/* ─────────── iv-05 · Operations · kho TMĐT mùa cao điểm ─────────── */
R({
  id:"iv-05", title:"Operations: kho thương mại điện tử trễ đơn mùa cao điểm",
  brief:{context:"Người phỏng vấn: \"Một sàn thương mại điện tử trễ đơn nặng trong mùa cao điểm dù kho mới mở rộng. COO muốn biết nên làm gì trước mùa sau.\"",
         task:"tìm điểm nghẽn công suất, lượng hoá phần thiếu và chọn phương án xử lý rẻ nhất."},
  labels:{problem:"1 · Nhắc lại đề bằng một câu", hyps:"2 · Cấu trúc bạn nói với người phỏng vấn", evidence:"3 · Phân tích và con số"},
  exhibits:[
    {kind:"table", title:"Công suất kho và sản lượng", unit:"đơn/ngày",
     head:["Chỉ tiêu","Ngày thường","Ngày cao điểm"],
     rows:[["Đơn nhận về","34.000","52.000"],["Công suất xử lý của kho","40.000","40.000"],
           ["Số nhân viên mỗi ca","100","100"],["Năng suất mỗi nhân viên mỗi ca","400 đơn",""]]},
    {kind:"bars", title:"Thời gian mỗi đơn theo công đoạn", unit:"phút",
     headline:"Nhặt hàng chiếm quá nửa thời gian", sub:"Đo trên 2.000 đơn",
     rows:[["Nhặt hàng",6.5,"var(--series-bad)"],["Đóng gói",2.5,"var(--series-base)"],["Dán nhãn, phân tuyến",1.5,"var(--series-base)"],["Bàn giao vận chuyển",1.5,"var(--series-base)"]],
     max:8, ticks:[0,2,4,6,8]},
    {kind:"metrics", title:"Chi phí phương án",
     items:[["Nhân viên thời vụ mỗi ca","600.000đ","đào tạo 2 ngày"],["Đầu tư kệ và tuyến nhặt hàng mới","9 tỷ","dùng cho mọi ngày trong năm"],
            ["Số ngày cao điểm mỗi năm","45",""]]}
  ],
  options:[
    ["A","Thuê thêm kho vệ tinh cả năm","Chi phí cố định cả năm cho một điểm nghẽn chỉ xuất hiện 45 ngày.",40],
    ["B","Tổ chức lại tuyến nhặt hàng và kệ để cắt thời gian nhặt, kết hợp 30 nhân viên thời vụ mỗi ca cho 45 ngày cao điểm","Nhặt hàng chiếm 6,5 trên 12 phút mỗi đơn; xử lý điểm nghẽn thật rồi mới bù phần công suất còn thiếu bằng lao động thời vụ 18 triệu mỗi ngày.",95],
    ["C","Giới hạn số đơn nhận trong ngày cao điểm","Đẩy khách sang sàn khác đúng vào lúc nhu cầu cao nhất.",30],
    ["D","Tăng ca cho nhân viên hiện tại","100 người làm thêm giờ không tạo ra 12.000 đơn thiếu, còn làm năng suất giảm.",45]
  ],
  correct:"B",
  framing:[["kho","đơn hàng"],["trễ","công suất","cao điểm"]],
  branches:[["công suất","năng suất"],["nhu cầu","sản lượng","đơn nhận"],["nhặt hàng","công đoạn","điểm nghẽn"],["chi phí","thời vụ","đầu tư"]],
  numbers:[{v:12000,tol:5,pts:30,core:true},{v:30,tol:0.5,pts:25},{v:18,tol:0.1,pts:20},{v:23,tol:0.5,pts:15}],
  insight:[{kw:["nhặt hàng","điểm nghẽn"],pts:40},{kw:["45 ngày","mùa vụ","thời vụ"],pts:35},{kw:["cố định","cả năm"],pts:25}],
  unit:"tỷ|%|đơn|triệu",
  model:{
    problem:"Vì sao kho trễ đơn trong mùa cao điểm dù đã mở rộng, và nên bù công suất thiếu bằng cách nào cho 45 ngày cao điểm?",
    hyps:["Công suất xử lý thấp hơn lượng đơn nhận trong ngày cao điểm","Nhu cầu cao điểm tăng đột biến so với ngày thường",
          "Một công đoạn cụ thể là điểm nghẽn chứ không phải cả dây chuyền","Phương án bù công suất phải là chi phí mùa vụ, không phải chi phí cố định cả năm"],
    evidence:"Ex.1: ngày cao điểm nhận 52.000 đơn nhưng kho chỉ xử lý 40.000, thiếu 12.000 đơn mỗi ngày, tức 23% số đơn bị đẩy sang hôm sau. Ở năng suất 400 đơn mỗi ca, phần thiếu tương đương 30 nhân viên mỗi ca, chi phí 30 × 600.000đ = 18 triệu mỗi ngày, cho 45 ngày là 810 triệu. Ex.2: nhặt hàng chiếm 6,5 trên 12 phút mỗi đơn nên đó là điểm nghẽn — H1, H3, H4 đúng; H2 bị bác bỏ vì cao điểm chỉ hơn ngày thường 53% trong khi trễ tới 23%. Ex.3: đầu tư 9 tỷ là chi phí cố định cả năm cho một vấn đề 45 ngày.",
    rec:"B"},
  mistakes:{
    logicLesson:"i-profit-3",
    calc:{label:"phần công suất thiếu và số người cần bù", lesson:"i-profit-2",
      good:"52.000 − 40.000 = 12.000 đơn/ngày (23%); 12.000 ÷ 400 = 30 người/ca; 30 × 600.000đ = 18 triệu/ngày",
      why:"Case vận hành phải quy phần thiếu về đơn vị nguồn lực trước khi bàn phương án."},
    framework:{lesson:"i-profit-1",
      good:"Bốn nhánh: nhu cầu · công suất · điểm nghẽn theo công đoạn · chi phí phương án bù",
      why:"Không tách công đoạn thì mọi khuyến nghị đều là thêm người hoặc thêm kho."},
    exhibit:{lesson:"i-chart-1", bad:"Không chỉ ra nhặt hàng là công đoạn chiếm quá nửa thời gian",
      good:"Ex.2: nhặt hàng 6,5 phút trên tổng 12 phút mỗi đơn",
      why:"Exhibit thời gian công đoạn là chỗ duy nhất cho biết nên cải tiến ở đâu."}
  },
  goodFeedback:"Quy phần thiếu về số người và số tiền mỗi ngày, rồi phân biệt chi phí mùa vụ với chi phí cố định cả năm."
});


/* ─────────── iv-06 · M&A · chuỗi nhà thuốc mua lại đối thủ ─────────── */
R({
  id:"iv-06", title:"M&A: chuỗi nhà thuốc mua lại đối thủ nhỏ",
  brief:{context:"Người phỏng vấn: \"Một chuỗi nhà thuốc lớn được chào mua một chuỗi 300 nhà thuốc với giá 900 tỷ. Bạn dẫn case và cho tôi biết nên trả bao nhiêu.\"",
         task:"định giá thương vụ theo bội số EBITDA, lượng hoá synergy và đưa khuyến nghị có điều kiện."},
  labels:{problem:"1 · Nhắc lại đề bằng một câu", hyps:"2 · Cấu trúc bạn tự dẫn", evidence:"3 · Phân tích và con số"},
  exhibits:[
    {kind:"table", title:"Chuỗi mục tiêu", unit:"",
     head:["Chỉ tiêu","Giá trị","Ghi chú"],
     rows:[["Số nhà thuốc","300",""],["Doanh thu mỗi nhà thuốc","6 tỷ/năm",""],["Biên EBITDA","6%",""],
           ["Giá chào","900 tỷ",""],["Hợp đồng thuê còn lại trung bình","3 năm",""]]},
    {kind:"bars", title:"Bội số EBITDA các thương vụ gần đây", unit:"lần EBITDA",
     headline:"Ngành giao dịch quanh 7 lần EBITDA", sub:"Bốn thương vụ bán lẻ dược 24 tháng gần nhất",
     rows:[["Thương vụ 1",6.5,"var(--series-base)"],["Thương vụ 2",7,"var(--series-base)"],["Thương vụ 3",7.5,"var(--series-base)"],["Giá chào lần này",8.3,"var(--series-bad)"]],
     max:9, ticks:[0,3,6,9]},
    {kind:"metrics", title:"Synergy ước tính",
     items:[["Lợi thế mua hàng tập trung","1,5 điểm biên gộp","áp lên toàn bộ doanh thu mục tiêu"],
            ["Tiết kiệm chi phí trụ sở","0 tỷ","đội trụ sở mục tiêu phải giữ 2 năm"],
            ["Thời gian tự mở 300 nhà thuốc","5 năm",""]]}
  ],
  options:[
    ["A","Trả đủ 900 tỷ để chốt nhanh","Trả 8,3 lần EBITDA khi ngành giao dịch quanh 7 lần, tức trả trước toàn bộ synergy cho bên bán.",40],
    ["B","Đàm phán về vùng 945 tỷ tính trên EBITDA sau synergy 135 tỷ, trong đó một phần trả theo kết quả sau khi synergy mua hàng thực sự đạt","Định giá trên EBITDA sau synergy ở bội số ngành 7 lần và đẩy rủi ro thực hiện synergy sang cơ chế trả theo kết quả.",95],
    ["C","Bỏ thương vụ và tự mở 300 nhà thuốc","Tự mở mất 5 năm và mất luôn vị trí mặt bằng — chi phí cơ hội lớn hơn phần chênh giá.",45],
    ["D","Mua nhưng đóng một nửa số nhà thuốc để cắt chi phí","Hợp đồng thuê còn 3 năm nên đóng cửa vẫn phải trả tiền thuê, mà mất doanh thu.",35]
  ],
  correct:"B",
  framing:[["nhà thuốc","chuỗi"],["mua lại","định giá","trả bao nhiêu"]],
  branches:[["ebitda","lợi nhuận mục tiêu"],["bội số","định giá","thị trường"],["synergy","mua hàng"],["tự mở","phương án thay thế","rủi ro"]],
  numbers:[{v:8.3,tol:0.05,pts:30,core:true},{v:108,tol:0.5,pts:25},{v:27,tol:0.5,pts:20},{v:135,tol:0.5,pts:15}],
  insight:[{kw:["bội số","7 lần"],pts:40},{kw:["trả theo kết quả","earn-out","rủi ro thực hiện"],pts:35},{kw:["hợp đồng thuê","mặt bằng"],pts:25}],
  unit:"tỷ|%|lần",
  model:{
    problem:"Chuỗi nhà thuốc nên trả bao nhiêu cho 300 nhà thuốc được chào giá 900 tỷ, và thương vụ có hơn phương án tự mở không?",
    hyps:["EBITDA hiện tại của mục tiêu đủ lớn để đỡ mức giá chào","Bội số giá chào cao hơn mặt bằng thị trường",
          "Synergy mua hàng đủ kéo bội số thực về vùng hợp lý","Phương án tự mở chậm hơn và rủi ro mặt bằng cao hơn"],
    evidence:"Ex.1: doanh thu 300 × 6 = 1.800 tỷ, EBITDA 6% = 108 tỷ, nên giá chào 900 tỷ tương đương 8,3 lần EBITDA. Ex.2: ngành giao dịch quanh 7 lần nên H2 đúng. Ex.3: synergy mua hàng 1,5 điểm trên 1.800 tỷ = 27 tỷ, đưa EBITDA lên 135 tỷ và bội số thực về 6,7 lần — H3 đúng, H1 bị bác bỏ nếu chỉ nhìn EBITDA hiện tại. H4 đúng: tự mở mất 5 năm. Mức hợp lý là 7 × 135 = 945 tỷ nhưng phải trả một phần theo kết quả vì synergy chưa thực hiện, và hợp đồng thuê còn 3 năm là ràng buộc khi tái cấu trúc.",
    rec:"B"},
  mistakes:{
    logicLesson:"i-entry-3",
    calc:{label:"bội số EBITDA trước và sau synergy", lesson:"i-profit-2",
      good:"EBITDA 1.800 × 6% = 108 tỷ → 900 ÷ 108 = 8,3 lần; synergy 1.800 × 1,5% = 27 tỷ → EBITDA 135 tỷ → 6,7 lần",
      why:"Case M&A luôn quy giá về bội số của một dòng lợi nhuận, rồi so với mặt bằng thị trường."},
    framework:{lesson:"i-entry-2",
      good:"Bốn nhánh: EBITDA độc lập · bội số thị trường · synergy · phương án thay thế và rủi ro",
      why:"Thiếu nhánh phương án thay thế thì không trả lời được câu \"đắt hay rẻ\"."},
    exhibit:{lesson:"f-moat-3", bad:"Không so bội số giá chào với các thương vụ gần đây",
      good:"Ex.2: bốn thương vụ quanh 6,5–7,5 lần trong khi giá chào là 8,3 lần",
      why:"Bội số so sánh là chỗ duy nhất biến một con số tuyệt đối thành phán đoán đắt rẻ."}
  },
  goodFeedback:"Quy giá về bội số, tách synergy ra khỏi giá trị độc lập và gắn phần rủi ro vào cơ chế thanh toán."
});

/* ─────────── iv-07 · Market Sizing · sạc xe máy điện ─────────── */
R({
  id:"iv-07", title:"Market sizing: thị trường sạc xe máy điện mỗi năm",
  brief:{context:"Người phỏng vấn: \"Ước lượng quy mô doanh thu hằng năm của dịch vụ sạc xe máy điện công cộng tại Việt Nam. Không có báo cáo ngành, chỉ có vài giả định.\"",
         task:"dựng cây ước lượng từ trên xuống, nói rõ giả định và kiểm tra độ nhạy."},
  labels:{problem:"1 · Nhắc lại đề bằng một câu", hyps:"2 · Cấu trúc ước lượng", evidence:"3 · Phân tích và con số"},
  exhibits:[
    {kind:"table", title:"Giả định cho sẵn", unit:"",
     head:["Giả định","Giá trị","Ghi chú"],
     rows:[["Xe máy điện đang lưu hành","2 triệu",""],["Quãng đường mỗi ngày","30 km",""],
           ["Tiêu thụ điện","3 kWh/100 km",""],["Tỷ lệ sạc ngoài (không sạc ở nhà)","20%",""],["Giá bán mỗi kWh tại trạm","4.000đ",""]]},
    {kind:"bars", title:"Cơ cấu nơi sạc (khảo sát 1.200 người dùng)", unit:"%",
     headline:"Phần lớn vẫn sạc tại nhà", sub:"Theo số lần sạc",
     rows:[["Tại nhà",80,"var(--series-base)"],["Trạm công cộng",14,"var(--series-focus)"],["Nơi làm việc",6,"var(--series-base)"]],
     max:100, ticks:[0,25,50,75,100]},
    {kind:"metrics", title:"Kiểm tra chéo",
     items:[["Số trạm sạc công cộng hiện có","3.000",""],["Doanh thu mỗi trạm mỗi tháng","15 triệu",""],["Tăng trưởng xe điện mỗi năm","35%",""]]}
  ],
  options:[
    ["A","Coi thị trường là 2 triệu xe × chi phí xăng tiết kiệm","Đó là giá trị tiết kiệm của người dùng, không phải doanh thu dịch vụ sạc.",30],
    ["B","Ước lượng 525,6 tỷ đồng mỗi năm từ điện năng sạc ngoài, kiểm tra chéo bằng doanh thu mỗi trạm và nêu độ nhạy theo tỷ lệ sạc ngoài","Đi từ số xe tới kWh rồi tới tiền, kiểm tra chéo bằng nguồn dữ liệu độc lập và chỉ ra biến nhạy nhất.",95],
    ["C","Lấy doanh thu trạm hiện có nhân với số trạm dự kiến","Chỉ đúng nếu công suất mỗi trạm không đổi — bỏ qua chính biến số cần ước lượng.",45],
    ["D","Không ước lượng được vì thiếu dữ liệu ngành","Market sizing chấm cách dựng cây và giả định, không chấm việc có sẵn báo cáo.",20]
  ],
  correct:"B",
  framing:[["sạc","xe máy điện"],["quy mô","ước lượng","thị trường"]],
  branches:[["số xe","đội xe"],["quãng đường","kwh","tiêu thụ"],["sạc ngoài","tại nhà","tỷ lệ"],["giá","doanh thu","kiểm tra chéo"]],
  numbers:[{v:525.6,tol:0.5,pts:30,core:true},{v:65.7,tol:0.1,pts:25},{v:0.9,tol:0.01,pts:20},{v:328.5,tol:0.5,pts:15}],
  insight:[{kw:["kiểm tra chéo","đối chiếu"],pts:40},{kw:["độ nhạy","giả định nhạy"],pts:35},{kw:["sạc tại nhà","sạc ngoài"],pts:25}],
  unit:"tỷ|%|kwh|đ",
  model:{
    problem:"Thị trường dịch vụ sạc xe máy điện công cộng tại Việt Nam mỗi năm lớn cỡ nào, tính theo doanh thu bán điện tại trạm?",
    hyps:["Số xe điện lưu hành quyết định tổng nhu cầu điện","Quãng đường và mức tiêu thụ cho ra số kWh mỗi xe",
          "Chỉ phần sạc ngoài mới tạo doanh thu cho trạm","Giá mỗi kWh biến số kWh thành tiền"],
    evidence:"Ex.1: mỗi xe chạy 30 km/ngày × 3 kWh/100 km = 0,9 kWh mỗi ngày, tức 328,5 kWh mỗi năm; chỉ 20% sạc ngoài nên 65,7 kWh mỗi xe; × 2 triệu xe × 4.000đ = 525,6 tỷ đồng mỗi năm. H1, H2, H3, H4 đều đúng; cách tính theo tiền xăng tiết kiệm bị bác bỏ vì đó không phải doanh thu trạm. Ex.3 kiểm tra chéo: 3.000 trạm × 15 triệu × 12 = 540 tỷ, lệch dưới 3% so với ước lượng. Ex.2 cho thấy tỷ lệ sạc tại nhà 80% là giả định nhạy nhất: mỗi 5 điểm tỷ lệ sạc ngoài đổi khoảng 131 tỷ doanh thu, nên nêu độ nhạy kèm con số.",
    rec:"B"},
  mistakes:{
    logicLesson:"i-chart-1",
    calc:{label:"đường đi từ số xe tới doanh thu", lesson:"i-profit-2",
      good:"30 km × 3 kWh/100 km = 0,9 kWh/ngày → 328,5 kWh/năm → 20% = 65,7 kWh → × 2 triệu × 4.000đ = 525,6 tỷ",
      why:"Market sizing chấm việc giữ đơn vị qua từng bước, không chấm con số cuối."},
    framework:{lesson:"i-profit-1",
      good:"Bốn tầng: số xe · kWh mỗi xe · tỷ lệ sạc ngoài · giá mỗi kWh",
      why:"Mỗi tầng phải là một phép nhân có đơn vị rõ, để người phỏng vấn theo được."},
    exhibit:{lesson:"i-chart-1", bad:"Không kiểm tra chéo bằng doanh thu mỗi trạm",
      good:"Ex.3: 3.000 trạm × 15 triệu × 12 tháng = 540 tỷ, lệch dưới 3%",
      why:"Một ước lượng có kiểm tra chéo đáng tin hơn hẳn một con số đơn lẻ."}
  },
  goodFeedback:"Giữ đơn vị qua từng bước, kiểm tra chéo bằng nguồn độc lập và chỉ ra giả định nhạy nhất."
});
