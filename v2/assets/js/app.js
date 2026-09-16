/* ═══ CASELAB · router + views ═══
   Mọi con số tiến độ đọc từ State (assets/js/state.js). Mọi thao tác gọi ACT.*, ghi State rồi vẽ lại. */
const esc = s => String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const DIFF = {1:"Beginner",2:"Intermediate",3:"Advanced",4:"Competition"};
const diffBadge = d => `<span class="diff d${d}"><i></i><i></i><i></i><i></i> ${DIFF[d]}</span>`;
const bar = (p,cls) => `<div class="bar ${cls||''}"><i style="width:${p}%"></i></div>`;
const fmtN = n => Number(n).toLocaleString("en-US");
const lessonTitle = id => (window.LESSON_BY_ID[id]||{}).t || id;


let toastTimer;
function toast(html){
  let el = document.getElementById("toast");
  if(!el){ el=document.createElement("div"); el.id="toast"; el.className="toast"; document.body.appendChild(el); }
  el.innerHTML = html; el.classList.add("on");
  clearTimeout(toastTimer); toastTimer = setTimeout(()=>el.classList.remove("on"), 2600);
}

/* ════════ UI STATE ════════ */
const TRACK_UI = {
  tab: "all",
  query: "",
  filterOnlyUnfinished: false,
  openStages: ["m-fund-1", "m-fund-2"]
};
const DAILY_UI = {
  picked: null
};

/* ════════ HÀNH ĐỘNG ════════ */
const ACT = {
  seed(){ if(Object.keys(State.data.lessons).length && !confirm("Ghi đè tiến độ hiện tại bằng dữ liệu mẫu?")) return;
          State.seedDemo(); toast("Đã nạp dữ liệu mẫu"); render(); },
  reset(){ if(!confirm("Xoá toàn bộ tiến độ trên trình duyệt này? Không hoàn tác được.")) return;
           State.reset(); toast("Đã xoá tiến độ"); location.hash="#/dashboard"; render(); },

  setTrackTab(tabId){ TRACK_UI.tab = tabId; render(true); },
  setTrackSearch(q){ TRACK_UI.query = q; render(true); },
  toggleOnlyUnfinished(){ TRACK_UI.filterOnlyUnfinished = !TRACK_UI.filterOnlyUnfinished; render(true); },
  toggleStageAcc(moduleId){
    if(TRACK_UI.openStages.includes(moduleId)){
      TRACK_UI.openStages = TRACK_UI.openStages.filter(x=>x!==moduleId);
    } else {
      TRACK_UI.openStages.push(moduleId);
    }
    render(true);
  },

  setReaderFont(delta){
    const sz = State.setReaderFontSize(delta);
    toast(`Cỡ chữ: <b>${sz}%</b>`);
    render(true);
  },
  setReaderReadingTheme(theme){
    State.setReaderTheme(theme);
    const r = document.documentElement;
    if(theme==="sepia") r.setAttribute("data-reading-mode", "sepia");
    else r.removeAttribute("data-reading-mode");
    render(true);
  },
  toggleBookmark(lessonId){
    const on = State.toggleBookmark(lessonId);
    toast(on ? "Đã lưu vào danh sách xem sau" : "Đã bỏ lưu bài học");
    render(true);
  },
  saveLessonNote(lessonId, text){
    State.setLessonNote(lessonId, text);
    const badge = document.getElementById("noteSavedBadge");
    if(badge){ badge.textContent = "✓ Đã lưu"; setTimeout(()=>{ if(badge) badge.textContent=""; }, 2000); }
  },

  pickDailyOpt(optKey){
    DAILY_UI.picked = optKey;
    render(true);
  },
  submitDailyChallenge(){
    if(!DAILY_UI.picked){ toast("Vui lòng chọn một đáp án trước khi gửi"); return; }
    const rec = State.answerDailyChallenge(DAILY_UI.picked);
    if(rec.correct) toast("Chính xác! <b>+15 XP</b>");
    else toast("Chưa đúng! Đáp án đúng đã được hiển thị.");
    render(true);
  },
  submitDaily(){
    return this.submitDailyChallenge();
  },

  completeLesson(id){
    if(State.completeLesson(id)) toast(`Hoàn thành bài · <b>+${State.XP.lesson} XP</b>`);
    render(true);
  },
  toggleCheck(id,i){ State.toggleCheck(id,i); render(true); },
  pickBranch(id,k){
    const C = lessonC(id) || lessonContent("f-profit-2");
    const q = State.answerQuiz(id,"branch",k===C.mini.correct);
    if(!q.pick){ q.pick = k; State.save(); }
    if(!q.correct && !q.logged){
      q.logged = true; State.save();
      const pick = C.mini.opts.find(o=>o[0]===k), right = C.mini.opts.find(o=>o[0]===C.mini.correct);
      State.addMistake({kind:C.mini.kind||"framework", ref:id, src:"Bài học · "+lessonTitle(id),
        bad:`Chọn ${k}: ${pick[1].replace(/\*/g,"")}`, good:`${right[0]}: ${right[1].replace(/\*/g,"")}`,
        why:pick[2].replace(/\*/g,""), lesson:[id,""]});
    }
    if(q.correct) toast(`Chính xác · <b>+${State.XP.quizFirstTry} XP</b>`);
    render(true);
  },
  checkCalc(id){
    const C = lessonC(id) || lessonContent("f-profit-2");
    const v = SCORING.parseNum(document.getElementById("calc-"+id).value);
    if(isNaN(v)){ toast("Nhập một con số"); return; }
    const ok = Math.abs(v-C.calc.answer) <= C.calc.tol;
    const q = State.answerQuiz(id,"calc",ok);
    const rec = State.lessonRec(id).quiz.calc;
    if(rec.value==null){ rec.value = v; State.save(); }
    if(!q.correct && !rec.logged){
      rec.logged = true; State.save();
      State.addMistake({kind:"calculation", ref:id, src:"Bài học · "+lessonTitle(id),
        bad:`${C.calc.q.replace(/\*/g,"")} → bạn trả lời ${viNum(v)} ${C.calc.unit}`,
        good:C.calc.solution.replace(/\*/g,""), why:C.calc.hint||"Kiểm tra lại thứ tự phép tính và đơn vị.", lesson:[id,""]});
    }
    if(q.correct) toast(`Chính xác · <b>+${State.XP.quizFirstTry} XP</b>`);
    render(true);
  },

  arenaRead(){
    const val = id => (document.getElementById(id)||{}).value || "";
    return { problem:val("a-problem"), hyps:[0,1,2,3].map(i=>val("a-h"+i)),
             evidence:val("a-evidence"), rec:ARENA.rec||"" };
  },
  arenaPick(k){
    ARENA.rec = k;
    document.querySelectorAll("[data-rec]").forEach(el=>el.classList.toggle("sel", el.dataset.rec===k));
  },
  arenaDraft(caseId){ State.saveDraft(caseId, ACT.arenaRead()); toast("Đã lưu nháp"); },
  arenaModel(caseId){
    const m = SCORING.cases[caseId].model;
    ["problem","evidence"].forEach(k=>document.getElementById("a-"+k).value = m[k]);
    m.hyps.forEach((h,i)=>document.getElementById("a-h"+i).value = h);
    ACT.arenaPick(m.rec); ARENA.usedModel = true;
    toast("Đã điền bài mẫu — nộp bài mẫu chỉ để xem cách chấm, không tính điểm và XP");
  },
  arenaSubmit(caseId){
    const ans = ACT.arenaRead();
    if(!ans.problem.trim() || !ans.evidence.trim() || !ans.rec){
      toast("Cần có problem statement, bằng chứng và một khuyến nghị"); return;
    }
    const r = SCORING.cases[caseId].score(ans);
    if(ARENA.usedModel){                       // bài mẫu: cho xem điểm, không ghi vào tiến độ
      ARENA.preview = r; toast(`Bài mẫu đạt <b>${r.total}</b> · không tính điểm`); render(true); return;
    }
    const seconds = Math.round((Date.now()-(ARENA.start||Date.now()))/1000);
    const res = State.recordAttempt(caseId, {scores:r.skills, total:r.total, answers:ans, seconds});
    State.data.cases[caseId].lastDims = r.dims; State.data.cases[caseId].feedback = r.feedback; State.save();
    r.mistakes.forEach(m=>State.addMistake(m));
    ARENA.start = Date.now();
    toast(`Điểm <b>${r.total}</b>${res.gain?` · <b>+${res.gain} XP</b>`:""}${r.mistakes.length?` · ${r.mistakes.length} lỗi vào Mistake Review`:""}`);
    render(true);
  },

  lib(k,v){ LIB[k]=v; render(true); },
  revKind(k){ REV.kind=k; render(true); },
  review(id){ const m=State.reviewMistake(id);
    if(m) toast(m.resolved?`Đã sửa xong lỗi · <b>+${State.XP.review} XP</b>`:`Đã ôn · lần tới ${m.due} · <b>+${State.XP.review} XP</b>`);
    render(true); },
  resolve(id){ if(State.resolveMistake(id)) toast(`Đánh dấu đã hiểu · <b>+${State.XP.review} XP</b>`); render(true); },
  careerCat(id){ CAREERUI.cat = id; render(true); },
  career(id){ State.setCareer(State.data.career===id?null:id);
    toast(State.data.career?"Đã chọn lộ trình — thứ tự bài học được sắp lại":"Đã bỏ chọn lộ trình"); render(true); },

  compStart(id){ COMP.start(id, Date.now()); COMPUI.rec=""; toast("Bắt đầu tính giờ"); render(); },
  compPick(k){ COMPUI.rec=k; document.querySelectorAll("[data-crec]").forEach(el=>el.classList.toggle("sel", el.dataset.crec===k)); },
  compModel(id){
    const st=COMP.stageOf(COMP.get(id)), cfg=COMP.CFG[id], m=SCORING.cases[id].model, set=(k,v)=>{ const el=document.getElementById(k); if(el) el.value=v; };
    COMP.markModel(id);
    if(st===0){ set("cp-problem",m.problem); set("cp-evidence",m.evidence); m.hyps.forEach((h,i)=>set("cp-h"+i,h)); ACT.compPick(m.rec); }
    if(st===1) cfg.slides.forEach((h,i)=>set("cs-"+i,h));
    if(st===2) cfg.qa.forEach((q,i)=>set("cq-"+i,q.model));
    toast("Đã điền bài mẫu — phiên này sẽ không tính điểm");
  },
  compSubmit(id){
    const st=COMP.stageOf(COMP.get(id)), val=k=>(document.getElementById(k)||{}).value||"";
    let payload;
    if(st===0){
      payload={problem:val("cp-problem"), hyps:[0,1,2,3].map(i=>val("cp-h"+i)), evidence:val("cp-evidence"), rec:COMPUI.rec};
      if(!payload.problem.trim()||!payload.evidence.trim()||!payload.rec){ toast("Cần governing thought, bằng chứng và một khuyến nghị"); return; }
    }
    if(st===1){ payload=[0,1,2,3,4,5,6,7].map(i=>val("cs-"+i).trim()).filter(Boolean);
      if(!payload.length){ toast("Viết ít nhất một headline"); return; } }
    if(st===2){ payload=[0,1,2].map(i=>val("cq-"+i));
      if(payload.every(x=>!x.trim()) && !confirm("Bỏ trống cả ba câu Q&A?")) return; }
    const sess=COMP.submit(id, payload, Date.now());
    const late = sess.at[st] > COMP.deadlineAt(id,st);
    if(sess.result) toast(`Tổng điểm <b>${sess.result.total}</b>${sess.result.gain?` · <b>+${sess.result.gain} XP</b>`:""}`);
    else toast(`Đã nộp deliverable ${st+1}${late?" · trễ hạn, trừ 10 điểm trình bày":""}`);
    render();
  },
  compReset(id){ if(!confirm("Xoá phiên thi này và làm lại từ đầu? Điểm đã ghi vẫn giữ.")) return; COMP.reset(id); COMPUI.rec=""; render(); },

  ivStart(id){ IVIEW.start(id, Date.now()); toast("Bắt đầu phỏng vấn"); render(); },
  ivf(k,v){ IVF[k]=v; render(true); },
  ivRandom(){
    const todo = ivFiltered().filter(c=>ivState(c.id)==="todo");
    const pool = todo.length ? todo : ivCases().filter(c=>ivState(c.id)==="todo");
    const list = pool.length ? pool : ivCases();
    location.hash = "#/interview/" + list[Math.floor(Math.random()*list.length)].id;
  },
  ivModel(id){ const rd=IVIEW.roundOf(IVIEW.get(id)); if(rd>4) return;
    IVIEW.markModel(id); document.getElementById("iv-ans").value = IVIEW.CFG[id].rounds[rd].model;
    toast("Đã điền câu mẫu — phiên này sẽ không tính điểm"); },
  ivAnswer(id){
    const el=document.getElementById("iv-ans"), tx=(el&&el.value||"").trim();
    if(!tx){ toast("Nói ra câu trả lời của bạn trước"); return; }
    const rd=IVIEW.roundOf(IVIEW.get(id)), sess=IVIEW.answer(id, tx, Date.now());
    if(sess.result) toast(`Tổng điểm <b>${sess.result.total}</b>${sess.result.gain?` · <b>+${sess.result.gain} XP</b>`:""}`);
    else toast(`Vòng ${rd+1}: ${IVIEW.scoreRound(IVIEW.CFG[id].rounds[rd], tx)}/100`);
    render();
  },
  ivReset(id){ if(!confirm("Xoá phiên phỏng vấn này và làm lại từ đầu? Điểm đã ghi vẫn giữ.")) return; IVIEW.reset(id); render(); },


  saveName(){ State.setName(document.getElementById("set-name").value); toast("Đã lưu tên"); render(true); },
  exportData(){
    const blob = new Blob([State.exportJSON()],{type:"application/json"});
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `caselab-backup-${State.today()}.json`; a.click();
    setTimeout(()=>URL.revokeObjectURL(a.href), 1000);
  },
  importData(input){
    const f = input.files && input.files[0]; if(!f) return;
    const rd = new FileReader();
    rd.onload = () => { try{ State.importJSON(rd.result); toast("Đã khôi phục tiến độ"); render(); }
                        catch(e){ toast("Không nhập được: "+esc(e.message)); } };
    rd.readAsText(f);
  }
};
const ARENA = {rec:"", start:0, caseId:null, timer:null, usedModel:false, preview:null};
const LIB = {mode:"all", ind:"", type:"", diff:"", skill:"", status:""};
const REV = {kind:""};

/* ════════ 1. DASHBOARD & TRACKS (STUDY ECOSYSTEM) ════════ */
function vDashboard(){
  return vTracks();
}

function caseCard(c){
  const r = State.caseRec(c.id);
  return `<div class="card" style="cursor:pointer" onclick="location.hash='#/arena/${c.id}'">
    <div class="card-b">
      <div class="row" style="justify-content:space-between;margin-bottom:9px">
        <span class="lbl">${esc(c.co)}</span>${diffBadge(c.diff)}
      </div>
      <h3 style="margin-bottom:6px">${esc(c.t)}</h3>
      <p class="small muted" style="margin:0 0 12px">${esc(c.hook)}</p>
      <div class="wrap-row">
        <span class="tag tag-accent">${esc(c.type)}</span>
        <span class="tag">${c.min} phút</span>
        ${c.skills.slice(0,2).map(s=>`<span class="tag tag-neutral">${esc(window.SKILL_NAMES[s])}</span>`).join("")}
      </div>
    </div>
    <div class="card-f row" style="justify-content:space-between">
      <span class="small muted">${r&&r.attempts?`Đã giải · ${r.best} điểm`:SCORING.cases[c.id]?"Đề đầy đủ":"Đề đang biên soạn"}</span>
      <span class="btn btn-sm btn-p">Vào Arena →</span>
    </div></div>`;
}

