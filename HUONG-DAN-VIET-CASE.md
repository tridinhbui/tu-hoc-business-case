# Hướng dẫn viết case cho STRATLAB

> Tài liệu này tồn tại vì một lý do: **để người thứ hai viết được case mà không cần hỏi người thứ nhất.**
> Nếu bạn đọc xong mà vẫn phải hỏi "case thế nào là đạt", tài liệu này chưa làm xong việc của nó — hãy báo.

---

## 0. Trước khi viết — đọc 3 case mẫu

Đọc hết ba case này với tư cách người học, làm thật, đừng đọc code:

| Case | Vì sao đọc |
|---|---|
| `c-coffee-profit` — Cứu lợi nhuận chuỗi cà phê | Case chuẩn mực. Có đủ 6 dạng bước, insight đi ngược trực giác, số liệu khép kín. |
| `c-vjc-route` — Mở đường bay Việt Nam – Nhật Bản | Case có nhiều kết cục. Xem cách một quyết định dẫn tới bốn kết cục khác nhau. |
| `c-vhm-cashflow` — Doanh nghiệp có lãi nhưng hết tiền | Case độ khó Expert. Xem cách giữ độ khó mà không đánh đố. |

---

## 1. Ba quy tắc không được vi phạm

### 1.1 Mỗi case phải có đúng **một insight đi ngược trực giác**

Đây là lý do case tồn tại. Nếu người học đọc xong mà nghĩ "ừ thì đúng rồi, ai chẳng biết", case đó đã thất bại.

| Case | Insight đi ngược trực giác |
|---|---|
| Chuỗi cà phê | Doanh nghiệp **không có vấn đề lợi nhuận** — nó có vấn đề kỷ luật mở rộng |
| Bệnh viện | Đang lỗ mà **cắt chi phí lại làm lỗ nặng hơn** |
| Bán lẻ | Doanh nghiệp giao 1 triệu đơn ở 10 quận **rẻ hơn** doanh nghiệp giao 2 triệu đơn ở 63 tỉnh |

**Cách tự kiểm tra:** viết insight ra một câu. Đưa cho một người biết chút kinh doanh. Nếu họ gật đầu ngay lập tức, insight chưa đủ mạnh.

### 1.2 Mọi con số phải **tự khớp**

Đây là lỗi hay gặp nhất và cũng dễ phát hiện nhất. Trong quá trình xây sản phẩm, bài kiểm tra tự động đã bắt được **4 lỗi số học thật** mà người viết không nhận ra.

Quy tắc:
- Con số trong `answer` phải bằng đúng kết quả của phép tính trong `working[]`
- Con số trong `working[]` phải khớp với dữ kiện trong `brief.facts` và trong các `datalab` tiles
- `tol` (dung sai) đặt khoảng **3–8%** giá trị đáp án — đủ rộng cho làm tròn, đủ hẹp để không cho qua đáp án sai

**Cách tự kiểm tra:** chạy bài test tự động ở mục 6. Case không qua test thì không được lên production.

### 1.3 Bước `decision` không được có "đáp án đúng duy nhất hiển nhiên"

Nếu ba trong bốn lựa chọn rõ ràng là ngu ngốc, đó không phải quyết định — đó là câu hỏi trắc nghiệm đội lốt.

Mỗi lựa chọn phải:
- **Có người thật sự sẽ chọn nó** trong một cuộc họp thật
- Có `consequence` mô tả điều xảy ra 6–24 tháng sau, **có con số**
- Có `why` giải thích vì sao nó tốt hoặc chưa tốt, **không mỉa mai người chọn**

Điểm số nên trải: `1` cho lựa chọn tốt nhất, `0.5–0.6` cho lựa chọn hợp lý nhưng chưa tối ưu, `0.1–0.35` cho lựa chọn sai. **Không dùng `0`** ở bước decision — luôn có gì đó đúng trong mọi lựa chọn người ta thật sự cân nhắc.

---

## 2. Cấu trúc một case

```
brief   →  steps[]  →  solution
```

### 2.1 `brief` — 4 trường bắt buộc

