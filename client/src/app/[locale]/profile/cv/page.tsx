import type { Metadata } from 'next';
import { PageBreadcrumb } from '@/components/layout/page-breadcrumb';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Xem chi tiết CV | Cổng Việc Làm Người Khuyết Tật',
  description: 'Xem trước CV PDF đã lưu trong thư mục public.',
};

export default async function ProfileCvPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: routeLocale } = await params;
  const locale = routeLocale === 'en' ? 'en' : 'vi';
  const crumbs =
    locale === 'en'
      ? [
          { label: 'Home', href: '/' },
          { label: 'Profile', href: '/profile' },
          { label: 'CV details' },
        ]
      : [
          { label: 'Trang chủ', href: '/' },
          { label: 'Hồ sơ', href: '/profile' },
          { label: 'Chi tiết CV' },
        ];

  return (
    <main id="main-content" className="mx-auto w-full max-w-7xl px-4 pt-2 pb-8 sm:px-6 lg:px-8 lg:pb-12 lg:pt-3">
      <PageBreadcrumb items={crumbs} />
      <section className="space-y-6">
        <div className="max-w-3xl space-y-3">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            {locale === 'en' ? 'CV preview' : 'Xem CV'}
          </p>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {locale === 'en' ? 'Open the uploaded CV' : 'Mở file CV đã tải lên'}
            </h1>
            <p className="text-muted-foreground">
              {locale === 'en'
                ? 'The PDF below is served from the public folder so it can be viewed directly in the browser.'
                : 'File PDF bên dưới được phục vụ từ thư mục public để có thể xem trực tiếp trên trình duyệt.'}
            </p>
          </div>
        </div>

        <Card className="overflow-hidden">
          <CardHeader className="flex flex-col gap-3 border-b sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-xl">
              {locale === 'en' ? 'CV document' : 'Tài liệu CV'}
            </CardTitle>
            <div className="flex flex-wrap gap-3">
              <a
                href="/cv-demo.pdf"
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({ variant: 'outline', className: 'h-11 rounded-none' })}
              >
                {locale === 'en' ? 'Open in new tab' : 'Mở tab mới'}
              </a>
              <a href="/cv-demo.pdf" download className={buttonVariants({ className: 'h-11 rounded-none' })}>
                {locale === 'en' ? 'Download PDF' : 'Tải PDF'}
              </a>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <object data="/cv-demo.pdf" type="application/pdf" className="h-[min(85vh,900px)] w-full">
              <div className="space-y-3 p-6">
                <p className="text-sm text-muted-foreground">
                  {locale === 'en'
                    ? 'Your browser cannot display the PDF inline.'
                    : 'Trình duyệt của bạn không hỗ trợ hiển thị PDF trực tiếp.'}
                </p>
                <a href="/cv-demo.pdf" target="_blank" rel="noreferrer" className={buttonVariants()}>
                  {locale === 'en' ? 'Open PDF' : 'Mở PDF'}
                </a>
              </div>
            </object>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
