# CASELAB — Kiến trúc sản phẩm
**Business Case Training Studio** · kiến trúc · sitemap · trang chính · database · component UI
Cập nhật: 2026-09-14 · Trạng thái: v2 — 9/9 màn đã dựng, 100/100 bài và 17/17 case có nội dung, tiến độ lưu thật qua State store

---

## 1. Kiến trúc sản phẩm

### 1.1 Nguyên tắc thiết kế

| Nguyên tắc | Nghĩa là gì trong sản phẩm |
|---|---|
| **Học để giải, không học để biết** | Mỗi bài kết thúc bằng một **output cụ thể**: một phép tính, một slide, một insight từ chart, một khuyến nghị, một checklist, hoặc một câu trả lời nói. Không có bài "đọc xong rồi thôi". |
| **Một dòng chảy duy nhất** | Learn → Practice → Compete/Interview → Review → Career. Mọi màn hình phải trả lời được câu "bước tiếp theo của tôi là gì". |
| **Sai là dữ liệu** | Mọi lỗi được phân loại (framework / tính toán / logic / trình bày / đọc sai exhibit) và quay lại thành bài ôn, không bị vứt đi. |
| **Song ngữ có kỷ luật** | Giao diện có hai chế độ VI/EN (nút ở thanh trên). Thuật ngữ giữ nguyên tiếng Anh (*Profitability tree*, *Break-even*), giải thích bằng tiếng Việt. Toàn bộ 100 bài học đã có bản tiếng Anh song song; đề case (Arena) hiện mới có bản tiếng Việt. |
| **Không build step** | Vanilla JS + CSS tokens, chạy được từ `file://` lẫn static host. Đổi nội dung không cần deploy pipeline. |

### 1.2 Bốn lớp

```
┌─────────────────────────────────────────────────────────────┐
│ LỚP 4 · TRẢI NGHIỆM   Dashboard · Lesson · Arena · Library  │
│                       Competition · Interview · Review ·    │
│                       Career Path                           │
├─────────────────────────────────────────────────────────────┤
│ LỚP 3 · ENGINE        Lesson engine (10 phần)               │
│                       Case engine (9 step kinds)            │
│                       Scoring engine (6 tiêu chí)           │
│                       Progress/XP · Mistake classifier      │
├─────────────────────────────────────────────────────────────┤
│ LỚP 2 · NỘI DUNG      curriculum.js (6 track / 44 module /  │
│                       100 bài) · library.js (case + ngành + │
│                       loại) · careers.js (6 lộ trình nghề)  │
├─────────────────────────────────────────────────────────────┤
│ LỚP 1 · NỀN           Router (hash) · State store ·         │
│                       Persistence · Theme · Search          │
└─────────────────────────────────────────────────────────────┘
```

### 1.3 Luồng người học

```
                      ┌──────────────┐
                      │  DASHBOARD   │◀───── điểm quay về sau mọi hoạt động
                      └──────┬───────┘
             ┌───────────────┼────────────────┐
             ▼               ▼                ▼
      ┌────────────┐  ┌─────────────┐  ┌─────────────┐
      │ LỘ TRÌNH   │  │ CASE        │  │ CAREER PATH │
      │ HỌC        │  │ LIBRARY     │  │ (mục tiêu)  │
      └─────┬──────┘  └──────┬──────┘  └──────┬──────┘
            ▼                │            gate: "muốn vào
      ┌────────────┐         │             Consulting cần
      │ LESSON     │         │             giải được X"
      │ (10 phần)  │         │                │
      └─────┬──────┘         │                │
            │ CTA "Vào Arena"│                │
            ▼                ▼                ▼
      ┌──────────────────────────────────────────────┐
      │ PRACTICE ARENA · COMPETITION · INTERVIEW     │
      └──────────────────┬───────────────────────────┘
                         ▼ chấm theo 6 tiêu chí
                  ┌─────────────┐
                  │ MISTAKE     │──► sinh bài ôn ─────► LESSON
                  │ REVIEW      │──► sinh case lại ───► ARENA
                  └─────────────┘
```

### 1.4 Engine

