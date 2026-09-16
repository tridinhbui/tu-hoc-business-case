LRD("i-ops-1", `
"Bếp trung tâm của một chuỗi cơm văn phòng không kịp đơn giờ cao điểm. Ban điều hành định mua máy đóng hộp mới. Bạn nghĩ sao?"

Trước khi trả lời, hãy hỏi công suất của từng công đoạn. Người phỏng vấn đưa bốn con số mỗi giờ: sơ chế 500 suất, nấu 300, đóng hộp 450, giao cho shipper 400. Nhu cầu giờ cao điểm: 380 suất.

Bây giờ câu hỏi tự trả lời. Máy đóng hộp mới sẽ nâng công đoạn đóng hộp từ 450 lên 650 suất một giờ. Nhưng bếp vẫn chỉ làm ra **300 suất** một giờ, vì khâu nấu không đổi. Ba tỷ đồng mua máy để có thêm không suất nào.

## Một hệ thống chạy nhanh bằng công đoạn chậm nhất

Đây là nguyên tắc duy nhất của bài này, và nó đủ để giải phần lớn case vận hành.

Khi các công đoạn nối tiếp nhau, sản phẩm phải đi qua tất cả. Công đoạn chậm nhất quyết định tốc độ của cả dòng chảy, giống như một ống nước có một đoạn bị bóp: đường kính của các đoạn còn lại không quan trọng.

Hệ quả trực tiếp: **công suất hệ thống bằng công suất nhỏ nhất, không phải trung bình, càng không phải tổng**. Cộng bốn con số 500, 300, 450, 400 để ra 1.650 là một lỗi nghe buồn cười nhưng vẫn xuất hiện, thường dưới dạng tinh vi hơn — ví dụ tính "tổng năng lực nhân sự" của một quy trình.

## Đừng đọc tỷ lệ bận rộn của nhân viên

Có một cái bẫy quan sát rất mạnh trong các case vận hành: đi thăm xưởng và thấy ai cũng bận.

Thực tế, công đoạn **ngay sau nút thắt** thường trông nhàn rỗi nhất, vì hàng đến với họ nhỏ giọt. Người quản lý nhìn thấy nhân viên đóng hộp đứng chơi rồi làm dồn cuối ca, và kết luận rằng đóng hộp là vấn đề — trong khi đó chính là **triệu chứng** của nút thắt nằm phía trước.

Còn ở nút thắt, mọi người luôn bận và hàng chờ chất đống. Hai dấu hiệu này đi cùng nhau: **tỷ lệ sử dụng gần 100% và hàng chờ dài phía trước**.

## Nút thắt dịch chuyển

Giả sử chuỗi đầu tư nâng công suất khâu nấu lên 420 suất một giờ. Bây giờ bốn công đoạn là 500, 420, 450, 400.

Công suất hệ thống mới: **400 suất một giờ** — giới hạn bởi khâu giao cho shipper, nút thắt mới.

Đây là tính chất quan trọng và hay bị quên: nâng nút thắt không làm hệ thống chạy nhanh vô hạn, nó chỉ đẩy giới hạn tới công đoạn nhỏ tiếp theo. Mọi kế hoạch cải tiến vận hành phải trả lời câu "sau khi nâng cái này thì cái gì trở thành giới hạn".

Và ở đây có một tin tốt: 400 suất một giờ đã vượt nhu cầu 380. Nghĩa là **không cần nâng tiếp** — nâng hệ thống lên xa hơn nhu cầu là lãng phí vốn.

## Vì sao phải có đường nhu cầu trên biểu đồ

Một biểu đồ công suất bốn cột mà không có đường nhu cầu chỉ nói được "khâu nấu thấp nhất". Có đường nhu cầu 380, nó nói được hai điều nữa: hiện đang thiếu 80 suất một giờ, và sau khi nâng nấu thì đã đủ.

Đây là chi tiết trình bày nhỏ nhưng biến một biểu đồ mô tả thành một biểu đồ quyết định.

## Nút thắt không phải lúc nào cũng là máy móc

Trong nhiều case, nút thắt là thứ khó nhìn hơn: một người duy nhất có quyền phê duyệt, một phần mềm chạy chậm, một thủ tục kiểm tra, một giấy phép.

Cách tìm vẫn giống nhau: liệt kê các bước theo thứ tự, đo năng lực xử lý mỗi bước trong một đơn vị thời gian, tìm số nhỏ nhất. Với quy trình duyệt hồ sơ vay, "năng lực" có thể là số hồ sơ mỗi ngày; với bệnh viện, số bệnh nhân mỗi ca.

## Nói ra như thế nào

> "Trước khi bàn về máy đóng hộp, em xin công suất từng công đoạn mỗi giờ.

> Sơ chế 500, nấu 300, đóng hộp 450, giao cho shipper 400. Công suất hệ thống bằng công đoạn nhỏ nhất, tức 300 suất — khâu nấu là nút thắt.

> Nhu cầu giờ cao điểm là 380, nên đang thiếu 80 suất mỗi giờ.

> Máy đóng hộp mới sẽ không thêm được suất nào, vì đóng hộp đã nhanh hơn nấu. Em đề xuất nâng khâu nấu.

> Nếu nâng nấu lên 420, hệ thống sẽ đạt 400 — lúc đó nút thắt chuyển sang khâu giao, nhưng 400 đã vượt nhu cầu 380 nên không cần đầu tư thêm."

## Bốn chỗ hay trượt

**Đầu tư vào công đoạn không phải nút thắt.** Tiền bỏ ra không tạo thêm sản lượng.

**Cộng công suất các công đoạn.** Với quy trình nối tiếp, công suất là số nhỏ nhất.

**Quên nút thắt dịch chuyển.** Nâng xong một chỗ phải kiểm tra chỗ tiếp theo.

**Tối ưu vượt nhu cầu.** Nâng hệ thống lên xa hơn nhu cầu là lãng phí vốn.

## Trước khi sang phần bài tập

Phần dưới bắt bạn tìm nút thắt và tính công suất hệ thống sau khi nâng. Bài tiếp theo chuyển sang một bài toán vận hành khác: khi công suất đã dư mà đơn hàng lại bị từ chối vì giá thấp.
`);

