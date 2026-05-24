# Skidderdone Services — Agent Instructions

Static local-business website for Skiderdone Services (grading & excavation, Big Bend WI). No build system, no package manager, no frameworks.

## Stack

- **HTML/CSS/JS**: Plain vanilla — single page (`index.html`), one stylesheet (`style.css`), one script (`main.js`)
- **Deployment**: GitHub Pages via GitHub Actions on push to `master` ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml))
- **Contact form**: [formsubmit.co](https://formsubmit.co) — no backend required
- **Fonts**: Inter (body) + Oswald (headings) — loaded from Google Fonts in `<head>`

## Project Layout

| File/Dir | Purpose |
|----------|---------|
| `index.html` | Single-page site — all sections in one file |
| `style.css` | All styles — CSS custom properties at the top in `:root` |
| `main.js` | Mobile nav toggle, scroll effect, form success detection |
| `assets/images/` | All images — use `loading="lazy"` on below-fold images |
| `_headers` | HTTP security & cache headers (applied by CDN layer) |

## Conventions

### Design Tokens (CSS Custom Properties)
All colours and fonts are declared as CSS variables in `style.css` `:root`. **Always use these instead of raw values:**

```css
--color-accent: #E87A1E         /* orange CTA colour */
--color-accent-hover: #ff8c2e
--color-bg-primary: #1a1a1a     /* page background */
--color-bg-secondary: #2d2d2d
--color-bg-dark: #111111
--color-text-primary: #FFFFFF
--color-text-secondary: #B0B0B0
--font-heading: 'Oswald', sans-serif
--font-body: 'Inter', sans-serif
--max-width: 1200px
```

### HTML Structure
- Sections follow the pattern: `<section class="section [section-alt|section-dark]" id="…">`
- Content is wrapped in `<div class="container">` inside each section
- Section headings use the markup pattern:
  ```html
  <div class="section-header">
      <div class="accent-line"></div>
      <h2>Title</h2>
      <p>Optional subtitle</p>
  </div>
  ```

### Images
- Always include `width` and `height` attributes to prevent layout shift
- Use `loading="lazy"` on all images below the fold (everything below the hero)
- Images live in `assets/images/` — reference with `./assets/images/filename`

### Contact Form
- Handled by formsubmit.co (POST to `https://formsubmit.co/skiderdoneservices@gmail.com`)
- Honeypot field `_honey` is present for spam protection — do not remove
- On success, the page reloads with `#contact?status=sent` hash — `main.js` detects this and shows the success message

### SEO / Schema
- Schema.org `LocalBusiness` JSON-LD is in `<head>` — keep it up to date if business details change
- Canonical URL points to `https://amg262.github.io/skidderdone/`
- OG tags are in `<head>` directly above the Schema block

## Deployment
Push to `master` triggers automatic deployment to GitHub Pages. There is no staging environment — changes go live immediately.

## Common Pitfalls
- **No build step**: Changes to `style.css`, `main.js`, or `index.html` take effect immediately — no compilation needed
- **`_headers` is not natively supported by GitHub Pages** — the file is in place for if/when the site is served behind a CDN (e.g. Cloudflare)
- **Branch is `master`**, not `main` — the Actions workflow watches `master`
