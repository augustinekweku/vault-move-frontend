import type { ListingDraft, OfferDetailPricing } from "~/types";
import { cn } from "~/lib/utils";
import { LocationIcon, StarIcon } from "~/components/ui/icons";

const BEDROOM_ICON = "/icons/bedroom.svg";
const BATHROOM_ICON = "/icons/bathroom.svg";
const FURNISH_ICON = "/icons/chair-furnish.svg";

interface OfferDetailHeaderProps {
  draft: ListingDraft;
  pricing: OfferDetailPricing;
}

/** Listing summary atop the portal offer-detail page: the tinted shell
 *  holds the listing card (photo, type and active pills, rating row, key
 *  specs) and the rent summary panel side by side. */
export function OfferDetailHeader({
  draft,
  pricing,
}: OfferDetailHeaderProps) {
  function renderStar(index: number) {
    return (
      <StarIcon
        key={index}
        className={cn(
          "size-6",
          index < draft.stars ? "text-star" : "text-muted-300",
        )}
      />
    );
  }

  function renderPricingRow(label: string, value: string) {
    return (
      <div
        key={label}
        className="flex items-center justify-between gap-3 font-light"
      >
        <p>{label}</p>
        <p>{value}</p>
      </div>
    );
  }

  return (
    <section
      aria-label={`Offers for ${draft.title}`}
      className="rounded-5 bg-line/25 p-4"
    >
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="flex min-w-0 flex-1 flex-col gap-4 rounded-xl border border-line bg-white p-4 shadow-[0_4px_4px_rgba(0,0,0,0.05)] sm:flex-row">
          <img
            src={draft.image}
            alt=""
            className="h-48 w-full shrink-0 rounded-xl border border-line object-cover sm:h-auto sm:w-46"
          />

          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex items-start justify-between gap-3">
              <span className="rounded border border-surface-alt bg-surface-alt px-1.5 py-0.75 text-[8px] leading-[1.3] text-brand-navy">
                {draft.typeLabel}
              </span>
              <span className="rounded-md border border-accent bg-accent/24 px-1.5 py-0.75 text-[8px] leading-[1.3] text-brand-navy">
                Active listing
              </span>
            </div>

            <h1 className="mt-4 text-base font-extrabold text-ink">
              {draft.title}
            </h1>

            <div className="mt-1 flex items-center justify-between gap-3">
              <p className="flex min-w-0 items-center gap-1 py-1 text-xs text-muted-500">
                <LocationIcon className="size-4 shrink-0" />
                <span className="truncate">{draft.location}</span>
              </p>
              <p className="shrink-0 text-xs text-muted-500">
                {draft.createdOn}
              </p>
            </div>

            <div className="mt-1.5 flex items-center gap-2 pb-2">
              <span
                role="img"
                aria-label={`${draft.stars} out of 5 stars`}
                className="flex items-center gap-0.75"
              >
                {[0, 1, 2, 3, 4].map(renderStar)}
              </span>
              <span className="text-xs text-muted-500">{draft.rating}</span>
            </div>

            <ul className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-muted-300 pt-5 text-sm text-brand-navy/54">
              <li className="flex items-center gap-1.5">
                <img
                  src={BEDROOM_ICON}
                  alt=""
                  aria-hidden
                  className="size-6 shrink-0"
                />
                {draft.bedrooms}
              </li>
              <li aria-hidden className="h-6 w-px shrink-0 bg-line" />
              <li className="flex items-center gap-1.5">
                <img
                  src={BATHROOM_ICON}
                  alt=""
                  aria-hidden
                  className="size-6 shrink-0"
                />
                {draft.bathrooms}
              </li>
              <li aria-hidden className="h-6 w-px shrink-0 bg-line" />
              <li className="flex items-center gap-1.5">
                <img
                  src={FURNISH_ICON}
                  alt=""
                  aria-hidden
                  className="size-6 shrink-0"
                />
                {draft.furnishing}
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-xl border border-line bg-white p-4 text-xs text-brand-navy/54 shadow-[0_4px_4px_rgba(0,0,0,0.05)] lg:w-88 lg:shrink-0">
          <div className="flex flex-col gap-1.5">
            <p className="text-xs font-semibold text-ink">Rent Price</p>
            {renderPricingRow("Monthly rent", pricing.monthlyRent)}
          </div>
          <div className="flex flex-col gap-1.5">
            <p className="text-xs font-semibold text-ink">Availability</p>
            <p className="font-light">{pricing.availability}</p>
          </div>
          <div className="flex flex-col gap-1.5">
            <p className="text-xs font-semibold text-ink">
              Additional Charges
            </p>
            {renderPricingRow("Monthly service charge", pricing.serviceCharge)}
            {renderPricingRow("Monthly utility fees", pricing.utilityFees)}
          </div>
        </div>
      </div>
    </section>
  );
}
