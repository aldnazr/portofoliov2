import { HTMLAttributes } from "react";

type ArrowDirection = "left" | "right" | "up" | "down";

interface ArrowIconGlassProps extends HTMLAttributes<HTMLSpanElement> {
  direction?: ArrowDirection;
}

const rotation: Record<ArrowDirection, string> = {
  down: "rotate-0",
  up: "rotate-180",
  left: "-rotate-90",
  right: "rotate-90",
};

export default function ArrowIconGlass({
  direction = "down",
  className = "",
  ...props
}: ArrowIconGlassProps) {
  return (
    <span
      aria-hidden="true"
      className={`
        glass-icon relative z-10
        flex size-6 shrink-0
        items-center justify-center
        rounded-lg
        border border-white/10
        bg-white/5
        text-neutral-100
        shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]
        backdrop-blur-sm
        transition-colors duration-200
        ${className}
      `}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`
          size-[70%]
          transition-transform duration-200
          ${rotation[direction]}
        `}
      >
        <path d="M12 5v14" />
        <path d="m19 12-7 7-7-7" />
      </svg>
    </span>
  );
}
