export type Paradigm = "functional" | "oop";
export type LearnTopic = "paradigms" | "methods";

/** Kepemilikan method: Array/List, String, atau Set. */
export type MethodFilter = "array" | "string" | "set";

export type LearnCodeExample = {
  code: string;
  filename?: string;
  language?: "typescript" | "dart" | "kotlin";
};

/**
 * Satu materi pembelajaran dalam halaman learns.
 * `code` berisi source kode mentah (tanpa highlight).
 */
export type LearnConcept = LearnCodeExample & {
  id: string;
  title: string;
  description: string;
  examples?: LearnCodeExample[];
  /** Hanya untuk topik methods: jenis method yang dipegang konsep ini. */
  kind?: MethodFilter;
};
