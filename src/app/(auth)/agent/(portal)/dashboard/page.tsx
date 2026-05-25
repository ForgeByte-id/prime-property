import Link from "next/link";
import { cookies } from "next/headers";
import { Plus, TableProperties } from "lucide-react";
import { PropertyTableShell } from "@/components/internal/PropertyTableShell";
import { getSessionFromCookie } from "@/lib/auth/session";

export const metadata = {
  title: "Dashboard Agent",
};

export default async function DashboardPage(): Promise<React.ReactElement> {
  const cookieStore = await cookies();
  const user = await getSessionFromCookie(cookieStore.get("pp_session")?.value);
  const canCreate = user?.role === "superadmin";

  return (
    <section className="space-y-lg">
      <div className="dashboard-surface overflow-hidden p-lg">
        <div className="flex flex-col gap-md md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-md">
            <span className="metric-icon mt-1">
              <TableProperties aria-hidden="true" size={18} />
            </span>
            <div>
              <p className="text-caption font-semibold uppercase text-accent-gold">
                Dashboard
              </p>
              <h1 className="text-display-md">Listing Properti</h1>
              <p className="mt-xs max-w-2xl text-body-sm text-text-secondary">
                Kelola inventory internal dengan pencarian, sorting, pagination, dan akses berbasis role.
              </p>
            </div>
          </div>
          {canCreate ? (
            <Link className="btn-primary gap-xs" href="/agent/properties/new">
              <Plus aria-hidden="true" size={17} />
              Tambah Properti
            </Link>
          ) : null}
        </div>
      </div>
      <PropertyTableShell canCreate={canCreate} />
    </section>
  );
}
