LRD("c-tree-1", `
Bốn mươi tám giờ. Một nhà sản xuất nước mắm mất 60 tỷ EBITDA và đội của bạn phải tìm ra vì sao, rồi đề xuất cách xử lý.

Nếu dựng một issue tree đầy đủ — chia doanh thu và chi phí, mỗi nhánh lại chia tiếp, đủ mọi khả năng — bạn sẽ có một cây ba tầng với mười lăm nhánh. Đẹp, đầy đủ, và không đủ thời gian để đi hết. Ngày thứ nhất trôi qua trong việc thu thập dữ liệu rải rác cho mọi nhánh, và không nhánh nào có đủ dữ liệu để kết luận.

Cách làm của những đội thắng khác hẳn: họ chọn ba đến năm **giả thuyết** — mỗi giả thuyết là một câu khẳng định có thể đúng hoặc sai — rồi dành toàn bộ thời gian đi chứng minh hoặc bác bỏ chúng.

## Issue tree hỏi, hypothesis tree khẳng định

Đây là khác biệt cốt lõi.

Một nhánh của issue tree nghe như: *"Giá bán thay đổi thế nào?"* Đó là một câu hỏi. Bạn có thể trả lời nó, nhưng câu trả lời không tự động dẫn tới kết luận.

Một nhánh của hypothesis tree nghe như: *"EBITDA giảm vì nhà phân phối ép giá bán xuống 8% trong năm qua."* Đó là một khẳng định. Nó có thể sai, và chính vì có thể sai nên nó hữu ích: bạn biết ngay cần con số nào để kiểm chứng, và biết kết quả nào sẽ khiến bạn bỏ nó.

Khi nào dùng cái nào? **Issue tree khi bạn chưa hiểu gì về vấn đề** — nó đảm bảo không bỏ sót. **Hypothesis tree khi đã có manh mối và thời gian có hạn** — nó tập trung nguồn lực.

Trong một cuộc thi 48 giờ, bạn thường bắt đầu bằng một issue tree nhanh trong ba mươi phút để thấy toàn cảnh, rồi chuyển ngay sang hypothesis tree cho phần còn lại.

## Xếp thứ tự kiểm chứng: tác động nhân khả năng

Có ba giả thuyết và mười sáu giờ. Kiểm cái nào trước?

Bản năng là kiểm cái mình chắc chắn nhất, vì nó dễ. Đó là bản năng sai. Một giả thuyết chắc chắn nhưng chỉ giải thích được 5 tỷ trong khoản hụt 60 tỷ thì dù đúng cũng không đưa bạn tới đâu.

Tiêu chí đúng là **giá trị kỳ vọng = tác động nếu đúng × khả năng đúng**.

Ba giả thuyết của case nước mắm:

Giá bán bị nhà phân phối ép — nếu đúng giải thích 40 tỷ, khả năng ước 30%. Giá trị kỳ vọng: 12.

Sản lượng giảm ở kênh siêu thị — nếu đúng giải thích 60 tỷ, khả năng 50%. Giá trị kỳ vọng: 30.

Chi phí vận chuyển tăng — nếu đúng giải thích 25 tỷ, khả năng 80%. Giá trị kỳ vọng: 20.

Thứ tự: sản lượng siêu thị, rồi vận chuyển, rồi giá bán. Đáng chú ý là giả thuyết chắc chắn nhất (vận chuyển, 80%) lại không đứng đầu, vì tác động của nó nhỏ.

Con số khả năng đến từ đâu? Từ hiểu biết ngành, từ dấu hiệu trong đề, từ kinh nghiệm. Chúng là ước lượng thô và không cần chính xác — chúng chỉ cần đủ tốt để xếp thứ tự.

## Viết giả thuyết sao cho bác bỏ được

Một giả thuyết tốt phải kèm sẵn câu trả lời cho: **dữ liệu nào sẽ chứng minh nó sai?**

*"Sản lượng giảm ở kênh siêu thị"* — dữ liệu cần: sản lượng bán theo kênh trong ba năm. Nếu sản lượng siêu thị đi ngang hoặc tăng, giả thuyết chết, và bạn chuyển sang nhánh tiếp theo mà không tiếc.

Thái độ này quan trọng hơn kỹ thuật. Đội yếu bám lấy giả thuyết đầu tiên của mình và tìm dữ liệu ủng hộ nó; đội mạnh chủ động tìm dữ liệu giết nó, và chỉ giữ lại những gì sống sót.

## Bao nhiêu giả thuyết là đủ

Ba đến năm. Dưới ba thì rủi ro bỏ sót nguyên nhân thật quá cao. Trên năm thì không đủ thời gian kiểm chứng cái nào ra hồn, và bạn quay lại đúng vấn đề của issue tree đầy đủ.

Nếu thấy mình có tám giả thuyết, thường là do chúng chưa ở cùng một cấp — vài cái trong đó thực ra là nhánh con của cái khác. Gom lại.

## Nói ra như thế nào

> "Với 48 giờ, em sẽ dùng cây giả thuyết thay vì issue tree đầy đủ.

> Ba giả thuyết: giá bị nhà phân phối ép, sản lượng giảm ở kênh siêu thị, và chi phí vận chuyển tăng.

> Em ước tác động và khả năng cho từng cái: siêu thị 60 tỷ × 50% là 30, vận chuyển 25 tỷ × 80% là 20, giá 40 tỷ × 30% là 12.

> Nên em kiểm chứng sản lượng siêu thị trước — dữ liệu cần là sản lượng theo kênh ba năm gần nhất. Nếu sản lượng siêu thị không giảm, em bỏ nhánh này và sang vận chuyển."

## Bốn chỗ hay trượt

**Viết câu hỏi thay vì giả thuyết.** "Giá bán thế nào?" không kiểm chứng được và không dẫn tới kết luận.

**Kiểm chứng giả thuyết chắc chắn nhất trước.** Chắc chắn mà tác động nhỏ thì không giải thích được khoản hụt.

**Coi giả thuyết là kết luận.** Chỉ tìm dữ liệu ủng hộ là cách tự đưa mình vào bẫy.

**Quá nhiều giả thuyết.** Tám nhánh trong 48 giờ nghĩa là không nhánh nào được kiểm chứng đủ sâu.

## Trước khi sang phần bài tập

Phần dưới bắt bạn xếp hạng ba giả thuyết bằng giá trị kỳ vọng. Bài tiếp theo quay lại kỹ thuật dựng cây: làm sao chia nhánh để không chồng lấn và không bỏ sót, và kiểm tra điều đó bằng một phép cộng đơn giản.
`);

