import type { Property, FilterBlock } from "~/types";

/**
 * Central place for placeholder imagery. Swap these URLs for real assets
 * (or a CDN) when the backend is ready.
 */
export const IMAGES = {
  heroPrimary: "/images/hero-image.png",
  ctaHouse: "/images/property-transactions.png",
  avatar:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  listingA:
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
  listingB:
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
  listingC:
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80",
} as const;

const AGENT = {
  name: "James Doe",
  avatar: IMAGES.avatar,
  verified: true,
  role: "Verified Landlord",
};

const baseImages = [IMAGES.listingA, IMAGES.listingB, IMAGES.listingC];

/** Deterministic mock listings so SSR and client render identically. */
export const MOCK_LISTINGS: Property[] = Array.from({ length: 12 }).map(
  (_, i) => ({
    id: `listing-${i + 1}`,
    title: "Willow Apartments",
    location: "Adjiringanor",
    price: 1500,
    priceUnit: "month",
    currency: "ghc",
    bedrooms: 2,
    bathrooms: 2,
    rating: 4,
    image: baseImages[i % baseImages.length],
    category: i % 2 === 0 ? "rent" : "buy",
    tag: i % 2 === 0 ? "Apartment for Rent" : "Apartment for Sale",
    agent: AGENT,
  }),
);

const ROOM_COUNTS = ["1", "2", "3", "4", "5", "6+"];

/** Filters modal content, laid out as the four columns in the Figma frame. */
export const FILTER_COLUMNS: FilterBlock[][] = [
  [
    {
      kind: "options",
      id: "property-type",
      title: "Property Type",
      options: [
        "Apartment",
        "Detached House",
        "Semi-Detached House",
        "Townhouse",
        "Duplex",
        "Serviced Apartment",
        "Others",
      ],
    },
    {
      kind: "select",
      id: "bedrooms",
      title: "Number of bedrooms",
      placeholder: "Number of bedrooms",
      options: ROOM_COUNTS,
    },
    {
      kind: "select",
      id: "bathrooms",
      title: "Number of bathrooms",
      placeholder: "Number of bathrooms",
      options: ROOM_COUNTS,
    },
    {
      kind: "budget",
      id: "budget",
      title: "Budget",
      placeholder: "eg 3500",
      suffix: "/mo",
    },
  ],
  [
    {
      kind: "options",
      id: "listing-type",
      title: "Listing Type",
      options: ["For Sale", "For Rent", "Short stay (1-6 months)"],
    },
    {
      kind: "options",
      id: "availability",
      title: "Availability",
      options: ["Available Now", "In three months", "In six months"],
    },
    {
      kind: "options",
      id: "amenities",
      title: "Amenities and Utilities",
      options: [
        "Water supply",
        "Electricity",
        "Internet",
        "Backup power",
        "Waste disposal",
        "Smart home features",
      ],
    },
  ],
  [
    {
      kind: "options",
      id: "building-conditions",
      title: "Building conditions",
      options: ["Newly built", "Renovated", "Existing building"],
    },
    {
      kind: "options",
      id: "furnishing-status",
      title: "Furnishing status",
      options: ["Furnished", "Semi-Furnished", "Unfurnished"],
    },
  ],
  [
    {
      kind: "options",
      id: "interior-features",
      title: "Interior Features",
      options: [
        "Air conditioning",
        "Wi-Fi",
        "Furnished kitchen",
        "Appliances",
        "Walk in closet",
        "Balcony",
        "Laundry",
        "Storage room",
      ],
    },
    {
      kind: "options",
      id: "parking",
      title: "Parking",
      options: [
        "Private parking",
        "Visitors parking",
        "EV charging",
        "Garage",
        "Street parking",
      ],
    },
    {
      kind: "options",
      id: "building-features",
      title: "Building features",
      options: [
        "Elevator / lift",
        "Concierge",
        "Security",
        "Gym",
        "Roof top terrace",
      ],
    },
  ],
];
