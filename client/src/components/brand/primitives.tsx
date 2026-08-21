import { fadeUp, reveal, spring, stagger } from "@/lib/motion";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Shared building blocks. These exist so that every section shares one set of
 * spacing, radii and hover behaviours — the thing that separates a page that
 * looks designed from a page that looks assembled.
 */

/* ───────────────────────────── Buttons ───────────────────────────── */

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  size?: "md" | "lg";
  external?: boolean;
  className?: string;
};

export function CTA({
  href,
  children,
  variant = "primary",
  size = "lg",
  external = false,
  className = "",
}: ButtonProps) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-xl font-semibold no-underline transition-colors duration-200 whitespace-nowrap";

  const sizes = {
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3.5 text-[0.9375rem]",
  };

  const variants = {
    primary:
      "glow bg-primary text-primary-foreground hover:bg-[color-mix(in_oklch,var(--primary)_88%,black)]",
    ghost:
      "border border-border bg-card/60 text-foreground hover:bg-secondary hover:border-[color-mix(in_oklch,var(--primary)_35%,var(--border))]",
  };

  return (
    <motion.a
      href={href}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      // Press feedback only. Hover lift is left to cards — buttons that grow
      // on hover shift the elements around them, which reads as instability.
      whileTap={{ scale: 0.98 }}
      transition={spring}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {children}
    </motion.a>
  );
}

/* ───────────────────────────── Section header ───────────────────────────── */

export function SectionHeader({
  kicker,
  title,
  body,
  align = "center",
}: {
  kicker: string;
  title: ReactNode;
  body?: ReactNode;
  align?: "center" | "left";
}) {
  const alignment =
    align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl";

  return (
    <motion.div
      {...reveal()}
      variants={stagger()}
      className={`mb-14 ${alignment}`}
    >
      <motion.p variants={fadeUp} className="kicker mb-4">
        {kicker}
      </motion.p>
      <motion.h2
        variants={fadeUp}
        className="text-[clamp(1.875rem,4.2vw,2.875rem)]"
      >
        {title}
      </motion.h2>
      {body && (
        <motion.p
          variants={fadeUp}
          className="mt-5 text-[1.0625rem] text-muted-foreground"
        >
          {body}
        </motion.p>
      )}
    </motion.div>
  );
}

/* ───────────────────────────── Pill ───────────────────────────── */

export function Pill({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary-soft px-3.5 py-1.5 text-[0.8125rem] font-semibold text-primary ${className}`}
    >
      {children}
    </span>
  );
}

/* ───────────────────────────── Card ───────────────────────────── */

/**
 * The hover lift is 3px and spring-damped. Cards are the only elements on the
 * page that move on hover, which keeps the interaction legible.
 */
export function Card({
  children,
  className = "",
  interactive = true,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={interactive ? { y: -3 } : undefined}
      transition={spring}
      className={`rounded-2xl border border-border bg-card p-6 lift ${className}`}
    >
      {children}
    </motion.div>
  );
}
