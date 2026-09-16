import type { User } from "./auth";
import { LOCK_HELP, recomputeProgress } from "./gates";
import { AppEnv } from "./util";

/**
 * An assistant that only ever says things it can read off the learner's own record: why a lesson is
 * locked, where a submitted attempt is, what the active remediation needs, which week of the path
 * they are in. It never guesses and never explains the subject matter — those questions go to a
 * person, because a wrong answer about market sizing costs more than a slow one.
 *
 * Returns null when nothing matches, and the thread then waits for staff exactly as before.
 */

type Intent = { id: string; test: RegExp; answer: (ctx: Ctx) => Promise<string | null> };
type Ctx = { env: AppEnv; user: User; text: string; lessonId: string | null; contextPath: string | null };

const LESSON_IN_TEXT = /\b(\d{3})\b/;
const CLOSING = "\n\nNếu chưa đúng ý bạn, bấm “Vẫn cần người thật” và ban quản trị sẽ trả lời.";

const norm = (s: string) =>
  s.toLowerCase().normalize("NFC").replace(/\s+/g, " ").trim();

async function lessonTitle(env: AppEnv, lessonId: string) {
  const row = await env.DB_CONTENT.prepare("SELECT title FROM lessons WHERE id = ?1").bind(lessonId).first<{ title: string }>();
  return row?.title ?? lessonId;
}

