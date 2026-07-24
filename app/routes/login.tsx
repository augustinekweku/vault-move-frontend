import type { Route } from "./+types/login";
import { AuthLayout } from "~/components/auth/AuthLayout";
import { LoginForm } from "~/components/auth/LoginForm";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login — Vault Move Africa" },
    {
      name: "description",
      content: "Log into your Vault Move Africa account.",
    },
  ];
}

export default function Login() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
