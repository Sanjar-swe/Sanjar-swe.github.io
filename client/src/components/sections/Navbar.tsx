import { Wordmark } from "@/components/brand/Logo";
import { CTA } from "@/components/brand/primitives";
import { PRIMARY_CTA } from "@/content/site";
import { useTheme } from "@/contexts/ThemeContext";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Inside the app", href: "#inside" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  // A boolean rather than a scroll-linked opacity: the bar has exactly two
  // states, so it crosses between them once instead of tracking scroll
  // position continuously the whole way down the page.
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  // The mobile sheet covers the viewport, so the page behind it must not
  // scroll underneath it.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`absolute inset-0 transition-all duration-300 ${
          scrolled
            ? "border-b border-border bg-background/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      />

      <div className="container relative">
        <nav className="flex items-center justify-between py-3.5">
          <a href="#top" className="text-foreground no-underline" aria-label="Speakband — home">
            <Wordmark />
          </a>

          <div className="hidden items-center gap-7 lg:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground no-underline transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            <CTA href={PRIMARY_CTA.href} size="md" external className="hidden sm:inline-flex">
              {PRIMARY_CTA.label}
            </CTA>

            <button
              onClick={() => setOpen((v) => !v)}
              className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 z-40 border-t border-border bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <div className="container flex flex-col gap-1 py-6">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3.5 text-base font-medium text-foreground no-underline transition-colors hover:bg-secondary"
                >
                  {link.label}
                </a>
              ))}
              <CTA href={PRIMARY_CTA.href} external className="mt-4 w-full">
                {PRIMARY_CTA.label}
              </CTA>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
