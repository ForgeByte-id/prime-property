import bcrypt from "bcrypt";
import { createSupabaseAdminClient } from "@/lib/db/supabase";
import type { InternalUser } from "@/types/user";

interface InternalUserRow {
  id: string;
  email: string;
  role: "admin" | "superadmin";
  is_active: boolean;
  failed_login_attempts: number;
  locked_until: string | null;
  created_at: string;
  updated_at: string;
}

const USER_COLUMNS = [
  "id",
  "email",
  "role",
  "is_active",
  "failed_login_attempts",
  "locked_until",
  "created_at",
  "updated_at",
].join(",");

function toInternalUser(row: InternalUserRow): InternalUser {
  return {
    id: row.id,
    email: row.email,
    role: row.role,
    isActive: row.is_active,
    failedLoginAttempts: row.failed_login_attempts,
    lockedUntil: row.locked_until,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function serializeInternalUser(user: InternalUser): Record<string, unknown> {
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
    failedLoginAttempts: user.failedLoginAttempts,
    lockedUntil: user.lockedUntil,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export async function listAdmins(): Promise<InternalUser[]> {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("internal_users")
    .select(USER_COLUMNS)
    .order("created_at", { ascending: false })
    .returns<InternalUserRow[]>();

  if (error) throw new Error(error.message);
  return (data ?? []).map(toInternalUser);
}

export async function createAdmin(email: string, password: string): Promise<InternalUser> {
  const supabase = createSupabaseAdminClient();
  const passwordHash = await bcrypt.hash(password, 10);
  const { data, error } = await supabase
    .from("internal_users")
    .insert({
      email: email.toLowerCase(),
      password_hash: passwordHash,
      role: "admin",
      is_active: true,
    })
    .select(USER_COLUMNS)
    .single<InternalUserRow>();

  if (error || !data) throw new Error(error?.message ?? "Gagal membuat admin.");
  return toInternalUser(data);
}

export async function setAdminStatus(id: string, isActive: boolean): Promise<InternalUser> {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("internal_users")
    .update({
      is_active: isActive,
      locked_until: null,
      failed_login_attempts: 0,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("role", "admin")
    .select(USER_COLUMNS)
    .single<InternalUserRow>();

  if (error || !data) throw new Error(error?.message ?? "Gagal mengubah status admin.");
  return toInternalUser(data);
}

export async function resetAdminPassword(id: string, password: string): Promise<InternalUser> {
  const supabase = createSupabaseAdminClient();
  const passwordHash = await bcrypt.hash(password, 10);
  const { data, error } = await supabase
    .from("internal_users")
    .update({
      password_hash: passwordHash,
      locked_until: null,
      failed_login_attempts: 0,
      failed_login_window_started_at: null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("role", "admin")
    .select(USER_COLUMNS)
    .single<InternalUserRow>();

  if (error || !data) throw new Error(error?.message ?? "Gagal reset password admin.");
  return toInternalUser(data);
}
