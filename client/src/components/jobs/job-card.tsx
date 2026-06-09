/**
 * @file        src/components/jobs/job-card.tsx
 * @description Accessible Job Card component for listing jobs.
 * @module      Components/Jobs
 *
 * @author      Antigravity
 * @created     2026-06-10
 * @updated     2026-06-10
 *
 * @wcag        1.3.1 Info and Relationships (A) - Semantic headings
 *              1.4.3 Contrast (Minimum) (AA) - Ensures text contrast
 *              2.4.4 Link Purpose (In Context) (A) - Descriptive view link
 *              2.4.7 Focus Visible (AA) - Visible focus on keyboard nav
 */

import { Job } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Building2, MapPin, Briefcase, BookmarkPlus } from "lucide-react";

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const t = useTranslations("Jobs");

  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return t("salaryNotDisclosed");
    if (min && !max) return `Từ ${min.toLocaleString()}đ`;
    if (!min && max) return `Lên đến ${max.toLocaleString()}đ`;
    return `${min?.toLocaleString()}đ - ${max?.toLocaleString()}đ`;
  };

  return (
    <Card className="group relative overflow-hidden transition-all hover:shadow-md focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-xl font-bold">
              {/* The link wraps only the title, but the card visually highlights */}
              <Link 
                href={`/jobs/${job.slug}`}
                className="text-primary hover:underline focus:outline-none"
                aria-label={t("viewDetails", { title: job.title })}
              >
                {job.title}
              </Link>
            </CardTitle>
            <div className="flex items-center text-muted-foreground font-medium">
              <Building2 className="mr-1.5 h-4 w-4" aria-hidden="true" />
              <span>{job.employer.companyName}</span>
            </div>
          </div>
          <Button variant="ghost" size="icon" aria-label={t("saveJob")} title={t("saveJob")}>
            <BookmarkPlus className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pb-4">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="inline-flex items-center rounded-md bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
            <MapPin className="mr-1 h-3 w-3" /> {job.location}
          </span>
          <span className="inline-flex items-center rounded-md bg-blue-100 dark:bg-blue-900/30 px-2.5 py-0.5 text-xs font-semibold text-blue-700 dark:text-blue-300">
            <Briefcase className="mr-1 h-3 w-3" /> {job.jobType}
          </span>
          <span className="inline-flex items-center rounded-md bg-green-100 dark:bg-green-900/30 px-2.5 py-0.5 text-xs font-semibold text-green-700 dark:text-green-300">
            {formatSalary(job.salaryMin, job.salaryMax)}
          </span>
        </div>
        
        {/* Disability Types Badges */}
        <div className="flex flex-wrap gap-1">
          {job.disabilityTypes.map(type => (
            <span key={type} className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium text-muted-foreground">
              {type}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
