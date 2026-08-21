import { CTA, Pill, SectionHeader } from "@/components/brand/primitives";
import { LINKS, isEarlyAccess } from "@/content/site";
import { fadeUp, reveal, stagger } from "@/lib/motion";
import { motion } from "framer-motion";
import { ArrowRight, MessageSquare, Smartphone, Users } from "lucide-react";

/**
 * Replaces the testimonial section that used to sit here.
 *
 * Those testimonials were invented — named students, countries and exam
 * results for an app that has never been publicly released. Fabricated social
 * proof is a Play policy problem as much as a trust problem, so the honest
 * version of this slot is an invitation rather than a wall of reviews.
 *
 * Swap this section for real reviews once the app is public and there are
 * real ones to quote.
 */

const points = [
  {
    icon: Smartphone,
    title: "The real build, on your phone",
    body: "Not a waitlist or a demo video. You install the current release from Google Play and use it exactly as it will ship.",
  },
  {
    icon: MessageSquare,
    title: "Your feedback lands directly",
    body: "Testers report straight to the person who writes the code. Fixes go out in days, not in a quarterly roadmap.",
  },
  {
    icon: Users,
    title: "A small group, on purpose",
    body: "Closed testing keeps the group small enough that every report gets read and answered individually.",
  },
];

export function EarlyAccess() {
  if (!isEarlyAccess) return null;

  return (
    <section className="section border-y border-border bg-secondary/25">
      <div className="container">
        <SectionHeader
          kicker="Early access"
          title={
            <>
              We are looking for people{" "}
              <span className="brand-text">sitting the test</span>
            </>
          }
          body="Speakband is in closed testing on Google Play while we sand down the last edges before public release. If you are preparing for IELTS right now, you are exactly who we need."
        />

        <motion.div
          {...reveal()}
          variants={stagger()}
          className="mx-auto grid max-w-4xl gap-4 md:grid-cols-3"
        >
          {points.map(({ icon: Icon, title, body }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="rounded-2xl border border-border bg-card p-6 lift"
            >
              <span className="mb-4 grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
                <Icon size={18} aria-hidden="true" />
              </span>
              <h3 className="mb-2 text-[0.9375rem] font-semibold">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          {...reveal()}
          variants={stagger()}
          className="mx-auto mt-10 max-w-4xl rounded-2xl border border-primary/25 bg-primary-soft p-7 text-center sm:p-9"
        >
          <motion.div variants={fadeUp} className="mb-5 flex justify-center">
            <Pill className="bg-card/70">Free while in testing</Pill>
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="mx-auto mb-7 max-w-lg text-[0.9375rem] leading-relaxed text-muted-foreground"
          >
            Joining takes one tap and installs Speakband from Google Play like
            any other app. Leave whenever you like — nothing is charged during
            the testing period.
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <CTA href={LINKS.earlyAccess} external>
              Become a tester
              <ArrowRight
                size={17}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </CTA>
            <CTA href={`mailto:${LINKS.email}`} variant="ghost">
              Ask a question first
            </CTA>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
