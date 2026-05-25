import { NextRequest, NextResponse } from "next/server";
import { hasRole } from "@/lib/auth/rbac";
import { getSessionUserFromRequest } from "@/lib/auth/session";
import { resetAdminPassword, serializeInternalUser } from "@/lib/services/admin.service";
import { recordAuditLog } from "@/lib/services/audit.service";
import { AdminResetPasswordSchema } from "@/lib/validation";
import { getClientIp, handleApiError } from "@/lib/utils/http";

interface AdminResetPasswordRouteContext {
  params: Promise<{ id: string }>;
}

export async function POST(
  request: NextRequest,
  { params }: AdminResetPasswordRouteContext,
): Promise<NextResponse> {
  try {
    const user = await getSessionUserFromRequest(request);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (!hasRole(user, ["superadmin"])) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const { id } = await params;
    const input = AdminResetPasswordSchema.parse(await request.json());
    const admin = await resetAdminPassword(id, input.password);
    await recordAuditLog({
      actorUserId: user.id,
      entityType: "user",
      entityId: admin.id,
      action: "update",
      newValues: { id: admin.id, passwordReset: true },
      ipAddress: getClientIp(request.headers),
      userAgent: request.headers.get("user-agent") ?? "unknown",
    });

    return NextResponse.json({ success: true, data: serializeInternalUser(admin) });
  } catch (error) {
    return handleApiError(error);
  }
}