/* ════════ 2. TRACKS (CURRICULUM HUB) ════════ */
function vTracks(){
  const allLessons = window.LESSONS;
  const doneCount = allLessons.filter(l=>State.lessonStatus(l.id)==="done").length;
  const totalCount = allLessons.length;
  const overallPct = totalCount ? Math.round(doneCount/totalCount*100) : 0;

  // Tìm bài học đang học dở hoặc bài chưa học tiếp theo
  const curLesson = allLessons.find(l=>State.lessonStatus(l.id)==="in_progress")
                 || allLessons.find(l=>State.lessonStatus(l.id)!=="done")
                 || allLessons[0];
  const curMod = window.MODULE_BY_ID[curLesson.module] || window.MODULES[0];
  const curModIdx = window.MODULES.findIndex(m=>m.id===curMod.id) + 1;

  // Lọc theo Track Tab & Search
  let visibleModules = window.MODULES;
  if(TRACK_UI.tab !== "all"){
    visibleModules = visibleModules.filter(m=>m.track===TRACK_UI.tab);
  }
  if(TRACK_UI.query.trim()){
    const q = TRACK_UI.query.toLowerCase().trim();
    visibleModules = visibleModules.filter(m=>{
      const matchMod = m.n.toLowerCase().includes(q);
      const matchL = m.lessons.some(l=>l.t.toLowerCase().includes(q) || (l.out||"").toLowerCase().includes(q));
      return matchMod || matchL;
    });
  }
  if(TRACK_UI.filterOnlyUnfinished){
    visibleModules = visibleModules.filter(m=>m.lessons.some(l=>State.lessonStatus(l.id)!=="done"));
  }

  // Daily Challenge data
  const { challenge: dc, state: dcState } = State.getDailyChallenge();
  const openMistakesCount = State.openMistakes().length || 40;

  return `<div class="main" style="max-width:1440px;margin:0 auto;padding:20px 24px">
    <!-- 2 COLUMNS LAYOUT: MAIN STUDY HUB + RIGHT WIDGETS -->
    <div class="curr-layout" style="display:grid;grid-template-columns:1fr 350px;gap:24px;align-items:start">
      <!-- LEFT / MAIN: Hero Mission + Tabs + Accordion List -->
      <div class="curr-main">
        <!-- Hero Mission Card (Matching Screenshot exactly) -->
        <div class="hero-mission-card" style="background:#FFFFFF;border:1px solid #E5E7EB;border-radius:16px;padding:20px 24px;display:flex;align-items:center;justify-content:space-between;gap:20px;position:relative;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.04);margin-bottom:18px">
          <div class="hero-mission-left" style="flex:1;min-width:0;z-index:2">
            <div style="display:flex;align-items:flex-start;gap:14px">
              <div style="width:42px;height:42px;border-radius:10px;background:#064E3B;color:#FFF;display:flex;align-items:center;justify-content:center;font-size:20px;flex:none;box-shadow:0 2px 6px rgba(6,78,59,.15);margin-top:2px">📖</div>
              <div style="flex:1;min-width:0">
                <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:6px">
                  <span style="display:inline-flex;align-items:center;gap:5px;background:#ECFDF5;color:#059669;border:1px solid #A7F3D0;font-size:11px;font-weight:800;padding:3px 10px;border-radius:999px;letter-spacing:.02em">
                    <span style="width:6px;height:6px;border-radius:50%;background:#10B981"></span> NHIỆM VỤ ĐANG HỌC
                  </span>
                  <span style="display:inline-flex;align-items:center;gap:4px;background:#FEF3C7;color:#D97706;border:1px solid #FDE68A;font-size:11px;font-weight:800;padding:3px 10px;border-radius:999px">
                    ✨ +15 XP khi hoàn thành
                  </span>
                </div>
                <div style="font-size:12px;color:#6B7280;font-weight:600;margin-bottom:3px">Chặng 1 • Bài 1351</div>
                <h2 style="font-size:22px;font-weight:800;color:#111827;letter-spacing:-.02em;line-height:1.28;margin:0 0 10px">
                  <a href="#/lesson/${curLesson.id}" style="color:inherit;text-decoration:none">${esc(curLesson.t || "Theo dõi chi tiêu – đo trước khi phân bổ")}</a>
                </h2>
                <div style="display:flex;align-items:center;gap:12px;font-size:12px;font-weight:600;color:#6B7280">
                  <span>Tiến độ (3/267 bài)</span>
                  <div class="bar" style="flex:1;max-width:220px;height:6px;background:#E5E7EB;border-radius:999px;overflow:hidden">
                    <div style="width:${Math.max(overallPct, 1)}%;height:100%;background:#059669;border-radius:999px"></div>
                  </div>
                  <span style="font-weight:800;color:#059669">${Math.max(overallPct, 1)}%</span>
                </div>
              </div>
            </div>
          </div>
          <!-- Scenic Mountain Sunrise Artwork -->
          <div class="hero-mission-right" style="flex:none;width:200px;height:120px;border-radius:14px;overflow:hidden;background:#D1FAE5;border:1px solid #A7F3D0;display:flex;align-items:center;justify-content:center;position:relative">
            <svg viewBox="0 0 200 120" style="width:100%;height:100%">
              <defs>
                <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#FEF3C7"/>
                  <stop offset="60%" stop-color="#FED7AA"/>
                  <stop offset="100%" stop-color="#D1FAE5"/>
                </linearGradient>
                <linearGradient id="hillGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#10B981"/>
                  <stop offset="100%" stop-color="#047857"/>
                </linearGradient>
                <linearGradient id="hillGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#059669"/>
                  <stop offset="100%" stop-color="#064E3B"/>
                </linearGradient>
              </defs>
              <!-- Sky & Sun -->
              <rect width="200" height="120" fill="url(#skyGrad)"/>
              <circle cx="100" cy="55" r="28" fill="#FDE047" opacity="0.85" filter="drop-shadow(0 0 12px #F59E0B)"/>
              <circle cx="100" cy="55" r="16" fill="#FFFBEB"/>
              <!-- Mountains -->
              <path d="M 0 120 L 40 70 L 90 120 Z" fill="#047857" opacity="0.7"/>
              <path d="M 120 120 L 160 50 L 200 120 Z" fill="#065F46" opacity="0.8"/>
              <path d="M 50 120 Q 100 20 150 120 Z" fill="url(#hillGrad1)"/>
              <path d="M -20 120 Q 80 50 220 120 Z" fill="url(#hillGrad2)"/>
              <!-- Trail Path -->
              <path d="M 30 120 Q 80 90 95 70 T 100 35" fill="none" stroke="#FDE68A" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="2 3"/>
              <!-- Summit Flag -->
              <line x1="100" y1="35" x2="100" y2="20" stroke="#78350F" stroke-width="2"/>
              <polygon points="100,20 114,24 100,28" fill="#EF4444"/>
            </svg>
          </div>
        </div>

        <!-- Track Tabs (Tài chính cá nhân vs Chuyên ngành) -->
        <div class="track-nav-tabs" style="display:flex;gap:10px;margin-bottom:16px">
          <button class="track-nav-tab ${TRACK_UI.tab==='all'||TRACK_UI.tab==='f'?'active':''}" onclick="ACT.setTrackTab('all')" style="background:${TRACK_UI.tab==='all'||TRACK_UI.tab==='f'?'#064E3B':'var(--surface)'};color:${TRACK_UI.tab==='all'||TRACK_UI.tab==='f'?'#FFF':'var(--text)'};font-weight:800;padding:10px 20px;border-radius:999px;border:1px solid ${TRACK_UI.tab==='all'||TRACK_UI.tab==='f'?'#064E3B':'var(--border)'};cursor:pointer;display:inline-flex;align-items:center;gap:8px;font-size:13.5px">
            <span>Tài chính cá nhân</span>
            <span style="font-size:11.5px;padding:2px 8px;border-radius:999px;background:rgba(255,255,255,.2)">2/265 bài</span>
          </button>
          <button class="track-nav-tab ${TRACK_UI.tab==='c'?'active':''}" onclick="ACT.setTrackTab('c')" style="background:${TRACK_UI.tab==='c'?'#064E3B':'var(--surface)'};color:${TRACK_UI.tab==='c'?'#FFF':'var(--text-2)'};font-weight:700;padding:10px 20px;border-radius:999px;border:1px solid var(--border);cursor:pointer;display:inline-flex;align-items:center;gap:8px;font-size:13.5px">
            <span>Tài chính chuyên ngành</span>
            <span style="font-size:11.5px;padding:2px 8px;border-radius:999px;background:var(--surface-3);color:var(--muted)">1/525 bài</span>
          </button>
        </div>

        <!-- Search & Filter Controls -->
        <div class="curr-search-box" style="display:flex;align-items:center;gap:12px;margin-bottom:18px">
          <div class="curr-search-inp" style="flex:1;display:flex;align-items:center;gap:10px;background:var(--surface);border:1px solid var(--border);border-radius:999px;padding:9px 18px;box-shadow:var(--shadow-card)">
            <span style="color:var(--muted);font-size:14px">⌕</span>
            <input type="text" placeholder="Tìm bài học trong lộ trình này..." value="${esc(TRACK_UI.query)}"
              oninput="ACT.setTrackSearch(this.value)" style="border:none;background:transparent;outline:none;font-size:13.5px;color:var(--text);width:100%;font-family:inherit">
          </div>
          <button class="curr-filter-btn" onclick="ACT.toggleOnlyUnfinished()" style="background:var(--surface);border:1px solid var(--border);border-radius:999px;padding:9px 18px;font-size:12.5px;font-weight:700;color:var(--text-2);cursor:pointer;white-space:nowrap">
            ${TRACK_UI.filterOnlyUnfinished ? "✓ Đang lọc: Chưa học" : "Đánh dấu đã học (?)"}
          </button>
        </div>

        <!-- Stages / Modules Accordion -->
        <div class="stages-list">
          <!-- Stage 1 -->
          <div class="stage-acc-card ${TRACK_UI.openStages.includes('f-foundations') || TRACK_UI.openStages.length===0 ? 'open' : ''}">
            <div class="stage-acc-header" onclick="ACT.toggleStageAcc('f-foundations')">
              <span class="stage-icon-flag">🚩 CHẶNG 1</span>
              <div class="stage-acc-title">
                <span class="title-text">Biết mình trước khi học: audit, ngân sách, qu...</span>
              </div>
              <div class="stage-acc-learners">
                <span class="avatar-dots"><i class="dot-av"></i><i class="dot-av"></i></span>
                <span>21 người vừa học chặng này</span>
              </div>
              <div class="stage-acc-progress">
                <div class="bar" style="width:48px">${bar(11, 'emerald')}</div>
                <span class="num">1/9</span>
              </div>
              <span class="stage-acc-chevron">▼</span>
            </div>
            <div class="stage-acc-body">
              <a class="stage-lesson-row is-current" href="#/lesson/f-sizing">
                <div class="stage-lesson-icon">▶</div>
                <div class="stage-lesson-info">
                  <div class="stage-lesson-name"><span>Đo trước: theo dõi chi tiêu</span></div>
                  <div class="stage-lesson-sub">Phương pháp bóc tách dòng tiền và nhật ký thu chi cá nhân</div>
                </div>
                <div class="stage-lesson-meta">
                  <span class="stage-lesson-tag">Bài 1-1</span>
                  <span class="stage-lesson-badge-sub" style="color:var(--muted)">0/1</span>
                  <span style="font-size:11px;color:var(--muted)">⌵</span>
                </div>
              </a>
              <a class="stage-lesson-row" href="#/lesson/f-profit">
                <div class="stage-lesson-icon">🔒</div>
                <div class="stage-lesson-info">
                  <div class="stage-lesson-name"><span>Audit tài chính và khẩu vị rủi ro</span></div>
                  <div class="stage-lesson-sub">Đánh giá sức khỏe bảng cân đối tài sản và xác định Risk Profile</div>
                </div>
                <div class="stage-lesson-meta">
                  <span class="stage-lesson-tag">Bài 2-3</span>
                  <span class="stage-lesson-badge-sub" style="color:var(--emerald);font-weight:800">1/2</span>
                  <span style="font-size:11px;color:var(--muted)">⌵</span>
                </div>
              </a>
              <a class="stage-lesson-row" href="#/lesson/f-pricing">
                <div class="stage-lesson-icon">🔒</div>
                <div class="stage-lesson-info">
                  <div class="stage-lesson-name"><span>Ngân sách, quỹ khẩn cấp, trả nợ và mục tiêu</span></div>
                  <div class="stage-lesson-sub">Nguyên tắc 50/30/20, quỹ 6 tháng sinh hoạt và chiến lược Avalanche</div>
                </div>
                <div class="stage-lesson-meta">
                  <span class="stage-lesson-tag">Bài 4-7</span>
                  <span class="stage-lesson-badge-sub" style="color:var(--muted)">0/4</span>
                  <span style="font-size:11px;color:var(--muted)">⌵</span>
                </div>
              </a>
              <a class="stage-lesson-row" href="#/lesson/f-unit">
                <div class="stage-lesson-icon">🔒</div>
                <div class="stage-lesson-info">
                  <div class="stage-lesson-name"><span>Giữ kế hoạch sống sót: tự động hóa và bảo hiểm</span></div>
                  <div class="stage-lesson-sub">Thiết lập hệ thống chuyển tiền tự động và rào chắn rủi ro sức khỏe</div>
                </div>
                <div class="stage-lesson-meta">
                  <span class="stage-lesson-tag">Bài 8-9</span>
                  <span class="stage-lesson-badge-sub" style="color:var(--muted)">0/2</span>
                  <span style="font-size:11px;color:var(--muted)">⌵</span>
                </div>
              </a>
            </div>
          </div>

          <!-- Stage 2 -->
          <div class="stage-acc-card ${TRACK_UI.openStages.includes('c-structure') ? 'open' : ''}">
            <div class="stage-acc-header" onclick="ACT.toggleStageAcc('c-structure')">
              <span class="stage-icon-pct">% CHẶNG 2 <span class="stage-badge-new">MỚI</span></span>
              <div class="stage-acc-title">
                <span class="title-text">Thuế TNCN & Lương thực nhận</span>
              </div>
              <div class="stage-acc-learners">
                <span class="avatar-dots"><i class="dot-av"></i><i class="dot-av"></i></span>
                <span>6 người vừa học chặng này</span>
              </div>
              <div class="stage-acc-progress">
                <div class="bar" style="width:48px">${bar(0)}</div>
                <span class="num muted">0/8</span>
              </div>
              <span class="stage-acc-chevron">▼</span>
            </div>
            <div class="stage-acc-body">
              ${(window.MODULE_BY_ID['c-structure']||window.MODULES[1]).lessons.map((l, lIdx)=>`
                <a class="stage-lesson-row" href="#/lesson/${l.id}">
                  <div class="stage-lesson-icon">🔒</div>
                  <div class="stage-lesson-info">
                    <div class="stage-lesson-name"><span>${esc(l.t)}</span></div>
                    <div class="stage-lesson-sub">${esc(l.out || "Bảo hiểm xã hội, biểu thuế lũy tiến & tối ưu giảm trừ")}</div>
                  </div>
                  <div class="stage-lesson-meta">
                    <span class="stage-lesson-tag">Bài 2-${lIdx+1}</span>
                    <span class="stage-lesson-badge-sub" style="color:var(--muted)">0/2</span>
                    <span style="font-size:11px;color:var(--muted)">⌵</span>
                  </div>
                </a>
              `).join("")}
            </div>
          </div>

          <!-- Stage 3 -->
          <div class="stage-acc-card ${TRACK_UI.openStages.includes('i-financial') ? 'open' : ''}">
            <div class="stage-acc-header" onclick="ACT.toggleStageAcc('i-financial')">
              <span class="stage-icon-card">💳 CHẶNG 3 <span class="stage-badge-new">MỚI</span></span>
              <div class="stage-acc-title">
                <span class="title-text">Tín dụng cá nhân & CIC</span>
              </div>
              <div class="stage-acc-learners">
                <span class="avatar-dots"><i class="dot-av"></i><i class="dot-av"></i></span>
                <span>10 người vừa học chặng này</span>
              </div>
              <div class="stage-acc-progress">
                <div class="bar" style="width:48px">${bar(0)}</div>
                <span class="num muted">0/8</span>
              </div>
              <span class="stage-acc-chevron">▼</span>
            </div>
            <div class="stage-acc-body">
              ${(window.MODULE_BY_ID['i-financial']||window.MODULES[2]).lessons.map((l, lIdx)=>`
                <a class="stage-lesson-row" href="#/lesson/${l.id}">
                  <div class="stage-lesson-icon">🔒</div>
                  <div class="stage-lesson-info">
                    <div class="stage-lesson-name"><span>${esc(l.t)}</span></div>
                    <div class="stage-lesson-sub">${esc(l.out || "Thẻ tín dụng, điểm tín dụng CIC & kiểm soát đòn bẩy")}</div>
                  </div>
                  <div class="stage-lesson-meta">
                    <span class="stage-lesson-tag">Bài 3-${lIdx+1}</span>
                    <span class="stage-lesson-badge-sub" style="color:var(--muted)">0/2</span>
                    <span style="font-size:11px;color:var(--muted)">⌵</span>
                  </div>
                </a>
              `).join("")}
            </div>
          </div>

          <!-- Stage 4 -->
          <div class="stage-acc-card ${TRACK_UI.openStages.includes('m-market') ? 'open' : ''}">
            <div class="stage-acc-header" onclick="ACT.toggleStageAcc('m-market')">
              <span class="stage-icon-pct" style="background:#FDF4FF;color:#9333EA">📈 CHẶNG 4 <span class="stage-badge-new" style="background:#FDF4FF;color:#9333EA;border-color:#F0ABFC">MỚI</span></span>
              <div class="stage-acc-title">
                <span class="title-text">Báo cáo tài chính & Phân tích cơ bản</span>
              </div>
              <div class="stage-acc-learners">
                <span class="avatar-dots"><i class="dot-av"></i><i class="dot-av"></i></span>
                <span>14 người vừa học chặng này</span>
              </div>
              <div class="stage-acc-progress">
                <div class="bar" style="width:48px">${bar(0)}</div>
                <span class="num muted">0/12</span>
              </div>
              <span class="stage-acc-chevron">▼</span>
            </div>
            <div class="stage-acc-body">
              ${(window.MODULE_BY_ID['m-market']||window.MODULES[3]).lessons.map((l, lIdx)=>`
                <a class="stage-lesson-row" href="#/lesson/${l.id}">
                  <div class="stage-lesson-icon">🔒</div>
                  <div class="stage-lesson-info">
                    <div class="stage-lesson-name"><span>${esc(l.t)}</span></div>
                    <div class="stage-lesson-sub">${esc(l.out || "Bảng cân đối, Báo cáo P&L, Dòng tiền & Định giá cổ phiếu")}</div>
                  </div>
                  <div class="stage-lesson-meta">
                    <span class="stage-lesson-tag">Bài 4-${lIdx+1}</span>
                    <span class="stage-lesson-badge-sub" style="color:var(--muted)">0/2</span>
                    <span style="font-size:11px;color:var(--muted)">⌵</span>
                  </div>
                </a>
              `).join("")}
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT SIDEBAR: Notebook + Mistakes Review + Daily Challenge -->
      <div class="curr-side">
        <!-- Card 1: GHI CHÉP: Sổ tay của bạn -->
        <div class="notebook-widget-card">
          <div class="notebook-widget-badge">
            <span>📒</span> GHI CHÉP
          </div>
          <div class="notebook-widget-title">Sổ tay của bạn</div>
          <div class="notebook-widget-desc">Ghi lại điều vừa hiểu, trước khi quên.</div>
          <div class="notebook-ill-box">
            <svg viewBox="0 0 160 80" style="width:140px;height:70px">
              <defs>
                <linearGradient id="bookCover" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#D97706"/>
                  <stop offset="100%" stop-color="#92400E"/>
                </linearGradient>
                <linearGradient id="pageGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#FFFBEB"/>
                  <stop offset="50%" stop-color="#FEF3C7"/>
                  <stop offset="100%" stop-color="#FFFDF5"/>
                </linearGradient>
              </defs>
              <!-- Book Cover & Spine -->
              <path d="M 15 65 Q 80 72 145 65 L 150 18 Q 80 26 10 18 Z" fill="url(#bookCover)" filter="drop-shadow(0 4px 6px rgba(0,0,0,.15))"/>
              <!-- Open Book Pages Left & Right -->
              <path d="M 18 60 Q 80 67 80 62 L 80 20 Q 80 25 15 19 Z" fill="url(#pageGrad)"/>
              <path d="M 80 62 Q 80 67 142 60 L 145 19 Q 80 25 80 20 Z" fill="url(#pageGrad)"/>
              <!-- Book Spine Center -->
              <line x1="80" y1="20" x2="80" y2="62" stroke="#B45309" stroke-width="2"/>
              <!-- Text Lines Simulation -->
              <line x1="26" y1="28" x2="68" y2="28" stroke="#D97706" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/>
              <line x1="26" y1="36" x2="65" y2="36" stroke="#D97706" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/>
              <line x1="26" y1="44" x2="60" y2="44" stroke="#D97706" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/>
              <line x1="92" y1="28" x2="134" y2="28" stroke="#D97706" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/>
              <line x1="92" y1="36" x2="130" y2="36" stroke="#D97706" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/>
              <line x1="92" y1="44" x2="124" y2="44" stroke="#D97706" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/>
              <!-- Fountain Pen -->
              <line x1="110" y1="12" x2="65" y2="55" stroke="#1E293B" stroke-width="3" stroke-linecap="round"/>
              <line x1="68" y1="52" x2="60" y2="60" stroke="#F59E0B" stroke-width="2.5" stroke-linecap="round"/>
            </svg>
          </div>
          <a class="side-widget-link" href="#/settings" style="display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:700;color:#059669;text-decoration:none">
            Mở sổ tay › <span style="font-size:14px">→</span>
          </a>
        </div>

        <!-- Card 2: Câu sai cần ôn tập (40 câu) -->
        <div class="mistake-widget-card">
          <div class="mistake-widget-header">
            <div style="display:flex;align-items:center;gap:10px">
              <div class="mistake-widget-icon">!</div>
              <div style="font-size:14.5px;font-weight:800;color:var(--text)">Câu sai cần ôn tập</div>
            </div>
            <span class="mistake-widget-badge">40 câu</span>
          </div>
          <div class="mistake-widget-text">Bạn có 40 câu hỏi trắc nghiệm đã làm sai cần ôn lại để củng cố kiến thức.</div>
          <div style="display:flex;align-items:center;justify-content:space-between">
            <a href="#/review" style="font-size:15px;font-weight:800;color:#EA580C;text-decoration:none">→</a>
            <!-- Botanical Leaf Accent -->
            <svg viewBox="0 0 40 40" style="width:32px;height:32px;opacity:0.25">
              <path d="M 5 35 Q 20 5 35 5 Q 35 20 5 35 Z" fill="#059669"/>
              <path d="M 5 35 Q 25 20 35 5" stroke="#047857" stroke-width="1.5" fill="none"/>
            </svg>
          </div>
        </div>

        <!-- Card 3: Thử thách tài chính mỗi ngày (Interactive) -->
        <div class="daily-challenge-box" style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-card);padding:20px;box-shadow:var(--shadow-card)">
          <div class="row" style="justify-content:space-between;align-items:center;margin-bottom:12px">
            <div style="display:flex;align-items:center;gap:8px;font-size:14px;font-weight:800;color:var(--text)">
              <span style="font-size:16px">📖</span> Thử thách tài chính mỗi ngày
            </div>
            <div style="display:flex;align-items:center;gap:6px;font-size:11.5px;color:var(--muted)">
              <span>⤢</span>
              <span>• Thu gọn ^</span>
            </div>
          </div>
          <div style="margin-bottom:10px">
            <span class="daily-q-tag" style="background:#ECFDF5;color:#059669;font-size:11px;font-weight:800;padding:3px 8px;border-radius:4px">${esc(dc.tag || "TÍNH NHANH")}</span>
          </div>
          <div class="daily-q-text" style="font-size:13.5px;font-weight:700;color:var(--text);line-height:1.45;margin-bottom:14px">
            ${esc(dc.q || "Thu nhập 25 triệu một tháng, đang trả nợ vay 11 triệu. Tỷ lệ nợ trên thu nhập sau khi vay thêm rơi vào vùng nào?")}
          </div>

          <div class="daily-opt-list" style="display:flex;flex-direction:column;gap:8px">
            ${dc.opts.map(([k, tx, why])=>{
              const isSelected = (DAILY_UI.picked === k) || (dcState && dcState.picked === k);
              let stateCls = "";
              if(dcState){
                if(k === dc.correct) stateCls = "ok";
                else if(dcState.picked === k) stateCls = "no";
              } else if(DAILY_UI.picked === k){
                stateCls = "picked";
              }
              return `<div class="daily-opt-item ${stateCls}" onclick="${dcState?'':`ACT.pickDailyOpt('${k}')`}" style="display:flex;align-items:center;gap:10px;padding:10px 12px;border:1.5px solid ${isSelected?'var(--primary)':'var(--border)'};border-radius:10px;cursor:pointer;background:${isSelected?'var(--primary-soft)':'var(--surface)'};transition:all .15s ease">
                <span class="daily-opt-badge" style="width:24px;height:24px;border-radius:6px;background:${isSelected?'var(--primary)':'var(--surface-3)'};color:${isSelected?'#FFF':'var(--muted)'};font-size:11.5px;font-weight:800;display:flex;align-items:center;justify-content:center;flex:none">${k}</span>
                <span style="flex:1;font-size:12.5px;font-weight:600;color:var(--text);line-height:1.4">${esc(tx)}</span>
                ${dcState && k === dc.correct ? `<span style="color:var(--emerald);font-weight:800">✓</span>` : ""}
              </div>`;
            }).join("")}
          </div>

          ${dcState ? `
            <div class="callout ${dcState.correct?'tip':'warn'}" style="margin-top:12px;padding:10px 12px;font-size:12.5px">
              <b>${dcState.correct?'Chính xác! +15 XP':'Chưa đúng:'}</b> ${esc(dc.opts.find(o=>o[0]===dc.correct)[2])}
            </div>
          ` : `
            <button class="daily-submit-btn ${DAILY_UI.picked?'active':''}" onclick="ACT.submitDaily()" style="width:100%;padding:10px 14px;border-radius:10px;background:${DAILY_UI.picked?'#059669':'var(--surface-3)'};color:${DAILY_UI.picked?'#FFF':'var(--muted)'};border:none;font-weight:800;font-size:12.5px;cursor:${DAILY_UI.picked?'pointer':'default'};margin-top:10px;display:flex;align-items:center;justify-content:center;gap:6px">
              <span>✈ GỬI CÂU TRẢ LỜI</span>
            </button>
          `}
        </div>
      </div>
  </div>`;
}

