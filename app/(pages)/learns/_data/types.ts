export type Paradigm = "functional" | "oop";
export type LearnTopic = "paradigms" | "methods";

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
};
