import type { Route } from "./+types/escrow-terms";
import { PageHero } from "~/components/common/PageHero";
import { WaitlistSection } from "~/components/common/WaitlistSection";
import { LegalDocContent } from "~/components/common/LegalDocContent";
import { ESCROW_TERMS_SECTIONS } from "~/data/escrow-terms";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Escrow Terms — Vault Move Africa" },
    {
      name: "description",
      content:
        "The terms governing funds held and released through Vault Move's escrow service.",
    },
  ];
}

export default function EscrowTerms() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Escrow Terms" }]}
        title={
          <>
            Escrow <span className="text-accent">Terms.</span>
          </>
        }
        subtitle="Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat."
      />

      <LegalDocContent title="Escrow Terms" sections={ESCROW_TERMS_SECTIONS} />

      <WaitlistSection />
    </>
  );
}
