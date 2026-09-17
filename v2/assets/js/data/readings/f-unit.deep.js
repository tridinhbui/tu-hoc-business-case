/* Phần đào sâu cho module Unit economics — giám khảo hỏi tiếp · cùng khung ở ngành khác · tự luyện.
   Mọi con số được tính lại trong tests/readings.test.js (mảng DEEP). */

LRDX("f-unit-1", `
## Giám khảo hỏi tiếp

**"Nếu bỏ hẳn khuyến mãi thì mỗi đơn lãi bao nhiêu?"** 9.000 + 8.000 = **17.000đ**. Khuyến mãi đang ăn gần một nửa lãi góp tiềm năng. Câu hỏi tiếp theo tự nhiên: bỏ khuyến mãi thì mất bao nhiêu đơn — bài 9 của module sẽ quay lại đúng câu này.

**"Nếu giá trị đơn tăng lên 200.000đ?"** Hoa hồng 40.000đ, phí giao vẫn 15.000đ, doanh thu 55.000đ. Chi phí: tài xế 25.000đ, khuyến mãi 8.000đ, thanh toán 4.000đ, tổng 37.000đ. Lãi góp **18.000đ** — gấp đôi. Giá trị đơn là đòn bẩy mạnh vì hoa hồng tăng theo, còn tiền tài xế thì không.

> "Đơn 200.000đ lãi gấp đôi đơn 150.000đ, vì hoa hồng tăng 10.000đ còn chi phí tài xế giữ nguyên. Ngưỡng giá trị tối thiểu cho miễn phí giao là đòn bẩy đáng thử."

**"Còn hoàn tiền đơn lỗi?"** Chi phí biến đổi hay bị quên. Nếu trung bình mỗi đơn gánh **1.000đ** hoàn tiền và hỗ trợ khách hàng, lãi góp còn **8.000đ**. Mọi chi phí phát sinh theo từng đơn đều phải vào P&L một đơn vị, kể cả những khoản không nằm trên hoá đơn.

## Cùng khung, ngành khác: xe công nghệ

Một chuyến xe trung bình **80.000đ**. Nền tảng giữ hoa hồng **25%** = 20.000đ. Chi phí biến đổi mỗi chuyến: khuyến mãi 5.000đ, phí thanh toán 2% = 1.600đ, bảo hiểm chuyến 1.000đ. Lãi góp **12.400đ**.

Khác giao đồ ăn ở chỗ: nền tảng xe **không thu phí giao riêng** và không trả tài xế từ tiền của mình — tài xế nhận phần 75% còn lại. Nên doanh thu của nền tảng chỉ là hoa hồng, và toàn bộ áp lực tăng thu nhập tài xế đi thẳng vào tỷ lệ hoa hồng.

## Tự luyện ba phút

Sàn thương mại điện tử, đơn trung bình 300.000đ. Phí sàn 12%, phí thanh toán 2%, sàn trợ giá vận chuyển 15.000đ mỗi đơn, hỗ trợ và hoàn hàng trung bình 3.000đ.

*Đáp án:* doanh thu 36.000đ. Chi phí 6.000 + 15.000 + 3.000 = 24.000đ. Lãi góp **12.000đ** mỗi đơn.
`);

