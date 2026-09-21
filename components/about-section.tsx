import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import SectionHeader from "@/components/section-header";

const allTechnologies = Array.from(
  new Set(projects.flatMap((p) => p.technologies)),
).sort((a, b) => a.localeCompare(b));

export default function AboutSection() {
  return (
    <section id="about" className="space-y-8 scroll-mt-28">
      <SectionHeader badge="Tentang Saya" title="Kemampuan" />

      <div className="p-1.5 rounded-4xl border border-hairline bg-overlay-faint">
        <div className="p-8 sm:p-10 rounded-[1.625rem] bg-surface border border-hairline-soft space-y-8">
          <p className="text-base sm:text-lg text-foreground-soft leading-relaxed font-normal">
            {profile.about}
          </p>

          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-subtle">
              Tech Stack
            </h3>
            <div className="flex items-center flex-wrap gap-2.5">
              {/* {profile.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-xl bg-overlay border border-hairline text-sm text-foreground-soft font-medium hover:border-accent-wash-border hover:text-accent-strong transition-colors"
                >
                  {skill}
                </span>
              ))}
              <span
                aria-hidden="true"
                className="h-6 w-px bg-linear-to-b from-transparent via-hairline to-transparent"
              /> */}
              {allTechnologies.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 rounded-xl bg-overlay border border-hairline text-sm text-foreground-soft font-medium hover:border-accent-wash-border hover:text-accent-strong transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
