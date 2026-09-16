LRD("s-forecast-1", `
Một nhà phân phối nước đóng chai dự báo nhu cầu tháng tới bằng cách lấy đúng số bán tháng trước. Đơn giản, nhanh, và không ai trong công ty biết nó sai bao nhiêu.

Bốn tháng gần nhất: thực tế 100, 120, 90, 110 nghìn thùng; dự báo lần lượt 110, 100, 100, 100.

Cộng sai số có dấu: +10 − 20 + 10 − 10 = −10. Trung bình gần như bằng không — nhìn qua thì dự báo rất chính xác.

Nhưng nhà kho thì không quan tâm sai số trung bình. Tháng dự báo thiếu 20 nghìn thùng là tháng hết hàng và mất doanh thu; tháng dự báo thừa là tháng tiền nằm chết trong kho. Hai cái sai không bù cho nhau trong thực tế, chỉ bù cho nhau trên bảng tính.

## Đo sai số bằng giá trị tuyệt đối

Chỉ số chuẩn là **MAPE** — sai số phần trăm tuyệt đối trung bình.

Với mỗi kỳ: lấy trị tuyệt đối của chênh lệch, chia cho **giá trị thực tế**, ra phần trăm. Rồi lấy trung bình các phần trăm đó.

Tháng 1: |10| ÷ 100 = 10%.
Tháng 2: |20| ÷ 120 = 16,7%.
Tháng 3: |10| ÷ 90 = 11,1%.
Tháng 4: |10| ÷ 110 = 9,1%.

Trung bình: **11,7%**.

Con số này mới là thứ dùng được: nó nói rằng dự báo của nhà phân phối lệch trung bình gần 12% mỗi tháng, và mọi quyết định tồn kho phải tính đến mức lệch đó.

Chú ý mẫu số: chia cho **thực tế**, không phải dự báo. Chia cho dự báo cho ra một chỉ số khác và làm sai số trông nhỏ hơn khi dự báo cao.

## Chọn phương pháp theo dạng nhu cầu

Ba phương pháp phổ biến, mỗi cái hợp với một dạng dữ liệu.

**Ngây thơ — lấy kỳ trước làm kỳ sau.** Chỉ hợp khi nhu cầu rất ổn định và ít nhiễu. Ưu điểm duy nhất là không cần tính gì; nhược điểm là luôn trễ một nhịp khi có xu hướng.

**Trung bình trượt — lấy trung bình n kỳ gần nhất.** Làm mượt biến động ngẫu nhiên. Số kỳ càng nhiều càng mượt nhưng càng phản ứng chậm với thay đổi thật.

**Có mùa vụ — trung bình trượt nhân hệ số mùa.** Bắt buộc với hàng có mùa rõ: nước giải khát mùa hè, bánh trung thu, đồng phục học sinh. Không có hệ số mùa, mọi phương pháp khác sẽ luôn thiếu hàng đầu mùa và thừa hàng cuối mùa.

Với dữ liệu nước đóng chai — dao động quanh 105 nghìn thùng, không có xu hướng rõ — trung bình trượt ba tháng sẽ tốt hơn phương pháp ngây thơ. Nhưng nếu nước đóng chai có mùa hè cao điểm, cả hai đều thua phương pháp có mùa vụ.

## Sai số là một đầu ra, không phải một lời thú tội

Có một thói quen sai trong nhiều công ty: coi sai số dự báo là chuyện đáng xấu hổ và giấu đi.

Thực tế ngược lại. Người nhận dự báo — bộ phận mua hàng, sản xuất, kho — **cần** biết sai số để đặt đệm. Một dự báo 100 nghìn thùng với sai số 5% và một dự báo 100 nghìn thùng với sai số 25% dẫn tới hai mức tồn kho an toàn rất khác nhau.

Vì vậy quy tắc: **luôn báo sai số kèm dự báo**. Một con số dự báo đứng một mình là thông tin thiếu.

## Nói ra như thế nào

> "Sai số có dấu của bốn tháng gần như bằng không, nhưng đó là do lệch âm và lệch dương triệt tiêu nhau.

> Tính MAPE — sai số tuyệt đối chia cho thực tế — ra 10%, 16,7%, 11,1% và 9,1%, trung bình 11,7%.

> Mức đó đủ lớn để cần đổi phương pháp. Dữ liệu dao động quanh một mức ổn định nên em đề xuất trung bình trượt ba tháng; nếu sản phẩm có mùa thì phải thêm hệ số mùa vụ.

> Và em đề xuất báo MAPE kèm mọi dự báo, để bộ phận kho biết đặt đệm bao nhiêu."

## Bốn chỗ hay trượt

**Cộng sai số có dấu.** Âm dương triệt tiêu, tạo cảm giác chính xác giả.

**Chia cho dự báo thay vì thực tế.** MAPE chuẩn chia cho giá trị thực tế.

**Một phương pháp cho mọi sản phẩm.** Hàng mùa vụ và hàng ổn định cần cách khác nhau.

**Không báo sai số.** Người dùng dự báo không biết đặt đệm bao nhiêu.

## Trước khi sang phần bài tập

Phần dưới bắt bạn tính MAPE 11,7% và chọn phương pháp phù hợp. Bài tiếp theo xử lý một câu hỏi mà bản thân con số dự báo không trả lời được: nên đặt hàng nhiều hơn hay ít hơn mức dự báo.
`);

