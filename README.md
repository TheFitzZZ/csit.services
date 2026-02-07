# csit.services

Source repository for [csit.services](https://csit.services) — the business website of **Christoph Süßer IT Dienstleistungen (CSIT)**.

## Overview

A static, privacy-friendly single-page website for an IT services business based in northern Germany (Hamburg / Pinneberg / Itzehoe area). The site is hosted on **GitHub Pages** from the `docs/` directory.

## Tech Stack

- **Pure HTML, CSS & vanilla JS** — no frameworks, no build step
- **Self-hosted fonts** (Inter) — no external font services
- **Font Awesome** icons (bundled)
- **No cookies, no analytics, no third-party tracking** — no consent banner needed

## Structure

```
docs/                   ← GitHub Pages root
├── index.html          ← Main landing page (services, about, contact)
├── impressum/
│   └── index.html      ← Impressum & Datenschutzerklärung (legal/privacy)
├── css/
│   ├── modern.css      ← Main stylesheet
│   ├── fontawesome-all.min.css
│   └── ...
├── js/
│   └── main.js         ← UI logic (scroll, mobile nav, reveal animations)
├── fonts/inter/        ← Self-hosted Inter font files
├── img/                ← Site images & logo
├── webfonts/           ← Font Awesome icon font files
├── llms.txt            ← Machine-readable site summary
├── robots.txt          ← Crawler directives
└── sitemap.xml         ← XML sitemap
```

## Pages

| Route | Description |
|---|---|
| `/` | Landing page — hero, services overview, about section, contact CTA |
| `/impressum/` | Legal notice (§ 5 DDG) and privacy policy (DSGVO) |

## Local Preview

Serve the `docs/` directory with any static file server, e.g.:

```bash
cd docs && python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Deployment

The site is deployed automatically via **GitHub Pages** from the `docs/` folder on the default branch.
