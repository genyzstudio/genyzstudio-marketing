import type { Metadata } from 'next';
import { WorkshopClassroom } from '@/components/workshop-classroom';

export const metadata: Metadata = {
  title: '5 cấp độ làm phim AI | GenYZ Studio',
  description: 'Workshop GenYZ với 28 bài thực hành kỹ thuật, từ prompt đầu tiên đến phim ngắn hoàn chỉnh.',
  alternates: { canonical: '/workshop/five-levels', languages: { vi: '/workshop/five-levels', en: '/en/workshop/five-levels' } },
  robots: { index: false, follow: false },
};
export default function FiveLevelsPage() { return <WorkshopClassroom locale="vi" course="five-levels" />; }
