/* Phần đào sâu cho module Market sizing — giám khảo hỏi tiếp · cùng khung ở ngành khác · tự luyện.
   Mọi con số được tính lại trong tests/readings.test.js (mảng DEEP). */

LRDX("f-sizing-1", `
## Giám khảo hỏi tiếp

**"Vì sao 30%?"** Đừng bảo vệ con số bằng cảm giác. Nói nguồn gốc của nó — dân văn phòng trẻ, quen đặt đồ ăn qua app — và nói luôn con số nhạy đến đâu: nếu chỉ 15%, thị trường còn **1.215 tỷ**, tức một nửa. Người phỏng vấn không cần 30% đúng tuyệt đối; họ cần thấy bạn biết nó quan trọng.

**"2.430 tỷ là doanh thu của app à?"** Không. Đó là **tổng chi tiêu** của khách cho bữa trưa qua app. Doanh thu của nền tảng chỉ là phần hoa hồng. Nếu app thu 20% mỗi đơn, doanh thu nền tảng là **486 tỷ**. Nhầm hai con số này là lỗi làm nhà đầu tư mất tin nhanh nhất.

> "2.430 tỷ là tổng giá trị đơn hàng. Với hoa hồng 20%, doanh thu mà nền tảng có thể giành là khoảng 486 tỷ."

**"Có tính ngày nghỉ lễ chưa?"** Đã tính trong 50 tuần mỗi năm — hai tuần còn lại là Tết và các kỳ nghỉ dài. Nói ra giả định đó, đừng để người nghe tự đoán.

## Cùng khung, ngành khác: gội đầu dưỡng sinh ở TP.HCM

Ba phần của công thức vẫn giữ nguyên, chỉ đổi từng mắt lọc:

- **Người mua:** phụ nữ 18–45 tuổi ở TP.HCM khoảng **2 triệu**, 25% có thói quen gội đầu dưỡng sinh → 500.000 người.
- **Tần suất:** 1 lần mỗi tháng, **12 lần** mỗi năm.
- **Giá:** **80.000đ** mỗi lần.

Quy mô: 500.000 × 12 × 80.000đ = **480 tỷ** mỗi năm.

Khác cơm trưa ở chỗ nào? Tần suất đo theo **tháng** chứ không theo tuần, và nhóm khách lọc theo giới tính và độ tuổi thay vì nghề nghiệp. Cách chọn mắt lọc thay đổi theo sản phẩm; cấu trúc ba phần thì không.

## Tự luyện ba phút

Ước lượng thị trường nước uống đóng bình 20 lít cho văn phòng ở Hà Nội: 50.000 văn phòng, mỗi văn phòng dùng 2 bình mỗi tuần, 50 tuần làm việc, giá 60.000đ mỗi bình.

*Đáp án:* 50.000 × 2 × 50 × 60.000đ = **300 tỷ** mỗi năm. Câu hỏi đáng hỏi tiếp: văn phòng 5 người và văn phòng 200 người có dùng cùng 2 bình không? Nếu không, nên chia văn phòng theo quy mô.
`);

