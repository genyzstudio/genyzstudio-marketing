import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { renderToStaticMarkup } from 'react-dom/server';
import { workshopCurriculum } from '../server/workshop-content';
import { publicCurriculum } from '../server/workshop-access';
import { workshopMedia } from '../server/workshop-media';
import { seedanceReadyFrames, seedanceReadyFramePrompts, seedanceBlackEnding } from '../server/workshop-seedance-ready-frames';
import { formatWorkshopWorkbook } from '../content/workshop/workbook';
import { StepMedia, StepPrompt } from '../components/workshop-classroom';

test('ready-made frames have matching prompts, original downloads, workbook handoffs and lesson-scoped access', async () => {
  for (const locale of ['vi', 'en'] as const) {
    const course = workshopCurriculum(locale, 'seedance-masterclass');
    const lab = course.lessons.find(l => l.id === 'motion')!.techniques!.find(l => l.id === 'sd25-ready-frames')!;
    assert.equal(lab.steps.length, 3);
    const workbook = formatWorkshopWorkbook({ ...course, progress: {current:'motion', completed:[]}, sessionExpiresAt:0 }, locale);
    for (const [index, frame] of seedanceReadyFrames.entries()) {
      const step = lab.steps[index];
      const src = `/api/workshop/examples/${frame.file}`;
      assert.equal(step.media?.[0].src, src);
      assert.equal(step.referenceImages?.[0].src, src);
      assert.equal(step.prompt, seedanceReadyFramePrompts[index][1]);
      assert.equal(step.promptVi, seedanceReadyFramePrompts[index][0]);
      assert.equal(step.promptKind, 'video');
      assert.equal(step.testedExample, undefined);
      assert.match(step.promptEvidence!, /chưa chạy thử|untested/);
      assert.equal(workshopMedia[src], 'image/png');
      assert.ok(renderToStaticMarkup(<StepMedia step={step} locale={locale}/>).includes(src));
      assert.ok(renderToStaticMarkup(<StepPrompt step={step} locale={locale}/>).includes('pre'));
      assert.ok(workbook.includes(src) && workbook.includes(step.prompt!));
      assert.ok(!JSON.stringify(publicCurriculum(course,{mode:'partial',publicLessons:['story']})).includes(src));
      assert.ok(JSON.stringify(publicCurriculum(course,{mode:'partial',publicLessons:['motion']})).includes(src));
      if (locale === 'vi') {
        const meta = await sharp(readFileSync(`public${src}`)).metadata();
        assert.equal(meta.width, frame.width);
        assert.equal(meta.height, frame.height);
      }
    }
    const black = course.lessons.find(l=>l.id==='delivery')!.steps.find(s=>s.downloads?.some(d=>d.src.endsWith(seedanceBlackEnding)))!;
    assert.ok(black);
    assert.equal(black.prompt, undefined);
    assert.ok(workbook.includes(seedanceBlackEnding));
  }
  assert.match(seedanceReadyFramePrompts[0][1], /unlit.*throughout/);
  assert.match(seedanceReadyFramePrompts[1][1], /lantern is unlit/);
  assert.match(seedanceReadyFramePrompts[2][1], /already glowing/);
  const black = await sharp(`public/api/workshop/examples/${seedanceBlackEnding}`).stats();
  assert.ok(black.channels.every(channel=>channel.max===0));
});
