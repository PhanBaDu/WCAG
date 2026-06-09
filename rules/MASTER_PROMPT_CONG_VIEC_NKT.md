# 🏗️ MASTER PROMPT — Cổng Thông Tin Việc Làm Cho Người Khuyết Tật
> **Stack:** NestJS · Next.js 14 (App Router) · TanStack Query v5 · TailwindCSS · PostgreSQL · Prisma ORM  
> **Tiêu chuẩn:** WCAG 2.2 Level AA  
> **Cuộc thi:** Thiết kế website/ứng dụng số đảm bảo tiêu chuẩn WCAG 2.2 — Humanity & Inclusion / EU

---

## I. TỔNG QUAN DỰ ÁN

Xây dựng một cổng thông tin việc làm dành riêng cho người khuyết tật (NKT) tại Việt Nam. Hệ thống kết nối NKT tìm việc với nhà tuyển dụng (NTD) thân thiện với người khuyết tật, đồng thời đảm bảo khả năng tiếp cận số theo chuẩn quốc tế WCAG 2.2 Level AA toàn diện.

### Tech Stack chi tiết
```
Backend:
  - NestJS 10+ (TypeScript, Modular Architecture)
  - Prisma ORM + PostgreSQL 15+
  - Passport.js (JWT + Refresh Token)
  - BullMQ (Queue cho email/notification)
  - Nodemailer / SendGrid
  - Multer + AWS S3 / Cloudflare R2 (file upload)
  - Swagger/OpenAPI (auto-generated docs)
  - class-validator + class-transformer (DTO validation)
  - Winston (logging)

Frontend:
  - Next.js 14 App Router (TypeScript)
  - TanStack Query v5 (server state)
  - TanStack Table v8 (data tables)
  - TailwindCSS 3+ (utility-first styling)
  - Radix UI (headless, accessible primitives)
  - React Hook Form + Zod (form validation)
  - next-themes (dark mode)
  - next-i18next (vi/en internationalization)
  - Framer Motion (accessible animations)

Database:
  - PostgreSQL 15+
  - Full-text search (pg_trgm, tsvector)
  - UUID primary keys
  - Soft delete pattern

Infrastructure:
  - Docker + Docker Compose
  - GitHub Actions CI/CD
  - Nginx reverse proxy
```

### 4 Actors
| Actor | Mô tả |
|---|---|
| **NKT** | Người khuyết tật tìm việc — người dùng chính, cần hỗ trợ accessibility tối đa |
| **NTD** | Nhà tuyển dụng — đăng tin, tìm kiếm ứng viên phù hợp |
| **ADM** | Quản trị viên — kiểm duyệt, quản lý toàn hệ thống |
| **SYS** | Hệ thống thông báo tự động — email, push notification |

---

## II. DATABASE SCHEMA (PostgreSQL + Prisma)

```prisma
// schema.prisma

// ─── ENUMS ───
enum Role { NKT NTD ADMIN }
enum DisabilityType { 
  VISUAL HEARING MOBILITY COGNITIVE SPEECH MENTAL CHRONIC_ILLNESS OTHER 
}
enum JobStatus { DRAFT PENDING ACTIVE CLOSED REJECTED }
enum ApplicationStatus { 
  SUBMITTED REVIEWING INTERVIEWED OFFERED REJECTED WITHDRAWN 
}
enum NotificationType { 
  JOB_MATCH APPLICATION_STATUS PROFILE_REMINDER SYSTEM 
}

// ─── USERS ───
model User {
  id            String    @id @default(uuid())
  email         String    @unique
  passwordHash  String
  role          Role
  isActive      Boolean   @default(true)
  isVerified    Boolean   @default(false)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  deletedAt     DateTime? // soft delete

  profile       NKTProfile?
  employer      Employer?
  sessions      Session[]
  notifications Notification[]
  auditLogs     AuditLog[]
}

model NKTProfile {
  id                String          @id @default(uuid())
  userId            String          @unique
  user              User            @relation(fields: [userId], references: [id])
  fullName          String
  phone             String?
  avatar            String?         // S3 URL
  dateOfBirth       DateTime?
  gender            String?
  address           String?
  province          String?
  district          String?
  
  // Disability info
  disabilityTypes   DisabilityType[]
  disabilityCert    String?         // URL to certificate
  supportNeeds      String[]        // accommodation requests
  
  // Professional
  summary           String?
  skills            String[]
  workExperience    WorkExperience[]
  education         Education[]
  cvUrl             String?         // uploaded CV file
  
  // Preferences
  expectedSalaryMin Int?
  expectedSalaryMax Int?
  jobTypes          String[]        // full-time, part-time, remote, etc.
  preferredIndustries String[]
  notificationPrefs Json            // notification settings
  
  searchVector      Unsupported("tsvector")?
  applications      Application[]
  savedJobs         SavedJob[]
  createdAt         DateTime        @default(now())
  updatedAt         DateTime        @updatedAt
}

model Employer {
  id              String    @id @default(uuid())
  userId          String    @unique
  user            User      @relation(fields: [userId], references: [id])
  companyName     String
  companyLogo     String?
  companySize     String?
  industry        String?
  website         String?
  description     String?
  address         String?
  province        String?
  isVerified      Boolean   @default(false)
  isDisabilityFriendly Boolean @default(false)
  accommodations  String[]  // accessibility features offered
  
  jobs            Job[]
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}

model Job {
  id              String      @id @default(uuid())
  employerId      String
  employer        Employer    @relation(fields: [employerId], references: [id])
  title           String
  slug            String      @unique
  description     String
  requirements    String?
  benefits        String?
  salaryMin       Int?
  salaryMax       Int?
  jobType         String[]    // full-time, part-time, remote, hybrid
  industry        String
  location        String?
  province        String?
  
  // Disability accommodation
  acceptedDisabilityTypes DisabilityType[]
  accommodationsOffered   String[]
  isDisabilityPriority    Boolean @default(false)
  
  status          JobStatus   @default(DRAFT)
  expiresAt       DateTime?
  viewCount       Int         @default(0)
  
  searchVector    Unsupported("tsvector")?
  applications    Application[]
  savedBy         SavedJob[]
  categories      JobCategory[]
  
  adminNote       String?     // rejection reason
  publishedAt     DateTime?
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
  deletedAt       DateTime?
}

model Application {
  id              String            @id @default(uuid())
  jobId           String
  job             Job               @relation(fields: [jobId], references: [id])
  nktProfileId    String
  nktProfile      NKTProfile        @relation(fields: [nktProfileId], references: [id])
  
  coverLetter     String?
  cvSnapshot      String?           // CV URL at time of application
  status          ApplicationStatus @default(SUBMITTED)
  employerNote    String?
  
  statusHistory   ApplicationStatusHistory[]
  createdAt       DateTime          @default(now())
  updatedAt       DateTime          @updatedAt
  
  @@unique([jobId, nktProfileId])
}

model Notification {
  id        String           @id @default(uuid())
  userId    String
  user      User             @relation(fields: [userId], references: [id])
  type      NotificationType
  title     String
  body      String
  data      Json?
  isRead    Boolean          @default(false)
  sentAt    DateTime         @default(now())
}

// ... (WorkExperience, Education, SavedJob, JobCategory, Session, AuditLog, AccessibilityReport)
```

