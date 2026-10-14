"use client";

import SectionHeader from "@/components/section-header";
import { carouselProjects } from "@/data/projects";
import { useState } from "react";
import { ProjectCarousel } from "../project-carousel/project-carousel";
import ProjectsList from "../project-list/projects-list";
import { IconCarousel, IconList } from "../icons";
import { useProjectViewMode } from "@/lib/use-project-view-mode";

export default function ProjectsSection() {
  const viewMode = useProjectViewMode((s) => s.viewMode);
  const setViewMode = useProjectViewMode((s) => s.setViewMode);

  return (
    <section id="project" className="space-y-12 scroll-mt-30 sm:scroll-mt-26">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 px-4 sm:px-6 mx-auto max-w-6xl">
        <SectionHeader badge="Portofolio Karya" title="Proyek Pilihan" />
        <div
          role="group"
          aria-label="Mode tampilan proyek"
          className="inline-flex self-start sm:self-end items-center gap-1 rounded-full border border-hairline bg-overlay p-1"
        >
          <button
            type="button"
            onClick={() => setViewMode("carousel")}
            aria-pressed={viewMode === "carousel"}
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              viewMode === "carousel" ?
                "bg-accent-wash-strong text-accent-strong border border-accent-wash-border font-semibold shadow-xs"
              : "border border-transparent text-muted hover:text-foreground hover:bg-overlay"
            }`}
          >
            <IconCarousel className="size-3.5 shrink-0" />
            <span>Carousel</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("list")}
            aria-pressed={viewMode === "list"}
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              viewMode === "list" ?
                "bg-accent-wash-strong text-accent-strong border border-accent-wash-border font-semibold shadow-xs"
              : "border border-transparent text-muted hover:text-foreground hover:bg-overlay"
            }`}
          >
            <IconList className="size-3.5 shrink-0" />
            <span>List</span>
          </button>
        </div>
      </div>

      {viewMode === "carousel" ?
        <ProjectCarousel loop projects={carouselProjects} />
      : <ProjectsList />}
    </section>
  );
}
