import type { PortalDeal } from "~/types";
import { EyeIcon } from "~/components/ui/icons";
import { ListingStatusPill } from "~/components/listings/ListingStatusPill";

interface DealsTableProps {
  deals: PortalDeal[];
  onView: (id: string) => void;
}

/** Shared grid track for the header and every row: property, price/rent,
 *  property type, status, then the view action. */
const GRID =
  "grid grid-cols-[minmax(0,2.4fr)_minmax(0,1.3fr)_minmax(0,1.4fr)_minmax(0,0.7fr)_3.5rem] items-center gap-4";

/** The portal Deal Room table: header labels over thumbnail rows with a
 *  rent label, property type, status pill and a view action, divided by
 *  hairlines. Horizontally scrolls on small screens instead of reflowing. */
export function DealsTable({ deals, onView }: DealsTableProps) {
  function handleViewClick(event: React.MouseEvent<HTMLButtonElement>) {
    onView(event.currentTarget.dataset.id ?? "");
  }

  // Named row renderer (no inline `.map()` callback), closing over the
  // single view handler — the row id travels on `data-id`.
  function renderRow(deal: PortalDeal) {
    return (
      <div key={deal.id} className={`${GRID} border-b border-line-soft py-4`}>
        <div className="flex min-w-0 items-center gap-3">
          <img
            src={deal.image}
            alt=""
            className="h-14.75 w-13.5 shrink-0 rounded object-cover"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-muted-700">
              {deal.title}
            </p>
            <p className="mt-0.5 truncate text-sm text-muted-500">
              {deal.location}
            </p>
          </div>
        </div>
        <p className="text-sm font-bold text-muted-700">{deal.priceLabel}</p>
        <p className="truncate text-sm text-muted-500">{deal.propertyType}</p>
        <div>
          <ListingStatusPill status={deal.status} />
        </div>
        <div className="flex items-center justify-end text-line">
          <button
            type="button"
            data-id={deal.id}
            onClick={handleViewClick}
            aria-label={`View deal for ${deal.title}`}
            className="transition-colors hover:text-muted-500"
          >
            <EyeIcon className="size-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 md:mt-10 overflow-x-auto">
      <div className="min-w-225">
        <div className={`${GRID} border-b border-line-soft pb-4`}>
          <p className="text-sm text-ink-soft">Property</p>
          <p className="text-sm text-ink-soft">Price /Rent</p>
          <p className="text-sm text-ink-soft">Property Type</p>
          <p className="text-sm text-ink-soft">Status</p>
          <span className="sr-only">View</span>
        </div>
        {deals.map(renderRow)}
        {deals.length === 0 && (
          <p className="border-b border-line-soft py-10 text-center text-sm text-muted-500">
            No deals match these filters.
          </p>
        )}
      </div>
    </div>
  );
}
