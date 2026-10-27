import assert from 'node:assert/strict';
import { test } from 'node:test';
import { workshopCurriculum } from '../server/workshop-content';
import { seedanceStory } from '../server/workshop-seedance-story';
import { seedanceCoursePrompts } from '../server/workshop-seedance-masterclass-prompts';
import { formatWorkshopWorkbook } from '../content/workshop/workbook';

test('the suspense story and sound-edit handoff reach both classrooms and workbooks', () => {
  for (const locale of ['vi', 'en'] as const) {
    const course = workshopCurriculum(locale, 'seedance-masterclass');
    const index = locale === 'vi' ? 0 : 1;
    const story = course.lessons.find(lesson => lesson.id === 'story')!;
    const plan = story.steps.find(step => step.save === '00-project/story-and-shots.txt')!;
    assert.equal(plan.resultText, seedanceStory.overview[index]);
    assert.ok(plan.resultTitle);
    assert.equal(story.steps[0], plan);
    assert.equal(story.steps.length, 3);
    assert.ok(!story.steps.some(step => step.resultTitle?.includes('ảnh đầu') || step.resultTitle?.includes('starting-frame')));
    assert.ok(course.lessons.find(lesson => lesson.id === 'motion')!.steps.some(step => step.resultTitle?.includes('ảnh đầu') || step.resultTitle?.includes('starting-frame')));
    assert.doesNotMatch(JSON.stringify(story), /draft_job_id|startEndFrame|seedance_2_5/);
    assert.equal(plan.prompt, seedanceCoursePrompts.story[1]);
    assert.ok(course.preparation.intro.includes(seedanceStory.title[index]));
    assert.doesNotMatch(JSON.stringify(course), /Đèn nhỏ, đường về|A Light to Follow/);
    const delivery = course.lessons.find(lesson => lesson.id === 'delivery')!;
    assert.equal(delivery.steps[0].resultText, seedanceStory.script[index]);
    const record = delivery.steps.findIndex(step => step.save.includes('call-original.m4a'));
    const ending = delivery.steps.findIndex(step => step.save.includes('black-end.png'));
    const exportIndex = delivery.steps.findIndex(step => step.save.includes('GenYZ-Lan-final.mp4'));
    assert.ok(record > 0 && ending > record && exportIndex > ending);
    const workbook = formatWorkshopWorkbook({ ...course, progress: { current: 'story', completed: [] }, sessionExpiresAt: 0 }, locale);
    for (const step of [plan, delivery.steps[record], delivery.steps[ending], delivery.steps[exportIndex]]) {
      assert.ok(workbook.includes(step.instruction));
    }
    assert.ok(workbook.includes(seedanceStory.script[index]));
    assert.match(course.lessons.find(lesson => lesson.id === 'review')!.techniques!.find(lab => lab.id === 'voice-performance')!.input, /bài thử giọng nói riêng|separate speech exercise/);
  }
  // Keep the call in the editor. Video prompts must not request the offscreen
  // speaker or the black ending, and the three prop states must remain intact.
  assert.match(seedanceCoursePrompts.shot1[1], /unlit/);
  assert.match(seedanceCoursePrompts.shot2[1], /gradually glows/);
  assert.match(seedanceCoursePrompts.shot3[1], /still glowing.*mouth closed/);
  for (const prompt of [seedanceCoursePrompts.shot1, seedanceCoursePrompts.shot2, seedanceCoursePrompts.shot3]) {
    assert.doesNotMatch(prompt.join(' '), /Về thôi, Lan|cut to black|cắt đen/i);
  }
});
