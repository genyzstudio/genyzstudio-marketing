import fightDemos from '../server/workshop-fight-demos.json';
import directorRuns from '../server/workshop-director-test-results.json';
import type { WorkshopProgress } from '../content/workshop/types';
import { formatWorkshopWorkbook } from '../content/workshop/workbook';
import { workshopCurriculum } from '../server/workshop-content';
import { loginCodeEmail } from '../server/workshop-email-template';
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync, existsSync } from 'node:fs';
import { renderToStaticMarkup } from 'react-dom/server';
import type { D1Database } from '@cloudflare/workers-types';
import { StepMedia, StepPrompt, WorkshopClassroom, WorkshopVisualExamples } from '../components/workshop-classroom';
import { workshopMedia } from '../server/workshop-media';
import { WorkshopImage } from '../components/workshop-image';
import { workshopImagePreview } from '../content/workshop/image-preview';
import sharp from 'sharp';
import { handleWorkshop, digest, type WorkshopEnv } from '../server/workshop-api';
import { workshopLessons } from '../server/workshop-lessons';
import { workshopSyllabus } from '../server/workshop-syllabus';
import { loginCodeHash, sendLoginCode, workshopEmailDefaults } from '../server/workshop-email';
import { pipelineIds } from '../content/pipeline';

const origin = 'https://workshop.test';
test('workshop previews are smaller responsive images behind the same authentication', async () => {
  for (const [src, type] of Object.entries(workshopMedia)) {
    if (type !== 'image/png') continue;
    const original = readFileSync(`public${src}`);
    const metadata = await sharp(original).metadata();
    for (const size of [480, 1280]) {
      const preview = workshopImagePreview(src, size);
      assert.equal(workshopMedia[preview], 'image/webp');
      const bytes = readFileSync(`public${preview}`);
      const info = await sharp(bytes).metadata();
      assert.equal(info.width, Math.min(size, metadata.width!));
      assert.ok(Math.abs(info.width! / info.height! - metadata.width! / metadata.height!) < 0.02);
      assert.ok(bytes.length < original.length / 3, preview);
    }
  }
  const html = renderToStaticMarkup(<WorkshopImage src="/api/workshop/examples/repairer-front-vi-v1.png" alt="Portrait" width={1145} height={1374} sizes="100vw" />);
  assert.ok(html.includes('preview-480.webp 480w'));
  assert.ok(html.includes('preview-1280.webp 1145w'));
  assert.ok(html.includes('loading="lazy"'));
  assert.ok(html.includes('src="/api/workshop/examples/repairer-front-vi-v1.png"')); // PNG fallback for browsers without WebP.
  const f = await fixture();
  let fetched = false;
  f.env.ASSETS = { async fetch() { fetched = true; return new Response(new Uint8Array([82, 73, 70, 70]), { headers: { 'Content-Type': 'image/webp' } }); } };
  const route = 'examples/repairer-front-vi-v1-preview-480.webp';
  assert.equal((await f.request(route)).status, 401);
  assert.equal(fetched, false);
  const cookie = await f.login();
  const result = await f.request(route, 'GET', undefined, cookie);
  assert.equal(result.status, 200);
  assert.equal(result.headers.get('Content-Type'), 'image/webp');
  assert.equal(result.headers.get('Cache-Control'), 'private, no-store');
  f.sql.exec('UPDATE workshop_codes SET revoked=1');
  assert.equal((await f.request(route, 'GET', undefined, cookie)).status, 401);
});
const code = '123456';
const email = 'learner@example.test';
const secret = 'test-only-secret-not-for-production-123456789';
async function fixture() {
  const sql = new DatabaseSync(':memory:');
  sql.exec(readFileSync('migrations/0001_workshop.sql', 'utf8'));
  sql.exec(readFileSync('migrations/0002_workshop_email.sql', 'utf8'));
  sql.exec(readFileSync('migrations/0003_workshop_courses.sql', 'utf8'));
  sql.exec(readFileSync('migrations/0004_workshop_five_levels.sql', 'utf8'));
  sql.exec(readFileSync('migrations/0005_workshop_clever_rat.sql', 'utf8'));
  sql.exec(readFileSync('migrations/0006_workshop_master_frame.sql', 'utf8'));
  sql.exec(readFileSync('migrations/0007_workshop_directors_framework.sql', 'utf8'));
  sql.exec(readFileSync('migrations/0008_workshop_fight_scenes.sql', 'utf8'));
  const now = Math.floor(Date.now() / 1000);
  sql.prepare('INSERT INTO workshop_codes(id, code_hash, created_at, expires_at) VALUES (?, ?, ?, ?)').run('learner-one', await digest(code), now, now + 86400);
  // Numbered placeholders repeat in the access query, so bind by number in the SQLite adapter.
  const d1Prepare = (query: string) => {
    let args: unknown[] = [];
    const run = (read: boolean) => {
      const ordered: (string | number)[] = [];
      const positional = query.replace(/\?(\d+)/g, (_, index) => { ordered.push(args[Number(index) - 1] as string | number); return '?'; });
      return read ? sql.prepare(positional).get(...ordered) || null : sql.prepare(positional).run(...ordered);
    };
    const statement = { bind(...values: unknown[]) { args = values; return statement; }, async first() { return run(true); }, async run() { return run(false); } };
    return statement;
  };
  const db = { prepare: d1Prepare, async batch(statements: ReturnType<typeof d1Prepare>[]) { sql.exec('BEGIN'); try { const result = []; for (const statement of statements) result.push(await statement.run()); sql.exec('COMMIT'); return result; } catch (err) { sql.exec('ROLLBACK'); throw err; } } } as unknown as D1Database;
  sql.prepare('UPDATE workshop_codes SET email = ?').run(email);
  const env: WorkshopEnv = { WORKSHOP_DB: db, WORKSHOP_LOGIN_SECRET: secret, RESEND_API_KEY: 'test-only', WORKSHOP_EMAIL_FROM: 'workshop@example.test' };
  const sent: {to: string[]; text: string}[] = [];
  const mailer = (async (_url: unknown, options: RequestInit) => { sent.push(JSON.parse(String(options.body))); return Response.json({id: 'test-message'}); }) as typeof fetch;
  const seed = async () => { sql.prepare('INSERT OR REPLACE INTO workshop_login_codes(email, code_hash, expires_at, attempts, created_at) VALUES (?, ?, ?, 0, ?)').run(email, await loginCodeHash(email, code, secret), now + 600, now); };
  await seed();
  const request = (route: string, method = 'GET', body?: unknown, cookie?: string, extra: Record<string, string> = {}) => handleWorkshop(new Request(`${origin}/api/workshop/${route}`, { method, headers: { Origin: origin, 'Content-Type': 'application/json', ...(cookie ? { Cookie: cookie } : {}), ...extra }, ...(body === undefined ? {} : { body: JSON.stringify(body) }) }), env, mailer);
  const login = async () => { await seed(); const result = await request('login', 'POST', { email, code }); assert.equal(result.status, 200); return result.headers.get('Set-Cookie')!.split(';')[0]; };
  return { sql, env, request, login, sent };
}

