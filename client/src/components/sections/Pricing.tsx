import { CTA, SectionHeader } from "@/components/brand/primitives";
import { BILLING_NOTE, PLANS, PRIMARY_CTA, type Plan } from "@/content/site";
import { fadeUp, reveal, stagger } from "@/lib/motion";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";

type Cycle = "monthly" | "annual";

/** Annual saving, rounded down — never round a discount claim upward. */
function savingPercent(plan: Plan) {
  if (!plan.monthly || !plan.annual) return 0;
  return Math.floor((1 - plan.annual / (plan.monthly * 12)) * 100);
}

export function Pricing() {
  const [cycle, setCycle] = useState<Cycle>("monthly");
  const annual = cycle === "annual";

  // Advertise the smallest real saving across the paid tiers, so the badge is
  // true for every plan rather than only the best one.
  const headlineSaving = Math.min(
    ...PLANS.filter((p) => p.monthly > 0).map(savingPercent)
  );

  return (
    <section id="pricing" className="section">
      <div className="container">
        <SectionHeader
          kicker="Pricing"
          title={
            <>
              Pay for checks, <span className="brand-text">not for a calendar</span>
            </>
          }
          body="Every paid plan is a pool of AI checks per month. Nothing expires overnight — use six in one sitting and none the next day."
        />

        {/* Billing cycle */}
        <motion.div {...reveal()} variants={stagger()} className="mb-12 flex justify-center">
          <motion.div
            variants={fadeUp}
            role="group"
            aria-label="Billing cycle"
            className="inline-flex items-center rounded-xl border border-border bg-secondary/40 p-1"
          >
            {(["monthly", "annual"] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCycle(c)}
                aria-pressed={cycle === c}
                className={`relative rounded-lg px-5 py-2 text-sm font-semibold transition-colors duration-200 ${
                  cycle === c
                    ? "bg-card text-foreground lift"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {c === "monthly" ? "Monthly" : "Annual"}
                {c === "annual" && (
                  <span className="ml-2 rounded-full bg-primary px-1.5 py-0.5 text-[0.625rem] font-bold text-primary-foreground">
                    −{headlineSaving}%
                  </span>
                )}
              </button>
            ))}
          </motion.div>
        </motion.div>

        {/* Plans */}
        <motion.div
          {...reveal(0.05)}
          variants={stagger()}
          className="grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-4"
        >
          {PLANS.map((plan) => {
            const price = annual ? plan.annual : plan.monthly;
            const perMonth = annual && plan.annual ? (plan.annual / 12).toFixed(2) : null;

            return (
              <motion.div
                key={plan.id}
                variants={fadeUp}
                className={`relative flex flex-col rounded-2xl border p-6 ${
                  plan.highlighted
                    ? "border-primary/45 bg-card lift-lg xl:-my-2 xl:py-8"
                    : "border-border bg-card lift"
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-3.5 py-1 text-[0.6875rem] font-bold uppercase tracking-wide text-primary-foreground">
                    {plan.badge}
                  </span>
                )}

                <h3 className="text-lg">{plan.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{plan.model}</p>

                <div className="mt-5 mb-1 flex items-end gap-1.5">
                  <span
                    className="text-[2.5rem] font-bold leading-none"
                    style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.04em" }}
                  >
                    {price === 0 ? "Free" : `$${price}`}
                  </span>
                  {price > 0 && (
                    <span className="mb-1 text-sm text-muted-foreground">
                      /{annual ? "year" : "month"}
                    </span>
                  )}
                </div>
                {/* Reserved line: keeps every card's price block the same height */}
                <p className="min-h-4 text-xs text-muted-foreground">
                  {perMonth ? `$${perMonth} per month, billed yearly` : ""}
                </p>

                <div className="mt-5 rounded-xl bg-secondary/60 px-3.5 py-3">
                  <p className="text-sm font-bold text-primary">{plan.quota}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{plan.quotaNote}</p>
                </div>

                <ul className="mt-6 mb-7 flex-1 space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[0.8125rem]">
                      <Check size={14} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
                      <span className="leading-relaxed text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>

                <CTA
                  href={PRIMARY_CTA.href}
                  external
                  size="md"
                  variant={plan.highlighted ? "primary" : "ghost"}
                  className="w-full"
                >
                  {plan.id === "free" ? "Start free" : `Choose ${plan.name}`}
                </CTA>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.p
          {...reveal()}
          variants={fadeUp}
          className="mx-auto mt-10 max-w-2xl text-center text-[0.8125rem] leading-relaxed text-muted-foreground"
        >
          {BILLING_NOTE}
        </motion.p>
      </div>
    </section>
  );
}
