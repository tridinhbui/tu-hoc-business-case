/* Phần đào sâu cho module Pricing — giám khảo hỏi tiếp · cùng khung ở ngành khác · tự luyện.
   Mọi con số được tính lại trong tests/readings.test.js (mảng DEEP). */

LRDX("f-pricing-1", `
## Giám khảo hỏi tiếp

**"Ở 55.000đ, lỡ chỉ bán được 8.000 chai thì sao?"** Tính lại, đừng tranh luận. 8.000 × (55.000 − 18.000) = **296 triệu**. Giá theo chi phí 27.000đ với 10.000 chai chỉ cho 90 triệu. Ngay cả so với giá đối thủ 45.000đ bán đủ 10.000 chai — 270 triệu — mức 55.000đ vẫn hơn dù mất 20% sản lượng.

> "Kể cả mất 2.000 chai, 55.000đ vẫn cho 296 triệu lãi góp, hơn cả phương án đặt bằng giá đối thủ."

**"Chừa cho khách bao nhiêu là đủ?"** Ở 55.000đ, khách có mức sẵn lòng trả 60.000đ còn giữ **5.000đ** lợi ích. Khoảng chừa đó là lý do để họ mua ngay thay vì cân nhắc. Không có quy tắc cố định; khoảng chừa càng nhỏ, tỷ lệ mua càng phụ thuộc vào niềm tin thương hiệu.

**"Nếu khảo sát thổi phồng 20%?"** Mức sẵn lòng trả thật chỉ khoảng **48.000đ**. Khi đó 55.000đ đã vượt trần, và vùng hợp lý lùi về 45.000–48.000đ. Đây là lý do bài 4 của module này tồn tại.

## Cùng khung, ngành khác: phần mềm kế toán cho hộ kinh doanh

- **Sàn:** chi phí phục vụ mỗi khách — máy chủ, hỗ trợ — khoảng **20.000đ** mỗi tháng. Giá theo chi phí cộng 50%: 30.000đ.
- **Tham chiếu:** phần mềm đối thủ **150.000đ** mỗi tháng.
- **Trần:** phần mềm thay cho dịch vụ kế toán thuê ngoài tốn khoảng **400.000đ** mỗi tháng.

Khoảng cách giữa sàn và trần ở phần mềm lớn gấp nhiều lần nước ép: chi phí biên gần bằng không. Định giá theo chi phí ở đây không chỉ bỏ tiền lại trên bàn — nó làm sản phẩm trông rẻ tới mức đáng ngờ. Vùng hợp lý là **199.000–249.000đ**: trên đối thủ nhờ tính năng khác biệt, và còn cách xa mức tiền khách đang trả cho dịch vụ kế toán.

## Tự luyện ba phút

Bánh trung thu cao cấp: chi phí 90.000đ mỗi hộp, đối thủ bán 250.000đ, khảo sát khách sẵn lòng trả 350.000đ, dự kiến 5.000 hộp. Kế toán đề xuất cộng 40% trên chi phí.

Giá theo chi phí là bao nhiêu? Nếu chọn 290.000đ, lãi góp thêm bao nhiêu so với giá theo chi phí?

*Đáp án:* giá theo chi phí **126.000đ**. Chênh lệch 164.000đ mỗi hộp × 5.000 hộp = **820 triệu**.
`);

