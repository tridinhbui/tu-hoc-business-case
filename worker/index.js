/* ═══ Tự học Business Case · máy chủ thu số liệu học tập ═══
   Worker phục vụ site tĩnh như trước (ASSETS); chỉ /api/* chạy qua code này.

   POST /api/metrics/ingest   app học viên gửi ảnh chụp số liệu ẩn danh (mã thiết bị ngẫu nhiên,
                              không tên, không email). Giá trị là LUỸ KẾ theo ngày và theo bài, nên
                              máy chủ ghi đè (INSERT OR REPLACE) — gửi lại nhiều lần không đếm trùng.
   GET  /api/metrics/summary  số tổng hợp cho trang admin; cần header Authorization: Bearer <ADMIN_TOKEN>.
                              ADMIN_TOKEN là Worker secret: npx wrangler secret put ADMIN_TOKEN

   Lưu trữ: một Durable Object dùng SQLite ("global"). Đủ cho vài nghìn người học hoạt động;
   khi lớn hơn nên chuyển sang D1 hoặc chia theo tháng. */
import { DurableObject } from "cloudflare:workers";

const MAX_BODY = 96 * 1024;
const MAX_DAYS = 60, MAX_LESSONS = 500;
const RE_DEVICE = /^[a-z0-9-]{8,48}$/;
const RE_DAY = /^\d{4}-\d{2}-\d{2}$/;
const RE_LESSON = /^[a-z0-9-]{2,48}$/;

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });

const num = (v, max) => {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? Math.min(n, max) : 0;
};

/* so sánh token không lộ thời gian theo vị trí ký tự sai */
function sameToken(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || !a || !b) return false;
  const ea = new TextEncoder().encode(a), eb = new TextEncoder().encode(b);
  let diff = ea.length ^ eb.length;
  for (let i = 0; i < Math.max(ea.length, eb.length); i++) diff |= (ea[i] || 0) ^ (eb[i] || 0);
  return diff === 0;
}

