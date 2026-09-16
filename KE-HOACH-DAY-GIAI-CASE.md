# Kế hoạch: dạy giải business case một cách bài bản

> Mục tiêu: người học không chỉ *giải được 36 case đã có*, mà có **phương pháp lặp lại được**
> để giải bất kỳ case nào chưa từng gặp — kể cả trong một buổi phỏng vấn 30 phút có người ngồi đối diện.

---

## 1. Chẩn đoán — sản phẩm đang dạy kỹ thuật rời rạc, chưa dạy phương pháp

### 1.1 Lỗ hổng lớn nhất: 13/14 loại case không có bài dạy cách giải

| Loại case | Số case | Có module dạy cách giải loại này? |
|---|---|---|
| Pricing | 5 | ✗ |
| Growth Strategy | 4 | ✗ |
| Operations | 4 | ✗ |
| Profitability | 4 | ✗ |
| Turnaround | 4 | ✗ |
| Competitive Response | 3 | ✗ |
| Market Entry | 3 | ✗ |
| Digital Transformation | 2 | ✗ |
| Expansion | 2 | ✗ |
| Investment · M&A · Marketing · Product Launch | 1 mỗi loại | ✗ |
| **Market Sizing** | 1 | **✓ có module 4 bài** |

Track *Kỹ thuật giải case* hiện dạy 6 kỹ năng **xuyên suốt** — MECE, giả thuyết, case math, synthesis, market sizing, giao tiếp. Đó là kỹ năng nền, không phải phương pháp.

Người học xong track này biết dựng cây MECE, nhưng khi gặp đề *"Chuỗi cà phê mất lợi nhuận"* vẫn phải tự mò ra rằng phải dùng cây lợi nhuận, phải hỏi dữ liệu gì trước, bẫy nằm ở đâu. **Market Sizing là loại duy nhất được dạy thành một quy trình.**

### 1.2 Engine đang luyện ngược trọng số

Thống kê 150 bước trong 36 case:

| Dạng bước | Số lần | Kỹ năng luyện |
|---|---|---|
| `recommend` | 36 | Chốt khuyến nghị |
| `calc` | 34 | Tính toán |
| `mcq` | 30 | Nhận biết |
| `multi` | 20 | Chọn nhiều |
| `decision` | 13 | Ra quyết định |
| **`tree`** | **6** | **Dựng cấu trúc** |
| `rank` | 6 | Xếp ưu tiên |
| **`datalab`** | **5** | **Chọn dữ liệu cần xem** |

Hai kỹ năng **quan trọng nhất trong một buổi phỏng vấn thật** — dựng cấu trúc và biết hỏi dữ liệu gì — lại là hai dạng bước ít được luyện nhất. Trắc nghiệm nhận biết chiếm nhiều gấp năm lần.

### 1.3 Không có gì mô phỏng buổi phỏng vấn thật

Case interview thật là một **cuộc đối thoại**, không phải bài trắc nghiệm. Chưa có gì trong sản phẩm dạy:
- Làm rõ đề trong 60 giây đầu (hỏi gì, hỏi bao nhiêu câu)
- Chủ động xin dữ liệu thay vì chờ được đưa
- Case do người phỏng vấn dẫn dắt vs case do ứng viên tự dẫn
- Bị ngắt lời, bị phản biện, bị đổi dữ kiện giữa chừng
- Quản lý 30 phút

### 1.4 Không có drill lặp lại
Hiện chỉ có hai thứ: **bài học** (đọc 5–6 phút) và **case đầy đủ** (12–18 phút). Thiếu hẳn tầng giữa: **drill 5 phút luyện đúng một kỹ năng, lặp đi lặp lại**. Kỹ năng dựng cây trong 60 giây không thể hình thành bằng cách đọc một bài học rồi giải một case mỗi tuần.

---

## 2. Nguyên tắc: 14 loại case gom thành 5 họ

Dạy 14 quy trình rời rạc là bắt học thuộc. Dạy 5 họ là dạy phương pháp — vì các loại trong cùng một họ **dùng chung cây phân tích và chung mẫu tính toán**.

