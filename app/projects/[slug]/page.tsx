import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/app/components/footer";
import Reveal from "@/app/components/reveal";
import BackgroundMesh from "@/app/components/background-mesh";
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
    ...(project.playStoreUrl?.map((ps) => ({
      label: ps.title,
      href: ps.url,
    })) ?? []),
    project.sourceUrl ?
      { label: "Repository GitHub", href: project.sourceUrl }
    : null,
    project.demoUrl ? { label: "Demo App", href: project.demoUrl } : null,
  ].filter((link): link is { label: string; href: string } => link !== null);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Background Glow Mesh */}
      <BackgroundMesh />

      {/* Main Content */}
      <main className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 pt-8 sm:pt-24 pb-16 sm:pb-24">
        <Link
          href="/#project"
          aria-label="Kembali ke portofolio bagian proyek"
          className="group inline-flex items-center gap-2.5 rounded-full border border-hairline bg-surface/60 px-4 py-2 text-xs font-medium text-foreground-soft shadow-2xs backdrop-blur-md transition-[color,background-color,border-color,transform,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-accent-wash-border hover:bg-accent-wash hover:text-foreground active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span
            aria-hidden="true"
            className="inline-block font-mono text-sm text-subtle transition-[color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-1 group-hover:text-accent-strong"
          >
            ←
          </span>
          <span>Kembali ke Portofolio</span>
        </Link>

        {/* Masthead */}
        <header className="relative mt-6 sm:mt-16">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-4 right-0 select-none bg-linear-to-b from-overlay-strong via-overlay to-transparent bg-clip-text font-mono text-6xl sm:-top-12 sm:text-[10rem] font-bold leading-none text-transparent"
          >
            {formattedNumber}
          </span>

          <div className="animate-rise flex items-center gap-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent-strong">
              Proyek
            </span>
            <span
              aria-hidden="true"
              className="h-px w-12 bg-linear-to-r from-accent/50 to-transparent"
            />
            <span className="font-mono text-[11px] tracking-[0.2em] text-subtle">
              {formattedNumber} / {totalCount}
            </span>
          </div>

          <h1
            className="animate-rise mt-4 sm:mt-6 max-w-3xl text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground"
            style={{ animationDelay: "90ms" }}
          >
            {project.name}
          </h1>

          <p
            className="animate-rise mt-3 sm:mt-6 max-w-2xl text-sm sm:text-lg leading-relaxed text-muted"
            style={{ animationDelay: "180ms" }}
          >
            {project.description}
          </p>
        </header>

        {/* Spec Sheet */}
        <dl
          className="animate-rise mt-8 sm:mt-16 grid grid-cols-1 gap-x-10 gap-y-4 border-y border-hairline-soft py-4 sm:grid-cols-3 sm:py-8"
          style={{ animationDelay: "270ms" }}
        >
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-subtle">
              Kategori
            </dt>
            <dd className="mt-1.5 sm:mt-2.5 text-sm leading-relaxed text-foreground-soft">
              {project.category}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-subtle">
              Peran
            </dt>
            <dd className="mt-1.5 sm:mt-2.5 text-sm leading-relaxed text-foreground-soft">
              {project.role.length > 0 ? project.role.join(", ") : "—"}{" "}
              {"Developer"}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-subtle">
              Teknologi
            </dt>
            <dd className="mt-1.5 sm:mt-2.5 text-sm leading-relaxed text-foreground-soft">
              {project.technologies.length} tools dalam stack
            </dd>
          </div>
        </dl>

        {/* Body: sticky meta rail + longform */}
        <div className="mt-10 sm:mt-24 grid grid-cols-1 lg:grid-cols-12 lg:gap-16">
          <aside className="lg:col-span-4">
            <div className="space-y-8 lg:space-y-12 lg:sticky lg:top-32">
              <Reveal>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-subtle">
                  Teknologi
                </p>
                <ul className="mt-2 border-t border-hairline-soft">
                  {project.technologies.map((tech, i) => (
                    <li
                      key={i}
                      className="group flex items-baseline gap-4 border-b border-hairline-soft py-2.5 sm:py-3"
                    >
                      <span className="font-mono text-[10px] text-accent/70">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm text-foreground-soft transition-[color,translate] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:text-foreground">
                        {tech}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              {links.length > 0 && (
                <Reveal delay={120}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-subtle">
                    Tautan
                  </p>
                  <div className="mt-2 border-t border-hairline-soft">
                    {links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex items-center justify-between gap-4 border-b border-hairline-soft py-3 sm:py-4"
                      >
                        <span className="text-sm font-medium text-foreground-soft transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-accent-hover">
                          {link.label}
                        </span>
                        <span
                          aria-hidden="true"
                          className="font-mono text-xs text-subtle transition-[color,translate] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:translate-x-1 group-hover:text-accent-strong"
                        >
                          ↗
                        </span>
                        <span
                          aria-hidden="true"
                          className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-linear-to-r from-accent/60 to-transparent transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                        />
                      </a>
                    ))}
                  </div>
                </Reveal>
              )}
            </div>
          </aside>

          <div className="mt-10 space-y-10 sm:space-y-24 lg:col-span-8 lg:mt-0">
            {project.contributions && (
              <section className="space-y-4 sm:space-y-6">
                <Reveal>
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="h-px w-8 bg-accent/50"
                    />
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent-strong">
                      Kontribusi
                    </p>
                  </div>
                  <h2 className="mt-4 sm:mt-5 text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                    Apa yang Saya Kerjakan
                  </h2>
                </Reveal>
                <Reveal delay={120}>
                  <p className="border-l-2 border-accent-wash-border pl-4 sm:pl-6 text-sm sm:text-base leading-relaxed sm:leading-loose text-foreground-soft">
                    {project.contributions}
                  </p>
                </Reveal>
              </section>
            )}

            {project.result && (
              <section className="space-y-4 sm:space-y-6">
                <Reveal>
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="h-px w-8 bg-accent/50"
                    />
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent-strong">
                      Hasil
                    </p>
                  </div>
                  <h2 className="mt-4 sm:mt-5 text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                    Dampak & Pencapaian
                  </h2>
                </Reveal>
                <Reveal delay={120}>
                  <p className="text-sm sm:text-base leading-relaxed text-foreground-soft">
                    {project.result}
                  </p>
                </Reveal>
              </section>
            )}
          </div>
        </div>

        {/* Next Project */}
        {nextProject && (
          <Reveal className="mt-14 sm:mt-32">
            <div className="border-t border-hairline-soft pt-8 sm:pt-14">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-subtle">
                Proyek Berikutnya
              </p>
              <Link
                href={`/projects/${slugifyProject(nextProject.name)}`}
                className="group mt-5 flex items-center justify-between gap-6"
              >
                <span className="text-2xl sm:text-4xl font-semibold tracking-tight text-subtle transition-[color,translate] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2 group-hover:text-foreground">
                  {nextProject.name}
                </span>
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-hairline text-subtle transition-[color,border-color,translate] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:border-accent-wash-border group-hover:text-accent-hover group-hover:translate-x-1"
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
