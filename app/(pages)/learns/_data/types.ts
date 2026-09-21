export type Paradigm = "functional" | "oop";

/**
 * Satu materi pembelajaran dalam halaman learns.
 * `code` berisi source TypeScript mentah (tanpa highlight).
 */
export type LearnConcept = {
  id: string;
  title: string;
  description: string;
  code: string;
  filename?: string;
};
