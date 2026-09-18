/* ═══ Tự học Business Case · Scoring engine ═══
   Chấm answer canvas theo 6 tiêu chí từ một "spec" dữ liệu của từng case (assets/js/data/arena.js).
   Bản prototype chấm bằng tín hiệu từ khoá + con số then chốt — đủ phân biệt bài có/không nắm
   cấu trúc, chưa thay được người chấm. Tách khỏi app.js để tests/scoring.test.js chạy bằng node.

   Spec một case:
     id, title, min?, brief{context,task}, labels?{problem,hyps,evidence}, exhibits[...]
     options  [[key, text, whyText, feasibilityScore]]   correct: key
     framing  [[từ khoá…], …]      problem statement chạm bao nhiêu nhóm
     branches [[từ khoá…], …]      cây giả thuyết phủ bao nhiêu nhánh
     numbers  [{v, tol, pts, core?}] con số then chốt trong phần bằng chứng (tổng pts ≤ 90)
     insight  [{kw:[…], pts}]      "so what" từ exhibit (tổng pts = 100)
     unit     regex đơn vị để trích con số người học đưa ra
     model    {problem, hyps[4], evidence, rec}
     mistakes {logicLesson, calc{label,good,why,lesson}, framework{good,why,lesson}, exhibit{bad,good,why,lesson}}
*/
(function(){
const norm = s => String(s||"").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/đ/g,"d");
const has = (s, ...words) => words.some(w => norm(s).includes(norm(w)));
const cap = n => Math.max(0, Math.min(100, Math.round(n)));

/* Số kiểu Việt: "12,5" · "12.5" · "1.234.567" · "93 tỷ" */
function parseNum(raw){
  let s = String(raw||"").replace(/\s/g,"").replace(/[^\d,.\-−]/g,"").replace("−","-");
  if(!s) return NaN;
  if(s.includes(",") && s.includes(".")) s = s.replace(/\./g,"").replace(",",".");
  else if(s.includes(",")) s = s.replace(",",".");
  else if(/^-?\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g,"");
  return parseFloat(s);
}
/* có con số x (±tol) xuất hiện trong đoạn văn không */
function mentionsNumber(text, x, tol){
  const nums = String(text||"").match(/-?\d+(?:[.,]\d+)*/g) || [];
  return nums.some(n => Math.abs(parseNum(n)-x) <= (tol||0.05));
}

const FEEDBACK = {
  "Problem framing":"Problem statement cần nêu đúng câu hỏi phải quyết định và điều khiến nó khó.",
  "Structure / MECE":"Cây giả thuyết thiếu nhánh. Xem nhánh gợi ý trong Mistake Review rồi dựng lại.",
  "Analysis & math":"Chưa lượng hoá con số then chốt của đề. Tính trước, kết luận sau.",
  "Insight":"Chưa rút ra “so what” từ exhibit — con số nào làm thay đổi quyết định?",
  "Feasibility":"Khuyến nghị chưa đánh vào nguyên nhân gốc hoặc bỏ qua một ràng buộc của đề.",
  "Storytelling":"Gắn bằng chứng với từng giả thuyết (H1, H2…) và nói rõ cái nào đúng, cái nào bị bác bỏ."
};

function scoreWith(spec, ans){
  const a = Object.assign({problem:"", hyps:[], evidence:"", rec:""}, ans);
  const hyps = (a.hyps||[]).filter(h => String(h).trim().length >= 6);
  const all = hyps.join(" | "), ev = a.evidence;
  const frac = (groups, text) => groups.filter(g => has(text, ...g)).length / groups.length;

  const framing = a.problem.trim().length >= 20
    ? 30 + 60*frac(spec.framing, a.problem) + (a.problem.length <= 240 ? 10 : 0) : 0;
  const structure = Math.min(hyps.length,3)*20 + (hyps.length ? 40*frac(spec.branches, all) : 0);

  const hits = spec.numbers.map(n => mentionsNumber(ev, n.v, n.tol));
  const gotCore = hits[spec.numbers.findIndex(n => n.core)];
  const analysis = spec.numbers.reduce((s,n,i) => s + (hits[i] ? n.pts : 0), 0)
                 + (ev.trim() && has(ev,"ex.","ex ","exhibit") ? 10 : 0);

  const insight = spec.insight.reduce((s,g) => s + (has(ev, ...g.kw) ? g.pts : 0), 0);
  const opt = spec.options.find(o => o[0] === a.rec);
  const feas = opt ? opt[3] : 0;

  let story = 0;
  if(/\bh[1-4]\b/i.test(ev)) story += 40;
  if(has(ev,"bác bỏ","loại trừ","đúng","sai","không phải")) story += 30;
  if(a.rec && a.problem.trim()) story += 30;

  const dims = [
    ["Problem framing", cap(framing)], ["Structure / MECE", cap(structure)],
    ["Analysis & math", cap(analysis)], ["Insight", cap(insight)],
    ["Feasibility", cap(feas)], ["Storytelling", cap(story)]
  ];
  const v = Object.fromEntries(dims);
  const total = cap(dims.reduce((s,d) => s+d[1], 0) / dims.length);
  const skills = {
    struct: cap((v["Problem framing"]+v["Structure / MECE"])/2),
    math: v["Analysis & math"], data: v["Analysis & math"], insight: v["Insight"],
    story: v["Storytelling"], fin: v["Feasibility"]
  };

  /* lỗi rút ra từ bài làm → Mistake Review */
  const M = spec.mistakes, src = "Case · " + spec.title, mistakes = [];
  if(opt && a.rec !== spec.correct){
    const right = spec.options.find(o => o[0] === spec.correct);
    mistakes.push({kind:"logic", ref:spec.id, src, bad:`Chọn khuyến nghị ${opt[0]}: ${opt[1]}`,
      good:`${right[0]}: ${right[1]}`, why:opt[2], lesson:[M.logicLesson,""]});
  }
  if(ev.trim() && !gotCore){
    const found = (ev.match(new RegExp(`-?\\d+(?:[.,]\\d+)*\\s*(?:${spec.unit})`, "g")) || []).slice(0,3);
    mistakes.push({kind:"calculation", ref:spec.id, src,
      bad: found.length ? `Thiếu ${M.calc.label}. Con số bạn đưa ra: ${found.join(" · ")}`
                        : `Không lượng hoá được ${M.calc.label}`,
      good:M.calc.good, why:M.calc.why, lesson:[M.calc.lesson,""]});
  }
  if(hyps.length && v["Structure / MECE"] < 60){
    mistakes.push({kind:"framework", ref:spec.id, src, bad:`Cây giả thuyết: ${hyps.join(" / ")}`,
      good:M.framework.good, why:M.framework.why, lesson:[M.framework.lesson,""]});
  }
  if(ev.trim() && v["Insight"] < 40){
    mistakes.push({kind:"exhibit", ref:spec.id, src, bad:M.exhibit.bad,
      good:M.exhibit.good, why:M.exhibit.why, lesson:[M.exhibit.lesson,""]});
  }

  const weakest = dims.slice().sort((x,y) => x[1]-y[1])[0];
  const fb = Object.assign({}, FEEDBACK, spec.feedback||{});
  const feedback = total >= 90
    ? (spec.goodFeedback || "Bài làm chặt: lượng hoá được con số then chốt, loại trừ giả thuyết bằng bằng chứng và khuyến nghị đánh đúng nguyên nhân gốc.")
    : `Điểm yếu nhất là ${weakest[0]} (${weakest[1]}). ${fb[weakest[0]]}`;

  return {dims, total, skills, mistakes, feedback};
}

const SCORING = { norm, parseNum, mentionsNumber, cases:{},
  register(spec){ spec.score = ans => scoreWith(spec, ans); SCORING.cases[spec.id] = spec; return spec; } };
window.SCORING = SCORING;
})();
