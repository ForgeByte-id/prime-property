import { createSupabaseAdminClient } from "@/lib/db/supabase";
import { formatJakartaDateTime } from "@/lib/utils/formatting";
import { Activity, Clock3, FileClock } from "lucide-react";

export const metadata = {
  title: "Audit Log",
};

export default async function AuditLogsPage(): Promise<React.ReactElement> {
  const { data } = await createSupabaseAdminClient()
    .from("audit_logs")
    .select("id,actor_user_id,entity_type,entity_id,action,created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <section className="space-y-lg">
      <div className="dashboard-surface p-lg">
        <div className="flex items-start gap-md">
          <span className="metric-icon mt-1">
            <FileClock aria-hidden="true" size={18} />
          </span>
          <div>
            <p className="text-caption font-semibold uppercase text-accent-gold">Superadmin</p>
            <h1 className="text-display-md">Audit Log</h1>
            <p className="mt-xs text-body-sm text-text-secondary">Trace mutasi properti dan akun internal dalam zona waktu Asia/Jakarta.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-md md:grid-cols-2">
        <div className="dashboard-stat p-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-caption font-semibold uppercase text-text-muted">Log Ditampilkan</p>
              <p className="mt-xs text-title-md">{data?.length ?? 0}</p>
            </div>
            <span className="metric-icon"><Activity aria-hidden="true" size={18} /></span>
          </div>
        </div>
        <div className="dashboard-stat p-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-caption font-semibold uppercase text-text-muted">Urutan</p>
              <p className="mt-xs text-title-md">Terbaru</p>
            </div>
            <span className="metric-icon"><Clock3 aria-hidden="true" size={18} /></span>
          </div>
        </div>
      </div>

      <div className="table-shell">
        <div className="overflow-x-auto">
        <table className="data-table min-w-[940px]">
          <thead>
            <tr>
              <th className="px-md py-sm">Waktu</th>
              <th className="px-md py-sm">Actor</th>
              <th className="px-md py-sm">Entity</th>
              <th className="px-md py-sm">Action</th>
              <th className="px-md py-sm">Entity ID</th>
            </tr>
          </thead>
          <tbody className="text-table-cell">
            {(data ?? []).map((log) => (
              <tr key={log.id}>
                <td className="px-md py-sm">{formatJakartaDateTime(log.created_at)}</td>
                <td className="px-md py-sm">{log.actor_user_id}</td>
                <td className="px-md py-sm">{log.entity_type}</td>
                <td className="px-md py-sm"><span className="status-badge status-badge-warning">{log.action}</span></td>
                <td className="px-md py-sm">{log.entity_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </section>
  );
}
