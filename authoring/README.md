# authoring/

Nội dung do người viết, tách khỏi khung chương trình do `scripts/build-seed.py` sinh ra từ `content-source/`.

| | |
|---|---|
| `PLAN.md` | Thứ tự viết, định mức, định nghĩa "viết xong" |
| `AGENT-BRIEF.md` | Brief dán vào một phiên agent khác để viết cùng |
| `lessons/<id>.md` | Thân bài, id trùng id bài trong chương trình (`019.md`) |
| `cases/C-0xx.md` | Đề case đầy đủ: dữ liệu giữ lại, bẫy, khung trả lời |
| `rubrics/<id>.md` | Mô tả 4 mức cho từng tiêu chí của một rubric |
| `templates/` | Mẫu để copy |

## Định dạng

Frontmatter `key: value` giữa hai dòng `---`, rồi các khối `## kind · Tiêu đề`.

Khối của thân bài: `goal`, `concept`, `worked_example`, `pitfall`, `checklist`, `exercise`, `source`.
Khối của rubric: mỗi khối là một tiêu chí (`## RM-A1.1 · Tên tiêu chí`), thân khối là 4 dòng đánh số `1.`–`4.` mô tả từng mức.

Khối của case: `context`, `question`, `reveal · <trigger>`, `trap · <MÃ LỖI>`, `frame.structure`, `frame.numbers`, `frame.check`, `frame.scoring`, `panel.numbers|feasibility|challenge`.

Hai chuẩn mượn từ [HUONG-DAN-VIET-CASE.md](https://github.com/tridinhbui/tu-hoc-business-case/blob/main/HUONG-DAN-VIET-CASE.md) của STRATLAB, để case viết một lần dùng được cho cả hai sản phẩm:

- **`insight:` trong frontmatter** — một câu, điều đi ngược trực giác mà case dạy. Người đọc gật đầu ngay thì insight chưa đủ mạnh.
- **`## frame.check`** — mỗi dòng `tên con số = biểu thức`, tham chiếu số khác bằng `[tên]`. Bộ kiểm tra tính lại và chặn nếu lệch quá 8%.

## Lệnh

```bash
python3 scripts/authoring-queue.py PATH-6   # bài kế tiếp phải viết
npm run content:check                       # kiểm tra chất lượng, không ghi gì
npm run content:authored                    # sinh seed/authored.sql
npm run db:seed:local                       # nạp vào D1 local
```

`npm run content:check` chặn: thiếu goal/worked_example/pitfall/exercise, thiếu dòng `Output:`, mã lỗi không tồn tại, case dưới 3 mẩu dữ liệu giữ lại, case không có bẫy, `frame.numbers` sai JSON, số liệu không khớp với chính phép tính của nó, thiếu `insight:`, còn chữ TODO, case đặt `published` khi chưa chạy thử đủ 3 lần, và rubric thiếu bất kỳ mức nào của bất kỳ tiêu chí nào.
