'use client';

import { useMemo, useRef, useState } from 'react';
import { buttonVariants } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { FileText, UploadCloud, Eye } from 'lucide-react';

type JobApplyModalProps = {
  locale: 'vi' | 'en';
  title: string;
  company: string;
  salary: string;
  location: string;
};

type CvOption = {
  id: string;
  name: string;
  updatedAt: string;
  active?: boolean;
};

const LOCATION_OPTIONS: Record<'vi' | 'en', string[]> = {
  vi: ['Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Cần Thơ', 'Bình Dương', 'Remote'],
  en: ['Hanoi', 'Ho Chi Minh City', 'Da Nang', 'Can Tho', 'Binh Duong', 'Remote'],
};

const CV_OPTIONS: Record<'vi' | 'en', CvOption[]> = {
  vi: [
    {
      id: 'cv-1',
      name: 'Sơ yếu Lý lịch Phong cách Hiện đại Trẻ trung Xanh lá hồng.pdf',
      updatedAt: 'CV tải lên - 15/06/2026 15:35',
    },
    {
      id: 'cv-2',
      name: 'Sơ yếu Lý lịch Phong cách Hiện đại Trẻ trung Xanh lá hồng.pdf',
      updatedAt: 'CV tải lên - 15/06/2026 15:34',
      active: true,
    },
  ],
  en: [
    {
      id: 'cv-1',
      name: 'Modern profile resume green-pink.pdf',
      updatedAt: 'Uploaded CV - 15/06/2026 15:35',
    },
    {
      id: 'cv-2',
      name: 'Modern profile resume green-pink.pdf',
      updatedAt: 'Uploaded CV - 15/06/2026 15:34',
      active: true,
    },
  ],
};

function SectionTitle({
  icon,
  title,
  locale,
}: {
  icon: React.ReactNode;
  title: string;
  locale: 'vi' | 'en';
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-none bg-emerald-500/15 text-emerald-600">
        {icon}
      </div>
      <div>
        <p className="text-base font-semibold text-[#0b0c0c]">{title}</p>
        <p className="text-sm text-muted-foreground">
          {locale === 'vi' ? 'Giữ các bước ngắn gọn và rõ ràng.' : 'Keep the steps short and clear.'}
        </p>
      </div>
    </div>
  );
}

