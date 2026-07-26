import type { ComponentType, SVGProps } from "react";
import type { AccordionItem } from "~/components/ui/Accordion";

export type ListingCategory = "rent" | "buy";

export interface Agent {
  id: string;
  name: string;
  avatar: string;
  verified: boolean;
  role: string;
}

export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  priceUnit: "month" | "total";
  currency: string;
  bedrooms: number;
  bathrooms: number;
  rating: number;
  image: string;
  category: ListingCategory;
  tag: string;
  agent: Agent;
  /** Approximate map position — used for the pins on the map view. */
  coordinates: { lat: number; lng: number };
}

/** Icon keys for property facts — kept as strings (not component refs) so
 *  PropertyDetails stays JSON-serialisable across the loader boundary. */
export type PropertyFactIcon = "home" | "bed" | "bath" | "sofa" | "building";

export interface PropertyFact {
  label: string;
  value: string;
  icon: PropertyFactIcon;
}

export interface PropertyCharge {
  label: string;
  amount: string;
}

export interface PropertyFeatureGroup {
  title: string;
  items: string[];
}

/** One star band in the ratings breakdown (e.g. 5 stars → 182 ratings). */
export interface RatingBreakdownRow {
  stars: number;
  count: number;
}

export interface PropertyReviewSummary {
  /** Average score out of 5, shown in the donut gauge. */
  average: number;
  /** Total number of ratings, shown under the gauge. */
  total: number;
  /** One row per star band, ordered 5 → 1. */
  breakdown: RatingBreakdownRow[];
}

export interface PropertyReview {
  id: string;
  author: string;
  avatar: string;
  /** Score out of 5 given by this reviewer. */
  rating: number;
  text: string;
}

/** Everything on the "Reviews" tab of the property details page. */
export interface PropertyReviews {
  summary: PropertyReviewSummary;
  items: PropertyReview[];
}

/** Extra content shown on the property details page (beyond the card data). */
export interface PropertyDetails {
  /** First image is the large one; the rest fill the 2x2 thumbnail grid. */
  gallery: string[];
  /** Full location line, e.g. "Achimota, Accra". */
  address: string;
  availability: string;
  charges: PropertyCharge[];
  facts: PropertyFact[];
  description: string[];
  /** Chip groups under the "Building features" heading. */
  featureGroups: PropertyFeatureGroup[];
  /** Chips under "Amenities and Utilities". */
  amenities: string[];
  /** Bullet list under "House Rules". */
  houseRules: string[];
  /** Rating summary + individual reviews for the "Reviews" tab. */
  reviews: PropertyReviews;
}

/** Public landlord profile page (/landlords/:landlordId). */
export interface LandlordProfile {
  id: string;
  name: string;
  avatar: string;
  verified: boolean;
  /** e.g. "Verified Landlord". */
  role: string;
  /** e.g. "Achimota, Accra". */
  location: string;
  /** Average score out of 5, shown as stars next to the name. */
  rating: number;
  /** Body paragraphs on the "Landlord's Profile" tab. */
  bio: string[];
  /** The four figures in the stats card (Listed Properties, Views, ...). */
  stats: Stat[];
  /** Rating summary + individual reviews for the "Reviews" tab. */
  reviews: PropertyReviews;
}

/** One checklist row in the ui/Toast `steps` variant (enquiry-submitted
 *  success toast): done rows get the teal check, pending rows a grey ring. */
export interface ToastStep {
  label: string;
  done: boolean;
}

/** One conversation row in the "Recent Messages" sidebar (enquiry page). */
export interface Conversation {
  id: string;
  name: string;
  avatar: string;
  verified: boolean;
  /** e.g. "Verified Landlord". */
  role: string;
  /** Relative timestamp, e.g. "2 mins ago". */
  time: string;
  /** Shows the green presence dot next to the timestamp. */
  online: boolean;
}

export interface SearchListingsParams {
  category?: ListingCategory;
  propertyType?: string;
  priceRange?: string;
  location?: string;
}

export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

/** A numbered step with an icon — portal onboarding steps, the landing
 *  "How it works" steps, etc. */
export interface NumberedStep {
  number: string;
  title: string;
  description: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export interface Stat {
  value: string;
  label: string;
}

/** A sign-up password requirement, ticked live while typing. */
export interface PasswordRule {
  id: string;
  label: string;
  test: (password: string) => boolean;
}

export interface TeamMember {
  name: string;
  role: string;
}

export interface ContactMethod {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  value: string;
}

export interface FaqGroup {
  id: string;
  title: string;
  items: AccordionItem[];
}

export interface LegalSection {
  /** Omit for the untitled intro block. */
  heading?: string;
  paragraphs: string[];
}

export interface ResourceArticle {
  id: string;
  category: string;
  title: string;
  date: string;
  readTime: string;
  image: string;
  /** Body paragraphs rendered on the article detail page. */
  body: string[];
}

export interface ResourceSection {
  id: string;
  articles: ResourceArticle[];
}

export interface PortalFeature {
  title: string;
  description: string;
}

export interface PortalFeatureBlock {
  id: string;
  titleTop: string;
  titleBottom: string;
  features: PortalFeature[];
}

export interface FilterOptionsGroup {
  kind: "options";
  id: string;
  title: string;
  options: string[];
}

export interface FilterSelectBlock {
  kind: "select";
  id: string;
  title: string;
  placeholder: string;
  options: string[];
}

export interface FilterBudgetBlock {
  kind: "budget";
  id: string;
  title: string;
  placeholder: string;
  suffix: string;
}

export type FilterBlock =
  | FilterOptionsGroup
  | FilterSelectBlock
  | FilterBudgetBlock;