/* ════════ 3. LESSON PAGE (READER & PRACTICE WORKSPACE) ════════ */
const rich = s => esc(s).replace(/\*\*(.+?)\*\*/g,"<b>$1</b>").replace(/\*(.+?)\*/g,"<i>$1</i>");
const lessonContent = id => (window.LESSON_CONTENT||{})[id];
/* chế độ EN dùng bản dịch nếu bài đó đã có; chưa có thì giữ bản tiếng Việt */
const lessonC = id => ((window.I18N&&I18N.lang==="en") && (window.LESSON_CONTENT_EN||{})[id]) || lessonContent(id);

/* bài trong lộ trình, nội dung đang biên soạn — hiển thị rõ thay vì mượn nội dung bài khác */
function vLessonSoon(l, m, t, mIdx, lIdx){
  const nextReady = (window.LESSONS||[]).find(x=>x.track===l.track && !x.soon && State.lessonStatus(x.id)!=="done")
                 || (window.LESSONS||[]).find(x=>!x.soon);
  return `<div style="max-width:720px;margin:0 auto;padding:48px 20px">
    <a class="reader-back-btn" href="#/tracks">← Quay lại lộ trình</a>
    <div class="card" style="margin-top:20px;padding:32px">
      <div class="tag" style="background:#FEF3C7;color:#92400E;font-weight:800;font-size:11px;padding:4px 10px;border-radius:6px">ĐANG BIÊN SOẠN</div>
      <h1 style="margin:14px 0 6px;font-size:26px;line-height:1.25">${esc(l.t)}</h1>
      <div class="muted" style="font-size:13px">${esc(t?t.n:"")} · ${esc(m.vi||m.n)} · Chặng ${mIdx+1} • Bài ${lIdx+1} · ${l.m} phút · output: ${esc(l.out||"")}</div>
      <p style="margin:18px 0 0;line-height:1.7">Bài này đã có trong lộ trình nhưng phần nội dung 10 mục (bài đọc, mini case, bài tập tính, checklist)
         vẫn đang được biên soạn và đối chiếu số liệu. Chúng tôi chỉ mở bài khi đáp án đã được kiểm chứng.</p>
      ${nextReady?`<a class="btn" style="margin-top:20px;display:inline-block" href="#/lesson/${nextReady.id}">Học bài đã sẵn sàng: ${esc(nextReady.t)}</a>`:""}
    </div>
  </div>`;
}

