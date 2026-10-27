-- Add independent course progress and access policy support without opening any course.
CREATE TABLE workshop_course_progress_next (
  code_id TEXT NOT NULL REFERENCES workshop_codes(id) ON DELETE CASCADE,
  course_id TEXT NOT NULL CHECK (course_id IN ('phoenix', 'five-levels', 'clever-rat', 'master-frame', 'directors-framework', 'fight-scenes', 'ai-cinema-workflow', 'visual-effects')),
  completed TEXT NOT NULL DEFAULT '[]',
  current_module TEXT NOT NULL DEFAULT 'story',
  PRIMARY KEY (code_id, course_id)
);
INSERT INTO workshop_course_progress_next (code_id, course_id, completed, current_module)
  SELECT code_id, course_id, completed, current_module FROM workshop_course_progress;
DROP TABLE workshop_course_progress;
ALTER TABLE workshop_course_progress_next RENAME TO workshop_course_progress;

CREATE TABLE workshop_access_next (
  course_id TEXT PRIMARY KEY CHECK (course_id IN ('clever-rat', 'five-levels', 'master-frame', 'directors-framework', 'fight-scenes', 'ai-cinema-workflow', 'visual-effects')),
  mode TEXT NOT NULL CHECK (mode IN ('protected', 'public', 'partial')),
  public_lessons TEXT NOT NULL DEFAULT '[]',
  updated_by TEXT NOT NULL,
  updated_at INTEGER NOT NULL
);
INSERT INTO workshop_access_next (course_id, mode, public_lessons, updated_by, updated_at)
  SELECT course_id, mode, public_lessons, updated_by, updated_at FROM workshop_access;
DROP TABLE workshop_access;
ALTER TABLE workshop_access_next RENAME TO workshop_access;
-- No policy row is inserted: the new workshop remains protected by default.
