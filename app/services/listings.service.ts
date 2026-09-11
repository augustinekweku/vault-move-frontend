import type {
  ListingDraft,
  OfferBid,
  OfferDetailPricing,
  PortalListing,
  PortalOffer,
  Property,
  PropertyDetails,
  SearchListingsParams,
} from "~/types";
import { MOCK_LISTINGS, MOCK_PROPERTY_DETAILS } from "~/data/listings";
import {
  MOCK_LISTING_DRAFTS,
  MOCK_OFFER_BIDS,
  MOCK_PORTAL_LISTINGS,
  MOCK_PORTAL_OFFERS,
  OFFER_DETAIL_PRICING,
} from "~/data/listing";

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

export async function getListingById(
  id: string,
): Promise<{ property: Property; details: PropertyDetails } | undefined> {
  if (USE_MOCK) {
    const property = MOCK_LISTINGS.find((l) => l.id === id);
    if (!property) return undefined;
    return delay({ property, details: MOCK_PROPERTY_DETAILS });
  }
  // return http.get<{ property: Property; details: PropertyDetails }>(`/listings/${id}`);
  return undefined;
}

/** Rows for the landlord/agent/developer portal Listings table. */
export async function getPortalListings(): Promise<PortalListing[]> {
  if (USE_MOCK) {
    return delay(MOCK_PORTAL_LISTINGS);
  }
  // return http.get<PortalListing[]>("/listings/mine");
  return [];
}

/** Rows for the landlord/agent/developer portal Offers table. */
export async function getPortalOffers(): Promise<PortalOffer[]> {
  if (USE_MOCK) {
    return delay(MOCK_PORTAL_OFFERS);
  }
  // return http.get<PortalOffer[]>("/offers/mine");
  return [];
}

export interface OfferDetail {
  offer: PortalOffer;
  draft: ListingDraft;
  pricing: OfferDetailPricing;
  bids: OfferBid[];
  property: Property;
  address: string;
}

/** Listing summary, rent panel and bid rows for one portal offer-detail
 *  page. */
export async function getOfferDetail(
  offerId: string,
): Promise<OfferDetail | undefined> {
  if (USE_MOCK) {
    const offer = MOCK_PORTAL_OFFERS.find((row) => row.id === offerId);
    if (!offer) return undefined;
    const listing = await getListingById(offerId);
    if (!listing) return undefined;
    return delay({
      offer,
      draft: MOCK_LISTING_DRAFTS[0],
      pricing: OFFER_DETAIL_PRICING,
      bids: MOCK_OFFER_BIDS,
      property: listing.property,
      address: listing.details.address,
    });
  }
  // return http.get<OfferDetail>(`/offers/${offerId}`);
  return undefined;
}
