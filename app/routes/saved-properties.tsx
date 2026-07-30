import type { Route } from "./+types/saved-properties";
import { Link } from "react-router";
import { Container } from "~/components/ui/Container";
import { SavedPropertiesSection } from "~/components/dashboard/SavedPropertiesSection";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Saved Properties — Vault Move Africa" },
    {
      name: "description",
      content: "The properties you saved for later.",
    },
  ];
}

const BREADCRUMBS = [
  { label: "Menu", href: "/dashboard" },
  { label: "Saved Properties" },
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

export default function SavedProperties() {
  return (
    <Container className="py-6">
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-2 text-sm text-ink/70"
      >
        {BREADCRUMBS.map(renderBreadcrumb)}
      </nav>

      <SavedPropertiesSection className="mt-6" />
    </Container>
  );
}
