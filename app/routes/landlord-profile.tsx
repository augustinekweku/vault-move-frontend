import type { Route } from "./+types/landlord-profile";
import { useState } from "react";
import { Link } from "react-router";
import { getLandlordById } from "~/services/landlords.service";
import { cn } from "~/lib/utils";
import { Container } from "~/components/ui/Container";
import { LandlordHeader } from "~/components/landlord/LandlordHeader";
import { LandlordStats } from "~/components/landlord/LandlordStats";
import { PropertyGrid } from "~/components/property/PropertyGrid";
import { PropertyReviews } from "~/components/property/PropertyReviews";
import { WaitlistSection } from "~/components/common/WaitlistSection";

export function meta({ loaderData }: Route.MetaArgs) {
  const name = loaderData?.landlord.name ?? "Landlord";
  const location = loaderData?.landlord.location ?? "";
  return [
    { title: `${name} — Vault Move Africa` },
    {
      name: "description",
      content: `${name}${location ? `, ${location}` : ""} — view listed properties and reviews on Vault Move Africa.`,
    },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const result = await getLandlordById(params.landlordId);
  if (!result) throw new Response(null, { status: 404 });
  return result;
}

const TABS = [
  { value: "profile", label: "Landlord's Profile" },
  { value: "properties", label: "Listed Properties" },
  { value: "reviews", label: "Reviews" },
];

export default function LandlordProfile({ loaderData }: Route.ComponentProps) {
  const { landlord, listings } = loaderData;
  const [tab, setTab] = useState("profile");
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Search", href: "/map-view" },
    { label: "Search Results", href: "/map-view" },
    { label: "View Landlord Profile" },
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

        <h1 className="mt-6 text-2xl font-bold text-ink">Landlords Profile</h1>

        <LandlordHeader
          landlord={landlord}
          messageHref={
            listings.length > 0
              ? `/properties/${listings[0].id}/contact`
              : undefined
          }
          className="mt-8"
        />
        <LandlordStats stats={landlord.stats} className="mt-10" />

        <div className="mt-10 border-b border-line">
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

        <div className="pb-16">
          {tab === "profile" ? (
            <div className="mt-6">
              {landlord.bio.map((paragraph, i) => (
                <p key={i} className="mt-4 text-base leading-6 text-ink/80">
                  {paragraph}
                </p>
              ))}
            </div>
          ) : tab === "properties" ? (
            <PropertyGrid properties={listings} className="mt-8" />
          ) : landlord.reviews.items.length > 0 ? (
            <PropertyReviews
              summary={landlord.reviews.summary}
              reviews={landlord.reviews.items}
              heading="Landlord Reviews"
              className="mt-8"
            />
          ) : (
            <p className="mt-6 text-sm text-ink/60">
              No reviews yet for this landlord.
            </p>
          )}
        </div>
      </Container>

      <WaitlistSection />
    </>
  );
}
