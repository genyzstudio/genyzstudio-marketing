import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { workshopCurriculum } from '../server/workshop-content';
import { WorkshopVisualExamples } from '../components/workshop-classroom';
import { formatWorkshopWorkbook } from '../content/workshop/workbook';
import framePrompts from '../server/workshop-frame-prompts.json';
import frameEvidence from '../server/workshop-frame-evidence.json';
import directorRuns from '../server/workshop-director-test-results.json';

test('Master the Frame stays image-only and preserves original prompt/output lineage in both languages', () => {
  for (const locale of ['vi','en'] as const) {
    const c = workshopCurriculum(locale,'master-frame');
    assert.equal(c.lessons.length,6);
    assert.equal(c.lessons.flatMap(l=>l.steps).length,14);
    assert.match(c.preparation.steps.at(-1)!.text, locale === 'vi' ? /không cần tạo video/ : /no video generation is required/);
    for (const [key, evidence] of Object.entries(frameEvidence)) {
      const step = c.lessons.flatMap(l=>l.steps).find(s=>s.testedExample?.image.endsWith(`${evidence.file}.png`))!;
      assert.equal(step.promptVi,framePrompts[key as keyof typeof framePrompts]);
      assert.ok(step.prompt && step.prompt !== step.promptVi);
      assert.equal(step.promptLanguage,'en');
      assert.ok(!step.media?.some(media=>media.kind==='video'));
      assert.deepEqual(step.referenceImages?.map(ref=>ref.src),evidence.inputs.map(name=>`/api/workshop/examples/${name}.png`));
    }
    const hero = c.lessons[0].steps[0];
    assert.match(hero.promptEvidence!, locale === 'vi' ? /không đính kèm ảnh tham chiếu/ : /No reference image was attached/);
    for (const guide of c.preparation.visualGuide!) {
      assert.ok(guide.recreation?.promptEn);
      assert.match(guide.recreation!.evidence,locale==='vi'?/chưa chạy thử/:/has not been run/);
    }
  }
});

test('director translations preserve every original run and reference and keep failed takes diagnostic', () => {
  for (const locale of ['vi','en'] as const) {
    const c = workshopCurriculum(locale,'directors-framework');
    const steps = c.lessons.flatMap(l=>l.steps);
    const examples = c.lessons.flatMap(l=>l.visualExamples || []);
    for (const run of directorRuns) {
      const step = steps.find(s=>s.promptVi===run.prompt);
      const example = examples.find(item=>item.id===run.file);
      assert.ok(step || example,run.file);
      assert.ok((step?.prompt || example?.promptEn) !== run.prompt);
      assert.match(step?.promptEvidence || example?.settings || '',locale==='vi'?/Bản tiếng Anh|bản tiếng Anh/:/English version|English translation/);
      assert.deepEqual(step?.referenceImages?.map(ref=>ref.src) || example?.inputs.map(ref=>ref.src),run.inputs.map(name=>`/api/workshop/examples/${name}.png`));
    }
  }
});

test('comparison prompts have an English reading version without replacing the tested Vietnamese record', () => {
  for (const locale of ['vi','en'] as const) {
    const c=workshopCurriculum(locale,'five-levels');
    const workbook=formatWorkshopWorkbook({...c,progress:{current:'story',completed:[]},sessionExpiresAt:0},locale);
    for (const lesson of c.lessons) {
      const markup=renderToStaticMarkup(<WorkshopVisualExamples lesson={lesson} locale={locale}/>);
      for (const example of lesson.visualExamples || []) {
        if (!example.promptVi) continue;
        assert.ok(example.promptEn,example.id);
        assert.ok(workbook.includes(example.promptVi));
        assert.ok(workbook.includes(example.promptEn));
        assert.match(markup,/<pre lang="en"/);
        assert.match(markup,/<pre lang="vi"/);
        assert.match(markup,/aria-expanded="false"/);
      }
    }
  }
});

test('locale rendering does not mutate archived examples and image-only labs never acquire video outputs', () => {
  for (const course of ['clever-rat','five-levels','master-frame','directors-framework'] as const) {
    const before=JSON.stringify(workshopCurriculum('vi',course));
    workshopCurriculum('en',course);
    assert.equal(JSON.stringify(workshopCurriculum('vi',course)),before,course);
  }
  const master=workshopCurriculum('en','master-frame');
  const steps=master.lessons.flatMap(l=>[...l.steps,...(l.techniques||[]).flatMap(lab=>lab.steps)]);
  assert.ok(steps.every(s=>s.promptKind!=='video' && !s.media?.some(m=>m.kind==='video')));
  const rewrite=steps.find(s=>s.save==='shield-blocking.png + review.txt')!;
  assert.ok(rewrite && !rewrite.testedExample && !rewrite.media);
  assert.match(rewrite.promptEvidence!,/Neither language/);
  assert.match(rewrite.prompt!,/between the Light Collector and the turquoise core/);
});
