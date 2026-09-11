import { useState } from "react";
import type { PortalListing } from "~/types";
import { ListingsToolbar } from "~/components/listings/ListingsToolbar";
import { ListingsTable } from "~/components/listings/ListingsTable";
import { TablePagination } from "~/components/common/TablePagination";
import { LISTINGS_FOOTER_NOTE, LISTINGS_TOTAL_PAGES } from "~/data/listing";

const STATUS_FILTER_VALUES: Record<string, PortalListing["status"]> = {
  Active: "active",
  Inactive: "inactive",
};

/** Client-side filter over one page of portal listings (the search box
 *  matches title and location); the API applies these server-side later. */
function listingMatches(
  listing: PortalListing,
  query: string,
  statusFilter: string,
  typeFilter: string,
): boolean {
  const needle = query.trim().toLowerCase();
  if (
    needle &&
    !`${listing.title} ${listing.location}`.toLowerCase().includes(needle)
  ) {
    return false;
  }
  const status = STATUS_FILTER_VALUES[statusFilter];
  if (status && listing.status !== status) return false;
  if (typeFilter && listing.propertyType !== typeFilter) return false;
  return true;
}

/** Toolbar + table + pagination of the portal Listings page. Search and the
 *  two filters narrow the loaded rows; deletes drop the row locally until
 *  the listings API is live. */
export function ListingsSection({ listings }: { listings: PortalListing[] }) {
  const [rows, setRows] = useState(listings);
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

  function handleDelete(id: string) {
    // TODO: delete the listing through the listings API instead.
    setRows((current) => current.filter((row) => row.id !== id));
  }

  function handlePageChange(next: number) {
    // TODO: fetch the page from the listings API instead of flipping state.
    setPage(next);
  }

  const visible = rows.filter((row) =>
    listingMatches(row, query, statusFilter, typeFilter),
  );

  return (
    <section aria-label="Your listings" className="flex flex-1 flex-col">
      <ListingsToolbar
        query={query}
        statusFilter={statusFilter}
        typeFilter={typeFilter}
        onQueryChange={handleQueryChange}
        onFilterChange={handleFilterChange}
      />
      <ListingsTable listings={visible} onDelete={handleDelete} />
      {/* Grows to pin the footer to the bottom of the content well. */}
      <div aria-hidden className="min-h-10 flex-1" />
      <TablePagination
        page={page}
        totalPages={LISTINGS_TOTAL_PAGES}
        note={LISTINGS_FOOTER_NOTE}
        navLabel="Listings pages"
        onPageChange={handlePageChange}
      />
    </section>
  );
}
