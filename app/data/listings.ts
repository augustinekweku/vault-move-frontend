import type { Property, PropertyDetails, FilterBlock } from "~/types";

/**
 * Central place for placeholder imagery. Swap these URLs for real assets
 * (or a CDN) when the backend is ready.
 */
export const IMAGES = {
  heroPrimary: "/images/hero-image.png",
  ctaHouse: "/images/property-transactions.png",
  avatar:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  reviewAvatar:
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
  listingA:
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
  listingB:
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
  listingC:
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80",
  listingD:
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
  listingE:
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80",
} as const;

const AGENT = {
  id: "john-doe",
  name: "John Doe",
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
    // Deterministic spread around Achimota, Accra (matches the details-page
    // map) so the map-view pins render identically on server and client.
    coordinates: {
      lat: 5.6145 + ((i % 4) - 1.5) * 0.011,
      lng: -0.2269 + ((i % 3) - 1) * 0.016,
    },
  }),
);

/**
 * Shared details-page content for every mock listing (they are all the same
 * "Willow Apartments" placeholder). Keyed per listing once the API is live.
 */
export const MOCK_PROPERTY_DETAILS: PropertyDetails = {
  gallery: [
    IMAGES.listingA,
    IMAGES.listingB,
    IMAGES.listingC,
    IMAGES.listingD,
    IMAGES.listingE,
  ],
  address: "Achimota, Accra",
  availability: "Available in 3 months",
  charges: [
    { label: "Monthly service charge", amount: "0.00 ghc" },
    { label: "Monthly utility fees", amount: "0.00 ghc" },
  ],
  facts: [
    { label: "Property Type", value: "Townhouse", icon: "home" },
    { label: "Bedrooms", value: "3", icon: "bed" },
    { label: "Bathrooms", value: "3.5", icon: "bath" },
    { label: "Furnishing Status", value: "Semi Furnished", icon: "sofa" },
    { label: "Building Condition", value: "Newly Built", icon: "building" },
  ],
  description: [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  ],
  featureGroups: [
    {
      title: "Interior Features",
      items: [
        "Furnished Kitchen",
        "Air conditioning",
        "Wi-Fi",
        "Laundry",
        "Storage rooms",
      ],
    },
    { title: "Parking", items: ["Private parking", "EV Charging"] },
    {
      title: "Building Features",
      items: ["Elevator/ Lift", "Concierge", "Gym", "Security", "Roof top terrace"],
    },
  ],
  amenities: [
    "Water supply",
    "Electricity",
    "Internet",
    "Back up power",
    "Waste disposal",
    "Smart Home features",
  ],
  houseRules: [
    "Pets allowed",
    "Smoking allowed",
    "Parties and events allowed",
    "Maximum occupancy – 8 persons",
    "Quiet hours apply",
    "Noise restrictions apply",
    "Overnight guests allowed",
  ],
  reviews: {
    summary: {
      average: 4,
      total: 34,
      breakdown: [
        { stars: 5, count: 182 },
        { stars: 4, count: 25 },
        { stars: 3, count: 15 },
        { stars: 2, count: 11 },
        { stars: 1, count: 1 },
      ],
    },
    items: Array.from({ length: 8 }).map((_, i) => ({
      id: `review-${i + 1}`,
      author: "Joan Appleseed",
      avatar: IMAGES.reviewAvatar,
      rating: 4,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    })),
  },
};

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
