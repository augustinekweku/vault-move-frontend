import type { ComponentType, SVGProps } from "react";
import type { AccordionItem } from "~/components/ui/Accordion";

export type ListingCategory = "rent" | "buy";

export interface Agent {
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