**Lesson engine — 10 phần chuẩn** (mọi bài đều theo khuôn này):
1. Mục tiêu bài · 2. Khái niệm cốt lõi · 3. Framework/công thức · 4. Ví dụ có số thật ·
5. Mini-case áp dụng · 6. Lỗi thường gặp · 7. Mẫu trình bày (slide/lời nói) ·
8. Quiz kiểm tra · 9. Checklist tự đánh giá · 10. Cầu nối sang Practice Arena.

**Case engine — step kinds:**
`clarify` · `tree` · `multi` · `datalab` · `calc` · `rank` · `decision` · `mcq` · `recommend`

**Scoring engine — 6 tiêu chí** (khớp `SKILL_NAMES` trong `library.js`):

| Mã | Tiêu chí | Chấm cái gì |
|---|---|---|
| `struct` | Structuring | Cây vấn đề có MECE không, có bỏ sót nhánh lớn không |
| `math` | Case math | Phép tính đúng, đơn vị đúng, làm tròn hợp lý |
| `data` | Data analysis | Đọc đúng exhibit, lấy đúng con số cần |
| `insight` | Insight | Rút ra được "so what", không chỉ mô tả số |
| `story` | Storyline | Trình tự lập luận, answer-first |
| `fin` | Financial logic | NPV / margin / unit economics dùng đúng chỗ |

**Mistake classifier** — mỗi câu sai gắn `{kind, lessonId, caseId, ts}` với
`kind ∈ {framework, calculation, logic, presentation, misread-exhibit}`.
Mistake Review gom theo `kind` và đề xuất đúng bài học tương ứng.

---

## 2. Sitemap

```
landing.html                       Trang giới thiệu (public, không cần tiến độ)
index.html#/dashboard              Vào ứng dụng học
#/dashboard                        Trang chủ người học
│
├─ HỌC TẬP
│  ├─ #/tracks                     Lộ trình học — 6 track
│  │  └─ #/tracks/:trackId         Chi tiết track → danh sách module
│  │     └─ #/lesson/:lessonId     Bài học (10 phần)
│  │        └─ #/lesson/:id/quiz   Quiz cuối bài              (planned)
│  └─ #/samples                    Bài học mẫu (xem không cần tiến độ)
│
├─ LUYỆN TẬP
│  ├─ #/arena                      Practice Arena — workspace 2 pane
│  │  └─ #/arena/:caseId           Giải một case cụ thể
│  │     └─ #/arena/:caseId/result Bảng điểm + model answer   (planned)
│  ├─ #/library                    Case Library — bảng lọc
│  │  └─ #/library/:caseId         Case detail / preview
│  ├─ #/competition                Case Competition Simulator
│  │  └─ #/competition/:id         Phòng thi có deadline
│  └─ #/interview                  Consulting Interview Mode
│     └─ #/interview/:id           Phiên phỏng vấn theo vòng
│
├─ PHÁT TRIỂN
│  ├─ #/career                     Career Path — 6 lộ trình nghề
│  │  └─ #/career/:careerId        Chi tiết: skill, firm, gate, steps
│  └─ #/review                     Mistake Review
│     └─ #/review/:kind            Lọc theo loại lỗi
│
└─ HỆ THỐNG
   ├─ #/profile                    Hồ sơ, badge, lịch sử
   ├─ #/settings                   Theme, ngôn ngữ, backup/restore
   └─ (overlay) Search             Cmd/Ctrl-K — tìm bài, case, thuật ngữ
```

---

## 3. Các trang chính

