/** Copy + option lists for the landlord/agent/developer create-listing
 *  wizard. Static until the listings API is live. */
import type {
  ListingDraft,
  OfferBid,
  OfferDetailPricing,
  PortalListing,
  PortalOffer,
  Stat,
} from "~/types";

/** The eight wizard steps in order. */
export const CREATE_LISTING_STEPS = [
  "Property details and Description",
  "Location",
  "Pricing",
  "Features",
  "Amenities and utilities",
  "House rules",
  "Media Uploads",
  "Legal Documents",
];

/** Step 1 dropdown options. */
export const PROPERTY_TYPES = [
  "Apartment",
  "House",
  "Villa",
  "Townhouse",
  "Duplex",
  "Studio apartment",
  "Office space",
  "Shop",
  "Warehouse",
  "Land",
];

export const LISTING_TYPES = ["Sale", "Rent", "Short let", "Lease"];

export const FURNISHING_CONDITIONS = [
  "Furnished",
  "Semi-furnished",
  "Unfurnished",
];

export const ROOM_COUNTS = ["1", "2", "3", "4", "5", "6+"];

export const AVAILABILITY_STATUSES = [
  "Available now",
  "Coming soon",
  "Off the market",
];

export const BUILDING_CONDITIONS = [
  "Newly built",
  "Recently renovated",
  "Good condition",
  "Needs renovation",
];

/** Step 2 dropdown + radio options (Ghana-first areas and cities). */
export const AREA_OPTIONS = [
  "Achimota",
  "Osu",
  "Cantonments",
  "East Legon",
  "Spintex",
  "Tema Community 25",
  "Kasoa",
  "Adenta",
  "Madina",
  "Teshie",
];

export const CITY_OPTIONS = [
  "Accra",
  "Tema",
  "Kumasi",
  "Takoradi",
  "Cape Coast",
  "Ho",
  "Tamale",
];

export const LANDMARK_OPTIONS = [
  "Transport",
  "Schools",
  "Malls",
  "Hospitals",
  "Civic / Cultural",
];

/** Step 3 pricing options. */
export const PAYMENT_FREQUENCIES = ["Monthly", "Quarterly", "Yearly"];

export const RENT_DURATIONS = ["Short term", "Long term"];

export const SERVICE_CHARGES = [
  "300 GHC",
  "450 GHC",
  "600 GHC",
  "900 GHC",
  "1,200 GHC",
];

/** Step 4 feature groups. */
export const INTERIOR_FEATURES = [
  "Air conditioning",
  "Wi-Fi",
  "Furnished kitchen",
  "Appliances",
  "Walk in closet",
  "Balcony",
  "Laundry",
  "Storage room",
];

export const PARKING_OPTIONS = [
  "Private parking",
  "Visitors parking",
  "EV charging",
  "Garage",
  "Street parking",
];

export const BUILDING_FEATURES = [
  "Elevator / lift",
  "Concierge",
  "Security",
  "Gym",
  "Roof top terrace",
];

/** Step 5 amenities. */
export const AMENITY_OPTIONS = [
  "Water supply",
  "Electricity",
  "Internet",
  "Backup power",
  "Waste disposal",
  "Smart home features",
];

/** Step 6 house-rule dropdowns. */
export const YES_NO_OPTIONS = ["Yes", "No"];

export const MAX_OCCUPANTS = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10+",
];

/** Step 7 upload guidance checklist. */
export const MEDIA_GUIDELINES = [
  "Upload clear, high-quality photos that accurately represent your property.",
  "Ensure all images and videos are current, relevant, and free from watermarks.",
  "Avoid uploading blurry, dark, duplicate, or heavily edited photos.",
  "Supported formats: JPG, JPEG, PNG, WEBP, MP4, and MOV.",
];

/** Step 8 proof-of-ownership options. */
export const LEGAL_DOCUMENT_OPTIONS = [
  "Land Title Certificate",
  "Land Certificate",
  "Indenture",
  "Lease Agreement (where applicable)",
  "Allocation Letter (if applicable)",
];

