# PalmChat Innovations

The production website for PalmChat Innovations LLC, a founder-led education and learning design studio helping schools and education organizations build meaningful computer science, professional learning, curriculum, and AI integration experiences.

The site uses semantic HTML, modern CSS, and dependency-free JavaScript. It is a multi-page static site that deploys directly from the repository root to Vercel or GitHub Pages at [palmchat.io](https://palmchat.io/).

## Local development and preview

Run `python3 -m http.server 8000` from the repository root, then open `http://localhost:8000`. There is no build step.

Before publishing, check desktop, tablet, and mobile widths. Test the menu, all anchors, filters, service and case-study disclosure controls, form validation, keyboard focus, and reduced-motion behavior. Do not send a live Formspree submission during routine testing; mock `fetch` when checking success and error states.

### Page generation

Shared page chrome and structured service/project content live in `scripts/build-pages.mjs`. After editing that source, regenerate the checked-in static pages with:

```bash
node scripts/build-pages.mjs
```

The generated HTML files must remain committed so direct navigation and refreshes work without server-side routing. Edit `styles.css` and `script.js` directly; the generator does not overwrite them.

## GitHub Pages deployment

1. Keep Pages pointed at the repository root on the publishing branch.
2. Keep `CNAME` unchanged with the single value `palmchat.io`.
3. Commit and push only after review and approval.
4. Confirm the Pages deployment, then check HTTPS, metadata, asset paths, and the console.

DNS is managed outside this repository and must not be changed during website updates.

## Vercel deployment

The repository includes `vercel.json` for clean static routes, long-lived asset caching, and baseline security headers. No build command or output directory is required.

1. Import `ejbronze/palmchat` into Vercel or run `vercel deploy` from the repository root.
2. Leave Framework Preset as **Other** and keep the root directory as `.`.
3. Use a preview deployment first and verify all routes and interactions.
4. Promote the tested deployment to production.
5. Add `palmchat.io` to the Vercel project only when ready to migrate hosting, then update DNS using the exact records Vercel provides.

Do not change DNS or remove `CNAME` until the Vercel preview has been approved and the domain migration is explicitly authorized.

## Asset structure

```text
assets/
  brand/     Official logo and favicon copies
  icons/     Reusable local icons
  images/    Founder and editorial photography
  projects/  Approved project covers and screenshots
  social/    Open Graph and social-preview assets
```

Legacy root-level logo and favicon files remain for compatibility. New references use `assets/brand/`. Temporary placeholders are documented in [ASSET_CHECKLIST.md](ASSET_CHECKLIST.md). To add a real founder portrait, place an optimized image in `assets/images/`, replace `.portrait-placeholder` in `index.html`, and add accurate alt text.

## Site map

- `/` — concise homepage
- `/services/` and four service detail pages
- `/work/` and five dedicated case-study pages
- `/about/`
- `/resources/`
- `/contact/`
- `/privacy.html`

All page and asset links are root-relative for reliable navigation from nested pages on the custom domain.

## Adding a case study

Add a project record to the `projects` array in `scripts/build-pages.mjs`, add its SVG cover under `assets/projects/`, and regenerate the pages. Include Context, Challenge, PalmChat role, Approach, Deliverables, Tools or methods, Intended impact, related work, and any confidentiality note. Use careful language such as “designed to support” when verified outcomes are unavailable. Never invent statistics, logos, testimonials, partnerships, or outcomes.

## Updating services

Service content lives in the `services` array in `scripts/build-pages.mjs`. Regenerate after editing and check both the service index and detail pages.

## Contact form

The form posts to `https://formspree.io/f/mjkezvrd`. To change the endpoint, update the form source in `scripts/build-pages.mjs`, regenerate, and confirm the generated action in `contact/index.html`. `script.js` validates fields, sets `aria-invalid`, handles loading and network/server failures, resets after success, and uses an `aria-live` status. Keep the `_gotcha` honeypot and email fallback.

The browser workflow has been verified with mocked successful and failed Formspree responses; no live inquiry was sent. In the Formspree dashboard, still confirm that the endpoint belongs to the correct account, delivers to the intended inbox, has appropriate spam controls, retains the expected submission history, and sends the desired email notifications.

## Accessibility checks

- Confirm one H1 and logical headings.
- Navigate every control by keyboard and verify visible focus.
- Check mobile-menu Escape behavior and disclosure controls.
- Confirm filter and form status announcements.
- Check contrast, 200% zoom, and reduced motion.
- Verify decorative graphics are hidden and meaningful images have useful alt text.

## Performance checks

- Run Lighthouse locally and after deployment.
- Keep assets local and avoid unnecessary libraries or fonts.
- Resize and compress approved photography; use responsive sources when added.
- Check requests for 404s, mixed content, and oversized images.

See [ASSET_CHECKLIST.md](ASSET_CHECKLIST.md) for all final assets still needed.
