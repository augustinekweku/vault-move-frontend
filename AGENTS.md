# AGENTS.md

Guidance for AI coding agents working in this repository.

## Project Overview

**Vault Move Africa** — frontend for a real-estate platform (Ghana-first): property
buy/rent listings, escrow-secured transactions, and portals for agents, landlords,
and real-estate developers. UI is implemented from a Figma file ("VAULTMOVE");
some pages still contain lorem-ipsum placeholder copy and mock data.

## Stack

- **React 19** + **React Router 8** (framework mode, SSR) — routes declared manually in `app/routes.ts`
- **TypeScript** (strict, `verbatimModuleSyntax`)
- **Tailwind CSS v4** via `@tailwindcss/vite` — theme tokens live in `app/app.css` under `@theme`
- **axios** for the API layer
- **Vite 8**, path alias `~/*` → `./app/*` (tsconfig paths)

## Commands

```bash
npm run dev        # dev server with HMR → http://localhost:5173
npm run build      # production build → build/client + build/server
npm run start      # serve the production build
npm run typecheck  # react-router typegen && tsc  ← run this after changes
```

There is no test suite or linter configured — `npm run typecheck` + `npm run build`
are the verification gates. Note: React Router 8 wants Node > 22.22.0; older 22.x
prints a warning but still works.

## Directory Structure

```
app/
  routes.ts               # manual route config (all pages under SiteLayout)
  routes/                 # one file per page: home, buy, rent, about, contact,
                          # portals, faq, privacy, terms
  components/
    ui/                   # primitives: Button, IconButton, Input, Select, Tabs,
                          # Accordion, Badge, Container, SectionHeading, icons.tsx
    common/               # shared across pages: PageHero, ContactForm, WaitlistSection
    layout/               # SiteLayout, Navbar, TopBar, MobileMenu, Footer, Logo
    home/  about/  contact/  faq/  privacy/  portals/  terms/
                          # page-specific sections (one folder per page)
    property/             # PropertyCard, PropertyGrid, PropertySearchBar, SearchResults
  data/                   # static/mock content: listings, navigation, portals,
                          # about, contact, faq, terms
  types/index.ts          # ALL shared interfaces/types live here
  services/               # api.ts (axios instance + `http` helper), listings.service.ts
  lib/utils.ts            # cn() classname joiner
  app.css                 # Tailwind v4 theme tokens + base styles
public/
  icons/  images/         # static assets referenced as /icons/..., /images/...
```

## Conventions

- **Imports**: use the `~` alias (`~/components/ui/Container`), never deep relative paths.
  With `verbatimModuleSyntax`, type-only imports must use `import type`.
- **Types**: shared interfaces go in `app/types/index.ts`; data files import them from `~/types`.
- **Data**: static page content (nav, steps, feature blocks, mock listings) lives in
  `app/data/*.ts` as typed exported constants (`UPPER_SNAKE_CASE`). Icon component
  references may be stored directly in data (see `data/portals.ts`).
- **Components**: page-specific sections go in `app/components/<page>/`; reusable
  cross-page pieces in `common/`; generic primitives in `ui/`. Route files should be
  thin composition + `meta()` only.
- **Styling**: utility-first Tailwind v4. Use theme tokens, not raw hex:
  `brand` (#1e347a), `brand-dark`, `brand-navy`, `accent` (#04ce9d), `accent-soft`,
  `ink`, `ink-muted`, `surface`, `surface-alt`, `line`. Font is Poppins (set in
  `@theme`, loaded via Google Fonts in `app/root.tsx`).
  Arbitrary numeric spacing values work (e.g. `h-108.5`).
- **Layout**: wrap page content in `<Container>` (max-w-1280px, responsive px).
  Inner pages use `<PageHero>` (blue banner with breadcrumbs, title, subtitle) —
  it is flow-based; do NOT reintroduce Figma pixel-exact absolute positioning.
- **Accent text in headings**: `<span className="text-accent">…</span>`; add `block`
  when the Figma puts the accent part on its own line.
- **Button**: pass `to="/path"` to render a React Router `<Link>`; otherwise a `<button>`.
- **API**: call the backend through the typed `http` helper in `services/api.ts`
  (base URL from `VITE_API_URL`, bearer token from `localStorage.vm_token`).
  All browser-only access must stay `typeof window !== "undefined"`-guarded (SSR).
- **Class merging**: use `cn()` from `~/lib/utils`.

## Gotchas

- **SSR**: components render on the server — no unguarded `window`/`localStorage`.
- **Mock data is deterministic** on purpose (`MOCK_LISTINGS` uses a fixed pattern, no
  `Math.random()`), so SSR and client markup match — keep it that way.
- **Route changes**: register new pages in `app/routes.ts` (not file-system routing).
- **Deployment**: Dockerfile provided; serve `build/server/index.js`.
- If you change structure, tokens, or conventions described here, update this file.