/** Step 8 proof-of-authority options for agents and developers. */
export const AUTHORITY_TO_LIST_OPTIONS = [
  "Exclusive Agency Agreement",
  "Property Management Agreement",
  "Letter of Authority from the Property Owner",
  "Power of Attorney (where applicable)",
];

/** Publish confirmation copy for the listing-preview modal. */
export const PUBLISH_CONFIRMATION = {
  title: "Your Listing Is Pending Verification",
  intro: "Thank you for submitting your property.",
  body: "Your property has been submitted successfully and is currently under review. We'll notify you once your listing has been approved and published.",
};

/** In-progress listings for the dashboard Recent Listings panel — mock
 *  until the listings API is live. */
export const MOCK_LISTING_DRAFTS: ListingDraft[] = [
  {
    id: "willow-apartment",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    typeLabel: "Apartment for Rent",
    title: "Willow Apartment",
    location: "Achimota, Accra",
    stars: 4,
    rating: "4.0/5.0",
    createdOn: "Created on 27 July 2026",
    stepLabel: "Step 4 of 8",
    bedrooms: "2 bedrooms",
    bathrooms: "Bathrooms",
    furnishing: "Semi Furnished",
  },
];

/** Summary strip, filter options and footer note for the portal Listings
 *  page — mock until the listings API is live. */
export const PORTAL_LISTINGS_STATS: Stat[] = [
  { value: "5", label: "Total Listings" },
  { value: "5", label: "Active Listings" },
  { value: "3", label: "Pending review" },
  { value: "1", label: "Inactive listings" },
  { value: "120", label: "Total Views" },
];

export const LISTING_STATUS_OPTIONS = ["Inactive", "Active"];

export const LISTINGS_FOOTER_NOTE = "Showing 1-12 listings";

export const LISTINGS_TOTAL_PAGES = 3;

/** Portal Listings table rows. Ids match the marketplace mocks so the
 *  preview route resolves them. */
const PORTAL_LISTING_IMAGE =
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=200&q=80";

export const MOCK_PORTAL_LISTINGS: PortalListing[] = [
  {
    id: "listing-1",
    image: PORTAL_LISTING_IMAGE,
    title: "Willow Apartments",
    location: "Adjiringanor",
    status: "active",
    priceLabel: "GHC 3500.00",
    propertyType: "Apartment",
    views: 12,
  },
  {
    id: "listing-2",
    image: PORTAL_LISTING_IMAGE,
    title: "Willow Apartments",
    location: "Adjiringanor",
    status: "active",
    priceLabel: "GHC 3500.00",
    propertyType: "Apartment",
    views: 12,
  },
  {
    id: "listing-3",
    image: PORTAL_LISTING_IMAGE,
    title: "Willow Apartments",
    location: "Adjiringanor",
    status: "active",
    priceLabel: "GHC 3500.00",
    propertyType: "Apartment",
    views: 12,
  },
  {
    id: "listing-4",
    image: PORTAL_LISTING_IMAGE,
    title: "Willow Apartments",
    location: "Adjiringanor",
    status: "active",
    priceLabel: "GHC 3500.00",
    propertyType: "Apartment",
    views: 12,
  },
  {
    id: "listing-5",
    image: PORTAL_LISTING_IMAGE,
    title: "Willow Apartments",
    location: "Adjiringanor",
    status: "active",
    priceLabel: "GHC 3500.00",
    propertyType: "Apartment",
    views: 12,
  },
  {
    id: "listing-6",
    image: PORTAL_LISTING_IMAGE,
    title: "Willow Apartments",
    location: "Adjiringanor",
    status: "active",
    priceLabel: "GHC 3500.00",
    propertyType: "Apartment",
    views: 12,
  },
];

