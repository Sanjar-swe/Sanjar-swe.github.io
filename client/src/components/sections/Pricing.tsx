import { CTA, SectionHeader } from "@/components/brand/primitives";
import { BILLING_NOTE, PLANS, PRIMARY_CTA } from "@/content/site";
import { fadeUp, reveal, stagger } from "@/lib/motion";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export function Pricing() {
  return (
    <section id="pricing" className="section">
      <div className="container">
        <SectionHeader
          kicker="Pricing"
          title={
            <>
              Pay once, <span className="brand-text">not every month</span>
            </>
          }
          body="Pick how long you need before your exam. A pass is Pro for that many days with a fixed number of AI checks. Nothing renews, and unused checks stay on your account."
        />

        {/* Plans */}
        <motion.div
          {...reveal(0.05)}
          variants={stagger()}
          className="grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-4"
        >
          {PLANS.map((plan) => {
            const price = plan.price;
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
                    <span className="mb-1 text-sm text-muted-foreground">once</span>
                  )}
                </div>
                {/* Reserved line: keeps every card's price block the same height. */}
                <p className="min-h-4 text-xs text-muted-foreground">
                  {plan.days > 0 ? `${plan.days} days of Pro` : ""}
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
                  {plan.id === "free" ? "Start free" : `Get the ${plan.name}`}
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
