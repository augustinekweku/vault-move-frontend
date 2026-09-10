import type { Property, ScheduledViewing } from "~/types";
import { PropertyViewingCard } from "~/components/enquiry/PropertyViewingCard";

interface PortalViewingsPanelProps {
  property: Property;
  /** Full location line shown on the property card. */
  address: string;
  viewings: ScheduledViewing[];
  onSchedule: () => void;
  onCancelViewing: (id: string) => void;
}

/** Landlord Property Viewing tab: the ghost empty state until a viewing is
 *  scheduled, then landlord viewing cards (Cancel Viewing only). */
export function PortalViewingsPanel({
  property,
  address,
  viewings,
  onSchedule,
  onCancelViewing,
}: PortalViewingsPanelProps) {
  function renderViewing(viewing: ScheduledViewing) {
    function handleCancel() {
      onCancelViewing(viewing.id);
    }
    return (
      <PropertyViewingCard
        key={viewing.id}
        property={property}
        address={address}
        date={viewing.dateLabel}
        time={viewing.timeLabel}
        status="upcoming"
        variant="landlord"
        onCancel={handleCancel}
      />
    );
  }

  if (viewings.length === 0) {
    return (
      <div className="flex min-h-[calc(100dvh-8rem)] flex-col items-center justify-center py-10 text-center">
        <img src="/icons/ghost.svg" alt="" className="size-29.25" />
        <p className="mt-10 text-[13px] leading-[33px] font-medium tracking-[-0.02em] text-gray-3">
          Nothing to see here
        </p>
        <button
          type="button"
          onClick={onSchedule}
          className="mt-3.5 h-10.75 w-48.75 rounded-lg bg-brand text-sm leading-[1.3] text-white transition-colors hover:bg-brand/90"
        >
          Schedule a viewing
        </button>
      </div>
    );
  }

  return (
    <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
      {viewings.map(renderViewing)}
    </div>
  );
}
