import { Link } from "react-router";
import type { PortalListing } from "~/types";
import { DeleteIcon, EditIcon } from "~/components/ui/icons";
import { ListingStatusPill } from "~/components/listings/ListingStatusPill";

interface ListingsTableProps {
  listings: PortalListing[];
  onDelete: (id: string) => void;
}

/** Shared grid track for the header and every row: property, status,
 *  price/rent, property type, views, then the row actions. */
const GRID =
  "grid grid-cols-[minmax(0,2.4fr)_minmax(0,1.2fr)_minmax(0,1.3fr)_minmax(0,1.4fr)_minmax(0,0.7fr)_3.5rem] items-center gap-4";

/** The portal Listings table: header labels over thumbnail rows with a
 *  status pill, rent label, view count and edit/delete actions, divided by
 *  hairlines. Horizontally scrolls on small screens instead of reflowing. */
export function ListingsTable({ listings, onDelete }: ListingsTableProps) {
  function handleDeleteClick(event: React.MouseEvent<HTMLButtonElement>) {
    onDelete(event.currentTarget.dataset.id ?? "");
  }

  // Named row renderer (no inline `.map()` callback), closing over the
  // single delete handler — the row id travels on `data-id`.
  function renderRow(listing: PortalListing) {
    return (
      <div
        key={listing.id}
        className={`${GRID} border-b border-line-soft py-4`}
      >
        <div className="flex min-w-0 items-center gap-3">
          <img
            src={listing.image}
            alt=""
            className="h-14.75 w-13.5 shrink-0 rounded object-cover"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-muted-700">
              {listing.title}
            </p>
            <p className="mt-0.5 truncate text-sm text-muted-500">
              {listing.location}
            </p>
          </div>
        </div>
        <div>
          <ListingStatusPill status={listing.status} />
        </div>
        <p className="text-sm font-bold text-muted-700">{listing.priceLabel}</p>
        <p className="truncate text-sm text-muted-500">
          {listing.propertyType}
        </p>
        <p className="text-sm text-muted-500">{listing.views}</p>
        <div className="flex items-center justify-end gap-3 text-line">
          {/* TODO: load the listing draft into the wizard when it can edit
              existing listings instead of starting a blank one. */}
          <Link
            to="/dashboard/create-listing"
            aria-label={`Edit ${listing.title}`}
            className="transition-colors hover:text-muted-500"
          >
            <EditIcon className="size-5" />
          </Link>
          <button
            type="button"
            data-id={listing.id}
            onClick={handleDeleteClick}
            aria-label={`Delete ${listing.title}`}
            className="transition-colors hover:text-muted-500"
          >
            <DeleteIcon className="size-5" />
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
          <p className="text-sm text-ink-soft">Status</p>
          <p className="text-sm text-ink-soft">Price /Rent</p>
          <p className="text-sm text-ink-soft">Property Type</p>
          <p className="text-sm text-ink-soft">Views</p>
          <span className="sr-only">Actions</span>
        </div>
        {listings.map(renderRow)}
        {listings.length === 0 && (
          <p className="border-b border-line-soft py-10 text-center text-sm text-muted-500">
            No listings match these filters.
          </p>
        )}
      </div>
    </div>
  );
}
