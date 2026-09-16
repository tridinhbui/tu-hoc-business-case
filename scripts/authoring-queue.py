#!/usr/bin/env python3
"""What to write next, in the order that opens a real class soonest.

Writing 122 lesson bodies in lesson-id order opens nothing for a long time. Writing them in path
order means that the moment a path's list is clear, that path can be taught. This prints the queue
for one path at a time, marking what is already written.

    python3 scripts/authoring-queue.py             # PATH-6 then PATH-1 (the wave-1 order)
    python3 scripts/authoring-queue.py PATH-2      # one path
    python3 scripts/authoring-queue.py --all       # every path, summary only
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CURRICULUM = ROOT / "seed" / "curriculum.sql"
AUTHORING = ROOT / "authoring"
DEFAULT_PATHS = ["PATH-6", "PATH-1"]
# Kinds a learner cannot attempt without a case brief in front of them.
NEEDS_CASE = {"mini_case", "full_case", "timed_case", "live_case", "team_sim", "qa_sim"}


def load():
    sql = CURRICULUM.read_text(encoding="utf-8")
    lessons = {
        m[0]: {"module": m[1], "title": m[2], "kind": m[3], "minutes": int(m[4])}
        for m in re.findall(
            r"INSERT INTO lessons \([^)]*\) VALUES \('(\d{3})', '([^']+)', '((?:[^']|'')+)', '(\w+)', \d+, (\d+),",
            sql,
        )
    }
    items = [
        (m[0], int(m[1]), m[2], int(m[3]))
        for m in re.findall(r"INSERT INTO path_items \([^)]*\) VALUES \('([^']+)', (\d+), '(\d{3})', (\d+)\)", sql)
    ]
    paths = {
        m[0]: {"name": m[1], "weeks": int(m[2])}
        for m in re.findall(r"INSERT INTO learning_paths \([^)]*\) VALUES \('([^']+)', '((?:[^']|'')+)', (\d+),", sql)
    }
    cases_by_lesson: dict[str, list[str]] = {}
    for case_id, lesson_id in re.findall(r"INSERT INTO cases \([^)]*\) VALUES \('(C-[\w-]+)', '(\d{3})'", sql):
        cases_by_lesson.setdefault(lesson_id, []).append(case_id)
    for path in sorted(AUTHORING.glob("cases/*.md")):
        text = path.read_text(encoding="utf-8")
        case_id = re.search(r"^case:\s*(\S+)", text, re.M)
        lesson_id = re.search(r"^lesson:\s*(\S+)", text, re.M)
        if case_id and lesson_id:
            cases_by_lesson.setdefault(lesson_id.group(1), []).append(case_id.group(1))
    bodies = {p.stem for p in AUTHORING.glob("lessons/*.md")}
    return lessons, items, paths, cases_by_lesson, bodies


def report(path_id: str, lessons, items, paths, cases, bodies, verbose=True) -> tuple[int, int]:
    rows = sorted((w, s, l) for p, w, l, s in items if p == path_id)
    meta = paths.get(path_id, {"name": path_id, "weeks": 0})
    todo_bodies = todo_cases = 0
    if verbose:
        print(f"\n{path_id} · {meta['name']} · {meta['weeks']} tuần · {len(rows)} bài")
    week = None
    for w, _sort, lesson_id in rows:
        lesson = lessons.get(lesson_id)
        if not lesson:
            continue
        has_body = lesson_id in bodies
        wants_case = lesson["kind"] in NEEDS_CASE
        has_case = bool(cases.get(lesson_id))
        todo_bodies += 0 if has_body else 1
        todo_cases += 1 if wants_case and not has_case else 0
        if not verbose:
            continue
        if w != week:
            week = w
            print(f"  ── tuần {w}")
        marks = "thân bài ✓" if has_body else "thân bài ✗"
        if wants_case:
            marks += " · case ✓" if has_case else " · case ✗"
        print(f"    {lesson_id}  {lesson['title'][:54]:<54} {lesson['kind']:<11} {marks}")
    print(f"  còn thiếu: {todo_bodies} thân bài" + (f", {todo_cases} đề case" if todo_cases else ""))
    return todo_bodies, todo_cases


def main() -> int:
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    lessons, items, paths, cases, bodies = load()
    print(f"đã viết: {len(bodies)}/{len(lessons)} thân bài · {sum(len(v) for v in cases.values())} đề case")

    if "--all" in sys.argv:
        for path_id in sorted(paths):
            print(f"\n{path_id} · {paths[path_id]['name']}")
            report(path_id, lessons, items, paths, cases, bodies, verbose=False)
        return 0
    for path_id in args or DEFAULT_PATHS:
        if path_id not in paths:
            print(f"  không có lộ trình {path_id}")
            return 1
        report(path_id, lessons, items, paths, cases, bodies)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
