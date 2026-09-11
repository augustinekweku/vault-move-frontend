import type { PortalDeal } from "~/types";
import { cn } from "~/lib/utils";
import { Badge } from "~/components/ui/Badge";
import { LocationIcon, StarIcon } from "~/components/ui/icons";

interface PortalDealPropertyCardProps {
  deal: PortalDeal;
  /** Listing badge over the photo, e.g. "Apartment for Rent". */
  tag: string;
  /** Filled stars, 0–5. */
  rating: number;
  /** e.g. "4.0/5.0". */
  ratingLabel: string;
  /** e.g. "1500 GHC" — the card appends "/month". */
  monthlyRent: string;
  className?: string;
}

/** Property summary card in the portal deal workspace sidebar: photo with
 *  listing badge, title, location, star rating and the monthly rent. */
export function PortalDealPropertyCard({
  deal,
  tag,
  rating,
  ratingLabel,
  monthlyRent,
  className,
}: PortalDealPropertyCardProps) {
  function renderRatingStar(index: number) {
    return (
      <StarIcon
        key={index}
        aria-hidden
        className={cn(
          "size-4",
          index < rating ? "text-star" : "text-muted-300",
        )}
      />
    );
  }

  return (
    <article
      className={cn(
        "rounded-xl border border-line bg-white p-4 shadow-[0_4px_4px_rgba(0,0,0,0.05)]",
        className,
      )}
    >
      <div className="relative">
        <img
          src={deal.image}
          alt={deal.title}
          className="h-44 w-full rounded-xl border border-line object-cover"
        />
        <Badge className="absolute top-2 right-2">{tag}</Badge>
      </div>

      <h2 className="mt-3 text-base font-extrabold text-black">
        {deal.title}
      </h2>
      <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-500">
        <LocationIcon aria-hidden className="size-4 shrink-0" />
        {deal.location}
      </p>

      <div className="mt-2 flex items-center justify-between gap-2">
        <div
          role="img"
          aria-label={`Rated ${ratingLabel}`}
          className="flex items-center gap-0.5"
        >
          {[0, 1, 2, 3, 4].map(renderRatingStar)}
        </div>
        <p className="text-xs text-muted-500">{ratingLabel}</p>
      </div>

      <p className="mt-3 text-xs text-muted-500">Monthly Rent</p>
      <p className="mt-0.5 text-base font-extrabold text-black">
        {monthlyRent}
        <span className="text-xs font-medium text-muted-500">/month</span>
      </p>
    </article>
  );
}
