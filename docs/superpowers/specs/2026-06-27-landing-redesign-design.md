# Speakband9 Landing Page — Award-Quality Redesign

**Date:** 2026-06-27  
**Goal:** Transform the minimal 4-section landing page into a premium, conversion-focused, SEO/GEO-optimized page that looks like it cost $50k to build.

---

## Product Context

**App:** Speakband9 — AI-powered IELTS Speaking evaluator (Android)  
**AI:** Claude Haiku 4.5 (Free/Basic) + Sonnet 4.6 (Pro Part 3 / Premium)  
**Plans:** Free (3 credits) | Basic $3.99/mo | Pro $9.99/mo | Premium $19.99/mo  
**Key differentiator:** Evaluates 4 IELTS criteria instantly: Fluency & Coherence, Lexical Resource, Grammatical Range, Pronunciation  
**Target audience:** IELTS test-takers worldwide (B2–C1 English)

---

## Design Philosophy

**Aesthetic:** Premium SaaS, award-winning — think Linear.app meets Duolingo Pro.  
**Feel:** Fast, trustworthy, intelligent. Expensive without being sterile.  
**Animations:** Framer Motion — scroll-triggered reveals, stagger children, counter animations. Zero heavy 3D or parallax. Performance budget: <50ms first paint delay.

---

## Color System (Enhanced)

### Light Mode
- Background: `oklch(0.98 0.008 75)` — warm white
- Foreground: `oklch(0.18 0.025 60)` — deep warm charcoal
- Primary: `oklch(0.63 0.17 55)` — rich amber/orange
- Accent gradient: orange → amber `oklch(0.70 0.14 70)`
- Surface: pure white cards, subtle shadow

### Dark Mode  
- Background: `oklch(0.11 0.012 250)` — deep navy (upgrade from green-dark)
- Foreground: `oklch(0.92 0.008 200)` — near white
- Primary: `oklch(0.68 0.18 145)` — vivid green
- Accent: teal `oklch(0.72 0.15 185)`

### Utility Classes (new)
- `.gradient-text` — primary to accent gradient on text
- `.glass` — backdrop-blur card with border
- `.dot-grid` — subtle dot pattern background
- `.glow` — soft primary color glow shadow

---

## Typography

- **Font:** Inter (Google Fonts, weights 400–900)
- **Hero headline:** 72–96px, weight 800, tracking -0.04em
- **Section headlines:** 40–52px, weight 700
- **Body:** 16–18px, weight 400, line-height 1.75

---

## Architecture

Single-page React app. All sections are components composed in `Home.tsx`.

```
client/src/
  pages/Home.tsx            — compose all sections
  components/sections/
    Navbar.tsx
    Hero.tsx
    TrustBar.tsx
    Features.tsx
    HowItWorks.tsx
    DemoWidget.tsx
    Pricing.tsx
    Testimonials.tsx
    FAQ.tsx
    FinalCTA.tsx
    Footer.tsx
  hooks/useScrollAnimation.ts  — shared Framer Motion hook
```

---

## Sections

### 1. Navbar
- Glassmorphism sticky nav, transparent → frosted on scroll
- Left: Logo (icon + "Speakband9")
- Center: Home | Features | Pricing | FAQ (hidden on mobile)
- Right: Theme toggle + "Download App" CTA button
- Mobile: hamburger → slide-down menu

### 2. Hero
- **Badge:** "Powered by Claude AI ✦ Now Available on Android"
- **H1:** "Get Band 7+ in IELTS Speaking" (gradient on "Band 7+")
- **Subtitle:** "Answer a speaking question. AI evaluates your fluency, vocabulary, grammar, and pronunciation — instantly."
- **CTAs:** [Start Free — 3 Credits] + [View Plans →]
- **Stats row:** 1,000+ Learners | 4 IELTS Criteria | Band 4–9 Range | Claude AI
- **Visual:** Floating evaluation card (static UI mockup showing Band 7.0, criteria scores, feedback snippet)
- **Background:** Subtle dot grid + radial gradient glow behind text

### 3. Trust Bar
- Single strip: 4 IELTS criteria pills with icons
- "Fluency & Coherence · Lexical Resource · Grammatical Range · Pronunciation"

### 4. Features (6 cards)
Grid 3×2 desktop, 2×3 tablet, 1×6 mobile.
1. **Instant AI Scoring** — Get your Band Score (4.0–9.0) within seconds
2. **4-Criteria Breakdown** — Detailed score + comment per IELTS criterion
3. **Improved Answer** — AI rewrites your answer at a higher band level
4. **Learning Path** — Structured topics from Part 1 to Part 3
5. **Progress Tracking** — History of all your evaluations
6. **Referral Rewards** — Earn free credits by inviting friends

