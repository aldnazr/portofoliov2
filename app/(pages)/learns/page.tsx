import type { Metadata } from "next";
import Link from "next/link";
import { createHighlighter } from "shiki";
import { learnContent, paradigmIds, parseParadigm } from "./_data";
import type { Paradigm } from "./_data/types";
import LearnExplorer from "./_components/learn-explorer";
// import "./shiki.css";
import BackgroundMesh from "@/components/background-mesh";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Learn",
  description:
    "Belajar perbandingan Functional Programming (TypeScript) dan Object-Oriented Programming (Dart): pure function, immutability, higher-order function, closure, recursion, encapsulation, inheritance, polymorphism, dan abstraction.",
};

type LearnPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function LearnPage({ searchParams }: LearnPageProps) {
  const params = await searchParams;
  const raw =
    Array.isArray(params.paradigm) ? params.paradigm[0] : params.paradigm;
  const initialParadigm: Paradigm = parseParadigm(raw);

  // Highlighter dibuat satu kali, lalu dipakai untuk seluruh snippet.
  // Hanya bahasa dan tema yang dibutuhkan yang dimuat.
  const highlighter = await createHighlighter({
    langs: ["typescript", "dart"],
    themes: ["github-light", "github-dark"],
  });

  // Seluruh snippet di-highlight di server. defaultColor: false membuat
  // Shiki memancarkan --shiki-light / --shiki-dark, bukan warna inline,
  // sehingga tema mengikuti data-theme project.
  const highlighted = Object.fromEntries(
    paradigmIds.map((paradigm) => [
      paradigm,
      Object.fromEntries(
        learnContent[paradigm].concepts.map((concept) => [
          concept.id,
          highlighter.codeToHtml(concept.code.trim(), {
            lang: paradigm === "oop" ? "dart" : "typescript",
            themes: { light: "github-light", dark: "github-dark" },
            defaultColor: "light-dark()",
          }),
        ]),
      ),
    ]),
  ) as Record<Paradigm, Record<string, string>>;

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <BackgroundMesh />
      <Header />

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-24">
        <div className="space-y-8">
          <Link
            href="/"
            aria-label="Kembali ke halaman utama portofolio"
            className="group inline-flex items-center gap-2.5 rounded-full border border-hairline bg-surface/60 px-4 py-2 text-xs font-medium text-foreground-soft backdrop-blur-md transition-all duration-300 hover:border-accent-wash-border hover:bg-accent-wash hover:text-foreground active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <span
              aria-hidden="true"
              className="inline-block font-mono text-sm text-subtle transition-all duration-300 group-hover:-translate-x-1 group-hover:text-accent-strong"
            >
              ←
            </span>
            <span>Kembali ke Portofolio</span>
          </Link>

          <header className="space-y-1.5 md:space-y-2.5">
            <p className="px-3 py-1 max-w-fit rounded-full text-[10px] uppercase tracking-[0.2em] font-mono text-accent-strong border border-accent-wash-border bg-accent-wash">
              Belajar
            </p>
            <h1 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
              Functional Programming & OOP
            </h1>
            <p className="text-sm sm:text-base text-muted leading-relaxed max-w-2xl">
              Dua paradigma pemrograman yang paling banyak dipakai, dipelajari
              lewat contoh kode TypeScript dan Dart yang bisa langsung
              dijalankan.
            </p>
          </header>

          <LearnExplorer
            initialParadigm={initialParadigm}
            highlighted={highlighted}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
