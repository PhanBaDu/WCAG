import type { Metadata } from 'next';
import { ArrowUpRight, BadgeCheck, CalendarDays, Download, FileText, MapPin, Search, Sparkles, Users } from 'lucide-react';
import { EmployerRouteGate } from '@/components/auth/employer-route-gate';
import { CandidateStatusActions } from '@/components/employer/candidate-status-actions';
import { PageBreadcrumb } from '@/components/layout/page-breadcrumb';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
    shortlist: 'Lưu ứng viên',
    invite: 'Mời phỏng vấn',
    previewTitle: 'Hồ sơ đang mở',
    previewSubtitle: 'Nguyễn Minh Anh',
    previewRole: 'Nhân viên nội dung số',
    previewLocation: 'Hà Nội',
    previewMatch: '92% phù hợp',
    previewStatus: 'Mới nhận',
    previewSummaryTitle: 'Thông tin nhanh',
    previewSummary1: '4 năm kinh nghiệm viết nội dung, biên tập landing page và phối hợp marketing.',
    previewSummary2: 'Đã đính kèm CV PDF và portfolio cá nhân.',
    previewSummary3: 'Có thể bắt đầu trong 2 tuần.',
    skillTitle: 'Kỹ năng nổi bật',
    noteTitle: 'Ghi chú nội bộ',
    noteText: 'Ứng viên phù hợp với vai trò content, nên ưu tiên chuyển sang shortlist trước khi phỏng vấn.',
    timelineTitle: 'Lịch sử xử lý',
    timeline1: '10:24 - Hồ sơ được nộp qua job post',
    timeline2: '10:31 - Nhà tuyển dụng đã mở CV',
    timeline3: '10:48 - Được gắn mức phù hợp 92%',
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
    shortlist: 'Save candidate',
    invite: 'Invite to interview',
    previewTitle: 'Open profile',
    previewSubtitle: 'Nguyễn Minh Anh',
    previewRole: 'Content specialist',
    previewLocation: 'Hanoi',
    previewMatch: '92% match',
    previewStatus: 'New',
    previewSummaryTitle: 'Quick facts',
    previewSummary1: '4 years writing content, building landing pages, and supporting marketing campaigns.',
    previewSummary2: 'CV PDF and personal portfolio are attached.',
    previewSummary3: 'Available in 2 weeks.',
    skillTitle: 'Top skills',
    noteTitle: 'Internal note',
    noteText: 'Strong fit for content roles, so shortlist before scheduling an interview.',
    timelineTitle: 'Processing history',
    timeline1: '10:24 - Profile submitted from job post',
    timeline2: '10:31 - CV opened by employer',
    timeline3: '10:48 - Match score set to 92%',
  },
} as const;

