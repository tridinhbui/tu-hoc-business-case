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
