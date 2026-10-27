import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync, readdirSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import { parseDocument } from 'yaml';
import { renderToStaticMarkup } from 'react-dom/server';
import { visualEffectsCurriculum, visualEffectsSource, visualEffectsYaml, visualEffectsTechniqueKeys } from '../server/workshop-visual-effects';
import { workshopCurriculum } from '../server/workshop-content';
import { StepPrompt, WorkshopClassroom } from '../components/workshop-classroom';
import { LanguageSwitch } from '../components/language-switch';
import { formatWorkshopWorkbook } from '../content/workshop/workbook';

test('visual effects preserves the selected source, all six techniques in order and bilingual practice', () => {
  const vi = visualEffectsCurriculum('vi');
  const en = visualEffectsCurriculum('en');
  assert.equal(vi.source!.href, visualEffectsSource);
  assert.deepEqual(visualEffectsTechniqueKeys, ['led-volume', 'practical-fire', 'wire-suspension', 'practical-rain', 'physical-miniatures', 'hybrid-compositing']);
  assert.equal(vi.lessons.length, 9);
  assert.deepEqual(vi.lessons.map(l => l.id), vi.syllabus.map(l => l.id));
  assert.deepEqual(vi.lessons.slice(0,6).map(l => new URL(l.example.href!).searchParams.get('t')), ['24', '87', '155', '236', '285', '362']);
  for (let i=0; i<9; i++) {
    assert.equal(vi.lessons[i].steps.length, en.lessons[i].steps.length);
    assert.notEqual(vi.lessons[i].goal, en.lessons[i].goal);
    assert.notEqual(vi.lessons[i].terms, en.lessons[i].terms);
    assert.equal(vi.lessons[i].example.href, en.lessons[i].example.href);
    assert.ok(vi.lessons[i].checks.length >= 3);
  }
  for (const locale of ['vi', 'en'] as const) {
    const curriculum = workshopCurriculum(locale, 'visual-effects');
    const html = renderToStaticMarkup(<WorkshopClassroom locale={locale} course="visual-effects" />);
    assert.ok(!html.includes('cinematic_storyboard:'));
    assert.ok(!html.includes(curriculum.preparation.intro));
    const switchHtml = renderToStaticMarkup(<LanguageSwitch locale={locale} page="workshop" course="visual-effects" />);
    assert.ok(switchHtml.includes('href="/workshop/visual-effects"'));
    assert.ok(switchHtml.includes('href="/en/workshop/visual-effects"'));
  }
});

test('all twelve YAML prompts parse, cover exactly five seconds and survive display and workbook export', () => {
  for (const locale of ['vi', 'en'] as const) {
    const curriculum = workshopCurriculum(locale, 'visual-effects');
    const workbook = formatWorkshopWorkbook({...curriculum, progress: {current:'story',completed:[]}, sessionExpiresAt: 0}, locale);
    for (let i=0; i<6; i++) {
      const prompt = curriculum.lessons[i].steps.find(step => step.prompt)!;
      assert.ok(prompt.promptEvidence);
      assert.equal(prompt.testedExample, undefined);
      const html = renderToStaticMarkup(<StepPrompt step={prompt} locale={locale} />);
      const blocks = Array.from(html.matchAll(/<pre[^>]*>([\s\S]*?)<\/pre>/g), m => m[1].replace(/&quot;/g,'"').replace(/&#x27;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&'));
      assert.deepEqual(blocks, [visualEffectsYaml(i, locale), visualEffectsYaml(i, locale === 'vi' ? 'en' : 'vi')]);
      for (const language of ['vi','en'] as const) {
        const raw = visualEffectsYaml(i, language);
        assert.ok(workbook.includes(raw));
        const parsed = parseDocument(raw, {uniqueKeys: true});
        assert.deepEqual(parsed.errors, []);
        const data = parsed.toJS();
        assert.equal(data.duration_seconds, 5);
        assert.equal(data.technique, visualEffectsTechniqueKeys[i]);
        for (const key of ['scene','lighting','texture','physics','camera','atmosphere','emotion']) assert.ok(data[key].length > 10);
        let end = 0;
        for (const beat of data.cinematic_storyboard) { assert.equal(beat.start_seconds, end); assert.ok(beat.end_seconds > end); end = beat.end_seconds; }
        assert.equal(end, 5);
      }
    }
  }
});

test('migration 0011 preserves every existing course policy/progress and leaves visual effects protected', () => {
  const sql = new DatabaseSync(':memory:');
  sql.exec('PRAGMA foreign_keys=ON');
  for (const file of readdirSync('migrations').filter(name => name.endsWith('.sql') && name < '0011').sort()) sql.exec(readFileSync(`migrations/${file}`, 'utf8'));
  sql.exec("INSERT INTO workshop_codes(id, code_hash, created_at, expires_at) VALUES ('keep','hash',1,9999999999)");
  for (const course of ['phoenix','clever-rat','five-levels','master-frame','directors-framework','fight-scenes','ai-cinema-workflow']) {
    sql.prepare('INSERT INTO workshop_course_progress VALUES (?,?,?,?)').run('keep', course, '["story"]', 'references');
    if (course !== 'phoenix') sql.prepare('INSERT INTO workshop_access VALUES (?,?,?,?,?)').run(course, 'partial', '["story"]', 'admin@example.test', 123);
  }
  const beforeProgress = sql.prepare('SELECT * FROM workshop_course_progress ORDER BY course_id').all();
  const beforePolicies = sql.prepare('SELECT * FROM workshop_access ORDER BY course_id').all();
  sql.exec(readFileSync('migrations/0011_workshop_visual_effects.sql','utf8'));
  assert.deepEqual(sql.prepare('SELECT * FROM workshop_course_progress ORDER BY course_id').all(), beforeProgress);
  assert.deepEqual(sql.prepare('SELECT * FROM workshop_access ORDER BY course_id').all(), beforePolicies);
  assert.equal(sql.prepare("SELECT * FROM workshop_access WHERE course_id='visual-effects'").get(), undefined);
  sql.exec("INSERT INTO workshop_course_progress VALUES ('keep','visual-effects','[]','story')");
  assert.deepEqual(sql.prepare('PRAGMA foreign_key_check').all(), []);
  sql.exec("DELETE FROM workshop_codes WHERE id='keep'");
  assert.equal(sql.prepare('SELECT count(*) AS n FROM workshop_course_progress').get()!.n, 0);
  sql.close();
});
