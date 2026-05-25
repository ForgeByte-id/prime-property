import { NextRequest, NextResponse } from "next/server";
import { hasRole } from "@/lib/auth/rbac";
import { getSessionUserFromRequest } from "@/lib/auth/session";
import { createAdmin, listAdmins, serializeInternalUser } from "@/lib/services/admin.service";
import { recordAuditLog } from "@/lib/services/audit.service";
import { AdminCreateSchema } from "@/lib/validation";
import { getClientIp, handleApiError } from "@/lib/utils/http";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const user = await getSessionUserFromRequest(request);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (!hasRole(user, ["superadmin"])) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const admins = await listAdmins();
    return NextResponse.json({ data: admins.map(serializeInternalUser) });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const user = await getSessionUserFromRequest(request);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (!hasRole(user, ["superadmin"])) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const input = AdminCreateSchema.parse(await request.json());
    const admin = await createAdmin(input.email, input.password);
    await recordAuditLog({
      actorUserId: user.id,
      entityType: "user",
      entityId: admin.id,
      action: "create",
      newValues: serializeInternalUser(admin),
      ipAddress: getClientIp(request.headers),
      userAgent: request.headers.get("user-agent") ?? "unknown",
    });

    return NextResponse.json({ success: true, data: serializeInternalUser(admin) }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
