type ProjectVisualProps = {
  number: string;
  title: string;
  category: string;
  variant?: "card" | "hero";
  className?: string;
};

function getProjectInitials(name: string): string {
  const words = name
    .replace(/[^a-zA-Z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 0) return "··";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0]}${words[1][0]}`.toUpperCase();
}

export default function ProjectVisual({
  number,
  title,
  category,
  variant = "card",
  className = "",
}: ProjectVisualProps) {
  const isHero = variant === "hero";

  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl border border-hairline bg-surface hover:border-accent-wash-border transition-colors duration-500 ${className}`}
    >
      {/* Ambient glow */}
      <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-emerald-500/10 blur-[90px]" />
      <div className="absolute -bottom-20 -left-16 w-64 h-64 rounded-full bg-teal-500/5 blur-[90px]" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)] bg-size-[1.75rem_1.75rem] mask-[radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]" />

      {/* Ghost number */}
      <span
        aria-hidden="true"
        className={`absolute -bottom-3 -right-1 font-mono font-bold leading-none text-ghost select-none ${
          isHero ? "text-[9rem] sm:text-[12rem]" : "text-[7rem]"
        }`}
      >
        {number}
      </span>

      {/* Corner brackets */}
      <div aria-hidden="true" className="absolute inset-5 sm:inset-6">
        <span className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-accent-wash-border rounded-tl-md" />
        <span className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-accent-wash-border rounded-tr-md" />
        <span className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-accent-wash-border rounded-bl-md" />
        <span className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-accent-wash-border rounded-br-md" />
      </div>

      {/* Project identity */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 sm:gap-3 p-8 text-center">
        {/* <span className="px-2.5 py-1 rounded-md font-mono text-[10px] font-bold tracking-widest text-accent-strong bg-accent-wash border border-accent-wash-border">
          {number}
        </span> */}
        <span
          className={`font-mono font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-br from-foreground via-foreground to-accent ${
            isHero ? "text-6xl sm:text-7xl" : "text-5xl"
          }`}
        >
          {getProjectInitials(title)}
        </span>
        <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-subtle max-w-[85%] leading-relaxed">
          {category}
        </span>
      </div>
    </div>
  );
}
