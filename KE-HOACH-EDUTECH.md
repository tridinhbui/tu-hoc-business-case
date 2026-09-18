# Kế hoạch: từ một sản phẩm luyện case thành một doanh nghiệp edutech

> Tài liệu này giả định bạn muốn **sống được bằng sản phẩm này**, không phải làm cho vui.
> Mọi con số dưới đây là ước lượng có cơ sở, và mọi chỗ tôi không chắc đều được ghi rõ.

---

## 1. Đang có gì — đo bằng số, không bằng cảm giác

| Hạng mục | Số lượng |
|---|---|
| Case mission | 30 case · 123 bước tương tác |
| Bài học | 64 bài · 16 module · 3 lộ trình · 129 bài tập chấm điểm |
| Bài kiểm tra cuối lộ trình | 3 đề · 30 câu · 3 chứng chỉ |
| Hồ sơ doanh nghiệp | 47 (26 Việt Nam) |
| Mô hình kinh doanh | 12 · kèm mini case |
| Company battle | 5 |
| **Tổng nội dung** | **~102.000 từ** |
| **Thời lượng học lõi** | **~12,3 giờ** |
| Mã nguồn | 8.947 dòng JS (5.992 dòng là dữ liệu nội dung) |

**Đánh giá thẳng:** đây đã là một sản phẩm học thật, không phải demo. 12 giờ nội dung có cấu trúc là bằng một khoá học trả phí trung bình trên thị trường. Nhưng nó **chưa phải một doanh nghiệp** vì bảy lý do ở mục sau.

---

## 2. Bảy khoảng trống giữa "sản phẩm" và "doanh nghiệp"

| # | Khoảng trống | Hậu quả nếu bỏ qua |
|---|---|---|
| 1 | **Không có tài khoản** — tiến độ chỉ nằm trong localStorage | Người học mất tiến độ khi đổi máy; bạn không biết ai đang dùng; không thu tiền được |
| 2 | **Không có dữ liệu hành vi** | Không biết bài nào gây bỏ dở, case nào quá khó, chỗ nào cần sửa |
| 3 | **Không có quy trình sản xuất nội dung** | 30 case giữ chân được ~6 tuần. Sau đó người học hết bài và rời đi |
| 4 | **Chứng chỉ tự cấp không có giá trị thị trường** | Không ai trả tiền cho một tờ chứng nhận mà nhà tuyển dụng chưa từng nghe tên |
| 5 | **Không có đường tiền** | Không thanh toán, không gói, không hoá đơn |
| 6 | **Số liệu doanh nghiệp là ước lượng** | Rủi ro pháp lý và uy tín khi thương mại hoá nội dung nói về công ty thật |
| 7 | **Không có kênh phân phối** | Sản phẩm tốt mà không ai biết vẫn là con số không |

Thứ tự trên **không phải** thứ tự ưu tiên. Thứ tự ưu tiên nằm ở mục 4.

---

## 3. Chọn một mũi nhọn — đây là quyết định quan trọng nhất

Sai lầm phổ biến nhất của edutech Việt Nam là nhắm "ai cũng học được". Kết quả: không ai thấy sản phẩm này dành cho mình.

### Ba nhóm khả dĩ

| Nhóm | Quy mô VN | Sẵn sàng chi trả | Deadline thật | Mức khớp nội dung hiện có |
|---|---|---|---|---|
| **A. Sinh viên năm 3–4 + đi làm 0–3 năm ôn phỏng vấn MT / consulting / BA** | ~50–80k người/năm có ý định | Trung bình, nhưng **cao vào mùa tuyển** | **Có** — mùa MT tháng 8–11 | **Rất cao** — nội dung hiện tại gần như đúng bài |
| B. Người đi làm muốn hiểu kinh doanh nói chung | Rất lớn | Thấp, dễ bỏ dở | Không | Trung bình |
| C. Doanh nghiệp đào tạo nội bộ BA/chiến lược | Nhỏ nhưng biên cao | Cao | Theo kế hoạch đào tạo | Cao, cần tuỳ biến |

### Khuyến nghị: đánh nhóm A trước, mở nhóm C sau 12 tháng

