import type { Metadata } from 'next';
import { WorkshopClassroom } from '@/components/workshop-classroom';
export const metadata: Metadata = { title: 'Master the Frame | GenYZ Studio', robots: { index: false, follow: false }, alternates: { canonical: '/en/workshop/master-frame', languages: { vi: '/workshop/master-frame', en: '/en/workshop/master-frame' } } };
export default function MasterFramePage() { return <WorkshopClassroom locale="en" course="master-frame" />; }
