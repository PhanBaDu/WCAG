import { Metadata } from 'next';
import { PageBreadcrumb } from '@/components/layout/page-breadcrumb';
import { ProfileView } from '@/components/profile/profile-view';

export const metadata: Metadata = {
  title: 'Hồ sơ cá nhân | Cổng Việc Làm Người Khuyết Tật',
  description: 'Giao diện hồ sơ gọn gàng cho mọi người tìm việc.',
};

export default async function ProfilePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: routeLocale } = await params;
  const locale = routeLocale === 'en' ? 'en' : 'vi';
  const crumbs = locale === 'en'
    ? [
        { label: 'Home', href: '/' },
        { label: 'Profile' },
      ]
    : [
        { label: 'Trang chủ', href: '/' },
        { label: 'Hồ sơ' },
      ];

  return (
    <main id="main-content" className="mx-auto w-full max-w-7xl px-4 pt-2 pb-8 sm:px-6 lg:px-8 lg:pb-12 lg:pt-3">
      <PageBreadcrumb items={crumbs} />
      <section className="mb-8 space-y-6">
        <div className="max-w-3xl space-y-4">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            {locale === 'en' ? 'Profile' : 'Hồ sơ cá nhân'}
          </p>
          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {locale === 'en' ? 'Personal details and CV' : 'Thông tin cá nhân và CV'}
            </h1>
            <p className="max-w-2xl text-muted-foreground">
              {locale === 'en'
                ? 'Only the details needed to manage the account and documents are shown.'
                : 'Chỉ hiển thị những thông tin cần thiết để quản lý tài khoản và tài liệu.'}
            </p>
          </div>
        </div>
      </section>
      <ProfileView />
    </main>
  );
}
