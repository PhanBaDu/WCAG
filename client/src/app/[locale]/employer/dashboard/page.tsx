/**
 * @file        src/app/[locale]/employer/dashboard/page.tsx
 * @description Dashboard page for employers (UC16).
 * @module      Employer/Dashboard
 *
 * @author      Antigravity
 * @created     2026-06-10
 * @updated     2026-06-10
 */

import { Metadata } from 'next';
import { EmployerDashboard } from '@/components/employer/employer-dashboard';

export const metadata: Metadata = {
  title: 'Bảng Điều Khiển | Nhà Tuyển Dụng',
  description: 'Quản lý tin đăng tuyển dụng của doanh nghiệp.',
};

export default function EmployerDashboardPage() {
  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <EmployerDashboard />
    </div>
  );
}
