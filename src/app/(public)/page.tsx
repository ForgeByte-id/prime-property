import { Suspense } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Clock3,
  Compass,
  FileSearch,
  Home,
  KeyRound,
  MapPinned,
  Search,
  ShieldCheck,
  WalletCards,
} from "lucide-react";
import {
  FeaturedPropertyTable,
  type FeaturedProperty,
} from "@/components/public/FeaturedPropertyTable";
import {
  listPublicFeaturedProperties,
  type PublicFeaturedProperty,
} from "@/lib/services/property.service";
import { ScrollReveal } from "@/components/public/ScrollReveal";

export const revalidate = 300;

interface FeaturedPropertiesResult {
  properties: FeaturedProperty[];
  state: "ready" | "empty" | "error";
}

function toFeaturedProperty(property: PublicFeaturedProperty): FeaturedProperty {
  return {
    id: property.id,
    namaProperty: property.namaProperty,
    kawasan: property.kawasan,
    tipe: property.tipe,
    priceRupiah: property.priceRupiah,
    status: property.status,
    badge: property.isFeatured ? "Unggulan" : undefined,
  };
}

async function getFeaturedPropertiesForHome(): Promise<FeaturedPropertiesResult> {
  try {
    const properties = await listPublicFeaturedProperties(6);
    return {
      properties: properties.map(toFeaturedProperty),
      state: properties.length > 0 ? "ready" : "empty",
    };
  } catch (error) {
    console.error("[public homepage featured properties]", error);
    return { properties: [], state: "error" };
  }
}

async function FeaturedPropertiesSection(): Promise<React.ReactElement> {
  const featuredProperties = await getFeaturedPropertiesForHome();

  return (
    <FeaturedPropertyTable
      properties={featuredProperties.properties}
      state={featuredProperties.state}
    />
  );
}

