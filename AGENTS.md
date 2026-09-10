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
- **leaflet** (+ OSM tiles) for interactive maps — see MapView gotcha below
- **Vite 8**, path alias `~/*` → `./app/*` (tsconfig paths)

## Commands

```bash
npm run dev        # dev server with HMR → http://localhost:5173
npm run build      # production build → build/client + build/server
npm run start      # serve the production build
npm run typecheck  # react-router typegen && tsc  ← run this after changes
```

There is no test suite or linter configured — `npm run typecheck` + `npm run build`
are the verification gates.

## Directory Structure

```
app/
  routes.ts               # manual route config
  routes/                 # one file per page (thin: meta + loader + compose sections)
  components/
    ui/                   # primitives: Button, IconButton, Input, Select, DateField,
                          # Tabs, Accordion, Badge, Container, SectionHeading, Toast,
                          # Modal, icons.tsx
    common/               # PageHero, ContactForm, WaitlistSection, LegalDocContent
    layout/               # SiteLayout, Navbar, TopBar, MobileMenu, Footer, Logo
    home/  about/  contact/  faq/  privacy/  portals/  resources/
    auth/                 # AuthLayout, SignUpFlow, ProfileSetupFlow, SelectUserType, login/signup forms
    dashboard/            # PortalLayout, PortalSideMenu, PortalHeader (landlord portal);
                          # DashboardLayout, DashboardNavbar, UserMenu, DashboardHero,
                          # DashboardStats, RecentListings, ProfileStatusCard, MessagesCard,
                          # EmptyState, SavedPropertiesSection, AccountSection, CompleteProfileModal
    landlord/             # LandlordHeader, LandlordStats
    deal-room/            # deal list + deal-detail step panels
    enquiry/              # property-contact: chat, viewing, offers
    property/             # cards, search, filters, MapView, details sections
  data/                   # static CMS/copy + mock domain fixtures (UPPER_SNAKE_CASE)
  types/index.ts          # ALL shared interfaces/types
  services/               # api.ts (axios + http helper), listings, landlords, deals
  lib/utils.ts            # cn() + scrollToTop()
  lib/wishlist.ts         # in-memory saved-property ids (useSyncExternalStore)
  lib/date.ts             # calendar helpers for DateField
  app.css                 # Tailwind v4 @theme tokens + base styles + no-scrollbar
public/
  icons/  images/         # /icons/..., /images/...
```

### Routes (layouts)

| Layout | Routes |
|--------|--------|
| `SiteLayout` (marketing nav/footer) | `/`, buy, rent, map-view, about, contact, portals, faq, resources, resources/:articleId, properties/:propertyId, properties/:propertyId/contact, landlords/:landlordId, privacy, terms, escrow-terms |
| None (each page wraps `AuthLayout`) | signup, login, setup-profile |
| None (standalone onboarding page, no `AuthLayout`) | select-user-type (portal audience picker; Continue → signup) |
| `PortalLayout` (landlord/agent/developer side menu) | dashboard, dashboard/create-listing |
| `DashboardLayout` (signed-in nav) | deal-room, deal-room/:dealId, saved-properties, my-account |

Dashboard routes are **not auth-guarded** yet — `/dashboard` assumes a signed-in landlord/agent/developer, the other dashboard routes assume a signed-in buyer/renter.

For page behaviour and mock interaction details, read the route file and its section components — do not re-document UX flows here.

## Data layer

- **Domain reads** should go through `app/services/*` (`listings`, `landlords`, `deals`). Each service has a `USE_MOCK` flag and returns typed data; swap bodies for `http.*` when the backend is live. Listing/landlord/deal-detail loaders already do this.
- **Static CMS/copy** stays in `app/data/*` (nav, faq, legal, home steps, portals, auth wizard options, filter labels, toast step copy, account tabs). Components may import these directly.
- **Mock domain fixtures** also live in `app/data/*` (`MOCK_LISTINGS`, `MOCK_DEALS`, `MOCK_CONVERSATIONS`, etc.). Prefer accessing them only from services. Still imported directly today: enquiry components, `DealsSection`, `SavedPropertiesSection`, and `property-contact` (`MOCK_COUNTER_OFFER`) — route those through services before wiring real APIs.
- **Mutations** (offers, document upload, payment, handover, auth) are still client-side mocks (`setTimeout` / local state). Add service methods before connecting APIs.
- **API client**: `services/api.ts` — base URL from `VITE_API_URL` (fallback `/api`), bearer token from `localStorage.vm_token` (browser only). There is no `.env.example` yet; set `VITE_API_URL` when pointing at a backend.
- **SSR auth limit**: the axios interceptor only attaches the token when `typeof window !== "undefined"`. Server loaders will not see `localStorage` — protected data needs cookies/session or `clientLoader` before relying on authenticated SSR fetches.
- **Wishlist** (`lib/wishlist.ts`) is session-only module state (empty on SSR so hydration matches); not persisted.
- **Response shape**: frontend types in `types/index.ts` are the UI model. If backend DTOs differ, map at the service boundary — do not leak raw API shapes into components.
- **Mappers / loading-error UX** for failed fetches are not standardized yet; follow existing loader `throw new Response` 404 patterns for missing entities.

