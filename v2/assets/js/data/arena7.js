/* ===== ĐỀ ARENA · đợt 7: iv-11 → iv-20 (case phỏng vấn) =====
   Số liệu minh hoạ để luyện tập. Mọi con số then chốt tính lại được từ exhibit. */
(function(R){

/* ─────────── iv-11 · Profitability · chuỗi trà sữa ─────────── */
R({
  id:"iv-11", title:"Profitability: chuỗi trà sữa mỏng dần biên lợi nhuận",
  brief:{context:"Người phỏng vấn: \"Một chuỗi trà sữa 120 cửa hàng giữ nguyên doanh thu nhưng lợi nhuận năm nay chỉ còn một phần ba năm trước. Chủ chuỗi muốn biết vì sao.\"",
         task:"tìm khoản làm mỏng biên lợi nhuận, lượng hoá nó và đề xuất cách khôi phục."},
  labels:{problem:"1 · Nhắc lại đề bằng một câu", hyps:"2 · Cấu trúc bạn nói với người phỏng vấn", evidence:"3 · Phân tích và con số"},
  exhibits:[
    {kind:"table", title:"Kết quả hai năm", unit:"tỷ VND/năm",
     head:["Chỉ tiêu","Năm trước","Năm nay"],
     rows:[["Số cửa hàng","120","120"],["Doanh thu","360","360"],["Biên lãi gộp","65%","58%"],
           ["Chi phí cố định (thuê, lương, marketing)","198","198"],["Lợi nhuận","36","10,8"]]},
    {kind:"bars", title:"Cơ cấu đơn hàng theo kênh", unit:"% doanh thu",
     headline:"Kênh giao hàng chiếm gần một nửa doanh thu", sub:"Năm nay so với năm trước",
     rows:[["Tại quán — năm trước",72,"var(--series-base)"],["Tại quán — năm nay",54,"var(--series-focus)"],["Giao hàng — năm nay",46,"var(--series-bad)"]],
     max:80, ticks:[0,20,40,60,80]},
    {kind:"metrics", title:"Kinh tế một ly theo kênh",
     items:[["Giá niêm yết","45.000đ",""],["Giá thực thu qua app giao hàng","31.500đ","sau khuyến mãi 30%"],
            ["Phí nền tảng","20% giá trị đơn",""],["Giá nguyên liệu","không đổi",""]]}
  ],
  options:[
    ["A","Cắt 20% chi phí marketing","Chi phí cố định không đổi giữa hai năm nên không phải nguyên nhân, mà cắt marketing còn làm giảm lượt đơn.",30],
    ["B","Bỏ khuyến mãi sâu 30% trên app, chuyển sang combo giữ giá và xây giá riêng cho kênh giao hàng để bù phí nền tảng","Nguyên nhân nằm ở giá thực thu và phí nền tảng của kênh giao hàng, nên phải sửa đúng ở cấu trúc giá theo kênh.",95],
    ["C","Đóng bớt cửa hàng có doanh thu thấp","Doanh thu toàn chuỗi không giảm; đóng cửa hàng không chạm vào phần biên đang mất.",35],
    ["D","Đổi sang nguyên liệu rẻ hơn","Giá nguyên liệu không đổi giữa hai năm — đổi nguyên liệu chỉ đánh đổi chất lượng lấy vài điểm biên.",40]
  ],
  correct:"B",
  framing:[["trà sữa","chuỗi"],["lợi nhuận","biên","giảm"]],
  branches:[["doanh thu","sản lượng"],["biên lãi gộp","giá thực thu"],["kênh giao hàng","phí nền tảng"],["chi phí cố định","thuê","marketing"]],
  numbers:[{v:25.2,tol:0.05,pts:30,core:true},{v:10.8,tol:0.05,pts:25},{v:36,tol:0.5,pts:20},{v:7,tol:0.1,pts:15}],
  insight:[{kw:["khuyến mãi","giá thực thu"],pts:40},{kw:["phí nền tảng","giao hàng"],pts:35},{kw:["giá riêng theo kênh","combo"],pts:25}],
  unit:"tỷ|%|đ",
  model:{
    problem:"Vì sao lợi nhuận chuỗi trà sữa chỉ còn một phần ba khi doanh thu không đổi, và khôi phục biên bằng cách nào?",
    hyps:["Doanh thu và sản lượng giữ nguyên nên nguyên nhân không nằm ở nhu cầu","Biên lãi gộp mỏng đi vì giá thực thu thấp hơn giá niêm yết",
          "Kênh giao hàng với phí nền tảng cao đang chiếm tỷ trọng lớn hơn","Chi phí cố định như thuê và marketing không đổi nên không phải nguyên nhân"],
    evidence:"Ex.1: lợi nhuận 360 × 65% − 198 = 36 tỷ xuống 360 × 58% − 198 = 10,8 tỷ, giảm 25,2 tỷ, toàn bộ đến từ 7 điểm biên lãi gộp. H1 và H4 bị bác bỏ, H2 và H3 đúng. Ex.2: kênh giao hàng tăng từ 28% lên 46% doanh thu. Ex.3: mỗi ly bán qua app chỉ thực thu 31.500đ sau khuyến mãi 30%, lại chịu phí nền tảng 20%, trong khi giá nguyên liệu không đổi — nên phải bỏ khuyến mãi sâu, chuyển sang combo và đặt giá riêng theo kênh.",
    rec:"B"},
  mistakes:{
    logicLesson:"i-profit-3",
    calc:{label:"phần lợi nhuận mất do biên lãi gộp", lesson:"i-profit-2",
      good:"36 → 10,8 tỷ (−25,2); toàn bộ đến từ 7 điểm biên trên doanh thu 360 tỷ = 25,2 tỷ",
      why:"Khi doanh thu và chi phí cố định không đổi, mức giảm lợi nhuận bằng đúng phần biên mất."},
    framework:{lesson:"i-profit-1",
      good:"Bốn nhánh: doanh thu · biên lãi gộp theo giá thực thu · cơ cấu kênh và phí nền tảng · chi phí cố định",
      why:"Mô hình đa kênh phải tách biên theo kênh, nếu không sẽ đổ lỗi nhầm cho chi phí cố định."},
    exhibit:{lesson:"i-chart-1", bad:"Không nối tỷ trọng kênh giao hàng với giá thực thu mỗi ly",
      good:"Ex.2: giao hàng lên 46% doanh thu; Ex.3: thực thu 31.500đ và phí nền tảng 20%",
      why:"Hai exhibit ghép lại mới ra được nguyên nhân thật của 7 điểm biên."}
  },
  goodFeedback:"Khoanh đúng vùng biên lãi gộp, giải thích bằng cơ cấu kênh và sửa ở cấu trúc giá theo kênh."
});

/* ─────────── iv-12 · Market Entry · siêu thị mini thành phố cấp 2 ─────────── */
R({
  id:"iv-12", title:"Market entry: chuỗi siêu thị mini vào thành phố cấp 2",
  brief:{context:"Người phỏng vấn: \"Một chuỗi siêu thị mini muốn vào một thành phố cấp 2 có 1,2 triệu dân. Bạn dẫn case và cho tôi biết nên mở bao nhiêu cửa hàng.\"",
         task:"ước lượng thị trường có thể chiếm, dựng kinh tế một cửa hàng và chọn nhịp mở rộng."},
  labels:{problem:"1 · Nhắc lại đề bằng một câu", hyps:"2 · Cấu trúc bạn tự dẫn", evidence:"3 · Phân tích và con số"},
  exhibits:[
    {kind:"table", title:"Giả định thị trường", unit:"",
     head:["Giả định","Giá trị","Ghi chú"],
     rows:[["Số hộ gia đình","300.000",""],["Chi tiêu tạp hoá mỗi hộ","4 triệu/tháng",""],
           ["Tỷ trọng kênh hiện đại","12%","phần còn lại là chợ và tạp hoá truyền thống"],["Thị phần mục tiêu trong kênh hiện đại","5%",""]]},
    {kind:"bars", title:"Kênh mua tạp hoá của hộ gia đình", unit:"% chi tiêu",
     headline:"Chợ truyền thống vẫn giữ hơn một nửa", sub:"Khảo sát 900 hộ",
     rows:[["Chợ truyền thống",54,"var(--series-base)"],["Tạp hoá gần nhà",34,"var(--series-base)"],["Siêu thị và siêu thị mini",12,"var(--series-focus)"]],
     max:60, ticks:[0,15,30,45,60]},
    {kind:"metrics", title:"Kinh tế một cửa hàng dự kiến",
     items:[["Vốn mỗi cửa hàng","4 tỷ",""],["Doanh thu mỗi cửa hàng","12 tỷ/năm",""],
            ["Biên EBITDA cửa hàng","5%",""],["Thời gian đạt doanh thu ổn định","9 tháng",""]]}
  ],
  options:[
    ["A","Mở ngay 20 cửa hàng để chiếm chỗ","Thị phần mục tiêu chỉ nuôi nổi khoảng 7 cửa hàng; 20 cửa hàng chia nhau doanh thu và kéo hoàn vốn dài hơn.",30],
    ["B","Mở 7 cửa hàng theo ba đợt, lấy doanh thu mỗi cửa hàng sau 9 tháng làm điều kiện mở đợt tiếp theo","Thị phần mục tiêu tương đương khoảng 86,4 tỷ doanh thu, tức 7 cửa hàng; hoàn vốn 6,7 năm nên phải mở theo đợt có điều kiện.",95],
    ["C","Không vào vì kênh hiện đại mới chiếm 12%","12% của 14.400 tỷ vẫn là 1.728 tỷ mỗi năm — đủ lớn cho một chuỗi nhỏ.",40],
    ["D","Nhượng quyền toàn bộ cho chủ cửa hàng địa phương","Bán lẻ tạp hoá phụ thuộc chuỗi cung ứng tập trung — nhượng quyền sớm làm mất lợi thế mua hàng.",45]
  ],
  correct:"B",
  framing:[["siêu thị mini","chuỗi"],["vào thị trường","mở","bao nhiêu cửa hàng"]],
  branches:[["quy mô","chi tiêu","thị trường"],["kênh hiện đại","thị phần"],["kinh tế cửa hàng","hoàn vốn","ebitda"],["nhịp mở","đợt","rủi ro"]],
  numbers:[{v:6.7,tol:0.1,pts:30,core:true},{v:1728,tol:1,pts:25},{v:14400,tol:5,pts:20},{v:86.4,tol:0.1,pts:15}],
  insight:[{kw:["mở theo đợt","điều kiện"],pts:40},{kw:["kênh hiện đại","thị phần"],pts:35},{kw:["hoàn vốn","rủi ro vốn"],pts:25}],
  unit:"tỷ|%|năm",
  model:{
    problem:"Chuỗi siêu thị mini có nên vào thành phố cấp 2 này không, và nếu có thì mở bao nhiêu cửa hàng theo nhịp nào?",
    hyps:["Tổng chi tiêu tạp hoá của thành phố đủ lớn","Kênh hiện đại còn nhỏ nên phần chiếm được bị giới hạn",
          "Kinh tế một cửa hàng quyết định hoàn vốn có chấp nhận được không","Nhịp mở theo đợt giảm rủi ro so với mở đồng loạt"],
    evidence:"Ex.1: 300.000 hộ × 4 triệu × 12 = 14.400 tỷ chi tiêu tạp hoá mỗi năm; kênh hiện đại 12% là 1.728 tỷ, thị phần mục tiêu 5% cho 86,4 tỷ doanh thu, tương đương 7 cửa hàng ở mức 12 tỷ mỗi cửa hàng. Ex.3: EBITDA 5% của 12 tỷ là 0,6 tỷ, vốn 4 tỷ nên hoàn vốn 6,7 năm. H1, H2, H3 đúng; H4 đúng và giả thuyết mở đồng loạt bị bác bỏ. Ex.2: chợ truyền thống vẫn giữ 54% nên phải mở theo đợt, lấy doanh thu thực sau 9 tháng làm điều kiện, thay vì chấp nhận rủi ro vốn của 20 cửa hàng cùng lúc.",
    rec:"B"},
  mistakes:{
    logicLesson:"i-entry-3",
    calc:{label:"số cửa hàng thị trường nuôi được và thời gian hoàn vốn", lesson:"i-entry-1",
      good:"14.400 tỷ × 12% = 1.728 tỷ; × 5% = 86,4 tỷ ÷ 12 tỷ = 7 cửa hàng; hoàn vốn 4 ÷ 0,6 = 6,7 năm",
      why:"Câu hỏi mở bao nhiêu cửa hàng phải trả lời bằng thị phần chiếm được chia cho doanh thu một cửa hàng."},
    framework:{lesson:"i-entry-2",
      good:"Bốn nhánh: quy mô chi tiêu · tỷ trọng kênh hiện đại và thị phần · kinh tế cửa hàng · nhịp mở rộng",
      why:"Thiếu nhánh nhịp mở rộng thì câu trả lời chỉ còn có vào hay không, không dùng được."},
    exhibit:{lesson:"f-moat-3", bad:"Không giới hạn thị trường theo tỷ trọng kênh hiện đại",
      good:"Ex.2: kênh hiện đại mới 12% chi tiêu, chợ truyền thống còn 54%",
      why:"Thị trường có thể chiếm luôn nhỏ hơn tổng chi tiêu — nhầm chỗ này là mở thừa cửa hàng."}
  },
  goodFeedback:"Giới hạn thị trường đúng theo kênh, quy ra số cửa hàng và biến hoàn vốn thành nhịp mở có điều kiện."
});

/* ─────────── iv-13 · Growth · sàn tuyển dụng ─────────── */
R({
  id:"iv-13", title:"Growth: sàn tuyển dụng online tăng trưởng chậm lại",
  brief:{context:"Người phỏng vấn: \"Một sàn tuyển dụng online có 40.000 nhà tuyển dụng trả phí, doanh thu vẫn tăng nhưng chậm dần. CEO muốn biết chặn đà chậm lại ở đâu.\"",
         task:"tìm chỗ rò rỉ khách trả phí, lượng hoá doanh thu mất và đề xuất đòn bẩy tăng trưởng."},
  labels:{problem:"1 · Nhắc lại đề bằng một câu", hyps:"2 · Cấu trúc bạn nói với người phỏng vấn", evidence:"3 · Phân tích và con số"},
  exhibits:[
    {kind:"table", title:"Khách trả phí", unit:"năm gần nhất",
     head:["Chỉ tiêu","Giá trị","Ghi chú"],
     rows:[["Nhà tuyển dụng trả phí","40.000",""],["Doanh thu bình quân mỗi khách","12 triệu/năm",""],
           ["Doanh thu","480 tỷ",""],["Khách rời bỏ mỗi năm","25%",""],["Khách mới mỗi năm","11.000",""]]},
    {kind:"bars", title:"Tỷ lệ rời bỏ theo quy mô khách", unit:"% mỗi năm",
     headline:"Khách nhỏ rời bỏ gấp ba khách lớn", sub:"Theo số nhân sự tuyển mỗi năm",
     rows:[["Khách lớn (trên 50 vị trí)",12,"var(--series-base)"],["Khách vừa",22,"var(--series-base)"],["Khách nhỏ (dưới 5 vị trí)",36,"var(--series-bad)"]],
     max:40, ticks:[0,10,20,30,40]},
    {kind:"metrics", title:"Hành vi sau khi mua gói",
     items:[["Khách nhỏ dùng hết gói đăng tin","28%",""],["Khách lớn dùng hết gói","81%",""],
            ["Tỷ lệ tuyển được trong 30 ngày — khách nhỏ","34%",""]]}
  ],
  options:[
    ["A","Giảm giá gói cho khách nhỏ để giữ chân","Khách nhỏ rời bỏ vì không tuyển được người, không phải vì giá — giảm giá chỉ làm mỏng doanh thu.",35],
    ["B","Đưa khách nhỏ vào quy trình hỗ trợ viết tin và gợi ý ứng viên trong 30 ngày đầu, gắn gia hạn với kết quả tuyển được","Rời bỏ tập trung ở nhóm khách nhỏ không dùng hết gói và không tuyển được người — sửa ở kết quả sử dụng mới chặn được 120 tỷ doanh thu mất mỗi năm.",95],
    ["C","Tăng ngân sách bán hàng để lấy thêm khách mới","11.000 khách mới không bù nổi 10.000 khách rời mà chi phí lấy khách ngày càng đắt.",40],
    ["D","Tập trung hoàn toàn vào khách lớn","Khách lớn chỉ là phần nhỏ số lượng; bỏ nhóm nhỏ là bỏ phần lớn cơ sở khách hàng.",45]
  ],
  correct:"B",
  framing:[["sàn tuyển dụng","nhà tuyển dụng"],["tăng trưởng","chậm lại","doanh thu"]],
  branches:[["khách mới","bổ sung"],["rời bỏ","churn"],["doanh thu bình quân","arpu","giá gói"],["sử dụng","kết quả tuyển","trải nghiệm"]],
  numbers:[{v:120,tol:0.5,pts:30,core:true},{v:10000,tol:5,pts:25},{v:480,tol:0.5,pts:20},{v:2.5,tol:0.1,pts:15}],
  insight:[{kw:["dùng hết gói","kết quả tuyển"],pts:40},{kw:["khách nhỏ","nhóm nhỏ"],pts:35},{kw:["gia hạn","giữ chân"],pts:25}],
  unit:"tỷ|%|triệu",
  model:{
    problem:"Vì sao tăng trưởng doanh thu của sàn tuyển dụng chậm lại dù vẫn có khách mới, và chặn đà chậm lại bằng đòn bẩy nào?",
    hyps:["Khách mới mỗi năm không đủ bù số khách rời bỏ","Tỷ lệ rời bỏ tập trung ở một nhóm khách cụ thể",
          "Doanh thu bình quân mỗi khách không tăng","Khách rời bỏ vì không đạt kết quả tuyển chứ không vì giá"],
    evidence:"Ex.1: 40.000 × 25% = 10.000 khách rời mỗi năm, tương đương 120 tỷ doanh thu mất trên nền 480 tỷ; khách mới 11.000 nên số khách ròng chỉ tăng 2,5%. H1 và H3 đúng. Ex.2: khách nhỏ rời bỏ 36% so với khách lớn 12% nên H2 đúng. Ex.3: chỉ 28% khách nhỏ dùng hết gói và 34% tuyển được người trong 30 ngày, nên giả thuyết rời bỏ vì giá bị bác bỏ và H4 đúng. Đòn bẩy là đưa khách nhỏ vào hỗ trợ viết tin và gợi ý ứng viên, rồi gắn gia hạn với kết quả tuyển để giữ chân.",
    rec:"B"},
  mistakes:{
    logicLesson:"i-profit-3",
    calc:{label:"doanh thu mất mỗi năm do khách rời bỏ", lesson:"i-profit-2",
      good:"40.000 × 25% = 10.000 khách × 12 triệu = 120 tỷ trên nền doanh thu 480 tỷ; ròng chỉ +1.000 khách (2,5%)",
      why:"Quy tỷ lệ rời bỏ thành tiền mới thấy được vì sao tăng trưởng đứng lại."},
    framework:{lesson:"i-profit-1",
      good:"Bốn nhánh: khách mới · khách rời bỏ · doanh thu mỗi khách · mức độ sử dụng và kết quả",
      why:"Doanh thu thuê bao là tích của ba dòng — thiếu nhánh nào cũng ra kết luận sai."},
    exhibit:{lesson:"i-chart-1", bad:"Không tách tỷ lệ rời bỏ theo quy mô khách",
      good:"Ex.2: khách nhỏ rời 36% so với khách lớn 12%; Ex.3: chỉ 28% khách nhỏ dùng hết gói",
      why:"Một tỷ lệ trung bình giấu mất nhóm đang thực sự rò rỉ."}
  },
  goodFeedback:"Quy rời bỏ thành tiền, tách theo nhóm khách và gắn khuyến nghị vào kết quả sử dụng."
});

/* ─────────── iv-14 · Pricing · nhà máy thép báo giá hợp đồng ─────────── */
R({
  id:"iv-14", title:"Pricing: nhà máy thép báo giá hợp đồng dài hạn",
  brief:{context:"Người phỏng vấn: \"Một nhà máy thép được hỏi mua 10.000 tấn mỗi năm với giá 16,5 triệu đồng một tấn, thấp hơn giá thị trường. Bạn dẫn case: có nên nhận không?\"",
         task:"so giá đề nghị với chi phí biên và chi phí bình quân, lượng hoá lãi góp và nêu rủi ro."},
  labels:{problem:"1 · Nhắc lại đề bằng một câu", hyps:"2 · Cấu trúc bạn tự dẫn", evidence:"3 · Phân tích và con số"},
  exhibits:[
    {kind:"table", title:"Cơ cấu chi phí nhà máy", unit:"",
     head:["Chỉ tiêu","Giá trị","Ghi chú"],
     rows:[["Công suất thiết kế","80.000 tấn/năm",""],["Sản lượng hiện tại","60.000 tấn/năm","công suất dùng 75%"],
           ["Chi phí biến đổi","14 triệu/tấn",""],["Chi phí cố định","240 tỷ/năm",""],["Giá thị trường","19,5 triệu/tấn",""]]},
    {kind:"bars", title:"Giá bán theo nhóm khách hiện tại", unit:"triệu đồng/tấn",
     headline:"Khách lớn đã được giá thấp hơn mặt bằng", sub:"Giá bình quân năm nay",
     rows:[["Khách lẻ",20.5,"var(--series-base)"],["Khách dự án",19.5,"var(--series-base)"],["Khách lớn dài hạn",18.2,"var(--series-focus)"],["Giá đề nghị lần này",16.5,"var(--series-bad)"]],
     max:22, ticks:[0,5.5,11,16.5,22]},
    {kind:"metrics", title:"Ràng buộc",
     items:[["Sản lượng hợp đồng đề nghị","10.000 tấn/năm","nằm trong phần công suất dư"],
            ["Thời hạn hợp đồng","3 năm",""],["Khách hiện hữu biết giá của nhau","có","cùng phân khúc xây dựng"]]}
  ],
  options:[
    ["A","Từ chối vì giá thấp hơn chi phí bình quân 18 triệu","Chi phí bình quân chứa phần cố định đã phải trả dù có đơn hay không — dùng nó để từ chối là bỏ mất 25 tỷ lãi góp.",40],
    ["B","Nhận hợp đồng ở phần công suất dư nhưng tách thành sản phẩm và điều khoản riêng, có ràng buộc không bán lại và cơ chế điều chỉnh theo giá phôi","Giá 16,5 triệu cao hơn chi phí biến đổi 14 triệu nên đóng góp 25 tỷ mỗi năm; rủi ro thật là neo giá với khách hiện hữu nên phải tách điều khoản.",95],
    ["C","Nhận và áp cùng mức giá cho mọi khách lớn","Kéo giá cả nhóm khách 18,2 triệu xuống 16,5 triệu là mất nhiều hơn phần lãi góp vừa thêm.",25],
    ["D","Đề nghị giá 19,5 triệu bằng giá thị trường","Bỏ qua thực tế là phần công suất dư không có chi phí cố định tăng thêm — nhiều khả năng mất hợp đồng.",45]
  ],
  correct:"B",
  framing:[["thép","hợp đồng"],["giá","có nên nhận","báo giá"]],
  branches:[["chi phí biến đổi","chi phí biên"],["chi phí cố định","chi phí bình quân"],["công suất dư","sản lượng"],["khách hiện hữu","neo giá","rủi ro"]],
  numbers:[{v:25,tol:0.5,pts:30,core:true},{v:18,tol:0.1,pts:25},{v:4,tol:0.1,pts:20},{v:2.5,tol:0.05,pts:15}],
  insight:[{kw:["công suất dư","chi phí biên"],pts:40},{kw:["neo giá","khách hiện hữu"],pts:35},{kw:["điều khoản riêng","không bán lại"],pts:25}],
  unit:"tỷ|%|triệu",
  model:{
    problem:"Nhà máy thép có nên nhận hợp đồng 10.000 tấn ở giá 16,5 triệu một tấn, thấp hơn giá thị trường, hay không?",
    hyps:["Giá đề nghị vẫn cao hơn chi phí biến đổi mỗi tấn","Chi phí bình quân cao hơn giá nhưng chứa phần cố định đã phải trả",
          "Công suất dư đủ để nhận thêm sản lượng mà không tăng chi phí cố định","Rủi ro lớn nhất là neo giá với khách hiện hữu chứ không phải lỗ đơn hàng"],
    evidence:"Ex.1: chi phí cố định 240 tỷ chia 60.000 tấn là 4 triệu mỗi tấn, cộng biến đổi 14 triệu cho chi phí bình quân 18 triệu. Giá 16,5 triệu thấp hơn mức đó nhưng vẫn cao hơn chi phí biến đổi 2,5 triệu mỗi tấn, nên 10.000 tấn đóng góp 25 tỷ mỗi năm. H1, H2, H3 đúng nên lập luận từ chối theo chi phí bình quân bị bác bỏ. Ex.2 và Ex.3: khách lớn đang mua 18,2 triệu và các khách cùng phân khúc biết giá của nhau, nên rủi ro thật là neo giá — phải tách thành điều khoản riêng, ràng buộc không bán lại, và gắn cơ chế điều chỉnh theo giá phôi cho hợp đồng ba năm.",
    rec:"B"},
  mistakes:{
    logicLesson:"i-profit-3",
    calc:{label:"lãi góp của hợp đồng và chi phí bình quân", lesson:"i-profit-2",
      good:"Cố định 240 ÷ 60.000 = 4 triệu/tấn; bình quân 18 triệu; lãi góp (16,5 − 14) × 10.000 = 25 tỷ/năm",
      why:"Quyết định nhận đơn ở công suất dư dựa trên chi phí biên, không dựa trên chi phí bình quân."},
    framework:{lesson:"i-profit-1",
      good:"Bốn nhánh: chi phí biến đổi · chi phí cố định và phân bổ · công suất dư · ảnh hưởng lên khách hiện hữu",
      why:"Case định giá đơn hàng luôn có nhánh tác động chéo sang khách đang mua."},
    exhibit:{lesson:"i-chart-1", bad:"Không so giá đề nghị với mặt bằng giá của khách hiện hữu",
      good:"Ex.2: khách lớn đang mua 18,2 triệu; Ex.3: các khách biết giá của nhau",
      why:"Rủi ro neo giá quyết định hợp đồng phải được tách điều khoản thế nào."}
  },
  goodFeedback:"Phân biệt chi phí biên với chi phí bình quân và xử lý rủi ro neo giá bằng điều khoản, không bằng lời hứa."
});

/* ─────────── iv-15 · Operations · phòng mổ bệnh viện ─────────── */
R({
  id:"iv-15", title:"Operations: bệnh viện quá tải lịch mổ",
  brief:{context:"Người phỏng vấn: \"Một bệnh viện có danh sách chờ mổ kéo dài 6 tuần dù phòng mổ không thiếu. Giám đốc muốn biết nên đầu tư thêm phòng mổ hay không.\"",
         task:"tính công suất thật của phòng mổ, tìm phần thời gian mất và khuyến nghị có nên đầu tư."},
  labels:{problem:"1 · Nhắc lại đề bằng một câu", hyps:"2 · Cấu trúc bạn nói với người phỏng vấn", evidence:"3 · Phân tích và con số"},
  exhibits:[
    {kind:"table", title:"Phòng mổ và nhu cầu", unit:"mỗi ngày",
     head:["Chỉ tiêu","Giá trị","Ghi chú"],
     rows:[["Số phòng mổ","8",""],["Giờ hoạt động mỗi phòng","10 giờ",""],["Tổng giờ mổ khả dụng","80 giờ",""],
           ["Thời gian một ca mổ","2 giờ",""],["Thời gian trở phòng giữa hai ca","45 phút",""],["Nhu cầu ca mổ","40 ca",""]]},
    {kind:"bars", title:"Thời gian trở phòng so với chuẩn", unit:"phút",
     headline:"Trở phòng lâu gấp đôi chuẩn tham chiếu", sub:"Đo trên 300 ca",
     rows:[["Bệnh viện này",45,"var(--series-bad)"],["Chuẩn tham chiếu khu vực",20,"var(--series-focus)"],["Bệnh viện tốt nhất nhóm",15,"var(--series-base)"]],
     max:50, ticks:[0,12.5,25,37.5,50]},
    {kind:"metrics", title:"Nguyên nhân trở phòng lâu",
     items:[["Chờ dọn và tiệt trùng","22 phút",""],["Chờ bệnh nhân được chuyển lên","14 phút",""],
            ["Chờ đủ kíp mổ","9 phút",""],["Vốn một phòng mổ mới","28 tỷ",""]]}
  ],
  options:[
    ["A","Đầu tư thêm hai phòng mổ mới","56 tỷ để mua thêm giờ trong khi mỗi phòng hiện có đang mất gần một phần ba thời gian vì trở phòng.",35],
    ["B","Rút thời gian trở phòng về chuẩn 20 phút bằng đội dọn chuyên trách và chuyển bệnh nhân trước giờ, nâng công suất từ 29 lên 34 ca mỗi ngày trước khi tính đầu tư","Phần thiếu 11 ca mỗi ngày phần lớn đến từ thời gian trở phòng chứ không từ thiếu phòng, nên sửa quy trình rẻ hơn 28 tỷ mỗi phòng.",95],
    ["C","Kéo dài giờ hoạt động lên 12 giờ mỗi ngày","Tốn thêm ca trực mà vẫn mất tỷ lệ thời gian trở phòng như cũ.",45],
    ["D","Chuyển bớt bệnh nhân sang bệnh viện đối tác","Giữ nguyên vấn đề vận hành và chuyển doanh thu sang nơi khác.",40]
  ],
  correct:"B",
  framing:[["phòng mổ","bệnh viện"],["chờ","công suất","đầu tư"]],
  branches:[["nhu cầu","số ca","danh sách chờ"],["công suất","giờ mổ"],["trở phòng","thời gian mất"],["đầu tư","chi phí","phương án"]],
  numbers:[{v:29,tol:0.5,pts:30,core:true},{v:11,tol:0.5,pts:25},{v:34,tol:0.5,pts:20},{v:2.75,tol:0.05,pts:15}],
  insight:[{kw:["trở phòng","thời gian mất"],pts:40},{kw:["chuẩn","tham chiếu"],pts:35},{kw:["rẻ hơn","trước khi đầu tư"],pts:25}],
  unit:"tỷ|%|ca|giờ|phút",
  model:{
    problem:"Bệnh viện có nên đầu tư thêm phòng mổ để rút danh sách chờ 6 tuần, hay công suất hiện có vẫn còn dư địa?",
    hyps:["Nhu cầu ca mổ cao hơn số ca thực hiện được mỗi ngày","Công suất thật thấp hơn công suất danh nghĩa vì thời gian trở phòng",
          "Thời gian trở phòng dài hơn chuẩn tham chiếu","Đầu tư phòng mổ mới đắt hơn cải tiến quy trình"],
    evidence:"Ex.1: mỗi ca chiếm 2 giờ mổ cộng 45 phút trở phòng là 2,75 giờ, nên 80 giờ khả dụng chỉ cho 29 ca mỗi ngày trong khi nhu cầu 40 ca — thiếu 11 ca. H1, H2 đúng. Ex.2: trở phòng 45 phút so với chuẩn 20 phút nên H3 đúng; nếu về chuẩn thì mỗi ca chiếm 2,33 giờ và công suất lên 34 ca, thêm 5 ca mỗi ngày mà không cần phòng mới. Ex.3: 22 phút chờ dọn và 14 phút chờ chuyển bệnh nhân là phần sửa được, trong khi một phòng mổ mới tốn 28 tỷ — nên giả thuyết thiếu phòng bị bác bỏ và H4 đúng, làm quy trình rẻ hơn trước khi đầu tư.",
    rec:"B"},
  mistakes:{
    logicLesson:"i-profit-3",
    calc:{label:"số ca mổ thật mỗi ngày", lesson:"i-profit-2",
      good:"Mỗi ca chiếm 2 + 0,75 = 2,75 giờ → 80 ÷ 2,75 = 29 ca; nhu cầu 40 ca nên thiếu 11; về chuẩn 20 phút thì 80 ÷ 2,33 = 34 ca",
      why:"Công suất thật phải tính cả thời gian không mổ, nếu không sẽ kết luận thiếu phòng."},
    framework:{lesson:"i-profit-1",
      good:"Bốn nhánh: nhu cầu ca mổ · công suất giờ · thời gian mất khi trở phòng · chi phí các phương án",
      why:"Case công suất luôn phải tách thời gian có ích khỏi thời gian danh nghĩa."},
    exhibit:{lesson:"i-chart-1", bad:"Không so thời gian trở phòng với chuẩn tham chiếu",
      good:"Ex.2: 45 phút so với chuẩn 20 phút; Ex.3: 22 phút chờ dọn và 14 phút chờ bệnh nhân",
      why:"Chuẩn tham chiếu cho biết phần thời gian mất là sửa được, không phải cố hữu."}
  },
  goodFeedback:"Tính công suất thật gồm cả thời gian trở phòng, rồi chứng minh cải tiến quy trình rẻ hơn đầu tư."
});


/* ─────────── iv-16 · M&A · logistics mua đội xe ─────────── */
R({
  id:"iv-16", title:"M&A: công ty logistics mua lại một đội xe tải",
  brief:{context:"Người phỏng vấn: \"Một công ty logistics được chào mua một đội 200 xe tải với giá 300 tỷ. Bạn dẫn case: nên mua không và trả bao nhiêu?\"",
         task:"quy giá về bội số EBITDA, lượng hoá synergy chiều về và nêu điều kiện của thương vụ."},
  labels:{problem:"1 · Nhắc lại đề bằng một câu", hyps:"2 · Cấu trúc bạn tự dẫn", evidence:"3 · Phân tích và con số"},
  exhibits:[
    {kind:"table", title:"Đội xe mục tiêu", unit:"",
     head:["Chỉ tiêu","Giá trị","Ghi chú"],
     rows:[["Số xe","200",""],["Doanh thu","400 tỷ/năm",""],["Biên EBITDA","12%",""],["Giá chào","300 tỷ",""],
           ["Tuổi xe trung bình","6 năm","đời xe còn khai thác 5 năm"]]},
    {kind:"bars", title:"Tỷ lệ chạy rỗng chiều về", unit:"% quãng đường",
     headline:"Ghép mạng lưới cắt được một nửa quãng chạy rỗng", sub:"Trước và sau khi ghép tuyến",
     rows:[["Đội xe mục tiêu hiện tại",38,"var(--series-bad)"],["Công ty mình hiện tại",24,"var(--series-base)"],["Sau khi ghép mạng lưới",19,"var(--series-focus)"]],
     max:40, ticks:[0,10,20,30,40]},
    {kind:"metrics", title:"Bối cảnh thương vụ",
     items:[["Bội số các thương vụ vận tải gần đây","5 lần EBITDA",""],["Synergy chiều về ước tính","3% doanh thu mục tiêu",""],
            ["Chi phí thay mới một xe","1,8 tỷ","sau 5 năm nữa"]]}
  ],
  options:[
    ["A","Trả đủ 300 tỷ","6,25 lần EBITDA trong khi ngành giao dịch quanh 5 lần, lại còn khoản thay xe sau 5 năm chưa tính vào.",35],
    ["B","Đề nghị quanh 300 tỷ nhưng tính trên EBITDA sau synergy 60 tỷ, kèm điều kiện giữ đội lái xe và trừ dần phần chi phí thay mới đội xe","Synergy chiều về 12 tỷ kéo bội số thực về 5 lần, đúng mặt bằng ngành; giá trị thật nằm ở mạng lưới nên phải ràng buộc giữ lái xe.",95],
    ["C","Bỏ thương vụ và tự mua xe mới","Mua xe mới không mua được tuyến và khách hàng — phần tạo ra synergy chiều về.",45],
    ["D","Mua rồi bán lại một nửa số xe","Bán xe cũ 6 năm thu về ít mà mất luôn quy mô mạng lưới vừa mua.",30]
  ],
  correct:"B",
  framing:[["đội xe","logistics"],["mua lại","định giá","trả bao nhiêu"]],
  branches:[["ebitda","lợi nhuận mục tiêu"],["bội số","mặt bằng ngành"],["synergy","chiều về","mạng lưới"],["tuổi xe","thay mới","rủi ro"]],
  numbers:[{v:6.25,tol:0.05,pts:30,core:true},{v:48,tol:0.5,pts:25},{v:12,tol:0.1,pts:20},{v:60,tol:0.5,pts:15}],
  insight:[{kw:["chiều về","chạy rỗng"],pts:40},{kw:["mặt bằng ngành","5 lần"],pts:35},{kw:["thay mới","tuổi xe"],pts:25}],
  unit:"tỷ|%|lần",
  model:{
    problem:"Công ty logistics có nên mua lại đội 200 xe với giá chào 300 tỷ không, và định giá hợp lý là bao nhiêu?",
    hyps:["EBITDA độc lập của đội xe quyết định giá trị nền","Bội số giá chào cao hơn mặt bằng ngành vận tải",
          "Synergy chiều về từ ghép mạng lưới làm tăng EBITDA thật","Tuổi xe cao kéo theo chi phí thay mới phải trừ vào giá"],
    evidence:"Ex.1: EBITDA 400 × 12% = 48 tỷ nên giá chào 300 tỷ tương đương 6,25 lần. Ex.3: mặt bằng ngành 5 lần nên H2 đúng. Synergy chiều về 3% × 400 = 12 tỷ đưa EBITDA lên 60 tỷ và bội số thực về 5 lần, đúng mặt bằng — H1, H3 đúng. Ex.2: chạy rỗng giảm từ 38% xuống 19% sau khi ghép mạng lưới, đó là nơi synergy đến từ, nên giả thuyết mua để lấy tài sản xe bị bác bỏ. H4 đúng: xe trung bình 6 năm, chi phí thay mới 1,8 tỷ mỗi xe sau 5 năm phải trừ dần vào giá và nên kèm điều kiện giữ đội lái xe.",
    rec:"B"},
  mistakes:{
    logicLesson:"i-entry-3",
    calc:{label:"bội số trước và sau synergy", lesson:"i-profit-2",
      good:"EBITDA 400 × 12% = 48 tỷ → 300 ÷ 48 = 6,25 lần; synergy 12 tỷ → 60 tỷ → 5 lần",
      why:"Giá chỉ có nghĩa khi quy về bội số và so với mặt bằng ngành."},
    framework:{lesson:"i-entry-2",
      good:"Bốn nhánh: EBITDA độc lập · bội số ngành · synergy mạng lưới · rủi ro tài sản và đội ngũ",
      why:"Trong vận tải, giá trị nằm ở mạng lưới và lái xe chứ không ở tài sản xe."},
    exhibit:{lesson:"f-moat-3", bad:"Không chỉ ra synergy đến từ cắt quãng chạy rỗng chiều về",
      good:"Ex.2: chạy rỗng 38% về 19% sau khi ghép mạng lưới",
      why:"Phải nói synergy đến từ cơ chế nào thì con số synergy mới đáng tin."}
  },
  goodFeedback:"Quy giá về bội số, chỉ rõ cơ chế tạo synergy và biến rủi ro tài sản thành điều kiện thương vụ."
});

/* ─────────── iv-17 · Market Sizing · suất ăn văn phòng ─────────── */
R({
  id:"iv-17", title:"Market sizing: thị trường suất ăn trưa văn phòng ở TP.HCM",
  brief:{context:"Người phỏng vấn: \"Ước lượng quy mô thị trường suất ăn trưa cho nhân viên văn phòng tại TP.HCM mỗi năm. Bạn có vài giả định, không có báo cáo ngành.\"",
         task:"dựng cây ước lượng, nói rõ giả định và kiểm tra chéo kết quả."},
  labels:{problem:"1 · Nhắc lại đề bằng một câu", hyps:"2 · Cấu trúc ước lượng", evidence:"3 · Phân tích và con số"},
  exhibits:[
    {kind:"table", title:"Giả định cho sẵn", unit:"",
     head:["Giả định","Giá trị","Ghi chú"],
     rows:[["Lao động văn phòng","1,2 triệu người",""],["Tỷ lệ mua bữa trưa thay vì mang cơm","40%",""],
           ["Số ngày làm việc mỗi năm","220",""],["Giá trung bình một suất","45.000đ",""]]},
    {kind:"bars", title:"Cách ăn trưa của nhân viên văn phòng", unit:"% số người",
     headline:"Bốn trên mười người mua bữa trưa", sub:"Khảo sát 2.000 người",
     rows:[["Mang cơm nhà",34,"var(--series-base)"],["Căng tin công ty",26,"var(--series-base)"],["Mua ngoài hoặc đặt app",40,"var(--series-focus)"]],
     max:50, ticks:[0,12.5,25,37.5,50]},
    {kind:"metrics", title:"Kiểm tra chéo",
     items:[["Số quán và bếp phục vụ bữa trưa văn phòng","6.000",""],["Doanh thu bữa trưa mỗi quán","65 triệu/tháng",""],
            ["Tỷ lệ đặt qua app trong nhóm mua ngoài","35%",""]]}
  ],
  options:[
    ["A","Lấy 9 triệu dân × 45.000đ × 365 ngày","Tính cả trẻ em, người nghỉ hưu và mọi bữa ăn — sai phạm vi đề bài.",20],
    ["B","Ước lượng 4.752 tỷ đồng mỗi năm từ lao động văn phòng mua bữa trưa, kiểm tra chéo bằng doanh thu mỗi quán và nêu độ nhạy theo giá suất ăn","Đi từ số người tới số suất rồi tới tiền, kiểm tra chéo bằng nguồn độc lập và chỉ ra biến nhạy nhất.",95],
    ["C","Lấy doanh thu các app giao đồ ăn nhân lên","App chỉ chiếm 35% nhóm mua ngoài — bỏ sót phần mua trực tiếp.",45],
    ["D","Không ước lượng được vì thiếu số liệu chính thức","Market sizing chấm cây ước lượng và giả định, không chấm việc có sẵn báo cáo.",25]
  ],
  correct:"B",
  framing:[["suất ăn","bữa trưa"],["quy mô","ước lượng","thị trường"]],
  branches:[["lao động văn phòng","số người"],["tỷ lệ mua","hành vi"],["số ngày","tần suất"],["giá suất","doanh thu","kiểm tra chéo"]],
  numbers:[{v:4752,tol:5,pts:30,core:true},{v:480000,tol:500,pts:25},{v:45000,tol:100,pts:20},{v:220,tol:1,pts:15}],
  insight:[{kw:["kiểm tra chéo","đối chiếu"],pts:40},{kw:["độ nhạy","giả định nhạy"],pts:35},{kw:["mang cơm","căng tin"],pts:25}],
  unit:"tỷ|%|đ|suất",
  model:{
    problem:"Thị trường suất ăn trưa cho nhân viên văn phòng tại TP.HCM mỗi năm lớn cỡ nào tính theo doanh thu?",
    hyps:["Số lao động văn phòng là nền của ước lượng","Chỉ phần có hành vi mua bữa trưa mới tạo doanh thu",
          "Số ngày làm việc quyết định tần suất mua","Giá mỗi suất biến số suất thành tiền"],
    evidence:"Ex.1 và Ex.2: 1,2 triệu lao động văn phòng × 40% mua bữa trưa = 480.000 người mỗi ngày làm việc; × 220 ngày × 45.000đ = 4.752 tỷ đồng mỗi năm. Phần mang cơm 34% và căng tin 26% bị loại khỏi phạm vi nên giả thuyết tính cả dân số bị bác bỏ; H1, H2, H3, H4 đều đúng. Ex.3 kiểm tra chéo: 6.000 quán × 65 triệu × 12 tháng = 4.680 tỷ, lệch khoảng 1,5%. Giả định nhạy nhất là giá mỗi suất: mỗi 5.000đ đổi khoảng 528 tỷ, nên nêu độ nhạy kèm con số thay vì một đáp số duy nhất.",
    rec:"B"},
  mistakes:{
    logicLesson:"i-chart-1",
    calc:{label:"đường đi từ số người tới doanh thu", lesson:"i-profit-2",
      good:"1,2 triệu × 40% = 480.000 suất/ngày → × 220 ngày × 45.000đ = 4.752 tỷ/năm",
      why:"Giữ đơn vị qua từng bước để người phỏng vấn theo được đường tính."},
    framework:{lesson:"i-profit-1",
      good:"Bốn tầng: số lao động văn phòng · tỷ lệ mua bữa trưa · số ngày làm việc · giá mỗi suất",
      why:"Mỗi tầng phải là một phép nhân có đơn vị rõ và nằm đúng phạm vi đề."},
    exhibit:{lesson:"i-chart-1", bad:"Không kiểm tra chéo bằng doanh thu mỗi quán",
      good:"Ex.3: 6.000 quán × 65 triệu × 12 tháng = 4.680 tỷ, lệch khoảng 1,5%",
      why:"Ước lượng có kiểm tra chéo đáng tin hơn hẳn một con số đơn lẻ."}
  },
  goodFeedback:"Khoanh đúng phạm vi, giữ đơn vị qua từng tầng và kiểm tra chéo bằng nguồn độc lập."
});

/* ─────────── iv-18 · Product Launch · xe máy điện giá rẻ ─────────── */
R({
  id:"iv-18", title:"Product launch: hãng xe máy điện ra mẫu giá rẻ",
  brief:{context:"Người phỏng vấn: \"Một hãng xe máy điện định ra mẫu giá rẻ 22 triệu đồng để mở rộng tệp khách. Bạn dẫn case: nên làm không?\"",
         task:"tính sản lượng hoà vốn của khoản đầu tư khuôn, so với thị phần cần đạt và nêu rủi ro ăn mòn."},
  labels:{problem:"1 · Nhắc lại đề bằng một câu", hyps:"2 · Cấu trúc bạn tự dẫn", evidence:"3 · Phân tích và con số"},
  exhibits:[
    {kind:"table", title:"Kinh tế mẫu xe mới", unit:"",
     head:["Chỉ tiêu","Giá trị","Ghi chú"],
     rows:[["Giá bán lẻ đề xuất","22 triệu",""],["Chi phí biến đổi mỗi xe","17 triệu","gồm pin và chiết khấu đại lý"],
           ["Đầu tư khuôn và dây chuyền","150 tỷ","dùng trong 4 năm"],["Thị trường xe máy điện","300.000 xe/năm",""]]},
    {kind:"bars", title:"Phân bố giá xe máy điện đang bán", unit:"% sản lượng",
     headline:"Phân khúc dưới 25 triệu chiếm gần một nửa", sub:"Thị trường năm gần nhất",
     rows:[["Dưới 25 triệu",46,"var(--series-focus)"],["25–40 triệu",34,"var(--series-base)"],["Trên 40 triệu",20,"var(--series-base)"]],
     max:50, ticks:[0,12.5,25,37.5,50]},
    {kind:"metrics", title:"Danh mục hiện tại",
     items:[["Mẫu đang bán chạy nhất","32 triệu","lãi góp 9 triệu mỗi xe"],["Sản lượng hiện tại","24.000 xe/năm",""],
            ["Tỷ lệ khách cân nhắc mẫu 32 triệu sẽ chuyển xuống mẫu rẻ","25%",""]]}
  ],
  options:[
    ["A","Ra mắt mẫu rẻ với cùng kênh phân phối và cùng thương hiệu","25% khách mẫu 32 triệu chuyển xuống làm mất 9 triệu lãi góp mỗi xe — phần ăn mòn ăn hết phần tăng.",40],
    ["B","Ra mắt dưới thương hiệu phụ, khác kênh bán và giữ khoảng cách tính năng, với mục tiêu 30.000 xe hoà vốn tương đương 10% thị phần","Hoà vốn cần 30.000 xe, tức 10% thị trường — khả thi trong phân khúc chiếm 46% sản lượng nhưng chỉ khi chặn được ăn mòn từ mẫu 32 triệu.",95],
    ["C","Không ra mẫu mới","Bỏ phân khúc chiếm 46% sản lượng thị trường trong khi lãi góp mỗi xe vẫn dương 5 triệu.",40],
    ["D","Hạ giá mẫu 32 triệu xuống 26 triệu thay vì ra mẫu mới","Hạ giá mẫu đang bán chạy làm mất lãi góp trên toàn bộ 24.000 xe hiện tại.",30]
  ],
  correct:"B",
  framing:[["xe máy điện","mẫu xe"],["ra mắt","giá rẻ","có nên"]],
  branches:[["lãi góp","giá bán","chi phí biến đổi"],["đầu tư","khuôn","hoà vốn"],["thị trường","thị phần","phân khúc"],["ăn mòn","danh mục","mẫu hiện tại"]],
  numbers:[{v:30000,tol:50,pts:30,core:true},{v:5,tol:0.1,pts:25},{v:10,tol:0.1,pts:20},{v:150,tol:0.5,pts:15}],
  insight:[{kw:["ăn mòn","chuyển xuống"],pts:40},{kw:["thương hiệu phụ","khác kênh"],pts:35},{kw:["phân khúc","46%"],pts:25}],
  unit:"tỷ|%|triệu|xe",
  model:{
    problem:"Hãng xe máy điện có nên ra mẫu giá rẻ 22 triệu để mở rộng tệp khách, và cần bán bao nhiêu xe mới đáng làm?",
    hyps:["Lãi góp mỗi xe mới vẫn dương sau chi phí biến đổi","Khoản đầu tư khuôn quyết định sản lượng hoà vốn",
          "Phân khúc giá rẻ đủ lớn để đạt sản lượng đó","Mẫu mới có thể ăn mòn doanh số của mẫu đang bán chạy"],
    evidence:"Ex.1: lãi góp mỗi xe 22 − 17 = 5 triệu, nên đầu tư 150 tỷ cần 30.000 xe để hoà vốn, tương đương 10% thị trường 300.000 xe mỗi năm. H1, H2 đúng. Ex.2: phân khúc dưới 25 triệu chiếm 46% sản lượng nên mục tiêu 10% là khả thi, H3 đúng. Ex.3: 25% khách cân nhắc mẫu 32 triệu sẽ chuyển xuống, mà mỗi xe đó mất 9 triệu lãi góp — nên giả thuyết ra mắt cùng thương hiệu và cùng kênh bị bác bỏ, H4 đúng: phải bán dưới thương hiệu phụ, khác kênh và giữ khoảng cách tính năng.",
    rec:"B"},
  mistakes:{
    logicLesson:"i-entry-3",
    calc:{label:"sản lượng hoà vốn và thị phần tương ứng", lesson:"i-profit-2",
      good:"Lãi góp 22 − 17 = 5 triệu/xe; 150 tỷ ÷ 5 triệu = 30.000 xe = 10% thị trường 300.000 xe",
      why:"Sản phẩm mới phải quy khoản đầu tư về sản lượng hoà vốn rồi so với thị phần khả thi."},
    framework:{lesson:"i-entry-1",
      good:"Bốn nhánh: lãi góp mỗi xe · đầu tư và hoà vốn · quy mô phân khúc · ăn mòn danh mục",
      why:"Ra mẫu mới trong danh mục sẵn có luôn phải có nhánh ăn mòn."},
    exhibit:{lesson:"i-chart-1", bad:"Không tính phần ăn mòn từ mẫu 32 triệu",
      good:"Ex.3: 25% khách chuyển xuống, mỗi xe mất 9 triệu lãi góp so với 5 triệu của mẫu mới",
      why:"Ăn mòn có thể biến một sản phẩm có lãi thành một sản phẩm làm giảm lợi nhuận chung."}
  },
  goodFeedback:"Quy đầu tư về sản lượng hoà vốn, đối chiếu với phân khúc và xử lý ăn mòn bằng thiết kế kênh, thương hiệu."
});

/* ─────────── iv-19 · Profitability · hãng bay giá rẻ chậm chuyến ─────────── */
R({
  id:"iv-19", title:"Profitability: hãng bay giá rẻ mất tiền vì chậm chuyến",
  brief:{context:"Người phỏng vấn: \"Một hãng hàng không giá rẻ có tỷ lệ chậm chuyến cao và lợi nhuận mỏng. CEO muốn biết chậm chuyến đang tốn bao nhiêu và nên làm gì.\"",
         task:"lượng hoá chi phí chậm chuyến mỗi năm, tìm nguyên nhân và đề xuất cách xử lý."},
  labels:{problem:"1 · Nhắc lại đề bằng một câu", hyps:"2 · Cấu trúc bạn nói với người phỏng vấn", evidence:"3 · Phân tích và con số"},
  exhibits:[
    {kind:"table", title:"Hoạt động bay", unit:"",
     head:["Chỉ tiêu","Giá trị","Ghi chú"],
     rows:[["Số máy bay","60",""],["Chuyến bay mỗi máy bay mỗi ngày","5",""],["Tổng chuyến mỗi năm","109.500",""],
           ["Tỷ lệ chậm trên 30 phút","25%",""],["Chi phí mỗi chuyến chậm","40 triệu","bồi thường, nhiên liệu chờ, kíp bay phát sinh"]]},
    {kind:"bars", title:"Nguyên nhân chậm chuyến", unit:"% số chuyến chậm",
     headline:"Hơn một nửa là dây chuyền từ chuyến trước", sub:"Phân tích 27.000 chuyến chậm",
     rows:[["Dây chuyền từ chuyến trước",56,"var(--series-bad)"],["Thời tiết",18,"var(--series-base)"],["Kỹ thuật",14,"var(--series-base)"],["Sân bay và điều phối",12,"var(--series-base)"]],
     max:60, ticks:[0,15,30,45,60]},
    {kind:"metrics", title:"Thời gian quay đầu",
     items:[["Thời gian quay đầu kế hoạch","25 phút",""],["Thời gian quay đầu thực tế trung bình","34 phút",""],
            ["Tỷ trọng chuyến qua ba sân bay nghẽn nhất","61%",""]]}
  ],
  options:[
    ["A","Bồi thường hành khách hào phóng hơn để giữ uy tín","Tăng chính khoản chi phí đang muốn giảm mà không chạm vào nguyên nhân dây chuyền.",25],
    ["B","Tăng thời gian đệm quay đầu lên đúng mức thực tế ở ba sân bay nghẽn nhất và tách lịch bay để cắt dây chuyền, chấp nhận giảm nhẹ số chuyến mỗi máy bay","56% chuyến chậm là dây chuyền từ chuyến trước và quay đầu thực tế lâu hơn kế hoạch 9 phút — sửa lịch ở ba sân bay chiếm 61% chuyến là đòn bẩy lớn nhất trong 1.095 tỷ chi phí chậm.",95],
    ["C","Mua thêm máy bay dự phòng","Vốn lớn cho một vấn đề nằm ở lịch bay và thời gian quay đầu.",40],
    ["D","Cắt các đường bay có tỷ lệ chậm cao nhất","Mất doanh thu đường bay trong khi nguyên nhân dây chuyền vẫn còn ở phần lịch còn lại.",35]
  ],
  correct:"B",
  framing:[["hãng bay","chuyến bay"],["chậm chuyến","chi phí","lợi nhuận"]],
  branches:[["số chuyến","sản lượng bay"],["tỷ lệ chậm","chi phí mỗi chuyến chậm"],["dây chuyền","quay đầu","lịch bay"],["sân bay","thời tiết","kỹ thuật"]],
  numbers:[{v:1095,tol:1,pts:30,core:true},{v:27375,tol:10,pts:25},{v:109500,tol:10,pts:20},{v:9,tol:0.1,pts:15}],
  insight:[{kw:["dây chuyền","chuyến trước"],pts:40},{kw:["thời gian đệm","quay đầu"],pts:35},{kw:["sân bay nghẽn","61%"],pts:25}],
  unit:"tỷ|%|triệu|chuyến|phút",
  model:{
    problem:"Chậm chuyến đang làm hãng bay giá rẻ mất bao nhiêu tiền mỗi năm, và nên xử lý nguyên nhân nào trước?",
    hyps:["Tổng số chuyến và tỷ lệ chậm quyết định quy mô chi phí","Chi phí mỗi chuyến chậm đủ lớn để thành vấn đề lợi nhuận",
          "Phần lớn chậm chuyến là dây chuyền từ chuyến trước chứ không phải thời tiết hay kỹ thuật","Thời gian quay đầu kế hoạch ngắn hơn thực tế nên lịch bay tự tạo ra chậm"],
    evidence:"Ex.1: 60 máy bay × 5 chuyến × 365 ngày = 109.500 chuyến mỗi năm, 25% chậm là 27.375 chuyến, × 40 triệu = 1.095 tỷ chi phí mỗi năm. H1, H2 đúng. Ex.2: 56% số chuyến chậm là dây chuyền từ chuyến trước, trong khi thời tiết chỉ 18% nên giả thuyết nguyên nhân khách quan bị bác bỏ, H3 đúng. Ex.3: quay đầu thực tế 34 phút so với kế hoạch 25 phút, lệch 9 phút, và ba sân bay nghẽn chiếm 61% chuyến — H4 đúng, nên tăng thời gian đệm quay đầu ở ba sân bay nghẽn và tách lịch để cắt dây chuyền.",
    rec:"B"},
  mistakes:{
    logicLesson:"i-profit-3",
    calc:{label:"chi phí chậm chuyến mỗi năm", lesson:"i-profit-2",
      good:"60 × 5 × 365 = 109.500 chuyến; 25% = 27.375 chuyến chậm × 40 triệu = 1.095 tỷ/năm",
      why:"Phải quy tỷ lệ chậm thành tiền mỗi năm thì CEO mới so được với các khoản khác."},
    framework:{lesson:"i-profit-1",
      good:"Bốn nhánh: số chuyến · tỷ lệ chậm và chi phí mỗi chuyến · nguyên nhân dây chuyền · nguyên nhân bên ngoài",
      why:"Không tách dây chuyền khỏi nguyên nhân độc lập thì không biết sửa lịch hay sửa kỹ thuật."},
    exhibit:{lesson:"i-chart-1", bad:"Không nối tỷ lệ dây chuyền với chênh lệch thời gian quay đầu",
      good:"Ex.2: 56% là dây chuyền; Ex.3: quay đầu thực tế 34 phút so với kế hoạch 25 phút",
      why:"Lịch bay đặt quay đầu ngắn hơn thực tế chính là cỗ máy tạo ra dây chuyền chậm."}
  },
  goodFeedback:"Quy tỷ lệ chậm thành tiền, tách nguyên nhân dây chuyền và sửa đúng ở lịch bay của các sân bay nghẽn."
});

/* ─────────── iv-20 · Market Entry · khách sạn bình dân vào Phnom Penh ─────────── */
R({
  id:"iv-20", title:"Market entry: chuỗi khách sạn bình dân vào Phnom Penh",
  brief:{context:"Người phỏng vấn: \"Một chuỗi khách sạn bình dân Việt Nam muốn mở tại Phnom Penh. Bạn dẫn case: có nên vào và vào bằng mô hình nào?\"",
         task:"ước lượng thị trường phòng bình dân, dựng kinh tế một khách sạn và chọn mô hình vào."},
  labels:{problem:"1 · Nhắc lại đề bằng một câu", hyps:"2 · Cấu trúc bạn tự dẫn", evidence:"3 · Phân tích và con số"},
  exhibits:[
    {kind:"table", title:"Giả định thị trường", unit:"",
     head:["Giả định","Giá trị","Ghi chú"],
     rows:[["Lượt khách lưu trú Phnom Penh","2 triệu/năm",""],["Tỷ trọng phân khúc bình dân","30%",""],
           ["Số đêm lưu trú trung bình","2",""],["Giá phòng bình dân","40 USD/đêm",""]]},
    {kind:"bars", title:"Cung phòng theo phân khúc", unit:"% số phòng",
     headline:"Phân khúc bình dân chủ yếu là khách sạn gia đình", sub:"Phòng đang hoạt động",
     rows:[["Khách sạn gia đình nhỏ",62,"var(--series-focus)"],["Chuỗi khu vực",23,"var(--series-base)"],["Chuỗi quốc tế",15,"var(--series-base)"]],
     max:70, ticks:[0,17.5,35,52.5,70]},
    {kind:"metrics", title:"Kinh tế một khách sạn dự kiến",
     items:[["Số phòng mỗi khách sạn","80",""],["Công suất phòng dự kiến","65%",""],["Biên EBITDA","30%",""],
            ["Vốn nếu thuê toà nhà và cải tạo","1,5 triệu USD","mua đất và xây tốn gấp bốn lần"]]}
  ],
  options:[
    ["A","Mua đất và xây khách sạn đầu tiên","Vốn gấp bốn lần phương án thuê, kéo hoàn vốn lên ngoài tầm chấp nhận cho thị trường chưa kiểm chứng.",30],
    ["B","Thuê toà nhà sẵn có để cải tạo thành khách sạn đầu tiên, đo công suất thực một năm rồi mới nhân rộng hoặc chuyển sang nhận quản lý khách sạn gia đình","Thị trường 48 triệu USD mỗi năm với 62% cung là khách sạn gia đình; thuê giữ vốn ở 1,5 triệu USD và hoàn vốn 6,6 năm, đồng thời mở đường sang mô hình nhận quản lý.",95],
    ["C","Không vào vì cung phòng đã nhiều","Cung phân mảnh với 62% là khách sạn gia đình chính là khoảng trống cho một chuỗi có chuẩn dịch vụ.",40],
    ["D","Nhượng quyền thương hiệu ngay từ đầu","Chưa có khách sạn nào chạy ở thị trường này thì chưa có gì để nhượng quyền.",35]
  ],
  correct:"B",
  framing:[["khách sạn","phnom penh"],["vào thị trường","mô hình","có nên"]],
  branches:[["quy mô","lượt khách","thị trường"],["cung phòng","cạnh tranh","phân mảnh"],["công suất","ebitda","hoàn vốn"],["mô hình vào","thuê","nhận quản lý"]],
  numbers:[{v:6.6,tol:0.1,pts:30,core:true},{v:48,tol:0.5,pts:25},{v:600000,tol:500,pts:20},{v:0.228,tol:0.005,pts:15}],
  insight:[{kw:["phân mảnh","khách sạn gia đình"],pts:40},{kw:["thuê toà nhà","giữ vốn"],pts:35},{kw:["nhận quản lý","nhân rộng"],pts:25}],
  unit:"usd|%|năm|triệu",
  model:{
    problem:"Chuỗi khách sạn bình dân có nên vào Phnom Penh không, và nên vào bằng mô hình nào để không chôn vốn?",
    hyps:["Thị trường phòng bình dân đủ lớn để nuôi một chuỗi mới","Cung hiện tại phân mảnh nên còn chỗ cho chuẩn dịch vụ",
          "Kinh tế một khách sạn quyết định hoàn vốn có chấp nhận được không","Mô hình vào nên giữ vốn thấp cho tới khi đo được công suất thực"],
    evidence:"Ex.1: 2 triệu lượt khách × 30% phân khúc bình dân = 600.000 lượt, × 2 đêm × 40 USD = 48 triệu USD mỗi năm. Ex.2: 62% cung là khách sạn gia đình nhỏ nên H1, H2 đúng. Ex.3: 80 phòng × 365 × 65% × 40 USD = 0,76 triệu USD doanh thu, EBITDA 30% là 0,228 triệu USD, vốn thuê và cải tạo 1,5 triệu USD nên hoàn vốn 6,6 năm; phương án mua đất và xây tốn gấp bốn lần nên bị bác bỏ. H3, H4 đúng: thuê toà nhà cho khách sạn đầu tiên, đo công suất thực một năm rồi mới nhân rộng hoặc chuyển sang nhận quản lý khách sạn gia đình sẵn có.",
    rec:"B"},
  mistakes:{
    logicLesson:"i-entry-3",
    calc:{label:"quy mô thị trường và hoàn vốn một khách sạn", lesson:"i-entry-1",
      good:"600.000 lượt × 2 đêm × 40 USD = 48 triệu USD/năm; khách sạn 0,76 triệu USD doanh thu, EBITDA 0,228 → 1,5 ÷ 0,228 = 6,6 năm",
      why:"Case thâm nhập cần cả con số thị trường lẫn con số hoàn vốn mới ra quyết định."},
    framework:{lesson:"i-entry-2",
      good:"Bốn nhánh: quy mô thị trường · cấu trúc cung · kinh tế một khách sạn · mô hình vào",
      why:"Nhánh mô hình vào là chỗ biến phân tích thành khuyến nghị dùng được."},
    exhibit:{lesson:"f-moat-3", bad:"Không dùng mức phân mảnh của cung để tìm khoảng trống",
      good:"Ex.2: 62% cung là khách sạn gia đình nhỏ, chuỗi khu vực mới 23%",
      why:"Thị trường phân mảnh là nơi một chuỗi có chuẩn dịch vụ thắng được."}
  },
  goodFeedback:"Ước lượng thị trường theo lượt và đêm, rồi chọn mô hình vào giữ vốn thấp cho tới khi có dữ liệu thật."
});

})(window.SCORING.register);