LRD("s-forecast-2", `
Một tiệm bánh phải quyết định đặt bao nhiêu hộp bánh trung thu. Dự báo trung bình: 5.000 hộp.

Câu hỏi tưởng đã có đáp án — đặt 5.000. Nhưng đặt đúng mức dự báo chỉ tối ưu khi **sai theo hai hướng tốn như nhau**, và ở đây thì không.

Thiếu một hộp: mất phần lãi 250.000 − 100.000 = **150.000đ**.
Thừa một hộp: mất phần chi phí không thu hồi được, 100.000 − 20.000 giá thanh lý = **80.000đ**.

Thiếu đắt gần gấp đôi thừa. Khi hai hướng sai không cân nhau, mức đặt tối ưu lệch về phía rẻ hơn — tức là **đặt nhiều hơn dự báo**.

## Tỷ lệ tới hạn

Công thức: **tỷ lệ tới hạn = chi phí thiếu ÷ (chi phí thiếu + chi phí thừa)**.

150.000 ÷ (150.000 + 80.000) = **65,2%**.

Cách đọc con số này: tiệm nên đặt ở mức sao cho xác suất nhu cầu **không vượt quá** số đã đặt là khoảng 65%. Nói cách khác, chấp nhận khoảng 35% khả năng thiếu hàng.

Nếu chi phí thiếu và thừa bằng nhau, tỷ lệ tới hạn là 50% — và khi đó đặt đúng mức dự báo trung bình là tối ưu. Mọi sự lệch khỏi 50% đều nói bạn nên đặt nhiều hơn hoặc ít hơn dự báo.

Ví dụ ngược lại: với hàng dễ hỏng và giá vốn cao — hải sản tươi chẳng hạn — chi phí thừa lớn hơn chi phí thiếu, tỷ lệ tới hạn dưới 50%, và nên đặt ít hơn dự báo.

## Chi phí thiếu thường bị tính thấp

Trong phép tính trên, chi phí thiếu chỉ gồm phần lãi mất đi của một hộp. Thực tế còn hai khoản nữa.

**Khách chuyển sang thương hiệu khác.** Một người không mua được bánh ở đây sẽ mua ở chỗ khác, và có thể quay lại đó năm sau.

**Thiệt hại hình ảnh.** Hết hàng vào đúng dịp cao điểm để lại ấn tượng về một cửa hàng không đáng tin.

Nếu tính cả hai, chi phí thiếu có thể là 200.000đ thay vì 150.000đ, và tỷ lệ tới hạn lên 200 ÷ 280 = 71% — đặt nhiều hơn nữa.

Ngược lại, chi phí thừa cũng có thể bị tính thấp nếu quên chi phí lưu kho và chi phí xử lý hàng tồn.

## Giảm chi phí ở hướng đắt hơn

Sau khi biết hướng nào đắt hơn, có một câu hỏi hay tiếp theo: **làm sao giảm chi phí của chính hướng đó?**

Với bánh trung thu, chi phí thiếu đắt hơn. Cách giảm: đặt hàng hai đợt thay vì một — đợt đầu 4.000 hộp, và nếu bán tốt trong tuần đầu thì đặt bổ sung. Điều kiện là nhà cung cấp phải giao được trong thời gian ngắn.

Còn nếu muốn giảm chi phí thừa: đàm phán quyền trả lại hàng không bán được, hoặc tìm kênh thanh lý tốt hơn giá 20.000đ.

Cả hai hướng đều **thay đổi chính bài toán** thay vì chỉ tối ưu trong ràng buộc cũ — và đó thường là khuyến nghị mạnh hơn.

## Một lưu ý về giới hạn

Công thức tỷ lệ tới hạn giả định bạn biết phân phối của nhu cầu, tức không chỉ biết mức trung bình mà còn biết nó dao động thế nào. Trong một bài case, thường bạn chỉ có mức trung bình.

Khi đó, cách dùng đúng là kết luận **hướng lệch** chứ không phải một con số chính xác: "chi phí thiếu gần gấp đôi chi phí thừa, nên nên đặt trên mức dự báo — cụ thể bao nhiêu thì cần biết mức dao động của nhu cầu các năm trước".

Câu đó trung thực hơn và vẫn hữu ích.

## Nói ra như thế nào

> "Đặt đúng dự báo chỉ tối ưu khi thiếu và thừa tốn như nhau. Ở đây thiếu một hộp mất 150.000đ lãi, thừa một hộp mất 80.000đ.

> Tỷ lệ tới hạn là 150 chia cho tổng 230, tức 65,2% — nghĩa là nên đặt trên mức 5.000 hộp.

> Chi phí thiếu thực tế còn cao hơn nếu tính cả việc khách chuyển sang thương hiệu khác, nên hướng lệch càng rõ.

> Em cũng đề xuất đổi bài toán: đặt hai đợt thay vì một, nếu nhà cung cấp giao bổ sung được trong một tuần. Khi đó rủi ro cả hai chiều đều giảm."

## Bốn chỗ hay trượt

**Đặt đúng mức dự báo trung bình.** Chỉ đúng khi chi phí hai hướng bằng nhau.

**Chi phí thừa tính bằng toàn bộ giá vốn.** Quên giá trị thanh lý.

**Chi phí thiếu chỉ tính phần lãi một đơn vị.** Bỏ qua việc mất khách cho lần sau.

**Áp cùng một mức cho mọi sản phẩm.** Mỗi sản phẩm có tỷ lệ tới hạn riêng.

## Trước khi sang phần bài tập

Phần dưới bắt bạn tính tỷ lệ tới hạn 65,2% và quyết định hướng đặt hàng. Module tiếp theo chuyển sang thứ nằm giữa dự báo và bán hàng: tồn kho, và số tiền đang nằm chết trong đó.
`);
