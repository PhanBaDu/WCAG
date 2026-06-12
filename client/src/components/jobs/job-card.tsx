import { Briefcase, Building2, BookmarkPlus, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@/i18n/routing';
import type { Job } from '@/lib/types';

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return 'Thỏa thuận';
    if (min && !max) return `Từ ${min.toLocaleString()}đ`;
    if (!min && max) return `Lên đến ${max.toLocaleString()}đ`;
    return `${min?.toLocaleString()}đ - ${max?.toLocaleString()}đ`;
  };

  return (
    <Card className="group relative overflow-hidden transition-all hover:shadow-md focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-xl font-bold">
              <Link href={`/jobs/${job.slug}`} className="text-primary hover:underline focus:outline-none">
                {job.title}
              </Link>
            </CardTitle>
            <div className="flex items-center font-medium text-muted-foreground">
              <Building2 className="mr-1.5 h-4 w-4" aria-hidden="true" />
              <span>{job.employer.companyName}</span>
            </div>
          </div>
          <Button variant="ghost" size="icon" aria-label="Lưu việc làm" title="Lưu việc làm">
            <BookmarkPlus className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" aria-hidden="true" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-md bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
            <MapPin className="mr-1 h-3 w-3" aria-hidden="true" />
            {job.location}
          </span>
          <span className="inline-flex items-center rounded-md bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
            <Briefcase className="mr-1 h-3 w-3" aria-hidden="true" />
            {job.jobType}
          </span>
          <span className="inline-flex items-center rounded-md bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">
            {formatSalary(job.salaryMin, job.salaryMax)}
          </span>
        </div>

        <div className="flex flex-wrap gap-1">
          {job.disabilityTypes.map((type) => (
            <span key={type} className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium text-muted-foreground">
              {type}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
