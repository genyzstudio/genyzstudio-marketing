import type { Metadata } from 'next';
import { WorkshopLibrary } from '@/components/workshop-library';
export const metadata: Metadata = {
  title: 'Thư viện workshop | GenYZ Studio',
  description: 'Khám phá workshop làm phim AI: kể chuyện, ngôn ngữ hình ảnh, camera và quy trình sản xuất. Học bằng tiếng Việt hoặc tiếng Anh.',
  alternates: { canonical: '/workshops', languages: { vi: '/workshops', en: '/en/workshops' } },
};
export default function WorkshopLibraryPage() { return <WorkshopLibrary locale="vi" />; }
