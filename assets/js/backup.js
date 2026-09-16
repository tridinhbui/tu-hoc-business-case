/* ===== SAO LƯU & KHÔI PHỤC TIẾN ĐỘ =====
   Toàn bộ tiến độ nằm trong localStorage của trình duyệt. Xoá dữ liệu duyệt web
   là mất hết, nên người học cần một đường xuất ra file và nạp lại. */
(function(){
const B = {};
const KEY = "stratlab.v1";

function stamp(){
  const d = new Date();
  const p = n => String(n).padStart(2,"0");
  return d.getFullYear()+p(d.getMonth()+1)+p(d.getDate())+"-"+p(d.getHours())+p(d.getMinutes());
}

B.summary = function(){
  const S = State.get();
  return {
    xp: S.xp,
    level: State.level().n,
    cases: Object.values(S.cases||{}).filter(c=>c.done).length,
    lessons: Object.values(S.lessons||{}).filter(l=>l.done).length,
    exams: Object.values(S.exams||{}).filter(e=>e.passed).length,
    badges: (S.badges||[]).length,
    battles: Object.keys(S.battles||{}).length,
    models: Object.keys(S.models||{}).length,
    streak: (S.streak&&S.streak.best)||0,
    daily: (S.dailyLog||[]).length
  };
};

B.export_ = function(){
  const payload = {
    app:"stratlab", format:1, exportedAt:new Date().toISOString(),
    summary: B.summary(), state: State.get()
  };
  const blob = new Blob([JSON.stringify(payload,null,2)], {type:"application/json"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "stratlab-progress-"+stamp()+".json";
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(()=>URL.revokeObjectURL(url), 2000);
  UI.toast("ĐÃ TẢI XUỐNG", a.download);
};

/* Kiểm tra file trước khi nạp — không tin dữ liệu bên ngoài */
B.validate = function(obj){
  if(!obj || typeof obj!=="object") return "File không phải JSON hợp lệ.";
  if(obj.app !== "stratlab") return "File này không phải bản sao lưu của STRATLAB.";
  if(!obj.state || typeof obj.state!=="object") return "File thiếu phần dữ liệu tiến độ.";
  const s = obj.state;
  if(typeof s.xp !== "number") return "Dữ liệu tiến độ bị hỏng (thiếu XP).";
  ["cases","lessons","badges"].forEach(k=>{ if(s[k]==null) s[k] = (k==="badges"?[]:{}) });
  return null;
};

B.countsOf = function(state){
  return {
    xp: state.xp||0,
    cases: Object.values(state.cases||{}).filter(c=>c.done).length,
    lessons: Object.values(state.lessons||{}).filter(l=>l.done).length,
    exams: Object.values(state.exams||{}).filter(e=>e.passed).length
  };
};

/* Gộp: giữ kết quả TỐT HƠN ở mỗi mục, không ghi đè mù quáng */
B.merge = function(cur, inc){
  const out = JSON.parse(JSON.stringify(cur));
  out.xp = Math.max(cur.xp||0, inc.xp||0);
  Object.entries(inc.cases||{}).forEach(([id,c])=>{
    const a = out.cases[id];
    if(!a || (c.score||0) > (a.score||0) || (c.done && !a.done)){
      out.cases[id] = Object.assign({}, a, c, {
        score: Math.max((a&&a.score)||0, c.score||0),
        done: !!((a&&a.done) || c.done),
        endingsSeen: Array.from(new Set([].concat((a&&a.endingsSeen)||[], c.endingsSeen||[])))
      });
    }
  });
  Object.entries(inc.lessons||{}).forEach(([id,l])=>{
    const a = out.lessons[id];
    if(!a || (l.score||0) > (a.score||0)) out.lessons[id] = {done: !!(l.done||(a&&a.done)), score: Math.max((a&&a.score)||0, l.score||0)};
  });
  Object.entries(inc.exams||{}).forEach(([id,e])=>{
    const a = out.exams[id];
    if(!a || (e.best||0) > (a.best||0)) out.exams[id] = e;
    else if(e.passed) out.exams[id].passed = true;
  });
  out.badges = Array.from(new Set([].concat(cur.badges||[], inc.badges||[])));
  ["models","battles","seen"].forEach(k=>{ out[k] = Object.assign({}, cur[k]||{}, inc[k]||{}) });
  if((inc.streak&&inc.streak.best||0) > (cur.streak&&cur.streak.best||0)) out.streak = inc.streak;
  if((inc.dailyLog||[]).length > (cur.dailyLog||[]).length) out.dailyLog = inc.dailyLog;
  if(inc.profile && inc.profile.name && !(cur.profile&&cur.profile.name)) out.profile = inc.profile;
  return out;
};

B.importFile = function(file){
  const reader = new FileReader();
  reader.onload = function(){
    let obj;
    try{ obj = JSON.parse(reader.result) }catch(e){ alert("Không đọc được file: "+e.message); return }
    const err = B.validate(obj);
    if(err){ alert(err); return }
    const inc = B.countsOf(obj.state), cur = B.countsOf(State.get());
    const msg =
      "Bản sao lưu:\n"+
      "  " + inc.lessons + " bài học · " + inc.cases + " case · " + inc.exams + " chứng chỉ · " + inc.xp + " XP\n\n"+
      "Tiến độ hiện tại:\n"+
      "  " + cur.lessons + " bài học · " + cur.cases + " case · " + cur.exams + " chứng chỉ · " + cur.xp + " XP\n\n"+
      "OK = GỘP (giữ kết quả tốt hơn ở mỗi mục)\n"+
      "Cancel = dừng lại, không thay đổi gì";
    if(!confirm(msg)) return;
    const merged = B.merge(State.get(), obj.state);
    try{ localStorage.setItem(KEY, JSON.stringify(merged)) }catch(e){ alert("Không ghi được dữ liệu: "+e.message); return }
    alert("Đã khôi phục. Trang sẽ tải lại.");
    location.reload();
  };
  reader.onerror = function(){ alert("Không đọc được file.") };
  reader.readAsText(file);
};

B.pickFile = function(){
  const inp = document.createElement("input");
  inp.type = "file"; inp.accept = "application/json,.json";
  inp.onchange = function(){ if(inp.files && inp.files[0]) B.importFile(inp.files[0]) };
  inp.click();
};

B.resetWithGuard = function(){
  const s = B.summary();
  if(s.lessons + s.cases > 0){
    if(!confirm("Bạn đang có "+s.lessons+" bài học và "+s.cases+" case đã hoàn thành.\n\nNên tải file sao lưu trước khi xoá. Vẫn xoá toàn bộ?")) return;
  } else if(!confirm("Xoá toàn bộ tiến độ, XP, badge và streak?")) return;
  State.reset(); location.hash="#/"; location.reload();
};

window.BACKUP = B;
})();
