import type { Metadata } from 'next';
import Image from 'next/image';
import { PageBreadcrumb } from '@/components/layout/page-breadcrumb';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from '@/i18n/routing';

export const metadata: Metadata = {
  title: 'Việc làm đã ứng tuyển | Cổng Việc Làm Người Khuyết Tật',
  description: 'Danh sách việc làm đã ứng tuyển và trạng thái xử lý hồ sơ.',
};

const filters = ['Tất cả', 'Tiếp nhận', 'Đã xem', 'Duyệt hồ sơ', 'Cân nhắc', 'Phù hợp', 'Chưa phù hợp'];

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

            <div className="flex flex-wrap gap-3">
              {filters.map((filter, index) => (
                <button
                  key={filter}
                  type="button"
                  className={[
                    'h-11 rounded-full border px-4 text-[17px] font-normal transition-colors',
                    index === 0
                      ? 'border-[#22a65b] bg-white text-[#22a65b] shadow-sm'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50',
                  ].join(' ')}
                  aria-pressed={index === 0}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="flex min-h-[420px] flex-col items-center justify-center px-4 py-10 text-center sm:px-8">
            <div className="w-full max-w-[520px] space-y-7">
              <div className="flex justify-center">
                <Image
                  src="/job-support.svg"
                  alt=""
                  width={300}
                  height={225}
                  className="h-auto w-[230px] max-w-full opacity-60 grayscale sm:w-[260px]"
                />
              </div>

              <div className="space-y-4">
                <p className="text-xl font-semibold text-slate-950 sm:text-2xl">
                  {locale === 'en' ? 'You have not applied to any jobs yet.' : 'Bạn chưa ứng tuyển công việc nào!'}
                </p>
                <p className="mx-auto max-w-2xl text-base leading-8 text-slate-500 sm:text-lg">
                  {locale === 'en'
                    ? 'Start searching for the right jobs and connect with top employers.'
                    : 'Hãy bắt đầu tìm kiếm công việc phù hợp để kết nối với các nhà tuyển dụng hàng đầu.'}
                </p>
              </div>

              <div className="flex justify-center">
                <Link
                  href="/jobs"
                  className={buttonVariants({
                    className:
                      'h-14 rounded-full bg-[#16b44a] px-8 text-lg font-semibold text-white shadow-none hover:bg-[#12a343] focus-visible:bg-[#12a343]',
                  })}
                >
                  {locale === 'en' ? 'Find jobs now' : 'Tìm việc ngay'}
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
