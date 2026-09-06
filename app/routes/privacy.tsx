import type { Route } from "./+types/privacy";
import { PageHero } from "~/components/common/PageHero";
import { WaitlistSection } from "~/components/common/WaitlistSection";
import { PrivacyContent } from "~/components/privacy/PrivacyContent";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Privacy Policy — Vault Move Africa" },
    {
      name: "description",
      content: "How Vault Move collects, uses, stores, and protects your data.",
    },
  ];
}

export default function Privacy() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy" },
        ]}
        title={
          <>
            Privacy <span className="text-accent">Policy.</span>
          </>
        }
        subtitle="Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat."
      />

      <PrivacyContent />

      <WaitlistSection />
    </>
  );
}
