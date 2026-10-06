"use client";

import { useSearchParams } from "next/navigation";
import { LearnConcept } from "../data/types";
import CodeBlock from "./code-block";
import SegmentedSwitcher from "./segmented-switcher";

export type ExplorerGroup = {
  concepts: LearnConcept[];
  /** HTML highlight dari server untuk konsep di grup ini. */
  highlighted: Record<string, string>;
  /** Eyebrow di atas panel (opsional). */
  eyebrow?: string;
  /** Tagline singkat di bawah eyebrow (opsional). */
  tagline?: string;
  /** Bahasa default kode utama saat `concept.language` kosong. */
  defaultLang?: string;
};

type ConceptExplorerProps<T extends string> = {
  /** Prefix aksesibilitas: `paradigm` → `paradigm-tab-*` / `paradigm-panel`. */
  idPrefix: string;
  /** Kunci search param URL (`paradigm`, `kind`, ...). */
  param: string;
  options: { id: T; label: string }[];
  groups: Record<T, ExplorerGroup>;
  /** Pembungkus judul tampilan, mis. `{ prefix: ".", suffix: "()" }` → `.map()`. */
  titleWrap?: { prefix?: string; suffix?: string };
  /** Chip meta per section, mis. `{ map: "Array.prototype" }` (dihitung server). */
  metaByConcept?: Record<string, string>;
};

/**
 * Explorer materi learns: segmented control + anchor nav + section per konsep.
 * Dipakai topik paradigms, methods, dan state-management; state filter tersimpan
 * di search param URL, jadi highlight dari server cukup disiapkan sekali
 * untuk semua grup.
 */
export default function ConceptExplorer<T extends string>({
  idPrefix,
  param,
  options,
  groups,
  titleWrap,
  metaByConcept,
}: ConceptExplorerProps<T>) {
  const searchParams = useSearchParams();
  const raw = searchParams.get(param);
  const active =
    options.some((option) => option.id === raw) ? (raw as T) : options[0].id;
  const group = groups[active];

  function handleChange(next: T) {
    const url = new URL(window.location.href);
    url.searchParams.set(param, next);
    window.history.replaceState(null, "", url);
  }

  const title = (concept: LearnConcept) =>
    `${titleWrap?.prefix ?? ""}${concept.title}${titleWrap?.suffix ?? ""}`;
  const activeLabel =
    options.find((option) => option.id === active)?.label ?? "materi";

  const switcher = (
    <SegmentedSwitcher
      options={options}
      value={active}
      onChange={handleChange}
      ariaLabel="Pilih materi"
      idPrefix={idPrefix}
    />
  );

  return (
    <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
      {/* Anchor navigation: disembunyikan di mobile, sticky di desktop */}
      <nav
        aria-label={`Daftar materi ${activeLabel}`}
        className="hidden lg:block lg:w-56 lg:shrink-0"
      >
        <div className="sticky top-28 space-y-4">
          {switcher}

          <p className="font-mono font-medium text-xs uppercase tracking-widest text-accent-strong px-3">
            Daftar Materi
          </p>
          <div className="space-y-1">
            {group.concepts.map((concept, idx) => (
              <a
                key={concept.id}
                href={`#${concept.id}`}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-overlay hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span className="font-mono text-xs text-subtle">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="font-medium font-mono text-xs truncate">
                  {title(concept)}
                </span>
              </a>
            ))}
          </div>
        </div>
      </nav>
      {/* Konten grup aktif */}
      <div
        id={`${idPrefix}-panel`}
        role="tabpanel"
        aria-labelledby={`${idPrefix}-tab-${active}`}
        className="flex-1 space-y-10 sm:space-y-12 min-w-0"
      >
        <header className="lg:hidden">{switcher}</header>

        {/* Navigasi horizontal di layar kecil/mobile */}
        <div className="lg:hidden pb-2 overflow-x-auto flex gap-2 no-scrollbar">
          {group.concepts.map((concept, idx) => (
            <a
              key={concept.id}
              href={`#${concept.id}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-hairline bg-surface/80 text-xs font-mono text-foreground-soft whitespace-nowrap hover:border-accent-wash-border hover:text-accent-strong"
            >
              <span className="text-[10px] text-subtle">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span>{title(concept)}</span>
            </a>
          ))}
        </div>

        {(group.eyebrow || group.tagline) && (
          <div className="space-y-3">
            {group.eyebrow && (
              <p className="font-mono font-semibold uppercase tracking-widest text-accent-strong">
                {group.eyebrow}
              </p>
            )}
            {group.tagline && (
              <p className="text-sm sm:text-base text-muted leading-relaxed">
                {group.tagline}
              </p>
            )}
          </div>
        )}

        {group.concepts.map((concept, index) => {
          const metaLabel = metaByConcept?.[concept.id] ?? null;

          return (
            <section
              key={concept.id}
              id={concept.id}
              aria-labelledby={`${concept.id}-title`}
              className="scroll-mt-28 space-y-5"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-xs font-bold text-accent-strong px-2.5 py-1 rounded-md bg-accent-wash border border-accent-wash-border">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3
                  id={`${concept.id}-title`}
                  className="text-lg sm:text-xl font-semibold text-foreground font-mono tracking-tight"
                >
                  {title(concept)}
                </h3>
                {metaLabel && (
                  <span className="font-mono text-[11px] text-subtle px-2 py-0.5 rounded border border-hairline-soft bg-surface-muted">
                    {metaLabel}
                  </span>
                )}
              </div>

              <p className="text-foreground-soft leading-relaxed">
                {concept.description}
              </p>

              <CodeBlock
                highlightedHtml={group.highlighted[concept.id]}
                code={concept.code}
                filename={concept.filename}
                lang={concept.language ?? group.defaultLang ?? "ts"}
              />
              {concept.examples?.map((example, exampleIndex) => (
                <CodeBlock
                  key={`${concept.id}-example-${exampleIndex + 1}`}
                  highlightedHtml={
                    group.highlighted[
                      `${concept.id}-example-${exampleIndex + 1}`
                    ]
                  }
                  code={example.code}
                  filename={example.filename}
                  lang={example.language ?? group.defaultLang ?? "ts"}
                />
              ))}
            </section>
          );
        })}
      </div>
    </div>
  );
}
