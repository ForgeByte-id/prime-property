import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

export function PublicFooter(): React.ReactElement {
  return (
    <footer className="border-t border-border-default bg-prime-black px-lg py-xl text-on-dark">
      <div className="section-container grid gap-xl md:grid-cols-[minmax(280px,1.2fr)_minmax(280px,1fr)_minmax(180px,0.7fr)]">
        <div className="copy-measure">
          <span className="inline-flex rounded-xl bg-logo-surface px-md py-sm">
            <Image
              className="h-auto w-[144px]"
              src="/logo.png"
              alt="Prime Property"
              width={288}
              height={96}
            />
          </span>
          <p className="on-dark-copy mt-sm text-body-sm">
            Konsultan properti modern dengan data listing yang rapi, transparan, dan siap
            ditindaklanjuti.
          </p>
        </div>
        <div className="on-dark-copy space-y-sm text-body-sm">
          <p className="flex items-center gap-sm">
            <Phone aria-hidden="true" className="text-accent-gold" size={16} />
            +62 812 0000 0000
          </p>
          <p className="flex items-center gap-sm">
            <Mail aria-hidden="true" className="text-accent-gold" size={16} />
            halo@primeproperty.id
          </p>
          <p className="flex items-center gap-sm">
            <MapPin aria-hidden="true" className="text-accent-gold" size={16} />
            Jakarta, Indonesia
          </p>
        </div>
        <div className="on-dark-copy flex flex-col gap-xs text-body-sm">
          <Link href="/about">Tentang Kami</Link>
          <Link href="/contact">Kontak</Link>
          <Link href="/agent/login">Login Agent</Link>
        </div>
      </div>
    </footer>
  );
}
