/* ════════ SO SÁNH NGHỀ ════════
   #/compare/a,b,c — 2 đến 3 nghề đặt thành cột. Lựa chọn nằm trong URL nên chia sẻ được link.
   Dùng esc, bar, render của app.js và CAREER_FIT (hồ sơ 8 trục) nếu đã nạp. */
(function(){
const MAX = 3;

/* chuẩn hoá danh sách id: bỏ id lạ, bỏ trùng; thiếu thì bù nghề đang theo và nghề đầu danh sách */
function parseIds(arg){
  const C = window.CAREER_BY_ID, out = [];
  String(arg||"").split(",").map(s=>s.trim()).forEach(id=>{ if(C[id] && !out.includes(id) && out.length<MAX) out.push(id); });
  const fill = [window.State && window.State.data.career, ...window.CAREERS.map(c=>c.id)];
  for(const id of fill){ if(out.length>=2) break; if(id && C[id] && !out.includes(id)) out.push(id); }
  return out;
}
const hrefOf = ids => "#/compare/" + ids.join(",");

function vCompare(arg){
  const ids = parseIds(arg), cs = ids.map(id=>window.CAREER_BY_ID[id]);
  const mine = window.State && window.State.data.career;
  const cats = window.CAREER_CATS || [];
  const quiz = window.State && window.State.data.careerQuiz, FIT = window.CAREER_FIT;
  const fitPct = quiz && FIT && FIT.QUESTIONS.every(q=>quiz.answers[q.id]!=null)
    ? Object.fromEntries(FIT.score(quiz.answers).map(r=>[r.id,r.pct])) : null;

  const picker = (i) => `<div class="field"><label class="lbl"><span>Nghề</span> ${i+1}</label>
    <select onchange="COMPARE.set(${i},this.value)">
      ${i>=2?`<option value="" ${ids[i]?"":"selected"}>${esc(I18N.t("— Không chọn —"))}</option>`:""}
      ${cats.map(k=>`<optgroup label="${esc(I18N.t(k.n))}">${window.CAREERS.filter(x=>x.cat===k.id).map(x=>
        `<option value="${x.id}" ${x.id===ids[i]?"selected":""} ${ids.includes(x.id)&&x.id!==ids[i]?"disabled":""}>${esc(x.n)}</option>`).join("")}</optgroup>`).join("")}
    </select></div>`;

  /* dòng bảng: nhãn + một ô mỗi nghề */
  const row = (label, cell, note) => `<tr><th scope="row" style="vertical-align:top;min-width:150px;padding:12px">${esc(label)}${note?`<div class="small muted" style="text-transform:none;letter-spacing:0;font-weight:500;margin-top:4px">${esc(note)}</div>`:""}</th>
    ${cs.map(c=>`<td style="vertical-align:top;min-width:220px">${cell(c)}</td>`).join("")}</tr>`;
  const list = arr => `<ul style="margin:0;padding-left:16px">${arr.map(x=>`<li style="margin-bottom:5px">${esc(x)}</li>`).join("")}</ul>`;
  const sec = t => `<tr><td colspan="${cs.length+1}" style="padding:18px 12px 6px;background:var(--surface-2)"><span class="lbl">${esc(t)}</span></td></tr>`;

  /* phần giống nhau: track học chung */
  const sharedTracks = cs[0].tracks.filter(t=>cs.every(c=>c.tracks.includes(t)));

  /* 8 trục: chỉ khi đã nạp CAREER_FIT */
  const axisRows = FIT ? Object.entries(FIT.AXES).map(([k,a])=>{
    const vals = cs.map(c=>FIT.PROFILE[c.id] ? FIT.PROFILE[c.id][k] : null);
    const differs = new Set(vals).size>1;
    return row(a.n, c=>{ const v=FIT.PROFILE[c.id]&&FIT.PROFILE[c.id][k]; if(v==null) return "—";
      return `<div class="row" style="gap:8px"><div style="width:70px">${bar(v*50, v===2?"":"accent")}</div>
        <span class="small ${differs?"":"muted"}">${esc(a.lv[v])}</span></div>`; });
  }).join("") : "";

  return `<div class="main">
  <div class="row" style="justify-content:space-between;flex-wrap:wrap;gap:12px;align-items:flex-end">
    <div><h1>So sánh nghề</h1>
      <p class="muted" style="margin-top:4px;max-width:72ch">Đặt 2–3 nghề cạnh nhau để thấy khác biệt thật: công việc hằng tuần, cách tuyển, đường thăng tiến và kiểu người hợp. Ở phần tính chất công việc, chữ mờ là chỗ các nghề giống nhau.</p></div>
    <div class="row"><a class="btn" href="#/fit">Trắc nghiệm chọn nghề</a><a class="btn" href="#/career">Career Path</a></div>
  </div>

  <div class="toolbar mt">${[0,1,2].map(picker).join("")}</div>

  ${sharedTracks.length ? `<div class="callout ok mt"><b>Học chung được:</b> <span>${sharedTracks.map(t=>esc(window.TRACK_BY_ID[t].n)).join(" · ")}</span>
    <div class="small">Các track này có trong lộ trình của mọi nghề đang so sánh — học trước để chưa phải chốt nghề.</div></div>` : ""}

  <div class="card mt" style="overflow-x:auto">
  <table class="tb" style="table-layout:auto">
    <thead><tr><th></th>${cs.map(c=>`<th style="text-transform:none;letter-spacing:0;font-size:13px;vertical-align:top;padding:12px">
      <div class="row" style="gap:9px"><span class="tile t-${c.color}">${c.icon}</span>
        <div><div style="font-size:14px;color:var(--text)">${esc(c.n)}</div><div class="small muted" style="font-weight:500">${esc(c.vi)}</div></div></div>
      <div class="row mt-s" style="gap:6px;flex-wrap:wrap">
        ${fitPct?`<span class="tag tag-accent num">${fitPct[c.id]}%</span><span class="tag">mức hợp</span>`:""}
        ${mine===c.id?`<span class="tag tag-e">Đang theo</span>`:""}
      </div></th>`).join("")}</tr></thead>
    <tbody style="cursor:default">
      ${sec("Tổng quan")}
      ${row("Công việc", c=>`<span class="small">${esc(c.intro)}</span>`)}
      ${row("Nhóm nghề", c=>esc((window.CAREER_CAT_BY_ID||{})[c.cat] ? window.CAREER_CAT_BY_ID[c.cat].n : ""))}
      ${row("Vị trí khởi điểm", c=>c.entry.map(esc).join("<br>"))}
      ${row("Nơi tuyển", c=>`<span class="small">${esc(c.firms)}</span>`)}
      ${axisRows ? sec("Tính chất công việc") + axisRows : ""}
      ${sec("Kỹ năng & học tập")}
      ${row("Kỹ năng cần đạt", c=>c.skills.map(s=>`<div class="row" style="gap:8px;margin-bottom:5px">
        <span class="small" style="flex:1">${esc(s.n)}</span><span class="small muted num">Lv${s.lv}</span></div>`).join(""))}
      ${row("Track cần học", c=>c.tracks.map(t=>`<div class="small" style="margin-bottom:4px;${sharedTracks.includes(t)?"":"font-weight:700"}">${esc(window.TRACK_BY_ID[t].n)}</div>`).join(""), "In đậm: chỉ nghề này cần")}
      ${row("Tốt nghiệp khi", c=>`<span class="small">${esc(c.gate)}</span>`)}
      ${cs.every(c=>c.week) ? `
      ${sec("Thực tế nghề")}
      ${row("Một tuần điển hình", c=>`<div class="small">${list(c.week)}</div>`)}
      ${row("Lộ trình thăng tiến", c=>c.ladder.map(l=>`<div style="margin-bottom:7px"><div class="small"><b>${esc(l.t)}</b></div><div class="small muted">${esc(l.y)}</div></div>`).join(""))}
      ${row("Quy trình tuyển dụng", c=>c.hiring.map((h,i)=>`<div class="small" style="margin-bottom:5px"><span class="muted num">${i+1}.</span> ${esc(h.t)}</div>`).join(""))}
      ${row("Hợp với bạn nếu", c=>`<div class="small">${list(c.fit.yes)}</div>`)}
      ${row("Cân nhắc lại nếu", c=>`<div class="small">${list(c.fit.no)}</div>`)}
      ${row("Lỗi ứng viên hay mắc", c=>`<div class="small">${list(c.pitfalls)}</div>`)}` : ""}
      <tr><th></th>${cs.map(c=>`<td style="padding:12px"><div class="row" style="gap:6px;flex-wrap:wrap">
        <a class="btn btn-sm" href="#/career/${c.id}">Chi tiết</a>
        ${c.cases?`<a class="btn btn-sm btn-gh" href="#/drill/${c.id}">Thử 3 câu case</a>`:""}
        <button class="btn btn-sm ${mine===c.id?"":"btn-p"}" onclick="COMPARE.choose('${c.id}')">${mine===c.id?"Đang theo":"Chọn lộ trình"}</button>
      </div></td>`).join("")}</tr>
    </tbody>
  </table>
  </div>
  </div>`;
}

window.vCompare = vCompare;
window.COMPARE = {
  parseIds, hrefOf,
  set(i, id){
    const cur = parseIds((location.hash.split("/")[2])||"");
    const next = cur.slice();
    if(!id){ next.splice(i,1); }
    else { next[i] = id; }
    location.hash = hrefOf(next.filter(Boolean).filter((x,k,a)=>a.indexOf(x)===k));
  },
  choose(id){
    if(State.data.career===id){ location.hash = "#/career/"+id; return; }
    State.setCareer(id); toast("Đã chọn lộ trình — thứ tự bài học được sắp lại"); render(true);
  }
};

if(window.I18N) I18N.add({
  "So sánh nghề":"Compare careers",
  "Đặt 2–3 nghề cạnh nhau để thấy khác biệt thật: công việc hằng tuần, cách tuyển, đường thăng tiến và kiểu người hợp. Ở phần tính chất công việc, chữ mờ là chỗ các nghề giống nhau.":
    "Put 2–3 careers side by side to see the real differences: weekly work, hiring, progression and who fits. In the work-profile section, faded text marks where the careers are the same.",
  "— Không chọn —":"— None —",
  "Học chung được:":"Learn once for all:",
  "Các track này có trong lộ trình của mọi nghề đang so sánh — học trước để chưa phải chốt nghề.":
    "These tracks are in every compared career's path — study them first while you decide.",
  "Tổng quan":"Overview", "Công việc":"The work", "Nhóm nghề":"Career group", "Vị trí khởi điểm":"Entry roles",
  "Nơi tuyển":"Who hires", "Tính chất công việc":"Work profile", "Kỹ năng & học tập":"Skills & learning",
  "Kỹ năng cần đạt":"Skills to reach", "Track cần học":"Tracks to study", "In đậm: chỉ nghề này cần":"Bold: only this career needs it",
  "Tốt nghiệp khi":"Graduate when", "Thực tế nghề":"On the job", "Chi tiết":"Details",
  "So sánh với nghề khác":"Compare with other careers", "So sánh 3 nghề này":"Compare these 3",
  "So sánh":"Compare"
});
})();
