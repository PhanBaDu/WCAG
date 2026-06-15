'use client';

import { Link } from '@/i18n/routing';
import type { MockJobListing } from '@/lib/jobs/types';

const postedLabels = {
  vi: ['Đăng 2 ngày trước', 'Đăng 3 ngày trước', 'Đăng 1 tuần trước', 'Đăng 2 tuần trước'],
  en: ['Posted 2 days ago', 'Posted 3 days ago', 'Posted 1 week ago', 'Posted 2 weeks ago'],
} as const;

function companyInitials(company: string) {
  return company
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function postedLabel(slug: string, locale: 'vi' | 'en') {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash += slug.charCodeAt(i);
  }
  return postedLabels[locale][hash % postedLabels[locale].length];
}

type JobResultCardProps = {
  job: MockJobListing;
  locale: 'vi' | 'en';
};

export function JobResultCard({ job, locale }: JobResultCardProps) {
  const summaryTags = job.tags.slice(0, 2);
  const extraTagCount = job.tags.length - summaryTags.length;
  const summaryText =
    extraTagCount > 0
      ? `${summaryTags.join(' | ')} | +${extraTagCount}`
      : summaryTags.join(' | ');

  return (
    <article className="w-full min-w-0 rounded-xl border border-[#0b0c0c] bg-card p-4 transition-shadow hover:shadow-md has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-[#ffdd00] has-[:focus-visible]:outline-offset-[3px]">
      <div className="flex gap-4">
        <div
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-sm font-bold text-[#0b0c0c]"
          aria-hidden="true"
        >
          {companyInitials(job.company)}
        </div>

        <div className="w-full min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-base font-bold leading-snug">
              <Link
                href={`/jobs/${job.slug}`}
                className="line-clamp-2 text-[#0b0c0c] no-underline hover:text-[#0b0c0c] focus-visible:outline-none"
              >
                {job.title}
              </Link>
            </h3>
            <span className="shrink-0 text-sm font-bold text-[#0b0c0c]">{job.salary}</span>
          </div>

          <p className="mt-1 truncate text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {job.company}
          </p>

          <div className="mt-2 flex flex-wrap gap-2">
            <span className="rounded-md bg-muted px-2.5 py-1 text-xs text-foreground">{job.location}</span>
            <span className="rounded-md bg-muted px-2.5 py-1 text-xs text-foreground">{job.experience}</span>
          </div>

          <div className="mt-3 flex items-center justify-between gap-3">
            <p className="min-w-0 truncate text-sm text-muted-foreground">{summaryText}</p>
            <div className="flex shrink-0 items-center">
              <span className="whitespace-nowrap text-xs text-muted-foreground">
                {postedLabel(job.slug, locale)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