---

## III. BACKEND — NESTJS MODULES & FEATURES

### Module Architecture
```
src/
├── auth/          # Xác thực & phân quyền
├── users/         # Quản lý user
├── nkt-profile/   # Hồ sơ NKT
├── employer/      # Hồ sơ nhà tuyển dụng
├── jobs/          # Tin tuyển dụng
├── applications/  # Đơn ứng tuyển
├── notifications/ # Thông báo
├── admin/         # Quản trị
├── reports/       # Báo cáo & thống kê
├── upload/        # File upload
├── search/        # Tìm kiếm full-text
└── accessibility/ # WCAG compliance logs
```

---

## IV. CHI TIẾT TỪNG FEATURE — RULES ĐẦY ĐỦ

---

### 🔐 MODULE 1: XÁC THỰC TÀI KHOẢN (AUTH)

#### UC01 — Đăng ký tài khoản

**Backend rules:**
```typescript
// DTO
class RegisterDto {
  @IsEmail()
  @Transform(toLowerCase)
  email: string;

  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)
  // Mật khẩu: ≥8 ký tự, có chữ hoa, thường, số, ký tự đặc biệt
  password: string;

  @IsIn(['NKT', 'NTD'])
  role: Role;

  @IsString()
  @MinLength(2)
  fullName: string;  // NKT only

  @IsString() @MinLength(2)
  companyName?: string;  // NTD only
}
```

**Business rules:**
- Email phải unique — kiểm tra trước khi tạo, trả 409 nếu trùng
- Password hash bằng `bcrypt` với salt rounds = 12
- Sau khi tạo user, gửi email xác thực (token JWT 24h, single-use)
- Email verification token lưu Redis hoặc DB, xóa sau khi dùng
- Nếu NKT: tạo `NKTProfile` rỗng liên kết
- Nếu NTD: tạo `Employer` rỗng liên kết, set `isVerified=false`
- Rate limit: 5 requests/IP/10 phút

**Frontend rules:**
- Form validation real-time với Zod + React Hook Form
- Password strength indicator (Weak / Medium / Strong)
- Confirm password field — blur validation
- Show/hide password toggle với `aria-label` thay đổi theo state
- Submit disabled cho đến khi form valid
- Loading state trên button khi submit
- Toast thành công: "Vui lòng kiểm tra email để xác thực tài khoản"

**WCAG 2.2 Rules:**
- `1.3.5` (AA): Các input `email`, `password`, `name` phải có `autocomplete` attribute đúng (`autocomplete="email"`, `autocomplete="new-password"`, `autocomplete="name"`)
- `1.4.3` (AA): Label text tương phản ≥ 4.5:1 với background
- `2.1.1` (A): Toàn bộ form navigate được bằng Tab/Shift+Tab
- `2.4.6` (AA): Label mô tả rõ mục đích (`for` attribute liên kết `id`)
- `3.3.1` (A): Thông báo lỗi validation hiển thị ngay cạnh field, không chỉ summary
- `3.3.2` (A): Mỗi field có label rõ ràng (không dùng placeholder thay label)
- `3.3.7` (A — mới WCAG 2.2): Không yêu cầu nhập lại thông tin đã cung cấp trong cùng session
- `3.3.8` (AA — mới WCAG 2.2): Xác thực email không dùng CAPTCHA dạng nhận thức khó — dùng magic link hoặc email OTP
- `4.1.3` (AA): Status message ("Đăng ký thành công") được announce qua `aria-live="polite"`

---

#### UC02 — Đăng nhập / xác thực

**Backend rules:**
```typescript
// Response
{
  accessToken: string;   // JWT, expires 15 phút
  refreshToken: string;  // JWT, expires 7 ngày, HttpOnly cookie
  user: { id, email, role, isVerified }
}
```

**Business rules:**
- So sánh email/password, trả 401 với message generic: "Email hoặc mật khẩu không đúng" (không phân biệt cái nào sai — security)
- Chặn đăng nhập nếu `isActive=false` → 403: "Tài khoản đã bị khóa"
- Chặn nếu `isVerified=false` → 403: "Vui lòng xác thực email trước"
- Rate limit: 5 lần thất bại/IP/15 phút → lock tạm thời, alert email
- Access Token: 15 phút, payload `{ sub, role, iat, exp }`
- Refresh Token: 7 ngày, lưu hash vào DB (`Session` table), rotate mỗi lần dùng
- `Session` record lưu: `userId, tokenHash, userAgent, ipAddress, expiresAt`
- Đăng nhập thành công: cập nhật `lastLoginAt`

**Frontend rules:**
- Redirect sau đăng nhập theo `role`: NKT → `/dashboard`, NTD → `/employer/dashboard`, ADM → `/admin`
- Nếu có `redirectTo` query param → redirect về trang cũ
- Remember me → refresh token 30 ngày thay vì 7 ngày
- TanStack Query: `useAuthQuery()` — cache user state, invalidate on logout

**WCAG 2.2 Rules:**
- `2.4.11` (AA — mới WCAG 2.2): Focus indicator khi Tab vào input/button phải có outline rõ ràng (min 2px, offset 2px, contrast ≥ 3:1)
- `3.3.1` (A): Lỗi đăng nhập hiển thị dưới form, kết hợp với `aria-describedby` vào input
- `3.3.4` (AA): Với thao tác có hậu quả pháp lý, cho phép review trước khi xác nhận — N/A ở login nhưng áp dụng cho thao tác xóa tài khoản
- Không tự động đăng xuất trong khi đang tương tác (2.2.1 AA)

---

#### UC03 — Khôi phục mật khẩu

**Backend rules:**
- POST `/auth/forgot-password` → nhận email, gửi link reset (JWT 1 giờ, single-use)
- Luôn trả 200 dù email không tồn tại (chống email enumeration attack)
- POST `/auth/reset-password` → nhận `token + newPassword`, validate token, update hash, xóa token, invalidate tất cả sessions
- Token lưu trong DB với `usedAt` field

