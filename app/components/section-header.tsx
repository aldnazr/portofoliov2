interface SectionHeaderProps {
  badge: string;
  title: string;
}

export default function SectionHeader({ badge, title }: SectionHeaderProps) {
  return (
    <div className="space-y-1.5 md:space-y-2.5">
      <p className="px-3 py-1 max-w-fit rounded-full text-[10px] uppercase tracking-[0.2em] font-mono text-accent-strong border border-accent-wash-border bg-accent-wash">
        {badge}
      </p>
      <h2 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
        {title}
      </h2>
    </div>
  );
}
