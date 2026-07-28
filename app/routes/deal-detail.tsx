import type { Route } from "./+types/deal-detail";
import { Link } from "react-router";
import { getDealById } from "~/services/deals.service";
import { Container } from "~/components/ui/Container";
import { DealSummaryCard } from "~/components/deal-room/DealSummaryCard";
import { ListedByCard } from "~/components/deal-room/ListedByCard";
import { WhatsNextCard } from "~/components/deal-room/WhatsNextCard";
import { DealProgressSection } from "~/components/deal-room/DealProgressSection";

export function meta({ loaderData }: Route.MetaArgs) {
  const title = loaderData?.deal.propertyTitle ?? "Deal";
  return [
    { title: `${title} — Deal Room — Vault Move Africa` },
    {
      name: "description",
      content:
        "Track deal progress, complete verification and manage every step of the transaction securely.",
    },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const result = await getDealById(params.dealId);
  if (!result) throw new Response(null, { status: 404 });
  return result;
}

type Breadcrumb = { label: string; href?: string };

/** Renders one breadcrumb — module-level so the nav `.map()` takes a named
 *  function, not an inline callback. */
function renderBreadcrumb(crumb: Breadcrumb, index: number, all: Breadcrumb[]) {
  return (
    <span key={crumb.label} className="flex items-center gap-2">
      {crumb.href ? (
        <Link to={crumb.href} className="hover:text-brand">
          {crumb.label}
        </Link>
      ) : (
        <span>{crumb.label}</span>
      )}
      {index < all.length - 1 && <span>›</span>}
    </span>
  );
}

export default function DealDetail({ loaderData }: Route.ComponentProps) {
  const { deal, details } = loaderData;
  const breadcrumbs: Breadcrumb[] = [
    { label: "Home", href: "/dashboard" },
    { label: "Deal Room", href: "/deal-room" },
    { label: "All Deals", href: "/deal-room" },
    { label: `The ${deal.propertyTitle}` },
  ];

  return (
    <Container className="py-6">
      <div className="flex items-center justify-between gap-4">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-sm text-ink/70"
        >
          {breadcrumbs.map(renderBreadcrumb)}
        </nav>
        <Link
          to="/deal-room"
          className="shrink-0 text-sm text-ink/70 hover:text-brand"
        >
          ‹ Back
        </Link>
      </div>

      <div className="mt-6 flex flex-col gap-8 pb-16 lg:flex-row">
        <div className="min-w-0 flex-1">
          <DealSummaryCard deal={deal} startedDate={details.startedDate} />
          <DealProgressSection details={details} className="mt-8" />
        </div>
        <div className="w-full shrink-0 space-y-8 lg:w-86.25">
          <ListedByCard
            landlord={details.landlord}
            messageHref={`/properties/${details.propertyId}/contact`}
          />
          <WhatsNextCard text={details.whatsNext} />
        </div>
      </div>
    </Container>
  );
}
