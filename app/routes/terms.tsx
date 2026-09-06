import type { Route } from "./+types/terms";
import { PageHero } from "~/components/common/PageHero";
import { WaitlistSection } from "~/components/common/WaitlistSection";
import { LegalDocContent } from "~/components/common/LegalDocContent";
import { TERMS_SECTIONS } from "~/data/terms";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Terms and Conditions — Vault Move Africa" },
    {
      name: "description",
      content: "The terms that govern access to and use of the Vault Move platform.",
    },
  ];
}

export default function Terms() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Terms and Conditions" },
        ]}
        title={
          <>
            Terms and <span className="text-accent">Conditions.</span>
          </>
        }
        subtitle="Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat."
      />

      <LegalDocContent title="Terms & Conditions" sections={TERMS_SECTIONS} />

      <WaitlistSection />
    </>
  );
}
