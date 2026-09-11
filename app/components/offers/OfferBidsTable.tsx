import type { OfferBid } from "~/types";

interface OfferBidsTableProps {
  bids: OfferBid[];
  onView: (id: string) => void;
}

/** Shared grid track for the header and every row: bidder, offer amount,
 *  move-in date, stay duration, then the full-offer action. The last track
 *  is fixed (not `auto`) so the header's screen-reader-only cell — which is
 *  absolutely positioned and can't size a track — doesn't collapse it and
 *  shift the headings off the body columns. */
const GRID =
  "grid grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.7fr)_7rem] items-center gap-4";

/** The bid rows of the portal offer-detail page: avatar + bidder name,
 *  offered rent, move-in date, stay duration and an underlined view action,
 *  divided by hairlines. Horizontally scrolls on small screens instead of
 *  reflowing. */
export function OfferBidsTable({ bids, onView }: OfferBidsTableProps) {
  function handleViewClick(event: React.MouseEvent<HTMLButtonElement>) {
    onView(event.currentTarget.dataset.id ?? "");
  }

  // Named row renderer (no inline `.map()` callback), closing over the
  // single view handler — the bid id travels on `data-id`.
  function renderRow(bid: OfferBid) {
    return (
      <div key={bid.id} className={`${GRID} border-b border-line-soft py-4`}>
        <div className="flex min-w-0 items-center gap-3">
          <span
            aria-hidden
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-medium text-white"
          >
            {bid.initials}
          </span>
          <p className="truncate text-sm text-ink-soft">{bid.bidderName}</p>
        </div>
        <p className="truncate text-sm text-ink-soft">{bid.amountLabel}</p>
        <p className="truncate text-sm text-ink-soft">{bid.moveInDate}</p>
        <p className="truncate text-sm text-ink-soft">{bid.stayDuration}</p>
        <div className="flex items-center justify-end">
          {/* TODO: open the full offer thread once the offers detail API is
              live. */}
          <button
            type="button"
            data-id={bid.id}
            onClick={handleViewClick}
            aria-label={`View full offer from ${bid.bidderName}`}
            className="text-sm whitespace-nowrap text-ink-soft underline underline-offset-2 transition-colors hover:text-brand"
          >
            View full offer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 overflow-x-auto md:mt-8">
      <div className="min-w-225">
        <div className={`${GRID} border-b border-line-soft pb-4`}>
          <p className="text-sm text-ink-soft">Offer From</p>
          <p className="text-sm text-ink-soft">Offer Amount</p>
          <p className="text-sm text-ink-soft">Move In Date</p>
          <p className="text-sm text-ink-soft">Stay Duration</p>
          <span className="sr-only">View</span>
        </div>
        {bids.map(renderRow)}
        {bids.length === 0 && (
          <p className="border-b border-line-soft py-10 text-center text-sm text-muted-500">
            No offers in this tab yet.
          </p>
        )}
      </div>
    </div>
  );
}