function vLesson(id){
  const l = window.LESSON_BY_ID[id] || window.LESSON_BY_ID["f-profit-2"];
  const m = window.MODULE_BY_ID[l.module] || window.MODULES[0];
  const t = window.TRACK_BY_ID[l.track];
  const mIdx = window.MODULES.findIndex(x=>x.id===m.id);
  const lIdx = m.lessons.findIndex(x=>x.id===l.id);
  const own = lessonC(l.id), C = own || lessonC("f-profit-2") || lessonContent("f-profit-2");
  /* bài đã nằm trong lộ trình nhưng chưa biên soạn xong: không mượn nội dung bài khác */
  if(!own) return vLessonSoon(l, m, t, mIdx, lIdx);
  const rec = State.touchLesson(l.id), done = rec.status==="done";
  const qb = rec.quiz.branch, qc = rec.quiz.calc;
  const chkN = C.checklist.filter((_,i)=>rec.chk[i]).length;
  const nextL = State.nextLessonAfter(l.id);
  const qScore = q => !q ? "—" : q.correct ? 100 : 0;
  const qDone = [qb,qc].filter(Boolean).length;
  const arena = C.arena && window.CASE_BY_ID[C.arena];

  const readerPrefs = State.getReaderPrefs();
  const isBookmarked = State.isBookmarked(l.id);
  const lessonNote = State.getLessonNote(l.id);

  return `<div>
    <!-- FLOATING MILESTONE DOCK (LEFT) -->
    <div class="lesson-milestone-dock">
      <div class="milestone-dock-flag">⚑</div>
      <div class="milestone-dock-toast" id="milestoneToast">
        <div class="dock-toast-h"><span style="font-size:14px">✨</span> <b>Chúc mừng!</b> Bạn đã đọc 25%</div>
        <div class="dock-toast-sub">Hãy tiếp tục - bạn đang làm rất tốt!</div>
        <button class="dock-toast-close" onclick="document.getElementById('milestoneToast').style.display='none'">ĐÓNG</button>
      </div>
    </div>

    <!-- FLOATING FAB (BOTTOM RIGHT) -->
    <div class="floating-fab-btn" onclick="location.hash='#/arena'">
      <span>☰</span>
      <span class="fab-badge">9+</span>
    </div>

    <!-- STICKY TOPBAR -->
    <div class="reader-topbar">
      <div class="reader-topbar-left">
        <a class="reader-back-btn" href="#/tracks">← Quay lại</a>
        <div style="min-width:0">
          <div class="reader-nav-title">${esc(l.t)}</div>
          <div class="reader-nav-sub">Chặng ${mIdx+1} • Bài ${lIdx+1}</div>
        </div>
      </div>
      <div class="reader-topbar-right">
        <div class="font-ctrl-group">
          <button class="font-ctrl-btn" onclick="ACT.setReaderFont(-10)">A-</button>
          <span>${readerPrefs.fontSize || 113}%</span>
          <button class="font-ctrl-btn" onclick="ACT.setReaderFont(10)">A+</button>
        </div>
        <div class="font-ctrl-group" style="padding:2px 4px">
          <button class="font-ctrl-btn" onclick="toggleTheme()" title="Chế độ sáng">☀</button>
          <button class="font-ctrl-btn" onclick="ACT.setReaderReadingTheme('${readerPrefs.theme==='sepia'?'light':'sepia'}')" title="Chế độ đọc sách">📖</button>
          <button class="font-ctrl-btn" onclick="toggleTheme()" title="Chế độ tối">☾</button>
        </div>
        <button class="bookmark-btn ${isBookmarked?'on':''}" onclick="ACT.toggleBookmark('${l.id}')" title="Lưu bài học">
          ${isBookmarked?'🔖':'📑'}
        </button>
        <div style="width:28px;height:28px;border-radius:50%;background:#D1FAE5;color:#059669;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:13px">✓</div>
        <button class="bookmark-btn" onclick="location.hash='#/stats'" title="Thống kê">📊</button>
        <span class="status-pill-badge ${done?'done':''}" style="background:#F3F4F6;color:#4B5563;font-weight:700">
          ● ${done ? "Đọc xong!" : "Đang đọc"}
        </span>
        <div style="display:flex;align-items:center;gap:6px;font-size:12px;font-weight:700;color:var(--muted)">
          <div style="width:50px;height:5px;background:#D1D5DB;border-radius:999px;overflow:hidden">
            <div style="width:${done?100:qDone*50}%;height:100%;background:#6B7280;border-radius:999px"></div>
          </div>
          <span>${qDone}/2</span>
        </div>
        <span class="tag" style="background:#F3F4F6;color:#374151;font-weight:800;font-size:11px;padding:4px 10px;border-radius:6px">CHẶNG ${mIdx+1} • BÀI ${lIdx+1}</span>
      </div>
    </div>

    <!-- 2-COLUMNS WORKSPACE -->
    <div class="reader-workspace-grid">
      <!-- LEFT / MAIN: Reading + Framework + Explanations -->
      <div class="reader-article-col reader-body-scale sz-${readerPrefs.fontSize||113}">
        <div class="lesson-meta-header">
          <div class="lesson-diff-tag">CHẶNG ${mIdx+1} • BÀI ${lIdx+1} • ${DIFF[l.lv] || "DỄ"}</div>
          <h1 class="lesson-main-title">${esc(l.t)}</h1>
          <p class="lesson-hook-text">${esc(C.outcome || (C.scenario ? C.scenario.ask : l.out))}</p>
          <div class="lesson-info-row">
            <span>~${l.m || 6} phút cả bài</span>
            <span class="dot-sep">•</span>
            <span>Mini case + bài tính</span>
            <span class="dot-sep">•</span>
            <span style="color:${done?"var(--emerald)":"var(--muted)"};font-weight:700">${done?"Đã hoàn thành":`${qDone}/2 đã làm`}</span>
          </div>
          <div class="bar mb" style="height:4px;background:#E5E7EB">${bar(done?100:qDone*50, 'emerald')}</div>
        </div>

        <!-- ĐIỀU KIỆN HOÀN THÀNH — lấy từ trạng thái thật của bài, không tick sẵn -->
        ${(()=>{ const items=[[qb&&qb.correct,"Chọn đúng mini case"],[qc&&qc.correct,"Tính đúng bài tập"],[chkN>=3,`Tick ít nhất 3 mục checklist (${chkN}/5)`]];
          const all=items.every(x=>x[0]);
          return `<div class="xp-conditions-box" style="background:${all?"#ECFDF5":"#F9FAFB"};border:1.5px solid ${all?"#10B981":"#E5E7EB"};border-radius:12px;padding:16px 20px;margin-bottom:20px">
          <div class="xp-conditions-title" style="font-size:12px;font-weight:800;color:${all?"#059669":"#6B7280"};margin-bottom:10px;display:flex;align-items:center;gap:6px">
            <span>${all?"✓":"○"}</span> ĐIỀU KIỆN HOÀN THÀNH & NHẬN XP
          </div>
          ${items.map(([ok,txt],i)=>`<div class="xp-cond-item" style="color:${ok?"#065F46":"#6B7280"};${i<2?"margin-bottom:7px;":""}display:flex;align-items:center;gap:8px;font-weight:600">
            <span style="color:${ok?"#059669":"#9CA3AF"};font-weight:800">${ok?"✓":"○"}</span><span>${txt}</span></div>`).join("")}
        </div>`; })()}

        <!-- AI CASE COACH CALLOUT (Tài Tài - Exact Replica) -->
        <div class="ai-coach-box" style="background:#18181B;color:#FFF;border-radius:12px;padding:16px 20px;margin-bottom:24px;border:none;box-shadow:0 4px 12px rgba(0,0,0,.15)">
          <div class="ai-coach-av" style="background:#27272A;color:#FFF">🤖</div>
          <div class="ai-coach-content">
            <div class="ai-coach-header">
              <span class="ai-coach-name" style="color:#FAFAFA;font-weight:800">Tài Tài · <span style="font-weight:500;color:#A1A1AA">mẹo tự động cho bài này</span></span>
              <span class="ai-coach-tag" style="background:#27272A;color:#A1A1AA;font-size:10px">TỰ ĐỘNG</span>
            </div>
            <p class="ai-coach-text" style="color:#E4E4E7;font-size:13.5px;margin:0">${rich(C.fw.warn || (C.mistakes[0]||["",""])[1])}</p>
          </div>
        </div>

        ${own?"":`<div class="callout tip mb"><b>Bài mẫu minh hoạ:</b> nội dung 10 phần của bài này đang biên soạn. Phần dưới là bài <i>${esc(lessonTitle("f-profit-2"))}</i> để bạn thấy khuôn bài học; tiến độ, quiz và checklist vẫn được lưu cho đúng bài này.</div>`}

        ${(()=>{ const rd = own && readingOf(l.id); if(!rd) return "";
            return `<section class="lsec reading mt">
              <div class="lsec-h"><span class="lsec-n">A</span><h2>Bài đọc chuyên sâu</h2>
                <span class="tag" style="margin-left:auto">${readMinutes(rd)} phút đọc</span></div>
              <div class="rd">${readingHTML(rd)}</div>
              <div class="callout tip mt-s"><b>Tiếp theo:</b> mười phần bên dưới bắt bạn làm lại chính những gì vừa đọc — dựng khung, đọc số, tính ra con số, viết một câu kết luận.</div>
            </section>`; })()}

        <div class="lesson-content-blocks mt">
          ${lsec(1,"Vì sao bài này quan trọng trong business case",`
            <p>${rich(C.why)}</p>
            <div class="callout"><b>Bạn sẽ làm được sau bài này:</b> ${rich(C.outcome)}</div>`)}

          ${lsec(2,"Tình huống mở đầu",`
            <div class="brief" style="border-left-color:var(--amber)">
              <div class="lbl mb">Tình huống</div>
              <p style="margin:0">${rich(C.scenario.text)}</p>
              <p style="margin:10px 0 0;font-weight:600">${rich(C.scenario.ask)}</p>
            </div>`)}

          ${lsec(3,"Framework chính",`
            <div class="fw">
              <div class="fw-h">${rich(C.fw.title)}</div>
              <div class="fw-b">${C.fw.rows.map(([k,v])=>`<div class="fw-row"><div class="k">${rich(k)}</div><div>${rich(v)}</div></div>`).join("")}</div>
            </div>
            ${C.fw.warn?`<div class="callout warn mt"><b>Lưu ý:</b> ${rich(C.fw.warn)}</div>`:""}`)}

          ${lsec(4,"Ví dụ có số liệu thực tế",`
            <div class="card"><div class="card-b">
              <div class="lbl mb">${esc(C.ex.label)}</div>
              <table class="tb"><tbody>
                ${C.ex.rows.map(([k,v,d,dir])=>`<tr><td>${rich(k)}</td><td class="r num">${esc(v)}</td>
                  <td class="r">${d?(dir?`<span class="delta ${dir}">${esc(d)}</span>`:`<span class="muted small">${esc(d)}</span>`):""}</td></tr>`).join("")}
              </tbody></table>
              <div class="callout ok mt"><b>Đọc ra gì:</b> ${rich(C.ex.read)}</div>
            </div></div>`)}

          ${lsec(5,"Mẫu trình bày slide & Lời nói",`
            <div class="card"><div class="card-b">
              <div class="lbl mb">${C.slide.speak?"Câu mở đầu":"Khung slide đề xuất"}</div>
              <div style="border:1px solid var(--border);border-radius:8px;overflow:hidden">
                <div style="background:var(--surface-3);color:var(--text);padding:11px 14px;font-weight:650;font-size:13px;border-bottom:1px solid var(--border)">${esc(C.slide.headline)}</div>
                <div class="grid split-even" style="padding:14px;gap:12px">
                  <div><div class="lbl mb">${C.slide.speak?"Nói tiếp":"Biểu đồ trái"}</div><div class="small muted">${rich(C.slide.left)}</div></div>
                  <div><div class="lbl mb">${C.slide.speak?"Chốt lại":"Phải"}</div><div class="small muted">${rich(C.slide.right)}</div></div>
                </div>
              </div>
              <div class="callout tip mt"><b>Quy tắc vàng:</b> ${rich(C.slide.rule)}</div>
            </div></div>`)}

          ${lsec(6,"Lỗi thường gặp trong case",`
            <div class="card"><div class="card-b" style="padding-top:8px">
              ${C.mistakes.map(([tt,d],i,a)=>`<div style="display:flex;gap:11px;padding:10px 0;border-bottom:${i<a.length-1?'1px solid var(--border)':'0'}">
                  <span class="tag tag-r" style="flex:none">${i+1}</span>
                  <div><b style="font-size:13px">${rich(tt)}</b><div class="small muted mt-s">${rich(d)}</div></div></div>`).join("")}
            </div></div>`)}

          ${lsec(7,"Checklist tự đánh giá cuối bài",`
            <div class="card"><div class="card-b" style="padding-top:8px">
              ${C.checklist.map((c,i)=>`<div class="chk-item pick" onclick="ACT.toggleCheck('${l.id}',${i})">
                <span class="chk-box ${rec.chk[i]?'on':''}">✓</span><span>${rich(c)}</span></div>`).join("")}
            </div></div>`)}
        </div>
      </div>

      <!-- RIGHT / SIDEBAR: Notes + Sticky Quick Check Quiz (Exact replica of screenshot) -->
      <div class="reader-practice-col">
        <!-- Notes Widget -->
        <div class="notes-drawer-card mb" style="background:#FFF;border:1px solid #E5E7EB;border-radius:12px;padding:14px 18px;box-shadow:0 1px 3px rgba(0,0,0,.04)">
          <div class="notes-drawer-h" style="display:flex;align-items:center;justify-content:space-between">
            <div class="notes-drawer-t" style="display:flex;align-items:center;gap:6px;font-size:13.5px;font-weight:700">
              <span>📝</span> Ghi chú <span class="small muted">(${lessonNote.length ? "1" : "0"})</span>
            </div>
            <a class="notes-drawer-action" href="javascript:void(0)" onclick="const ta=document.getElementById('noteTa-${l.id}');ta.style.display=ta.style.display==='none'?'block':'none'" style="font-size:12px;color:#6B7280;text-decoration:none">Mở rộng</a>
          </div>
          <textarea id="noteTa-${l.id}" class="notes-textarea" style="margin-top:10px;display:${lessonNote.length?'block':'none'}" placeholder="Ghi chép nhanh điều bạn vừa hiểu..."
            oninput="ACT.saveLessonNote('${l.id}', this.value)">${esc(lessonNote)}</textarea>
        </div>

        <!-- Quick Check Quiz Card -->
        <div class="quick-quiz-panel" style="background:#FFF;border:1px solid #E5E7EB;border-radius:16px;padding:20px;box-shadow:0 1px 3px rgba(0,0,0,.04)">
          <div class="quick-quiz-header" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
            <span class="quick-quiz-title" style="font-size:13px;font-weight:800;letter-spacing:.04em;color:#111827">KIỂM TRA NHANH</span>
            <div style="display:flex;align-items:center;gap:6px">
              <span class="quick-quiz-count" style="font-size:12px;font-weight:700;color:#6B7280">${qDone}/2</span>
              <span style="font-size:11px;color:#9CA3AF">▲</span>
            </div>
          </div>

          <!-- Hai vạch tiến độ: mini case · bài tính. Xám = chưa làm, xanh = đúng, đỏ = sai -->
          ${(()=>{ const dash=q=>!q?"#E5E7EB":q.correct?"#10B981":"#EF4444";
            const pill=q=>!q?`<span class="quiz-step-status" style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:999px;background:#F3F4F6;color:#6B7280">Chưa làm</span>`
              : q.correct?`<span class="quiz-step-status" style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:999px;background:#D1FAE5;color:#059669">Đúng</span>`
              : `<span class="quiz-step-status" style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:999px;background:#FEE2E2;color:#DC2626">Chưa đúng</span>`;
            const card=`background:#FFF;border:1px solid #E5E7EB;border-radius:12px;padding:16px`;
            const opt=o=>{ const picked=qb&&qb.pick===o[0], right=o[0]===C.mini.correct, show=!!qb;
              const st= show&&right ? "border:1.5px solid #10B981;background:#ECFDF5;color:#065F46"
                      : show&&picked ? "border:1.5px solid #EF4444;background:#FEF2F2;color:#991B1B"
                      : "border:1px solid #E5E7EB;background:#FFF;color:#374151;cursor:pointer";
              return `<div class="quiz-step-opt" ${show?"":`onclick="ACT.pickBranch('${l.id}','${o[0]}')"`} style="display:flex;align-items:flex-start;gap:10px;padding:10px 12px;border-radius:10px;font-size:13px;font-weight:600;${st}">
                <span class="quiz-opt-letter" style="width:24px;height:24px;border-radius:6px;background:#F3F4F6;color:#6B7280;font-size:11.5px;font-weight:800;display:flex;align-items:center;justify-content:center;flex:none">${o[0]}</span>
                <span class="quiz-opt-label" style="flex:1">${rich(o[1])}${show&&(right||picked)&&o[2]?`<span style="display:block;margin-top:6px;font-weight:500;font-size:12px;color:#4B5563">${rich(o[2])}</span>`:""}</span>
                ${show&&right?`<span class="quiz-opt-check" style="color:#059669;font-weight:800;font-size:16px">✓</span>`:""}
              </div>`; };
            return `<div class="quiz-dash-bar" style="display:flex;gap:6px;margin-bottom:18px">
              <div class="quiz-dash-item" style="height:6px;flex:1;border-radius:999px;background:${dash(qb)}"></div>
              <div class="quiz-dash-item" style="height:6px;flex:1;border-radius:999px;background:${dash(qc)}"></div>
            </div>

            <div class="quiz-step-card" style="${card};margin-bottom:12px">
              <div class="quiz-step-header" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
                <span class="quiz-step-num" style="font-size:12px;font-weight:800;color:#6B7280">CÂU 1 / 2 · MINI CASE</span>${pill(qb)}
              </div>
              <div class="quiz-step-q" style="font-size:14px;font-weight:800;color:#111827;line-height:1.4;margin-bottom:14px">${rich(C.mini.q)}</div>
              <div class="quiz-step-options" style="display:flex;flex-direction:column;gap:8px">${C.mini.opts.map(opt).join("")}</div>
            </div>

            <div class="quiz-step-card" style="${card}">
              <div class="quiz-step-header" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
                <span class="quiz-step-num" style="font-size:12px;font-weight:800;color:#6B7280">CÂU 2 / 2 · BÀI TÍNH</span>${pill(qc)}
              </div>
              <div class="quiz-step-q" style="font-size:14px;font-weight:800;color:#111827;line-height:1.4;margin-bottom:12px">${rich(C.calc.q)}</div>
              ${qc
                ? `<div class="small" style="margin-bottom:8px;color:#4B5563">Bạn trả lời: <b>${qc.value!=null?viNum(qc.value):"—"}</b> ${esc(C.calc.unit)}</div>
                   <div class="callout ${qc.correct?"ok":"warn"}" style="padding:10px 12px;font-size:12.5px"><b>Lời giải:</b> ${rich(C.calc.solution)}</div>`
                : `<div style="display:flex;gap:8px;align-items:center">
                     <input class="calc" id="calc-${l.id}" inputmode="decimal" placeholder="Nhập con số" style="flex:1;min-width:0"
                       onkeydown="if(event.key==='Enter')ACT.checkCalc('${l.id}')">
                     <span class="small muted">${esc(C.calc.unit)}</span>
                     <button class="btn btn-sm btn-p" onclick="ACT.checkCalc('${l.id}')">Kiểm tra</button>
                   </div>
                   ${C.calc.hint?`<div class="small muted" style="margin-top:8px">Gợi ý: ${rich(C.calc.hint)}</div>`:""}`}
            </div>`; })()}

          <!-- Action buttons -->
          <div style="margin-top:16px">
            <button class="btn btn-p" style="width:100%;background:#064E3B;color:#FFF;padding:10px;border-radius:10px;font-weight:800" onclick="ACT.completeLesson('${l.id}')">
              ${done?"Đã hoàn thành ✓":`Hoàn thành bài · +${State.XP.lesson} XP`}
            </button>
            ${nextL?`<a class="btn btn-sm btn-gh" style="width:100%;margin-top:6px;text-align:center;display:block" href="#/lesson/${nextL.id}">Bài tiếp theo →</a>`:""}
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

/* Bài đọc: "## " tiêu đề · "> " đoạn thoại · "- " gạch đầu dòng · còn lại là đoạn văn */
function readingHTML(text){
  const out=[]; let list=[], quote=[];
  const flush=()=>{ if(list.length){ out.push(`<ul class="rd-list">${list.map(x=>`<li>${rich(x)}</li>`).join("")}</ul>`); list=[]; }
                    if(quote.length){ out.push(`<blockquote class="rd-q">${quote.map(x=>`<p>${rich(x)}</p>`).join("")}</blockquote>`); quote=[]; } };
  text.split(/\n{2,}/).forEach(block=>{
    const b=block.trim(); if(!b) return;
    if(b.startsWith("## ")){ flush(); out.push(`<h3 class="rd-h">${esc(b.slice(3))}</h3>`); return; }
    if(b.startsWith("> ")){ if(list.length) flush(); quote.push(b.slice(2)); return; }
    if(b.startsWith("- ")){ if(quote.length) flush(); b.split(/\n/).forEach(x=>list.push(x.replace(/^- /,""))); return; }
    flush(); out.push(`<p>${rich(b)}</p>`);
  });
  flush(); return out.join("");
}
const readingOf = id => (window.READING||{})[id];
const readMinutes = t => Math.max(3, Math.round(t.split(/\s+/).length/180));

function lsec(n,title,body){
  return `<section class="lsec"><div class="lsec-h"><span class="lsec-n">${n}</span><h2>${esc(title)}</h2></div>${body}</section>`;
}