LRDX("f-pricing-2", `
## Giám khảo hỏi tiếp

**"Còn chiều ngược lại — tăng giá 10%?"** Giá 5.500đ, lãi góp mỗi gói 2.500đ. Giữ 20 tỷ lãi góp chỉ cần 20 tỷ ÷ 2.500 = **8 triệu gói**. Được phép mất tới **20%** sản lượng. Giảm giá 10% cần tăng 33,3% sản lượng; tăng giá 10% chịu được mất 20%. Hai hướng không đối xứng — và sự bất đối xứng đó nghiêng về phía tăng giá.

> "Cùng 10%, giảm giá cần thêm một phần ba sản lượng mới hoà, còn tăng giá chịu được mất một phần năm. Em muốn thử hướng tăng giá ở dòng cao cấp trước."

**"Nếu dự báo +15% đúng, lãi góp mất bao nhiêu?"** 11,5 triệu gói × 1.500đ = **17,25 tỷ**. Mất 2,75 tỷ mỗi tháng.

**"Đối thủ sẽ phản ứng thế nào?"** Nếu họ giảm theo, phần sản lượng tăng thêm biến mất mà giá thấp thì ở lại. Dự báo +15% thường ngầm giả định đối thủ đứng yên.

## Cùng khung, ngành khác: vé máy bay giá rẻ

Một chuyến bay 180 ghế, bán **126 ghế** (tỷ lệ lấp đầy 70%) ở giá trung bình **1,2 triệu**. Chi phí biến đổi mỗi khách — suất ăn, phí phục vụ — chỉ **150.000đ**. Lãi góp mỗi khách 1,05 triệu, cả chuyến **132,3 triệu**.

Giảm giá 20% xuống 960.000đ, lãi góp mỗi khách còn 810.000đ. Cần 132,3 triệu ÷ 810.000 ≈ **164 khách** để hoà, tức lấp đầy khoảng **91%**.

Khác mì gói ở hai điểm. Biên đóng góp của hàng không rất cao nên ngưỡng tăng sản lượng thấp hơn — khoảng 30% so với 33%. Nhưng có **trần công suất**: không thể bán quá 180 ghế. Giảm giá chỉ có nghĩa khi còn ghế trống, và vì vậy hãng bay giảm giá theo **từng chuyến và từng ngày bay** chứ không giảm đồng loạt.

## Tự luyện ba phút

Quán cà phê bán 500 ly mỗi ngày, giá 30.000đ, chi phí 10.000đ. Chủ quán muốn giảm 20%.

Cần bán bao nhiêu ly để giữ nguyên lãi góp? Tương đương tăng bao nhiêu phần trăm?

*Đáp án:* lãi góp mới 14.000đ. Cần 10 triệu ÷ 14.000 ≈ **714 ly**, tăng khoảng **42,9%**.
`);

LRDX("f-pricing-3", `
## Giám khảo hỏi tiếp

**"Nếu 100 khách cao cấp lùi xuống vé thường?"** 800 × 90.000 + 200 × 150.000 = **102 triệu**. Vẫn hơn một giá 12 triệu. Phân tầng chịu được hàng rào hơi yếu — nhưng nếu một nửa khách cao cấp lùi xuống, lợi ích chỉ còn khoảng một nửa.

**"Sao không đặt VIP 160.000đ cho sát trần?"** Trên giấy: 700 × 90.000 + 300 × 160.000 = **111 triệu**. Nhưng ở giá đó khách cao cấp không còn chút lợi ích nào, và chỉ cần một phần nhỏ trong họ lùi về vé thường là mất hết 3 triệu chênh lệch.

> "Giá 160.000đ cho thêm 3 triệu trên giấy, nhưng không chừa lợi ích nào. Chỉ cần khoảng 43 khách VIP lùi xuống vé thường là mất khoản đó."

**"Thêm tầng thứ ba có đáng không?"** Nếu trong 700 khách thường có 150 người sẵn lòng trả 115.000đ cho ghế giữa phòng, thêm hạng ghế 110.000đ: 550 × 90.000 + 150 × 110.000 + 300 × 150.000 = **111 triệu**. Thêm 3 triệu, đổi lại một bảng giá phức tạp hơn. Tầng thứ ba chỉ đáng khi nhóm giữa đủ lớn và hàng rào đủ rõ.

## Cùng khung, ngành khác: vé máy bay có hạng linh hoạt

Một chuyến bay có 150 khách. 120 người chỉ trả tối đa **1 triệu**; 30 người là khách công tác, sẵn lòng trả tới **2 triệu** để được đổi ngày bay miễn phí.

- Một giá 1 triệu: **150 triệu**.
- Phân tầng — vé tiết kiệm 1 triệu, vé linh hoạt 1,8 triệu: 120 + 54 = **174 triệu**, tăng 16%.

Hàng rào ở đây không phải ghế hay bắp nước, mà là **điều kiện vé**: vé rẻ không được đổi ngày. Khách du lịch đặt sớm chấp nhận điều kiện đó dễ dàng; khách công tác thì không thể. Hàng rào tốt nhất là thứ mà nhóm trả thấp không cần còn nhóm trả cao không thể thiếu.

## Tự luyện ba phút

Phòng gym có 500 hội viên. 400 người trả tối đa 500.000đ mỗi tháng, 100 người trả tới 900.000đ để có lớp tập nhóm và phòng xông hơi.

So một giá 500.000đ, một giá 900.000đ và phân tầng 500.000đ / 800.000đ.

*Đáp án:* **250 triệu**, **90 triệu**, và 200 + 80 = **280 triệu** — hơn phương án một giá tốt nhất 12%.
`);

