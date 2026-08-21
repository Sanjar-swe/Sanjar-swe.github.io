import { SectionHeader } from "@/components/brand/primitives";
import { FAQS, LINKS } from "@/content/site";
import { fadeUp, reveal, stagger } from "@/lib/motion";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useId, useState } from "react";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section id="faq" className="section">
      <div className="container max-w-3xl">
        <SectionHeader
          kicker="FAQ"
          title={
            <>
              The questions worth{" "}
              <span className="brand-text">a straight answer</span>
            </>
          }
        />

        <motion.div
          {...reveal()}
          variants={stagger()}
          className="overflow-hidden rounded-2xl border border-border bg-card lift"
        >
          {FAQS.map(({ q, a }, i) => {
            const isOpen = open === i;
            const panelId = `${baseId}-panel-${i}`;
            const buttonId = `${baseId}-button-${i}`;

            return (
              <motion.div
                key={q}
                variants={fadeUp}
                className={i > 0 ? "border-t border-border" : ""}
              >
                <h3>
                  <button
                    id={buttonId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left transition-colors duration-200 hover:bg-secondary/40"
                  >
                    <span className="text-[0.9375rem] font-semibold sm:text-base">
                      {q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-secondary text-muted-foreground"
                      aria-hidden="true"
                    >
                      <Plus size={15} />
                    </motion.span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      key="panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 pr-14 text-[0.875rem] leading-relaxed text-muted-foreground">
                        {a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.p
          {...reveal()}
          variants={fadeUp}
          className="mt-8 text-center text-sm text-muted-foreground"
        >
          Something not covered here?{" "}
          <a
            href={`mailto:${LINKS.email}`}
            className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-primary"
          >
            Write to us
          </a>{" "}
          — a person answers.
        </motion.p>
      </div>
    </section>
  );
}
