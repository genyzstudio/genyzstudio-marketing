import type { Metadata } from 'next';
import { WorkshopAdmin } from '../../../components/workshop-admin';

export const metadata: Metadata = { title: 'Quản trị workshop | GenYZ Studio', robots: { index: false, follow: false } };
export default function AdminPage() { return <WorkshopAdmin />; }
