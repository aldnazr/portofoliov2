import type { Metadata } from "next";
import { Suspense } from "react";
import LearnExplorer from "../../_components/learn-explorer";
import { ContentSkeleton } from "../../_components/learn-skeleton";
import NextTopicLink from "../../_components/next-topic-link";
import TopicHeader from "../../_components/topic-header";
import { learnContent, paradigmIds } from "../../_data";
import { highlightConcepts } from "../../_data/highlight";
import type { Paradigm } from "../../_data/types";

const description =
  "Dua paradigma pemrograman yang paling banyak dipakai, dipelajari lewat contoh kode TypeScript, Dart, dan Kotlin yang bisa langsung dijalankan.";

export const metadata: Metadata = {
  title: "Functional & OOP | Interactive Learning Lab",
  description,
};

export default function ParadigmsPage() {
  return (
    <>
      <TopicHeader
        title="Functional Programming & OOP"
        description={description}
      />
      {/* Highlight Shiki berjalan di server; shell tampil lebih dulu. */}
      <Suspense fallback={<ContentSkeleton />}>
        <ParadigmsContent />
      </Suspense>
      <NextTopicLink href="/learns/methods" title="Array & String Methods" />
    </>
  );
}

async function ParadigmsContent() {
  const highlighted = Object.fromEntries(
    await Promise.all(
      paradigmIds.map(async (paradigm) => [
        paradigm,
        await highlightConcepts(learnContent[paradigm].concepts, paradigm),
      ]),
    ),
  ) as Record<Paradigm, Record<string, string>>;

  return <LearnExplorer highlighted={highlighted} />;
}