"use client";

import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { LuGithub, LuLink } from "react-icons/lu";
import { GlassLink } from "./glass-link";
import { ProjectImage } from "./project-image";
import OutlineTextBackground from "@/components/background/OutlineTextBackground";
import { Project } from "@/data/types";
import { slugifyProject } from "@/data/projects";
import Pagination from "@/components/pagination.tsx";

type ProjectListProps = {
  projects: Project[];
  fade?: number;
  className?: string;
};

const ITEMS_PER_PAGE = 3;

export function ProjectList({
  projects,
  fade = 4,
  className = "",
}: ProjectListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
    document.getElementById("project")?.scrollIntoView({ behavior: "smooth" });
  };

  const currentProjects = projects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  if (projects.length === 0) {
    return <p className="mt-6 text-neutral-400">No projects yet.</p>;
  }

  return (
    <div className={`project-list-wrapper ${className}`}>
      <ul
        data-fade={fade}
        style={{ "--fade": fade } as CSSProperties}
        className={`project-list mt-6 grid gap-8`}
      >
        {currentProjects.map((project, i) => (
          <ProjectCard key={i} project={project} reverse={i % 2 === 0} />
        ))}
      </ul>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
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
      <div className="relative aspect-video shrink-0 lg:aspect-square lg:h-full">
        {image ? (
          <>
            <figure className="pointer-events-none isolate z-1 hidden h-full overflow-hidden rounded-xl border border-neutral-900 shadow-sm lg:block lg:aspect-square dark:shadow-none">
              <ProjectImage
                src={image?.src}
                alt={image?.alt}
                title={title}
                ratio="square"
                sizes="(min-width: 1024px) 420px, 100vw"
              />
            </figure>

            <figure className="pointer-events-none isolate z-1 aspect-video overflow-hidden rounded-xl rounded-b-none border border-b-0 border-dashed border-neutral-900 shadow-sm lg:hidden dark:shadow-none">
              <ProjectImage
                src={image?.src}
                alt={image?.alt}
                title={title}
                ratio="video"
                sizes="100vw"
              />
            </figure>
          </>
        ) : (
          <OutlineTextBackground
            text={title.slice(0, 4)}
            className="aspect-video h-full w-full lg:aspect-square"
          />
        )}
      </div>

      <div className="grow rounded-xl rounded-t-none border border-dashed border-neutral-900 p-6 lg:rounded-t-xl lg:p-8">
        <h3 className="text-4xl font-semibold tracking-tight text-neutral-50">
          {title}
        </h3>
        <p className="mt-6 text-sm font-medium text-foreground-soft">
          {description}
        </p>

        <div className="mt-6 flex text-sm font-medium items-start gap-2">
          <p className="text-nowrap text-foreground-soft">Tech Stack:</p>
          <div className="flex flex-wrap text-ellipsis items-center gap-1 text-neutral-300">
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
