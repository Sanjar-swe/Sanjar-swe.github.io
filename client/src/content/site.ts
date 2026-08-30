/**
 * Single source of truth for every product claim on this page.
 *
 * Every number here is mirrored from the Speakband app repo — do not edit one
 * without checking the other. Provenance for the values that drift most often:
 *
 *   quotas / plan gating   backend/services/subscription_service.py
 *                          (PLAN_MONTHLY_QUOTAS, INITIAL_CREDITS, select_model,
 *                           can_use_beginner_mode, can_use_natural_voice)
 *   prices, annual tiers   docs/superpowers/specs/2026-07-25-monthly-quota-pricing-design.md
 *   copy + legal wording   docs/STORE_LISTING.md
 *
 * Rule of thumb: if a section component contains a hard-coded price, quota or
 * model name, it is a bug. It belongs here.
 */

/* ─────────────────────────── Launch state ─────────────────────────── */

/**
 * Public on Google Play since 2026-08-20 (versionCode 6 / 1.0.5). Before that
 * the app was in closed testing and this page recruited testers; flipping this
 * constant retargets every CTA, badge and JSON-LD availability field at the
 * store listing and drops the early-access section entirely.
 */
// Widened deliberately, the same way LAUNCH_DISCOUNT.active is: a `const` is
// narrowed to its literal even with a union annotation, which turns the
// early-access branches into dead code the compiler then complains about. The
// point of the constant is that one word switches the page back.
export const LAUNCH_STATE = "public" as "early-access" | "public";

export const isEarlyAccess = LAUNCH_STATE === "early-access";

/* ───────────────────────────── Identity ───────────────────────────── */

export const BRAND = {
  name: "Speakband",
  fullName: "Speakband: IELTS Speaking AI",
  tagline: "AI IELTS Speaking practice with instant band scores",
  packageId: "com.speakband.app",
  /**
   * Canonical marketing origin — where this page is served. Swap when a
   * dedicated domain is registered. Deliberately NOT the API origin: the
   * legal pages are served by the backend, this page is static hosting.
   */
  origin: "https://sanjar-swe.github.io",
} as const;

/** Backend that serves the legal pages the store listing points at. */
const API = "https://speakband.up.railway.app";

export const LINKS = {
  /** Closed-testing invite. Dead since public launch; kept for provenance. */
  earlyAccess: "https://play.google.com/apps/internaltest/4701561738607985953",
  /** The live store listing — the real CTA target. */
  playStore: `https://play.google.com/store/apps/details?id=${BRAND.packageId}`,
  privacy: `${API}/legal/privacy`,
  terms: `${API}/legal/terms`,
  deleteAccount: `${API}/legal/delete-account`,
  email: "softwareforbetterlife@gmail.com",
} as const;

/** Where the primary button points, given the current launch state. */
export const PRIMARY_CTA = {
  href: isEarlyAccess ? LINKS.earlyAccess : LINKS.playStore,
  label: isEarlyAccess ? "Join early access" : "Get it on Google Play",
} as const;

/* ─────────────────────────── Scoring model ────────────────────────── */

/**
 * Four IELTS Speaking criteria. Three are graded from the transcript by Claude;
 * pronunciation cannot be — claude_service.py:14 explicitly instructs the model
 * not to guess it. It comes from Gemini's audio assessment in the paid-tier STT
 * path (stt_service.py), which is why it carries `paidOnly`.
 */
export const CRITERIA = [
  {
    label: "Fluency & Coherence",
    short: "Fluency",
    blurb: "Pace, hesitation and whether your ideas connect.",
    paidOnly: false,
  },
  {
    label: "Lexical Resource",
    short: "Lexical",
    blurb: "Range and precision of the vocabulary you reach for.",
    paidOnly: false,
  },
  {
    label: "Grammatical Range & Accuracy",
    short: "Grammar",
    blurb: "Structures you use and the errors that cost you marks.",
    paidOnly: false,
  },
  {
    label: "Pronunciation",
    short: "Pronunciation",
    blurb: "Scored from your actual audio, not from the transcript.",
    paidOnly: true,
  },
] as const;

/* ───────────────────────────── Pricing ────────────────────────────── */

export interface Plan {
  id: "free" | "basic" | "pro" | "premium";
  name: string;
  monthly: number;
  annual: number;
  /** Headline entitlement — the one thing a buyer compares across tiers. */
  quota: string;
  /** Plain-English translation of the quota. */
  quotaNote: string;
  model: string;
  features: string[];
  highlighted: boolean;
  badge?: string;
}

/**
 * Quotas are per calendar month in the user's own timezone and do not expire
 * daily — the daily reset was removed in the 2026-07-25 pricing change.
 * A full mock test is ~10 answers (Part 1 ×4-5, Part 2 ×1, Part 3 ×4-5).
 */
