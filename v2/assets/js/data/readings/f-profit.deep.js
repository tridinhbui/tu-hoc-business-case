/* Phần đào sâu cho module Profitability — mỗi bài ba mục: giám khảo hỏi tiếp · cùng khung ở ngành khác · tự luyện.
   Mọi con số được tính lại trong tests/readings.test.js (mảng DEEP). */

LRDX("f-profit-1", `
## Giám khảo hỏi tiếp

Trả lời đúng "lợi nhuận giảm 1,5 triệu" mới qua được câu hỏi đầu. Người phỏng vấn thường hỏi thêm ba câu, và mỗi câu kiểm tra một thói quen khác.

**"Chi phí nào tăng nhanh nhất?"** Đừng liệt kê bốn dòng theo thứ tự trong bảng. Xếp theo số tiền tăng. Tổng chi phí tăng từ 197,5 lên 249 triệu, tức **51,5 triệu**. Nguyên liệu tăng 26,5 triệu, nhưng trong đó 17,5 triệu chỉ là vì bán nhiều hơn ở tỷ lệ cũ 35%; phần thật sự đáng lo là **9 triệu** do tỷ lệ lên 38%. Marketing tăng **20 triệu**. Lương tăng 5 triệu.

> "Hai nguồn chính là marketing tăng 20 triệu và tỷ lệ nguyên liệu tăng 3 điểm, tương đương 9 triệu. Phần nguyên liệu tăng theo doanh thu thì bình thường."

**"Tháng sau cắt marketing về 10 triệu thì sao?"** Câu này là bẫy. Nếu doanh thu giữ 300 triệu, lợi nhuận lên 71 triệu. Nhưng nếu 50 triệu doanh thu tăng thêm chính là do marketing kéo về, doanh thu quay lại 250 triệu, và với tỷ lệ nguyên liệu 38% cùng lương 60 triệu đã tăng, lợi nhuận chỉ còn 250 − 95 − 60 − 45 − 10 = **40 triệu** — thấp hơn cả tháng trước.

> "Còn tuỳ doanh thu tăng thêm có phụ thuộc marketing không. Nếu có, cắt marketing đưa lợi nhuận về khoảng 40 triệu, vì nguyên liệu và lương đã lên mức mới."

**"Vậy có nên mở chi nhánh?"** Trả lời bằng biên: 21% tháng trước, 17% tháng này. Mở chi nhánh khi biên đang mỏng đi là nhân bản một mô hình đang xấu đi.

## Cùng khung, ngành khác: xưởng in bao bì

Một xưởng in bao bì báo doanh thu năm tăng từ **2 tỷ lên 2,4 tỷ**, tức 20%. Lợi nhuận đi từ **300 triệu xuống 240 triệu**. Biên từ 15% xuống 10%.

Khác quán trà sữa ở chỗ nào? Ở xưởng in, doanh thu tăng thường đến từ **đơn hàng lớn giá thấp**: khách lớn đòi chiết khấu, và máy phải chạy thêm ca đêm với lương cao hơn. Vẫn cùng một khung — tách doanh thu, tách từng dòng chi phí, tính biên hai kỳ — nhưng câu hỏi tiếp theo sẽ là "đơn hàng mới có giá bán mỗi đơn vị thấp hơn không" thay vì "marketing có hiệu quả không".

Khung không đổi theo ngành. Chỗ thay đổi là **giả thuyết đầu tiên** bạn kiểm tra.

## Tự luyện ba phút

Tiệm bánh ngọt: tháng trước doanh thu 500 triệu, giá vốn 40% doanh thu, chi phí cố định 180 triệu. Tháng này doanh thu 550 triệu, giá vốn 42%, chi phí cố định 190 triệu.

Lợi nhuận tăng hay giảm? Biên tăng hay giảm?

*Đáp án:* tháng trước 500 − 200 − 180 = **120 triệu**, biên 24%. Tháng này 550 − 231 − 190 = **129 triệu**, biên khoảng **23,5%**. Lợi nhuận tăng 9 triệu nhưng biên mỏng đi nửa điểm — một tín hiệu nhỏ, đáng theo dõi thêm một tháng trước khi kết luận.
`);