LRDX("f-pricing-4", `
## Giám khảo hỏi tiếp

**"Nếu tin khảo sát, lãi góp tăng bao nhiêu?"** 95% nói vẫn mua. Nếu coi đó là tỷ lệ sản lượng giữ lại: 380 chai × 37.000đ = **14,06 triệu**, tăng 1,66 triệu mỗi tuần. Thử nghiệm thật cho tăng 0,18 triệu. Khảo sát **phóng đại lợi ích khoảng 9 lần**.

> "Khảo sát nói tăng giá lãi thêm 1,66 triệu mỗi tuần. Bán thật chỉ lãi thêm 0,18 triệu. Nếu dùng khảo sát, mình sẽ tự tin quá mức gấp chín lần."

**"5 chai vượt ngưỡng có thật không, hay là nhiễu?"** Hỏi dao động tự nhiên giữa các tuần. Nếu sản lượng tuần của 5 cửa hàng thường lên xuống khoảng **8%**, tức khoảng 32 chai, thì khoảng vượt 5 chai nằm gọn trong nhiễu. Chưa thể kết luận giá mới tốt hơn — chỉ có thể nói "không tệ hơn rõ rệt".

**"Mở rộng thử nghiệm thế nào?"** Nhiều cửa hàng hơn, dài hơn, và **đảo nhóm**: nửa sau thời gian thử, đổi nhóm giá cũ sang giá mới và ngược lại, để loại khác biệt giữa hai nhóm cửa hàng.

## Cùng khung, ngành khác: phần mềm thử hai mức giá trên trang đăng ký

Công ty phần mềm chia 4.000 người truy cập trang đăng ký thành hai nhóm bằng nhau. Nhóm A thấy **199.000đ** mỗi tháng, nhóm B thấy **249.000đ**. Chi phí phục vụ mỗi khách **30.000đ**.

- Nhóm A: 5% đăng ký → 100 khách × 169.000đ = **16,9 triệu** lãi góp mỗi tháng.
- Nhóm B: 4% đăng ký → 80 khách × 219.000đ = **17,52 triệu**.

Doanh thu gần như bằng nhau — 19,9 và 19,92 triệu. Lãi góp nghiêng về giá cao. Nhưng ở phần mềm còn một biến thử nghiệm bốn tuần không đo được: **tỷ lệ huỷ**. Khách trả giá cao có thể huỷ nhanh hơn, hoặc chậm hơn vì cam kết hơn. Thử nghiệm giá phần mềm cần theo dõi thêm vài tháng sau khi khách đăng ký.

## Tự luyện ba phút

Tiệm bánh bao tăng giá từ 15.000đ lên 18.000đ, chi phí 7.000đ. Thử nghiệm: giá cũ bán 1.000 cái mỗi tuần, giá mới bán 780 cái.

Lãi góp thay đổi thế nào? Ngưỡng hoà vốn là bao nhiêu cái?

*Đáp án:* từ **8 triệu** lên **8,58 triệu**. Ngưỡng 8 triệu ÷ 11.000 ≈ **727 cái**. Vượt ngưỡng 53 cái — rộng hơn nhiều so với 5 chai của nước ép Xanh.
`);

