# Group B Team 8 — Golden Hour Studio (Photography Portfolio)

Assignment 2 rebuild of our photography portfolio: **React**, **Vite**, and **Tailwind CSS**. Same brand and content as Assignment 1 (plain HTML/CSS), with a component-based layout and interactive gallery.

Assignment 3 adds a **client/server split**: Vite frontend in `client/`, Express API in `server/`.

## Live demo

_Add your Vercel frontend URL here after publishing._

## Repository

- [GitHub — Group-B-Team-8-Photography-Portfolio](https://github.com/Oluwashina/Group-B-Team-8-Photography-Portfolio)

## About the site

**Golden Hour Studio** is a single-page portfolio focused on portrait and landscape work. The gallery is the centerpiece; the about section stays short; contact replaces a shop flow with a **mailto** form.

## Tech stack

| Layer | Choice |
|-------|--------|
| Client | [Vite](https://vite.dev/) + [React](https://react.dev/) (JavaScript) |
| Client styling | [Tailwind CSS](https://tailwindcss.com/) v4 (`@tailwindcss/vite`) |
| Server | [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/) |
| Database | [Neon](https://neon.tech/) Postgres |
| Data | Gallery items in Postgres; client loads via `GET /api/gallery` |

No extra UI libraries (no React Router, no component kits).

## Features

- **Component layout:** `Header`, `Hero`, `MainContent` (gallery, about, contact), `Footer`
- **Data-driven gallery:** `client/src/data/galleryItems.js` — ten items rendered with `.map()`, not duplicated JSX
- **Site copy:** `client/src/data/siteContent.js` for nav, hero, sections, footer
- **Gallery filter:** category buttons with `useState`
- **Gallery search:** controlled `SearchInput` (filters caption, category, and alt text)
- **Save favorites:** bookmark on `GalleryCard` via `FavoriteToggle` — **sign in required**; saved to Postgres `favorites` table per user
- **Responsive:** mobile-first Tailwind (`sm:`, `md:`, `lg:`)
- **Accessibility:** skip link, semantic landmarks, one `<h1>`, labeled form fields, image `alt` text, bookmark buttons with `aria-pressed`

## Project structure

```text
client/                   # Vite + React (deploy to Vercel)
  public/assets/images/
  src/
    components/
    data/
    App.jsx
    main.jsx
    index.css
  index.html
  vite.config.js
  .env.example            # VITE_API_URL for production
  src/api/                # fetch helpers
server/                   # Express API (deploy to Railway next)
  db/
    schema.sql
    pool.js
    migrate.js
  routes/
    gallery.js
  seed.js
  index.js
  .env.example
  package.json
package.json              # Root scripts: dev:client, dev:server
README.md
```

## Getting started

**Requirements:** Node.js 18+ (LTS recommended)

Install dependencies in both apps:

```bash
cd client && npm install
cd ../server && npm install
```

### Client (frontend)

```bash
npm run dev:client
# or: cd client && npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Server (API)

Copy env template and start the API:

```bash
cd server
cp .env.example .env
npm run dev
```

Health check: [http://localhost:3001/api/health](http://localhost:3001/api/health) should return JSON with `"database": "connected"` when Neon is wired up.

### Database (Neon)

1. In Neon, create a project and copy the **connection string** into `server/.env` as `DATABASE_URL`.
2. Add your **Vercel URL** to `CLIENT_URL` (comma-separated with `http://localhost:5173`) for CORS when you test from production later.
3. Apply schema and seed gallery rows:

```bash
cd server
npm run db:setup
```

| Script | Purpose |
|--------|---------|
| `npm run db:migrate` | Creates `gallery_items`, `users`, `session`, `favorites` tables |
| `npm run db:seed` | Inserts/updates 10 photos from `galleryItems.js` |
| `npm run db:setup` | Runs migrate then seed |

**API:**

| Route | Purpose |
|-------|---------|
| `GET /api/gallery` | Gallery JSON from Postgres |
| `POST /api/auth/signup` | Create account (bcrypt password hash) |
| `POST /api/auth/login` | Start session cookie |
| `POST /api/auth/logout` | End session |
| `GET /api/auth/me` | Current user or `{ user: null }` |
| `GET /api/favorites` | Saved gallery item ids (requires login) |
| `POST /api/favorites/:galleryItemId` | Save a bookmark |
| `DELETE /api/favorites/:galleryItemId` | Remove a bookmark |

Set **`SESSION_SECRET`** in `server/.env` — a private key used to sign login cookies (never commit it; set the same variable on Railway for production). Generate one locally:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Sessions are stored in Postgres (`session` table) via `express-session` + `connect-pg-simple`. Restart the API after changing `SESSION_SECRET`.

**Users table:** `email`, optional **`name`** (display name at signup), `password_hash`. If you already deployed before `name` existed, run `npm run db:migrate` in `server/` — it runs `ALTER TABLE users ADD COLUMN IF NOT EXISTS name TEXT`. Existing accounts keep working; the navbar shows **Welcome, {email}** until they have a name (new signups require name).

### Client ↔ API

With both dev servers running, the gallery fetches from the API automatically:

```bash
npm run dev:server   # :3001
npm run dev:client   # :5173 — Vite proxies /api → localhost:3001
```

For production (Vercel + API host), set **`VITE_API_URL`** to your public API origin (see `client/.env.example`). On the server set **`COOKIE_SECURE=true`** and **`COOKIE_SAME_SITE=none`**, and include your Vercel URL in **`CLIENT_URL`**. Auth requests use `credentials: 'include'` so the session cookie is sent cross-origin.

### Root scripts

From the repo root:

```bash
npm run dev:client
npm run dev:server
npm run build    # client production build → client/dist/
npm run lint     # ESLint in client/
```

## Deploy frontend on Vercel

Use Vercel for the **client only**. The Express app in `server/` should be hosted elsewhere (e.g. Railway) once the database and auth are added.

1. Import this GitHub repo in [Vercel](https://vercel.com).
2. Set **Root Directory** to `client` (required — the Vite app is not at the repo root).
3. **Framework Preset:** Vite (defaults are usually fine).
4. **Build Command:** `npm run build`
5. **Output Directory:** `dist`
6. **Install Command:** `npm install`

After the API is live, add an environment variable in Vercel → **Settings → Environment Variables**:

| Name | Example | Notes |
|------|---------|--------|
| `VITE_API_URL` | `https://your-api.up.railway.app` | Public API base URL; redeploy after changing |

Only variables prefixed with `VITE_` are exposed to the browser. Never put `DATABASE_URL` or `SESSION_SECRET` in Vercel client env.

## Assignment 2 checklist

| Requirement | Implementation |
|-------------|----------------|
| Vite + React in existing repo | `client/vite.config.js`, `client/src/main.jsx` |
| Header, hero, main content, footer | `client/src/components/` + `App.jsx` |
| Listed items in one data file | `client/src/data/galleryItems.js` |
| Tailwind wired, no Assignment 1 `styles.css` | `client/src/index.css`; legacy CSS removed |
| Filter on main grid + `useState` | Category filter in `Gallery.jsx` |
| Controlled component | `SearchInput` (gallery search); `FavoriteToggle` on each card |
| Mobile-first responsive Tailwind | Utility classes across components |
| Small commits | Feature commits on branch |
| No horizontal scroll | Test at 320px / tablet / desktop |

## Team

Group B — Team 8 (Mayerfeld Practicum)

## License

Portfolio images and site content © Golden Hour Studio / Group B Team 8.
