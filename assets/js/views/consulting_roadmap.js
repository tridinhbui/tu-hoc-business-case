/* ══════════════════════════════════════════════════════════════════
   Tự học Business Case — Consulting Roadmap & Stepping Islands Landscape View
   (Phong cách Illustrated Landscape Roadmap cho Management Consulting)
   ══════════════════════════════════════════════════════════════════ */
window.VIEWS = window.VIEWS || {};

(function(){

const STATIONS = [
  {
    id: "st-1",
    num: "01",
    title: "Tư duy cấu trúc & Khung MECE",
    desc: "Nguyên lý MECE, cấu trúc cây vấn đề (Issue Tree) bóc tách toàn diện mọi bài toán kinh doanh.",
    lessons: 18,
    done: 1,
    unlocked: true,
    current: true,
    icon: `<svg width="36" height="36" viewBox="0 0 40 40" fill="none">
      <rect x="4" y="8" width="32" height="26" rx="4" fill="#ECFDF5" stroke="#059669" stroke-width="2"/>
      <path d="M12 16H28M12 22H24M12 28H18" stroke="#059669" stroke-width="2" stroke-linecap="round"/>
      <circle cx="30" cy="12" r="3" fill="#10B981"/>
    </svg>`,
    lessonList: [
      { id: "c-tree-1", title: "Khung tư duy MECE là gì? Nguyên tắc Không Trùng Lặp & Không Bỏ Sót", min: 6, xp: 50, done: true },
      { id: "c-tree-2", title: "Xây dựng Issue Tree giải bài toán Doanh thu sụt giảm", min: 8, xp: 60, done: false },
      { id: "c-frame-1", title: "Kim tự tháp Minto (Pyramid Principle) trong giao tiếp Top-down", min: 7, xp: 50, done: false },
      { id: "c-read-1", title: "Cách đọc và bóc tách dữ liệu biểu đồ kinh doanh (Chart Reading)", min: 6, xp: 40, done: false }
    ]
  },
  {
    id: "st-2",
    num: "02",
    title: "Phân tích Lợi nhuận (Profitability)",
    desc: "Bóc tách Lợi nhuận = Doanh thu (P × Q) - Chi phí (FC + VC), tìm điểm rò rỉ dòng tiền.",
    lessons: 16,
    done: 0,
    unlocked: false,
    current: false,
    icon: `<svg width="36" height="36" viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="15" fill="#FAF8F5" stroke="#A8A29E" stroke-width="1.8"/>
      <path d="M14 26L18 20L22 23L26 15" stroke="#78716C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="26" cy="15" r="2" fill="#D97706"/>
    </svg>`,
    lessonList: [
      { id: "f-profit-1", title: "Cấu trúc Profitability Framework chuẩn MBB", min: 7, xp: 50, done: false },
      { id: "f-profit-2", title: "Phân tích phân khúc khách hàng & độ nhạy cảm giá", min: 8, xp: 60, done: false },
      { id: "f-profit-3", title: "Tối ưu chi phí cố định (FC) và biến phí (VC) trong sản xuất", min: 7, xp: 50, done: false }
    ]
  },
  {
    id: "st-3",
    num: "03",
    title: "Thâm nhập thị trường (Market Entry)",
    desc: "Ước lượng độ lớn thị trường (Market Sizing), rào cản gia nhập & lợi thế cạnh tranh.",
    lessons: 20,
    done: 0,
    unlocked: false,
    current: false,
    icon: `<svg width="36" height="36" viewBox="0 0 40 40" fill="none">
      <path d="M7 31L16 11L25 24L33 9" stroke="#78716C" stroke-width="2" stroke-linecap="round"/>
      <circle cx="33" cy="9" r="3" fill="#A8A29E"/>
    </svg>`,
    lessonList: [
      { id: "i-entry-1", title: "Ước lượng quy mô thị trường (Market Sizing: TAM, SAM, SOM)", min: 8, xp: 60, done: false },
      { id: "i-entry-2", title: "Đánh giá ma trận cạnh tranh 5 Áp lực của Porter", min: 7, xp: 50, done: false },
      { id: "i-entry-3", title: "Phương thức thâm nhập: Tự xây (Organic) vs M&A vs Hợp tác", min: 8, xp: 60, done: false }
    ]
  },
  {
    id: "st-4",
    num: "04",
    title: "M&A & Chiến lược Tăng trưởng",
    desc: "Thẩm định thương vụ Due Diligence, hiệp lực Synergy và định giá tài chính DCF/Comps.",
    lessons: 15,
    done: 0,
    unlocked: false,
    current: false,
    icon: `<svg width="36" height="36" viewBox="0 0 40 40" fill="none">
      <rect x="8" y="12" width="14" height="18" rx="2" fill="#FAF8F5" stroke="#A8A29E" stroke-width="1.8"/>
      <rect x="18" y="8" width="14" height="22" rx="2" fill="#FAF8F5" stroke="#A8A29E" stroke-width="1.8"/>
    </svg>`,
    lessonList: [
      { id: "i-ma-1", title: "Lý do doanh nghiệp M&A: Tăng trưởng, Thâu tóm hay Synergy?", min: 8, xp: 60, done: false },
      { id: "i-ma-2", title: "Đo lường Hiệp lực Doanh thu vs Hiệp lực Chi phí", min: 7, xp: 50, done: false }
    ]
  },
  {
    id: "st-5",
    num: "05",
    title: "Tối ưu Vận hành & Chuỗi cung ứng",
    desc: "Phân tích điểm nghẽn Bottleneck, thời gian chu kỳ Cycle Time và quản trị tồn kho.",
    lessons: 14,
    done: 0,
    unlocked: false,
    current: false,
    icon: `<svg width="36" height="36" viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="12" stroke="#A8A29E" stroke-width="1.8" stroke-dasharray="4 3"/>
      <circle cx="20" cy="20" r="4" fill="#78716C"/>
    </svg>`,
    lessonList: [
      { id: "s-bottle-1", title: "Xác định nút thắt cổ chai (Bottleneck Analysis) trong chuỗi", min: 7, xp: 50, done: false },
      { id: "s-inventory-1", title: "Mô hình Just-In-Time và cân bằng tồn kho an toàn", min: 8, xp: 60, done: false }
    ]
  },
  {
    id: "st-6",
    num: "06",
    title: "Chiến lược Định giá (Pricing)",
    desc: "Định giá theo giá trị cảm nhận Value-based, độ co giãn giá và mô hình Freemium.",
    lessons: 12,
    done: 0,
    unlocked: false,
    current: false,
    icon: `<svg width="36" height="36" viewBox="0 0 40 40" fill="none">
      <path d="M12 28L28 12M20 28H28V20" stroke="#78716C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    lessonList: [
      { id: "f-pricing-1", title: "3 Phương pháp định giá: Cost-plus, Competitor, Value-based", min: 7, xp: 50, done: false },
      { id: "f-pricing-2", title: "Phân tầng giá (Tiered Pricing) và rào cản dịch chuyển", min: 8, xp: 60, done: false }
    ]
  },
  {
    id: "st-7",
    num: "07",
    title: "Kỹ năng Phỏng vấn Case & AI Mock",
    desc: "Luyện phỏng vấn 1-1 với Case Partner, ứng biến áp lực và tổng hợp khuyến nghị cuối cùng.",
    lessons: 22,
    done: 0,
    unlocked: false,
    current: false,
    icon: `<svg width="36" height="36" viewBox="0 0 40 40" fill="none">
      <path d="M8 12C8 9.79086 9.79086 8 12 8H28C30.2091 8 32 9.79086 32 12V22C32 24.2091 30.2091 26 28 26H16L10 31V26H12" stroke="#78716C" stroke-width="1.8" stroke-linejoin="round"/>
    </svg>`,
    lessonList: [
      { id: "c-pitch-1", title: "Cấu trúc bài thuyết trình 2 phút trước Ban Giám Đốc", min: 9, xp: 70, done: false },
      { id: "c-qa-1", title: "Kỹ thuật ứng biến khi giám khảo thử thách số liệu", min: 8, xp: 60, done: false }
    ]
  }
];

let activeTab = "tab-direction"; // tab-direction, tab-pace, tab-method, tab-faq

window.ROADMAP_UI = {
  selectTab: function(tabId) {
    activeTab = tabId;
    document.querySelectorAll(".rm-nav-tab").forEach(t => t.classList.remove("active"));
    const el = document.getElementById(tabId);
    if(el) el.classList.add("active");

    const contentEl = document.getElementById("rmTabContent");
    if(contentEl) {
      if(tabId === "tab-direction") {
        contentEl.innerHTML = ROADMAP_UI.renderMapSection();
      } else if(tabId === "tab-pace") {
        contentEl.innerHTML = ROADMAP_UI.renderPaceSection();
      } else if(tabId === "tab-method") {
        contentEl.innerHTML = ROADMAP_UI.renderMethodSection();
      } else if(tabId === "tab-faq") {
        contentEl.innerHTML = ROADMAP_UI.renderFaqSection();
      }
    }
  },

  openStation: function(stationId) {
    const st = STATIONS.find(s => s.id === stationId);
    if(!st) return;

    const overlay = document.createElement("div");
    overlay.className = "sr-overlay";
    overlay.innerHTML = `
      <div class="sr-box" style="max-width:580px; padding:28px 24px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:16px;">
          <div>
            <span class="eyebrow" style="color:var(--color-primary);">TRẠM ${st.num} · ${st.unlocked ? 'ĐÃ MỞ' : 'KHÓA CẤP ĐỘ'}</span>
            <h2 style="font-size:22px; margin-top:4px; color:var(--text);">${UI.esc(st.title)}</h2>
            <p class="muted" style="font-size:13px; margin-top:4px;">${UI.esc(st.desc)}</p>
          </div>
          <button class="sr-esc" onclick="this.closest('.sr-overlay').remove()">✕</button>
        </div>

        <div style="background:var(--stone-50); border:1px solid var(--border); border-radius:12px; padding:12px 16px; margin-bottom:18px; display:flex; justify-content:space-between; font-size:12px; font-weight:700;">
          <span>Tiến độ: <strong style="color:var(--color-primary);">${st.done}/${st.lessons} bài</strong> (${Math.round(st.done/st.lessons*100)}%)</span>
          <span>Phần thưởng: <strong style="color:var(--color-accent);">+250 XP &amp; Huy hiệu</strong></span>
        </div>

        <div style="display:flex; flex-direction:column; gap:8px; max-height:280px; overflow-y:auto; padding-right:4px;">
          ${st.lessonList.map((l, i) => `
            <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 14px; background:#FFFFFF; border:1px solid var(--border); border-radius:10px;">
              <div>
                <div style="font-size:13px; font-weight:700; color:var(--text);">${i+1}. ${UI.esc(l.title)}</div>
                <div style="font-size:11px; color:var(--stone-500); margin-top:2px;">⏱ ${l.min} phút &nbsp;·&nbsp; +${l.xp} XP</div>
              </div>
              <div>
                ${l.done 
                  ? '<span class="tag brass" style="font-size:10.5px;">✓ ĐÃ XONG</span>' 
                  : (st.unlocked 
                      ? `<a class="btn btn-sm btn-primary" href="#/lesson/${l.id}" onclick="this.closest('.sr-overlay').remove()">Vào học →</a>`
                      : '<span class="tag" style="color:var(--stone-400);">🔒 Khóa</span>')}
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
  },

  renderMapSection: function() {
    return `
<div class="rm-landscape-wrap">
  <!-- SƠ ĐỒ PHONG CẢNH ĐỒ HOẠ VẼ TAY (SVG Landscape Stepping Islands) -->
  <div class="rm-landscape-card">
    <svg class="rm-landscape-bg" viewBox="0 0 1100 520" preserveAspectRatio="none" fill="none">
      <!-- Nền đồi thoai thoải màu kem ngà ngả xanh nhẹ -->
      <path d="M0 160 C 220 100, 480 200, 720 120 C 920 60, 1050 140, 1100 120 L 1100 520 L 0 520 Z" fill="#F4F8F3" opacity="0.8"/>
      <path d="M0 260 C 280 180, 520 320, 800 220 C 980 160, 1060 240, 1100 230 L 1100 520 L 0 520 Z" fill="#EAF3EA" opacity="0.9"/>
      <path d="M0 360 C 240 320, 560 410, 840 340 C 1020 300, 1080 370, 1100 360 L 1100 520 L 0 520 Z" fill="#DFECDF" opacity="0.95"/>

      <!-- Dòng suối uốn lượn phong cách ink wash -->
      <path d="M 440 260 C 490 320, 520 380, 580 520" stroke="#BAE6FD" stroke-width="24" stroke-linecap="round" opacity="0.6"/>
      <path d="M 440 260 C 490 320, 520 380, 580 520" stroke="#E0F2FE" stroke-width="12" stroke-linecap="round" opacity="0.8"/>

      <!-- Con đường mòn lát đá nối 7 trạm -->
      <path d="M 120 180 C 180 260, 240 280, 320 280 C 420 280, 480 340, 560 340 C 660 340, 720 240, 800 240 C 880 240, 940 320, 1000 320" 
            stroke="#10B981" stroke-width="3.5" stroke-dasharray="7 6" fill="none" opacity="0.75"/>
    </svg>

    <!-- 7 TRẠM BƯỚC ĐỆM (STEPPING STONE ISLANDS) -->
    <div class="rm-islands-container">
      
      <!-- Điểm Xuất Phát & Trạm 01 (Active) -->
      <div class="rm-island-node island-1 active" style="left: 6%; top: 22%;" onclick="ROADMAP_UI.openStation('st-1')">
        <div class="rm-pin-badge">
          <span class="rm-pin-dot"></span> 📍 Bạn ở đây
        </div>
        <div class="rm-island-card current">
          <div class="rm-island-icon">${STATIONS[0].icon}</div>
          <div class="rm-island-body">
            <div class="rm-island-header">
              <span class="rm-island-num">01</span>
              <span class="rm-island-title">Tư duy cấu trúc &amp; Khung MECE</span>
            </div>
            <p class="rm-island-sub">Khung Minto, cây vấn đề Issue Tree phân tách doanh thu &amp; chi phí...</p>
            <div class="rm-island-progress">
              <div class="rm-prog-bar"><i style="width: 6%;"></i></div>
              <span class="rm-prog-txt">1/18 bài (6%)</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Trạm 02 (Profitability) -->
      <div class="rm-island-node island-2 locked" style="left: 28%; top: 46%;" onclick="ROADMAP_UI.openStation('st-2')">
        <div class="rm-island-card">
          <div class="rm-island-icon">${STATIONS[1].icon}</div>
          <div class="rm-island-body">
            <div class="rm-island-header">
              <span class="rm-island-num">02</span>
              <span class="rm-island-title">Phân tích Lợi nhuận</span>
              <span class="rm-lock-icon">🔒</span>
            </div>
            <p class="rm-island-sub">Lợi nhuận = P × Q - Chi phí, tìm điểm rò rỉ dòng tiền...</p>
            <div class="rm-island-progress">
              <div class="rm-prog-bar"><i style="width: 0%;"></i></div>
              <span class="rm-prog-txt">0/16 bài</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Trạm 03 (Market Entry) -->
      <div class="rm-island-node island-3 locked" style="left: 54%; top: 16%;" onclick="ROADMAP_UI.openStation('st-3')">
        <div class="rm-island-card">
          <div class="rm-island-icon">${STATIONS[2].icon}</div>
          <div class="rm-island-body">
            <div class="rm-island-header">
              <span class="rm-island-num">03</span>
              <span class="rm-island-title">Thâm nhập thị trường</span>
              <span class="rm-lock-icon">🔒</span>
            </div>
            <p class="rm-island-sub">Market Sizing (TAM/SAM/SOM), rào cản gia nhập &amp; Porter 5 Forces...</p>
            <div class="rm-island-progress">
              <div class="rm-prog-bar"><i style="width: 0%;"></i></div>
              <span class="rm-prog-txt">0/20 bài</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Trạm 04 (M&A & Growth) -->
      <div class="rm-island-node island-4 locked" style="left: 72%; top: 40%;" onclick="ROADMAP_UI.openStation('st-4')">
        <div class="rm-island-card">
          <div class="rm-island-icon">${STATIONS[3].icon}</div>
          <div class="rm-island-body">
            <div class="rm-island-header">
              <span class="rm-island-num">04</span>
              <span class="rm-island-title">M&amp;A &amp; Định Giá Thương Vụ</span>
              <span class="rm-lock-icon">🔒</span>
            </div>
            <p class="rm-island-sub">Due Diligence, hiệp lực Synergy &amp; định giá DCF...</p>
            <div class="rm-island-progress">
              <div class="rm-prog-bar"><i style="width: 0%;"></i></div>
              <span class="rm-prog-txt">0/15 bài</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>

  <!-- CÁC TRẠM TIẾP THEO DẠNG DANH SÁCH TINH GỌN (Trạm 5, 6, 7) -->
  <div style="margin-top: 24px; display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 14px;">
    ${STATIONS.slice(4).map(st => `
      <div class="rm-substation-card" onclick="ROADMAP_UI.openStation('${st.id}')">
        <div class="rm-sub-icon">${st.icon}</div>
        <div style="flex:1;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div style="font-size:13.5px; font-weight:800; color:var(--text);">${st.num}. ${st.title}</div>
            <span style="font-size:11px; color:var(--stone-400);">🔒 Khóa</span>
          </div>
          <p class="muted" style="font-size:12px; margin-top:3px; line-height:1.4;">${st.desc}</p>
          <div style="font-size:11px; font-weight:700; color:var(--stone-500); margin-top:6px;">0/${st.lessons} bài học</div>
        </div>
      </div>
    `).join("")}
  </div>
</div>`;
  },

  renderPaceSection: function() {
    return `
<div class="panel" style="padding: 28px; max-width:780px; margin:0 auto;">
  <div class="eyebrow" style="color:var(--color-primary);">02 CHỌN NHỊP HỌC</div>
  <h2 style="font-size:22px; margin-top:4px;">Bạn muốn dành bao nhiêu thời gian mỗi ngày?</h2>
  <p class="muted" style="font-size:13.5px; margin-top:4px;">Hệ thống sẽ gửi nhắc nhở nhẹ nhàng và tối ưu lượng bài tập phù hợp với lịch trình của bạn.</p>

  <div style="display:flex; flex-direction:column; gap:12px; margin-top:20px;">
    <div style="border:1.5px solid var(--color-primary); background:var(--emerald-50); border-radius:12px; padding:16px 20px; display:flex; justify-content:space-between; align-items:center; cursor:pointer;">
      <div>
        <div style="font-size:15px; font-weight:800; color:var(--emerald-900);">🌱 Nhịp bền vững: 6 - 8 phút / ngày (1 bài)</div>
        <div style="font-size:12.5px; color:var(--emerald-800); margin-top:3px;">Khuyên dùng cho người đi làm &amp; sinh viên bận rộn. Hoàn thành toàn bộ lộ trình sau 4 tháng.</div>
      </div>
      <span class="tag brass">ĐANG CHỌN</span>
    </div>

    <div style="border:1px solid var(--border); background:#FFFFFF; border-radius:12px; padding:16px 20px; display:flex; justify-content:space-between; align-items:center; cursor:pointer;">
      <div>
        <div style="font-size:15px; font-weight:800; color:var(--text);">🚀 Nhịp tăng tốc: 15 phút / ngày (2 bài + 1 drill)</div>
        <div style="font-size:12.5px; color:var(--stone-500); margin-top:3px;">Dành cho các bạn chuẩn bị nộp hồ sơ thực tập hoặc thi tuyển Management Trainee.</div>
      </div>
      <button class="btn btn-sm">Chọn</button>
    </div>

    <div style="border:1px solid var(--border); background:#FFFFFF; border-radius:12px; padding:16px 20px; display:flex; justify-content:space-between; align-items:center; cursor:pointer;">
      <div>
        <div style="font-size:15px; font-weight:800; color:var(--text);">🔥 Luyện thi cấp tốc: 30 phút / ngày (Full Case Simulation)</div>
        <div style="font-size:12.5px; color:var(--stone-500); margin-top:3px;">Chuẩn bị phỏng vấn Case Interview với MBB / Big 4 trong vòng 30 ngày tới.</div>
      </div>
      <button class="btn btn-sm">Chọn</button>
    </div>
  </div>
</div>`;
  },

  renderMethodSection: function() {
    return `
<div class="panel" style="padding: 28px; max-width:780px; margin:0 auto;">
  <div class="eyebrow" style="color:var(--color-primary);">03 PHƯƠNG PHÁP HỌC</div>
  <h2 style="font-size:22px; margin-top:4px;">Tư duy giải Case như một Chiến lược gia MBB</h2>
  
  <div class="grid g3" style="margin-top:20px;">
    <div style="background:var(--stone-50); border:1px solid var(--border); border-radius:12px; padding:16px;">
      <div style="font-size:18px; margin-bottom:8px;">🌳</div>
      <div style="font-size:14px; font-weight:800; color:var(--text);">1. Cấu trúc MECE</div>
      <p class="muted" style="font-size:12px; margin-top:4px;">Bóc tách vấn đề lớn thành các nhánh con độc lập, không chồng chéo và bao quát toàn diện.</p>
    </div>

    <div style="background:var(--stone-50); border:1px solid var(--border); border-radius:12px; padding:16px;">
      <div style="font-size:18px; margin-bottom:8px;">🎯</div>
      <div style="font-size:14px; font-weight:800; color:var(--text);">2. Giả định định hướng (Hypothesis)</div>
      <p class="muted" style="font-size:12px; margin-top:4px;">Đưa ra giả thuyết sớm nhất có thể và dùng dữ liệu thực tế để chứng minh hoặc bác bỏ.</p>
    </div>

    <div style="background:var(--stone-50); border:1px solid var(--border); border-radius:12px; padding:16px;">
      <div style="font-size:18px; margin-bottom:8px;">🔺</div>
      <div style="font-size:14px; font-weight:800; color:var(--text);">3. Pyramid Principle</div>
      <p class="muted" style="font-size:12px; margin-top:4px;">Giao tiếp Top-down: Nêu thông điệp cốt lõi trước, sau đó mới đến các luận điểm dẫn chứng.</p>
    </div>
  </div>
</div>`;
  },

  renderFaqSection: function() {
    return `
<div class="panel" style="padding: 28px; max-width:780px; margin:0 auto;">
  <div class="eyebrow" style="color:var(--color-primary);">04 GIẢI ĐÁP THƯỜNG GẶP</div>
  <h2 style="font-size:22px; margin-top:4px;">Câu hỏi về Lộ trình &amp; Phỏng vấn Consulting</h2>

  <div style="display:flex; flex-direction:column; gap:14px; margin-top:20px;">
    <div>
      <div style="font-size:14px; font-weight:800; color:var(--text);">Q: Chưa học kinh tế hoặc trái ngành có học được lộ trình này không?</div>
      <p class="muted" style="font-size:13px; margin-top:3px;">A: Hoàn toàn được. Lộ trình được thiết kế từ con số 0 với ví dụ trực quan từ các doanh nghiệp Việt Nam gần gũi (Vinamilk, Vietjet, Thế Giới Di Động...).</p>
    </div>
    <div style="border-top:1px solid var(--border); padding-top:12px;">
      <div style="font-size:14px; font-weight:800; color:var(--text);">Q: Case Interview khác gì so với phỏng vấn thông thường?</div>
      <p class="muted" style="font-size:13px; margin-top:3px;">A: Bạn sẽ trực tiếp giải một bài toán kinh doanh thật cùng phỏng vấn viên trong 30-45 phút để chứng minh phản xạ phân tích số liệu và tư duy phản biện.</p>
    </div>
  </div>
</div>`;
  }
};

window.VIEWS.consultingRoadmap = function() {
  const S = State.get();

  return `
<!-- ══════════════════════════════════════════════════════════════════
     CONSULTING LEARNING ROADMAP (LANDSCAPE MAP & STEPPING ISLANDS)
     ══════════════════════════════════════════════════════════════════ -->
<div class="band band-paper" style="padding: 32px 0 60px;">
  <div class="wrap">
    
    <!-- TOP HERO / DECISION HEADER -->
    <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:28px; flex-wrap:wrap; margin-bottom:28px;">
      <div style="flex:1; min-width:320px;">
        <h1 style="font-size:32px; line-height:1.2; letter-spacing:-0.025em; color:var(--text); margin:0;">
          Bạn muốn làm chủ tư duy giải Case,<br>
          <span style="color:var(--color-primary);">hay bước vào nghề Management Consulting?</span>
        </h1>
        <p class="muted" style="font-size:14px; margin-top:10px; max-width:54ch;">
          Chọn một hướng để hệ thống sắp xếp hành trình phù hợp. Bạn có thể đổi bất kỳ lúc nào.
        </p>

        <div style="display:inline-flex; align-items:center; gap:8px; background:#FFFFFF; border:1px solid var(--border); border-radius:var(--radius-pill); padding:5px 14px; margin-top:14px; font-size:12px; color:var(--stone-600); box-shadow:var(--shadow-card);">
          <span>⏱ <strong>6 - 8 phút mỗi ngày</strong></span>
          <span style="color:var(--stone-300);">·</span>
          <span>Mỗi bài học ngắn gọn, có bài tập tư duy thực hành. Không cần hơn.</span>
        </div>
      </div>

      <!-- TOP RIGHT JOURNEY STATUS CARD -->
      <div class="rm-journey-card">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div style="font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:0.06em; color:var(--stone-400);">TIẾN ĐỘ HÀNH TRÌNH</div>
          <div style="font-size:11px; font-weight:800; color:var(--color-primary); background:rgba(5,150,105,0.15); padding:2px 8px; border-radius:4px;">
            1/120 bài đã xong (1%)
          </div>
        </div>

        <div style="margin-top:12px; display:flex; align-items:center; gap:14px;">
          <div class="rm-circle-progress">
            <span>1%</span>
          </div>
          <div>
            <div style="font-size:11px; font-weight:700; color:var(--stone-400); text-transform:uppercase;">ĐANG CHỌN: NGHỀ NGHIỆP</div>
            <div style="font-size:13.5px; font-weight:800; color:#FAFAF9; margin-top:2px;">Management Consulting (MBB / Big 4)</div>
            <div style="font-size:11.5px; color:#34D399; margin-top:3px;">📍 Đang ở: Tư duy cấu trúc &amp; Khung MECE</div>
          </div>
        </div>
      </div>
    </div>

    <!-- DAILY ACTION CALLOUT (HÔM NAY BẠN HỌC BÀI NÀY) -->
    <div class="rm-daily-callout">
      <div style="display:flex; align-items:center; gap:12px;">
        <div class="rm-play-btn">▶</div>
        <div>
          <div class="eyebrow" style="color:var(--color-primary); margin:0;">HÔM NAY BẠN HỌC BÀI NÀY</div>
          <div style="font-size:15px; font-weight:800; color:var(--text); margin-top:2px;">
            Kỹ thuật phân nhánh Issue Tree: Bóc tách mọi vấn đề kinh doanh chuẩn MECE
          </div>
        </div>
      </div>
      <a class="btn btn-primary" href="#/lesson/c-tree-1" style="padding:9px 20px; font-size:13px; border-radius:var(--radius-pill);">
        Mở bài học &nbsp;→
      </a>
    </div>

    <!-- 4 NAVIGATION TABS (01 Chọn hướng, 02 Chọn nhịp, 03 Cách học, 04 Giải đáp) -->
    <div class="rm-nav-tabs">
      <button class="rm-nav-tab active" id="tab-direction" onclick="ROADMAP_UI.selectTab('tab-direction')">01 Chọn hướng</button>
      <button class="rm-nav-tab" id="tab-pace" onclick="ROADMAP_UI.selectTab('tab-pace')">02 Chọn nhịp</button>
      <button class="rm-nav-tab" id="tab-method" onclick="ROADMAP_UI.selectTab('tab-method')">03 Cách học</button>
      <button class="rm-nav-tab" id="tab-faq" onclick="ROADMAP_UI.selectTab('tab-faq')">04 Giải đáp</button>
    </div>

    <!-- DYNAMIC TAB CONTENT -->
    <div id="rmTabContent">
      ${ROADMAP_UI.renderMapSection()}
    </div>

  </div>
</div>
`;
};

})();
