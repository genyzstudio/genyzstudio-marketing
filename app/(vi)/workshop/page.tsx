import type { Metadata } from 'next';
import { WorkshopClassroom } from '@/components/workshop-classroom';

const title = 'Workshop Chú chuột nhỏ thông minh | GenYZ Studio';
const description = 'Thực hành một cảnh với hai shot nối tiếp: ảnh tham chiếu, prompt, video thật và quy trình kiểm tra từng bước.';
export const metadata: Metadata = {
  title, description,
  alternates: { canonical: '/workshop', languages: { vi: '/workshop', en: '/en/workshop' } },
  openGraph: { title, description, url: '/workshop', locale: 'vi_VN', alternateLocale: ['en_US'] },
  twitter: { title, description },
  robots: { index: false, follow: false },
};
export default function WorkshopPage() { return <WorkshopClassroom />; }
