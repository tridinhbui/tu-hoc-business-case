# Tự học Business Case — luyện giải case

Website gamified để **luyện giải business case thực chiến** và **hiểu mô hình kinh doanh của doanh nghiệp thật** (ưu tiên Việt Nam, có benchmark quốc tế).

## Chạy

Không cần build. Mở `index.html` bằng trình duyệt, hoặc chạy một static server:

```bash
python3 -m http.server 4477
```

Rồi mở http://localhost:4477

Tiến độ (XP, level, badge, streak, lịch sử case) lưu trong `localStorage` của trình duyệt.

## Có gì bên trong

| Khu vực | Route | Nội dung |
|---|---|---|
| Homepage | `#/` | Hero + Start here + Daily Case + Continue Mission + Level + Streak |
| Learn | `#/learn` · `#/track/<id>` · `#/lesson/<id>` | Lộ trình học: track → module → lesson → case |
| Exam & Certificate | `#/exam/<track>` · `#/certificate/<track>` | Bài kiểm tra cuối lộ trình và chứng chỉ |
| Daily challenge | `#/daily` | Assignment hôm nay, có bấm giờ, leaderboard 4 trục |
| Business World Map | `#/map` | 14 industry district, mở dần theo cấp bậc |
| District | `#/district/<id>` | Company buildings + mission của ngành |
| Company dossier | `#/company/<id>` | 47 doanh nghiệp: how they make money, revenue model, cost structure, moat, metrics, competitors, challenges |
| Mission board | `#/cases` | 36 case, filter theo độ khó / loại / ngành / trạng thái |
| Case player | `#/case/<id>` | Engine giải case nhiều bước |
| Case review | `#/review/<id>` | Chấm 5 nhóm năng lực + so với lời giải mẫu |
| Business models | `#/models` | 12 mô hình + mini case tự chọn revenue stream |
| Company battles | `#/battles` | So 2 doanh nghiệp trên 4 mặt trận + comparative analysis |
| Dossier | `#/profile` | Career track, chứng chỉ, điểm yếu theo module, badge, streak, leaderboard |
| Giá & gói | `#/pricing` | Bốn gói, bảng so sánh, FAQ — thanh toán chưa mở |
| Điều khoản | `#/terms` | Miễn trừ số liệu, quy trình gỡ nội dung, quyền riêng tư |

## Tầng học (Learn)

```
Track (lộ trình) → Module (chương) → Lesson (bài học) → Case (bài kiểm tra)
```

3 track: **Foundations · Case Cracking · Vietnam Business**. Module nào chưa có bài giảng thì ghi rõ *"đang biên soạn"* và vẫn cho vào thẳng case.

**Track Foundations đã hoàn chỉnh: 5 module · 20 bài học**, mỗi module dẫn vào một case có sẵn.

| Module | Bài học | Case đích |
|---|---|---|
| **Reading a P&L** · Đọc báo cáo lãi lỗ | Doanh thu ≠ lợi nhuận · Cố định vs biến đổi · Biên đóng góp · Điểm hoà vốn | Cứu lợi nhuận chuỗi cà phê |
| **Unit Economics** · Kinh tế đơn vị | Đơn vị phân tích · CAC & LTV · Thời gian hoàn vốn · Same-store vs new-store | Chuỗi bách hoá chưa có lãi |
| **Cost Structure** · Cấu trúc chi phí | Giải phẫu nền chi phí · Công suất & lấp đầy · Chi phí không được cắt · Quy mô vs mật độ | Bệnh viện và giường trống |
| **Growth Levers** · Đòn bẩy tăng trưởng | Giá × Sản lượng × Mix · Bốn hướng tăng trưởng · Lợi thế còn hiệu lực ở đâu · Khi tăng trưởng phá huỷ giá trị | Tăng trưởng khi thị trường bão hoà |
| **Reading a Company** · Đọc một doanh nghiệp | Từ mô hình tới chỉ số · Ba báo cáo trong một trang · Chất lượng lợi nhuận · Dấu hiệu cảnh báo | Lương kỹ sư tăng nhanh hơn giá bán |

**Track Case Cracking đã hoàn chỉnh: 6 module · 24 bài học**

