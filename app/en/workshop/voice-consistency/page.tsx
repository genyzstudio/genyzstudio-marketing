import type { Metadata } from 'next';
import { WorkshopClassroom } from '@/components/workshop-classroom';
export const metadata: Metadata = { title: 'Consistent Character Voices | GenYZ Studio', robots: { index: false, follow: false }, alternates: { canonical: '/en/workshop/voice-consistency', languages: { vi: '/workshop/voice-consistency', en: '/en/workshop/voice-consistency' } } };
export default function VoiceConsistencyPage() { return <WorkshopClassroom locale="en" course="voice-consistency" />; }
