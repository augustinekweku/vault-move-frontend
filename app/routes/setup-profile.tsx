import type { Route } from "./+types/setup-profile";
import { AuthLayout } from "~/components/auth/AuthLayout";
import { ProfileSetupFlow } from "~/components/auth/ProfileSetupFlow";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Set Up Your Profile — Vault Move Africa" },
    {
      name: "description",
      content: "Add your preferences to complete your Vault Move profile.",
    },
  ];
}

export default function SetupProfile() {
  return (
    <AuthLayout>
      <ProfileSetupFlow />
    </AuthLayout>
  );
}
