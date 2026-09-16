---
case: C-000
lesson: 000
title: Một câu mô tả tình huống, không phải tên công ty
industry: Bán lẻ
duration_min: 30
is_fictional: true
status: draft
pilot_runs: 0
insight: Một câu — điều đi ngược trực giác mà case này dạy. Nếu người đọc gật đầu ngay thì insight chưa đủ mạnh, viết lại.
---

## context

Bối cảnh hư cấu, đủ để bắt đầu nhưng còn thiếu thứ người học phải hỏi. Nói rõ người phỏng vấn đóng vai ai.

## question

Câu hỏi chính, cộng câu hỏi kinh doanh phía sau nó (người học phải trả lời được cả hai mới đạt mức cao).

## reveal · Phát sẵn

Dữ liệu đưa ngay từ đầu.

## reveal · Nếu hỏi …

Dữ liệu chỉ phát khi người học hỏi đúng thứ này. Cần ít nhất 3 mục reveal.

## trap · SIZ-06

Bẫy này thử điều gì, và người làm đúng phải làm gì để tránh. Mã lỗi phải có thật.

## frame.structure

Chuỗi lập luận mong đợi và những việc bắt buộc phải thấy trong bài làm.

## frame.numbers

```json
{ "tên con số": 0 }
```

## frame.check

Mỗi dòng `tên con số = biểu thức`, tham chiếu số khác bằng [tên trong ngoặc vuông]. Bộ kiểm tra tính lại và bắt lỗi nếu lệch quá 8%.

- tổng doanh thu = [số đơn vị] * [giá] / 1000000000

## frame.scoring

Chấm nhanh 3 phút: mức 3+ là gì, mức 2 là gì, mức 1 là gì, gắn mã lỗi nào khi thấy dấu hiệu nào.

## panel.numbers

- Câu hỏi vặn về con số.

## panel.feasibility

- Câu hỏi về tính khả thi.

## panel.challenge

- Câu hỏi phản biện thẳng vào kết luận.
