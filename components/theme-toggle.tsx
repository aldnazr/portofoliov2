"use client";

import { useLayoutEffect, useState } from "react";
import type { ReactNode } from "react";

type ThemeMode = "system" | "light" | "dark";

const ORDER: ThemeMode[] = ["system", "light", "dark"];

const LABEL: Record<ThemeMode, string> = {
  system: "ikuti sistem",
  light: "terang",
  dark: "gelap",
};

const isMode = (v: unknown): v is ThemeMode =>
  v === "system" || v === "light" || v === "dark";

const Icon = ({ children }: { children: ReactNode }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-4 md:size-3.5"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const ICONS: Record<ThemeMode, ReactNode> = {
  system: (
    <Icon>
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <line x1="8" x2="16" y1="21" y2="21" />
      <line x1="12" x2="12" y1="17" y2="21" />
    </Icon>
  ),
  light: (
    <Icon>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </Icon>
  ),
  dark: (
    <Icon>
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </Icon>
  ),
};

export default function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>("system");

  const apply = (next: ThemeMode) => {
    document.documentElement.setAttribute("data-theme", next);
    setMode(next);
  };

  const cycle = () => {
    const next = ORDER[(ORDER.indexOf(mode) + 1) % ORDER.length];
    try {
      localStorage.setItem("theme", next);
    } catch {
      //
    }
    apply(next);
  };

  useLayoutEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem("theme");
    } catch {
      //
    }
    const attr = document.documentElement.getAttribute("data-theme");
    apply(isMode(stored) ? stored : isMode(attr) ? attr : "system");

    const onStorage = (e: StorageEvent) => {
      if (e.key === "theme" && isMode(e.newValue)) apply(e.newValue);
    };
    globalThis.addEventListener("storage", onStorage);
    return () => globalThis.removeEventListener("storage", onStorage);
  }, []);

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`Tema: ${LABEL[mode]}. Klik untuk ganti tema`}
      title={`Tema: ${LABEL[mode]}`}
      className="rounded-full p-2.5 transition-colors bg-surface/90 backdrop-blur-xl shadow-elevated md:bg-overlay md:backdrop-blur-none md:shadow-none hover:cursor-pointer hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      {ICONS[mode]}
    </button>
  );
}
