import type { Metadata } from "next";
import RenderingDemo from "@/features/learns/components/rendering-demo";
import { highlightCode } from "@/features/learns/data/highlight";

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = {
  title: "SSG - Static Site Generation | Interactive Learning Lab",
  description:
    "Halaman SSG Next.js: HTML dibuat saat build dan dipakai ulang untuk setiap request sampai build berikutnya.",
};

const snippet = `export const dynamic = "force-static";
export const revalidate = false;

export default function Page() {
  const timestamp = new Date().toISOString();
  return <time dateTime={timestamp}>{timestamp}</time>;
}`;

export default async function SsgPage() {
  const timestamp = new Date().toISOString();
  const highlightedHtml = await highlightCode(snippet, "typescript");

  return (
    <RenderingDemo
      label="Static Site Generation"
      title="SSG"
      description="HTML dibuat saat build dan dipakai ulang untuk setiap request sampai build berikutnya."
      usageDescription="Halaman dokumentasi atau konten yang jarang berubah."
      snippet={snippet}
      highlightedHtml={highlightedHtml}
    >
      <section
        aria-labelledby="result-heading"
        className="space-y-4 rounded-2xl border border-hairline bg-surface-muted p-6 sm:p-8"
      >
        <h2
          id="result-heading"
          className="font-mono text-xs font-medium uppercase tracking-wider text-muted"
        >
          Waktu render
        </h2>
        <p className="text-foreground">
          Timestamp:{" "}
          <time
            dateTime={timestamp}
            data-demo-timestamp
            className="rounded bg-accent-wash px-2 py-1 font-mono text-sm text-accent-strong"
          >
            {timestamp}
          </time>
        </p>
        <div className="space-y-1 text-sm text-muted">
          <p>Lokasi render: saat build Next.js.</p>
          <p>Perilaku refresh: timestamp tetap sama sampai build berikutnya.</p>
        </div>
      </section>
    </RenderingDemo>
  );
}
