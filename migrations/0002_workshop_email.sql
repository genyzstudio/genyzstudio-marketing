-- Existing anonymous codes cannot authenticate after the email login rollout.
ALTER TABLE workshop_codes ADD COLUMN email TEXT;
ALTER TABLE workshop_codes ADD COLUMN payment_reference TEXT;
CREATE UNIQUE INDEX workshop_email ON workshop_codes(email) WHERE email IS NOT NULL;
CREATE TABLE workshop_login_codes (
  email TEXT PRIMARY KEY,
  code_hash TEXT NOT NULL,
  expires_at INTEGER NOT NULL,
  attempts INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL
);
DELETE FROM workshop_sessions;
