export default function BackgroundMesh() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_55%_at_90%_5%,var(--accent-wash-strong),transparent_75%)]" />
      {/* <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_50%_at_0%_90%,var(--accent-wash),transparent_20%)]" /> */}
      <svg
        className="absolute -right-64 -top-48 h-200 w-225 max-w-none opacity-70 mask-[linear-gradient(to_bottom,black_30%,transparent_95%)] sm:-right-32"
        viewBox="0 0 900 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M176 -80C126 151 221 245 414 329C608 414 711 510 751 800"
          stroke="var(--hairline)"
        />
        <path
          d="M316 -80C262 134 337 232 498 310C677 397 793 528 813 800"
          stroke="var(--hairline)"
        />
        <path
          d="M456 -80C404 133 457 211 579 292C755 409 844 548 874 800"
          stroke="var(--accent-wash-border)"
        />
      </svg>
    </div>
  );
}