### 5. How It Works (3 steps)
1. Choose a speaking topic (Part 1, 2, or 3)
2. Type or paste your answer
3. Receive instant band score + detailed feedback

### 6. Demo Widget
Static but realistic evaluation result card:
- Band Score: **7.0**
- Fluency 7.0 | Lexical 6.5 | Grammar 7.5 | Pronunciation 7.0
- Sample feedback text
- "Your improved answer:" excerpt
- Styled exactly like the real app would show

### 7. Pricing (4 columns)
Toggle: Monthly / Annual (20% off badge on annual)

| Plan | Price | Daily Limit | AI Model | Highlight |
|------|-------|-------------|----------|-----------|
| Free | $0 | 3 credits total (+3/mo) | Haiku | No card needed |
| Basic | $3.99/mo | 10/day | Haiku | Best for starters |
| Pro | $9.99/mo | 30/day | Haiku + Sonnet (Part 3) | **Most Popular** badge |
| Premium | $19.99/mo | Unlimited | Sonnet everywhere | Best for serious prep |

Annual: Basic $39.99 | Pro $99.99 | Premium $199.99

### 8. Testimonials (3 cards)
Horizontal scroll on mobile, 3-column on desktop.
- Avatars (initials), name, country, band improvement

### 9. FAQ (accordion, 7 questions)
Schema-marked with JSON-LD FAQPage. Questions:
1. What is IELTS Speaking Band Score?
2. How does AI evaluate my speaking?
3. Which AI is used?
4. Is the free plan really free?
5. Can I cancel anytime?
6. Is there an iOS version?
7. How is this different from a human examiner?

### 10. Final CTA
- Dark gradient section
- H2: "Start speaking. Start scoring."
- Subtitle: "Join 1,000+ learners improving their IELTS Speaking with AI"
- [Get 3 Free Credits →]

### 11. Footer
- Logo + tagline
- Columns: Product (Features, Pricing, FAQ), Community (Telegram, Discord), Legal (Privacy, Terms)
- Copyright + "Powered by Claude AI"

---

## SEO / GEO

### index.html meta tags
- `<title>Speakband9 — AI IELTS Speaking Practice | Get Band 7+</title>`
- `meta description`: 155 chars, includes "IELTS Speaking", "AI", "band score", "free"
- `meta keywords`: IELTS speaking practice, AI IELTS, band score, speaking test prep
- Open Graph: title, description, type=website
- Twitter card: summary_large_image
- `<html lang="en">`
- Canonical URL tag

### JSON-LD (in index.html)
Two schemas:
1. **SoftwareApplication** — name, description, price, rating, platform=Android
2. **FAQPage** — all 7 FAQ questions/answers for AI indexing

### Content for GEO (AI-findable)
- Each section uses precise, factual language AI can extract
- FAQ answers are self-contained (answerable without context)
- Stats are specific numbers, not vague claims
- Product description matches what AI models would cite

---

## Animation Strategy

All powered by `framer-motion` (already in package.json).

- **On scroll:** `useInView` with `once: true`, `margin: "-100px"` — fade up + opacity
- **Stagger:** Feature cards, testimonials, pricing columns stagger 0.08s
- **Counter:** Stats numbers count up on enter (requestAnimationFrame)
- **Hover:** Scale 1.02 on cards, shadow increase, icon color shift
- **Navbar:** `useScroll` → opacity transition to glass background
- **Hero visual:** Subtle float animation (translateY ±8px, 3s ease infinite)
- **NO:** parallax, 3D transforms, canvas animations, heavy particle effects

---

## Implementation Files

### New files (create):
- `client/src/hooks/useScrollAnimation.ts`
- `client/src/components/sections/Navbar.tsx`
- `client/src/components/sections/Hero.tsx`
- `client/src/components/sections/TrustBar.tsx`
- `client/src/components/sections/Features.tsx`
- `client/src/components/sections/HowItWorks.tsx`
- `client/src/components/sections/DemoWidget.tsx`
- `client/src/components/sections/Pricing.tsx`
- `client/src/components/sections/Testimonials.tsx`
- `client/src/components/sections/FAQ.tsx`
- `client/src/components/sections/FinalCTA.tsx`
- `client/src/components/sections/Footer.tsx`

### Modified files:
- `client/index.html` — SEO meta, fonts, JSON-LD
- `client/src/index.css` — Enhanced color tokens, gradient/glass utilities
- `client/src/pages/Home.tsx` — Compose all sections, remove old code
