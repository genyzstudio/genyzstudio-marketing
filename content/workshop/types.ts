import type { PipelineId } from '../pipeline';

export interface LessonStep {
  title: string;
  instruction: string;
  tool: string;
  prompt?: string;
  promptLanguage?: 'vi' | 'en';
  referenceImages?: { label: string; src: string }[];
  promptVi?: string;
  promptKind?: "image" | "video" | "planning";
  promptEvidence?: string;
  resultText?: string;
  resultReview?: string;
  media?: WorkshopVisualExample['outputs'];
  testedExample?: { image: string; width: number; height: number; inputImage?: string; inputWidth?: number; inputHeight?: number; alt: string; tool: string; date: string; review: string };
  save: string;
}
export interface WorkshopTechnique {
  id: string;
  title: string;
  goal: string;
  input: string;
  steps: LessonStep[];
  check: string;
  fix: string;
}
export interface WorkshopLesson {
  visualExamples?: WorkshopVisualExample[];
  techniques?: WorkshopTechnique[];
  id: PipelineId;
  goal: string;
  terms: string;
  input: string;
  steps: LessonStep[];
  checks: string[];
  troubleshooting: { problem: string; fix: string }[];
  example: { title: string; text: string; image?: string; video?: string; poster?: string; audio?: string; href?: string };
}
export interface WorkshopVisualExample {
  id: string;
  title: string;
  instruction: string;
  promptVi?: string;
  settings: string;
  review: string;
  inputs: { label: string; src: string }[];
  outputs: { label: string; src: string; kind: 'image' | 'video'; width: number; height: number; poster?: string }[];
}
export interface WorkshopProgress { completed: PipelineId[]; current: PipelineId }
export interface WorkshopContent {
  courseTitle: string;
  workbookName?: string;
  source?: { title: string; author: string; href: string; note: string };
  durationLabel?: string;
  syllabus: { id: PipelineId; title: string; phase: number; minutes: number; summary: string; output: string }[];
  phases: string[];
  tools: { name: string; href: string; purpose: string }[];
  glossary: string[][];
  preparation: { title: string; intro: string; steps: { heading: string; text: string }[]; note: string;
    visualGuide?: { title: string; intro: string; image: string; width: number; height: number; captions: string[]; tryIt: string;
      recreation?: { promptVi: string; references: { label: string; src: string; width: number; height: number }[]; instructions: string[]; evidence: string };
    }[];
    toolPaths?: { title: string; steps: string[] }[];
  };
  lessons: WorkshopLesson[];
  progress: WorkshopProgress;
  sessionExpiresAt: number;
}