LRDX("f-pricing-5", `
## Giám khảo hỏi tiếp

**"Lỡ chai 400ml bán chạy hơn dự kiến, 20% chứ không phải 5%?"** Giả sử cơ cấu thành 40% chai nhỏ, 20% chai 400ml, 40% chai lớn: 400 × 25.000 + 200 × 40.000 + 400 × 41.000 = **34,4 triệu**. Vẫn hơn 29,8 triệu ban đầu. Mồi nhử "thất bại" theo nghĩa bán được hàng vẫn có lãi, vì lãi góp chai 400ml gần bằng chai lớn.

**"Nếu lãi góp chai 400ml thấp thì sao?"** Đó mới là rủi ro thật. Mồi nhử phải có lãi góp **không thấp hơn nhiều** so với lựa chọn mục tiêu; nếu không, khi khách thật sự chọn nó, doanh nghiệp mất tiền.

> "Chai 400ml lãi 40.000đ, gần bằng chai lớn 41.000đ. Nên dù khách có chọn nó nhiều hơn dự kiến, lãi góp vẫn tăng."

**"Kiểm chứng hiệu ứng thế nào?"** Không so trước và sau ở cùng cửa hàng — mùa và thời tiết thay đổi. Thêm chai 400ml ở một nhóm cửa hàng, giữ nguyên ở nhóm tương đương, đo cơ cấu trong cùng bốn tuần.

## Cùng khung, ngành khác: gói cước di động

Nhà mạng có hai gói: **70.000đ** (4GB) được 60% thuê bao chọn, **120.000đ** (15GB) được 40% chọn. Doanh thu trung bình mỗi thuê bao: **90.000đ**.

Thêm gói mồi **110.000đ** cho 8GB — đắt gần bằng gói lớn nhưng dung lượng chưa bằng một nửa. Cơ cấu mới: 45% gói nhỏ, 5% gói mồi, 50% gói lớn. Doanh thu trung bình: **97.000đ**, tăng 7.000đ, khoảng **7,8%**.

Với 1 triệu thuê bao, mỗi tháng thêm **7 tỷ**. Ở viễn thông, chi phí biến đổi mỗi GB rất thấp nên doanh thu tăng thêm gần như toàn bộ là lãi góp — hiệu ứng mồi nhử đáng giá hơn nhiều so với đồ uống.

## Tự luyện ba phút

Bắp rang ở rạp phim: cỡ nhỏ 45.000đ (chi phí 10.000đ) được 65% chọn, cỡ lớn 75.000đ (chi phí 18.000đ) được 35% chọn. Thêm cỡ vừa 70.000đ (chi phí 15.000đ). Cơ cấu mới: nhỏ 40%, vừa 10%, lớn 50%.

Lãi góp trung bình mỗi phần thay đổi bao nhiêu?

*Đáp án:* trước **42.700đ**, sau **48.000đ**, tăng **5.300đ** mỗi phần.
`);

LRDX("f-pricing-6", `
## Giám khảo hỏi tiếp

**"Tăng dần hai lần 2.500đ thì lần đầu được mất bao nhiêu?"** Giá 51.500đ, lãi góp 33.500đ. Ngưỡng = 1 − 31.000 ÷ 33.500 ≈ **7,5%**. Mỗi bước nhỏ có ngưỡng nhỏ hơn — nhưng cũng làm khách ít phản ứng hơn nhiều. Tăng dần là đánh đổi một ngưỡng hẹp lấy một phản ứng nhẹ.

**"Nếu chi phí trái cây tiếp tục tăng lên 21.000đ mỗi chai?"** Lãi góp cũ ở 49.000đ còn 28.000đ, mới ở 54.000đ là 33.000đ. Ngưỡng = 1 − 28.000 ÷ 33.000 ≈ **15,2%**. Chi phí càng tăng, biên càng mỏng, tăng giá càng chịu được mất nhiều khách hơn.

> "Nếu chi phí lên 21.000đ, ngưỡng mất khách cho phép tăng từ 13,9% lên khoảng 15,2%. Không tăng giá lúc đó là tự chịu cú sốc chi phí."

**"Chỉ tăng ở kênh văn phòng được bao nhiêu?"** Nếu kênh văn phòng chiếm 30% sản lượng — 6.000 chai — và không mất khách, lãi góp tăng 6.000 × 5.000đ = **30 triệu** mỗi tháng. Ít hơn tăng toàn bộ, nhưng gần như không rủi ro.

## Cùng khung, ngành khác: gói internet cáp quang

Nhà mạng tăng giá gói cáp quang gia đình từ **220.000đ lên 250.000đ**. Chi phí biến đổi mỗi thuê bao — băng thông, chăm sóc khách hàng — **60.000đ**.

Lãi góp từ 160.000đ lên 190.000đ. Ngưỡng = 1 − 160 ÷ 190 ≈ **15,8%**. Với 100.000 thuê bao, được mất tối đa khoảng **15.790** thuê bao.

Khác nước ép ở chỗ nào? Internet có **chi phí chuyển đổi** cao — khách phải gọi lắp đặt lại, đổi modem, chờ kỹ thuật viên. Tỷ lệ khách rời đi khi tăng giá thường thấp hơn nhiều so với ngưỡng. Đó là lý do nhà mạng tăng giá khi hết khuyến mãi mà ít khi mất khách hàng loạt. Trong case, luôn hỏi: **khách rời đi có tốn gì không?**

## Tự luyện ba phút

Quán phở tăng giá từ 50.000đ lên 55.000đ, chi phí nguyên liệu 30.000đ mỗi tô, bán 400 tô mỗi ngày.

Được phép mất tối đa bao nhiêu phần trăm và bao nhiêu tô?

*Đáp án:* lãi góp từ 20.000đ lên 25.000đ. Ngưỡng **20%**, tức **80 tô** mỗi ngày.
`);

