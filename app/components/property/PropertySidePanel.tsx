import type { Property, PropertyDetails } from "~/types";
import { Link } from "react-router";
import { cn } from "~/lib/utils";
import { MailIcon, VerifiedIcon } from "~/components/ui/icons";

interface PropertySidePanelProps {
  property: Property;
  details: PropertyDetails;
  className?: string;
}

const cardClass =
  "rounded-xl border border-line bg-white p-3 shadow-[0_4px_4px_rgba(0,0,0,0.05)]";
const labelClass = "text-xs font-light text-brand-navy/55";
const valueClass = "mt-1 text-lg font-bold text-ink";

/** Right-hand panel on the property details page: price, availability,
 *  additional charges, landlord card and contact actions. */
export function PropertySidePanel({
  property,
  details,
  className,
}: PropertySidePanelProps) {
  const { agent } = property;

  return (
    <aside
      className={cn(
        "flex flex-col gap-4 rounded-xl border border-line bg-white p-4 shadow-[0_4px_4px_rgba(0,0,0,0.05)]",
        className,
      )}
    >
      <h2 className="text-2xl font-extrabold text-black">{property.title}</h2>

      <div className={cardClass}>
        <p className={labelClass}>
          {property.category === "rent" ? "Rent Price" : "Sale Price"}
        </p>
        <p className={valueClass}>
          {property.price} {property.currency}
          {property.priceUnit === "month" ? " /month" : ""}
        </p>
      </div>

      <div className={cardClass}>
        <p className={labelClass}>Availability</p>
        <p className={valueClass}>{details.availability}</p>
      </div>

      <div className={cardClass}>
        <h3 className="text-xs font-semibold text-ink">Additional Charges</h3>
        <dl className="mt-2 flex flex-col gap-1.5">
          {details.charges.map((charge) => (
            <div key={charge.label} className="flex items-center justify-between">
              <dt className={labelClass}>{charge.label}</dt>
              <dd className={labelClass}>{charge.amount}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="flex items-center justify-between rounded-xl border border-surface-alt bg-surface-alt p-3">
        <div className="flex items-center gap-4">
          <div className="relative size-9">
            <img
              src={agent.avatar}
              alt={agent.name}
              loading="lazy"
              className="size-full rounded-full object-cover"
            />
            {agent.verified && (
              <span className="absolute -bottom-1.5 -right-1.5 flex size-6 items-center justify-center rounded-full bg-white">
                <VerifiedIcon className="size-4.5 text-black" />
              </span>
            )}
          </div>
          <div>
            <p className="text-sm font-bold text-brand-navy">{agent.name}</p>
            <p className="text-sm text-brand-navy/55">{agent.role}</p>
          </div>
        </div>
        <button
          type="button"
          aria-label={`Message ${agent.name}`}
          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand text-white hover:bg-brand/90"
        >
          <MailIcon className="size-4.5" />
        </button>
      </div>

      <Link
        to={`/properties/${property.id}/contact`}
        className="flex h-11 w-full items-center justify-center gap-2.5 rounded-lg bg-brand text-lg text-white hover:bg-brand/90"
      >
        <MailIcon className="size-4.5" />
        Message Landlord
      </Link>
      <Link
        to={`/landlords/${agent.id}`}
        className="flex h-11 w-full items-center justify-center rounded-lg border border-line bg-white text-sm text-ink shadow-[0_1px_2px_rgba(16,24,40,0.05)] hover:bg-black/5"
      >
        View Profile
      </Link>
    </aside>
  );
}
