import { ArrowIcon } from "@/components/icons";
import Link from "next/link";
import { topicCards } from "../data/topics";

export default function TopicList() {
  return (
    <div className="mt-2 sm:mt-8 space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-semibold text-foreground tracking-tight">
          Pilih Topik Pembelajaran
        </h1>
        <p className="text-sm sm:text-base text-muted leading-relaxed max-w-2xl">
          Eksplorasi materi pemrograman interaktif. Pilih modul di bawah untuk
          melihat ringkasan materi, keterangan method, dan contoh kode nyata.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {topicCards.map((card) => (
          <Link
            key={card.id}
            href={card.href}
            className="group relative flex flex-col justify-between rounded-2xl border border-hairline bg-surface/80 p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:border-accent-wash-border hover:bg-surface-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs font-bold text-accent-strong px-2.5 py-1 rounded-md bg-accent-wash border border-accent-wash-border">
                  {card.index}
                </span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-subtle">
                  {card.category}
                </span>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-semibold text-foreground group-hover:text-accent-strong transition-colors tracking-tight">
                  {card.title}
                </h2>
                <p className="text-sm text-muted leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {card.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md bg-overlay border border-hairline-soft text-[11px] font-mono text-foreground-soft"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 flex items-center justify-between border-t border-hairline-soft mt-6">
              <span className="text-xs font-medium text-foreground-soft group-hover:text-foreground transition-colors">
                Mulai Pelajari
              </span>
              <span
                aria-hidden="true"
                className="font-mono text-sm text-accent-strong transition-transform duration-300 group-hover:translate-x-1"
              >
                <ArrowIcon direction="right" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