LRDX("f-sizing-2", `
## Giám khảo hỏi tiếp

**"Chia cho 5 năm mới chỉ là máy thay thế. Hộ mua lần đầu thì sao?"** Đúng — công thức gốc giả định tỷ lệ hộ dùng máy đứng yên ở 40%. Nếu tỷ lệ đó tăng 2 điểm mỗi năm, có thêm 27 triệu × 2% = **540.000 máy** mua lần đầu. Tổng lên khoảng **2,7 triệu máy**.

> "2,16 triệu là nhu cầu thay thế. Nếu tỷ lệ hộ dùng tăng 2 điểm mỗi năm, cộng thêm khoảng 540.000 máy mua lần đầu."

**"Bottom-up đã tính bán online chưa?"** Chưa. Nếu online chiếm 25% tổng số máy, 2,16 triệu máy qua cửa hàng chỉ là 75% thị trường, và tổng là **2,88 triệu**. Khi đó hai phía không còn khớp — và chính khoảng chênh đó chỉ ra giả định nào cần xem lại.

**"Hai cách khớp đúng từng máy có đáng ngờ không?"** Có một chút. Khớp hoàn hảo thường là do chọn giả định để khớp. Nói thẳng điều đó ra là một điểm cộng.

## Cùng khung, ngành khác: lốp xe máy

- **Top-down từ nhu cầu:** Việt Nam có khoảng **50 triệu** xe máy, mỗi xe 2 lốp, thay trung bình **2 năm** một lần → 50 triệu × 2 ÷ 2 = **50 triệu lốp** mỗi năm.
- **Bottom-up từ nguồn cung:** khoảng **25.000** tiệm sửa xe bán lốp, mỗi tiệm **6 lốp** mỗi ngày, **330 ngày** mở cửa → **49,5 triệu lốp**.

Hai cách lệch 1%. Nhưng với lốp xe, bottom-up còn thiếu kênh đại lý chính hãng và lốp theo xe mới — nên con số thật có thể cao hơn cả hai. Hàng lâu bền nào cũng có câu hỏi "cái đang có hay cái mua thêm"; lốp chỉ là trường hợp chu kỳ thay ngắn hơn máy lọc nước.

## Tự luyện ba phút

Ước lượng số nồi cơm điện bán ra mỗi năm: 27 triệu hộ, 90% hộ có nồi cơm điện, thay trung bình 6 năm một lần.

*Đáp án:* 27 triệu × 90% ÷ 6 = **4,05 triệu nồi** mỗi năm, chưa tính hộ mới lập. Nếu muốn kiểm tra chéo, hãy đếm từ phía cửa hàng điện máy và siêu thị.
`);

LRDX("f-sizing-3", `
## Giám khảo hỏi tiếp

**"Bé nào cũng dùng tã giấy cả ngày à?"** Không. Nhiều gia đình dùng tã vải ban ngày, tã giấy ban đêm. Nếu trung bình chỉ 80% nhu cầu được đáp ứng bằng tã giấy, thị trường là 5.475 × 80% = **4.380 triệu miếng**.

**"Đổi sang tiền được bao nhiêu?"** Với giá trung bình **4.000đ** mỗi miếng, 5.475 triệu miếng là khoảng **21.900 tỷ** mỗi năm. Luôn hỏi đề bài muốn đơn vị sản phẩm hay đơn vị tiền trước khi đổi.

> "Tính theo miếng là 5,5 tỷ miếng mỗi năm. Nếu giá trung bình 4.000đ, khoảng 21.900 tỷ đồng."

**"Còn tã người lớn?"** Khác đơn vị tiêu dùng: người cao tuổi nằm lâu, bệnh nhân hậu phẫu. Tính riêng, cộng sau — đừng trộn vào cùng một phép nhân với trẻ em.

## Cùng khung, ngành khác: dao cạo râu dùng một lần

Đơn vị tiêu dùng không phải hộ gia đình, cũng không phải toàn bộ nam giới — mà là **nam giới cạo râu bằng dao dùng một lần**.

- Nam giới 15–64 tuổi: khoảng **33 triệu**.
- Tỷ lệ dùng dao dùng một lần (không dùng máy cạo điện): **70%**.
- Mỗi người dùng **1 dao mỗi tuần**, 52 tuần.

Quy mô: 33 triệu × 70% × 52 = **1.201,2 triệu dao** mỗi năm.

Điểm giống tã giấy: sản phẩm bị "dùng hết" theo nhịp đều đặn của một người, nên tính theo người dùng rồi nhân tần suất. Điểm khác: không có dòng chảy theo tuổi — người dùng dao cạo ở lại trong nhóm hàng chục năm.

## Tự luyện ba phút

Ước lượng số bàn chải đánh răng bán ra mỗi năm: dân số 100 triệu, 90% dùng bàn chải, thay 3 tháng một lần.

*Đáp án:* 100 triệu × 90% × 4 lần = **360 triệu bàn chải**. Nhiều người thực tế thay chậm hơn khuyến cáo — nếu thay 6 tháng một lần, chỉ còn 180 triệu. Đây là giả định đáng kiểm chứng nhất.
`);

