import { createSupabaseAdminClient } from "@/lib/db/supabase";
import type { AuditAction } from "@/types/audit";

interface AuditInput {
  actorUserId: string;
  entityType: "property" | "user" | "contact_message" | "session";
  entityId: string;
  action: AuditAction;
  oldValues?: Record<string, unknown> | null;
  newValues?: Record<string, unknown> | null;
  ipAddress: string;
  userAgent: string;
}

export async function recordAuditLog(input: AuditInput): Promise<void> {
  const supabase = createSupabaseAdminClient();
  await supabase.from("audit_logs").insert({
    actor_user_id: input.actorUserId,
    entity_type: input.entityType,
    entity_id: input.entityId,
    action: input.action,
    old_values: input.oldValues ?? null,
    new_values: input.newValues ?? null,
    ip_address: input.ipAddress,
    user_agent: input.userAgent,
  });
}
