"use client";

import { useEffect, useState } from "react";

type State =
  | { status: "loading" }
  | { status: "ready"; timestamp: string }
  | { status: "error"; message: string };

export default function CsrTimestamp() {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    let controller = new AbortController();

    const fetchTime = () => {
      controller = new AbortController();
      fetch("/api/time", { cache: "no-store", signal: controller.signal })
        .then(async (res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const body: unknown = await res.json();
          const timestamp = (body as { generatedAt?: unknown })?.generatedAt;
          if (typeof timestamp !== "string" || Number.isNaN(Date.parse(timestamp))) {
            throw new Error("Format waktu tidak valid");
          }
          setState({ status: "ready", timestamp });
        })
        .catch((error: unknown) => {
          if (controller.signal.aborted) return;
          setState({
            status: "error",
            message: error instanceof Error ? error.message : "Tidak diketahui",
          });
        });
    };

    fetchTime();
    const interval = setInterval(fetchTime, 1000);

    return () => {
      controller.abort();
      clearInterval(interval);
    };
  }, []);

  return (
    <section aria-labelledby="result-heading" className="space-y-4 rounded-2xl border border-hairline bg-surface-muted p-6 sm:p-8">
      <h2 id="result-heading" className="font-mono text-xs font-medium uppercase tracking-wider text-muted">
        Waktu render
      </h2>
      {state.status === "loading" && (
        <p className="text-muted">Memuat waktu...</p>
      )}
      {state.status === "ready" && (
        <p className="text-foreground">
          Timestamp:{" "}
          <time dateTime={state.timestamp} data-demo-timestamp className="rounded bg-accent-wash px-2 py-1 font-mono text-sm text-accent-strong">
            {state.timestamp}
          </time>
        </p>
      )}
      {state.status === "error" && (
        <p role="alert" className="text-danger">
          Gagal memuat waktu: {state.message}. Muat ulang halaman untuk mencoba lagi.{" "}
          <a href="/learns/rendering/csr" className="font-medium underline underline-offset-4">
            Muat ulang halaman
          </a>
        </p>
      )}
      <noscript>
        <p className="text-amber-400">
          JavaScript dinonaktifkan. Halaman CSR memerlukan JavaScript untuk menampilkan timestamp.
        </p>
      </noscript>
      <div className="space-y-1 text-sm text-muted">
        <p>Lokasi render: browser. Sumber waktu: API server di /api/time.</p>
        <p>Perilaku refresh: diperbarui otomatis setiap 1 detik secara real-time.</p>
      </div>
    </section>
  );
}
