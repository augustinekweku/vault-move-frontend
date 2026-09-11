import type { NavLink, SideMenuLink } from "~/types";

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
      { label: "How Escrow works", href: "/resources#escrow" },
      { label: "Deal room", href: "/resources#deal-room" },
      { label: "Rental Laws in Ghana", href: "/resources#rental-laws" },
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
      { label: "Escrow terms", href: "/escrow-terms" },
    ],
  },
];

export const PROPERTY_TYPES = [
  "Apartments",
  "Townhouses",
  "Single Family house",
  "Flats",
];

/** Price range options in the property search bar. */
export const PRICE_RANGES = ["0 - 500", "500 - 1000", "1000 - 2000", "2000+"];

/** Signed-in buyer/renter navbar (dashboard area). */
export const APP_NAV: NavLink[] = [
  { label: "Home", href: "/dashboard" },
  { label: "Buy", href: "/buy" },
  { label: "Rent", href: "/rent" },
];

/** Account dropdown of the signed-in navbar user chip, in two groups — the
 *  design leaves a blank band between them (reserved for upcoming entries).
 *  Enquiries points at the dashboard until its page exists. */
export const USER_MENU_PRIMARY: NavLink[] = [
  { label: "Saved Properties", href: "/saved-properties" },
  { label: "Enquiries", href: "/dashboard" },
  { label: "Deal Room", href: "/deal-room" },
];

export const USER_MENU_SECONDARY: NavLink[] = [
  { label: "My Account", href: "/my-account" },
  { label: "Sign out", href: "/login" },
];

/** Side menu of the landlord/agent/developer portal, in two groups. Entries
 *  flagged `placeholder` have no page yet — they link at the dashboard but
 *  never take the active styling (only the real current page does). */
export const PORTAL_MAIN_MENU: SideMenuLink[] = [
  { label: "Dashboard", href: "/dashboard", icon: "/icons/dashboard.svg" },
  {
    label: "Listings",
    href: "/dashboard/listings",
    icon: "/icons/listings.svg",
  },
  {
    label: "Enquiries",
    href: "/dashboard/enquiries",
    icon: "/icons/enquiries.svg",
  },
  {
    label: "Offers",
    href: "/dashboard/offers",
    icon: "/icons/offers.svg",
  },
  { label: "Deal Room", href: "/deal-room", icon: "/icons/deal-room.svg" },
  {
    label: "Escrow",
    href: "/dashboard",
    icon: "/icons/escrow.svg",
    placeholder: true,
  },
];

export const PORTAL_OTHER_MENU: SideMenuLink[] = [
  { label: "My Account", href: "/my-account", icon: "/icons/my-account.svg" },
  {
    label: "Settings",
    href: "/dashboard",
    icon: "/icons/settings.svg",
    placeholder: true,
  },
  {
    label: "Subscriptions",
    href: "/dashboard",
    icon: "/icons/subscriptions.svg",
    placeholder: true,
  },
  { label: "Help", href: "/faq", icon: "/icons/help.svg" },
];
