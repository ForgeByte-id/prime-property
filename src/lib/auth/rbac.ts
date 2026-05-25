import type { SessionUser, UserRole } from "@/types/user";

const mutationRoles: readonly UserRole[] = ["superadmin"];

export function canMutateProperty(user: SessionUser | null): boolean {
  return Boolean(user && mutationRoles.includes(user.role));
}

export function hasRole(user: SessionUser | null, allowedRoles: readonly UserRole[]): boolean {
  return Boolean(user && allowedRoles.includes(user.role));
}
