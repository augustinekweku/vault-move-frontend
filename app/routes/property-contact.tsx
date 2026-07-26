import type { Route } from "./+types/property-contact";
import { useState } from "react";
import { Link } from "react-router";
import { getListingById } from "~/services/listings.service";
import { getLandlordById } from "~/services/landlords.service";
import { cn } from "~/lib/utils";
import { Container } from "~/components/ui/Container";
import { ConversationList } from "~/components/enquiry/ConversationList";
import { EnquiryChat } from "~/components/enquiry/EnquiryChat";
import { ViewingPanel } from "~/components/enquiry/ViewingPanel";
import { OffersPanel } from "~/components/enquiry/OffersPanel";
import { WaitlistSection } from "~/components/common/WaitlistSection";

export function meta({ loaderData }: Route.MetaArgs) {
  const landlordName = loaderData?.landlord.name ?? "Landlord";
  const title = loaderData?.property.title ?? "Property";
  return [
    { title: `Message ${landlordName} — Vault Move Africa` },
    {
      name: "description",
      content: `Make an enquiry about ${title} — message ${landlordName} on Vault Move Africa.`,
    },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const result = await getListingById(params.propertyId);
  if (!result) throw new Response(null, { status: 404 });
  const landlordResult = await getLandlordById(result.property.agent.id);
  if (!landlordResult) throw new Response(null, { status: 404 });
  return { ...result, landlord: landlordResult.landlord };
}

const TABS = [
  { value: "enquiries", label: "Enquiries" },
  { value: "viewing", label: "Property Viewing" },
  { value: "offers", label: "Offers" },
];

export default function PropertyContact({ loaderData }: Route.ComponentProps) {
  const { property, details, landlord } = loaderData;
  const [tab, setTab] = useState("enquiries");
  const searchHref = property.category === "buy" ? "/buy" : "/rent";
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Search", href: searchHref },
    { label: "Search Results", href: searchHref },
    { label: "Property details page", href: `/properties/${property.id}` },
    { label: "Message Landlord" },
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

        <div className="mt-6 border-b border-line">
          <div className="flex gap-8 overflow-x-auto no-scrollbar">
            {TABS.map(({ value, label }) => {
              const active = tab === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setTab(value)}
                  aria-selected={active}
                  className={cn(
                    "-mb-px border-b-2 pb-3 text-sm font-semibold whitespace-nowrap transition-colors",
                    active
                      ? "border-brand text-brand"
                      : "border-transparent text-ink/50 hover:text-ink",
                  )}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {tab === "enquiries" ? (
          <div className="mt-8 flex flex-col gap-10 pb-16 lg:flex-row lg:items-start">
            <ConversationList className="w-full shrink-0 lg:w-78.25" />
            <EnquiryChat
              property={property}
              address={details.address}
              landlord={landlord}
              className="min-w-0 flex-1"
            />
          </div>
        ) : tab === "viewing" ? (
          <ViewingPanel
            property={property}
            address={details.address}
            className="mt-8 pb-16"
          />
        ) : (
          <OffersPanel className="mt-8 pb-16" />
        )}
      </Container>

      <WaitlistSection />
    </>
  );
}
