import type { Route } from "./+types/home";
import { getFeaturedListings } from "~/services/listings.service";
import { HeroSection } from "~/components/home/HeroSection";
import { HowItWorks } from "~/components/home/HowItWorks";
import { FeaturedListings } from "~/components/home/FeaturedListings";
import { StatsSection } from "~/components/home/StatsSection";
import { CtaSection } from "~/components/home/CtaSection";
import { WaitlistSection } from "~/components/common/WaitlistSection";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Vault Move Africa — Find, Offer & Secure Your Next Property" },
    {
      name: "description",
      content:
        "A hybrid property marketplace built to make every transaction safer and easier to complete.",
    },
  ];
}

export async function loader() {
  const featured = await getFeaturedListings(6);
  return { featured };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { featured } = loaderData;
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <FeaturedListings properties={featured} />
      <StatsSection />
      <CtaSection />
      <WaitlistSection />
    </>
  );
}
