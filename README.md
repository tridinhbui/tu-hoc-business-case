# Business Case Platform

Website tự học Business Case. **Toàn bộ backend chạy trên Cloudflare**: Workers, D1, R2, KV, Durable Objects, Queues, Cron Triggers, Turnstile; thêm Email Service và Stream khi có tài khoản Paid và tên miền. Giao diện là React SPA build bằng Vite, phục vụ qua Workers static assets.

Kiến trúc chi tiết: mở `ARCHITECTURE.html`.

## Chạy ở máy

Yêu cầu Node 20 trở lên. Không cần tài khoản Cloudflare.

```bash
npm install
npm run types
npm run db:reset:local
npm run dev
```

Mở http://127.0.0.1:5173. Ở chế độ dev, bấm "Gửi link đăng nhập" là vào thẳng, không gửi email. Để thử vai người chấm, gọi `POST /api/dev/role` với `{"role":"grader"}` hoặc `{"role":"instructor"}` (chỉ có khi `DEV_MODE=true`).

## Nội dung chương trình

Nội dung trong D1 được sinh từ ba tài liệu nguồn trong `content-source/`: curriculum blueprint, đặc tả module B2, thư viện đề case.

```bash
npm run content:build
```

Script `scripts/build-seed.py` đọc tài liệu, sinh `seed/curriculum.sql` và in **báo cáo thiếu sót** — những gì tài liệu chưa đặc tả (mô tả 4 mức rubric, nguyên nhân gốc của mã lỗi, nguồn số liệu nền…). Script không tự bịa phần thiếu. Sửa tài liệu nguồn rồi chạy lại `npm run db:reset:local`.

Đề case được nạp ở trạng thái `draft`: database chỉ cho xuất bản sau 3 lần chạy thử.

Mỗi module có đúng một bài quyết định việc qua module (`lessons.gates_module = 1`). Nếu trục 100 bài đã có checkpoint của module thì dùng bài đó; module D1 dùng vòng thi 24 giờ (081). 22 module còn lại được sinh checkpoint `101`–`122` từ dòng "Checkpoint" của chính module trong blueprint. Checkpoint luôn do giảng viên chấm.

## Kiểm thử

```bash
npm run typecheck
npm run test:schema
npm run test:e2e
```

- `typecheck` kiểm tra TypeScript cho cả Worker (`tsconfig.json`) và React (`tsconfig.app.json`).
- `test:schema` chạy migration trên SQLite tạm, kiểm tra truy vấn khoá/mở bài và các ràng buộc phải từ chối dữ liệu sai.
- `test:e2e` chạy trên **dữ liệu mẫu cố định** (`seed/content_sample.sql`) trong một thư mục trạng thái riêng, không đụng tới nội dung thật đang dùng để dev:

  ```bash
  npm run e2e:reset
  npm run e2e:dev
  BASE_URL=http://127.0.0.1:5174 npm run test:e2e
  ```

  Đi trọn luồng: đăng nhập → khoá/mở bài → nộp → queue chấm → chấm theo rubric → queue readiness → mistake review → remediation → quyền xem và tải file → lên cấp → phòng live.

## Cấu trúc

| Đường dẫn | Nội dung |
|---|---|
| `worker/index.ts` | Router API, queue consumer, cron |
| `worker/auth.ts` | Magic link, session KV, Turnstile |
| `worker/gates.ts` | Năm cổng khoá/mở bài, ghi `lesson_progress` |
| `worker/attempts.ts` | Bắt đầu, tải file lên R2, nộp, mistake review |
| `worker/grading.ts` | Hàng đợi chấm, nhận bài, chấm theo rubric |
| `worker/readiness.ts` | Readiness, remediation, lên cấp, suy giảm hằng ngày |
| `worker/views.ts` | Dữ liệu cho giao diện: lộ trình, bài học, bài làm, tải file có kiểm tra quyền |
| `worker/liveroom.ts`, `worker/live.ts` | Durable Object `LiveRoom` và API phòng live |
| `src/` | React SPA: đăng nhập, lộ trình, bài học, bài làm, năng lực, hàng đợi chấm, form chấm |
| `migrations/content`, `migrations/learning` | Schema hai database D1 |
| `seed/content_sample.sql` | Dữ liệu mẫu module A4, B1, B2 kèm mô tả 4 mức rubric |
| `queries/gates.sql` | Truy vấn khoá/mở bài dùng trong kiểm thử schema |

## Deploy lên Cloudflare

Repo được nối với **Workers Builds** (Worker `tu-hoc-business-case`). Mỗi lần push lên `main`, Cloudflare build và deploy.

Cấu hình build trên dashboard (**Settings → Build**):

| Mục | Giá trị |
|---|---|
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Root directory | `/` |

`wrangler.jsonc` không ghi id tài nguyên: lần deploy đầu, Wrangler tự tạo D1 (`bc_content`, `bc_learning`), KV, R2 (`bc-content`, `bc-submissions`) và Queues rồi gắn vào Worker.

`wrangler deploy` **không** chạy migration. Sau lần deploy đầu tiên và sau mỗi migration mới:

```bash
npm run db:migrate:remote
npm run db:seed:remote
```

`db:seed:remote` ghi đè toàn bộ nội dung chương trình trong `bc_content` bằng bản sinh từ `content-source/`; không đụng tới dữ liệu người học trong `bc_learning`.

### Trước khi mở cho người học thật

- Tài khoản **Workers Paid** — gói Free giới hạn CPU 10 ms mỗi request, D1 500 MB mỗi database, và không có Email Sending.
- Tên miền dùng Cloudflare DNS, onboard vào Email Sending, bật binding `send_email`. Chưa có bước này thì không đăng nhập được (API trả 503).
- Tạo widget Turnstile, gắn vào form đăng nhập ở `src/pages/Login.tsx`, đặt secret: `wrangler secret put TURNSTILE_SECRET`. Không đưa `.dev.vars` lên production.
- Đặt `APP_ORIGIN` và `MAIL_FROM` đúng tên miền thật trong `wrangler.jsonc`.
