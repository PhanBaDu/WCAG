/**
 * @file        src/app/[locale]/jobs/[slug]/page.tsx
 * @description Job details page with Apply modal (UC07, UC08).
 * @module      Jobs/Detail
 *
 * @author      Antigravity
 * @created     2026-06-10
 * @updated     2026-06-10
 *
 * @wcag        1.3.1 Info and Relationships (A) - proper heading hierarchy
 *              2.4.2 Page Titled (A) - dynamic page titles via Metadata
 *              3.1.1 Language of Page (A) - proper layout settings applied
 *              3.3.4 Error Prevention (Legal, Financial, Data) (AA) - review application step
 */

import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { JobDetailClient } from './client-page';

// Mock function for fetch to generate metadata server-side
async function getJobBySlug(slug: string) {
  // In a real app, this should be a direct DB call or fetch
  // if fetch fails, return null
  return {
    id: "mock-id",
    title: `Nhân viên văn phòng (${slug})`,
    slug,
    description: "Mô tả công việc chi tiết...",
    requirements: "Yêu cầu...",
    benefits: "Quyền lợi...",
    location: "Hà Nội",
    salaryMin: 7000000,
    salaryMax: 15000000,
    jobType: 'FULL_TIME',
    disabilityTypes: ['MOBILITY'],
    accessibilityFeatures: ["Ramp", "Elevator", "Accessible Restroom"],
    expiresAt: new Date(Date.now() + 864000000).toISOString(),
    createdAt: new Date().toISOString(),
    employer: {
      id: "emp-1",
      companyName: "Công ty TNHH Phát Triển A",
    }
  };
}

export async function generateMetadata({ params: { locale, slug } }: { params: { locale: string, slug: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Index' });
  const job = await getJobBySlug(slug);

  if (!job) {
    return {
      title: "Job Not Found | AccessJobs",
    };
  }

  return {
    title: `${job.title} - ${job.employer.companyName} | AccessJobs`,
    description: job.description.substring(0, 160),
    openGraph: {
      title: `${job.title} - ${job.employer.companyName}`,
      description: job.description.substring(0, 160),
      type: 'website',
    },
  };
}

export default function JobDetailPage({ params: { slug } }: { params: { slug: string } }) {
  // Pass slug to Client Component to handle TanStack query, Modals, and interactivity
  return <JobDetailClient slug={slug} />;
}
