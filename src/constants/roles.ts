// ─────────────────────────────────────────────────────────────────────────────
// Role-Based Access Control definitions.
//
// Roles are stored on `profiles.role` in Postgres and mirrored into the JWT so
// RLS policies can authorise writes server-side. The frontend uses these same
// constants to show/hide admin modules. Enforcement always happens in the DB —
// the frontend checks are UX only.
//
// Wired up in Phase 2 (RBAC); defined here so the foundation is in place.
// ─────────────────────────────────────────────────────────────────────────────

export const ROLES = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  CONTENT_MANAGER: "content_manager",
  VIEWER: "viewer",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

/** Ordered from most to least privileged for hierarchy comparisons. */
export const ROLE_HIERARCHY: Role[] = [
  ROLES.SUPER_ADMIN,
  ROLES.ADMIN,
  ROLES.CONTENT_MANAGER,
  ROLES.VIEWER,
];

/** True when `role` is at least as privileged as `minimum`. */
export function hasAtLeastRole(role: Role | null, minimum: Role): boolean {
  if (!role) return false;
  return ROLE_HIERARCHY.indexOf(role) <= ROLE_HIERARCHY.indexOf(minimum);
}
