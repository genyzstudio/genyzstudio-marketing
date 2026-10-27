import type { Metadata } from 'next';
import { WorkshopClassroom } from '@/components/workshop-classroom';
export const metadata: Metadata = { title: 'Seedance 2.5 · Your First AI Film | GenYZ Studio', robots: { index: false, follow: false }, alternates: { canonical: '/en/workshop/seedance-masterclass', languages: { vi: '/workshop/seedance-masterclass', en: '/en/workshop/seedance-masterclass' } } };
export default function SeedanceMasterclassPage() { return <WorkshopClassroom locale="en" course="seedance-masterclass" />; }
