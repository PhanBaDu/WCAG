import { Metadata } from 'next';
import { ArrowUpRight, Clock3, Plus, Sparkles, Users } from 'lucide-react';
import Image from 'next/image';
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
    title: 'Bố cục dashboard tĩnh cho quản lý tin tuyển dụng',
    desc: 'Màn hình này giữ cấu trúc dashboard, số liệu và bảng quản lý ở dạng minh họa để bạn chốt UI trước.',
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
    supportTitle: 'Khối hỗ trợ',
    support1Title: 'Luồng duyệt',
    support1: 'Cần giữ chỗ cho trạng thái PENDING / ACTIVE / CLOSED và các hành động duyệt/từ chối.',
    support2Title: 'Bố cục thẻ',
    support2: 'Card bên phải mô tả số liệu nhanh, giúp dashboard nhìn cân bằng dù chưa có dữ liệu thực.',
    viewJobs: 'Xem giao diện ứng viên',
  },
  en: {
    eyebrow: 'Employers',
    title: 'Static dashboard layout for job management',
    desc: 'This screen keeps the dashboard structure, metrics, and management table as mock content so you can lock the UI first.',
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
    supportTitle: 'Supporting notes',
    support1Title: 'Review flow',
    support1: 'Keep placeholders for PENDING / ACTIVE / CLOSED states and the approve/reject actions.',
    support2Title: 'Card layout',
    support2: 'The right card shows quick metrics so the dashboard remains balanced even without real data.',
    viewJobs: 'View applicant UI',
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
    <main id="main-content" className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <PageBreadcrumb items={crumbs} />
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">{t.eyebrow}</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{t.title}</h1>
          <p className="mt-4 text-muted-foreground">{t.desc}</p>
        </div>

        <Link href="/employer/jobs/create" className={buttonVariants({ className: 'h-11 rounded-xl' })}>
          <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
          {t.newJob}
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {t.stats.map(([label, value, Icon]) => (
          <Card key={label as string} className="border-none shadow-lg">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm text-muted-foreground">{label as string}</p>
                <p className="mt-2 text-3xl font-bold tracking-tight">{value as string}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8 overflow-hidden border-none shadow-xl">
        <CardContent className="grid gap-0 p-0 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col justify-between bg-primary/5 p-6">
            <div className="space-y-3">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                {locale === 'en' ? 'Dashboard visual' : 'Minh hoạ dashboard'}
              </p>
              <h2 className="text-2xl font-bold tracking-tight">
                {locale === 'en' ? 'Keep the dashboard alive with a visual block' : 'Giữ dashboard có điểm nhấn bằng hình ảnh'}
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {locale === 'en'
                  ? 'A clean illustration helps the employer area feel less text-heavy and gives the eye a natural resting point.'
                  : 'Một minh hoạ sạch sẽ giúp khu nhà tuyển dụng bớt nặng chữ và có điểm nghỉ mắt tự nhiên.'}
              </p>
            </div>
            <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
              {locale === 'en'
                ? 'Source: local SVG asset built from project shapes, so no external licensing risk.'
                : 'Nguồn: SVG nội bộ do project tạo ra, không có rủi ro giấy phép từ bên ngoài.'}
            </p>
          </div>
          <div className="relative min-h-[280px] overflow-hidden bg-slate-50">
            <Image
              src="/human-resources.png"
              alt={locale === 'en' ? 'Human resources illustration for employers' : 'Minh hoạ nhân sự dành cho nhà tuyển dụng'}
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-contain p-6"
            />
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.5fr_0.9fr]">
        <Card className="border-none shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl">{t.tableTitle}</CardTitle>
            <Link href="/employer/jobs/create" className="gov-link text-sm font-medium">
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
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{status}</span>
                    </td>
                    <td className="px-4 py-4">{applications}</td>
                    <td className="px-4 py-4 text-muted-foreground">{updated}</td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-2">
                        <button type="button" className="rounded-lg border px-3 py-2 text-xs font-medium">
                          {t.edit}
                        </button>
                        <button type="button" className="rounded-lg border px-3 py-2 text-xs font-medium">
                          {t.close}
                        </button>
                        <button type="button" className="rounded-lg border border-destructive/30 px-3 py-2 text-xs font-medium text-destructive">
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

        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">{t.supportTitle}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div className="rounded-2xl border bg-background p-4">
              <p className="font-medium text-foreground">{t.support1Title}</p>
              <p className="mt-2">{t.support1}</p>
            </div>
            <div className="rounded-2xl border bg-background p-4">
              <p className="font-medium text-foreground">{t.support2Title}</p>
              <p className="mt-2">{t.support2}</p>
            </div>
            <Link href="/jobs" className={buttonVariants({ variant: 'outline', className: 'h-11 w-full rounded-xl' })}>
              <ArrowUpRight className="mr-2 h-4 w-4" aria-hidden="true" />
              {t.viewJobs}
            </Link>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