LRDX("f-sizing-4", `
## Giám khảo hỏi tiếp

**"Nếu cả hai giả định cùng rơi về biên thấp?"** 1 triệu người × 8 lần × 45.000đ = **360 tỷ**. Độ nhạy từng giả định cho biết cái nào quan trọng; kịch bản xấu kết hợp cho biết sàn thực tế. Cần cả hai, nhưng đừng bắt đầu bằng kịch bản kết hợp — nó che mất biến nào gây ra phần lớn dao động.

**"Nhà đầu tư chỉ quan tâm nếu thị trường trên 600 tỷ. Có đáng lo không?"** Giữ tần suất 10 lần và giá 50.000đ, số người dùng phải đạt ít nhất 600 tỷ ÷ (10 × 50.000đ) = **1,2 triệu**. Chỉ giả định người dùng mới có thể kéo thị trường xuống dưới ngưỡng. Kiểm chứng nó trước.

> "Chỉ khi người dùng dưới 1,2 triệu thì thị trường mới dưới 600 tỷ. Em sẽ kiểm chứng số người dùng trước tiên, bằng số lượt tải của các app đối thủ."

**"Kiểm chứng thế nào trong một tuần?"** Số lượt tải app đặt lịch làm đẹp trên kho ứng dụng, số cơ sở spa có đăng ký trên các nền tảng, một khảo sát nhanh 300 người ở hai thành phố.

## Cùng khung, ngành khác: rửa xe ô tô

Ước lượng cơ sở: **1 triệu** xe ô tô cá nhân ở các thành phố lớn × **24 lần** rửa mỗi năm × **60.000đ** = **1.440 tỷ**.

Chạy độ nhạy từng giả định:
- Số xe 0,8–1,2 triệu → 1.152–1.728 tỷ, khoảng rộng **576 tỷ**.
- Số lần 18–30 → 1.080–1.800 tỷ, khoảng rộng **720 tỷ**.
- Giá 50.000–70.000đ → 1.200–1.680 tỷ, khoảng rộng **480 tỷ**.

Khác với app spa: biến nhạy nhất ở đây là **tần suất**, không phải số khách. Số xe đăng ký có thống kê khá chắc; còn người ta rửa xe mỗi tuần hay mỗi tháng thì thay đổi rất nhiều theo mùa mưa.

## Tự luyện ba phút

Gym cao cấp: cơ sở 300.000 hội viên × 12 tháng × 1,5 triệu đồng mỗi tháng. Hội viên dao động 200.000–400.000; phí 1,2–1,8 triệu.

Tính quy mô cơ sở và khoảng rộng của từng giả định. Biến nào nhạy hơn?

*Đáp án:* cơ sở **5.400 tỷ**. Hội viên cho 3.600–7.200 tỷ, rộng **3.600 tỷ**. Phí cho 4.320–6.480 tỷ, rộng **2.160 tỷ**. Số hội viên nhạy hơn.
`);

