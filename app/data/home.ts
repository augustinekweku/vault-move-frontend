import type { NumberedStep, Stat } from "~/types";
import { SearchIcon, DocumentIcon, ShieldIcon } from "~/components/ui/icons";

/** "How it works" steps on the landing page. */
export const HOW_IT_WORKS_STEPS: NumberedStep[] = [
  {
    number: "01",
    title: "Discover and Connect",
    description:
      "Use searches, verified listings, apply filters, save properties and communicate directly with agents or landlords.",
    Icon: SearchIcon,
  },
  {
    number: "02",
    title: "Offer and Progress the deal",
    description:
      "Submit offers on rental applications and track milestones, approvals and next steps.",
    Icon: DocumentIcon,
  },
  {
    number: "03",
    title: "Rent or Buy your property",
    description:
      "Deposits are managed through escrow workflows with transparent tracking, dispute handling and transaction updates.",
    Icon: ShieldIcon,
  },
];

/** "Built around trust." stats band on the landing page. */
export const TRUST_STATS: Stat[] = [
  { value: "110+", label: "Verified Property Listings" },
  { value: "60+", label: "Renters and Sellers" },
  { value: "80+", label: "Offers Managed" },
  { value: "100%", label: "Protected Deal Tracking" },
];