LRDX("f-unit-2", `
## Giám khảo hỏi tiếp

**"Nếu churn lên 7%?"** Vòng đời 1 ÷ 7% ≈ 14,3 tháng. LTV = 105.000 ÷ 7% = **1,5 triệu**. LTV/CAC = **2,5 lần** — dưới mốc 3. Hai điểm phần trăm churn kéo mô hình từ "tốt" xuống "cần xem lại".

**"Trong 1.000 người mới có người tự tìm đến không?"** Đây là câu phân biệt CAC trung bình với CAC trả phí. Nếu 300 người đến tự nhiên, marketing thật ra chỉ mang về 700 người. CAC trả phí = 600 triệu ÷ 700 ≈ **857.000đ**. LTV/CAC theo kênh trả phí ≈ **2,45 lần**.

> "CAC trung bình 600.000đ đang được kéo xuống bởi 300 người tự tìm đến. Tính riêng phần marketing mang về, CAC khoảng 857.000đ và tỷ lệ chỉ còn khoảng 2,5 lần."

Khi quyết định có tăng ngân sách quảng cáo không, dùng **CAC trả phí**: người tự tìm đến không tăng thêm khi chi thêm tiền.

**"Có cần chiết khấu dòng tiền không?"** Với vòng đời 20 tháng, chiết khấu làm LTV giảm vài phần trăm — đáng nhắc, không đổi kết luận. Với vòng đời 5 năm, bắt buộc phải tính.

## Cùng khung, ngành khác: phòng gym

Phí **500.000đ** mỗi tháng, biên gộp **60%** — sau huấn luyện viên và điện nước theo lượt — tức 300.000đ mỗi tháng. Churn **8%** mỗi tháng, vòng đời 12,5 tháng. LTV = **3,75 triệu**. CAC — tư vấn viên, buổi tập thử, quảng cáo — **1,2 triệu**. LTV/CAC ≈ **3,1 lần**.

Khác app học tiếng Anh ở chỗ churn gym có **tính mùa** rất mạnh: hội viên đăng ký tháng Một bỏ đi nhiều hơn hẳn hội viên đăng ký tháng Chín. Một con số churn trung bình giấu sự khác biệt đó — bài cohort ở cuối module sẽ tách nó ra.

## Tự luyện ba phút

Phần mềm quản lý bán hàng: 1 triệu đồng mỗi tháng, biên gộp 80%, churn 2% mỗi tháng, CAC 15 triệu.

*Đáp án:* lãi gộp 800.000đ, LTV = 800.000 ÷ 2% = **40 triệu**. LTV/CAC ≈ **2,7 lần**.
`);

LRDX("f-unit-3", `
## Giám khảo hỏi tiếp

**"Chi 3 tỷ mỗi tháng thì tiền cạn khi nào?"** Tháng đầu chi 3 tỷ — toàn bộ tiền mặt — mang về khoảng 5.000 khách. Cuối tháng, 5.000 khách đó trả lại 5.000 × 105.000đ = **525 triệu**. Tháng thứ hai không có đủ 3 tỷ để chi tiếp. Công ty dừng tăng trưởng sau đúng một tháng.

**"Vậy tăng gấp đôi thay vì gấp năm?"** Chi 1,2 tỷ mỗi tháng, 2.000 khách mới mỗi tháng. Bỏ qua rời bỏ cho đơn giản, lãi gộp từ các lứa khách tích luỹ tăng dần 210 triệu mỗi tháng. Dòng tiền cộng dồn: −0,99 · −1,77 · −2,34 · −2,70 · **−2,85** · −2,79 tỷ. Đáy khoảng **2,85 tỷ** ở tháng thứ năm — sát giới hạn 3 tỷ, và thực tế có rời bỏ sẽ sâu hơn.

> "Tăng gấp năm cạn tiền ngay tháng thứ hai. Tăng gấp đôi thì đáy tiền mặt khoảng 2,85 tỷ — quá sát 3 tỷ khi tính cả rời bỏ. Em đề xuất tăng khoảng 50% và gọi vốn song song."

**"Có cách rút ngắn hoàn vốn không?"** Gói năm trả trước. Giảm giá 20%: 12 × 150.000 × 80% = **1,44 triệu** thu ngay khi đăng ký. Lãi gộp 70% là khoảng 1,01 triệu — hoàn vốn CAC **ngay tháng đầu**. Đổi lại doanh thu mỗi khách thấp hơn.

## Cùng khung, ngành khác: thẻ tín dụng của ngân hàng số

Chi phí có một chủ thẻ — quảng cáo, quà mở thẻ, xét duyệt — **1,5 triệu**. Lãi góp mỗi chủ thẻ — phí giao dịch, lãi trả góp trừ chi phí rủi ro — **150.000đ** mỗi tháng. Hoàn vốn **10 tháng**. Vòng đời trung bình 36 tháng.

Khác app học tiếng Anh ở chỗ: ngân hàng có **chi phí vốn**. Mười tháng hoàn vốn nghĩa là mười tháng ngân hàng ứng tiền, và khi lãi suất huy động tăng, cùng một thời gian hoàn vốn trở nên đắt hơn. Ở ngành tài chính, hoàn vốn CAC luôn đi kèm câu hỏi về giá vốn.

## Tự luyện ba phút

CAC 900.000đ. Giá gói 200.000đ mỗi tháng, biên gộp 60%.

*Đáp án:* lãi gộp 120.000đ mỗi tháng, hoàn vốn **7,5 tháng**.
`);