| # | Trang | Route | Nội dung chính | Trạng thái |
|---|---|---|---|---|
| 0 | **Landing** | `landing.html` | Trang giới thiệu: hero, 3 điểm khác biệt, 5 bước học, 6 track (đọc số liệu thật từ `curriculum.js` và `library.js`), ví dụ bài học, FAQ, CTA | ✅ |
| 1 | **Dashboard** | `#/dashboard` | Resume hero (bài đang dở) · 4 metric (XP tuần, streak, case đã giải, xếp hạng) · tiến độ 6 track · nhiệm vụ hôm nay · streak strip | ✅ |
| 2 | **Lộ trình học** | `#/tracks` | 6 track × module × bài; khoá/mở theo tiến độ; hiện `lv` và `output` từng bài | ✅ |
| 3 | **Lesson page** | `#/lesson/:id` | 10 phần nội dung + sidebar dính (quiz, checklist, CTA sang Arena) | ✅ |
| 4 | **Case Practice Arena** | `#/arena` | 2 pane — trái: brief + exhibit (chart/table); phải: answer canvas + rubric 6 tiêu chí + timer | ✅ |
| 5 | **Case Library** | `#/library` | Bảng dày 17 case, segmented control theo mode, 4 bộ lọc (ngành, loại, độ khó, trạng thái) | ✅ |
| 6 | **Career Path** | `#/career` | 6 nghề, stepline tiến độ, skill bar, tiêu chí tốt nghiệp | ✅ |
| 7 | **Competition Simulator** | `#/competition` · `#/competition/:id` | 3 đề thi thật: phân tích → slide outline → Q&A, đồng hồ theo hạn từng deliverable, chấm 7 tiêu chí, ghi tiến độ và lỗi | ✅ |
| 8 | **Interview Mode** | `#/interview` · `#/interview/:id` | 2 case phỏng vấn 5 vòng: transcript, ghi nhận từng vòng, chấm 5 tiêu chí, ghi tiến độ và lỗi | ✅ |
| 9 | **Mistake Review** | `#/review` | Gom lỗi theo loại, đề xuất bài ôn, luyện lại theo điểm yếu | ✅ |

---

## 4. Cấu trúc database

Prototype chạy trên **localStorage** (`caselab.v2`). Schema dưới đây viết dạng quan hệ để chuyển thẳng sang Postgres/Supabase khi lên server. Phần *Nội dung* là read-only (seed từ file JS), phần *Người dùng* là read-write.

### 4.1 Nội dung (seed, read-only)

```
tracks
  id            text PK      -- fundamentals|competition|consulting|marketing|supplychain|finance
  name_en       text
  name_vi       text
  icon          text
  color         text         -- navy|emerald|amber|rose|slate|violet
  level         text         -- Beginner | Intermediate | Advanced
  promise       text         -- học xong làm được gì
  audience      text         -- dành cho ai
  order         int

modules
  id            text PK
  track_id      text FK → tracks.id
  name_en, name_vi  text
  order         int

lessons
  id            text PK
  module_id     text FK → modules.id
  title         text
  minutes       int          -- m
  level         int          -- lv 1..4
  output_kind   text         -- calculation|slide|chart insight|recommendation|checklist|speaking answer
  order         int
  body          jsonb        -- 10 phần: {goal, concepts[], framework, worked_example,
                             --   mini_case, mistakes[], template, quiz[], checklist[], bridge}

cases
  id            text PK
  title         text
  company       text
  industry_id   text FK → industries.id
  case_type     text FK → case_types.name
  difficulty    int          -- 1 Beginner · 2 Intermediate · 3 Advanced · 4 Competition
  minutes       int
  mode          text         -- practice | competition | interview
  hook          text
  skills        text[]       -- struct|math|data|insight|story|fin
  steps         jsonb        -- mảng step theo step kinds
  model_answer  jsonb
  rubric        jsonb        -- trọng số 6 tiêu chí

industries    id, name       -- 10 ngành
case_types    name           -- 8 loại case
skills        id, name       -- 6 tiêu chí

careers
  id            text PK
  name_en, name_vi, icon, color, intro   text
  entry_roles   text[]
  firms         text
  skills        jsonb        -- [{name, level 1..5}]
  track_ids     text[]       -- track cần học
  steps         jsonb        -- [{title, detail}]
  gate          text         -- tiêu chí tốt nghiệp
```

### 4.2 Người dùng (read-write)

