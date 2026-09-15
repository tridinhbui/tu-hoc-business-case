#!/usr/bin/env python3
"""
Builds seed/curriculum.sql for the bc_content D1 database from the three source documents in
content-source/ (curriculum blueprint, module spec B2, case library). Re-run after editing a document.

Prints a gap report: everything the documents do not yet specify (e.g. rubric level descriptors,
mistake-code root causes) so it can be filled in instead of silently invented.
"""
import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "content-source"
OUT = ROOT / "seed" / "curriculum.sql"
NOW_MS = 0  # published_at is informational for seeded content

# ---------------------------------------------------------------- tiny DOM
VOID = {"br", "hr", "img", "input", "meta", "link", "col", "source", "wbr"}


class Node:
    def __init__(self, tag, attrs, parent=None):
        self.tag, self.attrs, self.parent, self.children = tag, dict(attrs), parent, []

    def cls(self):
        return self.attrs.get("class", "").split()

    def text(self):
        out = []
        for c in self.children:
            if isinstance(c, str):
                out.append(c)
            elif c.tag == "br":
                out.append(" ")
            else:
                out.append(c.text())
        return re.sub(r"\s+", " ", "".join(out)).strip()

    def find_all(self, tag=None, cls=None, id=None):
        found = []
        for c in self.children:
            if isinstance(c, str):
                continue
            if (tag is None or c.tag == tag) and (cls is None or cls in c.cls()) and (id is None or c.attrs.get("id") == id):
                found.append(c)
            found.extend(c.find_all(tag, cls, id))
        return found

    def find(self, tag=None, cls=None, id=None):
        r = self.find_all(tag, cls, id)
        return r[0] if r else None

    def kids(self, tag):
        return [c for c in self.children if not isinstance(c, str) and c.tag == tag]


