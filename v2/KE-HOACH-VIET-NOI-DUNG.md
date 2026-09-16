# Kế hoạch viết nội dung — đợt Tầng 2

> Bản kế hoạch để thi hành, không phải để bàn. Mọi con số dưới đây lấy từ
> `node tools/content-status.js` chạy ngày 16-09-2026, không phải từ trí nhớ.

---

## 1. Đang ở đâu

| Hạng mục | Trạng thái |
|---|---|
| Bài học | **104/104** đủ khuôn 10 phần, đủ phép tính lại, đủ tiêu đề EN. Nội dung EN: 100/104 — 4 bài `k-profit` chờ phiên i18n |
| Case | **17/17** có đề đầy đủ (12 practice · 3 competition · 2 interview), mỗi case 3 exhibit, mỗi con số có khối tính lại trong `tests/scoring.test.js` |
| Cổng kiểm | 6 file test, đều xanh. `tools/content-status.js` không còn ô trống nào |

Nói cách khác: **phạm vi v2 đã đóng**. Việc tiếp theo không phải vá lỗ hổng, mà
là mở tầng nội dung mới theo `KE-HOACH-DAY-GIAI-CASE.md`.

### Lỗ hổng thật sự còn lại

Track `consulting` hiện dạy **từng loại case** (i-profit, i-entry, i-growth,
i-ma, i-ops, i-price, i-chart — mỗi loại 3 bài). Không có bài nào dạy **phương
pháp dùng chung cho một họ case**: nhận ra đề thuộc họ nào, cây chuẩn của họ đó,
ba dữ liệu đắt giá nhất, và bẫy điển hình. Người học rời khỏi track với ký ức về
bảy loại case, không phải với một quy trình lặp lại được.

Đó chính là Tầng 2 trong `KE-HOACH-DAY-GIAI-CASE.md`, và nó vẫn chưa được viết.

---

## 2. Viết gì — track mới `method`

Một track thứ bảy, đứng **trước** `consulting` trong thứ tự học.

```
method · "Case Method" · Kỹ thuật giải case · icon ◭ · lvl Intermediate
  k-profit  Họ 1 · Lợi nhuận        4 bài   ← Profitability · Turnaround · Operations
  k-growth  Họ 2 · Tăng trưởng      4 bài   ← Growth · Expansion · Product Launch · Marketing
  k-entry   Họ 3 · Gia nhập & Đầu tư 4 bài  ← Market Entry · Investment · M&A
  k-price   Họ 4 · Giá & Cạnh tranh  4 bài  ← Pricing · Competitive Response
  k-size    Họ 5 · Ước lượng         4 bài  ← Market Sizing · Digital Transformation
  k-live    Tầng 3 · Buổi phỏng vấn thật  5 bài
                                    ─────
                                    25 bài
```

Bốn bài của mỗi họ theo đúng một khuôn — người học học *cách học* một họ mới:

| Bài | Nội dung | `mini.kind` | `out` |
|---|---|---|---|
| **-1 Nhận diện** | Dấu hiệu của họ này · phân biệt với họ gần giống nhất | `logic` | recommendation |
| **-2 Cây chuẩn** | Cây phân tích + **ba biến thể** theo loại hình doanh nghiệp | `framework` | slide |
| **-3 Ba dữ liệu đắt giá** | Trong 12 dữ liệu xin được, ba cái nào phân biệt được nguyên nhân; ba cái nghe hay mà vô dụng | `exhibit` | chart insight |
| **-4 Bẫy và lời giải tốt** | ≥4 bẫy điển hình · khuyến nghị tốt trông thế nào | `calculation` | calculation |

`k-live` (5 bài): làm rõ đề trong 60 giây · chủ động xin dữ liệu · case người
phỏng vấn dẫn vs mình dẫn · bị ngắt và bị đổi dữ kiện · quản lý 30 phút.

### Chất liệu đã có sẵn — không cần bịa mới

Mỗi bài `-4` và mỗi bài `-2` **trỏ về một case đang chạy được** qua trường `arena`:

