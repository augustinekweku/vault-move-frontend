import type { Route } from "./+types/signup";
import { AuthLayout } from "~/components/auth/AuthLayout";
import { SignUpFlow } from "~/components/auth/SignUpFlow";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sign Up — Vault Move Africa" },
    {
      name: "description",
      content: "Create your Vault Move Africa account.",
    },
  ];
}

export default function SignUp() {
  return (
    <AuthLayout>
      <SignUpFlow />
    </AuthLayout>
  );
}
