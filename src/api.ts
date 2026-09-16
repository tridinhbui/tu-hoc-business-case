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

export type CaseBrief = {
  id: string;
  title: string;
  industry: string;
  context: string;
  question: string;
  duration_min: number;
  status: string;
  upfront: { id: string; content: string }[];
  // content is present only once the learner has asked for the item during an attempt
  askable: { id: string; trigger: string; content?: string | null; revealed_at?: number | null }[];
};

export type RubricCriterion = { id: string; name: string; weight: number; skill_id: string | null; levels: Record<string, string> };

export type LessonBlock = { kind: "goal" | "concept" | "worked_example" | "pitfall" | "checklist" | "exercise" | "source"; title: string; body_md: string };

export type LessonView = {
  lesson: { id: string; title: string; kind: string; level: number; est_minutes: number; output_spec: string; module_id: string; module_title: string; timed_variant_of: string | null; gates_module: number };
  blocks: LessonBlock[];
  rubric: { id: string; name: string; threshold: number; criteria: RubricCriterion[] } | null;
  progress: ProgressRow | null;
  attempts: { id: string; status: string; final_score: number | null; passed: number | null; started_at: number; submitted_at: number | null; graded_at: number | null; needs_review: number }[];
  case: CaseBrief | null;
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
  case: CaseBrief | null;
  answerFrame: { structure_md: string; quick_scoring_md: string } | null;
  traps: { description: string; mistake_code: string }[];
};

export type PathSummary = {
  id: string;
  name: string;
  weeks: number;
  hours_per_week: string;
  persona: string;
  capstone_id: string | null;
  lessons: number;
  enrollment: { status: string; started_at: number } | null;
};

export type PlanLesson = {
  week: number;
  id: string;
  title: string;
  kind: string;
  level: number;
  est_minutes: number;
  gates_module: number;
  module_id: string;
  status: LessonStatus;
  lock_reason: LockReason | null;
  best_score: number | null;
};

export type PathPlan = {
  path: Omit<PathSummary, "lessons" | "enrollment">;
  enrollment: { status: string; started_at: number } | null;
  currentWeek: number | null;
  weeks: { week: number; lessons: PlanLesson[]; done: number; minutes: number }[];
  capstone: { id: string; title: string; objective: string; deliverable: string } | null;
};

export type Readiness = { skill_id: string; name: string; raw_score: number; score: number; last_evidence_at: number };
export type QueueItem = { attempt_id: string; needs: string; lesson_id: string; lesson_title: string; lesson_kind: string; submitted_at: number; enqueued_at: number; mine: boolean };
export type MistakeCode = { code: string; group_code: string; title: string; symptom: string };

export type LiveRole = "candidate" | "interviewer" | "panelist" | "team_member" | "observer";

export type LiveSessionSummary = {
  id: string;
  kind: string;
  lesson_id: string;
  lesson_title: string;
  case_id: string | null;
  status: string;
  started_at: number | null;
  deadline_at: number | null;
  ended_at: number | null;
  role: LiveRole;
};

export type LiveState = {
  sessionId: string | null;
  kind: string | null;
  status: string | null;
  startedAt: number;
  deadlineAt: number;
  questions: { budget: number | null; used: number };
  upcoming: { kind: string; label: string | null; due_at: number }[];
  events: number;
  connected: number;
};

export type LiveRoomView = {
  session: LiveSessionSummary & { summary: string | null };
  role: LiveRole;
  state: LiveState;
  participants: { user_id: string; role: LiveRole; display_name: string }[];
};

export type AdminOverview = {
  queue: { total: number; claimed: number | null; oldest: number | null };
  attempts: { graded: number | null; graded_last7: number | null; open: number | null };
  learners: { byLevel: { level: number; n: number }[]; activeLast7: number };
  rubrics: { rubric_id: string; name: string; n: number; avg_score: number; pass_rate: number }[];
  graders: { grader_id: string; display_name: string; grader_type: string; n: number; avg_score: number; delta: number | null }[];
  overallAvg: number | null;
  mistakes: { code: string; title: string; n: number; learners: number }[];
  live: {
    byStatus: { status: string; n: number }[];
    recent: { id: string; kind: string; lesson_id: string; lesson_title: string; status: string; started_at: number | null; deadline_at: number | null; participants: number }[];
  };
  content: {
    lessons_published: number;
    rubrics_missing_levels: number;
    rubrics_total: number;
    codes_without_root_cause: number;
    codes_total: number;
    assumptions_without_source: number;
    assumptions_total: number;
    cases_by_status: { status: string; n: number }[];
  };
};

export type LandingView = {
  tracks: { id: string; name: string; role: string; modules: number }[];
  paths: { id: string; name: string; weeks: number; hours_per_week: string; persona: string; lessons: number }[];
  counts: {
    lessons: number; modules: number; cases: number; capstones: number;
    skills: number; mistake_codes: number; minutes: number;
  };
  kinds: { kind: string; n: number }[];
};

export type KingdomBoss = {
  lesson_id: string; title: string; level: number;
  status: LessonStatus; lock_reason: LockReason | null; best_score: number | null; hp: number;
};

export type KingdomModule = {
  id: string; title: string; outcome: string; lessons: number; cleared: number;
  status: "locked" | "open" | "cleared"; boss: KingdomBoss | null;
};

export type Badge = { id: string; name: string; detail: string; earned: boolean; progress: string };

export type KingdomView = {
  hero: {
    level: number; name: string; xp: number; passed: number; total: number; streak: number;
    readiness: number | null; skills_ready: number; skills_measured: number;
  };
  territories: { id: string; name: string; role: string; status: "locked" | "open" | "cleared"; modules: KingdomModule[] }[];
  quests: { kind: "remediation" | "review" | "next"; lesson_id: string; label: string; detail: string }[];
  badges: Badge[];
  leaderboard: {
    path_id: string; path_name: string;
    rows: { rank: number; xp: number; passed: number; you: boolean }[];
  } | null;
};

export type SupportMessage = {
  id: string; author_side: "learner" | "staff"; body: string; context_path: string | null; created_at: number;
};

export type SupportThreadView = {
  thread: { id: string; status: "open" | "closed" } | null;
  messages: SupportMessage[];
  unread?: number;
};

export type SupportInbox = {
  items: {
    id: string; status: "open" | "closed"; last_message_at: number; display_name: string; email: string;
    level: number; last_body: string | null; last_side: "learner" | "staff" | null; unread: number;
  }[];
  waiting: number;
};

export type SupportStaffThread = {
  thread: { id: string; status: string; display_name: string; email: string; level: number; persona: string | null };
  messages: SupportMessage[];
};
