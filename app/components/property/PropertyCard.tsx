import type { Property } from "~/types";
import { cn } from "~/lib/utils";
import { Badge } from "~/components/ui/Badge";
import {
  BedIcon,
  BathIcon,
  HeartIcon,
  MailIcon,
  StarIcon,
  VerifiedIcon,
} from "~/components/ui/icons";

interface PropertyCardProps {
  property: Property;
  className?: string;
}

export function PropertyCard({ property, className }: PropertyCardProps) {
  const {
    title,
    location,
    price,
    priceUnit,
    currency,
    bedrooms,
    bathrooms,
    rating,
    image,
    tag,
    agent,
  } = property;

  return (
    <article
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border border-line bg-white shadow-[0_4px_4px_rgba(0,0,0,0.05)]",
        className,
      )}
    >
      <div className="relative p-2">
        <div className="relative h-56 overflow-hidden rounded-xl">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="size-full object-cover"
          />
          <Badge className="absolute left-3 top-3 bg-white/90 text-[10px]">
            {tag}
          </Badge>
          <button
            type="button"
            aria-label="Save property"
            className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-white/90 text-brand-navy hover:bg-white"
          >
            <HeartIcon className="size-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-4 pb-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-xl font-bold text-brand-navy">{title}</h3>
          <span className="mt-1 flex items-center gap-1 text-xs font-semibold text-brand-navy/60">
            <StarIcon className="size-3 text-star" />
            {rating.toFixed(1)} /5.0
          </span>
        </div>

        <p className="mt-3 text-sm font-bold text-brand-navy">
          {price}
          {currency} {priceUnit === "month" ? "/ month" : ""}
        </p>
        <p className="text-sm text-brand-navy/50">{location}</p>

        <div className="mt-3 flex items-center gap-6 border-t border-line pt-3">
          <span className="flex items-center gap-2 text-sm text-brand-navy/50">
            <BedIcon className="size-5 text-[#7e8b9d]" />
            {bedrooms} bedrooms
          </span>
          <span className="flex items-center gap-2 text-sm text-brand-navy/50">
            <BathIcon className="size-5 text-[#7e8b9d]" />
            {bathrooms} bathrooms
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between rounded-xl bg-surface-alt p-3">
          <div className="flex items-center gap-3">
            <img
              src={agent.avatar}
              alt={agent.name}
              loading="lazy"
              className="size-9 rounded-full object-cover"
            />
            <div>
              <p className="flex items-center gap-1 text-sm font-bold text-brand-navy">
                {agent.name}
                {agent.verified && (
                  <VerifiedIcon className="size-4 text-brand" />
                )}
              </p>
              <p className="text-xs text-brand-navy/50">{agent.role}</p>
            </div>
          </div>
          <button
            type="button"
            aria-label={`Message ${agent.name}`}
            className="flex size-9 items-center justify-center rounded-full bg-brand text-white hover:bg-brand/90"
          >
            <MailIcon className="size-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
