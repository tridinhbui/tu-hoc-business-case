window.VIEWS.battles = function(){
  return `<div class="wrap"><section class="sec">
    <h1 style="font-size:34px">Company Battles</h1>
    <p class="muted" style="max-width:66ch;margin-top:10px">Hai doanh nghiệp, bốn câu hỏi: ai có mô hình tốt hơn, ai có moat mạnh hơn, ai có unit economics tốt hơn, ai tăng trưởng tốt hơn. Chọn trước, đọc phân tích sau.</p>
    <div class="grid g2" style="margin-top:26px">
      ${window.BATTLES.map(b=>VIEWS._battleCard(b)).join("")}
    </div>
  </section></div>`;
};

(function(){
const B = { b:null, picks:[], revealed:false };
B.pick = function(r, side){ if(B.revealed) return; B.picks[r] = side; B.rerender() };
B.check = function(){
  const b = B.b;
  if(B.picks.filter(Boolean).length < b.rounds.length){ UI.toast("CHƯA ĐỦ","Trả lời cả "+b.rounds.length+" câu trước khi xem phân tích"); return }
  B.revealed = true;
  const correct = b.rounds.filter((r,i)=>B.picks[i]===r.win).length;
  State.battleDone(b.id, correct, b.rounds.length);
  State.addXp(Math.round(b.xp*(correct/b.rounds.length)), "Company battle");
  B.rerender();
};
B.rerender = function(){ document.getElementById("app").innerHTML = VIEWS.battle(B.b.id, true); window.scrollTo(0,0) };
window.BATTLE = B;

window.VIEWS.battle = function(id, keep){
  const b = window.BATTLE_BY_ID[id];
  if(!b) return VIEWS.notfound();
  if(!keep || !B.b || B.b.id!==id){ B.b=b; B.picks=[]; B.revealed=false }
  const A = window.COMPANY_BY_ID[b.a], C = window.COMPANY_BY_ID[b.b];
  const correct = b.rounds.filter((r,i)=>B.picks[i]===r.win).length;

  return UI.crumb([{t:"Battles",href:"#/battles"},{t:A.name+" vs "+C.name}])+`
<div class="wrap">
  <section class="sec" style="padding-top:14px">
    <h1 style="font-size:40px">${UI.esc(A.name)} <span style="color:var(--brass)">vs</span> ${UI.esc(C.name)}</h1>
    <div class="mono" style="font-size:12px;color:var(--brass-2);letter-spacing:.08em;margin-top:8px">${UI.esc(b.headline)}</div>
    <p class="muted" style="max-width:70ch;margin-top:14px">${UI.esc(b.context)}</p>
  </section>

  <section class="sec">
    <div class="grid g2">
      ${[A,C].map(c=>`<div class="panel"><div class="panel-h"><b>${UI.esc(c.name)}</b><div style="flex:1"></div><span class="tag">${UI.esc(c.country)}</span></div>
        <div class="panel-b">
          <div class="muted" style="font-size:13.6px">${UI.esc(c.oneLiner)}</div>
          <div class="hr"></div>
          ${c.metrics.slice(0,3).map(m=>UI.kv(m.k,m.v)).join("")}
          <div style="margin-top:12px"><a class="btn btn-sm btn-ghost" href="#/company/${c.id}">Hồ sơ đầy đủ</a></div>
        </div></div>`).join("")}
    </div>
  </section>

  <section class="sec">
    ${UI.secHead("Four Rounds","Bốn mặt trận","chọn bên bạn cho là mạnh hơn")}
    <div class="panel">
      ${b.rounds.map((r,i)=>{
        const sel = B.picks[i];
        function cls(side){
          let c="vo";
          if(!B.revealed && sel===side) c+=" sel";
          if(B.revealed){ if(r.win===side) c+=" right"; else if(sel===side) c+=" wrong" }
          return c;
        }
        return `<div class="vote-row">
          <div class="vote-q">${i+1}. ${UI.esc(r.q)}</div>
          <div class="vote-opts">
            <div class="${cls('a')}" onclick="${B.revealed?'':"BATTLE.pick("+i+",'a')"}">${UI.esc(A.name)}</div>
            <div class="${cls('b')}" onclick="${B.revealed?'':"BATTLE.pick("+i+",'b')"}">${UI.esc(C.name)}</div>
          </div>
          ${B.revealed?`<div class="fb ${sel===r.win?'good':'bad'}" style="margin-top:12px">
            <div class="fb-h">${sel===r.win?'Đúng':'Chưa chính xác'} — phân tích</div>
            <p><b>${UI.esc(A.name)}:</b> ${UI.esc(r.ea)}</p>
            <p><b>${UI.esc(C.name)}:</b> ${UI.esc(r.eb)}</p>
            <p style="color:var(--brass-2)">Kết luận: ${UI.esc(r.win==='a'?A.name:C.name)} mạnh hơn ở tiêu chí này.</p>
          </div>`:''}
        </div>`;
      }).join("")}
    </div>
    <div class="pl-actions">
      ${B.revealed
        ? `<span class="mono" style="font-size:13px;color:var(--brass-2)">Kết quả: ${correct}/${b.rounds.length} · +${Math.round(b.xp*(correct/b.rounds.length))} XP</span>
           <a class="btn btn-sm" href="#/battles">Battle khác</a>`
        : '<button class="btn btn-primary" onclick="BATTLE.check()">Xem comparative analysis</button>'}
    </div>
  </section>

  ${B.revealed?`
  <section class="sec">
    ${UI.secHead("Comparative Analysis","Phân tích so sánh","")}
    <div class="panel"><div class="panel-b" style="overflow-x:auto">
      <table class="cmp-table">
        <tr><th></th><th>${UI.esc(A.name)}</th><th>${UI.esc(C.name)}</th></tr>
        ${b.table.map(r=>`<tr><td class="dim">${UI.esc(r.k)}</td><td>${UI.esc(r.a)}</td><td>${UI.esc(r.b)}</td></tr>`).join("")}
      </table>
    </div></div>
  </section>
  <section class="sec" style="padding-bottom:40px">
    ${UI.panel("Verdict",'<p style="font-size:15px;margin:0">'+UI.esc(b.verdict)+'</p>')}
  </section>`:''}
</div>`;
};
})();
