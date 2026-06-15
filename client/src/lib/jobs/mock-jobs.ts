import hotJobsData from '@/data/hot-jobs.json';
import type { MockJobListing, JobFacet, SearchScope } from '@/lib/jobs/types';

export type { MockJobListing, JobFacet, SearchScope };

const viJobs = hotJobsData.vi as MockJobListing[];
const enJobs = hotJobsData.en as MockJobListing[];

export const hotJobsMeta = hotJobsData.meta;

export function getMockJobs(locale: 'vi' | 'en'): MockJobListing[] {
  return locale === 'en' ? enJobs : viJobs;
}

/** Featured hot jobs shown on first load (full list has 150+ entries). */
export function getHotJobs(jobs: MockJobListing[], limit = 12): MockJobListing[] {
  return jobs.filter((job) => job.isHot).slice(0, limit);
}

function normalize(value: string) {
  return value.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().trim();
}

export function searchJobs(
  jobs: MockJobListing[],
  query: string,
  scope: SearchScope,
): MockJobListing[] {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) {
    return [];
  }

  return jobs.filter((job) => {
    const title = normalize(job.title);
    const company = normalize(job.company);
    const location = normalize(job.location);
    const category = normalize(job.category);
    const tags = job.tags.map(normalize).join(' ');

    if (scope === 'title') {
      return title.includes(normalizedQuery) || tags.includes(normalizedQuery);
    }
    if (scope === 'company') {
      return company.includes(normalizedQuery);
    }
    return (
      title.includes(normalizedQuery) ||
      company.includes(normalizedQuery) ||
      location.includes(normalizedQuery) ||
      category.includes(normalizedQuery) ||
      tags.includes(normalizedQuery)
    );
  });
}

export function buildFacets(jobs: MockJobListing[], field: 'experience' | 'category'): JobFacet[] {
  const counts = new Map<string, number>();

  for (const job of jobs) {
    const value = job[field];
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([value, count]) => ({ value, label: value, count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, 'vi'));
}

export function applyFacetFilters(
  jobs: MockJobListing[],
  selectedExperience: string[],
  selectedCategories: string[],
): MockJobListing[] {
  return jobs.filter((job) => {
    const matchesExperience =
      selectedExperience.length === 0 || selectedExperience.includes(job.experience);
    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(job.category);
    return matchesExperience && matchesCategory;
  });
}

const THUMBNAIL_POOL = [
  { src: '/job-support.svg', alt: 'Illustration for customer support role' },
  { src: '/job-content.svg', alt: 'Illustration for content specialist role' },
  { src: '/job-data.svg', alt: 'Illustration for data entry role' },
  { src: '/job-admin.svg', alt: 'Illustration for administrative assistant role' },
] as const;

export function getJobThumbnail(slug: string) {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash + slug.charCodeAt(i)) % THUMBNAIL_POOL.length;
  }
  return THUMBNAIL_POOL[hash];
}

/** @deprecated Use getJobThumbnail(slug) for dynamic slugs */
export const jobThumbnails: Record<string, { src: string; alt: string }> = {
  'nhan-vien-ho-tro-khach-hang': THUMBNAIL_POOL[0],
  'chuyen-vien-noi-dung': THUMBNAIL_POOL[1],
  'nhan-vien-nhap-lieu': THUMBNAIL_POOL[2],
  'tro-ly-hanh-chinh': THUMBNAIL_POOL[3],
};
