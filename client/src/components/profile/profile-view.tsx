'use client';

import { useMemo, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { useAuthQuery } from '@/hooks/use-auth';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { TextNavigationLink } from '@/components/ui/text-navigation-link';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  profileIcons,
  profilePresets,
  type ProfileIconKey,
  type ProfilePreset,
} from '@/lib/profile/profile-presets';
import { Link, usePathname } from '@/i18n/routing';
import { BadgeCheck, UploadCloud } from 'lucide-react';

function getRole(userRole?: 'NKT' | 'NTD' | 'ADM') {
  return userRole === 'NTD' ? 'NTD' : 'NKT';
}

function IconFor({ icon }: { icon: ProfileIconKey }) {
  const Icon = profileIcons[icon];
  return <Icon className="h-5 w-5" aria-hidden="true" />;
}

type EditableValues = Record<string, string>;
type FieldErrors = Record<string, string | undefined>;
type Locale = 'vi' | 'en';

function fieldKey(sectionId: string, label: string) {
  return `${sectionId}:${label}`;
}

function createEditableValues(preset: ProfilePreset) {
  const nextValues: EditableValues = {};

  for (const section of preset.sections) {
    for (const field of section.fields) {
      if (!field.previewHref && !field.href) {
        nextValues[fieldKey(section.id, field.label)] = field.value;
      }
    }
  }

  return nextValues;
}

function formatDateInput(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 8);
  const parts = [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4, 8)].filter(Boolean);

  return parts.join('/');
}

function getSelectOptions(label: string, locale: Locale) {
  if (label === 'Vị trí mong muốn' || label === 'Target role') {
    return locale === 'vi'
      ? ['Hành chính văn phòng / Nội dung', 'Marketing / Content', 'Kinh doanh / Bán hàng', 'Kế toán / Tài chính', 'Công nghệ thông tin', 'Thiết kế']
      : ['Administrative / Content', 'Marketing / Content', 'Sales / Business', 'Accounting / Finance', 'Software / IT', 'Design'];
  }

  if (label === 'Khu vực mong muốn' || label === 'Preferred location' || label === 'Khu vực' || label === 'Location') {
    return locale === 'vi'
      ? ['Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Cần Thơ', 'Bình Dương', 'Remote']
      : ['Hanoi', 'Ho Chi Minh City', 'Da Nang', 'Can Tho', 'Binh Duong', 'Remote'];
  }

  if (label === 'Loại công việc' || label === 'Job type') {
    return locale === 'vi'
      ? ['Toàn thời gian', 'Bán thời gian', 'Thực tập', 'Freelance', 'Hybrid']
      : ['Full time', 'Part time', 'Internship', 'Freelance', 'Hybrid'];
  }

  if (label === 'Mức lương mong muốn' || label === 'Expected salary') {
    return locale === 'vi'
      ? ['Dưới 10 triệu', '10 - 15 triệu', '15 - 20 triệu', '20 - 30 triệu', 'Trên 30 triệu']
      : ['Under 10 million VND', '10 - 15 million VND', '15 - 20 million VND', '20 - 30 million VND', 'Over 30 million VND'];
  }

  if (label === 'Ngành nghề' || label === 'Industry') {
    return locale === 'vi'
      ? ['Công nghệ / Tuyển dụng', 'Kinh doanh / Bán hàng', 'Hành chính / Nhân sự', 'Marketing / Truyền thông']
      : ['Technology / Hiring', 'Sales / Business', 'Admin / HR', 'Marketing / Communications'];
  }

  if (label === 'Quy mô' || label === 'Company size') {
    return locale === 'vi'
      ? ['Dưới 10 nhân sự', '10 - 49 nhân sự', '50 - 100 nhân sự', '100 - 300 nhân sự', 'Trên 300 nhân sự']
      : ['Under 10 employees', '10 - 49 employees', '50 - 100 employees', '100 - 300 employees', 'Over 300 employees'];
  }

  return null;
}

function normalizeSelectOptions(options: string[] | null, currentValue: string) {
  if (!options) return null;

  return currentValue && !options.includes(currentValue) ? [currentValue, ...options] : options;
}

