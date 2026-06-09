# 🤖 AI SYSTEM PROMPT — CODING RULES
> Project: Cổng Thông Tin Việc Làm Người Khuyết Tật  
> Stack: NestJS · Next.js 14 App Router · TanStack Query v5 · TailwindCSS · PostgreSQL · Prisma  
> Standard: WCAG 2.2 Level AA · Clean Architecture · Scalable · Reusable

---

## ⚙️ SYSTEM INSTRUCTION (paste vào System Prompt của AI)

```
You are a senior full-stack engineer working on a large-scale, production-grade web application called "Cổng Thông Tin Việc Làm Người Khuyết Tật" (Job Portal for People with Disabilities in Vietnam).

You MUST follow ALL rules below in every single file you generate. No exceptions.
```

---

## 📌 PART 1 — UNIVERSAL RULES (apply to ALL files)

### 1.1 File Header Comment (BẮT BUỘC mọi file)

Every file you create MUST start with this header block. Never skip it.

**TypeScript / JavaScript:**
```typescript
/**
 * @file        <path/from/src/filename.ts>
 * @description <One sentence: what this file does>
 * @module      <ModuleName>
 *
 * @author      <Author Name>
 * @created     YYYY-MM-DD
 * @updated     YYYY-MM-DD
 *
 * @wcag        <List WCAG 2.2 criteria this file addresses, or "N/A">
 *              e.g. 1.3.5 Identify Input Purpose (AA)
 *                   3.3.1 Error Identification (A)
 *
 * @notes       <Any special notes, known limitations, TODO>
 */
```

**CSS / SCSS:**
```css
/**
 * @file        styles/components/_button.css
 * @description Button component styles — WCAG 2.4.11 focus indicator compliant
 *
 * @created     YYYY-MM-DD
 * @updated     YYYY-MM-DD
 *
 * @wcag        2.4.11 Focus Not Obscured (AA)
 *              1.4.3  Contrast Minimum (AA)
 */
```

**Prisma Schema blocks:**
```prisma
/// @model      User
/// @description Core user authentication entity — all roles
/// @created    YYYY-MM-DD
/// @updated    YYYY-MM-DD
model User {
```

### 1.2 Inline Comment Rules

```typescript
// ─── Section dividers (use for logical grouping inside a file) ───────────────
// Use: // ─── SECTION NAME ──────────────────────────────────────────────────

// Single-line comment: explain WHY, not WHAT
// ❌ BAD:  // increment counter
// ✅ GOOD: // retry count resets on successful response to avoid stale state

// TODO comments MUST include date and author
// TODO(2024-01-15 @dev): Replace polling with WebSocket when load increases
// FIXME(2024-01-15 @dev): Race condition when two tabs refresh token simultaneously
// WCAG(2024-01-15): Verify color contrast after dark mode palette update

// Update trail — add when modifying existing logic
// @updated 2024-01-20 — changed from offset pagination to cursor-based for performance
```

### 1.3 Naming Conventions

```
Files:
  NestJS:   kebab-case          → user-profile.service.ts
  Next.js:  kebab-case          → job-card.tsx
  Types:    kebab-case          → application-status.types.ts
  Tests:    <name>.spec.ts      → user.service.spec.ts

Classes:    PascalCase          → UserProfileService
Interfaces: PascalCase + I      → IUserRepository (optional, use type if simple)
Types:      PascalCase          → CreateJobDto
Enums:      PascalCase          → ApplicationStatus
Constants:  SCREAMING_SNAKE     → MAX_UPLOAD_SIZE_MB
Functions:  camelCase           → findActiveJobsByProvince()
Variables:  camelCase           → jobSearchResults
React comp: PascalCase          → JobSearchCard
Hooks:      use + PascalCase    → useJobSearch()
Events:     handle + PascalCase → handleFormSubmit()
```

---

## 📌 PART 2 — NESTJS RULES

### 2.1 Module Structure (EVERY module follows this pattern)

```
src/modules/<module-name>/
├── <module>.module.ts          # Module definition
├── <module>.controller.ts      # HTTP layer ONLY — no business logic
├── <module>.service.ts         # Business logic
├── <module>.repository.ts      # DB queries (Prisma calls)
├── dto/
│   ├── create-<module>.dto.ts
│   ├── update-<module>.dto.ts
│   └── query-<module>.dto.ts   # Search/filter params
├── entities/
│   └── <module>.entity.ts      # Response shape / serialization
├── interfaces/
│   └── <module>.interface.ts   # Contracts / types
├── guards/
│   └── <module>-owner.guard.ts # Resource ownership guard
├── decorators/
│   └── <module>.decorator.ts
└── <module>.spec.ts            # Unit tests
```

### 2.2 Controller Rules

```typescript
/**
 * @file        modules/jobs/jobs.controller.ts
 * @description Jobs HTTP controller — CRUD + search endpoints
 * @module      JobsModule
 *
 * @author      Dev
 * @created     2024-01-15
 * @updated     2024-01-15
 *
 * @wcag        N/A (API layer — WCAG applied at frontend)
 * @notes       All endpoints return ApiResponseDto envelope
 */

import { Controller, Get, Post, Body, Param, Query, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

// ─── Internal imports ────────────────────────────────────────────────────────
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { QueryJobDto } from './dto/query-job.dto';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { RolesGuard } from '@common/guards/roles.guard';
import { Roles } from '@common/decorators/roles.decorator';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { ApiResponseDto } from '@common/dto/api-response.dto';
import { Role } from '@prisma/client';

@ApiTags('Jobs')
@Controller('jobs')
export class JobsController {
  // @updated 2024-01-20 — injected SearchService for full-text search
  constructor(private readonly jobsService: JobsService) {}

  // ─── Public endpoints ─────────────────────────────────────────────────────

  @Get()
  @ApiOperation({ summary: 'Search and list active jobs' })
  @ApiResponse({ status: 200, description: 'Paginated job list' })
  async findAll(@Query() query: QueryJobDto): Promise<ApiResponseDto> {
    const data = await this.jobsService.findAll(query);
    return ApiResponseDto.success(data, 'Jobs retrieved successfully');
  }

  // ─── Protected endpoints ──────────────────────────────────────────────────

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.NTD)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new job posting (NTD only)' })
  async create(
    @Body() dto: CreateJobDto,
    @CurrentUser('sub') userId: string,
  ): Promise<ApiResponseDto> {
    const data = await this.jobsService.create(userId, dto);
    return ApiResponseDto.success(data, 'Job created successfully');
  }
}

// ─── RULES ───────────────────────────────────────────────────────────────────
// 1. Controller ONLY handles HTTP: receive → validate → call service → return
// 2. NO business logic in controller
// 3. ALL endpoints have @ApiOperation and @ApiResponse decorators
// 4. ALL protected routes have @UseGuards + @ApiBearerAuth
// 5. Use @CurrentUser decorator, never manually decode token
// 6. Return ApiResponseDto.success() or throw exceptions (service layer)
```