## Conventions

- **Imports**: use the `~` alias (`~/components/ui/Container`), never deep relative paths.
  With `verbatimModuleSyntax`, type-only imports must use `import type`.
- **Types**: shared interfaces go in `app/types/index.ts`; data files import them from `~/types`.
  Component-local types (e.g. `AccordionItem`, form step state) may stay next to the component.
- **Data constants**: typed exported constants in `UPPER_SNAKE_CASE`. Icon component
  refs may live in data only when imported directly by components (`data/portals.ts`,
  `home.ts`, `contact.ts`), never in loader-returned payloads.
- **Components**: page-specific sections in `app/components/<page>/`; reusable
  cross-page pieces in `common/`; generic primitives in `ui/`. Route files should be
  thin composition + `meta()` (+ `loader` when fetching).
- **No inline functions in JSX**: never pass anonymous arrow functions as props
  (`onClick={() => ...}`) or as `.map()` render callbacks in JSX. Declare named
  functions instead — at module level when they don't need component state/props,
  or as a `function` declaration inside the component when they do. Mapped buttons
  hand their value to a single named handler via a `data-*` attribute (see
  `deal-room/DealsSection.tsx`).
- **Styling**: utility-first Tailwind v4. Use theme tokens from `app/app.css` `@theme`,
  not raw hex. Key tokens:
  - Brand: `brand`, `brand-dark`, `brand-navy`, `brand-deep`, `brand-blue`, `accent`, `accent-strong`, `accent-soft`
  - Feedback: `success`, `success-soft`, `danger`, `danger-soft`, `alert`, `warning`, `star`, `star-yellow`
  - Text: `ink`, `ink-muted`, `ink-soft`, `ink-gray`, `gray-900`, `muted-700`, `muted-500`, `muted-400`, `muted-300`
  - Surfaces: `surface`, `surface-alt`, `surface-gray`, `line`, `line-soft`
  - Radius: `rounded-bubble` (enquiry grey bubbles)
  - Utility: `no-scrollbar` (horizontal scroll rows)
  Font is Poppins (`@theme` + Google Fonts in `app/root.tsx`). Arbitrary numeric
  spacing works (e.g. `h-108.5`).
- **Layout**: wrap page content in `<Container>`. Inner marketing pages use
  `<PageHero>` (flow-based; do NOT reintroduce Figma pixel-exact absolute positioning).
  Hash targets get `scroll-margin-top` globally so sticky-nav anchors clear the bar.
- **Accent text in headings**: `<span className="text-accent">…</span>`; add `block`
  when the accent part sits on its own line.
- **Button**: pass `to="/path"` to render a React Router `<Link>`; otherwise a `<button>`.
- **Class merging**: use `cn()` from `~/lib/utils`.
- **Comments**: docstrings describe what the code is/does — never cite design
  measurements ("20px-radius bubble", "588px wide"), never use bracketed pixel
  utilities where the scale covers the value (`rounded-5`, not `rounded-[20px]`),
  and never reference Figma frame names/numbers or write "per the Figma".

## Gotchas

- **`cn()` does not dedupe** — it only joins strings (no tailwind-merge). Conflicting
  utilities (e.g. two `max-w-*`) are resolved by CSS order, not prop order, so
  primitives must not bake in overridable-looking classes; leave sizing to callers.
- **SSR**: components render on the server — no unguarded `window`/`localStorage`.
- **Leaflet crashes on server import** — never `import L from "leaflet"` at module
  scope. `MapView` loads it via dynamic `import("leaflet")` inside `useEffect`
  (type-only imports are fine); the server renders just the loading placeholder.
  Tailwind classes used inside leaflet popup/divIcon HTML strings are still picked
  up by the v4 scanner.
- **Mock data is deterministic** on purpose (no `Math.random()` in fixtures), so SSR
  and client markup match — keep it that way.
- **Loader data must stay JSON-serialisable** — no component refs in loader returns.
  Icon choices use string keys (e.g. `PropertyFactIcon`) mapped in the UI.
- **Route changes**: register new pages in `app/routes.ts` (not file-system routing).
- **Deployment**: Dockerfile provided; serve `build/server/index.js`.
- If you change structure, tokens, or conventions described here, update this file.
