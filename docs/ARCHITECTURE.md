# INVITATIONKAMI — TECHNICAL ARCHITECTURE BLUEPRINT

> **Status**: Approved  
> **Version**: 1.0  
> **Source of Truth**: MASTER_SPEC.md  
> **Target**: 2 Core CPU / 4 GB RAM / 30 GB SSD  

---

## 1. APPLICATION ARCHITECTURE

### Pattern: Modular Monolith

Single Next.js application serving as both frontend and backend. Internal code organized into domain modules with clear boundaries.

```text
┌─────────────────────────────────────────────────┐
│                    Next.js App                  │
│                                                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────────────┐│
│  │   Auth   │ │Invitation│ │  Theme Engine     ││
│  │  Module  │ │  Module  │ │    Module         ││
│  └──────────┘ └──────────┘ └──────────────────┘│
│  ┌──────────┐ ┌──────────┐ ┌──────────────────┐│
│  │  Guest   │ │ Storage  │ │  Public Render    ││
│  │  Module  │ │  Module  │ │    Module         ││
│  └──────────┘ └──────────┘ └──────────────────┘│
│                                                 │
│  ┌─────────────────────────────────────────────┐│
│  │         Shared / Core Layer                 ││
│  │   (DB Client, Auth Utils, Validation, etc.) ││
│  └─────────────────────────────────────────────┘│
└─────────────────────────────────────────────────┘
                        │
                   PostgreSQL
```

### Key Decision

| Concern | Decision | Rationale |
|---------|----------|-----------|
| Backend | Next.js API Routes + Server Actions | Spec says no separate backend |
| State | React Server Components + minimal client state | Resource efficient |
| ORM | Prisma | Spec requirement |
| Validation | Zod | Spec requirement |
| UI | shadcn/ui + Tailwind CSS | Spec requirement |

### Module Boundaries

Each module owns its own:
- Zod schemas (validation)
- Service functions (business logic)
- API routes / Server Actions
- Types

Modules communicate through **direct function imports**, not HTTP calls. This is a monolith — keep it simple.

```text
src/
└── modules/
    ├── auth/          # Authentication & user management
    ├── invitation/    # Invitation CRUD, wedding data
    ├── guest/         # Guest list, RSVP, guestbook
    ├── theme/         # Theme registry, rendering config
    ├── storage/       # File upload, image processing
    └── public/        # Public invitation rendering
```

---

## 2. PROJECT STRUCTURE

```text
wedding_project/
├── docs/
│   └── ARCHITECTURE.md          # This document
├── prisma/
│   ├── schema.prisma            # Single schema file
│   ├── migrations/              # Prisma migrations
│   └── seed.ts                  # Seed: themes, demo data
├── scripts/
│   ├── backup.sh                # pg_dump backup
│   └── restore.sh               # pg_restore
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── (auth)/              # Auth pages (login, register)
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (dashboard)/         # Customer dashboard (protected)
│   │   │   ├── dashboard/
│   │   │   ├── invitations/
│   │   │   │   └── [id]/
│   │   │   │       ├── editor/  # Sub-pages: couple, events, story, etc.
│   │   │   │       ├── guests/
│   │   │   │       ├── theme/
│   │   │   │       └── settings/
│   │   │   └── settings/
│   │   ├── (public)/            # Public invitation
│   │   │   └── i/
│   │   │       └── [slug]/
│   │   ├── api/                 # API routes (if needed)
│   │   │   └── v1/
│   │   │       ├── rsvp/
│   │   │       └── upload/
│   │   ├── layout.tsx
│   │   └── page.tsx             # Landing page
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── services/        # auth.service.ts
│   │   │   ├── schemas/         # auth.schema.ts (Zod)
│   │   │   └── types/
│   │   ├── invitation/
│   │   │   ├── services/        # invitation.service.ts
│   │   │   ├── schemas/
│   │   │   └── types/
│   │   ├── guest/
│   │   │   ├── services/
│   │   │   ├── schemas/
│   │   │   └── types/
│   │   ├── theme/
│   │   │   ├── registry/        # Theme registration & metadata
│   │   │   └── types/
│   │   ├── storage/
│   │   │   ├── services/        # storage.service.ts (abstraction)
│   │   │   ├── adapters/        # local.adapter.ts, s3.adapter.ts (future)
│   │   │   └── processors/      # image.processor.ts (sharp)
│   │   └── public/
│   │       └── services/        # public-invitation.service.ts
│   ├── components/
│   │   ├── ui/                  # shadcn/ui components
│   │   ├── dashboard/           # Dashboard-specific components
│   │   └── shared/              # Shared components
│   ├── themes/                  # Theme React components
│   │   ├── elegant/
│   │   │   ├── index.tsx        # Theme entry point
│   │   │   ├── sections/        # Opening, Hero, Couple, etc.
│   │   │   └── styles/
│   │   ├── modern/
│   │   ├── floral/
│   │   ├── luxury/
│   │   └── minimalist/
│   ├── lib/
│   │   ├── db.ts                # Prisma client singleton
│   │   ├── auth.ts              # Session helpers
│   │   ├── config.ts            # APP_NAME, APP_URL, etc.
│   │   └── utils.ts
│   └── middleware.ts            # Auth middleware, rate limiting
├── public/
│   └── uploads/                 # Local file storage (MVP)
├── docker-compose.yml
├── Dockerfile
├── nginx/
│   └── nginx.conf
├── .env.example
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
├── MASTER_SPEC.md
└── README.md
```