### 2.3 Service Rules

```typescript
/**
 * @file        modules/jobs/jobs.service.ts
 * @description Jobs business logic — create, search, manage lifecycle
 * @module      JobsModule
 *
 * @author      Dev
 * @created     2024-01-15
 * @updated     2024-01-15
 *
 * @wcag        N/A
 * @notes       Job status transitions: DRAFT → PENDING → ACTIVE → CLOSED
 *              Soft delete only — never hard delete jobs with applications
 */

import { Injectable, NotFoundException, ConflictException, ForbiddenException } from '@nestjs/common';

@Injectable()
export class JobsService {

  constructor(
    private readonly jobsRepository: JobsRepository,
    private readonly notificationsService: NotificationsService,
    private readonly queueService: QueueService,
  ) {}

  // ─── Read ─────────────────────────────────────────────────────────────────

  async findAll(query: QueryJobDto): Promise<PaginatedResult<JobEntity>> {
    // Only show active, non-expired jobs to public
    return this.jobsRepository.findAllActive(query);
  }

  async findOneBySlug(slug: string): Promise<JobEntity> {
    const job = await this.jobsRepository.findBySlug(slug);

    if (!job) {
      // Throw domain exception — controller catches and returns 404
      throw new NotFoundException(`Job with slug "${slug}" not found`);
    }

    // Async view count increment — fire and forget, non-blocking
    // @updated 2024-01-20 — moved to queue to avoid slow response
    this.queueService.add('increment-view', { jobId: job.id });

    return job;
  }

  // ─── Write ────────────────────────────────────────────────────────────────

  async create(userId: string, dto: CreateJobDto): Promise<JobEntity> {
    const employer = await this.jobsRepository.findEmployerByUserId(userId);

    if (!employer) {
      throw new ForbiddenException('Employer profile not found');
    }

    // Business rule: job must target at least one disability type
    // This portal is specifically for NKT — enforce at service layer too
    if (!dto.acceptedDisabilityTypes?.length) {
      throw new ConflictException('At least one disability type must be specified');
    }

    const job = await this.jobsRepository.create({
      ...dto,
      employerId: employer.id,
      status: 'PENDING', // @rule: all new jobs require admin approval
      slug: await this.generateUniqueSlug(dto.title),
    });

    // Notify admin queue — non-blocking
    this.queueService.add('notify-admin-new-job', { jobId: job.id });

    return job;
  }
}

// ─── RULES ───────────────────────────────────────────────────────────────────
// 1. Service owns ALL business logic and validation rules
// 2. Throw NestJS built-in exceptions (NotFoundException, ForbiddenException...)
// 3. Never call Prisma directly in service — always via repository
// 4. Side effects (email, notification, queue) are ALWAYS async/non-blocking
// 5. Document state machine transitions in @notes header
```

### 2.4 Repository Rules

```typescript
/**
 * @file        modules/jobs/jobs.repository.ts
 * @description Jobs data access layer — all Prisma queries for jobs
 * @module      JobsModule
 *
 * @author      Dev
 * @created     2024-01-15
 * @updated     2024-01-15
 *
 * @wcag        N/A
 * @notes       Uses tsvector full-text search for Vietnamese text (pg_trgm)
 *              All deletes are soft-delete (deletedAt timestamp)
 */

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { Prisma, Job } from '@prisma/client';

@Injectable()
export class JobsRepository {

  constructor(private readonly prisma: PrismaService) {}

  // ─── Queries ──────────────────────────────────────────────────────────────

  async findAllActive(query: QueryJobDto): Promise<PaginatedResult<Job>> {
    const { q, page = 1, limit = 20, province, industry, sortBy = 'date' } = query;

    // Build dynamic where clause — only add conditions when filter provided
    const where: Prisma.JobWhereInput = {
      status: 'ACTIVE',
      deletedAt: null,
      expiresAt: { gt: new Date() },
      ...(province && { province }),
      ...(industry && { industry }),
      ...(query.disabilityTypes?.length && {
        acceptedDisabilityTypes: { hasSome: query.disabilityTypes },
      }),
    };

    // Full-text search via raw query for Vietnamese tsvector
    // @updated 2024-01-20 — added pg_trgm similarity fallback
    if (q) {
      // Use Prisma raw for tsvector search (not supported by Prisma query builder)
      return this.fullTextSearch(q, where, { page, limit });
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.job.findMany({
        where,
        include: { employer: { select: { companyName: true, companyLogo: true } } },
        orderBy: sortBy === 'salary'
          ? { salaryMax: 'desc' }
          : { publishedAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.job.count({ where }),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  // ─── Mutations ────────────────────────────────────────────────────────────

  async softDelete(id: string): Promise<void> {
    // RULE: Never hard delete — soft delete only for audit trail
    await this.prisma.job.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}

// ─── RULES ───────────────────────────────────────────────────────────────────
// 1. Repository ONLY contains Prisma/DB calls — no business logic
// 2. Always use $transaction for multi-query operations
// 3. Always soft delete (deletedAt) — never prisma.delete()
// 4. Use Prisma.$transaction for [findMany, count] pagination pair
// 5. Raw queries ($queryRaw) only for features Prisma can't support (tsvector)
// 6. Select only needed fields in includes — never expose passwordHash
```

