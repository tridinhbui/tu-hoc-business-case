#!/usr/bin/env python3
"""Turn hand-written lessons and cases in authoring/ into seed/authored.sql.

The blueprint pipeline (build-seed.py) generates the skeleton of the programme from
content-source/. This script carries the material a human actually has to write: the body of a
lesson, and a case with its hidden data, traps and answer frame.

    python3 scripts/build-authored.py            # validate, then write seed/authored.sql
    python3 scripts/build-authored.py --check    # validate only, write nothing

Validation is the point. Nothing reaches a learner that fails the rules in QUALITY below, so a
draft that is still missing its worked example or its trap fails here instead of failing in front
of a class.
"""
import ast
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
AUTHORING = ROOT / "authoring"
CURRICULUM = ROOT / "seed" / "curriculum.sql"
OUT = ROOT / "seed" / "authored.sql"

BLOCK_KINDS = ["goal", "concept", "worked_example", "pitfall", "checklist", "exercise", "source"]
CASE_SECTIONS = ["context", "question", "frame.structure", "frame.numbers", "frame.scoring"]
PANEL_CATEGORIES = ["numbers", "feasibility", "challenge"]
MISTAKE_RE = re.compile(r"\b[A-Z]{3}-\d{2}\b")
TODO_RE = re.compile(r"\b(TODO|TBD|XXX|\.\.\.\?)\b")

# Tolerance band for the arithmetic self-check, following the STRATLAB authoring guide:
# wide enough for honest rounding, narrow enough that a wrong answer still fails.
CHECK_TOLERANCE = 0.08

QUALITY = """every lesson: a goal, at least one worked example, at least one pitfall naming a real
mistake code, and an exercise whose output line says exactly what the learner hands in;
every case: one counter-intuitive insight, at least three reveal items, at least one trap naming a
real mistake code, a complete answer frame, and numbers that agree with their own arithmetic;
every rubric: all four level descriptors for every one of its criteria."""


def evaluate(expression: str, numbers: dict) -> float:
    """Arithmetic only, over literals and [key] references into frame.numbers."""

    def substitute(match: re.Match) -> str:
        key = match.group(1)
        if key not in numbers:
            raise Problem(f"`frame.check` refers to [{key}], which is not in frame.numbers")
        value = numbers[key]
        if not isinstance(value, (int, float)) or isinstance(value, bool):
            raise Problem(f"`frame.check` refers to [{key}], which is not a number")
        return repr(value)

    filled = re.sub(r"\[([^\]]+)\]", substitute, expression)
    try:
        tree = ast.parse(filled, mode="eval")
    except SyntaxError as err:
        raise Problem(f"`frame.check` expression {expression!r} does not parse ({err.msg})") from err
    for node in ast.walk(tree):
        if not isinstance(node, (ast.Expression, ast.BinOp, ast.UnaryOp, ast.Constant,
                                 ast.Add, ast.Sub, ast.Mult, ast.Div, ast.Pow, ast.USub)):
            raise Problem(f"`frame.check` allows arithmetic only, not {type(node).__name__} in {expression!r}")
        if isinstance(node, ast.Constant) and not isinstance(node.value, (int, float)):
            raise Problem(f"`frame.check` allows numbers only, not {node.value!r}")
    return float(eval(compile(tree, "<check>", "eval")))  # noqa: S307 - the tree above is arithmetic only


class Problem(Exception):
    pass


def sql_str(value) -> str:
    if value is None:
        return "NULL"
    if isinstance(value, bool):
        return "1" if value else "0"
    if isinstance(value, (int, float)):
        return str(value)
    return "'" + str(value).replace("'", "''") + "'"


def blueprint_rubrics(sql: str) -> set[str]:
    """Rubrics the generated curriculum already ships descriptors for — authoring overrides these."""
    return {
        criterion.rsplit(".", 1)[0]
        for criterion in re.findall(r"INSERT INTO rubric_criterion_levels \([^)]*\) VALUES \('([^']+)'", sql)
    }


