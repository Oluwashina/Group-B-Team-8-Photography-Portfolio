# Group B Team 8 — Golden Hour Studio (Photography Portfolio)

Assignment 2 rebuild of our photography portfolio: **React**, **Vite**, and **Tailwind CSS**. Same brand and content as Assignment 1 (plain HTML/CSS), with a component-based layout and interactive gallery.

## Live demo

_Add your deployed URL here (e.g. GitHub Pages) after publishing._

## Repository

- [GitHub — Group-B-Team-8-Photography-Portfolio](https://github.com/Oluwashina/Group-B-Team-8-Photography-Portfolio)

## About the site

**Golden Hour Studio** is a single-page portfolio focused on portrait and landscape work. The gallery is the centerpiece; the about section stays short; contact replaces a shop flow with a **mailto** form.

## Tech stack

| Layer | Choice |
|-------|--------|
| Build | [Vite](https://vite.dev/) |
| UI | [React](https://react.dev/) (JavaScript, no TypeScript) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) v4 (`@tailwindcss/vite`) |
| Data | Hardcoded modules (no backend until Week 3) |

No extra UI libraries (no React Router, no component kits).

## Features

- **Component layout:** `Header`, `Hero`, `MainContent` (gallery, about, contact), `Footer`
- **Data-driven gallery:** `src/data/galleryItems.js` — ten items rendered with `.map()`, not duplicated JSX
- **Site copy:** `src/data/siteContent.js` for nav, hero, sections, footer
- **Gallery filter:** category buttons with `useState`
- **Gallery search:** controlled `SearchInput` (filters caption, category, and alt text)
- **Responsive:** mobile-first Tailwind (`sm:`, `md:`, `lg:`)
- **Accessibility:** skip link, semantic landmarks, one `<h1>`, labeled form fields, image `alt` text

## Project structure

```text
public/
  assets/images/          # Gallery JPGs (served at /assets/images/...)
src/
  components/
    Header.jsx
    Hero.jsx
    MainContent.jsx
    Footer.jsx
    Gallery.jsx
    GalleryCard.jsx
    About.jsx
    Contact.jsx
    SearchInput.jsx
    SectionHeader.jsx
  data/
    galleryItems.js
    siteContent.js
  App.jsx
  main.jsx
  index.css               # Tailwind entry
index.html
vite.config.js
index.a1.html             # Assignment 1 reference (archived markup)
```

## Getting started

**Requirements:** Node.js 18+ (LTS recommended)

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually [http://localhost:5173](http://localhost:5173)).

### Other scripts

```bash
npm run build    # Production build → dist/
npm run preview  # Preview production build locally
npm run lint     # ESLint
```

## Assignment 2 checklist

| Requirement | Implementation |
|-------------|----------------|
| Vite + React in existing repo | Root `vite.config.js`, `src/main.jsx` |
| Header, hero, main content, footer | `src/components/` + `App.jsx` |
| Listed items in one data file | `src/data/galleryItems.js` |
| Tailwind wired, no Assignment 1 `styles.css` | `src/index.css`; legacy CSS removed |
| Filter on main grid + `useState` | Category filter in `Gallery.jsx` |
| Controlled component | `SearchInput` (search query state) |
| Mobile-first responsive Tailwind | Utility classes across components |
| Small commits | Feature commits on `assignment-2-react` branch |
| No horizontal scroll | Test at 320px / tablet / desktop |

## Deployment notes (optional)

For **GitHub Pages**, set `base` in `vite.config.js` to your repo name if assets fail to load, then build and deploy the `dist/` folder. Document the public URL in **Live demo** above.

## Team

Group B — Team 8 (Mayerfeld Practicum)

## License

Portfolio images and site content © Golden Hour Studio / Group B Team 8.
