# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Small business owners in Hyderabad, India. They want more customers and enquiries from their website and ads, and they usually have no in-house marketing or tech team. They are likely on mobile and use WhatsApp daily. The site serves the agency's own buyers; the first client project, an e-commerce site for a perfume brand, is separate work.

Internal team: Sai Kranth (owner/CTO), a junior developer, and a business person.

## Product Purpose

ThrivvSkale (thrivvskale.com) is an AI-driven web and digital agency based in Hyderabad. The site sells one offer, a "lead engine", and turns visitors into leads. Success is a visitor submitting the 3-field hero lead form, which opens the WhatsApp thank-you flow.

## Positioning

One accountable lead engine rather than separate tools: website, lead capture, Zoho CRM, WhatsApp and ads, built and run together for Indian small businesses. Pricing is published in rupees, and the Lead Growth fee is a published formula.

## Operating Context

- India-only market. All prices are in ₹, exclude 18% GST, and come from `thrive-skale-web/src/utils/countryConfig.js`, the single source of truth for contact details and pricing (packages, monthly plans, add-ons, paid-directly costs).
- Lead Growth fee (excl. GST): up to ₹60,000 ad spend is ₹25,000; above ₹60,000 up to ₹1,50,000 is ₹35,000; above ₹1,50,000 is 12% of ad spend with a minimum of ₹35,000. The fee must never drop as spend rises.
- Lead System includes one simple lead tool (quote request, booking form or calculator). Complex tools are quoted separately.
- Hosting: Cloudflare Pages, auto-deployed from GitHub, with branch previews.

## Capabilities and Constraints

- App: `thrive-skale-web/` (React 19 + Vite). Checks that must pass: `npm test`, `npm run lint`, `npm run build`.
- No US details anywhere. No founder line in contact or footer.
- Do not invent claims: no client counts, ratings or response times.
- No Industries section. No stock photos until real Indian imagery exists. Current AI-generated Western images are placeholders to replace.
- Performance is a product constraint. Heavy effects were removed on purpose and must not return: no smooth scroll, no custom cursor, no video hero.
- Motion: animate only opacity and transform. Use IntersectionObserver and reveal each element once. The only allowed scroll listener is the hero LeadStack. Turn everything off under prefers-reduced-motion. Content must stay visible without JS. (As of this writing no LeadStack or scroll listener exists in `src/`; the allowance is for when it is built.)
- Hero is a 3-field lead form that opens the WhatsApp thank-you flow, with a CSS-only sample chat that plays once.
- Do not merge PR #4 (`redesign-light-theme`) without Sai Kranth's approval.

Undecided or open:
- Approved add-ons table (groups and prices) for `ADD_ON_GROUPS`.
- Google Ads lead conversion label (`VITE_GADS_LEAD_LABEL` in Cloudflare Pages; no conversion is sent until it is set).
- Privacy Policy and Terms need owner and legal review.
- GitHub organization and repo transfer.
- CMS and leads admin/CRM.

## Brand Commitments

Business name: ThrivvSkale. The brand team has not yet chosen the logo, palette or fonts. The current palette ("Haldi & Ink", light) and fonts (Bricolage Grotesque + Hind) are placeholders, not brand. Do not treat them as identity or build on them as a commitment. Keep colours as tokens in `src/index.css`.

## Evidence on Hand

None yet: no client counts, testimonials, ratings, case studies, response-time data, or real Indian imagery. Future work must not fabricate any of these. Use only what is real, and leave a gap rather than filling it with invented proof.

## Product Principles

1. Lead capture first: every section should move a small business owner toward the hero form or the WhatsApp flow.
2. Honest and specific: published ₹ prices and the stated fee rules instead of vague "contact us" copy; no invented proof.
3. Fast on ordinary Indian mobile devices: performance outranks decoration.
4. Built for India: ₹, GST clarity, WhatsApp and Zoho, Hyderabad contact details.
5. Placeholders stay swappable: the visual identity can change without touching content or structure.

## Accessibility & Inclusion

Honor prefers-reduced-motion. Content must remain visible without JS. No product-specific accessibility standard has been set beyond this.
