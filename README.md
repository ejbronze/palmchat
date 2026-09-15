# PalmChat Innovations

PalmChat Innovations is a small education consulting and learning design studio focused on helping schools, education organizations, and learning teams turn emerging technology and instructional strategy into practical, high-impact teaching and learning experiences.

## Project overview

This repository hosts the PalmChat Innovations website, designed to be lightweight, accessible, and fully compatible with GitHub Pages. The site is built with plain HTML, CSS, and JavaScript so it remains fast to load and easy to maintain without a framework.

The current website is a single-page experience with clear sections for:

- Home
- Services
- Work / Case Studies
- About Edwin
- Resources
- Contact

The branding centers on deep navy, palm green/teal accents, warm cream backgrounds, and editorial typography to communicate a strategic, credible, and approachable education consultancy.

## Local development

To preview the site locally:

1. Open a terminal in this project folder.
2. Run a local web server:
   ```bash
   python3 -m http.server 8000
   ```
3. Visit http://localhost:8000

## Previewing before deployment

Because this repository is intended for GitHub Pages, the simplest preview path is to serve the repository root locally and review the page in a browser. The site is static, so there is no build step required.

## Deployment through GitHub Pages

1. In the GitHub repository, open Settings.
2. Navigate to Pages.
3. Set the source to the default branch (for example, `main`).
4. Keep the root folder selected if the site is served from the repository root.
5. Confirm that the CNAME file remains `palmchat.io`.
6. Save the settings and allow GitHub Pages to publish.

## Asset guidelines

- Preserve the existing PalmChat logo unless there is a strong reason to replace it.
- Keep assets in the root `assets/` folder for simplicity and GitHub Pages compatibility.
- If additional branded assets are created, prefer organized folders such as `assets/brand`, `assets/icons`, `assets/images`, and `assets/social`.
- Do not add fake or misleading testimonials, logos, or performance claims.
- Use the PNG logo as the fallback asset while keeping the site lightweight.

## Brand usage guidance

- Maintain the PalmChat name and identity as the primary visual anchor.
- Use the warm cream and navy palette to keep the site polished and credible.
- Use accent color sparingly and only to highlight actions or key points.
- Keep adoption of AI or emerging technology practical and grounded in educational outcomes, not hype.
- Avoid overly literal Caribbean imagery or generalized stock-photo design patterns.

## Updating case studies

To update the Work section, edit the relevant `details` elements in `index.html`.

Each case study includes:

- Challenge
- Approach
- Deliverables
- Result or intended impact
- Skills and tools used

When writing new case studies:

- Use careful language such as “designed to support,” “focused on,” or “intended to help.”
- Avoid inventing client statistics, awards, logos, or outcomes.
- Mark confidential or sensitive work clearly using general descriptions where needed.

## Updating contact form content

The contact form currently uses the existing Formspree endpoint:

- https://formspree.io/f/mjkezvrd

If the form needs updates:

- edit the form fields in `index.html`
- keep the fallback email `ejaquez@palmchat.io`
- ensure the form remains accessible and includes validation, loading state, and success/error feedback

## Accessibility and performance checks

Before publishing, review the site for:

- keyboard navigation and visible focus states
- semantic headings and logical page structure
- sufficient color contrast
- reduced-motion support via `prefers-reduced-motion`
- responsive behavior from mobile through desktop sizes
- no dead links or broken asset paths
- lightweight, static assets to maintain fast load times

## Future improvements

Suggested next steps:

- add a real founder photo if approved
- expand the resources section with publishable articles or downloadable guides
- add additional case studies as new work is approved
- create more branded asset files if the site evolves beyond the current static page
- consider a lightweight CMS or static site generator only if future content volume requires it

## Notes on domain and deployment

The repository includes a `CNAME` file with the custom domain value `palmchat.io`. This should remain intact for GitHub Pages hosting.

For domain and HTTPS troubleshooting, see `DEPLOYMENT.md` for the expected GitHub Pages configuration and DNS verification notes.
