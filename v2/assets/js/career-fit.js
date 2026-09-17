/* ════════ TRẮC NGHIỆM CHỌN NGHỀ ════════
   9 câu → so với hồ sơ 8 trục của 30 nghề → gợi ý 3 nghề hợp nhất kèm lý do và một điểm cần cân nhắc.
   Phần chấm (CAREER_FIT.score) không đụng DOM để test chạy được bằng node.
   Chuỗi viết dạng [vi, en]; bản en vào từ điển I18N. */
(function(){
const DICT = {};
const P = x => Array.isArray(x) ? (DICT[x[0]] = x[1], x[0]) : x;

/* ── 8 trục; mỗi mức 0/1/2 có một câu mô tả nghề ở mức đó ── */
const AXES = {
  quant:   {n:P(["Con số","Numbers"]),              lv:[["Ít phải làm việc sâu với số","Little deep work with numbers"],["Dùng số để ra quyết định","Numbers as a decision tool"],["Làm việc sâu với con số và mô hình","Deep work with numbers and models"]]},
  people:  {n:P(["Thuyết phục","Persuasion"]),       lv:[["Phân tích tự nói, ít phải thuyết phục","Analysis speaks for itself, little persuading"],["Thuyết phục bằng số liệu khi cần","Persuade with data when needed"],["Đàm phán, thuyết phục là việc hằng ngày","Negotiating and persuading every day"]]},
  field:   {n:P(["Hiện trường","Field work"]),       lv:[["Chủ yếu ở văn phòng","Mostly office-based"],["Nửa văn phòng, nửa hiện trường","Half office, half field"],["Chủ yếu ở xưởng, kho, cửa hàng","Mostly on the floor, in warehouses or stores"]]},
  variety: {n:P(["Đa dạng","Variety"]),              lv:[["Đi sâu một mảng lâu dài","Deep in one area for years"],["Vài bài toán lớn mỗi năm","A few big problems a year"],["Bài toán mới liên tục","A new problem all the time"]]},
  pressure:{n:P(["Áp lực","Pressure"]),              lv:[["Giờ giấc tương đối ổn định","Fairly predictable hours"],["Bận theo mùa cao điểm","Busy in peak seasons"],["Giờ dài, nhịp nhanh","Long hours, fast pace"]]},
  customer:{n:P(["Khách hàng","Customers"]),         lv:[["Ít tiếp xúc người dùng cuối","Little contact with end users"],["Hiểu khách hàng ở mức cần thiết","Understand customers as needed"],["Xoay quanh người dùng và thị trường","Revolves around users and the market"]]},
  mission: {n:P(["Tác động xã hội","Social impact"]),lv:[["Thước đo chính là giá trị kinh doanh","Business value is the main yardstick"],["Kết hợp kinh doanh và tác động rộng hơn","Business plus wider impact"],["Tác động xã hội, môi trường, con người","Social, environmental and people impact"]]},
  own:     {n:P(["Tự chủ","Ownership"]),             lv:[["Lộ trình rõ, thăng tiến theo nấc","Clear ladder, step-by-step promotion"],["Có không gian thử cái mới","Room to try new things"],["Tự quyết và tự chịu rủi ro","Your call, your risk"]]}
};
Object.values(AXES).forEach(a => a.lv = a.lv.map(P));

/* ── hồ sơ nghề: quant people field variety pressure customer mission own ── */
const KEYS = ["quant","people","field","variety","pressure","customer","mission","own"];
const RAW = {
  consulting:"21022000", strategy:"21011000", opsconsult:"21222000", techconsult:"11111100", bizdev:"12111101",
  ib:"21012000",         pe:"21012101",       fpna:"20001000",       equity:"21001001",      risk:"20000000",
  marketing:"11011200",  brand:"11111200",    growth:"20021201",     trade:"12211100",       crm:"20001200",
  product:"11011201",    pmm:"11011200",      dataanalytics:"20010100", bizops:"21122101",   ba:"21010100",
  supplychain:"21111000",procurement:"22101000", logistics:"11211100", manufacturing:"11201000", retailops:"12212200",
  hrstrategy:"12011120", esg:"11111020",      publicsector:"11110020", founder:"12122212",   entrepinres:"12021201"
};
const PROFILE = Object.fromEntries(Object.entries(RAW).map(([id,s]) => [id, Object.fromEntries(KEYS.map((k,i)=>[k,+s[i]]))]));

/* ── câu hỏi: mỗi lựa chọn đặt giá trị mong muốn trên 1–2 trục; câu "domain" cộng điểm theo nhóm nghề ── */
const QUESTIONS = [
  {id:"domain", q:["Nhóm việc nào bạn tò mò nhất lúc này?","Which kind of work are you most curious about right now?"], opts:[
    {t:["Giải bài toán cho doanh nghiệp, tư vấn","Solving business problems, advising"], cat:"consult"},
    {t:["Tiền, định giá, đầu tư","Money, valuation, investing"], cat:"finance"},
    {t:["Thương hiệu, khách hàng, tăng trưởng","Brands, customers, growth"], cat:"marketing"},
    {t:["Sản phẩm, dữ liệu, công nghệ","Products, data, technology"], cat:"product"},
    {t:["Nhà máy, kho, chuỗi cung ứng","Factories, warehouses, supply chains"], cat:"ops"},
    {t:["Con người, xã hội, tự khởi nghiệp","People, society, starting something"], cat:"impact"},
    {t:["Chưa biết — gợi ý giúp tôi","Not sure — suggest for me"]}]},
  {id:"afternoon", q:["Một buổi chiều làm việc lý tưởng, bạn đang…","On an ideal working afternoon, you are…"], opts:[
    {t:["Dựng mô hình và tìm con số làm đổi kết luận","Building a model to find the number that changes the answer"], v:{quant:2, people:0}},
    {t:["Ngồi với đối tác, thuyết phục họ đồng ý","Sitting with a partner, getting them to agree"], v:{people:2}},
    {t:["Đi xưởng, kho hay cửa hàng xem mọi thứ chạy","Walking a plant, warehouse or store to see how it runs"], v:{field:2}},
    {t:["Nói chuyện với người dùng, nghĩ cách làm họ hài lòng hơn","Talking to users and working out how to delight them"], v:{customer:2}}]},
  {id:"rhythm", q:["Nhịp công việc bạn muốn?","What work rhythm do you want?"], opts:[
    {t:["Bài toán mới mỗi vài tuần","A new problem every few weeks"], v:{variety:2}},
    {t:["Vài dự án lớn mỗi năm, đi sâu từng cái","A few big projects a year, each in depth"], v:{variety:1}},
    {t:["Một mảng lâu dài để thành chuyên gia","One area for the long run, to become an expert"], v:{variety:0}}]},
  {id:"hours", q:["Với giờ làm và áp lực, bạn…","On hours and pressure, you…"], opts:[
    {t:["Chịu được 60–80 giờ/tuần nếu học được nhanh","Can take 60–80 hours a week if you learn fast"], v:{pressure:2}},
    {t:["Ổn với bận rộn theo mùa cao điểm","Are fine with busy peak seasons"], v:{pressure:1}},
    {t:["Cần giờ giấc ổn định để cân bằng cuộc sống","Need steady hours for life balance"], v:{pressure:0}}]},
  {id:"numbers", q:["Con số với bạn là…","To you, numbers are…"], opts:[
    {t:["Niềm vui — càng chi tiết càng thích","A joy — the more detail the better"], v:{quant:2}},
    {t:["Công cụ để ra quyết định, đủ dùng là được","A decision tool — enough is enough"], v:{quant:1}},
    {t:["Việc nên có người khác lo","Something someone else should handle"], v:{quant:0}}]},
  {id:"persuade", q:["Khi phải thuyết phục người khác đồng ý với mình…","When you need to win someone over…"], opts:[
    {t:["Tôi hào hứng — đàm phán là phần hay nhất","I'm energised — negotiating is the best part"], v:{people:2}},
    {t:["Tôi làm được nếu có số liệu vững trong tay","I can, with solid data in hand"], v:{people:1}},
    {t:["Tôi thích để kết quả phân tích tự nói","I'd rather let the analysis speak"], v:{people:0}}]},
  {id:"impact", q:["Bạn muốn công việc tạo ra điều gì?","What do you want your work to create?"], opts:[
    {t:["Lợi nhuận và giá trị doanh nghiệp đo được","Measurable profit and company value"], v:{mission:0}},
    {t:["Sản phẩm, thương hiệu nhiều người dùng mỗi ngày","Products or brands many people use daily"], v:{customer:2, mission:0}},
    {t:["Tác động tốt cho xã hội, môi trường, con người","Good outcomes for society, environment, people"], v:{mission:2}},
    {t:["Một thứ của riêng mình","Something of my own"], v:{own:2}}]},
  {id:"place", q:["Bạn muốn làm việc chủ yếu ở đâu?","Where do you want to spend most of your time?"], opts:[
    {t:["Văn phòng, màn hình, tài liệu","Office, screens, documents"], v:{field:0}},
    {t:["Nửa văn phòng, nửa đi thực tế","Half office, half out in the field"], v:{field:1}},
    {t:["Hiện trường, gần người làm trực tiếp","On site, close to frontline teams"], v:{field:2}}]},
  {id:"risk", q:["Về rủi ro nghề nghiệp, bạn chọn…","On career risk, you choose…"], opts:[
    {t:["Lộ trình rõ ràng, thăng tiến theo nấc","A clear path, promoted step by step"], v:{own:0}},
    {t:["Tổ chức vững nhưng có chỗ thử cái mới","A stable organisation with room to experiment"], v:{own:1}},
    {t:["Chấp nhận bấp bênh để tự quyết mọi thứ","Uncertainty in exchange for making every call"], v:{own:2}}]}
];
QUESTIONS.forEach(q => { q.q = P(q.q); q.opts.forEach(o => o.t = P(o.t)); });

const CAT_WEIGHT = 0.15;
const SAME_CAT = P(["Đúng nhóm việc bạn tò mò nhất","Matches the kind of work you're most curious about"]);

/* answers: {questionId: optionIndex} → [{id, pct, why:[text], watch:text|null}] đã sắp giảm dần */
function score(answers){
  const want = {}, cnt = {};
  let cat = null;
  QUESTIONS.forEach(q => {
    const o = q.opts[answers[q.id]]; if(!o) return;
    if(o.cat) cat = o.cat;
    Object.entries(o.v||{}).forEach(([k,v]) => { want[k] = (want[k]||0) + v; cnt[k] = (cnt[k]||0) + 1; });
  });
  Object.keys(want).forEach(k => want[k] /= cnt[k]);
  const axes = Object.keys(want);
  const careers = (window.CAREERS||[]).filter(c => PROFILE[c.id]);
  return careers.map((c, order) => {
    const p = PROFILE[c.id];
    const fit = {}; axes.forEach(k => fit[k] = 1 - Math.abs(want[k] - p[k]) / 2);
    const wsum = axes.reduce((a,k)=>a+cnt[k],0);
    let s = wsum ? axes.reduce((a,k)=>a+fit[k]*cnt[k],0) / wsum : 0;
    if(cat) s = s*(1-CAT_WEIGHT) + (c.cat===cat ? CAT_WEIGHT : 0);
    const best = axes.filter(k=>fit[k]>=0.75).sort((a,b)=>fit[b]-fit[a] || cnt[b]-cnt[a]).slice(0,3);
    const worst = axes.filter(k=>fit[k]<=0.5).sort((a,b)=>fit[a]-fit[b])[0];
    const why = best.map(k => AXES[k].lv[p[k]]);
    if(cat && c.cat===cat) why.unshift(SAME_CAT);
    return {id:c.id, pct:Math.round(s*100), why:why.slice(0,3), watch: worst ? AXES[worst].lv[p[worst]] : null, order};
  }).sort((a,b)=> b.pct-a.pct || a.order-b.order);
}

window.CAREER_FIT = {QUESTIONS, AXES, PROFILE, score};

/* ════════ giao diện ════════ */
const UI = {step:null};
const answered = () => (window.State && State.data.careerQuiz && State.data.careerQuiz.answers) || {};
const doneAll = a => QUESTIONS.every(q => a[q.id] != null);

function vFit(){
  const a = answered();
  const firstOpen = QUESTIONS.findIndex(q=>a[q.id]==null);
  if(UI.step==null) UI.step = firstOpen<0 ? QUESTIONS.length : firstOpen;
  if(UI.step >= QUESTIONS.length && firstOpen>=0) UI.step = firstOpen;   // câu trả lời bị xoá ở nơi khác
  return UI.step >= QUESTIONS.length ? fitResult(a) : fitQuestion(a, Math.max(0, UI.step));
}

function fitQuestion(a, i){
  const q = QUESTIONS[i], pct = Math.round(100*i/QUESTIONS.length);
  return `<div class="main" style="max-width:760px">
  <div class="lbl">Trắc nghiệm chọn nghề</div>
  <h1 style="margin-top:2px">Nghề nào hợp với bạn?</h1>
  <p class="muted" style="margin-top:4px">Không có đáp án đúng sai. Chọn điều gần với bạn nhất, không phải điều nghe hay nhất.</p>
  <div class="row mt" style="gap:12px"><div style="flex:1">${bar(pct)}</div>
    <span class="small muted num">${i+1}/${QUESTIONS.length}</span></div>
  <div class="card mt"><div class="card-b">
    <h3 style="margin:0 0 14px;line-height:1.4">${esc(q.q)}</h3>
    <div style="display:grid;gap:8px">
      ${q.opts.map((o,k)=>`<button class="btn" style="justify-content:flex-start;text-align:left;height:auto;padding:12px 14px;white-space:normal;${a[q.id]===k?"border-color:var(--primary);box-shadow:0 0 0 1px var(--primary)":""}"
        onclick="FIT.pick('${q.id}',${k})">${esc(o.t)}</button>`).join("")}
    </div>
  </div>
  <div class="card-f row" style="justify-content:space-between">
    ${i>0?`<button class="btn btn-sm btn-gh" onclick="FIT.go(${i-1})">← Câu trước</button>`:`<a class="btn btn-sm btn-gh" href="#/career">← Career Path</a>`}
    ${doneAll(a)?`<button class="btn btn-sm" onclick="FIT.go(${QUESTIONS.length})">Xem kết quả →</button>`:""}
  </div></div>
  </div>`;
}

function fitResult(a){
  const top = score(a).slice(0,3), mine = State.data.career;
  return `<div class="main">
  <div class="row" style="justify-content:space-between;flex-wrap:wrap;gap:12px;align-items:flex-end">
    <div><div class="lbl">Trắc nghiệm chọn nghề</div><h1 style="margin-top:2px">Ba nghề hợp với bạn nhất</h1>
      <p class="muted" style="margin-top:4px;max-width:72ch">Mức hợp tính từ 9 câu trả lời, so với hồ sơ công việc thật của từng nghề. Đây là điểm bắt đầu để tìm hiểu, không phải kết luận — đọc kỹ phần "cân nhắc" trước khi chọn.</p></div>
    <div class="row"><button class="btn" onclick="FIT.restart()">Làm lại</button><a class="btn btn-p" href="#/compare/${top.map(r=>r.id).join(",")}">So sánh 3 nghề này</a><a class="btn" href="#/career">Xem cả 30 nghề</a></div>
  </div>
  <div class="grid g3 mt">
    ${top.map((r,i)=>{ const c = window.CAREER_BY_ID[r.id], on = mine===c.id;
      return `<div class="card" style="${i===0?"border-color:var(--primary);box-shadow:0 0 0 1px var(--primary)":""}">
      <div class="card-b">
        <div class="row" style="gap:11px">
          <span class="tile tile-lg t-${c.color}">${c.icon}</span>
          <div style="flex:1"><h3>${esc(c.n)}</h3><div class="small muted">${esc(c.vi)}</div></div>
          <div style="text-align:right"><div class="num" style="font-size:22px;font-weight:700">${r.pct}%</div><div class="small muted">mức hợp</div></div>
        </div>
        <p class="small" style="margin:12px 0">${esc(c.intro)}</p>
        <div class="lbl mb">Vì sao hợp</div>
        <ul style="margin:0 0 10px;padding-left:18px">${r.why.map(w=>`<li class="small" style="margin-bottom:4px">${esc(w)}</li>`).join("")}</ul>
        ${r.watch?`<div class="callout warn" style="margin:0"><b>Cân nhắc</b><div class="small">${esc(r.watch)}</div></div>`:""}
      </div>
      <div class="card-f row" style="justify-content:space-between;gap:8px;flex-wrap:wrap">
        <a class="btn btn-sm" href="#/career/${c.id}">Xem chi tiết</a>
        <div class="row" style="gap:8px">
          ${c.cases?`<a class="btn btn-sm btn-gh" href="#/drill/${c.id}">Thử 3 câu case</a>`:""}
          <button class="btn btn-sm ${on?"":"btn-p"}" onclick="FIT.choose('${c.id}')">${on?"Đang theo":"Chọn lộ trình"}</button>
        </div>
      </div></div>`; }).join("")}
  </div>
  </div>`;
}

window.vFit = vFit;
window.FIT = {
  pick(qid, k){
    State.answerCareerQuiz(qid, k);
    const i = QUESTIONS.findIndex(q=>q.id===qid);
    UI.step = i + 1; render(); window.scrollTo(0,0);
  },
  go(i){ UI.step = i; render(); window.scrollTo(0,0); },
  restart(){ State.clearCareerQuiz(); UI.step = 0; render(); window.scrollTo(0,0); },
  choose(id){
    if(State.data.career===id){ location.hash = "#/career/"+id; return; }
    State.setCareer(id); toast("Đã chọn lộ trình — thứ tự bài học được sắp lại"); render(true);
  }
};

DICT["Trắc nghiệm chọn nghề"] = "Career fit quiz";
DICT["Nghề nào hợp với bạn?"] = "Which career fits you?";
DICT["Không có đáp án đúng sai. Chọn điều gần với bạn nhất, không phải điều nghe hay nhất."] = "There are no right answers. Pick what is closest to you, not what sounds best.";
DICT["← Câu trước"] = "← Previous";
DICT["← Career Path"] = "← Career Path";
DICT["Xem kết quả →"] = "See results →";
DICT["Ba nghề hợp với bạn nhất"] = "Your three best-fit careers";
DICT["Mức hợp tính từ 9 câu trả lời, so với hồ sơ công việc thật của từng nghề. Đây là điểm bắt đầu để tìm hiểu, không phải kết luận — đọc kỹ phần \"cân nhắc\" trước khi chọn."] =
  "Fit is computed from your 9 answers against each career's real work profile. It is a starting point to explore, not a verdict — read the \"think about\" note before choosing.";
DICT["Làm lại"] = "Retake";
DICT["Xem cả 30 nghề"] = "See all 30 careers";
DICT["mức hợp"] = "fit";
DICT["Vì sao hợp"] = "Why it fits";
DICT["Cân nhắc"] = "Think about";
DICT["Xem chi tiết"] = "View details";
DICT["Thử 3 câu case"] = "Try 3 case questions";
DICT["Đang theo"] = "Following";
DICT["Chưa biết chọn nghề nào?"] = "Not sure which career to pick?";
DICT["Trả lời 9 câu trong khoảng 2 phút để thấy 3 nghề hợp với bạn nhất và lý do."] = "Answer 9 questions in about 2 minutes to see your three best-fit careers and why.";
DICT["Làm trắc nghiệm →"] = "Take the quiz →";
DICT["Xem lại kết quả trắc nghiệm →"] = "See your quiz results →";
if(window.I18N) I18N.add(DICT);
})();
