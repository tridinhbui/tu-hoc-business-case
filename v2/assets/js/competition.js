/* ═══ Tự học Business Case · Competition engine ═══
   Phòng thi 3 deliverable có hạn chót, chấm theo 7 tiêu chí của ban giám khảo.
     1 · Phân tích & governing thought  → chấm bằng spec Arena của case (SCORING)
     2 · Slide outline 6–8 headline     → số trang, headline có số + đủ dài, trang 1 nói đúng khuyến nghị
     3 · Q&A 3 câu hỏi đuổi              → từ khoá + con số tính lại được
   Nộp muộn: trừ 10 điểm Trình bày cho mỗi deliverable trễ hạn.
   Phiên thi lưu ở State.data.comp[caseId]. Hàm score() thuần — tests/competition.test.js chạy bằng node. */
(function(){
const DEADLINE = [0.25, 2/3, 1];            // hạn mỗi deliverable, tính theo tỷ lệ thời lượng đề
const STAGES = [
  {n:"Phân tích & governing thought", d:"Câu trả lời chủ đạo, ba trụ lập luận, bằng chứng có con số và một khuyến nghị."},
  {n:"Slide outline", d:"6–8 headline dạng câu khẳng định, mỗi headline một con số. Trang 1 là governing thought."},
  {n:"Q&A với ban giám khảo", d:"Ba câu hỏi đuổi. Trả lời ngắn, có con số, bảo vệ được giả định."}
];

const CFG = {
  "cc-01": {
    govKw:["lẩu"],
    slides:["Dồn 900 tỷ vào 60 nhà hàng lẩu mang thêm 240 tỷ EBITDA mỗi năm",
            "Lẩu tạo 4 tỷ EBITDA mỗi nhà hàng, gấp mười lần đồ uống",
            "Mỗi nhà hàng lẩu mới hoàn vốn sau 3,75 năm",
            "App giao hàng riêng chỉ thêm 48 tỷ mỗi năm vì mất 20% đơn",
            "Đàm phán hoa hồng từ 25% xuống 20% giữ thêm 100 tỷ mỗi năm",
            "Tái cơ cấu 50 điểm đồ uống giải phóng mặt bằng cho lẩu trong 3 năm"],
    qa:[{q:"Nếu nhà hàng lẩu mới chỉ đạt 3 tỷ EBITDA mỗi nhà hàng thì hoàn vốn bao lâu?", kw:["hoàn vốn","năm"], num:5, tol:0.05,
         model:"Hoàn vốn khoảng 5 năm (900 ÷ 180), vẫn chấp nhận được nhưng cần tiêu chí dừng mở nếu doanh số dưới kỳ vọng."},
        {q:"Vì sao không tự xây app giao hàng để thoát hoa hồng 25%?", kw:["hoa hồng","mất 20%","đơn"], num:48, tol:0.5,
         model:"App riêng chỉ thêm 48 tỷ mỗi năm vì mất 20% đơn; đàm phán lại hoa hồng mang về nhiều hơn với rủi ro thấp hơn."},
        {q:"Rủi ro lớn nhất của chiến lược này là gì và bạn chặn nó thế nào?", kw:["ăn lẫn","vị trí","thí điểm","theo mốc","tiêu chí"], num:null,
         model:"Rủi ro là nhà hàng mới ăn lẫn doanh thu nhà hàng cũ; chặn bằng tiêu chí vị trí và mở theo mốc doanh số."}]
  },
  "cc-02": {
    govKw:["đại lý","tạp hoá"],
    slides:["Mạng lưới 20.000 đại lý tạp hoá mang về 80 tỷ lợi nhuận mỗi năm",
            "Mỗi khách qua đại lý lãi 40.000đ, qua chi nhánh lỗ 425.000đ",
            "App thuần chỉ giữ 25% khách còn hoạt động sau 12 tháng",
            "Mô hình đại lý hoà vốn khi tỷ lệ hoạt động đạt 48%",
            "Thí điểm ở 3 tỉnh cho thấy đại lý giữ 64% khách hoạt động",
            "Mở rộng tới 2 triệu khách vào năm thứ 3 qua mạng lưới đại lý"],
    qa:[{q:"Nếu tỷ lệ hoạt động qua đại lý chỉ đạt 50%, mỗi khách còn lãi bao nhiêu?", kw:["lãi","khách"], num:5000, tol:1,
         model:"Ở 50% hoạt động mỗi khách chỉ lãi 5.000đ, sát ngưỡng hoà vốn, nên phải giữ tỷ lệ hoạt động cao."},
        {q:"App thuần rẻ hơn nhiều — vì sao không chọn?", kw:["25%","hoạt động","không dùng được"], num:null,
         model:"App thuần chỉ giữ 25% khách hoạt động và 70% khách nông thôn không tự dùng được app."},
        {q:"Làm sao giữ tỷ lệ hoạt động trên 48%?", kw:["hoa hồng đại lý","hướng dẫn","giao dịch đầu tiên","theo dõi"], num:null,
         model:"Trả hoa hồng đại lý theo giao dịch thực tế và để đại lý hướng dẫn khách làm giao dịch đầu tiên."}]
  },
  "cc-03": {
    govKw:["hợp nhất","tồn kho"],
    slides:["Hợp nhất tồn kho giải phóng 400 tỷ và giảm giao trễ xuống 14,5%",
            "Hai hệ thống tồn kho tách rời làm vòng quay giảm từ 7 xuống 5 lần",
            "Đơn xuất từ kho trung tâm trễ 25%, từ cửa hàng chỉ trễ 10%",
            "Giao 70% đơn online từ cửa hàng gần nhất đưa tỷ lệ trễ về 14,5%",
            "Giải phóng 400 tỷ tồn kho tiết kiệm 48 tỷ chi phí vốn mỗi năm",
            "Triển khai hợp nhất trong 2 quý, bắt đầu từ 20 cửa hàng lớn nhất"],
    qa:[{q:"Nếu chỉ 50% đơn online xuất từ cửa hàng, tỷ lệ giao trễ là bao nhiêu?", kw:["trễ"], num:17.5, tol:0.1,
         model:"Nếu chỉ 50% đơn từ cửa hàng thì tỷ lệ trễ còn 17,5%, vẫn tốt hơn 22% nhưng chưa đạt mục tiêu."},
        {q:"Giao đơn online từ cửa hàng có làm cửa hàng hết hàng bán tại chỗ không?", kw:["tồn kho chung","ngưỡng","dự trữ","ưu tiên"], num:null,
         model:"Dùng tồn kho chung có ngưỡng dự trữ tối thiểu cho bán tại chỗ; dưới ngưỡng thì đơn online chuyển sang kho."},
        {q:"400 tỷ tiền mặt giải phóng nên dùng vào đâu?", kw:["trả nợ","chi phí vốn","đầu tư"], num:null,
         model:"Dùng 400 tỷ trả nợ vay để tiết kiệm chi phí vốn khoảng 48 tỷ mỗi năm."}]
  }
};

const norm = s => String(s||"").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/đ/g,"d");
const has = (s, ...w) => w.some(x => norm(s).includes(norm(x)));
const cap = n => Math.max(0, Math.min(100, Math.round(n)));
const words = s => String(s).trim().split(/\s+/).filter(Boolean).length;

function scoreSlides(cfg, slides){
  const s = (slides||[]).map(x => String(x||"").trim()).filter(Boolean);
  const strong = s.filter(h => /\d/.test(h) && words(h) >= 7);
  const quality = s.length ? strong.length / s.length : 0;
  const gov = s.length && has(s[0], ...cfg.govKw) ? 20 : 0;
  return { score: cap(Math.min(s.length,6)/6*40 + quality*40 + gov), quality, count:s.length,
           weak: s.find(h => !strong.includes(h)) || "" };
}

function scoreQA(cfg, answers){
  const per = cfg.qa.map((q,i) => {
    const t = String((answers||[])[i]||"");
    if(!t.trim()) return 0;
    const kw = has(t, ...q.kw);
    if(q.num == null) return kw ? 100 : 0;
    return (kw ? 50 : 0) + (SCORING.mentionsNumber(t, q.num, q.tol) ? 50 : 0);
  });
  return { score: cap(per.reduce((a,b)=>a+b,0) / per.length), per };
}

function lateStages(caseMin, sess){
  return (sess.at||[]).filter((t,i) => t != null && t - sess.start > caseMin*60000*DEADLINE[i]).length;
}

const FEEDBACK = {
  "Governing thought":"Câu trả lời chủ đạo chưa nêu rõ quyết định và vì sao — viết lại thành một câu khuyến nghị có con số.",
  "Chất lượng phân tích":"Ba trụ chưa phủ đủ vấn đề hoặc chưa rút ra được \"so what\" từ exhibit.",
  "Mô hình số":"Thiếu con số then chốt của đề — mỗi trụ lập luận cần ít nhất một phép tính.",
  "Tính khả thi":"Khuyến nghị chưa đánh đúng nguyên nhân gốc hoặc bỏ qua ràng buộc của đề.",
  "Cấu trúc slide":"Outline cần 6–8 trang, mỗi headline là câu khẳng định có con số, trang 1 là governing thought.",
  "Trình bày":"Headline còn là nhãn hoặc nộp trễ hạn — cả hai đều bị trừ điểm trình bày.",
  "Xử lý Q&A":"Câu trả lời Q&A cần con số tính lại được và bám vào giả định đã đưa ra."
};

function score(caseId, sess){
  const spec = SCORING.cases[caseId], cfg = CFG[caseId], c = window.CASE_BY_ID[caseId];
  const a = spec.score(sess.s1 || {}), v = Object.fromEntries(a.dims);
  const sl = scoreSlides(cfg, sess.s2), qa = scoreQA(cfg, sess.s3);
  const late = lateStages(c.min, sess);
  const pres = cap((v["Storytelling"] + sl.quality*100)/2 - 10*late);
  const dims = [
    ["Governing thought", v["Problem framing"]],
    ["Chất lượng phân tích", cap((v["Structure / MECE"] + v["Insight"])/2)],
    ["Mô hình số", v["Analysis & math"]],
    ["Tính khả thi", v["Feasibility"]],
    ["Cấu trúc slide", sl.score],
    ["Trình bày", pres],
    ["Xử lý Q&A", qa.score]
  ];
  const total = cap(dims.reduce((s,d)=>s+d[1],0) / dims.length);
  const skills = { struct: cap((v["Problem framing"]+v["Structure / MECE"])/2), math: v["Analysis & math"],
                   data: v["Analysis & math"], insight: v["Insight"], story: pres, fin: v["Feasibility"] };

  const src = "Competition · " + spec.title, mistakes = a.mistakes.slice();
  if(sl.count && sl.quality < 0.5) mistakes.push({kind:"presentation", ref:caseId, src,
    bad:`Headline yếu: “${sl.weak}”`, good:`Headline có kết luận và con số, ví dụ: “${cfg.slides[0]}”`,
    why:"Người đọc lướt headline phải hiểu được toàn bộ lập luận — headline là nhãn hoặc không có số thì chưa xong.", lesson:["c-deck-1",""]});
  if(sess.s3){
    const i = qa.per.findIndex(p => p < 50);
    if(i >= 0) mistakes.push({kind:"logic", ref:caseId+"-qa", src,
      bad:`Q&A: ${cfg.qa[i].q} → ${String(sess.s3[i]||"").trim() || "(bỏ trống)"}`, good:cfg.qa[i].model,
      why:"Giám khảo hỏi đuổi để kiểm tra bạn hiểu con số và giả định của chính mình.", lesson:["c-qa-1",""]});
  }
  const weakest = dims.slice().sort((x,y)=>x[1]-y[1])[0];
  const feedback = total >= 90
    ? "Bài thi chặt: governing thought có con số, outline kể đúng một câu chuyện, và bảo vệ được giả định khi bị hỏi đuổi."
    : `Điểm yếu nhất là ${weakest[0]} (${weakest[1]}). ${FEEDBACK[weakest[0]]}${late?` Nộp trễ ${late} deliverable (−${10*late} điểm trình bày).`:""}`;
  return { dims, total, skills, mistakes, feedback, late };
}

/* ── phiên thi ── */
const store = () => State.data.comp || (State.data.comp = {});
const get = id => store()[id] || null;
const stageOf = sess => !sess ? -1 : sess.result ? 3 : sess.s2 ? 2 : sess.s1 ? 1 : 0;
const deadlineAt = (id, i) => get(id).start + window.CASE_BY_ID[id].min*60000*DEADLINE[i];

function start(id, now){
  store()[id] = {start:now, s1:null, s2:null, s3:null, at:[null,null,null], usedModel:false, result:null};
  State.save(); return get(id);
}
function submit(id, payload, now){
  const sess = get(id), i = stageOf(sess);
  if(i < 0 || i > 2) return null;
  sess["s"+(i+1)] = payload; sess.at[i] = now;
  if(i === 2){
    const r = score(id, sess);
    sess.result = {total:r.total, dims:r.dims, feedback:r.feedback, late:r.late, recorded:!sess.usedModel};
    if(!sess.usedModel){
      const res = State.recordAttempt(id, {scores:r.skills, total:r.total, answers:{s1:sess.s1,s2:sess.s2,s3:sess.s3}});
      const rec = State.data.cases[id]; rec.lastDims = r.dims; rec.feedback = r.feedback;
      r.mistakes.forEach(m => State.addMistake(m));
      sess.result.gain = res.gain; sess.result.mistakes = r.mistakes.length;
    }
  }
  State.save(); return sess;
}
function reset(id){ delete store()[id]; State.save(); }
function markModel(id){ const s = get(id); if(s){ s.usedModel = true; State.save(); } }

window.COMP = { CFG, STAGES, DEADLINE, score, scoreSlides, scoreQA, lateStages, get, stageOf, deadlineAt, start, submit, reset, markModel };
})();
