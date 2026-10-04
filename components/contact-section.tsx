"use client";

import { useState } from "react";
import { profile } from "@/data/profile";
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
    <section id="contact" className="scroll-mt-28 mx-auto max-w-6xl">
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
                className="w-full sm:w-auto"
              >
                <span>
                  {isSending ? "Mengirim..." : "Kirim Pesan Langsung"}
                </span>
                <span className="w-6 h-6 rounded-full bg-on-primary-wash flex items-center justify-center transition-transform">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="size-3.5"
                    aria-hidden="true"
                  >
                    <path
                      d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
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
        </div>
      </div>
    </section>
  );
}
