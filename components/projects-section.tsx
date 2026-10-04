"use client";

import SectionHeader from "@/components/section-header";
import { projects } from "@/data/projects";
import { useState } from "react";
import {
  type Project,
  ProjectCarousel,
} from "./project-carousel/project-carousel";

const ITEMS_PER_PAGE = 3;

export default function ProjectsSection() {
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
      <div className=" mx-auto max-w-6xl">
        <SectionHeader badge="Portofolio Karya" title="Proyek Pilihan" />
      </div>

      <ProjectCarousel loop projects={projectCarousels} />
      {/* <div className="grid grid-cols-1 gap-7 sm:gap-8">
        {currentProjects.map((item, idx) => (
          <ProjectCard
            key={item.name}
            item={item}
            index={(currentPage - 1) * ITEMS_PER_PAGE + idx + 1}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3.5 py-2 rounded-full border border-hairline bg-overlay text-xs font-medium text-foreground-soft hover:bg-overlay-strong hover:text-foreground disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed transition-all"
            aria-label="Halaman sebelumnya"
          >
            &larr; Prev
          </button>

          <div className="flex items-center gap-1.5 px-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3.5 py-2 rounded-full border border-hairline bg-overlay text-xs font-medium text-foreground-soft hover:bg-overlay-strong hover:text-foreground disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed transition-all"
            aria-label="Halaman berikutnya"
          >
            Next &rarr;
          </button>
        </div>
      )} */}
    </section>
  );
}
