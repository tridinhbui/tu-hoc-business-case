/* ═══ CASELAB · Đo lường hành vi học ═══
   Ghi thời gian học CHỦ ĐỘNG và các sự kiện học tập vào localStorage("caselab.metrics.v1").
   - Thời gian chủ động: chỉ đếm khi tab đang hiển thị VÀ có thao tác (chuột, phím, cuộn, chạm)
     trong IDLE_MS gần nhất — để tab mở rồi bỏ đi không bị tính là học.
   - Phiên học: nghỉ quá SESSION_GAP_MS thì lần hoạt động tiếp theo mở phiên mới.
   - Sự kiện: bọc các hàm ghi của State (hoàn thành bài, trả lời quiz, nộp case, luyện nói)
     nên không phải sửa app.js. Phải nạp SAU state.js.
   Trang admin.html đọc cùng khoá này (cùng origin) để hiện số liệu thật. */
(function(){
if(!window.State) return;

const KEY = "caselab.metrics.v1";
const TICK_MS = 5000;               // chu kỳ cộng dồn thời gian
const IDLE_MS = 60000;              // quá 60 giây không thao tác thì coi là rời máy
const SESSION_GAP_MS = 30 * 60000;  // nghỉ quá 30 phút thì mở phiên mới
const MAX_SESSIONS = 120, MAX_EVENTS = 600;

function blank(){
  return { v:1, created:new Date().toISOString(), updated:null,
           days:{}, routes:{}, lessons:{}, sessions:[], events:[], lastActive:0 };
}
function load(){
  try{
    const d = JSON.parse(localStorage.getItem(KEY) || "null");
    return d && d.v === 1 ? Object.assign(blank(), d) : blank();
  }catch(e){ return blank(); }
}
let M = load(), dirty = false, lastSave = 0;
function save(force){
  if(!dirty && !force) return;
  M.updated = new Date().toISOString();
  try{ localStorage.setItem(KEY, JSON.stringify(M)); dirty = false; lastSave = Date.now(); }catch(e){}
}

const today = () => State.today();
function dayRec(d){ return M.days[d] || (M.days[d] = {sec:0, sessions:0, views:0, lessonsDone:0, quiz:0, quizRight:0, cases:0}); }

/* ── màn hình hiện tại theo hash: "#/lesson/f-sizing-3" → route "lesson/f-sizing-3", lesson "f-sizing-3" ── */
function currentRoute(){
  const h = (location.hash || "").replace(/^#\/?/, "").split("?")[0];
  const parts = h.split("/").filter(Boolean);
  const route = parts.length ? parts.slice(0, 2).join("/") : "dashboard";
  const lessonId = parts[0] === "lesson" && parts[1] && window.LESSON_BY_ID && window.LESSON_BY_ID[parts[1]] ? parts[1] : null;
  return { route, lessonId };
}
function lessonRec(id){ return M.lessons[id] || (M.lessons[id] = {sec:0, views:0, first:null, last:null, doneAt:null, secToDone:null}); }
function routeRec(r){ return M.routes[r] || (M.routes[r] = {sec:0, views:0}); }

/* ── phiên học ── */
function curSession(){ return M.sessions[M.sessions.length - 1]; }
function ensureSession(now){
  const s = curSession();
  if(s && now - s.end <= SESSION_GAP_MS) return s;
  const ns = { start:now, end:now, sec:0, views:0, day:today() };
  M.sessions.push(ns);
  if(M.sessions.length > MAX_SESSIONS) M.sessions.splice(0, M.sessions.length - MAX_SESSIONS);
  dayRec(ns.day).sessions += 1;
  dirty = true;
  return ns;
}

function logEvent(type, data){
  M.events.push(Object.assign({ t:Date.now(), type }, data || {}));
  if(M.events.length > MAX_EVENTS) M.events.splice(0, M.events.length - MAX_EVENTS);
  dirty = true;
}

/* ── thời gian chủ động ── */
let lastInput = Date.now(), lastTick = Date.now();
["mousemove","mousedown","keydown","scroll","touchstart","wheel"].forEach(ev =>
  window.addEventListener(ev, () => { lastInput = Date.now(); }, { passive:true, capture:true }));

function tick(){
  const now = Date.now();
  const elapsed = Math.min(now - lastTick, TICK_MS * 2);   // máy ngủ dậy không bị cộng cả khoảng ngủ
  lastTick = now;
  if(document.visibilityState !== "visible" || now - lastInput > IDLE_MS) return;
  const sec = elapsed / 1000;
  const s = ensureSession(now);
  s.end = now; s.sec += sec;
  const { route, lessonId } = currentRoute();
  dayRec(today()).sec += sec;
  routeRec(route).sec += sec;
  if(lessonId){ const l = lessonRec(lessonId); l.sec += sec; l.last = now; }
  M.lastActive = now;
  dirty = true;
  if(now - lastSave > 15000) save();
}
setInterval(tick, TICK_MS);

/* ── lượt xem màn hình ── */
function onView(){
  const now = Date.now(), { route, lessonId } = currentRoute();
  lastInput = now;                                         // mở màn hình mới là một thao tác
  const s = ensureSession(now); s.views += 1; s.end = now;
  dayRec(today()).views += 1;
  routeRec(route).views += 1;
  if(lessonId){ const l = lessonRec(lessonId); l.views += 1; l.first = l.first || now; l.last = now; }
  dirty = true; save();
}
window.addEventListener("hashchange", onView);
if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", onView); else onView();

document.addEventListener("visibilitychange", () => { tick(); save(true); });
window.addEventListener("pagehide", () => { tick(); save(true); });

/* ── bọc các hàm ghi của State để bắt sự kiện học tập ── */
function wrap(name, after){
  const orig = State[name];
  if(typeof orig !== "function") return;
  State[name] = function(){
    const before = after.before ? after.before.apply(null, arguments) : undefined;
    const out = orig.apply(this, arguments);
    try{ after.fn(out, arguments, before); }catch(e){}
    return out;
  };
}
wrap("completeLesson", { fn(ok, [id]){
  if(!ok) return;
  const l = lessonRec(id); l.doneAt = Date.now(); l.secToDone = Math.round(l.sec);
  dayRec(today()).lessonsDone += 1;
  logEvent("lesson_done", { id, sec:l.secToDone });
  save(true);
}});
wrap("answerQuiz", {
  before(id, qid){ const r = State.data.lessons[id]; return !(r && r.quiz && r.quiz[qid]); },   // chỉ tính lần đầu
  fn(res, [id, qid, correct], first){
    if(!first) return;
    const d = dayRec(today()); d.quiz += 1; if(correct) d.quizRight += 1;
    logEvent("quiz", { id, q:qid, ok:!!correct }); save();
  }
});
wrap("recordAttempt", { fn(res, [caseId, info]){
  dayRec(today()).cases += 1;
  logEvent("case", { id:caseId, total:info && info.total, sec:info && info.seconds }); save(true);
}});
wrap("answerDrill", { fn(r, [key]){ if(r) { logEvent("speak", { id:key }); save(); } }});
wrap("reset", { fn(){ M = blank(); save(true); } });

window.Metrics = {
  KEY, IDLE_MS, SESSION_GAP_MS,
  get data(){ return M; },
  flush(){ tick(); save(true); },
  exportJSON(){ return JSON.stringify(M); },
  _reload(){ M = load(); }
};
})();
