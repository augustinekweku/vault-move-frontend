import { useState } from "react";
import { useNavigate } from "react-router";
import type { Route } from "./+types/listing-preview";
import { getListingById } from "~/services/listings.service";
import { Button } from "~/components/ui/Button";
import { PropertyGallery } from "~/components/property/PropertyGallery";
import { PropertySidePanel } from "~/components/property/PropertySidePanel";
import { PropertyOverview } from "~/components/property/PropertyOverview";
import { PublishConfirmationModal } from "~/components/listing/PublishConfirmationModal";

/** Header title of the portal layout — the preview sits under the Listings
 *  entry (and takes its rail icon) while the action row below names the
 *  flow. */
export const handle = { title: "Listings" };

export function meta({ loaderData }: Route.MetaArgs) {
  const title = loaderData?.property.title ?? "Listing";
  return [
    { title: `${title} preview — Vault Move Africa` },
    {
      name: "description",
      content: `Preview your ${title} listing before publishing it on Vault Move Africa.`,
    },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const result = await getListingById(params.propertyId);
  if (!result) throw new Response(null, { status: 404 });
  return result;
}

/** Dashboard preview of a listing before it goes live: the public detail
 *  sections with the Go back / Publish Listing actions on top. */
export default function ListingPreview({ loaderData }: Route.ComponentProps) {
  const { property, details } = loaderData;
  const navigate = useNavigate();
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  function openConfirmation() {
    setConfirmationOpen(true);
  }

  function closeConfirmation() {
    setConfirmationOpen(false);
  }

  function goToDashboard() {
    // TODO: publish the listing through the listings API before leaving.
    navigate("/dashboard", { state: { listingPublished: true } });
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-end gap-3">
        <Button
          to="/dashboard/create-listing"
          variant="outline"
          size="sm"
          className="bg-white px-6"
        >
          Go back
        </Button>
        <Button size="sm" onClick={openConfirmation} className="px-6">
          Publish Listing
        </Button>
      </div>

      <div className="mt-6 flex flex-col gap-10 xl:flex-row xl:items-start xl:gap-12">
        <div className="min-w-0 flex-1">
          <PropertyGallery images={details.gallery} title={property.title} />
          <PropertyOverview
            property={property}
            details={details}
            className="mt-10"
          />
        </div>
        <PropertySidePanel
          property={property}
          details={details}
          className="xl:w-86.25 xl:shrink-0"
        />
      </div>

      <PublishConfirmationModal
        open={confirmationOpen}
        onClose={closeConfirmation}
        onGoToDashboard={goToDashboard}
      />
    </div>
  );
}
