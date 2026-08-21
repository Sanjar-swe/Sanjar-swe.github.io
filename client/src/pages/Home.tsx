import { Criteria } from "@/components/sections/Criteria";
import { DemoWidget } from "@/components/sections/DemoWidget";
import { EarlyAccess } from "@/components/sections/EarlyAccess";
import { FAQ } from "@/components/sections/FAQ";
import { Features } from "@/components/sections/Features";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { InsideTheApp } from "@/components/sections/InsideTheApp";
import { Navbar } from "@/components/sections/Navbar";
import { Pricing } from "@/components/sections/Pricing";

/**
 * Section order follows one argument, in order:
 *
 *   Hero          what it does
 *   Criteria      what "scored" means here
 *   Features      what you get for that
 *   HowItWorks    what using it costs you in effort
 *   InsideTheApp  proof it exists — real screenshots
 *   DemoWidget    proof the feedback is worth reading
 *   Pricing       what it costs in money
 *   EarlyAccess   the ask
 *   FAQ           the objections
 *   FinalCTA      the ask again
 *
 * Alternating plain and tinted section backgrounds give the page a rhythm
 * without any per-section decoration.
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <a
        href="#main"
        className="sr-only rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main">
        <Hero />
        <Criteria />
        <Features />
        <HowItWorks />
        <InsideTheApp />
        <DemoWidget />
        <Pricing />
        <EarlyAccess />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}
