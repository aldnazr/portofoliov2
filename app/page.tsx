"use client";

import Image from "next/image";
import { useState } from "react";
import {
  profile,
  navigation,
  projects,
  experience,
} from "@/app/data/portfolio";
import SectionHeader from "@/app/components/section-header";

const allTechnologies = Array.from(
  new Set(projects.flatMap((p) => p.technologies)),
);

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Form states for contact email
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<"idle" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  const ITEMS_PER_PAGE = 3;
  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setIsLoading(true);
    setCurrentPage(page);
    document.getElementById("project")?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => setIsLoading(false), 350);
  };

  const currentProjects = projects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.message.trim()) return;

    setIsSending(true);
    setSendStatus("idle");
    setErrorMessage("");

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Gagal mengirim email");
      }

      setSendStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setSendStatus("error");
      setErrorMessage((err as Error).message);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#08090d] text-zinc-100 selection:bg-emerald-500/30 selection:text-emerald-400">
      {/* Background Glow Mesh */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-250 h-125 bg-linear-to-b from-emerald-500/10 via-teal-500/5 to-transparent blur-[120px] rounded-full" />
        <div className="absolute top-1/3 -left-40 w-125 h-125 bg-emerald-600/5 blur-[140px] rounded-full" />
        <div className="absolute bottom-10 right-0 w-150 h-150 bg-emerald-500/5 blur-[160px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* Floating Header */}
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

      {/* Main Content Container */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-24 space-y-28 sm:space-y-36">
        {/* HERO SECTION */}
        <section className="space-y-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-zinc-400 tracking-wide font-mono">
            <svg
              className="w-3.5 h-3.5 text-emerald-400"
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
          </div>

          <div className="space-y-6 max-w-3xl">
            <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-white leading-[1.15]">
              Halo, Saya{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-zinc-200 to-emerald-400">
                {profile.name}
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-zinc-400 font-normal leading-relaxed">
              {profile.hero}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#project"
              className="group relative inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-emerald-500 text-zinc-950 font-medium text-sm transition-all hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/25 active:scale-[0.98]"
            >
              <span>Lihat Proyek</span>
              <span className="w-6 h-6 rounded-full bg-zinc-950/10 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                ↓
              </span>
            </a>
          </div>

          {/* Stats Bar */}
          {/* <div className="pt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {profile.stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-1.5 rounded-[1.75rem] border border-white/10 bg-white/2"
              >
                <div className="p-6 rounded-[1.375rem] bg-[#0c0e14] border border-white/5 space-y-1">
                  <div className="text-3xl font-bold font-mono text-emerald-400">
                    {stat.value}
                  </div>
                  <div className="text-xs text-zinc-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div> */}
        </section>

        {/* TENTANG SECTION */}
        <section id="about" className="space-y-8 scroll-mt-28">
          <SectionHeader badge="Tentang Saya" title="Kemampuan" />

          <div className="p-1.5 rounded-4xl border border-white/10 bg-white/2">
            <div className="p-8 sm:p-10 rounded-[1.625rem] bg-[#0c0e14] border border-white/5 space-y-8">
              <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
                {profile.about}
              </p>

              <div className="space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-500">
                  Area Keahlian
                </h3>
                <div className="flex items-center flex-wrap gap-2.5">
                  {profile.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-zinc-200 font-medium hover:border-emerald-500/40 hover:text-emerald-400 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                  <span
                    aria-hidden="true"
                    className="h-6 w-px bg-linear-to-b from-transparent via-white/20 to-transparent"
                  />
                  {allTechnologies.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-zinc-200 font-medium hover:border-emerald-500/40 hover:text-emerald-400 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROYEK SECTION */}
        <section id="project" className="space-y-10 scroll-mt-28">
          <SectionHeader badge="Portofolio Karya" title="Proyek Pilihan" />

          <div className="grid grid-cols-1 gap-8">
            {isLoading ?
              Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                <div
                  key={i}
                  className="p-1.5 rounded-[2.25rem] border border-white/10 bg-white/2 animate-pulse"
                >
                  <div className="p-6 sm:p-8 rounded-[1.875rem] bg-[#0c0e14] border border-white/5 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-7 space-y-5">
                      <div className="flex items-center gap-3">
                        <div className="h-6 w-12 rounded-md bg-white/10" />
                        <div className="h-4 w-28 rounded bg-white/10" />
                      </div>
                      <div className="h-7 w-3/4 rounded bg-white/10" />
                      <div className="space-y-2 pt-1">
                        <div className="h-4 w-full rounded bg-white/10" />
                        <div className="h-4 w-5/6 rounded bg-white/10" />
                      </div>
                      <div className="flex flex-wrap gap-2 pt-1">
                        <div className="h-6 w-16 rounded-lg bg-white/10" />
                        <div className="h-6 w-20 rounded-lg bg-white/10" />
                        <div className="h-6 w-14 rounded-lg bg-white/10" />
                      </div>
                      <div className="pt-3 flex gap-3">
                        <div className="h-8 w-32 rounded-full bg-white/10" />
                      </div>
                    </div>
                    <div className="lg:col-span-5 relative w-full aspect-16/10 rounded-2xl bg-white/10" />
                  </div>
                </div>
              ))
            : currentProjects.map((item) => (
                <div
                  key={item.number}
                  className="group p-1.5 rounded-[2.25rem] border border-white/10 bg-white/2 hover:border-emerald-500/30 transition-all duration-500"
                >
                  <div className="p-6 sm:p-8 rounded-[1.875rem] bg-[#0c0e14] border border-white/5 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    {/* Info Column */}
                    <div className="lg:col-span-7 space-y-5">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-emerald-400 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                          {item.number}
                        </span>
                        <span className="text-xs text-zinc-400 font-medium tracking-wide uppercase font-mono">
                          {item.category}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-semibold text-white group-hover:text-emerald-300 transition-colors">
                        {item.name}
                      </h3>

                      <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Tech Badges */}
                      <div className="flex flex-wrap gap-2 pt-1">
                        {item.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-lg bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Links */}
                      <div className="pt-3 flex flex-wrap items-center gap-3">
                        {item.playStoreUrl && (
                          <a
                            href={item.playStoreUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium hover:bg-emerald-500/20 transition-colors"
                          >
                            <span>Google Play Store</span>
                            <span className="text-xs">↗</span>
                          </a>
                        )}
                        {item.sourceUrl && (
                          <a
                            href={item.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-medium hover:bg-white/10 hover:text-white transition-colors"
                          >
                            <span>Repository GitHub</span>
                            <span className="text-xs">↗</span>
                          </a>
                        )}
                        {item.demoUrl && (
                          <a
                            href={item.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-medium hover:bg-white/10 hover:text-white transition-colors"
                          >
                            <span>Demo App</span>
                            <span className="text-xs">↗</span>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Image / Fallback Column */}
                    <div className="lg:col-span-5 relative w-full aspect-16/10 rounded-2xl overflow-hidden border border-white/10 bg-zinc-900/60 group-hover:border-white/20 transition-colors">
                      {item.image ?
                        <Image
                          src={item.image.src}
                          alt={item.image.alt || item.name}
                          fill
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
                        />
                      : <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-linear-to-br from-zinc-900 to-zinc-950 space-y-3">
                          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 font-mono font-bold text-lg">
                            {item.number}
                          </div>
                          <div className="text-xs font-mono text-zinc-500">
                            {item.name}
                          </div>
                        </div>
                      }
                    </div>
                  </div>
                </div>
              ))
            }
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3.5 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-zinc-300 hover:bg-white/10 hover:text-white disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed transition-all"
                aria-label="Halaman sebelumnya"
              >
                &larr; Prev
              </button>

              <div className="flex items-center gap-1.5 px-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-8 h-8 rounded-full text-xs font-mono font-medium transition-all cursor-pointer ${
                        currentPage === page ?
                          "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold"
                        : "bg-white/5 text-zinc-400 border border-white/10 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3.5 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-zinc-300 hover:bg-white/10 hover:text-white disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed transition-all"
                aria-label="Halaman berikutnya"
              >
                Next &rarr;
              </button>
            </div>
          )}
        </section>

        {/* PENGALAMAN SECTION */}
        <section id="experience" className="space-y-10 scroll-mt-28">
          <SectionHeader badge="Riwayat Karir" title="Pengalaman Profesional" />

          <div className="p-1.5 rounded-[2.25rem] border border-white/10 bg-white/2">
            <div className="p-6 sm:p-10 rounded-[1.875rem] bg-[#0c0e14] border border-white/5 space-y-8">
              <div className="relative border-l border-white/10 ml-3 sm:ml-4 space-y-10">
                {experience.map((exp, idx) => (
                  <div key={idx} className="relative pl-6 sm:pl-8 group">
                    {/* Timeline Node */}
                    <div className="absolute -left-1.25 top-1.5 w-2.5 h-2.5 rounded-full bg-zinc-700 border-2 border-[#0c0e14] group-hover:bg-emerald-400 group-hover:scale-125 transition-all" />

                    <div className="space-y-2">
                      <div className="text-xs font-mono text-emerald-400 font-medium">
                        {exp.period}
                      </div>
                      <h3 className="text-lg font-semibold text-white">
                        {exp.title}{" "}
                        <span className="text-zinc-500 font-normal">
                          @ {exp.company}
                        </span>
                      </h3>
                      <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* KONTAK SECTION */}
        <section id="contact" className="scroll-mt-28">
          <div className="p-1.5 rounded-[2.5rem] border border-emerald-500/30 bg-linear-to-b from-emerald-500/10 via-white/2 to-transparent">
            <div className="p-8 sm:p-14 rounded-[2.125rem] bg-[#0c0e14] border border-white/5 text-center space-y-8">
              <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] font-mono text-emerald-400 border border-emerald-500/20 bg-emerald-500/10 inline-block">
                Mari Berkolaborasi
              </span>

              <h2 className="text-3xl sm:text-5xl font-semibold text-white tracking-tight max-w-2xl mx-auto leading-tight">
                Punya ide proyek atau peluang kerja sama?
              </h2>

              <p className="text-base sm:text-lg text-zinc-400 max-w-xl mx-auto">
                Kirim pesan langsung kepada saya melalui formulir di bawah ini
                atau salin email saya.
              </p>

              {/* Direct Email Form */}
              <form
                onSubmit={handleSendEmail}
                className="max-w-xl mx-auto text-left space-y-4 pt-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Nama Anda"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Email Anda"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
                  />
                </div>
                <textarea
                  required
                  rows={4}
                  placeholder="Pesan Anda..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors resize-none"
                />

                {sendStatus === "success" && (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs text-center font-medium">
                    ✓ Pesan berhasil terkirim! Terima kasih telah menghubungi.
                  </div>
                )}

                {sendStatus === "error" && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs text-center font-medium">
                    ✕ Gagal mengirim pesan: {errorMessage}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-emerald-500 text-zinc-950 font-medium text-sm transition-all hover:bg-emerald-400 hover:shadow-xl hover:shadow-emerald-500/20 active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                  >
                    <span>
                      {isSending ? "Mengirim..." : "Kirim Email Langsung"}
                    </span>
                    <span className="text-xs">↗</span>
                  </button>

                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-zinc-200 text-sm font-medium transition-all active:scale-[0.98]"
                  >
                    <svg
                      className="w-4 h-4 text-emerald-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    <span>{copied ? "Email Tersalin!" : profile.email}</span>
                  </button>
                </div>
              </form>

              {/* Socials */}
              <div className="pt-8 border-t border-white/5 flex items-center justify-center gap-6">
                {profile.socialLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-zinc-400 hover:text-emerald-400 font-mono transition-colors"
                  >
                    {link.label} ↗
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Minimal Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8 text-center text-xs font-mono text-zinc-500">
        <p>
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
