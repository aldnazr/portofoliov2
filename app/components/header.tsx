"use client";

import { useState } from "react";
import { profile } from "@/app/data/profile";
import { navigation } from "@/app/data/navigation";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-6 z-50 px-4 sm:px-6 max-w-5xl mx-auto">
      <div className="rounded-full border border-white/10 bg-[#0c0e14]/80 backdrop-blur-xl px-4 py-3 sm:px-6 flex items-center justify-between shadow-2xl shadow-black/50">
        <a href="#" className="group flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-xs font-mono font-bold text-emerald-400 group-hover:scale-105 transition-transform">
            {profile.initials}
          </div>
          <span className="text-sm font-medium tracking-tight text-zinc-200 group-hover:text-white transition-colors hidden sm:inline">
            {profile.name}
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-4 py-1.5 text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/5 rounded-full transition-all"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Action Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-xs font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>{profile.availability}</span>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Toggle Navigation"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ?
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              : <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu Dropdown */}
      {mobileMenuOpen && (
        <nav className="md:hidden mt-3 rounded-2xl border border-white/10 bg-[#0c0e14]/95 backdrop-blur-xl p-4 flex flex-col gap-2 shadow-xl">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
