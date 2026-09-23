import Link from "next/link";

type BackLinkProps = {
  /** Tujuan navigasi back. Default `/` (halaman utama portofolio). */
  href?: string;
  /** Teks label tombol. */
  label: string;
};

/**
 * Link "Kembali" lintas halaman. Mirror dari next-topic-link:
 * lingkaran ikon 44px + label, tanpa blur/pill.
 */
export default function BackLink({ href = "/", label }: BackLinkProps) {
  return (
    <Link
      href={href}
      className="group inline-flex min-h-11 items-center gap-4 text-sm font-medium text-subtle transition-[color,translate] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-x-1 hover:text-foreground active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none sm:text-base"
    >
      <span
        aria-hidden="true"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-hairline text-subtle transition-[color,border-color,translate] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-1 group-hover:border-accent-wash-border group-hover:text-accent-hover motion-reduce:transition-none"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4.5"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5 12H19M5 12L11 6M5 12L11 18" />
        </svg>
      </span>
      {label}
    </Link>
  );
}
