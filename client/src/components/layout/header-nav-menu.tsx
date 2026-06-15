"use client";

import { MenuIcon, XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePathname } from '@/i18n/routing';
import { LangToggle } from '@/components/lang-toggle';
import { Button } from '@/components/ui/button';
import { GovButtonLink } from '@/components/ui/gov-button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { TextNavigationLink } from '@/components/ui/text-navigation-link';

type NavLabels = {
  jobs: string;
  employers: string;
  profile: string;
  login: string;
  register: string;
  menu: string;
  menuTitle: string;
  closeMenu: string;
  primaryNav: string;
};

type HeaderNavMenuProps = {
  labels: NavLabels;
  isCurrent: (href: string) => boolean;
};

export function HeaderNavMenu({ labels, isCurrent }: HeaderNavMenuProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-controls="header-nav-menu"
          />
        }
      >
        <MenuIcon aria-hidden="true" />
        <span className="sr-only">{labels.menu}</span>
      </SheetTrigger>

      <SheetContent
        id="header-nav-menu"
        side="left"
        className="w-full max-w-xs gap-0 p-0 sm:max-w-sm"
        showCloseButton={false}
      >
        <SheetHeader className="flex-row items-center justify-between gap-3 border-b px-4 py-3">
          <SheetTitle>{labels.menuTitle}</SheetTitle>
          <SheetClose
            render={
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                className="shrink-0 !border-b-[1px] active:translate-y-0"
              />
            }
          >
            <XIcon aria-hidden="true" />
            <span className="sr-only">{labels.closeMenu}</span>
          </SheetClose>
        </SheetHeader>

        <nav
          className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-4"
          aria-label={labels.primaryNav}
        >
          <TextNavigationLink
            href="/jobs"
            current={isCurrent('/jobs')}
            className="px-2 py-3 text-base"
            onClick={() => setOpen(false)}
          >
            {labels.jobs}
          </TextNavigationLink>
          <TextNavigationLink
            href="/employer/jobs/create"
            current={isCurrent('/employer/jobs/create')}
            className="px-2 py-3 text-base"
            onClick={() => setOpen(false)}
          >
            {labels.employers}
          </TextNavigationLink>
          <TextNavigationLink
            href="/profile"
            current={isCurrent('/profile')}
            className="px-2 py-3 text-base"
            onClick={() => setOpen(false)}
          >
            {labels.profile}
          </TextNavigationLink>
        </nav>

        <div className="mt-auto flex flex-col gap-3 border-t px-4 py-4">
          <LangToggle />
          <GovButtonLink href="/login" size="sm" className="w-full justify-center px-4">
            {labels.login}
          </GovButtonLink>
          <GovButtonLink href="/register" size="sm" variant="default" className="w-full justify-center px-4">
            {labels.register}
          </GovButtonLink>
        </div>
      </SheetContent>
    </Sheet>
  );
}
