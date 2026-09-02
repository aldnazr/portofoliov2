"use client";

import { useState } from "react";
import { projects } from "@/app/data/portfolio";
import SectionHeader from "@/app/components/section-header";
import ProjectCard from "@/app/components/project-card";

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

  return (
    <section id="project" className="space-y-10 scroll-mt-28">
      <SectionHeader badge="Portofolio Karya" title="Proyek Pilihan" />

      <div className="grid grid-cols-1 gap-8">
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
            className="px-3.5 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-zinc-300 hover:bg-white/10 hover:text-white disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed transition-all"
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
                  currentPage === page
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold"
                    : "bg-white/5 text-zinc-400 border border-white/10 hover:bg-white/10 hover:text-white"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3.5 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-zinc-300 hover:bg-white/10 hover:text-white disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed transition-all"
            aria-label="Halaman berikutnya"
          >
            Next &rarr;
          </button>
        </div>
      )}
    </section>
  );
}