LRDX("f-unit-4", `
## Giám khảo hỏi tiếp

**"Nếu cắt nửa khuyến mãi, lãi góp lên 13.000đ?"** Hoà vốn = 85 tỷ ÷ 13.000đ ≈ **6,54 triệu đơn**. Chỉ cần tăng khoảng 30% số đơn thay vì gấp đôi. Tăng lãi góp mỗi đơn 44% làm giảm quy mô hoà vốn khoảng 31% — quan hệ nghịch đảo ở dạng cụ thể.

**"Mở thêm thành phố làm chi phí cố định tăng 20 tỷ?"** Hoà vốn = 105 tỷ ÷ 9.000đ ≈ **11,67 triệu đơn**. Gấp đôi số đơn — 10 triệu — vẫn chưa hoà vốn nếu sự tăng trưởng đó đến từ thành phố mới.

> "Gấp đôi số đơn chỉ hoà vốn nếu chi phí cố định giữ nguyên 85 tỷ. Nếu mở rộng cần thêm 20 tỷ, cần gần 11,7 triệu đơn."

**"Nếu gấp đôi đúng kế hoạch và chi phí cố định không đổi?"** 10 triệu × 9.000đ = 90 tỷ, trừ 85 tỷ: **lãi 5 tỷ**. Lãi mỏng tới mức một đợt khuyến mãi của đối thủ là đủ xoá sạch.

## Cùng khung, ngành khác: nhà máy nước đóng chai

Chi phí cố định — khấu hao dây chuyền, lương, thuê nhà xưởng — **30 tỷ** mỗi năm. Lãi góp **1.500đ** mỗi chai. Hoà vốn **20 triệu chai**. Công suất tối đa **25 triệu chai**.

Khác Giao Nhanh ở chỗ: nhà máy có **trần công suất cứng**. Hoà vốn ở 80% công suất nghĩa là chỉ còn 5 triệu chai để có lãi, và muốn vượt trần phải đầu tư dây chuyền mới — chi phí cố định nhảy bậc. Ở nền tảng số, chi phí cố định tăng dần theo quy mô; ở nhà máy, nó tăng theo từng bậc lớn.

## Tự luyện ba phút

Phòng khám có chi phí cố định 6 tỷ mỗi năm, lãi góp 150.000đ mỗi lượt khám, mở cửa 300 ngày.

*Đáp án:* hoà vốn **40.000 lượt** mỗi năm, khoảng **133 lượt** mỗi ngày.
`);

