import type { Route } from "./+types/signup";
import { AuthLayout } from "~/components/auth/AuthLayout";
import { SignUpForm } from "~/components/auth/SignUpForm";

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
      <SignUpForm />
    </AuthLayout>
  );
}
