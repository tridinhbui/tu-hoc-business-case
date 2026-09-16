# Kế hoạch: website học giải business case theo từng ngành nghề

> Mục tiêu: biến 14 "khu vực ngành" hiện đang là vỏ rỗng thành **14 lộ trình học nghề thật**,
> nơi người học hiểu logic kinh tế của một ngành rồi mới giải case của ngành đó.

---

## 1. Chẩn đoán — bản đồ ngành đang rỗng ruột

Sản phẩm hiện có 14 industry district trên World Map, nhưng vào bên trong thì gần như không có gì để học **về chính ngành đó**.

| Ngành | Case | Easy | Medium | Hard | Expert | Loại case phủ | Module bài học |
|---|---|---|---|---|---|---|---|
| Technology | 5 | 0 | 3 | 2 | 0 | 4/14 | ✗ |
| FMCG | 4 | 1 | 1 | 2 | 0 | 4/14 | ✗ |
| Retail | 4 | 0 | 2 | 2 | 0 | 3/14 | ✓ |
| E-commerce | 4 | 0 | 0 | 4 | 0 | 3/14 | ✗ |
| F&B | 3 | 0 | 2 | 1 | 0 | 3/14 | ✗ |
| Logistics | 3 | 0 | 2 | 1 | 0 | 2/14 | ✗ |
| Aviation | 2 | 0 | 2 | 0 | 0 | 2/14 | ✗ |
| Automotive | 2 | 0 | 0 | 0 | 2 | 2/14 | ✗ |
| Healthcare | 2 | 0 | 2 | 0 | 0 | 2/14 | ✗ |
| Media | 2 | 0 | 1 | 0 | 1 | 2/14 | ✗ |
| Fintech | 2 | 0 | 1 | 1 | 0 | 2/14 | ✓ |
| **Banking** | **1** | 0 | 0 | 1 | 0 | 1/14 | ✓ |
| **Real Estate** | **1** | 0 | 0 | 0 | 1 | 1/14 | ✓ |
| **Energy** | **1** | 0 | 0 | 0 | 1 | 1/14 | ✗ |

### Bốn vấn đề rút ra

1. **Không có cửa vào.** Toàn bộ 36 case chỉ có **1 case Easy**. Người mới chọn một ngành bất kỳ sẽ va ngay vào case Medium hoặc Hard và bỏ cuộc.
2. **10/14 ngành không có bài học riêng.** Người học vào district Hàng không mà không được dạy load factor là gì, rồi phải giải case về load factor.
3. **Độ phủ lệch 5 lần.** Technology có 5 case, Banking có 1 — trong khi Banking là ngành tuyển dụng lớn nhất Việt Nam.
4. **17 doanh nghiệp có hồ sơ nhưng không có case nào** — tài sản nội dung nằm chết.

**Kết luận:** sản phẩm hiện tại dạy *kỹ thuật giải case* rất tốt (track Foundations và Case Cracking), nhưng chưa dạy *kinh tế ngành* — thứ mà tên gọi "Business World Map" đang hứa hẹn.

---

## 2. Nguyên tắc: học theo ngành nghĩa là học logic kinh tế của ngành

Sai lầm dễ mắc nhất là nghĩ "thêm case cho ngành X" = "dạy ngành X". Không phải.

Mỗi ngành có **một logic kinh tế chi phối mọi quyết định trong ngành đó**. Hiểu logic ấy thì giải được mọi case của ngành; không hiểu thì giải xong 10 case vẫn không rút ra được gì.

