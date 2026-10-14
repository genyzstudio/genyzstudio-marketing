import type { Metadata } from 'next';
import { WorkshopClassroom } from '@/components/workshop-classroom';
export const metadata: Metadata = { title: 'Làm chủ khung hình | GenYZ Studio', robots: { index: false, follow: false }, alternates: { canonical: '/workshop/master-frame', languages: { vi: '/workshop/master-frame', en: '/en/workshop/master-frame' } } };
export default function MasterFramePage() { return <WorkshopClassroom locale="vi" course="master-frame" />; }