```
users
  id            uuid PK
  email         text unique
  display_name  text
  avatar_initials text
  level         int          -- Lv hiển thị ở rail
  rank_title    text         -- "Case Challenger" …
  xp_total      int
  created_at    timestamptz

lesson_progress
  user_id       uuid FK
  lesson_id     text FK
  status        text         -- not_started | in_progress | done
  quiz_score    numeric      -- 0..1
  checklist     jsonb        -- {itemIndex: bool}
  seconds_spent int
  updated_at    timestamptz
  PK (user_id, lesson_id)

case_attempts
  id            uuid PK
  user_id       uuid FK
  case_id       text FK
  mode          text         -- practice | competition | interview
  started_at, finished_at   timestamptz
  seconds_used  int
  answers       jsonb        -- theo từng step
  scores        jsonb        -- {struct,math,data,insight,story,fin} mỗi cái 0..100
  score_total   int
  passed        bool

mistakes
  id            uuid PK
  user_id       uuid FK
  attempt_id    uuid FK → case_attempts.id  -- null nếu lỗi từ quiz bài học
  lesson_id     text                         -- null nếu lỗi từ case
  kind          text   -- framework|calculation|logic|presentation|misread-exhibit
  snippet       text   -- câu trả lời sai
  correct       text
  suggest_lesson_id text
  resolved      bool   -- đã luyện lại đúng chưa
  created_at    timestamptz

streaks
  user_id       uuid PK
  current_days  int
  best_days     int
  last_active   date
  history       jsonb  -- 7 ngày gần nhất cho streak strip

daily_missions
  user_id       uuid
  date          date
  missions      jsonb  -- [{id,label,target,progress,done}]
  PK (user_id, date)

badges
  user_id       uuid
  badge_id      text
  earned_at     timestamptz
  PK (user_id, badge_id)

career_goal
  user_id       uuid PK
  career_id     text FK → careers.id
  set_at        timestamptz
```

### 4.3 Hình dạng localStorage (prototype)

```jsonc
// key: "caselab.v2"
{
  "v": 2,
  "user":     { "name":"Tri Bùi", "lv":3, "xp":1240, "rank":"Case Challenger" },
  "lessons":  { "f-tree-1": { "status":"done", "quiz":1.0, "chk":[true,true,false] } },
  "cases":    { "cl-01": { "best":82, "attempts":2,
                           "scores":{"struct":85,"math":78,"data":80,
                                     "insight":84,"story":79,"fin":86} } },
  "mistakes": [ { "kind":"calculation", "caseId":"cl-01",
                  "lessonId":"f-tree-1", "resolved":false } ],
  "streak":   { "cur":6, "best":11, "last":"2026-09-12", "days":[1,1,1,0,1,1,1] },
  "daily":    { "date":"2026-09-12", "done":2, "total":4 },
  "career":   "consulting",
  "badges":   ["first-case","streak-7"]
}
// key: "caselab.theme"  →  "light" | "dark"
```

> **Quy tắc bất biến:** bảng tra cứu (`LESSON_BY_ID`, `CASE_BY_ID`, `MODULE_BY_ID`, `TRACK_BY_ID`) **luôn đặt ở cuối file dữ liệu**, sau mọi khối `concat`. Đặt ở giữa file thì mọi nội dung thêm sau đó sẽ vô hình với router — lỗi này đã xảy ra hai lần ở v1.

---

## 5. Component UI

Design tokens ở `assets/css/app.css`.
Bảng màu: nền `#F7F5EF`, surface `#FFFFFF`, chữ chính `#111827`, chữ phụ `#64748B`, navy `#0F172A`, executive blue `#1E3A8A`, emerald `#047857` / soft `#ECFDF5`, amber `#D97706` / soft `#FFFBEB`, rose `#BE123C`, border `#E5E7EB`.
Toàn bộ sản phẩm dùng **một tone sáng duy nhất** — không còn dark mode và không còn nút đổi giao diện. Sidebar, hero và banner deadline đều nền trắng/kem với viền mảnh; màu đậm chỉ còn ở nút, chip đang chọn và toast để đủ tương phản.
Bán kính 8–14px, viền mảnh, đổ bóng nhẹ, số dùng `font-variant-numeric: tabular-nums`, nhãn nhỏ in hoa giãn chữ.

### 5.1 Khung (layout)

| Component | Class | Dùng ở đâu |
|---|---|---|
| App shell | `.app` | Grid rail + main |
| Sidebar điều hướng | `.rail` `.rail-brand` `.rail-sec` `.rail-user` | Toàn app — 3 nhóm: Học tập / Luyện tập / Phát triển |
| Topbar | `.top` `.top-in` `.crumbs` `.searchbox` `.icon-btn` | Breadcrumb + search + theme toggle |
| Lưới nội dung | `.grid` `.g2` `.g4` `.row` `.wrap-row` | Bố cục chung |
| Khung bài học | `.lesson-shell` (1fr / 316px) `.sticky-side` | Lesson page |
| Khung arena | `.arena` `.arena-l` `.arena-r` | Practice Arena |

