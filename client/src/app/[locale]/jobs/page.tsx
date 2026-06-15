import { Metadata } from 'next';
import { JobsSearchPage } from '@/components/jobs/jobs-search-page';

export const metadata: Metadata = {
  title: 'Việc làm | Cổng Việc Làm Người Khuyết Tật',
  description: 'Giao diện tĩnh trang tìm việc với bộ lọc, danh sách kết quả và CTA rõ ràng.',
};

export default async function JobsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: routeLocale } = await params;
  const locale = routeLocale === 'en' ? 'en' : 'vi';

  return <JobsSearchPage locale={locale} />;
}
