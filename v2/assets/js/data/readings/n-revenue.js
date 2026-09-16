LRD("n-revenue-1", `
Slide dự báo của đội ghi: "Doanh thu năm tới khoảng 400 tỷ, tăng 15% theo mức tăng trưởng của ngành."

Ban giám khảo hỏi một câu: "Vì sao doanh thu của công ty này tăng đúng bằng mức của ngành?"

Không có câu trả lời, vì "tăng theo ngành" không phải một lý do — nó là một sự trùng hợp được giả định. Ngành tăng 15% không có nghĩa từng công ty trong ngành đều tăng 15%; có công ty tăng 40%, có công ty giảm.

Doanh thu của một công ty cụ thể tăng vì những lý do rất cụ thể: mở thêm điểm bán, đón thêm khách mỗi ngày, hoặc bán được giá cao hơn. Viết doanh thu thành một phép nhân các driver đó biến một con số đoán thành một mô hình có thể kiểm tra và phản biện.

## Doanh thu là một phép nhân

Với một chuỗi bán lẻ hoặc F&B:

**Doanh thu = số điểm bán × số ngày mở cửa × lượt khách mỗi ngày × giá trị hoá đơn.**

Bốn thừa số, và điều quan trọng là **mỗi thừa số đều là một con số vận hành có thể kiểm chứng**. Số cửa hàng thì đếm được. Lượt khách mỗi ngày thì máy tính tiền ghi lại. Hoá đơn trung bình thì có trong hệ thống.

Với các mô hình khác, công thức đổi nhưng nguyên tắc giữ nguyên:

**Thuê bao:** số khách × giá mỗi tháng × số tháng.
**Sản xuất:** sản lượng × giá bán.
**Dịch vụ tính giờ:** số người × giờ tính được tiền × giá mỗi giờ.
**Sàn giao dịch:** tổng giá trị giao dịch × take rate.

Chọn đúng công thức cho đúng mô hình là bước đầu tiên, và nó quyết định phần còn lại của phân tích.

## Tính cho chuỗi cà phê

Số liệu: 50 cửa hàng, mở 360 ngày một năm, trung bình 400 lượt khách mỗi cửa hàng mỗi ngày, hoá đơn trung bình 55.000đ.

50 × 360 × 400 = 7,2 triệu lượt khách một năm.
7,2 triệu × 55.000đ = **396 tỷ đồng**.

Gần với con số "khoảng 400 tỷ" mà đội đưa ra ban đầu. Nhưng bây giờ mỗi phần của con số đều giải thích được, và quan trọng hơn, mỗi phần đều **phản biện được**.

Ban giám khảo có thể hỏi: "400 lượt mỗi ngày có cao không?" Câu hỏi đó cụ thể và trả lời được — so với năm ngoái, so với đối thủ, so với số liệu của các cửa hàng hiện có. Trong khi câu "15% có cao không?" thì không ai trả lời được.

Chú ý con số 360 ngày: không phải 365. Cửa hàng nghỉ Tết, sửa chữa, hoặc mới khai trương giữa năm. Dùng 365 là một sai số nhỏ nhưng nó cho thấy bạn chưa nghĩ tới vận hành thật.

## Kiểm tra từng driver

Sau khi có công thức, mỗi driver phải được đối chiếu với một nguồn:

**Số cửa hàng** — từ kế hoạch mở rộng đã duyệt, không phải mong muốn.

**Lượt khách mỗi ngày** — từ dữ liệu lịch sử. Nếu năm ngoái là 380 và năm nay giả định 400, phải có lý do: cửa hàng mới ở vị trí tốt hơn, hay chương trình khách hàng thân thiết.

**Hoá đơn trung bình** — từ hệ thống bán hàng, và nên kiểm tra xu hướng: nó đang tăng hay giảm.

Driver nào lệch xa lịch sử là driver cần bảo vệ, và cũng là driver ban giám khảo sẽ nhắm vào.

## Làm kịch bản bằng driver, không bằng tổng

Một lợi ích nữa của mô hình driver: khi làm kịch bản, bạn đổi **một driver** chứ không đổi con số tổng.

"Kịch bản thận trọng: doanh thu 350 tỷ" là một con số từ trên trời rơi xuống.

"Kịch bản thận trọng: lượt khách mỗi ngày chỉ đạt 360 thay vì 400, doanh thu thành 356 tỷ" là một kịch bản có nội dung — và nó nói luôn phải theo dõi cái gì để biết mình đang ở kịch bản nào.

## Nói ra như thế nào

> "Em không dự báo bằng mức tăng của ngành mà viết doanh thu thành phép nhân các driver.

> Với chuỗi cà phê: 50 cửa hàng, 360 ngày mở cửa, 400 lượt khách mỗi cửa hàng mỗi ngày, hoá đơn 55.000đ — ra 396 tỷ.

> Mỗi driver đều đối chiếu được: số cửa hàng từ kế hoạch mở rộng, lượt khách và hoá đơn từ dữ liệu bán hàng năm ngoái.

> Driver nhạy nhất là lượt khách mỗi ngày. Nếu chỉ đạt 360 thay vì 400, doanh thu xuống 356 tỷ — nên em đề xuất theo dõi chỉ số này hằng tháng thay vì chờ tổng kết năm."

## Bốn chỗ hay trượt

**Dự báo bằng tăng trưởng ngành.** Không giải thích được doanh thu của chính công ty.

**Driver không đo được.** "Sức hút thương hiệu" không nhân được vào công thức.

**Quên số ngày hoạt động thật.** Nghỉ lễ và sửa chữa làm số ngày dưới 365.

**Làm kịch bản bằng cách đổi con số tổng.** Đổi từng driver mới cho biết phải theo dõi gì.

## Trước khi sang phần bài tập

Phần dưới bắt bạn viết công thức driver và tính 396 tỷ. Bài tiếp theo hỏi một câu khác về doanh thu: cùng một con số, vì sao doanh thu của công ty này đáng giá hơn công ty kia.
`);