| Họ | Gồm loại case | Cây chuẩn | Câu hỏi trung tâm |
|---|---|---|---|
| **1. Lợi nhuận** | Profitability · Turnaround · Operations | Lợi nhuận = Doanh thu − Chi phí, tách tiếp từng vế | Tiền rò ở đâu, và rò bao nhiêu? |
| **2. Tăng trưởng** | Growth Strategy · Expansion · Product Launch · Marketing | Ma trận sản phẩm × thị trường | Lợi thế hiện có còn hiệu lực ở đâu? |
| **3. Gia nhập & Đầu tư** | Market Entry · Investment · M&A | Giá trị thu được − Giá phải trả − Rủi ro thực thi | Có nên bỏ vốn không, và ở quy mô nào? |
| **4. Giá & Cạnh tranh** | Pricing · Competitive Response | Độ co giãn + Phản ứng đối thủ | Ai mất gì khi ta thay đổi? |
| **5. Ước lượng & Chuyển đổi** | Market Sizing · Digital Transformation | Phễu ước lượng có cấu trúc | Con số này lớn cỡ nào, và giả định nào nhạy nhất? |

**Đây là xương sống của toàn bộ kế hoạch.** Năm họ, năm module, mỗi module dạy một phương pháp dùng được cho 2–4 loại case.

---

## 3. Kiến trúc mới cho track Kỹ thuật giải case

```
TẦNG 1 · KỸ NĂNG ĐƠN LẺ                       ← đã có bài học, THIẾU drill
   Dựng cấu trúc ✓   + drill 5 phút  [MỚI]
   Case math     ✓   + drill 5 phút  [MỚI]
   Đọc dữ liệu   ✗   + drill 5 phút  [MỚI cả bài học lẫn drill]
   Synthesis     ✓   + drill 5 phút  [MỚI]
   Giao tiếp     ✓   + drill 5 phút  [MỚI]
        │
        ▼
TẦNG 2 · PHƯƠNG PHÁP THEO HỌ CASE             [MỚI HOÀN TOÀN — lỗ hổng chính]
   Họ 1 Lợi nhuận        4 bài + 1 case mẫu giải từng bước
   Họ 2 Tăng trưởng      4 bài + 1 case mẫu
   Họ 3 Gia nhập & Đầu tư 4 bài + 1 case mẫu
   Họ 4 Giá & Cạnh tranh  4 bài + 1 case mẫu
   Họ 5 Ước lượng ⊕       mở rộng module Market Sizing đã có
        │
        ▼
TẦNG 3 · BUỔI PHỎNG VẤN THẬT                  [MỚI HOÀN TOÀN]
   Làm rõ đề trong 60 giây đầu
   Chủ động xin dữ liệu
   Case người phỏng vấn dẫn vs mình dẫn
   Bị ngắt, bị phản biện, bị đổi dữ kiện
   Quản lý 30 phút
        │
        ▼
TẦNG 4 · CHẨN ĐOÁN & KÊ ĐƠN                   [MỚI]
   Từ điểm 5 tiêu chí → chỉ ra kỹ năng yếu → kê drill cụ thể
        │
        ▼
TẦNG 5 · THI THỬ                              ⊕ dùng lại engine đề thi
   Case bấm giờ, không phản hồi giữa chừng, chấm sau
```

Ký hiệu: ✓ đã có · ⊕ mở rộng cái đã có · [MỚI] viết từ đầu

---

## 4. Đặc tả Tầng 2 — trái tim của kế hoạch

Mỗi **họ case** được dạy bằng đúng bốn bài, theo khuôn cố định:

| Bài | Nội dung | Dạng bài tập |
|---|---|---|
| **1. Nhận diện** | Dấu hiệu nào cho biết đây là case thuộc họ này · phân biệt với họ gần giống | `mcq` phân loại 6 đề bài |
| **2. Cây chuẩn** | Cây phân tích của họ này, vì sao chia như vậy, biến thể theo tình huống | `tree` dựng cây cho 2 đề khác nhau |
| **3. Ba yêu cầu dữ liệu** | Trong 20 dữ liệu có thể xin, ba cái nào phân biệt được nguyên nhân | `datalab` với nhiều nhiễu |
| **4. Bẫy và hình dạng lời giải tốt** | Bẫy điển hình của họ này · khuyến nghị tốt trông thế nào | `decision` + `recommend` |

