import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import Reveal from "@/app/components/reveal";
import {
  projects,
  getProjectBySlug,
  slugifyProject,
} from "@/app/data/projects";

type ProjectDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: slugifyProject(project.name),
  }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Proyek tidak ditemukan" };
  }

  return {
    title: `${project.name} — Muhammad Alauddin Azhary`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const projectIndex = projects.findIndex(
    (item) => slugifyProject(item.name) === slug,
  );
  const formattedNumber = String(projectIndex + 1).padStart(2, "0");
  const totalCount = String(projects.length).padStart(2, "0");
  const nextProject =
    projects.length > 1 ? projects[(projectIndex + 1) % projects.length] : null;

  const links = [
    project.playStoreUrl ?
      { label: "Google Play Store", href: project.playStoreUrl }
    : null,
    project.sourceUrl ?
      { label: "Repository GitHub", href: project.sourceUrl }
    : null,
    project.demoUrl ? { label: "Demo App", href: project.demoUrl } : null,
  ].filter((link): link is { label: string; href: string } => link !== null);

  return (
    <div className="relative min-h-screen bg-[#08090d] text-zinc-100 selection:bg-emerald-500/30 selection:text-emerald-400">
      {/* Background Glow Mesh */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-250 h-125 bg-linear-to-b from-emerald-500/10 via-teal-500/5 to-transparent blur-[120px] rounded-full" />
        <div className="absolute top-1/3 -left-40 w-125 h-125 bg-emerald-600/5 blur-[140px] rounded-full" />
        <div className="absolute bottom-10 right-0 w-150 h-150 bg-emerald-500/5 blur-[160px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* Floating Header */}
      <Header />

      {/* Main Content */}
      <main className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 pt-16 sm:pt-24 pb-24">
        <Link
          href="/#project"
          className="group inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500 transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-emerald-400"
        >
          <span
            aria-hidden="true"
            className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-1"
          >
            ←
          </span>
          <span>Kembali ke Portofolio</span>
        </Link>

        {/* Masthead */}
        <header className="relative mt-12 sm:mt-16">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-8 right-0 select-none bg-linear-to-b from-white/10 via-white/5 to-transparent bg-clip-text font-mono text-[7rem] sm:-top-12 sm:text-[10rem] font-bold leading-none text-transparent"
          >
            {formattedNumber}
          </span>

          <div className="animate-rise flex items-center gap-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-emerald-400">
              Proyek
            </span>
            <span
              aria-hidden="true"
              className="h-px w-12 bg-linear-to-r from-emerald-500/50 to-transparent"
            />
            <span className="font-mono text-[11px] tracking-[0.2em] text-zinc-500">
              {formattedNumber} / {totalCount}
            </span>
          </div>

          <h1
            className="animate-rise mt-6 max-w-3xl text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white"
            style={{ animationDelay: "90ms" }}
          >
            {project.name}
          </h1>

          <p
            className="animate-rise mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-zinc-400"
            style={{ animationDelay: "180ms" }}
          >
            {project.description}
          </p>
        </header>

        {/* Spec Sheet */}
        <dl
          className="animate-rise mt-12 sm:mt-16 grid grid-cols-1 gap-x-10 gap-y-6 border-y border-white/5 py-6 sm:grid-cols-3 sm:py-8"
          style={{ animationDelay: "270ms" }}
        >
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
              Kategori
            </dt>
            <dd className="mt-2.5 text-sm leading-relaxed text-zinc-200">
              {project.category}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
              Peran
            </dt>
            <dd className="mt-2.5 text-sm leading-relaxed text-zinc-200">
              {project.role.length > 0 ? project.role.join(", ") : "—"}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
              Teknologi
            </dt>
            <dd className="mt-2.5 text-sm leading-relaxed text-zinc-200">
              {project.technologies.length} tools dalam stack
            </dd>
          </div>
        </dl>

        {/* Body: sticky meta rail + longform */}
        <div className="mt-16 sm:mt-24 grid grid-cols-1 lg:grid-cols-12 lg:gap-16">
          <aside className="lg:col-span-4">
            <div className="space-y-12 lg:sticky lg:top-32">
              <Reveal>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                  Teknologi
                </p>
                <ul className="mt-2 border-t border-white/5">
                  {project.technologies.map((tech, i) => (
                    <li
                      key={i}
                      className="group flex items-baseline gap-4 border-b border-white/5 py-3"
                    >
                      <span className="font-mono text-[10px] text-emerald-400/70">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm text-zinc-300 transition-[color,translate] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:text-white">
                        {tech}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              {links.length > 0 && (
                <Reveal delay={120}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                    Tautan
                  </p>
                  <div className="mt-2 border-t border-white/5">
                    {links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex items-center justify-between gap-4 border-b border-white/5 py-4"
                      >
                        <span className="text-sm font-medium text-zinc-300 transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-emerald-300">
                          {link.label}
                        </span>
                        <span
                          aria-hidden="true"
                          className="font-mono text-xs text-zinc-500 transition-[color,translate] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:translate-x-1 group-hover:text-emerald-400"
                        >
                          ↗
                        </span>
                        <span
                          aria-hidden="true"
                          className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-linear-to-r from-emerald-400/60 to-transparent transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                        />
                      </a>
                    ))}
                  </div>
                </Reveal>
              )}
            </div>
          </aside>

          <div className="mt-16 space-y-16 sm:space-y-24 lg:col-span-8 lg:mt-0">
            {project.contributions && (
              <section className="space-y-6">
                <Reveal>
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="h-px w-8 bg-emerald-400/50"
                    />
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-400">
                      Kontribusi
                    </p>
                  </div>
                  <h2 className="mt-5 text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                    Apa yang Saya Kerjakan
                  </h2>
                </Reveal>
                <Reveal delay={120}>
                  <p className="border-l-2 border-emerald-500/30 pl-5 sm:pl-6 text-sm sm:text-base leading-loose text-zinc-300">
                    {project.contributions}
                  </p>
                </Reveal>
              </section>
            )}

            {project.result && (
              <section className="space-y-6">
                <Reveal>
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="h-px w-8 bg-emerald-400/50"
                    />
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-400">
                      Hasil
                    </p>
                  </div>
                  <h2 className="mt-5 text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                    Dampak & Pencapaian
                  </h2>
                </Reveal>
                <Reveal delay={120}>
                  <p className="text-sm sm:text-base leading-relaxed text-zinc-300">
                    {project.result}
                  </p>
                </Reveal>
              </section>
            )}
          </div>
        </div>

        {/* Next Project */}
        {nextProject && (
          <Reveal className="mt-24 sm:mt-32">
            <div className="border-t border-white/5 pt-10 sm:pt-14">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                Proyek Berikutnya
              </p>
              <Link
                href={`/projects/${slugifyProject(nextProject.name)}`}
                className="group mt-5 flex items-center justify-between gap-6"
              >
                <span className="text-2xl sm:text-4xl font-semibold tracking-tight text-zinc-500 transition-[color,translate] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2 group-hover:text-white">
                  {nextProject.name}
                </span>
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 text-zinc-500 transition-[color,border-color,translate] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:border-emerald-500/40 group-hover:text-emerald-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </Reveal>
        )}
      </main>

      {/* Minimal Footer */}
      <Footer />
    </div>
  );
}
