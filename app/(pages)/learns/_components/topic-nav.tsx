import Link from "next/link";

export default function TopicNav() {
  return (
    <div className="flex items-center justify-between gap-4">
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
    </div>
  );
}

