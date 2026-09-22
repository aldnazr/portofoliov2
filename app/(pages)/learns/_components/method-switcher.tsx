"use client";

import type { MethodFilter } from "../_data/types";
import { methodFilterIds, methodFilterLabels } from "../_data";

type MethodSwitcherProps = {
  kind: MethodFilter;
  /** Dipanggil saat user memilih jenis method lain. */
  onChange: (kind: MethodFilter) => void;
};

/**
 * Toggle berbentuk segmented control untuk memfilter method
 * Array.prototype vs String.prototype. Semantik tablist/tab seperti ParadigmSwitcher.
 */
export default function MethodSwitcher({
  kind,
  onChange,
}: MethodSwitcherProps) {
  return (
    <div
      role="tablist"
      aria-label="Pilih jenis method"
      className="inline-flex items-center gap-1 rounded-full border border-hairline bg-overlay p-1"
    >
      {methodFilterIds.map((id) => {
        const isActive = id === kind;
        const activeClasses =
          "bg-accent-wash text-accent-strong border border-accent-wash-border";
        const idleClasses =
          "text-muted hover:text-foreground hover:bg-overlay-strong border border-transparent";

        return (
          <button
            key={id}
            type="button"
            role="tab"
            id={`method-tab-${id}`}
            aria-selected={isActive}
            aria-controls="method-panel"
            onClick={() => onChange(id)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${isActive ? activeClasses : idleClasses}`}
          >
            {methodFilterLabels[id]}
          </button>
        );
      })}
    </div>
  );
}
