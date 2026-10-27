import { visualEffectsCurriculum } from './workshop-visual-effects';
import { seedanceMasterclassCurriculum } from './workshop-seedance-masterclass';
import { polishSeedanceVietnamese } from './workshop-seedance-vi-editorial';
import { addSeedanceDiagrams } from './workshop-seedance-diagrams';
import { addSeedanceStory } from './workshop-seedance-story';
import { addSeedanceReadyFrames } from './workshop-seedance-ready-frames';
import { formatSeedanceExplanations } from './workshop-seedance-reading';
import { adaptSeedanceCharacterLesson } from './workshop-seedance-character';
import { localizeWorkshopPrompts } from './workshop-prompt-localization';
import { fightScenesCurriculum } from './workshop-fight-scenes';
import type { WorkshopContent } from '../content/workshop/types';
import { fiveLevelsCurriculum } from './workshop-five-levels';
import { cleverRatCurriculum } from './workshop-clever-rat';
import { masterFrameCurriculum } from './workshop-master-frame';
import { directorsFrameworkCurriculum } from './workshop-directors-framework';
import { aiCinemaCurriculum } from './workshop-ai-cinema';
import { addFoundationVisualTargets } from './workshop-visual-targets-foundations';
import { addMotionVisualTargets } from './workshop-visual-targets-motion';
import { addProductionVisualTargets } from './workshop-visual-targets-production';
import visualAssets from './workshop-visual-assets.json';
export type Curriculum = Omit<WorkshopContent, 'progress' | 'sessionExpiresAt'>;
export type WorkshopCourse = 'clever-rat' | 'five-levels' | 'master-frame' | 'directors-framework' | 'fight-scenes' | 'ai-cinema-workflow' | 'visual-effects' | 'seedance-masterclass';
export function workshopCurriculum(locale: 'vi' | 'en', course: WorkshopCourse = 'clever-rat'): Curriculum {
  const curriculum = course === 'seedance-masterclass' ? seedanceMasterclassCurriculum(locale) : course === 'visual-effects' ? visualEffectsCurriculum(locale) : course === 'ai-cinema-workflow' ? aiCinemaCurriculum(locale) : course === 'fight-scenes' ? fightScenesCurriculum(locale) : course === 'directors-framework' ? directorsFrameworkCurriculum(locale) : course === 'master-frame' ? masterFrameCurriculum(locale) : course === 'five-levels' ? fiveLevelsCurriculum(locale) : cleverRatCurriculum(locale);
  addFoundationVisualTargets(curriculum, locale, course);
  addMotionVisualTargets(curriculum, locale, course);
  addProductionVisualTargets(curriculum, locale, course);
  if (course === 'seedance-masterclass') addSeedanceDiagrams(curriculum, locale);
  if (locale === 'vi' && course === 'seedance-masterclass') polishSeedanceVietnamese(curriculum);
  if (course === 'seedance-masterclass') addSeedanceStory(curriculum, locale);
  if (course === 'seedance-masterclass') addSeedanceReadyFrames(curriculum, locale);
  if (course === 'seedance-masterclass') formatSeedanceExplanations(curriculum, locale);
  if (course === 'seedance-masterclass') adaptSeedanceCharacterLesson(curriculum, locale);
  if (course === 'seedance-masterclass') {
    const story = curriculum.lessons.find(lesson => lesson.id === 'story')!;
    const planIndex = story.steps.findIndex(step => step.save === '00-project/story-and-shots.txt');
    if (planIndex < 0) throw new Error('Missing Seedance story planning step');
    const [plan] = story.steps.splice(planIndex, 1);
    story.steps.unshift(plan);
  }
  const dimensions = new Map(visualAssets.map(asset => [`/api/workshop/examples/${asset.name}`, asset]));
  for (const lesson of curriculum.lessons) {
    for (const step of [...lesson.steps, ...(lesson.techniques ?? []).flatMap(lab => lab.steps)]) {
      const target = step.visualTarget;
      const asset = target && dimensions.get(target.image);
      if (target && asset) { target.width = asset.width; target.height = asset.height; }
    }
  }
  return localizeWorkshopPrompts(curriculum, locale);
}
