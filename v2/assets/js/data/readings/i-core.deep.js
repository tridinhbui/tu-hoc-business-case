/* Phần đào sâu cho track Interview · i-profit · i-growth · i-entry · i-price 1–3 — giám khảo hỏi tiếp · ngành khác · tự luyện.
   Mọi con số được tính lại trong tests/readings.test.js (mảng DEEP). */

LRDX("i-profit-1", `
## Giám khảo hỏi tiếp

**"Nếu ngành cũng giảm 25%, không phải 5%?"** Theo ngành, lợi nhuận sẽ là 37,5 tỷ. Phần riêng của hãng chỉ còn **2,5 tỷ** — khoảng 17% mức giảm. Cùng một câu hỏi làm rõ, câu trả lời đổi hướng cả case: từ vấn đề nội bộ sang vấn đề thị trường.

> "Con số ngành quyết định em đi nhánh nào. Ngành giảm 5% thì 83% là chuyện nội bộ; ngành giảm 25% thì chỉ 17%, và case chuyển sang câu hỏi hãng nên thích nghi thế nào."

**"Khách hàng muốn quay về 50 tỷ trong hai năm. Mục tiêu đó lớn cỡ nào?"** Từ 35 lên 50 tỷ: tăng **15 tỷ**, tức khoảng **43%**. Nói con số này ra ngay sau khi làm rõ mục tiêu — nó cho biết cần đòn bẩy lớn hay chỉ cần sửa vài chỗ.

**"Giảm 30% trong hai năm là bao nhiêu mỗi năm?"** (35 ÷ 50)^(1/2) − 1 ≈ **−16,3%** mỗi năm. Hữu ích khi so với tốc độ của ngành hay của đối thủ theo năm.

## Cùng khung, ngành khác: bảo hiểm phi nhân thọ

Giám khảo: "Lợi nhuận của một hãng bảo hiểm xe giảm từ **200 tỷ** xuống **140 tỷ**." Câu làm rõ đắt giá nhất vẫn là: ngành thế nào? Trả lời: toàn ngành giảm **25%** vì chi phí sửa xe tăng.

Theo ngành: 150 tỷ. Phần riêng của hãng: **10 tỷ**, khoảng **17%** mức giảm 60 tỷ.

Khác hãng xe khách ở chỗ nguyên nhân chung của ngành — giá phụ tùng — nằm ngoài tầm kiểm soát. Cấu trúc bài lúc này không phải "tìm lỗi nội bộ" mà là "định giá lại hợp đồng nhanh hơn đối thủ". Bốn bước mở đầu giống nhau; cây vấn đề phía sau khác hẳn.

## Tự luyện ba phút

Lợi nhuận giảm từ 80 xuống 60 tỷ. Ngành giảm 10%.

Phần riêng của công ty là bao nhiêu, chiếm bao nhiêu phần trăm mức giảm?

*Đáp án:* theo ngành 72 tỷ. Phần riêng **12 tỷ**, tức **60%**.
`);