| Ngành | Công thức doanh thu | Chỉ số sống còn | Ngành này chết vì |
|---|---|---|---|
| **Banking** | Dư nợ × NIM + phí | NIM · CASA · NPL · CIR | Rủi ro tín dụng hiện ra chậm 18–36 tháng sau quyết định cho vay |
| **FMCG** | Sản lượng × Giá × Mix | Độ phủ điểm bán · GM% · thị phần phân khúc | Mất kệ hàng ở kênh truyền thống |
| **Retail** | Số điểm × Doanh thu/điểm | Doanh thu/điểm vs ngưỡng hoà vốn · vòng quay tồn kho | Mở rộng nhanh hơn tốc độ đạt điểm hoà vốn |
| **F&B** | Lượt khách × Giá trị hoá đơn | Ticket/ngày · tiền thuê % doanh thu · payback | Tiền thuê là chi phí cố định leo thang |
| **E-commerce** | GMV × Take rate | Take rate · CAC · tỷ lệ mua lại · contribution/đơn | Trợ giá không bao giờ dừng được |
| **Technology / SaaS** | ARR = MRR × 12 × NRR | CAC payback · NRR · Rule of 40 | Chi phí bán hàng cao mà sản phẩm là "nice to have" |
| **Logistics** | Sản lượng × Giá cước | Chi phí/bưu kiện · mật độ điểm giao | Mở rộng địa lý làm mật độ giảm |
| **Aviation** | Ghế × Load factor × Yield | Load factor · RASK · CASK · ancillary/khách | Chi phí cố định cao gặp cú sốc cầu |
| **Automotive** | Sản lượng × ASP | Điểm hoà vốn sản lượng · biên đóng góp/xe | Không đạt quy mô trước khi hết tiền |
| **Real Estate** | Số căn × Giá bán | Presales · dòng tiền hoạt động · lịch đáo hạn nợ | Lợi nhuận kế toán lệch pha dòng tiền nhiều năm |
| **Healthcare** | Công suất × Tỷ lệ lấp đầy × Giá/ca | Bed occupancy · doanh thu/ca | Chi phí gần như cố định, giường trống là lỗ thuần |
| **Media** | Thuê bao × ARPU − Churn | Churn · ARPU · chi phí nội dung/thuê bao | Chi phí nội dung là chi phí chìm, cần quy mô mới hoà |
| **Fintech** | TPV × Take rate | Take rate · CAC · tỷ lệ dùng sản phẩm tài chính | Thanh toán không tự nuôi được mình |
| **Energy** | Công suất × Capacity factor × Giá PPA | Capacity factor · nợ dự án/EBITDA | Vốn nặng, hợp đồng dài, chính sách đổi |

**Bảng này chính là giáo trình.** Mỗi dòng sinh ra một Industry Primer, một bộ bài tập chỉ số, và bốn case theo bậc.

---

## 3. Kiến trúc một Industry Track

Mỗi ngành trở thành một lộ trình hoàn chỉnh gồm **6 thành phần cố định**:

```
Industry Track (ví dụ: Aviation · Hàng không)
├── 1. Industry Primer        — 1 bài học, 6–7 phút
│      Công thức doanh thu · 5 chỉ số sống còn · 3 cách ngành này chết
├── 2. Metric Drill           — 1 bài học, 5 phút, toàn bài tập tính
│      Tính load factor, RASK, CASK, điểm hoà vốn chuyến bay
├── 3. Case Ladder            — 4 case theo bậc, mỗi bậc thêm MỘT lớp phức tạp
│      Easy → Medium → Hard → Expert
├── 4. Company Dossiers       — 3–4 doanh nghiệp, tối thiểu 2 Việt Nam
├── 5. Industry Exam          — 8 câu, đạt 70 điểm
└── 6. Industry Badge         — huy hiệu riêng, ví dụ "Aviation Analyst"
```

### Đặc tả Industry Primer (chuẩn hoá, không sáng tạo lại mỗi lần)

| Phần | Nội dung bắt buộc |
|---|---|
| Hook | Một câu hỏi mà người ngoài ngành trả lời sai |
| Core 1 | Công thức doanh thu của ngành, viết ra giấy |
| Core 2 | Cấu trúc chi phí: bao nhiêu % cố định, bao nhiêu % biến đổi |
| Core 3 | Chỉ số sống còn và vì sao chính nó chứ không phải chỉ số khác |
| Core 4 | Moat đặc thù của ngành — thứ tiền không mua được nhanh |
| Worked | Bóc tách P&L của một doanh nghiệp Việt Nam trong ngành |
| Check | 2–3 bài tập, ít nhất 1 bài tính toán |
| Terms | 3 thuật ngữ song ngữ đặc thù ngành |

### Đặc tả Case Ladder — mỗi bậc thêm đúng một lớp

| Bậc | Thêm lớp gì | Số bước | Ví dụ với Hàng không |
|---|---|---|---|
| **Easy** | Chỉ một phép tính, dữ liệu cho sẵn hết | 4 | Tính load factor hoà vốn của một chuyến bay |
| **Medium** | Phải tự chọn dữ liệu cần xem (datalab) | 4–5 | Đường bay này lỗ ở đâu — nhiên liệu, slot hay yield? |
| **Hard** | Có đánh đổi, không có đáp án đẹp | 5 | Mở đường bay mới hay tăng tần suất đường bay cũ? |
| **Expert** | Rẽ nhánh nhiều kết cục + ràng buộc dòng tiền | 5–6 | Cú sốc cầu 40%: cắt đội bay, đàm phán thuê, hay gọi vốn? |

**Quy tắc vàng:** bậc Easy của MỌI ngành phải giải được trong 8 phút bởi người vừa học xong Primer. Đây là cửa vào — nếu nó khó, người học rời khỏi ngành đó vĩnh viễn.

