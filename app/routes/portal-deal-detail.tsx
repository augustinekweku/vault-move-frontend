import type { Route } from "./+types/portal-deal-detail";
import { getPortalDealById } from "~/services/deals.service";
import { PortalDealDetailSection } from "~/components/deals/PortalDealDetailSection";

/** Header title of the portal layout — this page sits under the Deal Room
 *  rail entry, which keeps the active styling. */
export const handle = { title: "Deal Room" };

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Deal Room — Vault Move Africa" },
    {
      name: "description",
      content:
        "Verify documents and track every step of the deal in your Vault Move Africa workspace.",
    },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const detail = await getPortalDealById(params.dealId ?? "");
  if (!detail) throw new Response(null, { status: 404 });
  return detail;
}

/** Landlord/agent/developer deal workspace page: the deal-progress stepper
 *  over the landlord's Documents step beside the property, tenant and
 *  What's Next? sidebar. */
export default function PortalDealDetail({ loaderData }: Route.ComponentProps) {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 sm:p-6">
      <PortalDealDetailSection detail={loaderData} />
    </div>
  );
}