---

## 3. DATABASE ARCHITECTURE

### Prisma Schema

Single `schema.prisma` file. No multi-file splitting needed at this scale.

### Entity Relationship Diagram

```text
User (tenant owner)
 └── 1:N ──► Invitation
                ├── 1:N ──► Event
                ├── 1:N ──► GalleryItem
                ├── 1:N ──► LoveStory
                ├── 1:N ──► Guest
                │            └── 0:1 ──► Rsvp (embedded in Guest)
                ├── 1:N ──► GuestMessage
                ├── 1:N ──► WeddingGift
                └── N:1 ──► Theme (reference)

Theme (system-managed, shared)
Music (system-managed, shared)
```

### Core Schema Design

```prisma
// ─── TENANT ────────────────────────────────────────

model User {
  id            String       @id @default(cuid())
  email         String       @unique
  name          String
  passwordHash  String
  invitations   Invitation[]
  createdAt     DateTime     @default(now())
  updatedAt     DateTime     @updatedAt
}

// ─── WEDDING DATA ──────────────────────────────────

model Invitation {
  id            String       @id @default(cuid())
  userId        String
  user          User         @relation(fields: [userId], references: [id], onDelete: Cascade)

  // Slug & publish
  slug          String       @unique
  isPublished   Boolean      @default(false)

  // Couple
  groomName     String
  groomFullName String?
  groomFather   String?
  groomMother   String?
  groomPhoto    String?
  brideName     String
  brideFullName String?
  brideFather   String?
  brideMother   String?
  bridePhoto    String?

  // Appearance
  themeId       String
  theme         Theme        @relation(fields: [themeId], references: [id])
  colorPreset   String       @default("default")
  fontPreset    String       @default("default")
  animationIntensity String  @default("normal")

  // Music
  musicId       String?
  music         Music?       @relation(fields: [musicId], references: [id])

  // Section visibility (JSON column)
  sectionConfig Json         @default("{}")

  // Opening text overrides
  openingTitle  String?
  openingText   String?

  // Quote
  quote         String?
  quoteSource   String?

  // Relations
  events        Event[]
  gallery       GalleryItem[]
  loveStory     LoveStory[]
  guests        Guest[]
  guestMessages GuestMessage[]
  weddingGifts  WeddingGift[]

  createdAt     DateTime     @default(now())
  updatedAt     DateTime     @updatedAt

  @@index([userId])
  @@index([slug])
}

model Event {
  id            String       @id @default(cuid())
  invitationId  String
  invitation    Invitation   @relation(fields: [invitationId], references: [id], onDelete: Cascade)
  title         String
  date          DateTime
  startTime     String?
  endTime       String?
  venue         String
  address       String?
  mapUrl        String?
  order         Int          @default(0)
  createdAt     DateTime     @default(now())
  updatedAt     DateTime     @updatedAt

  @@index([invitationId])
}

model GalleryItem {
  id            String       @id @default(cuid())
  invitationId  String
  invitation    Invitation   @relation(fields: [invitationId], references: [id], onDelete: Cascade)
  imageUrl      String
  caption       String?
  order         Int          @default(0)
  createdAt     DateTime     @default(now())

  @@index([invitationId])
}

model LoveStory {
  id            String       @id @default(cuid())
  invitationId  String
  invitation    Invitation   @relation(fields: [invitationId], references: [id], onDelete: Cascade)
  title         String
  description   String
  date          String?
  imageUrl      String?
  order         Int          @default(0)
  createdAt     DateTime     @default(now())

  @@index([invitationId])
}

model Guest {
  id            String       @id @default(cuid())
  invitationId  String
  invitation    Invitation   @relation(fields: [invitationId], references: [id], onDelete: Cascade)
  name          String
  slug          String?
  phone         String?
  rsvpStatus    RsvpStatus   @default(PENDING)
  attendance    Int          @default(1)
  rsvpAt        DateTime?
  createdAt     DateTime     @default(now())
  updatedAt     DateTime     @updatedAt

  @@unique([invitationId, slug])
  @@index([invitationId])
}

enum RsvpStatus {
  PENDING
  ATTENDING
  NOT_ATTENDING
}

model GuestMessage {
  id            String       @id @default(cuid())
  invitationId  String
  invitation    Invitation   @relation(fields: [invitationId], references: [id], onDelete: Cascade)
  name          String
  message       String
  createdAt     DateTime     @default(now())

  @@index([invitationId])
}

model WeddingGift {
  id            String       @id @default(cuid())
  invitationId  String
  invitation    Invitation   @relation(fields: [invitationId], references: [id], onDelete: Cascade)
  type          GiftType
  bankName      String?
  accountNumber String?
  accountHolder String?
  address       String?
  notes         String?
  order         Int          @default(0)
  createdAt     DateTime     @default(now())

  @@index([invitationId])
}

enum GiftType {
  BANK_TRANSFER
  EWALLET
  SHIPPING_ADDRESS
}

// ─── SYSTEM DATA (shared, not tenant-owned) ────────

model Theme {
  id            String       @id @default(cuid())
  slug          String       @unique
  name          String
  description   String?
  thumbnail     String?
  category      String?
  colorPresets  Json         @default("[]")
  fontPresets   Json         @default("[]")
  isActive      Boolean      @default(true)
  isPremium     Boolean      @default(false)
  invitations   Invitation[]
  createdAt     DateTime     @default(now())
  updatedAt     DateTime     @updatedAt
}

model Music {
  id            String       @id @default(cuid())
  title         String
  artist        String?
  fileUrl       String
  category      String?
  isActive      Boolean      @default(true)
  invitations   Invitation[]
  createdAt     DateTime     @default(now())
}
```

