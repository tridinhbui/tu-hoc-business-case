/* ═══ CASELAB · song ngữ VI / EN ═══
   Giao diện có hai chế độ. Tiếng Việt là bản gốc; bản tiếng Anh được dịch khi hiển thị:
     · DICT  — chuỗi cố định (nav, nút, nhãn, tiêu chí chấm, trạng thái)
     · RULES — chuỗi có số ("14/22 bài · Beginner", "Vòng 3", "hạn phút 45"…)
   Nội dung bài học và đề case hiện chỉ có tiếng Việt — ở chế độ EN có ghi chú rõ.
   Lựa chọn lưu ở localStorage("caselab.lang"). */
(function(){
const DICT = {
  /* tên công ty ẩn danh trong đề */
  "Ngân hàng số":"Digital bank", "Nhà bán lẻ":"Retailer", "Chuỗi Anh ngữ":"English centre chain", "Ẩn danh":"Anonymous",

  /* câu mô tả đầu trang */
  "Câu trả lời chủ đạo, ba trụ lập luận, bằng chứng có con số và một khuyến nghị.":
    "A governing thought, three pillars, evidence with numbers and one recommendation.",
  "6–8 headline dạng câu khẳng định, mỗi headline một con số. Trang 1 là governing thought.":
    "6–8 headlines written as full sentences, each with a number. Slide 1 is the governing thought.",
  "Ba câu hỏi đuổi. Trả lời ngắn, có con số, bảo vệ được giả định.":
    "Three follow-up questions. Answer short, with numbers, and defend your assumptions.",
  "Interviewer-led · người phỏng vấn dẫn từng bước":"Interviewer-led · the interviewer walks you through",
  "Candidate-led · bạn tự dẫn case":"Candidate-led · you drive the case",

  "Mỗi nghề có lộ trình track riêng, bộ kỹ năng cần đạt và một tiêu chí tốt nghiệp đo được. Chọn nghề để hệ thống sắp xếp lại thứ tự bài học cho bạn.":
    "Each career has its own tracks, a skill bar to reach and a measurable graduation test. Pick one and the lesson order is rearranged for you.",
  "Chạy đúng nhịp một cuộc thi thật: đề dài, ba deliverable có hạn chót, chấm theo 7 tiêu chí của ban giám khảo. Nộp trễ vẫn được chấm nhưng mỗi deliverable trễ bị trừ 10 điểm trình bày.":
    "Runs at the rhythm of a real competition: a long brief, three deliverables with deadlines, judged on 7 criteria. Late work is still scored, but each late deliverable costs 10 delivery points.",
  "Case chạy theo 5 vòng như phỏng vấn thật: làm rõ đề → cấu trúc → case math → đọc exhibit → khuyến nghị. Mỗi vòng được chấm riêng; trả lời thiếu con số hoặc thiếu nhánh sẽ vào Mistake Review.":
    "The case runs in 5 rounds like a real interview: clarify → structure → case math → chart reading → recommendation. Each round is scored on its own; answers missing a number or a branch go to Mistake Review.",
  "Mọi câu sai đều được phân loại và giữ lại. Mỗi lỗi được ôn theo giãn cách 1 → 3 → 7 ngày; ôn đủ 3 lần thì coi như đã sửa.":
    "Every wrong answer is classified and kept. Each mistake comes back after 1 → 3 → 7 days; three reviews and it counts as fixed.",
  "Mọi câu sai trong quiz bài học, Practice Arena và Interview Mode sẽ được phân loại và giữ lại ở đây.":
    "Wrong answers from lesson quizzes, the Practice Arena and Interview Mode are classified and kept here.",
  "Tiến độ đang lưu trên trình duyệt này (localStorage). Xuất file sao lưu để chuyển sang máy khác hoặc phòng khi xoá dữ liệu trình duyệt.":
    "Progress is stored in this browser (localStorage). Export a backup to move to another machine or before clearing browser data.",
  "Nhập file sẽ thay toàn bộ tiến độ hiện tại bằng nội dung trong file.":"Importing replaces all current progress with the file contents.",
  "Phiên gồm 5 vòng. Người phỏng vấn hỏi từng vòng; trả lời xong mới hiện vòng tiếp theo và phần ghi nhận.":
    "The session has 5 rounds. The interviewer asks one at a time; the next round and the note appear after you answer.",
  "Chưa có lỗi nào. Làm quiz trong bài học hoặc nộp một case ở Arena để bắt đầu.":
    "No mistakes yet. Take a lesson quiz or submit a case in the Arena to start.",
  "Giải case đầu tiên →":"Solve your first case →",
  "Chấm tự động theo cấu trúc, con số then chốt và khuyến nghị. Lần nộp sau chỉ cộng XP phần vượt điểm cao nhất.":
    "Scored automatically on structure, the key numbers and the recommendation. Later attempts only add XP above your best score.",
  "Chấm theo 6 tiêu chí: Problem framing · Structure · Analysis & math · Insight · Feasibility · Storytelling. Nộp bài để xem điểm; mọi lỗi phát hiện được sẽ vào Mistake Review.":
    "Scored on 6 criteria: Problem framing · Structure · Analysis & math · Insight · Feasibility · Storytelling. Submit to see your score; any mistake found goes to Mistake Review.",
  "Xoá nội dung và tự viết lại để được chấm thật.":"Clear it and write your own to be scored for real.",
  /* điều hướng và khung */
  "Học tập":"Learn", "Lộ trình học":"Learning path", "Bài học":"Lesson", "Bài học mẫu":"Sample lesson",
  "Luyện tập":"Practice", "Phát triển":"Grow", "Tài khoản":"Account", "Dữ liệu & sao lưu":"Data & backup",
  "Tài khoản & dữ liệu":"Account & data", "Học viên":"Learner", "Tìm case, bài học…":"Search cases, lessons…",
  "Hồ sơ":"Profile", "Sao lưu":"Backup", "Dữ liệu thử":"Sample data", "Nạp dữ liệu mẫu":"Load sample data",
  "Xoá toàn bộ tiến độ":"Erase all progress", "Xuất file sao lưu (.json)":"Export backup (.json)",
  "Nhập từ file…":"Import from file…", "Tên hiển thị":"Display name", "Lưu":"Save", "Tổng XP":"Total XP",
  "Cấp độ":"Level", "Bài đã xong":"Lessons done", "Case đã giải":"Cases solved", "Lỗi đang mở":"Open mistakes",
  "Lộ trình nghề":"Career path", "Bắt đầu từ":"Member since", "Chưa chọn":"Not chosen",

  /* dashboard */
  "Bắt đầu":"Start", "Học tiếp":"Continue", "Bài kế tiếp":"Next lesson", "Học bài đầu tiên →":"Start first lesson →",
  "Tiếp tục học →":"Continue learning →", "Xem lộ trình":"View path", "Nạp dữ liệu mẫu để xem thử":"Load sample data to explore",
  "Tiến độ tổng":"Overall progress", "Hoàn thành toàn bộ lộ trình":"Whole path completed",
  "XP tuần này":"XP this week", "Chưa có hoạt động":"No activity yet", "Streak":"Streak",
  "Vào Arena để giải case đầu tiên":"Open Arena to solve your first case",
  "Tiến độ theo track":"Progress by track", "Tất cả":"All", "Nhiệm vụ hôm nay":"Today's missions",
  "Hoàn thành 1 bài học":"Finish 1 lesson", "Giải 1 case trong Arena":"Solve 1 case in the Arena",
  "Đạt 80+ ở một case":"Score 80+ on a case", "Ôn và sửa 1 lỗi cũ":"Review and fix 1 old mistake",
  "Học ít nhất một bài hoặc giải một case mỗi ngày để giữ chuỗi.":"Do one lesson or one case a day to keep the streak.",
  "Case gợi ý":"Suggested cases", "Thư viện đầy đủ":"Full library", "Vào Arena →":"Open Arena →",
  "Đề đầy đủ":"Full case", "Đề đang biên soạn":"Case in progress", "Chưa giải":"Not solved", "Đã giải":"Solved",

  /* lộ trình + bài học */
  "100 bài học chia theo 6 track. Mỗi bài đều kết thúc bằng một output thật: một phép tính, một slide, một insight từ biểu đồ, hoặc một câu trả lời nói.":
    "100 lessons across 6 tracks. Every lesson ends with a real output: a calculation, a slide, a chart insight, or a spoken answer.",
  "Bắt đầu track":"Start track", "Học tiếp →":"Continue →", "Bắt đầu track →":"Start track →",
  "✓ Đã hoàn thành track":"✓ Track completed", "✓ Đã hoàn thành":"✓ Completed",
  "Vì sao bài này quan trọng trong business case":"Why this matters in a business case",
  "Tình huống mở đầu":"Opening situation", "Framework chính":"Core framework", "Ví dụ có số liệu":"Worked example",
  "Mini case tương tác":"Interactive mini case", "Bài tập áp dụng":"Practice exercise",
  "Gợi ý:":"Hint:", "Gợi ý cách trình bày trên slide":"How to present it on a slide", "Câu trả lời nói mẫu":"Model spoken answer",
  "Lỗi thường gặp":"Common mistakes", "Khung slide đề xuất":"Suggested slide frame", "Câu mở đầu":"Opening line",
  "Biểu đồ trái":"Chart on the left", "Phải":"Right", "Nói tiếp":"Then say", "Chốt lại":"Close with",
  "Quy tắc:":"Rule:", "Lưu ý:":"Note:", "Tình huống":"Situation", "Đọc ra gì:":"What it tells you:",
  "Bạn sẽ làm được sau bài này:":"After this lesson you can:", "Tính:":"Calculate:", "Nhiệm vụ:":"Task:",
  "Quiz kiểm tra":"Quiz", "Mini case (phần 5)":"Mini case (part 5)", "Tính toán (phần 6)":"Calculation (part 6)",
  "Checklist cuối bài":"End-of-lesson checklist", "Áp dụng vào case":"Apply to a case",
  "Luyện ngay":"Practice now", "Luyện case":"Practice case", "Tìm case":"Find a case",
  "Bài tiếp →":"Next lesson →", "Về lộ trình":"Back to path", "Bỏ qua, sang bài tiếp":"Skip to next lesson",
  "Chưa đúng.":"Not correct.", "Đúng.":"Correct.", "Kiểm tra":"Check",
  "Nên làm hết quiz và tick ít nhất 3 mục checklist trước khi đánh dấu xong.":
    "Finish the quiz and tick at least 3 checklist items before marking it done.",
  "Sẵn sàng. Đánh dấu xong rồi áp dụng ngay vào một case.":"Ready. Mark it done, then apply it to a case.",

  /* arena */
  "Đề bài":"The brief", "Answer canvas":"Answer canvas", "Rubric chấm điểm":"Scoring rubric",
  "Nộp bài":"Submit", "Lưu nháp":"Save draft", "Bài mẫu":"Model answer", "Chưa nộp":"Not submitted",
  "Có nháp":"Draft saved", "Điểm bài mẫu":"Model answer score", "Làm lại từ đầu":"Start over",
  "1 · Vấn đề bạn đang giải là gì":"1 · What problem are you solving",
  "2 · Hypothesis tree":"2 · Hypothesis tree", "3 · Bằng chứng từ exhibit":"3 · Evidence from exhibits",
  "4 · Khuyến nghị":"4 · Recommendation", "Số liệu minh hoạ cho mục đích luyện tập.":"Illustrative data for practice.",
  "Số liệu minh hoạ cho mục đích luyện tập, không phải số liệu công bố của doanh nghiệp.":
    "Illustrative data for practice — not published company figures.",
  "Feedback lần nộp gần nhất:":"Feedback on your last submission:",
  "Problem framing":"Problem framing", "Structure / MECE":"Structure / MECE", "Analysis & math":"Analysis & math",
  "Insight":"Insight", "Feasibility":"Feasibility", "Storytelling":"Storytelling",

  /* thư viện */
  "Ngành":"Industry", "Dạng case":"Case type", "Độ khó":"Difficulty", "Kỹ năng chính":"Key skills",
  "Trạng thái":"Status", "Dạng":"Type", "Thời lượng":"Duration", "Case":"Case",
  "Tất cả ngành":"All industries", "Tất cả dạng":"All types", "Tất cả kỹ năng":"All skills",
  "Xoá lọc":"Clear filters", "Không có case nào khớp bộ lọc.":"No case matches these filters.",

  /* competition */
  "Ba deliverable":"Three deliverables", "7 tiêu chí chấm":"7 scoring criteria", "Chưa thi":"Not started",
  "Vào phòng thi":"Enter the room", "Vào phòng thi →":"Enter the room →", "Tiếp tục":"Continue",
  "Xem kết quả":"See result", "Chưa có điểm":"No score yet", "Trước khi bắt đầu":"Before you start",
  "Bắt đầu tính giờ":"Start the clock", "Deliverable":"Deliverable", "Kết quả ban giám khảo":"Judges' result",
  "Thi lại từ đầu":"Restart the round", "← Danh sách đề thi":"← All competition briefs", "← Danh sách đề":"← All briefs",
  "Đã nộp đủ":"All submitted", "Còn lại tới hạn":"Time to deadline", "Thời gian làm bài":"Time taken",
  "Governing thought":"Governing thought", "Chất lượng phân tích":"Analysis quality", "Mô hình số":"Numbers model",
  "Tính khả thi":"Feasibility", "Cấu trúc slide":"Slide structure", "Trình bày":"Delivery", "Xử lý Q&A":"Q&A handling",
  "1 + 2 · trừ khi trễ":"1 + 2 · minus late penalty", "deliverable 1":"deliverable 1", "deliverable 2":"deliverable 2",
  "deliverable 3":"deliverable 3", "Nhận xét:":"Feedback:",
  "1 · Governing thought":"1 · Governing thought", "2 · Ba trụ lập luận":"2 · Three pillars",
  "3 · Bằng chứng và con số":"3 · Evidence and numbers",
  "Trụ thêm (không bắt buộc)":"Extra pillar (optional)", "Governing thought":"Governing thought",
  "Mỗi dòng là headline một trang: câu khẳng định, có con số, ít nhất 7 chữ. Trang 1 là governing thought.":
    "One headline per slide: a full sentence with a number, at least 7 words. Slide 1 is the governing thought.",
  "Q&A với ban giám khảo":"Q&A with the judges", "Phân tích & governing thought":"Analysis & governing thought",
  "Slide outline":"Slide outline", "Phiên dùng bài mẫu · không tính điểm":"Model-answer session · not scored",
  "Phiên dùng bài mẫu — chỉ để xem cách chấm, không ghi điểm.":"Model-answer session — shown for scoring only, not recorded.",

  /* interview */
  "Chưa phỏng vấn":"Not started", "Bắt đầu phỏng vấn":"Start the interview", "Bắt đầu phỏng vấn →":"Start the interview →",
  "Phỏng vấn ngẫu nhiên":"Random interview", "Phỏng vấn thật không cho bạn chọn đề":"A real interview never lets you pick the case",
  "Đã phỏng vấn":"Interviewed", "Điểm trung bình":"Average score", "Vòng yếu nhất":"Weakest round", "Dạng case đã thử":"Case types tried",
  "Nên phỏng vấn tiếp":"Up next", "Điểm theo vòng":"Score by round", "Kiểu dẫn case":"Case format", "Tất cả dạng":"All types",
  "Đang dở":"In progress", "Đã xong":"Done", "Chưa có phiên tự trả lời":"No self-answered sessions yet",
  "Bạn đang dở phiên này — làm nốt trước khi mở case mới.":"You have this session in progress — finish it before opening a new case.",
  "Case chưa phỏng vấn, độ khó vừa sức với tiến độ hiện tại.":"Not interviewed yet, at a difficulty that fits your progress.",
  "Điểm thấp nhất của bạn — phỏng vấn lại để gỡ điểm.":"Your lowest score — run it again to recover points.",
  "Bạn đã phỏng vấn hết các case.":"You have interviewed every case.",
  "Hoàn thành một phiên tự trả lời để thấy vòng nào bạn đang mất điểm. Phiên dùng câu mẫu không được tính.":"Finish a self-answered session to see which round costs you points. Model-answer sessions are not counted.",
  "Case tiếp theo":"Next case",
  "Mới":"New", "Câu mẫu vòng này":"Model answer for this round", "Còn thiếu:":"Missing:", "Thời gian:":"Time:",
  "con số then chốt":"the key number",
  "ý then chốt":"the key idea",
  "Gợi ý":"Hint", "Câu trả lời tốt có":"A strong answer has", "Bẫy thường gặp:":"Common trap:",
  "Luyện riêng một vòng":"Drill a single round", "Vòng yếu nhất":"Weakest round", "Luyện vòng":"Round drill",
  "5 câu cùng một vòng từ 5 case khác nhau · không tính điểm, không ghi lỗi.":"5 questions from the same round across 5 different cases · not scored, no mistakes logged.",
  "Không tính điểm":"Not scored", "Các vòng trước của case này":"Earlier rounds of this case", "Câu mẫu:":"Model answer:",
  "Câu tiếp theo":"Next question", "Dừng luyện":"Stop drilling", "Luyện lại vòng này":"Drill this round again",
  "Bài luyện không ghi vào tiến độ. Muốn được chấm và ghi lỗi, hãy phỏng vấn trọn một case.":"Drills are not recorded. To be scored and have mistakes logged, run a full case interview.",
  "Chưa có bài luyện nào. Chọn một vòng ở thẻ \"Điểm theo vòng\" để bắt đầu.":"No drill yet. Pick a round in the \"Score by round\" card to start.",
  "Đang luyện vòng":"Drilling round", "Kết quả luyện vòng":"Drill result",
  "Nói":"Speak", "Dừng":"Stop", "Trả lời bằng giọng nói":"Answer by voice",
  "Trình duyệt chưa cho phép dùng micro":"The browser has not allowed microphone access",
  "Chưa nghe thấy giọng nói — thử nói gần micro hơn":"No speech heard — try speaking closer to the mic",
  "Không nhận được giọng nói, thử lại nhé":"Could not catch that, please try again", "Không bật được micro":"Could not start the microphone",
  "Câu hỏi vặn":"Follow-up challenge", "Không tính vào điểm phiên":"Not counted in the session score", "hỏi vặn":"follow-up",
  "Giữ lập luận bằng con số, và nói rõ bạn điều chỉnh gì…":"Hold your ground with numbers, and say what you would adjust…",
  "Người phỏng vấn đang thử độ vững của khuyến nghị":"The interviewer is testing how solid your recommendation is",
  "Năm vòng và cách chấm":"Five rounds and how they are scored", "Transcript":"Transcript",
  "Câu mẫu":"Model answer", "Trả lời":"Answer", "Phỏng vấn lại":"Interview again",
  "Kết quả phỏng vấn":"Interview result", "← Danh sách case phỏng vấn":"← All interview cases", "← Danh sách case":"← All cases",
  "Nói to trước rồi mới gõ lại ·":"Say it out loud first, then type it ·", "để gửi":"to send",
  "Nói to trước rồi mới gõ lại":"Say it out loud first, then type it",
  "Nói cả phép tính và con số…":"Say the calculation and the number…",
  "Nói thành lời như đang ngồi trước người phỏng vấn…":"Answer as if you were in the room…",
  "Clarify":"Clarify", "Structure":"Structure", "Case math":"Case math", "Chart reading":"Chart reading",
  "Recommendation":"Recommendation", "BẠN":"YOU", "Scratchpad":"Scratchpad",
  "Phiên dùng câu mẫu — chỉ để xem cách chấm, không ghi điểm.":"Model-answer session — shown for scoring only, not recorded.",
  "Nhắc lại đề trong một câu và hỏi 2–3 câu làm rõ.":"Restate the brief in one sentence and ask 2–3 clarifying questions.",
  "Nêu cấu trúc đủ nhánh cho loại case này.":"Lay out a structure with all branches this case needs.",
  "Tính ra con số then chốt, nói cả phép tính.":"Work out the key number and say the calculation.",
  "Đọc exhibit và rút ra câu \"vậy thì sao\".":"Read the exhibit and land the \"so what\".",
  "Khuyến nghị gắn với ràng buộc và con số vừa tính.":"Tie the recommendation to the constraint and the number you just found.",
  "từ khoá":"keywords", "từ khoá + con số":"keywords + number", "3 ý":"3 points",
  "Điểm mỗi vòng: một nửa từ từ khoá và con số then chốt, một nửa từ số ý của câu trả lời tốt bạn đạt được.":"Each round score: half from the key words and key number, half from how many points of a strong answer you cover.",

  /* mistake review */
  "Lỗi đang mở":"Open mistakes", "Đã sửa xong":"Fixed", "Lỗi lặp lại":"Repeated mistakes", "Đến hạn ôn":"Due for review",
  "sai cùng một chỗ ≥ 2 lần":"same slip ≥ 2 times", "hôm nay":"today", "Phân bố loại lỗi":"Mistakes by type",
  "Lịch ôn giãn cách":"Spaced review schedule", "Lỗi framework":"Framework mistake", "Lỗi tính toán":"Calculation mistake",
  "Lỗi lập luận":"Logic mistake", "Đọc sai exhibit":"Misread exhibit", "Lỗi trình bày":"Presentation mistake",
  "BẠN VIẾT":"YOU WROTE", "ĐÚNG LÀ":"CORRECT", "Vì sao sai:":"Why it's wrong:", "Luyện lại":"Practice again",
  "Đã hiểu hẳn":"Got it for good", "Mẫu lặp:":"Repeating pattern:", "chưa có":"none yet",
  "Không có lỗi loại này.":"No mistakes of this type.", "Không còn lỗi nào đang mở. Tốt lắm.":"No open mistakes. Nicely done.",
  "Ôn lỗi đến hạn đầu tiên →":"Review the first due mistake →",

  /* career */
  "Lộ trình":"Path", "Kỹ năng cần đạt":"Skills to reach", "Bộ kỹ năng cần đạt":"Skill set to reach",
  "Tốt nghiệp khi":"You graduate when", "Tốt nghiệp khi:":"You graduate when:", "Chọn lộ trình":"Choose this path",
  "Chọn lộ trình này":"Choose this path", "Bỏ chọn":"Unselect", "Đang theo":"Following",
  "Vị trí khởi điểm":"Entry roles", "Track cần học":"Tracks to study", "Bài đã xong":"Lessons done",
  "Nơi tuyển":"Who hires", "Track trong lộ trình":"Tracks in this path", "trong các track của lộ trình":"across this path's tracks",

  /* landing */
  "Cách học":"How it works", "Nội dung":"Content", "Ví dụ":"Example", "Câu hỏi":"FAQ", "Vào học":"Open the app",
  "Học case bằng cách làm case":"Learn cases by doing cases", "Bắt đầu học — miễn phí":"Start learning — free",
  "Xem thử một bài học":"Preview a lesson", "Vào học ngay":"Open the app now", "Thử giải một case":"Try solving a case",
  "Mở một case và bắt đầu":"Open a case and begin",
  "Không cần đăng ký. Tiến độ lưu ngay trên trình duyệt này.":"No sign-up. Progress is saved in this browser.",
  "Ba điều khác với một khoá học thông thường":"Three things a normal course does not do",
  "Đường đi của một người học":"How a learner moves", "Sáu track, một lộ trình":"Six tracks, one path",
  "Bên trong một bài học":"Inside a lesson", "Câu hỏi thường gặp":"Frequently asked questions",
  "Khuôn 10 phần":"The 10-part shape", "Học":"Learn", "Luyện Arena":"Practice Arena", "Thi Competition":"Competition",
  "Phỏng vấn":"Interview", "Ôn lỗi":"Review mistakes", "Dành cho:":"For:",
  "bài học có bài tập":"lessons with exercises", "đề case có exhibit":"cases with exhibits",
  "track theo nghề":"career tracks", "module":"modules"
};

/* chuỗi có số: dịch bằng quy tắc */
const RULES = [
  /* chuỗi kết thúc bằng mũi tên: dịch phần chữ rồi giữ mũi tên */
  [/^(.+?) →$/, m=>`${tr(m[1])} →`],
  [/^Gợi ý: (.+)$/, m=>`Hint: ${m[1]}`],
  [/^(\d+)\/(\d+) bài · (.+?)( · thuộc lộ trình)?$/, (m)=>`${m[1]}/${m[2]} lessons · ${m[3]}${m[4]?" · in your path":""}`],
  [/^(\d+) bài · (.+)$/, m=>`${m[1]} lessons · ${m[2]}`],
  [/^(\d+) phút$/, m=>`${m[1]} min`],
  [/^(\d+) bài$/, m=>`${m[1]} lessons`],
  [/^Bài (\d+)\/(\d+)$/, m=>`Lesson ${m[1]}/${m[2]}`],
  [/^Còn (\d+) bài$/, m=>`${m[1]} lessons left`],
  [/^(\d+) kết quả$/, m=>`${m[1]} results`],
  [/^(\d+) module$/, m=>`${m[1]} modules`],
  [/^(\d+) ngày$/, m=>`${m[1]} days`],
  [/^Kỷ lục (\d+) ngày$/, m=>`Best ${m[1]} days`],
  [/^([+−-])(\S+) so với tuần trước$/, m=>`${m[1]}${m[2]} vs last week`],
  [/^Điểm cao nhất trung bình (\d+)$/, m=>`Average best score ${m[1]}`],
  [/^Điểm cao nhất (\d+)$/, m=>`Best score ${m[1]}`],
  [/^(\d+) case đã giải$/, m=>`${m[1]} cases solved`],
  [/^(.+) · còn ([\d.,]+) XP tới (.+)$/, m=>`${m[1]} · ${m[2]} XP to ${m[3]}`],
  [/^(.+) · cấp cao nhất$/, m=>`${m[1]} · top level`],
  [/^(\d+) đề · (\d+) đã giải · lọc theo ngành, dạng case, độ khó và chế độ luyện\.$/,
   m=>`${m[1]} cases · ${m[2]} solved · filter by industry, type, difficulty and mode.`],
  [/^(\d+) lần nộp · cao nhất (\d+)$/, m=>`${m[1]} attempts · best ${m[2]}`],
  [/^Hoàn thành bài · \+(\d+) XP$/, m=>`Complete lesson · +${m[1]} XP`],
  [/^Mỗi câu đúng ở lần đầu: \+(\d+) XP\.$/, m=>`Each first-try correct answer: +${m[1]} XP.`],
  [/^Đã hoàn thành ngày (.+)\.$/, m=>`Completed on ${m[1]}.`],
  [/^Đang thi · deliverable (\d+)\/3$/, m=>`In progress · deliverable ${m[1]}/3`],
  [/^Đang làm · deliverable (\d+)\/3$/, m=>`Working on · deliverable ${m[1]}/3`],
  [/^Đang thi · vòng (\d+)\/5$/, m=>`In progress · round ${m[1]}/5`],
  [/^(\d+) phiên đang dở$/, m=>`${m[1]} in progress`],
  [/^Thời lượng gợi ý (\d+) phút$/, m=>`Suggested length ${m[1]} min`],
  [/^Dùng gợi ý ở (\d+) vòng$/, m=>`Hints used in ${m[1]} rounds`],
  [/^Câu (\d+)\/(\d+)$/, m=>`Question ${m[1]}/${m[2]}`],
  [/^Câu (\d+)$/, m=>`Question ${m[1]}`],
  [/^Đang luyện vòng (.+)$/, m=>`Drilling ${tr(m[1])}`],
  [/^Câu hỏi vặn: (\d+)\/(\d+) ý$/, m=>`Follow-up: ${m[1]}/${m[2]} points`],
  [/^Câu trả lời của bạn — (.+)$/, m=>`Your answer — ${tr(m[1])}`],
  [/^Người phỏng vấn đưa ở vòng (\d+) · (.+)$/, m=>`Handed out in round ${m[1]} · ${tr(m[2])}`],
  [/^· gợi ý (\d+) phút$/, m=>`· suggested ${m[1]} min`],
  [/^Phiên gồm 5 vòng trong (\d+) phút\. Người phỏng vấn hỏi từng vòng và chỉ đưa exhibit khi tới lượt; trả lời xong mới hiện vòng tiếp theo, phần ghi nhận và câu mẫu của vòng đó\.$/,
    m=>`The session has 5 rounds in ${m[1]} minutes. The interviewer asks one round at a time and hands out each exhibit only when it is needed; once you answer, the next round, the note and that round's model answer appear.`],
  [/^Từ (\d+) phiên tự trả lời$/, m=>`From ${m[1]} self-answered sessions`],
  [/^Trung bình (\d+) điểm$/, m=>`Average ${m[1]} points`],
  [/^(\d+) phiên$/, m=>`${m[1]} sessions`],
  [/^Dạng (.+) bạn chưa phỏng vấn lần nào\.$/, m=>`You have not interviewed a ${m[1]} case yet.`],
  [/^Đã nộp · (\d+) điểm$/, m=>`Submitted · ${m[1]} points`],
  [/^Đã xong · (\d+) điểm$/, m=>`Done · ${m[1]} points`],
  [/^(\d+)\/(\d+) đã nộp$/, m=>`${m[1]}/${m[2]} submitted`],
  [/^(\d+)\/(\d+) vòng đã trả lời$/, m=>`${m[1]}/${m[2]} rounds answered`],
  [/^(\d+)\/(\d+) chặng$/, m=>`${m[1]}/${m[2]} steps`],
  [/^Nộp deliverable (\d+)$/, m=>`Submit deliverable ${m[1]}`],
  [/^Deliverable (\d+) · (.+)$/, m=>`Deliverable ${m[1]} · ${tr(m[2])}`],
  [/^hạn (\d+)% thời gian$/, m=>`due at ${m[1]}% of the time`],
  [/^hạn phút (\d+)$/, m=>`due at min ${m[1]}`],
  [/^phút (\d+)$/, m=>`min ${m[1]}`],
  [/^nộp phút (\d+)( · trễ)?$/, m=>`submitted at min ${m[1]}${m[2]?" · late":""}`],
  [/^Hạn ở phút (\d+) · nộp trễ trừ 10 điểm trình bày$/, m=>`Due at min ${m[1]} · late costs 10 delivery points`],
  [/^Tổng điểm (\d+)$/, m=>`Total ${m[1]}`],
  [/^Vòng (\d+)$/, m=>`Round ${m[1]}`],
  [/^Người phỏng vấn · vòng (\d+)$/, m=>`Interviewer · round ${m[1]}`],
  [/^Giám khảo · câu (\d+)$/, m=>`Judge · question ${m[1]}`],
  [/^Ghi nhận \((\d+)\/100\):$/, m=>`Note (${m[1]}/100):`],
  [/^Câu trả lời của bạn — vòng (\d+) · (.+)$/, m=>`Your answer — round ${m[1]} · ${tr(m[2])}`],
  [/^Lặp (\d+) lần$/, m=>`Repeated ${m[1]}×`],
  [/^Đã ôn \((\d+)\/(\d+)\)$/, m=>`Reviewed (${m[1]}/${m[2]})`],
  [/^Sau (\d+) ngày$/, m=>`In ${m[1]} days`],
  [/^Quá hạn (\d+) ngày$/, m=>`${m[1]} days overdue`],
  [/^(\d+) đến hạn$/, m=>`${m[1]} due`],
  [/^Đã ghi vào tiến độ · \+(\d+) XP\.$/, m=>`Recorded · +${m[1]} XP.`],
  [/^Ôn bài: (.+)$/, m=>`Review lesson: ${tr(m[1])}`],
  [/^(.+) · đang theo$/, m=>`${tr(m[1])} · following`],
  [/^Output: (.+)$/, m=>`Output: ${m[1]}`],
  [/^\/(\d+) bài$/, m=>`/${m[1]} lessons`],
  [/^(.+) · Bài (\d+)\/(\d+) · (\d+) phút$/, m=>`${m[1]} · Lesson ${m[2]}/${m[3]} · ${m[4]} min`],
  [/^Tiến độ tổng · (.+)$/, m=>`Overall progress · ${m[1]}`],
  [/^(\d{4}-\d{2}-\d{2}) · ôn (\d+)\/(\d+) · (.+)$/, m=>`${m[1]} · reviewed ${m[2]}/${m[3]} · ${tr(m[4])}`],
  [/^(\d+) · (.+)$/, m=>`${m[1]} · ${tr(m[2])}`],
  [/^(\d+)\/(\d+)$/, m=>`${m[1]}/${m[2]}`],
  [/^Hôm nay$/, ()=>"Today"], [/^Ngày mai$/, ()=>"Tomorrow"],
  /* chuỗi ghép bằng dấu · : dịch từng mảnh nếu có trong từ điển */
  [/ · /, m=>{ const parts=m.input.split(" · ");
      /* mỗi mảnh: tra từ điển, rồi thử các quy tắc khác (bỏ chính quy tắc dấu ·) */
      const seg = x=>{ const s2=x.trim(); if(DICT[s2]!=null) return DICT[s2];
        for(const [re,fn] of RULES){ if(re.source===" · ") continue; const mm=s2.match(re); if(mm) return fn(mm); }
        return x; };
      const out=parts.map(seg);
      return out.some((x,i)=>x!==parts[i]) ? out.join(" · ") : m.input; }]
];

const CONTENT_NOTE = "Lesson and case content is currently Vietnamese only — the interface is in English.";

let lang = "vi";
try{ lang = localStorage.getItem("caselab.lang") || "vi"; }catch(e){}

function tr(s){
  if(lang !== "en") return s;          // chế độ tiếng Việt: giữ nguyên bản gốc
  const t = String(s).trim();
  if(!t) return s;
  if(DICT[t] != null) return DICT[t];
  for(const [re, fn] of RULES){ const m = t.match(re); if(m) return fn(m); }
  return s;
}

/* dịch text node và placeholder trong một nhánh DOM */
function apply(root){
  if(lang !== "en" || !root) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while(walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(n => {
    const raw = n.nodeValue, t = raw.trim();
    if(!t) return;
    const out = tr(t);
    if(out !== t) n.nodeValue = raw.replace(t, out);
  });
  root.querySelectorAll("[placeholder]").forEach(el => el.placeholder = tr(el.placeholder));
  root.querySelectorAll("[title]").forEach(el => el.title = tr(el.title));
}

function set(l){
  lang = l === "en" ? "en" : "vi";
  try{ localStorage.setItem("caselab.lang", lang); }catch(e){}
}
const toggle = () => `<div class="seg lang">
  <button class="${lang==="vi"?"on":""}" onclick="I18N.pick('vi')">VI</button>
  <button class="${lang==="en"?"on":""}" onclick="I18N.pick('en')">EN</button></div>`;

window.I18N = {
  get lang(){ return lang; }, DICT, RULES, CONTENT_NOTE, t:tr, apply, set, toggle,
  add(map){ Object.assign(DICT, map); },
  pick(l){ set(l); if(window.render) render(); else location.reload(); }
};
})();
