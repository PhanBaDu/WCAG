'use client';

import Image from 'next/image';
import { Link } from '@/i18n/routing';
import type { MockJobListing } from '@/lib/jobs/types';
import { getCompanyLogoAlt, getCompanyLogoSrc } from '@/lib/jobs/company-logo';

const postedLabels = {
  vi: ['Đăng 2 ngày trước', 'Đăng 3 ngày trước', 'Đăng 1 tuần trước', 'Đăng 2 tuần trước'],
  en: ['Posted 2 days ago', 'Posted 3 days ago', 'Posted 1 week ago', 'Posted 2 weeks ago'],
} as const;

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

  const detailLabel =
    locale === 'en'
      ? `View details for ${job.title} at ${job.company}`
      : `Xem chi tiết ${job.title} tại ${job.company}`;

  return (
    <article className="relative w-full min-w-0 rounded-none border border-[#0b0c0c] bg-card p-4 transition-[border-color,box-shadow] hover:border-[#ffdd00] hover:shadow-md has-[:focus-visible]:border-[#ffdd00]">
      <Link
        href={`/jobs/${job.slug}`}
        className="absolute inset-0 z-10 rounded-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#ffdd00] focus-visible:outline-offset-[3px]"
      >
        <span className="sr-only">{detailLabel}</span>
      </Link>

      <div className="relative z-0 flex gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center border border-border bg-background p-1.5">
          <Image
            src={getCompanyLogoSrc(job.company)}
            alt={getCompanyLogoAlt(job.company)}
            width={64}
            height={64}
            className="h-full w-full object-contain"
          />
        </div>

        <div className="w-full min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-base font-bold leading-snug text-[#0b0c0c]">{job.title}</h3>
            <span className="shrink-0 text-sm font-bold text-[#0b0c0c]">{job.salary}</span>
          </div>

          <p className="mt-1 truncate text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {job.company}
          </p>

          <div className="mt-2 flex flex-wrap gap-2">
            <span className="rounded-none bg-muted px-2.5 py-1 text-xs text-foreground">{job.location}</span>
            <span className="rounded-none bg-muted px-2.5 py-1 text-xs text-foreground">{job.experience}</span>
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
