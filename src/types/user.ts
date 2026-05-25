export const USER_ROLE_OPTIONS = ["admin", "superadmin"] as const;

export type UserRole = (typeof USER_ROLE_OPTIONS)[number];

export interface InternalUser {
  id: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  failedLoginAttempts: number;
  lockedUntil: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SessionUser {
  id: string;
  email: string;
  role: UserRole;
  exp: number;
}