---

## 4. Thay đổi kỹ thuật cần làm

Tất cả đều nằm trong kiến trúc hiện tại, không cần backend.

| Việc | File | Chi tiết |
|---|---|---|
| Mở rộng schema ngành | `data/industries.js` | Thêm `econ` (công thức doanh thu), `metrics[5]`, `failModes[3]`, `primer`, `drill`, `ladder[4]`, `exam` |
| Đề thi theo ngành | `data/exams.js` | Thêm 14 đề, mỗi đề 8 câu, `track:"industry:<id>"` |
| Trang District → Industry Track | `views/map.js` | Bố cục lại theo 6 thành phần: Primer → Drill → Ladder → Dossiers → Exam |
| Tiến độ theo ngành | `state.js` | `industryProgress()` mở rộng: đếm cả bài học, case theo bậc, đề thi |
| Huy hiệu ngành | `state.js` | 14 badge mới, điều kiện: hoàn thành Primer + Drill + 4 case + đạt đề thi |
| World Map hiển thị tiến độ | `views/home.js` | Mỗi district hiện `2/6 thành phần` thay vì `0/1 case` |
| Bộ lọc theo bậc trong ngành | `views/cases.js` | Đã có sẵn, chỉ cần dữ liệu đủ để bộ lọc có ý nghĩa |

**Khối lượng kỹ thuật: 1,5–2 tuần.** Phần lớn là dữ liệu, không phải logic mới.

---

## 5. Thứ tự triển khai — 4 đợt, 14 ngành

Tiêu chí xếp thứ tự: **quy mô tuyển dụng tại Việt Nam** × **nền nội dung đã có** × **mức độ hay xuất hiện trong đề phỏng vấn**.

### Đợt 1 — Tháng 1–3 · bốn ngành có nhiều người học nhất
| Ngành | Đã có | Cần thêm | Lý do ưu tiên |
|---|---|---|---|
| **Banking** | 1 case, 3 công ty, 1 module | Primer + Drill + 3 case (Easy/Medium/Expert) | Ngành tuyển dụng lớn nhất VN, đang yếu nhất |
| **FMCG** | 4 case, 6 công ty | Primer + Drill + 1 case Expert | Đề MT hay hỏi nhất |
| **Retail** | 4 case, 4 công ty, 1 module | Primer + Drill + 1 case Easy | Nền tốt, chỉ thiếu cửa vào |
| **F&B** | 3 case, 4 công ty | Primer + Drill + 1 case Expert | Dễ hình dung, hợp người mới |

### Đợt 2 — Tháng 4–6 · bốn ngành nền tảng số
Technology · E-commerce · Logistics · Fintech
→ Cần 8 bài học + 9 case (đặc biệt thiếu bậc Easy ở cả bốn ngành)

### Đợt 3 — Tháng 7–9 · bốn ngành vốn nặng
Aviation · Healthcare · Real Estate · Media
→ Cần 8 bài học + 11 case

### Đợt 4 — Tháng 10–12 · hai ngành chuyên sâu
Automotive · Energy
→ Cần 4 bài học + 6 case

---

## 6. Khối lượng thật — nói thẳng con số

| Hạng mục | Số lượng cần thêm | Ước lượng số từ |
|---|---|---|
| Industry Primer | 14 bài | ~28.000 |
| Metric Drill | 14 bài | ~17.000 |
| Case mới | ~29 case (để đủ 14×4 = 56 case ngành) | ~72.000 |
| Đề thi ngành | 14 đề × 8 câu = 112 câu | ~22.000 |
| Hồ sơ doanh nghiệp bổ sung | ~10 công ty | ~8.000 |
| **Tổng** | | **~147.000 từ** |

**So sánh để thấy quy mô:** toàn bộ nội dung hiện có là ~110.000 từ. Kế hoạch này lớn hơn mọi thứ đã làm từ đầu tới giờ **1,3 lần**.

| Kịch bản nhân sự | Tốc độ | Thời gian hoàn thành |
|---|---|---|
| Một mình, làm buổi tối | ~8.000 từ/tuần | **18 tháng** — quá dài, rủi ro bỏ cuộc cao |
| Bạn + 2 cộng tác viên | ~22.000 từ/tuần | **7 tháng** |
| Bạn + 4 cộng tác viên | ~38.000 từ/tuần | **4 tháng** |

**Khuyến nghị:** không làm một mình. Ở tốc độ một người, đợt 4 sẽ hoàn thành sau khi đợt 1 đã lỗi thời.

---

## 7. Quy trình sản xuất — tái dùng thứ đã có

Ba tài sản đã tồn tại và dùng được ngay:

