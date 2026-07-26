import type { Conversation, ToastStep } from "~/types";
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