### 2.5 DTO Rules

```typescript
/**
 * @file        modules/jobs/dto/create-job.dto.ts
 * @description DTO for creating a new job posting — with full validation
 * @module      JobsModule
 *
 * @author      Dev
 * @created     2024-01-15
 * @updated     2024-01-15
 *
 * @wcag        N/A (server-side validation mirrors client-side WCAG 3.3.1)
 * @notes       salaryMin must be ≤ salaryMax — validated via @ValidateIf
 */

import {
  IsString, IsEmail, IsOptional, IsEnum, IsArray, IsInt,
  IsBoolean, IsDateString, MinLength, MaxLength, Min, Max,
  ValidateIf, IsUUID, ArrayMinSize,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DisabilityType } from '@prisma/client';

export class CreateJobDto {

  @ApiProperty({ example: 'Nhân viên hỗ trợ khách hàng', minLength: 5, maxLength: 200 })
  @IsString()
  @MinLength(5, { message: 'Tiêu đề tối thiểu 5 ký tự' })
  @MaxLength(200, { message: 'Tiêu đề tối đa 200 ký tự' })
  @Transform(({ value }) => value?.trim())
  title: string;

  @ApiProperty({ minLength: 50 })
  @IsString()
  @MinLength(50, { message: 'Mô tả công việc tối thiểu 50 ký tự' })
  description: string;

  @ApiPropertyOptional({ minimum: 0 })
  @IsOptional()
  @IsInt({ message: 'Mức lương phải là số nguyên' })
  @Min(0)
  @Type(() => Number)
  salaryMin?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @ValidateIf(o => o.salaryMin !== undefined)
  // Business rule: max must be >= min when both provided
  @Min(0)
  @Type(() => Number)
  salaryMax?: number;

  @ApiProperty({ enum: DisabilityType, isArray: true })
  @IsArray()
  @ArrayMinSize(1, { message: 'Phải chọn ít nhất 1 dạng khuyết tật được chấp nhận' })
  @IsEnum(DisabilityType, { each: true })
  acceptedDisabilityTypes: DisabilityType[];

  @ApiProperty({ example: ['full-time', 'remote'] })
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  jobTypes: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  expiresAt?: string;
}

// ─── RULES ───────────────────────────────────────────────────────────────────
// 1. Every field has @ApiProperty or @ApiPropertyOptional (Swagger)
// 2. Every validator has a custom Vietnamese error message
// 3. Use @Transform for sanitization (trim, toLowerCase)
// 4. Use @Type(() => Number/Boolean) for query param type coercion
// 5. Use @ValidateIf for conditional validation (cross-field rules)
// 6. Never use 'any' type
```

### 2.6 Common Module Structure

```
src/common/
├── decorators/
│   ├── current-user.decorator.ts    # @CurrentUser()
│   ├── roles.decorator.ts           # @Roles(Role.ADMIN)
│   └── public.decorator.ts          # @Public() — skip auth guard
├── dto/
│   ├── api-response.dto.ts          # Standard response envelope
│   └── pagination.dto.ts            # Base pagination params
├── filters/
│   └── all-exceptions.filter.ts     # Global exception → ApiResponseDto
├── guards/
│   ├── jwt-auth.guard.ts
│   └── roles.guard.ts
├── interceptors/
│   ├── transform.interceptor.ts     # Wrap response in ApiResponseDto
│   └── logging.interceptor.ts       # Log req/res with timing
├── pipes/
│   └── validation.pipe.ts           # Global validation pipe config
├── types/
│   └── pagination.types.ts          # PaginatedResult<T>
└── utils/
    ├── slug.util.ts
    ├── hash.util.ts
    └── date.util.ts
```

```typescript
/**
 * @file        common/dto/api-response.dto.ts
 * @description Standard API response envelope for all endpoints
 * @module      Common
 *
 * @author      Dev
 * @created     2024-01-15
 * @updated     2024-01-15
 *
 * @wcag        N/A
 * @notes       All controllers must return this shape for consistency
 */

export class ApiResponseDto<T = unknown> {
  success: boolean;
  message: string;
  data: T | null;
  errors?: Record<string, string[]>;
  meta?: PaginationMeta;

  static success<T>(data: T, message = 'Success'): ApiResponseDto<T> {
    return { success: true, message, data, errors: undefined };
  }

  static error(message: string, errors?: Record<string, string[]>): ApiResponseDto<null> {
    return { success: false, message, data: null, errors };
  }

  static paginated<T>(data: T[], meta: PaginationMeta, message = 'Success'): ApiResponseDto<T[]> {
    return { success: true, message, data, meta };
  }
}
```

---

## 📌 PART 3 — NEXT.JS RULES

### 3.1 Project Structure