export class MetricsStore extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    this.sql = ctx.storage.sql;
    ctx.blockConcurrencyWhile(async () => {
      this.sql.exec(`
        CREATE TABLE IF NOT EXISTS devices (
          id TEXT PRIMARY KEY, first_seen INTEGER NOT NULL, last_seen INTEGER NOT NULL
        );
        CREATE TABLE IF NOT EXISTS days (
          device TEXT NOT NULL, day TEXT NOT NULL,
          sec REAL NOT NULL DEFAULT 0, sessions INTEGER NOT NULL DEFAULT 0, views INTEGER NOT NULL DEFAULT 0,
          lessons_done INTEGER NOT NULL DEFAULT 0, quiz INTEGER NOT NULL DEFAULT 0,
          quiz_right INTEGER NOT NULL DEFAULT 0, cases INTEGER NOT NULL DEFAULT 0,
          PRIMARY KEY (device, day)
        );
        CREATE INDEX IF NOT EXISTS days_by_day ON days (day);
        CREATE TABLE IF NOT EXISTS lessons (
          device TEXT NOT NULL, lesson TEXT NOT NULL,
          sec REAL NOT NULL DEFAULT 0, views INTEGER NOT NULL DEFAULT 0,
          done_day TEXT, sec_to_done INTEGER, read_pct INTEGER NOT NULL DEFAULT 0,
          PRIMARY KEY (device, lesson)
        );
        CREATE INDEX IF NOT EXISTS lessons_by_lesson ON lessons (lesson);
      `);
    });
  }

  /* p đã được Worker kiểm tra hình dạng; ở đây chỉ ghi */
  ingest(p) {
    const now = Date.now();
    this.ctx.storage.transactionSync(() => {
      this.sql.exec(
        `INSERT INTO devices (id, first_seen, last_seen) VALUES (?, ?, ?)
         ON CONFLICT(id) DO UPDATE SET last_seen = excluded.last_seen`,
        p.device, now, now,
      );
      for (const d of p.days) {
        this.sql.exec(
          `INSERT OR REPLACE INTO days (device, day, sec, sessions, views, lessons_done, quiz, quiz_right, cases)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          p.device, d.day, d.sec, d.sessions, d.views, d.lessonsDone, d.quiz, d.quizRight, d.cases,
        );
      }
      for (const l of p.lessons) {
        this.sql.exec(
          `INSERT OR REPLACE INTO lessons (device, lesson, sec, views, done_day, sec_to_done, read_pct)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          p.device, l.id, l.sec, l.views, l.doneDay, l.secToDone, l.readPct,
        );
      }
    });
    return { ok: true };
  }

  summary(today, span) {
    const q = (s, ...b) => this.sql.exec(s, ...b).toArray();
    const since = shiftDay(today, -(span - 1));
    const ACTIVE = "(sec >= 30 OR lessons_done > 0 OR quiz > 0)";

    const devicesTotal = q("SELECT COUNT(*) AS n FROM devices")[0].n;
    const activeIn = (from) =>
      q(`SELECT COUNT(DISTINCT device) AS n FROM days WHERE day >= ? AND day <= ? AND ${ACTIVE}`, from, today)[0].n;

    const perDay = q(
      `SELECT day,
              COUNT(DISTINCT CASE WHEN ${ACTIVE} THEN device END) AS active,
              SUM(sec) AS sec, SUM(lessons_done) AS done, SUM(quiz) AS quiz, SUM(quiz_right) AS right
       FROM days WHERE day >= ? AND day <= ? GROUP BY day ORDER BY day`,
      since, today,
    );
    const tot = perDay.reduce((a, d) => ({ sec: a.sec + (d.sec || 0), done: a.done + (d.done || 0), quiz: a.quiz + (d.quiz || 0), right: a.right + (d.right || 0), activeDays: a.activeDays + d.active }),
      { sec: 0, done: 0, quiz: 0, right: 0, activeDays: 0 });

    /* quay lại: trong số thiết bị có ngày hoạt động đầu tiên đủ cũ, bao nhiêu hoạt động lại */
    const firsts = q(`SELECT device, MIN(day) AS first FROM days WHERE ${ACTIVE} GROUP BY device`);
    const activeSet = new Set(q(`SELECT device || '|' || day AS k FROM days WHERE ${ACTIVE}`).map((r) => r.k));
    let d1Base = 0, d1Back = 0, w1Base = 0, w1Back = 0;
    for (const f of firsts) {
      if (f.first <= shiftDay(today, -1)) {
        d1Base++;
        if (activeSet.has(f.device + "|" + shiftDay(f.first, 1))) d1Back++;
      }
      if (f.first <= shiftDay(today, -7)) {
        w1Base++;
        for (let i = 1; i <= 7; i++) if (activeSet.has(f.device + "|" + shiftDay(f.first, i))) { w1Back++; break; }
      }
    }

    const funnel = {
      devices: devicesTotal,
      opened: q("SELECT COUNT(DISTINCT device) AS n FROM lessons WHERE views > 0 OR sec > 0 OR read_pct > 0 OR done_day IS NOT NULL")[0].n,
      quizzed: q("SELECT COUNT(DISTINCT device) AS n FROM days WHERE quiz > 0")[0].n,
      done1: q("SELECT COUNT(*) AS n FROM (SELECT device FROM lessons WHERE done_day IS NOT NULL GROUP BY device)")[0].n,
      done5: q("SELECT COUNT(*) AS n FROM (SELECT device FROM lessons WHERE done_day IS NOT NULL GROUP BY device HAVING COUNT(*) >= 5)")[0].n,
    };

    const lessons = q(
      `SELECT lesson,
              COUNT(*) AS started,
              SUM(CASE WHEN done_day IS NOT NULL THEN 1 ELSE 0 END) AS done,
              AVG(CASE WHEN sec_to_done IS NOT NULL THEN sec_to_done END) AS avg_sec_to_done,
              AVG(read_pct) AS avg_read, SUM(sec) AS sec
       FROM lessons GROUP BY lesson ORDER BY done DESC, started DESC LIMIT 25`,
    );
    const doneAll = q("SELECT COUNT(*) AS n FROM lessons WHERE done_day IS NOT NULL")[0].n;
    const timedDone = q("SELECT AVG(sec_to_done) AS a, COUNT(*) AS n FROM lessons WHERE sec_to_done IS NOT NULL")[0];

    return {
      today, span, generatedAt: new Date().toISOString(),
      devicesTotal,
      active: { today: activeIn(today), d7: activeIn(shiftDay(today, -6)), d30: activeIn(shiftDay(today, -29)) },
      totals: { sec: tot.sec, lessonsDone: tot.done, quiz: tot.quiz, quizRight: tot.right, activeDeviceDays: tot.activeDays },
      lessonsDoneAllTime: doneAll,
      avgSecToDone: timedDone.n ? timedDone.a : null, timedLessons: timedDone.n,
      retention: { d1Base, d1Back, w1Base, w1Back },
      funnel, perDay, lessons,
    };
  }
}

