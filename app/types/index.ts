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

export interface PortalStep {
  number: string;
  title: string;
  description: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
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
