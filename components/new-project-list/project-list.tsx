import type { CSSProperties, ReactNode } from "react";
import { LuGithub, LuLink } from "react-icons/lu";
import { GlassLink } from "./glass-link";
import { ProjectImage } from "./project-image";
import { Project } from "@/data/types";
import { slugifyProject } from "@/data/projects";

type ProjectListProps = {
  projects: Project[];
  fade?: number;
  className?: string;
};

export function ProjectList({
  projects,
  fade = 4,
  className = "",
}: ProjectListProps) {
  if (projects.length === 0) {
    return <p className="mt-6 text-neutral-400">No projects yet.</p>;
  }

  return (
    <ul
      data-fade={fade}
      style={{ "--fade": fade } as CSSProperties}
      className={`project-list mt-6 grid gap-8 ${className}`}
    >
      {/* kartu index genap (0, 2, 4…) → gambar di kanan, sisanya di kiri */}
      {projects.map((project, i) => (
        <ProjectCard key={i} project={project} reverse={i % 2 === 0} />
      ))}
    </ul>
  );
}

function ProjectCard({
  project,
  reverse,
}: {
  project: Project;
  reverse: boolean;
}) {
  const { title, description, image, technologies, demoUrl, sourceUrl } =
    project;
  const detailHref = `/projects/${slugifyProject(title)}`;

  return (
    <li className={`gap-8 lg:flex ${reverse ? "flex-row-reverse" : ""}`}>
      {image && (
        <div className="relative aspect-video shrink-0 lg:aspect-square lg:h-full">
          <figure className="pointer-events-none isolate z-1 hidden h-full overflow-hidden rounded-xl border border-neutral-900 shadow-sm lg:block lg:aspect-square dark:shadow-none">
            <ProjectImage
              src={image?.src}
              alt={image?.alt}
              ratio="square"
              sizes="(min-width: 1024px) 420px, 100vw"
            />
          </figure>

          <figure className="pointer-events-none isolate z-1 aspect-video overflow-hidden rounded-xl rounded-b-none border border-b-0 border-dashed border-neutral-900 shadow-sm lg:hidden dark:shadow-none">
            <ProjectImage
              src={image?.src}
              alt={image?.alt}
              ratio="video"
              sizes="100vw"
            />
          </figure>
        </div>
      )}

      <div className="grow rounded-xl rounded-t-none border border-dashed border-neutral-900 p-6 lg:rounded-t-xl lg:p-8">
        <h3 className="text-2xl font-semibold tracking-tight text-neutral-50 lg:text-3xl">
          {title}
        </h3>
        <p className="mt-6 text-base leading-relaxed text-foreground-soft">
          {description}
        </p>

        <div className="mt-6 flex items-center gap-2">
          <p className="text-sm text-foreground-soft">Tech Stack:</p>
          <div className="flex flex-wrap items-center gap-1 text-xs font-medium text-neutral-300">
            {technologies.map((tech, i) => (
              <span key={tech} className="inline-flex items-center">
                <span className="text-foreground-soft">{tech}</span>
                {i < technologies.length - 1 && ","}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-10 flex w-full flex-wrap items-center justify-between gap-4">
          <GlassLink href={detailHref}>
            View Project<span className="sr-only">: {title}</span>
          </GlassLink>

          {(sourceUrl || demoUrl) && (
            <div className="flex items-center gap-6">
              {sourceUrl && (
                <ExternalLink
                  href={sourceUrl}
                  icon={<LuGithub size={15} strokeWidth={1.3} />}
                >
                  Repository<span className="sr-only">: {title}</span>
                </ExternalLink>
              )}
              {demoUrl && (
                <ExternalLink
                  href={demoUrl}
                  icon={<LuLink size={14} strokeWidth={1.3} />}
                >
                  Open Live Site<span className="sr-only">: {title}</span>
                </ExternalLink>
              )}
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

function ExternalLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group default-ring flex items-center gap-1.5 text-sm text-neutral-300 underline decoration-transparent transition-colors hover:decoration-current focus-visible:decoration-current active:decoration-[color-mix(in_srgb,currentColor_65%,#171717)]"
    >
      <span
        aria-hidden="true"
        className="flex text-neutral-500 transition-colors group-hover:text-accent-500 group-focus-visible:text-accent-500"
      >
        {icon}
      </span>
      {children}
    </a>
  );
}
