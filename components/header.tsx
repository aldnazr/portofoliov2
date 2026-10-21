"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  type Transition,
} from "motion/react";
import { profile } from "@/data/profile.ts";
import { navigation } from "@/data/navigation.ts";
import ThemeToggle from "@/components/theme-toggle.tsx";
import { usePathname } from "next/navigation";

const EASE = [0.22, 1, 0.36, 1] as const;
const CONCEAL_AFTER = 96;
const ANCHOR_GRACE = 1200;

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [concealed, setConcealed] = useState(false);
  const pathName = usePathname();
  const isHome = pathName === "/";
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const lastScrollY = useRef<number | null>(null);
  const graceUntil = useRef(0);

  useEffect(() => {
    lastScrollY.current = scrollY.get();
  }, [scrollY]);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = lastScrollY.current;
    lastScrollY.current = current;
    if (previous === null || current === previous) return;
    if (current < previous) {
      setConcealed(false);
      return;
    }
    if (current > CONCEAL_AFTER && Date.now() > graceUntil.current) {
      setConcealed(true);
    }
  });

  const hidden = concealed && !mobileMenuOpen;

  const headerTransition: Transition = reduceMotion
    ? { duration: 0 }
    : { type: "spring", stiffness: 300, damping: 32, mass: 0.9 };

  const iconTransition: Transition = reduceMotion
    ? { duration: 0 }
    : { type: "spring", stiffness: 420, damping: 30, mass: 0.6 };

  const duration = (seconds: number) => (reduceMotion ? 0 : seconds);
  const delay = (seconds: number) => (reduceMotion ? 0 : seconds);

  const keepVisibleDuringAnchorJump = () => {
    graceUntil.current = Date.now() + ANCHOR_GRACE;
  };

  return (
    <motion.header
      initial={false}
      animate={{ y: hidden ? "-170%" : 0, opacity: hidden ? 0 : 1 }}
      transition={headerTransition}
      inert={hidden}
      className="fixed inset-x-0 top-6 z-50 mx-auto max-w-3xl px-4 md:px-6"
    >
      <div className="rounded-full border border-hairline bg-surface/80 backdrop-blur-xl px-4 py-3 sm:px-6 flex items-center justify-between shadow-elevated">
        <a
          href={isHome ? "#" : "/"}
          className="group flex items-center gap-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <div className="size-9 rounded-full bg-accent-wash border border-accent-wash-border flex items-center justify-center text-xs font-mono font-bold text-accent-strong transition-transform">
            {profile.initials}
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={keepVisibleDuringAnchorJump}
              className="px-4 py-1.5 text-xs font-medium text-muted hover:text-foreground hover:bg-overlay rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Action Area */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="md:hidden relative grid size-10 place-items-center rounded-full text-muted hover:text-foreground hover:bg-overlay transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent after:absolute after:-inset-1.5 after:content-['']"
            aria-label={mobileMenuOpen ? "Tutup navigasi" : "Buka navigasi"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
          >
            <span className="relative block size-5" aria-hidden="true">
              <motion.span
                className="absolute left-0 top-[4px] h-0.5 w-5 rounded-full bg-current"
                style={{ originX: 0.5, originY: 0.5 }}
                animate={{
                  y: mobileMenuOpen ? 5 : 0,
                  rotate: mobileMenuOpen ? 45 : 0,
                }}
                transition={iconTransition}
              />
              <motion.span
                className="absolute left-0 top-[9px] h-0.5 w-5 rounded-full bg-current"
                style={{ originX: 0.5, originY: 0.5 }}
                animate={{
                  opacity: mobileMenuOpen ? 0 : 1,
                  scaleX: mobileMenuOpen ? 0.4 : 1,
                }}
                transition={iconTransition}
              />
              <motion.span
                className="absolute left-0 top-[14px] h-0.5 w-5 rounded-full bg-current"
                style={{ originX: 0.5, originY: 0.5 }}
                animate={{
                  y: mobileMenuOpen ? -5 : 0,
                  rotate: mobileMenuOpen ? -45 : 0,
                }}
                transition={iconTransition}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            id="mobile-nav"
            key="mobile-nav"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: duration(0.35), ease: EASE }}
            className="md:hidden mt-3 rounded-2xl border border-hairline bg-surface/95 backdrop-blur-xl p-4 flex flex-col gap-2 shadow-elevated"
          >
            {navigation.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={() => {
                  setMobileMenuOpen(false);
                  keepVisibleDuringAnchorJump();
                }}
                initial={{ opacity: 0, y: 12 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: duration(0.4),
                    ease: EASE,
                    delay: delay(0.05 + index * 0.05),
                  },
                }}
                exit={{
                  opacity: 0,
                  y: 6,
                  transition: { duration: duration(0.2), ease: EASE },
                }}
                className="px-4 py-2.5 text-sm font-medium text-foreground-soft hover:text-foreground hover:bg-overlay rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {item.label}
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
