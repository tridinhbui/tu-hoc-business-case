# Kế hoạch kiểm tra hiệu năng

> Số liệu đo ngày 18-09-2026 trên bản đang chạy ở `localhost:4499/v2`. Mọi con số
> "ước tính" là mô hình tính tay, không phải đo trên mạng thật — xem mục 5 để thay
> chúng bằng số đo thật.

---

## 1. Kết quả đo lượt đầu

### Điểm nghẽn duy nhất: tải ban đầu

`index.html` nạp **188 file JS đồng bộ, 3,9 MB gốc (~1,2 MB nếu nén gzip)** cho
**mọi** trang — kể cả dashboard, vốn không dùng tới nội dung bài học nào.

| Nhóm | File | Gốc | Gzip | Dashboard có cần? |
|---|---:|---:|---:|---|
| Bài đọc chuyên sâu | 63 | 1.423 KB | 456 KB | không |
| Nội dung bài · 10 phần | 51 | 1.149 KB | 331 KB | không |
| Nội dung bài · tiếng Anh | 45 | 362 KB | 137 KB | không (chỉ khi chọn EN) |
| Dữ liệu khác | 10 | 366 KB | 117 KB | có |
| Logic ứng dụng | 11 | 378 KB | 112 KB | có |
| Đề case (arena) | 8 | 246 KB | 68 KB | không |
| **Tổng** | **188** | **3.925 KB** | **1.220 KB** | |

Toàn bộ 188 thẻ `<script>` nằm cuối `<body>`, không có `defer`/`async`. Khung
(thanh bên, thanh trên) hiện ra trước, nhưng **vùng nội dung `#view` trống cho tới
khi file cuối cùng tải xong** và `app.js` chạy.

Server preview (`python -m http.server`) **không nén** và **không gửi
`Cache-Control`**. Repo chưa có cấu hình hosting nào, nên chưa biết môi trường
thật có nén hay không — đây là việc phải xác minh đầu tiên.

### Những thứ đã đo và KHÔNG phải vấn đề

| Hạng mục | Kết quả | Kết luận |
|---|---|---|
| CPU chạy toàn bộ 188 file | ~18 ms (Mac, V8) | ổn; điện thoại tầm trung ~80–110 ms |
| Vẽ dashboard | ~2 ms · 730 nút DOM | ổn |
| Vẽ trang bài học | 4–5 ms · ~610 nút DOM | ổn |
| Vẽ Career Path (nặng nhất) | ~8 ms · 1.876 nút DOM | ổn, theo dõi |
| Chọn đáp án / kiểm tra bài tính | vẽ lại cả trang ~4 ms | ổn |
| Listener cuộn, chuột (`metrics.js`) | `passive`, chỉ ghi dấu thời gian | ổn |
| Timer Arena / Competition / Interview | được `clearInterval` khi rời trang | ổn |
| State người học (`caselab.v2`) | 12 KB sau dữ liệu mẫu, ~48 KB khi xong 365 bài | ổn |
| Ảnh, asset base64 | không có | ổn |

### Ước tính thời gian tải JS (mô hình, chưa đo thật)

| Mạng | Hiện tại (HTTP/1.1, không nén) | HTTP/2 + gzip | + nạp theo nhu cầu |
|---|---:|---:|---:|
| 4G tốt (RTT 70 ms, ~9 Mbps) | ≈ 5,7 s | ≈ 1,3 s | ≈ 0,4 s |
| 4G yếu / 3G (RTT 300 ms, ~1,6 Mbps) | ≈ 29 s | ≈ 6,9 s | ≈ 2,0 s |

Chạy lại bảng này bất cứ lúc nào: `node tools/perf-budget.js`.

---

## 2. Ngân sách hiệu năng từng phần

Mục tiêu đặt cho **điện thoại tầm trung, mạng 4G, lần mở đầu tiên**.
"Nội dung sẵn sàng" = lúc `#view` có nội dung thật của trang đó.