export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    monthly: 0,
    annual: 0,
    quota: "A free first day",
    quotaNote: "Twelve full AI checks in your first 24 hours, starting when you answer your first question.",
    model: "Claude Haiku 4.5",
    features: [
      "Twelve AI-scored answers on your first day, no card needed",
      "Full 3-criteria breakdown and feedback",
      "Practice Part 1, Part 2 and Part 3",
      "Speak your answer or type it",
      "Invite someone who practises and keep one check a day for a month",
    ],
    highlighted: false,
  },
  {
    id: "basic",
    name: "Basic",
    monthly: 4.99,
    annual: 39.99,
    quota: "150 checks / month",
    quotaNote: "About 15 full mock tests.",
    model: "Claude Haiku 4.5",
    features: [
      "150 AI checks every month",
      "Pronunciation scored from your audio",
      "Server-side speech recognition",
      "Progress tracking and band trend",
      "Structured learning path",
    ],
    highlighted: false,
  },
  {
    id: "pro",
    name: "Pro",
    monthly: 9.99,
    annual: 79.99,
    quota: "250 checks / month",
    quotaNote: "About 25 full mock tests.",
    model: "Haiku 4.5 · Sonnet 5 on Part 3",
    features: [
      "250 AI checks every month",
      "Beginner Mode — hints before you answer",
      "Claude Sonnet 5 on Part 3 discussion",
      "Pronunciation scored from your audio",
      "Everything in Basic",
    ],
    highlighted: true,
    badge: "Most popular",
  },
  {
    id: "premium",
    name: "Premium",
    monthly: 19.99,
    annual: 159.99,
    quota: "300 checks / month",
    quotaNote: "About 30 full mock tests — one a day.",
    model: "Claude Sonnet 5 on all parts",
    features: [
      "300 AI checks every month",
      "Sonnet 5 on Part 1, 2 and 3",
      "Natural Voice audio for questions and models",
      "Beginner Mode included",
      "Everything in Pro",
    ],
    highlighted: false,
  },
];

/* ──────────────────────── The launch discount ─────────────────────── */

/**
 * 50% off the first month, mirrored from the app's `promo_campaigns` row.
 *
 * **`active` must stay false until the introductory offer actually exists in
 * Play Console** (offer id `early-bird-50`, 50% off one billing period, on each
 * monthly base plan). The app has the same rule expressed as code — it draws no
 * discount unless the store hands back that offer — but this page has no store
 * to ask, so the rule here is a human one: a landing page promising half price
 * above a Play listing charging full price is the worst version of this
 * feature.
 *
 * See the app repo: `docs/superpowers/plans/2026-08-29-launch-discounts.md`.
 */
export const LAUNCH_DISCOUNT = {
  // Deliberately typed as a plain boolean rather than the literal `false` an
  // `as const` would give it: the whole point of this flag is that one word
  // turns the campaign on, and a literal type makes every branch that reads it
  // dead code the compiler is entitled to complain about.
  active: false as boolean,
  percentOff: 50,
  badge: "Launch offer",
  headline: "50% off your first month",
  body:
    "We are new, and the first people through the door pay half. One month at half price on any paid plan, then the usual price. Cancel any time.",
  // The campaign repeats — a half-price window opens again every few months —
  // and that fact is deliberately NOT on this page. Three reasons, all of them
  // costing us money if we forget:
  //
  //   1. It tells a buyer to come back later instead of buying now. The
  //      sentence would sit directly above the price it argues against.
  //   2. It invites a subscriber to cancel and re-enter through the cheap
  //      door — and that door is shut. Google grants an introductory offer
  //      only to an account that never subscribed to that base plan, so the
  //      cancellation loses the subscription and earns no discount. We would
  //      be advertising a trade the store refuses to honour.
  //   3. A published cadence is a promise. These campaigns are database rows
  //      precisely so they can be switched off.
  //
  // The window opening again stays a pleasant surprise for whoever is looking
  // at the page on the day it happens.
  //
  // Annual is deliberately excluded: the offer is a first-month one.
  monthlyOnlyNote: "Applied by Google Play at checkout. Monthly plans only.",
} as const;

/** Shown under the pricing grid. Billing is Play-native — no card ever hits us. */
export const BILLING_NOTE =
  "Subscriptions are billed through Google Play. Manage or cancel anytime in your Play account — Speakband never handles your card details.";

/* ───────────────────────────── Sections ───────────────────────────── */

export const FEATURES = [
  {
    icon: "gauge",
    title: "A band estimate in seconds",
    body: "Answer, and Claude returns a band estimate with a written comment on each criterion — no booking, no waiting for a tutor's schedule.",
  },
  {
    icon: "mic",
    title: "Pronunciation from real audio",
    body: "Paid plans transcribe your recording server-side and score pronunciation from how you actually sound, not from a written transcript.",
  },
  {
    icon: "lightbulb",
    title: "Beginner Mode",
    body: "Stuck before you start? Three escalating hint levels — a nudge, a structure, then a full sample answer. Included on Pro and Premium.",
  },
  {
    icon: "volume",
    title: "Natural Voice",
    body: "Premium reads questions and model answers aloud in a natural voice, so you train listening and pronunciation together.",
  },
  {
    icon: "route",
    title: "A path, not a question dump",
    body: "Topics are sequenced into a learning path across Part 1, 2 and 3, so each session builds on the last instead of shuffling at random.",
  },
  {
    icon: "trend",
    title: "Your band trend over time",
    body: "Every evaluation is saved. See your average, your best, and the criterion that keeps holding your score down.",
  },
] as const;

