LRD("n-cost-1", `
Đội tài chính của một nhà máy bánh kẹo dựng mô hình hoà vốn và xếp toàn bộ tiền điện — khoảng 60 đến 80 triệu mỗi tháng — vào chi phí cố định.

Nghe hợp lý: hoá đơn điện đến đều đặn hằng tháng, và nhà máy luôn phải thắp sáng, chạy điều hoà, vận hành hệ thống lạnh.

Nhưng hai tháng có sản lượng khác nhau có hoá đơn khác nhau: tháng sản xuất 80.000 thùng hết 60 triệu, tháng sản xuất 120.000 thùng hết 80 triệu. Nếu tiền điện thật sự cố định, hai con số phải bằng nhau.

Một phần tiền điện chạy theo sản lượng, và xếp nhầm nó vào cố định làm sai toàn bộ điểm hoà vốn.

## Ba loại chi phí, không phải hai

**Cố định** — không đổi theo sản lượng trong ngắn hạn: thuê nhà xưởng, lương quản lý, khấu hao, bảo hiểm.

**Biến đổi** — tăng theo từng đơn vị: nguyên liệu, bao bì, hoa hồng bán hàng.

**Bán biến đổi** — có một nền cố định cộng một phần chạy theo sản lượng: điện, nước, bảo trì, lương có làm thêm giờ, chi phí kho.

Loại thứ ba là loại hay bị ép vào một trong hai nhóm kia cho tiện, và đó là nguồn sai số phổ biến nhất trong các mô hình tài chính đơn giản.

Dấu hiệu nhận ra một khoản bán biến đổi: **khi sản lượng bằng 0, khoản đó vẫn lớn hơn 0, nhưng nó tăng khi sản lượng tăng**. Nhà máy dừng hẳn một tháng vẫn tốn tiền điện bảo vệ và kho lạnh — nhưng ít hơn nhiều so với tháng chạy hết công suất.

## Phương pháp cao – thấp

Cách tách đơn giản nhất và đủ dùng cho một bài case: lấy tháng có sản lượng cao nhất và tháng thấp nhất.

**Biến phí mỗi đơn vị = chênh lệch chi phí ÷ chênh lệch sản lượng.**

(80 triệu − 60 triệu) ÷ (120.000 − 80.000 thùng) = 20 triệu ÷ 40.000 = **500đ mỗi thùng**.

**Phần cố định = chi phí của một tháng − biến phí × sản lượng tháng đó.**

Lấy tháng thấp: 60 triệu − 80.000 × 500đ = 60 triệu − 40 triệu = **20 triệu**.

Kiểm tra bằng tháng cao: 20 triệu + 120.000 × 500đ = 20 + 60 = 80 triệu. Khớp.

Vậy tiền điện là **20 triệu cố định cộng 500đ mỗi thùng**, không phải 60–80 triệu cố định.

## Vì sao sai lệch này quan trọng

Giả sử nhà máy có tổng chi phí cố định danh nghĩa 500 triệu một tháng, trong đó có 70 triệu tiền điện được xếp nhầm là cố định, và lãi góp mỗi thùng là 5.000đ.

Tính sai: điểm hoà vốn = 500 triệu ÷ 5.000đ = 100.000 thùng.

Tính đúng: chi phí cố định thật là 500 − 70 + 20 = 450 triệu; lãi góp mỗi thùng giảm 500đ còn 4.500đ. Điểm hoà vốn = 450 ÷ 4.500 = 100.000 thùng.

Trong ví dụ này hai kết quả trùng nhau một cách tình cờ — nhưng đó là ngoại lệ. Điều quan trọng là **các kịch bản sẽ khác nhau**: khi sản lượng tăng 50%, mô hình sai dự báo chi phí thấp hơn thực tế 30 triệu mỗi tháng, vì nó không cho tiền điện tăng theo.

Mô hình sai không sai đều — nó sai nhiều nhất ở đúng những kịch bản bạn đang cân nhắc.

## Giới hạn của phương pháp cao – thấp

Hai điều cần nói ra khi dùng.

**Hai tháng được chọn phải bình thường.** Nếu tháng cao trùng với đợt bảo trì lớn hoặc tháng thấp trùng với một tuần mất điện, phép tính sẽ lệch. Nên liếc qua vài tháng khác để xác nhận đường thẳng đi qua hai điểm đó là hợp lý.

**Với nhiều dữ liệu, hồi quy tốt hơn.** Cao – thấp chỉ dùng hai điểm và bỏ phí phần còn lại. Nếu có mười hai tháng, một đường hồi quy đơn giản sẽ cho kết quả ổn định hơn.

Trong phỏng vấn, cao – thấp là đủ, nhưng nói thêm câu "với dữ liệu nhiều tháng em sẽ dùng hồi quy" cho thấy bạn biết giới hạn của công cụ.

## Nói ra như thế nào

> "Tiền điện không phải chi phí cố định. Hai tháng có sản lượng khác nhau cho hoá đơn khác nhau — 60 triệu ở 80.000 thùng và 80 triệu ở 120.000 thùng.

> Dùng phương pháp cao – thấp: chênh lệch 20 triệu chia 40.000 thùng ra biến phí 500đ mỗi thùng.

> Phần cố định: 60 triệu trừ 80.000 nhân 500đ, bằng 20 triệu.

> Vậy tiền điện là 20 triệu cố định cộng 500đ mỗi thùng. Em sẽ cập nhật lại mô hình hoà vốn, vì cách xếp cũ làm dự báo chi phí ở kịch bản sản lượng cao thấp hơn thực tế.

> Em cũng đề nghị kiểm tra vài tháng khác để chắc hai tháng này không có sự kiện bất thường."

## Bốn chỗ hay trượt

**Ép khoản bán biến đổi vào một nhóm.** Làm hoà vốn và mọi kịch bản sai.

**Chọn tháng có sự kiện bất thường.** Một tháng bảo trì lớn làm lệch cả phép tính.

**Nhầm đơn vị.** Triệu đồng chia cho thùng ra đồng mỗi thùng.

**Giả định biến phí không đổi mãi.** Vượt công suất phải thêm ca, và biến phí mỗi đơn vị có thể tăng.

## Trước khi sang phần bài tập

Phần dưới bắt bạn tách 20 triệu cố định và 500đ biến phí. Bài tiếp theo xử lý một từ bị dùng cho bốn thứ khác nhau trong cùng một cuộc họp: biên lợi nhuận.
`);
