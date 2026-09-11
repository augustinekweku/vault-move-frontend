import type { Deal, DealDetails, PortalDeal, PortalDealDetail } from "~/types";
import { MOCK_DEALS, MOCK_DEAL_DETAILS, MOCK_PORTAL_DEAL_DETAILS } from "~/data/deals";
import { MOCK_PORTAL_DEALS } from "~/data/listing";

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

/** Rows for the landlord/agent/developer portal Deal Room table. */
export async function getPortalDeals(): Promise<PortalDeal[]> {
  if (USE_MOCK) {
    return delay(MOCK_PORTAL_DEALS);
  }
  // return http.get<PortalDeal[]>("/deals/mine");
  return [];
}

/** Workspace payload for one portal deal — the table row plus the shared
 *  step content and sidebar data. */
export async function getPortalDealById(
  id: string,
): Promise<PortalDealDetail | undefined> {
  if (USE_MOCK) {
    const deal = MOCK_PORTAL_DEALS.find((d) => d.id === id);
    if (!deal) return undefined;
    return delay({ ...MOCK_PORTAL_DEAL_DETAILS, deal });
  }
  // return http.get<PortalDealDetail>(`/deals/mine/${id}`);
  return undefined;
}
