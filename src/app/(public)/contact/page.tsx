import { Clock3, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { ContactForm } from "@/components/public/ContactForm";

export const metadata = {
  title: "Kontak",
};

export default function ContactPage(): React.ReactElement {
  return (
    <section className="bg-soft-gray px-lg py-section">
      <div className="section-container grid items-start gap-xl lg:grid-cols-[420px_minmax(0,1fr)]">
        <div className="copy-measure">
          <span className="icon-tile">
            <MessageCircle aria-hidden="true" size={24} />
          </span>
          <p className="mt-lg text-caption font-semibold text-accent-gold">Kontak</p>
          <h1 className="mt-sm text-display-lg">Bicarakan kebutuhan properti Anda.</h1>
          <p className="section-copy mt-sm">
            Kirim kebutuhan area, budget, dan tipe properti. Tim Prime Property akan
            menghubungi Anda untuk konsultasi awal.
          </p>
          <div className="mt-lg grid gap-sm text-body-sm text-text-secondary">
            {[
              [Phone, "+62 812 0000 0000"],
              [Mail, "halo@primeproperty.id"],
              [MapPin, "Jakarta, Indonesia"],
              [Clock3, "Senin - Sabtu, 09.00 - 18.00 WIB"],
            ].map(([Icon, label]) => (
              <p className="flex items-center gap-sm" key={label as string}>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-surface-card text-accent-gold shadow-sm">
                  <Icon aria-hidden="true" size={17} />
                </span>
                {label as string}
              </p>
            ))}
          </div>
          <div className="mt-xl rounded-lg border border-border-default bg-surface-card p-lg">
            <Send aria-hidden="true" className="text-accent-gold" size={22} />
            <h2 className="mt-md text-title-md">Apa yang perlu disiapkan?</h2>
            <p className="mt-xs text-body-sm text-text-secondary">
              Area target, kisaran budget, tipe properti, dan timeline kebutuhan. Informasi
              ini membantu agent memberi shortlist yang lebih relevan.
            </p>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