**WCAG 2.2 Rules:**
- `3.3.4` (AA): Confirm new password field để tránh lỗi nhập nhầm
- `3.3.7` (A): Không yêu cầu nhập email lại nếu đã điền ở bước trước (pre-fill từ query param)

---

#### UC04 — Đăng xuất

**Backend rules:**
- DELETE `/auth/logout` → xóa Session record khỏi DB, clear HttpOnly cookie
- DELETE `/auth/logout-all` → xóa tất cả sessions của user (đăng xuất tất cả thiết bị)

**Frontend rules:**
- Clear TanStack Query cache: `queryClient.clear()`
- Redirect về `/login`
- Confirm dialog trước khi "Đăng xuất tất cả thiết bị"

---

### 🔍 MODULE 2: TÌM KIẾM & ỨNG TUYỂN

#### UC05 — Tìm kiếm việc làm theo dạng khuyết tật

**Backend rules:**
```typescript
// GET /jobs/search
class JobSearchDto {
  @IsOptional() @IsString()
  q?: string;                    // full-text keyword

  @IsOptional() @IsEnum(DisabilityType, { each: true })
  disabilityTypes?: DisabilityType[];  // filter: job chấp nhận loại KT này

  @IsOptional() @IsString()
  province?: string;

  @IsOptional() @IsString()
  industry?: string;

  @IsOptional() @IsIn(['full-time','part-time','remote','hybrid'], { each: true })
  jobTypes?: string[];

  @IsOptional() @IsInt() @Min(0)
  salaryMin?: number;

  @IsOptional() @IsInt()
  salaryMax?: number;

  @IsOptional() @IsBoolean()
  isDisabilityPriority?: boolean;

  @IsOptional() @IsIn(['relevance','date','salary'])
  sortBy?: string;

  @IsOptional() @IsIn(['asc','desc'])
  sortOrder?: string;

  @IsOptional() @IsInt() @Min(1)
  page?: number = 1;

  @IsOptional() @IsInt() @Min(1) @Max(50)
  limit?: number = 20;
}
```

**Business rules:**
- Full-text search: dùng `tsvector` trên `title + description + requirements`, cấu hình tiếng Việt `pg_trgm`
- Chỉ trả jobs có `status=ACTIVE` và `expiresAt > now()`
- Filter `disabilityTypes`: job có `acceptedDisabilityTypes` chứa ít nhất 1 type trong query
- Nếu NKT đã đăng nhập: ưu tiên (boost score) jobs match với `nktProfile.disabilityTypes`
- Nếu NKT đã đăng nhập: đánh dấu jobs đã ứng tuyển và đã lưu trong response
- Pagination: cursor-based hoặc offset-based, trả `{ data, total, page, limit, totalPages }`
- Increment `viewCount` async khi xem detail (fire-and-forget queue)

**Frontend rules:**
- URL-based search state: params lưu vào URL (`?q=lập+trình&province=HCM`)
- TanStack Query `useInfiniteQuery` hoặc paginated query
- Debounce input search 300ms trước khi call API
- Skeleton loading cho card list
- "Không tìm thấy kết quả" state với gợi ý mở rộng bộ lọc
- Preserve scroll position khi back từ job detail

**WCAG 2.2 Rules:**
- `1.3.1` (A): Kết quả tìm kiếm dùng `<ul>/<li>` semantic, không dùng `<div>` flat
- `1.4.3` (AA): Tất cả text trong job card có contrast ≥ 4.5:1
- `2.4.4` (A): Link "Xem chi tiết" phải có context rõ ràng — không dùng chỉ "Xem thêm", dùng "Xem chi tiết: [Tên việc làm]" (hoặc `aria-label`)
- `2.4.7` (AA): Focus visible trên mỗi job card khi navigate bằng keyboard
- `3.2.2` (A): Thay đổi filter không tự redirect/reload trang — chỉ update kết quả (progressive enhancement)
- `4.1.3` (AA): Số kết quả tìm thấy được announce qua `aria-live="polite"` sau khi search

---

#### UC06 — Lọc & sắp xếp kết quả

**Frontend rules:**
- Filter panel có thể collapse/expand (accessible disclosure pattern — `aria-expanded`, `aria-controls`)
- Các checkbox filter nhóm theo category, mỗi group có `<fieldset>` + `<legend>`
- Applied filters hiển thị dạng tag/chip có nút xóa (×), với `aria-label="Xóa bộ lọc: [tên filter]"`
- "Xóa tất cả bộ lọc" button khi có ≥1 filter active
- Sort dropdown dùng `<select>` native hoặc Radix Select (không custom div)

**WCAG 2.2 Rules:**
- `1.3.3` (A): Hướng dẫn không chỉ dựa vào vị trí/màu sắc ("bộ lọc bên trái") mà dùng label rõ
- `2.5.3` (A): Label của checkbox/radio match với visible text
- `3.2.3` (AA): Vị trí và thứ tự filter nhất quán trên tất cả các trang search

---

#### UC07 — Xem chi tiết tin tuyển dụng

**Backend rules:**
- GET `/jobs/:slug` → trả đầy đủ job detail + employer summary
- Nếu NKT đã login: kèm `{ isApplied, isSaved, matchScore }` trong response
- `matchScore`: tính % phù hợp giữa profile NKT và job requirements

**Frontend rules:**
- Page dùng Next.js `generateMetadata()` cho SEO + OpenGraph
- Structured data (JSON-LD `JobPosting`) cho SEO
- Section: Thông tin chung → Mô tả → Yêu cầu → Quyền lợi → Hỗ trợ người khuyết tật → Thông tin công ty
- Sticky "Apply CTA" button khi scroll (visible only on mobile)
- Related jobs section (TanStack Query)

**WCAG 2.2 Rules:**
- `1.3.1` (A): Dùng heading hierarchy đúng (`h1` tên job → `h2` các section) — không skip level
- `1.4.4` (AA): Font size cơ sở ≥ 16px, user có thể zoom 200% không vỡ layout
- `2.4.2` (A): `<title>` page = "[Tên việc làm] — [Tên công ty] | Cổng việc làm NKT"
- `2.4.3` (A): Focus order logic: header → content → sidebar → footer
- `3.1.1` (A): `<html lang="vi">` (toàn trang), inline EN terms dùng `<span lang="en">`

---

#### UC08 — Ứng tuyển việc làm

**Backend rules:**
```typescript
// POST /applications
class CreateApplicationDto {
  @IsUUID() jobId: string;
  @IsOptional() @IsString() @MaxLength(2000) coverLetter?: string;
  @IsOptional() @IsString() cvUrl?: string; // dùng CV từ profile hoặc upload mới
}
```

