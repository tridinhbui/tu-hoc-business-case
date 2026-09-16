window.VIEWS = window.VIEWS || {};

/* ===== GIÁ & GÓI =====
   Thanh toán chưa mở. Trang này nói rõ trạng thái thật thay vì giả vờ đã bán được. */
window.PLANS = [
 { id:"free", name:"Free", vi:"Miễn phí", price:"0đ", per:"", tone:"",
   pitch:"Đủ để đi hết một lộ trình và biết mình có hợp với cách học này không.",
   has:["Track Foundations đầy đủ — 5 module · 20 bài học",
        "8 case mission cơ bản",
        "Daily Challenge mỗi ngày",
        "Business Model Explorer · 12 mô hình",
        "Hồ sơ 47 doanh nghiệp",
        "Chấm điểm 5 tiêu chí sau mỗi case"],
   hasnt:["Track Case Cracking và Vietnam Business","Case độ khó Hard và Expert","Chứng chỉ cuối lộ trình","Ôn tập giãn cách"] },

 { id:"pro", name:"Pro", vi:"Theo tháng", price:"249.000đ", per:"/ tháng", tone:"feature",
   pitch:"Toàn bộ nội dung, không giới hạn. Huỷ bất cứ lúc nào.",
   has:["Mọi thứ trong gói Free",
        "Cả 3 lộ trình — 16 module · 64 bài học",
        "Toàn bộ "+window.CASES.length+" case, mọi độ khó",
        "Bài kiểm tra cuối lộ trình và chứng chỉ",
        "Ôn tập giãn cách theo thuật ngữ",
        "Company Battles và case nhiều kết cục",
        "Nội dung mới hàng tháng"],
   hasnt:[] },

 { id:"season", name:"Pro mùa tuyển", vi:"4 tháng", price:"599.000đ", per:"/ 4 tháng", tone:"",
   pitch:"Dành cho người đang chạy mùa Management Trainee tháng 8–11.",
   has:["Mọi thứ trong gói Pro, trọn 4 tháng",
        "2 lượt mock interview chấm tay",
        "Lộ trình ôn rút gọn theo ngày phỏng vấn",
        "Ưu tiên phản hồi trong 24 giờ"],
   hasnt:[], note:"Rẻ hơn 40% so với mua lẻ 4 tháng." },

 { id:"class", name:"Lớp & CLB", vi:"B2B2C", price:"từ 5.000.000đ", per:"/ 30 học viên / kỳ", tone:"",
   pitch:"Cho câu lạc bộ sinh viên, giảng viên và đội đào tạo nội bộ.",
   has:["Tài khoản Pro cho toàn bộ học viên",
        "Bảng theo dõi tiến độ cả lớp",
        "Giao bài theo hạn nộp",
        "Thống kê module cả lớp đang yếu",
        "Xuất bảng điểm CSV"],
   hasnt:[] }
];