### 5.2 Hiển thị dữ liệu

| Component | Class | Mô tả |
|---|---|---|
| Card | `.card` `.card-h` `.card-b` `.card-f` | Khối cơ bản, viền mảnh |
| Metric card | `.metric` `.num` `.delta` `.up` | Số lớn tabular + delta so kỳ trước |
| Bảng dày | `table.tb` | Case Library, framework, worked example |
| Thanh tiến độ | `.bar` `.bar-lg` | Tiến độ track, skill level |
| Biểu đồ cột SVG | `.chart-s` `.chart-t` + helper `barChart()` | Exhibit trong Arena — sinh inline, không ảnh ngoài |
| Databox | `.databox` `.databox-h` | Bảng số liệu trong exhibit |
| Exhibit | `.exhibit` | Vỏ có nhãn "Exhibit N" + đơn vị |
| Hero resume | `.hero-resume` `.hero-in` `.hero-t` `.hero-m` `.gridpat` | Dashboard — nền navy gradient + lưới |
| Stepline | `.stepline` `.dot` | Career Path — các chặng |
| Streak strip | `.streak` | 7 ô ngày |
| Track row | `.tracklist` `.trackrow` | Tiến độ theo track |
| Empty state | `.empty` | Các màn chưa có |

### 5.3 Nhãn & trạng thái

| Component | Class | Mô tả |
|---|---|---|
| Tag màu | `.tag` `.tag-a/-b/-e/-r/-s/-v` | Loại case, track, output kind |
| Tile icon | `.tile` `.tile-lg` `.t-navy/-emerald/-amber/-rose/-slate/-violet` | Biểu tượng track/nghề |
| Thanh độ khó | `.diff` `.d1 .d2 .d3 .d4` | 4 bậc Beginner → Competition |
| Nhãn nhỏ in hoa | `.lbl` `.lbl-b` | Tiêu đề mục, đơn vị |
| Timer | `.timer` | Đồng hồ ngược trong Arena |
| Callout | `.callout` | Feedback sau chấm điểm |
| Divider | `.divider` `.sec-h` | Phân đoạn |

### 5.4 Nhập liệu & hành động

| Component | Class | Mô tả |
|---|---|---|
| Nút | `.btn` `.btn-p/-a/-e/-gh` `.btn-sm/-lg` | Primary / accent / emerald / ghost |
| Segmented control | `.seg` | Lọc mode ở Library |
| Ô chọn / dropdown | `.field` `.toolbar` | Bộ lọc |
| Answer canvas | `.canvas-field` `.hyp-row` | Ô nhập trong Arena |
| Option đáp án | `.opt` | Mini-case, khuyến nghị — có trạng thái đúng/sai + giải thích |
| Checklist | `.chk-item` `.chk-box` | Cuối bài học |
| Mission row | `.mission` | Nhiệm vụ hôm nay |
| Rubric row | `.rubric-row` | 6 tiêu chí chấm điểm |
| Framework block | `.fw` `.fw-h` `.fw-row` `.fw-b` | Khối framework trong bài học |
| Section đánh số | `.lsec` `.lsec-h` `.lsec-n` | 10 phần của bài học |
| Skill bar | `.skill` | Career Path |

### 5.5 Competition · Interview · Review

| Component | Class | Mô tả |
|---|---|---|
| Deadline banner | `.deadline` `.cd` | Đồng hồ đếm ngược tới hạn nộp deliverable — nền navy gradient cố định (không dùng token `--navy` vì token này đảo sáng ở dark mode) |
| Deliverable pipeline | `.pipe` `.st` `.ic` `.due` | 5 chặng nộp bài, trạng thái `done` / `cur` |
| Slide outline | `.slidedeck` `.slidecard` `.slidecard.key` | Mỗi trang một headline khẳng định; trang mang thông điệp chính viền amber |
| Thanh vòng phỏng vấn | `.rounds` `.r` `.r.done` `.r.cur` | 5 vòng Opening → Recommendation |
| Transcript | `.chat` `.msg.q` `.msg.a` `.av` `.bb` `.who` `.note` | Hội thoại giám khảo ↔ ứng viên, kèm ghi nhận từng lượt |
| Chip lọc | `.chips` `.chip` `.chip.on` `.c` | Lọc theo loại lỗi, có đếm số |
| Thẻ lỗi | `.mist` `.hd` `.ln.bad` `.ln.good` `.ft` `.src` | Bạn viết / Đúng là / Vì sao sai / hành động |

