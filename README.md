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
| `worker/google.ts` | Đăng nhập với Google (OpenID Connect) |
| `worker/landing.ts` | Số liệu công khai cho trang giới thiệu, cache KV 5 phút |
| `authoring/` | Nội dung do người viết: thân bài, đề case, kế hoạch viết ([PLAN.md](authoring/PLAN.md)) |
| `worker/gates.ts` | Năm cổng khoá/mở bài, ghi `lesson_progress` |
| `worker/attempts.ts` | Bắt đầu, tải file lên R2, nộp, mistake review |
| `worker/grading.ts` | Hàng đợi chấm, nhận bài, chấm theo rubric |
| `worker/readiness.ts` | Readiness, remediation, lên cấp, suy giảm hằng ngày |
| `worker/views.ts` | Dữ liệu cho giao diện: lộ trình, bài học, bài làm, tải file có kiểm tra quyền |
| `worker/liveroom.ts`, `worker/live.ts` | Durable Object `LiveRoom`, API tạo phòng, danh sách phòng và WebSocket |
| `worker/paths.ts` | Lộ trình học: danh sách, ghi danh, kế hoạch theo tuần |
| `worker/kingdom.ts` | Bản đồ game: vùng đất, boss, nhiệm vụ — suy ra từ tiến độ thật ([thiết kế](docs/GAME-DESIGN.md)) |
| `src/` | React SPA: trang giới thiệu, đăng nhập, lộ trình, kế hoạch theo tuần, bài học và đề case, bài làm, phòng live, năng lực, hàng đợi chấm, form chấm |
| `migrations/content`, `migrations/learning` | Schema hai database D1 |
| `seed/content_sample.sql` | Dữ liệu mẫu module A4, B1, B2 kèm mô tả 4 mức rubric |
| `queries/gates.sql` | Truy vấn khoá/mở bài dùng trong kiểm thử schema |

## Viết nội dung

Khung chương trình sinh từ `content-source/`; chữ cho người học nằm ở `authoring/`.

```bash
python3 scripts/authoring-queue.py PATH-6   # bài kế tiếp phải viết, theo thứ tự mở được lớp sớm nhất
npm run content:check                       # bộ kiểm tra chất lượng, không ghi gì
npm run db:seed:local                       # nạp cả curriculum.sql lẫn authored.sql
```

Thứ tự viết, định mức và định nghĩa "viết xong": [authoring/PLAN.md](authoring/PLAN.md).
Brief để một agent khác viết cùng: [authoring/AGENT-BRIEF.md](authoring/AGENT-BRIEF.md).

## Deploy lên Cloudflare

Dự án này sống ở nhánh **`cloudflare-platform`** và deploy vào Worker **`tu-hoc-business-case-app`**
(https://tu-hoc-business-case-app.tridinhbui0901.workers.dev).

Nhánh `main` của repo là một dự án khác (STRATLAB) và Workers Builds đang deploy nhánh đó vào Worker
`tu-hoc-business-case`. Hai Worker khác tên nên không còn ghi đè nhau. Đổi lại, nhánh này **không**
tự deploy: sau khi push phải chạy

```bash
npx wrangler deploy
```

Nếu deploy xong mà route mới vẫn trả 404: Vite ghi cấu hình chuyển hướng vào `dist/<tên worker>/`,
và thư mục cũ còn sót lại khiến Wrangler đẩy bản build cũ. Xoá rồi build lại:

```bash
rm -rf dist .wrangler/deploy && npx vite build && npx wrangler deploy
```

Wrangler tự chạy `npx vite build` trước khi deploy nhờ khai báo `build.command` trong `wrangler.jsonc`.
Nếu sau này nối lại Workers Builds thì để **Build command** trống và **Deploy command** là `npx wrangler deploy`.

Không đổi `build.command` thành `npm run build`: script đó gọi `wrangler types`, mà `wrangler types` lại chạy custom build, gây đệ quy vô hạn.

`wrangler.jsonc` ghi id KV (để đổi tên Worker không mất session) nhưng không ghi id D1/R2/Queues: Wrangler khớp chúng theo tên và tự tạo nếu chưa có.

`wrangler deploy` **không** chạy migration. Sau lần deploy đầu tiên và sau mỗi migration mới:

```bash
npm run db:migrate:remote
npm run db:seed:remote
```

`db:seed:remote` ghi đè toàn bộ nội dung chương trình trong `bc_content` bằng bản sinh từ `content-source/`; không đụng tới dữ liệu người học trong `bc_learning`.

### Trước khi mở cho người học thật

- Tài khoản **Workers Paid** — gói Free giới hạn CPU 10 ms mỗi request, D1 500 MB mỗi database, và không có Email Sending.
- Tên miền dùng Cloudflare DNS, onboard vào Email Sending, bật binding `send_email`. Chưa có bước này thì magic link không gửi được (API trả 503) — lúc đó đăng nhập bằng Google là cách duy nhất.
- Secret là **của từng Worker**: sau khi đổi tên Worker phải đặt lại `GOOGLE_CLIENT_SECRET` (và `TURNSTILE_SECRET` nếu có) cho Worker mới.
- Tạo widget Turnstile, gắn vào form đăng nhập ở `src/pages/Login.tsx`, đặt secret: `wrangler secret put TURNSTILE_SECRET`. Không đưa `.dev.vars` lên production.
- Đặt `APP_ORIGIN` và `MAIL_FROM` đúng tên miền thật trong `wrangler.jsonc`.

### Đăng nhập với Google

Hai cách đăng nhập dùng chung một tài khoản: định danh là **email**, nên cùng một email dù vào bằng Google hay magic link vẫn là một người học.

1. Google Cloud Console → **APIs & Services → Credentials → Create OAuth client ID → Web application**.
2. **Authorized redirect URIs** (phải khớp từng ký tự):
   - `https://tu-hoc-business-case-app.tridinhbui0901.workers.dev/api/auth/google/callback`
   - `http://127.0.0.1:5173/api/auth/google/callback` (chạy máy)
3. Điền client id vào `vars.GOOGLE_CLIENT_ID` trong `wrangler.jsonc` (id là công khai), rồi đặt secret:

```bash
npx wrangler secret put GOOGLE_CLIENT_SECRET
```

4. Đổi `APP_ORIGIN` trước khi chuyển sang tên miền riêng: `redirect_uri` lấy từ đó, sai một ký tự là Google từ chối.

Thiếu một trong hai giá trị thì `/api/config` trả `googleLogin: false` và nút Google không hiện. Worker kiểm `iss`, `aud`, `exp`, `nonce` và `email_verified` của `id_token`; `state` và `nonce` nằm trong KV, dùng một lần, hết hạn sau 10 phút.
