import type { Stat } from "~/types";

/** Static copy + mock figures for the portal dashboard — swapped for service
 *  data once the landlord/agent/developer APIs are live. */

/** The four-figure account summary strip. All zero for a fresh account. */
export const DASHBOARD_STATS: Stat[] = [
  { value: "0", label: "Listed Properties" },
  { value: "0", label: "Property Views" },
  { value: "0", label: "Properties rented" },
  { value: "0", label: "Properties sold" },
];

/** Profile completion shown in the Profile Status card — mock until the
 *  signed-in user's state is wired up. */
export const PROFILE_COMPLETION_PERCENT = 5;

/** Shared empty-state copy of the dashboard panels (Recent Listings,
 *  Messages). */
export const DASHBOARD_EMPTY_STATE = {
  title: "Nothing to see here",
  body: "Set up your profile and list your properties to get connected!",
};
