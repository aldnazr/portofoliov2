"use client";

import { useState } from "react";
import Link from "next/link";
import { projects, slugifyProject } from "@/data/projects.ts";

const INITIAL_VISIBLE = 5;

/** Kolom footer "Proyek": tampil 5 dulu, tombol expand untuk semua project. */
export default function FooterProjects() {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? projects : projects.slice(0, INITIAL_VISIBLE);

  if (projects.length === 0) {
    return <p className="text-sm text-subtle">Belum ada proyek.</p>;
  }

  return (
    <ul>
      {visible.map((project) => (
        <li key={project.title}>
          <Link
            href={`/projects/${slugifyProject(project.title)}`}
            className="block py-1 text-sm leading-relaxed text-muted transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {project.title}
          </Link>
        </li>
      ))}

      {projects.length > INITIAL_VISIBLE && (
        <li>
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={expanded}
            className="mt-2 inline-flex min-h-11 items-center rounded text-xs font-medium text-accent-strong transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {expanded
              ? "Tampilkan lebih sedikit"
              : `Tampilkan lebih banyak (${projects.length - 5})`}
          </button>
        </li>
      )}
    </ul>
  );
}
