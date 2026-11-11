# ThrivvSkale website: context for Claude Code

Business: ThrivvSkale (thrivvskale.com), AI-driven web/digital agency in Hyderabad, India-only market.
Owner/CTO: Sai Kranth. A junior developer and a business person work alongside. First client: a perfume brand needing an e-commerce site.

## Code
- App is in `thrive-skale-web/` (React 19 + Vite). Run: `npm ci`, `npm run dev`. Checks that must pass: `npm test`, `npm run lint`, `npm run build`.
- `src/utils/countryConfig.js` is the single source of truth for contact details and ₹ pricing. The site is India-only (no country switcher).
- Hosting: Cloudflare Pages, auto-deploys from GitHub; branch previews at `<branch>.thriveskale.pages.dev`.

## Decisions so far
- No US details anywhere. Founder line removed from contact/footer.
- Performance: heavy effects (smooth scroll, custom cursor, video hero) were removed on purpose. Do not bring them back.
- Palette "Pearl and Brass" and font Anek Latin are PLACEHOLDERS until the brand team chooses palette, font and logo. Keep colours as tokens in `src/index.css`.
- Hero is a 3-field lead form that opens the WhatsApp thank-you flow.
- Do not invent claims (client counts, response times, ratings).
- Do not merge PR #4 (`redesign-light-theme`) without Sai Kranth's approval.

## Open items
Aakash's number (+91 63021 93115) not placed yet; GitHub organization + repo transfer; CMS and leads admin/CRM; real Indian imagery to replace AI-generated Western images.