LRDX("f-unit-5", `
## Giám khảo hỏi tiếp

**"Nếu tăng mật độ lên 2,5 đơn mỗi giờ và trả 24.000đ mỗi đơn?"** Tài xế vẫn được 60.000đ mỗi giờ, bằng đối thủ. Chi phí tài xế mỗi đơn giảm 1.000đ so với hiện tại, lãi góp lên **10.000đ**. Thay vì mất hơn một nửa lãi góp, công ty còn tăng thêm.

> "Bài toán của tài xế là tiền mỗi giờ, không phải tiền mỗi đơn. Nếu gom đơn để tài xế chạy 2,5 đơn mỗi giờ, trả 24.000đ vẫn bằng đối thủ, và lãi góp lên 10.000đ."

**"Hay thu thêm khách 5.000đ phí giao để bù?"** Lãi góp quay về 9.000đ trên giấy. Nhưng nếu số đơn giảm 15% vì phí cao hơn: 5 triệu × 85% × 9.000đ = **38,25 tỷ**, so với 45 tỷ hiện tại. Đẩy chi phí sang một bên của thị trường làm bên đó rời đi.

**"Thu thêm nhà hàng — hoa hồng 23%?"** Thêm 4.500đ mỗi đơn. Nhưng nhà hàng sẽ tăng giá món trên app hoặc rời nền tảng, và khách thấy giá cao hơn. Ba bên nối nhau: ép một bên, hai bên kia chịu hậu quả.

## Cùng khung, ngành khác: nền tảng gia sư

Phụ huynh trả **200.000đ** mỗi buổi. Gia sư nhận **150.000đ**, nền tảng giữ 50.000đ. Đối thủ trả gia sư **170.000đ**. Theo mức đó, nền tảng còn **30.000đ** mỗi buổi — mất 40%.

Đòn bẩy mật độ ở đây trông khác: gia sư mất thời gian đi lại giữa các nhà. Xếp lịch để một gia sư dạy **hai buổi liền trong cùng khu** tiết kiệm cho họ gần một giờ di chuyển — một khoản "tăng thu nhập theo giờ" mà nền tảng không phải trả tiền. Trong mọi mô hình ba bên, hãy hỏi: bên cung cấp dịch vụ đang lãng phí thời gian ở đâu?

## Tự luyện ba phút

Tài xế nhận 20.000đ mỗi đơn, chạy 3 đơn mỗi giờ. Đối thủ trả 66.000đ mỗi giờ. Phương án A: tăng lên 22.000đ mỗi đơn. Phương án B: tăng mật độ lên 3,3 đơn mỗi giờ, giữ 20.000đ.

*Đáp án:* cả hai đều cho tài xế **66.000đ** mỗi giờ. A tăng chi phí **2.000đ** mỗi đơn; B không tăng đồng nào. Chọn B nếu gom đơn làm được.
`);

LRDX("f-unit-6", `
## Giám khảo hỏi tiếp

**"Nếu chỉ 35% khách ở lại?"** Lãi góp trung bình mỗi khách: 34.000 × 35% = 11.900đ mỗi tháng. Hoàn vốn = 100.000 ÷ 11.900 ≈ **8,4 tháng**. Tỷ lệ ở lại là biến nhạy nhất — nó quyết định cả thời gian hoàn vốn lẫn việc có nên mở thành phố tiếp theo không.

**"Tăng ưu đãi lên 5 đơn miễn phí?"** Chi phí có khách: 55.000 + 5 × 15.000 = **130.000đ**. Nếu tỷ lệ ở lại chỉ nhích lên 55%: lãi góp trung bình 18.700đ, hoàn vốn ≈ **7 tháng**. Ưu đãi hào phóng hơn mà hoàn vốn chậm hơn — trừ khi nó kéo tỷ lệ ở lại lên đáng kể.

> "Thêm hai đơn miễn phí làm chi phí có khách tăng 30%, nhưng chỉ tăng tỷ lệ ở lại 5 điểm thì hoàn vốn chậm thêm khoảng một tháng."

**"Khách ở lại được bao lâu?"** Nếu khách ở lại rời đi 5% mỗi tháng, vòng đời 20 tháng, lãi góp cả vòng đời 34.000 × 20 = 680.000đ. Tính trên tất cả khách, kể cả người bỏ: 680.000 × 50% = **340.000đ**, hơn ba lần chi phí có khách.

## Cùng khung, ngành khác: ví điện tử

Ví điện tử hoàn tiền **50.000đ** cho giao dịch đầu tiên, cộng **30.000đ** quảng cáo mỗi người: chi phí có khách **80.000đ**. Chỉ **40%** tiếp tục dùng, mỗi người mang lại **10.000đ** lãi góp mỗi tháng từ phí thanh toán hoá đơn.

Lãi góp trung bình 4.000đ mỗi tháng. Hoàn vốn **20 tháng**.

Khác Giao Nhanh ở chỗ lãi góp mỗi khách rất nhỏ, nên hoàn vốn chỉ hợp lý khi vòng đời rất dài — hoặc khi ví điện tử có những sản phẩm lãi cao hơn để bán chéo sau này, như cho vay tiêu dùng. Trong case ví điện tử, câu hỏi "khách ở lại để dùng gì tiếp theo" quan trọng hơn thời gian hoàn vốn của riêng dịch vụ thanh toán.

## Tự luyện ba phút

Chi phí có khách 120.000đ. 60% khách ở lại, mỗi người lãi góp 25.000đ mỗi tháng.

*Đáp án:* lãi góp trung bình 15.000đ, hoàn vốn **8 tháng**.
`);

