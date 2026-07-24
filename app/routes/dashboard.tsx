import { useState } from "react";
import { useLocation } from "react-router";
import type { Route } from "./+types/dashboard";
import { getFeaturedListings } from "~/services/listings.service";
import { DashboardHero } from "~/components/dashboard/DashboardHero";
import { CompleteProfileModal } from "~/components/dashboard/CompleteProfileModal";
import { FeaturedListings } from "~/components/home/FeaturedListings";
import { Toast } from "~/components/ui/Toast";

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
  // The profile setup wizard lands here with `profileCompleted` in the
  // navigation state: skip the prompt modal and confirm with a toast.
  const location = useLocation();
  const profileCompleted =
    (location.state as { profileCompleted?: boolean } | null)
      ?.profileCompleted === true;

  // The prompt modal shows on every landing for now — later this will be
  // driven by the signed-in user's profile-completion state.
  const [profilePromptOpen, setProfilePromptOpen] = useState(
    !profileCompleted,
  );
  const [successToastOpen, setSuccessToastOpen] = useState(profileCompleted);

  return (
    <>
      <CompleteProfileModal
        open={profilePromptOpen}
        onClose={() => setProfilePromptOpen(false)}
      />
      {successToastOpen && (
        <Toast
          title="Success!"
          message="Your email profile has been completed!"
          onClose={() => setSuccessToastOpen(false)}
        />
      )}
      <DashboardHero />
      <FeaturedListings properties={featured} />
    </>
  );
}
