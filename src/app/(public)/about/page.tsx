import {
  BadgeCheck,
  Building2,
  FileCheck2,
  Handshake,
  LineChart,
  ShieldCheck,
  Users,
} from "lucide-react";

export const metadata = {
  title: "Tentang Kami",
};

export default function AboutPage(): React.ReactElement {
  return (
    <>
      <section className="bg-prime-black px-lg py-section text-on-dark">
        <div className="mx-auto max-w-container">
          <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-sm py-xs text-caption font-semibold uppercase text-accent-gold backdrop-blur-md">
            Tentang Prime Property
          </p>
          <h1 className="mt-sm max-w-4xl text-display-lg text-on-dark">
            Partner real estate yang menggabungkan kurasi properti, data rapi,
            dan komunikasi yang jelas.
          </h1>
          <p className="on-dark-copy mt-md max-w-2xl text-body-md">
            Kami membantu customer mengambil keputusan properti dengan pendekatan yang
            terstruktur: memahami kebutuhan, menyeleksi listing, dan mendampingi proses
            sampai tahap follow-up transaksi.
          </p>
        </div>
      </section>

      <section className="px-lg py-section">
        <div className="mx-auto grid max-w-container gap-xl lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="icon-tile">
              <Building2 aria-hidden="true" size={24} />
            </span>
            <h2 className="mt-lg text-display-md">Fokus pada keputusan properti yang tepat.</h2>
            <p className="mt-sm text-body-md text-text-secondary">
              Prime Property membantu customer memahami pilihan properti melalui informasi
              yang ringkas, harga yang ditampilkan jelas, dan arahan agent yang praktis.
            </p>
          </div>

          <div className="grid gap-md md:grid-cols-2">
            {[
              [ShieldCheck, "Transparan", "Data utama properti disusun agar mudah dibandingkan."],
              [BadgeCheck, "Terkurasi", "Listing dipilih berdasarkan relevansi area, tipe, dan status."],
              [Handshake, "Profesional", "Pendampingan dari konsultasi awal sampai follow-up transaksi."],
              [Building2, "Operasional rapi", "Inventory internal dikelola dengan portal berbasis role."],
            ].map(([Icon, title, body]) => (
              <article className="premium-card p-lg" key={title as string}>
                <Icon aria-hidden="true" className="text-accent-gold" size={22} />
                <h3 className="mt-md text-title-md">{title as string}</h3>
                <p className="mt-xs text-body-sm text-text-secondary">{body as string}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-soft-gray px-lg py-section">
        <div className="mx-auto max-w-container">
          <div className="mb-lg max-w-3xl">
            <p className="text-caption font-semibold uppercase text-accent-gold">
              Standar Kerja
            </p>
            <h2 className="mt-sm text-display-md">
              Proses yang rapi untuk kebutuhan pembeli, investor, dan pemilik aset.
            </h2>
          </div>
          <div className="grid gap-lg md:grid-cols-3">
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
            ].map(([Icon, title, body]) => (
              <article className="premium-card p-xl" key={title as string}>
                <span className="icon-tile">
                  <Icon aria-hidden="true" size={24} />
                </span>
                <h3 className="mt-lg text-title-lg">{title as string}</h3>
                <p className="mt-sm text-body-sm text-text-secondary">{body as string}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
