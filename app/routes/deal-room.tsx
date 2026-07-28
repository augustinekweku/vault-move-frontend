import type { Route } from "./+types/deal-room";
import { Link } from "react-router";
import { Container } from "~/components/ui/Container";
import { DealsSection } from "~/components/deal-room/DealsSection";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Deal Room — Vault Move Africa" },
    {
      name: "description",
      content:
        "Track your deals, complete verification and manage every step of the transaction securely.",
    },
  ];
}

const BREADCRUMBS = [
  { label: "Home", href: "/dashboard" },
  { label: "Deal Room" },
];

/** Renders one breadcrumb — module-level so the nav `.map()` takes a named
 *  function, not an inline callback. */
function renderBreadcrumb(crumb: (typeof BREADCRUMBS)[number], index: number) {
  return (
    <span key={crumb.label} className="flex items-center gap-2">
      {crumb.href ? (
        <Link to={crumb.href} className="hover:text-brand">
          {crumb.label}
        </Link>
      ) : (
        <span>{crumb.label}</span>
      )}
      {index < BREADCRUMBS.length - 1 && <span>›</span>}
    </span>
  );
}

export default function DealRoom() {
  return (
    <Container className="py-6">
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-2 text-sm text-ink/70"
      >
        {BREADCRUMBS.map(renderBreadcrumb)}
      </nav>

      <DealsSection className="mt-6" />
    </Container>
  );
}
