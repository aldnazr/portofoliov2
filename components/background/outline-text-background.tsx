import { useId, type ReactNode } from "react";
import { GLYPHS } from "./dm-sans-bold-glyphs";

// Satuan glyph: 1000 per em. Satuan layout: viewBox 352x352 (area dalam kartu).
const TRACKING = -40; // -0.04em
const ASCENDER = 720; // tinggi huruf "l"
const LEFT = 38;
const TOP = 41.5;
const MAX_WIDTH = 287; // lebar teks maksimum
const MAX_SCALE = 0.1868; // ukuran asli: "link" setinggi 134.5 di kartu 352

function layoutText(text: string) {
  const glyphs: { d: string; x: number }[] = [];
  let x = 0;
  let minX = Infinity;
  let maxX = -Infinity;

  for (const char of text.trim()) {
    const glyph = GLYPHS[char];
    if (!glyph) continue;
    const [advance, xMin, xMax, d] = glyph;
    if (d) {
      glyphs.push({ d, x });
      minX = Math.min(minX, x + xMin);
      maxX = Math.max(maxX, x + xMax);
    }
    x += advance + TRACKING;
  }

  if (glyphs.length === 0) return null;

  const scale = Math.min(MAX_SCALE, MAX_WIDTH / (maxX - minX));
  return {
    glyphs,
    scale,
    offsetX: LEFT - minX * scale,
    baseline: TOP + ASCENDER * scale,
  };
}

type OutlineTextBackgroundProps = {
  text: string;
  // Isi penuh parent (rasio apa pun) tanpa border dan radius sendiri
  fill?: boolean;
  className?: string;
  children?: ReactNode;
};

export default function OutlineTextBackground({
  text,
  fill = false,
  className = "",
  children,
}: OutlineTextBackgroundProps) {
  const gradientId = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const layout = layoutText(text);

  return (
    <div
      className={`relative isolate overflow-hidden bg-overlay-faint ${
        fill
          ? "size-full"
          : "aspect-square rounded-xl border border-hairline-soft"
      } ${className}`}
    >
      {/* text-foreground: warna outline (currentColor di stop gradient) ikut tema */}
      <svg
        aria-hidden="true"
        viewBox="0 0 352 352"
        preserveAspectRatio="xMinYMin slice"
        className="pointer-events-none absolute inset-0 size-full text-foreground"
      >
        {layout ? (
          <>
            <defs>
              <linearGradient
                id={gradientId}
                gradientUnits="userSpaceOnUse"
                x1="0"
                y1={-ASCENDER}
                x2="0"
                y2={-ASCENDER * 0.15}
              >
                <stop offset="0" stopColor="currentColor" stopOpacity="0.27" />
                <stop offset="1" stopColor="currentColor" stopOpacity="0.035" />
              </linearGradient>
            </defs>
            <g
              transform={`translate(${layout.offsetX} ${layout.baseline}) scale(${layout.scale})`}
            >
              {layout.glyphs.map(({ d, x }, i) => (
                <path
                  key={i}
                  d={d}
                  transform={`translate(${x})`}
                  fill="none"
                  stroke={`url(#${gradientId})`}
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </g>
          </>
        ) : null}
      </svg>
      {children ? <div className="relative size-full">{children}</div> : null}
    </div>
  );
}
