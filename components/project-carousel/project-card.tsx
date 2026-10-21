import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { LayersIcon, UserIcon } from "./icons.tsx";
import { CarouselProject } from "@/data/types.ts";
import { cn, CARD_RADIUS, pad } from "@/lib/utils.ts";
import { BrowserIcon, GithubIcon, ArrowIcon } from "@/components/icons.tsx";
import ProjectVisual from "@/components/project-visual.tsx";

export type ProjectStatusTone = "success" | "warning" | "neutral";

type ProjectCardProps = {
  project: CarouselProject;
  index: number;
  total: number;
  interactive?: boolean;
  preload?: boolean;
};

const STATUS_TONES: Record<ProjectStatusTone, string> = {
  success: "bg-emerald-950/55 text-emerald-300 ring-emerald-300/25",
  warning: "bg-amber-950/50 text-amber-300 ring-amber-300/25",
  neutral: "bg-black/40 text-white/85 ring-white/20",
};

const SHADOW_ACTIVE =
  "shadow-[0_29px_35px_-33px_rgba(0,0,0,0.44),0_94px_108px_-89px_rgba(0,0,0,0.88)]";
const SHADOW_SIDE = "shadow-[0_8px_30px_-8px_rgba(0,0,0,0.25)]";

const SCRIM =
  "linear-gradient(to bottom, rgba(10,10,12,0) 0, rgba(10,10,12,0.55) 3.5rem, rgba(10,10,12,0.86) 8.5rem, rgba(10,10,12,0.98) 100%)";

function MetaItem({
  icon,
  label,
  value,
  className,
}: {
  icon: ReactNode;
  label: string;
  value: string | number;
  className?: string;
}) {
  return (
    <div className={cn("flex min-w-0 items-center gap-2", className)}>
      <span className="shrink-0 text-white/55">{icon}</span>
      <dt className="shrink-0 text-white/60 font-normal sm:font-medium text-sm">
        {label}:
      </dt>
      <dd className="min-w-0 truncate font-medium sm:font-semibold text-sm">
        {value}
      </dd>
    </div>
  );
}

export function ProjectCard({
  project,
  index,
  interactive = true,
  preload = false,
}: ProjectCardProps) {
  const {
    title,
    description,
    tag,
    status,
    image,
    imageAlt,
    category,
    role,
    stack,
    href,
    demoUrl,
    github,
  } = project;

  const pill =
    "inline-flex h-6 sm:h-7 items-center rounded-full px-3 text-sm font-medium";

  return (
    <article
      inert={!interactive}
      className={cn(
        "relative isolate flex h-full w-full flex-col justify-end overflow-hidden bg-neutral-950 text-white transition-shadow duration-650 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
        CARD_RADIUS,
        interactive ? SHADOW_ACTIVE : SHADOW_SIDE,
        interactive && "ring ring-accent-strong/40",
      )}
    >
      {image ? (
        <Image
          src={image}
          alt={imageAlt ?? ""}
          fill
          sizes="(min-width: 912px) 800px, 88vw"
          preload={preload}
          draggable={false}
          className="object-cover bg-neutral-900"
        />
      ) : (
        <div className="absolute inset-0" style={{ colorScheme: "dark" }}>
          <ProjectVisual
            number={pad(index + 1)}
            name={title}
            category={category}
            variant="hero"
            className="h-full rounded-none border-0 -translate-y-8 sm:-translate-y-10"
          />
        </div>
      )}

      {/* Baris atas: tag + status (kiri), counter (kanan) */}
      <div className="absolute inset-x-4.5 top-4.5 flex items-start justify-between gap-3 sm:inset-x-6.5 sm:top-5.5">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              pill,
              "bg-white/85 shadow text-xs sm:text-sm w-fit text-neutral-950",
            )}
          >
            <span className="truncate">{tag}</span>
          </span>
          {status && (
            <span
              className={cn(
                pill,
                "ring-1 backdrop-blur-md",
                STATUS_TONES[status.tone ?? "neutral"],
              )}
            >
              {status.label}
            </span>
          )}
        </div>
      </div>

      {/* Konten bawah */}
      <div
        className="relative px-5 pb-4.5 sm:px-7 sm:pb-5.5"
        style={{ backgroundImage: SCRIM }}
      >
        <h3 className="text-2xl sm:text-[26px]/[1.1] font-bold tracking-[-0.045em]">
          {title}
        </h3>

        <p className="text-white/80 text-ellipsis line-clamp-2 mt-1 sm:mt-2.5 tracking-tight text-[0.85rem]/4.5 sm:tracking-[-0.01em] sm:text-base/6">
          {description}
        </p>

        <dl className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-white/15 pt-2.25 text-[15px] sm:mt-[17.5px] sm:flex-nowrap sm:pt-3.75 sm:text-[17px]">
          <MetaItem
            icon={<UserIcon className="size-3" />}
            label="Role"
            value={role}
            className="order-1 shrink-0"
          />
          <MetaItem
            icon={<LayersIcon className="size-3" />}
            label="Stack"
            value={stack}
            className="order-3 basis-full sm:order-2 sm:flex-1 sm:basis-0 sm:border-l sm:border-white/15 sm:pl-4"
          />
        </dl>

        <div className="mt-3.5 sm:mt-4 flex items-center gap-3">
          {(demoUrl ?? github) && (
            <a
              href={demoUrl ?? github}
              target="_blank"
              rel="noopener noreferrer"
              draggable={false}
              aria-label={demoUrl ? `${title} demo` : `${title} on GitHub`}
              className="grid size-9 shrink-0 place-items-center rounded-full bg-white/15 text-white ring-1 ring-white/30 transition-[background-color,color,box-shadow] duration-200 motion-reduce:transition-none hover:bg-white/25 hover:ring-accent-hover hover:text-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:size-11"
            >
              {demoUrl ? (
                <BrowserIcon className="size-4 sm:size-5" />
              ) : (
                <GithubIcon className="size-4 sm:size-5" />
              )}
            </a>
          )}
          <Link
            href={href}
            draggable={false}
            aria-label={`View project: ${title}`}
            className="group/cta flex h-9 min-w-0 flex-1 items-center justify-center gap-2 rounded-full bg-white text-sm font-semibold text-neutral-950 transition-colors hover:bg-neutral-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:h-11 sm:text-base"
          >
            View project
            <ArrowIcon direction="upright" className="size-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
