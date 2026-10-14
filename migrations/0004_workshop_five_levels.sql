-- Expand the course allowlist while preserving retired Phoenix progress.
CREATE TABLE workshop_course_progress_next (
  code_id TEXT NOT NULL REFERENCES workshop_codes(id) ON DELETE CASCADE,
  course_id TEXT NOT NULL CHECK (course_id IN ('phoenix', 'five-levels')),
  completed TEXT NOT NULL DEFAULT '[]',
  current_module TEXT NOT NULL DEFAULT 'story',
  PRIMARY KEY (code_id, course_id)
);
INSERT INTO workshop_course_progress_next SELECT * FROM workshop_course_progress;
DROP TABLE workshop_course_progress;
ALTER TABLE workshop_course_progress_next RENAME TO workshop_course_progress;
