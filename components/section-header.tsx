interface SectionHeaderProps {
  title: string;
  description?: string;
  badge?: string;
  className?: string;
}

export default function SectionHeader({
  title,
  description,
  badge,
  className = "",
}: SectionHeaderProps) {
  const subtitle = description ?? badge;

  return (
    <div className={`space-y-2 md:space-y-2.5 ${className}`}>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base sm:text-lg text-muted leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
