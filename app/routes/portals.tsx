import type { Route } from "./+types/portals";
import { Container } from "~/components/ui/Container";
import { PageHero } from "~/components/common/PageHero";
import { WaitlistSection } from "~/components/common/WaitlistSection";
import { StepsSection } from "~/components/portals/StepsSection";
import { FeatureSection } from "~/components/portals/FeatureSection";
import { CtaSection } from "~/components/portals/CtaSection";
import { PORTAL_BLOCKS } from "~/data/portals";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Portals — Vault Move Africa" },
    {
      name: "description",
      content:
        "Everything you need to market properties, manage enquiries, track offers, and close deals.",
    },
  ];
}

export default function Portals() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Portals" },
          { label: "For Agents" },
        ]}
        title={
          <>
            Rent or Sell Your Development{" "}
            <span className="block text-accent">with Confidence.</span>
          </>
        }
        subtitle="Everything you need to market properties, manage enquiries, track offers, and close deals—all from one platform."
      />

      <StepsSection />

      {PORTAL_BLOCKS.map((block, i) => (
        <FeatureSection key={block.id} block={block} alt={i % 2 === 0} />
      ))}

      {/* TODO: replace with real pricing tiers */}
      <section className="bg-brand py-16 text-center text-white">
        <Container>
          <h2 className="text-3xl font-bold">PRICING</h2>
        </Container>
      </section>

      <CtaSection />

      <WaitlistSection />
    </>
  );
}
