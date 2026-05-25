import { NextRequest, NextResponse } from "next/server";
import { canMutateProperty } from "@/lib/auth/rbac";
import { getSessionUserFromRequest } from "@/lib/auth/session";
import { recordAuditLog } from "@/lib/services/audit.service";
import {
  getPropertyById,
  serializeProperty,
  softDeleteProperty,
  updateProperty,
} from "@/lib/services/property.service";
import { PropertyCreateSchema } from "@/lib/validation";
import { getClientIp, handleApiError } from "@/lib/utils/http";

interface PropertyRouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(
  request: NextRequest,
  { params }: PropertyRouteContext,
): Promise<NextResponse> {
  try {
    const user = await getSessionUserFromRequest(request);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id } = await params;
    const property = await getPropertyById(id);
    if (!property) return NextResponse.json({ error: "Properti tidak ditemukan." }, { status: 404 });
    return NextResponse.json({ data: serializeProperty(property) });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: PropertyRouteContext,
): Promise<NextResponse> {
  try {
    const user = await getSessionUserFromRequest(request);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (!canMutateProperty(user)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const { id } = await params;
    const oldProperty = await getPropertyById(id);
    if (!oldProperty) return NextResponse.json({ error: "Properti tidak ditemukan." }, { status: 404 });

    const input = PropertyCreateSchema.parse(await request.json());
    const updated = await updateProperty(id, input, user);
    await recordAuditLog({
      actorUserId: user.id,
      entityType: "property",
      entityId: id,
      action: "update",
      oldValues: serializeProperty(oldProperty),
      newValues: serializeProperty(updated),
      ipAddress: getClientIp(request.headers),
      userAgent: request.headers.get("user-agent") ?? "unknown",
    });

    return NextResponse.json({ success: true, data: serializeProperty(updated) });
  } catch (error) {
    return handleApiError(error);
  }
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
    const deleted = await softDeleteProperty(id, user);
    if (!deleted) return NextResponse.json({ error: "Properti tidak ditemukan." }, { status: 404 });

    await recordAuditLog({
      actorUserId: user.id,
      entityType: "property",
      entityId: id,
      action: "soft_delete",
      oldValues: serializeProperty(deleted),
      newValues: { deletedAt: new Date().toISOString() },
      ipAddress: getClientIp(request.headers),
      userAgent: request.headers.get("user-agent") ?? "unknown",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error);
  }
}
