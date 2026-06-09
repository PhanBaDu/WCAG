/**
 * @file        src/app/[locale]/employer/jobs/create/page.tsx
 * @description Page for employers to post a new job (UC15).
 * @module      Employer/CreateJob
 *
 * @author      Antigravity
 * @created     2026-06-10
 * @updated     2026-06-10
 *
 * @wcag        2.4.2 Page Titled (A) - proper title set in metadata
 */

import { Metadata } from 'next';
import { JobForm } from '@/components/employer/job-form';

export const metadata: Metadata = {
  title: 'Đăng Tin Tuyển Dụng | Bảng Điều Khiển Nhà Tuyển Dụng',
  description: 'Tạo và đăng tin tuyển dụng dành cho người khuyết tật.',
};

export default function CreateJobPage() {
  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
      <JobForm />
    </div>
  );
}
