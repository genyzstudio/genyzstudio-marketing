import { loginCodeEmail } from './workshop-email-template';

export const workshopEmailDefaults = { from: "GenYZ Studio <workshop@genyzstudio.com>", replyTo: "genyzstudio@gmail.com" };

export const normalizeEmail = (value: unknown): string | null => {
  if (typeof value !== 'string') return null;
  const email = value.trim().toLowerCase();
  return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null;
};
export async function loginCodeHash(email: string, code: string, secret: string) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(`${email}:${code}`));
  return Array.from(new Uint8Array(signature), byte => byte.toString(16).padStart(2, '0')).join('');
}
export function newLoginCode() {
  // Rejection sampling avoids modulo bias.
  const values = new Uint32Array(1);
  do { crypto.getRandomValues(values); } while (values[0] >= 4294000000);
  return String(values[0] % 1000000).padStart(6, '0');
}
export async function sendLoginCode(email: string, code: string, locale: string, apiKey: string, from: string, send: typeof fetch = fetch, replyTo = workshopEmailDefaults.replyTo) {
  const result = await send('https://api.resend.com/emails', {
    method: 'POST', signal: AbortSignal.timeout(10000),
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, reply_to: replyTo, to: [email], ...loginCodeEmail(code, locale) }),
  });
  if (!result.ok) throw new Error('Email delivery failed');
}