| Module | Bài học | Case đích |
|---|---|---|
| **MECE & Issue Trees** · Cây vấn đề | Thế nào là MECE · Cây chuẩn nên thuộc · Chia sâu tới đâu · Dựng cây trong 60 giây | NIM giảm, rủi ro tăng |
| **Hypothesis-led** · Tư duy giả thuyết | Giả thuyết trước dữ liệu · Thiết kế phép thử · Bẫy tự xác nhận · Cập nhật hay bảo vệ | Nâng take rate |
| **Case Math** · Tính nhẩm | Làm tròn trước · Phần trăm không máy tính · Kiểm tra hợp lý · Tính trước mặt người khác | Mỗi xe là một khoản lỗ |
| **Synthesis** · Chốt kết luận | Câu trả lời trước · Quy tắc ba lý do · Từ phát hiện tới ý nghĩa · Ứng phó phản biện | Có lãi nhưng hết tiền |
| **Market Sizing** · Ước lượng quy mô | Top-down vs bottom-up · Chọn phân khúc · Giả định nào quan trọng · Kiểm chứng chéo | Thị trường sữa hạt |
| **Communication** · Trình bày | Khuyến nghị 60 giây · Nói với ai · Một biểu đồ một thông điệp · Nói "tôi không biết" | Tăng giá hay thêm gói rẻ |

**Track Vietnam Business đã hoàn chỉnh: 5 module · 20 bài học**

| Module | Bài học | Case đích |
|---|---|---|
| **Vietnam Retail** · Bán lẻ | Hai thế giới phân phối · Vì sao minimart khó có lãi · Bài toán hàng tươi · Nhãn riêng và quyền lực kệ hàng | Chuỗi minimart chưa hoà vốn |
| **Vietnam Banking** · Ngân hàng | Ngân hàng VN kiếm tiền thế nào · CASA và chi phí vốn · Chu kỳ tín dụng · Đọc báo cáo ngân hàng | NIM giảm, rủi ro tăng |
| **Vietnam Platforms** · Nền tảng số | Thanh toán không tự nuôi được mình · Cuộc chiến trợ giá · Các tầng kiếm tiền · Quy định là biến số kinh doanh | Ví điện tử phải kiếm tiền thật |
| **Vietnam Property** · Bất động sản | Chủ đầu tư kiếm tiền thế nào · Pháp lý là cánh cổng thật · Đòn bẩy và trái phiếu · Đọc dòng tiền chủ đầu tư | Có lãi nhưng hết tiền |
| **Reading VN Filings** · Đọc báo cáo | Ba trang đầu · Mẹ, con và liên kết · Sự thật trong thuyết minh · So sánh cùng ngành | Lương tăng nhanh hơn giá bán |

**Tổng: 64 bài học · 16 module · 3/3 track hoàn chỉnh.**

### Bài kiểm tra cuối lộ trình và chứng chỉ

Mỗi track có một bài kiểm tra 10 câu (`#/exam/<track>`), **câu hỏi hoàn toàn mới, không lặp lại bài tập trong lesson**. Bài thi mở khi hoàn thành hết bài học của lộ trình, đạt từ 70 điểm, không giới hạn số lần làm lại.

Khác với lesson, bài thi **không có phản hồi giữa chừng** — trả lời hết rồi mới xem kết quả, có thể quay lại sửa bất kỳ câu nào trước khi nộp. Màn hình kết quả chấm điểm theo từng module và gợi ý học lại đúng chương bị yếu.

Đạt bài thi sẽ cấp **chứng chỉ** (`#/certificate/<track>`) có tên người học, điểm, ngày cấp và danh sách module đã hoàn thành. Chứng chỉ ghi rõ đây là sản phẩm luyện tập, không phải chứng chỉ nghề nghiệp được công nhận.

### Phân tích điểm yếu

Dossier tính điểm cho từng module theo trọng số: **bài kiểm tra cuối lộ trình (×2) · case của module (×1,5) · bài tập trong lesson (×1)**, rồi liệt kê ba module yếu nhất kèm nút học lại và giải lại case. Module trên 80 điểm được xếp vào nhóm đang mạnh.

Một case có thể là đích của nhiều module (case NIM thuộc cả *MECE* lẫn *Vietnam Banking*). Banner gợi ý chọn module theo thứ tự ưu tiên: module đang học dở → module chưa bắt đầu → module đã hoàn thành.

Mỗi lesson theo một khuôn cố định: **Hook → Core → Worked example (hiện dần từng bước) → Check → Recap → Terms → Next**. Bài tập trong Check dùng lại đúng mô hình chấm điểm của case (`mcq` / `multi` / `calc`), có gợi ý −25% điểm và 2 lần thử cho câu tính toán.

