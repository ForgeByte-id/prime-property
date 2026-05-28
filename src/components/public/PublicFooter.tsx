import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";

export function PublicFooter(): React.ReactElement {
  return (
    <footer className="border-t border-white/10 bg-prime-black px-md py-xl text-on-dark sm:px-lg sm:py-section">
      <div className="section-container">
        <p className="max-w-4xl text-[clamp(2rem,6vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-on-dark">
          Properti bernilai tinggi membutuhkan keputusan yang rapi.
        </p>

        <div className="mt-xl grid gap-lg border-t border-white/10 pt-lg md:grid-cols-2 lg:grid-cols-[minmax(260px,1fr)_minmax(320px,1fr)_minmax(180px,0.55fr)] lg:items-start">
          <div className="min-w-0">
            <span className="inline-flex rounded-lg bg-logo-surface px-md py-sm">
              <Image
                className="h-auto w-[144px]"
                src="/logo-wordmark-640.png"
                alt="Prime Property"
                width={288}
                height={96}
                sizes="144px"
                unoptimized
              />
            </span>

            <p className="on-dark-copy text-body-md md:text-body-lg my-md text-white/74">
              Konsultan properti modern dengan data listing yang rapi,
              transparan, dan siap ditindaklanjuti.
            </p>
          </div>

          <div className="grid min-w-0 gap-sm text-body-sm text-white/74">
            <p className="flex min-w-0 items-start gap-sm leading-relaxed">
              <Phone
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-accent-gold"
                size={16}
              />
              <span className="min-w-0">+62 812 0000 0000</span>
            </p>

            <p className="flex min-w-0 items-start gap-sm leading-relaxed">
              <Mail
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-accent-gold"
                size={16}
              />
              <span className="min-w-0 break-words">
                halo@primeproperty.id
              </span>
            </p>

            <p className="flex min-w-0 items-start gap-sm leading-relaxed">
              <MapPin
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-accent-gold"
                size={16}
              />
              <span className="min-w-0">Jakarta, Indonesia</span>
            </p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="flex min-w-0 flex-col items-start gap-xs text-body-sm text-white/74 md:col-span-2 lg:col-span-1"
          >
            <Link className="footer-link" href="/about">
              Tentang Kami
            </Link>

            <Link className="footer-link" href="/contact">
              Kontak
            </Link>

            <Link
              className="footer-link inline-flex items-center gap-xs text-accent-gold"
              href="/agent/login"
            >
              Login Agent
              <ArrowRight aria-hidden="true" className="shrink-0" size={14} />
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}