'use client';

import { useMemo, useRef, useState } from 'react';
import {
  Accessibility,
  Briefcase,
  CircleDollarSign,
  Factory,
  Filter,
  GraduationCap,
  Layers,
  MapPin,
} from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { PageBreadcrumb } from '@/components/layout/page-breadcrumb';
import { JobsFilterAside } from '@/components/jobs/jobs-filter-aside';
import { JobResultCard } from '@/components/jobs/job-result-card';
import { JobsPageSkipLinks } from '@/components/jobs/jobs-page-skip-links';
import { FilterCollapsibleSection, FilterSectionDivider } from '@/components/jobs/filter-collapsible-section';
import { FilterRadioGroup } from '@/components/jobs/filter-radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  applyFacetFilters,
  buildFacets,
  getHotJobs,
  getMockJobs,
  searchJobs,
  type SearchScope,
} from '@/lib/jobs/mock-jobs';

const copy = {
  vi: {
    pageTitle: 'Tìm kiếm việc làm',
    searchLabel: 'Từ khoá tìm kiếm',
    searchPlaceholder: 'Nhập tên việc làm, kỹ năng hoặc địa điểm',
    searchButton: 'Tìm kiếm',
    filtersTitle: 'Bộ lọc',
    searchScopeLegend: 'Tìm theo',
    searchScope: [
      { value: 'title', label: 'Tên việc làm' },
      { value: 'company', label: 'Tên công ty' },
      { value: 'both', label: 'Cả hai' },
    ],
    advancedFiltersLegend: 'Bộ lọc nâng cao',
    experienceLegend: 'Kinh nghiệm',
    categoryLegend: 'Danh mục nghề',
    facetHint: 'Các lựa chọn dưới đây dựa trên kết quả tìm kiếm hiện tại.',
    disabilityLegend: 'Dạng khuyết tật phù hợp',
    disabilityTypes: ['Vận động', 'Thị giác', 'Thính giác', 'Ngôn ngữ', 'Nhận thức', 'Khác'],
    jobTypeLegend: 'Loại công việc',
    jobTypes: ['Toàn thời gian', 'Bán thời gian', 'Làm từ xa', 'Hybrid'],
    locationLegend: 'Khu vực',
    areas: ['Toàn quốc', 'Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Cần Thơ'],
    industryLegend: 'Ngành nghề',
    industries: ['Công nghệ thông tin', 'Dịch vụ khách hàng', 'Hành chính văn phòng', 'Marketing / Truyền thông'],
    salaryLegend: 'Mức lương',
    salaryRanges: ['Dưới 10 triệu', '10 - 15 triệu', '15 - 20 triệu', 'Trên 20 triệu', 'Thỏa thuận'],
    clearFilters: 'Xóa tất cả bộ lọc',
    resultsTitle: (count: number) => `${count} việc làm`,
    emptyNoResults: 'Không tìm thấy việc làm phù hợp. Hãy thử từ khoá hoặc bộ lọc khác.',
    crumbs: [
      { label: 'Trang chủ', href: '/' },
      { label: 'Việc làm' },
    ],
  },
  en: {
    pageTitle: 'Job search',
    searchLabel: 'Search keywords',
    searchPlaceholder: 'Enter job title, skill, or location',
    searchButton: 'Search',
    filtersTitle: 'Filters',
    searchScopeLegend: 'Search in',
    searchScope: [
      { value: 'title', label: 'Job title' },
      { value: 'company', label: 'Company name' },
      { value: 'both', label: 'Both' },
    ],
    advancedFiltersLegend: 'Advanced filters',
    experienceLegend: 'Experience',
    categoryLegend: 'Job category',
    facetHint: 'Options below are based on your current search results.',
    disabilityLegend: 'Disability type',
    disabilityTypes: ['Mobility', 'Visual', 'Hearing', 'Speech', 'Cognitive', 'Other'],
    jobTypeLegend: 'Job type',
    jobTypes: ['Full time', 'Part time', 'Remote', 'Hybrid'],
    locationLegend: 'Location',
    areas: ['Nationwide', 'Hanoi', 'Ho Chi Minh City', 'Da Nang', 'Can Tho'],
    industryLegend: 'Industry',
    industries: ['Information technology', 'Customer service', 'Office administration', 'Marketing / Media'],
    salaryLegend: 'Salary range',
    salaryRanges: ['Under 10 million VND', '10 - 15 million VND', '15 - 20 million VND', 'Over 20 million VND', 'Negotiable'],
    clearFilters: 'Clear all filters',
    resultsTitle: (count: number) => `${count} jobs`,
    emptyNoResults: 'No matching jobs found. Try different keywords or filters.',
    crumbs: [
      { label: 'Home', href: '/' },
      { label: 'Jobs' },
    ],
  },
} as const;

