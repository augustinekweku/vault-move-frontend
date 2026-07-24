import { useState } from "react";
import type { Route } from "./+types/dashboard";
import { getFeaturedListings } from "~/services/listings.service";
import { DashboardHero } from "~/components/dashboard/DashboardHero";
import { CompleteProfileModal } from "~/components/dashboard/CompleteProfileModal";
import { FeaturedListings } from "~/components/home/FeaturedListings";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home — Vault Move Africa" },
    {
      name: "description",
      content: "Search verified properties and pick up where you left off.",
    },
  ];
}

export async function loader() {
  const featured = await getFeaturedListings(6);
  return { featured };
}

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  const { featured } = loaderData;
  // Shown on every landing for now — later this will be driven by the
  // signed-in user's profile-completion state.
  const [profilePromptOpen, setProfilePromptOpen] = useState(true);

  return (
    <>
      <CompleteProfileModal
        open={profilePromptOpen}
        onClose={() => setProfilePromptOpen(false)}
      />
      <DashboardHero />
      <FeaturedListings properties={featured} />
    </>
  );
}
