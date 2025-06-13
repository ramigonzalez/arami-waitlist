I will detail my aplication below but you must follow my meta instructions:

- You must follow "# Application details" to build the application
- You must write detailed tasks list in `project-phases.md` file
- You must use `memory.md` file as the current task memory bank
- You must use `changelog.md` to log changes after every task

# Application details
I need a single-page wait-list application with:

### Tech Stack
- Frontend React + TypeScript
- Styling Tailwind CSS (use the design-token configuration below)
- Backend / DB Supabase (`@supabase/supabase-js` v2) – table `waitlist_subscribers`
- Analytics Google Tag Manager → GA4 via `window.dataLayer` pushes

### Core Features
- Responsive hero (headline, sub-headline, three value bullets)
- Email capture form (`email` input, required)
- Tier preference radio – “Voice-Only (Free)” · “Full Avatar (Premium)”
- Primary CTA button – label “Join the Waitlist”
- Teaser-price badge – “Full avatar ≈ $5 /mo” (footnote “introductory pricing, subject to change”)
- Social-proof line – “Trusted by 2 k creatives during private beta.”
- Compliance footer – “HIPAA-grade encryption. Opt-out anytime.” → `/privacy` placeholder link
- Success modal – headline “You’re in!” + tweet-share link
- Analytics events – push `{ event:'join_waitlist', tier }` and `{ event:'tier_selected', tier }` to `window.dataLayer` (for GTM → GA4)

### Visual Polish (hover only)
Add `.btn-primary:hover` pulse animation:
- scale 1 → 1.05 → 1 over 600 ms (`ease-out`)
- drop-shadow glow using `accent-lilac` at 40 % opacity Implement via Tailwind `@keyframes`, no extra CSS file.

### Supabase Integration
- Read `SUPABASE_URL` & `SUPABASE_ANON_KEY` from .env.
- Table `waitlist_subscribers` columns: `id uuid PK | email text unique | tier text | created_at timestamptz default now()`
- On submit: `insert { email, tier };` show success modal.
- On duplicate key error, display inline error “Looks like you’re already on the list.”

### Start with the Main Page Containing
- `section.hero` full-height dark gradient,
- `section.form` centered max-w-md,
- `section.social-proof` + section.footer.

### Design-Token Variables (Tailwind config)

{
  "colors": {
    "bg-01": "#0D0D0D",
    "bg-02": "#1A1A1E",
    "accent-lilac": "#BB9CF6",
    "accent-moss": "#5CC6A4",
    "text-primary": "#F5F5F5",
    "text-muted": "#C5C5C7"
  },
  "gradient": {
    "pulse": "linear-gradient(135deg,#BB9CF6 0%,#5CC6A4 100%)"
  },
  "fontFamily": { "display": "DM Sans", "body": "Inter" },
  "spacingBase": 4,
  "borderRadius": { "md": 8, "pill": 28 }
}
### Fixed Copy (do not paraphrase)
•  Headline: “Speak your mind. Discover your truth.”
•  Sub-headline: “Daily three-minute voice ritual guided by an empathic AI avatar.”
•  Value bullets:
• “AI reflections tuned to your DISC & Enneagram”
• “Symbolic virtue rewards instead of dopamine hits”
• “Private, encrypted, yours to delete anytime”
• CTA label: “Join the Waitlist”
• Success headline: “You’re in!”

### Nice-to-Haves (park for phase 2)
– Early-bird countdown banner component
– ReCAPTCHA v3 anti-spam

Focus only on this page; no dashboards or multi-auth flows for now.
If something blocks compilation, pause and ask for clarification instead of guessing.