**Business rules:**
- Guard: user phải là NKT đã xác thực email, có profile
- Check job `status=ACTIVE` và chưa hết hạn
- Check chưa apply trùng (unique constraint), trả 409 nếu đã apply
- Tạo `Application` với `status=SUBMITTED`
- Tạo `ApplicationStatusHistory` record đầu tiên
- Trigger notification async (Queue): gửi email xác nhận cho NKT + notify NTD có đơn mới
- `include` trong UC02: phải đăng nhập trước mới apply

**Frontend rules:**
- Modal apply: chọn CV (từ profile hoặc upload mới) + cover letter optional
- Real-time character count cho cover letter (2000 ký tự max)
- Confirm dialog: "Xác nhận ứng tuyển vào vị trí [tên]?"
- Post-apply: nút "Ứng tuyển" → "Đã ứng tuyển" (disabled)
- Toast + redirect option về lịch sử ứng tuyển

**WCAG 2.2 Rules:**
- `2.5.7` (AA — mới WCAG 2.2): Thao tác kéo (drag CV upload) phải có alternative bằng click
- `3.3.1` (A): Validation lỗi upload file (sai định dạng, quá dung lượng) hiển thị rõ, announce qua `aria-live`
- `3.3.4` (AA): Trước khi submit: hiển thị summary đơn ứng tuyển, có thể sửa lại (review step)

---

#### UC09 — Lưu tin tuyển dụng yêu thích

**Backend rules:**
- POST `/saved-jobs` → `{ jobId }` — toggle (save nếu chưa, unsave nếu đã có)
- GET `/saved-jobs` → list pagination
- DELETE `/saved-jobs/:jobId`

**Frontend rules:**
- Bookmark icon trên mỗi job card, optimistic update (TanStack Query mutation)
- Tooltip: "Lưu việc làm" / "Bỏ lưu"

**WCAG 2.2 Rules:**
- `4.1.2` (A): Bookmark button có `aria-label` rõ: "Lưu [Tên việc làm]" và `aria-pressed` state

---

#### UC10 — Xem lịch sử ứng tuyển

**Backend rules:**
- GET `/applications/my` → pagination, filter by `status`
- TanStack Table: sort by `createdAt`, `status`, `jobTitle`

**Frontend rules:**
- TanStack Table v8 với accessible table markup (`<table>`, `<thead>`, `<th scope>`)
- Status badge với màu + icon (không chỉ màu)
- Timeline view cho từng application: các bước trạng thái

**WCAG 2.2 Rules:**
- `1.3.1` (A): Bảng lịch sử dùng `<table>` semantic với `<caption>`, `<th scope="col">`
- `1.4.1` (A): Status không truyền đạt chỉ bằng màu — có thêm text label và icon

---

### 📋 MODULE 3: QUẢN LÝ HỒ SƠ CÁ NHÂN (NKT)

#### UC11 — Tạo & cập nhật hồ sơ cá nhân

**Backend rules:**
```typescript
// PATCH /nkt-profile
class UpdateNKTProfileDto {
  @IsOptional() @IsString() @MinLength(2) fullName?: string;
  @IsOptional() @IsPhoneNumber('VN') phone?: string;
  @IsOptional() @IsDateString() dateOfBirth?: string;
  @IsOptional() @IsString() province?: string;
  @IsOptional() @IsString() summary?: string;
  @IsOptional() @IsArray() @IsString({ each: true }) skills?: string[];
  @IsOptional() @IsInt() @Min(0) expectedSalaryMin?: number;
  @IsOptional() @IsInt() expectedSalaryMax?: number;
  // ...
}
```

**Business rules:**
- Partial update: chỉ update các field được gửi lên
- Sau update: regenerate `searchVector` tsvector async
- Profile completion percentage: tính dựa trên số field đã điền
- Tối thiểu 60% completion mới được apply job

**Frontend rules:**
- Multi-step form: Thông tin cá nhân → Thông tin KT → Kỹ năng & kinh nghiệm → Sở thích nghề nghiệp
- Auto-save draft mỗi 30s (localStorage)
- Progress bar completion (visible, có aria-valuemin/max/now/label)
- Work Experience: dynamic array (thêm/xóa, drag-and-drop reorder)

**WCAG 2.2 Rules:**
- `1.3.5` (AA): Các input autocomplete: `name`, `tel`, `bday`, `address-level2`, `country`
- `2.4.12` (AA — mới WCAG 2.2): Focus không bị che khuất hoàn toàn bởi sticky header khi Tab
- `3.3.7` (A): Nếu user đã điền thông tin ở bước trước, không yêu cầu nhập lại
- `3.3.8` (AA): Không có CAPTCHA trong quá trình cập nhật hồ sơ

---

#### UC12 — Tải lên CV / hồ sơ

**Backend rules:**
```typescript
// POST /upload/cv (multipart/form-data)
// Allowed: PDF, DOC, DOCX — max 5MB
// Virus scan (ClamAV hoặc check file magic bytes)
// Store: S3/R2 với signed URL có TTL
// Return: { url, filename, size, mimeType }
```

**Business rules:**
- Validate: chỉ chấp nhận PDF, DOC, DOCX
- Max size: 5MB
- Đổi tên file thành UUID để tránh path traversal
- Lưu metadata vào DB
- Cũ CV file: giữ 90 ngày trước khi xóa khỏi S3

**Frontend rules:**
- Drag & drop zone + click to browse (Radix-based)
- Preview tên file + size sau khi chọn
- Upload progress bar
- Error messages: "Định dạng không hỗ trợ" / "File quá dung lượng 5MB"

**WCAG 2.2 Rules:**
- `2.5.7` (AA): Drag & drop có alternative bằng `<input type="file">` với keyboard
- `1.4.3` (AA): Text trong upload zone đủ contrast
- `3.3.1` (A): Error message khi upload lỗi phải programmatically associated với input

---

#### UC13 — Khai báo dạng khuyết tật & nhu cầu hỗ trợ

**Business rules:**
- Multi-select `DisabilityType` (có thể chọn nhiều)
- `supportNeeds`: text mô tả nhu cầu hỗ trợ cụ thể (500 ký tự)
- `disabilityCert`: upload giấy chứng nhận (PDF/JPG, max 2MB) — optional nhưng khuyến khích
- Thông tin này chỉ chia sẻ với NTD khi NKT apply, không public

**WCAG 2.2 Rules:**
- `1.3.3` (A): Checkbox không chỉ dùng icon màu để phân biệt — có label text đầy đủ
- `2.1.1` (A): Tất cả checkbox có thể chọn bằng Space key
- `3.1.3` (AAA — consider): Thuật ngữ y tế về dạng khuyết tật có tooltip giải thích

---

#### UC14 — Cài đặt thông báo việc làm phù hợp

