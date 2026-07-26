import type { LandlordProfile } from "~/types";
import { IMAGES, MOCK_PROPERTY_DETAILS } from "~/data/listings";

/**
 * Mock landlord profile for the public landlord page — keyed per landlord
 * (and backed by the API) once the backend is live.
 */
export const MOCK_LANDLORD: LandlordProfile = {
  id: "john-doe",
  name: "John Doe",
  avatar: IMAGES.avatar,
  verified: true,
  role: "Verified Landlord",
  location: "Achimota, Accra",
  rating: 4,
  bio: [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  ],
  stats: [
    { value: "24", label: "Listed Properties" },
    { value: "120", label: "Property Views" },
    { value: "12", label: "Properties sold" },
    { value: "24", label: "Properties rented" },
  ],
  reviews: MOCK_PROPERTY_DETAILS.reviews,
};
