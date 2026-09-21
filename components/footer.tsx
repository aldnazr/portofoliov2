import Link from "next/link";
import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-hairline-soft bg-background/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 flex flex-col-reverse sm:flex-row items-center justify-between gap-5">
        <p className="text-xs font-mono text-subtle text-center sm:text-left">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>

        <Link
          href="/learns"
          aria-label="Kunjungi Interactive Learning Lab (/learns)"
          className="group inline-flex items-center gap-2.5 rounded-full border border-hairline bg-surface/80 px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-medium text-foreground-soft backdrop-blur-md transition-all duration-300 hover:border-accent-wash-border hover:bg-accent-wash hover:text-foreground active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span className="relative flex size-2 items-center justify-center">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-70" />
            <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
          </span>
          <span>Learning Lab</span>
          <span className="rounded-full bg-overlay px-2 py-0.5 font-mono text-[10px] text-subtle transition-colors duration-300 group-hover:bg-accent-wash-strong group-hover:text-accent-strong">
            /learns
          </span>
          <svg
            className="size-3 text-subtle transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-strong"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M2.5 9.5L9.5 2.5" />
            <path d="M4 2.5h5.5v5.5" />
          </svg>
        </Link>
      </div>
    </footer>
  );
}

