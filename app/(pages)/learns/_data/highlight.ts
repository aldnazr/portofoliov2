import { createHighlighter } from "shiki";
import type { LearnConcept, Paradigm } from "./types";

// ponytail: satu highlighter per proses server; cukup karena ketiga bahasa
// selalu dibutuhkan gabungan — buat lazy-load per bahasa kalau init terasa berat.
const highlighterPromise = createHighlighter({
  langs: ["typescript", "dart", "kotlin"],
  themes: ["github-light", "github-dark"],
});

/**
 * Highlight semua snippet konsep dengan Shiki (dijalankan di server).
 * `paradigm` hanya menentukan bahasa fallback saat `concept.language` kosong.
 */
export async function highlightConcepts(
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