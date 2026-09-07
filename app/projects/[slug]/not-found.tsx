import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <div className="relative min-h-screen bg-[#08090d] text-zinc-100 selection:bg-emerald-500/30 selection:text-emerald-400 flex flex-col">
      {/* Background Glow Mesh */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-250 h-125 bg-linear-to-b from-emerald-500/10 via-teal-500/5 to-transparent blur-[120px] rounded-full" />
      </div>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center gap-5 px-4 text-center">
        <span className="font-mono text-xs font-bold text-emerald-400 px-3 py-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">
          404
        </span>
        <h1 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
          Proyek tidak ditemukan
        </h1>
        <p className="text-sm text-zinc-400 max-w-md">
          Proyek yang kamu cari tidak tersedia atau mungkin sudah dipindahkan.
        </p>
        <Link
          href="/#project"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium hover:bg-emerald-500/20 transition-colors"
        >
          <span aria-hidden="true">←</span>
          <span>Kembali ke Portofolio</span>
        </Link>
      </main>
    </div>
  );
}
