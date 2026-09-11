import { Link } from "react-router";
import type { PortalOffer } from "~/types";
import { EyeIcon } from "~/components/ui/icons";

interface OffersTableProps {
  offers: PortalOffer[];
}

/** Shared grid track for the header and every row: property, price/rent,
 *  property type, offer count, then the view action. */
const GRID =
  "grid grid-cols-[minmax(0,2.4fr)_minmax(0,1.3fr)_minmax(0,1.4fr)_minmax(0,0.7fr)_3.5rem] items-center gap-4";

/** The portal Offers table: header labels over thumbnail rows with a rent
 *  label, property type, received-offer count and a view action, divided by
 *  hairlines. Horizontally scrolls on small screens instead of reflowing. */
export function OffersTable({ offers }: OffersTableProps) {
  // Named row renderer (no inline `.map()` callback) — the eye links to
  // the offer-detail page for the row's listing.
  function renderRow(offer: PortalOffer) {
    return (
      <div key={offer.id} className={`${GRID} border-b border-line-soft py-4`}>
        <div className="flex min-w-0 items-center gap-3">
          <img
            src={offer.image}
            alt=""
            className="h-14.75 w-13.5 shrink-0 rounded object-cover"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-muted-700">
              {offer.title}
            </p>
            <p className="mt-0.5 truncate text-sm text-muted-500">
              {offer.location}
            </p>
          </div>
        </div>
        <p className="text-sm font-bold text-muted-700">{offer.priceLabel}</p>
        <p className="truncate text-sm text-muted-500">{offer.propertyType}</p>
        <p className="text-sm text-muted-500">{offer.offers}</p>
        <div className="flex items-center justify-end text-line">
          <Link
            to={`/dashboard/offers/${offer.id}`}
            aria-label={`View offers for ${offer.title}`}
            className="transition-colors hover:text-muted-500"
          >
            <EyeIcon className="size-5" />
          </Link>
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
          <p className="text-sm text-ink-soft">Offers</p>
          <span className="sr-only">View</span>
        </div>
        {offers.map(renderRow)}
        {offers.length === 0 && (
          <p className="border-b border-line-soft py-10 text-center text-sm text-muted-500">
            No offers match these filters.
          </p>
        )}
      </div>
    </div>
  );
}