LRD("i-ops-2", `
"Một nhà máy may chỉ chạy hai phần ba công suất. Một nhãn hàng đặt 100.000 áo với giá 65.000đ một chiếc, thấp hơn chi phí 80.000đ mỗi áo hiện tại. Giám đốc định từ chối."

Phản xạ của giám đốc rất tự nhiên: bán dưới giá thành là lỗ. Nhưng con số 80.000đ không phải thứ nên so với giá 65.000đ, và việc từ chối đơn này làm nhà máy mất 1,5 tỷ đồng mỗi tháng.

## Chi phí mỗi áo là một con số thay đổi

Nhà máy có công suất 600.000 áo một tháng, đang chạy 400.000. Chi phí cố định 12 tỷ một tháng, chi phí biến đổi 50.000đ mỗi áo.

Chi phí mỗi áo ở mức 400.000 áo: 50.000 + 12 tỷ ÷ 400.000 = 50.000 + 30.000 = **80.000đ**.

Nhưng nếu nhà máy chạy 500.000 áo: 50.000 + 12 tỷ ÷ 500.000 = 50.000 + 24.000 = **74.000đ**.

Cùng một nhà máy, cùng một chi phí cố định, chi phí mỗi áo khác nhau 6.000đ chỉ vì mẫu số khác. Đây là lý do "chi phí mỗi đơn vị" là một con số nguy hiểm khi dùng để ra quyết định: nó phụ thuộc vào sản lượng, mà sản lượng lại là thứ đang được quyết định.

## Quyết định đơn hàng thêm dựa trên chi phí biến đổi

Câu hỏi đúng: **nhận đơn này thì công ty giàu thêm hay nghèo đi?**

12 tỷ chi phí cố định đã phải trả dù có nhận đơn hay không. Nó không đổi, nên nó không liên quan đến quyết định này.

Thứ liên quan là: mỗi áo thu 65.000đ và tốn thêm 50.000đ chi phí biến đổi, tức **đóng góp 15.000đ**. Nhân 100.000 áo: **1,5 tỷ đồng lãi góp thêm mỗi tháng**.

Từ chối đơn hàng là từ chối 1,5 tỷ.

Nguyên tắc chung: **khi còn công suất trống, nhận đơn nếu giá cao hơn chi phí biến đổi**. Chi phí cố định không tham gia vào quyết định biên.

## Điều kiện quan trọng: phải còn công suất trống

Nguyên tắc trên chỉ đúng khi nhà máy còn chỗ. Ở đây còn 200.000 áo công suất trống, đơn hàng 100.000 áo vừa vặn.

Nếu nhà máy đã chạy đầy, đơn giá thấp sẽ **đẩy ra** một đơn giá cao. Lúc đó phép tính đổi hẳn: đơn mới phải bù được cả lãi góp của đơn bị đẩy ra. Một đơn 65.000đ đẩy ra một đơn 90.000đ là mất 25.000đ mỗi áo.

Vì vậy câu đầu tiên khi gặp bài toán này luôn là: **còn công suất trống không, và còn bao nhiêu?**

## Rủi ro thật: khách hàng hiện tại

Phép tính nói nên nhận. Nhưng có một rủi ro không nằm trong bảng tính: nếu các khách hàng đang trả 90.000đ biết có người mua được 65.000đ, họ sẽ đòi mức tương tự.

Nhà máy có 400.000 áo đang bán ở giá cao. Nếu chỉ 20% trong số đó đòi giảm về 65.000đ, thiệt hại vượt xa 1,5 tỷ lãi góp vừa kiếm được.

Cách xử lý trong thực tế: điều khoản bảo mật giá, bán cho thị trường khác về địa lý, hoặc làm dưới nhãn hàng của khách (gia công không mang thương hiệu) để hàng không xuất hiện cạnh sản phẩm giá cao trên cùng kệ.

Nêu được rủi ro này và cách xử lý là phần nâng câu trả lời từ "đúng về toán" lên "làm được trong thực tế".

## Nói ra như thế nào

> "Con số 80.000đ chi phí mỗi áo gồm 50.000đ biến đổi và 30.000đ phân bổ chi phí cố định. Phần cố định không đổi dù có nhận đơn hay không, nên nó không thuộc về quyết định này.

> Mỗi áo trong đơn mới thu 65.000đ, tốn thêm 50.000đ, đóng góp 15.000đ. Nhân 100.000 áo là 1,5 tỷ lãi góp thêm mỗi tháng.

> Nhà máy còn 200.000 áo công suất trống nên đơn này không đẩy đơn nào ra. Và ở mức 500.000 áo, chi phí mỗi áo còn 74.000đ.

> Em đề xuất nhận, kèm điều khoản bảo mật giá — vì rủi ro lớn nhất là khách đang trả 90.000đ biết được mức giá này."

## Bốn chỗ hay trượt

**So giá đơn hàng với chi phí đầy đủ.** Chi phí cố định không đổi nên không thuộc quyết định biên.

**Không kiểm tra công suất.** Khi đã chạy đầy, kết luận đảo ngược hoàn toàn.

**Phân bổ chi phí cố định theo công suất thay vì sản lượng thực.** Cho ra con số chi phí đơn vị sai.

**Bỏ qua phản ứng của khách hiện tại.** Rủi ro lớn nhất của đơn hàng giá thấp.

## Trước khi sang phần bài tập

Phần dưới bắt bạn tính chi phí mỗi áo và quyết định dựa trên lãi góp. Bài cuối module xử lý mặt trái của vận hành: cắt giảm chi phí, và những khoản cắt xong thì mất nhiều hơn được.
`);

