import PageShell from "@/components/page-shell.tsx";
import TopicList from "@/features/learns/components/topic-list.tsx";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn | Interactive Learning Lab",
  description:
    "Pilihan topik pembelajaran interaktif: Functional vs OOP (TypeScript, Dart, dan Kotlin), panduan lengkap Array & String methods (forEach, map, filter, reduce, flat, flatMap, split, join), serta global state management di React (Zustand) dan Flutter (Riverpod).",
};

/** Hub daftar topik; materi detail ada di /learns/paradigms, /learns/methods, dan /learns/state-management. */

export default function LearnPage() {
  return (
    <PageShell containerClassName="max-w-5xl">
      <TopicList />
    </PageShell>
  );
}
