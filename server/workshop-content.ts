import { localizeWorkshopPrompts } from './workshop-prompt-localization';
import { fightScenesCurriculum } from './workshop-fight-scenes';
import type { WorkshopContent } from '../content/workshop/types';
import { fiveLevelsCurriculum } from './workshop-five-levels';
import { cleverRatCurriculum } from './workshop-clever-rat';
import { masterFrameCurriculum } from './workshop-master-frame';
import { directorsFrameworkCurriculum } from './workshop-directors-framework';
export type Curriculum = Omit<WorkshopContent, 'progress' | 'sessionExpiresAt'>;
export type WorkshopCourse = 'clever-rat' | 'five-levels' | 'master-frame' | 'directors-framework' | 'fight-scenes';
export function workshopCurriculum(locale: 'vi' | 'en', course: WorkshopCourse = 'clever-rat'): Curriculum {
  const curriculum = course === 'fight-scenes' ? fightScenesCurriculum(locale) : course === 'directors-framework' ? directorsFrameworkCurriculum(locale) : course === 'master-frame' ? masterFrameCurriculum(locale) : course === 'five-levels' ? fiveLevelsCurriculum(locale) : cleverRatCurriculum(locale);
  return localizeWorkshopPrompts(curriculum, locale);
}
