"use client";

import type {
  AnchorHTMLAttributes,
  CSSProperties,
  PointerEvent,
  ReactNode,
} from "react";

type GlassLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "children"
> & {
  children?: ReactNode;
};

type CSSVars = CSSProperties & {
  "--cursor-x": string;
  "--cursor-y": string;
};

export default function GlassButton({
  href = "/#blog-intro",
  children = "Learn How",
  className = "",
  style,
  onPointerMove,
  onPointerLeave,
  ...props
}: GlassLinkProps) {
  const handlePointerMove = (event: PointerEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Update CSS variables directly without React re-render.
    event.currentTarget.style.setProperty("--cursor-x", `${x}px`);
    event.currentTarget.style.setProperty("--cursor-y", `${y}px`);

    onPointerMove?.(event);
  };

  const handlePointerLeave = (event: PointerEvent<HTMLAnchorElement>) => {
    event.currentTarget.style.setProperty("--cursor-x", "50%");
    event.currentTarget.style.setProperty("--cursor-y", "50%");

    onPointerLeave?.(event);
  };

  return (
    <a
      {...props}
      href={href}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={
        {
          "--cursor-x": "50%",
          "--cursor-y": "50%",
          ...style,
        } as CSSVars
      }
      className={`
        group relative isolate inline-flex items-center gap-3
        overflow-hidden rounded-xl
        border border-white/10
        bg-neutral-950/30
        px-4 py-3
        text-sm font-medium text-neutral-100
        shadow-sm backdrop-blur-md
        transition-all duration-200
        active:scale-[0.98]
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-white/50
        focus-visible:ring-offset-2
        focus-visible:ring-offset-neutral-950
        motion-reduce:transition-none
        ${className}
      `}
    >
      {/* Dynamic border glow */}
      <span
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0 z-0
          overflow-hidden rounded-[inherit]
        "
      >
        <span
          className="absolute left-0 top-0 h-162.5 w-62.5"
          style={{
            transform: `
              translate(
                calc(var(--cursor-x) - 50%),
                calc(var(--cursor-y) - 50%)
              ) rotate(80deg)
            `,
            background:
              "radial-gradient(rgba(255,255,255,0.2), rgb(40,40,40) 22%) rgb(36,36,36)",
          }}
        />

        {/* Inner glass surface masks the center of the border glow */}
        <span
          className="
            absolute inset-px
            rounded-[inherit]
            bg-neutral-950/90
            backdrop-blur-md
          "
        />
      </span>

      {/* Cursor spotlight */}
      <span
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0 z-1
          rounded-[inherit]
          opacity-70
          transition-opacity duration-200
          group-active:opacity-40
        "
        style={{
          background: `
            radial-gradient(
              circle at var(--cursor-x) var(--cursor-y),
              rgba(255,255,255,0.07),
              transparent 40%
            )
          `,
        }}
      />

      {/* Label */}
      <span className="relative z-10">{children}</span>
    </a>
  );
}
