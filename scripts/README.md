# scripts/

Project automation scripts (Supabase CLI helpers, type generation, seeding).

Planned:
- `gen-types.sh` — regenerate `src/types/supabase.ts` from the linked Supabase project
  (`supabase gen types typescript --linked`).
- `db-reset.sh` — reset local/remote DB from migrations (dev only).

Added incrementally as the database workflow matures.
