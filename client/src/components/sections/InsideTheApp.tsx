import { SectionHeader } from "@/components/brand/primitives";
import { SCREENS } from "@/content/site";
import { fadeUp, reveal, stagger } from "@/lib/motion";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

/**
 * Real captures from the release build, not illustrations.
 *
 * The switcher is click-driven rather than auto-advancing on a timer. An
 * auto-rotating carousel moves content out from under a reader mid-sentence,
 * which is exactly the "makes your head spin" failure the brief ruled out.
 */
export function InsideTheApp() {
  const [active, setActive] = useState(0);
  const screen = SCREENS[active];

  return (
    <section id="inside" className="section">
      <div className="container">
        <SectionHeader
          kicker="Inside the app"
          title={
            <>
              Not a mockup — this is the{" "}
              <span className="brand-text">shipping build</span>
            </>
          }
          body="Four screens that cover the whole loop: answer, score, model answer, trend."
        />

        <motion.div
          {...reveal(0.1)}
          variants={stagger()}
          className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"
        >
          {/* ── Selector ── */}
          <motion.ul variants={fadeUp} className="order-2 space-y-2 lg:order-1">
            {SCREENS.map((s, i) => {
              const isActive = i === active;
              return (
                <li key={s.src}>
                  <button
                    onClick={() => setActive(i)}
                    aria-current={isActive}
                    className={`w-full rounded-2xl border p-5 text-left transition-colors duration-200 ${
                      isActive
                        ? "border-primary/35 bg-primary-soft"
                        : "border-transparent hover:border-border hover:bg-secondary/50"
                    }`}
                  >
                    <span className="mb-1.5 flex items-center gap-2.5">
                      <span
                        className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-[0.6875rem] font-bold transition-colors ${
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        {i + 1}
                      </span>
                      <span
                        className={`text-[0.9375rem] font-semibold ${
                          isActive ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {s.caption}
                      </span>
                    </span>
                    <span className="block pl-[2.125rem] text-sm leading-relaxed text-muted-foreground">
                      {s.body}
                    </span>
                  </button>
                </li>
              );
            })}
          </motion.ul>

          {/* ── Device ── */}
          <motion.div
            variants={fadeUp}
            className="order-1 mx-auto w-full max-w-[290px] lg:order-2 lg:max-w-[320px]"
          >
            {/* Fixed aspect box so switching screens never reflows the page */}
            <div className="device lift-lg relative" style={{ aspectRatio: "540 / 1113" }}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={screen.src}
                  src={screen.src}
                  alt={screen.alt}
                  width={540}
                  height={1113}
                  loading="lazy"
                  decoding="async"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  className="absolute inset-2 !h-[calc(100%-1rem)] !w-[calc(100%-1rem)] object-cover"
                />
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
