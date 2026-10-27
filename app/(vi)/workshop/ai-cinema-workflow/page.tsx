import type { Metadata } from 'next';
import { WorkshopClassroom } from '@/components/workshop-classroom';
export const metadata: Metadata = { title: 'Quy trình làm phim AI | GenYZ Studio', robots: { index: false, follow: false }, alternates: { canonical: '/workshop/ai-cinema-workflow', languages: { vi: '/workshop/ai-cinema-workflow', en: '/en/workshop/ai-cinema-workflow' } } };
export default function AiCinemaPage() { return <WorkshopClassroom locale="vi" course="ai-cinema-workflow" />; }
