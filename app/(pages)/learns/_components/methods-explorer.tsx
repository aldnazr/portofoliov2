"use client";

import type { LearnConcept } from "../_data/types";
import CodeBlock from "./code-block";

type MethodsExplorerProps = {
  /** Seluruh snippet method sudah di-highlight di server dengan Shiki */
  highlighted: Record<string, string>;
  concepts: LearnConcept[];
};

export default function MethodsExplorer({
  highlighted,
  concepts,
}: MethodsExplorerProps) {
  return (
    <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
      {/* Sidebar navigasi anchor di desktop */}
      <nav
        aria-label="Daftar method manipulasi data"
        className="hidden lg:block lg:w-56 lg:shrink-0"
      >
        <div className="sticky top-28 space-y-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent-strong px-3">
            Daftar Method
          </p>
          <div className="space-y-1">
            {concepts.map((concept, idx) => (
              <a
                key={concept.id}
                href={`#${concept.id}`}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-overlay hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span className="font-mono text-xs text-subtle">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="font-medium font-mono text-xs truncate">
                  .{concept.title}()
                </span>
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Konten materi */}
      <div className="flex-1 space-y-10 sm:space-y-12 min-w-0">
        {/* Navigasi horizontal di layar kecil/mobile */}
        <div className="lg:hidden pb-2 overflow-x-auto flex gap-2 no-scrollbar">
          {concepts.map((concept, idx) => (
            <a
              key={concept.id}
              href={`#${concept.id}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-hairline bg-surface/80 text-xs font-mono text-foreground-soft whitespace-nowrap hover:border-accent-wash-border hover:text-accent-strong"
            >
              <span className="text-[10px] text-subtle">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span>.{concept.title}</span>
            </a>
          ))}
        </div>

        {concepts.map((concept, index) => {
          const isStringMethod = concept.id === "split";
          const methodType = isStringMethod ? "String.prototype" : "Array.prototype";

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
                  .{concept.title}()
                </h3>
                <span className="font-mono text-[11px] text-subtle px-2 py-0.5 rounded border border-hairline-soft bg-surface-muted">
                  {methodType}
                </span>
              </div>

              <p className="text-sm sm:text-base text-foreground-soft leading-relaxed">
                {concept.description}
              </p>

              <CodeBlock
                highlightedHtml={highlighted[concept.id]}
                code={concept.code}
                filename={concept.filename}
                lang="ts"
              />
            </section>
          );
        })}
      </div>
    </div>
  );
}
