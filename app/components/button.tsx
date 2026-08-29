import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type Variant = "primary" | "secondary";
type Size = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-3 rounded-full font-medium text-sm transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-emerald-500 text-zinc-950 hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/25",
  secondary:
    "border border-white/10 bg-white/5 text-zinc-200 hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-3.5",
  lg: "px-8 py-4",
};

function buttonClasses(variant: Variant, size: Size, className?: string) {
  return `${base} ${variants[variant]} ${sizes[size]} ${className ?? ""}`.trim();
}

type BaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={buttonClasses(variant, size, className)} {...props}>
      {children}
    </button>
  );
}

type ButtonLinkProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a className={buttonClasses(variant, size, className)} {...props}>
      {children}
    </a>
  );
}