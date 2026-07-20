import type { Route } from "./+types/rent";
import { searchListings } from "~/services/listings.service";
import { SearchResults } from "~/components/property/SearchResults";
import { WaitlistSection } from "~/components/common/WaitlistSection";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Rent Properties — Vault Move Africa" },
    { name: "description", content: "Browse verified properties for rent." },
  ];
}

export async function loader() {
  const properties = await searchListings({ category: "rent" });
  return { properties };
}

export default function Rent({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <SearchResults
        properties={loaderData.properties}
        category="rent"
        breadcrumbLabel="Search properties for rent"
      />
      <WaitlistSection />
    </>
  );
}