LRDX("f-profit-3", `
## Giám khảo hỏi tiếp

**"Nếu doanh thu giảm 10% thì sao?"** Đòn bẩy hoạt động cắt theo cả hai chiều. Doanh thu 900 triệu, lãi góp 720, trừ 600 cố định còn **120 triệu** — lợi nhuận giảm **40%**, đúng gấp bốn lần mức giảm doanh thu.

> "Đòn bẩy 4 lần theo cả hai hướng. Doanh thu giảm 10% thì lợi nhuận giảm 40%, về 120 triệu."

**"Đòn bẩy có giữ nguyên khi doanh nghiệp lớn lên không?"** Không. Ở doanh thu 1.100 triệu, lãi góp 880, lợi nhuận 280, đòn bẩy còn 880 ÷ 280 ≈ **3,1**. Càng xa điểm hoà vốn, đòn bẩy càng giảm. Đây là lý do doanh nghiệp vừa qua hoà vốn có lợi nhuận nhảy vọt khi doanh thu tăng, còn doanh nghiệp đã lớn thì không.

**"Vậy có nên giảm đòn bẩy không?"** Tuỳ độ chắc của doanh thu. Chuỗi gym có hội viên trả trước cả năm chịu được đòn bẩy cao. Doanh nghiệp doanh thu biến động mạnh nên chuyển một phần chi phí cố định thành biến đổi — ví dụ trả huấn luyện viên theo buổi thay vì lương cứng.

## Cùng khung, ngành khác: hãng hàng không

Hãng bay giá rẻ có doanh thu **5.000 tỷ**, chi phí biến đổi — nhiên liệu, phí sân bay, suất ăn — **60%**, chi phí cố định — thuê máy bay, lương phi công, bảo dưỡng định kỳ — **1.800 tỷ**. Lợi nhuận: 5.000 − 3.000 − 1.800 = **200 tỷ**.

Đòn bẩy hoạt động: lãi góp 2.000 ÷ lợi nhuận 200 = **10 lần**.

Doanh thu giảm chỉ 5% — một mùa thấp điểm yếu hơn dự báo — làm lãi góp giảm 100 tỷ và lợi nhuận **giảm một nửa**, còn 100 tỷ. Đó là lý do hàng không là ngành có lợi nhuận dao động mạnh nhất: biên đóng góp vừa phải, chi phí cố định khổng lồ, lợi nhuận nằm sát điểm hoà vốn.

Khi gặp một case hàng không, khách sạn hay nhà máy công suất lớn, hãy tính đòn bẩy ngay từ đầu. Nó cho biết một thay đổi nhỏ về doanh thu sẽ phóng to thành bao nhiêu.

## Tự luyện ba phút

Tiệm cắt tóc: doanh thu 400 triệu một năm, chi phí biến đổi 30% (dầu gội, hoa hồng thợ), chi phí cố định 220 triệu.

Tính đòn bẩy hoạt động, rồi tính lợi nhuận tăng bao nhiêu phần trăm nếu doanh thu tăng 15%.

*Đáp án:* lãi góp 280, lợi nhuận 60, đòn bẩy 280 ÷ 60 ≈ **4,7**. Doanh thu tăng 15% thêm 42 triệu lãi góp, lợi nhuận lên **102 triệu**, tăng **70%**.
`);

LRDX("f-profit-4", `
## Giám khảo hỏi tiếp

**"Nếu tăng giá lên 28.000đ và mất 10% số ly?"** Lãi góp mỗi ly lên 18.000đ. Sản lượng 2.250 ly. Lợi nhuận: 2.250 × 18.000 − 30 triệu = **10,5 triệu**, so với 7,5 triệu ở kế hoạch gốc. Điểm hoà vốn mới: 30 triệu ÷ 18.000 ≈ **1.667 ly**. Biên an toàn lên khoảng **26%**.

> "Tăng giá 3.000đ dù mất 10% khách vẫn tốt hơn: lợi nhuận từ 7,5 lên 10,5 triệu, và biên an toàn tăng từ 20% lên khoảng 26%."

**"Hoà vốn tiền mặt khác hoà vốn kế toán thế nào?"** Trong 30 triệu chi phí cố định có khoản khấu hao xe, giả sử 3 triệu mỗi tháng. Khấu hao không phải chi tiền hằng tháng. Hoà vốn tiền mặt: 27 triệu ÷ 15.000 = **1.800 ly**. Người mới mở kinh doanh cần biết cả hai: dưới 1.800 ly là phải bỏ thêm tiền túi; từ 1.800 tới 2.000 ly là chưa lỗ tiền mặt nhưng chưa thu hồi được chiếc xe.

**"Muốn lãi 15 triệu mỗi tháng thì cần bao nhiêu ly?"** Cộng lợi nhuận mục tiêu vào chi phí cố định: (30 + 15) triệu ÷ 15.000 = **3.000 ly**, tức 100 ly mỗi ngày. Câu hỏi tiếp theo tự nhiên: một xe cà phê có bán nổi 100 ly mỗi ngày không.

## Cùng khung, ngành khác: lớp tiếng Anh

Một trung tâm mở lớp tiếng Anh: học phí **4 triệu** mỗi học viên mỗi khoá, chi phí biến đổi — giáo trình, hoa hồng tư vấn — **1 triệu** mỗi học viên. Chi phí cố định mỗi khoá — lương giáo viên, thuê phòng — **60 triệu**. Lớp tối đa 25 người.

Hoà vốn: 60 triệu ÷ 3 triệu = **20 học viên**.

Ở ngành này, biên an toàn bị **trần công suất** giới hạn. Lớp đầy 25 người cũng chỉ có biên an toàn 20%. Lớp 22 người có biên an toàn khoảng **9%** — hai học viên bỏ học giữa chừng là lỗ.

Đây là điểm khác quan trọng so với xe cà phê: khi sản lượng tối đa bị giới hạn, cách duy nhất để tăng biên an toàn là **hạ điểm hoà vốn** — tăng học phí, giảm chi phí cố định mỗi khoá — chứ không phải "bán nhiều hơn".

## Tự luyện ba phút

Tiệm giặt ủi: giá 40.000đ mỗi kg, chi phí biến đổi — điện, nước, hoá chất — 12.000đ mỗi kg, chi phí cố định 56 triệu mỗi tháng. Dự kiến 2.800 kg mỗi tháng.

Tính điểm hoà vốn và biên an toàn.

*Đáp án:* lãi góp 28.000đ mỗi kg, hoà vốn 56 triệu ÷ 28.000 = **2.000 kg**. Biên an toàn (2.800 − 2.000) ÷ 2.800 ≈ **28,6%**.
`);

