/* ===== GIÁO TRÌNH 100 BÀI ĐẦU TIÊN · 6 TRACK · 28 MODULE =====
   Mỗi bài đều theo khuôn 10 phần: vì sao quan trọng · tình huống mở đầu · framework ·
   ví dụ thực tế · mini case · quiz · bài tập · gợi ý slide · lỗi thường gặp · checklist. */

window.TRACKS = [
 { id:"fundamentals", n:"Business Fundamentals", vi:"Nền tảng kinh doanh", icon:"▤", color:"ink",
   lvl:"Beginner", promise:"Hiểu cách một doanh nghiệp kiếm tiền và đọc được con số cơ bản.",
   for:"Người mới học business, chưa biết bắt đầu từ đâu" },
 { id:"method", n:"Case Method", vi:"Kỹ thuật giải case", icon:"◬", color:"accent",
   lvl:"Intermediate", promise:"Giải được một case chưa từng gặp bằng một quy trình lặp lại, không bằng trí nhớ.",
   for:"Người đã biết framework nhưng vẫn lúng túng khi gặp đề lạ" },
 { id:"competition", n:"Case Competition", vi:"Thi case", icon:"◈", color:"amber",
   lvl:"Advanced", promise:"Đi từ đề bài tới deck hoàn chỉnh và bảo vệ được trước ban giám khảo.",
   for:"Sinh viên chuẩn bị thi case competition" },
 { id:"consulting", n:"Consulting Case Interview", vi:"Phỏng vấn consulting", icon:"◎", color:"emerald",
   lvl:"Intermediate", promise:"Giải case theo phong cách consulting trong 30 phút đối thoại.",
   for:"Người ứng tuyển consulting, strategy" },
 { id:"marketing", n:"Marketing Case", vi:"Case marketing", icon:"◐", color:"rose",
   lvl:"Intermediate", promise:"Giải bài toán thương hiệu, ra mắt sản phẩm và tăng trưởng khách hàng.",
   for:"Người ứng tuyển marketing, brand, growth" },
 { id:"supplychain", n:"Supply Chain & Operations", vi:"Chuỗi cung ứng & vận hành", icon:"⊞", color:"neutral",
   lvl:"Intermediate", promise:"Tìm nút thắt, tối ưu chi phí và cân bằng mức phục vụ.",
   for:"Người ứng tuyển supply chain, operations" },
 { id:"finance", n:"Finance for Business Case", vi:"Tài chính cho case", icon:"◇", color:"olive",
   lvl:"Intermediate", promise:"Dựng mô hình tài chính đủ chắc để bảo vệ một khuyến nghị.",
   for:"Mọi người học muốn phần tài chính không bị bắt bẻ" }
];

/* lv: 1 Beginner · 2 Intermediate · 3 Advanced · 4 Competition Ready
   out: output thực tế người học tạo ra sau bài */
