import type {
  LearnConcept,
  MethodFilter,
  Paradigm,
  StateLibrary,
} from "./types";
import { functionalConcepts } from "./functional";
import { oopConcepts } from "./oop";
import { methodsConcepts } from "./methods";
import { zustandConcepts } from "./zustand";
import { riverpodConcepts } from "./riverpod";

export {
  functionalConcepts,
  oopConcepts,
  methodsConcepts,
  zustandConcepts,
  riverpodConcepts,
};

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

/** Opsi tab filter method di topik methods. */
export const methodFilterOptions: { id: MethodFilter; label: string }[] = [
  { id: "array", label: "Array" },
  { id: "string", label: "String" },
  { id: "set", label: "Set" },
];

/** Label chip meta tiap konsep method (mis. `Array.prototype`, `String (Dart)`). */
export function methodTypeLabel(concept: LearnConcept): string {
  if (concept.language === "dart") {
    return concept.kind === "string" ? "String (Dart)" : "List (Dart)";
  }
  return concept.kind === "string"
    ? "String.prototype"
    : concept.kind === "set"
      ? "Set.prototype"
      : "Array.prototype";
}

/**
 * Metadata tiap sisi topik state-management: label tab, eyebrow,
 * ringkasan singkat, dan daftar konsep pembelajarannya.
 */
export const stateContent: Record<
  StateLibrary,
  { label: string; eyebrow: string; tagline: string; concepts: LearnConcept[] }
> = {
  zustand: {
    label: "Zustand",
    eyebrow: "React · Zustand",
    tagline:
      "State React dipegang satu store global: subscribe pakai selector, baca atau ubah sekali pakai getState() dan setState(), side effect tanpa re-render pakai subscribe().",
    concepts: zustandConcepts,
  },
  riverpod: {
    label: "Riverpod",
    eyebrow: "Flutter · Riverpod",
    tagline:
      "State Flutter dipegang provider hasil build_runner: subscribe pakai ref.watch, baca atau panggil sekali pakai ref.read, side effect tanpa rebuild pakai ref.listen.",
    concepts: riverpodConcepts,
  },
};

export const stateLibraryIds = Object.keys(stateContent) as StateLibrary[];
