window.VIEWS.cases = function(q){
  q = q||{};
  const d = q.d||"all", t = q.t||"all", i = q.i||"all", s = q.s||"all";
  let list = window.CASES.slice();
  if(d!=="all") list = list.filter(c=>c.difficulty===d);
  if(t!=="all") list = list.filter(c=>c.type===t);
  if(i!=="all") list = list.filter(c=>c.industry===i);
  const St = State.get();
  if(s==="todo") list = list.filter(c=>!(St.cases[c.id]&&St.cases[c.id].done));
  if(s==="done") list = list.filter(c=>St.cases[c.id]&&St.cases[c.id].done);

  const url = o => { const n=Object.assign({d,t,i,s},o); return "#/cases?d="+n.d+"&t="+n.t+"&i="+n.i+"&s="+n.s };
  const seg = (key,cur,opts) => '<div class="seg">'+opts.map(([v,label])=>
    '<button class="'+(cur===v?'on':'')+'" onclick="location.hash=\''+url({[key]:v})+'\'">'+label+'</button>').join("")+'</div>';
  const sel = (key,cur,opts) => '<select onchange="location.hash=this.value">'+opts.map(([v,label])=>
    '<option value="'+url({[key]:v})+'"'+(cur===v?' selected':'')+'>'+UI.esc(label)+'</option>').join("")+'</select>';

  const doneCount = window.CASES.filter(c=>St.cases[c.id]&&St.cases[c.id].done).length;

  return `<div class="wrap">
  <section class="sec">
    <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:20px;flex-wrap:wrap">
      <div>
        <h1 style="font-size:34px">Mission Board</h1>
        <div class="mono" style="font-size:12px;color:var(--brass-2);letter-spacing:.08em;margin-top:6px">Bảng nhiệm vụ · ${window.CASES.length} case</div>
        <p class="muted" style="max-width:60ch;margin-top:12px">Mỗi case có dữ liệu phải mở khoá, phép tính phải làm và một quyết định phải chịu trách nhiệm. Không case nào cho bạn xem hết dữ liệu ngay từ đầu.</p>
      </div>
      <div style="text-align:right">
        <div class="mono" style="font-size:10px;letter-spacing:.14em;color:var(--dim-2);text-transform:uppercase">Đã hoàn thành</div>
        <div style="font-family:var(--head);font-size:30px;color:var(--brass-2)">${doneCount}<span style="color:var(--dim);font-size:18px">/${window.CASES.length}</span></div>
      </div>
    </div>

    <div class="toolbar" style="margin-top:26px">
      <div class="field"><label>Difficulty · Độ khó</label>
        ${seg("d",d,[["all","Tất cả"],["easy","Dễ"],["medium","Vừa"],["hard","Khó"],["expert","Chuyên gia"]])}</div>
      <div class="field"><label>Status · Trạng thái</label>
        ${seg("s",s,[["all","Tất cả"],["todo","Chưa giải"],["done","Đã giải"]])}</div>
      <div class="field"><label>Case type · Loại case</label>
        ${sel("t",t,[["all","Tất cả loại case"]].concat(window.CASE_TYPES.map(x=>[x,x+" · "+(VI.type[x]||x)])))}</div>
      <div class="field"><label>Industry · Ngành</label>
        ${sel("i",i,[["all","Tất cả ngành"]].concat(window.INDUSTRIES.filter(ind=>window.CASES.some(c=>c.industry===ind.id)).map(ind=>[ind.id,ind.name+" · "+ind.vi])))}</div>
      <span class="count">${list.length} case khớp bộ lọc</span>
    </div>

    <div class="missions">${list.map(UI.missionCard).join("")}</div>
    ${list.length?'':'<div class="empty">Không có case nào khớp bộ lọc. <a href="#/cases" style="color:var(--brass-2)">Xoá bộ lọc</a></div>'}
  </section></div>`;
};
