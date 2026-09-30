import type { AnchorHTMLAttributes, ReactNode } from "react";

type ProjectActionLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

export default function ProjectActionLink({
  href,
  children,
  className = "",
  ...props
}: ProjectActionLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative z-20 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-accent-wash border border-accent-wash-border text-accent-strong text-xs font-medium hover:bg-accent-wash-strong transition-colors ${className}`.trim()}
      {...props}
    >
      {children}
    </a>
  );
}