| Phần | JS nạp (gzip) | Nội dung sẵn sàng | Vẽ lại khi thao tác | Ghi chú |
|---|---:|---:|---:|---|
| Landing | ≤ 60 KB | ≤ 1,5 s | — | trang người mới vào, quan trọng nhất cho chuyển đổi |
| **Dashboard** | **≤ 250 KB** | **≤ 2,0 s** | ≤ 50 ms | hiện 1.220 KB |
| Lộ trình học | ≤ 250 KB | ≤ 2,0 s | ≤ 50 ms | cùng khung với dashboard |
| **Bài học** | **khung + ≤ 60 KB cho 1 module** | **≤ 2,5 s mở thẳng · ≤ 300 ms chuyển bài** | **≤ 50 ms** chọn đáp án | hiện nạp nội dung cả 51 module |
| Practice Arena | khung + ≤ 20 KB cho 1 case | ≤ 2,5 s | ≤ 50 ms gõ, ≤ 100 ms nộp bài | timer 1 s không được gây giật |
| Case Library | ≤ 250 KB | ≤ 2,0 s | ≤ 100 ms lọc | 1.176 nút DOM, theo dõi khi thêm case |
| Competition | khung + 1 đề | ≤ 2,5 s | ≤ 50 ms | |
| Interview | khung + 1 đề | ≤ 2,5 s | ≤ 50 ms | |
| Mistake Review | ≤ 250 KB | ≤ 2,0 s | ≤ 50 ms | |
| Career Path | ≤ 250 KB | ≤ 2,0 s | ≤ 100 ms | nặng nhất về DOM (1.876 nút) |
| Toàn app | ≤ 40 request JS lúc mở | — | — | hiện 188 |

---

## 3. Cách đo — ba tầng

### Tầng 1 · Tĩnh, mỗi lần sửa mã (vài giây, không cần trình duyệt)

`node tools/perf-budget.js` — số file, dung lượng gốc và gzip theo nhóm, so với ngân
sách. Khi đã tối ưu xong phần tải, bật `--strict` và đưa vào bộ test để ngân sách
không bị phá ngầm khi thêm bài mới. **Ngay bây giờ mỗi bài mới đều làm dashboard
nặng thêm** — đó là lý do tầng này phải chạy tự động.

### Tầng 2 · Phòng lab, mỗi lô thay đổi lớn

Chrome DevTools hoặc Lighthouse với **Fast 4G + CPU chậm 4 lần**, cửa sổ ẩn danh
(không cache), đo 3 lần lấy trung vị cho mỗi phần ở mục 4:

- **FCP / LCP** — khi nào thấy gì đó, khi nào thấy phần lớn nhất
- **"Nội dung sẵn sàng"** — cần thêm một dấu `performance.mark("view-ready")` ngay
  sau khi `render()` ghi vào `#view` (việc của `app.js`, xem mục 6)
- **TBT** — tổng thời gian luồng chính bị khoá khi tải
- **INP** — độ trễ từ thao tác tới khung hình kế tiếp, cho các thao tác ở mục 4

### Tầng 3 · Hiện trường, liên tục

`metrics.js` đã ghi hành vi học vào `caselab.metrics.v1`. Mở rộng nó ghi thêm
`navigation timing` và `view-ready` của mỗi lần mở trang, để `admin.html` hiện
phân vị p50/p75 thật theo thiết bị của người dùng — con số duy nhất không phải
ước tính.

---

## 4. Kịch bản kiểm tra từng phần

Mỗi kịch bản chạy ở hai trạng thái: **lần đầu** (không cache) và **quay lại**
(có cache). Kết quả ghi vào bảng ở mục 7.

