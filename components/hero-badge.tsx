import { cn } from "@/lib/utils.ts";

/**
 * Badge hero statis: cangkang > inti > chip, sudut konsentris 16 / 12 / 8.
 * Alasan desain:
 * - Isinya harus satu fakta nyata dari data situs, bukan label dekoratif (R-09).
 * - Aksen emerald hanya di chip judul, memakai token wash yang sama dengan chip lain di situs (R-29).
 * - Statis: tanpa hover, tekan, atau fokus karena bukan tautan (R-26).
 * - Animasi masuk dipegang pembungkus reveal() di hero, bukan komponen ini.
 */
type HeroBadgeProps = {
  /** Teks redup di depan judul, mis. "Frontend & Mobile Developer di". */
  lead?: string;
  /** Teks utama, tampil di chip beraksen. */
  title: string;
  className?: string;
};

export default function HeroBadge({ lead, title, className }: HeroBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex max-w-full rounded-full bg-linear-to-r from-overlay to-accent-wash p-2",
        className,
      )}
    >
      <div className="flex p-0.5 min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
        {lead && (
          <span className="min-w-0 pl-2.5 font-mono text-xs leading-snug tracking-wide text-muted sm:pl-3 sm:text-[0.8125rem]">
            {lead}
          </span>
        )}
        <span className="rounded-full bg-linear-to-r from-accent-wash to-accent-wash-strong px-2.5 py-2.5 font-mono text-xs font-semibold leading-none tracking-wide text-foreground-soft sm:px-4 sm:text-[0.8125rem]">
          {title}
        </span>
      </div>
    </div>
  );
}
