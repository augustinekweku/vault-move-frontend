import type { Route } from "./+types/select-user-type";
import { SelectUserType } from "~/components/auth/SelectUserType";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Select User Type — Vault Move Africa" },
    {
      name: "description",
      content:
        "Tell Vault Move Africa how you'll use the platform — as a real-estate developer, landlord, or agent.",
    },
  ];
}

export default function SelectUserTypePage() {
  return <SelectUserType />;
}
