# PalmChat Innovations

A text-led, founder-led education consulting website for PalmChat Innovations LLC. Semantic HTML, local CSS, and dependency-free JavaScript; no framework migration, npm dependencies, package.json, external fonts, or runtime build service.

## Develop and preview

```sh
node scripts/build-pages.mjs
node scripts/preview.mjs
```

Open http://127.0.0.1:8765. The local server resolves extensionless URLs like the existing Vercel cleanUrls configuration. Stop it with Ctrl+C. Edit shared content in `scripts/build-pages.mjs`, then regenerate; edit `styles.css` and `script.js` directly. Generated HTML is the production output. There is no separate compilation step.

## Routes

- `/`
- `/services`
- `/services/professional-learning`
- `/services/computer-science`
- `/services/ai-emerging-technology`
- `/services/curriculum-product-development`
- `/work`
- `/work/district-16`
- `/work/mouse-ai-fluency`
- `/work/exact-path`
- `/work/school-meal-platform`
- `/work/cornell-tech`
- `/about`
- `/resources`
- `/contact`
- `/privacy`

Section routes resolve to directory indexes; detail routes resolve to HTML files. Canonical metadata uses `https://palmchat.io` and clean paths. No client router or catch-all rewrite is needed.

## Hosting and release

The existing Vercel project is already linked and hosted at `palmchat.io`. Preserve `.vercel`, `vercel.json`, CNAME, HTTPS, environment variables, project settings, and DNS. The static site deploys from the repository root with its existing no-build settings. Do not re-import the project or follow a domain migration procedure.

After Edwin approves the finished work, commit and push using the existing release workflow. Any preview or production deployment requires approval. Verify all direct URLs and refreshes on the approved preview before publishing. Local checks cannot prove remote project settings or HTTPS configuration; this redesign does not change them.

## Content maintenance

Service records live in the generator's `services` array. Update descriptions, audiences, problems, support, and engagement formats there and regenerate.

Add a case study to `projects` with a unique slug, accurate title, description, context, role, approach, deliverables, methods, intended impact, and existing related slugs. Regenerate and verify the new route. Covers are optional and currently omitted to keep the work text-led. Do not invent outcomes or imply endorsement. Obtain public naming permission before replacing the general organization descriptions. The requested organization-related slugs remain for compatibility.

The school-meal case is intentionally anonymous and capability-level only. Never add actual branding, screenshots, internal workflows, business rules, private data, or implementation details. Any future visual must be fictionalized and explicitly approved.

## Assets

`assets/brand/` contains the palm-and-bird mark, horizontal/reverse wordmarks, SVG favicon, and 180px Apple touch icon. `assets/social/` contains the 1200×630 PNG social preview. Assets use versioned filenames because existing Vercel asset headers cache files for a year. Use a new filename when replacing one and update the generator references.

The About portrait is an intentional HTML/CSS EJ monogram, not the company logo. To replace it, add an optimized approved photo under `assets/images/`, update `.ej-portrait` in the generator with an image and accurate alt text, provide width/height, and regenerate. No stock or generated photography is used. See ASSET_CHECKLIST.md for outstanding approvals and assets.

## Contact

Contact is email-only at `erjaquez@gmail.com`. The contact page and footer link directly to this address. Resource update requests open an email with a prefilled subject; there is no mailing-list subscription. Update the email in `scripts/build-pages.mjs` and regenerate to change it across all pages. No contact form or Formspree integration remains.

## Verification

Regenerate production HTML with `node scripts/build-pages.mjs`; run `node --check script.js` and `git diff --check`. Start the preview and check all listed routes directly and after refresh. Browser verification should cover desktop, tablet, 390px and 320px mobile widths, keyboard focus, Escape and navigation closure, service disclosures, reduced motion, broken assets, metadata, and console errors.

The reusable browser check is `tests/e2e/verify.cjs`. It requires Playwright installed in your tooling environment, not in production. Run `PLAYWRIGHT_MODULE=/absolute/path/to/playwright node tests/e2e/verify.cjs` while the preview is running. It checks that the contact page has no form and that email links use the current address. Screenshots are written to the operating system temporary directory.

Green (#4F683E) on white (#FFFDF8) is used for text and the inverse for filled sections. Mustard (#D5A72C) and light brown (#C7A982) are decorative, not normal-text backgrounds. Check contrast when introducing new combinations. Content stays visible without animation; reduced-motion settings remove transitions and scrolling effects.

For performance, keep scripts and fonts local, preserve explicit image dimensions, compress future portrait assets, and run Lighthouse against an approved preview. No Lighthouse score is claimed. The current site needs no third-party UI libraries.

## Known limitations

Public organization naming permission, an approved portrait, LinkedIn URL, and final privacy wording remain outstanding. No client logos, testimonials, fabricated downloads, or newsletter signup appear. The privacy page describes the current contact flow; business retention policies require owner review. Remote Vercel routing must be confirmed after approval; no deployment was performed during the redesign.
