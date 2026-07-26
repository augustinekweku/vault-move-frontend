import type {
  Conversation,
  OfferFilter,
  ToastStep,
  ViewingStatus,
} from "~/types";
import { IMAGES } from "~/data/listings";

/**
 * Deterministic mock conversations for the enquiry page "Recent Messages"
 * sidebar. The first row is the landlord the page is chatting with.
 */
export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "john-doe",
    name: "John Doe",
    avatar: IMAGES.avatar,
    verified: true,
    role: "Verified Landlord",
    time: "2 mins ago",
    online: true,
  },
  {
    id: "joan-appleseed",
    name: "Joan Appleseed",
    avatar: IMAGES.reviewAvatar,
    verified: true,
    role: "Verified Agent",
    time: "1 hr ago",
    online: false,
  },
  {
    id: "kwame-mensah",
    name: "Kwame Mensah",
    avatar: IMAGES.avatar,
    verified: false,
    role: "Landlord",
    time: "Yesterday",
    online: false,
  },
];

/** Radio options in the "What would you like to know" enquiry form. */
export const ENQUIRY_TOPICS = [
  "Is the property available",
  "I would like to view the property",
  "I would like to ask for more details",
];

/** Progress checklist in the enquiry-submitted success toast — "Enquiry
 *  Sent" is the step just completed when the toast appears, the rest are
 *  still pending. */
export const ENQUIRY_PROGRESS_STEPS: ToastStep[] = [
  { label: "Enquiry Sent", done: true },
  { label: "Viewing Completed", done: false },
  { label: "Offer Submitted", done: false },
  { label: "Deal Room Created", done: false },
];

/** The mock scheduled viewing shown as a landlord card in the enquiry chat
 *  thread ("Viewing Scheduled" card) and in the Property Viewing tab grid. */
export const MOCK_VIEWING = {
  date: "Monday, 2nd June 2026",
  time: "10:00 AM",
};

/** Status filter rows in the Property Viewing tab sidebar — the key drives
 *  the ViewingCard action variant of the cards shown for that filter. */
export const VIEWING_STATUSES: { key: ViewingStatus; label: string }[] = [
  { key: "upcoming", label: "Upcoming" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
];

/** Filter rows in the Offers tab sidebar — no offers have been made yet, so
 *  every filter shows the same "nothing to show" empty state. */
export const OFFER_FILTERS: { key: OfferFilter; label: string }[] = [
  { key: "all", label: "All offers" },
  { key: "accepted", label: "Accepted offers" },
  { key: "pending", label: "Pending offers" },
  { key: "declined", label: "Declined offers" },
  { key: "drafts", label: "Drafts" },
];