LRDX("f-sizing-5", `
## Giám khảo hỏi tiếp

**"Tất cả trẻ 11–14 tuổi đều đi học à?"** Tỷ lệ đi học cấp 2 ở thành phố rất cao, nhưng không phải 100%. Với 95%: 64.000 × 95% = **60.800 học sinh**. Con số tròn "khoảng 60 nghìn" vẫn đúng.

**"Trung tâm quan tâm bao nhiêu em?"** Không phải mọi học sinh cấp 2 đều học tiếng Anh ngoài giờ. Nếu 30% có học thêm: **19.200 em**. Với học phí **1,5 triệu** mỗi tháng và 9 tháng học: 19.200 × 1,5 triệu × 9 = **259,2 tỷ** mỗi năm.

> "Khoảng 60 nghìn học sinh cấp 2; nếu 30% học tiếng Anh ngoài giờ thì khoảng 19 nghìn em, tương đương gần 260 tỷ học phí mỗi năm."

**"Chia đều theo tuổi có lệch không?"** Có. Tháp dân số Việt Nam chưa đều — nhóm trẻ đông hơn nhóm già. Chia đều thường **đánh giá thấp** số người ở độ tuổi trẻ. Nói ra hướng lệch còn giá trị hơn cố sửa con số.

## Cùng khung, ngành khác: sữa công thức cho trẻ dưới 2 tuổi

- Dân số Việt Nam **100 triệu**, tuổi thọ trung bình **75** → khoảng **1,33 triệu** người mỗi độ tuổi.
- Trẻ dưới 2 tuổi: 2 độ tuổi → khoảng **2,67 triệu** trẻ.
- Tỷ lệ dùng sữa công thức: **50%** → khoảng **1,33 triệu** trẻ.

Đối chiếu với số trẻ sinh mỗi năm thực tế khoảng 1,5 triệu, con số chia đều thấp hơn khoảng 11% — đúng hướng lệch đã nói ở trên. Khi có một mốc thật như số trẻ sinh, **dùng mốc thật**; chia đều theo tuổi chỉ là phương án khi không có mốc nào khác.

## Tự luyện ba phút

Ước lượng số sinh viên đại học ở TP.HCM: dân số 9 triệu, tuổi thọ 75, sinh viên là 4 độ tuổi 18–21, 40% trong nhóm tuổi đó học đại học.

*Đáp án:* 9 triệu ÷ 75 = 120.000 mỗi độ tuổi × 4 × 40% = **192.000 sinh viên**. Nhưng đây là chỗ bẫy phạm vi địa lý: TP.HCM hút sinh viên từ các tỉnh, nên con số thật cao hơn nhiều. Nói ra điều đó.
`);

LRDX("f-sizing-6", `
## Giám khảo hỏi tiếp

**"Lệch 11% có đổi khuyến nghị không?"** Tuỳ ngưỡng. Nếu nhà đầu tư chỉ cần thị trường trên 2.000 tỷ, cả hai con số — 2.430 và 2.186 — đều vượt ngưỡng, và quyết định không đổi. Nếu ngưỡng là 2.300 tỷ, bản tròn nói "đạt", bản chi tiết nói "không đạt". Khi đó phải làm kỹ hơn.

**"Làm tròn theo hướng nào cho an toàn?"** Nhìn lại từng số: 1.237.000 xuống 1,2 triệu (−3%), 28% lên 30% (+7%), 2,8 lên 3 bữa (+7%), 49 lên 50 tuần (+2%), 46.000 xuống 45.000đ (−2%). Hai lần làm tròn lên cùng cỡ 7% cộng dồn nên bản tròn cao hơn khoảng 11%. Quy tắc: **làm tròn xen kẽ lên và xuống** để sai số tự bù nhau.

> "Hai lần làm tròn lên 7% cộng dồn nên bản tròn cao hơn khoảng 11%. Nếu cần sát hơn, em làm tròn tỷ lệ xuống 25% để bù."

**"Nhẩm không cần máy thế nào?"** Gom số dễ trước: 1,2 × 30% = 0,36 triệu. 3 × 50 = 150 bữa. 0,36 triệu × 150 = 54 triệu bữa. 54 triệu × 45.000 = **2.430 tỷ**.

## Cùng khung, ngành khác: vé xem phim

Số chi tiết: 97,3 triệu dân × 12% đi rạp × 4,3 lần mỗi năm × 83.000đ ≈ **4.167 tỷ**.

Làm tròn vội: 100 triệu × 10% × 4 lần × 80.000đ = **3.200 tỷ**.

Lần này bản tròn **thấp hơn** khoảng 23%. Lý do: ba trong bốn con số bị làm tròn xuống — tỷ lệ 12% thành 10% đã là −17% — trong khi chỉ dân số được làm tròn lên một chút. Làm tròn cùng một hướng nhiều lần là cách nhanh nhất biến một ước lượng tốt thành một ước lượng lệch.

## Tự luyện ba phút

Số chi tiết: 2,9 triệu người × 18% × 11 lần mỗi năm × 52.000đ. Làm tròn thành 3 triệu × 20% × 10 lần × 50.000đ.

Tính cả hai và mức lệch.

*Đáp án:* bản tròn **300 tỷ**. Bản chi tiết khoảng **298,6 tỷ**. Lệch chưa tới **0,5%** — vì hai số làm tròn lên (dân số, tỷ lệ) và hai số làm tròn xuống (tần suất, giá) bù trừ gần hết cho nhau.
`);

