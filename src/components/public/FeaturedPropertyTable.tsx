import { formatRupiah } from "@/lib/utils/formatting";
import type { PropertyStatus } from "@/types/property";
import { ArrowUpRight, Building2, MapPin, Tag } from "lucide-react";

interface FeaturedProperty {
  id: string;
  namaProperty: string;
  kawasan: string;
  tipe: string;
  priceRupiah: bigint;
  status: PropertyStatus;
  badge?: "Hot Area" | "Unit Terbatas" | "Baru";
}

interface FeaturedPropertyTableProps {
  properties: readonly FeaturedProperty[];
}

export function FeaturedPropertyTable({
  properties,
}: FeaturedPropertyTableProps): React.ReactElement {
  return (
    <div className="grid gap-md md:grid-cols-3">
      {properties.map((property) => (
        <article
          className="premium-card group p-lg transition-shadow hover:shadow-md"
          key={property.id}
        >
          <div className="mb-lg flex items-start justify-between gap-md">
            <span className="icon-tile">
              <Building2 aria-hidden="true" size={20} />
            </span>
            <div className="flex flex-col items-end gap-xs">
              {property.badge ? <span className="badge-gold">{property.badge}</span> : null}
              <span className="badge-success">Tersedia</span>
            </div>
          </div>
          <h3 className="text-title-md text-text-primary">{property.namaProperty}</h3>
          <div className="mt-md space-y-xs text-body-sm text-text-secondary">
            <p className="flex items-center gap-xs">
              <MapPin aria-hidden="true" className="text-accent-gold" size={16} />
              {property.kawasan}
            </p>
            <p className="flex items-center gap-xs">
              <Tag aria-hidden="true" className="text-accent-gold" size={16} />
              {property.tipe}
            </p>
          </div>
          <div className="mt-lg flex items-end justify-between gap-md border-t border-border-default pt-md">
            <p>
              <span className="block text-caption-muted text-text-muted">Mulai dari</span>
              <span className="text-title-md text-text-primary">
                {formatRupiah(property.priceRupiah)}
              </span>
            </p>
            <ArrowUpRight
              aria-hidden="true"
              className="text-text-muted transition-colors group-hover:text-accent-gold"
              size={20}
            />
          </div>
        </article>
      ))}
    </div>
  );
}