LRDX("f-profit-5", `
## Giám khảo hỏi tiếp

**"Biên gộp 55% là cao hay thấp?"** Không trả lời được nếu không có mốc. Nếu người phỏng vấn cho biết chuỗi đối thủ có biên gộp 62%, khoảng cách 7 điểm trên 200 tỷ doanh thu là **14 tỷ** — gần bằng toàn bộ EBITDA 16 tỷ hiện tại. Đây là con số khiến câu chuyện nguyên liệu trở nên nghiêm trọng.

> "Nếu đưa được biên gộp lên ngang đối thủ 62%, EBITDA gần như tăng gấp đôi. Em muốn biết khoảng cách đến từ giá mua nguyên liệu hay từ định lượng mỗi ổ."

**"Giảm nguyên liệu từ 45% xuống 42% thì EBITDA thành bao nhiêu?"** 3 điểm × 200 tỷ = 6 tỷ. EBITDA lên **22 tỷ**, biên EBITDA **11%**.

**"Sao dùng EBITDA mà không dùng lợi nhuận ròng?"** Vì câu hỏi là vận hành. Lãi vay phụ thuộc cách công ty vay nợ, thuế phụ thuộc chính sách, khấu hao phụ thuộc lịch đầu tư quá khứ. EBITDA tách phần vận hành ra khỏi ba thứ đó.

## Cùng khung, ngành khác: chuỗi nha khoa

Chuỗi nha khoa có doanh thu **50 tỷ**. Vật tư nha khoa 10 tỷ (20%). Chi phí biến đổi khác — hoa hồng giới thiệu, phí thanh toán — 2,5 tỷ (5%). Chi phí cố định phòng khám — bác sĩ lương cứng, thuê mặt bằng, khấu hao ghế nha — 22 tỷ (**44%**). Chi phí chung 6 tỷ (12%). Khấu hao, lãi vay, thuế còn lại 5,5 tỷ.

Đi xuống từng bậc: lợi nhuận gộp 40 tỷ (biên 80%), lãi góp 37,5 tỷ (75%), lợi nhuận phòng khám 37,5 − 22 = 15,5 tỷ (31%), EBITDA 9,5 tỷ (biên **19%**), lợi nhuận ròng **4 tỷ** (8%).

Khác hẳn Lúa Vàng: bước rơi lớn nhất không nằm ở nguyên liệu mà ở **chi phí cố định phòng khám**, vì đội bác sĩ là chi phí cố định. Đòn bẩy nằm ở **công suất ghế nha**: mỗi giờ ghế trống là chi phí cố định không tạo ra doanh thu.

Cùng cầu thang năm bậc, nhưng mô hình kinh doanh quyết định bậc nào dốc nhất.

## Tự luyện ba phút

Nhà sách online: doanh thu 20 tỷ, giá vốn 60%, phí sàn thương mại điện tử và giao hàng 15%, chi phí kho 2 tỷ, chi phí chung 1,5 tỷ.

Tính biên gộp, biên đóng góp, biên EBITDA. Bước rơi nào lớn nhất?

*Đáp án:* gộp 8 tỷ (**40%**), đóng góp 5 tỷ (**25%**), sau kho 3 tỷ, EBITDA **1,5 tỷ (7,5%)**. Bước rơi lớn nhất là giá vốn (60 điểm), tiếp theo là phí sàn và giao hàng (15 điểm) — đòn bẩy nằm ở chiết khấu nhà xuất bản và tỷ trọng đơn bán qua website riêng.
`);

