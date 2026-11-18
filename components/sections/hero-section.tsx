"use client";

import { useReducedMotion, motion } from "motion/react";
import { profile } from "@/data/profile.ts";
import { GithubIcon, LinkedinIcon } from "@/components/svg-icons/icons";
import HeroBadge from "../hero-badge";
import HeroButton from "../button/hero-button";
import GlassButton from "../button/glass-button";
import ArrowIconGlass from "../svg-icons/arrow-icon-glass";

const entrance = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function HeroSection() {
  const reduceMotion = useReducedMotion();
  const reveal = (delay: number) => ({
    initial: reduceMotion ? false : ("hidden" as const),
    animate: "visible" as const,
    variants: entrance,
    transition: { duration: 0.65, delay, ease },
  });

  return (
    <section className="min-h-screen flex flex-col justify-center space-y-10 px-4 sm:px-6 mx-auto max-w-6xl">
      <motion.div {...reveal(0)} className="max-w-fit">
        <HeroBadge title={profile.location} />
      </motion.div>

      <div className="space-y-6 max-w-3xl">
        <motion.h1
          {...reveal(0.12)}
          className="text-4xl sm:text-6xl font-semibold tracking-tight text-foreground leading-[1.15]"
        >
          Halo, Saya{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-foreground via-foreground to-accent">
            {profile.name}
          </span>
        </motion.h1>
        <motion.p
          {...reveal(0.24)}
          className="text-base sm:text-lg tracking-tight text-muted font-normal leading-relaxed"
        >
          {profile.hero}
        </motion.p>
      </div>

      <motion.div
        {...reveal(0.36)}
        className="flex flex-wrap items-center gap-4 pt-2"
      >
        <HeroButton href="#project">Lihat Proyek</HeroButton>
        <div className="flex items-center gap-2">
          {profile.socialLinks.map((link, i) => (
            <a
              key={i}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="inline-flex items-center justify-center size-10 rounded-full border border-hairline bg-overlay text-muted hover:text-accent hover:border-accent/40 transition-colors"
            >
              {link.label === "GitHub" && <GithubIcon className="size-5" />}
              {link.label === "LinkedIn" && <LinkedinIcon className="size-5" />}
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