**Backend rules:**
```typescript
// PATCH /nkt-profile/notification-prefs
{
  emailJobMatch: boolean;       // nhận email việc làm phù hợp
  emailApplicationUpdate: boolean;
  emailProfileReminder: boolean;
  frequency: 'daily' | 'weekly' | 'realtime';
  matchCriteria: {
    disabilityTypes: boolean;   // match theo loại KT
    province: boolean;
    industry: boolean;
    salary: boolean;
  }
}
```

**WCAG 2.2 Rules:**
- `2.2.3` (AAA — consider): Không có deadline/time limit trong notification settings
- Toggle switches dùng `role="switch"` với `aria-checked`

---

### 🏢 MODULE 4: NHÀ TUYỂN DỤNG

#### UC15 — Đăng tin tuyển dụng

**Backend rules:**
```typescript
// POST /jobs
class CreateJobDto {
  @IsString() @MinLength(5) @MaxLength(200) title: string;
  @IsString() @MinLength(50) @MaxLength(10000) description: string;
  @IsString() industry: string;
  @IsArray() @IsIn(['full-time','part-time','remote','hybrid'], { each: true }) jobTypes: string[];
  @IsOptional() @IsInt() @Min(0) salaryMin?: number;
  @IsOptional() @IsInt() salaryMax?: number;
  @IsOptional() @IsString() province?: string;
  @IsArray() @IsEnum(DisabilityType, { each: true }) acceptedDisabilityTypes: DisabilityType[];
  @IsArray() @IsString({ each: true }) accommodationsOffered: string[];
  @IsBoolean() isDisabilityPriority: boolean;
  @IsOptional() @IsDateString() expiresAt?: string;
}
```

**Business rules:**
- Guard: user phải là NTD, `employer.isVerified` (hoặc pending review)
- Sau tạo: status = `PENDING`, gửi notification đến ADM
- NTD có thể save `DRAFT` trước, chuyển sang `PENDING` khi ready
- Slug: auto-generate từ title + nanoid, unique
- `expiresAt` tối đa 90 ngày từ ngày đăng
- Tối thiểu phải có ≥1 `acceptedDisabilityTypes` (đây là portal NKT)
- `extend` sang UC21: admin phải duyệt

**Frontend rules:**
- Rich text editor cho `description` (TipTap — accessible WYSIWYG)
- TipTap config: disable float/position (WCAG 1.4.10 reflow)
- Preview mode trước khi submit
- Autosave draft

**WCAG 2.2 Rules:**
- `1.3.1` (A): Rich text editor output dùng semantic HTML (heading, list, paragraph — không inline style)
- `2.1.1` (A): TipTap editor fully keyboard navigable (toolbar shortcuts documented)

---

#### UC16 — Quản lý tin tuyển dụng (sửa / xóa / đóng)

**Business rules:**
- Chỉ sửa được nếu `status IN (DRAFT, ACTIVE)` — không sửa khi PENDING/REJECTED
- Đóng job: `status = CLOSED`, không nhận thêm đơn, nhưng existing applications vẫn giữ
- Soft delete: `deletedAt = now()`, không xóa vật lý
- Nếu sửa job ACTIVE: chuyển về PENDING, cần duyệt lại
- Khi đóng/xóa: bulk-update applications còn SUBMITTED → REJECTED, gửi notification

**Frontend rules:**
- Confirm modal trước khi đóng/xóa: "Hành động này không thể hoàn tác"
- Bảng quản lý dùng TanStack Table v8

---

#### UC17 — Xem hồ sơ ứng viên

**Business rules:**
- NTD chỉ xem được hồ sơ của NKT đã apply vào job của họ
- Thông tin nhạy cảm (email, phone) ẩn cho đến khi NTD "unlock" (nếu có cơ chế credit)
- Log lượt xem hồ sơ vào `AuditLog`

---

#### UC18 — Liên hệ ứng viên

**Backend rules:**
```typescript
// POST /applications/:id/contact
{
  channel: 'email' | 'message';
  subject: string;  // email only
  body: string;
}
```

**Business rules:**
- Chỉ liên hệ NKT đã apply vào job của NTD
- Rate limit: 10 lần liên hệ/ngày/NTD
- Lưu contact log
- Email gửi qua SYS (BullMQ queue), không expose email NKT trực tiếp nếu chưa unlock

---

#### UC19 — Quản lý hồ sơ công ty

**Business rules:**
- Upload logo: max 2MB, PNG/JPG/WebP, auto-resize về 400×400px
- `accommodations`: danh sách hỗ trợ NKT mà công ty cung cấp (ramp, screen reader software, flexible hours, etc.)
- Profile completion ảnh hưởng ranking job

**WCAG 2.2 Rules:**
- Logo image có `alt` text = tên công ty
- `1.1.1` (A): Tất cả hình ảnh công ty có alt text mô tả

---

#### UC20 — Đánh dấu & phân loại ứng viên

**Backend rules:**
```typescript
// PATCH /applications/:id/status
{
  status: ApplicationStatus;
  employerNote?: string;  // max 500 chars
}
```

**Business rules:**
- Mỗi lần thay đổi status: tạo `ApplicationStatusHistory` record
- Trigger notification: gửi email/push cho NKT khi status thay đổi
- NTD có thể thêm private note (không visible với NKT)

---

### ⚙️ MODULE 5: QUẢN TRỊ HỆ THỐNG (ADMIN)

#### UC21 — Duyệt / từ chối tin tuyển dụng

**Backend rules:**
```typescript
// PATCH /admin/jobs/:id/review
{
  action: 'APPROVE' | 'REJECT';
  note?: string;  // required nếu REJECT
}
```

**Business rules:**
- APPROVE: `status = ACTIVE`, `publishedAt = now()`
- REJECT: `status = REJECTED`, `adminNote` = lý do, gửi email cho NTD kèm lý do
- Notification realtime cho NTD (WebSocket hoặc polling)
- Dashboard: Queue jobs pending review (sorted by `createdAt` ASC — FIFO)

---

#### UC22 — Quản lý tài khoản người dùng

**Business rules:**
- Tìm kiếm user by: email, name, role, status, createdAt
- Actions: Kích hoạt / Khóa (`isActive`) / Xóa (soft) / Gửi email xác thực lại
- Bulk actions với confirmation
- Không thể tự khóa chính account đang login
- Audit log tất cả hành động admin

---

#### UC23 — Kiểm duyệt nội dung vi phạm

**Business rules:**
- Report queue: NKT/NTD có thể report job/profile vi phạm
- Admin review report: `DISMISS` / `WARN` / `REMOVE_CONTENT` / `BAN_USER`
- Auto-flag: nội dung có từ khóa blacklist (configurable)

---

