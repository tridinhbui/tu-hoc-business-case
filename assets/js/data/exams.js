/* ===== BÀI KIỂM TRA CUỐI LỘ TRÌNH =====
   Câu hỏi hoàn toàn mới, không lặp lại bài tập trong lesson.
   Mỗi câu gắn thẻ module để chấm điểm theo từng chương. */
window.EXAMS = [

{ track:"foundations", minutes:20, pass:70,
  title:"Foundations Final", vi:"Bài kiểm tra Nền tảng",
  intro:"Mười câu tổng hợp từ năm module. Không có phản hồi giữa chừng — trả lời hết rồi mới xem kết quả, đúng như một bài kiểm tra thật.",
  questions:[
   { module:"m-pnl", kind:"calc", question:"Doanh thu 900 triệu/tháng, chi phí biến đổi bằng 55% doanh thu, chi phí cố định 300 triệu. Lợi nhuận là bao nhiêu triệu?",
     unit:"triệu VND", answer:105, tol:8,
     working:[{k:"Biên đóng góp",v:"900 × 45% = 405 triệu"},{k:"Chi phí cố định",v:"300 triệu"},{k:"Lợi nhuận",v:"105 triệu"}],
     why:"Biên đóng góp là 45% chứ không phải 55% — đây là chỗ dễ nhầm khi đọc nhanh đề bài." },

   { module:"m-pnl", kind:"mcq", question:"Doanh nghiệp có doanh thu tăng 22% nhưng lợi nhuận giảm 15%. Giải thích nào KHÔNG hợp lý?",
     options:[
      {t:"Chi phí cố định tăng nhanh hơn doanh thu",ok:false,why:"Hoàn toàn hợp lý — đây là nguyên nhân phổ biến nhất."},
      {t:"Cơ cấu sản phẩm dịch chuyển sang dòng biên thấp hơn",ok:false,why:"Hợp lý — mix xấu đi làm biên giảm dù doanh thu tăng."},
      {t:"Doanh nghiệp mở thêm nhiều đơn vị chưa đạt điểm hoà vốn",ok:false,why:"Hợp lý — đây chính là mẫu hình của case chuỗi cà phê."},
      {t:"Chi phí biến đổi trên mỗi đơn vị giảm",ok:true,why:"Chi phí biến đổi giảm sẽ làm biên TĂNG, không giảm. Đây là lựa chọn không giải thích được hiện tượng."}]},

   { module:"m-unit", kind:"calc", question:"Chi phí lấy một khách hàng là 500.000đ. Mỗi khách mua 8 lần trọn đời với biên đóng góp 80.000đ mỗi lần. Tỷ lệ LTV/CAC là bao nhiêu?",
     unit:"lần", answer:1.28, tol:0.1,
     working:[{k:"LTV",v:"80.000 × 8 = 640.000đ"},{k:"CAC",v:"500.000đ"},{k:"LTV/CAC",v:"640 ÷ 500 = 1,28"}],
     why:"1,28 nằm dưới ngưỡng 3 thường được coi là lành mạnh. Doanh nghiệp này chưa nên tăng ngân sách marketing." },

   { module:"m-unit", kind:"mcq", question:"Chuỗi báo cáo doanh thu +30%, số cửa hàng +38%. Điều gì gần như chắc chắn đúng?",
     options:[
      {t:"Doanh thu trung bình mỗi cửa hàng đã giảm",ok:true,why:"Số cửa hàng tăng nhanh hơn doanh thu nghĩa là mỗi cửa hàng đóng góp ít hơn trước — có thể do cửa hàng mới chưa chín hoặc do tự ăn doanh thu."},
      {t:"Chuỗi đang hoạt động hiệu quả hơn",ok:false,why:"Ngược lại — hiệu quả trên mỗi đơn vị đang giảm."},
      {t:"Biên lợi nhuận đã cải thiện",ok:false,why:"Không suy ra được, và xu hướng còn gợi ý điều ngược lại."},
      {t:"Same-store sales đang tăng mạnh",ok:false,why:"Không suy ra được từ dữ liệu này."}]},

   { module:"m-cost", kind:"calc", question:"Khách sạn 120 phòng, giá phòng 1,2 triệu/đêm. Nếu tỷ lệ lấp đầy tăng từ 55% lên 70%, doanh thu mỗi đêm tăng bao nhiêu triệu?",
     unit:"triệu VND", answer:21.6, tol:1.5,
     working:[{k:"Số phòng tăng thêm",v:"120 × 15% = 18 phòng"},{k:"Giá phòng",v:"1,2 triệu"},{k:"Doanh thu tăng thêm",v:"21,6 triệu/đêm"}],
     why:"Gần như toàn bộ 21,6 triệu này là lợi nhuận đóng góp, vì chi phí cố định của khách sạn không đổi khi thêm khách." },

   { module:"m-cost", kind:"multi", need:2, question:"Doanh nghiệp dịch vụ đang lỗ và dưới công suất. Hai khoản nào KHÔNG nên cắt trước?",
     options:[
      {t:"Nhân sự chuyên môn tạo ra chất lượng dịch vụ",ok:true,why:"Đây chính là lý do khách đến. Cắt là cắt vào nguồn doanh thu."},
      {t:"Chi phí bảo trì thiết bị phục vụ khách",ok:true,why:"Tiết kiệm ngay nhưng cái giá đến muộn dưới dạng sự cố và trải nghiệm xấu."},
      {t:"Thuê văn phòng trụ sở hạng A",ok:false,why:"Khách hàng không nhìn thấy trụ sở — cắt được mà không ảnh hưởng doanh thu."},
      {t:"Quà tặng đối tác cuối năm",ok:false,why:"Ít liên quan tới năng lực tạo doanh thu."},
      {t:"Số lượng cuộc họp nội bộ",ok:false,why:"Không phải khoản chi tạo doanh thu."}]},

   { module:"m-growth", kind:"calc", question:"Giá bán 100.000đ, chi phí biến đổi 75.000đ. Nếu giảm giá 8%, biên đóng góp giảm bao nhiêu phần trăm?",
     unit:"%", answer:32, tol:2.5,
     working:[{k:"Biên trước",v:"100 − 75 = 25 nghìn"},{k:"Giảm giá 8%",v:"8 nghìn"},{k:"Biên sau",v:"25 − 8 = 17 nghìn"},{k:"Mức giảm biên",v:"8 ÷ 25 = 32%"}],
     why:"Giảm giá 8% làm biên giảm 32% — gấp bốn lần, vì biên chỉ chiếm 25% giá bán. Biên càng mỏng, giảm giá càng nguy hiểm." },

   { module:"m-growth", kind:"mcq", question:"Doanh nghiệp dẫn đầu thị trường bão hoà muốn tăng trưởng hai chữ số. Hướng nào nên xét TRƯỚC?",
     options:[
      {t:"Bán thêm sản phẩm mới cho chính khách hàng hiện tại",ok:true,why:"Tận dụng được kênh phân phối và quan hệ đã có — chi phí thấp nhất và lợi thế cạnh tranh vẫn còn hiệu lực."},
      {t:"Mở rộng sang thị trường nước ngoài",ok:false,why:"Ở thị trường mới, lợi thế phân phối tại sân nhà không chuyển giao được."},
      {t:"Giảm giá để giành thêm thị phần",ok:false,why:"Ở thị phần cao, giảm giá áp lên toàn bộ sản lượng để giành phần rất nhỏ."},
      {t:"Đa dạng hoá sang ngành không liên quan",ok:false,why:"Không có lợi thế nào chuyển giao được — rủi ro cao nhất."}]},

   { module:"m-read", kind:"calc", question:"Lợi nhuận sau thuế 400 tỷ, khấu hao 120 tỷ, hàng tồn kho tăng 260 tỷ, phải thu tăng 90 tỷ, phải trả tăng 50 tỷ. Dòng tiền hoạt động là bao nhiêu tỷ?",
     unit:"tỷ VND", answer:220, tol:15,
     working:[{k:"Lợi nhuận",v:"+400"},{k:"Khấu hao",v:"+120"},{k:"Tồn kho tăng",v:"−260"},{k:"Phải thu tăng",v:"−90"},{k:"Phải trả tăng",v:"+50"},{k:"Dòng tiền hoạt động",v:"+220 tỷ"}],
     why:"Tỷ lệ chuyển đổi 55% — chấp nhận được với doanh nghiệp đang tăng trưởng, nhưng cần theo dõi nếu kéo dài nhiều kỳ." },

   { module:"m-read", kind:"multi", need:3, question:"Ba dấu hiệu nào cùng lúc đáng lo nhất khi đọc báo cáo tài chính?",
     options:[
      {t:"Phải thu khách hàng tăng nhanh gấp nhiều lần doanh thu",ok:true,why:"Doanh thu ghi nhận nhưng tiền chưa về — chất lượng doanh thu xấu đi."},
      {t:"Dòng tiền hoạt động âm trong khi vẫn báo lãi",ok:true,why:"Lợi nhuận trên giấy không chuyển thành tiền thật."},
      {t:"Phần lớn doanh thu đến từ công ty cùng tập đoàn",ok:true,why:"Tăng trưởng không chứng minh được nhu cầu thị trường bên ngoài."},
      {t:"Doanh nghiệp đầu tư xây nhà máy mới",ok:false,why:"Làm dòng tiền đầu tư âm nhưng là bình thường với doanh nghiệp mở rộng."},
      {t:"Biên lợi nhuận thấp hơn trung bình ngành",ok:false,why:"Có thể là lựa chọn chiến lược giá thấp."},
      {t:"Doanh nghiệp giữ lại lợi nhuận thay vì trả cổ tức",ok:false,why:"Hợp lý với doanh nghiệp đang tăng trưởng."}]}
  ]},

{ track:"cracking", minutes:22, pass:70,
  title:"Case Cracking Final", vi:"Bài kiểm tra Kỹ thuật giải case",
  intro:"Mười câu về cấu trúc, giả thuyết, tính toán và trình bày. Đây là những thứ bạn sẽ dùng trong 20 phút đầu của một buổi phỏng vấn thật.",
  questions:[
   { module:"m-mece", kind:"mcq", question:"Cách chia nào sau đây vi phạm MECE?",
     options:[
      {t:"Khách hàng: doanh nghiệp lớn, doanh nghiệp vừa, khách hàng thân thiết",ok:true,why:"Khách hàng thân thiết cắt ngang hai nhóm kia — một doanh nghiệp lớn hoàn toàn có thể là khách thân thiết."},
      {t:"Chi phí: cố định và biến đổi",ok:false,why:"Chia nhị phân, luôn MECE."},
      {t:"Doanh thu = số khách × giá trị đơn hàng",ok:false,why:"Phép nhân, không thể chồng lấn."},
      {t:"Khách hàng: mới trong kỳ và đã có từ trước",ok:false,why:"Chia nhị phân theo thời điểm, MECE."}]},

   { module:"m-mece", kind:"mcq", question:"Câu hỏi 'có nên mua lại đối thủ này không' nên bắt đầu bằng cây nào?",
     options:[
      {t:"Cây giá trị thương vụ: lợi ích thu được so với giá phải trả và rủi ro thực thi",ok:true,why:"Đây là câu hỏi đầu tư — cấu trúc phải xoay quanh giá trị tạo ra so với chi phí bỏ ra."},
      {t:"Cây lợi nhuận",ok:false,why:"Phù hợp khi câu hỏi là vì sao lợi nhuận thay đổi, không phải quyết định mua bán."},
      {t:"Cây phễu",ok:false,why:"Dùng cho câu hỏi về hành vi khách hàng theo chuỗi bước."},
      {t:"Cây nội bộ và bên ngoài",ok:false,why:"Dùng để chẩn đoán nguyên nhân một chỉ số xấu đi."}]},

   { module:"m-hypo", kind:"mcq", question:"Phát biểu nào là một giả thuyết kiểm chứng được?",
     options:[
      {t:"Biên lợi nhuận giảm vì tỷ trọng đơn hàng qua app giao đồ ăn tăng gấp đôi",ok:true,why:"Cụ thể, có dữ liệu kiểm chứng được, và nếu đúng thì dẫn thẳng tới hành động về chính sách kênh."},
      {t:"Cần nghiên cứu sâu hơn về cấu trúc chi phí",ok:false,why:"Là một việc phải làm, không phải một khẳng định có thể sai."},
      {t:"Thị trường đang cạnh tranh gay gắt",ok:false,why:"Đúng ở mọi thị trường mọi thời điểm — không bác bỏ được."},
      {t:"Doanh nghiệp cần cải thiện hiệu quả vận hành",ok:false,why:"Là một khuyến nghị mơ hồ, không phải giả thuyết."}]},

   { module:"m-hypo", kind:"multi", need:2, question:"Trước khi mở dữ liệu để kiểm chứng một giả thuyết, hai việc nào nên làm?",
     options:[
      {t:"Viết ra con số nào sẽ khiến bạn kết luận giả thuyết sai",ok:true,why:"Khoá tiêu chí khi bạn còn khách quan, tránh tự thuyết phục sau khi thấy kết quả."},
      {t:"Chọn dữ liệu mà kết quả của nó thay đổi được kết luận",ok:true,why:"Dữ liệu không phân biệt được hai khả năng thì không đáng xem."},
      {t:"Thu thập càng nhiều dữ liệu càng tốt",ok:false,why:"Không có hướng thì nhiều dữ liệu chỉ làm chậm thêm."},
      {t:"Hỏi ý kiến người có kinh nghiệm để xác nhận",ok:false,why:"Ý kiến không phải bằng chứng, và dễ dẫn tới bẫy tự xác nhận."},
      {t:"Chuẩn bị sẵn cách giải thích nếu dữ liệu không ủng hộ",ok:false,why:"Đây chính là biện hộ trước, ngược với tinh thần kiểm chứng."}]},

   { module:"m-math", kind:"calc", question:"Tính nhanh: 12% của 850.",
     unit:"", answer:102, tol:3,
     working:[{k:"10% của 850",v:"85"},{k:"2% của 850",v:"17"},{k:"Cộng lại",v:"102"}],
     why:"Chia nhỏ phần trăm thành 10% + 2% cho phép tính trong đầu mà không cần máy tính." },

   { module:"m-math", kind:"calc", question:"Một chỉ số giảm 15% rồi sau đó tăng 15%. So với ban đầu, nó ở mức bao nhiêu phần trăm?",
     unit:"%", answer:97.75, tol:1,
     working:[{k:"Sau khi giảm 15%",v:"100 → 85"},{k:"Tăng 15% của 85",v:"+12,75"},{k:"Kết quả",v:"97,75"}],
     why:"Không quay về 100 vì phần tăng tính trên nền đã thấp hơn. Phần trăm phải nhân với nhau, không cộng trừ." },

   { module:"m-sizing", kind:"calc", question:"27 triệu hộ gia đình, 30% có sử dụng sản phẩm, chi trung bình 200.000đ mỗi tháng. Quy mô thị trường là bao nhiêu nghìn tỷ mỗi năm?",
     unit:"nghìn tỷ", answer:19.4, tol:1.5,
     working:[{k:"Số hộ sử dụng",v:"27 triệu × 30% = 8,1 triệu"},{k:"Chi mỗi năm",v:"200.000 × 12 = 2,4 triệu"},{k:"Quy mô",v:"8,1 triệu × 2,4 triệu ≈ 19,4 nghìn tỷ"}],
     why:"Nên trình bày là 'khoảng 18-20 nghìn tỷ' và nêu rõ giả định nhạy nhất là tỷ lệ 30%." },

   { module:"m-sizing", kind:"mcq", question:"Ước lượng dựa trên bốn giả định. Giả định nào cần kiểm chứng đầu tiên?",
     options:[
      {t:"Giả định mà bạn ít chắc chắn nhất và làm kết quả thay đổi mạnh nhất",ok:true,why:"Hai tiêu chí phải đi cùng nhau — một giả định không chắc nhưng ít ảnh hưởng thì không đáng tranh luận."},
      {t:"Giả định có con số lớn nhất",ok:false,why:"Độ lớn tuyệt đối không quyết định độ nhạy."},
      {t:"Giả định xuất hiện đầu tiên trong phép tính",ok:false,why:"Vị trí không liên quan tới tầm quan trọng."},
      {t:"Giả định khó giải thích nhất cho người nghe",ok:false,why:"Độ phức tạp không phải tiêu chí."}]},

   { module:"m-synth", kind:"multi", need:2, question:"Hai đặc điểm nào làm một kết luận đủ tốt để mở đầu buổi trình bày?",
     options:[
      {t:"Nó là một quyết định cụ thể có thể hành động",ok:true,why:"Người nghe cần biết phải làm gì, không cần biết tình hình phức tạp ra sao."},
      {t:"Nó đứng được một mình nếu cuộc họp bị cắt sau 20 giây",ok:true,why:"Câu đầu tiên phải mang đủ giá trị mà không cần phần sau."},
      {t:"Nó liệt kê đủ mọi yếu tố đã cân nhắc",ok:false,why:"Đó là phần thân bài, không phải kết luận."},
      {t:"Nó tránh cam kết để giữ an toàn",ok:false,why:"Kết luận không cam kết là kết luận vô dụng."},
      {t:"Nó kể lại phương pháp phân tích đã dùng",ok:false,why:"Quá trình là thứ bị cắt đầu tiên."}]},

   { module:"m-comm", kind:"mcq", question:"Bạn trình bày cho giám đốc điều hành và phát hiện một giả định yếu trong phân tích. Nên làm gì?",
     options:[
      {t:"Nêu ngắn gọn giả định đó và ngưỡng làm kết luận đổi chiều",ok:true,why:"Đơn giản hoá là bỏ bớt chi tiết phương pháp, không phải bỏ rủi ro. Người ra quyết định cần biết kết luận có thể sai theo hướng nào."},
      {t:"Bỏ qua vì họ không có thời gian cho chi tiết",ok:false,why:"Đây là che giấu, và người chịu hậu quả là chính họ."},
      {t:"Trình bày toàn bộ phương pháp để họ tự đánh giá",ok:false,why:"Sai độ sâu cho đối tượng này."},
      {t:"Chỉ nêu nếu được hỏi",ok:false,why:"Rủi ro không nên phụ thuộc vào việc người nghe có nghĩ ra câu hỏi đúng hay không."}]}
  ]},

{ track:"vietnam", minutes:22, pass:70,
  title:"Vietnam Business Final", vi:"Bài kiểm tra Doanh nghiệp Việt Nam",
  intro:"Mười câu về bán lẻ, ngân hàng, nền tảng số, bất động sản và cách đọc báo cáo doanh nghiệp niêm yết tại Việt Nam.",
  questions:[
   { module:"m-vnretail", kind:"mcq", question:"Vì sao độ phủ kênh truyền thống được coi là moat thật ở Việt Nam?",
     options:[
      {t:"Xây quan hệ với hàng trăm nghìn điểm bán mất nhiều năm và cần đội ngũ đông — tiền không mua được trong một hai năm",ok:true,why:"Rào cản nằm ở thời gian và tổ chức, không nằm ở vốn. Đó là định nghĩa của một moat bền."},
      {t:"Vì chi phí quảng cáo ở kênh này rẻ hơn",ok:false,why:"Quảng cáo gần như không quyết định gì ở kênh truyền thống."},
      {t:"Vì biên lợi nhuận ở kênh này cao hơn",ok:false,why:"Biên ở kênh truyền thống thường không cao hơn, và còn tốn chi phí phân phối."},
      {t:"Vì nhà nước hạn chế doanh nghiệp nước ngoài",ok:false,why:"Không phải nguyên nhân kinh tế của lợi thế này."}]},

   { module:"m-vnretail", kind:"calc", question:"Cửa hàng doanh thu 500 triệu/tháng, hàng tươi chiếm 40%. Nếu hao hụt giảm từ 6% xuống 3,5%, tiết kiệm bao nhiêu triệu mỗi tháng?",
     unit:"triệu VND", answer:5, tol:0.6,
     working:[{k:"Doanh thu hàng tươi",v:"500 × 40% = 200 triệu"},{k:"Mức giảm hao hụt",v:"2,5 điểm phần trăm"},{k:"Tiết kiệm",v:"200 × 2,5% = 5 triệu"}],
     why:"5 triệu mỗi cửa hàng mỗi tháng, nhân với hàng nghìn cửa hàng là hàng trăm tỷ mỗi năm — không tốn đồng vốn đầu tư nào." },

   { module:"m-vnbank", kind:"calc", question:"Ngân hàng có CASA 30% với lãi 0,5%, phần còn lại là tiền gửi kỳ hạn lãi 6%. Chi phí vốn bình quân là bao nhiêu phần trăm?",
     unit:"%", answer:4.35, tol:0.2,
     working:[{k:"Phần CASA",v:"0,30 × 0,5% = 0,15%"},{k:"Phần có kỳ hạn",v:"0,70 × 6% = 4,20%"},{k:"Chi phí vốn",v:"4,35%"}],
     why:"So với ngân hàng có CASA 40% (chi phí vốn khoảng 3,8%), chênh lệch hơn 0,5 điểm là lợi thế cấu trúc rất lớn trên quy mô hàng trăm nghìn tỷ." },

   { module:"m-vnbank", kind:"calc", question:"Dư nợ 250.000 tỷ, tỷ lệ nợ xấu tăng 0,6 điểm phần trăm, trích dự phòng 100% phần tăng thêm. Lợi nhuận giảm bao nhiêu tỷ?",
     unit:"tỷ VND", answer:1500, tol:100,
     working:[{k:"Dư nợ",v:"250.000 tỷ"},{k:"Mức tăng NPL",v:"0,6 điểm"},{k:"Dự phòng tăng thêm",v:"1.500 tỷ"}],
     why:"0,6 điểm phần trăm nghe rất nhỏ nhưng trên quy mô dư nợ lớn nó xoá đi hàng nghìn tỷ lợi nhuận. Tốc độ thay đổi NPL quan trọng hơn mức tuyệt đối." },

   { module:"m-vnplatform", kind:"mcq", question:"Ví điện tử tăng số người dùng gấp ba. Vì sao khoản lỗ có thể không giảm?",
     options:[
      {t:"Vì chi phí khuyến mãi là biến phí theo quy mô, còn take rate thanh toán thì quá mỏng",ok:true,why:"Khi chi phí lớn nhất tăng theo quy mô, tăng trưởng nhân khoản lỗ lên chứ không xoá nó."},
      {t:"Vì chi phí công nghệ tăng theo số người dùng",ok:false,why:"Chi phí hạ tầng có tăng nhưng nhỏ và giảm dần theo quy mô."},
      {t:"Vì ngân hàng thu phí cao hơn khi giao dịch nhiều",ok:false,why:"Phí xử lý thường giảm theo khối lượng, không tăng."},
      {t:"Vì người dùng mới ít giao dịch hơn",ok:false,why:"Có thể đúng nhưng không phải nguyên nhân cấu trúc của việc lỗ."}]},

   { module:"m-vnplatform", kind:"multi", need:2, question:"Hai tầng kiếm tiền nào có biên cao nhất cho một nền tảng có nhiều người dùng?",
     options:[
      {t:"Sản phẩm tài chính: tín dụng, bảo hiểm, đầu tư",ok:true,why:"Biên cao nhất, và dữ liệu giao dịch là lợi thế thật để chấm điểm tín dụng."},
      {t:"Quảng cáo và mini-app cho thương hiệu",ok:true,why:"Biên gần như thuần tuý vì tận dụng chính lượng người dùng đang có."},
      {t:"Phí thanh toán thu từ merchant",ok:false,why:"Take rate dưới 1% và còn phải chia lại cho ngân hàng."},
      {t:"Phí thuê bao thu từ người dùng",ok:false,why:"Người dùng chuyển sang ứng dụng miễn phí khác ngay lập tức."},
      {t:"Phí rút tiền về tài khoản ngân hàng",ok:false,why:"Nguồn thu nhỏ và làm giảm trải nghiệm."}]},

   { module:"m-vnproperty", kind:"calc", question:"Chủ đầu tư có nợ vay 8.000 tỷ với lãi suất bình quân 12%/năm. Chi phí lãi mỗi năm là bao nhiêu tỷ?",
     unit:"tỷ VND", answer:960, tol:50,
     working:[{k:"Nợ vay",v:"8.000 tỷ"},{k:"Lãi suất",v:"12%"},{k:"Chi phí lãi",v:"960 tỷ/năm"}],
     why:"Với biên gộp 35%, doanh nghiệp cần bán gần 2.750 tỷ doanh thu chỉ để trả lãi, trước khi có đồng lợi nhuận nào cho cổ đông." },

   { module:"m-vnproperty", kind:"multi", need:3, question:"Ba dấu hiệu nào cùng lúc cho thấy một chủ đầu tư đang tiến tới khủng hoảng thanh khoản?",
     options:[
      {t:"Dòng tiền hoạt động âm nhiều kỳ liên tiếp",ok:true,why:"Kinh doanh cốt lõi đang đốt tiền chứ không tạo tiền."},
      {t:"Dòng tiền tài chính dương nhờ liên tục vay mới",ok:true,why:"Doanh nghiệp sống bằng vốn vay — chỉ bền chừng nào thị trường vốn còn mở."},
      {t:"Hàng tồn kho dở dang phình lên nhanh hơn doanh thu",ok:true,why:"Tiền đã chi ra nằm kẹt trong dự án chưa bán được."},
      {t:"Lợi nhuận kế toán tăng đều",ok:false,why:"Đây chính là thứ che giấu mẫu hình, không phải dấu hiệu của nó."},
      {t:"Doanh nghiệp mở bán dự án mới",ok:false,why:"Mở bán tạo dòng tiền vào — dấu hiệu tốt."},
      {t:"Tổng tài sản tăng",ok:false,why:"Tài sản tăng không nói lên khả năng thanh toán."}]},

   { module:"m-vnread", kind:"mcq", question:"Tập đoàn sở hữu 55% một công ty con. Khi tính ROE cho cổ đông công ty mẹ, nên dùng dòng nào?",
     options:[
      {t:"Lợi nhuận sau thuế thuộc cổ đông công ty mẹ, sau khi trừ lợi ích cổ đông không kiểm soát",ok:true,why:"Phần lợi nhuận của công ty con thuộc về cổ đông khác không phải của bạn — dùng nhầm dòng làm ROE sai vài điểm phần trăm."},
      {t:"Lợi nhuận sau thuế hợp nhất",ok:false,why:"Bao gồm cả phần thuộc về cổ đông khác của công ty con."},
      {t:"Lợi nhuận gộp",ok:false,why:"Chưa trừ chi phí hoạt động, tài chính và thuế."},
      {t:"Doanh thu hợp nhất",ok:false,why:"Doanh thu không dùng để tính ROE."}]},

   { module:"m-vnread", kind:"multi", need:2, question:"Hai thuyết minh nào giúp phát hiện chất lượng doanh thu xấu đi?",
     options:[
      {t:"Chi tiết phải thu khách hàng theo tuổi nợ",ok:true,why:"Phải thu phình lên và nợ quá hạn tăng là dấu hiệu doanh thu ghi nhận mà tiền chưa về."},
      {t:"Giao dịch với bên liên quan",ok:true,why:"Cho biết bao nhiêu doanh thu đến từ công ty cùng hệ sinh thái thay vì từ thị trường."},
      {t:"Danh sách cổ đông lớn",ok:false,why:"Thuộc phần quản trị doanh nghiệp."},
      {t:"Thông tin về ban điều hành",ok:false,why:"Không liên quan tới chất lượng doanh thu."},
      {t:"Địa chỉ chi nhánh và nhà máy",ok:false,why:"Không mang thông tin ra quyết định."}]}
  ]}
];
window.EXAM_BY_TRACK = Object.fromEntries(window.EXAMS.map(e=>[e.track,e]));
