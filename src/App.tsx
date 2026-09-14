import { api, type Readiness, type User } from "./api";
import { LEVEL_NAMES, Link, Loading, navigate, useLoad, usePath } from "./lib";
import { AttemptPage } from "./pages/Attempt";
import { GradePage } from "./pages/Grade";
import { GraderQueuePage } from "./pages/GraderQueue";
import { LessonPage } from "./pages/Lesson";
import { LoginPage } from "./pages/Login";
import { PathPage } from "./pages/Path";
import { SkillsPage } from "./pages/Skills";

export function App() {
  const path = usePath();
  const me = useLoad(() => api<{ user: User | null; readiness: Readiness[] }>("/api/me"), [path]);

  if (me.loading && !me.data) return <main className="wrap"><Loading /></main>;
  const user = me.data?.user ?? null;
  if (!user) return <LoginPage />;

  const isGrader = user.role !== "learner";
  let page;
  let m: RegExpMatchArray | null;
  if (path === "/" || path === "/path") page = <PathPage />;
  else if ((m = path.match(/^\/lessons\/([^/]+)$/))) page = <LessonPage lessonId={m[1]} />;
  else if ((m = path.match(/^\/attempts\/([^/]+)$/))) page = <AttemptPage attemptId={m[1]} />;
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
            {nav("/skills", "Năng lực", path === "/skills")}
            {isGrader && nav("/grader", "Chấm bài", path.startsWith("/grader"))}
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
    </>
  );
}
