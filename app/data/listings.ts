import type { Property } from "~/types";

/**
 * Central place for placeholder imagery. Swap these URLs for real assets
 * (or a CDN) when the backend is ready.
 */
export const IMAGES = {
  heroPrimary:
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  ctaHouse:
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
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
