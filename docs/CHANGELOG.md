# Changelog

All notable changes to the ANMOL Art platform, newest first.

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
