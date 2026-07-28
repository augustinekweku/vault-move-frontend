import type { Deal, DealTab } from "~/types";
import { IMAGES } from "~/data/listings";

/** Tabs across the top of the deal-room page — "all" and "reports" are
 *  views, the rest filter the deals list by status. */
export const DEAL_TABS: { value: DealTab; label: string }[] = [
  { value: "all", label: "All Deals" },
  { value: "pending", label: "Pending Deals" },
  { value: "rejected", label: "Rejected Deals" },
  { value: "closed", label: "Closed Deals" },
  { value: "reports", label: "Reports" },
];

/** Deterministic mock deals — the same "Willow Apartment" placeholder deal
 *  twice, both pending verification (no steps completed, "Upload ID" next),
 *  so SSR and client markup match. */
export const MOCK_DEALS: Deal[] = [
  {
    id: "deal-1",
    reference: "23500-AB",
    propertyTitle: "Willow Apartment",
    propertyTag: "Apartment for Rent",
    location: "Achimota, Accra",
    image: IMAGES.listingB,
    date: "4th July 2026",
    status: "pending",
    stepsCompleted: 0,
    stepsTotal: 5,
    nextStepLabel: "Upload ID",
  },
  {
    id: "deal-2",
    reference: "23500-AB",
    propertyTitle: "Willow Apartment",
    propertyTag: "Apartment for Rent",
    location: "Achimota, Accra",
    image: IMAGES.listingB,
    date: "4th July 2026",
    status: "pending",
    stepsCompleted: 0,
    stepsTotal: 5,
    nextStepLabel: "Upload ID",
  },
];

/** The deals listed under a deal-room tab: "all" returns every deal,
 *  "reports" has none yet, and the status tabs filter the mock deals. */
export function getDealsForTab(tab: DealTab): Deal[] {
  if (tab === "reports") return [];
  if (tab === "all") return MOCK_DEALS;
  return MOCK_DEALS.filter((deal) => deal.status === tab);
}
