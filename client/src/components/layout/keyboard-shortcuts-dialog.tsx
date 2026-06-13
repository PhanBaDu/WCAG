"use client";

import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type ShortcutItem = {
  key: string;
  action: string;
  description: string;
};

export function KeyboardShortcutsDialog() {
  const [open, setOpen] = useState(false);

  const shortcuts = useMemo<ShortcutItem[]>(
    () => [
      { key: 'Tab', action: 'Next focusable element', description: 'Move to the next interactive control on the page.' },
      { key: 'Shift + Tab', action: 'Previous focusable element', description: 'Move back to the previous interactive control.' },
      { key: 'Enter', action: 'Activate', description: 'Open a link or trigger the focused control.' },
      { key: 'Esc', action: 'Close dialog', description: 'Close this shortcut help panel or any open dialog.' },
      { key: 'N', action: 'Skip navigation', description: 'Jump to the main content skip link when available.' },
      { key: 'M', action: 'Main content', description: 'Move focus to the page’s main content region.' },
    ],
    []
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }

      const isTypingTarget =
        event.target instanceof HTMLElement &&
        Boolean(event.target.closest('input, textarea, select, [contenteditable="true"]'));

      if (isTypingTarget) {
        return;
      }

      const isHotkey =
        event.shiftKey && (
          event.key === '?' ||
          event.key === '/' ||
          event.code === 'Slash'
        );

      if (!isHotkey) {
        return;
      }

      event.preventDefault();
      setOpen((current) => !current);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Keyboard shortcuts</DialogTitle>
          <DialogDescription>
            Use these keys to move around the site without a mouse. Press Escape to close this panel.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-3 sm:grid-cols-2">
          {shortcuts.map((item) => (
            <div key={item.key} className="rounded-2xl bg-muted/40 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium text-foreground">{item.action}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                </div>
                <kbd className="inline-flex min-w-20 justify-center rounded-md border border-border bg-background px-2 py-1 font-mono text-sm font-semibold text-foreground">
                  {item.key}
                </kbd>
              </div>
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Dismiss
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
