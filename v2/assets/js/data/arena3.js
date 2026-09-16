/* ===== ĐỀ ARENA · đợt 3: cl-09 · cl-10 · cl-12 =====
   Số liệu minh hoạ để luyện tập. Đáp án tính lại trong tests/scoring.test.js. */
(function(R){

/* ─────────── cl-09 · Growth · SaaS ─────────── */
R({
  id:"cl-09", title:"SaaS tăng trưởng 40% nhưng đốt tiền",
  brief:{context:"Công ty phần mềm quản trị doanh nghiệp tăng ARR (doanh thu định kỳ năm) 40%, nhưng dòng tiền âm nặng hơn năm trước. Hội đồng quản trị muốn tăng gấp đôi ngân sách bán hàng để giữ đà tăng trưởng.",
         task:"đánh giá chất lượng tăng trưởng, lượng hoá hiệu quả chi tiêu bán hàng và thời gian còn lại trước khi cạn tiền, rồi đưa khuyến nghị."},
  exhibits:[
    {kind:"table", title:"Biến động ARR và chi tiêu", unit:"tỷ VND/năm",
     head:["Chỉ tiêu","Giá trị","Ghi chú"],
     rows:[["ARR đầu năm","200",""],["ARR mới ký thêm","120",""],["ARR mất do khách rời bỏ","40",""],
           ["ARR cuối năm","280",{t:"+40%",d:"up"}],["Chi phí bán hàng và marketing","180",""],["Biên lợi nhuận gộp","75%",""]]},
    {kind:"bars", title:"Tỷ lệ rời bỏ theo quy mô khách", unit:"% ARR đầu năm",
     headline:"Khách nhỏ rời bỏ gấp bảy lần khách lớn", sub:"ARR đầu năm: khách nhỏ 80 · vừa 80 · lớn 40 tỷ",
     rows:[["Khách nhỏ",35,"var(--series-bad)"],["Khách vừa",12.5,"var(--series-warn)"],["Khách lớn",5,"var(--series-good)"]],
     max:40, ticks:[0,10,20,30,40]},
    {kind:"metrics", title:"Tiền mặt và cơ cấu bán hàng",
     items:[["Tiền mặt hiện có","150 tỷ",""],["Dòng tiền âm năm nay","120 tỷ",""],
            ["ARR mới đến từ khách nhỏ","60%",""],["Mục tiêu hoàn vốn CAC phổ biến","dưới 18 tháng",""]]}
  ],
  options:[
    ["A","Tăng gấp đôi ngân sách bán hàng để đạt tăng trưởng 60%","Mỗi đồng bán hàng mất 24 tháng mới hoàn vốn và phần lớn đổ vào khách nhỏ rời bỏ 35% — tăng tốc sẽ cạn tiền trước 15 tháng.",30],
    ["B","Chuyển trọng tâm bán hàng sang khách vừa và lớn, làm chương trình onboarding giảm rời bỏ khách nhỏ, giữ chi tiêu bán hàng theo mốc hoàn vốn dưới 18 tháng","Sửa chất lượng tăng trưởng trước khi mở rộng: churn khách nhỏ đang ăn 28 tỷ ARR mỗi năm.",95],
    ["C","Cắt toàn bộ marketing để hoà dòng tiền","Dừng hẳn tăng trưởng trong khi biên gộp 75% vẫn tốt — sửa được dòng tiền nhưng phá giá trị công ty.",40],
    ["D","Tăng giá 30% cho khách nhỏ","Khách nhỏ vốn đã rời bỏ 35% — tăng giá đẩy họ đi nhanh hơn.",45]
  ],
  correct:"B",
  framing:[["tăng trưởng","40%","arr"],["dòng tiền","đốt tiền","tiền mặt"]],
  branches:[["khách mới","bán hàng","cac"],["churn","rời bỏ","giữ chân"],["biên gộp","dòng tiền","tiền mặt"]],
  numbers:[{v:24,tol:0.5,pts:35,core:true},{v:15,tol:0.3,pts:20},{v:28,tol:0.2,pts:20},{v:0.44,tol:0.01,pts:15}],
  insight:[{kw:["khách nhỏ"],pts:40},{kw:["runway","15 tháng","cạn tiền"],pts:35},{kw:["chất lượng tăng trưởng","mua tăng trưởng"],pts:25}],
  unit:"tỷ|tháng|%",
  model:{
    problem:"ARR tăng 40% nhưng dòng tiền âm nặng hơn — tăng trưởng này có bền không, và cần điều chỉnh gì trước khi cạn tiền mặt?",
    hyps:["Chi phí bán hàng để có khách mới quá cao (CAC)","Churn cao làm mất phần lớn ARR mới","Biên gộp thấp làm dòng tiền âm",""],
    evidence:"Ex.1: ARR 200 → 280 tỷ nhờ 120 tỷ ARR mới nhưng mất 40 tỷ do churn — churn ăn một phần ba tăng trưởng. Chi 180 tỷ bán hàng cho 120 tỷ ARR mới với biên gộp 75% → hoàn vốn CAC 180 ÷ 90 = 24 tháng; magic number 80 ÷ 180 = 0,44. Ex.2: khách nhỏ rời bỏ 35% làm mất 28 tỷ trong 40 tỷ ARR rời bỏ, trong khi 60% ARR mới vẫn đến từ khách nhỏ. Ex.3: tiền mặt 150 tỷ, dòng tiền âm 120 tỷ/năm → runway khoảng 15 tháng. H1 đúng: đang mua tăng trưởng bằng khách không ở lại; H2 đúng; H3 bị bác bỏ vì biên gộp 75% vẫn tốt.",
    rec:"B"},
  mistakes:{
    logicLesson:"i-growth-3",
    calc:{label:"thời gian hoàn vốn chi phí bán hàng", lesson:"f-unit-3",
      good:"Hoàn vốn CAC = 180 tỷ ÷ (120 tỷ ARR mới × 75%) = 24 tháng; runway = 150 ÷ 120 = 15 tháng",
      why:"Tăng trưởng SaaS phải đo bằng hiệu quả chi tiêu bán hàng và tiền mặt còn lại, không chỉ bằng % ARR."},
    framework:{lesson:"f-unit-2",
      good:"Tách ARR: ARR mới (chi phí bán hàng, CAC) · ARR mất (churn theo phân khúc) · biên gộp và tiền mặt",
      why:"ARR ròng tăng che giấu cả chi phí để có nó lẫn phần đang chảy ra ngoài."},
    exhibit:{lesson:"i-chart-3", bad:"Không chỉ ra churn khách nhỏ và thời gian còn lại trước khi cạn tiền",
      good:"Ex.2–3: khách nhỏ rời bỏ 35% (mất 28 tỷ ARR) nhưng chiếm 60% ARR mới; runway chỉ khoảng 15 tháng",
      why:"Hai exhibit phụ quyết định có nên tăng tốc hay không — bỏ qua chúng thì khuyến nghị tăng ngân sách trông hợp lý."}
  }
});

/* ─────────── cl-10 · Growth · giáo dục ─────────── */
R({
  id:"cl-10", title:"Trung tâm tiếng Anh mất học viên năm hai",
  brief:{context:"Chuỗi trung tâm tiếng Anh tuyển được 10.000 học viên mới mỗi năm, nhưng chỉ 31% đăng ký học tiếp năm hai. Học phí 20 triệu/năm, lãi góp 60%. Ban điều hành định tăng ngân sách tuyển sinh để bù.",
         task:"tìm nguyên nhân tỷ lệ tái đăng ký thấp, lượng hoá giá trị của việc sửa nó và chọn hành động."},
  exhibits:[
    {kind:"table", title:"Học viên và kinh tế mỗi học viên", unit:"mỗi năm",
     head:["Chỉ tiêu","Giá trị","Ghi chú"],
     rows:[["Học viên mới","10.000",""],["Tỷ lệ tái đăng ký năm hai","31%","trung bình ngành 55%"],
           ["Học phí","20 triệu/năm",""],["Lãi góp","60% học phí","12 triệu mỗi học viên"],["Chi phí tuyển một học viên mới","6 triệu",""]]},
    {kind:"bars", title:"Lý do không tái đăng ký (khảo sát học viên)", unit:"% người trả lời",
     headline:"Gần một nửa bỏ vì không thấy tiến bộ", sub:"1.200 học viên không tái đăng ký trả lời",
     rows:[["Không thấy tiến bộ rõ",48,"var(--series-bad)"],["Đổi giáo viên liên tục",22,"var(--series-warn)"],["Học phí cao",18,"var(--series-base)"],["Chuyển nơi ở",12,"var(--series-base)"]],
     max:60, ticks:[0,15,30,45,60]},
    {kind:"metrics", title:"Kiểm tra tiến bộ giữa kỳ",
     items:[["Học viên đang có bài kiểm tra tiến bộ","25%",""],["Tái đăng ký · có kiểm tra","52%",""],
            ["Tái đăng ký · không có kiểm tra","24%",""],["Chi phí áp dụng cho mọi học viên","1 triệu/học viên",""]]}
  ],
  options:[
    ["A","Tăng 30% ngân sách tuyển sinh để bù học viên mất đi","Mỗi học viên mới tốn 6 triệu, trong khi 69% học viên hiện có đang rời đi — đổ thêm nước vào thùng thủng.",35],
    ["B","Áp dụng kiểm tra tiến bộ giữa kỳ cho mọi học viên và giữ giáo viên cố định theo lớp","Đánh vào hai lý do lớn nhất (70% người trả lời) với bằng chứng: có kiểm tra thì tái đăng ký 52% so với 24%.",95],
    ["C","Giảm 20% học phí năm hai","Học phí chỉ là lý do của 18% — giảm giá mất lãi góp trên cả những học viên vốn sẽ ở lại.",40],
    ["D","Mở thêm khoá học mới để giữ chân","Không chạm tới việc học viên không thấy tiến bộ ở khoá hiện tại.",30]
  ],
  correct:"B",
  framing:[["tái đăng ký","giữ chân","năm hai","31%"],["tăng trưởng","học viên","doanh thu"]],
  branches:[["tuyển sinh","học viên mới"],["tái đăng ký","giữ chân","năm hai"],["tiến bộ","chất lượng","giáo viên"]],
  numbers:[{v:15.2,tol:0.1,pts:35,core:true},{v:25.2,tol:0.1,pts:20},{v:2100,tol:1,pts:15},{v:48,tol:0.5,pts:10}],
  insight:[{kw:["tiến bộ"],pts:40},{kw:["không phải vấn đề giá","học phí chỉ"],pts:35},{kw:["giáo viên"],pts:25}],
  unit:"tỷ|triệu|%|học viên",
  model:{
    problem:"Tuyển sinh tốt nhưng chỉ 31% học viên tái đăng ký năm hai — vì sao, và cách nào tăng doanh thu bền hơn?",
    hyps:["Tuyển sinh học viên mới chưa đủ","Tỷ lệ tái đăng ký năm hai thấp hơn ngành","Học viên không thấy tiến bộ và đổi giáo viên",""],
    evidence:"Ex.1: 10.000 học viên, chỉ 31% tái đăng ký so với 55% của ngành. Ex.2: 48% bỏ vì không thấy tiến bộ, 22% vì đổi giáo viên; học phí chỉ 18% nên không phải vấn đề giá. Ex.3: học viên có kiểm tra tiến bộ giữa kỳ tái đăng ký 52% so với 24%. Nếu áp dụng cho tất cả và tỷ lệ lên 52%: thêm 2.100 học viên × 12 triệu lãi góp = 25,2 tỷ, trừ chi phí 10 tỷ → ròng 15,2 tỷ/năm. H2 và H3 đúng; H1 bị bác bỏ vì tuyển sinh không thiếu.",
    rec:"B"},
  mistakes:{
    logicLesson:"i-growth-1",
    calc:{label:"lãi góp ròng tăng thêm khi áp dụng kiểm tra tiến bộ", lesson:"f-unit-2",
      good:"(52% − 31%) × 10.000 = 2.100 học viên × 12 triệu = 25,2 tỷ − chi phí 10 tỷ = 15,2 tỷ/năm",
      why:"Giữ chân phải được quy ra tiền và trừ chi phí chương trình mới so được với tuyển sinh."},
    framework:{lesson:"m-journey-1",
      good:"Tách tăng trưởng học viên: tuyển mới · tái đăng ký · lý do rời bỏ (chất lượng, giáo viên, giá)",
      why:"Doanh thu trung tâm là tuyển mới cộng giữ chân — chỉ nhìn tuyển mới là bỏ nửa bài toán."},
    exhibit:{lesson:"i-chart-3", bad:"Không dùng khảo sát lý do rời bỏ và dữ liệu kiểm tra tiến bộ",
      good:"Ex.2–3: 48% bỏ vì không thấy tiến bộ; có kiểm tra giữa kỳ thì tái đăng ký 52% so với 24%",
      why:"Exhibit so sánh nhóm có và không có can thiệp là bằng chứng mạnh nhất cho khuyến nghị."}
  }
});

/* ─────────── cl-12 · Product Launch · FMCG ─────────── */
R({
  id:"cl-12", title:"Ra mắt dòng sữa hạt cao cấp",
  brief:{context:"Hãng sữa muốn ra mắt dòng sữa hạt cao cấp trong thị trường sữa hạt 12.000 tỷ/năm. Ba đối thủ đã có mặt ở phân khúc cao cấp. Ngân sách ra mắt năm đầu đề xuất 90 tỷ, mục tiêu 8% thị phần cao cấp vào năm hai.",
         task:"đánh giá kế hoạch có đáng không bằng con số, và đề xuất cách ra mắt."},
  exhibits:[
    {kind:"table", title:"Phân khúc sữa hạt cao cấp", unit:"giá trị bán lẻ",
     head:["Chỉ tiêu","Giá trị","Ghi chú"],
     rows:[["Thị trường sữa hạt","12.000 tỷ/năm",""],["Tỷ trọng phân khúc cao cấp","15%",""],["Tăng trưởng cao cấp","25%/năm",""],
           ["Thị phần ba đối thủ","40% · 30% · 20%","còn lại 10%"]]},
    {kind:"table", title:"Kinh tế một hộp", unit:"đồng",
     head:["Khoản","Giá trị","Ghi chú"],
     rows:[["Giá bán lẻ","35.000",""],["Chiết khấu kênh","30% giá bán lẻ",""],["Giá vốn","12.000",""],["Vận chuyển, lưu kho","2.000",""]]},
    {kind:"metrics", title:"Kế hoạch ra mắt",
     items:[["Ngân sách marketing năm đầu","90 tỷ",""],["Mục tiêu thị phần cao cấp năm hai","8%",""],
            ["Kênh chính","siêu thị, cửa hàng tiện lợi","60% doanh số dự kiến"]]}
  ],
  options:[
    ["A","Ra mắt đại trà mọi kênh, mọi tỉnh cùng lúc","Dàn 90 tỷ mỏng khắp nơi trong khi 8% thị phần chỉ tạo 54 tỷ lãi góp — không kênh nào đủ sức cạnh tranh với ba đối thủ.",35],
    ["B","Ra mắt ở kênh hiện đại tại thành phố lớn với định vị khác biệt rõ, chia 90 tỷ cho hai năm và giải ngân theo mốc thị phần","Phân khúc đủ lớn và lãi góp mỗi hộp tốt, nhưng cần 13,3% thị phần mới bù ngân sách trong một năm — phải đi từng bước.",95],
    ["C","Bán rẻ hơn đối thủ 20% để giành thị phần","Lãi góp mỗi hộp rơi từ 10.500đ xuống 5.600đ, gần như gấp đôi số hộp phải bán.",30],
    ["D","Không ra mắt vì đã có ba đối thủ","Bỏ một phân khúc 2.250 tỷ tăng 25%/năm với lãi góp mỗi hộp tốt.",45]
  ],
  correct:"B",
  framing:[["ra mắt","sản phẩm mới","cao cấp"],["có nên","đáng","thị phần","lãi"]],
  branches:[["thị trường","phân khúc","quy mô"],["đối thủ","cạnh tranh"],["lãi góp","kinh tế","giá"]],
  numbers:[{v:54,tol:0.3,pts:35,core:true},{v:10500,tol:1,pts:25},{v:13.3,tol:0.1,pts:20},{v:2250,tol:2,pts:10}],
  insight:[{kw:["ngân sách","hoà vốn"],pts:40},{kw:["90%"],pts:35},{kw:["theo mốc","hai năm"],pts:25}],
  unit:"tỷ|đ|%",
  model:{
    problem:"Có nên ra mắt dòng sữa hạt cao cấp khi ba đối thủ đã chiếm thị phần, và ngân sách 90 tỷ có đáng không?",
    hyps:["Phân khúc cao cấp đủ lớn và tăng nhanh","Ba đối thủ đã chiếm phần lớn thị phần","Lãi góp mỗi hộp quá mỏng sau chiết khấu kênh",""],
    evidence:"Ex.1: phân khúc cao cấp 15% × 12.000 = 1.800 tỷ, năm hai 2.250 tỷ; ba đối thủ đã chiếm 90%. Ex.2: mỗi hộp lãi góp 35.000 × 70% − 12.000 − 2.000 = 10.500đ. Ex.3: 8% thị phần năm hai = 180 tỷ bán lẻ, khoảng 5,14 triệu hộp → 54 tỷ lãi góp, chưa bù 90 tỷ ngân sách; muốn hoà vốn ngân sách trong một năm cần 13,3% thị phần. H1 đúng: thị trường đủ lớn; H2 đúng: đối thủ mạnh; H3 bị bác bỏ vì lãi góp mỗi hộp vẫn tốt. Nên chia ngân sách hai năm và giải ngân theo mốc thị phần.",
    rec:"B"},
  mistakes:{
    logicLesson:"m-gtm-3",
    calc:{label:"lãi góp năm hai ở mục tiêu 8% thị phần", lesson:"m-gtm-1",
      good:"2.250 tỷ × 8% = 180 tỷ ÷ 35.000đ ≈ 5,14 triệu hộp × 10.500đ = 54 tỷ; hoà vốn 90 tỷ cần 13,3% thị phần",
      why:"Kế hoạch ra mắt phải so ngân sách với lãi góp của mục tiêu thị phần — không phải với doanh thu."},
    framework:{lesson:"i-entry-1",
      good:"Ba nhánh: quy mô và tăng trưởng phân khúc · vị thế đối thủ · kinh tế một hộp sau chiết khấu kênh",
      why:"Ra mắt sản phẩm là một case thâm nhập thị trường thu nhỏ: thị trường, cạnh tranh, kinh tế."},
    exhibit:{lesson:"m-brand-2", bad:"Không so ngân sách ra mắt với lãi góp và không tính thị phần hoà vốn",
      good:"Ex.3: 8% thị phần chỉ tạo 54 tỷ lãi góp so với 90 tỷ ngân sách — cần 13,3% để hoà vốn trong một năm",
      why:"Mục tiêu thị phần nghe hợp lý cho tới khi quy ra lãi góp và đặt cạnh ngân sách."}
  }
});

})(window.SCORING.register);
