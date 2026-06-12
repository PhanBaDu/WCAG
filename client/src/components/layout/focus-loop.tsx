"use client";

import { useEffect } from 'react';

function isTypingTarget(target: EventTarget | null) {
  const element = target instanceof HTMLElement ? target : null;
  return Boolean(element?.closest('input, textarea, select, [contenteditable="true"]'));
}

function isVisible(element: HTMLElement) {
  const style = window.getComputedStyle(element);
  return style.display !== 'none' && style.visibility !== 'hidden' && element.getClientRects().length > 0;
}

function getFocusableElements(root: HTMLElement) {
  return Array.from(
    root.querySelectorAll<HTMLElement>(
      [
        'a[href]',
        'button:not([disabled])',
        'input:not([type="hidden"]):not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        'summary',
        '[role="button"]',
        '[tabindex]:not([tabindex="-1"])',
      ].join(', ')
    )
  ).filter(isVisible);
}

export function FocusLoop() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (isTypingTarget(event.target)) return;

      const shell = document.querySelector<HTMLElement>('[data-app-shell="true"]');
      if (!shell) return;

      const focusables = getFocusableElements(shell);
      if (!focusables.length) return;

      const current = document.activeElement as HTMLElement | null;
      if (!current || !shell.contains(current)) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (!event.shiftKey && current === last) {
        event.preventDefault();
        first.focus();
        return;
      }

      if (event.shiftKey && current === first) {
        event.preventDefault();
        last.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  return null;
}