LRD("c-tree-2", `
Một chuỗi mỹ phẩm doanh thu 1.000 tỷ muốn tăng trưởng. Đội thi chia khách hàng thành hai nhóm để phân tích: **khách mua online** và **khách trẻ tuổi**.

Ban giám khảo nhìn slide cấu trúc và biết ngay bài này sẽ có vấn đề. Một cô gái 24 tuổi mua online thuộc cả hai nhóm. Một người 45 tuổi mua tại cửa hàng không thuộc nhóm nào. Cộng hai nhóm lại không ra tổng doanh thu, và bất kỳ con số nào tính trên cấu trúc đó đều không đáng tin.

MECE — không chồng lấn, không bỏ sót — nghe như một thuật ngữ trang trí, nhưng nó có một phép thử rất cụ thể mà ban giám khảo dùng trong ba giây: **cộng các nhánh có ra đúng nút cha không?**

## Hai cách chia luôn đạt MECE

**Chia theo công thức.** Doanh thu = khách cũ + khách mới. Khách cũ = số khách × tần suất × giá trị đơn. Lợi nhuận = doanh thu − chi phí. Khi cây đi theo một đẳng thức toán học, nó tự động MECE, vì phép cộng hoặc phép nhân đảm bảo điều đó.

**Chia theo đối lập.** Trong nước / nước ngoài. Online / cửa hàng. Khách cũ / khách mới. Sản phẩm A / không phải A. Hai nhánh loại trừ nhau và phủ hết.

Cả hai cách này đều an toàn. Cách nguy hiểm là chia theo **danh sách tự nghĩ ra**: "nhóm quan tâm giá, nhóm quan tâm chất lượng, nhóm quan tâm thương hiệu" — vì một khách có thể quan tâm cả ba.

## Quy tắc quan trọng nhất: một tiêu chí cho một tầng

Lỗi của đội trong ví dụ mở đầu không phải chọn sai tiêu chí, mà là **trộn hai tiêu chí trong cùng một tầng**: kênh mua (online) và độ tuổi (trẻ).

Nếu muốn dùng cả hai, hãy xếp chúng thành hai tầng: tầng một chia theo kênh (online / cửa hàng), tầng hai trong mỗi kênh chia theo độ tuổi. Lúc đó mỗi khách nằm đúng một ô, và cộng lại vẫn ra tổng.

Quy tắc này đơn giản nhưng nó bắt được gần như mọi lỗi MECE trong các bài thi.

## Nhánh "khác" và giới hạn của nó

Đôi khi bạn không thể liệt kê hết và phải có một nhánh "khác". Điều đó chấp nhận được — nhưng **nếu nhánh "khác" lớn hơn 10 đến 15%, cây của bạn chưa tốt**.

Lý do: một nhánh "khác" chiếm 30% doanh thu nghĩa là bạn không hiểu gần một phần ba hoạt động của doanh nghiệp, và mọi kết luận đều có một lỗ hổng cỡ đó.

## Làm mẫu: chuỗi mỹ phẩm

Chia theo khách cũ và khách mới — MECE, vì mỗi đơn hàng thuộc đúng một nhóm.

Nhánh khách cũ chia tiếp theo công thức: số khách × tần suất × giá trị đơn. Số liệu: 200.000 khách cũ, mua 6 lần một năm, giá trị đơn trung bình 600.000đ.

Doanh thu khách cũ: 200.000 × 6 × 600.000 = **720 tỷ**.

Khách mới: 1.000 − 720 = 280 tỷ. Hai nhánh cộng lại đúng 1.000 tỷ — cây đạt MECE, và bạn vừa tự kiểm tra bằng phép cộng.

Chú ý phép nhân: 200.000 × 6 = 1,2 triệu lượt mua, nhân 600.000đ = 720 tỷ. Đây lại là chỗ dễ trượt một bậc 1.000; đọc đơn vị thành tiếng.

Con số 720 tỷ — 72% doanh thu — lập tức định hướng phần còn lại của bài: cây tăng trưởng nên bắt đầu từ khách cũ, và trong ba biến của nhánh đó, tần suất thường là biến dễ tác động nhất bằng chương trình khách hàng thân thiết.

## Ghi số lên cây

Một cây không có số là một sơ đồ. Một cây có số ở mỗi nút là một phân tích.

Khi ban giám khảo nhìn slide cấu trúc, họ làm hai việc trong vài giây: cộng nhẩm các nhánh xem có ra tổng không, và tìm nhánh lớn nhất để hỏi. Nếu các nút không có số, họ không làm được việc nào, và slide đó trở thành trang trí.

## Nói ra như thế nào

> "Em sẽ chia doanh thu theo khách cũ và khách mới, vì mỗi đơn hàng thuộc đúng một nhóm và hai nhánh cộng lại bằng tổng.

> Khách cũ: 200.000 người, mua 6 lần một năm, giá trị đơn 600.000đ — tức 720 tỷ. Khách mới là phần còn lại, 280 tỷ.

> Vậy 72% doanh thu đến từ khách cũ, nên em sẽ đi vào nhánh này trước, chia tiếp thành số khách, tần suất và giá trị đơn.

> Em không chia theo kênh và độ tuổi cùng một tầng, vì một khách trẻ mua online sẽ nằm ở cả hai nhánh."

## Bốn chỗ hay trượt

**Trộn hai tiêu chí trong một tầng.** Kênh và độ tuổi chồng lấn nhau.

**Không cộng kiểm tra.** Bỏ sót một nhánh mà không biết.

**Nhánh "khác" quá lớn.** Dấu hiệu cây chưa chia đúng.

**Cây quá sâu.** Bốn, năm tầng không trình bày nổi trong mười lăm phút và không ai theo kịp.

## Trước khi sang phần bài tập

Phần dưới bắt bạn tìm ra cách chia không MECE trong bốn phương án và tính 720 tỷ. Bài cuối module biến cây thành lịch làm việc: mỗi nhánh cần dữ liệu gì, lấy ở đâu, mất bao lâu, và bỏ nhánh nào khi hết thời gian.
`);

