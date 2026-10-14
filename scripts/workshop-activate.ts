import { randomBytes, randomUUID } from 'node:crypto';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { normalizeEmail } from '../server/workshop-email';
const arg = (name: string) => process.argv.find(value => value.startsWith(`--${name}=`))?.slice(name.length + 3);
const email = normalizeEmail(arg('email'));
const reference = arg('payment-reference');
const days = Number(arg('days') || 90);
if (!email || !reference || reference.length > 200 || !Number.isInteger(days) || days < 1 || days > 3650) throw new Error('Required: --email=learner@example.com --payment-reference=manual-receipt-id [--days=90]');
const quote = (value: string) => `'${value.replaceAll("'", "''")}'`;
const now = Math.floor(Date.now() / 1000);
const id = randomUUID();
const folder = resolve('artifacts/workshop-access');
mkdirSync(folder, { recursive: true, mode: 0o700 });
// The legacy hash is deliberately random and cannot be used for authentication.
const sql = `INSERT INTO workshop_codes(id, code_hash, created_at, expires_at, email, payment_reference) VALUES (${quote(id)}, ${quote(randomBytes(32).toString('hex'))}, ${now}, ${now + days * 86400}, ${quote(email)}, ${quote(reference)})\nON CONFLICT(email) WHERE email IS NOT NULL DO UPDATE SET expires_at=MAX(workshop_codes.expires_at, excluded.expires_at), revoked=0, payment_reference=excluded.payment_reference;\n`;
const path = `${folder}/${id}.sql`;
writeFileSync(path, sql, { mode: 0o600, flag: 'wx' });
console.log(`Prepared private activation SQL: ${path}. Review and import into D1 after confirming payment. No database changes made.`);
