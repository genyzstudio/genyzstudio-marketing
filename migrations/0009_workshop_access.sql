-- Missing policies remain fully protected. No existing workshop is opened by migration.
CREATE TABLE workshop_access (
  course_id TEXT PRIMARY KEY CHECK (course_id IN ('clever-rat', 'five-levels', 'master-frame', 'directors-framework', 'fight-scenes')),
  mode TEXT NOT NULL CHECK (mode IN ('protected', 'public', 'partial')),
  public_lessons TEXT NOT NULL DEFAULT '[]',
  updated_by TEXT NOT NULL,
  updated_at INTEGER NOT NULL
);