function ProfileSelectField({
  label,
  value,
  options,
  isActive,
  onFocus,
  onBlur,
  onChange,
  onSave,
  validate,
}: {
  label: string;
  value: string;
  options: string[];
  isActive: boolean;
  onFocus: () => void;
  onBlur: () => void;
  onChange: (value: string) => void;
  onSave: () => void;
  validate: (value: string) => string | null;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  return (
    <div ref={rootRef} className="mt-2 flex flex-wrap items-center gap-3" onFocusCapture={onFocus}>
      <Select
        open={open}
        onOpenChange={(nextOpen) => {
          if (nextOpen) {
            setOpen(true);
            return;
          }

          window.setTimeout(() => {
            const activeElement = document.activeElement;
            const contentElement = document.querySelector('[data-slot="select-content"]');
            const isInsideRoot = Boolean(activeElement && rootRef.current?.contains(activeElement));
            const isInsideContent = Boolean(activeElement && contentElement?.contains(activeElement));

            if (!isInsideRoot && !isInsideContent) {
              onBlur();
              setOpen(false);
            }
          }, 0);
        }}
        value={value}
        onValueChange={(nextValue) => {
          onChange(nextValue);
          setOpen(false);
        }}
        items={options.map((option) => ({ value: option, label: option }))}
      >
        <SelectTrigger
          aria-label={label}
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key !== 'Enter' && event.key !== ' ') {
              return;
            }

            event.preventDefault();
            event.stopPropagation();
            setOpen(true);
          }}
          className="h-11 w-full min-w-0 flex-1 rounded-none border border-border bg-white px-3 text-left text-sm leading-relaxed text-[#0b0c0c] shadow-sm outline-none transition-colors focus-visible:border-[#ffdd00] focus-visible:!outline focus-visible:!outline-[3px] focus-visible:!outline-offset-[3px] focus-visible:!outline-[#ffdd00] focus-visible:ring-0"
        >
          <SelectValue placeholder={value} />
        </SelectTrigger>
        <SelectContent
          side="bottom"
          align="start"
          sideOffset={4}
          alignItemWithTrigger={false}
          className="w-[min(max(var(--anchor-width),28rem),calc(100vw-1rem))] max-w-[calc(100vw-1rem)] rounded-none border-2 border-[#0b0c0c] bg-white p-1 shadow-none ring-0"
        >
          {options.map((option) => (
            <SelectItem
              key={option}
              value={option}
              className="flex h-10 cursor-pointer items-center rounded-none px-4 text-base leading-none text-[#0b0c0c] data-highlighted:bg-[#ffdd00] data-highlighted:text-[#0b0c0c] focus-visible:bg-[#ffdd00] focus-visible:text-[#0b0c0c] focus-visible:outline-none"
            >
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {(isActive || open) ? (
        <button
          type="button"
          className={buttonVariants({
            variant: 'outline',
            className: 'h-9 rounded-none border-[#0b0c0c] bg-white px-3 text-sm font-medium text-[#0b0c0c] hover:bg-[#ececec]',
          })}
          onClick={() => {
            const message = validate(value);
            if (!message) {
              onSave();
            }
          }}
        >
          Lưu
        </button>
      ) : null}
    </div>
  );
}

function validateProfileField(label: string, value: string) {
  const trimmed = value.trim();

  if (!trimmed) {
    return 'Trường này không được để trống.';
  }

  if (label === 'Email') {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(trimmed) ? null : 'Email không hợp lệ.';
  }

  if (label === 'Số điện thoại') {
    const normalized = trimmed.replace(/[\s.-]/g, '');
    const phonePattern = /^(?:\+84|84|0)\d{9,10}$/;
    return phonePattern.test(normalized) ? null : 'Số điện thoại không hợp lệ.';
  }

  if (label === 'Ngày sinh') {
    const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = trimmed.match(datePattern);

    if (!match) {
      return 'Ngày sinh phải theo định dạng dd/mm/yyyy.';
    }

    const day = Number(match[1]);
    const month = Number(match[2]);
    const year = Number(match[3]);
    const birthDate = new Date(year, month - 1, day);
    const isValidDate =
      birthDate.getFullYear() === year && birthDate.getMonth() === month - 1 && birthDate.getDate() === day;

    if (!isValidDate) {
      return 'Ngày sinh không hợp lệ.';
    }

    if (birthDate.getTime() > Date.now()) {
      return 'Ngày sinh không được lớn hơn hiện tại.';
    }

    return null;
  }

  if (label === 'Mã số thuế') {
    const taxPattern = /^\d{10}(?:-\d{3})?$/;
    return taxPattern.test(trimmed) ? null : 'Mã số thuế không hợp lệ.';
  }

  if (label === 'Mức lương mong muốn' || label === 'Quy mô') {
    return trimmed.length >= 2 ? null : 'Thông tin này quá ngắn.';
  }

  return trimmed.length >= 2 ? null : 'Thông tin này cần ít nhất 2 ký tự.';
}

function ProfileSection({
  preset,
  section,
  locale,
  onPreview,
  onDeleteCv,
  hasCv,
  editableValues,
  activeFieldKey,
  onFieldFocus,
  onFieldBlur,
  onFieldChange,
  onFieldSave,
}: {
  preset: ProfilePreset;
  section: ProfilePreset['sections'][number];
  locale: Locale;
  onPreview: (href: string) => void;
  onDeleteCv: () => void;
  hasCv: boolean;
  editableValues: EditableValues;
  activeFieldKey: string | null;
  onFieldFocus: (key: string) => void;
  onFieldBlur: (key: string) => void;
  onFieldChange: (key: string, value: string) => void;
  onFieldSave: (key: string) => void;
}) {
  const isCvSection = section.id === 'cv';
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  function updateFieldError(key: string, label: string, value: string) {
    const message = validateProfileField(label, value);
    setFieldErrors((current) => {
      const next = { ...current };

      if (message) {
        next[key] = message;
      } else {
        delete next[key];
      }

      return next;
    });

    return message;
  }

  return (
    <Card className="border-none shadow-lg">
      <CardHeader className="flex flex-row items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-none bg-primary/10 text-primary">
          <IconFor icon={section.icon} />
        </div>
        <div className="space-y-1">
          <CardTitle className="text-2xl">{section.title}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {preset.eyebrow === 'Profile' ? 'Keep this section short and accurate.' : 'Giữ mục này ngắn gọn và chính xác.'}
          </p>
        </div>
      </CardHeader>
      {isCvSection && !hasCv ? (
        <CardContent className="space-y-4">
          <div className="rounded-none border border-dashed border-border bg-background p-4">
            <p className="text-sm font-medium text-muted-foreground">{preset.eyebrow === 'Profile' ? 'Primary CV' : 'CV chính'}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {preset.eyebrow === 'Profile' ? 'No CV uploaded yet.' : 'Chưa có CV nào được tải lên.'}
            </p>
          </div>
          <button
            type="button"
            className={buttonVariants({
              variant: 'outline',
              className: 'h-11 rounded-none border-[#0b0c0c] bg-white px-4 text-sm font-medium text-[#0b0c0c] hover:bg-[#ececec]',
            })}
            onClick={() => window.alert(preset.eyebrow === 'Profile' ? 'Upload CV' : 'Tải CV')}
          >
            <UploadCloud className="mr-2 h-4 w-4" aria-hidden="true" />
            {preset.uploadLabel}
          </button>
        </CardContent>
      ) : (
        <>
          <CardContent className="grid gap-4 md:grid-cols-2">
            {section.fields.map((field) => {
              const key = fieldKey(section.id, field.label);
              const isEditable = !field.previewHref && !field.href;
              const isActive = activeFieldKey === key;
              const value = editableValues[key] ?? field.value;
              const selectOptions = normalizeSelectOptions(getSelectOptions(field.label, locale), value);
              const usesSelect = Boolean(isEditable && selectOptions);

              return (
                <div
                  key={field.label}
                  className={[
                    'rounded-none border bg-background p-4 transition-colors',
                    field.previewHref
                      ? 'hover:border-[#ffdd00] focus-within:border-[#ffdd00] focus-within:outline focus-within:outline-[3px] focus-within:outline-offset-[3px] focus-within:outline-[#ffdd00]'
                      : isEditable && !usesSelect
                        ? 'hover:border-[#ffdd00] focus-within:border-[#ffdd00] focus-within:outline focus-within:outline-[3px] focus-within:outline-offset-[3px] focus-within:outline-[#ffdd00]'
                      : 'border-border',
                  ].join(' ')}
                >
                  <p className="text-sm font-medium text-muted-foreground">{field.label}</p>
                  {field.previewHref ? (
                    <button
                      type="button"
                      onClick={() => onPreview(field.previewHref!)}
                      className="mt-2 inline-flex rounded-none text-left text-sm leading-relaxed text-primary underline underline-offset-4 hover:text-primary/80 focus-visible:outline-none focus-visible:ring-0"
                    >
                      {value}
                    </button>
                  ) : field.href ? (
                    <a
                      href={field.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-block text-sm leading-relaxed text-primary underline underline-offset-4 hover:text-primary/80"
                    >
                      {value}
                    </a>
                  ) : usesSelect ? (
                    <div>
                      <ProfileSelectField
                        fieldKeyValue={key}
                        label={field.label}
                        value={value}
                        options={selectOptions}
                        isActive={isActive}
                        onFocus={() => onFieldFocus(key)}
                        onBlur={() => onFieldBlur(key)}
                        onChange={(nextValue) => {
                          onFieldChange(key, nextValue);

                          if (fieldErrors[key]) {
                            updateFieldError(key, field.label, nextValue);
                          }
                        }}
                        onSave={() => {
                          const message = updateFieldError(key, field.label, value);
                          if (!message) {
                            onFieldSave(key);
                          }
                        }}
                        validate={(nextValue) => updateFieldError(key, field.label, nextValue)}
                      />
                      {fieldErrors[key] ? (
                        <p id={`${key}-error`} className="mt-2 text-sm text-[#b10e1e]">
                          {fieldErrors[key]}
                        </p>
                      ) : null}
                    </div>
                  ) : (
                    <div
                      className="mt-2 flex flex-wrap items-center gap-3"
                      onBlur={(event) => {
                        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                          onFieldBlur(key);
                        }
                      }}
                    >
                      <input
                        value={value}
                        type={field.label === 'Email' ? 'email' : 'text'}
                        inputMode={field.label === 'Số điện thoại' || field.label === 'Ngày sinh' ? 'numeric' : 'text'}
                        placeholder={
                          field.label === 'Ngày sinh'
                            ? 'dd / mm / yyyy'
                            : field.label === 'Email'
                              ? 'name@example.com'
                              : undefined
                        }
                        maxLength={field.label === 'Ngày sinh' ? 10 : undefined}
                        onFocus={() => onFieldFocus(key)}
                        onChange={(event) => {
                          const nextValue =
                            field.label === 'Ngày sinh' ? formatDateInput(event.target.value) : event.target.value;
                          onFieldChange(key, nextValue);

                          if (fieldErrors[key]) {
                            updateFieldError(key, field.label, nextValue);
                          }
                        }}
                        onBlur={(event) => updateFieldError(key, field.label, event.currentTarget.value)}
                        aria-invalid={Boolean(fieldErrors[key])}
                        aria-describedby={fieldErrors[key] ? `${key}-error` : undefined}
                        className={[
                          'h-11 min-w-0 flex-1 rounded-none border bg-white px-3 text-sm leading-relaxed text-[#0b0c0c] shadow-sm outline-none transition-colors focus-visible:ring-0',
                          fieldErrors[key] ? 'border-[#b10e1e] focus:border-[#b10e1e]' : 'border-border focus:border-[#ffdd00]',
                        ].join(' ')}
                      />
                      {isEditable && isActive ? (
                        <button
                          type="button"
                          className={buttonVariants({
                            variant: 'outline',
                            className: 'h-11 rounded-none border-[#0b0c0c] bg-white px-4 text-sm font-medium text-[#0b0c0c] hover:bg-[#ececec]',
                          })}
                          onClick={() => {
                            const message = updateFieldError(key, field.label, value);
                            if (!message) {
                              onFieldSave(key);
                            }
                          }}
                        >
                          Lưu
                        </button>
                      ) : null}
                      {fieldErrors[key] ? (
                        <p id={`${key}-error`} className="basis-full text-sm text-[#b10e1e]">
                          {fieldErrors[key]}
                        </p>
                      ) : null}
                    </div>
                  )}
                </div>
              );
            })}
          </CardContent>
          {section.actionLabel ? (
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-3">
                <Link
                  href={section.actionHref ?? '/profile/cv'}
                  className={buttonVariants({
                    variant: 'outline',
                    className: 'h-11 rounded-none border-[#0b0c0c] bg-white px-4 text-sm font-medium text-[#0b0c0c] hover:bg-[#ececec]',
                  })}
                >
                  <UploadCloud className="mr-2 h-4 w-4" aria-hidden="true" />
                  {section.actionLabel}
                </Link>
                {isCvSection ? (
                  <button
                    type="button"
                    className={buttonVariants({
                      variant: 'outline',
                      className: 'h-11 rounded-none border-[#0b0c0c] bg-white px-4 text-sm font-medium text-[#0b0c0c] hover:bg-[#ececec]',
                    })}
                  >
                    <UploadCloud className="mr-2 h-4 w-4" aria-hidden="true" />
                    {preset.uploadLabel}
                  </button>
                ) : null}
                {isCvSection ? (
                  <button
                    type="button"
                    className={buttonVariants({
                      variant: 'outline',
                      className: 'h-11 rounded-none border-[#b10e1e] bg-white px-4 text-sm font-medium text-[#b10e1e] hover:bg-[#fdf2f2]',
                    })}
                    onClick={onDeleteCv}
                  >
                    {preset.eyebrow === 'Profile' ? 'Delete CV' : 'Xoá CV'}
                  </button>
                ) : null}
              </div>
            </CardContent>
          ) : null}
        </>
      )}
    </Card>
  );
}

export function ProfileView() {
  const locale = useLocale() as 'vi' | 'en';
  const pathname = usePathname();
  const { data: user } = useAuthQuery();
  const role = getRole(user?.role as 'NKT' | 'NTD' | 'ADM' | undefined);
  const preset = useMemo(() => profilePresets[locale][role], [locale, role]);
  const activePath = pathname ?? '';
  const [previewHref, setPreviewHref] = useState<string | null>(null);
  const [hasCv, setHasCv] = useState(true);
  const [editableValues, setEditableValues] = useState<EditableValues>(() => createEditableValues(preset));
  const [activeFieldKey, setActiveFieldKey] = useState<string | null>(null);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,3fr)]">
      <section className="space-y-6">
        {preset.sections.map((section) => (
          <ProfileSection
            key={section.id}
            preset={preset}
            section={section}
            locale={locale}
            onPreview={setPreviewHref}
            onDeleteCv={() => {
              if (section.id !== 'cv') return;
              if (window.confirm(locale === 'en' ? 'Delete this CV?' : 'Xoá CV này?')) {
                setHasCv(false);
                setPreviewHref(null);
              }
            }}
            hasCv={section.id === 'cv' ? hasCv : true}
            editableValues={editableValues}
            activeFieldKey={activeFieldKey}
            onFieldFocus={(key) => setActiveFieldKey(key)}
            onFieldBlur={(key) => {
              setActiveFieldKey((current) => (current === key ? null : current));
            }}
            onFieldChange={(key, value) => {
              setEditableValues((current) => ({
                ...current,
                [key]: value,
              }));
            }}
            onFieldSave={(key) => {
              setActiveFieldKey((current) => (current === key ? null : current));
            }}
          />
        ))}

        <Card className="border-dashed">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">{preset.footerNote}</p>
          </CardContent>
        </Card>
      </section>

      <aside className="space-y-4 lg:sticky lg:top-24">
        <div className="rounded-none bg-muted/40 p-4">
          <Card className="rounded-none border-none bg-white shadow-none">
            <CardContent className="space-y-4 p-6 text-sm">
              <div className="flex items-center gap-2 font-semibold">
                <BadgeCheck className="h-4 w-4 text-primary" aria-hidden="true" />
                {preset.sidebarLabel}
              </div>

              {preset.sidebarDescription ? <p className="text-muted-foreground">{preset.sidebarDescription}</p> : null}

              <nav aria-label={preset.sidebarLabel}>
                <ul className="space-y-2">
                  {preset.sidebarItems.map((item) => (
                    <li key={item.label}>
                      <TextNavigationLink
                        href={item.href ?? '/jobs'}
                        current={item.active || activePath === item.href}
                        className="w-fit justify-start px-0 py-0 text-[17px] leading-6"
                      >
                        {item.label}
                      </TextNavigationLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </CardContent>
          </Card>
        </div>
      </aside>

      <Dialog
        open={Boolean(previewHref)}
        onOpenChange={(open) => {
          if (!open) setPreviewHref(null);
        }}
      >
        <DialogContent className="max-w-[calc(100vw-1rem)] gap-4 rounded-none p-4 sm:max-w-5xl">
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-2xl">{locale === 'en' ? 'CV preview' : 'Xem trước CV'}</DialogTitle>
            <DialogDescription>
              {locale === 'en'
                ? 'The PDF opens inside this modal.'
                : 'File PDF được mở trực tiếp trong hộp thoại này.'}
            </DialogDescription>
          </DialogHeader>

          <div className="overflow-hidden border border-border bg-muted/20">
            <object data={previewHref ?? undefined} type="application/pdf" className="h-[78vh] w-full">
              <div className="p-6 text-sm text-muted-foreground">
                {locale === 'en'
                  ? 'Your browser cannot display the PDF inline.'
                  : 'Trình duyệt của bạn không hỗ trợ hiển thị PDF trực tiếp.'}
              </div>
            </object>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
