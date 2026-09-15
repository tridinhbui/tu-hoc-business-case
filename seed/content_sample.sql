-- Sample content for local development: modules A4, B1, B2 and their rubrics.
-- Lesson ids follow the 100-lesson spine where possible; 017, 019 and 020 are adapted
-- so the sample exercises every gate (checkpoint prereq, timed variant, remediation).

INSERT INTO skills (id, name, description, sort) VALUES
  ('S01','Problem framing','Biến đề bài thành câu hỏi trả lời được',1),
  ('S03','Issue tree / MECE','Chia vấn đề thành cây MECE có driver đo được',3),
  ('S05','Market sizing','Ước lượng quy mô thị trường có giả định và sanity check',5),
  ('S06','Quantitative analysis','Tính toán chính xác dưới áp lực',6),
  ('S13','Recommendation design','Khuyến nghị cụ thể, thực thi được',13),
  ('S16','Business judgment','Ra quyết định khi dữ liệu thiếu',16);

INSERT INTO tracks (id, name, role, sort) VALUES
  ('A','Business Case Foundations','Nền tảng đọc đề và mô hình kinh doanh',1),
  ('B','Quantitative Case Skills','Số, sizing, chart, phân rã chênh lệch',2);

INSERT INTO modules (id, track_id, title, level_min, level_max, outcome, est_minutes, status, published_at) VALUES
  ('A4','A','Từ phân tích đến khuyến nghị đầu tiên',1,1,'Kết thúc mini case bằng một khuyến nghị có impact ước lượng',300,'published',0),
  ('B1','B','Case math nền',1,1,'Tính nhẩm chính xác dưới áp lực, nói được từng bước',240,'published',0),
  ('B2','B','Market sizing',1,2,'Ước lượng thị trường lạ trong 8 phút bằng hai hướng',420,'published',0);

INSERT INTO module_prereqs (module_id, requires_module_id, kind, min_checkpoint_score) VALUES
  ('B2','B1','hard',85);

INSERT INTO module_skills (module_id, skill_id, role) VALUES
  ('A4','S13','primary'), ('B1','S06','primary'), ('B2','S05','primary'), ('B2','S16','secondary');

INSERT INTO lessons (id, module_id, title, kind, level, est_minutes, output_spec, timed_variant_of, status, published_at) VALUES
  ('014','A4','Checkpoint L1 — Cửa hàng tiện lợi lỗ ở 6/20 điểm bán','checkpoint',1,45,'Mini case 45 phút hoàn chỉnh',NULL,'published',0),
  ('015','B1','Làm tròn có kiểm soát và sanity check','drill',1,20,'Bảng 20 phép tính kèm sai số',NULL,'published',0),
  ('017','B1','Checkpoint B1 — 20 phép tính trong 12 phút','checkpoint',1,15,'20 phép tính + 3 bản ghi nói bước tính',NULL,'published',0),
  ('018','B2','Sizing top-down ba bước','drill',1,35,'4 bảng sizing bốn dòng',NULL,'published',0),
  ('019','B2','Mini case — Giặt sấy tự động tại TP.HCM','mini_case',2,30,'Bảng sizing hai hướng + sanity check',NULL,'published',0),
  ('020','B2','Timed — Giặt sấy tự động trong 8 phút','timed_case',2,8,'Bảng sizing + khoảng dao động','019','published',0);

INSERT INTO lesson_skills (lesson_id, skill_id) VALUES
  ('014','S13'), ('015','S06'), ('017','S06'), ('018','S05'), ('019','S05'), ('020','S05');

INSERT INTO rubrics (id, name, pass_threshold) VALUES
  ('R1','Case answer',70),
  ('RB1','Case math',85),
  ('RB2','Market sizing',70);

INSERT INTO rubric_criteria (id, rubric_id, name, weight, skill_id, sort) VALUES
  ('R1.framing','R1','Problem framing',15,'S01',1),
  ('R1.structure','R1','Structure',20,'S03',2),
  ('R1.quant','R1','Định lượng',25,'S06',3),
  ('R1.insight','R1','Insight',20,'S16',4),
  ('R1.rec','R1','Khuyến nghị',20,'S13',5),
  ('RB1.accuracy','RB1','Độ chính xác',40,'S06',1),
  ('RB1.speed','RB1','Tốc độ',20,'S06',2),
  ('RB1.voice','RB1','Nói bước tính',20,'S06',3),
  ('RB1.sanity','RB1','Sanity check',20,'S16',4),
  ('RB2.structure','RB2','Cấu trúc sizing',30,'S05',1),
  ('RB2.assumptions','RB2','Giả định',25,'S05',2),
  ('RB2.calc','RB2','Tính toán',20,'S06',3),
  ('RB2.sanity','RB2','Sanity check',15,'S16',4),
  ('RB2.range','RB2','Khoảng và giả định chi phối',10,'S16',5);