LRDX("i-profit-2", `
## Giám khảo hỏi tiếp

**"Doanh thu tăng 20 tỷ, chi phí tăng 35 tỷ. Chi phí tăng từ đâu khi bán ít vé hơn?"** Tách chi phí. Giả sử chi phí cố định **250 tỷ**, chi phí biến đổi **40.000đ** mỗi vé. Hai năm trước: 250 + 200 = 450 tỷ — khớp. Năm nay theo cấu trúc cũ: 250 + 160 = **410 tỷ**. Thực tế 485 tỷ. Có **75 tỷ** không giải thích được bằng sản lượng.

> "Nếu chi phí giữ cấu trúc cũ, bán ít 1 triệu vé thì chi phí phải giảm xuống khoảng 410 tỷ. Thực tế là 485 tỷ, nên có khoảng 75 tỷ chi phí tăng thật — em muốn xem nhiên liệu và lương tài xế."

**"Nếu tính hiệu ứng giá trên số vé cũ thì sao?"** 30.000đ × 5 triệu vé = 150 tỷ. Hiệu ứng sản lượng khi đó tính theo giá mới: −1 triệu × 130.000đ = −130 tỷ. Vẫn cộng lại +20 tỷ. Thứ tự tách đổi độ lớn từng phần, không đổi tổng — chọn một cách, nói rõ, giữ nhất quán.

**"Lợi nhuận mỗi vé thay đổi thế nào?"** 50 tỷ ÷ 5 triệu = **10.000đ**. 35 tỷ ÷ 4 triệu = **8.750đ**. Giá tăng 30% mà lợi nhuận mỗi vé vẫn giảm — chi phí mỗi vé tăng nhanh hơn giá.

## Cùng khung, ngành khác: chuỗi rạp phim

Lượt khách giảm từ **2 triệu** xuống **1,8 triệu**, giá vé trung bình tăng từ **80.000đ** lên **95.000đ**. Doanh thu từ 160 lên **171 tỷ**.

Hiệu ứng giá: 15.000đ × 1,8 triệu = **27 tỷ**. Hiệu ứng sản lượng: −0,2 triệu × 80.000đ = **−16 tỷ**. Tổng **+11 tỷ**.

Khác xe khách ở chỗ rạp phim mất khách còn mất **bắp nước** — nguồn lợi nhuận chính. Doanh thu vé tăng 11 tỷ có thể che một khoản mất lớn hơn ở quầy bắp nước. Tách hiệu ứng giá và sản lượng xong, hỏi tiếp: sản lượng kéo theo nguồn thu nào khác?

## Tự luyện ba phút

Sản lượng giảm từ 10 triệu xuống 9 triệu đơn vị, giá tăng từ 50.000đ lên 56.000đ.

*Đáp án:* hiệu ứng giá 6.000đ × 9 triệu = **54 tỷ**, sản lượng −1 triệu × 50.000đ = **−50 tỷ**. Doanh thu tăng **4 tỷ**, từ 500 lên 504 tỷ.
`);

LRDX("i-profit-3", `
## Giám khảo hỏi tiếp

**"Nếu hãng nâng biên tuyến dài từ 5% lên 8%?"** Biên chung: 40% × 20% + 60% × 8% = **12,8%**. Lấy lại khoảng 1,8 trong 4,5 điểm đã mất. Cải thiện tuyến dài giúp, nhưng không đủ bù cơ cấu.

**"Hay kéo tỷ trọng tuyến dài về 45%?"** 55% × 20% + 45% × 5% = **13,25%**. Lấy lại 2,25 điểm. Hai đòn bẩy cho hai loại hành động khác nhau: một là vận hành tuyến dài tốt hơn, một là chọn lại mạng tuyến.

> "Nâng biên tuyến dài lên 8% đưa biên chung lên 12,8%. Kéo tỷ trọng tuyến dài về 45% đưa lên 13,25%. Làm cả hai mới gần với mức 15,5% cũ."

**"Vì sao tuyến dài tăng tỷ trọng?"** Hỏi trước khi đề xuất cắt. Có thể hãng mở tuyến dài vì đối thủ rút khỏi, hoặc vì tuyến ngắn đang mất khách vào xe công nghệ. Nếu tuyến ngắn đang co lại, kéo tỷ trọng về 45% không phải một lựa chọn — nó là một điều không thể.

## Cùng khung, ngành khác: ngân hàng

Ngân hàng có hai mảng cho vay. Doanh nghiệp: biên lãi ròng **1,5%**. Tiêu dùng: **5%**. Biên từng mảng không đổi. Tỷ trọng tiêu dùng giảm từ **40%** xuống **25%** vì ngân hàng siết rủi ro.

Biên chung: trước 60% × 1,5% + 40% × 5% = **2,9%**. Sau 75% × 1,5% + 25% × 5% = **2,375%**. Giảm hơn nửa điểm, toàn bộ do cơ cấu.

Khác hãng xe khách ở chỗ dịch chuyển cơ cấu ở đây là **quyết định có chủ đích** để giảm nợ xấu. Bẫy cơ cấu không phải lúc nào cũng là sai lầm — đôi khi nó là cái giá đã được chọn. Việc của người giải case là nói rõ cái giá đó bằng con số.

## Tự luyện ba phút

Sản phẩm A biên 30%, sản phẩm B biên 10%. Tỷ trọng A giảm từ 50% xuống 30%.

*Đáp án:* biên chung từ **20%** xuống **16%**.
`);

