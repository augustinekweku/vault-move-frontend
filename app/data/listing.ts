/** Copy + option lists for the landlord/agent/developer create-listing
 *  wizard. Static until the listings API is live. */

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
