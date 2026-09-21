import type { Metadata } from "next";
import { createHighlighter } from "shiki";
import {
  learnContent,
  methodsConcepts,
  paradigmIds,
  parseParadigm,
  parseTopic,
} from "./_data";
import type { Paradigm } from "./_data/types";
import LearnExplorer from "./_components/learn-explorer";
import MethodsExplorer from "./_components/methods-explorer";
import ScrollToTop from "./_components/scroll-to-top";
import TopicList from "./_components/topic-list";
import TopicNav from "./_components/topic-nav";
import BackgroundMesh from "@/components/background-mesh";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Learn | Interactive Learning Lab",
  description:
    "Pilihan topik pembelajaran interaktif: Functional vs OOP (TypeScript & Dart) serta panduan lengkap Array & String methods (forEach, map, filter, reduce, flat, flatMap, split, join).",
};

type LearnPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function LearnPage({ searchParams }: LearnPageProps) {
  const params = await searchParams;
  const rawTopic = Array.isArray(params.topic) ? params.topic[0] : params.topic;
  const rawParadigm =
    Array.isArray(params.paradigm) ? params.paradigm[0] : params.paradigm;

  const currentTopic =
    parseTopic(rawTopic) ?? (rawParadigm ? "paradigms" : null);

  // 1. Tampilan Hub / List Pilihan Topik Belajar
  if (!currentTopic) {
    return (
      <div className="relative min-h-screen bg-background text-foreground">
        <BackgroundMesh />
        <Header />
        <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-24">
          <TopicList />
        </main>
        <ScrollToTop />
        <Footer />
      </div>
    );
  }

  // 2. Tampilan Topik 1: Functional & OOP
  if (currentTopic === "paradigms") {
    const initialParadigm: Paradigm = parseParadigm(rawParadigm);
    const highlighter = await createHighlighter({
      langs: ["typescript", "dart"],
      themes: ["github-light", "github-dark"],
    });

    const highlighted = Object.fromEntries(
      paradigmIds.map((paradigm) => [
        paradigm,
        Object.fromEntries(
          learnContent[paradigm].concepts.map((concept) => [
            concept.id,
            highlighter.codeToHtml(concept.code.trim(), {
              lang: paradigm === "oop" ? "dart" : "typescript",
              themes: { light: "github-light", dark: "github-dark" },
              defaultColor: "light-dark()",
            }),
          ]),
        ),
      ]),
    ) as Record<Paradigm, Record<string, string>>;

    return (
      <div className="relative min-h-screen bg-background text-foreground">
        <BackgroundMesh />
        <Header />

        <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-24">
          <div className="space-y-8">
            <TopicNav currentTopic="paradigms" />

            <header className="space-y-1.5 md:space-y-2.5">
              <p className="px-3 py-1 max-w-fit rounded-full text-[10px] uppercase tracking-[0.2em] font-mono text-accent-strong border border-accent-wash-border bg-accent-wash">
                Topik 01 • Paradigma Pemrograman
              </p>
              <h1 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
                Functional Programming & OOP
              </h1>
              <p className="text-sm sm:text-base text-muted leading-relaxed max-w-2xl">
                Dua paradigma pemrograman yang paling banyak dipakai, dipelajari
                lewat contoh kode TypeScript dan Dart yang bisa langsung
                dijalankan.
              </p>
            </header>

            <LearnExplorer
              initialParadigm={initialParadigm}
              highlighted={highlighted}
            />
          </div>
        </main>

        <ScrollToTop />
        <Footer />
      </div>
    );
  }

  // 3. Tampilan Topik 2: Array & String Methods
  const highlighter = await createHighlighter({
    langs: ["typescript"],
    themes: ["github-light", "github-dark"],
  });

  const highlightedMethods = Object.fromEntries(
    methodsConcepts.map((concept) => [
      concept.id,
      highlighter.codeToHtml(concept.code.trim(), {
        lang: "typescript",
        themes: { light: "github-light", dark: "github-dark" },
        defaultColor: "light-dark()",
      }),
    ]),
  );

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <BackgroundMesh />
      <Header />

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-24">
        <div className="space-y-8">
          <TopicNav currentTopic="methods" />

          <header className="space-y-1.5 md:space-y-2.5">
            <p className="px-3 py-1 max-w-fit rounded-full text-[10px] uppercase tracking-[0.2em] font-mono text-accent-strong border border-accent-wash-border bg-accent-wash">
              Topik 02 • Manipulasi Data
            </p>
            <h1 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
              Array & String Methods
            </h1>
            <p className="text-sm sm:text-base text-muted leading-relaxed max-w-2xl">
              Keterangan dan contoh penggunaan dari method transformasi data
              esensial: forEach, map, filter, reduce, flat, flatMap, split, dan
              join.
            </p>
          </header>

          <MethodsExplorer
            concepts={methodsConcepts}
            highlighted={highlightedMethods}
          />
        </div>
      </main>

      <ScrollToTop />
      <Footer />
    </div>
  );
}
