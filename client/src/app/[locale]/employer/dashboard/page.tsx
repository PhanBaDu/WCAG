import { Metadata } from 'next';
import { ArrowUpRight, Clock3, Plus, Sparkles, Users } from 'lucide-react';
import { EmployerRouteGate } from '@/components/auth/employer-route-gate';
import { buttonVariants } from '@/components/ui/button';
import { PageBreadcrumb } from '@/components/layout/page-breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@/i18n/routing';

export const metadata: Metadata = {
  title: 'Bảng điều khiển nhà tuyển dụng | Cổng Việc Làm Người Khuyết Tật',
  description: 'Giao diện tĩnh dashboard nhà tuyển dụng với bảng việc làm minh họa.',
};

const copy = {
  vi: {
    eyebrow: 'Nhà tuyển dụng',
    title: 'Quản lý tin tuyển dụng',
    desc: 'Dashboard giữ cấu trúc rõ ràng, số liệu dễ quét và các hành động quản lý tin tuyển dụng theo cùng một hệ UI với khu ứng viên.',
    newJob: 'Đăng tin mới',
    stats: [
      ['Tin đang hoạt động', '18', Sparkles],
      ['Đơn ứng tuyển', '26', Users],
      ['Tin chờ duyệt', '4', Clock3],
    ],
    rows: [
      ['Chuyên viên nội dung số', 'Đang duyệt', '14 đơn', '12/06/2026'],
      ['Nhân viên hành chính', 'Đang hoạt động', '9 đơn', '10/06/2026'],
      ['Trợ lý dữ liệu', 'Đã đóng', '3 đơn', '05/06/2026'],
    ],
    tableTitle: 'Danh sách tin tuyển dụng',
    tableLink: 'Xem form đăng tin',
    cols: ['Tên tin', 'Trạng thái', 'Đơn ứng tuyển', 'Cập nhật', 'Thao tác'],
    edit: 'Sửa',
    close: 'Đóng',
    delete: 'Xóa',
    supportTitle: 'Hướng dẫn nhanh',
    support1Title: 'Trạng thái tin',
    support1: 'Giữ PENDING / ACTIVE / CLOSED làm trạng thái chuẩn để thao tác nhất quán.',
    support2Title: 'Hành động nhanh',
    support2: 'Đặt các nút sửa, đóng, xoá theo cùng phong cách với các CTA của ứng viên.',
    viewJobs: 'Xem giao diện ứng viên',
  },
  en: {
    eyebrow: 'Employers',
    title: 'Job posting management',
    desc: 'The dashboard keeps a clear structure, scannable metrics, and job actions aligned with the candidate-facing UI system.',
    newJob: 'Post a new job',
    stats: [
      ['Active jobs', '18', Sparkles],
      ['Applications', '26', Users],
      ['Pending review', '4', Clock3],
    ],
    rows: [
      ['Content specialist', 'Under review', '14 applications', '12/06/2026'],
      ['Administrative assistant', 'Active', '9 applications', '10/06/2026'],
      ['Data assistant', 'Closed', '3 applications', '05/06/2026'],
    ],
    tableTitle: 'Job postings',
    tableLink: 'View posting form',
    cols: ['Job title', 'Status', 'Applications', 'Updated', 'Actions'],
    edit: 'Edit',
    close: 'Close',
    delete: 'Delete',
    supportTitle: 'Quick guide',
    support1Title: 'Job status',
    support1: 'Keep PENDING / ACTIVE / CLOSED as the standard states for consistent actions.',
    support2Title: 'Fast actions',
    support2: 'Keep edit, close, and delete actions in the same visual language as the candidate CTA buttons.',
    viewJobs: 'View candidate UI',
  },
} as const;

