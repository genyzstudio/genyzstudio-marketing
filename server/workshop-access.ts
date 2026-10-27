import type { D1Database } from '@cloudflare/workers-types';
import { workshopCourses, type WorkshopAccessPolicy, type WorkshopCourseId } from '../content/workshop/access';
import { workshopImagePreview } from '../content/workshop/image-preview';
import { workshopCurriculum, type Curriculum } from './workshop-content';
import { workshopMedia, workshopFullCourseBundles } from './workshop-media';
import type { LessonStep } from '../content/workshop/types';

export const workshopAdminEmail = 'genyzstudio@gmail.com';
export async function readWorkshopPolicy(db: D1Database, course: WorkshopCourseId): Promise<WorkshopAccessPolicy> {
  const row = await db.prepare('SELECT mode, public_lessons FROM workshop_access WHERE course_id = ?1').bind(course).first<{ mode: WorkshopAccessPolicy['mode']; public_lessons: string }>();
  return row ? { mode: row.mode, publicLessons: JSON.parse(row.public_lessons) } : { mode: 'protected', publicLessons: [] };
}
export function publicCurriculum(curriculum: Curriculum, policy: WorkshopAccessPolicy): Curriculum {
  if (policy.mode === 'public') return curriculum;
  const publicStep = (step: LessonStep): LessonStep => ({ ...step, ...(step.downloads ? { downloads: step.downloads.filter(file => !Object.hasOwn(workshopFullCourseBundles, file.src)) } : {}) });
  const lessons = curriculum.lessons.filter(lesson => policy.mode === 'partial' && policy.publicLessons.includes(lesson.id)).map(lesson => ({
    ...lesson, steps: lesson.steps.map(publicStep),
    ...(lesson.techniques ? { techniques: lesson.techniques.map(lab => ({ ...lab, steps: lab.steps.map(publicStep) })) } : {}),
  }));
  const publicIds = new Set(lessons.map(lesson => lesson.id));
  // Shared preparation can contain later lesson prompts. Only a fully public course exposes it.
  return {
    courseTitle: curriculum.courseTitle, workbookName: curriculum.workbookName,
    phases: curriculum.phases,
    syllabus: curriculum.syllabus.map(item => publicIds.has(item.id) ? item : { ...item, summary: '', output: '' }),
    lessons, tools: [], glossary: [], preparation: { title: '', intro: '', steps: [], note: '' },
  };
}
function collectMedia(value: unknown, paths: Set<string>) {
  if (typeof value === 'string' && Object.hasOwn(workshopMedia, value)) {
    paths.add(value);
    if (value.endsWith('.png')) for (const width of [480, 1280]) paths.add(workshopImagePreview(value, width));
  } else if (Array.isArray(value)) value.forEach(item => collectMedia(item, paths));
  else if (value && typeof value === 'object') Object.values(value).forEach(item => collectMedia(item, paths));
}
export async function isPublicWorkshopMedia(db: D1Database, pathname: string): Promise<boolean> {
  if (Object.hasOwn(workshopFullCourseBundles, pathname)) {
    return (await readWorkshopPolicy(db, workshopFullCourseBundles[pathname])).mode === 'public';
  }
  // Assets shared with a public lesson are public. Never infer access from a caller's course query.
  for (const course of workshopCourses) {
    const policy = await readWorkshopPolicy(db, course);
    if (policy.mode === 'protected') continue;
    const paths = new Set<string>();
    for (const locale of ['vi', 'en'] as const) collectMedia(publicCurriculum(workshopCurriculum(locale, course), policy), paths);
    if (paths.has(pathname)) return true;
  }
  return false;
}