LRD("c-tree-3", `
Đội đã có cây giả thuyết đẹp với năm nhánh. Ngày thứ nhất kết thúc, và không nhánh nào được kiểm chứng xong.

Lý do không phải lười. Ba người dành cả ngày tìm dữ liệu cho cả năm nhánh cùng lúc, mỗi nhánh một ít, và đến tối thì có rất nhiều con số rời rạc mà không con số nào đủ để kết luận một nhánh. Ngày thứ hai phải vừa phân tích vừa làm slide, và bài nộp cuối cùng có cấu trúc tốt nhưng bằng chứng mỏng.

Thứ còn thiếu là một kế hoạch dữ liệu gắn vào từng nhánh — và một quyết định dám bỏ bớt nhánh.

## Bốn dòng cho mỗi nhánh

Với mỗi nhánh của cây, viết ra bốn thứ trước khi bắt đầu tìm kiếm.

**Dữ liệu cần.** Con số cụ thể nào sẽ kiểm chứng giả thuyết này? Không phải "dữ liệu về doanh thu" mà "doanh thu trung bình mỗi cửa hàng của nhóm mở trước 2022 và nhóm mở sau 2022".

**Nguồn.** Có trong đề bài? Trong báo cáo thường niên công khai? Cần khảo sát nhanh? Hay phải tự ước lượng? Nguồn quyết định thời gian, và nhiều đội bỏ sót rằng phần lớn dữ liệu cần thiết đã nằm sẵn trong đề.

**Thời gian.** Ước lượng giờ-người. Ước sai cũng được, nhưng phải có con số để cộng lại.

**Quy tắc quyết định.** Câu quan trọng nhất, và phải viết **trước khi nhìn thấy dữ liệu**.

## Vì sao quy tắc quyết định phải viết trước

Một quy tắc quyết định là một câu dạng: *"Nếu doanh thu trung bình của cửa hàng mở sau 12 tháng thấp hơn 70% cửa hàng đã ổn định, thì giả thuyết 'cửa hàng mới chưa chín' là đúng."*

Viết nó trước khi có số làm hai việc. Thứ nhất, nó buộc bạn nghĩ rõ mình đang tìm gì, và nhờ đó tìm nhanh hơn. Thứ hai — quan trọng hơn — nó ngăn việc tự thuyết phục mình.

Nếu bạn nhìn số trước rồi mới quyết định ngưỡng, bạn sẽ vô thức chọn ngưỡng sao cho kết luận khớp với điều mình đã tin từ đầu. Con số 68% sẽ thành "gần 70%, đủ để kết luận" nếu bạn muốn giả thuyết đúng, và thành "chưa đạt ngưỡng 70%" nếu bạn muốn nó sai. Viết trước thì con số 68% có một nghĩa duy nhất.

## Cắt nhánh: quyết định khó nhưng cần

Năm nhánh với thời gian ước tính: nhánh 1 doanh thu cửa hàng mới 3 giờ (số có trong đề), nhánh 2 độ nhạy giá 6 giờ (cần khảo sát nhanh), nhánh 3 chi phí thuê 2 giờ (có trong đề), nhánh 4 hành vi khách của đối thủ 8 giờ (phải phỏng vấn), nhánh 5 chi phí vận hành 4 giờ (báo cáo ngành).

Tổng: 23 giờ-người. Quỹ thời gian còn lại trước mốc chốt phân tích: 16 giờ-người.

Phải bỏ. Bỏ nhánh nào? Nhánh 4: tốn nhiều nhất (8 giờ) và theo đánh giá của đội là có giá trị kỳ vọng thấp nhất. Bỏ nó còn **15 giờ-người**, vừa quỹ và còn 1 giờ dự phòng.

Nguyên tắc cắt: **theo tỷ lệ giá trị trên thời gian, không theo cảm tính**, và ghi lại lý do. Nếu ban giám khảo hỏi "sao các bạn không xem hành vi khách của đối thủ?", câu trả lời "chúng tôi cân nhắc nhưng nó cần 8 giờ phỏng vấn trong khi quỹ chỉ còn 16, và giá trị kỳ vọng thấp hơn ba nhánh kia" mạnh hơn nhiều so với sự im lặng.

## Kế hoạch dữ liệu thuộc về phụ lục

Slide kế hoạch dữ liệu hiếm khi xuất hiện trong phần trình bày chính — nó không phải thông điệp, nó là phương pháp. Nhưng đưa nó vào phụ lục là một trong những khoản đầu tư rẻ nhất cho vòng Q&A: khi ban giám khảo hỏi "các bạn kiểm chứng điều này thế nào", bạn mở đúng một slide và trả lời trong hai mươi giây.

## Nói ra như thế nào

> "Đội có năm nhánh nhưng chỉ còn 16 giờ-người trước mốc chốt phân tích.

> Cộng thời gian ước tính của năm nhánh là 23 giờ, nên phải bỏ một nhánh.

> Em đề xuất bỏ nhánh phỏng vấn khách của đối thủ: nó tốn 8 giờ, nhiều nhất trong năm nhánh, và giá trị kỳ vọng thấp nhất. Bốn nhánh còn lại cộng 15 giờ, vừa quỹ.

> Mỗi nhánh em đã viết sẵn quy tắc quyết định trước khi tìm dữ liệu, ví dụ nhánh cửa hàng mới: dưới 70% doanh thu của cửa hàng ổn định thì kết luận là chưa chín."

## Bốn chỗ hay trượt

**Tìm dữ liệu không có mục đích.** Mỗi con số phải gắn với một nhánh và một quy tắc.

**Viết quy tắc quyết định sau khi có số.** Cách chắc chắn để tự thuyết phục mình.

**Cố làm đủ mọi nhánh.** Vượt thời gian, và phần slide bị ép vào những giờ cuối.

**Bỏ nhánh theo cảm tính.** Bỏ theo thời gian và giá trị, và ghi lại lý do để trả lời khi bị hỏi.

## Trước khi sang phần bài tập

Phần dưới bắt bạn nhận diện một quy tắc quyết định tốt và tính lại tổng giờ sau khi cắt nhánh. Module tiếp theo lùi lại một bước về thời điểm sớm hơn của cuộc thi: đọc đề thế nào để không trả lời nhầm câu hỏi.
`);

LRD("c-tree-4", `
Bảng trắng của đội trông rất chuyên nghiệp. Ở gốc: "EBITDA giảm 60 tỷ". Toả ra sáu nhánh, mỗi nhánh một màu, mỗi nhánh có con số ước tính. Góc slide có dòng chữ quen thuộc: "Cây phân tích MECE".

Mentor đi qua, dừng lại ba giây, rồi hỏi: "Cộng sáu số này lại bằng bao nhiêu?"

Không ai cộng cả. Khi cộng: 21,6 cộng 18 cộng 12 cộng 5 cộng 8 cộng 3,4, bằng 68. Đề nói EBITDA giảm 60 tỷ.

Cây của đội đang giải thích nhiều hơn thực tế 8 tỷ. Chữ MECE ở góc slide vừa trở thành lời tự tố cáo.

## MECE là phép kiểm tra, không phải nhãn dán

MECE — không chồng lấn, không bỏ sót — là một trong những thuật ngữ được nhắc nhiều nhất và kiểm tra ít nhất trong thi case. Rất nhiều đội viết nó lên slide như một chứng chỉ chất lượng, nhưng chưa bao giờ thực sự thử.

Điều ít người nhận ra là MECE kiểm tra được bằng số, nhanh hơn nhiều so với kiểm tra bằng logic. Ba phép thử, mỗi phép mất chưa tới hai phút.

## Phép thử thứ nhất: cộng tổng

Ước tác động bằng số cho từng nhánh, cộng lại, và so với con số tổng trong đề.

Nếu tổng các nhánh lớn hơn tổng thật, cây đang đếm trùng ở đâu đó. Nếu nhỏ hơn, cây đang bỏ sót. Nếu bằng, cây qua được phép thử đầu tiên.

Đây là lý do mọi nhánh nên có một con số ngay từ khi dựng cây, dù chỉ là ước lượng thô. Một cây toàn chữ — "vấn đề về giá", "vấn đề về chi phí" — không kiểm tra được, và vì vậy không ai biết nó có MECE hay không cho tới khi giám khảo hỏi.

## Phép thử thứ hai: chồng lấn

Với cây Biển Đông, chênh lệch 8 tỷ trùng đúng với một nhánh: khuyến mãi kênh siêu thị.

Nhìn lại, điều này hợp lý. Khuyến mãi cho siêu thị thực chất là giảm giá bán cho kênh đó. Khi đội tính nhánh "giá bán giảm 21,6 tỷ" từ chênh lệch giá bán trung bình, con số đó đã bao gồm cả phần giảm giá cho siêu thị. Rồi đội lại tách khuyến mãi ra thành một nhánh riêng và cộng thêm lần nữa.

Các cặp nhánh dễ chồng lấn nhất trong case thường có dạng: một nhánh theo nguyên nhân, một nhánh theo kênh hoặc theo khách hàng. "Giá giảm" và "kênh siêu thị" chồng nhau. "Chi phí nhân sự tăng" và "chi phí nhà máy tăng" chồng nhau, vì lương công nhân nhà máy nằm ở cả hai.

Cách chống lại: chọn một trục duy nhất cho một tầng của cây. Tầng đầu tách theo nguyên nhân kinh tế — giá, sản lượng, chi phí đầu vào — thì đừng chen một nhánh theo kênh vào cùng tầng. Muốn xem theo kênh, đó là tầng thứ hai bên dưới mỗi nhánh.

## Phép thử thứ ba: bỏ sót

Sau khi sửa chồng lấn, năm nhánh còn lại cộng đúng 60 tỷ. Nhưng vẫn cần phép thử thứ ba: nhánh "khác" lớn tới mức nào?

Nhánh khác của Biển Đông là 3,4 tỷ, chiếm khoảng 5,67% tổng mức giảm. Đây là mức chấp nhận được. Mọi phân tích thực tế đều có phần dư không giải thích được, và cố ép nó về không thường dẫn tới việc bịa ra nguyên nhân.

Ngưỡng thực dụng: dưới 10% là bình thường; từ 10 đến 20% nên cố tìm thêm một nhánh; trên 20% thì cây chắc chắn thiếu một nguyên nhân lớn, và giám khảo sẽ tìm ra nó trước đội.

Ví dụ: nếu một cây khác chỉ giải thích được 54 trong 60 tỷ, phần chưa giải thích là 6 tỷ, tức 10%. Ở mức này, đội nên dành thêm 30 phút tìm nguyên nhân thứ sáu thay vì để nó trong nhánh "khác".

## Thứ tự kiểm tra

Có một thứ tự làm việc hiệu quả hơn hẳn: kiểm tra bằng số trước, kiểm tra bằng logic sau.

Nhiều đội làm ngược lại. Họ tranh luận rất lâu xem hai nhánh có chồng lấn về mặt khái niệm không, trong khi chỉ cần cộng các con số là thấy ngay có vấn đề hay không. Số không tranh luận được; khái niệm thì tranh luận mãi.

Khi số đã khớp, kiểm tra logic vẫn cần — vì hai lỗi ngược chiều có thể triệt tiêu nhau và cho tổng đúng. Nhưng lúc đó cuộc kiểm tra logic có trọng tâm hơn nhiều.

## Trình bày cây đã kiểm tra

Cây đã qua ba phép thử nên được trình bày theo cách để giám khảo tự kiểm tra: mỗi nhánh ghi con số tỷ đồng, gốc cây ghi tổng, và nếu có nhánh khác thì ghi luôn tỷ trọng.

Một chi tiết nhỏ nhưng tạo khác biệt: ghi rõ cách tính của từng nhánh ngay dưới con số — "1.200đ/lít × 18 triệu lít" — thay vì chỉ ghi kết quả. Giám khảo nhìn một cái là biết đội có kiểm soát con số hay chỉ điền số cho đẹp.

## Những lỗi hay gặp

Ghi MECE lên slide mà chưa từng cộng các nhánh lại.

Trộn hai trục — nguyên nhân và kênh — trong cùng một tầng của cây.

Để nhánh khác quá lớn, hoặc ngược lại, ép nó về không bằng những nguyên nhân bịa ra.

Kiểm tra logic trước kiểm tra số, tốn thời gian tranh luận mà không kết luận được.

## Nói ra như thế nào

> "Bản đầu tiên của cây có sáu nhánh, cộng lại 68 tỷ trong khi EBITDA chỉ giảm 60 tỷ. Chênh 8 tỷ đúng bằng nhánh khuyến mãi kênh siêu thị.

> Đội kiểm tra lại và thấy phần giảm giá cho siêu thị đã nằm trong nhánh giá bán, nên đã bỏ nhánh khuyến mãi khỏi tầng một và đưa nó xuống tầng hai như một chi tiết của nhánh giá.

> Sau khi sửa, năm nhánh cộng đúng 60 tỷ, và nhánh khác chỉ chiếm 5,7% nên đội tin cây không bỏ sót nguyên nhân lớn nào."
`);

