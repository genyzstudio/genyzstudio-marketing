import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { StepPrompt } from '../components/workshop-classroom';
import { formatWorkshopPrompt } from '../content/workshop/prompt';
import demos from '../server/workshop-fight-demos.json';
import { fightScenesCurriculum } from '../server/workshop-fight-scenes';
import { formatWorkshopWorkbook } from '../content/workshop/workbook';

test('sentence breaks preserve tested prompt instructions, decimals and existing paragraphs', () => {
  for (const demo of demos) {
    const formatted = formatWorkshopPrompt(demo.prompt, 'vi');
    assert.ok(formatted.includes('\n'));
    assert.equal(formatted.replace(/\s+/g, ' '), demo.prompt.replace(/\s+/g, ' ').trim());
  }
  assert.equal(formatWorkshopPrompt('Use Seedance 2.5. Track at 1.25×.\n\nKeep the core safe.', 'en'), 'Use Seedance 2.5.\nTrack at 1.25×.\n\nKeep the core safe.');
});

test('both prompt languages start collapsed with associated accessible expand controls', () => {
  for (const locale of ['vi', 'en'] as const) {
    const html = renderToStaticMarkup(<StepPrompt locale={locale} step={{ title: 'Test', instruction: '', tool: '', save: '', prompt: 'Attack. Duck. Recover.', promptVi: 'Ra đòn. Né. Đứng vững.' }} />);
    assert.equal((html.match(/class="wk-prompt-collapsed"/g) || []).length, 2);
    assert.equal((html.match(/aria-expanded="false"/g) || []).length, 2);
    const ids = [...html.matchAll(/<pre[^>]* id="([^"]+)"/g)].map(match => match[1]);
    assert.equal(new Set(ids).size, 2);
    for (const id of ids) assert.ok(html.includes(`aria-controls="${id}"`));
    assert.ok(html.includes(locale === 'vi' ? 'Mở rộng prompt' : 'Expand prompt'));
  }
});


test('the action course retains learner outputs and separates corrected prompts from tested evidence', () => {
  for (const locale of ['vi', 'en'] as const) {
    const curriculum = fightScenesCurriculum(locale);
    const story = curriculum.lessons[0];
    assert.deepEqual(story.steps.map(step => step.save), ['intent.txt', 'readability.txt', 'three-controls.txt']);
    assert.equal(story.steps[0].tool, locale === 'vi' ? 'Sổ thực hành' : 'Workbook');
    assert.equal(story.steps.filter(step => step.media?.length).length, 1);
    assert.ok(curriculum.lessons[1].steps.at(-1)?.media?.[0].src.endsWith('fight-scene-tracking-v1.mp4'));
    assert.equal(curriculum.syllabus.at(-1)?.output, 'Guardians-action-workbook.txt');
    const review = curriculum.lessons.find(lesson => lesson.id === 'review')!;
    assert.equal(review.steps.at(-1)?.save, 'take-log.txt');
    const revisions = review.techniques![0].steps;
    assert.equal(revisions.length, 4);
    const workbook = formatWorkshopWorkbook({ ...curriculum, progress: { completed: [], current: 'story' }, sessionExpiresAt: 0 }, locale);
    assert.ok(workbook.includes(curriculum.lessons[4].steps[1].testedExample!.review));
    for (const step of revisions) {
      assert.ok(step.prompt && step.promptVi);
      assert.ok(!step.media);
      assert.match(step.promptEvidence!, locale === 'vi' ? /chưa chạy thử/ : /neither language has been tested/);
      assert.ok(workbook.includes(step.prompt));
      assert.ok(workbook.includes(step.promptVi));
    }
    assert.match(demos.find(demo => demo.key === 'slide')!.reviewEn, /crawls/);
    assert.match(demos.find(demo => demo.key === 'rigid')!.reviewEn, /broadly follows/);
  }
});
