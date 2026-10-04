"use client";

import SectionHeader from "@/components/section-header";
import { projects } from "@/data/projects";
import { useState } from "react";
import {
  type Project,
  ProjectCarousel,
} from "./project-carousel/project-carousel";
import ProjectCard from "./project-card";
import { ArrowIcon, IconCarousel, IconList } from "./icons";

const ITEMS_PER_PAGE = 3;

export default function ProjectsSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const [projectView, setProjectView] = useState<"carousel" | "list">(
    "carousel",
  );
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

  const projectCarousels: Project[] = [
    {
      id: 1,
      title: "Indonesian Tweet Emotion Classification",
      description: "Comparing six models on Indonesian tweet emotion...",
      tag: "NLP",
      status: { label: "Accepted", tone: "success" }, // opsional: success | warning | neutral
      image: "/projects/roomly.webp", // disarankan rasio 8:5
      role: "Class Assignment",
      stack: "Python, scikit-learn, Transformers",
      year: 2026,
      href: "/projects/emotion",
      github: "https://github.com/...", // opsional
    },
    {
      id: 2,
      title: "Indonesian Tweet Emotion Classification",
      description: "Comparing six models on Indonesian tweet emotion...",
      tag: "NLP",
      status: { label: "Accepted", tone: "success" }, // opsional: success | warning | neutral
      image: "/projects/driver.webp", // disarankan rasio 8:5
      role: "Class Assignment",
      stack: "Python, scikit-learn, Transformers",
      year: 2026,
      href: "/projects/emotion",
      github: "https://github.com/...", // opsional
    },
    {
      id: 3,
      title: "Indonesian Tweet Emotion Classification",
      description: "Comparing six models on Indonesian tweet emotion...",
      tag: "NLP",
      status: { label: "Accepted", tone: "success" }, // opsional: success | warning | neutral
      image: "/projects/roomly.webp", // disarankan rasio 8:5
      role: "Class Assignment",
      stack: "Python, scikit-learn, Transformers",
      year: 2026,
      href: "/projects/emotion",
      github: "https://github.com/...", // opsional
    },
    {
      id: 4,
      title: "Indonesian Tweet Emotion Classification",
      description: "Comparing six models on Indonesian tweet emotion...",
      tag: "NLP",
      status: { label: "Accepted", tone: "success" }, // opsional: success | warning | neutral
      image: "/projects/driver.webp", // disarankan rasio 8:5
      role: "Class Assignment",
      stack: "Python, scikit-learn, Transformers",
      year: 2026,
      href: "/projects/emotion",
      github: "https://github.com/...", // opsional
    },
  ];

  return (
    <section id="project" className="space-y-10 scroll-mt-28">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mx-auto max-w-6xl">
        <SectionHeader badge="Portofolio Karya" title="Proyek Pilihan" />
        <div
          role="group"
          aria-label="Mode tampilan proyek"
          className="inline-flex self-start sm:self-end items-center gap-1 rounded-full border border-hairline bg-overlay p-1"
        >
          <button
            type="button"
            onClick={() => setProjectView("carousel")}
            aria-pressed={projectView === "carousel"}
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              projectView === "carousel" ?
                "bg-accent-wash-strong text-accent-strong border border-accent-wash-border font-semibold shadow-xs"
              : "border border-transparent text-muted hover:text-foreground hover:bg-overlay"
            }`}
          >
            <IconCarousel className="size-3.5 shrink-0" />
            <span>Carousel</span>
          </button>
          <button
            type="button"
            onClick={() => setProjectView("list")}
            aria-pressed={projectView === "list"}
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              projectView === "list" ?
                "bg-accent-wash-strong text-accent-strong border border-accent-wash-border font-semibold shadow-xs"
              : "border border-transparent text-muted hover:text-foreground hover:bg-overlay"
            }`}
          >
            <IconList className="size-3.5 shrink-0" />
            <span>List</span>
          </button>
        </div>
      </div>

      {projectView === "carousel" ?
        <ProjectCarousel loop projects={projectCarousels} />
      : <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-7 sm:gap-8">
            {currentProjects.map((item, idx) => (
              <ProjectCard
                key={item.name}
                item={item}
                index={(currentPage - 1) * ITEMS_PER_PAGE + idx + 1}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-hairline bg-overlay text-xs font-medium text-foreground-soft hover:bg-overlay-strong hover:text-foreground disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed transition-all"
                aria-label="Halaman sebelumnya"
              >
                <ArrowIcon direction="left" className="size-3.5 shrink-0" />
                Prev
              </button>

              <div className="flex items-center gap-1.5 px-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-8 h-8 rounded-full text-xs font-mono font-medium transition-all cursor-pointer ${
                        currentPage === page ?
                          "bg-accent-wash-strong text-accent-strong border border-accent-wash-border font-bold"
                        : "bg-overlay text-muted border border-hairline hover:bg-overlay-strong hover:text-foreground"
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-hairline bg-overlay text-xs font-medium text-foreground-soft hover:bg-overlay-strong hover:text-foreground disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed transition-all"
                aria-label="Halaman berikutnya"
              >
                Next
                <ArrowIcon direction="right" className="size-3.5 shrink-0" />
              </button>
            </div>
          )}
        </div>
      }
    </section>
  );
}
