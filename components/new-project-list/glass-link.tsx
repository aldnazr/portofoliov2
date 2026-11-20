"use client";

import Link from "next/link";
import { useEffect, useRef, type ComponentProps } from "react";
import { LuChevronRight } from "react-icons/lu";
import ArrowIconGlass from "../svg-icons/arrow-icon-glass";

type GlassLinkProps = Omit<ComponentProps<typeof Link>, "ref">;

function setCursor(el: HTMLElement, x: number, y: number) {
  el.style.setProperty("--cursorX", `${x}px`);
  el.style.setProperty("--cursorY", `${y}px`);
}

/** Posisi diam = tengah tombol. */
function centerCursor(el: HTMLElement) {
  const { width, height } = el.getBoundingClientRect();
  setCursor(el, width / 2, height / 2);
}

/**
 * Tombol "glass" yang highlight-nya mengikuti kursor.
 *
 * Posisi kursor (px, relatif ke tombol) disimpan di CSS variable `--cursorX` / `--cursorY`
 * langsung pada <a> — tanpa state, jadi tidak ada re-render per gerakan mouse.
 * Dua layer dekoratif membacanya lewat `transform`: glow lembut di dalam tombol
 * dan ring 1px di tepinya (gradient yang di-mask).
 *
 * Warna layer dekoratif diambil dari token tema di globals.css
 * (--glass-glow, --glass-ring-spot, --glass-ring-base), jadi otomatis ikut light/dark.
 */
export function GlassLink({
  children,
  className = "",
  onPointerMove,
  onPointerLeave,
  ...props
}: GlassLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    centerCursor(el);
    // Ukuran tombol bisa berubah (font selesai load, resize) → titik tengah ikut bergeser.
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
      onPointerMove={(e) => {
        onPointerMove?.(e);
        if (e.pointerType !== "mouse") return; // layar sentuh tidak butuh efek hover
        const el = e.currentTarget;
        const { left, top } = el.getBoundingClientRect();
        el.setAttribute("data-tracking", ""); // selama dilacak, transisi dimatikan (lihat projects.css)
        setCursor(el, e.clientX - left, e.clientY - top);
      }}
      onPointerLeave={(e) => {
        onPointerLeave?.(e);
        const el = e.currentTarget;
        el.removeAttribute("data-tracking"); // transisi aktif lagi → highlight meluncur ke tengah
        centerCursor(el);
      }}
      className={`group default-ring relative inline-flex items-center gap-3 rounded-xl border border-transparent px-4 py-3 text-foreground backdrop-blur-xs supports-safari:[&_.glass-icon]:backdrop-blur-[0px] ${className}`}
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
      <ArrowIconGlass direction="right" />
    </Link>
  );
}