/* ════════ 4. CASE PRACTICE ARENA ════════ */
function vArena(caseId){
  const c = window.CASE_BY_ID[caseId] || window.CASE_BY_ID["cl-01"];
  const spec = SCORING.cases[c.id];
  if(ARENA.caseId!==c.id){
    const d = (State.caseRec(c.id)||{}).draft;
    Object.assign(ARENA, {caseId:c.id, start:Date.now(), rec:d?d.rec:"", usedModel:false, preview:null});
  }
  if(!spec) return vArenaPending(c);
  const r = State.caseRec(c.id), d = (r&&r.draft) || {problem:"",hyps:["","","",""],evidence:""};
  const ind = (window.INDUSTRIES.find(i=>i.id===c.ind)||{}).n || c.ind;
  const L = Object.assign({problem:"1 · Vấn đề bạn đang giải là gì", hyps:"2 · Hypothesis tree",
                           evidence:"3 · Bằng chứng từ exhibit"}, spec.labels||{});

  return `<div class="arena">
  <div class="arena-l">
    <div class="row" style="justify-content:space-between;flex-wrap:wrap;gap:10px">
      <div>
        <div class="lbl">Practice Arena · ${esc(c.co)} · ${esc(ind)}</div>
        <h1 style="margin-top:3px">${esc(c.t)}</h1>
      </div>
      <div class="row"><span class="timer" id="arenaTimer">◷ ${c.min}:00</span>
        <span class="tag tag-accent">${esc(c.type)}</span>${diffBadge(c.diff)}</div>
    </div>

    <div class="brief mt">
      <div class="lbl mb">Đề bài</div>
      <p style="margin:0 0 10px">${esc(spec.brief.context)}</p>
      <p style="margin:0"><b>Nhiệm vụ:</b> ${esc(spec.brief.task)}</p>
      <p class="small muted" style="margin:10px 0 0">Số liệu minh hoạ cho mục đích luyện tập, không phải số liệu công bố của doanh nghiệp.</p>
    </div>

    ${spec.exhibits.map(renderExhibit).join("")}
  </div>

  <div class="arena-r">
    <div class="row mb" style="justify-content:space-between">
      <h2>Answer canvas</h2>
      <span class="tag ${r&&r.attempts?"tag-e":"tag-a"}">${r&&r.attempts?`${r.attempts} lần nộp · cao nhất ${r.best}`:r&&r.draft?"Có nháp":"Chưa nộp"}</span>
    </div>

    <div class="canvas-field">
      <label class="lbl" for="a-problem">${esc(L.problem)}</label>
      <textarea id="a-problem" rows="2" placeholder="Viết problem statement một câu…">${esc(d.problem)}</textarea>
    </div>

    <div class="canvas-field">
      <label class="lbl">${esc(L.hyps)}</label>
      ${[0,1,2,3].map(i=>`<div class="hyp-row"><span class="n">H${i+1}</span>
         <input id="a-h${i}" value="${esc((d.hyps||[])[i]||"")}" placeholder="${i<3?"Giả thuyết "+(i+1):"Giả thuyết thêm (không bắt buộc)"}"
          style="flex:1;background:var(--surface-2);border:1px solid var(--border);border-radius:8px;padding:8px 10px;font-size:12.5px"></div>`).join("")}
    </div>

    <div class="canvas-field">
      <label class="lbl" for="a-evidence">${esc(L.evidence)}</label>
      <textarea id="a-evidence" rows="4" placeholder="Số liệu nào ủng hộ hoặc bác bỏ từng giả thuyết? Ghi rõ Ex.1, Ex.2…">${esc(d.evidence)}</textarea>
    </div>

    <div class="canvas-field">
      <label class="lbl">4 · Khuyến nghị</label>
      ${spec.options.map(([k,tx])=>`<div class="opt pick ${ARENA.rec===k?'sel':''}" data-rec="${k}" onclick="ACT.arenaPick('${k}')">
        <span class="k">${k}</span><span class="t">${esc(tx)}</span></div>`).join("")}
    </div>

    <div class="row" style="gap:9px">
      <button class="btn btn-p" style="flex:1" onclick="ACT.arenaSubmit('${c.id}')">Nộp bài</button>
      <button class="btn" onclick="ACT.arenaDraft('${c.id}')">Lưu nháp</button>
      <button class="btn btn-gh" onclick="ACT.arenaModel('${c.id}')">Bài mẫu</button>
    </div>

    ${ARENA.preview?`<div class="card mt" style="border-style:dashed">
      <div class="card-h"><h3>Điểm bài mẫu</h3><span class="tag tag-a num">${ARENA.preview.total} · không tính</span></div>
      <div class="card-b" style="padding-top:8px">
        ${ARENA.preview.dims.map(([n,v])=>`<div class="rubric-row"><span class="nm">${esc(n)}</span>${bar(v)}<span class="sc num">${v}</span></div>`).join("")}
        <p class="small muted" style="margin:8px 0 0">Xoá nội dung và tự viết lại để được chấm thật. <button class="btn btn-sm btn-gh" style="padding:0" onclick="Object.assign(ARENA,{usedModel:false,preview:null,rec:''});State.saveDraft('${c.id}',{problem:'',hyps:['','','',''],evidence:'',rec:''});render(true)">Làm lại từ đầu</button></p>
      </div></div>`:""}

    <div class="card mt">
      <div class="card-h"><h3>Rubric chấm điểm</h3>${r&&r.lastDims?`<span class="tag tag-e num">${r.last.total}</span>`:""}</div>
      ${r&&r.lastDims?`
      <div class="card-b" style="padding-top:8px">
        ${r.lastDims.map(([n,v])=>`<div class="rubric-row"><span class="nm">${esc(n)}</span>${bar(v, v>=80?"":v>=50?"amber":"rose")}<span class="sc num">${v}</span></div>`).join("")}
      </div>
      <div class="card-f">
        <div class="callout ${r.last.total>=80?"ok":""}" style="padding:10px 12px;font-size:12.5px"><b>Feedback lần nộp gần nhất:</b> ${esc(r.feedback)}</div>
        <div class="small muted mt-s">Chấm tự động theo cấu trúc, con số then chốt và khuyến nghị. Lần nộp sau chỉ cộng XP phần vượt điểm cao nhất.</div>
      </div>`
      :`<div class="card-b"><p class="small muted" style="margin:0">Chấm theo 6 tiêu chí: Problem framing · Structure · Analysis & math · Insight · Feasibility · Storytelling. Nộp bài để xem điểm; mọi lỗi phát hiện được sẽ vào Mistake Review.</p></div>`}
    </div>
  </div></div>`;
}

function vArenaPending(c){
  const ind = (window.INDUSTRIES.find(i=>i.id===c.ind)||{}).n || c.ind;
  const ready = window.CASES.filter(x=>SCORING.cases[x.id]);
  return `<div class="main">
  <div class="lbl">Practice Arena · ${esc(c.co)} · ${esc(ind)}</div>
  <h1 style="margin-top:3px">${esc(c.t)}</h1>
  <div class="wrap-row mt-s"><span class="tag tag-accent">${esc(c.type)}</span><span class="tag">${c.min} phút</span>${diffBadge(c.diff)}
    ${c.skills.map(s=>`<span class="tag tag-neutral">${esc(window.SKILL_NAMES[s])}</span>`).join("")}</div>
  <div class="brief mt"><div class="lbl mb">Tóm tắt đề</div><p style="margin:0">${esc(c.hook)}</p></div>
  <div class="empty mt">Exhibit và rubric chấm của case này đang được biên soạn.<br>
    Hiện có ${ready.length} đề đầy đủ để luyện:
    <div class="row mt" style="justify-content:center">${ready.map(x=>`<a class="btn btn-p" href="#/arena/${x.id}">${esc(x.t)} →</a>`).join("")}</div>
  </div></div>`;
}

/* ── exhibit: bars · table · metrics ── */
const viNum = v => Number.isInteger(+v) && Math.abs(+v) >= 1000 ? (+v).toLocaleString("de-DE") : String(v).replace(".",",");
function renderExhibit(ex, i){
  let body = "";
  if(ex.kind==="bars") body = `${ex.headline?`<div class="chart-t">${esc(ex.headline)}</div>`:""}
    ${ex.sub?`<div class="chart-s">${esc(ex.sub)}</div>`:""}${barChart(ex)}`;
  else if(ex.kind==="table"){
    const cell = (c,j) => { const o = typeof c==="object" ? c : {t:c};
      const inner = o.d ? `<span class="delta ${o.d}">${esc(o.t)}</span>` : o.b ? `<b>${esc(o.t)}</b>` : esc(o.t);
      return `<td class="${j?"r num":""}">${inner}</td>`; };
    body = `<div style="overflow-x:auto"><table class="tb"><thead><tr>${ex.head.map((h,j)=>`<th class="${j?"r":""}">${esc(h)}</th>`).join("")}</tr></thead>
      <tbody>${ex.rows.map(r=>`<tr>${r.map(cell).join("")}</tr>`).join("")}</tbody></table></div>`;
  }
  else if(ex.kind==="metrics") body = `<div class="grid g2">${ex.items.map(([k,v,n])=>`<div class="metric card" style="box-shadow:none">
      <div class="k">${esc(k)}</div><div class="v ${String(v).length>9?"":"num"}" style="${String(v).length>9?"font-size:17px":""}">${esc(v)}</div>
      ${n?`<div class="n">${esc(n)}</div>`:""}</div>`).join("")}</div>`;
  return `<div class="databox">
    <div class="databox-h"><span class="tag tag-neutral">Exhibit ${i+1}</span>
      <span class="small" style="font-weight:600">${esc(ex.title)}</span>
      ${ex.unit?`<span class="small muted" style="margin-left:auto">${esc(ex.unit)}</span>`:""}</div>
    <div class="exhibit">${body}</div></div>`;
}

/* biểu đồ cột ngang, vẽ bằng SVG */
function barChart({rows, max, ticks, threshold}){
  const W=560, bh=26, gap=14, H=16+rows.length*(bh+gap)+14;
  const pad = Math.min(210, Math.max(96, Math.max(...rows.map(r=>r[0].length))*6.4+12));
  const x = v => pad + (v/max)*(W-pad-40);
  ticks = ticks || [0,max/4,max/2,max*3/4,max];
  return `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block" role="img">
    ${ticks.map(v=>`<line x1="${x(v)}" y1="6" x2="${x(v)}" y2="${H-20}" stroke="var(--border)" stroke-width="1"/>
      <text x="${x(v)}" y="${H-6}" font-size="9.5" fill="var(--muted-2)" text-anchor="middle">${viNum(v)}</text>`).join("")}
    ${threshold?`<line x1="${x(threshold.v)}" y1="2" x2="${x(threshold.v)}" y2="${H-20}" stroke="var(--amber)" stroke-width="1.5" stroke-dasharray="4 3"/>
    <text x="${x(threshold.v)+5}" y="12" font-size="9.5" fill="var(--amber)" font-weight="700">${esc(threshold.label)}</text>`:""}
    ${rows.map((r,i)=>{const y=16+i*(bh+gap);return `
      <text x="0" y="${y+bh/2+4}" font-size="11" fill="var(--text-2)">${esc(r[0])}</text>
      <rect x="${pad}" y="${y}" width="${Math.max(1,x(r[1])-pad)}" height="${bh}" rx="4" fill="${r[2]}" opacity=".88"/>
      <text x="${x(r[1])+7}" y="${y+bh/2+4}" font-size="11" font-weight="700" fill="var(--text)">${viNum(r[1])}</text>`}).join("")}
  </svg>`;
}

function startArenaTimer(){
  clearInterval(ARENA.timer);
  const el = document.getElementById("arenaTimer"); if(!el) return;
  const c = window.CASE_BY_ID[ARENA.caseId];
  const tick = () => {
    const node = document.getElementById("arenaTimer"); if(!node){ clearInterval(ARENA.timer); return; }
    const left = c.min*60 - Math.round((Date.now()-ARENA.start)/1000), a = Math.abs(left);
    node.textContent = `◷ ${left<0?"+":""}${Math.floor(a/60)}:${String(a%60).padStart(2,"0")}`;
    node.classList.toggle("over", left<0);
  };
  tick(); ARENA.timer = setInterval(tick, 1000);
}

/* ════════ 5. CASE LIBRARY ════════ */
function vLibrary(){
  const rows = window.CASES.filter(c=>{
    const r = State.caseRec(c.id), solved = r && r.attempts>0;
    return (LIB.mode==="all" || c.mode===LIB.mode) && (!LIB.ind || c.ind===LIB.ind) &&
      (!LIB.type || c.type===LIB.type) && (!LIB.diff || String(c.diff)===LIB.diff) &&
      (!LIB.skill || c.skills.includes(LIB.skill)) &&
      (!LIB.status || (LIB.status==="done"?solved:!solved));
  });
  const sel = (k, opts, all) => `<select onchange="ACT.lib('${k}',this.value)">
    <option value="">${all}</option>${opts.map(([v,n])=>`<option value="${esc(v)}" ${LIB[k]===String(v)?"selected":""}>${esc(n)}</option>`).join("")}</select>`;
  const anyFilter = LIB.mode!=="all"||LIB.ind||LIB.type||LIB.diff||LIB.skill||LIB.status;

  return `<div class="main">
  <div class="row" style="justify-content:space-between;flex-wrap:wrap;gap:12px">
    <div><h1>Case Library</h1>
      <p class="muted" style="margin-top:4px">${window.CASES.length} đề · ${State.casesSolved().length} đã giải · lọc theo ngành, dạng case, độ khó và chế độ luyện.</p></div>
    <div class="seg">
      ${[["all","Tất cả"],["practice","Practice"],["competition","Competition"],["interview","Interview"]].map(([k,n])=>
        `<button class="${LIB.mode===k?"on":""}" onclick="ACT.lib('mode','${k}')">${n}</button>`).join("")}
    </div>
  </div>

  <div class="toolbar mt">
    <div class="field"><label class="lbl">Ngành</label>${sel("ind", window.INDUSTRIES.map(i=>[i.id,i.n]), "Tất cả ngành")}</div>
    <div class="field"><label class="lbl">Dạng case</label>${sel("type", window.CASE_TYPES.map(t=>[t,t]), "Tất cả dạng")}</div>
    <div class="field"><label class="lbl">Độ khó</label>${sel("diff", Object.entries(DIFF), "Tất cả")}</div>
    <div class="field"><label class="lbl">Kỹ năng chính</label>${sel("skill", Object.entries(window.SKILL_NAMES), "Tất cả kỹ năng")}</div>
    <div class="field"><label class="lbl">Trạng thái</label>${sel("status", [["todo","Chưa giải"],["done","Đã giải"]], "Tất cả")}</div>
    <div style="margin-left:auto" class="row">
      <span class="small muted">${rows.length} kết quả</span>
      ${anyFilter?`<button class="btn btn-sm btn-gh" onclick="Object.assign(LIB,{mode:'all',ind:'',type:'',diff:'',skill:'',status:''});render(true)">Xoá lọc</button>`:""}
    </div>
  </div>

  <div class="card">
    ${rows.length?`<table class="tb">
      <thead><tr>
        <th style="width:34%">Case</th><th>Ngành</th><th>Dạng</th><th>Kỹ năng chính</th>
        <th class="r">Thời lượng</th><th>Độ khó</th><th class="r">Trạng thái</th>
      </tr></thead>
      <tbody>
        ${rows.map(c=>{ const r=State.caseRec(c.id); return `<tr style="cursor:pointer" onclick="location.hash='#/${c.mode==="practice"?"arena":c.mode}/${c.id}'">
          <td><b style="color:var(--text)">${esc(c.t)}</b><div class="small muted">${esc(c.co)} · ${esc(c.hook)}</div></td>
          <td><span class="tag tag-neutral">${esc((window.INDUSTRIES.find(i=>i.id===c.ind)||{}).n||c.ind)}</span></td>
          <td><span class="tag tag-accent">${esc(c.type)}</span></td>
          <td class="small">${c.skills.map(s=>esc(window.SKILL_NAMES[s])).join(" · ")}</td>
          <td class="r num">${c.min}′</td>
          <td>${diffBadge(c.diff)}</td>
          <td class="r">${r&&r.attempts?`<span class="tag ${r.best>=80?"tag-e":"tag-a"} num">${r.best}</span>`
            :SCORING.cases[c.id]?`<span class="tag tag-accent">Đề đầy đủ</span>`:`<span class="tag">Đang soạn</span>`}</td>
        </tr>`;}).join("")}
      </tbody>
    </table>`:`<div class="empty" style="border:0">Không có case nào khớp bộ lọc.</div>`}
  </div></div>`;
}

/* ════════ 6. CAREER PATH ════════ */
const CAREERUI = {cat:"all"};

