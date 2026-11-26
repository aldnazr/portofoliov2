"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowIcon } from "../svg-icons/icons.tsx";

type BackLinkProps = {
  href?: string;
  label: string;
};

export default function BackLink({ href = "/", label }: BackLinkProps) {
  const pathname = usePathname();
  const isRenderingDemo =
    href === "/learns" &&
    /^\/learns\/rendering\/(csr|isr|ssg|ssr)\/?$/.test(pathname);

  const text = isRenderingDemo ? "Kembali ke Rendering" : label;

  return (
    <Link
      href={isRenderingDemo ? "/learns/rendering" : href}
      aria-label={text}
      className="group inline-flex min-h-11 items-center gap-4 text-sm font-medium text-subtle transition-[color,translate] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-x-1 hover:text-foreground active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none sm:text-base"
    >
      <span
        aria-hidden="true"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-hairline text-subtle transition-[color,border-color,translate] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-1 group-hover:border-accent-wash-border group-hover:text-accent-hover motion-reduce:transition-none"
      >
        <ArrowIcon />
      </span>
      <span className="hidden sm:inline">{text}</span>
    </Link>
  );
}
