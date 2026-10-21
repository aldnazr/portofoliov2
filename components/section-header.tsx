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

  // Kata pertama = putih (foreground), sisanya = hijau glossy
  const [firstWord, ...restWords] = title.trim().split(" ");
  const highlight = restWords.join(" ");

  return (
    <div className={`space-y-2 md:space-y-2.5 ${className}`}>
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
        {title}
        {/* {firstWord}
        {highlight && (
          <>
            {" "}
            <span
              className="inline-block bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(153deg, #256b4d 0%, #44e3a1 50%, #256b4d 100%)",
              }}
            >
              {highlight}
            </span>
          </>
        )} */}
      </h2>
      {subtitle && (
        <p className="text-lg text-muted leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