LRD("n-revenue-2", `
Hai công ty phần mềm, cùng doanh thu 100 tỷ một năm, cùng biên lợi nhuận, cùng số nhân viên. Một quỹ đầu tư định giá công ty A cao hơn công ty B gần gấp đôi.

Lý do nằm ở một dòng mà báo cáo doanh thu không hiện: **doanh thu đó có lặp lại năm sau không?**

Công ty A: 80% doanh thu từ phí thuê bao hằng năm. Công ty B: 80% từ dự án triển khai một lần.

Bước sang năm mới, công ty A đã có sẵn phần lớn doanh thu trong tay. Công ty B bắt đầu gần như từ số không và phải bán lại toàn bộ.

## Doanh thu định kỳ và doanh thu một lần

**Định kỳ** là doanh thu tự lặp lại nếu khách không rời đi: thuê bao phần mềm, hợp đồng bảo trì, phí quản lý hằng tháng, hợp đồng thuê nhiều năm.

**Một lần** là doanh thu phải kiếm lại từ đầu mỗi kỳ: dự án triển khai, bán thiết bị, phí tư vấn theo vụ việc, xây dựng công trình.

Ranh giới không phải lúc nào cũng rõ, và đây là chỗ hay bị nhập nhằng trong các bản trình bày: phí triển khai ban đầu của một hợp đồng phần mềm là **một lần**, dù nó nằm trong cùng hợp đồng với phần thuê bao. Gộp nó vào doanh thu định kỳ làm con số định kỳ phồng lên và làm chỉ số tăng trưởng định kỳ trông đẹp hơn thực tế.

## Doanh thu định kỳ chưa đủ — phải kèm tỷ lệ giữ chân

"Chúng tôi có 80 tỷ doanh thu định kỳ" vẫn chưa nói được gì cho tới khi biết bao nhiêu phần trong đó sống sót qua năm sau.

**Doanh thu có sẵn năm sau = doanh thu định kỳ × tỷ lệ giữ chân.**

Công ty A: 80 tỷ × 90% = **72 tỷ** đã có trước khi bán thêm bất cứ thứ gì.
Công ty B: 20 tỷ × 90% = **18 tỷ**.

Chênh lệch 54 tỷ. Để đứng yên ở mức 100 tỷ, công ty A cần bán thêm 28 tỷ, còn công ty B cần bán thêm **82 tỷ** — gấp ba lần.

Điều đó kéo theo một hệ quả về chi phí mà bảng doanh thu không hiện: công ty B cần một đội bán hàng lớn hơn nhiều, và chi phí bán hàng của họ sẽ cao hơn ở cùng mức doanh thu.

Một doanh thu "định kỳ" với tỷ lệ giữ chân 60% thì chỉ hơn doanh thu một lần một chút, và nó không xứng đáng với hệ số định giá cao.

## Vì sao nhà đầu tư trả nhiều hơn cho doanh thu định kỳ

Ba lý do, theo thứ tự quan trọng.

**Dự đoán được.** Doanh thu năm sau đã biết phần lớn, nên rủi ro thấp hơn và dòng tiền dễ lập kế hoạch hơn.

**Chi phí duy trì thấp hơn chi phí giành mới.** Giữ một khách đang dùng rẻ hơn nhiều so với tìm khách mới — đúng như quan hệ LTV và CAC ở track nền tảng.

**Tăng trưởng cộng dồn.** Với doanh thu định kỳ, mỗi khách mới cộng vào nền của năm sau. Với doanh thu một lần, mỗi khách mới chỉ tính cho năm nay.

Chính điểm thứ ba làm hai mô hình tách nhau theo thời gian: sau năm năm, công ty A với cùng tốc độ bán mới sẽ có nền doanh thu lớn hơn hẳn.

## Cách trình bày trong case

Đừng so hai công ty bằng tổng doanh thu. Hãy dựng một bảng hai dòng cho mỗi công ty: **phần có sẵn** và **phần phải bán mới**.

Bảng đó nói ngay điều mà nhà đầu tư quan tâm, và nó cũng dẫn thẳng tới khuyến nghị: công ty B nên chuyển dần mô hình sang hợp đồng bảo trì hoặc thuê bao, ngay cả khi phải giảm giá dự án triển khai để đổi lấy hợp đồng nhiều năm.

## Nói ra như thế nào

> "Hai công ty cùng 100 tỷ doanh thu nhưng chất lượng doanh thu khác hẳn.

> Công ty A có 80% định kỳ; với tỷ lệ giữ chân 90%, họ bước vào năm mới với 72 tỷ đã có sẵn và chỉ cần bán thêm 28 tỷ để đứng yên.

> Công ty B có 20% định kỳ, tức 18 tỷ có sẵn, và phải bán lại 82 tỷ mỗi năm — gấp ba lần, nghĩa là chi phí bán hàng cũng cao hơn nhiều.

> Nên A xứng đáng hệ số định giá cao hơn. Với B, em đề xuất chuyển dần sang hợp đồng bảo trì nhiều năm, chấp nhận giảm giá phần triển khai để đổi lấy phần định kỳ."

## Bốn chỗ hay trượt

**So doanh thu tổng.** Che giấu hoàn toàn chất lượng doanh thu.

**Nói doanh thu định kỳ mà không kèm tỷ lệ giữ chân.** Định kỳ rời bỏ nhanh thì không đáng giá cao.

**Gộp phí triển khai vào định kỳ.** Làm con số định kỳ phồng lên.

**Bỏ qua chi phí bán mới.** Doanh thu một lần tốn chi phí bán hàng mỗi năm.

## Trước khi sang phần bài tập

Phần dưới bắt bạn tính doanh thu có sẵn 72 tỷ và giải thích tác động lên định giá. Module tiếp theo chuyển sang phía bên kia của báo cáo: chi phí, và những khoản không hoàn toàn cố định cũng không hoàn toàn biến đổi.
`);
