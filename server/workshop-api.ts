import type { D1Database } from '@cloudflare/workers-types';
import type { PipelineId } from '../content/pipeline';
import type { WorkshopProgress } from '../content/workshop/types';
import { workshopCurriculum } from './workshop-content';
import { workshopMedia } from './workshop-media';

import { normalizeEmail, loginCodeHash, newLoginCode, sendLoginCode, workshopEmailDefaults } from './workshop-email';
export interface WorkshopEnv { ASSETS?: { fetch(request: Request): Promise<Response> }; WORKSHOP_DB?: D1Database; WORKSHOP_LOGIN_SECRET?: string; RESEND_API_KEY?: string; WORKSHOP_EMAIL_FROM?: string; WORKSHOP_EMAIL_REPLY_TO?: string }
const COOKIE = 'genyz_workshop';
const SESSION_SECONDS = 7 * 24 * 60 * 60;
const WINDOW_SECONDS = 15 * 60;
const MAX_ATTEMPTS = 10;
const MAX_BODY = 4096;
interface AccessRow { id: string; expires_at: number; completed: string; current_module: string; session_expires: number }

export async function digest(value: string) {
  return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value))), byte => byte.toString(16).padStart(2, '0')).join('');
}
export const normalizeCode = (code: string) => code.trim().toUpperCase();
function response(body: unknown, status = 200, headers: Record<string, string> = {}) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'private, no-store', 'Vary': 'Cookie', 'X-Content-Type-Options': 'nosniff', ...headers } });
}
function cookie(request: Request, token: string, seconds: number) {
  const secure = new URL(request.url).protocol === 'https:' ? '; Secure' : '';
  return `${COOKIE}=${token}; Path=/api/workshop; HttpOnly; SameSite=Strict; Max-Age=${seconds}${secure}`;
}
function sessionToken(request: Request) {
  const value = request.headers.get('Cookie')?.split(';').map(part => part.trim()).find(part => part.startsWith(`${COOKIE}=`))?.slice(COOKIE.length + 1);
  return value && /^[a-f0-9]{64}$/.test(value) ? value : undefined;
}
async function readBody(request: Request): Promise<unknown> {
  if (!request.headers.get('Content-Type')?.startsWith('application/json')) throw new Error('body');
  const reader = request.body?.getReader();
  if (!reader) throw new Error('body');
  let size = 0;
  let text = '';
  const decoder = new TextDecoder();
  try {
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY) { await reader.cancel(); throw new Error('body'); }
      text += decoder.decode(value, { stream: true });
    }
    return JSON.parse(text + decoder.decode());
  } finally { reader.releaseLock(); }
}
function isProgress(value: unknown, pipelineIds: PipelineId[]): value is WorkshopProgress {
  if (!value || typeof value !== 'object') return false;
  const data = value as WorkshopProgress;
  return pipelineIds.includes(data.current) && Array.isArray(data.completed) && data.completed.length <= pipelineIds.length &&
    data.completed.every(id => pipelineIds.includes(id)) && new Set(data.completed).size === data.completed.length;
}
async function access(request: Request, db: D1Database, now: number) {
  const token = sessionToken(request);
  if (!token) return null;
  return db.prepare(`SELECT c.id, c.expires_at, c.completed, c.current_module, s.expires_at AS session_expires
    FROM workshop_sessions s JOIN workshop_codes c ON c.id = s.code_id
    WHERE s.token_hash = ?1 AND s.expires_at > ?2 AND c.expires_at > ?2 AND c.revoked = 0 AND c.email IS NOT NULL`)
    .bind(await digest(token), now).first<AccessRow>();
}