LRD("c-tree-5", `
Đội có một cây rất tốt: năm nhánh, cộng đúng 60 tỷ, nhánh khác chỉ 5,7%. Ai nhìn cũng thấy chắc chắn.

Rồi trưởng nhóm tính quỹ giờ: còn 18 giờ-người cho phân tích. Kiểm chứng đủ bốn nhánh chính cần 6 cộng 8 cộng 4 cộng 3, bằng 21 giờ. Thiếu 3 giờ.

Ba giờ nghe như chuyện nhỏ. Nhưng một nhánh làm thiếu 3 giờ là một nhánh không có kết luận, và một nhánh không có kết luận thì không lên slide được. Câu hỏi thật là: bỏ nhánh nào?

## Cắt tỉa không phải bỏ nhánh sai

Điều làm việc cắt tỉa khó chịu là mọi nhánh còn lại đều đúng. Giá bán có giảm thật. Vận chuyển có tăng thật. Không nhánh nào sai để mà loại.

Vậy tiêu chí là gì? Không phải đúng hay sai, mà là mỗi giờ bỏ vào nhánh đó mua được bao nhiêu thông tin có giá trị.

## Ba con số cho mỗi nhánh

Với mỗi nhánh, đội ước ba con số.

Tác động: nếu nhánh này đúng, nó giải thích bao nhiêu tỷ trong 60 tỷ. Con số này thường đã có từ lúc dựng cây.

Khả năng đúng: mức tin tưởng ban đầu, dựa trên dữ liệu đã có. Nhánh nguyên liệu có khả năng đúng 90% vì giá cá cơm tăng là điều cả ngành đều biết. Nhánh giá bán 60% vì đội mới chỉ thấy giá trung bình giảm, chưa biết do đâu. Con số này là phán đoán, nhưng phán đoán có căn cứ tốt hơn không có gì.

Giờ-người cần: để kiểm chứng tới mức có thể viết một câu kết luận, không phải để đọc hết mọi thứ liên quan.

Với Biển Đông: giá bán 21,6 tỷ · 60% · 6 giờ. Sản lượng 18 tỷ · 70% · 8 giờ. Nguyên liệu 12 tỷ · 90% · 4 giờ. Vận chuyển 5 tỷ · 80% · 3 giờ.

## Hai cách xếp hạng cho hai tình huống

Nhân tác động với khả năng đúng được giá trị kỳ vọng: giá bán 12,96 tỷ; sản lượng 12,6 tỷ; nguyên liệu 10,8 tỷ; vận chuyển 4 tỷ.

Xếp theo cột này, thứ tự là giá bán, sản lượng, nguyên liệu, vận chuyển. Đây là thứ tự đúng khi thời gian không giới hạn — làm nhánh giá trị nhất trước.

Nhưng thời gian luôn giới hạn. Chia giá trị kỳ vọng cho số giờ được giá trị mỗi giờ: nguyên liệu 2,7 tỷ; giá bán 2,16 tỷ; sản lượng 1,58 tỷ; vận chuyển 1,33 tỷ.

Thứ tự đảo lại ở vị trí đầu. Nhánh nguyên liệu tác động nhỏ nhất trong ba nhánh lớn, nhưng chắc chắn nhất và nhanh nhất — mỗi giờ bỏ vào đó mua được nhiều thông tin nhất.

## Chọn tổ hợp, không chọn từng nhánh

Với 18 giờ, lấy lần lượt theo giá trị mỗi giờ: nguyên liệu 4 giờ, giá bán 6 giờ, sản lượng 8 giờ. Vừa đúng 18 giờ. Tổng giá trị kỳ vọng: 10,8 cộng 12,96 cộng 12,6, bằng 36,36 tỷ.

Nhánh vận chuyển bị cắt.

Một lưu ý kỹ thuật: xếp theo giá trị mỗi giờ rồi lấy lần lượt không phải lúc nào cũng cho tổ hợp tốt nhất, vì các nhánh không chia nhỏ được. Nếu quỹ giờ là 15 thay vì 18, lấy lần lượt cho nguyên liệu và giá bán, còn dư 5 giờ không đủ cho sản lượng 8 giờ — lúc đó nên xét xem lấy vận chuyển 3 giờ có tốt hơn để dư không. Với các bài case, số nhánh ít nên thử vài tổ hợp bằng tay là đủ.

## Nhớ phần bị bỏ lại

Ba nhánh được chọn có tổng tác động 21,6 cộng 18 cộng 12, bằng 51,6 tỷ. Trên 60 tỷ, phần chưa kiểm chứng là 8,4 tỷ — gồm vận chuyển 5 tỷ và nhánh khác 3,4 tỷ.

Con số 8,4 tỷ này cần được ghi lại và đưa lên phụ lục. Khi giám khảo hỏi "còn 8 tỷ nữa ở đâu", đội trả lời được: "Vận chuyển và các khoản nhỏ; đội ước khoảng 8,4 tỷ nhưng không đủ giờ kiểm chứng, và vì tác động nhỏ nên không đổi khuyến nghị."

Câu trả lời đó tốt hơn nhiều so với im lặng, và cũng tốt hơn so với việc đội cố nói bừa về một nhánh chưa hề phân tích.

## Khi nào nên giữ nhánh nhỏ

Có một trường hợp ngoại lệ đáng biết: nhánh nhỏ nhưng mở đường cho nhánh khác.

Ví dụ, nếu kiểm chứng nhánh nguyên liệu cho biết giá cá cơm tăng bao nhiêu, con số đó cũng giúp ước nhánh giá bán — vì công ty có thể đã tăng giá bán để bù nguyên liệu. Một nhánh vừa rẻ vừa cung cấp dữ liệu cho nhánh khác đáng được ưu tiên hơn giá trị kỳ vọng của riêng nó.

Ngược lại, nhánh nào cần dữ liệu mà đội chắc chắn không xin được thì nên cắt sớm, dù giá trị kỳ vọng cao — vì giờ bỏ vào đó sẽ không cho kết luận nào.

## Những lỗi hay gặp

Xếp hạng chỉ theo tác động, bỏ qua chi phí thời gian và mức độ chắc chắn.

Giữ mọi nhánh và làm nông tất cả.

Quên ghi phần tổng chưa được kiểm chứng.

Ước khả năng đúng theo cảm tính mà không nói căn cứ, khiến cả bảng xếp hạng mất giá trị.

## Nói ra như thế nào

> "Đội có 18 giờ-người và bốn nhánh cần 21 giờ, nên phải cắt. Tiêu chí của đội là giá trị kỳ vọng mỗi giờ: tác động nhân khả năng đúng, chia số giờ cần.

> Nhánh nguyên liệu đứng đầu với 2,7 tỷ mỗi giờ — tác động nhỏ hơn nhưng chắc và nhanh. Sau đó là giá bán 2,16 và sản lượng 1,58. Ba nhánh này vừa đúng 18 giờ và phủ 51,6 trong 60 tỷ.

> Nhánh vận chuyển 5 tỷ bị cắt. Cùng với nhánh khác 3,4 tỷ, phần chưa kiểm chứng là 8,4 tỷ; đội ghi vào phụ lục vì tác động nhỏ và không đổi khuyến nghị."
`);

