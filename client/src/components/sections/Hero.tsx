import { CTA, Pill } from "@/components/brand/primitives";
import { CRITERIA, LINKS, PRIMARY_CTA, isEarlyAccess } from "@/content/site";
import { fadeUp, stagger } from "@/lib/motion";
import { motion } from "framer-motion";
import { ArrowRight, Check, Sparkles } from "lucide-react";

/** Facts, not vanity metrics. Every one is verifiable from the app itself. */
const proof = [
  "All 4 IELTS Speaking criteria",
  "Parts 1, 2 and 3",
  "Speak it or type it",
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      {/* Ambient background. Static — no scroll-linked or looping motion. */}
      <div className="grid-bg absolute inset-0" aria-hidden="true" />
      <div
        className="halo left-[-10%] top-[-12%] h-[520px] w-[620px]"
        style={{ background: "var(--halo-a)" }}
        aria-hidden="true"
      />
      <div
        className="halo right-[-8%] top-[18%] h-[420px] w-[520px]"
        style={{ background: "var(--halo-b)" }}
        aria-hidden="true"
      />

      <div className="container relative">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger(0.05)}
          className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20"
        >
          {/* ── Copy ── */}
          <div className="text-center lg:text-left">
            <motion.div variants={fadeUp} className="mb-7 flex justify-center lg:justify-start">
              <Pill>
                <Sparkles size={13} aria-hidden="true" />
                {isEarlyAccess
                  ? "Early access on Google Play"
                  : "Available on Google Play"}
              </Pill>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mb-6 text-[clamp(2.5rem,6.2vw,4.25rem)]"
            >
              Speak an answer.
              <br />
              Get a <span className="brand-text">band estimate</span> in seconds.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mx-auto mb-9 max-w-xl text-[1.0625rem] leading-relaxed text-muted-foreground sm:text-lg lg:mx-0"
            >
              Speakband scores your IELTS Speaking answers on the criteria the
              exam actually uses — and tells you the specific thing to fix next.
              No booking, no waiting for a tutor's calendar.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mb-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
            >
              <CTA href={PRIMARY_CTA.href} external className="w-full sm:w-auto">
                {PRIMARY_CTA.label}
                <ArrowRight
                  size={17}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </CTA>
              <CTA href="#inside" variant="ghost" className="w-full sm:w-auto">
                See it in the app
              </CTA>
            </motion.div>

            <motion.ul
              variants={fadeUp}
              className="flex flex-wrap justify-center gap-x-5 gap-y-2 lg:justify-start"
            >
              {proof.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-1.5 text-[0.8125rem] text-muted-foreground"
                >
                  <Check size={13} className="text-primary" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </motion.ul>

            {isEarlyAccess && (
              <motion.p
                variants={fadeUp}
                className="mt-6 text-[0.8125rem] leading-relaxed text-muted-foreground"
              >
                Speakband is in closed testing on Google Play. Joining takes one
                tap and puts the current build on your phone —{" "}
                <a
                  href={LINKS.email ? `mailto:${LINKS.email}` : "#"}
                  className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-primary"
                >
                  tell us what breaks
                </a>
                .
              </motion.p>
            )}
          </div>

          {/* ── Device ── */}
          <motion.div variants={fadeUp} className="relative mx-auto w-full max-w-[300px] lg:max-w-[330px]">
            <div className="device lift-lg">
              <img
                src="/app/03_result.webp"
                width={540}
                height={1113}
                alt="Speakband showing a band 7.5 estimate with written feedback on a Part 2 answer"
                /* Above the fold on every viewport. index.html preloads it so
                   the fetch starts before React mounts. */
                loading="eager"
                decoding="async"
              />
            </div>

            {/* Criteria chip. Anchored to the frame, entering after it. */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="glass absolute -bottom-6 -left-4 rounded-2xl p-3.5 lift sm:-left-10"
              aria-hidden="true"
            >
              <p className="mb-2 text-[0.625rem] font-semibold uppercase tracking-widest text-muted-foreground">
                Scored on
              </p>
              <ul className="space-y-1.5">
                {CRITERIA.map((c) => (
                  <li key={c.short} className="flex items-center gap-2 text-xs font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {c.short}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