export function JobApplyModal({ locale, title, company, salary, location }: JobApplyModalProps) {
  const [open, setOpen] = useState(false);
  const [selectedCvId, setSelectedCvId] = useState('cv-2');
  const [selectedLocation, setSelectedLocation] = useState(location);
  const [coverLetter, setCoverLetter] = useState('');
  const [useAi, setUseAi] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const cvOptions = CV_OPTIONS[locale];
  const locationOptions = useMemo(() => {
    const items = LOCATION_OPTIONS[locale];
    return items.includes(location) ? [location, ...items.filter((item) => item !== location)] : [location, ...items];
  }, [locale, location]);

  const copy = {
    vi: {
      trigger: 'Ứng tuyển ngay',
      dialogTitle: 'Ứng tuyển',
      dialogNote: 'Ứng tuyển trực tiếp trên AccessJobs VN.',
      chooseCv: 'Chọn CV để ứng tuyển',
      uploadTitle: 'Tải lên CV từ máy tính, chọn hoặc kéo thả',
      uploadHint: 'Hỗ trợ định dạng .doc, .docx, .pdf có kích thước dưới 5MB',
      uploadButton: 'Chọn CV',
      locationLabel: 'Địa điểm làm việc mong muốn',
      locationPlaceholder: 'Chọn địa điểm bạn muốn làm việc',
      letterTitle: 'Thư giới thiệu:',
      letterHint:
        'Một thư giới thiệu ngắn gọn, chỉn chu sẽ giúp bạn trở nên chuyên nghiệp và gây ấn tượng hơn với nhà tuyển dụng.',
      letterPlaceholder:
        'Viết giới thiệu ngắn gọn về bản thân (điểm mạnh, điểm yếu) và nêu rõ mong muốn, lý do bạn muốn ứng tuyển cho vị trí này.',
      aiConsent: 'Cho phép AccessJobs sử dụng công nghệ AI để phân tích độ phù hợp CV của bạn',
      privacyConsent: 'Tôi đã đọc và đồng ý với "Thỏa thuận sử dụng dữ liệu cá nhân" của AccessJobs',
      submit: 'Nộp hồ sơ ứng tuyển',
      view: 'Xem',
    },
    en: {
      trigger: 'Apply now',
      dialogTitle: 'Apply',
      dialogNote: 'Apply directly on AccessJobs VN.',
      chooseCv: 'Choose a CV to apply',
      uploadTitle: 'Upload CV from your computer, choose or drag and drop',
      uploadHint: 'Supports .doc, .docx, and .pdf files under 5MB',
      uploadButton: 'Choose CV',
      locationLabel: 'Preferred work location',
      locationPlaceholder: 'Choose where you want to work',
      letterTitle: 'Cover letter:',
      letterHint: 'A concise, polished cover letter helps you look more professional to the employer.',
      letterPlaceholder:
        'Write a short introduction about yourself, your strengths, and why you are applying for this role.',
      aiConsent: 'Allow AccessJobs to use AI technology to analyze your CV fit',
      privacyConsent: 'I have read and agree to the AccessJobs personal data usage agreement',
      submit: 'Submit application',
      view: 'View',
    },
  }[locale];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          buttonVariants({
            variant: 'default',
            className:
              'h-11 rounded-none border-primary bg-primary px-6 text-sm font-semibold text-white hover:bg-[#ffdd00] hover:text-[#0b0c0c] focus-visible:border-[#ffdd00] focus-visible:!outline focus-visible:!outline-[3px] focus-visible:!outline-offset-[6px] focus-visible:!outline-[#ffdd00] focus-visible:bg-[#ffdd00] focus-visible:text-[#0b0c0c]',
          })
        )}
      >
        {copy.trigger}
      </button>

      <Dialog
        open={open}
        onOpenChange={(nextOpen) => {
          if (!nextOpen) {
            setSubmitted(false);
          }
          setOpen(nextOpen);
        }}
      >
        <DialogContent className="max-h-[calc(100vh-1rem)] max-w-[calc(100vw-1rem)] overflow-hidden rounded-2xl border-0 p-0 shadow-2xl sm:max-w-4xl">
          <div className="max-h-[calc(100vh-1rem)] overflow-y-auto bg-white">
            <DialogHeader className="border-b border-slate-100 px-5 py-4 sm:px-6">
              <div className="flex items-start justify-between gap-4 pr-8">
                <div className="space-y-1">
                  <DialogTitle className="text-2xl font-bold text-[#0b0c0c]">
                    {copy.dialogTitle}
                  </DialogTitle>
                  <DialogDescription className="text-sm text-slate-600">
                    {locale === 'vi'
                      ? `${company} - ${title} - Mức lương ${salary}`
                      : `${company} - ${title} - Salary ${salary}`}
                  </DialogDescription>
                  <p className="text-sm font-medium text-emerald-600">{copy.dialogNote}</p>
                </div>
              </div>
            </DialogHeader>

            {submitted ? (
              <div className="space-y-6 px-5 py-8 sm:px-6">
                <div className="rounded-none border border-emerald-200 bg-emerald-50 p-5">
                  <p className="text-lg font-semibold text-emerald-700">
                    {locale === 'vi' ? 'Hồ sơ đã được nộp.' : 'Your application has been submitted.'}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-emerald-700/90">
                    {locale === 'vi'
                      ? 'Bạn có thể tiếp tục xem lại trong mục việc làm đã ứng tuyển và kiểm tra email để theo dõi phản hồi từ nhà tuyển dụng.'
                      : 'You can review it later in your applied jobs list and check your email for employer updates.'}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/${locale}/profile/applied-jobs`}
                    className={buttonVariants({
                      variant: 'outline',
                      className:
                        'h-11 rounded-none border-[#0b0c0c] bg-white px-4 text-sm font-semibold text-[#0b0c0c] hover:bg-[#ececec] focus-visible:border-[#ffdd00] focus-visible:!outline focus-visible:!outline-[3px] focus-visible:!outline-offset-[3px] focus-visible:!outline-[#ffdd00]',
                    })}
                  >
                    {locale === 'vi' ? 'Xem progress' : 'View progress'}
                  </Link>
                  <button
                    type="button"
                    className={buttonVariants({
                      variant: 'outline',
                      className:
                        'h-11 rounded-none border-[#0b0c0c] bg-white px-4 text-sm font-semibold text-[#0b0c0c] hover:bg-[#ececec] focus-visible:border-[#ffdd00] focus-visible:!outline focus-visible:!outline-[3px] focus-visible:!outline-offset-[3px] focus-visible:!outline-[#ffdd00]',
                    })}
                    onClick={() => {
                      setSubmitted(false);
                      setOpen(false);
                    }}
                  >
                    {locale === 'vi' ? 'Đóng' : 'Close'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6 px-5 py-5 sm:px-6">
              <section className="space-y-3">
                <SectionTitle
                  locale={locale}
                  title={copy.chooseCv}
                  icon={<FileText className="h-4 w-4" aria-hidden="true" />}
                />

                <div className="space-y-3">
                  {cvOptions.map((cv) => {
                    const selected = selectedCvId === cv.id;

                    return (
                      <button
                        key={cv.id}
                        type="button"
                        onClick={() => setSelectedCvId(cv.id)}
                        onKeyDown={(event) => {
                          if (event.key !== 'Enter' || !selected) return;

                          event.preventDefault();
                          window.open(`/${locale}/profile/cv`, '_blank', 'noopener,noreferrer');
                        }}
                        className={cn(
                          'flex w-full items-start gap-3 rounded-none border bg-white p-4 text-left transition-colors focus-visible:border-[#ffdd00] focus-visible:!outline focus-visible:!outline-[3px] focus-visible:!outline-offset-[3px] focus-visible:!outline-[#ffdd00]',
                          selected
                            ? 'border-emerald-500 shadow-[0_0_0_1px_rgba(16,185,129,0.25)]'
                            : 'border-slate-200 hover:border-slate-300'
                        )}
                      >
                        <span
                          className={cn(
                            'mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border',
                            selected ? 'border-emerald-500 bg-white' : 'border-slate-300 bg-white'
                          )}
                        >
                          <span
                            className={cn(
                              'h-3 w-3 rounded-full',
                              selected ? 'bg-emerald-500' : 'bg-transparent'
                            )}
                          />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="break-words text-sm font-medium text-[#0b0c0c]">{cv.name}</p>
                          <p className="mt-1 text-sm italic text-slate-500">{cv.updatedAt}</p>
                        </div>
                        {selected ? (
                          <span
                            role="link"
                            tabIndex={0}
                            onClick={() => window.open(`/${locale}/profile/cv`, '_blank', 'noopener,noreferrer')}
                            onKeyDown={(event) => {
                              if (event.key !== 'Enter' && event.key !== ' ') return;
                              event.preventDefault();
                              window.open(`/${locale}/profile/cv`, '_blank', 'noopener,noreferrer');
                            }}
                            className="inline-flex shrink-0 items-center gap-1 self-center rounded-none border border-emerald-600 px-3 py-1 text-sm font-medium text-emerald-600 focus-visible:border-[#ffdd00] focus-visible:!outline focus-visible:!outline-[3px] focus-visible:!outline-offset-[3px] focus-visible:!outline-[#ffdd00]"
                          >
                            {copy.view}
                          </span>
                        ) : null}
                      </button>
                    );
                  })}

                  <div className="rounded-none border border-dashed border-slate-300 bg-slate-50 p-5">
                    <div className="flex flex-col items-center justify-center gap-3 text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-slate-500">
                        <UploadCloud className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-[#0b0c0c]">{copy.uploadTitle}</p>
                        <p className="text-sm text-slate-500">{copy.uploadHint}</p>
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        accept=".doc,.docx,.pdf"
                        onChange={() => {
                          // Placeholder: the modal is a UI mock, file upload is handled later.
                        }}
                      />
                      <button
                        type="button"
                        className={buttonVariants({
                          variant: 'outline',
                          className:
                            'h-10 rounded-none border-[#0b0c0c] bg-white px-4 text-sm font-semibold text-[#0b0c0c] hover:bg-[#ececec] focus-visible:border-[#ffdd00] focus-visible:!outline focus-visible:!outline-[3px] focus-visible:!outline-offset-[3px] focus-visible:!outline-[#ffdd00]',
                        })}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        {copy.uploadButton}
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              <section className="space-y-3">
                <label className="text-sm font-semibold text-[#0b0c0c]" htmlFor="apply-location">
                  {copy.locationLabel}
                </label>
                <Select
                  value={selectedLocation}
                  onValueChange={(value) => {
                    if (value) {
                      setSelectedLocation(value);
                    }
                  }}
                  items={locationOptions.map((item) => ({ value: item, label: item }))}
                >
                  <SelectTrigger
                    id="apply-location"
                    aria-label={copy.locationLabel}
                    className="h-11 w-full rounded-none border border-slate-200 bg-white px-4 text-left text-sm text-[#0b0c0c] shadow-none focus-visible:border-[#ffdd00] focus-visible:!outline focus-visible:!outline-[3px] focus-visible:!outline-offset-[3px] focus-visible:!outline-[#ffdd00] focus-visible:ring-0"
                  >
                    <SelectValue placeholder={copy.locationPlaceholder} />
                  </SelectTrigger>
                  <SelectContent
                    side="bottom"
                    align="start"
                    sideOffset={4}
                    alignItemWithTrigger={false}
                    className="w-[min(max(var(--anchor-width),20rem),calc(100vw-1rem))] max-w-[calc(100vw-1rem)] rounded-none border-2 border-[#0b0c0c] bg-white p-1 shadow-none ring-0"
                  >
                    {locationOptions.map((item) => (
                      <SelectItem
                        key={item}
                        value={item}
                        className="flex h-10 cursor-pointer items-center rounded-none px-4 text-base leading-none text-[#0b0c0c] data-highlighted:bg-[#ffdd00] data-highlighted:text-[#0b0c0c] focus-visible:bg-[#ffdd00] focus-visible:text-[#0b0c0c] focus-visible:outline-none"
                      >
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </section>

              <section className="space-y-3">
                <SectionTitle
                  locale={locale}
                  title={copy.letterTitle}
                  icon={<Eye className="h-4 w-4" aria-hidden="true" />}
                />
                <p className="text-sm leading-6 text-slate-500">{copy.letterHint}</p>
                <textarea
                  value={coverLetter}
                  onChange={(event) => setCoverLetter(event.target.value)}
                  rows={6}
                  placeholder={copy.letterPlaceholder}
                  className="min-h-[160px] w-full rounded-none border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-[#0b0c0c] shadow-none outline-none transition-colors placeholder:text-slate-400 focus:border-[#ffdd00] focus-visible:border-[#ffdd00] focus-visible:!outline focus-visible:!outline-[3px] focus-visible:!outline-offset-[3px] focus-visible:!outline-[#ffdd00]"
                />
              </section>

              <section className="space-y-3">
                <label className="flex items-start gap-3 text-sm leading-6 text-[#0b0c0c]">
                  <input
                    type="checkbox"
                    checked={useAi}
                    onChange={(event) => setUseAi(event.target.checked)}
                    onKeyDown={(event) => {
                      if (event.key !== 'Enter') return;
                      event.preventDefault();
                      setUseAi((current) => !current);
                    }}
                    className="mt-1 h-5 w-5 rounded-none border border-slate-300 text-emerald-600 focus-visible:!outline focus-visible:!outline-[3px] focus-visible:!outline-offset-[3px] focus-visible:!outline-[#ffdd00]"
                  />
                  <span>{copy.aiConsent}</span>
                </label>

                <label className="flex items-start gap-3 text-sm leading-6 text-[#0b0c0c]">
                  <input
                    type="checkbox"
                    checked={acceptPrivacy}
                    onChange={(event) => setAcceptPrivacy(event.target.checked)}
                    onKeyDown={(event) => {
                      if (event.key !== 'Enter') return;
                      event.preventDefault();
                      setAcceptPrivacy((current) => !current);
                    }}
                    className="mt-1 h-5 w-5 rounded-none border border-slate-300 text-emerald-600 focus-visible:!outline focus-visible:!outline-[3px] focus-visible:!outline-offset-[3px] focus-visible:!outline-[#ffdd00]"
                  />
                  <span>{copy.privacyConsent}</span>
                </label>

                <label className="flex items-start gap-3 text-sm leading-6 text-[#0b0c0c]">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(event) => setAcceptTerms(event.target.checked)}
                    onKeyDown={(event) => {
                      if (event.key !== 'Enter') return;
                      event.preventDefault();
                      setAcceptTerms((current) => !current);
                    }}
                    className="mt-1 h-5 w-5 rounded-none border border-slate-300 text-emerald-600 focus-visible:!outline focus-visible:!outline-[3px] focus-visible:!outline-offset-[3px] focus-visible:!outline-[#ffdd00]"
                  />
                  <span>
                    {locale === 'vi'
                      ? 'Tôi đã đọc và đồng ý với điều khoản ứng tuyển của hệ thống'
                      : 'I have read and agree to the application terms'}
                  </span>
                </label>
              </section>

              <div className="pt-2">
                <button
                  type="button"
                  className={buttonVariants({
                    variant: 'default',
                    className:
                      'h-12 w-full rounded-none border-t border-l border-r border-b-[4px] border-black bg-[#ffdd00] text-sm font-semibold text-[#0b0c0c] hover:bg-[#ffe766] focus-visible:bg-[#ffdd00] focus-visible:text-[#0b0c0c] focus-visible:!outline focus-visible:!outline-[3px] focus-visible:!outline-offset-[3px] focus-visible:!outline-[#ffdd00] active:translate-y-[1px]',
                  })}
                  onClick={() => setSubmitted(true)}
                >
                  {copy.submit}
                </button>
              </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