#### UC24 — Quản lý danh mục ngành nghề

**Business rules:**
- CRUD danh mục ngành nghề (tree structure: ngành → chuyên ngành)
- Soft delete: nếu có job đang dùng category, chỉ ẩn (không xóa vật lý)
- Seed data: 20+ ngành nghề phổ biến phù hợp NKT (IT, kế toán, dịch thuật, thủ công, etc.)

---

#### UC25 — Cấu hình & kiểm tra WCAG compliance

**Backend rules:**
```typescript
// POST /admin/accessibility/scan
// Chạy axe-core headless scan (Playwright) theo schedule
// Lưu kết quả vào AccessibilityReport table:
{
  url: string;
  scannedAt: DateTime;
  violations: Json;    // axe-core violations array
  passes: number;
  score: number;       // 0-100
}
```

**Business rules:**
- Tự động scan 1 lần/ngày (cron job)
- Alert admin nếu score < 80
- Dashboard: trend chart violations theo thời gian
- Export báo cáo WCAG (ACR — Accessibility Conformance Report)

**WCAG 2.2 Rules — đây là feature đặc thù của project cuộc thi:**
- Lưu evidence tuân thủ để nộp hồ sơ cuộc thi
- Có thể export VPAT (Voluntary Product Accessibility Template)

---

#### UC26 — Quản lý nội dung trang chủ

**Business rules:**
- CMS đơn giản: Banner, Hero text, Featured jobs (manual pick), Testimonials từ NKT
- Rich text editor (TipTap) với accessible output
- Preview trước khi publish

---

#### UC27 — Xem & xuất log hệ thống

**Business rules:**
- Xem audit log: action, actor, target, timestamp, IP, userAgent
- Filter: by user, by action type, by date range
- Export CSV/Excel
- Retention: 90 ngày

---

### 🔔 MODULE 6: THÔNG BÁO TỰ ĐỘNG (BullMQ)

#### UC28 — Gửi email việc làm phù hợp

**Backend rules:**
- Cron job: chạy hàng ngày 8:00 sáng hoặc theo preference `frequency`
- Algorithm matching:
  ```
  score = (disabilityMatch * 0.4) + (provinceMatch * 0.2) 
        + (industryMatch * 0.2) + (salaryMatch * 0.2)
  ```
- Chỉ gửi nếu có ≥1 job mới match score ≥ 60% kể từ email trước
- Email template: danh sách ≤5 jobs, CTA button "Xem việc làm"
- Unsubscribe link bắt buộc (CAN-SPAM compliance)

**WCAG 2.2 Rules cho email template:**
- `1.4.3`: Text trong email đủ contrast (không rely vào CSS ngoài)
- `1.1.1`: Tất cả hình ảnh trong email có alt text
- `2.1.1`: Email plain-text fallback (multipart/alternative)
- Link text mô tả rõ ("Xem việc làm: [Tên vị trí]" — không "Click here")

---

#### UC29 — Thông báo trạng thái đơn ứng tuyển

**Business rules:**
- Trigger: mỗi khi `ApplicationStatus` thay đổi
- Kênh: Email + In-app notification (Notification table + WebSocket push)
- Template theo từng status transition:
  - SUBMITTED → REVIEWING: "NTD đang xem xét đơn của bạn"
  - REVIEWING → INTERVIEWED: "Bạn được mời phỏng vấn"
  - INTERVIEWED → OFFERED: "Chúc mừng! Bạn nhận được offer"
  - → REJECTED: "Đơn ứng tuyển không được chọn, đừng nản lòng!"

---

#### UC30 — Nhắc nhở cập nhật hồ sơ

**Business rules:**
- Trigger: NKT không login ≥ 30 ngày, hoặc profile completion < 60%
- Rate limit: max 1 lần/tuần/user
- Có thể unsubscribe từ loại notification này riêng

---

### 📊 MODULE 7: BÁO CÁO & THỐNG KÊ

#### UC31 — Xem thống kê tổng quan (Admin Dashboard)

**Metrics:**
```typescript
{
  users: { total, nkt, ntd, newThisMonth, activeThisMonth }
  jobs: { total, active, pending, closedThisMonth }
  applications: { total, thisMonth, byStatus: Record<ApplicationStatus, number> }
  accessibility: { currentScore, trend, openViolations }
  topProvinces: Array<{ province, jobCount }>
  topIndustries: Array<{ industry, jobCount }>
  disabilityBreakdown: Array<{ type, count }>
}
```

**Frontend rules:**
- Charts: Recharts (accessible — screen reader friendly, `aria-label` trên SVG)
- Date range picker: last 7/30/90 days, custom range
- Số liệu realtime: polling mỗi 5 phút (không WebSocket để giảm tải)

**WCAG 2.2 Rules:**
- `1.1.1` (A): Mọi chart có `aria-label` mô tả + data table alternative toggle
- `1.4.1` (A): Chart lines/bars không phân biệt chỉ bằng màu — dùng pattern fill hoặc label trực tiếp

---

#### UC32 — Xuất báo cáo tuyển dụng

**Business rules:**
- Export format: Excel (xlsx), CSV, PDF
- Chọn date range, filter theo province/industry
- Async export với BullMQ: notify khi xong, download link 1 giờ

---

#### UC33 — Thống kê WCAG compliance

**Business rules:**
- Timeline chart violations theo tuần/tháng
- Breakdown by WCAG criterion (1.1.1, 1.4.3, 2.1.1, etc.)
- Trạng thái mỗi criterion: PASS / FAIL / WARN
- Export VPAT/ACR để nộp cuộc thi

---

## V. GLOBAL WCAG 2.2 IMPLEMENTATION RULES

### 5.1 Layout & Navigation
```tsx
// Skip navigation link — BẮT BUỘC, hidden by default, visible on focus
<a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:text-white focus:p-4 focus:rounded">
  Bỏ qua đến nội dung chính
</a>

// Landmark regions
<header role="banner">
<nav role="navigation" aria-label="Điều hướng chính">
<main id="main-content" role="main">
<aside role="complementary">
<footer role="contentinfo">
```

### 5.2 Focus Management
```tsx
// WCAG 2.4.11 (AA): Focus indicator — Tailwind config
// focusRing: outline-2 outline-offset-2 outline-primary — min 2px width
// Contrast focus ring vs background ≥ 3:1

// WCAG 2.4.12 (AA): Focus not obscured
// Sticky header height: padding-top trên main content = header height
// Kiểm tra: mọi focused element không bị sticky header che 1px nào
```

