/* ===== ĐỀ ARENA · đợt 8: iv-21 → iv-30 (case phỏng vấn) =====
   Số liệu minh hoạ để luyện tập. Mọi con số then chốt tính lại được từ exhibit. */
(function(R){

/* ─────────── iv-21 · Growth · app học tiếng Anh ─────────── */
R({
  id:"iv-21", title:"Growth: ứng dụng học tiếng Anh đốt tiền lấy người dùng",
  brief:{context:"Người phỏng vấn: \"Một ứng dụng học tiếng Anh có 500.000 người dùng hằng tháng và đang chi mạnh để lấy thêm. Nhà đầu tư hỏi mô hình này có bền không.\"",
         task:"dựng kinh tế một khách trả phí, so LTV với chi phí thu hút và đề xuất cách sửa."},
  labels:{problem:"1 · Nhắc lại đề bằng một câu", hyps:"2 · Cấu trúc bạn nói với người phỏng vấn", evidence:"3 · Phân tích và con số"},
  exhibits:[
    {kind:"table", title:"Người dùng và doanh thu", unit:"",
     head:["Chỉ tiêu","Giá trị","Ghi chú"],
     rows:[["Người dùng hằng tháng","500.000",""],["Tỷ lệ chuyển sang trả phí","4%",""],["Khách trả phí","20.000",""],
           ["Giá gói","1,2 triệu/năm",""],["Biên đóng góp sau chi phí phục vụ","70%",""],["Chi phí thu hút một khách trả phí","0,9 triệu",""]]},
    {kind:"bars", title:"Tỷ lệ rời bỏ theo tháng sử dụng", unit:"% còn lại",
     headline:"Một nửa rời bỏ trong ba tháng đầu", sub:"Nhóm khách trả phí tháng 1",
     rows:[["Tháng 1",100,"var(--series-base)"],["Tháng 3",52,"var(--series-bad)"],["Tháng 6",31,"var(--series-bad)"],["Tháng 12",14,"var(--series-bad)"]],
     max:100, ticks:[0,25,50,75,100]},
    {kind:"metrics", title:"Hành vi học",
     items:[["Khách học đủ 3 buổi tuần đầu · còn lại sau 6 tháng","58%",""],
            ["Khách không học đủ 3 buổi tuần đầu · còn lại sau 6 tháng","12%",""],["Vòng đời trung bình","11 tháng",""]]}
  ],
  options:[
    ["A","Tăng ngân sách quảng cáo để lấy thêm người dùng","Mỗi khách mang về 0,77 triệu giá trị mà tốn 0,9 triệu để lấy — càng chi càng lỗ.",25],
    ["B","Dồn nguồn lực vào tuần đầu để khách học đủ 3 buổi, đồng thời chuyển ngân sách quảng cáo sang kênh giới thiệu rẻ hơn","LTV 0,77 triệu đang thấp hơn chi phí thu hút 0,9 triệu; nhóm học đủ 3 buổi tuần đầu giữ được 58% sau 6 tháng nên đó là đòn bẩy rẻ nhất.",95],
    ["C","Tăng giá gói lên 1,8 triệu","Giá cao hơn làm tỷ lệ chuyển đổi 4% giảm tiếp, chưa chạm vào việc khách bỏ học trong ba tháng đầu.",40],
    ["D","Bỏ gói trả phí và chuyển hoàn toàn sang quảng cáo","Đổi mô hình doanh thu khi vấn đề nằm ở giữ chân người học.",30]
  ],
  correct:"B",
  framing:[["ứng dụng","người dùng"],["bền","đốt tiền","chi phí thu hút"]],
  branches:[["người dùng","chuyển đổi","trả phí"],["giá gói","biên đóng góp","doanh thu"],["rời bỏ","vòng đời","giữ chân"],["chi phí thu hút","kênh","cac"]],
  numbers:[{v:0.77,tol:0.01,pts:30,core:true},{v:0.9,tol:0.01,pts:25},{v:20000,tol:10,pts:20},{v:11,tol:0.1,pts:15}],
  insight:[{kw:["tuần đầu","3 buổi"],pts:40},{kw:["giữ chân","rời bỏ"],pts:35},{kw:["kênh giới thiệu","rẻ hơn"],pts:25}],
  unit:"tỷ|%|triệu",
  model:{
    problem:"Mô hình ứng dụng học tiếng Anh có bền không khi đang chi mạnh để lấy người dùng, và sửa ở đâu?",
    hyps:["Tỷ lệ chuyển sang trả phí quyết định số khách tạo doanh thu","Giá gói và biên đóng góp quyết định giá trị mỗi khách mỗi tháng",
          "Vòng đời ngắn vì khách rời bỏ sớm làm giá trị trọn đời thấp","Chi phí thu hút cao hơn giá trị trọn đời thì mô hình không bền"],
    evidence:"Ex.1: 500.000 × 4% = 20.000 khách trả phí; mỗi khách đóng góp 1,2 triệu × 70% = 0,84 triệu mỗi năm, tức 0,07 triệu mỗi tháng. Ex.3: vòng đời trung bình 11 tháng nên giá trị trọn đời khoảng 0,77 triệu, thấp hơn chi phí thu hút 0,9 triệu — H1, H2, H3, H4 đều đúng và giả thuyết cứ chi thêm quảng cáo sẽ lớn được bị bác bỏ. Ex.2: chỉ 52% còn lại sau ba tháng; Ex.3 cho thấy nhóm học đủ 3 buổi tuần đầu giữ được 58% sau 6 tháng so với 12% ở nhóm còn lại, nên dồn nguồn lực vào tuần đầu để giữ chân và chuyển ngân sách sang kênh giới thiệu rẻ hơn.",
    rec:"B"},
  mistakes:{
    logicLesson:"i-profit-3",
    calc:{label:"giá trị trọn đời so với chi phí thu hút", lesson:"i-profit-2",
      good:"1,2 triệu × 70% = 0,84 triệu/năm → 0,07 triệu/tháng × 11 tháng = 0,77 triệu, so với chi phí thu hút 0,9 triệu",
      why:"Mô hình thuê bao sống hay chết ở tỷ số giữa giá trị trọn đời và chi phí thu hút."},
    framework:{lesson:"i-profit-1",
      good:"Bốn nhánh: chuyển đổi trả phí · giá và biên đóng góp · vòng đời và rời bỏ · chi phí thu hút theo kênh",
      why:"Thiếu nhánh vòng đời thì mọi con số doanh thu đều lạc quan giả."},
    exhibit:{lesson:"i-chart-1", bad:"Không nối hành vi tuần đầu với tỷ lệ còn lại sau 6 tháng",
      good:"Ex.3: học đủ 3 buổi tuần đầu giữ 58% so với 12% ở nhóm không học đủ",
      why:"Exhibit hành vi chỉ ra đòn bẩy giữ chân rẻ nhất, thay vì chi thêm quảng cáo."}
  },
  goodFeedback:"Dựng đúng giá trị trọn đời, so với chi phí thu hút và tìm đòn bẩy giữ chân từ hành vi tuần đầu."
});

/* ─────────── iv-22 · Pricing · phần mềm kế toán chuyển thuê bao ─────────── */
R({
  id:"iv-22", title:"Pricing: phần mềm kế toán chuyển sang thuê bao",
  brief:{context:"Người phỏng vấn: \"Một công ty phần mềm kế toán đang bán bản quyền vĩnh viễn muốn chuyển sang thuê bao tháng. Bạn dẫn case: nên chuyển không và doanh thu năm đầu ra sao?\"",
         task:"so doanh thu hai mô hình trong năm đầu, nêu rủi ro chuyển đổi và đề xuất lộ trình."},
  labels:{problem:"1 · Nhắc lại đề bằng một câu", hyps:"2 · Cấu trúc bạn tự dẫn", evidence:"3 · Phân tích và con số"},
  exhibits:[
    {kind:"table", title:"Mô hình hiện tại và đề xuất", unit:"",
     head:["Chỉ tiêu","Giá trị","Ghi chú"],
     rows:[["Giá bản quyền vĩnh viễn","12 triệu/bản",""],["Bản bán mới mỗi năm","5.000",""],["Doanh thu hiện tại","60 tỷ/năm",""],
           ["Giá thuê bao đề xuất","400.000đ/tháng","4,8 triệu mỗi năm"],["Khách đang dùng bản vĩnh viễn","20.000",""]]},
    {kind:"bars", title:"Ý định chuyển sang thuê bao", unit:"% khách hiện hữu",
     headline:"Sáu trên mười khách cũ sẵn sàng chuyển", sub:"Khảo sát 1.100 khách",
     rows:[["Sẵn sàng chuyển",60,"var(--series-focus)"],["Cân nhắc",25,"var(--series-base)"],["Không chuyển",15,"var(--series-bad)"]],
     max:70, ticks:[0,17.5,35,52.5,70]},
    {kind:"metrics", title:"Ràng buộc",
     items:[["Chi phí hỗ trợ mỗi khách mỗi năm","0,6 triệu","thuê bao có cập nhật liên tục"],
            ["Tỷ lệ rời bỏ thuê bao dự kiến","10%/năm",""],["Khách cũ không trả phí cập nhật","78%",""]]}
  ],
  options:[
    ["A","Chuyển toàn bộ sang thuê bao ngay và ngừng bán bản vĩnh viễn","15% khách không chuyển sẽ mất hẳn, mà nhóm cân nhắc cần thời gian — cắt đứt ngay là bỏ doanh thu chắc chắn.",45],
    ["B","Chạy song song hai mô hình trong 12 tháng: khách mới mặc định thuê bao, khách cũ được ưu đãi chuyển đổi theo đợt, đo tỷ lệ rời bỏ trước khi ngừng bán bản vĩnh viễn","Doanh thu năm đầu 81,6 tỷ cao hơn 60 tỷ hiện tại nếu 60% khách cũ chuyển; chạy song song giữ phần doanh thu của nhóm chưa sẵn sàng và đo rủi ro rời bỏ.",95],
    ["C","Giữ nguyên mô hình bán vĩnh viễn","Bỏ qua 78% khách cũ không trả phí cập nhật — phần doanh thu định kỳ đang mất mỗi năm.",40],
    ["D","Giảm giá thuê bao xuống 250.000đ để kéo khách chuyển nhanh","Hạ giá khi 60% khách đã sẵn sàng chuyển ở mức 400.000đ là bỏ doanh thu không cần thiết.",35]
  ],
  correct:"B",
  framing:[["phần mềm","thuê bao"],["chuyển","doanh thu","mô hình"]],
  branches:[["khách mới","bản bán mới"],["khách cũ","chuyển đổi"],["giá thuê bao","doanh thu định kỳ"],["rời bỏ","chi phí hỗ trợ","rủi ro"]],
  numbers:[{v:81.6,tol:0.1,pts:30,core:true},{v:60,tol:0.5,pts:25},{v:12000,tol:10,pts:20},{v:4.8,tol:0.05,pts:15}],
  insight:[{kw:["chạy song song","theo đợt"],pts:40},{kw:["doanh thu định kỳ","cập nhật"],pts:35},{kw:["rời bỏ","đo rủi ro"],pts:25}],
  unit:"tỷ|%|triệu|đ",
  model:{
    problem:"Công ty phần mềm kế toán có nên chuyển từ bán bản quyền vĩnh viễn sang thuê bao tháng, và doanh thu năm đầu thay đổi thế nào?",
    hyps:["Khách mới mỗi năm chuyển sang thuê bao tạo dòng doanh thu định kỳ","Một phần khách cũ sẽ chuyển và mang lại doanh thu mới",
          "Giá thuê bao thấp hơn giá bản quyền nên năm đầu có thể hụt","Rủi ro nằm ở nhóm không chuyển và tỷ lệ rời bỏ thuê bao"],
    evidence:"Ex.1 và Ex.2: 5.000 khách mới cộng 60% của 20.000 khách cũ là 12.000 khách chuyển, tổng 17.000 thuê bao × 4,8 triệu = 81,6 tỷ trong năm đầu, so với 60 tỷ của mô hình hiện tại. H1, H2 đúng và H3 bị bác bỏ ở kịch bản này vì số lượng bù được mức giá thấp hơn. Ex.3: 78% khách cũ không trả phí cập nhật nên thuê bao mở ra dòng doanh thu định kỳ đang mất; nhưng 15% khách không chuyển và tỷ lệ rời bỏ 10% mỗi năm nên H4 đúng — chạy song song 12 tháng, khách mới mặc định thuê bao, khách cũ chuyển theo đợt để đo rủi ro trước khi ngừng bán bản vĩnh viễn.",
    rec:"B"},
  mistakes:{
    logicLesson:"i-profit-3",
    calc:{label:"doanh thu năm đầu của mô hình thuê bao", lesson:"i-profit-2",
      good:"(5.000 khách mới + 60% × 20.000 = 12.000 khách cũ) × 4,8 triệu = 81,6 tỷ so với 60 tỷ hiện tại",
      why:"So hai mô hình phải cùng một năm và cùng một tệp khách, nếu không sẽ so nhầm."},
    framework:{lesson:"i-profit-1",
      good:"Bốn nhánh: khách mới · khách cũ chuyển đổi · giá và doanh thu định kỳ · rời bỏ và chi phí hỗ trợ",
      why:"Chuyển mô hình giá luôn có hai tệp khách khác nhau, phải tách ra."},
    exhibit:{lesson:"i-chart-1", bad:"Không dùng tỷ lệ sẵn sàng chuyển để chia kịch bản",
      good:"Ex.2: 60% sẵn sàng chuyển, 25% cân nhắc, 15% không chuyển",
      why:"Tỷ lệ chuyển đổi quyết định doanh thu năm đầu và cả lộ trình ngừng bán bản cũ."}
  },
  goodFeedback:"So hai mô hình trên cùng một năm, tách hai tệp khách và biến rủi ro thành lộ trình chạy song song."
});

/* ─────────── iv-23 · Operations · nhà máy may cân bằng chuyền ─────────── */
R({
  id:"iv-23", title:"Operations: nhà máy may không đạt sản lượng đơn hàng",
  brief:{context:"Người phỏng vấn: \"Một nhà máy may nhận đơn lớn nhưng chuyền không ra đủ hàng dù không thiếu công nhân. Giám đốc sản xuất muốn biết nghẽn ở đâu.\"",
         task:"tính công suất thật của chuyền, xác định công đoạn nghẽn và đề xuất cách nâng sản lượng."},
  labels:{problem:"1 · Nhắc lại đề bằng một câu", hyps:"2 · Cấu trúc bạn nói với người phỏng vấn", evidence:"3 · Phân tích và con số"},
  exhibits:[
    {kind:"table", title:"Chuyền may", unit:"mỗi chuyền",
     head:["Chỉ tiêu","Giá trị","Ghi chú"],
     rows:[["Số chuyền","20",""],["Công nhân mỗi chuyền","60",""],["Giờ sản xuất mỗi ngày","8",""],
           ["Sản lượng kế hoạch mỗi chuyền","480 áo/ngày","60 áo mỗi giờ"],["Sản lượng thực tế mỗi chuyền","344 áo/ngày",""]]},
    {kind:"bars", title:"Thời gian chuẩn theo công đoạn", unit:"phút mỗi áo",
     headline:"Công đoạn tra tay chậm hơn nhịp chuyền 40%", sub:"Đo trên 500 áo",
     rows:[["Cắt và ráp thân",0.9,"var(--series-base)"],["Tra tay",1.4,"var(--series-bad)"],["May cổ",1,"var(--series-base)"],["Hoàn thiện và kiểm",0.9,"var(--series-base)"]],
     max:1.6, ticks:[0,0.4,0.8,1.2,1.6]},
    {kind:"metrics", title:"Nguồn lực",
     items:[["Nhịp chuyền mục tiêu","1 phút mỗi áo",""],["Công nhân dự phòng có thể điều động","40",""],
            ["Chi phí thêm một máy tra tay","180 triệu",""]]}
  ],
  options:[
    ["A","Tăng ca thêm 2 giờ mỗi ngày","Nhân thêm giờ cho một chuyền đang chạy dưới công suất vì nghẽn — chi phí tăng mà tỷ lệ mất vẫn còn.",40],
    ["B","Dồn thêm công nhân và một máy vào công đoạn tra tay để kéo thời gian về nhịp chuyền 1 phút, nâng công suất từ 43 lên 60 áo mỗi giờ","Công suất chuyền bằng công suất công đoạn chậm nhất; sửa đúng công đoạn tra tay lấy lại 28% sản lượng đang mất.",95],
    ["C","Tuyển thêm 200 công nhân","Thêm người ở công đoạn không nghẽn không tạo thêm áo nào.",30],
    ["D","Giảm cam kết sản lượng với khách","Nhường đơn hàng trong khi phần mất là sửa được bằng cân bằng chuyền.",35]
  ],
  correct:"B",
  framing:[["nhà máy may","chuyền"],["sản lượng","không đủ","nghẽn"]],
  branches:[["công suất","nhịp chuyền"],["công đoạn","tra tay","nghẽn"],["công nhân","nguồn lực","máy"],["sản lượng thực tế","kế hoạch","chênh lệch"]],
  numbers:[{v:43,tol:0.5,pts:30,core:true},{v:1.4,tol:0.05,pts:25},{v:28,tol:0.5,pts:20},{v:344,tol:1,pts:15}],
  insight:[{kw:["công đoạn chậm nhất","nghẽn"],pts:40},{kw:["cân bằng chuyền","nhịp chuyền"],pts:35},{kw:["dồn nguồn lực","thêm máy"],pts:25}],
  unit:"%|áo|phút|triệu",
  model:{
    problem:"Vì sao nhà máy may không ra đủ sản lượng đơn hàng dù đủ công nhân, và nâng sản lượng bằng cách nào?",
    hyps:["Sản lượng thực tế thấp hơn kế hoạch một khoảng lớn","Công suất chuyền bị quyết định bởi công đoạn chậm nhất",
          "Công đoạn tra tay chậm hơn nhịp chuyền mục tiêu","Thêm công nhân ở công đoạn không nghẽn không làm tăng sản lượng"],
    evidence:"Ex.1: kế hoạch 480 áo mỗi ngày nhưng thực tế 344 áo, hụt 28%. Ex.2: công đoạn tra tay mất 1,4 phút mỗi áo trong khi nhịp chuyền mục tiêu là 1 phút, nên công suất chuyền chỉ 60 ÷ 1,4 = 43 áo mỗi giờ thay vì 60 — H1, H2, H3 đúng. Giả thuyết thiếu người bị bác bỏ vì các công đoạn khác đều dưới 1 phút, H4 đúng. Ex.3: có 40 công nhân dự phòng và một máy tra tay giá 180 triệu, nên dồn nguồn lực vào đúng công đoạn chậm nhất để cân bằng chuyền về nhịp 1 phút và lấy lại phần sản lượng mất.",
    rec:"B"},
  mistakes:{
    logicLesson:"i-profit-3",
    calc:{label:"công suất chuyền theo công đoạn nghẽn", lesson:"i-profit-2",
      good:"Tra tay 1,4 phút/áo → 60 ÷ 1,4 = 43 áo/giờ = 344 áo/ngày, hụt 28% so với kế hoạch 480",
      why:"Công suất dây chuyền bằng công suất của công đoạn chậm nhất, không phải trung bình các công đoạn."},
    framework:{lesson:"i-profit-1",
      good:"Bốn nhánh: sản lượng kế hoạch và thực tế · nhịp chuyền · thời gian từng công đoạn · nguồn lực có thể điều động",
      why:"Không tách theo công đoạn thì mọi khuyến nghị đều là thêm người hoặc tăng ca."},
    exhibit:{lesson:"i-chart-1", bad:"Không so thời gian từng công đoạn với nhịp chuyền mục tiêu",
      good:"Ex.2: tra tay 1,4 phút so với nhịp mục tiêu 1 phút, các công đoạn khác đều dưới 1 phút",
      why:"Chỉ công đoạn vượt nhịp mới là nghẽn — phần còn lại chỉ đang chờ."}
  },
  goodFeedback:"Tìm đúng công đoạn nghẽn, quy ra công suất giờ và dồn nguồn lực vào đúng chỗ đó."
});

/* ─────────── iv-24 · M&A · ngân hàng mua công ty tài chính tiêu dùng ─────────── */
R({
  id:"iv-24", title:"M&A: ngân hàng mua công ty tài chính tiêu dùng",
  brief:{context:"Người phỏng vấn: \"Một ngân hàng được chào mua một công ty tài chính tiêu dùng với giá 15.000 tỷ. Bạn dẫn case: mức giá đó có hợp lý không?\"",
         task:"dựng lợi nhuận của công ty mục tiêu từ cấu trúc biên, quy giá về bội số và nêu rủi ro chu kỳ."},
  labels:{problem:"1 · Nhắc lại đề bằng một câu", hyps:"2 · Cấu trúc bạn tự dẫn", evidence:"3 · Phân tích và con số"},
  exhibits:[
    {kind:"table", title:"Công ty mục tiêu", unit:"",
     head:["Chỉ tiêu","Giá trị","Ghi chú"],
     rows:[["Dư nợ cho vay","20.000 tỷ",""],["Biên lãi thuần","20% dư nợ",""],["Chi phí rủi ro tín dụng","9% dư nợ",""],
           ["Chi phí hoạt động","6% dư nợ",""],["Vốn chủ sở hữu","3.000 tỷ",""],["Giá chào","15.000 tỷ",""]]},
    {kind:"bars", title:"Chi phí rủi ro qua chu kỳ", unit:"% dư nợ",
     headline:"Chi phí rủi ro tăng mạnh trong năm suy giảm", sub:"Bốn năm gần nhất",
     rows:[["Năm thuận lợi 1",7,"var(--series-base)"],["Năm thuận lợi 2",8,"var(--series-base)"],["Năm suy giảm",14,"var(--series-bad)"],["Năm nay",9,"var(--series-focus)"]],
     max:16, ticks:[0,4,8,12,16]},
    {kind:"metrics", title:"So sánh thị trường",
     items:[["Bội số lợi nhuận các thương vụ tài chính tiêu dùng","10–12 lần",""],
            ["Bội số giá trên vốn chủ thường gặp","3 lần",""],["Tỷ trọng dư nợ từ một kênh đối tác lớn nhất","46%",""]]}
  ],
  options:[
    ["A","Trả 15.000 tỷ như giá chào","15 lần lợi nhuận và 5 lần vốn chủ, cao hơn cả hai mặt bằng, lại trả ở năm chi phí rủi ro thấp của chu kỳ.",30],
    ["B","Đưa giá về vùng 10–12 lần lợi nhuận chuẩn hoá qua chu kỳ, kèm điều kiện giữ hợp đồng kênh đối tác lớn nhất và điều chỉnh giá nếu chi phí rủi ro vượt ngưỡng","Lợi nhuận 1.000 tỷ ở mức chi phí rủi ro 9% là đỉnh chu kỳ; chuẩn hoá rủi ro và ràng buộc kênh đối tác 46% dư nợ mới phản ánh giá trị thật.",95],
    ["C","Bỏ thương vụ vì cho vay tiêu dùng quá rủi ro","Bỏ luôn một mảng có biên lãi thuần 20% mà ngân hàng khó tự xây trong vài năm.",45],
    ["D","Mua nhưng cắt ngay một nửa dư nợ rủi ro cao","Cắt dư nợ là cắt chính nguồn thu nhập vừa mua, trong khi chưa biết chất lượng từng nhóm khách.",35]
  ],
  correct:"B",
  framing:[["công ty tài chính","ngân hàng"],["giá","mua","định giá"]],
  branches:[["biên lãi thuần","dư nợ","thu nhập"],["chi phí rủi ro","chu kỳ"],["bội số","vốn chủ","định giá"],["kênh đối tác","phụ thuộc","rủi ro"]],
  numbers:[{v:1000,tol:1,pts:30,core:true},{v:15,tol:0.1,pts:25},{v:5,tol:0.1,pts:20},{v:20000,tol:10,pts:15}],
  insight:[{kw:["chu kỳ","chuẩn hoá"],pts:40},{kw:["kênh đối tác","phụ thuộc"],pts:35},{kw:["bội số","mặt bằng"],pts:25}],
  unit:"tỷ|%|lần",
  model:{
    problem:"Giá chào 15.000 tỷ cho công ty tài chính tiêu dùng có hợp lý không, và ngân hàng nên trả bao nhiêu?",
    hyps:["Lợi nhuận mục tiêu đến từ biên lãi thuần trừ chi phí rủi ro và chi phí hoạt động","Chi phí rủi ro năm nay thấp hơn mức trung bình qua chu kỳ",
          "Bội số giá chào cao hơn mặt bằng thương vụ cùng ngành","Dư nợ phụ thuộc một kênh đối tác lớn là rủi ro phải phản ánh vào giá"],
    evidence:"Ex.1: biên lãi thuần 20% trừ chi phí rủi ro 9% và chi phí hoạt động 6% còn 5% trên dư nợ 20.000 tỷ, tức lợi nhuận trước thuế 1.000 tỷ; giá 15.000 tỷ là 15 lần lợi nhuận và 5 lần vốn chủ 3.000 tỷ. Ex.3: mặt bằng là 10–12 lần lợi nhuận và 3 lần vốn chủ nên H1, H3 đúng. Ex.2: chi phí rủi ro từng lên 14% trong năm suy giảm, nên mức 9% của năm nay là đỉnh chu kỳ và giả thuyết lấy lợi nhuận năm nay làm chuẩn bị bác bỏ, H2 đúng. H4 đúng: 46% dư nợ đến từ một kênh đối tác nên phải kèm điều kiện giữ hợp đồng và cơ chế điều chỉnh giá theo chi phí rủi ro.",
    rec:"B"},
  mistakes:{
    logicLesson:"i-entry-3",
    calc:{label:"lợi nhuận mục tiêu và bội số giá", lesson:"i-profit-2",
      good:"(20% − 9% − 6%) × 20.000 = 1.000 tỷ; 15.000 ÷ 1.000 = 15 lần lợi nhuận; 15.000 ÷ 3.000 = 5 lần vốn chủ",
      why:"Trong tài chính, phải dựng lợi nhuận từ cấu trúc biên trên dư nợ rồi mới quy về bội số."},
    framework:{lesson:"i-entry-2",
      good:"Bốn nhánh: thu nhập từ dư nợ · chi phí rủi ro qua chu kỳ · bội số so sánh · rủi ro tập trung kênh",
      why:"Định giá tổ chức cho vay luôn phải chuẩn hoá chi phí rủi ro theo chu kỳ."},
    exhibit:{lesson:"f-moat-3", bad:"Không chuẩn hoá chi phí rủi ro theo chu kỳ bốn năm",
      good:"Ex.2: chi phí rủi ro 7–8% năm thuận lợi, 14% năm suy giảm, 9% năm nay",
      why:"Mua ở đỉnh chu kỳ với lợi nhuận đỉnh là cách trả giá đắt mà vẫn thấy bội số đẹp."}
  },
  goodFeedback:"Dựng lợi nhuận từ cấu trúc biên, chuẩn hoá chi phí rủi ro theo chu kỳ và gắn rủi ro kênh vào điều kiện."
});

/* ─────────── iv-25 · Market Sizing · thức ăn cho thú cưng ─────────── */
R({
  id:"iv-25", title:"Market sizing: thị trường thức ăn cho chó mèo đóng gói",
  brief:{context:"Người phỏng vấn: \"Ước lượng quy mô thị trường thức ăn đóng gói cho chó mèo ở các thành phố lớn Việt Nam mỗi năm.\"",
         task:"dựng cây ước lượng từ số hộ nuôi, nói rõ giả định và kiểm tra chéo."},
  labels:{problem:"1 · Nhắc lại đề bằng một câu", hyps:"2 · Cấu trúc ước lượng", evidence:"3 · Phân tích và con số"},
  exhibits:[
    {kind:"table", title:"Giả định cho sẵn", unit:"",
     head:["Giả định","Giá trị","Ghi chú"],
     rows:[["Hộ gia đình thành thị nuôi chó hoặc mèo","5 triệu",""],["Tỷ lệ dùng thức ăn đóng gói","40%",""],
           ["Lượng thức ăn mỗi hộ","15 kg/năm",""],["Giá trung bình","80.000đ/kg",""]]},
    {kind:"bars", title:"Cách cho thú cưng ăn", unit:"% hộ nuôi",
     headline:"Cơm nhà vẫn là cách phổ biến nhất", sub:"Khảo sát 1.500 hộ thành thị",
     rows:[["Cơm nhà hoàn toàn",38,"var(--series-base)"],["Kết hợp",22,"var(--series-base)"],["Thức ăn đóng gói là chính",40,"var(--series-focus)"]],
     max:50, ticks:[0,12.5,25,37.5,50]},
    {kind:"metrics", title:"Kiểm tra chéo",
     items:[["Cửa hàng thú cưng và phòng khám bán thức ăn","4.500",""],["Doanh thu thức ăn mỗi điểm","42 triệu/tháng",""],
            ["Tỷ trọng bán qua kênh online","24%",""]]}
  ],
  options:[
    ["A","Lấy tổng số hộ thành thị nhân giá trung bình","Tính cả hộ không nuôi thú cưng — sai ngay ở tầng đầu tiên.",20],
    ["B","Ước lượng 2.400 tỷ đồng mỗi năm từ hộ dùng thức ăn đóng gói, kiểm tra chéo bằng doanh thu mỗi điểm bán và nêu độ nhạy theo lượng ăn mỗi hộ","Đi từ số hộ nuôi tới kilogram rồi tới tiền, kiểm tra chéo bằng kênh phân phối và chỉ ra biến nhạy nhất.",95],
    ["C","Nhân số chó mèo với khẩu phần ngày","Hợp lý nhưng chưa có số cá thể mỗi hộ, dễ nhân đôi so với dữ liệu đang có.",50],
    ["D","Không ước lượng được vì chưa có thống kê thú cưng","Market sizing chấm cây ước lượng và giả định chứ không chấm việc có sẵn thống kê.",25]
  ],
  correct:"B",
  framing:[["thú cưng","chó mèo"],["quy mô","ước lượng","thị trường"]],
  branches:[["hộ nuôi","số hộ"],["tỷ lệ dùng","hành vi"],["lượng ăn","kilogram","khẩu phần"],["giá","doanh thu","kiểm tra chéo"]],
  numbers:[{v:2400,tol:5,pts:30,core:true},{v:2000000,tol:1000,pts:25},{v:80000,tol:100,pts:20},{v:15,tol:0.1,pts:15}],
  insight:[{kw:["kiểm tra chéo","đối chiếu"],pts:40},{kw:["độ nhạy","giả định nhạy"],pts:35},{kw:["cơm nhà","kết hợp"],pts:25}],
  unit:"tỷ|%|đ|kg",
  model:{
    problem:"Thị trường thức ăn đóng gói cho chó mèo ở các thành phố lớn Việt Nam mỗi năm lớn cỡ nào tính theo doanh thu?",
    hyps:["Số hộ nuôi thú cưng thành thị là nền của ước lượng","Chỉ hộ có hành vi dùng thức ăn đóng gói mới tạo doanh thu",
          "Lượng ăn mỗi hộ mỗi năm quy ra khối lượng thị trường","Giá mỗi kilogram biến khối lượng thành tiền"],
    evidence:"Ex.1 và Ex.2: 5 triệu hộ nuôi × 40% dùng thức ăn đóng gói = 2.000.000 hộ; × 15 kg × 80.000đ = 2.400 tỷ đồng mỗi năm; phần cơm nhà 38% và kết hợp 22% nằm ngoài phạm vi nên giả thuyết lấy toàn bộ hộ thành thị bị bác bỏ. H1, H2, H3, H4 đều đúng. Ex.3 kiểm tra chéo: 4.500 điểm bán × 42 triệu × 12 tháng = 2.268 tỷ cho kênh cửa hàng, cộng 24% bán online thì tổng khoảng 2.400 tỷ, khớp với ước lượng. Giả định nhạy nhất là lượng ăn mỗi hộ: mỗi 3 kg đổi khoảng 480 tỷ, nên nêu độ nhạy kèm con số.",
    rec:"B"},
  mistakes:{
    logicLesson:"i-chart-1",
    calc:{label:"đường đi từ số hộ nuôi tới doanh thu", lesson:"i-profit-2",
      good:"5 triệu × 40% = 2.000.000 hộ → × 15 kg × 80.000đ = 2.400 tỷ/năm",
      why:"Giữ đơn vị qua từng bước để người phỏng vấn kiểm tra được từng tầng."},
    framework:{lesson:"i-profit-1",
      good:"Bốn tầng: hộ nuôi · tỷ lệ dùng thức ăn đóng gói · lượng ăn mỗi hộ · giá mỗi kilogram",
      why:"Tầng hành vi là chỗ hay bị bỏ, và cũng là chỗ làm sai lệch kết quả nhiều nhất."},
    exhibit:{lesson:"i-chart-1", bad:"Không kiểm tra chéo bằng doanh thu điểm bán và kênh online",
      good:"Ex.3: 4.500 điểm × 42 triệu × 12 = 2.268 tỷ, cộng 24% kênh online",
      why:"Hai đường tính độc lập cho kết quả gần nhau thì ước lượng mới đáng tin."}
  },
  goodFeedback:"Khoanh đúng tệp hộ nuôi, giữ đơn vị qua từng tầng và kiểm tra chéo bằng kênh phân phối."
});


/* ─────────── iv-26 · Product Launch · chuỗi cà phê ra dòng trà trái cây ─────────── */
R({
  id:"iv-26", title:"Product launch: chuỗi cà phê ra dòng trà trái cây",
  brief:{context:"Người phỏng vấn: \"Một chuỗi 300 cửa hàng cà phê định ra dòng trà trái cây để kéo khách trẻ. Bạn dẫn case: dòng này đáng làm không?\"",
         task:"tính phần lãi góp tăng thêm sau khi trừ ăn mòn và đề xuất cách triển khai."},
  labels:{problem:"1 · Nhắc lại đề bằng một câu", hyps:"2 · Cấu trúc bạn tự dẫn", evidence:"3 · Phân tích và con số"},
  exhibits:[
    {kind:"table", title:"Giả định dòng sản phẩm mới", unit:"mỗi cửa hàng mỗi ngày",
     head:["Chỉ tiêu","Giá trị","Ghi chú"],
     rows:[["Số ly bán hiện tại","250",""],["Tỷ trọng dự kiến của dòng trà","15%","tương đương 37,5 ly"],
           ["Giá mỗi ly trà","45.000đ",""],["Lãi góp mỗi ly trà","31.500đ","biên 70%"],["Lãi góp mỗi ly cà phê","28.000đ",""]]},
    {kind:"bars", title:"Nguồn khách của dòng trà (thử nghiệm 20 cửa hàng)", unit:"% số ly trà bán ra",
     headline:"Sáu trên mười ly là khách cũ đổi món", sub:"Thử nghiệm 6 tuần",
     rows:[["Khách mới hoặc lượt mua thêm",40,"var(--series-focus)"],["Khách cũ đổi từ cà phê",60,"var(--series-bad)"]],
     max:70, ticks:[0,17.5,35,52.5,70]},
    {kind:"metrics", title:"Ràng buộc triển khai",
     items:[["Số ngày bán mỗi năm","360",""],["Thời gian pha một ly trà","2,5 phút","cà phê 1,5 phút"],
            ["Giờ cao điểm chiếm tỷ trọng doanh số","46%",""]]}
  ],
  options:[
    ["A","Triển khai toàn bộ 300 cửa hàng và đưa trà vào mọi khung giờ","Trà pha lâu hơn cà phê một phút, đưa vào giờ cao điểm chiếm 46% doanh số sẽ kéo dài hàng chờ.",45],
    ["B","Triển khai toàn chuỗi nhưng giới hạn danh mục trà ở giờ cao điểm và đặt giá cao hơn cà phê để bù phần ăn mòn","Sau ăn mòn 60%, dòng trà vẫn thêm khoảng 59,5 tỷ lãi góp mỗi năm, nhưng chỉ giữ được nếu không làm chậm giờ cao điểm.",95],
    ["C","Không ra dòng trà vì 60% là ăn mòn","Phần ăn mòn vẫn đổi sang ly lãi góp cao hơn 3.500đ, nên tổng vẫn dương.",40],
    ["D","Thử nghiệm thêm một năm nữa trước khi quyết","Thử nghiệm 20 cửa hàng đã cho tỷ lệ nguồn khách; kéo dài thêm là mất mùa bán.",35]
  ],
  correct:"B",
  framing:[["trà trái cây","chuỗi cà phê"],["ra mắt","đáng làm","dòng sản phẩm"]],
  branches:[["lãi góp","giá","biên"],["sản lượng","số ly","tỷ trọng"],["ăn mòn","khách cũ đổi món"],["vận hành","giờ cao điểm","thời gian pha"]],
  numbers:[{v:59.5,tol:0.5,pts:30,core:true},{v:15,tol:0.5,pts:25},{v:3500,tol:50,pts:20},{v:60,tol:0.5,pts:15}],
  insight:[{kw:["ăn mòn","đổi món"],pts:40},{kw:["giờ cao điểm","thời gian pha"],pts:35},{kw:["giá cao hơn","bù"],pts:25}],
  unit:"tỷ|%|đ|ly",
  model:{
    problem:"Chuỗi cà phê có nên ra mắt dòng sản phẩm trà trái cây không, khi phần lớn ly trà bán ra là khách cũ đổi món?",
    hyps:["Lãi góp mỗi ly trà cao hơn ly cà phê","Sản lượng dòng trà đủ lớn để tạo khác biệt",
          "Phần lớn ly trà là ăn mòn từ cà phê chứ không phải lượt mua thêm","Thời gian pha lâu hơn có thể làm chậm giờ cao điểm"],
    evidence:"Ex.1 và Ex.2: mỗi cửa hàng bán 37,5 ly trà mỗi ngày, trong đó 40% là lượt mua thêm nên có 15 ly mới đóng góp 31.500đ mỗi ly, còn 60% là khách cũ đổi món chỉ đóng góp phần chênh 3.500đ so với cà phê. Tổng lãi góp thêm mỗi cửa hàng mỗi ngày là 15 × 31.500 + 22,5 × 3.500 = 551.250đ, nhân 300 cửa hàng và 360 ngày cho khoảng 59,5 tỷ mỗi năm. H1, H2, H3 đúng nên giả thuyết bỏ dòng trà vì ăn mòn bị bác bỏ. Ex.3: trà pha 2,5 phút so với cà phê 1,5 phút và giờ cao điểm chiếm 46% doanh số, H4 đúng — nên giới hạn danh mục trà ở giờ cao điểm và đặt giá cao hơn cà phê để bù.",
    rec:"B"},
  mistakes:{
    logicLesson:"i-profit-3",
    calc:{label:"lãi góp tăng thêm sau ăn mòn", lesson:"i-profit-2",
      good:"15 ly mới × 31.500đ + 22,5 ly đổi món × 3.500đ = 551.250đ/cửa hàng/ngày → × 300 × 360 ≈ 59,5 tỷ/năm",
      why:"Phần ăn mòn chỉ tính phần chênh lãi góp, không tính toàn bộ lãi góp của ly mới."},
    framework:{lesson:"i-entry-1",
      good:"Bốn nhánh: lãi góp mỗi ly · sản lượng dòng mới · ăn mòn · tác động vận hành giờ cao điểm",
      why:"Thêm dòng sản phẩm vào chuỗi luôn có chi phí vận hành ẩn ở khâu phục vụ."},
    exhibit:{lesson:"i-chart-1", bad:"Không tách nguồn khách của dòng trà thành mua thêm và đổi món",
      good:"Ex.2: 40% là lượt mua thêm, 60% là khách cũ đổi từ cà phê",
      why:"Không tách thì hoặc thổi phồng lợi ích, hoặc bỏ nhầm một dòng vẫn có lãi."}
  },
  goodFeedback:"Tính đúng phần chênh của ăn mòn và gắn khuyến nghị với ràng buộc vận hành giờ cao điểm."
});

/* ─────────── iv-27 · Profitability · chuỗi rửa xe nhượng quyền ─────────── */
R({
  id:"iv-27", title:"Profitability: chuỗi rửa xe nhượng quyền lãi mỏng",
  brief:{context:"Người phỏng vấn: \"Một chuỗi rửa xe nhượng quyền có 80 điểm nhưng công ty mẹ gần như không có lãi. Chủ tịch muốn biết mô hình hỏng ở đâu.\"",
         task:"dựng lợi nhuận của công ty mẹ từ phí nhượng quyền, tìm khoản ăn hết lãi và đề xuất cách sửa."},
  labels:{problem:"1 · Nhắc lại đề bằng một câu", hyps:"2 · Cấu trúc bạn nói với người phỏng vấn", evidence:"3 · Phân tích và con số"},
  exhibits:[
    {kind:"table", title:"Kinh tế công ty mẹ", unit:"mỗi năm",
     head:["Chỉ tiêu","Giá trị","Ghi chú"],
     rows:[["Số điểm nhượng quyền","80",""],["Doanh thu mỗi điểm","1,8 tỷ",""],["Phí nhượng quyền","8% doanh thu điểm",""],
           ["Chi phí hỗ trợ và giám sát","9 tỷ",""],["Số điểm đóng cửa mỗi năm","12",""],["Chi phí mở một điểm mới","220 triệu","đào tạo, khai trương, thiết lập"]]},
    {kind:"bars", title:"Doanh thu điểm theo tuổi", unit:"tỷ đồng/năm",
     headline:"Điểm mới mất hai năm mới đạt mức trung bình", sub:"Bình quân theo năm hoạt động",
     rows:[["Năm đầu",1.1,"var(--series-bad)"],["Năm hai",1.6,"var(--series-base)"],["Năm ba trở đi",2.1,"var(--series-focus)"]],
     max:2.4, ticks:[0,0.6,1.2,1.8,2.4]},
    {kind:"metrics", title:"Vòng đời điểm nhượng quyền",
     items:[["Tuổi trung bình điểm đang hoạt động","1,9 năm",""],["Tỷ lệ chủ nhượng quyền gia hạn sau 3 năm","41%",""],
            ["Lý do đóng cửa hàng đầu","lợi nhuận điểm thấp",""]]}
  ],
  options:[
    ["A","Mở thêm 30 điểm mới mỗi năm để tăng phí nhượng quyền","Mỗi điểm mới tốn 220 triệu và mất hai năm mới đạt doanh thu trung bình — càng mở nhanh càng mỏng lãi.",35],
    ["B","Dừng mở rộng một năm, dồn hỗ trợ để kéo doanh thu điểm năm đầu lên và nâng tỷ lệ gia hạn, vì mỗi điểm giữ được đáng giá hơn một điểm mở mới","Phí nhượng quyền 11,52 tỷ chỉ còn 2,52 tỷ sau chi phí hỗ trợ; 12 điểm đóng mỗi năm buộc mở bù tốn 2,64 tỷ, ăn gần hết phần lãi đó.",95],
    ["C","Tăng phí nhượng quyền lên 11%","Chủ điểm đang đóng cửa vì lợi nhuận thấp; tăng phí đẩy tỷ lệ đóng cửa lên tiếp.",30],
    ["D","Chuyển sang tự vận hành toàn bộ 80 điểm","Đổi hẳn mô hình vốn và rủi ro trong khi vấn đề nằm ở vòng đời điểm nhượng quyền.",40]
  ],
  correct:"B",
  framing:[["rửa xe","nhượng quyền"],["lợi nhuận","mỏng","công ty mẹ"]],
  branches:[["phí nhượng quyền","doanh thu điểm"],["chi phí hỗ trợ","giám sát"],["đóng cửa","gia hạn","vòng đời"],["mở mới","chi phí mở","tăng trưởng"]],
  numbers:[{v:11.52,tol:0.05,pts:30,core:true},{v:2.52,tol:0.05,pts:25},{v:2.64,tol:0.05,pts:20},{v:9,tol:0.1,pts:15}],
  insight:[{kw:["gia hạn","vòng đời"],pts:40},{kw:["điểm năm đầu","doanh thu điểm"],pts:35},{kw:["mở bù","đóng cửa"],pts:25}],
  unit:"tỷ|%|triệu",
  model:{
    problem:"Vì sao chuỗi rửa xe nhượng quyền 80 điểm gần như không có lãi ở công ty mẹ, và sửa mô hình ở đâu?",
    hyps:["Phí nhượng quyền thu được phụ thuộc doanh thu mỗi điểm","Chi phí hỗ trợ và giám sát ăn phần lớn phí thu được",
          "Số điểm đóng cửa mỗi năm buộc công ty mẹ chịu chi phí mở mới để bù","Doanh thu điểm năm đầu thấp kéo phí thu được xuống"],
    evidence:"Ex.1: 80 điểm × 1,8 tỷ × 8% = 11,52 tỷ phí nhượng quyền, trừ 9 tỷ chi phí hỗ trợ còn 2,52 tỷ; 12 điểm đóng mỗi năm buộc mở bù 12 × 220 triệu = 2,64 tỷ, tức ăn hết phần lãi đó. H1, H2, H3 đúng. Ex.2: điểm năm đầu chỉ đạt 1,1 tỷ so với 2,1 tỷ của điểm năm ba trở đi nên H4 đúng và giả thuyết cứ mở thêm điểm sẽ có lãi bị bác bỏ. Ex.3: tuổi trung bình điểm chỉ 1,9 năm và chỉ 41% chủ điểm gia hạn sau ba năm — nên dừng mở rộng một năm, dồn hỗ trợ kéo doanh thu điểm năm đầu lên và nâng tỷ lệ gia hạn.",
    rec:"B"},
  mistakes:{
    logicLesson:"i-profit-3",
    calc:{label:"lãi còn lại của công ty mẹ sau chi phí mở bù", lesson:"i-profit-2",
      good:"80 × 1,8 × 8% = 11,52 tỷ − 9 tỷ = 2,52 tỷ; mở bù 12 × 220 triệu = 2,64 tỷ",
      why:"Chi phí mở bù cho các điểm đóng cửa phải nằm trong kinh tế thường xuyên, không phải khoản một lần."},
    framework:{lesson:"i-profit-1",
      good:"Bốn nhánh: phí nhượng quyền theo doanh thu điểm · chi phí hỗ trợ · đóng cửa và gia hạn · chi phí mở mới",
      why:"Mô hình nhượng quyền sống bằng vòng đời điểm, không bằng số điểm tại một thời điểm."},
    exhibit:{lesson:"i-chart-1", bad:"Không nối doanh thu điểm năm đầu với tuổi trung bình của mạng lưới",
      good:"Ex.2: năm đầu 1,1 tỷ so với 2,1 tỷ từ năm ba; Ex.3: tuổi trung bình chỉ 1,9 năm",
      why:"Mạng lưới toàn điểm non thì doanh thu bình quân và phí thu được luôn thấp."}
  },
  goodFeedback:"Đưa chi phí mở bù vào kinh tế thường xuyên và chuyển trọng tâm từ mở mới sang giữ điểm."
});

/* ─────────── iv-28 · Market Entry · mỹ phẩm vào kênh nhà thuốc ─────────── */
R({
  id:"iv-28", title:"Market entry: hãng mỹ phẩm vào kênh nhà thuốc",
  brief:{context:"Người phỏng vấn: \"Một hãng mỹ phẩm dược muốn vào kênh nhà thuốc Việt Nam thay vì chỉ bán online. Bạn dẫn case: kênh này có đáng không?\"",
         task:"ước lượng doanh thu kênh, trừ chiết khấu và chi phí đội bán hàng, rồi đề xuất cách phủ."},
  labels:{problem:"1 · Nhắc lại đề bằng một câu", hyps:"2 · Cấu trúc bạn tự dẫn", evidence:"3 · Phân tích và con số"},
  exhibits:[
    {kind:"table", title:"Giả định kênh nhà thuốc", unit:"",
     head:["Giả định","Giá trị","Ghi chú"],
     rows:[["Tổng số nhà thuốc","20.000",""],["Số nhà thuốc dự kiến phủ","3.000","nhóm doanh thu cao nhất"],
           ["Doanh thu mỗi nhà thuốc","2 triệu/tháng",""],["Chiết khấu kênh","35%","gồm phân phối và nhà thuốc"],
           ["Đội bán hàng cần có","60 người","300 triệu mỗi người mỗi năm"]]},
    {kind:"bars", title:"Doanh thu mỹ phẩm dược theo nhóm nhà thuốc", unit:"triệu đồng/tháng",
     headline:"Nhóm dẫn đầu bán gấp năm lần nhóm đuôi", sub:"Khảo sát 400 nhà thuốc",
     rows:[["Nhóm 3.000 dẫn đầu",2,"var(--series-focus)"],["Nhóm giữa",0.9,"var(--series-base)"],["Nhóm đuôi",0.4,"var(--series-base)"]],
     max:2.5, ticks:[0,0.6,1.2,1.8,2.4]},
    {kind:"metrics", title:"So sánh với kênh online hiện tại",
     items:[["Doanh thu online hiện tại","95 tỷ/năm",""],["Chi phí quảng cáo online trên doanh thu","28%",""],
            ["Tỷ lệ khách mua lại — kênh nhà thuốc","cao hơn","có tư vấn dược sĩ"]]}
  ],
  options:[
    ["A","Phủ toàn bộ 20.000 nhà thuốc ngay","Nhóm đuôi chỉ bán 0,4 triệu mỗi tháng, không đỡ nổi chi phí viếng thăm của đội bán hàng.",30],
    ["B","Phủ 3.000 nhà thuốc nhóm dẫn đầu với đội 60 người, đo doanh thu mỗi nhà thuốc sau 6 tháng rồi mới mở rộng nhóm giữa","72 tỷ doanh thu kênh, còn 46,8 tỷ sau chiết khấu, trừ 18 tỷ chi phí đội bán hàng vẫn dương và bổ sung tệp khách mua lại cho kênh online.",95],
    ["C","Chỉ giữ kênh online","Chi phí quảng cáo online đã chiếm 28% doanh thu và đang tăng — kênh nhà thuốc mở thêm điểm tiếp xúc rẻ hơn về dài hạn.",45],
    ["D","Bán qua một nhà phân phối độc quyền toàn quốc","Mất kiểm soát trưng bày và tư vấn dược sĩ, vốn là lý do kênh này hiệu quả.",40]
  ],
  correct:"B",
  framing:[["mỹ phẩm","nhà thuốc"],["kênh","vào","có đáng"]],
  branches:[["số nhà thuốc","độ phủ"],["doanh thu mỗi nhà thuốc","sản lượng"],["chiết khấu","biên","phân phối"],["đội bán hàng","chi phí","viếng thăm"]],
  numbers:[{v:72,tol:0.5,pts:30,core:true},{v:46.8,tol:0.1,pts:25},{v:18,tol:0.1,pts:20},{v:3000,tol:5,pts:15}],
  insight:[{kw:["nhóm dẫn đầu","nhóm đuôi"],pts:40},{kw:["dược sĩ","mua lại"],pts:35},{kw:["mở rộng theo đợt","đo doanh thu"],pts:25}],
  unit:"tỷ|%|triệu",
  model:{
    problem:"Hãng mỹ phẩm dược có nên vào kênh nhà thuốc bên cạnh kênh online không, và nên phủ bao nhiêu nhà thuốc?",
    hyps:["Số nhà thuốc phủ được quyết định quy mô doanh thu kênh","Doanh thu mỗi nhà thuốc chênh lệch mạnh theo nhóm",
          "Chiết khấu kênh ăn một phần lớn doanh thu niêm yết","Chi phí đội bán hàng quyết định độ phủ hợp lý"],
    evidence:"Ex.1: 3.000 nhà thuốc × 2 triệu × 12 = 72 tỷ doanh thu kênh, sau chiết khấu 35% còn 46,8 tỷ về hãng, trừ 60 người × 300 triệu = 18 tỷ chi phí đội bán hàng vẫn còn 28,8 tỷ. H1, H3, H4 đúng. Ex.2: nhóm dẫn đầu bán 2 triệu mỗi tháng trong khi nhóm đuôi chỉ 0,4 triệu nên H2 đúng và giả thuyết phủ toàn bộ 20.000 nhà thuốc bị bác bỏ. Ex.3: kênh online đã tốn 28% doanh thu cho quảng cáo, còn nhà thuốc có tư vấn dược sĩ nên tỷ lệ mua lại cao hơn — nên phủ 3.000 nhà thuốc nhóm dẫn đầu, đo doanh thu mỗi nhà thuốc sau 6 tháng rồi mở rộng theo đợt sang nhóm giữa.",
    rec:"B"},
  mistakes:{
    logicLesson:"i-entry-3",
    calc:{label:"doanh thu kênh sau chiết khấu và chi phí đội bán hàng", lesson:"i-entry-1",
      good:"3.000 × 2 triệu × 12 = 72 tỷ → sau chiết khấu 35% còn 46,8 tỷ → trừ 60 × 300 triệu = 18 tỷ",
      why:"Doanh thu kênh phải trừ chiết khấu và chi phí phục vụ kênh mới so được với kênh hiện tại."},
    framework:{lesson:"i-entry-2",
      good:"Bốn nhánh: độ phủ · doanh thu mỗi điểm bán · chiết khấu kênh · chi phí đội bán hàng",
      why:"Case mở kênh luôn phải có nhánh chi phí phục vụ kênh, không chỉ doanh thu."},
    exhibit:{lesson:"f-moat-3", bad:"Không tách nhà thuốc theo nhóm doanh thu để chọn độ phủ",
      good:"Ex.2: nhóm dẫn đầu 2 triệu/tháng so với nhóm đuôi 0,4 triệu",
      why:"Độ phủ tối ưu nằm ở nhóm mà doanh thu còn đỡ được chi phí viếng thăm."}
  },
  goodFeedback:"Trừ đủ chiết khấu và chi phí kênh, chọn độ phủ theo nhóm và mở rộng theo dữ liệu thật."
});

/* ─────────── iv-29 · Growth · chuỗi nha khoa nâng công suất ghế ─────────── */
R({
  id:"iv-29", title:"Growth: chuỗi nha khoa muốn tăng trưởng không mở thêm cơ sở",
  brief:{context:"Người phỏng vấn: \"Một chuỗi 12 phòng khám nha khoa muốn tăng doanh thu 20% mà không mở thêm cơ sở. Giám đốc hỏi có làm được không.\"",
         task:"tìm dư địa công suất ghế, lượng hoá phần doanh thu tăng thêm và nêu điều kiện thực hiện."},
  labels:{problem:"1 · Nhắc lại đề bằng một câu", hyps:"2 · Cấu trúc bạn nói với người phỏng vấn", evidence:"3 · Phân tích và con số"},
  exhibits:[
    {kind:"table", title:"Chuỗi hiện tại", unit:"",
     head:["Chỉ tiêu","Giá trị","Ghi chú"],
     rows:[["Số phòng khám","12",""],["Doanh thu mỗi phòng khám","8 tỷ/năm",""],["Số ghế mỗi phòng khám","4",""],
           ["Công suất ghế hiện tại","55%",""],["Công suất ghế mục tiêu","70%","mức các phòng khám tốt nhất chuỗi"]]},
    {kind:"bars", title:"Công suất ghế theo khung giờ", unit:"% thời gian ghế có bệnh nhân",
     headline:"Khung giờ hành chính gần như trống một nửa", sub:"Trung bình toàn chuỗi",
     rows:[["8–11 giờ",38,"var(--series-bad)"],["11–14 giờ",42,"var(--series-bad)"],["14–17 giờ",61,"var(--series-base)"],["17–20 giờ",84,"var(--series-focus)"]],
     max:90, ticks:[0,22.5,45,67.5,90]},
    {kind:"metrics", title:"Ràng buộc",
     items:[["Bác sĩ làm cả ngày","có","không thể tăng số ca nếu không lấp giờ trống"],
            ["Tỷ lệ bệnh nhân hẹn lại đúng lịch","62%",""],["Tỷ lệ huỷ hẹn trong 24 giờ","19%",""]]}
  ],
  options:[
    ["A","Mở thêm 3 phòng khám mới","Đi ngược yêu cầu không mở cơ sở, trong khi ghế hiện có còn trống gần một nửa khung giờ hành chính.",30],
    ["B","Lấp giờ hành chính bằng giá ưu đãi khung giờ cho nhóm linh hoạt, đồng thời cắt huỷ hẹn bằng nhắc lịch và đặt cọc nhỏ, đưa công suất ghế từ 55% lên 70%","Nâng công suất ghế lên 70% cho thêm khoảng 26,2 tỷ doanh thu, đủ vượt mục tiêu 20% mà không cần cơ sở mới.",95],
    ["C","Tăng giá dịch vụ 20%","Đạt doanh thu trên giấy nhưng đẩy bệnh nhân sang nơi khác khi ghế đã trống sẵn.",35],
    ["D","Tuyển thêm bác sĩ cho khung giờ tối","Giờ tối đã đạt 84% công suất — thêm bác sĩ ở đó không có ghế trống để dùng.",40]
  ],
  correct:"B",
  framing:[["nha khoa","phòng khám"],["tăng trưởng","doanh thu","không mở thêm"]],
  branches:[["công suất ghế","giờ trống"],["doanh thu","mỗi phòng khám"],["khung giờ","lấp giờ hành chính"],["huỷ hẹn","hẹn lại","quy trình"]],
  numbers:[{v:26.2,tol:0.2,pts:30,core:true},{v:2.18,tol:0.02,pts:25},{v:70,tol:0.5,pts:20},{v:55,tol:0.5,pts:15}],
  insight:[{kw:["khung giờ","giờ hành chính"],pts:40},{kw:["huỷ hẹn","nhắc lịch"],pts:35},{kw:["giá ưu đãi","nhóm linh hoạt"],pts:25}],
  unit:"tỷ|%",
  model:{
    problem:"Chuỗi nha khoa có thể tăng doanh thu 20% mà không mở thêm phòng khám không, và bằng đòn bẩy nào?",
    hyps:["Công suất ghế hiện tại còn dư địa so với mức tốt nhất chuỗi","Doanh thu mỗi phòng khám tăng tỷ lệ với công suất ghế",
          "Giờ trống tập trung ở một số khung giờ cụ thể","Huỷ hẹn và hẹn lại không đúng lịch làm mất công suất"],
    evidence:"Ex.1: nâng công suất ghế từ 55% lên 70% làm doanh thu mỗi phòng khám tăng 8 × (70 ÷ 55 − 1) = 2,18 tỷ, nhân 12 phòng khám cho khoảng 26,2 tỷ, tức hơn 27% doanh thu hiện tại nên vượt mục tiêu 20%. H1, H2 đúng. Ex.2: khung 8–11 giờ chỉ 38% và 11–14 giờ 42% trong khi khung tối đã 84%, nên H3 đúng và giả thuyết cần thêm bác sĩ giờ tối bị bác bỏ. Ex.3: 19% huỷ hẹn trong 24 giờ và chỉ 62% hẹn lại đúng lịch nên H4 đúng — lấp giờ hành chính bằng giá ưu đãi khung giờ cho nhóm linh hoạt, cắt huỷ hẹn bằng nhắc lịch và đặt cọc nhỏ.",
    rec:"B"},
  mistakes:{
    logicLesson:"i-profit-3",
    calc:{label:"doanh thu tăng thêm khi nâng công suất ghế", lesson:"i-profit-2",
      good:"8 tỷ × (70 ÷ 55 − 1) = 2,18 tỷ mỗi phòng khám × 12 = 26,2 tỷ, tương đương hơn 27%",
      why:"Tăng trưởng từ công suất phải quy ra tiền rồi so với mục tiêu, không dừng ở phần trăm công suất."},
    framework:{lesson:"i-profit-1",
      good:"Bốn nhánh: công suất ghế · doanh thu mỗi phòng khám · phân bố theo khung giờ · tổn thất do huỷ hẹn",
      why:"Dịch vụ theo lịch hẹn luôn có hai nguồn mất công suất: giờ trống và huỷ hẹn."},
    exhibit:{lesson:"i-chart-1", bad:"Không tách công suất theo khung giờ trước khi đề xuất",
      good:"Ex.2: 8–11 giờ chỉ 38% trong khi 17–20 giờ đã 84%",
      why:"Công suất trung bình 55% giấu mất chỗ thật sự còn trống."}
  },
  goodFeedback:"Quy dư địa công suất thành tiền, tách theo khung giờ và xử lý cả phần mất do huỷ hẹn."
});

/* ─────────── iv-30 · Operations · siêu thị hao hụt hàng tươi ─────────── */
R({
  id:"iv-30", title:"Operations: chuỗi siêu thị hao hụt hàng tươi",
  brief:{context:"Người phỏng vấn: \"Một chuỗi siêu thị thấy ngành hàng tươi sống luôn lỗ dù bán chạy. Giám đốc ngành hàng muốn biết mất tiền ở đâu.\"",
         task:"lượng hoá hao hụt hàng tươi, tìm nguyên nhân đặt hàng và đề xuất cách giảm."},
  labels:{problem:"1 · Nhắc lại đề bằng một câu", hyps:"2 · Cấu trúc bạn nói với người phỏng vấn", evidence:"3 · Phân tích và con số"},
  exhibits:[
    {kind:"table", title:"Ngành hàng tươi sống", unit:"mỗi năm",
     head:["Chỉ tiêu","Giá trị","Ghi chú"],
     rows:[["Doanh thu hàng tươi","1.200 tỷ",""],["Giá vốn trên doanh thu","75%",""],["Giá vốn hàng tươi","900 tỷ",""],
           ["Tỷ lệ hao hụt trên giá vốn","9%",""],["Mức hao hụt của chuỗi tốt nhất khu vực","5%",""]]},
    {kind:"bars", title:"Hao hụt theo nhóm hàng", unit:"% giá vốn nhóm",
     headline:"Rau lá và thuỷ sản chiếm phần lớn hao hụt", sub:"Năm gần nhất",
     rows:[["Rau lá",15,"var(--series-bad)"],["Thuỷ sản",12,"var(--series-bad)"],["Thịt",6,"var(--series-base)"],["Trái cây",5,"var(--series-base)"]],
     max:16, ticks:[0,4,8,12,16]},
    {kind:"metrics", title:"Cách đặt hàng hiện nay",
     items:[["Tần suất đặt hàng rau lá","2 lần/tuần",""],["Dự báo đặt hàng","theo tuần trước",""],
            ["Tỷ lệ hết hàng trước 18 giờ","23%","cửa hàng đặt dư để tránh hết hàng"]]}
  ],
  options:[
    ["A","Giảm 30% lượng đặt hàng tươi toàn chuỗi","Cắt thẳng lượng đặt làm tỷ lệ hết hàng trước 18 giờ tăng tiếp, mất doanh thu và mất khách đi chợ chiều.",35],
    ["B","Chuyển rau lá và thuỷ sản sang đặt hàng hằng ngày theo dự báo từng cửa hàng, kèm giảm giá cuối ngày có quy tắc, đặt mục tiêu hao hụt 5%","Hai nhóm này là phần lớn trong 81 tỷ hao hụt; đưa hao hụt về mức tốt nhất khu vực tiết kiệm khoảng 36 tỷ mỗi năm mà không làm tăng tỷ lệ hết hàng.",95],
    ["C","Đổi sang nhà cung cấp rẻ hơn","Giá vốn thấp hơn không sửa việc hàng hỏng vì đặt sai lượng và đặt quá thưa.",40],
    ["D","Bỏ ngành hàng tươi sống","Hàng tươi là lý do khách đến siêu thị hằng tuần — bỏ là mất lưu lượng cho cả các ngành hàng khác.",25]
  ],
  correct:"B",
  framing:[["hàng tươi","siêu thị"],["hao hụt","lỗ","mất tiền"]],
  branches:[["doanh thu","giá vốn"],["hao hụt","tỷ lệ hỏng"],["nhóm hàng","rau lá","thuỷ sản"],["đặt hàng","dự báo","tần suất"]],
  numbers:[{v:81,tol:0.5,pts:30,core:true},{v:36,tol:0.5,pts:25},{v:900,tol:1,pts:20},{v:9,tol:0.1,pts:15}],
  insight:[{kw:["rau lá","thuỷ sản"],pts:40},{kw:["đặt hàng hằng ngày","tần suất"],pts:35},{kw:["hết hàng","giảm giá cuối ngày"],pts:25}],
  unit:"tỷ|%",
  model:{
    problem:"Ngành hàng tươi sống của chuỗi siêu thị đang mất bao nhiêu tiền vì hao hụt, và giảm hao hụt bằng cách nào?",
    hyps:["Giá vốn hàng tươi là nền để tính hao hụt","Tỷ lệ hao hụt cao hơn mức tốt nhất khu vực",
          "Hao hụt tập trung ở một vài nhóm hàng chứ không dàn đều","Cách đặt hàng theo tuần trước tạo ra cả hao hụt lẫn hết hàng"],
    evidence:"Ex.1: giá vốn hàng tươi 1.200 × 75% = 900 tỷ, hao hụt 9% là 81 tỷ mỗi năm; đưa về mức 5% của chuỗi tốt nhất khu vực tiết kiệm 36 tỷ. H1, H2 đúng. Ex.2: rau lá 15% và thuỷ sản 12% cao hơn hẳn thịt 6% và trái cây 5% nên H3 đúng và giả thuyết cắt đều lượng đặt toàn ngành hàng bị bác bỏ. Ex.3: rau lá chỉ đặt 2 lần mỗi tuần theo dự báo từ tuần trước, trong khi 23% cửa hàng hết hàng trước 18 giờ nên cửa hàng đặt dư để phòng — H4 đúng, phải chuyển rau lá và thuỷ sản sang đặt hàng hằng ngày theo dự báo từng cửa hàng kèm giảm giá cuối ngày có quy tắc.",
    rec:"B"},
  mistakes:{
    logicLesson:"i-profit-3",
    calc:{label:"tiền hao hụt mỗi năm và phần tiết kiệm được", lesson:"i-profit-2",
      good:"Giá vốn 1.200 × 75% = 900 tỷ; hao hụt 9% = 81 tỷ; về 5% tiết kiệm (9% − 5%) × 900 = 36 tỷ",
      why:"Hao hụt phải tính trên giá vốn, không tính trên doanh thu — nhầm chỗ này là sai một phần tư."},
    framework:{lesson:"i-profit-1",
      good:"Bốn nhánh: doanh thu và giá vốn · tỷ lệ hao hụt · hao hụt theo nhóm hàng · quy trình đặt hàng",
      why:"Hao hụt là kết quả của cách đặt hàng, nên nhánh quy trình phải có mặt."},
    exhibit:{lesson:"i-chart-1", bad:"Không tách hao hụt theo nhóm hàng trước khi đề xuất",
      good:"Ex.2: rau lá 15% và thuỷ sản 12% so với thịt 6% và trái cây 5%",
      why:"Tỷ lệ chung 9% giấu mất hai nhóm đang tạo ra phần lớn tổn thất."}
  },
  goodFeedback:"Tính hao hụt trên giá vốn, khoanh đúng nhóm hàng và sửa ở tần suất đặt hàng thay vì cắt lượng."
});

})(window.SCORING.register);
