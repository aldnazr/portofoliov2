import type { Metadata } from "next";
import LearnPageShell from "./_components/learn-page-shell";
import TopicList from "./_components/topic-list";

export const metadata: Metadata = {
  title: "Learn | Interactive Learning Lab",
  description:
    "Pilihan topik pembelajaran interaktif: Functional vs OOP (TypeScript, Dart, dan Kotlin) serta panduan lengkap Array & String methods (forEach, map, filter, reduce, flat, flatMap, split, join).",
};

/** Hub daftar topik; materi detail ada di /learns/paradigms dan /learns/methods. */

export default function LearnPage() {
  return (
    <LearnPageShell containerClassName="max-w-5xl">
      <TopicList />
    </LearnPageShell>
  );
}
