"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** Label segmen URL; href khusus bila tujuan beda dari path. */
const SEGMENT_META: Record<string, { label: string; href?: string }> = {
  learns: { label: "Learns" },
  methods: { label: "Array & String Methods" },
  paradigms: { label: "Functional & OOP" },
  "state-management": { label: "Global State Management" },
  projects: { label: "Project", href: "/#project" },
};

/**
 * Breadcrumb untuk sub-halaman (pages): `Beranda / ... / halaman aktif`.
 * `currentLabel` meng-override crumb terakhir (mis. nama proyek dari slug).
 */
export default function Breadcrumb({
  currentLabel,
}: {
  currentLabel?: string;
}) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-subtle">
        <li>
          <Link href="/" className="transition-colors hover:text-foreground">
            Beranda
          </Link>
        </li>
        {segments.map((segment, index) => {
          const meta = SEGMENT_META[segment];
          const isLast = index === segments.length - 1;
          const label =
            (isLast && currentLabel) ||
            meta?.label ||
            decodeURIComponent(segment);
          return (
            <li key={segment} className="flex items-center gap-2">
              <span aria-hidden="true" className="text-muted">
                /
              </span>
              {isLast ?
                <span aria-current="page" className="text-accent-strong">
                  {label}
                </span>
              : <Link
                  href={
                    meta?.href ?? `/${segments.slice(0, index + 1).join("/")}`
                  }
                  className="transition-colors hover:text-foreground"
                >
                  {label}
                </Link>
              }
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
