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
    <p
      className={cn(
        "inline-flex max-w-full rounded-2xl bg-overlay p-1 ring-1 ring-hairline",
        className,
      )}
    >
      <span className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 rounded-xl bg-surface p-1 shadow-[inset_0_1px_0_var(--overlay-strong)]">
        {lead && (
          <span className="min-w-0 pl-2.5 font-mono text-xs leading-snug tracking-wide text-muted sm:pl-3 sm:text-[0.8125rem]">
            {lead}
          </span>
        )}
        <span className="rounded-lg bg-accent-wash px-2.5 py-1.5 font-mono text-xs font-semibold leading-none tracking-wide text-accent-strong ring-1 ring-inset ring-accent-wash-border sm:px-3 sm:text-[0.8125rem]">
          {title}
        </span>
      </span>
    </p>
  );
}