> **Bẫy đã gặp:** trong dark mode `--navy` đảo thành `#E2E8F0` (sáng). Mọi khối `background:var(--navy); color:#fff` sẽ mất chữ — dùng hex cố định `#0F172A` hoặc gradient. Ngoài ra `.gridpat` ghi đè `background-image`, nên không đặt gradient và `.gridpat` trên cùng một phần tử; dùng `:before` thay thế.

---

## 6. Lộ trình nội dung 100 bài đầu

Đã triển khai trong `assets/js/data/curriculum.js`: **7 track · 47 module · 112 bài**.
Track thứ bảy `method` (Kỹ thuật giải case) là Tầng 2 của `KE-HOACH-DAY-GIAI-CASE.md` —
dạy phương pháp theo **họ case**, kế hoạch thi hành ở `KE-HOACH-VIET-NOI-DUNG.md`.

| Track | Bậc | Bài | Học xong làm được |
|---|---|---:|---|
| Business Fundamentals | Beginner | 22 | Đọc được P&L, dựng profitability tree, tính unit economics |
| Case Competition | Advanced | 20 | Dựng storyline, làm slide, pitch và phản biện |
| Consulting Case Interview | Intermediate | 22 | Clarify, structure, case math, đọc chart, recommendation nói |
| Marketing Case | Intermediate | 14 | Segmentation, 4P, pricing, go-to-market |
| Supply Chain & Operations | Intermediate | 12 | Bottleneck, tồn kho, chi phí vận hành, capacity |
| Finance for Business Case | Advanced | 10 | NPV/IRR, break-even, định giá sơ bộ, đọc dòng tiền |
| Case Method | Intermediate | 12 | Ba họ case: Lợi nhuận · Tăng trưởng · Gia nhập & Đầu tư. Mỗi họ: nhận diện, cây chuẩn, ba dữ liệu đắt giá, bốn bẫy |

Phân bố **output** của 100 bài:
calculation 32 · slide 28 · recommendation 16 · chart insight 13 · speaking answer 7 · checklist 4.

---

## 7. Việc còn lại

1. ~~Nội dung 10 phần cho 100 bài~~ — xong 100/100 ở cả 6 track. Thêm hoặc sửa bài = sửa `LC(id,{...})` trong `assets/js/data/lessons/<module>.js` và dòng tương ứng trong `RECOMPUTE` của `tests/lessons.test.js`.
2. ~~Đề đầy đủ cho Case Library~~ — xong 17/17 case (12 practice · 3 competition · 2 interview), trong `assets/js/data/arena.js` … `arena5.js`. Thêm case = thêm một spec vào một file `arenaN.js` (tự nạp vào test theo tên file, thêm thẻ `<script>` trong `index.html`) + một khối tính lại đáp án trong `tests/scoring.test.js`; test sẽ báo nếu Case Library có case thiếu đề.
3. Search overlay (Cmd/Ctrl-K) bỏ dấu tiếng Việt, dùng lại engine của v1.

---

## 8. State store — đã triển khai