| Trường | Độ dài | Yêu cầu |
|---|---|---|
| `hook` | **dưới 12 từ** | Một câu gây tò mò. Có con số càng tốt. *"Doanh thu tăng 18%. Lợi nhuận thì không."* |
| `situation` | 50–90 từ | Tình huống + con số + căng thẳng nội bộ. Kết bằng chỗ ban lãnh đạo đang bất đồng |
| `objective` | 20–35 từ | Nhiệm vụ cụ thể, có ràng buộc thời gian hoặc phạm vi |
| `facts` | **đúng 4 mục** | Dữ kiện đầu bài. Không tiết lộ nguyên nhân |

### 2.2 `steps[]` — thứ tự chuẩn

Case tốt đi theo đúng trình tự tư duy thật:

```
1. Cấu trúc vấn đề    → tree hoặc multi     (dim: structure)
2. Mở dữ liệu          → datalab             (dim: insight)
3. Định lượng          → calc                (dim: quant)
4. Chẩn đoán           → mcq                 (dim: insight)
5. Ưu tiên / quyết định → rank hoặc decision  (dim: priority)
6. Khuyến nghị          → recommend           (dim: recommendation)
```

**Số bước:** 4 bước cho Easy/Medium, 5–6 cho Hard/Expert. Đừng vượt 6 — người học bỏ dở.

**Bắt buộc:** mọi case phải có ít nhất một bước `calc` và một bước `recommend`.

### 2.3 `solution` — 4 trường

| Trường | Yêu cầu |
|---|---|
| `approach` | 4 gạch đầu dòng. Mô tả **cách nghĩ**, không phải đáp án |
| `answer` | 50–80 từ. Nêu kết luận **kèm con số**, không nói chung chung |
| `insight` | 40–60 từ. Đây là bài học mang đi được sang case khác. **Đây là phần giá trị nhất của case** |
| `next` | 3 câu hỏi mà một consultant giỏi sẽ hỏi tiếp. Phải là câu hỏi thật, không phải câu hỏi tu từ |

---

## 3. Quy tắc riêng cho từng dạng bước

### `tree` — dựng cây vấn đề
- `root` là **triệu chứng có số**, không phải câu hỏi: `"EBITDA margin: 16% → 9%"`
- Đúng 3 nhánh đúng, 3 nhánh sai. `need: 3`
- Mỗi nhánh đúng có `sub[]` gồm **3 nhánh con** — đây là chỗ dạy MECE
- Nhánh sai phải là thứ **nghe hợp lý** nhưng sai tầng phân tích, không phải thứ ngớ ngẩn

### `datalab` — data room
- 6 tiles: **3 hữu ích, 3 nhiễu**. `budget: 3`
- Tile nhiễu phải là dữ liệu **đẹp và cám dỗ**: khảo sát thương hiệu, báo cáo ngành, xu hướng toàn cầu
- Mỗi tile có `why` giải thích vì sao nó hữu ích hoặc vì sao nó đánh lạc hướng
- `body` dạng mảng `{k,v}` cho số liệu, dạng chuỗi cho mô tả

### `calc` — định lượng
- Đáp án phải là **số tròn hoặc gần tròn**. Tránh `4.7382`
- `hint` chỉ nói **phương pháp**, không nói con số
- `working[]` từ 3–6 dòng, dòng cuối là đáp án
- `why` phải giải thích **con số này có nghĩa gì cho quyết định**, không chỉ xác nhận phép tính
- Chấp nhận đáp án **âm** — nhớ ghi trong `hint`: *"Kết quả có thể âm."*

### `rank` — xếp ưu tiên
- Đúng 3 mục
- `why` phải giải thích **vì sao thứ tự này**, từng cặp một
- Nguyên tắc thường đúng: *ngừng đào hố trước → lấp hố đang có → mới tăng trưởng*

### `mcq` / `recommend`
- Đúng 4 lựa chọn, **đúng 1 đáp án đúng**
- Ba lựa chọn sai phải đại diện cho **ba kiểu sai lầm khác nhau**: sai tầng phân tích · đúng nhưng chưa đủ · giải quyết triệu chứng
- `why` của đáp án sai phải nói rõ **sai ở đâu**, không chỉ nói "không đúng"