LRDX("i-growth-1", `
## Giám khảo hỏi tiếp

**"Tính cả chi phí thực hiện thì thứ tự có đổi không?"** Giả sử mở tỉnh mới cần **40 tỷ** đầu tư cửa hàng, tăng tần suất cần **10 tỷ** cho chương trình khách hàng thân thiết. Giá trị kỳ vọng ròng: tần suất 80 − 10 = **70 tỷ**, tỉnh mới 75 − 40 = **35 tỷ**. Khoảng cách từ 5 tỷ nới ra 35 tỷ.

> "Tính cả chi phí, tăng tần suất đem về khoảng 70 tỷ ròng, gấp đôi mở tỉnh mới. Hướng rẻ nhất vừa ít rủi ro nhất vừa có giá trị ròng cao nhất."

**"Làm hai hướng đầu cùng lúc được không?"** Nếu độc lập, giá trị kỳ vọng cộng lại 155 tỷ. Nhưng chúng dùng chung đội quản lý và ngân sách marketing. Hỏi: đội ngũ có đủ người cho cả hai trong năm đầu không?

**"80% khả năng thành công lấy từ đâu?"** Từ chương trình thử ở 10 cửa hàng năm ngoái. Nếu không có dữ liệu thử, nói thẳng đó là ước lượng — và đề xuất chạy thử để thay nó bằng con số thật.

## Cùng khung, ngành khác: ngân hàng số

Ngân hàng số doanh thu **1.000 tỷ** có ba hướng:
- Bán chéo thẻ tín dụng cho khách hiện có: **+8%**, khả năng **70%** → **56 tỷ**.
- Ra mắt cho vay tiêu dùng: **+20%**, khả năng **35%** → **70 tỷ**.
- Mở sang doanh nghiệp nhỏ: **+30%**, khả năng **20%** → **60 tỷ**.

Lần này hướng giữa đứng đầu, không phải hướng ít rủi ro nhất. Khác chuỗi trà sữa ở chỗ sản phẩm tài chính mới mang theo **rủi ro tín dụng** — con số +20% doanh thu có thể đi kèm nợ xấu. Với ngân hàng, giá trị kỳ vọng phải tính trên lợi nhuận sau chi phí rủi ro, không phải trên doanh thu.

## Tự luyện ba phút

Doanh thu 500 tỷ. Hướng A: +20%, khả năng 60%. Hướng B: +40%, khả năng 25%. Hướng C: +10%, khả năng 90%.

*Đáp án:* A **60 tỷ**, B **50 tỷ**, C **45 tỷ**. Thứ tự A → B → C.
`);

