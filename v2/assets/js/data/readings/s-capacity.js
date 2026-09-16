LRD("s-capacity-1", `
Dây chuyền đóng chai ghi trên hồ sơ kỹ thuật: 1.000 chai mỗi giờ. Nhà máy chạy 20 giờ mỗi ngày. Ban giám đốc lập kế hoạch sản xuất theo con số 20.000 chai một ngày.

Cuối tháng, sản lượng thực tế hụt gần một phần tư so với kế hoạch. Không có sự cố lớn nào, không ai làm sai gì đặc biệt.

Lý do nằm ở ba con số mà hồ sơ kỹ thuật không ghi: máy chỉ sẵn sàng 90% thời gian, chạy ở 85% tốc độ thiết kế, và 95% sản phẩm đạt chất lượng.

## OEE: ba tỷ lệ nhân với nhau

**OEE = mức sẵn sàng × hiệu suất tốc độ × tỷ lệ đạt chất lượng.**

**Mức sẵn sàng** — thời gian máy thật sự chạy chia cho thời gian kế hoạch. Mất mát đến từ hỏng hóc, thay khuôn, chờ nguyên liệu, vệ sinh.

**Hiệu suất tốc độ** — tốc độ thực tế chia tốc độ thiết kế. Mất mát đến từ chạy chậm để tránh lỗi, dừng vặt vài giây không ai ghi nhận, nguyên liệu không đạt chuẩn.

**Tỷ lệ đạt chất lượng** — sản phẩm đạt chia tổng sản phẩm làm ra.

Với dây chuyền đóng chai: 90% × 85% × 95% = **72,675%**.

Công suất thật: 20.000 × 72,675% = **14.535 chai một ngày** — thấp hơn kế hoạch gần 5.500 chai.

## Vì sao phải nhân, không được lấy trung bình

Đây là lỗi tính toán phổ biến nhất trong bài này, và nó có hậu quả lớn.

Trung bình cộng của 90%, 85% và 95% là 90% — nghe rất khoẻ mạnh. Nhưng ba tổn thất này **xảy ra nối tiếp nhau**: trong thời gian máy chạy, nó chạy chậm; và trong số chai làm ra ở tốc độ đó, một phần bị loại.

Mỗi tỷ lệ áp lên phần còn lại của tỷ lệ trước, nên chúng nhân với nhau. Ba con số đều trên 85% vẫn cho OEE dưới 73%.

Đây cũng là bài học chung về các quy trình nhiều bước: **tỷ lệ tốt ở từng bước có thể cho kết quả tệ ở tổng thể**. Một quy trình mười bước, mỗi bước đạt 95%, cho kết quả cuối chỉ 60%.

## Tìm tổn thất lớn nhất

OEE 72,7% không tự nói phải sửa gì. Phải tách ra xem mất ở đâu.

Trong ba tỷ lệ, hiệu suất tốc độ thấp nhất — 85%, tức mất 15%. Mức sẵn sàng mất 10%, chất lượng mất 5%.

Nhưng "thấp nhất" chưa chắc là "đáng sửa nhất". Còn phải hỏi: sửa cái nào rẻ hơn và nhanh hơn?

Tổn thất tốc độ thường đến từ những dừng vặt vài giây — kẹt chai, chỉnh nhãn, chờ nắp — mà không ai ghi vào sổ vì quá ngắn. Chúng khó thấy nhưng thường dễ sửa với chi phí thấp, bằng cách quan sát và ghi chép một ca sản xuất.

Tổn thất sẵn sàng thường đến từ thay khuôn và bảo trì — sửa được bằng quy trình thay khuôn nhanh và bảo trì phòng ngừa.

Tổn thất chất lượng thường đắt nhất để sửa vì liên quan tới nguyên liệu hoặc thiết bị.

Vì vậy thứ tự thường là: **tốc độ trước, sẵn sàng sau, chất lượng cuối** — trừ khi dữ liệu nói khác.

## Trình bày bằng thác nước

Cách hiệu quả nhất để trình bày OEE là biểu đồ thác nước: bắt đầu ở 20.000 chai, trừ dần từng tổn thất, kết thúc ở 14.535.

Trừ mức sẵn sàng: 20.000 × 10% = mất 2.000, còn 18.000.
Trừ tốc độ: 18.000 × 15% = mất 2.700, còn 15.300.
Trừ chất lượng: 15.300 × 5% = mất 765, còn **14.535**.

Thác nước làm rõ hai điều mà con số OEE đơn lẻ không làm được: tổn thất nào lớn nhất về **số chai** (tốc độ, 2.700 chai), và tổng cộng mất bao nhiêu.

Chú ý rằng thứ tự trừ ảnh hưởng tới con số từng thanh, nên nói rõ thứ tự đang dùng.

## Nói ra như thế nào

> "Công suất thiết kế 20.000 chai một ngày, nhưng OEE mới là công suất thật.

> Mức sẵn sàng 90%, hiệu suất tốc độ 85%, chất lượng 95% — nhân lại ra 72,7%, không phải trung bình 90%.

> Công suất thật là 14.535 chai, thấp hơn kế hoạch gần 5.500 chai mỗi ngày.

> Tổn thất lớn nhất là tốc độ, khoảng 2.700 chai. Em đề xuất bắt đầu bằng việc ghi nhận các dừng vặt trong một ca — đây thường là tổn thất dễ sửa nhất với chi phí thấp nhất.

> Và kế hoạch sản xuất nên lập theo 14.535 chứ không phải 20.000, cho tới khi OEE cải thiện."

## Bốn chỗ hay trượt

**Lập kế hoạch theo công suất thiết kế.** Luôn hụt so với kế hoạch và luôn phải giải trình.

**Lấy trung bình ba tỷ lệ.** Che giấu tổn thất cộng dồn.

**Chỉ nhìn hàng lỗi.** Dừng máy và chạy chậm thường tổn thất nhiều hơn.

**Đầu tư dây chuyền mới trước khi cải thiện OEE.** Khoảng trống OEE thường rẻ hơn nhiều.

## Trước khi sang phần bài tập

Phần dưới bắt bạn tính OEE và công suất thật 14.535 chai. Bài tiếp theo dùng chính con số đó để trả lời câu hỏi đầu tư: khi nhu cầu vượt công suất, nâng OEE hay xây dây chuyền mới.
`);

