/* ══════════════════════════════════════════════════════════════════
   STRATLAB — HỌC BÀI (CURRICULUM HUB) VIEW
   ══════════════════════════════════════════════════════════════════ */
window.VIEWS = window.VIEWS || {};

(function(){

const STAGES = [
  {
    id: "stage-1",
    num: "CHẶNG 1",
    badge: "",
    title: "Cốt lõi Tư duy Chiến lược: MECE, Issue Tree & Pyramid Principle",
    liveCount: 24,
    total: 9,
    done: 1,
    expanded: true,
    modules: [
      {
        id: "m-1-1",
        code: "Bài 1-1",
        title: "Nguyên lý MECE: Không Trùng Lặp & Không Bỏ Sót trong Kinh Doanh",
        desc: "Cách chia nhỏ mọi thị trường và dòng sản phẩm theo tư duy McKinsey.",
        done: 1, total: 1, status: "cleared", link: "#/lesson/c-tree-1"
      },
      {
        id: "m-1-2",
        code: "Bài 2-3",
        title: "Kỹ thuật phân nhánh Cây vấn đề (Issue Tree) đa chiều",
        desc: "Bóc tách doanh thu theo Giá x Lượng hoặc Phân khúc khách hàng B2B/B2C.",
        done: 0, total: 2, status: "current", link: "#/lesson/c-tree-2"
      },
      {
        id: "m-1-3",
        code: "Bài 4-7",
        title: "Kim tự tháp Minto & Giao tiếp Top-down với Khách hàng/Giám khảo",
        desc: "Nêu thông điệp cốt lõi trước, dẫn chứng số liệu định lượng sau.",
        done: 0, total: 4, status: "locked", link: "#/lesson/c-frame-1"
      },
      {
        id: "m-1-4",
        code: "Bài 8-9",
        title: "Kỹ năng Đọc biểu đồ kinh doanh (Chart Reading) & Trích xuất Insight",
        desc: "Phát hiện ngay điểm bất thường trong báo cáo tài chính trong 30 giây.",
        done: 0, total: 2, status: "locked", link: "#/lesson/c-read-1"
      }
    ]
  },
  {
    id: "stage-2",
    num: "CHẶNG 2",
    badge: "MỚI",
    title: "Phân tích Lợi nhuận (Profitability) & Bóc tách Dòng tiền",
    liveCount: 12,
    total: 8,
    done: 0,
    expanded: false,
    modules: [
      {
        id: "m-2-1",
        code: "Bài 1-3",
        title: "Mô hình Profitability Framework chuẩn MBB",
        desc: "Tìm điểm rò rỉ dòng tiền: Giá bán, Cơ cấu sản phẩm hay Biến phí tăng vọt?",
        done: 0, total: 3, status: "locked", link: "#/lesson/f-profit-1"
      },
      {
        id: "m-2-2",
        code: "Bài 4-6",
        title: "Phân tích Chi phí Cố định (FC) vs Biến phí (VC) trong Sản xuất",
        desc: "Điểm hòa vốn (Break-even Volume) và đòn bẩy hoạt động (Operating Leverage).",
        done: 0, total: 3, status: "locked", link: "#/lesson/f-profit-2"
      },
      {
        id: "m-2-3",
        code: "Bài 7-8",
        title: "Case thực hành: Cứu lợi nhuận chuỗi F&B trước làn sóng tăng giá mặt bằng",
        desc: "Đưa ra giải pháp tối ưu menu và cắt giảm chi phí lãng phí.",
        done: 0, total: 2, status: "locked", link: "#/case/highlands"
      }
    ]
  },
  {
    id: "stage-3",
    num: "CHẶNG 3",
    badge: "MỚI",
    title: "Quy mô Thị trường (Market Sizing) & Thâm nhập (Market Entry)",
    liveCount: 18,
    total: 8,
    done: 0,
    expanded: false,
    modules: [
      {
        id: "m-3-1",
        code: "Bài 1-3",
        title: "Kỹ thuật ước lượng từ dưới lên (Bottom-up) & từ trên xuống (Top-down)",
        desc: "Đo lường quy mô thị trường TAM, SAM, SOM cho ngành hàng mới.",
        done: 0, total: 3, status: "locked", link: "#/lesson/f-sizing-1"
      },
      {
        id: "m-3-2",
        code: "Bài 4-6",
        title: "Đánh giá ma trận cạnh tranh 5 Áp lực của Porter & Rào cản gia nhập",
        desc: "Xác định mức độ hấp dẫn của ngành và sức mạnh đàm phán của nhà cung cấp.",
        done: 0, total: 3, status: "locked", link: "#/lesson/i-entry-1"
      },
      {
        id: "m-3-3",
        code: "Bài 7-8",
        title: "Case thực chiến: Chuỗi bán lẻ ngoại có nên mở 500 cửa hàng tại Việt Nam?",
        desc: "Phân tích địa điểm, thói quen tiêu dùng xe máy và chi phí chuỗi cung ứng.",
        done: 0, total: 2, status: "locked", link: "#/case/retail-entry"
      }
    ]
  },
  {
    id: "stage-4",
    num: "CHẶNG 4",
    badge: "HOT",
    title: "Chiến lược Định giá & Tối ưu Biên Lợi nhuận (Pricing Strategy)",
    liveCount: 9,
    total: 6,
    done: 0,
    expanded: false,
    modules: [
      {
        id: "m-4-1",
        code: "Bài 1-3",
        title: "3 Phương pháp định giá: Cost-plus, Đối thủ cạnh tranh & Value-based",
        desc: "Khám phá mức độ sẵn sàng chi trả (Willingness to Pay) của khách hàng.",
        done: 0, total: 3, status: "locked", link: "#/lesson/f-pricing-1"
      },
      {
        id: "m-4-2",
        code: "Bài 4-6",
        title: "Định giá Freemium & Phân tầng gói dịch vụ (Tiered Pricing)",
        desc: "Cách tối đa hóa giá trị vòng đời khách hàng (LTV) và hạn chế rời bỏ (Churn).",
        done: 0, total: 3, status: "locked", link: "#/lesson/f-pricing-2"
      }
    ]
  },
  {
    id: "stage-5",
    num: "CHẶNG 5",
    badge: "",
    title: "M&A, Thẩm định Thương vụ (Due Diligence) & Hiệp lực Synergy",
    liveCount: 5,
    total: 7,
    done: 0,
    expanded: false,
    modules: [
      {
        id: "m-5-1",
        code: "Bài 1-4",
        title: "Quy trình thẩm định thương vụ M&A: Tài chính, Thương mại & Vận hành",
        desc: "Tìm kiếm các rủi ro tiềm ẩn trong sổ sách kế toán của bên bán.",
        done: 0, total: 4, status: "locked", link: "#/lesson/i-ma-1"
      },
      {
        id: "m-5-2",
        code: "Bài 5-7",
        title: "Đo lường Hiệp lực Doanh thu (Cross-sell) vs Hiệp lực Chi phí (Scale)",
        desc: "Mô hình định giá DCF và Bội số ngành (Trading Comps).",
        done: 0, total: 3, status: "locked", link: "#/lesson/i-ma-2"
      }
    ]
  }
];

let selectedDrillOpt = 0;
let drillSubmitted = false;

window.LEARN_UI = {
  toggleStage: function(stageId) {
    const st = STAGES.find(s => s.id === stageId);
    if(st) {
      st.expanded = !st.expanded;
      const sublist = document.getElementById("sublist-" + stageId);
      const icon = document.getElementById("chevron-" + stageId);
      if(sublist) sublist.style.display = st.expanded ? "block" : "none";
      if(icon) icon.textContent = st.expanded ? "▲" : "▼";
    }
  },

  selectDrillOpt: function(idx) {
    if(drillSubmitted) return;
    selectedDrillOpt = idx;
    document.querySelectorAll(".drill-opt-btn").forEach((btn, i) => {
      btn.classList.toggle("active", i === idx);
    });
  },

  submitDrill: function() {
    if(drillSubmitted) return;
    drillSubmitted = true;
    const btn = document.getElementById("drillSubmitBtn");
    if(selectedDrillOpt === 0) {
      if(btn) {
        btn.textContent = "✓ CHÍNH XÁC (+20 XP)";
        btn.style.background = "#059669";
        btn.style.borderColor = "#059669";
      }
      UI.toast("XUẤT SẮC!", "30 tỷ / (50.000đ - 20.000đ) = 1.000.000 sản phẩm hòa vốn (+20 XP)");
      const S = State.get();
      S.xp = (S.xp || 0) + 20;
      State.save();
      UI.hud();
    } else {
      if(btn) {
        btn.textContent = "✕ ĐÁP ÁN ĐÚNG LÀ A";
        btn.style.background = "#E11D48";
      }
      UI.toast("GIẢI THÍCH", "Sản lượng hòa vốn = Định phí / (Giá bán - Biến phí đơn vị) = 30 tỷ / 30.000đ = 1.000.000 sp.");
    }
  },

  openNotebook: function() {
    const notes = localStorage.getItem("stratlab.notes") || "";
    const overlay = document.createElement("div");
    overlay.className = "sr-overlay";
    overlay.innerHTML = `
      <div class="sr-box" style="max-width:540px; padding:24px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
          <div>
            <div class="eyebrow" style="color:var(--color-primary);">GHI CHÉP CÁ NHÂN</div>
            <h2 style="font-size:20px; margin-top:4px;">Sổ tay Chiến lược &amp; Ghi nhớ</h2>
          </div>
          <button class="sr-esc" onclick="this.closest('.sr-overlay').remove()">✕</button>
        </div>
        <textarea id="userNotebookText" style="width:100%; height:180px; padding:12px; border:1px solid var(--border); border-radius:10px; font-family:inherit; font-size:13.5px; resize:none; outline:none;" placeholder="Ghi lại công thức, takeaway hoặc kinh nghiệm giải case của bạn...">${UI.esc(notes)}</textarea>
        <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:14px;">
          <button class="btn" onclick="this.closest('.sr-overlay').remove()">Hủy</button>
          <button class="btn btn-primary" onclick="localStorage.setItem('stratlab.notes', document.getElementById('userNotebookText').value); UI.toast('ĐÃ LƯU', 'Ghi chép đã được lưu an toàn trên máy của bạn!'); this.closest('.sr-overlay').remove();">Lưu ghi chép</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
  },

  openMistakes: function() {
    const overlay = document.createElement("div");
    overlay.className = "sr-overlay";
    overlay.innerHTML = `
      <div class="sr-box" style="max-width:580px; padding:24px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
          <div>
            <div class="eyebrow" style="color:#D97706;">ÔN TẬP PHẢN XẠ</div>
            <h2 style="font-size:20px; margin-top:4px;">Câu hỏi cần củng cố kiến thức (6 câu)</h2>
          </div>
          <button class="sr-esc" onclick="this.closest('.sr-overlay').remove()">✕</button>
        </div>
        <div style="display:flex; flex-direction:column; gap:10px; max-height:300px; overflow-y:auto;">
          <div style="background:var(--stone-50); border:1px solid var(--border); border-radius:10px; padding:12px 14px;">
            <div style="font-size:12.5px; font-weight:700; color:var(--text);">1. Đâu KHÔNG phải là đặc trưng của một cấu trúc MECE hoàn chỉnh?</div>
            <div style="font-size:11.5px; color:var(--color-primary); margin-top:4px; font-weight:600;">✓ Đáp án đúng: Các nhánh con có thể chồng lấn 10-15% nếu cần thiết.</div>
          </div>
          <div style="background:var(--stone-50); border:1px solid var(--border); border-radius:10px; padding:12px 14px;">
            <div style="font-size:12.5px; font-weight:700; color:var(--text);">2. Khi bóc tách chi phí chuỗi logistics, chi phí lưu kho thuộc loại nào?</div>
            <div style="font-size:11.5px; color:var(--color-primary); margin-top:4px; font-weight:600;">✓ Đáp án đúng: Chi phí biến đổi theo thể tích và thời gian lưu chuyển.</div>
          </div>
        </div>
        <div style="margin-top:16px; text-align:right;">
          <button class="btn btn-primary" onclick="this.closest('.sr-overlay').remove()">Luyện lại toàn bộ →</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
  }
};

window.VIEWS.learn = function(){
  const next = State.nextLesson();

  return `
<!-- ══════════════════════════════════════════════════════════════════
     HỌC BÀI (CURRICULUM HUB) — CHẶNG HỌC & WIDGET SIDEBAR
     ══════════════════════════════════════════════════════════════════ -->
<div class="band band-paper" style="padding: 24px 0 60px;">
  <div class="wrap">
    
    <!-- 2-COLUMN GRID LAYOUT (MAIN CONTENT + SIDEBAR WIDGETS) -->
    <div style="display:grid; grid-template-columns: 1fr 360px; gap:28px; align-items:flex-start;">
      
      <!-- CỘT TRÁI: TOP MISSION HERO CARD + CHẶNG ACCORDION -->
      <div>
        
        <!-- TOP ACTIVE MISSION HERO CARD -->
        <div class="cur-hero-card">
          <div class="cur-hero-left">
            <div style="display:flex; gap:8px; align-items:center; margin-bottom:8px;">
              <span class="tag brass" style="font-size:10.5px; font-weight:800;">• NHIỆM VỤ ĐANG HỌC</span>
              <span class="tag gold" style="font-size:10.5px; font-weight:800;">★ +20 XP khi hoàn thành</span>
            </div>

            <div style="font-size:11px; font-weight:700; color:var(--stone-500); text-transform:uppercase; letter-spacing:0.04em;">
              Chặng 1 • Bài 13/51
            </div>

            <h1 style="font-size:24px; line-height:1.25; margin:6px 0 10px; color:var(--text); letter-spacing:-0.02em;">
              Xây dựng Issue Tree — bóc tách trước khi phân bổ dữ liệu
            </h1>

            <div style="display:flex; align-items:center; gap:12px; margin-top:12px;">
              <div style="flex:1; max-width:240px; height:6px; background:var(--stone-200); border-radius:var(--radius-pill); overflow:hidden;">
                <i style="display:block; height:100%; width:4%; background:var(--color-primary); border-radius:var(--radius-pill);"></i>
              </div>
              <span style="font-size:11.5px; font-weight:700; color:var(--stone-500);">Tiến độ (3/267 bài) · 1%</span>
            </div>
          </div>

          <!-- BANNER MINH HOẠ BÊN PHẢI -->
          <div class="cur-hero-banner">
            <svg viewBox="0 0 240 110" preserveAspectRatio="none" style="width:100%; height:100%;">
              <path d="M0 40 C 60 20, 120 60, 180 30 C 210 15, 230 25, 240 20 L 240 110 L 0 110 Z" fill="#D1FAE5" opacity="0.9"/>
              <path d="M0 65 C 70 50, 140 80, 200 55 C 225 45, 235 55, 240 50 L 240 110 L 0 110 Z" fill="#A7F3D0" opacity="0.95"/>
              <circle cx="200" cy="30" r="16" fill="#FDE68A" opacity="0.8"/>
              <path d="M60 85L80 50L100 85Z" fill="#059669" opacity="0.6"/>
              <path d="M140 90L160 55L180 90Z" fill="#047857" opacity="0.7"/>
            </svg>
            <div style="position:absolute; inset:0; display:flex; align-items:flex-end; justify-content:flex-end; padding:12px;">
              <a class="btn btn-sm btn-primary" href="#/lesson/c-tree-1" style="font-size:12px; border-radius:var(--radius-pill);">Vào học &nbsp;→</a>
            </div>
          </div>
        </div>

        <!-- TRACK SWITCHER TABS -->
        <div class="cur-track-tabs">
          <button class="cur-track-tab active">Tư duy &amp; Frameworks cốt lõi (2/265 bài)</button>
          <button class="cur-track-tab">Case Study Chuyên ngành (1/525 bài)</button>
        </div>

        <!-- SEARCH & FILTER BAR -->
        <div class="cur-search-bar">
          <div class="cur-search-input-wrap">
            <span class="cur-search-icon">🔍</span>
            <input type="text" class="cur-search-input" placeholder="Tìm bài học, framework hoặc kỹ năng trong lộ trình..." oninput="/* live search filter */">
          </div>
          <button class="btn btn-sm btn-ghost" style="white-space:nowrap; border-radius:var(--radius-pill); font-size:12px;">Đánh dấu đã học (?)</button>
        </div>

        <!-- DANH SÁCH CÁC CHẶNG HỌC (ACCORDION STAGES) -->
        <div>
          ${STAGES.map(st => `
            <div class="stage-box" id="stagebox-${st.id}">
              <div class="stage-header" onclick="LEARN_UI.toggleStage('${st.id}')">
                <div style="display:flex; align-items:center; gap:10px;">
                  <span class="stage-badge-tag ${st.badge==='MỚI'?'emerald':''}">${st.num} ${st.badge?`· ${st.badge}`:''}</span>
                  <span style="font-size:14px; font-weight:800; color:var(--text);">${UI.esc(st.title)}</span>
                </div>
                <div style="display:flex; align-items:center; gap:12px;">
                  <span style="font-size:11px; font-weight:700; color:var(--color-primary); display:inline-flex; align-items:center; gap:4px;">
                    <span style="width:6px; height:6px; border-radius:50%; background:var(--color-primary);"></span>
                    ${st.liveCount} người vừa học
                  </span>
                  <div style="width:60px; height:5px; background:var(--stone-200); border-radius:9999px; overflow:hidden;">
                    <i style="display:block; height:100%; width:${Math.round(st.done/st.total*100)}%; background:var(--color-primary);"></i>
                  </div>
                  <span style="font-size:11px; font-weight:700; color:var(--stone-500);">${st.done}/${st.total}</span>
                  <span id="chevron-${st.id}" style="font-size:10px; color:var(--stone-400);">${st.expanded?'▲':'▼'}</span>
                </div>
              </div>

              <div class="stage-sublist" id="sublist-${st.id}" style="${st.expanded?'':'display:none;'}">
                ${st.modules.map((m, idx) => `
                  <div class="stage-subitem ${m.status==='current'?'active':''}">
                    <div style="display:flex; align-items:center; gap:12px;">
                      <span style="font-size:14px; color:${m.status==='cleared'?'var(--color-primary)':(m.status==='current'?'var(--color-accent)':'var(--stone-400)')}">
                        ${m.status==='cleared'?'✓':(m.status==='current'?'▶':'🔒')}
                      </span>
                      <div>
                        <div style="font-size:13.5px; font-weight:700; color:var(--text);">
                          ${UI.esc(m.title)}
                        </div>
                        <div style="font-size:11.5px; color:var(--stone-500); margin-top:2px;">
                          ${UI.esc(m.desc)}
                        </div>
                      </div>
                    </div>
                    <div style="display:flex; align-items:center; gap:10px; flex:none;">
                      <span class="tag" style="font-size:10.5px;">${m.code}</span>
                      <span style="font-size:11px; font-weight:700; color:var(--stone-500);">${m.done}/${m.total}</span>
                      <a class="btn btn-sm ${m.status==='current'?'btn-primary':'btn-ghost'}" href="${m.link}" style="font-size:11px; padding:4px 10px;">
                        ${m.status==='cleared'?'Ôn lại':(m.status==='current'?'Vào học':'Mở')}
                      </a>
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>
          `).join("")}
        </div>

      </div>

      <!-- CỘT PHẢI: WIDGETS (SỔ TAY, CÂU SAI, DAILY DRILL) -->
      <div>
        
        <!-- WIDGET 1: SỔ TAY CỦA BẠN -->
        <div class="widget-notebook" onclick="LEARN_UI.openNotebook()" style="cursor:pointer;">
          <div>
            <div class="eyebrow" style="color:var(--stone-400); margin:0;">GHI CHÉP</div>
            <div style="font-size:15px; font-weight:800; color:var(--text); margin-top:2px;">Sổ tay của bạn</div>
            <div style="font-size:11.5px; color:var(--stone-500); margin-top:2px;">Ghi lại điều vừa hiểu, trước khi quên...</div>
            <div style="font-size:12px; font-weight:800; color:var(--color-primary); margin-top:8px;">Mở sổ tay &nbsp;→</div>
          </div>
          <div style="width:52px; height:52px; background:var(--amber-50); border:1px solid var(--amber-200); border-radius:12px; display:grid; place-items:center; font-size:22px; flex:none;">
            📖
          </div>
        </div>

        <!-- WIDGET 2: CÂU SAI CẦN ÔN TẬP -->
        <div class="widget-mistakes" onclick="LEARN_UI.openMistakes()">
          <div style="width:38px; height:38px; border-radius:50%; background:var(--amber-100); color:#D97706; display:grid; place-items:center; font-size:16px; font-weight:800; flex:none;">
            !
          </div>
          <div style="flex:1;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div style="font-size:13.5px; font-weight:800; color:var(--text);">Câu sai cần ôn tập</div>
              <span class="tag gold" style="font-size:10.5px;">6 câu</span>
            </div>
            <div style="font-size:11.5px; color:var(--stone-500); margin-top:2px;">
              Bạn có 6 câu hỏi trắc nghiệm đã làm sai cần ôn lại.
            </div>
          </div>
          <div style="font-size:14px; color:var(--stone-400);">→</div>
        </div>

        <!-- WIDGET 3: THỬ THÁCH CHIẾN LƯỢC MỖI NGÀY (DAILY MINI DRILL) -->
        <div class="widget-daily-drill">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <div style="display:flex; align-items:center; gap:6px;">
              <span>📖</span>
              <span style="font-size:13px; font-weight:800; color:var(--text);">Thử thách mỗi ngày</span>
            </div>
            <span class="tag brass" style="font-size:10px;">TÍNH NHANH</span>
          </div>

          <div style="font-size:13px; font-weight:700; color:var(--text); line-height:1.45; margin-bottom:12px;">
            Doanh thu 120 tỷ/năm, Giá bán 50.000đ/sp. Chi phí cố định 30 tỷ, Biến phí đơn vị 20.000đ. Điểm hòa vốn là bao nhiêu sản phẩm?
          </div>

          <!-- 4 LỰA CHỌN TRẮC NGHIỆM -->
          <div>
            <button class="drill-opt-btn active" onclick="LEARN_UI.selectDrillOpt(0)">
              <span class="drill-opt-letter">A</span>
              <span>1.000.000 sản phẩm (30 tỷ / (50k - 20k))</span>
            </button>
            <button class="drill-opt-btn" onclick="LEARN_UI.selectDrillOpt(1)">
              <span class="drill-opt-letter">B</span>
              <span>600.000 sản phẩm</span>
            </button>
            <button class="drill-opt-btn" onclick="LEARN_UI.selectDrillOpt(2)">
              <span class="drill-opt-letter">C</span>
              <span>1.500.000 sản phẩm</span>
            </button>
            <button class="drill-opt-btn" onclick="LEARN_UI.selectDrillOpt(3)">
              <span class="drill-opt-letter">D</span>
              <span>2.400.000 sản phẩm</span>
            </button>
          </div>

          <button id="drillSubmitBtn" class="btn btn-primary" onclick="LEARN_UI.submitDrill()" style="width:100%; margin-top:6px; font-size:12.5px; border-radius:10px;">
            ✈ GỬI CÂU TRẢ LỜI
          </button>
        </div>

      </div>

    </div>

  </div>
</div>
`;
};

})();
