import type { Route } from "./+types/property-detail";
import { Link } from "react-router";
import { getListingById } from "~/services/listings.service";
import { Container } from "~/components/ui/Container";
import { PropertyGallery } from "~/components/property/PropertyGallery";
import { PropertySidePanel } from "~/components/property/PropertySidePanel";
import { PropertyOverview } from "~/components/property/PropertyOverview";
import { WaitlistSection } from "~/components/common/WaitlistSection";

export function meta({ loaderData }: Route.MetaArgs) {
  const title = loaderData?.property.title ?? "Property";
  const address = loaderData?.details.address ?? "";
  return [
    { title: `${title} — Vault Move Africa` },
    {
      name: "description",
      content: `${title}${address ? ` in ${address}` : ""} — view price, availability and details on Vault Move Africa.`,
    },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const result = await getListingById(params.propertyId);
  if (!result) throw new Response(null, { status: 404 });
  return result;
}

export default function PropertyDetail({ loaderData }: Route.ComponentProps) {
  const { property, details } = loaderData;
  const searchHref = property.category === "buy" ? "/buy" : "/rent";
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Search", href: searchHref },
    { label: "Search Results", href: searchHref },
    { label: "Property details page" },
  ];

  return (
    <>
      <Container className="py-6">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-sm text-ink/70"
        >
          {breadcrumbs.map((crumb, i) => (
            <span key={crumb.label} className="flex items-center gap-2">
              {crumb.href ? (
                <Link to={crumb.href} className="hover:text-brand">
                  {crumb.label}
                </Link>
              ) : (
                <span>{crumb.label}</span>
              )}
              {i < breadcrumbs.length - 1 && <span>›</span>}
            </span>
          ))}
        </nav>
      </Container>

      <Container className="flex flex-col gap-10 pb-16 xl:flex-row xl:items-start xl:gap-12">
        <div className="min-w-0 flex-1">
          <PropertyGallery images={details.gallery} title={property.title} />
          <PropertyOverview
            property={property}
            details={details}
            className="mt-10"
          />
        </div>
        <PropertySidePanel
          property={property}
          details={details}
          className="xl:w-86.25 xl:shrink-0"
        />
      </Container>

      <WaitlistSection />
    </>
  );
}
