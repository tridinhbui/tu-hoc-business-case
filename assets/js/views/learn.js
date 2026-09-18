/* STRATLAB / TU HOC TAI CHINH — LEARN VIEW */
window.VIEWS = window.VIEWS || {};

window.VIEWS.learn = function() {
  return `<!-- ── TOP HERO ACTIVE BANNER ── -->
    <section class="hero-active-card">
      <div class="hero-content-left">
        <div class="hero-book-box">
          📖
        </div>
        <div class="hero-typography-col">
          <div class="hero-pills-row">
            <span class="pill-learning-green">
              <span class="pulse-circle"></span>
              NHIỆM VỤ ĐANG HỌC
            </span>
            <span class="pill-xp-reward">
              ★ +15 XP khi hoàn thành
            </span>
          </div>
          <div class="hero-sub-text">Chặng 1 • Bài 1</div>
          <h1 class="hero-title-h1">Vì sao mọi case đều bắt đầu<br>bằng một con số</h1>
          <div class="hero-progress-flex">
            <span>Tiến độ (3/213 bài)</span>
            <div class="hero-bar-container">
              <div class="hero-bar-inner"></div>
            </div>
            <span style="font-weight: 800; color: #10b981;">1%</span>
          </div>
        </div>
      </div>

      <!-- Scenic Mountain Landscape Card Artwork -->
      <div class="hero-mountain-card">
        <img src="assets/img/hero_mountain.png" alt="Mountain Landscape">
      </div>
    </section>

    <!-- ── TRACK SWITCHER (2 TABS) ── -->
    <div class="track-switch-row">
      <button class="track-btn active" id="tabTrack1" onclick="switchTrack('c-ca-nhan')">
        <span>Nền tảng giải case</span>
        <span class="track-count-badge">2/66 bài</span>
      </button>
      <button class="track-btn" id="tabTrack2" onclick="switchTrack('c-chuyen-nganh')">
        <span>Kỹ thuật &amp; phỏng vấn case</span>
        <span class="track-count-badge">1/111 bài</span>
      </button>
    </div>

    <!-- ── SEARCH & FILTER ROW ── -->
    <div class="search-filter-row">
      <div class="search-wrap-box">
        <span class="search-field-icon">🔍</span>
        <input type="text" class="search-input-field" placeholder="Tìm bài học trong lộ trình này...">
      </div>
      <button class="btn-mark-learned-pill" onclick="alert('Đã lọc bài học đã hoàn thành')">
        <span>Đánh dấu đã học</span>
        <span style="font-size:11px; opacity:0.8;">(?)</span>
      </button>
    </div>

    <!-- ── TWO-COLUMN GRID ── -->
    <div class="two-col-curriculum">

      <!-- LEFT COLUMN: STAGES LIST -->
      <section>

        <!-- STAGE 1 (EXPANDED) -->
        <div class="stage-card-wrap">
          <div class="stage-card-header-bar" onclick="toggleStageAccordion('st-1')">
            <div class="stage-left-box">
              <div class="stage-icon-square icon-amber-flag">🚩</div>
              <div>
                <div style="font-size:10.5px; font-weight:800; color:#b45309; text-transform:uppercase; letter-spacing:0.04em;">CHẶNG 1</div>
                <div class="stage-heading-text">Ước lượng quy mô thị trường</div>
              </div>
            </div>
            <div class="stage-right-metrics">
              <span class="live-learner-tag">
                <span class="pulse-dot"></span>
                21 người vừa học chặng này
              </span>
              <div class="stage-progress-track">
                <div class="stage-progress-fill" style="width: 11%;"></div>
              </div>
              <span class="stage-count-label">1/12</span>
              <span class="stage-chevron" id="chev-st-1">▲</span>
            </div>
          </div>

          <!-- Lessons List -->
          <div class="stage-lessons-container" id="list-st-1">
            <div class="lesson-item-row">
              <div class="lesson-item-left">
                <button class="btn-circle-play-black" onclick="location.href='bai-hoc.html'">▶</button>
                <span class="lesson-item-title">Vì sao mọi case đều bắt đầu bằng một con số</span>
              </div>
              <div class="lesson-item-right">
                <span class="lesson-pill-tag">Bài 1-1</span>
                <span class="lesson-ratio-label">0/1</span>
                <span class="lesson-chevron-btn">▼</span>
              </div>
            </div>

            <div class="lesson-item-row">
              <div class="lesson-item-left">
                <div class="btn-circle-lock-gray">🔒</div>
                <span class="lesson-item-title">Top-down và bottom-up: chọn đường nào</span>
              </div>
              <div class="lesson-item-right">
                <span class="lesson-pill-tag">Bài 2-3</span>
                <span class="lesson-ratio-label">1/2</span>
                <span class="lesson-chevron-btn">▼</span>
              </div>
            </div>

            <div class="lesson-item-row">
              <div class="lesson-item-left">
                <div class="btn-circle-lock-gray">🔒</div>
                <span class="lesson-item-title">Chọn đơn vị tiêu dùng đúng</span>
              </div>
              <div class="lesson-item-right">
                <span class="lesson-pill-tag">Bài 4-7</span>
                <span class="lesson-ratio-label">0/4</span>
                <span class="lesson-chevron-btn">▼</span>
              </div>
            </div>

            <div class="lesson-item-row">
              <div class="lesson-item-left">
                <div class="btn-circle-lock-gray">🔒</div>
                <span class="lesson-item-title">Giả định nào đáng tranh luận</span>
              </div>
              <div class="lesson-item-right">
                <span class="lesson-pill-tag">Bài 8-9</span>
                <span class="lesson-ratio-label">0/2</span>
                <span class="lesson-chevron-btn">▼</span>
              </div>
            </div>
          </div>
        </div>

        <!-- STAGE 2 (COLLAPSED) -->
        <div class="stage-card-wrap">
          <div class="stage-card-header-bar" onclick="toggleStageAccordion('st-2')">
            <div class="stage-left-box">
              <div class="stage-icon-square icon-green-box">%</div>
              <div style="display:flex; align-items:center; gap:6px;">
                <span style="font-size:10.5px; font-weight:800; color:var(--text-muted); text-transform:uppercase;">CHẶNG 2</span>
                <span class="badge-tag-moi">MỚI</span>
                <span class="stage-heading-text">Lợi nhuận: tìm chỗ rò trong P&amp;L</span>
              </div>
            </div>
            <div class="stage-right-metrics">
              <span class="live-learner-tag">
                <span class="pulse-dot"></span>
                6 người vừa học chặng này
              </span>
              <div class="stage-progress-track">
                <div class="stage-progress-fill" style="width: 0%;"></div>
              </div>
              <span class="stage-count-label">0/12</span>
              <span class="stage-chevron" id="chev-st-2">▼</span>
            </div>
          </div>
          <div class="stage-lessons-container" id="list-st-2" style="display:none;">
            <div class="lesson-item-row">
              <div class="lesson-item-left">
                <div class="btn-circle-lock-gray">🔒</div>
                <span class="lesson-item-title">Doanh thu không phải lợi nhuận: cây lợi nhuận và ba biến thể</span>
              </div>
              <div class="lesson-item-right"><span class="lesson-pill-tag">Bài 1-3</span><span class="lesson-ratio-label">0/3</span></div>
            </div>
          </div>
        </div>

        <!-- STAGE 3 (COLLAPSED) -->
        <div class="stage-card-wrap">
          <div class="stage-card-header-bar" onclick="toggleStageAccordion('st-3')">
            <div class="stage-left-box">
              <div class="stage-icon-square icon-green-box">₫</div>
              <div style="display:flex; align-items:center; gap:6px;">
                <span style="font-size:10.5px; font-weight:800; color:var(--text-muted); text-transform:uppercase;">CHẶNG 3</span>
                <span class="badge-tag-moi">MỚI</span>
                <span class="stage-heading-text">Định giá: chi phí, đối thủ, giá trị</span>
              </div>
            </div>
            <div class="stage-right-metrics">
              <span class="live-learner-tag">
                <span class="pulse-dot"></span>
                10 người vừa học chặng này
              </span>
              <div class="stage-progress-track">
                <div class="stage-progress-fill" style="width: 0%;"></div>
              </div>
              <span class="stage-count-label">0/9</span>
              <span class="stage-chevron" id="chev-st-3">▼</span>
            </div>
          </div>
          <div class="stage-lessons-container" id="list-st-3" style="display:none;">
            <div class="lesson-item-row">
              <div class="lesson-item-left">
                <div class="btn-circle-lock-gray">🔒</div>
                <span class="lesson-item-title">Độ co giãn, và vì sao giảm giá thường thua</span>
              </div>
              <div class="lesson-item-right"><span class="lesson-pill-tag">Bài 1-4</span><span class="lesson-ratio-label">0/4</span></div>
            </div>
          </div>
        </div>

      </section>

      <!-- RIGHT COLUMN: 3 WIDGETS -->
      <aside>

        <!-- WIDGET 1: SỔ TAY CỦA BẠN -->
        <div class="widget-box-card widget-notebook-interactive" onclick="alert('Mở Sổ tay của bạn')">
          <div class="notebook-flex-layout">
            <div class="notebook-info-col">
              <div class="notebook-badge-row">
                <div class="notebook-icon-sq">📝</div>
                <span class="notebook-eyebrow-txt">GHI CHÉP</span>
              </div>
              <h3 class="notebook-title-h3">Sổ tay của bạn</h3>
              <p class="notebook-desc-p">Ghi lại điều vừa hiểu, trước khi quên...</p>
              <a href="#" class="notebook-link-action" onclick="event.preventDefault(); alert('Mở Sổ tay');">
                Mở sổ tay &nbsp;› &nbsp;→
              </a>
            </div>

            <!-- Authentic Vintage Book Image -->
            <div class="notebook-art-container">
              <img src="assets/img/widget_notebook.png" alt="Sổ tay của bạn">
            </div>
          </div>
        </div>

        <!-- WIDGET 2: CÂU SAI CẦN ÔN TẬP -->
        <div class="widget-box-card widget-mistake-interactive" onclick="location.href='thi-vuot-chang.html'">
          <div class="mistake-circle-orange">!</div>
          <div class="mistake-info-col">
            <div class="mistake-header-line">
              <h3 class="mistake-heading-txt">Lỗi cần ôn tập</h3>
              <span class="mistake-count-pill">12 lỗi</span>
            </div>
            <p class="mistake-desc-small">Lỗi từ bài tập, case và phỏng vấn đang chờ ôn. Ôn đúng lịch để không lặp lại cùng một kiểu sai.</p>
          </div>
          <span style="color:#d97706; font-size:15px; font-weight:800;">→</span>

          <!-- Green botanical leaf decoration in bottom right -->
          <svg class="leaf-corner-decor" width="56" height="56" viewBox="0 0 100 100" fill="none">
            <path d="M100 60 C80 60, 60 75, 55 100 C75 95, 95 80, 100 60 Z" fill="#10b981" opacity="0.3"/>
            <path d="M100 40 C75 40, 50 60, 40 100 C65 90, 90 70, 100 40 Z" fill="#059669" opacity="0.2"/>
            <path d="M100 20 C70 20, 40 50, 30 100 C60 85, 85 55, 100 20 Z" fill="#047857" opacity="0.15"/>
          </svg>
        </div>

        <!-- WIDGET 3: THỬ THÁCH TÀI CHÍNH MỖI NGÀY -->
        <div class="widget-box-card">
          <div class="drill-header-strip">
            <div class="drill-title-wrap">
              <div class="drill-book-sq">📖</div>
              <h3 class="drill-heading-title">Thử thách Business Case<br>mỗi ngày</h3>
            </div>
            <div class="drill-header-tools">
              <span style="color:#10b981; font-size:9px;">●</span>
              <span style="cursor:pointer;" title="Mở rộng">⤢</span>
              <span style="cursor:pointer;">Thu gọn ▲</span>
            </div>
          </div>

          <span class="drill-pill-tag-action">TÍNH NHANH</span>

          <div class="drill-prompt-primary">
            Quán cà phê: định phí 60 triệu/tháng, giá 40.000đ/ly, chi phí biến đổi 16.000đ/ly
          </div>
          <div class="drill-prompt-secondary">
            Mỗi tháng cần bán bao nhiêu ly để hoà vốn?
          </div>

          <div class="drill-options-stack">
            <button class="drill-choice-card" onclick="selectChoice(this, 0)">
              <span class="drill-choice-letter">A</span>
              <span>2.500 ly — lãi góp 24.000đ/ly, 60 triệu ÷ 24.000đ</span>
            </button>
            <button class="drill-choice-card" onclick="selectChoice(this, 1)">
              <span class="drill-choice-letter">B</span>
              <span>1.500 ly — chia định phí cho giá bán</span>
            </button>
            <button class="drill-choice-card" onclick="selectChoice(this, 2)">
              <span class="drill-choice-letter">C</span>
              <span>3.750 ly — chia định phí cho chi phí biến đổi</span>
            </button>
            <button class="drill-choice-card" onclick="selectChoice(this, 3)">
              <span class="drill-choice-letter">D</span>
              <span>1.072 ly — chia cho giá bán cộng chi phí biến đổi</span>
            </button>
          </div>

          <button id="btnSubmitChoice" class="btn-submit-drill-choice" onclick="submitDrillChoice()">
            ✈ GỬI CÂU TRẢ LỜI
          </button>
        </div>

      </aside>

    </div>`;
};
