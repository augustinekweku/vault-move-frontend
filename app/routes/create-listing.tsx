import { useSearchParams } from "react-router";
import type { Route } from "./+types/create-listing";
import {
  CreateListingFlow,
  type ListingAudience,
} from "~/components/listing/CreateListingFlow";

/** Header title of the portal layout. This page keeps the Dashboard title
 *  (and its rail icon) while the wizard heading below names the flow. */
export const handle = { title: "Dashboard" };

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Create a Listing — Vault Move Africa" },
    {
      name: "description",
      content:
        "List a property on Vault Move Africa: details, location, pricing, features and documents in eight steps.",
    },
  ];
}

export default function CreateListing() {
  // Preview override for the audience-specific step until the signed-in role
  // comes from the backend: `?audience=agent` or `?audience=developer`.
  // Anything else falls through to the landlord flow.
  const [searchParams] = useSearchParams();
  const param = searchParams.get("audience");
  const audience: ListingAudience =
    param === "agent" || param === "developer" ? param : "landlord";
  return <CreateListingFlow audience={audience} />;
}