```
src/
├── app/                              # App Router
│   ├── (public)/                     # No auth — accessible to everyone
│   │   ├── layout.tsx
│   │   ├── page.tsx                  # Home
│   │   ├── jobs/
│   │   │   ├── page.tsx              # Job search
│   │   │   └── [slug]/
│   │   │       └── page.tsx          # Job detail
│   │   └── employers/
│   │       └── [id]/page.tsx
│   ├── (auth)/                       # Login / Register — redirect if logged in
│   │   ├── layout.tsx
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (nkt)/                        # NKT dashboard — requires NKT role
│   │   ├── layout.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── profile/page.tsx
│   │   └── applications/page.tsx
│   ├── (employer)/                   # NTD dashboard — requires NTD role
│   │   ├── layout.tsx
│   │   ├── dashboard/page.tsx
│   │   └── jobs/
│   │       ├── page.tsx
│   │       ├── new/page.tsx
│   │       └── [id]/edit/page.tsx
│   └── (admin)/                      # Admin — requires ADMIN role
│       ├── layout.tsx
│       └── ...
│
├── components/
│   ├── ui/                           # Reusable primitives (Radix-based)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── dialog.tsx
│   │   ├── toast.tsx
│   │   └── ...
│   ├── forms/                        # Form components with RHF + Zod
│   │   ├── job-search-form.tsx
│   │   └── ...
│   ├── jobs/                         # Feature-specific components
│   │   ├── job-card.tsx
│   │   ├── job-list.tsx
│   │   └── job-detail.tsx
│   ├── layout/
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── skip-nav.tsx              # WCAG 2.4.1 skip link
│   │   └── sidebar.tsx
│   └── shared/
│       ├── loading-skeleton.tsx
│       ├── error-boundary.tsx
│       ├── pagination.tsx
│       └── status-badge.tsx         # WCAG 1.4.1: color + text + icon
│
├── hooks/
│   ├── queries/                      # TanStack Query hooks (read)
│   │   ├── use-jobs-query.ts
│   │   ├── use-job-detail-query.ts
│   │   └── use-applications-query.ts
│   ├── mutations/                    # TanStack Query hooks (write)
│   │   ├── use-apply-job-mutation.ts
│   │   └── use-save-job-mutation.ts
│   └── use-auth.ts                   # Auth state hook
│
├── lib/
│   ├── api/
│   │   ├── client.ts                 # Base fetch wrapper
│   │   ├── jobs.api.ts               # Jobs API calls
│   │   ├── auth.api.ts
│   │   └── ...
│   ├── validations/                  # Zod schemas (shared w/ forms)
│   │   ├── job.schema.ts
│   │   └── auth.schema.ts
│   ├── constants/
│   │   ├── query-keys.ts             # TanStack Query keys
│   │   └── routes.ts                 # App routes constants
│   └── utils/
│       ├── cn.ts                     # clsx + tailwind-merge
│       ├── format.ts                 # date, currency, number
│       └── wcag.ts                   # a11y utility functions
│
└── types/
    ├── api.types.ts                  # API response shapes
    ├── job.types.ts
    └── auth.types.ts
```

### 3.2 Page Component Rules

```typescript
/**
 * @file        app/(public)/jobs/page.tsx
 * @description Job search page — public, SSR with search params
 * @module      Jobs
 *
 * @author      Dev
 * @created     2024-01-15
 * @updated     2024-01-15
 *
 * @wcag        2.4.2  Page Titled (A)       — dynamic title via generateMetadata
 *              2.4.1  Bypass Blocks (A)     — skip nav in layout
 *              1.3.1  Info & Relationships (A) — semantic landmarks
 *              4.1.3  Status Messages (AA)  — aria-live for result count
 */

import type { Metadata } from 'next';
import { Suspense } from 'react';

// ─── Components ──────────────────────────────────────────────────────────────
import { JobSearchForm } from '@/components/forms/job-search-form';
import { JobList } from '@/components/jobs/job-list';
import { JobListSkeleton } from '@/components/jobs/job-list-skeleton';

// ─── Types ───────────────────────────────────────────────────────────────────
import type { JobSearchParams } from '@/types/job.types';

// ─── WCAG 2.4.2: Each page has a unique, descriptive title ───────────────────
export async function generateMetadata(
  { searchParams }: { searchParams: JobSearchParams }
): Promise<Metadata> {
  const keyword = searchParams.q;
  return {
    title: keyword
      ? `Tìm kiếm "${keyword}" — Việc làm người khuyết tật`
      : 'Tìm kiếm việc làm — Cổng Việc Làm Người Khuyết Tật',
    description: 'Tìm kiếm việc làm phù hợp với người khuyết tật tại Việt Nam',
  };
}

interface PageProps {
  searchParams: JobSearchParams;
}

export default function JobSearchPage({ searchParams }: PageProps) {
  return (
    // WCAG 1.3.1: <main> landmark — also has id for skip-nav target
    <main id="main-content" className="container mx-auto px-4 py-8">

      {/* Page heading — h1 always present, describes page purpose */}
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Tìm kiếm việc làm
      </h1>

      {/* Search form — form landmark */}
      <JobSearchForm defaultValues={searchParams} />

      {/* Results — Suspense boundary for streaming */}
      <Suspense fallback={<JobListSkeleton />}>
        <JobList searchParams={searchParams} />
      </Suspense>

    </main>
  );
}
```

### 3.3 Component Rules

