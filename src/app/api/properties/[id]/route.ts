import { NextRequest, NextResponse } from "next/server";
import { canMutateProperty } from "@/lib/auth/rbac";
import { getSessionUserFromRequest } from "@/lib/auth/session";
import { recordAuditLog } from "@/lib/services/audit.service";
import { softDeleteProperty } from "@/lib/services/property.service";
import { getClientIp, handleApiError } from "@/lib/utils/http";

interface PropertyRouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(
  request: NextRequest,
  { params }: PropertyRouteContext,
): Promise<NextResponse> {
  const user = await getSessionUserFromRequest(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  return NextResponse.json({ data: { id } });
}

export async function DELETE(
  request: NextRequest,
  { params }: PropertyRouteContext,
): Promise<NextResponse> {
  try {
    const user = await getSessionUserFromRequest(request);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (!canMutateProperty(user)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const { id } = await params;
    await softDeleteProperty(id, user);
    await recordAuditLog({
      actorUserId: user.id,
      entityType: "property",
      entityId: id,
      action: "soft_delete",
      oldValues: null,
      newValues: { deletedAt: new Date().toISOString() },
      ipAddress: getClientIp(request.headers),
      userAgent: request.headers.get("user-agent") ?? "unknown",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error);
  }
}
