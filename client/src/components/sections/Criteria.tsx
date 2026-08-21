import { Card, SectionHeader } from "@/components/brand/primitives";
import { CRITERIA } from "@/content/site";
import { reveal, stagger } from "@/lib/motion";
import { motion } from "framer-motion";
import { AudioLines, BookText, Braces, Waves } from "lucide-react";

const icons = [Waves, BookText, Braces, AudioLines];

export function Criteria() {
  return (
    <section className="section border-y border-border bg-secondary/25">
      <div className="container">
        <SectionHeader
          kicker="How scoring works"
          title={
            <>
              The same four criteria the{" "}
              <span className="brand-text">examiner uses</span>
            </>
          }
          body="Three are graded from what you said. Pronunciation is graded from how you said it — which is why it needs your actual audio, not a transcript."
        />

        <motion.div
          {...reveal()}
          variants={stagger()}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {CRITERIA.map((c, i) => {
            const Icon = icons[i];
            return (
              <Card key={c.label} className="flex flex-col">
                <div className="mb-4 flex items-start justify-between gap-2">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
                    <Icon size={19} aria-hidden="true" />
                  </span>
                  {c.paidOnly && (
                    <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[0.6875rem] font-semibold text-accent-foreground dark:text-accent">
                      Paid plans
                    </span>
                  )}
                </div>
                <h3 className="mb-2 text-[0.9375rem] font-semibold leading-snug">
                  {c.label}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {c.blurb}
                </p>
              </Card>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
