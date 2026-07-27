import { useState } from "react";
import type { OfferFilter } from "~/types";
import { OFFER_FILTERS } from "~/data/messages";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/Button";
import { SearchIcon } from "~/components/ui/icons";

interface OffersPanelProps {
  /** Opens the "Make an Offer" form. */
  onMakeOffer: () => void;
  className?: string;
}

/** The "Offers" tab of the enquiry page: sidebar (search box + offer-status
 *  filter) and, since no offers have been made yet, a ghost empty state
 *  with a "Make an offer" CTA. On large screens both children share one
 *  grid cell, so the sidebar hugs the left edge while the empty state stays
 *  centred across the full panel width. */
export function OffersPanel({ onMakeOffer, className }: OffersPanelProps) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<OfferFilter>(OFFER_FILTERS[0].key);

  return (
    <section className={className}>
      <h2 className="text-2xl font-extrabold text-black">Offers</h2>

      <div className="mt-6 flex flex-col gap-8 lg:grid">
        <div className="w-full lg:col-start-1 lg:row-start-1 lg:w-78.25">
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
          <Button onClick={onMakeOffer} className="mt-2">
            Make an offer
          </Button>
        </div>
      </div>
    </section>
  );
}
