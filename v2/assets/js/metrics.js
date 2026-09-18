/* ═══ CASELAB · Đo lường hành vi học ═══
   Ghi thời gian học CHỦ ĐỘNG và các sự kiện học tập vào localStorage("caselab.metrics.v1").
   - Thời gian chủ động: chỉ đếm khi tab đang hiển thị VÀ có thao tác (chuột, phím, cuộn, chạm)
     trong IDLE_MS gần nhất — để tab mở rồi bỏ đi không bị tính là học.
   - Phiên học: nghỉ quá SESSION_GAP_MS thì lần hoạt động tiếp theo mở phiên mới.
   - Sự kiện: bọc các hàm ghi của State (hoàn thành bài, trả lời quiz, nộp case, luyện nói)
     nên không phải sửa app.js. Phải nạp SAU state.js.
   Trang admin.html đọc cùng khoá này (cùng origin) để hiện số liệu thật.
   Đồng bộ máy chủ: khi chạy trên http(s), gửi ảnh chụp LUỸ KẾ ẩn danh tới /api/metrics/ingest
   (mã thiết bị ngẫu nhiên, không tên, không email) mỗi phút nếu có thay đổi và khi rời trang.
   Máy chủ không có (chạy file:// hoặc máy chủ tĩnh) thì lặng lẽ bỏ qua. */
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

/* ── đồng bộ lên máy chủ ── */
const DEVICE_KEY = "caselab.device", SYNC_URL = "/api/metrics/ingest", SYNC_EVERY_MS = 60000, SYNC_DAYS = 45;
let lastSyncSig = "", lastSyncAt = 0;

function deviceId(){
  try{
    let id = localStorage.getItem(DEVICE_KEY);
    if(!id || !/^[a-z0-9-]{8,48}$/.test(id)){
      id = (crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + "-" + Math.random().toString(36).slice(2)).toLowerCase();
      localStorage.setItem(DEVICE_KEY, id);
    }
    return id;
  }catch(e){ return null; }
}

function snapshot(){
  const days = Object.keys(M.days).sort().slice(-SYNC_DAYS).map(day => {
    const d = M.days[day];
    return { day, sec:Math.round(d.sec), sessions:d.sessions, views:d.views, lessonsDone:d.lessonsDone,
             quiz:d.quiz, quizRight:d.quizRight, cases:d.cases };
  });
  const prog = (State.data && State.data.lessons) || {};
  const ids = new Set(Object.keys(M.lessons).concat(Object.keys(prog)));
  const lessons = [];
  ids.forEach(id => {
    const m = M.lessons[id] || {}, r = prog[id] || {};
    if(!/^[a-z0-9-]{2,48}$/.test(id)) return;
    lessons.push({ id, sec:Math.round(m.sec || 0), views:m.views || 0,
                   doneDay: r.status === "done" ? (r.doneAt || null) : null,
                   secToDone: m.secToDone == null ? null : m.secToDone, readPct: r.readPct || 0 });
  });
  return { device:deviceId(), days, lessons };
}

function sync(force){
  if(!/^https?:$/.test(location.protocol)) return;
  const now = Date.now();
  if(!force && now - lastSyncAt < SYNC_EVERY_MS) return;
  const snap = snapshot();
  if(!snap.device) return;
  const body = JSON.stringify(snap);
  if(body === lastSyncSig) return;                          // không có gì mới
  lastSyncAt = now;
  try{
    if(navigator.sendBeacon && navigator.sendBeacon(SYNC_URL, new Blob([body], { type:"text/plain" }))){ lastSyncSig = body; return; }
    fetch(SYNC_URL, { method:"POST", body, keepalive:true, headers:{ "content-type":"text/plain" } })
      .then(r => { if(r.ok) lastSyncSig = body; }).catch(() => {});
  }catch(e){}
}
setInterval(() => sync(false), SYNC_EVERY_MS);
document.addEventListener("visibilitychange", () => { if(document.visibilityState === "hidden") sync(true); });
window.addEventListener("pagehide", () => sync(true));
setTimeout(() => sync(true), 5000);

window.Metrics = {
  KEY, IDLE_MS, SESSION_GAP_MS,
  get data(){ return M; },
  flush(){ tick(); save(true); },
  sync(){ sync(true); },
  snapshot,
  exportJSON(){ return JSON.stringify(M); },
  _reload(){ M = load(); }
};
})();
