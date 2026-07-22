import type { Route } from "./+types/about";
import { PageHero } from "~/components/common/PageHero";
import { WaitlistSection } from "~/components/common/WaitlistSection";
import { VisionSection } from "~/components/about/VisionSection";
import { MissionSection } from "~/components/about/MissionSection";
import { TeamSection } from "~/components/about/TeamSection";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About us — Vault Move Africa" },
    {
      name: "description",
      content:
        "Everything you need to market properties, manage enquiries, track offers, and close deals—all from one platform.",
    },
  ];
}

export default function About() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About us" }]}
        title={
          <>
            Property transactions,{" "}
            <span className="block text-accent">made simple and secure.</span>
          </>
        }
        subtitle="Everything you need to market properties, manage enquiries, track offers, and close deals—all from one platform."
      />

      <VisionSection />
      <MissionSection />
      <TeamSection />

      <WaitlistSection />
    </>
  );
}
