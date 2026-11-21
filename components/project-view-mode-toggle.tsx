"use client";

import { useProjectViewMode } from "@/lib/use-project-view-mode.ts";
import { IconCarousel, IconList } from "@/components/svg-icons/icons";
import { cn } from "@/lib/utils.ts";

const segmentBase = [
  "relative z-10 inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium",
  "transition-colors duration-200 motion-reduce:transition-none",
  "after:absolute after:inset-x-0 after:-inset-y-1.5 after:content-['']",
  "default-ring",
].join(" ");

const segmentActive = "text-foreground";
const segmentIdle = "text-muted hover:bg-overlay hover:text-foreground";

const segmentClass = (active: boolean) =>
  cn(segmentBase, active ? segmentActive : segmentIdle);

export function ProjectViewModeToggle() {
  const viewMode = useProjectViewMode((s) => s.viewMode);
  const setViewMode = useProjectViewMode((s) => s.setViewMode);

  return (
    <div
      role="group"
      aria-label="Mode tampilan proyek"
      className="relative isolate inline-grid grid-cols-2 self-start sm:self-end rounded-xl border border-(--glass-ring-base) bg-[radial-gradient(var(--glass-glow),transparent_70%)] p-1 text-foreground"
    >
      <span
        aria-hidden="true"
        className={cn(
          "glass-icon pointer-events-none absolute inset-y-1 left-1 w-[calc(50%-0.5rem)] rounded-lg bg-overlay shadow-[inset_0_1px_0_var(--glass-highlight)]",
          "transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
          viewMode === "list" && "translate-x-[calc(100%+0.5rem)]",
        )}
      />

      <button
        type="button"
        onClick={() => setViewMode("carousel")}
        aria-pressed={viewMode === "carousel"}
        className={segmentClass(viewMode === "carousel")}
      >
        <IconCarousel className="size-4 shrink-0" />
        <span>Carousel</span>
      </button>
      <button
        type="button"
        onClick={() => setViewMode("list")}
        aria-pressed={viewMode === "list"}
        className={segmentClass(viewMode === "list")}
      >
        <IconList className="size-4 shrink-0" />
        <span>List</span>
      </button>
    </div>
  );
}
