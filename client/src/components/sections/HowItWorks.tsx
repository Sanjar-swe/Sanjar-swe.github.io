import { SectionHeader } from "@/components/brand/primitives";
import { STEPS } from "@/content/site";
import { fadeUp, reveal, stagger } from "@/lib/motion";
import { motion } from "framer-motion";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section border-y border-border bg-secondary/25">
      <div className="container">
        <SectionHeader
          kicker="How it works"
          title={
            <>
              Three steps, about{" "}
              <span className="brand-text">ninety seconds</span>
            </>
          }
        />

        <motion.ol
          {...reveal()}
          variants={stagger()}
          className="relative grid gap-10 md:grid-cols-3 md:gap-8"
        >
          {/* Connector. Sits behind the numbers and stops before the last one. */}
          <div
            className="absolute left-0 right-0 top-6 hidden h-px bg-border md:block"
            style={{ marginInline: "16.66%" }}
            aria-hidden="true"
          />

          {STEPS.map(({ title, body }, i) => (
            <motion.li
              key={title}
              variants={fadeUp}
              className="relative text-center md:text-left"
            >
              <span className="relative z-10 mb-6 inline-grid h-12 w-12 place-items-center rounded-full border border-border bg-card text-lg font-bold text-primary lift">
                {i + 1}
              </span>
              <h3 className="mb-2.5 text-xl">{title}</h3>
              <p className="mx-auto max-w-xs text-[0.9375rem] leading-relaxed text-muted-foreground md:mx-0 md:max-w-none">
                {body}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
