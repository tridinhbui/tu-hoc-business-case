import { currentUser, logout, requestMagicLink, requireUser, verifyMagicLink } from "./auth";
import { reviewAttempt, startAttempt, submitAttempt, uploadArtifact } from "./attempts";
import { claimAttempt, consumeGrading, gradeAttempt, graderQueue } from "./grading";
import { createLiveSession, listLiveSessions, liveSocket, liveState } from "./live";
import { enrollInPath, listPaths, pathPlan } from "./paths";
import { consumeReadiness, decayAll, releaseStaleClaims } from "./readiness";
import { AppEnv, HttpError, isDev, json, readJson } from "./util";
import { attemptView, downloadArtifact, lessonView, meView, mistakeCodesView, progressView, revealCaseItem } from "./views";

export { LiveRoom } from "./liveroom";

type Handler = (request: Request, env: AppEnv, params: string[]) => Promise<Response>;
const routes: [string, RegExp, Handler][] = [];
const route = (method: string, pattern: string, handler: Handler) =>
  routes.push([method, new RegExp(`^${pattern.replace(/:[a-zA-Z]+/g, "([^/]+)")}$`), handler]);

route("GET", "/api/health", async () => json({ ok: true, service: "bc-platform" }));
// Public client configuration. The Turnstile sitekey is public by design; the secret never leaves the Worker.
route("GET", "/api/config", async (_req, env) => json({ turnstileSiteKey: env.TURNSTILE_SITEKEY || null, devMode: isDev(env) }));

// auth
route("POST", "/api/auth/request", (req, env) => requestMagicLink(req, env));
route("GET", "/api/auth/verify", (req, env) => verifyMagicLink(req, env));
route("POST", "/api/auth/logout", (req, env) => logout(req, env));
route("GET", "/api/me", async (req, env) => meView(env, await currentUser(req, env)));

// catalog (published content, cached for 60 s)
route("GET", "/api/catalog", async (_req, env) => {
  const cached = await env.CONTENT_CACHE.get("catalog", "json");
  if (cached) return json(cached);
  const [modules, lessons] = await env.DB_CONTENT.batch([
    env.DB_CONTENT.prepare("SELECT id, track_id, title, level_min, level_max, outcome FROM modules WHERE status = 'published' ORDER BY track_id, id"),
    env.DB_CONTENT.prepare("SELECT id, module_id, title, kind, level, est_minutes, output_spec, timed_variant_of FROM lessons WHERE status = 'published' ORDER BY id"),
  ]);
  const catalog = { modules: modules.results, lessons: lessons.results };
  await env.CONTENT_CACHE.put("catalog", JSON.stringify(catalog), { expirationTtl: 60 });
  return json(catalog);
});
route("GET", "/api/mistake-codes", async (req, env) => {
  await requireUser(req, env);
  return mistakeCodesView(env);
});

// learner
route("GET", "/api/progress", async (req, env) => progressView(env, await requireUser(req, env)));
route("GET", "/api/lessons/:id", async (req, env, [id]) => lessonView(env, await requireUser(req, env), id));
route("POST", "/api/attempts", async (req, env) => startAttempt(req, env, await requireUser(req, env)));
route("GET", "/api/attempts/:id", async (req, env, [id]) => attemptView(env, await requireUser(req, env), id));
route("PUT", "/api/attempts/:id/artifacts", async (req, env, [id]) => uploadArtifact(req, env, await requireUser(req, env), id));
route("GET", "/api/attempts/:id/artifacts/:artifactId", async (req, env, [id, artifactId]) =>
  downloadArtifact(env, await requireUser(req, env), id, artifactId));
