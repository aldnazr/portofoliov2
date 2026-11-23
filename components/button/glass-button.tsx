"use client";

import Link from "next/link";
import { useEffect, useRef, type ComponentProps } from "react";
import { LuChevronRight } from "react-icons/lu";
import ArrowIconGlass from "../svg-icons/arrow-icon-glass";
import { cn } from "@/lib/utils.ts";

type GlassLinkProps = Omit<ComponentProps<typeof Link>, "ref">;

type GlassButtonProps = GlassLinkProps & {
  /** Paksa palet gelap (glass + teks) walau tema aplikasi sedang terang. */
  alwaysDark?: boolean;
};

function setCursor(el: HTMLElement, x: number, y: number) {
  el.style.setProperty("--cursorX", `${x}px`);
  el.style.setProperty("--cursorY", `${y}px`);
}

function centerCursor(el: HTMLElement) {
  const { width, height } = el.getBoundingClientRect();
  setCursor(el, width / 2, height / 2);
}

export function GlassButton({
  children,
  className,
  alwaysDark = false,
  style,
  onPointerMove,
  onPointerLeave,
  ...props
}: GlassButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    centerCursor(el);
    const ro = new ResizeObserver(() => {
      if (!el.hasAttribute("data-tracking")) centerCursor(el);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <Link
      {...props}
      ref={ref}
      style={alwaysDark ? { ...style, colorScheme: "dark" } : style}
      onPointerMove={(e) => {
        onPointerMove?.(e);
        if (e.pointerType !== "mouse") return;
        const el = e.currentTarget;
        const { left, top } = el.getBoundingClientRect();
        el.setAttribute("data-tracking", "");
        setCursor(el, e.clientX - left, e.clientY - top);
      }}
      onPointerLeave={(e) => {
        onPointerLeave?.(e);
        const el = e.currentTarget;
        el.removeAttribute("data-tracking");
        centerCursor(el);
      }}
      className={cn(
        "group default-ring relative inline-flex items-center gap-3 rounded-xl border border-transparent px-4 py-3 text-foreground backdrop-blur-xs supports-safari:[&_.glass-icon]:backdrop-blur-[0px]",
        className,
      )}
    >
      {/* glow di dalam tombol */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 isolate z-[-1] select-none overflow-hidden rounded-[inherit] transition-opacity group-active:opacity-80"
      >
        <span
          className="glass-follow absolute left-0 top-0 block h-[400%] w-[200%]"
          style={{
            background: "radial-gradient(var(--glass-glow), transparent 40%)",
            opacity: 0.7,
            transform:
              "translateX(calc(var(--cursorX) - 50%)) translateY(calc(var(--cursorY) - 50%)) scale(1.7) rotate(-45deg)",
          }}
        />
      </span>

      {/* ring 1px di tepi tombol */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px select-none overflow-hidden p-px transition-opacity group-active:opacity-80"
        style={{
          borderRadius: 13,
          // Mask inline: ring hanya bingkai 1px (padding). Sengaja tidak lewat CSS eksternal
          // supaya kalau stylesheet belum ter-load, layer ini tidak jadi kotak penuh.
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          maskComposite: "exclude",
        }}
      >
        <span
          className="glass-follow block h-162.5 w-62.5"
          style={{
            background:
              "radial-gradient(var(--glass-ring-spot), var(--glass-ring-base) 22%) var(--glass-ring-base)",
            transform:
              "translate(calc(var(--cursorX) - 50%), calc(var(--cursorY) - 50%)) rotate(80deg)",
          }}
        />
      </span>
      <span className="relative">{children}</span>
      <ArrowIconGlass direction="right" alwaysDark={alwaysDark} />
    </Link>
  );
}
