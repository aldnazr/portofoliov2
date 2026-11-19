"use client";

import { useState } from "react";
import { projects } from "@/data/projects.ts";
import ProjectCard from "@/components/project-list/project-card.tsx";
import Pagination from "@/components/pagination.tsx";

const ITEMS_PER_PAGE = 3;

export default function ProjectsList() {
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
            key={item.title}
            item={item}
            index={(currentPage - 1) * ITEMS_PER_PAGE + idx + 1}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