INSERT INTO lesson_rubrics (lesson_id, rubric_id) VALUES
  ('014','R1'), ('015','RB1'), ('017','RB1'), ('018','RB2'), ('019','RB2'), ('020','RB2');

INSERT INTO mistake_codes (code, group_code, skill_id, title, symptom, root_cause, remediation_lesson_id, remediation_reps) VALUES
  ('QNT-05','QNT','S06','Không sanity check','Đọc kết quả mà không kiểm tra hợp lý','Coi kết quả tính ra là đúng mặc định','015',1),
  ('SIZ-01','SIZ','S05','Giả định không nói ra','Ô giả định để trống','Giấu việc mình đang đoán','018',2),
  ('SIZ-02','SIZ','S05','Lệch bậc độ lớn','Kết quả lệch ≥10 lần khoảng hợp lý','Sai đơn vị hoặc nhảy bậc khi nhân','015',2),
  ('SIZ-04','SIZ','S05','Quên tần suất','Chuỗi tính thiếu nhân tử tần suất','Nhầm số người dùng với số lần dùng','018',1);

INSERT INTO level_gates (level, lesson_id) VALUES (2,'014');

-- Rubric level descriptors: observable behaviour for each of the four levels.
INSERT INTO rubric_criterion_levels (criterion_id, level, descriptor) VALUES
  ('R1.framing',1,'Nhắc lại đề, không nêu câu hỏi chính'),
  ('R1.framing',2,'Có câu hỏi chính nhưng thiếu tiêu chí thành công định lượng'),
  ('R1.framing',3,'Câu hỏi đúng trọng tâm, có tiêu chí thành công bằng số'),
  ('R1.framing',4,'Tái định nghĩa vấn đề khi đề sai trọng tâm và bảo vệ được lý do'),
  ('R1.structure',1,'Không có cấu trúc, liệt kê ý rời rạc'),
  ('R1.structure',2,'Có cây nhưng chồng lấn hoặc dán khung có sẵn'),
  ('R1.structure',3,'Cây MECE, trục chia phù hợp đề'),
  ('R1.structure',4,'Cây MECE, cắt nhánh bằng 80/20 và nói được vì sao'),
  ('R1.quant',1,'Sai số học hoặc sai đơn vị làm lệch kết luận'),
  ('R1.quant',2,'Tính đúng nhưng bỏ sót một nhân tử bắt buộc'),
  ('R1.quant',3,'Tính đúng, đủ nhân tử, có sanity check'),
  ('R1.quant',4,'Tính đúng, mỗi bảng số kết thúc bằng một kết luận dùng được'),
  ('R1.insight',1,'Mô tả lại số liệu, không có hàm ý'),
  ('R1.insight',2,'Có hàm ý nhưng không dựa trên phân tích vừa làm'),
  ('R1.insight',3,'Rút ra nguyên nhân gốc có bằng chứng số'),
  ('R1.insight',4,'Nguyên nhân gốc được đối chiếu và loại trừ các giả thuyết khác'),
  ('R1.rec',1,'Khuyến nghị chung chung, không thực thi được'),
  ('R1.rec',2,'Khuyến nghị cụ thể nhưng không gắn với phân tích'),
  ('R1.rec',3,'Nêu rõ làm gì, ai làm, impact ước lượng'),
  ('R1.rec',4,'Có impact, rủi ro, cách giảm thiểu và thứ tự ưu tiên'),
  ('RB1.accuracy',1,'Dưới 60% phép tính đúng'),
  ('RB1.accuracy',2,'60–74% phép tính đúng'),
  ('RB1.accuracy',3,'75–89% phép tính đúng'),
  ('RB1.accuracy',4,'Từ 90% phép tính đúng trở lên'),
  ('RB1.speed',1,'Không hoàn thành trong thời gian quy định'),
  ('RB1.speed',2,'Hoàn thành nhưng vượt giờ quá 20%'),
  ('RB1.speed',3,'Hoàn thành đúng giờ'),
  ('RB1.speed',4,'Hoàn thành sớm và còn thời gian kiểm tra lại'),
  ('RB1.voice',1,'Im lặng khi tính'),
  ('RB1.voice',2,'Nói kết quả nhưng không nói bước tính'),
  ('RB1.voice',3,'Nói từng bước, người nghe theo kịp'),
  ('RB1.voice',4,'Nói từng bước và nêu chỗ đã làm tròn'),
  ('RB1.sanity',1,'Không kiểm tra kết quả'),
  ('RB1.sanity',2,'Nói có vẻ hợp lý mà không dẫn phép so sánh'),
  ('RB1.sanity',3,'Có ít nhất một phép kiểm tra cụ thể'),
  ('RB1.sanity',4,'Kiểm tra bằng hai cách độc lập và sửa khi lệch'),
  ('RB2.structure',1,'Nhảy thẳng tới một con số, không có chuỗi'),
  ('RB2.structure',2,'Có chuỗi nhưng đơn vị không khớp hoặc chọn sai hướng'),
  ('RB2.structure',3,'Chuỗi khép kín, đơn vị khớp, nói được lý do chọn hướng'),
  ('RB2.structure',4,'Chuỗi khép kín, có bộ lọc thu hẹp đúng nhóm khách thật'),
  ('RB2.assumptions',1,'Con số xuất hiện không rõ nguồn'),
  ('RB2.assumptions',2,'Có nêu giả định nhưng không có cơ sở'),
  ('RB2.assumptions',3,'Mọi giả định nói ra trước khi dùng, kèm lý do'),
  ('RB2.assumptions',4,'Giả định neo vào số quen thuộc, người nghe kiểm tra lại được'),
  ('RB2.calc',1,'Sai số học hoặc sai đơn vị lệch bậc độ lớn'),
  ('RB2.calc',2,'Bỏ sót tần suất, tỷ lệ lấp đầy hoặc số kỳ'),
  ('RB2.calc',3,'Tính đúng, đủ nhân tử, làm tròn hợp lý'),
  ('RB2.calc',4,'Tính đúng, nhanh, nói bước tính thành tiếng'),
  ('RB2.sanity',1,'Không kiểm tra'),
  ('RB2.sanity',2,'Nói có vẻ hợp lý mà không so sánh'),
  ('RB2.sanity',3,'Có một phép kiểm tra cụ thể'),
  ('RB2.sanity',4,'Kiểm tra bằng chi tiêu đầu người và thị trường quen, có điều chỉnh'),
  ('RB2.range',1,'Một con số duy nhất, nhiều chữ số thập phân'),
  ('RB2.range',2,'Nói khoảng nhưng không dựng được biên'),
  ('RB2.range',3,'Nêu khoảng dựa trên biên của một giả định'),
  ('RB2.range',4,'Nêu khoảng, giả định chi phối và cách thu hẹp khoảng');