/** Summary strip, footer note and page count for the portal Offers page —
 *  mock until the offers API is live. */
export const OFFERS_FOOTER_NOTE = "Showing 1-6 Offers";

export const OFFERS_TOTAL_PAGES = 2;

/** Portal Offers table rows — one per listed property with its received
 *  offer count. */
export const MOCK_PORTAL_OFFERS: PortalOffer[] = [
  {
    id: "listing-1",
    image: PORTAL_LISTING_IMAGE,
    title: "Willow Apartments",
    location: "Adjiringanor",
    status: "active",
    priceLabel: "GHC 3500.00",
    propertyType: "Apartment",
    offers: 12,
  },
  {
    id: "listing-2",
    image: PORTAL_LISTING_IMAGE,
    title: "Willow Apartments",
    location: "Adjiringanor",
    status: "active",
    priceLabel: "GHC 3500.00",
    propertyType: "Apartment",
    offers: 12,
  },
  {
    id: "listing-3",
    image: PORTAL_LISTING_IMAGE,
    title: "Willow Apartments",
    location: "Adjiringanor",
    status: "active",
    priceLabel: "GHC 3500.00",
    propertyType: "Apartment",
    offers: 12,
  },
  {
    id: "listing-4",
    image: PORTAL_LISTING_IMAGE,
    title: "Willow Apartments",
    location: "Adjiringanor",
    status: "active",
    priceLabel: "GHC 3500.00",
    propertyType: "Apartment",
    offers: 12,
  },
  {
    id: "listing-5",
    image: PORTAL_LISTING_IMAGE,
    title: "Willow Apartments",
    location: "Adjiringanor",
    status: "active",
    priceLabel: "GHC 3500.00",
    propertyType: "Apartment",
    offers: 12,
  },
  {
    id: "listing-6",
    image: PORTAL_LISTING_IMAGE,
    title: "Willow Apartments",
    location: "Adjiringanor",
    status: "active",
    priceLabel: "GHC 3500.00",
    propertyType: "Apartment",
    offers: 12,
  },
];

/** Rent summary panel of the portal offer-detail header — mock until the
 *  offers API is live. */
export const OFFER_DETAIL_PRICING: OfferDetailPricing = {
  monthlyRent: "1500 ghc/mo",
  availability: "Available in 3 months",
  serviceCharge: "0.00 ghc",
  utilityFees: "0.00 ghc",
};

/** Bid rows of the portal offer-detail page — mock until the offers API
 *  is live. */
export const MOCK_OFFER_BIDS: OfferBid[] = [
  {
    id: "bid-1",
    bidderName: "James Doe",
    initials: "JD",
    amountLabel: "3500 ghc/mo",
    moveInDate: "March 2027",
    stayDuration: "1 year",
    status: "pending",
  },
  {
    id: "bid-2",
    bidderName: "James Doe",
    initials: "JD",
    amountLabel: "1500 ghc/mo",
    moveInDate: "March 2027",
    stayDuration: "1 year",
    status: "pending",
  },
  {
    id: "bid-3",
    bidderName: "James Doe",
    initials: "JD",
    amountLabel: "2500 ghc/mo",
    moveInDate: "March 2027",
    stayDuration: "1 year",
    status: "pending",
  },
  {
    id: "bid-4",
    bidderName: "James Doe",
    initials: "JD",
    amountLabel: "2700 ghc/mo",
    moveInDate: "March 2027",
    stayDuration: "1 year",
    status: "pending",
  },
  {
    id: "bid-5",
    bidderName: "James Doe",
    initials: "JD",
    amountLabel: "2900 ghc/mo",
    moveInDate: "March 2027",
    stayDuration: "1 year",
    status: "accepted",
  },
  {
    id: "bid-6",
    bidderName: "James Doe",
    initials: "JD",
    amountLabel: "2600 ghc/mo",
    moveInDate: "March 2027",
    stayDuration: "1 year",
    status: "declined",
  },
];