1. **`HUONG-DAN-VIET-CASE.md`** — bộ quy tắc biên tập, đã chứng minh hiệu quả ở 6 case gần nhất
2. **Cổng kiểm duyệt tự động** — script chơi hết mọi case, bắt buộc mỗi bước chấm ra đúng 1.0. Đã bắt được 5 lỗi số học thật
3. **Schema case và lesson** — không cần thiết kế lại

### Cần bổ sung
- **`HUONG-DAN-VIET-PRIMER.md`** — khuôn cho Industry Primer, theo đúng đặc tả ở mục 3
- **Bảng phân công theo ngành** — mỗi cộng tác viên nhận trọn một ngành (Primer + Drill + Ladder), không cắt nhỏ theo loại nội dung. Người viết trọn một ngành sẽ giữ được sự nhất quán về logic kinh tế
- **Checklist nghiệm thu một ngành**: đủ 6 thành phần · bậc Easy giải được trong 8 phút · mọi số liệu qua cổng kiểm duyệt · ít nhất 2 doanh nghiệp Việt Nam

### Đơn giá đề xuất
| Sản phẩm | Giá |
|---|---|
| Industry Primer + Metric Drill | 1,5 triệu |
| Case (Easy/Medium) | 700 nghìn |
| Case (Hard/Expert) | 1,2 triệu |
| **Trọn một ngành** | **~5,5 triệu** |

Tổng chi phí nội dung cho 14 ngành: **~60–70 triệu**. Đây là khoản đầu tư lớn nhất của dự án và nên được xem như vậy.

---

## 8. Đo thành công — bốn chỉ số

| Chỉ số | Ngưỡng | Vì sao chọn |
|---|---|---|
| **Tỷ lệ vào district rồi bắt đầu Primer** | >45% | Đo xem trang ngành có mời gọi không |
| **Tỷ lệ hoàn thành case Easy sau khi học Primer** | >70% | Đo xem cửa vào có đủ dễ không — chỉ số quan trọng nhất |
| **Số ngành trung bình mỗi người học chạm tới** | >2,5 | Đo xem mô hình "học theo ngành" có tạo tò mò không |
| **Tỷ lệ đạt Industry Exam trong lần thi đầu** | 50–70% | Dưới 50% là đề quá khó; trên 70% là quá dễ |

---

## 9. Rủi ro

| Rủi ro | Mức | Cách giảm |
|---|---|---|
| **Khối lượng nội dung gấp 1,3 lần mọi thứ đã làm** | **Cao nhất** | Chia đợt, mỗi đợt 4 ngành là một sản phẩm hoàn chỉnh có thể phát hành riêng. Không chờ đủ 14 ngành mới ra mắt |
| Chất lượng không đều giữa các cộng tác viên | Cao | Giao trọn ngành cho một người · checklist nghiệm thu · cổng kiểm duyệt tự động |
| Số liệu ngành sai hoặc lỗi thời | Trung bình | Giữ nguyên quy tắc hiện tại: mọi con số là "ước lượng cho mục đích luyện tập", thiết kế để bài toán có lời giải rõ ràng, không phải số liệu kiểm toán |
| Người học chỉ vào 1 ngành rồi thôi | Trung bình | Company Battle xuyên ngành · case so sánh mô hình giữa hai ngành · badge "đa ngành" |
| Ngành chuyên sâu (Energy, Automotive) ít người quan tâm | Thấp | Đã xếp cuối cùng. Nếu đợt 3 cho thấy nhu cầu thấp thì dừng ở 12 ngành |

---

## 10. Việc của hai tuần đầu

Ba việc, làm đúng thứ tự:

1. **Dựng xong khung kỹ thuật với đúng MỘT ngành làm mẫu** — chọn **Banking** (yếu nhất, quan trọng nhất). Viết Primer + Drill + 3 case còn thiếu + đề thi 8 câu. Mục tiêu: chứng minh kiến trúc 6 thành phần hoạt động trước khi nhân ra 13 ngành còn lại.

2. **Viết `HUONG-DAN-VIET-PRIMER.md`** dựa trên chính ngành Banking vừa làm — tài liệu viết sau khi đã làm thật luôn tốt hơn tài liệu viết trước.

3. **Đưa Banking Track cho 5 người thuộc nhóm mục tiêu** và đo đúng một con số: *bao nhiêu người học xong Primer rồi giải được case Easy?* Nếu dưới 70%, sửa cửa vào trước khi viết ngành thứ hai.

---

*Nguyên tắc xuyên suốt: mỗi đợt 4 ngành phải là một sản phẩm phát hành được. Không đợi đủ 14 ngành.*