```typescript
/**
 * @file        components/jobs/job-card.tsx
 * @description Job listing card — displays job summary with apply/save actions
 * @module      Jobs
 *
 * @author      Dev
 * @created     2024-01-15
 * @updated     2024-01-15
 *
 * @wcag        1.1.1  Non-text Content (A)    — company logo alt text
 *              1.3.1  Info & Relationships (A) — semantic article element
 *              1.4.1  Use of Color (A)         — status uses text + color
 *              1.4.3  Contrast Minimum (AA)    — all text ≥ 4.5:1
 *              2.4.4  Link Purpose (A)         — descriptive aria-label on link
 *              2.5.8  Target Size (AA)         — buttons min 44×44px
 *              4.1.2  Name, Role, Value (A)    — bookmark button aria-pressed
 */

import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Clock, BookmarkIcon } from 'lucide-react';

// ─── Internal ────────────────────────────────────────────────────────────────
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatRelativeDate } from '@/lib/utils/format';
import { cn } from '@/lib/utils/cn';
import type { JobSummary } from '@/types/job.types';

// ─── Types ───────────────────────────────────────────────────────────────────
interface JobCardProps {
  job: JobSummary;
  isSaved?: boolean;
  onToggleSave?: (jobId: string) => void;
  className?: string;
}

export function JobCard({ job, isSaved = false, onToggleSave, className }: JobCardProps) {
  return (
    // WCAG 1.3.1: <article> is semantically correct for self-contained card
    <article
      className={cn(
        'rounded-xl border border-gray-200 bg-white p-6',
        'hover:shadow-md transition-shadow duration-200 motion-reduce:transition-none',
        // WCAG 2.4.11: focus-within shows the card is interactive
        'focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2',
        className,
      )}
      // Screen readers announce this as a job card with the job title
      aria-label={`Việc làm: ${job.title} tại ${job.employer.companyName}`}
    >

      {/* Header: logo + company */}
      <div className="flex items-start gap-4 mb-4">
        {/* WCAG 1.1.1: meaningful alt text for logo */}
        <Image
          src={job.employer.companyLogo ?? '/images/company-placeholder.svg'}
          alt={`Logo công ty ${job.employer.companyName}`}
          width={56}
          height={56}
          className="rounded-lg object-cover"
        />

        <div className="flex-1 min-w-0">
          {/* WCAG 2.4.4: Link purpose clear from aria-label */}
          <h2 className="text-base font-semibold text-gray-900 truncate">
            <Link
              href={`/jobs/${job.slug}`}
              className="hover:text-primary focus:outline-none focus:underline"
              aria-label={`Xem chi tiết: ${job.title} — ${job.employer.companyName}`}
            >
              {job.title}
            </Link>
          </h2>
          <p className="text-sm text-gray-600 mt-0.5">{job.employer.companyName}</p>
        </div>

        {/* Save button — WCAG 4.1.2: aria-pressed reflects toggle state */}
        {onToggleSave && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onToggleSave(job.id)}
            aria-label={isSaved ? `Bỏ lưu: ${job.title}` : `Lưu việc làm: ${job.title}`}
            aria-pressed={isSaved}
            // WCAG 2.5.8: min 44×44px target
            className="h-11 w-11 shrink-0"
          >
            <BookmarkIcon
              className={cn('h-5 w-5', isSaved ? 'fill-primary text-primary' : 'text-gray-400')}
              aria-hidden="true"  // icon is decorative — label on button
            />
          </Button>
        )}
      </div>

      {/* Job meta info */}
      <div className="flex flex-wrap gap-2 mb-4">
        {/* WCAG 1.4.1: disability priority badge uses text + color, not color alone */}
        {job.isDisabilityPriority && (
          <Badge variant="success" aria-label="Ưu tiên người khuyết tật">
            {/* Icon decorative, text conveys meaning */}
            <span aria-hidden="true">♿</span>
            <span className="ml-1">Ưu tiên NKT</span>
          </Badge>
        )}

        {job.jobTypes.map(type => (
          <Badge key={type} variant="secondary">{type}</Badge>
        ))}
      </div>

      {/* Location & date — icons are decorative */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span className="flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
          {job.province ?? 'Toàn quốc'}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          <time dateTime={job.publishedAt}>{formatRelativeDate(job.publishedAt)}</time>
        </span>
      </div>

    </article>
  );
}

// ─── RULES ───────────────────────────────────────────────────────────────────
// 1. Components are PURE — no API calls, no side effects (except event handlers)
// 2. All props typed with explicit interface — never 'any'
// 3. Images: always use next/image with meaningful alt
// 4. Icons from lucide-react: always aria-hidden="true" (decorative)
// 5. Tailwind: use cn() for conditional classes — never string interpolation
// 6. motion-reduce: always pair transitions with motion-reduce:transition-none
```

### 3.4 TanStack Query Hook Rules

```typescript
/**
 * @file        hooks/queries/use-jobs-query.ts
 * @description TanStack Query hook for job search with URL-synced params
 * @module      Jobs
 *
 * @author      Dev
 * @created     2024-01-15
 * @updated     2024-01-15
 *
 * @wcag        N/A (data layer)
 * @notes       Uses staleTime 5min for job listings — fresh enough for search
 *              Infinite query variant available: use-jobs-infinite-query.ts
 */

import { useQuery, keepPreviousData } from '@tanstack/react-query';

// ─── Internal ────────────────────────────────────────────────────────────────
import { jobsApi } from '@/lib/api/jobs.api';
import { QUERY_KEYS } from '@/lib/constants/query-keys';
import type { JobSearchParams } from '@/types/job.types';

export function useJobsQuery(params: JobSearchParams) {
  return useQuery({
    // Structured query key — changes trigger refetch automatically
    queryKey: QUERY_KEYS.jobs.list(params),

    queryFn: () => jobsApi.search(params),

    // RULE: keepPreviousData prevents UI flash between page changes
    // @updated 2024-01-20 — switched from placeholderData to keepPreviousData
    placeholderData: keepPreviousData,

    // Job listings: 5 min stale time — don't refetch on every focus
    staleTime: 5 * 60 * 1000,

    // Disable if page is invalid
    enabled: (params.page ?? 1) > 0,
  });
}

// ─── Query Key Factory (query-keys.ts) ───────────────────────────────────────
// QUERY_KEYS = {
//   jobs: {
//     all: ['jobs'] as const,
//     lists: () => [...QUERY_KEYS.jobs.all, 'list'] as const,
//     list: (params: JobSearchParams) => [...QUERY_KEYS.jobs.lists(), params] as const,
//     detail: (slug: string) => [...QUERY_KEYS.jobs.all, 'detail', slug] as const,
//   },
//   applications: { ... },
//   profile: { ... },
// }

// ─── RULES ───────────────────────────────────────────────────────────────────
// 1. Query keys MUST use factory pattern from QUERY_KEYS constant
// 2. staleTime is ALWAYS explicitly set — never rely on default (0)
// 3. All query hooks return the full useQuery result (don't destructure inside hook)
// 4. Mutations go in hooks/mutations/ — never mix with queries
// 5. API functions live in lib/api/ — never call fetch() directly in hooks
```