window.VIEWS.pricing = function(){
  const faq = [
    {q:"Thanh toán đã mở chưa?",
     a:"Chưa. Toàn bộ nội dung hiện đang mở miễn phí trong lúc sản phẩm còn ở giai đoạn hoàn thiện. Trang này công bố trước mức giá dự kiến để bạn biết sản phẩm sẽ đi theo hướng nào."},
    {q:"Vì sao gói Free lại rộng như vậy?",
     a:"Vì một bản dùng thử cụt không cho bạn biết cách học này có hợp với mình không. Một lộ trình hoàn chỉnh thì có. Nếu 20 bài học của track Foundations không làm bạn giỏi lên, bạn không nên trả tiền cho phần còn lại."},
    {q:"Có gói trọn đời không?",
     a:"Không. Doanh thu một lần không nuôi được việc viết case mới hàng tháng — mà nội dung mới chính là lý do sản phẩm này còn đáng dùng sau 3 tháng."},
    {q:"Chứng chỉ có được nhà tuyển dụng công nhận không?",
     a:"Không, và chúng tôi không nói ngược lại. Chứng chỉ ở đây ghi nhận bạn đã hoàn thành và đạt bài kiểm tra của một lộ trình. Thứ thật sự giúp bạn khi phỏng vấn là kỹ năng giải case, không phải tờ giấy."},
    {q:"Có cam kết đậu phỏng vấn không?",
     a:"Không. Bất kỳ ai hứa điều đó đều đang hứa thứ họ không kiểm soát được. Chúng tôi cam kết đúng một điều: nội dung được thiết kế theo đúng năm tiêu chí mà hội đồng phỏng vấn thường dùng để chấm."},
    {q:"Số liệu doanh nghiệp trong case có chính xác không?",
     a:"Số liệu là ước lượng theo bậc độ lớn, dùng cho mục đích luyện tư duy, và được ghi rõ ở mọi hồ sơ. Đừng dùng chúng cho quyết định đầu tư. Xem thêm ở trang Điều khoản."}
  ];

  return `<div class="wrap">
  <section class="sec">
    <div style="max-width:64ch">
      <h1 style="font-size:42px">Giá &amp; gói</h1>
      <div class="mono" style="font-size:12px;font-weight:600;color:var(--brass-2);letter-spacing:.1em;text-transform:uppercase;margin-top:8px">Pricing · minh bạch, không chữ nhỏ</div>
      <p class="muted" style="margin-top:16px;font-size:16px">
        Sản phẩm hiện đang mở toàn bộ nội dung miễn phí. Bảng giá dưới đây là mức dự kiến khi thanh toán mở —
        công bố sớm để bạn biết mình đang dùng thứ gì và nó sẽ đi về đâu.
      </p>
    </div>
  </section>

  <section class="sec">
    <div class="grid g4" style="align-items:stretch">
      ${window.PLANS.map(p=>`
        <div class="panel plan${p.tone==="feature"?" plan-feature":""}">
          ${p.tone==="feature"?'<div class="plan-flag">Phổ biến nhất</div>':''}
          <div class="panel-b" style="display:flex;flex-direction:column;height:100%">
            <div class="plan-name">${UI.esc(p.name)}</div>
            <div class="mono" style="font-size:11px;color:var(--dim-2);font-weight:600;letter-spacing:.08em">${UI.esc(p.vi)}</div>
            <div class="plan-price">${UI.esc(p.price)}<span>${UI.esc(p.per)}</span></div>
            <p class="muted" style="font-size:13.5px;margin:10px 0 16px">${UI.esc(p.pitch)}</p>
            <ul class="plan-list">
              ${p.has.map(x=>'<li class="yes">'+UI.esc(x)+'</li>').join("")}
              ${p.hasnt.map(x=>'<li class="no">'+UI.esc(x)+'</li>').join("")}
            </ul>
            ${p.note?'<div class="mono" style="font-size:11px;color:var(--brass-2);font-weight:600;margin-top:12px">'+UI.esc(p.note)+'</div>':''}
            <div style="margin-top:auto;padding-top:18px">
              ${p.id==="free"
                ? '<a class="btn btn-sm btn-primary" style="width:100%;justify-content:center" href="#/learn">Bắt đầu học</a>'
                : (p.id==="class"
                  ? '<a class="btn btn-sm" style="width:100%;justify-content:center" href="#/terms">Liên hệ hợp tác</a>'
                  : '<button class="btn btn-sm" style="width:100%;justify-content:center" disabled>Sắp mở</button>')}
            </div>
          </div>
        </div>`).join("")}
    </div>
    <p class="mono" style="font-size:11.5px;color:var(--dim);margin-top:18px">
      Giá đã gồm thuế. Gói theo tháng huỷ bất cứ lúc nào, không ràng buộc kỳ hạn.
    </p>
  </section>

  <section class="sec">
    ${UI.secHead("So sánh","Gói nào có gì","")}
    <div class="panel"><div class="panel-b" style="overflow-x:auto">
      <table class="cmp-table" style="min-width:640px">
        <tr><th>Nội dung</th><th>Free</th><th>Pro</th><th>Mùa tuyển</th><th>Lớp &amp; CLB</th></tr>
        ${[
          ["Track Foundations · 20 bài học","✓","✓","✓","✓"],
          ["Track Case Cracking · 24 bài học","—","✓","✓","✓"],
          ["Track Vietnam Business · 20 bài học","—","✓","✓","✓"],
          ["Case mission","8","30","30","30"],
          ["Daily Challenge","✓","✓","✓","✓"],
          ["Bài kiểm tra &amp; chứng chỉ","—","✓","✓","✓"],
          ["Ôn tập giãn cách","—","✓","✓","✓"],
          ["Mock interview chấm tay","—","—","2 lượt","theo thoả thuận"],
          ["Bảng theo dõi cho người dạy","—","—","—","✓"]
        ].map(r=>`<tr><td class="dim" style="width:auto">${r[0]}</td>${r.slice(1).map(c=>
          `<td style="text-align:center;font-weight:600;color:${c==="—"?"var(--dim-2)":"var(--ink)"}">${c}</td>`).join("")}</tr>`).join("")}
      </table>
    </div></div>
  </section>

  <section class="sec" style="padding-bottom:40px">
    ${UI.secHead("Câu hỏi thường gặp","Những điều nên biết trước khi trả tiền","")}
    <div class="grid g2">
      ${faq.map(f=>`<div class="panel"><div class="panel-b">
        <div style="font-family:var(--head);font-size:17px;font-weight:600;line-height:1.35">${UI.esc(f.q)}</div>
        <p class="muted" style="font-size:13.8px;margin:10px 0 0">${UI.esc(f.a)}</p>
      </div></div>`).join("")}
    </div>
    <div class="panel" style="margin-top:16px;border-left:3px solid var(--brass)">
      <div class="panel-b">
        <p class="muted" style="margin:0;font-size:14px">
          Đọc thêm <a href="#/terms" style="color:var(--brass-2);font-weight:600">Điều khoản, miễn trừ và quyền riêng tư</a> —
          đặc biệt phần về số liệu doanh nghiệp và cách dữ liệu học tập của bạn được lưu.
        </p>
      </div>
    </div>
  </section>
</div>`;
};
