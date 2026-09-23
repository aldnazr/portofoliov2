import Link from "next/link";
import type { ReactNode } from "react";

type BackLinkProps = {
  /** Tujuan navigasi back. Default `/` (halaman utama portofolio). */
  href?: string;
  /** Teks label tombol; juga dipakai sebagai `aria-label`. */
  label: string;
};

/** Tombol pill "Kembali" yang bisa dipakai lintas halaman. */
export default function BackLink({ href = "/", label }: BackLinkProps) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="group inline-flex items-center gap-2.5 rounded-full border border-hairline bg-surface/60 px-4 py-2 text-xs font-medium text-foreground-soft backdrop-blur-md transition-all duration-300 hover:border-accent-wash-border hover:bg-accent-wash hover:text-foreground active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <span
        aria-hidden="true"
        className="inline-block font-mono text-sm text-subtle transition-all duration-300 group-hover:-translate-x-1 group-hover:text-accent-strong"
      >
        ←
      </span>
      <span>{label}</span>
    </Link>
  );
}
