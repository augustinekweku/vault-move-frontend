import { useState } from "react";
import type { OfferBid, OfferBidStatus } from "~/types";
import {
  EnquiryTabs,
  type EnquiryTab,
} from "~/components/enquiry/EnquiryTabs";
import { OfferBidsTable } from "~/components/offers/OfferBidsTable";
import { TablePagination } from "~/components/common/TablePagination";
import { OFFERS_FOOTER_NOTE, OFFERS_TOTAL_PAGES } from "~/data/listing";

const OFFER_TABS: EnquiryTab[] = [
  { value: "all", label: "All Offers" },
  { value: "accepted", label: "Accepted offers" },
  { value: "declined", label: "Declined Offers" },
];

/** Bid tabs + table + pagination of the portal offer-detail page. The tabs
 *  narrow the loaded bids by review state; viewing drills into the full
 *  offer thread once the offers API is live. */
export function OfferDetailSection({ bids }: { bids: OfferBid[] }) {
  const [tab, setTab] = useState("all");
  const [page, setPage] = useState(1);

  function handleTabChange(value: string) {
    setTab(value);
    setPage(1);
  }

  function handleView(id: string) {
    // TODO: open the full offer thread through the offers API instead.
    void id;
  }

  function handlePageChange(next: number) {
    // TODO: fetch the page from the offers API instead of flipping state.
    setPage(next);
  }

  const status = tab as OfferBidStatus | "all";
  const visible =
    status === "all" ? bids : bids.filter((bid) => bid.status === status);

  return (
    <section aria-label="Offers for this listing" className="flex flex-1 flex-col">
      <div className="border-b border-line">
        <EnquiryTabs tabs={OFFER_TABS} active={tab} onChange={handleTabChange} />
      </div>
      <OfferBidsTable bids={visible} onView={handleView} />
      {/* Grows to pin the footer to the bottom of the content well. */}
      <div aria-hidden className="min-h-10 flex-1" />
      <TablePagination
        page={page}
        totalPages={OFFERS_TOTAL_PAGES}
        note={OFFERS_FOOTER_NOTE}
        navLabel="Offer pages"
        onPageChange={handlePageChange}
      />
    </section>
  );
}
