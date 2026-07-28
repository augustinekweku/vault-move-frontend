import type { Deal, DealDetails } from "~/types";
import { MOCK_DEALS, MOCK_DEAL_DETAILS } from "~/data/deals";

/**
 * Deal-room data access. Currently backed by mock data; swap the bodies for
 * `http.get(...)` calls (via ~/services/api) once the backend is live.
 */

const USE_MOCK = true;

function delay<T>(value: T, ms = 0): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export async function getDealById(
  id: string,
): Promise<{ deal: Deal; details: DealDetails } | undefined> {
  if (USE_MOCK) {
    const deal = MOCK_DEALS.find((d) => d.id === id);
    if (!deal) return undefined;
    return delay({ deal, details: MOCK_DEAL_DETAILS });
  }
  // return http.get<{ deal: Deal; details: DealDetails }>(`/deals/${id}`);
  return undefined;
}
