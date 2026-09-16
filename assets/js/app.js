/* ===== router ===== */
(function(){
function parse(){
  const h = location.hash.replace(/^#\/?/,"");
  const [pathPart, queryPart] = h.split("?");
  const parts = pathPart.split("/").filter(Boolean);
  const q = {};
  (queryPart||"").split("&").filter(Boolean).forEach(kv=>{ const [k,v]=kv.split("="); q[decodeURIComponent(k)]=decodeURIComponent(v||"") });
  return {parts, q};
}

function render(){
  const {parts, q} = parse();
  const r = parts[0] || "home";
  let html = "";
  try{
    switch(r){
      case "home":      html = VIEWS.home(); break;
      case "learn":     html = VIEWS.learn(); break;
      case "track":     html = VIEWS.track(parts[1]); break;
      case "lesson":    html = VIEWS.lesson(parts[1]); break;
      case "exam":      html = VIEWS.exam(parts[1]); break;
      case "certificate": html = VIEWS.certificate(parts[1]); break;
      case "map":       html = VIEWS.map(); break;
      case "district":  html = VIEWS.district(parts[1]); break;
      case "company":   html = VIEWS.company(parts[1]); break;
      case "companies": html = VIEWS.companies(q); break;
      case "cases":     html = VIEWS.cases(q); break;
      case "case":      html = VIEWS.case(parts[1]); break;
      case "daily":     html = parts[1] ? VIEWS.dailyRun(parts[1]) : VIEWS.daily(); break;
      case "review":    html = VIEWS.review(parts[1]); break;
      case "models":    html = VIEWS.models(); break;
      case "model":     html = VIEWS.model(parts[1]); break;
      case "battles":   html = VIEWS.battles(); break;
      case "battle":    html = VIEWS.battle(parts[1]); break;
      case "profile":   html = VIEWS.profile(); break;
      case "pricing":   html = VIEWS.pricing(); break;
      case "terms":     html = VIEWS.terms(); break;
      case "design-system": html = VIEWS.designSystem(); break;
      default:          html = VIEWS.notfound();
    }
  }catch(e){
    console.error(e);
    html = '<div class="wrap"><div class="sec"><div class="empty">Có lỗi khi dựng màn hình này.<br>'+UI.esc(e.message)+'</div></div></div>';
  }
  document.getElementById("app").innerHTML = html;
  UI.hud();
  if(r === "home" && window.LANDING && LANDING.initTilt) LANDING.initTilt();
  // nav highlight
  const map = {learn:"#/learn",track:"#/learn",lesson:"#/learn",exam:"#/learn",certificate:"#/profile",daily:"#/daily",map:"#/map",district:"#/map",company:"#/companies",companies:"#/companies",
    cases:"#/cases",case:"#/cases",review:"#/cases",models:"#/models",model:"#/models",
    battles:"#/battles",battle:"#/battles",profile:"#/profile"};
  document.querySelectorAll("#nav a").forEach(a=>a.classList.toggle("on", a.getAttribute("href")===map[r]));
  window.scrollTo(0,0);
}

window.addEventListener("hashchange", render);
window.addEventListener("DOMContentLoaded", function(){
  document.getElementById("resetBtn").addEventListener("click", function(e){
    e.preventDefault();
    BACKUP.resetWithGuard();
  });
  if(!location.hash) location.hash = "#/";
  render();
});
})();