### Future-Ready Tables (NOT implemented now)

Reserved for future phases — schema is designed so these can be added without breaking changes:

```text
Plan           → subscription tiers
Subscription   → user <-> plan binding
Order          → payment orders
Payment        → payment transactions
CustomDomain   → invitation custom domains
Analytics      → page views, clicks
```

### Key Database Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| ID strategy | `cuid()` | URL-safe, no enumeration, no SERIAL leaks |
| Tenant column | `userId` on Invitation | All child entities linked through Invitation |
| Section config | JSON column | Flexible, no schema migration for new sections |
| Soft delete | Not used | Unnecessary complexity for MVP |
| Timestamps | `createdAt` + `updatedAt` | Standard audit trail |
| Cascading | `onDelete: Cascade` | Invitation delete removes all child data |

---

## 4. PRISMA STRATEGY

### Client Singleton

```typescript
// src/lib/db.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query'] : [],
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

### Migration Strategy

- Use `prisma migrate dev` in development
- Use `prisma migrate deploy` in production (Docker entrypoint)
- Seed file for themes and music data

### Query Patterns

- Always include `WHERE userId = <sessionUserId>` in tenant-scoped queries
- Use `include` for related data instead of N+1 queries
- Use `select` to limit returned fields in list views

---

## 5. MULTI-TENANT ISOLATION

### Strategy: Row-Level Filtering (Application-Enforced)

No RLS, no separate schemas. All tenant isolation is enforced at the **service layer**.

```text
Every service function that touches tenant data:

1. Receives authenticated userId from session
2. Includes userId in WHERE clause
3. Verifies ownership before mutations
```

### Implementation Pattern

```typescript
// EVERY tenant-scoped query MUST follow this pattern:

async function getInvitation(invitationId: string, userId: string) {
  const invitation = await prisma.invitation.findFirst({
    where: {
      id: invitationId,
      userId: userId,  // ← MANDATORY tenant filter
    },
  })
  if (!invitation) throw new NotFoundError()
  return invitation
}

