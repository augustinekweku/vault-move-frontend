import type { Route } from "./+types/faq";
import { PageHero } from "~/components/common/PageHero";
import { WaitlistSection } from "~/components/common/WaitlistSection";
import { FaqSection } from "~/components/faq/FaqSection";
import { ContactSection } from "~/components/faq/ContactSection";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "FAQ — Vault Move Africa" },
    {
      name: "description",
      content: "Frequently asked questions about Vault Move Africa.",
    },
  ];
}

export default function Faq() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "FAQ's" }]}
        title={
          <>
            Frequently asked <span className="text-accent">questions.</span>
          </>
        }
        subtitle="Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat."
      />

      <FaqSection />
      <ContactSection />

      <WaitlistSection />
    </>
  );
}
