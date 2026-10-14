import type { Metadata } from 'next';
import { WorkshopClassroom } from '@/components/workshop-classroom';
export const metadata: Metadata = { title: 'Tư duy đạo diễn | GenYZ Studio', robots: { index: false, follow: false }, alternates: { canonical: '/workshop/directors-framework', languages: { vi: '/workshop/directors-framework', en: '/en/workshop/directors-framework' } } };
export default function DirectorsFrameworkPage() { return <WorkshopClassroom locale="vi" course="directors-framework" />; }
