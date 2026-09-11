import type { Route } from "./+types/listings";
import { getPortalListings } from "~/services/listings.service";
import { DashboardStats } from "~/components/dashboard/DashboardStats";
import { ListingsSection } from "~/components/listings/ListingsSection";
import { PORTAL_LISTINGS_STATS } from "~/data/listing";

/** Header title of the portal layout — this route owns the Listings rail
 *  entry (and its icon), including the preview page beneath it. */
export const handle = { title: "Listings" };

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Listings — Vault Move Africa" },
    {
      name: "description",
      content:
        "Manage your Vault Move Africa listings: statuses, pricing, views and edits.",
    },
  ];
}

export async function loader({}: Route.LoaderArgs) {
  return getPortalListings();
}

/** Landlord/agent/developer Listings page: the summary strip over the
 *  searchable, filterable listings table with pagination. */
export default function Listings({ loaderData }: Route.ComponentProps) {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 sm:p-6">
      <DashboardStats stats={PORTAL_LISTINGS_STATS} />
      <ListingsSection listings={loaderData} />
    </div>
  );
}