LRDX("f-profit-6", `
## Giám khảo hỏi tiếp

**"Nếu toàn bộ doanh thu mới đến qua app giao hàng?"** Biên đóng góp trung bình 45% là của cả chuỗi. Kênh app có biên đóng góp thấp hơn nhiều vì hoa hồng nền tảng: 12,5 tỷ lãi góp trên 50 tỷ doanh thu, tức **25%**. Mười hai tỷ doanh thu mới qua app chỉ mang về 3 tỷ lãi góp. Trừ 5 tỷ chi phí chiến dịch: **lỗ 2 tỷ**.

> "Kết quả đổi dấu theo kênh. Qua cửa hàng chiến dịch gần hoà vốn; qua app thì lỗ khoảng 2 tỷ. Em cần biết tỷ trọng kênh trước khi duyệt."

**"Khách mới có quay lại năm sau không?"** Đây là câu hỏi làm chiến dịch trông tốt hơn — và thường đúng. Nếu 30% doanh thu mới giữ được sang năm sau, thêm 12 × 30% × 45% = **1,62 tỷ** lãi góp năm hai, không tốn thêm chi phí chiến dịch. Nhưng chỉ đưa con số này vào khi có dữ liệu tỷ lệ giữ chân từ các chiến dịch trước.

**"Sao không dùng biên ròng cho an toàn?"** Biên ròng 4% trừ nhầm chi phí cố định. Dùng nó, 12 tỷ doanh thu chỉ mang về 0,48 tỷ, và mọi chiến dịch đều trông như lỗ — công ty sẽ không bao giờ đầu tư marketing.

## Cùng khung, ngành khác: shop thời trang online

Shop thời trang trên sàn thương mại điện tử có **biên gộp 50%**. Nhưng mỗi đơn còn chịu phí sàn, phí giao hàng và chi phí hoàn hàng, cộng lại **22%** doanh thu. Biên đóng góp chỉ **28%**.

Chủ shop định chạy quảng cáo **300 triệu**, kỳ vọng thêm **1 tỷ** doanh thu.

- Tính theo biên gộp: 1 tỷ × 50% = 500 triệu, trừ 300 triệu, lãi 200 triệu.
- Tính theo biên đóng góp: 1 tỷ × 28% = 280 triệu, trừ 300 triệu, **lỗ 20 triệu**.
- Ngưỡng hoà vốn: 300 triệu ÷ 28% ≈ **1,07 tỷ** doanh thu.

Trong thương mại điện tử, khoảng cách giữa biên gộp và biên đóng góp thường lớn hơn bán lẻ truyền thống rất nhiều, vì tỷ lệ hoàn hàng thời trang có thể lên tới hai con số.

## Tự luyện ba phút

Khách sạn: giá phòng 1,2 triệu mỗi đêm. Chi phí biến đổi mỗi đêm: dọn phòng và giặt ủi 150.000đ, hoa hồng đại lý đặt phòng 15% giá phòng. Một chương trình quảng cáo 60 triệu kỳ vọng thêm 100 đêm phòng.

Chương trình lãi bao nhiêu? Cần tối thiểu bao nhiêu đêm để hoà vốn?

*Đáp án:* hoa hồng 180.000đ, lãi góp mỗi đêm 870.000đ (**72,5%**). 100 đêm mang về 87 triệu, trừ 60 triệu còn **27 triệu**. Hoà vốn cần khoảng **69 đêm**.
`);

