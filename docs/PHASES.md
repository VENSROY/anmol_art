# ANMOL Art — Delivery Phases

Supabase-native, stabilize-first sequencing. Each phase ships, is verified, and
leaves the app in a working state.

| Phase | Goal | Status |
|-------|------|--------|
| 0 | Stabilize: `/admin` 404 fix, auth resilience, apply base migration | ✅ code done; DB hand-off pending |
| 1 | Foundation refactor: services, hooks, context, React Query, constants, types | ✅ built, type-checked |
| 2 | RBAC + `profiles` + versioned migrations | ✅ code+migrations done; apply pending auth |
| 3 | Products + Categories + Collections + Media Library | — |
| 4 | User Management + Activity Logs | — |
| 5 | SEO management + dynamic sitemap | — |
| 6 | Dynamic theme / branding (logo, favicon, colors, fonts) | — |
| 7 | Hardening: rate limits, image compression, E2E, deploy audit | — |

---

## Phase 0 — Stabilize

- **Fix:** `/admin` 404 on Vercel — added `vercel.json` SPA rewrite + cache/security headers.
- **Fix:** `/admin` blank screen — `getSession()` had no error handling; a stale token
  left the panel stuck loading. Now `.catch()` clears it and `.finally()` always
  releases the loading state. (Centralized into `AuthContext` in Phase 1.)
- **Manual step still required:** run `supabase_migration_v2.sql`, create admin user,
  create `stock-images` bucket. (Will be automated via CLI once linked.)

## Phase 1 — Foundation Refactor

- **Added:** `api/queryClient.ts`, `constants/{queryKeys,roles,routes}.ts`,
  `context/AuthContext.tsx`, `types/database.ts`, 9 `services/*.service.ts`.
- **Modified:** `main.tsx`, `hooks/useSiteConfig.ts`, all data-touching components and
  admin managers now use the service layer instead of inline Supabase calls.
- **Improvements:** live settings refresh via React Query invalidation; shared cached
  site config; consistent service error handling.
- **DB changes:** none.
- **Verification:** `tsc --noEmit` → exit 0. Build + dev verification in progress.