function careerCard(c){
  const done = State.careerProgress(c.id), mine = State.data.career===c.id;
  return `<div class="career" style="${mine?"border-color:var(--primary);box-shadow:0 0 0 1px var(--primary)":""}" onclick="location.hash='#/career/${c.id}'">
    <div class="career-top">
      <div class="row" style="gap:11px">
        <span class="tile tile-lg t-${c.color}">${c.icon}</span>
        <div style="flex:1"><h3>${esc(c.n)}</h3><div class="small muted">${esc(c.vi)}</div></div>
        ${mine?`<span class="tag tag-accent">Đang theo</span>`:""}
      </div>
      <p class="small" style="margin:12px 0 0">${esc(c.intro)}</p>
    </div>
    <div class="card-b" style="padding-bottom:10px">
      <div class="lbl mb">Lộ trình</div>
      <div class="stepline">
        ${c.steps.map((s,i)=>`<div class="s ${i<done?'done':''} ${i===done?'cur':''}">
          <div class="d">${i<done?'✓':i+1}</div><div class="lb">${esc(s.t)}</div></div>`).join("")}
      </div>
      <div class="divider"></div>
      <div class="lbl mb">Kỹ năng cần đạt</div>
      ${c.skills.slice(0,4).map(s=>`<div class="skill">
        <span class="nm">${esc(s.n)}</span>${bar(s.lv*20, s.lv>=5?"":"accent")}
        <span class="lv num">Lv${s.lv}</span></div>`).join("")}
    </div>
    <div class="card-f">
      <div class="lbl mb">Tốt nghiệp khi</div>
      <div class="small">${esc(c.gate)}</div>
      <div class="row mt-s" style="justify-content:space-between">
        <span class="small muted">${esc(c.entry.join(" · "))}</span>
        <button class="btn btn-sm ${mine?"":"btn-p"}" onclick="event.stopPropagation();ACT.career('${c.id}')">${mine?"Bỏ chọn":"Chọn lộ trình"}</button>
      </div>
    </div>
  </div>`;
}

function vCareer(){
  const cats = window.CAREER_CATS || [];
  const filter = CAREERUI.cat;
  const shown = filter==="all" ? cats : cats.filter(g=>g.id===filter);
  return `<div class="main">
  <h1>Career Path</h1>
  <p class="muted" style="max-width:72ch;margin-top:6px">Mỗi nghề có lộ trình track riêng, bộ kỹ năng cần đạt và một tiêu chí tốt nghiệp đo được. Chọn nghề để hệ thống sắp xếp lại thứ tự bài học cho bạn.</p>

  <div class="chips mt">
    <button class="chip ${filter==="all"?"on":""}" onclick="ACT.careerCat('all')">Tất cả<span class="c">${window.CAREERS.length}</span></button>
    ${cats.map(g=>{const n=window.CAREERS.filter(c=>c.cat===g.id).length;
      return `<button class="chip ${filter===g.id?"on":""}" onclick="ACT.careerCat('${g.id}')">${esc(g.n)}<span class="c">${n}</span></button>`;}).join("")}
  </div>

  ${shown.map(g=>`<section class="mt">
    <div class="row" style="align-items:baseline;gap:10px">
      <h2 style="font-size:19px">${esc(g.n)}</h2>
      <span class="small muted">${esc(g.d)}</span>
    </div>
    <div class="grid g3 mt-s">
      ${window.CAREERS.filter(c=>c.cat===g.id).map(careerCard).join("")}
    </div>
  </section>`).join("")}
  </div>`;
}

function vCareerDetail(id){
  const c = window.CAREER_BY_ID[id]; if(!c) return vCareer();
  const tracks = c.tracks.map(t=>window.TRACK_BY_ID[t]), mine = State.data.career===c.id;
  const first = window.LESSONS.find(l=>c.tracks.includes(l.track) && !l.soon && State.lessonStatus(l.id)!=="done");
  return `<div class="main">
  <div class="row" style="gap:13px;margin-bottom:6px">
    <span class="tile tile-lg t-${c.color}">${c.icon}</span>
    <div><div class="lbl">Career path${mine?" · đang theo":""}</div><h1 style="margin-top:2px">${esc(c.n)}</h1></div>
    <div class="row" style="margin-left:auto">
      <button class="btn" onclick="ACT.career('${c.id}')">${mine?"Bỏ chọn":"Chọn lộ trình này"}</button>
      ${first?`<a class="btn btn-p" href="#/lesson/${first.id}">${mine?"Học tiếp":"Bắt đầu"} →</a>`:""}
    </div>
  </div>
  <p class="muted" style="max-width:72ch">${esc(c.intro)}</p>

  <div class="grid g4 mt">
    <div class="card metric"><div class="k">Vị trí khởi điểm</div><div class="v" style="font-size:15px;line-height:1.4">${c.entry.map(esc).join("<br>")}</div></div>
    <div class="card metric"><div class="k">Track cần học</div><div class="v num">${tracks.length}</div><div class="n">${tracks.map(t=>esc(t.n)).join(" · ")}</div></div>
    <div class="card metric"><div class="k">Bài đã xong</div><div class="v num">${tracks.reduce((a,t)=>a+State.trackStats(t.id).done,0)}/${tracks.reduce((a,t)=>a+State.trackStats(t.id).total,0)}</div><div class="n">trong các track của lộ trình</div></div>
    <div class="card metric"><div class="k">Nơi tuyển</div><div class="v" style="font-size:13px;line-height:1.5">${esc(c.firms)}</div></div>
  </div>

  <div class="grid g2 mt">
    <div class="card">
      <div class="card-h"><h3>Bộ kỹ năng cần đạt</h3></div>
      <div class="card-b" style="padding-top:8px">
        ${c.skills.map(s=>`<div class="skill"><span class="nm">${esc(s.n)}</span>
          ${bar(s.lv*20, s.lv>=5?"":"accent")}<span class="lv num">Lv${s.lv}/5</span></div>`).join("")}
      </div>
    </div>
    <div class="card">
      <div class="card-h"><h3>Track trong lộ trình</h3><span class="small muted">${State.careerProgress(c.id)}/${c.steps.length} chặng</span></div>
      <div class="card-b" style="padding-top:6px">
        ${tracks.map(t=>{ const s=State.trackStats(t.id); return `<div class="trackrow" style="box-shadow:none;margin-bottom:8px" onclick="location.hash='#/tracks'">
          <span class="tile t-${t.color}">${t.icon}</span>
          <div class="body"><div class="nm">${esc(t.n)}</div><div class="vi">${s.done}/${s.total} bài · ${esc(t.lvl)}</div></div>
          <div style="width:84px">${bar(s.pct)}</div><div class="pct num">${s.pct}%</div></div>`;}).join("")}
        <div class="callout ok mt"><b>Tốt nghiệp khi:</b> ${esc(c.gate)}</div>
      </div>
    </div>
  </div></div>`;
}

/* ════════ 7. CASE COMPETITION SIMULATOR ════════ */
const COMPUI = {rec:"", timer:null};
const fmtClock = ms => { const neg=ms<0, a=Math.abs(Math.round(ms/1000)), h=Math.floor(a/3600), m=Math.floor(a%3600/60), s=a%60;
  return `${neg?"+":""}${h}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`; };
const compCases = () => window.CASES.filter(c=>c.mode==="competition" && COMP.CFG[c.id]);

function vCompetition(id){
  if(id && COMP.CFG[id]) return vCompRoom(id);
  return `<div class="main">
  <h1>Case Competition Simulator</h1>
  <p class="muted" style="margin-top:4px;max-width:72ch">Chạy đúng nhịp một cuộc thi thật: đề dài, ba deliverable có hạn chót, chấm theo 7 tiêu chí của ban giám khảo. Nộp trễ vẫn được chấm nhưng mỗi deliverable trễ bị trừ 10 điểm trình bày.</p>
  <div class="grid g3 mt">
    ${compCases().map(c=>{
      const sess=COMP.get(c.id), st=COMP.stageOf(sess), r=State.caseRec(c.id);
      const tag = st<0 ? `<span class="tag">Chưa thi</span>` : st<3 ? `<span class="tag tag-a">Đang thi · deliverable ${st+1}/3</span>`
                : `<span class="tag ${sess.result.total>=80?"tag-e":"tag-a"}">Đã nộp · ${sess.result.total} điểm</span>`;
      return `<div class="card" style="cursor:pointer" onclick="location.hash='#/competition/${c.id}'">
        <div class="card-b">
          <div class="row" style="justify-content:space-between;margin-bottom:9px"><span class="lbl">${esc(c.co)}</span>${tag}</div>
          <h3 style="margin-bottom:6px">${esc(c.t)}</h3>
          <p class="small muted" style="margin:0 0 12px">${esc(c.hook)}</p>
          <div class="wrap-row"><span class="tag tag-accent">${esc(c.type)}</span><span class="tag">${c.min} phút</span>${diffBadge(c.diff)}</div>
        </div>
        <div class="card-f row" style="justify-content:space-between">
          <span class="small muted">${r&&r.attempts?`Điểm cao nhất ${r.best}`:"Chưa có điểm"}</span>
          <span class="btn btn-sm btn-p">${st<0?"Vào phòng thi":st<3?"Tiếp tục":"Xem kết quả"} →</span>
        </div></div>`;}).join("")}
  </div>
  <div class="grid split-even mt">
    <div class="card"><div class="card-h"><h3>Ba deliverable</h3></div><div class="card-b" style="padding-top:4px"><div class="pipe">
      ${COMP.STAGES.map((s,i)=>`<div class="st"><span class="ic">${i+1}</span>
        <div class="bd"><div class="nm">${esc(s.n)}</div><div class="ds">${esc(s.d)}</div></div>
        <span class="due">hạn ${Math.round(COMP.DEADLINE[i]*100)}% thời gian</span></div>`).join("")}
    </div></div></div>
    <div class="card"><div class="card-h"><h3>7 tiêu chí chấm</h3></div><div class="card-b" style="padding-top:6px">
      ${["Governing thought","Chất lượng phân tích","Mô hình số","Tính khả thi","Cấu trúc slide","Trình bày","Xử lý Q&A"]
        .map((n,i)=>`<div class="rubric-row"><span class="nm">${i+1} · ${n}</span><span class="small muted">${["deliverable 1","deliverable 1","deliverable 1","deliverable 1","deliverable 2","1 + 2 · trừ khi trễ","deliverable 3"][i]}</span></div>`).join("")}
    </div></div>
  </div></div>`;
}

function vCompRoom(id){
  const c=window.CASE_BY_ID[id], spec=SCORING.cases[id], cfg=COMP.CFG[id];
  const sess=COMP.get(id), st=COMP.stageOf(sess);
  const L = Object.assign({problem:"1 · Governing thought", hyps:"2 · Ba trụ lập luận", evidence:"3 · Bằng chứng và con số"}, spec.labels||{});
  const left = `<div class="arena-l">
    <div class="lbl">Competition · ${esc(c.co)}</div><h1 style="margin-top:3px">${esc(c.t)}</h1>
    <div class="wrap-row mt-s"><span class="tag tag-accent">${esc(c.type)}</span><span class="tag">${c.min} phút</span>${diffBadge(c.diff)}
      ${sess&&sess.usedModel?`<span class="tag tag-a">Phiên dùng bài mẫu · không tính điểm</span>`:""}</div>
    <div class="brief mt"><div class="lbl mb">Đề thi</div>
      <p style="margin:0 0 10px">${esc(spec.brief.context)}</p><p style="margin:0"><b>Nhiệm vụ:</b> ${esc(spec.brief.task)}</p>
      <p class="small muted" style="margin:10px 0 0">Số liệu minh hoạ cho mục đích luyện tập.</p></div>
    ${spec.exhibits.map(renderExhibit).join("")}
  </div>`;

  if(!sess) return `<div class="main" style="padding-bottom:0"><a class="small muted" href="#/competition">← Danh sách đề thi</a></div>
  <div class="arena">${left}<div class="arena-r">
    <div class="card"><div class="card-h"><h3>Trước khi bắt đầu</h3></div><div class="card-b">
      <p class="small" style="margin-top:0">Đồng hồ ${c.min} phút bắt đầu khi bạn bấm nút. Hạn từng deliverable:</p>
      <div class="pipe">${COMP.STAGES.map((s,i)=>`<div class="st"><span class="ic">${i+1}</span>
        <div class="bd"><div class="nm">${esc(s.n)}</div><div class="ds">${esc(s.d)}</div></div>
        <span class="due">phút ${Math.round(c.min*COMP.DEADLINE[i])}</span></div>`).join("")}</div>
      <button class="btn btn-p mt" style="width:100%" onclick="ACT.compStart('${id}')">Bắt đầu tính giờ</button>
    </div></div></div></div>`;

  const pipe = `<div class="card"><div class="card-h"><h3>Deliverable</h3><span class="tag ${st===3?"tag-e":"tag-a"}">${Math.min(st,3)}/3 đã nộp</span></div>
    <div class="card-b" style="padding-top:4px"><div class="pipe">
    ${COMP.STAGES.map((s,i)=>{ const at=sess.at[i], due=COMP.deadlineAt(id,i), late=at!=null&&at>due;
      const cls = at!=null ? "done" : i===st ? "cur" : "";
      const dueTx = at!=null ? `nộp phút ${Math.round((at-sess.start)/60000)}${late?" · trễ":""}` : `hạn phút ${Math.round(c.min*COMP.DEADLINE[i])}`;
      return `<div class="st ${cls}"><span class="ic">${at!=null?"✓":i+1}</span>
        <div class="bd"><div class="nm">${esc(s.n)}</div><div class="ds">${esc(s.d)}</div></div>
        <span class="due" style="${late?"color:var(--rose)":""}">${dueTx}</span></div>`;}).join("")}
    </div></div></div>`;

  let form = "";
  if(st===0) form = `<div class="card mt"><div class="card-h"><h3>Deliverable 1 · ${esc(COMP.STAGES[0].n)}</h3></div><div class="card-b">
    <div class="canvas-field"><label class="lbl" for="cp-problem">${esc(L.problem)}</label><textarea id="cp-problem" rows="2" placeholder="Một câu trả lời chủ đạo có con số…"></textarea></div>
    <div class="canvas-field"><label class="lbl">${esc(L.hyps)}</label>
      ${[0,1,2,3].map(i=>`<div class="hyp-row"><span class="n">${i+1}</span><input id="cp-h${i}" placeholder="${i<3?"Trụ "+(i+1):"Trụ thêm (không bắt buộc)"}"
        style="flex:1;background:var(--surface-2);border:1px solid var(--border);border-radius:8px;padding:8px 10px;font-size:12.5px"></div>`).join("")}</div>
    <div class="canvas-field"><label class="lbl" for="cp-evidence">${esc(L.evidence)}</label><textarea id="cp-evidence" rows="5" placeholder="Ex.1, Ex.2… con số cho từng trụ, trụ nào đúng, trụ nào bị bác bỏ"></textarea></div>
    <div class="canvas-field"><label class="lbl">4 · Khuyến nghị</label>
      ${spec.options.map(([k,tx])=>`<div class="opt pick ${COMPUI.rec===k?"sel":""}" data-crec="${k}" onclick="ACT.compPick('${k}')"><span class="k">${k}</span><span class="t">${esc(tx)}</span></div>`).join("")}</div>
  </div></div>`;
  if(st===1) form = `<div class="card mt"><div class="card-h"><h3>Deliverable 2 · ${esc(COMP.STAGES[1].n)}</h3></div><div class="card-b">
    <p class="small muted" style="margin-top:0">Mỗi dòng là headline một trang: câu khẳng định, có con số, ít nhất 7 chữ. Trang 1 là governing thought.</p>
    <div class="slidedeck">${[0,1,2,3,4,5,6,7].map(i=>`<div class="slidecard" style="padding:6px 10px"><span class="no">${String(i+1).padStart(2,"0")}</span>
      <input id="cs-${i}" placeholder="${i===0?"Governing thought":i<6?"Headline trang "+(i+1):"Trang thêm (không bắt buộc)"}"
        style="flex:1;border:0;background:transparent;font-size:13px;font-weight:600;color:var(--text);padding:4px 0"></div>`).join("")}</div>
  </div></div>`;
  if(st===2) form = `<div class="card mt"><div class="card-h"><h3>Deliverable 3 · ${esc(COMP.STAGES[2].n)}</h3></div><div class="card-b">
    ${cfg.qa.map((q,i)=>`<div class="msg q" style="margin-bottom:8px"><span class="av">BGK</span><div class="bb"><div class="who">Giám khảo · câu ${i+1}</div>${esc(q.q)}</div></div>
      <div class="canvas-field"><textarea id="cq-${i}" rows="2" placeholder="Trả lời ngắn, có con số…"></textarea></div>`).join("")}
  </div></div>`;
  const actions = st<3 ? `<div class="row mt" style="gap:9px">
      <button class="btn btn-p" style="flex:1" onclick="ACT.compSubmit('${id}')">Nộp deliverable ${st+1}</button>
      <button class="btn btn-gh" onclick="ACT.compModel('${id}')">Bài mẫu</button></div>` : "";

  let result = "";
  if(st===3){ const R=sess.result;
    result = `<div class="card mt"><div class="card-h"><h3>Kết quả ban giám khảo</h3><span class="tag ${R.total>=80?"tag-e":"tag-a"} num">${R.total}</span></div>
      <div class="card-b" style="padding-top:8px">
        ${R.dims.map(([n,v])=>`<div class="rubric-row"><span class="nm">${esc(n)}</span>${bar(v, v>=80?"":v>=50?"amber":"rose")}<span class="sc num">${v}</span></div>`).join("")}
        <div class="callout ${R.total>=80?"ok":""} mt" style="padding:10px 12px;font-size:12.5px"><b>Nhận xét:</b> ${esc(R.feedback)}</div>
        <p class="small muted" style="margin:8px 0 0">${R.recorded?`Đã ghi vào tiến độ${R.gain?` · +${R.gain} XP`:""}${R.mistakes?` · ${R.mistakes} lỗi vào <a href="#/review">Mistake Review</a>`:""}.`:"Phiên dùng bài mẫu — chỉ để xem cách chấm, không ghi điểm."}</p>
      </div>
      <div class="card-f row" style="justify-content:space-between"><a class="btn btn-sm btn-gh" href="#/competition">← Danh sách đề</a>
        <button class="btn btn-sm" onclick="ACT.compReset('${id}')">Thi lại từ đầu</button></div></div>`;
  }

  return `<div class="main" style="padding-bottom:0">
    <a class="small muted" href="#/competition">← Danh sách đề thi</a>
    <div class="deadline mt-s">
      <div style="flex:1;min-width:240px"><div class="lbl">${st<3?`Đang làm · deliverable ${st+1}/3`:"Đã nộp đủ"}</div>
        <div style="font-size:19px;font-weight:700;color:var(--text);letter-spacing:-.02em;margin:5px 0 4px">${esc(st<3?COMP.STAGES[st].n:c.t)}</div>
        <div style="font-size:12.5px;color:var(--muted)">${st<3?`Hạn ở phút ${Math.round(c.min*COMP.DEADLINE[st])} · nộp trễ trừ 10 điểm trình bày`:`Tổng điểm ${sess.result.total}`}</div></div>
      <div><div class="lbl">${st<3?"Còn lại tới hạn":"Thời gian làm bài"}</div>
        <div class="cd" id="compTimer">${st<3?fmtClock(COMP.deadlineAt(id,st)-Date.now()):fmtClock(sess.at[2]-sess.start)}</div></div>
    </div></div>
  <div class="arena">${left}<div class="arena-r">${pipe}${form}${actions}${result}</div></div>`;
}

