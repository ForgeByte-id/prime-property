import Image from "next/image";
import Link from "next/link";
import { LockKeyhole, TableProperties, UserRoundCheck } from "lucide-react";
import { LoginForm } from "@/components/internal/LoginForm";

export const metadata = {
  title: "Login Agent",
};

export default function LoginPage(): React.ReactElement {
  return (
    <main className="flex min-h-screen items-center justify-center bg-soft-gray px-md py-xl sm:px-lg">
      <section className="grid w-full max-w-[980px] overflow-hidden rounded-2xl border border-border-default bg-neutral-white shadow-md lg:grid-cols-[390px_1fr]">
        <div className="relative hidden min-h-[560px] bg-prime-black p-xl text-on-dark lg:flex lg:flex-col">
          <div className="absolute inset-x-0 top-0 h-1 bg-accent-gold" />
          <div className="absolute bottom-0 right-0 h-28 w-28 rounded-tl-[64px] bg-accent-red/20" />
          <Link className="w-fit rounded-xl bg-neutral-white px-md py-sm" href="/">
            <Image
              className="h-auto w-[150px]"
              src="/logo.png"
              alt="Prime Property"
              width={300}
              height={100}
              priority
            />
          </Link>

          <div className="relative mt-auto">
            <p className="text-caption font-semibold uppercase text-accent-gold">
              Portal Agent
            </p>
            <h1 className="mt-sm max-w-[300px] text-display-md text-on-dark">
              Dashboard listing untuk tim internal.
            </h1>
            <p className="on-dark-copy mt-sm max-w-[300px] text-body-sm">
              Masuk untuk melihat inventory, detail properti, dan data operasional
              Prime Property.
            </p>
            <div className="mt-lg grid gap-sm">
              {[
                [TableProperties, "Listing terstruktur"],
                [UserRoundCheck, "Akses sesuai role"],
                [LockKeyhole, "Session aman"],
              ].map(([Icon, label]) => (
                <div
                  className="flex items-center gap-sm rounded-xl border border-white/10 bg-white/[0.04] px-md py-sm"
                  key={label as string}
                >
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-accent-gold text-prime-black">
                    <Icon aria-hidden="true" size={16} />
                  </span>
                  <span className="text-body-sm font-semibold text-on-dark">{label as string}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex min-h-[560px] items-center justify-center px-lg py-xl sm:px-xl">
          <div className="w-full max-w-[400px]">
            <Link
              className="mb-xl inline-flex rounded-md bg-neutral-white px-md py-sm shadow-sm lg:hidden"
              href="/"
            >
              <Image
                className="h-auto w-[144px]"
                src="/logo.png"
                alt="Prime Property"
                width={288}
                height={96}
                priority
              />
            </Link>
            <LoginForm />
          </div>
        </div>
      </section>
    </main>
  );
}
