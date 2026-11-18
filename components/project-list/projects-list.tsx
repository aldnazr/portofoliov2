"use client";

import { useState } from "react";
import { projects } from "@/data/projects.ts";
import { ArrowIcon } from "@/components/svg-icons/icons";
import ProjectCard from "@/components/project-list/project-card.tsx";

const ITEMS_PER_PAGE = 3;

export default function ProjectsList() {
  // pagination state stays local; list view remounts fresh each switch
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

  return (
    <div className="px-4 sm:px-6 mx-auto max-w-6xl">
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
            type="button"
            className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-hairline bg-overlay text-xs font-medium text-foreground-soft hover:bg-overlay-strong hover:text-foreground disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed transition-all"
            aria-label="Halaman sebelumnya"
          >
            <ArrowIcon direction="left" className="size-3.5 shrink-0" />
            Prev
          </button>

          <div className="flex items-center gap-1.5 px-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                type="button"
                className={`w-8 h-8 rounded-full text-xs font-mono font-medium transition-all cursor-pointer ${
                  currentPage === page
                    ? "bg-accent-wash-strong text-accent-strong border border-accent-wash-border font-bold"
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
            type="button"
            className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-hairline bg-overlay text-xs font-medium text-foreground-soft hover:bg-overlay-strong hover:text-foreground disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed transition-all"
            aria-label="Halaman berikutnya"
          >
            Next
            <ArrowIcon direction="right" className="size-3.5 shrink-0" />
          </button>
        </div>
      )}
    </div>
  );
}
