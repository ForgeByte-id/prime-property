import { formatRupiah } from "@/lib/utils/formatting";
import type { PropertyStatus } from "@/types/property";
import { AlertCircle, ArrowUpRight, Building2, MapPin, Search, Tag } from "lucide-react";

export interface FeaturedProperty {
  id: string;
  namaProperty: string;
  kawasan: string;
  tipe: string;
  priceRupiah: bigint;
  status: PropertyStatus;
  badge?: string;
}

interface FeaturedPropertyTableProps {
  properties: readonly FeaturedProperty[];
  state?: "ready" | "empty" | "error" | "loading";
}

export function FeaturedPropertyTable({
  properties,
  state = properties.length > 0 ? "ready" : "empty",
}: FeaturedPropertyTableProps): React.ReactElement {
  if (state === "loading") {
    return (
      <div className="featured-ledger-state" role="status">
        <Search aria-hidden="true" className="text-accent-gold" size={22} />
        <h3>Memuat properti unggulan.</h3>
        <p>Daftar pilihan sedang disiapkan dari inventory Prime Property.</p>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="featured-ledger-state" role="status">
        <AlertCircle aria-hidden="true" className="text-accent-gold" size={22} />
        <h3>Properti unggulan belum dapat ditampilkan.</h3>
        <p>Silakan hubungi agent Prime Property untuk mendapatkan shortlist terbaru.</p>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="featured-ledger-state" role="status">
        <Search aria-hidden="true" className="text-accent-gold" size={22} />
        <h3>Belum ada properti unggulan aktif.</h3>
        <p>Tim Prime Property sedang menyiapkan pilihan yang siap dikonsultasikan.</p>
      </div>
    );
  }

  return (
    <div className="featured-ledger">
      {properties.map((property) => (
        <article
          className="featured-ledger-row group"
          key={property.id}
        >
          <div className="flex min-w-0 items-start gap-md">
            <span className="featured-ledger-icon">
              <Building2 aria-hidden="true" size={20} />
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-xs">
                {property.badge ? <span className="badge-gold">{property.badge}</span> : null}
                <span className="badge-success">Tersedia</span>
              </div>
              <h3 className="mt-sm text-title-md text-text-primary">{property.namaProperty}</h3>
              <div className="mt-xs flex flex-wrap gap-sm text-body-sm text-text-secondary">
                <p className="flex items-center gap-xxs">
                  <MapPin aria-hidden="true" className="text-accent-gold" size={15} />
                  {property.kawasan}
                </p>
                <p className="flex items-center gap-xxs">
                  <Tag aria-hidden="true" className="text-accent-gold" size={15} />
                  {property.tipe}
                </p>
              </div>
            </div>
          </div>

          <div className="featured-ledger-price">
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
