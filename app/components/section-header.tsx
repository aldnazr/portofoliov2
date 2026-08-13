interface SectionHeaderProps {
  badge: string;
  title: string;
}

export default function SectionHeader({ badge, title }: SectionHeaderProps) {
  return (
    <div className="space-y-2">
      <p className="px-3 py-1 max-w-fit rounded-full text-[10px] uppercase tracking-[0.2em] font-mono text-emerald-400 border border-emerald-500/20 bg-emerald-500/10">
        {badge}
      </p>
      <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
        {title}
      </h2>
    </div>
  );
}