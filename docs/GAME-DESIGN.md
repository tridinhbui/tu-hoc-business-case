# Thiết kế phần game

## Nguyên tắc: game hoá cái đã có thật, không dán điểm số lên trên

Cách làm sai phổ biến là thêm một lớp điểm — XP, vàng, năng lượng — chạy song song với việc học. Lúc đó người học có hai bảng thành tích: một cái nói họ giỏi, một cái nói họ chưa đạt. Cái nào cũng không đáng tin.

Ở đây mọi thứ trên bản đồ **được suy ra từ dữ liệu học thật**, không có bảng điểm thứ hai:

| Yếu tố game | Là cái gì trong chương trình | Suy ra từ đâu |
|---|---|---|
| Vùng đất | Một nhánh A–J | `tracks` |
| Điểm trên bản đồ | Một module | `modules` + trạng thái khoá/mở của bài trong module |
| Boss | Checkpoint của module (`gates_module = 1`) | `lessons` |
| Máu boss | Phần bài trong module chưa đạt | `100 − đã đạt / tổng` |
| Hạ boss | Đạt checkpoint | `attempts.passed` |
| Cấp nhân vật | Cấp người học 1–4 | `users.level` |
| Điểm kinh nghiệm | Tổng **điểm cao nhất** của các bài đã đạt | `attempts.final_score` |
| Chuỗi ngày | Số ngày liên tiếp có bài đạt (giờ Việt Nam) | `attempts.graded_at` |
| Chỉ số nhân vật | Readiness từng năng lực | `readiness.score` |
| Nhiệm vụ | Drill sửa lỗi đang bị giao, bài cần review, bài đang mở | `remediation_assignments` + cổng khoá |

Hệ quả thiết kế đáng chú ý nhất: **XP là tổng điểm, không phải số bài.** Làm ẩu mười bài được ít XP hơn làm tử tế năm bài. Nếu XP đếm số bài thì trò chơi sẽ dạy người học cày cho xong — đúng thứ chương trình này cố gắng chống.

Máu boss cũng vậy: nó không rút khi người học mở bài hay xem bài, chỉ rút khi **đạt** một bài. Thanh máu vì thế luôn nói đúng một điều: còn bao nhiêu việc thật sự chưa làm được.

## Cái tôi cố tình không sao chép

- **Vàng và năng lượng.** Một đồng tiền chỉ có nghĩa khi có chỗ tiêu. Chỗ tiêu duy nhất sẵn có ở đây là mua gợi ý hoặc mở dữ liệu case sớm — mà đó chính là thứ làm hỏng bài học: case cố tình giữ dữ liệu lại để người học phải biết hỏi. Bán quyền bỏ qua bước đó là bán mất phần giá trị nhất. Khi nào có chỗ tiêu không phá pedagogy (đổi lấy lượt chấm đôi, mở case ngoài lộ trình để luyện thêm) thì thêm tiền tệ sau.
- **Năng lượng giới hạn lượt chơi.** Cơ chế này tồn tại để bán thời gian. Ở đây thứ giới hạn nhịp học đã có sẵn và có lý do sư phạm: cổng khoá bài và drill sửa lỗi.
- **Boss có HP cố định kiểu 1.000.000.** Con số to gây cảm giác tiến độ giả. HP ở đây là phần trăm việc còn lại, nên nhìn vào là biết còn mấy bài.

## Trạng thái hiện tại

`/map` trong ứng dụng, API `/api/kingdom`:

- Thanh HUD: cấp, XP, số bài đã đạt, chuỗi ngày, readiness trung bình và số năng lực đã đạt ngưỡng.
- Danh sách nhiệm vụ: drill sửa lỗi (ưu tiên cao nhất), bài cần review, rồi các bài đang mở.
- Vùng đất đang mở: từng module là một điểm, có thanh tiến độ và thẻ boss với máu; boss mở thì có nút **Đánh boss**, boss khoá thì nói rõ vì sao khoá.
- Vùng đất chưa mở liệt kê gọn ở cuối, không giả vờ là bí ẩn.

Kiểm thử e2e bao: bản đồ dựng từ tiến độ của chính người học, XP là tổng điểm, công thức máu boss, vùng khoá không có boss để đánh, hạ checkpoint thì boss về 0 máu và module chuyển sang "đã chiếm", và người chưa đăng nhập không xem được bản đồ.

## Bước tiếp theo, xếp theo giá trị trên công sức

1. **Bảng xếp hạng theo lộ trình, không theo toàn hệ thống.** So sánh người mới tuần 1 với người đã học 8 tuần là vô nghĩa và làm nản. Xếp hạng trong cùng lộ trình, cùng tuần.
2. **Huy hiệu gắn với mã lỗi đã diệt.** "Ba lần liên tiếp không dính SIZ-06" là thành tích nói lên năng lực thật, khác hẳn "đăng nhập 7 ngày".
3. **Boss theo mùa từ case thật.** Một case timed mỗi tuần, cả nhóm cùng đánh, dùng phòng live đã có (Durable Object) để chạy đồng thời.
4. **Clan = nhóm học.** Nhóm học đã có trong sản phẩm; gắn tiến độ nhóm vào bản đồ là phần dễ nhất trong ba cái trên.

Thứ tự này có lý do: (1) và (2) làm động lực khớp với việc học đúng cách, (3) và (4) tốn công vận hành và chỉ đáng làm khi đã có đủ người học cùng lúc.
