import { CTA } from "@/components/brand/primitives";
import { PLANS, PRIMARY_CTA, isEarlyAccess } from "@/content/site";
import { fadeUp, reveal, stagger } from "@/lib/motion";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  const free = PLANS.find((p) => p.id === "free");

  return (
    <section className="section relative overflow-hidden">
      <div className="grid-bg absolute inset-0" aria-hidden="true" />
      <div
        className="halo left-1/2 top-1/3 h-[460px] w-[760px] -translate-x-1/2"
        style={{ background: "var(--halo-a)" }}
        aria-hidden="true"
      />

      <div className="container relative">
        <motion.div {...reveal()} variants={stagger()} className="mx-auto max-w-2xl text-center">
          <motion.h2
            variants={fadeUp}
            className="mb-6 text-[clamp(2rem,5vw,3.25rem)]"
          >
            Your next answer could be the one that{" "}
            <span className="brand-text">tells you what to fix</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mb-10 max-w-lg text-[1.0625rem] text-muted-foreground"
          >
            {isEarlyAccess
              ? "Install the current build from Google Play, answer one question, and see what the feedback actually looks like."
              : `${free?.quotaNote ?? "Start with a free evaluation."} No card, no commitment.`}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <CTA href={PRIMARY_CTA.href} external className="w-full sm:w-auto">
              {PRIMARY_CTA.label}
              <ArrowRight
                size={17}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </CTA>
            <CTA href="#pricing" variant="ghost" className="w-full sm:w-auto">
              Compare plans
            </CTA>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
