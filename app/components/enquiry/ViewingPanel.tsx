import { useState } from "react";
import type { Property, ViewingStatus } from "~/types";
import { MOCK_VIEWING, VIEWING_STATUSES } from "~/data/messages";
import { cn } from "~/lib/utils";
import { SearchIcon } from "~/components/ui/icons";
import { PropertyViewingCard } from "~/components/enquiry/PropertyViewingCard";

interface ViewingPanelProps {
  property: Property;
  /** Full location line shown on the property card. */
  address: string;
  className?: string;
}

/** The "Property Viewing" tab of the enquiry page: sidebar (search box +
 *  Upcoming/Completed/Cancelled status filter) and a grid of scheduled
 *  viewing cards. Mock — every status shows the same two cards, with the
 *  card actions following the selected status; the search filters them by
 *  property title. */
export function ViewingPanel({ property, address, className }: ViewingPanelProps) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<ViewingStatus>(
    VIEWING_STATUSES[0].key,
  );

  const q = query.trim().toLowerCase();
  const showCards = !q || property.title.toLowerCase().includes(q);

  return (
    <section className={className}>
      <h2 className="text-2xl font-extrabold text-black">Property Viewing</h2>

      <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-start">
        <div className="w-full shrink-0 lg:w-78.25">
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
              aria-label="Search viewings"
              className="h-10 w-full rounded-md bg-[rgba(1,4,29,0.02)] pr-3 pl-11 text-base text-ink placeholder:text-ink/40 focus:outline-none"
            />
          </div>

          <div className="mt-6 flex flex-col gap-1">
            {VIEWING_STATUSES.map(({ key, label }) => {
              const active = key === status;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setStatus(key)}
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

        <div className="min-w-0 flex-1">
          {showCards ? (
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
              {[0, 1].map((i) => (
                <PropertyViewingCard
                  key={i}
                  property={property}
                  address={address}
                  date={MOCK_VIEWING.date}
                  time={MOCK_VIEWING.time}
                  status={status}
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-ink/60">
              No viewings match your search.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
