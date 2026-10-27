import assert from 'node:assert/strict';
import { seedance25Prompts } from '../server/workshop-seedance25-prompts';
import assetManifest from '../server/workshop-seedance25-assets.json';
import { workshopMedia } from '../server/workshop-media';
import { test } from 'node:test';
import { readFileSync, readdirSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import { renderToStaticMarkup } from 'react-dom/server';
import { seedanceCoursePrompts, seedanceWorkedResponses } from '../server/workshop-seedance-masterclass-prompts';
import { seedanceMasterclassCurriculum, seedanceMasterclassModuleIds } from '../server/workshop-seedance-masterclass';
import { workshopCurriculum } from '../server/workshop-content';
import { StepMedia, StepPrompt, WorkshopClassroom, WorkshopVisualExamples } from '../components/workshop-classroom';
import { LanguageSwitch } from '../components/language-switch';
import { formatWorkshopWorkbook } from '../content/workshop/workbook';
import { formatWorkshopPrompt } from '../content/workshop/prompt';

function unescapeHtml(text: string) {
  return text.replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
}

test('seedance masterclass has 7 bilingual beginner modules with equal structure', () => {
  const vi = seedanceMasterclassCurriculum('vi');
  const en = seedanceMasterclassCurriculum('en');
  assert.deepEqual(vi.lessons.map(l => l.id), [...seedanceMasterclassModuleIds]);
  assert.deepEqual(vi.lessons.map(l => l.id), vi.syllabus.map(s => s.id));
  assert.equal(vi.preparation.steps.length, en.preparation.steps.length);
  assert.ok(vi.glossary.length >= 10);
  for (let i = 0; i < 7; i++) {
    assert.equal(vi.lessons[i].steps.length, en.lessons[i].steps.length);
    assert.notEqual(vi.lessons[i].goal, en.lessons[i].goal);
    assert.ok(vi.lessons[i].checks.length >= 3);
    assert.ok(vi.lessons[i].troubleshooting.length >= 2);
    assert.equal(vi.lessons[i].techniques?.length, en.lessons[i].techniques?.length);
    assert.equal(vi.lessons[i].example.href, undefined);
  }
  for (const locale of ['vi', 'en'] as const) {
    const curriculum = workshopCurriculum(locale, 'seedance-masterclass');
    const html = renderToStaticMarkup(<WorkshopClassroom locale={locale} course="seedance-masterclass" />);
    assert.ok(!html.includes('=== GLOBAL LOOK'));
    assert.ok(!html.includes(curriculum.preparation.intro));
    const switchHtml = renderToStaticMarkup(<LanguageSwitch locale={locale} page="workshop" course="seedance-masterclass" />);
    assert.ok(switchHtml.includes('href="/workshop/seedance-masterclass"'));
    assert.ok(switchHtml.includes('href="/en/workshop/seedance-masterclass"'));
  }
});

test('course is presented as an original GenYZ course with no external creator or video attribution', () => {
  const forbidden = /rourke|kieft|H0Ahmz2xuvs|e9ZupmL9BcM|youtube\.com|youtu\.be|verbatim|source tutorial|video nguồn|More Time For What|ShotDeck/i;
  for (const locale of ['vi', 'en'] as const) {
    const curriculum = workshopCurriculum(locale, 'seedance-masterclass');
    assert.equal(curriculum.source, undefined);
    assert.doesNotMatch(JSON.stringify(curriculum), forbidden);
  }
  for (const file of ['server/workshop-seedance-masterclass.ts', 'server/workshop-seedance-masterclass-prompts.ts', 'docs/workshop-seedance-masterclass.md', 'docs/workshop.md']) {
    assert.doesNotMatch(readFileSync(file, 'utf8'), /rourke|H0Ahmz2xuvs/i, file);
  }
});

test('every core and optional prompt reaches the classroom and bilingual workbook', () => {
  for (const locale of ['vi', 'en'] as const) {
    const curriculum = workshopCurriculum(locale, 'seedance-masterclass');
    const workbook = formatWorkshopWorkbook({ ...curriculum, progress: { current: 'story', completed: [] }, sessionExpiresAt: 0 }, locale);
    for (const [key, pair] of Object.entries(seedanceWorkedResponses)) assert.ok(workbook.includes(pair[locale === 'vi' ? 0 : 1]), `missing response ${key}`);
    const allSteps = curriculum.lessons.flatMap(l => [...l.steps, ...(l.techniques || []).flatMap(lab => lab.steps)]);
    const references = curriculum.lessons.find(l => l.id === 'references')!;
    const revisedPrompt = (filename: string): [string, string] => {
      const step = references.steps.find(s => s.save === `01-character/${filename}`)!;
      assert.ok(step.promptVi && step.prompt, filename);
      return [step.promptVi, step.prompt];
    };
    const currentPrompts = { ...seedanceCoursePrompts, portrait: revisedPrompt('lan-portrait.png'), turnaround: revisedPrompt('lan-turnaround.png'), outfit: revisedPrompt('lan-outfit.png') };
    assert.match(currentPrompts.portrait[1], /face filling most of the image/);
    assert.match(currentPrompts.outfit[1], /no visible mannequin, head, face, neck, skin, hands/);
    assert.match(currentPrompts.outfit[1], /soles of both shoes/);
    assert.match(currentPrompts.turnaround[1], /image 2 is the outfit/);
    for (const [key, [viPrompt, enPrompt]] of Object.entries(currentPrompts)) {
      assert.ok(workbook.includes(viPrompt) && workbook.includes(enPrompt), `missing practice ${key}`);
      const matching = allSteps.find(s => s.prompt === enPrompt && s.promptVi === viPrompt);
      assert.ok(matching, key);
      const html = renderToStaticMarkup(<StepPrompt step={matching} locale={locale} />);
      const blocks = Array.from(html.matchAll(/<pre[^>]*>([\s\S]*?)<\/pre>/g), m => unescapeHtml(m[1]));
      const viDisplay = formatWorkshopPrompt(viPrompt, 'vi', matching.promptFormat);
      const enDisplay = formatWorkshopPrompt(enPrompt, 'en', matching.promptFormat);
      assert.deepEqual(blocks.slice(0, 2), locale === 'vi' ? [viDisplay, enDisplay] : [enDisplay, viDisplay]);
      assert.match(matching.promptEvidence || '', /not yet test-run|chưa chạy thử/);
    }
  }
});

test('replacement includes beginner tool handoffs and preserves the three-shot state progression', () => {
  const en = seedanceMasterclassCurriculum('en');
  const workbook = formatWorkshopWorkbook({ ...en, progress: { current: 'story', completed: [] }, sessionExpiresAt: 0 }, 'en');
  for (const text of ['Use $imagegen', 'Nano Banana', 'GenYZ-prompt-guide.txt', 'shot-01-end.png', 'shot-02-end.png', 'three attempts', 'Existing completion marks', 'Export']) assert.ok(workbook.includes(text), text);
  assert.match(seedanceCoursePrompts.shot1[1], /unlit/);
  assert.match(seedanceCoursePrompts.shot2[1], /gradually glows/);
  assert.match(seedanceCoursePrompts.shot3[1], /still glowing/);
  assert.deepEqual(en.lessons.map(l => l.id), ['story', 'references', 'planning', 'frames', 'motion', 'review', 'delivery']);
  assert.ok(en.lessons.flatMap(l => l.techniques || []).every(lab => lab.title.startsWith('Optional')));
  assert.doesNotMatch(en.lessons.map(l => l.checks.join(' ')).join(' '), /voice|motion transfer|relight/i);
  for (const step of en.lessons.flatMap(l => [...l.steps, ...(l.techniques || []).flatMap(lab => lab.steps)])) {
    assert.ok(step.instruction && step.tool && step.save);
    assert.equal(step.testedExample, undefined);
  }
});

test('migration 0012 preserves every existing course policy/progress and leaves seedance-masterclass protected', () => {
  const sql = new DatabaseSync(':memory:');
  sql.exec('PRAGMA foreign_keys=ON');
  for (const file of readdirSync('migrations').filter(n => n.endsWith('.sql') && n < '0012').sort()) sql.exec(readFileSync(`migrations/${file}`, 'utf8'));
  sql.exec("INSERT INTO workshop_codes(id, code_hash, created_at, expires_at) VALUES ('keep','hash',1,9999999999)");
  for (const course of ['phoenix', 'clever-rat', 'five-levels', 'master-frame', 'directors-framework', 'fight-scenes', 'ai-cinema-workflow', 'visual-effects']) {
    sql.prepare('INSERT INTO workshop_course_progress VALUES (?,?,?,?)').run('keep', course, '["story"]', 'references');
    if (course !== 'phoenix') sql.prepare('INSERT INTO workshop_access VALUES (?,?,?,?,?)').run(course, 'partial', '["story"]', 'admin@example.test', 123);
  }
  const beforeProgress = sql.prepare('SELECT * FROM workshop_course_progress ORDER BY course_id').all();
  const beforePolicies = sql.prepare('SELECT * FROM workshop_access ORDER BY course_id').all();
  sql.exec(readFileSync('migrations/0012_workshop_seedance_masterclass.sql', 'utf8'));
  assert.deepEqual(sql.prepare('SELECT * FROM workshop_course_progress ORDER BY course_id').all(), beforeProgress);
  assert.deepEqual(sql.prepare('SELECT * FROM workshop_access ORDER BY course_id').all(), beforePolicies);
  assert.equal(sql.prepare("SELECT * FROM workshop_access WHERE course_id='seedance-masterclass'").get(), undefined);
  sql.exec("INSERT INTO workshop_course_progress VALUES ('keep','seedance-masterclass','[]','story')");
  assert.deepEqual(sql.prepare('PRAGMA foreign_key_check').all(), []);
  sql.exec("DELETE FROM workshop_codes WHERE id='keep'");
  assert.equal(sql.prepare('SELECT count(*) AS n FROM workshop_course_progress').get()!.n, 0);
  sql.close();
});

test('expanded mode exercises and worksheets are visible and included in both workbooks', () => {
  for (const locale of ['vi', 'en'] as const) {
    const c = workshopCurriculum(locale, 'seedance-masterclass');
    const all = c.lessons.flatMap(l => [...l.steps, ...(l.techniques || []).flatMap(t => t.steps)]);
    const book = formatWorkshopWorkbook({ ...c, progress: { current: 'story', completed: [] }, sessionExpiresAt: 0 }, locale, 'http://localhost:3116');
    for (const [key, [vi, en]] of Object.entries(seedance25Prompts)) {
      assert.ok(all.some(step => step.prompt === en && step.promptVi === vi), key);
      assert.ok(book.includes(vi) && book.includes(en), key);
    }
    const worksheet = all.find(step => step.resultText && !step.prompt)!;
    const html = renderToStaticMarkup(<StepPrompt step={worksheet} locale={locale} />);
    assert.ok(unescapeHtml(html).includes(worksheet.resultText!));
    assert.doesNotMatch(html, /undefined|NOT YET TESTED/);
    const archive = all.find(step => step.downloads?.some(file => file.src.endsWith('sd25-practice-pack.zip')))!;
    assert.ok(renderToStaticMarkup(<StepMedia step={archive} locale={locale} />).includes('sd25-practice-pack.zip'));
    assert.ok(book.includes('http://localhost:3116/api/workshop/examples/sd25-practice-pack.zip'));
    assert.ok(!c.lessons[0].steps.some(step => step.promptKind === 'video'));
    assert.ok(c.lessons[4].steps.some(step => step.prompt === seedanceCoursePrompts.shot1[1]));
    assert.doesNotMatch(book, /first-win|Bảng chọn công cụ:|Tool choice sheet:/);
    assert.deepEqual(c.lessons.map(lesson => lesson.id), ['story', 'references', 'planning', 'frames', 'motion', 'review', 'delivery']);
  }
});

test('reference branches name only their actual upload counts and generated assets retain evidence limits', () => {
  assert.doesNotMatch(seedance25Prompts.composeThree[1], /Image 4|four images/i);
  assert.doesNotMatch(seedance25Prompts.composeTwo[1], /Image 3|Image 4/i);
  const c = workshopCurriculum('en', 'seedance-masterclass');
  const compose = c.lessons[2].steps.find(step => step.prompt === seedanceCoursePrompts.startFrame[1])!;
  assert.match(compose.instruction, /do NOT use the four-image prompt with three files/);
  assert.match(c.lessons[4].checks[0], /video untested/);
  assert.match(c.lessons[5].checks[1], /animatic.*untested/);
  assert.match(c.preparation.note, /remain pending/);
  for (const asset of assetManifest.assets) {
    const path = `/api/workshop/examples/sd25-${asset.key}.png`;
    assert.equal(workshopMedia[path], 'image/png');
    assert.ok(readFileSync(`public${path}`).length > 1000);
  }
  const visuals = c.lessons.flatMap(l => l.visualExamples || []);
  assert.equal(c.lessons[1].visualExamples?.length, 1);
  const newSheet = visuals.find(v => v.id === 'lan-master-sheet-v4');
  assert.ok(newSheet);
  assert.match(newSheet.instruction, /six panels/);
  assert.deepEqual(newSheet.inputs.map(input => input.src), ['/api/workshop/examples/sd25-lan-face-gray-v2.png', '/api/workshop/examples/sd25-lan-outfit-ghost-v3.png', '/api/workshop/examples/sd25-lan-turnaround-v3.png']);
  assert.equal(newSheet.outputs.length, 1);
  assert.equal(newSheet.outputs[0].src, '/api/workshop/examples/sd25-lan-master-sheet-v4.png');
  assert.ok(!visuals.some(v => v.id === 'sd25-turnaround' || v.id === 'sd25-portrait'));
  assert.ok(renderToStaticMarkup(<WorkshopVisualExamples lesson={c.lessons[1]} locale="en" />).includes('Vietnamese translation is not yet test-run'));
  assert.equal(workshopMedia['/api/workshop/examples/sd25-practice-pack.zip'], 'application/zip');
  assert.equal(readFileSync('public/api/workshop/examples/sd25-practice-pack.zip').readUInt32LE(0), 0x04034b50);
});
