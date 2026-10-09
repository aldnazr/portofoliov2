"use client";

import { profile } from "@/data/profile";
import { motion, useReducedMotion } from "motion/react";
import { ButtonLink } from "../button";
import { ArrowIcon, GithubIcon, LinkedinIcon } from "../icons";

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
    <section className="space-y-10 px-4 sm:px-6 mx-auto max-w-6xl">
      <motion.div
        {...reveal(0)}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-hairline bg-overlay text-xs text-muted tracking-wide font-mono"
      >
        <svg
          className="w-3.5 h-3.5 text-accent"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        {profile.location}
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
        <ButtonLink href="#project">
          <span>Lihat Proyek</span>
          <span className="w-6 h-6 rounded-full bg-on-primary-wash flex items-center justify-center group-hover:scale-105 transition-transform">
            <ArrowIcon direction="down" className="size-3.5 shrink-0" />
          </span>
        </ButtonLink>

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
