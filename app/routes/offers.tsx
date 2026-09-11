import type { Route } from "./+types/offers";
import { getPortalOffers } from "~/services/listings.service";
import { OffersSection } from "~/components/offers/OffersSection";

/** Header title of the portal layout — this route owns the Offers rail
 *  entry (and its icon). */
export const handle = { title: "Offers" };

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Offers — Vault Move Africa" },
    {
      name: "description",
      content:
        "Review offers received on your Vault Move Africa listings by property.",
    },
  ];
}

export async function loader({}: Route.LoaderArgs) {
  return getPortalOffers();
}

/** Landlord/agent/developer Offers page: the searchable, filterable
 *  offers-by-property table with pagination. */
export default function Offers({ loaderData }: Route.ComponentProps) {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 sm:p-6">
      <OffersSection offers={loaderData} />
    </div>
  );
}