**Vì sao A:**
- Họ có một **deadline không thể trì hoãn** — vòng phỏng vấn Management Trainee. Deadline là thứ biến "hay đấy" thành "mua ngay".
- Họ **tập trung ở nơi tìm được**: CLB sinh viên kinh tế, group ôn MT trên Facebook, LinkedIn sinh viên NEU/FTU/UEH/RMIT.
- Nội dung hiện tại — profitability, market entry, market sizing, MECE, case math, synthesis — **chính là đề thi của họ**.
- Họ nói cho nhau nghe. Một người đậu MT kể lại sản phẩm là marketing rẻ nhất bạn có.

**Vì sao chưa đánh C:** B2B cần hợp đồng, hoá đơn, tuỳ biến, và một người bán hàng. Chưa đủ nguồn lực ở giai đoạn 1.

### Câu định vị đề xuất

> **Tự học Business Case — luyện case phỏng vấn bằng doanh nghiệp Việt Nam bạn đã biết.**
> 12 giờ nội dung có cấu trúc, 30 case thực chiến, chấm điểm theo đúng năm tiêu chí mà nhà tuyển dụng dùng.

Điểm khác biệt phòng thủ được: **case về Vinamilk, MoMo, Vietjet, Techcombank** — thứ mà giáo trình Victor Cheng hay CaseCoach không có, và thứ mà hội đồng phỏng vấn Việt Nam thật sự hỏi.

---

## 4. Kiến trúc sản phẩm — ba nấc, không nhảy cóc

### Nấc 0 (hiện tại): static, localStorage
Giữ nguyên. Đây là tài sản, không phải nợ kỹ thuật. Site tĩnh nghĩa là **chi phí vận hành gần bằng 0** và tốc độ tải rất nhanh — hai thứ quan trọng với người dùng Việt Nam dùng 4G.

### Nấc 1: tài khoản + đồng bộ (bắt buộc để thu tiền)

| Việc | Cách làm đề xuất | Lý do |
|---|---|---|
| Đăng nhập | **Supabase Auth** hoặc Firebase Auth, ưu tiên Google + email OTP | Không tự viết auth. Không lưu mật khẩu. |
| Lưu tiến độ | Một bảng `progress(user_id, json)` — chính là object state hiện tại | Không cần thiết kế lại schema. State hiện tại đã là JSON tự chứa. |
| Đồng bộ | Ghi khi hoàn thành bài/case, đọc khi đăng nhập. Vẫn ghi localStorage trước → **hoạt động được cả khi mất mạng** | Offline-first là lợi thế thật ở VN |
| Xung đột hai thiết bị | Dùng lại đúng hàm `BACKUP.merge()` đã viết — giữ kết quả tốt hơn ở từng mục | Đã có sẵn, đã kiểm chứng |

**Khối lượng ước tính:** 1–2 tuần. Không cần server riêng.

### Nấc 2: lớp học và người dạy (mở nguồn thu B2B2C)

- **Cohort**: một mã lớp, giảng viên/CLB tạo lớp, học viên nhập mã
- **Bảng theo dõi cho người dạy**: ai học tới đâu, module nào cả lớp yếu — dùng lại đúng hàm `State.moduleScores()` đã có, chỉ tổng hợp theo lớp
- **Bài tập giao**: chọn case, đặt hạn nộp, xem điểm 5 tiêu chí
- **Xuất bảng điểm** CSV

**Khối lượng ước tính:** 3–4 tuần sau khi có nấc 1.

### Điều KHÔNG làm ở cả ba nấc
- Không viết backend riêng bằng Node/Java. Managed service là đủ cho vài chục nghìn người dùng.
- Không làm app native. PWA là đủ; người học ngồi máy tính khi luyện case.
- Không làm video. Chi phí sản xuất cao, khó sửa, không đo được hiểu hay không.

---

## 5. Nút thắt thật sự: tốc độ sản xuất nội dung

Đây là chỗ 90% edutech chết, và cũng là chỗ dự án này dễ chết nhất.

### Bài toán
- Hiện có **30 case ≈ 6 tuần sử dụng** với người học chăm (5 case/tuần)
- Để giữ chân 6 tháng cần **~100 case**
- Mỗi case hiện tại ≈ **2.000–3.000 từ + 4–6 bước + số liệu phải khớp**

### Giải pháp: biến việc viết case thành dây chuyền

**Bước 1 — Chuẩn hoá khuôn (đã có sẵn)**
Schema case hiện tại đã đủ chặt: `brief → steps[] → solution`. Bảy dạng bước đã bao phủ mọi loại case. **Không cần thiết kế lại.**

