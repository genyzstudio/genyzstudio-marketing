import type { Metadata } from 'next';
import { WorkshopClassroom } from '@/components/workshop-classroom';

export const metadata: Metadata = {
  title: '5 Levels of AI Filmmaking | GenYZ Studio',
  description: 'A GenYZ workshop with 28 detailed technique labs, from first prompts to a finished short film.',
  alternates: { canonical: '/en/workshop/five-levels', languages: { vi: '/workshop/five-levels', en: '/en/workshop/five-levels' } },
  robots: { index: false, follow: false },
};
export default function FiveLevelsPage() { return <WorkshopClassroom locale="en" course="five-levels" />; }