-- Checkpoints gate their module.
UPDATE lessons SET gates_module = 1 WHERE kind = 'checkpoint';

-- Sample case: one item given up front, two released only when the learner asks.
INSERT INTO cases (id, lesson_id, title, industry, context, question, duration_min, status, pilot_runs) VALUES
  ('C-019','019','Giặt sấy tự động tại TP.HCM','Dịch vụ','Một quỹ đầu tư nhỏ cân nhắc rót vốn vào chuỗi tiệm giặt sấy tự động.','Quy mô doanh thu hằng năm của dịch vụ giặt sấy tự động tại TP.HCM là bao nhiêu?',8,'draft',0);
INSERT INTO case_reveal_items (id, case_id, trigger, content, sort) VALUES
  ('C-019.r1','C-019','Phát sẵn','Mỗi mẻ giặt khoảng 8 kg',1),
  ('C-019.r2','C-019','Nếu hỏi giá mỗi mẻ','50–70 nghìn đồng',2),
  ('C-019.r3','C-019','Nếu hỏi số tiệm hiện có','Không có số liệu, bạn tự ước lượng',3);
INSERT INTO case_traps (id, case_id, description, mistake_code) VALUES
  ('C-019.t1','C-019','Đếm theo hộ gia đình mà không lọc các hộ đã có máy giặt','SIZ-02');
INSERT INTO case_answer_frames (case_id, structure_md, key_numbers, quick_scoring_md) VALUES
  ('C-019','Top-down: dân số → nhóm không có máy giặt → tần suất → giá. Bottom-up: số tiệm × số máy × tỷ lệ lấp đầy × giá.','{}','Kết quả trong khoảng 0,3–3 nghìn tỷ đồng: đạt bậc độ lớn.');
