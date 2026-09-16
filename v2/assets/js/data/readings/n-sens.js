LRD("n-sens-1", `
Mô hình tài chính của dự án ra mắt sản phẩm mới cho ra NPV 20 tỷ. Ban đầu tư xem xong và hỏi: "Con số này có thể sai đến đâu?"

Câu trả lời "chúng em đã tính rất kỹ" không giúp gì. Mọi mô hình đều dựa trên giả định, và ban đầu tư biết điều đó — họ không hỏi mô hình có đúng không, họ hỏi **kết luận có bền không**.

Câu trả lời tốt chỉ vào một biến cụ thể: "Nếu giá bán giảm quá 3,3%, NPV về không. Đó là biến duy nhất trong ba biến chính có ngưỡng gần đến vậy."

## Độ nhạy: đổi một biến, giữ nguyên phần còn lại

Quy trình gồm ba bước và làm được trong mười phút.

**Bước một: ghi mức cơ sở và khoảng dao động hợp lý cho từng giả định.** "Hợp lý" nghĩa là bạn sẽ không ngạc nhiên nếu thực tế rơi vào bất kỳ đâu trong khoảng đó.

**Bước hai: đổi một biến về biên thấp và biên cao, giữ nguyên tất cả biến khác, tính lại kết quả.** Nguyên tắc **một biến một lần** là bắt buộc — đổi hai biến cùng lúc thì không biết con số nhảy vì cái nào.

**Bước ba: xếp các biến theo độ rộng của khoảng kết quả.** Biến tạo khoảng rộng nhất là biến quyết định.

Kết quả vẽ ra thành biểu đồ tornado: thanh dài nhất trên cùng, ngắn dần xuống dưới, tạo hình một cơn lốc.

## Ngưỡng đổi kết luận — con số đáng giá nhất

Độ nhạy cho biết biến nào quan trọng. Nhưng con số thực sự hữu ích cho quản trị là **ngưỡng làm kết luận đảo chiều**.

**Ngưỡng = NPV cơ sở ÷ mức thay đổi NPV cho mỗi 1% của biến đó.**

Số liệu của dự án: giá bán giảm 5% làm NPV từ 20 tỷ xuống −10 tỷ, tức giảm 30 tỷ. Vậy mỗi 1% giá tương đương 6 tỷ NPV.

Ngưỡng giá: 20 ÷ 6 ≈ **3,3%**. Giá giảm quá 3,3% là dự án mất giá trị.

Sản lượng giảm 5% làm NPV xuống 8 tỷ, tức giảm 12 tỷ — 2,4 tỷ cho mỗi 1%. Ngưỡng: 20 ÷ 2,4 ≈ **8,3%**.

Chi phí tăng 5% làm NPV xuống 12 tỷ, tức giảm 8 tỷ — 1,6 tỷ cho mỗi 1%. Ngưỡng: 20 ÷ 1,6 = **12,5%**.

Ba con số 3,3%, 8,3% và 12,5% nói rõ hơn nhiều so với việc chỉ nói biến nào nhạy nhất: chúng cho biết **dự án chịu được bao nhiêu sai ở mỗi biến**.

## Từ độ nhạy tới hành động

Đây là bước nâng một bảng số thành một khuyến nghị.

Biến có ngưỡng gần nhất — giá bán, 3,3% — là biến cần hai thứ: **kiểm chứng kỹ nhất trước khi quyết định**, và **cơ chế kiểm soát sau khi triển khai**.

Kiểm chứng: khảo sát mức sẵn lòng trả, thử giá ở một vài điểm bán, xem lịch sử giá của sản phẩm tương tự.

Kiểm soát: khoá giá với nhà phân phối bằng hợp đồng, hạn chế khuyến mãi giảm giá trong sáu tháng đầu, và theo dõi giá bán thực tế trên thị trường hằng tháng — vì giá niêm yết và giá bán thực tế thường khác nhau.

Ngược lại, chi phí với ngưỡng 12,5% không đáng tốn nhiều công kiểm chứng: nó phải sai rất nhiều mới ảnh hưởng tới kết luận.

## Hai giới hạn phải nói ra

**Giả định tuyến tính.** Cách tính ngưỡng ở trên giả định NPV thay đổi tỷ lệ thuận với biến trong khoảng đang xét. Với thay đổi nhỏ thì hợp lý; với thay đổi lớn thì không, vì các hiệu ứng có thể tương tác.

**Các biến không độc lập.** Giá và sản lượng thường liên quan: giảm giá 5% có thể làm sản lượng tăng, chứ không phải sản lượng giữ nguyên. Độ nhạy một biến bỏ qua mối quan hệ này.

Vì vậy sau khi chạy độ nhạy từng biến, nên chạy thêm hai đến ba **kịch bản kết hợp** hợp lý: kịch bản tốt, kịch bản cơ sở, kịch bản xấu — trong đó các biến di chuyển cùng nhau theo cách có logic.

## Nói ra như thế nào

> "Em chạy độ nhạy cho ba biến chính, mỗi lần đổi một biến và giữ nguyên các biến khác.

> Giá bán là biến nhạy nhất: mỗi 1% giá tương đương 6 tỷ NPV, nên ngưỡng đảo chiều là 3,3%. Sản lượng chịu được 8,3%, chi phí chịu được 12,5%.

> Nghĩa là dự án đứng vững nếu giá không giảm quá 3,3% — một khoảng rất hẹp.

> Em đề xuất hai việc: khoá giá với nhà phân phối bằng hợp đồng trong năm đầu, và theo dõi giá bán thực tế trên thị trường hằng tháng.

> Em cũng lưu ý giá và sản lượng không độc lập, nên em sẽ chạy thêm ba kịch bản kết hợp trước khi chốt."

## Bốn chỗ hay trượt

**Chỉ báo NPV cơ sở.** Không cho thấy kết luận bền đến đâu.

**Đổi nhiều biến cùng lúc.** Không biết biến nào gây ra thay đổi.

**Dùng mức thay đổi khác nhau cho các biến.** So không công bằng — dùng cùng một mức, ví dụ 5%, cho tất cả.

**Không có hành động theo dõi.** Biến nhạy nhất cần cơ chế kiểm soát, không chỉ cần biết tên.

## Trước khi sang phần bài tập

Phần dưới bắt bạn tính ngưỡng đảo chiều 3,3% và đề xuất cách kiểm soát. Đây là bài cuối của track Tài chính cho case: mười bài vừa qua đi từ mô hình doanh thu, cấu trúc chi phí, các loại biên, hoà vốn, tới ROI, NPV và độ nhạy — bộ công cụ để định lượng mọi khuyến nghị bạn đưa ra trong phần còn lại của lộ trình.
`);
