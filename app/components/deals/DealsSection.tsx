import { useState } from "react";
import type { PortalDeal } from "~/types";
import { DealsToolbar } from "~/components/deals/DealsToolbar";
import { DealsTable } from "~/components/deals/DealsTable";
import { TablePagination } from "~/components/common/TablePagination";
import { DEALS_FOOTER_NOTE, DEALS_TOTAL_PAGES } from "~/data/listing";

const STATUS_FILTER_VALUES: Record<string, PortalDeal["status"]> = {
  Active: "active",
  Inactive: "inactive",
};

/** Client-side filter over one page of portal deals (the search box
 *  matches title and location); the API applies these server-side later. */
function dealMatches(
  deal: PortalDeal,
  query: string,
  statusFilter: string,
  typeFilter: string,
): boolean {
  const needle = query.trim().toLowerCase();
  if (
    needle &&
    !`${deal.title} ${deal.location}`.toLowerCase().includes(needle)
  ) {
    return false;
  }
  const status = STATUS_FILTER_VALUES[statusFilter];
  if (status && deal.status !== status) return false;
  if (typeFilter && deal.propertyType !== typeFilter) return false;
  return true;
}

/** Toolbar + table + pagination of the portal Deal Room page. Search and
 *  the two filters narrow the loaded rows; viewing drills into the deal
 *  workspace once the portal deal-detail page exists. */
export function DealsSection({ deals }: { deals: PortalDeal[] }) {
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

  function handleView(id: string) {
    // TODO: open the deal workspace for this listing instead.
    void id;
  }

  function handlePageChange(next: number) {
    // TODO: fetch the page from the deals API instead of flipping state.
    setPage(next);
  }

  const visible = deals.filter((deal) =>
    dealMatches(deal, query, statusFilter, typeFilter),
  );

  return (
    <section aria-label="Your deals" className="flex flex-1 flex-col">
      <DealsToolbar
        query={query}
        statusFilter={statusFilter}
        typeFilter={typeFilter}
        onQueryChange={handleQueryChange}
        onFilterChange={handleFilterChange}
      />
      <DealsTable deals={visible} onView={handleView} />
      {/* Grows to pin the footer to the bottom of the content well. */}
      <div aria-hidden className="min-h-10 flex-1" />
      <TablePagination
        page={page}
        totalPages={DEALS_TOTAL_PAGES}
        note={DEALS_FOOTER_NOTE}
        navLabel="Deal pages"
        onPageChange={handlePageChange}
      />
    </section>
  );
}
