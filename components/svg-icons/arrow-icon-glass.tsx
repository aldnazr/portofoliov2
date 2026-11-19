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
  return (
    <span
      aria-hidden="true"
      className={`
        glass-icon relative z-10
        flex size-6 shrink-0
        items-center justify-center
        rounded-lg
        bg-white/5
        text-neutral-100
        shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]
        backdrop-blur-sm
        transition-colors duration-200
        before:pointer-events-none
        before:absolute
        before:inset-0
        before:content-['']
        before:rounded-[inherit]
        before:p-px
        before:bg-[linear-gradient(45deg,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0.06)_35%,rgba(255,255,255,0.06)_65%,rgba(255,255,255,0.35)_100%)]
        before:mask-[linear-gradient(#000_0_0),linear-gradient(#000_0_0)]
        before:[mask-clip:content-box,border-box]
        before:mask-exclude

        ${className}
      `}
      {...props}
    >
      {rotation[direction]}
    </span>
  );
}
