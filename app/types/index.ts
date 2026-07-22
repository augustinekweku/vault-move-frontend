import type { ComponentType, SVGProps } from "react";

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