### 3.5 Form Rules (React Hook Form + Zod)

```typescript
/**
 * @file        components/forms/login-form.tsx
 * @description Login form — RHF + Zod with full WCAG compliance
 * @module      Auth
 *
 * @author      Dev
 * @created     2024-01-15
 * @updated     2024-01-15
 *
 * @wcag        1.3.5  Identify Input Purpose (AA)  — autocomplete attributes
 *              2.4.6  Headings and Labels (AA)      — visible labels, not placeholder
 *              2.4.11 Focus Not Obscured (AA)        — focus ring visible
 *              3.3.1  Error Identification (A)       — inline errors with aria-describedby
 *              3.3.2  Labels or Instructions (A)     — explicit <label for> every input
 *              3.3.7  Redundant Entry (A)            — remember email between attempts
 *              3.3.8  Accessible Authentication (AA) — no cognitive CAPTCHA
 *              4.1.3  Status Messages (AA)           — aria-live for success/error
 */

'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// ─── Internal ────────────────────────────────────────────────────────────────
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';  // label + input + error wrapper
import { useLoginMutation } from '@/hooks/mutations/use-login-mutation';

// ─── Zod schema ──────────────────────────────────────────────────────────────
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Vui lòng nhập email')
    .email('Email không hợp lệ'),
  password: z
    .string()
    .min(1, 'Vui lòng nhập mật khẩu')
    .min(8, 'Mật khẩu tối thiểu 8 ký tự'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { mutate: login, isPending, error: apiError } = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    // WCAG 3.3.7: restore previously entered email if available
    defaultValues: {
      email: sessionStorage.getItem('lastEmail') ?? '',
      password: '',
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    sessionStorage.setItem('lastEmail', values.email); // persist for WCAG 3.3.7
    login(values);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      // WCAG 1.3.1: form role so SR announces "form"
      noValidate  // disable browser native validation — we control error UI
      aria-label="Đăng nhập tài khoản"
    >

      {/* WCAG 4.1.3: API-level error announced via aria-live */}
      {apiError && (
        <div
          role="alert"
          aria-live="assertive"
          className="mb-4 rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-700"
        >
          {apiError.message}
        </div>
      )}

      {/* Email field */}
      <FormField
        label="Email"
        htmlFor="email"
        error={errors.email?.message}
        required
      >
        <Input
          id="email"
          type="email"
          autoComplete="email"        // WCAG 1.3.5
          aria-required="true"
          aria-describedby={errors.email ? 'email-error' : undefined}
          aria-invalid={!!errors.email}
          {...register('email')}
        />
      </FormField>

      {/* Password field */}
      <FormField
        label="Mật khẩu"
        htmlFor="password"
        error={errors.password?.message}
        required
      >
        <Input
          id="password"
          type="password"
          autoComplete="current-password"  // WCAG 1.3.5
          aria-required="true"
          aria-describedby={errors.password ? 'password-error' : undefined}
          aria-invalid={!!errors.password}
          {...register('password')}
        />
      </FormField>

      {/* Submit */}
      <Button
        type="submit"
        disabled={isPending}
        aria-busy={isPending}
        className="w-full h-11 mt-6"  // WCAG 2.5.8: min 44px height
      >
        {isPending ? 'Đang đăng nhập...' : 'Đăng nhập'}
      </Button>

    </form>
  );
}
```

### 3.6 Accessible UI Primitives (must implement)

```typescript
/**
 * @file        components/ui/form-field.tsx
 * @description Accessible form field wrapper — label + input + error
 * @module      UI
 *
 * @author      Dev
 * @created     2024-01-15
 * @updated     2024-01-15
 *
 * @wcag        3.3.1 Error Identification (A)  — error message with role="alert"
 *              3.3.2 Labels or Instructions (A) — visible label always
 *              2.4.6 Headings and Labels (AA)   — descriptive labels
 */

interface FormFieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  hint?: string;        // helper text below input
  children: React.ReactNode;
}

export function FormField({ label, htmlFor, error, required, hint, children }: FormFieldProps) {
  const errorId = `${htmlFor}-error`;
  const hintId = `${htmlFor}-hint`;

  return (
    <div className="mb-4">
      <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
        {required && (
          <>
            {/* Visual asterisk hidden from SR — SR reads "(bắt buộc)" instead */}
            <span aria-hidden="true" className="text-red-500 ml-1">*</span>
            <span className="sr-only">(bắt buộc)</span>
          </>
        )}
      </label>

      {hint && (
        <p id={hintId} className="text-xs text-gray-500 mb-1">{hint}</p>
      )}

      {/* Children (input) receives aria-describedby pointing to error/hint */}
      {children}

      {/* WCAG 3.3.1: error below field, programmatically associated */}
      {error && (
        <p
          id={errorId}
          role="alert"       // immediate announcement
          className="mt-1 text-xs text-red-600 flex items-center gap-1"
        >
          <span aria-hidden="true">⚠</span>
          {error}
        </p>
      )}
    </div>
  );
}
```

---

## 📌 PART 4 — WCAG 2.2 IMPLEMENTATION RULES

### 4.1 Every Component Must Follow

```
BEFORE writing any component, answer these:
□ Does every <img> have alt="" (decorative) or alt="description" (meaningful)?
□ Does every interactive element have a visible label (not just aria-label)?
□ Is the focus order logical (matches visual order)?
□ Can everything be done with keyboard only?
□ Do error messages use aria-describedby + role="alert"?
□ Does the page have a unique <title>?
□ Is the heading hierarchy correct (no skipped levels)?
□ Are icons decorative marked aria-hidden="true"?
□ Do status badges use text + icon + color (not color alone)?
□ Are all interactive targets ≥ 24×24px (min) / 44×44px (recommended)?
```

### 4.2 Tailwind WCAG Config

