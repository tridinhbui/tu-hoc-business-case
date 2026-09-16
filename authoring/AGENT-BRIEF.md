# Brief cho agent viết nội dung

Dán nguyên file này (hoặc đường dẫn tới nó) vào một phiên agent khác để nó viết bài cùng bạn. Nó chứa đủ ngữ cảnh để làm việc mà không cần đọc lại toàn bộ repo.

## Việc cần làm

Viết **thân bài** (`authoring/lessons/<id>.md`) và **đề case** (`authoring/cases/C-0xx.md`) cho nền tảng tự học business case này, theo đúng định dạng trong `authoring/README.md`, theo thứ tự trong `authoring/PLAN.md`.

Chọn bài kế tiếp bằng:

```bash
python3 scripts/authoring-queue.py PATH-6
```

Kiểm tra trước khi coi là xong:

```bash
npm run content:check
```

## Quy tắc không được vi phạm

1. **Không bịa nguồn, không bịa số liệu thật.** Case là hư cấu (`is_fictional: true`) — mọi con số trong case do bạn tự đặt, tự nhất quán, và phải tự giải ra được. Còn số liệu về thế giới thật (dân số, quy mô ngành, giá thị trường) thì chỉ được nêu khi có link nguồn thật; không có thì viết dưới dạng giả định và nói rõ đó là giả định.
2. **Mã lỗi phải có thật.** Mỗi khối `pitfall` và mỗi `trap` phải gọi tên mã lỗi đang tồn tại trong `seed/curriculum.sql` (ví dụ SIZ-06, FRM-04). Bộ kiểm tra sẽ chặn mã không tồn tại. Đừng đặt mã mới.
3. **Mỗi bài phải kết thúc bằng một output cụ thể.** Dòng `Output:` phải nói được người học nộp *file gì, gồm những gì*. "Hiểu về market sizing" không phải output.
4. **Mỗi case đúng một insight đi ngược trực giác** (`insight:` ở frontmatter) và **số phải tự khớp** (`## frame.check`). Hai quy tắc này lấy từ chuẩn viết case của STRATLAB trên nhánh `main`, để nội dung dùng được cho cả hai sản phẩm.
5. **Tự giải bài tập và đề case của mình** trong đúng thời lượng ghi trên bài. Số trong khung trả lời phải nhân ra đúng — kiểm bằng máy tính, đừng ước lượng.
6. **Viết tiếng Việt cho người học Việt Nam**, thuật ngữ tiếng Anh giữ nguyên khi đó là cách người trong ngành thật sự gọi (issue tree, top-down, unit economics). Không dịch cưỡng ép.
7. **Không sửa file trong `seed/`.** Chúng được sinh ra từ script. Sửa ở `authoring/` rồi chạy lại.

## Giọng văn

Viết như một người đi làm hướng dẫn đồng nghiệp mới, không như sách giáo khoa. Câu ngắn. Ví dụ trước, định nghĩa sau. Nói thẳng cái gì sai và vì sao sai, thay vì liệt kê "các bước cần lưu ý". Tránh mở bài bằng "Trong thời đại ngày nay…".

Một đoạn văn tốt trong nền tảng này trả lời được một trong ba câu: *làm thế nào*, *vì sao sai*, *khi nào dùng cái này thay vì cái kia*. Đoạn nào không trả lời câu nào trong ba câu đó thì xoá.

## Mẫu tham chiếu

Đọc `authoring/lessons/019.md` và `authoring/cases/C-040.md` trước khi viết bài đầu tiên. Đó là hai bản mẫu đã qua kiểm tra, cho thấy độ sâu mong đợi: ví dụ đã giải có bảng giả định, bẫy gắn mã lỗi, khung chấm 3 phút, câu hỏi panel chia theo ba nhóm.

## Cách dùng agent để *ôn*, không phải để viết hộ

Khi đã có đề case trong `authoring/cases/`, có thể dùng chính nó để luyện với một agent:

- Đưa cho agent phần `context` + `question` + các mục `reveal`, và dặn: *chỉ được đưa dữ liệu ở mục reveal khi tôi hỏi đúng thứ đó; không gợi ý; không giải hộ.*
- Giải trong đúng `duration_min`, nộp output theo đúng dòng `Output:` của bài.
- Sau đó mới đưa `frame.structure`, `frame.numbers`, `frame.scoring` và bảo agent chấm theo đúng mức 1–4, bắt buộc **trích dẫn câu chữ trong bài làm của bạn** cho mỗi mức đã cho.
- Cuối cùng hỏi: *bài này dính mã lỗi nào trong số các trap?* — rồi tự vào nền tảng làm drill của mã đó.

Thứ tự này quan trọng: đưa khung trả lời trước khi giải là tự bỏ mất buổi luyện.
