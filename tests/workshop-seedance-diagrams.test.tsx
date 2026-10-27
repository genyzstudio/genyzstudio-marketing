import assert from 'node:assert/strict';
import { test } from 'node:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { workshopCurriculum } from '../server/workshop-content';
import { publicCurriculum } from '../server/workshop-access';
import { StepDiagram } from '../components/workshop-classroom';
import { formatWorkshopWorkbook } from '../content/workshop/workbook';

test('Seedance diagrams sit beside the correct steps in both languages and appear in the workbook', () => {
  for (const locale of ['vi', 'en'] as const) {
    const course = workshopCurriculum(locale, 'seedance-masterclass');
    const lookup = (lesson: string, index: number) => course.lessons.find(l => l.id === lesson)!.steps[index];
    assert.equal(lookup('planning', 3).diagram?.kind, 'compose');
    assert.equal(lookup('motion', 1).diagram?.kind, 'upload');
    assert.equal(lookup('review', 1).diagram?.kind, 'cut');
    for (const step of [lookup('planning', 3), lookup('motion', 1), lookup('review', 1)]) {
      const html = renderToStaticMarkup(<StepDiagram step={step} />);
      assert.ok(html.includes(step.diagram!.title));
      assert.ok(html.includes(step.diagram!.caption));
      assert.ok(html.includes('<ol'));
      const workbook = formatWorkshopWorkbook({ ...course, progress: {current: 'story', completed: []}, sessionExpiresAt: 0 }, locale);
      assert.ok(workbook.includes(step.diagram!.title));
      assert.ok(workbook.includes(step.diagram!.caption));
    }
    assert.equal(lookup('planning', 3).visualTarget, undefined);
    assert.equal(lookup('review', 1).visualTarget, undefined);
    const partial = publicCurriculum(course, {mode:'partial', publicLessons:['story']});
    assert.equal(partial.lessons.length, 1);
    assert.ok(!JSON.stringify(partial).includes(lookup('review', 1).diagram!.title));
  }
});