LRDX("f-pricing-7", `
## Giám khảo hỏi tiếp

**"Tỷ lệ khách mới tối thiểu để hoà vốn?"** Gọi x là tỷ lệ khách mới. Lãi góp ròng = 3.000 × [44.000x − 18.000(1 − x)] − 15 triệu = 0. Giải ra x ≈ **37,1%**. Thực tế 40%. Nói con số này ra cho thấy chương trình đang đứng sát mép.

**"Gửi mã riêng cho khách mới thì kết quả thế nào?"** Giả sử chỉ bán được 1.500 bộ, nhưng 80% là khách mới, và chi phí in ấn giảm còn 5 triệu vì không cần trưng bày. Tăng thêm: 1.200 × 44.000đ = 52,8 triệu. Ăn mòn: 300 × (−18.000đ) = −5,4 triệu. Trừ 5 triệu: **42,4 triệu**. Bán ít hơn một nửa mà lãi gấp gần tám lần.

> "Nếu nhắm đúng khách mới, bán một nửa số bộ nhưng lãi khoảng 42 triệu thay vì 5,4 triệu."

**"Khách mới có quay lại không?"** Đây là phần lợi ích báo cáo tháng không thấy. Nếu 25% trong 1.200 khách mới — 300 người — quay lại mua mỗi tháng một chai giá đủ trong sáu tháng: 300 × 31.000đ × 6 = **55,8 triệu**. Chỉ đưa vào khi có dữ liệu thật về tỷ lệ quay lại.

## Cùng khung, ngành khác: voucher trên sàn thương mại điện tử

Sàn phát voucher giảm 50.000đ cho đơn từ 300.000đ. Có 10.000 đơn dùng voucher. Phân tích lịch sử mua cho thấy **70%** khách vốn vẫn sẽ đặt đơn đó. Lãi góp của sàn trên mỗi đơn 300.000đ là **60.000đ**.

- Ăn mòn: 7.000 đơn × (−50.000đ) = **−350 triệu**.
- Tăng thêm: 3.000 đơn × (60.000 − 50.000)đ = **+30 triệu**.
- Ròng: **−320 triệu**.

Khác nước ép ở chỗ: sàn thương mại điện tử có **dữ liệu lịch sử mua của từng khách**, nên ước tỷ lệ ăn mòn chính xác hơn nhiều so với khảo sát tại quầy — và có thể phát voucher chỉ cho khách không mua trong 90 ngày. Không dùng dữ liệu đó là lãng phí lợi thế lớn nhất của kênh online.

## Tự luyện ba phút

Combo bánh và nước 45.000đ, giá lẻ cộng lại 55.000đ, chi phí 20.000đ. Bán 1.000 combo, 50% khách vốn định mua lẻ. Chi phí chương trình 3 triệu.

*Đáp án:* lãi góp combo 25.000đ, mua lẻ 35.000đ. Tăng thêm 500 × 25.000đ = 12,5 triệu. Ăn mòn 500 × (−10.000đ) = −5 triệu. Ròng **4,5 triệu**.
`);

