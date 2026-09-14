import { useCallback, useEffect, useState, type MouseEvent, type ReactNode } from "react";
import type { LessonStatus, LockReason } from "./api";

// ---------- routing ----------
export function navigate(to: string) {
  window.history.pushState(null, "", to);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo(0, 0);
}

export function usePath() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  return path;
}

export function Link({ to, className, children }: { to: string; className?: string; children: ReactNode }) {
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    navigate(to);
  };
  return (
    <a href={to} className={className} onClick={onClick}>
      {children}
    </a>
  );
}

// ---------- data loading ----------
export function useLoad<T>(load: () => Promise<T>, deps: unknown[]) {
  const [state, setState] = useState<{ data?: T; error?: Error; loading: boolean }>({ loading: true });
  const [tick, setTick] = useState(0);
  useEffect(() => {
    let alive = true;
    setState((s) => ({ ...s, loading: true }));
    load()
      .then((data) => alive && setState({ data, loading: false }))
      .catch((error: Error) => alive && setState((s) => ({ ...s, error, loading: false })));
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, tick]);
  const reload = useCallback(() => setTick((t) => t + 1), []);
  return { ...state, reload };
}

export function usePoll(active: boolean, reload: () => void, everyMs = 2500) {
  useEffect(() => {
    if (!active) return;
    const id = window.setInterval(reload, everyMs);
    return () => window.clearInterval(id);
  }, [active, reload, everyMs]);
}

// ---------- vocabulary ----------
export const LEVEL_NAMES: Record<number, string> = {
  1: "Case Beginner",
  2: "Structured Thinker",
  3: "Insight Builder",
  4: "Competition Ready",
};

export const KIND_LABELS: Record<string, string> = {
  lesson: "Bài giảng",
  drill: "Drill",
  mini_case: "Mini case",
  full_case: "Full case",
  timed_case: "Timed case",
  team_sim: "Team simulation",
  qa_sim: "Q&A simulation",
  live_case: "Live case",
  checkpoint: "Checkpoint",
};

export const LOCK_TEXT: Record<LockReason, { short: string; help: string }> = {
  level: { short: "Chưa đủ cấp", help: "Bài này dành cho cấp cao hơn. Qua checkpoint của cấp hiện tại để mở." },
  prereq: { short: "Cần module trước", help: "Qua checkpoint của module tiên quyết để mở bài này." },
  untimed_first: { short: "Làm bản thường trước", help: "Đạt bản không bấm giờ của bài này trước khi luyện tốc độ." },
  remediation: { short: "Đang có drill sửa lỗi", help: "Hoàn thành drill sửa lỗi đang được giao để mở lại loại bài này." },
  mistake_review: { short: "Cần review bài trước", help: "Xem lại bài đã chấm và viết lại phần sai trước khi làm bài cùng loại." },
};

const STATUS_TEXT: Record<LessonStatus, string> = {
  locked: "Khoá",
  available: "Mở",
  in_progress: "Đang làm",
  passed: "Đã đạt",
  failed: "Chưa đạt",
};

export function StatusPill({ status, reason }: { status: LessonStatus; reason?: LockReason | null }) {
  const text = status === "locked" && reason ? LOCK_TEXT[reason].short : STATUS_TEXT[status];
  return <span className={`pill pill-${status}`}>{text}</span>;
}

export function LevelChip({ level }: { level: number }) {
  return <span className={`lv lv${level}`}>L{level}</span>;
}

export function KindTag({ kind }: { kind: string }) {
  return <span className="tag">{KIND_LABELS[kind] ?? kind}</span>;
}

export function ErrorNote({ error }: { error?: Error | null }) {
  if (!error) return null;
  return <p className="error" role="alert">{error.message}</p>;
}

export function Loading() {
  return <p className="muted">Đang tải…</p>;
}

export const formatDate = (ms: number | null | undefined) =>
  ms ? new Date(ms).toLocaleString("vi-VN", { dateStyle: "short", timeStyle: "short" }) : "—";

export function since(ms: number) {
  const minutes = Math.round((Date.now() - ms) / 60000);
  if (minutes < 1) return "vừa xong";
  if (minutes < 60) return `${minutes} phút`;
  const hours = Math.round(minutes / 60);
  return hours < 48 ? `${hours} giờ` : `${Math.round(hours / 24)} ngày`;
}