LRDX("f-sizing-7", `
## Giám khảo hỏi tiếp

**"8.000 quán đã tính cà phê vỉa hè và xe đẩy chưa?"** Chưa. Nếu có thêm khoảng **5.000** điểm bán vỉa hè, mỗi điểm **60 ly** một ngày, cộng thêm 300.000 ly. Tổng lên **940.000 ly** — gần hơn nhiều với ước lượng phía cầu 1,2 triệu ly.

> "Phía cung ban đầu bỏ sót cà phê vỉa hè. Cộng khoảng 5.000 điểm bán, mỗi điểm 60 ly, ra khoảng 940 nghìn ly một ngày, khoảng chênh với phía cầu còn dưới 30%."

**"Đổi sang tiền được bao nhiêu?"** Với giá trung bình **25.000đ** mỗi ly, 640.000 ly mỗi ngày trong 365 ngày là khoảng **5.840 tỷ** mỗi năm.

**"Làm sao kiểm chứng 80 ly mỗi quán?"** Đứng trước ba quán khác nhau trong một giờ cao điểm và đếm. Nếu giờ cao điểm bán **20 ly** và cả ngày tương đương khoảng **4 giờ cao điểm**, ra 80 ly. Phía cung có lợi thế này: đếm được bằng mắt.

## Cùng khung, ngành khác: bánh mì buổi sáng ở TP.HCM

- **Phía cung:** khoảng **10.000** xe và tiệm bánh mì, mỗi điểm bán **150 ổ** buổi sáng → **1,5 triệu ổ** mỗi ngày.
- **Phía cầu:** **9 triệu** dân, 15% ăn bánh mì sáng mỗi ngày, 1 ổ mỗi người → **1,35 triệu ổ**.

Hai phía lệch khoảng 11%. Khác cà phê Hà Nội ở chỗ phía cung **cao hơn** phía cầu. Một lý do hợp lý: bánh mì còn bán cho người lao động ngoại tỉnh và khách vãng lai không tính trong dân số đăng ký — đúng loại giả định mà phép đối chiếu hai phía giúp lộ ra.

## Tự luyện ba phút

Ước lượng thị trường sửa điện thoại ở Hà Nội: 2.000 tiệm sửa, mỗi tiệm 8 máy mỗi ngày, 300 ngày mở cửa, giá trung bình mỗi lần sửa 300.000đ.

*Đáp án:* 2.000 × 8 × 300 × 300.000đ = **1.440 tỷ** mỗi năm. Giả định nên kiểm chứng trước là 8 máy mỗi ngày — tiệm ở phố chuyên điện thoại và tiệm trong ngõ chênh nhau rất xa.
`);

LRDX("f-sizing-8", `
## Giám khảo hỏi tiếp

**"Vì sao 8% mà không phải 15%?"** Neo vào thị trường thật. Nếu người dẫn đầu chiếm khoảng 30%, người thứ hai 15%, người thứ ba 8%, thì 8% sau ba năm nghĩa là **trở thành người chơi thứ ba** — một mục tiêu tham vọng nhưng có tiền lệ. 15% là vượt người thứ hai, cần lý do rất mạnh.

**"Nếu mở rộng ra thêm ba quận, SAM lên 60%?"** SAM = 2.430 × 60% = **1.458 tỷ**. SOM với cùng 8% = **116,64 tỷ**. Nhưng đừng giữ nguyên 8% một cách máy móc — ở quận mới, thương hiệu yếu hơn, thị phần ban đầu thường thấp hơn.

> "Mở thêm ba quận đưa SAM lên khoảng 1.460 tỷ. Em không giữ nguyên 8% ở vùng mới; thị phần ở đó nên tính riêng, thấp hơn."

**"78 tỷ mỗi năm là bao nhiêu mỗi tháng?"** 77,76 ÷ 12 = **6,48 tỷ** mỗi tháng. Con số tháng giúp đội vận hành hình dung ngay khối lượng việc.

## Cùng khung, ngành khác: phần mềm quản lý nhà thuốc

- **TAM:** khoảng **60.000** nhà thuốc × **3 triệu đồng** phí phần mềm mỗi năm = **180 tỷ**.
- **SAM:** chỉ nhà thuốc độc lập có máy tính ở 5 thành phố lớn, nơi có đội triển khai — **35%** → **63 tỷ**.
- **SOM:** **10%** SAM sau ba năm → **6,3 tỷ** mỗi năm.

Khác cơm trưa ở chỗ nào? Ranh giới giữa TAM và SAM không phải bán kính giao hàng mà là **khả năng triển khai và hỗ trợ**: phần mềm bán được toàn quốc qua mạng, nhưng nhà thuốc cần người đến cài đặt và đào tạo. SAM phải phản ánh giới hạn đó.

## Tự luyện ba phút

Gia sư toán lớp 9 trực tuyến. Mỗi độ tuổi khoảng 1,33 triệu học sinh (100 triệu ÷ 75). 40% học thêm, trung bình 1 triệu đồng mỗi tháng, 9 tháng. SAM là nhóm học trực tuyến ở thành phố lớn, 25% TAM. SOM là 2% SAM.

*Đáp án:* TAM ≈ 1,33 triệu × 40% × 9 × 1 triệu = **4.800 tỷ**. SAM = **1.200 tỷ**. SOM = **24 tỷ**.
`);

