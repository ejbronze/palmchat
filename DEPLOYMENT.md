# Deployment and domain notes

## Vercel preview and migration

The site is also configured for static Vercel hosting through `vercel.json`. Use a Vercel preview deployment to validate the site before changing production hosting. Moving `palmchat.io` from GitHub Pages to Vercel requires a separate, deliberate DNS change after the preview is approved; it is not performed by committing this configuration.

## Expected GitHub Pages configuration

This website is designed to run as a static GitHub Pages site from the repository root. The custom domain value is preserved in the `CNAME` file and should remain:

`palmchat.io`

Expected GitHub Pages settings:

- Source: GitHub Actions or the repository branch selected for static hosting
- Root folder: `/` (repository root)
- Custom domain: `palmchat.io`
- HTTPS: enabled after the custom domain is verified and the certificate is issued by GitHub Pages

## Required custom domain

The custom domain should point to GitHub Pages using the standard DNS setup expected by GitHub:

- A record: `palmchat.io` -> `github-pages-bot@github.com` or the current GitHub Pages IP guidance from the repository settings
- CNAME record for the `www` subdomain if used: `www` -> `<username>.github.io`

Important: DNS records must be managed outside this repository. This repository can only preserve the custom domain and the GitHub Pages configuration in the project itself.

## HTTPS and certificate checks

If the site shows a certificate or HTTPS problem, review the following:

1. Confirm the custom domain in GitHub Pages settings matches `palmchat.io`.
2. Confirm the `CNAME` file in the repository contains `palmchat.io` exactly.
3. Verify the domain is not still pending or incorrectly configured in DNS.
4. Wait for DNS propagation and GitHub certificate issuance.
5. Check GitHub Pages status and domain verification status in the repository settings.

A valid certificate usually appears after the custom domain has been configured and verified successfully.

## How to deploy future updates

1. Commit changes to the default branch.
2. Push to GitHub.
3. Confirm GitHub Pages picks up the new branch or deployment configuration.
4. Check the site after the deployment runs.

## How to confirm a successful deployment

- Visit https://palmchat.io/
- Confirm the site loads without mixed-content issues
- Confirm the custom domain resolves correctly
- Ensure the page title, metadata, and content are visible as expected

## When this repository cannot fix the domain

This repository cannot change external DNS records, registrar settings, or hosting provider configuration. If the certificate fails, the likely causes are:

- missing or incorrect DNS records
- propagation delay
- a custom domain mismatch in GitHub Pages settings
- stale or invalid certificate status while GitHub provisions the HTTPS certificate

In those cases, use the GitHub Pages domain settings UI and the DNS provider dashboard to verify the records and certificate status.
