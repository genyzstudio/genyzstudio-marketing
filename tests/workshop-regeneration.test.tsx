import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { workshopCurriculum } from '../server/workshop-content';
import { workshopMedia } from '../server/workshop-media';
import runs from '../server/workshop-regenerated-videos.json';

test('regenerated demonstrations retain the actual English run, translated Vietnamese and authenticated media', () => {
  assert.equal(runs.filter(run => run.course === 'directors-framework').length, 4);
  assert.equal(runs.filter(run => run.course === 'five-levels').length, 5);
  for (const locale of ['vi', 'en'] as const) {
    for (const run of runs) {
      const curriculum = workshopCurriculum(locale, run.course as 'five-levels' | 'directors-framework');
      const steps = curriculum.lessons.flatMap(lesson => lesson.steps);
      const examples = curriculum.lessons.flatMap(lesson => lesson.visualExamples || []);
      const src = `/api/workshop/examples/${run.file}.mp4`;
      const step = steps.find(item => item.media?.some(media => media.src === src));
      const example = examples.find(item => item.outputs.some(media => media.src === src));
      assert.ok(step || example, run.file);
      assert.equal(step?.prompt ?? example?.promptEn, run.promptEn);
      assert.equal(step?.promptVi ?? example?.promptVi, run.promptVi);
      const evidence = step?.promptEvidence ?? example?.settings ?? '';
      assert.ok(evidence.includes(run.sourceId));
      assert.match(evidence, locale === 'vi' ? /prompt đã chạy thực tế/ : /English prompt below was actually run/);
      assert.doesNotMatch(evidence, /output used the original Vietnamese|kết quả minh họa dùng prompt tiếng Việt/);
      for (const path of [src, `/api/workshop/examples/${run.file}-poster.jpg`, ...run.inputs.map(name => `/api/workshop/examples/${name}.png`)]) {
        assert.ok(workshopMedia[path], path);
        assert.ok(existsSync(`public${path}`), path);
      }
    }
    const master = JSON.stringify(workshopCurriculum(locale, 'master-frame'));
    assert.ok(!master.includes('.mp4'));
    const final = workshopCurriculum(locale, 'five-levels').lessons.find(lesson => lesson.id === 'delivery')!;
    assert.equal(final.example.video, '/api/workshop/examples/last-lantern-edit-vi-v2.mp4');
    assert.ok(final.visualExamples?.some(example => example.id === 'edit')); // Original diagnostic remains inspectable.
    assert.ok(final.visualExamples?.some(example => example.id === 'edit-v2'));
  }
});
