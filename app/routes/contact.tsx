import type { Route } from "./+types/contact";
import { PageHero } from "~/components/common/PageHero";
import { WaitlistSection } from "~/components/common/WaitlistSection";
import { ContactSection } from "~/components/contact/ContactSection";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contact Us — Vault Move Africa" },
    { name: "description", content: "Get in touch with the Vault Move team." },
  ];
}

export default function Contact() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
        title={
          <>
            Contact <span className="text-accent">Us.</span>
          </>
        }
        subtitle="Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat."
      />

      <ContactSection />

      <WaitlistSection />
    </>
  );
}