test('curriculum follows all nine pipeline modules with actionable prompts and real example assets', () => {
  assert.deepEqual(workshopSyllabus.map(module => module.id), [...pipelineIds]);
  assert.deepEqual(workshopLessons.map(lesson => lesson.id), [...pipelineIds]);
  for (const lesson of workshopLessons) {
    assert.ok(lesson.steps.length >= 3);
    assert.ok(lesson.steps.some(step => step.prompt && step.prompt.length > 80));
    assert.ok(lesson.steps.every(step => step.instruction && step.tool && step.save));
    assert.ok(lesson.checks.length >= 3 && lesson.troubleshooting.length > 0);
    for (const asset of [lesson.example.image, lesson.example.video, lesson.example.poster, lesson.example.audio]) if (asset) assert.ok(existsSync(`public${asset}`), asset);
  }
});
test('public classroom renders only login, never syllabus, preparation or prompts', () => {
  const html = renderToStaticMarkup(<WorkshopClassroom />);
  assert.match(html, /Email/);
  assert.ok(html.includes('href="/workshop/five-levels"')); // Public course navigation contains titles only.
  assert.ok(!html.includes('Chuẩn bị trước buổi học'));
  assert.ok(!html.includes('Tải sổ thực hành'));
  for (const item of workshopSyllabus) assert.ok(!html.includes(item.summary));
  assert.match(html, /Thanh toán MoMo chưa mở/);
  for (const lesson of workshopLessons) for (const step of lesson.steps) if (step.prompt) assert.ok(!html.includes(step.prompt));
});
test('unauthenticated and forged cookies cannot read lessons or save progress', async () => {
  const f = await fixture();
  for (const cookie of [undefined, 'genyz_workshop=forged', `genyz_workshop=${'a'.repeat(64)}`]) {
    const result = await f.request('content', 'GET', undefined, cookie);
    assert.equal(result.status, 401); assert.ok(!(await result.text()).includes('lessons'));
    assert.equal((await f.request('progress', 'PUT', { completed: ['story'], current: 'story' }, cookie)).status, 401);
  }
});
test('valid code grants HttpOnly session and progress survives a fresh login', async () => {
  const f = await fixture();
  const result = await f.request('login', 'POST', { email, code: ` ${code.toLowerCase()} ` });
  assert.equal(result.status, 200);
  const header = result.headers.get('Set-Cookie')!;
  for (const attr of ['HttpOnly', 'SameSite=Strict', 'Secure', 'Path=/api/workshop']) assert.ok(header.includes(attr));
  const cookie = header.split(';')[0];
  const content = await f.request('content', 'GET', undefined, cookie);
  assert.equal(content.headers.get('Cache-Control'), 'private, no-store');
  const payload = await content.json();
  assert.equal(payload.lessons.length, 5);
  assert.equal(payload.syllabus.length, 5);
  assert.equal(payload.preparation.steps.length, 3);
  assert.equal(payload.glossary.length, 5);
  const progress = { completed: ['story', 'references'], current: 'frames' };
  assert.equal((await f.request('progress', 'PUT', progress, cookie)).status, 200);
  const second = await f.login();
  assert.deepEqual((await (await f.request('content', 'GET', undefined, second)).json()).progress, progress);
  const stored = f.sql.prepare('SELECT token_hash FROM workshop_sessions').all();
  assert.ok(stored.every(row => !cookie.includes(String(row.token_hash))));
});
test('expired and revoked codes invalidate existing sessions, and logout deletes the session', async () => {
  const f = await fixture();
  const cookie = await f.login();
  f.sql.exec('UPDATE workshop_codes SET revoked = 1');
  assert.equal((await f.request('content', 'GET', undefined, cookie)).status, 401);
  assert.equal((await f.request('login', 'POST', { email, code })).status, 401);
  f.sql.exec('UPDATE workshop_codes SET revoked = 0');
  const fresh = await f.login();
  assert.equal((await f.request('logout', 'POST', {}, fresh)).status, 200);
  assert.equal((await f.request('content', 'GET', undefined, fresh)).status, 401);
  const third = await f.login();
  f.sql.exec('UPDATE workshop_codes SET expires_at = 1');
  assert.equal((await f.request('content', 'GET', undefined, third)).status, 401);
  assert.equal((await f.request('login', 'POST', { email, code })).status, 401);
});
test('expired sessions do not grant access even while the code is valid', async () => {
  const f = await fixture(); const cookie = await f.login();
  f.sql.exec('UPDATE workshop_sessions SET expires_at = 1');
  assert.equal((await f.request('content', 'GET', undefined, cookie)).status, 401);
});
test('cross-origin writes, malformed requests, invalid progress and missing DB fail closed', async () => {
  const f = await fixture();
  assert.equal((await f.request('login', 'POST', { email, code }, undefined, { Origin: 'https://other.test' })).status, 403);
  assert.equal((await f.request('login', 'POST', { email, code }, undefined, { Origin: '' })).status, 403);
  assert.equal((await f.request('login', 'GET')).status, 405);
  assert.equal((await f.request('unknown')).status, 404);
  const cookie = await f.login();
  for (const body of [{ current: 'unknown', completed: [] }, { current: 'story', completed: ['story', 'story'] }, { current: 'story', completed: ['bad'] }, null]) assert.equal((await f.request('progress', 'PUT', body, cookie)).status, 400);
  assert.equal((await f.request('login', 'POST', { email, code: 'x'.repeat(5000) })).status, 400);
  assert.equal((await f.request('login', 'POST', { email, code: "' OR '1'='1 --" })).status, 401);
  const unavailable = await handleWorkshop(new Request(`${origin}/api/workshop/content`), {});
  assert.equal(unavailable.status, 503); assert.ok(!(await unavailable.text()).includes('lessons'));
});
test('login attempts are limited atomically per IP bucket', async () => {
  const f = await fixture();
  for (let i = 0; i < 10; i++) assert.equal((await f.request('login', 'POST', { email, code: 'WRONG-CODE-12345' })).status, 401);
  const limited = await f.request('login', 'POST', { email, code });
  assert.equal(limited.status, 429); assert.equal(limited.headers.get('Retry-After'), '900');
  assert.equal((await f.request('login', 'POST', { email, code }, undefined, { 'CF-Connecting-IP': '192.0.2.9' })).status, 200);
});

