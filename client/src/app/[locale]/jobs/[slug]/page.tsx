import { Metadata } from 'next';
import { ArrowLeft, BadgeCheck, Building2, CheckCircle2, Clock3, MapPin, Briefcase, ShieldCheck } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@/i18n/routing';

const copy = {
  vi: {
    title: 'Chuyên viên nội dung số',
    company: 'Công ty Cổ phần Công nghệ Access Tech',
    location: 'Hà Nội',
    salary: '10 - 15 triệu',
    type: 'Toàn thời gian',
    description:
      'Vai trò này tập trung vào viết nội dung cho website, mạng xã hội và tài liệu giới thiệu sản phẩm. Giao diện tĩnh minh họa cách công việc được trình bày rõ ràng, dễ đọc và có điểm nhấn tiếp cận tốt cho người dùng bàn phím.',
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
    descriptionTitle: 'Mô tả công việc',
    requirementsTitle: 'Yêu cầu',
    benefitsTitle: 'Quyền lợi',
    supportTitle: 'Hỗ trợ tiếp cận',
    applyTitle: 'Thông tin ứng tuyển',
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
      'This role focuses on writing content for the website, social channels, and product materials. The static layout demonstrates how the job information is presented clearly, is easy to read, and works well for keyboard users.',
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
    descriptionTitle: 'Job description',
    requirementsTitle: 'Requirements',
    benefitsTitle: 'Benefits',
    supportTitle: 'Accessibility support',
    applyTitle: 'Application details',
    jobCode: 'Job code',
    deadline: 'Deadline',
    posted: 'Posted 2 days ago',
    remoteReady: 'Ready for online interviews',
    applyNow: 'Apply now',
    viewMore: 'View more jobs',
  },
} as const;

export async function generateMetadata({ params }: { params: { locale: string; slug: string } }): Promise<Metadata> {
  const locale = params.locale === 'en' ? 'en' : 'vi';
  const job = copy[locale];
  return {
    title:
      locale === 'en'
        ? `${job.title} (${params.slug}) - ${job.company} | Accessible Jobs`
        : `${job.title} (${params.slug}) - ${job.company} | Cổng Việc Làm Người Khuyết Tật`,
    description: job.description.slice(0, 160),
  };
}

export default function JobDetailPage({ params }: { params: { locale: string; slug: string } }) {
  const locale = params.locale === 'en' ? 'en' : 'vi';
  const job = copy[locale];
  return (
    <main id="main-content" className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <Link href="/jobs" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {job.back}
      </Link>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'JobPosting',
            title: job.title,
            description: job.description,
            employmentType: job.type,
            hiringOrganization: {
              '@type': 'Organization',
              name: job.company,
            },
            jobLocation: {
              '@type': 'Place',
              address: {
                '@type': 'PostalAddress',
                addressLocality: job.location,
              },
            },
          }),
        }}
      />

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.6fr_0.9fr]">
        <section className="space-y-6">
          <Card className="border-none shadow-lg">
            <CardHeader className="space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-primary">
                {job.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-primary/10 px-3 py-1">
                    {tag}
                  </span>
                ))}
              </div>

              <CardTitle className="text-3xl font-bold tracking-tight sm:text-4xl">{job.title}</CardTitle>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <Building2 className="h-4 w-4" aria-hidden="true" />
                  {job.company}
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  {job.location}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Briefcase className="h-4 w-4" aria-hidden="true" />
                  {job.type}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock3 className="h-4 w-4" aria-hidden="true" />
                  {job.posted}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-800">
                  {job.salary}
                </span>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                  {job.remoteReady}
                </span>
              </div>
            </CardHeader>
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">{job.descriptionTitle}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p className="leading-relaxed">{job.description}</p>
              <p className="leading-relaxed">
                Trang chi tiết này giữ bố cục rõ ràng với heading, danh sách và khối nội dung đủ tương phản để bạn chốt layout trước.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">{job.requirementsTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {job.requirements.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">{job.benefitsTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {job.benefits.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                    <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        <aside className="space-y-6">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">{job.supportTitle}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              {job.support.map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl bg-muted/40 p-3">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">{job.applyTitle}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-2xl border bg-background p-4">
                <p className="text-sm font-medium text-muted-foreground">{job.jobCode}</p>
                <p className="mt-1 font-semibold">{params.slug}</p>
              </div>
              <div className="rounded-2xl border bg-background p-4">
                <p className="text-sm font-medium text-muted-foreground">{job.deadline}</p>
                <p className="mt-1 font-semibold">30/06/2026</p>
              </div>
              <div className="grid gap-3">
                <Link href="/register" className={buttonVariants({ className: 'h-11 w-full rounded-xl' })}>
                  {job.applyNow}
                </Link>
                <Link href="/jobs" className={buttonVariants({ variant: 'outline', className: 'h-11 w-full rounded-xl' })}>
                  {job.viewMore}
                </Link>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </main>
  );
}