**Case không bị khoá cứng.** Case nào có module dẫn vào sẽ hiện banner *Recommended first · Nên học trước*, kèm nút học bài tiếp theo — nhưng người dùng vẫn vào thẳng được. Muốn khoá cứng thì sửa một chỗ duy nhất: `VIEWS.case` trong `assets/js/views/player.js`.

Thêm bài học mới: thêm object vào `window.LESSONS` trong `assets/js/data/lessons.js`, khai báo id vào mảng `lessons` của module tương ứng và đổi `status` của module thành `"ready"`.

## Hướng thiết kế

Editorial ấm trên nền giấy kem, không phải dashboard tối.

| | |
|---|---|
| Nền | kem `#F7F2E9` với hạt giấy mờ, thẻ trắng ngà `#FFFDF8` |
| Accent | đất nung `#C1613C` (hành động), rêu `#6B7A50` (hoàn thành), vàng đất `#C08A3C` |
| Chữ hiển thị | **Fraunces** — serif old-style, dùng cho hero, tiêu đề mục, tên case |
| Giao diện | **Inter** cho nhãn và nội dung; **IBM Plex Mono** chỉ cho số liệu và bảng tính |
| Hình khối | bo 6–10px, viền mảnh `#E7DECD`, đổ bóng rất nhẹ, nâng nhẹ khi hover |
| Minh hoạ | bản đồ đường bình độ và dải núi **vẽ hoàn toàn bằng SVG** trong mã — không ảnh ngoài, không phụ thuộc mạng |

Hero là bản đồ nhiệm vụ dạng địa hình: các chặng trên đường nét đứt phản ánh **tiến độ case thật** của người học (đã xong · đang làm · chưa mở). Mỗi industry district có một dải núi riêng dựng từ chính dữ liệu của ngành, xoay vòng qua bốn bảng màu.

## Tìm kiếm toàn cục

`Ctrl/⌘ + K` hoặc phím `/` mở ô tìm kiếm phủ toàn màn hình. Index gồm gần 190 mục: case, bài học, doanh nghiệp, mô hình kinh doanh, module, battle, ngành.

- **Gõ không dấu vẫn ra kết quả có dấu** — `ngan hang` tìm được *Ngân hàng*, `hoa von` tìm được *điểm hòa vốn*
- Tìm được cả theo **thuật ngữ trong bài học** (mục Terms), mã chứng khoán, tên ngành, mô hình kinh doanh
- Chấm điểm ưu tiên **khớp trọn từ và khớp nguyên cụm** hơn khớp chuỗi con, nên `ban le` ra case bán lẻ chứ không ra *Banking* hay *bán thẻ*
- Điều hướng bằng `↑` `↓` `↵` `ESC`

## Sao lưu tiến độ

Tiến độ nằm hoàn toàn trong `localStorage` của trình duyệt — không tài khoản, không máy chủ. Vì một lộ trình đầy đủ mất nhiều giờ học, Dossier có mục **Backup · Sao lưu tiến độ**:

- **Tải file sao lưu** — xuất toàn bộ tiến độ ra một file `.json` kèm phần tóm tắt
- **Khôi phục từ file** — kiểm tra file trước khi nạp (đúng app, đúng cấu trúc), hiện bảng đối chiếu bản sao lưu với tiến độ hiện tại rồi mới hỏi xác nhận
- **Gộp thay vì ghi đè** — mỗi case, bài học, bài thi đều giữ kết quả **tốt hơn**; badge và ending đã khám phá được hợp nhất. Khôi phục nhầm file cũ không làm mất tiến độ mới.
- Nút xoá tiến độ nhắc số bài học và case sẽ mất trước khi thực hiện

## Phím tắt khi luyện tập

| Phím | Tác dụng |
|---|---|
| `1`–`9` | Chọn đáp án (case, bài học, bài thi) hoặc mở gói dữ liệu trong data room |
| `↵` | Xác nhận / sang bước tiếp theo |
| `H` | Gợi ý ở câu tính toán (−25% điểm) |
| `←` `→` | Chuyển câu trong bài kiểm tra |
| `Ctrl/⌘ K` hoặc `/` | Mở tìm kiếm |

Gợi ý phím hiện ngay cạnh nút thao tác. Phím tắt tự tắt khi con trỏ đang ở ô nhập liệu hoặc khi ô tìm kiếm đang mở.

## Case engine

Mỗi mission gồm nhiều bước, mỗi bước thuộc một trong 7 dạng:

