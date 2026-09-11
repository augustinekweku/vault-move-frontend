import type { Route } from "./+types/offer-detail";
import { getOfferDetail } from "~/services/listings.service";
import { OfferDetailHeader } from "~/components/offers/OfferDetailHeader";
import { OfferDetailSection } from "~/components/offers/OfferDetailSection";

/** Header title of the portal layout — this page sits under the Offers
 *  rail entry, which keeps the active styling. */
export const handle = { title: "Offers" };

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Offers — Vault Move Africa" },
    {
      name: "description",
      content:
        "Review every offer received on this Vault Move Africa listing.",
    },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const detail = await getOfferDetail(params.offerId ?? "");
  if (!detail) throw new Response(null, { status: 404 });
  return detail;
}

/** Landlord/agent/developer offer-detail page: the listing summary card
 *  over the tabbed bid table with pagination. */
export default function OfferDetail({ loaderData }: Route.ComponentProps) {
  const { draft, pricing, bids, property, address } = loaderData;
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 sm:p-6">
      <OfferDetailHeader draft={draft} pricing={pricing} />
      <OfferDetailSection
        bids={bids}
        propertyTitle={draft.title}
        location={draft.location}
        property={property}
        address={address}
      />
    </div>
  );
}
