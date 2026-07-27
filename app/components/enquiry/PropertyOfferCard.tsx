import type { OfferStatus, Property } from "~/types";
import { cn } from "~/lib/utils";
import { EnquiryPropertyCard } from "~/components/enquiry/EnquiryPropertyCard";
import { OfferCard } from "~/components/enquiry/OfferCard";

interface PropertyOfferCardProps {
  property: Property;
  /** Full location line shown on the property card. */
  address: string;
  /** Offered amount as entered in the offer form, e.g. "1200". */
  amount: string;
  /** Passed through to the OfferCard status bar + action row. */
  status?: OfferStatus;
  /** "Cancel offer" — withdraws the offer (mock). */
  onCancel?: () => void;
  className?: string;
}

/** The property card + submitted-offer card stacked in the translucent grey
 *  20px-radius bubble — the Offers-tab state once an offer has been made.
 *  The property card hides its price block since the offered amount is on
 *  the offer card. */
export function PropertyOfferCard({
  property,
  address,
  amount,
  status,
  onCancel,
  className,
}: PropertyOfferCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-[20px] bg-line/24 p-4",
        className,
      )}
    >
      <EnquiryPropertyCard property={property} address={address} hidePrice />
      <OfferCard
        amount={amount}
        currency={property.currency}
        unit={property.priceUnit}
        status={status}
        onCancel={onCancel}
      />
    </div>
  );
}
