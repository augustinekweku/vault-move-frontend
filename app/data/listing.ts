/** Copy + option lists for the landlord/agent/developer create-listing
 *  wizard. Static until the listings API is live. */
import type { ListingDraft } from "~/types";

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
