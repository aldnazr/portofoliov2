import Link from "next/link";
import Reveal from "@/components/reveal";
import { ArrowIcon } from "@/components/svg-icons/icons";

type NextTopicLinkProps = {
  href: string;
  title: string;
};

/** CTA "Topik Berikutnya" di bawah konten materi. */
export default function NextTopicLink({ href, title }: NextTopicLinkProps) {
  return (
    <Reveal className="mt-14 sm:mt-32">
      <div className="border-t border-hairline-soft pt-8 sm:pt-14">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-subtle">
          Topik Berikutnya
        </p>
        <Link
          href={href}
          className="group mt-5 flex items-center justify-between gap-6"
        >
          <span className="text-2xl sm:text-4xl font-semibold tracking-tight text-subtle transition-[color,translate] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2 group-hover:text-foreground">
            {title}
          </span>
          <span
            aria-hidden="true"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-hairline text-subtle transition-[color,border-color,translate] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:border-accent-wash-border group-hover:text-accent-hover group-hover:translate-x-1"
          >
            <ArrowIcon direction="right" />
          </span>
        </Link>
      </div>
    </Reveal>
  );
}
