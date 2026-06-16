'use client';

import { useMemo } from 'react';
import { useLocale } from 'next-intl';
import { useAuthQuery } from '@/hooks/use-auth';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

function ProfileSection({ preset, section }: { preset: ProfilePreset; section: ProfilePreset['sections'][number] }) {
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
      <CardContent className="grid gap-4 md:grid-cols-2">
        {section.fields.map((field) => (
          <div key={field.label} className="rounded-none border bg-background p-4">
            <p className="text-sm font-medium text-muted-foreground">{field.label}</p>
            {field.href ? (
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
          <Link
            href={section.actionHref ?? '/profile/cv'}
            className={buttonVariants({ className: 'h-11 rounded-none bg-primary px-4 text-sm font-medium text-primary-foreground' })}
          >
            <UploadCloud className="mr-2 h-4 w-4" aria-hidden="true" />
            {section.actionLabel}
          </Link>
        </CardContent>
      ) : null}
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

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
      <section className="space-y-6">
        {preset.sections.map((section) => (
          <ProfileSection key={section.id} preset={preset} section={section} />
        ))}

        <Card className="border-dashed">
          <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">{preset.footerNote}</p>
            <div className="flex gap-3">
              <Link href="/profile" className={buttonVariants({ variant: 'outline', className: 'h-11 rounded-none' })}>
                {preset.saveDraftLabel}
              </Link>
              <button type="button" className="inline-flex h-11 items-center justify-center rounded-none bg-primary px-4 text-sm font-medium text-primary-foreground">
                <UploadCloud className="mr-2 h-4 w-4" aria-hidden="true" />
                {preset.uploadLabel}
              </button>
            </div>
          </CardContent>
        </Card>
      </section>

      <aside className="space-y-4 lg:sticky lg:top-24">
        <Card className="border-none bg-primary/5 shadow-none">
          <CardContent className="space-y-4 p-6 text-sm">
            <div className="flex items-center gap-2 font-semibold">
              <BadgeCheck className="h-4 w-4 text-primary" aria-hidden="true" />
              {preset.sidebarLabel}
            </div>

            {preset.sidebarDescription ? <p className="text-muted-foreground">{preset.sidebarDescription}</p> : null}

            <nav aria-label={preset.sidebarLabel}>
              <ul className="space-y-1">
                {preset.sidebarItems.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href ?? '/jobs'}
                      className={[
                        'block rounded-none px-0 py-1.5 text-[17px] leading-6 transition-colors',
                        item.active || activePath === item.href
                          ? 'font-medium text-[#00b140]'
                          : 'text-slate-600 hover:text-slate-950',
                      ].join(' ')}
                      aria-current={item.active || activePath === item.href ? 'page' : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}