test('English gate offers both language routes without exposing the curriculum', () => {
  const html = renderToStaticMarkup(<WorkshopClassroom locale="en" />);
  assert.match(html, /Sign in with email/);
  assert.match(html, /href="\/workshop"/);
  assert.match(html, /href="\/en\/workshop"/);
  assert.match(html, /aria-current="page"[^>]*>EN/);
  assert.ok(html.includes('href="/en/workshop/five-levels"')); // Course titles are public navigation.
  assert.ok(!html.includes('Before you begin'));
  assert.ok(!html.includes('Mã truy cập'));
});
test('both language editions require authentication and share progress', async () => {
  const f = await fixture();
  const denied = await f.request('content?locale=en');
  assert.equal(denied.status, 401);
  assert.deepEqual(await denied.json(), { error: 'Please enter your code to access the classroom.' });
  const cookie = await f.login();
  const en = await (await f.request('content?locale=en', 'GET', undefined, cookie)).json();
  const vi = await (await f.request('content?locale=vi', 'GET', undefined, cookie)).json();
  assert.equal(en.preparation.title, 'Before you begin');
  assert.equal(en.courseTitle, 'The Clever Little Rat · Scene 1');
  assert.equal(en.lessons.length, 5);
  assert.deepEqual(en.syllabus.map((s: { id: string }) => s.id), vi.syllabus.map((s: { id: string }) => s.id));
  let prompts = 0;
  for (let i = 0; i < en.lessons.length; i++) {
    const lesson = en.lessons[i];
    assert.equal(lesson.steps.length, vi.lessons[i].steps.length);
    assert.notEqual(lesson.goal, vi.lessons[i].goal);
    for (let j = 0; j < lesson.steps.length; j++) {
      assert.notEqual(lesson.steps[j].instruction, vi.lessons[i].steps[j].instruction);
      assert.equal(Boolean(lesson.steps[j].prompt), Boolean(vi.lessons[i].steps[j].prompt));
      if (lesson.steps[j].prompt) { prompts++; assert.ok(!lesson.steps[j].prompt.includes('Vietnamese')); }
    }
  }
  assert.ok(prompts >= 5);
  const progress = { completed: ['story'], current: 'references' };
  assert.equal((await f.request('progress?locale=en', 'PUT', progress, cookie)).status, 200);
  const switched = await (await f.request('content?locale=vi', 'GET', undefined, cookie)).json();
  assert.deepEqual(switched.progress, progress);
  await f.request('logout?locale=en', 'POST', {}, cookie);
  assert.equal((await f.request('content?locale=vi', 'GET', undefined, cookie)).status, 401);
  assert.equal((await f.request('content?locale=en', 'GET', undefined, cookie)).status, 401);
});

test('request sends only to active paid email; unknown addresses have identical responses', async () => {
  const f = await fixture();
  f.sql.exec('DELETE FROM workshop_login_codes');
  const known = await f.request('request-code?locale=en', 'POST', { email: ' LEARNER@EXAMPLE.TEST ' });
  const unknown = await f.request('request-code?locale=en', 'POST', { email: 'unknown@example.test' });
  assert.equal(known.status, 200);
  assert.deepEqual(await known.json(), await unknown.json());
  assert.equal(f.sent.length, 1);
  assert.deepEqual(f.sent[0].to, [email]);
  const otp = f.sent[0].text.match(/\b\d{6}\b/)![0];
  assert.equal((await f.request('login', 'POST', { email, code: otp })).status, 200);
  assert.equal((await f.request('login', 'POST', { email, code: otp })).status, 401);
});
test('codes are email-bound, expire, and lock after five guesses across IPs', async () => {
  const f = await fixture();
  assert.equal((await f.request('login', 'POST', { email: 'wrong@example.test', code })).status, 401);
  for (let i = 0; i < 5; i++) assert.equal((await f.request('login', 'POST', { email, code: '999999' }, undefined, { 'CF-Connecting-IP': `192.0.2.${i}` })).status, 401);
  assert.equal((await f.request('login', 'POST', { email, code })).status, 401);
  f.sql.exec('UPDATE workshop_login_codes SET attempts=0, expires_at=1');
  assert.equal((await f.request('login', 'POST', { email, code })).status, 401);
});
test('resends cannot reset guess budget; concurrent code submissions succeed once', async () => {
  const f = await fixture();
  f.sql.exec('UPDATE workshop_login_codes SET attempts=4, created_at=1');
  await f.request('request-code', 'POST', { email });
  assert.equal(f.sent.length, 1);
  assert.equal(f.sql.prepare('SELECT attempts FROM workshop_login_codes').get()!.attempts, 4);
  await f.request('request-code', 'POST', { email });
  assert.equal(f.sent.length, 1);
  const otp = f.sent[0].text.match(/\b\d{6}\b/)![0];
  const results = await Promise.all([f.request('login', 'POST', { email, code: otp }), f.request('login', 'POST', { email, code: otp })]);
  assert.deepEqual(results.map(r => r.status).sort(), [200, 401]);
});
test('missing email configuration fails closed and permanent code alone cannot log in', async () => {
  const f = await fixture();
  assert.equal((await f.request('login', 'POST', { code })).status, 400);
  delete f.env.WORKSHOP_LOGIN_SECRET;
  assert.equal((await f.request('request-code', 'POST', { email })).status, 503);
  assert.equal(f.sent.length, 0);
});

test('delivery failure removes the undelivered challenge without exposing account membership', async () => {
  const f = await fixture();
  f.sql.exec('DELETE FROM workshop_login_codes');
  const result = await handleWorkshop(new Request(`${origin}/api/workshop/request-code?locale=en`, {
    method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json' }, body: JSON.stringify({ email }),
  }), f.env, (async () => Response.json({ error: 'provider unavailable' }, { status: 503 })) as typeof fetch);
  assert.equal(result.status, 200);
  assert.equal(f.sql.prepare('SELECT COUNT(*) AS count FROM workshop_login_codes').get()!.count, 0);
  assert.ok(!(await result.text()).includes('provider'));
});


test('email uses the GenYZ domain sender and Gmail reply address in both languages', async () => {
  const payloads: Record<string, unknown>[] = [];
  const send = (async (_url: unknown, options: RequestInit) => {
    payloads.push(JSON.parse(String(options.body)));
    return Response.json({ id: 'test' });
  }) as typeof fetch;
  for (const locale of ['vi', 'en']) await sendLoginCode('learner@example.test', '123456', locale, 'test-key', workshopEmailDefaults.from, send);
  for (const payload of payloads) {
    assert.equal(payload.from, 'GenYZ Studio <workshop@genyzstudio.com>');
    assert.equal(payload.reply_to, 'genyzstudio@gmail.com');
    assert.deepEqual(payload.to, ['learner@example.test']);
    assert.ok(String(payload.html).includes('123456'));
    assert.ok(String(payload.text).includes('123456'));
  }
});


test('login email includes localized HTML and plain text with the same code', () => {
  for (const locale of ['vi', 'en']) {
    const content = loginCodeEmail('012345', locale);
    assert.ok(content.html.includes(`<html lang="${locale}">`));
    assert.ok(content.html.includes('012345'));
    assert.ok(content.text.includes('012345'));
    assert.ok(content.html.includes(locale === 'en' ? 'up to 10 minutes' : 'tối đa 10 phút'));
    assert.ok(content.text.includes(locale === 'en' ? 'same email address' : 'đúng email này'));
    assert.ok(content.html.includes('mailto:genyzstudio@gmail.com'));
    assert.ok(!content.subject.includes('012345'));
    assert.ok(!content.html.includes('<img'));
  }
  assert.throws(() => loginCodeEmail('<script>', 'en'), /Invalid login code/);
});


test('retired Phoenix rejects content and progress even with valid access', async () => {
  const f = await fixture();
  const cookie = await f.login();
  for (const locale of ['vi', 'en']) {
    assert.equal((await f.request(`content?course=phoenix&locale=${locale}`)).status, 404);
    assert.equal((await f.request(`content?course=phoenix&locale=${locale}`, 'GET', undefined, cookie)).status, 404);
    assert.equal((await f.request(`progress?course=phoenix&locale=${locale}`, 'PUT', {completed: ['story'], current: 'motion'}, cookie)).status, 404);
  }
  const boat = await f.request('content?course=boat', 'GET', undefined, cookie);
  assert.equal(boat.status, 200);
  assert.deepEqual((await boat.json()).progress, {completed: [], current: 'story'});
});


