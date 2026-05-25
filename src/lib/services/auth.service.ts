import bcrypt from "bcrypt";
import { createSupabaseAdminClient } from "@/lib/db/supabase";
import type { UserRole } from "@/types/user";

interface UserRecord {
  id: string;
  email: string;
  password_hash: string;
  role: UserRole;
  is_active: boolean;
  failed_login_attempts: number;
  locked_until: string | null;
}

export type LoginResult =
  | { success: true; user: { id: string; email: string; role: UserRole } }
  | { success: false; error: string; status: 401 | 423 };

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;
const FAILURE_WINDOW_MINUTES = 30;

export async function authenticateUser(email: string, password: string): Promise<LoginResult> {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("internal_users")
    .select("id,email,password_hash,role,is_active,failed_login_attempts,locked_until")
    .eq("email", email.toLowerCase())
    .single<UserRecord>();

  if (error || !data || !data.is_active) {
    return { success: false, error: "Email atau password tidak valid.", status: 401 };
  }

  if (data.locked_until && new Date(data.locked_until).getTime() > Date.now()) {
    return { success: false, error: "Akun terkunci sementara. Coba lagi nanti.", status: 423 };
  }

  const passwordMatches = await bcrypt.compare(password, data.password_hash);
  if (!passwordMatches) {
    const failedAttempts = data.failed_login_attempts + 1;
    const lockedUntil =
      failedAttempts >= MAX_FAILED_ATTEMPTS
        ? new Date(Date.now() + LOCKOUT_MINUTES * 60 * 1000).toISOString()
        : null;

    await supabase
      .from("internal_users")
      .update({
        failed_login_attempts: failedAttempts,
        locked_until: lockedUntil,
        failed_login_window_started_at: new Date(Date.now() - FAILURE_WINDOW_MINUTES * 60 * 1000).toISOString(),
      })
      .eq("id", data.id);

    return { success: false, error: "Email atau password tidak valid.", status: 401 };
  }

  await supabase
    .from("internal_users")
    .update({
      failed_login_attempts: 0,
      locked_until: null,
      last_login_at: new Date().toISOString(),
    })
    .eq("id", data.id);

  return {
    success: true,
    user: { id: data.id, email: data.email, role: data.role },
  };
}
