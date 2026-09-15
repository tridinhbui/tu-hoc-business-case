#!/bin/sh
# Runs migrations on throwaway SQLite files, seeds a scenario, checks gates and constraints.
set -e
cd "$(dirname "$0")/.."
DB=/tmp/bc_learning_test.db; rm -f $DB
for f in migrations/learning/*.sql; do sqlite3 -bail $DB "PRAGMA foreign_keys=ON;" ".read $f"; done
NOW=1789000000000; DAY=86400000

sqlite3 -bail $DB <<EOF
PRAGMA foreign_keys=ON;
INSERT INTO users VALUES ('u1','lan@example.com','Lan','learner','P2',2,$NOW);
-- three graded mini cases; SIZ-02 appears in two of them, TRE-02 in one
INSERT INTO attempts (id,user_id,lesson_id,lesson_kind,content_version,status,started_at,submitted_at,graded_at,final_score,passed)
VALUES ('a1','u1','014','mini_case',1,'graded',$NOW-3*$DAY,$NOW-3*$DAY,$NOW-3*$DAY,62,0),
       ('a2','u1','021','mini_case',1,'graded',$NOW-2*$DAY,$NOW-2*$DAY,$NOW-2*$DAY,71,1),
       ('a3','u1','026','checkpoint',1,'graded',$NOW-1*$DAY,$NOW-1*$DAY,$NOW-1*$DAY,58,0);
INSERT INTO mistake_tags (id,attempt_id,user_id,code,created_at) VALUES
  ('m1','a1','u1','SIZ-02',$NOW-3*$DAY), ('m2','a3','u1','SIZ-02',$NOW-1*$DAY),
  ('m3','a2','u1','TRE-02',$NOW-2*$DAY), ('m4','a3','u1','SIZ-02',$NOW-1*$DAY);
-- a1 reviewed, a2 not
INSERT INTO mistake_reviews VALUES ('a1','u1','Viết lại dòng 3: đổi đơn vị sang triệu hộ',$NOW-2*$DAY);
-- evidence for S05: old strong case, recent weak live; S06: 60 days old only
INSERT INTO skill_evidence VALUES
  ('e1','u1','S05','a1','case',80,$NOW-10*$DAY),
  ('e2','u1','S05','a2','deliverable',70,$NOW-5*$DAY),
  ('e3','u1','S05','a3','live',40,$NOW-1*$DAY),
  ('e4','u1','S05','a3','framework',100,$NOW-30*$DAY),
  ('e5','u1','S06','a1','case',90,$NOW-60*$DAY);
EOF

run() { sqlite3 -bail -header -column $DB "$1"; }
q() { awk -v n="$1" '$0 ~ "-- name: "n {f=1; next} f && /^-- name:|^-- [GR][0-9]/ {exit} f' queries/gates.sql | sed "s/?1/'u1'/g; s/?2/'mini_case'/g; s/?3/$NOW/g"; }
sub() { q "$1" | sed 's/;[[:space:]]*$//'; }
check() { got=$(sqlite3 -bail $DB "$2"); if [ "$got" = "$3" ]; then echo "  ok  $1 = $got"; else echo "  FAIL $1: got '$got' want '$3'"; exit 1; fi; }

echo "== gate queries"
check "G1 pending reviews for mini_case" "SELECT group_concat(id) FROM ($(sub pending_reviews));" "a2"
# a clean pass of the same kind must not create a pending review
sqlite3 -bail $DB "INSERT INTO attempts (id,user_id,lesson_id,lesson_kind,content_version,status,started_at,submitted_at,graded_at,final_score,passed) VALUES ('a4','u1','019','mini_case',1,'graded',$NOW-4*$DAY,$NOW-4*$DAY,$NOW-4*$DAY,95,1);"
check "G1 clean pass needs no review" "SELECT group_concat(id) FROM ($(sub pending_reviews));" "a2"
check "G2 remediation trigger"           "SELECT code||':'||hits FROM ($(sub remediation_triggers));" "SIZ-02:2"
# after a completed remediation for SIZ-02, the old tags must not re-trigger it
sqlite3 -bail $DB "INSERT INTO remediation_assignments (id,user_id,code,lesson_id,blocks_kind,reps_required,reps_done,status,triggered_at,completed_at) VALUES ('rd','u1','SIZ-02','015','drill',2,2,'done',$NOW-12*3600*1000,$NOW-3600*1000);"
check "G2 no re-trigger after completed remediation" "SELECT count(*) FROM ($(sub remediation_triggers));" "0"
sqlite3 -bail $DB "DELETE FROM remediation_assignments WHERE id='rd';"
sqlite3 -bail $DB "$(q readiness_recompute)"
# S05: last 3 = live 40 (w25), deliverable 70 (w25), case 80 (w40); framework row is 4th oldest, dropped
#      (40*25 + 70*25 + 80*40) / 90 = 66.1 -> 66, evidence 1 day old -> no decay
check "R1 S05 raw/score" "SELECT raw_score||'/'||score FROM readiness WHERE skill_id='S05';" "66/66"
# S06: one case row of 90, 60 days old -> 18 days past 42 -> 90 * 0.82 = 73.8 -> 74
check "R1 S06 raw/score" "SELECT raw_score||'/'||score FROM readiness WHERE skill_id='S06';" "90/74"
# re-running must upsert, not duplicate
sqlite3 -bail $DB "$(q readiness_recompute)"
check "R1 idempotent upsert" "SELECT count(*) FROM readiness;" "2"
# decay floor: 400 days later S06 must stop at 60% of raw
LATER=$((NOW + 400*DAY))
sqlite3 -bail $DB "$(awk '$0 ~ "-- name: readiness_decay_page" {f=1; next} f' queries/gates.sql | sed "s/?1/$LATER/g; s/?2/''/g; s/?3/500/g")"
check "R2 decay floor at 60%" "SELECT score FROM readiness WHERE skill_id='S06';" "54"

echo "== constraint checks (each must be rejected)"
reject() { if sqlite3 -bail $DB "PRAGMA foreign_keys=ON; $2" 2>/dev/null; then echo "  FAIL (accepted): $1"; exit 1; else echo "  ok  rejected: $1"; fi; }
reject "grade level 4 without evidence" \
  "INSERT INTO grades VALUES ('g1','a1',NULL,'auto','R1',70,1,$NOW); INSERT INTO grade_criteria VALUES ('g1','R1.quant','S06',4,20,NULL);"
reject "second final grade on same attempt" \
  "INSERT INTO grades VALUES ('g2','a2',NULL,'auto','R1',70,1,$NOW); INSERT INTO grades VALUES ('g3','a2',NULL,'auto','R1',72,1,$NOW);"
reject "peer grade without grader" \
  "INSERT INTO grades VALUES ('g4','a2',NULL,'peer','R1',70,0,$NOW);"
reject "locked lesson without reason" \
  "INSERT INTO lesson_progress (user_id,lesson_id,status,updated_at) VALUES ('u1','037','locked',$NOW);"
reject "graded attempt without score" \
  "INSERT INTO attempts (id,user_id,lesson_id,lesson_kind,content_version,status,started_at) VALUES ('a9','u1','037','full_case',1,'graded',$NOW);"
reject "artifact with both r2 key and stream uid" \
  "INSERT INTO attempt_artifacts VALUES ('f1','a1','recording','k','uid','video/mp4',1,$NOW);"
reject "two active remediations for same code" \
  "INSERT INTO remediation_assignments (id,user_id,code,lesson_id,blocks_kind,reps_required,triggered_at) VALUES ('r1','u1','SIZ-02','021','mini_case',3,$NOW),('r2','u1','SIZ-02','021','mini_case',3,$NOW);"
reject "asking for the same case item twice in one attempt" \
  "INSERT INTO attempt_reveals VALUES ('a1','C-019.r2',$NOW),('a1','C-019.r2',$NOW);"
reject "empty mistake review" \
  "INSERT INTO mistake_reviews VALUES ('a2','u1','   ',$NOW);"

CDB=/tmp/bc_content_test.db; rm -f $CDB
for f in migrations/content/*.sql; do sqlite3 -bail $CDB "PRAGMA foreign_keys=ON;" ".read $f"; done
sqlite3 -bail $CDB "PRAGMA foreign_keys=ON;
 INSERT INTO tracks VALUES ('B','Quantitative','role',2);
 INSERT INTO modules (id,track_id,title,level_min,level_max,outcome,est_minutes) VALUES ('B2','B','Market Sizing',1,2,'Sizing 8 phút',420);
 INSERT INTO lessons (id,module_id,title,kind,level,est_minutes,output_spec) VALUES ('021','B2','6 thị trường lạ','drill',2,45,'6 bảng sizing');"
DB=$CDB
reject "publish case with fewer than 3 pilot runs" \
  "INSERT INTO cases (id,lesson_id,title,industry,context,question,duration_min,status,pilot_runs) VALUES ('C-021','021','t','i','c','q',8,'published',1);"
reject "lesson without output spec" \
  "INSERT INTO lessons (id,module_id,title,kind,level,est_minutes,output_spec) VALUES ('022','B2','x','drill',1,10,'  ');"
reject "mistake code whose prefix differs from its group" \
  "INSERT INTO mistake_codes (code,group_code,title,symptom,root_cause) VALUES ('SIZ-02','QNT','t','s','r');"
reject "gates_module outside 0/1" \
  "INSERT INTO lessons (id,module_id,title,kind,level,est_minutes,output_spec,gates_module) VALUES ('023','B2','x','drill',1,10,'y',2);"
reject "bad skill id" \
  "INSERT INTO skills VALUES ('X1','n','d',1);"
echo "ALL CHECKS PASSED"