LRDX("f-unit-7", `
## Giám khảo hỏi tiếp

**"Lứa này hoàn vốn vào tháng nào?"** Cộng dồn lãi góp từng tháng: 200 · 340 · 460 · 570 · **674** · 774 triệu. Vượt 600 triệu ở tháng thứ tư (tính tháng đăng ký là tháng 0). Trả lời bằng tháng cụ thể thuyết phục hơn nói "trong sáu tháng".

**"Kênh KOL có chi phí có khách thấp hơn, 40.000đ. Tốt hơn không?"** Tỷ lệ còn lại của lứa KOL: 100% · 60% · 45% · 38% · 34% · 30%, tổng **3,07**. 10.000 hội viên × 3,07 × 20.000đ = **614 triệu**, trừ 400 triệu chi phí: **214 triệu** — hơn kênh quảng cáo 40 triệu sau sáu tháng. Nhưng đường còn lại của KOL rơi nhanh hơn và thấp hơn ở cuối.

> "Sau sáu tháng KOL hơn 40 triệu vì rẻ hơn. Nhưng tháng thứ năm kênh KOL chỉ giữ 30% so với 50% của quảng cáo, mỗi tháng sau đó kênh quảng cáo kiếm thêm 40 triệu. Qua tháng thứ bảy là kênh quảng cáo vượt."

**"Sao không dùng churn trung bình cho nhanh?"** Vì tháng đầu mất 30%, những tháng sau chỉ mất 2–5%. Churn trung bình cộng hai giai đoạn đó sẽ đánh giá thấp nhóm trung thành và đánh giá cao nhóm vừa thử.

## Cùng khung, ngành khác: app học ngoại ngữ theo mùa

Hai lứa, mỗi lứa 1.000 người, lãi góp **100.000đ** mỗi người mỗi tháng.

- **Lứa tháng Một** — quyết tâm đầu năm: 100% · 50% · 35% · 25%. Tổng 2,1 → **210 triệu** sau bốn tháng.
- **Lứa tháng Chín** — vào năm học: 100% · 70% · 60% · 55%. Tổng 2,85 → **285 triệu**.

Cùng sản phẩm, cùng giá, cùng kênh. Khác biệt đến từ **động cơ** của người đăng ký. Ở ngành giáo dục và thể dục, cohort theo tháng đăng ký gần như luôn cho thấy mùa vụ — và nó quyết định nên dồn ngân sách quảng cáo vào tháng nào.

## Tự luyện ba phút

Lứa 5.000 người, tỷ lệ còn lại 100% · 60% · 50% · 45%, lãi góp 30.000đ mỗi người mỗi tháng, chi phí có khách 80.000đ.

*Đáp án:* tổng tỷ lệ 2,55. Lãi góp 5.000 × 2,55 × 30.000đ = **382,5 triệu**. Chi phí 400 triệu. Sau bốn tháng còn **âm 17,5 triệu** — chưa hoàn vốn, gần tới.
`);

