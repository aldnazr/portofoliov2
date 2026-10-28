import { experience } from "@/data/experience.ts";
import SectionHeader from "@/components/section-header.tsx";

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="space-y-10 sm:space-y-12 scroll-mt-30 sm:scroll-mt-36 px-4 sm:px-6 mx-auto max-w-6xl"
    >
      <SectionHeader badge="Riwayat Karir" title="Pengalaman Profesional" />

      <div className="space-y-10 sm:space-y-12">
        {experience.map((exp) => (
          <article
            key={`${exp.company}-${exp.period}`}
            className="grid gap-3 pt-8 border-t border-hairline first:border-t-0 first:pt-0 md:grid-cols-4 md:gap-8"
          >
            {/* Kolom kiri: periode */}
            <div className="text-xs sm:text-sm font-mono uppercase tracking-wider text-accent md:pt-1">
              {exp.period}
            </div>

            {/* Kolom kanan: konten */}
            <div className="space-y-3 md:col-span-3">
              <div className="space-y-1">
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground tracking-tight">
                  {exp.title}
                </h3>

                <div className="flex flex-wrap items-center gap-1.5 text-sm sm:text-base text-muted leading-relaxed">
                  <span className="font-medium text-foreground">
                    {exp.company}
                  </span>
                  {exp.location && (
                    <span className="text-muted/80">
                      &ndash; {exp.location}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-base md:text-lg text-foreground-soft max-w-3xl leading-relaxed tracking-tight">
                {exp.description}
              </p>

              {exp.highlights && exp.highlights.length > 0 && (
                <ul className="text-base text-foreground-soft max-w-3xl list-disc space-y-2 pl-5 leading-relaxed marker:text-foreground">
                  {exp.highlights.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
