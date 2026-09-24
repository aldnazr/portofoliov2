"use client";

import { useSearchParams } from "next/navigation";
import type { LearnConcept, Paradigm } from "../_data/types";
import { learnContent } from "../_data";
import ParadigmSwitcher from "./paradigm-switcher";
import CodeBlock from "./code-block";

type HighlightedParadigm = Record<Paradigm, Record<string, string>>;

type LearnExplorerProps = {
  /** Semua snippet sudah di-highlight di server, dikelompokkan per paradigma. */
  highlighted: HighlightedParadigm;
};

/** HTML highlight tersedia dari server, sehingga switch cukup memperbarui URL tanpa fetch ulang. */
export default function LearnExplorer({ highlighted }: LearnExplorerProps) {
  const searchParams = useSearchParams();
  const paradigm: Paradigm =
    searchParams.get("paradigm") === "oop" ? "oop" : "functional";

  function handleParadigmChange(nextParadigm: Paradigm) {
    const url = new URL(window.location.href);
    url.searchParams.set("paradigm", nextParadigm);
    window.history.replaceState(null, "", url);
  }

  const { label, tagline, concepts } = learnContent[paradigm];

  return (
    <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
      {/* Anchor navigation: disembunyikan di mobile, fixed di desktop */}
      <nav
        aria-label={`Daftar materi ${label}`}
        className="hidden lg:block lg:w-56 lg:shrink-0"
      >
        <div className="sticky top-28 space-y-4">
          <ParadigmSwitcher
            paradigm={paradigm}
            onChange={handleParadigmChange}
          />

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
          <ParadigmSwitcher
            paradigm={paradigm}
            onChange={handleParadigmChange}
          />
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
                lang={paradigm === "oop" ? "dart" : "ts"}
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