export default function HomePage(): React.ReactElement {
  return (
    <>
      <section className="public-hero-shell">
        <div className="section-container public-hero-grid">
          <div className="min-w-0">
            <p className="brand-pill inline-flex items-center gap-xs rounded-full border border-white/10 bg-white/5 px-sm py-xs text-caption font-semibold text-accent-gold">
              Prime Property Indonesia
            </p>
            <h1 className="hero-headline mt-lg">
              Advisory properti untuk keputusan bernilai tinggi.
            </h1>
            <p className="hero-copy mt-md text-body-md md:text-body-lg">
              Kurasi ruko dan villa dengan data ringkas, harga jelas, dan
              pendampingan agent yang fokus pada keputusan transaksi.
            </p>
            <div className="mt-lg flex flex-col gap-sm sm:flex-row">
              <Link className="btn-primary animated-cta w-full gap-xs sm:w-auto" href="/contact">
                <span>Konsultasi Sekarang</span>
                <ArrowRight aria-hidden="true" size={18} />
              </Link>
              <Link className="btn-outline-gold w-full sm:w-auto" href="/about">
                Lihat Cara Kerja
              </Link>
            </div>
          </div>

          <aside className="advisory-board" aria-label="Ringkasan layanan Prime Property">
            <div className="flex items-start justify-between gap-md border-b border-white/10 pb-md">
              <div>
                <p className="text-caption font-semibold text-accent-gold">Advisory Desk</p>
                <p className="mt-xs text-title-md text-on-dark">Shortlist siap tindak lanjut</p>
              </div>
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-accent-gold text-prime-black">
                <Building2 aria-hidden="true" size={21} />
              </span>
            </div>

            <div className="mt-md grid gap-xs">
              {[
                ["Kebutuhan", "Area, budget, tipe, timeline"],
                ["Validasi", "Harga, status, kawasan"],
                ["Next step", "Survei, follow-up, negosiasi"],
              ].map(([label, value]) => (
                <div className="advisory-row" key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>

            <div className="mt-lg grid grid-cols-3 gap-xs">
              {[
                ["Ruko", "Komersial"],
                ["Villa", "Premium"],
                ["Data", "Ringkas"],
              ].map(([value, label]) => (
                <div className="advisory-metric" key={value}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <ScrollReveal>
        <section className="bg-surface-card px-md py-xl sm:px-lg sm:py-section">
          <div className="section-container split-studio">
            <div className="content-measure">
              <p className="section-kicker">Mengapa Prime</p>
              <h2 className="section-heading mt-sm">
                Bukan sekadar listing. Setiap opsi dibuat mudah dibandingkan.
              </h2>
            </div>
            <div className="proof-grid">
              {[
                [ShieldCheck, "Legalitas terarah", "Informasi dokumen dan proses dipandu sejak konsultasi awal."],
                [MapPinned, "Kawasan terbaca", "Area dipilih berdasarkan akses, karakter lingkungan, dan kebutuhan transaksi."],
                [Clock3, "Respons jelas", "Follow-up agent dibuat ringkas agar keputusan tidak tertunda."],
                [KeyRound, "Data siap pakai", "Harga, status, tipe, dan atribut utama tersusun untuk scanning cepat."],
              ].map(([Icon, title, body]) => (
                <article className="proof-card" key={title as string}>
                  <Icon aria-hidden="true" className="text-accent-gold" size={22} />
                  <h3>{title as string}</h3>
                  <p>{body as string}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="bg-soft-gray px-md py-xl sm:px-lg sm:py-section">
          <div className="section-container grid gap-xl lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1fr)] lg:items-start">
            <div className="spec-panel">
              {[
                ["Residential Advisory", "Villa dan hunian premium", "Budget, akses, kesiapan unit"],
                ["Investment Property", "Ruko dan aset produktif", "Harga, kawasan, status"],
                ["Transaction Support", "Survei dan follow-up", "Jadwal, dokumen dasar, negosiasi"],
                ["Agent Matching", "Arahan agent relevan", "Area, tipe aset, kebutuhan transaksi"],
              ].map(([service, scope, focus]) => (
                <div className="spec-row" key={service}>
                  <span>{service}</span>
                  <strong>{scope}</strong>
                  <em>{focus}</em>
                </div>
              ))}
            </div>
            <div className="content-measure lg:pt-lg">
              <p className="section-kicker">Layanan</p>
              <h2 className="section-heading mt-sm">
                Pendampingan properti dari pencarian sampai keputusan transaksi.
              </h2>
              <p className="section-copy mt-sm">
                Dirancang untuk pembeli rumah, investor, dan pemilik bisnis
                yang membutuhkan rekomendasi properti dengan konteks lokasi dan
                harga yang jelas.
              </p>
              <Link className="mt-lg inline-flex items-center gap-xs text-button-md text-text-primary" href="/contact">
                Mulai konsultasi
                <ArrowRight aria-hidden="true" size={16} />
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="bg-surface-card px-md py-xl sm:px-lg sm:py-section">
          <div className="section-container">
            <div className="mb-lg flex flex-col gap-md md:flex-row md:items-end md:justify-between">
              <div className="content-measure">
                <p className="section-kicker">Properti Unggulan</p>
                <h2 className="section-heading mt-sm">
                  Pilihan properti yang siap dikonsultasikan.
                </h2>
              </div>
              <Link className="btn-outline-dark w-full gap-xs sm:w-auto" href="/contact">
                <span>Hubungi Agent</span>
                <ArrowRight aria-hidden="true" size={16} />
              </Link>
            </div>
            <Suspense fallback={<FeaturedPropertyTable properties={[]} state="loading" />}>
              <FeaturedPropertiesSection />
            </Suspense>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="bg-prime-black px-md py-xl text-on-dark sm:px-lg sm:py-section">
          <div className="section-container split-studio">
            <div className="content-measure">
              <p className="section-kicker">Cara Kerja</p>
              <h2 className="mt-sm text-display-md text-on-dark">
                Konsultasi properti tanpa proses yang berbelit.
              </h2>
            </div>
            <div className="timeline-panel">
              {[
                [Search, "Pilih kebutuhan", "Sampaikan area, budget, tipe properti, dan target transaksi."],
                [FileSearch, "Review listing", "Agent menyiapkan opsi paling relevan dan mudah dibandingkan."],
                [BadgeCheck, "Lanjut survei", "Jadwalkan kunjungan, validasi detail, dan proses negosiasi."],
              ].map(([Icon, title, body], index) => (
                <article className="timeline-step" key={title as string}>
                  <span className="timeline-index">{String(index + 1).padStart(2, "0")}</span>
                  <Icon aria-hidden="true" className="text-accent-gold" size={21} />
                  <div>
                    <h3>{title as string}</h3>
                    <p>{body as string}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="bg-soft-gray px-md py-xl sm:px-lg sm:py-section">
          <div className="section-container grid gap-xl lg:grid-cols-[minmax(320px,420px)_minmax(0,1fr)] lg:items-start">
            <div className="content-measure">
              <p className="section-kicker">Area Fokus</p>
              <h2 className="section-heading mt-sm">
                Rekomendasi berbasis kawasan, bukan sekadar daftar properti.
              </h2>
              <p className="section-copy mt-sm">
                Setiap area dinilai dari akses, karakter lingkungan, tren
                permintaan, dan kecocokan dengan tujuan hunian atau investasi.
              </p>
            </div>
            <div className="grid gap-md sm:grid-cols-2">
              {[
                [Compass, "Area premium", "Nusa Dua, Canggu, Sanur, dan area villa strategis."],
                [Building2, "Akses urban", "Ruko dan villa di kawasan dengan akses bisnis."],
                [WalletCards, "Aset produktif", "Ruko dan villa untuk kebutuhan usaha maupun investasi."],
                [Home, "Kebutuhan tinggal", "Unit siap huni dengan akses fasilitas dan mobilitas."],
              ].map(([Icon, title, body]) => (
                <article className="area-card" key={title as string}>
                  <Icon aria-hidden="true" className="text-accent-gold" size={22} />
                  <h3>{title as string}</h3>
                  <p>{body as string}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <section className="bg-surface-card px-md py-xl sm:px-lg sm:py-section">
        <div className="section-container final-cta">
          <div>
            <p className="text-caption font-semibold text-accent-gold">
              Siap mulai?
            </p>
            <h2 className="mt-sm max-w-3xl text-display-md text-on-dark">
              Dapatkan shortlist properti yang sesuai kebutuhan Anda.
            </h2>
          </div>
          <Link className="btn-primary w-full shrink-0 gap-xs sm:w-auto" href="/contact">
            <span>Hubungi Prime</span>
            <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