- `tree` — **dựng issue tree**: gắn nhánh vào cây từ một root cho trước, cây được vẽ lại theo từng lựa chọn và mở ra các nhánh con khi chấm điểm
- `multi` — chọn nhiều đáp án đúng (chấm điểm trừ khi chọn sai)
- `datalab` — data room có giới hạn lượt mở; chọn sai gói dữ liệu là mất lượt
- `calc` — nhập số, dung sai theo bài, 2 lần thử, có gợi ý (−25% điểm)
- `decision` — quyết định làm thay đổi diễn biến case, mỗi lựa chọn có hệ quả riêng
- `rank` — xếp thứ tự ưu tiên hành động
- `recommend` — khuyến nghị cuối cùng

Ở chế độ daily, mọi dạng bước trên chạy dưới một đồng hồ đếm ngược.

### Daily challenge — case có bấm giờ

`#/daily` giao đúng một case mỗi ngày, chọn theo ngày và theo cấp bậc người chơi. Bấm *Bắt đầu* là đồng hồ chạy: countdown hiển thị ở đầu màn hình, chuyển vàng khi còn dưới 1 phút và chuyển đỏ khi quá giờ.

Điểm daily chấm theo bốn trục có trọng số:

| Trục | Trọng số | Lấy từ |
|---|---|---|
| Accuracy | 35% | Quantitative + Business insight |
| Logic | 25% | Structure + Prioritization |
| Recommendation quality | 25% | Recommendation |
| Speed | 15% | 100 nếu trong giới hạn, giảm tuyến tính về 0 khi chạm gấp đôi thời gian |

Chỉ lần nộp đầu tiên trong ngày được tính điểm — giải lại vẫn học được nhưng không sửa được bảng xếp hạng. Đồng hồ sống sót qua reload (mốc bắt đầu lưu cùng tiến độ case).

### Multiple endings

Một số case rẽ nhánh thật: lựa chọn ở bước `decision` mang theo khóa `ending`, và màn review hiển thị kết cục bạn đã đạt được cùng danh sách các ngã rẽ chưa khám phá. Giải lại và chọn khác sẽ ra kết cục khác — badge *Path Finder* mở khi bạn đạt 2 ending khác nhau trong cùng một case.

Điểm số và ending là hai trục độc lập: bạn có thể phân tích tốt (điểm cao) mà vẫn đi tới một kết cục tốn kém, và màn review sẽ nói thẳng điều đó.

Điểm được quy về 5 nhóm: **Structure · Quantitative analysis · Business insight · Prioritization · Recommendation**.

## Cấu trúc file

```
index.html
assets/css/app.css          # design system
assets/js/data/             # industries, companies, models, battles, cases
assets/js/state.js          # XP, level, badge, streak, persistence
assets/js/search.js         # tìm kiếm toàn cục (bỏ dấu, khớp cụm)
assets/js/backup.js         # xuất/nhập tiến độ, gộp an toàn
assets/js/keys.js           # phím tắt khi luyện tập
assets/js/ui.js             # helper render
assets/js/views/            # home, map, company, cases, player, models, battles, profile
assets/js/app.js            # hash router
```

## Lưu ý về số liệu

Số liệu trong hồ sơ doanh nghiệp là **ước lượng theo bậc độ lớn** phục vụ luyện tư duy, không phải số liệu kiểm toán. Số liệu trong case là dữ liệu giả lập được thiết kế để bài toán có lời giải rõ ràng.

## Tài liệu đi kèm

| File | Dùng khi nào |
|---|---|
| [KE-HOACH-EDUTECH.md](KE-HOACH-EDUTECH.md) | Kế hoạch đưa sản phẩm thành doanh nghiệp: mũi nhọn, giá, kênh, lộ trình 4 giai đoạn |
| [KE-HOACH-GIAO-DUC.md](KE-HOACH-GIAO-DUC.md) | Kế hoạch tầng bài giảng (đã hoàn thành cả 5 giai đoạn) |
| [HUONG-DAN-VIET-CASE.md](HUONG-DAN-VIET-CASE.md) | **Bắt buộc đọc trước khi viết case mới** — quy tắc biên tập, checklist 12 điểm, quy trình nộp bài |

## Thêm case mới

Thêm một object vào `window.CASES` trong `assets/js/data/cases.js` theo đúng schema (xem comment đầu file). Không cần đụng vào code engine.

Muốn case có nhiều ending: thêm `endings:{ key:{good, tag, title, text} }` vào case và gắn `ending:"key"` vào các lựa chọn của bước `decision`.

Muốn case có issue tree: dùng `kind:"tree"` với `root`, `need`, và mỗi option đúng kèm mảng `sub` liệt kê các nhánh con.
