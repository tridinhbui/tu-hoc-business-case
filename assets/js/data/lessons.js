/* ===== TẦNG BÀI GIẢNG =====
   Track (lộ trình) → Module (chương) → Lesson (bài học) → Case (bài kiểm tra)
   Bài tập trong lesson dùng lại đúng mô hình chấm điểm của case: mcq | multi | calc */

window.TRACKS = [
 { id:"foundations", name:"Foundations", vi:"Nền tảng", order:1,
   for:"Người chưa có nền kinh doanh",
   promise:"Đọc được một bản báo cáo kết quả kinh doanh và giải được case Profitability đầu tiên.",
   modules:["m-pnl","m-unit","m-cost","m-growth","m-read"] },
 { id:"cracking", name:"Case Cracking", vi:"Kỹ thuật giải case", order:2,
   for:"Người chuẩn bị phỏng vấn consulting",
   promise:"Cấu trúc được vấn đề lạ trong 60 giây và bảo vệ được khuyến nghị.",
   modules:["m-mece","m-hypo","m-math","m-synth","m-sizing","m-comm"] },
 { id:"vietnam", name:"Vietnam Business", vi:"Doanh nghiệp Việt Nam", order:3,
   for:"Người muốn hiểu thị trường trong nước",
   promise:"Đọc được mô hình kinh doanh và rủi ro của một doanh nghiệp niêm yết Việt Nam.",
   modules:["m-vnretail","m-vnbank","m-vnplatform","m-vnproperty","m-vnread"] }
];

window.MODULES = [
 { id:"m-pnl", track:"foundations", order:1, status:"ready",
   name:"Reading a P&L", vi:"Đọc một bản báo cáo lãi lỗ",
   goal:"Hiểu vì sao doanh thu tăng mà lợi nhuận vẫn giảm — câu hỏi mở đầu của gần như mọi case Profitability.",
   lessons:["l-pnl-1","l-pnl-2","l-pnl-3","l-pnl-4"],
   case:"c-coffee-profit" },

 { id:"m-unit",  track:"foundations", order:2, status:"ready", name:"Unit Economics",  vi:"Kinh tế đơn vị",
   goal:"Tính lãi lỗ trên một khách hàng, một đơn hàng, một cửa hàng.", lessons:["l-unit-1","l-unit-2","l-unit-3","l-unit-4"], case:"c-mwg-turnaround" },
 { id:"m-cost",  track:"foundations", order:3, status:"ready", name:"Cost Structure",  vi:"Cấu trúc chi phí",
   goal:"Nhận ra chi phí nào cắt được, chi phí nào cắt là tự phá hoại.", lessons:["l-cost-1","l-cost-2","l-cost-3","l-cost-4"], case:"c-vinmec-capacity" },
 { id:"m-growth",track:"foundations", order:4, status:"ready", name:"Growth Levers",   vi:"Đòn bẩy tăng trưởng",
   goal:"Bốn hướng tăng trưởng và cách chọn hướng phù hợp với lợi thế đang có.", lessons:["l-growth-1","l-growth-2","l-growth-3","l-growth-4"], case:"c-vnm-growth" },
 { id:"m-read",  track:"foundations", order:5, status:"ready", name:"Reading a Company", vi:"Đọc một doanh nghiệp",
   goal:"Từ mô hình kinh doanh suy ra chỉ số cần theo dõi.", lessons:["l-read-1","l-read-2","l-read-3","l-read-4"], case:"c-fpt-margin" },

 { id:"m-mece",  track:"cracking", order:1, status:"ready", name:"MECE & Issue Trees", vi:"Cây vấn đề MECE", lessons:["l-mece-1","l-mece-2","l-mece-3","l-mece-4"], case:"c-tcb-nim", goal:"Chia vấn đề không chồng lấn, không bỏ sót." },
 { id:"m-hypo",  track:"cracking", order:2, status:"ready", name:"Hypothesis-led Thinking", vi:"Tư duy theo giả thuyết", lessons:["l-hypo-1","l-hypo-2","l-hypo-3","l-hypo-4"], case:"c-shopee-takerate", goal:"Đặt giả thuyết trước, tìm dữ liệu sau." },
 { id:"m-math",  track:"cracking", order:3, status:"ready", name:"Case Math", vi:"Tính nhẩm trong case", lessons:["l-math-1","l-math-2","l-math-3","l-math-4"], case:"c-vf-unit", goal:"Làm phép tính lớn nhanh mà không sai bậc độ lớn." },
 { id:"m-synth", track:"cracking", order:4, status:"ready", name:"Synthesis", vi:"Chốt kết luận", lessons:["l-synth-1","l-synth-2","l-synth-3","l-synth-4"], case:"c-vhm-cashflow", goal:"Nói câu trả lời trước, lý do sau." },
 { id:"m-sizing",track:"cracking", order:5, status:"ready", name:"Market Sizing", vi:"Ước lượng quy mô", lessons:["l-size-1","l-size-2","l-size-3","l-size-4"], case:"c-vnm-size", goal:"Ước lượng có cấu trúc khi không có dữ liệu." },
 { id:"m-comm",  track:"cracking", order:6, status:"ready", name:"Communication", vi:"Trình bày với lãnh đạo", lessons:["l-comm-1","l-comm-2","l-comm-3","l-comm-4"], case:"c-netflix-price", goal:"60 giây để thuyết phục một người bận rộn." },

 { id:"m-vnretail",  track:"vietnam", order:1, status:"ready", name:"Vietnam Retail", vi:"Bán lẻ Việt Nam", lessons:["l-vnr-1","l-vnr-2","l-vnr-3","l-vnr-4"], case:"c-msn-retail", goal:"Vì sao chuỗi minimart Việt Nam khó có lãi." },
 { id:"m-vnbank",    track:"vietnam", order:2, status:"ready", name:"Vietnam Banking", vi:"Ngân hàng Việt Nam", lessons:["l-vnb-1","l-vnb-2","l-vnb-3","l-vnb-4"], case:"c-tcb-nim", goal:"NIM, CASA và chi phí rủi ro tín dụng." },
 { id:"m-vnplatform",track:"vietnam", order:3, status:"ready", name:"Vietnam Platforms", vi:"Nền tảng số Việt Nam", lessons:["l-vnp-1","l-vnp-2","l-vnp-3","l-vnp-4"], case:"c-momo-monetize", goal:"Vì sao có 30 triệu người dùng vẫn chưa có lợi nhuận." },
 { id:"m-vnproperty",track:"vietnam", order:4, status:"ready", name:"Vietnam Property", vi:"Bất động sản Việt Nam", lessons:["l-vnpr-1","l-vnpr-2","l-vnpr-3","l-vnpr-4"], case:"c-vhm-cashflow", goal:"Lợi nhuận kế toán và dòng tiền lệch pha nhiều năm." },
 { id:"m-vnread",    track:"vietnam", order:5, status:"ready", name:"Reading VN Filings", vi:"Đọc báo cáo doanh nghiệp niêm yết", lessons:["l-vnf-1","l-vnf-2","l-vnf-3","l-vnf-4"], case:"c-fpt-margin", goal:"Ba trang đầu tiên cần đọc trong một báo cáo thường niên." }
];

window.LESSONS = [

/* ---------------- LESSON 1 ---------------- */
{ id:"l-pnl-1", module:"m-pnl", order:1, minutes:4, xp:60,
  title:"Revenue is not profit", vi:"Doanh thu không phải lợi nhuận",
  hook:{ q:"Một chuỗi cà phê tăng doanh thu 18% trong năm. Chủ chuỗi nên vui hay nên lo?",
         text:"Câu trả lời đúng là: chưa đủ dữ kiện để biết. Và chính chỗ 'chưa đủ dữ kiện' đó là nơi mọi case Profitability bắt đầu." },
  core:[
   { h:"Revenue", hVi:"Doanh thu",
     body:"Tổng số tiền khách trả cho bạn trong kỳ. Nó chỉ nói bạn bán được bao nhiêu, không nói bạn giữ lại được bao nhiêu.",
     example:{company:"highlands", text:"Một cửa hàng bán 200 ly/ngày × 60.000đ = 12 triệu doanh thu mỗi ngày. Chưa đồng nào trong số đó là của chủ quán."} },
   { h:"Cost", hVi:"Chi phí",
     body:"Tất cả những gì bạn phải trả để tạo ra doanh thu đó: nguyên liệu, lương, mặt bằng, điện nước, marketing.",
     note:"Chi phí không tự động tăng giảm cùng nhịp với doanh thu — đó là lý do bài học tiếp theo tồn tại." },
   { h:"Profit", hVi:"Lợi nhuận",
     body:"Phần còn lại sau khi trừ hết. Đây mới là con số quyết định doanh nghiệp sống hay chết.",
     note:"Công thức: Profit = Revenue − Cost. Đơn giản tới mức dễ bị coi thường, nhưng 90% sai lầm phân tích nằm ở việc quên mất vế thứ hai." },
   { h:"Margin", hVi:"Biên lợi nhuận",
     body:"Lợi nhuận tính theo phần trăm doanh thu. Margin cho phép so sánh hai doanh nghiệp có quy mô khác nhau.",
     note:"Doanh thu 1.000 tỷ với margin 5% kém hơn doanh thu 300 tỷ với margin 25% — về mặt lợi nhuận tuyệt đối là 50 tỷ so với 75 tỷ." }
  ],
  worked:{ title:"Hai cửa hàng, cùng doanh thu, khác số phận",
    steps:[
     {k:"Cửa hàng A — doanh thu",v:"600 triệu/tháng"},
     {k:"Cửa hàng A — chi phí",v:"510 triệu/tháng"},
     {k:"Cửa hàng A — lợi nhuận",v:"90 triệu · margin 15%",note:"khoẻ"},
     {k:"Cửa hàng B — doanh thu",v:"600 triệu/tháng"},
     {k:"Cửa hàng B — chi phí",v:"585 triệu/tháng",note:"thuê mặt bằng cao hơn 75 triệu"},
     {k:"Cửa hàng B — lợi nhuận",v:"15 triệu · margin 2,5%",note:"một tháng ế là lỗ"}],
    conclusion:"Cùng doanh thu, cùng ngành, cùng thương hiệu — nhưng một cửa hàng khoẻ và một cửa hàng đang treo. Nếu bạn chỉ nhìn doanh thu, hai cửa hàng này giống hệt nhau." },
  check:[
   { kind:"mcq", xp:20, question:"Doanh nghiệp X có doanh thu 500 tỷ, lợi nhuận 10 tỷ. Doanh nghiệp Y có doanh thu 120 tỷ, lợi nhuận 24 tỷ. Nhận định nào đúng?",
     options:[
      {t:"Y có biên lợi nhuận tốt hơn nhiều: 20% so với 2%",ok:true,why:"Y giữ lại 20% mỗi đồng doanh thu, X chỉ giữ 2%. Với cùng một đồng doanh thu tăng thêm, Y tạo ra nhiều lợi nhuận hơn gấp 10 lần."},
      {t:"X tốt hơn vì doanh thu lớn hơn 4 lần",ok:false,why:"Doanh thu lớn không có nghĩa là kiếm được nhiều tiền hơn. X chỉ lãi 10 tỷ trong khi Y lãi 24 tỷ."},
      {t:"Hai doanh nghiệp tương đương",ok:false,why:"Chênh lệch biên 2% so với 20% là chênh lệch một bậc độ lớn, không thể coi là tương đương."},
      {t:"Không so sánh được vì khác ngành",ok:false,why:"Đề bài không nói khác ngành. Và ngay cả khác ngành thì margin vẫn là chỉ số so sánh được."}]},
   { kind:"calc", xp:25, question:"Một cửa hàng có doanh thu 800 triệu/tháng và chi phí 680 triệu/tháng. Biên lợi nhuận là bao nhiêu phần trăm?",
     unit:"%", answer:15, tol:0.6, hint:"Lợi nhuận = doanh thu − chi phí. Rồi chia cho doanh thu.",
     working:[{k:"Lợi nhuận",v:"800 − 680 = 120 triệu"},{k:"Biên lợi nhuận",v:"120 ÷ 800 = 15%"}],
     why:"15% là mức lành mạnh với một cửa hàng F&B. Dưới 8% là mỏng, dưới 5% là một tháng vắng khách có thể đẩy cửa hàng vào lỗ." }
  ],
  recap:["Doanh thu nói bạn bán được bao nhiêu, lợi nhuận nói bạn giữ được bao nhiêu.",
         "Margin cho phép so sánh hai doanh nghiệp khác quy mô.",
         "Doanh thu tăng mà lợi nhuận giảm là chuyện hoàn toàn bình thường — và luôn có nguyên nhân nằm ở phía chi phí."],
  terms:[{en:"Revenue",vi:"Doanh thu",d:"Tổng tiền khách trả trong kỳ"},
         {en:"Profit",vi:"Lợi nhuận",d:"Doanh thu trừ chi phí"},
         {en:"Margin",vi:"Biên lợi nhuận",d:"Lợi nhuận chia doanh thu, tính theo %"}]
},

/* ---------------- LESSON 2 ---------------- */
{ id:"l-pnl-2", module:"m-pnl", order:2, minutes:5, xp:70,
  title:"Fixed vs variable cost", vi:"Chi phí cố định và chi phí biến đổi",
  hook:{ q:"Quán đóng cửa cả tháng vì sửa chữa. Khoản chi nào vẫn phải trả?",
         text:"Trả lời được câu này là bạn đã phân biệt được hai loại chi phí — và đây là ranh giới quan trọng nhất trong toàn bộ phân tích lợi nhuận." },
  core:[
   { h:"Variable cost", hVi:"Chi phí biến đổi",
     body:"Tăng giảm theo sản lượng. Bán thêm một ly cà phê thì tốn thêm cà phê, sữa, ly, nắp. Không bán ly nào thì không tốn đồng nào.",
     note:"Đặc điểm nhận dạng: nếu doanh thu về 0 thì khoản chi này cũng về gần 0." },
   { h:"Fixed cost", hVi:"Chi phí cố định",
     body:"Không đổi theo sản lượng trong ngắn hạn. Tiền thuê mặt bằng tháng này bằng tháng trước, bất kể bạn bán 10 ly hay 10.000 ly.",
     example:{company:"highlands", text:"Tiền thuê một mặt bằng góc phố có thể là 100 triệu/tháng. Ngày mưa vắng khách, tiền thuê vẫn chạy đủ 24 giờ."} },
   { h:"Vì sao ranh giới này quyết định mọi thứ", hVi:"",
     body:"Chi phí cố định tạo ra đòn bẩy: khi doanh thu tăng, nó được chia mỏng ra và lợi nhuận tăng nhanh hơn doanh thu. Nhưng khi doanh thu giảm, nó không giảm theo và kéo lợi nhuận xuống nhanh hơn nhiều.",
     note:"Đây là lý do các ngành nặng chi phí cố định — hàng không, khách sạn, bệnh viện, nhà máy — lãi rất đậm ở đỉnh chu kỳ và lỗ rất nặng ở đáy." },
   { h:"Bán cố định và bán biến đổi", hVi:"Semi-variable",
     body:"Nhiều khoản nằm giữa. Lương nhân viên có phần cố định (ca trực tối thiểu) và phần biến đổi (tăng ca giờ cao điểm). Điện có phần nền và phần theo lượng dùng.",
     note:"Khi phân tích, hãy xếp mỗi khoản vào nhóm mà nó nghiêng về nhiều hơn, đừng cố tìm sự chính xác tuyệt đối." }
  ],
  worked:{ title:"Phân loại chi phí một cửa hàng cà phê",
    steps:[
     {k:"Cà phê, sữa, đường, ly",v:"Biến đổi",note:"theo số ly bán"},
     {k:"Thuê mặt bằng",v:"Cố định",note:"khoản nguy hiểm nhất"},
     {k:"Lương quản lý cửa hàng",v:"Cố định"},
     {k:"Lương nhân viên part-time giờ cao điểm",v:"Biến đổi"},
     {k:"Chiết khấu app giao hàng 20%",v:"Biến đổi",note:"theo doanh thu app"},
     {k:"Khấu hao máy pha cà phê",v:"Cố định"},
     {k:"Điện, nước",v:"Bán biến đổi",note:"xếp vào cố định cho đơn giản"}],
    conclusion:"Ở một cửa hàng F&B điển hình, khoảng 35% doanh thu là chi phí biến đổi, còn lại phần lớn là cố định. Nghĩa là mỗi ly bán thêm đóng góp rất nhiều — và mỗi ngày vắng khách cũng tổn thất rất nhiều." },
  check:[
   { kind:"multi", xp:30, need:3, question:"Đâu là những chi phí CỐ ĐỊNH của một cửa hàng bán lẻ?",
     note:"Chọn 3. Nhớ phép thử: nếu doanh thu về 0, khoản này có về 0 không?",
     options:[
      {t:"Tiền thuê mặt bằng",ok:true,why:"Hợp đồng thuê phải trả đủ dù cửa hàng đóng cửa."},
      {t:"Lương quản lý cửa hàng",ok:true,why:"Quản lý vẫn nhận lương tháng bất kể bán được bao nhiêu."},
      {t:"Khấu hao thiết bị và nội thất",ok:true,why:"Tài sản mất giá theo thời gian, không theo sản lượng."},
      {t:"Giá vốn hàng bán",ok:false,why:"Bán bao nhiêu thì tốn bấy nhiêu — đây là chi phí biến đổi điển hình."},
      {t:"Phí giao hàng trả cho shipper",ok:false,why:"Có đơn mới có phí, không đơn không mất tiền."},
      {t:"Bao bì đóng gói",ok:false,why:"Tỷ lệ thuận với số đơn hàng."}]},
   { kind:"calc", xp:30, question:"Cửa hàng có chi phí cố định 250 triệu/tháng và chi phí biến đổi bằng 40% doanh thu. Nếu doanh thu là 500 triệu, tổng chi phí là bao nhiêu triệu?",
     unit:"triệu VND", answer:450, tol:10, hint:"Biến đổi = 40% × doanh thu. Rồi cộng phần cố định.",
     working:[{k:"Chi phí biến đổi",v:"500 × 40% = 200 triệu"},{k:"Chi phí cố định",v:"250 triệu"},{k:"Tổng chi phí",v:"450 triệu"},{k:"Lợi nhuận",v:"500 − 450 = 50 triệu"}],
     why:"Nếu doanh thu tăng lên 700 triệu, chi phí chỉ tăng lên 530 triệu (biến đổi 280 + cố định 250) và lợi nhuận nhảy từ 50 lên 170 triệu. Doanh thu tăng 40% nhưng lợi nhuận tăng 240% — đó chính là đòn bẩy của chi phí cố định." }
  ],
  recap:["Chi phí biến đổi đi theo sản lượng; chi phí cố định thì không.",
         "Chi phí cố định tạo đòn bẩy hai chiều: khuếch đại cả lãi lẫn lỗ.",
         "Phép thử nhanh: nếu doanh thu về 0, khoản chi này có về 0 không?"],
  terms:[{en:"Variable cost",vi:"Chi phí biến đổi",d:"Tăng giảm theo sản lượng"},
         {en:"Fixed cost",vi:"Chi phí cố định",d:"Không đổi theo sản lượng trong ngắn hạn"},
         {en:"Operating leverage",vi:"Đòn bẩy hoạt động",d:"Mức khuếch đại lợi nhuận do chi phí cố định gây ra"}]
},

/* ---------------- LESSON 3 ---------------- */
{ id:"l-pnl-3", module:"m-pnl", order:3, minutes:6, xp:80,
  title:"Contribution margin", vi:"Biên đóng góp",
  hook:{ q:"Bán thêm một ly cà phê giá 60.000đ thì chủ quán giàu thêm bao nhiêu?",
         text:"Không phải 60.000đ, cũng không phải phần lợi nhuận trung bình. Con số đúng gọi là contribution margin, và nó là công cụ sắc nhất trong phân tích lợi nhuận." },
  core:[
   { h:"Định nghĩa", hVi:"Biên đóng góp",
     body:"Giá bán trừ đi chi phí biến đổi của chính đơn vị đó. Đây là phần tiền còn lại để 'đóng góp' vào việc trả chi phí cố định — và khi cố định đã trả xong, phần đóng góp tiếp theo trở thành lợi nhuận thuần.",
     note:"Contribution margin = Giá bán − Chi phí biến đổi. Tính cho một ly, một đơn hàng, một chuyến bay, một chiếc xe." },
   { h:"Vì sao không dùng lợi nhuận trung bình", hVi:"",
     body:"Lợi nhuận trung bình đã bị phân bổ chi phí cố định vào. Nhưng khi bạn bán thêm một ly, tiền thuê mặt bằng không tăng thêm đồng nào. Dùng lợi nhuận trung bình để quyết định sẽ luôn đánh giá thấp giá trị của đơn hàng tăng thêm.",
     note:"Đây là sai lầm khiến nhiều doanh nghiệp từ chối những đơn hàng lẽ ra rất đáng nhận." },
   { h:"Ứng dụng 1 — có nên nhận đơn giá thấp không", hVi:"",
     body:"Nếu giá đơn hàng vẫn cao hơn chi phí biến đổi, đơn đó vẫn đóng góp vào chi phí cố định. Nhận vẫn tốt hơn từ chối — miễn là nó không làm hỏng giá bán của các đơn khác.",
     example:{company:"vietjet", text:"Vé phút chót bán rẻ vẫn có lợi: máy bay đã cất cánh, chi phí biến đổi thêm một khách gần như chỉ là suất ăn và một chút nhiên liệu."} },
   { h:"Ứng dụng 2 — sản phẩm nào đáng đẩy mạnh", hVi:"",
     body:"Không phải sản phẩm doanh thu cao nhất, mà là sản phẩm có tổng đóng góp cao nhất — biên đóng góp mỗi đơn vị nhân với số lượng bán được.",
     note:"Một món biên 70% nhưng bán 10 phần/ngày thua một món biên 40% bán 100 phần/ngày." }
  ],
  worked:{ title:"Một ly cà phê 60.000đ đóng góp bao nhiêu",
    steps:[
     {k:"Giá bán",v:"60.000đ"},
     {k:"Cà phê, sữa, đường",v:"−14.000đ"},
     {k:"Ly, nắp, ống hút",v:"−4.000đ"},
     {k:"Nhân công pha chế tính theo ly",v:"−3.000đ"},
     {k:"Tổng chi phí biến đổi",v:"21.000đ"},
     {k:"Contribution margin",v:"39.000đ · 65% giá bán",note:"phần đóng góp thật"},
     {k:"Nếu quán có chi phí cố định 78 triệu/tháng",v:"cần 2.000 ly/tháng để hoà vốn"}],
    conclusion:"Mỗi ly bán thêm đưa 39.000đ vào việc trả tiền thuê. Sau ly thứ 2.000, mỗi ly tiếp theo là 39.000đ lợi nhuận thuần — vì tiền thuê đã được trả xong rồi." },
  check:[
   { kind:"calc", xp:30, question:"Một món ăn bán 120.000đ, nguyên liệu 45.000đ, bao bì và phí biến đổi khác 15.000đ. Contribution margin của món này là bao nhiêu đồng?",
     unit:"đồng", answer:60000, tol:2000, hint:"Giá bán trừ toàn bộ chi phí biến đổi.",
     working:[{k:"Giá bán",v:"120.000đ"},{k:"Chi phí biến đổi",v:"45.000 + 15.000 = 60.000đ"},{k:"Contribution margin",v:"60.000đ · 50%"}],
     why:"Mỗi phần bán thêm đưa 60.000đ vào việc trả chi phí cố định. Con số này — không phải lợi nhuận trung bình — là thứ dùng để quyết định có nên đẩy mạnh món này không." },
   { kind:"mcq", xp:25, question:"Nhà hàng đang lỗ. Có khách đặt tiệc 50 suất với giá chỉ 90.000đ/suất, trong khi giá niêm yết là 120.000đ và chi phí biến đổi là 60.000đ/suất. Nên nhận không?",
     options:[
      {t:"Nên nhận: mỗi suất vẫn đóng góp 30.000đ vào chi phí cố định, tổng thêm 1,5 triệu",ok:true,why:"Giá 90.000đ vẫn cao hơn chi phí biến đổi 60.000đ. Từ chối đơn này nghĩa là mất trắng 1,5 triệu đóng góp trong khi tiền thuê vẫn phải trả."},
      {t:"Không nên: bán dưới giá niêm yết là lỗ",ok:false,why:"Nhầm lẫn phổ biến nhất. 90.000đ chỉ 'lỗ' nếu so với giá niêm yết, nhưng so với chi phí biến đổi thì vẫn lãi 30.000đ mỗi suất."},
      {t:"Không nên: nhà hàng đang lỗ nên phải cắt giảm chứ không nhận thêm việc",ok:false,why:"Đang lỗ càng cần đóng góp. Đây chính là lúc mỗi đồng contribution đều quý."},
      {t:"Chỉ nhận nếu giá đạt tối thiểu 120.000đ",ok:false,why:"Đặt sai ngưỡng. Ngưỡng thật là chi phí biến đổi 60.000đ, không phải giá niêm yết."}]}
  ],
  recap:["Contribution margin = giá bán − chi phí biến đổi của chính đơn vị đó.",
         "Dùng nó để quyết định về đơn hàng tăng thêm, đừng dùng lợi nhuận trung bình.",
         "Ngưỡng để nhận một đơn hàng là chi phí biến đổi, không phải giá niêm yết."],
  terms:[{en:"Contribution margin",vi:"Biên đóng góp",d:"Giá bán trừ chi phí biến đổi"},
         {en:"Marginal cost",vi:"Chi phí biên",d:"Chi phí để tạo thêm một đơn vị"},
         {en:"Incremental decision",vi:"Quyết định tăng thêm",d:"Chỉ xét phần thay đổi, bỏ qua phần đã cố định"}]
},

/* ---------------- LESSON 4 ---------------- */
{ id:"l-pnl-4", module:"m-pnl", order:4, minutes:6, xp:90,
  title:"Break-even point", vi:"Điểm hoà vốn",
  hook:{ q:"Cửa hàng cần bán bao nhiêu mỗi tháng thì không lỗ?",
         text:"Đây là con số mà mọi chủ doanh nghiệp phải thuộc lòng, và là con số mà phần lớn case Profitability xoay quanh." },
  core:[
   { h:"Công thức", hVi:"",
     body:"Điểm hoà vốn = Chi phí cố định ÷ Biên đóng góp. Nếu tính theo doanh thu thì chia cho biên đóng góp tính bằng phần trăm.",
     note:"Break-even (sản lượng) = Fixed cost ÷ Contribution margin mỗi đơn vị.\nBreak-even (doanh thu) = Fixed cost ÷ Contribution margin %." },
   { h:"Ý nghĩa thật của con số này", hVi:"",
     body:"Nó biến câu hỏi mơ hồ 'kinh doanh có ổn không' thành một mục tiêu đếm được: cần bao nhiêu khách mỗi ngày.",
     example:{company:"highlands", text:"Chi phí cố định 78 triệu/tháng chia cho biên đóng góp 39.000đ mỗi ly = 2.000 ly/tháng, tức khoảng 67 ly/ngày. Đó là con số quản lý cửa hàng cần nhớ."} },
   { h:"Margin of safety", hVi:"Biên an toàn",
     body:"Khoảng cách giữa mức bán thực tế và điểm hoà vốn. Biên an toàn càng mỏng, doanh nghiệp càng dễ tổn thương trước một tháng ế.",
     note:"Bán 80 ly/ngày với điểm hoà vốn 67 ly nghĩa là biên an toàn chỉ 16%. Một đợt mưa kéo dài là đủ để lỗ." },
   { h:"Hai cách hạ điểm hoà vốn", hVi:"",
     body:"Cách một: tăng biên đóng góp — tăng giá hoặc giảm chi phí biến đổi. Cách hai: giảm chi phí cố định — đàm phán lại tiền thuê, giảm ca trực thừa.",
     note:"Người mới luôn nghĩ tới việc bán nhiều hơn. Nhưng hạ ngưỡng hoà vốn thường nhanh hơn, rẻ hơn và chắc chắn hơn." }
  ],
  worked:{ title:"Điểm hoà vốn của một cửa hàng bách hoá",
    steps:[
     {k:"Thuê mặt bằng",v:"75 triệu/tháng"},
     {k:"Nhân sự 6 người",v:"90 triệu/tháng"},
     {k:"Điện, khấu hao thiết bị lạnh",v:"45 triệu/tháng"},
     {k:"Tổng chi phí cố định",v:"210 triệu/tháng"},
     {k:"Biên gộp (đóng góp)",v:"25% doanh thu"},
     {k:"Doanh thu hoà vốn",v:"210 ÷ 0,25 = 840 triệu/tháng"},
     {k:"Nếu doanh thu thực tế",v:"600 triệu → lỗ 60 triệu/tháng"}],
    conclusion:"Cửa hàng này cần tăng doanh thu thêm 40% để hoà vốn — hoặc hạ chi phí cố định xuống 150 triệu để ngưỡng hoà vốn rơi về 600 triệu. Cách thứ hai thường khả thi hơn." },
  check:[
   { kind:"calc", xp:35, question:"Chi phí cố định 180 triệu/tháng, biên đóng góp 30% doanh thu. Doanh thu hoà vốn là bao nhiêu triệu mỗi tháng?",
     unit:"triệu VND", answer:600, tol:15, hint:"Chi phí cố định chia cho biên đóng góp tính theo phần trăm.",
     working:[{k:"Chi phí cố định",v:"180 triệu"},{k:"Biên đóng góp",v:"30%"},{k:"Doanh thu hoà vốn",v:"180 ÷ 0,30 = 600 triệu"}],
     why:"Dưới 600 triệu là lỗ, trên 600 triệu thì mỗi đồng doanh thu thêm mang lại 30 xu lợi nhuận thuần." },
   { kind:"mcq", xp:25, question:"Cửa hàng đang bán 620 triệu/tháng với điểm hoà vốn 600 triệu. Chủ cửa hàng nên lo điều gì nhất?",
     options:[
      {t:"Biên an toàn chỉ hơn 3% — một tháng vắng khách là lỗ ngay",ok:true,why:"Khoảng cách 20 triệu trên 600 triệu là quá mỏng. Ưu tiên phải là hạ ngưỡng hoà vốn hoặc tăng doanh thu, không phải ăn mừng vì đang có lãi."},
      {t:"Không có gì đáng lo, cửa hàng đang có lãi",ok:false,why:"Có lãi và an toàn là hai chuyện khác nhau. Lãi 20 triệu với ngưỡng 600 triệu là trạng thái rất mong manh."},
      {t:"Cần mở thêm cửa hàng để tăng quy mô",ok:false,why:"Nhân bản một mô hình đang ở sát ngưỡng hoà vốn là nhân bản rủi ro."},
      {t:"Cần tăng giá bán 20%",ok:false,why:"Tăng giá mạnh có thể làm mất khách và đẩy doanh thu xuống dưới ngưỡng hoà vốn."}]},
   { kind:"multi", xp:30, need:2, question:"Cách nào HẠ được điểm hoà vốn của một cửa hàng?",
     note:"Chọn 2.",
     options:[
      {t:"Đàm phán lại tiền thuê mặt bằng",ok:true,why:"Giảm chi phí cố định thì tử số nhỏ đi, ngưỡng hoà vốn hạ xuống ngay."},
      {t:"Giảm chi phí nguyên liệu mỗi sản phẩm",ok:true,why:"Tăng biên đóng góp thì mẫu số lớn hơn, ngưỡng hoà vốn cũng hạ."},
      {t:"Tăng ngân sách marketing",ok:false,why:"Marketing thường là chi phí cố định — tăng nó là ĐẨY ngưỡng hoà vốn lên cao hơn, dù có thể tăng doanh thu."},
      {t:"Thuê thêm nhân viên để phục vụ nhanh hơn",ok:false,why:"Thêm chi phí cố định, ngưỡng hoà vốn tăng."},
      {t:"Mở thêm chi nhánh",ok:false,why:"Mỗi chi nhánh có ngưỡng hoà vốn riêng, không giúp chi nhánh hiện tại."}]}
  ],
  recap:["Điểm hoà vốn = chi phí cố định ÷ biên đóng góp.",
         "Biên an toàn mỏng nguy hiểm hơn là đang lỗ nhẹ nhưng biết rõ nguyên nhân.",
         "Hạ ngưỡng hoà vốn thường nhanh và chắc hơn là cố bán nhiều hơn."],
  terms:[{en:"Break-even point",vi:"Điểm hoà vốn",d:"Mức doanh thu vừa đủ bù hết chi phí"},
         {en:"Margin of safety",vi:"Biên an toàn",d:"Khoảng cách từ mức bán thực tế tới điểm hoà vốn"},
         {en:"Cost base",vi:"Nền chi phí",d:"Tổng chi phí cố định phải gánh mỗi kỳ"}]
}
];




/* ================= MODULE 2 · UNIT ECONOMICS ================= */
window.LESSONS = window.LESSONS.concat([

{ id:"l-unit-1", module:"m-unit", order:1, minutes:5, xp:70,
  title:"What is a unit?", vi:"Đơn vị phân tích là gì",
  hook:{ q:"Một chuỗi 1.700 cửa hàng đang lỗ. Bạn nhìn vào đâu trước?",
         text:"Không nhìn vào tổng lợi nhuận của chuỗi. Nhìn vào một cửa hàng. Nếu một cửa hàng không có lãi thì 1.700 cửa hàng chỉ nhân khoản lỗ lên 1.700 lần." },
  core:[
   { h:"Unit", hVi:"Đơn vị phân tích",
     body:"Là thứ nhỏ nhất mà doanh nghiệp nhân bản để lớn lên. Chọn đúng đơn vị là nửa lời giải của mọi bài toán lợi nhuận.",
     note:"Bán lẻ → một cửa hàng.\nHàng không → một chuyến bay.\nSaaS → một khách hàng.\nChuyển phát → một bưu kiện.\nSản xuất → một chiếc xe." },
   { h:"Vì sao phải xuống tới đơn vị", hVi:"",
     body:"Con số tổng luôn che giấu sự khác biệt bên trong. Một chuỗi có thể lỗ trong khi một phần tư cửa hàng của nó rất khoẻ — và cách chữa cho hai nhóm đó hoàn toàn khác nhau.",
     example:{company:"mwg", text:"Chuỗi bách hoá lỗ ở cấp công ty, nhưng nhóm 25% cửa hàng tốt nhất đạt 2,1 tỷ/tháng và có lãi. Vấn đề nằm ở nhóm đáy, không nằm ở mô hình."} },
   { h:"Kinh tế đơn vị", hVi:"Unit economics",
     body:"Là bảng lãi lỗ thu nhỏ của một đơn vị: doanh thu của nó, chi phí biến đổi của nó, phần chi phí cố định nó phải gánh.",
     note:"Nếu unit economics âm, tăng trưởng làm mọi thứ tệ hơn. Nếu dương, tăng trưởng mới là điều đáng làm." },
   { h:"Cạm bẫy phổ biến", hVi:"",
     body:"Quên phân bổ chi phí ở cấp cao hơn. Một cửa hàng có thể lãi khi chỉ tính tiền thuê và nhân sự, nhưng lỗ khi tính thêm chi phí kho vận, quản lý vùng và hệ thống công nghệ dùng chung.",
     note:"Luôn hỏi: còn khoản chi nào tồn tại chỉ vì đơn vị này tồn tại mà tôi chưa tính vào?" }
  ],
  worked:{ title:"Bảng lãi lỗ của một cửa hàng bách hoá",
    steps:[
     {k:"Doanh thu",v:"1.350 triệu/tháng"},
     {k:"Biên gộp 25%",v:"337,5 triệu",note:"phần còn lại sau giá vốn"},
     {k:"Thuê mặt bằng",v:"−75 triệu"},
     {k:"Nhân sự 6 người",v:"−90 triệu"},
     {k:"Điện, khấu hao thiết bị lạnh",v:"−45 triệu"},
     {k:"Kho vận & quản lý vùng phân bổ",v:"−40 triệu",note:"khoản hay bị quên"},
     {k:"Lợi nhuận cửa hàng",v:"+87,5 triệu/tháng"}],
    conclusion:"Cửa hàng này có lãi. Nếu doanh thu chỉ đạt 850 triệu thì biên gộp còn 212,5 triệu, không đủ bù 250 triệu chi phí cố định — lỗ 37,5 triệu mỗi tháng. Cùng một mô hình, hai số phận, khác nhau ở đúng một biến: doanh thu mỗi cửa hàng." },
  check:[
   { kind:"calc", xp:30, question:"Cửa hàng có doanh thu 1.200 triệu/tháng, biên gộp 25%, tổng chi phí cố định 250 triệu/tháng. Lợi nhuận cửa hàng là bao nhiêu triệu mỗi tháng?",
     unit:"triệu VND", answer:50, tol:5, hint:"Biên gộp trước, rồi trừ chi phí cố định.",
     working:[{k:"Biên gộp",v:"1.200 × 25% = 300 triệu"},{k:"Chi phí cố định",v:"250 triệu"},{k:"Lợi nhuận cửa hàng",v:"50 triệu"}],
     why:"Dương nhưng mỏng. Doanh thu chỉ cần rơi xuống 1.000 triệu là cửa hàng về đúng điểm hoà vốn — đó là lý do chuỗi bán lẻ theo dõi doanh thu mỗi cửa hàng theo tuần chứ không theo quý." },
   { kind:"mcq", xp:25, question:"Đơn vị phân tích phù hợp nhất cho một hãng hàng không giá rẻ là gì?",
     options:[
      {t:"Một chuyến bay",ok:true,why:"Hãng lớn lên bằng cách thêm chuyến bay. Mỗi chuyến có doanh thu riêng, chi phí nhiên liệu và phí sân bay riêng — tính được lãi lỗ độc lập."},
      {t:"Một hành khách",ok:false,why:"Hữu ích cho doanh thu phụ trợ, nhưng chi phí lớn nhất là chi phí chuyến bay, phát sinh dù có 100 hay 200 khách."},
      {t:"Một chiếc máy bay",ok:false,why:"Quá thô. Một máy bay bay nhiều chặng với hiệu quả rất khác nhau."},
      {t:"Một quý kinh doanh",ok:false,why:"Đó là kỳ báo cáo, không phải đơn vị mà doanh nghiệp nhân bản."}]}
  ],
  recap:["Đơn vị là thứ nhỏ nhất mà doanh nghiệp nhân bản để lớn lên.",
         "Con số tổng luôn che giấu sự khác biệt giữa các đơn vị bên trong.",
         "Unit economics âm thì tăng trưởng chỉ nhân khoản lỗ lên."],
  terms:[{en:"Unit economics",vi:"Kinh tế đơn vị",d:"Lãi lỗ tính trên một đơn vị nhân bản"},
         {en:"Allocated cost",vi:"Chi phí phân bổ",d:"Chi phí cấp trên chia xuống từng đơn vị"},
         {en:"Store P&L",vi:"Lãi lỗ cấp cửa hàng",d:"Bảng lãi lỗ thu nhỏ của một điểm bán"}]
},

{ id:"l-unit-2", module:"m-unit", order:2, minutes:6, xp:80,
  title:"CAC and LTV", vi:"Chi phí lấy khách và giá trị vòng đời",
  hook:{ q:"Một ví điện tử tặng 50.000đ cho mỗi người dùng mới. Đó là chi phí hay là khoản đầu tư?",
         text:"Phụ thuộc vào việc người dùng đó mang lại bao nhiêu tiền trong suốt thời gian họ ở lại. Hai con số cần so với nhau gọi là CAC và LTV." },
  core:[
   { h:"CAC", hVi:"Chi phí lấy một khách hàng",
     body:"Tổng chi phí marketing và khuyến mãi chia cho số khách hàng mới thật sự có được trong kỳ.",
     note:"Chia cho khách hàng MỚI, không chia cho tổng khách hàng. Đây là lỗi làm CAC trông đẹp hơn thực tế." },
   { h:"LTV", hVi:"Giá trị vòng đời khách hàng",
     body:"Tổng biên đóng góp mà một khách hàng mang lại trong suốt thời gian họ còn là khách hàng.",
     note:"LTV = Biên đóng góp mỗi giao dịch × Số giao dịch trọn đời.\nVới mô hình thuê bao: LTV = ARPU × Biên gộp ÷ Tỷ lệ rời bỏ." },
   { h:"Tỷ lệ LTV/CAC", hVi:"",
     body:"Thước đo sức khoẻ của cỗ máy tăng trưởng. Dưới 1 là mỗi khách hàng mới làm doanh nghiệp nghèo đi. Khoảng 3 là lành mạnh. Trên 5 thường nghĩa là đang chi quá ít cho marketing và bỏ lỡ tăng trưởng.",
     example:{company:"momo", text:"Cashback làm CAC rất cao, trong khi take rate thanh toán dưới 1% khiến LTV mỏng. Đó là lý do ví buộc phải bán sản phẩm tài chính — để nâng LTV lên cho tương xứng với CAC đã bỏ ra."} },
   { h:"Sai lầm dùng doanh thu thay vì biên đóng góp", hVi:"",
     body:"Nếu tính LTV bằng doanh thu, gần như mô hình nào cũng trông tuyệt vời. Phải dùng biên đóng góp — phần thật sự còn lại sau chi phí biến đổi.",
     note:"Khách hàng chi 10 triệu trọn đời với biên 8% chỉ mang lại 800 nghìn. Nếu CAC là 1 triệu thì đó là một khách hàng lỗ." }
  ],
  worked:{ title:"Một khách hàng thương mại điện tử đáng giá bao nhiêu",
    steps:[
     {k:"Chi phí marketing trong quý",v:"800 triệu"},
     {k:"Khách hàng mới có được",v:"2.000 người"},
     {k:"CAC",v:"400.000đ/khách"},
     {k:"Giá trị đơn hàng trung bình",v:"600.000đ"},
     {k:"Biên đóng góp mỗi đơn 20%",v:"120.000đ"},
     {k:"Số đơn trọn đời trung bình",v:"5 đơn"},
     {k:"LTV",v:"600.000đ",note:"120.000 × 5"},
     {k:"LTV / CAC",v:"1,5",note:"dưới ngưỡng lành mạnh"}],
    conclusion:"Tỷ lệ 1,5 nghĩa là mỗi khách hàng mới chỉ trả lại gấp rưỡi chi phí lấy họ về — chưa đủ để bù chi phí vận hành và công nghệ. Sàn này phải làm một trong hai việc: tăng số đơn trọn đời, hoặc hạ CAC. Tăng doanh thu bằng cách lấy thêm khách với cùng CAC sẽ chỉ đốt tiền nhanh hơn." },
  check:[
   { kind:"calc", xp:35, question:"Doanh nghiệp chi 600 triệu marketing, có 1.500 khách mới. Mỗi khách mua 4 lần, biên đóng góp 150.000đ mỗi lần. Tỷ lệ LTV/CAC là bao nhiêu?",
     unit:"lần", answer:1.5, tol:0.12, hint:"CAC = 600 triệu ÷ 1.500. LTV = 150.000 × 4.",
     working:[{k:"CAC",v:"600.000.000 ÷ 1.500 = 400.000đ"},{k:"LTV",v:"150.000 × 4 = 600.000đ"},{k:"LTV/CAC",v:"600.000 ÷ 400.000 = 1,5"}],
     why:"1,5 là dưới ngưỡng 3 thường được coi là lành mạnh. Doanh nghiệp này chưa nên tăng ngân sách marketing — nên sửa sản phẩm để khách quay lại nhiều hơn trước." },
   { kind:"multi", xp:30, need:3, question:"Cách nào cải thiện được tỷ lệ LTV/CAC?",
     note:"Chọn 3.",
     options:[
      {t:"Tăng tần suất mua lại của khách hiện hữu",ok:true,why:"Nâng LTV mà không tốn thêm CAC — đòn bẩy rẻ nhất."},
      {t:"Tăng biên đóng góp mỗi đơn hàng",ok:true,why:"Cùng số giao dịch nhưng mỗi giao dịch mang lại nhiều hơn."},
      {t:"Chuyển ngân sách sang kênh marketing có chi phí mỗi khách thấp hơn",ok:true,why:"Hạ trực tiếp mẫu số."},
      {t:"Tăng ngân sách marketing để có thêm khách",ok:false,why:"Không đổi tỷ lệ, chỉ nhân quy mô lên. Nếu tỷ lệ đang xấu thì càng chi càng lỗ."},
      {t:"Tăng giá bán 30%",ok:false,why:"Có thể nâng biên nhưng thường làm giảm tần suất mua và tăng khách rời bỏ — tác động lên LTV không chắc chắn."},
      {t:"Giảm giá để thu hút thêm khách",ok:false,why:"Hạ biên đóng góp, tức hạ LTV, trong khi CAC không đổi."}]}
  ],
  recap:["CAC chia cho khách hàng MỚI, không chia cho tổng khách hàng.",
         "LTV phải tính bằng biên đóng góp, không tính bằng doanh thu.",
         "LTV/CAC dưới 1 nghĩa là càng tăng trưởng càng nghèo đi."],
  terms:[{en:"CAC",vi:"Chi phí lấy khách",d:"Customer acquisition cost — chi phí có được một khách hàng mới"},
         {en:"LTV",vi:"Giá trị vòng đời",d:"Lifetime value — tổng biên đóng góp một khách mang lại"},
         {en:"Churn",vi:"Tỷ lệ rời bỏ",d:"Phần trăm khách hàng ngừng sử dụng mỗi kỳ"}]
},

{ id:"l-unit-3", module:"m-unit", order:3, minutes:5, xp:80,
  title:"Payback period", vi:"Thời gian hoàn vốn",
  hook:{ q:"Mở một cửa hàng tốn 2,5 tỷ. Bao lâu thì lấy lại được?",
         text:"Câu trả lời quyết định doanh nghiệp có thể mở bao nhiêu cửa hàng mỗi năm — vì tiền chỉ quay vòng được sau khi đã về." },
  core:[
   { h:"Payback period", hVi:"Thời gian hoàn vốn",
     body:"Số tháng để dòng tiền tích luỹ từ một đơn vị bằng đúng số vốn đã bỏ ra để tạo nó.",
     note:"Payback = Vốn đầu tư ÷ Dòng tiền hàng tháng của đơn vị đó." },
   { h:"Vì sao nó quan trọng hơn tỷ suất lợi nhuận", hVi:"",
     body:"Tỷ suất nói bạn kiếm được bao nhiêu. Payback nói bạn phải chờ bao lâu và chịu rủi ro gì trong lúc chờ. Với doanh nghiệp mở rộng bằng vốn tự có, payback quyết định tốc độ tăng trưởng tối đa.",
     note:"Payback 18 tháng nghĩa là mỗi 18 tháng bạn có thể tái đầu tư một lần. Payback 48 tháng nghĩa là gần bốn năm mới quay vòng được một lần vốn." },
   { h:"Ngưỡng tham chiếu theo ngành", hVi:"",
     body:"F&B và bán lẻ thường chấp nhận 18-30 tháng. Bệnh viện và nhà máy tính bằng nhiều năm. SaaS đo bằng CAC payback, thường 12-18 tháng là tốt.",
     example:{company:"highlands", text:"Một cửa hàng cà phê payback 18-30 tháng. Nếu hợp đồng thuê chỉ 3 năm mà payback là 30 tháng, gần như toàn bộ lợi nhuận nằm ở 6 tháng cuối hợp đồng — một cấu trúc rất mong manh."} },
   { h:"Payback dài không đồng nghĩa xấu", hVi:"",
     body:"Nó xấu khi doanh nghiệp không đủ tiền để chờ, hoặc khi tuổi thọ của tài sản ngắn hơn thời gian hoàn vốn.",
     note:"Câu hỏi thật không phải 'payback bao lâu' mà là 'payback có ngắn hơn tuổi thọ tài sản và ngắn hơn sức chịu đựng dòng tiền của mình không'." }
  ],
  worked:{ title:"Mở một cửa hàng cà phê",
    steps:[
     {k:"Đầu tư ban đầu",v:"2.500 triệu",note:"thiết kế, thiết bị, đặt cọc thuê"},
     {k:"Doanh thu tháng ổn định",v:"600 triệu"},
     {k:"Biên đóng góp 65%",v:"390 triệu"},
     {k:"Chi phí cố định cửa hàng",v:"−290 triệu"},
     {k:"Dòng tiền cửa hàng",v:"100 triệu/tháng"},
     {k:"Payback",v:"2.500 ÷ 100 = 25 tháng"},
     {k:"Thời gian tới doanh thu ổn định",v:"thêm 4-6 tháng đầu",note:"payback thật gần 30 tháng"}],
    conclusion:"Payback thật gần 30 tháng chứ không phải 25, vì mấy tháng đầu cửa hàng chưa đạt doanh thu chín. Đây là chỗ các kế hoạch mở rộng hay tính thiếu — và là lý do một chuỗi mở quá nhanh luôn cạn tiền trước khi lứa cửa hàng đầu tiên kịp hoàn vốn." },
  check:[
   { kind:"calc", xp:35, question:"Đầu tư một cửa hàng 1,8 tỷ. Dòng tiền cửa hàng đạt 75 triệu/tháng. Thời gian hoàn vốn là bao nhiêu tháng?",
     unit:"tháng", answer:24, tol:1, hint:"Vốn đầu tư chia cho dòng tiền hàng tháng.",
     working:[{k:"Vốn đầu tư",v:"1.800 triệu"},{k:"Dòng tiền tháng",v:"75 triệu"},{k:"Payback",v:"1.800 ÷ 75 = 24 tháng"}],
     why:"24 tháng nằm trong ngưỡng chấp nhận được của bán lẻ. Nhưng cần kiểm tra hợp đồng thuê dài bao lâu — payback 24 tháng trên hợp đồng thuê 3 năm để lại rất ít dư địa." },
   { kind:"mcq", xp:25, question:"Chuỗi có payback 30 tháng và hợp đồng thuê mặt bằng 3 năm. Rủi ro lớn nhất là gì?",
     options:[
      {t:"Gần như toàn bộ lợi nhuận nằm ở 6 tháng cuối, và chủ nhà có quyền tăng giá thuê khi tái ký",ok:true,why:"Người bỏ vốn chịu toàn bộ rủi ro trong 30 tháng, còn phần thưởng lại phụ thuộc vào việc đàm phán được hợp đồng mới với giá cũ."},
      {t:"Cửa hàng sẽ không bao giờ có lãi",ok:false,why:"Vẫn có lãi, vấn đề là lãi đến quá muộn so với thời hạn hợp đồng."},
      {t:"Chi phí đầu tư ban đầu quá cao",ok:false,why:"Chưa đủ dữ kiện để nói cao hay thấp — phải so với dòng tiền tạo ra."},
      {t:"Không có rủi ro nào đáng kể",ok:false,why:"Cấu trúc này rất mong manh trước bất kỳ biến động doanh thu nào."}]}
  ],
  recap:["Payback = vốn đầu tư ÷ dòng tiền hàng tháng của chính đơn vị đó.",
         "Nhớ cộng thêm mấy tháng đầu chưa đạt doanh thu chín.",
         "Payback phải ngắn hơn tuổi thọ tài sản và ngắn hơn sức chịu đựng dòng tiền của doanh nghiệp."],
  terms:[{en:"Payback period",vi:"Thời gian hoàn vốn",d:"Số tháng để thu hồi vốn đầu tư ban đầu"},
         {en:"Ramp-up",vi:"Giai đoạn chạy đà",d:"Thời gian để một đơn vị mới đạt mức doanh thu ổn định"},
         {en:"Capex",vi:"Chi đầu tư",d:"Tiền bỏ ra để tạo tài sản dùng nhiều năm"}]
},

{ id:"l-unit-4", module:"m-unit", order:4, minutes:6, xp:90,
  title:"Same-store vs new-store growth", vi:"Tăng trưởng cửa hàng cũ và cửa hàng mới",
  hook:{ q:"Doanh thu chuỗi tăng 18%. Chuỗi này đang khoẻ lên hay đang yếu đi?",
         text:"Không thể trả lời cho tới khi bạn tách con số 18% đó thành hai phần. Đây là bước đầu tiên bắt buộc với mọi doanh nghiệp có nhiều điểm bán." },
  core:[
   { h:"Same-store sales", hVi:"Doanh thu cửa hàng cũ",
     body:"Tăng trưởng của những cửa hàng đã hoạt động đủ 12 tháng ở cả hai kỳ so sánh. Đây là chỉ số duy nhất cho biết sức khoẻ thật của mô hình.",
     note:"Còn gọi là like-for-like sales hoặc comparable sales. Báo cáo của mọi chuỗi bán lẻ lớn đều có con số này ở trang đầu." },
   { h:"New-store growth", hVi:"Tăng trưởng do mở mới",
     body:"Phần doanh thu đến từ những cửa hàng mở trong kỳ. Nó có thật, nhưng nó mua được bằng tiền — và luôn kèm theo chi phí cố định mới.",
     note:"Tăng trưởng do mở mới có thể che lấp hoàn toàn việc cửa hàng cũ đang suy yếu." },
   { h:"Vì sao phải tách", hVi:"",
     body:"Một chuỗi có same-store 0% nhưng mở thêm 20% cửa hàng sẽ báo cáo tăng trưởng 20%. Nhìn từ ngoài rất đẹp. Nhưng nó chỉ đang mua doanh thu bằng vốn, không phải đang làm tốt hơn.",
     example:{company:"mwg", text:"Khi thị trường điện thoại bão hoà, tăng trưởng của chuỗi phần lớn đến từ mảng bách hoá mở mới. Cùng lúc đó các cửa hàng ICT cũ suy giảm — và đó mới là tín hiệu chiến lược quan trọng."} },
   { h:"Cannibalisation", hVi:"Tự ăn doanh thu",
     body:"Cửa hàng mới mở gần cửa hàng cũ sẽ kéo khách của chính mình. Doanh thu chuỗi tăng nhưng doanh thu mỗi cửa hàng giảm.",
     note:"Dấu hiệu nhận biết: same-store sales chuyển âm đúng ở khu vực vừa mở thêm điểm bán." }
  ],
  worked:{ title:"Tách 18% tăng trưởng của một chuỗi bán lẻ",
    steps:[
     {k:"Năm trước",v:"1.000 tỷ · 150 cửa hàng"},
     {k:"Doanh thu mỗi cửa hàng năm trước",v:"6,67 tỷ"},
     {k:"Năm nay",v:"1.180 tỷ · 180 cửa hàng"},
     {k:"Same-store sales công bố",v:"+0,5%"},
     {k:"Doanh thu từ 150 cửa hàng cũ",v:"1.000 × 1,005 = 1.005 tỷ"},
     {k:"Doanh thu từ 30 cửa hàng mới",v:"1.180 − 1.005 = 175 tỷ"},
     {k:"Trung bình mỗi cửa hàng mới",v:"175 ÷ 30 = 5,83 tỷ",note:"thấp hơn cửa hàng cũ 13%"}],
    conclusion:"Toàn bộ tăng trưởng đến từ mở mới, và cửa hàng mới đang kém hiệu quả hơn cửa hàng cũ 13%. Nếu chi phí thuê của lứa mới lại cao hơn, biên lợi nhuận toàn chuỗi chắc chắn sẽ sụt — đúng như những gì bạn sẽ gặp trong case cuối module trước." },
  check:[
   { kind:"calc", xp:35, question:"Chuỗi có doanh thu năm trước 800 tỷ với 100 cửa hàng. Năm nay 960 tỷ với 125 cửa hàng, same-store sales +2%. Doanh thu trung bình mỗi cửa hàng MỚI là bao nhiêu tỷ?",
     unit:"tỷ VND", answer:5.76, tol:0.25, hint:"Doanh thu cửa hàng cũ = 800 × 1,02. Phần còn lại chia cho 25 cửa hàng mới.",
     working:[{k:"Doanh thu 100 cửa hàng cũ",v:"800 × 1,02 = 816 tỷ"},{k:"Doanh thu 25 cửa hàng mới",v:"960 − 816 = 144 tỷ"},{k:"Trung bình mỗi cửa hàng mới",v:"144 ÷ 25 = 5,76 tỷ"},{k:"So với cửa hàng cũ",v:"8,16 tỷ — cửa hàng mới thấp hơn 29%"}],
     why:"Điều quan trọng không phải con số chính xác mà là kết luận: cửa hàng mới đạt chưa tới 3/4 mức của cửa hàng cũ, nên biên lợi nhuận toàn chuỗi sẽ chịu áp lực." },
   { kind:"mcq", xp:30, question:"Chuỗi báo cáo doanh thu +25%, same-store sales −3%. Nhận định nào đúng nhất?",
     options:[
      {t:"Mô hình đang yếu đi và việc mở mới đang che giấu điều đó",ok:true,why:"Same-store âm nghĩa là những cửa hàng vốn hoạt động tốt đang mất khách hoặc mất giá trị đơn hàng. Con số +25% chỉ là kết quả của việc bỏ vốn ra mua thêm điểm bán."},
      {t:"Chuỗi đang tăng trưởng tốt",ok:false,why:"Chỉ đúng nếu nhìn duy nhất dòng doanh thu và bỏ qua chỉ số quan trọng nhất của ngành bán lẻ."},
      {t:"Cần mở thêm cửa hàng để bù phần same-store âm",ok:false,why:"Nhân bản một mô hình đang suy yếu, và có thể chính việc mở dày đang gây ra cannibalisation."},
      {t:"Same-store âm 3% là bình thường, không đáng lo",ok:false,why:"Âm 3% trong khi vẫn đang đầu tư mở rộng là tín hiệu cảnh báo rõ ràng."}]}
  ],
  recap:["Luôn tách tăng trưởng chuỗi thành phần cửa hàng cũ và phần mở mới.",
         "Same-store sales là chỉ số duy nhất cho biết mô hình có đang khoẻ lên không.",
         "Cửa hàng mới kém hiệu quả hơn cửa hàng cũ là chuyện bình thường — nhưng chênh lệch phải thu hẹp theo thời gian."],
  terms:[{en:"Same-store sales",vi:"Doanh thu cửa hàng cũ",d:"Tăng trưởng của các cửa hàng đã hoạt động trên 12 tháng"},
         {en:"Cannibalisation",vi:"Tự ăn doanh thu",d:"Cửa hàng mới kéo khách của cửa hàng cũ cùng chuỗi"},
         {en:"Store count growth",vi:"Tăng trưởng số điểm bán",d:"Phần tăng trưởng đến từ mở thêm cửa hàng"}]
}
]);

/* ================= MODULE 3 · COST STRUCTURE ================= */
window.LESSONS = window.LESSONS.concat([

{ id:"l-cost-1", module:"m-cost", order:1, minutes:5, xp:70,
  title:"Anatomy of a cost base", vi:"Giải phẫu nền chi phí",
  hook:{ q:"Ban lãnh đạo yêu cầu cắt 10% chi phí. Bạn cắt ở đâu?",
         text:"Trước khi trả lời, phải biết nền chi phí gồm những gì. Cắt sai chỗ không chỉ vô ích — nó phá huỷ chính khả năng tạo doanh thu." },
  core:[
   { h:"Ba cách phân loại chi phí", hVi:"",
     body:"Theo hành vi (cố định / biến đổi), theo chức năng (sản xuất / bán hàng / quản lý), và theo khả năng quy trách nhiệm (trực tiếp / phân bổ). Mỗi cách phục vụ một câu hỏi khác nhau.",
     note:"Muốn biết điểm hoà vốn → dùng cố định/biến đổi.\nMuốn biết ai chịu trách nhiệm → dùng trực tiếp/phân bổ.\nMuốn so với đối thủ → dùng theo chức năng." },
   { h:"Cost driver", hVi:"Yếu tố dẫn dắt chi phí",
     body:"Là biến số làm chi phí thay đổi. Tìm đúng cost driver quan trọng hơn nhiều so với việc biết con số chi phí là bao nhiêu.",
     note:"Bệnh viện → số giường và số ca.\nChuyển phát → số điểm giao mỗi tuyến.\nNhà hàng → số bàn quay vòng mỗi tối.\nNgân hàng → chi phí huy động vốn." },
   { h:"Chi phí lớn nhất thường không phải chi phí dễ thấy nhất", hVi:"",
     body:"Marketing và văn phòng phẩm dễ nhìn, dễ cắt, và gần như luôn nhỏ. Chi phí thật thường nằm ở giá vốn, nhân sự vận hành hoặc tiền thuê.",
     example:{company:"vietjet", text:"Nhiên liệu chiếm 35-40% chi phí một hãng hàng không. Mọi nỗ lực tiết kiệm ở các khoản khác cộng lại vẫn không bằng một thay đổi nhỏ của giá dầu."} },
   { h:"Quy tắc 80/20 khi phân tích", hVi:"",
     body:"Sắp xếp các khoản chi từ lớn đến nhỏ. Thường ba khoản đầu tiên chiếm 70-80% tổng chi phí. Dành toàn bộ thời gian phân tích cho ba khoản đó.",
     note:"Nếu một khoản chi chỉ chiếm 2% nền chi phí, cắt nó đi một nửa cũng chỉ cải thiện 1% — không đáng để tranh luận trong phòng họp." }
  ],
  worked:{ title:"Nền chi phí của một cửa hàng cà phê, xếp theo độ lớn",
    steps:[
     {k:"Nguyên liệu (COGS)",v:"33% doanh thu",note:"biến đổi"},
     {k:"Nhân sự",v:"22%",note:"phần lớn cố định"},
     {k:"Thuê mặt bằng",v:"18%",note:"cố định cứng"},
     {k:"Ba khoản trên cộng lại",v:"73% doanh thu",note:"đây là nơi cần dồn sức"},
     {k:"Marketing",v:"7%"},
     {k:"Điện nước, bảo trì",v:"5%"},
     {k:"Quản lý, văn phòng",v:"4%"}],
    conclusion:"Cắt 30% ngân sách marketing chỉ tiết kiệm 2,1% doanh thu — và có thể làm giảm lượng khách. Đàm phán giảm 15% tiền thuê tiết kiệm 2,7% mà không ảnh hưởng gì tới trải nghiệm khách hàng. Cùng một nỗ lực, hai kết quả rất khác nhau." },
  check:[
   { kind:"multi", xp:30, need:2, question:"Doanh nghiệp muốn cải thiện biên lợi nhuận. Hai khoản nào đáng phân tích trước?",
     note:"Nền chi phí: giá vốn 60%, nhân sự 18%, thuê 9%, marketing 6%, IT 4%, khác 3%. Chọn 2.",
     options:[
      {t:"Giá vốn hàng bán",ok:true,why:"Chiếm 60% nền chi phí. Giảm được 5% khoản này tương đương 3% doanh thu — nhiều hơn toàn bộ ngân sách marketing."},
      {t:"Chi phí nhân sự",ok:true,why:"Khoản lớn thứ hai với 18%. Đáng phân tích, dù cần cẩn thận vì cắt nhân sự thường ảnh hưởng doanh thu."},
      {t:"Chi phí IT",ok:false,why:"Chỉ 4%. Cắt nửa khoản này cải thiện được 2% — tốn công tranh luận hơn giá trị mang lại."},
      {t:"Marketing",ok:false,why:"6% và có quan hệ trực tiếp với doanh thu. Đây thường là khoản bị cắt trước nhất và sai nhất."},
      {t:"Chi phí khác",ok:false,why:"3%, quá nhỏ để tạo khác biệt."}]},
   { kind:"mcq", xp:25, question:"Cost driver của một doanh nghiệp chuyển phát là gì?",
     options:[
      {t:"Mật độ giao hàng — số điểm giao trên mỗi km shipper đi",ok:true,why:"Cùng quãng đường, giao 30 đơn rẻ hơn nhiều so với giao 12 đơn. Đây là biến số quyết định chi phí mỗi bưu kiện."},
      {t:"Tổng số bưu kiện toàn quốc",ok:false,why:"Sản lượng lớn ở các khu vực rời rạc không tạo hiệu quả chi phí nào."},
      {t:"Số lượng bưu cục",ok:false,why:"Nhiều bưu cục làm tăng chi phí cố định nếu không đi kèm mật độ."},
      {t:"Giá xăng",ok:false,why:"Ảnh hưởng thật nhưng nằm ngoài tầm kiểm soát và tác động lên mọi đối thủ như nhau."}]}
  ],
  recap:["Xếp chi phí từ lớn tới nhỏ trước khi phân tích bất cứ điều gì.",
         "Ba khoản đầu tiên thường chiếm 70-80% nền chi phí — dồn toàn bộ thời gian vào đó.",
         "Tìm cost driver quan trọng hơn biết con số chi phí."],
  terms:[{en:"Cost base",vi:"Nền chi phí",d:"Toàn bộ cấu trúc chi phí của doanh nghiệp"},
         {en:"Cost driver",vi:"Yếu tố dẫn dắt chi phí",d:"Biến số làm chi phí thay đổi"},
         {en:"Direct vs allocated",vi:"Trực tiếp và phân bổ",d:"Chi phí quy được cho một đơn vị so với chi phí chia xuống"}]
},

{ id:"l-cost-2", module:"m-cost", order:2, minutes:6, xp:80,
  title:"Capacity and utilisation", vi:"Công suất và tỷ lệ lấp đầy",
  hook:{ q:"Bệnh viện có 200 giường, 116 giường có bệnh nhân. Giường trống thứ 117 tốn bao nhiêu tiền?",
         text:"Nó tốn gần đúng bằng chi phí của một giường có bệnh nhân — vì bác sĩ, thiết bị và toà nhà đều đã được trả tiền rồi." },
  core:[
   { h:"Capacity", hVi:"Công suất",
     body:"Mức sản lượng tối đa mà tài sản hiện có tạo ra được. Ghế trên máy bay, giường trong bệnh viện, bàn trong nhà hàng, giờ máy trong nhà máy.",
     note:"Công suất được mua bằng vốn và trả bằng chi phí cố định — dùng hay không dùng vẫn phải trả." },
   { h:"Utilisation", hVi:"Tỷ lệ lấp đầy",
     body:"Phần công suất thật sự được dùng. Đây là biến số quyết định lợi nhuận ở mọi ngành nặng chi phí cố định.",
     note:"Hàng không gọi là load factor.\nBệnh viện gọi là bed occupancy.\nKhách sạn gọi là occupancy rate.\nNhà máy gọi là capacity utilisation.\nBốn cái tên, một khái niệm." },
   { h:"Vì sao mỗi điểm lấp đầy đều quý", hVi:"",
     body:"Đơn vị tăng thêm chỉ tốn chi phí biến đổi, nên gần như toàn bộ doanh thu của nó chuyển thành lợi nhuận. Ở bệnh viện, chi phí biến đổi chỉ khoảng 20% doanh thu — nghĩa là 80% của mỗi ca thêm là lợi nhuận đóng góp.",
     example:{company:"vinmec", text:"Mỗi điểm công suất mang lại khoảng 50 tỷ doanh thu với biên đóng góp 80%, tức 40 tỷ lợi nhuận. Bảy điểm công suất là khác biệt giữa lỗ và hoà vốn."} },
   { h:"Hệ quả chiến lược", hVi:"",
     body:"Ở doanh nghiệp nặng chi phí cố định và đang dưới công suất, chiến lược đúng gần như luôn là lấp đầy — không phải cắt giảm. Cắt giảm ở đây thường có nghĩa là cắt vào chính năng lực tạo doanh thu.",
     note:"Đây là lý do khách sạn bán phòng phút chót rất rẻ, và hãng bay xả vé giờ chót. Doanh thu thấp vẫn tốt hơn công suất bỏ trống." }
  ],
  worked:{ title:"Bệnh viện 200 giường",
    steps:[
     {k:"Công suất",v:"200 giường"},
     {k:"Tỷ lệ lấp đầy hiện tại",v:"58% → 116 giường"},
     {k:"Doanh thu mỗi giường mỗi ngày",v:"5 triệu"},
     {k:"Doanh thu ngày",v:"116 × 5 = 580 triệu"},
     {k:"Chi phí biến đổi 20%",v:"−116 triệu"},
     {k:"Biên đóng góp ngày",v:"464 triệu"},
     {k:"Chi phí cố định ngày",v:"−520 triệu",note:"lương bác sĩ, khấu hao thiết bị"},
     {k:"Kết quả",v:"lỗ 56 triệu/ngày"}],
    conclusion:"Cần thêm 14 giường có bệnh nhân mỗi ngày — tức lấp đầy lên 65% — là hoà vốn. Đó là mục tiêu cụ thể, đếm được, và hoàn toàn khác với chỉ đạo mơ hồ kiểu 'phải cắt giảm chi phí'." },
  check:[
   { kind:"calc", xp:35, question:"Khách sạn 150 phòng, tỷ lệ lấp đầy 62%, giá phòng trung bình 1,4 triệu/đêm. Doanh thu một đêm là bao nhiêu triệu?",
     unit:"triệu VND", answer:130, tol:5, hint:"Số phòng bán được = 150 × 62%. Nhân với giá phòng.",
     working:[{k:"Phòng bán được",v:"150 × 0,62 = 93 phòng"},{k:"Doanh thu",v:"93 × 1,4 = 130,2 triệu"}],
     why:"Nếu lấp đầy tăng lên 70%, doanh thu thành 147 triệu — thêm 17 triệu mỗi đêm mà gần như không tốn thêm chi phí cố định nào. Đó là toàn bộ lý do ngành khách sạn ám ảnh với occupancy rate." },
   { kind:"mcq", xp:30, question:"Nhà máy chạy 55% công suất và đang lỗ. Ban lãnh đạo đề xuất đóng bớt một dây chuyền để tiết kiệm. Bạn nghĩ sao?",
     options:[
      {t:"Cẩn thận: đóng dây chuyền là giảm công suất, và nếu cầu phục hồi thì không còn năng lực để phục vụ",ok:true,why:"Ở doanh nghiệp dưới công suất, vấn đề là thiếu sản lượng chứ không phải thừa năng lực. Phải xác định cầu yếu là tạm thời hay vĩnh viễn trước khi phá huỷ công suất."},
      {t:"Đúng, cắt ngay để giảm chi phí cố định",ok:false,why:"Có thể đúng nếu cầu suy giảm vĩnh viễn, nhưng đây là quyết định gần như không đảo ngược được, không nên là phản xạ đầu tiên."},
      {t:"Nên tăng giá bán để bù phần công suất trống",ok:false,why:"Tăng giá làm cầu giảm thêm, đẩy tỷ lệ lấp đầy xuống thấp hơn nữa."},
      {t:"Nên cắt lương công nhân",ok:false,why:"Khoản tiết kiệm nhỏ so với khấu hao nhà máy, và làm mất năng lực vận hành khi cầu quay lại."}]}
  ],
  recap:["Công suất mua bằng vốn, trả bằng chi phí cố định — dùng hay không vẫn phải trả.",
         "Ở ngành nặng chi phí cố định, mỗi điểm lấp đầy gần như toàn bộ chuyển thành lợi nhuận.",
         "Dưới công suất thì chiến lược đúng thường là lấp đầy, không phải cắt giảm."],
  terms:[{en:"Capacity",vi:"Công suất",d:"Sản lượng tối đa mà tài sản hiện có tạo ra được"},
         {en:"Utilisation",vi:"Tỷ lệ lấp đầy",d:"Phần công suất thật sự được sử dụng"},
         {en:"Load factor",vi:"Hệ số lấp đầy",d:"Tên gọi của utilisation trong ngành hàng không"}]
},

{ id:"l-cost-3", module:"m-cost", order:3, minutes:5, xp:80,
  title:"Costs you must not cut", vi:"Những chi phí không được cắt",
  hook:{ q:"Bệnh viện đang lỗ. Có nên giảm 20% số bác sĩ không?",
         text:"Bác sĩ là khoản chi lớn nhất. Nhưng bác sĩ cũng chính là lý do bệnh nhân đến. Cắt khoản này là cắt vào nguồn doanh thu." },
  core:[
   { h:"Chi phí tạo doanh thu và chi phí tiêu doanh thu", hVi:"",
     body:"Một số khoản chi tồn tại để tạo ra doanh thu tương lai: nhân sự chuyên môn giỏi, chất lượng sản phẩm, dịch vụ sau bán. Một số khác chỉ tiêu tiền: trụ sở quá tiêu chuẩn, quy trình thừa, tầng quản lý trung gian.",
     note:"Phép thử: nếu cắt khoản này, doanh thu 12 tháng tới có giảm không? Nếu có, đó là khoản đầu tư đang bị gọi nhầm tên là chi phí." },
   { h:"Ba khoản thường bị cắt sai nhất", hVi:"",
     body:"Nhân sự tuyến đầu, bảo trì, và marketing hiệu quả. Cả ba đều cho khoản tiết kiệm ngay lập tức và cái giá phải trả đến muộn — nên rất dễ được thông qua trong một cuộc họp cắt giảm.",
     example:{company:"vinmec", text:"Cắt bác sĩ giỏi để giảm chi phí sẽ làm bệnh nhân chuyển sang bệnh viện khác — bởi bệnh nhân đi theo bác sĩ, không đi theo toà nhà."} },
   { h:"Cắt đúng chỗ trông như thế nào", hVi:"",
     body:"Bỏ hẳn một hoạt động không tạo giá trị, thay vì cắt đều mỗi phòng ban 10%. Cắt đều là cách chắc chắn nhất để làm mọi bộ phận yếu đi mà không bộ phận nào được sửa.",
     note:"Câu hỏi đúng không phải 'cắt bao nhiêu phần trăm' mà là 'hoạt động nào nên ngừng hẳn'." },
   { h:"Cắt chi phí không phải chiến lược", hVi:"",
     body:"Nó mua thời gian. Nếu vấn đề gốc là doanh thu mỗi đơn vị quá thấp, thì cắt chi phí chỉ trì hoãn ngày phải đối mặt với vấn đề đó.",
     note:"Không doanh nghiệp nào cắt chi phí để trở nên vĩ đại. Nhưng nhiều doanh nghiệp cắt chi phí để sống đủ lâu mà làm điều vĩ đại." }
  ],
  worked:{ title:"Bệnh viện lỗ 56 triệu/ngày — hai phương án",
    steps:[
     {k:"Phương án A: cắt 20% bác sĩ",v:"tiết kiệm 80 triệu/ngày"},
     {k:"Hệ quả A: mất chuyên khoa mũi nhọn",v:"lấp đầy giảm 58% → 48%"},
     {k:"Doanh thu A mất đi",v:"−100 triệu/ngày"},
     {k:"Kết quả A",v:"lỗ nặng hơn: −76 triệu/ngày"},
     {k:"Phương án B: ký hợp đồng doanh nghiệp & bảo hiểm",v:"chi phí bán hàng +15 triệu/ngày"},
     {k:"Hệ quả B: lấp đầy 58% → 68%",v:"+100 triệu doanh thu, biên 80%"},
     {k:"Kết quả B",v:"+9 triệu/ngày — đã có lãi"}],
    conclusion:"Cùng một bài toán lỗ, hai hướng đi ngược nhau. Phương án cắt giảm làm khoản lỗ lớn hơn vì nó tấn công chính năng lực tạo doanh thu. Với cấu trúc chi phí cố định cao, lấp đầy gần như luôn thắng cắt giảm." },
  check:[
   { kind:"multi", xp:30, need:2, question:"Chuỗi nhà hàng đang lỗ. Hai khoản nào KHÔNG nên cắt trước?",
     note:"Chọn 2 khoản mà cắt đi sẽ làm doanh thu giảm theo.",
     options:[
      {t:"Chất lượng nguyên liệu món chủ lực",ok:true,why:"Khách quay lại vì món ăn. Hạ chất lượng tiết kiệm được vài phần trăm giá vốn nhưng làm mất khách vĩnh viễn."},
      {t:"Nhân sự phục vụ giờ cao điểm",ok:true,why:"Phục vụ chậm ở giờ đông làm giảm số bàn quay vòng — đúng chỉ số tạo ra doanh thu."},
      {t:"Thuê văn phòng trụ sở hạng A",ok:false,why:"Không khách hàng nào nhìn thấy trụ sở. Đây là khoản cắt được mà không ảnh hưởng doanh thu."},
      {t:"Số lượng món trong thực đơn",ok:false,why:"Thực đơn gọn thường làm giảm hao hụt và tăng tốc độ bếp — cắt ở đây thường có lợi."},
      {t:"Quà tặng cuối năm cho đối tác",ok:false,why:"Ít liên quan tới doanh thu của một chuỗi nhà hàng."}]},
   { kind:"mcq", xp:25, question:"Cách cắt giảm chi phí nào thường hiệu quả nhất?",
     options:[
      {t:"Ngừng hẳn một hoạt động không tạo giá trị",ok:true,why:"Tiết kiệm toàn bộ chi phí của hoạt động đó mà không làm yếu đi những phần còn lại."},
      {t:"Cắt đều 10% ngân sách mọi phòng ban",ok:false,why:"Công bằng về hình thức nhưng làm mọi bộ phận yếu đi một chút và không sửa được bộ phận nào."},
      {t:"Đóng băng toàn bộ tuyển dụng",ok:false,why:"Chặn cả những vị trí đang tạo ra doanh thu, và thường dẫn tới việc thuê ngoài đắt hơn."},
      {t:"Cắt khoản chi lớn nhất",ok:false,why:"Khoản lớn nhất thường là khoản tạo ra doanh thu. Độ lớn không phải tiêu chí chọn."}]}
  ],
  recap:["Phân biệt chi phí tạo doanh thu và chi phí tiêu doanh thu bằng phép thử 12 tháng.",
         "Cắt đều mọi phòng ban là cách làm yếu tất cả mà không sửa được gì.",
         "Cắt chi phí mua thời gian, không tạo ra chiến lược."],
  terms:[{en:"Cost cutting",vi:"Cắt giảm chi phí",d:"Giảm chi để cải thiện lợi nhuận ngắn hạn"},
         {en:"Revenue-generating cost",vi:"Chi phí tạo doanh thu",d:"Khoản chi mà cắt đi sẽ làm doanh thu giảm"},
         {en:"Across-the-board cut",vi:"Cắt đều",d:"Giảm cùng tỷ lệ ở mọi bộ phận"}]
},

{ id:"l-cost-4", module:"m-cost", order:4, minutes:6, xp:90,
  title:"Scale and density", vi:"Lợi thế quy mô và mật độ",
  hook:{ q:"Doanh nghiệp giao 2 triệu đơn ở 63 tỉnh và doanh nghiệp giao 1 triệu đơn ở 10 quận — ai có chi phí thấp hơn?",
         text:"Doanh nghiệp nhỏ hơn. Và hiểu vì sao là hiểu được sự khác nhau giữa quy mô và mật độ." },
  core:[
   { h:"Economies of scale", hVi:"Lợi thế quy mô",
     body:"Chi phí trung bình mỗi đơn vị giảm khi sản lượng tăng, vì chi phí cố định được chia mỏng ra và sức mua với nhà cung cấp mạnh hơn.",
     note:"Hoạt động ở: nhà máy, mua hàng, R&D, nền tảng công nghệ." },
   { h:"Economies of density", hVi:"Lợi thế mật độ",
     body:"Chi phí giảm khi hoạt động tập trung trong một khu vực địa lý hẹp, chứ không phải khi tổng sản lượng lớn.",
     example:{company:"viettelpost", text:"Cùng chi phí ngày công shipper, giao 75 đơn trong một phường rẻ hơn nhiều so với giao 60 đơn rải ba huyện. Quy mô toàn quốc không giúp gì cho tuyến giao cụ thể đó."} },
   { h:"Nhầm lẫn giữa hai khái niệm", hVi:"",
     body:"Nhiều doanh nghiệp mở rộng địa lý và nghĩ rằng quy mô sẽ tự động hạ chi phí. Trong logistics, bán lẻ tạp hoá, giao đồ ăn và gọi xe, điều đó không xảy ra — mật độ mới là thứ quyết định.",
     note:"Dấu hiệu nhận biết ngành mật độ: chi phí phục vụ phụ thuộc khoảng cách di chuyển giữa hai khách hàng liên tiếp." },
   { h:"Diseconomies of scale", hVi:"Bất lợi quy mô",
     body:"Quá lớn cũng tạo chi phí: nhiều tầng quản lý, ra quyết định chậm, mất khả năng phản ứng địa phương.",
     note:"Đường cong chi phí có đáy. Sau điểm đó, lớn thêm làm chi phí mỗi đơn vị tăng trở lại." }
  ],
  worked:{ title:"Chi phí giao một bưu kiện theo mật độ",
    steps:[
     {k:"Chi phí ngày công shipper & xe",v:"600.000đ"},
     {k:"Khu vực thưa: 60 đơn/ngày",v:"10.000đ/đơn"},
     {k:"Khu vực dày: 75 đơn/ngày",v:"8.000đ/đơn"},
     {k:"Tiết kiệm",v:"2.000đ/đơn",note:"20% chi phí chặng cuối"},
     {k:"Với 100 triệu bưu kiện/năm",v:"200 tỷ",note:"chỉ từ mật độ"},
     {k:"Giá cước thị trường đang giảm",v:"−8%/năm"},
     {k:"Kết luận",v:"mật độ là thứ duy nhất theo kịp đà giảm giá"}],
    conclusion:"Doanh nghiệp tăng sản lượng bằng cách mở rộng ra vùng thưa sẽ thấy chi phí trung bình đứng yên hoặc tăng lên, dù báo cáo ghi nhận tăng trưởng. Tăng trưởng đúng trong ngành này là tăng số đơn trên tuyến đã có." },
  check:[
   { kind:"calc", xp:35, question:"Chi phí ngày công một shipper là 500.000đ. Nếu năng suất tăng từ 50 lên 80 đơn/ngày, chi phí giao mỗi đơn giảm bao nhiêu đồng?",
     unit:"đồng", answer:3750, tol:150, hint:"Tính chi phí mỗi đơn ở hai mức năng suất rồi lấy hiệu.",
     working:[{k:"Chi phí/đơn @50",v:"500.000 ÷ 50 = 10.000đ"},{k:"Chi phí/đơn @80",v:"500.000 ÷ 80 = 6.250đ"},{k:"Tiết kiệm",v:"3.750đ/đơn"}],
     why:"Giảm 37,5% chi phí chặng cuối mà không cần đàm phán với bất kỳ nhà cung cấp nào — chỉ nhờ đơn hàng nằm gần nhau hơn." },
   { kind:"mcq", xp:30, question:"Chuỗi bách hoá muốn giảm chi phí kho vận. Cách nào phù hợp với logic mật độ?",
     options:[
      {t:"Mở dày cửa hàng trong cùng một khu vực trước khi sang khu vực mới",ok:true,why:"Nhiều cửa hàng gần nhau chia sẻ cùng một tuyến xe giao hàng, làm chi phí kho vận mỗi cửa hàng giảm mạnh."},
      {t:"Mở rải đều ở nhiều tỉnh để phủ thị trường",ok:false,why:"Mỗi tỉnh cần tuyến giao riêng với sản lượng thấp — chi phí kho vận mỗi cửa hàng tăng."},
      {t:"Tăng số lượng SKU trong mỗi cửa hàng",ok:false,why:"Làm phức tạp kho vận và tăng hao hụt, không liên quan tới mật độ."},
      {t:"Đàm phán giảm giá với nhà cung cấp",ok:false,why:"Đó là lợi thế quy mô mua hàng, không phải mật độ — và không giải quyết chi phí kho vận."}]}
  ],
  recap:["Quy mô hạ chi phí mua hàng và chi phí cố định; mật độ hạ chi phí phục vụ.",
         "Trong logistics, bán lẻ tạp hoá và giao vận, mật độ quan trọng hơn quy mô.",
         "Mở rộng địa lý làm quy mô tăng nhưng mật độ giảm — hai chỉ số đi ngược nhau."],
  terms:[{en:"Economies of scale",vi:"Lợi thế quy mô",d:"Chi phí đơn vị giảm khi sản lượng tăng"},
         {en:"Economies of density",vi:"Lợi thế mật độ",d:"Chi phí giảm khi hoạt động tập trung địa lý"},
         {en:"Drop density",vi:"Mật độ điểm giao",d:"Số điểm giao trên mỗi km di chuyển"}]
}
]);

/* ================= MODULE 4 · GROWTH LEVERS ================= */
window.LESSONS = window.LESSONS.concat([

{ id:"l-growth-1", module:"m-growth", order:1, minutes:5, xp:70,
  title:"Price × Volume × Mix", vi:"Giá, sản lượng và cơ cấu",
  hook:{ q:"Doanh thu tăng 15%. Do bán được nhiều hơn, hay do bán đắt hơn?",
         text:"Hai nguyên nhân này dẫn tới hai kết luận trái ngược nhau về sức khoẻ doanh nghiệp — và tách chúng ra là việc đầu tiên phải làm." },
  core:[
   { h:"Ba nguồn của mọi thay đổi doanh thu", hVi:"",
     body:"Doanh thu chỉ thay đổi vì ba lý do: bán được nhiều hơn (volume), bán đắt hơn (price), hoặc bán những thứ khác nhau trong danh mục (mix).",
     note:"Doanh thu = Sản lượng × Giá bán bình quân.\nGiá bình quân thay đổi vì tăng giá thật, hoặc vì cơ cấu sản phẩm dịch chuyển sang loại đắt hơn." },
   { h:"Volume growth", hVi:"Tăng trưởng sản lượng",
     body:"Bán được nhiều đơn vị hơn. Cho biết sản phẩm được thị trường chấp nhận, nhưng kéo theo chi phí biến đổi tăng tương ứng.",
     note:"Volume tăng là tín hiệu tốt nhất trong ba loại — nó nói thị trường đang muốn thứ bạn bán nhiều hơn." },
   { h:"Price growth", hVi:"Tăng trưởng giá",
     body:"Bán cùng số lượng với giá cao hơn. Gần như toàn bộ phần tăng chuyển thành lợi nhuận vì chi phí không đổi.",
     example:{company:"vinamilk", text:"Ở thị trường sữa bão hoà, tăng trưởng khó đến từ sản lượng. Nên đòn bẩy còn lại là giá và mix — bán dòng cao cấp hơn cho cùng nhóm khách hàng."} },
   { h:"Mix", hVi:"Cơ cấu sản phẩm",
     body:"Cùng sản lượng, cùng bảng giá, nhưng khách mua nhiều hơn những món đắt tiền. Doanh thu và biên đều tăng mà bạn không tăng giá đồng nào.",
     note:"Mix cũng có thể đi ngược: khi kinh tế khó, khách chuyển xuống dòng rẻ hơn và doanh thu giảm dù sản lượng giữ nguyên." }
  ],
  worked:{ title:"Tách 15% tăng trưởng doanh thu",
    steps:[
     {k:"Năm trước — sản lượng",v:"1.000.000 sản phẩm"},
     {k:"Năm trước — giá bình quân",v:"100.000đ"},
     {k:"Năm trước — doanh thu",v:"100 tỷ"},
     {k:"Năm nay — doanh thu",v:"115 tỷ"},
     {k:"Năm nay — sản lượng",v:"1.050.000 sản phẩm",note:"volume +5%"},
     {k:"Giá bình quân năm nay",v:"115 tỷ ÷ 1,05 triệu ≈ 109.500đ",note:"+9,5%"},
     {k:"Kết luận",v:"1/3 từ sản lượng, 2/3 từ giá và mix"}],
    conclusion:"Hai phần ba tăng trưởng đến từ giá và mix. Đây là tin tốt cho biên lợi nhuận trong ngắn hạn, nhưng cũng là cảnh báo: sản lượng chỉ tăng 5% nghĩa là thị trường không thật sự mở rộng. Nếu đối thủ giữ giá thấp hơn, phần tăng trưởng từ giá này rất dễ bị đảo ngược." },
  check:[
   { kind:"calc", xp:35, question:"Doanh thu năm nay 240 tỷ với sản lượng 2 triệu sản phẩm. Năm trước doanh thu 200 tỷ với 1,9 triệu sản phẩm. Giá bình quân năm nay là bao nhiêu nghìn đồng?",
     unit:"nghìn đồng", answer:120, tol:3, hint:"Giá bình quân = doanh thu ÷ sản lượng.",
     working:[{k:"Giá bình quân năm nay",v:"240 tỷ ÷ 2 triệu = 120.000đ"},{k:"Giá bình quân năm trước",v:"200 tỷ ÷ 1,9 triệu ≈ 105.300đ"},{k:"Tăng giá/mix",v:"+14%"},{k:"Tăng sản lượng",v:"+5,3%"}],
     why:"Doanh thu tăng 20% nhưng sản lượng chỉ tăng 5,3%. Phần lớn tăng trưởng đến từ giá và mix — cần kiểm tra xem đó là do cao cấp hoá thật hay chỉ là tăng giá theo lạm phát." },
   { kind:"mcq", xp:25, question:"Doanh nghiệp có sản lượng giảm 4% nhưng doanh thu tăng 6%. Điều gì đang xảy ra?",
     options:[
      {t:"Giá bán hoặc cơ cấu sản phẩm đã dịch chuyển lên đáng kể",ok:true,why:"Doanh thu tăng trong khi bán ít đơn vị hơn thì chỉ có thể do giá bình quân tăng — hoặc tăng giá, hoặc khách mua nhiều dòng cao cấp hơn."},
      {t:"Doanh nghiệp đang mở rộng thị phần",ok:false,why:"Sản lượng giảm thường là dấu hiệu mất thị phần, không phải mở rộng."},
      {t:"Chi phí sản xuất đã giảm",ok:false,why:"Chi phí không xuất hiện trong dòng doanh thu."},
      {t:"Thị trường đang tăng trưởng",ok:false,why:"Không suy ra được từ dữ liệu này; sản lượng giảm còn gợi ý điều ngược lại."}]}
  ],
  recap:["Doanh thu chỉ thay đổi vì ba lý do: sản lượng, giá, và cơ cấu sản phẩm.",
         "Giá bình quân = doanh thu ÷ sản lượng — luôn tính con số này trước.",
         "Tăng trưởng từ sản lượng bền hơn tăng trưởng từ giá."],
  terms:[{en:"Volume",vi:"Sản lượng",d:"Số đơn vị bán được"},
         {en:"Price/mix",vi:"Giá và cơ cấu",d:"Phần thay đổi doanh thu không đến từ sản lượng"},
         {en:"Average selling price",vi:"Giá bán bình quân",d:"Doanh thu chia cho sản lượng"}]
},

{ id:"l-growth-2", module:"m-growth", order:2, minutes:5, xp:80,
  title:"Four directions of growth", vi:"Bốn hướng tăng trưởng",
  hook:{ q:"Doanh nghiệp muốn tăng trưởng. Về mặt cấu trúc, có bao nhiêu hướng để đi?",
         text:"Chỉ có bốn. Và biết đủ bốn hướng giúp bạn không bỏ sót phương án rẻ nhất — thứ gần như luôn nằm ở góc trên bên trái." },
  core:[
   { h:"Ma trận sản phẩm × thị trường", hVi:"",
     body:"Đặt sản phẩm cũ/mới lên một trục, thị trường cũ/mới lên trục kia. Bốn ô tạo thành bốn hướng tăng trưởng, xếp theo mức rủi ro tăng dần.",
     note:"1. Sản phẩm cũ, khách cũ → bán nhiều hơn cho người đang mua.\n2. Sản phẩm mới, khách cũ → mở rộng danh mục.\n3. Sản phẩm cũ, thị trường mới → mở rộng địa lý hoặc phân khúc.\n4. Sản phẩm mới, thị trường mới → đa dạng hoá, rủi ro cao nhất." },
   { h:"Hướng 1 luôn rẻ nhất", hVi:"",
     body:"Bán thêm cho khách đang có không tốn chi phí lấy khách, tận dụng quan hệ sẵn có và dữ liệu bạn đã hiểu. Nhưng nó có trần thấp ở thị trường bão hoà.",
     note:"Luôn hỏi trước: khách hàng hiện tại còn dư địa mua thêm bao nhiêu? Rất nhiều kế hoạch mở rộng tốn kém được viết ra trước khi câu hỏi này được trả lời." },
   { h:"Hướng 4 nguy hiểm nhất", hVi:"",
     body:"Sản phẩm mới cho thị trường mới nghĩa là bạn không có lợi thế nào chuyển giao được. Đây là chỗ phần lớn thương vụ đa dạng hoá phá huỷ giá trị.",
     example:{company:"vinamilk", text:"Một công ty sữa mua lại ngân hàng sẽ không tận dụng được gì từ mạng lưới phân phối, thương hiệu hay năng lực mua nguyên liệu của mình."} },
   { h:"Thứ tự xét, không phải thứ tự làm", hVi:"",
     body:"Ma trận không nói bạn phải đi từ ô 1. Nó nói bạn phải xét đủ bốn ô trước khi chọn, và phải giải thích được vì sao bỏ qua ô rẻ hơn.",
     note:"Trong một buổi phỏng vấn case, việc liệt kê đủ bốn hướng rồi loại trừ có lý do quan trọng hơn việc chọn đúng ngay từ đầu." }
  ],
  worked:{ title:"Bốn hướng cho một công ty sữa dẫn đầu thị trường",
    steps:[
     {k:"Ô 1 — sữa cho khách hiện tại",v:"tăng tần suất, tăng dung tích, mở rộng dịp dùng"},
     {k:"Rủi ro ô 1",v:"thấp",note:"trần thấp vì thị trường bão hoà"},
     {k:"Ô 2 — sản phẩm mới cho khách cũ",v:"sữa hạt, dinh dưỡng người cao tuổi"},
     {k:"Rủi ro ô 2",v:"trung bình",note:"tận dụng được kênh phân phối"},
     {k:"Ô 3 — sữa cho thị trường mới",v:"xuất khẩu Trung Đông, ASEAN"},
     {k:"Rủi ro ô 3",v:"cao",note:"mất lợi thế phân phối ở nhà"},
     {k:"Ô 4 — ngành hoàn toàn mới",v:"bất động sản, tài chính"},
     {k:"Rủi ro ô 4",v:"rất cao",note:"không có lợi thế nào chuyển giao"}],
    conclusion:"Ô 2 là điểm ngọt: đủ lớn để tạo tăng trưởng hai chữ số, và vẫn dùng được tài sản mà đối thủ không mua lại được là hệ thống phân phối. Đây chính là logic bạn sẽ cần trong case cuối module." },
  check:[
   { kind:"multi", xp:30, need:2, question:"Chuỗi cà phê muốn tăng trưởng. Hai phương án nào thuộc ô 'khách hàng hiện tại'?",
     note:"Chọn 2.",
     options:[
      {t:"Thêm thực đơn ăn sáng để khách ghé thêm một lần mỗi ngày",ok:true,why:"Cùng nhóm khách, tăng tần suất — đây chính là ô rẻ nhất."},
      {t:"Bán cà phê đóng gói để khách mang về nhà dùng",ok:true,why:"Sản phẩm mới nhưng vẫn bán cho khách đang có, tận dụng thương hiệu và cửa hàng sẵn có."},
      {t:"Mở chuỗi ở Campuchia",ok:false,why:"Thị trường mới — mất lợi thế thương hiệu và mặt bằng đã có."},
      {t:"Mua lại một chuỗi nhà hàng lẩu",ok:false,why:"Sản phẩm mới cho thị trường mới, ô rủi ro cao nhất."},
      {t:"Mở cửa hàng ở các tỉnh chưa có mặt",ok:false,why:"Thị trường mới trong nước — thuộc ô 3, không phải khách hàng hiện tại."}]},
   { kind:"mcq", xp:25, question:"Vì sao đa dạng hoá sang ngành không liên quan thường phá huỷ giá trị?",
     options:[
      {t:"Vì không có lợi thế cạnh tranh nào của doanh nghiệp chuyển giao được sang ngành mới",ok:true,why:"Bạn bước vào cuộc chơi mà mọi đối thủ đều đã có sẵn thứ bạn không có, còn thứ bạn giỏi thì vô dụng ở đó."},
      {t:"Vì ngành mới luôn cạnh tranh hơn",ok:false,why:"Không nhất thiết. Vấn đề không nằm ở mức cạnh tranh mà ở việc bạn không mang được lợi thế nào vào."},
      {t:"Vì cần quá nhiều vốn",ok:false,why:"Vốn thường không phải rào cản chính với doanh nghiệp lớn."},
      {t:"Vì cổ đông không thích",ok:false,why:"Cổ đông không thích là hệ quả, không phải nguyên nhân."}]}
  ],
  recap:["Chỉ có bốn hướng tăng trưởng: sản phẩm cũ/mới × thị trường cũ/mới.",
         "Ô rẻ nhất luôn là bán thêm cho khách hàng hiện tại — xét nó trước.",
         "Phải giải thích được vì sao bỏ qua một ô rẻ hơn để chọn ô đắt hơn."],
  terms:[{en:"Market penetration",vi:"Thâm nhập sâu",d:"Bán thêm sản phẩm cũ cho khách cũ"},
         {en:"Product development",vi:"Phát triển sản phẩm",d:"Sản phẩm mới cho khách hiện tại"},
         {en:"Diversification",vi:"Đa dạng hoá",d:"Sản phẩm mới cho thị trường mới"}]
},

{ id:"l-growth-3", module:"m-growth", order:3, minutes:6, xp:80,
  title:"Where your advantage still works", vi:"Lợi thế của bạn còn hiệu lực ở đâu",
  hook:{ q:"Thị trường nào lớn nhất? Sai câu hỏi.",
         text:"Câu hỏi đúng là: ở thị trường nào thì thứ bạn giỏi vẫn còn quan trọng? Quy mô thị trường là lý do tệ nhất để bước vào một thị trường." },
  core:[
   { h:"Lợi thế chuyển giao được", hVi:"Transferable advantage",
     body:"Trước khi vào thị trường mới, liệt kê từng lợi thế bạn đang có và hỏi: nó còn hiệu lực ở đó không?",
     note:"Mạng lưới phân phối → thường KHÔNG chuyển giao qua biên giới.\nThương hiệu → chuyển giao một phần, tuỳ mức nhận biết.\nNăng lực sản xuất chi phí thấp → thường CÓ chuyển giao.\nQuan hệ với nhà cung cấp → tuỳ, thường có." },
   { h:"Bẫy quy mô thị trường", hVi:"",
     body:"Thị trường lớn cũng có nghĩa là đối thủ ở đó nhiều tiền hơn, lâu năm hơn và hiểu khách hàng hơn bạn. Quy mô hấp dẫn bạn thì cũng đã hấp dẫn họ từ lâu.",
     example:{company:"vinfast", text:"Thị trường ô tô Mỹ lớn nhất thế giới. Nhưng ở đó, hệ sinh thái tập đoàn, mạng trạm sạc và đội xe dịch vụ — ba lợi thế lớn nhất ở sân nhà — đều không tồn tại."} },
   { h:"Chi phí đạt quy mô tối thiểu", hVi:"",
     body:"Mỗi thị trường có một ngưỡng quy mô tối thiểu để có ý nghĩa: đủ điểm bán, đủ nhận biết, đủ hạ tầng dịch vụ. Dưới ngưỡng đó, mọi khoản đầu tư đều lãng phí.",
     note:"Hỏi: cần bao nhiêu tiền và bao nhiêu năm để đạt ngưỡng đó? So sánh với số vốn thật sự có." },
   { h:"Chi phí cơ hội", hVi:"Opportunity cost",
     body:"Cùng số vốn đó đầu tư vào thị trường sân nhà thì tạo ra bao nhiêu? Đây là câu hỏi bị bỏ qua nhiều nhất trong các quyết định mở rộng.",
     note:"Vốn là hữu hạn. Mọi cam kết đều đồng thời là một lời từ chối với thứ khác." }
  ],
  worked:{ title:"Chấm điểm lợi thế khi mở rộng ra thị trường mới",
    steps:[
     {k:"Thương hiệu",v:"chuyển giao 20%",note:"gần như không ai biết ở thị trường mới"},
     {k:"Mạng lưới phân phối",v:"chuyển giao 0%",note:"phải xây lại từ đầu"},
     {k:"Chi phí sản xuất thấp",v:"chuyển giao 70%",note:"trừ thuế và vận chuyển"},
     {k:"Quan hệ nhà cung cấp",v:"chuyển giao 60%"},
     {k:"Hiểu biết khách hàng",v:"chuyển giao 10%",note:"hành vi tiêu dùng rất khác"},
     {k:"Vốn để đạt quy mô tối thiểu",v:"lớn hơn 3 năm lợi nhuận hiện tại"}],
    conclusion:"Chỉ có lợi thế chi phí sản xuất là còn hiệu lực đáng kể. Nếu đối thủ tại thị trường đó cũng có chi phí tương đương, bạn bước vào mà không mang theo ưu thế nào — và phải trả một khoản rất lớn chỉ để có mặt." },
  check:[
   { kind:"multi", xp:30, need:3, question:"Trước khi quyết định vào một thị trường mới, ba câu hỏi nào phải trả lời được?",
     note:"Chọn 3.",
     options:[
      {t:"Lợi thế nào của mình còn hiệu lực ở thị trường đó",ok:true,why:"Không có lợi thế chuyển giao thì bạn cạnh tranh bằng gì?"},
      {t:"Cần bao nhiêu tiền để đạt quy mô tối thiểu có ý nghĩa",ok:true,why:"Dưới ngưỡng đó mọi khoản đầu tư đều lãng phí."},
      {t:"Cùng số vốn đó đầu tư ở thị trường hiện tại thì tạo ra bao nhiêu",ok:true,why:"Chi phí cơ hội — câu hỏi bị bỏ qua nhiều nhất."},
      {t:"Thị trường đó lớn bao nhiêu",ok:false,why:"Thị trường lớn không có nghĩa là phần dành cho bạn lớn. Đây là cái bẫy phổ biến nhất."},
      {t:"Đối thủ ở đó có bao nhiêu công ty",ok:false,why:"Số lượng đối thủ ít quan trọng hơn việc họ mạnh ở đâu và bạn khác biệt thế nào."},
      {t:"Người tiêu dùng ở đó có thích sản phẩm không",ok:false,why:"Quá mơ hồ để làm tiêu chí quyết định phân bổ vốn."}]},
   { kind:"mcq", xp:25, question:"Chuỗi cà phê Việt Nam có lợi thế lớn nhất là danh mục mặt bằng đắc địa ở hai thành phố lớn. Kết luận nào đúng khi họ tính mở rộng ra nước ngoài?",
     options:[
      {t:"Lợi thế cốt lõi không chuyển giao được — phải cạnh tranh bằng thứ khác hoặc không đi",ok:true,why:"Mặt bằng là lợi thế gắn chặt với địa lý. Ở thị trường mới họ là người đến sau, phải trả giá thuê cao hơn cho vị trí xấu hơn."},
      {t:"Nên đi vì thương hiệu đã mạnh",ok:false,why:"Thương hiệu mạnh ở Việt Nam gần như không có giá trị nhận biết ở thị trường khác."},
      {t:"Nên đi vì thị trường nước ngoài lớn hơn",ok:false,why:"Đúng cái bẫy quy mô thị trường."},
      {t:"Nên nhượng quyền để tránh rủi ro",ok:false,why:"Nhượng quyền chỉ hoạt động khi thương hiệu đủ mạnh để franchisee muốn mua — điều chưa đúng ở thị trường mới."}]}
  ],
  recap:["Câu hỏi đúng không phải thị trường nào lớn, mà lợi thế của bạn còn hiệu lực ở đâu.",
         "Liệt kê từng lợi thế và chấm điểm mức độ chuyển giao được.",
         "Luôn tính chi phí cơ hội: cùng số vốn đó dùng ở sân nhà tạo ra bao nhiêu?"],
  terms:[{en:"Transferable advantage",vi:"Lợi thế chuyển giao được",d:"Lợi thế còn hiệu lực ở thị trường mới"},
         {en:"Minimum efficient scale",vi:"Quy mô tối thiểu",d:"Ngưỡng quy mô để hoạt động có ý nghĩa"},
         {en:"Opportunity cost",vi:"Chi phí cơ hội",d:"Giá trị của phương án tốt nhất bị bỏ qua"}]
},

{ id:"l-growth-4", module:"m-growth", order:4, minutes:6, xp:90,
  title:"When growth destroys value", vi:"Khi tăng trưởng phá huỷ giá trị",
  hook:{ q:"Giảm giá 10% để bán thêm 15%. Nghe hợp lý chứ?",
         text:"Hãy làm phép tính trước khi trả lời. Rất nhiều quyết định tăng trưởng nghe hợp lý trong phòng họp và làm doanh nghiệp nghèo đi trong bảng cân đối." },
  core:[
   { h:"Tăng trưởng không miễn phí", hVi:"",
     body:"Mọi điểm tăng trưởng đều được mua bằng thứ gì đó: giảm giá, tăng chi phí marketing, mở thêm điểm bán, hoặc nới điều kiện thanh toán cho khách.",
     note:"Câu hỏi luôn là: cái giá phải trả cho điểm tăng trưởng này có nhỏ hơn giá trị nó mang lại không?" },
   { h:"Bẫy giảm giá", hVi:"",
     body:"Giảm giá tác động lên toàn bộ sản lượng, còn phần tăng thêm chỉ áp dụng cho phần sản lượng mới. Ở doanh nghiệp có thị phần lớn, phép toán này gần như luôn thua.",
     example:{company:"vinamilk", text:"Ở thị phần 40%, mỗi đồng giảm giá áp lên toàn bộ sản lượng hiện có để giành thêm một phần rất nhỏ từ đối thủ."} },
   { h:"Tăng trưởng làm âm dòng tiền", hVi:"",
     body:"Bán nhiều hơn nghĩa là nhập hàng nhiều hơn, cho khách nợ nhiều hơn, thuê thêm người trước khi doanh thu về. Doanh nghiệp tăng trưởng nhanh có thể phá sản vì hết tiền dù đang có lãi.",
     note:"Càng tăng trưởng nhanh, vốn lưu động càng bị hút — đây là nguyên nhân phổ biến của các vụ sụp đổ ở doanh nghiệp đang lên." },
   { h:"Kiểm tra ba câu trước mọi kế hoạch tăng trưởng", hVi:"",
     body:"Một: biên đóng góp sau khi tăng trưởng còn dương không? Hai: dòng tiền có chịu nổi không? Ba: phần tăng thêm có bền hay chỉ là khách hàng săn khuyến mãi?",
     note:"Nếu không trả lời được cả ba, kế hoạch đó chưa sẵn sàng để trình." }
  ],
  worked:{ title:"Giảm giá 10% để tăng sản lượng 15%",
    steps:[
     {k:"Giá bán trước",v:"100.000đ"},
     {k:"Chi phí biến đổi",v:"60.000đ"},
     {k:"Biên đóng góp trước",v:"40.000đ/sản phẩm"},
     {k:"Sản lượng trước",v:"100.000 sản phẩm"},
     {k:"Tổng đóng góp trước",v:"4,0 tỷ"},
     {k:"Giá sau khi giảm 10%",v:"90.000đ"},
     {k:"Biên đóng góp sau",v:"30.000đ",note:"giảm 25%, không phải 10%"},
     {k:"Sản lượng sau",v:"115.000 sản phẩm"},
     {k:"Tổng đóng góp sau",v:"3,45 tỷ",note:"giảm 13,75%"}],
    conclusion:"Bán nhiều hơn 15% nhưng kiếm ít hơn 13,75%. Nguyên nhân: giảm giá 10% làm biên đóng góp giảm tới 25%, vì phần giảm giá lấy trực tiếp từ phần lợi nhuận chứ không phải từ toàn bộ giá bán. Muốn hoà vốn với mức giảm giá này, sản lượng phải tăng 33%." },
  check:[
   { kind:"calc", xp:40, question:"Giá bán 200.000đ, chi phí biến đổi 140.000đ. Nếu giảm giá 10% và sản lượng tăng 20%, tổng biên đóng góp thay đổi bao nhiêu phần trăm?",
     unit:"%", answer:-20, tol:2, hint:"Tính biên đóng góp trước và sau, nhân với sản lượng tương ứng rồi so sánh. Kết quả có thể âm.",
     working:[{k:"Biên đóng góp trước",v:"200 − 140 = 60 nghìn"},{k:"Giá sau giảm 10%",v:"180 nghìn"},{k:"Biên đóng góp sau",v:"180 − 140 = 40 nghìn",note:"giảm 33%"},{k:"Giả sử sản lượng trước là 100",v:"tổng trước = 6.000"},{k:"Sản lượng sau 120",v:"tổng sau = 4.800"},{k:"Thay đổi",v:"−20%"}],
     why:"Đáp án đúng là khoảng −20%, và nếu bạn ra con số âm là đã nắm đúng bản chất. Giảm giá 10% khi biên đóng góp chỉ 30% giá bán sẽ ăn mất một phần ba lợi nhuận mỗi đơn vị — sản lượng phải tăng 50% mới hoà." },
   { kind:"mcq", xp:30, question:"Doanh nghiệp tăng trưởng doanh thu 40% mỗi năm nhưng liên tục thiếu tiền mặt. Nguyên nhân khả dĩ nhất là gì?",
     options:[
      {t:"Tăng trưởng hút vốn lưu động: hàng tồn kho, công nợ khách hàng và nhân sự đều phải chi trước khi tiền về",ok:true,why:"Đây là cơ chế cấu trúc, không phải quản lý kém. Doanh nghiệp càng tăng trưởng nhanh càng cần vốn lưu động, và có thể hết tiền dù báo cáo vẫn có lãi."},
      {t:"Doanh nghiệp đang thua lỗ",ok:false,why:"Có lãi mà vẫn hết tiền là chuyện hoàn toàn bình thường — hai con số này khác nhau."},
      {t:"Chi phí marketing quá cao",ok:false,why:"Có thể góp phần nhưng không phải nguyên nhân cấu trúc của việc thiếu tiền khi tăng trưởng nhanh."},
      {t:"Cổ đông rút vốn",ok:false,why:"Không liên quan tới tốc độ tăng trưởng."}]}
  ],
  recap:["Mọi điểm tăng trưởng đều được mua bằng thứ gì đó — luôn hỏi cái giá là gì.",
         "Giảm giá tác động lên toàn bộ sản lượng, phần tăng chỉ áp lên phần mới.",
         "Tăng trưởng nhanh hút vốn lưu động: có lãi vẫn có thể hết tiền."],
  terms:[{en:"Value-destroying growth",vi:"Tăng trưởng phá huỷ giá trị",d:"Tăng doanh thu nhưng giảm lợi nhuận hoặc dòng tiền"},
         {en:"Working capital",vi:"Vốn lưu động",d:"Tiền bị giữ trong hàng tồn kho và công nợ"},
         {en:"Price elasticity",vi:"Độ co giãn giá",d:"Mức thay đổi sản lượng khi giá thay đổi"}]
}
]);

/* ================= MODULE 5 · READING A COMPANY ================= */
window.LESSONS = window.LESSONS.concat([

{ id:"l-read-1", module:"m-read", order:1, minutes:5, xp:70,
  title:"From business model to metrics", vi:"Từ mô hình kinh doanh tới chỉ số",
  hook:{ q:"Có 200 chỉ số trong một báo cáo thường niên. Bạn đọc chỉ số nào?",
         text:"Chỉ số đúng suy ra được từ mô hình kinh doanh. Biết doanh nghiệp kiếm tiền thế nào là biết phải nhìn con số nào." },
  core:[
   { h:"Mỗi mô hình có một chỉ số sống còn", hVi:"",
     body:"Không có bộ chỉ số chung cho mọi doanh nghiệp. Chỉ số quan trọng nhất luôn là chỉ số phản ánh cơ chế kiếm tiền cốt lõi.",
     note:"Hàng không → load factor.\nBán lẻ → doanh thu mỗi cửa hàng.\nSàn TMĐT → take rate và tỷ lệ mua lại.\nNgân hàng → NIM và chi phí tín dụng.\nThuê bao → churn và ARPU.\nChuyển phát → chi phí mỗi bưu kiện." },
   { h:"Cách suy ra chỉ số", hVi:"",
     body:"Viết công thức doanh thu của doanh nghiệp ra giấy. Mỗi biến trong công thức đó là một chỉ số cần theo dõi.",
     example:{company:"fpt", text:"Doanh thu phần mềm = số kỹ sư × tỷ lệ giờ tính được cho khách × giá mỗi giờ. Ba biến này chính là ba chỉ số quyết định — và chỉ số bị bỏ qua nhiều nhất là tỷ lệ giờ tính được."} },
   { h:"Chỉ số dẫn dắt và chỉ số kết quả", hVi:"Leading vs lagging",
     body:"Lợi nhuận là chỉ số kết quả — nó nói chuyện đã rồi. Chỉ số dẫn dắt như tỷ lệ khách quay lại, số đơn mỗi shipper, hay tỷ lệ lấp đầy sẽ báo trước lợi nhuận vài quý.",
     note:"Khi phân tích một doanh nghiệp, tìm chỉ số dẫn dắt trước. Nó cho bạn biết tương lai, không phải quá khứ." },
   { h:"Cảnh giác với chỉ số tự chọn", hVi:"",
     body:"Doanh nghiệp thường công bố chỉ số làm mình đẹp nhất và tự định nghĩa nó. GMV, người dùng hoạt động, EBITDA điều chỉnh — mỗi cái đều có thể được định nghĩa theo hướng có lợi.",
     note:"Luôn hỏi: ai định nghĩa chỉ số này, và định nghĩa có thay đổi so với kỳ trước không?" }
  ],
  worked:{ title:"Suy ra chỉ số từ mô hình của một công ty phần mềm xuất khẩu",
    steps:[
     {k:"Công thức doanh thu",v:"Số kỹ sư × Giờ tính được × Giá/giờ"},
     {k:"Biến 1 — số kỹ sư",v:"chỉ số: tốc độ tuyển và tỷ lệ nghỉ việc"},
     {k:"Biến 2 — tỷ lệ giờ tính được",v:"chỉ số: utilisation rate",note:"đòn bẩy bị bỏ quên"},
     {k:"Biến 3 — giá mỗi giờ",v:"chỉ số: giá bán so với tốc độ tăng lương"},
     {k:"Chi phí lớn nhất",v:"lương kỹ sư ≈ 55% doanh thu"},
     {k:"Chỉ số dẫn dắt",v:"chênh lệch giữa tăng lương và tăng giá bán"}],
    conclusion:"Chỉ với công thức doanh thu, bạn đã có bốn chỉ số cần theo dõi và biết trước rằng biên lợi nhuận sẽ bị bào mòn nếu lương tăng nhanh hơn giá bán. Đó chính là bài toán trong case cuối module này." },
  check:[
   { kind:"mcq", xp:30, question:"Chỉ số sống còn của một chuỗi khách sạn là gì?",
     options:[
      {t:"Tỷ lệ lấp đầy phòng và giá phòng bình quân",ok:true,why:"Chi phí phần lớn là cố định, nên doanh thu phụ thuộc gần như hoàn toàn vào hai biến này. Nhân chúng với nhau ra RevPAR — chỉ số chuẩn của ngành."},
      {t:"Số lượng khách sạn trong chuỗi",ok:false,why:"Quy mô không nói gì về hiệu quả. Nhiều khách sạn trống còn tệ hơn ít khách sạn đầy."},
      {t:"Số nhân viên phục vụ",ok:false,why:"Là chi phí đầu vào, không phải chỉ số phản ánh cơ chế kiếm tiền."},
      {t:"Điểm đánh giá trên ứng dụng đặt phòng",ok:false,why:"Là chỉ số dẫn dắt hữu ích nhưng không phải chỉ số sống còn."}]},
   { kind:"multi", xp:30, need:2, question:"Đâu là chỉ số DẪN DẮT (báo trước kết quả) của một sàn thương mại điện tử?",
     note:"Chọn 2.",
     options:[
      {t:"Tỷ lệ khách hàng quay lại mua lần hai",ok:true,why:"Báo trước giá trị vòng đời và mức độ phụ thuộc vào chi phí lấy khách mới."},
      {t:"Số người bán hoạt động mỗi tháng",ok:true,why:"Nguồn cung mỏng đi hôm nay sẽ làm nhu cầu giảm ở các quý sau."},
      {t:"Lợi nhuận quý vừa rồi",ok:false,why:"Chỉ số kết quả — nói chuyện đã rồi."},
      {t:"Doanh thu năm ngoái",ok:false,why:"Chỉ số kết quả của quá khứ xa hơn nữa."},
      {t:"Số nhân viên công ty",ok:false,why:"Không phản ánh cơ chế kiếm tiền của sàn."}]}
  ],
  recap:["Viết công thức doanh thu ra giấy — mỗi biến trong đó là một chỉ số cần theo dõi.",
         "Chỉ số dẫn dắt báo trước lợi nhuận; lợi nhuận chỉ kể chuyện đã rồi.",
         "Luôn hỏi ai định nghĩa chỉ số và định nghĩa có đổi so với kỳ trước không."],
  terms:[{en:"KPI",vi:"Chỉ số then chốt",d:"Chỉ số phản ánh cơ chế kiếm tiền cốt lõi"},
         {en:"Leading indicator",vi:"Chỉ số dẫn dắt",d:"Báo trước kết quả tài chính vài quý"},
         {en:"Lagging indicator",vi:"Chỉ số kết quả",d:"Phản ánh chuyện đã xảy ra"}]
},

{ id:"l-read-2", module:"m-read", order:2, minutes:6, xp:80,
  title:"Three statements in one page", vi:"Ba báo cáo tài chính trong một trang",
  hook:{ q:"Doanh nghiệp báo lãi 3.000 tỷ nhưng tài khoản chỉ còn 400 tỷ. Có mâu thuẫn không?",
         text:"Không hề. Lợi nhuận và tiền mặt là hai con số khác nhau, nằm ở hai báo cáo khác nhau — và hiểu vì sao chúng lệch nhau là kỹ năng quan trọng nhất khi đọc doanh nghiệp." },
  core:[
   { h:"Báo cáo kết quả kinh doanh", hVi:"Income statement / P&L",
     body:"Ghi nhận doanh thu và chi phí trong kỳ theo nguyên tắc phát sinh — tức là ghi khi giao dịch xảy ra, không phải khi tiền chuyển.",
     note:"Bán hàng cho khách nợ 3 tháng vẫn được ghi doanh thu ngay hôm nay. Đó là lý do có lãi mà chưa có tiền." },
   { h:"Bảng cân đối kế toán", hVi:"Balance sheet",
     body:"Ảnh chụp tại một thời điểm: doanh nghiệp có gì (tài sản), nợ ai (nợ phải trả), và phần còn lại của chủ sở hữu.",
     note:"Tài sản = Nợ phải trả + Vốn chủ sở hữu. Luôn cân bằng, nên gọi là bảng cân đối." },
   { h:"Báo cáo lưu chuyển tiền tệ", hVi:"Cash flow statement",
     body:"Tiền thật đã vào và ra. Chia ba phần: hoạt động kinh doanh, đầu tư, và tài chính. Đây là báo cáo khó làm đẹp nhất.",
     example:{company:"vinhomes", text:"Chủ đầu tư bất động sản có thể báo lãi lớn nhiều năm liền trong khi dòng tiền hoạt động âm, vì lợi nhuận nằm trong các dự án dở dang chưa bán được."} },
   { h:"Cách ba báo cáo nối với nhau", hVi:"",
     body:"Lợi nhuận từ P&L chảy vào vốn chủ sở hữu trên bảng cân đối. Dòng tiền bắt đầu từ lợi nhuận rồi cộng trừ các khoản không phải tiền và các thay đổi trên bảng cân đối.",
     note:"Dòng tiền hoạt động = Lợi nhuận + Khấu hao − Tăng hàng tồn kho − Tăng phải thu + Tăng phải trả." }
  ],
  worked:{ title:"Từ lợi nhuận 100 tỷ tới dòng tiền thật",
    steps:[
     {k:"Lợi nhuận sau thuế",v:"+100 tỷ"},
     {k:"Cộng khấu hao",v:"+40 tỷ",note:"chi phí không phải tiền"},
     {k:"Hàng tồn kho tăng",v:"−80 tỷ",note:"tiền nằm trong kho"},
     {k:"Phải thu khách hàng tăng",v:"−30 tỷ",note:"khách chưa trả"},
     {k:"Phải trả nhà cung cấp tăng",v:"+0 tỷ"},
     {k:"Dòng tiền hoạt động",v:"+30 tỷ"},
     {k:"So với lợi nhuận báo cáo",v:"chỉ bằng 30%"}],
    conclusion:"Doanh nghiệp lãi 100 tỷ nhưng chỉ thu về 30 tỷ tiền thật. Phần chênh lệch nằm trong kho hàng và trong túi khách hàng. Nếu tình trạng này kéo dài vài kỳ, doanh nghiệp có lãi vẫn có thể mất khả năng thanh toán." },
  check:[
   { kind:"calc", xp:35, question:"Lợi nhuận sau thuế 200 tỷ, khấu hao 60 tỷ, hàng tồn kho tăng 90 tỷ, phải thu tăng 50 tỷ, phải trả tăng 20 tỷ. Dòng tiền hoạt động là bao nhiêu tỷ?",
     unit:"tỷ VND", answer:140, tol:8, hint:"Lợi nhuận + khấu hao − tăng tồn kho − tăng phải thu + tăng phải trả.",
     working:[{k:"Lợi nhuận",v:"+200"},{k:"Khấu hao",v:"+60"},{k:"Tồn kho tăng",v:"−90"},{k:"Phải thu tăng",v:"−50"},{k:"Phải trả tăng",v:"+20"},{k:"Dòng tiền hoạt động",v:"+140 tỷ"}],
     why:"140 tỷ trên lợi nhuận 200 tỷ là tỷ lệ chuyển đổi 70% — chấp nhận được. Dưới 50% kéo dài nhiều kỳ là dấu hiệu cần soi kỹ chất lượng doanh thu." },
   { kind:"mcq", xp:30, question:"Báo cáo nào khó bị làm đẹp nhất và nên đọc trước khi tin vào lợi nhuận?",
     options:[
      {t:"Báo cáo lưu chuyển tiền tệ",ok:true,why:"Tiền vào tài khoản là tiền thật. Doanh thu và lợi nhuận có nhiều dư địa cho ước tính kế toán, dòng tiền thì ít hơn nhiều."},
      {t:"Báo cáo kết quả kinh doanh",ok:false,why:"Chính là nơi có nhiều dư địa nhất cho các ước tính về ghi nhận doanh thu, khấu hao và dự phòng."},
      {t:"Thuyết minh báo cáo tài chính",ok:false,why:"Rất giá trị để hiểu chi tiết, nhưng không phải nơi kiểm chứng con số tổng."},
      {t:"Báo cáo thường niên phần thư ngỏ của chủ tịch",ok:false,why:"Đó là tài liệu truyền thông, không phải báo cáo tài chính."}]}
  ],
  recap:["P&L ghi khi giao dịch xảy ra; cash flow ghi khi tiền thật chuyển.",
         "Dòng tiền hoạt động = lợi nhuận + khấu hao − tăng vốn lưu động.",
         "Doanh nghiệp phá sản vì hết tiền, không vì hết lợi nhuận."],
  terms:[{en:"Accrual accounting",vi:"Kế toán dồn tích",d:"Ghi nhận khi phát sinh, không phải khi thu tiền"},
         {en:"Operating cash flow",vi:"Dòng tiền hoạt động",d:"Tiền thật tạo ra từ kinh doanh cốt lõi"},
         {en:"Cash conversion",vi:"Tỷ lệ chuyển đổi tiền",d:"Dòng tiền hoạt động chia cho lợi nhuận"}]
},

{ id:"l-read-3", module:"m-read", order:3, minutes:5, xp:80,
  title:"Quality of earnings", vi:"Chất lượng lợi nhuận",
  hook:{ q:"Hai doanh nghiệp cùng lãi 500 tỷ. Chúng có đáng giá như nhau không?",
         text:"Không, nếu một bên kiếm được từ kinh doanh cốt lõi còn bên kia từ việc bán một mảnh đất. Cùng con số, khác hoàn toàn về giá trị." },
  core:[
   { h:"Lợi nhuận lặp lại và lợi nhuận một lần", hVi:"Recurring vs one-off",
     body:"Lợi nhuận lặp lại đến từ hoạt động cốt lõi và sẽ xuất hiện lại năm sau. Lợi nhuận một lần đến từ bán tài sản, hoàn nhập dự phòng, hoặc đánh giá lại — dùng được một lần rồi thôi.",
     note:"Khi định giá doanh nghiệp, chỉ phần lặp lại mới được nhân với bội số." },
   { h:"Dấu hiệu chất lượng lợi nhuận xấu", hVi:"",
     body:"Lợi nhuận tăng trong khi doanh thu đi ngang. Dòng tiền hoạt động thấp hơn nhiều so với lợi nhuận. Biên lợi nhuận cải thiện đột ngột không giải thích được bằng vận hành.",
     example:{company:"vietjet", text:"Nghiệp vụ bán và thuê lại máy bay tạo lợi nhuận kế toán lớn, nhưng nó không lặp lại bền vững. Khi phân tích, phải tách phần này ra khỏi lợi nhuận từ hoạt động bay."} },
   { h:"Hoàn nhập dự phòng", hVi:"Provision reversal",
     body:"Doanh nghiệp trích lập dự phòng ở kỳ trước, kỳ này hoàn nhập lại và ghi tăng lợi nhuận. Con số đẹp lên mà không có đồng tiền mới nào được tạo ra.",
     note:"Rất phổ biến ở ngân hàng. Luôn đọc mục chi phí dự phòng trước khi tin vào dòng lợi nhuận." },
   { h:"Cách kiểm tra nhanh", hVi:"",
     body:"So dòng tiền hoạt động với lợi nhuận trong ba năm liên tiếp. Nếu lợi nhuận luôn cao hơn dòng tiền một cách hệ thống, có điều gì đó đáng hỏi.",
     note:"Đây là bài kiểm tra mất ba phút và loại được phần lớn các trường hợp có vấn đề." }
  ],
  worked:{ title:"Bóc tách lợi nhuận 500 tỷ của một doanh nghiệp",
    steps:[
     {k:"Lợi nhuận trước thuế báo cáo",v:"500 tỷ"},
     {k:"Lãi bán một mảnh đất",v:"−180 tỷ",note:"một lần"},
     {k:"Hoàn nhập dự phòng nợ xấu",v:"−90 tỷ",note:"một lần"},
     {k:"Lãi chênh lệch tỷ giá",v:"−40 tỷ",note:"không kiểm soát được"},
     {k:"Lợi nhuận từ hoạt động cốt lõi",v:"190 tỷ",note:"chỉ 38% con số báo cáo"},
     {k:"Cùng kỳ năm trước — cốt lõi",v:"260 tỷ"},
     {k:"Thực tế",v:"lõi kinh doanh giảm 27%"}],
    conclusion:"Báo cáo cho thấy lợi nhuận tăng, nhưng hoạt động cốt lõi đang suy giảm 27%. Các khoản một lần đã che đi xu hướng thật. Đây chính xác là mẫu hình bạn sẽ gặp trong case về ngân hàng ở module Case Cracking." },
  check:[
   { kind:"multi", xp:35, need:3, question:"Đâu là những khoản KHÔNG nên tính vào lợi nhuận cốt lõi khi định giá doanh nghiệp?",
     note:"Chọn 3.",
     options:[
      {t:"Lãi từ bán tài sản cố định",ok:true,why:"Bán được một lần, không lặp lại năm sau."},
      {t:"Hoàn nhập dự phòng đã trích các kỳ trước",ok:true,why:"Không tạo ra tiền mới, chỉ đảo ngược bút toán cũ."},
      {t:"Lãi chênh lệch tỷ giá",ok:true,why:"Phụ thuộc biến động thị trường ngoại hối, không phải năng lực kinh doanh."},
      {t:"Doanh thu từ khách hàng thường xuyên",ok:false,why:"Đây chính là lợi nhuận cốt lõi cần giữ lại."},
      {t:"Lợi nhuận từ mảng kinh doanh mới nhưng đã ổn định",ok:false,why:"Mới nhưng lặp lại được thì vẫn là cốt lõi."},
      {t:"Tiết kiệm chi phí từ cải tiến quy trình",ok:false,why:"Cải thiện bền vững, thuộc về hoạt động cốt lõi."}]},
   { kind:"mcq", xp:30, question:"Doanh nghiệp có lợi nhuận tăng 20% ba năm liền nhưng dòng tiền hoạt động luôn chỉ bằng 40% lợi nhuận. Kết luận hợp lý nhất?",
     options:[
      {t:"Cần soi kỹ: có thể doanh thu ghi nhận sớm, hàng tồn phình lên, hoặc khách hàng không trả tiền",ok:true,why:"Chênh lệch hệ thống và kéo dài nhiều năm không còn là biến động thời vụ. Đây là dấu hiệu cần kiểm tra chất lượng doanh thu."},
      {t:"Bình thường, doanh nghiệp đang tăng trưởng nên cần vốn lưu động",ok:false,why:"Đúng cho một năm, nhưng ba năm liền ở mức 40% là mẫu hình đáng ngờ."},
      {t:"Doanh nghiệp đang có lãi nên không cần lo",ok:false,why:"Lãi mà không có tiền là tình huống dẫn tới mất khả năng thanh toán."},
      {t:"Cần tăng vay nợ để bù dòng tiền",ok:false,why:"Chữa triệu chứng bằng cách tăng rủi ro, không giải quyết nguyên nhân."}]}
  ],
  recap:["Chỉ phần lợi nhuận lặp lại mới có giá trị khi định giá.",
         "So dòng tiền hoạt động với lợi nhuận trong ba năm — bài kiểm tra ba phút.",
         "Lợi nhuận tăng trong khi doanh thu đi ngang luôn cần một lời giải thích."],
  terms:[{en:"Quality of earnings",vi:"Chất lượng lợi nhuận",d:"Mức độ lợi nhuận đến từ hoạt động cốt lõi lặp lại"},
         {en:"One-off item",vi:"Khoản một lần",d:"Lãi hoặc lỗ không lặp lại ở kỳ sau"},
         {en:"Provision reversal",vi:"Hoàn nhập dự phòng",d:"Đảo ngược khoản dự phòng đã trích trước đó"}]
},

{ id:"l-read-4", module:"m-read", order:4, minutes:6, xp:90,
  title:"Red flags", vi:"Những dấu hiệu cảnh báo",
  hook:{ q:"Bạn có 15 phút với một báo cáo thường niên 200 trang. Tìm gì?",
         text:"Không đọc từ đầu. Tìm sáu dấu hiệu — nếu không có cái nào, doanh nghiệp đáng để đọc kỹ. Nếu có ba cái trở lên, đừng mất thêm thời gian." },
  core:[
   { h:"Sáu dấu hiệu cần tìm", hVi:"",
     body:"Đây là danh sách kiểm tra nhanh, dùng được cho gần như mọi doanh nghiệp niêm yết.",
     note:"1. Dòng tiền hoạt động âm nhiều kỳ trong khi vẫn báo lãi.\n2. Phải thu khách hàng tăng nhanh hơn doanh thu.\n3. Hàng tồn kho tăng nhanh hơn doanh thu.\n4. Nợ vay tăng trong khi tài sản sinh lời không tăng.\n5. Doanh thu tập trung vào rất ít khách hàng hoặc bên liên quan.\n6. Thay đổi chính sách kế toán hoặc đổi công ty kiểm toán không rõ lý do." },
   { h:"Vì sao phải thu và tồn kho quan trọng", hVi:"",
     body:"Cả hai đều là nơi doanh thu có thể được ghi nhận mà tiền chưa về. Nếu chúng phình nhanh hơn doanh thu, nghĩa là chất lượng doanh thu đang xấu đi.",
     note:"So sánh tốc độ tăng, không so con số tuyệt đối. Doanh thu +10% mà phải thu +45% là tín hiệu rõ ràng." },
   { h:"Rủi ro tập trung", hVi:"Concentration risk",
     body:"Doanh thu phụ thuộc một vài khách hàng lớn, hoặc phần lớn đến từ công ty trong cùng tập đoàn, làm con số tăng trưởng mất ý nghĩa như một bằng chứng về nhu cầu thị trường.",
     example:{company:"vinfast", text:"Khi phần lớn xe được bán cho đội xe dịch vụ thuộc cùng hệ sinh thái, sản lượng không chứng minh được rằng thị trường bên ngoài đang muốn mua."} },
   { h:"Điều dấu hiệu cảnh báo KHÔNG nói", hVi:"",
     body:"Chúng không chứng minh có gian lận. Chúng chỉ nói rằng cần đặt thêm câu hỏi. Nhiều doanh nghiệp tốt có một hai dấu hiệu vì lý do hoàn toàn hợp lý.",
     note:"Một dấu hiệu là câu hỏi. Ba dấu hiệu cùng lúc là một mẫu hình." }
  ],
  worked:{ title:"Quét nhanh một doanh nghiệp trong 15 phút",
    steps:[
     {k:"Doanh thu 3 năm",v:"+12% · +15% · +18%",note:"đẹp"},
     {k:"Lợi nhuận 3 năm",v:"+20% · +24% · +30%",note:"tăng nhanh hơn doanh thu"},
     {k:"Dòng tiền hoạt động",v:"âm · âm · dương nhẹ",note:"⚠ dấu hiệu 1"},
     {k:"Phải thu khách hàng",v:"+45%/năm",note:"⚠ dấu hiệu 2"},
     {k:"Hàng tồn kho",v:"+38%/năm",note:"⚠ dấu hiệu 3"},
     {k:"Nợ vay",v:"gấp đôi trong 2 năm",note:"⚠ dấu hiệu 4"},
     {k:"Kết luận",v:"bốn dấu hiệu — dừng lại"}],
    conclusion:"Bốn dấu hiệu cùng xuất hiện tạo thành một mẫu hình rõ ràng: lợi nhuận tăng trên giấy trong khi tiền thật đi ra ngoài. Điều này không chứng minh doanh nghiệp gian lận, nhưng đủ để kết luận rằng nó không xứng đáng với 20 giờ phân tích tiếp theo của bạn." },
  check:[
   { kind:"multi", xp:40, need:3, question:"Đâu là những dấu hiệu cảnh báo thật sự khi đọc báo cáo tài chính?",
     note:"Chọn 3.",
     options:[
      {t:"Phải thu khách hàng tăng nhanh hơn doanh thu nhiều lần",ok:true,why:"Doanh thu được ghi nhận nhưng tiền chưa về — chất lượng doanh thu đang xấu đi."},
      {t:"Dòng tiền hoạt động âm nhiều kỳ trong khi vẫn báo lãi",ok:true,why:"Lợi nhuận trên giấy không chuyển thành tiền thật."},
      {t:"Phần lớn doanh thu đến từ công ty trong cùng tập đoàn",ok:true,why:"Tăng trưởng không chứng minh được nhu cầu thật của thị trường bên ngoài."},
      {t:"Doanh nghiệp đầu tư nhiều vào nhà máy mới",ok:false,why:"Làm dòng tiền đầu tư âm nhưng đó là bình thường và cần thiết với doanh nghiệp sản xuất đang mở rộng."},
      {t:"Biên lợi nhuận thấp hơn trung bình ngành",ok:false,why:"Có thể là lựa chọn chiến lược, ví dụ mô hình giá thấp. Cần tìm hiểu chứ không phải cảnh báo."},
      {t:"Doanh nghiệp không trả cổ tức",ok:false,why:"Giữ lại lợi nhuận để tái đầu tư là hoàn toàn hợp lý với doanh nghiệp đang tăng trưởng."}]},
   { kind:"mcq", xp:30, question:"Doanh thu tăng 10%, phải thu khách hàng tăng 45%. Điều gì có thể đang xảy ra?",
     options:[
      {t:"Doanh nghiệp nới lỏng điều kiện thanh toán để đẩy doanh số, hoặc khách hàng đang gặp khó khăn trả tiền",ok:true,why:"Cả hai khả năng đều nghĩa là chất lượng doanh thu xấu đi. Doanh số được mua bằng rủi ro thu hồi."},
      {t:"Doanh nghiệp đang bán chạy hơn",ok:false,why:"Nếu bán chạy thật thì phải thu tăng cùng nhịp doanh thu, không phải nhanh gấp bốn lần."},
      {t:"Khách hàng đang trả tiền nhanh hơn",ok:false,why:"Trả nhanh hơn sẽ làm phải thu GIẢM, không tăng."},
      {t:"Đây là dấu hiệu doanh nghiệp quản lý tốt",ok:false,why:"Ngược lại — quản lý công nợ tốt sẽ giữ phải thu tăng chậm hơn doanh thu."}]}
  ],
  recap:["Sáu dấu hiệu: dòng tiền âm, phải thu phình, tồn kho phình, nợ tăng, doanh thu tập trung, đổi chính sách kế toán.",
         "So tốc độ tăng, đừng so con số tuyệt đối.",
         "Một dấu hiệu là câu hỏi; ba dấu hiệu cùng lúc là một mẫu hình."],
  terms:[{en:"Red flag",vi:"Dấu hiệu cảnh báo",d:"Chỉ báo cần đặt thêm câu hỏi trước khi tin vào số liệu"},
         {en:"Receivables",vi:"Phải thu khách hàng",d:"Tiền khách còn nợ doanh nghiệp"},
         {en:"Related-party revenue",vi:"Doanh thu bên liên quan",d:"Doanh thu từ công ty trong cùng tập đoàn"}]
}
]);

/* ================= MODULE 6 · MECE & ISSUE TREES ================= */
window.LESSONS = window.LESSONS.concat([

{ id:"l-mece-1", module:"m-mece", order:1, minutes:5, xp:70,
  title:"What makes a tree MECE", vi:"Thế nào là một cây MECE",
  hook:{ q:"Chia khách hàng thành: người trẻ, người thành thị, người thu nhập cao. Sai ở đâu?",
         text:"Một người có thể thuộc cả ba nhóm cùng lúc. Cách chia này chồng lấn, và một cây chồng lấn sẽ đếm trùng, kết luận sai." },
  core:[
   { h:"MECE", hVi:"Không chồng lấn, không bỏ sót",
     body:"Mutually Exclusive, Collectively Exhaustive. Mỗi phần tử chỉ thuộc đúng một nhánh, và các nhánh cộng lại phủ hết vấn đề.",
     note:"Kiểm tra ME: có phần tử nào rơi vào hai nhánh không?\nKiểm tra CE: có phần tử nào không rơi vào nhánh nào không?" },
   { h:"Ba kiểu chia luôn MECE", hVi:"",
     body:"Chia theo công thức toán học (Lợi nhuận = Doanh thu − Chi phí), chia theo quá trình thời gian (trước / trong / sau), và chia nhị phân (là A / không phải A).",
     note:"Khi bí, dùng công thức. Doanh thu = Giá × Sản lượng luôn MECE vì đó là phép nhân, không phải phân loại chủ quan." },
   { h:"MECE không phải mục tiêu cuối", hVi:"",
     body:"Một cây MECE nhưng vô dụng vẫn là cây vô dụng. Chia khách hàng theo tên bắt đầu bằng A-M và N-Z là MECE hoàn hảo và chẳng giúp gì.",
     note:"Cây tốt phải vừa MECE vừa có sức giải thích: mỗi nhánh phải dẫn tới một hành động khác nhau." }
  ],
  worked:{ title:"Sửa một cây chồng lấn",
    steps:[
     {k:"Cây sai — nhánh 1",v:"Khách trẻ"},
     {k:"Cây sai — nhánh 2",v:"Khách thành thị",note:"chồng lấn với nhánh 1"},
     {k:"Cây sai — nhánh 3",v:"Khách thu nhập cao",note:"chồng lấn cả hai"},
     {k:"Sửa: chọn MỘT trục chia",v:"theo địa lý"},
     {k:"Nhánh 1",v:"Thành thị"},
     {k:"Nhánh 2",v:"Nông thôn",note:"cộng lại phủ hết"},
     {k:"Chia tiếp trong mỗi nhánh",v:"theo thu nhập, rồi theo tuổi"}],
    conclusion:"Nguyên tắc: mỗi tầng của cây chỉ dùng MỘT tiêu chí chia. Trộn nhiều tiêu chí trong cùng một tầng là nguyên nhân số một của cây chồng lấn." },
  check:[
   { kind:"mcq", xp:30, question:"Cách chia nào sau đây là MECE?",
     options:[
      {t:"Doanh thu = Số khách × Giá trị đơn hàng trung bình",ok:true,why:"Đây là một phép nhân, không phải phân loại. Không thể chồng lấn và luôn phủ hết doanh thu."},
      {t:"Khách hàng: mua online, mua tại cửa hàng, khách trung thành",ok:false,why:"Khách trung thành có thể mua cả online lẫn tại cửa hàng — chồng lấn hai nhánh đầu."},
      {t:"Chi phí: marketing, nhân sự, chi phí lớn",ok:false,why:"'Chi phí lớn' không phải một loại chi phí mà là một mức độ — nó cắt ngang cả hai nhánh kia."},
      {t:"Sản phẩm: bán chạy, mới ra mắt, lợi nhuận cao",ok:false,why:"Một sản phẩm mới ra mắt hoàn toàn có thể vừa bán chạy vừa lợi nhuận cao."}]},
   { kind:"multi", xp:30, need:2, question:"Cây phân tích cần thoả hai điều kiện nào để hữu ích?",
     note:"Chọn 2.",
     options:[
      {t:"Các nhánh không chồng lấn và cộng lại phủ hết vấn đề",ok:true,why:"Đây chính là định nghĩa MECE — điều kiện cần."},
      {t:"Mỗi nhánh dẫn tới một hành động hoặc kết luận khác nhau",ok:true,why:"Điều kiện đủ. Không có nó thì cây MECE vẫn vô dụng."},
      {t:"Có ít nhất năm nhánh để đủ chi tiết",ok:false,why:"Số nhánh không quyết định chất lượng. Ba nhánh đúng tốt hơn bảy nhánh trùng lặp."},
      {t:"Dùng thuật ngữ chuyên ngành cho chuyên nghiệp",ok:false,why:"Thuật ngữ không làm cây đúng hơn."},
      {t:"Chia sâu ít nhất ba tầng",ok:false,why:"Độ sâu phụ thuộc vào vấn đề, không phải quy tắc cố định."}]}
  ],
  recap:["MECE = mỗi phần tử thuộc đúng một nhánh, các nhánh cộng lại phủ hết.",
         "Mỗi tầng của cây chỉ dùng MỘT tiêu chí chia.",
         "Cây MECE mà không dẫn tới hành động khác nhau thì vẫn vô dụng."],
  terms:[{en:"MECE",vi:"Không chồng lấn, không bỏ sót",d:"Mutually exclusive, collectively exhaustive"},
         {en:"Issue tree",vi:"Cây vấn đề",d:"Sơ đồ chia một vấn đề lớn thành các nhánh nhỏ hơn"},
         {en:"Segmentation axis",vi:"Trục phân chia",d:"Tiêu chí dùng để chia ở một tầng của cây"}]
},

{ id:"l-mece-2", module:"m-mece", order:2, minutes:6, xp:80,
  title:"Standard trees worth memorising", vi:"Những cây chuẩn nên thuộc lòng",
  hook:{ q:"Bạn có 60 giây để cấu trúc một vấn đề chưa từng gặp. Bắt đầu từ đâu?",
         text:"Từ một trong bốn cây chuẩn. Chúng phủ được đa số vấn đề kinh doanh, và bạn không nên sáng tạo lại chúng dưới áp lực thời gian." },
  core:[
   { h:"Cây lợi nhuận", hVi:"Profit tree",
     body:"Lợi nhuận = Doanh thu − Chi phí. Doanh thu tách thành Giá × Sản lượng. Chi phí tách thành Cố định và Biến đổi.",
     note:"Dùng khi câu hỏi là: vì sao lợi nhuận giảm, làm sao tăng lợi nhuận." },
   { h:"Cây doanh thu theo phễu", hVi:"Funnel tree",
     body:"Số khách tiềm năng × Tỷ lệ chuyển đổi × Giá trị đơn hàng × Tần suất mua.",
     example:{company:"shopee", text:"Người truy cập sàn × tỷ lệ đặt hàng × giá trị đơn × số lần mua mỗi năm. Mỗi biến là một đòn bẩy riêng với một cách can thiệp riêng."} },
   { h:"Cây khách hàng - đối thủ - doanh nghiệp", hVi:"3C",
     body:"Dùng khi vấn đề mang tính chiến lược chứ không phải tài chính: có nên vào thị trường này, phản ứng thế nào với đối thủ.",
     note:"Customer: nhu cầu có thật không.\nCompetitor: ai đang phục vụ nhu cầu đó.\nCompany: mình có lợi thế gì." },
   { h:"Cây nội bộ - bên ngoài", hVi:"Internal vs external",
     body:"Khi một chỉ số xấu đi, luôn hỏi: do mình làm gì đó khác đi, hay do thị trường thay đổi?",
     note:"Đây là cây đơn giản nhất và bị bỏ qua nhiều nhất. Nó ngăn bạn đổ lỗi cho vận hành khi cả ngành đang suy giảm." }
  ],
  worked:{ title:"Chọn cây cho từng loại câu hỏi",
    steps:[
     {k:"Vì sao biên lợi nhuận giảm?",v:"Cây lợi nhuận"},
     {k:"Vì sao doanh thu online giảm?",v:"Cây phễu"},
     {k:"Có nên mở thị trường Nhật?",v:"Cây 3C"},
     {k:"Vì sao thị phần giảm?",v:"Nội bộ vs bên ngoài, rồi 3C"},
     {k:"Vì sao NIM giảm?",v:"Cây công thức: lợi suất tài sản − chi phí vốn"},
     {k:"Nên đầu tư dự án nào?",v:"Cây dòng tiền: doanh thu, chi phí, vốn, rủi ro"}],
    conclusion:"Không có cây nào đúng cho mọi câu hỏi. Kỹ năng thật là nhận ra loại câu hỏi trong 10 giây đầu, rồi rút đúng cây ra dùng — thay vì bắt đầu bằng một tờ giấy trắng." },
  check:[
   { kind:"calc", xp:35, question:"Ngân hàng có lợi suất tài sản sinh lời 8,4% và chi phí huy động vốn 4,8%. NIM là bao nhiêu phần trăm?",
     unit:"%", answer:3.6, tol:0.15, hint:"NIM = lợi suất tài sản − chi phí vốn.",
     working:[{k:"Lợi suất tài sản",v:"8,4%"},{k:"Chi phí vốn",v:"4,8%"},{k:"NIM",v:"3,6%"}],
     why:"Cây công thức làm lộ ra ngay hai đòn bẩy: hoặc cho vay lợi suất cao hơn, hoặc huy động vốn rẻ hơn. Không có đường thứ ba — và đó chính là giá trị của việc dùng công thức làm cây." },
   { kind:"mcq", xp:30, question:"Câu hỏi 'vì sao tỷ lệ khách quay lại app giảm' nên bắt đầu bằng cây nào?",
     options:[
      {t:"Cây phễu: ai rời ở bước nào trong hành trình sử dụng",ok:true,why:"Câu hỏi về hành vi người dùng theo chuỗi bước — phễu tách được chính xác chỗ rò rỉ."},
      {t:"Cây lợi nhuận",ok:false,why:"Đây là câu hỏi hành vi, chưa phải câu hỏi tài chính."},
      {t:"Cây 3C",ok:false,why:"Hữu ích ở tầng chiến lược, nhưng quá thô để tìm chỗ rò rỉ cụ thể."},
      {t:"Cây chi phí cố định và biến đổi",ok:false,why:"Không liên quan tới hành vi quay lại của người dùng."}]}
  ],
  recap:["Bốn cây chuẩn: lợi nhuận, phễu, 3C, nội bộ vs bên ngoài.",
         "Nhận ra loại câu hỏi trước, rồi rút đúng cây ra dùng.",
         "Khi bí, dùng công thức toán học — nó luôn MECE."],
  terms:[{en:"Profit tree",vi:"Cây lợi nhuận",d:"Lợi nhuận = doanh thu − chi phí, chia tiếp từng vế"},
         {en:"Funnel",vi:"Phễu",d:"Chuỗi bước từ tiếp cận tới mua hàng"},
         {en:"3C framework",vi:"Khung 3C",d:"Customer, Competitor, Company"}]
},

{ id:"l-mece-3", module:"m-mece", order:3, minutes:5, xp:80,
  title:"How deep should you go", vi:"Chia sâu tới đâu thì dừng",
  hook:{ q:"Cây của bạn có 4 tầng và 23 nhánh. Đó là chăm chỉ hay là lạc đường?",
         text:"Một cây tốt không phải cây đầy đủ nhất. Nó là cây đủ sâu để tìm ra nguyên nhân và đủ gọn để người nghe theo kịp." },
  core:[
   { h:"Quy tắc dừng", hVi:"",
     body:"Dừng khi nhánh tiếp theo không còn dẫn tới một hành động khác nhau, hoặc khi bạn đã chạm tới con số có thể đo được.",
     note:"Nếu chia tiếp mà cả hai nhánh con đều dẫn tới cùng một việc phải làm, việc chia đó vô nghĩa." },
   { h:"Chia sâu có chọn lọc", hVi:"Drill down",
     body:"Không cần chia đều mọi nhánh. Xác định nhánh nào chiếm phần lớn vấn đề rồi chỉ đào sâu nhánh đó.",
     example:{company:"highlands", text:"Khi biết chi phí thuê tăng 6 điểm phần trăm còn nguyên liệu chỉ tăng 1 điểm, bạn đào sâu nhánh mặt bằng và để nguyên nhánh nguyên liệu ở tầng một."} },
   { h:"Cây rộng ở tầng một, hẹp ở tầng dưới", hVi:"",
     body:"Tầng đầu tiên phải phủ hết để không bỏ sót. Các tầng sau chỉ tập trung vào nhánh có tín hiệu. Hình dạng cây thật luôn lệch, không cân đối.",
     note:"Cây cân đối đẹp mắt thường là dấu hiệu người phân tích chưa dùng dữ liệu để định hướng." }
  ],
  worked:{ title:"Đào sâu có chọn lọc trong case chuỗi cà phê",
    steps:[
     {k:"Tầng 1 — ba nhánh",v:"doanh thu/cửa hàng · biến phí · định phí"},
     {k:"Dữ liệu: biến phí",v:"COGS 33% → 34%",note:"chỉ +1 điểm, dừng"},
     {k:"Dữ liệu: định phí",v:"thuê 16% → 22%",note:"+6 điểm, đào tiếp"},
     {k:"Tầng 2 dưới nhánh thuê",v:"cửa hàng cũ vs cửa hàng mới"},
     {k:"Dữ liệu",v:"30 cửa hàng mới thuê cao hơn 45%"},
     {k:"Tầng 3",v:"doanh thu cửa hàng mới so với điểm hoà vốn"},
     {k:"Dừng",v:"đã chạm con số hành động được"}],
    conclusion:"Cây cuối cùng sâu ba tầng ở một nhánh và một tầng ở hai nhánh còn lại. Đó là hình dạng đúng — dữ liệu quyết định chỗ nào cần đào, không phải tính đối xứng." },
  check:[
   { kind:"mcq", xp:30, question:"Khi nào nên dừng chia nhánh?",
     options:[
      {t:"Khi nhánh tiếp theo không dẫn tới hành động khác nhau, hoặc đã chạm con số đo được",ok:true,why:"Mục đích của cây là dẫn tới hành động. Chia thêm mà không đổi hành động chỉ tốn thời gian của cả bạn lẫn người nghe."},
      {t:"Khi đã đủ ba tầng",ok:false,why:"Độ sâu phụ thuộc vấn đề, không có con số cố định."},
      {t:"Khi hết chỗ trên giấy",ok:false,why:"Không phải tiêu chí phân tích."},
      {t:"Khi mọi nhánh đều đã được chia đều nhau",ok:false,why:"Cây cân đối thường là dấu hiệu chưa dùng dữ liệu để định hướng."}]},
   { kind:"multi", xp:30, need:2, question:"Sau khi có dữ liệu, hai việc nào nên làm với cây?",
     note:"Chọn 2.",
     options:[
      {t:"Đào sâu nhánh có tín hiệu mạnh nhất",ok:true,why:"Dồn thời gian vào nơi vấn đề thật sự nằm."},
      {t:"Đóng lại các nhánh dữ liệu cho thấy không phải nguyên nhân",ok:true,why:"Loại trừ có bằng chứng cũng là kết quả phân tích, và nó thu hẹp không gian tìm kiếm."},
      {t:"Chia đều tất cả các nhánh cho cân đối",ok:false,why:"Lãng phí thời gian vào nhánh đã biết là không quan trọng."},
      {t:"Thêm nhánh mới cho đủ năm nhánh",ok:false,why:"Số nhánh không phải mục tiêu."},
      {t:"Giữ nguyên cây ban đầu để nhất quán",ok:false,why:"Cây là công cụ tư duy, phải cập nhật theo dữ liệu."}]}
  ],
  recap:["Dừng khi nhánh tiếp theo không đổi hành động, hoặc đã chạm con số đo được.",
         "Đào sâu có chọn lọc — dữ liệu quyết định chỗ nào cần đào.",
         "Cây thật luôn lệch; cây cân đối thường là cây chưa dùng dữ liệu."],
  terms:[{en:"Drill down",vi:"Đào sâu",d:"Chia tiếp một nhánh cụ thể"},
         {en:"Pruning",vi:"Tỉa nhánh",d:"Đóng lại nhánh đã loại trừ bằng dữ liệu"},
         {en:"Actionability",vi:"Tính hành động được",d:"Mức độ một nhánh dẫn tới việc làm cụ thể"}]
},

{ id:"l-mece-4", module:"m-mece", order:4, minutes:6, xp:90,
  title:"Building a tree in 60 seconds", vi:"Dựng cây trong 60 giây",
  hook:{ q:"Người phỏng vấn vừa đọc xong đề. Bạn có một phút im lặng. Làm gì?",
         text:"Viết cây ra giấy. Không phải để gây ấn tượng — mà để bạn không đi lạc trong 20 phút tiếp theo." },
  core:[
   { h:"Quy trình bốn bước", hVi:"",
     body:"Nhận diện loại câu hỏi. Rút cây chuẩn tương ứng. Đặt tên nhánh bằng ngôn ngữ của chính doanh nghiệp trong đề. Nói to cây đó ra trước khi hỏi dữ liệu.",
     note:"Bước ba là chỗ phân biệt người thuộc lòng framework và người thật sự hiểu. 'Chi phí cố định' thành 'tiền thuê mặt bằng và lương quản lý cửa hàng'." },
   { h:"Nói cây ra trước khi phân tích", hVi:"",
     body:"Trình bày cây cho người nghe rồi mới bắt đầu hỏi dữ liệu. Điều này cho họ cơ hội chỉnh hướng bạn sớm, thay vì để bạn đi sai 15 phút.",
     note:"Câu chuẩn: 'Tôi muốn nhìn vấn đề này theo ba nhánh. Trước khi đi sâu, anh chị thấy cách chia này có bỏ sót gì không?'" },
   { h:"Cây là bản đồ, không phải bản án", hVi:"",
     body:"Khi dữ liệu cho thấy cây sai, sửa cây. Bám vào một cấu trúc sai chỉ vì đã trình bày nó là lỗi nghiêm trọng hơn nhiều so với việc chia sai lúc đầu.",
     note:"Câu chuẩn khi đổi hướng: 'Dữ liệu này cho thấy giả định ban đầu của tôi chưa đúng. Tôi muốn điều chỉnh cách nhìn như sau.'" }
  ],
  worked:{ title:"60 giây với đề: NIM của ngân hàng giảm từ 4,2% xuống 3,6%",
    steps:[
     {k:"0-10 giây — loại câu hỏi",v:"tài chính, có công thức rõ ràng"},
     {k:"10-20 giây — chọn cây",v:"cây công thức: NIM = lợi suất tài sản − chi phí vốn"},
     {k:"20-40 giây — đặt tên nhánh",v:"chi phí huy động: CASA giảm, lãi tiền gửi tăng"},
     {k:"",v:"lợi suất cho vay: cạnh tranh, dịch chuyển sang khách an toàn hơn"},
     {k:"",v:"cơ cấu tài sản: tiền đỗ vào trái phiếu lợi suất thấp"},
     {k:"40-55 giây — kiểm tra MECE",v:"ba nhánh phủ hết hai vế của công thức"},
     {k:"55-60 giây — nói ra",v:"trình bày cây, xin xác nhận, rồi mới hỏi dữ liệu"}],
    conclusion:"Một phút này quyết định 20 phút còn lại. Người không dựng cây sẽ hỏi dữ liệu ngẫu nhiên, nhận về một đống số rời rạc, và hết giờ trước khi kịp kết luận." },
  check:[
   { kind:"mcq", xp:30, question:"Giữa case, dữ liệu cho thấy nhánh bạn đặt cược không phải nguyên nhân. Nên làm gì?",
     options:[
      {t:"Nói rõ rằng giả định ban đầu chưa đúng, điều chỉnh cây và giải thích hướng mới",ok:true,why:"Cập nhật theo bằng chứng chính là năng lực được đánh giá cao nhất. Cây là bản đồ, không phải cam kết."},
      {t:"Tiếp tục theo cây ban đầu cho nhất quán",ok:false,why:"Bám vào cấu trúc sai vì đã trót trình bày là lỗi nghiêm trọng hơn việc chia sai lúc đầu."},
      {t:"Bỏ hẳn cây và hỏi dữ liệu tự do",ok:false,why:"Mất cấu trúc là mất luôn khả năng kết luận trong thời gian còn lại."},
      {t:"Xin lỗi và bắt đầu lại từ đầu",ok:false,why:"Lãng phí thời gian. Chỉ cần điều chỉnh nhánh sai, giữ phần còn lại."}]},
   { kind:"multi", xp:35, need:3, question:"Ba việc nào nên làm trong 60 giây đầu của một case?",
     note:"Chọn 3.",
     options:[
      {t:"Nhận diện loại câu hỏi để chọn cây phù hợp",ok:true,why:"Sai loại câu hỏi thì mọi phân tích sau đó đều lệch."},
      {t:"Đặt tên nhánh bằng ngôn ngữ của chính doanh nghiệp trong đề",ok:true,why:"Cho thấy bạn hiểu ngành, không chỉ thuộc lòng framework."},
      {t:"Trình bày cây và xin xác nhận trước khi hỏi dữ liệu",ok:true,why:"Cho người nghe cơ hội chỉnh hướng sớm thay vì để bạn đi sai 15 phút."},
      {t:"Hỏi ngay dữ liệu tài chính chi tiết",ok:false,why:"Chưa có cấu trúc thì không biết dữ liệu nào đáng hỏi."},
      {t:"Đưa ra giả thuyết về câu trả lời cuối",ok:false,why:"Quá sớm. Giả thuyết đến sau khi có cấu trúc, ở bài học module tiếp theo."},
      {t:"Liệt kê hết mọi framework mình biết",ok:false,why:"Gây rối và cho thấy chưa chọn được cách nhìn phù hợp."}]}
  ],
  recap:["Bốn bước: nhận diện loại câu hỏi, rút cây chuẩn, đặt tên nhánh theo ngành, nói ra.",
         "Trình bày cây trước khi hỏi dữ liệu để được chỉnh hướng sớm.",
         "Khi dữ liệu bác bỏ cây, sửa cây — đừng bảo vệ nó."],
  terms:[{en:"Structuring",vi:"Cấu trúc hoá",d:"Bước chia vấn đề trước khi phân tích"},
         {en:"Sanity check",vi:"Kiểm tra hợp lý",d:"Xác nhận cấu trúc không bỏ sót trước khi đi sâu"},
         {en:"Reframing",vi:"Đặt lại khung",d:"Điều chỉnh cách nhìn khi dữ liệu bác bỏ giả định"}]
}
]);

/* ================= MODULE 7 · HYPOTHESIS-LED THINKING ================= */
window.LESSONS = window.LESSONS.concat([

{ id:"l-hypo-1", module:"m-hypo", order:1, minutes:5, xp:70,
  title:"Hypothesis before data", vi:"Giả thuyết trước, dữ liệu sau",
  hook:{ q:"Bạn được cấp một kho dữ liệu 40 bảng. Mở bảng nào trước?",
         text:"Nếu chưa có giả thuyết, câu trả lời là 'không biết' — và bạn sẽ đọc hết 40 bảng mà vẫn không kết luận được gì." },
  core:[
   { h:"Hai cách làm việc", hVi:"",
     body:"Cách một: thu thập hết dữ liệu rồi tìm quy luật. Cách hai: đoán trước câu trả lời rồi tìm dữ liệu để xác nhận hoặc bác bỏ. Cách hai nhanh hơn nhiều lần.",
     note:"Giả thuyết là một câu khẳng định có thể sai. 'Biên lợi nhuận giảm vì cửa hàng mới thuê giá cao' là giả thuyết. 'Cần phân tích chi phí' thì không." },
   { h:"Giả thuyết tốt trông thế nào", hVi:"",
     body:"Cụ thể, có thể kiểm chứng bằng dữ liệu, và nếu đúng thì dẫn thẳng tới hành động.",
     example:{company:"shopee", text:"'Người bán lớn sẽ rời sàn nếu tăng phí' là giả thuyết kiểm chứng được: xem tỷ trọng doanh thu của họ đến từ sàn, và xem phản ứng của nhóm thử nghiệm."} },
   { h:"Giả thuyết ban đầu thường sai — và không sao cả", hVi:"",
     body:"Giá trị của giả thuyết không nằm ở việc nó đúng, mà ở việc nó cho bạn biết phải xem dữ liệu nào tiếp theo.",
     note:"Một giả thuyết sai bị bác bỏ nhanh có giá trị hơn nhiều so với việc lang thang trong dữ liệu không có hướng." }
  ],
  worked:{ title:"Từ triệu chứng tới giả thuyết kiểm chứng được",
    steps:[
     {k:"Triệu chứng",v:"biên EBITDA giảm từ 16% xuống 9%"},
     {k:"Giả thuyết 1",v:"chi phí nguyên liệu tăng"},
     {k:"Dữ liệu cần",v:"COGS theo % doanh thu, 2 năm"},
     {k:"Kết quả",v:"33% → 34%",note:"bác bỏ, chỉ +1 điểm"},
     {k:"Giả thuyết 2",v:"cửa hàng mới kéo biên xuống"},
     {k:"Dữ liệu cần",v:"doanh thu và tiền thuê theo tuổi cửa hàng"},
     {k:"Kết quả",v:"xác nhận",note:"30 cửa hàng mới, thuê +45%"}],
    conclusion:"Hai giả thuyết, hai lần gọi dữ liệu, mười phút. Cách làm ngược lại là đọc hết báo cáo rồi hy vọng nhận ra điều gì đó — thường mất hàng giờ và vẫn bỏ sót." },
  check:[
   { kind:"mcq", xp:30, question:"Đâu là một giả thuyết đúng nghĩa?",
     options:[
      {t:"Doanh thu giảm vì đối thủ mới mở 12 cửa hàng trong bán kính 2km",ok:true,why:"Cụ thể, kiểm chứng được bằng dữ liệu vị trí và doanh thu theo khu vực, và nếu đúng thì dẫn tới hành động rõ ràng."},
      {t:"Cần phân tích kỹ hơn tình hình cạnh tranh",ok:false,why:"Đây là một việc phải làm, không phải một khẳng định có thể sai."},
      {t:"Doanh nghiệp đang gặp khó khăn",ok:false,why:"Quá mơ hồ, không chỉ ra dữ liệu nào cần xem."},
      {t:"Thị trường đang thay đổi nhanh",ok:false,why:"Đúng với mọi thị trường ở mọi thời điểm — không kiểm chứng được."}]},
   { kind:"multi", xp:30, need:2, question:"Hai đặc điểm nào làm một giả thuyết hữu ích?",
     note:"Chọn 2.",
     options:[
      {t:"Có thể bị bác bỏ bằng một mẩu dữ liệu cụ thể",ok:true,why:"Nếu không có dữ liệu nào bác bỏ được nó, nó không phải giả thuyết mà là niềm tin."},
      {t:"Nếu đúng thì dẫn thẳng tới một hành động",ok:true,why:"Mục đích cuối là ra quyết định, không phải hiểu biết suông."},
      {t:"Nghe hợp lý với ban lãnh đạo",ok:false,why:"Giả thuyết dễ chịu thường là giả thuyết ít giá trị nhất."},
      {t:"Chắc chắn đúng",ok:false,why:"Nếu chắc chắn đúng thì không cần kiểm chứng — và nó không dạy bạn điều gì mới."},
      {t:"Bao quát được nhiều nguyên nhân cùng lúc",ok:false,why:"Giả thuyết bao quát thì không kiểm chứng được bằng một phép thử."}]}
  ],
  recap:["Giả thuyết là câu khẳng định có thể sai, không phải một việc phải làm.",
         "Giá trị của giả thuyết là chỉ ra dữ liệu nào cần xem tiếp theo.",
         "Bị bác bỏ nhanh tốt hơn lang thang trong dữ liệu không có hướng."],
  terms:[{en:"Hypothesis",vi:"Giả thuyết",d:"Câu trả lời dự kiến, có thể bị bác bỏ bằng dữ liệu"},
         {en:"Hypothesis-led",vi:"Dẫn dắt bởi giả thuyết",d:"Cách làm việc đoán trước rồi kiểm chứng"},
         {en:"Falsifiable",vi:"Bác bỏ được",d:"Có tồn tại dữ liệu chứng minh nó sai"}]
},

{ id:"l-hypo-2", module:"m-hypo", order:2, minutes:6, xp:80,
  title:"Designing the test", vi:"Thiết kế phép thử",
  hook:{ q:"Dữ liệu nào sẽ khiến bạn đổi ý?",
         text:"Nếu không trả lời được câu này, bạn chưa có giả thuyết — bạn có một định kiến." },
  core:[
   { h:"Câu hỏi vàng", hVi:"",
     body:"Trước khi mở bất kỳ bảng dữ liệu nào, hãy viết ra: nếu tôi thấy con số nào thì tôi sẽ kết luận giả thuyết này sai?",
     note:"Câu hỏi này ép bạn chọn đúng dữ liệu và bảo vệ bạn khỏi việc chỉ tìm bằng chứng ủng hộ." },
   { h:"Chọn dữ liệu có sức phân biệt cao nhất", hVi:"",
     body:"Dữ liệu tốt là dữ liệu mà kết quả của nó thay đổi kết luận. Dữ liệu mà dù ra sao bạn cũng kết luận như cũ thì không đáng xem.",
     example:{company:"highlands", text:"Khảo sát nhận biết thương hiệu không thể bác bỏ hay xác nhận giả thuyết về chi phí thuê. Cơ cấu chi phí theo % doanh thu thì có."} },
   { h:"Một phép thử, một biến", hVi:"",
     body:"Nếu bạn đổi giá và đổi cả bao bì cùng lúc rồi doanh số tăng, bạn không biết nguyên nhân nào. Trong phân tích cũng vậy: so sánh phải giữ mọi thứ khác không đổi.",
     note:"So sánh cửa hàng mới với cửa hàng cũ mà không tách yếu tố vị trí sẽ cho kết luận sai." }
  ],
  worked:{ title:"Thiết kế phép thử cho giả thuyết tăng phí sàn",
    steps:[
     {k:"Giả thuyết",v:"tăng take rate 2 điểm sẽ làm mất dưới 8% GMV"},
     {k:"Dữ liệu bác bỏ được",v:"tỷ lệ rời sàn của nhóm thử nghiệm"},
     {k:"Nhóm thử nghiệm",v:"5% người bán, chọn ngẫu nhiên theo ngành hàng"},
     {k:"Nhóm đối chứng",v:"5% giữ nguyên phí",note:"giữ mọi thứ khác không đổi"},
     {k:"Thời gian đo",v:"2 chu kỳ bán hàng"},
     {k:"Ngưỡng bác bỏ",v:"mất trên 12% GMV nhóm thử → dừng kế hoạch"},
     {k:"Chi phí phép thử",v:"nhỏ hơn nhiều so với sai lầm toàn sàn"}],
    conclusion:"Phép thử được thiết kế trước, với ngưỡng bác bỏ được ghi ra trước khi có kết quả. Đó là khác biệt giữa kiểm chứng và tự thuyết phục mình." },
  check:[
   { kind:"calc", xp:35, question:"Nhóm thử nghiệm: 2.000 người bán, sau khi tăng phí có 240 người rời sàn. Tỷ lệ rời là bao nhiêu phần trăm?",
     unit:"%", answer:12, tol:0.5, hint:"Số rời chia cho tổng nhóm thử nghiệm.",
     working:[{k:"Người bán rời",v:"240"},{k:"Tổng nhóm thử",v:"2.000"},{k:"Tỷ lệ rời",v:"240 ÷ 2.000 = 12%"}],
     why:"12% chạm đúng ngưỡng bác bỏ đã đặt ra từ trước. Vì ngưỡng được ghi trước khi có kết quả, quyết định dừng kế hoạch trở nên rõ ràng — không còn chỗ cho việc tự thuyết phục rằng 12% vẫn chấp nhận được." },
   { kind:"mcq", xp:30, question:"Bạn tin rằng doanh thu giảm vì đối thủ mới. Dữ liệu nào có sức phân biệt cao nhất?",
     options:[
      {t:"So sánh doanh thu ở khu vực có đối thủ mới và khu vực không có",ok:true,why:"Nếu cả hai khu vực giảm như nhau thì giả thuyết bị bác bỏ ngay. Đây là dữ liệu có thể đổi kết luận."},
      {t:"Tổng doanh thu toàn quốc theo tháng",ok:false,why:"Cho thấy có giảm nhưng không phân biệt được nguyên nhân."},
      {t:"Khảo sát mức độ hài lòng của khách hàng",ok:false,why:"Kết quả ra sao cũng khó bác bỏ giả thuyết về đối thủ."},
      {t:"Báo cáo ngành từ công ty nghiên cứu thị trường",ok:false,why:"Bối cảnh hữu ích nhưng quá thô để kiểm chứng một giả thuyết cụ thể."}]}
  ],
  recap:["Trước khi xem dữ liệu, viết ra: con số nào sẽ khiến tôi đổi ý?",
         "Dữ liệu tốt là dữ liệu mà kết quả của nó thay đổi kết luận.",
         "Đặt ngưỡng bác bỏ TRƯỚC khi có kết quả."],
  terms:[{en:"Disconfirming evidence",vi:"Bằng chứng bác bỏ",d:"Dữ liệu chứng minh giả thuyết sai"},
         {en:"Control group",vi:"Nhóm đối chứng",d:"Nhóm không bị tác động, dùng để so sánh"},
         {en:"Decision threshold",vi:"Ngưỡng quyết định",d:"Mức số liệu định trước để đổi hướng"}]
},

{ id:"l-hypo-3", module:"m-hypo", order:3, minutes:5, xp:80,
  title:"Avoiding confirmation bias", vi:"Tránh bẫy tự xác nhận",
  hook:{ q:"Bạn tìm được ba bằng chứng ủng hộ giả thuyết của mình. Đủ chưa?",
         text:"Chưa, nếu bạn chưa đi tìm bằng chứng chống lại nó. Ba bằng chứng ủng hộ và không có bằng chứng phản bác nào được tìm kiếm là mẫu hình của một kết luận sai." },
  core:[
   { h:"Bẫy tự xác nhận", hVi:"Confirmation bias",
     body:"Xu hướng chỉ chú ý tới dữ liệu ủng hộ điều mình đã tin. Nó không phải sự thiếu trung thực — nó là cách bộ não hoạt động, kể cả với người rất giỏi.",
     note:"Dấu hiệu: bạn thấy phân tích 'trôi chảy' và mọi dữ liệu đều khớp. Thực tế hiếm khi gọn gàng như vậy." },
   { h:"Ba cách chống lại", hVi:"",
     body:"Một: viết ngưỡng bác bỏ trước. Hai: chủ động tìm dữ liệu có thể phản bác. Ba: nhờ người khác tấn công kết luận của bạn.",
     note:"Câu hỏi tự vấn mạnh nhất: nếu tôi phải chứng minh điều ngược lại, tôi sẽ tìm dữ liệu nào?" },
   { h:"Tương quan không phải nhân quả", hVi:"",
     body:"Hai chỉ số cùng đi xuống không có nghĩa cái này gây ra cái kia. Có thể cả hai đều do một nguyên nhân thứ ba, hoặc chỉ là trùng hợp.",
     example:{company:"mwg", text:"Doanh thu giảm cùng lúc với việc đổi bố cục cửa hàng — nhưng cùng thời điểm đó thị trường điện thoại toàn ngành cũng suy giảm. Cần tách hai yếu tố trước khi kết luận."} }
  ],
  worked:{ title:"Kiểm tra chéo một kết luận",
    steps:[
     {k:"Kết luận ban đầu",v:"doanh thu giảm do chất lượng dịch vụ kém đi"},
     {k:"Bằng chứng ủng hộ",v:"điểm hài lòng giảm từ 4,5 xuống 4,2"},
     {k:"Câu hỏi phản biện",v:"nếu ngược lại thì dữ liệu nào cho thấy?"},
     {k:"Kiểm tra 1",v:"đối thủ cùng khu vực có giảm không?",note:"giảm tương tự → yếu tố ngành"},
     {k:"Kiểm tra 2",v:"cửa hàng điểm hài lòng cao có giảm doanh thu không?",note:"có → không phải dịch vụ"},
     {k:"Kiểm tra 3",v:"thời điểm giảm doanh thu và giảm hài lòng, cái nào trước?",note:"doanh thu giảm trước"},
     {k:"Kết luận sửa lại",v:"dịch vụ kém là HỆ QUẢ của cắt nhân sự sau khi doanh thu giảm"}],
    conclusion:"Ba câu hỏi phản biện đã đảo ngược chiều nhân quả. Nếu dừng lại ở bằng chứng ủng hộ đầu tiên, giải pháp đưa ra sẽ là đào tạo nhân viên — trong khi nguyên nhân thật nằm ở chỗ hoàn toàn khác." },
  check:[
   { kind:"mcq", xp:30, question:"Doanh số tăng sau khi công ty đổi bao bì. Kết luận nào cẩn trọng nhất?",
     options:[
      {t:"Cần kiểm tra xem có thay đổi nào khác cùng thời điểm không trước khi quy công cho bao bì",ok:true,why:"Có thể cùng lúc có khuyến mãi, mùa vụ, hoặc đối thủ gặp sự cố. Tương quan chưa phải nhân quả."},
      {t:"Bao bì mới hiệu quả, nên áp dụng cho toàn bộ danh mục",ok:false,why:"Kết luận nhân quả từ một quan sát trùng thời điểm — chính là bẫy cần tránh."},
      {t:"Doanh số tăng là do thị trường tốt lên",ok:false,why:"Cũng là một kết luận vội vàng, chỉ theo hướng ngược lại."},
      {t:"Cần khảo sát khách hàng xem họ có thích bao bì không",ok:false,why:"Ý kiến về bao bì không chứng minh được nó gây ra tăng doanh số."}]},
   { kind:"multi", xp:35, need:3, question:"Ba cách nào giúp chống lại bẫy tự xác nhận?",
     note:"Chọn 3.",
     options:[
      {t:"Viết ngưỡng bác bỏ trước khi xem dữ liệu",ok:true,why:"Khoá lại tiêu chí khi bạn còn khách quan."},
      {t:"Chủ động tìm dữ liệu có thể phản bác kết luận của mình",ok:true,why:"Đảo ngược hướng tìm kiếm mặc định của bộ não."},
      {t:"Nhờ người khác tấn công kết luận",ok:true,why:"Người ngoài không có chi phí tâm lý khi bác bỏ giả thuyết của bạn."},
      {t:"Thu thập càng nhiều bằng chứng ủng hộ càng tốt",ok:false,why:"Chính là hành vi của bẫy tự xác nhận."},
      {t:"Trình bày kết luận thật tự tin",ok:false,why:"Tự tin không làm kết luận đúng hơn."},
      {t:"Chọn dữ liệu từ nguồn mình tin tưởng",ok:false,why:"Lọc nguồn theo mức độ đồng thuận là một dạng khác của cùng cái bẫy."}]}
  ],
  recap:["Phân tích trôi chảy quá mức thường là dấu hiệu của bẫy tự xác nhận.",
         "Hỏi: nếu phải chứng minh điều ngược lại, tôi sẽ tìm dữ liệu nào?",
         "Tương quan không phải nhân quả — luôn kiểm tra thứ tự thời gian và yếu tố thứ ba."],
  terms:[{en:"Confirmation bias",vi:"Bẫy tự xác nhận",d:"Chỉ chú ý dữ liệu ủng hộ điều mình đã tin"},
         {en:"Correlation vs causation",vi:"Tương quan và nhân quả",d:"Cùng biến động không có nghĩa cái này gây ra cái kia"},
         {en:"Reverse causality",vi:"Nhân quả ngược",d:"Chiều tác động ngược với giả định ban đầu"}]
},

{ id:"l-hypo-4", module:"m-hypo", order:4, minutes:5, xp:90,
  title:"Updating vs defending", vi:"Cập nhật hay bảo vệ",
  hook:{ q:"Bạn đã trình bày giả thuyết với sếp. Ba ngày sau, dữ liệu bác bỏ nó. Bạn làm gì?",
         text:"Câu trả lời cho câu hỏi này phân biệt một nhà phân tích với một người biện hộ." },
  core:[
   { h:"Chi phí chìm trong tư duy", hVi:"",
     body:"Càng bỏ nhiều công vào một giả thuyết, càng khó từ bỏ nó. Nhưng thời gian đã bỏ ra không làm giả thuyết đúng hơn.",
     note:"Câu hỏi đúng không phải 'tôi đã đầu tư bao nhiêu vào ý này' mà là 'nếu hôm nay mới bắt đầu, tôi có tin nó không'." },
   { h:"Cập nhật đúng cách", hVi:"",
     body:"Nêu rõ giả thuyết cũ, nêu bằng chứng bác bỏ, nêu giả thuyết mới. Không giấu, không lướt qua, không đổ lỗi cho dữ liệu.",
     note:"Cách nói: 'Ban đầu tôi cho rằng X. Dữ liệu Y cho thấy điều đó không đúng, vì Z. Tôi chuyển sang giả thuyết mới là W.'" },
   { h:"Khi nào nên giữ giả thuyết", hVi:"",
     body:"Khi bằng chứng phản bác yếu về mặt chất lượng: mẫu quá nhỏ, đo sai chỉ số, hoặc thời gian quan sát chưa đủ. Nhưng phải nói rõ vì sao bạn không đổi ý.",
     note:"Giữ giả thuyết vì có lý do là kỷ luật. Giữ vì đã trót nói ra là cố chấp." }
  ],
  worked:{ title:"Hai cách phản ứng với bằng chứng bác bỏ",
    steps:[
     {k:"Giả thuyết",v:"khách rời vì giá cao"},
     {k:"Dữ liệu mới",v:"nhóm khách giá nhạy nhất lại ở lại nhiều nhất"},
     {k:"Phản ứng A",v:"'dữ liệu này chắc có vấn đề'",note:"biện hộ"},
     {k:"Kết quả A",v:"giải pháp giảm giá, doanh thu giảm, khách vẫn rời"},
     {k:"Phản ứng B",v:"'vậy nguyên nhân không phải giá — xem lại trải nghiệm'"},
     {k:"Kiểm tra tiếp",v:"thời gian chờ tăng gấp đôi ở nhóm rời bỏ"},
     {k:"Kết quả B",v:"sửa quy trình phục vụ, giữ được khách và giữ được giá"}],
    conclusion:"Cùng một dữ liệu, hai phản ứng, hai kết cục ngược nhau. Chi phí của việc bảo vệ một giả thuyết sai không phải là mất mặt — mà là một giải pháp sai được triển khai bằng tiền thật." },
  check:[
   { kind:"mcq", xp:35, question:"Bằng chứng mới mâu thuẫn với giả thuyết bạn đã trình bày. Cách xử lý tốt nhất?",
     options:[
      {t:"Nêu rõ giả thuyết cũ, bằng chứng bác bỏ, và giả thuyết mới thay thế",ok:true,why:"Minh bạch về quá trình suy nghĩ làm tăng độ tin cậy, không giảm. Người nghe quan tâm tới kết luận đúng, không phải tới việc bạn đúng ngay từ đầu."},
      {t:"Giữ nguyên kết luận vì đã trình bày rồi",ok:false,why:"Chi phí chìm trong tư duy. Thời gian đã bỏ ra không làm giả thuyết đúng hơn."},
      {t:"Lặng lẽ đổi kết luận mà không nhắc tới giả thuyết cũ",ok:false,why:"Người nghe sẽ mất phương hướng và mất niềm tin khi phát hiện ra."},
      {t:"Nghi ngờ chất lượng dữ liệu mới",ok:false,why:"Chỉ hợp lý nếu có lý do cụ thể về mẫu hoặc cách đo — không phải phản xạ mặc định."}]},
   { kind:"mcq", xp:30, question:"Khi nào việc GIỮ giả thuyết dù có bằng chứng phản bác là hợp lý?",
     options:[
      {t:"Khi bằng chứng phản bác có vấn đề về chất lượng: mẫu quá nhỏ, đo sai chỉ số, hoặc quan sát chưa đủ lâu",ok:true,why:"Đây là kỷ luật phân tích chứ không phải cố chấp — nhưng phải nói rõ lý do vì sao không đổi ý."},
      {t:"Khi bạn đã dành nhiều thời gian cho giả thuyết đó",ok:false,why:"Chi phí chìm, không liên quan tới việc giả thuyết đúng hay sai."},
      {t:"Khi sếp đã đồng ý với giả thuyết",ok:false,why:"Sự đồng thuận không phải bằng chứng."},
      {t:"Khi chưa có giả thuyết nào tốt hơn",ok:false,why:"Không có phương án thay thế không làm phương án hiện tại đúng lên."}]}
  ],
  recap:["Thời gian đã bỏ ra không làm giả thuyết đúng hơn.",
         "Cập nhật đúng cách: nêu giả thuyết cũ, bằng chứng bác bỏ, giả thuyết mới.",
         "Giữ giả thuyết vì có lý do là kỷ luật; giữ vì đã trót nói là cố chấp."],
  terms:[{en:"Sunk cost fallacy",vi:"Bẫy chi phí chìm",d:"Tiếp tục vì đã đầu tư, không vì nó đúng"},
         {en:"Updating",vi:"Cập nhật niềm tin",d:"Điều chỉnh kết luận theo bằng chứng mới"},
         {en:"Intellectual honesty",vi:"Trung thực trí tuệ",d:"Nói rõ mình đã sai ở đâu và vì sao"}]
}
]);

/* ================= MODULE 8 · CASE MATH ================= */
window.LESSONS = window.LESSONS.concat([

{ id:"l-math-1", module:"m-math", order:1, minutes:5, xp:70,
  title:"Round before you calculate", vi:"Làm tròn trước khi tính",
  hook:{ q:"Thị trường 97,3 triệu dân, 38,7% đô thị, 23,4% dùng sản phẩm. Tính nhanh đi.",
         text:"Đừng nhân ba số đó. Làm tròn thành 100 triệu, 40%, 25% — kết quả 10 triệu, sai số dưới 10%, và bạn tính xong trong ba giây." },
  core:[
   { h:"Độ chính xác giả tạo", hVi:"False precision",
     body:"Trong case, mọi đầu vào đều là ước lượng. Nhân ba ước lượng với nhau rồi báo cáo bốn chữ số có nghĩa là tự lừa mình và người nghe.",
     note:"Nếu đầu vào sai 20%, kết quả sai 20%. Thêm chữ số thập phân không sửa được điều đó." },
   { h:"Làm tròn về số dễ nhân", hVi:"",
     body:"Làm tròn về 1, 2, 2,5, 4, 5, 10 hoặc bội số của chúng. Đây là những số mà phép nhân và chia có thể làm trong đầu.",
     note:"97,3 → 100.  38,7% → 40%.  23,4% → 25% (vì 1/4).  0,78 → 0,8.  1,15 → 1,2 nếu chỉ cần bậc độ lớn." },
   { h:"Theo dõi hướng sai số", hVi:"",
     body:"Ghi nhớ mình làm tròn lên hay xuống. Nếu làm tròn lên ở cả ba bước, kết quả sẽ cao hơn thực tế và bạn nên nói rõ điều đó.",
     example:{company:"vinamilk", text:"Trong case ước lượng thị trường sữa hạt, làm tròn 40 triệu dân đô thị và 25% thâm nhập đều là làm tròn lên — nên con số 12,5 nghìn tỷ nên được trình bày như giới hạn trên."} }
  ],
  worked:{ title:"Ước lượng nhanh với số làm tròn",
    steps:[
     {k:"Đề bài",v:"97,3 triệu dân · 38,7% đô thị · 23,4% dùng"},
     {k:"Làm tròn",v:"100 triệu · 40% · 25%"},
     {k:"Bước 1",v:"100 × 0,4 = 40 triệu"},
     {k:"Bước 2",v:"40 × 0,25 = 10 triệu người dùng"},
     {k:"Kết quả chính xác",v:"8,81 triệu"},
     {k:"Sai số",v:"+13%",note:"chấp nhận được cho ước lượng"},
     {k:"Cách trình bày",v:"'khoảng 9-10 triệu người'"}],
    conclusion:"Trình bày một khoảng thay vì một con số giả chính xác. Người nghe hiểu ngay rằng bạn biết đây là ước lượng, và không ai đi kiểm tra chữ số thập phân của bạn." },
  check:[
   { kind:"calc", xp:35, question:"Ước lượng nhanh: 4.850 cửa hàng × 1,92 tỷ doanh thu mỗi cửa hàng. Kết quả xấp xỉ bao nhiêu nghìn tỷ?",
     unit:"nghìn tỷ", answer:9.3, tol:0.8, hint:"Làm tròn 4.850 thành 5.000 và 1,92 thành 2. Rồi điều chỉnh xuống một chút.",
     working:[{k:"Làm tròn",v:"5.000 × 2 = 10.000 tỷ"},{k:"Cả hai đều làm tròn lên",v:"kết quả thật thấp hơn"},{k:"Chính xác",v:"4.850 × 1,92 = 9.312 tỷ"},{k:"Trình bày",v:"khoảng 9-10 nghìn tỷ"}],
     why:"Phép tính làm tròn cho 10.000 tỷ trong ba giây, lệch 7% so với con số thật. Trong một buổi case, tốc độ đó đáng giá hơn nhiều so với độ chính xác thừa." },
   { kind:"mcq", xp:30, question:"Bạn ước lượng thị trường ra 12.480 tỷ. Nên trình bày thế nào?",
     options:[
      {t:"Khoảng 10-15 nghìn tỷ, và nêu rõ giả định nhạy cảm nhất",ok:true,why:"Khoảng thể hiện đúng mức độ chắc chắn thật. Nêu giả định nhạy cảm cho người nghe biết con số có thể sai theo hướng nào."},
      {t:"Chính xác 12.480 tỷ đồng",ok:false,why:"Độ chính xác giả tạo. Không ai tin một ước lượng có bốn chữ số có nghĩa."},
      {t:"Khoảng 12,48 nghìn tỷ",ok:false,why:"Vẫn là độ chính xác giả tạo, chỉ đổi đơn vị."},
      {t:"Rất lớn, cần nghiên cứu thêm",ok:false,why:"Bỏ đi toàn bộ giá trị của việc đã ước lượng."}]}
  ],
  recap:["Làm tròn về số dễ nhân trước khi tính: 1, 2, 2,5, 4, 5, 10.",
         "Ghi nhớ hướng làm tròn để biết kết quả lệch lên hay xuống.",
         "Trình bày một khoảng, không phải một con số giả chính xác."],
  terms:[{en:"Order of magnitude",vi:"Bậc độ lớn",d:"Mức độ lớn tính theo bội số của 10"},
         {en:"False precision",vi:"Độ chính xác giả tạo",d:"Nhiều chữ số hơn mức dữ liệu cho phép"},
         {en:"Estimation range",vi:"Khoảng ước lượng",d:"Trình bày kết quả dưới dạng khoảng"}]
},

{ id:"l-math-2", module:"m-math", order:2, minutes:6, xp:80,
  title:"Percentages without a calculator", vi:"Tính phần trăm không cần máy tính",
  hook:{ q:"Biên đóng góp 30%, giảm giá 10%. Biên mới còn bao nhiêu phần trăm của biên cũ?",
         text:"Không phải 90%. Đây là phép tính mà rất nhiều người làm sai dưới áp lực — và nó xuất hiện trong gần như mọi case về giá." },
  core:[
   { h:"Phần trăm của cái gì", hVi:"",
     body:"Sai lầm phổ biến nhất là nhầm mẫu số. Giảm giá 10% là 10% của GIÁ BÁN, nhưng nó lấy đi một phần lớn hơn nhiều của BIÊN LỢI NHUẬN.",
     note:"Giá 100, chi phí biến đổi 70, biên 30.\nGiảm giá 10% → giá 90, biên 20.\nBiên giảm 33%, không phải 10%." },
   { h:"Ba mẹo tính nhẩm", hVi:"",
     body:"Chia nhỏ phần trăm: 15% = 10% + 5%. Đảo vế: 8% của 250 bằng 250% của 8. Dùng phân số: 25% = 1/4, 33% = 1/3, 12,5% = 1/8.",
     note:"18% của 450 = 10% (45) + 5% (22,5) + 3% (13,5) = 81. Nhanh hơn nhân trực tiếp." },
   { h:"Tăng rồi giảm không về chỗ cũ", hVi:"",
     body:"Tăng 20% rồi giảm 20% không quay về giá ban đầu — nó về 96%. Vì phần giảm tính trên nền đã cao hơn.",
     note:"100 → +20% → 120 → −20% → 96. Sai lầm này xuất hiện nhiều trong các bài toán về chuỗi thay đổi giá." }
  ],
  worked:{ title:"Vì sao giảm giá 10% lại nguy hiểm",
    steps:[
     {k:"Giá bán",v:"200.000đ"},
     {k:"Chi phí biến đổi",v:"140.000đ"},
     {k:"Biên đóng góp",v:"60.000đ = 30% giá bán"},
     {k:"Giảm giá 10%",v:"giá còn 180.000đ"},
     {k:"Chi phí biến đổi",v:"không đổi, vẫn 140.000đ"},
     {k:"Biên đóng góp mới",v:"40.000đ"},
     {k:"Biên giảm",v:"33%",note:"gấp hơn ba lần mức giảm giá"},
     {k:"Sản lượng cần tăng để hoà",v:"50%"}],
    conclusion:"Quy tắc cần nhớ: mức giảm biên lợi nhuận bằng mức giảm giá chia cho tỷ lệ biên. Giảm 10% với biên 30% làm biên giảm 33%. Với biên 20% thì biên giảm 50%. Biên càng mỏng, giảm giá càng chết người." },
  check:[
   { kind:"calc", xp:35, question:"Giá bán 500.000đ, chi phí biến đổi 400.000đ. Nếu giảm giá 5%, biên đóng góp giảm bao nhiêu phần trăm?",
     unit:"%", answer:25, tol:2, hint:"Tính biên trước và sau. Mức giảm giá tuyệt đối lấy trực tiếp từ biên.",
     working:[{k:"Biên trước",v:"500 − 400 = 100 nghìn"},{k:"Giảm giá 5%",v:"25 nghìn"},{k:"Biên sau",v:"100 − 25 = 75 nghìn"},{k:"Mức giảm biên",v:"25 ÷ 100 = 25%"}],
     why:"Giảm giá 5% làm biên giảm 25% — gấp năm lần, vì biên chỉ chiếm 20% giá bán. Đây là lý do doanh nghiệp biên mỏng gần như không bao giờ nên cạnh tranh bằng giá." },
   { kind:"calc", xp:35, question:"Một chỉ số tăng 25% rồi sau đó giảm 20%. So với ban đầu, nó ở mức bao nhiêu phần trăm?",
     unit:"%", answer:100, tol:2, hint:"100 × 1,25 × 0,80.",
     working:[{k:"Sau khi tăng 25%",v:"100 → 125"},{k:"Giảm 20% của 125",v:"−25"},{k:"Kết quả",v:"100",note:"đúng bằng ban đầu"}],
     why:"Trường hợp này quay về đúng điểm xuất phát vì 1,25 × 0,8 = 1. Nhưng nếu tăng 20% rồi giảm 20% thì chỉ còn 96 — hãy luôn nhân, đừng cộng trừ phần trăm." }
  ],
  recap:["Luôn hỏi: phần trăm này tính trên mẫu số nào?",
         "Mức giảm biên = mức giảm giá ÷ tỷ lệ biên. Biên mỏng thì giảm giá rất nguy hiểm.",
         "Phần trăm phải nhân với nhau, không cộng trừ."],
  terms:[{en:"Percentage point",vi:"Điểm phần trăm",d:"Chênh lệch tuyệt đối giữa hai tỷ lệ"},
         {en:"Base effect",vi:"Hiệu ứng nền",d:"Kết quả phụ thuộc vào mẫu số dùng để tính"},
         {en:"Margin erosion",vi:"Bào mòn biên",d:"Mức giảm biên lợi nhuận do giảm giá"}]
},

{ id:"l-math-3", module:"m-math", order:3, minutes:5, xp:80,
  title:"Sanity checks", vi:"Kiểm tra tính hợp lý",
  hook:{ q:"Bạn tính ra thị trường cà phê Việt Nam là 800 nghìn tỷ đồng. Đúng hay sai?",
         text:"Sai. Con số đó lớn hơn nhiều so với tổng chi tiêu thực phẩm cả nước. Một phép kiểm tra 5 giây đã bắt được lỗi mà ba phút tính toán không thấy." },
  core:[
   { h:"Neo vào con số bạn biết chắc", hVi:"",
     body:"Luôn có vài con số bạn nhớ được: dân số 100 triệu, GDP khoảng 450 tỷ USD, thu nhập bình quân khoảng 4.500 USD/năm. Mọi ước lượng phải hợp lý so với chúng.",
     note:"Nếu thị trường bạn ước lượng lớn hơn 5% GDP, gần như chắc chắn bạn đã sai ở đâu đó." },
   { h:"Kiểm tra ngược từ mỗi người", hVi:"Per-capita check",
     body:"Chia kết quả cho số người rồi hỏi: con số này có hợp lý với một người bình thường không?",
     example:{company:"vinamilk", text:"Thị trường sữa hạt 12,5 nghìn tỷ chia cho 10 triệu người dùng là 1,25 triệu/năm, tức khoảng 100 nghìn mỗi tháng — khoảng 8 hộp. Hoàn toàn hợp lý."} },
   { h:"Kiểm tra bằng phương pháp thứ hai", hVi:"",
     body:"Nếu tính top-down, thử lại bằng bottom-up. Hai con số không cần trùng nhau, nhưng phải cùng bậc độ lớn.",
     note:"Lệch nhau 30% là bình thường. Lệch nhau 10 lần nghĩa là một trong hai phương pháp có giả định sai nghiêm trọng." }
  ],
  worked:{ title:"Ba phép kiểm tra cho một ước lượng",
    steps:[
     {k:"Kết quả cần kiểm",v:"thị trường sữa hạt 12,5 nghìn tỷ"},
     {k:"Kiểm tra 1 — so với GDP",v:"GDP ~11 triệu tỷ → chiếm 0,11%",note:"hợp lý"},
     {k:"Kiểm tra 2 — mỗi người dùng",v:"1,25 triệu/năm ≈ 8 hộp/tháng",note:"hợp lý"},
     {k:"Kiểm tra 3 — so ngành liền kề",v:"thị trường sữa nước ~60 nghìn tỷ"},
     {k:"Tỷ lệ",v:"sữa hạt bằng ~20% sữa nước",note:"hợp lý cho một ngành hàng mới"},
     {k:"Kết luận",v:"ước lượng qua được cả ba phép kiểm tra"}],
    conclusion:"Ba phép kiểm tra mất chưa tới một phút và làm tăng đáng kể độ tin cậy của kết luận. Trong một buổi phỏng vấn, việc chủ động tự kiểm tra được đánh giá cao hơn nhiều so với việc ra đúng con số ngay từ đầu." },
  check:[
   { kind:"mcq", xp:30, question:"Bạn ước lượng thị trường dịch vụ gọi xe Việt Nam là 500 nghìn tỷ/năm. Phép kiểm tra nào bắt được lỗi nhanh nhất?",
     options:[
      {t:"Chia cho 100 triệu dân: 5 triệu đồng mỗi người mỗi năm cho gọi xe — quá cao",ok:true,why:"Phép kiểm tra theo đầu người lộ ra ngay rằng con số này hàm ý mỗi người Việt chi hơn 400 nghìn mỗi tháng cho gọi xe."},
      {t:"So với doanh thu của một hãng gọi xe",ok:false,why:"Hữu ích nhưng chậm hơn, và bạn có thể không nhớ con số đó."},
      {t:"Tính lại phép nhân",ok:false,why:"Nếu giả định sai thì tính lại vẫn ra con số sai."},
      {t:"Hỏi người phỏng vấn xem đúng không",ok:false,why:"Bỏ lỡ cơ hội thể hiện khả năng tự kiểm tra."}]},
   { kind:"calc", xp:35, question:"Bạn ước lượng thị trường X là 45 nghìn tỷ/năm với 15 triệu người dùng. Chi tiêu bình quân mỗi người mỗi tháng là bao nhiêu nghìn đồng?",
     unit:"nghìn đồng", answer:250, tol:15, hint:"Chia cho số người, rồi chia cho 12 tháng.",
     working:[{k:"Mỗi người mỗi năm",v:"45.000 tỷ ÷ 15 triệu = 3 triệu đồng"},{k:"Mỗi tháng",v:"3.000.000 ÷ 12 = 250.000đ"}],
     why:"250 nghìn mỗi tháng là con số cụ thể mà bạn có thể tự đánh giá hợp lý hay không — khác hẳn với con số 45 nghìn tỷ vốn quá lớn để trực giác kiểm tra được." }
  ],
  recap:["Neo vào vài con số bạn nhớ chắc: dân số, GDP, thu nhập bình quân.",
         "Chia kết quả cho số người — trực giác kiểm tra được con số nhỏ, không kiểm tra được con số nghìn tỷ.",
         "Kiểm lại bằng phương pháp thứ hai; lệch 30% là bình thường, lệch 10 lần là sai."],
  terms:[{en:"Sanity check",vi:"Kiểm tra hợp lý",d:"Phép thử nhanh xem kết quả có vô lý không"},
         {en:"Per-capita",vi:"Bình quân đầu người",d:"Chia kết quả cho số người để kiểm tra"},
         {en:"Cross-check",vi:"Kiểm tra chéo",d:"Tính lại bằng phương pháp khác"}]
},

{ id:"l-math-4", module:"m-math", order:4, minutes:5, xp:90,
  title:"Doing math out loud", vi:"Tính toán trước mặt người khác",
  hook:{ q:"Bạn cần 40 giây để làm phép tính. Nên im lặng hay nói ra?",
         text:"Nói ra — nhưng nói cấu trúc, không nói từng con số. Người nghe cần biết bạn đang đi đâu, không cần nghe bạn lẩm nhẩm." },
  core:[
   { h:"Nói kế hoạch trước khi tính", hVi:"",
     body:"Câu mở: 'Tôi sẽ tính theo ba bước: sản lượng hoà vốn, so với sản lượng hiện tại, rồi ra khoảng cách.' Sau đó mới im lặng tính.",
     note:"Điều này cho người nghe biết bạn có hướng đi, và cho họ cơ hội chặn lại nếu hướng sai — trước khi bạn tốn 40 giây." },
   { h:"Xin thời gian một cách bình thường", hVi:"",
     body:"'Cho tôi khoảng 30 giây để tính' là câu hoàn toàn chuyên nghiệp. Vừa tính vừa nói lắp bắp thì tệ hơn nhiều so với im lặng có báo trước.",
     note:"Im lặng có thông báo là bình tĩnh. Im lặng đột ngột là bối rối." },
   { h:"Báo kết quả kèm ý nghĩa", hVi:"",
     body:"Đừng chỉ nói con số. Nói con số rồi nói ngay nó có nghĩa gì cho quyết định đang bàn.",
     example:{company:"vinfast", text:"'Điểm hoà vốn là khoảng 86.000 xe một năm — gấp hơn hai lần sản lượng hiện tại, nghĩa là câu hỏi thật không phải công nghệ mà là đủ vốn đi hết quãng đường đó không.'"} }
  ],
  worked:{ title:"Kịch bản trình bày một phép tính",
    steps:[
     {k:"Bước 1 — nói kế hoạch",v:"'Tôi sẽ so lợi nhuận đóng góp mỗi chuyến với chi phí chuyến'"},
     {k:"Bước 2 — xin thời gian",v:"'Cho tôi 30 giây'"},
     {k:"Bước 3 — tính im lặng",v:"195 khách × 3,5 triệu = 684 triệu"},
     {k:"Bước 4 — báo kết quả",v:"'Đóng góp khoảng 64 triệu mỗi chuyến'"},
     {k:"Bước 5 — nói ý nghĩa",v:"'Tức hơn 46 tỷ mỗi năm nếu chạy đủ tần suất'"},
     {k:"Bước 6 — nêu điều đáng lo",v:"'Nhưng load factor hoà vốn là 77%, biên an toàn chỉ 8 điểm'"}],
    conclusion:"Sáu bước, chưa tới một phút. Điểm quan trọng nhất là bước 5 và 6: con số không tự nói lên điều gì, người phân tích phải nói hộ nó." },
  check:[
   { kind:"mcq", xp:35, question:"Bạn vừa tính ra điểm hoà vốn là 86.000 xe/năm. Cách báo kết quả nào tốt nhất?",
     options:[
      {t:"'Khoảng 86.000 xe — gấp hơn hai lần sản lượng hiện tại, nên câu hỏi thật là có đủ vốn đi tới đó không'",ok:true,why:"Con số kèm ý nghĩa kèm hàm ý cho quyết định. Đây là ba tầng mà một người phân tích giỏi luôn nói đủ."},
      {t:"'86.000 xe mỗi năm'",ok:false,why:"Đúng nhưng để người nghe tự suy ra ý nghĩa — lãng phí cơ hội thể hiện tư duy."},
      {t:"'Khoảng 85.714 xe mỗi năm'",ok:false,why:"Độ chính xác giả tạo trên một phép tính đầy giả định."},
      {t:"'Rất cao so với hiện tại'",ok:false,why:"Bỏ mất con số — người nghe không đánh giá được mức độ."}]},
   { kind:"multi", xp:35, need:2, question:"Hai việc nào nên làm trước khi bắt đầu một phép tính dài?",
     note:"Chọn 2.",
     options:[
      {t:"Nói ra các bước mình định làm",ok:true,why:"Cho người nghe biết hướng đi và cơ hội chặn lại nếu sai hướng."},
      {t:"Xin thời gian im lặng để tính",ok:true,why:"Im lặng có báo trước thể hiện sự bình tĩnh; im lặng đột ngột thì không."},
      {t:"Xin luôn đáp án gợi ý",ok:false,why:"Bỏ mất chính phần đang được đánh giá."},
      {t:"Vừa tính vừa nói từng con số trung gian",ok:false,why:"Gây rối cho người nghe và làm bạn dễ mất tập trung."},
      {t:"Bỏ qua phép tính và ước lượng bằng cảm giác",ok:false,why:"Case math tồn tại chính là để kiểm tra khả năng định lượng."}]}
  ],
  recap:["Nói kế hoạch trước, tính im lặng, rồi báo kết quả.",
         "'Cho tôi 30 giây' là câu hoàn toàn chuyên nghiệp.",
         "Con số không tự nói lên điều gì — luôn kèm ý nghĩa và hàm ý cho quyết định."],
  terms:[{en:"Thinking out loud",vi:"Nói ra suy nghĩ",d:"Trình bày cấu trúc suy nghĩ cho người nghe"},
         {en:"So what",vi:"Ý nghĩa là gì",d:"Hàm ý của một con số cho quyết định"},
         {en:"Signposting",vi:"Báo hiệu",d:"Nói trước mình sắp làm gì"}]
}
]);

/* ================= MODULE 9 · SYNTHESIS ================= */
window.LESSONS = window.LESSONS.concat([

{ id:"l-synth-1", module:"m-synth", order:1, minutes:5, xp:70,
  title:"Answer first", vi:"Câu trả lời trước",
  hook:{ q:"CEO hỏi: có nên mở đường bay này không? Bạn bắt đầu từ đâu?",
         text:"Từ chữ 'có' hoặc 'không'. Rồi mới tới lý do. Người bận rộn cần kết luận trước, quá trình sau — ngược lại là cách nhanh nhất để mất sự chú ý của họ." },
  core:[
   { h:"Cấu trúc kim tự tháp", hVi:"Pyramid principle",
     body:"Bắt đầu bằng kết luận. Dưới nó là ba lý do chính. Dưới mỗi lý do là bằng chứng. Người nghe có thể dừng ở bất kỳ tầng nào và vẫn nắm được điều quan trọng.",
     note:"Ngược với cách viết bài luận ở trường: dẫn dắt, phân tích, rồi kết luận ở cuối. Trong kinh doanh, thứ tự đó làm người nghe mất kiên nhẫn." },
   { h:"Vì sao đặt kết luận trước lại khó", hVi:"",
     body:"Vì bạn đã trải qua quá trình phân tích và muốn kể lại nó. Nhưng người nghe không cần đi lại con đường của bạn — họ cần đích đến.",
     note:"Nếu họ muốn biết bạn tới đó bằng cách nào, họ sẽ hỏi. Và khi đó bạn có sẵn ba lý do." },
   { h:"Kết luận phải là một quyết định", hVi:"",
     body:"'Có nhiều yếu tố cần cân nhắc' không phải kết luận. 'Nên mở, nhưng bắt đầu với bốn chuyến mỗi tuần' mới là kết luận.",
     example:{company:"vietjet", text:"Kết luận đúng của case đường bay không phải 'có' hay 'không' mà là 'có, ở quy mô nào, và điều kiện nào để mở rộng'."} }
  ],
  worked:{ title:"Cùng một phân tích, hai cách trình bày",
    steps:[
     {k:"Cách sai — mở đầu",v:"'Tôi đã xem xét quy mô thị trường...'"},
     {k:"",v:"'...sau đó phân tích chi phí chuyến bay...'"},
     {k:"",v:"'...và cuối cùng kết luận là nên mở'",note:"CEO đã mất tập trung"},
     {k:"Cách đúng — câu đầu",v:"'Nên mở, nhưng khởi động với 4 chuyến/tuần'"},
     {k:"Lý do 1",v:"'Mỗi chuyến đóng góp 64 triệu ở load factor 85%'"},
     {k:"Lý do 2",v:"'Nhưng hoà vốn ở 77% — biên an toàn chỉ 8 điểm'"},
     {k:"Lý do 3",v:"'Tần suất dễ tăng, rất khó giảm'"}],
    conclusion:"Cách thứ hai truyền đạt cùng lượng thông tin trong một phần ba thời gian, và người nghe nắm được điều quan trọng nhất ngay ở câu đầu tiên. Nếu cuộc họp bị cắt ngắn sau 20 giây, họ vẫn có câu trả lời." },
  check:[
   { kind:"mcq", xp:30, question:"Câu mở đầu nào tốt nhất khi trình bày kết quả phân tích?",
     options:[
      {t:"'Nên dừng mở cửa hàng mới trong 12 tháng và tái đàm phán mặt bằng nhóm lỗ nặng'",ok:true,why:"Là một quyết định cụ thể, hành động được, đặt ngay câu đầu. Người nghe biết ngay phải làm gì."},
      {t:"'Tôi đã phân tích dữ liệu của 180 cửa hàng trong hai năm'",ok:false,why:"Kể quá trình. Người nghe chưa biết kết luận là gì."},
      {t:"'Có một số yếu tố cần cân nhắc kỹ'",ok:false,why:"Không phải kết luận, và cũng không dẫn tới hành động nào."},
      {t:"'Tình hình khá phức tạp'",ok:false,why:"Không truyền đạt thông tin nào."}]},
   { kind:"multi", xp:30, need:2, question:"Hai đặc điểm nào làm một kết luận đủ tốt?",
     note:"Chọn 2.",
     options:[
      {t:"Nó là một quyết định cụ thể, không phải một nhận xét",ok:true,why:"Người nghe cần biết phải làm gì, không cần biết tình hình phức tạp ra sao."},
      {t:"Nó đứng được một mình, không cần phần trình bày phía sau",ok:true,why:"Nếu cuộc họp bị cắt sau 20 giây, câu đầu tiên vẫn phải mang đủ giá trị."},
      {t:"Nó nêu đầy đủ mọi yếu tố đã cân nhắc",ok:false,why:"Đó là phần thân bài, không phải kết luận."},
      {t:"Nó tránh cam kết để giữ an toàn",ok:false,why:"Kết luận không cam kết là kết luận vô dụng."},
      {t:"Nó dài ít nhất ba câu để đủ ý",ok:false,why:"Độ dài không phải tiêu chí; kết luận tốt thường chỉ một câu."}]}
  ],
  recap:["Kết luận trước, lý do sau, bằng chứng sau nữa.",
         "Kết luận phải là một quyết định hành động được, không phải một nhận xét.",
         "Câu đầu tiên phải đứng được một mình."],
  terms:[{en:"Pyramid principle",vi:"Nguyên tắc kim tự tháp",d:"Kết luận trên đỉnh, lý do và bằng chứng bên dưới"},
         {en:"Answer first",vi:"Trả lời trước",d:"Đặt kết luận ở câu đầu tiên"},
         {en:"Top-line message",vi:"Thông điệp chính",d:"Điều duy nhất người nghe phải nhớ"}]
},

{ id:"l-synth-2", module:"m-synth", order:2, minutes:5, xp:80,
  title:"The rule of three", vi:"Quy tắc ba lý do",
  hook:{ q:"Bạn có bảy phát hiện. Trình bày bao nhiêu?",
         text:"Ba. Không phải vì bốn phát hiện còn lại sai, mà vì người nghe chỉ giữ được ba thứ — và bạn nên là người chọn ba thứ đó, không phải họ." },
  core:[
   { h:"Ba là giới hạn thực tế", hVi:"",
     body:"Người nghe trong một cuộc họp giữ được khoảng ba ý. Trình bày bảy ý nghĩa là để họ tự chọn ba ý ngẫu nhiên — và có thể họ chọn nhầm ba ý ít quan trọng nhất.",
     note:"Bốn phát hiện còn lại vẫn nằm trong tài liệu và bạn nói khi được hỏi. Chúng không mất đi, chỉ không nằm ở tầng đầu tiên." },
   { h:"Ba lý do phải độc lập nhau", hVi:"",
     body:"Nếu hai lý do thực chất là một điều nói theo hai cách, bạn chỉ có hai lý do. Áp dụng đúng nguyên tắc MECE cho phần trình bày.",
     example:{company:"mwg", text:"'Cửa hàng nhóm dưới lỗ' và 'doanh thu mỗi cửa hàng thấp' là cùng một phát hiện. Hai lý do độc lập sẽ là: phân bố doanh thu lệch, và hao hụt hàng tươi gấp đôi chuẩn ngành."} },
   { h:"Sắp xếp theo sức nặng, không theo thứ tự phân tích", hVi:"",
     body:"Lý do mạnh nhất nói trước. Đừng kể theo thứ tự bạn phát hiện ra chúng — đó là thứ tự của quá trình, không phải thứ tự của tầm quan trọng.",
     note:"Nếu người nghe chỉ nghe được một lý do, đó phải là lý do mạnh nhất." }
  ],
  worked:{ title:"Từ bảy phát hiện xuống ba lý do",
    steps:[
     {k:"Phát hiện 1",v:"30 cửa hàng mới thuê giá cao hơn 45%",note:"giữ — lý do chính"},
     {k:"Phát hiện 2",v:"cửa hàng mới đạt 57% doanh thu hoà vốn",note:"gộp vào lý do 1"},
     {k:"Phát hiện 3",v:"same-store sales +0,5%",note:"giữ — lý do 2, loại trừ nguyên nhân khác"},
     {k:"Phát hiện 4",v:"COGS tăng 1 điểm",note:"bỏ — quá nhỏ"},
     {k:"Phát hiện 5",v:"hợp đồng thuê cố định 5 năm, tăng 8%/năm",note:"giữ — lý do 3, tính cấp bách"},
     {k:"Phát hiện 6",v:"nhận biết thương hiệu không đổi",note:"bỏ — không liên quan"},
     {k:"Phát hiện 7",v:"đơn qua app chiếm 8%",note:"bỏ — quá nhỏ"}],
    conclusion:"Bảy phát hiện thành ba lý do: quyết định chọn mặt bằng sai, phần còn lại của chuỗi vẫn khoẻ, và hợp đồng thuê khiến vấn đề kéo dài 5 năm nếu không hành động ngay. Bốn phát hiện bị loại vẫn nằm trong phụ lục." },
  check:[
   { kind:"mcq", xp:30, question:"Bạn có ba lý do. Nên sắp xếp theo thứ tự nào?",
     options:[
      {t:"Theo sức nặng — lý do mạnh nhất nói trước",ok:true,why:"Nếu người nghe chỉ nghe được một điều, đó phải là điều quan trọng nhất."},
      {t:"Theo thứ tự bạn phát hiện ra chúng",ok:false,why:"Đó là thứ tự của quá trình, không phải của tầm quan trọng."},
      {t:"Theo thứ tự thời gian của sự kiện",ok:false,why:"Chỉ phù hợp khi kể lại lịch sử, không phù hợp khi thuyết phục."},
      {t:"Để lý do mạnh nhất cuối cùng cho ấn tượng",ok:false,why:"Kỹ thuật kể chuyện, không phù hợp với người nghe có thể rời cuộc họp bất cứ lúc nào."}]},
   { kind:"multi", xp:35, need:2, question:"Hai lỗi nào hay gặp khi chọn ba lý do?",
     note:"Chọn 2.",
     options:[
      {t:"Hai lý do thực chất là một điều nói theo hai cách",ok:true,why:"Vi phạm MECE — bạn tưởng có ba trụ nhưng thực ra chỉ có hai."},
      {t:"Đưa vào một phát hiện nhỏ chỉ vì đã mất công tìm ra nó",ok:true,why:"Chi phí chìm. Công sức bỏ ra không làm phát hiện đó quan trọng hơn."},
      {t:"Chọn đúng ba lý do độc lập nhau",ok:false,why:"Đó là cách làm đúng."},
      {t:"Để bốn phát hiện còn lại trong phụ lục",ok:false,why:"Đây là cách xử lý đúng — chúng không mất đi, chỉ không ở tầng đầu."},
      {t:"Sắp xếp lý do mạnh nhất lên trước",ok:false,why:"Đó là cách làm đúng."}]}
  ],
  recap:["Ba lý do — bạn chọn, đừng để người nghe tự chọn ngẫu nhiên.",
         "Ba lý do phải độc lập, không phải một điều nói ba cách.",
         "Sắp xếp theo sức nặng, không theo thứ tự phát hiện."],
  terms:[{en:"Rule of three",vi:"Quy tắc ba",d:"Giới hạn ba ý ở tầng đầu tiên của trình bày"},
         {en:"Supporting argument",vi:"Lý do hỗ trợ",d:"Trụ đỡ cho kết luận chính"},
         {en:"Appendix",vi:"Phụ lục",d:"Nơi để phát hiện phụ, nói khi được hỏi"}]
},

{ id:"l-synth-3", module:"m-synth", order:3, minutes:5, xp:80,
  title:"From finding to so-what", vi:"Từ phát hiện tới ý nghĩa",
  hook:{ q:"'Chi phí thuê tăng từ 16% lên 22% doanh thu.' Rồi sao?",
         text:"Đó mới là một quan sát. Người nghe cần bạn nói tiếp: điều đó có nghĩa gì, và họ phải làm gì." },
  core:[
   { h:"Ba tầng của một câu trình bày", hVi:"",
     body:"Tầng một: dữ liệu. Tầng hai: điều đó có nghĩa gì. Tầng ba: vì vậy nên làm gì. Người mới thường dừng ở tầng một.",
     note:"Dữ liệu: 'thuê tăng 6 điểm phần trăm'.\nÝ nghĩa: 'toàn bộ mức sụt biên đến từ đây, không phải từ vận hành'.\nHành động: 'nên tái đàm phán mặt bằng thay vì cắt marketing'." },
   { h:"Phép thử 'rồi sao'", hVi:"So-what test",
     body:"Sau mỗi câu bạn định nói, tự hỏi 'rồi sao?'. Nếu không trả lời được, câu đó chưa xong hoặc không đáng nói.",
     note:"Áp dụng liên tiếp: hỏi 'rồi sao' ba lần cho tới khi chạm tới một hành động cụ thể." },
   { h:"Ý nghĩa phải gắn với quyết định đang bàn", hVi:"",
     body:"Cùng một dữ liệu có ý nghĩa khác nhau tuỳ câu hỏi. Với câu hỏi 'cứu lợi nhuận', chi phí thuê tăng nghĩa là phải tái đàm phán. Với câu hỏi 'có nên mở rộng tiếp', nó nghĩa là tiêu chí chọn mặt bằng đang sai.",
     example:{company:"highlands", text:"Cùng một con số 22% chi phí thuê, nhưng ý nghĩa của nó thay đổi hoàn toàn tuỳ theo người nghe đang phải ra quyết định gì."} }
  ],
  worked:{ title:"Áp dụng phép thử 'rồi sao' ba lần",
    steps:[
     {k:"Dữ liệu",v:"chi phí thuê 16% → 22% doanh thu"},
     {k:"Rồi sao? (1)",v:"6 điểm này gần bằng toàn bộ mức sụt biên EBITDA"},
     {k:"Rồi sao? (2)",v:"nguyên nhân nằm ở mặt bằng, không ở vận hành hay nguyên liệu"},
     {k:"Rồi sao? (3)",v:"cắt marketing hay tăng giá đều không giải quyết được gốc"},
     {k:"Hành động",v:"tái đàm phán mặt bằng nhóm lỗ nặng, dừng mở mới"},
     {k:"Tính cấp bách",v:"hợp đồng 5 năm tăng 8%/năm — càng chờ càng đắt"}],
    conclusion:"Sáu bước từ một con số tới một hành động có thời hạn. Người nghe không phải tự nối các bước này — đó chính là công việc mà họ trả tiền cho người phân tích." },
  check:[
   { kind:"mcq", xp:35, question:"'Tỷ lệ khách quay lại giảm từ 42% xuống 31%.' Câu tiếp theo nào tốt nhất?",
     options:[
      {t:"'Nghĩa là chi phí lấy khách mới phải tăng khoảng một phần ba để giữ nguyên doanh thu — nên ưu tiên sửa trải nghiệm sau mua trước khi tăng ngân sách marketing'",ok:true,why:"Đi đủ ba tầng: dữ liệu, ý nghĩa kinh tế, và hành động ưu tiên."},
      {t:"'Đây là mức giảm đáng kể'",ok:false,why:"Chỉ lặp lại dữ liệu bằng lời khác, không thêm thông tin."},
      {t:"'Chúng ta cần tìm hiểu nguyên nhân'",ok:false,why:"Đúng nhưng đó là việc của người phân tích, không phải kết luận để trình bày."},
      {t:"'Tôi sẽ phân tích thêm dữ liệu về nhóm khách rời bỏ'",ok:false,why:"Kể kế hoạch làm việc thay vì đưa ra ý nghĩa."}]},
   { kind:"multi", xp:30, need:2, question:"Hai dấu hiệu nào cho thấy một câu trình bày chưa hoàn chỉnh?",
     note:"Chọn 2.",
     options:[
      {t:"Người nghe có thể hỏi 'rồi sao?' mà bạn không có câu trả lời",ok:true,why:"Nghĩa là bạn mới dừng ở tầng dữ liệu."},
      {t:"Câu đó không dẫn tới hành động hay quyết định nào",ok:true,why:"Phân tích tồn tại để hỗ trợ quyết định; không dẫn tới quyết định thì chưa xong."},
      {t:"Câu đó chứa một con số cụ thể",ok:false,why:"Con số cụ thể là điểm mạnh, không phải điểm yếu."},
      {t:"Câu đó ngắn hơn hai dòng",ok:false,why:"Ngắn gọn là ưu điểm."},
      {t:"Câu đó nêu ý nghĩa trước khi nêu dữ liệu",ok:false,why:"Hoàn toàn chấp nhận được, thậm chí thường tốt hơn."}]}
  ],
  recap:["Ba tầng: dữ liệu → ý nghĩa → hành động. Đừng dừng ở tầng một.",
         "Hỏi 'rồi sao?' cho tới khi chạm một hành động cụ thể.",
         "Ý nghĩa của cùng một dữ liệu thay đổi theo quyết định đang bàn."],
  terms:[{en:"So what",vi:"Rồi sao",d:"Phép thử buộc phát hiện phải dẫn tới ý nghĩa"},
         {en:"Insight",vi:"Nhận định",d:"Điều dữ liệu ngụ ý mà nó không nói thẳng"},
         {en:"Actionable",vi:"Hành động được",d:"Dẫn tới việc cụ thể có thể làm"}]
},

{ id:"l-synth-4", module:"m-synth", order:4, minutes:6, xp:90,
  title:"Handling pushback", vi:"Ứng phó khi bị phản biện",
  hook:{ q:"'Tôi không đồng ý. Anh dựa vào đâu mà nói vậy?'",
         text:"Đây không phải công kích. Đây là cơ hội — nếu bạn biết mình đã giả định gì và điều gì sẽ khiến bạn đổi ý." },
  core:[
   { h:"Ba loại phản biện", hVi:"",
     body:"Phản biện về dữ liệu (số này lấy ở đâu), về logic (từ đó sao suy ra được kết luận này), và về giả định (nếu điều kiện khác thì sao). Mỗi loại cần một cách trả lời khác nhau.",
     note:"Dữ liệu → nêu nguồn và mức độ tin cậy.\nLogic → đi lại từng bước suy luận.\nGiả định → nêu ngưỡng mà kết luận đổi chiều." },
   { h:"Biết trước điểm yếu của mình", hVi:"",
     body:"Trước khi trình bày, liệt kê ba câu hỏi khó nhất có thể bị hỏi và chuẩn bị câu trả lời. Điểm yếu bạn tự nêu ra làm tăng độ tin cậy; điểm yếu bị phát hiện thì làm giảm.",
     note:"Câu chuẩn: 'Giả định yếu nhất trong phân tích này là X. Nếu X sai theo hướng này thì kết luận đổi thành Y.'" },
   { h:"Phân biệt phản biện đúng và phản biện chưa đúng", hVi:"",
     body:"Nếu người phản biện đúng, nói thẳng là họ đúng và điều chỉnh. Nếu họ chưa đúng, nêu bằng chứng chứ không nêu lại lập luận cũ to hơn.",
     example:{company:"techcombank", text:"Khi có người nói 'lợi nhuận vẫn tăng mà', câu trả lời không phải nhắc lại lo ngại — mà là tách con số: lõi kinh doanh giảm, phần tăng đến từ khoản không lặp lại."} }
  ],
  worked:{ title:"Ba phản biện và ba cách trả lời",
    steps:[
     {k:"Phản biện 1",v:"'Số liệu doanh thu cửa hàng mới lấy ở đâu?'"},
     {k:"Trả lời",v:"nêu nguồn, kỳ dữ liệu, và độ tin cậy"},
     {k:"Phản biện 2",v:"'Sao biết là do mặt bằng chứ không phải do vận hành?'"},
     {k:"Trả lời",v:"cửa hàng cũ cùng đội vận hành vẫn giữ biên — loại trừ vận hành"},
     {k:"Phản biện 3",v:"'Nếu cửa hàng mới cần 18 tháng mới chín thì sao?'"},
     {k:"Trả lời",v:"'Câu hỏi đúng. Nếu đúng 18 tháng thì một phần lỗ là bình thường'"},
     {k:"",v:"'Ngưỡng để kết luận đổi chiều là doanh thu đạt 5,5 tỷ ở tháng 12'"}],
    conclusion:"Phản biện thứ ba là loại giá trị nhất: nó không bác bỏ phân tích mà chỉ ra một giả định chưa được kiểm chứng. Cách trả lời tốt nhất là nêu chính xác ngưỡng mà kết luận sẽ đổi chiều." },
  check:[
   { kind:"mcq", xp:35, question:"Ai đó chỉ ra một lỗi thật trong phân tích của bạn giữa cuộc họp. Nên làm gì?",
     options:[
      {t:"Xác nhận họ đúng, nêu ảnh hưởng của lỗi đó tới kết luận, và nói kết luận có đổi hay không",ok:true,why:"Thừa nhận nhanh và định lượng ảnh hưởng cho thấy bạn kiểm soát được phân tích của mình. Điều người nghe cần biết là kết luận còn đứng vững không."},
      {t:"Bảo vệ kết luận và giải thích rằng lỗi đó không đáng kể",ok:false,why:"Nếu chưa định lượng thì bạn chưa biết nó có đáng kể hay không."},
      {t:"Nói sẽ kiểm tra lại và chuyển sang phần tiếp theo",ok:false,why:"Để lại một dấu hỏi treo trên toàn bộ phần còn lại của buổi trình bày."},
      {t:"Xin lỗi nhiều lần và bắt đầu lại",ok:false,why:"Lãng phí thời gian và làm mất tự tin không cần thiết."}]},
   { kind:"multi", xp:35, need:2, question:"Hai việc nào nên chuẩn bị TRƯỚC khi trình bày?",
     note:"Chọn 2.",
     options:[
      {t:"Ba câu hỏi khó nhất có thể bị hỏi, kèm câu trả lời",ok:true,why:"Chuẩn bị trước biến phản biện từ mối đe doạ thành cơ hội thể hiện chiều sâu."},
      {t:"Giả định yếu nhất và ngưỡng làm kết luận đổi chiều",ok:true,why:"Chủ động nêu điểm yếu làm tăng độ tin cậy; bị phát hiện thì làm giảm."},
      {t:"Toàn bộ dữ liệu thô để chứng minh khi cần",ok:false,why:"Không ai muốn xem dữ liệu thô trong cuộc họp; cần con số đã xử lý và nguồn."},
      {t:"Một câu trả lời chung để né mọi câu hỏi khó",ok:false,why:"Người nghe nhận ra ngay và mất niềm tin."},
      {t:"Danh sách mọi phát hiện đã tìm ra",ok:false,why:"Trái với quy tắc ba lý do."}]}
  ],
  recap:["Ba loại phản biện — dữ liệu, logic, giả định — cần ba cách trả lời khác nhau.",
         "Điểm yếu tự nêu làm tăng độ tin cậy; điểm yếu bị phát hiện làm giảm.",
         "Khi người phản biện đúng, xác nhận và định lượng ảnh hưởng ngay."],
  terms:[{en:"Pushback",vi:"Phản biện",d:"Câu hỏi thách thức kết luận"},
         {en:"Key assumption",vi:"Giả định then chốt",d:"Điều kiện mà kết luận phụ thuộc vào"},
         {en:"Breakpoint",vi:"Ngưỡng đổi chiều",d:"Mức số liệu làm kết luận thay đổi"}]
}
]);

/* ================= MODULE 10 · MARKET SIZING ================= */
window.LESSONS = window.LESSONS.concat([

{ id:"l-size-1", module:"m-sizing", order:1, minutes:5, xp:70,
  title:"Top-down vs bottom-up", vi:"Từ trên xuống và từ dưới lên",
  hook:{ q:"Thị trường xi măng Việt Nam lớn cỡ nào? Bạn không có số liệu nào.",
         text:"Có hai đường đi. Chọn đúng đường quyết định bạn mất ba phút hay hai mươi phút — và cả độ tin cậy của kết quả." },
  core:[
   { h:"Top-down", hVi:"Từ trên xuống",
     body:"Bắt đầu từ một con số lớn bạn biết chắc (dân số, GDP, số hộ gia đình) rồi thu hẹp dần bằng các tỷ lệ.",
     note:"Dùng khi sản phẩm phục vụ đại chúng và bạn biết tỷ lệ thâm nhập: sữa, điện thoại, dịch vụ ngân hàng." },
   { h:"Bottom-up", hVi:"Từ dưới lên",
     body:"Bắt đầu từ một đơn vị nhỏ đo được (một cửa hàng, một nhà máy, một khách hàng) rồi nhân lên theo số đơn vị.",
     example:{company:"highlands", text:"Thị trường chuỗi cà phê: số cửa hàng chuỗi trên cả nước × doanh thu trung bình mỗi cửa hàng. Dễ kiểm chứng hơn nhiều so với đoán tỷ lệ dân số uống cà phê chuỗi."} },
   { h:"Chọn đường nào", hVi:"",
     body:"Chọn đường mà bạn tự tin hơn về các con số đầu vào. Nếu bạn biết rõ có bao nhiêu cửa hàng, đi bottom-up. Nếu bạn chỉ biết dân số, đi top-down.",
     note:"Người phỏng vấn không quan tâm bạn chọn đường nào. Họ quan tâm bạn có nêu được lý do chọn hay không." }
  ],
  worked:{ title:"Cùng một thị trường, hai đường đi",
    steps:[
     {k:"Top-down — dân số",v:"100 triệu"},
     {k:"Tỷ lệ uống cà phê chuỗi",v:"8% → 8 triệu người"},
     {k:"Tần suất",v:"2 lần/tháng × 12 = 24 lần/năm"},
     {k:"Giá trung bình",v:"55.000đ"},
     {k:"Kết quả top-down",v:"≈ 10,6 nghìn tỷ"},
     {k:"Bottom-up — số cửa hàng chuỗi",v:"~3.000 cửa hàng"},
     {k:"Doanh thu mỗi cửa hàng",v:"~3,5 tỷ/năm"},
     {k:"Kết quả bottom-up",v:"≈ 10,5 nghìn tỷ",note:"trùng bậc độ lớn"}],
    conclusion:"Hai đường độc lập cho kết quả gần nhau — đó là bằng chứng mạnh nhất rằng ước lượng đáng tin. Nếu chúng lệch nhau mười lần, một trong hai có giả định sai nghiêm trọng và bạn phải tìm ra nó." },
  check:[
   { kind:"calc", xp:35, question:"Bottom-up: 250 nhà máy, mỗi nhà máy sản xuất 40 nghìn tấn/năm, giá bán 1,5 triệu đồng/tấn. Quy mô thị trường là bao nhiêu nghìn tỷ?",
     unit:"nghìn tỷ", answer:15, tol:1, hint:"Số nhà máy × sản lượng mỗi nhà máy × giá mỗi tấn.",
     working:[{k:"Tổng sản lượng",v:"250 × 40.000 = 10 triệu tấn"},{k:"Doanh thu",v:"10 triệu × 1,5 triệu = 15.000 tỷ"},{k:"Đổi đơn vị",v:"15 nghìn tỷ"}],
     why:"Bottom-up phù hợp ở đây vì số nhà máy và công suất là dữ liệu dễ kiểm chứng, trong khi đoán 'mỗi người Việt dùng bao nhiêu xi măng' thì rất khó có trực giác." },
   { kind:"mcq", xp:30, question:"Bạn cần ước lượng thị trường máy lọc nước gia đình. Nên đi đường nào?",
     options:[
      {t:"Top-down từ số hộ gia đình, vì sản phẩm phục vụ hộ gia đình đại chúng",ok:true,why:"Đơn vị tiêu dùng tự nhiên là hộ gia đình, và số hộ là con số bạn suy ra được từ dân số. Tỷ lệ sở hữu cũng có trực giác kiểm tra được."},
      {t:"Bottom-up từ số cửa hàng bán máy lọc nước",ok:false,why:"Bạn khó biết có bao nhiêu điểm bán và mỗi điểm bán bao nhiêu máy — đầu vào kém tin cậy hơn."},
      {t:"Lấy doanh thu một hãng rồi chia thị phần ước tính",ok:false,why:"Phụ thuộc vào hai con số bạn không chắc, sai số nhân lên."},
      {t:"Không ước lượng được nếu không có báo cáo ngành",ok:false,why:"Ước lượng có cấu trúc luôn làm được, và đó chính là kỹ năng đang được kiểm tra."}]}
  ],
  recap:["Top-down từ con số lớn bạn biết chắc; bottom-up từ đơn vị nhỏ đo được.",
         "Chọn đường mà bạn tự tin hơn về đầu vào — và nêu lý do chọn.",
         "Hai đường độc lập cho kết quả cùng bậc độ lớn là bằng chứng mạnh nhất."],
  terms:[{en:"Top-down",vi:"Từ trên xuống",d:"Từ tổng thể thu hẹp dần bằng tỷ lệ"},
         {en:"Bottom-up",vi:"Từ dưới lên",d:"Từ đơn vị nhỏ nhân lên"},
         {en:"Triangulation",vi:"Kiểm chứng chéo",d:"Dùng hai phương pháp độc lập để đối chiếu"}]
},

{ id:"l-size-2", module:"m-sizing", order:2, minutes:5, xp:80,
  title:"Choosing the segmentation", vi:"Chọn cách phân khúc",
  hook:{ q:"Ước lượng thị trường tã em bé. Chia dân số theo tuổi hay theo thu nhập?",
         text:"Theo tuổi — vì tuổi quyết định ai CẦN sản phẩm. Thu nhập chỉ quyết định ai mua được. Chọn sai trục chia là sai ngay từ bước đầu." },
  core:[
   { h:"Chia theo yếu tố quyết định nhu cầu", hVi:"",
     body:"Trục chia đúng là trục mà nếu đổi giá trị của nó, nhu cầu thay đổi mạnh nhất.",
     note:"Tã em bé → tuổi.\nXe hơi → thu nhập hộ gia đình.\nPhần mềm doanh nghiệp → quy mô doanh nghiệp.\nDịch vụ y tế → tuổi và thu nhập." },
   { h:"Chọn đơn vị tiêu dùng đúng", hVi:"",
     body:"Một số sản phẩm mua theo cá nhân (điện thoại), một số theo hộ gia đình (máy giặt), một số theo doanh nghiệp (phần mềm kế toán). Chia sai đơn vị làm kết quả lệch nhiều lần.",
     example:{company:"vinamilk", text:"Sữa cho trẻ em nên chia theo số trẻ trong độ tuổi, không theo tổng dân số. Chia sai làm kết quả lệch 4-5 lần."} },
   { h:"Đừng chia quá nhiều tầng", hVi:"",
     body:"Mỗi tầng chia thêm là thêm một giả định có thể sai. Ba tầng thường là đủ; năm tầng làm sai số nhân lên mà không tăng độ chính xác.",
     note:"Sai số của tích các ước lượng lớn hơn sai số của từng ước lượng. Ít tầng hơn thường cho kết quả đáng tin hơn." }
  ],
  worked:{ title:"Chọn trục chia cho ba sản phẩm",
    steps:[
     {k:"Sản phẩm: tã em bé",v:"chia theo số trẻ 0-3 tuổi"},
     {k:"Đơn vị tiêu dùng",v:"một em bé",note:"không phải hộ gia đình"},
     {k:"Sản phẩm: máy lọc nước",v:"chia theo số hộ gia đình đô thị"},
     {k:"Đơn vị tiêu dùng",v:"một hộ",note:"không phải cá nhân"},
     {k:"Sản phẩm: phần mềm kế toán",v:"chia theo số doanh nghiệp có trên 10 nhân viên"},
     {k:"Đơn vị tiêu dùng",v:"một doanh nghiệp"},
     {k:"Sai lầm hay gặp",v:"dùng tổng dân số cho cả ba"}],
    conclusion:"Ba sản phẩm, ba đơn vị tiêu dùng hoàn toàn khác nhau. Bước chọn đơn vị mất mười giây nhưng quyết định toàn bộ độ chính xác của ước lượng." },
  check:[
   { kind:"calc", xp:35, question:"Dân số 100 triệu, quy mô hộ gia đình trung bình 3,7 người. Có bao nhiêu triệu hộ gia đình?",
     unit:"triệu hộ", answer:27, tol:2, hint:"Dân số chia cho số người mỗi hộ.",
     working:[{k:"Dân số",v:"100 triệu"},{k:"Người mỗi hộ",v:"3,7"},{k:"Số hộ",v:"100 ÷ 3,7 ≈ 27 triệu hộ"}],
     why:"27 triệu hộ là con số nền cực kỳ hữu ích — dùng được cho mọi sản phẩm mua theo hộ: máy giặt, tủ lạnh, internet, máy lọc nước. Đáng để nhớ." },
   { kind:"mcq", xp:30, question:"Ước lượng thị trường phần mềm quản lý bán hàng. Trục chia nào phù hợp nhất?",
     options:[
      {t:"Số doanh nghiệp bán lẻ, chia theo quy mô cửa hàng",ok:true,why:"Đơn vị tiêu dùng là doanh nghiệp, và quy mô quyết định họ cần phần mềm loại nào cùng mức sẵn sàng chi trả."},
      {t:"Dân số chia theo độ tuổi",ok:false,why:"Sai đơn vị tiêu dùng — cá nhân không mua phần mềm quản lý bán hàng."},
      {t:"Số hộ gia đình đô thị",ok:false,why:"Cũng sai đơn vị tiêu dùng."},
      {t:"GDP chia theo tỷ trọng ngành bán lẻ",ok:false,why:"Cho ra quy mô ngành bán lẻ chứ không phải chi tiêu cho phần mềm."}]}
  ],
  recap:["Chia theo yếu tố quyết định NHU CẦU, không phải yếu tố quyết định khả năng chi trả.",
         "Chọn đúng đơn vị tiêu dùng: cá nhân, hộ gia đình, hay doanh nghiệp.",
         "Ba tầng chia thường là đủ; nhiều tầng hơn chỉ làm sai số nhân lên."],
  terms:[{en:"Segmentation",vi:"Phân khúc",d:"Cách chia tổng thể thành các nhóm"},
         {en:"Consumption unit",vi:"Đơn vị tiêu dùng",d:"Ai hoặc cái gì thật sự mua sản phẩm"},
         {en:"Compounding error",vi:"Sai số nhân dồn",d:"Sai số tăng lên khi nhân nhiều ước lượng"}]
},

{ id:"l-size-3", module:"m-sizing", order:3, minutes:5, xp:80,
  title:"Which assumption matters", vi:"Giả định nào thật sự quan trọng",
  hook:{ q:"Mô hình của bạn có sáu giả định. Cái nào đáng tranh luận?",
         text:"Chỉ một hoặc hai. Biết cái nào giúp bạn dồn thời gian đúng chỗ — và biết trước mình sẽ bị hỏi về điều gì." },
  core:[
   { h:"Phân tích độ nhạy", hVi:"Sensitivity analysis",
     body:"Với mỗi giả định, hỏi: nếu nó sai gấp đôi hoặc bằng nửa, kết quả cuối thay đổi bao nhiêu? Giả định làm kết quả thay đổi nhiều nhất là giả định quan trọng nhất.",
     note:"Dân số 100 triệu — bạn chắc chắn, sai số dưới 5%.\nTỷ lệ thâm nhập 25% — bạn đoán, có thể là 10% hoặc 40%.\nGiả định thứ hai mới đáng tranh luận." },
   { h:"Nêu giả định yếu nhất một cách chủ động", hVi:"",
     body:"Khi trình bày, nói rõ: 'Kết quả này nhạy nhất với giả định X. Nếu X là 15% thay vì 25%, thị trường chỉ còn khoảng 7,5 nghìn tỷ.'",
     example:{company:"vinamilk", text:"Trong case sữa hạt, tỷ lệ 25% người đô thị từng dùng là giả định có biên độ sai lớn nhất — từ 10% tới 40% đều nghe hợp lý, và nó làm kết quả thay đổi bốn lần."} },
   { h:"Gắn giả định với hành động tiếp theo", hVi:"",
     body:"Giả định quan trọng nhất chính là thứ cần kiểm chứng đầu tiên bằng dữ liệu thật. Đó là cầu nối từ ước lượng sang kế hoạch làm việc.",
     note:"'Trước khi quyết định đầu tư, việc đầu tiên nên làm là khảo sát tỷ lệ thâm nhập thật.'" }
  ],
  worked:{ title:"Kiểm tra độ nhạy của một ước lượng",
    steps:[
     {k:"Kết quả gốc",v:"12,5 nghìn tỷ"},
     {k:"Dân số 100tr → 95tr",v:"11,9 nghìn tỷ",note:"−5%, không đáng kể"},
     {k:"Tỷ lệ đô thị 40% → 35%",v:"10,9 nghìn tỷ",note:"−13%"},
     {k:"Thâm nhập 25% → 15%",v:"7,5 nghìn tỷ",note:"−40%, rất nhạy"},
     {k:"Tần suất 2 → 1,5 hộp/tuần",v:"9,4 nghìn tỷ",note:"−25%"},
     {k:"Giá 12k → 11k",v:"11,4 nghìn tỷ",note:"−9%"},
     {k:"Giả định quan trọng nhất",v:"tỷ lệ thâm nhập"}],
    conclusion:"Năm phép thử, mỗi phép mất mười giây. Kết quả: chỉ một giả định thật sự quyết định. Toàn bộ thời gian tranh luận và kiểm chứng nên dồn vào đó." },
  check:[
   { kind:"mcq", xp:35, question:"Ước lượng của bạn dựa trên: dân số 100 triệu, tỷ lệ đô thị 40%, tỷ lệ dùng sản phẩm 25%, giá 12.000đ. Giả định nào cần kiểm chứng đầu tiên?",
     options:[
      {t:"Tỷ lệ dùng sản phẩm 25%",ok:true,why:"Đây là con số bạn ít chắc chắn nhất và có biên độ sai lớn nhất — từ 10% tới 40% đều nghe hợp lý, làm kết quả thay đổi bốn lần."},
      {t:"Dân số 100 triệu",ok:false,why:"Gần như chắc chắn, sai số dưới 5%."},
      {t:"Giá 12.000đ",ok:false,why:"Kiểm chứng được trong ba phút bằng cách vào siêu thị."},
      {t:"Tỷ lệ đô thị 40%",ok:false,why:"Là số liệu thống kê công bố, độ tin cậy cao."}]},
   { kind:"multi", xp:30, need:2, question:"Hai đặc điểm nào làm một giả định trở nên 'quan trọng'?",
     note:"Chọn 2.",
     options:[
      {t:"Bạn ít chắc chắn nhất về nó",ok:true,why:"Biên độ sai lớn nghĩa là rủi ro lớn."},
      {t:"Thay đổi nó làm kết quả cuối thay đổi mạnh nhất",ok:true,why:"Đây chính là định nghĩa của độ nhạy."},
      {t:"Nó xuất hiện sớm nhất trong phép tính",ok:false,why:"Vị trí trong phép tính không liên quan tới tầm quan trọng."},
      {t:"Nó là con số lớn nhất",ok:false,why:"Độ lớn tuyệt đối không quyết định độ nhạy."},
      {t:"Nó khó giải thích nhất",ok:false,why:"Độ phức tạp không phải tiêu chí."}]}
  ],
  recap:["Kiểm tra độ nhạy: đổi từng giả định, xem kết quả thay đổi bao nhiêu.",
         "Giả định quan trọng = ít chắc chắn nhất VÀ làm kết quả thay đổi mạnh nhất.",
         "Nêu chủ động giả định yếu nhất, kèm kết quả ở kịch bản khác."],
  terms:[{en:"Sensitivity analysis",vi:"Phân tích độ nhạy",d:"Đo mức kết quả thay đổi khi giả định thay đổi"},
         {en:"Key driver",vi:"Biến số then chốt",d:"Giả định ảnh hưởng lớn nhất tới kết quả"},
         {en:"Scenario",vi:"Kịch bản",d:"Kết quả dưới một bộ giả định khác"}]
},

{ id:"l-size-4", module:"m-sizing", order:4, minutes:5, xp:90,
  title:"Cross-checking your estimate", vi:"Kiểm chứng chéo kết quả",
  hook:{ q:"Top-down cho 12,5 nghìn tỷ. Bottom-up cho 9 nghìn tỷ. Ai đúng?",
         text:"Có thể cả hai. Chênh lệch 28% giữa hai phương pháp độc lập là hoàn toàn bình thường — và bản thân việc kiểm chứng chéo mới là điều đáng giá." },
  core:[
   { h:"Ngưỡng chấp nhận được", hVi:"",
     body:"Hai phương pháp lệch nhau dưới 50% thì đáng tin. Lệch 2-3 lần thì cần tìm nguyên nhân. Lệch 10 lần thì chắc chắn một bên có lỗi giả định nghiêm trọng.",
     note:"Trình bày cả hai và nói: 'Hai cách tiếp cận cho khoảng 9-12,5 nghìn tỷ, nên tôi dùng khoảng 10 nghìn tỷ làm cơ sở.'" },
   { h:"Khi hai kết quả lệch nhiều", hVi:"",
     body:"Đừng lấy trung bình. Tìm giả định nào gây ra chênh lệch — thường đó chính là phát hiện có giá trị nhất của cả bài toán.",
     example:{company:"highlands", text:"Nếu top-down cho gấp ba lần bottom-up, có thể bạn đang tính cả cà phê vỉa hè vào thị trường 'chuỗi' — và việc nhận ra ranh giới đó quan trọng hơn cả con số."} },
   { h:"Ba nguồn kiểm chứng ngoài", hVi:"",
     body:"So với thị trường liền kề đã biết quy mô. So với cùng thị trường ở nước tương đương. So với doanh thu công bố của người dẫn đầu chia thị phần ước tính.",
     note:"Mỗi nguồn đều thô, nhưng ba nguồn thô cùng chỉ về một khoảng thì khoảng đó đáng tin." }
  ],
  worked:{ title:"Đối chiếu hai kết quả và kết luận",
    steps:[
     {k:"Top-down",v:"12,5 nghìn tỷ"},
     {k:"Bottom-up",v:"9,0 nghìn tỷ"},
     {k:"Chênh lệch",v:"3,5 nghìn tỷ = 28% so với top-down"},
     {k:"Nguyên nhân khả dĩ",v:"top-down có thể tính cả kênh không chính thức"},
     {k:"Kiểm chứng ngoài",v:"thị trường sữa nước ~60 nghìn tỷ"},
     {k:"Tỷ lệ hợp lý",v:"sữa hạt bằng 15-20% sữa nước → 9-12 nghìn tỷ"},
     {k:"Kết luận trình bày",v:"'khoảng 10 nghìn tỷ, khoảng tin cậy 9-12,5'"}],
    conclusion:"Ba nguồn độc lập cùng chỉ về khoảng 9-12,5 nghìn tỷ. Cách trình bày đúng là nêu khoảng, nêu con số trung tâm, và nêu giả định nào sẽ đẩy kết quả về đầu nào của khoảng." },
  check:[
   { kind:"calc", xp:35, question:"Top-down cho 12,5 nghìn tỷ, bottom-up cho 9 nghìn tỷ. Bottom-up thấp hơn top-down bao nhiêu phần trăm?",
     unit:"%", answer:28, tol:2, hint:"Chênh lệch chia cho con số top-down.",
     working:[{k:"Chênh lệch",v:"12,5 − 9,0 = 3,5"},{k:"So với top-down",v:"3,5 ÷ 12,5 = 28%"}],
     why:"28% là mức lệch hoàn toàn bình thường giữa hai phương pháp độc lập. Nếu con số này là 300% thì mới cần dừng lại tìm lỗi giả định." },
   { kind:"mcq", xp:35, question:"Top-down cho 50 nghìn tỷ, bottom-up cho 5 nghìn tỷ. Nên làm gì?",
     options:[
      {t:"Tìm giả định nào gây ra chênh lệch 10 lần — nhiều khả năng hai phương pháp đang định nghĩa thị trường khác nhau",ok:true,why:"Lệch 10 lần không phải sai số mà là dấu hiệu hai bên đang tính hai thị trường khác nhau. Tìm ra ranh giới đó thường là phát hiện giá trị nhất."},
      {t:"Lấy trung bình 27,5 nghìn tỷ",ok:false,why:"Trung bình của một con số đúng và một con số sai vẫn là con số sai."},
      {t:"Chọn top-down vì nó dùng dữ liệu dân số đáng tin",ok:false,why:"Chọn bừa một bên mà không tìm hiểu nguyên nhân chênh lệch."},
      {t:"Bỏ cả hai và tìm báo cáo ngành",ok:false,why:"Bỏ mất phát hiện quan trọng nhất là vì sao hai cách tính lệch nhau."}]}
  ],
  recap:["Lệch dưới 50% giữa hai phương pháp là bình thường và đáng tin.",
         "Lệch nhiều lần thì đừng lấy trung bình — tìm giả định gây ra chênh lệch.",
         "Trình bày một khoảng, một con số trung tâm, và điều gì đẩy kết quả về mỗi đầu."],
  terms:[{en:"Cross-check",vi:"Kiểm chứng chéo",d:"Tính lại bằng phương pháp độc lập"},
         {en:"Confidence range",vi:"Khoảng tin cậy",d:"Khoảng giá trị hợp lý của ước lượng"},
         {en:"Market definition",vi:"Định nghĩa thị trường",d:"Ranh giới của cái đang được đo"}]
}
]);

/* ================= MODULE 11 · COMMUNICATION ================= */
window.LESSONS = window.LESSONS.concat([

{ id:"l-comm-1", module:"m-comm", order:1, minutes:5, xp:70,
  title:"The 60-second recommendation", vi:"Khuyến nghị trong 60 giây",
  hook:{ q:"Bạn gặp CEO trong thang máy. Có 60 giây. Nói gì?",
         text:"Một kết luận, ba lý do, một việc cần họ quyết. Không có chỗ cho phần dẫn nhập." },
  core:[
   { h:"Cấu trúc 60 giây", hVi:"",
     body:"10 giây cho kết luận. 30 giây cho ba lý do. 10 giây cho điều bạn cần họ quyết. 10 giây dự phòng cho câu hỏi.",
     note:"Viết ra và bấm giờ. Gần như ai cũng vượt quá 60 giây ở lần thử đầu tiên, và phần bị cắt luôn là phần dẫn nhập." },
   { h:"Kết thúc bằng một yêu cầu cụ thể", hVi:"The ask",
     body:"Người nghe cần biết bạn muốn gì ở họ: phê duyệt ngân sách, ra quyết định, hay chỉ là thông tin để biết.",
     example:{company:"highlands", text:"'Tôi cần anh phê duyệt việc dừng ký hợp đồng thuê mới trong 12 tháng' — cụ thể, làm được ngay, và rõ ai phải hành động."} },
   { h:"Điều bị cắt đầu tiên", hVi:"",
     body:"Bạn đã làm việc ba tuần và muốn kể quá trình. Nhưng quá trình chính là thứ phải cắt. Người nghe chỉ cần biết bạn tới đâu và vì sao nên tin.",
     note:"Nếu họ muốn biết bạn làm thế nào, họ sẽ hỏi — và khi đó bạn đã có 30 phút chứ không phải 60 giây." }
  ],
  worked:{ title:"Bản 60 giây cho case chuỗi cà phê",
    steps:[
     {k:"0-10 giây",v:"'Nên dừng mở cửa hàng mới 12 tháng và tái đàm phán mặt bằng nhóm lỗ'"},
     {k:"10-20 giây",v:"'Một: 30 cửa hàng mới gây ra gần như toàn bộ mức sụt biên, khoảng 93 tỷ'"},
     {k:"20-30 giây",v:"'Hai: 150 cửa hàng cũ vẫn khoẻ, same-store vẫn dương'"},
     {k:"30-40 giây",v:"'Ba: hợp đồng thuê 5 năm tăng 8%/năm — càng chờ càng đắt'"},
     {k:"40-50 giây",v:"'Tôi cần anh phê duyệt tạm dừng ký hợp đồng thuê mới'"},
     {k:"50-60 giây",v:"dừng lại, chờ câu hỏi"}],
    conclusion:"Toàn bộ ba tuần phân tích nén vào sáu câu. Không câu nào kể quá trình, mọi câu đều mang một thông tin mà người nghe cần để quyết định." },
  check:[
   { kind:"mcq", xp:35, question:"Trong bản 60 giây, phần nào nên bị cắt đầu tiên?",
     options:[
      {t:"Phần kể lại quá trình phân tích",ok:true,why:"Người nghe cần kết luận và lý do, không cần đi lại con đường bạn đã đi. Nếu họ muốn biết, họ sẽ hỏi."},
      {t:"Lý do thứ ba",ok:false,why:"Ba lý do là cấu trúc tối thiểu để kết luận đứng vững."},
      {t:"Điều bạn cần họ quyết",ok:false,why:"Đây là phần quan trọng nhất — không có nó thì cuộc trao đổi không dẫn tới hành động nào."},
      {t:"Con số định lượng",ok:false,why:"Con số là thứ làm lý do trở nên thuyết phục."}]},
   { kind:"multi", xp:30, need:2, question:"Hai thành phần nào bắt buộc phải có trong bản 60 giây?",
     note:"Chọn 2.",
     options:[
      {t:"Một kết luận cụ thể ở câu đầu tiên",ok:true,why:"Nếu cuộc trao đổi bị cắt sau 10 giây, đây là thứ duy nhất người nghe mang đi."},
      {t:"Một yêu cầu rõ ràng về điều bạn cần họ quyết",ok:true,why:"Không có yêu cầu thì buổi trao đổi kết thúc mà không ai làm gì."},
      {t:"Phương pháp phân tích đã dùng",ok:false,why:"Thuộc phần quá trình — cắt đầu tiên."},
      {t:"Danh sách dữ liệu đã xem",ok:false,why:"Không mang lại thông tin cho quyết định."},
      {t:"Lời cảm ơn vì đã dành thời gian",ok:false,why:"Tốn giây quý giá mà không truyền đạt gì."}]}
  ],
  recap:["10 giây kết luận, 30 giây ba lý do, 10 giây yêu cầu, 10 giây dự phòng.",
         "Luôn kết thúc bằng một yêu cầu cụ thể: bạn cần họ quyết gì.",
         "Quá trình phân tích là thứ bị cắt đầu tiên."],
  terms:[{en:"Elevator pitch",vi:"Bản trình bày 60 giây",d:"Tóm tắt đủ để ra quyết định"},
         {en:"The ask",vi:"Yêu cầu",d:"Điều bạn cần người nghe làm hoặc quyết"},
         {en:"Executive summary",vi:"Tóm tắt điều hành",d:"Phiên bản viết của bản 60 giây"}]
},

{ id:"l-comm-2", module:"m-comm", order:2, minutes:5, xp:80,
  title:"Know your audience", vi:"Nói với ai",
  hook:{ q:"Cùng một kết luận, trình bày cho CEO và cho trưởng nhóm phân tích. Khác nhau thế nào?",
         text:"Khác gần như hoàn toàn — trừ câu kết luận. CEO cần biết quyết định gì; nhà phân tích cần biết bạn tính đúng chưa." },
  core:[
   { h:"Ba loại người nghe", hVi:"",
     body:"Người ra quyết định cần kết luận và rủi ro. Chuyên gia cần phương pháp và giả định. Người thực thi cần các bước cụ thể và ai làm gì.",
     note:"Cùng một phân tích, ba bản trình bày khác nhau. Dùng nhầm bản là cách nhanh nhất để mất người nghe." },
   { h:"Điều chỉnh độ sâu, không điều chỉnh sự thật", hVi:"",
     body:"Với CEO bạn bỏ chi tiết phương pháp, nhưng không được bỏ rủi ro hay giả định yếu. Đơn giản hoá khác với che giấu.",
     example:{company:"vietjet", text:"Với CEO: 'nên mở, nhưng biên an toàn mỏng nên khởi động nhỏ'. Với đội phân tích: cả bảng tính load factor hoà vốn và độ nhạy theo giá nhiên liệu."} },
   { h:"Dùng ngôn ngữ của người nghe", hVi:"",
     body:"Nói 'lợi nhuận mỗi cửa hàng' với người vận hành bán lẻ, nói 'contribution margin' với đội tài chính. Cùng một khái niệm, hai cách gọi.",
     note:"Dùng thuật ngữ mà người nghe không quen không làm bạn trông giỏi hơn — nó chỉ làm thông điệp không tới." }
  ],
  worked:{ title:"Một kết luận, ba bản trình bày",
    steps:[
     {k:"Kết luận chung",v:"dừng mở mới, tái đàm phán mặt bằng"},
     {k:"Cho CEO",v:"tác động 93 tỷ · rủi ro nếu không làm · cần phê duyệt gì"},
     {k:"Độ dài",v:"60 giây"},
     {k:"Cho giám đốc tài chính",v:"cách tính điểm hoà vốn · độ nhạy · ảnh hưởng dòng tiền"},
     {k:"Độ dài",v:"15 phút, có bảng tính"},
     {k:"Cho giám đốc vận hành",v:"danh sách cửa hàng cần đàm phán · thứ tự · ai phụ trách"},
     {k:"Độ dài",v:"30 phút, có kế hoạch triển khai"}],
    conclusion:"Ba bản trình bày cùng dẫn tới một hành động. Sai lầm phổ biến là làm một bản duy nhất rồi dùng cho cả ba — thường là bản quá chi tiết cho CEO và quá sơ sài cho người thực thi." },
  check:[
   { kind:"mcq", xp:35, question:"Bạn trình bày cho CEO và có một giả định yếu trong phân tích. Nên làm gì?",
     options:[
      {t:"Nêu ngắn gọn giả định đó và ngưỡng làm kết luận đổi chiều",ok:true,why:"Đơn giản hoá là bỏ bớt chi tiết phương pháp, không phải bỏ rủi ro. CEO cần biết kết luận có thể sai theo hướng nào."},
      {t:"Bỏ qua vì CEO không có thời gian cho chi tiết",ok:false,why:"Đây là che giấu chứ không phải đơn giản hoá. Nếu giả định sai, CEO là người chịu hậu quả."},
      {t:"Trình bày toàn bộ phương pháp để họ tự đánh giá",ok:false,why:"Sai độ sâu cho đối tượng này — CEO không có thời gian và không cần."},
      {t:"Chỉ nêu nếu được hỏi",ok:false,why:"Rủi ro không nên phụ thuộc vào việc người nghe có nghĩ ra câu hỏi đúng hay không."}]},
   { kind:"multi", xp:30, need:2, question:"Hai điều nào KHÔNG được thay đổi khi điều chỉnh cho từng đối tượng?",
     note:"Chọn 2.",
     options:[
      {t:"Kết luận",ok:true,why:"Cùng một phân tích phải dẫn tới cùng một kết luận với mọi người nghe."},
      {t:"Rủi ro và giả định yếu",ok:true,why:"Có thể nói ngắn hơn nhưng không được bỏ."},
      {t:"Độ sâu của phần phương pháp",ok:false,why:"Đây chính là thứ nên điều chỉnh theo đối tượng."},
      {t:"Thuật ngữ sử dụng",ok:false,why:"Nên dùng ngôn ngữ quen thuộc với từng nhóm người nghe."},
      {t:"Độ dài buổi trình bày",ok:false,why:"Điều chỉnh theo đối tượng là hợp lý."}]}
  ],
  recap:["Ba loại người nghe: ra quyết định, chuyên gia, người thực thi.",
         "Điều chỉnh độ sâu và thuật ngữ; không bao giờ điều chỉnh kết luận hay rủi ro.",
         "Đơn giản hoá khác với che giấu."],
  terms:[{en:"Audience",vi:"Đối tượng nghe",d:"Người nhận thông điệp và nhu cầu của họ"},
         {en:"Level of detail",vi:"Độ sâu chi tiết",d:"Mức chi tiết phù hợp với người nghe"},
         {en:"Jargon",vi:"Thuật ngữ chuyên ngành",d:"Từ chỉ có nghĩa với người trong ngành"}]
},

{ id:"l-comm-3", module:"m-comm", order:3, minutes:5, xp:80,
  title:"One chart, one point", vi:"Một biểu đồ, một thông điệp",
  hook:{ q:"Biểu đồ của bạn có sáu đường và hai trục. Người xem hiểu gì?",
         text:"Không gì cả. Một biểu đồ tốt truyền đạt đúng một ý — và tiêu đề của nó chính là ý đó, không phải tên của dữ liệu." },
  core:[
   { h:"Tiêu đề là kết luận, không phải nhãn", hVi:"",
     body:"Đừng đặt tiêu đề 'Doanh thu theo tháng'. Đặt 'Toàn bộ tăng trưởng đến từ cửa hàng mở mới'. Người xem đọc tiêu đề trước, và tiêu đề phải nói hộ biểu đồ.",
     note:"Phép thử: che biểu đồ đi, chỉ đọc tiêu đề — người xem có nắm được thông điệp không?" },
   { h:"Bỏ mọi thứ không phục vụ thông điệp", hVi:"",
     body:"Đường lưới, hiệu ứng ba chiều, chú thích thừa, màu sắc trang trí. Mỗi yếu tố phải trả lời được câu hỏi: nó giúp người xem thấy điều gì?",
     example:{company:"mwg", text:"Biểu đồ phân bố doanh thu theo cửa hàng chỉ cần ba cột và một đường kẻ ngang ở mức hoà vốn. Thêm bất cứ gì nữa là làm loãng thông điệp."} },
   { h:"Chọn dạng biểu đồ theo thông điệp", hVi:"",
     body:"So sánh giữa các nhóm → cột. Xu hướng theo thời gian → đường. Cấu thành của một tổng → cột chồng hoặc thanh ngang. Quan hệ giữa hai biến → điểm phân tán.",
     note:"Biểu đồ tròn gần như luôn là lựa chọn kém: mắt người so sánh chiều dài tốt hơn so sánh diện tích." }
  ],
  worked:{ title:"Sửa một biểu đồ tồi",
    steps:[
     {k:"Bản gốc — tiêu đề",v:"'Doanh thu 2 năm'",note:"nhãn, không phải thông điệp"},
     {k:"Bản gốc — nội dung",v:"6 đường, 2 trục, đường lưới dày"},
     {k:"Bản gốc — người xem hiểu",v:"không rõ nên nhìn vào đâu"},
     {k:"Sửa — tiêu đề",v:"'Cửa hàng cũ đi ngang, tăng trưởng đến từ mở mới'"},
     {k:"Sửa — nội dung",v:"2 đường: cửa hàng cũ và cửa hàng mới"},
     {k:"Sửa — làm nổi",v:"đường cửa hàng cũ tô đậm, phần còn lại mờ"},
     {k:"Sửa — bỏ",v:"đường lưới, trục phụ, chú thích thừa"}],
    conclusion:"Cùng một dữ liệu, khác nhau ở chỗ bản thứ hai đã quyết định giúp người xem nên nhìn vào đâu. Đó là công việc của người trình bày, không phải của người xem." },
  check:[
   { kind:"mcq", xp:35, question:"Tiêu đề nào tốt nhất cho một biểu đồ so sánh chi phí thuê giữa cửa hàng cũ và mới?",
     options:[
      {t:"'Cửa hàng mở năm nay trả tiền thuê cao hơn 45%'",ok:true,why:"Tiêu đề chính là kết luận. Người xem nắm được thông điệp ngay cả khi không kịp nhìn kỹ biểu đồ."},
      {t:"'Chi phí thuê mặt bằng theo nhóm cửa hàng'",ok:false,why:"Là nhãn mô tả dữ liệu, không nói lên điều gì."},
      {t:"'Phân tích chi phí thuê'",ok:false,why:"Càng mơ hồ hơn nữa."},
      {t:"'Biểu đồ 3: Chi phí thuê'",ok:false,why:"Chỉ là số thứ tự và nhãn."}]},
   { kind:"multi", xp:30, need:2, question:"Hai nguyên tắc nào giúp biểu đồ dễ hiểu hơn?",
     note:"Chọn 2.",
     options:[
      {t:"Mỗi biểu đồ chỉ truyền đạt một thông điệp",ok:true,why:"Nhiều thông điệp trong một hình nghĩa là không thông điệp nào được tiếp nhận."},
      {t:"Làm nổi phần quan trọng và làm mờ phần còn lại",ok:true,why:"Quyết định giúp người xem nên nhìn vào đâu là công việc của người trình bày."},
      {t:"Hiển thị càng nhiều dữ liệu càng thuyết phục",ok:false,why:"Nhiều dữ liệu làm loãng thông điệp, không làm tăng sức thuyết phục."},
      {t:"Dùng nhiều màu để phân biệt các nhóm",ok:false,why:"Màu nên dùng để làm nổi, không để trang trí."},
      {t:"Dùng biểu đồ tròn cho mọi so sánh tỷ trọng",ok:false,why:"Mắt người so sánh chiều dài tốt hơn diện tích — cột thường tốt hơn."}]}
  ],
  recap:["Tiêu đề biểu đồ là kết luận, không phải nhãn dữ liệu.",
         "Một biểu đồ, một thông điệp — bỏ mọi thứ không phục vụ nó.",
         "Làm nổi phần quan trọng; đừng bắt người xem tự tìm."],
  terms:[{en:"Action title",vi:"Tiêu đề kết luận",d:"Tiêu đề nói thông điệp thay vì mô tả dữ liệu"},
         {en:"Data-ink ratio",vi:"Tỷ lệ mực dữ liệu",d:"Phần hình ảnh thật sự mang thông tin"},
         {en:"Highlighting",vi:"Làm nổi",d:"Nhấn mạnh phần quan trọng, làm mờ phần còn lại"}]
},

{ id:"l-comm-4", module:"m-comm", order:4, minutes:5, xp:90,
  title:"Saying I don't know", vi:"Nói 'tôi không biết' đúng cách",
  hook:{ q:"Bị hỏi một con số bạn không có. Đoán bừa hay thừa nhận?",
         text:"Cả hai đều sai. Có một cách thứ ba, và nó thường gây ấn tượng hơn cả việc biết câu trả lời." },
  core:[
   { h:"Công thức ba phần", hVi:"",
     body:"Thừa nhận không biết. Nêu cách bạn sẽ tìm ra. Đưa ra ước lượng có biên độ nếu có thể.",
     note:"'Tôi chưa có con số chính xác. Cách kiểm chứng là xem dữ liệu X. Theo ước lượng của tôi thì nó nằm trong khoảng A đến B, và tôi sẽ xác nhận trước cuối tuần.'" },
   { h:"Vì sao đoán bừa nguy hiểm hơn", hVi:"",
     body:"Một con số bịa ra sẽ được ghi lại, trích dẫn và dùng cho quyết định. Khi phát hiện sai, toàn bộ phân tích còn lại bị nghi ngờ theo.",
     note:"Chi phí của một lần 'tôi không biết' là vài giây khó chịu. Chi phí của một con số bịa là toàn bộ độ tin cậy." },
   { h:"Phân biệt không biết và chưa tính", hVi:"",
     body:"'Tôi chưa tính phần đó' khác với 'không thể biết được'. Loại thứ nhất kèm theo cam kết thời gian; loại thứ hai kèm theo giải thích vì sao.",
     example:{company:"vinfast", text:"'Tôi chưa có số liệu về tỷ lệ bán cho bên liên quan' là chưa tính. 'Không thể biết cầu bán lẻ ở Mỹ ba năm tới' là không thể biết — và cách xử lý là dựng kịch bản chứ không phải đoán một con số."} }
  ],
  worked:{ title:"Ba cách trả lời khi không biết",
    steps:[
     {k:"Câu hỏi",v:"'Tỷ lệ khách quay lại của cửa hàng mới là bao nhiêu?'"},
     {k:"Cách tệ nhất",v:"'Khoảng 30% ạ'",note:"bịa — sẽ bị trích dẫn"},
     {k:"Cách tệ nhì",v:"'Tôi không biết'",note:"đúng nhưng dừng ở đó"},
     {k:"Cách tốt — bước 1",v:"'Tôi chưa có con số đó'"},
     {k:"Bước 2",v:"'Lấy được từ dữ liệu thẻ thành viên theo cửa hàng'"},
     {k:"Bước 3",v:"'Cửa hàng cũ là 42%, tôi dự đoán cửa hàng mới thấp hơn'"},
     {k:"Bước 4",v:"'Tôi sẽ có con số chính xác trong hai ngày'"}],
    conclusion:"Cách thứ ba cho người nghe ba thứ: sự trung thực, một con đường tới câu trả lời, và một mốc thời gian. Nó biến một điểm yếu thành bằng chứng rằng bạn kiểm soát được vấn đề." },
  check:[
   { kind:"mcq", xp:35, question:"Bị hỏi một con số bạn không có. Cách trả lời tốt nhất?",
     options:[
      {t:"Thừa nhận chưa có, nêu cách tìm ra, và đưa khoảng ước lượng kèm mốc thời gian",ok:true,why:"Cho người nghe sự trung thực, một con đường và một cam kết. Đây thường gây ấn tượng hơn cả việc biết sẵn câu trả lời."},
      {t:"Đưa một con số ước chừng cho khỏi mất mặt",ok:false,why:"Con số bịa sẽ được trích dẫn và dùng cho quyết định. Khi lộ ra, toàn bộ phân tích còn lại bị nghi ngờ."},
      {t:"Nói 'tôi không biết' rồi chuyển sang phần khác",ok:false,why:"Trung thực nhưng dừng quá sớm — không cho người nghe đường đi tiếp."},
      {t:"Chuyển câu hỏi sang người khác trong phòng",ok:false,why:"Né tránh, và người nghe nhận ra ngay."}]},
   { kind:"multi", xp:30, need:2, question:"Hai điều nào nên kèm theo khi nói 'tôi chưa có con số đó'?",
     note:"Chọn 2.",
     options:[
      {t:"Cách bạn sẽ tìm ra con số đó",ok:true,why:"Cho thấy bạn biết dữ liệu nằm ở đâu, tức là bạn kiểm soát được vấn đề."},
      {t:"Mốc thời gian bạn sẽ có câu trả lời",ok:true,why:"Biến một câu trả lời thiếu thành một cam kết cụ thể."},
      {t:"Lời xin lỗi vì đã không chuẩn bị",ok:false,why:"Không cần thiết và làm giảm sự tự tin không đúng chỗ."},
      {t:"Giải thích vì sao câu hỏi đó khó",ok:false,why:"Nghe như biện hộ."},
      {t:"Một con số tạm để lấp chỗ trống",ok:false,why:"Chính là điều nguy hiểm nhất cần tránh."}]}
  ],
  recap:["Ba phần: thừa nhận, nêu cách tìm ra, đưa khoảng ước lượng kèm mốc thời gian.",
         "Con số bịa sẽ được trích dẫn — chi phí lớn hơn nhiều so với vài giây khó chịu.",
         "Phân biệt 'chưa tính' (kèm cam kết) và 'không thể biết' (kèm kịch bản)."],
  terms:[{en:"Intellectual honesty",vi:"Trung thực trí tuệ",d:"Nói rõ giới hạn hiểu biết của mình"},
         {en:"Best estimate",vi:"Ước lượng tốt nhất",d:"Con số kèm biên độ và cơ sở"},
         {en:"Follow-up commitment",vi:"Cam kết bổ sung",d:"Hứa cung cấp câu trả lời kèm mốc thời gian"}]
}
]);

/* ================= MODULE 12 · VIETNAM RETAIL ================= */
window.LESSONS = window.LESSONS.concat([

{ id:"l-vnr-1", module:"m-vnretail", order:1, minutes:5, xp:70,
  title:"Two worlds of distribution", vi:"Hai thế giới phân phối",
  hook:{ q:"Vì sao một thương hiệu quốc tế mạnh vẫn thua thương hiệu nội ở Việt Nam?",
         text:"Vì phần lớn hàng tiêu dùng ở Việt Nam vẫn bán qua tạp hoá, chợ và cửa hàng nhỏ — nơi mà quảng cáo truyền hình không quyết định được gì, người bán hàng mới quyết định." },
  core:[
   { h:"Kênh truyền thống", hVi:"General trade — GT",
     body:"Hàng trăm nghìn tạp hoá, chợ, cửa hàng nhỏ. Chủ tiệm quyết định bày gì lên kệ, và họ bày thứ bán chạy và có chiết khấu tốt.",
     note:"GT vẫn chiếm phần lớn doanh số hàng tiêu dùng nhanh tại Việt Nam. Muốn có mặt ở đó cần đội bán hàng đi từng điểm, không phải ngân sách quảng cáo." },
   { h:"Kênh hiện đại", hVi:"Modern trade — MT",
     body:"Siêu thị, minimart, cửa hàng tiện lợi. Ít điểm hơn nhưng mỗi điểm doanh số lớn, có dữ liệu bán hàng, và đàm phán tập trung.",
     example:{company:"masan", text:"Sở hữu cả nhà sản xuất lẫn chuỗi minimart nghĩa là kiểm soát được kệ hàng ở kênh MT — lợi thế mà đối thủ FMCG thuần không có."} },
   { h:"Vì sao độ phủ GT là moat thật", hVi:"",
     body:"Xây quan hệ với hàng trăm nghìn điểm bán mất nhiều năm và cần đội ngũ đông. Tiền không mua được nó trong một hai năm.",
     note:"Đây là lý do các thương hiệu nội địa lâu năm giữ được thị phần trước đối thủ ngoại có ngân sách lớn hơn nhiều." }
  ],
  worked:{ title:"Vì sao độ phủ quan trọng hơn quảng cáo ở kênh GT",
    steps:[
     {k:"Người tiêu dùng vào tạp hoá",v:"muốn mua nước mắm"},
     {k:"Trên kệ có",v:"2-3 nhãn, không phải 20 nhãn"},
     {k:"Ai quyết định 2-3 nhãn đó",v:"chủ tiệm"},
     {k:"Chủ tiệm chọn theo",v:"bán chạy · chiết khấu · nhân viên bán hàng ghé đều"},
     {k:"Quảng cáo truyền hình tác động",v:"gián tiếp, qua việc khách hỏi tên"},
     {k:"Không có mặt trên kệ",v:"quảng cáo hay tới đâu cũng không bán được"}],
    conclusion:"Ở kênh truyền thống, cuộc chiến diễn ra ở kệ hàng chứ không ở màn hình. Đó là lý do một thương hiệu có đội bán hàng phủ 200.000 điểm khó bị đánh bại bởi một thương hiệu có ngân sách quảng cáo gấp đôi." },
  check:[
   { kind:"calc", xp:35, question:"Thị trường hàng tiêu dùng nhanh khoảng 800 nghìn tỷ/năm, kênh hiện đại chiếm 12%. Doanh số kênh hiện đại là bao nhiêu nghìn tỷ?",
     unit:"nghìn tỷ", answer:96, tol:5, hint:"Nhân tổng thị trường với tỷ trọng kênh.",
     working:[{k:"Tổng thị trường",v:"800 nghìn tỷ"},{k:"Tỷ trọng MT",v:"12%"},{k:"Kênh hiện đại",v:"96 nghìn tỷ"},{k:"Kênh truyền thống",v:"704 nghìn tỷ"}],
     why:"Kênh truyền thống lớn gấp hơn bảy lần kênh hiện đại. Một chiến lược bỏ qua GT là chiến lược bỏ qua phần lớn thị trường — dù GT khó phục vụ hơn nhiều." },
   { kind:"mcq", xp:30, question:"Thương hiệu quốc tế mới vào Việt Nam nên ưu tiên gì trong 24 tháng đầu?",
     options:[
      {t:"Xây năng lực phân phối tới kênh truyền thống",ok:true,why:"Đây là rào cản thật và mất nhiều năm để xây. Không có mặt trên kệ thì mọi khoản đầu tư khác đều lãng phí."},
      {t:"Đầu tư mạnh vào quảng cáo truyền hình",ok:false,why:"Tạo nhu cầu mà không có hàng để mua là cách nhanh nhất đốt ngân sách."},
      {t:"Ký hợp đồng độc quyền với một chuỗi siêu thị lớn",ok:false,why:"Chỉ tiếp cận được một phần nhỏ của thị trường."},
      {t:"Giảm giá sâu để giành thị phần",ok:false,why:"Giá thấp không giúp gì nếu sản phẩm không có trên kệ nơi khách mua."}]}
  ],
  recap:["Phần lớn hàng tiêu dùng Việt Nam vẫn bán qua kênh truyền thống.",
         "Ở kênh GT, chủ tiệm quyết định bày gì — không phải quảng cáo.",
         "Độ phủ điểm bán là moat thật vì tiền không mua được nó trong một hai năm."],
  terms:[{en:"General trade",vi:"Kênh truyền thống",d:"Tạp hoá, chợ, cửa hàng nhỏ lẻ"},
         {en:"Modern trade",vi:"Kênh hiện đại",d:"Siêu thị, minimart, cửa hàng tiện lợi"},
         {en:"Distribution coverage",vi:"Độ phủ phân phối",d:"Số điểm bán có sản phẩm của bạn"}]
},

{ id:"l-vnr-2", module:"m-vnretail", order:2, minutes:6, xp:80,
  title:"Why minimarts struggle", vi:"Vì sao minimart khó có lãi",
  hook:{ q:"Cửa hàng tiện lợi mọc khắp nơi. Vì sao gần như không chuỗi nào có lãi?",
         text:"Vì họ cạnh tranh với một đối thủ có cấu trúc chi phí gần bằng không: chợ và tạp hoá đầu ngõ." },
  core:[
   { h:"Đối thủ thật không phải chuỗi khác", hVi:"",
     body:"Tạp hoá không trả lương quản lý, không khấu hao tủ lạnh công nghiệp, không chịu chi phí hệ thống. Chủ tiệm sống ngay tại đó. Ngưỡng hoà vốn của họ thấp hơn nhiều lần.",
     note:"Minimart phải bù lại bằng thứ tạp hoá không có: hàng đảm bảo, giá niêm yết, sạch sẽ, giờ mở cửa dài. Câu hỏi là khách có trả thêm cho những thứ đó không." },
   { h:"Ngưỡng hoà vốn cao", hVi:"",
     body:"Một minimart cần khoảng 750 triệu tới 1 tỷ doanh thu mỗi tháng để hoà vốn sau khi tính đủ thuê, nhân sự, điện, khấu hao và phân bổ kho vận.",
     example:{company:"masan", text:"Chuỗi minimart lớn nhất nước có doanh thu trung bình khoảng 600 triệu mỗi cửa hàng mỗi tháng — dưới ngưỡng hoà vốn, và đó là lý do mảng bán lẻ vẫn lỗ dù quy mô rất lớn."} },
   { h:"Bẫy mở rộng nhanh", hVi:"",
     body:"Mở thêm cửa hàng làm tổng doanh thu tăng và tạo cảm giác tăng trưởng, nhưng nếu mỗi cửa hàng dưới ngưỡng hoà vốn thì mỗi cửa hàng mới là thêm một khoản lỗ cố định.",
     note:"Chỉ số phải nhìn không phải số cửa hàng mà là bao nhiêu phần trăm cửa hàng vượt ngưỡng hoà vốn." }
  ],
  worked:{ title:"Kinh tế một cửa hàng minimart",
    steps:[
     {k:"Doanh thu",v:"600 triệu/tháng"},
     {k:"Biên gộp 22%",v:"132 triệu"},
     {k:"Thuê mặt bằng",v:"−60 triệu"},
     {k:"Nhân sự 5 người",v:"−70 triệu"},
     {k:"Điện, khấu hao thiết bị",v:"−30 triệu"},
     {k:"Kho vận & quản lý phân bổ",v:"−20 triệu"},
     {k:"Kết quả",v:"lỗ 48 triệu/tháng"},
     {k:"Doanh thu cần để hoà vốn",v:"180 ÷ 22% ≈ 818 triệu"}],
    conclusion:"Khoảng cách giữa 600 và 818 triệu là 36% doanh thu. Không có mẹo vận hành nào lấp được khoảng cách đó — chỉ có hai đường: kéo thêm khách, hoặc hạ ngưỡng hoà vốn bằng cách chuẩn hoá mô hình cửa hàng nhỏ hơn." },
  check:[
   { kind:"calc", xp:35, question:"Cửa hàng doanh thu 600 triệu/tháng, biên gộp 22%, tổng chi phí cố định 180 triệu. Lợi nhuận cửa hàng là bao nhiêu triệu?",
     unit:"triệu VND", answer:-48, tol:5, hint:"Biên gộp trừ chi phí cố định. Kết quả có thể âm.",
     working:[{k:"Biên gộp",v:"600 × 22% = 132 triệu"},{k:"Chi phí cố định",v:"180 triệu"},{k:"Lợi nhuận",v:"−48 triệu"}],
     why:"Lỗ 48 triệu mỗi tháng mỗi cửa hàng. Nhân với 3.500 cửa hàng là gần 2.000 tỷ lỗ mỗi năm — và đó là lý do vì sao quy mô lớn không cứu được mô hình chưa vượt ngưỡng hoà vốn." },
   { kind:"mcq", xp:30, question:"Chuỗi minimart có 3.500 cửa hàng, doanh thu trung bình dưới ngưỡng hoà vốn. Nên làm gì trước?",
     options:[
      {t:"Hạ ngưỡng hoà vốn bằng cách chuẩn hoá mô hình cửa hàng và cắt chi phí cố định",ok:true,why:"Kéo ngưỡng xuống thường nhanh hơn, rẻ hơn và chắc chắn hơn so với việc cố kéo doanh thu lên ở một thị trường cạnh tranh với tạp hoá."},
      {t:"Mở thêm 2.000 cửa hàng để tăng sức mua với nhà cung cấp",ok:false,why:"Nhân bản một mô hình lỗ. Sức mua tăng thêm không bù nổi chi phí cố định của mỗi cửa hàng mới."},
      {t:"Tăng giá bán 8% để cải thiện biên gộp",ok:false,why:"Minimart cạnh tranh trực tiếp với tạp hoá về giá — tăng giá làm mất chính lượng khách đang thiếu."},
      {t:"Đóng toàn bộ chuỗi",ok:false,why:"Quá sớm khi chưa thử các đòn bẩy vận hành và chuẩn hoá mô hình."}]}
  ],
  recap:["Đối thủ thật của minimart là tạp hoá — nơi có ngưỡng hoà vốn thấp hơn nhiều lần.",
         "Ngưỡng hoà vốn một minimart khoảng 750 triệu tới 1 tỷ mỗi tháng.",
         "Chỉ số phải nhìn là % cửa hàng vượt ngưỡng, không phải tổng số cửa hàng."],
  terms:[{en:"Convenience store",vi:"Cửa hàng tiện lợi",d:"Cửa hàng nhỏ, giờ mở dài, hàng thiết yếu"},
         {en:"Break-even revenue",vi:"Doanh thu hoà vốn",d:"Mức doanh thu vừa đủ bù chi phí"},
         {en:"Store density",vi:"Mật độ cửa hàng",d:"Số cửa hàng trên một khu vực"}]
},

{ id:"l-vnr-3", module:"m-vnretail", order:3, minutes:5, xp:80,
  title:"The fresh food problem", vi:"Bài toán hàng tươi",
  hook:{ q:"Vì sao chuỗi bán lẻ nào cũng muốn bán hàng tươi dù nó khó nhất?",
         text:"Vì rau thịt cá là lý do người Việt đi chợ mỗi ngày. Ai giải được bài toán hàng tươi sẽ có lưu lượng khách hàng ngày — thứ mà hàng khô không bao giờ mang lại." },
  core:[
   { h:"Hàng tươi kéo tần suất", hVi:"",
     body:"Khách mua dầu gội hai tháng một lần, nhưng mua rau mỗi ngày. Hàng tươi biến cửa hàng từ điểm mua thỉnh thoảng thành điểm ghé hàng ngày.",
     note:"Tần suất cao làm chi phí lấy khách được phân bổ mỏng đi, và tạo thói quen khó bị phá vỡ." },
   { h:"Nhưng hao hụt ăn hết lợi nhuận", hVi:"Shrinkage",
     body:"Rau héo, thịt quá hạn, cá ươn — mọi thứ không bán được trong ngày đều thành chi phí. Chuẩn khu vực là 3-4% doanh thu ngành hàng tươi; nhiều chuỗi Việt Nam ở mức 6-7%.",
     example:{company:"mwg", text:"Hao hụt hàng tươi 6,5% so với chuẩn 3-4% làm biên gộp toàn chuỗi giảm khoảng một điểm phần trăm — bằng đúng khoảng cách giữa lỗ và hoà vốn."} },
   { h:"Ba nguyên nhân của hao hụt", hVi:"",
     body:"Dự báo nhu cầu sai (đặt quá nhiều), quy trình đặt hàng chậm (không điều chỉnh kịp theo ngày), và chuỗi lạnh yếu (hàng hỏng trên đường).",
     note:"Ba nguyên nhân này cần ba giải pháp khác nhau. Chẩn đoán sai nguyên nhân là lý do nhiều chương trình giảm hao hụt thất bại." }
  ],
  worked:{ title:"Hao hụt tốn bao nhiêu tiền thật",
    steps:[
     {k:"Doanh thu cửa hàng",v:"600 triệu/tháng"},
     {k:"Tỷ trọng hàng tươi 35%",v:"210 triệu"},
     {k:"Hao hụt hiện tại 6,5%",v:"−13,65 triệu"},
     {k:"Hao hụt nếu đạt chuẩn 3,5%",v:"−7,35 triệu"},
     {k:"Chênh lệch",v:"6,3 triệu/tháng/cửa hàng"},
     {k:"Nhân 3.500 cửa hàng",v:"≈ 265 tỷ/năm"},
     {k:"Cần vốn đầu tư",v:"gần như không"}],
    conclusion:"265 tỷ mỗi năm chỉ từ việc đưa hao hụt về chuẩn ngành — không cần mở thêm cửa hàng nào, không cần thêm vốn. Đây là loại đòn bẩy mà mọi phân tích bán lẻ nên tìm trước khi bàn tới mở rộng." },
  check:[
   { kind:"calc", xp:35, question:"Cửa hàng doanh thu 600 triệu/tháng, hàng tươi chiếm 35%. Nếu hao hụt giảm từ 6,5% xuống 3,5%, tiết kiệm bao nhiêu triệu mỗi tháng?",
     unit:"triệu VND", answer:6.3, tol:0.5, hint:"Doanh thu hàng tươi × mức giảm hao hụt.",
     working:[{k:"Doanh thu hàng tươi",v:"600 × 35% = 210 triệu"},{k:"Mức giảm hao hụt",v:"3 điểm phần trăm"},{k:"Tiết kiệm",v:"210 × 3% = 6,3 triệu"}],
     why:"6,3 triệu mỗi tháng nghe nhỏ, nhưng nhân với hàng nghìn cửa hàng và 12 tháng thì thành hàng trăm tỷ — và không tốn một đồng vốn đầu tư nào." },
   { kind:"multi", xp:30, need:3, question:"Ba nguyên nhân chính của hao hụt hàng tươi là gì?",
     note:"Chọn 3.",
     options:[
      {t:"Dự báo nhu cầu sai dẫn tới đặt hàng quá nhiều",ok:true,why:"Hàng đặt dư không bán hết trong ngày là hao hụt trực tiếp."},
      {t:"Quy trình đặt hàng không điều chỉnh kịp theo ngày",ok:true,why:"Nhu cầu hàng tươi biến động mạnh theo ngày trong tuần và thời tiết."},
      {t:"Chuỗi lạnh yếu làm hàng hỏng trên đường vận chuyển",ok:true,why:"Hàng hỏng trước khi lên kệ vẫn là hao hụt và còn khó phát hiện hơn."},
      {t:"Giá bán quá cao",ok:false,why:"Ảnh hưởng tới doanh số nhưng không phải nguyên nhân trực tiếp của hao hụt."},
      {t:"Cửa hàng quá nhỏ",ok:false,why:"Diện tích không quyết định tỷ lệ hao hụt."},
      {t:"Thiếu quảng cáo",ok:false,why:"Không liên quan tới quy trình vận hành hàng tươi."}]}
  ],
  recap:["Hàng tươi kéo tần suất ghé cửa hàng — thứ hàng khô không làm được.",
         "Hao hụt 6-7% so với chuẩn 3-4% có thể là toàn bộ khoảng cách giữa lỗ và lãi.",
         "Ba nguyên nhân — dự báo, quy trình đặt hàng, chuỗi lạnh — cần ba giải pháp khác nhau."],
  terms:[{en:"Fresh food",vi:"Hàng tươi",d:"Rau, thịt, cá — hàng có hạn sử dụng rất ngắn"},
         {en:"Shrinkage",vi:"Hao hụt",d:"Hàng mất giá trị trước khi bán được"},
         {en:"Footfall",vi:"Lưu lượng khách",d:"Số lượt khách vào cửa hàng"}]
},

{ id:"l-vnr-4", module:"m-vnretail", order:4, minutes:5, xp:90,
  title:"Private label and shelf power", vi:"Nhãn riêng và quyền lực kệ hàng",
  hook:{ q:"Nhà bán lẻ bán hàng của chính mình. Đó là cạnh tranh không lành mạnh hay chiến lược thông minh?",
         text:"Là chiến lược — và là một trong số ít đòn bẩy giúp nhà bán lẻ Việt Nam cải thiện biên mà không cần tăng giá." },
  core:[
   { h:"Vì sao nhãn riêng có biên cao hơn", hVi:"Private label",
     body:"Không phải trả phần biên cho thương hiệu và không tốn chi phí marketing đại chúng. Nhà bán lẻ giữ lại phần đó.",
     note:"Biên gộp hàng thương hiệu ở minimart thường khoảng 18-22%. Nhãn riêng có thể đạt 30-35%." },
   { h:"Nhưng có trần", hVi:"",
     body:"Khách vào cửa hàng để mua thương hiệu họ tin. Nếu kệ toàn nhãn riêng, họ sẽ đi nơi khác. Tỷ trọng nhãn riêng quá cao làm giảm chính lưu lượng khách.",
     example:{company:"masan", text:"Sở hữu cả nhà sản xuất lẫn chuỗi bán lẻ cho phép đẩy hàng của mình, nhưng nếu khách không tìm thấy thương hiệu quen thì họ quay lại tạp hoá."} },
   { h:"Quyền lực kệ hàng", hVi:"Shelf power",
     body:"Nhà bán lẻ quyết định sản phẩm nào ở tầm mắt, sản phẩm nào ở kệ dưới. Vị trí trên kệ ảnh hưởng doanh số mạnh tới mức nhà sản xuất sẵn sàng trả tiền cho nó.",
     note:"Phí trưng bày là nguồn thu biên rất cao của nhà bán lẻ — và là chi phí thật của nhà sản xuất." }
  ],
  worked:{ title:"Tác động của nhãn riêng lên biên gộp",
    steps:[
     {k:"Biên hàng thương hiệu",v:"20%"},
     {k:"Biên nhãn riêng",v:"33%"},
     {k:"Tỷ trọng nhãn riêng hiện tại",v:"15%"},
     {k:"Biên gộp bình quân",v:"15% × 33% + 85% × 20% = 21,95%"},
     {k:"Nếu nâng lên 30%",v:"30% × 33% + 70% × 20% = 23,9%"},
     {k:"Cải thiện",v:"+1,95 điểm phần trăm"},
     {k:"Trên doanh thu 600 triệu",v:"+11,7 triệu/cửa hàng/tháng"}],
    conclusion:"Gần 2 điểm biên gộp mà không tăng giá bán một đồng nào. Nhưng phải theo dõi lưu lượng khách — nếu số hoá đơn giảm sau khi đẩy nhãn riêng, đòn bẩy này đã bị dùng quá tay." },
  check:[
   { kind:"calc", xp:35, question:"Biên hàng thương hiệu 20%, biên nhãn riêng 33%. Nếu nhãn riêng chiếm 30% doanh thu, biên gộp bình quân là bao nhiêu phần trăm?",
     unit:"%", answer:23.9, tol:0.8, hint:"Bình quân gia quyền theo tỷ trọng doanh thu.",
     working:[{k:"Phần nhãn riêng",v:"30% × 33% = 9,9%"},{k:"Phần thương hiệu",v:"70% × 20% = 14,0%"},{k:"Biên bình quân",v:"23,9%"}],
     why:"So với mức 22% khi nhãn riêng chỉ chiếm 15%, đây là cải thiện gần 2 điểm — đáng kể trong một ngành mà toàn bộ biên lợi nhuận ròng chỉ vài phần trăm." },
   { kind:"mcq", xp:35, question:"Chuỗi nâng tỷ trọng nhãn riêng lên 45%. Chỉ số nào cần theo dõi sát nhất?",
     options:[
      {t:"Số hoá đơn mỗi ngày — nếu khách không tìm thấy thương hiệu quen, họ sẽ đi nơi khác",ok:true,why:"Nhãn riêng cải thiện biên nhưng có thể làm giảm lưu lượng. Biên cao trên ít khách hơn có thể tệ hơn biên thấp trên nhiều khách."},
      {t:"Biên gộp bình quân",ok:false,why:"Chắc chắn tăng — đó là lý do làm nhãn riêng. Nó không cảnh báo được rủi ro."},
      {t:"Số lượng SKU nhãn riêng",ok:false,why:"Là đầu vào, không phải chỉ số kết quả."},
      {t:"Chi phí marketing",ok:false,why:"Nhãn riêng vốn không tốn marketing đại chúng."}]}
  ],
  recap:["Nhãn riêng có biên cao hơn vì không trả phần biên cho thương hiệu và không tốn marketing.",
         "Nhưng có trần: khách vào cửa hàng để mua thương hiệu họ tin.",
         "Theo dõi số hoá đơn, không chỉ biên gộp, khi đẩy nhãn riêng."],
  terms:[{en:"Private label",vi:"Nhãn riêng",d:"Sản phẩm mang thương hiệu của nhà bán lẻ"},
         {en:"Shelf space",vi:"Diện tích kệ",d:"Vị trí trưng bày sản phẩm trong cửa hàng"},
         {en:"Listing fee",vi:"Phí trưng bày",d:"Tiền nhà sản xuất trả để có vị trí trên kệ"}]
}
]);

/* ================= MODULE 13 · VIETNAM BANKING ================= */
window.LESSONS = window.LESSONS.concat([

{ id:"l-vnb-1", module:"m-vnbank", order:1, minutes:5, xp:70,
  title:"How a Vietnamese bank makes money", vi:"Ngân hàng Việt Nam kiếm tiền thế nào",
  hook:{ q:"Ngân hàng bán gì?",
         text:"Bán tiền — mua vào với một mức giá, bán ra với một mức giá cao hơn. Toàn bộ phần còn lại là quản trị rủi ro để đảm bảo tiền bán ra quay về được." },
  core:[
   { h:"Ba nguồn thu", hVi:"",
     body:"Thu nhập lãi thuần từ chênh lệch lãi suất. Thu phí dịch vụ: thanh toán, thẻ, bảo hiểm, ngoại hối. Thu từ kinh doanh nguồn vốn và đầu tư.",
     note:"Ở phần lớn ngân hàng Việt Nam, thu nhập lãi thuần chiếm 70-80% tổng thu. Đó là lý do NIM là chỉ số quan trọng nhất." },
   { h:"NIM", hVi:"Biên lãi thuần",
     body:"Lợi suất bình quân của tài sản sinh lời trừ chi phí bình quân của nguồn vốn. Đây là biên gộp của ngành ngân hàng.",
     example:{company:"techcombank", text:"NIM khoảng 4% là mức cao trong ngành. Vietcombank thấp hơn nhưng đổi lại có tỷ lệ nợ xấu thấp nhất — hai chiến lược khác nhau, hai vị trí trên đường đánh đổi rủi ro và lợi nhuận."} },
   { h:"Chi phí tín dụng quyết định lợi nhuận cuối", hVi:"Cost of risk",
     body:"NIM cao không có nghĩa lãi nhiều. Nếu khoản vay không đòi được, ngân hàng phải trích dự phòng và toàn bộ phần biên bị xoá sổ.",
     note:"Cho vay lãi 12% mà 3% dư nợ mất trắng thì thực thu chỉ còn 9% — và đó là trước chi phí vốn." }
  ],
  worked:{ title:"Từ NIM tới lợi nhuận",
    steps:[
     {k:"Dư nợ cho vay",v:"400.000 tỷ"},
     {k:"NIM",v:"3,5%"},
     {k:"Thu nhập lãi thuần",v:"14.000 tỷ"},
     {k:"Thu phí dịch vụ",v:"+3.500 tỷ"},
     {k:"Chi phí hoạt động (CIR 35%)",v:"−6.125 tỷ"},
     {k:"Chi phí dự phòng rủi ro",v:"−4.000 tỷ",note:"biến số quyết định"},
     {k:"Lợi nhuận trước thuế",v:"≈ 7.375 tỷ"}],
    conclusion:"Chi phí dự phòng là dòng biến động mạnh nhất và khó dự báo nhất. Một năm chu kỳ tín dụng xấu đi có thể nhân đôi dòng này và xoá sạch tăng trưởng lợi nhuận — dù NIM và thu phí không đổi." },
  check:[
   { kind:"calc", xp:35, question:"Ngân hàng có dư nợ 400.000 tỷ và NIM 3,5%. Thu nhập lãi thuần là bao nhiêu tỷ?",
     unit:"tỷ VND", answer:14000, tol:500, hint:"Dư nợ nhân NIM.",
     working:[{k:"Dư nợ",v:"400.000 tỷ"},{k:"NIM",v:"3,5%"},{k:"Thu nhập lãi thuần",v:"14.000 tỷ"}],
     why:"Mỗi 0,1 điểm NIM trên quy mô này là 400 tỷ. Đó là lý do các ngân hàng chiến đấu quyết liệt cho từng phần mười điểm phần trăm chi phí vốn." },
   { kind:"mcq", xp:30, question:"Ngân hàng A có NIM 5%, ngân hàng B có NIM 3%. Kết luận nào đúng?",
     options:[
      {t:"Chưa kết luận được — phải xem chi phí tín dụng, vì NIM cao thường đi kèm rủi ro cao hơn",ok:true,why:"NIM là biên gộp, không phải lợi nhuận. Ngân hàng cho vay nhóm rủi ro cao có NIM cao nhưng cũng mất nhiều hơn vì nợ xấu."},
      {t:"A hiệu quả hơn B",ok:false,why:"Chỉ đúng nếu chi phí tín dụng của hai bên tương đương — điều gần như không bao giờ xảy ra."},
      {t:"B đang mất thị phần",ok:false,why:"NIM thấp có thể là lựa chọn chiến lược tập trung vào khách hàng an toàn."},
      {t:"A nên giảm lãi suất cho vay",ok:false,why:"Không suy ra được từ dữ liệu này."}]}
  ],
  recap:["Ngân hàng kiếm tiền từ chênh lệch lãi suất, phí dịch vụ và kinh doanh nguồn vốn.",
         "NIM là biên gộp của ngành ngân hàng, chiếm 70-80% tổng thu ở Việt Nam.",
         "NIM cao không đồng nghĩa lãi nhiều — chi phí tín dụng quyết định lợi nhuận cuối."],
  terms:[{en:"NIM",vi:"Biên lãi thuần",d:"Lợi suất tài sản trừ chi phí vốn"},
         {en:"Cost of risk",vi:"Chi phí tín dụng",d:"Dự phòng cho khoản vay có thể mất"},
         {en:"CIR",vi:"Tỷ lệ chi phí trên thu nhập",d:"Chi phí hoạt động chia tổng thu nhập"}]
},

{ id:"l-vnb-2", module:"m-vnbank", order:2, minutes:6, xp:80,
  title:"CASA — the cost of funds war", vi:"CASA và cuộc chiến chi phí vốn",
  hook:{ q:"Vì sao mọi ngân hàng đều miễn phí chuyển tiền?",
         text:"Vì họ không bán dịch vụ chuyển tiền. Họ đang mua thứ khác: số dư tài khoản thanh toán của bạn — nguồn vốn rẻ nhất mà một ngân hàng có thể có." },
  core:[
   { h:"CASA", hVi:"Tiền gửi không kỳ hạn",
     body:"Số dư trong tài khoản thanh toán, ngân hàng gần như không trả lãi. So với tiền gửi có kỳ hạn phải trả 5-6%, đây là nguồn vốn gần như miễn phí.",
     note:"CASA = Current Account Savings Account. Tỷ lệ CASA càng cao, chi phí vốn bình quân càng thấp." },
   { h:"Vì sao CASA là moat", hVi:"",
     body:"Khách để tiền trong tài khoản thanh toán vì tiện, không vì lãi. Muốn có CASA phải là ngân hàng khách dùng hàng ngày — trả lương, thanh toán, chuyển khoản.",
     example:{company:"techcombank", text:"Tỷ lệ CASA 35-40% cho phép chi phí vốn thấp hơn đối thủ một cách cấu trúc, và đó là nguồn gốc của NIM cao — không phải do cho vay lãi cao hơn."} },
   { h:"Cuộc đua miễn phí", hVi:"",
     body:"Khi mọi ngân hàng đều miễn phí giao dịch, lợi thế CASA bị san phẳng dần. Ngân hàng phải tìm cách khác để trở thành tài khoản chính của khách hàng.",
     note:"Đó là lý do các ngân hàng đầu tư mạnh vào ứng dụng, trả lương qua tài khoản, và hệ sinh thái thanh toán." }
  ],
  worked:{ title:"CASA ảnh hưởng chi phí vốn thế nào",
    steps:[
     {k:"Tổng huy động",v:"500.000 tỷ"},
     {k:"CASA 35%",v:"175.000 tỷ, lãi 0,5%"},
     {k:"Tiền gửi kỳ hạn 65%",v:"325.000 tỷ, lãi 5,5%"},
     {k:"Chi phí vốn bình quân",v:"0,35×0,5% + 0,65×5,5% = 3,75%"},
     {k:"Nếu CASA giảm còn 25%",v:"0,25×0,5% + 0,75×5,5% = 4,25%"},
     {k:"Chênh lệch",v:"0,5 điểm phần trăm"},
     {k:"Trên 500.000 tỷ",v:"2.500 tỷ mỗi năm"}],
    conclusion:"CASA giảm 10 điểm làm chi phí vốn tăng 0,5 điểm, tương đương 2.500 tỷ lợi nhuận bốc hơi mỗi năm. Đây là lý do tỷ lệ CASA được theo dõi hàng quý và là con số đầu tiên nhà phân tích nhìn vào." },
  check:[
   { kind:"calc", xp:40, question:"Ngân hàng có CASA 35% với lãi suất 0,5%, phần còn lại là tiền gửi kỳ hạn lãi 5,5%. Chi phí vốn bình quân là bao nhiêu phần trăm?",
     unit:"%", answer:3.75, tol:0.15, hint:"Bình quân gia quyền theo tỷ trọng.",
     working:[{k:"Phần CASA",v:"0,35 × 0,5% = 0,175%"},{k:"Phần có kỳ hạn",v:"0,65 × 5,5% = 3,575%"},{k:"Chi phí vốn bình quân",v:"3,75%"}],
     why:"So với ngân hàng có CASA chỉ 20% (chi phí vốn 4,5%), chênh lệch 0,75 điểm trên toàn bộ nguồn vốn là lợi thế cấu trúc mà đối thủ không thể xoá bằng cách cho vay lãi cao hơn." },
   { kind:"mcq", xp:30, question:"CASA của ngân hàng giảm từ 40% xuống 33%. Điều gì quan trọng nhất cần xác định?",
     options:[
      {t:"Khách rời đi hẳn, hay chỉ chuyển tiền sang kỳ hạn để hưởng lãi cao",ok:true,why:"Hai nguyên nhân này có hai cách xử lý hoàn toàn khác nhau. Chuyển sang kỳ hạn là hiện tượng chu kỳ lãi suất; khách rời đi là mất quan hệ."},
      {t:"Lãi suất tiền gửi có kỳ hạn đang là bao nhiêu",ok:false,why:"Là bối cảnh hữu ích nhưng không trả lời được câu hỏi cốt lõi."},
      {t:"Đối thủ có CASA bao nhiêu",ok:false,why:"So sánh hữu ích nhưng không chỉ ra hành động."},
      {t:"Cần tăng lãi suất tiền gửi không kỳ hạn",ok:false,why:"Làm mất chính lợi thế chi phí vốn mà CASA mang lại."}]}
  ],
  recap:["CASA là tiền gửi không kỳ hạn — nguồn vốn gần như miễn phí.",
         "Tỷ lệ CASA quyết định chi phí vốn, và chi phí vốn quyết định NIM.",
         "CASA giảm 10 điểm có thể tương đương hàng nghìn tỷ lợi nhuận."],
  terms:[{en:"CASA",vi:"Tiền gửi không kỳ hạn",d:"Số dư tài khoản thanh toán, lãi rất thấp"},
         {en:"Cost of funds",vi:"Chi phí vốn",d:"Lãi suất bình quân ngân hàng trả cho nguồn vốn"},
         {en:"Term deposit",vi:"Tiền gửi có kỳ hạn",d:"Tiền gửi cam kết thời gian, lãi cao hơn"}]
},

{ id:"l-vnb-3", module:"m-vnbank", order:3, minutes:6, xp:80,
  title:"The credit cycle", vi:"Chu kỳ tín dụng và nợ xấu",
  hook:{ q:"Vì sao ngân hàng luôn báo lãi tốt ngay trước khủng hoảng?",
         text:"Vì lợi nhuận hôm nay là kết quả của các quyết định cho vay hai ba năm trước. Rủi ro được ghi nhận rất chậm so với lúc nó được tạo ra." },
  core:[
   { h:"Độ trễ của rủi ro tín dụng", hVi:"",
     body:"Khoản vay xấu không xấu ngay. Khách trả được vài kỳ đầu, rồi mới bắt đầu chậm. Từ lúc cho vay sai tới lúc nó hiện trên báo cáo thường mất 18-36 tháng.",
     note:"Hệ quả: ngân hàng tăng trưởng tín dụng nhanh nhất trong một chu kỳ thường là ngân hàng có nợ xấu cao nhất ở chu kỳ sau." },
   { h:"NPL và tỷ lệ bao phủ", hVi:"",
     body:"NPL là tỷ lệ nợ xấu trên tổng dư nợ. Tỷ lệ bao phủ cho biết ngân hàng đã trích dự phòng bao nhiêu phần trăm số nợ xấu đó.",
     example:{company:"vcb", text:"Tỷ lệ bao phủ nợ xấu trên 200% nghĩa là đã trích dự phòng gấp đôi số nợ xấu hiện có — một tấm đệm rất dày cho chu kỳ đi xuống."} },
   { h:"Tập trung danh mục", hVi:"Concentration",
     body:"Cho vay tập trung vào một ngành làm ngân hàng phụ thuộc vào chu kỳ của ngành đó. Bất động sản là ví dụ rõ nhất ở Việt Nam.",
     note:"Câu hỏi phải đặt: nếu ngành lớn nhất trong danh mục suy giảm hai năm, vốn của ngân hàng có đủ hấp thụ tổn thất không?" }
  ],
  worked:{ title:"Chi phí của một chu kỳ tín dụng xấu",
    steps:[
     {k:"Dư nợ",v:"300.000 tỷ"},
     {k:"NPL đầu kỳ",v:"0,8%"},
     {k:"NPL cuối kỳ",v:"1,6%"},
     {k:"Nợ xấu tăng thêm",v:"0,8% × 300.000 = 2.400 tỷ"},
     {k:"Trích dự phòng 100%",v:"−2.400 tỷ lợi nhuận"},
     {k:"So với lợi nhuận năm",v:"khoảng một phần ba"},
     {k:"Nếu chu kỳ kéo dài 2 năm",v:"tác động nhân đôi"}],
    conclusion:"NPL tăng 0,8 điểm nghe nhỏ, nhưng trên quy mô dư nợ lớn nó xoá đi một phần ba lợi nhuận năm. Đó là lý do nhà phân tích ngân hàng đọc bảng cân đối trước, đọc dòng lợi nhuận sau." },
  check:[
   { kind:"calc", xp:35, question:"Dư nợ 300.000 tỷ, tỷ lệ nợ xấu tăng từ 0,8% lên 1,6%. Nếu trích dự phòng 100% phần tăng thêm, lợi nhuận giảm bao nhiêu tỷ?",
     unit:"tỷ VND", answer:2400, tol:150, hint:"Dư nợ nhân mức tăng của tỷ lệ nợ xấu.",
     working:[{k:"Mức tăng NPL",v:"1,6% − 0,8% = 0,8 điểm"},{k:"Dư nợ",v:"300.000 tỷ"},{k:"Dự phòng tăng thêm",v:"2.400 tỷ"}],
     why:"2.400 tỷ chỉ từ 0,8 điểm phần trăm. Đây là lý do vì sao trong ngân hàng, tốc độ thay đổi của NPL quan trọng hơn nhiều so với mức tuyệt đối của nó." },
   { kind:"multi", xp:35, need:2, question:"Hai chỉ số nào cho biết ngân hàng chịu được chu kỳ xấu tới đâu?",
     note:"Chọn 2.",
     options:[
      {t:"Tỷ lệ bao phủ nợ xấu",ok:true,why:"Cho biết đã trích dự phòng bao nhiêu — tức còn bao nhiêu đệm trước khi tổn thất ăn vào lợi nhuận."},
      {t:"Mức độ tập trung danh mục vào một ngành",ok:true,why:"Danh mục tập trung nghĩa là một ngành suy giảm có thể kéo cả ngân hàng theo."},
      {t:"Tổng tài sản",ok:false,why:"Quy mô không nói lên khả năng chịu tổn thất."},
      {t:"Số lượng chi nhánh",ok:false,why:"Không liên quan tới rủi ro tín dụng."},
      {t:"Tăng trưởng lợi nhuận năm ngoái",ok:false,why:"Lợi nhuận quá khứ có thể chính là kết quả của việc chấp nhận rủi ro cao."}]}
  ],
  recap:["Rủi ro tín dụng hiện trên báo cáo chậm 18-36 tháng so với lúc nó được tạo ra.",
         "Tốc độ thay đổi NPL quan trọng hơn mức tuyệt đối.",
         "Tỷ lệ bao phủ và mức tập trung danh mục cho biết ngân hàng chịu được chu kỳ xấu tới đâu."],
  terms:[{en:"NPL",vi:"Tỷ lệ nợ xấu",d:"Non-performing loan — nợ khó đòi trên tổng dư nợ"},
         {en:"Coverage ratio",vi:"Tỷ lệ bao phủ",d:"Dự phòng đã trích so với số nợ xấu"},
         {en:"Credit cycle",vi:"Chu kỳ tín dụng",d:"Chu kỳ nới lỏng rồi siết chặt của tín dụng"}]
},

{ id:"l-vnb-4", module:"m-vnbank", order:4, minutes:5, xp:90,
  title:"Reading a Vietnamese bank report", vi:"Đọc báo cáo một ngân hàng Việt",
  hook:{ q:"Lợi nhuận tăng 15%. Nên mừng không?",
         text:"Chưa biết. Trong ngân hàng, con số lợi nhuận là thứ dễ điều chỉnh nhất — và có ít nhất ba chỗ cần kiểm tra trước khi tin nó." },
  core:[
   { h:"Ba dòng cần đọc trước dòng lợi nhuận", hVi:"",
     body:"Chi phí dự phòng rủi ro, tỷ lệ CASA, và cơ cấu thu nhập ngoài lãi. Ba dòng này quyết định lợi nhuận có bền không.",
     note:"Nếu lợi nhuận tăng nhờ giảm trích dự phòng chứ không nhờ thu nhập lõi tăng, đó là lợi nhuận vay mượn từ tương lai." },
   { h:"Hoàn nhập dự phòng", hVi:"",
     body:"Ngân hàng trích lập kỳ trước, hoàn nhập kỳ này và ghi tăng lợi nhuận. Không có đồng tiền mới nào được tạo ra.",
     example:{company:"techcombank", text:"Khi NIM giảm và nợ xấu tăng mà lợi nhuận vẫn tăng, gần như chắc chắn có khoản không lặp lại đang che đi xu hướng cấu trúc."} },
   { h:"Tăng trưởng tín dụng và room", hVi:"",
     body:"Ngân hàng Việt Nam bị giới hạn hạn mức tăng trưởng tín dụng hàng năm. Điều này làm tăng trưởng phụ thuộc một phần vào quyết định hành chính, không chỉ vào năng lực kinh doanh.",
     note:"Khi so sánh hai ngân hàng, phải xem hạn mức được cấp — không phải chỉ xem tốc độ tăng thực tế." }
  ],
  worked:{ title:"Kiểm tra chất lượng lợi nhuận một ngân hàng",
    steps:[
     {k:"Lợi nhuận trước thuế",v:"+15%",note:"nhìn tốt"},
     {k:"NIM",v:"4,2% → 3,6%",note:"⚠ lõi yếu đi"},
     {k:"CASA",v:"40% → 33%",note:"⚠ chi phí vốn tăng"},
     {k:"NPL",v:"0,7% → 1,4%",note:"⚠ chất lượng tài sản xấu"},
     {k:"Chi phí dự phòng",v:"giảm 30%",note:"⚠ nguồn của mức tăng lợi nhuận"},
     {k:"Thu nhập bất thường",v:"có ghi nhận",note:"⚠ không lặp lại"},
     {k:"Kết luận",v:"lợi nhuận tăng, chất lượng giảm"}],
    conclusion:"Năm dấu hiệu cùng chỉ một hướng: lõi kinh doanh yếu đi trong khi con số cuối được giữ bằng các khoản không lặp lại. Đây chính xác là mẫu hình của case cuối module này." },
  check:[
   { kind:"mcq", xp:35, question:"Ngân hàng có NIM giảm, NPL tăng, nhưng lợi nhuận vẫn tăng 15%. Kết luận hợp lý nhất?",
     options:[
      {t:"Chất lượng lợi nhuận đang xấu đi — mức tăng nhiều khả năng đến từ khoản không lặp lại",ok:true,why:"Hai chỉ số lõi đều xấu mà con số cuối vẫn đẹp thì phần chênh lệch phải đến từ đâu đó, và nó chỉ dùng được một lần."},
      {t:"Ngân hàng đang hoạt động hiệu quả",ok:false,why:"Đọc dòng cuối mà bỏ qua cấu phần là sai lầm cơ bản khi phân tích ngân hàng."},
      {t:"Nên tăng trưởng tín dụng mạnh hơn",ok:false,why:"Tăng trưởng nhanh khi chất lượng tài sản đang xấu là khuếch đại vấn đề."},
      {t:"NPL 1,4% vẫn thấp nên không đáng lo",ok:false,why:"Tốc độ tăng gấp đôi trong một năm mới là điều đáng chú ý, không phải mức tuyệt đối."}]},
   { kind:"multi", xp:35, need:3, question:"Ba dòng nào nên đọc TRƯỚC dòng lợi nhuận trong báo cáo ngân hàng?",
     note:"Chọn 3.",
     options:[
      {t:"Chi phí dự phòng rủi ro tín dụng",ok:true,why:"Đây là dòng biến động mạnh nhất và có nhiều dư địa điều chỉnh nhất."},
      {t:"Tỷ lệ CASA",ok:true,why:"Quyết định chi phí vốn, tức quyết định NIM của các kỳ tới."},
      {t:"Cơ cấu thu nhập ngoài lãi",ok:true,why:"Cho biết bao nhiêu phần lợi nhuận đến từ khoản lặp lại và bao nhiêu từ khoản một lần."},
      {t:"Số lượng chi nhánh",ok:false,why:"Không phản ánh chất lượng lợi nhuận."},
      {t:"Tổng tài sản",ok:false,why:"Quy mô không nói lên chất lượng."},
      {t:"Số lượng nhân viên",ok:false,why:"Liên quan tới CIR nhưng không phải chỉ số chất lượng lợi nhuận."}]}
  ],
  recap:["Đọc chi phí dự phòng, CASA và cơ cấu thu ngoài lãi trước khi đọc lợi nhuận.",
         "Lợi nhuận tăng nhờ giảm trích dự phòng là lợi nhuận vay mượn từ tương lai.",
         "Tăng trưởng tín dụng ở Việt Nam phụ thuộc cả vào hạn mức được cấp."],
  terms:[{en:"Provision expense",vi:"Chi phí dự phòng",d:"Khoản trích cho rủi ro tín dụng"},
         {en:"Credit growth quota",vi:"Hạn mức tăng trưởng tín dụng",d:"Giới hạn tăng trưởng cho vay được cấp hàng năm"},
         {en:"Non-interest income",vi:"Thu nhập ngoài lãi",d:"Thu từ phí dịch vụ và kinh doanh khác"}]
}
]);

/* ================= MODULE 14 · VIETNAM PLATFORMS ================= */
window.LESSONS = window.LESSONS.concat([

{ id:"l-vnp-1", module:"m-vnplatform", order:1, minutes:5, xp:70,
  title:"Payments cannot feed itself", vi:"Thanh toán không tự nuôi được mình",
  hook:{ q:"30 triệu người dùng. Vì sao vẫn lỗ?",
         text:"Vì mỗi giao dịch chỉ mang lại vài trăm đồng, trong khi chi phí giữ chân người dùng đó lớn hơn nhiều lần." },
  core:[
   { h:"Take rate của thanh toán rất mỏng", hVi:"",
     body:"Phí thu từ merchant thường dưới 1% giá trị giao dịch, và phần lớn trong đó phải chia lại cho ngân hàng và tổ chức chuyển mạch.",
     note:"Giao dịch 200.000đ với take rate 0,7% mang về 1.400đ. Trừ phí xử lý, phần còn lại gần như không đáng kể." },
   { h:"Chi phí giữ chân rất dày", hVi:"",
     body:"Cashback, voucher, khuyến mãi là chi phí thật và lặp lại. Người dùng đến vì ưu đãi thường rời đi khi ưu đãi dừng.",
     example:{company:"momo", text:"Chi phí cashback là khoản chi lớn nhất, trong khi take rate thanh toán dưới 1% — hai con số này không thể gặp nhau bằng cách tăng quy mô."} },
   { h:"Ngân hàng đã xoá lý do tồn tại ban đầu", hVi:"",
     body:"Khi mọi ứng dụng ngân hàng đều miễn phí chuyển tiền và có mã QR, tiện ích cơ bản của ví điện tử không còn là khác biệt.",
     note:"Ví phải trả lời được câu hỏi: người dùng mở ví thay vì mở app ngân hàng vì lý do gì?" }
  ],
  worked:{ title:"Kinh tế của một ví điện tử",
    steps:[
     {k:"Tổng giá trị giao dịch (TPV)",v:"100.000 tỷ/năm"},
     {k:"Take rate 0,7%",v:"700 tỷ doanh thu"},
     {k:"Chi phí xử lý trả ngân hàng",v:"−250 tỷ"},
     {k:"Cashback & khuyến mãi",v:"−900 tỷ"},
     {k:"Công nghệ & nhân sự",v:"−400 tỷ"},
     {k:"Kết quả mảng thanh toán",v:"lỗ khoảng 850 tỷ"},
     {k:"Kết luận",v:"tăng TPV không sửa được cấu trúc này"}],
    conclusion:"Tăng TPV gấp đôi làm doanh thu lên 1.400 tỷ nhưng chi phí cashback cũng tăng theo. Thanh toán là chi phí để có quan hệ khách hàng — lợi nhuận phải đến từ tầng bên trên." },
  check:[
   { kind:"calc", xp:35, question:"Ví điện tử có tổng giá trị giao dịch 100.000 tỷ/năm và take rate 0,7%. Doanh thu từ phí thanh toán là bao nhiêu tỷ?",
     unit:"tỷ VND", answer:700, tol:40, hint:"TPV nhân take rate.",
     working:[{k:"TPV",v:"100.000 tỷ"},{k:"Take rate",v:"0,7%"},{k:"Doanh thu phí",v:"700 tỷ"}],
     why:"700 tỷ nghe lớn, nhưng đó là doanh thu chứ không phải lợi nhuận — và nó phải gánh cả chi phí cashback lẫn chi phí xử lý giao dịch. Đây là lý do không ví nào sống được chỉ bằng thanh toán." },
   { kind:"mcq", xp:30, question:"Ví điện tử tăng số người dùng gấp đôi. Điều gì xảy ra với khoản lỗ?",
     options:[
      {t:"Có thể lớn hơn, vì chi phí khuyến mãi tăng theo quy mô trong khi take rate không đổi",ok:true,why:"Khi chi phí lớn nhất là biến phí theo quy mô, tăng trưởng nhân khoản lỗ lên chứ không xoá nó."},
      {t:"Giảm một nửa nhờ lợi thế quy mô",ok:false,why:"Lợi thế quy mô chỉ hoạt động khi chi phí lớn nhất là cố định — ở đây không phải."},
      {t:"Không đổi",ok:false,why:"Cả doanh thu lẫn chi phí đều tăng, nên kết quả chắc chắn thay đổi."},
      {t:"Chuyển thành lãi",ok:false,why:"Chỉ xảy ra nếu take rate hoặc cơ cấu chi phí thay đổi, không phải do quy mô."}]}
  ],
  recap:["Take rate thanh toán dưới 1% và còn phải chia lại cho ngân hàng.",
         "Cashback là chi phí biến đổi theo quy mô — tăng trưởng không xoá được lỗ.",
         "Thanh toán là chi phí để có quan hệ khách hàng, không phải mô hình kinh doanh."],
  terms:[{en:"TPV",vi:"Tổng giá trị giao dịch",d:"Total payment volume chạy qua nền tảng"},
         {en:"Take rate",vi:"Tỷ lệ phí",d:"Phần trăm nền tảng giữ lại trên mỗi giao dịch"},
         {en:"Cashback",vi:"Hoàn tiền",d:"Khuyến mãi trả lại tiền cho người dùng"}]
},

{ id:"l-vnp-2", module:"m-vnplatform", order:2, minutes:6, xp:80,
  title:"The subsidy war", vi:"Cuộc chiến trợ giá",
  hook:{ q:"Hai nền tảng cùng đốt tiền để giành thị phần. Ai thắng?",
         text:"Thường là bên có vốn rẻ hơn, không phải bên có sản phẩm tốt hơn. Nhưng thắng bằng trợ giá và giữ được sau khi dừng trợ giá là hai chuyện khác nhau." },
  core:[
   { h:"Trợ giá mua gì", hVi:"",
     body:"Nó mua thử nghiệm, không mua thói quen. Người dùng đến vì ưu đãi sẽ ở lại chỉ khi sản phẩm thật sự tốt hơn lựa chọn cũ.",
     note:"Câu hỏi kiểm tra: nếu dừng toàn bộ ưu đãi trong ba tháng, bao nhiêu phần trăm người dùng ở lại?" },
   { h:"Thị trường hai chiều đắt gấp đôi", hVi:"",
     body:"Nền tảng gọi xe hay giao đồ ăn phải trợ giá cả hai phía: tài xế và người dùng. Cắt một bên làm bên kia rời đi theo.",
     example:{company:"grab", text:"Ưu đãi chiếm tới 18% GMV ở giai đoạn cạnh tranh gay gắt. Cắt xuống 12% chỉ khả thi khi cắt có chọn lọc theo khu vực và khung giờ."} },
   { h:"Dấu hiệu trợ giá đang tạo giá trị thật", hVi:"",
     body:"Tỷ lệ ưu đãi trên mỗi giao dịch giảm dần theo thời gian trong khi số giao dịch vẫn tăng. Nếu ngược lại, nền tảng đang mua doanh số chứ không xây thị trường.",
     note:"Đây là chỉ số quan trọng nhất khi đánh giá một nền tảng đang đốt tiền." }
  ],
  worked:{ title:"Chi phí giành một người dùng",
    steps:[
     {k:"Số người dùng mục tiêu",v:"30 triệu"},
     {k:"Chi phí ưu đãi trung bình",v:"150.000đ/người"},
     {k:"Tổng chi phí giành người dùng",v:"4.500 tỷ"},
     {k:"Doanh thu mỗi người dùng/năm",v:"~25.000đ",note:"take rate thanh toán"},
     {k:"Thời gian hoàn vốn nếu chỉ có thanh toán",v:"6 năm"},
     {k:"Nếu 10% dùng sản phẩm tài chính",v:"doanh thu/người tăng nhiều lần"},
     {k:"Hoàn vốn",v:"rút xuống dưới 2 năm"}],
    conclusion:"Cùng một khoản chi 4.500 tỷ, thời gian hoàn vốn khác nhau ba lần tuỳ vào việc nền tảng có bán được sản phẩm biên cao cho người dùng đã có hay không. Trợ giá chỉ hợp lý khi có tầng kiếm tiền phía sau." },
  check:[
   { kind:"calc", xp:35, question:"Nền tảng chi 150.000đ ưu đãi cho mỗi người dùng mới và muốn có 30 triệu người dùng. Tổng chi phí là bao nhiêu tỷ?",
     unit:"tỷ VND", answer:4500, tol:200, hint:"Số người dùng nhân chi phí mỗi người.",
     working:[{k:"Số người dùng",v:"30 triệu"},{k:"Chi phí mỗi người",v:"150.000đ"},{k:"Tổng",v:"4.500 tỷ"}],
     why:"4.500 tỷ là khoản đầu tư chỉ hợp lý nếu mỗi người dùng mang lại nhiều hơn 150.000đ giá trị vòng đời. Với take rate thanh toán, điều đó cần nhiều năm — nên nền tảng buộc phải tìm nguồn thu biên cao hơn." },
   { kind:"mcq", xp:30, question:"Chỉ số nào cho biết trợ giá đang xây thị trường chứ không chỉ mua doanh số?",
     options:[
      {t:"Tỷ lệ ưu đãi trên mỗi giao dịch giảm dần trong khi số giao dịch vẫn tăng",ok:true,why:"Nghĩa là người dùng ngày càng ít cần ưu đãi để giao dịch — thói quen đã hình thành."},
      {t:"Tổng số người dùng tăng nhanh",ok:false,why:"Người dùng đăng ký để nhận ưu đãi rồi biến mất vẫn được tính vào con số này."},
      {t:"GMV tăng nhanh",ok:false,why:"GMV mua được bằng tiền; nó không phân biệt được giao dịch tự nhiên và giao dịch do khuyến mãi."},
      {t:"Số lượt tải ứng dụng",ok:false,why:"Chỉ số bề mặt nhất, gần như không nói lên điều gì."}]}
  ],
  recap:["Trợ giá mua thử nghiệm, không mua thói quen.",
         "Thị trường hai chiều phải trợ giá cả hai phía — đắt gấp đôi.",
         "Chỉ số quan trọng nhất: ưu đãi mỗi giao dịch giảm dần trong khi giao dịch vẫn tăng."],
  terms:[{en:"Subsidy",vi:"Trợ giá",d:"Chi phí ưu đãi để thu hút người dùng hoặc nhà cung cấp"},
         {en:"Two-sided market",vi:"Thị trường hai chiều",d:"Nền tảng phải giữ cả bên cung và bên cầu"},
         {en:"Organic transaction",vi:"Giao dịch tự nhiên",d:"Giao dịch không cần ưu đãi thúc đẩy"}]
},

{ id:"l-vnp-3", module:"m-vnplatform", order:3, minutes:5, xp:80,
  title:"Layers of monetisation", vi:"Các tầng kiếm tiền",
  hook:{ q:"Có 30 triệu người dùng. Bán gì cho họ?",
         text:"Không bán thanh toán — cái đó đã miễn phí. Bán những thứ nằm ở tầng trên: tín dụng, bảo hiểm, đầu tư, quảng cáo." },
  core:[
   { h:"Bốn tầng, bốn mức biên", hVi:"",
     body:"Tầng một là thanh toán, biên gần như không. Tầng hai là dịch vụ tiện ích. Tầng ba là quảng cáo và mini-app. Tầng bốn là sản phẩm tài chính — biên cao nhất.",
     note:"Mỗi tầng đòi hỏi một năng lực khác nhau, và tầng càng cao thì rủi ro càng lớn." },
   { h:"Vì sao tín dụng là đích đến", hVi:"",
     body:"Dữ liệu giao dịch cho phép chấm điểm tín dụng nhóm khách chưa có hồ sơ ngân hàng. Đây là lợi thế mà ngân hàng truyền thống không có.",
     example:{company:"momo", text:"Chỉ 8-10% người dùng hoạt động sử dụng sản phẩm cho vay đã tạo ra doanh thu lớn hơn toàn bộ mảng thanh toán trên 30 triệu người dùng."} },
   { h:"Nhưng năng lực hoàn toàn khác", hVi:"",
     body:"Thanh toán là bài toán công nghệ và trải nghiệm. Cho vay là bài toán rủi ro và thu hồi nợ. Nhiều nền tảng sụp đổ chính ở bước chuyển này.",
     note:"Lộ trình an toàn: phân phối sản phẩm của đối tác hưởng hoa hồng trước, xây năng lực rủi ro, rồi mới tự cho vay bằng vốn của mình." }
  ],
  worked:{ title:"Doanh thu theo tầng",
    steps:[
     {k:"Người dùng hoạt động",v:"12 triệu"},
     {k:"Tầng 1 — thanh toán",v:"take rate <1%, biên gần 0"},
     {k:"Tầng 3 — quảng cáo & mini-app",v:"biên rất cao, quy mô còn nhỏ"},
     {k:"Tầng 4 — cho vay",v:"10% người dùng vay"},
     {k:"Số người vay",v:"1,2 triệu"},
     {k:"Dư nợ trung bình",v:"5 triệu/người"},
     {k:"Biên ròng sau rủi ro 10%",v:"600 tỷ/năm"}],
    conclusion:"600 tỷ từ chỉ 10% người dùng — nhiều hơn toàn bộ mảng thanh toán phục vụ 100% người dùng. Đó là lý do mọi ví điện tử trên thế giới đều đi cùng một con đường: dùng thanh toán để lấy khách, dùng tài chính để kiếm tiền." },
  check:[
   { kind:"calc", xp:35, question:"12 triệu người dùng hoạt động, 10% dùng sản phẩm vay với dư nợ trung bình 5 triệu đồng, biên ròng sau rủi ro 10%/năm. Doanh thu là bao nhiêu tỷ?",
     unit:"tỷ VND", answer:600, tol:40, hint:"Số người vay × dư nợ × biên ròng.",
     working:[{k:"Người vay",v:"12 triệu × 10% = 1,2 triệu"},{k:"Tổng dư nợ",v:"1,2 triệu × 5 triệu = 6.000 tỷ"},{k:"Biên ròng",v:"10%"},{k:"Doanh thu",v:"600 tỷ"}],
     why:"So sánh với 700 tỷ doanh thu phí thanh toán ở bài trước — nhưng khoản 600 tỷ này có biên cao hơn rất nhiều vì không phải gánh chi phí cashback." },
   { kind:"multi", xp:35, need:2, question:"Hai rủi ro lớn nhất khi ví điện tử chuyển sang cho vay?",
     note:"Chọn 2.",
     options:[
      {t:"Năng lực quản trị rủi ro tín dụng hoàn toàn khác với năng lực vận hành thanh toán",ok:true,why:"Thanh toán là công nghệ và trải nghiệm; cho vay là rủi ro và thu hồi. Sai lầm ở mảng cho vay mất 12-18 tháng mới hiện ra."},
      {t:"Nhóm khách chưa có hồ sơ ngân hàng có tỷ lệ nợ xấu cao",ok:true,why:"Chính nhóm khách tạo ra cơ hội cũng là nhóm khó chấm điểm và dễ mất khả năng trả nhất."},
      {t:"Người dùng không có nhu cầu vay",ok:false,why:"Nhu cầu vay tiêu dùng tại Việt Nam rất lớn và chưa được phục vụ đầy đủ."},
      {t:"Chi phí công nghệ tăng",ok:false,why:"Không đáng kể so với rủi ro tín dụng."},
      {t:"Ngân hàng sẽ ngừng hợp tác",ok:false,why:"Ngân hàng thường muốn hợp tác vì ví mang lại kênh phân phối."}]}
  ],
  recap:["Bốn tầng kiếm tiền: thanh toán, tiện ích, quảng cáo, tài chính — biên tăng dần.",
         "Dữ liệu giao dịch là lợi thế thật để chấm điểm tín dụng nhóm chưa có hồ sơ ngân hàng.",
         "Đi từ phân phối hưởng hoa hồng trước, tự cho vay sau."],
  terms:[{en:"Monetisation layer",vi:"Tầng kiếm tiền",d:"Một nhóm sản phẩm có mức biên riêng"},
         {en:"Credit scoring",vi:"Chấm điểm tín dụng",d:"Đánh giá khả năng trả nợ của khách hàng"},
         {en:"Embedded finance",vi:"Tài chính nhúng",d:"Sản phẩm tài chính bán ngay trong ứng dụng phi tài chính"}]
},

{ id:"l-vnp-4", module:"m-vnplatform", order:4, minutes:5, xp:90,
  title:"Regulation as a business variable", vi:"Quy định là một biến số kinh doanh",
  hook:{ q:"Sản phẩm tốt, tăng trưởng nhanh, và một văn bản làm mọi thứ dừng lại.",
         text:"Ở các ngành được cấp phép, quy định không phải rủi ro bên ngoài — nó là một biến số phải nằm trong mô hình kinh doanh ngay từ đầu." },
  core:[
   { h:"Giấy phép là rào cản hai chiều", hVi:"",
     body:"Khó xin giấy phép nghĩa là đối thủ mới cũng khó vào. Doanh nghiệp đã có giấy phép sở hữu một moat thật — nhưng cũng phụ thuộc vào việc giữ được nó.",
     note:"Ví điện tử, cho vay tiêu dùng, bảo hiểm, chứng khoán ở Việt Nam đều là ngành có điều kiện." },
   { h:"Ba loại thay đổi quy định", hVi:"",
     body:"Loại một siết điều kiện hoạt động. Loại hai giới hạn giá hoặc phí. Loại ba mở cửa cho đối thủ mới. Mỗi loại tác động khác nhau lên mô hình.",
     example:{company:"vnpay", text:"Chuẩn QR chung do cơ quan quản lý thúc đẩy làm giảm lợi thế của mạng lưới riêng — một thay đổi loại ba, mở cửa cho nhiều bên cùng chấp nhận thanh toán."} },
   { h:"Đưa quy định vào kịch bản, không vào phần rủi ro", hVi:"",
     body:"Thay vì ghi 'rủi ro chính sách' ở cuối tài liệu, hãy dựng hai kịch bản: nếu quy định siết theo hướng X thì mô hình còn lại gì.",
     note:"Câu hỏi đúng: mô hình này còn hoạt động được không nếu điều kiện thuận lợi nhất hiện nay biến mất?" }
  ],
  worked:{ title:"Dựng kịch bản quy định cho một ví điện tử",
    steps:[
     {k:"Kịch bản cơ sở",v:"giữ nguyên điều kiện hiện tại"},
     {k:"Kịch bản 1 — siết hạn mức giao dịch",v:"TPV giảm, doanh thu phí giảm theo"},
     {k:"Kịch bản 2 — siết cho vay qua nền tảng",v:"mất tầng kiếm tiền biên cao nhất"},
     {k:"Kịch bản 3 — chuẩn QR chung",v:"mất lợi thế mạng lưới chấp nhận riêng"},
     {k:"Kịch bản nguy hiểm nhất",v:"kịch bản 2"},
     {k:"Hành động phòng ngừa",v:"đa dạng hoá sang phân phối bảo hiểm và đầu tư"}],
    conclusion:"Kịch bản 2 đe doạ chính nguồn lợi nhuận tương lai. Nhận ra điều đó sớm cho phép doanh nghiệp xây thêm một tầng kiếm tiền thứ hai trước khi cần tới — thay vì phản ứng khi văn bản đã ban hành." },
  check:[
   { kind:"mcq", xp:35, question:"Cách xử lý rủi ro quy định nào tốt nhất trong một phân tích chiến lược?",
     options:[
      {t:"Dựng kịch bản cụ thể cho từng thay đổi khả dĩ và tính tác động lên mô hình",ok:true,why:"Biến một rủi ro mơ hồ thành các con số so sánh được, và chỉ ra hành động phòng ngừa cụ thể."},
      {t:"Ghi 'rủi ro chính sách' ở phần rủi ro cuối tài liệu",ok:false,why:"Không ai hành động dựa trên một dòng cảnh báo chung chung."},
      {t:"Giả định quy định không đổi trong 5 năm",ok:false,why:"Ở ngành có điều kiện, đây là giả định gần như chắc chắn sai."},
      {t:"Chờ tới khi văn bản ban hành rồi mới phản ứng",ok:false,why:"Khi đó không còn thời gian xây năng lực thay thế."}]},
   { kind:"multi", xp:30, need:2, question:"Hai điều nào đúng về giấy phép trong ngành có điều kiện?",
     note:"Chọn 2.",
     options:[
      {t:"Nó là rào cản gia nhập, tạo lợi thế cho bên đã có",ok:true,why:"Đối thủ mới phải vượt cùng rào cản đó — moat thật."},
      {t:"Nó cũng là điểm phụ thuộc, vì mất giấy phép là mất kinh doanh",ok:true,why:"Lợi thế và rủi ro nằm ở cùng một chỗ."},
      {t:"Nó đảm bảo doanh nghiệp có lợi nhuận",ok:false,why:"Giấy phép cho quyền hoạt động, không đảm bảo mô hình kinh doanh có lãi."},
      {t:"Nó không ảnh hưởng tới định giá doanh nghiệp",ok:false,why:"Ảnh hưởng rất lớn tới cả cơ hội lẫn rủi ro."},
      {t:"Nó chỉ quan trọng với doanh nghiệp nhỏ",ok:false,why:"Doanh nghiệp lớn thường chịu giám sát chặt hơn."}]}
  ],
  recap:["Ở ngành có điều kiện, quy định là biến số trong mô hình, không phải rủi ro bên ngoài.",
         "Giấy phép vừa là moat vừa là điểm phụ thuộc.",
         "Dựng kịch bản cụ thể thay vì ghi một dòng 'rủi ro chính sách'."],
  terms:[{en:"Licensed industry",vi:"Ngành có điều kiện",d:"Ngành cần giấy phép để hoạt động"},
         {en:"Regulatory risk",vi:"Rủi ro chính sách",d:"Khả năng thay đổi quy định ảnh hưởng mô hình"},
         {en:"Scenario planning",vi:"Lập kịch bản",d:"Dựng nhiều tương lai khả dĩ và tính tác động"}]
}
]);

/* ================= MODULE 15 · VIETNAM PROPERTY ================= */
window.LESSONS = window.LESSONS.concat([

{ id:"l-vnpr-1", module:"m-vnproperty", order:1, minutes:5, xp:70,
  title:"How a developer makes money", vi:"Chủ đầu tư kiếm tiền thế nào",
  hook:{ q:"Chủ đầu tư bán căn hộ 3 tỷ. Họ lãi bao nhiêu?",
         text:"Phần lớn lợi nhuận không đến từ việc xây nhà — nó đến từ chênh lệch giá trị mảnh đất trước và sau khi được phát triển." },
  core:[
   { h:"Ba nguồn lợi nhuận", hVi:"",
     body:"Chênh lệch giá đất trước và sau phát triển. Biên xây dựng. Và giá trị tăng thêm từ tiện ích, hạ tầng, thương hiệu.",
     note:"Mua đất giá thấp là quyết định quan trọng nhất — nó xảy ra nhiều năm trước khi căn hộ đầu tiên được bán." },
   { h:"Dòng tiền trả trước của khách", hVi:"",
     body:"Khách hàng trả theo tiến độ xây dựng, nên chủ đầu tư dùng chính tiền của người mua để xây. Đây là nguồn vốn rẻ nhất trong ngành.",
     example:{company:"vinhomes", text:"Presales — số căn đã bán nhưng chưa bàn giao — là chỉ báo doanh thu và dòng tiền của các kỳ tới, quan trọng hơn doanh thu kỳ hiện tại."} },
   { h:"Ghi nhận doanh thu rất trễ", hVi:"",
     body:"Doanh thu chỉ được ghi khi bàn giao, tức nhiều năm sau khi bán. Lợi nhuận trên báo cáo hôm nay phản ánh những căn bán từ hai ba năm trước.",
     note:"Hệ quả: báo cáo kết quả kinh doanh của chủ đầu tư gần như vô dụng để đánh giá tình hình hiện tại. Phải nhìn presales và dòng tiền." }
  ],
  worked:{ title:"Lợi nhuận một dự án",
    steps:[
     {k:"Số căn bán",v:"1.000 căn"},
     {k:"Giá bán trung bình",v:"3 tỷ/căn"},
     {k:"Tổng doanh thu",v:"3.000 tỷ"},
     {k:"Chi phí đất",v:"−600 tỷ",note:"mua từ nhiều năm trước"},
     {k:"Chi phí xây dựng",v:"−1.200 tỷ"},
     {k:"Bán hàng, môi giới, lãi vay vốn hoá",v:"−150 tỷ"},
     {k:"Biên gộp",v:"1.050 tỷ = 35%"}],
    conclusion:"Biên gộp 35% là mức tốt của ngành. Nhưng con số này phụ thuộc gần như hoàn toàn vào giá đất đã mua — nếu chi phí đất là 1.200 tỷ thay vì 600 tỷ, biên gộp rơi xuống 15% và dự án gần như không còn hấp dẫn." },
  check:[
   { kind:"calc", xp:35, question:"Dự án bán 1.000 căn giá 3 tỷ/căn. Chi phí đất 600 tỷ, xây dựng 1.200 tỷ, bán hàng 150 tỷ. Biên gộp là bao nhiêu tỷ?",
     unit:"tỷ VND", answer:1050, tol:50, hint:"Doanh thu trừ tổng chi phí dự án.",
     working:[{k:"Doanh thu",v:"1.000 × 3 = 3.000 tỷ"},{k:"Tổng chi phí",v:"600 + 1.200 + 150 = 1.950 tỷ"},{k:"Biên gộp",v:"1.050 tỷ = 35%"}],
     why:"Chi phí đất chiếm gần một phần ba tổng chi phí và là khoản duy nhất không thể thương lượng lại sau khi đã mua. Đó là lý do quỹ đất giá rẻ tích luỹ từ trước là moat thật của ngành này." },
   { kind:"mcq", xp:30, question:"Chỉ số nào phản ánh đúng nhất tình hình hiện tại của một chủ đầu tư?",
     options:[
      {t:"Presales — số căn đã bán nhưng chưa bàn giao",ok:true,why:"Doanh thu ghi nhận phản ánh chuyện của hai ba năm trước. Presales cho biết thị trường đang hấp thụ sản phẩm ở mức nào ngay lúc này."},
      {t:"Doanh thu ghi nhận trong kỳ",ok:false,why:"Phản ánh những căn bán từ nhiều năm trước, không nói gì về hiện tại."},
      {t:"Lợi nhuận sau thuế",ok:false,why:"Cũng bị trễ theo doanh thu, và còn chịu ảnh hưởng của các khoản một lần."},
      {t:"Tổng tài sản",ok:false,why:"Phần lớn là hàng tồn kho dở dang, không nói lên tốc độ bán hàng."}]}
  ],
  recap:["Phần lớn lợi nhuận đến từ chênh lệch giá trị đất, không từ biên xây dựng.",
         "Tiền trả trước của khách là nguồn vốn rẻ nhất trong ngành.",
         "Doanh thu ghi nhận rất trễ — nhìn presales và dòng tiền, không nhìn báo cáo lãi lỗ."],
  terms:[{en:"Land bank",vi:"Quỹ đất",d:"Đất đã sở hữu chờ phát triển"},
         {en:"Presales",vi:"Bán trước",d:"Căn đã bán nhưng chưa bàn giao"},
         {en:"Revenue recognition",vi:"Ghi nhận doanh thu",d:"Thời điểm doanh thu được đưa vào báo cáo"}]
},

{ id:"l-vnpr-2", module:"m-vnproperty", order:2, minutes:5, xp:80,
  title:"Legal status is the real gate", vi:"Pháp lý dự án là cánh cổng thật",
  hook:{ q:"Chủ đầu tư có quỹ đất 500 hecta. Đó là tài sản hay là tiền chết?",
         text:"Tuỳ vào tình trạng pháp lý. Đất chưa đủ điều kiện mở bán về mặt kinh tế gần như không phải tài sản trong 12 tháng tới." },
  core:[
   { h:"Các bước pháp lý", hVi:"",
     body:"Chấp thuận chủ trương, giao đất, quy hoạch chi tiết, giấy phép xây dựng, và đủ điều kiện mở bán. Mỗi bước có thể mất từ vài tháng tới vài năm.",
     note:"Dự án chỉ tạo ra dòng tiền sau bước cuối. Trước đó nó chỉ hút vốn." },
   { h:"Vì sao đây là biến số quyết định", hVi:"",
     body:"Hai chủ đầu tư có cùng quỹ đất nhưng khác tình trạng pháp lý sẽ có hai bức tranh dòng tiền hoàn toàn khác nhau trong 24 tháng tới.",
     example:{company:"novaland", text:"Khi tiến độ pháp lý chậm lại, hàng tồn kho dở dang phình lên trong khi doanh thu không ghi nhận được — dòng tiền âm kéo dài dù dự án vẫn có giá trị trên sổ sách."} },
   { h:"Câu hỏi phải đặt", hVi:"",
     body:"Bao nhiêu phần trăm quỹ đất đã đủ điều kiện mở bán? Đó là con số duy nhất cho biết doanh nghiệp có thể tạo dòng tiền trong ngắn hạn hay không.",
     note:"Quỹ đất lớn mà pháp lý chưa xong là một lời hứa dài hạn, không phải một nguồn tiền." }
  ],
  worked:{ title:"Phân loại quỹ đất theo khả năng tạo dòng tiền",
    steps:[
     {k:"Tổng quỹ đất",v:"500 hecta"},
     {k:"Đủ điều kiện mở bán",v:"80 hecta",note:"tạo tiền trong 12 tháng"},
     {k:"Có giấy phép xây dựng",v:"120 hecta",note:"12-24 tháng"},
     {k:"Mới có chủ trương",v:"200 hecta",note:"trên 24 tháng"},
     {k:"Chưa có gì",v:"100 hecta",note:"không xác định"},
     {k:"Tài sản có ý nghĩa trong 12 tháng",v:"chỉ 16% quỹ đất"}],
    conclusion:"Nếu doanh nghiệp có nợ đáo hạn trong 12 tháng, chỉ 16% quỹ đất là thứ thật sự dùng được để trả nợ. Con số 500 hecta trên báo cáo hoàn toàn không phản ánh khả năng thanh toán." },
  check:[
   { kind:"mcq", xp:35, question:"Chủ đầu tư có quỹ đất lớn nhưng dòng tiền âm ba năm liền. Câu hỏi quan trọng nhất là gì?",
     options:[
      {t:"Bao nhiêu phần trăm quỹ đất đã đủ điều kiện mở bán trong 12 tháng tới",ok:true,why:"Đây là con số duy nhất cho biết doanh nghiệp có thể chuyển tài sản thành tiền kịp thời hạn nợ hay không."},
      {t:"Quỹ đất được định giá bao nhiêu trên sổ sách",ok:false,why:"Giá trị sổ sách không giúp gì nếu không bán được trong thời hạn cần tiền."},
      {t:"Tổng diện tích quỹ đất",ok:false,why:"Diện tích không nói lên khả năng tạo dòng tiền."},
      {t:"Biên lợi nhuận dự kiến của các dự án",ok:false,why:"Biên tốt trên một dự án không mở bán được vẫn là con số trên giấy."}]},
   { kind:"multi", xp:30, need:2, question:"Hai hệ quả nào xảy ra khi pháp lý dự án chậm?",
     note:"Chọn 2.",
     options:[
      {t:"Hàng tồn kho dở dang phình lên",ok:true,why:"Tiền đã chi cho xây dựng nhưng chưa chuyển thành doanh thu được."},
      {t:"Lãi vay tiếp tục phát sinh trong khi không có dòng tiền vào",ok:true,why:"Chi phí tài chính chạy đều bất kể dự án có bán được hay không."},
      {t:"Biên lợi nhuận dự án tăng lên",ok:false,why:"Ngược lại — chi phí lãi vốn hoá làm giá vốn dự án tăng."},
      {t:"Doanh thu ghi nhận tăng",ok:false,why:"Không bàn giao được thì không ghi nhận doanh thu."},
      {t:"Giá bán căn hộ tự động tăng",ok:false,why:"Không có mối liên hệ nào."}]}
  ],
  recap:["Đất chưa đủ điều kiện mở bán gần như không phải tài sản trong ngắn hạn.",
         "Phân loại quỹ đất theo thời gian có thể tạo dòng tiền, không theo diện tích.",
         "Pháp lý chậm làm tồn kho phình lên trong khi lãi vay vẫn chạy."],
  terms:[{en:"Legal status",vi:"Tình trạng pháp lý",d:"Mức độ hoàn thành thủ tục của dự án"},
         {en:"Eligible for sale",vi:"Đủ điều kiện mở bán",d:"Được phép bán hàng hình thành trong tương lai"},
         {en:"Work in progress",vi:"Chi phí dở dang",d:"Tiền đã chi cho dự án chưa hoàn thành"}]
},

{ id:"l-vnpr-3", module:"m-vnproperty", order:3, minutes:6, xp:80,
  title:"Debt and the bond market", vi:"Đòn bẩy và trái phiếu doanh nghiệp",
  hook:{ q:"Vay 12.000 tỷ với lãi 11%. Mỗi năm mất bao nhiêu chỉ để đứng yên?",
         text:"1.320 tỷ. Đó là số tiền doanh nghiệp phải kiếm được trước khi bắt đầu có lợi nhuận cho cổ đông." },
  core:[
   { h:"Vì sao ngành này dùng đòn bẩy cao", hVi:"",
     body:"Chu kỳ từ mua đất tới thu tiền kéo dài nhiều năm, trong khi chi phí phát sinh ngay từ đầu. Vốn chủ sở hữu hiếm khi đủ để lấp khoảng trống đó.",
     note:"Đòn bẩy khuếch đại cả lợi nhuận lẫn tổn thất. Khi thị trường lên, chủ đầu tư dùng nợ nhiều lãi rất đậm. Khi xuống, họ là bên gãy trước." },
   { h:"Rủi ro đáo hạn", hVi:"Refinancing risk",
     body:"Nguy hiểm không nằm ở tổng nợ mà ở lịch đáo hạn. Nợ 12.000 tỷ đáo hạn rải đều 5 năm khác hoàn toàn với 12.000 tỷ đáo hạn trong 12 tháng.",
     example:{company:"novaland", text:"Khi thị trường trái phiếu siết lại, việc đảo nợ trở nên bất khả thi và doanh nghiệp buộc phải bán tài sản trong tình thế cấp bách — tức bán ở giá thấp nhất."} },
   { h:"Lãi vay vốn hoá", hVi:"Capitalised interest",
     body:"Lãi vay trong giai đoạn xây dựng được cộng vào giá vốn dự án thay vì ghi ngay vào chi phí. Điều này làm lợi nhuận trông đẹp hơn thực tế.",
     note:"Khi đọc báo cáo, tìm dòng lãi vay vốn hoá trong thuyết minh — nó cho biết chi phí tài chính thật lớn tới đâu." }
  ],
  worked:{ title:"Gánh nặng lãi vay",
    steps:[
     {k:"Tổng nợ vay",v:"12.000 tỷ"},
     {k:"Lãi suất bình quân",v:"11%/năm"},
     {k:"Chi phí lãi",v:"1.320 tỷ/năm"},
     {k:"Doanh thu cần để bù",v:"~3.800 tỷ",note:"ở biên gộp 35%"},
     {k:"Nợ đáo hạn 12 tháng",v:"12.000 tỷ",note:"toàn bộ"},
     {k:"Tiền mặt hiện có",v:"400 tỷ"},
     {k:"Khoảng trống",v:"11.600 tỷ phải xử lý"}],
    conclusion:"Chi phí lãi 1.320 tỷ mỗi năm đã nặng, nhưng vấn đề cấp bách hơn nhiều là toàn bộ 12.000 tỷ đáo hạn trong 12 tháng với chỉ 400 tỷ tiền mặt. Đây là bài toán thanh khoản, không phải bài toán lợi nhuận." },
  check:[
   { kind:"calc", xp:35, question:"Doanh nghiệp có nợ vay 12.000 tỷ với lãi suất bình quân 11%/năm. Chi phí lãi mỗi năm là bao nhiêu tỷ?",
     unit:"tỷ VND", answer:1320, tol:60, hint:"Nợ vay nhân lãi suất.",
     working:[{k:"Nợ vay",v:"12.000 tỷ"},{k:"Lãi suất",v:"11%"},{k:"Chi phí lãi",v:"1.320 tỷ/năm"}],
     why:"Với biên gộp 35%, doanh nghiệp cần bán được gần 3.800 tỷ doanh thu chỉ để trả lãi — trước khi có đồng lợi nhuận nào cho cổ đông." },
   { kind:"mcq", xp:35, question:"Hai doanh nghiệp cùng nợ 12.000 tỷ. A đáo hạn rải đều 5 năm, B đáo hạn toàn bộ trong 12 tháng. Nhận định nào đúng?",
     options:[
      {t:"B rủi ro hơn nhiều — lịch đáo hạn quan trọng hơn tổng nợ",ok:true,why:"Cùng một khoản nợ, nhưng B phải xử lý toàn bộ trong một năm. Nếu thị trường vốn siết lại đúng lúc đó, B mất khả năng thanh toán dù tài sản vẫn còn."},
      {t:"Hai bên rủi ro như nhau vì cùng tổng nợ",ok:false,why:"Bỏ qua biến số quan trọng nhất của rủi ro nợ là thời điểm phải trả."},
      {t:"A rủi ro hơn vì phải trả lãi lâu hơn",ok:false,why:"Trả lãi lâu hơn nhưng có thời gian để tài sản chuyển thành tiền."},
      {t:"Không đánh giá được nếu chưa biết lãi suất",ok:false,why:"Lãi suất ảnh hưởng chi phí, nhưng rủi ro mất khả năng thanh toán đến từ lịch đáo hạn."}]}
  ],
  recap:["Rủi ro nợ nằm ở lịch đáo hạn, không nằm ở tổng nợ.",
         "Lãi vay vốn hoá làm lợi nhuận trông đẹp hơn chi phí tài chính thật.",
         "Đòn bẩy khuếch đại cả hai chiều — chủ đầu tư dùng nợ nhiều là bên gãy trước khi chu kỳ xuống."],
  terms:[{en:"Leverage",vi:"Đòn bẩy",d:"Mức sử dụng nợ vay so với vốn chủ"},
         {en:"Refinancing risk",vi:"Rủi ro đảo nợ",d:"Không vay được khoản mới để trả khoản cũ"},
         {en:"Capitalised interest",vi:"Lãi vay vốn hoá",d:"Lãi cộng vào giá vốn dự án thay vì ghi chi phí"}]
},

{ id:"l-vnpr-4", module:"m-vnproperty", order:4, minutes:6, xp:90,
  title:"Reading a developer's cash flow", vi:"Đọc dòng tiền một chủ đầu tư",
  hook:{ q:"Lãi 3.000 tỷ, tiền mặt còn 400 tỷ. Doanh nghiệp này khoẻ hay yếu?",
         text:"Yếu — và báo cáo kết quả kinh doanh sẽ không nói cho bạn biết điều đó. Chỉ có báo cáo lưu chuyển tiền tệ mới nói thật." },
  core:[
   { h:"Vì sao lợi nhuận và tiền lệch pha", hVi:"",
     body:"Lợi nhuận ghi nhận khi bàn giao căn hộ, tức nhiều năm sau khi tiền chi cho đất và xây dựng. Trong suốt thời gian đó, dòng tiền âm là bình thường.",
     note:"Bình thường trong một chu kỳ dự án. Bất thường khi nó kéo dài ba năm liền và nợ sắp đáo hạn." },
   { h:"Ba dòng cần đọc", hVi:"",
     body:"Dòng tiền hoạt động cho biết kinh doanh cốt lõi tạo hay đốt tiền. Dòng tiền đầu tư cho biết đang mua thêm quỹ đất hay bán bớt. Dòng tiền tài chính cho biết đang vay thêm hay trả nợ.",
     example:{company:"vinhomes", text:"Dòng tiền hoạt động âm cộng với dòng tiền tài chính dương nghĩa là doanh nghiệp đang sống bằng vốn vay — bền vững chừng nào thị trường vốn còn mở."} },
   { h:"Mẫu hình nguy hiểm", hVi:"",
     body:"Dòng tiền hoạt động âm nhiều kỳ, dòng tiền tài chính dương nhờ vay mới, và hàng tồn kho phình lên. Ba dấu hiệu này cùng lúc là mẫu hình của một cuộc khủng hoảng thanh khoản đang hình thành.",
     note:"Khi thị trường vốn đóng lại, mẫu hình này chuyển từ 'đang mở rộng' sang 'mất khả năng thanh toán' chỉ trong vài tháng." }
  ],
  worked:{ title:"Từ lợi nhuận 3.000 tỷ tới dòng tiền thật",
    steps:[
     {k:"Lợi nhuận sau thuế",v:"+3.000 tỷ"},
     {k:"Khấu hao",v:"+100 tỷ"},
     {k:"Hàng tồn kho tăng",v:"−5.000 tỷ",note:"dự án dở dang"},
     {k:"Phải thu tăng",v:"−500 tỷ"},
     {k:"Dòng tiền hoạt động",v:"−2.400 tỷ"},
     {k:"Dòng tiền tài chính",v:"+2.200 tỷ",note:"vay mới"},
     {k:"Tiền mặt cuối kỳ",v:"400 tỷ",note:"nợ đáo hạn 12.000 tỷ"}],
    conclusion:"Doanh nghiệp báo lãi 3.000 tỷ nhưng đốt 2.400 tỷ tiền thật và chỉ sống được nhờ vay mới. Khi cửa vay đóng lại, khoảng cách giữa 400 tỷ tiền mặt và 12.000 tỷ nợ đáo hạn trở thành vấn đề sống còn." },
  check:[
   { kind:"calc", xp:40, question:"Lợi nhuận sau thuế 3.000 tỷ, khấu hao 100 tỷ, hàng tồn kho tăng 5.000 tỷ, phải thu tăng 500 tỷ. Dòng tiền hoạt động là bao nhiêu tỷ?",
     unit:"tỷ VND", answer:-2400, tol:120, hint:"Lợi nhuận + khấu hao − tăng tồn kho − tăng phải thu. Kết quả có thể âm.",
     working:[{k:"Lợi nhuận",v:"+3.000"},{k:"Khấu hao",v:"+100"},{k:"Tồn kho tăng",v:"−5.000"},{k:"Phải thu tăng",v:"−500"},{k:"Dòng tiền hoạt động",v:"−2.400 tỷ"}],
     why:"Chênh lệch 5.400 tỷ giữa lợi nhuận báo cáo và dòng tiền thật. Toàn bộ nằm trong các dự án dở dang chưa bán được — tài sản trên sổ sách nhưng không phải tiền để trả nợ." },
   { kind:"multi", xp:35, need:3, question:"Ba dấu hiệu nào cùng lúc tạo thành mẫu hình khủng hoảng thanh khoản?",
     note:"Chọn 3.",
     options:[
      {t:"Dòng tiền hoạt động âm nhiều kỳ liên tiếp",ok:true,why:"Kinh doanh cốt lõi đang đốt tiền chứ không tạo tiền."},
      {t:"Dòng tiền tài chính dương nhờ vay mới",ok:true,why:"Doanh nghiệp đang sống bằng vốn vay — chỉ bền chừng nào thị trường vốn còn mở."},
      {t:"Hàng tồn kho dở dang phình lên nhanh",ok:true,why:"Tiền đã chi ra nằm kẹt trong dự án chưa bán được."},
      {t:"Lợi nhuận báo cáo tăng",ok:false,why:"Lợi nhuận tăng chính là thứ che giấu mẫu hình này, không phải dấu hiệu của nó."},
      {t:"Doanh nghiệp mua thêm quỹ đất",ok:false,why:"Có thể là dấu hiệu mở rộng bình thường nếu dòng tiền hoạt động dương."},
      {t:"Tổng tài sản tăng",ok:false,why:"Tài sản tăng không nói lên khả năng thanh toán."}]}
  ],
  recap:["Lợi nhuận và dòng tiền của chủ đầu tư lệch pha nhiều năm — đó là bản chất ngành.",
         "Đọc ba dòng: hoạt động, đầu tư, tài chính. Dòng hoạt động nói sự thật.",
         "Dòng hoạt động âm + vay mới + tồn kho phình = khủng hoảng thanh khoản đang hình thành."],
  terms:[{en:"Operating cash flow",vi:"Dòng tiền hoạt động",d:"Tiền thật từ kinh doanh cốt lõi"},
         {en:"Financing cash flow",vi:"Dòng tiền tài chính",d:"Tiền từ vay nợ và phát hành vốn"},
         {en:"Liquidity crisis",vi:"Khủng hoảng thanh khoản",d:"Có tài sản nhưng không có tiền trả nợ đến hạn"}]
}
]);

/* ================= MODULE 16 · READING VN FILINGS ================= */
window.LESSONS = window.LESSONS.concat([

{ id:"l-vnf-1", module:"m-vnread", order:1, minutes:5, xp:70,
  title:"The first three pages", vi:"Ba trang đầu cần đọc",
  hook:{ q:"Báo cáo thường niên 180 trang. Bạn có 20 phút.",
         text:"Đọc ba thứ theo đúng thứ tự này, và bạn sẽ biết nhiều hơn 90% người đọc từ trang đầu tới trang cuối." },
  core:[
   { h:"Thứ nhất — cơ cấu doanh thu theo mảng", hVi:"",
     body:"Doanh nghiệp Việt Nam thường là tập đoàn đa ngành. Biết mảng nào tạo doanh thu và mảng nào tạo lợi nhuận là hiểu được mô hình kinh doanh thật.",
     note:"Doanh thu lớn nhất và lợi nhuận lớn nhất thường không đến từ cùng một mảng." },
   { h:"Thứ hai — báo cáo lưu chuyển tiền tệ", hVi:"",
     body:"Đọc trước báo cáo kết quả kinh doanh. So dòng tiền hoạt động với lợi nhuận trong ba năm.",
     example:{company:"fpt", text:"Với công ty dịch vụ, dòng tiền hoạt động nên bám sát lợi nhuận. Nếu lệch nhiều, hãy tìm trong phải thu khách hàng."} },
   { h:"Thứ ba — thuyết minh về bên liên quan", hVi:"",
     body:"Cho biết bao nhiêu doanh thu và công nợ đến từ các công ty trong cùng hệ sinh thái. Đây là nơi chất lượng doanh thu lộ ra.",
     note:"Doanh thu từ bên liên quan không chứng minh được nhu cầu thị trường bên ngoài." }
  ],
  worked:{ title:"20 phút với một báo cáo thường niên",
    steps:[
     {k:"Phút 1-5",v:"cơ cấu doanh thu và lợi nhuận theo mảng"},
     {k:"Câu hỏi",v:"mảng nào tạo tiền, mảng nào tiêu tiền?"},
     {k:"Phút 6-12",v:"lưu chuyển tiền tệ 3 năm"},
     {k:"Câu hỏi",v:"dòng tiền hoạt động có bám lợi nhuận không?"},
     {k:"Phút 13-17",v:"thuyết minh bên liên quan"},
     {k:"Câu hỏi",v:"bao nhiêu doanh thu là nội bộ hệ sinh thái?"},
     {k:"Phút 18-20",v:"lịch đáo hạn nợ vay"}],
    conclusion:"Bốn câu hỏi, 20 phút. Nếu cả bốn đều cho câu trả lời tốt, doanh nghiệp xứng đáng với 20 giờ phân tích tiếp theo. Nếu hai câu trở lên cho câu trả lời xấu, bạn vừa tiết kiệm được 20 giờ." },
  check:[
   { kind:"mcq", xp:35, question:"Bạn có 20 phút với báo cáo thường niên của một tập đoàn đa ngành. Đọc gì trước tiên?",
     options:[
      {t:"Cơ cấu doanh thu và lợi nhuận theo từng mảng",ok:true,why:"Với tập đoàn đa ngành, đây là thứ cho biết mô hình kinh doanh thật. Doanh thu lớn nhất và lợi nhuận lớn nhất thường không cùng một mảng."},
      {t:"Thư ngỏ của chủ tịch",ok:false,why:"Tài liệu truyền thông, gần như không có thông tin ra quyết định được."},
      {t:"Dòng lợi nhuận sau thuế",ok:false,why:"Một con số duy nhất không nói lên cấu trúc kinh doanh."},
      {t:"Danh sách ban lãnh đạo",ok:false,why:"Hữu ích cho quản trị doanh nghiệp nhưng không phải ưu tiên trong 20 phút đầu."}]},
   { kind:"multi", xp:30, need:2, question:"Hai lý do nào khiến thuyết minh bên liên quan quan trọng?",
     note:"Chọn 2.",
     options:[
      {t:"Doanh thu từ bên liên quan không chứng minh được nhu cầu thị trường bên ngoài",ok:true,why:"Bán cho công ty trong cùng tập đoàn không nói lên sản phẩm có được thị trường chấp nhận hay không."},
      {t:"Công nợ với bên liên quan cho thấy dòng tiền đang chảy đi đâu trong hệ sinh thái",ok:true,why:"Đây là nơi phát hiện được tiền đang bị điều chuyển giữa các công ty trong tập đoàn."},
      {t:"Nó cho biết ban lãnh đạo là ai",ok:false,why:"Thông tin đó nằm ở phần quản trị doanh nghiệp."},
      {t:"Nó quyết định giá cổ phiếu",ok:false,why:"Không có mối liên hệ trực tiếp."},
      {t:"Nó liệt kê tài sản cố định",ok:false,why:"Tài sản cố định nằm ở thuyết minh khác."}]}
  ],
  recap:["Ba thứ đọc trước: cơ cấu mảng, lưu chuyển tiền tệ, thuyết minh bên liên quan.",
         "Doanh thu lớn nhất và lợi nhuận lớn nhất thường không cùng một mảng.",
         "Bốn câu hỏi trong 20 phút quyết định doanh nghiệp có đáng 20 giờ tiếp theo không."],
  terms:[{en:"Segment reporting",vi:"Báo cáo theo mảng",d:"Doanh thu và lợi nhuận chia theo lĩnh vực"},
         {en:"Related party",vi:"Bên liên quan",d:"Công ty trong cùng hệ sinh thái sở hữu"},
         {en:"Notes to accounts",vi:"Thuyết minh",d:"Phần giải thích chi tiết sau các bảng số"}]
},

{ id:"l-vnf-2", module:"m-vnread", order:2, minutes:5, xp:80,
  title:"Parent, subsidiary, associate", vi:"Công ty mẹ, con và liên kết",
  hook:{ q:"Tập đoàn báo lãi 5.000 tỷ. Bao nhiêu trong đó là tiền thật của cổ đông công ty mẹ?",
         text:"Có thể ít hơn nhiều. Cấu trúc sở hữu ở tập đoàn Việt Nam thường phức tạp, và lợi nhuận hợp nhất không đồng nghĩa với lợi nhuận thuộc về bạn." },
  core:[
   { h:"Ba mức sở hữu, ba cách ghi nhận", hVi:"",
     body:"Công ty con (trên 50%) được hợp nhất toàn bộ doanh thu và chi phí. Công ty liên kết (20-50%) chỉ ghi nhận phần lợi nhuận theo tỷ lệ. Khoản đầu tư dưới 20% chỉ ghi cổ tức.",
     note:"Hợp nhất toàn bộ nghĩa là 100% doanh thu công ty con vào báo cáo tập đoàn, kể cả khi tập đoàn chỉ sở hữu 51%." },
   { h:"Lợi ích cổ đông không kiểm soát", hVi:"Minority interest",
     body:"Phần lợi nhuận của công ty con thuộc về cổ đông khác phải được trừ ra. Con số cuối cùng thuộc về cổ đông công ty mẹ mới là con số của bạn.",
     example:{company:"masan", text:"Tập đoàn hợp nhất doanh thu bán lẻ và tiêu dùng, nhưng lợi nhuận từ ngân hàng liên kết chỉ được ghi theo tỷ lệ sở hữu."} },
   { h:"Vì sao điều này quan trọng", hVi:"",
     body:"Hai tập đoàn cùng báo lãi 5.000 tỷ nhưng một bên sở hữu 100% các công ty con, một bên chỉ 51% — giá trị thuộc về cổ đông khác nhau rất nhiều.",
     note:"Luôn tìm dòng 'lợi nhuận sau thuế của cổ đông công ty mẹ', không dùng dòng 'lợi nhuận sau thuế' tổng." }
  ],
  worked:{ title:"Bóc tách lợi nhuận hợp nhất",
    steps:[
     {k:"Lợi nhuận sau thuế hợp nhất",v:"5.000 tỷ"},
     {k:"Trong đó từ công ty con A (sở hữu 60%)",v:"2.000 tỷ"},
     {k:"Phần thuộc cổ đông khác của A",v:"−800 tỷ"},
     {k:"Từ công ty con B (sở hữu 51%)",v:"1.000 tỷ"},
     {k:"Phần thuộc cổ đông khác của B",v:"−490 tỷ"},
     {k:"Lợi nhuận cổ đông công ty mẹ",v:"3.710 tỷ"},
     {k:"So với con số công bố",v:"chỉ 74%"}],
    conclusion:"Chênh lệch 1.290 tỷ giữa con số tiêu đề và con số thật sự thuộc về cổ đông công ty mẹ. Khi so sánh hai doanh nghiệp hoặc tính chỉ số trên mỗi cổ phiếu, dùng nhầm dòng sẽ cho kết luận sai." },
  check:[
   { kind:"calc", xp:35, question:"Lợi nhuận sau thuế hợp nhất 5.000 tỷ, lợi ích cổ đông không kiểm soát 1.290 tỷ. Vốn chủ sở hữu của cổ đông công ty mẹ là 22.000 tỷ. ROE của cổ đông công ty mẹ là bao nhiêu phần trăm?",
     unit:"%", answer:16.9, tol:0.8, hint:"Lấy lợi nhuận thuộc cổ đông mẹ chia vốn chủ của họ.",
     working:[{k:"Lợi nhuận cổ đông mẹ",v:"5.000 − 1.290 = 3.710 tỷ"},{k:"Vốn chủ cổ đông mẹ",v:"22.000 tỷ"},{k:"ROE",v:"3.710 ÷ 22.000 = 16,9%"}],
     why:"Nếu dùng nhầm con số 5.000 tỷ, ROE sẽ ra 22,7% — cao hơn thực tế gần 6 điểm. Đây là lỗi rất phổ biến khi so sánh doanh nghiệp có cấu trúc sở hữu khác nhau." },
   { kind:"mcq", xp:30, question:"Tập đoàn sở hữu 51% một công ty con. Doanh thu công ty con được ghi nhận thế nào trong báo cáo hợp nhất?",
     options:[
      {t:"Toàn bộ 100% doanh thu, sau đó trừ phần lợi nhuận thuộc cổ đông khác ở cuối",ok:true,why:"Nguyên tắc hợp nhất: kiểm soát thì hợp nhất toàn bộ, rồi tách phần lợi nhuận không thuộc về mình ở dòng riêng."},
      {t:"Chỉ 51% doanh thu",ok:false,why:"Ghi theo tỷ lệ chỉ áp dụng cho công ty liên kết, không phải công ty con."},
      {t:"Không ghi nhận doanh thu, chỉ ghi cổ tức nhận được",ok:false,why:"Cách này áp dụng cho khoản đầu tư dưới 20%."},
      {t:"Ghi theo giá trị thị trường của khoản đầu tư",ok:false,why:"Không phải nguyên tắc hợp nhất báo cáo tài chính."}]}
  ],
  recap:["Công ty con hợp nhất toàn bộ; công ty liên kết chỉ ghi phần lợi nhuận theo tỷ lệ.",
         "Luôn dùng dòng 'lợi nhuận thuộc cổ đông công ty mẹ'.",
         "Dùng nhầm dòng có thể làm ROE sai vài điểm phần trăm."],
  terms:[{en:"Consolidation",vi:"Hợp nhất",d:"Gộp báo cáo công ty con vào công ty mẹ"},
         {en:"Minority interest",vi:"Lợi ích cổ đông không kiểm soát",d:"Phần lợi nhuận thuộc cổ đông khác của công ty con"},
         {en:"Associate",vi:"Công ty liên kết",d:"Sở hữu 20-50%, ghi nhận theo phương pháp vốn chủ"}]
},

{ id:"l-vnf-3", module:"m-vnread", order:3, minutes:5, xp:80,
  title:"The notes hold the truth", vi:"Sự thật nằm trong thuyết minh",
  hook:{ q:"Bảng số nói một chuyện. Thuyết minh nói chuyện gì?",
         text:"Nói cái mà bảng số buộc phải giấu: chi tiết của những dòng gộp, các giả định kế toán, và những gì đã thay đổi so với năm trước." },
  core:[
   { h:"Bốn thuyết minh đáng đọc nhất", hVi:"",
     body:"Chi tiết doanh thu theo mảng. Chi tiết hàng tồn kho và phải thu. Lịch đáo hạn nợ vay. Giao dịch với bên liên quan.",
     note:"Bốn phần này chiếm khoảng 10 trang nhưng chứa phần lớn thông tin dùng để ra quyết định." },
   { h:"Thay đổi chính sách kế toán", hVi:"",
     body:"Khi doanh nghiệp đổi cách ghi nhận doanh thu, đổi thời gian khấu hao, hoặc đổi cách trích dự phòng, số liệu hai năm không còn so sánh được.",
     example:{company:"vietjet", text:"Cách ghi nhận lợi nhuận từ nghiệp vụ bán và thuê lại máy bay ảnh hưởng lớn tới con số lợi nhuận — và chi tiết chỉ có trong thuyết minh."} },
   { h:"Phần bị bỏ qua nhiều nhất", hVi:"",
     body:"Các khoản cam kết và nợ tiềm tàng: bảo lãnh cho công ty khác, tranh chấp pháp lý đang diễn ra, hợp đồng thuê dài hạn chưa ghi nhận.",
     note:"Đây là những nghĩa vụ chưa nằm trên bảng cân đối nhưng có thể trở thành nghĩa vụ thật." }
  ],
  worked:{ title:"Thuyết minh làm thay đổi kết luận",
    steps:[
     {k:"Bảng số nói",v:"doanh thu 20.000 tỷ, +28%"},
     {k:"Thuyết minh mảng",v:"85% từ một khách hàng lớn nhất"},
     {k:"Ý nghĩa",v:"rủi ro tập trung rất cao"},
     {k:"Bảng số nói",v:"lợi nhuận 2.000 tỷ"},
     {k:"Thuyết minh",v:"600 tỷ từ bán một khoản đầu tư"},
     {k:"Ý nghĩa",v:"lợi nhuận lõi chỉ 1.400 tỷ"},
     {k:"Kết luận sau khi đọc thuyết minh",v:"khác hẳn kết luận từ bảng số"}],
    conclusion:"Cùng một báo cáo, hai kết luận đối lập tuỳ vào việc bạn có đọc mười trang thuyết minh hay không. Đây là lý do nhà phân tích chuyên nghiệp đọc thuyết minh trước, đọc bảng số sau." },
  check:[
   { kind:"multi", xp:35, need:3, question:"Ba thuyết minh nào đáng đọc nhất với một doanh nghiệp sản xuất?",
     note:"Chọn 3.",
     options:[
      {t:"Chi tiết hàng tồn kho và phải thu khách hàng",ok:true,why:"Đây là nơi chất lượng doanh thu lộ ra — hàng ứ đọng và tiền chưa thu được."},
      {t:"Lịch đáo hạn nợ vay",ok:true,why:"Rủi ro thanh khoản nằm ở thời điểm phải trả, không ở tổng nợ."},
      {t:"Giao dịch với bên liên quan",ok:true,why:"Cho biết bao nhiêu doanh thu là nội bộ hệ sinh thái."},
      {t:"Danh sách cổ đông lớn",ok:false,why:"Hữu ích cho quản trị nhưng không phải ưu tiên phân tích kinh doanh."},
      {t:"Thông tin về nhân sự chủ chốt",ok:false,why:"Không ảnh hưởng trực tiếp tới đánh giá tài chính."},
      {t:"Địa chỉ các chi nhánh",ok:false,why:"Không mang thông tin ra quyết định."}]},
   { kind:"mcq", xp:30, question:"Doanh nghiệp thay đổi thời gian khấu hao tài sản từ 10 năm lên 20 năm. Hệ quả là gì?",
     options:[
      {t:"Chi phí khấu hao mỗi năm giảm một nửa, lợi nhuận tăng mà không có tiền mới nào được tạo ra",ok:true,why:"Thay đổi giả định kế toán làm con số đẹp lên trong khi hoạt động kinh doanh không đổi. Và số liệu hai năm không còn so sánh được."},
      {t:"Dòng tiền hoạt động tăng",ok:false,why:"Khấu hao không phải khoản chi tiền — thay đổi nó không ảnh hưởng dòng tiền."},
      {t:"Tài sản trở nên có giá trị hơn",ok:false,why:"Giá trị thật của tài sản không đổi vì một bút toán kế toán."},
      {t:"Không ảnh hưởng gì tới báo cáo",ok:false,why:"Ảnh hưởng trực tiếp và đáng kể tới lợi nhuận báo cáo."}]}
  ],
  recap:["Bốn thuyết minh đáng đọc: cơ cấu mảng, tồn kho và phải thu, lịch đáo hạn nợ, bên liên quan.",
         "Thay đổi chính sách kế toán làm hai năm không còn so sánh được.",
         "Cam kết và nợ tiềm tàng là nghĩa vụ chưa nằm trên bảng cân đối."],
  terms:[{en:"Accounting policy",vi:"Chính sách kế toán",d:"Cách doanh nghiệp chọn ghi nhận các khoản mục"},
         {en:"Contingent liability",vi:"Nợ tiềm tàng",d:"Nghĩa vụ có thể phát sinh trong tương lai"},
         {en:"Concentration risk",vi:"Rủi ro tập trung",d:"Phụ thuộc quá nhiều vào một khách hàng hoặc thị trường"}]
},

{ id:"l-vnf-4", module:"m-vnread", order:4, minutes:6, xp:90,
  title:"Comparing companies in one industry", vi:"So sánh doanh nghiệp cùng ngành",
  hook:{ q:"Hai công ty cùng ngành, một bên biên 12%, một bên 8%. Bên nào tốt hơn?",
         text:"Chưa biết — cho tới khi bạn kiểm tra xem hai con số đó có được tính theo cùng một cách hay không." },
  core:[
   { h:"Chuẩn hoá trước khi so sánh", hVi:"",
     body:"Kiểm tra kỳ kế toán, chính sách khấu hao, cách ghi nhận doanh thu, và cấu trúc sở hữu. Nếu khác nhau, phải điều chỉnh trước khi đặt hai con số cạnh nhau.",
     note:"Sai lầm phổ biến: so biên lợi nhuận của một doanh nghiệp hợp nhất công ty con với một doanh nghiệp chỉ ghi nhận theo phương pháp vốn chủ." },
   { h:"Chọn đúng chỉ số cho ngành", hVi:"",
     body:"Mỗi ngành có bộ chỉ số riêng. So biên lợi nhuận ròng giữa một ngân hàng và một nhà bán lẻ là vô nghĩa.",
     example:{company:"fpt", text:"Với công ty dịch vụ phần mềm, chỉ số so sánh là doanh thu trên mỗi nhân sự và tỷ lệ giờ tính được cho khách — không phải biên lợi nhuận thuần."} },
   { h:"So xu hướng, không chỉ so mức", hVi:"",
     body:"Doanh nghiệp có biên 8% và đang cải thiện 1 điểm mỗi năm thường đáng chú ý hơn doanh nghiệp có biên 12% và đang giảm.",
     note:"Mức cho biết vị trí hiện tại; xu hướng cho biết hướng đi. Xu hướng thường quan trọng hơn với quyết định đầu tư." }
  ],
  worked:{ title:"So sánh hai doanh nghiệp bán lẻ",
    steps:[
     {k:"A — biên gộp",v:"22%"},
     {k:"B — biên gộp",v:"18%",note:"nhìn có vẻ kém hơn"},
     {k:"Kiểm tra 1 — cơ cấu ngành hàng",v:"A bán điện máy, B bán tạp hoá"},
     {k:"Ý nghĩa",v:"hai ngành hàng có biên chuẩn khác nhau"},
     {k:"Kiểm tra 2 — doanh thu mỗi cửa hàng",v:"A: 2,1 tỷ · B: 1,35 tỷ"},
     {k:"Kiểm tra 3 — xu hướng 3 năm",v:"A giảm dần · B tăng dần"},
     {k:"Kết luận",v:"so trực tiếp biên gộp là vô nghĩa"}],
    conclusion:"Sau khi chuẩn hoá, câu chuyện đảo ngược: A có biên cao hơn nhưng đang suy giảm ở một ngành hàng bão hoà, B có biên thấp hơn theo đúng đặc thù ngành hàng và đang cải thiện. Con số đầu tiên đã dẫn tới kết luận ngược." },
  check:[
   { kind:"mcq", xp:35, question:"So sánh hai doanh nghiệp cùng ngành, việc đầu tiên phải làm là gì?",
     options:[
      {t:"Kiểm tra hai con số có được tính theo cùng một cách không",ok:true,why:"Khác kỳ kế toán, khác chính sách khấu hao, khác cấu trúc hợp nhất — mọi thứ đó làm hai con số không so sánh được."},
      {t:"Xếp hạng theo biên lợi nhuận",ok:false,why:"Xếp hạng trước khi chuẩn hoá là cách chắc chắn ra kết luận sai."},
      {t:"Xem doanh nghiệp nào lớn hơn",ok:false,why:"Quy mô không nói lên hiệu quả."},
      {t:"So giá cổ phiếu",ok:false,why:"Giá cổ phiếu phản ánh kỳ vọng, không phản ánh chất lượng vận hành."}]},
   { kind:"multi", xp:35, need:2, question:"Hai điều nào cần kiểm tra trước khi so sánh biên lợi nhuận hai doanh nghiệp?",
     note:"Chọn 2.",
     options:[
      {t:"Cơ cấu ngành hàng hoặc mảng kinh doanh có tương đương không",ok:true,why:"Biên chuẩn của điện máy và tạp hoá khác nhau rất nhiều — so trực tiếp là vô nghĩa."},
      {t:"Cấu trúc sở hữu và cách hợp nhất công ty con",ok:true,why:"Hợp nhất toàn bộ và ghi nhận theo tỷ lệ cho ra hai bức tranh biên rất khác nhau."},
      {t:"Doanh nghiệp nào niêm yết trước",ok:false,why:"Không liên quan tới khả năng so sánh số liệu."},
      {t:"Số lượng nhân viên",ok:false,why:"Chỉ liên quan nếu đang so chỉ số năng suất."},
      {t:"Ai là cổ đông lớn nhất",ok:false,why:"Thuộc về quản trị doanh nghiệp, không ảnh hưởng tính so sánh được của biên."}]}
  ],
  recap:["Chuẩn hoá trước khi so sánh: kỳ kế toán, chính sách khấu hao, cấu trúc hợp nhất.",
         "Mỗi ngành có bộ chỉ số riêng — chọn đúng chỉ số trước khi so.",
         "Xu hướng thường quan trọng hơn mức hiện tại."],
  terms:[{en:"Peer comparison",vi:"So sánh cùng ngành",d:"Đối chiếu với doanh nghiệp tương đương"},
         {en:"Normalisation",vi:"Chuẩn hoá",d:"Điều chỉnh số liệu về cùng một cơ sở so sánh"},
         {en:"Like-for-like",vi:"So cùng cơ sở",d:"So sánh sau khi loại bỏ khác biệt kỹ thuật"}]
}
]);


/* ---- bảng tra cứu: LUÔN đặt ở cuối file, sau mọi lần concat ---- */
window.TRACK_BY_ID  = Object.fromEntries(window.TRACKS.map(t=>[t.id,t]));
window.MODULE_BY_ID = Object.fromEntries(window.MODULES.map(m=>[m.id,m]));
window.LESSON_BY_ID = Object.fromEntries(window.LESSONS.map(l=>[l.id,l]));