### Ví dụ đặc tả trọn vẹn: Họ 1 · Lợi nhuận

**Bài 1 — Nhận diện case lợi nhuận**
- Dấu hiệu: đề nhắc tới biên giảm, lợi nhuận giảm, chi phí tăng, "vẫn tăng trưởng nhưng không có lãi"
- Phân biệt với họ Tăng trưởng: câu hỏi là *"tiền đi đâu"* chứ không phải *"làm sao lớn hơn"*
- Bẫy nhận diện: đề nói "doanh thu tăng 18%" dễ khiến người học nhảy sang họ Tăng trưởng

**Bài 2 — Cây lợi nhuận và ba biến thể**
- Cây gốc: Lợi nhuận = Doanh thu − Chi phí
- Biến thể bán lẻ/chuỗi: tách **cửa hàng cũ vs cửa hàng mới** ngay ở tầng một
- Biến thể dịch vụ: tách **giá mỗi giờ × số giờ tính được × số nhân sự**
- Biến thể tài chính: tách **lợi suất tài sản − chi phí vốn**
- Quy tắc dừng: khi nhánh tiếp theo không đổi hành động

**Bài 3 — Ba yêu cầu dữ liệu đắt giá nhất**
- Luôn hỏi: cơ cấu chi phí **theo % doanh thu** (không phải số tuyệt đối)
- Luôn hỏi: chỉ số đơn vị **tách theo nhóm** (cũ/mới, vùng, dòng sản phẩm)
- Luôn hỏi: **ngưỡng hoà vốn** của đơn vị đó
- Dữ liệu nghe hay nhưng vô dụng: nhận biết thương hiệu, xu hướng toàn cầu, điểm hài lòng

**Bài 4 — Bốn bẫy của case lợi nhuận**
1. Đọc số tuyệt đối thay vì % doanh thu → mọi chi phí đều "tăng" khi doanh nghiệp lớn lên
2. Không tách đơn vị cũ và mới → quy kết nhầm cho vận hành
3. Cắt chi phí tạo doanh thu → khoản lỗ to hơn (đã có case Vinmec minh hoạ)
4. Kết luận "cần tăng doanh thu" — đúng nhưng vô dụng, không phải khuyến nghị

**Case mẫu giải từng bước:** dùng lại `c-coffee-profit` nhưng ở chế độ **giải mẫu có bình luận** — người học xem một lời giải chuẩn kèm giải thích vì sao mỗi bước được chọn, trước khi tự giải `c-mwg-turnaround`.

---

## 5. Đặc tả Tầng 3 — buổi phỏng vấn thật

Đây là phần khác biệt lớn nhất so với mọi sản phẩm luyện case hiện có ở Việt Nam.

| Bài | Dạy gì | Cơ chế tương tác cần thêm |
|---|---|---|
| **1. Làm rõ đề trong 60 giây** | Hỏi 2–3 câu đúng, không hỏi lan man | Dạng bước mới `clarify`: cho 8 câu hỏi, chọn đúng 3 câu đáng hỏi |
| **2. Chủ động xin dữ liệu** | Xin dữ liệu kèm lý do, không xin bừa | `datalab` biến thể: phải nêu lý do trước khi mở |
| **3. Hai kiểu case** | Người phỏng vấn dẫn (McKinsey) vs mình dẫn (BCG/Bain) | `decision` với hai kịch bản dẫn dắt khác nhau |
| **4. Bị phản biện giữa chừng** | Ba loại phản biện, ba cách trả lời | `decision` — dữ liệu mới bác bỏ hướng đang đi |
| **5. Quản lý 30 phút** | Phân bổ thời gian từng giai đoạn | Case có bấm giờ theo từng chặng |

**Dạng bước mới cần thêm vào engine: `clarify`** — hiện có 7 dạng, thêm dạng thứ 8. Cơ chế giống `multi` nhưng khung hiển thị là một đoạn hội thoại, và phản hồi cho biết *câu hỏi thừa* làm mất bao nhiêu giây quý giá.

---

## 6. Đặc tả Tầng 1 — drill lặp lại

