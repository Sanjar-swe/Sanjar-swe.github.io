import { Wordmark } from "@/components/brand/Logo";
import { BRAND, IELTS_DISCLAIMER, LINKS, PRIMARY_CTA } from "@/content/site";
import { Mail } from "lucide-react";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "How it works", href: "#how-it-works" },
      { label: "Inside the app", href: "#inside" },
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: LINKS.privacy, external: true },
      { label: "Terms of Service", href: LINKS.terms, external: true },
      { label: "Delete your account", href: LINKS.deleteAccount, external: true },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Wordmark />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              AI IELTS Speaking practice for Android. Band estimates and
              specific feedback on every answer.
            </p>
            <a
              href={`mailto:${LINKS.email}`}
              className="mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground no-underline transition-colors hover:text-foreground"
            >
              <Mail size={14} aria-hidden="true" />
              {LINKS.email}
            </a>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-[0.6875rem] font-semibold uppercase tracking-widest text-foreground">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground no-underline transition-colors hover:text-foreground"
                      {...("external" in link && link.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="mb-4 text-[0.6875rem] font-semibold uppercase tracking-widest text-foreground">
              Get the app
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={PRIMARY_CTA.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground no-underline transition-colors hover:text-foreground"
                >
                  {PRIMARY_CTA.label}
                </a>
              </li>
              <li className="text-sm text-muted-foreground">Android · iOS not yet</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="max-w-3xl text-xs leading-relaxed text-muted-foreground">
            {IELTS_DISCLAIMER}
          </p>
          <p className="mt-5 text-xs text-muted-foreground">
            © {year} {BRAND.name}. Evaluation by Claude (Anthropic).
          </p>
        </div>
      </div>
    </footer>
  );
}