function startCompTimer(id){
  clearInterval(COMPUI.timer);
  const sess=COMP.get(id), st=COMP.stageOf(sess); if(!sess || st>2) return;
  const tick=()=>{ const el=document.getElementById("compTimer"); if(!el){ clearInterval(COMPUI.timer); return; }
    const left=COMP.deadlineAt(id,st)-Date.now(); el.textContent=fmtClock(left); el.style.color = left<0 ? "var(--rose)" : ""; };
  tick(); COMPUI.timer=setInterval(tick,1000);
}

/* ════════ 8. CONSULTING INTERVIEW MODE ════════ */
const ivCases = () => window.CASES.filter(c=>c.mode==="interview" && IVIEW.CFG[c.id]);
const IVF = {style:"", type:"", diff:"", status:""};
const ivStyle = id => IVIEW.CFG[id].style.startsWith("Candidate") ? "candidate" : "interviewer";
const ivState = id => { const rd = IVIEW.roundOf(IVIEW.get(id)); return rd<0 ? "todo" : rd<5 ? "doing" : "done"; };
const ivFiltered = () => ivCases().filter(c =>
  (!IVF.style || ivStyle(c.id)===IVF.style) && (!IVF.type || c.type===IVF.type) &&
  (!IVF.diff || String(c.diff)===IVF.diff) && (!IVF.status || ivState(c.id)===IVF.status));

/* case nên phỏng vấn tiếp: phiên đang dở → dạng chưa thử, dễ trước → điểm thấp nhất */
function ivNext(except){
  const all = ivCases().filter(c=>c.id!==except);
  const doing = all.find(c=>ivState(c.id)==="doing");
  if(doing) return {c:doing, why:"Bạn đang dở phiên này — làm nốt trước khi mở case mới."};
  const done = all.filter(c=>ivState(c.id)==="done"), tried = new Set(done.map(c=>c.type));
  const todo = all.filter(c=>ivState(c.id)==="todo")
    .sort((a,b)=>(tried.has(a.type)-tried.has(b.type)) || (a.diff-b.diff));
  if(todo.length) return {c:todo[0], why: tried.has(todo[0].type)
    ? "Case chưa phỏng vấn, độ khó vừa sức với tiến độ hiện tại."
    : `Dạng ${todo[0].type} bạn chưa phỏng vấn lần nào.`};
  const low = done.sort((a,b)=>IVIEW.get(a.id).result.total-IVIEW.get(b.id).result.total)[0];
  return low ? {c:low, why:"Điểm thấp nhất của bạn — phỏng vấn lại để gỡ điểm."} : null;
}

/* thống kê chỉ lấy phiên tự trả lời, bỏ phiên dùng câu mẫu */
function ivStats(){
  const cases = ivCases();
  const fin = cases.map(c=>IVIEW.get(c.id)).filter(x=>x && x.result && x.result.recorded).map(x=>x.result);
  const avg = a => a.length ? Math.round(a.reduce((x,y)=>x+y,0)/a.length) : null;
  const rounds = IVIEW.ROUNDS.map((r,i)=>[r.n, avg(fin.map(x=>x.dims[i][1]))]);
  const weakest = fin.length ? rounds.slice().sort((a,b)=>a[1]-b[1])[0] : null;
  return {total:cases.length, done:cases.filter(c=>ivState(c.id)==="done").length,
          doing:cases.filter(c=>ivState(c.id)==="doing").length, avg:avg(fin.map(x=>x.total)), rounds, weakest, n:fin.length};
}

function ivCard(c){
  const sess=IVIEW.get(c.id), rd=IVIEW.roundOf(sess), r=State.caseRec(c.id);
  const tag = rd<0 ? `<span class="tag">Chưa phỏng vấn</span>` : rd<5 ? `<span class="tag tag-a">Đang thi · vòng ${rd+1}/5</span>`
            : `<span class="tag ${sess.result.total>=80?"tag-e":"tag-a"}">Đã xong · ${sess.result.total} điểm</span>`;
  const ind = (window.INDUSTRIES.find(i=>i.id===c.ind)||{}).n || c.ind;
  return `<div class="card" style="cursor:pointer" onclick="location.hash='#/interview/${c.id}'">
    <div class="card-b">
      <div class="row" style="justify-content:space-between;margin-bottom:9px;gap:8px"><span class="lbl">${esc(IVIEW.CFG[c.id].style)}</span>${tag}</div>
      <h3 style="margin-bottom:6px">${esc(c.t)}</h3>
      <p class="small muted" style="margin:0 0 12px">${esc(c.hook)}</p>
      <div class="wrap-row"><span class="tag tag-accent">${esc(c.type)}</span><span class="tag tag-neutral">${esc(ind)}</span><span class="tag">${c.min} phút</span>${diffBadge(c.diff)}</div>
    </div>
    <div class="card-f row" style="justify-content:space-between">
      <span class="small muted">${r&&r.attempts?`Điểm cao nhất ${r.best}`:"Chưa có điểm"}</span>
      <span class="btn btn-sm btn-p">${rd<0?"Bắt đầu phỏng vấn":rd<5?"Tiếp tục":"Xem kết quả"} →</span>
    </div></div>`;
}

function vInterview(id){
  if(id && IVIEW.CFG[id]) return vIvRoom(id);
  const all = ivCases(), rows = ivFiltered(), st = ivStats(), nx = ivNext();
  const any = IVF.style||IVF.type||IVF.diff||IVF.status;
  const count = (k,v) => all.filter(c=>k==="type"?c.type===v:ivStyle(c.id)===v).length;
  const types = window.CASE_TYPES.filter(t=>count("type",t));
  const sel = (k, opts, lbl) => `<select onchange="ACT.ivf('${k}',this.value)">
    <option value="">${lbl}</option>${opts.map(([v,n])=>`<option value="${esc(v)}" ${IVF[k]===String(v)?"selected":""}>${esc(n)}</option>`).join("")}</select>`;
  const metric = (k,v,n) => `<div class="card metric"><div class="k">${esc(k)}</div><div class="v num">${v}</div>${n?`<div class="n">${esc(n)}</div>`:""}</div>`;

  return `<div class="main">
  <div class="row" style="justify-content:space-between;flex-wrap:wrap;gap:12px;align-items:flex-end">
    <div><h1>Consulting Interview Mode</h1>
      <p class="muted" style="margin-top:4px;max-width:72ch">Case chạy theo 5 vòng như phỏng vấn thật: làm rõ đề → cấu trúc → case math → đọc exhibit → khuyến nghị. Mỗi vòng được chấm riêng; trả lời thiếu con số hoặc thiếu nhánh sẽ vào Mistake Review.</p></div>
    <button class="btn" onclick="ACT.ivRandom()" title="Phỏng vấn thật không cho bạn chọn đề">Phỏng vấn ngẫu nhiên</button>
  </div>

  <div class="grid g4 mt">
    ${metric("Đã phỏng vấn", `${st.done}<span class="muted" style="font-size:15px;font-weight:600">/${st.total}</span>`, st.doing?`${st.doing} phiên đang dở`:"")}
    ${metric("Điểm trung bình", st.avg==null?"—":st.avg, st.n?`Từ ${st.n} phiên tự trả lời`:"Chưa có phiên tự trả lời")}
    ${metric("Vòng yếu nhất", st.weakest?esc(st.weakest[0]):"—", st.weakest?`Trung bình ${st.weakest[1]} điểm`:"")}
    ${metric("Dạng case đã thử", new Set(all.filter(c=>ivState(c.id)==="done").map(c=>c.type)).size+`<span class="muted" style="font-size:15px;font-weight:600">/${types.length}</span>`, "")}
  </div>

  <div class="grid g2 mt">
    <div class="card"><div class="card-h"><h3>Nên phỏng vấn tiếp</h3></div>
      ${nx?`<div class="card-b">
        <div class="lbl" style="margin-bottom:6px">${esc(IVIEW.CFG[nx.c.id].style)}</div>
        <h3 style="margin-bottom:6px">${esc(nx.c.t)}</h3>
        <p class="small muted" style="margin:0 0 12px">${esc(nx.why)}</p>
        <div class="wrap-row"><span class="tag tag-accent">${esc(nx.c.type)}</span><span class="tag">${nx.c.min} phút</span>${diffBadge(nx.c.diff)}</div>
      </div>
      <div class="card-f row" style="justify-content:flex-end"><a class="btn btn-sm btn-p" href="#/interview/${nx.c.id}">${ivState(nx.c.id)==="doing"?"Tiếp tục":"Bắt đầu phỏng vấn"} →</a></div>`
      :`<div class="card-b"><p class="small muted" style="margin:0">Bạn đã phỏng vấn hết các case.</p></div>`}
    </div>
    <div class="card"><div class="card-h"><h3>Điểm theo vòng</h3>${st.n?`<span class="small muted">${st.n} phiên</span>`:""}</div>
      <div class="card-b" style="padding-top:8px">
        ${st.n ? st.rounds.map(([n,v])=>`<div class="rubric-row"><span class="nm">${esc(n)}</span>${bar(v, v>=80?"":v>=50?"amber":"rose")}<span class="sc num">${v}</span></div>`).join("")
          : `<p class="small muted" style="margin:0">Hoàn thành một phiên tự trả lời để thấy vòng nào bạn đang mất điểm. Phiên dùng câu mẫu không được tính.</p>`}
      </div></div>
  </div>

  <div class="toolbar mt">
    <div class="field"><label class="lbl">Kiểu dẫn case</label>
      <div class="seg">${[["","Tất cả"],["interviewer","Interviewer-led"],["candidate","Candidate-led"]].map(([k,n])=>
        `<button class="${IVF.style===k?"on":""}" onclick="ACT.ivf('style','${k}')">${n}</button>`).join("")}</div></div>
    <div class="field"><label class="lbl">Độ khó</label>${sel("diff", Object.entries(DIFF).filter(([k])=>all.some(c=>String(c.diff)===k)), "Tất cả")}</div>
    <div class="field"><label class="lbl">Trạng thái</label>${sel("status", [["todo","Chưa phỏng vấn"],["doing","Đang dở"],["done","Đã xong"]], "Tất cả")}</div>
    <div style="margin-left:auto" class="row">
      <span class="small muted">${rows.length} kết quả</span>
      ${any?`<button class="btn btn-sm btn-gh" onclick="Object.assign(IVF,{style:'',type:'',diff:'',status:''});render(true)">Xoá lọc</button>`:""}
    </div>
  </div>
  <div class="chips" style="margin:-4px 0 16px">
    <button class="chip ${!IVF.type?"on":""}" onclick="ACT.ivf('type','')">Tất cả dạng<span class="c">${all.length}</span></button>
    ${types.map(t=>`<button class="chip ${IVF.type===t?"on":""}" onclick="ACT.ivf('type','${esc(t)}')">${esc(t)}<span class="c">${count("type",t)}</span></button>`).join("")}
  </div>

  ${rows.length ? `<div class="grid g2">${rows.map(ivCard).join("")}</div>`
    : `<div class="card"><div class="empty" style="border:0">Không có case nào khớp bộ lọc.</div></div>`}

  <div class="card mt"><div class="card-h"><h3>Năm vòng và cách chấm</h3></div><div class="card-b" style="padding-top:4px">
    <div class="pipe">${IVIEW.ROUNDS.map((r,i)=>`<div class="st"><span class="ic">${i+1}</span>
      <div class="bd"><div class="nm">${esc(r.n)}</div><div class="ds">${esc(["Nhắc lại đề trong một câu và hỏi 2–3 câu làm rõ.","Nêu cấu trúc đủ nhánh cho loại case này.","Tính ra con số then chốt, nói cả phép tính.","Đọc exhibit và rút ra câu \"vậy thì sao\".","Khuyến nghị gắn với ràng buộc và con số vừa tính."][i])}</div></div>
      <span class="due">${esc(["từ khoá","từ khoá","từ khoá + con số","từ khoá + con số","từ khoá"][i])}</span></div>`).join("")}</div>
  </div></div></div>`;
}

function vIvRoom(id){
  const c=window.CASE_BY_ID[id], spec=SCORING.cases[id], cfg=IVIEW.CFG[id];
  const sess=IVIEW.get(id), rd=IVIEW.roundOf(sess);
  const left = `<div class="arena-l">
    <div class="lbl">Interview · ${esc(cfg.style)}</div><h1 style="margin-top:3px">${esc(c.t)}</h1>
    <div class="wrap-row mt-s"><span class="tag tag-accent">${esc(c.type)}</span><span class="tag">${c.min} phút</span>${diffBadge(c.diff)}
      ${sess&&sess.usedModel?`<span class="tag tag-a">Phiên dùng bài mẫu · không tính điểm</span>`:""}</div>
    <div class="brief mt"><div class="lbl mb">Bối cảnh</div>
      <p style="margin:0 0 10px">${esc(spec.brief.context)}</p><p style="margin:0"><b>Nhiệm vụ:</b> ${esc(spec.brief.task)}</p>
      <p class="small muted" style="margin:10px 0 0">Số liệu minh hoạ cho mục đích luyện tập.</p></div>
    ${spec.exhibits.map(renderExhibit).join("")}
  </div>`;

  if(!sess) return `<div class="main" style="padding-bottom:0"><a class="small muted" href="#/interview">← Danh sách case phỏng vấn</a></div>
  <div class="arena">${left}<div class="arena-r">
    <div class="card"><div class="card-h"><h3>Trước khi bắt đầu</h3></div><div class="card-b">
      <p class="small" style="margin-top:0">Phiên gồm 5 vòng. Người phỏng vấn hỏi từng vòng; trả lời xong mới hiện vòng tiếp theo và phần ghi nhận.</p>
      <div class="rounds mb">${IVIEW.ROUNDS.map((r,i)=>`<div class="r"><div class="n">Vòng ${i+1}</div><div class="t">${esc(r.n)}</div></div>`).join("")}</div>
      <button class="btn btn-p" style="width:100%" onclick="ACT.ivStart('${id}')">Bắt đầu phỏng vấn</button>
    </div></div></div></div>`;

  const rounds = `<div class="rounds mb">${IVIEW.ROUNDS.map((r,i)=>
    `<div class="r ${i<rd?"done":i===rd?"cur":""}"><div class="n">Vòng ${i+1}</div><div class="t">${esc(r.n)}</div></div>`).join("")}</div>`;

  const chat = cfg.rounds.slice(0, Math.min(rd+1,5)).map((r,i)=>{
    const ans=(sess.answers||[])[i];
    return `<div class="msg q"><span class="av">PV</span><div class="bb"><div class="who">Người phỏng vấn · vòng ${i+1}</div>${esc(r.q)}</div></div>
      ${ans!=null?`<div class="msg a"><span class="av">BẠN</span><div class="bb"><div class="who">Bạn</div>${esc(ans)}
        <span class="note"><b>Ghi nhận (${IVIEW.scoreRound(r,ans)}/100):</b> ${esc(r.note)}</span></div></div>`:""}`;
  }).join("");

  const form = rd<5 ? `<div class="canvas-field mt">
      <label class="lbl" for="iv-ans">Câu trả lời của bạn — vòng ${rd+1} · ${esc(IVIEW.ROUNDS[rd].n)}</label>
      <textarea id="iv-ans" rows="3" placeholder="${rd===2||rd===3?"Nói cả phép tính và con số…":"Nói thành lời như đang ngồi trước người phỏng vấn…"}"></textarea>
      <div class="row mt-s"><button class="btn btn-p" onclick="ACT.ivAnswer('${id}')">Trả lời</button>
        <button class="btn btn-gh" onclick="ACT.ivModel('${id}')">Câu mẫu</button>
        <span class="small muted" style="margin-left:auto">Nói to trước rồi mới gõ lại</span></div>
    </div>` : "";

  let result = "";
  if(rd===5){ const R=sess.result;
    result = `<div class="card mt"><div class="card-h"><h3>Kết quả phỏng vấn</h3><span class="tag ${R.total>=80?"tag-e":"tag-a"} num">${R.total}</span></div>
      <div class="card-b" style="padding-top:8px">
        ${R.dims.map(([n,v])=>`<div class="rubric-row"><span class="nm">${esc(n)}</span>${bar(v, v>=80?"":v>=50?"amber":"rose")}<span class="sc num">${v}</span></div>`).join("")}
        <div class="callout ${R.total>=80?"ok":""} mt" style="padding:10px 12px;font-size:12.5px"><b>Nhận xét:</b> ${esc(R.feedback)}</div>
        <p class="small muted" style="margin:8px 0 0">${R.recorded?`Đã ghi vào tiến độ${R.gain?` · +${R.gain} XP`:""}${R.mistakes?` · ${R.mistakes} lỗi vào <a href="#/review">Mistake Review</a>`:""}.`:"Phiên dùng câu mẫu — chỉ để xem cách chấm, không ghi điểm."}</p>
      </div>
      <div class="card-f row" style="justify-content:space-between;flex-wrap:wrap;gap:8px"><a class="btn btn-sm btn-gh" href="#/interview">← Danh sách case</a>
        <div class="row" style="gap:8px"><button class="btn btn-sm" onclick="ACT.ivReset('${id}')">Phỏng vấn lại</button>
        ${(nx=>nx?`<a class="btn btn-sm btn-p" href="#/interview/${nx.c.id}" title="${esc(nx.c.t)}">Case tiếp theo →</a>`:"")(ivNext(id))}</div></div></div>`;
  }

  return `<div class="main" style="padding-bottom:0"><a class="small muted" href="#/interview">← Danh sách case phỏng vấn</a></div>
  <div class="arena">${left}<div class="arena-r">
    ${rounds}
    <div class="card"><div class="card-h"><h3>Transcript</h3><span class="small muted">${Math.min(rd,5)}/5 vòng đã trả lời</span></div>
      <div class="card-b"><div class="chat">${chat}</div>${form}</div></div>
    ${result}
  </div></div>`;
}