Drill khác bài học và khác case: **5 câu cùng loại, bấm giờ, làm lại được vô hạn, có bảng kỷ lục cá nhân.**

| Drill | Nội dung | Thời gian mục tiêu |
|---|---|---|
| **Dựng cây** | Hiện một đề, chọn 3 nhánh đúng trong 8 lựa chọn | 60 giây/đề |
| **Case math** | 5 phép tính: %, bội số, hoà vốn, tăng trưởng kép | 90 giây/5 câu |
| **Đọc dữ liệu** | Cho 6 bảng số, chọn 2 bảng phân biệt được nguyên nhân | 45 giây/đề |
| **Synthesis** | Cho 5 phát hiện, chọn 3 và xếp theo sức nặng | 60 giây/đề |
| **Chốt khuyến nghị** | Cho tình huống, chọn câu mở đầu tốt nhất | 30 giây/đề |

Mỗi drill cần **ngân hàng 20–30 đề** để không lặp lại. Đây là nội dung ngắn, dễ sản xuất hàng loạt hơn case nhiều.

---

## 7. Tầng 4 — chẩn đoán và kê đơn

Engine đã chấm 5 tiêu chí sau mỗi case (Structure · Quantitative · Insight · Prioritization · Recommendation) và đã có `moduleScores()` tính điểm yếu theo module. Cần nối thêm một bước:

```
Điểm tiêu chí thấp  →  Kỹ năng yếu tương ứng  →  Drill được kê
────────────────────────────────────────────────────────────────
Structure < 70      →  Dựng cây                →  Drill Dựng cây, 3 lượt
Quantitative < 70   →  Tính nhanh              →  Drill Case math, 5 lượt
Insight < 70        →  Chọn dữ liệu            →  Drill Đọc dữ liệu, 3 lượt
Prioritization < 70 →  Xếp ưu tiên             →  Drill Synthesis, 3 lượt
Recommendation < 70 →  Chốt khuyến nghị        →  Drill Chốt, 5 lượt
```

Hiển thị ngay trên màn hình review sau mỗi case: *"Điểm Structure 45 — luyện Drill Dựng cây 3 lượt rồi giải lại case này."*

---

## 8. Khối lượng và thứ tự

| Đợt | Nội dung | Bài học | Drill | Case | Kỹ thuật |
|---|---|---|---|---|---|
| **1** | Tầng 2 — Họ 1 Lợi nhuận + Họ 2 Tăng trưởng | 8 | – | 2 case mẫu có bình luận | chế độ giải mẫu · 3 ngày |
| **2** | Tầng 1 — 5 drill + ngân hàng đề | 1 | 5 drill × 25 đề | – | dạng `drill` · 1 tuần |
| **3** | Tầng 2 — Họ 3, 4, 5 | 12 | – | 3 case mẫu | – |
| **4** | Tầng 3 — buổi phỏng vấn | 5 | – | 2 case mô phỏng | dạng `clarify` · 4 ngày |
| **5** | Tầng 4 + 5 — chẩn đoán & thi thử | – | – | – | kê đơn drill · 3 ngày |

### Tổng khối lượng nội dung
| Hạng mục | Số lượng | Ước lượng số từ |
|---|---|---|
| Bài học Tầng 2 (5 họ × 4 bài) | 20 | ~34.000 |
| Bài học Tầng 3 | 5 | ~9.000 |
| Ngân hàng drill (5 × 25 đề) | 125 đề | ~19.000 |
| Case mẫu có bình luận | 5 | ~12.000 |
| Case mô phỏng phỏng vấn | 2 | ~6.000 |
| **Tổng** | | **~80.000 từ** |

**So với hai kế hoạch trước:** kế hoạch ngành ~147.000 từ, kế hoạch lý thuyết ~150.000 từ. Kế hoạch này **~80.000 từ — bằng một nửa**, và đánh trúng thứ sản phẩm đang hứa hẹn ngay từ tên gọi.

| Kịch bản | Thời gian |
|---|---|
| Một mình, buổi tối | ~10 tháng |
| Bạn + 1 cộng tác viên | ~6 tháng |
| Bạn + 2 cộng tác viên | ~4 tháng |

