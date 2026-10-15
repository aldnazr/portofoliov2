import { useMemo } from "react";
import { profile } from "@/data/profile.ts";
import { projects } from "@/data/projects.ts";
import SectionHeader from "@/components/section-header.tsx";

export default function AboutSection() {
  const allTechnologies = useMemo(
    () =>
      Array.from(new Set(projects.flatMap((p) => p.technologies))).sort(
        (a, b) => a.localeCompare(b),
      ),
    [],
  );

  return (
    <section
      id="about"
      className="space-y-8 my-52 scroll-mt-30 sm:scroll-mt-42 px-4 sm:px-6 mx-auto max-w-6xl"
    >
      <SectionHeader badge="Tentang Saya" title="Kemampuan" />

      <div className="space-y-10">
        <p className="max-w-4xl text-lg leading-relaxed tracking-tight text-foreground-soft">
          {profile.about}
        </p>

        <div className="grid gap-4 border-t border-hairline pt-8 md:grid-cols-4 md:gap-8">
          <h3 className="text-xs font-mono uppercase tracking-wider text-subtle">
            Tech Stack
          </h3>
          <div className="flex flex-wrap gap-x-6 gap-y-3 md:col-span-3">
            {allTechnologies.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground-soft"
              >
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-accent"
                />
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
