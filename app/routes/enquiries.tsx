import { useState } from "react";
import type { Route } from "./+types/enquiries";
import type { ScheduledViewing } from "~/types";
import { getListingById, getPortalListings } from "~/services/listings.service";
import { getLandlordById } from "~/services/landlords.service";
import { Button } from "~/components/ui/Button";
import { Toast } from "~/components/ui/Toast";
import { EnquiryTabs } from "~/components/enquiry/EnquiryTabs";
import { ConversationList } from "~/components/enquiry/ConversationList";
import { EnquiryChat } from "~/components/enquiry/EnquiryChat";
import { PortalViewingsPanel } from "~/components/enquiry/PortalViewingsPanel";
import { ScheduleViewingSheet } from "~/components/enquiry/ScheduleViewingSheet";

export const handle = { title: "Enquiries" };

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Enquiries — Vault Move Africa" },
    {
      name: "description",
      content:
        "Read and reply to renter enquiries and manage property viewings on Vault Move Africa.",
    },
  ];
}

export async function loader({}: Route.LoaderArgs) {
  // TODO: load the inbox (conversations, listings, viewings) from the
  // messages API once it is live.
  const result = await getListingById("listing-1");
  if (!result) throw new Response(null, { status: 404 });
  const landlordResult = await getLandlordById(result.property.agent.id);
  if (!landlordResult) throw new Response(null, { status: 404 });
  const properties = await getPortalListings();
  return { ...result, landlord: landlordResult.landlord, properties };
}

const TABS = [
  { value: "enquiries", label: "Enquiries" },
  { value: "viewing", label: "Property Viewing" },
];

export default function Enquiries({ loaderData }: Route.ComponentProps) {
  const { property, details, landlord, properties } = loaderData;
  const [tab, setTab] = useState("enquiries");
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [viewings, setViewings] = useState<ScheduledViewing[]>([]);
  const [scheduledToast, setScheduledToast] = useState(false);

  function handleTabChange(value: string) {
    setTab(value);
  }

  function openSchedule() {
    setScheduleOpen(true);
  }

  function closeSchedule() {
    setScheduleOpen(false);
  }

  function handleScheduled(viewing: ScheduledViewing) {
    // TODO: persist the viewing through the viewings API instead.
    setViewings((current) => [...current, viewing]);
    setScheduleOpen(false);
    setScheduledToast(true);
  }

  function handleCancelViewing(id: string) {
    // TODO: cancel the viewing through the viewings API instead.
    setViewings((current) => current.filter((viewing) => viewing.id !== id));
  }

  function closeScheduledToast() {
    setScheduledToast(false);
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line">
        <EnquiryTabs tabs={TABS} active={tab} onChange={handleTabChange} />
        <Button size="sm" onClick={openSchedule} className="mb-3 px-6">
          Schedule a viewing
        </Button>
      </div>

      {tab === "enquiries" ? (
        <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:items-start">
          <ConversationList className="w-full shrink-0 lg:w-78.25" />
          <EnquiryChat
            property={property}
            address={details.address}
            landlord={landlord}
            className="min-w-0 flex-1"
          />
        </div>
      ) : (
        <PortalViewingsPanel
          property={property}
          address={details.address}
          viewings={viewings}
          onSchedule={openSchedule}
          onCancelViewing={handleCancelViewing}
        />
      )}

      <ScheduleViewingSheet
        open={scheduleOpen}
        properties={properties}
        onClose={closeSchedule}
        onScheduled={handleScheduled}
      />

      {scheduledToast && (
        <Toast
          title="Success!"
          message="Your viewing has been scheduled!"
          onClose={closeScheduledToast}
        />
      )}
    </div>
  );
}
