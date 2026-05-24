# Skidderdone Services

Static marketing website for **Skidderdone Services**, a grading and excavation company based in Big Bend, Wisconsin. Built with plain HTML, CSS, and vanilla JavaScript — no build tools, no dependencies, no framework.

Live site: [https://amg262.github.io/skidderdone/](https://amg262.github.io/skidderdone/)

---

## Features

- Services showcase (grading, excavation, site prep, land clearing, driveways & foundations, drainage)
- Equipment gallery
- Quote request form via [Web3Forms](https://web3forms.com/)
- Mobile-responsive with hamburger navigation
- SEO-optimized with Schema.org LocalBusiness JSON-LD and Open Graph tags
- Deployed automatically to GitHub Pages on every push to `master`

## Project Structure

```
skidderdone/
├── index.html              # Single-page site (all sections)
├── style.css               # All styling with CSS custom properties
├── main.js                 # Nav toggle, scroll behavior, form success detection
├── _headers                # HTTP security & cache headers (for CDN layer)
├── assets/
│   └── images/             # Logo, hero, equipment photos, favicon
└── .github/
    └── workflows/
        └── deploy.yml      # Auto-deploy to GitHub Pages on push to master
```

## Local Development

No installation needed. Serve the directory with any static file server:

```bash
# Python
python -m http.server 8000

# Node (npx)
npx serve -l 3000 .

# PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser. Edit `index.html`, `style.css`, or `main.js` directly — changes reflect immediately on reload.

## Deployment

Push to the `master` branch. GitHub Actions automatically builds and deploys to GitHub Pages.

```
git push origin master
```

No staging environment — changes go live immediately.

## Configuration

### Design Tokens

All colors, fonts, and spacing are defined as CSS custom properties in `:root` inside `style.css`:

```css
--color-accent: #E87A1E        /* Orange CTA buttons */
--color-bg-primary: #1a1a1a   /* Dark background */
--font-heading: 'Oswald'
--font-body: 'Inter'
```

### Contact Form

The form posts to Web3Forms. The access key and redirect URL are set in `index.html`:

```html
<input type="hidden" name="access_key" value="...">
<input type="hidden" name="redirect" value="https://amg262.github.io/skidderdone/#contact?status=sent">
```

A honeypot `botcheck` field provides basic spam protection. On success, the page redirects with `?status=sent` in the URL hash, which `main.js` detects to display a success message.

### HTTP Headers

`_headers` defines security and cache-control headers for a CDN layer (e.g., Cloudflare). These are not applied by GitHub Pages directly.

## Business Info

| Field | Value |
|-------|-------|
| Phone | 262-345-SKID (262-345-7543) |
| Email | skiderdoneservices@gmail.com |
| Location | Big Bend, Wisconsin |
| Service radius | ~50 km |
