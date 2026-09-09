import type { Stat } from "~/types";

/** Static copy + mock figures for the portal dashboard — swapped for service
 *  data once the landlord/agent/developer APIs are live. */

/** The four-figure account summary strip of the landlord/agent/developer
 *  dashboard. All zero for a fresh account. */
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

/** Right-column card once the landlord/agent/developer account is verified:
 *  full access to listings, enquiries and the Deal Room. */
export const VERIFIED_PROFILE_CARD = {
  title: "Your Profile Has Been Verified!",
  body: "Congratulations! Your account has been successfully verified. You now have full access to your landlord account and can start listing properties, responding to enquiries, and managing transactions through your Deal Room.",
  actionLabel: "Create a Listing",
};

/** Right-column card when verification fails: the reviewer reason lives
 *  behind the query dialog. */
export const FAILED_VERIFICATION_CARD = {
  title: "Verification Unsuccessful",
  body: "Unfortunately, we couldn't verify your profile based on the information provided. Please review the reason below, update your details or documents, and submit your profile for review again.",
  actionLabel: "View query",
};

/** Verification query dialog: the flagged documents with their reviewer
 *  reasons. Data-driven so further issues append as rows. */
export const VERIFICATION_QUERY = {
  title: "Your Verification was unsuccessful.",
  intro: [
    "We were unable to verify your profile with the information provided.",
    "We found one (1) issue that needs your attention. Update the documents below and resubmit your profile for review.",
  ],
  issues: [
    {
      document: "Tin Certificate",
      reason:
        "The uploaded document is blurred, incomplete, or the TIN could not be read.",
    },
  ],
  updateLabel: "Update and Resubmit",
  cancelLabel: "Cancel",
};

/** First system message in the Messages panel once documents are submitted. */
export const DASHBOARD_SYSTEM_MESSAGE = {
  sender: "Vault Move",
  time: "3:12 pm",
  body: "Thanks! We've received your submission and are currently verifying your information.",
};
