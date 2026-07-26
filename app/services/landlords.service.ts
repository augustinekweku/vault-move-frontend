import type { LandlordProfile, Property } from "~/types";
import { MOCK_LANDLORD } from "~/data/landlords";
import { MOCK_LISTINGS } from "~/data/listings";

/**
 * Landlord data access. Currently backed by mock data; swap the bodies for
 * `http.get(...)` calls (via ~/services/api) once the backend is live.
 */

const USE_MOCK = true;

function delay<T>(value: T, ms = 0): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export async function getLandlordById(
  id: string,
): Promise<{ landlord: LandlordProfile; listings: Property[] } | undefined> {
  if (USE_MOCK) {
    if (id !== MOCK_LANDLORD.id) return undefined;
    // Every mock listing belongs to the same mock landlord.
    return delay({ landlord: MOCK_LANDLORD, listings: MOCK_LISTINGS });
  }
  // return http.get<{ landlord: LandlordProfile; listings: Property[] }>(`/landlords/${id}`);
  return undefined;
}
