import { Metadata } from 'next';
import Image from 'next/image';
import Script from 'next/script';
import {
  ArrowLeft,
  BadgeCheck,
  Building2,
  Briefcase,
  CheckCircle2,
  Clock3,
  MapPin,
  ShieldCheck,
  ArrowUp,
} from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { PageBreadcrumb } from '@/components/layout/page-breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@/i18n/routing';
import { JobResultCard } from '@/components/jobs/job-result-card';
import { getHotJobs, getMockJobs } from '@/lib/jobs/mock-jobs';
import { getCompanyLogoAlt, getCompanyLogoSrc } from '@/lib/jobs/company-logo';

const copy = {
  vi: {
    title: 'Chuyên viên nội dung số',
    company: 'Công ty Cổ phần Công nghệ Access Tech',
    location: 'Hà Nội',
    salary: '10 - 15 triệu',
    type: 'Toàn thời gian',
    description:
      'Vai trò này tập trung vào viết nội dung cho website, mạng xã hội và tài liệu giới thiệu sản phẩm. Giao diện mới ưu tiên phần tóm tắt rõ ràng, cột hành động cố định và các khối nội dung dễ quét bằng mắt.',
    requirements: [
      'Có khả năng viết rõ ràng, mạch lạc bằng tiếng Việt.',
      'Biết tổ chức nội dung theo heading, danh sách và đoạn ngắn.',
      'Ưu tiên ứng viên quen làm việc với quy trình có tài liệu rõ ràng.',
      'Sẵn sàng phối hợp với thiết kế, marketing và sản phẩm.',
    ],
    benefits: [
      'Môi trường làm việc linh hoạt, thân thiện với người khuyết tật.',
      'Bố trí chỗ ngồi dễ tiếp cận, lối đi rộng và thang máy.',
      'Có hỗ trợ đào tạo và onboarding theo tài liệu.',
      'Chế độ phúc lợi minh bạch theo từng giai đoạn.',
    ],
    support: [
      'Đường dốc và lối vào không bậc thềm',
      'Khu vực làm việc yên tĩnh',
      'Có thể trao đổi bằng văn bản thay cho cuộc họp dài',
      'Chấp nhận làm việc hybrid hoặc từ xa khi phù hợp',
    ],
    tags: ['Ưu tiên NKT', 'Hybrid', 'Có onboarding'],
    back: 'Quay lại danh sách việc làm',
    backToJobs: 'Quay lại danh sách việc làm',
    scrollTop: 'Lên đầu trang',
    overviewTitle: 'Tổng quan',
    descriptionTitle: 'Mô tả công việc',
    requirementsTitle: 'Yêu cầu',
    benefitsTitle: 'Quyền lợi',
    supportTitle: 'Hỗ trợ tiếp cận',
    applyTitle: 'Ứng tuyển nhanh',
    quickFactsTitle: 'Thông tin nhanh',
    relatedTitle: 'Việc làm tương tự',
    jobCode: 'Mã công việc',
    deadline: 'Hạn nộp',
    posted: 'Đăng 2 ngày trước',
    remoteReady: 'Sẵn sàng phỏng vấn online',
    applyNow: 'Ứng tuyển ngay',
    viewMore: 'Xem việc làm khác',
  },
  en: {
    title: 'Content specialist',
    company: 'Access Tech JSC',
    location: 'Hanoi',
    salary: '10 - 15 million VND',
    type: 'Full time',
    description:
      'This role focuses on writing content for the website, social channels, and product materials. The new layout puts the summary first, keeps the CTA in a sticky column, and makes every section easy to scan.',
    requirements: [
      'Able to write clearly and concisely in Vietnamese.',
      'Can structure content with headings, lists, and short paragraphs.',
      'Prefer candidates who are comfortable with a documented workflow.',
      'Ready to collaborate with design, marketing, and product teams.',
    ],
    benefits: [
      'Flexible and disability-friendly workplace.',
      'Accessible seating, wide aisles, and elevator access.',
      'Training and onboarding supported by documentation.',
      'Transparent benefits across each stage.',
    ],
    support: [
      'Step-free entrance and ramp access',
      'Quiet workspace',
      'Text-based communication available instead of long meetings',
      'Hybrid or remote work when appropriate',
    ],
    tags: ['Priority for PwD', 'Hybrid', 'Onboarding'],
    back: 'Back to jobs list',
    backToJobs: 'Back to jobs list',
    scrollTop: 'Back to top',
    overviewTitle: 'Overview',
    descriptionTitle: 'Job description',
    requirementsTitle: 'Requirements',
    benefitsTitle: 'Benefits',
    supportTitle: 'Accessibility support',
    applyTitle: 'Quick apply',
    quickFactsTitle: 'Quick facts',
    relatedTitle: 'Similar jobs',
    jobCode: 'Job code',
    deadline: 'Deadline',
    posted: 'Posted 2 days ago',
    remoteReady: 'Ready for online interviews',
    applyNow: 'Apply now',
    viewMore: 'View more jobs',
  },
} as const;

