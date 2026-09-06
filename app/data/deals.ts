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
 *  twice, both on the closing step (handover done, "Rate Experience"
 *  next), so SSR and client markup match. */
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
    stepsCompleted: 4,
    stepsTotal: 5,
    nextStepLabel: "Rate Experience",
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
    stepsCompleted: 4,
    stepsTotal: 5,
    nextStepLabel: "Rate Experience",
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

/** The "Your Funds are secure" checklist on the Payment step — static
 *  escrow reassurance copy. */
export const ESCROW_ASSURANCES = [
  "Your payment is held securely in Escrow.",
  "The Landlord cannot access the funds yet",
  "Funds are only released after successful handover",
  "If an issue arises before hand over, the funds remain protected while it is resolved.",
];

/** "Handover Confirmed" copy — shared by the confirmation modal (Handing
 *  Over step) and the Closing step panel. */
export const HANDOVER_CONFIRMATION = {
  title: "Handover Confirmed",
  body: "Your handover has been successfully confirmed. If all required confirmations have been received, the escrow process will now continue to the final settlement stage.",
};

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
  currentStep: 5,
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
  contractDocuments: [
    { id: "contract-tenancy", title: "Tenancy agreement", state: "review" },
    { id: "contract-house-rules", title: "House Rules", state: "review" },
  ],
  signedContracts: [
    { id: "signed-tenancy", title: "Tenancy agreement", state: "upload" },
    { id: "signed-house-rules", title: "House Rules", state: "upload" },
  ],
  paymentBreakdown: [
    { label: "Monthly rent", amount: "1,800.00" },
    { label: "Security Deposit (2 months)", amount: "3,600.00" },
    { label: "Service Fee", amount: "180.00" },
  ],
  paymentTotal: "GHS 5,580.00",
  escrowTimeline: [
    { label: "Payment Made", done: false },
    { label: "Funds Secured", done: false },
    { label: "Landlord Notified", done: false },
    { label: "Property handover", done: false },
    { label: "Release Confirmation", done: false },
    { label: "Funds Released", done: false },
  ],
  handoverChecklist: [
    {
      title: "Property Inspection",
      items: [
        "Property inspected",
        "Rooms match the agreed condition",
        "Fixtures and fittings checked",
        "Appliances tested",
        "Existing damages recorded (if any)",
      ],
    },
    {
      title: "Utilities & Services",
      items: [
        "Electricity meter reading recorded",
        "Water meter reading recorded",
        "Utility accounts explained/transferred",
        "Appliances tested",
      ],
    },
    {
      title: "Documents Received",
      items: ["Signed tenancy agreement", "House rules received"],
    },
    {
      title: "Final Confirmation",
      items: [
        "Tenant confirms property received",
        "Landlord confirms successful handover",
        "Escrow ready for release",
      ],
    },
  ],
  whatsNext: [
    "Your offer was accepted! verify all the necessary documents and review those sent by the agents",
    "Once you've reviewed and signed the tenancy agreement, the landlord will be notified automatically. You'll then move to the Payment & Escrow stage, where your deposit will be securely held until the property handover is complete.",
    "",
    "Make sure everything is completed on the handing over checklist and confirm it is completed.",
    "",
  ],
};
