/**
 * The Speakband mark: a five-bar equaliser with the centre bar in amber.
 *
 * Redrawn in SVG rather than shipped as a PNG so it inherits `currentColor`
 * for the outer bars and stays crisp at every size. Geometry matches the
 * Android launcher icon (docs/store-assets/play_icon_512.png) so the site and
 * the Play listing read as the same product.
 */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <g fill="currentColor">
        <rect x="2" y="20" width="7" height="8" rx="3.5" />
        <rect x="12" y="16" width="7" height="16" rx="3.5" />
        <rect x="29" y="16" width="7" height="16" rx="3.5" />
        <rect x="39" y="20" width="7" height="8" rx="3.5" />
      </g>
      <rect
        x="20.5"
        y="11"
        width="7"
        height="26"
        rx="3.5"
        fill="var(--accent)"
      />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
        <LogoMark className="h-5 w-5" />
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
