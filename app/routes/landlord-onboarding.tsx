import type { Route } from "./+types/landlord-onboarding";
import { LandlordOnboardingFlow } from "~/components/auth/LandlordOnboardingFlow";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Landlord Onboarding — Vault Move Africa" },
    {
      name: "description",
      content:
        "Set up your landlord, agent or developer account on Vault Move Africa.",
    },
  ];
}

export default function LandlordOnboarding() {
  return <LandlordOnboardingFlow />;
}
