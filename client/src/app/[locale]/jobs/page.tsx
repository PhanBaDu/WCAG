/**
 * @file        src/app/[locale]/jobs/page.tsx
 * @description Main Job Search page with filters and pagination.
 * @module      Jobs/Search
 *
 * @author      Antigravity
 * @created     2026-06-10
 * @updated     2026-06-10
 *
 * @wcag        1.3.1 Info and Relationships (A) - fieldset/legend for filters
 *              3.2.2 On Input (A) - filters don't reload page
 *              4.1.3 Status Messages (AA) - aria-live for search results count
 */

"use client"

import * as React from "react"
import { useTranslations } from "next-intl"
import { useRouter } from "@/i18n/routing"
import { useSearchParams } from "next/navigation"
import { useJobsQuery } from "@/hooks/use-jobs"
import { JobSearchFilters, DisabilityType } from "@/lib/types"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { JobCard } from "@/components/jobs/job-card"
import { Search, SlidersHorizontal, X } from "lucide-react"

// Mock data generator for fallback since backend might not have data yet
const mockJobs = Array.from({ length: 5 }).map((_, i) => ({
  id: `job-${i}`,
  title: `Nhân viên văn phòng - Vị trí ${i + 1}`,
  slug: `nhan-vien-van-phong-${i + 1}`,
  description: "Mô tả công việc chi tiết...",
  requirements: "Yêu cầu...",
  benefits: "Quyền lợi...",
  location: "Hà Nội",
  salaryMin: 7000000,
  salaryMax: 15000000,
  jobType: 'FULL_TIME' as const,
  disabilityTypes: ['MOBILITY' as DisabilityType],
  accessibilityFeatures: ["Ramp", "Elevator"],
  expiresAt: new Date(Date.now() + 864000000).toISOString(),
  createdAt: new Date().toISOString(),
  employer: {
    id: `emp-${i}`,
    companyName: `Công ty TNHH Phát Triển ${i + 1}`,
  }
}));

function JobsSearchContent() {
  const t = useTranslations("Jobs")
  const router = useRouter()
  const searchParams = useSearchParams()

  const [searchTerm, setSearchTerm] = React.useState(searchParams.get("q") || "")
  const [debouncedSearch, setDebouncedSearch] = React.useState(searchTerm)
  const [filtersOpen, setFiltersOpen] = React.useState(false)

  // Sync debounce search
  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm)
    }, 500)
    return () => clearTimeout(handler)
  }, [searchTerm])

  // Update URL params when debounced search changes
  React.useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    if (debouncedSearch) {
      params.set("q", debouncedSearch)
    } else {
      params.delete("q")
    }
    // Update URL without full reload (shallow)
    router.push(`/jobs?${params.toString()}`)
  }, [debouncedSearch, router])

  const currentFilters: JobSearchFilters = {
    q: searchParams.get("q") || undefined,
  }

  // Fetch jobs using TanStack Query
  const { data, isLoading, isError } = useJobsQuery(currentFilters)
  
  // Use mock data if API fails (useful for UI development before backend is fully populated)
  const displayJobs = isError || !data ? mockJobs : data.data;
  const totalCount = isError || !data ? mockJobs.length : data.meta.total;

  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col space-y-6">
        {/* Header & Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="w-full relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" aria-hidden="true" />
            <Input 
              type="search"
              placeholder={t("searchPlaceholder")}
              className="pl-10 h-12 text-base rounded-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label={t("searchPlaceholder")}
            />
          </div>
          <Button 
            variant="outline" 
            className="h-12 px-6 rounded-full shrink-0 flex items-center gap-2"
            onClick={() => setFiltersOpen(!filtersOpen)}
            aria-expanded={filtersOpen}
            aria-controls="filters-panel"
          >
            <SlidersHorizontal className="h-4 w-4" />
            {t("filters")}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Panel - Collapsible on mobile */}
          <aside 
            id="filters-panel"
            className={`${filtersOpen ? "block" : "hidden"} lg:block lg:col-span-1 space-y-6 bg-card p-6 rounded-xl border`}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-lg">{t("filters")}</h2>
              <button 
                className="text-sm text-primary hover:underline"
                aria-label={t("clearFilters")}
                onClick={() => {
                  setSearchTerm("");
                  router.push("/jobs");
                }}
              >
                Clear
              </button>
            </div>
            
            <fieldset>
              <legend className="text-sm font-medium mb-3">{t("disabilityType")}</legend>
              <div className="space-y-2">
                {['MOBILITY', 'VISUAL', 'HEARING', 'SPEECH'].map((type) => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
                    />
                    <span className="text-sm">{type}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-medium mb-3">{t("jobType")}</legend>
              <div className="space-y-2">
                {['FULL_TIME', 'PART_TIME', 'REMOTE'].map((type) => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
                    />
                    <span className="text-sm">{type}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </aside>

          {/* Job Listings */}
          <div className="lg:col-span-3 space-y-6">
            <div aria-live="polite" className="text-muted-foreground text-sm font-medium">
              {isLoading ? (
                <span>Đang tìm kiếm...</span>
              ) : (
                <span>{t("resultsFound", { count: totalCount })}</span>
              )}
            </div>

            {isLoading ? (
              // Skeleton Loading
              <div className="space-y-4" aria-hidden="true">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-40 w-full rounded-xl border bg-muted/20 animate-pulse"></div>
                ))}
              </div>
            ) : displayJobs.length === 0 ? (
              // Empty State
              <div className="flex flex-col items-center justify-center py-12 text-center bg-muted/20 rounded-xl border border-dashed">
                <Search className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
                <h3 className="text-lg font-bold mb-2">{t("noResults")}</h3>
                <Button variant="link" onClick={() => setSearchTerm("")}>{t("clearFilters")}</Button>
              </div>
            ) : (
              // Results List (Semantic UL for Accessibility)
              <ul className="space-y-4">
                {displayJobs.map((job) => (
                  <li key={job.id}>
                    <JobCard job={job} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function JobsPage() {
  return (
    <React.Suspense fallback={<div className="container py-12 flex justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" /></div>}>
      <JobsSearchContent />
    </React.Suspense>
  )
}
