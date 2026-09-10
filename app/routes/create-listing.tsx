import type { Route } from "./+types/create-listing";
import { CreateListingFlow } from "~/components/listing/CreateListingFlow";

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
  return <CreateListingFlow />;
}