def known_ids() -> tuple[set[str], set[str], dict[str, set[str]]]:
    """Lesson ids, mistake codes and rubric criteria the generated curriculum already defines."""
    if not CURRICULUM.exists():
        raise Problem("seed/curriculum.sql is missing — run `npm run content:build` first.")
    sql = CURRICULUM.read_text(encoding="utf-8")
    lessons = set(re.findall(r"INSERT INTO lessons \([^)]*\) VALUES \('(\d{3})'", sql))
    codes = set(re.findall(r"INSERT INTO mistake_codes \([^)]*\) VALUES \('([A-Z]{3}-\d{2})'", sql))
    globals()["_BLUEPRINT_RUBRICS"] = blueprint_rubrics(sql)
    criteria: dict[str, set[str]] = {}
    for criterion_id, rubric_id in re.findall(
        r"INSERT INTO rubric_criteria \([^)]*\) VALUES \('([^']+)', '([^']+)'", sql
    ):
        criteria.setdefault(rubric_id, set()).add(criterion_id)
    return lessons, codes, criteria


def parse_document(path: Path) -> tuple[dict, list[tuple[str, str, str]]]:
    """Frontmatter plus `## kind · title` sections, in file order."""
    text = path.read_text(encoding="utf-8")
    if not text.startswith("---\n"):
        raise Problem(f"{path.name}: must start with a --- frontmatter block")
    _, front, body = text.split("---\n", 2)

    meta: dict[str, str] = {}
    for line in front.strip().splitlines():
        if not line.strip() or line.lstrip().startswith("#"):
            continue
        if ":" not in line:
            raise Problem(f"{path.name}: frontmatter line is not `key: value`: {line!r}")
        key, value = line.split(":", 1)
        meta[key.strip()] = value.strip()

    sections: list[tuple[str, str, str]] = []
    current: tuple[str, str] | None = None
    buffer: list[str] = []
    for line in body.splitlines():
        heading = re.match(r"^##\s+([A-Za-z0-9_.\-]+)\s*(?:·\s*(.*))?$", line)
        if heading:
            if current:
                sections.append((current[0], current[1], "\n".join(buffer).strip()))
            current = (heading.group(1), (heading.group(2) or "").strip())
            buffer = []
        elif current:
            buffer.append(line)
        elif line.strip():
            raise Problem(f"{path.name}: text before the first `## ` section: {line.strip()[:60]!r}")
    if current:
        sections.append((current[0], current[1], "\n".join(buffer).strip()))
    if not sections:
        raise Problem(f"{path.name}: no `## ` sections")
    return meta, sections


def check_prose(path: Path, label: str, body: str) -> None:
    if not body.strip():
        raise Problem(f"{path.name}: section `{label}` is empty")
    if TODO_RE.search(body):
        raise Problem(f"{path.name}: section `{label}` still has a TODO marker")


