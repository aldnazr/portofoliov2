import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import BackLink from "@/components/back-link";
import ConceptExplorer, {
  type ExplorerGroup,
} from "../../_components/concept-explorer";
import { ContentSkeleton } from "../../_components/learn-skeleton";
import NextTopicLink from "../../_components/next-topic-link";
import ScrollToTop from "../../_components/scroll-to-top";
import TopicHeader from "../../_components/topic-header";
import {
  learnContent,
  methodFilterOptions,
  methodTypeLabel,
  methodsConcepts,
  paradigmIds,
} from "../../_data";
import { highlightConcepts } from "../../_data/highlight";
import type { LearnTopic, MethodFilter, Paradigm } from "../../_data/types";

type TopicMeta = {
  /** `h1` + description di bawah header. */
  title: string;
  /** Judul browser (suffix `| Interactive Learning Lab`). */
  metaTitle: string;
  description: string;
  next: { href: string; title: string };
};

/** Registry topik learns: sumber metadata untuk `generateStaticParams` & halaman. */
const topics: Record<LearnTopic, TopicMeta> = {
  paradigms: {
    title: "Functional Programming & OOP",
    metaTitle: "Functional & OOP | Interactive Learning Lab",
    description:
      "Dua paradigma pemrograman yang paling banyak dipakai, dipelajari lewat contoh kode TypeScript, Dart, dan Kotlin yang bisa langsung dijalankan.",
    next: { href: "/learns/methods", title: "Array & String Methods" },
  },
  methods: {
    title: "Array & String Methods",
    metaTitle: "Array & String Methods | Interactive Learning Lab",
    description:
      "Keterangan dan contoh penggunaan dari method transformasi data esensial: forEach, map, filter, reduce, flat, flatMap, split, dan join.",
    next: { href: "/learns/paradigms", title: "Functional & OOP" },
  },
};

type LearnTopicPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.keys(topics).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: LearnTopicPageProps): Promise<Metadata> {
  const { slug } = await params;
  const topic = topics[slug as LearnTopic];

  if (!topic) return { title: "Topik tidak ditemukan" };

  return { title: topic.metaTitle, description: topic.description };
}

export default async function LearnTopicPage({ params }: LearnTopicPageProps) {
  const { slug } = await params;
  const topic = topics[slug as LearnTopic];

  if (!topic) notFound();

  return (
    <>
      <BackLink href="/learns" label="Kembali ke Daftar Topik" />
      <TopicHeader title={topic.title} description={topic.description} />
      <Suspense fallback={<ContentSkeleton />}>
        <TopicContent slug={slug} />
      </Suspense>
      <NextTopicLink href={topic.next.href} title={topic.next.title} />
      <ScrollToTop />
    </>
  );
}

async function TopicContent({ slug }: { slug: string }) {
  if (slug === "methods") {
    const highlighted = await highlightConcepts(methodsConcepts);
    const filterConcepts = (kind: MethodFilter) =>
      methodsConcepts.filter(
        (concept) => concept.kind === kind || concept.kind === "both",
      );
    const groups: Record<MethodFilter, ExplorerGroup> = {
      array: { concepts: filterConcepts("array"), highlighted },
      string: { concepts: filterConcepts("string"), highlighted },
      set: { concepts: filterConcepts("set"), highlighted },
    };

    return (
      <ConceptExplorer
        idPrefix="method"
        param="kind"
        options={methodFilterOptions}
        groups={groups}
        titleWrap={{ prefix: ".", suffix: "()" }}
        metaByConcept={Object.fromEntries(
          methodsConcepts.map((concept) => [
            concept.id,
            methodTypeLabel(concept),
          ]),
        )}
      />
    );
  }

  const highlighted = Object.fromEntries(
    await Promise.all(
      paradigmIds.map(async (paradigm) => [
        paradigm,
        await highlightConcepts(learnContent[paradigm].concepts, paradigm),
      ]),
    ),
  ) as Record<Paradigm, Record<string, string>>;

  const groups = Object.fromEntries(
    paradigmIds.map((paradigm) => [
      paradigm,
      {
        eyebrow: `Paradigma ${learnContent[paradigm].label}`,
        tagline: learnContent[paradigm].tagline,
        concepts: learnContent[paradigm].concepts,
        highlighted: highlighted[paradigm],
        defaultLang: paradigm === "oop" ? "dart" : "ts",
      },
    ]),
  ) as Record<Paradigm, ExplorerGroup>;

  return (
    <ConceptExplorer
      idPrefix="paradigm"
      param="paradigm"
      options={paradigmIds.map((id) => ({ id, label: learnContent[id].label }))}
      groups={groups}
    />
  );
}