test('five-level course is protected, bilingual and keeps progress isolated across sessions', async () => {
  const f = await fixture();
  assert.equal((await f.request('content?course=five-levels')).status, 401);
  assert.equal((await f.request('progress?course=five-levels', 'PUT', { completed: ['story'], current: 'story' })).status, 401);
  let cookie = await f.login();
  const progress = { completed: ['story', 'references'], current: 'motion' };
  assert.equal((await f.request('progress?course=five-levels', 'PUT', progress, cookie)).status, 200);
  cookie = await f.login();
  for (const locale of ['vi', 'en']) {
    const result = await f.request(`content?course=five-levels&locale=${locale}`, 'GET', undefined, cookie);
    assert.equal(result.status, 200);
    const payload = await result.json();
    assert.equal(payload.lessons.length, 5);
    assert.deepEqual(payload.progress, progress);
    assert.equal(payload.source, undefined);
    assert.ok(!JSON.stringify(payload).includes('Duy AI'));
    assert.deepEqual(payload.lessons.map((l: {id: string}) => l.id), payload.syllabus.map((l: {id: string}) => l.id));
    for (const lesson of payload.lessons) {
      assert.ok(lesson.steps.length >= 4);
      assert.ok(lesson.steps.some((step: {prompt?: string}) => step.prompt && step.prompt.length > 80));
      assert.ok(lesson.steps.every((step: {instruction: string; save: string; tool: string}) => step.instruction && step.save && step.tool));
      assert.equal(lesson.example.href, undefined);
    }
    const html = renderToStaticMarkup(<WorkshopClassroom locale={locale as 'vi' | 'en'} course="five-levels" />);
    for (const lesson of payload.lessons) {
      assert.ok(!html.includes(lesson.goal));
      for (const step of lesson.steps) if (step.prompt) assert.ok(!html.includes(step.prompt));
    }
  }
  const boat = await (await f.request('content', 'GET', undefined, cookie)).json();
  assert.deepEqual(boat.progress, { completed: [], current: 'story' });
  assert.equal((await f.request('progress?course=five-levels', 'PUT', { completed: ['planning'], current: 'planning' }, cookie)).status, 400);
  assert.equal((await f.request('progress?course=five-levels', 'PUT', { completed: ['story', 'story'], current: 'story' }, cookie)).status, 400);
  assert.equal((await f.request('progress', 'PUT', { completed: ['frames'], current: 'frames' }, cookie)).status, 200);
  assert.deepEqual((await (await f.request('content?course=five-levels', 'GET', undefined, cookie)).json()).progress, progress);
  f.sql.exec('UPDATE workshop_codes SET revoked = 1');
  assert.equal((await f.request('content?course=five-levels', 'GET', undefined, cookie)).status, 401);
});

test('course migration preserves historical Phoenix progress', () => {
  const db = new DatabaseSync(':memory:');
  for (const file of ['0001_workshop.sql', '0002_workshop_email.sql', '0003_workshop_courses.sql']) db.exec(readFileSync(`migrations/${file}`, 'utf8'));
  db.prepare('INSERT INTO workshop_codes(id, code_hash, created_at, expires_at) VALUES (?, ?, ?, ?)').run('historical', 'hash', 1, 9999999999);
  db.prepare('INSERT INTO workshop_course_progress(code_id, course_id, completed, current_module) VALUES (?, ?, ?, ?)').run('historical', 'phoenix', '["story"]', 'motion');
  db.exec(readFileSync('migrations/0004_workshop_five_levels.sql', 'utf8'));
  const row = db.prepare('SELECT * FROM workshop_course_progress').get();
  assert.equal(row?.course_id, 'phoenix');
  assert.equal(row?.completed, '["story"]');
  assert.equal(row?.current_module, 'motion');
  db.close();
});


test('expanded technique labs are bilingual and fully included in downloaded workbooks', () => {
  const ids: string[][] = [];
  for (const locale of ['vi', 'en'] as const) {
    const curriculum = workshopCurriculum(locale, 'five-levels');
    const labs = curriculum.lessons.flatMap(lesson => lesson.techniques || []);
    assert.equal(labs.length, 28);
    assert.equal(new Set(labs.map(lab => lab.id)).size, 28);
    ids.push(labs.map(lab => lab.id));
    const workbook = formatWorkshopWorkbook({ ...curriculum, progress: { completed: [], current: 'story' }, sessionExpiresAt: 0 }, locale);
    assert.ok(!/Duy AI|ITxx9hHbSj4/.test(workbook));
    for (const lab of labs) {
      assert.equal(lab.steps.length, 3);
      for (const text of [lab.title, lab.goal, lab.input, lab.check, lab.fix]) assert.ok(workbook.includes(text));
      for (const step of lab.steps) {
        for (const text of [step.instruction, step.save, step.tool, ...(step.prompt ? [step.prompt] : [])]) assert.ok(workbook.includes(text));
      }
    }
  }
  assert.deepEqual(ids[0], ids[1]);
});


test('Vietnamese prompts are copy-ready and tested examples remain truthful and present', () => {
  const c = workshopCurriculum('vi', 'five-levels');
  const steps = c.lessons.flatMap(l => [...l.steps, ...(l.techniques || []).flatMap(t => t.steps)]).filter(s => s.prompt);
  assert.equal(steps.length, 41);
  assert.equal(steps.filter(s => s.testedExample).length, 4);
  const workbook = formatWorkshopWorkbook({ ...c, progress: { completed: [], current: 'story' }, sessionExpiresAt: 0 }, 'vi');
  for (const step of steps) {
    assert.ok(step.promptVi && step.promptVi.length > 100);
    assert.ok(workbook.includes(step.promptVi));
    const html = renderToStaticMarkup(<StepPrompt step={step} locale="vi" />);
    assert.ok(html.includes('<pre lang="vi"'));
    assert.ok(html.indexOf('<pre lang="vi"') < html.indexOf('<pre lang="en"'));
    assert.ok(html.includes('Bản tiếng Anh'));
    if (step.testedExample) {
      assert.equal(step.promptKind, 'image');
      const example = step.testedExample;
      assert.ok(existsSync(`public${example.image}`));
      if (example.inputImage) assert.ok(existsSync(`public${example.inputImage}`));
      const png = readFileSync(`public${example.image}`);
      assert.equal(png.readUInt32BE(16), example.width);
      assert.equal(png.readUInt32BE(20), example.height);
      assert.ok(workbook.includes(example.review));
      assert.ok(workbook.includes(`https://genyzstudio.com${example.image}`));
    } else {
      assert.ok(html.includes('chưa chạy thử'));
      assert.ok(!html.includes('Kết quả đã tạo từ câu lệnh'));
    }
  }
  const video = steps.find(s => s.promptKind === 'video')!;
  assert.ok(renderToStaticMarkup(<StepPrompt step={video} locale="vi" />).includes('Các câu lệnh đã thử và video kết quả'));
  const legacy = renderToStaticMarkup(<StepPrompt step={{title:'Legacy', tool:'Tool', instruction:'', save:'', prompt:'Original English'}} locale="vi" />);
  assert.ok(legacy.includes('<pre lang="en"'));
  assert.ok(!legacy.includes('Câu lệnh tiếng Việt'));
});


