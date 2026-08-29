import { experience } from "@/app/data/portfolio";
import SectionHeader from "@/app/components/section-header";

export default function ExperienceSection() {
  return (
    <section id="experience" className="space-y-10 scroll-mt-28">
      <SectionHeader badge="Riwayat Karir" title="Pengalaman Profesional" />

      <div className="p-1.5 rounded-[2.25rem] border border-white/10 bg-white/2">
        <div className="p-6 sm:p-10 rounded-[1.875rem] bg-[#0c0e14] border border-white/5 space-y-8">
          <div className="relative border-l border-white/10 ml-3 sm:ml-4 space-y-10">
            {experience.map((exp, idx) => (
              <div key={idx} className="relative pl-6 sm:pl-8 group">
                {/* Timeline Node */}
                <div className="absolute -left-1.25 top-1.5 w-2.5 h-2.5 rounded-full bg-zinc-700 border-2 border-[#0c0e14] group-hover:bg-emerald-400 group-hover:scale-125 transition-all" />

                <div className="space-y-2">
                  <div className="text-xs font-mono text-emerald-400 font-medium">
                    {exp.period}
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {exp.title}{" "}
                    <span className="text-zinc-500 font-normal">
                      @ {exp.company}
                    </span>
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">
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
