import type { Route } from "./+types/resources";
import { PageHero } from "~/components/common/PageHero";
import { WaitlistSection } from "~/components/common/WaitlistSection";
import { ResourcesSection } from "~/components/resources/ResourcesSection";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resources — Vault Move Africa" },
    {
      name: "description",
      content:
        "Guides and insights on escrow, the Deal Room and rental laws in Ghana.",
    },
  ];
}

export default function Resources() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Resources" }]}
        title="Resources"
        subtitle="Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat."
      />

      <ResourcesSection />

      <WaitlistSection />
    </>
  );
}