LRDX("f-profit-7", `
## Giám khảo hỏi tiếp

**"Nếu kênh app có bếp trung tâm riêng, thuê 15 tỷ mỗi năm?"** Bây giờ phép tính đổi. Ngừng app mất 12,5 tỷ lãi góp nhưng tiết kiệm được 15 tỷ chi phí cố định riêng. EBITDA tăng **2,5 tỷ**, lên 18,5 tỷ. Cắt là đúng — nhưng vì lý do chi phí riêng, không phải vì con số "lỗ 6 tỷ".

> "Quyết định không nằm ở khoản lỗ sau phân bổ. Nếu có bếp riêng 15 tỷ, cắt có lợi 2,5 tỷ. Nếu không có, cắt làm mất 12,5 tỷ."

**"Giảm hoa hồng app 2 điểm thì được bao nhiêu?"** 50 tỷ × 2% = **1 tỷ** lãi góp mỗi năm. Nhỏ hơn nhiều so với 12,5 tỷ kênh đang đóng góp, nhưng là cải thiện thật.

**"Phân bổ theo hoạt động thì có tốt hơn phân bổ theo doanh thu không?"** Tốt hơn cho việc hiểu chi phí — ví dụ phân bổ lương theo thời gian nhân viên thật sự làm đơn app. Nhưng vẫn không dùng được cho quyết định cắt: dù phân bổ khéo đến đâu, chi phí chung vẫn còn sau khi cắt.

## Cùng khung, ngành khác: chi nhánh ngân hàng

Một chi nhánh ngân hàng ở huyện có lãi góp — thu nhập lãi thuần cộng phí dịch vụ trừ chi phí biến đổi — **3 tỷ** mỗi năm. Chi phí riêng của chi nhánh — thuê mặt bằng, nhân sự tại chỗ — **2,2 tỷ**. Hội sở phân bổ thêm **1,5 tỷ** chi phí công nghệ và quản lý chung. Báo cáo: **lỗ 0,7 tỷ**.

Đóng chi nhánh: mất 3 tỷ lãi góp, tiết kiệm 2,2 tỷ chi phí riêng, 1,5 tỷ phân bổ vẫn còn. Kết quả toàn ngân hàng: **−0,8 tỷ**.

Nhưng ngân hàng có một yếu tố Lúa Vàng không có: **khách chuyển sang chi nhánh gần**. Nếu 40% khách chuyển sang chi nhánh thị xã cách 10 km và giữ nguyên quan hệ, giữ lại 1,2 tỷ lãi góp. Đóng chi nhánh thành **+0,4 tỷ**.

Cùng khung ba lớp — lãi góp, chi phí riêng, chi phí phân bổ — nhưng thêm lớp thứ tư: phần lãi góp chuyển sang đơn vị khác.

## Tự luyện ba phút

Nhà máy có ba dòng sản phẩm. Dòng C: doanh thu 40 tỷ, chi phí biến đổi 30 tỷ, chi phí cố định riêng — thuê một dây chuyền — 6 tỷ, chi phí phân bổ 8 tỷ. Báo cáo ghi dòng C lỗ 4 tỷ.

Có nên ngừng dòng C?

*Đáp án:* ngừng thì mất 10 tỷ lãi góp, tiết kiệm 6 tỷ thuê dây chuyền. Lợi nhuận toàn nhà máy **giảm 4 tỷ**. Giữ dòng C, và tìm cách tăng lãi góp của nó.
`);

LRDX("f-profit-8", `
## Giám khảo hỏi tiếp

**"Tỷ trọng bánh đặc biệt giảm bao nhiêu?"** Năm trước 2 trên 8 triệu ổ, tức 25%. Năm nay 1,5 trên 8,5 triệu, khoảng **17,6%**. Giảm hơn 7 điểm.

**"Nếu khôi phục giá bánh thường về 20.000đ?"** Cần giả định phản ứng của khách. Giả sử mất 0,5 triệu ổ bánh thường, và 0,3 triệu ổ quay lại bánh đặc biệt. Bánh thường: 6,5 triệu × 8.000 = 52 tỷ. Bánh đặc biệt: 1,8 triệu × 21.000 = 37,8 tỷ. Tổng **89,8 tỷ**, cao hơn năm nay **9,3 tỷ**.

> "Với giả định mất nửa triệu ổ thường và 0,3 triệu ổ quay lại bánh đặc biệt, khôi phục giá đưa lãi góp lên khoảng 89,8 tỷ — gần như bằng năm trước dù bán ít ổ hơn."

**"Làm sao biết giá và cơ cấu có cùng nguyên nhân?"** So các cửa hàng áp giá mới sớm với các cửa hàng áp muộn. Nếu tỷ trọng bánh đặc biệt chỉ giảm ở nhóm áp giá mới, đó là bằng chứng mạnh.

## Cùng khung, ngành khác: hãng điện thoại

Hãng điện thoại bán hai dòng. Dòng phổ thông lãi góp **1 triệu** mỗi máy, dòng cao cấp **5 triệu**. Năm trước: 800.000 máy phổ thông và 200.000 máy cao cấp, lãi góp **1.800 tỷ**, trung bình 1,8 triệu mỗi máy.

Năm nay giá không đổi, nhưng bán 900.000 máy phổ thông và 150.000 máy cao cấp. Lãi góp: 900 + 750 = **1.650 tỷ**. Giảm 150 tỷ dù bán thêm 50.000 máy.

- **Sản lượng:** +50.000 máy × 1,8 triệu = **+90 tỷ**.
- **Cơ cấu:** 1.650 − 1.050.000 × 1,8 triệu = 1.650 − 1.890 = **−240 tỷ**.
- **Giá:** không đổi, **0**.
- **Kiểm tra:** 90 − 240 = −150. Khớp.

Trong ngành điện thoại, dịch chuyển cơ cấu thường đến từ **chu kỳ sản phẩm**: dòng cao cấp đã ra mắt được hai năm, còn đối thủ vừa tung mẫu mới. Không phải lúc nào cơ cấu xấu đi cũng do giá.

## Tự luyện ba phút

Quán cà phê bán hai món. Cà phê đen lãi góp 15.000đ, latte lãi góp 30.000đ. Năm trước: 60.000 ly đen, 40.000 ly latte. Năm nay: 80.000 ly đen, 30.000 ly latte, và giảm giá latte làm lãi góp latte còn 27.000đ.

Tách thay đổi lãi góp thành sản lượng, cơ cấu và giá.

*Đáp án:* năm trước 2,1 tỷ, trung bình 21.000đ mỗi ly. Năm nay 1,2 + 0,81 = 2,01 tỷ, giảm 90 triệu. Sản lượng **+210 triệu**. Cơ cấu: 2,1 − 2,31 = **−210 triệu**. Giá: 30.000 ly × −3.000đ = **−90 triệu**. Cộng lại −90 triệu.
`);

