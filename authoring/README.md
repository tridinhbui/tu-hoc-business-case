# authoring/

Nội dung do người viết, tách khỏi khung chương trình do `scripts/build-seed.py` sinh ra từ `content-source/`.

| | |
|---|---|
| `PLAN.md` | Thứ tự viết, định mức, định nghĩa "viết xong" |
| `AGENT-BRIEF.md` | Brief dán vào một phiên agent khác để viết cùng |
| `lessons/<id>.md` | Thân bài, id trùng id bài trong chương trình (`019.md`) |
| `cases/C-0xx.md` | Đề case đầy đủ: dữ liệu giữ lại, bẫy, khung trả lời |
| `templates/` | Mẫu để copy |

## Định dạng

Frontmatter `key: value` giữa hai dòng `---`, rồi các khối `## kind · Tiêu đề`.

Khối của thân bài: `goal`, `concept`, `worked_example`, `pitfall`, `checklist`, `exercise`, `source`.
Khối của case: `context`, `question`, `reveal · <trigger>`, `trap · <MÃ LỖI>`, `frame.structure`, `frame.numbers`, `frame.scoring`, `panel.numbers|feasibility|challenge`.

## Lệnh

```bash
python3 scripts/authoring-queue.py PATH-6   # bài kế tiếp phải viết
npm run content:check                       # kiểm tra chất lượng, không ghi gì
npm run content:authored                    # sinh seed/authored.sql
npm run db:seed:local                       # nạp vào D1 local
```

`npm run content:check` chặn: thiếu goal/worked_example/pitfall/exercise, thiếu dòng `Output:`, mã lỗi không tồn tại, case dưới 3 mẩu dữ liệu giữ lại, case không có bẫy, `frame.numbers` sai JSON, còn chữ TODO, và case đặt `published` khi chưa chạy thử đủ 3 lần.