/* ════════ 9. MISTAKE REVIEW ════════ */
const KIND_COLOR = {framework:"v", calculation:"r", logic:"a", exhibit:"b", presentation:"s"};
function dueLabel(iso){
  const n = Math.round((Date.parse(iso)-Date.parse(State.today()))/864e5);
  return n<0 ? `Quá hạn ${-n} ngày` : n===0 ? "Hôm nay" : n===1 ? "Ngày mai" : `Sau ${n} ngày`;
}
function vReview(){
  const open = State.openMistakes(), byKind = State.mistakesByKind(), total = open.length;
  const resolved = State.data.mistakes.filter(m=>m.resolved).length;
  const repeated = open.filter(m=>m.count>=2).length, due = State.dueToday();
  const shown = open.filter(m=>!REV.kind || m.kind===REV.kind);
  const top = Object.entries(byKind).sort((a,b)=>b[1]-a[1])[0];
  const queue = State.reviewQueue().slice(0,6);
  const firstDue = queue.find(m=>m.due<=State.today());

  if(!State.data.mistakes.length) return `<div class="main">
    <h1>Mistake Review</h1>
    <p class="muted" style="margin-top:4px;max-width:70ch">Mọi câu sai trong quiz bài học, Practice Arena và Interview Mode sẽ được phân loại và giữ lại ở đây.</p>
    <div class="empty mt">Chưa có lỗi nào. Làm quiz trong bài học hoặc nộp một case ở Arena để bắt đầu.
      <div class="row mt" style="justify-content:center"><a class="btn btn-p" href="#/arena/cl-01">Giải case đầu tiên →</a>
      <button class="btn" onclick="ACT.seed()">Nạp dữ liệu mẫu</button></div></div></div>`;

  return `<div class="main">
  <div class="row" style="justify-content:space-between;flex-wrap:wrap;gap:12px">
    <div><h1>Mistake Review</h1>
      <p class="muted" style="margin-top:4px;max-width:70ch">Mọi câu sai đều được phân loại và giữ lại. Mỗi lỗi được ôn theo giãn cách ${State.REVIEW_GAPS.join(" → ")} ngày; ôn đủ ${State.REVIEW_GAPS.length} lần thì coi như đã sửa.</p></div>
    ${firstDue?`<a class="btn btn-p" href="#/lesson/${firstDue.lesson[0]}">Ôn lỗi đến hạn đầu tiên →</a>`:""}
  </div>

  <div class="grid g4 mt">
    <div class="card metric"><div class="k">Lỗi đang mở</div><div class="v num">${total}</div><div class="n">${State.casesSolved().length} case đã giải</div></div>
    <div class="card metric"><div class="k">Đã sửa xong</div><div class="v num">${resolved}</div><div class="n ${resolved?"up":""}">${resolved?"giữ nhịp ôn đều":"chưa có"}</div></div>
    <div class="card metric"><div class="k">Lỗi lặp lại</div><div class="v num">${repeated}</div><div class="n">sai cùng một chỗ ≥ 2 lần</div></div>
    <div class="card metric"><div class="k">Đến hạn ôn</div><div class="v num">${due}</div><div class="n">hôm nay</div></div>
  </div>

  <div class="grid split-wide mt">
    <div>
      <div class="chips mb">
        <button class="chip ${!REV.kind?"on":""}" onclick="ACT.revKind('')">Tất cả<span class="c">${total}</span></button>
        ${Object.entries(State.MIST_KIND).map(([k,n])=>`<button class="chip ${REV.kind===k?"on":""}" onclick="ACT.revKind('${k}')">${esc(n)}<span class="c">${byKind[k]||0}</span></button>`).join("")}
      </div>
      ${shown.length?shown.map(m=>{
        const retry = window.CASE_BY_ID[m.ref] ? `#/arena/${m.ref}` : window.LESSON_BY_ID[m.ref] ? `#/lesson/${m.ref}` : m.ref.startsWith("iv") ? "#/interview" : "";
        return `<div class="mist">
        <div class="hd"><span class="tag tag-${KIND_COLOR[m.kind]||"s"}">${esc(State.MIST_KIND[m.kind]||m.kind)}</span>
          <span class="small muted">${esc(m.src)}</span>
          ${m.count>=2?`<span class="tag tag-r">Lặp ${m.count} lần</span>`:""}
          <span class="src">${esc(m.created)} · ôn ${m.step}/${State.REVIEW_GAPS.length} · ${dueLabel(m.due)}</span></div>
        <div class="ln bad"><span class="tg">BẠN VIẾT</span><span class="tx">${esc(m.bad)}</span></div>
        <div class="ln good"><span class="tg">ĐÚNG LÀ</span><span class="tx">${esc(m.good)}</span></div>
        <div class="callout" style="padding:9px 12px;font-size:12.5px;margin-top:9px"><b>Vì sao sai:</b> ${esc(m.why)}</div>
        <div class="ft">
          <a class="btn btn-sm" href="#/lesson/${esc(m.lesson[0])}">Ôn bài: ${esc(m.lesson[1]||lessonTitle(m.lesson[0]))}</a>
          ${retry?`<a class="btn btn-sm btn-gh" href="${retry}">Luyện lại</a>`:""}
          <span style="margin-left:auto"></span>
          <button class="btn btn-sm ${m.due<=State.today()?"btn-p":""}" onclick="ACT.review('${m.id}')">Đã ôn (${m.step+1}/${State.REVIEW_GAPS.length})</button>
          <button class="btn btn-sm btn-gh" onclick="ACT.resolve('${m.id}')">Đã hiểu hẳn</button>
        </div>
      </div>`;}).join(""):`<div class="empty">${total?"Không có lỗi loại này.":"Không còn lỗi nào đang mở. Tốt lắm."}</div>`}
    </div>

    <div>
      <div class="card">
        <div class="card-h"><h3>Phân bố loại lỗi</h3></div>
        <div class="card-b" style="padding-top:9px">
          ${Object.entries(State.MIST_KIND).map(([k,n])=>`<div class="rubric-row"><span class="nm">${esc(n)}</span>
            ${bar(total?Math.round((byKind[k]||0)/total*100):0, (byKind[k]||0)>=3?"rose":"amber")}<span class="sc num">${byKind[k]||0}</span></div>`).join("")}
          ${total&&top[1]>=2?`<div class="divider"></div>
          <div class="callout warn" style="padding:10px 12px;font-size:12.5px">
            <b>Mẫu lặp:</b> ${top[1]}/${total} lỗi đang mở là ${esc(State.MIST_KIND[top[0]].toLowerCase())}. Đây là nhóm nên ôn trước.</div>`:""}
        </div>
      </div>

      <div class="card mt">
        <div class="card-h"><h3>Lịch ôn giãn cách</h3><span class="tag ${due?"tag-a":"tag-e"}">${due} đến hạn</span></div>
        <div class="card-b" style="padding-top:4px">
          ${queue.length?`<div class="pipe">
            ${queue.map((m,i)=>`<div class="st ${m.due<=State.today()?"cur":""}">
              <span class="ic">${i+1}</span>
              <div class="bd"><div class="nm">${esc(m.lesson[1]||lessonTitle(m.lesson[0]))}</div><div class="ds">${esc(State.MIST_KIND[m.kind])} · ${esc(m.src)}</div></div>
              <span class="due">${dueLabel(m.due)}</span></div>`).join("")}
          </div>`:`<p class="small muted">Không có lỗi nào cần ôn.</p>`}
        </div>
      </div>
    </div>
  </div></div>`;
}

/* ════════ 10. CÀI ĐẶT & SAO LƯU ════════ */
function vSettings(){
  const S = State.data, lv = State.level();
  return `<div class="main">
  <h1>Tài khoản & dữ liệu</h1>
  <p class="muted" style="max-width:70ch;margin-top:6px">Tiến độ đang lưu trên trình duyệt này (localStorage). Xuất file sao lưu để chuyển sang máy khác hoặc phòng khi xoá dữ liệu trình duyệt.</p>
  <div class="grid g2 mt">
    <div class="card">
      <div class="card-h"><h3>Hồ sơ</h3></div>
      <div class="card-b">
        <div class="field"><label class="lbl" for="set-name">Tên hiển thị</label>
          <div class="row"><input id="set-name" value="${esc(S.user.name)}" maxlength="40" style="flex:1"
            onkeydown="if(event.key==='Enter')ACT.saveName()"><button class="btn btn-p" onclick="ACT.saveName()">Lưu</button></div></div>
        <div class="divider"></div>
        <dl class="kv">
          <dt>Cấp độ</dt><dd>Lv ${lv.lv} · ${esc(lv.title)}</dd>
          <dt>Tổng XP</dt><dd>${fmtN(lv.xp)}</dd>
          <dt>Bài đã xong</dt><dd>${State.overall().done}/${State.overall().total}</dd>
          <dt>Case đã giải</dt><dd>${State.casesSolved().length}</dd>
          <dt>Lỗi đang mở</dt><dd>${State.openMistakes().length}</dd>
          <dt>Lộ trình nghề</dt><dd>${S.career?esc(window.CAREER_BY_ID[S.career].n):"Chưa chọn"}</dd>
          <dt>Bắt đầu từ</dt><dd>${esc(S.user.created)}</dd>
        </dl>
      </div>
    </div>
    <div class="card">
      <div class="card-h"><h3>Sao lưu</h3></div>
      <div class="card-b">
        <div class="row" style="flex-wrap:wrap">
          <button class="btn btn-p" onclick="ACT.exportData()">Xuất file sao lưu (.json)</button>
          <label class="btn">Nhập từ file…<input type="file" accept="application/json,.json" hidden onchange="ACT.importData(this)"></label>
        </div>
        <p class="small muted">Nhập file sẽ thay toàn bộ tiến độ hiện tại bằng nội dung trong file.</p>
        <div class="divider"></div>
        <div class="lbl mb">Dữ liệu thử</div>
        <div class="row" style="flex-wrap:wrap">
          <button class="btn" onclick="ACT.seed()">Nạp dữ liệu mẫu</button>
          <button class="btn btn-gh" style="color:var(--rose)" onclick="ACT.reset()">Xoá toàn bộ tiến độ</button>
        </div>
      </div>
    </div>
  </div></div>`;
}

/* ════════ ROUTER ════════ */
const ROUTES = {
  dashboard:{f:vDashboard, c:["Dashboard"]},
  tracks:{f:vTracks, c:["Học tập","Lộ trình học"]},
  lesson:{f:vLesson, c:["Học tập","Bài học"]},
  arena:{f:vArena, c:["Luyện tập","Practice Arena"]},
  library:{f:vLibrary, c:["Luyện tập","Case Library"]},
  career:{f:vCareer, c:["Phát triển","Career Path"]},
  competition:{f:vCompetition, c:["Luyện tập","Competition"]},
  interview:{f:vInterview, c:["Luyện tập","Interview Mode"]},
  review:{f:vReview, c:["Phát triển","Mistake Review"]},
  settings:{f:vSettings, c:["Tài khoản","Dữ liệu & sao lưu"]}
};

function renderRail(){
  const lv = State.level(), name = State.data.user.name || "Đinh Trí Bùi";
  const ini = name.split(/\s+/).filter(Boolean).map(w=>w[0]).slice(-2).join("").toUpperCase() || "TB";
  const set = (sel,v) => { const el=document.querySelector(sel); if(el) el.textContent=v; };
  set(".rail-av", ini); set(".user-av-pic", ini); set(".rail-nm", name); set(".rail-lv", `${lv.title} · Lv ${lv.lv}`);
  const gold = document.getElementById("goldCounter");
  if(gold){
    const totalXP = State.xpTotal();
    gold.textContent = totalXP ? Math.max(60, totalXP) : 60;
  }
  const badge = document.getElementById("revBadge"), due = State.dueToday();
  if(badge){ badge.textContent = due; badge.hidden = !due; }
}

function render(keepScroll){
  const y = window.scrollY;
  const parts = location.hash.replace(/^#\/?/,"").split("/").filter(Boolean);
  const key = ROUTES[parts[0]] ? parts[0] : "dashboard";
  const r = ROUTES[key];
  let html;
  if(key==="career" && parts[1]) html = vCareerDetail(parts[1]);
  else if(key==="lesson") html = vLesson(parts[1]);
  else if(key==="arena") html = vArena(parts[1]);
  else if(key==="competition") html = vCompetition(parts[1]);
  else if(key==="interview") html = vInterview(parts[1]);
  else html = r.f();
  document.getElementById("view").innerHTML = html;
  document.getElementById("crumbs").innerHTML =
    r.c.map((x,i,a)=> i===a.length-1?`<b>${esc(x)}</b>`:`${esc(x)} <span>›</span>`).join(" ");
  document.querySelectorAll(".rail a").forEach(a=>{
    const h=a.getAttribute("href")||"";
    a.classList.toggle("on", h.replace(/^#\//,"").split("/")[0]===key && !a.classList.contains("rail-brand"));
  });
  const lb=document.getElementById("langBox"); if(lb) lb.innerHTML = I18N.toggle();
  const needNote = key!=="lesson" || !(window.LESSON_CONTENT_EN||{})[parts[1]];
  if(I18N.lang==="en" && needNote && ["lesson","arena","competition","interview"].includes(key)){
    const note=document.createElement("div"); note.className="callout tip"; note.style.margin="0 0 14px";
    note.innerHTML = `<b>Note:</b> ${esc(I18N.CONTENT_NOTE)}`;
    const host=document.querySelector("#view .main, #view .arena-l"); if(host) host.insertBefore(note, host.firstChild);
  }
  const rMode = (State.getReaderPrefs && State.getReaderPrefs().theme) || "light";
  if(key === "lesson" && rMode === "sepia"){
    document.documentElement.setAttribute("data-reading-mode", "sepia");
  } else {
    document.documentElement.removeAttribute("data-reading-mode");
  }
  I18N.apply(document.body);
  renderRail();
  if(key==="arena") startArenaTimer(); else clearInterval(ARENA.timer);
  if(key==="competition" && parts[1]) startCompTimer(parts[1]); else clearInterval(COMPUI.timer);
  window.scrollTo(0, keepScroll ? y : 0);
}
addEventListener("hashchange", ()=>render());
addEventListener("DOMContentLoaded", ()=>{ if(!location.hash) location.hash="#/dashboard"; render(); });
