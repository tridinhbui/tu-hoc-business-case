function pctOf(s){ const m=String(s).match(/(\d+(?:[.,]\d+)?)\s*%/); return m? parseFloat(m[1].replace(",",".")) : null }

window.VIEWS.companies = function(q){
  const f = (q&&q.ind)||"all";
  const c2 = (q&&q.country)||"all";
  let list = window.COMPANIES.slice();
  if(f!=="all") list = list.filter(c=>c.industry===f);
  if(c2==="vn") list = list.filter(c=>c.country==="VN");
  if(c2==="intl") list = list.filter(c=>c.country!=="VN");

  const chip=(k,v,label,cur)=>'<a class="chip'+(cur===v?' on':'')+'" href="#/companies?'+k+'='+v+(k==="ind"?('&country='+c2):('&ind='+f))+'">'+UI.esc(label)+'</a>';

  return `<div class="wrap">
  <section class="sec">
    <h1 style="font-size:34px">Company Discovery</h1>
    <p class="muted" style="max-width:64ch;margin-top:10px">Mỗi hồ sơ trả lời một câu hỏi trước tiên: doanh nghiệp này thật sự kiếm tiền bằng cách nào. Rồi mới đi sâu vào cấu trúc chi phí, moat và bài toán họ đang phải giải.</p>
    <div class="filters" style="margin-top:22px">
      <span class="f-l">Ngành</span>${chip("ind","all","Tất cả",f)}${window.INDUSTRIES.map(i=>chip("ind",i.id,i.name,f)).join("")}
    </div>
    <div class="filters">
      <span class="f-l">Thị trường</span>${chip("country","all","Tất cả",c2)}${chip("country","vn","Việt Nam",c2)}${chip("country","intl","Quốc tế",c2)}
    </div>
    <div class="blocks">
      ${list.map(c=>`<a class="block" href="#/company/${c.id}">
        <div class="b-h"><div class="b-logo">${UI.esc(UI.initials(c.name))}</div>
          <div><div class="b-n">${UI.esc(c.name)}</div><div class="b-m">${UI.esc(UI.industryVi(c.industry))} · ${UI.esc(c.country)}</div></div></div>
        <div class="b-b">${UI.esc(c.oneLiner.slice(0,120))}${c.oneLiner.length>120?'…':''}</div>
        <div class="b-f">${(c.models||[]).slice(0,2).map(m=>'<span class="tag brass">'+UI.esc((window.MODEL_BY_ID[m]||{}).name||m)+'</span>').join("")}</div>
      </a>`).join("")}
    </div>
    ${list.length?'':'<div class="empty">Không có doanh nghiệp phù hợp bộ lọc.</div>'}
  </section></div>`;
};

