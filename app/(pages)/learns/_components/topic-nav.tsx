import Link from "next/link";
import type { LearnTopic } from "../_data/types";

export default function TopicNav({ currentTopic }: { currentTopic: LearnTopic }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <Link
        href="/learns"
        aria-label="Kembali ke daftar topik pembelajaran"
        className="group inline-flex items-center gap-2 rounded-full border border-hairline bg-surface/60 px-3.5 py-1.5 text-xs font-medium text-foreground-soft backdrop-blur-md transition-all duration-300 hover:border-accent-wash-border hover:bg-accent-wash hover:text-foreground active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong"
      >
        <span
          aria-hidden="true"
          className="inline-block font-mono text-sm text-subtle transition-all duration-300 group-hover:-translate-x-1 group-hover:text-accent-strong"
        >
          ←
        </span>
        <span>Semua Topik Belajar</span>
      </Link>

      <div className="flex items-center gap-1.5 rounded-full border border-hairline bg-surface/60 p-1 backdrop-blur-md">
        <Link
          href="/learns?topic=paradigms"
          className={`rounded-full px-3.5 py-1 text-xs font-medium transition-colors ${
            currentTopic === "paradigms"
              ? "bg-accent-wash text-accent-strong border border-accent-wash-border"
              : "text-muted hover:text-foreground hover:bg-overlay"
          }`}
        >
          1. Functional & OOP
        </Link>
        <Link
          href="/learns?topic=methods"
          className={`rounded-full px-3.5 py-1 text-xs font-medium transition-colors ${
            currentTopic === "methods"
              ? "bg-accent-wash text-accent-strong border border-accent-wash-border"
              : "text-muted hover:text-foreground hover:bg-overlay"
          }`}
        >
          2. Array & String Methods
        </Link>
      </div>
    </div>
  );
}
