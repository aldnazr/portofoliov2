import type { Metadata } from "next";
import { createHighlighter } from "shiki";
import {
  learnContent,
  methodsConcepts,
  paradigmIds,
  parseParadigm,
  parseTopic,
} from "./_data";
import type { LearnConcept, Paradigm } from "./_data/types";
import LearnExplorer from "./_components/learn-explorer";
import LearnPageShell from "./_components/learn-page-shell";
import MethodsExplorer from "./_components/methods-explorer";
import NextTopicLink from "./_components/next-topic-link";
import TopicHeader from "./_components/topic-header";
import TopicList from "./_components/topic-list";
import TopicNav from "./_components/topic-nav";

export const metadata: Metadata = {
  title: "Learn | Interactive Learning Lab",
  description:
    "Pilihan topik pembelajaran interaktif: Functional vs OOP (TypeScript & Dart) serta panduan lengkap Array & String methods (forEach, map, filter, reduce, flat, flatMap, split, join).",
};

type LearnPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

/** Konfigurasi per topik: metadata, bahasa highlight, dan navigasi */
const topicConfig = {
  paradigms: {
    title: "Functional Programming & OOP",
    description:
      "Dua paradigma pemrograman yang paling banyak dipakai, dipelajari lewat contoh kode TypeScript dan Dart yang bisa langsung dijalankan.",
    langs: ["typescript", "dart"] as const,
    nextTopic: {
      href: "/learns?topic=methods",
      title: "Array & String Methods",
    },
  },
  methods: {
    title: "Array & String Methods",
    description:
      "Keterangan dan contoh penggunaan dari method transformasi data esensial: forEach, map, filter, reduce, flat, flatMap, split, dan join.",
    langs: ["typescript"] as const,
    nextTopic: { href: "/learns?topic=paradigms", title: "Functional & OOP" },
  },
} as const;

async function highlightConcepts(
  concepts: LearnConcept[],
  langs: readonly string[],
  paradigm?: Paradigm,
): Promise<Record<string, string>> {
  const highlighter = await createHighlighter({
    langs: [...langs],
    themes: ["github-light", "github-dark"],
  });

  return Object.fromEntries(
    concepts.map((concept) => [
      concept.id,
      highlighter.codeToHtml(concept.code.trim(), {
        lang: paradigm === "oop" ? "dart" : "typescript",
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

  // Topik paradigms: butuh highlight per paradigma
  if (currentTopic === "paradigms") {
    const initialParadigm: Paradigm = parseParadigm(rawParadigm);
    const highlighted = Object.fromEntries(
      await Promise.all(
        paradigmIds.map(async (paradigm) => [
          paradigm,
          await highlightConcepts(
            learnContent[paradigm].concepts,
            config.langs,
            paradigm,
          ),
        ]),
      ),
    ) as Record<Paradigm, Record<string, string>>;

    return (
      <LearnPageShell>
        <div className="space-y-8">
          <TopicNav />
          <TopicHeader title={config.title} description={config.description} />
          <LearnExplorer
            initialParadigm={initialParadigm}
            highlighted={highlighted}
          />
        </div>
        <NextTopicLink {...config.nextTopic} />
      </LearnPageShell>
    );
  }

  // Topik methods
  const highlighted = await highlightConcepts(methodsConcepts, config.langs);

  return (
    <LearnPageShell>
      <div className="space-y-8">
        <TopicNav />
        <TopicHeader title={config.title} description={config.description} />
        <MethodsExplorer concepts={methodsConcepts} highlighted={highlighted} />
      </div>
      <NextTopicLink {...config.nextTopic} />
    </LearnPageShell>
  );
}
