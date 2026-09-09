import { useState } from "react";
import { useLocation, useSearchParams } from "react-router";
import type { Route } from "./+types/dashboard";
import { DashboardStats } from "~/components/dashboard/DashboardStats";
import { RecentListings } from "~/components/dashboard/RecentListings";
import {
  ProfileStatusCard,
  type VerificationStatus,
} from "~/components/dashboard/ProfileStatusCard";
import { MessagesCard } from "~/components/dashboard/MessagesCard";
import { VerificationQuerySheet } from "~/components/dashboard/VerificationQuerySheet";
import { Toast } from "~/components/ui/Toast";
import { DASHBOARD_STATS, DASHBOARD_SYSTEM_MESSAGE } from "~/data/dashboard";

/** Header title of the portal layout (PortalLayout reads this per route). */
export const handle = { title: "Dashboard" };

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard — Vault Move Africa" },
    {
      name: "description",
      content:
        "Your Vault Move Africa dashboard: listings, enquiries, offers and escrow deals at a glance.",
    },
  ];
}

/** Preview override for the reviewed states until the verification status
 *  comes from the backend: `?verification=verified` or `?verification=failed`.
 *  Anything else falls through to the navigation state. */
function previewStatus(param: string | null): VerificationStatus | null {
  if (param === "verified" || param === "failed") return param;
  return null;
}

export default function Dashboard() {
  // The profile-setup wizard lands here with `profileCompleted` in the
  // navigation state: confirm with a toast — the standing prompt is the
  // Profile Status card.
  // The onboarding wizard lands here with `verificationPending` instead: the
  // Profile Status card switches to its verification-in-progress state.
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const state = location.state as {
    profileCompleted?: boolean;
    verificationPending?: boolean;
  } | null;
  const profileCompleted = state?.profileCompleted === true;
  const [successToastOpen, setSuccessToastOpen] = useState(profileCompleted);
  const [queryOpen, setQueryOpen] = useState(false);

  const status: VerificationStatus =
    previewStatus(searchParams.get("verification")) ??
    (state?.verificationPending === true ? "pending" : "default");
  // The Vault Move acknowledgement sits in Messages once the submission
  // exists — i.e. in every state past the default prompt.
  const showSystemMessage = status !== "default";

  function closeSuccessToast() {
    setSuccessToastOpen(false);
  }

  function openQuery() {
    setQueryOpen(true);
  }

  function closeQuery() {
    setQueryOpen(false);
  }

  return (
    <>
      {successToastOpen && (
        <Toast
          title="Success!"
          message="Your email profile has been completed!"
          onClose={closeSuccessToast}
        />
      )}

      <div className="grid gap-6 p-4 sm:p-6 xl:grid-cols-[minmax(0,1fr)_350px]">
        <div className="flex min-w-0 flex-col gap-6">
          <DashboardStats stats={DASHBOARD_STATS} />
          <RecentListings />
        </div>

        <aside className="flex min-w-0 flex-col gap-6">
          <ProfileStatusCard status={status} onViewQuery={openQuery} />
          <MessagesCard
            className="flex-1"
            message={showSystemMessage ? DASHBOARD_SYSTEM_MESSAGE : undefined}
          />
        </aside>
      </div>

      <VerificationQuerySheet open={queryOpen} onClose={closeQuery} />
    </>
  );
}