LRDX("i-growth-2", `
## Giám khảo hỏi tiếp

**"Mỗi hiệu ứng chiếm bao nhiêu phần trăm mức tăng?"** Tổng 277,5 tỷ. Sản lượng 140 tỷ ≈ **50%**. Cơ cấu 110 tỷ ≈ **40%**. Giá 27,5 tỷ ≈ **10%**. Câu trả lời cho CEO: đợt tăng giá chai nhỏ chỉ đóng góp khoảng một phần mười.

> "Khoảng một nửa mức tăng đến từ bán nhiều chai hơn, 40% từ khách chuyển sang chai lớn, và chỉ khoảng 10% từ đợt tăng giá chai nhỏ."

**"Theo lãi góp thì sao?"** Giả sử chai nhỏ lãi góp **4.000đ** (sau tăng giá **4.500đ**), chai lớn **6.000đ**. Năm trước: 240 + 240 = **480 tỷ**. Năm nay: 55 triệu × 4.500 + 55 triệu × 6.000 = **577,5 tỷ**. Lãi góp tăng **97,5 tỷ**, khoảng 20%. Nếu chai lớn có lãi góp mỗi chai cao hơn, hiệu ứng cơ cấu còn quan trọng hơn ở tầng lợi nhuận.

**"Tăng giá có làm mất 5 triệu chai nhỏ không?"** Chai nhỏ giảm từ 60 xuống 55 triệu. Không biết chắc do giá hay do khách chủ động lên chai lớn. So các vùng tăng giá sớm và muộn trước khi kết luận.

## Cùng khung, ngành khác: nhà sách

Năm trước: **1 triệu** cuốn sách phổ thông giá 50.000đ, **200.000** cuốn ngoại văn giá 300.000đ. Doanh thu **110 tỷ**, giá bình quân khoảng 91.667đ. Năm nay: 1,1 triệu cuốn phổ thông, 300.000 cuốn ngoại văn, giá không đổi. Doanh thu **145 tỷ**.

- Sản lượng: +200.000 cuốn × 91.667đ ≈ **18,3 tỷ**.
- Cơ cấu: 145 − 1,4 triệu × 91.667đ ≈ **16,7 tỷ**.
- Giá: **0**.

Khác hãng nước giải khát ở chỗ không có tăng giá — toàn bộ tăng trưởng là sản lượng và cơ cấu. Nếu báo cáo chỉ ghi "doanh thu tăng 32%", ban điều hành không biết gần một nửa đến từ khách mua sách ngoại văn đắt tiền hơn.

## Tự luyện ba phút

Năm trước: A 10 triệu đơn vị giá 10.000đ, B 10 triệu giá 30.000đ. Năm nay: A 8 triệu, B 14 triệu, giá không đổi.

*Đáp án:* doanh thu từ **400** lên **500 tỷ**. Giá bình quân cũ 20.000đ. Sản lượng **+40 tỷ**, cơ cấu **+60 tỷ**, giá **0**.
`);

LRDX("i-growth-3", `
## Giám khảo hỏi tiếp

**"Mỗi cửa hàng cần lãi bao nhiêu để không phá giá trị?"** ROIC phải bằng chi phí vốn 12%: 12% × 5 tỷ = **0,6 tỷ** mỗi năm. Hiện tại 0,4 tỷ — thiếu 0,2 tỷ mỗi cửa hàng.

**"Nếu cắt vốn đầu tư mỗi cửa hàng xuống 3,5 tỷ?"** ROIC = 0,4 ÷ 3,5 ≈ **11,4%**. Vẫn dưới 12%. Cắt vốn giúp nhưng không đủ; cần cải thiện cả lợi nhuận.

> "Cửa hàng mới cần lãi 0,6 tỷ mỗi năm để hoà chi phí vốn. Nếu chỉ cắt vốn xuống 3,5 tỷ, ROIC lên khoảng 11,4% — vẫn chưa đủ."

**"Cửa hàng mới có cần thời gian để chín không?"** Có thể. Nếu sau ba năm lợi nhuận mỗi cửa hàng lên **0,7 tỷ**, ROIC **14%**, 100 cửa hàng tạo **10 tỷ** giá trị mỗi năm. Câu hỏi đúng: cửa hàng cũ ở năm thứ ba lãi bao nhiêu? Nếu dữ liệu cửa hàng cũ cho thấy lợi nhuận tăng theo tuổi, đừng khuyến nghị dừng mở.

## Cùng khung, ngành khác: nhà máy mới

Tập đoàn đầu tư nhà máy **800 tỷ**, lợi nhuận hoạt động sau thuế **72 tỷ** mỗi năm. ROIC **9%**. Chi phí vốn **11%**. Mỗi năm phá huỷ (9% − 11%) × 800 = **16 tỷ** giá trị.

Khác chuỗi bán lẻ ở chỗ nhà máy là **một khoản đầu tư lớn, không chia nhỏ được**. Chuỗi bán lẻ có thể dừng mở ở cửa hàng thứ 50 khi thấy ROIC thấp; nhà máy thì đã đổ hết vốn trước khi biết. Với khoản đầu tư không chia nhỏ, phép tính ROIC phải làm **trước**, và độ nhạy của nó quan trọng hơn con số cơ sở.

## Tự luyện ba phút

50 cửa hàng, mỗi cửa hàng vốn 4 tỷ, tổng lợi nhuận hoạt động sau thuế 30 tỷ mỗi năm. Chi phí vốn 10%.

*Đáp án:* vốn **200 tỷ**, ROIC **15%**. Tạo **10 tỷ** giá trị mỗi năm.
`);

