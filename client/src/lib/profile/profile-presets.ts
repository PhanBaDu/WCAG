import type { ComponentType } from 'react';
import { Briefcase, Building2, FileText, Heart, User } from 'lucide-react';
import type { UserRole } from '@/lib/types/auth';

export type ProfileIconKey = 'user' | 'briefcase' | 'file' | 'heart' | 'building';

export type ProfileField = {
  label: string;
  value: string;
  href?: string;
  previewHref?: string;
};

export type ProfileSectionPreset = {
  id: string;
  title: string;
  icon: ProfileIconKey;
  fields: ProfileField[];
  actionLabel?: string;
  actionHref?: string;
};

export type ProfilePreset = {
  eyebrow: string;
  title: string;
  desc: string;
  summaryCards: Array<{ label: string; value: string }>;
  sections: ProfileSectionPreset[];
  footerNote: string;
  saveDraftLabel: string;
  uploadLabel: string;
  sidebarLabel: string;
  sidebarItems: Array<{ label: string; href?: string; active?: boolean }>;
  sidebarDescription?: string;
};

export const profileIcons: Record<ProfileIconKey, ComponentType<{ className?: string; 'aria-hidden'?: boolean }>> = {
  user: User,
  briefcase: Briefcase,
  file: FileText,
  heart: Heart,
  building: Building2,
};

