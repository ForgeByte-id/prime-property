import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Clock3,
  ClipboardCheck,
  Compass,
  Home,
  KeyRound,
  Landmark,
  MapPinned,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  WalletCards,
} from "lucide-react";
import { FeaturedPropertyTable } from "@/components/public/FeaturedPropertyTable";

const featuredProperties = [
  {
    id: "demo-1",
    namaProperty: "Cluster Nusa Dua Premium",
    kawasan: "Nusa Dua",
    tipe: "Villa",
    priceRupiah: 3850000000n,
    status: "in_stock",
    badge: "Hot Area",
  },
  {
    id: "demo-2",
    namaProperty: "Ruko Renon Strategis",
    kawasan: "Renon",
    tipe: "Ruko",
    priceRupiah: 2150000000n,
    status: "in_stock",
    badge: "Baru",
  },
  {
    id: "demo-3",
    namaProperty: "Villa Komersial Canggu",
    kawasan: "Canggu",
    tipe: "Villa",
    priceRupiah: 6300000000n,
    status: "in_stock",
    badge: "Unit Terbatas",
  },
  {
    id: "demo-4",
    namaProperty: "Ruko Premium Sunset Road",
    kawasan: "Seminyak",
    tipe: "Ruko",
    priceRupiah: 4900000000n,
    status: "in_stock",
    badge: "Hot Area",
  },
  {
    id: "demo-5",
    namaProperty: "Ruko Executive Sudirman",
    kawasan: "Jakarta Pusat",
    tipe: "Ruko",
    priceRupiah: 1850000000n,
    status: "in_stock",
    badge: "Baru",
  },
  {
    id: "demo-6",
    namaProperty: "Villa Leasehold Sanur",
    kawasan: "Sanur",
    tipe: "Villa",
    priceRupiah: 2750000000n,
    status: "in_stock",
    badge: "Unit Terbatas",
  },
] as const;

