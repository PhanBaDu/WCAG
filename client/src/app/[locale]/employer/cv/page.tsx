import type { Metadata } from 'next';
import { ArrowUpRight, Download, Sparkles } from 'lucide-react';
import { EmployerRouteGate } from '@/components/auth/employer-route-gate';
import { CandidateApplicationsTable } from '@/components/employer/candidate-applications-table';
import { EmployerCvExportButton } from '@/components/employer/employer-cv-export-button';
import { PageBreadcrumb } from '@/components/layout/page-breadcrumb';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from '@/i18n/routing';

export const metadata: Metadata = {
  title: 'CV ứng viên | Cổng Việc Làm Người Khuyết Tật',
  description: 'Xem và xử lý hồ sơ ứng viên dành cho nhà tuyển dụng.',
};

const copy = {
  vi: {
    eyebrow: 'Nhà tuyển dụng',
    title: 'Hộp CV ứng tuyển',
    desc: 'Theo dõi hồ sơ ứng viên, lọc theo trạng thái và mở CV để xem nhanh trước khi phản hồi.',
    back: 'Về dashboard',
    export: 'Xuất báo cáo',
    stats: [
      { label: 'Hồ sơ mới', value: '12', note: 'Trong 24 giờ qua' },
      { label: 'Đã xem', value: '34', note: 'Đang chờ phản hồi' },
      { label: 'Mức phù hợp > 85%', value: '19', note: 'Ứng viên nổi bật' },
    ],
    searchPlaceholder: 'Tìm theo tên, vị trí hoặc khu vực',
    statusLabel: 'Trạng thái',
    statusAll: 'Tất cả',
    statusNew: 'Mới',
    statusViewed: 'Đã xem',
    statusInterview: 'Mời phỏng vấn',
    jobLabel: 'Tin tuyển dụng',
    jobAll: 'Tất cả vị trí',
    jobContent: 'Chuyên viên nội dung số',
    jobAdmin: 'Nhân viên hành chính',
    jobData: 'Trợ lý dữ liệu',
    sortLabel: 'Sắp xếp',
    sortNewest: 'Mới nhất',
    sortMatch: 'Phù hợp nhất',
    sortOldest: 'Cũ nhất',
    candidateTableTitle: 'Danh sách hồ sơ',
    candidateTableNote: 'Ưu tiên xử lý hồ sơ mới và các hồ sơ có mức phù hợp cao.',
    columns: ['Ứng viên', 'Vị trí', 'Khu vực', 'Phù hợp', 'Trạng thái', 'Cập nhật', 'Hành động'],
    openCv: 'Xem CV',
    downloadCv: 'Tải CV',
    pagination: {
      previous: 'Trước',
      next: 'Sau',
      page: 'Trang',
    },
  },
  en: {
    eyebrow: 'Employers',
    title: 'CV inbox',
    desc: 'Track candidate profiles, filter by status, and open CVs before responding.',
    back: 'Back to dashboard',
    export: 'Export report',
    stats: [
      { label: 'New profiles', value: '12', note: 'In the last 24h' },
      { label: 'Viewed', value: '34', note: 'Awaiting response' },
      { label: 'Match above 85%', value: '19', note: 'Top candidates' },
    ],
    searchPlaceholder: 'Search by name, role, or location',
    statusLabel: 'Status',
    statusAll: 'All',
    statusNew: 'New',
    statusViewed: 'Viewed',
    statusInterview: 'Interview',
    jobLabel: 'Job post',
    jobAll: 'All jobs',
    jobContent: 'Content specialist',
    jobAdmin: 'Administrative assistant',
    jobData: 'Data assistant',
    sortLabel: 'Sort',
    sortNewest: 'Newest',
    sortMatch: 'Best match',
    sortOldest: 'Oldest',
    candidateTableTitle: 'Candidate list',
    candidateTableNote: 'Prioritize new profiles and high-match candidates first.',
    columns: ['Candidate', 'Role', 'Location', 'Match', 'Status', 'Updated', 'Actions'],
    openCv: 'Open CV',
    downloadCv: 'Download CV',
    pagination: {
      previous: 'Previous',
      next: 'Next',
      page: 'Page',
    },
  },
} as const;

