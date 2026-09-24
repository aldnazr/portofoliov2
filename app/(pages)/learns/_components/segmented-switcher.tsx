"use client";

export type SegmentedOption<T extends string> = { id: T; label: string };

type SegmentedSwitcherProps<T extends string> = {
  options: SegmentedOption<T>[];
  value: T;
  /** Dipanggil saat user memilih opsi lain. */
  onChange: (value: T) => void;
  ariaLabel: string;
  /** Prefix aksesibilitas: `paradigm` → `paradigm-tab-*` / `paradigm-panel`. */
  idPrefix: string;
};

/**
 * Segmented control berbentuk tablist/tab untuk berpindah antar grup materi
 * (paradigma, jenis method, ...) tanpa fetch ulang.
 */
export default function SegmentedSwitcher<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
  idPrefix,
}: SegmentedSwitcherProps<T>) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className="inline-flex items-center gap-1 rounded-full border border-hairline bg-overlay p-1"
    >
      {options.map((option) => {
        const isActive = option.id === value;
        const activeClasses =
          "bg-accent-wash text-accent-strong border border-accent-wash-border";
        const idleClasses =
          "text-muted hover:text-foreground hover:bg-overlay-strong border border-transparent";

        return (
          <button
            key={option.id}
            type="button"
            role="tab"
            id={`${idPrefix}-tab-${option.id}`}
            aria-selected={isActive}
            aria-controls={`${idPrefix}-panel`}
            onClick={() => onChange(option.id)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${isActive ? activeClasses : idleClasses}`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}