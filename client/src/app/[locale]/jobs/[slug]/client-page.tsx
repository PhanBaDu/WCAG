/**
 * @file        src/app/[locale]/jobs/[slug]/client-page.tsx
 * @description Client-side interaction for Job Detail (Apply Modal, Interactivity).
 * @module      Jobs/Detail
 *
 * @author      Antigravity
 * @created     2026-06-10
 * @updated     2026-06-10
 *
 * @wcag        2.4.3 Focus Order (A) - Logical source order
 *              3.3.1 Error Identification (A) - validation announcements
 */

"use client"

import * as React from "react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import { useJobDetailQuery } from "@/hooks/use-jobs"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Building2, MapPin, Briefcase, BookmarkPlus, Clock, UploadCloud, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"
// Note: We use standard dialog since we don't have shadcn dialog installed cleanly yet, or we simulate it

export function JobDetailClient({ slug }: { slug: string }) {
  const t = useTranslations("Jobs")
  
  // Real implementation will use TanStack Query:
  // const { data: job, isLoading, isError } = useJobDetailQuery(slug);
  
  // For UI development, mock data:
  const isLoading = false;
  const isError = false;
  const job = {
    id: "mock-id",
    title: `Chuyên viên Content Marketing`,
    slug,
    description: "Chúng tôi đang tìm kiếm một Chuyên viên Content Marketing sáng tạo, có khả năng viết lách tốt và tư duy thẩm mỹ cao. Bạn sẽ chịu trách nhiệm xây dựng nội dung trên các nền tảng mạng xã hội, website và các chiến dịch truyền thông của công ty.",
    requirements: "• Tốt nghiệp Đại học/Cao đẳng chuyên ngành Báo chí, Truyền thông, Marketing hoặc các ngành liên quan.\n• Có ít nhất 1 năm kinh nghiệm ở vị trí tương đương.\n• Kỹ năng viết và biên tập tốt, biết sử dụng các công cụ thiết kế cơ bản là một lợi thế.\n• Tinh thần trách nhiệm cao, có khả năng làm việc độc lập và làm việc nhóm.",
    benefits: "• Môi trường làm việc năng động, sáng tạo.\n• Lương thưởng hấp dẫn (thỏa thuận theo năng lực).\n• Chế độ BHXH, BHYT, BHTN theo quy định.\n• Các hoạt động teambuilding, du lịch hàng năm.",
    location: "Hà Nội",
    salaryMin: 10000000,
    salaryMax: 15000000,
    jobType: 'FULL_TIME',
    disabilityTypes: ['MOBILITY'],
    accessibilityFeatures: ["Đường dốc cho xe lăn", "Thang máy rộng rãi", "Nhà vệ sinh tiếp cận", "Môi trường không có bậc thềm"],
    expiresAt: new Date(Date.now() + 864000000).toISOString(),
    createdAt: new Date().toISOString(),
    employer: {
      id: "emp-1",
      companyName: "Công ty Cổ phần Công nghệ Access Tech",
    }
  };

  const [isApplyModalOpen, setIsApplyModalOpen] = React.useState(false);
  const [coverLetter, setCoverLetter] = React.useState("");

  if (isLoading) {
    return (
      <div className="container py-12 flex justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (isError || !job) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">{t("jobNotFound")}</h1>
        <p className="text-muted-foreground mb-6">{t("jobNotFoundDesc")}</p>
        <Link href="/jobs" className={buttonVariants()}>{t("backToJobs")}</Link>
      </div>
    );
  }

  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return t("salaryNotDisclosed");
    if (min && !max) return `Từ ${min.toLocaleString()}đ`;
    if (!min && max) return `Lên đến ${max.toLocaleString()}đ`;
    return `${min?.toLocaleString()}đ - ${max?.toLocaleString()}đ`;
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsApplyModalOpen(false);
      toast.success(t("applySuccess"));
    }, 1000);
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "JobPosting",
            "title": job.title,
            "description": job.description,
            "hiringOrganization": {
              "@type": "Organization",
              "name": job.employer.companyName
            },
            "jobLocation": {
              "@type": "Place",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": job.location
              }
            },
            "employmentType": job.jobType
          })
        }}
      />

      {/* JSON-LD Script placed correctly inside fragments */}
      
      <div className="container py-8 max-w-5xl">
        <Link href="/jobs" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("backToJobs")}
        </Link>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8 bg-card p-6 md:p-8 rounded-xl border shadow-sm">
          <div className="space-y-4 flex-1">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">{job.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground font-medium text-sm md:text-base">
              <div className="flex items-center text-primary">
                <Building2 className="mr-2 h-5 w-5" />
                <span>{job.employer.companyName}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                <span>{job.location}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center rounded-md bg-blue-100 dark:bg-blue-900/30 px-3 py-1 text-sm font-semibold text-blue-700 dark:text-blue-300">
                <Briefcase className="mr-1.5 h-4 w-4" /> {job.jobType}
              </span>
              <span className="inline-flex items-center rounded-md bg-green-100 dark:bg-green-900/30 px-3 py-1 text-sm font-semibold text-green-700 dark:text-green-300">
                {formatSalary(job.salaryMin, job.salaryMax)}
              </span>
            </div>
          </div>

          <div className="flex flex-row md:flex-col gap-3 w-full md:w-auto shrink-0">
            <Button size="lg" className="flex-1 md:w-48 text-base h-12" onClick={() => setIsApplyModalOpen(true)}>
              {t("applyNow")}
            </Button>
            <Button size="lg" variant="outline" className="flex-none md:w-48 h-12">
              <BookmarkPlus className="mr-2 h-5 w-5" />
              {t("saveJob")}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <section aria-labelledby="job-description">
              <h2 id="job-description" className="text-xl font-bold mb-4 flex items-center border-b pb-2">
                {t("jobDescription")}
              </h2>
              <div className="prose dark:prose-invert max-w-none text-muted-foreground whitespace-pre-line">
                {job.description}
              </div>
            </section>

            <section aria-labelledby="job-requirements">
              <h2 id="job-requirements" className="text-xl font-bold mb-4 flex items-center border-b pb-2">
                {t("requirements")}
              </h2>
              <div className="prose dark:prose-invert max-w-none text-muted-foreground whitespace-pre-line">
                {job.requirements}
              </div>
            </section>

            <section aria-labelledby="job-benefits">
              <h2 id="job-benefits" className="text-xl font-bold mb-4 flex items-center border-b pb-2">
                {t("benefits")}
              </h2>
              <div className="prose dark:prose-invert max-w-none text-muted-foreground whitespace-pre-line">
                {job.benefits}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <Card className="bg-muted/30">
              <CardHeader>
                <CardTitle className="text-lg">{t("accessibilitySupport")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="text-sm font-medium mb-2">{t("disabilityType")} phù hợp:</div>
                  <div className="flex flex-wrap gap-2">
                    {job.disabilityTypes.map(t => (
                      <span key={t} className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium mb-2">Cơ sở vật chất:</div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {job.accessibilityFeatures.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle2 className="mr-2 h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>

      {/* Sticky Apply Button for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur border-t md:hidden z-50">
        <Button className="w-full h-12 text-base" onClick={() => setIsApplyModalOpen(true)}>
          {t("applyNow")}
        </Button>
      </div>

      {/* Simple Apply Modal (Since we avoid uninstalled shadcn dialog, we build a native accessible overlay) */}
      {isApplyModalOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="w-full max-w-lg bg-card rounded-xl border shadow-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 id="modal-title" className="text-xl font-bold">{t("applyForThisJob")}</h2>
              <button 
                onClick={() => setIsApplyModalOpen(false)}
                className="text-muted-foreground hover:text-foreground"
                aria-label="Đóng cửa sổ"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleApply} className="p-6 overflow-y-auto space-y-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="font-semibold text-sm mb-1">{job.title}</p>
                <p className="text-xs text-muted-foreground">{job.employer.companyName}</p>
              </div>

              <div className="space-y-3">
                <Label>{t("resume")}</Label>
                <div 
                  className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center hover:bg-muted/50 transition-colors cursor-pointer"
                  role="button"
                  tabIndex={0}
                  aria-label={t("uploadResume")}
                >
                  <UploadCloud className="h-10 w-10 text-muted-foreground mb-4" />
                  <p className="text-sm font-medium">{t("uploadResume")}</p>
                  <p className="text-xs text-muted-foreground mt-1">PDF, DOCX (Tối đa 5MB)</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label htmlFor="coverLetter">{t("coverLetter")}</Label>
                  <span className="text-xs text-muted-foreground" aria-live="polite">
                    {t("charactersLeft", { count: 2000 - coverLetter.length })}
                  </span>
                </div>
                <textarea 
                  id="coverLetter"
                  placeholder={t("coverLetterPlaceholder")}
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-32 resize-none"
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  maxLength={2000}
                />
              </div>

              <div className="pt-4 flex gap-3 border-t">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setIsApplyModalOpen(false)}>
                  Hủy
                </Button>
                <Button type="submit" className="flex-1">
                  {t("confirmApply")}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