LRDX("f-profit-9", `
## Giám khảo hỏi tiếp

**"Nếu chỉ 20% khách chuyển sang, không phải 30%?"** Lợi ích còn 6 + 30 × 20% × 45% = **8,7 tỷ**. Vẫn đáng đóng, nhưng khoảng cách với phương án đàm phán giá thuê thu hẹp lại.

**"Đàm phán giảm 30% tiền thuê thì sao?"** Trong 19,5 tỷ chi phí cố định của nhóm yếu, giả sử tiền thuê là 12 tỷ. Giảm 30% tiết kiệm **3,6 tỷ**. Nhóm yếu vẫn lỗ 2,4 tỷ. So với đóng cửa mang về 10,05 tỷ, đàm phán chỉ hợp lý cho những cửa hàng không có điểm Lúa Vàng nào gần.

> "Giảm 30% tiền thuê chỉ đưa nhóm yếu từ lỗ 6 xuống lỗ 2,4 tỷ. Em chỉ đàm phán ở cửa hàng không có điểm lân cận; cửa hàng có điểm lân cận thì đóng."

## Cùng khung, ngành khác: khách hàng doanh nghiệp của ngân hàng

Một ngân hàng có 1.000 khách hàng doanh nghiệp, tổng lợi nhuận **200 tỷ**. Tách theo nhóm:

- 200 khách lớn nhất: **+300 tỷ**
- 500 khách giữa: **+50 tỷ**
- 300 khách nhỏ nhất: **−150 tỷ**

Đường cong cá voi đạt đỉnh **350 tỷ**, tức 175% lợi nhuận thực tế. Hai mươi phần trăm khách tạo ra 150% lợi nhuận.

Nhưng "đóng" một nhóm khách khác hẳn đóng cửa hàng. Ngân hàng hiếm khi từ chối khách; họ **đổi cách phục vụ**: chuyển khách nhỏ sang kênh số, thu phí dịch vụ đúng chi phí, bỏ chuyên viên quan hệ riêng. Khung giữ nguyên — xếp hạng, cộng dồn, chẩn đoán — nhưng hành động là **sửa mô hình phục vụ** thay vì cắt bỏ.

## Tự luyện ba phút

Nhà phân phối có 50 mã hàng. 10 mã tốt nhất lãi góp sau chi phí kho riêng 8 tỷ, 30 mã giữa 3 tỷ, 10 mã cuối lỗ 1 tỷ. Mười mã cuối có doanh thu 5 tỷ. Nếu bỏ chúng, 40% doanh số chuyển sang các mã thay thế có biên đóng góp 20%.

Lợi nhuận tăng bao nhiêu?

*Đáp án:* bỏ khoản lỗ +1 tỷ, doanh số chuyển sang 5 × 40% × 20% = **0,4 tỷ**. Tổng **+1,4 tỷ**.
`);

