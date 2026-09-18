/* ===== Tự học Business Case — player state ===== */
(function(){
const KEY = "tu-hoc-business-case.v1";
// Đổi tên từ "stratlab.v1": chép dữ liệu cũ sang một lần để người học không mất tiến độ.
try{ if(localStorage.getItem(KEY)===null && localStorage.getItem("stratlab.v1")!==null) localStorage.setItem(KEY, localStorage.getItem("stratlab.v1")); }catch(e){}

const LEVELS = [
  {n:"Intern", vi:"Thực tập sinh",           xp:0,     note:"Bắt đầu đọc số"},
  {n:"Analyst", vi:"Chuyên viên phân tích",          xp:400,   note:"Biết dựng cây vấn đề"},
  {n:"Senior Analyst", vi:"Chuyên viên cao cấp",   xp:1200,  note:"Định lượng nhanh và đúng"},
  {n:"Consultant", vi:"Tư vấn viên",       xp:2600,  note:"Đưa được khuyến nghị"},
  {n:"Strategy Manager", vi:"Quản lý chiến lược", xp:4800,  note:"Nhìn ra đánh đổi"},
  {n:"Director", vi:"Giám đốc",         xp:8000,  note:"Ra quyết định dưới bất định"},
  {n:"Partner", vi:"Thành viên điều hành",          xp:13000, note:"Định hình vấn đề cho người khác"}
];

const BADGES = [
  {id:"first-case",   n:"First Blood",            d:"Hoàn thành case đầu tiên",              t:s=>done(s)>=1},
  {id:"profit",       n:"Profit Hunter",          d:"Giải 3 case Profitability",             t:s=>byType(s,"Profitability")>=3},
  {id:"sizing",       n:"Market Sizing Master",   d:"Giải 2 case Market Sizing",             t:s=>byType(s,"Market Sizing")>=2},
  {id:"retail",       n:"Retail Strategist",      d:"Giải 3 case ngành Retail hoặc F&B",     t:s=>byInd(s,["retail","fnb"])>=3},
  {id:"ma",           n:"M&A Analyst",            d:"Giải một case M&A hoặc Investment",     t:s=>byType(s,"M&A")+byType(s,"Investment")>=1},
  {id:"vn",           n:"Vietnam Business Expert",d:"Giải 8 case về doanh nghiệp Việt Nam",  t:s=>vnCases(s)>=8},
  {id:"nohint",       n:"10 Cases Without Hint",  d:"Hoàn thành 10 case không dùng gợi ý",   t:s=>noHint(s)>=10},
  {id:"quant",        n:"Quant Sniper",           d:"Trả lời đúng 15 câu tính toán",         t:s=>(s.stats.calcRight||0)>=15},
  {id:"streak7",      n:"Seven Day Discipline",   d:"Chuỗi 7 ngày giải case liên tục",       t:s=>(s.streak.best||0)>=7},
  {id:"models",       n:"Model Collector",        d:"Khám phá 8 mô hình kinh doanh",         t:s=>Object.keys(s.models||{}).length>=8},
  {id:"battle",       n:"Ring Judge",             d:"Hoàn thành 3 company battle",           t:s=>Object.keys(s.battles||{}).length>=3},
  {id:"expert",       n:"Expert Class",           d:"Hoàn thành một case độ khó Expert",     t:s=>byDiff(s,"expert")>=1},
  {id:"perfect",      n:"Flawless Structure",     d:"Đạt điểm 90+ trong một case",           t:s=>Object.values(s.cases||{}).some(c=>c.score>=90)},
  {id:"explorer",     n:"District Explorer",      d:"Mở hồ sơ 15 doanh nghiệp",              t:s=>Object.keys(s.seen||{}).length>=15},
  {id:"paths",        n:"Path Finder",            d:"Đạt 2 ending khác nhau trong cùng một case", t:s=>Object.values(s.cases||{}).some(c=>(c.endingsSeen||[]).length>=2)},
  {id:"speed",        n:"Under Pressure",         d:"Đạt Speed 90+ trong một daily challenge", t:s=>(s.dailyLog||[]).some(d=>d.speed>=90)},
  {id:"daily5",       n:"Standing Assignment",    d:"Hoàn thành 5 daily challenge",          t:s=>(s.dailyLog||[]).length>=5},
  {id:"student",      n:"First Lesson",           d:"Hoàn thành bài học đầu tiên",           t:s=>Object.values(s.lessons||{}).some(l=>l.done)},
  {id:"module1",      n:"Module Cleared",         d:"Hoàn thành trọn một module",            t:s=>window.MODULES.some(m=>m.lessons.length && m.lessons.every(id=>(s.lessons||{})[id]&&s.lessons[id].done))},
  {id:"certified",    n:"Certified",              d:"Đạt bài kiểm tra cuối một lộ trình",    t:s=>Object.values(s.exams||{}).some(e=>e.passed)},
  {id:"tripled",      n:"Triple Certified",       d:"Đạt cả ba bài kiểm tra cuối lộ trình",  t:s=>Object.values(s.exams||{}).filter(e=>e.passed).length>=3},
  {id:"honours",      n:"With Distinction",       d:"Đạt 90 điểm trở lên ở một bài kiểm tra", t:s=>Object.values(s.exams||{}).some(e=>e.best>=90)}
];

function done(s){ return Object.values(s.cases||{}).filter(c=>c.done).length }
function completed(s){ return Object.entries(s.cases||{}).filter(([,c])=>c.done).map(([id])=>window.CASE_BY_ID[id]).filter(Boolean) }
function byType(s,t){ return completed(s).filter(c=>c.type===t).length }
function byInd(s,list){ return completed(s).filter(c=>list.includes(c.industry)).length }
function byDiff(s,d){ return completed(s).filter(c=>c.difficulty===d).length }
function vnCases(s){ return completed(s).filter(c=>{const co=window.COMPANY_BY_ID[c.company];return co&&co.country==="VN"}).length }
function noHint(s){ return Object.values(s.cases||{}).filter(c=>c.done&&!c.usedHint).length }

const blank = () => ({
  xp:0, cases:{}, models:{}, battles:{}, seen:{}, badges:[],
  streak:{cur:0,best:0,last:null,days:[]},
  stats:{calcRight:0, calcTotal:0, hints:0},
  lessons:{},        // {lessonId:{done,score}}
  exams:{},          // {trackId:{best,passed,date,byModule,attempts}}
  profile:{name:""},
  daily:{date:null,id:null,done:false},
  dailyLog:[]      // [{date,id,seconds,acc,logic,speed,rec,total}]
});

function load(){
  try{ const r = JSON.parse(localStorage.getItem(KEY)); if(r&&typeof r==="object") return Object.assign(blank(),r) }catch(e){}
  return blank();
}
let S = load();
function save(){ try{ localStorage.setItem(KEY, JSON.stringify(S)) }catch(e){} }

function todayKey(){ const d=new Date(); return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0") }
function daysBetween(a,b){ return Math.round((new Date(b)-new Date(a))/86400000) }

const State = {
  get(){ return S },
  save,
  reset(){ S = blank(); save(); },
  levels: LEVELS,
  badges: BADGES,

  levelIndex(){ let i=0; for(let k=0;k<LEVELS.length;k++) if(S.xp>=LEVELS[k].xp) i=k; return i },
  level(){ return LEVELS[this.levelIndex()] },
  nextLevel(){ const i=this.levelIndex(); return LEVELS[i+1]||null },
  levelProgress(){
    const i=this.levelIndex(), nx=LEVELS[i+1];
    if(!nx) return 1;
    return (S.xp-LEVELS[i].xp)/(nx.xp-LEVELS[i].xp);
  },

  addXp(n,label){
    if(!n) return;
    S.xp += n; save();
    if(window.UI && UI.toast) UI.toast("+"+n+" XP", label||"");
    this.checkBadges();
  },

  caseState(id){ return S.cases[id] || (S.cases[id] = {done:false,score:0,usedHint:false,steps:{},best:0}) },

  markStep(caseId, stepIdx, payload){
    const c = this.caseState(caseId);
    c.steps[stepIdx] = payload; save();
  },

  finishCase(caseId, score, dims, usedHint){
    const c = this.caseState(caseId);
    const first = !c.done;
    c.done = true; c.score = score; c.dims = dims; c.usedHint = usedHint||c.usedHint;
    c.best = Math.max(c.best||0, score);
    save();
    this.touchStreak();
    this.checkBadges();
    return first;
  },

  isUnlocked(cs){
    return this.levelIndex() >= (cs.level||0);
  },

  /* ---- học tập ---- */
  lessonState(id){ return S.lessons[id] || (S.lessons[id] = {done:false, score:0}) },
  lessonDone(id){ return !!(S.lessons[id] && S.lessons[id].done) },
  finishLesson(id, score){
    const l = this.lessonState(id);
    const first = !l.done;
    l.done = true; l.score = Math.max(l.score||0, score);
    save(); this.touchStreak(); this.checkBadges();
    return first;
  },
  moduleProgress(mid){
    const m = window.MODULE_BY_ID[mid] || {lessons:[]};
    const done = (m.lessons||[]).filter(id=>this.lessonDone(id)).length;
    return {done, total:(m.lessons||[]).length, complete:(m.lessons||[]).length>0 && done===m.lessons.length};
  },
  trackProgress(tid){
    const t = window.TRACK_BY_ID[tid] || {modules:[]};
    let done=0, total=0;
    t.modules.forEach(mid=>{ const p=this.moduleProgress(mid); done+=p.done; total+=p.total });
    return {done, total, pct: total? Math.round(done/total*100) : 0};
  },
  nextLesson(){
    for(const m of window.MODULES){
      if(m.status!=="ready") continue;
      for(const id of m.lessons) if(!this.lessonDone(id)) return window.LESSON_BY_ID[id];
    }
    return null;
  },
  /* ---- kiểm tra cuối lộ trình ---- */
  examState(t){ return S.exams[t] || (S.exams[t] = {best:0, passed:false, date:null, byModule:{}, attempts:0}) },
  examUnlocked(t){ const p = this.trackProgress(t); return p.total>0 && p.done===p.total },
  recordExam(t, score, byModule){
    const e = this.examState(t);
    e.attempts = (e.attempts||0)+1;
    const ex = window.EXAM_BY_TRACK[t];
    if(score > (e.best||0)){ e.best = score; e.byModule = byModule }
    if(score >= ex.pass && !e.passed){ e.passed = true; e.date = todayKey() }
    save(); this.touchStreak(); this.checkBadges();
    return e;
  },
  setName(n){ S.profile = S.profile||{}; S.profile.name = String(n||"").slice(0,60); save() },
  playerName(){ return (S.profile&&S.profile.name) || "" },

  /* ---- phân tích điểm yếu theo module ---- */
  moduleScores(){
    const out = [];
    window.MODULES.forEach(m=>{
      if(m.status!=="ready" || !m.lessons.length) return;
      const parts = [];
      const ls = m.lessons.map(id=>S.lessons[id]).filter(x=>x&&x.done);
      if(ls.length) parts.push({w:1, v: ls.reduce((a,b)=>a+b.score,0)/ls.length});
      const ex = S.exams[m.track];
      if(ex && ex.byModule && ex.byModule[m.id]!=null) parts.push({w:2, v: ex.byModule[m.id]});
      const cs = m.case && S.cases[m.case] && S.cases[m.case].done ? S.cases[m.case].score : null;
      if(cs!=null) parts.push({w:1.5, v:cs});
      if(!parts.length) return;
      const wsum = parts.reduce((a,b)=>a+b.w,0);
      const score = Math.round(parts.reduce((a,b)=>a+b.w*b.v,0)/wsum);
      out.push({module:m, score, lessons:ls.length, hasExam:parts.length>1});
    });
    return out.sort((a,b)=>a.score-b.score);
  },
  weakModules(n){ return this.moduleScores().filter(x=>x.score<80).slice(0, n||3) },

  moduleForCase(caseId){
    // Một case có thể là đích của nhiều module (ví dụ case NIM thuộc cả MECE lẫn Vietnam Banking).
    // Ưu tiên module người học đang dở, rồi tới module chưa bắt đầu, cuối cùng mới tới module đã xong.
    const cands = window.MODULES.filter(m=>m.case===caseId && m.status==="ready" && m.lessons.length);
    if(!cands.length) return null;
    const rank = m => { const p = this.moduleProgress(m.id);
      if(p.done>0 && !p.complete) return 0;   // đang học dở
      if(p.done===0) return 1;                // chưa bắt đầu
      return 2;                               // đã hoàn thành
    };
    return cands.slice().sort((a,b)=>rank(a)-rank(b))[0];
  },

  seeCompany(id){ if(!S.seen[id]){ S.seen[id]=1; save(); this.checkBadges(); } },
  modelExplored(id){ if(!S.models[id]){ S.models[id]=1; save(); this.addXp(40,"Business model mới"); } },
  battleDone(id,correct,total){ S.battles[id]={correct,total}; save(); this.checkBadges(); },

  calcResult(ok){ S.stats.calcTotal=(S.stats.calcTotal||0)+1; if(ok) S.stats.calcRight=(S.stats.calcRight||0)+1; save(); },
  usedHint(){ S.stats.hints=(S.stats.hints||0)+1; save(); },

  touchStreak(){
    const t = todayKey();
    const st = S.streak;
    if(st.last === t) return;
    if(st.last && daysBetween(st.last,t)===1) st.cur = (st.cur||0)+1;
    else st.cur = 1;
    st.last = t;
    st.best = Math.max(st.best||0, st.cur);
    st.days = (st.days||[]).concat(t).slice(-60);
    save();
  },

  streakDays(){
    const set = new Set(S.streak.days||[]);
    const out = [];
    for(let i=27;i>=0;i--){
      const d = new Date(); d.setDate(d.getDate()-i);
      const k = d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
      out.push({k, on:set.has(k), today:i===0});
    }
    return out;
  },

  dailyCase(){
    const t = todayKey();
    const li = this.levelIndex();
    const pool0 = window.CASES.filter(c=>c.minutes<=15 && (c.level||0)<=li);
    const stale = !S.daily.id || !pool0.some(c=>c.id===S.daily.id);
    if(S.daily.date !== t || stale){
      const pool = pool0;
      const seed = t.split("-").reduce((a,b)=>a+parseInt(b),0);
      const pick = pool[seed % pool.length];
      S.daily = {date:t, id:pick.id, done:false}; save();
    }
    return window.CASE_BY_ID[S.daily.id];
  },

  dailyDone(){ const t=todayKey(); return !!(S.daily.date===t && S.daily.done) },

  dailyResult(){ const t=todayKey(); return (S.dailyLog||[]).filter(d=>d.date===t)[0] || null },

  finishDaily(caseId, seconds, dims){
    const t = todayKey();
    if(S.daily.id !== caseId) return null;                 // chỉ tính case của hôm nay
    if(S.daily.date === t && S.daily.done) return this.dailyResult();  // không tính lại lần thứ hai
    const cs = window.CASE_BY_ID[caseId];
    const limit = (cs.minutes||10)*60;
    const g = k => dims[k]!=null ? dims[k] : null;
    const avg = arr => { const v=arr.filter(x=>x!=null); return v.length? Math.round(v.reduce((a,b)=>a+b,0)/v.length) : 0 };

    const acc   = avg([g("quant"), g("insight")]);
    const logic = avg([g("structure"), g("priority")]);
    const rec   = g("recommendation")!=null ? g("recommendation") : avg([g("insight")]);
    // đúng giờ = 100; hết gấp đôi thời gian = 0; tuyến tính ở giữa
    const speed = Math.max(0, Math.min(100, Math.round(seconds<=limit ? 100 : 100 - (seconds-limit)/limit*100)));
    const total = Math.round(acc*0.35 + logic*0.25 + rec*0.25 + speed*0.15);

    const row = {date:t, id:caseId, seconds:Math.round(seconds), acc, logic, speed, rec, total};
    S.dailyLog = (S.dailyLog||[]).filter(d=>d.date!==t).concat([row]).slice(-60);
    S.daily.done = true;
    save();
    this.addXp(Math.round(120*total/100), "Daily challenge");
    this.checkBadges();
    return row;
  },

  dailyStreakCount(){ return (S.dailyLog||[]).length },

  continueCase(){
    const inProgress = Object.entries(S.cases).filter(([,c])=>!c.done && Object.keys(c.steps||{}).length);
    if(inProgress.length) return window.CASE_BY_ID[inProgress[inProgress.length-1][0]];
    const next = window.CASES.find(c=>!(S.cases[c.id]&&S.cases[c.id].done) && State.isUnlocked(c));
    return next||null;
  },

  checkBadges(){
    let gained = [];
    BADGES.forEach(b=>{
      if(S.badges.includes(b.id)) return;
      let ok=false; try{ ok = b.t(S) }catch(e){}
      if(ok){ S.badges.push(b.id); gained.push(b) }
    });
    if(gained.length){ save(); gained.forEach(b=> window.UI && UI.toast("BADGE UNLOCKED", b.n)); }
  },

  hasBadge(id){ return S.badges.includes(id) },

  industryProgress(indId){
    const cs = window.CASES.filter(c=>c.industry===indId);
    const d = cs.filter(c=>S.cases[c.id]&&S.cases[c.id].done).length;
    return {done:d, total:cs.length};
  }
};

window.State = State;
})();
