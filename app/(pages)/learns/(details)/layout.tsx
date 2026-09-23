import type { ReactNode } from "react";
import LearnPageShell from "../_components/learn-page-shell";
import TopicNav from "../_components/topic-nav";

/** Kerangka halaman detail topik: shell + tombol kembali ke daftar topik. */
export default function LearnDetailsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <LearnPageShell>
      <div className="space-y-8">
        <TopicNav />
        {children}
      </div>
    </LearnPageShell>
  );
}