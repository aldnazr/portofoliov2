import type { SVGProps } from "react";

export function GithubIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 192 192"
      fill="none"
      stroke="currentColor"
      className={className ?? "size-5 shrink-0"}
      aria-hidden="true"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={12}
        d="M120.755 170c.03-4.669.059-20.874.059-27.29 0-9.272-3.167-15.339-6.719-18.41 22.051-2.464 45.201-10.863 45.201-49.067 0-10.855-3.824-19.735-10.175-26.683 1.017-2.516 4.413-12.63-.987-26.32 0 0-8.296-2.672-27.202 10.204-7.912-2.213-16.371-3.308-24.784-3.352-8.414.044-16.872 1.14-24.785 3.352C52.457 19.558 44.162 22.23 44.162 22.23c-5.4 13.69-2.004 23.804-.987 26.32C36.824 55.498 33 64.378 33 75.233c0 38.204 23.149 46.603 45.2 49.067-3.551 3.071-6.719 9.138-6.719 18.41 0 6.416.03 22.621.059 27.29M27 130c9.939.703 15.67 9.735 15.67 9.735 8.834 15.199 23.178 10.803 28.815 8.265"
      />
    </svg>
  );
}

export function LinkedinIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 192 192"
      fill="none"
      stroke="currentColor"
      className={className ?? "size-5 shrink-0"}
      aria-hidden="true"
      {...props}
    >
      <rect width="132" height="132" x="30" y="30" strokeWidth={12} rx="16" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={12}
        d="M66 86v44"
      />
      <circle cx="66" cy="64" r="8" fill="currentColor" />
      <path
        strokeLinecap="round"
        strokeWidth={12}
        d="M126 130v-26c0-9.941-8.059-18-18-18v0c-9.941 0-18 8.059-18 18v26"
      />
    </svg>
  );
}

const ARROW_PATH = {
  left: "M5 12H19M5 12L11 6M5 12L11 18",
  right: "M5 12H19M19 12L13 6M19 12L13 18",
  down: "M12 5V19M12 19L6 13M12 19L18 13",
  upright: "M7 17L17 7M17 7H8M17 7V16",
} as const;

export function ArrowIcon({
  direction = "left",
  className,
  ...props
}: SVGProps<SVGSVGElement> & { direction?: keyof typeof ARROW_PATH }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? "size-4.5"}
      aria-hidden="true"
      {...props}
    >
      <path d={ARROW_PATH[direction]} />
    </svg>
  );
}

export function PlayStoreIcon({
  className,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={className ?? "size-5 shrink-0"}
      viewBox="0 0 48 48"
      fill="none"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="m25.0274,24.0519l-16.2624,15.8333h0c.5191,1.765,2.1803,3.1148,4.153,3.1148.8306,0,1.5574-.2077,2.1803-.6229h0l18.1694-10.2787-8.2403-8.0464Z" />
      <path d="m40.9508,20.2623h0l-7.7869-4.4645-8.1365,8.2541,8.2403,8.0464,7.7869-4.3607c1.3497-.7268,2.2842-2.1803,2.2842-3.7377-.1038-1.5574-1.0383-3.0109-2.388-3.7377Z" />
      <path d="m8.765,8.1148c-.1038.3115-.1038.7268-.1038,1.1421v29.5902c0,.4153,0,.7268.1038,1.1421l16.2624-15.9372L8.765,8.1148Z" />
      <path d="m25.0274,24.0519l8.1365-8.2541L15.2022,5.623c-.623-.4153-1.4536-.623-2.2842-.623-1.9727,0-3.7377,1.3497-4.153,3.1148h0l16.2624,15.9372Z" />
    </svg>
  );
}

export function BrowserIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 192 192"
      fill="none"
      stroke="currentColor"
      className={className ?? "size-5 shrink-0"}
      aria-hidden="true"
      {...props}
    >
      <circle cx="96" cy="96" r="74" strokeWidth={12} />
      <ellipse cx="96" cy="96" rx="30" ry="74" strokeWidth={12} />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={12}
        d="M28 72h136M28 120h136"
      />
    </svg>
  );
}

export function IconCarousel({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className ?? "size-5 shrink-0"}
      {...props}
    >
      <path d="M4 19h2c0 1.103.897 2 2 2h8c1.103 0 2-.897 2-2h2c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2h-2c0-1.103-.897-2-2-2H8c-1.103 0-2 .897-2 2H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2zM20 7v10h-2V7h2zM8 5h8l.001 14H8V5zM4 7h2v10H4V7z" />
    </svg>
  );
}

export function IconList({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className ?? "size-5 shrink-0"}
      {...props}
    >
      <path d="M4 6h2v2H4zm0 5h2v2H4zm0 5h2v2H4zm16-8V6H8.023v2H18.8zM8 11h12v2H8zm0 5h12v2H8z" />
    </svg>
  );
}
