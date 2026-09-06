import type { Property } from "~/types";
import { cn } from "~/lib/utils";
import { Badge } from "~/components/ui/Badge";
import { LocationIcon, StarIcon } from "~/components/ui/icons";

interface EnquiryPropertyCardProps {
  property: Property;
  /** Full location line, e.g. "Achimota, Accra". */
  address: string;
  /** Hides the bottom price block (the offers-tab property card omits it —
   *  the offered amount is already shown on the offer card below). */
  hidePrice?: boolean;
  className?: string;
}

/** The property card shared inside the enquiry chat — image on the left,
 *  facts on the right (tag badge, title, location, rating, rent price). */
export function EnquiryPropertyCard({
  property,
  address,
  hidePrice = false,
  className,
}: EnquiryPropertyCardProps) {
  return (
    <article
      className={cn(
        "flex rounded-xl border border-line bg-white shadow-[0_4px_4px_rgba(0,0,0,0.05)]",
        className,
      )}
    >
      <div className="w-2/5 shrink-0 p-2.5">
        <img
          src={property.image}
          alt={property.title}
          loading="lazy"
          className="h-full w-full rounded-lg border border-line object-cover"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2 py-4 pr-4">
        <Badge className="self-start">{property.tag}</Badge>
        <h3 className="text-base font-extrabold text-black">
          {property.title}
        </h3>
        <p className="flex items-center gap-1.5 text-xs text-muted-500">
          <LocationIcon className="size-4 shrink-0" />
          {address}
        </p>
        <p className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon
              key={i}
              className={cn(
                "size-4.5",
                i < Math.round(property.rating)
                  ? "text-star"
                  : "text-muted-300",
              )}
            />
          ))}
          <span className="ml-1 text-xs text-muted-500">
            {property.rating.toFixed(1)}/5.0
          </span>
        </p>
        {hidePrice ? null : (
          <div className="mt-auto border-t border-muted-300 pt-2">
            <p className="text-xs text-muted-500">
              {property.category === "rent" ? "Monthly Rent" : "Sale Price"}
            </p>
            <p className="text-2xl font-bold text-ink">
              {property.price} {property.currency}
              {property.priceUnit === "month" ? "/month" : ""}
            </p>
          </div>
        )}
      </div>
    </article>
  );
}