// Child entities go through invitation:
async function getEvents(invitationId: string, userId: string) {
  return prisma.event.findMany({
    where: {
      invitationId,
      invitation: { userId },  // ← MANDATORY tenant filter
    },
  })
}
```

### Rules

1. **Never trust client-provided IDs alone** — always pair with `userId` from session.
2. **No service function may omit `userId` filter** on tenant-scoped data.
3. **System data (Theme, Music) has no tenant filter** — it's shared.
4. **Public routes** (`/i/[slug]`) only return data where `isPublished = true`, with no user context needed.

---

## 6. AUTHENTICATION & AUTHORIZATION

### Auth Strategy: NextAuth.js (Auth.js v5) with Credentials Provider

| Aspect | Decision |
|--------|----------|
| Library | NextAuth.js v5 (`next-auth`) |
| Provider | Credentials (email + password) |
| Session strategy | JWT (stateless, no session table) |
| Password hashing | bcrypt |
| Session storage | HTTP-only cookie |

### Why Not

| Alternative | Why Skipped |
|-------------|-------------|
| Database sessions | Extra DB queries per request on constrained hardware |
| OAuth providers | Not in spec. Can be added later via NextAuth providers |
| Custom JWT | NextAuth handles token rotation, CSRF, cookie security |

### Authorization Flow

```text
Request
  ↓
middleware.ts — Check JWT cookie exists, redirect if not
  ↓
Server Component / Server Action — getServerSession()
  ↓
userId extracted from session
  ↓
Service function — userId passed as parameter
  ↓
Prisma query with userId filter
```

### Route Protection

```text
Public routes:
  /               (landing)
  /login
  /register
  /i/[slug]       (public invitation)
  /api/v1/rsvp    (public RSVP submit)