LRD("c-tree-6", `
Slide khuyến nghị của đội có bốn giải pháp và một con số lớn ở góc phải: "Tổng tác động: 45 tỷ."

Giám khảo nhìn con số đó, rồi nhìn lại bảng bên dưới, nơi ghi khả năng thực hiện của từng giải pháp: 50%, 30%, 90%, 60%. Bà hỏi: "Bốn mươi lăm tỷ là nếu cả bốn đều thành công trọn vẹn phải không? Khả năng đó là bao nhiêu?"

Nhân bốn xác suất với nhau: 0,5 nhân 0,3 nhân 0,9 nhân 0,6, khoảng 8%. Con số 45 tỷ trên slide có khoảng 8% khả năng xảy ra.

## Hai chiều của một giải pháp

Sau khi tìm ra nguyên nhân, đội phải chọn giải pháp. Và mọi giải pháp đều có hai chiều không thể tách rời.

Chiều thứ nhất là tác động: nếu làm được trọn vẹn, nó mang lại bao nhiêu tỷ. Chiều thứ hai là khả năng thực hiện: xác suất làm được trong thời hạn, với nguồn lực hiện có, trước phản ứng của đối tác và thị trường.

Hai chiều này thường đi ngược nhau. Giải pháp tác động lớn — tăng giá bán lẻ 20 tỷ — khó thực hiện vì khách có thể bỏ đi. Giải pháp dễ thực hiện — tối ưu tuyến vận chuyển, 90% khả năng — chỉ mang lại 5 tỷ.

Trình bày một chiều mà bỏ chiều kia là cách nhanh nhất để mất điểm. Nói tác động 45 tỷ mà không nói xác suất là hứa hão. Nói "giải pháp này rất khả thi" mà không nói nó đáng bao nhiêu tiền là nói chuyện phiếm.

## Nhân hai chiều thành một con số

Giá trị kỳ vọng — tác động nhân khả năng thực hiện — gộp hai chiều thành một con số so sánh được.

Với Biển Đông: đàm phán lại giá cá cơm 12 tỷ nhân 50%, bằng 6 tỷ. Tăng giá bán lẻ 20 tỷ nhân 30%, bằng 6 tỷ. Tối ưu tuyến vận chuyển 5 tỷ nhân 90%, bằng 4,5 tỷ. Bỏ khuyến mãi kênh siêu thị 8 tỷ nhân 60%, bằng 4,8 tỷ.

Tổng: 21,3 tỷ.

So với 45 tỷ trên slide cũ, con số này nhỏ hơn hơn một nửa. Nhưng nó là con số mà đội có thể bảo vệ, và là con số mà một ban lãnh đạo thật sẽ dùng để lập kế hoạch.

Trên mức giảm 60 tỷ, 21,3 tỷ khôi phục được khoảng 35,5%. Đây là một sự thật khó chịu mà đội phải nói ra: kế hoạch này không đưa EBITDA về mức cũ. Nói ra nó, kèm đề xuất tìm thêm đòn bẩy, tốt hơn nhiều so với để giám khảo tự tính và phát hiện.

## Hai giải pháp cùng giá trị kỳ vọng, hai câu chuyện khác nhau

Đàm phán giá cá cơm và tăng giá bán lẻ cùng có giá trị kỳ vọng 6 tỷ. Nhưng chúng rất khác nhau.

Đàm phán giá: tác động vừa phải, xác suất trung bình, và nếu thất bại thì chỉ là không được gì — quan hệ với nhà cung cấp có thể căng hơn một chút, nhưng doanh nghiệp không mất gì thêm.

Tăng giá bán lẻ: tác động lớn, xác suất thấp, và nếu thất bại thì mất khách — một thiệt hại thật, không chỉ là cơ hội bỏ lỡ.

Giá trị kỳ vọng không bắt được sự khác biệt này, vì nó không xét tới hậu quả khi thất bại. Đây là giới hạn quan trọng của công cụ, và cách xử lý thường là: với giải pháp có hậu quả thất bại nặng, thử ở quy mô nhỏ trước. Tăng giá ở một vùng, đo phản ứng trong hai tháng, rồi mới quyết định áp toàn quốc.

## Khả năng thực hiện không phải hằng số

Một điểm nhiều đội bỏ qua: khả năng thực hiện có thể nâng lên, và việc nâng nó đôi khi rẻ hơn tìm giải pháp mới.

Đàm phán giá cá cơm có khả năng 50% vì nhà cung cấp không có động lực giảm giá cho một đơn hàng ngắn hạn. Nếu Biển Đông đề nghị hợp đồng nguyên liệu dài hạn hai năm với cam kết sản lượng, khả năng thành công có thể lên 75%.

Giá trị kỳ vọng của giải pháp đó tăng từ 6 lên 9 tỷ. Tổng bốn giải pháp lên 24,3 tỷ. Thêm 3 tỷ mà không cần nghĩ ra giải pháp nào mới — chỉ cần thay đổi cách thực hiện một giải pháp đã có.

Đây thường là phần đáng giá nhất của một khuyến nghị: không phải danh sách việc cần làm, mà là cách làm sao cho chúng thật sự xảy ra.

## Trình bày bằng ma trận

Cách vẽ quen thuộc là ma trận hai chiều: trục ngang khả năng thực hiện, trục dọc tác động, mỗi giải pháp một ô.

Ô ở góc trên bên phải — tác động lớn, khả thi cao — là việc làm ngay. Ô góc dưới bên trái là việc bỏ. Hai góc còn lại cần quyết định: tác động lớn nhưng khó thì tìm cách nâng khả năng thực hiện; dễ nhưng nhỏ thì làm khi có thời gian rảnh.

Một mẹo trình bày: cho kích thước mỗi ô tỷ lệ với giá trị kỳ vọng. Người xem thấy ngay giải pháp nào đáng nhất mà không cần đọc số.

## Những lỗi hay gặp

Cộng tác động thô và trình bày như một lời hứa.

Bỏ giải pháp có khả năng thực hiện thấp, thay vì thử ở quy mô nhỏ.

Coi khả năng thực hiện là cố định, bỏ lỡ cơ hội nâng nó bằng cách thay đổi cách làm.

Không nói phần mục tiêu còn thiếu, để giám khảo tự phát hiện.

## Nói ra như thế nào

> "Bốn giải pháp có tổng tác động 45 tỷ nếu tất cả thành công trọn vẹn, nhưng tính cả khả năng thực hiện thì giá trị kỳ vọng là 21,3 tỷ, tức khôi phục khoảng 36% mức EBITDA đã mất.

> Đội đề xuất bắt đầu bằng tối ưu tuyến vận chuyển và bỏ khuyến mãi siêu thị vì khả thi cao, đồng thời ký hợp đồng nguyên liệu dài hạn để nâng khả năng đàm phán giá cá cơm từ 50% lên 75% — riêng việc này thêm 3 tỷ giá trị kỳ vọng.

> Tăng giá bán lẻ có tác động lớn nhất nhưng rủi ro mất khách, nên đội đề xuất thử ở một vùng trong hai tháng trước khi áp rộng."
`);

