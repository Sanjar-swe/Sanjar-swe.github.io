/**
 * Single source of truth for every product claim on this page.
 *
 * Every number here is mirrored from the Speakband app repo — do not edit one
 * without checking the other. Provenance for the values that drift most often:
 *
 *   passes (days, checks)  backend/services/products.py (PASS_CHECKS, PASS_PLAN)
 *   free answers           backend/services/channels.py (APP_TRIAL_ANSWERS)
 *   model per plan         backend/services/subscription_service.py (select_model)
 *   what may be claimed    docs/SALES_FACTS.md
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
  origin: "https://getspeakband.com",
} as const;

/** Backend that serves the legal pages the store listing points at. */
const API = "https://speakband.up.railway.app";

export const LINKS = {
  /** Closed-testing invite. Dead since public launch; kept for provenance. */
  earlyAccess: "https://play.google.com/apps/internaltest/4701561738607985953",
  /** The live store listing — the real CTA target. */
  playStore: `https://play.google.com/store/apps/details?id=${BRAND.packageId}`,
  /**
   * The browser version — the same practice screen, served by the API itself
   * at /app since 2026-09-07.
   *
   * Worth a CTA of its own beside the store button, and worth being second to
   * it: an install is the better outcome when somebody is on a phone, and this
   * page is read on a laptop as often as not. One free check here, as in the
   * app (since 2026-09-27) — the size lives in the backend
   * (`services/channels.py`), not in any copy on this page.
   */
  webApp: `${API}/app/`,
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

/**
 * One-time passes since 2026-11-01 — the monthly and annual subscriptions are
 * no longer sold. A pass is `days` of Pro plus a fixed number of checks; the
 * checks stay on the account after the days run out. Prices are the Google
 * Play US prices of `pass_7d`, `pass_30d`, `pass_60d`.
 * A full mock test is ~10 answers (Part 1 ×4-5, Part 2 ×1, Part 3 ×4-5).
 */
export interface Plan {
  id: "free" | "pass_7d" | "pass_30d" | "pass_60d";
  name: string;
  /** One-time price in USD; 0 for free. */
  price: number;
  days: number;
  checks: number;
  /** Headline entitlement — the one thing a buyer compares across cards. */
  quota: string;
  /** Plain-English translation of the quota. */
  quotaNote: string;
  model: string;
  features: string[];
  highlighted: boolean;
  badge?: string;
}

const PASS_FEATURES = [
  "Pronunciation scored from your audio",
  "Claude Sonnet 5 on Part 3 discussion",
  "Server-side speech recognition",
  "Unused checks stay on your account",
  "Pay once — nothing renews",
];

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    days: 0,
    checks: 1,
    quota: "One free check",
    quotaNote: "Your first answer gets a full AI check — band, criteria and fixes.",
    model: "Claude Haiku 4.5",
    features: [
      "Your first answer AI-scored in full, no card needed",
      "Full 3-criteria breakdown and feedback",
      "Practice Part 1, Part 2 and Part 3",
      "Speak your answer or type it",
      // "endless practice" until 2026-09-04, and in the FREE column it read as
      // unlimited free practice. It is not: a turn costs a third of a check.
      "Conversation mode — no marks, three turns per check",
      "Invite a friend who practises and get 1 free AI check (up to 10 friends)",
    ],
    highlighted: false,
  },
  {
    id: "pass_7d",
    name: "7-day pass",
    price: 1.99,
    days: 7,
    checks: 30,
    quota: "30 checks",
    quotaNote: "About 3 full mock tests.",
    model: "Haiku 4.5 · Sonnet 5 on Part 3",
    features: PASS_FEATURES,
    highlighted: false,
  },
  {
    id: "pass_30d",
    name: "30-day pass",
    price: 4.99,
    days: 30,
    checks: 75,
    quota: "75 checks",
    quotaNote: "About 7 full mock tests.",
    model: "Haiku 4.5 · Sonnet 5 on Part 3",
    features: PASS_FEATURES,
    highlighted: true,
  },
  {
    id: "pass_60d",
    name: "60-day pass",
    price: 9.99,
    days: 60,
    checks: 150,
    quota: "150 checks",
    quotaNote: "About 15 full mock tests.",
    model: "Haiku 4.5 · Sonnet 5 on Part 3",
    features: PASS_FEATURES,
    highlighted: false,
  },
];

