import type { Metadata } from 'next';
import { WorkshopClassroom } from '@/components/workshop-classroom';

const title = 'The Clever Little Rat workshop | GenYZ Studio';
const description = 'Build one scene in two connected shots, with reference frames, prompts, real videos and a practical review workflow.';
export const metadata: Metadata = {
  title, description,
  alternates: { canonical: '/en/workshop', languages: { vi: '/workshop', en: '/en/workshop' } },
  openGraph: { title, description, url: '/en/workshop', locale: 'en_US', alternateLocale: ['vi_VN'] },
  twitter: { title, description },
  robots: { index: false, follow: false },
};
export default function WorkshopPage() { return <WorkshopClassroom locale="en" />; }