route("POST", "/api/attempts/:id/submit", async (req, env, [id]) => submitAttempt(env, await requireUser(req, env), id));
route("POST", "/api/attempts/:id/review", async (req, env, [id]) => reviewAttempt(req, env, await requireUser(req, env), id));
route("POST", "/api/attempts/:id/reveal", async (req, env, [id]) => revealCaseItem(req, env, await requireUser(req, env), id));
route("GET", "/api/paths", async (req, env) => listPaths(env, await requireUser(req, env)));
route("GET", "/api/paths/:id", async (req, env, [id]) => pathPlan(env, await requireUser(req, env), id));
route("POST", "/api/paths/:id/enroll", async (req, env, [id]) => enrollInPath(env, await requireUser(req, env), id));
route("GET", "/api/remediation", async (req, env) => {
  const user = await requireUser(req, env);
  const { results } = await env.DB_LEARNING.prepare(
    "SELECT code, lesson_id, blocks_kind, reps_done, reps_required, status, triggered_at FROM remediation_assignments WHERE user_id = ?1 ORDER BY triggered_at DESC",
  ).bind(user.id).all();
  return json({ items: results });
});

// grader
route("GET", "/api/grader/queue", async (req, env) => graderQueue(env, await requireUser(req, env)));
route("POST", "/api/grader/attempts/:id/claim", async (req, env, [id]) => claimAttempt(env, await requireUser(req, env), id));
route("POST", "/api/grader/attempts/:id/grade", async (req, env, [id]) => gradeAttempt(req, env, await requireUser(req, env), id));
route("GET", "/api/grader/rubric/:lessonId", async (req, env, [lessonId]) => {
  await requireUser(req, env);
  const { results } = await env.DB_CONTENT.prepare(
    `SELECT c.id, c.name, c.weight, c.skill_id FROM lesson_rubrics lr
     JOIN rubric_criteria c ON c.rubric_id = lr.rubric_id WHERE lr.lesson_id = ?1 ORDER BY c.sort`,
  ).bind(lessonId).all();
  return json({ lessonId, criteria: results });
});

// live rooms
route("POST", "/api/live", async (req, env) => createLiveSession(req, env, await requireUser(req, env)));
route("GET", "/api/live", async (req, env) => listLiveSessions(env, await requireUser(req, env)));
route("GET", "/api/live/:id", async (req, env, [id]) => liveState(env, await requireUser(req, env), id));
route("GET", "/api/live/:id/ws", async (req, env, [id]) => liveSocket(req, env, await requireUser(req, env), id));

// local development only
route("POST", "/api/dev/role", async (req, env) => {
  if (!isDev(env)) throw new HttpError(404, "Không có API này.");
  const user = await requireUser(req, env);
  const { role } = await readJson<{ role?: string }>(req);
  if (!role || !["learner", "grader", "instructor", "admin"].includes(role)) throw new HttpError(400, "Vai trò không hợp lệ.");
  await env.DB_LEARNING.prepare("UPDATE users SET role = ?1 WHERE id = ?2").bind(role, user.id).run();
  return json({ userId: user.id, role });
});

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);
    try {
      for (const [method, pattern, handler] of routes) {
        if (method !== request.method) continue;
        const match = url.pathname.match(pattern);
        if (match) return await handler(request, env as AppEnv, match.slice(1));
      }
      throw new HttpError(404, "Không có API này.");
    } catch (err) {
      if (err instanceof HttpError) return json({ error: err.message, details: err.details ?? null }, err.status);
      console.error("unhandled", url.pathname, err);
      return json({ error: "Lỗi hệ thống. Thử lại sau." }, 500);
    }
  },

  async queue(batch, env): Promise<void> {
    if (batch.queue.startsWith("bc-grading")) return consumeGrading(batch as MessageBatch<{ attemptId: string }>, env as AppEnv);
    if (batch.queue.startsWith("bc-readiness")) return consumeReadiness(batch as MessageBatch<{ userId: string }>, env as AppEnv);
    console.error("unknown queue", batch.queue);
  },

  async scheduled(controller, env): Promise<void> {
    if (controller.cron === "0 19 * * *") await decayAll(env as AppEnv);
    if (controller.cron === "*/15 * * * *") await releaseStaleClaims(env as AppEnv);
  },
} satisfies ExportedHandler<Env>;