**Bước 2 — Viết bộ quy tắc biên tập** (chưa có, cần làm)
Một file `HUONG-DAN-VIET-CASE.md` quy định:
- Mỗi case phải có đúng một *insight đi ngược trực giác*
- Mọi con số phải tự khớp — có script kiểm tra tự động (đã có sẵn trong session này)
- Cấm case dạy "đáp án đúng duy nhất" ở bước decision
- Độ dài trần: 3.000 từ

**Bước 3 — Tuyển cộng tác viên nội dung**
Chân dung: cựu MT/consultant 1–3 năm kinh nghiệm, hoặc sinh viên vừa đậu MT.
- Trả **500k–1tr/case** hoàn chỉnh (đã kiểm chứng số học)
- 1 biên tập viên (bạn) duyệt
- Mục tiêu: **8–10 case/tháng** với 3 cộng tác viên

**Bước 4 — Tự động hoá kiểm tra chất lượng**
Bài test tự động đã viết trong quá trình làm sản phẩm này (chơi hết mọi case/bài học, bắt buộc mỗi câu chấm ra 1.0) **chính là cổng kiểm duyệt**. Case nào không qua test thì không lên production. Việc này đã bắt được 4 lỗi số học thật.

### Lộ trình nội dung 12 tháng

| Mốc | Case | Bài học | Ghi chú |
|---|---|---|---|
| Hiện tại | 30 | 64 | |
| Tháng 3 | 55 | 76 | Thêm module Marketing + Digital cho track Cracking |
| Tháng 6 | 80 | 88 | Đủ để giữ chân một mùa tuyển dụng |
| Tháng 12 | 120 | 100 | Mở track thứ 4: Finance & Valuation |

---

## 6. Học sao cho người ta thật sự giỏi lên — không chỉ thấy vui

Ba cơ chế nên thêm, xếp theo tỷ lệ giá trị trên công sức:

### 6.1 Ôn tập giãn cách (spaced repetition) — ưu tiên cao nhất
Người học quên 70% nội dung sau 1 tuần nếu không ôn.
- Mỗi thuật ngữ trong mục **Terms** (đã có ~190 thuật ngữ) thành một thẻ ôn
- Lịch ôn: 1 ngày → 3 ngày → 7 ngày → 21 ngày
- Gộp vào Daily Challenge: 5 thẻ ôn + 1 case ngắn
- **Khối lượng: 1 tuần.** Tận dụng toàn bộ dữ liệu `terms` đã có sẵn.

### 6.2 Mastery gate thay vì hoàn thành gate
Hiện tại học xong bài là qua, kể cả điểm 40. Nên yêu cầu **đạt 70 mới mở bài sau**, và cho làm lại không giới hạn.
- Rủi ro: gây bực. Giảm thiểu bằng cách cho xem lại lời giải trước khi làm lại.
- **Khối lượng: 2 ngày.** Chỉ sửa điều kiện trong `State.lessonDone()`.

### 6.3 Case biến thể (case variants)
Cùng một case, số liệu khác nhau → không thể học vẹt đáp án.
- Sinh số liệu theo tham số trong khoảng cho phép, đáp án tính lại tự động
- **Khối lượng: 2 tuần.** Cần sửa schema case để hỗ trợ công thức thay vì số cứng.
- Giá trị lớn nhất: một case dùng được nhiều lần → **giảm áp lực sản xuất nội dung ở mục 5**.

---

## 7. Mô hình kinh doanh — con số thực tế cho thị trường Việt Nam

### Giá đề xuất

| Gói | Giá | Gồm gì | Vì sao mức này |
|---|---|---|---|
| **Free** | 0đ | Track Foundations đầy đủ · 8 case · Daily Challenge | Đủ để thấy giá trị thật, không phải bản dùng thử cụt |
| **Pro tháng** | **249.000đ** | Toàn bộ case, 3 track, chứng chỉ, ôn tập giãn cách | Ngang một buổi cà phê học nhóm × 4 |
| **Pro mùa tuyển** | **599.000đ / 4 tháng** | Pro + mock interview chấm tay 2 lượt | Bán đúng mùa MT tháng 8–11 |
| **Lớp / CLB** | **từ 5tr / 30 học viên / kỳ** | Bảng theo dõi cho người dạy, giao bài, xuất điểm | Biên cao nhất, ít hỗ trợ nhất |

