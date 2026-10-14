CREATE TABLE workshop_course_progress (
  code_id TEXT NOT NULL REFERENCES workshop_codes(id) ON DELETE CASCADE,
  course_id TEXT NOT NULL CHECK (course_id IN ('phoenix')),
  completed TEXT NOT NULL DEFAULT '[]',
  current_module TEXT NOT NULL DEFAULT 'story',
  PRIMARY KEY (code_id, course_id)
);
