import type { ReactNode } from "react";
import { InternalShell } from "@/components/internal/InternalShell";

export default function AgentPortalLayout({
  children,
}: Readonly<{ children: ReactNode }>): React.ReactElement {
  return <InternalShell>{children}</InternalShell>;
}