### `decision` — có kết cục
- Xem mục 1.3
- Nếu case có `endings`, mỗi lựa chọn gắn một khoá `ending`
- `endings` cần **ít nhất một `good: true`**, và mỗi ending có `tag` ngắn + `title` + `text` 40–60 từ kể chuyện 6–24 tháng sau

---

## 4. Giọng văn

| Nên | Không nên |
|---|---|
| "30 cửa hàng mới thuê giá cao hơn 45% nhưng chỉ đạt 57% doanh thu hoà vốn" | "Việc mở rộng chưa hiệu quả" |
| "Cắt marketing không giải quyết được gốc" | "Đáp án này sai" |
| Thuật ngữ tiếng Anh + nghĩa tiếng Việt: *contribution margin · biên đóng góp* | Chỉ tiếng Anh, hoặc dịch hết sang tiếng Việt |
| Câu ngắn. Chủ ngữ rõ. | Câu ba mệnh đề lồng nhau |
| Gọi người học bằng "bạn" | "Học viên cần lưu ý rằng…" |

**Cấm:**
- Emoji
- Dấu chấm than
- Cụm "như chúng ta đã biết", "rõ ràng là", "đơn giản thôi"
- Mỉa mai người chọn sai

---

## 5. Chọn doanh nghiệp và số liệu

### Ưu tiên doanh nghiệp Việt Nam
Tỷ lệ mục tiêu: **60% Việt Nam, 40% quốc tế**. Case quốc tế chỉ dùng khi nó dạy được thứ mà thị trường Việt Nam chưa có ví dụ tốt.

### Ba ranh giới về số liệu — đây là ranh giới pháp lý, không phải phong cách
1. **Không đăng số liệu tài chính chưa công bố.** Nếu bạn không tìm được nó trong báo cáo công khai, đừng bịa ra con số cụ thể — hãy mô tả bậc độ lớn.
2. **Không suy diễn về cá nhân trong ban lãnh đạo.** Viết về quyết định, không viết về người.
3. **Không mô tả theo hướng có thể hiểu là cáo buộc.** "Chuỗi có 25% cửa hàng dưới điểm hoà vốn" được. "Ban lãnh đạo che giấu thua lỗ" không được.

Mọi case phải chạy được với dữ liệu **giả lập nhưng hợp lý**. Nếu case cần một con số nhạy cảm, hãy đổi sang doanh nghiệp ẩn danh: *"một chuỗi cà phê 180 cửa hàng tại Việt Nam"*.

---

## 6. Quy trình nộp bài — bắt buộc

### Bước 1: viết
Thêm object vào `window.CASES` trong `assets/js/data/cases.js`. Copy khuôn từ `c-coffee-profit`.

### Bước 2: kiểm tra cú pháp
```bash
node --check assets/js/data/cases.js
```

### Bước 3: chạy bài test tự động
Mở site, mở Console, dán đoạn này:

```js
// chơi hết case với đáp án đúng — mọi bước PHẢI chấm ra 1.0
var id = "ID-CASE-CUA-BAN", errs = [];
location.hash = "#/case/" + id; window.dispatchEvent(new HashChangeEvent("hashchange"));
var g = 0;
while (PLAYER.idx < PLAYER.cs.steps.length && g++ < 30) {
  var s = PLAYER.cs.steps[PLAYER.idx];
  if (s.kind === "tree" || s.kind === "multi") s.options.forEach((o,i) => { if (o.ok) PLAYER.multi.push(i) });
  else if (s.kind === "datalab") { var n = 0; s.tiles.forEach((t,i) => { if (t.useful && n < s.budget) { PLAYER.open.push(i); n++ } }) }
  else if (s.kind === "calc") document.getElementById("calcInput").value = String(s.answer);
  else if (s.kind === "rank") PLAYER.order = s.order.slice();
  else s.options.forEach((o,i) => { var ok = s.kind === "decision" ? o.score >= 0.9 : o.ok; if (ok) PLAYER.sel = i });
  PLAYER.submit();
  if (PLAYER.pendingScore !== 1) errs.push("Bước " + (PLAYER.idx+1) + " chấm " + PLAYER.pendingScore + " thay vì 1");
  PLAYER.next();
}
console.log(errs.length ? errs : "ĐẠT — điểm " + State.get().cases[id].score);
```