**Vì sao không bán trọn đời:** doanh thu một lần không nuôi được việc sản xuất nội dung liên tục — thứ mà chính bạn xác định là nút thắt.

**Vì sao Free rộng:** ở Việt Nam, tỷ lệ chuyển đổi từ bản dùng thử cụt rất thấp. Cho hẳn một track hoàn chỉnh sẽ tạo người ủng hộ thật.

### Ước lượng doanh thu năm 1 (thận trọng)

| Giả định | Giá trị |
|---|---|
| Người dùng đăng ký (12 tháng) | 6.000 |
| Tỷ lệ trả phí | 4% |
| Người trả phí | 240 |
| Doanh thu trung bình mỗi người | 450.000đ |
| **Doanh thu B2C** | **~108 triệu** |
| Hợp đồng CLB/trường | 6 hợp đồng × 5tr |
| **Doanh thu B2B2C** | **30 triệu** |
| **Tổng năm 1** | **~138 triệu** |

**Nói thẳng: con số này không đủ sống.** Năm 1 là năm chứng minh có người trả tiền và xây kho nội dung, không phải năm kiếm sống. Nếu bạn cần thu nhập ngay, đây là dự án buổi tối, không phải dự án toàn thời gian.

Ngưỡng để cân nhắc toàn thời gian: **500 người trả phí đồng thời**, tương đương ~125tr/tháng doanh thu định kỳ.

---

## 8. Đưa sản phẩm tới người học

### Kênh xếp theo chi phí trên mỗi người dùng

| Kênh | Chi phí | Tốc độ | Ghi chú |
|---|---|---|---|
| **Group Facebook ôn MT / CLB sinh viên kinh tế** | Gần 0 | Nhanh | Nơi nhóm A đã tập trung sẵn. Đừng spam — đóng góp lời giải case miễn phí trước |
| **Nội dung phân tích doanh nghiệp Việt** | Thời gian | Trung bình | Mỗi tuần một bài mổ xẻ một doanh nghiệp, cuối bài dẫn về case tương ứng. Đây là cách dùng chính tài sản 47 hồ sơ doanh nghiệp làm marketing |
| **Hợp tác CLB sinh viên** | Thấp | Trung bình | Tài trợ cuộc thi case của CLB bằng tài khoản Pro. Vừa phân phối vừa lấy uy tín |
| **Người vừa đậu MT kể lại** | 0 | Chậm nhưng bền | Chủ động xin và đăng. Đây là bằng chứng mạnh nhất |
| Quảng cáo trả tiền | Cao | Nhanh | **Chưa làm ở năm 1.** Chưa biết LTV thì mọi đồng quảng cáo là đoán mò |

### Mốc phân phối cụ thể cho 90 ngày đầu
1. Viết 8 bài phân tích doanh nghiệp Việt, đăng đều mỗi tuần
2. Liên hệ 10 CLB sinh viên kinh tế, tặng 30 tài khoản Pro/CLB
3. Tham gia 5 group ôn MT, trả lời case thật, không gắn link ở 20 bình luận đầu
4. Mục tiêu: **1.000 người đăng ký, 40 người trả phí**

---

## 9. Chỉ số — chỉ theo dõi 5 con số

Đừng dựng dashboard 30 chỉ số. Năm con số này quyết định sản phẩm sống hay chết:

| Chỉ số | Ngưỡng lành mạnh | Nói lên điều gì |
|---|---|---|
| **Hoàn thành bài học đầu tiên** | >55% người đăng ký | Onboarding có hoạt động không |
| **Quay lại ngày 7** | >25% | Sản phẩm có tạo thói quen không |
| **Học xong 1 module** | >20% | Nội dung có đủ tốt để đi hết một chương không |
| **Tỷ lệ trả phí** | >3% | Có ai coi đây là đáng tiền không |
| **Giữ chân tháng 3** | >40% người trả phí | Nội dung có đủ sâu để đáng gia hạn không |

Chỉ số cần **loại bỏ**: tổng lượt truy cập, thời gian trên trang, số bài học đã tạo. Ba chỉ số này làm bạn thấy vui mà không quyết định được gì.

---

## 10. Lộ trình 4 giai đoạn

