window.VIEWS = window.VIEWS || {};

/* ===== ĐIỀU KHOẢN · MIỄN TRỪ · QUYỀN RIÊNG TƯ =====
   Sản phẩm nói về doanh nghiệp có thật nên phần miễn trừ không phải thủ tục — nó là điều kiện để tồn tại tử tế. */
window.VIEWS.terms = function(){
  const sections = [
    { id:"data", h:"Về số liệu doanh nghiệp", vi:"Quan trọng nhất — đọc kỹ phần này",
      tone:"warn",
      body:[
        "Mọi con số trong hồ sơ doanh nghiệp và trong case là <b>ước lượng theo bậc độ lớn</b>, được dựng lại nhằm mục đích luyện tư duy. Chúng không phải số liệu kiểm toán, không lấy từ báo cáo tài chính đã công bố, và không nên được trích dẫn như dữ liệu thật.",
        "Số liệu trong case là <b>dữ liệu giả lập</b> được thiết kế để bài toán có lời giải rõ ràng. Một chuỗi cà phê 180 cửa hàng trong case không phải một doanh nghiệp cụ thể nào.",
        "Nội dung ở đây là <b>bình luận và phân tích cho mục đích giáo dục</b>. Nó không phải tư vấn đầu tư, tư vấn tài chính, hay khuyến nghị mua bán chứng khoán. Đừng dùng nó để ra quyết định tiền bạc.",
        "Tên thương hiệu và tên doanh nghiệp thuộc về chủ sở hữu của chúng. Chúng tôi sử dụng trong khuôn khổ bình luận và giáo dục, không hàm ý liên kết, tài trợ hay xác nhận từ các doanh nghiệp được nhắc tới."
      ]},

    { id:"takedown", h:"Nếu bạn đại diện một doanh nghiệp được nhắc tới", vi:"Quy trình đính chính và gỡ nội dung",
      body:[
        "Nếu một mô tả về doanh nghiệp của bạn là sai, gây hiểu nhầm, hoặc bạn muốn nội dung được gỡ, chúng tôi xử lý theo nguyên tắc sau:",
        "<b>Đính chính trong 7 ngày làm việc</b> nếu bạn chỉ ra chỗ sai cụ thể. Chúng tôi sửa và ghi nhận đã sửa.",
        "<b>Gỡ trong 14 ngày làm việc</b> nếu bạn yêu cầu gỡ, không cần bạn giải thích lý do. Chúng tôi không tranh cãi về việc này.",
        "Chúng tôi không đăng số liệu tài chính chưa công bố, không suy diễn về cá nhân trong ban lãnh đạo, và không mô tả doanh nghiệp theo hướng có thể hiểu là cáo buộc."
      ]},

    { id:"cert", h:"Về chứng chỉ", vi:"Nó là gì và không phải là gì",
      body:[
        "Chứng chỉ trong sản phẩm này ghi nhận rằng bạn đã hoàn thành toàn bộ bài học của một lộ trình và đạt điểm yêu cầu ở bài kiểm tra cuối.",
        "Nó <b>không phải chứng chỉ nghề nghiệp được công nhận</b>, không được cấp bởi tổ chức kiểm định nào, và không có giá trị pháp lý trong tuyển dụng.",
        "Chúng tôi không cam kết bạn sẽ vượt qua bất kỳ vòng phỏng vấn nào. Kết quả phỏng vấn phụ thuộc vào rất nhiều yếu tố nằm ngoài sản phẩm này."
      ]},

    { id:"privacy", h:"Dữ liệu học tập của bạn", vi:"Ai giữ, giữ ở đâu",
      tone:"good",
      body:[
        "Ở phiên bản hiện tại, <b>toàn bộ tiến độ học của bạn được lưu trong chính trình duyệt bạn đang dùng</b> (localStorage). Không có tài khoản, không có máy chủ, và <b>không có dữ liệu nào được gửi đi đâu cả</b>.",
        "Hệ quả: xoá dữ liệu duyệt web, đổi máy hoặc dùng chế độ ẩn danh sẽ làm mất tiến độ. Vì vậy sản phẩm có mục <b>Sao lưu tiến độ</b> trong Dossier để bạn tự xuất ra file và nạp lại.",
        "Chúng tôi không đặt mã theo dõi của bên thứ ba, không quảng cáo, không bán dữ liệu. Website có tải phông chữ từ Google Fonts — đây là kết nối duy nhất ra bên ngoài.",
        "Khi tính năng tài khoản được mở, phần này sẽ được viết lại và bạn sẽ được thông báo trước khi bất kỳ dữ liệu nào rời khỏi máy của bạn."
      ]},

    { id:"use", h:"Cách sử dụng nội dung", vi:"Được và không được",
      body:[
        "Bạn <b>được</b> dùng nội dung để tự học, ôn phỏng vấn, và thảo luận trong nhóm học tập.",
        "Bạn <b>được</b> trích dẫn ngắn kèm dẫn nguồn.",
        "Bạn <b>không được</b> sao chép toàn bộ case hoặc bài học để bán lại, đăng lại thành khoá học của mình, hoặc dùng làm dữ liệu huấn luyện thương mại mà không có thoả thuận."
      ]},

    { id:"changes", h:"Thay đổi và trách nhiệm", vi:"",
      body:[
        "Sản phẩm đang trong giai đoạn phát triển. Nội dung, tính năng và giá có thể thay đổi. Những thay đổi ảnh hưởng tới người đã trả tiền sẽ được thông báo trước.",
        "Sản phẩm được cung cấp <b>nguyên trạng</b>. Chúng tôi cố gắng để nội dung chính xác nhưng không bảo đảm không có sai sót. Nếu bạn thấy một phép tính sai hay một lập luận hỏng, hãy báo — chúng tôi sẽ sửa và ghi nhận."
      ]}
  ];

  return `<div class="wrap" style="max-width:920px">
  <section class="sec">
    <h1 style="font-size:40px">Điều khoản &amp; miễn trừ</h1>
    <div class="mono" style="font-size:12px;font-weight:600;color:var(--brass-2);letter-spacing:.1em;text-transform:uppercase;margin-top:8px">
      Terms · Disclaimer · Privacy</div>
    <p class="muted" style="margin-top:16px;max-width:68ch;font-size:16px">
      Sản phẩm này nói về doanh nghiệp có thật, nên phần miễn trừ dưới đây không phải thủ tục cho có.
      Nó viết bằng tiếng Việt bình thường, không có chữ nhỏ.
    </p>
    <div class="mono" style="font-size:11.5px;color:var(--dim);margin-top:14px">Cập nhật lần cuối: 24/08/2026</div>
  </section>

  <section class="sec">
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:22px">
      ${sections.map(s=>'<a class="chip" href="#'+s.id+'" onclick="document.getElementById(\''+s.id+'\').scrollIntoView({behavior:\'smooth\'});return false">'+UI.esc(s.h)+'</a>').join("")}
    </div>
    <div style="display:flex;flex-direction:column;gap:16px">
      ${sections.map((s,i)=>`
        <div class="panel" id="${s.id}" style="${s.tone==="warn"?"border-left:3px solid var(--brass)":(s.tone==="good"?"border-left:3px solid var(--pos)":"")}">
          <div class="panel-h"><b>${String(i+1).padStart(2,"0")} — ${UI.esc(s.h)}</b>
            ${s.vi?'<span class="gloss" style="text-transform:none;letter-spacing:0">· '+UI.esc(s.vi)+'</span>':''}</div>
          <div class="panel-b">
            ${s.body.map(p=>'<p class="muted" style="font-size:14.4px;margin:0 0 12px">'+p+'</p>').join("")}
          </div>
        </div>`).join("")}
    </div>
  </section>

  <section class="sec" style="padding-bottom:40px">
    <div class="panel" style="border-left:3px solid var(--color-primary)"><div class="panel-b">
      <div style="font-family:var(--head);font-size:19px;font-weight:600">Liên hệ</div>
      <p class="muted" style="font-size:14.4px;margin:10px 0 0">
        Báo lỗi nội dung, yêu cầu đính chính, hợp tác lớp học hay bất cứ điều gì trong trang này —
        gửi kèm đường dẫn tới đúng case hoặc bài học để chúng tôi xử lý nhanh hơn.
      </p>
    </div></div>
  </section>
</div>`;
};
