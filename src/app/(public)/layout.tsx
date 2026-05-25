import type { ReactNode } from "react";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({
  children,
}: PublicLayoutProps): React.ReactElement {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <PublicHeader />

      <main className="public-page-animate">
        {children}
      </main>

      <PublicFooter />
    </div>
  );
}