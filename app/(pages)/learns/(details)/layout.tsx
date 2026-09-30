import LearnPageShell from "@/features/learns/components/learn-page-shell";
import type { ReactNode } from "react";

/** Kerangka halaman detail topik: shell + konten topik. */
export default function LearnDetailsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <LearnPageShell>
      <div className="space-y-8">{children}</div>
    </LearnPageShell>
  );
}
