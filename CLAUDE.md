# ThrivvSkale website: context for Claude Code

Business: ThrivvSkale (thrivvskale.com), AI-driven web/digital agency in Hyderabad, India-only market.
Owner/CTO: Sai Kranth. A junior developer and a business person work alongside. First client: a perfume brand needing an e-commerce site.

## Code
- App is in `thrive-skale-web/` (React 19 + Vite). Run: `npm ci`, `npm run dev`. Checks that must pass: `npm test`, `npm run lint`, `npm run build`.
- `src/utils/countryConfig.js` is the single source of truth for contact details and ₹ pricing (packages, monthly, add-ons, paid-directly). The site is India-only. Prices exclude 18% GST.
- Design system lives in `src/index.css` (tokens, spacing/type scale, `.btn--primary/.btn--secondary`, `.card`, `.section-head`, `.table`, `.field`). Component CSS is layout only; no hex values.
- Hosting: Cloudflare Pages, auto-deploys from GitHub; branch previews at `<branch>.thriveskale.pages.dev`.

## Decisions so far
- No US details anywhere. Founder line removed from contact/footer.
- Performance: heavy effects (smooth scroll, custom cursor, video hero) were removed on purpose. Do not bring them back.
- Palette "Haldi & Ink" (light) and fonts Bricolage Grotesque + Hind are PLACEHOLDERS until the brand team chooses palette, font and logo. Keep colours as tokens in `src/index.css`.
- Hero is a 3-field lead form that opens the WhatsApp thank-you flow, next to an exploded 3D view (LeadStack: Ads, Website, CRM, WhatsApp reply) built with CSS 3D transforms only. It spreads as the page scrolls normally. No library, no pinning or scroll hijack, still when reduced motion is on.
- Lead Growth fee (excl. GST): up to ₹60,000 ad spend ₹25,000; above ₹60,000 up to ₹1,50,000 ₹35,000; above ₹1,50,000 12% of ad spend, minimum ₹35,000 (`leadGrowthFee` in countryConfig.js; the fee must never drop as spend rises).
- Offer: "lead engine" (website + lead capture + Zoho CRM + WhatsApp + ads). No Industries section and no stock photos until real Indian imagery exists.
- Motion only on interaction (clicks, hovers, the How-it-works package switch, the ad-spend slider) plus the hero LeadStack spreading on scroll. No scroll-in fade/slide animations on sections.
- Lead System includes "one simple lead tool" (quote request, booking form or calculator); complex tools are quoted separately. No separate calculator section.
- Do not invent claims (client counts, response times, ratings).
- Do not merge PR #4 (`redesign-light-theme`) without Sai Kranth's approval.

## Open items
Approved add-ons table (groups and prices) still to be added to `ADD_ON_GROUPS` in countryConfig.js; Google Ads lead conversion label: set `VITE_GADS_LEAD_LABEL` in Cloudflare Pages (no conversion is sent until then); Privacy Policy and Terms pages need owner/legal review; GitHub organization + repo transfer; CMS and leads admin/CRM; real Indian imagery to replace AI-generated Western images.