LRDX("f-sizing-9", `
## Giám khảo hỏi tiếp

**"Biến nào gây lệch?"** Thử cho từng biến gánh toàn bộ khoảng chênh, rồi xem con số cần thiết có hợp lý không. Nếu phía cầu dùng **2,2 bữa** mỗi tuần thay vì 3: 1,2 triệu × 30% × 2,2 × 50 × 45.000đ = **1.782 tỷ** — gần khớp phía cung. 2,2 bữa mỗi tuần là con số rất hợp lý với dân văn phòng; 3 bữa có lẽ đã lạc quan.

**"Hay phía cung đang thiếu nhà hàng?"** Cũng thử theo cách đó: để phía cung đạt 2.430 tỷ với 30 đơn mỗi ngày, cần khoảng **5.400** nhà hàng thay vì 4.000. Có thể — nếu có nhiều bếp chỉ bán online chưa được đếm.

> "Có hai cách giải thích: người dùng đặt khoảng 2,2 bữa mỗi tuần chứ không phải 3, hoặc phía cung thiếu khoảng 1.400 bếp online. Em nghiêng về cách thứ nhất và muốn kiểm tra bằng dữ liệu tần suất đặt đơn."

**"Vậy dùng con số nào?"** Trình bày khoảng **1.800–2.430 tỷ**, chọn phía cung làm cơ sở cho kế hoạch vì nó dựa trên thứ đếm được.

## Cùng khung, ngành khác: khám thú y

- **Phía cầu:** **5 triệu** chó mèo được nuôi làm thú cưng × **2 lần** khám mỗi năm × **250.000đ** = **2.500 tỷ**.
- **Phía cung:** **3.000** phòng khám × **8 lượt** mỗi ngày × **330 ngày** × 250.000đ = **1.980 tỷ**.

Chênh lệch: 520 ÷ 1.980 ≈ **26%**. Cùng vùng xử lý với bài cơm trưa. Ứng viên đầu tiên cho biến gây lệch: "2 lần khám mỗi năm" — nhiều chủ nuôi chỉ đưa thú cưng đi tiêm phòng một lần, và mèo nuôi trong nhà gần như không đi khám.

## Tự luyện ba phút

Phía cầu ra 600 tỷ, phía cung ra 200 tỷ. Chênh bao nhiêu phần trăm, thuộc vùng nào, và việc đầu tiên nên làm là gì?

*Đáp án:* (600 − 200) ÷ 200 = **200%**. Vượt xa vùng 20–50%. Việc đầu tiên không phải tìm giả định lệch, mà là **kiểm tra đơn vị**: một phía có thể đang tính theo tháng, phía kia theo năm; hoặc một phía tính lượt, phía kia tính người.
`);