const applications = [
  {
    name: 'Nguyễn Minh Anh',
    role: 'Chuyên viên nội dung số',
    location: 'Hà Nội',
    match: '92%',
    status: 'Tiếp nhận',
    updated: '10:48',
    file: '/cv-demo.pdf',
    signal: 'Nổi bật',
  },
  {
    name: 'Trần Quốc Bảo',
    role: 'Nhân viên hành chính',
    location: 'TP. Hồ Chí Minh',
    match: '88%',
    status: 'Đã xem',
    updated: '09:12',
    file: '/cv-demo.pdf',
    signal: 'Đang lọc',
  },
  {
    name: 'Lê Phương Thảo',
    role: 'Trợ lý dữ liệu',
    location: 'Đà Nẵng',
    match: '85%',
    status: 'Duyệt hồ sơ',
    updated: '08:40',
    file: '/cv-demo.pdf',
    signal: 'Chủ động',
  },
  {
    name: 'Phạm Gia Huy',
    role: 'Chuyên viên vận hành',
    location: 'Toàn quốc',
    match: '79%',
    status: 'Cân nhắc',
    updated: 'Hôm qua',
    file: '/cv-demo.pdf',
    signal: 'Chờ xem',
  },
] as const;

export default async function EmployerCvPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: routeLocale } = await params;
  const locale = routeLocale === 'en' ? 'en' : 'vi';
  const t = copy[locale];
  const crumbs =
    locale === 'en'
      ? [
          { label: 'Employers', href: '/employer/dashboard' },
          { label: 'Candidate CVs' },
        ]
      : [
          { label: 'Nhà tuyển dụng', href: '/employer/dashboard' },
          { label: 'CV ứng viên' },
        ];
  return (
    <EmployerRouteGate>
      <main
        id="main-content"
        className="mx-auto w-full max-w-7xl overflow-x-hidden px-4 pt-4 pb-8 sm:px-6 lg:px-8 lg:pt-4 lg:pb-12"
      >
        <PageBreadcrumb items={crumbs} className="mb-2" />

        <section className="space-y-6">
          <div className="flex min-w-0 flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0 max-w-3xl space-y-3">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">{t.eyebrow}</p>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.title}</h1>
                <p className="text-muted-foreground">{t.desc}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/employer/dashboard"
                className={buttonVariants({
                  variant: 'outline',
                  className:
                    'h-11 rounded-none border-[#0b0c0c] bg-white px-6 text-sm font-semibold text-[#0b0c0c] hover:bg-[#ececec] focus-visible:border-[#ffdd00] focus-visible:!outline focus-visible:!outline-[3px] focus-visible:!outline-offset-[3px] focus-visible:!outline-[#ffdd00]',
                })}
              >
                <ArrowUpRight className="mr-2 h-4 w-4" aria-hidden="true" />
                {t.back}
              </Link>
              <EmployerCvExportButton href="/cv-demo.pdf">
                <Download className="mr-2 h-4 w-4" aria-hidden="true" />
                {t.export}
              </EmployerCvExportButton>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {t.stats.map((item) => (
              <Card key={item.label} className="rounded-none border border-border shadow-lg">
                <CardContent className="flex items-start justify-between gap-4 p-5">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="text-3xl font-bold tracking-tight">{item.value}</p>
                    <p className="text-xs text-muted-foreground">{item.note}</p>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-none border border-border bg-background text-primary">
                    <Sparkles className="h-5 w-5" aria-hidden="true" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <CandidateApplicationsTable
            locale={locale}
            labels={{
              candidateTableTitle: t.candidateTableTitle,
              candidateTableNote: t.candidateTableNote,
              columns: t.columns,
              openCv: t.openCv,
              downloadCv: t.downloadCv,
              pagination: t.pagination,
            }}
            applications={applications}
          />

        </section>
      </main>
    </EmployerRouteGate>
  );
}
