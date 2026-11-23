"use client";

import { carouselProjects, projects } from "@/data/projects.ts";
import { useProjectViewMode } from "@/lib/use-project-view-mode.ts";
import { ProjectCarousel } from "@/components/project-carousel/project-carousel.tsx";
import { ProjectViewModeToggle } from "@/components/project-view-mode-toggle";
import SectionHeader from "@/components/section-header.tsx";
import { ProjectList } from "../project-list/project-list";

export default function ProjectsSection() {
  const viewMode = useProjectViewMode((s) => s.viewMode);

  return (
    <section id="project" className="space-y-12 scroll-mt-30 sm:scroll-mt-26">
      <div className="flex flex-wrap justify-between gap-4 px-4 sm:px-6 mx-auto max-w-6xl">
        <SectionHeader badge="Portofolio Karya" title="Proyek Pilihan" />
        <ProjectViewModeToggle />
      </div>

      {viewMode === "carousel" ? (
        <ProjectCarousel loop projects={carouselProjects} />
      ) : (
        <ProjectList
          projects={projects}
          className="max-w-278 mx-4.5 md:mx-auto"
        />
      )}
    </section>
  );
}
