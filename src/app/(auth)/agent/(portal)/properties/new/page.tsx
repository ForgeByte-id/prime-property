import { PropertyForm } from "@/components/internal/PropertyForm";
import { Plus } from "lucide-react";

export const metadata = {
  title: "Tambah Properti",
};

export default function NewPropertyPage(): React.ReactElement {
  return (
    <section className="space-y-lg">
      <div className="dashboard-surface p-lg">
        <div className="flex items-start gap-md">
          <span className="metric-icon mt-1">
            <Plus aria-hidden="true" size={18} />
          </span>
          <div>
            <p className="text-caption font-semibold uppercase text-accent-gold">Superadmin</p>
            <h1 className="text-display-md">Tambah Properti</h1>
            <p className="mt-xs text-body-sm text-text-secondary">Input semua field wajib sesuai acceptance criteria.</p>
          </div>
        </div>
      </div>
      <div className="mt-lg">
        <PropertyForm />
      </div>
    </section>
  );
}
