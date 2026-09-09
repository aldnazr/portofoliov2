"use client";

import { useState } from "react";
import { profile } from "@/app/data/profile";
import { Button } from "./button";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
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
      <div className="p-1.5 rounded-[2.5rem] border border-accent-wash-border bg-linear-to-b from-accent-wash via-overlay-faint to-transparent">
        <div className="p-8 sm:p-14 rounded-[2.125rem] bg-surface border border-hairline-soft text-center space-y-8">
          <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] font-mono text-accent-strong border border-accent-wash-border bg-accent-wash inline-block">
            Mari Berkolaborasi
          </span>

          <h2 className="text-3xl sm:text-5xl font-semibold text-foreground tracking-tight max-w-2xl mx-auto leading-tight">
            Punya ide proyek atau peluang kerja sama?
          </h2>

          <p className="text-base sm:text-lg text-muted max-w-xl mx-auto">
            Kirim pesan langsung kepada saya melalui formulir di bawah ini atau
            salin email saya.
          </p>

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
                className="w-full px-4 py-3 rounded-xl bg-overlay border border-hairline text-foreground placeholder:text-muted text-sm focus:outline-none focus:border-accent transition-colors"
              />
              <input
                type="email"
                placeholder="Email Anda"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-overlay border border-hairline text-foreground placeholder:text-muted text-sm focus:outline-none focus:border-accent transition-colors"
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
              className="w-full px-4 py-3 rounded-xl bg-overlay border border-hairline text-foreground placeholder:text-muted text-sm focus:outline-none focus:border-accent transition-colors resize-none"
            />

            {sendStatus === "success" && (
              <div className="p-3 rounded-xl bg-accent-wash border border-accent-wash-border text-accent-strong text-xs text-center font-medium">
                ✓ Pesan berhasil terkirim! Terima kasih telah menghubungi.
              </div>
            )}

            {sendStatus === "error" && (
              <div className="p-3 rounded-xl bg-danger-wash border border-danger-border text-danger text-xs text-center font-medium">
                ✕ Gagal mengirim pesan: {errorMessage}
              </div>
            )}

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-2">
              <Button
                type="submit"
                disabled={isSending}
                size="lg"
                className="w-full sm:w-auto"
              >
                <span>
                  {isSending ? "Mengirim..." : "Kirim Pesan Langsung"}
                </span>
                <span className="w-6 h-6 rounded-full bg-on-primary-wash flex items-center justify-center group-hover:scale-105 transition-transform">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="size-3"
                  >
                    <path d="M2.87 2.298a.75.75 0 0 0-.812 1.021L3.39 6.624a1 1 0 0 0 .928.626H8.25a.75.75 0 0 1 0 1.5H4.318a1 1 0 0 0-.927.626l-1.333 3.305a.75.75 0 0 0 .811 1.022 24.89 24.89 0 0 0 11.668-5.115.75.75 0 0 0 0-1.175A24.89 24.89 0 0 0 2.869 2.298Z" />
                  </svg>
                </span>
              </Button>

              <Button
                type="button"
                onClick={handleCopyEmail}
                variant="secondary"
                className="w-full sm:w-fit gap-2.5"
              >
                <svg
                  className="w-4 h-4 text-accent"
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
              </Button>
            </div>
          </form>

          <div className="pt-8 border-t border-hairline-soft flex items-center justify-center gap-6">
            {profile.socialLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent font-mono transition-colors group"
              >
                {link.label === "GitHub" && (
                  <svg
                    viewBox="0 0 192 192"
                    fill="none"
                    stroke="currentColor"
                    className="size-5 shrink-0"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={12}
                      d="M120.755 170c.03-4.669.059-20.874.059-27.29 0-9.272-3.167-15.339-6.719-18.41 22.051-2.464 45.201-10.863 45.201-49.067 0-10.855-3.824-19.735-10.175-26.683 1.017-2.516 4.413-12.63-.987-26.32 0 0-8.296-2.672-27.202 10.204-7.912-2.213-16.371-3.308-24.784-3.352-8.414.044-16.872 1.14-24.785 3.352C52.457 19.558 44.162 22.23 44.162 22.23c-5.4 13.69-2.004 23.804-.987 26.32C36.824 55.498 33 64.378 33 75.233c0 38.204 23.149 46.603 45.2 49.067-3.551 3.071-6.719 9.138-6.719 18.41 0 6.416.03 22.621.059 27.29M27 130c9.939.703 15.67 9.735 15.67 9.735 8.834 15.199 23.178 10.803 28.815 8.265"
                    />
                  </svg>
                )}
                {link.label === "LinkedIn" && (
                  <svg
                    viewBox="0 0 192 192"
                    fill="none"
                    stroke="currentColor"
                    className="size-5 shrink-0"
                    aria-hidden="true"
                  >
                    <rect
                      width="132"
                      height="132"
                      x="30"
                      y="30"
                      strokeWidth={12}
                      rx="16"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={12}
                      d="M66 86v44"
                    />
                    <circle cx="66" cy="64" r="8" fill="currentColor" />
                    <path
                      strokeLinecap="round"
                      strokeWidth={12}
                      d="M126 130v-26c0-9.941-8.059-18-18-18v0c-9.941 0-18 8.059-18 18v26"
                    />
                  </svg>
                )}
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
