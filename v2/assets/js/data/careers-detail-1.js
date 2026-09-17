/* Chi tiết nghề · Tư vấn & Chiến lược, Tài chính & Đầu tư */
(function(){ const D = window.CAREER_DETAIL;

/* ─── Management Consulting ─── */
D("consulting", {
  types:["Profitability","Market Entry","M&A","Growth"],
  week:[
    ["Thứ Hai: chốt giả thuyết của tuần với manager, chia workstream","Monday: agree the week's hypotheses with the manager and split workstreams"],
    ["Thứ Ba–Tư: phỏng vấn chuyên gia, dựng model, làm sạch dữ liệu khách gửi","Tue–Wed: expert calls, build the model, clean the client's data"],
    ["Thứ Năm: gom kết quả thành slide, problem-solving với partner","Thursday: turn findings into slides, problem-solve with the partner"],
    ["Thứ Sáu: họp steering committee với khách, sửa deck theo phản hồi","Friday: steering committee with the client, revise the deck on feedback"]],
  ladder:[
    ["Business Analyst",["0–2 năm","0–2 yrs"],["Làm một mảng phân tích: model, dữ liệu, một phần deck","Owns one piece of analysis: a model, a dataset, part of the deck"]],
    ["Associate / Consultant",["2–4 năm","2–4 yrs"],["Sở hữu cả một workstream và trình bày trực tiếp với khách","Owns a full workstream and presents directly to the client"]],
    ["Engagement Manager",["4–7 năm","4–7 yrs"],["Chạy cả dự án: phạm vi, đội, tiến độ và chất lượng đầu ra","Runs the whole project: scope, team, timeline and output quality"]],
    ["Partner",["8+ năm","8+ yrs"],["Bán dự án, giữ quan hệ với CEO, chịu trách nhiệm khuyến nghị cuối","Sells work, holds CEO relationships, owns the final recommendation"]]],
  hiring:[
    ["CV & bài test",["Lọc theo thành tích và bài test logic, số liệu (PST, game-based hoặc test riêng).","Screened on track record and a logic/numeracy test (PST, game-based or in-house)."]],
    ["Case vòng 1",["Hai case 30 phút với consultant, chấm structuring, case math và synthesis.","Two 30-minute cases with consultants, scored on structure, maths and synthesis."]],
    ["Case vòng 2",["Case với manager/partner, nặng về business judgment và cách chốt khuyến nghị.","Cases with managers/partners, weighted to judgement and how you land the call."]],
    ["Fit interview",["Câu chuyện lãnh đạo, gây ảnh hưởng và vượt khó — kể theo STAR.","Leadership, influence and resilience stories — told in STAR format."]]],
  cases:[
    [["Chuỗi cà phê tăng doanh thu 18% nhưng EBITDA margin giảm từ 16% xuống 9%. Vì sao?","A coffee chain grew revenue 18% but EBITDA margin fell from 16% to 9%. Why?"],
     ["Tách lợi nhuận thành doanh thu và chi phí, rồi tìm dòng chi phí tăng nhanh hơn doanh thu — kiểm tra riêng nhóm cửa hàng mới mở.","Split profit into revenue and cost, find the cost line growing faster than revenue — and check new stores separately."]],
    [["Một hãng hàng không giá rẻ có nên mở đường bay quốc tế đầu tiên?","Should a low-cost airline launch its first international route?"],
     ["Định nghĩa 'nên' bằng một con số: đường bay hoà vốn sau bao lâu, rồi chia thành thị trường, năng lực và kinh tế đường bay.","Define 'should' as a number — months to break even — then split into market, capability and route economics."]],
    [["Tập đoàn bán lẻ muốn mua một chuỗi nhà thuốc. Có đáng không?","A retail group wants to buy a pharmacy chain. Is it worth it?"],
     ["Hỏi mục tiêu mua trước (tăng trưởng hay cộng hưởng), sau đó tách: sức hấp dẫn ngành, chất lượng mục tiêu, cộng hưởng và giá.","Ask the deal rationale first (growth or synergy), then split: industry, target quality, synergies and price."]]],
  pitfalls:[
    ["Đọc thuộc framework thay vì dựng cây riêng cho đề","Reciting a framework instead of building a tree for this brief"],
    ["Tính nhẩm im lặng, không nói bước làm để interviewer theo kịp","Doing the maths silently so the interviewer can't follow"],
    ["Kết luận bằng tóm tắt dữ kiện thay vì một khuyến nghị có hành động","Closing with a recap of facts instead of an actionable recommendation"]],
  fit:{yes:[
    ["Thích một vấn đề mới mỗi vài tuần và chịu được mơ hồ","You enjoy a new problem every few weeks and can live with ambiguity"],
    ["Nói và viết mạch lạc dưới áp lực thời gian","You speak and write clearly under time pressure"],
    ["Muốn tích luỹ nhanh kỹ năng dùng được ở mọi ngành","You want a fast, transferable skill base"]],
  no:[
    ["Cần giờ giấc ổn định và ít đi công tác","You need predictable hours and little travel"],
    ["Muốn tự tay triển khai và thấy kết quả lâu dài","You want to execute yourself and see long-term results"]]}
});

/* ─── Corporate Strategy ─── */
D("strategy", {
  types:["Growth","M&A","Market Entry"],
  week:[
    ["Cập nhật dashboard KPI tập đoàn và giải thích biến động cho CFO","Update the group KPI dashboard and explain movements to the CFO"],
    ["Làm việc với các khối kinh doanh để rà kế hoạch 3 năm","Work with business units to review their 3-year plans"],
    ["Sàng lọc cơ hội M&A hoặc đối tác mà ngân hàng đầu tư gửi tới","Screen M&A and partnership opportunities sent by bankers"],
    ["Viết memo một trang cho họp ban điều hành cuối tuần","Write a one-page memo for the executive committee"]],
  ladder:[
    ["Strategy Analyst",["0–2 năm","0–2 yrs"],["Thu thập dữ liệu ngành, dựng model, làm slide cho sếp trình","Gathers industry data, builds models, drafts slides for the boss"]],
    ["Strategy Manager",["3–5 năm","3–5 yrs"],["Chủ trì một sáng kiến chiến lược xuyên các khối","Leads one strategic initiative across business units"]],
    ["Head of Strategy",["6–10 năm","6–10 yrs"],["Điều phối kế hoạch chiến lược toàn tập đoàn","Coordinates the group's strategic planning"]],
    ["Chief Strategy Officer / CEO khối",["10+ năm","10+ yrs"],["Quyết định danh mục đầu tư hoặc điều hành một mảng kinh doanh","Decides the portfolio or runs a business line"]]],
  hiring:[
    ["CV",["Ưu tiên người từng làm consulting, IB hoặc có thành tích thi case.","Favours ex-consultants, ex-bankers or case competition winners."]],
    ["Bài tập mang về",["Phân tích một ngành hoặc cơ hội đầu tư trong 48–72 giờ, nộp deck ngắn.","Analyse an industry or investment opportunity in 48–72 hours, submit a short deck."]],
    ["Trình bày",["Bảo vệ deck trước trưởng phòng chiến lược, bị hỏi dồn về giả định.","Defend the deck to the head of strategy under close questioning on assumptions."]],
    ["Gặp lãnh đạo",["Nói chuyện với CFO/CEO về tầm nhìn ngành và độ phù hợp văn hoá.","Conversation with CFO/CEO on industry view and cultural fit."]]],
  cases:[
    [["Tập đoàn có 5 mảng kinh doanh, vốn chỉ đủ đầu tư mạnh cho 2. Chọn mảng nào?","The group has 5 businesses but capital for 2. Which do you back?"],
     ["Đặt hai trục: sức hấp dẫn thị trường và vị thế cạnh tranh của mình, chấm từng mảng bằng số thay vì cảm tính.","Use two axes — market attractiveness and our competitive position — and score each business with numbers."]],
    [["Doanh thu cốt lõi đi ngang 3 năm. Tăng trưởng tiếp từ đâu?","Core revenue has been flat for 3 years. Where does growth come from?"],
     ["Chia nguồn tăng trưởng: khách hiện tại mua nhiều hơn, khách mới cùng thị trường, thị trường mới, sản phẩm mới — ước lượng quy mô từng nhánh.","Split growth sources: more from current customers, new customers, new markets, new products — size each."]],
    [["Đối thủ vừa được một quỹ ngoại rót vốn lớn. Mình phản ứng thế nào?","A competitor just raised a big round from a foreign fund. How do we respond?"],
     ["Hỏi họ sẽ tiêu tiền vào đâu và mình mất gì nếu họ thành công, trước khi bàn phản ứng.","Ask where they will spend the money and what we lose if they succeed — before discussing a response."]]],
  pitfalls:[
    ["Đưa ra chiến lược không gắn với ngân sách và năng lực thực của tập đoàn","Proposing strategy detached from the group's real budget and capabilities"],
    ["Bỏ qua chính trị nội bộ giữa các khối kinh doanh","Ignoring the politics between business units"],
    ["Deck quá dài, lãnh đạo không thấy được câu trả lời ở trang đầu","Decks too long, leadership can't find the answer on page one"]],
  fit:{yes:[
    ["Thích nhìn bức tranh dài hạn của một doanh nghiệp","You like thinking about a company's long-term picture"],
    ["Muốn thấy khuyến nghị của mình được thực thi","You want to see your recommendations executed"],
    ["Kiên nhẫn thuyết phục nhiều bên trong tổ chức","You are patient persuading many internal stakeholders"]],
  no:[
    ["Muốn nhịp độ đổi dự án nhanh như consulting","You want consulting-style project variety"],
    ["Không thích quy trình phê duyệt nhiều tầng","You dislike multi-layer approvals"]]}
});

/* ─── Operations Consulting ─── */
D("opsconsult", {
  types:["Operations","Profitability"],
  week:[
    ["Đi hiện trường: đứng dây chuyền, bấm giờ công đoạn, chụp ảnh điểm tắc","On the floor: stand at the line, time each step, photograph the jams"],
    ["Dựng sơ đồ dòng giá trị và tính công suất từng trạm","Map the value stream and compute capacity per station"],
    ["Chạy workshop với tổ trưởng để thử một thay đổi nhỏ","Run a workshop with supervisors to trial a small change"],
    ["Đo lại chỉ số sau thử nghiệm và báo cáo tiết kiệm cho giám đốc nhà máy","Re-measure after the trial and report savings to the plant manager"]],
  ladder:[
    ["Analyst",["0–2 năm","0–2 yrs"],["Thu thập số liệu hiện trường, dựng mô hình chi phí","Collects floor data, builds cost models"]],
    ["Consultant",["2–4 năm","2–4 yrs"],["Dẫn một mảng cải tiến tại một nhà máy hoặc kho","Leads one improvement stream at a plant or warehouse"]],
    ["Manager",["4–8 năm","4–8 yrs"],["Chạy chương trình cải tiến nhiều địa điểm","Runs multi-site improvement programmes"]],
    ["Partner / COO",["8+ năm","8+ yrs"],["Bán chương trình vận hành lớn hoặc sang điều hành doanh nghiệp","Sells large ops programmes or moves into running a business"]]],
  hiring:[
    ["CV & test số",["Kiểm tra tư duy định lượng, thường ưu tiên nền kỹ thuật hoặc kinh tế.","Numeracy screen; engineering or economics backgrounds are common."]],
    ["Case vận hành",["Đề về nút thắt, công suất hoặc cắt giảm chi phí, tính nhiều.","Bottleneck, capacity or cost-out cases with heavy calculation."]],
    ["Case hiện trường",["Có nơi cho xem video hoặc sơ đồ quy trình và hỏi chỗ lãng phí.","Some firms show a process video or map and ask where the waste is."]],
    ["Fit",["Hỏi về khả năng làm việc với công nhân, tổ trưởng và chịu điều kiện nhà máy.","Probes working with operators and supervisors, and plant conditions."]]],
  cases:[
    [["Nhà máy nước giải khát chỉ đạt 70% công suất thiết kế. Tìm nguyên nhân.","A beverage plant runs at 70% of design capacity. Find out why."],
     ["Vẽ dòng công đoạn, tìm trạm có công suất thấp nhất — cả nhà máy chỉ chạy nhanh bằng trạm đó.","Draw the process flow and find the slowest station — the plant can only run as fast as it."]],
    [["Chi phí trên mỗi đơn hàng của kho tăng 25% sau khi mở rộng. Vì sao?","Warehouse cost per order rose 25% after expansion. Why?"],
     ["Tách chi phí đơn thành nhân công, mặt bằng, vận chuyển nội bộ; so năng suất đơn/giờ trước và sau.","Split order cost into labour, space and internal travel; compare orders per hour before and after."]],
    [["Khách hàng muốn cắt 15% chi phí vận hành trong 12 tháng. Bắt đầu từ đâu?","The client wants 15% off operating cost in 12 months. Where do you start?"],
     ["Xếp các khoản chi phí theo quy mô và mức kiểm soát được; đánh vào 20% khoản chiếm 80% chi phí trước.","Rank cost pools by size and controllability; attack the 20% of pools driving 80% of cost first."]]],
  pitfalls:[
    ["Đề xuất đầu tư máy mới trước khi khai thác hết công suất hiện có","Recommending new machines before using existing capacity"],
    ["Cải tiến ở trạm không phải nút thắt, tổng sản lượng không đổi","Improving a non-bottleneck station, so total output doesn't move"],
    ["Quên tính chi phí và rủi ro khi triển khai thay đổi","Ignoring implementation cost and risk"]],
  fit:{yes:[
    ["Thích thấy tác động bằng con số cụ thể","You like impact you can count"],
    ["Không ngại xuống xưởng, đi ca, làm với công nhân","You are happy on the shop floor working with operators"],
    ["Có đầu óc hệ thống và thích quy trình","You think in systems and enjoy processes"]],
  no:[
    ["Muốn làm chiến lược cấp cao, ít chi tiết","You prefer high-level strategy over detail"],
    ["Không muốn ở tỉnh xa nhiều tuần","You don't want weeks at remote sites"]]}
});

/* ─── Technology Consulting ─── */
D("techconsult", {
  types:["Operations","Growth","Profitability"],
  week:[
    ["Phỏng vấn người dùng nghiệp vụ để vẽ quy trình hiện tại","Interview business users to map the current process"],
    ["Viết yêu cầu nghiệp vụ và so sánh phương án phần mềm","Write business requirements and compare software options"],
    ["Tính business case: chi phí triển khai, bản quyền, lợi ích tiết kiệm","Build the business case: implementation, licence, savings"],
    ["Họp với đội IT khách và nhà cung cấp để chốt phạm vi giai đoạn 1","Meet client IT and vendors to lock phase-1 scope"]],
  ladder:[
    ["Technology Analyst",["0–2 năm","0–2 yrs"],["Vẽ quy trình, viết tài liệu yêu cầu, kiểm thử","Maps processes, writes requirement docs, tests"]],
    ["Consultant",["2–5 năm","2–5 yrs"],["Dẫn một module triển khai hoặc một mảng chuyển đổi","Leads one implementation module or transformation stream"]],
    ["Manager",["5–8 năm","5–8 yrs"],["Quản lý dự án chuyển đổi số nhiều đội","Manages multi-team digital programmes"]],
    ["Director / CIO",["9+ năm","9+ yrs"],["Định hướng chiến lược công nghệ cho doanh nghiệp","Sets technology strategy for the business"]]],
  hiring:[
    ["CV & test",["Test logic và đôi khi kiến thức cơ bản về dữ liệu, hệ thống.","Logic test, sometimes basic data and systems knowledge."]],
    ["Case kinh doanh–công nghệ",["Đề dạng: nên triển khai hệ thống X không, lợi ích bao nhiêu?","Cases like: should we implement system X and what is the benefit?"]],
    ["Phỏng vấn kỹ thuật nhẹ",["Hỏi về quy trình, dữ liệu, cách làm việc với đội kỹ sư.","Light technical round on processes, data and working with engineers."]],
    ["Fit",["Tình huống xử lý khách khó tính và dự án trễ hạn.","Handling difficult clients and late projects."]]],
  cases:[
    [["Ngân hàng muốn tự động hoá khâu duyệt hồ sơ vay tiêu dùng. Có đáng đầu tư?","A bank wants to automate consumer loan approvals. Worth it?"],
     ["Tính thời gian và chi phí mỗi hồ sơ hiện tại × số hồ sơ, so với chi phí hệ thống — ra payback trước khi bàn công nghệ.","Compute time and cost per file today × volume versus system cost — get payback before talking tech."]],
    [["Chuỗi bán lẻ có dữ liệu ở 6 hệ thống rời rạc. Ưu tiên gộp cái nào trước?","A retailer's data sits in 6 separate systems. Which to integrate first?"],
     ["Hỏi quyết định kinh doanh nào đang bị chậm vì thiếu dữ liệu, rồi chọn hệ thống phục vụ quyết định đáng tiền nhất.","Ask which business decision is slowed by missing data, then pick the system feeding the most valuable decision."]],
    [["Dự án ERP trễ 8 tháng, vượt ngân sách 40%. Cứu hay dừng?","An ERP project is 8 months late and 40% over budget. Rescue or stop?"],
     ["Bỏ qua chi phí đã tiêu; so chi phí còn lại để hoàn thành với lợi ích còn lại và phương án thay thế.","Ignore sunk cost; compare remaining cost to finish with remaining benefit and the alternative."]]],
  pitfalls:[
    ["Nói về tính năng phần mềm thay vì lợi ích kinh doanh","Talking software features instead of business benefit"],
    ["Bỏ qua chi phí đào tạo và thay đổi thói quen người dùng","Ignoring training and change management costs"],
    ["Tính cả chi phí chìm khi quyết định tiếp tục dự án","Counting sunk cost when deciding to continue"]],
  fit:{yes:[
    ["Hiểu công nghệ nhưng thích bài toán kinh doanh hơn viết code","You understand tech but prefer business problems to coding"],
    ["Làm tốt vai trò cầu nối giữa hai nhóm nói hai ngôn ngữ","You bridge teams that speak different languages"],
    ["Thích dự án dài, thấy hệ thống chạy thật","You like long projects and seeing systems go live"]],
  no:[
    ["Muốn thuần chiến lược, không dính triển khai","You want pure strategy, no implementation"],
    ["Không kiên nhẫn với tài liệu và kiểm thử","You have no patience for documentation and testing"]]}
});

/* ─── Business Development ─── */
D("bizdev", {
  types:["Market Entry","Growth","Pricing"],
  week:[
    ["Lọc danh sách đối tác tiềm năng và ước lượng giá trị từng thương vụ","Screen potential partners and size each deal"],
    ["Gặp đối tác, tìm hiểu họ cần gì và mình có gì để đổi","Meet partners to learn what they need and what we can trade"],
    ["Dựng mô hình chia doanh thu và điểm hoà vốn của hợp tác","Model the revenue split and the partnership's break-even"],
    ["Làm việc với pháp chế và vận hành để chốt điều khoản khả thi","Work with legal and ops to lock workable terms"]],
  ladder:[
    ["BD Executive",["0–2 năm","0–2 yrs"],["Nghiên cứu thị trường, tìm đầu mối, chuẩn bị tài liệu","Researches markets, sources leads, prepares materials"]],
    ["BD Manager",["2–5 năm","2–5 yrs"],["Tự dẫn đàm phán và chốt thương vụ vừa","Leads negotiations and closes mid-size deals"]],
    ["Head of Partnerships",["5–9 năm","5–9 yrs"],["Quản lý danh mục đối tác chiến lược","Manages the strategic partner portfolio"]],
    ["VP Business Development",["9+ năm","9+ yrs"],["Mở thị trường hoặc ngành kinh doanh mới","Opens new markets or business lines"]]],
  hiring:[
    ["CV",["Ưu tiên kinh nghiệm bán hàng B2B, consulting hoặc hiểu ngành.","Favours B2B sales, consulting or industry experience."]],
    ["Case thị trường",["Đề ước lượng thị trường và chọn đối tác, có tính toán.","Market sizing and partner choice with calculation."]],
    ["Đàm phán giả lập",["Đóng vai đàm phán một điều khoản hợp tác với người phỏng vấn.","Role-play negotiating a partnership term with the interviewer."]],
    ["Gặp quản lý",["Hỏi về các thương vụ đã làm và cách bạn xây quan hệ.","Past deals and how you build relationships."]]],
  cases:[
    [["Ví điện tử muốn hợp tác với một chuỗi siêu thị. Đề xuất mô hình hợp tác.","An e-wallet wants to partner with a supermarket chain. Propose the deal."],
     ["Liệt kê mỗi bên được gì (khách, dữ liệu, giảm phí) và mất gì, rồi tìm điều khoản mà cả hai cùng thắng.","List what each side gets (customers, data, lower fees) and gives up, then find terms where both win."]],
    [["Công ty logistics muốn vào mảng giao hàng lạnh. Thị trường đủ lớn không?","A logistics firm wants to enter cold-chain delivery. Is the market big enough?"],
     ["Ước lượng bottom-up: số điểm bán cần hàng lạnh × số đơn mỗi tháng × giá mỗi đơn.","Size bottom-up: outlets needing cold goods × orders per month × price per order."]],
    [["Đối tác đòi chia 30% doanh thu thay vì 20%. Có nên đồng ý?","A partner wants 30% of revenue instead of 20%. Accept?"],
     ["Tính biên lợi nhuận của mình ở mức 30%, so với phương án không hợp tác hoặc đối tác khác.","Compute our margin at 30% and compare with no deal or another partner."]]],
  pitfalls:[
    ["Hào hứng với quy mô thương vụ mà quên biên lợi nhuận","Excited by deal size, forgetting margin"],
    ["Không chuẩn bị phương án thay thế trước khi đàm phán","No walk-away alternative before negotiating"],
    ["Chốt điều khoản mà đội vận hành không thực hiện được","Agreeing terms operations can't deliver"]],
  fit:{yes:[
    ["Thích gặp người và xây quan hệ lâu dài","You enjoy meeting people and building relationships"],
    ["Vừa nói chuyện thương mại vừa tính được con số","You can talk commercially and do the numbers"],
    ["Chịu được nhiều thương vụ thất bại trước khi chốt được một","You can handle many lost deals before one closes"]],
  no:[
    ["Muốn làm phân tích sâu, ít tiếp xúc","You prefer deep analysis with little contact"],
    ["Khó chịu với chỉ tiêu doanh số","You dislike revenue targets"]]}
});

/* ─── Investment Banking ─── */
D("ib", {
  types:["M&A","Growth"],
  week:[
    ["Cập nhật model định giá theo số liệu quý mới của khách","Update the valuation model with the client's new quarter"],
    ["Làm pitch book cho buổi gặp khách hàng tiềm năng","Build a pitch book for a prospective client"],
    ["Chuẩn bị phòng dữ liệu và trả lời câu hỏi thẩm định của nhà đầu tư","Prepare the data room and answer investor due-diligence questions"],
    ["Rà soát bản thông tin chào bán cùng luật sư và kiểm toán","Review the offering memorandum with lawyers and auditors"]],
  ladder:[
    ["Analyst",["0–3 năm","0–3 yrs"],["Model, slide, tài liệu thẩm định — rất nhiều giờ làm","Models, slides, diligence documents — very long hours"]],
    ["Associate",["3–6 năm","3–6 yrs"],["Kiểm tra công việc analyst, quản lý tiến độ thương vụ","Checks analyst work, manages deal timelines"]],
    ["Vice President",["6–10 năm","6–10 yrs"],["Điều phối thương vụ, làm việc trực tiếp với lãnh đạo khách","Runs deals and works directly with client executives"]],
    ["Managing Director",["10+ năm","10+ yrs"],["Tìm và chốt mandate, giữ quan hệ","Wins mandates and holds relationships"]]],
  hiring:[
    ["CV & test",["Test kế toán, định giá cơ bản và Excel.","Accounting, basic valuation and Excel test."]],
    ["Technical interview",["Hỏi liên kết 3 báo cáo, DCF, EV/EBITDA, tác động của một bút toán.","Linking the 3 statements, DCF, EV/EBITDA, the effect of one entry."]],
    ["Modelling test",["Dựng model hoặc định giá nhanh trong 1–3 giờ.","Build a model or quick valuation in 1–3 hours."]],
    ["Superday / fit",["Nhiều vòng liên tiếp với VP, MD; hỏi vì sao IB và khả năng chịu áp lực.","Back-to-back rounds with VPs and MDs; why banking and handling pressure."]]],
  cases:[
    [["Khấu hao tăng 10 tỷ. Ba báo cáo tài chính thay đổi thế nào (thuế 20%)?","Depreciation rises by 10bn. How do the three statements change (20% tax)?"],
     ["Đi theo thứ tự: lợi nhuận ròng giảm 8 → dòng tiền cộng lại 10 nên tăng 2 → tài sản cố định giảm 10, tiền tăng 2, vốn chủ giảm 8.","Go in order: net income −8 → cash flow adds back 10 so +2 → PP&E −10, cash +2, equity −8."]],
    [["Định giá một chuỗi bán lẻ đang tăng trưởng nhanh nhưng chưa có lãi.","Value a fast-growing retail chain that isn't profitable yet."],
     ["Không dùng P/E; dùng EV/Doanh thu so với doanh nghiệp tương đồng và DCF với giả định năm có lãi rõ ràng.","Skip P/E; use EV/Revenue against peers and a DCF with an explicit breakeven year."]],
    [["Bên mua trả bằng cổ phiếu. Thương vụ có làm giảm EPS của bên mua không?","The acquirer pays in stock. Is the deal dilutive to its EPS?"],
     ["So P/E của bên mua với P/E trả cho bên bán: trả giá P/E cao hơn P/E của mình thì EPS bị pha loãng.","Compare the acquirer's P/E with the P/E paid: paying a higher multiple than your own dilutes EPS."]]],
  pitfalls:[
    ["Học thuộc câu hỏi kỹ thuật nhưng không giải thích được vì sao","Memorising technicals without explaining why"],
    ["Lỗi nhỏ trong model hoặc slide — ở IB là lỗi lớn","Small errors in models or slides — a big deal in banking"],
    ["Không có câu trả lời thuyết phục cho 'vì sao IB'","No convincing answer to 'why banking'"]],
  fit:{yes:[
    ["Chịu được giờ làm dài và chi tiết tuyệt đối","You can handle long hours and absolute precision"],
    ["Thích thị trường vốn và thương vụ lớn","You love capital markets and big deals"],
    ["Muốn bước đệm sang PE, quỹ hoặc CFO","You want a springboard to PE, funds or CFO roles"]],
  no:[
    ["Coi trọng cân bằng công việc–cuộc sống ngay từ đầu","You want work-life balance from day one"],
    ["Không thích Excel và tài liệu dài","You dislike Excel and long documents"]]}
});

/* ─── Private Equity & VC ─── */
D("pe", {
  types:["M&A","Growth","Market Sizing"],
  week:[
    ["Đọc 10–20 hồ sơ gọi vốn và loại phần lớn trong một buổi","Read 10–20 pitches and reject most in one sitting"],
    ["Gặp ban lãnh đạo doanh nghiệp tiềm năng, hỏi về unit economics","Meet a target's management and probe unit economics"],
    ["Viết investment memo cho hội đồng đầu tư","Write an investment memo for the investment committee"],
    ["Hỗ trợ công ty trong danh mục: tuyển người, kế hoạch tăng trưởng","Support portfolio companies: hiring, growth plans"]],
  ladder:[
    ["Analyst",["0–2 năm","0–2 yrs"],["Sàng lọc thương vụ, nghiên cứu ngành, model","Screens deals, researches industries, models"]],
    ["Associate",["2–5 năm","2–5 yrs"],["Dẫn thẩm định một thương vụ, viết memo","Leads diligence on a deal, writes the memo"]],
    ["Vice President / Principal",["5–9 năm","5–9 yrs"],["Tìm thương vụ và ngồi hội đồng quản trị công ty danh mục","Sources deals and sits on portfolio boards"]],
    ["Partner",["9+ năm","9+ yrs"],["Gọi vốn cho quỹ, quyết định đầu tư","Raises the fund and makes investment decisions"]]],
  hiring:[
    ["CV",["Phần lớn tuyển người từ IB, consulting hoặc từng khởi nghiệp.","Mostly hires ex-bankers, ex-consultants or former founders."]],
    ["Case đầu tư",["Nhận thông tin một công ty, trả lời: có đầu tư không, vì sao.","Given a company profile: would you invest, and why."]],
    ["Model LBO / định giá",["Dựng model lợi nhuận đầu tư (IRR, bội số vốn) trong thời gian giới hạn.","Build a returns model (IRR, multiple) under time pressure."]],
    ["Gặp partner",["Thảo luận một ngành bạn tâm đắc và một khoản đầu tư bạn sẽ chọn.","Discuss an industry you know and a deal you would back."]]],
  cases:[
    [["Quỹ mua một doanh nghiệp giá 500 tỷ, bán lại sau 5 năm giá 1.250 tỷ. IRR khoảng bao nhiêu?","A fund buys a company for 500bn and sells it for 1,250bn after 5 years. Rough IRR?"],
     ["Bội số 2,5 lần trong 5 năm; nhớ quy tắc: gấp đôi trong 5 năm ≈ 15%, gấp 2,5 lần ≈ 20%.","2.5x in 5 years; rule of thumb: 2x in 5 years ≈ 15%, 2.5x ≈ 20%."]],
    [["Startup giao đồ ăn tăng 20%/tháng nhưng mỗi đơn lỗ 8.000đ. Có nên rót vốn?","A food-delivery startup grows 20% a month but loses 8,000 VND per order. Invest?"],
     ["Tách khoản lỗ mỗi đơn thành phần giảm theo quy mô và phần không giảm; nếu phần không giảm vẫn âm thì tăng trưởng chỉ làm lỗ to hơn.","Split the per-order loss into scale-dependent and fixed parts; if the fixed part stays negative, growth only deepens losses."]],
    [["Ba rủi ro lớn nhất khi đầu tư vào một chuỗi phòng khám tư?","The three biggest risks in backing a private clinic chain?"],
     ["Chia theo nguồn giá trị: bác sĩ (giữ người), pháp lý (giấy phép) và kinh tế cơ sở mới (bao lâu hoà vốn).","Group by value drivers: doctors (retention), regulation (licences) and new-site economics (time to break even)."]]],
  pitfalls:[
    ["Chỉ nhìn tăng trưởng doanh thu, bỏ qua dòng tiền","Looking only at revenue growth, not cash"],
    ["Không nói được vì sao thương vụ sẽ thất bại","Unable to say how the deal could fail"],
    ["Không có quan điểm riêng về một ngành","No personal view on any industry"]],
  fit:{yes:[
    ["Thích đánh giá con người và mô hình kinh doanh","You enjoy judging people and business models"],
    ["Có kiên nhẫn chờ kết quả nhiều năm","You can wait years for results"],
    ["Đã có nền tài chính hoặc kinh nghiệm vận hành","You already have finance or operating experience"]],
  no:[
    ["Mới ra trường chưa có kinh nghiệm nền","You are fresh out of school with no base experience"],
    ["Muốn phản hồi nhanh về công việc mình làm","You want fast feedback on your work"]]}
});

/* ─── Corporate Finance / FP&A ─── */
D("fpna", {
  types:["Profitability","Pricing"],
  week:[
    ["Đóng sổ tháng: đối chiếu số thực tế với kế hoạch","Month-end: reconcile actuals against plan"],
    ["Giải thích chênh lệch cho từng trưởng bộ phận","Explain variances to each department head"],
    ["Cập nhật dự báo cả năm theo tình hình mới","Update the full-year forecast"],
    ["Làm báo cáo quản trị cho ban giám đốc","Prepare the management report for the board"]],
  ladder:[
    ["FP&A Analyst",["0–2 năm","0–2 yrs"],["Tổng hợp số, làm báo cáo tháng","Compiles numbers, builds monthly reports"]],
    ["Senior Analyst / Business Partner",["2–5 năm","2–5 yrs"],["Làm cố vấn tài chính cho một khối kinh doanh","Finance partner to one business unit"]],
    ["FP&A Manager",["5–8 năm","5–8 yrs"],["Chủ trì quy trình ngân sách toàn công ty","Owns the company budgeting process"]],
    ["Finance Director / CFO",["8+ năm","8+ yrs"],["Chịu trách nhiệm tài chính và phân bổ vốn","Accountable for finance and capital allocation"]]],
  hiring:[
    ["CV & test Excel",["Kiểm tra hàm, pivot và đọc báo cáo tài chính.","Tests formulas, pivots and reading financial statements."]],
    ["Case chênh lệch",["Cho số kế hoạch và thực tế, yêu cầu giải thích vì sao lệch.","Given plan and actuals, explain the gap."]],
    ["Phỏng vấn với quản lý",["Hỏi cách bạn trình bày số với người không làm tài chính.","How you present numbers to non-finance people."]],
    ["Gặp trưởng bộ phận",["Kiểm tra khả năng làm đối tác cho khối kinh doanh.","Checks your ability to partner with the business."]]],
  cases:[
    [["Lợi nhuận quý thấp hơn kế hoạch 12 tỷ dù doanh thu đạt 100%. Giải thích.","Quarterly profit is 12bn below plan even though revenue hit 100%. Explain."],
     ["Doanh thu đạt nhưng cơ cấu có thể lệch: tách chênh lệch thành giá, sản lượng, cơ cấu sản phẩm và chi phí.","Revenue hit but mix may differ: split the gap into price, volume, product mix and cost."]],
    [["Giám đốc kinh doanh xin thêm 5 tỷ ngân sách marketing. Duyệt không?","The sales director asks for 5bn more marketing budget. Approve?"],
     ["Hỏi doanh thu tăng thêm kỳ vọng và biên lợi nhuận gộp; 5 tỷ cần bao nhiêu doanh thu để hoà vốn?","Ask for expected extra revenue and gross margin; how much revenue does 5bn need to break even?"]],
    [["Tỷ giá tăng 5%. Ảnh hưởng gì đến lợi nhuận công ty nhập nguyên liệu?","The currency weakens 5%. Impact on a company importing raw materials?"],
     ["Tìm tỷ trọng nguyên liệu nhập trong giá vốn và khả năng chuyển chi phí sang giá bán.","Find imported materials' share of COGS and the ability to pass cost into price."]]],
  pitfalls:[
    ["Báo cáo số chênh lệch mà không nói nguyên nhân và hành động","Reporting variances without cause or action"],
    ["Dự báo dựa trên kế hoạch cũ thay vì xu hướng thực","Forecasting from the old plan rather than actual trends"],
    ["Dùng thuật ngữ kế toán với người không làm tài chính","Using accounting jargon with non-finance people"]],
  fit:{yes:[
    ["Thích con số và muốn hiểu cả doanh nghiệp vận hành ra sao","You like numbers and want to see the whole business"],
    ["Làm việc có nhịp, chính xác","You work with rhythm and precision"],
    ["Muốn đi đường dài lên CFO","You want the long road to CFO"]],
  no:[
    ["Chán việc lặp lại theo chu kỳ tháng","Monthly cycles bore you"],
    ["Muốn làm việc hướng ra thị trường, khách hàng","You want market- or customer-facing work"]]}
});

/* ─── Equity Research ─── */
D("equity", {
  types:["Market Sizing","Profitability","Growth"],
  week:[
    ["Đọc báo cáo quý của các doanh nghiệp mình theo dõi ngay khi công bố","Read quarterly results of covered companies as they land"],
    ["Cập nhật model và giá mục tiêu","Update models and target prices"],
    ["Gọi điện hoặc thăm doanh nghiệp, nhà phân phối để kiểm chứng","Call or visit companies and distributors to verify"],
    ["Viết báo cáo và trình bày với nhà đầu tư tổ chức","Write the report and present to institutional investors"]],
  ladder:[
    ["Research Associate",["0–2 năm","0–2 yrs"],["Thu thập dữ liệu, cập nhật model, viết phần đầu báo cáo","Collects data, updates models, drafts report sections"]],
    ["Analyst",["2–5 năm","2–5 yrs"],["Tự theo dõi một nhóm cổ phiếu và ra khuyến nghị","Covers a group of stocks and makes calls"]],
    ["Senior Analyst / Head of Sector",["5–9 năm","5–9 yrs"],["Dẫn nghiên cứu một ngành lớn","Leads research on a major sector"]],
    ["Head of Research / Portfolio Manager",["9+ năm","9+ yrs"],["Quản lý phòng nghiên cứu hoặc chuyển sang quản lý quỹ","Runs research or moves to managing money"]]],
  hiring:[
    ["CV & test",["Test tài chính, định giá; CFA là điểm cộng.","Finance and valuation test; CFA is a plus."]],
    ["Bài viết mẫu",["Viết báo cáo ngắn về một cổ phiếu bạn chọn.","Write a short report on a stock of your choice."]],
    ["Bảo vệ luận điểm",["Người phỏng vấn phản biện luận điểm và giả định của bạn.","The interviewer challenges your thesis and assumptions."]],
    ["Gặp trưởng phòng",["Hỏi bạn theo dõi thị trường thế nào mỗi ngày.","How you follow markets day to day."]]],
  cases:[
    [["Một công ty thép có P/E 6, thấp hơn trung bình thị trường 12. Có rẻ không?","A steel company trades at 6x P/E versus a market average of 12. Is it cheap?"],
     ["Hỏi lợi nhuận đang ở đỉnh hay đáy chu kỳ; ngành chu kỳ có P/E thấp khi lợi nhuận đỉnh.","Ask where earnings are in the cycle; cyclicals look cheap on P/E at peak earnings."]],
    [["Doanh thu ngân hàng tăng 25% nhưng giá cổ phiếu giảm. Vì sao?","A bank's revenue rose 25% but the stock fell. Why?"],
     ["So kỳ vọng thị trường, chất lượng tăng trưởng (nợ xấu, trích lập) và biên lãi ròng.","Compare with expectations, growth quality (bad debt, provisions) and net interest margin."]],
    [["Ước lượng doanh thu năm tới của một chuỗi điện thoại di động.","Estimate next year's revenue for a mobile phone retail chain."],
     ["Số cửa hàng × doanh thu mỗi cửa hàng, tách cửa hàng cũ (tăng trưởng cùng cửa hàng) và cửa hàng mới.","Stores × revenue per store, split existing (same-store growth) and new stores."]]],
  pitfalls:[
    ["Kết luận theo tin tức thay vì theo con số","Concluding from headlines not numbers"],
    ["Giá mục tiêu không có kịch bản xấu","Target price with no downside case"],
    ["Viết dài, nhà đầu tư không tìm được khuyến nghị","Long writing where investors can't find the call"]],
  fit:{yes:[
    ["Tò mò về một ngành đến mức đọc mọi thứ về nó","You're curious enough to read everything on an industry"],
    ["Viết tốt và dám đưa quan điểm","You write well and take positions"],
    ["Thích theo dõi thị trường hằng ngày","You enjoy following markets daily"]],
  no:[
    ["Sợ bị sai công khai","You fear being publicly wrong"],
    ["Muốn làm thương vụ hơn là nghiên cứu","You prefer deals to research"]]}
});

/* ─── Risk & Credit ─── */
D("risk", {
  types:["Profitability","Market Sizing"],
  week:[
    ["Đọc hồ sơ vay và báo cáo tài chính doanh nghiệp","Read loan files and corporate financials"],
    ["Tính khả năng trả nợ theo nhiều kịch bản","Test repayment capacity under several scenarios"],
    ["Đi thẩm định thực tế tài sản bảo đảm và cơ sở kinh doanh","Visit collateral and business sites"],
    ["Trình tờ trình và bảo vệ trước hội đồng tín dụng","Present and defend the credit memo to the committee"]],
  ladder:[
    ["Credit Analyst",["0–2 năm","0–2 yrs"],["Phân tích hồ sơ, viết tờ trình","Analyses files, writes memos"]],
    ["Senior Credit Analyst",["2–5 năm","2–5 yrs"],["Thẩm định khoản vay lớn, phức tạp","Appraises large, complex loans"]],
    ["Risk Manager",["5–9 năm","5–9 yrs"],["Xây chính sách tín dụng và giám sát danh mục","Sets credit policy and monitors the book"]],
    ["Chief Risk Officer",["10+ năm","10+ yrs"],["Chịu trách nhiệm rủi ro toàn ngân hàng","Owns bank-wide risk"]]],
  hiring:[
    ["CV & test",["Test đọc báo cáo tài chính, tính toán và tiếng Anh.","Financial statements, numeracy and English test."]],
    ["Case hồ sơ vay",["Cho số liệu một doanh nghiệp, hỏi có cho vay không.","Given a company's numbers: would you lend?"]],
    ["Phỏng vấn chuyên môn",["Hỏi các chỉ số: DSCR, đòn bẩy, vòng quay vốn lưu động.","Ratios: DSCR, leverage, working capital turnover."]],
    ["Gặp lãnh đạo khối",["Kiểm tra sự thận trọng và đạo đức nghề nghiệp.","Tests prudence and professional ethics."]]],
  cases:[
    [["Doanh nghiệp có EBITDA 40 tỷ, nợ phải trả mỗi năm 30 tỷ. Có nên cho vay thêm 50 tỷ?","A company has 40bn EBITDA and 30bn annual debt service. Lend another 50bn?"],
     ["Tính DSCR hiện tại (≈1,33) và sau khoản vay mới; đa số ngân hàng cần tối thiểu 1,2–1,3 kể cả kịch bản xấu.","Compute DSCR now (≈1.33) and after the new loan; most banks want 1.2–1.3 even in a downside case."]],
    [["Nợ xấu mảng cho vay tiêu dùng tăng từ 3% lên 6% trong 6 tháng. Tìm nguyên nhân.","Consumer loan NPLs rose from 3% to 6% in 6 months. Find the cause."],
     ["Tách theo cohort giải ngân, kênh bán và sản phẩm — xem nhóm khoản vay mới hay cũ đang xấu đi.","Split by disbursement cohort, channel and product — see whether new or old loans are deteriorating."]],
    [["Giá bất động sản giảm 20%. Danh mục vay thế chấp bị ảnh hưởng thế nào?","Property prices fall 20%. Impact on the mortgage book?"],
     ["Tính lại tỷ lệ cho vay trên giá trị tài sản (LTV) cho từng nhóm và xem phần nào vượt ngưỡng an toàn.","Recalculate loan-to-value per segment and see which breach the safe threshold."]]],
  pitfalls:[
    ["Dựa vào tài sản bảo đảm thay vì dòng tiền trả nợ","Relying on collateral rather than repayment cash flow"],
    ["Chỉ tính kịch bản cơ sở","Only modelling the base case"],
    ["Tin số liệu doanh nghiệp mà không đối chiếu thực tế","Trusting company figures without verification"]],
  fit:{yes:[
    ["Thận trọng và thích tìm điểm yếu","You are cautious and like finding weaknesses"],
    ["Đọc báo cáo tài chính thấy thú vị","You find financial statements interesting"],
    ["Muốn công việc ổn định trong ngân hàng","You want a stable banking career"]],
  no:[
    ["Muốn là người bán hàng, thúc đẩy tăng trưởng","You want to be the one driving growth"],
    ["Khó chịu khi phải nói 'không' với đồng nghiệp kinh doanh","You struggle saying no to sales colleagues"]]}
});
})();
