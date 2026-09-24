import Link from "next/link";
import { profile } from "@/data/profile";
import { siteDescription, siteTitle } from "@/data/site";
import { experience } from "@/data/experience";
import FooterProjects from "@/components/footer-projects";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

const columns = [
  { title: "Proyek", node: <FooterProjects /> },
  {
    title: "Pengalaman",
    node: (
      <ul>
        {[...new Set(experience.map((entry) => entry.company))].map(
          (company) => (
            <li key={company}>
              <span className="block py-1 text-sm leading-relaxed text-muted">
                {company}
              </span>
            </li>
          ),
        )}
      </ul>
    ),
  },
  {
    title: "Learning Lab",
    node: (
      <ul>
        <li>
          <Link
            href="/learns"
            className="block py-1 text-sm leading-relaxed text-muted transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Eksplorasi topik
          </Link>
        </li>
        <li className="py-1 text-sm leading-relaxed text-subtle">
          Catatan &amp; eksperimen web, mobile, dan kode.
        </li>
      </ul>
    ),
  },
] as const;

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-hairline-soft bg-background/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-6 sm:pt-16 sm:pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
          {/* Kolom 1: identitas + social icon-only */}
          <div className="sm:col-span-2 md:col-span-1">
            <p className="text-xl font-semibold tracking-tight text-foreground">
              {siteTitle}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-snug text-muted">
              {siteDescription}
            </p>

            <ul className="mt-5 flex items-center gap-2 md:gap-2.5">
              {profile.socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
                  >
                    {link.label === "GitHub" && (
                      <GithubIcon className="size-5 shrink-0" />
                    )}
                    {link.label === "LinkedIn" && (
                      <LinkedinIcon className="size-5 shrink-0" />
                    )}
                    <span className="sr-only">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <p className="text-sm font-semibold leading-none text-foreground">
                {column.title}
              </p>
              <div className="mt-4">{column.node}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-hairline-soft pt-6 sm:mt-16 items-center justify-center flex">
          <p className="text-xs sm:text-sm text-center text-subtle">
            Copyright © {new Date().getFullYear()} {profile.name}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
