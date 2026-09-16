import { api, type Readiness, type User } from "./api";
import { LEVEL_NAMES, Link, Loading, navigate, useLoad, usePath } from "./lib";
import { AttemptPage } from "./pages/Attempt";
import { GradePage } from "./pages/Grade";
import { GraderQueuePage } from "./pages/GraderQueue";
import { LessonPage } from "./pages/Lesson";
import { KingdomPage } from "./pages/Kingdom";
import { LandingPage } from "./pages/Landing";
import { LoginPage } from "./pages/Login";
import { PathPage } from "./pages/Path";
import { AdminPage } from "./pages/Admin";
import { LiveListPage, LiveRoomPage } from "./pages/Live";
import { PlanPage } from "./pages/Plan";
import { SkillsPage } from "./pages/Skills";
import { SupportInboxPage } from "./pages/Support";
import { SupportChat } from "./components/SupportChat";

export function App() {
  const path = usePath();
  const me = useLoad(() => api<{ user: User | null; readiness: Readiness[] }>("/api/me"), [path]);

  if (me.loading && !me.data) return <main className="wrap"><Loading /></main>;
  const user = me.data?.user ?? null;
  // Visitors see what the programme is before being asked to sign in; a saved link goes straight to login.
  if (!user) return path === "/" ? <LandingPage /> : <LoginPage />;

  const isGrader = user.role !== "learner";
  const isStaff = user.role === "instructor" || user.role === "admin";
  let page;
  let m: RegExpMatchArray | null;
  // /login has nothing left to offer someone already signed in.
  if (path === "/" || path === "/path" || path === "/login") page = <PathPage />;
  else if ((m = path.match(/^\/lessons\/([^/]+)$/))) page = <LessonPage lessonId={m[1]} />;
  else if ((m = path.match(/^\/attempts\/([^/]+)$/))) page = <AttemptPage attemptId={m[1]} />;
  else if (path === "/plan") page = <PlanPage />;
  else if (path === "/map") page = <KingdomPage />;
  else if (path === "/live") page = <LiveListPage isStaff={isStaff} />;
  else if ((m = path.match(/^\/live\/([^/]+)$/))) page = <LiveRoomPage sessionId={m[1]} />;
  else if (path === "/admin" && isStaff) page = <AdminPage />;
  else if (path === "/support" && isStaff) page = <SupportInboxPage />;
  else if (path === "/skills") page = <SkillsPage readiness={me.data?.readiness ?? []} />;
  else if (path === "/grader" && isGrader) page = <GraderQueuePage />;
  else if ((m = path.match(/^\/grader\/([^/]+)$/)) && isGrader) page = <GradePage attemptId={m[1]} />;
  else page = (
    <section className="wrap">
      <h1>Không có trang này</h1>
      <p><Link to="/">Về lộ trình</Link></p>
    </section>
  );

  const nav = (to: string, label: string, active: boolean) => (
    <Link to={to} className={active ? "nav-link active" : "nav-link"}>{label}</Link>
  );

  return (
    <>
      <header className="topbar">
        <div className="topbar-inner">
          <Link to="/" className="brand">Business Case</Link>
          <nav aria-label="Chính">
            {nav("/", "Lộ trình", path === "/" || path.startsWith("/lessons") || path.startsWith("/attempts"))}
            {nav("/plan", "Kế hoạch", path === "/plan")}
            {nav("/map", "Bản đồ", path === "/map")}
            {nav("/live", "Phòng live", path.startsWith("/live"))}
            {nav("/skills", "Năng lực", path === "/skills")}
            {isGrader && nav("/grader", "Chấm bài", path.startsWith("/grader"))}
            {isStaff && nav("/admin", "Giảng viên", path === "/admin")}
            {isStaff && nav("/support", "Hỗ trợ", path === "/support")}
          </nav>
          <div className="who">
            <span className={`lv lv${user.level}`}>L{user.level}</span>
            <span className="who-name">{user.display_name}<small>{LEVEL_NAMES[user.level]}{isGrader ? ` · ${user.role}` : ""}</small></span>
            <button
              className="btn-quiet"
              onClick={async () => {
                await api("/api/auth/logout", { method: "POST" });
                navigate("/");
                me.reload();
              }}
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </header>
      <main>{page}</main>
      {/* Staff answer from the inbox page; everyone else gets the floating chat. */}
      {!isStaff && <SupportChat />}
    </>
  );
}