def build_lesson(path: Path, lessons: set[str], codes: set[str]) -> list[str]:
    meta, sections = parse_document(path)
    lesson_id = meta.get("lesson", "")
    if lesson_id not in lessons:
        raise Problem(f"{path.name}: lesson {lesson_id!r} is not in the generated curriculum")

    seen_kinds: list[str] = []
    statements = [f"DELETE FROM lesson_blocks WHERE lesson_id = {sql_str(lesson_id)};"]
    for index, (kind, title, body) in enumerate(sections, start=1):
        if kind not in BLOCK_KINDS:
            raise Problem(f"{path.name}: unknown block kind `{kind}` (allowed: {', '.join(BLOCK_KINDS)})")
        if not title:
            raise Problem(f"{path.name}: block `{kind}` has no title after `·`")
        check_prose(path, kind, body)
        seen_kinds.append(kind)

        if kind == "pitfall":
            named = {c for c in MISTAKE_RE.findall(body) if c in codes}
            if not named:
                raise Problem(f"{path.name}: pitfall `{title}` names no known mistake code")
        if kind == "exercise" and not re.search(r"^Output:\s*\S", body, re.M):
            raise Problem(f"{path.name}: exercise `{title}` has no `Output:` line saying what is handed in")
        if kind == "source":
            for line in body.splitlines():
                if line.strip() and "http" not in line:
                    raise Problem(f"{path.name}: source line without a link: {line.strip()[:60]!r}")

        statements.append(
            "INSERT INTO lesson_blocks (id, lesson_id, sort, kind, title, body_md) VALUES ("
            f"{sql_str(f'{lesson_id}.{index:02d}')}, {sql_str(lesson_id)}, {index}, "
            f"{sql_str(kind)}, {sql_str(title)}, {sql_str(body)});"
        )

    if seen_kinds[0] != "goal":
        raise Problem(f"{path.name}: the first block must be `goal` — say what the learner can do after this")
    for required in ("worked_example", "pitfall", "exercise"):
        if required not in seen_kinds:
            raise Problem(f"{path.name}: no `{required}` block")
    return statements