| GĐ | Thời gian | Mục tiêu | Việc chính | Xong thì biết được gì |
|---|---|---|---|---|
| **1. Nền móng** | Tháng 1–2 | Thu được tiền | Tài khoản + đồng bộ · Thanh toán · Gói Free/Pro · Trang giá · Điều khoản & miễn trừ | Có ai chịu trả tiền không |
| **2. Giữ chân** | Tháng 3–5 | Người học ở lại | Ôn tập giãn cách · Mastery gate · +25 case · Bảng chỉ số 5 con số | Nội dung có đủ giữ chân 90 ngày không |
| **3. Phân phối** | Tháng 6–8 | Có người mới đều đặn | Nội dung phân tích doanh nghiệp · Hợp tác CLB · Mùa tuyển MT · Mock interview | Kênh nào thật sự mang người về |
| **4. Nhân rộng** | Tháng 9–12 | Biên lợi nhuận | Lớp học cho người dạy · Case biến thể · Dây chuyền cộng tác viên · Track thứ 4 | Có nhân rộng mà không tăng công sức tuyến tính không |

**Quy tắc chuyển giai đoạn:** không sang giai đoạn sau nếu chỉ số của giai đoạn trước chưa đạt ngưỡng. Làm phân phối khi sản phẩm chưa giữ chân được là đổ nước vào xô thủng.

---

## 11. Rủi ro — và cái nào thật sự đáng lo

| Rủi ro | Mức độ | Cách giảm |
|---|---|---|
| **Cạn nội dung sau 6 tuần** | **Cao nhất** | Dây chuyền cộng tác viên + case biến thể. Đây là rủi ro số một, xử lý từ tháng 3 |
| **Bạn kiệt sức** | **Rất cao** | Dự án một người viết 102.000 từ đã là giới hạn. Phải có người viết thứ hai trước tháng 6 |
| Số liệu doanh nghiệp gây tranh cãi | Trung bình | Đã có ghi chú "ước lượng cho mục đích luyện tập" ở mọi hồ sơ. Khi thương mại hoá cần thêm: không khẳng định số liệu tài chính chưa công bố, không suy diễn về ban lãnh đạo, gỡ nội dung khi doanh nghiệp yêu cầu |
| Chứng chỉ không có giá trị | Trung bình | Đừng bán chứng chỉ. Bán **kết quả phỏng vấn**. Nếu muốn chứng chỉ có giá trị thật thì phải có một nhà tuyển dụng đứng tên — việc này mất 12+ tháng |
| Đối thủ sao chép | **Thấp** | Nội dung 102.000 từ có chiều sâu ngành không sao chép nhanh được. Đừng lo việc này |
| Không ai chịu trả tiền | Trung bình | Chính là câu hỏi mà giai đoạn 1 sinh ra để trả lời. Nếu sau 3 tháng dưới 1% trả phí, hãy đổi sang nhóm C (doanh nghiệp) thay vì cố ép nhóm A |

---

## 12. Điều KHÔNG nên làm

- **Không làm app native** trước khi có 1.000 người dùng hoạt động
- **Không làm video bài giảng** — chi phí cao, khó sửa, không đo được người học hiểu hay không
- **Không mở thêm track thứ 4, 5** khi ba track hiện có chưa ai học hết
- **Không làm diễn đàn / mạng xã hội trong sản phẩm** — cần kiểm duyệt, không phải lõi giá trị
- **Không chạy quảng cáo trả tiền** trước khi biết LTV
- **Không bán trọn đời**
- **Không hứa "đậu MT"** — hứa điều bạn không kiểm soát được là cách nhanh nhất mất uy tín

---

## 13. Việc cần làm tuần này

Nếu chỉ chọn được ba việc:

1. **Viết trang giá và điều khoản** — kể cả khi chưa có thanh toán. Việc buộc phải viết ra "bán gì, giá bao nhiêu, cam kết gì" sẽ làm lộ ra mọi chỗ mơ hồ trong kế hoạch này.
2. **Đưa sản phẩm cho 10 người thuộc nhóm A dùng thử** và ngồi xem họ dùng — không hướng dẫn, không giải thích. Ghi lại chỗ họ tắc.
3. **Viết `HUONG-DAN-VIET-CASE.md`** — vì nếu bạn không viết được quy tắc, bạn sẽ không thuê được người viết thứ hai, và mục 11 sẽ giết dự án này.

---

*Tài liệu này nên được sửa lại sau mỗi giai đoạn. Một kế hoạch không đổi sau 3 tháng là kế hoạch không ai dùng.*