LRDX("f-profit-10", `
## Giám khảo hỏi tiếp

**"Nếu doanh thu chỉ giảm 3%?"** 200 × 3% = 6 tỷ doanh thu, mất 2,7 tỷ lãi góp. Tác động ròng **+0,3 tỷ**. Dưới ngưỡng 3,3%, cắt marketing có lãi — nhưng rất mỏng.

**"Tác động đến chậm thì năm đầu trông thế nào?"** Giả sử quý đầu doanh thu chỉ giảm 1%, từ quý hai giảm đủ 8%. Với doanh thu mỗi quý 50 tỷ: mất 0,5 tỷ quý đầu và 12 tỷ ba quý sau, tổng 12,5 tỷ doanh thu, 5,625 tỷ lãi góp. Tác động ròng năm đầu **−2,625 tỷ**. Báo cáo quý đầu vẫn ghi EBITDA tăng khoảng 0,5 tỷ.

> "Quý đầu sẽ đẹp. Cả năm vẫn âm khoảng 2,6 tỷ nếu dự báo đúng. Em đề xuất đánh giá sau ba quý, không phải sau một quý."

## Cùng khung, ngành khác: công ty phần mềm

Công ty phần mềm muốn cắt 2 nhân viên kinh doanh, tiết kiệm **1,2 tỷ** mỗi năm. Mỗi người mang về khoảng **1,5 tỷ** doanh thu thuê bao mới mỗi năm. Biên đóng góp của phần mềm rất cao: **80%**.

Doanh thu mất 3 tỷ × 80% = **2,4 tỷ** lãi góp. Tác động ròng: 1,2 − 2,4 = **−1,2 tỷ** ngay năm đầu.

Và ở phần mềm, thiệt hại còn **cộng dồn**: khách thuê bao ký năm nay tiếp tục trả tiền các năm sau. Mỗi năm không có hai nhân viên đó là một lớp doanh thu định kỳ không bao giờ được xây. Biên đóng góp càng cao, chi phí tạo doanh thu càng đắt khi cắt.

## Tự luyện ba phút

Nhà hàng định cắt một nhân viên phục vụ giờ cao điểm, tiết kiệm 8 triệu mỗi tháng. Doanh thu tháng 600 triệu, biên đóng góp 60%. Quản lý ước tính hàng chờ dài hơn làm mất 3% doanh thu.

Tác động ròng mỗi tháng? Doanh thu được phép mất tối đa bao nhiêu phần trăm?

*Đáp án:* mất 18 triệu doanh thu, 10,8 triệu lãi góp. Tác động ròng **−2,8 triệu** mỗi tháng. Ngưỡng: 8 ÷ 60% ≈ 13,3 triệu, tức khoảng **2,2%** doanh thu.
`);

LRDX("f-profit-11", `
## Giám khảo hỏi tiếp

**"5 tỷ phải thu tương ứng bao nhiêu doanh thu đơn công ty?"** Với thời hạn 60 ngày, phải thu bằng khoảng 60 ngày doanh thu. Doanh thu đơn công ty mỗi năm ≈ 5 × 365 ÷ 60 ≈ **30 tỷ**. Kênh này đã chiếm khoảng 15% doanh thu 200 tỷ — không còn là thử nghiệm nhỏ.

**"Nếu mở 5 cửa hàng rải qua hai năm?"** Năm nay mở 2 cửa hàng, đầu tư 4 tỷ. Dòng tiền tự do: 6 − 4 = **+2 tỷ**. Không cần vay, đổi lại tăng trưởng chậm hơn một năm với ba cửa hàng.

> "Có hai cách tránh vay: rút thời hạn thanh toán giải phóng 2,5 tỷ, hoặc dời 3 trong 5 cửa hàng sang năm sau. Làm cả hai thì dòng tiền dương khoảng 4,5 tỷ."

**"Tồn kho tăng 3 tỷ có đáng lo không?"** Tuỳ lý do. Tích trữ bột trước đợt tăng giá là quyết định có chủ đích và có lợi nếu giá thật sự tăng. Tồn kho tăng vì dự báo bán sai là tín hiệu xấu. Hỏi lý do trước khi phán.

## Cùng khung, ngành khác: nhà phân phối vật liệu xây dựng

Nhà phân phối lãi ròng **20 tỷ**, khấu hao 3 tỷ, doanh thu tăng thêm **300 tỷ** trong năm nhờ trúng thầu cung cấp cho ba dự án lớn. Giá vốn 85% doanh thu.

Vốn lưu động tăng theo doanh thu tăng thêm:
- Phải thu 45 ngày: 300 × 45 ÷ 365 ≈ **+37 tỷ**
- Tồn kho 30 ngày giá vốn: 300 × 85% × 30 ÷ 365 ≈ **+21 tỷ**
- Phải trả nhà cung cấp 20 ngày: 300 × 85% × 20 ÷ 365 ≈ **+14 tỷ** (được giữ lại)

Vốn lưu động tăng ròng khoảng 44 tỷ. Dòng tiền hoạt động: 20 + 3 − 44 = **−21 tỷ**.

Ở ngành phân phối, biên mỏng và vốn lưu động lớn làm hiện tượng "lãi mà thiếu tiền" mạnh hơn nhiều so với chuỗi bánh mì: tăng trưởng càng nhanh, càng cần vay nhiều. Câu hỏi đúng trong case phân phối gần như luôn là **số ngày phải thu và số ngày phải trả**.

## Tự luyện ba phút

Một doanh nghiệp khởi nghiệp: lỗ ròng 2 tỷ, khấu hao 1 tỷ, tồn kho giảm 3 tỷ, phải thu tăng 1 tỷ, phải trả giảm 2 tỷ, đầu tư thiết bị 4 tỷ.

Tính dòng tiền hoạt động và dòng tiền tự do.

*Đáp án:* −2 + 1 + 3 − 1 − 2 = **−1 tỷ** dòng tiền hoạt động. Trừ 4 tỷ đầu tư: dòng tiền tự do **−5 tỷ**. Chú ý hai dấu: tồn kho giảm là tiền được giải phóng (cộng), phải trả giảm là tiền đã trả đi (trừ).
`);