test('generated examples require active sessions and never expose a public asset fallback', async () => {
  const f = await fixture();
  let fetched = 0;
  f.env.ASSETS = { async fetch(request) {
    fetched++;
    assert.equal(new URL(request.url).pathname, '/api/workshop/examples/lantern-vi-v1.png');
    return new Response(new Uint8Array([137, 80, 78, 71]), { headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=3600' } });
  } };
  const path = 'examples/lantern-vi-v1.png';
  assert.equal((await f.request(path)).status, 401);
  assert.equal(fetched, 0);
  const cookie = await f.login();
  const r = await f.request(path, 'GET', undefined, cookie);
  assert.equal(r.status, 200);
  assert.equal(r.headers.get('Content-Type'), 'image/png');
  assert.equal(r.headers.get('Cache-Control'), 'private, no-store');
  assert.equal(r.headers.get('Vary'), 'Cookie');
  assert.equal(fetched, 1);
  assert.equal((await f.request('examples/unknown.png', 'GET', undefined, cookie)).status, 404);
  assert.equal((await f.request(path, 'POST', {}, cookie)).status, 405);
  f.env.ASSETS = { async fetch() { return new Response('<html>fallback</html>', { headers: { 'Content-Type': 'text/html' } }); } };
  assert.equal((await f.request(path, 'GET', undefined, cookie)).status, 503);
  delete f.env.ASSETS;
  assert.equal((await f.request(path, 'GET', undefined, cookie)).status, 503);
  f.sql.exec('UPDATE workshop_codes SET revoked=1');
  assert.equal((await f.request(path, 'GET', undefined, cookie)).status, 401);
  assert.ok(!existsSync('public/images/workshop-five-levels'));
});

test('video byte ranges remain authenticated and private', async () => {
  const f = await fixture();
  let fetched = 0;
  f.env.ASSETS = { async fetch(request) {
    fetched++;
    assert.equal(request.headers.get('Range'), 'bytes=0-3');
    assert.equal(request.headers.get('Cookie'), null);
    return new Response(new Uint8Array([0, 0, 0, 24]), { status: 206, headers: { 'Content-Type': 'video/mp4', 'Content-Range': 'bytes 0-3/100', 'Content-Length': '4', 'Accept-Ranges': 'bytes' } });
  } };
  const route = 'examples/lantern-text-vi-v1.mp4';
  assert.equal((await f.request(route, 'GET', undefined, undefined, { Range: 'bytes=0-3' })).status, 401);
  assert.equal(fetched, 0);
  const cookie = await f.login();
  const result = await f.request(route, 'GET', undefined, cookie, { Range: 'bytes=0-3' });
  assert.equal(result.status, 206);
  assert.equal(result.headers.get('Content-Range'), 'bytes 0-3/100');
  assert.equal(result.headers.get('Content-Length'), '4');
  assert.equal(result.headers.get('Cache-Control'), 'private, no-store');
  assert.equal(result.headers.get('Vary'), 'Cookie');
  assert.equal((await result.arrayBuffer()).byteLength, 4);
  f.env.ASSETS = { async fetch() { return new Response(null, { status: 416, headers: { 'Content-Range': 'bytes */100' } }); } };
  const invalid = await f.request(route, 'GET', undefined, cookie, { Range: 'bytes=999-' });
  assert.equal(invalid.status, 416);
  assert.equal(invalid.headers.get('Content-Range'), 'bytes */100');
  assert.equal(invalid.headers.get('Cache-Control'), 'private, no-store');
  f.sql.exec('UPDATE workshop_codes SET revoked=1');
  assert.equal((await f.request(route, 'GET', undefined, cookie, { Range: 'bytes=0-3' })).status, 401);
});

test('every level has reproducible visual examples and all media is registered', () => {
  for (const locale of ['vi', 'en'] as const) {
    const content = workshopCurriculum(locale, 'five-levels');
    const workbook = formatWorkshopWorkbook({ ...content, progress: { current: 'story', completed: [] }, sessionExpiresAt: Date.now() + 1000 }, locale);
    for (const lesson of content.lessons) {
      assert.ok(lesson.visualExamples?.length, lesson.id);
      const html = renderToStaticMarkup(<WorkshopVisualExamples lesson={lesson} locale={locale} />);
      assert.ok(!html.includes('autoplay'));
      for (const example of lesson.visualExamples) {
        assert.ok(example.review && example.settings && example.outputs.length);
        if (example.promptVi) assert.ok(workbook.includes(example.promptVi));
        for (const path of [...example.inputs.map(input => input.src), ...example.outputs.flatMap(output => [output.src, ...(output.poster ? [output.poster] : [])])]) {
          assert.ok(Object.hasOwn(workshopMedia, path), path);
          assert.ok(existsSync(`public${path}`), path);
          assert.ok(html.includes(path));
        }
      }
    }
  }
});

test('clever rat keeps original course history isolated and shares only its own locale progress', async () => {
  const f = await fixture();
  f.sql.exec(`UPDATE workshop_codes SET completed='["story","references"]', current_module='edit'`);
  const cookie = await f.login();
  const rat = await (await f.request('content', 'GET', undefined, cookie)).json();
  assert.deepEqual(rat.progress, {completed:[],current:'story'});
  const progress = {completed:['story'],current:'frames'};
  assert.equal((await f.request('progress?course=clever-rat', 'PUT', progress, cookie)).status,200);
  assert.deepEqual((await (await f.request('content?locale=en', 'GET', undefined, cookie)).json()).progress,progress);
  assert.deepEqual(f.sql.prepare('SELECT completed,current_module FROM workshop_codes').get(),Object.assign(Object.create(null),{completed:'["story","references"]',current_module:'edit'}));
});

test('rat lessons pair real protected media with steps and retain evidence in workbooks', () => {
  for(const locale of ['vi','en'] as const) {
    const course=workshopCurriculum(locale);
    assert.deepEqual(course.lessons.map(l=>l.id),['story','references','frames','motion','delivery']);
    const workbook=formatWorkshopWorkbook({...course,progress:{completed:[],current:'story'},sessionExpiresAt:0},locale);
    assert.ok(!workbook.includes('Paper Boat'));
    for(const lesson of course.lessons) {
      assert.ok(lesson.steps.some(step=>step.media?.length));
      for(const step of lesson.steps) {
        for(const media of step.media||[]) {
          assert.ok(workshopMedia[media.src]);
          assert.ok(existsSync(`public${media.src}`));
          assert.ok(workbook.includes(media.src));
          if(media.poster) assert.ok(workshopMedia[media.poster] && existsSync(`public${media.poster}`));
        }
        if(step.promptEvidence) assert.ok(workbook.includes(step.promptEvidence));
      }
    }
  }
});

test('main rat lesson renders inline media, not just workbook references', async () => {
  const { Lesson } = await import('../components/workshop-classroom');
  const course=workshopCurriculum('vi');
  const html=renderToStaticMarkup(<Lesson locale="vi" lesson={course.lessons[0]} workshopSyllabus={course.syllabus} completed={false} busy={false} onComplete={()=>{}} />);
  assert.ok(html.includes('src="/api/workshop/examples/rat-s1-edit.mp4"'));
  assert.ok(html.includes('preload="none"'));
});

test('master-frame protects every tested Vietnamese prompt and isolates progress', async () => {
  const f = await fixture();
  assert.equal((await f.request('content?course=master-frame')).status,401);
  const cookie=await f.login();
  const progress: WorkshopProgress={completed:['story','references'],current:'planning'};
  assert.equal((await f.request('progress?course=master-frame','PUT',progress,cookie)).status,200);
  for(const locale of ['vi','en'] as const){
    const response=await f.request(`content?course=master-frame&locale=${locale}`,'GET',undefined,cookie);
    assert.equal(response.status,200);
    const content=await response.json();
    assert.deepEqual(content.progress,progress);
    assert.equal(content.lessons.length,6);
    const curriculum=workshopCurriculum(locale,'master-frame');
    assert.equal(curriculum.preparation.visualGuide?.length,4);
    assert.equal(curriculum.preparation.toolPaths?.length,2);
    for(const guide of curriculum.preparation.visualGuide || []) {
      assert.equal(workshopMedia[guide.image],'image/png');
      assert.ok(existsSync(`public${guide.image}`));
      assert.ok(guide.recreation?.promptVi.startsWith('Dùng ảnh đính kèm'));
      assert.equal(guide.recreation?.references.length,1);
      for(const reference of guide.recreation?.references || []) {
        assert.equal(workshopMedia[reference.src],'image/png');
        assert.ok(existsSync(`public${reference.src}`));
        assert.notEqual(reference.src,guide.image);
      }
      assert.equal((await f.request(`examples/${guide.image.split('/').at(-1)}`)).status,401);
    }
    assert.ok(!JSON.stringify(curriculum.preparation).includes('Midjourney'));
    const steps=curriculum.lessons.flatMap(l=>l.steps);
    assert.equal(steps.length,14);
    const gate=renderToStaticMarkup(<WorkshopClassroom locale={locale} course="master-frame" />);
    for(const step of steps){
      assert.equal(step.promptLanguage,'en');
      assert.ok(step.promptVi);
      assert.ok(step.prompt && step.prompt.length>100);
      assert.ok(!gate.includes(step.prompt));
      assert.ok(step.testedExample);
      assert.equal(workshopMedia[step.testedExample.image],'image/png');
      assert.ok(existsSync(`public${step.testedExample.image}`));
      for(const input of step.referenceImages||[]) assert.equal(workshopMedia[input.src],'image/png');
      assert.ok(!renderToStaticMarkup(<StepPrompt step={step} locale={locale}/>).includes('NOT YET TESTED'));
    }
    const workbook=formatWorkshopWorkbook({...curriculum,progress,sessionExpiresAt:0},locale);
    assert.ok(workbook.includes('PROMPT (Vietnamese)'));
    assert.ok(workbook.includes('PROMPT (English)'));
    assert.ok(workbook.includes('/frame-board-v1.png'));
    assert.ok(workbook.includes('/overview-lens-vi-v2.png'));
    assert.ok(workbook.includes('/overview-shots-v1.png'));
    for(const guide of curriculum.preparation.visualGuide || []) assert.ok(workbook.includes(guide.recreation!.promptVi));
  }
  for(const course of ['clever-rat','five-levels']) assert.deepEqual((await (await f.request(`content?course=${course}`,'GET',undefined,cookie)).json()).progress,{completed:[],current:'story'});
  assert.equal((await f.request('progress?course=master-frame','PUT',{completed:['sound'],current:'sound'},cookie)).status,400);
  assert.equal((await f.request('examples/frame-linh-v1.png')).status,401);
});

test('master-frame schema expansion preserves every existing progress row',()=>{
  const db=new DatabaseSync(':memory:');
  for(const file of ['0001_workshop.sql','0002_workshop_email.sql','0003_workshop_courses.sql','0004_workshop_five_levels.sql','0005_workshop_clever_rat.sql'])db.exec(readFileSync(`migrations/${file}`,'utf8'));
  db.exec("INSERT INTO workshop_codes(id,code_hash,created_at,expires_at) VALUES('migration-test','hash',1,9999999999)");
  for(const course of ['phoenix','five-levels','clever-rat'])db.prepare('INSERT INTO workshop_course_progress(code_id,course_id,completed,current_module) VALUES(?,?,?,?)').run('migration-test',course,'["story"]','references');
  const before=db.prepare('SELECT * FROM workshop_course_progress ORDER BY course_id').all();
  db.exec(readFileSync('migrations/0006_workshop_master_frame.sql','utf8'));
  assert.deepEqual(db.prepare('SELECT * FROM workshop_course_progress ORDER BY course_id').all(),before);
  db.prepare('INSERT INTO workshop_course_progress(code_id,course_id) VALUES(?,?)').run('migration-test','master-frame');
  assert.equal(db.prepare('SELECT COUNT(*) n FROM workshop_course_progress').get()!.n,4);
  db.close();
});

test('directors framework is protected, bilingual, and has independent progress', async () => {
  const f = await fixture();
  assert.equal((await f.request('content?course=directors-framework')).status, 401);
  assert.equal((await f.request('examples/frame-repair-v1.png')).status, 401);
  const cookie = await f.login();
  const progress = { current: 'planning', completed: ['story'] };
  assert.equal((await f.request('progress?course=directors-framework', 'PUT', progress, cookie)).status, 200);
  for (const locale of ['vi', 'en'] as const) {
    const response = await f.request(`content?course=directors-framework&locale=${locale}`, 'GET', undefined, cookie);
    assert.equal(response.status, 200);
    const content = await response.json();
    assert.deepEqual(content.progress, progress);
    assert.equal(content.lessons.length, 9);
    const frames = content.lessons.find((l: {id:string}) => l.id === 'frames');
    const testedFrames = frames.steps.filter((step: {testedExample?: unknown}) => step.testedExample);
    assert.ok(testedFrames.length >= 3);
    const previous = workshopCurriculum(locale, 'master-frame');
    const originalSteps = previous.lessons.flatMap(lesson => lesson.steps);
    for (const current of testedFrames) {
      const original = originalSteps.find(step => step.testedExample?.image === current.testedExample.image);
      if (original) {
        assert.equal(current.prompt, original.prompt);
        assert.deepEqual(current.referenceImages.map((ref: {src:string}) => ref.src), original.referenceImages?.map(ref => ref.src));
      } else {
        assert.ok(directorRuns.some(run => current.testedExample.image.endsWith(`${run.file}.png`) && current.promptVi === run.prompt));
      }
    }
    assert.ok(content.courseTitle.includes(locale === 'vi' ? 'Hộ Vệ Sông Hồng' : 'Guardians of the Red River'));
    assert.ok(!/Mai|Hội An|beacon|director-wide-v1|director-close-v1/.test(JSON.stringify(content)));
    assert.equal(frames.steps[1].referenceImages[0].src, frames.steps[0].testedExample.image);
    for (const step of testedFrames) {
      assert.equal(step.promptLanguage, 'en');
      assert.ok(step.promptVi);
      assert.ok(existsSync(`public${step.testedExample.image}`));
      assert.equal(workshopMedia[step.testedExample.image], 'image/png');
    }
    const gate = renderToStaticMarkup(<WorkshopClassroom locale={locale} course="directors-framework" />);
    assert.ok(!gate.includes(frames.steps[0].prompt));
    assert.ok(gate.includes('/en/workshop/directors-framework'));
  }
  for (const course of ['clever-rat', 'five-levels', 'master-frame']) {
    const result = await (await f.request(`content?course=${course}`, 'GET', undefined, cookie)).json();
    assert.deepEqual(result.progress.completed, []);
  }
  assert.equal((await f.request('progress?course=directors-framework', 'PUT', {current:'unknown-module',completed:[]}, cookie)).status, 400);
});

test('director migration preserves existing course history', () => {
  const db = new DatabaseSync(':memory:');
  for (const file of ['0001_workshop.sql','0002_workshop_email.sql','0003_workshop_courses.sql','0004_workshop_five_levels.sql','0005_workshop_clever_rat.sql','0006_workshop_master_frame.sql']) db.exec(readFileSync(`migrations/${file}`, 'utf8'));
  db.exec("INSERT INTO workshop_codes(id,code_hash,created_at,expires_at) VALUES('keep','hash',1,9999999999)");
  for (const course of ['phoenix','clever-rat','five-levels','master-frame']) db.prepare('INSERT INTO workshop_course_progress(code_id,course_id,completed,current_module) VALUES(?,?,?,?)').run('keep',course,'["story"]','frames');
  const before = db.prepare('SELECT * FROM workshop_course_progress ORDER BY course_id').all();
  db.exec(readFileSync('migrations/0007_workshop_directors_framework.sql','utf8'));
  assert.deepEqual(db.prepare('SELECT * FROM workshop_course_progress ORDER BY course_id').all(), before);
  db.prepare('INSERT INTO workshop_course_progress(code_id,course_id) VALUES(?,?)').run('keep','directors-framework');
  assert.equal(db.prepare('SELECT COUNT(*) n FROM workshop_course_progress').get()!.n, 5);
  db.close();
});

test('director workshop exposes all six detailed lessons with exercises and shared visual evidence', () => {
  const expected = ['references', 'planning', 'motion', 'frames', 'edit', 'sound'];
  for (const locale of ['vi', 'en'] as const) {
    const content = workshopCurriculum(locale, 'directors-framework');
    const master = workshopCurriculum(locale, 'master-frame').lessons.flatMap(lesson => lesson.steps);
    assert.equal(new Set(content.lessons.map(lesson => lesson.id)).size, 9);
    for (let index = 0; index < 6; index++) {
      const entry = content.syllabus.find(item => item.id === expected[index])!;
      assert.ok(entry.title.startsWith(`L${index + 1} ·`));
      const lesson = content.lessons.find(item => item.id === entry.id)!;
      assert.ok(lesson.steps.length >= 5);
      assert.ok(lesson.checks.length >= 3);
      assert.ok(lesson.steps.some(step => step.prompt));
      for (const step of lesson.steps) {
        if (step.testedExample) {
          const original = master.find(item => item.testedExample?.image === step.testedExample?.image)!;
          if (original) {
            assert.equal(step.prompt, original.prompt);
            assert.deepEqual(step.referenceImages?.map(ref => ref.src), original.referenceImages?.map(ref => ref.src));
          } else {
            const run = directorRuns.find(run => step.testedExample!.image.endsWith(`${run.file}.png`));
            assert.ok(run);
            assert.equal(step.promptVi, run.prompt);
            assert.deepEqual(step.referenceImages?.map(ref => ref.src), run.inputs.map(name => `/api/workshop/examples/${name}.png`));
          }
        }
        if (step.promptKind === 'video') {
          assert.ok(step.promptEvidence);
          assert.equal(step.testedExample, undefined);
          assert.ok(step.media?.some(media => media.kind === 'video'));
          assert.ok(step.resultReview);
        }
        for (const input of step.referenceImages || []) {
          assert.ok(existsSync(`public${input.src}`));
          assert.equal(workshopMedia[input.src], 'image/png');
        }
      }
    }
    const workbook = formatWorkshopWorkbook({...content,progress:{current:'story',completed:[]},sessionExpiresAt:Date.now()+10000}, locale);
    for (let i = 1; i <= 6; i++) assert.ok(workbook.includes(`L${i} ·`));
  }
});


test('every new director visual prompt has its exact input and actual registered output', () => {
  for (const locale of ['vi', 'en'] as const) {
    const content = workshopCurriculum(locale, 'directors-framework');
    const steps = content.lessons.flatMap(lesson => lesson.steps);
    const examples = content.lessons.flatMap(lesson => lesson.visualExamples || []);
    for (const run of directorRuns) {
      const step = steps.find(step => step.promptVi === run.prompt);
      const example = examples.find(item => item.id === run.file);
      assert.ok(step || example, run.file);
      assert.deepEqual(step?.referenceImages?.map(ref => ref.src) || example?.inputs.map(ref => ref.src), run.inputs.map(name => `/api/workshop/examples/${name}.png`));
      const src = `/api/workshop/examples/${run.file}.${run.kind === 'image' ? 'png' : 'mp4'}`;
      assert.ok(existsSync(`public${src}`));
      assert.ok(workshopMedia[src]);
      if (run.kind === 'video') {
        assert.equal(step?.media?.[0].src || example?.outputs[0].src, src);
        const poster = step?.media?.[0].poster || example?.outputs[0].poster;
        assert.ok(existsSync(`public${poster}`));
        if (step) {
          const markup = renderToStaticMarkup(<StepMedia step={step} locale={locale} />);
          assert.ok(markup.includes('preload="none"'));
          assert.ok(markup.includes(step.resultReview!));
        }
      } else assert.equal(step?.testedExample?.image || example?.outputs[0].src, src);
    }
    for (const step of steps.filter(step => step.prompt)) {
      assert.ok(step.testedExample || step.media?.length || step.resultText, step.title);
      assert.ok(step.promptVi);
      assert.match(step.promptEvidence || '', locale === 'vi' ? /Bản tiếng Anh|Bản dịch tiếng Anh/ : /English/);
    }
    const workbook = formatWorkshopWorkbook({...content,progress:{current:'story',completed:[]},sessionExpiresAt:Date.now()+10000}, locale);
    assert.ok(workbook.includes('director-medium-dolly-v2.mp4'));
    assert.ok(workbook.includes('director-depth-c-v1.png'));
  }
});

test('director framework keeps the source step titles for L1 through L6', () => {
  const expected = [
    ['Visual Hierarchy', 'Camera Logic', 'Motion Control', 'Emotional Anchor', 'Scene Readability'],
    ['Script Analysis', 'Storyboard Development', 'Character Design', 'Costume & Props', 'Environment Design', 'Shot List', 'Frame Generation'],
    ['Sequence First', 'Prompt Creation', 'Shot-by-Shot Prompts', 'Video Generator', 'Iteration', 'Clip Review', 'Final Assembly'],
    ['Leading Lines & Wide / Scale', 'Rule of Thirds', 'Diagonal, Center / Symmetry & Contrast', 'Macro / Detail', 'Negative Space', 'Framing + Depth', 'Composition Across the Sequence'],
    ['Motivated Lighting', 'Color Contrast', 'Negative Fill & Exposure Contrast', 'Edge Contrast & Edge Light Only', 'Softness via Distance', '80/20 Rule', 'Atmosphere Layering', 'Dynamic Light'],
    ['Three-Layer Rule', 'Separation', 'Depth of Field', 'Lighting', 'Atmosphere', 'Lens Choice', 'Motion & Parallax'],
  ];
  const content = workshopCurriculum('en', 'directors-framework');
  const lessons = content.lessons.slice(1, 7);
  assert.deepEqual(lessons.map(lesson => lesson.steps.map(step => step.title)), expected);
  assert.equal(lessons[1].steps[4].title, 'Environment Design');
});

test('fight scenes teaches rules before the shared story and protects independent progress', async () => {
  const f = await fixture();
  assert.equal((await f.request('content?course=fight-scenes')).status,401);
  const cookie = await f.login();
  const progress = {completed:['story','planning'],current:'motion'};
  assert.equal((await f.request('progress?course=fight-scenes','PUT',progress,cookie)).status,200);
  for (const locale of ['vi','en'] as const) {
    const result = await f.request(`content?course=fight-scenes&locale=${locale}`,'GET',undefined,cookie);
    assert.equal(result.status,200);
    const content = await result.json() as ReturnType<typeof workshopCurriculum> & {progress:WorkshopProgress};
    assert.deepEqual(content.progress,progress);
    assert.deepEqual(content.lessons.map(item=>item.id),['story','planning','motion','frames','references','review','edit','delivery']);
    assert.ok(content.source?.href.endsWith('SdtaDI8plF4'));
    assert.ok(content.preparation.steps.length >= 5);
    const frame = content.lessons[4].steps[1];
    assert.equal(frame.promptLanguage,'en');
    assert.ok(frame.promptVi);
    assert.ok(frame.testedExample);
    assert.equal(frame.referenceImages?.length,1);
    const cameras = content.lessons[3].steps.slice(0,4);
    assert.deepEqual(cameras.map(step=>step.media?.[0].src), ['static','tracking','orbit','projectile'].map(key=>`/api/workshop/examples/fight-scene-${key}-v1.mp4`));
    assert.ok(!/Google Flow|Veo|Omni 1\.1/.test(JSON.stringify(content)));
    for (const demo of fightDemos) {
      assert.equal(demo.status,'reviewed');
      const matches=content.lessons.flatMap(lesson=>lesson.steps).filter(step=>step.promptVi===demo.prompt);
      assert.ok(matches.length > 0,demo.key);
      assert.ok(matches.some(step=>step.media?.[0].src===`/api/workshop/examples/${demo.clip}.mp4`));
      for(const step of matches) {
        assert.equal(step.prompt,demo.promptEn);
        assert.equal(step.promptLanguage,'en');
        assert.equal(step.referenceImages?.[0].src,`/api/workshop/examples/${demo.input}`);
        assert.ok(step.promptEvidence?.includes('480p'));
        assert.ok(step.resultReview);
      }
    }
    for(const lesson of content.lessons) for(const step of lesson.steps) {
      const videos=step.media?.filter(media=>media.kind==='video') || [];
      if(!videos.length) continue;
      assert.equal(videos.length,2,step.title);
      if (videos[0].src.endsWith('fight-scene-vague-v1.mp4') && videos[1].src.endsWith('fight-scene-tracking-v1.mp4')) continue;
      if (videos[1].src.endsWith('fight-scene-slowbeat-v1.mp4')) {
        assert.ok(videos[0].src.endsWith('fight-scene-static-v1.mp4'));
        continue;
      }
      assert.equal(videos[1].src,videos[0].src.replace('.mp4','-125.mp4'));
      assert.equal(videos[0].height,480);
      assert.ok(videos[0].label.includes('1×'));
      assert.ok(videos[1].label.includes(locale==='vi'?'1,25×':'1.25×'));
    }
    assert.equal(fightDemos.filter(demo=>demo.duration===6).length,6);
    assert.ok(content.lessons[4].steps.length >= 5);
    const take = content.lessons[5].steps[0];
    for (const lesson of content.lessons) for (const step of lesson.steps) {
      const files = [...(step.media || []).flatMap(item=>[item.src,...(item.poster?[item.poster]:[])]),...(step.referenceImages || []).map(item=>item.src),...(step.testedExample?[step.testedExample.image]:[])];
      for (const src of files) { assert.ok(workshopMedia[src],src); assert.ok(existsSync(`public${src}`),src); }
    }
    const workbook = formatWorkshopWorkbook({...content,sessionExpiresAt:0},locale);
    assert.ok(workbook.includes(take.prompt!));
    const gate = renderToStaticMarkup(<WorkshopClassroom locale={locale} course="fight-scenes" />);
    assert.ok(gate.includes('/en/workshop/fight-scenes'));
    assert.ok(!gate.includes(take.prompt!));
  }
  for (const course of ['clever-rat','five-levels','master-frame','directors-framework']) {
    const result=await (await f.request(`content?course=${course}`,'GET',undefined,cookie)).json() as {progress:WorkshopProgress};
    assert.deepEqual(result.progress,{completed:[],current:'story'});
  }
  assert.equal((await f.request('progress?course=fight-scenes','PUT',{completed:['sound'],current:'sound'},cookie)).status,400);
});

test('fight scenes migration preserves all previous course progress',()=>{
  const db=new DatabaseSync(':memory:');
  for (const file of ['0001_workshop','0002_workshop_email','0003_workshop_courses','0004_workshop_five_levels','0005_workshop_clever_rat','0006_workshop_master_frame','0007_workshop_directors_framework']) db.exec(readFileSync(`migrations/${file}.sql`,'utf8'));
  db.prepare('INSERT INTO workshop_codes(id,code_hash,created_at,expires_at) VALUES(?,?,?,?)').run('preserve','hash',1,9999999999);
  for (const course of ['phoenix','clever-rat','five-levels','master-frame','directors-framework']) db.prepare('INSERT INTO workshop_course_progress(code_id,course_id,completed,current_module) VALUES(?,?,?,?)').run('preserve',course,'["story"]','frames');
  const before=db.prepare('SELECT * FROM workshop_course_progress ORDER BY course_id').all();
  db.exec(readFileSync('migrations/0008_workshop_fight_scenes.sql','utf8'));
  assert.deepEqual(db.prepare('SELECT * FROM workshop_course_progress ORDER BY course_id').all(),before);
  db.prepare('INSERT INTO workshop_course_progress(code_id,course_id) VALUES(?,?)').run('preserve','fight-scenes');
  assert.equal(db.prepare('SELECT COUNT(*) AS n FROM workshop_course_progress').get()?.n,6);
  db.close();
});
