window.VIEWS.profile = function(){
  const S = State.get();
  const li = State.levelIndex(), lv = State.level(), nx = State.nextLevel();
  const pct = Math.round(State.levelProgress()*100);
  const doneCases = window.CASES.filter(c=>S.cases[c.id]&&S.cases[c.id].done);
  const avg = doneCases.length? Math.round(doneCases.reduce((a,c)=>a+S.cases[c.id].score,0)/doneCases.length):0;

  // dimension averages
  const dimSum = {}, dimCnt = {};
  doneCases.forEach(c=>{ const d=S.cases[c.id].dims||{}; Object.entries(d).forEach(([k,v])=>{dimSum[k]=(dimSum[k]||0)+v;dimCnt[k]=(dimCnt[k]||0)+1}) });
  const DIM_LABEL = VI.dimEn;

  // leaderboard (simulated cohort + player)
  const cohort = [
    {n:"H. Trang",xp:11840,acc:88},{n:"D. Minh",xp:9260,acc:84},{n:"N. Anh",xp:7410,acc:81},
    {n:"P. Long",xp:5120,acc:79},{n:"T. Vy",xp:3880,acc:76},{n:"L. Khoa",xp:2410,acc:72},
    {n:"B. Ngọc",xp:1560,acc:70},{n:"V. Hải",xp:820,acc:66},{n:"Q. Duy",xp:340,acc:61}
  ];
  const me = {n:"Bạn",xp:S.xp,acc:avg,me:true};
  const board = cohort.concat([me]).sort((a,b)=>b.xp-a.xp);

  return `<div class="wrap">
  <section class="sec">
    <h1 style="font-size:34px">Analyst Dossier</h1>
    <div class="grid g4" style="margin-top:22px">
      ${UI.statBox("Rank · Cấp bậc", lv.n, (lv.vi||"")+" — "+lv.note)}
      ${UI.statBox("XP · Tổng điểm", String(S.xp), nx? "Còn "+(nx.xp-S.xp)+" tới "+nx.n : "Cấp cao nhất")}
      ${UI.statBox("Cases · Đã giải", doneCases.length+"/"+window.CASES.length, "Điểm trung bình "+avg)}
      ${UI.statBox("Streak · Chuỗi ngày", (S.streak.cur||0)+" ngày", "Kỷ lục "+(S.streak.best||0)+" ngày")}
    </div>
  </section>

  <section class="sec">
    ${UI.secHead("Career Track","Lộ trình cấp bậc","cấp cao mở case khó hơn")}
    <div class="rank-track">
      ${State.levels.map((l,i)=>`<div class="rt ${i<li?'reached':''} ${i===li?'cur':''}">
        <div class="rt-n">${UI.esc(l.n)}</div><div class="rt-x">${UI.esc(l.vi||"")}</div><div class="rt-x">${l.xp} XP</div></div>`).join("")}
    </div>
    <div class="dimbar" style="margin-top:14px">
      <div class="db-h"><span>Tiến độ tới ${nx?UI.esc(nx.n):'cấp tối đa'}</span><span>${pct}%</span></div>
      <div class="db-t"><i style="width:${pct}%"></i></div>
    </div>
  </section>

  <section class="sec">
    <div class="grid g2">
      ${UI.panel("Skill profile · Năng lực theo nhóm",
        Object.keys(DIM_LABEL).filter(k=>dimCnt[k]).length
        ? Object.keys(DIM_LABEL).filter(k=>dimCnt[k]).map(k=>{
            const v = Math.round(dimSum[k]/dimCnt[k]);
            return `<div class="dimbar ${v>=75?'hi':(v<50?'lo':'')}"><div class="db-h"><span>${DIM_LABEL[k]} <span style="color:var(--dim-2)">· ${VI.dim[k]}</span></span><span>${v}</span></div><div class="db-t"><i style="width:${v}%"></i></div></div>`;
          }).join("")
        : '<p class="muted" style="margin:0">Chưa có dữ liệu. Hoàn thành một case để thấy hồ sơ năng lực của bạn.</p>')}
      ${UI.panel("Case streak · 28 ngày gần nhất",
        '<div class="streak-grid">'+State.streakDays().map(d=>'<i class="'+(d.on?'on':'')+(d.today?' today':'')+'" title="'+d.k+'"></i>').join("")+'</div>'+
        '<p class="muted" style="font-size:13px;margin-top:14px;margin-bottom:0">Mỗi ngày giải ít nhất một case để giữ chuỗi. Chuỗi không phải để vui — nó là cách duy nhất biến tư duy cấu trúc thành phản xạ.</p>')}
    </div>
  </section>

  <section class="sec">
    ${UI.secHead("Certificates","Chứng chỉ", Object.values(S.exams||{}).filter(e=>e.passed).length+"/"+window.TRACKS.length)}
    <div class="grid g3">
      ${window.TRACKS.map(t=>{
        const ex = window.EXAM_BY_TRACK[t.id], st = (S.exams||{})[t.id], p = State.trackProgress(t.id);
        const passed = st && st.passed;
        return `<div class="panel" style="${passed?'border-color:var(--brass)':''}">
          <div class="panel-h"><b>${UI.esc(t.name)}</b><div style="flex:1"></div>
            ${passed?'<span class="tag pos">đã đạt</span>':'<span class="tag">chưa đạt</span>'}</div>
          <div class="panel-b">
            <div class="mono" style="font-size:11px;color:var(--dim-2)">${UI.esc(t.vi)}</div>
            <div class="dimbar" style="margin-top:12px">
              <div class="db-h"><span>Bài học</span><span>${p.done}/${p.total}</span></div>
              <div class="db-t"><i style="width:${p.pct}%"></i></div></div>
            ${st&&st.attempts?`<div class="kv"><span class="k">Điểm cao nhất</span><span class="v">${st.best}</span></div>`:''}
            ${passed?`<div class="kv"><span class="k">Ngày cấp</span><span class="v">${UI.esc(st.date||"")}</span></div>`:''}
            <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap">
              ${passed?'<a class="btn btn-sm" href="#/certificate/'+t.id+'">Chứng chỉ</a>':''}
              ${State.examUnlocked(t.id)
                ? '<a class="btn btn-sm '+(passed?'btn-ghost':'btn-primary')+'" href="#/exam/'+t.id+'">'+(passed?'Thi lại':'Vào thi')+'</a>'
                : '<a class="btn btn-sm btn-ghost" href="#/track/'+t.id+'">Học tiếp</a>'}
            </div>
          </div></div>`;
      }).join("")}
    </div>
  </section>

  <section class="sec">
    ${UI.secHead("Weak spots","Điểm yếu theo module","gợi ý học lại")}
    ${(function(){
      const all = State.moduleScores();
      if(!all.length) return '<div class="empty">Chưa đủ dữ liệu. Hoàn thành vài bài học hoặc case để thấy hồ sơ điểm yếu của bạn.</div>';
      const weak = State.weakModules(3);
      const strong = all.slice(-3).reverse().filter(x=>x.score>=80);
      return `<div class="grid g2">
        ${UI.panel("Nên học lại · Cần cải thiện",
          weak.length
          ? weak.map(w=>`<div style="padding:10px 0;border-bottom:1px dashed var(--line)">
              <div style="display:flex;justify-content:space-between;gap:10px;align-items:baseline">
                <span><b style="font-weight:600">${UI.esc(w.module.name)}</b> <span class="gloss">· ${UI.esc(w.module.vi)}</span></span>
                <span class="mono" style="color:${w.score<60?'var(--neg)':'var(--warn)'}">${w.score}</span></div>
              <div class="db-t" style="margin-top:6px"><i style="width:${w.score}%;background:${w.score<60?'var(--neg)':'var(--warn)'}"></i></div>
              <div style="margin-top:8px;display:flex;gap:8px;flex-wrap:wrap">
                <a class="btn btn-sm btn-ghost" href="#/lesson/${w.module.lessons[0]}">Học lại module</a>
                ${w.module.case?'<a class="btn btn-sm btn-ghost" href="#/case/'+w.module.case+'">Giải lại case</a>':''}
              </div></div>`).join("")
          : '<p class="muted" style="margin:0">Không module nào dưới 80 điểm. Hồ sơ của bạn đang rất đều.</p>')}
        ${UI.panel("Đang mạnh · Điểm cao nhất",
          strong.length
          ? strong.map(w=>`<div class="kv"><span class="k">${UI.esc(w.module.name)}</span><span class="v" style="color:var(--pos)">${w.score}</span></div>`).join("")
            + '<p class="muted" style="font-size:13px;margin-bottom:0;margin-top:12px">Điểm module tính theo trọng số: bài kiểm tra cuối lộ trình nặng nhất, rồi tới case, rồi tới bài tập trong lesson.</p>'
          : '<p class="muted" style="margin:0">Chưa module nào đạt 80 điểm.</p>')}
      </div>`;
    })()}
  </section>

  <section class="sec">
    ${UI.secHead("Badges","Huy hiệu", S.badges.length+"/"+State.badges.length)}
    <div class="grid g3">
      ${State.badges.map(b=>{
        const has = S.badges.includes(b.id);
        return `<div class="badge ${has?'':'locked'}"><div class="bg-m">${has?'★':'○'}</div>
          <div><div class="bg-n">${UI.esc(b.n)}</div><div class="bg-d">${UI.esc(b.d)}</div></div></div>`;
      }).join("")}
    </div>
  </section>

  <section class="sec">
    ${UI.secHead("Backup","Sao lưu tiến độ","tiến độ lưu trong trình duyệt này")}
    <div class="panel" style="border-left:2px solid var(--warn)">
      <div class="panel-b">
        <p class="muted" style="margin-top:0;max-width:70ch">
          Toàn bộ tiến độ của bạn nằm trong bộ nhớ của <b>chính trình duyệt này</b> — không có tài khoản, không có máy chủ.
          Xoá dữ liệu duyệt web, đổi máy hoặc dùng chế độ ẩn danh là mất hết. Hãy tải file sao lưu định kỳ.
        </p>
        <div class="grid g4" style="margin:16px 0">
          ${(function(){ const b=BACKUP.summary();
            return UI.statBox("Bài học","" + b.lessons, "đã hoàn thành")
                 + UI.statBox("Case","" + b.cases, "đã giải")
                 + UI.statBox("Chứng chỉ","" + b.exams + "/" + window.TRACKS.length, "lộ trình đã đạt")
                 + UI.statBox("XP","" + b.xp, b.badges + " badge · streak " + b.streak + " ngày") })()}
        </div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center">
          <button class="btn btn-sm btn-primary" onclick="BACKUP.export_()">Tải file sao lưu</button>
          <button class="btn btn-sm" onclick="BACKUP.pickFile()">Khôi phục từ file</button>
          <button class="btn btn-sm btn-ghost" onclick="BACKUP.resetWithGuard()">Xoá toàn bộ tiến độ</button>
        </div>
        <p class="mono" style="font-size:11px;color:var(--dim-2);margin-bottom:0;margin-top:14px">
          Khi khôi phục, hai bên được <b>gộp lại</b> và giữ kết quả tốt hơn ở từng mục — không ghi đè mù quáng lên tiến độ hiện có.
        </p>
      </div>
    </div>
  </section>

  <section class="sec">
    ${UI.secHead("Leaderboard","Bảng xếp hạng","theo XP và độ chính xác")}
    <div class="panel"><div class="panel-b" style="overflow-x:auto">
      <table class="lb">
        <tr><th>#</th><th>Analyst</th><th>Rank</th><th class="r">Accuracy</th><th class="r">XP</th></tr>
        ${board.map((r,i)=>{
          let lvIdx=0; State.levels.forEach((l,k)=>{ if(r.xp>=l.xp) lvIdx=k });
          return `<tr class="${r.me?'me':''}"><td>${i+1}</td><td>${UI.esc(r.n)}</td><td>${UI.esc(State.levels[lvIdx].n)}</td><td class="r">${r.acc}</td><td class="r">${r.xp}</td></tr>`;
        }).join("")}
      </table>
    </div></div>
  </section>

  ${doneCases.length?`<section class="sec" style="padding-bottom:40px">
    ${UI.secHead("Case History","Lịch sử giải case","")}
    <div class="panel"><div class="panel-b" style="overflow-x:auto">
      <table class="lb">
        <tr><th>Mission</th><th>Loại</th><th>Độ khó</th><th class="r">Score</th><th class="r">Hint</th></tr>
        ${doneCases.map(c=>`<tr><td><a href="#/review/${c.id}" style="color:var(--brass-2)">${UI.esc(c.title)}</a></td>
          <td>${UI.esc(c.type)}</td><td>${UI.esc(c.difficulty)}</td>
          <td class="r">${S.cases[c.id].score}</td><td class="r">${S.cases[c.id].usedHint?'có':'không'}</td></tr>`).join("")}
      </table>
    </div></div>
  </section>`:''}
</div>`;
};
