"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { LearnConcept, Paradigm } from "../_data/types";
import { learnContent, parseParadigm } from "../_data";
import ParadigmSwitcher from "./paradigm-switcher";
import CodeBlock from "./code-block";

type HighlightedParadigm = Record<Paradigm, Record<string, string>>;

type LearnExplorerProps = {
  /** Paradigma awal dari server (berdasarkan URL search param). */
  initialParadigm: Paradigm;
  /** Semua snippet sudah di-highlight di server, dikelompokkan per paradigma. */
  highlighted: HighlightedParadigm;
};

/**
 * Mengelola state paradigma di client: perpindahan antar tab instan karena
 * HTML highlight sudah disediakan dari server, sementara URL tetap diperbarui
 * supaya tautan bisa dibagikan.
 */
export default function LearnExplorer({
  initialParadigm,
  highlighted,
}: LearnExplorerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [paradigm, setParadigm] = useState<Paradigm>(initialParadigm);

  const selectParadigm = useCallback(
    (next: Paradigm) => {
      if (next === paradigm) return;
      setParadigm(next);
      // Sinkronkan ke URL tanpa reload agar bisa di-share.
      router.replace(`${pathname}?paradigm=${next}`, { scroll: false });
    },
    [paradigm, pathname, router],
  );

  // Tangani navigasi browser (back/forward) atau perubahan URL dari luar.
  useEffect(() => {
    setParadigm(parseParadigm(searchParams.get("paradigm") ?? undefined));
  }, [searchParams]);

  const { label, tagline, concepts } = learnContent[paradigm];

  return (
    <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
      {/* Anchor navigation: disembunyikan di mobile, fixed di desktop */}
      <nav
        aria-label={`Daftar materi ${label}`}
        className="hidden lg:block lg:w-56 lg:shrink-0"
      >
        <div className="sticky top-28 space-y-4">
          <ParadigmSwitcher paradigm={paradigm} onChange={selectParadigm} />

          <div className="space-y-1">
            {concepts.map((concept) => (
              <ConceptLink key={concept.id} concept={concept} />
            ))}
          </div>
        </div>
      </nav>

      {/* Konten paradigma aktif */}
      <div
        id="paradigm-panel"
        role="tabpanel"
        aria-labelledby={`paradigm-tab-${paradigm}`}
        className="flex-1 space-y-8 min-w-0"
      >
        <header className="space-y-4 lg:hidden">
          <ParadigmSwitcher paradigm={paradigm} onChange={selectParadigm} />
        </header>

        <div className="space-y-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent-strong">
            Paradigma {label}
          </p>
          <p className="text-sm sm:text-base text-muted leading-relaxed">
            {tagline}
          </p>
        </div>

        <div className="space-y-10 sm:space-y-12">
          {concepts.map((concept, index) => (
            <section
              key={concept.id}
              id={concept.id}
              aria-labelledby={`${concept.id}-title`}
              className="scroll-mt-28 space-y-5"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-accent-strong px-2.5 py-1 rounded-md bg-accent-wash border border-accent-wash-border">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3
                  id={`${concept.id}-title`}
                  className="text-lg sm:text-xl font-semibold text-foreground tracking-tight"
                >
                  {concept.title}
                </h3>
              </div>

              <p className="text-sm sm:text-base text-foreground-soft leading-relaxed">
                {concept.description}
              </p>

              <CodeBlock
                highlightedHtml={highlighted[paradigm][concept.id]}
                code={concept.code}
                filename={concept.filename}
              />
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Link jangkar ke section konsep. */
function ConceptLink({ concept }: { concept: LearnConcept }) {
  return (
    <a
      href={`#${concept.id}`}
      className="block rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-overlay hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      {concept.title}
    </a>
  );
}