window.MODULES = [
/* ============ 1. BUSINESS FUNDAMENTALS — 22 bài ============ */
{ id:"f-sizing", track:"fundamentals", n:"Market Sizing", vi:"Ước lượng quy mô thị trường", lessons:[
  {id:"f-sizing-1", t:"Vì sao mọi case đều bắt đầu bằng một con số", m:6, lv:1, out:"calculation"},
  {id:"f-sizing-2", t:"Top-down và bottom-up: chọn đường nào", m:7, lv:1, out:"calculation"},
  {id:"f-sizing-3", t:"Chọn đơn vị tiêu dùng đúng", m:6, lv:1, out:"calculation"},
  {id:"f-sizing-4", t:"Giả định nào đáng tranh luận", m:7, lv:2, out:"chart insight"}]},
{ id:"f-profit", track:"fundamentals", n:"Profitability", vi:"Lợi nhuận", lessons:[
  {id:"f-profit-1", t:"Doanh thu không phải lợi nhuận", m:6, lv:1, out:"calculation"},
  {id:"f-profit-2", t:"Cây lợi nhuận và ba biến thể", m:8, lv:1, out:"slide"},
  {id:"f-profit-3", t:"Chi phí cố định và đòn bẩy hoạt động", m:7, lv:1, out:"calculation"},
  {id:"f-profit-4", t:"Điểm hoà vốn và biên an toàn", m:7, lv:2, out:"calculation"}]},
{ id:"f-pricing", track:"fundamentals", n:"Pricing", vi:"Định giá", lessons:[
  {id:"f-pricing-1", t:"Ba cách định giá: chi phí, đối thủ, giá trị", m:7, lv:2, out:"slide"},
  {id:"f-pricing-2", t:"Độ co giãn và vì sao giảm giá thường thua", m:8, lv:2, out:"calculation"},
  {id:"f-pricing-3", t:"Phân biệt giá và phân tầng sản phẩm", m:7, lv:2, out:"recommendation"}]},
{ id:"f-unit", track:"fundamentals", n:"Unit Economics", vi:"Kinh tế đơn vị", lessons:[
  {id:"f-unit-1", t:"Chọn đúng đơn vị phân tích", m:6, lv:1, out:"calculation"},
  {id:"f-unit-2", t:"CAC, LTV và tỷ lệ phải nhớ", m:8, lv:2, out:"calculation"},
  {id:"f-unit-3", t:"Thời gian hoàn vốn và giới hạn tăng trưởng", m:7, lv:2, out:"calculation"}]},
{ id:"f-segment", track:"fundamentals", n:"Customer Segmentation", vi:"Phân khúc khách hàng", lessons:[
  {id:"f-segment-1", t:"Phân khúc theo nhu cầu, không theo nhân khẩu", m:7, lv:2, out:"slide"},
  {id:"f-segment-2", t:"Chọn phân khúc mục tiêu: ba tiêu chí", m:7, lv:2, out:"recommendation"}]},
{ id:"f-moat", track:"fundamentals", n:"Competitive Advantage", vi:"Lợi thế cạnh tranh", lessons:[
  {id:"f-moat-1", t:"Lợi thế thật khác điểm mạnh thế nào", m:7, lv:2, out:"slide"},
  {id:"f-moat-2", t:"Bảy loại moat và cái nào bền", m:8, lv:2, out:"slide"},
  {id:"f-moat-3", t:"Lợi thế nào chuyển giao được sang thị trường mới", m:7, lv:3, out:"recommendation"}]},
{ id:"f-model", track:"fundamentals", n:"Business Model", vi:"Mô hình kinh doanh", lessons:[
  {id:"f-model-1", t:"Doanh nghiệp này thật sự kiếm tiền bằng cách nào", m:7, lv:1, out:"slide"},
  {id:"f-model-2", t:"Chín mô hình hay gặp trong case", m:9, lv:2, out:"slide"},
  {id:"f-model-3", t:"Khi nào một mô hình thất bại", m:7, lv:2, out:"recommendation"}]},

/* ============ 2. CASE COMPETITION — 20 bài ============ */
{ id:"c-read", track:"competition", n:"Đọc đề case", vi:"Đọc và giải mã đề", lessons:[
  {id:"c-read-1", t:"Tách câu hỏi thật ra khỏi bối cảnh", m:7, lv:2, out:"slide"},
  {id:"c-read-2", t:"Ràng buộc, tiêu chí đánh giá và điều đề không nói", m:7, lv:2, out:"checklist"},
  {id:"c-read-3", t:"Lập kế hoạch 48 giờ cho một đề dài", m:6, lv:3, out:"checklist"}]},
{ id:"c-frame", track:"competition", n:"Phân tích vấn đề", vi:"Định khung vấn đề", lessons:[
  {id:"c-frame-1", t:"Từ triệu chứng tới vấn đề gốc", m:8, lv:2, out:"slide"},
  {id:"c-frame-2", t:"Viết problem statement một câu", m:6, lv:2, out:"slide"},
  {id:"c-frame-3", t:"Phạm vi: cái gì trong, cái gì ngoài", m:6, lv:3, out:"slide"}]},
{ id:"c-tree", track:"competition", n:"Hypothesis tree", vi:"Cây giả thuyết", lessons:[
  {id:"c-tree-1", t:"Issue tree và hypothesis tree khác nhau ở đâu", m:7, lv:2, out:"slide"},
  {id:"c-tree-2", t:"Dựng cây MECE trong 10 phút", m:8, lv:2, out:"slide"},
  {id:"c-tree-3", t:"Gắn dữ liệu cần tìm vào từng nhánh", m:7, lv:3, out:"checklist"}]},
{ id:"c-insight", track:"competition", n:"Tìm insight", vi:"Từ dữ liệu tới insight", lessons:[
  {id:"c-insight-1", t:"Quan sát, phát hiện và insight khác nhau thế nào", m:7, lv:2, out:"chart insight"},
  {id:"c-insight-2", t:"Ba phép cắt dữ liệu hay ra insight nhất", m:8, lv:3, out:"chart insight"},
  {id:"c-insight-3", t:"Kiểm chứng insight trước khi đưa lên slide", m:6, lv:3, out:"checklist"}]},
{ id:"c-deck", track:"competition", n:"Slide deck", vi:"Dựng bộ slide", lessons:[
  {id:"c-deck-1", t:"Cấu trúc deck 10 slide chuẩn thi", m:8, lv:3, out:"slide"},
  {id:"c-deck-2", t:"Tiêu đề hành động: mỗi slide một thông điệp", m:7, lv:3, out:"slide"},
  {id:"c-deck-3", t:"Chọn biểu đồ đúng cho từng loại thông điệp", m:8, lv:3, out:"chart insight"}]},
{ id:"c-story", track:"competition", n:"Storyline", vi:"Mạch kể", lessons:[
  {id:"c-story-1", t:"Pyramid principle cho một bài thi 15 phút", m:8, lv:3, out:"slide"}]},
{ id:"c-pitch", track:"competition", n:"Pitching", vi:"Trình bày", lessons:[
  {id:"c-pitch-1", t:"Phân vai và nhịp 15 phút cho nhóm 4 người", m:7, lv:3, out:"speaking answer"}]},
{ id:"c-qa", track:"competition", n:"Q&A với ban giám khảo", vi:"Trả lời phản biện", lessons:[
  {id:"c-qa-1", t:"Năm câu hỏi ban giám khảo luôn hỏi", m:8, lv:4, out:"speaking answer"},
  {id:"c-qa-2", t:"Bảo vệ giả định mà không cố chấp", m:7, lv:4, out:"speaking answer"},
  {id:"c-qa-3", t:"Khi bị chỉ ra lỗi tính toán giữa buổi", m:6, lv:4, out:"speaking answer"}]},

/* ============ 7. CASE METHOD — Tầng 2, họ case ============ */
{ id:"k-profit", track:"method", n:"Profit family", vi:"Họ 1 · Lợi nhuận", lessons:[
  {id:"k-profit-1", t:"Nhận diện case lợi nhuận", m:7, lv:2, out:"recommendation"},
  {id:"k-profit-2", t:"Cây chuẩn và ba biến thể", m:8, lv:2, out:"slide"},
  {id:"k-profit-3", t:"Ba yêu cầu dữ liệu đắt giá nhất", m:8, lv:2, out:"chart insight"},
  {id:"k-profit-4", t:"Bốn bẫy và hình dạng lời giải tốt", m:8, lv:3, out:"calculation"}]},

/* ============ 3. CONSULTING CASE INTERVIEW — 22 bài ============ */
{ id:"i-profit", track:"consulting", n:"Profitability case", vi:"Case lợi nhuận", lessons:[
  {id:"i-profit-1", t:"Nhận diện case lợi nhuận trong 10 giây", m:6, lv:2, out:"speaking answer"},
  {id:"i-profit-2", t:"Cây chuẩn và ba yêu cầu dữ liệu đắt giá nhất", m:8, lv:2, out:"slide"},
  {id:"i-profit-3", t:"Bốn bẫy kinh điển", m:7, lv:3, out:"recommendation"}]},
{ id:"i-entry", track:"consulting", n:"Market entry", vi:"Thâm nhập thị trường", lessons:[
  {id:"i-entry-1", t:"Ba tầng câu hỏi: thị trường, kinh tế, năng lực", m:8, lv:2, out:"slide"},
  {id:"i-entry-2", t:"Lợi thế nào chuyển giao được", m:7, lv:3, out:"recommendation"},
  {id:"i-entry-3", t:"Vào lớn, vào nhỏ hay không vào", m:7, lv:3, out:"recommendation"}]},
{ id:"i-growth", track:"consulting", n:"Growth strategy", vi:"Chiến lược tăng trưởng", lessons:[
  {id:"i-growth-1", t:"Bốn hướng tăng trưởng và thứ tự xét", m:7, lv:2, out:"slide"},
  {id:"i-growth-2", t:"Giá × sản lượng × cơ cấu", m:8, lv:2, out:"calculation"},
  {id:"i-growth-3", t:"Khi tăng trưởng phá huỷ giá trị", m:7, lv:3, out:"recommendation"}]},
{ id:"i-ma", track:"consulting", n:"M&A", vi:"Mua bán sáp nhập", lessons:[
  {id:"i-ma-1", t:"Ba câu hỏi: giá trị, giá phải trả, rủi ro thực thi", m:8, lv:3, out:"slide"},
  {id:"i-ma-2", t:"Synergy: loại nào có thật, loại nào tưởng tượng", m:8, lv:3, out:"calculation"},
  {id:"i-ma-3", t:"Định giá nhanh trong 5 phút", m:7, lv:3, out:"calculation"}]},
{ id:"i-ops", track:"consulting", n:"Operations improvement", vi:"Cải thiện vận hành", lessons:[
  {id:"i-ops-1", t:"Tìm nút thắt trước khi tối ưu bất cứ gì", m:7, lv:2, out:"chart insight"},
  {id:"i-ops-2", t:"Công suất, tỷ lệ lấp đầy và chi phí đơn vị", m:8, lv:2, out:"calculation"},
  {id:"i-ops-3", t:"Chi phí nào không được cắt", m:7, lv:3, out:"recommendation"}]},
{ id:"i-price", track:"consulting", n:"Pricing case", vi:"Case định giá", lessons:[
  {id:"i-price-1", t:"Khung ba bước: chi phí sàn, giá trị trần, đối thủ ở giữa", m:8, lv:2, out:"slide"},
  {id:"i-price-2", t:"Tính tác động giá lên biên đóng góp", m:7, lv:2, out:"calculation"},
  {id:"i-price-3", t:"Dự đoán phản ứng đối thủ", m:7, lv:3, out:"recommendation"}]},
{ id:"i-brain", track:"consulting", n:"Brainstorming", vi:"Câu hỏi mở", lessons:[
  {id:"i-brain-1", t:"Bung ý có cấu trúc thay vì liệt kê ngẫu nhiên", m:6, lv:2, out:"speaking answer"}]},
{ id:"i-chart", track:"consulting", n:"Chart interpretation", vi:"Đọc biểu đồ", lessons:[
  {id:"i-chart-1", t:"Quy trình 30 giây đọc một biểu đồ lạ", m:7, lv:2, out:"chart insight"},
  {id:"i-chart-2", t:"Bảy loại biểu đồ hay gặp và cái bẫy của từng loại", m:9, lv:2, out:"chart insight"},
  {id:"i-chart-3", t:"Từ biểu đồ tới câu 'vậy thì sao'", m:7, lv:3, out:"speaking answer"}]},

/* ============ 4. MARKETING CASE — 14 bài ============ */
{ id:"m-brand", track:"marketing", n:"Brand positioning", vi:"Định vị thương hiệu", lessons:[
  {id:"m-brand-1", t:"Định vị là một câu, không phải một slogan", m:7, lv:2, out:"slide"},
  {id:"m-brand-2", t:"Bản đồ định vị và khoảng trống thật", m:8, lv:2, out:"chart insight"}]},
{ id:"m-gtm", track:"marketing", n:"Go-to-market", vi:"Ra mắt thị trường", lessons:[
  {id:"m-gtm-1", t:"Bốn quyết định của một kế hoạch GTM", m:8, lv:2, out:"slide"},
  {id:"m-gtm-2", t:"Chọn kênh theo hành vi mua, không theo xu hướng", m:7, lv:2, out:"recommendation"},
  {id:"m-gtm-3", t:"Kế hoạch 90 ngày đầu", m:7, lv:3, out:"slide"}]},
{ id:"m-stp", track:"marketing", n:"STP", vi:"Phân khúc – Mục tiêu – Định vị", lessons:[
  {id:"m-stp-1", t:"Ba bước STP và lỗi hay mắc ở từng bước", m:8, lv:2, out:"slide"},
  {id:"m-stp-2", t:"Chọn một phân khúc và dám bỏ phần còn lại", m:7, lv:3, out:"recommendation"}]},
{ id:"m-4p", track:"marketing", n:"4P / 7P", vi:"Hỗn hợp marketing", lessons:[
  {id:"m-4p-1", t:"4P không phải checklist, là bộ đánh đổi", m:7, lv:2, out:"slide"}]},
{ id:"m-journey", track:"marketing", n:"Customer journey", vi:"Hành trình khách hàng", lessons:[
  {id:"m-journey-1", t:"Vẽ hành trình từ dữ liệu, không từ tưởng tượng", m:8, lv:2, out:"chart insight"},
  {id:"m-journey-2", t:"Tìm điểm rò rỉ lớn nhất trong phễu", m:7, lv:2, out:"calculation"}]},
{ id:"m-campaign", track:"marketing", n:"Campaign strategy", vi:"Chiến dịch", lessons:[
  {id:"m-campaign-1", t:"Từ mục tiêu kinh doanh tới mục tiêu chiến dịch", m:7, lv:2, out:"slide"},
  {id:"m-campaign-2", t:"Phân bổ ngân sách giữa các kênh", m:8, lv:3, out:"calculation"}]},
{ id:"m-metrics", track:"marketing", n:"Marketing metrics", vi:"Chỉ số marketing", lessons:[
  {id:"m-metrics-1", t:"Chỉ số phù phiếm và chỉ số thật", m:7, lv:2, out:"chart insight"},
  {id:"m-metrics-2", t:"Đo hiệu quả khi không thể đo trực tiếp", m:8, lv:3, out:"calculation"}]},

/* ============ 5. SUPPLY CHAIN & OPERATIONS — 12 bài ============ */
{ id:"s-forecast", track:"supplychain", n:"Demand forecasting", vi:"Dự báo nhu cầu", lessons:[
  {id:"s-forecast-1", t:"Ba cách dự báo và sai số chấp nhận được", m:8, lv:2, out:"calculation"},
  {id:"s-forecast-2", t:"Cái giá của dự báo sai theo hai hướng", m:7, lv:2, out:"calculation"}]},
{ id:"s-inventory", track:"supplychain", n:"Inventory", vi:"Tồn kho", lessons:[
  {id:"s-inventory-1", t:"Vòng quay tồn kho và tiền bị chôn", m:7, lv:2, out:"calculation"},
  {id:"s-inventory-2", t:"Tồn kho an toàn: đệm cho cái gì", m:8, lv:2, out:"calculation"}]},
{ id:"s-capacity", track:"supplychain", n:"Capacity", vi:"Công suất", lessons:[
  {id:"s-capacity-1", t:"Công suất thiết kế và công suất thật", m:7, lv:2, out:"calculation"},
  {id:"s-capacity-2", t:"Quyết định mở rộng công suất", m:8, lv:3, out:"recommendation"}]},
{ id:"s-bottle", track:"supplychain", n:"Bottleneck", vi:"Nút thắt cổ chai", lessons:[
  {id:"s-bottle-1", t:"Tìm nút thắt bằng ba phép đo", m:8, lv:2, out:"chart insight"},
  {id:"s-bottle-2", t:"Tối ưu chỗ không phải nút thắt là lãng phí", m:7, lv:2, out:"recommendation"}]},
{ id:"s-logistics", track:"supplychain", n:"Logistics", vi:"Vận chuyển & giao hàng", lessons:[
  {id:"s-logistics-1", t:"Mật độ giao hàng quan trọng hơn quy mô", m:8, lv:2, out:"calculation"},
  {id:"s-logistics-2", t:"Chi phí chặng cuối và cách hạ nó", m:7, lv:3, out:"recommendation"}]},
{ id:"s-cost", track:"supplychain", n:"Cost optimization", vi:"Tối ưu chi phí", lessons:[
  {id:"s-cost-1", t:"Quy tắc 80/20 khi đọc nền chi phí", m:7, lv:2, out:"chart insight"}]},
{ id:"s-service", track:"supplychain", n:"Service level", vi:"Mức phục vụ", lessons:[
  {id:"s-service-1", t:"Đánh đổi giữa mức phục vụ và chi phí", m:8, lv:3, out:"calculation"}]},

/* ============ 6. FINANCE FOR BUSINESS CASE — 10 bài ============ */
{ id:"n-revenue", track:"finance", n:"Revenue model", vi:"Mô hình doanh thu", lessons:[
  {id:"n-revenue-1", t:"Viết công thức doanh thu ra giấy", m:7, lv:1, out:"calculation"},
  {id:"n-revenue-2", t:"Doanh thu định kỳ và doanh thu một lần", m:7, lv:2, out:"slide"}]},
{ id:"n-cost", track:"finance", n:"Cost structure", vi:"Cấu trúc chi phí", lessons:[
  {id:"n-cost-1", t:"Cố định, biến đổi và bán biến đổi", m:7, lv:1, out:"calculation"}]},
{ id:"n-margin", track:"finance", n:"Margin", vi:"Biên lợi nhuận", lessons:[
  {id:"n-margin-1", t:"Bốn loại biên và dùng cái nào khi nào", m:8, lv:2, out:"calculation"}]},
{ id:"n-breakeven", track:"finance", n:"Break-even", vi:"Điểm hoà vốn", lessons:[
  {id:"n-breakeven-1", t:"Hoà vốn theo sản lượng và theo doanh thu", m:7, lv:2, out:"calculation"}]},
{ id:"n-roi", track:"finance", n:"ROI", vi:"Tỷ suất sinh lời", lessons:[
  {id:"n-roi-1", t:"ROI, ROIC và thời gian hoàn vốn", m:8, lv:2, out:"calculation"},
  {id:"n-roi-2", t:"So sánh dự án khác quy mô", m:7, lv:3, out:"recommendation"}]},
{ id:"n-npv", track:"finance", n:"NPV basics", vi:"Giá trị hiện tại ròng", lessons:[
  {id:"n-npv-1", t:"Vì sao một đồng hôm nay khác một đồng năm sau", m:8, lv:2, out:"calculation"},
  {id:"n-npv-2", t:"NPV, IRR và khi IRR nói dối", m:9, lv:3, out:"calculation"}]},
{ id:"n-sens", track:"finance", n:"Sensitivity analysis", vi:"Phân tích độ nhạy", lessons:[
  {id:"n-sens-1", t:"Tìm biến số làm đổi kết luận", m:8, lv:3, out:"chart insight"}]}
];

window.TRACK_BY_ID  = Object.fromEntries(window.TRACKS.map(t=>[t.id,t]));
window.MODULE_BY_ID = Object.fromEntries(window.MODULES.map(m=>[m.id,m]));
window.LESSONS = window.MODULES.flatMap(m => m.lessons.map(l => Object.assign({}, l, {module:m.id, track:m.track})));
window.LESSON_BY_ID = Object.fromEntries(window.LESSONS.map(l=>[l.id,l]));