LRDX("i-entry-1", `
## Giám khảo hỏi tiếp

**"Hai năm đầu lỗ thì hoàn vốn thực tế bao lâu?"** Giả sử năm 1 lỗ **5 tỷ**, năm 2 lỗ **2 tỷ**, từ năm 3 lãi 10 tỷ mỗi năm. Sau năm 2, tổng tiền đã bỏ ra 67 tỷ. Cần thêm 6,7 năm EBITDA 10 tỷ. Hoàn vốn khoảng **8,7 năm**.

> "Tính cả hai năm đầu lỗ, hoàn vốn gần 9 năm. Với một chuỗi nha khoa, em muốn biết công ty có đặt ngưỡng hoàn vốn tối đa không trước khi kết luận."

**"Nếu đạt 15% thị phần thay vì 10%?"** EBITDA 500 × 15% × 20% = **15 tỷ**. Hoàn vốn 60 ÷ 15 = **4 năm** tính từ năm thứ ba. Thị phần là biến quyết định ở tầng kinh tế.

**"10% thị phần có hợp lý không khi đối thủ lớn nhất chỉ 12%?"** Đây là câu hỏi của tầng thứ ba: mình có thắng được không? Trở thành người chơi thứ hai trong ba năm ở một thành phố mới cần một lý do cụ thể — bác sĩ nổi tiếng, giá khác biệt, hay bảo hiểm liên kết.

## Cùng khung, ngành khác: chuỗi phòng gym vào Cần Thơ

Thị trường năm thứ ba **200 tỷ**. Mục tiêu thị phần **15%**. Biên EBITDA **25%**. Vốn đầu tư **45 tỷ**.

EBITDA: 200 × 15% × 25% = **7,5 tỷ**. Hoàn vốn: **6 năm**.

Khác nha khoa ở chỗ gym có **biên cao hơn nhưng thị trường nhỏ hơn**, và thị phần 15% ở thành phố cỡ vừa dễ đạt hơn vì ít đối thủ chuyên nghiệp. Cùng ra 6 năm, nhưng rủi ro nằm ở tầng khác: nha khoa rủi ro ở thị phần, gym rủi ro ở quy mô thị trường có thật sự 200 tỷ không.

## Tự luyện ba phút

Thị trường 800 tỷ, thị phần 8%, biên EBITDA 15%, vốn 48 tỷ.

*Đáp án:* EBITDA **9,6 tỷ**, hoàn vốn **5 năm** (chưa tính những năm đầu lỗ).
`);

