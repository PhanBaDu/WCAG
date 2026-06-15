'use client';

type JobsPageSkipLinksProps = {
  locale: 'vi' | 'en';
};

const copy = {
  vi: {
    navLabel: 'Chuyển nhanh trong trang tìm việc',
    search: 'Chuyển nhanh đến tìm kiếm',
    filters: 'Chuyển nhanh đến bộ lọc',
    results: 'Chuyển nhanh đến danh sách việc làm',
  },
  en: {
    navLabel: 'Skip links on job search page',
    search: 'Skip to search',
    filters: 'Skip to filters',
    results: 'Skip to job listings',
  },
} as const;

const targets = [
  { href: '#jobs-search-form', key: 'search' as const },
  { href: '#jobs-filters', key: 'filters' as const },
  { href: '#jobs-results', key: 'results' as const },
];

function focusTarget(id: string) {
  const element = document.getElementById(id);
  if (!element) {
    return;
  }
  element.focus({ preventScroll: false });
}

export function JobsPageSkipLinks({ locale }: JobsPageSkipLinksProps) {
  const t = copy[locale];

  return (
    <nav aria-label={t.navLabel} className="jobs-page-skip-nav">
      <ul className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:gap-x-4 sm:gap-y-1">
        {targets.map(({ href, key }) => (
          <li key={href}>
            <a
              href={href}
              className="jobs-page-skip-link"
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