def build_case(path: Path, lessons: set[str], codes: set[str]) -> list[str]:
    meta, sections = parse_document(path)
    case_id = meta.get("case", "")
    lesson_id = meta.get("lesson", "")
    if not re.fullmatch(r"C-\d{3}[a-z]?", case_id):
        raise Problem(f"{path.name}: case id {case_id!r} must look like C-040")
    if lesson_id not in lessons:
        raise Problem(f"{path.name}: lesson {lesson_id!r} is not in the generated curriculum")
    status = meta.get("status", "draft")
    pilot_runs = int(meta.get("pilot_runs", "0"))
    if status == "published" and pilot_runs < 3:
        raise Problem(f"{path.name}: a case goes live only after 3 pilot runs (pilot_runs = {pilot_runs})")

    body = {kind: (title, text) for kind, title, text in sections}
    for required in CASE_SECTIONS:  # frame.check is optional; when present it is enforced above
        if required not in body:
            raise Problem(f"{path.name}: missing section `## {required}`")
        check_prose(path, required, body[required][1])

    numbers_raw = re.sub(r"^```(?:json)?|```$", "", body["frame.numbers"][1].strip(), flags=re.M).strip()
    try:
        numbers = json.loads(numbers_raw)
    except json.JSONDecodeError as err:
        raise Problem(f"{path.name}: `frame.numbers` is not valid JSON ({err})") from err
    if not isinstance(numbers, dict) or not numbers:
        raise Problem(f"{path.name}: `frame.numbers` must be a non-empty JSON object of the numbers a grader checks")

    insight = meta.get("insight", "").strip()
    if len(insight) < 20:
        raise Problem(
            f"{path.name}: needs an `insight:` line — the one counter-intuitive thing this case teaches. "
            "A case whose insight makes everyone nod immediately is not worth 30 minutes of anyone's time."
        )

    # Numbers have to survive their own arithmetic: every `key = expression` line in frame.check is
    # recomputed from the other numbers and compared with what the answer frame claims.
    if "frame.check" in body:
        for line in body["frame.check"][1].splitlines():
            line = re.sub(r"^\s*-\s*", "", line).strip()
            if not line or line.startswith("#"):
                continue
            if "=" not in line:
                raise Problem(f"{path.name}: `frame.check` line is not `key = expression`: {line[:60]!r}")
            key, expression = line.split("=", 1)
            key = key.strip().strip("[]")
            if key not in numbers:
                raise Problem(f"{path.name}: `frame.check` checks {key!r}, which is not in frame.numbers")
            claimed = numbers[key]
            if not isinstance(claimed, (int, float)) or isinstance(claimed, bool):
                raise Problem(f"{path.name}: `frame.check` checks {key!r}, which is not a number")
            computed = evaluate(expression.strip(), numbers)
            if claimed == 0 or abs(computed - claimed) / abs(claimed) > CHECK_TOLERANCE:
                raise Problem(
                    f"{path.name}: the arithmetic does not agree — {key!r} says {claimed:,g} "
                    f"but {expression.strip()} works out to {computed:,g}"
                )

    reveals = [(t, b) for k, t, b in sections if k == "reveal"]
    traps = [(t, b) for k, t, b in sections if k == "trap"]
    panels = [(k.split(".", 1)[1], b) for k, t, b in sections if k.startswith("panel.")]
    if len(reveals) < 3:
        raise Problem(f"{path.name}: only {len(reveals)} reveal items — a case needs at least 3 pieces of data it holds back")
    if not traps:
        raise Problem(f"{path.name}: no `## trap · CODE` — a case has to test something specific")

    statements = [
        f"DELETE FROM panel_questions WHERE case_id = {sql_str(case_id)};",
        f"DELETE FROM case_answer_frames WHERE case_id = {sql_str(case_id)};",
        f"DELETE FROM case_traps WHERE case_id = {sql_str(case_id)};",
        f"DELETE FROM case_reveal_items WHERE case_id = {sql_str(case_id)};",
        f"DELETE FROM cases WHERE id = {sql_str(case_id)};",
        "INSERT INTO cases (id, lesson_id, title, industry, context, question, duration_min, is_fictional, status, pilot_runs, version) VALUES ("
        f"{sql_str(case_id)}, {sql_str(lesson_id)}, {sql_str(meta.get('title', ''))}, {sql_str(meta.get('industry', ''))}, "
        f"{sql_str(body['context'][1])}, {sql_str(body['question'][1])}, {int(meta.get('duration_min', '30'))}, "
        f"{sql_str(meta.get('is_fictional', 'true').lower() == 'true')}, {sql_str(status)}, {pilot_runs}, 1);",
    ]

    for index, (trigger, content) in enumerate(reveals, start=1):
        if not (trigger.startswith("Nếu hỏi") or trigger == "Phát sẵn"):
            raise Problem(f"{path.name}: reveal trigger {trigger!r} must be `Phát sẵn` or start with `Nếu hỏi`")
        check_prose(path, f"reveal · {trigger}", content)
        statements.append(
            "INSERT INTO case_reveal_items (id, case_id, trigger, content, sort) VALUES ("
            f"{sql_str(f'{case_id}.r{index}')}, {sql_str(case_id)}, {sql_str(trigger)}, {sql_str(content)}, {index});"
        )

    for index, (code, description) in enumerate(traps, start=1):
        if code not in codes:
            raise Problem(f"{path.name}: trap names mistake code {code!r}, which does not exist")
        check_prose(path, f"trap · {code}", description)
        statements.append(
            "INSERT INTO case_traps (id, case_id, description, mistake_code) VALUES ("
            f"{sql_str(f'{case_id}.t{index}')}, {sql_str(case_id)}, {sql_str(description)}, {sql_str(code)});"
        )

    statements.append(
        "INSERT INTO case_answer_frames (case_id, structure_md, key_numbers, quick_scoring_md) VALUES ("
        f"{sql_str(case_id)}, {sql_str(body['frame.structure'][1])}, {sql_str(json.dumps(numbers, ensure_ascii=False))}, "
        f"{sql_str(body['frame.scoring'][1])});"
    )

    for index, (category, text) in enumerate(panels, start=1):
        if category not in PANEL_CATEGORIES:
            raise Problem(f"{path.name}: panel category `{category}` (allowed: {', '.join(PANEL_CATEGORIES)})")
        for line_no, line in enumerate(q for q in text.splitlines() if q.strip()):
            question = line.strip().lstrip("-").strip()
            statements.append(
                "INSERT INTO panel_questions (id, case_id, category, text, from_appendix) VALUES ("
                f"{sql_str(f'{case_id}.q{index}{line_no}')}, {sql_str(case_id)}, {sql_str(category)}, {sql_str(question)}, 0);"
            )
    return statements