**Điều kiện nộp:** kết quả in ra `ĐẠT — điểm 100`. Bất kỳ dòng lỗi nào cũng nghĩa là đáp án không khớp cách tính.

### Bước 4: tự chấm theo bảng dưới

| # | Tiêu chí | Đạt? |
|---|---|---|
| 1 | Có đúng **một** insight đi ngược trực giác, viết được thành một câu | ☐ |
| 2 | Bài test tự động in ra `ĐẠT — điểm 100` | ☐ |
| 3 | `hook` dưới 12 từ và có sức kéo | ☐ |
| 4 | `brief.facts` đúng 4 mục, không tiết lộ nguyên nhân | ☐ |
| 5 | Có ít nhất một bước `calc` và một bước `recommend` | ☐ |
| 6 | Mọi `why` của đáp án sai đều nói rõ **sai ở đâu** | ☐ |
| 7 | Nếu có `decision`: không lựa chọn nào ngu ngốc hiển nhiên | ☐ |
| 8 | `solution.insight` mang đi được sang case khác | ☐ |
| 9 | `solution.next` là 3 câu hỏi thật | ☐ |
| 10 | Không emoji, không dấu chấm than, không mỉa mai | ☐ |
| 11 | Tổng độ dài dưới **3.000 từ** | ☐ |
| 12 | Số liệu không vi phạm 3 ranh giới ở mục 5 | ☐ |

**Nộp thiếu bất kỳ ô nào = trả lại, không tranh luận.** Đây là để bảo vệ bạn: một case lọt lưới với phép tính sai sẽ bị người học phát hiện và mất uy tín cả sản phẩm.

---

## 7. Thù lao và thời gian

| Hạng mục | Mức |
|---|---|
| Case Easy / Medium (4 bước) | **500.000đ** |
| Case Hard / Expert (5–6 bước) | **800.000đ** |
| Case có nhiều kết cục (`endings`) | **+300.000đ** |
| Sửa vòng 1 theo góp ý biên tập | Trong thù lao |
| Sửa vòng 3 trở đi | Trừ 30% |

**Thời gian trung bình một case:** 4–6 giờ cho người đã đọc tài liệu này và đã làm 3 case mẫu. Case đầu tiên thường mất gấp đôi — đó là bình thường.

**Nhịp mục tiêu:** 3 case/tháng/người viết.

---

## 8. Những lỗi đã thật sự xảy ra

Ghi lại để không lặp lại. Cả bốn lỗi này đều lọt qua mắt người viết và chỉ bị bắt bởi bài test tự động:

| Lỗi | Chi tiết | Bài học |
|---|---|---|
| Đáp án lệch cách tính | `answer: 64.75` trong khi `working` ra `64.25` | Luôn chạy test, đừng tin mắt mình |
| Fudge factor giấu trong working | Đáp án `1470` được tạo bằng cách nhân thêm hệ số 0,65 không có trong đề | Nếu phải bịa hệ số để ra đáp án, đề bài đang sai |
| Đáp án âm không báo trước | `answer: -0.15` mà `hint` không nói kết quả có thể âm | Người học sẽ tưởng mình sai và bỏ cuộc |
| Sai bậc độ lớn | Ghi `-4%` trong khi cách tính ra `-20%` | Kiểm tra lại bậc độ lớn, không chỉ chữ số |

---

## 9. Khi nào nên từ chối một ý tưởng case

Từ chối ngay nếu:
- Không viết được insight thành một câu
- Cần số liệu tài chính chưa công bố mới chạy được
- Insight trùng với một case đã có (kiểm tra bằng ô tìm kiếm `Ctrl+K`)
- Chỉ có một cách hiểu duy nhất, không có chỗ cho quyết định
- Phải giải thích bối cảnh ngành quá 90 từ người học mới hiểu được đề

---

*Tài liệu này sẽ được cập nhật sau mỗi 10 case. Nếu bạn gặp tình huống mà tài liệu chưa nói tới, hãy ghi lại — đó chính là mục cần bổ sung.*
