# PalmChat Innovations

The production website for PalmChat Innovations LLC, a founder-led education and learning design studio helping schools and education organizations build meaningful computer science, professional learning, curriculum, and AI integration experiences.

The site uses semantic HTML, modern CSS, and dependency-free JavaScript. It deploys from the repository root to GitHub Pages at [palmchat.io](https://palmchat.io/).

## Local development and preview

Run `python3 -m http.server 8000` from the repository root, then open `http://localhost:8000`. There is no build step.

Before publishing, check desktop, tablet, and mobile widths. Test the menu, all anchors, filters, service and case-study disclosure controls, form validation, keyboard focus, and reduced-motion behavior. Do not send a live Formspree submission during routine testing; mock `fetch` when checking success and error states.

## GitHub Pages deployment

1. Keep Pages pointed at the repository root on the publishing branch.
2. Keep `CNAME` unchanged with the single value `palmchat.io`.
3. Commit and push only after review and approval.
4. Confirm the Pages deployment, then check HTTPS, metadata, asset paths, and the console.

DNS is managed outside this repository and must not be changed during website updates.

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

## Adding a case study

Copy a `.case-card` details block in `index.html`, then update its filter slugs, cover title and class, summary, Challenge, PalmChat role, Approach, Deliverables, Tools or methods, Intended impact, and any confidentiality note. Use careful language such as “designed to support” when verified outcomes are unavailable. Never invent statistics, logos, testimonials, partnerships, or outcomes.

## Updating services

Service content lives in the `.service-card` elements in `index.html`. Keep summaries concise and preserve native `details`/`summary` markup for keyboard and no-JavaScript access.

## Contact form

The form posts to `https://formspree.io/f/mjkezvrd`. To change the endpoint, update only the form `action` in `index.html`. `script.js` validates fields, sets `aria-invalid`, handles loading and network/server failures, resets after success, and uses an `aria-live` status. Keep the `_gotcha` honeypot and email fallback.

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
