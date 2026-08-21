import type { Transition, Variants } from "framer-motion";

/**
 * One motion vocabulary for the whole page.
 *
 * Design constraints this encodes, from the brief ("smooth, professional, and
 * it must not make anyone dizzy"):
 *
 *  - Entrances only. Content animates in once and then stays put. Nothing
 *    re-animates on scroll-back, so scrolling up never triggers a second show.
 *  - Short travel. 14px, not 60px. Long slides are what read as "jumpy" once
 *    a visitor scrolls at their own pace instead of the designer's.
 *  - No parallax, no scroll-linked transforms, no infinite loops in the
 *    background. Those are the three reliable sources of motion sickness.
 *  - One easing curve everywhere, so the page feels like a single object.
 *
 * `prefers-reduced-motion` is handled twice over: CSS in index.css neutralises
 * durations globally, and `useReveal` below drops the transforms entirely so
 * reduced-motion users get a plain, immediately-complete page.
 */

/** Gentle deceleration — fast at the start, long settle. Used by everything. */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const DURATION = {
  fast: 0.18,
  base: 0.42,
  slow: 0.6,
} as const;

export const transition: Transition = {
  duration: DURATION.base,
  ease: EASE,
};

/** Springs for hover/press. Damped hard enough never to overshoot visibly. */
export const spring: Transition = {
  type: "spring",
  stiffness: 320,
  damping: 30,
  mass: 0.7,
};

/** A single element fading up into place. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition },
};

/** Same, without the travel — for elements where any shift would jar. */
export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition },
};

/**
 * Parent of a group of `fadeUp` children. The stagger is 60ms: enough to read
 * as a sequence, short enough that a six-card grid finishes in under half a
 * second rather than making the visitor wait on the last card.
 */
export const stagger = (delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren },
  },
});

/**
 * Standard scroll-reveal props. Spread onto any motion element:
 *
 *   <motion.div {...reveal()} variants={stagger()}>
 *
 * `once: true` is the important half — it is what stops the page from
 * re-animating every time the visitor scrolls back over a section.
 */
export const reveal = (amount: number = 0.15) =>
  ({
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, amount },
  }) as const;
