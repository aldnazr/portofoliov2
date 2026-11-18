"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowIcon } from "@/components/icons.tsx";
import { cn } from "@/lib/utils.ts";

const STROKE = 2;
const EASE = [0.22, 1, 0.36, 1] as const;
const GLOW_OFF =
  "0 0 14px rgba(112, 255, 175, 0), 0 0 36px rgba(112, 255, 175, 0)";
const GLOW_ON =
  "0 0 14px rgba(112, 255, 175, 0.32), 0 0 36px rgba(112, 255, 175, 0.16)";

type HeroButtonProps = Omit<HTMLMotionProps<"a">, "children"> & {
  href: string;
  children?: ReactNode;
};

export default function HeroButton({
  className,
  children = "Lihat Proyek",
  ...rest
}: HeroButtonProps) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const [active, setActive] = useState(false);
  const reduceMotion = useReducedMotion();
  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.45, ease: EASE };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setSize({ w: el.offsetWidth, h: el.offsetHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <motion.a
      {...rest}
      ref={ref}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setActive(true)}
      onHoverEnd={() => setActive(false)}
      onFocus={(e) =>
        e.currentTarget.matches(":focus-visible") && setActive(true)
      }
      onBlur={() => setActive(false)}
      animate={{ boxShadow: active ? GLOW_ON : GLOW_OFF }}
      transition={transition}
      className={cn(
        "relative inline-flex h-13 sm:h-14 items-center justify-center whitespace-nowrap rounded-full bg-[#232629] px-6 sm:px-7.5 font-sans text-sm font-medium text-white select-none cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background [-webkit-tap-highlight-color:transparent]",
        className,
      )}
    >
      <span>{children}</span>
      <ArrowIcon direction="down" className="size-4.5 ml-5.5 shrink-0" />
      {size && (
        <svg
          className="pointer-events-none absolute inset-0 size-full overflow-visible"
          width={size.w}
          height={size.h}
          aria-hidden="true"
        >
          <motion.path
            d={pillPath(size.w, size.h)}
            fill="none"
            stroke="#70ffaf"
            strokeWidth={STROKE}
            pathLength={1}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: active ? 1 : 0 }}
            transition={transition}
          />
        </svg>
      )}
    </motion.a>
  );
}

function pillPath(w: number, h: number) {
  const i = STROKE / 2;
  const r = (h - STROKE) / 2;
  const x0 = i;
  const x1 = w - i;
  const y0 = i;
  const y1 = h - i;

  return [
    `M ${x0} ${y0 + r}`,
    `A ${r} ${r} 0 0 1 ${x0 + r} ${y0}`,
    `L ${x1 - r} ${y0}`,
    `A ${r} ${r} 0 0 1 ${x1} ${y0 + r}`,
    `A ${r} ${r} 0 0 1 ${x1 - r} ${y1}`,
    `L ${x0 + r} ${y1}`,
    `A ${r} ${r} 0 0 1 ${x0} ${y0 + r}`,
  ].join(" ");
}