LRDX("i-entry-2", `
## Giám khảo hỏi tiếp

**"Năm đầu doanh thu chỉ 150 tỷ thì lợi thế còn bao nhiêu?"** Nếu cả hai lợi thế tỷ lệ với doanh thu: 5,5% × 150 = 8,25 tỷ, trừ lợi thế mặt bằng của đối thủ 3 tỷ, còn **5,25 tỷ**. Nhưng mua gộp khu vực có thể cần quy mô tối thiểu — nếu năm đầu chưa đủ quy mô để được giá, lợi thế giá vốn có thể bằng không.

**"Nếu đối thủ mạnh nhất ở Lào là một chuỗi Thái Lan, cũng mua gộp khu vực?"** Lợi thế giá vốn 4% biến mất khi so với họ. Còn hao hụt 1,5% trừ mặt bằng 2%: **−0,5%**, tức **−1,5 tỷ** mỗi năm. So với đối thủ mạnh nhất, lợi thế ròng âm.

> "So với chuỗi địa phương, lợi thế ròng dương 10,5 tỷ. So với chuỗi Thái Lan cũng mua gộp khu vực, lợi thế ròng âm khoảng 1,5 tỷ. Câu hỏi là đối thủ nào quyết định giá trên thị trường."

**"Liên doanh với đối thủ địa phương có mặt bằng tốt?"** Gộp cả hai lợi thế: 4% + 1,5% + 2% = 7,5% × 300 = **22,5 tỷ**. Nhưng chia lợi nhuận với đối tác. Nếu chia đôi, phần của chuỗi Việt Nam khoảng 11,25 tỷ — hơn đi một mình một chút, với vốn và rủi ro thấp hơn.

## Cùng khung, ngành khác: ngân hàng mở chi nhánh ở Campuchia

Ngân hàng Việt Nam có hệ thống công nghệ lõi rẻ hơn, tiết kiệm **0,3%** trên tổng tài sản **5.000 tỷ**: **15 tỷ** mỗi năm. Ngân hàng địa phương có chi phí vốn thấp hơn **0,5%** nhờ tiền gửi dân cư lâu năm: **25 tỷ**.

Lợi thế ròng: **−10 tỷ**.

Khác siêu thị mini ở chỗ trong ngân hàng, lợi thế của đối thủ địa phương nằm ở **nguồn vốn** — thứ mất nhiều năm mới xây được. Lợi thế mang sang được là công nghệ; lợi thế không mang sang được là niềm tin của người gửi tiền.

## Tự luyện ba phút

Doanh thu 200 tỷ. Lợi thế mang sang: giá vốn 3%, hao hụt 1%. Lợi thế của đối thủ: 2,5%.

*Đáp án:* mang sang **8 tỷ**, đối thủ **5 tỷ**, ròng **3 tỷ**.
`);

LRDX("i-entry-3", `
## Giám khảo hỏi tiếp

**"Xác suất thành công bao nhiêu thì vào lớn tốt hơn?"** Đặt hai giá trị kỳ vọng bằng nhau: p × 500 − (1 − p) × 200 = p × 350 − (1 − p) × 30. Giải ra p ≈ **53%**. Dưới 53%, vào nhỏ thắng; trên 53%, vào lớn thắng.

> "Nghiên cứu nói 40%. Vào lớn chỉ đáng khi tin khả năng thành công trên khoảng 53%. Em muốn biết con số 40% chắc đến đâu."

**"Vào nhỏ còn có lợi gì ngoài giá trị kỳ vọng?"** Thông tin. Sau một năm thử ở một thành phố, công ty biết khả năng thành công thật gần 0% hay gần 100%. Nếu thành công, mở rộng; nếu thất bại, dừng với 30 tỷ. Vào lớn trả giá cho sự không chắc chắn bằng 200 tỷ; vào nhỏ trả bằng 30 tỷ.

**"Còn phương án không vào?"** Giá trị kỳ vọng **0**. Cả hai phương án đều dương, nên không vào không phải lựa chọn tốt nhất — nhưng phải đặt nó lên bảng để người nghe thấy phương án tệ nhất vẫn tốt hơn không làm gì.

## Cùng khung, ngành khác: ra mắt sản phẩm mới

Hãng thực phẩm ra mắt dòng sản phẩm mới. Khả năng thành công **50%**.
- Ra mắt toàn quốc: thành công **+300 tỷ**, thất bại **−150 tỷ** → kỳ vọng **75 tỷ**.
- Thử ở hai tỉnh: thành công, mở rộng sau **+220 tỷ**; thất bại **−20 tỷ** → kỳ vọng **100 tỷ**.

Khác mỹ phẩm vào Indonesia ở chỗ đối thủ trong nước có thể **sao chép nhanh** khi thấy sản phẩm thử thành công. Khoản mất khi thử trước (300 xuống 220) phản ánh rủi ro đó. Nếu đối thủ sao chép trong ba tháng, khoản mất có thể lớn hơn nhiều — và vào lớn quay lại thắng.

## Tự luyện ba phút

Khả năng thành công 30%. Vào lớn: +600 / −150. Vào nhỏ: +400 / −40.

*Đáp án:* vào lớn 180 − 105 = **75 tỷ**. Vào nhỏ 120 − 28 = **92 tỷ**. Vào nhỏ thắng.
`);

