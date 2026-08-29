import { profile, projects } from "@/app/data/portfolio";
import SectionHeader from "@/app/components/section-header";

const allTechnologies = Array.from(
  new Set(projects.flatMap((p) => p.technologies)),
);

export default function AboutSection() {
  return (
    <section id="about" className="space-y-8 scroll-mt-28">
      <SectionHeader badge="Tentang Saya" title="Kemampuan" />

      <div className="p-1.5 rounded-4xl border border-white/10 bg-white/2">
        <div className="p-8 sm:p-10 rounded-[1.625rem] bg-[#0c0e14] border border-white/5 space-y-8">
          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
            {profile.about}
          </p>

          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-500">
              Area Keahlian
            </h3>
            <div className="flex items-center flex-wrap gap-2.5">
              {profile.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-zinc-200 font-medium hover:border-emerald-500/40 hover:text-emerald-400 transition-colors"
                >
                  {skill}
                </span>
              ))}
              <span
                aria-hidden="true"
                className="h-6 w-px bg-linear-to-b from-transparent via-white/20 to-transparent"
              />
              {allTechnologies.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-zinc-200 font-medium hover:border-emerald-500/40 hover:text-emerald-400 transition-colors"
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
