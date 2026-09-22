import type { Metadata } from "next";
import { Suspense } from "react";
import { createHighlighter } from "shiki";
import {
  learnContent,
  methodsConcepts,
  paradigmIds,
  parseMethodFilter,
  parseParadigm,
  parseTopic,
} from "./_data";
import type { LearnConcept, LearnTopic, Paradigm } from "./_data/types";
import LearnExplorer from "./_components/learn-explorer";
import LearnPageShell from "./_components/learn-page-shell";
import { ContentSkeleton } from "./_components/learn-skeleton";
import MethodsExplorer from "./_components/methods-explorer";
import NextTopicLink from "./_components/next-topic-link";
import TopicHeader from "./_components/topic-header";
import TopicList from "./_components/topic-list";
import TopicNav from "./_components/topic-nav";

export const metadata: Metadata = {
  title: "Learn | Interactive Learning Lab",
  description:
    "Pilihan topik pembelajaran interaktif: Functional vs OOP (TypeScript, Dart, dan Kotlin) serta panduan lengkap Array & String methods (forEach, map, filter, reduce, flat, flatMap, split, join).",
};

type LearnPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

/** Konfigurasi per topik: metadata, dan navigasi */
const topicConfig = {
  paradigms: {
    title: "Functional Programming & OOP",
    description:
      "Dua paradigma pemrograman yang paling banyak dipakai, dipelajari lewat contoh kode TypeScript, Dart, dan Kotlin yang bisa langsung dijalankan.",
    nextTopic: {
      href: "/learns?topic=methods",
      title: "Array & String Methods",
    },
  },
  methods: {
    title: "Array & String Methods",
    description:
      "Keterangan dan contoh penggunaan dari method transformasi data esensial: forEach, map, filter, reduce, flat, flatMap, split, dan join.",
    nextTopic: { href: "/learns?topic=paradigms", title: "Functional & OOP" },
  },
} as const;

// ponytail: satu highlighter per proses server; cukup karena ketiga bahasa
// selalu dibutuhkan gabungan — buat lazy-load per bahasa kalau init terasa berat.
const highlighterPromise = createHighlighter({
  langs: ["typescript", "dart", "kotlin"],
  themes: ["github-light", "github-dark"],
});

async function highlightConcepts(
  concepts: LearnConcept[],
  paradigm?: Paradigm,
): Promise<Record<string, string>> {
  const highlighter = await highlighterPromise;

  return Object.fromEntries(
    concepts.map((concept) => [
      concept.id,
      highlighter.codeToHtml(concept.code.trim(), {
        lang: concept.language ?? (paradigm === "oop" ? "dart" : "typescript"),
        themes: { light: "github-light", dark: "github-dark" },
        defaultColor: "light-dark()",
      }),
    ]),
  );
}

export default async function LearnPage({ searchParams }: LearnPageProps) {
  const params = await searchParams;
  const rawTopic = Array.isArray(params.topic) ? params.topic[0] : params.topic;
  const rawParadigm =
    Array.isArray(params.paradigm) ? params.paradigm[0] : params.paradigm;
  const rawKind = Array.isArray(params.kind) ? params.kind[0] : params.kind;

  const currentTopic =
    parseTopic(rawTopic) ?? (rawParadigm ? "paradigms" : null);

  // Hub: daftar topik
  if (!currentTopic) {
    return (
      <LearnPageShell containerClassName="max-w-5xl">
        <TopicList />
      </LearnPageShell>
    );
  }

  const config = topicConfig[currentTopic];

  return (
    <LearnPageShell>
      <div className="space-y-8">
        <TopicNav />
        <TopicHeader title={config.title} description={config.description} />
        <Suspense key={currentTopic} fallback={<ContentSkeleton />}>
          <TopicContent
            topic={currentTopic}
            rawParadigm={rawParadigm}
            rawKind={rawKind}
          />
        </Suspense>
      </div>
      <NextTopicLink {...config.nextTopic} />
    </LearnPageShell>
  );
}

/**
 * Konten materi per topik: highlight Shiki berjalan di server;
 * di-render sebagai anak Suspense supaya shell tampil lebih dulu.
 */
async function TopicContent({
  topic,
  rawParadigm,
  rawKind,
}: {
  topic: LearnTopic;
  rawParadigm: string | undefined;
  rawKind: string | undefined;
}) {
  // Topik paradigms: butuh highlight per paradigma
  if (topic === "paradigms") {
    const initialParadigm: Paradigm = parseParadigm(rawParadigm);
    const highlighted = Object.fromEntries(
      await Promise.all(
        paradigmIds.map(async (paradigm) => [
          paradigm,
          await highlightConcepts(learnContent[paradigm].concepts, paradigm),
        ]),
      ),
    ) as Record<Paradigm, Record<string, string>>;

    return (
      <LearnExplorer
        initialParadigm={initialParadigm}
        highlighted={highlighted}
      />
    );
  }

  // Topik methods
  const highlighted = await highlightConcepts(methodsConcepts);

  return (
    <MethodsExplorer
      concepts={methodsConcepts}
      highlighted={highlighted}
      initialKind={parseMethodFilter(rawKind)}
    />
  );
}
