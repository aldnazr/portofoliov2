import { HTMLAttributes } from "react";
import { LuChevronDown, LuChevronRight } from "react-icons/lu";

type ArrowDirection = "left" | "right" | "up" | "down";

interface ArrowIconGlassProps extends HTMLAttributes<HTMLSpanElement> {
  direction?: ArrowDirection;
}

const rotation = {
  down: <LuChevronDown />,
  up: <LuChevronRight className="-rotate-90" />,
  right: <LuChevronRight />,
  left: <LuChevronRight className="rotate-180" />,
};

export default function ArrowIconGlass({
  direction = "down",
  className = "",
  ...props
}: ArrowIconGlassProps) {
  // Ring 1px dikerjakan .glass-icon::before di globals.css (token --glass-edge / --glass-peak).
  // CSS tanpa @layer menang atas utility Tailwind, jadi before:* di sini tidak akan pernah terpakai.
  return (
    <span
      aria-hidden="true"
      className={`
        glass-icon relative z-10
        flex size-6 shrink-0
        items-center justify-center
        rounded-lg
        bg-overlay
        text-foreground
        shadow-[inset_0_1px_0_var(--glass-highlight)]
        backdrop-blur-sm
        transition-colors duration-200

        ${className}
      `}
      {...props}
    >
      {rotation[direction]}
    </span>
  );
}