Protected routes:
  /dashboard/**
  /invitations/**
  /settings/**
  /api/v1/upload
```

### Middleware

```typescript
// src/middleware.ts
// Protect /dashboard, /invitations, /settings
// Redirect unauthenticated users to /login
// Rate limit on /api routes
```

---

## 7. THEME ENGINE ARCHITECTURE

### Core Principle: Data ≠ Design

```text
┌─────────────────┐     ┌───────────────┐     ┌──────────────────┐
│   Wedding Data  │  +  │  Theme Config │  =  │ Rendered Output  │
│   (from DB)     │     │  (component)  │     │ (public page)    │
└─────────────────┘     └───────────────┘     └──────────────────┘
```

### Theme as React Components

Each theme is a folder of React components under `src/themes/`.

```text
src/themes/
├── elegant/
│   ├── index.tsx            # ThemeComponent entry
│   ├── sections/
│   │   ├── Opening.tsx
│   │   ├── Hero.tsx
│   │   ├── Couple.tsx
│   │   ├── Quote.tsx
│   │   ├── Countdown.tsx
│   │   ├── Events.tsx
│   │   ├── Story.tsx
│   │   ├── Gallery.tsx
│   │   ├── Rsvp.tsx
│   │   ├── Guestbook.tsx
│   │   ├── Gift.tsx
│   │   ├── Location.tsx
│   │   └── Footer.tsx
│   └── styles/
│       └── elegant.css      # Theme-specific styles (if needed)
├── modern/
│   └── ...
└── ...
```

### Theme Contract (Interface)

All themes receive the **same data shape**. This is the contract:

```typescript
// src/modules/theme/types/theme-data.ts

export interface ThemeData {
  invitation: {
    slug: string
    groomName: string
    groomFullName?: string
    groomFather?: string
    groomMother?: string
    groomPhoto?: string
    brideName: string
    brideFullName?: string
    brideFather?: string
    brideMother?: string
    bridePhoto?: string
    openingTitle?: string
    openingText?: string
    quote?: string
    quoteSource?: string
    colorPreset: string
    fontPreset: string
    animationIntensity: string
    sectionConfig: SectionConfig
  }
  events: EventData[]
  gallery: GalleryData[]
  loveStory: LoveStoryData[]
  guestMessages: GuestMessageData[]
  weddingGifts: WeddingGiftData[]
  music?: MusicData
  guestName?: string          // From URL query param ?to=Name
}

export interface SectionConfig {
  opening: boolean
  hero: boolean
  couple: boolean
  quote: boolean
  countdown: boolean
  events: boolean
  story: boolean
  gallery: boolean
  rsvp: boolean
  guestbook: boolean
  gift: boolean
  location: boolean
  footer: boolean
}
```

### Theme Registry

```typescript
// src/modules/theme/registry/index.ts

import { lazy } from 'react'

export const themeRegistry: Record<string, ThemeRegistryEntry> = {
  elegant: {
    component: lazy(() => import('@/themes/elegant')),
    meta: { name: 'Elegant', category: 'classic' },
  },
  modern: {
    component: lazy(() => import('@/themes/modern')),
    meta: { name: 'Modern', category: 'modern' },
  },
  // ... more themes
}
```

### How to Add a New Theme

1. Create folder `src/themes/<name>/`
2. Implement all section components receiving `ThemeData`
3. Register in theme registry
4. Add DB record via seed or migration
5. **No business logic changes required**

### Theme Customization (stored per Invitation)

| Setting | Storage | Type |
|---------|---------|------|
| Theme selection | `themeId` FK | Reference |
| Color preset | `colorPreset` string | Enum-like per theme |
| Font preset | `fontPreset` string | Enum-like per theme |
| Animation intensity | `animationIntensity` | `"none"`, `"subtle"`, `"normal"`, `"dramatic"` |
| Section visibility | `sectionConfig` JSON | `{ hero: true, story: false, ... }` |

---

## 8. STORAGE ABSTRACTION

### Interface

```typescript
// src/modules/storage/services/storage.service.ts

export interface StorageAdapter {
  upload(file: Buffer, path: string, mimeType: string): Promise<string>
  delete(path: string): Promise<void>
  getUrl(path: string): string
}
```

### MVP Implementation: Local Storage

```typescript
// src/modules/storage/adapters/local.adapter.ts

export class LocalStorageAdapter implements StorageAdapter {
  private basePath = process.env.UPLOAD_DIR || './public/uploads'

  async upload(file: Buffer, path: string): Promise<string> {
    // Write to disk
    // Return public URL path
  }
}
```

### File Organization

```text
public/uploads/
└── invitations/
    └── {invitationId}/
        ├── groom.webp
        ├── bride.webp
        └── gallery/
            ├── 001.webp
            └── 002.webp
```

### Image Processing Pipeline (sharp)

```text
Upload
  ↓
Validate MIME type (allowlist: image/jpeg, image/png, image/webp)
  ↓
Validate file size (max 5 MB)
  ↓
Strip EXIF metadata
  ↓
Resize (max dimension per context: gallery 1200px, profile 600px)
  ↓
Convert to WebP (quality 80)
  ↓
Save processed version only
  ↓
Return URL path
```

### Blocked File Types

Hard-reject at validation layer:
```text
.exe, .php, .js, .ts, .sh, .bat, .cmd, .svg (unsafe),
.html, .htm, any executable MIME type
```

### Swap to S3/R2 Later

1. Implement `S3StorageAdapter` implementing `StorageAdapter`
2. Change `STORAGE_ADAPTER=s3` in env
3. No business logic changes

---

## 9. PUBLIC INVITATION RENDERING

### URL Structure

```text
GET /i/[slug]           → Full invitation
GET /i/[slug]?to=Name   → Personalized greeting
```

### Rendering Flow

```text
1. Next.js App Router: /i/[slug]/page.tsx (Server Component)
2. Query DB: findFirst where slug AND isPublished = true
3. Single query with includes (events, gallery, story, gifts, messages)
4. If not found → 404
5. If not published → 404
6. Resolve theme component from registry
7. Pass ThemeData to theme component
8. Theme renders all visible sections
9. Opening screen rendered on top (client component for interaction)
10. Client-side: click "Open" → hide opening, enable scroll, play music
```

### Single Query Strategy

One database query to fetch the entire invitation with all relations:

```typescript
const invitation = await prisma.invitation.findFirst({
  where: { slug, isPublished: true },
  include: {
    events: { orderBy: { order: 'asc' } },
    gallery: { orderBy: { order: 'asc' } },
    loveStory: { orderBy: { order: 'asc' } },
    guestMessages: { orderBy: { createdAt: 'desc' }, take: 50 },
    weddingGifts: { orderBy: { order: 'asc' } },
    theme: true,
    music: true,
  },
})
```

### Interactive Elements (Client Components)

These sections require client-side interactivity:

| Section | Why Client |
|---------|-----------|
| Opening | Click to open, animation |
| Countdown | Real-time timer |
| RSVP form | Form submission |
| Guestbook form | Form submission |
| Music player | Audio playback |
| Gallery | Lightbox, swipe |
| Copy gift info | Clipboard API |

Strategy: Server Component at page level, individual sections as Client Components where needed. This minimizes JS bundle.

---

## 10. PERFORMANCE STRATEGY

### Constraints Reminder

```text
2 Core CPU / 4 GB RAM / 30 GB SSD
Public invitations = most traffic
Dashboard = low traffic
```

### Rendering Strategy

| Route | Strategy |
|-------|----------|
| `/i/[slug]` | SSR with HTTP caching headers |
| `/dashboard/**` | SSR (dynamic, no cache) |
| `/` (landing) | Static (ISR or build-time) |

### Caching

**No Redis. Use HTTP-level caching only.**

```text
Public invitation pages:
  Cache-Control: public, s-maxage=60, stale-while-revalidate=300

Static assets (images, music):
  Cache-Control: public, max-age=31536000, immutable

Dashboard pages:
  Cache-Control: private, no-cache
```

Nginx handles caching for static assets. Next.js handles page-level cache headers.

### Database Optimization

1. **Indexes**: All FK columns indexed (defined in schema above)
2. **Single query per page**: Use `include` not separate queries
3. **Pagination**: Guest messages limited (take: 50 default)
4. **Connection pooling**: Prisma default pool (limited to ~5 connections for this hardware)

### Frontend Optimization

1. **Image optimization**: WebP conversion, responsive sizes via `next/image`
2. **Lazy loading**: Gallery images, below-fold sections
3. **Code splitting**: Theme components loaded via `dynamic()` / `lazy()`
4. **Font optimization**: `next/font` for Google Fonts, preload
5. **Bundle analysis**: Keep theme JS minimal, avoid heavy animation libraries

### Resource Budget

| Resource | Budget |
|----------|--------|
| PostgreSQL | ~512 MB RAM |
| Next.js | ~1.5 GB RAM |
| Nginx | ~64 MB RAM |
| OS + buffer | ~1.9 GB RAM |
| Disk: DB | ~2 GB |
| Disk: uploads | ~20 GB |
| Disk: app + OS | ~8 GB |

---

## 11. SECURITY ARCHITECTURE

### Defense Layers

```text
Layer 1: Nginx
  ├── Rate limiting (request/sec per IP)
  ├── Request size limit (10 MB max body)
  ├── Security headers (HSTS, X-Frame, X-Content-Type, etc.)
  └── Hide server version

Layer 2: Next.js Middleware
  ├── Authentication check (JWT cookie)
  ├── CSRF token validation (NextAuth built-in)
  └── Route protection

Layer 3: Service Layer
  ├── Zod input validation (every mutation)
  ├── Tenant ownership verification (every query/mutation)
  ├── File type/size validation (uploads)
  └── Output sanitization (guest messages, XSS prevention)

Layer 4: Database
  ├── Parameterized queries (Prisma default)
  ├── CUID IDs (no enumeration)
  └── Cascading deletes (data integrity)
```

### Mutation Flow (MANDATORY for all write operations)

```text
Client Request
  ↓
1. Authenticate: getServerSession() → userId
  ↓
2. Validate: zodSchema.parse(input)
  ↓
3. Authorize: verify userId owns the resource
  ↓
4. Execute: database operation
  ↓
5. Respond
```

### Specific Security Measures

| Threat | Mitigation |
|--------|-----------|
| SQL Injection | Prisma parameterized queries |
| XSS | React auto-escaping + DOMPurify for guest messages |
| CSRF | NextAuth CSRF token |
| IDOR | Tenant filter on every query |
| Brute force login | Rate limit on `/login` (Nginx + middleware) |
| File upload attacks | MIME allowlist, extension allowlist, file size limit, no execution |
| Data enumeration | CUID IDs, no sequential integers |
| Password exposure | bcrypt with cost factor 12 |
| Session hijacking | HTTP-only, Secure, SameSite=Lax cookies |

### Nginx Security Headers

```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
```

### Rate Limiting

```text
Nginx level:
  General: 30 req/sec per IP
  Login:   5 req/min per IP
  RSVP:    10 req/min per IP
  Upload:  5 req/min per IP
```

---

## 12. DOCKER / DEPLOYMENT ARCHITECTURE

### Container Architecture

```text
┌──────────────────────────────────────────┐
│                VPS (Host)                │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │        Docker Network (internal)   │  │
│  │                                    │  │
│  │  ┌──────────┐    ┌─────────────┐   │  │
│  │  │  Nginx   │───►│  Next.js    │   │  │
│  │  │  :80/443 │    │  :3000      │   │  │
│  │  └──────────┘    └──────┬──────┘   │  │
│  │                         │          │  │
│  │                  ┌──────▼──────┐   │  │
│  │                  │ PostgreSQL  │   │  │
│  │                  │  :5432      │   │  │
│  │                  │ (internal)  │   │  │
│  │                  └─────────────┘   │  │
│  └────────────────────────────────────┘  │
│                                          │
│  Volumes:                                │
│   - pg_data (PostgreSQL data)            │
│   - uploads (user uploads)               │
└──────────────────────────────────────────┘
```

### docker-compose.yml Structure

```yaml
services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    depends_on:
      - app
    # Mount nginx.conf and SSL certs

  app:
    build: .
    expose:
      - "3000"
    depends_on:
      - db
    environment:
      - DATABASE_URL=postgresql://...
    volumes:
      - uploads:/app/public/uploads

  db:
    image: postgres:16-alpine
    # NO ports exposed to host
    environment:
      - POSTGRES_DB=invitationkami
      - POSTGRES_USER=${DB_USER}
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - pg_data:/var/lib/postgresql/data

volumes:
  pg_data:
  uploads:
```

### Key Rules

1. PostgreSQL port **5432 is never exposed** to the internet
2. Only Nginx ports (80, 443) are exposed
3. Next.js communicates to PostgreSQL via internal Docker network
4. `pg_data` and `uploads` are persistent Docker volumes

### Dockerfile (Multi-stage)

```text
Stage 1: deps     — Install dependencies
Stage 2: builder  — Build Next.js
Stage 3: runner   — Production image (node:20-alpine, minimal)
```

### Deployment Flow

```text
1. SSH into VPS
2. git pull (or transfer build)
3. docker compose build
4. docker compose up -d
5. docker compose exec app npx prisma migrate deploy
```

---

## 13. BACKUP / RESTORE STRATEGY

### scripts/backup.sh

```text
1. Run pg_dump from docker exec
2. Compress with gzip
3. Filename: invitationkami_YYYY-MM-DD_HH-MM.sql.gz
4. Save to /backups/ on host
5. Optionally sync to external storage (rclone/scp)
6. Retain last N backups locally
7. Log result
```

### scripts/restore.sh

```text
1. Accept backup filename as argument
2. Decompress
3. Run pg_restore / psql import via docker exec
4. Verify table counts
5. Log result
```

### Upload Files Backup

```text
Separately tar.gz the uploads volume:
  docker run --rm -v uploads:/data -v /backups:/backup \
    alpine tar czf /backup/uploads_YYYY-MM-DD.tar.gz /data
```

### Schedule

- **Automated**: Cron job daily at 2 AM
- **Manual**: Before any deployment or migration
- **Offsite**: Copy to external storage (not just VPS)

---

## 14. TESTING STRATEGY

### Pragmatic Testing for Constrained Resources

No 100% coverage target. Focus on what breaks production.

### Test Layers

| Layer | Tool | What to Test |
|-------|------|-------------|
| Unit | Vitest | Service functions, Zod schemas, utilities |
| Integration | Vitest + Prisma (test DB) | Tenant isolation, CRUD operations, ownership checks |
| E2E | Playwright (CI only) | Critical user flows: register → create invitation → publish → view |
| Manual | Browser | Theme visual correctness, mobile responsiveness |

### Priority Test Cases

**MUST test** (these protect critical business rules):

1. **Tenant isolation**: User A cannot access User B's invitations
2. **Ownership verification**: Cannot mutate resources you don't own
3. **Auth flow**: Login, register, session, logout
4. **Invitation CRUD**: Create, read, update, delete invitation
5. **Public rendering**: Published invitation loads correctly
6. **Unpublished guard**: Unpublished invitation returns 404
7. **Upload validation**: Blocked file types are rejected
8. **RSVP submission**: Public RSVP works correctly
9. **Input validation**: Zod schemas reject invalid data

### Test Database

Use a separate PostgreSQL database for tests. Run `prisma migrate deploy` before test suite.

---

## 15. DEVELOPMENT PHASES

### Phase 1 — Foundation

```text
Duration: ~3-4 days
Deliverables:
  ✓ Project setup (Next.js, TypeScript, Tailwind, shadcn/ui)
  ✓ Prisma schema + initial migration
  ✓ Database seed (themes, music)
  ✓ Auth module (NextAuth, login, register)
  ✓ Middleware (route protection)
  ✓ Branding config (APP_NAME, etc.)
  ✓ Docker setup (compose, Dockerfile, nginx)
  ✓ Storage abstraction (local adapter)
  ✓ Image processor (sharp)
  ✓ Base layout (dashboard shell)
```

### Phase 2 — Core Wedding Data

```text
Duration: ~4-5 days
Deliverables:
  ✓ Invitation CRUD
  ✓ Couple editor (groom, bride)
  ✓ Event editor
  ✓ Gallery editor + upload
  ✓ Love story editor
  ✓ RSVP config
  ✓ Wedding gift config
  ✓ Music selection
  ✓ Slug management
  ✓ Tenant isolation enforcement in all services
```

### Phase 3 — Theme Engine + Public Rendering

```text
Duration: ~5-7 days
Deliverables:
  ✓ Theme data contract (ThemeData interface)
  ✓ Theme registry
  ✓ Theme selection UI
  ✓ Appearance settings (color, font, animation, sections)
  ✓ First theme: Elegant (all 13 sections)
  ✓ Public rendering route /i/[slug]
  ✓ Opening screen interaction
  ✓ Music player (browser policy compliant)
  ✓ Countdown timer
  ✓ RSVP form (public)
  ✓ Guestbook (public)
  ✓ Preview mode (dashboard)
```

### Phase 4 — Polish + Remaining Themes

```text
Duration: ~5-7 days
Deliverables:
  ✓ Themes: Modern, Floral, Luxury, Minimalist
  ✓ Guest management (list, WhatsApp share, QR Code)
  ✓ Guestbook management (dashboard view)
  ✓ Mobile responsive testing & fixes
  ✓ Image optimization (next/image, lazy loading)
  ✓ Animation implementation per theme
  ✓ Share features (WhatsApp link, QR code)
```

### Phase 5 — Production Hardening

```text
Duration: ~3-4 days
Deliverables:
  ✓ Security audit (headers, rate limiting, input validation)
  ✓ Performance optimization (bundle, queries, caching)
  ✓ Backup/restore scripts
  ✓ Error handling & error pages
  ✓ SEO (meta tags, OG images for shared links)
  ✓ Testing (critical path tests)
  ✓ Deployment documentation
  ✓ Production deployment
```

### Phase 6 — Future (NOT in scope)

```text
  ○ Payment integration
  ○ Subscription plans
  ○ Custom domains
  ○ Analytics dashboard
  ○ Admin panel
  ○ S3/R2 storage migration
  ○ Additional themes
```

---

## 16. ENVIRONMENT VARIABLES

```env
# App
APP_NAME=InvitationKami
APP_TAGLINE=Undangan Digital Modern
APP_URL=https://invitationkami.com
APP_LOGO=/images/logo.svg
APP_FAVICON=/favicon.ico

# Database
DATABASE_URL=postgresql://user:password@db:5432/invitationkami

# Auth
NEXTAUTH_SECRET=<random-64-char-string>
NEXTAUTH_URL=https://invitationkami.com

# Storage
STORAGE_ADAPTER=local
UPLOAD_DIR=./public/uploads
UPLOAD_MAX_SIZE=5242880

# Docker DB
DB_USER=invitationkami
DB_PASSWORD=<strong-password>
```

---

## 17. KEY ARCHITECTURAL DECISIONS SUMMARY

| # | Decision | Rationale |
|---|----------|-----------|
| 1 | Modular Monolith, not microservices | Spec requirement. 2 core / 4 GB RAM. Simple. |
| 2 | Next.js full-stack (no separate API) | Spec requirement. Reduces infrastructure. |
| 3 | JWT sessions, not DB sessions | No extra DB queries per request. Stateless. |
| 4 | Application-level tenant isolation | Simpler than RLS. Enforced via service functions. |
| 5 | Themes as React components, not templates | Full layout control. Different themes = different components. Not just color swaps. |
| 6 | ThemeData contract interface | Decouples data from presentation. Add theme without changing business logic. |
| 7 | Single DB query for public page | Avoid N+1. One `include` call per page load. |
| 8 | HTTP caching, no Redis | Spec says no Redis. HTTP Cache-Control is sufficient for this scale. |
| 9 | Local storage with adapter pattern | MVP uses disk. Swap to S3/R2 via env config later. |
| 10 | sharp for image processing | Efficient, well-maintained. Convert to WebP, strip metadata. |
| 11 | CUID IDs everywhere | Prevent enumeration. URL-safe. No SERIAL leaks. |
| 12 | JSON column for section config | Flexible. No migration needed when sections change. |
| 13 | PostgreSQL inside Docker, no exposed port | Spec requirement. Security. |
| 14 | pg_dump for backups | Simple, reliable. No extra tooling. |
| 15 | Vitest + Playwright for testing | Vitest is fast. Playwright for critical E2E only. |

---

> **This document is the technical source of truth for InvitationKami implementation.**
>
> All implementation phases should follow this architecture.
>
> Any deviation must be justified and documented.