| File | Vai trò |
|---|---|
| `assets/js/state.js` | Nguồn sự thật duy nhất: đọc/ghi `localStorage("caselab.v2")`, tính XP, cấp độ, streak, nhiệm vụ ngày, tiến độ track/nghề, lịch ôn lỗi |
| `assets/js/scoring.js` | Engine chấm answer canvas 6 tiêu chí + sinh lỗi phân loại cho Mistake Review, đọc từ spec dữ liệu |
| `assets/js/data/lessons/*.js` | Nội dung bài học theo module: tình huống, framework, ví dụ số, mini case, bài tính, khung slide (hoặc câu trả lời nói mẫu với `slide.speak`), lỗi thường gặp, checklist, case gợi ý |
| `assets/js/i18n.js` | Hai chế độ ngôn ngữ VI/EN. Tiếng Việt là bản gốc; bản tiếng Anh dịch khi hiển thị bằng từ điển (290 cặp) + quy tắc cho chuỗi có số. Nội dung bài học có bản tiếng Anh riêng (`data/lessons-en/`); đề case chỉ có tiếng Việt — ở chế độ EN màn Arena/Competition/Interview hiện ghi chú. Lưu lựa chọn ở `localStorage("caselab.lang")` |
| `assets/js/data/i18n-data.js` · `i18n-lessons.js` | Bản tiếng Anh cho lớp dữ liệu: 6 track, 44 module, 17 case (tên + câu mồi), 6 lộ trình nghề, 100 tiêu đề bài học |
| `assets/js/data/lessons-en/*.js` | Nội dung 10 phần bản tiếng Anh cho 100 bài (`LCEN(id,{...})` → `window.LESSON_CONTENT_EN`). Đáp án `mini.correct`, `calc.answer`, `calc.tol` phải trùng bản tiếng Việt — `tests/i18n.test.js` kiểm tra |
| `assets/js/interview.js` | Interview Mode: phiên 5 vòng (Clarify → Structure → Case math → Chart reading → Recommendation), chấm từng vòng bằng từ khoá + con số, lưu ở `State.data.iv` |
| `assets/js/competition.js` | Competition Simulator: phiên thi 3 deliverable có hạn chót (25% · 67% · 100% thời lượng đề), chấm 7 tiêu chí, nộp trễ trừ 10 điểm trình bày, lưu ở `State.data.comp` |
| `assets/js/data/arena*.js` | Spec từng case: đề, exhibit (bars/table/metrics), 4 khuyến nghị, từ khoá chấm, con số then chốt, bài mẫu, nội dung lỗi |
| `assets/js/app.js` | View đọc qua `State.*`; mọi thao tác đi qua `ACT.*` → ghi State → vẽ lại |

**Luật tính điểm**

| Hành động | XP | Ghi chú |
|---|---:|---|
| Hoàn thành bài | +50 | một lần mỗi bài |
| Quiz đúng ở lần đầu | +10 | lần trả lời sau không đổi kết quả |
| Nộp case | = điểm lần đầu | lần sau chỉ cộng phần vượt điểm cao nhất; nộp bài mẫu không tính |
| Ôn một lỗi | +15 | giãn cách 1 → 3 → 7 ngày, đủ 3 lần thì coi như đã sửa |

Cấp độ: Intern 0 · Analyst 200 · Associate 500 · Case Challenger 1.000 · Consultant 1.800 · Senior Consultant 3.000 · Manager 4.500 · Partner 6.500.
Streak: số ngày liên tiếp có XP; hôm nay chưa học vẫn giữ chuỗi tới hết ngày. Lỗi trùng chỗ (cùng `ref` + `kind`) được gộp và đếm số lần lặp.

**Kiểm thử** — chạy trước mỗi lần sửa:

```bash
node tests/state.test.js      # 13 test logic tiến độ
node tests/i18n.test.js      # 11 test — VI giữ nguyên, EN dịch đủ, 100/100 bài có bản EN, đáp án EN trùng VI, đủ 10 phần
node tests/lessons.test.js    # 276 test — tính lại đáp án 100 bài từ đề + kiểm tra phụ các con số trong lời giải + khuôn 10 phần
node tests/interview.test.js  # 10 test — 5 vòng, câu mẫu đạt 100, thiếu con số vẫn ghi lỗi
node tests/competition.test.js # 13 test — Q&A tính lại từ đề, bài mẫu ≥ 90 ở 7 tiêu chí, trễ hạn, bài mẫu không ghi điểm
node tests/scoring.test.js    # 72 test — tính lại đáp án 17 case từ exhibit + bộ chấm cho mọi case
node tests/views.smoke.js     # vẽ 100 bài, 17 đề Arena và mọi màn với state rỗng và state mẫu
```

**Chưa làm thật (ghi rõ trên giao diện):** chưa có tài khoản/đồng bộ nhiều máy — dùng xuất/nhập file ở `#/settings`.
