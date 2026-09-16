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

})(window.SCORING.register);