export async function handleWorkshop(request: Request, env: WorkshopEnv, send: typeof fetch = fetch): Promise<Response> {
  const locale = new URL(request.url).searchParams.get('locale') === 'en' ? 'en' : 'vi';
  const message = (vi: string, en: string) => locale === 'en' ? en : vi;
  const requestedCourse = new URL(request.url).searchParams.get('course');
  const course = !requestedCourse || requestedCourse === 'boat' ? 'clever-rat' : requestedCourse;
  if (course !== 'clever-rat' && course !== 'five-levels' && course !== 'master-frame' && course !== 'directors-framework' && course !== 'fight-scenes') return response({ error: message('Không tìm thấy workshop.', 'Workshop not found.') }, 404);
  const pathname = new URL(request.url).pathname;
  const exampleType = Object.hasOwn(workshopMedia, pathname) ? workshopMedia[pathname] : undefined;
  const examplePath = Boolean(exampleType);
  const route = examplePath ? 'example' : pathname.replace(/\/$/, '').split('/').pop();
  const allowed: Record<string, string> = { 'request-code': 'POST', login: 'POST', logout: 'POST', content: 'GET', progress: 'PUT', example: 'GET' };
  if (!route || !allowed[route]) return response({ error: message("Không tìm thấy.", "Not found.") }, 404);
  if (request.method !== allowed[route]) return response({ error: message("Phương thức không được hỗ trợ.", "Method not allowed.") }, 405, { Allow: allowed[route] });
  if (request.method !== 'GET' && request.headers.get('Origin') !== new URL(request.url).origin) return response({ error: message("Yêu cầu không hợp lệ.", "Invalid request.") }, 403);
  const db = env.WORKSHOP_DB;
  if (!db) return response({ error: message("Lớp học chưa sẵn sàng. Vui lòng liên hệ GenYZ Studio.", "The classroom is not ready. Please contact GenYZ Studio.") }, 503);
  const now = Math.floor(Date.now() / 1000);
  try {
    if (route === 'login' || route === 'request-code') {
      // Cloudflare sets CF-Connecting-IP. Local requests share a development bucket.
      const ipHash = await digest(`workshop:${route}:${request.headers.get('CF-Connecting-IP') || 'local'}:${Math.floor(now / WINDOW_SECONDS)}`);
      const count = await db.prepare(`INSERT INTO workshop_login_limits(ip_hash, window_start, attempts) VALUES (?1, ?2, 1)
        ON CONFLICT(ip_hash) DO UPDATE SET attempts = attempts + 1 RETURNING attempts`)
        .bind(ipHash, now).first<{ attempts: number }>();
      if (!count || count.attempts > MAX_ATTEMPTS) return response({ error: message("Bạn đã thử nhiều lần. Vui lòng đợi 15 phút rồi thử lại.", "Too many attempts. Please wait 15 minutes and try again.") }, 429, { 'Retry-After': String(WINDOW_SECONDS) });
      await db.prepare('DELETE FROM workshop_login_limits WHERE window_start < ?1').bind(now - WINDOW_SECONDS * 2).run();
      await db.prepare('DELETE FROM workshop_login_codes WHERE expires_at <= ?1').bind(now).run();
      let body: unknown;
      try { body = await readBody(request); } catch { return response({ error: message("Vui lòng nhập mã truy cập hợp lệ.", "Please enter a valid access code.") }, 400); }
      const fields = body && typeof body === 'object' ? body as Record<string, unknown> : {};
      const email = normalizeEmail(fields.email);
      if (!email) return response({ error: message('Vui lòng nhập email hợp lệ.', 'Please enter a valid email.') }, 400);
      const secret = env.WORKSHOP_LOGIN_SECRET;
      if (!secret || secret.length < 32 || !env.RESEND_API_KEY) return response({ error: message('Đăng nhập email chưa sẵn sàng. Vui lòng liên hệ GenYZ.', 'Email login is not configured. Please contact GenYZ.') }, 503);
      if (route === 'request-code') {
        const generic = () => response({ ok: true, message: message('Nếu email này có quyền học, chúng tôi đã gửi mã. Kiểm tra cả thư rác.', 'If this email has workshop access, we have sent a code. Check your spam folder too.') });
        // Apply identical email throttling to registered and unknown addresses.
        const emailBucket = await digest(`request-email:${email}:${Math.floor(now / 60)}`);
        const limit = await db.prepare(`INSERT INTO workshop_login_limits(ip_hash, window_start, attempts) VALUES (?1, ?2, 1)
          ON CONFLICT(ip_hash) DO UPDATE SET attempts = attempts + 1 RETURNING attempts`).bind(emailBucket, now).first<{ attempts: number }>();
        if (!limit || limit.attempts > 1) return generic();
        const learner = await db.prepare('SELECT id FROM workshop_codes WHERE email = ?1 AND revoked = 0 AND expires_at > ?2').bind(email, now).first();
        if (!learner) return generic();
        const code = newLoginCode();
        const hash = await loginCodeHash(email, code, secret);
        // Resends rotate the code without resetting an active challenge’s guess budget or expiry.
        const inserted = await db.prepare(`INSERT INTO workshop_login_codes(email, code_hash, expires_at, attempts, created_at) VALUES (?1, ?2, ?3, 0, ?4)
          ON CONFLICT(email) DO UPDATE SET code_hash=excluded.code_hash, expires_at=CASE WHEN workshop_login_codes.expires_at <= ?4 THEN excluded.expires_at ELSE workshop_login_codes.expires_at END,
          attempts=CASE WHEN workshop_login_codes.expires_at <= ?4 THEN 0 ELSE workshop_login_codes.attempts END, created_at=excluded.created_at
          WHERE workshop_login_codes.expires_at <= ?4 OR (workshop_login_codes.attempts < 5 AND workshop_login_codes.created_at <= ?4 - 60) RETURNING email`).bind(email, hash, now + 600, now).first();
        if (!inserted) return generic();
        try { await sendLoginCode(email, code, locale, env.RESEND_API_KEY, env.WORKSHOP_EMAIL_FROM || workshopEmailDefaults.from, send, env.WORKSHOP_EMAIL_REPLY_TO || workshopEmailDefaults.replyTo); }
        catch {
          await db.prepare('DELETE FROM workshop_login_codes WHERE email = ?1 AND code_hash = ?2').bind(email, hash).run();
          // Do not expose whether an address is registered through delivery errors.
          console.error('Workshop email delivery failed');
        }
        return generic();
      }
      const code = typeof fields.code === 'string' ? fields.code.trim() : '';
      const invalid = () => response({ error: message('Email hoặc mã không đúng, đã dùng hoặc hết hạn.', 'The email or code is incorrect, already used, or expired.') }, 401);
      if (!/^\d{6}$/.test(code)) return invalid();
      const attempt = await db.prepare(`UPDATE workshop_login_codes SET attempts = attempts + 1
        WHERE email = ?1 AND expires_at > ?2 AND attempts < 5 RETURNING code_hash`).bind(email, now).first<{ code_hash: string }>();
      if (!attempt) return invalid();
      const hash = await loginCodeHash(email, code, secret);
      if (attempt.code_hash !== hash) return invalid();
      // DELETE RETURNING consumes the challenge atomically, even for concurrent submissions.
      const consumed = await db.prepare('DELETE FROM workshop_login_codes WHERE email = ?1 AND code_hash = ?2 AND expires_at > ?3 RETURNING email').bind(email, hash, now).first();
      if (!consumed) return invalid();
      const row = await db.prepare('SELECT id, expires_at FROM workshop_codes WHERE email = ?1 AND revoked = 0 AND expires_at > ?2').bind(email, now).first<{ id: string; expires_at: number }>();
      if (!row) return invalid();
      const token = Array.from(crypto.getRandomValues(new Uint8Array(32)), byte => byte.toString(16).padStart(2, '0')).join('');
      const seconds = Math.min(SESSION_SECONDS, row.expires_at - now);
      const oldToken = sessionToken(request);
      await db.batch([
        db.prepare('DELETE FROM workshop_sessions WHERE expires_at <= ?1 OR token_hash = ?2').bind(now, oldToken ? await digest(oldToken) : ''),
        db.prepare('DELETE FROM workshop_login_limits WHERE window_start < ?1').bind(now - WINDOW_SECONDS * 2),
        db.prepare('INSERT INTO workshop_sessions(token_hash, code_id, expires_at) VALUES (?1, ?2, ?3)').bind(await digest(token), row.id, now + seconds),
      ]);
      return response({ ok: true }, 200, { 'Set-Cookie': cookie(request, token, seconds) });
    }
    if (route === 'logout') {
      const token = sessionToken(request);
      if (token) await db.prepare('DELETE FROM workshop_sessions WHERE token_hash = ?1').bind(await digest(token)).run();
      return response({ ok: true }, 200, { 'Set-Cookie': cookie(request, '', 0) });
    }
    const user = await access(request, db, now);
    if (!user) return response({ error: message("Vui lòng nhập mã để vào học.", "Please enter your code to access the classroom.") }, 401, { 'Set-Cookie': cookie(request, '', 0) });
    if (route === 'example') {
      if (!examplePath) return response({ error: 'Not found.' }, 404);
      if (!env.ASSETS) return response({ error: 'Example unavailable.' }, 503);
      // Preserve byte ranges for seeking, but never forward cookies to static assets.
      const range = request.headers.get('Range');
      const asset = await env.ASSETS.fetch(new Request(new URL(pathname, request.url), { method: 'GET', headers: range ? { Range: range } : {} }));
      const headers = new Headers({ 'Cache-Control': 'private, no-store', 'Vary': 'Cookie', 'X-Content-Type-Options': 'nosniff' });
      if (asset.status === 416) {
        const contentRange = asset.headers.get('Content-Range');
        if (contentRange) headers.set('Content-Range', contentRange);
        return new Response(null, { status: 416, headers });
      }
      if (![200, 206].includes(asset.status) || asset.headers.get('Content-Type')?.split(';')[0].trim() !== exampleType) return response({ error: 'Example unavailable.' }, 503);
      headers.set('Content-Type', exampleType!);
      for (const name of ['Content-Length', 'Content-Range', 'Accept-Ranges']) {
        const value = asset.headers.get(name); if (value) headers.set(name, value);
      }
      return new Response(asset.body, { status: asset.status, headers });
    }
    if (route === 'content') {
      const saved = await db.prepare('SELECT completed, current_module FROM workshop_course_progress WHERE code_id = ?1 AND course_id = ?2').bind(user.id, course).first<{completed: string; current_module: string}>();
      return response({ ...workshopCurriculum(locale, course), progress: { completed: JSON.parse(saved?.completed || '[]'), current: saved?.current_module || 'story' }, sessionExpiresAt: Math.min(user.session_expires, user.expires_at) * 1000 });
    }
    let body: unknown;
    try { body = await readBody(request); } catch { return response({ error: message("Dữ liệu tiến độ không hợp lệ.", "Invalid progress data.") }, 400); }
    if (!isProgress(body, workshopCurriculum(locale, course).syllabus.map(item => item.id))) return response({ error: message("Dữ liệu tiến độ không hợp lệ.", "Invalid progress data.") }, 400);
    await db.prepare(`INSERT INTO workshop_course_progress(code_id, course_id, completed, current_module) VALUES (?1, ?2, ?3, ?4)
      ON CONFLICT(code_id, course_id) DO UPDATE SET completed = excluded.completed, current_module = excluded.current_module`).bind(user.id, course, JSON.stringify(body.completed), body.current).run();
    return response({ ok: true });
  } catch {
    // Never expose database details, codes, cookies or content on an error path.
    return response({ error: message("Chưa kết nối được lớp học. Vui lòng thử lại sau.", "Cannot connect to the classroom. Please try again later.") }, 503);
  }
}
