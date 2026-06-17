'use client';

import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { BadgeCheck, CalendarDays, Download, FileText, MapPin } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CandidateStatusActions } from '@/components/employer/candidate-status-actions';
import { usePathname, useRouter } from '@/i18n/routing';

type CandidateApplication = {
  name: string;
  role: string;
  location: string;
  match: string;
  status: 'Tiếp nhận' | 'Đã xem' | 'Duyệt hồ sơ' | 'Cân nhắc' | 'Phù hợp' | 'Chưa phù hợp';
  updated: string;
  file: string;
  signal: string;
};

type CandidateApplicationsTableProps = {
  locale: 'vi' | 'en';
  labels: {
    candidateTableTitle: string;
    candidateTableNote: string;
    columns: string[];
    openCv: string;
    downloadCv: string;
    pagination: {
      previous: string;
      next: string;
      page: string;
    };
  };
  applications: CandidateApplication[];
};

function getPageWindow(currentPage: number, totalPages: number) {
  const windowSize = 5;
  if (totalPages <= windowSize) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const start = Math.max(1, Math.min(currentPage - 2, totalPages - (windowSize - 1)));
  return Array.from({ length: windowSize }, (_, index) => start + index);
}

function parsePage(value: string | null) {
  const parsed = Number.parseInt(value ?? '', 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

export function CandidateApplicationsTable({ locale, labels, applications }: CandidateApplicationsTableProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const pageSize = 2;

  const totalPages = Math.max(1, Math.ceil(applications.length / pageSize));
  const currentPage = parsePage(searchParams.get('page'));
  const activePage = Math.min(currentPage, totalPages);
  const applicationsToShow = applications.slice((activePage - 1) * pageSize, activePage * pageSize);
  const paginationWindow = useMemo(() => getPageWindow(activePage, totalPages), [activePage, totalPages]);

  const setPageInUrl = useCallback(
    (page: number) => {
      const nextPage = Math.max(1, Math.min(totalPages, page));
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', String(nextPage));
      router.replace(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams, totalPages],
  );

  const goToPage = useCallback(
    (page: number) => {
      setPageInUrl(page);
    },
    [setPageInUrl],
  );

  const bringFocusIntoView = useCallback((target: HTMLElement) => {
    const container = scrollContainerRef.current;
    if (!container) {
      return;
    }

    const cell = target.closest('td');
    const cellIndex = cell?.cellIndex ?? -1;

    if (cellIndex >= 4) {
      container.scrollLeft = container.scrollWidth;
      return;
    }

    target.scrollIntoView({
      block: 'nearest',
      inline: 'nearest',
    });
  }, []);

  useEffect(() => {
    if (searchParams.get('page') !== String(activePage)) {
      setPageInUrl(activePage);
    }
  }, [activePage, searchParams, setPageInUrl]);

  return (
    <Card className="rounded-none border border-border shadow-lg">
      <CardHeader className="border-b">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-1">
            <CardTitle className="text-2xl">{labels.candidateTableTitle}</CardTitle>
            <p className="text-sm text-muted-foreground">{labels.candidateTableNote}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 p-5">
        <div
          ref={scrollContainerRef}
          data-employer-cv-table-scroll
          className="overflow-x-auto"
          onFocusCapture={(event) => {
            const target = event.target;
            if (!(target instanceof HTMLElement)) {
              return;
            }

            bringFocusIntoView(target);
          }}
        >
          <table className="w-full min-w-[1100px] table-fixed text-left text-sm">
            <caption className="sr-only">{labels.candidateTableTitle}</caption>
            <thead className="border-b text-muted-foreground">
              <tr>
                {labels.columns.map((column, index) => (
                  <th
                    key={column}
                    className={[
                      'px-4 py-3 font-medium',
                      index === 0 ? 'w-[21%]' : '',
                      index === 1 ? 'w-[14%]' : '',
                      index === 2 ? 'w-[11%]' : '',
                      index === 3 ? 'w-[10%]' : '',
                      index === 4 ? 'w-[18%]' : '',
                      index === 5 ? 'w-[10%]' : '',
                      index === 6 ? 'w-[16%]' : '',
                    ].join(' ')}
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {applicationsToShow.map((item) => (
                <tr key={item.name} className="border-b last:border-0">
                  <td className="px-4 py-4 align-middle">
                    <div className="space-y-2">
                      <p className="max-w-[13rem] truncate font-medium text-foreground" title={item.name}>
                        {item.name}
                      </p>
                      <span className="inline-flex w-fit rounded-none bg-muted/40 px-2 py-1 text-xs font-semibold text-foreground">
                        {item.signal}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 align-middle">
                    <span className="block max-w-[12rem] leading-6 text-foreground">{item.role}</span>
                  </td>
                  <td className="px-4 py-4 align-middle">
                    <span className="inline-flex items-center gap-1.5 rounded-none border border-[#0b0c0c] px-3 py-1 text-xs font-semibold text-[#0b0c0c]">
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                      {item.location}
                    </span>
                  </td>
                  <td className="px-4 py-4 align-middle">
                    <span className="inline-flex items-center gap-1.5 rounded-none border border-[#0b0c0c] px-3 py-1 text-xs font-semibold text-[#0b0c0c]">
                      <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
                      {item.match}
                    </span>
                  </td>
                  <td className="px-4 py-4 align-middle">
                    <CandidateStatusActions initialStatus={item.status} />
                  </td>
                  <td className="px-4 py-4 align-middle">
                    <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                      <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                      {item.updated}
                    </span>
                  </td>
                  <td className="px-4 py-4 align-middle">
                    <div className="flex flex-nowrap gap-2">
                      <a
                        href={item.file}
                        target="_blank"
                        rel="noreferrer"
                        className={buttonVariants({
                          variant: 'outline',
                          className:
                            'h-9 rounded-none border-[#0b0c0c] bg-white px-3 text-xs font-medium text-[#0b0c0c] hover:bg-[#ececec] focus-visible:border-[#ffdd00] focus-visible:!outline focus-visible:!outline-[3px] focus-visible:!outline-offset-[3px] focus-visible:!outline-[#ffdd00]',
                        })}
                      >
                        <FileText className="mr-2 h-4 w-4" aria-hidden="true" />
                        {labels.openCv}
                      </a>
                      <a
                        href={item.file}
                        download
                        className={buttonVariants({
                          variant: 'default',
                          className:
                            'h-9 rounded-none px-3 text-xs font-medium focus-visible:border-[#ffdd00] focus-visible:!outline focus-visible:!outline-[3px] focus-visible:!outline-offset-[3px] focus-visible:!outline-[#ffdd00]',
                        })}
                      >
                        <Download className="mr-2 h-4 w-4" aria-hidden="true" />
                        {labels.downloadCv}
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {applications.length > pageSize ? (
          <nav aria-label={locale === 'en' ? 'Pagination' : 'Phân trang'} className="flex flex-col items-center gap-4 border-t pt-4 text-center">
            <p className="text-sm text-muted-foreground">
              {labels.pagination.page} {activePage}/{totalPages}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                className={buttonVariants({ variant: 'outline', className: 'h-10 rounded-none px-4' })}
                onClick={() => goToPage(activePage - 1)}
                disabled={activePage === 1}
              >
                {labels.pagination.previous}
              </button>

              {paginationWindow[0] > 1 ? (
                <button
                  type="button"
                  aria-current={activePage === 1 ? 'page' : undefined}
                  className={buttonVariants({
                    variant: 'outline',
                    className: [
                      'h-10 min-w-10 rounded-none px-3 text-[#0b0c0c] transition-[background-color,border-color,outline-color] duration-150',
                      activePage === 1
                        ? 'bg-white !border-[3px] !border-[#ffdd00]'
                        : 'hover:border-[#0b0c0c] hover:outline hover:outline-[2px] hover:outline-offset-[2px] hover:outline-[#ffdd00]',
                      'focus-visible:bg-[#ffdd00] focus-visible:border-[#0b0c0c] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#ffdd00] focus-visible:ring-0',
                    ].join(' '),
                  })}
                  onClick={() => goToPage(1)}
                >
                  1
                </button>
              ) : null}

              {paginationWindow[0] > 2 ? <span className="px-1 text-muted-foreground">…</span> : null}

              {paginationWindow.map((page) => (
                <button
                  key={page}
                  type="button"
                  aria-current={page === activePage ? 'page' : undefined}
                  className={buttonVariants({
                    variant: 'outline',
                    className: [
                      'h-10 min-w-10 rounded-none px-3 text-[#0b0c0c] transition-[background-color,border-color,outline-color] duration-150',
                      page === activePage
                        ? 'bg-white !border-[3px] !border-[#ffdd00]'
                        : 'hover:border-[#0b0c0c] hover:outline hover:outline-[2px] hover:outline-offset-[2px] hover:outline-[#ffdd00]',
                      'focus-visible:bg-[#ffdd00] focus-visible:border-[#0b0c0c] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#ffdd00] focus-visible:ring-0',
                    ].join(' '),
                  })}
                  onClick={() => goToPage(page)}
                >
                  {page}
                </button>
              ))}

              {paginationWindow[paginationWindow.length - 1] < totalPages - 1 ? (
                <span className="px-1 text-muted-foreground">…</span>
              ) : null}

              {paginationWindow[paginationWindow.length - 1] < totalPages ? (
                <button
                  type="button"
                  aria-current={activePage === totalPages ? 'page' : undefined}
                  className={buttonVariants({
                    variant: 'outline',
                    className: [
                      'h-10 min-w-10 rounded-none px-3 text-[#0b0c0c] transition-[background-color,border-color,outline-color] duration-150',
                      activePage === totalPages
                        ? 'bg-white !border-[3px] !border-[#ffdd00]'
                        : 'hover:border-[#0b0c0c] hover:outline hover:outline-[2px] hover:outline-offset-[2px] hover:outline-[#ffdd00]',
                      'focus-visible:bg-[#ffdd00] focus-visible:border-[#0b0c0c] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#ffdd00] focus-visible:ring-0',
                    ].join(' '),
                  })}
                  onClick={() => goToPage(totalPages)}
                >
                  {totalPages}
                </button>
              ) : null}

              <button
                type="button"
                className={buttonVariants({ variant: 'outline', className: 'h-10 rounded-none px-4' })}
                onClick={() => goToPage(activePage + 1)}
                disabled={activePage === totalPages}
              >
                {labels.pagination.next}
              </button>
            </div>
          </nav>
        ) : null}
      </CardContent>
    </Card>
  );
}
