import type { Metadata } from 'next';
import { WorkshopClassroom } from '@/components/workshop-classroom';
export const metadata: Metadata = { title: 'Hiệu ứng hình ảnh chân thực | GenYZ Studio', robots: { index: false, follow: false }, alternates: { canonical: '/workshop/visual-effects', languages: { vi: '/workshop/visual-effects', en: '/en/workshop/visual-effects' } } };
export default function VisualEffectsPage() { return <WorkshopClassroom locale="vi" course="visual-effects" />; }
