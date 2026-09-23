import type { Metadata } from "next";
import { Suspense } from "react";
import MethodsExplorer from "../../_components/methods-explorer";
import { ContentSkeleton } from "../../_components/learn-skeleton";
import NextTopicLink from "../../_components/next-topic-link";
import TopicHeader from "../../_components/topic-header";
import { methodsConcepts } from "../../_data";
import { highlightConcepts } from "../../_data/highlight";

const description =
  "Keterangan dan contoh penggunaan dari method transformasi data esensial: forEach, map, filter, reduce, flat, flatMap, split, dan join.";

export const metadata: Metadata = {
  title: "Array & String Methods | Interactive Learning Lab",
  description,
};

export default function MethodsPage() {
  return (
    <>
      <TopicHeader title="Array & String Methods" description={description} />
      {/* Highlight Shiki berjalan di server; shell tampil lebih dulu. */}
      <Suspense fallback={<ContentSkeleton />}>
        <MethodsContent />
      </Suspense>
      <NextTopicLink href="/learns/paradigms" title="Functional & OOP" />
    </>
  );
}

async function MethodsContent() {
  const highlighted = await highlightConcepts(methodsConcepts);
  return <MethodsExplorer concepts={methodsConcepts} highlighted={highlighted} />;
}