const applications = [
  {
    name: 'Nguyễn Minh Anh',
    role: 'Chuyên viên nội dung số',
    location: 'Hà Nội',
    match: '92%',
    status: 'Mới',
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
    status: 'Mời phỏng vấn',
    updated: '08:40',
    file: '/cv-demo.pdf',
    signal: 'Chủ động',
  },
  {
    name: 'Phạm Gia Huy',
    role: 'Chuyên viên vận hành',
    location: 'Toàn quốc',
    match: '79%',
    status: 'Mới',
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
  const selected = applications[0];

  return (
    <EmployerRouteGate>
      <main id="main-content" className="mx-auto w-full max-w-7xl px-4 pt-4 pb-8 sm:px-6 lg:px-8 lg:pt-4 lg:pb-12">
        <PageBreadcrumb items={crumbs} className="mb-2" />

        <section className="space-y-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-3">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">{t.eyebrow}</p>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.title}</h1>
                <p className="text-muted-foreground">{t.desc}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
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
              <a
                href="/cv-demo.pdf"
                download
                className={buttonVariants({
                  className:
                    'h-11 rounded-none border-[#0b0c0c] px-6 text-sm font-semibold text-[#0b0c0c] focus-visible:border-[#ffdd00] focus-visible:!outline focus-visible:!outline-[3px] focus-visible:!outline-offset-[3px] focus-visible:!outline-[#ffdd00]',
                })}
              >
                <Download className="mr-2 h-4 w-4" aria-hidden="true" />
                {t.export}
              </a>
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

          <Card className="rounded-none border border-border shadow-lg">
            <CardHeader className="border-b">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-2xl">{t.candidateTableTitle}</CardTitle>
                  <p className="text-sm text-muted-foreground">{t.candidateTableNote}</p>
                </div>
                <span className="inline-flex items-center gap-2 rounded-none border border-[#0b0c0c] bg-muted/40 px-3 py-1 text-xs font-semibold text-[#0b0c0c]">
                  <Users className="h-4 w-4" aria-hidden="true" />
                  {locale === 'en' ? 'CV queue' : 'Hàng chờ xử lý'}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 p-5">
              <div className="grid gap-4 lg:grid-cols-[1.2fr_0.6fr_0.6fr_0.6fr]">
                <div className="space-y-2">
                  <label className="text-sm font-medium">{locale === 'en' ? 'Search' : 'Tìm kiếm'}</label>
                  <div className="flex h-12 items-center gap-2 rounded-none border-2 border-[#0b0c0c] bg-background px-4">
                    <Search className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                    <input
                      type="text"
                      placeholder={t.searchPlaceholder}
                      className="h-full w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">{t.statusLabel}</label>
                  <Select defaultValue="Tất cả">
                    <SelectTrigger className="h-12 w-full rounded-none border-2 border-[#0b0c0c] bg-background px-4 text-sm shadow-none focus-visible:border-[#ffdd00] focus-visible:!outline focus-visible:!outline-[3px] focus-visible:!outline-offset-[3px] focus-visible:!outline-[#ffdd00] focus-visible:ring-0">
                      <SelectValue placeholder={t.statusAll} />
                    </SelectTrigger>
                    <SelectContent className="rounded-none border-2 border-[#0b0c0c] bg-white p-1 shadow-none ring-0">
                      <SelectItem value="Tất cả">Tất cả</SelectItem>
                      <SelectItem value="Mới">Mới</SelectItem>
                      <SelectItem value="Đã xem">Đã xem</SelectItem>
                      <SelectItem value="Mời phỏng vấn">Mời phỏng vấn</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">{t.jobLabel}</label>
                  <Select defaultValue="Tất cả vị trí">
                    <SelectTrigger className="h-12 w-full rounded-none border-2 border-[#0b0c0c] bg-background px-4 text-sm shadow-none focus-visible:border-[#ffdd00] focus-visible:!outline focus-visible:!outline-[3px] focus-visible:!outline-offset-[3px] focus-visible:!outline-[#ffdd00] focus-visible:ring-0">
                      <SelectValue placeholder={t.jobAll} />
                    </SelectTrigger>
                    <SelectContent className="rounded-none border-2 border-[#0b0c0c] bg-white p-1 shadow-none ring-0">
                      <SelectItem value="Tất cả vị trí">Tất cả vị trí</SelectItem>
                      <SelectItem value="Chuyên viên nội dung số">Chuyên viên nội dung số</SelectItem>
                      <SelectItem value="Nhân viên hành chính">Nhân viên hành chính</SelectItem>
                      <SelectItem value="Trợ lý dữ liệu">Trợ lý dữ liệu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">{t.sortLabel}</label>
                  <Select defaultValue="Phù hợp nhất">
                    <SelectTrigger className="h-12 w-full rounded-none border-2 border-[#0b0c0c] bg-background px-4 text-sm shadow-none focus-visible:border-[#ffdd00] focus-visible:!outline focus-visible:!outline-[3px] focus-visible:!outline-offset-[3px] focus-visible:!outline-[#ffdd00] focus-visible:ring-0">
                      <SelectValue placeholder={t.sortMatch} />
                    </SelectTrigger>
                    <SelectContent className="rounded-none border-2 border-[#0b0c0c] bg-white p-1 shadow-none ring-0">
                      <SelectItem value="Mới nhất">Mới nhất</SelectItem>
                      <SelectItem value="Phù hợp nhất">Phù hợp nhất</SelectItem>
                      <SelectItem value="Cũ nhất">Cũ nhất</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[980px] text-left text-sm">
                  <caption className="sr-only">{t.candidateTableTitle}</caption>
                  <thead className="border-b text-muted-foreground">
                    <tr>
                      {t.columns.map((column) => (
                        <th key={column} className="px-4 py-3 font-medium">
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((item) => (
                      <tr key={item.name} className="border-b last:border-0">
                        <td className="px-4 py-4">
                          <div className="space-y-1">
                            <p className="font-medium text-foreground">{item.name}</p>
                            <span className="inline-flex rounded-none bg-muted/40 px-2 py-1 text-xs font-semibold text-foreground">
                              {item.signal}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4">{item.role}</td>
                        <td className="px-4 py-4">
                          <span className="inline-flex items-center gap-1.5 rounded-none border border-[#0b0c0c] px-3 py-1 text-xs font-semibold text-[#0b0c0c]">
                            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                            {item.location}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span className="inline-flex items-center gap-1.5 rounded-none border border-[#0b0c0c] px-3 py-1 text-xs font-semibold text-[#0b0c0c]">
                            <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
                            {item.match}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span className="inline-flex rounded-none bg-muted/40 px-3 py-1 text-xs font-semibold text-foreground">
                            {item.status}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                            <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                            {item.updated}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex flex-wrap gap-2">
                            <a
                              href={item.file}
                              target="_blank"
                              rel="noreferrer"
                              className={buttonVariants({
                                variant: 'outline',
                                className:
                                  'h-9 rounded-none border-[#0b0c0c] bg-white px-3 text-xs font-medium text-[#0b0c0c] hover:bg-[#ececec] focus-visible:border-[#ffdd00] focus-visible:!outline focus-visible:!outline-[3px] focus-visible:!outline-offset-[3px] focus-visible:!outline-[#ffdd00]',
                              })}
                            >
                              <FileText className="mr-2 h-4 w-4" aria-hidden="true" />
                              {t.openCv}
                            </a>
                            <a
                              href={item.file}
                              download
                              className={buttonVariants({
                                variant: 'default',
                                className:
                                  'h-9 rounded-none px-3 text-xs font-medium focus-visible:border-[#ffdd00] focus-visible:!outline focus-visible:!outline-[3px] focus-visible:!outline-offset-[3px] focus-visible:!outline-[#ffdd00]',
                              })}
                            >
                              <Download className="mr-2 h-4 w-4" aria-hidden="true" />
                              {t.downloadCv}
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <Card className="rounded-none border border-border shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">{t.previewTitle}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {locale === 'en' ? 'Focused candidate review' : 'Xem nhanh ứng viên đang mở'}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start justify-between gap-4 rounded-none border bg-background p-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-xl font-semibold">{t.previewSubtitle}</h2>
                      <span className="rounded-none bg-muted/40 px-2 py-1 text-xs font-semibold text-foreground">
                        {t.previewStatus}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{t.previewRole}</p>
                    <p className="text-sm text-muted-foreground">{t.previewLocation}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-none border border-[#0b0c0c] px-3 py-1 text-xs font-semibold text-[#0b0c0c]">
                    <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                    {t.previewMatch}
                  </span>
                </div>

                <div className="rounded-none border bg-background p-4">
                  <p className="font-medium text-foreground">{t.previewSummaryTitle}</p>
                  <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                    <li>{t.previewSummary1}</li>
                    <li>{t.previewSummary2}</li>
                    <li>{t.previewSummary3}</li>
                  </ul>
                </div>

                <div className="rounded-none border bg-background p-4">
                  <p className="font-medium text-foreground">{t.skillTitle}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {['SEO', 'Content', 'Landing page', 'Marketing', 'Research'].map((skill) => (
                      <span key={skill} className="rounded-none bg-muted/40 px-3 py-1 text-xs font-semibold text-foreground">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-none border bg-background p-4">
                  <p className="font-medium text-foreground">{locale === 'en' ? 'Applicant workflow' : 'Quy trình ứng viên'}</p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-3">
                    {[
                      locale === 'en' ? 'New' : 'Mới',
                      locale === 'en' ? 'Under review' : 'Đang duyệt',
                      locale === 'en' ? 'Interview' : 'Phỏng vấn',
                    ].map((item, index) => (
                      <div
                        key={item}
                        className={[
                          'rounded-none border px-3 py-2 text-sm font-medium',
                          index === 0
                            ? 'border-[#0b0c0c] bg-white text-[#0b0c0c]'
                            : 'border-slate-200 bg-white text-slate-500',
                        ].join(' ')}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <CandidateStatusActions locale={locale} />

                <div className="grid gap-3 sm:grid-cols-2">
                  <a
                    href={selected.file}
                    target="_blank"
                    rel="noreferrer"
                    className={buttonVariants({
                      variant: 'outline',
                      className:
                        'h-12 rounded-none border-[#0b0c0c] bg-white text-[#0b0c0c] hover:bg-[#ececec] focus-visible:border-[#ffdd00] focus-visible:!outline focus-visible:!outline-[3px] focus-visible:!outline-offset-[3px] focus-visible:!outline-[#ffdd00]',
                    })}
                  >
                    <FileText className="mr-2 h-4 w-4" aria-hidden="true" />
                    {t.openCv}
                  </a>
                  <a
                    href={selected.file}
                    download
                    className={buttonVariants({
                      className:
                        'h-12 rounded-none px-4 text-[#0b0c0c] focus-visible:border-[#ffdd00] focus-visible:!outline focus-visible:!outline-[3px] focus-visible:!outline-offset-[3px] focus-visible:!outline-[#ffdd00]',
                    })}
                  >
                    <Download className="mr-2 h-4 w-4" aria-hidden="true" />
                    {t.downloadCv}
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-none border border-border shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">{locale === 'en' ? 'Processing workflow' : 'Quy trình xử lý'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-none border bg-background p-4 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">{t.noteTitle}</p>
                  <p className="mt-2">{t.noteText}</p>
                </div>

                <div className="rounded-none border bg-background p-4">
                  <p className="font-medium text-foreground">{t.timelineTitle}</p>
                  <ul className="mt-3 space-y-3 text-sm text-muted-foreground">
                    {[t.timeline1, t.timeline2, t.timeline3].map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    className={buttonVariants({
                      variant: 'outline',
                      className:
                        'h-12 rounded-none border-[#0b0c0c] bg-white text-[#0b0c0c] hover:bg-[#ececec] focus-visible:border-[#ffdd00] focus-visible:!outline focus-visible:!outline-[3px] focus-visible:!outline-offset-[3px] focus-visible:!outline-[#ffdd00]',
                    })}
                  >
                    {t.shortlist}
                  </button>
                  <button
                    type="button"
                    className={buttonVariants({
                      className:
                        'h-12 rounded-none px-4 text-[#0b0c0c] focus-visible:border-[#ffdd00] focus-visible:!outline focus-visible:!outline-[3px] focus-visible:!outline-offset-[3px] focus-visible:!outline-[#ffdd00]',
                    })}
                  >
                    {t.invite}
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </EmployerRouteGate>
  );
}
