"use client";

import { useLayoutEffect, useRef } from "react";

type ThemeMode = "system" | "light" | "dark";

export default function ThemeToggle() {
  const containerRef = useRef<HTMLDivElement>(null);

  const syncPressed = (mode: string | undefined) => {
    if (!containerRef.current) return;
    const buttons =
      containerRef.current.querySelectorAll<HTMLButtonElement>(
        "button[data-mode]",
      );
    buttons.forEach((btn) => {
      btn.setAttribute(
        "aria-pressed",
        btn.dataset.mode === mode ? "true" : "false",
      );
    });
  };

  const setTheme = (mode: ThemeMode) => {
    try {
      localStorage.setItem("theme", mode);
    } catch {
      //
    }
    document.documentElement.setAttribute("data-theme", mode);
    syncPressed(mode);
  };

  useLayoutEffect(() => {
    let mode: string | null = null;
    try {
      mode = localStorage.getItem("theme");
    } catch {
      //
    }
    if (mode === "light" || mode === "dark" || mode === "system") {
      document.documentElement.setAttribute("data-theme", mode);
    } else {
      mode = document.documentElement.getAttribute("data-theme") || "system";
    }
    syncPressed(mode);

    const onStorage = (e: StorageEvent) => {
      if (
        e.key === "theme" &&
        (e.newValue === "light" ||
          e.newValue === "dark" ||
          e.newValue === "system")
      ) {
        document.documentElement.setAttribute("data-theme", e.newValue);
        syncPressed(e.newValue);
      }
    };
    globalThis.addEventListener("storage", onStorage);
    return () => globalThis.removeEventListener("storage", onStorage);
  }, []);

  return (
    <div
      ref={containerRef}
      role="group"
      aria-label="Tema tampilan"
      className="flex items-center gap-0.5 rounded-full border border-hairline bg-overlay p-0.5"
    >
      <button
        type="button"
        data-mode="system"
        onClick={() => setTheme("system")}
        aria-label="Tema: ikuti sistem"
        className="theme-seg-btn rounded-full p-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-3.5"
        >
          <rect width="20" height="14" x="2" y="3" rx="2" />
          <line x1="8" x2="16" y1="21" y2="21" />
          <line x1="12" x2="12" y1="17" y2="21" />
        </svg>
      </button>

      <button
        type="button"
        data-mode="light"
        onClick={() => setTheme("light")}
        aria-label="Tema: terang"
        className="theme-seg-btn rounded-full p-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-3.5"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      </button>

      <button
        type="button"
        data-mode="dark"
        onClick={() => setTheme("dark")}
        aria-label="Tema: gelap"
        className="theme-seg-btn rounded-full p-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-3.5"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      </button>
    </div>
  );
}