def build_rubric(path: Path, criteria: dict[str, set[str]]) -> list[str]:
    """Four level descriptors per criterion — the thing that makes two graders agree."""
    meta, sections = parse_document(path)
    rubric_id = meta.get("rubric", "")
    known = criteria.get(rubric_id)
    if not known:
        raise Problem(f"{path.name}: rubric {rubric_id!r} is not in the generated curriculum")

    if rubric_id in globals().get("_BLUEPRINT_RUBRICS", set()):
        print(f"  note {path.name}: replacing the descriptors content-source already generates for {rubric_id}")

    statements: list[str] = []
    seen: set[str] = set()
    for criterion_id, title, body in sections:
        if criterion_id not in known:
            raise Problem(f"{path.name}: criterion {criterion_id!r} does not belong to rubric {rubric_id}")
        check_prose(path, criterion_id, body)
        seen.add(criterion_id)

        levels: dict[int, str] = {}
        for line in body.splitlines():
            match = re.match(r"^([1-4])\.\s+(.+)$", line.strip())
            if match:
                levels[int(match.group(1))] = match.group(2).strip()
            elif line.strip() and levels:
                levels[max(levels)] += " " + line.strip()
        missing = [level for level in (1, 2, 3, 4) if level not in levels]
        if missing:
            raise Problem(
                f"{path.name}: criterion {criterion_id} ({title}) is missing level {missing} — "
                "a criterion without all four descriptors is where two graders start disagreeing"
            )
        for level, descriptor in sorted(levels.items()):
            if len(descriptor) < 25:
                raise Problem(f"{path.name}: {criterion_id} level {level} is too short to grade against: {descriptor!r}")
            statements.append(
                "INSERT INTO rubric_criterion_levels (criterion_id, level, descriptor) VALUES ("
                f"{sql_str(criterion_id)}, {level}, {sql_str(descriptor)});"
            )

    if seen != known:
        raise Problem(f"{path.name}: rubric {rubric_id} also has criteria {sorted(known - seen)} with no descriptors")
    return [f"DELETE FROM rubric_criterion_levels WHERE criterion_id IN (SELECT id FROM rubric_criteria WHERE rubric_id = {sql_str(rubric_id)});"] + statements


def main() -> int:
    check_only = "--check" in sys.argv
    try:
        lessons, codes, criteria = known_ids()
    except Problem as err:
        print(f"  ERROR {err}")
        return 1

    statements: list[str] = []
    problems: list[str] = []
    lesson_files = sorted((AUTHORING / "lessons").glob("*.md"))
    case_files = sorted((AUTHORING / "cases").glob("*.md"))
    rubric_files = sorted((AUTHORING / "rubrics").glob("*.md"))

    for path in lesson_files:
        try:
            statements += build_lesson(path, lessons, codes)
        except Problem as err:
            problems.append(str(err))
    for path in case_files:
        try:
            statements += build_case(path, lessons, codes)
        except Problem as err:
            problems.append(str(err))
    for path in rubric_files:
        try:
            statements += build_rubric(path, criteria)
        except Problem as err:
            problems.append(str(err))

    print(f"authored: {len(lesson_files)} lesson bodies, {len(case_files)} cases, {len(rubric_files)} rubrics")
    if problems:
        print(f"\nNOT READY ({len(problems)}):")
        for problem in problems:
            print(f"  - {problem}")
        print(f"\nThe rules: {QUALITY}")
        return 1

    if check_only:
        print("all authored content passes the quality rules")
        return 0

    OUT.write_text(
        "-- Generated by scripts/build-authored.py — do not edit; edit authoring/ instead.\n"
        + "\n".join(statements)
        + "\n",
        encoding="utf-8",
    )
    print(f"wrote {OUT.relative_to(ROOT)}: {len(statements)} statements")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
