export type Paradigm = "functional" | "oop";
export type LearnTopic = "paradigms" | "methods";

/** Jenis method untuk filter di topik methods. */
export type MethodFilter = "array" | "string";
/** Kepemilikan method: Array.prototype, String.prototype, atau keduanya. */
export type MethodKind = MethodFilter | "both";

/**
 * Satu materi pembelajaran dalam halaman learns.
 * `code` berisi source kode mentah (tanpa highlight).
 */
export type LearnConcept = {
  id: string;
  title: string;
  description: string;
  code: string;
  filename?: string;
  language?: "typescript" | "dart" | "kotlin";
  /** Hanya untuk topik methods: jenis method yang dipegang konsep ini. */
  kind?: MethodKind;
};
