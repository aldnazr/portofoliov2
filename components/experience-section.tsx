import { experience } from "@/data/experience";
import SectionHeader from "@/components/section-header";

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="space-y-10 scroll-mt-28 px-4 sm:px-6 mx-auto max-w-6xl"
    >
      <SectionHeader badge="Riwayat Karir" title="Pengalaman Profesional" />

      <div className="p-1.5 rounded-[2.25rem] border border-hairline bg-overlay-faint">
        <div className="p-6 sm:p-10 rounded-[1.875rem] bg-surface border border-hairline-soft space-y-8">
          <div className="relative border-l border-hairline ml-3 sm:ml-4 space-y-10">
            {experience.map((exp, idx) => (
              <div key={idx} className="relative pl-6 sm:pl-8 group">
                {/* Timeline Node */}
                <div className="absolute -left-1.25 top-1.5 w-2.5 h-2.5 rounded-full bg-shade border-2 border-surface group-hover:bg-accent-strong group-hover:scale-125 transition-all" />

                <div className="space-y-2">
                  <div className="text-xs font-mono text-accent-strong font-medium">
                    {exp.period}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {exp.title}{" "}
                    <span className="text-subtle font-normal">
                      @ {exp.company}
                    </span>
                  </h3>
                  <p className="text-sm text-muted leading-relaxed max-w-2xl">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