const INTENTS: Intent[] = [
  {
    id: "why-locked",
    test: /kho[áa]|kh[oô]ng v[àa]o [đd][ưu][ơo]c|kh[oô]ng m[ơở]/,
    async answer({ env, user, lessonId }) {
      const progress = await recomputeProgress(env, user.id);
      const row = lessonId
        ? progress.find((p) => p.lesson_id === lessonId)
        : progress.find((p) => p.status === "locked");
      if (!row) return null;
      const title = await lessonTitle(env, row.lesson_id);
      if (row.status !== "locked" || !row.lock_reason) {
        return `Bài ${row.lesson_id} — ${title} đang **${row.status === "passed" ? "đã đạt" : "mở"}**, bạn vào làm được ngay. Nếu nút không bấm được thì tải lại trang giúp mình.`;
      }
      return `Bài ${row.lesson_id} — ${title} đang khoá vì: **${LOCK_HELP[row.lock_reason].short}**.\n\n${LOCK_HELP[row.lock_reason].help}`;
    },
  },
  {
    id: "remediation",
    test: /drill|s[ửu]a l[ỗo]i|m[ãa] l[ỗo]i|remediation/,
    async answer({ env, user }) {
      const { results } = await env.DB_LEARNING.prepare(
        `SELECT code, lesson_id, reps_done, reps_required FROM remediation_assignments
         WHERE user_id = ?1 AND status = 'active' ORDER BY triggered_at`,
      ).bind(user.id).all<{ code: string; lesson_id: string; reps_done: number; reps_required: number }>();
      if (results.length === 0) {
        return "Hiện bạn không có drill sửa lỗi nào đang được giao. Drill chỉ xuất hiện khi một mã lỗi lặp lại ở 2 trong 3 bài chấm gần nhất.";
      }
      const lines = results.map((r) => `- **${r.code}**: bài ${r.lesson_id}, đã đạt ${r.reps_done}/${r.reps_required} lượt`);
      return `Bạn đang có ${results.length} drill sửa lỗi:\n${lines.join("\n")}\n\nLàm đủ số lượt là loại bài đang bị chặn mở lại ngay.`;
    },
  },
  {
    id: "grading-status",
    test: /ch[ưu]a ch[ấa]m|bao gi[ờo] c[óo] [đd]i[ểe]m|[đd]ang ch[ờo] ch[ấa]m|ch[ấa]m b[àa]i|[đd]i[ểe]m c[ủu]a (em|t[ôo]i|m[ìi]nh)/,
    async answer({ env, user }) {
      const { results } = await env.DB_LEARNING.prepare(
        `SELECT lesson_id, status, final_score, passed, submitted_at, graded_at FROM attempts
         WHERE user_id = ?1 AND status IN ('submitted', 'grading', 'graded') ORDER BY started_at DESC LIMIT 3`,
      ).bind(user.id).all<{ lesson_id: string; status: string; final_score: number | null; passed: number | null }>();
      if (results.length === 0) return "Bạn chưa nộp bài nào nên chưa có gì để chấm.";
      const lines = results.map((a) =>
        a.status === "graded"
          ? `- Bài ${a.lesson_id}: **${a.final_score} điểm**, ${a.passed === 1 ? "đạt" : "chưa đạt"}`
          : `- Bài ${a.lesson_id}: đã nộp, **đang chờ chấm**`,
      );
      return `Ba bài gần nhất của bạn:\n${lines.join("\n")}`;
    },
  },
  {
    id: "readiness",
    test: /n[ăa]ng l[ựu]c|readiness|s[ẵa]n s[àa]ng|[đd][ủu] tr[ìi]nh/,
    async answer({ env, user }) {
      const { results } = await env.DB_LEARNING.prepare(
        `SELECT skill_id, score FROM readiness WHERE user_id = ?1 ORDER BY score DESC`,
      ).bind(user.id).all<{ skill_id: string; score: number }>();
      if (results.length === 0) return "Bạn chưa có điểm năng lực nào — điểm chỉ xuất hiện sau khi có bài được chấm.";
      const ready = results.filter((r) => r.score >= 70);
      const weakest = results[results.length - 1];
      return `Bạn đã đo được ${results.length} năng lực, trong đó **${ready.length}** đạt ngưỡng 70. Yếu nhất hiện tại là **${weakest.skill_id}** với ${weakest.score} điểm. Trang Năng lực có đủ danh sách.`;
    },
  },
  {
    id: "plan",
    test: /l[ộo] tr[ìi]nh|k[ếe] ho[ạa]ch|tu[ầa]n n[àa]y|h[ọo]c g[ìi] ti[ếe]p/,
    async answer({ env, user }) {
      const enrollment = await env.DB_LEARNING.prepare(
        "SELECT path_id, started_at FROM enrollments WHERE user_id = ?1 AND status = 'active'",
      ).bind(user.id).first<{ path_id: string; started_at: number }>();
      if (!enrollment) return "Bạn chưa chọn lộ trình nào. Vào trang **Kế hoạch** chọn một lộ trình, hệ thống sẽ xếp bài theo từng tuần.";
      const path = await env.DB_CONTENT.prepare("SELECT name, weeks FROM learning_paths WHERE id = ?1")
        .bind(enrollment.path_id).first<{ name: string; weeks: number }>();
      const week = Math.min(
        (path?.weeks ?? 1),
        Math.floor((Date.now() - enrollment.started_at) / (7 * 86_400_000)) + 1,
      );
      return `Bạn đang học **${path?.name ?? enrollment.path_id}**, hiện ở **tuần ${week}/${path?.weeks ?? "?"}**. Trang **Kế hoạch** liệt kê bài của tuần này. Muốn đổi lộ trình thì bấm “Đổi lộ trình” ở đó — tiến độ cũ được giữ nguyên.`;
    },
  },
];

export async function autoAnswer(env: AppEnv, user: User, text: string, contextPath: string | null): Promise<{ intent: string; body: string } | null> {
  const normalised = norm(text);
  const fromPath = contextPath?.match(/\/lessons\/(\d{3})/)?.[1] ?? null;
  const lessonId = normalised.match(LESSON_IN_TEXT)?.[1] ?? fromPath;

  for (const intent of INTENTS) {
    if (!intent.test.test(normalised)) continue;
    try {
      const body = await intent.answer({ env, user, text: normalised, lessonId, contextPath });
      if (body) return { intent: intent.id, body: body + CLOSING };
    } catch (err) {
      // An assistant that breaks must fall back to a person, not to an error message.
      console.error("assistant intent failed", intent.id, err);
      return null;
    }
  }
  return null;
}
