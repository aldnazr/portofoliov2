export default function BackgroundMesh() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-250 h-125 bg-linear-to-b from-emerald-500/10 via-teal-500/5 to-transparent blur-[120px] rounded-full" />
      <div className="absolute top-1/3 -left-40 w-125 h-125 bg-emerald-600/5 blur-[140px] rounded-full" />
      <div className="absolute bottom-10 right-0 w-150 h-150 bg-emerald-500/5 blur-[160px] rounded-full" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    </div>
  );
}