LRD("c-tree-7", `
Ban tổ chức phát thông báo lúc 9 giờ sáng: mỗi đội được gửi tối đa 5 câu hỏi cho ban điều hành công ty, trả lời trong vòng hai tiếng.

Đội Biển Đông mở lại cây giả thuyết. Bốn nhánh chính, mỗi nhánh cần khoảng ba dữ liệu để kiểm chứng: tổng cộng 12 yêu cầu. Năm suất hỏi.

Bảy yêu cầu phải tự xoay xở. Và cách chọn 5 câu nào quyết định phần lớn chất lượng phân tích trong 18 giờ tiếp theo.

## Cây chưa gắn dữ liệu chỉ là ý tưởng

Một cây giả thuyết đẹp vẫn chỉ là một tập hợp phỏng đoán cho tới khi mỗi nhánh gắn với dữ liệu cụ thể để kiểm chứng.

Bước chuyển từ cây sang danh sách phân tích gồm bốn cột cho mỗi nhánh. Yêu cầu dữ liệu: cần con số gì, chính xác. Nguồn: xin ban tổ chức, tra phụ lục, tìm nguồn công khai, hay tự ước lượng. Dùng để kiểm chứng điều gì: nếu con số này lớn hơn X thì nhánh đúng. Và ai làm, mất bao lâu.

Cột thứ ba là cột hay bị bỏ qua nhất, và cũng quan trọng nhất. Xin được một bảng số mà không biết dùng nó để kết luận gì thì bảng số đó chỉ làm đội tốn thêm giờ đọc.

## Viết yêu cầu dữ liệu cho đúng

Có một khác biệt lớn giữa hai cách viết.

"Thông tin về giá bán" là một yêu cầu tệ. Ban tổ chức có thể gửi lại bảng giá niêm yết — đúng nghĩa đen, vô dụng với đội, và đã tiêu mất một suất hỏi.

"Giá bán trung bình thực nhận sau chiết khấu, theo từng kênh (siêu thị, đại lý, xuất khẩu), hai năm gần nhất" là một yêu cầu tốt. Nó chỉ rõ chỉ tiêu nào, chia theo chiều nào, trong khoảng thời gian nào.

Quy tắc thực dụng: viết yêu cầu sao cho người trả lời chỉ cần sao chép một bảng có sẵn, không phải suy luận xem đội muốn gì.

## Chọn suất hỏi cho đúng

Với 12 yêu cầu và 5 suất, tiêu chí chọn gồm hai lớp.

Lớp thứ nhất: dữ liệu này có tra được từ nguồn khác không? Giá cá cơm nguyên liệu theo tháng có trong báo cáo ngành thuỷ sản và các bản tin giá nông sản. Đội tự tra được, dù mất một giờ. Đừng tiêu suất hỏi vào đó.

Ngược lại, chiết khấu thực tế cho từng kênh, định mức cá cơm cho mỗi lít nước mắm, sản lượng theo kênh theo quý — đây là dữ liệu nội bộ, không có cách nào biết nếu không hỏi.

Lớp thứ hai: trong số dữ liệu nội bộ, ưu tiên nhánh có giá trị kỳ vọng cao nhất. Theo bài trước, ba nhánh được giữ là giá bán, sản lượng và nguyên liệu. Nhánh vận chuyển đã bị cắt, nên đừng tiêu suất hỏi cho nó.

Nếu dồn cả 5 câu cho hai nhánh lớn nhất — giá bán và sản lượng — các câu đó phục vụ việc kiểm chứng 39,6 tỷ trong 60 tỷ, tức 66% mức giảm. Nhánh nguyên liệu 12 tỷ khi đó phải tự ước lượng từ nguồn công khai, việc mà đội làm được.

## Giá trị của một câu hỏi tính bằng giờ

Có một cách khác để thấy suất hỏi đáng giá thế nào: mỗi dữ liệu xin được giúp tiết kiệm khoảng hai giờ-người so với việc tự ước lượng từ nguồn gián tiếp.

Năm câu hỏi tiết kiệm khoảng 10 giờ-người — hơn một nửa quỹ phân tích 18 giờ của đội. Nói cách khác, hai tiếng chờ câu trả lời đáng giá hơn hai tiếng làm việc, nếu câu hỏi được chọn đúng.

Điều này cũng có nghĩa: gửi câu hỏi càng sớm càng tốt. Đội gửi lúc 9 giờ 30 nhận trả lời lúc 11 giờ 30 và còn cả buổi chiều để dùng. Đội gửi lúc 15 giờ nhận trả lời lúc 17 giờ, khi phần lớn phân tích đã phải làm xong bằng ước lượng.

## Kế hoạch cho bảy yêu cầu còn lại

Bảy yêu cầu không được hỏi không biến mất. Mỗi yêu cầu cần một dòng kế hoạch: tra ở đâu, hoặc ước lượng bằng cách nào, hoặc chấp nhận không có và ghi thành giả định.

Với Biển Đông: giá cá cơm tra bản tin ngành. Giá đối thủ tra bảng giá niêm yết trên trang thương mại điện tử. Số điểm bán ước từ dữ liệu ngành bán lẻ. Tồn kho không tra được và cũng không quan trọng với kết luận, nên ghi thành giả định: "Đội giả định tồn kho không đổi đáng kể; nếu tồn kho tăng mạnh, phần sản lượng giảm có thể do đẩy hàng vào kênh chứ không do nhu cầu."

Câu giả định cuối cùng đó rất đáng giá trong phần hỏi đáp: nó cho thấy đội biết mình không biết gì.

## Những lỗi hay gặp

Viết yêu cầu dữ liệu chung chung và nhận lại bảng số không dùng được.

Tiêu suất hỏi cho dữ liệu tra được từ nguồn công khai.

Không ghi dữ liệu này dùng để kiểm chứng điều gì, rồi nhận số về mà không biết làm gì.

Chia đều câu hỏi cho mọi nhánh, khiến nhánh lớn nhất vẫn thiếu dữ liệu để kết luận.

## Nói ra như thế nào

> "Cây của đội có bốn nhánh, mỗi nhánh cần khoảng ba dữ liệu, tổng 12 yêu cầu, trong khi chỉ được hỏi 5 câu.

> Đội dành cả 5 suất cho dữ liệu nội bộ của hai nhánh lớn nhất là giá bán và sản lượng — chiếm 66% mức giảm EBITDA. Giá cá cơm và giá đối thủ đội tự tra từ bản tin ngành và bảng giá công khai.

> Riêng tồn kho đội không có dữ liệu, nên ghi thành giả định: nếu tồn kho tăng mạnh thì phần sản lượng giảm có thể do đẩy hàng vào kênh chứ không do nhu cầu yếu đi."
`);

