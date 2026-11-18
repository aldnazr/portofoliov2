import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import ProjectVisual from "@/components/project-visual.tsx";
import ProjectActionLink from "@/components/project-action-link.tsx";
import { projects, getProjectBySlug, slugifyProject } from "@/data/projects.ts";
import {
  ArrowIcon,
  BrowserIcon,
  GithubIcon,
  PlayStoreIcon,
} from "@/components/svg-icons/icons";
import PageShell from "@/components/page-shell.tsx";

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

  return (
    <PageShell currentLabel={project.name} backHref="/#project">
      <article className="overflow-hidden rounded-3xl border border-hairline bg-surface shadow-elevated sm:rounded-4xl">
        <div className="grid lg:grid-cols-12">
          <div className="relative aspect-16/10 overflow-hidden bg-neutral-950 lg:order-2 lg:col-span-5 lg:aspect-auto lg:min-h-96">
            {project.image ? (
              <Image
                src={project.image.src}
                alt={project.image.alt || project.name}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 90vw, 100vw"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0" style={{ colorScheme: "dark" }}>
                <ProjectVisual
                  number={formattedNumber}
                  name={project.name}
                  category={project.category}
                  variant="hero"
                  className="h-full rounded-none border-0"
                />
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-8 lg:col-span-7 lg:p-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-accent-wash-border bg-accent-wash px-3 py-1 text-xs font-medium text-accent-strong">
                {project.category}
              </span>
              <span className="rounded-full border border-hairline bg-overlay px-3 py-1 font-mono text-xs text-muted tabular-nums">
                {formattedNumber} / {totalCount}
              </span>
            </div>

            <header>
              <h1 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {project.name}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                {project.description}
              </p>
            </header>

            <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-t border-hairline pt-4 text-sm">
              <div className="flex gap-2">
                <dt className="text-muted">Peran:</dt>
                <dd className="font-medium text-foreground-soft">
                  {project.role.length > 0 ? project.role.join(", ") : "—"}
                </dd>
              </div>
              {project.year && (
                <div className="flex gap-2">
                  <dt className="text-muted">Tahun:</dt>
                  <dd className="font-medium text-foreground-soft">
                    {project.year}
                  </dd>
                </div>
              )}
            </dl>

            {(project.playStoreUrl?.length ||
              project.sourceUrl ||
              project.demoUrl) && (
              <div className="mt-6 flex flex-wrap gap-2">
                {project.playStoreUrl?.map((store) => (
                  <ProjectActionLink key={store.url} href={store.url}>
                    <PlayStoreIcon className="size-4 shrink-0" />
                    {store.title}
                  </ProjectActionLink>
                ))}
                {project.sourceUrl && (
                  <ProjectActionLink href={project.sourceUrl}>
                    <GithubIcon className="size-4 shrink-0" />
                    Repository GitHub
                  </ProjectActionLink>
                )}
                {project.demoUrl && (
                  <ProjectActionLink href={project.demoUrl}>
                    <BrowserIcon className="size-4 shrink-0" />
                    Demo App
                  </ProjectActionLink>
                )}
              </div>
            )}
          </div>
        </div>
      </article>

      <div className="mt-5 grid gap-5 sm:mt-6 sm:gap-6 lg:grid-cols-12">
        <section className="rounded-3xl border border-hairline bg-surface p-6 sm:p-8 lg:col-span-4">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Teknologi
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <li
                key={tech}
                className="rounded-lg border border-hairline bg-surface-muted px-3 py-1 text-xs font-mono text-foreground-soft"
              >
                {tech}
              </li>
            ))}
          </ul>
        </section>

        {(project.contributions || project.result) && (
          <div className="space-y-5 sm:space-y-6 lg:col-span-8">
            {project.contributions && (
              <section className="rounded-3xl border border-hairline bg-surface p-6 sm:p-8">
                <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                  Apa yang Saya Kerjakan
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-foreground-soft sm:text-base">
                  {project.contributions}
                </p>
              </section>
            )}
            {project.result && (
              <section className="rounded-3xl border border-hairline bg-surface p-6 sm:p-8">
                <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                  Dampak & Pencapaian
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-foreground-soft sm:text-base">
                  {project.result}
                </p>
              </section>
            )}
          </div>
        )}
      </div>

      {nextProject && (
        <Link
          href={`/projects/${slugifyProject(nextProject.name)}`}
          className="group mt-5 flex items-center justify-between gap-4 rounded-3xl border border-hairline bg-overlay-faint p-5 transition-colors hover:border-accent-wash-border hover:bg-overlay focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:mt-6 sm:p-6"
        >
          <span className="min-w-0">
            <span className="block text-xs font-medium text-muted">
              Proyek Berikutnya
            </span>
            <span className="mt-1 block text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent-hover sm:text-xl">
              {nextProject.name}
            </span>
          </span>
          <span
            aria-hidden="true"
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-hairline bg-surface text-foreground-soft transition-colors group-hover:border-accent-wash-border group-hover:text-accent-hover"
          >
            <ArrowIcon direction="right" />
          </span>
        </Link>
      )}
    </PageShell>
  );
}
