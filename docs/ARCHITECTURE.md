# ANMOL Art — Architecture

A Supabase-native full-stack application. Single frontend deployment (Vercel) with
Supabase providing Postgres, Auth, Row-Level Security, Storage, and Edge Functions.
No separate Node backend — server-only logic runs in Supabase Edge Functions.

```
React/Vite SPA (Vercel)
        │
        ├── TanStack Query  →  src/services/*  (typed Supabase calls)
        │
        ▼
Supabase ── Postgres (+RLS, RBAC)  ── Auth (JWT, roles)
         ── Storage (media buckets) ── Edge Functions
```

## Frontend layers (`src/`)

| Layer | Folder | Responsibility |
|-------|--------|----------------|
| API   | `api/` | Supabase client config, TanStack Query client |
| Services | `services/` | **Only** place that talks to Supabase. Typed, throwing functions per domain |
| Hooks | `hooks/` | React Query wrappers + view-model hooks |
| Context | `context/` | Cross-cutting state (auth) |
| Components | `components/` | Public site + `components/admin/` panel |
| Constants | `constants/` | Query keys, roles, routes |
| Types | `types/` | `database.ts` — canonical DB row types (single source of truth) |

**Rule:** UI never imports the Supabase client directly. It calls services (or hooks
that call services). This keeps data access centralized, typed, and testable.

## Backend (Supabase)

- **Database:** Postgres. Schema is version-controlled in `supabase/migrations/`.
- **Auth:** Supabase Auth (email+password). Sessions in `localStorage`, auto-refreshed.
- **RBAC:** roles on `profiles.role`, mirrored into the JWT, enforced by RLS. (Phase 2)
- **Storage:** `stock-images` bucket, public-read / authenticated-write.
- **Edge Functions:** `supabase/functions/` — image compression, activity logging,
  data export, sitemap generation. (Later phases)

## Tooling

- **Supabase CLI** manages migrations, RLS, buckets, functions, and type generation.
  All schema changes are reproducible from a fresh clone via `supabase db push`.
- **TanStack Query** caches public content (5-min stale time) and invalidates on
  admin writes.

## Dynamic content

All editable business content (contact info, hero slides, services, FAQs, about,
stats, social links, collections) is stored in Postgres and managed from the Admin
Panel. Hardcoded fallbacks in components mirror the real business data so the site
never renders blank before the DB responds.

See [PHASES.md](./PHASES.md) for the delivery roadmap and per-phase reports.