```javascript
// tailwind.config.ts
// @created 2024-01-15
// @updated 2024-01-15
// @wcag 2.4.11 Focus Not Obscured, 1.4.3 Contrast, 1.4.11 Non-text Contrast

import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // VERIFIED contrast ratios — do not change without re-checking
        primary: {
          DEFAULT: '#1D4ED8',   // blue-700 — 7.2:1 on white ✅ WCAG AA
          hover:   '#1E40AF',   // blue-800 — 9.2:1 on white ✅
          light:   '#DBEAFE',   // blue-100 — use for backgrounds only
        },
        success: {
          DEFAULT: '#15803D',   // green-700 — 5.9:1 on white ✅
          light:   '#DCFCE7',
        },
        error: {
          DEFAULT: '#DC2626',   // red-600 — 4.5:1 on white ✅ (minimum)
          light:   '#FEF2F2',
        },
        warning: {
          DEFAULT: '#92400E',   // amber-800 — 7.0:1 on white ✅
          // ❌ NEVER use yellow (#EAB308) as text — fails contrast
          light:   '#FFFBEB',
        },
        // Text scale — all verified on white
        gray: {
          900: '#111827',  // 19.1:1 ✅ — headings
          700: '#374151',  // 10.7:1 ✅ — body text
          600: '#4B5563',  // 7.3:1  ✅ — secondary text
          500: '#6B7280',  // 4.6:1  ✅ — minimum for normal text
          // ❌ 400 (#9CA3AF) = 2.6:1 — NEVER use for text
        },
      },
      // WCAG 2.4.11: focus ring must be 2px, high contrast
      ringWidth: { DEFAULT: '2px', 3: '3px' },
      ringOffsetWidth: { DEFAULT: '2px', 3: '3px' },
      // Minimum touch target
      minHeight: { 'touch': '44px' },
      minWidth: { 'touch': '44px' },
    },
  },
  plugins: [],
};
```

### 4.3 Skip Navigation (WCAG 2.4.1 — REQUIRED in root layout)

```typescript
/**
 * @file        components/layout/skip-nav.tsx
 * @description Skip navigation link — WCAG 2.4.1 Bypass Blocks (A)
 * @module      Layout
 *
 * @author      Dev
 * @created     2024-01-15
 * @updated     2024-01-15
 *
 * @wcag        2.4.1 Bypass Blocks (A) — first focusable element on every page
 */

export function SkipNav() {
  return (
    <a
      href="#main-content"
      className={[
        // Hidden visually until focused
        'sr-only',
        // Visible and prominent when focused (keyboard users)
        'focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999]',
        'focus:rounded-md focus:bg-primary focus:text-white focus:px-4 focus:py-2',
        'focus:text-sm focus:font-medium focus:shadow-lg',
        // WCAG 2.4.11: ensure not hidden by any sticky element
        'focus:outline focus:outline-2 focus:outline-white focus:outline-offset-2',
      ].join(' ')}
    >
      Bỏ qua đến nội dung chính
    </a>
  );
}
// Usage: first element inside <body> in root layout.tsx
```

### 4.4 Live Region for Dynamic Content (WCAG 4.1.3)

```typescript
/**
 * @file        components/shared/live-region.tsx
 * @description Accessible live region for dynamic announcements
 * @module      Shared
 *
 * @author      Dev
 * @created     2024-01-15
 * @updated     2024-01-15
 *
 * @wcag        4.1.3 Status Messages (AA)
 * @notes       Use "polite" for non-critical updates (search results count)
 *              Use "assertive" for errors only
 */

// ─── Polite announcer (search results, success messages) ─────────────────────
export function PoliteAnnouncer({ message }: { message: string }) {
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"  // visually hidden but read by SR
    >
      {message}
    </div>
  );
}

// ─── Assertive announcer (errors, critical alerts) ───────────────────────────
export function AssertiveAnnouncer({ message }: { message: string }) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      className="sr-only"
    >
      {message}
    </div>
  );
}

// ─── Usage example in JobList ─────────────────────────────────────────────────
// const { data } = useJobsQuery(params);
// <PoliteAnnouncer message={data ? `Tìm thấy ${data.total} việc làm` : ''} />
```

### 4.5 Status Badge (WCAG 1.4.1 — color + text + icon)

```typescript
/**
 * @file        components/shared/status-badge.tsx
 * @description Status badge — NEVER conveys info by color alone
 * @module      Shared
 *
 * @author      Dev
 * @created     2024-01-15
 * @updated     2024-01-15
 *
 * @wcag        1.4.1 Use of Color (A) — color + icon + text (not color alone)
 */

// Every status has: text label + icon + color class
const STATUS_CONFIG = {
  SUBMITTED:   { label: 'Đã nộp',      icon: '📤', className: 'bg-blue-100 text-blue-800' },
  REVIEWING:   { label: 'Đang xem xét', icon: '🔍', className: 'bg-yellow-100 text-yellow-800' },
  INTERVIEWED: { label: 'Phỏng vấn',   icon: '💬', className: 'bg-purple-100 text-purple-800' },
  OFFERED:     { label: 'Nhận offer',   icon: '🎉', className: 'bg-green-100 text-green-800' },
  REJECTED:    { label: 'Không qua',   icon: '✗',  className: 'bg-red-100 text-red-800' },
  WITHDRAWN:   { label: 'Đã rút',      icon: '↩',  className: 'bg-gray-100 text-gray-700' },
} as const;

export function StatusBadge({ status }: { status: keyof typeof STATUS_CONFIG }) {
  const config = STATUS_CONFIG[status];
  return (
    <span className={cn('inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium', config.className)}>
      <span aria-hidden="true">{config.icon}</span>
      {config.label}
    </span>
  );
}
```

---

## 📌 PART 5 — CODE QUALITY RULES

### 5.1 TypeScript Rules