LRDX("i-price-1", `
## Giám khảo hỏi tiếp

**"Vậy định giá bao nhiêu?"** Chia giá trị 160 triệu giữa startup và khách. Ví dụ **90 triệu**: startup lấy 90, khách giữ **70 triệu** lợi ích — vẫn hơn gấp đôi khoản trả. So với giá đối thủ 60 triệu, startup thu thêm 30 triệu mỗi khách mà khách vẫn có lý do rõ ràng để mua.

> "Ở 90 triệu, nhà phân phối vẫn giữ 70 triệu lợi ích mỗi năm. Em chọn mức này thay vì 60 triệu bằng đối thủ, vì phần mềm của mình giảm tồn kho — thứ đối thủ không chứng minh được."

**"Nhà phân phối lớn giảm được 3 tỷ tồn kho thì sao?"** Chi phí vốn tiết kiệm 360 triệu, cộng hao hụt giảm, giả sử **100 triệu**: **460 triệu** mỗi năm. Một giá cho mọi khách để lại tiền trên bàn ở khách lớn. Định giá theo quy mô — số kho, số mã hàng, giá trị tồn kho.

**"Nếu chi phí vốn của khách chỉ 8%?"** Nhà phân phối nhỏ: 80 + 40 = **120 triệu**. Giá trị kinh tế thay đổi theo điều kiện của khách — lãi suất cao thì phần mềm giảm tồn kho đáng giá hơn.

## Cùng khung, ngành khác: phần mềm chấm công nhà máy

Nhà máy **500** công nhân. Phần mềm giảm sai lệch chấm công trung bình **1 giờ** mỗi công nhân mỗi tháng, giờ công **30.000đ**. Giá trị: 500 × 30.000 × 12 = **180 triệu** mỗi năm. Chi phí phục vụ **15 triệu**. Đối thủ bán **50 triệu**.

Khác phần mềm kho ở chỗ khách hàng — phòng nhân sự — thường **không thấy** khoản tiết kiệm này trên báo cáo, vì sai lệch chấm công nằm rải rác trong bảng lương. Giá trị kinh tế cao nhưng phải được **chứng minh bằng dữ liệu của chính khách**, ví dụ chạy thử một tháng và đối chiếu bảng lương.

## Tự luyện ba phút

Phần mềm giảm 2 tỷ tồn kho cho khách, chi phí vốn 10%, và tiết kiệm 60 triệu chi phí nhân sự mỗi năm.

*Đáp án:* **260 triệu** mỗi năm.
`);

