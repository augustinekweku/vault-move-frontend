import type { Property, SearchListingsParams } from "~/types";
import { MOCK_LISTINGS } from "~/data/listings";

/**
 * Listings data access. Currently backed by mock data; swap the bodies for
 * `http.get(...)` calls (via ~/services/api) once the backend is live.
 */

const USE_MOCK = true;

function delay<T>(value: T, ms = 0): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export async function getFeaturedListings(limit = 3): Promise<Property[]> {
  if (USE_MOCK) {
    return delay(MOCK_LISTINGS.slice(0, limit));
  }
  // return http.get<Property[]>(`/listings/featured?limit=${limit}`);
  return [];
}

export async function searchListings(
  params: SearchListingsParams = {},
): Promise<Property[]> {
  if (USE_MOCK) {
    let results = MOCK_LISTINGS;
    if (params.category) {
      results = results.filter((l) => l.category === params.category);
    }
    return delay(results);
  }
  // return http.get<Property[]>("/listings", { params });
  return [];
}
