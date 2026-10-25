import { SectionHeader } from "@/components/brand/primitives";
import {
  COMPARISON_CHECKED,
  COMPARISON_ROWS,
  COMPETITORS,
  PLANS,
  type ComparisonCell,
} from "@/content/site";
import { fadeUp, reveal } from "@/lib/motion";
import { motion } from "framer-motion";
import { Check, Minus, X } from "lucide-react";

// The cheapest paid plan is the fair one to compare: it is what somebody
// switching for price would actually buy.
const basic = PLANS.find((p) => p.id === "basic")!;
const BASIC_QUOTA = 150;

/** Rounded down — never round a saving claim upward. */
function cheaperBy(ours: number, theirs: number | null) {
  if (!theirs) return null;
  return Math.floor((1 - ours / theirs) * 100);
}

function money(n: number | null) {
  return n == null ? "" : `$${n}`;
}

function Mark({ cell }: { cell: ComparisonCell }) {
  if (cell.mark === null) return <span className="sr-only">Not known</span>;
  const icon =
    cell.mark === "yes" ? (
      <Check size={18} className="text-primary" aria-label="Yes" />
    ) : cell.mark === "partial" ? (
      <Minus size={18} className="text-accent" aria-label="Partly" />
    ) : (
      <X size={18} className="text-destructive/80" aria-label="No" />
    );
  return (
    <span className="inline-flex flex-col items-center gap-1">
      {icon}
      {cell.note && (
        <span className="text-[0.6875rem] leading-tight text-muted-foreground">
          {cell.note}
        </span>
      )}
    </span>
  );
}

export function Comparison() {
  const priceRows = [
    {
      label: "Price per month",
      ours: money(basic.monthly),
      theirs: COMPETITORS.map((c) => money(c.monthly)),
    },
    {
      label: "Price per year",
      ours: money(basic.annual),
      theirs: COMPETITORS.map((c) => money(c.annual)),
    },
    {
      label: "Speakband is cheaper, monthly",
      ours: "",
      theirs: COMPETITORS.map((c) => {
        const p = cheaperBy(basic.monthly, c.monthly);
        return p == null ? "" : `−${p}%`;
      }),
      highlight: true,
    },
    {
      label: "Speakband is cheaper, yearly",
      ours: "",
      theirs: COMPETITORS.map((c) => {
        const p = cheaperBy(basic.annual, c.annual);
        return p == null ? "" : `−${p}%`;
      }),
      highlight: true,
    },
  ];

  const perCheck = (basic.monthly / BASIC_QUOTA).toFixed(2);

  return (
    <section id="compare" className="section border-y border-border bg-secondary/25">
      <div className="container">
        <SectionHeader
          kicker="Compare"
          title={
            <>
              Built for the exam, <span className="brand-text">priced for practice</span>
            </>
          }
          body={`A band score on every IELTS criterion, seconds after you answer — for $${perCheck} a checked answer on Basic.`}
        />

        <motion.div
          {...reveal(0.05)}
          variants={fadeUp}
          className="overflow-x-auto rounded-2xl border border-border bg-card lift"
        >
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <caption className="sr-only">
              Speakband compared with ELSA Speak, Speak, Praktika and Cambly
            </caption>
            <thead>
              <tr className="border-b border-border">
                <th scope="col" className="sticky left-0 z-10 bg-card p-4 text-left font-semibold">
                  <span className="sr-only">Feature</span>
                </th>
                <th scope="col" className="bg-primary/8 p-4 text-center">
                  <span className="block text-base font-bold text-primary">Speakband</span>
                  <span className="block text-xs font-normal text-muted-foreground">
                    AI IELTS examiner
                  </span>
                </th>
                {COMPETITORS.map((c) => (
                  <th key={c.name} scope="col" className="p-4 text-center">
                    <span className="block font-semibold">{c.name}</span>
                    <span className="block text-xs font-normal text-muted-foreground">
                      {c.kind}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row) => (
                <tr key={row.label} className="border-b border-border/70">
                  <th
                    scope="row"
                    className="sticky left-0 z-10 bg-card p-4 text-left font-medium"
                  >
                    {row.label}
                  </th>
                  {row.cells.map((cell, i) => (
                    <td
                      key={i}
                      className={`p-4 text-center align-middle ${i === 0 ? "bg-primary/8" : ""}`}
                    >
                      <Mark cell={cell} />
                    </td>
                  ))}
                </tr>
              ))}
              {priceRows.map((row) => (
                <tr key={row.label} className="border-b border-border/70 last:border-b-0">
                  <th
                    scope="row"
                    className="sticky left-0 z-10 bg-card p-4 text-left font-medium"
                  >
                    {row.label}
                  </th>
                  <td className="bg-primary/8 p-4 text-center font-bold text-primary">
                    {row.ours}
                  </td>
                  {row.theirs.map((v, i) => (
                    <td
                      key={i}
                      className={`p-4 text-center ${
                        row.highlight ? "font-bold text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.p
          {...reveal()}
          variants={fadeUp}
          className="mx-auto mt-6 max-w-3xl text-center text-xs leading-relaxed text-muted-foreground"
        >
          Speakband prices are the Basic plan. Competitor prices are US
          prices as listed in public reviews of each service, checked{" "}
          {COMPARISON_CHECKED}; Cambly is two 30-minute lessons a week. Prices in
          your country may differ. An empty cell means we could not confirm it.
          All names are trademarks of their owners; Speakband is not affiliated
          with them.
        </motion.p>
      </div>
    </section>
  );
}