LRDX("f-unit-8", `
## Giám khảo hỏi tiếp

**"Giảm giá Plus 5.000đ để giữ churn ở 5% thì sao?"** Lãi góp còn 15.000đ, vòng đời 20 tháng, LTV = **300.000đ**. Hơn hẳn 250.000đ nếu để churn lên 8%. Giảm giá để giữ chân tốt hơn giữ giá mà mất khách — với điều kiện giảm giá thật sự giữ được churn.

**"Hay chi 2.000đ mỗi hội viên mỗi tháng cho chương trình giữ chân, kéo churn về 6%?"** Lãi góp 18.000đ ÷ 6% = **300.000đ**. Bằng đúng phương án giảm giá. Khi hai phương án ra cùng một con số, chọn cái **dễ đảo ngược hơn**: chương trình giữ chân dừng được, giá đã giảm thì khó tăng lại.

> "Hai phương án cùng cho LTV 300.000đ. Em chọn chương trình giữ chân vì dừng được nếu không hiệu quả, còn giảm giá thì gần như không lấy lại được."

**"Công thức 1 ÷ churn có đúng không?"** Chỉ gần đúng khi churn đều qua các tháng. Thực tế churn tháng đầu thường cao gấp nhiều lần các tháng sau. Dùng bảng cohort ở bài trước khi có dữ liệu; dùng công thức khi cần một con số nhanh.

## Cùng khung, ngành khác: bảo hiểm sức khoẻ trả phí tháng

Lãi góp mỗi hợp đồng **100.000đ** mỗi tháng. Tỷ lệ huỷ **2%** mỗi tháng → vòng đời 50 tháng, LTV **5 triệu**. Tỷ lệ huỷ lên **3%** → vòng đời 33,3 tháng, LTV **3,33 triệu** — giảm **33%**.

Ở bảo hiểm, churn thấp làm mẫu số nhỏ, nên mỗi điểm phần trăm tăng thêm có tác động phần trăm lớn. Từ 2% lên 3% là tăng churn **50%**, dù chỉ "một điểm". Luôn quy thay đổi churn về **tỷ lệ tương đối** trước khi nói "không đáng lo".

## Tự luyện ba phút

Phần mềm có lãi góp 300.000đ mỗi khách mỗi tháng. Churn tăng từ 3% lên 4%.

*Đáp án:* LTV từ **10 triệu** xuống **7,5 triệu**, giảm **25%**.
`);

LRDX("f-unit-9", `
## Giám khảo hỏi tiếp

**"Nếu cắt khuyến mãi làm mất 20% đơn chứ không phải 10%?"** 4 triệu đơn × 13.000đ = 52 tỷ, cộng 4,8 tỷ Plus = 56,8 tỷ. Lỗ **28,2 tỷ**. Vẫn tốt hơn 40 tỷ hiện tại — kế hoạch chịu được sai số lớn ở giả định nhạy nhất.

**"Cần bao nhiêu đơn để hoà vốn ở lãi góp 13.000đ?"** (85 − 4,8) tỷ ÷ 13.000đ ≈ **6,17 triệu đơn**. So với 4,5 triệu trong kế hoạch, còn thiếu khoảng 37%.

> "Với lãi góp mới, hoà vốn cần khoảng 6,2 triệu đơn mỗi năm, tức thêm gần 1,7 triệu đơn so với kế hoạch. Đó là mục tiêu tăng trưởng cho năm thứ hai."

**"Nếu Plus lên 50.000 hội viên?"** 50.000 × 20.000đ × 12 = 12 tỷ. Tổng lãi góp 70,5 tỷ, lỗ còn **14,5 tỷ**. Plus nhỏ nhưng tăng trưởng nhanh hơn dòng đơn hàng là đòn bẩy đáng theo dõi.

## Cùng khung, ngành khác: chuỗi phòng gym

Ba dòng lãi góp mỗi năm:
- Hội viên: 3.000 người × 300.000đ × 12 tháng = **10,8 tỷ**
- Huấn luyện cá nhân: 20.000 buổi × 150.000đ = **3 tỷ**
- Đồ uống và thực phẩm bổ sung: **1 tỷ**

Tổng 14,8 tỷ. Chi phí cố định 13 tỷ. Lãi **1,8 tỷ**.

Khác Giao Nhanh ở chỗ các dòng **phụ thuộc nhau**: không có hội viên thì không có ai thuê huấn luyện viên hay mua đồ uống. Cắt hay giảm giá dòng hội viên sẽ kéo cả hai dòng kia xuống. Khi cộng lãi góp theo dòng, luôn hỏi dòng nào là **cửa vào** cho những dòng còn lại.

## Tự luyện ba phút

Dòng A: 2 triệu đơn × 8.000đ lãi góp. Dòng B: 5.000 thuê bao × 50.000đ mỗi tháng × 12 tháng. Chi phí cố định 22 tỷ.

Lãi hay lỗ bao nhiêu? Cần thêm bao nhiêu đơn dòng A để hoà vốn?

*Đáp án:* 16 + 3 = 19 tỷ, lỗ **3 tỷ**. Cần thêm 3 tỷ ÷ 8.000đ = **375.000 đơn**.
`);
