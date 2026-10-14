import type { Metadata } from 'next';
import { WorkshopClassroom } from '@/components/workshop-classroom';
export const metadata: Metadata = { title: 'Director’s Framework | GenYZ Studio', robots: { index: false, follow: false }, alternates: { canonical: '/en/workshop/directors-framework', languages: { vi: '/workshop/directors-framework', en: '/en/workshop/directors-framework' } } };
export default function DirectorsFrameworkPage() { return <WorkshopClassroom locale="en" course="directors-framework" />; }
