import type { Property, ViewingStatus } from "~/types";
import { cn } from "~/lib/utils";
import { EnquiryPropertyCard } from "~/components/enquiry/EnquiryPropertyCard";
import { ViewingCard } from "~/components/enquiry/ViewingCard";

interface PropertyViewingCardProps {
  property: Property;
  /** Full location line shown on the property card. */
  address: string;
  /** e.g. "Monday, 2nd June 2026". */
  date: string;
  /** e.g. "10:00 AM". */
  time: string;
  /** Passed through to the ViewingCard action row. */
  status?: ViewingStatus;
  /** Portal cards drop the renter actions, keeping Cancel Viewing only. */
  variant?: "renter" | "landlord";
  /** "Make an Offer" on the completed ViewingCard — opens the offer form
   *  in the Offers tab. */
  onMakeOffer?: () => void;
  /** Portal Cancel Viewing — removes the scheduled viewing. */
  onCancel?: () => void;
  className?: string;
}

/** The property card + "Viewing Scheduled" card stacked in the translucent
 *  grey bubble — shared by the landlord's chat message and the Property
 *  Viewing tab grid. */
export function PropertyViewingCard({
  property,
  address,
  date,
  time,
  status,
  variant,
  onMakeOffer,
  onCancel,
  className,
}: PropertyViewingCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-bubble bg-line/24 p-4",
        className,
      )}
    >
      <EnquiryPropertyCard property={property} address={address} />
      <ViewingCard
        date={date}
        time={time}
        status={status}
        variant={variant}
        onMakeOffer={onMakeOffer}
        onCancel={onCancel}
      />
    </div>
  );
}
