# Kế hoạch viết nội dung

Tình trạng hôm nay (chạy `python3 scripts/authoring-queue.py --all` để có số mới nhất):

| | |
|---|---|
| Thân bài đã viết | **15 / 122** |
| Đề case đã đặc tả | **30** (29 từ blueprint + 1 viết tay) |
| Rubric thiếu mô tả 4 mức | **36 / 40** (RM-A1, RM-A2, RM-A3 đã xong) |
| Mã lỗi chưa có nguyên nhân gốc | 127 / 136 |
| Giả định chưa có nguồn | 30 / 30 |

Khung chương trình đã xong: 34 module, 122 bài, 10 nhánh, 6 lộ trình, 16 năng lực, 136 mã lỗi — tất cả đã ở trong D1. Cái còn thiếu là **chữ**: thân bài để người học đọc, đề case để người học làm, và mô tả rubric để người chấm chấm giống nhau.

## Nguyên tắc xếp thứ tự: viết theo lộ trình, không viết theo số bài

Viết lần lượt 001, 002, 003… thì sau hai tháng vẫn chưa dạy được lớp nào. Viết theo **thứ tự của một lộ trình** thì ngày lộ trình đó đủ bài là mở lớp được.

Thứ tự ưu tiên:

1. **PATH-6 — Zero to Business Case Fundamentals** (5 tuần, 34 bài, còn thiếu 33 thân bài). Đây là lộ trình ngắn nhất và là cửa vào của persona P1. Xong nó là có lớp thật, có người học thật, có phản hồi thật.
2. **PATH-1 — Case Competition in 8 weeks** (còn thiếu 67 thân bài). Dùng lại gần hết phần nền của PATH-6, nên chi phí biên thấp hơn con số 67 gợi ý.
3. **PATH-5 → PATH-3 → PATH-4** (48 / 59 / 55). Ba lộ trình chức năng, viết sau khi phần nền đã được người học kiểm chứng.
4. **PATH-2 — Consulting interview** (68 thân bài + 1 đề case). Để cuối vì nó cần thêm người đóng vai interviewer và bản ghi mẫu, tức là cần người chứ không chỉ cần chữ.

Lệnh cho biết **chính xác** bài kế tiếp phải viết:

```bash
python3 scripts/authoring-queue.py PATH-6
```

## Định mức và nhịp

Một thân bài viết nghiêm túc mất 60–90 phút: đọc lại outcome của module, viết ví dụ đã giải, tự làm bài tập của chính mình rồi sửa lại đề bài cho khớp. Một đề case đầy đủ mất 2–3 giờ vì phải tự giải nó ít nhất một lần.

Nhịp đề nghị, giả sử mỗi ngày dành 2 giờ:

| Tuần | Sản lượng | Cột mốc |
|---|---|---|
| 1–2 | 14 thân bài (tuần 1–2 của PATH-6) | Người học đi được hai tuần đầu — **xong 10/14**, tuần 1 và 2 đã đủ bài kèm rubric A1, A3 |
| 3–4 | 13 thân bài + 2 đề case (tuần 3–4) | **Tuần 3 xong** (005–008, 102 + rubric A2); còn tuần 4 |
| 5 | 6 thân bài + checkpoint L1 | **PATH-6 chạy trọn vẹn** → mở lớp thử 20 người |
| 6–10 | PATH-1 phần còn thiếu | Path 1 tới capstone |

Cột mốc quan trọng nhất là cuối tuần 5: từ đó trở đi việc viết được dẫn đường bằng dữ liệu thật (người học sai ở đâu, bỏ dở ở bài nào) thay vì bằng phỏng đoán.

## Định nghĩa "viết xong"

Một thân bài xong khi `npm run content:check` xanh, nghĩa là có đủ:

- **goal** — sau bài này người học *làm được* gì, viết bằng động từ hành động, không phải "hiểu về…".
- **worked_example** — một ví dụ đã giải trọn vẹn, có số, có thứ tự các bước. Đây là phần tốn công nhất và cũng là phần người học dùng nhiều nhất.
- **pitfall** — lỗi thường gặp, và phải gọi tên **mã lỗi có thật** (SIZ-06, FRM-04…). Đây là dây nối giữa bài học và hệ thống drill sửa lỗi: viết sai mã thì drill không bao giờ được giao.
- **exercise** — có dòng `Output:` nói chính xác người học nộp cái gì. Nếu không viết được dòng này thì bài chưa có lý do tồn tại.

Một đề case xong khi có: bối cảnh, câu hỏi, **ít nhất 3 mẩu dữ liệu giữ lại** (chỉ phát khi được hỏi), **ít nhất 1 bẫy gắn mã lỗi**, khung trả lời với các con số then chốt, và hướng dẫn chấm nhanh trong 3 phút. Bộ kiểm tra bắt đủ những thứ này.

Hai chuẩn mượn từ tài liệu viết case của STRATLAB (nhánh `main` cùng repo): mỗi case phải có **một insight đi ngược trực giác** và **số liệu tự khớp** — `## frame.check` tính lại từng con số và chặn nếu lệch quá 8%. Nhờ vậy case viết ở đây đạt luôn chuẩn của bên kia.

Và một điều kiện không nằm trong script: **tự giải đề của mình trước khi đưa cho ai.** Nếu bạn giải không ra trong đúng thời lượng ghi trên đề thì người học cũng vậy.

## Case phải qua 3 lượt chạy thử mới được publish

Ràng buộc này nằm trong chính schema: `CHECK (status <> 'published' OR pilot_runs >= 3)`. Viết xong đề thì nó ở `draft`; chạy thử với người thật 3 lần, sửa sau mỗi lần, rồi mới `published`.

Lưu ý một chỗ cần siết trước khi mở cho người học ngoài: hiện trang bài học hiển thị case ở **mọi** trạng thái trừ `retired`, tiện cho giai đoạn chạy thử nội bộ nhưng không đúng khi đã mở công khai — lúc đó phải lọc còn `pilot` và `published`.

## Ba khoản nợ nội dung, xếp theo mức độ gây hại

1. **36/40 rubric thiếu mô tả 4 mức** (RM-A1, RM-A2, RM-A3 đã viết xong, nạp qua `authoring/rubrics/`). Đây là khoản nợ nguy hiểm nhất: không có mô tả mức thì hai người chấm cùng một bài ra hai điểm khác nhau, và toàn bộ điểm readiness mất ý nghĩa. Viết mô tả mức cho rubric của các bài trong PATH-6 **trước** khi mở lớp thử.
2. **127/136 mã lỗi chưa có nguyên nhân gốc.** Không có nguyên nhân gốc thì drill sửa lỗi chỉ là "làm lại bài tương tự", không sửa được gì. Viết dần theo nhóm mã, mỗi khi chạm tới nhóm đó trong bài học.
3. **30/30 giả định chưa có nguồn.** Schema đã chặn: `verified_at` chỉ đặt được khi có `source_url`. Không được bịa nguồn; cái nào không tra được thì để `confidence = 'guess'` và nói rõ với người học rằng đó là số phỏng đoán.

## Quy trình một vòng viết

```bash
python3 scripts/authoring-queue.py PATH-6      # chọn bài kế tiếp
cp authoring/templates/lesson.md authoring/lessons/001.md
# ... viết ...
npm run content:check                          # bộ kiểm tra chất lượng
npm run db:seed:local                          # nạp vào D1 local
npm run dev                                    # đọc lại bằng mắt người học
git commit && git push                         # Workers Builds deploy
npm run db:seed:remote                         # đẩy nội dung lên production
```

Bước "đọc lại bằng mắt người học" đừng bỏ. Chữ đọc trong trình soạn thảo khác hẳn chữ đọc trên trang bài học lúc 11 giờ đêm.
