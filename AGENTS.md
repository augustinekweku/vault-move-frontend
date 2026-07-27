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
  routes.ts               # manual route config (marketing pages under SiteLayout;
                          # auth pages (signup, login) are top-level, no navbar/footer)
  routes/                 # one file per page: home, buy, rent, map-view (search
                          # results on a map, ?category=buy|rent), about, contact,
                          # portals, faq, resources, resource-detail (dynamic
                          # /resources/:articleId), property-detail (dynamic
                          # /properties/:propertyId), property-contact (dynamic
                          # /properties/:propertyId/contact — "Message Landlord"
                          # enquiry chat with Enquiries / Property Viewing /
                          # Offers tabs), landlord-profile (dynamic
                          # /landlords/:landlordId — linked from the property
                          # details "View Profile" button), privacy, terms, escrow-terms,
                          # signup (buyer/renter wizard — steps render as
                          # components via auth/SignUpFlow, not per-step routes),
                          # login, setup-profile (preference wizard —
                          # auth/ProfileSetupFlow),
                          # dashboard (signed-in buyer/renter landing,
                          # under DashboardLayout)
  components/
    ui/                   # primitives: Button, IconButton, Input, Select, Tabs,
                          # Accordion, Badge, Container, SectionHeading, Toast,
                          # Modal, icons.tsx
    common/               # shared across pages: PageHero, ContactForm,
                          # WaitlistSection, LegalDocContent
    layout/               # SiteLayout, Navbar, TopBar, MobileMenu, Footer, Logo
    home/  about/  contact/  faq/  privacy/  portals/  resources/  auth/
    dashboard/            # page-specific sections (one folder per page; auth/
                          # holds the shared AuthLayout + sign-up step forms;
                          # dashboard/ the signed-in navbar, hero + layout)
    landlord/             # landlord profile page: LandlordHeader (avatar, name,
                          # rating, Message Landlord), LandlordStats (4-figure card)
    enquiry/              # property-contact page: ConversationList ("Recent
                          # Messages" sidebar), EnquiryChat (chat panel + composer;
                          # sending pops the ui/Toast steps variant with the
                          # enquiry progress checklist — data/messages.ts
                          # ENQUIRY_PROGRESS_STEPS), EnquiryPropertyCard (shared
                          # listing), EnquiryForm ("What would you like to know"
                          # card), ViewingCard ("Viewing Scheduled" card with
                          # upcoming/completed/cancelled action variants —
                          # data/messages.ts MOCK_VIEWING), PropertyViewingCard
                          # (property + viewing cards in the grey bubble),
                          # ViewingPanel (Property Viewing tab: search +
                          # Upcoming/Completed/Cancelled sidebar + card grid),
                          # OffersPanel (Offers tab: search + status-filter
                          # sidebar — data/messages.ts OFFER_FILTERS — with a
                          # ghost-icon empty state + "Make an offer" CTA until
                          # offers exist), MakeOfferForm (Offers-tab offer form:
                          # property card + rent/move-in/stay/notes fields; mock
                          # submit flips the button to Loading and pops the
                          # offer-submitted ui/Toast steps variant —
                          # data/messages.ts OFFER_PROGRESS_STEPS; "< Back"
                          # returns to the panel),
                          # MakeOfferModal ("Make an Offer" prompt — pops on page
                          # load; "Make an offer now" opens the offer form)
    property/             # PropertyCard, PropertyGrid, PropertySearchBar, SearchResults,
                          # FiltersModal (opened from SearchResults; block content
                          # from data/listings.ts FILTER_COLUMNS), MapView (leaflet
                          # map with pins + price popups for map-view), plus the
                          # details-page sections: PropertyGallery, PropertySidePanel,
                          # PropertyOverview (facts bar + Details/Reviews tabs),
                          # PropertyReviews (Reviews tab: ratings summary + cards)
  data/                   # static/mock content: listings, landlords, messages,
                          # navigation, portals,
                          # about, contact, faq, resources, terms, escrow-terms,
                          # home (landing steps + stats), auth (profile-setup
                          # wizard content, password rules)
  types/index.ts          # ALL shared interfaces/types live here
  services/               # api.ts (axios instance + `http` helper),
                          # listings.service.ts, landlords.service.ts
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
  `brand` (#1e347a), `brand-dark`, `brand-navy`, `brand-blue` (#0000b0, details-page
  fact icons), `accent` (#04ce9d), `accent-soft`,
  `success-soft` (#eefaf6, toast bg), `success` (#12b76a, presence dot), `ink`,
  `ink-muted`, `gray-900` (#101828,
  stat figures), `muted-700` (#344054),
  `surface`, `surface-alt`, `line`, plus the reviews-tab tokens `star-yellow`
  (#ffb919, rating stars/bars), `surface-gray` (#fafafb, review cards + bar
  tracks), `ink-gray` (#666676, review body text). Font is Poppins (set in
  `@theme`, loaded via Google Fonts in `app/root.tsx`).
  Arbitrary numeric spacing values work (e.g. `h-108.5`). A `no-scrollbar`
  utility (defined in `app.css`) hides scrollbars on horizontal scroll rows.
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
- **Comments**: docstrings describe what the code is/does — never reference
  Figma frame names/numbers (e.g. "Rectangle 18339") or write "per the Figma"
  in code comments; they go stale and are meaningless without the design file
  open. (Rules about the design itself — like the PageHero note below — are
  fine; frame-name citations are not.)

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
- **Mock data is deterministic** on purpose (`MOCK_LISTINGS` uses a fixed pattern, no
  `Math.random()`), so SSR and client markup match — keep it that way.
- **Loader data must stay JSON-serialisable** — anything returned from a route loader
  (e.g. `PropertyDetails`) cannot carry component refs, so icon choices are stored as
  string keys (`PropertyFactIcon`) and mapped to components in the UI. Component refs in
  data files are fine only when the data is imported directly by components (like
  `data/portals.ts`).
- **Route changes**: register new pages in `app/routes.ts` (not file-system routing).
- **Deployment**: Dockerfile provided; serve `build/server/index.js`.
- If you change structure, tokens, or conventions described here, update this file.
