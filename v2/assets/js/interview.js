/* ═══ CASELAB · Interview engine ═══
   Phiên phỏng vấn 5 vòng: Clarify → Structure → Case math → Chart reading → Recommendation.
   Mỗi vòng chấm bằng từ khoá + con số tính lại được từ đề (dùng chung spec Arena của case).
   Phiên lưu ở State.data.iv[caseId]. Hàm score() thuần — tests/interview.test.js chạy bằng node. */
(function(){
const ROUNDS = [
  {key:"clarify",   n:"Clarify",        kind:"logic"},
  {key:"structure", n:"Structure",      kind:"framework"},
  {key:"math",      n:"Case math",      kind:"calculation"},
  {key:"chart",     n:"Chart reading",  kind:"exhibit"},
  {key:"reco",      n:"Recommendation", kind:"logic"}
];

const CFG = {
  "iv-01": {
    style:"Interviewer-led · người phỏng vấn dẫn từng bước",
    rounds:[
      {q:"Khách hàng là một nhà máy bao bì nhựa. Doanh thu năm nay tăng 5% nhưng lợi nhuận giảm mạnh. CEO muốn biết vì sao và nên làm gì. Bạn bắt đầu thế nào?",
       kw:["cả ngành","riêng công ty","mục tiêu","làm rõ"], num:null,
       model:"Em hiểu là lợi nhuận giảm mạnh dù doanh thu tăng 5%, và mình cần tìm nguyên nhân rồi đề xuất cách khôi phục. Em xin hỏi hai điều: mức giảm này là của riêng công ty hay cả ngành, và mục tiêu của CEO là khôi phục lợi nhuận hay giữ sản lượng?",
       note:"Nhắc lại đề trong một câu rồi hỏi tối đa 2–3 câu làm rõ — đúng thứ tự mở đầu."},
      {q:"Mức giảm là của riêng công ty; mục tiêu là khôi phục lợi nhuận. Bạn cấu trúc vấn đề thế nào?",
       kw:["doanh thu","chi phí","nguyên liệu","hạt nhựa"], num:null,
       model:"Em chia lợi nhuận thành doanh thu (giá bán × sản lượng) và chi phí, trong đó tách riêng chi phí hạt nhựa vì với nhà máy nhựa đây là khoản lớn nhất, rồi mới tới chi phí khác như nhân công và năng lượng.",
       note:"Với nhà máy sản xuất, nguyên liệu phải là một nhánh riêng — thiếu nhánh này là bỏ nguyên nhân chính."},
      {q:"Đây là số liệu hai năm (Exhibit 1). Lợi nhuận thay đổi bao nhiêu, và con số nào giải thích điều đó?",
       kw:["hạt nhựa","nguyên liệu"], num:70, tol:0.5,
       model:"Lợi nhuận từ 100 tỷ xuống 30 tỷ, giảm 70 tỷ. Chi phí hạt nhựa tăng 120 tỷ trong khi giá bán tăng 5% chỉ mang về thêm 50 tỷ.",
       note:"Nói ra con số của từng nhánh trước khi kết luận nhánh nào là nguyên nhân."},
      {q:"Nhìn Exhibit 2 về biến động giá. Nó nói thêm điều gì, và mình cần tăng giá bao nhiêu để giữ lợi nhuận cũ?",
       kw:["đối thủ","dư địa","10%"], num:12, tol:0.1,
       model:"Giá hạt nhựa tăng 20% còn giá bán của mình chỉ tăng 5%, trong khi đối thủ đã tăng 10% — nên vẫn còn dư địa giá. Muốn giữ 100 tỷ lợi nhuận cần doanh thu 1.120 tỷ, tức tăng giá khoảng 12%.",
       note:"Exhibit giá của đối thủ cho biết mức tăng giá nào là khả thi — đó là cầu nối sang khuyến nghị."},
      {q:"Vậy khuyến nghị của bạn cho CEO là gì?",
       kw:["điều khoản","điều chỉnh giá","hợp đồng","30%"], num:null,
       model:"Đưa điều khoản điều chỉnh giá theo giá hạt nhựa vào hợp đồng khi gia hạn, tăng giá ngay phần 30% doanh thu không bị cố định giá, và phòng ngừa giá nguyên liệu cho phần còn lại.",
       note:"Khuyến nghị phải gắn với ràng buộc hợp đồng — đó là lý do giá bán không theo kịp chi phí."}
    ]
  },
  "iv-02": {
    style:"Candidate-led · bạn tự dẫn case",
    rounds:[
      {q:"Một chuỗi cà phê Việt Nam muốn vào Philippines, bắt đầu từ Manila với kế hoạch 50 cửa hàng tự vận hành. Bạn dẫn case — bắt đầu đi.",
       kw:["mục tiêu","thời gian","ngân sách","tiêu chí"], num:null,
       model:"Em xin làm rõ ba điều trước: mục tiêu là lợi nhuận hay thị phần, khung thời gian bao lâu, và ngân sách tối đa cho việc mở rộng.",
       note:"Case tự dẫn vẫn phải làm rõ mục tiêu và ràng buộc trước khi dựng cấu trúc."},
      {q:"Mục tiêu là lợi nhuận trong 5 năm, ngân sách tối đa 400 tỷ. Cấu trúc của bạn?",
       kw:["thị trường","cạnh tranh","kinh tế","cách vào"], num:null,
       model:"Em đi ba tầng: thị trường Manila có hấp dẫn không, kinh tế một cửa hàng có lãi và hoàn vốn trong bao lâu, và mình có thắng được không — cộng thêm một nhánh về cách vào thị trường.",
       note:"Ba tầng thị trường – kinh tế – năng lực, cộng nhánh cách vào, là khung chuẩn của case thâm nhập."},
      {q:"Bắt đầu từ thị trường. Ước lượng quy mô thị trường cà phê quán ở Manila mỗi năm.",
       kw:["quy mô","tỷ"], num:14560, tol:10,
       model:"14 triệu dân đô thị × 20% uống cà phê quán hằng tuần × 2 ly × 52 tuần × 50.000đ = 14.560 tỷ đồng mỗi năm.",
       note:"Giữ đơn vị qua từng bước và nói rõ giả định — giám khảo chấm đường tính, không chỉ con số."},
      {q:"Đây là kinh tế một cửa hàng và thị phần các chuỗi (Exhibit 2–3). Bạn đọc ra gì?",
       kw:["hoàn vốn","thị phần"], num:6.2, tol:0.05,
       model:"Mỗi cửa hàng doanh thu 7,2 tỷ, EBITDA 18% tức 1,296 tỷ, vốn 8 tỷ nên hoàn vốn khoảng 6,2 năm. 50 cửa hàng chỉ đạt khoảng 2,5% thị phần trong khi ba chuỗi lớn đã chiếm 75%.",
       note:"Kết hợp hoàn vốn dài với thị phần nhỏ — đó là cặp số dẫn thẳng tới khuyến nghị về cách vào."},
      {q:"Kết luận của bạn là gì?",
       kw:["thí điểm","đối tác","liên doanh","nhượng quyền"], num:null,
       model:"Thị trường đủ lớn nhưng hoàn vốn 6,2 năm là rủi ro vốn lớn, nên em đề xuất thí điểm 10 cửa hàng cùng đối tác địa phương theo liên doanh hoặc nhượng quyền, đo doanh số mỗi cửa hàng và chỉ mở rộng khi vượt ngưỡng.",
       note:"Khuyến nghị tốt biến rủi ro đã đo được thành một cách vào thị trường cụ thể."}
    ]
  }
};

const norm = s => String(s||"").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/đ/g,"d");
const has = (s, ...w) => w.some(x => norm(s).includes(norm(x)));
const cap = n => Math.max(0, Math.min(100, Math.round(n)));

function scoreRound(cfgR, text){
  const t = String(text||"");
  if(!t.trim()) return 0;
  const kw = has(t, ...cfgR.kw);
  if(cfgR.num == null) return kw ? 100 : 0;
  return (kw ? 50 : 0) + (SCORING.mentionsNumber(t, cfgR.num, cfgR.tol) ? 50 : 0);
}

const FEEDBACK = {
  Clarify:"Nhắc lại đề trong một câu rồi hỏi 2–3 câu làm rõ về mục tiêu và phạm vi.",
  Structure:"Cấu trúc thiếu nhánh quan trọng của loại case này — xem lại khung ở bài học gợi ý.",
  "Case math":"Thiếu con số then chốt. Nói ra phép tính trước khi kết luận.",
  "Chart reading":"Chưa rút ra được \"vậy thì sao\" từ exhibit — con số nào làm đổi quyết định?",
  Recommendation:"Khuyến nghị cần gắn với ràng buộc và con số vừa tính, không chỉ nêu hướng chung."
};

function score(caseId, sess){
  const cfg = CFG[caseId], spec = SCORING.cases[caseId];
  const per = cfg.rounds.map((r,i) => scoreRound(r, (sess.answers||[])[i]));
  const dims = ROUNDS.map((r,i) => [r.n, cap(per[i])]);
  const total = cap(per.reduce((a,b)=>a+b,0) / per.length);
  const v = Object.fromEntries(dims);
  const skills = { struct: cap((v.Clarify + v.Structure)/2), math: v["Case math"], data: v["Chart reading"],
                   insight: v["Chart reading"], story: v.Recommendation, fin: v["Case math"] };
  const src = "Interview · " + spec.title;
  const mistakes = per.map((p,i) => p >= 60 ? null : {   // 50 = đúng cấu trúc nhưng thiếu con số → vẫn ghi lỗi
      kind: ROUNDS[i].kind, ref: caseId+"-r"+(i+1), src,
      bad: `Vòng ${i+1} · ${ROUNDS[i].n}: ${String((sess.answers||[])[i]||"").trim().slice(0,140) || "(bỏ trống)"}`,
      good: cfg.rounds[i].model,
      why: cfg.rounds[i].note,
      lesson: [["i-profit-1","i-profit-2","i-profit-2","i-chart-1","i-profit-3"][i] || "i-profit-1", ""]
    }).filter(Boolean);
  const weakest = dims.slice().sort((a,b)=>a[1]-b[1])[0];
  const feedback = total >= 90
    ? "Phiên phỏng vấn tốt: mở đầu có làm rõ, cấu trúc đủ nhánh, có con số ở mỗi bước và khuyến nghị gắn với ràng buộc."
    : `Vòng yếu nhất là ${weakest[0]} (${weakest[1]}). ${FEEDBACK[weakest[0]]}`;
  return {dims, total, skills, mistakes, feedback, per};
}

/* ── phiên phỏng vấn ── */
const store = () => State.data.iv || (State.data.iv = {});
const get = id => store()[id] || null;
const roundOf = sess => !sess ? -1 : sess.result ? 5 : (sess.answers||[]).length;

function start(id, now){
  store()[id] = {start:now, answers:[], usedModel:false, result:null};
  State.save(); return get(id);
}
function answer(id, text, now){
  const sess = get(id), i = roundOf(sess);
  if(i < 0 || i > 4) return null;
  sess.answers[i] = text; sess.last = now;
  if(i === 4){
    const r = score(id, sess);
    sess.result = {total:r.total, dims:r.dims, feedback:r.feedback, recorded:!sess.usedModel};
    if(!sess.usedModel){
      const res = State.recordAttempt(id, {scores:r.skills, total:r.total, answers:{rounds:sess.answers},
                                           seconds: Math.round((now - sess.start)/1000)});
      const rec = State.data.cases[id]; rec.lastDims = r.dims; rec.feedback = r.feedback;
      r.mistakes.forEach(m => State.addMistake(m));
      sess.result.gain = res.gain; sess.result.mistakes = r.mistakes.length;
    }
  }
  State.save(); return sess;
}
function reset(id){ delete store()[id]; State.save(); }
function markModel(id){ const s = get(id); if(s){ s.usedModel = true; State.save(); } }

window.IVIEW = { CFG, ROUNDS, score, scoreRound, get, roundOf, start, answer, reset, markModel };
})();