### 5.3 Color & Contrast
```
Text thường: contrast ≥ 4.5:1  (WCAG 1.4.3 AA)
Text lớn (≥18px/14px bold): contrast ≥ 3:1  (WCAG 1.4.3 AA)
UI components (border, icon): contrast ≥ 3:1  (WCAG 1.4.11 AA)
Focus indicator: contrast ≥ 3:1  (WCAG 2.4.11 AA)

Palette mẫu (đã kiểm tra):
  Primary: #1D4ED8 (blue-700) — trên white: 7.2:1 ✅
  Success: #15803D (green-700) — trên white: 5.9:1 ✅
  Error:   #DC2626 (red-600)   — trên white: 4.5:1 ✅
  Warning: #92400E (amber-800) — trên white: 7.0:1 ✅ (không dùng yellow text)
  Gray text: #374151 (gray-700) — trên white: 10.7:1 ✅
```

### 5.4 Images & Icons
```tsx
// Informative image
<img src="..." alt="Mô tả nội dung hình ảnh" />

// Decorative image  
<img src="..." alt="" role="presentation" />

// Icon + text (icon là decorative)
<button>
  <SearchIcon aria-hidden="true" />
  <span>Tìm kiếm</span>
</button>

// Icon-only button (không có text)
<button aria-label="Tìm kiếm việc làm">
  <SearchIcon aria-hidden="true" />
</button>
```

### 5.5 Forms
```tsx
// ĐÚNG: Label liên kết rõ ràng
<div>
  <label htmlFor="email">Email <span aria-hidden="true">*</span>
    <span className="sr-only">(bắt buộc)</span>
  </label>
  <input 
    id="email" 
    type="email" 
    autoComplete="email"
    aria-required="true"
    aria-describedby="email-error"
  />
  <p id="email-error" role="alert" aria-live="assertive">
    {errors.email?.message}
  </p>
</div>

// SAI: Placeholder thay label
<input placeholder="Nhập email..." />
```

### 5.6 Dynamic Content
```tsx
// Toast / status messages
<div aria-live="polite" aria-atomic="true">
  {/* Thêm message vào đây */}
</div>

// Loading state
<div aria-busy="true" aria-label="Đang tải danh sách việc làm...">
  <Skeleton />
</div>

// Error state
<div role="alert" aria-live="assertive">
  Đã xảy ra lỗi. Vui lòng thử lại.
</div>
```

### 5.7 Responsive & Reflow (WCAG 1.4.10 AA)
```css
/* Không có horizontal scrollbar ở 320px width */
/* Tất cả content accessible ở 400% zoom */
/* Không dùng fixed pixel width trên container chính */
/* min-width: 0 trên flex/grid children */
```

### 5.8 Motion & Animation (WCAG 2.3.3 AAA / 2.2.2 A)
```tsx
// Respect prefers-reduced-motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Tailwind: motion-safe: prefix
className="transition-all duration-300 motion-reduce:transition-none"

// Framer Motion
const variants = {
  initial: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
  animate: { opacity: 1, y: 0 }
}
```

### 5.9 Language
```tsx
// _app.tsx / layout.tsx
<html lang="vi">

// Tiếng Anh inline
<span lang="en">WCAG</span>
<abbr title="Web Content Accessibility Guidelines" lang="en">WCAG</abbr>
```

### 5.10 Target Size (WCAG 2.5.8 AA — mới WCAG 2.2)
```
Tất cả interactive elements: min 24×24px (CSS target size)
Buttons, links chính: min 44×44px (khuyến nghị)
Spacing giữa các targets nhỏ: min 24px tính theo offset
```

---

## VI. API DESIGN CONVENTIONS

```
Base URL: /api/v1

Authentication:
  Authorization: Bearer <accessToken>
  Refresh: POST /auth/refresh (với cookie refreshToken)

Response envelope:
{
  success: boolean,
  data: T | null,
  message: string,
  errors?: Record<string, string[]>,  // validation errors
  meta?: { page, limit, total, totalPages }  // pagination
}

HTTP Status codes:
  200 OK — thành công
  201 Created — tạo mới
  204 No Content — xóa/update không có body
  400 Bad Request — validation error
  401 Unauthorized — chưa login / token hết hạn
  403 Forbidden — không có quyền
  404 Not Found
  409 Conflict — duplicate (email, application)
  422 Unprocessable Entity — business logic error
  429 Too Many Requests — rate limit
  500 Internal Server Error
```

---

## VII. SECURITY REQUIREMENTS

```
Authentication:
  - JWT RS256 (asymmetric) cho production
  - Refresh token rotation (detect reuse attack)
  - HttpOnly, Secure, SameSite=Strict cho cookie

Input:
  - All DTOs validated với class-validator
  - SQL injection: Prisma ORM parameterized queries
  - XSS: sanitize HTML từ rich text editor (DOMPurify trên client, sanitize-html trên server)
  - File upload: validate magic bytes, không chỉ extension

API:
  - Rate limiting: nestjs-throttler
  - CORS: whitelist allowed origins
  - Helmet.js: security headers
  - Request size limit: 10MB global, 5MB file endpoints

WCAG security intersection:
  - Session timeout warning (WCAG 2.2.6 AAA): warn 2 phút trước khi expire
  - Re-authentication không mất dữ liệu đã nhập (WCAG 2.2.5 AAA — consider)
```

---

## VIII. TESTING REQUIREMENTS

### Accessibility Testing
```bash
# Automated (phát hiện 30-50% lỗi)
npx axe-cli http://localhost:3000 --tags wcag2a,wcag2aa,wcag22aa
npm run test:a11y  # Jest + @testing-library/jest-dom + jest-axe

# Manual checklist:
□ Keyboard-only navigation toàn bộ app
□ NVDA + Chrome (Windows)
□ VoiceOver + Safari (macOS/iOS)  
□ TalkBack + Chrome (Android)
□ Zoom 200% và 400% — không horizontal scroll
□ Windows High Contrast Mode
□ prefers-reduced-motion ON
□ prefers-color-scheme: dark

# Color contrast tool:
□ WebAIM Contrast Checker
□ Chrome DevTools (Accessibility tab)
```

### Unit + Integration Tests
```
Backend: Jest + Supertest
Frontend: Vitest + React Testing Library
E2E: Playwright (với accessibility assertions)
Coverage target: ≥ 80%
```

---

## IX. PROJECT STRUCTURE

