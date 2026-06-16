import type { Metadata } from 'next';
import { PageBreadcrumb } from '@/components/layout/page-breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { AppliedJobsTabs } from '@/components/profile/applied-jobs-tabs';
import { AppliedJobsPreview } from '@/components/profile/applied-jobs-preview';

export const metadata: Metadata = {
  title: 'Việc làm đã ứng tuyển | Cổng Việc Làm Người Khuyết Tật',
  description: 'Danh sách việc làm đã ứng tuyển và trạng thái xử lý hồ sơ.',
};

export default async function AppliedJobsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: routeLocale } = await params;
  const locale = routeLocale === 'en' ? 'en' : 'vi';
  const crumbs =
    locale === 'en'
      ? [
          { label: 'Home', href: '/' },
          { label: 'Profile', href: '/profile' },
          { label: 'Applied jobs' },
        ]
      : [
          { label: 'Trang chủ', href: '/' },
          { label: 'Hồ sơ', href: '/profile' },
          { label: 'Việc làm đã ứng tuyển' },
        ];

  return (
    <main id="main-content" className="mx-auto w-full max-w-7xl px-4 pt-2 pb-8 sm:px-6 lg:px-8 lg:pb-12 lg:pt-3">
      <PageBreadcrumb items={crumbs} />

      <Card className="border border-slate-100 bg-white shadow-[0_6px_24px_rgba(15,23,42,0.06)]">
        <CardContent className="space-y-8 p-5 sm:p-6 lg:p-7">
          <div className="space-y-5">
            <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              {locale === 'en' ? 'Applied jobs' : 'Việc làm đã ứng tuyển'}
            </h1>
            <AppliedJobsTabs locale={locale} />
          </div>
          <AppliedJobsPreview locale={locale} />
        </CardContent>
      </Card>
    </main>
  );
}
