"use client";

import type { Paradigm } from "../_data/types";
import { learnContent, paradigmIds } from "../_data";

type ParadigmSwitcherProps = {
  paradigm: Paradigm;
  /** Dipanggil saat user memilih paradigma lain. */
  onChange: (paradigm: Paradigm) => void;
};

/**
 * Toggle berbentuk segmented control untuk berpindah paradigma.
 * Semantik tablist/tab karena fungsinya seperti tab.
 */
export default function ParadigmSwitcher({
  paradigm,
  onChange,
}: ParadigmSwitcherProps) {
  return (
    <div
      role="tablist"
      aria-label="Pilih paradigma pemrograman"
      className="inline-flex items-center gap-1 rounded-full border border-hairline bg-overlay p-1"
    >
      {paradigmIds.map((id) => {
        const isActive = id === paradigm;
        const activeClasses =
          "bg-accent-wash text-accent-strong border border-accent-wash-border";
        const idleClasses =
          "text-muted hover:text-foreground hover:bg-overlay-strong border border-transparent";

        return (
          <button
            key={id}
            type="button"
            role="tab"
            id={`paradigm-tab-${id}`}
            aria-selected={isActive}
            aria-controls="paradigm-panel"
            onClick={() => onChange(id)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${isActive ? activeClasses : idleClasses}`}
          >
            {learnContent[id].label}
          </button>
        );
      })}
    </div>
  );
}
