import {
  BRAND,
  CRITERIA,
  FAQS,
  FEATURES,
  LINKS,
  PLANS,
  SCREENS,
  isEarlyAccess,
} from "@/content/site";
import { useEffect } from "react";

/**
 * Emits schema.org JSON-LD, built from the same constants the page renders.
 *
 * The previous version of this page hand-wrote its structured data in
 * index.html, which is how it ended up advertising $3.99 and an "unlimited"
 * tier to Google long after both had been retired. Generating it from
 * `site.ts` makes that class of drift impossible: change a price once and the
 * markup follows.
 *
 * The build prerenders this page to static HTML, so the tag below is already
 * in the shipped document before any script runs — which is the only way the
 * AI crawlers that do not execute JavaScript will ever see it. On hydration
 * we would otherwise append a second identical copy, hence the id guard.
 */
const SCRIPT_ID = "speakband-jsonld";

export function StructuredData() {
  useEffect(() => {
    if (document.getElementById(SCRIPT_ID)) return;

    const graph = [
      {
        "@type": "SoftwareApplication",
        "@id": `${BRAND.origin}/#app`,
        name: BRAND.fullName,
        alternateName: BRAND.name,
        applicationCategory: "EducationalApplication",
        applicationSubCategory: "Language learning",
        operatingSystem: "Android 8.0 or later",
        url: BRAND.origin,
        installUrl: LINKS.playStore,
        downloadUrl: LINKS.playStore,
        datePublished: "2026-08-20",
        softwareVersion: "1.0.5",
        isAccessibleForFree: true,
        publisher: { "@id": `${BRAND.origin}/#org` },
        description:
          "AI-powered IELTS Speaking practice. Answers are scored on Fluency & Coherence, Lexical Resource, and Grammatical Range & Accuracy, with pronunciation assessed from recorded audio on paid plans. Band scores are AI estimates for practice, not official IELTS results.",
        featureList: FEATURES.map((f) => f.title),
        screenshot: SCREENS.map((s) => `${BRAND.origin}${s.src}`),
        inLanguage: "en",
        keywords: [
          "IELTS Speaking practice",
          "IELTS band score estimate",
          "AI IELTS examiner",
          "IELTS Part 2 cue card practice",
          "English speaking practice app",
        ].join(", "),
        offers: PLANS.map((plan) => ({
          "@type": "Offer",
          name: `${plan.name} plan`,
          price: plan.monthly.toFixed(2),
          priceCurrency: "USD",
          category: plan.monthly === 0 ? "free" : "subscription",
          description: `${plan.quota} — ${plan.quotaNote}`,
          // Closed testing is not general availability; saying otherwise in
          // structured data would be a false signal to the crawler.
          availability: isEarlyAccess
            ? "https://schema.org/PreOrder"
            : "https://schema.org/InStock",
        })),
      },
      {
        "@type": "WebSite",
        "@id": `${BRAND.origin}/#website`,
        url: BRAND.origin,
        name: BRAND.name,
        description: BRAND.tagline,
        inLanguage: "en",
        publisher: { "@id": `${BRAND.origin}/#org` },
        about: { "@id": `${BRAND.origin}/#app` },
      },
      {
        "@type": "FAQPage",
        "@id": `${BRAND.origin}/#faq`,
        mainEntity: FAQS.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
      {
        "@type": "HowTo",
        "@id": `${BRAND.origin}/#howto`,
        name: "How to practise IELTS Speaking with Speakband",
        description: `Answer a real exam-style question out loud and get a band estimate on ${CRITERIA.map(
          (c) => c.short,
        ).join(", ")} within seconds.`,
        totalTime: "PT2M",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Pick a question",
            text: "Choose a Part 1 interview question, a Part 2 cue card, or a Part 3 discussion prompt.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Speak or type your answer",
            text: "Tap the mic and answer out loud, or type the answer if you cannot speak where you are.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Read the feedback",
            text: "Read the band estimate per criterion, the errors that cost marks, and a stronger version of your own answer.",
          },
        ],
      },
      {
        "@type": "Organization",
        "@id": `${BRAND.origin}/#org`,
        name: BRAND.name,
        url: BRAND.origin,
        logo: `${BRAND.origin}/icon-512.png`,
        email: LINKS.email,
        sameAs: [LINKS.playStore],
      },
    ];

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = SCRIPT_ID;
    script.textContent = JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return null;
}
