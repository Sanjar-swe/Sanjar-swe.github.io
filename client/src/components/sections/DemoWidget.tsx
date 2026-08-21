import { SectionHeader } from "@/components/brand/primitives";
import { fadeUp, reveal, stagger } from "@/lib/motion";
import { motion } from "framer-motion";
import { Lightbulb, Volume2 } from "lucide-react";

/**
 * A worked example of one evaluation.
 *
 * Shape mirrors the real response: three criteria scored from the transcript,
 * pronunciation scored separately from the audio on paid plans, then a single
 * prioritised fix. Feedback is in English — the app dropped Russian on
 * 2026-07-15.
 */
const OVERALL = 7.0;

const breakdown = [
  {
    label: "Fluency & Coherence",
    score: 7.0,
    note: "You keep going without long pauses and your ideas follow each other cleanly. The hesitation shows up when you reach for an example, not when you run out of language.",
  },
  {
    label: "Lexical Resource",
    score: 6.5,
    note: "Accurate but safe. \"Good\", \"important\" and \"a lot of\" carry too much of the answer — this is the criterion holding your overall band down.",
  },
  {
    label: "Grammatical Range & Accuracy",
    score: 7.5,
    note: "A real mix of structures, including two conditionals used naturally. The article slips are minor and never obscure your meaning.",
  },
  {
    label: "Pronunciation",
    score: 7.0,
    note: "Clear and easy to follow throughout. Word stress on longer words is where an examiner would still hear effort.",
    paidOnly: true,
  },
];

function scoreTone(score: number) {
  if (score >= 7.5) return "text-primary";
  if (score >= 6.5) return "text-foreground";
  return "text-muted-foreground";
}

export function DemoWidget() {
  return (
    <section className="section border-y border-border bg-secondary/25">
      <div className="container">
        <SectionHeader
          kicker="A worked example"
          title={
            <>
              What one evaluation{" "}
              <span className="brand-text">actually tells you</span>
            </>
          }
          body="Not a grade with no explanation attached. A number per criterion, the reason behind it, and one thing to change next time."
        />

        <motion.div {...reveal(0.1)} variants={stagger()} className="mx-auto max-w-3xl">
          <motion.article
            variants={fadeUp}
            className="overflow-hidden rounded-3xl border border-border bg-card lift-lg"
          >
            {/* Question + overall */}
            <header className="flex items-start justify-between gap-6 border-b border-border bg-secondary/40 px-6 py-6 sm:px-8">
              <div>
                <p className="mb-2 text-[0.6875rem] font-semibold uppercase tracking-widest text-muted-foreground">
                  Part 2 · Cue card
                </p>
                <p className="text-[0.9375rem] font-medium leading-snug">
                  “Describe a habit you have that you think is good. Explain why
                  you started it and how it affects your life.”
                </p>
              </div>
              <div className="shrink-0 text-right">
                <div
                  className="text-[2.75rem] font-bold leading-none text-accent"
                  style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.04em" }}
                >
                  {OVERALL.toFixed(1)}
                </div>
                <div className="mt-1 text-[0.6875rem] uppercase tracking-wider text-muted-foreground">
                  Band estimate
                </div>
              </div>
            </header>

            {/* Criteria */}
            <div className="divide-y divide-border">
              {breakdown.map(({ label, score, note, paidOnly }) => (
                <div key={label} className="px-6 py-5 sm:px-8">
                  <div className="mb-2.5 flex items-center justify-between gap-4">
                    <span className="flex items-center gap-2 text-sm font-semibold">
                      {label}
                      {paidOnly && (
                        <span className="rounded-full bg-secondary px-2 py-0.5 text-[0.625rem] font-medium uppercase tracking-wide text-muted-foreground">
                          from audio
                        </span>
                      )}
                    </span>
                    <span className={`text-sm font-bold tabular-nums ${scoreTone(score)}`}>
                      {score.toFixed(1)}
                    </span>
                  </div>

                  <div
                    className="mb-3 h-1.5 overflow-hidden rounded-full bg-secondary"
                    role="img"
                    aria-label={`${label}: band ${score.toFixed(1)} out of 9`}
                  >
                    <motion.div
                      className="h-full rounded-full bg-primary"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(score / 9) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>

                  <p className="text-[0.8125rem] leading-relaxed text-muted-foreground">
                    {note}
                  </p>
                </div>
              ))}
            </div>

            {/* The single prioritised fix */}
            <footer className="border-t border-border bg-primary-soft px-6 py-6 sm:px-8">
              <p className="mb-2.5 flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-widest text-primary">
                <Lightbulb size={13} aria-hidden="true" />
                Key improvement
              </p>
              <p className="text-[0.9375rem] leading-relaxed">
                Replace three general adjectives with precise ones. “It has a
                good effect on my life” becomes “it has made me noticeably more
                disciplined” — same idea, and the band moves on Lexical Resource
                alone.
              </p>
              <p className="mt-4 flex items-center gap-2 text-[0.8125rem] text-muted-foreground">
                <Volume2 size={14} className="shrink-0" aria-hidden="true" />
                Premium reads the band 8 version aloud so you can hear the
                rhythm, not just read it.
              </p>
            </footer>
          </motion.article>

          <motion.p
            variants={fadeUp}
            className="mt-6 text-center text-[0.8125rem] text-muted-foreground"
          >
            Illustrative example. Scores are AI estimates for practice, not
            official IELTS results.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
