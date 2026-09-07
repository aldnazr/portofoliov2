import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/app/data/types";
import { slugifyProject } from "@/app/data/projects";
import ProjectVisual from "@/app/components/project-visual";

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
    <div className="group relative p-1.5 rounded-[2.25rem] border border-white/10 bg-white/2 hover:border-emerald-500/30 transition-all duration-500">
      {/* Overlay link ke halaman detail proyek */}
      <Link
        href={detailHref}
        aria-label={`Lihat detail proyek ${item.name}`}
        className="absolute inset-0 z-10 rounded-[2.25rem]"
      />

      <div
        className={`p-6 sm:p-8 rounded-[1.875rem] bg-[#0c0e14] border border-white/5 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center`}
      >
        <div className="lg:col-span-7 space-y-5">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-emerald-400 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20">
              {formattedNumber}
            </span>
            <span className="text-xs text-zinc-400 font-medium tracking-wide uppercase font-mono">
              {item.category}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-semibold text-white group-hover:text-emerald-300 transition-colors">
            {item.name}
          </h3>

          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            {item.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {item.technologies.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-lg bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-300"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="relative pt-0 sm:pt-3 flex flex-wrap items-center gap-3">
            {item.playStoreUrl && (
              <a
                href={item.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-20 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium hover:bg-emerald-500/20 transition-colors"
              >
                <span>Google Play Store</span>
                <span className="text-xs">↗</span>
              </a>
            )}
            {item.sourceUrl && (
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-20 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-medium hover:bg-white/10 hover:text-white transition-colors"
              >
                <span>Repository GitHub</span>
                <span className="text-xs">↗</span>
              </a>
            )}
            {item.demoUrl && (
              <a
                href={item.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-20 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-medium hover:bg-white/10 hover:text-white transition-colors"
              >
                <span>Demo App</span>
                <span className="text-xs">↗</span>
              </a>
            )}
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-xs font-medium group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition-colors">
              <span>Lihat Detail</span>
              <span className="text-xs group-hover:translate-x-0.5 transition-transform">
                →
              </span>
            </button>
          </div>
        </div>
        <div className="lg:col-span-5">
          {item.image ?
            <div className="relative aspect-16/10 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900">
              <Image
                src={item.image.src}
                alt={item.image.alt || item.name}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
              />
            </div>
          : <ProjectVisual
              number={formattedNumber}
              name={item.name}
              category={item.category}
              className="aspect-16/10"
            />
          }
        </div>
      </div>
    </div>
  );
}