class Builder(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = Node("root", {})
        self.cur = self.root

    def handle_starttag(self, tag, attrs):
        node = Node(tag, attrs, self.cur)
        self.cur.children.append(node)
        if tag not in VOID:
            self.cur = node

    def handle_endtag(self, tag):
        n = self.cur
        while n is not None and n.tag != tag:
            n = n.parent
        if n is not None and n.parent is not None:
            self.cur = n.parent

    def handle_data(self, data):
        self.cur.children.append(data)


def parse(path):
    b = Builder()
    b.feed(path.read_text(encoding="utf-8"))
    return b.root


def rows_of(dl):
    """<div class="row"><dt>Label</dt><dd>…</dd></div> → {label: dd node}"""
    out = {}
    for row in dl.find_all("div", "row"):
        dt, dd = row.find("dt"), row.find("dd")
        if dt and dd:
            out[dt.text()] = dd
    return out


# ---------------------------------------------------------------- helpers
def q(v):
    if v is None:
        return "NULL"
    if isinstance(v, (int, float)):
        return str(v)
    return "'" + str(v).replace("'", "''") + "'"


def insert(table, row):
    cols = ", ".join(row.keys())
    vals = ", ".join(q(v) for v in row.values())
    return f"INSERT INTO {table} ({cols}) VALUES ({vals});"


CODE_RE = re.compile(r"\b([A-Z]{3}-\d{2})\b")
GAPS = []


def gap(msg):
    GAPS.append(msg)


SKILL_RULES = [
    (r"giả thuyết|hypothesis", "S02"),
    (r"sizing|thị trường|TAM|SAM", "S05"),
    (r"chart|exhibit|đọc dữ liệu|đọc đúng dữ liệu", "S11"),
    (r"slide|deck|tiêu đề|title|storyboard|storyline|appendix|đọc dọc", "S14"),
    (r"pitch|trình bày|trả lời|Q&A|giao tiếp|phối hợp|fit|dẫn dắt|phong độ|nhịp", "S15"),
    (r"khuyến nghị|đề xuất|recommendation", "S13"),
    (r"insight|tổng hợp|governing|pyramid|thông điệp|mạch|kết luận chủ đạo", "S12"),
    (r"cạnh tranh|đối thủ|thâm nhập|synergy|chiến lược", "S10"),
    (r"bottleneck|tồn kho|mạng lưới|process|vận hành|mức dịch vụ|công suất|cost-to-serve|chi phí phục vụ|phân bổ chi phí", "S09"),
    (r"phân khúc|khách|funnel|CAC|LTV|định vị|value proposition|kênh|marketing|ngân sách|chỉ số", "S08"),
    (r"dòng tiền|NPV|định giá|tài chính|unit economics|biên|chi phí chìm|đơn vị", "S07"),
    (r"mô hình doanh thu|doanh thu|cấu trúc chi phí|đòn bẩy|mô hình", "S04"),
    (r"MECE|cây|cấu trúc|structure|trục chia|driver|phân rã|nhánh", "S03"),
    (r"khung|trọng tâm|câu hỏi chính|framing|problem|scope|tiêu chí thành công", "S01"),
    (r"rủi ro|khả thi|ràng buộc|điều kiện|cắt|phạm vi|quy trình|mốc", "S16"),
    (r"tính|định lượng|chính xác|kịch bản|sensitivity|tốc độ|sanity|số", "S06"),
]


def skill_for(name, fallback):
    for pattern, skill in SKILL_RULES:
        if re.search(pattern, name, re.IGNORECASE):
            return skill
    return fallback


def split_weighted(text):
    """'Cấu trúc (20) · Định lượng (25)' or 'Structure 20 · Định lượng 25' → [(name, weight)]"""
    items = []
    for part in [p.strip() for p in text.split("·") if p.strip()]:
        m = re.match(r"^(.*?)\s*\(?(\d{1,3})\)?\s*$", part)
        if m and m.group(1):
            items.append((m.group(1).strip(" :"), int(m.group(2))))
    return items


# ---------------------------------------------------------------- load documents
cur = parse(SRC / "curriculum.html")
b2 = parse(SRC / "module-b2.html")
lib = parse(SRC / "case-library.html")
sql = ["-- Generated by scripts/build-seed.py from content-source/. Do not edit by hand.", "PRAGMA defer_foreign_keys = ON;"]

for table in ["level_gates", "capstones", "path_items", "learning_paths", "assumption_bank", "panel_questions",
              "case_exhibits", "exhibits", "case_answer_frames", "case_traps", "case_reveal_items", "cases",
              "lesson_target_mistakes", "mistake_codes", "lesson_rubrics", "rubric_criterion_levels", "rubric_criteria",
              "rubrics", "lesson_skills", "lessons", "module_skills", "module_prereqs", "modules", "tracks",
              "skill_levels", "skills"]:
    sql.append(f"DELETE FROM {table};")

# ---------------------------------------------------------------- skills
skill_ids = []
for i, tr in enumerate(cur.find(id="s3").find("tbody").kids("tr"), start=1):
    tds = tr.kids("td")
    m = re.match(r"(S\d\d)\s*·\s*(.+)", tds[0].text())
    sid, name = m.group(1), m.group(2)
    skill_ids.append(sid)
    sql.append(insert("skills", {"id": sid, "name": name, "description": tds[4].text(), "sort": i}))
    for level, td in zip(["beginner", "intermediate", "advanced"], tds[1:4]):
        sql.append(insert("skill_levels", {"skill_id": sid, "level": level, "descriptor": td.text(), "evidence": tds[4].text()}))

# ---------------------------------------------------------------- tracks
track_levels = {}
for i, tr in enumerate(cur.find(id="s4").find("tbody").kids("tr"), start=1):
    tds = tr.kids("td")
    m = re.match(r"([A-J])\s*·\s*(.+)", tds[0].text())
    tid, name = m.group(1), m.group(2)
    levels = [int(x) for x in re.findall(r"L(\d)", tds[4].text())]
    track_levels[tid] = (min(levels), max(levels))
    sql.append(insert("tracks", {"id": tid, "name": name, "role": tds[1].text(), "sort": i}))

# ---------------------------------------------------------------- lessons (the 100 spine) + kinds
assets = {tr.kids("td")[0].text(): tr.attrs.get("data-a") for tr in lib.find(id="assets").find("tbody").kids("tr")}
case_sheets = {s.find(cls="sid").text(): s for s in lib.find_all("div", "sheet")}


def lesson_kind(lid, title, track):
    t = title.lower()
    if t.startswith("checkpoint"):
        return "checkpoint"
    if t.startswith("simulation"):
        return "team_sim"
    if t.startswith("full case") or t.startswith("case dài"):
        return "full_case"
    if t.startswith("mini case") or t.startswith("case ngắn") or t.startswith("teardown"):
        return "mini_case"
    if t.startswith("drill"):
        return "drill"
    if track == "J" and assets.get(lid) in ("CASE", "REC"):
        return "live_case"
    if assets.get(lid) == "CASE":
        return "mini_case"
    if assets.get(lid) == "DRILL":
        return "drill"
    return "lesson"


DEFAULT_MINUTES = {"lesson": 30, "drill": 25, "mini_case": 40, "full_case": 70, "timed_case": 45,
                   "checkpoint": 60, "team_sim": 1440, "qa_sim": 20, "live_case": 30}


def minutes_from_tags(sheet):
    for tag in sheet.find(cls="sheet-h").find_all("span", "tag"):
        t = tag.text()
        if m := re.match(r"(\d+)\s*phút", t):
            return int(m.group(1))
        if m := re.match(r"([\d,]+)\s*giờ", t):
            return int(float(m.group(1).replace(",", ".")) * 60)
        if m := re.match(r"(\d+)\s*buổi", t):
            return int(m.group(1)) * 180
    return None


lessons = []
for tr in cur.find(id="lessons").find("tbody").kids("tr"):
    tds = tr.kids("td")
    lid, title, module_id = tds[0].text(), tds[1].text(), tds[2].text()
    kind = lesson_kind(lid, title, tr.attrs["data-t"])
    sheet = case_sheets.get(f"C-{lid}")
    minutes = (minutes_from_tags(sheet) if sheet else None) or DEFAULT_MINUTES[kind]
    lessons.append({
        "id": lid, "module_id": module_id, "title": title, "kind": kind, "level": int(tr.attrs["data-l"]),
        "est_minutes": minutes, "output_spec": tds[4].text(), "skills": tds[3].text().split(),
    })

# ---------------------------------------------------------------- modules
modules = {}
for block in cur.find(id="s5").find_all("div", "mod"):
    code = block.find(cls="mod-code").text()
    rows = rows_of(block.find("dl"))
    modules[code] = {
        "id": code, "track_id": code[0], "title": block.find("h4").text(),
        "skills": block.find(cls="tag").text().split(), "rows": rows,
    }

# ---------------------------------------------------------------- module checkpoints
# Every module in the blueprint defines a checkpoint. Where the 100-lesson spine already contains it,
# that lesson gates the module; otherwise a checkpoint lesson is generated from the module's own text.
MODULE_CHECKPOINT_OVERRIDE = {"D1": ["081"]}  # D1's checkpoint is the 24-hour team simulation itself
gating = {}
for code in modules:
    spine = [l for l in lessons if l["module_id"] == code]
    if code in MODULE_CHECKPOINT_OVERRIDE:
        gating[code] = MODULE_CHECKPOINT_OVERRIDE[code]
    elif checkpoints := [l["id"] for l in spine if l["kind"] == "checkpoint"]:
        gating[code] = checkpoints

generated_checkpoints = []
next_id = 101
for code, mod in modules.items():
    if code in gating:
        continue
    spine = [l for l in lessons if l["module_id"] == code]
    text = mod["rows"]["Checkpoint"].text()
    lid = f"{next_id:03d}"
    next_id += 1
    lessons.append({
        "id": lid, "module_id": code, "title": f"Checkpoint {code} — {mod['title']}", "kind": "checkpoint",
        "level": max([l["level"] for l in spine] or [track_levels[mod["track_id"]][0]]),
        "est_minutes": int(m.group(1)) if (m := re.search(r"(\d+)\s*phút", text)) else 60,
        "output_spec": text, "skills": mod["skills"],
    })
    gating[code] = [lid]
    generated_checkpoints.append(f"{lid}={code}")

for l in lessons:
    l["gates_module"] = 1 if l["id"] in gating.get(l["module_id"], []) else 0

for code, mod in modules.items():
    lo, hi = track_levels[mod["track_id"]]
    mins = sum(l["est_minutes"] for l in lessons if l["module_id"] == code) or 300
    sql.append(insert("modules", {
        "id": code, "track_id": mod["track_id"], "title": mod["title"], "level_min": lo, "level_max": hi,
        "outcome": mod["rows"]["Năng lực"].text(), "out_of_scope": "[]", "est_minutes": mins,
        "status": "published", "version": 1, "published_at": NOW_MS,
    }))
    for i, s in enumerate(mod["skills"]):
        sql.append(insert("module_skills", {"module_id": code, "skill_id": s, "role": "primary" if i == 0 else "secondary"}))

module_prereqs_map = {}
for code, mod in modules.items():
    prereq = mod["rows"]["Prerequisite"].text()
    if prereq.startswith("Không"):
        continue
    min_score = int(m.group(1)) if (m := re.search(r"≥\s*(\d+)", prereq)) else None
    required = []
    for token in re.findall(r"\b([A-J][1-4](?:\s*–\s*[A-J][1-4])?)\b", prereq):
        if "–" in token:
            start, end = [t.strip() for t in token.split("–")]
            required += [f"{start[0]}{n}" for n in range(int(start[1]), int(end[1]) + 1)]
        else:
            required.append(token)
    if not required:
        gap(f"module {code}: prerequisite '{prereq}' is not a module list — enforced by level gate instead")
    module_prereqs_map[code] = [r for r in dict.fromkeys(required) if r != code and r in modules]
    for req in dict.fromkeys(required):
        if req != code and req in modules:
            sql.append(insert("module_prereqs", {"module_id": code, "requires_module_id": req, "kind": "hard", "min_checkpoint_score": min_score}))

for l in lessons:
    sql.append(insert("lessons", {
        "id": l["id"], "module_id": l["module_id"], "title": l["title"], "kind": l["kind"], "level": l["level"],
        "est_minutes": l["est_minutes"], "output_spec": l["output_spec"], "timed_variant_of": None,
        "gates_module": l["gates_module"], "status": "published", "version": 1, "published_at": NOW_MS,
    }))
    for s in dict.fromkeys(l["skills"]):
        if s in skill_ids:
            sql.append(insert("lesson_skills", {"lesson_id": l["id"], "skill_id": s}))

# ---------------------------------------------------------------- rubrics: standard R1–R6
std = cur.find(id="s9").find_all("table")[1]
for tr in std.find("tbody").kids("tr"):
    tds = tr.kids("td")
    rid, name = tds[0].find("strong").text().split(" · ", 1)
    threshold = int(re.match(r"(\d+)", tds[2].text()).group(1))
    sql.append(insert("rubrics", {"id": rid, "name": name, "pass_threshold": threshold, "version": 1}))
    for i, (cname, weight) in enumerate(split_weighted(tds[1].text()), start=1):
        sql.append(insert("rubric_criteria", {"id": f"{rid}.{i}", "rubric_id": rid, "name": cname, "weight": weight,
                                              "skill_id": skill_for(cname, "S16"), "sort": i}))
    gap(f"rubric {rid}: only the level-4 descriptor of its heaviest criterion is written; levels 1–3 missing")

# B2 spec: full four-level descriptors
b2_levels = []
for tr in b2.find(id="m5").find("tbody").kids("tr"):
    tds = tr.kids("td")
    b2_levels.append([td.text() for td in tds[2:6]])

# ---------------------------------------------------------------- rubrics: one per module
for code, mod in modules.items():
    rid = f"RM-{code}"
    criteria = split_weighted(mod["rows"]["Rubric"].text())
    total = sum(w for _, w in criteria)
    if total != 100:
        gap(f"rubric {rid}: weights sum to {total}, not 100")
    checkpoint = mod["rows"]["Checkpoint"].text()
    threshold = int(m.group(1)) if (m := re.search(r"≥\s*(\d+)", checkpoint)) else 70
    sql.append(insert("rubrics", {"id": rid, "name": f"{code} · {mod['title']}", "pass_threshold": threshold, "version": 1}))
    for i, (cname, weight) in enumerate(criteria, start=1):
        cid = f"{rid}.{i}"
        sql.append(insert("rubric_criteria", {"id": cid, "rubric_id": rid, "name": cname, "weight": weight,
                                              "skill_id": skill_for(cname, mod["skills"][0]), "sort": i}))
        if code == "B2" and i <= len(b2_levels):
            for lv, desc in enumerate(b2_levels[i - 1], start=1):
                sql.append(insert("rubric_criterion_levels", {"criterion_id": cid, "level": lv, "descriptor": desc}))
    if code != "B2":
        gap(f"rubric {rid}: no four-level descriptors yet (only B2 is fully specified)")

for l in lessons:
    sql.append(insert("lesson_rubrics", {"lesson_id": l["id"], "rubric_id": f"RM-{l['module_id']}", "weight_overrides": "{}"}))

# ---------------------------------------------------------------- mistake codes
REMEDIATION_LESSON = {
    "FRM": "001", "TRE": "006", "BIZ": "009", "SIZ": "021", "QNT": "016", "CHT": "022", "VAR": "025", "REC": "013",
    "FIN": "031", "PRF": "036", "ENT": "040", "PRC": "045", "MNA": "049", "MKT": "055", "OPS": "062", "SCM": "064",
    "SYN": "082", "STO": "071", "EXH": "075", "DCK": "085", "CMP": "080", "PIT": "087", "IND": "089", "ITV": "096",
}
GROUP_SKILL = {
    "FRM": "S01", "TRE": "S03", "BIZ": "S04", "SIZ": "S05", "QNT": "S06", "VAR": "S06", "PRF": "S06", "FIN": "S07",
    "PRC": "S07", "MNA": "S07", "MKT": "S08", "OPS": "S09", "SCM": "S09", "ENT": "S10", "CHT": "S11", "SYN": "S12",
    "REC": "S13", "STO": "S14", "EXH": "S14", "DCK": "S14", "PIT": "S15", "ITV": "S15", "IND": "S04", "CMP": "S16",
}

codes = {}
for code, mod in modules.items():
    dd = mod["rows"]["Lỗi phổ biến"]
    for part in dd.text().split("·"):
        if m := re.match(r"\s*([A-Z]{3}-\d{2})\s+(.+)", part):
            codes.setdefault(m.group(1), {"title": m.group(2).strip(), "symptom": None, "root_cause": "", "reps": 2, "module": code})

for tr in b2.find(id="m6").find("tbody").kids("tr"):
    tds = tr.kids("td")
    c = tds[0].text()
    entry = codes.setdefault(c, {"title": tds[1].text(), "root_cause": "", "reps": 2, "module": "B2"})
    entry.update({"symptom": tds[1].text(), "root_cause": tds[2].text(), "reps": int(tds[4].text())})
    if entry["title"] == c:
        entry["title"] = tds[1].text()

referenced = set(CODE_RE.findall((SRC / "case-library.html").read_text(encoding="utf-8")))
for c in sorted(referenced - set(codes)):
    gap(f"mistake code {c} is used in the case library but defined nowhere")

no_cause = 0
for c, e in sorted(codes.items()):
    group = c[:3]
    if not e["root_cause"]:
        no_cause += 1
    sql.append(insert("mistake_codes", {
        "code": c, "group_code": group, "skill_id": GROUP_SKILL.get(group), "title": e["title"][:1].upper() + e["title"][1:],
        "symptom": e["symptom"] or e["title"], "root_cause": e["root_cause"],
        "remediation_lesson_id": REMEDIATION_LESSON.get(group), "remediation_reps": e["reps"],
    }))
    if group not in REMEDIATION_LESSON:
        gap(f"mistake group {group} has no remediation drill mapped")
if no_cause:
    gap(f"{no_cause} of {len(codes)} mistake codes have no root cause or dedicated drill spec yet (only SIZ is fully specified)")

for code, mod in modules.items():
    targeted = CODE_RE.findall(mod["rows"]["Lỗi phổ biến"].text())
    for lesson_id in gating[code]:
        for c in dict.fromkeys(targeted):
            sql.append(insert("lesson_target_mistakes", {"lesson_id": lesson_id, "code": c}))

# ---------------------------------------------------------------- cases
INDUSTRY = [
    (r"cà phê|trà sữa|F&B|nhà hàng|bếp|cơm|buffet", "F&B"), (r"nhà sách|tiện lợi|siêu thị|bán lẻ|retail|thời trang", "Bán lẻ"),
    (r"ngân hàng|bảo hiểm", "Tài chính"), (r"dược|bệnh viện|nha khoa", "Y tế"), (r"sữa|nước giặt|FMCG|mỹ phẩm|chăm sóc da|hàng tiêu dùng", "FMCG"),
    (r"gọi xe|giao đồ ăn|giao hàng|thương mại điện tử|SaaS|phần mềm|ứng dụng", "Công nghệ"), (r"bao bì|sản xuất|nhà máy|may", "Sản xuất"),
    (r"gym|phòng tập", "Dịch vụ"), (r"sizing|thị trường lạ", "Đa ngành"),
]
case_count = 0
for sid, sheet in case_sheets.items():
    lesson_id = re.match(r"C-(\d{3})", sid).group(1)
    title = sheet.find("h4").text()
    rows = rows_of(sheet.find("dl"))
    context = rows.get("Bối cảnh").text() if "Bối cảnh" in rows else ""
    question = next((rows[k].text() for k in ("Câu hỏi", "Cơ cấu", "Danh mục", "Cấu trúc mỗi case", "Cấu trúc", "Ví dụ thiết kế") if k in rows), "")
    blob = f"{title} {context}"
    industry = next((name for pattern, name in INDUSTRY if re.search(pattern, blob, re.IGNORECASE)), "Đa ngành")
    sql.append(insert("cases", {
        "id": sid, "lesson_id": lesson_id, "title": title, "industry": industry, "context": context, "question": question,
        "duration_min": minutes_from_tags(sheet) or DEFAULT_MINUTES[next(l["kind"] for l in lessons if l["id"] == lesson_id)],
        "is_fictional": 1, "status": "draft", "pilot_runs": 0, "version": 1,
    }))
    case_count += 1

    if "Dữ liệu phát" in rows:
        dd = rows["Dữ liệu phát"]
        parts = [li.text() for li in dd.find_all("li")] or [p.strip() for p in dd.text().split("·")]
        for i, part in enumerate([p for p in parts if p], start=1):
            m = re.match(r"(Nếu hỏi[^:]*):\s*(.+)", part)
            trigger, content = (m.group(1), m.group(2)) if m else ("Phát sẵn", part)
            sql.append(insert("case_reveal_items", {"id": f"{sid}.r{i}", "case_id": sid, "trigger": trigger, "content": content, "sort": i}))
    else:
        gap(f"case {sid}: no 'Dữ liệu phát' row")

    trap_dd = rows.get("Bẫy")
    if trap_dd is None:
        gap(f"case {sid}: no trap declared")
    else:
        default_code = (CODE_RE.findall(trap_dd.text()) or [None])[0]
        items = [li.text() for li in trap_dd.find_all("li")] or [trap_dd.text()]
        for i, item in enumerate(items, start=1):
            code = (CODE_RE.findall(item) or [default_code])[0]
            if code is None or code not in codes:
                gap(f"case {sid}: trap {i} names no known mistake code")
                continue
            sql.append(insert("case_traps", {"id": f"{sid}.t{i}", "case_id": sid, "description": item, "mistake_code": code}))

    frame = rows.get("Đáp án khung")
    quick = rows.get("Chấm nhanh")
    if frame is None or quick is None:
        gap(f"case {sid}: missing answer frame or quick scoring")
    else:
        sql.append(insert("case_answer_frames", {"case_id": sid, "structure_md": frame.text(), "key_numbers": "{}", "quick_scoring_md": quick.text()}))

# ---------------------------------------------------------------- assumption bank (B2 spec)
CONF = {"Tra được": "lookup", "Suy ra được": "derived", "Phải đoán": "guess", "Quy ước": "convention"}


def vn_number(s):
    return float(s.replace(".", "").replace(",", "."))


for tr in b2.find(id="m3").find("tbody").kids("tr"):
    tds = tr.kids("td")
    raw = tds[2].text().lstrip("~").strip()
    nums = re.findall(r"\d[\d.,]*", raw)
    unit = re.sub(r"\d[\d.,]*|[–~-]", " ", raw)
    unit = re.sub(r"\s+", " ", unit).strip()
    mixed = len(set(re.findall(r"nghìn|triệu|tỷ", raw))) > 1
    low = high = None
    if nums and not mixed:
        low, high = vn_number(nums[0]), vn_number(nums[-1])
    else:
        unit = raw
    sql.append(insert("assumption_bank", {
        "id": f"AB-{tds[0].text()}", "label": tds[1].text(), "low": low, "high": high, "unit": unit or "—",
        "confidence": CONF.get(tds[3].text(), "guess"), "source_url": None, "verified_at": None,
    }))
gap("assumption bank: 30 rows imported with no source_url — every row must be verified before it is shown to learners")

# ---------------------------------------------------------------- learning paths
# Which weekly-focus text (blueprint § 07) talks about which module. Matched case-insensitively against
# each week's text in a path. Written against the actual wording; watch for false friends:
# "Profitability" contains "fit" (J3), "exhibit-heavy" is not exhibit design (I2), "funnel math" is not case math (B1).
WEEK_KEYWORDS = {
    "A1": r"đọc đề|framing|định khung|câu hỏi chính",
    "A2": r"issue tree|mece",
    "A3": r"mô hình kinh doanh|kiếm tiền",
    "A4": r"khuyến nghị|từ phân tích đến",
    "B1": r"case math|math nền|math vận hành|phần trăm",
    "B2": r"sizing",
    "B3": r"đọc chart|đọc exhibit|đọc dữ liệu",
    "B4": r"phân rã",
    "C1": r"profitability",
    "C2": r"market entry|growth",
    "C3": r"pricing",
    "C4": r"m&a|investment memo",
    "D1": r"24 giờ",
    "D2": r"hợp nhất",
    "D3": r"deck thi",
    "D4": r"pitch|q&a",
    "E1": r"phân khúc|định vị",
    "E2": r"funnel|cac|ltv",
    "E3": r"go-to-market|marketing plan",
    "F1": r"process|capacity|bottleneck",
    "F2": r"tồn kho|mạng lưới",
    "F3": r"cost-to-serve|sourcing|s&op",
    "G1": r"báo cáo tài chính|dòng tiền",
    "G2": r"unit economics",
    "G3": r"đánh giá đầu tư|định giá nhanh",
    "H1": r"retail|fmcg",
    "H2": r"ngân hàng|bảo hiểm|healthcare",
    "H3": r"logistics|năng lượng",
    "I1": r"pyramid|action title|storyline|trình bày",
    "I2": r"(?<!đọc )exhibit(?!-heavy)|trình bày",
    "I3": r"storyboard|trình bày",
    "J1": r"interviewer-led|live case",
    "J2": r"candidate-led",
    "J3": r"\bfit\b|full loop|mock panel",
}
PATH_REPORT = []
lesson_ids_by_module = {}
for l in lessons:
    lesson_ids_by_module.setdefault(l["module_id"], []).append(l["id"])

for block in cur.find(id="s7").find_all("div", "mod"):
    code = block.find(cls="mod-code").text()
    n = re.search(r"\d+", code).group(0)
    pid = f"PATH-{n}"
    title = block.find("h4").text()
    tag = block.find(cls="tag").text()
    rows = rows_of(block.find("dl"))
    weeks = len(rows["Weekly focus"].find_all("li"))
    hours = (re.search(r"([\d–]+h/tuần)", tag) or [None, "—"])[1]
    persona = (re.search(r"\bP\d\b", tag) or [None])[0] or "—"
    capstone = (re.search(r"CP-\d\d", rows["Final"].text()) or [None])[0]
    sql.append(insert("learning_paths", {"id": pid, "name": title, "weeks": weeks, "hours_per_week": hours, "persona": persona, "capstone_id": capstone}))

    module_list = []
    for token in re.findall(r"[A-J][1-4](?:\s*–\s*[A-J][1-4])?", rows["Modules"].text()):
        if "–" in token:
            a, b = [t.strip() for t in token.split("–")]
            module_list += [f"{a[0]}{k}" for k in range(int(a[1]), int(b[1]) + 1)]
        else:
            module_list.append(token)
    module_order = list(dict.fromkeys(module_list))
    week_texts = [re.sub(r"^T\d+\s*", "", li.text()) for li in rows["Weekly focus"].find_all("li")]

    # a module goes to every week whose focus text mentions it; its lessons are spread across those weeks
    matched = {}
    for m in module_order:
        hits = [i + 1 for i, text in enumerate(week_texts) if re.search(WEEK_KEYWORDS.get(m, r"$^"), text, re.IGNORECASE)]
        if hits:
            matched[m] = hits
    placed, fallback = {}, []
    for idx, m in enumerate(module_order):
        if m in matched:
            placed[m] = matched[m]
            continue
        # unmatched: same week as the module listed before it, or earlier if a module that needs it comes earlier
        prev = placed[module_order[idx - 1]][0] if idx > 0 else 1
        needed_by = [matched[d][0] for d in module_order if d in matched and m in module_prereqs_map.get(d, [])]
        placed[m] = [min([prev] + needed_by)]
        fallback.append(m)
    # never schedule a module before a module it requires
    changed = True
    while changed:
        changed = False
        for m in module_order:
            floor = max([placed[r][0] for r in module_prereqs_map.get(m, []) if r in placed] or [1])
            if placed[m][0] < floor:
                placed[m] = sorted({max(w, floor) for w in placed[m]})
                changed = True

    scheduled = []
    for order, m in enumerate(module_order):
        lids = lesson_ids_by_module.get(m, [])
        for i, lid in enumerate(lids):
            scheduled.append((placed[m][i * len(placed[m]) // max(1, len(lids))], order, i, lid))
    for sort, (week, _, _, lid) in enumerate(sorted(scheduled), start=1):
        sql.append(insert("path_items", {"path_id": pid, "week": week, "lesson_id": lid, "sort": sort}))

    per_week = {w: [m for m in module_order if w in placed[m]] for w in range(1, weeks + 1)}
    PATH_REPORT.append(f"{pid}: " + " | ".join(f"T{w} {' '.join(per_week[w]) or '—'}" for w in per_week)
                       + (f"   [không khớp chữ tuần, xếp theo thứ tự: {' '.join(fallback)}]" if fallback else ""))
    for w, mods in per_week.items():
        if not mods:
            gap(f"path {pid}: week {w} has no module — weekly focus '{week_texts[w - 1]}' matches no keyword")

# ---------------------------------------------------------------- capstones
for block in cur.find(id="s12").find_all("div", "mod"):
    rows = rows_of(block.find("dl"))
    mix = {name: w for name, w in split_weighted(rows["Rubric chính"].text().split(".")[0])}
    sql.append(insert("capstones", {
        "id": block.find(cls="mod-code").text(), "title": block.find("h4").text(), "objective": rows["Objective"].text(),
        "industry": rows["Industry"].text(), "deliverable": rows["Deliverable"].text(), "rubric_mix": json.dumps(mix, ensure_ascii=False),
    }))

# ---------------------------------------------------------------- level gates (blueprint § 06)
for level, lesson_id in [(2, "014"), (3, "026"), (3, "039"), (4, "050"), (4, "072")]:
    sql.append(insert("level_gates", {"level": level, "lesson_id": lesson_id}))

OUT.write_text("\n".join(sql) + "\n", encoding="utf-8")

kinds = {}
for l in lessons:
    kinds[l["kind"]] = kinds.get(l["kind"], 0) + 1
print(f"wrote {OUT.relative_to(ROOT)}: {len(sql)} statements")
print(f"  skills {len(skill_ids)} · tracks {len(track_levels)} · modules {len(modules)} · lessons {len(lessons)} {kinds}")
print(f"  mistake codes {len(codes)} · cases {case_count} · rubrics 6 standard + {len(modules)} module")
print(f"  module checkpoints: {sum(len(v) for v in gating.values())} lessons gate {len(gating)}/{len(modules)} modules; "
      f"generated {len(generated_checkpoints)} ({', '.join(generated_checkpoints)})")
print("\nWEEKLY PLAN (from blueprint weekly focus):")
for line in PATH_REPORT:
    print("  " + line)
print(f"\nGAPS ({len(GAPS)}):")
seen = set()
for g in GAPS:
    key = re.sub(r"RM-[A-J]\d|R\d|PATH-\d", "*", g)
    if key in seen and ("rubric" in g or "path" in g):
        continue
    seen.add(key)
    print("  -", g)
sys.exit(0)
