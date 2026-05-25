import Link from "next/link";
import { PropertyTableShell } from "@/components/internal/PropertyTableShell";

export const metadata = {
  title: "Dashboard Agent",
};

export default function DashboardPage(): React.ReactElement {
  return (
    <section className="space-y-lg">
      <div className="flex flex-col gap-md md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-caption font-semibold uppercase text-accent-gold">
            Dashboard
          </p>
          <h1 className="text-display-md">Listing Properti</h1>
        </div>
        <Link className="btn-primary" href="/agent/properties/new">
          Tambah Properti
        </Link>
      </div>
      <PropertyTableShell />
    </section>
  );
}
