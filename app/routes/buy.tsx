import type { Route } from "./+types/buy";
import { searchListings } from "~/services/listings.service";
import { SearchResults } from "~/components/property/SearchResults";
import { WaitlistSection } from "~/components/common/WaitlistSection";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Buy Properties — Vault Move Africa" },
    { name: "description", content: "Browse verified properties for sale." },
  ];
}

export async function loader() {
  const properties = await searchListings({ category: "buy" });
  return { properties };
}

export default function Buy({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <SearchResults
        properties={loaderData.properties}
        category="buy"
        breadcrumbLabel="Search properties for sale"
      />
      <WaitlistSection />
    </>
  );
}
