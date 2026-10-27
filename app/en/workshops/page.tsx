import type { Metadata } from 'next';
import { WorkshopLibrary } from '@/components/workshop-library';
export const metadata: Metadata = {
  title: 'Workshop Library | GenYZ Studio',
  description: 'Explore AI filmmaking workshops in storytelling, visual language, camera work and production. Learn in English or Vietnamese.',
  alternates: { canonical: '/en/workshops', languages: { vi: '/workshops', en: '/en/workshops' } },
};
export default function WorkshopLibraryPage() { return <WorkshopLibrary locale="en" />; }