function getJobDetailData(locale: 'vi' | 'en', slug: string) {
  const jobs = getMockJobs(locale);
  const listing = jobs.find((job) => job.slug === slug) ?? null;
  const detail = copy[locale];

  return {
    jobs,
    listing,
    detail,
    title: listing?.title ?? detail.title,
    company: listing?.company ?? detail.company,
    location: listing?.location ?? detail.location,
    type: listing?.type ?? detail.type,
    salary: listing?.salary ?? detail.salary,
    experience: listing?.experience ?? (locale === 'en' ? 'Entry level' : 'Dưới 1 năm'),
    category: listing?.category ?? (locale === 'en' ? 'Content / Writing' : 'Nội dung'),
    industry: listing?.industry ?? (locale === 'en' ? 'Media / Marketing' : 'Marketing / Truyền thông'),
    disabilityTypes: listing?.disabilityTypes ?? [],
    tags: listing?.tags ?? detail.tags,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: routeLocale, slug } = await params;
  const locale = routeLocale === 'en' ? 'en' : 'vi';
  const job = getJobDetailData(locale, slug);
  return {
    title:
      locale === 'en'
        ? `${job.title} (${slug}) - ${job.company} | Accessible Jobs`
        : `${job.title} (${slug}) - ${job.company} | Cổng Việc Làm Người Khuyết Tật`,
    description: job.detail.description.slice(0, 160),
  };
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: routeLocale, slug } = await params;
  const locale = routeLocale === 'en' ? 'en' : 'vi';
  const { jobs, detail, title, company, location, type, salary, experience, category, industry, disabilityTypes, tags } =
    getJobDetailData(locale, slug);
  const relatedJobs = [
    ...jobs.filter((item) => item.slug !== slug && (item.category === category || item.industry === industry)),
    ...getHotJobs(jobs, 8).filter((item) => item.slug !== slug),
  ]
    .filter((item, index, array) => array.findIndex((candidate) => candidate.slug === item.slug) === index)
    .slice(0, 4);

  const crumbs =
    locale === 'en'
      ? [
          { label: 'Home', href: '/' },
          { label: 'Jobs', href: '/jobs' },
          { label: title },
        ]
      : [
          { label: 'Trang chủ', href: '/' },
          { label: 'Việc làm', href: '/jobs' },
          { label: title },
        ];

  const facts = [
    { icon: Building2, label: locale === 'en' ? 'Company' : 'Doanh nghiệp', value: company },
    { icon: MapPin, label: locale === 'en' ? 'Location' : 'Địa điểm', value: location },
    { icon: Briefcase, label: locale === 'en' ? 'Work type' : 'Hình thức', value: type },
    { icon: Clock3, label: locale === 'en' ? 'Posted' : 'Đăng', value: detail.posted },
  ];

  const mustHaveSkills =
    locale === 'en'
      ? ['Excel', 'PowerPoint', 'Communication', 'Office software', 'Teamwork']
      : ['Excel', 'PowerPoint', 'Giao tiếp', 'Tin học văn phòng', 'Làm việc nhóm'];
  const niceSkills =
    locale === 'en'
      ? ['AutoCAD 2D basics', 'Working with documentation', 'Text-first communication']
      : ['Autocad 2D cơ bản', 'Làm việc với tài liệu', 'Giao tiếp bằng văn bản'];
  const safetyTips =
    locale === 'en'
      ? [
          'Check company details, job description, and the hiring contact before applying.',
          'Prefer transparent postings with clear responsibilities and application steps.',
          'Avoid paying fees or sharing sensitive personal data too early.',
        ]
      : [
          'Kiểm tra thông tin công ty, mô tả việc làm và đầu mối tuyển dụng trước khi ứng tuyển.',
          'Ưu tiên tin tuyển dụng có mô tả rõ ràng và quy trình ứng tuyển minh bạch.',
          'Không nộp phí hoặc chia sẻ dữ liệu nhạy cảm quá sớm.',
        ];
  const companySize = locale === 'en' ? '500-1000 employees' : '500-1000 nhân viên';
  const companyField = industry;
  const companyAddress = location;
  const workMode = type;
  const level = locale === 'en' ? 'Staff' : 'Nhân viên';
  const education = locale === 'en' ? 'College or above' : 'Cao đẳng trở lên';
  const openings = locale === 'en' ? '1 position' : '1 người';
  const employmentType = type;
  const summaryCards = [
    { label: locale === 'en' ? 'Salary' : 'Mức lương', value: salary },
    { label: locale === 'en' ? 'Location' : 'Địa điểm', value: location },
    { label: locale === 'en' ? 'Experience' : 'Kinh nghiệm', value: experience },
  ];

  return (
    <main id="main-content" className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <PageBreadcrumb items={crumbs} />

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <Link href="/jobs" className="gov-link inline-flex items-center gap-2 text-sm font-medium">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {detail.back}
        </Link>
        <span className="text-sm text-muted-foreground">{detail.remoteReady}</span>
      </div>

      <Script
        id={`jobposting-${slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'JobPosting',
            title,
            description: detail.description,
            employmentType: employmentType,
            hiringOrganization: {
              '@type': 'Organization',
              name: company,
            },
            jobLocation: {
              '@type': 'Place',
              address: {
                '@type': 'PostalAddress',
                addressLocality: location,
              },
            },
          }),
        }}
      />

      <section className="mt-6 space-y-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(18rem,0.95fr)] lg:items-start">
          <Card className="border-none shadow-lg">
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span key={tag} className="rounded-none bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-5 space-y-5">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
                <p className="max-w-3xl text-base leading-7 text-muted-foreground">{detail.description}</p>

                <div className="grid gap-3 md:grid-cols-3">
                  {summaryCards.map((item) => (
                    <div key={item.label} className="rounded-none border border-border bg-background px-4 py-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{item.label}</p>
                      <p className="mt-1 text-sm font-medium text-[#0b0c0c]">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link href="/register" className={buttonVariants({ className: 'h-11 rounded-none px-6' })}>
                    {detail.applyNow}
                  </Link>
                  <Link href="/jobs" className={buttonVariants({ variant: 'outline', className: 'h-11 rounded-none px-6' })}>
                    {detail.viewMore}
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center border border-border bg-background p-1.5">
                  <Image
                    src={getCompanyLogoSrc(company)}
                    alt={getCompanyLogoAlt(company)}
                    width={64}
                    height={64}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="min-w-0 flex-1 space-y-1">
                  <h2 className="text-xl font-semibold leading-snug text-[#0b0c0c]">{company}</h2>
                  <p className="text-sm text-muted-foreground">
                    {locale === 'en' ? 'Company snapshot' : 'Thông tin doanh nghiệp'}
                  </p>
                </div>
              </div>

              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between gap-4 border-b pb-3">
                  <dt className="text-muted-foreground">{locale === 'en' ? 'Size' : 'Quy mô'}</dt>
                  <dd className="font-medium text-[#0b0c0c]">{companySize}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b pb-3">
                  <dt className="text-muted-foreground">{locale === 'en' ? 'Industry' : 'Lĩnh vực'}</dt>
                  <dd className="text-right font-medium text-[#0b0c0c]">{companyField}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">{locale === 'en' ? 'Location' : 'Địa điểm'}</dt>
                  <dd className="text-right font-medium text-[#0b0c0c]">{companyAddress}</dd>
                </div>
              </dl>

              <div className="mt-5">
                <Link href="/jobs" className={buttonVariants({ variant: 'outline', className: 'h-11 w-full rounded-none' })}>
                  {locale === 'en' ? 'View company jobs' : 'Xem việc làm từ công ty này'}
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(18rem,0.95fr)] lg:items-start">
          <div className="space-y-6">
            <Card className="border-none shadow-lg">
              <CardHeader className="border-b">
                <CardTitle className="text-2xl">{detail.descriptionTitle}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p className="leading-relaxed">{detail.description}</p>
                <p className="leading-relaxed">
                  Bố cục này giữ một khối mô tả lớn, giúp người dùng đọc nhanh thông tin chính trước khi quyết định xem tiếp các phần bên dưới.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardHeader className="border-b">
                <CardTitle className="text-2xl">{detail.requirementsTitle}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex flex-wrap gap-2">
                  {[
                    locale === 'en' ? 'No special experience required' : 'Không yêu cầu kinh nghiệm chuyên môn',
                    locale === 'en' ? 'College or above' : 'Từ Cao đẳng trở lên',
                    locale === 'en' ? 'Open to freshers' : 'Chấp nhận Fresher',
                  ].map((item) => (
                    <span key={item} className="rounded-none bg-muted px-3 py-1 text-xs font-medium text-foreground">
                      {item}
                    </span>
                  ))}
                </div>

                <ul className="space-y-3">
                  {detail.requirements.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardHeader className="border-b">
                <CardTitle className="text-2xl">{detail.benefitsTitle}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex flex-wrap gap-2">
                  {[
                    locale === 'en' ? 'Social insurance' : 'Bảo hiểm xã hội',
                    locale === 'en' ? 'Health insurance' : 'Bảo hiểm sức khỏe',
                    locale === 'en' ? '13th month bonus' : 'Thưởng tháng 13',
                  ].map((item) => (
                    <span key={item} className="rounded-none bg-muted px-3 py-1 text-xs font-medium text-foreground">
                      {item}
                    </span>
                  ))}
                </div>

                <ul className="space-y-3">
                  {detail.benefits.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                      <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardHeader className="border-b">
                <CardTitle className="text-2xl">{locale === 'en' ? 'Working location' : 'Địa điểm làm việc'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <p>
                  {locale === 'en'
                    ? `Working location: ${location}. This role is structured to support accessible communication and a clear onboarding flow.`
                    : `Địa điểm làm việc: ${location}. Vai trò này được trình bày theo hướng rõ ràng, dễ tiếp cận và có quy trình onboarding minh bạch.`}
                </p>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-none border border-border bg-background p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {locale === 'en' ? 'Employment type' : 'Loại hình làm việc'}
                    </p>
                    <p className="mt-1 text-sm font-medium text-[#0b0c0c]">{employmentType}</p>
                  </div>
                  <div className="rounded-none border border-border bg-background p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {locale === 'en' ? 'Experience' : 'Kinh nghiệm'}
                    </p>
                    <p className="mt-1 text-sm font-medium text-[#0b0c0c]">{experience}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardHeader className="border-b">
                <CardTitle className="text-2xl">{detail.relatedTitle}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {relatedJobs.length > 0 ? (
                  relatedJobs.slice(0, 4).map((related) => (
                    <JobResultCard key={related.slug} job={related} locale={locale} />
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {locale === 'en' ? 'No related jobs yet.' : 'Chưa có việc làm liên quan.'}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
            <Card className="border-none shadow-lg">
              <CardHeader className="border-b">
                <CardTitle className="text-xl">{locale === 'en' ? 'General info' : 'Thông tin chung'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">{locale === 'en' ? 'Level' : 'Cấp bậc'}</span>
                  <span className="font-semibold text-[#0b0c0c]">{locale === 'en' ? 'Staff' : 'Nhân viên'}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">{locale === 'en' ? 'Education' : 'Học vấn'}</span>
                  <span className="font-semibold text-[#0b0c0c]">{locale === 'en' ? 'College or above' : 'Cao đẳng trở lên'}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">{locale === 'en' ? 'Openings' : 'Số lượng tuyển'}</span>
                  <span className="font-semibold text-[#0b0c0c]">{locale === 'en' ? '1 person' : '1 người'}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">{locale === 'en' ? 'Work format' : 'Hình thức làm việc'}</span>
                  <span className="text-right font-semibold text-[#0b0c0c]">{type}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">{locale === 'en' ? 'Job type' : 'Loại hình làm việc'}</span>
                  <span className="text-right font-semibold text-[#0b0c0c]">{employmentType}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">{locale === 'en' ? 'Experience' : 'Kinh nghiệm'}</span>
                  <span className="text-right font-semibold text-[#0b0c0c]">{experience}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">{locale === 'en' ? 'Industry' : 'Ngành nghề'}</span>
                  <span className="text-right font-semibold text-[#0b0c0c]">{industry}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardHeader className="border-b">
                <CardTitle className="text-xl">{locale === 'en' ? 'Categories & skills' : 'Danh mục nghề & kỹ năng'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <p className="mb-2 text-sm font-semibold text-[#0b0c0c]">{locale === 'en' ? 'Job category' : 'Danh mục nghề'}</p>
                  <div className="flex flex-wrap gap-2">
                    {[category, industry, experience].map((item) => (
                      <span key={item} className="rounded-none bg-muted px-3 py-1 text-xs text-foreground">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-sm font-semibold text-[#0b0c0c]">{locale === 'en' ? 'Must-have skills' : 'Kỹ năng cần có'}</p>
                  <div className="flex flex-wrap gap-2">
                    {mustHaveSkills.map((item) => (
                      <span key={item} className="rounded-none bg-muted px-3 py-1 text-xs text-foreground">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-sm font-semibold text-[#0b0c0c]">{locale === 'en' ? 'Nice-to-have skills' : 'Kỹ năng nên có'}</p>
                  <div className="flex flex-wrap gap-2">
                    {niceSkills.map((item) => (
                      <span key={item} className="rounded-none bg-muted px-3 py-1 text-xs text-foreground">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {disabilityTypes.length > 0 ? (
                  <div>
                    <p className="mb-2 text-sm font-semibold text-[#0b0c0c]">{locale === 'en' ? 'Suitable for' : 'Phù hợp với'}</p>
                    <div className="flex flex-wrap gap-2">
                      {disabilityTypes.slice(0, 4).map((item) => (
                        <span key={item} className="rounded-none bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardHeader className="border-b">
                <CardTitle className="text-xl">{locale === 'en' ? 'Job search safety tips' : 'Bí kíp tìm việc an toàn'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                {safetyTips.map((item, index) => (
                  <div key={item} className="flex gap-3 rounded-none border border-border bg-muted/30 p-3">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                      {index + 1}
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </aside>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t pt-6">
          <Link href="/jobs" className={buttonVariants({ variant: 'outline', className: 'h-11 rounded-none px-6' })}>
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {detail.backToJobs}
          </Link>
          <Link href="#main-content" className={buttonVariants({ className: 'h-11 rounded-none px-6' })}>
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
            {detail.scrollTop}
          </Link>
        </div>
      </section>
    </main>
  );
}