export default function HomePage(): React.ReactElement {
  return (
    <>
      <section className="relative overflow-hidden bg-prime-black px-md py-xl text-on-dark sm:px-lg sm:py-section">
        <div className="absolute inset-x-0 top-0 h-1 bg-accent-gold" />
        <div className="section-container grid gap-lg lg:grid-cols-[minmax(0,1fr)_minmax(440px,0.88fr)] lg:items-center lg:gap-xl">
          <div className="content-measure animate-rise">
            <span className="brand-pill inline-flex items-center gap-xs rounded-full border border-white/10 bg-white/5 px-sm py-xs text-caption font-semibold text-accent-gold">
              <Sparkles aria-hidden="true" size={15} />
              Prime Property Indonesia
            </span>
            <h1 className="mt-lg text-display-md text-on-dark sm:text-display-lg md:text-display-xl">
              Real estate advisory untuk properti bernilai tinggi.
            </h1>
            <p className="copy-measure on-dark-copy mt-md text-body-md md:text-body-lg">
              Temukan pilihan ruko dan villa dengan data
              ringkas, harga jelas, dan pendampingan agent profesional.
            </p>
            <div className="mt-lg flex flex-col gap-sm sm:flex-row">
              <Link className="btn-primary animated-cta w-full gap-xs sm:w-auto" href="/contact">
                <span>Konsultasi Sekarang</span>
                <ArrowRight aria-hidden="true" size={18} />
              </Link>
              <Link className="btn-outline-gold w-full sm:w-auto" href="/about">
                Tentang Prime
              </Link>
            </div>
            <div className="hero-stat-grid mt-xl">
              {[
                ["Data", "Listing ringkas"],
                ["Harga", "Format rupiah"],
                ["Role", "Portal internal"],
              ].map(([value, label]) => (
                <div key={label}>
                  <p className="text-title-md text-accent-gold">{value}</p>
                  <p className="on-dark-muted mt-xxs text-caption-muted">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel animate-rise animation-delay-2 p-sm sm:p-lg">
            <div className="rounded-lg border border-white/10 bg-prime-black-soft p-lg">
              <div className="flex flex-col gap-md sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="on-dark-muted text-caption">Workbench listing</p>
                  <p className="mt-xs text-display-md text-accent-gold">
                    Daftar kurasi
                  </p>
                </div>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent-gold text-prime-black">
                  <Building2 aria-hidden="true" size={22} />
                </span>
              </div>
              <div className="mt-lg grid gap-sm">
                {[
                  ["Villa Premium", "Nusa Dua", "Rp 3.850.000.000"],
                  ["Ruko Strategis", "Renon", "Rp 2.150.000.000"],
                  ["Villa Komersial", "Canggu", "Rp 6.300.000.000"],
                ].map(([name, area, price]) => (
                  <div
                    className="portfolio-row flex flex-col gap-sm rounded-lg border border-white/10 bg-white/[0.04] px-md py-sm sm:flex-row sm:items-center sm:justify-between sm:gap-md"
                    key={name}
                  >
                    <div>
                      <p className="text-body-sm font-semibold text-on-dark">{name}</p>
                      <p className="on-dark-muted mt-xxs flex items-center gap-xxs text-caption-muted">
                        <MapPinned aria-hidden="true" size={13} />
                        {area}
                      </p>
                    </div>
                    <p className="text-caption font-semibold text-accent-gold">{price}</p>
                  </div>
                ))}
              </div>
              <div className="mt-lg grid grid-cols-1 gap-sm border-t border-white/10 pt-lg text-center sm:grid-cols-3">
                {[
                  ["Ruko", "Komersial"],
                  ["Villa", "Premium"],
                  ["Siap", "Status"],
                ].map(([type, label]) => (
                  <div className="rounded-lg bg-white/[0.04] px-sm py-sm" key={type}>
                    <p className="text-body-sm font-semibold text-on-dark">{type}</p>
                    <p className="on-dark-muted mt-xxs text-caption-muted">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-card px-md py-xl sm:px-lg sm:py-section">
        <div className="section-container">
          <div className="split-heading-row animate-rise mb-lg">
            <div>
              <p className="section-kicker">Mengapa Prime</p>
              <h2 className="section-heading mt-sm content-measure">
                Informasi yang jelas sebelum Anda mengambil keputusan.
              </h2>
            </div>
            <p className="section-copy text-body-sm">
              Kami menyederhanakan proses pencarian properti dengan data inti yang mudah
              dibandingkan dan arahan agent yang terukur.
            </p>
          </div>
          <div className="grid gap-lg md:grid-cols-2 lg:grid-cols-4">
            {[
              [ShieldCheck, "Legalitas terarah", "Pendampingan informasi dokumen dan proses transaksi."],
              [MapPinned, "Lokasi strategis", "Kurasi area prospektif untuk hunian dan investasi."],
              [Clock3, "Respons cepat", "Komunikasi agent yang jelas dan mudah ditindaklanjuti."],
              [KeyRound, "Data siap pakai", "Informasi harga, status, dan atribut properti tersusun rapi."],
            ].map(([Icon, title, body]) => (
              <article className="premium-card animate-rise p-lg" key={title as string}>
                <span className="icon-tile">
                  <Icon aria-hidden="true" size={24} />
                </span>
                <h2 className="mt-md text-title-md">{title as string}</h2>
                <p className="mt-xs text-body-sm text-text-secondary">{body as string}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-soft-gray px-md py-xl sm:px-lg sm:py-section">
        <div className="section-container grid gap-xl lg:grid-cols-[380px_minmax(0,1fr)] lg:items-start">
          <div className="content-measure">
            <p className="section-kicker">Layanan</p>
            <h2 className="section-heading mt-sm">
              Pendampingan properti dari pencarian sampai keputusan transaksi.
            </h2>
            <p className="section-copy mt-sm">
              Dirancang untuk pembeli rumah, investor, dan pemilik bisnis yang membutuhkan
              rekomendasi properti dengan konteks lokasi dan harga yang jelas.
            </p>
          </div>
          <div className="grid gap-lg md:grid-cols-2">
            {[
              [
                Home,
                "Residential Advisory",
                "Kurasi ruko dan villa berdasarkan kebutuhan, budget, akses, dan kesiapan unit.",
              ],
              [
                Landmark,
                "Investment Property",
                "Review ruko dan aset villa dengan fokus lokasi, harga, status, dan potensi penggunaan.",
              ],
              [
                ClipboardCheck,
                "Transaction Support",
                "Pendampingan komunikasi, jadwal survei, dokumen dasar, dan follow-up negosiasi agar proses lebih jelas.",
              ],
            ].map(([Icon, title, body]) => (
              <article className="premium-card animate-rise p-lg" key={title as string}>
                <span className="icon-tile">
                  <Icon aria-hidden="true" size={24} />
                </span>
                <h3 className="mt-lg text-title-md">{title as string}</h3>
                <p className="mt-sm text-body-sm text-text-secondary">{body as string}</p>
                <Link className="mt-lg inline-flex items-center gap-xs text-button-md text-text-primary" href="/contact">
                  Konsultasi
                  <ArrowRight aria-hidden="true" size={16} />
                </Link>
              </article>
            ))}
            <article className="premium-card bg-prime-black p-lg text-on-dark">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent-gold text-prime-black">
                <Users aria-hidden="true" size={24} />
              </span>
              <h3 className="mt-lg text-title-md text-on-dark">Agent Matching</h3>
              <p className="on-dark-copy mt-sm text-body-sm">
                Customer diarahkan ke agent yang memahami area, tipe properti, dan
                kebutuhan transaksi yang relevan.
              </p>
              <Link className="mt-lg inline-flex items-center gap-xs text-button-md text-accent-gold" href="/contact">
                Mulai konsultasi
                <ArrowRight aria-hidden="true" size={16} />
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-surface-card px-md py-xl sm:px-lg sm:py-section">
        <div className="section-container">
          <div className="mb-lg content-measure">
            <p className="section-kicker">Tipe Properti</p>
            <h2 className="section-heading mt-sm">
              Pilihan aset untuk kebutuhan tinggal, investasi, dan bisnis.
            </h2>
          </div>
          <div className="grid gap-md md:grid-cols-2 lg:grid-cols-4">
            {[
              [Home, "Ruko", "Aset usaha dengan akses aktivitas harian."],
              [Building2, "Villa", "Properti premium untuk lifestyle dan rental income."],
              [Landmark, "Kawasan", "Konteks lokasi untuk membandingkan pilihan unit."],
              [WalletCards, "Komersial", "Ruko dan villa produktif untuk kebutuhan bisnis."],
            ].map(([Icon, title, body]) => (
              <article className="premium-card-muted animate-rise p-lg" key={title as string}>
                <Icon aria-hidden="true" className="text-accent-gold" size={22} />
                <h3 className="mt-md text-title-md">{title as string}</h3>
                <p className="mt-xs text-body-sm text-text-secondary">{body as string}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-soft-gray px-md py-xl sm:px-lg sm:py-section">
        <div className="section-container">
          <div className="split-heading-row mb-lg">
            <div>
              <p className="section-kicker">Properti Unggulan</p>
              <h2 className="section-heading mt-sm content-measure">
                Pilihan properti yang siap dikonsultasikan.
              </h2>
            </div>
            <div className="flex md:justify-end">
              <Link className="btn-outline-dark w-full gap-xs sm:w-auto" href="/contact">
                <span>Hubungi Agent</span>
                <ArrowRight aria-hidden="true" size={16} />
              </Link>
            </div>
          </div>
          <FeaturedPropertyTable properties={featuredProperties} />
        </div>
      </section>

      <section className="bg-prime-black px-md py-xl text-on-dark sm:px-lg sm:py-section">
        <div className="section-container grid gap-xl lg:grid-cols-[380px_minmax(0,1fr)] lg:items-center">
          <div className="content-measure">
            <p className="section-kicker">Cara Kerja</p>
            <h2 className="mt-sm text-display-md text-on-dark">
              Konsultasi properti tanpa proses yang berbelit.
            </h2>
          </div>
          <div className="grid gap-md md:grid-cols-3">
            {[
              [Search, "Pilih kebutuhan", "Sampaikan area, budget, tipe properti, dan target transaksi."],
              [BadgeCheck, "Review listing", "Agent menyiapkan opsi paling relevan dan mudah dibandingkan."],
              [KeyRound, "Lanjut survei", "Jadwalkan kunjungan, validasi detail, dan proses negosiasi."],
            ].map(([Icon, title, body]) => (
              <article className="process-card rounded-lg border border-white/10 bg-white/[0.04] p-lg" key={title as string}>
                <Icon aria-hidden="true" className="text-accent-gold" size={22} />
                <h3 className="mt-md text-title-md text-on-dark">{title as string}</h3>
                <p className="on-dark-copy mt-xs text-body-sm">{body as string}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-soft-gray px-md py-xl sm:px-lg sm:py-section">
        <div className="section-container grid gap-xl lg:grid-cols-[420px_minmax(0,1fr)] lg:items-start">
          <div className="content-measure">
            <p className="section-kicker">Area Fokus</p>
            <h2 className="section-heading mt-sm">
              Rekomendasi berbasis kawasan, bukan sekadar daftar properti.
            </h2>
            <p className="section-copy mt-sm">
              Setiap area dinilai dari akses, karakter lingkungan, tren permintaan,
              dan kecocokan dengan tujuan hunian atau investasi.
            </p>
          </div>
          <div className="grid gap-md sm:grid-cols-2">
            {[
              [Compass, "Area premium", "Nusa Dua, Canggu, Sanur, dan area villa strategis."],
              [Building2, "Akses urban", "Ruko dan villa di kawasan dengan akses bisnis."],
              [WalletCards, "Aset produktif", "Ruko dan villa untuk kebutuhan usaha maupun investasi."],
              [Users, "Kebutuhan tinggal", "Unit siap huni dengan akses fasilitas dan mobilitas."],
            ].map(([Icon, title, body]) => (
              <article className="premium-card-muted p-lg" key={title as string}>
                <Icon aria-hidden="true" className="text-accent-gold" size={22} />
                <h3 className="mt-md text-title-md">{title as string}</h3>
                <p className="mt-xs text-body-sm text-text-secondary">{body as string}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-card px-md py-xl sm:px-lg sm:py-section">
        <div className="section-container flex flex-col gap-lg rounded-lg bg-prime-black p-lg text-on-dark sm:p-xl md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-caption font-semibold text-accent-gold">
              Siap mulai?
            </p>
            <h2 className="mt-sm max-w-2xl text-display-md text-on-dark">
              Dapatkan shortlist properti yang sesuai kebutuhan Anda.
            </h2>
          </div>
          <Link className="btn-primary w-full gap-xs shrink-0 sm:w-auto" href="/contact">
            <span>Hubungi Prime</span>
            <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
