import Link from "next/link";
import Image from "next/image";
import { slugifyProject } from "@/data/projects.ts";
import { Project } from "@/data/types.ts";
import {
  PlayStoreIcon,
  GithubIcon,
  BrowserIcon,
  ArrowIcon,
} from "@/components/svg-icons/icons";
import ProjectActionLink from "@/components/project-action-link.tsx";
import ProjectVisual from "@/components/project-visual.tsx";

export default function ProjectCard({
  item,
  index,
}: {
  item: Project;
  index: number;
}) {
  const formattedNumber = String(index).padStart(2, "0");
  const detailHref = `/projects/${slugifyProject(item.name)}`;

  return (
    <div className="group relative p-1.5 rounded-[2.25rem] border border-hairline bg-overlay-faint hover:border-accent-wash-border transition-all duration-500">
      {/* Overlay link ke halaman detail proyek */}
      <Link
        href={detailHref}
        aria-label={`Lihat detail proyek ${item.name}`}
        className="absolute inset-0 z-10 rounded-[2.25rem]"
      />

      <div
        className={`p-6 sm:p-8 rounded-[1.875rem] bg-surface border border-hairline-soft grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-8 items-center`}
      >
        <div className="lg:col-span-7 space-y-5">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-accent-strong px-2.5 py-1 rounded-md bg-accent-wash border border-accent-wash-border">
              {formattedNumber}
            </span>
            <span className="text-xs text-muted font-medium tracking-wide uppercase font-mono">
              {item.category}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-semibold text-foreground group-hover:text-accent-hover transition-colors">
            {item.name}
          </h3>

          <p className="text-sm sm:text-base text-muted tracking-tight leading-relaxed">
            {item.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {item.technologies.slice(0, 5).map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-lg bg-surface-muted border border-hairline text-xs font-mono text-foreground-soft"
              >
                {tech}
              </span>
            ))}
            {item.technologies.length > 5 && (
              <span className="px-3 py-1 rounded-lg bg-surface-muted border border-hairline text-xs font-mono text-foreground-soft">
                +{item.technologies.length - 5} More
              </span>
            )}
          </div>

          <div className="relative pt-2 sm:pt-3 flex flex-wrap items-center gap-3">
            {item.playStoreUrl?.map((ps, i) => (
              <ProjectActionLink key={i} href={ps.url}>
                <PlayStoreIcon className="size-4 shrink-0" />
                <span>{ps.title}</span>
              </ProjectActionLink>
            ))}
            {!item.demoUrl && item.sourceUrl && (
              <ProjectActionLink href={item.sourceUrl}>
                <GithubIcon className="size-4 shrink-0" />
                <span>Repository GitHub</span>
              </ProjectActionLink>
            )}
            {item.demoUrl && (
              <ProjectActionLink href={item.demoUrl}>
                <BrowserIcon className="size-4 shrink-0" />
                <span>Demo App</span>
              </ProjectActionLink>
            )}
            <button
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-overlay border border-hairline text-muted text-xs font-medium group-hover:text-accent-strong group-hover:border-accent-wash-border transition-colors"
              type="button"
            >
              <span>Lihat Detail</span>
              <ArrowIcon direction="right" className="size-4" />
            </button>
          </div>
        </div>
        <div className="lg:col-span-5">
          {item.image ? (
            <div className="relative aspect-16/10 overflow-hidden rounded-2xl border border-hairline bg-surface-muted">
              <Image
                src={item.image.src}
                alt={item.image.alt || item.name}
                loading="eager"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
              />
            </div>
          ) : (
            <ProjectVisual
              number={formattedNumber}
              name={item.name}
              category={item.category}
              className="aspect-16/10"
            />
          )}
        </div>
      </div>
    </div>
  );
}
