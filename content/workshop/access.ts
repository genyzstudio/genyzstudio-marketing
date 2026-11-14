import type { PipelineId } from '../pipeline';

export const workshopCourses = ['clever-rat', 'five-levels', 'master-frame', 'directors-framework', 'fight-scenes', 'ai-cinema-workflow', 'visual-effects', 'seedance-masterclass', 'voice-consistency'] as const;
export type WorkshopCourseId = typeof workshopCourses[number];
export function isWorkshopCourse(value: string): value is WorkshopCourseId {
  return (workshopCourses as readonly string[]).includes(value);
}
export type WorkshopProtection = 'protected' | 'public' | 'partial';
export interface WorkshopAccessPolicy {
  mode: WorkshopProtection;
  publicLessons: PipelineId[];
}
export interface WorkshopAdminCourse extends WorkshopAccessPolicy {
  id: WorkshopCourseId;
  title: string;
  lessons: { id: PipelineId; title: string }[];
}
