import type { ReactNode } from "react";
import CodeBlock from "./code-block";

type RenderingDemoProps = {
  label: string;
  title: string;
  description: string;
  children: ReactNode;
  usageDescription: string;
  snippet: string;
  highlightedHtml: string;
  lang?: string;
  filename?: string;
};

export default function RenderingDemo({
  label,
  title,
  description,
  children,
  usageDescription,
  snippet,
  highlightedHtml,
  lang = "typescript",
  filename = "page.tsx",
}: RenderingDemoProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {title} ({label})
        </h1>
        <p className="max-w-2xl text-base text-muted leading-relaxed">
          {description}
        </p>
      </div>

      {children}

      <section aria-labelledby="usage-heading" className="space-y-4">
        <h2
          id="usage-heading"
          className="font-mono text-xs font-medium uppercase tracking-wider text-muted"
        >
          Contoh penggunaan
        </h2>
        <p className="text-foreground-soft text-sm leading-relaxed">
          {usageDescription}
        </p>
        <CodeBlock
          highlightedHtml={highlightedHtml}
          code={snippet}
          lang={lang}
          filename={filename}
        />
      </section>
    </div>
  );
}
