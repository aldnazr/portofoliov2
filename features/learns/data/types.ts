export type Paradigm = "functional" | "oop";
export type LearnTopic = "paradigms" | "methods" | "state-management";

/** Sisi ekosistem pada topik state-management: Zustand (React) atau Riverpod (Flutter). */
export type StateLibrary = "zustand" | "riverpod";

/** Kepemilikan method: Array/List, String, atau Set. */
export type MethodFilter = "array" | "string" | "set";

export type LearnCodeExample = {
  code: string;
  filename?: string;
  language?: "typescript" | "tsx" | "dart" | "kotlin" | "bash";
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
  /** Chip meta di samping judul (mis. nama API seperti `ref.watch`). */
  meta?: string;
  /** Hanya untuk topik methods: jenis method yang dipegang konsep ini. */
  kind?: MethodFilter;
};
