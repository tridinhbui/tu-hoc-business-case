// End-to-end run against `npm run dev` (default http://127.0.0.1:5173; override with BASE_URL).
// Exercises: magic link login, gates, attempt → queue → grading → queue → readiness,
// mistake-review lock, remediation lock and release, level promotion, Durable Object live room.
const BASE = process.env.BASE_URL ?? "http://127.0.0.1:5173";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let failures = 0;

function check(label, condition, detail) {
  if (condition) console.log(`  ok   ${label}`);
  else { failures++; console.log(`  FAIL ${label}`, detail ?? ""); }
}

class Client {
  constructor(name) { this.name = name; this.cookie = ""; }
  async call(method, path, body, extraHeaders = {}) {
    const headers = { ...extraHeaders };
    if (this.cookie) headers.cookie = this.cookie;
    let payload;
    if (body instanceof Uint8Array) payload = body;
    else if (body !== undefined) { headers["content-type"] = "application/json"; payload = JSON.stringify(body); }
    const res = await fetch(BASE + path, { method, headers, body: payload, redirect: "manual" });
    const setCookie = res.headers.get("set-cookie");
    if (setCookie) this.cookie = setCookie.split(";")[0];
    const text = await res.text();
    let data; try { data = JSON.parse(text); } catch { data = text; }
    return { status: res.status, data };
  }
  async login(email) {
    const r = await this.call("POST", "/api/auth/request", { email, displayName: this.name });
    const link = new URL(r.data.devLink);
    const v = await this.call("GET", link.pathname + link.search);
    return v.status;
  }
}

async function waitFor(label, fn, timeoutMs = 20000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const value = await fn();
    if (value) return value;
    await sleep(400);
  }
  throw new Error(`timed out waiting for: ${label}`);
}

const progressOf = async (client, lessonId) =>
  (await client.call("GET", "/api/progress")).data.lessons.find((l) => l.lesson_id === lessonId);

const allLevels = (criteria, level, evidence = "Trích dòng 3 của bài nộp") =>
  criteria.map((c) => ({ criterionId: c.id, level, evidence: level === 1 || level === 4 ? evidence : undefined }));

async function doAttempt(learner, grader, lessonId, { level, mistakes = [] }) {
  const start = await learner.call("POST", "/api/attempts", { lessonId });
  if (start.status !== 201 && start.status !== 200) return { start };
  const attemptId = start.data.attemptId;
  const file = new TextEncoder().encode(`bài làm ${lessonId}`);
  await learner.call("PUT", `/api/attempts/${attemptId}/artifacts`, file, { "x-artifact-kind": "sheet", "content-type": "text/plain" });
  await learner.call("POST", `/api/attempts/${attemptId}/submit`);
  await waitFor(`attempt ${attemptId} in grader queue`, async () =>
    (await grader.call("GET", "/api/grader/queue")).data.items?.some((i) => i.attempt_id === attemptId));
  await grader.call("POST", `/api/grader/attempts/${attemptId}/claim`);
  const rubric = (await grader.call("GET", `/api/grader/rubric/${lessonId}`)).data.criteria;
  const grade = await grader.call("POST", `/api/grader/attempts/${attemptId}/grade`, { criteria: allLevels(rubric, level), mistakes });
  return { attemptId, grade, rubric };
}

