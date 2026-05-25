import { listAdmins } from "@/lib/services/admin.service";
import { formatJakartaDateTime } from "@/lib/utils/formatting";
import { ShieldCheck, UserCheck, Users } from "lucide-react";

export const metadata = {
  title: "Manajemen Admin",
};

export default async function AdminsPage(): Promise<React.ReactElement> {
  const admins = await listAdmins();
  const activeAdmins = admins.filter((admin) => admin.isActive).length;

  return (
    <section className="space-y-lg">
      <div className="dashboard-surface p-lg">
        <div className="flex items-start gap-md">
          <span className="metric-icon mt-1">
            <Users aria-hidden="true" size={18} />
          </span>
          <div>
            <p className="text-caption font-semibold uppercase text-accent-gold">Superadmin</p>
            <h1 className="text-display-md">Manajemen Admin</h1>
            <p className="mt-xs text-body-sm text-text-secondary">Pantau akun internal, status aktif, dan lockout.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-md md:grid-cols-2">
        <div className="dashboard-stat p-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-caption font-semibold uppercase text-text-muted">Total User</p>
              <p className="mt-xs text-title-md">{admins.length}</p>
            </div>
            <span className="metric-icon"><ShieldCheck aria-hidden="true" size={18} /></span>
          </div>
        </div>
        <div className="dashboard-stat p-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-caption font-semibold uppercase text-text-muted">Aktif</p>
              <p className="mt-xs text-title-md">{activeAdmins}</p>
            </div>
            <span className="metric-icon"><UserCheck aria-hidden="true" size={18} /></span>
          </div>
        </div>
      </div>

      <div className="table-shell">
        <div className="overflow-x-auto">
        <table className="data-table min-w-[820px]">
          <thead>
            <tr>
              <th className="px-md py-sm">Email</th>
              <th className="px-md py-sm">Role</th>
              <th className="px-md py-sm">Status</th>
              <th className="px-md py-sm">Locked Until</th>
              <th className="px-md py-sm">Created</th>
            </tr>
          </thead>
          <tbody className="text-table-cell">
            {admins.map((admin) => (
              <tr key={admin.id}>
                <td className="px-md py-sm font-semibold">{admin.email}</td>
                <td className="px-md py-sm"><span className="status-badge status-badge-warning">{admin.role}</span></td>
                <td className="px-md py-sm">
                  <span className={admin.isActive ? "status-badge status-badge-success" : "status-badge status-badge-danger"}>
                    {admin.isActive ? "Aktif" : "Nonaktif"}
                  </span>
                </td>
                <td className="px-md py-sm">
                  {admin.lockedUntil ? formatJakartaDateTime(admin.lockedUntil) : "-"}
                </td>
                <td className="px-md py-sm">{formatJakartaDateTime(admin.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </section>
  );
}
