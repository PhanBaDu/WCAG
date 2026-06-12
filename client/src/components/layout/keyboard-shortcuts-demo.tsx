"use client";

import { useEffect, useMemo, useRef, useState } from 'react';

type ShortcutLocale = 'vi' | 'en';

type ActionDirection = 'next' | 'previous';

const shortcutGroups = {
  headings: 'h1, h2, h3',
  links: 'a[href]',
  buttons: 'button, [role="button"]',
  fields: 'input:not([type="hidden"]), select, textarea',
  comboBoxes: '[role="combobox"], select',
  lists: 'ul, ol',
  listItems: 'li',
  tables: 'table',
  landmarks: 'header, nav, main, aside, footer',
  graphics: 'img, svg',
  quotes: 'blockquote',
  radios: 'input[type="radio"]',
} as const;

function isTypingTarget(target: EventTarget | null) {
  const element = target instanceof HTMLElement ? target : null;
  return Boolean(element?.closest('input, textarea, select, [contenteditable="true"]'));
}

function isVisible(element: HTMLElement) {
  const style = window.getComputedStyle(element);
  return style.display !== 'none' && style.visibility !== 'hidden' && element.getClientRects().length > 0;
}

function makeFocusable(element: HTMLElement) {
  if (!element.hasAttribute('tabindex')) {
    element.tabIndex = -1;
  }
  element.classList.add('keyboard-focus-target');
}

function focusElement(element: HTMLElement, statusText: string, setStatus: (value: string) => void) {
  makeFocusable(element);
  element.focus({ preventScroll: true });
  element.scrollIntoView({ block: 'center', behavior: 'smooth' });
  setStatus(statusText);
}

function getLabel(element: HTMLElement) {
  const text = element.getAttribute('aria-label') || element.textContent || element.tagName;
  return text.replace(/\s+/g, ' ').trim().slice(0, 80);
}

function focusNextMatch(
  root: ParentNode,
  selector: string,
  direction: ActionDirection,
  statusText: string,
  setStatus: (value: string) => void
) {
  const elements = Array.from(root.querySelectorAll<HTMLElement>(selector)).filter(isVisible);
  if (!elements.length) return false;

  const current = document.activeElement as HTMLElement | null;
  const currentIndex = current ? elements.indexOf(current) : -1;
  const nextIndex =
    direction === 'next'
      ? currentIndex >= 0
        ? (currentIndex + 1) % elements.length
        : 0
      : currentIndex >= 0
        ? (currentIndex - 1 + elements.length) % elements.length
        : elements.length - 1;

  const next = elements[nextIndex];
  focusElement(next, `${statusText}: ${getLabel(next)}`, setStatus);
  return true;
}

