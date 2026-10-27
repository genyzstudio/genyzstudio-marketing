import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync, readdirSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import { parseDocument } from 'yaml';
import { renderToStaticMarkup } from 'react-dom/server';
import { aiCinemaCurriculum } from '../server/workshop-ai-cinema';
import { cinemaYaml } from '../server/workshop-ai-cinema-yaml';
import { formatWorkshopPrompt } from '../content/workshop/prompt';
import { formatWorkshopWorkbook } from '../content/workshop/workbook';
import { StepPrompt } from '../components/workshop-classroom';

function unescapeHtml(text: string) {
  return text.replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
}

test('YAML survives localized display, collapsed prompt copying format and workbook export byte for byte', () => {
  for (const locale of ['vi', 'en'] as const) {
    const curriculum = aiCinemaCurriculum(locale);
    const yamlStep = curriculum.lessons.at(-1)!.steps.find(step => step.promptFormat === 'yaml')!;
    const html = renderToStaticMarkup(<StepPrompt step={yamlStep} locale={locale} />);
    const displayed = Array.from(html.matchAll(/<pre[^>]*>([\s\S]*?)<\/pre>/g), match => unescapeHtml(match[1]));
    assert.deepEqual(displayed, [cinemaYaml(locale), cinemaYaml(locale === 'en' ? 'vi' : 'en')]);
    assert.match(html, /wk-prompt-collapsed/);
    const workbook = formatWorkshopWorkbook({ ...curriculum, progress: {current:'story',completed:[]}, sessionExpiresAt: 0 }, locale);
    for (const language of ['vi', 'en'] as const) {
      const raw = cinemaYaml(language);
      assert.equal(formatWorkshopPrompt(raw, language, yamlStep.promptFormat), raw);
      assert.ok(workbook.includes(raw));
      const document = parseDocument(raw, {uniqueKeys: true});
      assert.deepEqual(document.errors, []);
      const data = document.toJS();
      assert.equal(data.duration_seconds, 15);
      assert.equal(data.aspect_ratio, '16:9');
      assert.match(data.character_modeling.base, /@image1/);
      const shots = Object.entries(data.cinematic_storyboard) as [string, Record<string,string>][];
      assert.equal(shots.length, 6);
      let endpoint = 0;
      for (const [key, shot] of shots) {
        const [start, end] = key.split('_').map(Number);
        assert.equal(start, endpoint, 'no gaps or overlaps');
        assert.ok(end > start);
        endpoint = end;
        for (const field of ['camera','action','lighting','sfx','transition']) assert.ok(shot[field]?.length > 5);
      }
      assert.equal(endpoint, 15);
      assert.deepEqual(shots.map(([key]) => key.split('_').slice(0,2).map(Number)), [[0,2],[2,4],[4,6],[6,8],[8,12],[12,15]]);
    }
  }
});

test('bilingual cinema course has equivalent steps, paired prompts and explicit untested provenance', () => {
  const vi = aiCinemaCurriculum('vi');
  const en = aiCinemaCurriculum('en');
  assert.deepEqual(vi.lessons.map(l => l.id), en.lessons.map(l => l.id));
  for (let i = 0; i < vi.lessons.length; i++) {
    const left = vi.lessons[i]; const right = en.lessons[i];
    assert.equal(left.steps.length, right.steps.length);
    assert.notEqual(left.goal, right.goal);
    assert.equal(left.example.href, right.example.href);
    for (const lesson of [left, right]) {
      for (const step of [...lesson.steps, ...(lesson.techniques || []).flatMap(lab => lab.steps)]) {
        if (!step.prompt) continue;
        assert.ok(step.promptVi);
        assert.ok(step.promptEvidence);
        assert.equal(step.testedExample, undefined);
      }
    }
    assert.deepEqual(left.steps.map(s => s.prompt), right.steps.map(s => s.prompt));
    assert.deepEqual(left.steps.map(s => s.promptVi), right.steps.map(s => s.promptVi));
  }
});

test('migration 0010 preserves existing policy and progress rows and supports the new protected course', () => {
  const sql = new DatabaseSync(':memory:');
  sql.exec('PRAGMA foreign_keys=ON');
  for (const file of readdirSync('migrations').filter(name => name.endsWith('.sql') && name < '0010').sort()) sql.exec(readFileSync(`migrations/${file}`, 'utf8'));
  sql.exec("INSERT INTO workshop_codes(id, code_hash, created_at, expires_at) VALUES ('test-user','test-hash',1,9999999999)");
  sql.exec(`INSERT INTO workshop_course_progress VALUES ('test-user','fight-scenes','["story"]','references')`);
  sql.exec(`INSERT INTO workshop_access VALUES ('fight-scenes','partial','["story"]','admin@example.test',123)`);
  const progress = sql.prepare('SELECT * FROM workshop_course_progress').all();
  const policies = sql.prepare('SELECT * FROM workshop_access').all();
  sql.exec(readFileSync('migrations/0010_workshop_ai_cinema.sql', 'utf8'));
  assert.deepEqual(sql.prepare('SELECT * FROM workshop_course_progress').all(), progress);
  assert.deepEqual(sql.prepare('SELECT * FROM workshop_access').all(), policies);
  assert.equal(sql.prepare("SELECT * FROM workshop_access WHERE course_id='ai-cinema-workflow'").get(), undefined);
  sql.exec("INSERT INTO workshop_course_progress VALUES ('test-user','ai-cinema-workflow','[]','story')");
  sql.exec("DELETE FROM workshop_codes WHERE id='test-user'");
  assert.equal(sql.prepare('SELECT COUNT(*) AS n FROM workshop_course_progress').get()!.n, 0);
  sql.close();
});
