export class ApiError extends Error {
  constructor(public status: number, message: string, public details: unknown) {
    super(message);
  }
}

export async function api<T>(
  path: string,
  options: { method?: string; body?: unknown; raw?: BodyInit; headers?: Record<string, string> } = {},
): Promise<T> {
  const headers: Record<string, string> = { ...options.headers };
  let body: BodyInit | undefined = options.raw;
  if (options.body !== undefined) {
    headers["content-type"] = "application/json";
    body = JSON.stringify(options.body);
  }
  const res = await fetch(path, { method: options.method ?? "GET", headers, body, credentials: "same-origin" });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(res.status, (data as { error?: string }).error ?? res.statusText, (data as { details?: unknown }).details);
  return data as T;
}

export type Role = "learner" | "grader" | "instructor" | "admin";
export type User = { id: string; email: string; display_name: string; role: Role; level: number };
export type LockReason = "level" | "prereq" | "untimed_first" | "remediation" | "mistake_review";
export type LessonStatus = "locked" | "available" | "in_progress" | "passed" | "failed";

export type ProgressRow = {
  lesson_id: string;
  status: LessonStatus;
  lock_reason: LockReason | null;
  best_score: number | null;
  attempts_count: number;
};

export type CatalogLesson = { id: string; module_id: string; title: string; kind: string; level: number; est_minutes: number; gates_module: number };

export type ProgressView = {
  level: number;
  modules: { id: string; title: string; track_id: string; track_name: string }[];
  catalog: Record<string, CatalogLesson>;
  lessons: ProgressRow[];
  pendingReviews: { attempt_id: string; lesson_id: string; final_score: number; passed: number; graded_at: number }[];
  remediation: { code: string; title: string; lesson_id: string; reps_done: number; reps_required: number; blocks_kind: string }[];
};

export type RubricCriterion = { id: string; name: string; weight: number; skill_id: string | null; levels: Record<string, string> };

export type LessonView = {
  lesson: { id: string; title: string; kind: string; level: number; est_minutes: number; output_spec: string; module_id: string; module_title: string; timed_variant_of: string | null; gates_module: number };
  rubric: { id: string; name: string; threshold: number; criteria: RubricCriterion[] } | null;
  progress: ProgressRow | null;
  attempts: { id: string; status: string; final_score: number | null; passed: number | null; started_at: number; submitted_at: number | null; graded_at: number | null; needs_review: number }[];
};

export type AttemptView = {
  viewer: "owner" | "grader" | "staff";
  attempt: { id: string; lesson_id: string; lesson_title: string; lesson_kind: string; status: string; final_score: number | null; passed: number | null; started_at: number; submitted_at: number | null; graded_at: number | null };
  artifacts: { id: string; kind: string; mime: string | null; bytes: number | null; created_at: number }[];
  grade: null | {
    total_score: number;
    grader_type: string;
    created_at: number;
    threshold: number | null;
    criteria: { criterion_id: string; name: string; weight: number | null; level: number; points: number; evidence: string | null }[];
  };
  mistakes: { code: string; title: string; symptom: string | null; location_ref: string | null }[];
  review: { rewrite_note: string; completed_at: number } | null;
  needsReview: boolean;
};

export type Readiness = { skill_id: string; name: string; raw_score: number; score: number; last_evidence_at: number };
export type QueueItem = { attempt_id: string; needs: string; lesson_id: string; lesson_title: string; lesson_kind: string; submitted_at: number; enqueued_at: number; mine: boolean };
export type MistakeCode = { code: string; group_code: string; title: string; symptom: string };
