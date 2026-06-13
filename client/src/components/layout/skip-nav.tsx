"use client";

import { useEffect, useRef, useState } from 'react';
import { useLocale } from 'next-intl';

export function SkipNav() {
  const locale = useLocale();
  const [isVisible, setIsVisible] = useState(false);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const hasShownRef = useRef(false);
  const keyboardModeRef = useRef(true);

  useEffect(() => {
    const handlePointerDown = () => {
      keyboardModeRef.current = false;
    };

    const handleKeyDownMode = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        keyboardModeRef.current = true;
      }
    };

    window.addEventListener('pointerdown', handlePointerDown, true);
    window.addEventListener('mousedown', handlePointerDown, true);
    window.addEventListener('keydown', handleKeyDownMode, true);

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown, true);
      window.removeEventListener('mousedown', handlePointerDown, true);
      window.removeEventListener('keydown', handleKeyDownMode, true);
    };
  }, []);

  useEffect(() => {
    const showSkipNav = () => {
      hasShownRef.current = true;
      setIsVisible(true);
    };

    window.addEventListener('accessjobs:show-skip-nav', showSkipNav);
    return () => window.removeEventListener('accessjobs:show-skip-nav', showSkipNav);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || isVisible || hasShownRef.current || !keyboardModeRef.current) {
        return;
      }

      const activeElement = document.activeElement;
      if (activeElement && activeElement !== document.body && activeElement !== document.documentElement) {
        return;
      }

      event.preventDefault();
      hasShownRef.current = true;
      setIsVisible(true);
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      linkRef.current?.focus();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [isVisible]);

  const label = locale === 'en' ? 'Skip to main content' : 'Bỏ qua đến nội dung chính';

  return (
    <div ref={rootRef} className="w-full bg-[#ffdd00]" onBlurCapture={(event) => {
      const nextTarget = event.relatedTarget as Node | null;
      if (!nextTarget || !rootRef.current?.contains(nextTarget)) {
        setIsVisible(false);
      }
    }}>
      {isVisible ? (
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <a
            ref={linkRef}
            href="#main-content"
            className="inline-flex items-center py-3 text-sm font-bold text-[#0b0c0c] underline decoration-2 underline-offset-4 outline-none hover:decoration-[3px] focus-visible:outline-none focus-visible:ring-0"
          >
            {label}
          </a>
        </div>
      ) : null}
    </div>
  );
}
