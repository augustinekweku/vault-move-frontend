import type { Route } from "./+types/portal-deal-room";
import { getPortalDeals } from "~/services/deals.service";
import { DealsSection } from "~/components/deals/DealsSection";

/** Header title of the portal layout — this route owns the Deal Room rail
 *  entry (and its icon). */
export const handle = { title: "Deal Room" };

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Deal Room — Vault Move Africa" },
    {
      name: "description",
      content:
        "Track escrow-secured deals across your Vault Move Africa listings by property.",
    },
  ];
}

export async function loader({}: Route.LoaderArgs) {
  return getPortalDeals();
}

/** Landlord/agent/developer Deal Room page: the searchable, filterable
 *  deals-by-property table with pagination. */
export default function PortalDealRoom({ loaderData }: Route.ComponentProps) {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 sm:p-6">
      <DealsSection deals={loaderData} />
    </div>
  );
}
