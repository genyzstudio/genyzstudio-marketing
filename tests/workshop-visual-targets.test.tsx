import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { renderToStaticMarkup } from 'react-dom/server';
import type { D1Database } from '@cloudflare/workers-types';
import { workshopCourses } from '../content/workshop/access';
import { workshopCurriculum } from '../server/workshop-content';
import { workshopMedia } from '../server/workshop-media';
import { isPublicWorkshopMedia } from '../server/workshop-access';
import { formatWorkshopWorkbook } from '../content/workshop/workbook';
import { StepVisualTarget } from '../components/workshop-classroom';
import visualAssets from '../server/workshop-visual-assets.json';

test('every visual target has a real registered image and both locales use the same assets', async () => {
  const used = new Set<string>();
  const checked = new Set<string>();
  for (const course of workshopCourses) {
    const editions = (['en', 'vi'] as const).map(locale => workshopCurriculum(locale, course));
    const steps = editions.map(c => c.lessons.flatMap(l => [...l.steps, ...(l.techniques ?? []).flatMap(t => t.steps)]));
    assert.deepEqual(steps[0].map(s => s.visualTarget?.image), steps[1].map(s => s.visualTarget?.image), course);
    for (const step of steps[0]) {
      const target = step.visualTarget;
      if (!target) continue;
      assert.ok(target.alt.trim() && target.caption.trim());
      assert.ok(workshopMedia[target.image], target.image);
      used.add(target.image);
      if (checked.has(target.image)) continue;
      checked.add(target.image);
      const metadata = await sharp(readFileSync(`public${target.image}`)).metadata();
      assert.equal(target.width, metadata.width, `${target.image} width`);
      assert.equal(target.height, metadata.height, `${target.image} height`);
    }
  }
  for (const asset of visualAssets) assert.ok(used.has(`/api/workshop/examples/${asset.name}`), `Unused generated asset: ${asset.name}`);
});

test('illustrations render and export their provenance without changing prompt evidence', () => {
  for (const locale of ['en', 'vi'] as const) {
    const course = workshopCurriculum(locale, 'ai-cinema-workflow');
    const step = course.lessons[0].steps[1];
    assert.equal(step.testedExample, undefined);
    const html = renderToStaticMarkup(<StepVisualTarget step={step} locale={locale} />);
    assert.ok(html.includes('GPT Image'));
    assert.ok(html.includes('preview-480.webp'));
    assert.ok(html.includes('target="_blank"'));
    assert.ok(html.includes(locale === 'en' ? 'cannot verify motion or timing' : 'không xác nhận được chuyển động'));
    const workbook = formatWorkshopWorkbook({ ...course, progress: {current: 'story', completed: []}, sessionExpiresAt: 0 }, locale);
    assert.ok(workbook.includes(step.visualTarget!.image));
    assert.ok(workbook.includes(step.visualTarget!.caption));
    assert.match(workbook, /GPT IMAGE ILLUSTRATION|ẢNH MINH HỌA GPT IMAGE/);
  }
});

test('new originals and previews inherit access only from the lessons that reference them', async () => {
  let publicLessons: string[] = [];
  const db = { prepare: () => ({ bind: (course: string) => ({ first: async () => course === 'ai-cinema-workflow'
    ? {mode: 'partial', public_lessons: JSON.stringify(publicLessons)}
    : {mode: 'protected', public_lessons: '[]'} }) }) } as unknown as D1Database;
  const character = '/api/workshop/examples/wv-cinema-character.png';
  const preview = '/api/workshop/examples/wv-cinema-character-preview-480.webp';
  assert.equal(await isPublicWorkshopMedia(db, character), false);
  publicLessons = ['story'];
  assert.equal(await isPublicWorkshopMedia(db, character), true);
  assert.equal(await isPublicWorkshopMedia(db, preview), true);
  assert.equal(await isPublicWorkshopMedia(db, '/api/workshop/examples/wv-cinema-cuts.png'), false);
});
