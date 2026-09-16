# PalmChat design audit

## Current state

The repository is a dependency-free static site with generated multi-page HTML, shared CSS and JavaScript, five local SVG project covers, a Formspree contact form, and a valid Vercel configuration. Existing Vercel cleanUrls supports direct static routes; local and remote behavior must be verified separately. The custom domain is `palmchat.io`; `CNAME` remains for compatibility.

## What feels generic or AI-generated

- The previous single-page production design repeated rounded containers, pills, equal card grids, and long explanatory blocks.
- The current uncommitted multi-page pass improved structure, but its large pathway diagram, repeated oversized serif headings, dark navy panels, and diagram-heavy project art still feel more like an AI portfolio than an easy consulting site.
- Similar page heroes and repeated numbered structures make individual pages feel too templated.
- Decorative paths and abstract shapes compete with the actual service and project language.

## Remove or reduce

- Remove the large graph-like hero visualization and simplify the People → Practice → Programs → Impact idea into a compact typographic sequence.
- Remove navy, teal, coral, and off-palette error/focus colors.
- Reduce heading scale, long vertical gaps, dark full-bleed sections, and ornamental project diagrams.
- Remove the private school-meal product name from public content, routes, metadata, documentation, and filenames.
- Avoid filters, testimonials, statistics, client logos, and organizational marks.

## Preserve

- The static multi-page architecture and root-relative links.
- The six-item navigation, persistent conversation CTA, mobile Escape handling, and shared footer.
- The concise positioning statement, four service areas, five project narratives, founder positioning, and simple resources holding page.
- Formspree endpoint, validation, honeypot, loading, success/error handling, and email fallback.
- Vercel configuration, custom-domain references, and no-build deployment model.

## Simplify by page

- **Home:** keep seven short sections; replace the large diagram with typographic progression; add a compact services preview; show only three selected engagements.
- **Services:** retain horizontal editorial rows and concise detail pages; reduce repeated decoration.
- **Work:** present a numbered collection with restrained, text-led cover graphics; retain dedicated case studies.
- **About:** make the biography primary and keep a deliberate EJ monogram until an approved portrait exists.
- **Resources:** one holding statement, one compact typographic composition, and two contact actions.
- **Contact:** retain the split information/form layout and make the email fallback prominent.

## Components and interactions

- Redesign the header, buttons, project covers, founder monogram, section labels, and CTA bands using the four-color system.
- Keep the mobile menu, underline/arrow hover feedback, inline form errors, and mocked form states.
- Add only lightweight intersection reveals and a subtle scrolled-header state; disable both for reduced motion.

## Recommended sitemap

- `/`
- `/services/` and four service detail pages
- `/work/` and five case-study pages, including `/work/school-meal-platform`
- `/about/`
- `/resources/`
- `/contact/`
- `/privacy.html`

## Typography and color

- Use a restrained editorial serif for key headings and the system sans-serif stack for body copy and navigation; no external font dependency.
- Use only mustard `#D5A72C`, cottage shrub green `#4F683E`, white `#FFFDF8`, and light brown `#C7A982`, plus transparent variants of those colors.
- Green carries typography and structure, mustard signals action, white provides space, and brown supports rules and quiet panels.

## Confidentiality and attribution

- The school-meal platform must remain capability-level and anonymous; no product/company name, screenshots, data model, private workflows, or unreleased details.
- Organization-related routes remain as requested, but visible names use general descriptions pending explicit public naming permission. No logos, endorsements, current-client claims, statistics, testimonials, or measured outcomes are published.
- Where exact outcomes are unavailable, language stays limited to “designed to support,” “focused on,” “developed,” or “facilitated.”

## Implementation review — 15 September 2026

Reviewed the live homepage and EdTech Consulting reference, generator, generated pages, shared CSS/JS, assets and Vercel configuration before implementation. There is no package.json or framework build; `node scripts/build-pages.mjs` produces the deployable HTML. Existing uncommitted generator/CSS work is the starting point and is preserved where useful.

The live homepage still publishes a private product identity and uses a logo as a portrait placeholder. Remove the old case file and cover rather than leaving discoverable static URLs. Existing attribution on the live site establishes prior publication, but does not establish permission: use general project titles pending Edwin's approval. Keep the requested organization-related slugs for route compatibility, without client/partner claims. The reference informs reading pace and simple navigation only.

Use a text-only work index and case narratives: the existing chart-like covers suggest outcomes without evidence and are unnecessary. Remove the hero diagram entirely. Use a compact typographic founder signature, modest serif headlines, green-on-white text, mustard rules, and white-on-green actions. Mustard/green and brown/green do not meet normal-text contrast, so keep those combinations decorative only. Clean extensionless canonical URLs match existing Vercel cleanUrls behavior. Production settings and domain remain untouched.

## Final verification and design review

- Generated all 16 production pages successfully; JavaScript syntax and whitespace checks pass.
- Browser-tested every route directly and after refresh at 1440, 768, 390, and 320 pixels. Fixed the 320px header overflow; all widths now pass.
- All 16 internal route targets resolve. Images load; each page has one H1, a description, and a palmchat.io canonical URL.
- Menu opening, Escape with focus return, navigation closure, service disclosures, visible keyboard focus, and reduced motion pass.
- Form validation, invalid email, sending/disabled state, confirmed-success reset, HTTP failure, and network failure pass with intercepted requests. Three mocked requests, zero live submissions. The simulated network failure produces the expected browser resource error; normal navigation has no console or page errors.
- Green/white text contrast is 6.11:1. Mustard and brown are supporting decoration. Replacement assets total 59,528 bytes; there are no external fonts or UI libraries.
- Reviewed desktop Home, Work, About, Resources and Contact screenshots and the full mobile homepage. Layouts use different compositions, restrained headings, no cards or decorative charts, and short transitions.
- Prohibited product identity absent from current content, metadata, source, docs, and asset names. Obsolete public case and cover removed. No actual product imagery or organization logos.
- vercel.json and CNAME have no diff. The linked project, environment variables, DNS, and domain settings were not modified. No commits, pushes, deployments, or live form submissions occurred.

Remaining checks after approval: Vercel-hosted route behavior and remote project settings, actual Formspree delivery, final privacy wording, and any approved public organization names. No Lighthouse score or manual screen-reader certification is claimed.

## Follow-up: email-only contact

At Edwin’s request, removed the contact form and Formspree JavaScript. All email links now use erjaquez@gmail.com. The Contact page has a direct email invitation, Resources requests updates by email, and Privacy/README reflect the new flow. Earlier form verification above records the prior implementation. No email was sent and no deployment was performed.
