import type { ReactNode } from "react";
import LearnPageShell from "../_components/learn-page-shell";

/** Kerangka halaman detail topik: shell + konten topik. */
export default function LearnDetailsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <LearnPageShell>
      <div className="space-y-8">
        {children}
      </div>
    </LearnPageShell>
  );
}