export const profilePresets: Record<'vi' | 'en', Record<Exclude<UserRole, 'ADM'>, ProfilePreset>> = {
  vi: {
    NKT: {
      eyebrow: 'Hồ sơ cá nhân',
      title: 'Thông tin cá nhân và CV',
      desc: 'Hồ sơ này dành cho người tìm việc. Chỉ hiển thị những dữ liệu cần thiết để nhà tuyển dụng xem nhanh và bạn quản lý dễ hơn.',
      summaryCards: [
        { label: 'Trạng thái', value: 'Sẵn sàng ứng tuyển' },
        { label: 'Độ hoàn thiện', value: '78%' },
        { label: 'CV', value: '1 bản đang hoạt động' },
      ],
      sections: [
        {
          id: 'basic',
          title: 'Thông tin cá nhân',
          icon: 'user',
          fields: [
            { label: 'Họ và tên', value: 'Nguyễn Minh Anh' },
            { label: 'Email', value: 'minhanh@example.com' },
            { label: 'Số điện thoại', value: '0901 234 567' },
            { label: 'Ngày sinh', value: '12/05/1996' },
          ],
        },
        {
          id: 'career',
          title: 'Mục tiêu nghề nghiệp',
          icon: 'briefcase',
          fields: [
            { label: 'Vị trí mong muốn', value: 'Hành chính văn phòng / Nội dung' },
            { label: 'Khu vực mong muốn', value: 'Hà Nội' },
            { label: 'Loại công việc', value: 'Toàn thời gian' },
            { label: 'Mức lương mong muốn', value: '10 - 15 triệu' },
          ],
        },
        {
          id: 'cv',
          title: 'CV và tài liệu',
          icon: 'file',
          actionLabel: 'Xem chi tiết CV',
          actionHref: '/profile/cv',
          fields: [
            {
              label: 'CV chính',
              value: 'so-yeu-ly-lich-phong-cach-hien-dai-tre-trung-xanh-la-hong.pdf',
              previewHref: '/so-yeu-ly-lich-phong-cach-hien-dai-tre-trung-xanh-la-hong.pdf',
            },
          ],
        },
      ],
      footerNote: 'Bạn có thể cập nhật hồ sơ bất kỳ lúc nào để tăng độ khớp với việc làm.',
      saveDraftLabel: 'Lưu nháp',
      uploadLabel: 'Tải CV',
      sidebarLabel: 'Quản lý tìm việc',
      sidebarItems: [
        { label: 'Việc làm đã ứng tuyển', href: '/profile/applied-jobs' },
        { label: 'Việc làm phù hợp với bạn', href: '/jobs' },
        { label: 'Cài đặt gợi ý việc làm', href: '/jobs' },
      ],
      sidebarDescription: 'Truy cập nhanh các mục quản lý việc làm của bạn.',
    },
    NTD: {
      eyebrow: 'Hồ sơ doanh nghiệp',
      title: 'Thông tin công ty và tin tuyển dụng',
      desc: 'Hồ sơ dành cho nhà tuyển dụng để quản lý thông tin doanh nghiệp, liên hệ và tình trạng tuyển dụng.',
      summaryCards: [
        { label: 'Trạng thái', value: 'Đang tuyển' },
        { label: 'Tin đang hoạt động', value: '18 tin' },
        { label: 'Ứng viên mới', value: '124 hồ sơ' },
      ],
      sections: [
        {
          id: 'company',
          title: 'Thông tin doanh nghiệp',
          icon: 'building',
          fields: [
            { label: 'Tên công ty', value: 'AccessJobs HR' },
            { label: 'Người liên hệ', value: 'Nguyễn Hoàng Minh' },
            { label: 'Email', value: 'hiring@accessjobs.vn' },
            { label: 'Số điện thoại', value: '028 1234 5678' },
          ],
        },
        {
          id: 'hiring',
          title: 'Tuyển dụng đang mở',
          icon: 'briefcase',
          fields: [
            { label: 'Ngành nghề', value: 'Công nghệ / Tuyển dụng' },
            { label: 'Khu vực', value: 'TP. Hồ Chí Minh' },
            { label: 'Quy mô', value: '50 - 100 nhân sự' },
            { label: 'Mã số thuế', value: '0312345678' },
          ],
        },
        {
          id: 'documents',
          title: 'Hồ sơ đăng tin',
          icon: 'file',
          actionLabel: 'Tải hồ sơ công ty',
          actionHref: '/profile',
          fields: [
            { label: 'Logo công ty', value: 'Đã thêm' },
            { label: 'Giấy phép kinh doanh', value: 'Đã tải lên' },
            { label: 'Tin nháp', value: '3 tin' },
            { label: 'Hiển thị nhà tuyển dụng', value: 'Đang bật' },
          ],
        },
      ],
      footerNote: 'Cập nhật hồ sơ công ty giúp tin tuyển dụng hiển thị rõ ràng và đáng tin cậy hơn.',
      saveDraftLabel: 'Lưu nháp',
      uploadLabel: 'Tải hồ sơ',
      sidebarLabel: 'Quản lý tuyển dụng',
      sidebarItems: [
        { label: 'Tin đang đăng', href: '/employer/jobs/create', active: true },
        { label: 'Tin nháp', href: '/employer/jobs/create' },
        { label: 'Ứng viên đã nhận', href: '/employer/jobs/create' },
        { label: 'Cài đặt tuyển dụng', href: '/employer/jobs/create' },
      ],
      sidebarDescription: 'Truy cập nhanh các mục quản lý tuyển dụng.',
    },
  },
  en: {
    NKT: {
      eyebrow: 'Profile',
      title: 'Personal details and CV',
      desc: 'This profile is for job seekers. Only the essentials are shown so employers can review quickly and you can manage it easily.',
      summaryCards: [
        { label: 'Status', value: 'Ready to apply' },
        { label: 'Completion', value: '78%' },
        { label: 'CV', value: '1 active version' },
      ],
      sections: [
        {
          id: 'basic',
          title: 'Personal details',
          icon: 'user',
          fields: [
            { label: 'Full name', value: 'Nguyen Minh Anh' },
            { label: 'Email', value: 'minhanh@example.com' },
            { label: 'Phone number', value: '0901 234 567' },
            { label: 'Date of birth', value: '12/05/1996' },
          ],
        },
        {
          id: 'career',
          title: 'Career goal',
          icon: 'briefcase',
          fields: [
            { label: 'Target role', value: 'Administrative / Content' },
            { label: 'Preferred location', value: 'Hanoi' },
            { label: 'Job type', value: 'Full time' },
            { label: 'Expected salary', value: '10 - 15 million VND' },
          ],
        },
        {
          id: 'cv',
          title: 'CV and documents',
          icon: 'file',
          actionLabel: 'View CV details',
          actionHref: '/profile/cv',
          fields: [
            {
              label: 'Primary CV',
              value: 'so-yeu-ly-lich-phong-cach-hien-dai-tre-trung-xanh-la-hong.pdf',
              previewHref: '/so-yeu-ly-lich-phong-cach-hien-dai-tre-trung-xanh-la-hong.pdf',
            },
          ],
        },
      ],
      footerNote: 'You can update your profile at any time to improve matching.',
      saveDraftLabel: 'Save draft',
      uploadLabel: 'Upload CV',
      sidebarLabel: 'Job management',
      sidebarItems: [
        { label: 'Applied jobs', href: '/profile/applied-jobs' },
        { label: 'Jobs matched for you', href: '/jobs' },
        { label: 'Job suggestion settings', href: '/jobs' },
      ],
      sidebarDescription: 'Quick access to your job management areas.',
    },
    NTD: {
      eyebrow: 'Company profile',
      title: 'Company details and job postings',
      desc: 'A recruiter profile for managing company information, contact details, and hiring status.',
      summaryCards: [
        { label: 'Status', value: 'Hiring now' },
        { label: 'Active jobs', value: '18 jobs' },
        { label: 'New candidates', value: '124 profiles' },
      ],
      sections: [
        {
          id: 'company',
          title: 'Company information',
          icon: 'building',
          fields: [
            { label: 'Company name', value: 'AccessJobs HR' },
            { label: 'Contact person', value: 'Nguyen Hoang Minh' },
            { label: 'Email', value: 'hiring@accessjobs.vn' },
            { label: 'Phone number', value: '028 1234 5678' },
          ],
        },
        {
          id: 'hiring',
          title: 'Open hiring plan',
          icon: 'briefcase',
          fields: [
            { label: 'Industry', value: 'Technology / Recruiting' },
            { label: 'Location', value: 'Ho Chi Minh City' },
            { label: 'Company size', value: '50 - 100 employees' },
            { label: 'Tax code', value: '0312345678' },
          ],
        },
        {
          id: 'documents',
          title: 'Posting documents',
          icon: 'file',
          actionLabel: 'Upload company profile',
          actionHref: '/profile',
          fields: [
            { label: 'Company logo', value: 'Added' },
            { label: 'Business license', value: 'Uploaded' },
            { label: 'Draft jobs', value: '3 jobs' },
            { label: 'Visible to employers', value: 'On' },
          ],
        },
      ],
      footerNote: 'Keeping the company profile updated makes postings look more trustworthy.',
      saveDraftLabel: 'Save draft',
      uploadLabel: 'Upload profile',
      sidebarLabel: 'Recruitment management',
      sidebarItems: [
        { label: 'Active postings', href: '/employer/jobs/create', active: true },
        { label: 'Draft postings', href: '/employer/jobs/create' },
        { label: 'Received candidates', href: '/employer/jobs/create' },
        { label: 'Hiring settings', href: '/employer/jobs/create' },
      ],
      sidebarDescription: 'Quick access to recruitment management areas.',
    },
  },
} as const;
