"use client";

import { useCallback, useState } from "react";

type CodeBlockProps = {
  highlightedHtml: string;
  code: string;
  filename?: string;
  lang?: string;
};

export default function CodeBlock({
  highlightedHtml,
  code,
  filename,
  lang = "ts",
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [code]);

  return (
    <div className="shiki-wrapper group/code relative rounded-2xl border border-hairline bg-surface-muted overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-4 py-2 border-b border-hairline-soft bg-surface">
        <span className="font-mono text-[11px] text-subtle truncate">
          {filename ?? `example.${lang}`}
        </span>

        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Kode berhasil disalin" : "Salin kode"}
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11px] text-muted transition-colors hover:text-foreground hover:bg-overlay focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {copied ?
            <>
              <svg
                className="size-3.5 text-accent-strong"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              <span>Disalin</span>
            </>
          : <>
              <svg
                className="size-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
              <span>Salin</span>
            </>
          }
        </button>
      </div>

      <div
        className="px-4 py-4 overflow-x-auto"
        dangerouslySetInnerHTML={{ __html: highlightedHtml }}
      />
    </div>
  );
}
