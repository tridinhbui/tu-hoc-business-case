import type { User } from "./auth";
import { recomputeProgress } from "./gates";
import { AppEnv, HttpError, json, now, readJson, uuid } from "./util";

const MAX_ARTIFACT_BYTES = 50 * 1024 * 1024;
const ARTIFACT_KINDS = new Set(["deck", "sheet", "doc", "image", "transcript"]);

type AttemptRow = { id: string; user_id: string; lesson_id: string; lesson_kind: string; status: string; started_at: number };

async function ownAttempt(env: AppEnv, user: User, attemptId: string): Promise<AttemptRow> {
  const attempt = await env.DB_LEARNING.prepare(
    "SELECT id, user_id, lesson_id, lesson_kind, status, started_at FROM attempts WHERE id = ?1",
  ).bind(attemptId).first<AttemptRow>();
  if (!attempt || attempt.user_id !== user.id) throw new HttpError(404, "Không tìm thấy bài làm.");
  return attempt;
}

export async function startAttempt(request: Request, env: AppEnv, user: User): Promise<Response> {
  const { lessonId } = await readJson<{ lessonId?: string }>(request);
  if (!lessonId) throw new HttpError(400, "Thiếu lessonId.");

  const lesson = await env.DB_CONTENT.prepare(
    "SELECT id, kind, version FROM lessons WHERE id = ?1 AND status = 'published'",
  ).bind(lessonId).first<{ id: string; kind: string; version: number }>();
  if (!lesson) throw new HttpError(404, "Bài học không tồn tại hoặc chưa xuất bản.");

  const progress = (await recomputeProgress(env, user.id)).find((p) => p.lesson_id === lessonId);
  if (progress?.status === "locked") {
    throw new HttpError(423, "Bài học đang bị khoá.", { lockReason: progress.lock_reason });
  }

  const existing = await env.DB_LEARNING.prepare(
    "SELECT id FROM attempts WHERE user_id = ?1 AND lesson_id = ?2 AND status = 'draft'",
  ).bind(user.id, lessonId).first<{ id: string }>();
  if (existing) return json({ attemptId: existing.id, resumed: true });

  const id = uuid();
  await env.DB_LEARNING.prepare(
    `INSERT INTO attempts (id, user_id, lesson_id, lesson_kind, content_version, status, started_at)
     VALUES (?1, ?2, ?3, ?4, ?5, 'draft', ?6)`,
  ).bind(id, user.id, lesson.id, lesson.kind, lesson.version, now()).run();
  return json({ attemptId: id, resumed: false }, 201);
}

export async function uploadArtifact(request: Request, env: AppEnv, user: User, attemptId: string): Promise<Response> {
  const attempt = await ownAttempt(env, user, attemptId);
  if (attempt.status !== "draft") throw new HttpError(409, "Chỉ tải file lên khi bài còn ở trạng thái nháp.");

  const kind = request.headers.get("x-artifact-kind") ?? "doc";
  if (!ARTIFACT_KINDS.has(kind)) throw new HttpError(400, `Loại file không hợp lệ: ${kind}.`);
  const length = Number(request.headers.get("content-length") ?? "0");
  if (!length) throw new HttpError(411, "Thiếu Content-Length.");
  if (length > MAX_ARTIFACT_BYTES) throw new HttpError(413, "File vượt quá 50 MB.");
  if (!request.body) throw new HttpError(400, "Không có nội dung file.");

  const id = uuid();
  const key = `attempts/${attemptId}/${id}`;
  const mime = request.headers.get("content-type") ?? "application/octet-stream";
  await env.R2_SUBMISSIONS.put(key, request.body, { httpMetadata: { contentType: mime } });
  await env.DB_LEARNING.prepare(
    "INSERT INTO attempt_artifacts (id, attempt_id, kind, r2_key, mime, bytes, created_at) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)",
  ).bind(id, attemptId, kind, key, mime, length, now()).run();
  return json({ artifactId: id }, 201);
}

export async function submitAttempt(env: AppEnv, user: User, attemptId: string): Promise<Response> {
  const attempt = await ownAttempt(env, user, attemptId);
  if (attempt.status !== "draft") throw new HttpError(409, "Bài này đã được nộp.");
  const ts = now();
  await env.DB_LEARNING.prepare(
    "UPDATE attempts SET status = 'submitted', submitted_at = ?1, duration_sec = ?2 WHERE id = ?3 AND status = 'draft'",
  ).bind(ts, Math.round((ts - attempt.started_at) / 1000), attemptId).run();
  await env.Q_GRADING.send({ attemptId });
  return json({ attemptId, status: "submitted" });
}

export async function reviewAttempt(request: Request, env: AppEnv, user: User, attemptId: string): Promise<Response> {
  const attempt = await ownAttempt(env, user, attemptId);
  if (attempt.status !== "graded") throw new HttpError(409, "Chỉ review được bài đã có điểm.");
  const { rewriteNote } = await readJson<{ rewriteNote?: string }>(request);
  if (!rewriteNote?.trim()) throw new HttpError(400, "Viết lại ít nhất một phần đã sai trước khi hoàn tất review.");

  await env.DB_LEARNING.batch([
    env.DB_LEARNING.prepare(
      "INSERT INTO mistake_reviews (attempt_id, user_id, rewrite_note, completed_at) VALUES (?1, ?2, ?3, ?4) ON CONFLICT (attempt_id) DO NOTHING",
    ).bind(attemptId, user.id, rewriteNote.trim(), now()),
    env.DB_LEARNING.prepare("UPDATE mistake_tags SET learner_ack = 1 WHERE attempt_id = ?1").bind(attemptId),
  ]);
  await env.Q_READINESS.send({ userId: user.id });
  return json({ attemptId, reviewed: true });
}
