/* ══════════════════════════════════════════════════════════════════
   STRATLAB — Design System Showcase View
   ══════════════════════════════════════════════════════════════════ */
window.VIEWS = window.VIEWS || {};

window.VIEWS.designSystem = function() {
  return `
<!-- DẢI 1: HERO & TYPOGRAPHY TRÊN NỀN GIẤY NGÀ -->
<section class="band band-paper" style="padding: 48px 0 40px;">
  <div class="wrap">
    <div class="eyebrow">Design System · Specification v2.0</div>
    <h1 style="font-size: 38px; margin-top: 8px; line-height: 1.15;">
      Warm Stone <span style="color:var(--color-primary)">· Academic Emerald</span> <span style="color:var(--color-accent)">· Accent Amber</span>
    </h1>
    <p class="lede" style="max-width: 68ch; margin-top: 12px;">
      Hệ thống thiết kế chuẩn hoá theo 10 nguyên tắc: Một font duy nhất <strong>Plus Jakarta Sans</strong>, tỷ lệ chữ nhỏ & rất đậm, bảng màu đá ấm (Warm Stone), dải phân vùng trang (Bands), hạt giấy mịn và độ nổi bóng trung tính.
    </p>

    <!-- Navigation jump chips -->
    <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:24px;">
      <a class="chip on" href="#ds-bands">1. Dải (Bands)</a>
      <a class="chip" href="#ds-typography">2. Thang chữ (Typography)</a>
      <a class="chip" href="#ds-colors">3. Bảng màu (Palette)</a>
      <a class="chip" href="#ds-surfaces">4. Bề mặt & Bán kính</a>
      <a class="chip" href="#ds-buttons">5. Nút bấm & Hiệu ứng</a>
      <a class="chip" href="#ds-components">6. Thành phần UI</a>
      <a class="chip" href="#ds-skeleton">7. Skeleton & Motion</a>
    </div>
  </div>
</section>

<!-- DẢI 2: DẢI PHÂN VÙNG (BANDS) TRÊN NỀN HỌC THUẬT -->
<section id="ds-bands" class="band band-academic band-divider" style="padding: 44px 0;">
  <div class="wrap">
    <div class="eyebrow">1. Page Partitioning</div>
    <h2>Phân vùng trang theo DẢI (Bands)</h2>
    <p class="muted" style="margin-top: 6px; max-width: 65ch;">
      Trang không chia theo các hộp lồng hộp gò bó mà chia theo các dải màu ngang kéo dài toàn màn hình, tạo nhịp điệu đọc tự nhiên và cảm giác xuất bản cao cấp.
    </p>

    <div class="grid g3" style="margin-top: 24px;">
      <div class="panel band-paper" style="padding: 24px; border: 1px solid var(--border);">
        <div class="eyebrow">.band-paper (#fbfaf7)</div>
        <div style="font-size: 16px; font-weight: 800; margin-top: 6px;">Dải Giấy ngà</div>
        <p class="muted" style="font-size: 12.5px; margin-top: 8px;">Dùng cho Hero, Header, Lời mở đầu hoặc phần giới thiệu tạo cảm giác sách in trang nhã.</p>
      </div>
      <div class="panel band-academic" style="padding: 24px; border: 1px solid var(--border);">
        <div class="eyebrow" style="color:var(--color-primary)">.band-academic (#f2f6f2)</div>
        <div style="font-size: 16px; font-weight: 800; margin-top: 6px; color:var(--color-primary)">Dải Học thuật</div>
        <p class="muted" style="font-size: 12.5px; margin-top: 8px;">Dùng cho khu vực học tập, lộ trình bài giảng, bản đồ ngành và không gian giải case.</p>
      </div>
      <div class="panel band-ink" style="padding: 24px; border: 1px solid var(--stone-800);">
        <div class="eyebrow" style="color:var(--color-accent)">.band-ink (#12100e)</div>
        <div style="font-size: 16px; font-weight: 800; margin-top: 6px; color:#FFFFFF;">Dải Mực đậm</div>
        <p style="font-size: 12.5px; margin-top: 8px; color:var(--stone-400);">Dùng cho các thông báo đặc biệt, tổng kết thành tích, chứng chỉ hoặc CTA cao cấp.</p>
      </div>
    </div>
  </div>
</section>

<!-- DẢI 3: TYPOGRAPHY VÀ MÀU SẮC -->
<section id="ds-typography" class="band band-divider" style="padding: 44px 0; background: var(--bg);">
  <div class="wrap">
    <div class="eyebrow">2. Typography & Hierarchy</div>
    <h2>Thang chữ: Nghiêng về nhỏ và rất đậm</h2>
    <p class="muted" style="margin-top: 6px;">
      Font duy nhất: <strong>Plus Jakarta Sans</strong>. Không dùng chữ nhỏ hơn 11px cho nội dung mang thông tin.
    </p>

    <div class="grid g2" style="margin-top: 24px; align-items: start;">
      <div class="panel" style="padding: 24px;">
        <div class="sec-head"><h3>Chữ ký nhận diện</h3><span class="vi">Signature Elements</span></div>
        <div style="margin-top: 14px; display: flex; flex-direction: column; gap: 16px;">
          <div>
            <div class="eyebrow">.eyebrow · 11px Uppercase Bold (Letter-spacing: 0.14em)</div>
            <div style="font-size: 12.5px; color: var(--text-muted); margin-top: 2px;">Nhãn mắt dẫn dắt, luôn đi kèm trước tiêu đề khối</div>
          </div>
          <div>
            <div style="font-size: 36px; font-weight: 800; letter-spacing: -0.025em; line-height: 1.15;">Hero Title 36px/800</div>
            <div style="font-size: 12.5px; color: var(--text-muted); margin-top: 2px;">Tiêu đề chính trên Hero banner</div>
          </div>
          <div>
            <div style="font-size: 22px; font-weight: 800; letter-spacing: -0.02em;">Section Title 22px/800</div>
            <div style="font-size: 12.5px; color: var(--text-muted); margin-top: 2px;">Tiêu đề phân mục chính</div>
          </div>
          <div>
            <div style="font-size: 15px; font-weight: 800;">Card Header 15px/800</div>
            <div style="font-size: 12.5px; color: var(--text-muted); margin-top: 2px;">Tiêu đề thẻ case, mô hình kinh doanh</div>
          </div>
          <div>
            <div style="font-size: 13.5px; font-weight: 600; line-height: 1.55;">Body Default 13.5px/600 · Tabular Numbers: 0123456789</div>
            <div style="font-size: 12.5px; color: var(--text-muted); margin-top: 2px;">Nội dung văn bản chính và giải thích</div>
          </div>
        </div>
      </div>

      <div class="panel" style="padding: 24px;">
        <div class="sec-head"><h3>Song ngữ & Thuật ngữ</h3><span class="vi">Bilingual Badges</span></div>
        <div style="margin-top: 14px; display: flex; flex-direction: column; gap: 12px;">
          <div>
            <div class="k" style="font-size:11px; font-weight:700; color:var(--stone-500); margin-bottom:4px;">UI.gloss (EN · VI)</div>
            ${UI.gloss("Customer Acquisition Cost", "Chi phí thu hút khách hàng")}
          </div>
          <div>
            <div class="k" style="font-size:11px; font-weight:700; color:var(--stone-500); margin-bottom:4px;">UI.bi (En-bold + Vi-sub)</div>
            ${UI.bi("Lifetime Value", "Giá trị vòng đời")}
          </div>
          <div>
            <div class="k" style="font-size:11px; font-weight:700; color:var(--stone-500); margin-bottom:4px;">UI.dimLabel</div>
            <div style="font-weight:700; font-size:13px;">${UI.dimLabel("market")}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- PALETTE SWATCHES -->
    <div id="ds-colors" style="margin-top: 40px;">
      <div class="eyebrow">3. Color Palette</div>
      <h2>Bảng màu: Warm Stone + Emerald + Amber (Zero Blue)</h2>
      <p class="muted" style="margin-top: 6px;">Không sử dụng Slate/Zinc/Gray sắc lạnh. Màu xanh lam (Blue) hoàn toàn bị triệt tiêu.</p>

      <div style="margin-top: 20px; display: flex; flex-direction: column; gap: 18px;">
        <!-- Stone -->
        <div>
          <div style="font-size:12px; font-weight:800; color:var(--stone-700); margin-bottom:6px; text-transform:uppercase; letter-spacing:0.06em;">
            Warm Stone Palette (Foundational)
          </div>
          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(80px, 1fr)); gap: 8px;">
            <div style="background:var(--stone-50); border:1px solid var(--border); border-radius:8px; padding:10px; font-size:11px; font-weight:700; color:var(--stone-900);">50<br><span style="font-weight:500;font-size:10px;">#FAFAF9</span></div>
            <div style="background:var(--stone-100); border:1px solid var(--border); border-radius:8px; padding:10px; font-size:11px; font-weight:700; color:var(--stone-900);">100<br><span style="font-weight:500;font-size:10px;">#F5F5F4</span></div>
            <div style="background:var(--stone-200); border:1px solid var(--border); border-radius:8px; padding:10px; font-size:11px; font-weight:700; color:var(--stone-900);">200<br><span style="font-weight:500;font-size:10px;">#E7E5E4</span></div>
            <div style="background:var(--stone-300); border-radius:8px; padding:10px; font-size:11px; font-weight:700; color:var(--stone-900);">300<br><span style="font-weight:500;font-size:10px;">#D6D3D1</span></div>
            <div style="background:var(--stone-400); border-radius:8px; padding:10px; font-size:11px; font-weight:700; color:#FFFFFF;">400<br><span style="font-weight:500;font-size:10px;">#A8A29E</span></div>
            <div style="background:var(--stone-500); border-radius:8px; padding:10px; font-size:11px; font-weight:700; color:#FFFFFF;">500<br><span style="font-weight:500;font-size:10px;">#78716C</span></div>
            <div style="background:var(--stone-600); border-radius:8px; padding:10px; font-size:11px; font-weight:700; color:#FFFFFF;">600<br><span style="font-weight:500;font-size:10px;">#57534E</span></div>
            <div style="background:var(--stone-700); border-radius:8px; padding:10px; font-size:11px; font-weight:700; color:#FFFFFF;">700<br><span style="font-weight:500;font-size:10px;">#44403C</span></div>
            <div style="background:var(--stone-800); border-radius:8px; padding:10px; font-size:11px; font-weight:700; color:#FFFFFF;">800<br><span style="font-weight:500;font-size:10px;">#292524</span></div>
            <div style="background:var(--stone-900); border-radius:8px; padding:10px; font-size:11px; font-weight:700; color:#FFFFFF;">900<br><span style="font-weight:500;font-size:10px;">#1C1917</span></div>
            <div style="background:var(--stone-950); border-radius:8px; padding:10px; font-size:11px; font-weight:700; color:#FFFFFF;">950<br><span style="font-weight:500;font-size:10px;">#0C0A09</span></div>
          </div>
        </div>

        <!-- Emerald & Amber & Rose -->
        <div class="grid g3">
          <div>
            <div style="font-size:12px; font-weight:800; color:var(--color-primary); margin-bottom:6px; text-transform:uppercase; letter-spacing:0.06em;">
              Academic Emerald (Primary #059669)
            </div>
            <div style="display:flex; gap:6px;">
              <div style="flex:1; background:var(--emerald-50); border:1px solid var(--emerald-200); border-radius:8px; padding:10px; font-size:11px; font-weight:700; color:var(--emerald-800);">50</div>
              <div style="flex:1; background:var(--emerald-100); border-radius:8px; padding:10px; font-size:11px; font-weight:700; color:var(--emerald-800);">100</div>
              <div style="flex:1.5; background:var(--color-primary); border-radius:8px; padding:10px; font-size:11px; font-weight:800; color:#FFFFFF;">600 Pri</div>
              <div style="flex:1; background:var(--color-primary-hover); border-radius:8px; padding:10px; font-size:11px; font-weight:700; color:#FFFFFF;">700</div>
            </div>
          </div>

          <div>
            <div style="font-size:12px; font-weight:800; color:var(--color-accent); margin-bottom:6px; text-transform:uppercase; letter-spacing:0.06em;">
              Accent Amber (Streak/Reward #D97706)
            </div>
            <div style="display:flex; gap:6px;">
              <div style="flex:1; background:var(--amber-50); border:1px solid var(--amber-200); border-radius:8px; padding:10px; font-size:11px; font-weight:700; color:var(--amber-800);">50</div>
              <div style="flex:1; background:var(--amber-100); border-radius:8px; padding:10px; font-size:11px; font-weight:700; color:var(--amber-800);">100</div>
              <div style="flex:1.5; background:var(--color-accent); border-radius:8px; padding:10px; font-size:11px; font-weight:800; color:#FFFFFF;">600 Acc</div>
              <div style="flex:1; background:var(--color-accent-hover); border-radius:8px; padding:10px; font-size:11px; font-weight:700; color:#FFFFFF;">700</div>
            </div>
          </div>

          <div>
            <div style="font-size:12px; font-weight:800; color:var(--rose-700); margin-bottom:6px; text-transform:uppercase; letter-spacing:0.06em;">
              Warning Rose (#E11D48)
            </div>
            <div style="display:flex; gap:6px;">
              <div style="flex:1; background:var(--rose-50); border:1px solid var(--rose-200); border-radius:8px; padding:10px; font-size:11px; font-weight:700; color:var(--rose-700);">50</div>
              <div style="flex:1; background:var(--rose-100); border-radius:8px; padding:10px; font-size:11px; font-weight:700; color:var(--rose-700);">100</div>
              <div style="flex:1.5; background:var(--rose-600); border-radius:8px; padding:10px; font-size:11px; font-weight:800; color:#FFFFFF;">600 Err</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- DẢI 4: SURFACES, RADIUS, BUTTONS, CARDS -->
<section id="ds-surfaces" class="band band-academic band-divider" style="padding: 44px 0;">
  <div class="wrap">
    <div class="eyebrow">4. Surfaces & Controls</div>
    <h2>Bề mặt, Bán kính và Nút bấm tương tác</h2>

    <div class="grid g2" style="margin-top: 24px;">
      <!-- Controls & Buttons -->
      <div id="ds-buttons" class="panel" style="padding: 24px;">
        <div class="sec-head"><h3>Button States & Micro-interactions</h3><span class="vi">0.2s Hover Lift</span></div>
        <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:16px;">
          <button class="btn btn-primary">Primary Action &nbsp;→</button>
          <button class="btn">Default Button</button>
          <button class="btn btn-ghost">Ghost Button</button>
          <button class="btn btn-accent">Accent Button</button>
          <button class="btn btn-sm btn-primary">Small Primary</button>
          <button class="btn btn-sm">Small Default</button>
          <button class="btn btn-sm" onclick="UI.toast('SYSTEM NOTICE', 'Design system token verification complete!')">Trigger Toast</button>
        </div>

        <div style="margin-top: 24px;">
          <div class="sec-head"><h3>Tag & Pill Badges</h3><span class="vi">Difficulty & Status</span></div>
          <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:12px;">
            ${UI.diffTag("easy")}
            ${UI.diffTag("medium")}
            ${UI.diffTag("hard")}
            ${UI.diffTag("expert")}
            <span class="tag brass">VN Market</span>
            <span class="tag gold">Streak x7</span>
            <span class="tag neg">High Risk</span>
          </div>
        </div>
      </div>

      <!-- Stats & Key Values -->
      <div id="ds-components" class="panel" style="padding: 24px;">
        <div class="sec-head"><h3>Stats & Key-Value Components</h3><span class="vi">High Density</span></div>
        <div class="grid g2" style="margin-top: 16px;">
          ${UI.statBox("Total Missions", "24", "4 cấp bậc")}
          ${UI.statBox("Global Accuracy", "88.4%", "+3.2% tuần này", "brass")}
        </div>
        <div style="margin-top: 16px;">
          ${UI.kv("Framework", "MECE Issue Tree")}
          ${UI.kv("Industry", "Fintech · E-Commerce")}
          ${UI.kv("Est. Time", "15 minutes")}
        </div>
      </div>
    </div>

    <!-- SKELETON SHIMMER & MOTION -->
    <div id="ds-skeleton" style="margin-top: 32px;">
      <div class="sec-head"><h3>Skeleton Shimmer (1.4s Linear)</h3><span class="vi">Loading State</span></div>
      <div class="panel" style="padding: 20px; margin-top: 14px;">
        <div style="display:flex; gap:16px; align-items:center;">
          <div class="skeleton" style="width:48px; height:48px; border-radius:var(--radius-control); flex:none;"></div>
          <div style="flex:1; display:flex; flex-direction:column; gap:8px;">
            <div class="skeleton" style="height:16px; width:45%;"></div>
            <div class="skeleton" style="height:12px; width:80%;"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
`;
};
