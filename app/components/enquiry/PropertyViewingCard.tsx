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
  /** "Make an Offer" on the completed ViewingCard — opens the offer form
   *  in the Offers tab. */
  onMakeOffer?: () => void;
  className?: string;
}

/** The property card + "Viewing Scheduled" card stacked in the translucent
 *  grey 20px-radius bubble — shared by the landlord's chat message and the
 *  Property Viewing tab grid. */
export function PropertyViewingCard({
  property,
  address,
  date,
  time,
  status,
  onMakeOffer,
  className,
}: PropertyViewingCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-[20px] bg-line/24 p-4",
        className,
      )}
    >
      <EnquiryPropertyCard property={property} address={address} />
      <ViewingCard
        date={date}
        time={time}
        status={status}
        onMakeOffer={onMakeOffer}
      />
    </div>
  );
}
