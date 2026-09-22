import LearnPageShell from "./learn-page-shell";

/**
 * Baris kode skeleton dengan lebar bervariasi supaya menyerupai
 * panjang baris kode asli (cegah layout shift saat konten masuk).
 */
function CodeLine({ width }: { width: string }) {
  return <div className="skeleton h-3 rounded-full" style={{ width }} />;
}

/**
 * Fallback Suspense untuk area konten materi: tampil selama Shiki
 * meng-highlight snippet di server. Cermin layout explorer asli.
 */
export function ContentSkeleton() {
  return (
    <div className="flex flex-col gap-10 lg:flex-row lg:gap-12" aria-busy="true">
      <p role="status" aria-live="polite">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent-strong">
          Menyiapkan contoh kode
        </span>
        <span className="sr-only"> — memuat materi pembelajaran</span>
      </p>

      {/* Skeleton anchor navigation (desktop) */}
      <div className="hidden lg:block lg:w-56 lg:shrink-0" aria-hidden="true">
        <div className="sticky top-28 space-y-4">
          <div className="skeleton h-3 w-24 rounded-full" />
          <div className="space-y-1">
            {["60%", "48%", "55%", "42%", "50%"].map((width) => (
              <div key={width} className="skeleton h-8 rounded-lg" style={{ width }} />
            ))}
          </div>
        </div>
      </div>

      {/* Skeleton kartu kode */}
      <div className="flex-1 space-y-10 sm:space-y-12 min-w-0" aria-hidden="true">
        {[0, 1].map((card) => (
          <section key={card} className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="skeleton h-6 w-9 rounded-md" />
              <div className="skeleton h-6 w-52 rounded-lg" />
            </div>
            <div className="space-y-2">
              <CodeLine width="92%" />
              <CodeLine width="78%" />
            </div>
            <div className="rounded-2xl border border-hairline bg-surface-muted overflow-hidden">
              <div className="h-9 border-b border-hairline-soft bg-surface" />
              <div className="space-y-3 px-4 py-4">
                <CodeLine width="64%" />
                <CodeLine width="83%" />
                <CodeLine width="47%" />
                <CodeLine width="71%" />
                <CodeLine width="56%" />
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

/**
 * Loading UI server-side untuk seluruh segment `/learns`.
 * Dipakai `loading.tsx`; cermin layout halaman topik.
 */
export default function LearnSkeleton() {
  return (
    <LearnPageShell containerClassName="max-w-6xl">
      <div className="space-y-8" aria-busy="true" aria-live="polite">
        {/* Pill kembali */}
        <div className="skeleton h-8 w-48 rounded-full" aria-hidden="true" />

        {/* Header topik */}
        <header className="space-y-3" aria-hidden="true">
          <div className="skeleton h-8 w-72 max-w-full rounded-lg" />
          <div className="space-y-2 max-w-2xl">
            <CodeLine width="95%" />
            <CodeLine width="68%" />
          </div>
        </header>

        <ContentSkeleton />
      </div>
    </LearnPageShell>
  );
}