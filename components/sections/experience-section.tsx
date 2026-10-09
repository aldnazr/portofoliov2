import Image from "next/image";
import { experience } from "@/data/experience";
import SectionHeader from "@/components/section-header";

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="space-y-12 scroll-mt-28 px-4 sm:px-6 mx-auto max-w-6xl"
    >
      <SectionHeader badge="Riwayat Karir" title="Pengalaman Profesional" />

      <div className="space-y-14">
        {experience.map((exp) => (
          <article
            key={`${exp.company}-${exp.period}`}
            className="grid gap-3 md:grid-cols-4 md:gap-8"
          >
            {/* Kolom kiri: periode */}
            <div className="uppercase tracking-wide font-medium text-sm text-subtle md:pt-2">
              {exp.period}
            </div>

            {/* Kolom kanan: konten */}
            <div className="space-y-2 md:col-span-3">
              <div className="space-y-1">
                <h3 className="text-xl font-semibold text-foreground">
                  {exp.title}
                </h3>

                <div className="flex flex-wrap items-center gap-1 text-muted">
                  <span className="font-medium text-foreground">
                    {exp.company}
                  </span>
                  {exp.location && <span>- {exp.location}</span>}
                </div>
              </div>

              <p className="text-muted leading-relaxed">{exp.description}</p>

              {exp.highlights && exp.highlights.length > 0 && (
                <ul className="list-disc space-y-2 pl-5 text-muted leading-snug tracking-wide marker:text-subtle">
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