LRDX("i-price-2", `
## Giám khảo hỏi tiếp

**"Với dự báo giảm 20%, lãi góp thay đổi bao nhiêu?"** 800.000 kiện × 200.000đ = **160 tỷ**, so với 150 tỷ hiện tại. Tăng **10 tỷ**.

**"Nếu giảm 30%?"** 700.000 × 200.000đ = **140 tỷ**. Mất **10 tỷ**. Chỉ 10 điểm phần trăm sai số dự báo làm kết quả đổi từ +10 sang −10 tỷ.

> "Dự báo giảm 20% cho thêm 10 tỷ. Nếu thực tế giảm 30% thì mất 10 tỷ. Em đề xuất thử trên vài tuyến trước khi áp toàn mạng bay."

**"Hành khách mang hành lý xách tay nhiều hơn có tốn gì không?"** Có thể: khoang hành lý trên đầu đầy, lên máy bay chậm, chuyến bay trễ. Chi phí đó không nằm trong 50.000đ xử lý mỗi kiện ký gửi. Phép tính ngưỡng đúng về số học, nhưng phải hỏi chi phí dịch chuyển sang chỗ khác.

## Cùng khung, ngành khác: phí đổi vé tàu

Hãng tàu thu phí đổi vé **50.000đ**, chi phí xử lý **10.000đ**, **200.000** lượt đổi mỗi năm. Đề xuất tăng lên **80.000đ**.

Lãi góp mỗi lượt từ 40.000đ lên 70.000đ. Ngưỡng = 1 − 40 ÷ 70 ≈ **42,9%**. Số lượt đổi được phép giảm gần một nửa.

Khác phí hành lý ở chỗ khách đổi vé tàu thường **không có lựa chọn thay thế** — lịch trình đã thay đổi, họ buộc phải đổi. Độ nhạy giá thấp, ngưỡng lại rộng. Nhưng một phí đổi vé quá cao làm khách **ngại mua vé sớm** — chi phí thật nằm ở doanh thu vé, không ở số lượt đổi.

## Tự luyện ba phút

Phí 100.000đ, chi phí 40.000đ. Đề xuất tăng lên 130.000đ.

*Đáp án:* lãi góp từ 60.000đ lên 90.000đ. Ngưỡng khoảng **33,3%**.
`);

LRDX("i-price-3", `
## Giám khảo hỏi tiếp

**"B được lợi gì khi theo giá?"** Nếu B không theo: 700 × 0,4 = **280**. Nếu B theo: 1.000 × 0,3 = **300**. B chọn theo. Và khi B theo, A chỉ còn 300 thay vì 400 ban đầu.

> "Đặt mình vào ghế B: không theo thì còn 280, theo thì 300. B sẽ theo. A giảm giá chỉ để cả hai cùng mất 100."

**"Nếu chi phí biến đổi chỉ 40% giá?"** Lãi góp mỗi đơn vị 0,6, sau giảm giá 0,5. A khi B không theo: 1.300 × 0,5 = **650**, hơn 600 hiện tại. Nhưng B: không theo 700 × 0,6 = 420, theo 1.000 × 0,5 = 500 — B vẫn theo. A còn **500**. Biên cao hơn làm giảm giá hấp dẫn hơn trên giấy, nhưng không đổi phản ứng của đối thủ.

**"Vậy A nên làm gì?"** Tìm cách giành thị phần mà B **không sao chép được ngay**: chương trình khách hàng thân thiết, vị trí cửa hàng, sản phẩm khác biệt. Trong thị trường hai người chơi ngang nhau, giá là vũ khí dễ bị đáp trả nhất.

## Cùng khung, ngành khác: hai hãng bay trên một tuyến

Hai hãng mỗi bên chở **200.000** khách mỗi năm trên một tuyến. Giá vé **1,5 triệu**, chi phí biến đổi mỗi khách **500.000đ**: lãi góp **1 triệu** mỗi khách, **200 tỷ** mỗi hãng. Hãng A giảm giá **15%**, lãi góp còn **775.000đ**.

- B không theo, A lên 260.000 khách: A **201,5 tỷ**. B còn 140.000 khách: **140 tỷ**.
- B theo: mỗi hãng 200.000 khách × 775.000đ = **155 tỷ**.

B chọn theo (155 > 140). A còn 155 tỷ — mất 45 tỷ.

Khác chuỗi cà phê ở chỗ hãng bay có **công suất ghế cố định**. Nếu A không đủ ghế để chở thêm 60.000 khách, kịch bản "B không theo" còn không xảy ra được. Trong case hàng không, luôn hỏi công suất trước khi tính thị phần.

## Tự luyện ba phút

A có 1.000 đơn vị, lãi góp 0,5 mỗi đơn vị. Sau giảm giá, lãi góp còn 0,4. B theo giá, thị phần không đổi.

*Đáp án:* A từ **500** xuống **400**, mất **100**.
`);
