'use client';

import type { FocusEvent } from 'react';

type JobsPageSkipLinksProps = {
  locale: 'vi' | 'en';
};

const copy = {
  vi: {
    navLabel: 'Chuyển nhanh trong trang tìm việc',
    filters: 'Chuyển đến Bộ lọc',
    filtersLabel: 'Chuyển đến bộ lọc',
    results: 'Chuyển đến Danh sách việc làm',
    resultsLabel: 'Chuyển đến danh sách việc làm',
  },
  en: {
    navLabel: 'Skip links on job search page',
    filters: 'Skip to filters',
    filtersLabel: 'Skip to filters',
    results: 'Skip to job listings',
    resultsLabel: 'Skip to job listings',
  },
} as const;

const targets = [
  { href: '#jobs-filters', key: 'filters' as const, labelKey: 'filtersLabel' as const },
  { href: '#jobs-results', key: 'results' as const, labelKey: 'resultsLabel' as const },
];

function focusTarget(id: string) {
  const element = document.getElementById(id);
  if (!element) {
    return;
  }
  element.focus({ preventScroll: false });
}

function setSkipLinkActive(event: FocusEvent<HTMLAnchorElement>, active: boolean) {
  event.currentTarget.classList.toggle('jobs-page-skip-link--active', active);
}

export function JobsPageSkipLinks({ locale }: JobsPageSkipLinksProps) {
  const t = copy[locale];

  return (
    <nav aria-label={t.navLabel} className="jobs-page-skip-nav jobs-page-skip-nav--below-search">
      <ul className="jobs-page-skip-list">
        {targets.map(({ href, key, labelKey }, index) => (
          <li key={href} className="flex items-center gap-2">
            {index > 0 ? (
              <span className="jobs-page-skip-separator text-muted-foreground" aria-hidden="true">
                ·
              </span>
            ) : null}
            <a
              href={href}
              aria-label={t[labelKey]}
              className="jobs-page-skip-link"
              onFocus={(event) => setSkipLinkActive(event, true)}
              onBlur={(event) => setSkipLinkActive(event, false)}
              onClick={(event) => {
                event.preventDefault();
                focusTarget(href.slice(1));
              }}
            >
              {t[key]}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
