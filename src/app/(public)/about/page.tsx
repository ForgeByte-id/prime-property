import {
  BadgeCheck,
  Building2,
  FileCheck2,
  Handshake,
  LineChart,
  ShieldCheck,
  Users,
} from "lucide-react";
import { ScrollReveal } from "@/components/public/ScrollReveal";

export const metadata = {
  title: "Tentang Kami",
};

export default function AboutPage(): React.ReactElement {
  return (
    <>
      <section className="public-hero-shell">
        <div className="section-container public-hero-grid">
          <div className="min-w-0">
            <p className="brand-pill inline-flex rounded-full border border-white/10 bg-white/5 px-sm py-xs text-caption font-semibold text-accent-gold">
              Tentang Prime Property
            </p>
            <h1 className="hero-headline mt-lg">
              Kurasi properti yang rapi, transparan, dan mudah ditindaklanjuti.
            </h1>
          </div>
          <p className="hero-copy text-body-md md:text-body-lg">
            Kami membantu customer mengambil keputusan properti dengan
            memahami kebutuhan, menyeleksi listing, dan mendampingi proses
            sampai tahap follow-up transaksi.
          </p>
        </div>
      </section>

      <ScrollReveal>
        <section className="bg-surface-card px-md py-xl sm:px-lg sm:py-section">
          <div className="section-container split-studio">
            <div className="content-measure">
              <span className="icon-tile">
                <Building2 aria-hidden="true" size={24} />
              </span>
              <h2 className="section-heading mt-lg">
                Fokus pada keputusan properti yang tepat.
              </h2>
              <p className="section-copy mt-sm">
                Prime Property membantu customer memahami pilihan properti
                melalui informasi yang ringkas, harga yang jelas, dan arahan
                agent yang praktis.
              </p>
            </div>

            <div className="proof-grid">
              {[
                [ShieldCheck, "Transparan", "Data utama properti disusun agar mudah dibandingkan."],
                [BadgeCheck, "Terkurasi", "Listing dipilih berdasarkan relevansi area, tipe, dan status."],
                [Handshake, "Profesional", "Pendampingan dari konsultasi awal sampai follow-up transaksi."],
                [Building2, "Operasional rapi", "Inventory internal dikelola dengan portal berbasis role."],
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
          <div className="section-container grid gap-xl lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
            <div className="content-measure">
              <p className="section-kicker">Standar Kerja</p>
              <h2 className="section-heading mt-sm">
                Proses yang rapi untuk pembeli, investor, dan pemilik aset.
              </h2>
            </div>

            <div className="timeline-panel bg-surface-card text-text-primary">
              {[
                [
                  Users,
                  "Discovery",
                  "Memahami tujuan, budget, area prioritas, timeline, dan preferensi properti.",
                ],
                [
                  LineChart,
                  "Market Review",
                  "Membandingkan opsi berdasarkan kawasan, harga, status, dan potensi penggunaan.",
                ],
                [
                  FileCheck2,
                  "Transaction Readiness",
                  "Menyiapkan informasi penting sebelum survei, negosiasi, dan proses dokumen.",
                ],
              ].map(([Icon, title, body], index) => (
                <article className="timeline-step light" key={title as string}>
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
    </>
  );
}