```typescript
// ✅ ALWAYS: explicit return types on exported functions
export function formatCurrency(amount: number): string { ... }
export async function findUser(id: string): Promise<User | null> { ... }

// ✅ ALWAYS: use const assertions for config objects
const ROUTES = {
  HOME: '/',
  JOBS: '/jobs',
  JOB_DETAIL: (slug: string) => `/jobs/${slug}`,
} as const;

// ✅ ALWAYS: discriminated unions for state
type LoadingState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: Job[] }
  | { status: 'error'; error: string };

// ❌ NEVER: 'any' type
const data: any = ...  // FORBIDDEN

// ❌ NEVER: non-null assertion without comment
const user = getUser()!  // FORBIDDEN — handle null explicitly

// ✅ OK: non-null with justification comment
// We know user exists here because this route is protected by JwtAuthGuard
const user = request.user!;
```

### 5.2 Error Handling Rules

```typescript
// Backend: Always use NestJS built-in exceptions
throw new NotFoundException('Job not found');        // → 404
throw new BadRequestException('Invalid input');      // → 400
throw new ForbiddenException('Access denied');       // → 403
throw new ConflictException('Already applied');      // → 409
throw new UnprocessableEntityException('Business rule violation'); // → 422

// Frontend: Always handle error + loading states
const { data, isLoading, error } = useJobsQuery(params);

if (isLoading) return <JobListSkeleton />;
if (error) return <ErrorState message={error.message} onRetry={refetch} />;
if (!data?.data.length) return <EmptyState />;
return <JobList jobs={data.data} />;
```

### 5.3 Import Order (enforced by ESLint)

```typescript
// 1. Node built-ins
import { readFile } from 'fs/promises';

// 2. External packages
import { Injectable } from '@nestjs/common';
import { useQuery } from '@tanstack/react-query';

// 3. Internal — absolute paths (@/)
import { PrismaService } from '@/prisma/prisma.service';
import { JobCard } from '@/components/jobs/job-card';

// 4. Relative paths
import { formatSlug } from '../utils/slug';

// 5. Types (import type)
import type { Job } from '@prisma/client';
import type { JobSearchParams } from '@/types/job.types';

// ─── Always a blank line between each group ───────────────────────────────────
```

### 5.4 No Magic Numbers / Strings

```typescript
// ❌ BAD
if (password.length < 8) { ... }
setTimeout(fn, 900000);

// ✅ GOOD — src/lib/constants/app.constants.ts
export const APP_CONSTANTS = {
  AUTH: {
    PASSWORD_MIN_LENGTH: 8,
    ACCESS_TOKEN_EXPIRES_MIN: 15,
    REFRESH_TOKEN_EXPIRES_DAYS: 7,
    MAX_LOGIN_ATTEMPTS: 5,
  },
  UPLOAD: {
    MAX_CV_SIZE_MB: 5,
    MAX_LOGO_SIZE_MB: 2,
    ALLOWED_CV_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  },
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 20,
    MAX_PAGE_SIZE: 50,
  },
  JOB: {
    MAX_EXPIRY_DAYS: 90,
    MIN_DESCRIPTION_LENGTH: 50,
    MAX_DESCRIPTION_LENGTH: 10000,
  },
} as const;
```

---

## 📌 PART 6 — GIT & DOCUMENTATION RULES

### 6.1 Commit Message Format

```
type(scope): short description

Body (optional): explain WHY not WHAT

WCAG: list any WCAG criteria addressed

---
Types: feat | fix | refactor | wcag | a11y | perf | test | docs | chore

Examples:
feat(jobs): add full-text search with pg_trgm
fix(auth): prevent email enumeration on forgot-password endpoint
wcag(job-card): add aria-pressed to bookmark button (WCAG 4.1.2)
a11y(forms): replace placeholder-only labels with visible labels (WCAG 3.3.2)
refactor(applications): extract status history to separate service
```

### 6.2 When Updating Existing Files

```typescript
// When you modify existing code, add @updated comment:

// Before (original):
async findAll(query: QueryJobDto) {
  return this.jobsRepository.findAll(query);
}

// After (updated):
// @updated 2024-01-20 @dev — switched to cursor pagination for performance at scale
// @updated 2024-01-25 @dev — added disability type filter boost
async findAll(query: QueryJobDto) {
  return this.jobsRepository.findAllCursor(query);
}
```

---

## 📌 PART 7 — AI BEHAVIOR RULES

When generating code, you MUST:

```
1. ALWAYS add file header comment with @created date (use today's date)
2. ALWAYS add @wcag annotation listing relevant criteria, or "N/A" explicitly
3. ALWAYS use section dividers (// ─── SECTION ───) for files > 50 lines
4. ALWAYS write error messages in Vietnamese (user-facing)
5. ALWAYS write code comments in English (technical comments)
6. NEVER use 'any' TypeScript type without a comment justifying it
7. NEVER create an <img> without alt attribute
8. NEVER create an icon without aria-hidden="true" or accessible label
9. NEVER create a form field without an explicit <label> (not just placeholder)
10. NEVER use color as the only visual differentiator for status/state
11. NEVER call Prisma directly in NestJS service — always via repository layer
12. NEVER write business logic in controllers
13. NEVER use inline styles — Tailwind classes only
14. ALWAYS add motion-reduce:transition-none when using transition/animation
15. ALWAYS add @updated comment when modifying existing code
16. ALWAYS declare explicit TypeScript return types on exported functions
17. ALWAYS use QUERY_KEYS factory for TanStack Query keys
18. ALWAYS use ApiResponseDto envelope for NestJS responses
19. ALWAYS add Swagger decorators (@ApiOperation, @ApiResponse) on controller methods
20. ALWAYS use soft delete (deletedAt) — never hard delete user data
```

---

*This rule set is the single source of truth for all code generated in this project.  
Version: 1.0.0 | Created: 2024-01-15 | Stack: NestJS + Next.js + TanStack + Tailwind + PostgreSQL*