Ngân hàng drill (125 đề) là phần dễ giao cho cộng tác viên nhất — ngắn, khuôn cố định, dễ kiểm tra tự động.

---

## 9. Thay đổi kỹ thuật

| Việc | Chi tiết | Khối lượng |
|---|---|---|
| Dạng bước `drill` | Bộ N câu cùng loại, bấm giờ, lưu kỷ lục cá nhân | 1 tuần |
| Dạng bước `clarify` | Chọn câu hỏi làm rõ, phản hồi tính "giây lãng phí" | 3 ngày |
| Chế độ **giải mẫu có bình luận** | Người học xem lời giải chuẩn từng bước kèm lý do, trước khi tự giải | 3 ngày |
| Kê đơn drill sau review | Map 5 tiêu chí → drill, hiện nút ngay màn hình review | 2 ngày |
| Cân lại tỷ trọng dạng bước | Case mới bắt buộc ≥1 `tree` và ≥1 `datalab`; thêm vào checklist nghiệm thu | sửa `HUONG-DAN-VIET-CASE.md` |
| Trang **Playbook** | Tra cứu nhanh 5 họ: cây chuẩn, 3 dữ liệu, bẫy | 3 ngày |

**Tổng: ~3 tuần.**

---

## 10. Chuẩn nghiệm thu

Một module họ case chỉ được phát hành khi:

- [ ] Có bài **Nhận diện** dạy phân biệt với họ gần giống nhất
- [ ] Cây chuẩn có ít nhất **ba biến thể** theo loại hình doanh nghiệp
- [ ] Nêu rõ **ba yêu cầu dữ liệu đắt giá nhất** và ba loại dữ liệu nghe hay nhưng vô dụng
- [ ] Liệt kê **tối thiểu bốn bẫy** của họ case này
- [ ] Có **một case mẫu giải từng bước có bình luận** và **một case để tự giải**
- [ ] Bài tập dùng ít nhất một `tree` và một `datalab`
- [ ] Qua cổng kiểm duyệt tự động

---

## 11. Rủi ro

| Rủi ro | Mức | Cách giảm |
|---|---|---|
| **Dạy 5 họ thành học thuộc 5 cây** | **Cao nhất** | Mỗi họ bắt buộc có bài về **biến thể** và bài về **khi cây chuẩn không dùng được**. Cây chuẩn là điểm khởi đầu, không phải đáp án |
| Drill biến thành trò chơi bấm nhanh | Trung bình | Drill chấm cả độ chính xác lẫn thời gian; sai thì không tính kỷ lục dù nhanh |
| Ngân hàng drill 125 đề chất lượng không đều | Trung bình | Khuôn cực chặt + cổng kiểm duyệt tự động + giao trọn một loại drill cho một người |
| Tầng 3 khó mô phỏng thật | Trung bình | Chấp nhận giới hạn: sản phẩm dạy *chuẩn bị cho* buổi phỏng vấn, không thay thế người phỏng vấn thật. Nói rõ điều này với người học |
| Bỏ rơi kế hoạch ngành | Thấp | Hoãn, không huỷ. Sau khi xong tầng 2 và 3, thư viện case ngành sẽ có giá trị hơn nhiều vì đã có phương pháp để giải |

---

## 12. Việc của tháng đầu

1. **Viết trọn Họ 1 · Lợi nhuận** (4 bài) — họ lớn nhất, đã có sẵn 4 case Profitability + 4 Turnaround + 4 Operations làm chất liệu.
2. **Dựng chế độ giải mẫu có bình luận** và áp lên `c-coffee-profit`.
3. **Đưa cho 5 người đã học xong Foundations**, đo đúng một con số: *sau khi học Họ 1, họ giải `c-mwg-turnaround` được bao nhiêu điểm so với nhóm không học?* Chênh lệch dưới 15 điểm nghĩa là module chưa dạy được phương pháp, chỉ đang kể lại case.
4. **Sửa `HUONG-DAN-VIET-CASE.md`**: bắt buộc mọi case mới có ≥1 `tree` và ≥1 `datalab`.

---

*Nguyên tắc xuyên suốt: người học phải rời khỏi mỗi module với một quy trình lặp lại được, không phải với ký ức về một case cụ thể.*