| # | Phần | Thao tác đo | Chỉ số chính |
|---|---|---|---|
| 1 | Landing | mở `landing.html` | LCP, dung lượng |
| 2 | Dashboard | mở `#/dashboard` bằng URL | view-ready, số request, KB |
| 3 | Dashboard → bài học | bấm "Tiếp tục học" | thời gian chuyển trang |
| 4 | Bài học mở thẳng | mở `#/lesson/k-profit-7` bằng URL | view-ready |
| 5 | Bài học · thao tác | chọn đáp án mini case, nhập bài tính, tick checklist, gõ ghi chú | INP từng thao tác |
| 6 | Bài học · đọc dài | cuộn hết bài đọc chuyên sâu dài nhất | khung hình rơi khi cuộn |
| 7 | Bài học → bài tiếp | bấm "Bài tiếp theo" sang module khác | thời gian chuyển (khi đã nạp theo module) |
| 8 | Arena | mở một case, gõ vào 4 ô, nộp bài | INP khi gõ, thời gian chấm |
| 9 | Arena · timer | để trang mở 5 phút | bộ nhớ không tăng, không giật |
| 10 | Case Library | lọc theo ngành, theo độ khó | INP khi lọc |
| 11 | Competition / Interview | mở phòng, qua từng vòng | view-ready, INP |
| 12 | Career Path | mở, đổi nghề | view-ready, số nút DOM |
| 13 | Đổi ngôn ngữ VI → EN | bấm EN trên trang bài học | thời gian vẽ lại (khi EN đã nạp theo nhu cầu) |
| 14 | Người học lâu năm | nạp state của 365 bài đã xong rồi lặp lại 2, 4, 5 | không chậm hơn state rỗng |

---

## 5. Thứ tự tối ưu đề xuất

Xếp theo tác động trên rủi ro. Mỗi bước đo lại bằng mục 3 trước khi sang bước sau.

| Bước | Việc | Tác động dự kiến | Rủi ro | Ai sửa |
|---|---|---|---|---|
| **P0** | Xác minh hosting thật: có bật **brotli/gzip** và **HTTP/2** chưa; thêm `Cache-Control: max-age=31536000, immutable` cho file có `?v=` | 3,9 MB → ~0,8–1,2 MB; lần quay lại gần như 0 | rất thấp, không đụng mã | cấu hình hosting |
| **P1** | **Nạp nội dung theo nhu cầu:** `lessons/`, `readings/`, `lessons-en/` theo module khi mở bài; `arena*.js` khi mở case | dashboard 1.220 → ~230 KB gzip; 188 → ~21 request | trung bình: `vLesson` đang đọc đồng bộ `LESSON_CONTENT` | `app.js` + `index.html` |
| P2 | Gộp ~21 file khung thành 1–3 bundle có băm tên | bớt request, dễ cache | thấp | bước build |
| P3 | Font: bỏ các độ đậm không dùng (đang nạp 6 độ Plus Jakarta 300–800 + 3 kiểu Newsreader; `display=swap` đã có) | ít KB tải font | thấp | `index.html` |
| P4 | Khung chờ (skeleton) trong `#view` thay vì vùng trắng | cảm giác nhanh hơn, không đổi số đo | rất thấp | `index.html` |
| P5 | Đưa `tools/perf-budget.js --strict` vào bộ test | giữ kết quả không bị phá ngầm | không | tests |

**Không nên làm lúc này:** tối ưu hàm vẽ, ảo hoá danh sách, web worker. Số đo cho
thấy vẽ màn chỉ 2–8 ms — tối ưu ở đó là tối ưu chỗ không nghẽn.

---

## 6. Phối hợp với phiên song song

P1 sửa `app.js` và `index.html`, là hai file phiên kia đang ghi liên tục (số
file JS đã đổi từ 187 lên 188 ngay trong lúc đo). Không nên để hai phiên cùng sửa.
Đề xuất: phiên đang giữ `app.js` làm P1, và trong lúc đó phiên nội dung chỉ ghi
vào `data/lessons/*.js` — cách tổ chức theo module hiện tại đã hợp với nạp theo
module, nên nội dung không cần viết lại.

---

## 7. Bảng kết quả (điền sau mỗi lượt đo)

| Ngày | Phần | Trạng thái | Mạng / CPU | JS KB | Request | view-ready | INP | Ghi chú |
|---|---|---|---|---:|---:|---:|---:|---|
| 18-09-2026 | tất cả | localhost | không giới hạn | 3.925 gốc | 188 | DCL 130 ms | — | localhost che mất độ trễ mạng; số này không đại diện người dùng |
