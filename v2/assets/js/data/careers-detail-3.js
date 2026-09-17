/* Chi tiết nghề · Vận hành & Chuỗi cung ứng, Tổ chức & Tác động */
(function(){ const D = window.CAREER_DETAIL;

/* ─── Supply Chain & Operations ─── */
D("supplychain", {
  types:["Operations","Profitability"],
  week:[
    ["Họp S&OP: khớp dự báo bán hàng với kế hoạch sản xuất","S&OP meeting: match the sales forecast with the production plan"],
    ["Rà tồn kho theo mã hàng: thiếu hàng ở đâu, tồn đọng ở đâu","Review stock by SKU: where short, where excess"],
    ["Làm việc với nhà cung cấp và kho về tiến độ giao","Work with suppliers and warehouses on delivery timing"],
    ["Báo cáo mức phục vụ và chi phí chuỗi cung ứng","Report service level and supply chain cost"]],
  ladder:[
    ["Supply Chain MT / Planner",["0–2 năm","0–2 yrs"],["Lập kế hoạch nhu cầu hoặc tồn kho cho một nhóm hàng","Plans demand or stock for a product group"]],
    ["Supply Chain Manager",["2–6 năm","2–6 yrs"],["Sở hữu một mảng: kế hoạch, kho, vận tải hoặc mua hàng","Owns one area: planning, warehousing, transport or buying"]],
    ["Head of Supply Chain",["6–10 năm","6–10 yrs"],["Quản lý toàn bộ chuỗi quốc gia","Runs the national supply chain"]],
    ["Supply Chain Director / COO",["10+ năm","10+ yrs"],["Chịu trách nhiệm vận hành vùng hoặc toàn công ty","Accountable for regional or company operations"]]],
  hiring:[
    ["CV & test",["Test số liệu, logic; ưu tiên nền kỹ thuật, kinh tế.","Numeracy and logic; engineering or economics preferred."]],
    ["Case vận hành",["Đề tồn kho, dự báo hoặc nút thắt, có tính toán.","Inventory, forecasting or bottleneck case with maths."]],
    ["Assessment center",["Bài nhóm mô phỏng lập kế hoạch khi thiếu hàng.","Group exercise simulating planning under shortage."]],
    ["Gặp quản lý",["Hỏi cách xử lý khi sales và sản xuất mâu thuẫn.","How you handle sales vs production conflicts."]]],
  cases:[
    [["Tồn kho tăng 30% nhưng tỷ lệ thiếu hàng cũng tăng. Vì sao có thể cả hai?","Stock is up 30% yet stock-outs rose too. How can both happen?"],
     ["Tách theo mã hàng: tồn đọng ở hàng bán chậm, thiếu ở hàng bán chạy — vấn đề là phân bổ, không phải tổng lượng.","Split by SKU: excess sits in slow movers, shortages in fast movers — it's allocation, not total volume."]],
    [["Dự báo sai lệch 35% so với thực tế. Cải thiện thế nào?","Forecast error is 35%. How do you improve it?"],
     ["Đo sai lệch theo mã hàng và kênh, tìm nhóm gây sai nhiều nhất (thường là khuyến mãi và hàng mới).","Measure error by SKU and channel, find the worst offenders (often promotions and new products)."]],
    [["Nên giữ tồn kho an toàn 2 tuần hay 4 tuần?","Hold 2 or 4 weeks of safety stock?"],
     ["Cân chi phí giữ hàng thêm 2 tuần với chi phí mất doanh số khi thiếu hàng, theo độ biến động nhu cầu và thời gian giao.","Weigh holding cost of 2 extra weeks against lost sales, given demand variability and lead time."]]],
  pitfalls:[
    ["Nhìn tổng tồn kho mà không tách theo mã hàng","Looking at total stock, not by SKU"],
    ["Tối ưu chi phí một khâu làm tăng chi phí khâu khác","Optimising one step's cost while raising another's"],
    ["Quên mức phục vụ khi cắt giảm tồn kho","Cutting stock without watching service level"]],
  fit:{yes:[
    ["Thích hệ thống và giải bài toán đánh đổi","You enjoy systems and trade-off puzzles"],
    ["Bình tĩnh khi có sự cố","You stay calm when things break"],
    ["Muốn công việc có tác động rõ vào chi phí","You want clear impact on cost"]],
  no:[
    ["Không thích xử lý việc gấp hằng ngày","You dislike daily firefighting"],
    ["Muốn làm việc hướng khách hàng cuối","You want consumer-facing work"]]}
});

/* ─── Procurement & Sourcing ─── */
D("procurement", {
  types:["Operations","Pricing","Profitability"],
  week:[
    ["Phân tích chi tiêu theo hạng mục và nhà cung cấp","Analyse spend by category and supplier"],
    ["Tổ chức chào giá và so sánh tổng chi phí sở hữu","Run tenders and compare total cost of ownership"],
    ["Đàm phán giá, điều khoản thanh toán, cam kết sản lượng","Negotiate price, payment terms and volume commitments"],
    ["Đánh giá rủi ro nhà cung cấp và tìm nguồn thay thế","Assess supplier risk and find alternatives"]],
  ladder:[
    ["Procurement Executive",["0–2 năm","0–2 yrs"],["Xử lý đơn mua, chào giá hạng mục nhỏ","Handles POs and small tenders"]],
    ["Category Buyer",["2–5 năm","2–5 yrs"],["Sở hữu một ngành hàng mua","Owns a purchasing category"]],
    ["Procurement Manager",["5–9 năm","5–9 yrs"],["Chiến lược mua hàng nhiều ngành hàng","Sourcing strategy across categories"]],
    ["Chief Procurement Officer",["10+ năm","10+ yrs"],["Chịu trách nhiệm toàn bộ chi tiêu mua","Owns all company spend"]]],
  hiring:[
    ["CV",["Kinh nghiệm mua hàng, supply chain hoặc tài chính.","Buying, supply chain or finance experience."]],
    ["Case chi phí",["Phân rã giá một sản phẩm, tìm chỗ đàm phán.","Break down a product's price and find negotiation room."]],
    ["Đàm phán giả lập",["Đóng vai đàm phán với nhà cung cấp.","Role-play a supplier negotiation."]],
    ["Gặp quản lý",["Tình huống đạo đức: quà tặng, xung đột lợi ích.","Ethics: gifts and conflicts of interest."]]],
  cases:[
    [["Nhà cung cấp bao bì đòi tăng giá 12% vì giá giấy tăng. Chấp nhận không?","The packaging supplier wants +12% because paper prices rose. Accept?"],
     ["Hỏi giấy chiếm bao nhiêu % giá bao bì: nếu 50% và giá giấy tăng 15% thì hợp lý chỉ khoảng 7,5%.","Ask paper's share of pack cost: at 50% share and +15% paper, fair increase is about 7.5%."]],
    [["Nên gộp 8 nhà cung cấp vận tải về 3?","Consolidate 8 transport suppliers into 3?"],
     ["Cân mức giảm giá nhờ sản lượng lớn với rủi ro phụ thuộc và năng lực của 3 nhà còn lại vào mùa cao điểm.","Weigh volume discounts against dependency risk and the 3 suppliers' peak-season capacity."]],
    [["Nhà cung cấp rẻ hơn 10% nhưng giao trễ 20% số đơn. Chọn ai?","A supplier is 10% cheaper but late on 20% of orders. Choose them?"],
     ["Tính tổng chi phí sở hữu: giá + chi phí tồn kho an toàn thêm + chi phí dừng sản xuất khi trễ.","Compute total cost: price + extra safety stock + downtime cost from late deliveries."]]],
  pitfalls:[
    ["So giá mua thay vì tổng chi phí sở hữu","Comparing price instead of total cost of ownership"],
    ["Ép giá đến mức nhà cung cấp giảm chất lượng hoặc bỏ đi","Squeezing suppliers until quality drops or they leave"],
    ["Không có nguồn dự phòng cho nguyên liệu quan trọng","No backup source for critical inputs"]],
  fit:{yes:[
    ["Thích đàm phán và con số","You enjoy negotiation and numbers"],
    ["Chính trực, chịu được áp lực quà cáp","You are principled under gift pressure"],
    ["Muốn tác động trực tiếp đến lợi nhuận","You want direct profit impact"]],
  no:[
    ["Ngại xung đột","You avoid conflict"],
    ["Không thích quy trình, hồ sơ","You dislike procedures and paperwork"]]}
});

/* ─── Logistics & Distribution ─── */
D("logistics", {
  types:["Operations","Market Sizing"],
  week:[
    ["Theo dõi tỷ lệ giao đúng hẹn và đơn hoàn","Track on-time delivery and returns"],
    ["Phân tích chi phí mỗi đơn theo tuyến và khu vực","Analyse cost per order by route and area"],
    ["Lập kế hoạch công suất cho đợt khuyến mãi lớn","Plan capacity for a big sale event"],
    ["Làm việc với đối tác vận chuyển về giá và chất lượng","Work with carriers on price and quality"]],
  ladder:[
    ["Logistics Analyst",["0–2 năm","0–2 yrs"],["Theo dõi chỉ số và phân tích tuyến","Tracks metrics and analyses routes"]],
    ["Logistics Manager",["2–5 năm","2–5 yrs"],["Quản lý kho hoặc mạng lưới vùng","Manages a warehouse or regional network"]],
    ["Head of Logistics",["5–10 năm","5–10 yrs"],["Thiết kế mạng lưới kho và vận tải toàn quốc","Designs the national network"]],
    ["Director of Operations",["10+ năm","10+ yrs"],["Chịu trách nhiệm vận hành giao nhận","Accountable for fulfilment operations"]]],
  hiring:[
    ["CV & test",["Test số liệu và Excel.","Numeracy and Excel test."]],
    ["Case mạng lưới",["Chọn vị trí kho hoặc mô hình giao hàng.","Choose a warehouse location or delivery model."]],
    ["Đi hiện trường",["Một số nơi cho tham quan kho và hỏi quan sát.","Some firms tour a warehouse and ask for observations."]],
    ["Gặp quản lý",["Khả năng xử lý sự cố ngày cao điểm.","Handling peak-day incidents."]]],
  cases:[
    [["Sàn thương mại điện tử muốn giao trong 2 giờ ở nội thành. Khả thi không?","An e-commerce site wants 2-hour delivery in the inner city. Feasible?"],
     ["Tính số kho nhỏ cần để mọi đơn cách kho dưới ~30 phút, rồi chi phí mỗi đơn so với mức khách chịu trả.","Count micro-hubs needed to keep orders within ~30 minutes, then cost per order versus willingness to pay."]],
    [["Tỷ lệ đơn hoàn 15%, gấp đôi đối thủ. Vì sao?","Returns are 15%, double the rival. Why?"],
     ["Tách lý do hoàn: khách không nhận (COD), sai hàng, giao trễ — mỗi nguyên nhân thuộc một bộ phận khác nhau.","Split return reasons: refused COD, wrong item, late — each belongs to a different team."]],
    [["Mở thêm kho ở miền Trung hay tiếp tục giao từ Hà Nội, TP.HCM?","Open a central Vietnam warehouse or keep shipping from Hanoi and HCMC?"],
     ["So chi phí cố định kho mới với tiết kiệm vận chuyển × số đơn miền Trung, cộng giá trị giao nhanh hơn.","Compare the new site's fixed cost with transport savings × central orders, plus the value of faster delivery."]]],
  pitfalls:[
    ["Tối ưu tốc độ mà quên chi phí mỗi đơn","Optimising speed and forgetting cost per order"],
    ["Dùng số trung bình, bỏ qua ngày cao điểm","Using averages and ignoring peak days"],
    ["Đổ lỗi đối tác vận chuyển mà không xem quy trình của mình","Blaming carriers without checking your own process"]],
  fit:{yes:[
    ["Thích bài toán mạng lưới, bản đồ, tuyến đường","You like network, map and routing problems"],
    ["Quyết đoán khi có sự cố","You are decisive in incidents"],
    ["Hào hứng với thương mại điện tử","You're excited about e-commerce"]],
  no:[
    ["Muốn giờ giấc cố định mùa lễ tết","You want fixed hours in peak season"],
    ["Không thích môi trường kho bãi","You dislike warehouse environments"]]}
});

/* ─── Manufacturing Excellence ─── */
D("manufacturing", {
  types:["Operations","Profitability"],
  week:[
    ["Họp đầu ca: sản lượng, dừng máy, chất lượng hôm qua","Start-of-shift meeting: yesterday's output, downtime, quality"],
    ["Đo OEE từng dây chuyền và tìm nguyên nhân dừng máy","Measure OEE per line and find downtime causes"],
    ["Chạy dự án cải tiến giảm phế phẩm","Run an improvement project to cut scrap"],
    ["Chuẩn hoá quy trình mới và đào tạo công nhân","Standardise new procedures and train operators"]],
  ladder:[
    ["Production / Process Engineer",["0–2 năm","0–2 yrs"],["Theo dõi dây chuyền, xử lý sự cố kỹ thuật","Monitors lines, fixes technical issues"]],
    ["Continuous Improvement Lead",["2–5 năm","2–5 yrs"],["Dẫn dự án cải tiến toàn xưởng","Leads plant-wide improvement projects"]],
    ["Production Manager",["5–9 năm","5–9 yrs"],["Quản lý sản lượng, chi phí, an toàn một xưởng","Owns output, cost and safety for a plant"]],
    ["Plant Director",["10+ năm","10+ yrs"],["Điều hành cả nhà máy","Runs the whole factory"]]],
  hiring:[
    ["CV",["Ưu tiên kỹ sư cơ khí, công nghiệp, hoá.","Mechanical, industrial or chemical engineers preferred."]],
    ["Test kỹ thuật",["Tính công suất, OEE, đọc sơ đồ quy trình.","Capacity, OEE, reading process maps."]],
    ["Case nhà máy",["Tìm nút thắt và đề xuất cải tiến.","Find the bottleneck and propose improvement."]],
    ["Gặp giám đốc xưởng",["Hỏi về an toàn và cách dẫn dắt công nhân.","Safety and leading operators."]]],
  cases:[
    [["Dây chuyền có 4 công đoạn: 120, 90, 150, 100 sản phẩm/giờ. Công suất là bao nhiêu và nên đầu tư đâu?","A line has 4 steps at 120, 90, 150, 100 units/hour. What's capacity and where to invest?"],
     ["Công suất = công đoạn chậm nhất = 90/giờ. Nâng công đoạn 2 lên 100 thì nút thắt chuyển sang công đoạn 4 — chỉ tăng được 10/giờ.","Capacity = slowest step = 90/hour. Raising step 2 to 100 moves the bottleneck to step 4 — only +10/hour."]],
    [["OEE của nhà máy 55%, chuẩn ngành 75%. Bắt đầu từ đâu?","Plant OEE is 55% versus 75% industry standard. Where to start?"],
     ["Tách OEE = sẵn sàng × hiệu suất × chất lượng, tìm thành phần thấp nhất so với chuẩn.","Split OEE = availability × performance × quality, find the component furthest below benchmark."]],
    [["Tỷ lệ phế phẩm ca đêm gấp đôi ca ngày. Vì sao?","Night-shift scrap is double the day shift. Why?"],
     ["So từng yếu tố giữa hai ca: người (kinh nghiệm), máy (bảo trì), nguyên liệu, phương pháp — thay đổi từng yếu tố một.","Compare shifts on people (experience), machines (maintenance), materials, method — change one factor at a time."]]],
  pitfalls:[
    ["Đầu tư ở công đoạn không phải nút thắt","Investing at a non-bottleneck step"],
    ["Cải tiến xong không chuẩn hoá nên quay lại như cũ","Improvements not standardised, so they slip back"],
    ["Bỏ qua an toàn khi tăng tốc độ","Ignoring safety when speeding up"]],
  fit:{yes:[
    ["Có nền kỹ thuật và thích hiện trường","You have an engineering base and like the floor"],
    ["Kiên nhẫn cải tiến từng chút","You are patient with incremental improvement"],
    ["Dẫn dắt được người lao động trực tiếp","You can lead frontline workers"]],
  no:[
    ["Không muốn làm việc theo ca, ở khu công nghiệp","You don't want shifts or industrial parks"],
    ["Muốn công việc văn phòng, chiến lược","You want office strategy work"]]}
});

/* ─── Retail Operations ─── */
D("retailops", {
  types:["Operations","Profitability","Market Entry"],
  week:[
    ["Xem bảng xếp hạng cửa hàng theo doanh thu, lợi nhuận, tăng trưởng","Review store rankings by revenue, profit, growth"],
    ["Thăm cửa hàng yếu, tìm nguyên nhân tại chỗ","Visit weak stores and diagnose on site"],
    ["Điều chỉnh lịch nhân viên theo giờ cao điểm","Adjust staffing to peak hours"],
    ["Đánh giá địa điểm mới đề xuất mở","Assess proposed new sites"]],
  ladder:[
    ["Store Ops Analyst / Trainee",["0–2 năm","0–2 yrs"],["Phân tích hiệu quả cửa hàng, hỗ trợ quản lý vùng","Analyses store performance, supports area managers"]],
    ["Store / Area Manager",["2–5 năm","2–5 yrs"],["Quản lý một hoặc một cụm cửa hàng","Manages one or a cluster of stores"]],
    ["Regional Operations Manager",["5–9 năm","5–9 yrs"],["Chịu trách nhiệm P&L một vùng","Owns a region's P&L"]],
    ["Head of Retail Operations",["10+ năm","10+ yrs"],["Điều hành toàn chuỗi","Runs the whole chain's operations"]]],
  hiring:[
    ["CV",["Kinh nghiệm bán lẻ, F&B hoặc chương trình quản trị viên.","Retail, F&B or management trainee experience."]],
    ["Case cửa hàng",["Cho P&L một cửa hàng, hỏi vì sao lỗ.","Given a store P&L: why is it losing money?"]],
    ["Thực tế cửa hàng",["Làm thử vài ca tại cửa hàng.","Work a few shifts in a store."]],
    ["Gặp quản lý vùng",["Khả năng quản lý nhân viên trẻ và chịu áp lực.","Managing young staff under pressure."]]],
  cases:[
    [["Cửa hàng lỗ 50 triệu/tháng. Đóng hay giữ?","A store loses 50m VND a month. Close or keep?"],
     ["Tách lỗ: nếu doanh thu vẫn trả được chi phí biến đổi và một phần mặt bằng, cân thêm phí phạt hợp đồng và xu hướng khu vực.","Split the loss: if revenue covers variable costs and part of rent, weigh lease penalties and area trends too."]],
    [["Doanh thu cùng cửa hàng giảm 8% nhưng tổng chuỗi tăng 12%. Tốt hay xấu?","Same-store sales fell 8% while chain revenue grew 12%. Good or bad?"],
     ["Tăng trưởng đến từ mở mới đang che cửa hàng cũ yếu đi — cần tìm vì sao khách ở cửa hàng cũ giảm.","New stores are masking weaker existing stores — find why existing-store traffic fell."]],
    [["Chọn giữa hai mặt bằng: A giá thuê gấp đôi nhưng lượng người qua gấp ba.","Choose between two sites: A has double the rent but triple the footfall."]  ,
     ["Ước lượng doanh thu = lượng người qua × tỷ lệ vào × tỷ lệ mua × giá trị đơn, rồi so tỷ lệ thuê trên doanh thu.","Estimate revenue = footfall × entry rate × conversion × basket, then compare rent-to-sales ratios."]]],
  pitfalls:[
    ["Đóng cửa hàng chỉ vì lỗ kế toán, quên chi phí đã cam kết","Closing on accounting loss, forgetting committed costs"],
    ["Nhìn tổng tăng trưởng mà bỏ qua doanh thu cùng cửa hàng","Looking at total growth, not same-store sales"],
    ["Chọn địa điểm theo cảm giác đông người","Picking sites on a feeling of busyness"]],
  fit:{yes:[
    ["Thích môi trường nhanh, gần khách hàng","You like fast, customer-facing settings"],
    ["Quản lý người tốt","You manage people well"],
    ["Muốn thấy kết quả mỗi ngày","You want results daily"]],
  no:[
    ["Không muốn làm cuối tuần, lễ tết","You don't want weekends and holidays"],
    ["Muốn công việc phân tích thuần","You want pure analysis work"]]}
});

/* ─── People & Org Strategy ─── */
D("hrstrategy", {
  types:["Profitability","Operations"],
  week:[
    ["Phân tích dữ liệu nghỉ việc và kết quả khảo sát nhân viên","Analyse attrition data and engagement surveys"],
    ["Làm việc với trưởng bộ phận về cơ cấu tổ chức","Work with department heads on org structure"],
    ["Rà soát khung lương và chi phí nhân sự so với ngân sách","Review pay bands and people cost against budget"],
    ["Thiết kế chương trình phát triển người giỏi","Design talent development programmes"]],
  ladder:[
    ["HR Analyst / Associate",["0–2 năm","0–2 yrs"],["Phân tích dữ liệu nhân sự, hỗ trợ dự án","People analytics and project support"]],
    ["HR Business Partner",["2–6 năm","2–6 yrs"],["Cố vấn nhân sự cho một khối kinh doanh","People adviser to a business unit"]],
    ["Head of Talent / OD",["6–10 năm","6–10 yrs"],["Chiến lược nhân tài và tổ chức","Talent and organisation strategy"]],
    ["CHRO",["10+ năm","10+ yrs"],["Chịu trách nhiệm con người toàn công ty","Owns people company-wide"]]],
  hiring:[
    ["CV",["Nền nhân sự, tâm lý, kinh tế hoặc consulting.","HR, psychology, economics or consulting background."]],
    ["Case tổ chức",["Nghỉ việc cao hoặc tái cấu trúc — hỏi chẩn đoán và giải pháp.","High attrition or restructuring — diagnose and fix."]],
    ["Tình huống",["Xử lý xung đột, sa thải, bảo mật thông tin.","Conflict, dismissals, confidentiality."]],
    ["Gặp lãnh đạo",["Khả năng thuyết phục bằng số liệu.","Persuading with data."]]],
  cases:[
    [["Tỷ lệ nghỉ việc đội bán hàng 45%/năm. Làm gì?","Sales team attrition is 45% a year. What do you do?"],
     ["Tính chi phí mỗi người nghỉ (tuyển, đào tạo, doanh số mất) để biết đáng chi bao nhiêu, rồi tách theo thâm niên và quản lý.","Cost each leaver (hiring, training, lost sales) to size the budget, then split by tenure and manager."]],
    [["Công ty cần cắt 10% chi phí nhân sự. Cắt người hay cách khác?","The company must cut people cost 10%. Layoffs or something else?"],
     ["Liệt kê đòn bẩy: tuyển mới, làm thêm giờ, thưởng, cơ cấu tầng quản lý, thuê ngoài — ước lượng mỗi đòn bẩy được bao nhiêu.","List levers: hiring freeze, overtime, bonuses, management layers, outsourcing — size each."]],
    [["Nên có bao nhiêu tầng quản lý cho công ty 800 người?","How many management layers for an 800-person company?"],
     ["Dùng tầm kiểm soát: mỗi quản lý 6–8 người thì cần khoảng 4 tầng; so với hiện tại để thấy thừa hay thiếu.","Use span of control: 6–8 reports per manager implies about 4 layers; compare with today."]]],
  pitfalls:[
    ["Đề xuất chương trình mà không tính chi phí và lợi ích","Proposing programmes without cost and benefit"],
    ["Dùng khảo sát chung chung, không tách theo nhóm","Using generic surveys without segmenting"],
    ["Bỏ qua vai trò quản lý trực tiếp trong nghỉ việc","Ignoring the line manager's role in attrition"]],
  fit:{yes:[
    ["Quan tâm con người nhưng làm việc bằng dữ liệu","You care about people and work with data"],
    ["Giữ bí mật và công tâm","You are discreet and fair"],
    ["Thuyết phục được lãnh đạo","You can persuade leaders"]],
  no:[
    ["Chỉ muốn làm tuyển dụng hoặc sự kiện","You only want recruiting or events"],
    ["Ngại quyết định khó về con người","You avoid hard people decisions"]]}
});

/* ─── Sustainability & ESG ─── */
D("esg", {
  types:["Operations","Profitability","Growth"],
  week:[
    ["Thu thập số liệu điện, nhiên liệu, chất thải từ các nhà máy","Collect energy, fuel and waste data from sites"],
    ["Tính phát thải và so với mục tiêu công ty","Calculate emissions against company targets"],
    ["Dựng business case cho dự án điện mặt trời hoặc bao bì tái chế","Build a business case for solar or recycled packaging"],
    ["Chuẩn bị báo cáo phát triển bền vững theo chuẩn mực","Prepare the sustainability report to standard"]],
  ladder:[
    ["ESG Analyst",["0–2 năm","0–2 yrs"],["Thu thập, tính toán dữ liệu ESG","Collects and calculates ESG data"]],
    ["Sustainability Manager",["2–6 năm","2–6 yrs"],["Sở hữu lộ trình giảm phát thải một mảng","Owns an emissions roadmap for an area"]],
    ["Head of Sustainability",["6–10 năm","6–10 yrs"],["Chiến lược bền vững toàn công ty","Company sustainability strategy"]],
    ["Chief Sustainability Officer",["10+ năm","10+ yrs"],["Làm việc với HĐQT và nhà đầu tư","Works with the board and investors"]]],
  hiring:[
    ["CV",["Nền môi trường, kỹ thuật, tài chính hoặc consulting.","Environment, engineering, finance or consulting."]],
    ["Case bền vững",["Đề xuất giảm phát thải có chi phí và lợi ích.","Propose emission cuts with cost and benefit."]],
    ["Kiến thức chuẩn mực",["Hỏi phạm vi phát thải 1, 2, 3 và các khung báo cáo phổ biến.","Scope 1, 2, 3 and common reporting frameworks."]],
    ["Gặp lãnh đạo",["Khả năng nói chuyện ESG bằng ngôn ngữ tài chính.","Talking ESG in financial language."]]],
  cases:[
    [["Nhà máy muốn lắp điện mặt trời áp mái. Có lời không?","A plant wants rooftop solar. Does it pay?"],
     ["Sản lượng điện/năm × giá điện lưới tiết kiệm được so với chi phí đầu tư — tính payback, rồi mới cộng lợi ích phát thải.","Annual output × grid price saved versus capex — compute payback before adding emissions benefit."]],
    [["Khách hàng xuất khẩu yêu cầu giảm 30% phát thải trong 5 năm. Bắt đầu từ đâu?","An export customer demands 30% lower emissions in 5 years. Where to start?"],
     ["Lập bảng phát thải theo nguồn, xếp các biện pháp theo chi phí trên mỗi tấn CO₂ giảm — làm biện pháp rẻ trước.","Build an emissions inventory, rank measures by cost per tonne CO₂ cut — do the cheapest first."]],
    [["Chuyển sang bao bì tái chế tăng giá vốn 4%. Có nên?","Recycled packaging raises COGS 4%. Worth it?"],
     ["Cân chi phí tăng với rủi ro mất khách, yêu cầu pháp lý sắp tới và khả năng tăng giá bán.","Weigh extra cost against customer loss risk, upcoming regulation and pricing power."]]],
  pitfalls:[
    ["Nói khẩu hiệu thay vì con số","Slogans instead of numbers"],
    ["Bỏ qua phát thải phạm vi 3 từ chuỗi cung ứng","Ignoring scope 3 supply chain emissions"],
    ["Không gắn dự án xanh với lợi ích kinh doanh","Green projects with no business case"]],
  fit:{yes:[
    ["Quan tâm môi trường và muốn tác động thật","You care about the environment and want real impact"],
    ["Kết hợp được kỹ thuật và tài chính","You combine technical and financial thinking"],
    ["Kiên nhẫn với lộ trình nhiều năm","You're patient with multi-year roadmaps"]],
  no:[
    ["Chỉ muốn làm truyền thông xanh","You only want green communications"],
    ["Không thích số liệu và báo cáo chi tiết","You dislike detailed data and reporting"]]}
});

/* ─── Public & Development ─── */
D("publicsector", {
  types:["Market Sizing","Operations","Growth"],
  week:[
    ["Đọc số liệu thống kê và nghiên cứu về một vấn đề chính sách","Read statistics and research on a policy issue"],
    ["Phỏng vấn cán bộ địa phương và người hưởng lợi","Interview local officials and beneficiaries"],
    ["Phân tích chi phí – lợi ích các phương án","Cost–benefit analysis of options"],
    ["Viết báo cáo chính sách và trình bày với đối tác","Write a policy brief and present to partners"]],
  ladder:[
    ["Research / Programme Assistant",["0–2 năm","0–2 yrs"],["Thu thập dữ liệu, hỗ trợ dự án","Data collection, project support"]],
    ["Policy / Programme Analyst",["2–5 năm","2–5 yrs"],["Phân tích và quản lý một hợp phần dự án","Analyses and manages a project component"]],
    ["Programme Manager / Specialist",["5–10 năm","5–10 yrs"],["Dẫn dự án, làm việc với chính phủ","Leads projects, works with government"]],
    ["Country Director / Lead Economist",["10+ năm","10+ yrs"],["Định hướng chương trình quốc gia","Directs country programmes"]]],
  hiring:[
    ["CV & bài viết",["Nền kinh tế, chính sách công; thường yêu cầu bài viết mẫu.","Economics or public policy; often a writing sample."]],
    ["Bài test viết",["Tóm tắt tài liệu dài và đề xuất trong thời gian giới hạn.","Summarise long material and propose under time limit."]],
    ["Phỏng vấn năng lực",["Câu hỏi hành vi theo khung năng lực tổ chức.","Competency-based behavioural questions."]],
    ["Hội đồng",["Hỏi hiểu biết về phát triển và bối cảnh Việt Nam.","Development knowledge and Vietnam context."]]],
  cases:[
    [["Tỉnh muốn giảm tỷ lệ học sinh bỏ học cấp 3. Nên đầu tư vào đâu?","A province wants fewer upper-secondary dropouts. Where to invest?"],
     ["Tìm nguyên nhân bỏ học theo nhóm (kinh tế gia đình, khoảng cách, kết quả học) trước khi so chi phí mỗi học sinh giữ lại được.","Find dropout causes by group (income, distance, grades) before comparing cost per student retained."]],
    [["Xây cầu 300 tỷ hay nâng cấp đường hiện có 120 tỷ?","Build a 300bn bridge or upgrade an existing road for 120bn?"],
     ["So lợi ích ròng: thời gian tiết kiệm × lượng người đi × giá trị thời gian, trừ chi phí vòng đời — không chỉ chi phí xây.","Compare net benefit: time saved × travellers × value of time, minus lifecycle cost — not just build cost."]],
    [["Làm sao biết chương trình hỗ trợ nông dân có hiệu quả?","How do you know a farmer support programme works?"],
     ["Thiết kế nhóm so sánh tương đồng không tham gia, đo thu nhập trước và sau ở cả hai nhóm.","Design a similar non-participant comparison group and measure income before and after in both."]]],
  pitfalls:[
    ["Đo đầu ra (số buổi tập huấn) thay vì kết quả (thu nhập tăng)","Measuring outputs (trainings held) instead of outcomes (income)"],
    ["Bỏ qua lợi ích của các bên liên quan","Ignoring stakeholder interests"],
    ["Báo cáo dài, không có khuyến nghị rõ","Long reports with no clear recommendation"]],
  fit:{yes:[
    ["Muốn tác động xã hội ở quy mô lớn","You want social impact at scale"],
    ["Viết và nghiên cứu tốt","You research and write well"],
    ["Kiên nhẫn với tiến độ chậm","You're patient with slow progress"]],
  no:[
    ["Muốn tốc độ và thu nhập của khu vực tư","You want private-sector pace and pay"],
    ["Không thích thủ tục hành chính","You dislike bureaucracy"]]}
});

/* ─── Startup Founder ─── */
D("founder", {
  types:["Market Entry","Product Launch","Growth","Market Sizing"],
  week:[
    ["Nói chuyện với khách hàng — mỗi tuần, không ngoại lệ","Talk to customers — every week, no exceptions"],
    ["Xem dòng tiền còn bao nhiêu tháng và chỉ số tăng trưởng","Check runway and growth metrics"],
    ["Tuyển người và giữ đội tập trung vào một mục tiêu","Hire and keep the team focused on one goal"],
    ["Gặp nhà đầu tư hoặc đối tác","Meet investors or partners"]],
  ladder:[
    ["Idea / Pre-seed",["0–1 năm","0–1 yr"],["Tìm vấn đề đáng giải và khách chịu trả tiền","Find a problem worth solving and customers who'll pay"]],
    ["Seed",["1–2 năm","1–2 yrs"],["Chứng minh sản phẩm phù hợp thị trường","Prove product–market fit"]],
    ["Series A",["2–4 năm","2–4 yrs"],["Mở rộng kênh tăng trưởng lặp lại được","Scale a repeatable growth channel"]],
    ["Scale-up",["4+ năm","4+ yrs"],["Xây tổ chức và hệ thống để lớn tiếp","Build the organisation and systems to keep growing"]]],
  hiring:[
    ["Vườn ươm / chương trình",["Nộp hồ sơ vào chương trình tăng tốc: đội, vấn đề, dấu hiệu ban đầu.","Apply to accelerators: team, problem, early traction."]],
    ["Pitch",["Trình bày 5–10 phút trước nhà đầu tư.","5–10 minute pitch to investors."]],
    ["Thẩm định",["Nhà đầu tư kiểm tra số liệu, khách hàng, đội ngũ.","Investors verify metrics, customers and team."]],
    ["Điều khoản",["Đàm phán định giá và điều khoản đầu tư.","Negotiate valuation and terms."]]],
  cases:[
    [["Ý tưởng app đặt lịch cắt tóc. Làm sao biết có người cần?","A barber booking app idea. How do you know anyone needs it?"],
     ["Không xây app — nói chuyện với 20 tiệm và thử nhận đặt lịch thủ công qua tin nhắn trong 2 tuần.","Don't build yet — talk to 20 barbers and take bookings manually via messages for 2 weeks."]],
    [["Còn 6 tháng tiền. Cắt chi phí hay gọi vốn?","6 months of cash left. Cut costs or raise?"],
     ["Gọi vốn thường mất 4–6 tháng — phải cắt để kéo dài ra 12 tháng song song với gọi vốn.","Raising takes 4–6 months — cut to stretch to 12 months while raising in parallel."]],
    [["Nhà đầu tư hỏi: thị trường của bạn lớn cỡ nào?","An investor asks: how big is your market?"],
     ["Tính bottom-up từ khách hàng thật: số khách mục tiêu × giá × tần suất — không trích số báo cáo toàn ngành.","Size bottom-up from real customers: targets × price × frequency — don't quote total industry reports."]]],
  pitfalls:[
    ["Xây sản phẩm trước khi xác nhận nhu cầu","Building before validating demand"],
    ["Thị trường 'nếu chiếm 1% của cả nước'","'If we get 1% of the country' market sizing"],
    ["Tăng trưởng bằng tiền đốt khi unit economics âm","Buying growth with negative unit economics"]],
  fit:{yes:[
    ["Chịu được bất định và thất bại liên tục","You can live with uncertainty and repeated failure"],
    ["Làm được mọi việc từ bán hàng đến tuyển người","You'll do everything from sales to hiring"],
    ["Có vấn đề bạn thật sự muốn giải","You have a problem you truly want solved"]],
  no:[
    ["Cần thu nhập ổn định vài năm tới","You need stable income for the next few years"],
    ["Muốn khởi nghiệp vì danh hiệu","You want the founder title more than the problem"]]}
});

/* ─── Venture & Innovation ─── */
D("entrepinres", {
  types:["Product Launch","Market Entry","Growth"],
  week:[
    ["Chạy thử nghiệm nhỏ với khách hàng thật cho ý tưởng mới","Run small tests with real customers for a new idea"],
    ["Báo cáo tiến độ với hội đồng đầu tư nội bộ","Report to the internal investment board"],
    ["Mượn nguồn lực từ các phòng ban hiện có","Borrow resources from existing departments"],
    ["Quyết định tiếp tục, xoay hướng hay dừng dự án","Decide to continue, pivot or stop a venture"]],
  ladder:[
    ["Innovation Associate",["0–2 năm","0–2 yrs"],["Nghiên cứu, chạy thử nghiệm","Research and run experiments"]],
    ["Venture Lead",["2–5 năm","2–5 yrs"],["Dẫn một dự án kinh doanh mới","Leads a new venture"]],
    ["Head of Innovation / Venture Builder",["5–9 năm","5–9 yrs"],["Quản lý danh mục dự án mới","Manages the venture portfolio"]],
    ["CEO công ty con / Chief Innovation Officer",["9+ năm","9+ yrs"],["Điều hành mảng kinh doanh mới đã thành công","Runs a successful new business"]]],
  hiring:[
    ["CV",["Kinh nghiệm startup, consulting hoặc sản phẩm.","Startup, consulting or product experience."]],
    ["Case ý tưởng mới",["Đánh giá một ý tưởng và thiết kế thử nghiệm rẻ nhất.","Assess an idea and design the cheapest test."]],
    ["Trình bày",["Pitch dự án trước hội đồng nội bộ giả lập.","Pitch to a mock internal board."]],
    ["Gặp lãnh đạo",["Khả năng làm việc trong tập đoàn lớn.","Working inside a large group."]]],
  cases:[
    [["Ngân hàng muốn ra app đầu tư cho người trẻ. Thiết kế thử nghiệm đầu tiên.","A bank wants an investing app for young people. Design the first test."],
     ["Chọn giả định rủi ro nhất (người trẻ có muốn đầu tư qua ngân hàng?) và thử bằng trang đăng ký trước, đo tỷ lệ để lại thông tin.","Pick the riskiest assumption (do young people want to invest via a bank?) and test with a waitlist page, measuring sign-up rate."]],
    [["Dự án mới đã tiêu 20 tỷ, doanh thu 1 tỷ. Dừng hay tiếp?","A venture spent 20bn and made 1bn revenue. Stop or continue?"],
     ["Bỏ qua 20 tỷ đã tiêu; hỏi chỉ số dẫn dắt (giữ chân, tăng trưởng) có đạt mốc đặt ra trước đó không.","Ignore the 20bn spent; ask whether leading metrics (retention, growth) hit the milestones set earlier."]],
    [["Dự án mới cạnh tranh với sản phẩm cốt lõi của tập đoàn. Xử lý thế nào?","The venture competes with the group's core product. How to handle it?"],
     ["Tính phần doanh thu bị ăn mất so với phần đối thủ sẽ lấy nếu mình không làm.","Compare revenue cannibalised with what competitors would take if we don't act."]]],
  pitfalls:[
    ["Làm kế hoạch 5 năm trước khi có khách hàng đầu tiên","Five-year plans before the first customer"],
    ["Không đặt mốc dừng từ đầu","No stop criteria set upfront"],
    ["Dùng quy trình của tập đoàn cho dự án mới","Applying corporate process to a new venture"]],
  fit:{yes:[
    ["Tinh thần khởi nghiệp nhưng muốn nguồn lực tập đoàn","Entrepreneurial but want corporate resources"],
    ["Giỏi thuyết phục nội bộ","Good at internal persuasion"],
    ["Thích thử nghiệm nhanh","You like fast experiments"]],
  no:[
    ["Muốn toàn quyền như founder","You want full founder control"],
    ["Không chịu được việc dự án bị dừng","You can't accept projects being killed"]]}
});
})();
