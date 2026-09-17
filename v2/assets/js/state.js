/* ═══ CASELAB · State store ═══
   Một nguồn sự thật cho tiến độ người học, lưu ở localStorage("caselab.v2").
   Mọi view đọc qua State.*, mọi thay đổi đi qua các hàm ghi ở đây rồi save().
   Hình dạng dữ liệu khớp mục 4.3 của KIEN-TRUC-SAN-PHAM.md. */
(function(){
const KEY = "caselab.v2";

const LEVELS = [
  [0,"Intern"],[200,"Analyst"],[500,"Associate"],[1000,"Case Challenger"],
  [1800,"Consultant"],[3000,"Senior Consultant"],[4500,"Manager"],[6500,"Partner"]
];
const XP = { lesson:50, quizFirstTry:10, review:15, drillHit:10, drillNear:5 };
const REVIEW_GAPS = [1,3,7];           // ngày giãn cách giữa các lần ôn
const MIST_KIND = {
  framework:"Lỗi framework", calculation:"Lỗi tính toán", logic:"Lỗi lập luận",
  exhibit:"Đọc sai exhibit", presentation:"Lỗi trình bày"
};

/* ── ngày: dùng giờ địa phương, định dạng YYYY-MM-DD ── */
let todayOverride = null;
const pad = n => String(n).padStart(2,"0");
const fmt = d => `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
const today = () => todayOverride || fmt(new Date());
const addDays = (iso,n) => { const [y,m,d]=iso.split("-").map(Number); return fmt(new Date(y,m-1,d+n)); };
const daysBetween = (a,b) => { const p=s=>{const [y,m,d]=s.split("-").map(Number);return Date.UTC(y,m-1,d)}; return Math.round((p(b)-p(a))/864e5); };

function blank(){
  return { v:2, user:{name:"Học viên", created:today()}, lessons:{}, cases:{},
           mistakes:[], activity:{}, career:null, seq:0, tick:0,
           readerPrefs:{ fontSize:100, theme:"light", bookmarks:[] },
           notes:{}, dailyChallenge:{}, drills:{}, careerQuiz:null };
}

let S = load();

function load(){
  try{
    const raw = localStorage.getItem(KEY);
    if(!raw) return blank();
    const d = JSON.parse(raw);
    if(!d || d.v!==2) return blank();
    return Object.assign(blank(), d);
  }catch(e){ return blank(); }
}
function save(){ try{ localStorage.setItem(KEY, JSON.stringify(S)); }catch(e){} }

/* ── reader preferences & notes ── */
function getReaderPrefs(){
  if(!S.readerPrefs) S.readerPrefs = { fontSize:100, theme:"light", bookmarks:[] };
  return S.readerPrefs;
}
function setReaderFontSize(delta){
  const p = getReaderPrefs();
  let sz = (p.fontSize || 100) + delta;
  sz = Math.max(85, Math.min(150, sz));
  p.fontSize = sz;
  save();
  return sz;
}
function setReaderTheme(theme){
  const p = getReaderPrefs();
  p.theme = theme;
  save();
  return theme;
}
function isBookmarked(lessonId){
  const p = getReaderPrefs();
  return Array.isArray(p.bookmarks) && p.bookmarks.includes(lessonId);
}
function toggleBookmark(lessonId){
  const p = getReaderPrefs();
  if(!Array.isArray(p.bookmarks)) p.bookmarks = [];
  const idx = p.bookmarks.indexOf(lessonId);
  if(idx>=0) p.bookmarks.splice(idx,1);
  else p.bookmarks.push(lessonId);
  save();
  return isBookmarked(lessonId);
}
function getLessonNote(lessonId){
  if(!S.notes) S.notes = {};
  return S.notes[lessonId] || "";
}
function setLessonNote(lessonId, text){
  if(!S.notes) S.notes = {};
  S.notes[lessonId] = String(text||"");
  save();
}

/* ── daily challenge widget ── */
const DAILY_CHALLENGES = [
  {
    id: "dc-0",
    tag: "TÍNH NHANH",
    q: "Thu nhập 25 triệu một tháng, đang trả nợ vay 11 triệu. Tỷ lệ nợ trên thu nhập sau khi vay thêm rơi vào vùng nào?",
    opts: [
      ["A", "64%, vượt xa ngưỡng an toàn thường được khuyến nghị là dưới 40% thu nhập", "Tổng nghĩa vụ nợ 16 triệu / 25 triệu = 64%, vượt quá ngưỡng an toàn tài chính cá nhân."],
      ["B", "44%, chỉ tính khoản vay cũ nên khoản trả góp mới chưa được cộng vào mẫu", "Chưa cộng thêm khoản nghĩa vụ nợ mới."],
      ["C", "20%, chỉ tính khoản trả góp mới vì đó là phần nghĩa vụ vừa phát sinh thêm", "Chỉ tính khoản nợ mới mà bỏ quên khoản nợ cũ đang trả."],
      ["D", "16 triệu, lấy tổng số tiền phải trả mỗi tháng thay cho một tỷ lệ phần trăm", "Số tuyệt đối chứ không phải tỷ lệ phần trăm (DTI)."]
    ],
    correct: "A"
  },
  {
    id: "dc-1",
    tag: "TÍNH NHANH",
    q: "Doanh thu 50 tỷ, Biên gộp (Gross Margin) 40%, Chi phí vận hành (OPEX) 12 tỷ. Biên lợi nhuận hoạt động (Operating Margin) là bao nhiêu?",
    opts: [
      ["A", "16%", "Lợi nhuận HĐ = 50 × 40% − 12 = 8 tỷ → Biên HĐ = 8 / 50 = 16%."],
      ["B", "24%", "Sai do quên trừ OPEX hoặc tính nhầm."],
      ["C", "8%", "Sai do lấy 8 tỷ chia cho 100 tỷ."],
      ["D", "30%", "Sai công thức."]
    ],
    correct: "A"
  },
  {
    id: "dc-2",
    tag: "FRAMEWORK",
    q: "Khi phân tích nguyên nhân sụt giảm doanh thu của một chuỗi bán lẻ, cách chia nào sau đây đảm bảo tính MECE nhất?",
    opts: [
      ["A", "Doanh thu = Lượng khách × Giá trị đơn hàng trung bình (AOV)", "Phân rã chuẩn MECE theo hành vi mua hàng."],
      ["B", "Doanh thu = Khách mới + Khách cũ", "Dễ trùng lặp định nghĩa hoặc bỏ sót giá trị mua."],
      ["C", "Doanh thu = Online + Offline + Khuyến mãi", "Khuyến mãi không phải kênh bán hàng độc lập."],
      ["D", "Doanh thu = Sản phẩm chính + Marketing", "Không cùng một chiều phân loại."]
    ],
    correct: "A"
  },
  {
    id: "dc-3",
    tag: "MARKET SIZING",
    q: "Thị trường cà phê mang đi tại TP.HCM: 9 triệu dân, 30% uống cà phê mỗi ngày, giá bình quân 30.000đ/ly. Quy mô thị trường 1 ngày xấp xỉ?",
    opts: [
      ["A", "81 tỷ đồng", "9 triệu × 30% = 2.7 triệu ly × 30.000đ = 81 tỷ/ngày."],
      ["B", "27 tỷ đồng", "Tính thiếu nhân với đơn giá 30k."],
      ["C", "150 tỷ đồng", "Ước lượng sai tỷ lệ dân số."],
      ["D", "54 tỷ đồng", "Tính nhầm số lượng ly."]
    ],
    correct: "A"
  }
];

function getDailyChallenge(){
  const todayKey = today();
  const dayHash = Math.abs(todayKey.split("").reduce((a,c)=>(a<<5)-a+c.charCodeAt(0),0));
  const ch = DAILY_CHALLENGES[dayHash % DAILY_CHALLENGES.length];
  if(!S.dailyChallenge) S.dailyChallenge = {};
  const rec = S.dailyChallenge[todayKey] || null;
  return { challenge: ch, state: rec };
}
function answerDailyChallenge(pickedKey){
  const todayKey = today();
  const { challenge } = getDailyChallenge();
  if(!S.dailyChallenge) S.dailyChallenge = {};
  if(S.dailyChallenge[todayKey]) return S.dailyChallenge[todayKey];
  const correct = pickedKey === challenge.correct;
  const rec = { picked: pickedKey, correct, at: todayKey };
  S.dailyChallenge[todayKey] = rec;
  if(correct) gainXP(15, "high");
  save();
  return rec;
}

/* ── nhật ký hoạt động theo ngày: nền cho XP tuần, streak, nhiệm vụ ── */
function day(iso){
  const k = iso || today();
  return S.activity[k] || (S.activity[k] = {xp:0, lessons:0, cases:0, high:0, reviews:0});
}
function gainXP(n, field){
  const d = day(); d.xp += n; if(field) d[field] += 1;
}

/* ════════ ĐỌC ════════ */
const xpTotal = () => Object.values(S.activity).reduce((a,d)=>a+d.xp,0);
const xpWeek  = () => { let s=0; for(let i=0;i<7;i++){ const d=S.activity[addDays(today(),-i)]; if(d) s+=d.xp; } return s; };
const xpPrevWeek = () => { let s=0; for(let i=7;i<14;i++){ const d=S.activity[addDays(today(),-i)]; if(d) s+=d.xp; } return s; };

function level(){
  const x = xpTotal(); let i = 0;
  while(i+1<LEVELS.length && x>=LEVELS[i+1][0]) i++;
  const next = LEVELS[i+1];
  return { lv:i+1, title:LEVELS[i][1], xp:x, floor:LEVELS[i][0],
           next: next?next[0]:null, nextTitle: next?next[1]:null };
}

const active = iso => (S.activity[iso]||{}).xp > 0;
function streak(){
  let d = today();
  if(!active(d)) d = addDays(d,-1);        // hôm nay chưa học vẫn giữ chuỗi tới hết ngày
  let n = 0; while(active(d)){ n++; d = addDays(d,-1); }
  return n;
}
function bestStreak(){
  const keys = Object.keys(S.activity).filter(active).sort();
  let best=0, run=0, prev=null;
  keys.forEach(k=>{ run = prev && daysBetween(prev,k)===1 ? run+1 : 1; best=Math.max(best,run); prev=k; });
  return best;
}
/* 7 ô: thứ Hai → Chủ nhật của tuần hiện tại */
function weekStrip(){
  const [y,m,d] = today().split("-").map(Number);
  const dow = (new Date(y,m-1,d).getDay()+6)%7;     // 0 = thứ Hai
  const mon = addDays(today(),-dow);
  return ["T2","T3","T4","T5","T6","T7","CN"].map((lb,i)=>{
    const iso = addDays(mon,i); return {lb, on:active(iso), today:iso===today(), future:iso>today()};
  });
}

const lessonStatus = id => (S.lessons[id]||{}).status || "not_started";
const lessonRec = id => S.lessons[id] || {};

function trackStats(trackId){
  const ls = window.LESSONS.filter(l=>l.track===trackId);
  const done = ls.filter(l=>lessonStatus(l.id)==="done").length;
  /* ready = bài đã có nội dung. Tiến độ nghề đo theo ready, nếu không sẽ không bao giờ tới 100%
     khi giáo trình còn bài đang soạn (cờ soon). */
  const ready = ls.filter(l=>!l.soon).length;
  return { done, total:ls.length, ready, soon: ls.length-ready,
           pct: ls.length?Math.round(done/ls.length*100):0,
           readyPct: ready?Math.round(done/ready*100):0 };
}
function moduleStats(moduleId){
  const ls = window.MODULE_BY_ID[moduleId].lessons;
  return { done: ls.filter(l=>lessonStatus(l.id)==="done").length, total: ls.length };
}
function overall(){
  const done = window.LESSONS.filter(l=>lessonStatus(l.id)==="done").length;
  return { done, total: window.LESSONS.length };
}

/* Bài nên học tiếp: bài đang dở → bài chưa học đầu tiên theo thứ tự track của nghề đã chọn → toàn bộ */
function nextLesson(){
  const inProg = Object.entries(S.lessons)
    .filter(([id,r])=>r.status==="in_progress" && window.LESSON_BY_ID[id])
    .sort((a,b)=>(b[1].tick||0)-(a[1].tick||0));   // bộ đếm, không dùng timestamp: hai lần chạm cùng mili-giây vẫn phân định được
  if(inProg.length) return window.LESSON_BY_ID[inProg[0][0]];
  const order = careerTrackOrder();
  for(const t of order){
    const l = window.LESSONS.find(x=>x.track===t && !x.soon && lessonStatus(x.id)!=="done");
    if(l) return l;
  }
  return null;
}
function careerTrackOrder(){
  const all = window.TRACKS.map(t=>t.id);
  const c = S.career && window.CAREER_BY_ID[S.career];
  return c ? c.tracks.concat(all.filter(t=>!c.tracks.includes(t))) : all;
}
function nextLessonAfter(id){
  const i = window.LESSONS.findIndex(l=>l.id===id);
  if(i<0) return null;
  const track = window.LESSONS[i].track;
  /* bỏ qua bài đang biên soạn: chỉ dẫn người học tới bài đã có nội dung */
  const l = window.LESSONS.slice(i+1).find(x=>x.track===track && !x.soon);
  return l || null;
}

const caseRec = id => S.cases[id] || null;
function casesSolved(){ return Object.values(S.cases).filter(r=>r.attempts>0); }
function avgScore(){
  const s = casesSolved(); return s.length ? Math.round(s.reduce((a,r)=>a+r.best,0)/s.length) : 0;
}

const openMistakes = () => S.mistakes.filter(m=>!m.resolved);
function mistakesByKind(){
  const o = {}; Object.keys(MIST_KIND).forEach(k=>o[k]=0);
  openMistakes().forEach(m=>o[m.kind]=(o[m.kind]||0)+1);
  return o;
}
function reviewQueue(){
  return openMistakes().slice().sort((a,b)=>a.due.localeCompare(b.due));
}
const dueToday = () => openMistakes().filter(m=>m.due<=today()).length;

function missions(){
  const d = S.activity[today()] || {};
  return [
    {t:"Hoàn thành 1 bài học",         done:(d.lessons||0)>=1},
    {t:"Giải 1 case trong Arena",       done:(d.cases||0)>=1},
    {t:"Đạt 80+ ở một case",            done:(d.high||0)>=1},
    {t:"Ôn và sửa 1 lỗi cũ",            done:(d.reviews||0)>=1}
  ];
}

function careerProgress(careerId){
  const c = window.CAREER_BY_ID[careerId];
  let done = 0;
  for(let i=0;i<c.steps.length;i++){
    const t = c.tracks[i];
    const ok = t ? (trackStats(t).ready>0 && trackStats(t).readyPct>=100)
                 : casesSolved().some(r=>(window.CASE_BY_ID[r.id]||{}).mode==="interview");
    if(!ok) break; done++;
  }
  return done;
}

/* ════════ GHI ════════ */
function touchLesson(id){
  const r = S.lessons[id] || (S.lessons[id] = {status:"not_started", quiz:{}, chk:[]});
  if(r.status==="not_started"){ r.status="in_progress"; }
  r.updated = new Date().toISOString(); r.tick = ++S.tick;
  save(); return r;
}
function answerQuiz(lessonId, qid, correct){
  const r = touchLesson(lessonId);
  if(r.quiz[qid]) return r.quiz[qid];             // chỉ tính lần trả lời đầu
  r.quiz[qid] = {correct, at:today()};
  if(correct) gainXP(XP.quizFirstTry);
  save(); return r.quiz[qid];
}
function toggleCheck(lessonId, i){
  const r = touchLesson(lessonId);
  r.chk[i] = !r.chk[i]; save();
}
/* Tiến độ đọc bài đọc: chỉ tăng, không giảm khi cuộn ngược */
function setReadPct(id, pct){
  const r = S.lessons[id] || (S.lessons[id] = {status:"not_started", quiz:{}, chk:[]});
  const v = Math.max(0, Math.min(100, Math.round(pct)));
  if((r.readPct||0) >= v) return r.readPct||0;
  r.readPct = v; if(r.status==="not_started") r.status="in_progress";
  save(); return v;
}
const readPct = id => (S.lessons[id]||{}).readPct || 0;
function completeLesson(id){
  const r = touchLesson(id);
  if(r.status==="done") return false;
  r.status = "done"; r.doneAt = today();
  gainXP(XP.lesson, "lessons");
  save(); return true;
}

/* Lần nộp bài: XP = điểm lần đầu, lần sau chỉ thưởng phần vượt kỷ lục cũ */
function recordAttempt(caseId, {scores, total, answers, seconds}){
  const r = S.cases[caseId] || (S.cases[caseId] = {id:caseId, attempts:0, best:0, history:[]});
  const gain = r.attempts===0 ? total : Math.max(0, total-r.best);
  r.attempts += 1;
  r.last = {total, scores, at:today(), seconds};
  if(total>=r.best){ r.best = total; r.bestScores = scores; }
  r.history.push({total, at:today()});
  r.answers = answers; delete r.draft;
  const d = day(); d.xp += gain; d.cases += 1; if(total>=80) d.high += 1;
  save(); return {gain, best:r.best, attempts:r.attempts};
}
function saveDraft(caseId, answers){
  const r = S.cases[caseId] || (S.cases[caseId] = {id:caseId, attempts:0, best:0, history:[]});
  r.draft = answers; save();
}

/* Cùng chỗ sai (ref + kind) mà chưa sửa thì gộp lại và đếm số lần lặp */
function addMistake(m){
  const dup = S.mistakes.find(x=>!x.resolved && x.ref===m.ref && x.kind===m.kind);
  if(dup){ Object.assign(dup,{bad:m.bad, good:m.good, why:m.why}); dup.count+=1; dup.due=today(); save(); return dup; }
  const rec = Object.assign({id:"m"+(++S.seq), created:today(), due:addDays(today(),1),
                             step:0, count:1, resolved:false}, m);
  S.mistakes.unshift(rec); save(); return rec;
}
/* Ôn một lỗi: đi hết các mốc giãn cách thì coi như đã sửa xong */
function reviewMistake(id){
  const m = S.mistakes.find(x=>x.id===id); if(!m || m.resolved) return null;
  m.step += 1;
  if(m.step>=REVIEW_GAPS.length) { m.resolved = true; m.resolvedAt = today(); }
  else m.due = addDays(today(), REVIEW_GAPS[m.step]);
  gainXP(XP.review, "reviews"); save(); return m;
}
function resolveMistake(id){
  const m = S.mistakes.find(x=>x.id===id); if(!m || m.resolved) return null;
  m.resolved = true; m.resolvedAt = today();
  gainXP(XP.review, "reviews"); save(); return m;
}

/* ── Câu mở đầu theo nghề: viết nước đi đầu tiên → so gợi ý → tự chấm ──
   key = "<careerId>-<i>". XP chỉ tính ở lần chấm đầu tiên; "miss" ghi vào Mistake Review. */
const DRILL_VERDICTS = ["hit","near","miss"];
const drillRec = key => (S.drills||{})[key] || null;
function answerDrill(key, text){
  const t = String(text||"").trim(); if(!t) return null;
  if(!S.drills) S.drills = {};
  const r = S.drills[key] || (S.drills[key] = {attempts:0, rated:false, verdict:null, first:null});
  Object.assign(r, {answer:t.slice(0,2000), verdict:null, at:today()}); r.attempts += 1;
  save(); return r;
}
function rateDrill(key, verdict, mistake){
  const r = drillRec(key); if(!r || !r.answer || !DRILL_VERDICTS.includes(verdict)) return null;
  let gain = 0;
  if(!r.rated){ r.rated = true; r.first = verdict;
    gain = verdict==="hit" ? XP.drillHit : verdict==="near" ? XP.drillNear : 0;
    if(gain) gainXP(gain); }
  r.verdict = verdict;
  if(verdict==="miss" && mistake) addMistake(Object.assign({kind:"framework", ref:"drill-"+key}, mistake));
  save(); return {rec:r, gain};
}
function resetDrill(key){ const r = drillRec(key); if(!r) return; r.answer = null; r.verdict = null; save(); }
function drillStats(keys){
  const recs = keys.map(drillRec).filter(r=>r && r.verdict);
  const c = v => recs.filter(r=>r.verdict===v).length;
  return {done:recs.length, total:keys.length, hit:c("hit"), near:c("near"), miss:c("miss")};
}

/* ── Trắc nghiệm chọn nghề: chỉ lưu lựa chọn, điểm tính lại từ CAREER_FIT mỗi lần xem ── */
function answerCareerQuiz(qid, idx){
  if(typeof qid!=="string" || !Number.isInteger(idx) || idx<0) return null;
  if(!S.careerQuiz) S.careerQuiz = {answers:{}, at:null};
  S.careerQuiz.answers[qid] = idx; S.careerQuiz.at = today(); save(); return S.careerQuiz;
}
function clearCareerQuiz(){ S.careerQuiz = null; save(); }

function setCareer(id){ S.career = window.CAREER_BY_ID[id] ? id : null; save(); }
function setName(n){ S.user.name = String(n||"").trim().slice(0,40) || "Học viên"; save(); }

/* ── sao lưu ── */
const exportJSON = () => JSON.stringify(S, null, 2);
function importJSON(text){
  const d = JSON.parse(text);
  if(!d || d.v!==2 || typeof d.lessons!=="object" || !Array.isArray(d.mistakes))
    throw new Error("File không đúng định dạng CASELAB v2");
  S = Object.assign(blank(), d); save();
}
function reset(){ S = blank(); save(); }

/* ── dữ liệu mẫu: dựng lại đúng bức tranh của prototype để xem thử ── */
function seedDemo(){
  S = blank(); S.user.name = "Trí Bùi"; S.career = "consulting";
  const pct = {fundamentals:64, competition:20, consulting:41, marketing:9, supplychain:0, finance:30};
  const dates = [];   // 11 ngày trước, bỏ trống 1 ngày để chuỗi hiện tại là 6
  for(let i=13;i>=1;i--) if(i!==7 && i!==12 && i!==13) dates.push(addDays(today(),-i));
  let di = 0;
  window.TRACKS.forEach(t=>{
    const ls = window.LESSONS.filter(l=>l.track===t.id && !l.soon && l.id!=="f-profit-2");   // bài này để dạng đang học dở
    const n = Math.round((ls.length+(t.id==="fundamentals"?1:0))*pct[t.id]/100);
    ls.slice(0,n).forEach(l=>{
      const at = dates[di++ % dates.length];
      S.lessons[l.id] = {status:"done", quiz:{}, chk:[true,true,true,true,true], doneAt:at, updated:at};
      const d = S.activity[at] || (S.activity[at]={xp:0,lessons:0,cases:0,high:0,reviews:0});
      d.xp += XP.lesson; d.lessons += 1;
    });
  });
  S.lessons["f-profit-2"] = {status:"in_progress", quiz:{}, chk:[true,true,true], updated:new Date().toISOString(), tick:++S.tick};
  [["cl-01",82,{struct:85,math:80,data:80,insight:75,story:78,fin:85}],
   ["cl-02",74,{struct:78,math:70,data:72,insight:70,story:75,fin:78}],
   ["cl-06",91,{struct:92,math:94,data:90,insight:88,story:90,fin:90}]].forEach(([id,total,scores],i)=>{
    const at = dates[dates.length-1-i*2];
    S.cases[id] = {id, attempts:1, best:total, bestScores:scores, last:{total,scores,at}, history:[{total,at}]};
    const d = S.activity[at]; d.xp += total; d.cases += 1; if(total>=80) d.high += 1;
  });
  const M = [
    ["calculation","cl-01","Case · Chuỗi cà phê mất biên lợi nhuận",-3,
     "Thiếu hụt = (7,2 − 4,1) × 30 = 63 tỷ","(7,2 − 4,1) × 30 = 93 tỷ — 3,1 × 30 là 93, không phải 63",
     "Lỗi số học thuần. Khi nhân nhẩm dưới áp lực, tách 3,1 × 30 = 3 × 30 + 0,1 × 30.",["f-unit-1",""]],
    ["framework","iv-01","Interview · Profitability: nhà máy nhựa mất lợi nhuận",-3,
     "Cây lợi nhuận = giá × sản lượng − chi phí vận hành","Thiếu nhánh chi phí nguyên liệu đầu vào — hạt nhựa chiếm 60% giá vốn",
     "Ở doanh nghiệp sản xuất, nguyên liệu thường là khoản chi lớn nhất. Bỏ nhánh này là bỏ nguyên nhân chính.",["f-profit-1",""]],
    ["presentation","cc-01","Competition · Chiến lược 3 năm cho chuỗi F&B sau đại dịch",-5,
     "Headline slide 4: “Phân tích hai phương án tăng trưởng”","“Mở rộng qua nhượng quyền hoà vốn nhanh gấp đôi tự mở”",
     "Headline phải là kết luận, không phải nhãn nội dung. Người đọc lướt headline phải hiểu được toàn bộ lập luận.",["c-deck-1",""]],
    ["logic","cl-03","Case · Nâng take rate mà không mất người bán",-7,
     "Take rate thấp hơn đối thủ nên có thể tăng lên bằng đối thủ","So sánh chỉ đúng khi cơ cấu người bán giống nhau — người bán nhỏ nhạy giá hơn",
     "Benchmark không phải bằng chứng nhân quả. Luôn hỏi “hai bên có thực sự so sánh được không”.",["c-insight-1",""]],
    ["exhibit","cl-02","Case · Mở đường bay Việt Nam – Nhật Bản",-8,
     "Load factor 82% đọc thành 82 nghìn khách","Trục trái là %, trục phải mới là số khách — đọc nhầm trục",
     "Trước khi lấy số, đọc nhãn trục và đơn vị. Biểu đồ hai trục là bẫy phổ biến nhất trong case.",["i-chart-1",""]]
  ];
  M.forEach(([kind,ref,src,ago,bad,good,why,lesson])=>{
    S.mistakes.push({id:"m"+(++S.seq), kind, ref, src, bad, good, why, lesson,
      created:addDays(today(),ago), due:addDays(today(), ago>=-3?0:2), step:0, count:kind==="framework"?2:1, resolved:false});
  });
  save();
}

window.State = {
  get data(){ return S; }, save, KEY, LEVELS, XP, MIST_KIND, REVIEW_GAPS,
  today, addDays, _setToday(d){ todayOverride=d; }, _reload(){ S = load(); },
  xpTotal, xpWeek, xpPrevWeek, level, streak, bestStreak, weekStrip,
  lessonStatus, lessonRec, trackStats, moduleStats, overall, nextLesson, nextLessonAfter, careerTrackOrder,
  caseRec, casesSolved, avgScore, openMistakes, mistakesByKind, reviewQueue, dueToday, missions, careerProgress,
  touchLesson, answerQuiz, toggleCheck, completeLesson, recordAttempt, saveDraft, setReadPct, readPct,
  addMistake, reviewMistake, resolveMistake, setCareer, setName,
  drillRec, answerDrill, rateDrill, resetDrill, drillStats, answerCareerQuiz, clearCareerQuiz,
  getReaderPrefs, setReaderFontSize, setReaderTheme, isBookmarked, toggleBookmark,
  getLessonNote, setLessonNote, getDailyChallenge, answerDailyChallenge,
  exportJSON, importJSON, reset, seedDemo
};
})();