window.VIEWS.company = function(id){
  const c = window.COMPANY_BY_ID[id];
  if(!c) return VIEWS.notfound();
  State.seeCompany(id);
  const ind = window.INDUSTRY_BY_ID[c.industry];
  const cases = (c.cases||[]).map(x=>window.CASE_BY_ID[x]).filter(Boolean);

  const streamRows = c.streams.map(s=>{
    const p = pctOf(s.share);
    return `<div style="margin-bottom:13px">
      <div style="display:flex;justify-content:space-between;gap:12px;align-items:baseline">
        <span style="font-size:14px">${UI.esc(s.n)}</span>
        <span class="mono" style="font-size:12px;color:var(--brass-2)">${UI.esc(s.share)}</span>
      </div>
      ${p!==null?`<div style="height:5px;background:var(--panel-3);border:1px solid var(--line);margin-top:6px"><i style="display:block;height:100%;width:${Math.min(100,p)}%;background:var(--brass)"></i></div>`:''}
      ${s.note?`<div class="mono" style="font-size:11px;color:var(--dim);margin-top:5px">${UI.esc(s.note)}</div>`:''}
    </div>`;
  }).join("");

  return UI.crumb([{t:"World Map",href:"#/map"},{t:ind.name,href:"#/district/"+ind.id},{t:c.name}])+`
<div class="wrap">
  <section class="sec" style="padding-top:14px">
    <div style="display:flex;gap:18px;align-items:flex-start;flex-wrap:wrap">
      <div class="b-logo" style="width:56px;height:56px;font-size:20px">${UI.esc(UI.initials(c.name))}</div>
      <div style="flex:1;min-width:260px">
        <h1 style="font-size:42px">${UI.esc(c.name)}</h1>
        <div style="display:flex;gap:7px;flex-wrap:wrap;margin-top:10px">
          ${UI.industryTag(ind.id)}${UI.flagOf(c)}
          ${c.ticker?'<span class="tag">'+UI.esc(c.ticker)+'</span>':''}
          ${(c.models||[]).map(m=>{const M=window.MODEL_BY_ID[m]||{};return '<a class="tag brass" href="#/model/'+m+'">'+UI.gloss(M.name||m, M.vi||"")+'</a>'}).join("")}
        </div>
      </div>
    </div>

    <div class="panel" style="margin-top:24px;border-left:2px solid var(--brass)">
      <div class="panel-h"><b>How does this company actually make money?</b><span class="gloss" style="text-transform:none;letter-spacing:0">· Doanh nghiệp này thật sự kiếm tiền bằng cách nào?</span></div>
      <div class="panel-b"><div style="font-size:17px;line-height:1.6">${UI.esc(c.oneLiner)}</div></div>
    </div>

    <div class="grid g4" style="margin-top:16px">
      ${c.metrics.map(m=>UI.statBox(m.k,m.v,m.n||"")).join("")}
    </div>
  </section>

  <section class="sec">
    <div class="grid g2">
      ${UI.panel("Revenue model · Dòng tiền vào", streamRows)}
      ${UI.panel("Cost structure · Tiền đi đâu",
        c.costs.map(x=>UI.kv(x.n,x.share)+(x.note?'<div class="mono" style="font-size:11px;color:var(--dim);margin:-4px 0 8px">'+UI.esc(x.note)+'</div>':'')).join(""))}
    </div>
  </section>

  <section class="sec">
    <div class="grid g2">
      ${UI.panel("Customers · Ai trả tiền", '<ul class="bullets">'+c.customers.map(x=>'<li>'+UI.esc(x)+'</li>').join("")+'</ul>')}
      ${UI.panel("Competitive advantage · Lợi thế phòng thủ",
        c.moat.map(m=>`<div style="margin-bottom:14px"><div class="mono" style="font-size:11px;letter-spacing:.1em;color:var(--brass-2);text-transform:uppercase">${UI.esc(m.t)}</div><div class="muted" style="font-size:13.6px;margin-top:4px">${UI.esc(m.d)}</div></div>`).join(""))}
    </div>
  </section>

  <section class="sec">
    <div class="grid g2">
      ${UI.panel("Competitors · Đối thủ", '<div style="display:flex;gap:8px;flex-wrap:wrap">'+c.competitors.map(x=>'<span class="tag">'+UI.esc(x)+'</span>').join("")+'</div>')}
      ${UI.panel("Strategic challenges · Bài toán đang phải giải",
        c.challenges.map(m=>`<div style="margin-bottom:14px"><div class="mono" style="font-size:11px;letter-spacing:.1em;color:#C97B4E;text-transform:uppercase">${UI.esc(m.t)}</div><div class="muted" style="font-size:13.6px;margin-top:4px">${UI.esc(m.d)}</div></div>`).join(""))}
    </div>
  </section>

  ${cases.length?`<section class="sec">
    ${UI.secHead("Related Missions","Case liên quan","áp dụng vào tình huống thật")}
    <div class="missions">${cases.map(UI.missionCard).join("")}</div>
  </section>`:`<section class="sec"><div class="empty">Chưa có mission riêng cho doanh nghiệp này. Xem <a href="#/district/${ind.id}" style="color:var(--brass-2)">mission của ngành ${UI.esc(ind.name)}</a>.</div></section>`}

  <div class="sec"><div class="mono" style="font-size:11px;color:var(--dim-2);border-top:1px solid var(--line);padding-top:14px">
    Số liệu trong hồ sơ là ước lượng theo bậc độ lớn dùng cho mục đích luyện tập tư duy, không phải số liệu kiểm toán.
  </div></div>
</div>`;
};
