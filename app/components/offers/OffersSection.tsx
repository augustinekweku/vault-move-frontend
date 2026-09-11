import { useState } from "react";
import type { PortalOffer } from "~/types";
import { OffersToolbar } from "~/components/offers/OffersToolbar";
import { OffersTable } from "~/components/offers/OffersTable";
import { TablePagination } from "~/components/common/TablePagination";
import { OFFERS_FOOTER_NOTE, OFFERS_TOTAL_PAGES } from "~/data/listing";

const STATUS_FILTER_VALUES: Record<string, PortalOffer["status"]> = {
  Active: "active",
  Inactive: "inactive",
};

/** Client-side filter over one page of portal offers (the search box
 *  matches title and location); the API applies these server-side later. */
function offerMatches(
  offer: PortalOffer,
  query: string,
  statusFilter: string,
  typeFilter: string,
): boolean {
  const needle = query.trim().toLowerCase();
  if (
    needle &&
    !`${offer.title} ${offer.location}`.toLowerCase().includes(needle)
  ) {
    return false;
  }
  const status = STATUS_FILTER_VALUES[statusFilter];
  if (status && offer.status !== status) return false;
  if (typeFilter && offer.propertyType !== typeFilter) return false;
  return true;
}

/** Toolbar + table + pagination of the portal Offers page. Search and the
 *  two filters narrow the loaded rows; the eye opens the offer-detail page
 *  for the row's listing. */
export function OffersSection({ offers }: { offers: PortalOffer[] }) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [page, setPage] = useState(1);

  function handleQueryChange(value: string) {
    setQuery(value);
  }

  function handleFilterChange(value: string, name?: string) {
    if (name === "status") setStatusFilter(value);
    else if (name === "type") setTypeFilter(value);
  }

  function handlePageChange(next: number) {
    // TODO: fetch the page from the offers API instead of flipping state.
    setPage(next);
  }

  const visible = offers.filter((offer) =>
    offerMatches(offer, query, statusFilter, typeFilter),
  );

  return (
    <section aria-label="Your offers" className="flex flex-1 flex-col">
      <OffersToolbar
        query={query}
        statusFilter={statusFilter}
        typeFilter={typeFilter}
        onQueryChange={handleQueryChange}
        onFilterChange={handleFilterChange}
      />
      <OffersTable offers={visible} />
      {/* Grows to pin the footer to the bottom of the content well. */}
      <div aria-hidden className="min-h-10 flex-1" />
      <TablePagination
        page={page}
        totalPages={OFFERS_TOTAL_PAGES}
        note={OFFERS_FOOTER_NOTE}
        navLabel="Offers pages"
        onPageChange={handlePageChange}
      />
    </section>
  );
}
