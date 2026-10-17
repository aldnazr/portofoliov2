import type { Metadata } from "next";
import Link from "next/link";
import TopicHeader from "@/features/learns/components/topic-header";

export const metadata: Metadata = {
  title: "Rendering Strategies | Interactive Learning Lab",
  description:
    "Perbandingan empat strategi rendering Next.js: CSR, SSR, SSG, dan ISR dengan demo live timestamp.",
};

const demos = [
  {
    href: "/learns/rendering/csr",
    name: "CSR",
    desc: "Timestamp diambil browser dari API setelah JavaScript berjalan.",
  },
  {
    href: "/learns/rendering/ssr",
    name: "SSR",
    desc: "Server membuat HTML baru pada setiap request.",
  },
  {
    href: "/learns/rendering/ssg",
    name: "SSG",
    desc: "HTML dibuat saat build dan dipakai ulang.",
  },
  {
    href: "/learns/rendering/isr",
    name: "ISR",
    desc: "HTML statis diregenerasi secara berkala setelah interval 10 detik.",
  },
];

const codeClass =
  "rounded bg-surface-muted px-1.5 py-0.5 font-mono text-[0.85em] text-accent-strong border border-hairline-soft";

export default function RenderingOverviewPage() {
  return (
    <div className="space-y-12">
      <TopicHeader
        title="Perbandingan CSR, SSR, SSG, dan ISR"
        description="Empat halaman demo membandingkan kapan HTML dibuat dan kapan timestamp berubah. Data hanya timestamp lokal; tanpa database atau layanan eksternal."
      />

      <section aria-labelledby="demo-heading" className="space-y-4">
        <h2
          id="demo-heading"
          className="font-mono text-xs font-medium uppercase tracking-wider text-muted"
        >
          Demo Strategi
        </h2>
        <ul className="divide-y divide-hairline border-y border-hairline">
          {demos.map((demo) => (
            <li key={demo.href}>
              <Link
                href={demo.href}
                prefetch={false}
                className="group grid gap-1 px-3 py-4 hover:bg-surface-muted active:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-6"
              >
                <span className="font-semibold text-foreground underline-offset-4 group-hover:underline group-focus-visible:underline">
                  {demo.name}
                </span>
                <p className="min-w-0 text-sm leading-relaxed text-muted">{demo.desc}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="table-heading" className="space-y-4">
        <h2
          id="table-heading"
          className="font-mono text-xs font-medium uppercase tracking-wider text-muted"
        >
          Tabel Perbandingan
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-hairline bg-surface-muted">
          <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-hairline bg-surface text-muted">
                <th scope="col" className="px-6 py-3.5 font-mono text-xs uppercase tracking-wider">
                  Strategi
                </th>
                <th scope="col" className="px-6 py-3.5 font-mono text-xs uppercase tracking-wider">
                  HTML Dibuat
                </th>
                <th scope="col" className="px-6 py-3.5 font-mono text-xs uppercase tracking-wider">
                  Timestamp Berasal Dari
                </th>
                <th scope="col" className="px-6 py-3.5 font-mono text-xs uppercase tracking-wider">
                  Refresh
                </th>
              </tr>
            </thead>
            <tbody className="align-top leading-relaxed text-foreground-soft">
              <tr className="border-b border-hairline">
                <th scope="row" className="px-6 py-4 font-semibold text-foreground">
                  CSR
                </th>
                <td className="px-6 py-4">Browser setelah JavaScript berjalan</td>
                <td className="px-6 py-4">
                  <code className={codeClass}>GET /api/time</code>
                </td>
                <td className="px-6 py-4">Diperbarui otomatis setiap 1 detik secara real-time</td>
              </tr>
              <tr className="border-b border-hairline">
                <th scope="row" className="px-6 py-4 font-semibold text-foreground">
                  SSR
                </th>
                <td className="px-6 py-4">Server pada setiap request</td>
                <td className="px-6 py-4">Fungsi render halaman</td>
                <td className="px-6 py-4">Timestamp baru pada setiap request/muat ulang</td>
              </tr>
              <tr className="border-b border-hairline">
                <th scope="row" className="px-6 py-4 font-semibold text-foreground">
                  SSG
                </th>
                <td className="px-6 py-4">Saat build</td>
                <td className="px-6 py-4">Fungsi render halaman saat build</td>
                <td className="px-6 py-4">Sama sampai build berikutnya</td>
              </tr>
              <tr>
                <th scope="row" className="px-6 py-4 font-semibold text-foreground">
                  ISR
                </th>
                <td className="px-6 py-4">Saat build, lalu diregenerasi</td>
                <td className="px-6 py-4">Fungsi render halaman saat regenerasi</td>
                <td className="px-6 py-4">
                  Request setelah 10 detik memicu regenerasi di belakang layar; request berikutnya menerima hasil baru
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section
        aria-labelledby="prod-heading"
        className="space-y-3 border-t border-hairline pt-8"
      >
        <h2
          id="prod-heading"
          className="font-mono text-xs font-medium uppercase tracking-wider text-muted"
        >
          Menjalankan Mode Produksi
        </h2>
        <p className="max-w-2xl text-sm leading-relaxed text-foreground-soft">
          Jalankan <code className={codeClass}>bun run build</code> lalu{" "}
          <code className={codeClass}>bun run start</code>. Mode development (
          <code className={codeClass}>bun run dev</code>) tidak membuktikan perilaku cache produksi.
        </p>
      </section>
    </div>
  );
}
