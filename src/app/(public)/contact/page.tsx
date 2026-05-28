import { Clock3, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { ContactForm } from "@/components/public/ContactForm";
import { ScrollReveal } from "@/components/public/ScrollReveal";

export const metadata = {
  title: "Kontak",
};

export default function ContactPage(): React.ReactElement {
  return (
    <>
      <section className="public-hero-shell">
        <div className="section-container public-hero-grid">
          <div className="min-w-0">
            <p className="brand-pill inline-flex items-center gap-xs rounded-full border border-white/10 bg-white/5 px-sm py-xs text-caption font-semibold text-accent-gold">
              <MessageCircle aria-hidden="true" size={15} />
              Kontak Prime
            </p>
            <h1 className="hero-headline mt-lg">
              Bicarakan kebutuhan properti Anda.
            </h1>
          </div>
          <p className="hero-copy text-body-md md:text-body-lg">
            Kirim kebutuhan area, budget, tipe properti, dan timeline. Tim
            Prime Property akan menghubungi Anda untuk konsultasi awal.
          </p>
        </div>
      </section>

      <ScrollReveal>
        <section className="bg-soft-gray px-md py-xl sm:px-lg sm:py-section">
          <div className="section-container grid items-start gap-xl lg:grid-cols-[minmax(320px,420px)_minmax(0,1fr)]">
            <aside className="contact-info-panel">
              <Send aria-hidden="true" className="text-accent-gold" size={22} />
              <h2 className="mt-md text-title-md">Siapkan konteks singkat.</h2>
              <p className="mt-xs text-body-sm text-text-secondary">
                Area target, kisaran budget, tipe properti, dan timeline
                kebutuhan membantu agent memberi shortlist yang lebih relevan.
              </p>

              <div className="mt-lg grid gap-sm text-body-sm text-text-secondary">
                {[
                  [Phone, "+62 812 0000 0000"],
                  [Mail, "halo@primeproperty.id"],
                  [MapPin, "Jakarta, Indonesia"],
                  [Clock3, "Senin - Sabtu, 09.00 - 18.00 WIB"],
                ].map(([Icon, label]) => (
                  <p className="contact-info-row" key={label as string}>
                    <span>
                      <Icon aria-hidden="true" size={17} />
                    </span>
                    {label as string}
                  </p>
                ))}
              </div>
            </aside>

            <ContactForm />
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}
