/* ===== NỘI DUNG BÀI HỌC — khuôn 10 phần =====
   LC(id, {...}) đăng ký nội dung cho một bài trong curriculum.js.
   Chữ in đậm: **như thế này**. Mọi calc.answer phải tính lại được — tests/lessons.test.js kiểm tra.
   Shape:
     why, outcome
     scenario {text, ask}
     fw       {title, rows:[[nhãn, nội dung]], warn}
     ex       {label, rows:[[chỉ tiêu, giá trị, thay đổi?, "up"|"down"?]], read}
     mini     {q, opts:[[key, text, why]], correct, kind}
     calc     {q, unit, answer, tol, solution, hint}
     slide    {headline, left, right, rule}
     mistakes [[tiêu đề, giải thích]]  · checklist [5 mục] · arena caseId? */
window.LESSON_CONTENT = {};
window.LC = (id, c) => { window.LESSON_CONTENT[id] = c; };