LRDX("f-sizing-10", `
## Giám khảo hỏi tiếp

**"Giả định nào nhạy nhất?"** Tỷ lệ 20% — vì nó mượn từ nhóm tương tự, không đo trực tiếp. Nếu thực tế 10–30%, thị trường nằm trong khoảng **300–900 tỷ**. Số xe máy điện có thống kê đăng ký; giá mỗi lượt sạc có tham chiếu từ giá điện; chỉ tỷ lệ dùng trạm công cộng là đoán.

**"Cần bao nhiêu trạm để phục vụ 40 triệu lượt?"** Một trạm **4 cổng**, mỗi cổng khoảng **30 lượt** mỗi ngày, 360 ngày → 43.200 lượt mỗi trạm mỗi năm. 40 triệu ÷ 43.200 ≈ **926 trạm**. Nếu cả nước hiện chỉ có vài chục trạm, thị trường 600 tỷ là **tiềm năng**, chưa phải doanh thu có thể đạt được trong vài năm tới.

> "600 tỷ cần khoảng 930 trạm để phục vụ. Trần hạ tầng mới là giới hạn thật trong ba năm đầu, không phải nhu cầu."

**"Nhóm tương tự nào đáng tin?"** Chọn nhóm giống về **hành vi**, không giống về sản phẩm: người dùng xe máy điện ở chung cư không có chỗ sạc riêng giống người đi ô tô điện ở chung cư hơn là giống người sạc điện thoại ở quán cà phê.

## Cùng khung, ngành khác: giặt sấy tự động cho sinh viên

Dịch vụ mới, không có số liệu doanh thu. Mượn hành vi từ nhóm tương tự:

- **1 triệu** sinh viên ở trọ tại Hà Nội và TP.HCM.
- **25%** dùng giặt sấy tự động thay vì giặt tay — mượn từ tỷ lệ ở các khu trọ đã có máy.
- **1 lần** mỗi tuần, **40 tuần** học.
- **40.000đ** mỗi lượt.

Quy mô: 1 triệu × 25% × 40 × 40.000đ = **400 tỷ** mỗi năm.

Điểm yếu giống trạm sạc: tỷ lệ 25% mượn từ khu trọ đã có máy — nơi sinh viên **đã chọn** sống gần máy giặt. Tỷ lệ ở khu chưa có máy có thể thấp hơn nhiều.

## Tự luyện ba phút

Tủ khoá nhận hàng thương mại điện tử: 5 triệu đơn mỗi ngày ở hai thành phố lớn, 5% chọn nhận qua tủ, 360 ngày, phí 3.000đ mỗi đơn.

*Đáp án:* 5 triệu × 5% × 360 × 3.000đ = **270 tỷ** mỗi năm. Giả định nhạy nhất là 5% — mượn từ nước nào, và người mua ở đó có sống trong chung cư như ở Việt Nam không?
`);

LRDX("f-sizing-11", `
## Giám khảo hỏi tiếp

**"Nếu tần suất cũng dao động 2–4 bữa?"** Kết hợp hai biến ở hai đầu: thấp nhất 1,2 triệu × 20% × 2 × 50 × 45.000đ = **1.080 tỷ**; cao nhất 1,2 triệu × 40% × 4 × 50 × 45.000đ = **4.320 tỷ**. Khoảng rộng gấp **4 lần**. Đó là lý do phải tìm biến nhạy nhất và kiểm chứng nó — hai biến không chắc chắn nhân với nhau làm khoảng dao động nở rất nhanh.

**"Ngưỡng đầu tư là 1.500 tỷ. Có đạt không?"** Chỉ đổi tỷ lệ, kịch bản thấp 1.620 tỷ vẫn trên ngưỡng. Kết hợp cả hai biến ở mức thấp, 1.080 tỷ thì dưới ngưỡng. Câu trả lời trung thực: "đạt trong mọi kịch bản một biến; chỉ trượt khi cả tỷ lệ và tần suất cùng ở mức thấp nhất."

> "Thị trường vượt ngưỡng 1.500 tỷ trừ khi cả tỷ lệ đặt app và tần suất cùng rơi về mức thấp nhất. Em muốn kiểm chứng tỷ lệ đặt app trước, vì nó quyết định gấp đôi hay một nửa."

**"Kiểm chứng tốn bao nhiêu?"** Một khảo sát 200 dân văn phòng ở ba toà nhà — vài ngày và rất ít tiền — so với một quyết định đầu tư hàng chục tỷ.

## Cùng khung, ngành khác: bảo hiểm thú cưng

- **Cơ sở:** **5 triệu** thú cưng × **2%** mua bảo hiểm × **1,5 triệu đồng** phí mỗi năm = **150 tỷ**.
- **Khoảng:** tỷ lệ mua từ 1% đến 4% → **75–300 tỷ**.

Ở sản phẩm mới như bảo hiểm thú cưng, tỷ lệ mua gần như không có mốc trong nước. Khoảng dao động gấp bốn lần là bình thường, và cách trình bày đúng không phải giấu khoảng rộng đó — mà là nói rõ **thử nghiệm nào** sẽ thu hẹp nó: bán thử qua ba phòng khám thú y trong ba tháng.

## Tự luyện ba phút

Quy mô cơ sở 500 tỷ. Biến A cho khoảng 400–650 tỷ. Biến B cho khoảng 450–520 tỷ.

Biến nào cần kiểm chứng trước? Khoảng rộng của nó là bao nhiêu?

*Đáp án:* biến A, khoảng rộng **250 tỷ**, so với **70 tỷ** của biến B. Chú ý thêm: khoảng của A lệch về phía cao — rủi ro giảm 100 tỷ, cơ hội tăng 150 tỷ.
`);

