import type { LearnConcept, Paradigm } from "./types";
import { functionalConcepts } from "./functional";
import { oopConcepts } from "./oop";

export { functionalConcepts, oopConcepts };

/**
 * Metadata setiap paradigma: label untuk tab, ringkasan singkat,
 * dan daftar konsep pembelajarannya.
 */
export const learnContent: Record<
  Paradigm,
  { label: string; tagline: string; concepts: LearnConcept[] }
> = {
  functional: {
    label: "Functional",
    tagline:
      "Membangun program dari function-function kecil yang pure dan tidak memutasi data, lalu menyusunnya menjadi alur data yang bisa diprediksi.",
    concepts: functionalConcepts,
  },
  oop: {
    label: "OOP",
    tagline:
      "Membangun program dari kumpulan object yang membungkus data dan perilaku, lalu saling berinteraksi melalui kontrak yang jelas.",
    concepts: oopConcepts,
  },
};

export const paradigmIds = Object.keys(learnContent) as Paradigm[];

/** Validasi nilai dari URL search param agar tetap aman. */
export function parseParadigm(value: string | undefined): Paradigm {
  return value === "oop" ? "oop" : "functional";
}
