import { createHighlighter } from "shiki";
import type { LearnConcept, Paradigm } from "./types";

// ponytail: satu highlighter per proses server; cukup karena kelima bahasa
// selalu dibutuhkan gabungan; buat lazy-load per bahasa kalau init terasa berat.
const highlighterPromise = createHighlighter({
  langs: ["typescript", "tsx", "dart", "kotlin", "bash"],
  themes: ["github-light", "github-dark"],
});

export async function highlightCode(
  code: string,
  lang = "typescript",
): Promise<string> {
  const highlighter = await highlighterPromise;
  return highlighter.codeToHtml(code.trim(), {
    lang,
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: "light-dark()",
  });
}

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
    concepts.flatMap((concept) =>
      [concept, ...(concept.examples ?? [])].map((example, index) => [
        index === 0 ? concept.id : `${concept.id}-example-${index}`,
        highlighter.codeToHtml(example.code.trim(), {
          lang: example.language ?? (paradigm === "oop" ? "dart" : "typescript"),
          themes: { light: "github-light", dark: "github-dark" },
          defaultColor: "light-dark()",
        }),
      ]),
    ),
  );
}