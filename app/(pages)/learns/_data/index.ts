import type { LearnConcept, MethodFilter, Paradigm } from "./types";
import { functionalConcepts } from "./functional";
import { oopConcepts } from "./oop";
import { methodsConcepts } from "./methods";

export { functionalConcepts, oopConcepts, methodsConcepts };

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

/** Urutan tab filter method di topik methods. */
export const methodFilterIds: MethodFilter[] = ["array", "string"];

export const methodFilterLabels: Record<MethodFilter, string> = {
  array: "Array",
  string: "String",
};