async function main() {
  const health = await fetch(BASE + "/api/health").then((r) => r.json()).catch(() => null);
  if (!health?.ok) { console.error(`Worker not reachable at ${BASE}. Start it with: npm run dev`); process.exit(2); }
  const stamp = Date.now();

  console.log("== auth");
  const learner = new Client("Lan");
  const grader = new Client("Minh");
  const instructor = new Client("Cô Hà");
  check("learner magic link logs in (302)", (await learner.login(`lan+${stamp}@example.com`)) === 302);
  check("grader magic link logs in (302)", (await grader.login(`minh+${stamp}@example.com`)) === 302);
  check("instructor magic link logs in (302)", (await instructor.login(`ha+${stamp}@example.com`)) === 302);
  await grader.call("POST", "/api/dev/role", { role: "grader" });
  await instructor.call("POST", "/api/dev/role", { role: "instructor" });
  const me = await learner.call("GET", "/api/me");
  check("session returns learner at level 1", me.data.user?.role === "learner" && me.data.user?.level === 1, me.data);
  check("invalid email is rejected (400)", (await learner.call("POST", "/api/auth/request", { email: "bad" })).status === 400);
  const probe = new Client("probe");
  const link = new URL((await probe.call("POST", "/api/auth/request", { email: `probe+${stamp}@example.com` })).data.devLink);
  const firstUse = await probe.call("GET", link.pathname + link.search);
  const secondUse = await new Client("replay").call("GET", link.pathname + link.search);
  check("magic link works once, replay rejected (302 then 400)", firstUse.status === 302 && secondUse.status === 400, { firstUse: firstUse.status, secondUse: secondUse.status });

  console.log("== initial gates");
  check("015 drill available", (await progressOf(learner, "015"))?.status === "available");
  check("018 locked: prereq B1 not passed", (await progressOf(learner, "018"))?.lock_reason === "prereq");
  check("019 (L2) locked: prereq first", (await progressOf(learner, "019"))?.lock_reason === "prereq");
  const blocked = await learner.call("POST", "/api/attempts", { lessonId: "018" });
  check("starting a locked lesson returns 423", blocked.status === 423 && blocked.data.details?.lockReason === "prereq", blocked);

  console.log("== checkpoint 017 graded by instructor → B2 unlocks");
  const peerTry = await doAttempt(learner, instructor, "017", { level: 4 });
  check("checkpoint scored 100 and passed", peerTry.grade.data.total === 100 && peerTry.grade.data.passed === true, peerTry.grade);
  await waitFor("018 unlocked", async () => (await progressOf(learner, "018"))?.status === "available");
  check("018 now available", true);
  check("020 timed locked until 019 passed", (await progressOf(learner, "020"))?.lock_reason === "untimed_first");

  console.log("== grading rules");
  const own = await learner.call("POST", "/api/attempts", { lessonId: "015" });
  await learner.call("POST", `/api/attempts/${own.data.attemptId}/submit`);
  await waitFor("015 queued", async () => (await instructor.call("GET", "/api/grader/queue")).data.items?.some((i) => i.attempt_id === own.data.attemptId));
  await instructor.call("POST", `/api/grader/attempts/${own.data.attemptId}/claim`);
  const rubric015 = (await instructor.call("GET", "/api/grader/rubric/015")).data.criteria;
  const noEvidence = await instructor.call("POST", `/api/grader/attempts/${own.data.attemptId}/grade`, {
    criteria: rubric015.map((c) => ({ criterionId: c.id, level: 4 })),
  });
  check("level 4 without evidence is rejected (400)", noEvidence.status === 400, noEvidence.data);
  const partial = await instructor.call("POST", `/api/grader/attempts/${own.data.attemptId}/grade`, {
    criteria: [{ criterionId: rubric015[0].id, level: 3 }],
  });
  check("grading only some criteria is rejected (400)", partial.status === 400 && partial.data.details?.missing?.length > 0, partial.data);
  const ok015 = await instructor.call("POST", `/api/grader/attempts/${own.data.attemptId}/grade`, { criteria: allLevels(rubric015, 3) });
  check("015 at level 3 everywhere = 75 < 85 threshold → failed", ok015.data.total === 75 && ok015.data.passed === false, ok015.data);

  console.log("== mistake review lock (R-10)");
  await waitFor("015 locked pending its own review", async () => (await progressOf(learner, "015"))?.lock_reason === "mistake_review");
  check("failed 015 itself is locked until reviewed", true);
  const pending = (await learner.call("GET", "/api/progress")).data.pendingReviews ?? [];
  check("progress lists 015 under pending reviews", pending.some((p) => p.attempt_id === own.data.attemptId), pending);
  const drill018 = await learner.call("POST", "/api/attempts", { lessonId: "018" });
  check("another drill is locked until 015 is reviewed (423 mistake_review)",
    drill018.status === 423 && drill018.data.details?.lockReason === "mistake_review", drill018.data);
  const emptyReview = await learner.call("POST", `/api/attempts/${own.data.attemptId}/review`, { rewriteNote: "  " });
  check("empty review rejected", emptyReview.status === 400);
  await learner.call("POST", `/api/attempts/${own.data.attemptId}/review`, { rewriteNote: "Làm lại phép 7: đổi đơn vị trước khi nhân" });
  await waitFor("018 unlocked after review", async () => (await progressOf(learner, "018"))?.status === "available");
  check("018 available after review", true);

  console.log("== remediation: SIZ-02 in 2 of last 3 graded attempts");
  const a1 = await doAttempt(learner, grader, "018", { level: 2, mistakes: [{ code: "SIZ-02", location: "dòng 4" }] });
  check("peer grade stored (50, failed)", a1.grade.data.total === 50 && a1.grade.data.passed === false, a1.grade.data);
  await waitFor("018 graded and awaiting review", async () => (await progressOf(learner, "018"))?.lock_reason === "mistake_review");
  await learner.call("POST", `/api/attempts/${a1.attemptId}/review`, { rewriteNote: "Đổi triệu hộ sang hộ" });
  await waitFor("review processed", async () => (await progressOf(learner, "018"))?.lock_reason == null);
  const a2 = await doAttempt(learner, grader, "018", { level: 2, mistakes: [{ code: "SIZ-02", location: "dòng 2" }] });
  check("second SIZ-02 attempt graded", a2.grade.status === 200, a2.grade.data);
  const assignment = await waitFor("remediation created", async () =>
    (await learner.call("GET", "/api/remediation")).data.items?.find((i) => i.code === "SIZ-02" && i.status === "active"));
  check("remediation assigned: drill 015 × 2, blocks drills", assignment.lesson_id === "015" && assignment.reps_required === 2 && assignment.blocks_kind === "drill", assignment);
  await learner.call("POST", `/api/attempts/${a2.attemptId}/review`, { rewriteNote: "Sanity check theo chi tiêu đầu người" });
  await waitFor("remediation lock visible", async () => (await progressOf(learner, "018"))?.lock_reason === "remediation");
  check("018 locked by remediation", true);
  check("015 (the remediation drill itself) stays open", (await progressOf(learner, "015"))?.status !== "locked");

  for (let i = 1; i <= 2; i++) {
    const rep = await doAttempt(learner, instructor, "015", { level: 4 });
    check(`remediation rep ${i}: 015 passed`, rep.grade.data.passed === true, rep.grade.data);
    await waitFor(`rep ${i} processed`, async () => {
      const items = (await learner.call("GET", "/api/remediation")).data.items;
      return items.find((x) => x.code === "SIZ-02")?.reps_done === i;
    });
  }
  const done = (await learner.call("GET", "/api/remediation")).data.items.find((x) => x.code === "SIZ-02");
  check("remediation completed after 2 reps", done.status === "done", done);
  check("SIZ-02 does not re-trigger from old tags", !(await learner.call("GET", "/api/remediation")).data.items.some((x) => x.code === "SIZ-02" && x.status === "active"));
  check("018 unlocked again", (await progressOf(learner, "018"))?.lock_reason !== "remediation");

  console.log("== views and access control");
  const view = await learner.call("GET", `/api/attempts/${a1.attemptId}`);
  check("owner sees 5 graded criteria", view.status === 200 && view.data.viewer === "owner" && view.data.grade?.criteria?.length === 5, view.data);
  check("mistake shown with its title", view.data.mistakes?.[0]?.code === "SIZ-02" && view.data.mistakes[0].title === "Lệch bậc độ lớn", view.data.mistakes);
  check("reviewed attempt no longer needs review", view.data.review !== null && view.data.needsReview === false, view.data);
  const artifactId = view.data.artifacts?.[0]?.id;
  const ownFile = await learner.call("GET", `/api/attempts/${a1.attemptId}/artifacts/${artifactId}`);
  check("owner downloads own file", ownFile.status === 200 && ownFile.data === "bài làm 018", ownFile);
  const graderView = await grader.call("GET", `/api/attempts/${a1.attemptId}`);
  check("grader who graded it can view, anonymously", graderView.status === 200 && graderView.data.viewer === "grader" && graderView.data.attempt.user_id === undefined, graderView.data);
  check("grader who graded it can download", (await grader.call("GET", `/api/attempts/${a1.attemptId}/artifacts/${artifactId}`)).status === 200);
  check("unrelated user cannot view (404)", (await probe.call("GET", `/api/attempts/${a1.attemptId}`)).status === 404);
  check("unrelated user cannot download (404)", (await probe.call("GET", `/api/attempts/${a1.attemptId}/artifacts/${artifactId}`)).status === 404);
  const lessonView = await learner.call("GET", "/api/lessons/018");
  check("lesson view: rubric with 4 level descriptors per criterion",
    lessonView.data.rubric?.criteria?.length === 5 && lessonView.data.rubric.criteria.every((c) => Object.keys(c.levels).length === 4), lessonView.data.rubric);
  check("lesson view lists learner's attempts", lessonView.data.attempts?.length >= 2, lessonView.data.attempts);
  check("mistake code catalogue available", (await grader.call("GET", "/api/mistake-codes")).data.items?.length === 4);
  check("unknown lesson returns 404", (await learner.call("GET", "/api/lessons/999")).status === 404);

  console.log("== readiness");
  const readiness = (await learner.call("GET", "/api/me")).data.readiness;
  const s06 = readiness.find((r) => r.skill_id === "S06");
  check("readiness rows exist for S05, S06, S16", ["S05", "S06", "S16"].every((s) => readiness.some((r) => r.skill_id === s)), readiness);
  check("S06 = last 3 evidence (100, 100, 100) = 100", s06?.score === 100, s06);

  console.log("== level promotion via checkpoint 014");
  const cp = await doAttempt(learner, instructor, "014", { level: 3 });
  check("checkpoint 014 passes at 75", cp.grade.data.total === 75 && cp.grade.data.passed === true, cp.grade.data);
  await waitFor("learner promoted to L2", async () => (await learner.call("GET", "/api/me")).data.user.level === 2);
  check("learner is now level 2", true);

  console.log("== live room (Durable Object)");
  const learnerId = (await learner.call("GET", "/api/me")).data.user.id;
  const created = await instructor.call("POST", "/api/live", {
    kind: "team_sim", lessonId: "019", durationMinutes: 0.08, questionBudget: 2, answerDelayMinutes: 0,
    milestones: [{ atMinutes: 0.02, label: "Ghost deck" }],
    participants: [{ userId: learnerId, role: "team_member" }],
  });
  check("instructor creates a live session (201)", created.status === 201, created.data);
  const sessionId = created.data.sessionId;
  check("outsider cannot read room state (403)", (await grader.call("GET", `/api/live/${sessionId}`)).status === 403);

  const wsUrl = BASE.replace(/^http/, "ws") + `/api/live/${sessionId}/ws`;
  const received = { team: [], staff: [] };
  const open = (client, bucket) => new Promise((resolve, reject) => {
    const ws = new WebSocket(wsUrl, { headers: { cookie: client.cookie } });
    ws.onmessage = (e) => bucket.push(JSON.parse(e.data));
    ws.onopen = () => resolve(ws);
    ws.onerror = (e) => reject(e);
  });
  const teamWs = await open(learner, received.team);
  const staffWs = await open(instructor, received.staff);
  await sleep(300);
  teamWs.send(JSON.stringify({ type: "ask", text: "Có số tiệm giặt hiện tại không?" }));
  teamWs.send(JSON.stringify({ type: "ask", text: "Giá mỗi mẻ bao nhiêu?" }));
  teamWs.send(JSON.stringify({ type: "ask", text: "Câu thứ ba vượt ngân sách" }));
  await sleep(700);
  const firstQ = received.staff.find((m) => m.type === "question");
  staffWs.send(JSON.stringify({ type: "answer", questionId: firstQ?.id, answer: "Không có số liệu, bạn tự ước lượng." }));
  await sleep(700);
  check("staff receives questions", received.staff.filter((m) => m.type === "question").length === 2, received.staff);
  check("question budget enforced (3rd rejected)", received.team.some((m) => m.type === "error" && /hết 2/.test(m.message)), received.team);
  check("answer released to team", received.team.some((m) => m.type === "answer"), received.team);
  await waitFor("milestone broadcast", async () => received.team.some((m) => m.type === "milestone"), 15000);
  check("milestone alarm fired (Ghost deck)", true);
  await waitFor("session ended by alarm", async () => received.team.some((m) => m.type === "ended"), 15000);
  check("deadline alarm ended the room", true);
  const state = await instructor.call("GET", `/api/live/${sessionId}`);
  check("room state persisted: ended, 2 questions", state.data.status === "ended" && state.data.questions.used === 2, state.data);
  try { teamWs.close(); staffWs.close(); } catch {}

  console.log(failures ? `\n${failures} CHECK(S) FAILED` : "\nALL E2E CHECKS PASSED");
  process.exit(failures ? 1 : 0);
}

main().catch((err) => { console.error(err); process.exit(1); });
