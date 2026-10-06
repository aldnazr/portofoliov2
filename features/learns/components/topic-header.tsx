type TopicHeaderProps = {
  title: string;
  description: string;
};

/** Judul + ringkasan untuk halaman satu topik. */
export default function TopicHeader({ title, description }: TopicHeaderProps) {
  return (
    <header className="space-y-2 md:space-y-3">
      <h1 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
        {title}
      </h1>
      <p className="text-muted max-w-2xl">{description}</p>
    </header>
  );
}