export function KeyboardShortcutsDemo({ locale }: { locale: ShortcutLocale }) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState(
    locale === 'en'
      ? 'Try pressing H, K, B, F, T, D, G, Q, or R to move focus.'
      : 'Thử bấm H, K, B, F, T, D, G, Q hoặc R để di chuyển focus.'
  );

  const strings = useMemo(
    () =>
      locale === 'en'
        ? {
            title: 'Keyboard shortcut demo',
            description:
              'These shortcuts now move focus across real content on the page. Tab and Shift + Tab still use the browser default.',
            instructions: 'Press a letter key, then watch the live status update.',
            skipNavigation: 'Skip navigation',
            mainContent: 'Main content',
            nextHeading: 'Next heading',
            previousHeading: 'Previous heading',
            nextLink: 'Next link',
            previousLink: 'Previous link',
            nextButton: 'Next button',
            previousButton: 'Previous button',
            nextField: 'Next field',
            previousField: 'Previous field',
            nextComboBox: 'Next combo box',
            previousComboBox: 'Previous combo box',
            nextList: 'Next list',
            nextListItem: 'Next list item',
            nextTable: 'Next table',
            previousTable: 'Previous table',
            nextLandmark: 'Next landmark',
            previousLandmark: 'Previous landmark',
            nextGraphic: 'Next graphic',
            previousGraphic: 'Previous graphic',
            nextBlockquote: 'Next blockquote',
            nextRadio: 'Next radio button',
            previousRadio: 'Previous radio button',
            tabNote: 'Tab, Shift + Tab, Enter, Space, and Esc remain the native browser or control behavior.',
          }
        : {
            title: 'Demo phím tắt',
            description:
              'Các phím tắt này sẽ di chuyển focus giữa các phần tử thật trên trang. Tab và Shift + Tab vẫn là hành vi mặc định của trình duyệt.',
            instructions: 'Bấm một phím chữ rồi xem trạng thái live được cập nhật.',
            skipNavigation: 'Bỏ qua điều hướng',
            mainContent: 'Nội dung chính',
            nextHeading: 'Heading tiếp theo',
            previousHeading: 'Heading trước',
            nextLink: 'Link tiếp theo',
            previousLink: 'Link trước',
            nextButton: 'Button tiếp theo',
            previousButton: 'Button trước',
            nextField: 'Ô nhập tiếp theo',
            previousField: 'Ô nhập trước',
            nextComboBox: 'Combo box tiếp theo',
            previousComboBox: 'Combo box trước',
            nextList: 'Danh sách tiếp theo',
            nextListItem: 'Phần tử danh sách tiếp theo',
            nextTable: 'Bảng tiếp theo',
            previousTable: 'Bảng trước',
            nextLandmark: 'Landmark tiếp theo',
            previousLandmark: 'Landmark trước',
            nextGraphic: 'Hình ảnh tiếp theo',
            previousGraphic: 'Hình ảnh trước',
            nextBlockquote: 'Trích dẫn tiếp theo',
            nextRadio: 'Radio tiếp theo',
            previousRadio: 'Radio trước',
            tabNote: 'Tab, Shift + Tab, Enter, Space và Esc vẫn theo hành vi mặc định của trình duyệt hoặc control.',
          },
    [locale]
  );

  useEffect(() => {
    const onFocusIn = (event: FocusEvent) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      setStatus(`${strings.title}: ${getLabel(target)}`);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (isTypingTarget(event.target)) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      const key = event.key;
      const shift = event.shiftKey;
      const routeAction = (
        selector: string,
        label: string,
        direction: ActionDirection = 'next'
      ) => {
        event.preventDefault();
        focusNextMatch(document, selector, direction, label, setStatus);
      };

      switch (key) {
        case 'n':
        case 'N':
          event.preventDefault();
          focusElement(
            document.querySelector('a[href="#main-content"]') as HTMLElement,
            strings.skipNavigation,
            setStatus
          );
          return;
        case 'm':
        case 'M':
          event.preventDefault();
          focusElement(
            document.querySelector('main#main-content') as HTMLElement,
            strings.mainContent,
            setStatus
          );
          return;
        case 'h':
        case 'H':
          routeAction(shortcutGroups.headings, shift ? strings.previousHeading : strings.nextHeading, shift ? 'previous' : 'next');
          return;
        case 'k':
        case 'K':
          routeAction(shortcutGroups.links, shift ? strings.previousLink : strings.nextLink, shift ? 'previous' : 'next');
          return;
        case 'b':
        case 'B':
          routeAction(shortcutGroups.buttons, shift ? strings.previousButton : strings.nextButton, shift ? 'previous' : 'next');
          return;
        case 'f':
        case 'F':
        case 'e':
        case 'E':
          routeAction(shortcutGroups.fields, shift ? strings.previousField : strings.nextField, shift ? 'previous' : 'next');
          return;
        case 'c':
        case 'C':
          routeAction(shortcutGroups.comboBoxes, shift ? strings.previousComboBox : strings.nextComboBox, shift ? 'previous' : 'next');
          return;
        case 'l':
        case 'L':
          routeAction(shortcutGroups.lists, strings.nextList);
          return;
        case 'i':
        case 'I':
          routeAction(shortcutGroups.listItems, strings.nextListItem);
          return;
        case 't':
        case 'T':
          routeAction(shortcutGroups.tables, shift ? strings.previousTable : strings.nextTable, shift ? 'previous' : 'next');
          return;
        case 'd':
        case 'D':
          routeAction(shortcutGroups.landmarks, shift ? strings.previousLandmark : strings.nextLandmark, shift ? 'previous' : 'next');
          return;
        case 'g':
        case 'G':
          routeAction(shortcutGroups.graphics, shift ? strings.previousGraphic : strings.nextGraphic, shift ? 'previous' : 'next');
          return;
        case 'q':
        case 'Q':
          routeAction(shortcutGroups.quotes, strings.nextBlockquote);
          return;
        case 'r':
        case 'R':
          routeAction(shortcutGroups.radios, shift ? strings.previousRadio : strings.nextRadio, shift ? 'previous' : 'next');
          return;
        case 'Tab':
          setStatus(
            shift
              ? `${locale === 'en' ? 'Shift + Tab' : 'Shift + Tab'}: ${locale === 'en' ? 'browser moves to previous focusable element' : 'trình duyệt chuyển tới phần tử trước'}`
              : `${locale === 'en' ? 'Tab' : 'Tab'}: ${locale === 'en' ? 'browser moves to next focusable element' : 'trình duyệt chuyển tới phần tử tiếp theo'}`
          );
          return;
        case 'Escape':
          setStatus(locale === 'en' ? 'Esc pressed: close a dialog, menu, or popup when one is open.' : 'Đã bấm Esc: đóng dialog, menu hoặc popup nếu đang mở.');
          return;
        default:
          return;
      }
    };

    document.addEventListener('focusin', onFocusIn);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('focusin', onFocusIn);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [locale, strings]);

  return (
    <div ref={rootRef} className="space-y-4 rounded-3xl border bg-background p-6 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">{strings.title}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{strings.description}</p>
        </div>
        <p className="text-sm text-muted-foreground">{strings.instructions}</p>
      </div>

      <div className="rounded-2xl bg-muted/40 p-4" aria-live="polite" role="status">
        <p className="text-sm font-medium text-foreground">{status}</p>
        <p className="mt-1 text-xs text-muted-foreground">{strings.tabNote}</p>
      </div>
    </div>
  );
}