function shiftDay(iso, n) {
  const [y, m, d] = iso.split("-").map(Number);
  const t = new Date(Date.UTC(y, m - 1, d + n));
  return t.toISOString().slice(0, 10);
}

/* chỉ nhận đúng hình dạng mong đợi, cắt mọi con số về khoảng hợp lý */
function clean(body) {
  if (!body || typeof body !== "object" || !RE_DEVICE.test(body.device || "")) return null;
  const days = (Array.isArray(body.days) ? body.days : []).slice(-MAX_DAYS)
    .filter((d) => d && RE_DAY.test(d.day || ""))
    .map((d) => ({
      day: d.day, sec: num(d.sec, 86400), sessions: Math.round(num(d.sessions, 500)), views: Math.round(num(d.views, 20000)),
      lessonsDone: Math.round(num(d.lessonsDone, 500)), quiz: Math.round(num(d.quiz, 5000)),
      quizRight: Math.round(num(d.quizRight, 5000)), cases: Math.round(num(d.cases, 500)),
    }));
  const lessons = (Array.isArray(body.lessons) ? body.lessons : []).slice(0, MAX_LESSONS)
    .filter((l) => l && RE_LESSON.test(l.id || ""))
    .map((l) => ({
      id: l.id, sec: num(l.sec, 864000), views: Math.round(num(l.views, 10000)),
      doneDay: RE_DAY.test(l.doneDay || "") ? l.doneDay : null,
      secToDone: l.secToDone == null ? null : Math.round(num(l.secToDone, 864000)),
      readPct: Math.round(num(l.readPct, 100)),
    }));
  return { device: body.device, days, lessons };
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const store = () => env.METRICS.get(env.METRICS.idFromName("global"));

    if (url.pathname === "/api/metrics/ingest") {
      if (request.method !== "POST") return json({ error: "method" }, 405);
      const len = Number(request.headers.get("content-length") || 0);
      if (len > MAX_BODY) return json({ error: "quá lớn" }, 413);
      const text = await request.text();
      if (text.length > MAX_BODY) return json({ error: "quá lớn" }, 413);
      let body;
      try { body = JSON.parse(text); } catch { return json({ error: "JSON không hợp lệ" }, 400); }
      const p = clean(body);
      if (!p) return json({ error: "thiếu hoặc sai mã thiết bị" }, 400);
      await store().ingest(p);
      return new Response(null, { status: 204 });
    }

    if (url.pathname === "/api/metrics/summary") {
      if (request.method !== "GET") return json({ error: "method" }, 405);
      if (!env.ADMIN_TOKEN) return json({ error: "ADMIN_TOKEN chưa được đặt trên máy chủ" }, 503);
      const auth = request.headers.get("authorization") || "";
      const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
      if (!sameToken(token, env.ADMIN_TOKEN)) return json({ error: "sai token" }, 401);
      const span = Math.min(90, Math.max(7, Number(url.searchParams.get("days")) || 30));
      const todayParam = url.searchParams.get("today");
      const today = RE_DAY.test(todayParam || "") ? todayParam : new Date().toISOString().slice(0, 10);
      return json(await store().summary(today, span));
    }

    if (url.pathname.startsWith("/api/")) return json({ error: "không có" }, 404);
    return env.ASSETS.fetch(request);
  },
};
