import type { Deal, DealDetails, DealTab } from "~/types";
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

/** Deal-progress step labels, in order — the tab bar on the deal detail
 *  page. */
export const DEAL_STEPS = [
  "ID Verification",
  "Renters Contract",
  "Payment",
  "Handing Over",
  "Closing",
];

/** Shared detail-page content for every mock deal (they are all the same
 *  "Willow Apartment" placeholder). Keyed per deal once the API is live. */
export const MOCK_DEAL_DETAILS: DealDetails = {
  startedDate: "30th June 2026",
  propertyId: "listing-1",
  landlord: {
    id: "john-doe",
    name: "James Doe",
    avatar: IMAGES.avatar,
    verified: true,
    role: "Verified Landlord",
  },
  steps: DEAL_STEPS,
  currentStep: 1,
  renterRequirements: [
    {
      id: "utility-bill",
      title: "Upload utility bill /Proof of current address",
      description: "Recent utility bill or tenancy proof",
      state: "upload",
    },
    {
      id: "references",
      title: "Upload references",
      description: "Upload a reference letter",
      state: "upload",
    },
  ],
  landlordRequirements: [
    { id: "proof-of-ownership", title: "Proof of ownership", state: "pending" },
    { id: "tenancy-agreement", title: "Tenancy agreement", state: "pending" },
  ],
  whatsNext:
    "Your offer was accepted! verify all the necessary documents and review those sent by the agents",
};
