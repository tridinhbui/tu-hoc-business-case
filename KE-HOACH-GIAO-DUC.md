# Kế hoạch: từ "sân chơi case" thành "trường học có giáo trình"

## 1. Vấn đề hiện tại

Tự học Business Case hôm nay dạy bằng cách **ném người học vào case**. Cách này hiệu quả với người đã có nền, nhưng người mới gặp ba rào cản:

| Rào cản | Biểu hiện thật trên site |
|---|---|
| Không biết thuật ngữ | Case nói "contribution margin", "take rate", "CASA" mà không ai dạy trước |
| Không biết phương pháp | Người học đoán mò ở bước dựng issue tree vì chưa từng được dạy MECE là gì |
| Không biết mình đang ở đâu | 30 case xếp ngang hàng, không có thứ tự học, không có "chương" |

Kế hoạch này thêm **tầng bài giảng** đứng trước case, giữ nguyên toàn bộ engine case đã có.

## 2. Nguyên tắc thiết kế

1. **Bài giảng phục vụ case, không thay case.** Mỗi lesson tồn tại vì có một case cần nó. Không có lesson "kiến thức chung".
2. **Đọc 5 phút — làm 10 phút.** Lesson ngắn, luôn kết thúc bằng một bài tập nhỏ rồi đẩy thẳng sang case thật.
3. **Không dựng lại bánh xe.** Lesson dùng lại đúng engine chấm điểm của case (`multi`, `calc`, `tree`…), chỉ khác vỏ trình bày.
4. **Song ngữ như hiện tại.** Thuật ngữ tiếng Anh là từ vựng cần học, nghĩa tiếng Việt đi kèm.

## 3. Kiến trúc nội dung

```
Track (lộ trình)  →  Module (chương)  →  Lesson (bài học)  →  Case (bài kiểm tra)
```

### 3 track khởi đầu

| Track | Cho ai | Số module | Kết thúc bằng |
|---|---|---|---|
| **Foundations · Nền tảng** | Người chưa biết gì | 5 | Giải được case Profitability độ khó Dễ |
| **Case Cracking · Giải case** | Người đi phỏng vấn consulting | 6 | Giải được case Expert không dùng hint |
| **Vietnam Business · Doanh nghiệp Việt** | Người muốn hiểu thị trường VN | 5 | Đọc được báo cáo tài chính một doanh nghiệp niêm yết |

### Ví dụ một module cụ thể

**Module: Đọc một P&L** (thuộc track Foundations)

| # | Lesson | Dạng | Thời lượng | Nối tới |
|---|---|---|---|---|
| 1 | Doanh thu không phải lợi nhuận | Giảng + ví dụ Highlands | 4 phút | — |
| 2 | Chi phí cố định vs biến đổi | Giảng + phân loại 8 khoản chi | 5 phút | bài tập `multi` |
| 3 | Contribution margin | Giảng + 3 phép tính | 6 phút | bài tập `calc` |
| 4 | Điểm hoà vốn | Giảng + đồ thị | 5 phút | bài tập `calc` |
| ▶ | **Case: Cứu lợi nhuận chuỗi cà phê** | case đầy đủ | 15 phút | `c-coffee-profit` |

Người học chỉ mở được case khi đã qua 4 lesson — và khi vào case, họ gặp lại **đúng những con số vừa học**.

## 4. Cấu trúc một trang Lesson

```
┌─ Tiêu đề song ngữ + thời lượng + module đang học
├─ HOOK      — một câu hỏi khiến người đọc thấy mình chưa biết
├─ CORE      — 3-5 khối giải thích ngắn, mỗi khối 1 ý, có ví dụ doanh nghiệp thật
├─ WORKED    — một ví dụ giải mẫu từng bước, hiện dần (không đổ hết ra ngay)
├─ CHECK     — 2-3 câu hỏi dùng engine chấm điểm sẵn có
├─ RECAP     — 3 gạch đầu dòng phải nhớ
└─ NEXT      — nút đi tiếp: lesson sau, hoặc case nếu đã hết module
```

## 5. Thay đổi kỹ thuật

Toàn bộ nằm gọn trong pattern hiện tại, không cần build step:

| Việc | File | Ghi chú |
|---|---|---|
| Dữ liệu bài học | `assets/js/data/lessons.js` (mới) | `TRACKS`, `MODULES`, `LESSONS` |
| Trang học | `assets/js/views/learn.js` (mới) | `#/learn`, `#/track/<id>`, `#/lesson/<id>` |
| Tiến độ học | `state.js` | thêm `lessons:{}`, `tracks:{}` — cùng cơ chế localStorage |
| Khoá/mở case | `state.js` `isUnlocked()` | thêm điều kiện `requiresLesson` |
| Điều hướng | `index.html` + `app.js` | thêm mục **Learn · Học** lên đầu nav |
| Trang chủ | `views/home.js` | đổi khối chính thành "Tiếp tục học" thay vì "Tiếp tục case" |

Engine chấm điểm, XP, badge, streak: **giữ nguyên, không sửa**.

## 6. Lộ trình triển khai

| Giai đoạn | Nội dung | Khối lượng |
|---|---|---|
| **1. Xương sống** | Schema + 3 route + trang track/lesson + tiến độ | 1 phiên làm việc |
| **2. Module mẫu** | Viết trọn "Đọc một P&L" (4 lesson) nối vào case cà phê đã có | 1 phiên |
| **3. Track Foundations** | 5 module × ~4 lesson = 20 lesson | 2-3 phiên |
| **4. Hai track còn lại** | Case Cracking + Vietnam Business | 3-4 phiên |
| **5. Bằng chứng học** | Bài kiểm tra cuối track, chứng chỉ, thống kê điểm yếu | 1 phiên |

Có thể dừng ở bất kỳ giai đoạn nào — mỗi giai đoạn đều để lại một sản phẩm dùng được.

## 7. Đo hiệu quả

Ba chỉ số duy nhất cần theo dõi, hiển thị ở Dossier:

1. **Tỷ lệ hoàn thành lesson → case** — bao nhiêu người học xong module thì thật sự giải case
2. **Điểm case lần đầu, có học vs không học** — bằng chứng bài giảng có tác dụng
3. **Nhóm năng lực yếu nhất** — gợi ý đúng module cần học lại, thay vì bắt học lại từ đầu

## 8. Điều KHÔNG làm

- Không làm video. Chi phí sản xuất cao, khó sửa, không đo được người học hiểu hay không.
- Không làm diễn đàn/bình luận. Cần kiểm duyệt, không phải lõi giá trị.
- Không làm lesson dài quá 7 phút. Vượt ngưỡng đó người học bỏ dở.
- Không tách bài giảng thành sản phẩm riêng. Lesson chỉ có nghĩa khi dẫn tới case.
