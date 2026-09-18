#!/usr/bin/env python3
"""Đồng bộ sidebar cho các trang học viên ở thư mục gốc.

Trước đây mỗi trang HTML tự chép một bản sidebar nên 15 trang có 14 phiên bản khác nhau
(khác độ rộng, thương hiệu, danh sách mục, đường dẫn, font) — bấm qua lại giữa các tab thì
sidebar nhảy và đổi giao diện. Script này là nguồn duy nhất của sidebar:

  python3 tools/sync-sidebar.py          ghi sidebar chuẩn vào mọi trang trong PAGES
  python3 tools/sync-sidebar.py --check  chỉ kiểm tra; thoát mã 1 nếu có trang bị lệch

Sidebar được ghi thẳng vào HTML (không dựng bằng JS) để có ngay ở lần vẽ đầu tiên.
Kiểu dáng nằm ở assets/shared/sidebar.css. Muốn đổi menu: sửa NAV bên dưới rồi chạy lại.
"""
import hashlib, html, pathlib, re, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
CSS = ROOT / "assets/shared/sidebar.css"
FONT_URL = ("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@"
            "0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600;1,700;1,800&display=swap")
START = "<!-- SIDEBAR:START · tự sinh bởi tools/sync-sidebar.py — đừng sửa tay -->"
END = "<!-- SIDEBAR:END -->"

SVG_HOME = ('<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">'
            '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>')
SVG_CHAT = ('<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">'
            '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>')

# (khoá, đường dẫn, icon, nhãn, phụ) — phụ: ("badge", lớp, chữ) | ("more", "›") | None
NAV = [
    (None, False, [
        ("dashboard", "dashboard.html", SVG_HOME, "Dashboard", None),
        ("finsocial", "case-social.html", SVG_CHAT, "CaseSocial", None),
    ]),
    ("🌱 HỌC TẬP", True, [
        ("batdau", "bat-dau-tu-dau.html", "🧭", "Bắt đầu từ đâu", None),
        ("hocbai", "hoc-bai.html", "📖", "Học bài", None),
        ("nghe", "hoc-theo-nghe.html", "💼", "Học theo nghề", None),
        ("chungchi", "tai-lieu.html", "📜", "Chứng chỉ", ("more", "›")),   # chưa có trang chứng chỉ riêng
    ]),
    ("⚡ THỰC HÀNH", False, [
        ("quiz", "bai-hoc.html", "🎯", "Quiz", ("badge", "sb-new", "TIN MỚI")),
        ("thi", "thi-vuot-chang.html", "🏆", "Thi vượt chặng", None),
        ("game", "game-kingdom.html", "🎮", "Game Kingdom", ("badge", "sb-hot", "HOT")),
        ("phongvan", "luyen-phong-van.html", "👥", "Luyện phỏng vấn", None),
    ]),
    ("👥 CỘNG ĐỒNG", False, [
        ("thuvien", "tai-lieu.html", "🏛️", "Thư viện", None),
        ("nhom", "hoc-nhom.html", "🤝", "Học nhóm", ("badge", "sb-check", "CHECK-IN")),
        ("thongke", "thong-ke.html", "📊", "Thống kê", None),
    ]),
]

# trang → mục được đánh dấu đang mở ("gold" = túi vàng, "user" = hồ sơ ở chân sidebar)
PAGES = {
    "dashboard.html": "dashboard", "case-social.html": "finsocial", "bat-dau-tu-dau.html": "batdau",
    "hoc-bai.html": "hocbai", "hoc-theo-nghe.html": "nghe", "thi-vuot-chang.html": "thi",
    "game-kingdom.html": "game", "luyen-phong-van.html": "phongvan", "tai-lieu.html": "thuvien",
    "hoc-nhom.html": "nhom", "thong-ke.html": "thongke", "ho-so.html": "user", "cua-hang-rpg.html": "gold",
}

# giữ vị trí cuộn của menu khi sang trang khác (chạy ngay, trước lần vẽ đầu); nếu mục đang mở nằm ngoài vùng nhìn thấy (đến từ link ngoài menu) thì kéo nó vào giữa
SCROLL_JS = ("<script>(function(){var n=document.getElementById('sbNav');if(!n)return;"
             "try{var y=sessionStorage.getItem('sb-scroll');if(y)n.scrollTop=+y;}catch(e){}"
             "var a=n.querySelector('.sb-on');if(a){var r=a.getBoundingClientRect(),b=n.getBoundingClientRect();"
             "if(r.top<b.top||r.bottom>b.bottom)n.scrollTop+=r.top-b.top-(b.height-r.height)/2;}"
             "addEventListener('pagehide',function(){try{sessionStorage.setItem('sb-scroll',n.scrollTop);}catch(e){}});"
             "})();</script>")


def link(item, active):
    key, href, icon, label, extra = item
    on = key == active
    tail = ""
    if extra and extra[0] == "badge":
        tail = f'<span class="sb-badge {extra[1]}">{extra[2]}</span>'
    elif extra and extra[0] == "more":
        tail = f'<span class="sb-more" aria-hidden="true">{extra[1]}</span>'
    cur = ' aria-current="page"' if on else ""
    return (f'      <a href="{href}" class="sb-link{" sb-on" if on else ""}"{cur}>'
            f'<span class="sb-ic" aria-hidden="true">{icon}</span><span>{html.escape(label)}</span>{tail}</a>')


