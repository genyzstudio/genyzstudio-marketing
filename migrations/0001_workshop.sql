CREATE TABLE IF NOT EXISTS workshop_codes (
  id TEXT PRIMARY KEY,
  code_hash TEXT NOT NULL UNIQUE,
  created_at INTEGER NOT NULL,
  expires_at INTEGER NOT NULL,
  revoked INTEGER NOT NULL DEFAULT 0 CHECK (revoked IN (0, 1)),
  completed TEXT NOT NULL DEFAULT '[]',
  current_module TEXT NOT NULL DEFAULT 'story'
);
CREATE TABLE IF NOT EXISTS workshop_sessions (
  token_hash TEXT PRIMARY KEY,
  code_id TEXT NOT NULL REFERENCES workshop_codes(id) ON DELETE CASCADE,
  expires_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS workshop_sessions_expiry ON workshop_sessions(expires_at);
CREATE TABLE IF NOT EXISTS workshop_login_limits (
  ip_hash TEXT PRIMARY KEY,
  window_start INTEGER NOT NULL,
  attempts INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS workshop_login_window ON workshop_login_limits(window_start);
