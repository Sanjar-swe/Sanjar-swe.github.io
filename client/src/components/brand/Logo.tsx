/**
 * The Speakband mark: an S monogram cut from the arcs of four circles.
 *
 * Redrawn in SVG rather than shipped as a PNG so it inherits `currentColor`
 * and stays crisp at every size. The path is the same one the Android launcher
 * icon and the Play listing use, so the site and the store read as one product;
 * the construction (radii 23.5 / 44.5 / 65.5, a Fibonacci run) lives in the
 * app repo's docs/brand/brand-guide.md.
 *
 * The viewBox is the mark's own bounding box — 131 x 199, taller than wide —
 * so a square slot fits it by height and centres it, which is what the safe
 * zone of the launcher icon does too.
 */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="54.5 15.5 131 199"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M 156.45 85.53 A 44.5 44.5 0 1 0 120 104.5 A 44.5 44.5 0 1 1 83.55 174.53 L 66.34 186.57 A 65.5 65.5 0 1 0 120 83.5 A 23.5 23.5 0 1 1 139.25 73.48 Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
        <LogoMark className="h-[22px]" />
      </span>
      <span
        className="text-[1.0625rem] font-bold tracking-tight"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Speakband
      </span>
    </span>
  );
}
