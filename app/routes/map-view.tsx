import type { Route } from "./+types/map-view";
import { useRef, useState } from "react";
import { Link } from "react-router";
import type { ListingCategory } from "~/types";
import { searchListings } from "~/services/listings.service";
import { Container } from "~/components/ui/Container";
import { Badge } from "~/components/ui/Badge";
import { IconButton } from "~/components/ui/IconButton";
import { ArrowRightIcon, FilterIcon } from "~/components/ui/icons";
import { PropertySearchBar } from "~/components/property/PropertySearchBar";
import { PropertyCard } from "~/components/property/PropertyCard";
import { FiltersModal } from "~/components/property/FiltersModal";
import { MapView } from "~/components/property/MapView";
import { WaitlistSection } from "~/components/common/WaitlistSection";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Map View — Vault Move Africa" },
    {
      name: "description",
      content: "See property search results pinned on a map.",
    },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const categoryParam = new URL(request.url).searchParams.get("category");
  const category: ListingCategory = categoryParam === "buy" ? "buy" : "rent";
  const properties = await searchListings({ category });
  return { properties, category };
}

export default function MapViewPage({ loaderData }: Route.ComponentProps) {
  const { properties, category } = loaderData;
  const resultsHref = category === "buy" ? "/buy" : "/rent";
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState(0);
  const cardsRef = useRef<HTMLDivElement>(null);

  /** Scroll the properties row by one card (344px card + 24px gap). */
  function scrollCards(direction: "prev" | "next") {
    cardsRef.current?.scrollBy({
      left: direction === "next" ? 368 : -368,
      behavior: "smooth",
    });
  }

  return (
    <>
      <section className="border-b border-line/60 bg-surface">
        <Container className="py-6">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-sm text-ink/60"
          >
            <Link to="/" className="hover:text-brand">
              Home
            </Link>
            <span>›</span>
            <Link to={resultsHref} className="hover:text-brand">
              Search
            </Link>
            <span>›</span>
            <Link to={resultsHref} className="hover:text-brand">
              Search Results
            </Link>
            <span>›</span>
            <span className="text-ink">Map View</span>
          </nav>
          <div className="mt-4">
            <PropertySearchBar showTabs={false} defaultCategory={category} />
          </div>
        </Container>
      </section>

      <Container className="py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-xl font-bold text-brand-dark">
            Showing {properties.length} results.
          </h1>
          <button
            type="button"
            onClick={() => setFiltersOpen(true)}
            className="flex items-center gap-2 rounded-lg border border-line px-4 py-2 text-sm text-ink"
          >
            <FilterIcon className="size-4" />
            Filters
          </button>
        </div>

        <div className="mt-4">
          <Badge className="bg-surface-alt">
            {appliedFilters > 0
              ? `${appliedFilters} ${appliedFilters === 1 ? "filter" : "filters"} applied`
              : "No filters applied"}
          </Badge>
        </div>

        <div className="mt-6 rounded-xl border border-line bg-white p-2 shadow-[0_4px_4px_rgba(0,0,0,0.05)]">
          <MapView
            properties={properties}
            className="h-105 rounded-xl border border-line sm:h-125 lg:h-150"
          />
        </div>

        <h2 className="mt-12 text-xl font-bold text-brand-dark">
          Properties in this location
        </h2>
        <div
          ref={cardsRef}
          className="no-scrollbar mt-6 flex gap-6 overflow-x-auto pb-4"
        >
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              className="w-86 shrink-0"
            />
          ))}
        </div>
        <div className="mt-2 flex justify-end gap-3">
          <IconButton
            aria-label="Previous properties"
            onClick={() => scrollCards("prev")}
          >
            <ArrowRightIcon className="size-5 rotate-180" />
          </IconButton>
          <IconButton
            aria-label="Next properties"
            onClick={() => scrollCards("next")}
          >
            <ArrowRightIcon className="size-5" />
          </IconButton>
        </div>
      </Container>

      <FiltersModal
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        onApply={(n) => {
          setAppliedFilters(n);
          setFiltersOpen(false);
        }}
      />

      <WaitlistSection />
    </>
  );
}
