import type { Metadata } from 'next';
import { WorkshopClassroom } from '@/components/workshop-classroom';
export const metadata: Metadata = { title: 'Visual Effects · Cinematic Realism | GenYZ Studio', robots: { index: false, follow: false }, alternates: { canonical: '/en/workshop/visual-effects', languages: { vi: '/workshop/visual-effects', en: '/en/workshop/visual-effects' } } };
export default function VisualEffectsPage() { return <WorkshopClassroom locale="en" course="visual-effects" />; }
