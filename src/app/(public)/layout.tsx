import type { ReactNode } from "react";
import { PublicFooter } from "@/components/public/PublicFooter";
import { PublicHeader } from "@/components/public/PublicHeader";

export default function PublicLayout({
  children,
}: Readonly<{ children: ReactNode }>): React.ReactElement {
  return (
    <div className="flex min-h-screen flex-col bg-surface-card">
      <PublicHeader />
      <main className="flex-1">{children}</main>
      <PublicFooter />
    </div>
  );
}