LRDX("f-sizing-12", `
## Giám khảo hỏi tiếp

**"200 nhà hàng đối tác có phục vụ nổi 1.200 đơn mỗi ngày không?"** 1.200 ÷ 200 = **6 đơn** mỗi nhà hàng mỗi ngày — rất khả thi. Điểm nghẽn thật nằm ở **người giao hàng giờ trưa**: nếu mỗi người giao được khoảng 12 đơn trong khung 11–13 giờ, cần **100 người giao hàng**. Đó mới là con số đội vận hành phải lo.

**"Nếu giá trung bình chỉ 40.000đ?"** Số đơn cần tăng lên 19,44 tỷ ÷ 40.000đ = **486.000 đơn**, tức **1.350 đơn** mỗi ngày. Giá mỗi đơn thấp hơn 11% đòi hỏi khối lượng việc cao hơn 12,5%.

> "Nếu giá trung bình về 40.000đ, mục tiêu tăng lên khoảng 1.350 đơn mỗi ngày, và cần thêm khoảng 13 người giao hàng giờ trưa."

**"Cần bao nhiêu tiền marketing?"** Chuyển đơn sang khách. Nếu mỗi khách đặt **30 đơn** mỗi năm, cần 432.000 ÷ 30 = **14.400 khách**. Với chi phí có một khách **150.000đ**, ngân sách khoảng **2,16 tỷ**. Mỗi con số thị trường cuối cùng phải trở thành một con số ngân sách và một con số nhân sự.

## Cùng khung, ngành khác: phần mềm quản lý nhà thuốc

SOM năm thứ ba **6,3 tỷ**. Năm đầu đạt **25%** → **1,575 tỷ**. Phí **3 triệu** mỗi nhà thuốc mỗi năm → cần **525** nhà thuốc.

Đổi sang việc: **khoảng 44** nhà thuốc mới mỗi tháng. Nếu một nhân viên kinh doanh chốt được **15** nhà thuốc mỗi tháng, cần **3 người** — con số mà ban giám đốc có thể duyệt ngay trong cuộc họp.

Khác cơm trưa ở chỗ: ở phần mềm, đơn vị vận hành là **khách hàng ký hợp đồng**, không phải đơn hàng mỗi ngày; và điểm nghẽn là **người bán và người triển khai**, không phải người giao hàng.

## Tự luyện ba phút

SOM năm thứ ba 40 tỷ. Năm đầu đạt 30%. Giá trung bình mỗi đơn 60.000đ. Chạy 360 ngày.

Tính doanh thu năm đầu, số đơn cả năm và số đơn mỗi ngày.

*Đáp án:* **12 tỷ**, **200.000 đơn**, khoảng **556 đơn** mỗi ngày.
`);