LRDX("f-profit-12", `
## Giám khảo hỏi tiếp

**"Nếu tăng giá mất 8% sản lượng thay vì 5%?"** 6 triệu × 92% × 9.000đ = 49,68 tỷ, trừ 48 tỷ, chỉ còn **1,68 tỷ**. Tổng trong năm: 7,5 + 0,5 + 1,68 = **9,68 tỷ** — hụt mục tiêu dù việc đóng cửa hàng đúng tiến độ.

> "Kế hoạch nhạy với hai giả định: việc đóng cửa hàng đúng hạn và phản ứng của khách với giá. Mất 8% thay vì 5% sản lượng là đủ hụt mục tiêu."

**"Đòn bẩy dự phòng mang về bao nhiêu trong năm?"** Gộp kho tiết kiệm 2 tỷ mỗi năm. Nếu kích hoạt cuối tháng 3 và có hiệu lực từ tháng 7, được 6 tháng: **1 tỷ**. Đủ bù trường hợp mất 8% sản lượng, chưa đủ bù việc đóng cửa trễ một quý.

**"Chi phí đóng cửa một lần 5 tỷ tính vào đâu?"** Thường tách khỏi EBITDA vận hành như khoản bất thường. Nhưng phải nói ra, vì nó là **tiền mặt thật** chi trong năm — và bài dòng tiền trước đã cho thấy Lúa Vàng không dư tiền.

## Cùng khung, ngành khác: khách sạn nghỉ dưỡng

Khách sạn được giao mục tiêu tăng EBITDA **20 tỷ** trong năm. Ba đòn bẩy:

- Tăng giá phòng 5%: **12 tỷ** mỗi năm, hiệu lực 12 tháng → **12 tỷ**.
- Chuyển khách từ đại lý đặt phòng sang đặt trực tiếp, giảm hoa hồng: **8 tỷ** mỗi năm, cần làm lại website, hiệu lực 6 tháng → **4 tỷ**.
- Cải tạo nhà hàng tầng thượng: **10 tỷ** mỗi năm, hiệu lực 3 tháng → **2,5 tỷ**.

Cả năm: 30 tỷ. Trong năm: **18,5 tỷ**. Hụt mục tiêu 1,5 tỷ.

Khác Lúa Vàng ở chỗ: khách sạn có **mùa cao điểm**. Nếu nhà hàng tầng thượng xong đúng mùa cao điểm cuối năm, 3 tháng hiệu lực có thể mang về nhiều hơn 3/12 tác động cả năm. Khi doanh nghiệp có mùa vụ, tỷ lệ số tháng không còn chính xác — phải tính theo doanh thu của đúng những tháng có hiệu lực.

## Tự luyện ba phút

Nhà máy có mục tiêu tăng lợi nhuận 10 tỷ trong năm. Đòn bẩy A: 4 tỷ mỗi năm, hiệu lực 12 tháng. Đòn bẩy B: 6 tỷ mỗi năm, hiệu lực 8 tháng. Đòn bẩy C: 3 tỷ mỗi năm, hiệu lực 3 tháng.

Tổng cả năm và tổng trong năm là bao nhiêu? Có đạt mục tiêu không?

*Đáp án:* cả năm **13 tỷ**. Trong năm: 4 + 4 + 0,75 = **8,75 tỷ**. Không đạt; cần thêm một đòn bẩy khoảng 1,25 tỷ trong năm, hoặc đẩy nhanh B.
`);
