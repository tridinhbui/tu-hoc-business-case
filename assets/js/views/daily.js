/* ===== DAILY BUSINESS CHALLENGE ===== */
window.VIEWS.daily = function(){
  const cs   = State.dailyCase();
  const co   = window.COMPANY_BY_ID[cs.company];
  const res  = State.dailyResult();
  const done = State.dailyDone();
  const S    = State.get();

  const AXES = [
    {k:"acc",   n:"Accuracy",               w:"35%", d:"Đọc số đúng và mở đúng gói dữ liệu"},
    {k:"logic", n:"Logic",                  w:"25%", d:"Cấu trúc vấn đề và thứ tự ưu tiên"},
    {k:"rec",   n:"Recommendation quality", w:"25%", d:"Khuyến nghị cuối có bảo vệ được không"},
    {k:"speed", n:"Speed",                  w:"15%", d:"Hoàn thành trong giới hạn "+cs.minutes+" phút"}
  ];

  // cohort giả lập, cố định theo ngày để bảng xếp hạng không nhảy trong cùng một ngày
  const seed = (S.daily.date||"2026-01-01").split("-").reduce((a,b)=>a+parseInt(b,10),0);
  const names = ["H. Trang","D. Minh","N. Anh","P. Long","T. Vy","L. Khoa","B. Ngọc","V. Hải","Q. Duy","M. Chi","K. Sơn","T. Hà"];
  const cohort = names.map((n,i)=>{
    const r = (seed*(i+7)*37)%100;
    const total = 58 + (r%38);
    return {n, total, acc:Math.min(100,total+((r%9)-4)), logic:Math.min(100,total+((r%7)-3)),
            rec:Math.min(100,total+((r%11)-5)), speed:Math.min(100,total+((r%13)-6)),
            secs:Math.round(cs.minutes*60*(0.55+((r%40)/100)))};
  });
  const board = cohort.concat(res? [{n:"Bạn", total:res.total, acc:res.acc, logic:res.logic, rec:res.rec, speed:res.speed, secs:res.seconds, me:true}] : [])
                      .sort((a,b)=>b.total-a.total);
  const myRank = res ? board.findIndex(r=>r.me)+1 : null;
  const mmss = n => Math.floor(n/60)+":"+String(n%60).padStart(2,"0");

  return `<div class="wrap">
  <section class="sec">
    <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:20px;flex-wrap:wrap">
      <div>
        <div class="mono" style="font-size:11px;letter-spacing:.2em;color:var(--dim-2);text-transform:uppercase">Daily business challenge · ${UI.esc(S.daily.date||"")}</div>
        <h1 style="font-size:34px;margin-top:6px">Assignment hôm nay</h1>
        <p class="muted" style="max-width:64ch;margin-top:10px">Một case duy nhất, tính giờ từ lúc bạn bấm bắt đầu. Điểm hôm nay chấm theo bốn trục và chỉ được tính một lần — đúng như một buổi sáng thật ở phòng chiến lược.</p>
      </div>
      <div style="text-align:right">
        <div class="mono" style="font-size:10px;letter-spacing:.14em;color:var(--dim-2);text-transform:uppercase">Đã hoàn thành</div>
        <div style="font-family:var(--head);font-size:30px;color:var(--brass-2)">${State.dailyStreakCount()}<span style="color:var(--dim);font-size:18px"> ngày</span></div>
      </div>
    </div>
  </section>

  <section class="sec">
    <div class="panel" style="border-left:2px solid var(--brass)">
      <div class="panel-h"><b>Briefing</b><div style="flex:1"></div>
        ${UI.diffTag(cs.difficulty)}${UI.typeTag(cs.type)}
        <span class="tag brass">giới hạn ${cs.minutes} phút</span></div>
      <div class="panel-b">
        <div class="pl-q" style="margin-top:0">${UI.esc(cs.title)}</div>
        <div class="muted" style="font-size:14.4px;margin-top:10px">${UI.esc(cs.brief.situation)}</div>
        <div class="hr"></div>
        <div class="grid g4">${cs.brief.facts.map(f=>UI.statBox(f.k,f.v,"")).join("")}</div>
        <div class="pl-actions">
          ${done
            ? `<span class="mono" style="font-size:12px;color:var(--pos)">Đã nộp bài hôm nay · tổng điểm ${res.total} · hạng ${myRank}/${board.length}</span>
               <a class="btn btn-sm" href="#/review/${cs.id}">Xem case review</a>
               <a class="btn btn-sm btn-ghost" href="#/case/${cs.id}">Giải lại (không tính điểm)</a>`
            : `<a class="btn btn-primary" href="#/daily/${cs.id}">Bắt đầu — đồng hồ chạy ngay</a>
               ${co?'<a class="btn btn-ghost btn-sm" href="#/company/'+co.id+'">Xem hồ sơ '+UI.esc(co.name)+' trước</a>':''}`}
        </div>
      </div>
    </div>
  </section>

  <section class="sec">
    ${UI.secHead("Scoring","Cách chấm điểm","tổng = trung bình có trọng số của bốn trục")}
    <div class="grid g4">
      ${AXES.map(a=>`<div class="panel"><div class="panel-b">
        <div style="display:flex;justify-content:space-between;align-items:baseline">
          <span style="font-family:var(--head);font-size:15px;text-transform:uppercase;letter-spacing:.05em">${UI.esc(a.n)}</span>
          <span class="mono" style="font-size:12px;color:var(--brass-2)">${a.w}</span>
        </div>
        <div class="muted" style="font-size:13px;margin-top:7px">${UI.esc(a.d)}</div>
        ${res?`<div class="dimbar ${res[a.k]>=75?'hi':(res[a.k]<50?'lo':'')}" style="margin-top:12px">
          <div class="db-h"><span>điểm của bạn</span><span>${res[a.k]}</span></div>
          <div class="db-t"><i style="width:${res[a.k]}%"></i></div></div>`:''}
      </div></div>`).join("")}
    </div>
    ${res?`<div class="mono" style="font-size:11.5px;color:var(--dim);margin-top:14px">
      Thời gian hoàn thành: <b style="color:var(--ink)">${mmss(res.seconds)}</b> trên giới hạn ${cs.minutes}:00 —
      ${res.speed>=100?'trong giờ, Speed đạt tối đa':(res.speed>0?'quá giờ, Speed bị trừ về '+res.speed:'quá gấp đôi thời gian, Speed về 0')}.
    </div>`:''}
  </section>

  <section class="sec" style="padding-bottom:40px">
    ${UI.secHead("Leaderboard","Bảng xếp hạng hôm nay", done? "hạng của bạn: "+myRank+"/"+board.length : "nộp bài để vào bảng")}
    <div class="panel"><div class="panel-b" style="overflow-x:auto">
      <table class="lb">
        <tr><th>#</th><th>Analyst</th><th class="r">Accuracy</th><th class="r">Logic</th><th class="r">Rec.</th><th class="r">Speed</th><th class="r">Thời gian</th><th class="r">Tổng</th></tr>
        ${board.map((r,i)=>`<tr class="${r.me?'me':''}">
          <td>${i+1}</td><td>${UI.esc(r.n)}</td>
          <td class="r">${r.acc}</td><td class="r">${r.logic}</td><td class="r">${r.rec}</td><td class="r">${r.speed}</td>
          <td class="r">${mmss(r.secs)}</td><td class="r"><b>${r.total}</b></td></tr>`).join("")}
      </table>
    </div></div>
    ${done?'':'<div class="mono" style="font-size:11.5px;color:var(--dim-2);margin-top:12px">Bảng xếp hạng là cohort mô phỏng, cố định trong ngày — dùng để bạn có một mốc so sánh, không phải người chơi thật.</div>'}
  </section>
</div>`;
};
