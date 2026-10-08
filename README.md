# Group B Team 8: Photography Portfolio

Single-page, responsive photography portfolio. The **gallery grid** is the centerpiece; images use **`object-fit: cover`** inside fixed-aspect tiles. **About** stays short. A **shop** CTA is replaced with a **contact form** (in-page `#contact`).

Built with **plain HTML5 and CSS3**. No CSS frameworks or JavaScript libraries for layout.

## Repository

- [GitHub: Group-B-Team-8-Photography-Portfolio](https://github.com/Oluwashina/Group-B-Team-8-Photography-Portfolio)

## Live demo

_Add a link after deploying (e.g. GitHub Pages)._

## Requirements

| Requirement | Implementation |
|-------------|----------------|
| GitHub + small commits | Incremental commits (skeleton → base CSS → sections → gallery → responsive polish) |
| Single page, responsive | One `index.html`; breakpoints for phone, tablet, desktop |
| HTML5 / CSS3 only | No Bootstrap, Tailwind, React, etc. |
| Semantic landmarks | `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>` |
| One `<h1>` | Site title only; sections use `<h2>` and below |
| Working nav | Anchor links to `#gallery`, `#about`, `#contact` |
| `box-sizing: border-box` | Global rule on all elements |
| CSS custom properties | Color palette (and optional spacing) on `:root` |
| Flexbox | Header/navigation, contact layout, footer, etc. |
| CSS Grid | Image gallery |
| No horizontal scroll | Fluid widths, constrained media, tested at common viewport sizes |

## Planned structure

```
PhotographyPorfolio/
├── index.html
├── css/
│   └── styles.css
├── assets/
│   └── images/
└── README.md
```

## Local preview

Open `index.html` in a browser, or run a simple static server:

```bash
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).

## Design notes

- **Gallery:** CSS Grid; each cell uses a wrapper with a set aspect ratio and `<img>` with `width`/`height` 100%, `object-fit: cover`, and `object-position: center`.
- **Contact:** Semantic `<form>` with labels, accessible inputs, and a submit control (action can be `mailto:` or a placeholder until backend exists).
- **Overflow:** Avoid horizontal scroll by fixing layout causes (wide fixed pixels, `100vw` + padding, unscaled images) rather than relying only on `overflow-x: hidden`.

## Suggested commit flow

1. Add README and project structure  
2. HTML skeleton with landmarks, one `h1`, and nav anchors  
3. Global CSS: reset, `border-box`, variables  
4. Header and navigation (Flexbox)  
5. Gallery section (Grid + `object-fit: cover`)  
6. Short about section  
7. Contact form section  
8. Responsive breakpoints and overflow fixes  
9. Content, images, and final polish  

## Team

Group B, Team 8 (Mayerfeld Practicum, Assessment 1)