export const STEPS = [
  {
    title: "Pick a question",
    body: "Real Part 1, Part 2 cue-card and Part 3 discussion questions, generated across the topics the exam actually uses.",
  },
  {
    title: "Speak or type",
    body: "Tap the mic and answer out loud, or type it if you are somewhere you cannot speak. Both get scored.",
  },
  {
    title: "Read the feedback",
    body: "A band estimate per criterion, the specific errors that cost you marks, and what a stronger answer sounds like.",
  },
] as const;

/** Real captures from the release build, not mockups. */
export const SCREENS = [
  {
    src: "/app/02_conversation.webp",
    alt: "Speakband conversation screen showing a Part 1 question and the record button",
    caption: "Answer out loud",
    body: "A question, a mic, nothing else competing for your attention.",
  },
  {
    src: "/app/03_result.webp",
    alt: "Speakband result screen showing a 7.5 band score with written feedback",
    caption: "Get the band estimate",
    body: "A score with the reasoning attached — and the one fix that matters most.",
  },
  {
    src: "/app/05_band8_sample.webp",
    alt: "Speakband screen showing how a band 8 answer sounds, with audio playback",
    caption: "Hear the target",
    body: "A model answer at a higher band, read aloud on Premium.",
  },
  {
    src: "/app/04_progress.webp",
    alt: "Speakband progress screen with a band trend chart and focus area",
    caption: "Watch the trend",
    body: "Average, best, and the criterion quietly capping your score.",
  },
] as const;

export const FAQS = [
  {
    q: "What does the app actually score?",
    a: "Every answer gets a band estimate on Fluency & Coherence, Lexical Resource, and Grammatical Range & Accuracy, plus a written comment on each. On paid plans your recording is also analysed for pronunciation, which the four-criteria IELTS rubric requires and a transcript alone cannot give you.",
  },
  {
    q: "Is this an official IELTS score?",
    a: "No, and no tool that is not run by the test boards can give you one. Speakband gives you a band estimate to practise against — consistent, instant, and specific about what to fix. It is built to make your practice between real tests count for more.",
  },
  {
    q: "Which AI models do you use?",
    a: "Claude Haiku 4.5 handles evaluation on Free, Basic, and Parts 1 and 2 of Pro. Claude Sonnet 5 takes Part 3 on Pro and every part on Premium, since Part 3 discussion answers are where the reasoning depth pays off. Speech is transcribed by Gemini, with Whisper as a fallback.",
  },
  {
    q: "How does the monthly quota work?",
    a: "Each paid plan gives you a set number of AI checks per calendar month — 150 on Basic, 200 on Pro, 300 on Premium. Nothing expires at the end of a day, so you can do six answers on Monday and nothing on Tuesday. The counter resets at the start of each month in your own timezone.",
  },
  {
    q: "What do I get for free?",
    a: "A free first day: twelve full AI evaluations, no card required. The clock starts when you answer your first question, not when you sign up, so the day is yours to use. It is a genuine trial rather than a renewing free tier — the AI cost per check is real and we would rather be straight about that than quietly degrade the free experience. After it, one check a day stays free for anyone who invites somebody who actually practises.",
  },
  {
    q: "How do I pay, and can I cancel?",
    a: "Subscriptions run through Google Play Billing. You can cancel or switch plans anytime from your Play account, and your access runs to the end of the period you have paid for. Speakband never sees or stores your card details.",
  },
  // Only while the discount is actually running: an answer about an offer
  // nobody can take is a question the page invented for itself.
  ...(LAUNCH_DISCOUNT.active
    ? [
        {
          q: "How does the 50% launch discount work?",
          a: "Your first month on any paid plan is half price, applied by Google Play at checkout — you will see the discounted figure on the Play payment sheet before you confirm anything. From the second month it renews at the normal price, which is shown on the card before you buy. It applies to monthly plans only, once per account, and you can cancel any time.",
        },
      ]
    : []),
  {
    q: "Is there an iOS version?",
    a: "Not yet — Speakband is Android-only today. The backend is already platform-neutral, so an iOS client is a question of build time rather than architecture.",
  },
  {
    q: "Is my practice data private?",
    a: "Your answers and evaluations are stored so you can see your progress over time. You can delete your account and everything attached to it at any point, from inside the app or the account-deletion page linked in the footer.",
  },
] as const;

/** Legally required — Speakband is an independent practice tool. */
export const IELTS_DISCLAIMER =
  "IELTS is a registered trademark of the British Council, IDP: IELTS Australia and Cambridge Assessment English. Speakband is an independent practice tool and is not affiliated with, endorsed by, or certified by any of them. Band scores shown in the app are AI estimates, not official results.";
