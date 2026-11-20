export default function BackgroundMesh() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden opacity-65"
    >
      {/* wash emerald yang sudah ada */}
      {/* <div className="absolute inset-0 [background:radial-gradient(560px_340px_at_88%_-6%,var(--accent-wash),transparent_62%)]" /> */}

      {/* glow di balik kaca */}
      {/* <div className="absolute right-[-12%] top-[-16%] aspect-square w-[55%] rounded-full bg-emerald-500/50 blur-2xl" /> */}

      {/* panel kaca — di mobile digeser ke tepi lewat posisi responsif */}
      <div className="absolute right-[-22%] top-[6%] aspect-[1.25] w-[72%] -rotate-6 rounded-[26px] border border-white/20 bg-linear-to-br from-white/15 via-white/3 to-emerald-400/10 shadow-2xl backdrop-blur-[3px] md:right-[-7%] md:top-[9%] md:w-[47%]" />
      <div className="absolute left-[-14%] bottom-[16%] aspect-[0.82] w-[44%] rotate-12 rounded-[22px] border border-white/20 bg-linear-to-br from-white/15 via-white/3 to-emerald-400/10 shadow-2xl backdrop-blur-[3px] md:left-auto md:right-[23%] md:top-[44%] md:bottom-auto md:w-[31%]" />
      <div className="absolute bottom-[-9%] right-[3%] aspect-square w-[19%] rounded-full border border-white/20 bg-linear-to-br from-white/15 to-emerald-400/10 shadow-2xl backdrop-blur-[3px]" />
    </div>
  );
}
