-- The lesson(s) that decide whether a module is passed. "Checkpoint" is a role, not only a kind:
-- module D1's checkpoint is the 24-hour team simulation (kind team_sim).
ALTER TABLE lessons ADD COLUMN gates_module INTEGER NOT NULL DEFAULT 0 CHECK (gates_module IN (0, 1));
UPDATE lessons SET gates_module = 1 WHERE kind = 'checkpoint';
CREATE INDEX idx_lessons_gates_module ON lessons(module_id) WHERE gates_module = 1;
