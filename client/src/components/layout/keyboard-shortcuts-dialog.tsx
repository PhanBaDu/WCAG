"use client";

import { useEffect, useMemo, useState } from 'react';
import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type ShortcutItem = {
  key: string;
  action: string;
  description: string;
};

const copy = {
  vi: {
    title: 'Phím tắt bàn phím',
    description: 'Các phím sau giúp bạn thao tác nhanh hơn trên AccessJobs VN. Nhấn Escape để đóng bảng này.',
    dismiss: 'Đóng',
    shortcuts: [
      { key: 'Shift + ?', action: 'Mở trợ giúp phím tắt', description: 'Hiện hoặc ẩn bảng phím tắt này ở mọi trang.' },
      { key: 'N', action: 'Bỏ qua điều hướng', description: 'Hiện liên kết bỏ qua và chuyển focus tới đó.' },
      { key: 'M', action: 'Nội dung chính', description: 'Chuyển focus thẳng tới vùng nội dung chính của trang.' },
      { key: 'Tab', action: 'Phần tử tiếp theo', description: 'Di chuyển tới control tương tác kế tiếp (phím trình duyệt).' },
      { key: 'Shift + Tab', action: 'Phần tử trước đó', description: 'Quay lại control tương tác phía trước (phím trình duyệt).' },
      { key: 'Enter', action: 'Kích hoạt', description: 'Mở liên kết hoặc bấm nút đang được focus.' },
      { key: 'Esc', action: 'Đóng hộp thoại', description: 'Đóng bảng phím tắt hoặc hộp thoại đang mở.' },
    ] as ShortcutItem[],
  },
  en: {
    title: 'Keyboard shortcuts',
    description: 'These keys help you move around AccessJobs VN faster. Press Escape to close this panel.',
    dismiss: 'Dismiss',
    shortcuts: [
      { key: 'Shift + ?', action: 'Open shortcut help', description: 'Show or hide this shortcut panel on any page.' },
      { key: 'N', action: 'Skip navigation', description: 'Reveal the skip link and move focus to it.' },
      { key: 'M', action: 'Main content', description: 'Move focus directly to the page’s main content region.' },
      { key: 'Tab', action: 'Next focusable element', description: 'Move to the next interactive control (browser default).' },
      { key: 'Shift + Tab', action: 'Previous focusable element', description: 'Move back to the previous interactive control (browser default).' },
      { key: 'Enter', action: 'Activate', description: 'Open a link or trigger the focused control.' },
      { key: 'Esc', action: 'Close dialog', description: 'Close this shortcut panel or any open dialog.' },
    ] as ShortcutItem[],
  },
} as const;

function isTypingTarget(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    Boolean(target.closest('input, textarea, select, [contenteditable="true"]'))
  );
}

export function KeyboardShortcutsDialog() {
  const locale = useLocale();
  const isEn = locale === 'en';
  const t = isEn ? copy.en : copy.vi;
  const [open, setOpen] = useState(false);

  const shortcuts = useMemo(() => t.shortcuts, [t.shortcuts]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }

      if (isTypingTarget(event.target)) {
        return;
      }

      const isHelpHotkey =
        event.shiftKey && (event.key === '?' || event.key === '/' || event.code === 'Slash');

      if (isHelpHotkey) {
        event.preventDefault();
        setOpen((current) => !current);
        return;
      }

      if (event.shiftKey) {
        return;
      }

      if (event.key === 'n' || event.key === 'N') {
        event.preventDefault();
        window.dispatchEvent(new Event('accessjobs:show-skip-nav'));
        return;
      }

      if (event.key === 'm' || event.key === 'M') {
        event.preventDefault();
        document.getElementById('main-content')?.focus({ preventScroll: true });
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="gap-6 p-6 sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">{t.title}</DialogTitle>
          <DialogDescription>{t.description}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-3 md:grid-cols-2">
          {shortcuts.map((item) => (
            <div key={item.key} className="rounded-2xl bg-muted/40 p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-medium text-foreground">{item.action}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
                <kbd className="inline-flex shrink-0 justify-center rounded-md border border-border bg-background px-3 py-1 font-mono text-sm font-semibold whitespace-nowrap text-foreground">
                  {item.key}
                </kbd>
              </div>
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            {t.dismiss}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
