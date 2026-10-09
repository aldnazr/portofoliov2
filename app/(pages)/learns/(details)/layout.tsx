import PageShell from "@/components/page-shell";
import type { ReactNode } from "react";

/** Kerangka halaman detail topik: shell + konten topik. */
export default function LearnDetailsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <PageShell backHref="/learns" backLabel="Kembali ke Daftar Topik">
      <div className="space-y-8">{children}</div>
    </PageShell>
  );
}
