import type { Metadata } from 'next';
import { WorkshopClassroom } from '@/components/workshop-classroom';
export const metadata: Metadata = { title: "AI Action Scenes | GenYZ Studio", robots: { index: false, follow: false }, alternates: { canonical: '/en/workshop/fight-scenes', languages: { vi: '/workshop/fight-scenes', en: '/en/workshop/fight-scenes' } } };
export default function FightScenesPage() { return <WorkshopClassroom locale="en" course="fight-scenes" />; }