export default async function EmployerDashboardPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: routeLocale } = await params;
  const locale = routeLocale === 'en' ? 'en' : 'vi';
  const t = copy[locale];
  const crumbs = locale === 'en'
    ? [
        { label: 'Home', href: '/' },
        { label: 'Employers', href: '/employer/dashboard' },
        { label: 'Dashboard' },
      ]
    : [
        { label: 'Trang chủ', href: '/' },
        { label: 'Nhà tuyển dụng', href: '/employer/dashboard' },
        { label: 'Bảng điều khiển' },
      ];
  return (
    <EmployerRouteGate>
      <main id="main-content" className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <PageBreadcrumb items={crumbs} />
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">{t.eyebrow}</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{t.title}</h1>
          <p className="mt-4 text-muted-foreground">{t.desc}</p>
        </div>

        <Link
          href="/employer/jobs/create"
          className={buttonVariants({
            className:
              'h-11 rounded-none border-[#0b0c0c] bg-[#ffdd00] px-6 text-sm font-semibold text-[#0b0c0c] hover:bg-[#ffe766] focus-visible:border-[#ffdd00] focus-visible:!outline focus-visible:!outline-[3px] focus-visible:!outline-offset-[3px] focus-visible:!outline-[#ffdd00]',
          })}
        >
          <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
          {t.newJob}
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {t.stats.map(([label, value, Icon]) => (
          <Card key={label as string} className="rounded-none border border-border shadow-lg">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm text-muted-foreground">{label as string}</p>
                <p className="mt-2 text-3xl font-bold tracking-tight">{value as string}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-none border border-border bg-background text-primary">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.5fr_0.9fr]">
        <Card className="rounded-none border border-border shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl">{t.tableTitle}</CardTitle>
            <Link
              href="/employer/jobs/create"
              className="inline-flex items-center rounded-none border border-[#0b0c0c] px-3 py-2 text-sm font-medium text-[#0b0c0c] underline underline-offset-4 hover:bg-[#ececec] focus-visible:border-[#ffdd00] focus-visible:!outline focus-visible:!outline-[3px] focus-visible:!outline-offset-[3px] focus-visible:!outline-[#ffdd00]"
            >
              {t.tableLink}
            </Link>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <caption className="sr-only">Bảng tin tuyển dụng của nhà tuyển dụng</caption>
              <thead className="border-b text-muted-foreground">
                <tr>
                  {t.cols.map((col) => (
                    <th key={col} scope="col" className="px-4 py-3 font-medium">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.rows.map(([title, status, applications, updated]) => (
                  <tr key={title} className="border-b last:border-0">
                    <td className="px-4 py-4 font-medium">{title}</td>
                    <td className="px-4 py-4">
                      <span className="inline-flex rounded-none border border-[#0b0c0c] bg-white px-3 py-1 text-xs font-semibold text-[#0b0c0c]">
                        {status}
                      </span>
                    </td>
                    <td className="px-4 py-4">{applications}</td>
                    <td className="px-4 py-4 text-muted-foreground">{updated}</td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          className={buttonVariants({
                            variant: 'outline',
                            className:
                              'h-9 rounded-none border-[#0b0c0c] bg-white px-3 text-xs font-medium text-[#0b0c0c] hover:bg-[#ececec] focus-visible:border-[#ffdd00] focus-visible:!outline focus-visible:!outline-[3px] focus-visible:!outline-offset-[3px] focus-visible:!outline-[#ffdd00]',
                          })}
                        >
                          {t.edit}
                        </button>
                        <button
                          type="button"
                          className={buttonVariants({
                            variant: 'outline',
                            className:
                              'h-9 rounded-none border-[#0b0c0c] bg-white px-3 text-xs font-medium text-[#0b0c0c] hover:bg-[#ececec] focus-visible:border-[#ffdd00] focus-visible:!outline focus-visible:!outline-[3px] focus-visible:!outline-offset-[3px] focus-visible:!outline-[#ffdd00]',
                          })}
                        >
                          {t.close}
                        </button>
                        <button
                          type="button"
                          className={buttonVariants({
                            variant: 'destructive',
                            className:
                              'h-9 rounded-none px-3 text-xs font-medium focus-visible:border-[#ffdd00] focus-visible:!outline focus-visible:!outline-[3px] focus-visible:!outline-offset-[3px] focus-visible:!outline-[#ffdd00]',
                          })}
                        >
                          {t.delete}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card className="rounded-none border border-border shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">{t.supportTitle}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div className="rounded-none border bg-background p-4">
              <p className="font-medium text-foreground">{t.support1Title}</p>
              <p className="mt-2">{t.support1}</p>
            </div>
            <div className="rounded-none border bg-background p-4">
              <p className="font-medium text-foreground">{t.support2Title}</p>
              <p className="mt-2">{t.support2}</p>
            </div>
            <Link
              href="/jobs"
              className={buttonVariants({
                variant: 'outline',
                className:
                  'h-11 w-full rounded-none border-[#0b0c0c] bg-white text-[#0b0c0c] hover:bg-[#ececec] focus-visible:border-[#ffdd00] focus-visible:!outline focus-visible:!outline-[3px] focus-visible:!outline-offset-[3px] focus-visible:!outline-[#ffdd00]',
              })}
            >
              <ArrowUpRight className="mr-2 h-4 w-4" aria-hidden="true" />
              {t.viewJobs}
            </Link>
          </CardContent>
        </Card>
      </div>
      </main>
    </EmployerRouteGate>
  );
}
