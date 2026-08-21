import { Card, SectionHeader } from "@/components/brand/primitives";
import { FEATURES } from "@/content/site";
import { reveal, stagger } from "@/lib/motion";
import { motion } from "framer-motion";
import {
  Gauge,
  Lightbulb,
  Mic,
  Route,
  TrendingUp,
  Volume2,
  type LucideIcon,
} from "lucide-react";

/** Keeps icon choice out of the content file, which stays plain data. */
const icons: Record<string, LucideIcon> = {
  gauge: Gauge,
  mic: Mic,
  lightbulb: Lightbulb,
  volume: Volume2,
  route: Route,
  trend: TrendingUp,
};

export function Features() {
  return (
    <section id="features" className="section">
      <div className="container">
        <SectionHeader
          kicker="What you get"
          title={
            <>
              Built for the part of IELTS you{" "}
              <span className="brand-text">can't practise alone</span>
            </>
          }
          body="Reading and listening you can drill from a book. Speaking needs someone to tell you what went wrong — that is the whole job of this app."
        />

        <motion.div
          {...reveal()}
          variants={stagger()}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {FEATURES.map(({ icon, title, body }) => {
            const Icon = icons[icon];
            return (
              <Card key={title} className="flex flex-col">
                <span className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <h3 className="mb-2.5 text-[1.0625rem] font-semibold">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {body}
                </p>
              </Card>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
