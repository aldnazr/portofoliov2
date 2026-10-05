import { ChevronLeftIcon, ChevronRightIcon } from "./icons";
import { cn, pad } from "./utils";
import { useIsDesktop } from "@/hooks/use-desktop";

type CarouselPaginationProps = {
  total: number;
  /** Index aktif, 0-based */
  active: number;
  onSelect: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
  canPrev?: boolean;
  canNext?: boolean;
  className?: string;
};

function ArrowButton({
  direction,
  onClick,
  disabled,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
}) {
  const Icon = direction === "prev" ? ChevronLeftIcon : ChevronRightIcon;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous project" : "Next project"}
      className="grid size-9 shrink-0 place-items-center rounded-full bg-surface-muted text-foreground transition-[background-color,color,transform,opacity] duration-200 hover:bg-accent-wash hover:text-accent-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-strong active:scale-95 disabled:pointer-events-none disabled:opacity-40 motion-reduce:transition-none sm:size-11"
    >
      <Icon className="size-4 sm:size-5" />
    </button>
  );
}

export function CarouselPagination({
  total,
  active,
  onSelect,
  onPrev,
  onNext,
  canPrev = true,
  canNext = true,
  className,
}: CarouselPaginationProps) {
  const isDesktop = useIsDesktop();
  const maxVisible = isDesktop ? 7 : 5;
  const count = Math.min(total, maxVisible);
  // ponytail: sliding window, no ellipsis markers; add dots/ellipsis when a
  // project count above 7 ships
  const start =
    total > maxVisible ?
      Math.min(
        Math.max(active - Math.floor(maxVisible / 2), 0),
        total - maxVisible,
      )
    : 0;

  return (
    <nav
      aria-label="Project pagination"
      className={cn(
        "relative mx-auto flex w-fit max-w-full items-center gap-1.5 rounded-full border border-hairline bg-surface p-1.5 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.25)] sm:gap-3.5 dark:shadow-[0_18px_40px_-18px_rgba(0,0,0,0.6)]",
        className,
      )}
    >
      <ArrowButton direction="prev" onClick={onPrev} disabled={!canPrev} />

      <ul className="flex items-center gap-2">
        {Array.from({ length: count }, (_, k) => {
          const i = start + k;
          const isActive = i === active;
          return (
            <li key={i} className="w-max min-w-8">
              <button
                type="button"
                onClick={() => onSelect(i)}
                aria-label={`Go to project ${i + 1}`}
                aria-current={isActive ? "true" : undefined}
                className="group grid h-8 w-full place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-strong"
              >
                <span
                  className={cn(
                    "block h-1.75 rounded-full transition-all duration-300 ease-out motion-reduce:transition-none",
                    isActive ? "w-5 h-2 bg-accent" : (
                      "w-1.75 bg-shade group-hover:bg-accent/60"
                    ),
                  )}
                />
              </button>
            </li>
          );
        })}
      </ul>

      <p className="shrink-0 mx-2 min-w-10 text-center font-medium text-sm text-muted">
        <span className="font-bold text-foreground">{pad(active + 1)}</span> /{" "}
        {pad(total)}
      </p>

      <ArrowButton direction="next" onClick={onNext} disabled={!canNext} />
    </nav>
  );
}
