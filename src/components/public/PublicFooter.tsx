import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

export function PublicFooter(): React.ReactElement {
  return (
    <footer className="border-t border-white/10 bg-prime-black px-md py-xl text-on-dark sm:px-lg">
      <div className="section-container grid gap-lg md:grid-cols-[minmax(280px,1.25fr)_minmax(280px,1fr)_minmax(160px,0.65fr)] md:items-start">
        <div className="copy-measure">
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
          <p className="on-dark-copy mt-sm text-body-sm">
            Konsultan properti modern dengan data listing yang rapi, transparan, dan siap
            ditindaklanjuti.
          </p>
        </div>
        <div className="on-dark-copy space-y-sm border-white/10 text-body-sm md:border-l md:pl-lg">
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
        <div className="on-dark-copy flex flex-col gap-xs border-t border-white/10 pt-md text-body-sm md:border-t-0 md:pt-0">
          <Link href="/about">Tentang Kami</Link>
          <Link href="/contact">Kontak</Link>
          <Link href="/agent/login">Login Agent</Link>
        </div>
      </div>
    </footer>
  );
}
