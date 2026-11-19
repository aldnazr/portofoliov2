import { useLayoutEffect, useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons.tsx";
import { cn, pad } from "@/lib/utils.ts";

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
      className="grid size-11 shrink-0 place-items-center rounded-full bg-surface-muted text-foreground transition-[background-color,color,transform,opacity] duration-200 hover:bg-accent-wash hover:text-accent-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-strong active:scale-95 disabled:pointer-events-none disabled:opacity-40 motion-reduce:transition-none sm:size-11"
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
  const dotsRef = useRef<HTMLUListElement>(null);
  const activeDotRef = useRef<HTMLLIElement>(null);

  useLayoutEffect(() => {
    const list = dotsRef.current;
    if (!list) return;

    const keepActiveVisible = () => {
      const dot = activeDotRef.current;
      if (!dot) return;

      const left = dot.offsetLeft - list.offsetLeft;
      const right = left + dot.offsetWidth;
      if (left < list.scrollLeft) {
        list.scrollTo({ left });
      } else if (right > list.scrollLeft + list.clientWidth) {
        list.scrollTo({ left: right - list.clientWidth });
      }
    };

    keepActiveVisible();
    const observer = new ResizeObserver(keepActiveVisible);
    observer.observe(list);
    return () => observer.disconnect();
  }, [active, total]);

  return (
    <nav
      aria-label="Project pagination"
      className={cn(
        "relative mx-auto flex w-fit max-w-[calc(100%-1.5rem)] items-center gap-1.5 rounded-full bg-surface p-2 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.25)] sm:mx-auto sm:max-w-full sm:gap-3.5 dark:shadow-[0_18px_40px_-18px_rgba(0,0,0,0.6)]",
        className,
      )}
    >
      <ArrowButton direction="prev" onClick={onPrev} disabled={!canPrev} />

      <ul
        ref={dotsRef}
        className="flex min-w-0 items-center gap-2 overflow-x-hidden"
      >
        {Array.from({ length: total }, (_, i) => {
          const isActive = i === active;
          return (
            <li
              key={i}
              ref={isActive ? activeDotRef : undefined}
              className="w-max min-w-8 shrink-0"
            >
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
                    isActive
                      ? "w-5 h-2 bg-accent"
                      : "w-1.75 bg-shade group-hover:bg-accent/60",
                  )}
                />
              </button>
            </li>
          );
        })}
      </ul>

      <p className="mx-2 min-w-10 shrink-0 text-center text-sm font-medium tabular-nums text-muted-foreground">
        <span className="text-foreground">{pad(active + 1)}</span>
        <span className="text-muted-foreground/40"> / {pad(total)}</span>
      </p>

      <ArrowButton direction="next" onClick={onNext} disabled={!canNext} />
    </nav>
  );
}
