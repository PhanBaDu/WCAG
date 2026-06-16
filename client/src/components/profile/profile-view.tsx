'use client';

import { useMemo, useState } from 'react';
import { useLocale } from 'next-intl';
import { useAuthQuery } from '@/hooks/use-auth';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { TextNavigationLink } from '@/components/ui/text-navigation-link';
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

function ProfileSection({
  preset,
  section,
  onPreview,
  onDeleteCv,
  hasCv,
}: {
  preset: ProfilePreset;
  section: ProfilePreset['sections'][number];
  onPreview: (href: string) => void;
  onDeleteCv: () => void;
  hasCv: boolean;
}) {
  const isCvSection = section.id === 'cv';

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
            {section.fields.map((field) => (
              <div
                key={field.label}
                className={[
                  'rounded-none border bg-background p-4 transition-colors',
                  field.previewHref
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
                    {field.value}
                  </button>
                ) : field.href ? (
                  <a
                    href={field.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-block text-sm leading-relaxed text-primary underline underline-offset-4 hover:text-primary/80"
                  >
                    {field.value}
                  </a>
                ) : (
                  <p className="mt-2 text-sm leading-relaxed">{field.value}</p>
                )}
              </div>
            ))}
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

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,3fr)]">
      <section className="space-y-6">
        {preset.sections.map((section) => (
          <ProfileSection
            key={section.id}
            preset={preset}
            section={section}
            onPreview={setPreviewHref}
            onDeleteCv={() => {
              if (section.id !== 'cv') return;
              if (window.confirm(locale === 'en' ? 'Delete this CV?' : 'Xoá CV này?')) {
                setHasCv(false);
                setPreviewHref(null);
              }
            }}
            hasCv={section.id === 'cv' ? hasCv : true}
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