LRD("c-tree-8", `
Trong vòng loại, đội gặp đề tăng trưởng và dựng một cây rất tốt: doanh thu bằng sản lượng nhân giá, mỗi nhánh tách tiếp theo kênh và theo dòng sản phẩm. Đội vào vòng trong.

Vòng hai, đề đổi hướng: chi phí sản xuất nước mắm tăng, EBITDA giảm 60 tỷ. Đội mở lại mẫu cây cũ, thay chữ "doanh thu" thành "chi phí", và tách theo phòng ban: chi phí nhà máy, chi phí kho vận, chi phí bán hàng, chi phí quản lý.

Bốn tiếng sau, đội vẫn không tìm ra nguyên nhân. Cây cho biết chi phí nhà máy tăng 12 tỷ, nhưng không cho biết vì sao — và "vì sao" mới là thứ đề hỏi.

## Hai loại bài toán, hai hình dạng cây

Bài toán doanh thu và bài toán chi phí cần hai cách tách khác nhau, vì hai loại con số này được tạo ra theo hai cơ chế khác nhau.

Doanh thu sinh ra từ việc bán: bao nhiêu đơn vị, với giá nào. Cây doanh thu vì vậy tách theo sản lượng và giá, rồi mỗi nhánh tách tiếp theo phân khúc, kênh, hoặc dòng sản phẩm.

Chi phí sinh ra từ việc tiêu hao: dùng bao nhiêu đơn vị đầu vào, mỗi đơn vị giá bao nhiêu. Cây chi phí vì vậy tách theo mức tiêu hao và đơn giá đầu vào.

Tách chi phí theo phòng ban — cách mà báo cáo kế toán trình bày — chỉ cho biết tiền nằm ở đâu trong tổ chức, không cho biết vì sao nó tăng. Phòng nhà máy tăng 12 tỷ có thể vì giá cá cơm tăng, vì định mức hao hụt tăng, vì sản lượng tăng, hoặc vì lương tăng. Bốn nguyên nhân, bốn cách sửa hoàn toàn khác nhau.

## Cây chi phí: mức tiêu hao × đơn giá

Với Biển Đông, nhánh nguyên liệu nên được tách thành hai phần.

Mức tiêu hao: bao nhiêu ki-lô-gam cá cơm cho mỗi lít nước mắm. Nếu định mức tăng, nguyên nhân nằm ở quy trình sản xuất, chất lượng cá đầu vào, hay hao hụt trong ủ chượp.

Đơn giá: giá mỗi ki-lô-gam cá cơm. Nếu đơn giá tăng, nguyên nhân nằm ở thị trường nguyên liệu, mùa vụ đánh bắt, hay hợp đồng nhà cung cấp.

Hai nhánh này dẫn tới hai nhóm giải pháp không liên quan gì tới nhau. Và cách tách theo phòng ban không phân biệt được chúng.

Bước đầu tiên để làm việc này là quy tổng chi phí về đơn vị sản phẩm. Chi phí nguyên liệu tăng 12 tỷ trên sản lượng 18 triệu lít, tức khoảng 667đ mỗi lít — khoảng 7,4% lãi góp 9.000đ mỗi lít. Con số 667đ mới so được với mức tăng giá cá cơm trên thị trường; con số 12 tỷ thì không.

## Cây doanh thu: chọn mốc để không đếm trùng

Phía doanh thu của Biển Đông có hai nhánh: sản lượng giảm từ 20 xuống 18 triệu lít, và giá bán trung bình giảm 1.200đ mỗi lít.

Câu hỏi kỹ thuật quan trọng: nhân mỗi nhánh với mốc nào?

Nhánh sản lượng: 2 triệu lít không bán được, mỗi lít lẽ ra mang về 9.000đ lãi góp — dùng lãi góp năm trước, vì đó là mức lãi tại thời điểm những lít đó đáng lẽ được bán. Tác động: 18 tỷ.

Nhánh giá: mức giảm 1.200đ áp cho những lít thật sự bán ra năm nay, tức 18 triệu lít. Tác động: 21,6 tỷ.

Nếu dùng sản lượng năm trước cho nhánh giá: 1.200đ nhân 20 triệu lít, bằng 24 tỷ. Cao hơn 2,4 tỷ. Phần chênh này chính là mức giảm giá tính trên 2 triệu lít không hề được bán — một khoản không tồn tại, và nếu tính vào thì cây sẽ giải thích nhiều hơn mức giảm thật.

Nguyên tắc chung: khi tách một thay đổi thành nhiều nhánh nhân với nhau, mỗi phần giao nhau chỉ được tính một lần. Cách phổ biến là một nhánh dùng mốc kỳ cũ, nhánh kia dùng mốc kỳ mới. Chọn cách nào cũng được, miễn nhất quán và ghi rõ — nhưng không được dùng mốc cũ cho cả hai.

## Kiểm tra bằng tổng

Sau khi tách, cộng lại: giá 21,6 cộng sản lượng 18 cộng nguyên liệu 12 cộng vận chuyển 5 cộng khác 3,4, bằng 60 tỷ. Khớp với đề.

Nếu dùng nhầm mốc cho nhánh giá, tổng sẽ là 62,4 tỷ — vượt 2,4 tỷ, và phép thử cộng tổng ở bài trước sẽ bắt được lỗi này. Đây là ví dụ cho thấy ba phép thử MECE không chỉ bắt lỗi chồng lấn khái niệm, mà còn bắt lỗi kỹ thuật trong cách tính.

## Khi bài toán có cả hai phía

Nhiều đề, như Biển Đông, có cả nhánh doanh thu lẫn nhánh chi phí. Khi đó cây có hai nửa với hai hình dạng khác nhau, và đó là điều bình thường — miễn mọi nhánh cùng quy về một đơn vị chung.

Đơn vị chung nên là tác động lên EBITDA, không phải doanh thu hay chi phí. Nhánh sản lượng ảnh hưởng EBITDA qua lãi góp, không qua doanh thu: mất 2 triệu lít không phải mất 80 tỷ doanh thu mà là mất 18 tỷ lãi góp. Trộn đơn vị là lỗi làm cây mất giá trị nhanh nhất.

## Những lỗi hay gặp

Tách chi phí theo phòng ban thay vì theo mức tiêu hao và đơn giá.

Để chi phí ở dạng tổng, không quy về đơn vị mỗi sản phẩm, nên không so được với mốc ngành.

Dùng cùng một mốc sản lượng cho cả nhánh giá và nhánh sản lượng.

Trộn đơn vị: nhánh này tính theo doanh thu, nhánh kia theo lãi góp.

## Nói ra như thế nào

> "Đội dùng hai hình dạng cây cho hai nửa của bài. Phía doanh thu tách theo sản lượng và giá; phía chi phí tách theo mức tiêu hao và đơn giá đầu vào.

> Nhánh sản lượng: mất 2 triệu lít, nhân lãi góp năm trước 9.000đ, bằng 18 tỷ. Nhánh giá: giảm 1.200đ mỗi lít, nhân 18 triệu lít bán ra năm nay, bằng 21,6 tỷ. Dùng sản lượng năm trước cho nhánh giá sẽ ra 24 tỷ và làm cây vượt tổng 2,4 tỷ.

> Chi phí nguyên liệu tăng 12 tỷ, quy ra 667đ mỗi lít, tương đương 7,4% lãi góp — con số này đội đối chiếu với mức tăng giá cá cơm trên bản tin ngành."
`);

