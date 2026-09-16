/* ══════════════════════════════════════════════════════════════════
   STRATLAB — Editorial Contemporary & Gamified Simulation Components
   ══════════════════════════════════════════════════════════════════ */
(function(){
window.LANDING = window.LANDING || {};

/* ── 1. SEMANTIC INK WASH 2D VECTOR ASSETS (No generic icon boxes) ── */
const ICONS = {
  // Sách bách khoa bìa da 2D Editorial
  book: `<svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <path d="M6 6C6 4.89543 6.89543 4 8 4H24C25.1046 4 26 4.89543 26 6V24C26 25.1046 25.1046 26 24 26H8C6.89543 26 6 25.1046 6 24V6Z" fill="#064E3B" stroke="#059669" stroke-width="1.8"/>
    <path d="M10 4V26M6 22H26" stroke="#A7F3D0" stroke-width="1.4" stroke-linecap="round"/>
    <circle cx="18" cy="13" r="4" fill="#F59E0B" opacity="0.9"/>
    <path d="M18 10V16M15 13H21" stroke="#FFFFFF" stroke-width="1.2" stroke-linecap="round"/>
  </svg>`,

  // Tag giá hoàng kim 0đ
  priceTag: `<svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <path d="M4 16L16 4H26V14L14 26L4 16Z" fill="#FFFBEB" stroke="#D97706" stroke-width="1.8" stroke-linejoin="round"/>
    <circle cx="21" cy="9" r="2.5" fill="#D97706"/>
    <path d="M11 15L15 19" stroke="#B45309" stroke-width="1.8" stroke-linecap="round"/>
  </svg>`,

  // Nhóm người học
  learners: `<svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <circle cx="12" cy="11" r="4.5" fill="#ECFDF5" stroke="#059669" stroke-width="1.8"/>
    <path d="M5 24C5 20 8 18 12 18C16 18 19 20 19 24" stroke="#059669" stroke-width="1.8" stroke-linecap="round"/>
    <circle cx="21" cy="12" r="3.5" fill="#FEF3C7" stroke="#D97706" stroke-width="1.6"/>
    <path d="M19 23C19.8 20.8 22 20 24.5 20C26.5 20 28.5 21 29 23" stroke="#D97706" stroke-width="1.6" stroke-linecap="round"/>
  </svg>`,

  // Cúp vàng vô địch
  trophy: `<svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <path d="M9 7H23V14C23 17.866 19.866 21 16 21C12.134 21 9 17.866 9 14V7Z" fill="#FEF3C7" stroke="#D97706" stroke-width="1.8"/>
    <path d="M9 10H5C3.89543 10 3 10.8954 3 12V13C3 15.2091 4.79086 17 7 17H9" stroke="#D97706" stroke-width="1.6"/>
    <path d="M23 10H27C28.1046 10 29 10.8954 29 12V13C29 15.2091 27.2091 17 25 17H23" stroke="#D97706" stroke-width="1.6"/>
    <path d="M16 21V25M11 27H21" stroke="#D97706" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  // Sét năng lượng CFO
  lightning: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="#F59E0B" stroke="#D97706" stroke-width="1.8" stroke-linejoin="round"/>
  </svg>`,

  // Chén thánh DCF
  chalice: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M6 3H18V9C18 12.3137 15.3137 15 12 15C8.68629 15 6 12.3137 6 9V3Z" fill="#ECFDF5" stroke="#059669" stroke-width="1.8"/>
    <path d="M12 15V19M8 21H16" stroke="#059669" stroke-width="1.8" stroke-linecap="round"/>
    <circle cx="12" cy="8" r="2" fill="#10B981"/>
  </svg>`,

  // Khiên Aegis
  shield: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M12 3L4 7V13C4 17.5 7.5 21 12 22C16.5 21 20 17.5 20 13V7L12 3Z" fill="#EFF6FF" stroke="#3B82F6" stroke-width="1.8"/>
    <path d="M9 12L11 14L15 10" stroke="#2563EB" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`
};

LANDING.ICONS = ICONS;

/* ── 2. HERO INTERACTIVE STAGE (3D TILT + SANDBOX ENGINE) ── */
const STOCKS = {
  a: { name: "C.Ty A (Tech SaaS)", price: 84000, eps: 4200, pe: 20.0, sector: "High Growth" },
  b: { name: "C.Ty B (Bán Lẻ)", price: 36000, eps: 3000, pe: 12.0, sector: "Deep Value" },
  c: { name: "C.Ty C (Sản Xuất)", price: 52000, eps: 2000, pe: 26.0, sector: "Overvalued" }
};

let currentStock = 'b';
let quizAnswered = false;

LANDING.selectStock = function(key) {
  currentStock = key;
  const s = STOCKS[key];
  document.querySelectorAll('.stage-stock-tab').forEach(t => t.classList.remove('active'));
  const el = document.getElementById('tab-' + key);
  if(el) el.classList.add('active');

  const priceEl = document.getElementById('calc-price');
  const epsEl = document.getElementById('calc-eps');
  const peEl = document.getElementById('calc-pe');
  if(priceEl) priceEl.textContent = s.price.toLocaleString('vi-VN') + ' đ';
  if(epsEl) epsEl.textContent = s.eps.toLocaleString('vi-VN') + ' đ';
  if(peEl) peEl.textContent = s.pe.toFixed(1) + 'x';
};

LANDING.answerQuiz = function(choice) {
  if(quizAnswered) return;
  const card = document.getElementById('heroStageCard');
  const btnCorrect = document.getElementById('q-opt-2');
  const btnWrong = document.getElementById('q-opt-1');

  if(choice === 2) {
    quizAnswered = true;
    if(btnCorrect) btnCorrect.classList.add('correct');
    
    // Trigger particle burst XP
    const burst = document.createElement('div');
    burst.className = 'burst-xp-pill';
    burst.innerHTML = '✨ +20 XP Đạt được!';
    if(card) card.appendChild(burst);
    setTimeout(() => burst.remove(), 1300);

    // Update state XP
    const S = State.get();
    S.xp = (S.xp || 0) + 20;
    State.save();
    UI.hud();
    UI.toast('QUIZ HOÀN THÀNH', 'Bạn đã giải thích đúng chỉ số P/E (+20 XP)');
  } else {
    if(btnWrong) {
      btnWrong.classList.add('wrong');
      setTimeout(() => btnWrong.classList.remove('wrong'), 800);
    }
    UI.toast('THỬ LẠI', 'P/E thấp hơn trung bình ngành nghĩa là cổ phiếu đang có mức định giá hấp dẫn hơn!');
  }
};

LANDING.renderHeroStage = function() {
  const s = STOCKS[currentStock];
  return `
<div class="stage-3d-wrap" id="stage3dWrap">
  <div class="stage-3d-card" id="heroStageCard">
    <!-- Header: Roadmap mini & Live tag -->
    <div style="display:flex; justify-content:space-between; align-items:center; gap:8px;">
      <div style="display:flex; align-items:center; gap:6px;">
        <span class="radar-dot"></span>
        <span style="font-size:11px; font-weight:800; letter-spacing:0.08em; text-transform:uppercase; color:var(--color-primary)">
          Interactive Sandbox · Đang chạy thử
        </span>
      </div>
      <div style="display:flex; gap:4px;">
        <span style="font-size:10.5px; font-weight:800; color:var(--emerald-800); background:var(--emerald-100); padding:2px 7px; border-radius:4px;">B.1 ✓</span>
        <span style="font-size:10.5px; font-weight:800; color:var(--amber-800); background:var(--amber-100); padding:2px 7px; border-radius:4px; border:1px solid var(--color-accent)">B.2 Đang học</span>
        <span style="font-size:10.5px; font-weight:700; color:var(--stone-400); background:var(--stone-100); padding:2px 7px; border-radius:4px;">B.3</span>
      </div>
    </div>

    <!-- Title -->
    <div style="font-size:15.5px; font-weight:800; margin-top:10px; color:var(--text)">
      Thực hành: Định giá cổ phiếu qua chỉ số P/E (Price / EPS)
    </div>

    <!-- 3 Stock Tabs -->
    <div class="stage-stock-tabs">
      <button class="stage-stock-tab" id="tab-a" onclick="LANDING.selectStock('a')">C.Ty A (Tech)</button>
      <button class="stage-stock-tab active" id="tab-b" onclick="LANDING.selectStock('b')">C.Ty B (Bán lẻ)</button>
      <button class="stage-stock-tab" id="tab-c" onclick="LANDING.selectStock('c')">C.Ty C (Sản xuất)</button>
    </div>

    <!-- Dynamic Calculator Output -->
    <div class="stage-calc-box">
      <div class="stage-calc-item">
        <div class="stage-calc-k">Thị Giá (P)</div>
        <div class="stage-calc-v" id="calc-price">${s.price.toLocaleString('vi-VN')} đ</div>
      </div>
      <div class="stage-calc-item">
        <div class="stage-calc-k">Lợi Nhuận / CP (EPS)</div>
        <div class="stage-calc-v" id="calc-eps">${s.eps.toLocaleString('vi-VN')} đ</div>
      </div>
      <div class="stage-calc-item">
        <div class="stage-calc-k">Hệ Số P/E</div>
        <div class="stage-calc-v" id="calc-pe" style="color:var(--color-primary)">${s.pe.toFixed(1)}x</div>
      </div>
    </div>

    <!-- Quick Mini Challenge -->
    <div class="stage-quiz">
      <div class="stage-quiz-q">
        🎯 <strong>Thử thách nhanh:</strong> P/E của C.Ty B là <strong>12.0x</strong> trong khi P/E trung bình ngành là <strong>20.0x</strong>. Nhận định nào chuẩn xác nhất?
      </div>
      <div class="stage-quiz-options">
        <button class="stage-quiz-btn" id="q-opt-1" onclick="LANDING.answerQuiz(1)">
          <span>A. Cổ phiếu đang bị thổi phồng giá quá cao so với ngành</span>
          <span style="font-size:11px; color:var(--stone-400)">✕</span>
        </button>
        <button class="stage-quiz-btn" id="q-opt-2" onclick="LANDING.answerQuiz(2)">
          <span>B. Cổ phiếu đang được định giá rẻ hơn tương đối so với lợi nhuận</span>
          <span style="font-size:11px; color:var(--color-primary)">✓ Nhận +20 XP</span>
        </button>
      </div>
    </div>

    <!-- Expert Note -->
    <div class="stage-expert-note">
      <span style="font-size:14px; flex:none;">💡</span>
      <span><strong>Ghi chú chuyên gia:</strong> P/E thấp là dấu hiệu định giá hấp dẫn, nhưng cần kiểm tra thêm chất lượng nợ và tăng trưởng doanh thu trước khi ra quyết định.</span>
    </div>

    <!-- Live Gamified Footer -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:14px; padding-top:12px; border-top:1px solid var(--border); font-size:11.5px; font-weight:700; color:var(--stone-600)">
      <div style="display:flex; gap:12px; align-items:center;">
        <span style="display:inline-flex; align-items:center; gap:4px;"><span style="color:var(--color-accent)">★</span> +20 XP</span>
        <span style="display:inline-flex; align-items:center; gap:4px;"><span style="color:#EA580C">🔥</span> Streak 1 ngày</span>
      </div>
      <span style="color:var(--color-primary)">🏆 Đã mở 3/30 kho báu</span>
    </div>
  </div>
</div>`;
};

/* ── 3. 3D PERSPECTIVE TILT LISTENER ── */
LANDING.initTilt = function() {
  const wrap = document.getElementById('stage3dWrap');
  const card = document.getElementById('heroStageCard');
  if(!wrap || !card) return;

  wrap.addEventListener('mousemove', function(e) {
    const rect = wrap.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width/2;
    const y = e.clientY - rect.top - rect.height/2;
    const rotX = -(y / (rect.height/2)) * 7;
    const rotY = (x / (rect.width/2)) * 7;
    card.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-2px)`;
  });

  wrap.addEventListener('mouseleave', function() {
    card.style.transform = 'rotateX(0deg) rotateY(0deg) translateY(0)';
  });
};

/* ── 4. BOSS BATTLE ARENA (Gamified Financial Stress Test) ── */
let bossHP = 10000;
const maxBossHP = 10000;
let battleFinished = false;

LANDING.useSkill = function(skillType) {
  if(battleFinished) return;
  const arena = document.getElementById('bossArena');
  const hpFill = document.getElementById('bossHpFill');
  const hpText = document.getElementById('bossHpText');

  let damage = 0;
  let text = '';
  if(skillType === 1) {
    damage = 3500;
    text = '-3.500 RỦI RO';
  } else if(skillType === 2) {
    damage = 4800;
    text = '💥 -4.800 CHÍ MẠNG!';
  } else if(skillType === 3) {
    damage = 2500;
    text = '🛡️ -2.500 ĐÒN BẨY';
  }

  bossHP = Math.max(0, bossHP - damage);
  const pct = Math.round((bossHP / maxBossHP) * 100);

  // Tactile screen shake
  if(arena) {
    arena.classList.remove('arena-shake');
    void arena.offsetWidth; // trigger reflow
    arena.classList.add('arena-shake');

    // Floating damage number
    const dmg = document.createElement('div');
    dmg.className = 'damage-float-num';
    dmg.style.left = (30 + Math.random() * 30) + '%';
    dmg.style.top = (25 + Math.random() * 20) + '%';
    dmg.textContent = text;
    arena.appendChild(dmg);
    setTimeout(() => dmg.remove(), 1200);
  }

  if(hpFill) hpFill.style.width = pct + '%';
  if(hpText) hpText.textContent = bossHP.toLocaleString('vi-VN') + ' / 10.000 HP (' + pct + '%)';

  if(bossHP === 0) {
    battleFinished = true;
    setTimeout(() => {
      UI.toast('CHIẾN THẮNG BOSS!', '+500 XP ĐÃ ĐƯỢC CỘNG VÀO TÀI KHOẢN');
      const S = State.get();
      S.xp = (S.xp || 0) + 500;
      State.save();
      UI.hud();
      LANDING.showVictoryModal();
    }, 500);
  }
};

LANDING.showVictoryModal = function() {
  const d = document.createElement('div');
  d.className = 'sr-overlay';
  d.innerHTML = `
    <div class="sr-box" style="text-align:center; padding:32px 24px; max-width:480px;">
      <div style="width:64px; height:64px; margin:0 auto 16px; background:var(--emerald-50); border:1px solid var(--emerald-200); border-radius:50%; display:grid; place-items:center;">
        ${ICONS.trophy}
      </div>
      <div class="eyebrow" style="color:var(--color-primary)">VICTORY UNLOCKED</div>
      <h2 style="font-size:24px; margin-top:6px;">Đã Đánh Bại Đợt Sụp Đổ Thanh Khoản!</h2>
      <p class="muted" style="margin-top:8px; font-size:13.5px;">
        Xuất sắc! Bằng việc bóc trần dòng tiền ảo và tái cấu trúc nợ vay, bạn đã bảo toàn vốn cho doanh nghiệp thành công.
      </p>
      <div style="background:var(--amber-50); border:1px solid var(--amber-200); border-radius:8px; padding:12px; margin:18px 0; font-weight:800; color:var(--amber-900);">
        ✨ Thưởng: +500 XP Chiến Thuật & Danh hiệu "CFO Thực Chiến"
      </div>
      <div style="display:flex; gap:10px; justify-content:center;">
        <button class="btn btn-primary" onclick="this.closest('.sr-overlay').remove(); location.hash='#/cases';">Vào giải Case thực tế &nbsp;→</button>
        <button class="btn" onclick="this.closest('.sr-overlay').remove();">Đóng</button>
      </div>
    </div>
  `;
  document.body.appendChild(d);
};

LANDING.renderBossBattle = function() {
  return `
<section class="band band-ink band-divider" style="padding: 56px 0;">
  <div class="wrap">
    <div style="text-align:center; max-width:680px; margin:0 auto 36px;">
      <div class="eyebrow" style="color:#34D399">Gamified Stress Test · Đấu Trường Chiến Lược</div>
      <h2 style="font-size:32px; color:#FAFAF9; margin-top:8px;">Boss Battle: Đánh Bại Đợt Sụp Đổ Thanh Khoản</h2>
      <p style="color:var(--stone-400); margin-top:8px; font-size:14px;">
        Doanh nghiệp đối mặt khủng hoảng đòn bẩy vĩ mô. Hãy chọn 3 công cụ tài chính sắc bén để hóa giải rủi ro trước khi cạn kiệt dòng tiền!
      </p>
    </div>

    <div class="boss-arena" id="bossArena">
      <div class="grid g2" style="align-items:center;">
        <!-- Cột trái: Boss Status -->
        <div>
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:12px; font-weight:800; text-transform:uppercase; letter-spacing:0.06em; color:#F87171;">
              ⚠ Cảnh Báo Vĩ Mô: Khủng Hoảng Thanh Khoản
            </span>
            <span id="bossHpText" style="font-size:12px; font-weight:800; color:#FBBF24;">10.000 / 10.000 HP (100%)</span>
          </div>

          <div class="boss-hp-track">
            <div class="boss-hp-fill" id="bossHpFill"></div>
          </div>

          <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); border-radius:10px; padding:14px; margin-top:14px;">
            <div style="font-size:13.5px; font-weight:700; color:#FAFAF9;">Thực trạng doanh nghiệp:</div>
            <p style="font-size:12.5px; color:var(--stone-400); margin-top:4px; line-height:1.5;">
              Khoản nợ ngắn hạn 4.500 tỷ đến hạn trong 30 ngày, trong khi dòng tiền hoạt động kinh doanh (CFO) âm do bị chiếm dụng vốn.
            </p>
          </div>
        </div>

        <!-- Cột phải: 3 Chiêu thức phân tích -->
        <div>
          <div style="font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:0.08em; color:#34D399; margin-bottom:10px;">
            Chọn chiêu thức phản công (Tool Skill Actions):
          </div>

          <div class="boss-skill-card" onclick="LANDING.useSkill(1)">
            <div class="boss-emblem">${ICONS.lightning}</div>
            <div style="flex:1;">
              <div style="font-size:13.5px; font-weight:800; color:#FAFAF9;">1. Sét năng lượng CFO (Bóc trần dòng tiền)</div>
              <div style="font-size:11.5px; color:var(--stone-400); margin-top:2px;">Cắt giảm hàng tồn kho, thu hồi công nợ khẩn cấp (-3.500 HP)</div>
            </div>
            <span style="font-size:11.5px; font-weight:800; color:#FBBF24;">Sát thương 3.5k</span>
          </div>

          <div class="boss-skill-card" onclick="LANDING.useSkill(2)">
            <div class="boss-emblem">${ICONS.chalice}</div>
            <div style="flex:1;">
              <div style="font-size:13.5px; font-weight:800; color:#FAFAF9;">2. Chén thánh định giá DCF (Giá trị nội tại)</div>
              <div style="font-size:11.5px; color:var(--stone-400); margin-top:2px;">Chiết khấu dòng tiền tái cấu trúc để gọi vốn cổ đông (-4.800 HP)</div>
            </div>
            <span style="font-size:11.5px; font-weight:800; color:#34D399;">Chí mạng 4.8k 💥</span>
          </div>

          <div class="boss-skill-card" onclick="LANDING.useSkill(3)">
            <div class="boss-emblem">${ICONS.shield}</div>
            <div style="flex:1;">
              <div style="font-size:13.5px; font-weight:800; color:#FAFAF9;">3. Khiên Aegis khử đòn bẩy (Tái cơ cấu nợ)</div>
              <div style="font-size:11.5px; color:var(--stone-400); margin-top:2px;">Gia hạn kỳ hạn nợ từ ngắn hạn sang trái phiếu dài hạn (-2.500 HP)</div>
            </div>
            <span style="font-size:11.5px; font-weight:800; color:#60A5FA;">Phòng thủ 2.5k</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`;
};

/* ── 5. TRANSFORMATION TESTIMONIALS MARQUEE (Wall of Praise) ── */
const REVIEWS_ROW1 = [
  {
    pill: "Mock CFA L1: 42% → 86% (+44%)",
    type: "emerald",
    quote: "Không còn học vẹt công thức. Nhờ giải case mô phỏng dòng tiền và P/E thực tế, mình nắm chắc tư duy định giá chỉ sau 3 tuần.",
    author: "Nguyễn Tuấn Dũng",
    role: "Equity Research Analyst · SSI Research",
    bg: "#059669"
  },
  {
    pill: "Phỏng vấn IB: 0 Offer → Pass Deal Team",
    type: "amber",
    quote: "Các câu hỏi phỏng vấn case study tại ngân hàng đầu tư yêu cầu tư duy MECE thực chiến. Nền tảng này giúp mình rèn luyện đúng phản xạ đó.",
    author: "Lê Minh Trang",
    role: "Investment Banking Associate · Vietcap",
    bg: "#D97706"
  },
  {
    pill: "Case McKinsey: Trượt R1 → Pass Final (+60%)",
    type: "sky",
    quote: "Giao diện Paper & Ink mộc mạc và sạch sẽ giúp tập trung tối đa vào cấu trúc cây vấn đề (Issue Tree) thay vì các slide màu mè.",
    author: "Phạm Hoàng Long",
    role: "Management Consultant · Khóa 2025",
    bg: "#44403C"
  }
];

const REVIEWS_ROW2 = [
  {
    pill: "Báo Cáo Tài Chính: Mù mờ → Top 5% Lớp",
    type: "emerald",
    quote: "Học tài chính thông qua việc đóng vai CFO cứu doanh nghiệp bên bờ phá sản đem lại cảm giác gây nghiện như chơi game chiến thuật RPG.",
    author: "Đỗ Khánh Huyền",
    role: "Sinh viên Tài chính Doanh nghiệp · FTU",
    bg: "#059669"
  },
  {
    pill: "Định Giá M&A: 55đ → 92đ (+37đ)",
    type: "amber",
    quote: "Thư viện 14 ngành với dữ liệu doanh nghiệp thật tại Việt Nam giúp mình tự tin xây dựng Financial Model cho thương vụ M&A đầu tay.",
    author: "Trần Đức Anh",
    role: "M&A Analyst · VinaCapital",
    bg: "#D97706"
  },
  {
    pill: "Quản Trị Vốn: Âm 15% → Lãi 28% (+43%)",
    type: "sky",
    quote: "Các tình huống stress-test áp lực cao rèn cho mình bản lĩnh quản trị rủi ro thanh khoản mà sách giáo khoa truyền thống không dạy.",
    author: "Vũ Hải Nam",
    role: "Private Portfolio Manager",
    bg: "#292524"
  }
];

LANDING.renderTestimonials = function() {
  const cardHtml = (r) => `
    <div class="t-card">
      <div>
        <div class="t-pill t-pill-${r.type}">${r.pill}</div>
        <div class="t-quote">
          <span class="t-quote-mark">“</span>${r.quote}
        </div>
      </div>
      <div class="t-author">
        <div class="t-avatar" style="background:${r.bg}">${r.author.slice(0,2).toUpperCase()}</div>
        <div>
          <div class="t-name">${r.author}</div>
          <div class="t-role">${r.role}</div>
        </div>
      </div>
    </div>
  `;

  return `
<section class="band band-academic band-divider" style="padding: 56px 0;">
  <div class="wrap">
    <div style="text-align:center; max-width:640px; margin:0 auto 32px;">
      <div style="display:inline-flex; align-items:center; gap:6px; background:#FFFFFF; border:1px solid var(--border); padding:4px 12px; border-radius:var(--radius-pill); font-size:11.5px; font-weight:800; color:var(--stone-700); box-shadow:var(--shadow-card);">
        <span style="color:#F59E0B">★</span> Rated 4.9/5 by over 3,800+ learners
      </div>
      <h2 style="font-size:32px; margin-top:12px;">Minh Chứng Chuyển Hoá Thực Tế</h2>
      <p class="muted" style="margin-top:6px; font-size:14px;">
        Những con số bứt phá cụ thể từ người học sau khi chuyển từ học vẹt lý thuyết sang luyện giải case mô phỏng.
      </p>
    </div>
  </div>

  <div class="marquee-container">
    <div class="marquee-mask-left"></div>
    <div class="marquee-mask-right"></div>

    <!-- Hàng 1: Chạy sang trái -->
    <div class="marquee-row marquee-left" style="margin-bottom:16px;">
      ${REVIEWS_ROW1.concat(REVIEWS_ROW1).map(cardHtml).join("")}
    </div>

    <!-- Hàng 2: Chạy sang phải -->
    <div class="marquee-row marquee-right">
      ${REVIEWS_ROW2.concat(REVIEWS_ROW2).map(cardHtml).join("")}
    </div>
  </div>
</section>`;
};

})();