def render(active):
    ucur = ' aria-current="page"' if active == "user" else ""
    out = [START, '<aside class="sb" aria-label="Điều hướng chính">',
           '  <div class="sb-head"><a href="dashboard.html" class="sb-brand" aria-label="Tự học Business Case — về Dashboard">',
           '    <span class="sb-brand-icon" aria-hidden="true"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">'
           '<path d="M12 22v-9"/><path d="M12 13a5 5 0 0 0 5-5c0-4-5-6-5-6s-5 2-5 6a5 5 0 0 0 5 5z" fill="#10b981" fill-opacity="0.25"/>'
           '<path d="M7 11a4 4 0 0 0-4-4c0-3 4-4 4-4s4 1 4 4a4 4 0 0 0-4 4z" fill="#10b981" fill-opacity="0.35"/></svg></span>',
           '    <span class="sb-brand-text"><span class="sb-brand-sub">TỰ HỌC</span><span class="sb-brand-main">BUSINESS CASE</span></span></a></div>',
           '  <label class="sb-search"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">'
           '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>'
           '<input id="searchInput" type="search" placeholder="Tìm kiếm…" autocomplete="off" aria-label="Tìm kiếm"><kbd>⌘K</kbd></label>',
           '  <nav class="sb-nav" id="sbNav">']
    for heading, card, items in NAV:
        if heading:
            out.append(f'    <div class="sb-group"><span>{heading}</span><i aria-hidden="true">▾</i></div>')
        if card:
            out.append('    <div class="sb-card">')
        out += [link(it, active) for it in items]
        if card:
            out.append('    </div>')
    out += ['  </nav>', "  " + SCROLL_JS,
            '  <div class="sb-foot">',
            '    <div class="sb-wallet">',
            f'      <a href="cua-hang-rpg.html" class="sb-gold{" sb-on" if active == "gold" else ""}" title="Túi vàng — đổi quà ở cửa hàng">'
            '<span aria-hidden="true">🪙</span><span>Túi vàng</span><span class="sb-gold-n" id="goldSidebarCount">60</span></a>',
            '      <button type="button" class="sb-bell" title="Thông báo" aria-label="Thông báo, 9+ mới">'
            '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">'
            '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg><b>9+</b></button>',
            '    </div>',
            f'    <a href="ho-so.html" class="sb-user{" sb-on" if active == "user" else ""}" title="Hồ sơ cá nhân"{ucur}>',
            '      <span class="sb-av"><img src="assets/img/user_avatar.png" alt="" onerror="this.parentNode.textContent=\'ĐTB\'"></span>',
            '      <span class="sb-user-text"><span class="sb-user-name">Đinh Trí Bùi</span><span class="sb-user-mail">tribd.tec@gmail.com</span></span>',
            '      <span class="sb-caret" aria-hidden="true">▾</span></a>',
            '  </div>',
            '</aside>', END]
    return "\n".join(out)


def css_link():
    v = hashlib.md5(CSS.read_bytes()).hexdigest()[:8]
    return f'<link rel="stylesheet" href="assets/shared/sidebar.css?v={v}">'


def sync(text, active):
    """Trả về HTML đã gắn sidebar chuẩn, link CSS dùng chung và URL font thống nhất."""
    block = render(active)
    if START in text:
        text = re.sub(re.escape(START) + r".*?" + re.escape(END), lambda m: block, text, count=1, flags=re.S)
    else:
        m = re.search(r'<aside\b[^>]*class="(?:sidebar|rail)"[^>]*>.*?</aside>', text, re.S)
        if not m:
            raise SystemExit("không tìm thấy sidebar cũ để thay")
        text = text[:m.start()] + block + text[m.end():]
    text = re.sub(r'href="https://fonts\.googleapis\.com/css2\?family=Plus\+Jakarta\+Sans[^"]*"', f'href="{FONT_URL}"', text)
    text = re.sub(r'\s*<link rel="stylesheet" href="assets/shared/sidebar\.css[^"]*">', "", text)
    font = re.search(r'<link[^>]*fonts\.googleapis\.com/css2[^>]*>', text)
    at = font.end() if font else text.index("</head>")
    return text[:at] + "\n" + css_link() + text[at:]


def main():
    check = "--check" in sys.argv
    bad = []
    for name, active in PAGES.items():
        path = ROOT / name
        old = path.read_text(encoding="utf-8")
        new = sync(old, active)
        if old != new:
            bad.append(name)
            if not check:
                path.write_text(new, encoding="utf-8")
    if check:
        if bad:
            print("Sidebar lệch so với nguồn chuẩn ở:", ", ".join(bad))
            print("Chạy: python3 tools/sync-sidebar.py")
            sys.exit(1)
        print(f"Sidebar khớp nguồn chuẩn ở cả {len(PAGES)} trang.")
    else:
        print(f"Đã đồng bộ {len(bad)}/{len(PAGES)} trang" + (": " + ", ".join(bad) if bad else "."))


if __name__ == "__main__":
    main()