LRD("c-tree-9", `
Một giờ sáng. Cây đã chốt, ba nhánh đã chọn, quỹ giờ đã tính: 18 giờ-người. Trưởng nhóm hỏi câu cuối cùng trước khi cả đội bắt tay vào việc: "Ai làm gì?"

Một thành viên đề xuất: "Ai cũng đọc hết phụ lục rồi 5 giờ sáng mình họp lại, ai thấy gì thì nói."

Nghe có vẻ an toàn — ai cũng nắm được mọi thứ. Thực tế, 5 giờ sáng sẽ có bốn người cùng biết một nửa về cả ba nhánh, không ai có đủ độ sâu để viết một kết luận, và bốn tiếng đã trôi qua.

## Cây giả thuyết là bảng phân công

Một trong những công dụng ít được nói tới của cây giả thuyết: nó chia công việc thành các phần độc lập.

Mỗi nhánh là một câu hỏi riêng, cần dữ liệu riêng, và cho ra một kết luận riêng. Hai người làm hai nhánh khác nhau không cần chờ nhau. Đây chính là điều kiện để bốn người làm việc song song mà không giẫm chân nhau.

Ngược lại, nếu công việc được chia theo hoạt động — "bạn đọc phụ lục, bạn tìm dữ liệu ngành, bạn làm slide" — thì không ai sở hữu một kết luận nào, và mọi thứ dồn vào người tổng hợp cuối cùng.

## Chia theo giờ, không theo cảm giác

Ba nhánh của Biển Đông cần 4, 6 và 8 giờ-người. Tổng 18. Đội có bốn người, mỗi người khoảng 4,5 giờ trong khung thời gian phân tích.

Cách chia hợp lý: nhánh nguyên liệu 4 giờ giao một người. Nhánh giá bán 6 giờ giao một người, cộng 1,5 giờ hỗ trợ từ người đã xong nhánh nguyên liệu. Nhánh sản lượng 8 giờ giao hai người, mỗi người 4 giờ.

Tổng tải: 18 giờ chia 4 người, trung bình 4,5 giờ mỗi người — vừa khít quỹ.

Điều cần tránh: giao nhánh lớn nhất cho một người. Tám giờ liên tục cho một người trong khi ba người khác xong sớm tạo ra nút thắt, và người đó cũng không có ai để đối chiếu khi gặp số liệu khó hiểu.

## Sản phẩm phải nộp, không phải việc phải làm

Ô trong bảng phân công không nên ghi "tìm hiểu về giá bán". Nó nên ghi sản phẩm cụ thể: "một con số — mức giảm giá trung bình theo từng kênh — kèm nguồn, và một câu kết luận nhánh này đúng hay sai".

Khác biệt này quyết định chất lượng của buổi ghép kết quả. Người được giao "tìm hiểu" sẽ mang tới một mớ quan sát. Người được giao "một con số kèm kết luận" sẽ mang tới thứ ghép được vào cây.

## Thống nhất trước khi tách ra

Phần nguy hiểm nhất của việc chia theo nhánh là bốn kết quả không ghép lại được. Ba điều cần thống nhất trước, mất khoảng mười phút.

Đơn vị: mọi nhánh quy về tác động lên EBITDA, đơn vị tỷ đồng, một chữ số thập phân.

Kỳ so sánh: năm nay so với năm trước, không phải quý này so với quý trước.

Mẫu bảng kết quả: tên nhánh, con số tác động, nguồn dữ liệu, mức độ tin cậy, một câu kết luận.

Mười phút này tiết kiệm hàng giờ vào lúc ghép, khi phát hiện một người tính theo quý, một người tính theo năm, và không ai biết con số nào so được với con số nào.

## Mốc ghép giữa chặng

Đừng đợi tới khi cả ba nhánh xong mới ghép. Hẹn một mốc ghép ngắn ở khoảng giữa — ví dụ sau 2 giờ làm việc, mỗi người nói trong hai phút: đang thấy gì, có vướng gì.

Mốc này bắt được hai loại vấn đề sớm. Thứ nhất, một nhánh hoá ra không có dữ liệu để kiểm chứng — cần chuyển giờ sang nhánh khác ngay thay vì để người đó loay hoay tới cuối. Thứ hai, hai nhánh phát hiện cùng một nguyên nhân — dấu hiệu cây bị chồng lấn mà phép thử ban đầu chưa bắt được.

## Khi số người thay đổi

Kế hoạch phân công cần chịu được thay đổi. Nếu một người phải tách ra làm slide từ sớm, chỉ còn ba người cho phân tích: 18 giờ chia 3, mỗi người 6 giờ — vượt quỹ 4,5 giờ.

Có hai lựa chọn. Giữ nguyên ba nhánh và chấp nhận mỗi người làm thêm 1,5 giờ, ăn vào thời gian nghỉ hoặc thời gian luyện trình bày. Hoặc cắt bớt để vừa quỹ ba người: 3 nhân 4,5, bằng 13,5 giờ-người, tức phải cắt 4,5 giờ — gần đúng nhánh nguyên liệu 4 giờ.

Quyết định này nên được đưa ra ngay lúc phân công, không phải lúc 4 giờ sáng khi phát hiện không kịp. Một câu hỏi đơn giản lúc chia việc — "nếu một người phải tách ra làm slide thì mình cắt nhánh nào?" — tiết kiệm rất nhiều hoảng loạn về sau.

## Những lỗi hay gặp

Cả đội cùng đọc mọi thứ, không ai sở hữu kết luận nào.

Ghi việc phải làm thay vì sản phẩm phải nộp.

Không thống nhất đơn vị và kỳ so sánh trước khi tách ra.

Giao nhánh lớn nhất cho một người và tạo nút thắt.

## Nói ra như thế nào

> "Ba nhánh cần 4, 6 và 8 giờ-người, tổng 18, chia cho bốn người là 4,5 giờ mỗi người. Nhánh sản lượng lớn nhất giao hai người để không ai thành nút thắt.

> Trước khi tách ra, cả đội thống nhất mọi nhánh quy về tác động EBITDA năm nay so với năm trước, đơn vị tỷ đồng, và mỗi người nộp một bảng gồm con số, nguồn, độ tin cậy và một câu kết luận.

> Sau hai giờ có một mốc ghép ngắn. Nếu tới lúc đó mà một người phải tách ra làm slide, đội sẽ cắt nhánh nguyên liệu để tổng giờ vừa quỹ 13,5 giờ-người của ba người còn lại."
`);
