import { profile } from "@/app/data/portfolio";

export default function HeroSection() {
  return (
    <section className="space-y-10">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-zinc-400 tracking-wide font-mono">
        <svg
          className="w-3.5 h-3.5 text-emerald-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        {profile.location}
      </div>

      <div className="space-y-6 max-w-3xl">
        <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-white leading-[1.15]">
          Halo, Saya{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-zinc-200 to-emerald-400">
            {profile.name}
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-zinc-400 font-normal leading-relaxed">
          {profile.hero}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <a
          href="#project"
          className="group relative inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-emerald-500 text-zinc-950 font-medium text-sm transition-all hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/25 active:scale-[0.98]"
        >
          <span>Lihat Proyek</span>
          <span className="w-6 h-6 rounded-full bg-zinc-950/10 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
            ↓
          </span>
        </a>
      </div>
    </section>
  );
}
