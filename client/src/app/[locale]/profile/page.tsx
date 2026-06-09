/**
 * @file        src/app/[locale]/profile/page.tsx
 * @description Profile Dashboard Page for NKT (UC11, UC12, UC13, UC14).
 * @module      Profile/Page
 *
 * @author      Antigravity
 * @created     2026-06-10
 * @updated     2026-06-10
 *
 * @wcag        2.4.2 Page Titled (A) - proper title set in metadata
 */

import { Metadata } from 'next';
import { ProfileForm } from '@/components/profile/profile-form';

export const metadata: Metadata = {
  title: 'Hồ Sơ Của Tôi | AccessJobs',
  description: 'Quản lý thông tin cá nhân, dạng khuyết tật và kỹ năng của bạn.',
};

export default function ProfilePage() {
  return <ProfileForm />;
}