type JobsSearchPageProps = {
  locale: 'vi' | 'en';
};

function toggleValue(values: string[], value: string) {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
}

export function JobsSearchPage({ locale }: JobsSearchPageProps) {
  const t = copy[locale];
  const allJobs = useMemo(() => getMockJobs(locale), [locale]);
  const hotJobs = useMemo(() => getHotJobs(allJobs, 12), [allJobs]);
  const resultsRef = useRef<HTMLElement>(null);

  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [searchScope, setSearchScope] = useState<SearchScope>('both');
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const searchMatches = useMemo(() => {
    if (!hasSearched) {
      return [];
    }
    return searchJobs(allJobs, submittedQuery, searchScope);
  }, [allJobs, hasSearched, submittedQuery, searchScope]);

  const experienceFacets = useMemo(() => buildFacets(searchMatches, 'experience'), [searchMatches]);
  const categoryFacets = useMemo(() => buildFacets(searchMatches, 'category'), [searchMatches]);

  const displayedJobs = useMemo(
    () => applyFacetFilters(searchMatches, selectedExperience, selectedCategories),
    [searchMatches, selectedExperience, selectedCategories],
  );

  const jobsToShow = hasSearched ? displayedJobs : hotJobs;
  const resultsLabel = t.resultsTitle(jobsToShow.length);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmittedQuery(query.trim());
    setHasSearched(true);
    setSelectedExperience([]);
    setSelectedCategories([]);
    requestAnimationFrame(() => resultsRef.current?.focus());
  };

  const handleClearFilters = () => {
    setSelectedExperience([]);
    setSelectedCategories([]);
  };

  return (
    <div className="mx-auto w-full max-w-7xl overflow-x-clip px-4 pb-8 pt-2 sm:px-6 lg:px-8 lg:pb-12 lg:pt-3">
      <PageBreadcrumb items={[...t.crumbs]} />
      <h1 className="mb-6 text-2xl font-bold tracking-tight">{t.pageTitle}</h1>

      <form
        id="jobs-search-form"
        tabIndex={-1}
        role="search"
        aria-label={t.pageTitle}
        onSubmit={handleSearch}
        className="mb-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4"
      >
        <div className="w-full min-w-[16rem] max-w-2xl">
          <label htmlFor="job-search" className="sr-only">
            {t.searchLabel}
          </label>
          <input
            id="job-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="gov-input h-12 w-full px-4 text-base"
            placeholder={t.searchPlaceholder}
          />
        </div>
        <button type="submit" className={buttonVariants({ className: 'h-12 w-full shrink-0 sm:w-auto sm:self-center' })}>
          {t.searchButton}
        </button>
      </form>

      <JobsPageSkipLinks locale={locale} />

      <div className="mb-8 grid gap-8 lg:grid-cols-[minmax(0,30%)_minmax(0,1fr)]">
        <div className="min-w-0">
          <JobsFilterAside label={t.filtersTitle}>
          <Card className="overflow-visible border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Filter className="h-5 w-5 text-primary" aria-hidden="true" />
                {t.filtersTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FilterRadioGroup
                legend={t.searchScopeLegend}
                name="search-scope"
                options={[...t.searchScope]}
                value={searchScope}
                onValueChange={(value) => setSearchScope(value as SearchScope)}
              />

              {hasSearched && searchMatches.length > 0 ? (
                <>
                  <div>
                    <FilterSectionDivider />
                    <fieldset className="space-y-3">
                      <legend className="flex items-center gap-2 text-sm font-semibold">
                        <GraduationCap className="h-4 w-4 text-primary" aria-hidden="true" />
                        {t.experienceLegend}
                      </legend>
                      <p className="text-xs text-muted-foreground">{t.facetHint}</p>
                      {experienceFacets.map((facet) => (
                        <label
                          key={facet.value}
                          className="filter-option flex cursor-pointer items-center gap-3 text-sm text-[#0b0c0c]"
                        >
                          <input
                            type="checkbox"
                            name="experience"
                            value={facet.value}
                            checked={selectedExperience.includes(facet.value)}
                            onChange={() => setSelectedExperience((current) => toggleValue(current, facet.value))}
                            className="filter-control rounded text-primary"
                          />
                          <span className="filter-option-text">
                            {facet.label}
                            <span className="ml-1 text-muted-foreground">({facet.count})</span>
                          </span>
                        </label>
                      ))}
                    </fieldset>
                  </div>

                  <div>
                    <FilterSectionDivider />
                    <fieldset className="space-y-3">
                      <legend className="flex items-center gap-2 text-sm font-semibold">
                        <Layers className="h-4 w-4 text-primary" aria-hidden="true" />
                        {t.categoryLegend}
                      </legend>
                      <p className="text-xs text-muted-foreground">{t.facetHint}</p>
                      {categoryFacets.map((facet) => (
                        <label
                          key={facet.value}
                          className="filter-option flex cursor-pointer items-center gap-3 text-sm text-[#0b0c0c]"
                        >
                          <input
                            type="checkbox"
                            name="job-category"
                            value={facet.value}
                            checked={selectedCategories.includes(facet.value)}
                            onChange={() => setSelectedCategories((current) => toggleValue(current, facet.value))}
                            className="filter-control rounded text-primary"
                          />
                          <span className="filter-option-text">
                            {facet.label}
                            <span className="ml-1 text-muted-foreground">({facet.count})</span>
                          </span>
                        </label>
                      ))}
                    </fieldset>
                  </div>
                </>
              ) : null}

              <FilterCollapsibleSection
                label={
                  <>
                    <Filter className="h-4 w-4 text-primary" aria-hidden="true" />
                    {t.advancedFiltersLegend}
                  </>
                }
              >
                <fieldset className="space-y-3">
                  <legend className="flex items-center gap-2 text-sm font-semibold">
                    <Accessibility className="h-4 w-4 text-primary" aria-hidden="true" />
                    {t.disabilityLegend}
                  </legend>
                  {t.disabilityTypes.map((item) => (
                    <label key={item} className="filter-option flex cursor-pointer items-center gap-3 text-sm text-[#0b0c0c]">
                      <input type="checkbox" name="disability-type" value={item} className="filter-control rounded text-primary" />
                      <span className="filter-option-text">{item}</span>
                    </label>
                  ))}
                </fieldset>

                <FilterSectionDivider />

                <fieldset className="space-y-3">
                  <legend className="flex items-center gap-2 text-sm font-semibold">
                    <Briefcase className="h-4 w-4 text-primary" aria-hidden="true" />
                    {t.jobTypeLegend}
                  </legend>
                  {t.jobTypes.map((item) => (
                    <label key={item} className="filter-option flex cursor-pointer items-center gap-3 text-sm text-[#0b0c0c]">
                      <input type="checkbox" name="job-type" value={item} className="filter-control rounded text-primary" />
                      <span className="filter-option-text">{item}</span>
                    </label>
                  ))}
                </fieldset>

                <FilterSectionDivider />

                <FilterRadioGroup
                  name="province"
                  legend={
                    <span className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
                      {t.locationLegend}
                    </span>
                  }
                  options={t.areas.map((item) => ({ value: item, label: item }))}
                />

                <FilterSectionDivider />

                <fieldset className="space-y-3">
                  <legend className="flex items-center gap-2 text-sm font-semibold">
                    <Factory className="h-4 w-4 text-primary" aria-hidden="true" />
                    {t.industryLegend}
                  </legend>
                  {t.industries.map((item) => (
                    <label key={item} className="filter-option flex cursor-pointer items-center gap-3 text-sm text-[#0b0c0c]">
                      <input type="checkbox" name="industry" value={item} className="filter-control rounded text-primary" />
                      <span className="filter-option-text">{item}</span>
                    </label>
                  ))}
                </fieldset>

                <FilterSectionDivider />

                <fieldset className="space-y-3">
                  <legend className="flex items-center gap-2 text-sm font-semibold">
                    <CircleDollarSign className="h-4 w-4 text-primary" aria-hidden="true" />
                    {t.salaryLegend}
                  </legend>
                  {t.salaryRanges.map((item) => (
                    <label key={item} className="filter-option flex cursor-pointer items-center gap-3 text-sm text-[#0b0c0c]">
                      <input type="checkbox" name="salary-range" value={item} className="filter-control rounded text-primary" />
                      <span className="filter-option-text">{item}</span>
                    </label>
                  ))}
                </fieldset>
              </FilterCollapsibleSection>

              <button
                type="button"
                onClick={handleClearFilters}
                className={buttonVariants({ variant: 'outline', className: 'h-11 w-full' })}
              >
                {t.clearFilters}
              </button>
            </CardContent>
          </Card>
          </JobsFilterAside>
        </div>

        <section
          ref={resultsRef}
          id="jobs-results"
          tabIndex={-1}
          aria-labelledby="jobs-results-heading"
          aria-live="polite"
          className="min-w-0 space-y-4 outline-none"
        >
          <h2 id="jobs-results-heading" className="sr-only">
            {resultsLabel}
          </h2>

          {hasSearched && jobsToShow.length === 0 ? (
            <p className="text-base text-muted-foreground">{t.emptyNoResults}</p>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {jobsToShow.map((job) => (
                <JobResultCard key={job.slug} job={job} locale={locale} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