```
/
├── backend/                    # NestJS
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── users/
│   │   │   ├── nkt-profile/
│   │   │   ├── employer/
│   │   │   ├── jobs/
│   │   │   ├── applications/
│   │   │   ├── notifications/
│   │   │   ├── admin/
│   │   │   ├── reports/
│   │   │   └── accessibility/
│   │   ├── common/
│   │   │   ├── decorators/
│   │   │   ├── filters/        # Exception filters
│   │   │   ├── guards/         # Auth, Role guards
│   │   │   ├── interceptors/
│   │   │   └── pipes/
│   │   ├── prisma/
│   │   └── config/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── migrations/
│   │   └── seed.ts
│   └── test/
│
├── frontend/                   # Next.js
│   ├── app/
│   │   ├── (public)/           # No auth required
│   │   │   ├── page.tsx        # Home
│   │   │   ├── jobs/
│   │   │   └── employers/
│   │   ├── (auth)/             # Login/Register pages
│   │   ├── (nkt)/              # NKT dashboard (auth required)
│   │   ├── (employer)/         # NTD dashboard (auth required)
│   │   └── (admin)/            # Admin panel (auth + role required)
│   ├── components/
│   │   ├── ui/                 # Radix-based accessible components
│   │   ├── jobs/
│   │   ├── profile/
│   │   └── shared/
│   ├── hooks/
│   │   ├── queries/            # TanStack Query hooks
│   │   └── mutations/
│   ├── lib/
│   │   ├── api.ts              # API client (fetch wrapper)
│   │   └── auth.ts
│   └── types/
│
└── docker-compose.yml
```

---

## X. CHECKLIST WCAG 2.2 LEVEL AA — PER FEATURE

| Criterion | Level | Feature scope | Implementation |
|---|---|---|---|
| 1.1.1 Non-text Content | A | Tất cả images, icons, charts | `alt` text, `aria-label`, `role="presentation"` |
| 1.3.1 Info & Relationships | A | Forms, tables, lists | Semantic HTML, ARIA landmarks |
| 1.3.2 Meaningful Sequence | A | Toàn app | DOM order = visual order |
| 1.3.3 Sensory Characteristics | A | Hướng dẫn, filter | Không chỉ dùng vị trí/màu/hình dạng |
| 1.3.4 Orientation | AA | Toàn app | Không lock orientation |
| 1.3.5 Identify Input Purpose | AA | Tất cả forms | `autocomplete` attributes |
| 1.4.1 Use of Color | A | Status badges, charts | Màu + text + icon |
| 1.4.2 Audio Control | A | N/A (no autoplay audio) | - |
| 1.4.3 Contrast (Minimum) | AA | Toàn app text | Ratio ≥ 4.5:1 |
| 1.4.4 Resize Text | AA | Toàn app | 200% zoom, không overflow |
| 1.4.5 Images of Text | AA | Toàn app | Không dùng image thay text |
| 1.4.10 Reflow | AA | Toàn app | Responsive, 320px no h-scroll |
| 1.4.11 Non-text Contrast | AA | Buttons, inputs, icons | Ratio ≥ 3:1 |
| 1.4.12 Text Spacing | AA | Toàn app | CSS không override spacing |
| 1.4.13 Content on Hover/Focus | AA | Tooltips, dropdowns | Dismissable, hoverable, persistent |
| 2.1.1 Keyboard | A | Toàn app | Full keyboard navigation |
| 2.1.2 No Keyboard Trap | A | Modals, dropdowns | Focus trap escape với Esc |
| 2.1.4 Character Key Shortcuts | A | N/A | - |
| 2.2.1 Timing Adjustable | A | Session timeout | Warning + extend option |
| 2.3.1 Three Flashes | A | Toàn app | Không animation nhấp nháy > 3/s |
| 2.4.1 Bypass Blocks | A | Toàn app | Skip nav link |
| 2.4.2 Page Titled | A | Tất cả pages | Unique, descriptive `<title>` |
| 2.4.3 Focus Order | A | Toàn app | Logical DOM order |
| 2.4.4 Link Purpose | A | Tất cả links | Descriptive link text / aria-label |
| 2.4.6 Headings and Labels | AA | Toàn app | Descriptive headings |
| 2.4.7 Focus Visible | AA | Toàn app | Visible focus ring |
| 2.4.11 Focus Not Obscured | AA *(2.2)* | Sticky header | Focus not fully hidden |
| 2.4.12 Focus Not Obscured (Enhanced) | AA *(2.2)* | Sticky header | No part obscured |
| 2.5.3 Label in Name | A | Buttons, inputs | Accessible name ⊇ visible label |
| 2.5.7 Dragging Movements | AA *(2.2)* | Upload, reorder | Single pointer alternative |
| 2.5.8 Target Size | AA *(2.2)* | Buttons, links | Min 24×24px |
| 3.1.1 Language of Page | A | Toàn app | `<html lang="vi">` |
| 3.1.2 Language of Parts | AA | EN terms | `<span lang="en">` |
| 3.2.1 On Focus | A | Toàn app | Focus không trigger context change |
| 3.2.2 On Input | A | Filters, selects | Input không auto-navigate |
| 3.2.3 Consistent Navigation | AA | Toàn app | Nav nhất quán mọi trang |
| 3.2.4 Consistent Identification | AA | Toàn app | Same function = same label |
| 3.3.1 Error Identification | A | Tất cả forms | Field-level error + aria-describedby |
| 3.3.2 Labels or Instructions | A | Tất cả forms | Visible label cho mọi input |
| 3.3.3 Error Suggestion | AA | Tất cả forms | Gợi ý sửa lỗi cụ thể |
| 3.3.4 Error Prevention | AA | Apply, submit | Review + confirm step |
| 3.3.7 Redundant Entry | A *(2.2)* | Multi-step forms | Pre-fill, không nhập lại |
| 3.3.8 Accessible Authentication | AA *(2.2)* | Login, register | Không cognitive test CAPTCHA |
| 4.1.1 Parsing | A | Toàn app | Valid HTML (obsolete in 2.2 context) |
| 4.1.2 Name, Role, Value | A | Custom components | ARIA name/role/state đúng |
| 4.1.3 Status Messages | AA | Toast, live regions | `aria-live` announcements |

> Các tiêu chí đánh dấu *(2.2)* là mới trong WCAG 2.2

---

## XI. ENVIRONMENT VARIABLES

```env
# Backend
DATABASE_URL="postgresql://user:pass@localhost:5432/nkt_jobs"
JWT_SECRET=...
JWT_REFRESH_SECRET=...
REDIS_URL=redis://localhost:6379
AWS_S3_BUCKET=...
SENDGRID_API_KEY=...
FRONTEND_URL=http://localhost:3000
ADMIN_EMAIL=admin@example.com

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
NEXT_PUBLIC_APP_NAME="Cổng việc làm người khuyết tật"
```

---

*Prompt này bao gồm 33 use cases, 4 actors, đầy đủ business rules, DTO validation, WCAG 2.2 Level AA rules theo từng feature, accessibility implementation code, database schema, và project structure cho stack NestJS + Next.js + TanStack + TailwindCSS + PostgreSQL.*
