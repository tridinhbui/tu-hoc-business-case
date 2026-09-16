/* ===== ĐỀ ARENA · đợt 5: iv-01 · iv-02 (case phỏng vấn) =====
   Số liệu minh hoạ để luyện tập. Đáp án tính lại trong tests/scoring.test.js. */
(function(R){

/* ─────────── iv-01 · Profitability · nhà máy nhựa ─────────── */
R({
  id:"iv-01", title:"Profitability: nhà máy nhựa mất lợi nhuận",
  brief:{context:"Người phỏng vấn: \"Khách hàng là một nhà máy bao bì nhựa. Doanh thu năm nay tăng 5% nhưng lợi nhuận giảm mạnh. CEO muốn biết vì sao và nên làm gì.\" Sau khi bạn hỏi làm rõ, người phỏng vấn đưa ba exhibit.",
         task:"xác định nguyên nhân lợi nhuận giảm, lượng hoá nó, và đưa khuyến nghị như đang trả lời người phỏng vấn."},
  labels:{problem:"1 · Nhắc lại đề bằng một câu", hyps:"2 · Cấu trúc bạn nói với người phỏng vấn", evidence:"3 · Phân tích và con số"},
  exhibits:[
    {kind:"table", title:"Kết quả kinh doanh", unit:"tỷ VND/năm",
     head:["Chỉ tiêu","Năm trước","Năm nay"],
     rows:[["Sản lượng (tấn)","50.000","50.000"],["Doanh thu","1.000","1.050"],["Chi phí hạt nhựa","600","720"],
           ["Chi phí khác (nhân công, năng lượng, khấu hao)","300","300"]]},
    {kind:"bars", title:"Biến động giá trong năm", unit:"% so với năm trước",
     headline:"Giá nguyên liệu tăng gấp bốn lần giá bán", sub:"Chỉ số giá bình quân năm",
     rows:[["Giá hạt nhựa",20,"var(--series-bad)"],["Giá bán của nhà máy",5,"var(--series-focus)"],["Giá bán của đối thủ lớn nhất",10,"var(--series-base)"]],
     max:25, ticks:[0,5,10,15,20,25]},
    {kind:"metrics", title:"Hợp đồng khách hàng",
     items:[["Doanh thu từ hợp đồng cố định giá","70%","ký cố định giá cả năm"],["Doanh thu điều chỉnh giá được","30%",""],
            ["Điều khoản điều chỉnh theo giá nguyên liệu","chưa có",""]]}
  ],
  options:[
    ["A","Cắt 20% nhân công sản xuất","Chi phí khác không đổi — không phải nguyên nhân. Cắt người làm giảm năng lực trong khi sản lượng giữ nguyên.",35],
    ["B","Đưa điều khoản điều chỉnh giá theo giá hạt nhựa vào hợp đồng khi gia hạn, tăng giá ngay phần 30% doanh thu không cố định, và phòng ngừa giá nguyên liệu","Đánh đúng gốc: chi phí hạt nhựa tăng 120 tỷ mà hợp đồng cố định giá không cho chuyển sang khách.",95],
    ["C","Giảm sản lượng để giảm chi phí nguyên liệu","Mất cả doanh thu lẫn lãi góp; biên mỗi tấn vẫn dương.",25],
    ["D","Chuyển sang hạt nhựa tái chế giá rẻ chưa kiểm định","Rủi ro chất lượng với khách hàng lớn — có thể mất chính hợp đồng chiếm 70% doanh thu.",40]
  ],
  correct:"B",
  framing:[["lợi nhuận"],["giảm","mất","70%"]],
  branches:[["doanh thu","giá bán"],["nguyên liệu","hạt nhựa"],["chi phí khác","nhân công","sản lượng"]],
  numbers:[{v:70,tol:0.5,pts:30,core:true},{v:120,tol:0.5,pts:20},{v:12,tol:0.1,pts:25},{v:30,tol:0.3,pts:15}],
  insight:[{kw:["hợp đồng","cố định giá"],pts:40},{kw:["chuyển chi phí","điều chỉnh giá"],pts:35},{kw:["đối thủ"],pts:25}],
  unit:"tỷ|%",
  model:{
    problem:"Lợi nhuận nhà máy nhựa giảm 70% trong một năm dù doanh thu tăng — cần tìm nguyên nhân và cách khôi phục.",
    hyps:["Giá bán tăng chậm hơn giá nguyên liệu hạt nhựa","Chi phí khác như nhân công tăng","Sản lượng giảm làm doanh thu giảm",""],
    evidence:"Ex.1: lợi nhuận 1.000 − 600 − 300 = 100 tỷ xuống 1.050 − 720 − 300 = 30 tỷ, giảm 70 tỷ. Hạt nhựa tăng 20% làm chi phí thêm 120 tỷ trong khi giá bán chỉ tăng 5% mang về 50 tỷ. Chi phí khác không đổi và sản lượng giữ 50.000 tấn. Muốn giữ 100 tỷ lợi nhuận cần doanh thu 1.120 tỷ, tức tăng giá 12%. Ex.3: 70% doanh thu nằm trong hợp đồng cố định giá cả năm nên không chuyển chi phí sang khách được; Ex.2: đối thủ đã tăng giá 10% nên có dư địa điều chỉnh giá. H1 đúng; H2 và H3 bị bác bỏ.",
    rec:"B"},
  mistakes:{
    logicLesson:"i-profit-3",
    calc:{label:"mức giảm lợi nhuận và mức tăng giá cần thiết", lesson:"i-profit-2",
      good:"Lợi nhuận 100 → 30 tỷ (−70); hạt nhựa +120 tỷ, giá bán +50 tỷ; giữ 100 tỷ cần doanh thu 1.120 tỷ = tăng giá 12%",
      why:"Trong phỏng vấn, nói ra con số của từng nhánh trước khi kết luận nhánh nào là nguyên nhân."},
    framework:{lesson:"i-profit-1",
      good:"Cây lợi nhuận: doanh thu (giá × sản lượng) · chi phí nguyên liệu · chi phí khác",
      why:"Nhà máy sản xuất: nguyên liệu thường là khoản chi lớn nhất — phải là một nhánh riêng."},
    exhibit:{lesson:"i-chart-1", bad:"Không chỉ ra hợp đồng cố định giá chặn việc chuyển chi phí sang khách",
      good:"Ex.3: 70% doanh thu cố định giá cả năm; Ex.2: đối thủ đã tăng giá 10%",
      why:"Exhibit hợp đồng giải thích vì sao giá bán không theo kịp — và cho khuyến nghị cụ thể."}
  },
  goodFeedback:"Mở đầu gọn, lượng hoá từng nhánh trước khi kết luận, và khuyến nghị gắn đúng với ràng buộc hợp đồng."
});

/* ─────────── iv-02 · Market Entry · chuỗi cà phê vào Philippines ─────────── */
R({
  id:"iv-02", title:"Market entry: chuỗi cà phê vào Philippines",
  brief:{context:"Người phỏng vấn: \"Một chuỗi cà phê Việt Nam muốn vào Philippines, bắt đầu từ Manila, với kế hoạch 50 cửa hàng tự vận hành. Bạn dẫn case — tôi sẽ đưa dữ liệu khi bạn hỏi.\"",
         task:"tự dẫn case theo ba tầng thị trường, kinh tế, năng lực; lượng hoá và đưa khuyến nghị có cách vào thị trường."},
  labels:{problem:"1 · Nhắc lại đề bằng một câu", hyps:"2 · Cấu trúc bạn tự dẫn", evidence:"3 · Phân tích và con số"},
  exhibits:[
    {kind:"table", title:"Giả định thị trường Manila", unit:"",
     head:["Giả định","Giá trị","Ghi chú"],
     rows:[["Dân số đô thị","14 triệu",""],["Người uống cà phê ở quán ≥ 1 lần/tuần","20%",""],
           ["Số ly mỗi tuần","2",""],["Giá trung bình mỗi ly","50.000đ","≈ 120 peso"]]},
    {kind:"bars", title:"Thị phần chuỗi cà phê tại Manila", unit:"%",
     headline:"Ba chuỗi lớn chiếm 75% thị trường", sub:"Theo doanh thu",
     rows:[["Starbucks",35,"var(--series-base)"],["Chuỗi địa phương A",25,"var(--series-base)"],["Chuỗi địa phương B",15,"var(--series-base)"],["Quán độc lập",25,"var(--series-focus)"]],
     max:40, ticks:[0,10,20,30,40]},
    {kind:"metrics", title:"Kinh tế một cửa hàng dự kiến",
     items:[["Vốn mỗi cửa hàng","8 tỷ",""],["Số ly mỗi ngày","400",""],["Ngày mở cửa","360/năm",""],["Biên EBITDA cửa hàng","18%",""]]}
  ],
  options:[
    ["A","Vào ngay với 50 cửa hàng tự vận hành","400 tỷ vốn cho cửa hàng hoàn vốn hơn 6 năm, mà chỉ đạt 2,5% thị phần trước ba chuỗi lớn.",35],
    ["B","Thí điểm 10 cửa hàng cùng đối tác địa phương (liên doanh hoặc nhượng quyền), đo doanh số mỗi cửa hàng và chỉ mở rộng khi vượt ngưỡng","Thị trường đủ lớn nhưng hoàn vốn dài và cạnh tranh mạnh — giảm vốn rủi ro và mượn năng lực địa phương.",95],
    ["C","Mua lại chuỗi địa phương B","Vào nhanh nhưng chưa có dữ liệu định giá; đặt cược lớn khi chưa kiểm chứng sản phẩm hợp khẩu vị địa phương.",45],
    ["D","Không vào vì Starbucks quá mạnh","Thị trường 14.560 tỷ/năm với 25% từ quán độc lập vẫn còn chỗ cho một chuỗi mới.",40]
  ],
  correct:"B",
  framing:[["philippines","manila","vào thị trường"],["có nên","cách vào","hoàn vốn"]],
  branches:[["thị trường","quy mô"],["cạnh tranh","đối thủ","starbucks"],["kinh tế cửa hàng","hoàn vốn","ebitda"],["cách vào","liên doanh","nhượng quyền"]],
  numbers:[{v:6.2,tol:0.05,pts:30,core:true},{v:14560,tol:10,pts:25},{v:2.5,tol:0.05,pts:20},{v:1.296,tol:0.01,pts:15}],
  insight:[{kw:["rủi ro vốn","hoàn vốn dài"],pts:40},{kw:["đối tác địa phương","liên doanh","nhượng quyền"],pts:35},{kw:["thí điểm","thử nghiệm"],pts:25}],
  unit:"tỷ|%|năm",
  model:{
    problem:"Chuỗi cà phê có nên vào Philippines, và vào theo cách nào để không chôn vốn khi hoàn vốn cửa hàng dài?",
    hyps:["Thị trường cà phê Manila đủ lớn","Cạnh tranh với Starbucks và chuỗi địa phương gay gắt","Kinh tế cửa hàng hoàn vốn quá dài để tự mở","Cách vào nên qua đối tác địa phương"],
    evidence:"Ex.1: 14 triệu × 20% × 2 ly × 52 tuần × 50.000đ = 14.560 tỷ đồng/năm — đủ lớn. Ex.2: Starbucks 35% và hai chuỗi địa phương 40% đã chiếm phần lớn. Ex.3: mỗi cửa hàng doanh thu 7,2 tỷ, EBITDA 18% = 1,296 tỷ, vốn 8 tỷ → hoàn vốn khoảng 6,2 năm; 50 cửa hàng chỉ đạt 2,5% thị phần. H1, H2, H3 đều đúng nên tự mở 50 cửa hàng là rủi ro vốn lớn. Nên thí điểm 10 cửa hàng cùng đối tác địa phương theo liên doanh hoặc nhượng quyền, mở rộng khi doanh số vượt ngưỡng.",
    rec:"B"},
  mistakes:{
    logicLesson:"i-entry-3",
    calc:{label:"thời gian hoàn vốn một cửa hàng", lesson:"i-entry-1",
      good:"Doanh thu 400 × 50.000đ × 360 = 7,2 tỷ; EBITDA 18% = 1,296 tỷ; hoàn vốn 8 ÷ 1,296 ≈ 6,2 năm; 50 cửa hàng ≈ 2,5% của 14.560 tỷ",
      why:"Tầng kinh tế của case thâm nhập phải có một con số hoàn vốn — thiếu nó thì \"thị trường lớn\" không đủ để quyết định."},
    framework:{lesson:"i-entry-2",
      good:"Bốn nhánh: quy mô thị trường · cạnh tranh · kinh tế cửa hàng · cách vào (tự mở, liên doanh, nhượng quyền, mua lại)",
      why:"Case do ứng viên tự dẫn: người phỏng vấn chấm việc bạn tự đặt đủ nhánh và đi theo thứ tự."},
    exhibit:{lesson:"f-moat-3", bad:"Không kết hợp hoàn vốn dài với thị phần nhỏ để chọn cách vào",
      good:"Ex.3: hoàn vốn 6,2 năm; Ex.2: ba chuỗi chiếm 75% — cần đối tác địa phương và thí điểm trước",
      why:"Khuyến nghị cách vào phải xuất phát từ rủi ro vốn và vị thế cạnh tranh, không chỉ từ quy mô thị trường."}
  },
  goodFeedback:"Tự dẫn case đủ bốn nhánh theo thứ tự, lượng hoá quy mô và hoàn vốn, và biến rủi ro thành một cách vào thị trường cụ thể."
});

})(window.SCORING.register);