LRDX("f-pricing-8", `
## Giám khảo hỏi tiếp

**"Mức dùng nào thì gói bắt đầu lỗ so với bán lẻ?"** Gói lãi bằng bán lẻ khi 800.000 − 18.000u = 31.000u, tức u = 800 ÷ 49 ≈ **16,3 chai**. Trung bình 16 chai — sát ngưỡng. Câu hỏi đúng tiếp theo là **phân phối** mức dùng, không phải trung bình.

**"Nếu 30% văn phòng dùng đủ 20 chai, 70% còn lại dùng 14?"** Trung bình vẫn khoảng 15,8. Lãi góp với gói: 30% × 440.000 + 70% × (800.000 − 14 × 18.000) = 132.000 + 383.600 = **515.600đ**. Với bán lẻ: 30% × 620.000 + 70% × 434.000 = **489.800đ**. Gói vẫn hơn khoảng **25.800đ** mỗi văn phòng.

> "Kể cả khi 30% văn phòng dùng hết gói, lãi góp trung bình với gói vẫn hơn bán lẻ khoảng 26.000đ, vì nhóm dùng 14 chai bù lại."

**"Làm sao biết văn phòng nào sẽ dùng hết?"** Lịch sử đặt lẻ của chính họ. Văn phòng đặt trên 18 chai mỗi tháng trong ba tháng qua nên được mời gói lớn hơn hoặc giá theo bậc, không phải gói 20 chai.

## Cùng khung, ngành khác: phòng gym

Phòng gym bán gói tháng **600.000đ** tập không giới hạn, hoặc vé lẻ **60.000đ** mỗi buổi. Chi phí biến đổi mỗi buổi — khăn, nước, điện — **15.000đ**. Hội viên gói tháng trung bình chỉ đến **6 buổi**.

Lãi góp mỗi hội viên gói: 600.000 − 6 × 15.000 = **510.000đ**. Nếu cùng người đó mua vé lẻ 6 buổi: 6 × 45.000 = **270.000đ**.

Gym là ví dụ cực đoan của nguồn lãi "không dùng hết": người mua gói **kỳ vọng** đến 12 buổi, nên thấy gói rẻ; thực tế đến 6. Khác nước ép Xanh — nơi khách là văn phòng tính toán kỹ — ở gym, chênh lệch giữa dự định và hành vi là toàn bộ mô hình kinh doanh.

## Tự luyện ba phút

Gói giặt ủi 30kg giá 900.000đ mỗi tháng (30.000đ mỗi kg), giá lẻ 40.000đ mỗi kg, chi phí 12.000đ mỗi kg. Khách trung bình dùng 22kg.

So lãi góp gói và lẻ. Mức dùng hoà vốn là bao nhiêu?

*Đáp án:* lẻ 22 × 28.000 = **616.000đ**. Gói 900.000 − 22 × 12.000 = **636.000đ**, hơn 20.000đ. Hoà vốn khi 900.000 − 12.000u = 28.000u, tức **22,5kg** — lại sát ngưỡng.
`);

LRDX("f-pricing-9", `
## Giám khảo hỏi tiếp

**"Nếu đã theo giá và đối thủ giảm tiếp 3.000đ?"** Theo lần hai xuống 40.000đ, lãi góp mỗi chai còn 22.000đ, tổng **440 triệu** — mất 180 triệu so với ban đầu. Mỗi lần theo giá là một khoản mất chắc chắn, và nó mời lần giảm tiếp theo.

> "Nếu mình theo và họ giảm tiếp, lãi góp xuống 440 triệu. Đó là lý do em không muốn bắt đầu vòng này."

**"Kết hợp gói văn phòng thì sao?"** Giả sử kênh văn phòng chiếm 30% sản lượng — 6.000 chai — được giá gói 43.000đ để giữ chân. 70% còn lại giữ giá 49.000đ và mất 8% khách. Văn phòng: 6.000 × 25.000đ = 150 triệu. Bán lẻ: 14.000 × 92% × 31.000đ = 399,28 triệu. Tổng **549,28 triệu** — hơn theo giá toàn bộ 49 triệu, và hơn giữ giá mất 15% khoảng 22 triệu.

**"Khi nào thì nên theo?"** Khi sản phẩm gần như không khác biệt, khi đối thủ có lợi thế chi phí thật và giữ được giá thấp lâu, hoặc khi mất khách vượt ngưỡng 19,4% đã rõ trong dữ liệu vài tuần đầu.

## Cùng khung, ngành khác: nhà xe khách liên tỉnh

Nhà xe bán vé **250.000đ**, chi phí biến đổi mỗi khách — nhiên liệu phân bổ, nước, phí bến — **50.000đ**, 10.000 khách mỗi tháng. Đối thủ mới giảm giá xuống **200.000đ**. Theo giá xuống 220.000đ để giữ khoảng cách nhỏ.

Lãi góp mỗi khách: giữ giá 200.000đ, theo giá 170.000đ. Ngưỡng = 1 − 170 ÷ 200 = **15%**.

Khác nước ép ở chỗ nhà xe có **ghế trống**: chuyến xe chạy dù có đủ khách hay không. Nếu các chuyến đang chỉ đầy 60%, khách mất đi làm ghế trống thêm; nếu chuyến đầy 100% vào dịp lễ, khách mất đi được khách khác thay thế. Theo giá vào mùa thấp điểm, giữ giá vào mùa cao điểm có thể là câu trả lời tốt hơn cả hai phương án cố định.

## Tự luyện ba phút

Sản phẩm giá 100.000đ, chi phí 60.000đ. Đối thủ giảm giá; phương án theo giá là giảm 10.000đ.

Giữ giá được phép mất tối đa bao nhiêu phần trăm khách?

*Đáp án:* lãi góp giữ giá 40.000đ, theo giá 30.000đ. Ngưỡng **25%**.
`);
