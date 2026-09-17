/* ===== CHI TIẾT LỘ TRÌNH NGHỀ =====
   Mỗi chuỗi viết dạng [vi, en]: bản vi lưu vào dữ liệu, bản en vào từ điển I18N.
   Trường thêm cho mỗi nghề:
   types   – dạng case trong thư viện liên quan (khớp CASES[].type)
   week    – một tuần làm việc điển hình
   ladder  – nấc thăng tiến {t, y, d}
   hiring  – các vòng tuyển {t, d}
   cases   – câu hỏi case hay gặp {q, move}: move = nước đi đầu tiên nên làm
   pitfalls– lỗi ứng viên hay mắc
   fit     – {yes:[], no:[]} */
(function(){
  const DICT = {};
  const P = x => Array.isArray(x) ? (DICT[x[0]] = x[1], x[0]) : x;

  window.CAREER_DETAIL = (id, o) => {
    const c = window.CAREER_BY_ID && window.CAREER_BY_ID[id]; if(!c) return;
    Object.assign(c, {
      types:   o.types || [],
      week:    o.week.map(P),
      ladder:  o.ladder.map(([t,y,d]) => ({t:P(t), y:P(y), d:P(d)})),
      hiring:  o.hiring.map(([t,d]) => ({t:P(t), d:P(d)})),
      cases:   o.cases.map(([q,m]) => ({q:P(q), move:P(m)})),
      pitfalls:o.pitfalls.map(P),
      fit:     {yes:o.fit.yes.map(P), no:o.fit.no.map(P)}
    });
    if(window.I18N) I18N.add(DICT);
  };

  /* chữ giao diện của trang chi tiết */
  if(window.I18N) I18N.add({
    "Một tuần điển hình":"A typical week",
    "Lộ trình thăng tiến":"Career ladder",
    "Quy trình tuyển dụng":"Hiring process",
    "Câu hỏi case hay gặp":"Case questions you will meet",
    "Nước đi đầu tiên":"First move",
    "Hợp với bạn nếu":"A good fit if",
    "Cân nhắc lại nếu":"Think twice if",
    "Lỗi ứng viên hay mắc":"Common candidate mistakes",
    "Luyện với case trong thư viện":"Practise with library cases",
    "Vòng":"Round",
    "Xem đáp án gợi ý":"Show suggested first move",
    "Chưa có case cùng dạng trong thư viện.":"No library case of this type yet.",

    /* tên vòng tuyển và chức danh viết một ngôn ngữ trong dữ liệu */
    "CV & bài test":"CV & test", "CV & test số":"CV & numeracy test", "CV & test trực tuyến":"CV & online tests",
    "CV & sàng lọc":"CV & screening", "CV & bài viết":"CV & writing sample", "CV & portfolio":"CV & portfolio",
    "Case vòng 1":"Case round 1", "Case vòng 2":"Case round 2", "Bài tập mang về":"Take-home exercise", "Bài tập":"Exercise",
    "Gặp lãnh đạo":"Meet leadership", "Gặp quản lý":"Meet the manager", "Gặp partner":"Meet a partner",
    "Gặp trưởng bộ phận":"Meet the department head", "Gặp trưởng phòng":"Meet the head of research",
    "Gặp lãnh đạo khối":"Meet the division head", "Gặp giám đốc":"Meet the director",
    "Gặp quản lý vùng":"Meet the area manager", "Gặp giám đốc xưởng":"Meet the plant manager", "Gặp stakeholder":"Meet stakeholders",
    "Case kinh doanh–công nghệ":"Business–technology case", "Phỏng vấn kỹ thuật nhẹ":"Light technical interview",
    "Case thị trường":"Market case", "Đàm phán giả lập":"Negotiation role-play", "Case đầu tư":"Investment case",
    "Model LBO / định giá":"LBO / valuation model", "Case chênh lệch":"Variance case", "Phỏng vấn với quản lý":"Manager interview",
    "Bài viết mẫu":"Writing sample", "Case hồ sơ vay":"Loan file case", "Phỏng vấn chuyên môn":"Technical interview",
    "Bài tập marketing":"Marketing exercise", "Phỏng vấn năng lực":"Competency interview", "Case phễu":"Funnel case",
    "Case khuyến mãi":"Promotion case", "Đi thị trường":"Market visit", "Case giữ chân":"Retention case",
    "Bài tập định vị":"Positioning exercise", "Trình bày ra mắt":"Launch presentation", "Test kỹ thuật":"Technical test",
    "Case kiểu consulting":"Consulting-style case", "Case chi phí":"Cost case", "Case mạng lưới":"Network case",
    "Đi hiện trường":"Site visit", "Case cửa hàng":"Store case", "Thực tế cửa hàng":"Store trial shifts",
    "Kiến thức chuẩn mực":"Standards knowledge", "Bài test viết":"Written test", "Hội đồng":"Panel",
    "Vườn ươm / chương trình":"Incubator / programme", "Điều khoản":"Term sheet", "Case ý tưởng mới":"New idea case",
    "Chief Strategy Officer / CEO khối":"Chief Strategy Officer / Division CEO",
    "CEO công ty con / Chief Innovation Officer":"Subsidiary CEO / Chief Innovation Officer"
  });
})();