LRD("s-capacity-2", `
Dây chuyền đóng chai làm ra 14.535 chai một ngày với OEE 72,675%. Nhu cầu dự báo là 18.000 chai. Thiếu gần 3.500 chai mỗi ngày.

Trên bàn có hai phương án: chương trình nâng OEE lên 85% với chi phí 20 tỷ, hoặc xây một dây chuyền mới với chi phí 150 tỷ.

Phản xạ thường gặp là chọn dây chuyền mới, vì nó giải quyết triệt để và nhìn thấy được. Nhưng phép tính nói khác.

## So bốn tiêu chí, không chỉ sản lượng

Mọi phương án mở rộng công suất nên được so trên bốn tiêu chí.

**Sản lượng tăng thêm.** Nâng OEE lên 85%: 20.000 × 85% = 17.000 chai, tức thêm **2.465 chai một ngày**. Dây chuyền mới: thêm một dây chuyền 20.000 chai thiết kế, ở OEE hiện tại cho khoảng 14.500 chai — thêm rất nhiều, nhưng vượt xa nhu cầu.

**Vốn đầu tư.** 20 tỷ so với 150 tỷ.

**Thời gian triển khai.** Chương trình OEE có thể cho kết quả trong ba đến sáu tháng. Dây chuyền mới cần đặt thiết bị, lắp đặt, chạy thử — thường mười hai đến mười tám tháng, trong đó không có thêm chai nào.

**Hoàn vốn.** Lãi góp 5.000đ một chai, 300 ngày chạy một năm. Nâng OEE: 2.465 × 300 × 5.000đ ≈ **3,7 tỷ một năm**, hoàn vốn 20 ÷ 3,7 ≈ 5,4 năm.

## Nâng OEE không đủ phủ hết nhu cầu — và điều đó không sao

Ở OEE 85%, sản lượng là 17.000 chai, vẫn thiếu 1.000 chai so với nhu cầu 18.000.

Đây là chỗ cần trình bày cẩn thận. Phương án rẻ không giải quyết trọn vẹn vấn đề, và nếu nói không khéo, nó sẽ bị bác bỏ vì "không đủ".

Cách trình bày đúng: nâng OEE trước vì nó **thu hẹp phần lớn khoảng thiếu với 13% chi phí**, và nó **hoãn được quyết định 150 tỷ** thêm mười hai tháng. Trong mười hai tháng đó, công ty biết rõ hơn nhu cầu thật có duy trì ở 18.000 chai không, và biết OEE có thể lên bao nhiêu.

Phần thiếu 1.000 chai trong giai đoạn chuyển tiếp có thể xử lý bằng cách chạy thêm giờ, thuê gia công, hoặc ưu tiên các đơn hàng biên cao.

## Trần của OEE

Phải nói rõ giới hạn của phương án rẻ: OEE không thể lên mãi. Mức 85% đã được coi là tốt trong nhiều ngành sản xuất; đẩy lên 95% thường không khả thi với thiết bị hiện có.

Nghĩa là nếu nhu cầu tiếp tục tăng lên 25.000 chai, dây chuyền mới là **không thể tránh** — chỉ là chưa phải bây giờ.

Trình bày như vậy biến khuyến nghị từ "không xây" thành "**chưa xây, và đây là mốc để quyết định lại**". Khuyến nghị thứ hai dễ được chấp nhận hơn nhiều và cũng đúng hơn.

## Hoàn vốn 5,4 năm có tệ không

Con số 5,4 năm nghe dài. Nhưng phải so với ba thứ.

**So với dây chuyền mới:** 150 tỷ để có thêm khoảng 14.500 chai, trong khi chỉ cần 3.465 chai để phủ nhu cầu. Phần công suất thừa không tạo ra lãi góp nào, nên hoàn vốn thực tế của phương án đó còn dài hơn nhiều.

**So với ngưỡng của công ty.** Nếu ngưỡng là 5 năm thì phương án OEE cũng không đạt, và cần xem lại giả định hoặc tìm cách giảm chi phí chương trình.

**So với giá trị của việc trì hoãn.** Khoản 130 tỷ chưa phải chi ra ngay có giá trị riêng — nó có thể dùng cho việc khác, hoặc đơn giản là không phải vay.

## Nói ra như thế nào

> "Em so hai phương án trên bốn tiêu chí: sản lượng thêm, vốn, thời gian, và hoàn vốn.

> Nâng OEE lên 85% cho 17.000 chai, tức thêm 2.465 chai một ngày, với 20 tỷ và ba đến sáu tháng. Lãi góp thêm khoảng 3,7 tỷ một năm.

> Dây chuyền mới cho công suất vượt xa nhu cầu với 150 tỷ và hơn một năm triển khai — trong thời gian đó không có thêm chai nào.

> Em đề xuất làm OEE trước. Nó thu hẹp phần lớn khoảng thiếu với 13% chi phí, và hoãn được quyết định lớn thêm mười hai tháng. Phần thiếu 1.000 chai xử lý bằng chạy thêm giờ.

> Nhưng em nói rõ OEE có trần khoảng 85%, nên nếu nhu cầu lên 25.000 chai thì dây chuyền mới là bắt buộc — em đề xuất mốc đánh giá lại sau 12 tháng."

## Bốn chỗ hay trượt

**Xây mới trước khi dùng hết công suất sẵn có.** Vốn lớn cho một vấn đề một phần là vận hành.

**So phương án chỉ bằng sản lượng.** Phải so cả vốn và thời gian triển khai.

**Quên trần của OEE.** Nâng OEE không thay thế được xây mới vĩnh viễn.

**Bỏ qua thời gian triển khai.** Mười hai tháng không có thêm sản lượng là chi phí thật.

## Trước khi sang phần bài tập

Phần dưới bắt bạn tính sản lượng tăng thêm 2.465 chai và so hai phương án. Module tiếp theo đi vào một câu hỏi cụ thể hơn của sàn sản xuất: trong một chuỗi công đoạn, chỗ nào đang thật sự chặn dòng chảy.
`);
