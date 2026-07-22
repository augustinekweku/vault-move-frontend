import type { NavLink } from "~/types";

export const MAIN_NAV: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Buy", href: "/buy" },
  { label: "Rent", href: "/rent" },
  {
    label: "Portals",
    href: "/portals",
    children: [
      { label: "For Agents", href: "/portals#agents" },
      { label: "For Landlords", href: "/portals#landlords" },
      { label: "For Real estate Developers", href: "/portals#developers" },
    ],
  },
  { label: "About us", href: "/about" },
  { label: "How Escrow works", href: "/faq#escrow" },
];

export const FOOTER_NAV: { title: string; links: NavLink[] }[] = [
  {
    title: "Find Property",
    links: [
      { label: "Buy Properties", href: "/buy" },
      { label: "Rent Properties", href: "/rent" },
      { label: "Featured Properties", href: "/buy" },
    ],
  },
  {
    title: "Portals",
    links: [
      { label: "For Landlords", href: "/portals#landlords" },
      { label: "For Agents", href: "/portals#agents" },
      { label: "For Real Estate developers", href: "/portals#developers" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Contact us", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "How Escrow works", href: "/faq#escrow" },
      { label: "Deal room", href: "/faq" },
      { label: "Rental Laws in Ghana", href: "/faq" },
    ],
  },
  {
    title: "Support",
    links: [{ label: "FAQ's", href: "/faq" }],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms and Conditions", href: "/terms" },
      { label: "Escrow terms", href: "/privacy" },
    ],
  },
];

export const PROPERTY_TYPES = [
  "Apartments",
  "Townhouses",
  "Single Family house",
  "Flats",
];
