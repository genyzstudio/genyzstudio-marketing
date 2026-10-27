import type { Metadata } from 'next';
import { WorkshopClassroom } from '@/components/workshop-classroom';
export const metadata: Metadata = { title: 'AI Cinema Workflow | GenYZ Studio', robots: { index: false, follow: false }, alternates: { canonical: '/en/workshop/ai-cinema-workflow', languages: { vi: '/workshop/ai-cinema-workflow', en: '/en/workshop/ai-cinema-workflow' } } };
export default function AiCinemaPage() { return <WorkshopClassroom locale="en" course="ai-cinema-workflow" />; }
