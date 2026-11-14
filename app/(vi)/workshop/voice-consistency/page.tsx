import type { Metadata } from 'next';
import { WorkshopClassroom } from '@/components/workshop-classroom';
export const metadata: Metadata = { title: 'Giọng nhân vật nhất quán | GenYZ Studio', robots: { index: false, follow: false }, alternates: { canonical: '/workshop/voice-consistency', languages: { vi: '/workshop/voice-consistency', en: '/en/workshop/voice-consistency' } } };
export default function VoiceConsistencyPage() { return <WorkshopClassroom locale="vi" course="voice-consistency" />; }