/** Shown under the pricing grid. Billing is Play-native — no card ever hits us. */
export const BILLING_NOTE =
  "Passes are one-time purchases through Google Play. Nothing renews and there is nothing to cancel — Speakband never handles your card details.";

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
    body: "With a pass, your recording is transcribed server-side and score pronunciation from how you actually sound, not from a written transcript.",
  },
  {
    // Was "Beginner Mode" until 2026-09-04. That feature is gone: the app
    // stopped offering the escalating hints on 2026-09-02 when Conversation
    // mode replaced them, and `getBeginnerHint` is declared in
    // `IeltsApiService.kt` but called from nowhere. `routers/beginner.py`
    // still answers, purely so v1.0.15 installs keep working. Selling it here
    // was selling something a new buyer could not find.
    icon: "lightbulb",
    title: "Conversation mode",
    body: "Practice with no marks in it. Everyday openers, corrections as you go, and each next question grown from what you just said — so it never runs out. On every plan.",
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
    caption: "See the target",
    body: "A model answer at a higher band, so you know what to aim for.",
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
    a: "Every answer gets a band estimate on Fluency & Coherence, Lexical Resource, and Grammatical Range & Accuracy, plus a written comment on each. With a pass your recording is also analysed for pronunciation, which the four-criteria IELTS rubric requires and a transcript alone cannot give you.",
  },
  {
    q: "Is this an official IELTS score?",
    a: "No, and no tool that is not run by the test boards can give you one. Speakband gives you a band estimate to practise against — consistent, instant, and specific about what to fix. It is built to make your practice between real tests count for more.",
  },
  {
    q: "Which AI models do you use?",
    a: "Claude Haiku 4.5 handles evaluation on the free check and on Parts 1 and 2 with a pass. Claude Sonnet 5 takes Part 3 with a pass, since Part 3 discussion answers are where the reasoning depth pays off. Speech with a pass is transcribed by Google's audio model, with Whisper as a fallback; the free tier uses Whisper.",
  },
  {
    q: "How do passes work?",
    a: "You pay once and get Pro for 7, 30 or 60 days with 30, 75 or 150 AI checks ($1.99, $4.99, $9.99 in the US; Google Play shows your local price). Spend the checks at any pace — six answers on Monday and none on Tuesday is fine. Checks you have not used stay on your account after the days end.",
  },
  {
    q: "What do I get for free?",
    a: "One full AI check on your first answer, no card required: the band, the three criteria and the fixes. It is a genuine sample rather than a renewing free tier — the AI cost per check is real and we would rather be straight about that than quietly degrade the free experience. After it, every friend you invite who answers a first question earns you 1 more free check, for up to 10 friends.",
  },
  {
    q: "How do I pay, and can I cancel?",
    a: "Passes are one-time purchases through Google Play Billing. Nothing renews, so there is nothing to cancel. Speakband never sees or stores your card details.",
  },
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

/**
 * Speakband against the apps people name when they ask for an alternative.
 *
 * Every cell is something a public source states; where none does, the cell is
 * null and renders empty — an unknown is never drawn as a cross. Competitor
 * prices are US store/web prices as published (SpeakShark, checked
 * 2026-08-28; Leonardo English for Cambly, 2026-04-17); re-check them before
 * changing a figure, and keep COMPARISON_CHECKED in step.
 */
export type Mark = "yes" | "partial" | "no" | null;
export interface ComparisonCell {
  mark: Mark;
  note?: string;
}
export interface Competitor {
  name: string;
  kind: string;
  monthly: number | null;
  annual: number | null;
}

export const COMPARISON_CHECKED = "October 2026";

export const COMPETITORS: Competitor[] = [
  { name: "ELSA Speak", kind: "Pronunciation app", monthly: 19.99, annual: 159.99 },
  { name: "Speak", kind: "Conversation app", monthly: 17.99, annual: 83.99 },
  { name: "Praktika", kind: "AI tutor app", monthly: null, annual: null },
  // "Two 30-minute lessons a week" — the plan the source quotes a price for.
  { name: "Cambly", kind: "Live tutor, 2 lessons/week", monthly: 85, annual: null },
];

/** Rows of marks: Speakband first, then COMPETITORS in order. */
export const COMPARISON_ROWS: { label: string; cells: ComparisonCell[] }[] = [
  {
    label: "Built for IELTS Speaking",
    cells: [
      { mark: "yes" },
      { mark: "partial", note: "IELTS section" },
      { mark: "no" },
      { mark: null },
      { mark: "no" },
    ],
  },
  {
    label: "All three parts of the test",
    cells: [
      { mark: "yes" },
      { mark: null },
      { mark: "no" },
      { mark: null },
      { mark: "partial", note: "if your tutor runs them" },
    ],
  },
  {
    label: "IELTS band score",
    cells: [
      { mark: "yes", note: "per criterion" },
      { mark: "partial", note: "a prediction, pronunciation-led" },
      { mark: "no" },
      { mark: null },
      { mark: "no" },
    ],
  },
  {
    label: "All 4 IELTS criteria scored",
    cells: [
      { mark: "yes", note: "4 of 4 with a pass" },
      { mark: null },
      { mark: "no" },
      { mark: "no" },
      { mark: "no" },
    ],
  },
  {
    label: "Feedback seconds after you answer",
    cells: [
      { mark: "yes" },
      { mark: "yes" },
      { mark: "yes" },
      { mark: "yes" },
      { mark: "no", note: "wait for the lesson" },
    ],
  },
];
