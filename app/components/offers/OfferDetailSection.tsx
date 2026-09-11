import { useState } from "react";
import type { OfferBid, OfferBidStatus, OfferOutcome, Property } from "~/types";
import {
  EnquiryTabs,
  type EnquiryTab,
} from "~/components/enquiry/EnquiryTabs";
import { OfferBidsTable } from "~/components/offers/OfferBidsTable";
import { FullOfferSheet } from "~/components/offers/FullOfferSheet";
import { OfferOutcomeModal } from "~/components/enquiry/OfferOutcomeModal";
import { MakeOfferForm } from "~/components/enquiry/MakeOfferForm";
import { Sheet } from "~/components/ui/Sheet";
import { TablePagination } from "~/components/common/TablePagination";
import { OFFERS_FOOTER_NOTE, OFFERS_TOTAL_PAGES } from "~/data/listing";

const OFFER_TABS: EnquiryTab[] = [
  { value: "all", label: "All Offers" },
  { value: "accepted", label: "Accepted offers" },
  { value: "declined", label: "Declined Offers" },
];

interface OfferDetailSectionProps {
  bids: OfferBid[];
  propertyTitle: string;
  location: string;
  property: Property;
  /** Full location line shown on the counter-offer property card. */
  address: string;
}

/** Bid tabs + table + pagination of the portal offer-detail page. The tabs
 *  narrow the loaded bids by review state; "View full offer" opens the
 *  offer sheet, where accepting or declining moves the bid across tabs and
 *  pops the shared outcome modal, and countering opens the shared
 *  counter-offer form in a sheet. */
export function OfferDetailSection({
  bids,
  propertyTitle,
  location,
  property,
  address,
}: OfferDetailSectionProps) {
  const [rows, setRows] = useState(bids);
  const [tab, setTab] = useState("all");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [counterId, setCounterId] = useState<string | null>(null);
  const [outcome, setOutcome] = useState<OfferOutcome | null>(null);

  function handleTabChange(value: string) {
    setTab(value);
    setPage(1);
  }

  function handleView(id: string) {
    setSelectedId(id);
  }

  function closeSheet() {
    setSelectedId(null);
  }

  function handleAccept(id: string) {
    // TODO: accept the bid through the offers API instead.
    setRows((current) =>
      current.map((bid) =>
        bid.id === id ? { ...bid, status: "accepted" } : bid,
      ),
    );
    setSelectedId(null);
    setOutcome("portal-accepted");
  }

  function handleDecline(id: string) {
    // TODO: decline the bid through the offers API instead.
    setRows((current) =>
      current.map((bid) =>
        bid.id === id ? { ...bid, status: "declined" } : bid,
      ),
    );
    setSelectedId(null);
    setOutcome("portal-declined");
  }

  function handleCounter(id: string) {
    setSelectedId(null);
    setCounterId(id);
  }

  function closeCounter() {
    setCounterId(null);
  }

  function handleCounterSubmitted(amount: string) {
    // TODO: send the counter offer through the offers API instead.
    void amount;
    setCounterId(null);
  }

  function closeOutcome() {
    setOutcome(null);
  }

  function handlePageChange(next: number) {
    // TODO: fetch the page from the offers API instead of flipping state.
    setPage(next);
  }

  const status = tab as OfferBidStatus | "all";
  const visible =
    status === "all" ? rows : rows.filter((bid) => bid.status === status);
  const selected = rows.find((bid) => bid.id === selectedId) ?? null;

  return (
    <section
      aria-label="Offers for this listing"
      className="flex flex-1 flex-col"
    >
      <div className="border-b border-line">
        <EnquiryTabs
          tabs={OFFER_TABS}
          active={tab}
          onChange={handleTabChange}
        />
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

      <FullOfferSheet
        bid={selected}
        propertyTitle={propertyTitle}
        location={location}
        onClose={closeSheet}
        onAccept={handleAccept}
        onDecline={handleDecline}
        onCounter={handleCounter}
      />

      <Sheet
        open={counterId !== null}
        onClose={closeCounter}
        className="max-w-lg p-6 sm:p-8"
      >
        {counterId !== null && (
          <MakeOfferForm
            property={property}
            address={address}
            variant="counter"
            onBack={closeCounter}
            onClose={closeCounter}
            onSubmitted={handleCounterSubmitted}
          />
        )}
      </Sheet>

      <OfferOutcomeModal
        outcome={outcome}
        searchHref="/buy"
        onClose={closeOutcome}
      />
    </section>
  );
}
