"use client";

import { useState } from "react";
import { profile } from "@/app/data/portfolio";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

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
            Kirim pesan langsung kepada saya melalui formulir di bawah ini atau salin email saya.
          </p>

          <form onSubmit={handleSendEmail} className="max-w-xl mx-auto text-left space-y-4 pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder="Nama Anda" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors" />
              <input type="email" placeholder="Email Anda" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors" />
            </div>
            <textarea required rows={4} placeholder="Pesan Anda..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors resize-none" />

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
              <button type="submit" disabled={isSending} className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-emerald-500 text-zinc-950 font-medium text-sm transition-all hover:bg-emerald-400 hover:shadow-xl hover:shadow-emerald-500/20 active:scale-[0.98] disabled:opacity-50 cursor-pointer">
                <span>{isSending ? "Mengirim..." : "Kirim Pesan Langsung"}</span>
                <span className="text-xs">↗</span>
              </button>

              <button type="button" onClick={handleCopyEmail} className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-zinc-200 text-sm font-medium transition-all active:scale-[0.98] cursor-pointer">
                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>{copied ? "Email Tersalin!" : profile.email}</span>
              </button>
            </div>
          </form>

          <div className="pt-8 border-t border-white/5 flex items-center justify-center gap-6">
            {profile.socialLinks.map((link, i) => (
              <a key={i} href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-400 hover:text-emerald-400 font-mono transition-colors">
                {link.label} ↗
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
