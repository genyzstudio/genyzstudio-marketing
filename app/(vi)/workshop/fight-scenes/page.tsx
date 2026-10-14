import type { Metadata } from 'next';
import { WorkshopClassroom } from '@/components/workshop-classroom';
export const metadata: Metadata = { title: "Dàn dựng cảnh hành động | GenYZ Studio", robots: { index: false, follow: false }, alternates: { canonical: '/workshop/fight-scenes', languages: { vi: '/workshop/fight-scenes', en: '/en/workshop/fight-scenes' } } };
export default function FightScenesPage() { return <WorkshopClassroom locale="vi" course="fight-scenes" />; }