| Họ | Case làm chất liệu | Vì sao hợp |
|---|---|---|
| k-profit | `cl-01` cà phê · `cl-04` bách hoá · `iv-01` nhà máy nhựa | đủ ba hình dạng: mở rộng hỏng · chi phí chung · chuyển giá nguyên liệu |
| k-growth | `cl-03` take rate · `cl-12` sữa hạt cao cấp | tăng trưởng từ giá và từ sản phẩm mới |
| k-entry | `cl-02` đường bay · `cl-11` mua lại vs tự mở · `iv-02` cà phê Philippines | vào mới · mua lại · vào nước ngoài |
| k-price | `cl-05` NIM ngân hàng · `cl-09` SaaS | giá trong ràng buộc rủi ro và trong đơn vị kinh tế |
| k-size | `cl-06` sữa hạt · `cl-10` trung tâm tiếng Anh | top-down và bottom-up |

Đây là điểm quan trọng nhất của đợt này: **không viết case mới trước**. 17 case
hiện có đã đủ làm chất liệu cho 25 bài. Case mới chỉ cần khi một họ không có case
nào minh hoạ được — hiện không họ nào rơi vào cảnh đó.

---

## 3. Thứ tự làm — 5 lô, mỗi lô nghiệm thu độc lập

| Lô | Nội dung | Số bài | Ước lượng |
|---|---|---:|---|
| **L1** ✅ | `k-profit` trọn 4 bài + dựng track `method` | 4 | **xong 16-09-2026** — mọi cổng kiểm xanh |
| **L2** | `k-growth` + `k-entry` | 8 | |
| **L3** | `k-price` + `k-size` | 8 | |
| **L4** | `k-live` 5 bài | 5 | cần đọc lại `interview.js` để bài khớp engine 5 vòng |
| **L5** | 2 case mới cho họ thiếu chất liệu *nếu* L1–L4 lộ ra thiếu | 0–2 case | chỉ mở khi có bằng chứng |

**Làm L1 xong rồi mới bàn L2.** Bốn bài đầu sẽ lộ ra khuôn nào không dùng được
trong thực tế — sửa khuôn lúc đó rẻ hơn sửa sau 25 bài.

---

## 4. Hợp đồng file — mỗi bài mới phải có mặt ở 5 chỗ

`node tools/scaffold.js lesson k-profit-1 "Nhận diện case lợi nhuận"` in ra sẵn
cả 5 khối. Thiếu chỗ nào test chặn chỗ đó:

| # | File | Nội dung | Test chặn |
|---|---|---|---|
| 1 | `assets/js/data/curriculum.js` | dòng `{id, t, m, lv, out}` trong module | `views.smoke` |
| 2 | `assets/js/data/lessons/<module>.js` | khối `LC(id,{…})` đủ 10 phần | `lessons.test` |
| 3 | `tests/lessons.test.js` → `RECOMPUTE` | phép tính **độc lập** ra đúng `calc.answer` | `lessons.test` |
| 4 | `assets/js/data/i18n-lessons.js` | tiêu đề tiếng Anh | `i18n.test` |
| 5 | `assets/js/data/lessons-en/<module>.js` | bản EN (tuỳ chọn, nhưng nếu có thì phải đủ 10 phần và trùng đáp án) | `i18n.test` |

Thêm một track mới còn cần: bản dịch `vi` / `promise` / `for` của track trong
`i18n-data.js`, và thẻ `<script>` cho file module mới trong `index.html`.

Case mới thì 5 chỗ khác — `tools/scaffold.js case <id> "<tiêu đề>"` in ra.

---

## 5. Chuẩn nghiệm thu một lô

Máy kiểm trước, người đọc sau. Không đảo thứ tự.

```bash
node tests/lessons.test.js && node tests/i18n.test.js && node tests/scoring.test.js \
  && node tests/state.test.js && node tests/interview.test.js && node tests/competition.test.js \
  && node tests/views.smoke.js && node tools/content-status.js
```

Người đọc kiểm tiếp, mỗi họ:

- [ ] Bài `-1` dạy **phân biệt**, không chỉ mô tả: có ít nhất một đề dễ nhầm sang họ khác
- [ ] Bài `-2` có đủ **ba biến thể** cây, và một câu nói rõ **khi nào cây chuẩn không dùng được**
- [ ] Bài `-3` liệt kê **ba dữ liệu đắt giá + ba dữ liệu nghe hay mà vô dụng**
- [ ] Bài `-4` có **≥4 bẫy**
- [ ] Cả bốn bài trỏ `arena` về case thật, và người học giải được case đó bằng đúng thứ vừa học
- [ ] Mọi con số trong `ex.rows` tự nó nói được một điều — không có số để trang trí

Chuẩn cuối cùng, lấy nguyên từ `KE-HOACH-DAY-GIAI-CASE.md`: *người học rời khỏi
module với một quy trình lặp lại được, không phải với ký ức về một case cụ thể.*
Nếu một bài có thể thay bằng câu "hãy nhớ case cà phê" mà không mất gì, bài đó chưa đạt.

---

## 6. Chia việc khi có hai agent cùng chạy

Hiện có một phiên khác đang làm i18n (`app.js`, `i18n.js`, `data/lessons-en/`,
`i18n-data.js`, `i18n-lessons.js`). Hai bên ghi đè nhau được — đã xảy ra một lần
ngày 15-09. Quy tắc:

| File | Ai được ghi |
|---|---|
| `assets/js/data/lessons/*.js`, `data/arena*.js`, `data/library.js` | **người viết nội dung** |
| `tests/lessons.test.js`, `tests/scoring.test.js` | **người viết nội dung** (chỉ thêm dòng vào RECOMPUTE / khối `t(...)`) |
| `app.js`, `i18n.js`, `assets/css/app.css` | **agent kỹ thuật** |
| `data/lessons-en/*.js`, `i18n-data.js`, `i18n-lessons.js` | **agent i18n** |
| `curriculum.js`, `index.html` | **một người một lần** — chạm ngắn, báo trước, đừng mở file lâu |

`curriculum.js` và `index.html` là hai file duy nhất cả hai bên đều cần.

Cách tránh đụng **không** phải dựng trước khung 25 bài rỗng: một bài có trong
`curriculum.js` mà chưa có `LC(...)` sẽ hiển thị nội dung của bài khác (engine
rơi về `f-profit-2`), tức là người học thấy một bài sai chứ không phải một bài
trống. Thay vào đó: **mỗi module được nối vào `curriculum.js` đúng lúc nội dung
của nó đã viết xong** — một lần chạm ngắn cho mỗi lô, báo trước cho phiên kia.

Lô 1 đã làm theo cách này: 4 bài `k-profit` viết xong rồi mới thêm track và
module vào `curriculum.js` cùng một thẻ `<script>` trong `index.html`.

---

## 7. Công cụ

| Lệnh | Việc |
|---|---|
| `node tools/content-status.js` | bảng đầy đủ: bài nào / case nào còn thiếu ô nào |
| `node tools/content-status.js --todo` | chỉ in dòng còn thiếu — dùng làm danh sách việc hằng ngày |
| `node tools/scaffold.js lesson <id> "<tiêu đề>"` | in 5 khối phải dán, kèm file đích |
| `node tools/scaffold.js case <id> "<tiêu đề>"` | tương tự cho case mới |

---

## 8. Rủi ro của riêng đợt này

| Rủi ro | Cách giảm |
|---|---|
| **25 bài mới biến track `consulting` thành thừa** | `method` dạy phương pháp, `consulting` dạy từng loại case. Nếu sau L1 thấy hai bên lặp nhau, cắt bài trùng ở `consulting` chứ đừng giữ cả hai |
| Viết 4 bài theo khuôn cứng thành ra máy móc | Khuôn quy định *vai trò* của mỗi bài, không quy định câu chữ. Bài `-3` của họ Ước lượng gần như chắc chắn phải lệch khuôn — cho phép lệch, ghi lý do |
| Bài mới không có case đủ khó để minh hoạ | Đó là tín hiệu mở L5, không phải lý do hạ chuẩn bài |
| Hai agent đụng `curriculum.js` | Mục 6 |
