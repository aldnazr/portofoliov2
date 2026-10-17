import type { Metadata } from "next";
import RenderingDemo from "@/features/learns/components/rendering-demo";
import { highlightCode } from "@/features/learns/data/highlight";

export const dynamic = "force-static";
export const revalidate = 10;

export const metadata: Metadata = {
  title: "ISR - Incremental Static Regeneration | Interactive Learning Lab",
  description:
    "Halaman ISR Next.js: HTML statis disimpan dan diregenerasi setelah interval 10 detik.",
};

const snippet = `export const dynamic = "force-static";
export const revalidate = 10;

export default function Page() {
  const timestamp = new Date().toISOString();
  return <time dateTime={timestamp}>{timestamp}</time>;
}`;

export default async function IsrPage() {
  const timestamp = new Date().toISOString();
  const highlightedHtml = await highlightCode(snippet, "typescript");

  return (
    <RenderingDemo
      label="Incremental Static Regeneration"
      title="ISR"
      description="HTML statis disimpan dan diregenerasi secara berkala setelah interval 10 detik."
      usageDescription="Halaman katalog atau berita yang boleh sedikit tertinggal dari data sumber."
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
        <div className="space-y-1 text-sm text-muted leading-relaxed">
          <p>Lokasi render: saat build, lalu saat regenerasi setelah interval.</p>
          <p>
            Perilaku refresh: request setelah 10 detik memicu regenerasi di
            belakang layar. Respons tersebut dapat berisi versi lama; request
            berikutnya menerima hasil baru. Halaman tidak diperbarui otomatis di
            browser.
          </p>
        </div>
      </section>
    </RenderingDemo>
  );
}
