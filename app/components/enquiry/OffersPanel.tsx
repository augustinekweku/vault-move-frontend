import { useState } from "react";
import type { OfferFilter, OfferStatus, Property } from "~/types";
import { OFFER_FILTERS } from "~/data/messages";
import { cn } from "~/lib/utils";
import { SearchIcon } from "~/components/ui/icons";
import { PropertyOfferCard } from "~/components/enquiry/PropertyOfferCard";

interface OffersPanelProps {
  property: Property;
  /** Full location line shown on the offer's property card. */
  address: string;
  /** The submitted offer amount — null until an offer is made, which keeps
   *  the panel on the ghost empty state. */
  offerAmount: string | null;
  /** Passed through to the offer card's status bar + action row. */
  offerStatus: OfferStatus;
  /** "View Counter Offer" on the offer card (countered status) — opens the
   *  Counter Offer sheet. */
  onViewCounterOffer?: () => void;
  /** "Cancel offer" on the offer card — withdraws the offer (mock). */
  onCancelOffer: () => void;
  className?: string;
}

/** The "Offers" tab of the enquiry page: sidebar (search box + offer-status
 *  filter) and the offer list. Until an offer is made the list is a ghost
 *  empty state (offers are started from the Property Viewing tab's
 *  completed viewings); once submitted, the offer card shows instead (the
 *  mock offer moves pending → countered → accepted, listed under the
 *  All/Pending filters until acceptance moves it to All/Accepted). On
 *  large screens the empty state shares one grid cell with
 *  the sidebar, so the sidebar hugs the left edge while the empty state
 *  stays centred across the full panel width; the offer card switches to
 *  a sidebar + list row. */
export function OffersPanel({
  property,
  address,
  offerAmount,
  offerStatus,
  onViewCounterOffer,
  onCancelOffer,
  className,
}: OffersPanelProps) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<OfferFilter>(OFFER_FILTERS[0].key);

  const q = query.trim().toLowerCase();
  const matchesQuery = !q || property.title.toLowerCase().includes(q);
  // The mock offer only ever sits in one bucket: pending/countered counts
  // as pending; once accepted it leaves Pending and appears under Accepted.
  const matchesFilter =
    filter === "all" ||
    (filter === "accepted" && offerStatus === "accepted") ||
    (filter === "pending" && offerStatus !== "accepted");
  const showOffer = offerAmount !== null && matchesFilter;

  return (
    <section className={className}>
      <h2 className="text-2xl font-extrabold text-black">Offers</h2>

      <div
        className={cn(
          "mt-6 flex flex-col gap-8",
          showOffer ? "lg:flex-row lg:items-start" : "lg:grid",
        )}
      >
        <div className="w-full shrink-0 lg:col-start-1 lg:row-start-1 lg:w-78.25">
          <div className="relative">
            <SearchIcon
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-4 size-4.25 -translate-y-1/2 text-ink"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              aria-label="Search offers"
              className="h-10 w-full rounded-md bg-[rgba(1,4,29,0.02)] pr-3 pl-11 text-base text-ink placeholder:text-ink/40 focus:outline-none"
            />
          </div>

          <div className="mt-6 flex flex-col gap-1">
            {OFFER_FILTERS.map(({ key, label }) => {
              const active = key === filter;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setFilter(key)}
                  aria-pressed={active}
                  className={cn(
                    "rounded-lg px-4 py-2.5 text-left text-sm transition-colors",
                    active
                      ? "bg-surface-alt font-semibold text-ink"
                      : "text-muted-500 hover:text-ink",
                  )}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {showOffer ? (
          <div className="min-w-0 flex-1">
            {matchesQuery ? (
              <PropertyOfferCard
                property={property}
                address={address}
                amount={offerAmount}
                status={offerStatus}
                onViewCounterOffer={onViewCounterOffer}
                onCancel={onCancelOffer}
                className="mx-auto w-full max-w-106.75"
              />
            ) : (
              <p className="text-sm text-ink/60">
                No offers match your search.
              </p>
            )}
          </div>
        ) : (
          <div className="mx-auto flex w-full max-w-108.25 flex-col items-center gap-4 py-8 text-center lg:col-start-1 lg:row-start-1 lg:pt-28 lg:pb-16">
            <img
              src="/icons/gravity-ui_ghost.svg"
              alt=""
              className="size-56.5"
            />
            <p className="text-lg leading-8 text-ink-soft">
              There isn&apos;t anything to show right now. Start making offers
              to get things moving.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
