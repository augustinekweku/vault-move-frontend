import { useState } from "react";
import { Link } from "react-router";
import type { Property, ListingCategory } from "~/types";
import { Container } from "~/components/ui/Container";
import { PropertyGrid } from "~/components/property/PropertyGrid";
import { PropertySearchBar } from "~/components/property/PropertySearchBar";
import { FiltersModal } from "~/components/property/FiltersModal";
import { Badge } from "~/components/ui/Badge";
import { FilterIcon, MapIcon } from "~/components/ui/icons";

interface SearchResultsProps {
  properties: Property[];
  category: ListingCategory;
  breadcrumbLabel: string;
}

export function SearchResults({
  properties,
  category,
  breadcrumbLabel,
}: SearchResultsProps) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState(0);

  return (
    <>
      <section className="border-b border-line/60 bg-surface">
        <Container className="py-6">
          <p className="text-sm text-ink/60">Home › {breadcrumbLabel}</p>
          <div className="mt-4">
            <PropertySearchBar showTabs={false} defaultCategory={category} />
          </div>
        </Container>
      </section>

      <Container className="py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-xl font-bold text-brand-dark">Showing Results</h1>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setFiltersOpen(true)}
              className="flex items-center gap-2 rounded-lg border border-line px-4 py-2 text-sm text-ink"
            >
              <FilterIcon className="size-4" />
              Filters
            </button>
            <Link
              to={`/map-view?category=${category}`}
              className="flex items-center gap-2 rounded-lg border border-line px-4 py-2 text-sm text-ink"
            >
              <MapIcon className="size-4" />
              View on Map
            </Link>
          </div>
        </div>

        <div className="mt-4">
          <Badge className="bg-surface-alt">
            {appliedFilters > 0
              ? `${appliedFilters} ${appliedFilters === 1 ? "filter" : "filters"} applied`
              : "No filters applied"}
          </Badge>
        </div>

        <PropertyGrid properties={properties} className="mt-8" />
      </Container>

      <FiltersModal
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        onApply={(n) => {
          setAppliedFilters(n);
          setFiltersOpen(false);
        }}
      />
    </>
  );
}