LRD("i-ops-3", `
"Một chuỗi bán lẻ doanh thu 4.000 tỷ, biên lợi nhuận gộp 25%, cần cắt 50 tỷ chi phí. Bốn phương án đang được cân nhắc."

Cách làm phổ biến nhất trong thực tế là cắt đều: yêu cầu mọi phòng ban giảm chi phí một tỷ lệ như nhau. Cách này công bằng về hình thức và tệ về kết quả, vì nó cắt cả những khoản đang tạo ra doanh thu.

Cách làm đúng là tính **tác động ròng** của từng khoản cắt.

## Chi phí tạo doanh thu và chi phí không tạo doanh thu

Bốn phương án trên bàn:

Cắt đào tạo nhân viên bán hàng: tiết kiệm 20 tỷ, nhưng doanh thu dự kiến giảm 3%.
Gộp kho khu vực: tiết kiệm 20 tỷ, không ảnh hưởng doanh thu.
Đàm phán lại giá thuê mặt bằng: tiết kiệm 15 tỷ, không ảnh hưởng doanh thu.
Bỏ các chương trình khuyến mãi kém hiệu quả: tiết kiệm 15 tỷ, doanh thu giảm 0,5%.

Hai khoản đầu tiết kiệm bằng nhau — 20 tỷ — nhưng một khoản chạm vào doanh thu còn khoản kia thì không. Đó là toàn bộ sự khác biệt.

## Tính tác động ròng

Công thức: **tác động ròng = tiền tiết kiệm − lợi nhuận gộp mất đi do doanh thu giảm**.

Chú ý vế thứ hai: doanh thu mất đi không phải thiệt hại toàn phần. Khi mất 120 tỷ doanh thu, công ty cũng không phải bỏ ra phần giá vốn tương ứng. Thiệt hại thật là **lợi nhuận gộp** trên phần doanh thu đó.

Cắt đào tạo: doanh thu giảm 3% × 4.000 tỷ = 120 tỷ. Lợi nhuận gộp mất: 120 × 25% = 30 tỷ. Tác động ròng: 20 − 30 = **−10 tỷ**. Cắt khoản này làm lợi nhuận **giảm** 10 tỷ.

Gộp kho: +20 tỷ. Đàm phán giá thuê: +15 tỷ. Bỏ khuyến mãi kém: doanh thu giảm 0,5% × 4.000 = 20 tỷ, lợi nhuận gộp mất 5 tỷ, tác động ròng 15 − 5 = **+10 tỷ**.

## Chọn gói tối ưu

Mục tiêu là cắt 50 tỷ chi phí.

**Gói A:** gộp kho 20 + giá thuê 15 + bỏ khuyến mãi 15 = 50 tỷ tiết kiệm, tác động ròng 20 + 15 + 10 = **+45 tỷ**.

**Gói B:** đào tạo 20 + gộp kho 20 + giá thuê 15 = 55 tỷ tiết kiệm, tác động ròng −10 + 20 + 15 = **+25 tỷ**.

**Gói C — cắt cả bốn:** 70 tỷ tiết kiệm, tác động ròng +35 tỷ.

Gói A đạt đúng mục tiêu tiết kiệm và cho tác động ròng cao nhất. Đáng chú ý: cắt nhiều hơn (gói C) lại cho kết quả kém hơn, vì nó bao gồm khoản có tác động âm.

Đây là điểm cần nhấn mạnh khi trình bày: **mục tiêu không phải cắt được nhiều nhất mà là làm lợi nhuận cao nhất**.

## Vì sao tác động lên doanh thu khó thấy

Có một lý do khiến việc cắt chi phí tạo doanh thu vẫn phổ biến dù ai cũng biết là sai: **độ trễ**.

Cắt ngân sách đào tạo tháng này thì tiết kiệm xuất hiện ngay trong báo cáo tháng sau. Doanh thu giảm vì nhân viên bán kém hơn thì phải sáu đến mười hai tháng mới hiện rõ, và khi đó người ta thường quy cho thị trường, cho đối thủ, cho mùa vụ.

Vì vậy khuyến nghị cắt chi phí nên luôn kèm **cơ chế theo dõi**: đo doanh thu mỗi cửa hàng và tỷ lệ chuyển đổi bán hàng trong hai quý sau khi cắt, so với nhóm cửa hàng chưa áp dụng nếu có thể.

## Nói ra như thế nào

> "Em tính tác động ròng của từng khoản, tức tiền tiết kiệm trừ lợi nhuận gộp mất đi.

> Cắt đào tạo tiết kiệm 20 tỷ nhưng làm doanh thu giảm 3%, tức 120 tỷ, nhân biên gộp 25% là mất 30 tỷ lợi nhuận. Tác động ròng âm 10 tỷ — khoản này không nên cắt.

> Gộp kho và đàm phán giá thuê không chạm doanh thu: cộng 35 tỷ. Bỏ khuyến mãi kém hiệu quả tiết kiệm 15, mất 5, ròng cộng 10.

> Gói gộp kho, giá thuê và khuyến mãi đạt đúng 50 tỷ tiết kiệm với tác động ròng 45 tỷ — cao hơn mọi gói khác, kể cả gói cắt cả bốn khoản.

> Em đề xuất kèm theo dõi doanh thu mỗi cửa hàng trong hai quý, vì tác động của việc cắt thường đến chậm."

## Bốn chỗ hay trượt

**Chỉ nhìn số tiền tiết kiệm.** Bỏ qua phần doanh thu mất đi.

**Nhân doanh thu mất với 100%.** Chỉ phần lợi nhuận gộp mới là thiệt hại.

**Cắt đều mọi bộ phận.** Cắt cả những khoản tạo ra doanh thu.

**Đo tác động quá sớm.** Doanh thu thường giảm sau sáu đến mười hai tháng.

## Trước khi sang phần bài tập

Phần dưới bắt bạn tính tác động ròng của từng khoản và chọn gói tối ưu. Module tiếp theo quay về một kỹ năng dùng trong mọi họ case: đọc một biểu đồ lạ trong ba mươi giây.
`);
