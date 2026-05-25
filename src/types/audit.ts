export const AUDIT_ACTION_OPTIONS = ["create", "update", "soft_delete", "login", "logout"] as const;

export type AuditAction = (typeof AUDIT_ACTION_OPTIONS)[number];

export interface AuditLog {
  id: string;
  actorUserId: string;
  entityType: "property" | "user" | "contact_message" | "session";
  entityId: string;
  action: AuditAction;
  oldValues: Record<string, unknown> | null;
  newValues: Record<string, unknown> | null;
  ipAddress: string;
  userAgent: string;
  createdAt: string;
}
