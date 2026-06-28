# Changelog

All notable changes to the ANMOL Art platform, newest first.

## Phase 2 — RBAC, Profiles & Versioned Migrations

**Backend:** Introduced role-based access control and version-controlled migrations
managed entirely through the Supabase CLI. No Supabase Auth hook required — roles are
read by a `SECURITY DEFINER` function that RLS policies call.

### Added
- Supabase CLI (`supabase` devDependency) + `supabase init` scaffolding
  (`supabase/config.toml`, `supabase/functions/`).
- `supabase/migrations/20260101000000_initial_schema.sql` — reproducible baseline
  (all existing tables, RLS, storage bucket + policies).
- `supabase/migrations/20260101000001_rbac_profiles.sql` — `profiles` table with
  `role` (super_admin/admin/content_manager/viewer), `auth_role()` +
  `is_content_editor()` helpers, signup trigger + backfill, role-gated write
  policies on every content table and storage, audit `updated_at` columns +
  triggers on all tables.
- `src/services/profiles.service.ts` — get/list profiles, update role, enable/disable.
- npm scripts: `db:push`, `db:diff`, `db:reset`, `db:lint`, `db:types`, `fn:deploy`.

### Changed
- `src/context/AuthContext.tsx` — resolves the signed-in user's role from `profiles`
  and exposes `role`.
- `src/components/AdminPanel.tsx` — shows the current role in the header.
- `src/types/database.ts` — added `Profile` type.

### Security
- Write access to all content tables and storage now requires a staff role
  (content_manager or above), enforced server-side via RLS. New signups default to
  the least-privileged `viewer` role.

### Database changes
- New `profiles` table; role-based RLS replacing "any authenticated" write policies;
  `updated_at` audit columns + triggers on all tables.

### Verification
- `tsc --noEmit` → exit 0. Migrations apply pending `supabase link` (auth gate).

### Manual step required (one-time authentication)
- `npx supabase login` and `npx supabase link --project-ref kfqrfspitvcpemdvvryx`,
  then promote your admin account to `super_admin` (command provided in the report).

---

## Phase 1 — Foundation Refactor

**Architecture:** Introduced a clean layered architecture so future phases plug in
without touching UI code. Behaviour-preserving — no functional changes.

### Added
- `src/api/queryClient.ts` — TanStack Query client (5-min stale time, no refetch-on-focus).
- `src/constants/queryKeys.ts`, `roles.ts`, `routes.ts` — centralized cache keys, RBAC
  role definitions/hierarchy, and route paths.
- `src/context/AuthContext.tsx` — single source of auth truth; resilient `getSession`
  (clears stale tokens, never hangs).
- `src/types/database.ts` — canonical DB row types (single source of truth).
- `src/services/*.service.ts` (9) — typed data-access layer: auth, categories,
  stockImages, storage, siteConfig, heroSlides, services, faqs, contactSubmissions.
- `docs/ARCHITECTURE.md`, `docs/PHASES.md`, `docs/CHANGELOG.md`, `scripts/README.md`.

### Changed
- `src/main.tsx` — wrapped app in `QueryClientProvider` + `AuthProvider`.
- `src/hooks/useSiteConfig.ts` — re-implemented on TanStack Query (shared cache +
  invalidation) while keeping its public API identical.
- `src/components/admin/types.ts` — re-exports canonical types from `types/database.ts`.
- `AdminPanel.tsx` / `AdminLogin.tsx` — consume `AuthContext` (single auth path).
- All data components (`Hero, Services, FAQ, Collections, Contact, Stock`) and admin
  managers (`Gallery, Upload, Category, Hero, Services, FAQ, Inquiries, SiteSettings`)
  now call services instead of inline Supabase queries.

### Improved
- Saving site settings now invalidates the React Query cache so the public site
  updates without a hard reload.

### Dependencies
- Added `@tanstack/react-query@^5`.

### Database
- None.

### Verification
- `tsc --noEmit` → exit 0. `vite build` → exit 0 (176 modules).

### Dependency added
- `@tanstack/react-query`

---

## Phase 0 — Stabilize

### Added
- `vercel.json` — SPA rewrite (fixes `/admin` 404 in production) + asset cache and
  security headers (`X-Frame-Options`, `nosniff`, `Referrer-Policy`).

### Fixed
- `/admin` blank screen: `getSession()` lacked error handling, so a stale token left
  the panel stuck loading. Added `.catch()` (clears token → login) and `.finally()`
  (always releases loading). Hoisted `HeroManager` `showForm` state.

### Manual steps still pending (to be automated via CLI)
- Apply base schema, create admin user, create `stock-images` storage bucket.
